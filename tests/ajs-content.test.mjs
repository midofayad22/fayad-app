// Advanced JavaScript: every runnable example must produce exactly the output printed in the lesson,
// every practice starter must run without errors, and the track must satisfy the shared schema.
import { test } from "node:test";
import assert from "node:assert/strict";
import util from "node:util";
import vm from "node:vm";
import { track, lessons } from "../content/ajs/index.js";
import { validateTrack } from "../js/engine/schema.js";

function run(code, ms = 700) {
  const lines = []; const errors = [];
  const sandbox = {
    console: { log: (...a) => lines.push(util.format(...a)), error: (...a) => lines.push(util.format(...a)) },
    setTimeout, clearTimeout, queueMicrotask, structuredClone, AbortController, Intl, performance,
  };
  const ctx = vm.createContext(sandbox);
  process.once("unhandledRejection", (e) => errors.push(e));
  vm.runInContext(code, ctx, { timeout: 2000 });
  return new Promise((resolve) => setTimeout(() => resolve({ lines, errors }), ms));
}

test("ajs: schema is valid and ids are contiguous", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  assert.equal(lessons.length, 22);
  assert.ok(lessons.every((l) => l.quiz.length >= 3 && l.sections.length >= 1 && l.example.code && l.practice.prompt));
});

for (const l of lessons) {
  test(`ajs ${l.id}: example output matches the lesson text`, async () => {
    const { lines, errors } = await run(l.example.code);
    assert.deepEqual(errors, []);
    const expected = l.example.result.ar.replace(/^<pre dir="ltr">|<\/pre>$/g, "").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
    assert.equal(lines.join("\n"), expected);
  });
  test(`ajs ${l.id}: practice starter runs without errors`, async () => {
    const { lines, errors } = await run(l.practice.starterCode, 200);
    assert.deepEqual(errors, []);
    assert.ok(lines.length > 0, "starter prints something");
  });
}
