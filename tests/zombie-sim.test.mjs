// Zombie Survival: the REAL simulation in Chromium, through the real sandbox. A scripted "average player" (one shot / 0.85s, in range)
// plays every mission. Starters must LOSE, reference solutions and alternatives must WIN. Zombie types must behave differently.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base, pages = [];
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function newPage() {
  const page = await (await browser.newContext({ serviceWorkers: "block", viewport: { width: 700, height: 400 } })).newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/tests/fixtures/playground-host.html"); return page;
}
export async function play(page, idx, which, extra = {}) {
  const simSrc = fs.readFileSync("js/game/zombie/sim.js", "utf8");
  return page.evaluate(async ([i, w, src, ex]) => {
    const { MISSIONS } = await import("/js/game/zombie/missions.js"); const { worldFiles } = await import("/js/game/zombie/world.js");
    const m = ex.mission || MISSIONS[i];
    const learner = w === "starter" ? {} : w === "solution" ? m.solution : m.alts[w];
    const lines = []; let err = null, end = null;
    return await new Promise((resolve) => {
      const host = document.createElement("div"); host.style.cssText = "width:600px;height:300px"; document.body.appendChild(host);
      const r = window.FAYAD.playground.create(host, { runtime: "html", format: "text", timeoutMs: 8000, loopBudget: 5000000,
        onConsole: (e) => { if (e.text.startsWith("@@END ")) { end = JSON.parse(e.text.slice(6)); finish(); } else lines.push(e.text); }, onError: (e) => { if (err === null) err = e.message; }, onStatus: () => {} });
      const finish = () => { setTimeout(() => { r.destroy(); host.remove(); resolve({ end, err, last: lines.filter((l) => l.startsWith("@@ST ")).slice(-1)[0] }); }, 50); };
      r.run(worldFiles(m, learner, "play", src, { bot: true, speed: ex.speed || 1 }));
      setTimeout(() => { if (!end) finish(); }, (m.time + 15) * 1000);
    });
  }, [idx, which, simSrc, extra]);
}
async function pool(jobs, n = 6) {
  const out = new Array(jobs.length); let next = 0;
  const ps = await Promise.all(Array.from({ length: n }, newPage));
  await Promise.all(ps.map(async (pg) => { while (next < jobs.length) { const k = next++; out[k] = await play(pg, jobs[k][0], jobs[k][1], FAST ? { speed: 3 } : {}); } }));
  return out;
}
const { MISSIONS } = await import("../js/game/zombie/missions.js");
const FAST = process.env.ZB_FAST === "1", ONLY = process.env.ZB_ONLY ? process.env.ZB_ONLY.split(",") : null;
const jobs = []; MISSIONS.forEach((m, i) => { if (ONLY && !ONLY.includes(m.id)) return; jobs.push([i, "starter"], [i, "solution"]); if (!FAST) (m.alts || []).forEach((_, a) => jobs.push([i, a])); });
let results;
test("simulate every mission (starter, solution, alternatives)", { timeout: 900000 }, async () => { results = await pool(jobs); assert.equal(results.length, jobs.length); });
test("starters lose; reference solutions and alternatives win", () => {
  const bad = [];
  jobs.forEach(([i, w], k) => { const r = results[k], id = MISSIONS[i].id, win = r.end?.win === true;
    if (r.err) bad.push(`${id}/${w}: script error ${r.err}`);
    if (w === "starter" && win) bad.push(`${id}: starter WINS (${JSON.stringify(r.end)})`);
    if (w !== "starter" && !win) bad.push(`${id}/${w}: loses (${JSON.stringify(r.end)})`); });
  fs.writeFileSync(process.env.ZB_REPORT || "/tmp/x/zb-report.json", JSON.stringify(jobs.map(([i, w], k) => ({ id: MISSIONS[i].id, w, end: results[k].end, err: results[k].err })), null, 1));
  assert.deepEqual(bad, []);
});
