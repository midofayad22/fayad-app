# FAYBIT 2.0 — continuation note (updated 2026-11-11)

## Done & verified (see git log)
- M-A (this commit): shared documentation shell `css/docs.css` on all 11 course pages — course sidebar is its own scroll container (sticky, viewport-height, active lesson revealed), foundation (com/prg) 500px hero → compact course header, logo = home button (hover/focus/active), Back button removed. Test: `tests/docs-shell.test.mjs` (33), regression batch 116/116.

## Audit (derived from the repo, 2026-11-10)
| track | lessons | body depth | quiz/lesson |
|---|---|---|---|
| com | 30 | doc-style (29 of 30; com-20 = final) | 1 → needs ≥5 |
| prg | 31 | prg-21..31 doc-style; prg-01..20 shallow (07–11 have a deep layer) | 1–4 → needs ≥5 |
| html/css/js/ajs/bs/tw/react/vue/angular | 30/30/25/22/20/20/30/22/32 | short (median < 1.3k chars) | 1 → needs ≥5 |

## Pending (in priority order)
1. Quizzes ≥5 per lesson platform-wide (com 19×4, prg 20 + extras, then others). Writers for `content/prg/rework-{a,b,c}.js` were interrupted by the usage limit; checker: scratchpad `prgcheck.mjs` (format: `{id, body, more[4], exercise?, explain0?}`; extras `{ "prg-07": Q }`). The wiring module `content/prg/rework.js` is NOT written yet.
2. Deep rewrite of prg-01..06, 12..20; then HTML/CSS/JS and remaining tracks (use `content/_doc.js` DSL; com deep files are the reference).
3. Course identity icons (Font Awesome brands already loaded: html5, css3-alt, js, bootstrap, react, vue, angular; tailwind → custom).
4. Global sidebar + Settings + gamification (XP/hearts/hints) with reviewed SQL migrations (NOT applied to production; 0007 is also unapplied).
5. Homepage + About redesign.
6. Full test suite, PWA/offline check, deployment check (none performed).
