# Lesson schema (shared by every course)

One content module per course: `content/<track>/index.js` exporting `track` and `lessons`.
All learner-facing text is an object keyed by language (`{ ar: "..." }`; `en` is added in Milestone 6 and falls back to `ar`).
Code is language-neutral (plain strings). Lesson ids are **frozen** (`<track>-<NN>`): progress is stored against them.

```js
export const track = {
  id: "js",
  runtime: "dom-js",            // how learner code runs: "dom-js" | "js" | "html" | "none" (see docs/sandbox.md)
  groups: [ { id, title: {ar}, lessons: ["js-01", ...] } ],   // sidebar structure; every lesson must be in exactly one group
};

export const lessons = [{
  id: "js-01",
  title: { ar },
  description: { ar },
  sections: [ { label?: {ar}, title: {ar}, html: {ar} } ],    // optional explanatory cards (authored, trusted HTML)
  example: { code: "...", explanation?: { ar: "<authored html>" } },
  practice?: { starterCode?: "..." },                         // defaults to example.code
  quiz: [ { question: {ar}, options: [ {ar}, ... ], correct: 0 } ],
}];
```

Rules enforced by `tests/content.test.mjs`: ids unique, contiguous and matching the filename order; every lesson in exactly one
group; every quiz has >= 1 question, >= 2 options and a valid `correct`; no empty strings; groups only reference known ids.
`html` fields are authored content shipped with the site (never user input); learner-provided text is always inserted as text.

## Foundation layout (Programming Fundamentals; Computer Basics next)
`track.layout: "foundation"` selects `js/engine/foundation-view.js` (bound to the existing prg.html markup) instead of the default view.
Extra optional lesson fields (required when the layout is foundation): `heading`, `level`, `body` (authored trusted HTML), `key`, `challenge`
(all `{ar}` text), `icon` (Font Awesome class, e.g. `"fa-terminal"`), and `example.code`; plus optional `navTitle` (sidebar label when it
differs from `title`). The foundation layout takes **exactly one** quiz question per lesson. Rules of this layout: one attempt per question,
quiz does not gate completion, completion is the manual button.

`track.assessment` (optional, any layout): `{ id, title: {ar}, passPercent: 1-100, questions: [ {question, options, correct} ] }`.
Passing it completes every lesson of the track (the legacy rule). `track.runtime: "js"` runs learner code in the Worker runtime; `format: "json"` console formatting is requested by the view.

`track.layout: "foundation-lite"` (Computer Basics) uses the same view with the lighter page: required lesson fields `body`, `key`, `icon`,
`practice.prompt`, exactly one quiz question; optional `isFinal: true` marks the lesson shown with the final-test style. No editor, example or assessment.
