// Adventure real-JavaScript mode: every one of the 120 reference solutions, translated to JavaScript, runs in the REAL sandbox
// and the host's replay wins exactly like the block program; locked constructs, errors and infinite loops are handled.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function newPage() {
  const page = await (await browser.newContext({ serviceWorkers: "block" })).newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/tests/fixtures/playground-host.html"); return page;
}
const inPage = (page, fn, arg) => page.evaluate(fn, arg);

test("all 120 reference solutions as JavaScript win through the sandbox + replay", { timeout: 300000 }, async () => {
  const pages = await Promise.all([1, 2, 3, 4].map(newPage)); const out = []; let next = 0;
  await Promise.all(pages.map(async (pg) => {
    while (next < 120) {
      const i = next++;
      out[i] = await inPage(pg, async (i) => {
        const { LEVELS } = await import("/js/game/adventure/levels.js"); const { runCode, toJS, lockedUse, codeSize } = await import("/js/game/adventure/code.js"); const { runActions } = await import("/js/game/adventure/engine.js");
        const l = LEVELS[i], src = toJS(l.solution), r = await runCode(l, src), res = runActions(l, r.actions);
        return { id: l.id, ok: res.ok, err: r.error, locked: lockedUse(l, src), size: codeSize(src), par: l.par, budget: l.budget, n: r.actions.length };
      }, i);
    }
  }));
  const bad = out.filter((o) => !o.ok || o.err || o.locked || (o.budget && o.size > o.budget) || o.size !== o.par);
  assert.deepEqual(bad, []);
  assert.equal(out.length, 120);
});

test("errors, locked constructs and runaway loops are reported, never hang", { timeout: 60000 }, async () => {
  const pg = await newPage();
  const r = await inPage(pg, async () => {
    const { LEVELS } = await import("/js/game/adventure/levels.js"); const { runCode, lockedUse } = await import("/js/game/adventure/code.js"); const { runActions } = await import("/js/game/adventure/engine.js");
    const l1 = LEVELS[0], l60 = LEVELS[59];
    const syntax = await runCode(l1, "forward(;");
    const undef = await runCode(l1, "forward(); jump();");
    const loopy = await runCode(l60, "while (true) { }");
    const walker = await runCode(l60, "while (!atGoal()) { forward(); }");
    return { syntax: !!syntax.error, undef: undef.error, undefActions: undef.actions, loopy: loopy.error, walkerLen: walker.actions.length, walkerRes: runActions(l60, walker.actions).ok,
      lock1: lockedUse(l1, "for (let i=0;i<3;i++) forward();"), lockApi: lockedUse(LEVELS[119], "document.body"), lockOk: lockedUse(LEVELS[119], "while(!atGoal()){ if(openAhead()) forward(); else turnLeft(); }") };
  });
  assert.ok(r.syntax); assert.match(r.undef, /jump/); assert.equal(r.undefActions, "F"); assert.ok(r.loopy);
  assert.ok(r.walkerLen <= 600 && r.walkerRes === false); assert.equal(r.lock1.code, "for"); assert.equal(r.lockApi.code, "api"); assert.equal(r.lockOk, null);
});
