# Supabase progress sync (prepared, NOT enabled, NOT applied)

## Blocker (honest status)
The actual project schema, RLS policies and grants could not be inspected: the build sandbox cannot reach `*.supabase.co` (proxy 403) and the
Supabase connector is not installed in this session. Nothing was guessed or applied. Production is untouched.

## What exists in the repo
- `supabase/preflight_readonly.sql`: read-only queries (tables + RLS flags, columns, policies, grants, triggers on `auth.users`). Run in the SQL editor
  of the target project and share the structure-only output, or connect the Supabase connector (read-only, development project).
- `supabase/migrations/0001_learning_progress.sql`: DRAFT, idempotent where practical. Tables `profiles`, `lesson_completions`, `quiz_results`,
  `assessment_results`; RLS on; own-rows-only policies; no `anon` access; sign-up trigger for profiles; documented manual rollback.
  Points are not stored (derived by the app) so a client cannot forge them.
- `js/engine/sync.js` (+ `tests/sync.test.mjs`): additive pull/merge/push, disabled by default, every failure resolves to `{ ok: false }`.
  `progress.mergeSnapshot()` union-merges remote data: completed = union, quiz answers = union, attempts/best score = max, pass flags = OR, local resume pointer wins.
  It never deletes remote rows, never lowers values and never overwrites local data (anonymous -> signed-in merge is therefore lossless).

## To enable (after review)
1. Run the preflight; adjust 0001 if tables/policies/triggers already exist (names collide? existing `on_auth_user_created`?).
2. Apply to a development project; verify RLS with two test users (user A cannot read/write user B).
3. In the app: `createSync({ client: window.FAYAD_AUTH.client, progress, enabled: true }).sync()` on `fayad-auth-changed` (signed-in) and after progress changes (debounced).
4. Production only after explicit approval; the service-role key must never appear in the repository or browser.
