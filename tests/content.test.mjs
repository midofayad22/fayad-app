// Content integrity: every migrated course must satisfy the shared schema; parity with legacy data is proven separately.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { validateTrack, orderedIds, t } from "../js/engine/schema.js";

const tracks = fs.readdirSync("content", { withFileTypes: true }).filter((d) => d.isDirectory() && fs.existsSync(`content/${d.name}/index.js`)).map((d) => d.name);

test("at least the JavaScript course has been migrated", () => assert.ok(tracks.includes("js")));

for (const name of tracks) {
  test(`content/${name}: valid against the lesson schema, every lesson reachable, order == ids`, async () => {
    const { track, lessons } = await import(`../content/${name}/index.js`);
    assert.equal(track.id, name);
    assert.deepEqual(validateTrack(track, lessons), []);
    assert.deepEqual(orderedIds(track), lessons.map((l) => l.id), "sidebar/navigation order must equal lesson order");
  });
}

test("validator rejects the defects the legacy courses had (unreachable lessons, bad answers, id gaps)", () => {
  const T = (o) => ({ id: "x", runtime: "none", groups: [{ id: "g", title: { ar: "g" }, lessons: ["x-01"] }], ...o });
  const L = (o) => ({ id: "x-01", title: { ar: "t" }, quiz: [{ question: { ar: "q" }, options: [{ ar: "a" }, { ar: "b" }], correct: 0 }], ...o });
  assert.deepEqual(validateTrack(T(), [L()]), []);
  assert.ok(validateTrack(T({ groups: [{ id: "g", title: { ar: "g" }, lessons: [] }] }), [L()]).some((e) => /not in any group/.test(e)));
  assert.ok(validateTrack(T(), [L({ id: "x-02" })]).some((e) => /ids are contiguous/.test(e)));
  assert.ok(validateTrack(T(), [L({ quiz: [{ question: { ar: "q" }, options: [{ ar: "a" }, { ar: "b" }], correct: 2 }] })]).some((e) => /out of range/.test(e)));
  assert.ok(validateTrack(T(), [L({ title: { ar: "  " } })]).length);
  assert.ok(validateTrack(T({ groups: [{ id: "g", title: { ar: "g" }, lessons: ["x-01", "x-01"] }] }), [L()]).some((e) => /more than one group/.test(e)));
});

test("t() falls back to Arabic when a translation is missing", () => {
  assert.equal(t({ ar: "أ", en: "a" }, "en"), "a");
  assert.equal(t({ ar: "أ" }, "en"), "أ");
  assert.equal(t({ ar: "أ", en: " " }, "en"), "أ");
});
