import { test } from "node:test";
import assert from "node:assert/strict";
import { createProgress } from "../js/engine/progress.js";
import { createSync, diffForUpload, rowsToSnapshot } from "../js/engine/sync.js";

const TOTALS = { js: 25, html: 30 };
const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; };
const P = (now = () => 1000) => createProgress({ totals: TOTALS, storage: mem(), now });

function fakeClient({ user = { id: "u1" }, tables = {}, failOn = null } = {}) {
  const db = { lesson_completions: [], quiz_results: [], assessment_results: [], ...tables };
  const log = [];
  return {
    db, log,
    auth: { getUser: async () => ({ data: { user }, error: null }) },
    from: (t) => ({
      select: () => ({ eq: async (_c, v) => { if (failOn === t) return { data: null, error: new Error("boom") }; return { data: db[t].filter((r) => r.user_id === v), error: null }; } }),
      upsert: async (rows, opts) => {
        log.push([t, rows.length, opts.onConflict]);
        for (const r of rows) { const k = opts.onConflict.split(","); const i = db[t].findIndex((x) => k.every((c) => x[c] === r[c])); if (i >= 0) db[t][i] = { ...db[t][i], ...r }; else db[t].push(r); }
        return { error: null };
      },
    }),
  };
}

test("disabled by default: no client call happens", async () => {
  const c = fakeClient(); const s = createSync({ client: c, progress: P() });
  assert.deepEqual(await s.sync(), { ok: false, reason: "disabled" }); assert.deepEqual(c.log, []);
});

test("signed-out users are not synced", async () => {
  const c = fakeClient({ user: null }); c.auth.getUser = async () => ({ data: { user: null }, error: null });
  assert.equal((await createSync({ client: c, progress: P(), enabled: true }).sync()).reason, "signed-out");
});

test("pull merges remote into local WITHOUT removing or lowering local data; push uploads only what is missing", async () => {
  const p = P(); p.markCompleted("js", "js-01"); p.markCompleted("js", "js-02"); p.recordAnswer("js", "js-01", 0, true); p.recordAssessment("html", 60, false);
  const c = fakeClient({ tables: {
    lesson_completions: [{ user_id: "u1", track: "js", lesson_id: "js-02" }, { user_id: "u1", track: "js", lesson_id: "js-03" }, { user_id: "other", track: "js", lesson_id: "js-09" }],
    quiz_results: [{ user_id: "u1", track: "js", lesson_id: "js-01", passed: [1], attempts: 3, last_at: new Date(5).toISOString() }],
    assessment_results: [{ user_id: "u1", track: "html", attempts: 1, best_pct: 90, last_pct: 90, passed: true, last_at: new Date(10).toISOString() }],
  } });
  const r = await createSync({ client: c, progress: p, enabled: true }).sync();
  assert.equal(r.ok, true);
  const snap = p.snapshot();
  assert.deepEqual(snap.tracks.js.completed, ["js-01", "js-02", "js-03"]);          // union, other user's row ignored
  assert.deepEqual(snap.tracks.js.quiz["js-01"].passed, [0, 1]);                       // union of answered questions
  assert.equal(snap.tracks.js.quiz["js-01"].attempts, 3);                              // max, never lowered
  assert.equal(snap.tracks.html.assessment.bestPct, 90); assert.equal(snap.tracks.html.assessment.passed, true);
  // server received only js-01 (it lacked it) plus the merged quiz row; nothing was deleted
  assert.deepEqual(c.db.lesson_completions.filter((x) => x.user_id === "u1").map((x) => x.lesson_id).sort(), ["js-01", "js-02", "js-03"]);
  assert.equal(c.db.lesson_completions.filter((x) => x.user_id === "other").length, 1);
  assert.deepEqual(c.db.quiz_results[0].passed, [0, 1]);
  // idempotent
  const again = await createSync({ client: c, progress: p, enabled: true }).sync();
  assert.deepEqual(again.uploaded, { completions: 0, quiz: 0, assessments: 0 });
});

test("a failing table resolves to ok:false and leaves local progress untouched", async () => {
  const p = P(); p.markCompleted("js", "js-01");
  const r = await createSync({ client: fakeClient({ failOn: "quiz_results" }), progress: p, enabled: true }).sync();
  assert.equal(r.ok, false); assert.deepEqual(p.snapshot().tracks.js.completed, ["js-01"]);
});

test("mergeSnapshot ignores unknown tracks/lessons and malformed data", () => {
  const p = P();
  assert.equal(p.mergeSnapshot({ v: 1, tracks: { nope: { completed: ["nope-01"] }, js: { completed: ["js-99", "x", "js-04"] } } }), true);
  assert.deepEqual(p.snapshot().tracks.js.completed, ["js-04"]);
  assert.equal(p.mergeSnapshot("garbage"), false);
});

test("diffForUpload is additive and rowsToSnapshot round-trips", () => {
  const snap = { tracks: { js: { completed: ["js-01"], quiz: { "js-01": { passed: [0], attempts: 1, lastAt: 1 } } } } };
  const d = diffForUpload(snap, "u", { completions: [{ track: "js", lesson_id: "js-01" }], quiz: [], assessments: [] });
  assert.equal(d.completions.length, 0); assert.equal(d.quiz.length, 1);
  assert.deepEqual(rowsToSnapshot({ completions: [{ track: "js", lesson_id: "js-05" }] }).tracks.js.completed, ["js-05"]);
});
