# FAYBIT — Read-only backend / auth integrity audit

Scope: static code and migration review plus browser tests with **simulated** sessions. No real Supabase network access was available from the sandbox (Supabase/CDN hosts are blocked), no test credentials were used, **no real login/registration/recovery round-trip was executed**, and no backend code, schema or data was changed by this milestone.

## What was actually checked

| Area | Method | Result |
|---|---|---|
| Client init (`js/main-auth.js`) | Code read | `createClient` with `persistSession`, `autoRefreshToken`, `detectSessionInUrl`, PKCE, `storageKey: "fayad-supabase-auth"`. Only the publishable key (`sb_publishable_…`) is in the client — expected. If the library fails to load, the module logs and returns; pages stay in guest mode. |
| Session restore / guest vs signed-in UI | Code read + Playwright with a **fake** stored session | `FAYAD.user()` (`js/shell.js`) accepts both `fayad-supabase-auth` and the legacy `sb-<project>-auth-token`; header, bottom bar, hero and CTA switch correctly. This proves the UI logic only, not that Supabase accepts the session. |
| Logout | Code read | Header menu and sidebar call `auth.signOut()` then delete the session keys and the cached profile; UI repaints through `fayad-auth-changed`. **Progress keys are not cleared** (see finding 1). |
| Registration / login / recovery | Code read of `auth-actions.js` / `auth-page.js` | Error mapping and validation present; passwords are not stored or trimmed. Not executed against a real project. |
| RLS (`supabase/migrations/0001–0011`) | Code read | RLS enabled on every user table; policies are own-row (`user_id = (select auth.uid())`) for profiles, lesson_completions, quiz_results, assessment_results, game_solves, user_preferences, notification_prefs, notifications, xp_ledger, hearts; avatar storage limited to the user's own folder; `0011` revokes write grants (xp_ledger, hearts, game_solves, game_levels…) from `authenticated` so gamification writes go through security-definer RPCs that use `auth.uid()`. Leaderboard RPCs expose display name/points only, and avatar only when `avatar_public` or the row is the caller's. |
| Live RLS verification | **Not performed** | Would need two real accounts. Policies were read, not exercised. |

Conclusion: server-side isolation between accounts is correct **as written in the migrations**; whether the deployed project matches them was not verified in this milestone.

## Findings

### 1. Device-local progress is shared between accounts on the same browser (documented, not changed)

Behaviour (code evidence):
- Progress is stored once per browser: `fayad-progress-v1`, the legacy per-track keys (`fayad-html-progress`, `fayad-css-current-lesson`, `fayad-js-completed-lessons`, …) and game solves in `fayad-game-v1`. None is namespaced by user id.
- Sign-out (`js/shell.js`, `js/nav-drawer.js`) removes only the session keys and the cached profile.
- On sign-in, `js/engine/cloud.js` → `sync.js` / `store.solveRows(uid)` upload anything in local storage that the cloud lacks ("additive, never lowers or deletes"), stamped with the **currently signed-in** `uid`.

Consequences:
- Learner A finishes lessons, signs out; learner B signs in on the same browser: B sees A's local progress in the UI, and it is uploaded into **B's** cloud rows (and can earn B server-side XP). A's cloud data is not read or modified, so this is **cross-account contamination of B's progress, not exposure of A's private cloud data** — but A's lesson history/solves are visible on the device and get attributed to B.
- Guest progress made before first sign-up is intentionally adopted by that account; that is by design.
- Leaderboard impact: points are computed server-side from uploaded rows, so contaminated rows can inflate B's leaderboard score on shared devices. Single-user personal devices are unaffected.

Release impact: **does not block a preview/review release**; it should be fixed before promoting widely for shared devices (classrooms, family computers).

Recommended separate fix (not implemented here): on `SIGNED_IN`, if the last signed-in `uid` stored on the device differs from the new one, either (a) clear/stash the local progress before sync or (b) namespace the progress and game keys by `uid` and migrate the guest namespace once. Needs product input on whether guest progress should be offered to the new account, plus tests for account-switching.

### 2. Auth client only loaded on some pages (informational)

`main-auth.js` is included on 13 pages; lesson pages load it lazily through `ensureClient()` only when a saved session key exists. Design is deliberate (anonymous visitors download nothing). Risk: UI shows a signed-in state from a cached session even if the server has since revoked it, until a request fails. Not a security issue (RLS still enforces), but stale-state UX.

### 3. Not defects in this milestone, carried over
- Supabase leaked-password protection is off (dashboard setting).
- Solution verification for non-game exercises is client-side.

## Limitations
- No real sign-in, registration, recovery email, token refresh, or two-account RLS test was performed.
- Everything marked "Code read" reflects the repository at this commit, not the live database.
