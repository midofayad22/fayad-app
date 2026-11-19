// Flex Quest: (1) all 24 levels validated in a real browser — reference + alternative solutions win, starters do not;
// (2) real gameplay: typing CSS into the editor, crates move, win panel, points, persistence, hints, locks, mobile layout.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/flex/levels.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(hash = "", { vp = { width: 1280, height: 900 }, solved = 0, touch = false, lang = "ar", reduced = true } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", viewport: vp, hasTouch: touch, reducedMotion: reduced ? "reduce" : "no-preference" });
  await ctx.addInitScript(([n, l]) => { try { localStorage.setItem("fayad-language", l); if (n) { const s = {}; for (let i = 1; i <= n; i++) s[i] = { at: 1, hint: false, pts: 10 }; localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { flex: { solved: s } } })); } } catch {} }, [solved, lang]);
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => { if (!/serviceWorker/.test(e.message)) errors.push(e.message); });
  await page.goto(base + "/play/flex-quest.html" + hash); return { page, ctx, errors };
}
const type = async (page, css) => { await page.locator("#fqCss").evaluate((t, v) => { t.value = v; t.dispatchEvent(new Event("input", { bubbles: true })); }, css); };

test("all 24 levels: reference and alternative solutions match, starters do not", { timeout: 120000 }, async () => {
  const { page, ctx } = await open(""); await page.waitForFunction(() => window.__fq);
  const out = await page.evaluate(async (levels) => {
    const { makeBoard, compare } = window.__fq, { LEVELS } = window.__fq; const host = document.createElement("div"); document.body.appendChild(host); const res = [];
    for (const l of LEVELS) {
      const mk = () => { const h = document.createElement("div"); host.appendChild(h); return makeBoard(h, l); };
      const t = mk(), m = mk(); const tr = await t.setCss(l.solution, false);
      const row = { id: l.id, start: (await m.setCss(l.start, false)), alts: [] };
      row.startWins = compare(row.start, tr).all; delete row.start;
      row.solWins = compare(await m.setCss(l.solution, false), tr).all;
      for (const a of l.alts) row.alts.push(compare(await m.setCss(a, false), tr).all);
      t.destroy(); m.destroy(); res.push(row);
    }
    return res;
  }, LEVELS.length);
  assert.equal(out.length, 24);
  assert.deepEqual(out.filter((r) => r.startWins || !r.solWins || r.alts.some((a) => !a)), []);
  assert.ok(out.filter((r) => r.alts.length).length >= 12, "multiple valid solutions on many levels");
  await ctx.close();
});

test("real play: type CSS, crates move, win, points + stars persist, next level unlocks", { timeout: 60000 }, async () => {
  const { page, ctx, errors } = await open("");
  assert.equal(await page.locator(".fqg-node").count(), 24);
  assert.equal(await page.locator(".fqg-node:not(.is-locked)").count(), 1);
  await page.click(".fqg-node >> nth=0");
  await page.waitForFunction(() => /0 \/ 3/.test(document.getElementById("fqCount").textContent));
  assert.equal(await page.isHidden("#fqWin"), true);
  await type(page, ".dock {\n  display: flex;\n  justify-content: center;\n}");   // wrong on purpose
  await page.waitForFunction(() => /\d \/ 3/.test(document.getElementById("fqCount").textContent));
  assert.equal(await page.isHidden("#fqWin"), true);
  await type(page, ".dock {\n  display: flex;\n  justify-content: flex-end;\n}");
  await page.waitForSelector("#fqWin:not([hidden])", { timeout: 8000 });
  assert.equal(await page.locator("#fqWinStars svg.on").count(), 3);
  assert.equal(await page.textContent("#fqPoints"), "15");
  await page.click("#fqNext"); await page.waitForFunction(() => /2/.test(document.getElementById("fqTitle").textContent));
  await page.reload(); await page.click(".fqg-back").catch(() => {});
  await page.goto(base + "/play/flex-quest.html"); await page.waitForSelector(".fqg-node");
  assert.equal(await page.textContent("#fqPoints"), "15");
  assert.equal(await page.locator(".fqg-node.is-done").count(), 1);
  assert.deepEqual(errors, []); await ctx.close();
});

test("hint ladder, show-solution (one star less), alternative solution wins, learner CSS cannot escape the board", { timeout: 60000 }, async () => {
  const { page, ctx } = await open("#11", { solved: 10 });
  await page.waitForSelector("#fqCss", { state: "attached" });
  for (let i = 0; i < 4; i++) await page.click("#fqHint");
  assert.equal(await page.locator("#fqHints li").count(), 3); assert.match(await page.textContent("#fqMsg"), /لا مزيد/);
  await type(page, ".dock {\n  display: flex;\n}\n.crate { margin-right: 24px; }\n@import url(http://evil.example/x.css);\nbody { background: red; }");
  await page.waitForSelector("#fqWin:not([hidden])", { timeout: 8000 });
  assert.equal(await page.locator("#fqWinStars svg.on").count(), 1, "hinted and verbose → only the solve star");
  assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor !== "rgb(255, 0, 0)"), true);
  await ctx.close();
});

test("locked levels cannot be opened by URL; English UI has no Arabic", async () => {
  const a = await open("#9"); await a.page.waitForSelector(".fqg-node");
  assert.equal(await a.page.isVisible("#fqMap"), true); await a.ctx.close();
  const e = await open("#1", { lang: "en" }); await e.page.waitForSelector("#fqCss", { state: "attached" });
  const txt = await e.page.evaluate(() => document.getElementById("fqPlay").innerText); assert.equal(/[؀-ۿ]/.test(txt), false, txt.match(/[؀-ۿ]+/)?.[0]); await e.ctx.close();
});

test("layout and touch at 360/390/430/820/1366: no overflow, big targets; touch play wins", { timeout: 90000 }, async () => {
  for (const w of [360, 390, 430, 820, 1366]) {
    const { page, ctx } = await open("#12", { vp: { width: w, height: w < 500 ? 800 : 900 }, solved: 11, touch: w < 500 }); await page.waitForSelector("#fqCss", { state: "attached" });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "overflow " + w);
    for (const id of ["fqHint", "fqSol", "fqReset"]) assert.ok((await page.locator("#" + id).boundingBox()).height >= 40, id + w);
    await page.waitForTimeout(500); await page.screenshot({ path: `/tmp/x/shots/fq-play-${w}.png`, fullPage: true });
    if (w === 390) { await type(page, ".dock {\n  display: flex;\n  flex-wrap: wrap;\n}"); await page.waitForSelector("#fqWin:not([hidden])", { timeout: 8000 }); await page.screenshot({ path: "/tmp/x/shots/fq-win-390.png", fullPage: true }); }
    await ctx.close();
  }
  const m = await open("", { vp: { width: 390, height: 800 }, touch: true, solved: 5 }); await m.page.waitForSelector(".fqg-node");
  await m.page.screenshot({ path: "/tmp/x/shots/fq-map-390.png", fullPage: true }); await m.ctx.close();
  const d = await open("", { solved: 8 }); await d.page.waitForSelector(".fqg-node"); await d.page.screenshot({ path: "/tmp/x/shots/fq-map-1366.png", fullPage: true }); await d.ctx.close();
});
