// Milestone 4a: fayad-progress-v1 store. Pure unit tests with a fake storage (no browser).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createProgress, KEY, LEGACY, lessonId, ordinalOf, legacyListToIds, normalize } from "../js/engine/progress.js";

const TOTALS = { com: 20, prg: 20, html: 30, css: 30, js: 25, react: 30, vue: 22, angular: 32 };

function fakeStorage(init = {}) {
  const m = new Map(Object.entries(init));
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: (k) => { m.delete(k); }, _m: m };
}
const mk = (init, extra) => { const storage = fakeStorage(init); return { storage, p: createProgress({ storage, totals: TOTALS, now: () => 1000, ...extra }) }; };

test("empty storage yields an empty record and writes nothing until something changes", () => {
  const { storage, p } = mk();
  assert.deepEqual(p.snapshot(), { v: 1, tracks: {}, imported: {} });
  assert.equal(storage._m.size, 0);
});

test("ids: lessonId / ordinalOf round-trip and reject foreign or malformed ids", () => {
  assert.equal(lessonId("js", 3), "js-03");
  assert.equal(ordinalOf("js", "js-03"), 3);
  assert.equal(ordinalOf("js", "html-03"), null);
  assert.equal(ordinalOf("js", "js-3x"), null);
  assert.equal(ordinalOf("js", 3), null);
});

test("imports 0-based legacy JS progress (dedupe, strings accepted, junk and out-of-range dropped) and the resume pointer", () => {
  const { p } = mk({ "fayad-js-completed-lessons": JSON.stringify([0, 1, 2, 2, "3", 99, -1, "x", null, 1.5]), "fayad-js-current-lesson": "4" });
  assert.deepEqual([...p.completed("js")], ["js-01", "js-02", "js-03", "js-04"]);
  assert.equal(p.current("js"), "js-05");
  assert.equal(p.isCompleted("js", "js-05"), false); // opened is not completed
});

test("imports 1-based legacy lists (programming, html, vue) and ignores 'final'", () => {
  const { p } = mk({
    "fayad-programming-fundamentals-progress": JSON.stringify([1, 2, "final", 20, 21, 0]),
    "fayad-html-progress": JSON.stringify([1, 30]),
    "fayad-vue-learning-progress": JSON.stringify([22]),
  });
  assert.deepEqual([...p.completed("prg")], ["prg-01", "prg-02", "prg-20"]);
  assert.deepEqual([...p.completed("html")], ["html-01", "html-30"]);
  assert.deepEqual([...p.completed("vue")], ["vue-22"]);
});

test("imports 0-based computer-basics and react lists; css/angular resume pointers", () => {
  const { p } = mk({ "fayad-computer-progress": "[0,19]", "fayad-react-completed-lessons": "[0,29]", "fayad-css-current-lesson": "7", "fayad-angular-current-lesson": "31" });
  assert.deepEqual([...p.completed("com")], ["com-01", "com-20"]);
  assert.deepEqual([...p.completed("react")], ["react-01", "react-30"]);
  assert.equal(p.current("css"), "css-08");
  assert.equal(p.current("angular"), "angular-32");
});

test("import is idempotent: reloading or creating new stores never duplicates or changes data", () => {
  const { storage, p } = mk({ "fayad-js-completed-lessons": "[0,1,2]" });
  const first = JSON.stringify(p.snapshot());
  const stored1 = storage.getItem(KEY);
  for (let i = 0; i < 3; i++) { p.reload(); createProgress({ storage, totals: TOTALS, now: () => 5000 }).snapshot(); }
  assert.equal(JSON.stringify(p.snapshot()), first);
  assert.equal(storage.getItem(KEY), stored1);
});

test("markCompleted writes v1 and mirrors the exact legacy format (0-based js, 1-based prg)", () => {
  const { storage, p } = mk();
  assert.equal(p.markCompleted("js", "js-06"), true);
  p.markCompleted("js", "js-01");
  assert.equal(storage.getItem("fayad-js-completed-lessons"), "[0,5]");
  p.markCompleted("prg", "prg-03");
  assert.equal(storage.getItem("fayad-programming-fundamentals-progress"), "[3]");
  p.setCurrent("js", "js-10");
  assert.equal(storage.getItem("fayad-js-current-lesson"), "9");
  assert.deepEqual(JSON.parse(storage.getItem(KEY)).tracks.js.completed, ["js-01", "js-06"]);
});

test("mirror=false leaves legacy keys untouched (for after the compatibility release)", () => {
  const { storage, p } = mk({}, { mirror: false });
  p.markCompleted("js", "js-02");
  assert.equal(storage.getItem("fayad-js-completed-lessons"), null);
  assert.ok(storage.getItem(KEY));
});

test("ROLLBACK: legacy code completes more lessons after v1 existed; next load merges, nothing is lost", () => {
  const { storage, p } = mk();
  p.markCompleted("js", "js-01"); p.markCompleted("js", "js-02");
  // previous implementation (rolled back) keeps writing only the legacy key
  storage.setItem("fayad-js-completed-lessons", JSON.stringify([0, 1, 2, 3]));
  p.reload();
  assert.deepEqual([...p.completed("js")], ["js-01", "js-02", "js-03", "js-04"]);
  // and rolling FORWARD again after v1 gained lessons the legacy key lacks: v1 value is preserved
  p.markCompleted("js", "js-09");
  assert.deepEqual(JSON.parse(storage.getItem("fayad-js-completed-lessons")), [0, 1, 2, 3, 8]);
});

test("reset clears v1 and the legacy mirror so the merge cannot resurrect progress", () => {
  const { storage, p } = mk({ "fayad-js-completed-lessons": "[0,1]", "fayad-js-current-lesson": "1" });
  p.reset("js");
  assert.equal(storage.getItem("fayad-js-completed-lessons"), null);
  p.reload();
  assert.equal(p.completed("js").size, 0);
  assert.equal(p.current("js"), null);
});

test("corrupt or wrong-version v1 does not crash and legacy data restores the progress", () => {
  for (const bad of ["{not json", JSON.stringify({ v: 2, tracks: {} }), "null", "[]", JSON.stringify({ v: 1, tracks: "x" })]) {
    const { p } = mk({ [KEY]: bad, "fayad-js-completed-lessons": "[0,1]" });
    assert.deepEqual([...p.completed("js")], ["js-01", "js-02"], bad);
  }
});

test("corrupt legacy values are ignored", () => {
  const { p } = mk({ "fayad-js-completed-lessons": "{oops", "fayad-html-progress": '"str"', "fayad-js-current-lesson": "banana" });
  assert.equal(p.completed("js").size, 0);
  assert.equal(p.completed("html").size, 0);
  assert.equal(p.current("js"), null);
});

test("normalize drops unknown tracks, out-of-range ids, duplicate/invalid quiz entries", () => {
  const doc = normalize({ v: 1, tracks: { js: { completed: ["js-02", "js-02", "js-99", "html-01", 5], current: "js-30", quiz: { "js-02": { passed: [0, 0, 1, -1, "x", 99], attempts: -3 }, "js-77": { passed: [0] } } }, ghost: { completed: ["ghost-01"] } }, imported: { ghost: { at: 1 } } }, TOTALS);
  assert.deepEqual(doc.tracks.js.completed, ["js-02"]);
  assert.equal(doc.tracks.js.current, null);
  assert.deepEqual(doc.tracks.js.quiz, { "js-02": { passed: [0, 1], attempts: 0, lastAt: 0 } });
  assert.ok(!("ghost" in doc.tracks) && !("ghost" in doc.imported));
});

test("ids sort numerically past 99 lessons", () => {
  const big = createProgress({ storage: fakeStorage(), totals: { x: 150 } });
  big.markCompleted("x", "x-100"); big.markCompleted("x", "x-99"); big.markCompleted("x", "x-7");
  assert.deepEqual([...big.completed("x")], ["x-7", "x-99", "x-100"]);
});

test("invalid ids and question indexes are rejected, not stored", () => {
  const { p, storage } = mk();
  assert.throws(() => p.markCompleted("js", "js-26"), RangeError);
  assert.throws(() => p.markCompleted("js", "html-01"), RangeError);
  assert.throws(() => p.markCompleted("nope", "nope-01"), RangeError);
  assert.throws(() => p.recordAnswer("js", "js-01", -1, true), RangeError);
  assert.equal(storage._m.size, 0);
});

test("quiz results are kept separately from completion; wrong answers only count attempts", () => {
  const { p } = mk();
  p.recordAnswer("js", "js-03", 0, false);
  p.recordAnswer("js", "js-03", 0, true);
  p.recordAnswer("js", "js-03", 1, true);
  p.recordAnswer("js", "js-03", 1, true);
  assert.deepEqual(p.quiz("js", "js-03"), { passed: [0, 1], attempts: 4, lastAt: 1000 });
  assert.equal(p.isCompleted("js", "js-03"), false);
});

test("unavailable / throwing storage never throws; progress still works for the session", () => {
  const broken = { getItem() { throw new Error("denied"); }, setItem() { throw new Error("quota"); }, removeItem() { throw new Error("denied"); } };
  const p = createProgress({ storage: broken, totals: TOTALS });
  assert.equal(p.completed("js").size, 0);
  assert.equal(p.markCompleted("js", "js-01"), false); // reports not persisted
  assert.equal(p.isCompleted("js", "js-01"), true);
  const none = createProgress({ storage: null, totals: TOTALS });
  assert.equal(none.markCompleted("js", "js-02"), false);
  assert.equal(none.isCompleted("js", "js-02"), true);
});

test("legacyListToIds respects base and total", () => {
  assert.deepEqual(legacyListToIds("js", "[0,24,25]", 0, 25), ["js-01", "js-25"]);
  assert.deepEqual(legacyListToIds("prg", "[0,1,20,21]", 1, 20), ["prg-01", "prg-20"]);
  assert.deepEqual(legacyListToIds("js", "garbage", 0, 25), []);
});

test("every LEGACY entry targets a known track and a distinct key", () => {
  const keys = new Set();
  for (const [track, map] of Object.entries(LEGACY)) {
    assert.ok(track in TOTALS, track);
    for (const k of [map.list, map.current].filter(Boolean)) { assert.ok(!keys.has(k), "duplicate key " + k); keys.add(k); }
  }
});
