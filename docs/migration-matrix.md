# Migration matrix (real state, updated per increment)

Legend: ✅ done and verified by tests · ⏳ not started · Preview verification is only recorded when a human/browser actually opened it.

| Track | URL (unchanged) | Legacy lessons (data) | Lessons in legacy sidebar | New lessons (data) | In new sidebar | Content parity | Engine tests | Legacy kept for rollback | Preview verified |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| js | /javascript-learning/javascript-learning.html | 25 | 25 | 25 | 25 (built from data) | ✅ byte-identical (tests/migration-js.test.mjs) | ✅ tests/js-engine.test.mjs | `legacy/javascript-learning/` (`?engine=legacy`) | no (sandbox cannot reach *.vercel.app) |
| prg | /fundamentals/programming-basics/prg.html | 20 + 8-question final assessment | 21 (20 + final) | 20 + 8-question final assessment | 21 (built from data) | ✅ byte-identical (tests/migration-prg.test.mjs) | ✅ tests/prg-engine.test.mjs (incl. output parity of all 20 examples vs legacy) | `legacy/programming-basics/` (`?engine=legacy`) | no (sandbox cannot reach *.vercel.app) |
| com | /fundamentals/computer-basics/com.html | 20 | 20 | 20 | 20 (built from data) | ✅ byte-identical (tests/migration-com.test.mjs) | ✅ tests/com-engine.test.mjs | `legacy/computer-basics/` (`?engine=legacy`) | no (sandbox cannot reach *.vercel.app) |
| html | /html-learning/html-learning.html | 30 | **22** (8 unreachable from sidebar) | 30 | **30** (built from data; the 8 missing lessons added to their own group) | ✅ byte-identical (tests/migration-html.test.mjs) | ✅ tests/html-engine.test.mjs | `legacy/html-learning/` (`?engine=legacy`) | no (sandbox cannot reach *.vercel.app) |
| css | /css-learning/css-learning.html | 30 | 30 | 30 | 30 (built from data, 6 groups) | ✅ identical, Arabic + English (tests/migration-css.test.mjs) | ✅ tests/css-engine.test.mjs | `legacy/css-learning/` (`?engine=legacy`) | no (sandbox cannot reach *.vercel.app) |
| react | /react-learning/react-learning.html | 30 | 30 | 30 | 30 (built from data, 5 groups) | ✅ identical, Arabic (tests/migration-react.test.mjs) | ✅ tests/react-engine.test.mjs | `legacy/react-learning/` (`?engine=legacy`) | yes |
| vue | /vue-learning/vue-learning.html | 22 | 22 | 22 | 22 (built from data, 5 groups) | ✅ identical, Arabic (tests/migration-vue.test.mjs) | ✅ tests/vue-engine.test.mjs | `legacy/vue-learning/` (`?engine=legacy`) | yes |
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

## Programming Fundamentals: deliberate differences from the legacy implementation
Content (titles, headings, levels, icons, bodies, key ideas, examples, challenges, quiz questions/answers, final assessment, order) is byte-identical. Behaviour kept: one quiz attempt per lesson that does not gate completion; manual "إتمام الدرس"; final assessment pass mark 70% completes all 20 lessons.
1. Learner code runs in the sandboxed runner (`runtime: "js"`, killable Worker inside an opaque-origin iframe) instead of `new Function` on the site's origin. Infinite loops are stopped after 3 s with a message (legacy froze the tab).
2. Output parity: objects/arrays still print as pretty JSON (runner option `format: "json"`), `console.error` still prints `Error: …`. 19 of 20 example programs print identical text. Lesson 19's example is itself a syntax error in the legacy data (kept verbatim); the new message carries the error name (`SyntaxError: …`). Runtime errors also carry the error name. `console.warn/info` now work (legacy threw).
3. The legacy 350 ms artificial delay before showing output is gone.
4. The sidebar is built from data, including the final assessment entry; `#lesson-N` and `#final` deep links work (legacy ignored them); the page resumes at the last opened lesson (legacy always started at lesson 1).
5. Legacy bug fixed: re-opening the final assessment left a stale "close" handler on the next button, so "next question" also closed the dialog. The dialog now also has `role="dialog"`, closes on overlay click/Escape and restores focus.
6. Quiz and assessment text is inserted as text, not HTML (verified: no legacy text contained markup).
7. Sidebar label of lesson 13 is "Parameters" while its title is "Parameters & Arguments" in the legacy data; both are preserved (`navTitle`).
8. Progress goes to `fayad-progress-v1`, mirrored to `fayad-programming-fundamentals-progress` (1-based list). No resume key existed in legacy, so the resume pointer lives only in v1. Per-question quiz results are recorded in v1 only. The final-assessment score is not persisted (no storage existed for it).

## Computer Basics: deliberate differences from the legacy implementation
Content (titles, icons, bodies, key concepts, practice text, quiz questions/answers, final-test marker, order) is byte-identical; the page has no code execution. Behaviour kept: one quiz attempt per lesson (all options lock, a wrong answer names the correct one), manual "إكمال الدرس", the last lesson ("الاختبار النهائي") is an ordinary lesson with a quiz question and ends the course.
1. Sidebar built from data. `data-lesson` is now 1-based (it was 0-based); `#lesson-N` deep links work; the page resumes at the last opened lesson (legacy always started at lesson 1).
2. Legacy data flag `final: true` on lesson 20 (never read by the legacy code) is preserved as `isFinal` and drives the `final-item` sidebar style.
3. Quiz text is inserted as text. Progress goes to `fayad-progress-v1`, mirrored to the legacy 0-based list `fayad-computer-progress`; quiz attempts are recorded in v1 only.

## HTML course: deliberate differences from the legacy implementation
Content is byte-identical (titles, descriptions, bodies, examples, results, explanations, practice texts, 90 questions, order).
1. **Sidebar completeness**: the legacy sidebar listed 22 of 30 lessons (and its click handler mapped sidebar position k to lesson k, so position 2 re-opened lesson 1). The sidebar is now built from data: all 30 lessons, positions open the lesson they show. Lessons 23-30 sit in "HTML متقدم" (their own group label is ADVANCED HTML). Legacy sidebar labels that differ from lesson titles are kept as `navTitle`.
2. **Security**: the live preview iframe had no `sandbox` (learner HTML with `<script>` ran with the site's origin). It now runs in the shared sandboxed runner (`allow-scripts` only); loops in inline `<script>` blocks and `on*=` handlers are loop-guarded (runner change, also used by every html-runtime preview).
3. The practice text (`practice`) was never displayed by the legacy page (it wrote to a non-existent element); it is now shown above the editor.
4. Quiz: option shuffling is kept (`track.quiz.shuffle`); feedback texts, the next-button labels and the course-complete message now come from the shared interface dictionary (identical across courses, available in English). Wrong options are disabled once chosen.
5. All interface text is in `js/engine/strings.js` (ar + en) and follows the language switch; lesson content stays Arabic until English content exists (falls back to Arabic).
6. Mobile: the lesson list is a collapsible panel. Course pages share `css/course.css` (the old per-course stylesheet is kept only under `legacy/`). The page has a static `<h1>` (course title); the lesson title is an `<h2>`.
7. Progress: `fayad-progress-v1` mirrored to the legacy 1-based list `fayad-html-progress`.

## CSS course: deliberate differences from the legacy implementation
Content is identical in both languages (30 titles, descriptions, example codes, 90 questions with their Arabic and English answers, order, 6 group names).
1. **Real English lesson text**: the legacy data already carried English for titles, descriptions, questions and answers, but its quiz always showed Arabic. The quiz now follows the language switch.
2. **Static cards**: "What is CSS?", the key idea and the syntax explanation were repeated on every lesson. They now appear once, as sections of the lessons they teach (1 and 2), with the same ar/en text.
3. **Security/scoping**: learner CSS was injected as a global `<style>` into the host page (it could restyle the site UI). It now runs only inside the sandboxed preview, applied to a fixed demo document (h1, p, button); the "result" card renders the example the same way.
4. **Completion**: the legacy CSS page never stored completed lessons (only the current lesson, which remains mirrored to `fayad-css-current-lesson`). A lesson now completes when its 3 questions are answered correctly (shared rule), stored in `fayad-progress-v1`.
5. The progress bar shows completed lessons instead of "lesson number / 30".

## React course: deliberate differences from the legacy implementation

- Content is converted mechanically (`tools/convert-react-track.mjs`, frozen fixture `tests/fixtures/legacy-react.json`); Arabic only, as in the legacy page.
- Preview stays a non-executing simulation (`sim-react`); learner code is never evaluated.
- 7 lessons keep their shorter sidebar names via `navTitle`.
- The legacy quiz-resume pointer (`fayad-react-quiz-progress`) is not migrated; completed and current-lesson keys are mirrored.

## Vue course: deliberate differences from the legacy implementation

- Content is converted mechanically (`tools/convert-vue-track.mjs`, frozen fixture `tests/fixtures/legacy-vue.json`); Arabic only, as in the legacy page.
- Vue 3.5.13 is vendored (`vendor/vue-3.5.13/`, MIT) instead of loading `unpkg.com/vue@3` (unpinned, network-dependent). The preview now runs in the sandboxed runner (`allow-scripts`, loop guard) instead of an unsandboxed iframe.
- The schema accepts `key: { title, text }` for the key card.
- The legacy page had no current-lesson key, so only the completed list (1-based) is mirrored.
- All 22 starters and examples are mounted in the sandbox by tests/vue-engine.test.mjs.
