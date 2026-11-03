// Parity: the migrated Programming Fundamentals content must equal the frozen snapshot of the legacy implementation, text for text.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/prg/index.js";
import { validateTrack, orderedIds } from "../js/engine/schema.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-prg.json", "utf8"));
const old = (i) => legacy.lessons[String(i + 1)];

test("the migrated content passes the schema validator", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
});

test("lesson count equals the legacy data count (20) and the fixture is the real legacy data", () => {
  assert.equal(Object.keys(legacy.lessons).length, 20);
  assert.equal(lessons.length, 20);
  assert.equal(legacy.finalQuestions.length, 8);
});

test("every Arabic title, heading, level, icon, body, key idea, example, challenge and quiz is byte-identical to the legacy data", () => {
  lessons.forEach((l, i) => {
    const o = old(i);
    assert.equal(l.id, `prg-${String(i + 1).padStart(2, "0")}`);
    assert.equal(l.title.ar, o.title, `title ${i + 1}`);
    assert.equal(l.heading.ar, o.heading, `heading ${i + 1}`);
    assert.equal(l.icon, o.icon, `icon ${i + 1}`);
    assert.equal(l.level.ar, o.level, `level ${i + 1}`);
    assert.equal(l.body.ar, o.content, `body ${i + 1}`);
    assert.equal(l.key.ar, o.key, `key ${i + 1}`);
    assert.equal(l.example.code, o.example, `example ${i + 1}`);
    assert.equal(l.challenge.ar, o.challenge, `challenge ${i + 1}`);
    assert.equal(l.quiz.length, 1);
    assert.equal(l.quiz[0].question.ar, o.question, `question ${i + 1}`);
    assert.deepEqual(l.quiz[0].options.map((x) => x.ar), o.answers, `answers ${i + 1}`);
    assert.equal(l.quiz[0].correct, o.correct, `correct ${i + 1}`);
  });
});

test("lesson order and sidebar labels equal the legacy sidebar", () => {
  const sidebar = legacy.sidebar.filter((s) => s.n !== "final");
  assert.deepEqual(orderedIds(track), sidebar.map((s) => `prg-${String(s.n).padStart(2, "0")}`));
  lessons.forEach((l, i) => assert.equal((l.navTitle ?? l.title).ar, sidebar[i].name, `sidebar label ${i + 1}`));
  assert.equal(track.groups.length, 1);
  assert.equal(track.groups[0].title.ar, legacy.sidebarHeading);
  assert.equal(legacy.sidebar.at(-1).n, "final");
});

test("the final assessment (8 questions, pass mark 70%) is identical to the legacy one", () => {
  const a = track.assessment;
  assert.equal(a.title.ar, legacy.finalQuizHeading);
  assert.equal(a.passPercent, 70);
  assert.equal(a.questions.length, legacy.finalQuestions.length);
  a.questions.forEach((q, i) => {
    const o = legacy.finalQuestions[i];
    assert.equal(q.question.ar, o.question);
    assert.deepEqual(q.options.map((x) => x.ar), o.options);
    assert.equal(q.correct, o.correct);
  });
});

test("every text has both an Arabic and an English version", () => {
  const walk = (v) => { if (v && typeof v === "object") { if ("ar" in v) assert.deepEqual(Object.keys(v).sort(), ["ar", "en"]); Object.values(v).forEach(walk); } };
  walk(track); walk(lessons);
});

test("the validator rejects a foundation lesson with two quiz questions or a missing field", () => {
  const bad = JSON.parse(JSON.stringify(lessons));
  bad[0].quiz.push(bad[0].quiz[0]);
  delete bad[1].key;
  const errs = validateTrack(track, bad);
  assert.ok(errs.some((e) => /exactly one question/.test(e)));
  assert.ok(errs.some((e) => /key is required/.test(e)));
});
