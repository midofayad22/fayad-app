// Parity: migrated Vue course content equals the frozen snapshot of the legacy implementation.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lessons, track } from "../content/vue/index.js";
import { validateTrack, orderedIds } from "../js/engine/schema.js";

const legacy = JSON.parse(fs.readFileSync("tests/fixtures/legacy-vue.json", "utf8"));
const pad = (n) => `vue-${String(n).padStart(2, "0")}`;

test("schema-valid; 22 lessons, 3 questions each, in the 5 legacy sidebar groups", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  assert.equal(lessons.length, 22);
  assert.deepEqual(track.groups.map((g) => g.title.ar), legacy.sidebar.map((g) => g.title));
  assert.deepEqual(orderedIds(track), legacy.sidebar.flatMap((g) => g.items).map((it) => pad(it.n + 1)));
  // each lesson's legacy "group" label equals the sidebar group that lists it
  lessons.forEach((l, i) => assert.equal(track.groups.find((g) => g.lessons.includes(l.id)).title.ar, legacy.lessons[i].group));
});

test("every field of every lesson and question is identical to the legacy data", () => {
  lessons.forEach((l, i) => {
    const o = legacy.lessons[i];
    assert.equal(l.id, pad(o.id));
    assert.equal(l.title.ar, o.title); assert.equal(l.description.ar, o.description);
    assert.equal(l.body.ar, o.content);
    assert.equal(l.key.title.ar, o.keyTitle); assert.equal(l.key.text.ar, o.keyDescription);
    assert.equal(l.example.code, o.example); assert.equal(l.example.result.ar, o.result); assert.equal(l.example.explanation.ar, o.explanation.replace("</code تراقب", "</code> تراقب")) // legacy typo (missing ">") fixed in the content;
    assert.equal(l.practice.prompt.ar, o.challenge); assert.equal(l.practice.starterCode, o.starterCode);
    assert.equal(l.quiz.length, 3);
    l.quiz.forEach((q, j) => {
      assert.equal(q.question.ar, o.questions[j].question);
      assert.deepEqual(q.options.map((x) => x.ar), o.questions[j].options);
      assert.equal(q.correct, o.questions[j].correct);
    });
  });
});

test("sidebar names from the legacy page equal the migrated titles", () => {
  legacy.sidebar.flatMap((g) => g.items).forEach((it) => assert.equal((lessons[it.n].navTitle ?? lessons[it.n].title).ar, it.name));
});

test("Vue is vendored same-origin (pinned); no CDN reference remains in the track", () => {
  assert.match(track.preview.head, /\/vendor\/vue-3\.5\.13\/vue\.global\.prod\.js/);
  assert.ok(!/https?:\/\//.test(track.preview.head));
  assert.ok(fs.existsSync("vendor/vue-3.5.13/vue.global.prod.js"));
});
