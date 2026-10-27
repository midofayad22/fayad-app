# Rollback procedure (shared lesson engine)

Progress is never lost in either direction: the engine mirrors every change to the legacy localStorage keys in the exact legacy
format, and every load union-merges the legacy keys back into `fayad-progress-v1` (see js/engine/progress.js).

## Per-learner, instant (no deploy)
Open `<course url>?engine=legacy`, e.g. `/javascript-learning/javascript-learning.html?engine=legacy` or `/fundamentals/programming-basics/prg.html?engine=legacy`.
It redirects to `/legacy/<course>/<page>.html` (`/legacy/programming-basics/prg.html` for Programming Fundamentals), the previous implementation, which reads the same progress. (The legacy page is
`noindex`, disallowed in robots.txt, and absent from the sitemap. NOTE: it still runs learner code with `new Function`; it exists
only as a safety net for one release.)

## Whole-site, via git
`git revert <engine-commit>` restores the previous course page and script. Progress made meanwhile is preserved by the mirror.

## Verified by tests (tests/js-engine.test.mjs and tests/prg-engine.test.mjs, "ROLLBACK")
new engine completes lesson 1 -> legacy page shows lesson 1 completed -> legacy completes lesson 2 -> new engine shows both and
keeps its own v1 record. For Programming Fundamentals the same round trip is checked against the 1-based list `[1,2]`.

## Removing compatibility (not yet done)
Only after one release with no regressions: create progress with `mirror: false`, delete `legacy/`, the `?engine=legacy` snippet and
this document. Do not remove it earlier.
