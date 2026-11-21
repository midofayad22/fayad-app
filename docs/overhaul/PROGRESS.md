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

## Game systems overhaul (reprioritised: games before homepage/lessons; Phase 4 work stashed as "WIP phase4 doc-enhance")
Checklist: [x] Adventure mechanics v2  [x] Zombie web-lab (supersedes the JS-only tactical v2 per the Mon-16-Nov brief) — 15 missions teaching real HTML/CSS/JS in the sandbox; docs: `docs/overhaul/zombie-missions.md`, `docs/overhaul/zombie-security.md`; tests: zombie-missions, zombie-lab-ui
[ ] Flex Quest  [ ] Selector Quest  [ ] HTML/CSS/JS Arenas  [ ] nav integration for those 5  [ ] final QA + deploy
- Adventure v2: engine now has doors+keys, crates that bridge water, switches+gates, ice, timed spikes (tick parity), portals, water, optional bonus stars and new conditions (dangerAhead, crateAhead). Boards are generated offline (`tools/adventure/gen.mjs` → `levels-data.js`): worlds 1–2 are puzzle rooms solved by exhaustive search (reference = provably shortest), worlds 3–6 are loop/condition/function courses whose route carries a real barrier mechanic, 3 mastery bosses. IDs, worlds, budgets, `game_levels` rows unchanged. Hints now teach reasoning per mechanic.

## Zombie Survival — survival redesign + final polish (done, see `zombie-redesign.md`, `zombie-missions.md`)
- Replaced the web-lab format: live DOM-driven simulation (5 zombie types), 5 locations, 15 missions, HUD, map, results, stars. Old `zombie-missions`/`zombie-lab-ui` tests removed; replaced by `zombie-structure`, `zombie-sim`, `zombie-game-ui`.
- Polish: mobile HUD (6 stats in 2 rows), banner pill, forced dark survival theme (also under `html[data-theme]`), fixed mission-15 mobile overflow (grid min-content blowout made the tab bar 932px wide).
- Barrels (zb-4/5/6/13) and a medkit (zb-12) added with legend entries; zb-4 retuned (ammo 5, shelter 8) because the starter won at real speed.
- Verified: sim at 1× (all starters lose, solutions + alternatives win), real-mouse playthrough of all 15 missions, touch play on several missions (see commit message for the exact run).
- Known gaps: no sound; crawlers only in zb-6; server `submit_solve` still trusts the client (security milestone).

## Adventure — real JavaScript mode (done)
- Kept the 120 levels, IDs, engine, block editor, progress and points. Added a second way to play every level: **real JavaScript** (`for`/`while`/`if`/`function` + a 9-command hero API) in the sandboxed playground (`js/game/adventure/code.js`, pure helpers in `code-lang.js`).
- The sandbox returns only the action string it asked for; the host replays it with the real engine (`runActions`), so the outcome is never trusted. World rules apply to code too (no `for` before the loops world, no `while`/`if` before conditions, no functions before the functions world, no `window`/`document`).
- Switching Blocks → JavaScript shows your blocks as real code. Stars use code size like block count.
- Tests: `adventure-code` (all 120 reference solutions translated to JS and run in the real sandbox: all win, code size == par; errors/endless loops/locked constructs), `adventure-code-ui` (real browser: win + persistence, explanations, worlds 3/4/5 levels, mobile 390). Existing adventure suites still pass.
- Not done (honest): HTML/CSS-driven level mechanics (platforms laid out by CSS/Flex/Grid) — covered by Flex Quest / CSS Arena instead; no new art pass.

## Zombie touch-test investigation (closed)
- The 4 touch failures were 2 causes: (a) harness: taps fired while the layout was still settling after Start (fixed: test waits for a stable stage box, game scrolls after two animation frames); (b) a **real mobile UX defect**: after editing code the stage could sit under the sticky site header, so taps hit the header nav (fixed: Start scrolls the stage into the clear area when it is within 130px of the top). Touch play now wins zb-4, 5, 6, 9, 12, 13, 14, 15 (and zb-1 earlier) in a real browser at 430px.

## Flex Quest — rebuilt (done)
- 24 levels in 4 chapters; levels 1–10 keep the original ids/targets (progress preserved, game id `flex`), 11–24 new: gap, wrap, align-content, wrap-reverse, order, align-self, flex-grow (+ratios), flex-basis, flex-shrink, auto margins, flex-flow, nav-bar and final combo.
- Real CSS editor (CodeMirror with textarea fallback), live sandboxed board (srcdoc iframe + CSP, learner writes CSS only, crates slide to new places with FLIP unless reduced motion), target board from a hidden reference, per-crate match chips, 3 hints, show-solution (costs the no-hint star/bonus), "other valid ways", stars, points (10/12 + 5 no hint), map with unlock rule (n-1 solved).
- Win = size + position of every crate equal to the reference within 1.5px, so any valid CSS wins (alts verified: 17 of 24 levels have alternatives).
- Tests (`tests/flex-quest.test.mjs`, real browser): all 24 levels (starters never win; reference + alternatives always win), real typing/win/persist/next, hint ladder + hostile CSS (@import, body override), locked URL, EN without Arabic, 360/390/430/820/1366 layouts, touch. Old select-based flex test removed from `game.test.mjs`; old `js/game/flex-quest.js` deleted.
- Honest gaps: the page still uses the platform header; canonical URL still the old domain (SEO phase); gameplay is CSS-only by design (no JS).

## Selector Quest — rebuilt (done)
- "Radar room" identity (phosphor-green console, amber targets), 24 levels in 4 chapters; levels 1–10 keep ids/scenes/targets (progress preserved, game id `sel`); 11–24 add attribute selectors, nth-child/last/of-type, `~`, lists, `:is`, `:has`, chained `:not`, and 4 **specificity-war** levels.
- Real DOM scene + live DOM tree; the typed selector goes only to `querySelectorAll` (and, in war levels, `CSSStyleSheet.insertRule` one rule at a time so nothing can escape the rule); hits glow green, extras red, misses pulse in the tree; plain-language reading of the selector ("ul > li.a" → element ul · direct child of · li and class a); specificity chip.
- War levels use the real browser cascade: rival rules paint red/blue/orange, the learner's rule is appended last and paints lime; failure message names the rival rule that still wins with both specificities.
- Match markers are `data-sq-*` attributes (not classes) so `[class=a]`, `:not([class])` etc. behave truthfully. Selectors containing `data-sq` are refused.
- Stars: solve, no hint/solution, specificity not above the reference. Alternatives: 38 alternative selectors across levels, each verified.
- Tests (`tests/selector-quest.test.mjs`, real browser): specificity calculator, all 24 levels (reference wins; `*` and a non-matching selector never win), every alternative on a fresh page, real play + persistence, war + injection attempts, hint ladder, locks, EN without Arabic, 360/390/430/820/1366 layouts, touch. Old Selector tests removed from `game.test.mjs`; old `js/game/selector-quest.js` deleted.
