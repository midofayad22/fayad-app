# Migration matrix (real state, updated per increment)

Legend: ✅ done and verified by tests · ⏳ not started · Preview verification is only recorded when a human/browser actually opened it.

| Track | URL (unchanged) | Legacy lessons (data) | Lessons in legacy sidebar | New lessons (data) | In new sidebar | Content parity | Engine tests | Legacy kept for rollback | Preview verified |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| js | /javascript-learning/javascript-learning.html | 25 | 25 | 25 | 25 (built from data) | ✅ byte-identical (tests/migration-js.test.mjs) | ✅ tests/js-engine.test.mjs | `legacy/javascript-learning/` (`?engine=legacy`) | no (sandbox cannot reach *.vercel.app) |
| prg | /fundamentals/programming-basics/prg.html | 20 + final quiz | 21 | ⏳ | ⏳ | ⏳ | ⏳ | n/a | no |
| com | /fundamentals/computer-basics/com.html | 20 | 20 | ⏳ | ⏳ | ⏳ | ⏳ | n/a | no |
| html | /html-learning/html-learning.html | 30 | **22** (8 unreachable from sidebar) | ⏳ | ⏳ | ⏳ | ⏳ | n/a | no |
| css | /css-learning/css-learning.html | 30 | 30 | ⏳ | ⏳ | ⏳ | ⏳ | n/a | no |
| react | /react-learning/react-learning.html | 30 | 30 | ⏳ | ⏳ | ⏳ | ⏳ | n/a | no |
| vue | /vue-learning/vue-learning.html | 22 | 22 | ⏳ | ⏳ | ⏳ | ⏳ | n/a | no |
| angular | /angular-learning/angular-learning.html | 32 | **30** (2 unreachable) | ⏳ | ⏳ | ⏳ | ⏳ | n/a | no |

## Legacy storage formats (verified from each track's source; see js/engine/progress.js `LEGACY`)
| Track | Completed list key | Base | Resume key | Base |
| --- | --- | --- | --- | --- |
| com | fayad-computer-progress | 0 | | |
| prg | fayad-programming-fundamentals-progress | 1 | | |
| html | fayad-html-progress | 1 | | |
| css | (none) | | fayad-css-current-lesson | 0 |
| js | fayad-js-completed-lessons | 0 | fayad-js-current-lesson | 0 |
| react | fayad-react-completed-lessons | 0 | fayad-react-current-lesson | 0 |
| vue | fayad-vue-learning-progress | 1 | | |
| angular | (none; per-question passes in fayad-angular-quiz-progress-v2) | | fayad-angular-current-lesson | 0 |

## JavaScript course: deliberate differences from the legacy implementation
1. The two articles "What is JavaScript?" / "JavaScript makes pages interactive" were static HTML shown on **all 25 lessons**. They now belong to lesson 1 only (text preserved; verified).
2. Learner code runs in the sandboxed runner instead of `new Function` on the site's origin. A live stage (h1, result paragraph, button) inside the sandbox replaces the page's own `#jsResult`, so DOM lessons operate on the stage.
3. All console methods work and all console lines are shown (legacy supported only `console.log` and displayed only the last call).
4. Correct/wrong answers get visible styling (legacy added class names its stylesheet did not define).
5. `#lesson-N` deep links open that lesson (legacy ignored them); the URL hash follows the open lesson.
6. Arrow-key navigation follows the page direction.
7. Progress is stored in `fayad-progress-v1` and mirrored to the legacy keys (compat release).
