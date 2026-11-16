// Zombie web-lab missions: every starter fails, the reference solution and every alternative pass ALL checks, in the real sandbox.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

let server, browser, base, page;
before(async () => {
  server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch();
  page = await (await browser.newContext({ serviceWorkers: "block", viewport: { width: 900, height: 700 } })).newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/tests/fixtures/playground-host.html");
});
after(async () => { await browser?.close(); server?.close(); });

async function grade(i, learnerKey, altIdx) {
  return page.evaluate(async ([n, k, a]) => {
    const { MISSIONS } = await import("/js/game/zombie/missions.js");
    const { labFiles, parseChecks } = await import("/js/game/lab-lib.js");
    const ch = MISSIONS[n];
    const learner = k === "starter" ? {} : k === "solution" ? ch.solution : ch.alts[a];
    const lines = []; let err = null; let cls = "";
    await new Promise((resolve) => {
      const host = document.createElement("div"); document.body.appendChild(host);
      const r = window.FAYAD.playground.create(host, { runtime: "html", format: "text", timeoutMs: 4000, loopBudget: 2000000,
        onConsole: (e) => lines.push(e.text), onError: (e) => { if (err === null) err = e.message; }, onStatus: (s) => { if (s === "done" || s === "timeout") setTimeout(resolve, 250); } });
      r.run(labFiles(ch, learner));
      setTimeout(resolve, 6000);
    });
    return { res: parseChecks(lines, ch.checks.length), err };
  }, [i, learnerKey, altIdx]);
}

test("15 missions: structure, bilingual, six-field teach, progression", async () => {
  const { MISSIONS: M } = await import("../js/game/zombie/missions.js");
  assert.equal(M.length, 15);
  assert.equal(new Set(M.map((m) => m.id)).size, 15);
  const order = ["beginner", "intermediate", "advanced", "expert"]; let max = 0;
  const techs = new Set();
  for (const m of M) {
    techs.add(m.tech);
    const lv = order.indexOf(m.level); assert.ok(lv >= 0);
    for (const k of ["title", "goal", "brief", "explain"]) assert.ok(m[k]?.ar && m[k]?.en, `${m.id}.${k}`);
    for (const k of ["what", "does", "why", "how", "expect", "mistake"]) assert.ok(m.teach?.[k]?.ar && m.teach[k].en, `${m.id}.teach.${k}`);
    assert.ok(m.checks.length >= 3 && m.checks.every((c) => c.ar && c.en && c.test));
    assert.equal(m.hints.length, 3);
    assert.ok(m.solution && m.edit.length >= 1);
  }
  for (const t of ["css", "html", "js", "html+css+js"]) assert.ok(techs.has(t), `covers ${t}`);
});
test("every starter fails; every reference solution and alternative passes all checks", async () => {
  const { MISSIONS: M } = await import("../js/game/zombie/missions.js");
  for (let i = 0; i < M.length; i++) {
    const s = await grade(i, "starter");
    assert.ok(s.err !== null || s.res.some((r) => r !== true), `${M[i].id}: starter must not pass`);
    const g = await grade(i, "solution");
    assert.equal(g.err, null, `${M[i].id} solution error ${g.err}`);
    assert.deepEqual(g.res, M[i].checks.map(() => true), `${M[i].id} solution ${JSON.stringify(g.res)}`);
    for (let a = 0; a < (M[i].alts || []).length; a++) {
      const h = await grade(i, "alt", a);
      assert.equal(h.err, null, `${M[i].id} alt${a} error ${h.err}`);
      assert.deepEqual(h.res, M[i].checks.map(() => true), `${M[i].id} alt${a} ${JSON.stringify(h.res)}`);
    }
  }
});
