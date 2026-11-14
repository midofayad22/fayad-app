// Lesson-progress sync scenarios against an in-memory fake of the Supabase tables (same call shapes as supabase-js).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base, page;
before(async () => {
  server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch();
  page = await (await browser.newContext({ serviceWorkers: "block" })).newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/tests/fixtures/playground-host.html");
});
after(async () => { await browser?.close(); server?.close(); });

const run = (scenario) => page.evaluate(async (sc) => {
  const { createProgress } = await import("/js/engine/progress.js");
  const { createSync } = await import("/js/engine/sync.js");
  const { TOTALS } = await import("/js/engine/totals.js");
  const tables = { lesson_completions: [], quiz_results: [], assessment_results: [] }; const log = [];
  for (const [t, rows] of Object.entries(sc.remote || {})) tables[t] = rows.map((r) => ({ ...r }));
  const client = {
    auth: { getUser: async () => ({ data: { user: sc.signedIn === false ? null : { id: "u1" } }, error: null }) },
    from: (t) => ({
      select: () => ({ eq: async (_c, v) => { log.push("select " + t); return { data: tables[t].filter((r) => r.user_id === v), error: null }; } }),
      upsert: async (rows, o) => { log.push("upsert " + t + " " + rows.length); const keys = o.onConflict.split(",");
        for (const r of rows) { const i = tables[t].findIndex((x) => keys.every((k) => x[k] === r[k])); if (i < 0) tables[t].push({ ...r }); else if (!o.ignoreDuplicates) tables[t][i] = { ...tables[t][i], ...r }; }
        return { error: null }; },
    }),
  };
  const mem = {}; const storage = { getItem: (k) => mem[k] ?? null, setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
  if (sc.local) storage.setItem("fayad-progress-v1", JSON.stringify(sc.local));
  const progress = createProgress({ totals: TOTALS, storage, mirror: false });
  const sync = createSync({ client, progress, enabled: true });
  const first = await sync.sync(); const second = await sync.sync();
  return { first, second, local: progress.snapshot(), tables, log };
}, scenario);

const doc = (tracks) => ({ v: 1, tracks, imported: {} });
const T = (o) => ({ completed: [], current: null, quiz: {}, updatedAt: 1, ...o });

test("new user: local progress is uploaded, local stays unchanged, a second sync uploads nothing", async () => {
  const r = await run({ local: doc({ html: T({ completed: ["html-01", "html-02"], quiz: { "html-01": { passed: [0, 1], attempts: 3, lastAt: 5 } } }) }) });
  assert.equal(r.first.ok, true); assert.equal(r.first.uploaded.completions, 2); assert.equal(r.first.uploaded.quiz, 1);
  assert.equal(r.tables.lesson_completions.length, 2);
  assert.deepEqual(r.local.tracks.html.completed, ["html-01", "html-02"]);
  assert.equal(r.second.uploaded.completions + r.second.uploaded.quiz, 0);
});

test("existing user on a new device: cloud progress is merged into an empty local record, nothing is uploaded", async () => {
  const r = await run({ remote: { lesson_completions: [{ user_id: "u1", track: "css", lesson_id: "css-03" }, { user_id: "u1", track: "css", lesson_id: "css-04" }], quiz_results: [], assessment_results: [{ user_id: "u1", track: "css", attempts: 2, best_pct: 80, last_pct: 70, passed: true, last_at: new Date(9).toISOString() }] } });
  assert.deepEqual(r.local.tracks.css.completed, ["css-03", "css-04"]);
  assert.equal(r.local.tracks.css.assessment.bestPct, 80); assert.equal(r.local.tracks.css.assessment.passed, true);
  assert.equal(r.first.uploaded.completions, 0);
});

test("both sides have progress: union merge, attempts/best score = max, nothing is lowered locally or in the cloud", async () => {
  const r = await run({
    local: doc({ js: T({ completed: ["js-01", "js-05"], current: "js-06", quiz: { "js-01": { passed: [0, 2], attempts: 2, lastAt: 1 } }, assessment: { attempts: 1, bestPct: 60, lastPct: 60, passed: false, lastAt: 1 } }) }),
    remote: { lesson_completions: [{ user_id: "u1", track: "js", lesson_id: "js-02" }, { user_id: "u1", track: "js", lesson_id: "js-05" }],
      quiz_results: [{ user_id: "u1", track: "js", lesson_id: "js-01", passed: [1], attempts: 5, last_at: new Date(2).toISOString() }],
      assessment_results: [{ user_id: "u1", track: "js", attempts: 3, best_pct: 90, last_pct: 40, passed: true, last_at: new Date(3).toISOString() }] },
  });
  assert.deepEqual(r.local.tracks.js.completed, ["js-01", "js-02", "js-05"]);
  assert.equal(r.local.tracks.js.current, "js-06");
  assert.deepEqual(r.local.tracks.js.quiz["js-01"].passed, [0, 1, 2]); assert.equal(r.local.tracks.js.quiz["js-01"].attempts, 5);
  assert.equal(r.local.tracks.js.assessment.bestPct, 90); assert.equal(r.local.tracks.js.assessment.passed, true);
  const cloud = r.tables;
  assert.deepEqual(cloud.lesson_completions.map((x) => x.lesson_id).sort(), ["js-01", "js-02", "js-05"]);
  assert.deepEqual(cloud.quiz_results[0].passed, [0, 1, 2]); assert.equal(cloud.quiz_results[0].attempts, 5);
  assert.equal(cloud.assessment_results[0].best_pct, 90); assert.equal(cloud.assessment_results[0].passed, true);
});

test("signed out: no table is touched and local progress is intact", async () => {
  const r = await run({ signedIn: false, local: doc({ html: T({ completed: ["html-01"] }) }) });
  assert.equal(r.first.ok, false); assert.equal(r.first.reason, "signed-out"); assert.deepEqual(r.log, []);
  assert.deepEqual(r.local.tracks.html.completed, ["html-01"]);
});

test("malformed local ids/quiz values are never sent (they would be rejected by the database constraints)", async () => {
  const r = await run({ local: doc({ html: T({ completed: ["html-01", "bad id", "css-01"], quiz: { "html-01": { passed: [0, 99, -1, 1.5], attempts: 1, lastAt: 1 }, "nope": { passed: [0], attempts: 1, lastAt: 1 } } }) }) });
  for (const c of r.tables.lesson_completions) assert.match(c.lesson_id, /^html-\d{2}$/);
  for (const q of r.tables.quiz_results) assert.deepEqual(q.passed.filter((n) => n < 0 || n >= 50 || !Number.isInteger(n)), []);
});

test("TOTALS matches the real lesson counts in content/*/index.js", async () => {
  const { TOTALS } = await import("../js/engine/totals.js");
  for (const [id, n] of Object.entries(TOTALS)) {
    const { lessons } = await import(`../content/${id}/index.js`);
    assert.equal(lessons.length, n, id);
  }
  assert.deepEqual(Object.keys(TOTALS).sort(), fs.readdirSync("content", { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort());
});
