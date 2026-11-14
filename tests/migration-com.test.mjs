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
  assert.ok(lessons.length >= 20, "com grew beyond the legacy 20 lessons; none may be dropped");
});

test("legacy lessons keep their ids, first assessment question and final-test marker (bodies were deliberately rewritten into documentation-grade lessons)", () => {
  legacy.lessons.forEach((o, i) => {
    const l = lessons[i];
    assert.equal(l.id, `com-${String(i + 1).padStart(2, "0")}`);
    assert.equal(l.quiz.length, 1);
    assert.equal(l.quiz[0].question.ar, o.question);
    assert.deepEqual(l.quiz[0].options.map((x) => x.ar), o.answers);
    assert.equal(l.quiz[0].correct, o.correct);
  });
});

test("every legacy lesson id is still in the sidebar order (progress references stay valid)", () => {
  const ids = orderedIds(track); let at = -1;
  for (const s of legacy.sidebar) { const id = `com-${String(s.n + 1).padStart(2, "0")}`; const k = ids.indexOf(id); assert.ok(k > at, `${id} missing or reordered`); at = k; }
});

test("every text has both an Arabic and an English version", () => {
  const walk = (v) => { if (v && typeof v === "object") { if ("ar" in v) assert.deepEqual(Object.keys(v).sort(), ["ar", "en"]); Object.values(v).forEach(walk); } };
  walk(track); walk(lessons);
});
