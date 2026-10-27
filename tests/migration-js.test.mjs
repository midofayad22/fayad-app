// Parity: the migrated JavaScript course content must equal the frozen snapshot of the legacy implementation, text for text.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/js/index.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-js.json", "utf8"));

test("lesson count equals the legacy data count (25)", () => {
  assert.equal(lessons.length, legacy.lessons.length);
  assert.equal(lessons.length, 25);
});

test("every Arabic title, description, example code, explanation and quiz is byte-identical to the legacy data", () => {
  lessons.forEach((l, i) => {
    const o = legacy.lessons[i];
    assert.equal(l.title.ar, o.title, `title ${i + 1}`);
    assert.equal(l.description.ar, o.description, `description ${i + 1}`);
    assert.equal(l.example.code, o.code, `code ${i + 1}`);
    assert.equal(l.example.explanation?.ar ?? "", o.explanation || "", `explanation ${i + 1}`);
    assert.equal(l.quiz.length, o.questions.length);
    l.quiz.forEach((q, j) => {
      assert.equal(q.question.ar, o.questions[j].question);
      assert.deepEqual(q.options.map((x) => x.ar), o.questions[j].answers);
      assert.equal(q.correct, o.questions[j].correct);
    });
  });
});

test("sidebar groups and order equal the legacy sidebar; every lesson is reachable", () => {
  assert.deepEqual(track.groups.map((g) => g.title.ar), legacy.sidebar.map((g) => g.title));
  const ids = track.groups.flatMap((g) => g.lessons);
  assert.deepEqual(ids, legacy.sidebar.flatMap((g) => g.items.map((it) => `js-${String(it.n).padStart(2, "0")}`)));
  assert.equal(new Set(ids).size, lessons.length);
});

test("the static articles legacy showed on EVERY lesson now belong to lesson 1 only (documented fix), text preserved", () => {
  assert.equal(legacy.staticCards.length, 2);
  assert.equal(lessons[0].sections.length, 2);
  legacy.staticCards.forEach((c, i) => {
    assert.equal(lessons[0].sections[i].title.ar, c.title);
    assert.equal(lessons[0].sections[i].label?.ar ?? null, c.label);
    assert.equal(lessons[0].sections[i].html.ar, c.html);
  });
  for (const l of lessons.slice(1)) assert.equal(l.sections, undefined);
});
