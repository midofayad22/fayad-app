// Course state machine rules (pure unit tests).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createState } from "../js/engine/state.js";
import { createProgress } from "../js/engine/progress.js";
import { track, lessons } from "../content/js/index.js";

function setup(init = {}) {
  const m = new Map(Object.entries(init));
  const storage = { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) };
  const progress = createProgress({ storage, totals: { js: lessons.length } });
  return { storage, progress, s: createState({ track, lessons, progress }) };
}
const solve = (s) => { const r = s.answer(s.questionData.correct); assert.equal(r.correct, true); return s.advance(); };

test("starts at lesson 1; opening a lesson saves the resume pointer but never completes it", () => {
  const { s, progress } = setup();
  assert.equal(s.current, "js-01");
  s.open("js-05");
  assert.equal(progress.current("js"), "js-05");
  assert.equal(progress.isCompleted("js", "js-05"), false);
  assert.equal(s.completedCount, 0);
});

test("a wrong answer does not pass and can be retried; a correct one locks the question", () => {
  const { s, progress } = setup();
  const wrong = (s.questionData.correct + 1) % s.questionData.options.length;
  assert.deepEqual(s.answer(wrong), { correct: false });
  assert.equal(s.passedQuestion, false);
  assert.deepEqual(s.advance(), { type: "noop" }); // cannot advance without a correct answer
  assert.deepEqual(s.answer(s.questionData.correct), { correct: true });
  assert.equal(s.passedQuestion, true);
  assert.equal(s.answer(wrong).ignored, true); // locked
  assert.deepEqual(progress.quiz("js", "js-01").passed, [0]);
  assert.equal(progress.quiz("js", "js-01").attempts, 2);
});

test("a lesson completes only after every question is correct, then moves to the next lesson", () => {
  const { s, progress } = setup();
  const n = s.questionCount;
  for (let i = 0; i < n - 1; i++) { assert.equal(solve(s).type, "question"); assert.equal(progress.isCompleted("js", "js-01"), false); }
  assert.equal(s.isLastQuestion, true);
  const r = solve(s);
  assert.deepEqual(r, { type: "completed", next: "js-02", courseDone: false });
  assert.equal(progress.isCompleted("js", "js-01"), true);
  assert.equal(s.current, "js-02");
  assert.equal(s.question, 0);
});

test("finishing the last lesson reports courseDone and stays on it", () => {
  const { s } = setup();
  s.open(s.order.at(-1));
  let r; do { r = solve(s); } while (r.type === "question");
  assert.deepEqual(r, { type: "completed", next: null, courseDone: true });
  assert.equal(s.current, s.order.at(-1));
  assert.equal(s.percent > 0, true);
});

test("switching lessons restarts that lesson's quiz (partial quiz state is not persisted)", () => {
  const { s } = setup();
  solve(s); assert.equal(s.question, 1);
  s.open("js-02"); s.open("js-01");
  assert.equal(s.question, 0);
  assert.equal(s.passedQuestion, false);
});

test("prev/next/order cover every lesson exactly once", () => {
  const { s } = setup();
  const seen = [];
  s.open(s.order[0]);
  for (;;) { seen.push(s.current); const n = s.nextId(); if (!n) break; s.open(n); }
  assert.deepEqual(seen, lessons.map((l) => l.id));
  assert.equal(s.hasNext, false);
  s.open(s.order[0]); assert.equal(s.hasPrev, false); assert.equal(s.prevId(), null);
});

test("unknown ids are rejected; resume falls back to the first lesson on bad data", () => {
  const { s } = setup({ "fayad-js-current-lesson": "999" });
  assert.equal(s.open("js-99"), false);
  assert.equal(s.resumeId(), "js-01");
});

test("legacy progress is honoured: completed lessons and resume pointer are imported", () => {
  const { s } = setup({ "fayad-js-completed-lessons": "[0,1,2]", "fayad-js-current-lesson": "3" });
  assert.equal(s.completedCount, 3);
  assert.equal(s.resumeId(), "js-04");
  assert.equal(s.percent, Math.round((3 / 25) * 100));
});

test("invalid option index is ignored", () => {
  const { s } = setup();
  assert.equal(s.answer(-1).ignored, true);
  assert.equal(s.answer(99).ignored, true);
  assert.equal(s.answer(1.5).ignored, true);
});
