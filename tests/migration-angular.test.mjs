// Parity: migrated Angular course content equals the frozen snapshot of the legacy implementation (both languages, generated quiz included).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/angular/index.js";
import { validateTrack, orderedIds } from "../js/engine/schema.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-angular.json", "utf8"));
const pad = (n) => `angular-${String(n).padStart(2, "0")}`;

test("schema-valid; 32 lessons (legacy sidebar listed 30), 6 questions each, 3 groups with bilingual titles", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  assert.equal(lessons.length, 32);
  assert.deepEqual(track.groups.map((g) => g.title), legacy.groupTitles);
  const ids = orderedIds(track);
  assert.equal(ids.length, 32);
  assert.deepEqual(ids.slice(0, 30), legacy.sidebar.flatMap((g) => g.items).map((it) => pad(it.n)));
  assert.deepEqual(ids.slice(30), [pad(31), pad(32)]);
});

test("title, description, explanation, code are identical to the legacy data in ar and en", () => {
  lessons.forEach((l, i) => {
    const o = legacy.lessons[i];
    assert.equal(l.id, pad(i + 1));
    assert.deepEqual(l.title, o.title); assert.deepEqual(l.description, o.description); assert.deepEqual(l.body, o.explanation);
    assert.equal(l.example.code, o.code); assert.equal(l.practice.starterCode, o.code);
    assert.deepEqual(l.practice.prompt, legacy.practiceDescription);
  });
});

test("the legacy generated quiz (6 questions per lesson) is preserved: questions, English options, correct index", () => {
  lessons.forEach((l, i) => {
    assert.equal(l.quiz.length, legacy.quizCount);
    l.quiz.forEach((q, j) => {
      const o = legacy.quiz[i][j];
      assert.deepEqual(q.question, o.question);
      assert.deepEqual(q.options.map((x) => x.en), o.answers.map((x) => x.en));
      assert.equal(q.correct, o.correct);
      if (j > 0) assert.deepEqual(q.options, o.answers); // questions 2-6 are bilingual in the legacy data as-is
    });
    // question 1: the legacy page showed the English answers in Arabic mode; the lesson's own Arabic answers are used
    assert.deepEqual(l.quiz[0].options.map((x) => x.ar), legacy.lessons[i].answers.ar);
  });
});

test("sidebar names equal the Arabic titles", () => {
  legacy.sidebar.flatMap((g) => g.items).forEach((it) => assert.equal(lessons[it.n - 1].title.ar, it.name));
});

test("simulation labels cover every detected feature in both languages", () => {
  for (const k of ["writeCode", "nothingPreview", "angularPreview", "codeLoaded", "detected", "component", "signals", "standalone"]) assert.ok(track.simLabels[k].ar && track.simLabels[k].en, k);
});
