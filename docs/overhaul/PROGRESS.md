# FAYBIT overhaul — checkpoint (update at every milestone)

Branch `feature/platform-overhaul`. Remote deployments (Vercel project `faybit`, preview target) were READY through 369c137 (later commits pushed; check Vercel again).
Real Supabase flows (signup/login/upload/progress with a real account) are **not** verified from this environment.

## Coverage map (actual pages found in the repo)
| Area | Files | State | Next |
|---|---|---|---|
| Home | index.html, js/home*.js, css/home.css | Hero + course ticker + games strip exist; token-driven | storytelling sections, mobile feature-card icons (verify), word-flip nav |
| Login / Register | login.html, js/auth-page.js, css/auth.css | Redesigned (55019c0); real Supabase flow kept | none unless asked |
| Navbar / global menu | js/shell.js, css/shell.css, js/nav-drawer.js, css/sidebar.css | Account menu, avatar, sign-out done | grouped drawer, collapsed state, word-flip hover |
| Course pages (11 tracks) | */*-learning/*.html, js/engine/*, css/docs.css, css/course-nav.css | Independent sidebar scroll, docs shell | curriculum browsing redesign, lesson TOC/progress |
| Lessons content | content/** | 292 lessons, every one has >=5 questions | deepen prg-01..06/12..20 and shallow tracks |
| Profile | profile.html, js/account.js | Redesigned (2c77162) | add XP/level/streak (batch G) |
| Settings | settings/*.html, js/settings/* | Switches fixed (75e6fe6) | leaderboard-visibility + gamification prefs |
| Dashboard | dashboard.html, js/account.js | Redesigned (7269920) | XP/streak/hearts/leaderboard preview (batch G) |
| About | about/* | Flat sections, accurate wording (369c137) | — |
| Games | play/index, arena, flex-quest, selector-quest, **adventure (120 lv), zombie (15 lv)**; js/game/*, js/game/adventure/*, js/game/zombie/* | All five games playable. Adventure/Zombie: pure engines + tests proving every level winnable; migrations 0009/0010 APPLIED (game_levels rows); wired to hub/home/search/sitemap | Games Center redesign, daily challenge, in-browser verification of real cloud submit_solve with a real account |
| Notifications | js/notifications.js, notif-badge.js | exists (0005) | — |
| Search | js/search, search/ | exists | — |
| PWA | service-worker.js, js/sw-register.js | reviewed: same-origin GET only, no auth caching | in-app update prompt check |

## Design system (this batch)
- css/tokens.css: stepped canvas/surface levels in both themes (light canvas #f0f5f8 vs white surfaces; dark #081420→#214058), plus semantic secondary/game tokens: `--fy-accent*` (indigo), `--fy-xp`, `--fy-streak`, `--fy-heart`, `--fy-info`. Contrast test (tests/theme.test.mjs) passes.

## Backend (migration 0008, APPLIED to project vsrysitexadvmmikcmfs)
- `xp_ledger` (append-only, unique per user+source+ref, RLS select-own, no client write grants), `hearts`, `profiles.show_on_leaderboard`.
- RPCs (authenticated only): `sync_my_xp()`, `get_my_gamification(tz)`, `get_hearts()`, `lose_heart()`, `get_weekly_leaderboard(n)`. `submit_solve` now also writes the ledger.
- XP is derived server-side from rows the server holds (lesson_completions / assessment_results / game_levels), validated against `course_catalog` (com→30, prg→31 corrected). Residual trust: completion rows are still client-written; XP is therefore bounded by the real catalog but is not proof of learning.
- Verified in a rolled-back transaction on the live project: idempotent sync, bogus lesson rejected, direct ledger insert denied.

## Games (this session)
- Adventure: `levels.js` seeded generator, each level has a reference solution run by `tests/adventure-levels.test.mjs`; UI test `adventure-ui.test.mjs`. Stars = block count vs par.
- Zombie: rule-list engine (first matching rule acts), 15 levels, `tests/zombie-*.test.mjs`.
- Both record via `store.award()`; signed-in sync uses existing `submit_solve` (server decides points).

## Next exact step
Remaining gamification (profile XP line, settings leaderboard toggle, lose_heart in quizzes, achievements/daily challenge/leagues), then navbar/sidebar redesign, homepage storytelling, curriculum browsing, lesson docs architecture. Original Batch G note: client module `js/gamify.js` (sync_my_xp after sign-in/completion, level/XP/streak/hearts) → dashboard + profile + weekly leaderboard preview + settings toggle.

## Phase 2 — in-game navigation shell (done)
- `css/gamenav.css` + `header.gnav` in `play/adventure.html` and `play/zombie.html`: brand→FAYBIT, back button, breadcrumb to Game Center, section tabs (start / map / continue, `aria-current`), points/star pills, and the shared account/theme/language/search controls mounted via `.nav-actions`.
- Adventure: carved signboard painted from the active world's tokens. Zombie: dark steel bar with amber hazard stripe and lime accents.
- Mobile (≤760px): two-row touch layout; tabs hidden on the play screen; bar scrolls away on play so the stage keeps full height. Old `.ac-top` / HUD removed. No horizontal overflow at 360/430/1280.

## Phase 3 — homepage (done)
- New "What FAYBIT offers" platform section (`#platform`, six pillars: structured lessons, interactive editor, quizzes, games, progress, AR/EN) — `css/home-platform.css`, `js/home-platform.js` (i18n ar/en).
- Hero gets a secondary CTA (games hub). Zombie and Adventure game cards now carry illustrated scene banners in each game's palette.
- Existing hero code-window, tracks tabs, how-it-works, owner and final CTA sections kept. `tests/home.test.mjs` section count 6→7.
