# Milestone 4: shared lesson engine and unified progress

**Status: APPROVED (decisions 1-3 accepted). Real implementation state is tracked in `docs/migration-matrix.md`; this file is the original plan.**
Deviations from the plan are listed at the bottom.

## 1. What exists today (measured, not assumed)
- 8 course pages, each with its own JS (1,435 to 3,604 lines; ~21,000 lines total) and its own copy of the same
  features: sidebar, lesson render, quiz, completion, progress bar, code editor/preview, copy button.
- Lesson data lives inside each JS file, in **six different shapes**
  (`content`/`exampleCode`/`starterCode`; `code`/`explanation`; `{en, ar}` objects in Angular; `title`+`titleAr` in CSS; ...).
  Quiz answers use `options` in some tracks and `answers` in others.
- Progress is stored in **five formats** (completed-id arrays, current-lesson index, Vue's own key, quiz objects,
  none at all for CSS/Angular completion). See `js/catalog.js` for the exact keys.
- Verified defects caused by the duplication:
  - HTML: 30 lessons in data, 22 in the sidebar (8 reachable only through Next). Angular: 32 vs 30.
  - JavaScript and Programming Basics run learner code with `new Function` **on the site's own origin**, so a pasted
    snippet can read `localStorage` (including the Supabase session). HTML and Vue use an `iframe srcdoc` with no
    `sandbox` attribute. (Fixed in Milestone 5; the engine only needs to host the runner.)
  - Language, theme, progress and quiz behaviour differ per track.

## 2. Proposed design (keeps the static, no-build architecture)
```
/js/engine/
  engine.js        boot: read track config + lessons, render shell, wire events   (ES modules, no bundler)
  progress.js      single progress store (v1 schema), reads legacy keys, writes v1 + mirrors legacy keys
  quiz.js          one quiz component (single-answer; schema supports more later)
  lesson-view.js   renders sections: explanation, key idea, example, practice, quiz
  sidebar.js       builds the lesson list FROM THE DATA (fixes 22 vs 30 / 30 vs 32 for free)
/content/<track>/lessons.js   lesson data in ONE schema (see below), per track, bilingual-ready
/html-learning/html-learning.html   <- URL unchanged; becomes a thin page that loads the engine with track="html"
```
Lesson schema (one shape for all tracks):
```js
{ id: "html-12", title: {ar, en?}, summary: {ar, en?}, blocks: [ {type:"text"|"key"|"example"|"practice", ...} ],
  quiz: [ {q:{ar,en?}, options:[{ar,en?}], correct: 0, explain?:{ar,en?}} ], runtime: "html"|"js"|"none"|... }
```
Missing `en` falls back to Arabic with the existing honest notice (no machine translation presented as real).

## 3. Compatibility guarantees (each one becomes a test)
1. Every existing public URL keeps working with the same `.html` path (no redirects needed).
2. **No user loses progress.** On first load the engine reads every legacy key listed in `js/catalog.js`, builds the v1
   record, and keeps writing the legacy keys too for one release (so rolling back the deploy loses nothing).
3. Lesson order, ids and content are migrated mechanically by a script and verified by a test that diffs
   title / body / quiz text between old data and new data (character-for-character for Arabic text).
4. Theme, language and the homepage "continue learning" keep working unchanged (they read the same keys).
5. `fayad:langchange` / `fayad:themechange` events stay the integration points.

## 4. Unified progress format (v1, localStorage now, Supabase later)
```json
{ "v":1, "tracks": { "html": { "completed":[1,2,3], "current":4, "quiz": {"3": {"best":3,"attempts":2}}, "updatedAt": 1730000000000 } } }
```
key `fayad-progress-v1`. Pure data; `progress.js` is the only writer. Milestone 7 syncs this exact shape to Supabase.

## 5. Delivery plan (each step shippable, tested, pushed with its own Preview)
| Step | Change | Risk | Rollback |
| --- | --- | --- | --- |
| 4a | `progress.js` + migration of legacy keys, no UI change; track pages call it | low | revert one commit |
| 4b | Lesson data converter + data-equality tests (all 8 tracks) | low (no runtime change) | n/a |
| 4c | Engine + sidebar-from-data for **JavaScript** track only (smallest, uses `new Function` today) | medium | feature flag `?engine=legacy` |
| 4d | **Programming ✅ done (foundation layout, parity + rollback tested).** Convert Computer, HTML, CSS, React, Vue, Angular one at a time; delete each old JS after its parity test passes | medium | per-track revert |
| 4e | Remove dead code, keep legacy-key mirroring | low | n/a |

Parity tests per track: lesson count = data count, every sidebar entry opens, Next/Prev walk all lessons, quiz grades
correctly, completion persists across reload, legacy progress imported, both themes, both languages, 390px no overflow.

## 6. What I will not do
No framework or bundler migration; no change to public URLs; no deletion of a track's old script before its parity test
passes; no write to Supabase in this milestone.

## 7. Decisions needed from you
1. **Approve the shared engine as described** (ES modules, no build step, per-track data files)?
2. Is it acceptable that **lesson content is converted mechanically** (same Arabic text, reshaped into one schema) and that
   English is added later in Milestone 6 rather than during the conversion?
3. Keep mirroring legacy progress keys for one release (recommended) or switch to v1 only?

## 8. Work that continues while this waits (independent of the engine)
Milestone 5's sandboxed runner (separate module, own tests) and Milestone 6 curriculum drafting do not depend on this
approval and will proceed; the runner is written as a standalone component the engine can host.

## Deviations from the plan (recorded as implemented)
- Progress ids are `<track>-<NN>` (zero padded ordinal frozen at conversion) and the store passes through data of tracks a page does not know about.
- The JavaScript course needed a DOM stage inside the sandbox (most lessons write to `#jsResult`), and a busy loop in a sandboxed iframe was
  verified to freeze the parent page, so the runner gained a tokenizer-based loop guard (js/playground/loop-guard.js); console-only code
  runs in a killable Worker.
- Rollback uses committed `legacy/` copies plus `?engine=legacy` (docs/rollback.md) rather than a localStorage flag.
