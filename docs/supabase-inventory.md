# Supabase: what the current code expects (inventory, no schema guessed)

Source: static inspection of the repository at the time of Milestone 3. No database was contacted.

## Client configuration
- `js/main-auth.js` creates one client with the project URL and the **publishable** key (public by design). The key is
  safe in the browser only if Row Level Security is enabled on every table; that cannot be verified from code.
- Session: PKCE flow, `persistSession`, `autoRefreshToken`, storage key `fayad-supabase-auth` (localStorage).

## Operations used today (all Auth; zero table access)
| Where | Call |
| --- | --- |
| `login.html`, `js/auth-actions.js` | `auth.signUp({ email, password })`, `auth.signInWithPassword({ email, password })` |
| `js/main-auth.js` | `auth.getSession()`, `auth.getUser()`, `auth.onAuthStateChange()`, `auth.signOut()` |

`.from()`, `.rpc()`, `.storage` and realtime channels are **not used anywhere**.

## User fields read (from `auth.users.raw_user_meta_data`, i.e. `user.user_metadata`)
`full_name` / `name` / `username` (display name), `avatar_url` / `picture` (avatar), plus `email`.
Nothing writes these today; sign-up passes only email and password.

## What this means
- The app currently expects **no application tables**. Lesson completion, quizzes, notes, streaks and points exist only
  in each browser's localStorage (see `js/catalog.js` for the exact keys per track).
- Anything beyond Auth (profiles, progress, notes, points, achievements) is new work for Milestone 7 and needs a
  reviewed migration before it touches any real project.
- Open question that only the project owner can answer: whether tables already exist in the project (created from the
  dashboard) and whether RLS is enabled on them.

## Safe ways to give read access to the schema (pick one; never share keys or passwords)
1. **Supabase connector (preferred).** Connect the Supabase connector from claude.ai connector settings (OAuth, you
   approve in your browser), scoped to a development/staging project and read-only if the option is offered.
2. **Structure-only export.** Run `supabase db dump --schema-only` (or the schema-only SQL queries sent earlier) and
   paste the output. It contains table/column/policy definitions, not data or secrets.
3. **A separate dev project.** Create an empty project for the migrations; it is the only place they will be applied
   until you explicitly approve production.
