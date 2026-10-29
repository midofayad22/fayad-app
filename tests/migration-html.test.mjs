// Parity: migrated HTML course content equals the frozen snapshot of the legacy implementation, text for text.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/html/index.js";
import { validateTrack, orderedIds } from "../js/engine/schema.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-html.json", "utf8"));

test("schema-valid; 30 lessons like the legacy data (the legacy sidebar listed only 22)", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  assert.equal(legacy.lessons.length, 30);
  assert.equal(lessons.length, 30);
  assert.equal(legacy.sidebar.flatMap((g) => g.items).length, 22);
});

test("every title, description, body, example, result, explanation, practice and quiz is byte-identical to the legacy data", () => {
  lessons.forEach((l, i) => {
    const o = legacy.lessons[i];
    assert.equal(l.id, `html-${String(i + 1).padStart(2, "0")}`);
    assert.equal(l.kicker, o.group);
    assert.equal(l.title.ar, o.title);
    assert.equal(l.description.ar, o.description);
    assert.equal(l.body.ar, o.content);
    assert.equal(l.example.title.ar, o.exampleTitle);
    assert.equal(l.example.code, o.exampleCode);
    assert.equal(l.example.result.ar, o.result);
    assert.equal(l.example.explanation.ar, o.explanation);
    assert.equal(l.practice.prompt.ar, o.practice);
    assert.equal(l.practice.starterCode, o.starterCode);
    assert.equal(l.quiz.length, 3);
    l.quiz.forEach((q, j) => {
      assert.equal(q.question.ar, o.questions[j].question);
      assert.deepEqual(q.options.map((x) => x.ar), o.questions[j].options);
      assert.equal(q.correct, o.questions[j].correct);
    });
  });
});

test("every one of the 30 lessons is in exactly one sidebar group; the first 22 keep the legacy order and labels", () => {
  const ids = orderedIds(track);
  assert.equal(new Set(ids).size, 30);
  assert.deepEqual(track.groups.map((g) => g.title.ar), legacy.sidebar.map((g) => g.title));
  const flat = legacy.sidebar.flatMap((g) => g.items);
  flat.forEach((it) => { const l = lessons[it.n]; assert.equal((l.navTitle ?? l.title).ar, it.name); });
  assert.deepEqual(ids.slice(0, 22), flat.map((it) => `html-${String(it.n + 1).padStart(2, "0")}`));
  assert.deepEqual(ids.slice(22), Array.from({ length: 8 }, (_, i) => `html-${23 + i}`)); // the 8 lessons the old sidebar never listed
});

test("the shuffled-option bookkeeping the legacy engine added at runtime is not part of the data", () => {
  assert.ok(!JSON.stringify(legacy.lessons).includes("_shuffled"));
});
