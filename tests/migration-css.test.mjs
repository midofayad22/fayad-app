// Parity: migrated CSS course content equals the frozen snapshot of the legacy implementation, in BOTH languages.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/css/index.js";
import { validateTrack, orderedIds } from "../js/engine/schema.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-css.json", "utf8"));
const D = legacy.languageData;

test("schema-valid; 30 lessons, 3 questions each, in the 6 legacy sidebar groups", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  assert.equal(lessons.length, 30);
  assert.deepEqual(track.groups.map((g) => g.title.ar), legacy.groups.map((g) => g.ar));
  assert.equal(orderedIds(track).length, 30);
  assert.deepEqual(orderedIds(track), legacy.groups.flatMap((g) => g.lessons).map((it) => `css-${String(it.n + 1).padStart(2, "0")}`));
});

test("every title, description, code, question, answer and correct index is identical to the legacy data (ar + en)", () => {
  lessons.forEach((l, i) => {
    const o = legacy.lessons[i];
    assert.equal(l.id, `css-${String(i + 1).padStart(2, "0")}`);
    assert.equal(l.title.ar, o.titleAr); assert.equal(l.title.en, o.title);
    assert.equal(l.description.ar, o.descriptionAr); assert.equal(l.description.en, o.description);
    assert.equal(l.example.code, o.code);
    assert.equal(l.quiz.length, legacy.quizCount);
    l.quiz.forEach((q, j) => {
      assert.equal(q.question.ar, o.questions[j].questionAr); assert.equal(q.question.en, o.questions[j].question);
      assert.deepEqual(q.options.map((x) => x.ar), o.questions[j].answersAr);
      assert.deepEqual(q.options.map((x) => x.en), o.questions[j].answers);
      assert.equal(q.correct, o.questions[j].correct);
    });
  });
});

test("group titles and the static cards (what is CSS, key idea, syntax) keep the legacy text in both languages", () => {
  const names = ["basics", "boxModel", "textFonts", "layout", "modern", "advanced"];
  track.groups.forEach((g, i) => { assert.equal(g.title.ar, D.ar[names[i]]); assert.equal(g.title.en, D.en[names[i]]); });
  const [what, key] = lessons[0].sections;
  for (const lang of ["ar", "en"]) {
    assert.equal(what.title[lang], D[lang].whatIsCss);
    assert.equal(what.html[lang], `<p>${D[lang].whatIsCssP1}</p><p>${D[lang].whatIsCssP2}</p><p>${D[lang].whatIsCssP3}</p>`);
    assert.equal(key.label[lang], D[lang].keyIdea); assert.equal(key.title[lang], D[lang].keyIdeaTitle); assert.equal(key.html[lang], `<p>${D[lang].keyIdeaText}</p>`);
    assert.equal(lessons[1].sections[0].title[lang], D[lang].syntaxTitle);
    assert.equal(lessons[1].sections[0].html[lang], `<p>${D[lang].syntaxP1}</p><p>${D[lang].syntaxP2}</p><p>${D[lang].syntaxP3}</p>`);
  }
});

test("the legacy page's sidebar names equal the migrated Arabic titles", () => {
  legacy.groups.flatMap((g) => g.lessons).forEach((it) => assert.equal(lessons[it.n].title.ar, it.name));
});
