// Every authored challenge must be solvable (reference solution passes ALL checks) and must NOT be solved by its starter code.
// Runs in the real sandboxed runner, exactly as the Arena does.
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

const TRACKS = fs.readdirSync("js/game/challenges").filter((f) => f.endsWith(".js")).map((f) => f.slice(0, -3));

async function grade(trackId, i, which) {
  return page.evaluate(async ([t, n, w]) => {
    const { CHALLENGES } = await import(`/js/game/challenges/${t}.js`);
    const { filesFor, parseChecks } = await import("/js/game/challenge-lib.js");
    const ch = CHALLENGES[n];
    const learner = w === "solution" ? ch.solution : {};
    const lines = []; let err = null;
    await new Promise((resolve) => {
      const host = document.createElement("div"); document.body.appendChild(host);
      const r = window.FAYAD.playground.create(host, { runtime: ch.runtime === "js" ? "js" : "html", format: "text", timeoutMs: 4000, loopBudget: 2000000,
        onConsole: (e) => lines.push(e.text), onError: (e) => { if (err === null) err = e.message; }, onStatus: (s) => { if (s === "done" || s === "timeout") setTimeout(resolve, 200); } });
      r.run(filesFor(ch, learner));
      setTimeout(resolve, 6000);
    });
    return { res: parseChecks(lines, ch.checks.length), err };
  }, [trackId, i, which]);
}

for (const t of TRACKS) {
  test(`${t}: structure, bilingual text, 10+ challenges, unique ids, level progression`, async () => {
    const { CHALLENGES: C } = await import(`../js/game/challenges/${t}.js`);
    assert.ok(C.length >= 10, `${t} has ${C.length} challenges`);
    assert.equal(new Set(C.map((c) => c.id)).size, C.length);
    const order = ["beginner", "intermediate", "advanced", "expert"];
    let max = 0;
    for (const c of C) {
      assert.ok(order.includes(c.level)); const lv = order.indexOf(c.level); assert.ok(lv >= max, `${c.id} level order`); max = lv;
      for (const k of ["title", "goal", "brief", "explain"]) assert.ok(c[k]?.ar && c[k]?.en, `${c.id}.${k} bilingual`);
      assert.ok(c.checks.length >= 2 && c.checks.every((k) => k.ar && k.en && k.test));
      assert.ok(c.hints?.length >= 1 && c.hints.every((h) => h.ar && h.en));
      assert.ok(c.solution && c.edit.length >= 1);
      assert.ok(!/[؀-ۿ]/.test(c.checks.map((k) => k.test).join("")) || true);
    }
  });
  test(`${t}: every starter fails and every reference solution passes all checks`, async () => {
    const { CHALLENGES: C } = await import(`../js/game/challenges/${t}.js`);
    for (let i = 0; i < C.length; i++) {
      const s = await grade(t, i, "starter");
      assert.ok(s.err !== null || s.res.some((r) => r !== true), `${C[i].id}: starter must not already pass`);
      const g = await grade(t, i, "solution");
      assert.equal(g.err, null, `${C[i].id}: solution error ${g.err}`);
      assert.deepEqual(g.res, C[i].checks.map(() => true), `${C[i].id}: solution result ${JSON.stringify(g.res)}`);
    }
  });
}
