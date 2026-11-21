# Security phase (checkpoint f4295b2 → migration 0011)

## Paths reviewed
| Path | Before | Now |
|---|---|---|
| `submit_solve` (all 7 games) | server-chosen points, idempotent, rate-limited; **new levels rejected** (`game_levels` stale) | levels registered (flex/sel 11–24, html/css/js 11–20); per-user advisory lock; points only when a row was really inserted |
| `game_solves`, `xp_ledger`, `hearts`, `game_levels`, `course_catalog`, `announcements` | RLS own-read; write grants still present for `authenticated` (blocked only by RLS); `TRUNCATE/TRIGGER/REFERENCES` granted | write privileges revoked; TRUNCATE/TRIGGER/REFERENCES revoked everywhere; anon has no write anywhere |
| `user_progress` (unused legacy) | RLS, no policy, full grants to anon/authenticated | all grants revoked |
| `assessment_results.passed` (+100 XP via `sync_my_xp`) | any client value | trigger: a pass needs best ≥ 50 %; a pass/best score/attempts can never be downgraded |
| `sync_my_xp`, leaderboards, `get_my_gamification` | server-computed | unchanged (reviewed) |

## Verified by actual test (`supabase/tests/security_probe.sql`, rolled back, no data left)
anon cannot call `submit_solve` or write `course_catalog` · signed-in without a user id → `not_authenticated` · first solve pays 17 (flex 12+5), re-sending (even with `hinted=true`) pays 0 and leaves one ledger row · unknown level/game/null → `unknown_level` · direct insert/update/delete on `game_solves` and insert on `xp_ledger` → permission denied · inserting a row for another `user_id` → RLS violation · 10 % "pass" stored as not passed, downgrade ignored · 21st solve within a minute → `rate_limited` · user B sees 0 of A's rows and cannot update them. Counts before/after the probe unchanged (3 solves, 3 ledger rows, 3 completions; 243 level rows).
Repo regression: cloud, security, sync, sync-cloud, game, security-settings suites pass.

## Still NOT secure (honest)
1. **Solutions are not re-run on the server.** Games/Arenas judge in the browser, so a user can still claim any *valid* level. Mitigations: fixed server points, one payout per level, 20/min and 300/day caps, level whitelist. `hinted=false` is also a claim (costs/gains 5 pts). Real fix = verify per game on the server (e.g. an Edge Function running the pure Adventure engine / replaying Flex & Selector answers); not done.
2. **Lesson completions, quiz and assessment scores are client-written** (own rows only). XP is bounded (20/lesson within the catalog total, 100/assessment, 150/track) but unverifiable; no rate limit on them (legit first sync can be large).
3. **Concurrency** is serialised by an advisory lock and the `(user,game,level)` primary key, but I could not fire truly parallel requests from this environment; not load-tested.
4. Supabase **leaked-password protection is off** (dashboard setting, needs the owner). Advisor WARNs for `SECURITY DEFINER` RPCs are intentional (each checks `auth.uid()`; leaderboards are public by design).
5. Real browser ↔ Supabase sign-in E2E could not be run (no credentials in the sandbox); verified at the database role/JWT-claim level instead.
