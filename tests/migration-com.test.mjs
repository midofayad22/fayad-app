// Parity: migrated Computer Basics content equals the frozen snapshot of the legacy implementation, text for text.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/com/index.js";
import { validateTrack, orderedIds } from "../js/engine/schema.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-com.json", "utf8"));

test("schema-valid, 20 lessons like the legacy data", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  assert.equal(legacy.lessons.length, 20);
  assert.equal(lessons.length, 20);
});

test("every title, icon, body, key concept, practice text and quiz is byte-identical to the legacy data", () => {
  lessons.forEach((l, i) => {
    const o = legacy.lessons[i];
    assert.equal(l.id, `com-${String(i + 1).padStart(2, "0")}`);
    assert.equal(l.title.ar, o.title, `title ${i + 1}`);
    assert.equal(l.icon, o.icon);
    assert.equal(l.body.ar, o.content, `body ${i + 1}`);
    assert.equal(l.key.ar, o.key);
    assert.equal(l.practice.prompt.ar, o.practice);
    assert.equal(l.quiz.length, 1);
    assert.equal(l.quiz[0].question.ar, o.question);
    assert.deepEqual(l.quiz[0].options.map((x) => x.ar), o.answers);
    assert.equal(l.quiz[0].correct, o.correct);
    assert.equal(l.isFinal === true, o.final === true, `final flag ${i + 1}`);
  });
});

test("order, sidebar labels and the final-test marker equal the legacy sidebar", () => {
  assert.deepEqual(orderedIds(track), legacy.sidebar.map((s) => `com-${String(s.n + 1).padStart(2, "0")}`));
  lessons.forEach((l, i) => { assert.equal((l.navTitle ?? l.title).ar, legacy.sidebar[i].name); assert.equal(l.isFinal === true, legacy.sidebar[i].final); });
  assert.equal(track.groups[0].title.ar, legacy.sidebarHeading);
});

test("only Arabic text exists (English belongs to the localisation milestone)", () => {
  const walk = (v) => { if (v && typeof v === "object") { if ("ar" in v) assert.deepEqual(Object.keys(v), ["ar"]); Object.values(v).forEach(walk); } };
  walk(track); walk(lessons);
});
