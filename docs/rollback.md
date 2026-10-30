# Rollback procedure (shared lesson engine)

The previous implementations evaluated learner code with `new Function` / `eval` in the site origin. They are therefore **not deployed**:
`legacy/` is listed in `.vercelignore`, no page redirects to it and the `?engine=legacy` switch was removed (tests/no-legacy.test.mjs guards this).
`legacy/` stays in the repository only as the frozen source for the one-time converters in `tools/` and for git history.

## How to roll back now
Whole-site, via git: `git revert <commit>` of the engine migration commit restores the previous course page and script.
Progress is never lost in either direction: the engine still mirrors every change to the legacy localStorage keys in the exact legacy
format and union-merges them back into `fayad-progress-v1` on load (js/engine/progress.js; tests/progress.test.mjs).

## Removing compatibility
After one release with no regressions: create progress with `mirror: false` and delete `legacy/`, `tools/convert-*.mjs` and the fixtures' dependence on it.
