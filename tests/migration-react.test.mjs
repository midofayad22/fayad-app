// Parity: migrated React course content equals the frozen snapshot of the legacy implementation.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/react/index.js";
import { validateTrack, orderedIds } from "../js/engine/schema.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-react.json", "utf8"));
const pad = (n) => `react-${String(n).padStart(2, "0")}`;

test("schema-valid; 30 lessons, 3 questions each, in the 5 legacy sidebar groups", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  assert.equal(lessons.length, 30);
  assert.equal(track.runtime, "sim-react");
  assert.deepEqual(track.groups.map((g) => g.title.ar), legacy.sidebar.map((g) => g.title));
  assert.deepEqual(orderedIds(track), legacy.sidebar.flatMap((g) => g.items).map((it) => pad(it.n + 1)));
});

test("every field of every lesson and question is identical to the legacy data", () => {
  lessons.forEach((l, i) => {
    const o = legacy.lessons[i];
    assert.equal(l.id, pad(i + 1));
    assert.equal(l.title.ar, o.title); assert.equal(l.description.ar, o.description);
    assert.equal(l.body.ar, o.content); assert.equal(l.key.ar, o.keyIdea);
    assert.equal(l.example.code, o.code); assert.equal(l.example.explanation.ar, o.explanation);
    assert.equal(l.practice.prompt.ar, o.practice);
    assert.equal(l.quiz.length, legacy.quizCount);
    l.quiz.forEach((q, j) => {
      assert.equal(q.question.ar, o.questions[j].question);
      assert.deepEqual(q.options.map((x) => x.ar), o.questions[j].answers);
      assert.equal(q.correct, o.questions[j].correct);
    });
  });
});

test("sidebar names from the legacy page are preserved (as title or navTitle)", () => {
  legacy.sidebar.flatMap((g) => g.items).forEach((it) => assert.equal((lessons[it.n].navTitle ?? lessons[it.n].title).ar, it.name));
});
