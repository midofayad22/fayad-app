# Supabase sync (ENABLED)

Status: migrations 0001-0003 are applied to project `vsrysitexadvmmikcmfs` (owner-approved). Sync is on, but lazy: the auth libraries are only
downloaded when the device already holds a saved sign-in (`sb-vsrysitexadvmmikcmfs-auth-token`), so anonymous visitors pay nothing and keep working offline from local storage.

## Flow (`js/engine/cloud.js`, `js/engine/sync.js`)
1. pull this user's rows, 2. union-merge into the local record (`progress.mergeSnapshot`: completed = union, quiz passed = union, attempts and best score = max, flags = OR, local resume pointer wins), 3. upload only what the server lacks (invalid ids/values are filtered first).
It never deletes cloud rows and never lowers a value on either side. Re-runs after local changes (debounced), on sign-in and when the tab is hidden.

## Tables (RLS on, own rows only, no anon access)
`profiles`, `lesson_completions`, `quiz_results`, `assessment_results`, `game_solves` (read-only for the browser), `game_levels` (server rules, no direct access).
Game points are written only by `submit_solve`. See `docs/game-scoring-security.md` for what that does and does not prove.

## Verification
- `tests/sync-cloud.test.mjs`: new user, existing user on a new device, both-sides merge without lowering, signed out, malformed ids, totals match content.
- `tests/cloud.test.mjs`: game wiring with a mocked client.
- RLS, constraints and `submit_solve` were exercised on the live project inside rolled-back transactions (cross-user read/update/delete, forged user_id, bad ids, direct score inserts and anon access are all blocked).
- Not covered: a real browser sign-in against supabase.co (the build sandbox cannot reach it).
