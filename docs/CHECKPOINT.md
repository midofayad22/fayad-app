# Checkpoint (2026-10-29)

Branch `feature/platform-overhaul`. Tests: 319 passing (React and Vue migrated; Angular next) (`node --test "tests/*.test.mjs"`).

## Done since 9206262
- Homepage: Git/GitHub card removed; hero no longer hidden under the fixed navbar; navbar fits 320px; iPhone safe areas (`viewport-fit=cover`, env insets); 44px targets; subtle motion.
- Dashboard + profile pages, assessment results stored, stats module (docs/progress-dashboard.md).
- Advanced JavaScript (22), Bootstrap 5 (20), Tailwind v4 (20) courses + vendored libraries (docs/new-courses.md); homepage cards/roadmap/sitemap updated.

## Remaining
1. Supabase: inspect real schema/RLS (needs authorized access) before any sync; prepare reviewed SQL migration + sync client with local fallback.
2. (done) favicon links consistent; Supabase prep committed (docs/supabase-sync.md).
3. Migrate react, vue, angular to the shared engine (css done; legacy copies already exist under `legacy/`).
4. English lesson content; login page English remnants ("OR", "YOUR LEARNING JOURNEY" in Arabic mode).
5. CSP/execution audit docs, PWA service-worker precache check for new pages, final report and Vercel preview check.

## Next action
React migration, then vue, angular; Supabase schema review when access exists.
