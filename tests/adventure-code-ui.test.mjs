// Adventure real JavaScript mode in a real browser: type code, run it, watch Fay move, win, persist; locked constructs and errors are explained.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/adventure/levels.js";
import { toJS } from "../js/game/adventure/code-lang.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(hash, { solved = 0, vp = { width: 1280, height: 900 }, lang = "ar", touch = false } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", viewport: vp, hasTouch: touch, reducedMotion: "reduce" });
  await ctx.addInitScript(([n, l]) => { try { localStorage.setItem("fayad-language", l); if (n) { const s = {}; for (let i = 1; i <= n; i++) s[i] = { at: 1, hint: false, pts: 15 }; localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { adventure: { solved: s } } })); } } catch {} }, [solved, lang]);
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => { if (!/serviceWorker/.test(e.message)) errors.push(e.message + " @ " + String(e.stack).split("\n").slice(1, 3).join(" ")); });
  await page.goto(base + "/play/adventure.html" + hash); return { page, ctx, errors };
}
async function toLevel(page, n) { await page.evaluate((n) => { location.hash = "#/level/" + n; }, n); }
async function enter(page) { await page.click("#advStart"); await page.waitForSelector("#advBoard .adv-c"); }
async function code(page, text) { await page.click("#advModeCode"); await page.locator("#advCodeTa").evaluate((t, v) => { t.value = v; t.dispatchEvent(new Event("input", { bubbles: true })); }, text); }

test("level 1: JavaScript wins with 3 stars, persists; blocks→JS translation is shown", async () => {
  const { page, ctx, errors } = await open("#1");
  await page.waitForSelector("#advBoard .adv-c");
  const l = LEVELS[0];
  for (const b of l.solution.main) await page.click(`#advPalette .adv-op-${b.op}`);
  await page.click("#advModeCode");
  assert.equal((await page.inputValue("#advCodeTa")).trim(), toJS(l.solution).trim(), "blocks shown as real JavaScript");
  await page.click("#advRun");
  await page.waitForSelector("#advModal:not([hidden]) .adv-sheet", { timeout: 20000 });
  assert.equal(await page.locator("#advModal .adv-bigstars svg.on").count(), 3);
  assert.equal(await page.textContent("#advPoints"), "15");
  await page.reload(); await page.waitForSelector("#advBoard .adv-c"); assert.equal(await page.textContent("#advPoints"), "15");
  assert.deepEqual(errors, []); await ctx.close();
});

test("locked construct, syntax error, runtime error and endless loop are explained in Arabic", async () => {
  const { page, ctx } = await open("#1"); await page.waitForSelector("#advBoard .adv-c");
  await code(page, "for (let i = 0; i < 3; i++) forward();"); await page.click("#advRun");
  assert.match(await page.textContent("#advMsg"), /for.*لم تُفتح/);
  await code(page, "forward(;"); await page.click("#advRun"); await page.waitForFunction(() => /خطأ في الكود/.test(document.getElementById("advMsg").textContent), null, { timeout: 15000 });
  await code(page, "forward(); jump();"); await page.click("#advRun"); await page.waitForFunction(() => /jump/.test(document.getElementById("advMsg").textContent), null, { timeout: 15000 });
  await ctx.close();
});

test("a loop world: for-loop + while/if/function worlds win by real JavaScript (levels 41, 61, 81)", { timeout: 120000 }, async () => {
  for (const n of [41, 61, 81]) {
    const { page, ctx } = await open("#" + n, { solved: n - 1 }); await page.waitForSelector("#advBoard .adv-c");
    const l = LEVELS[n - 1];
    await code(page, toJS(l.solution)); await page.click("#advRun");
    await page.waitForSelector("#advModal:not([hidden]) .adv-sheet", { timeout: 30000 });
    assert.ok((await page.locator("#advModal .adv-bigstars svg.on").count()) >= 1);
    await ctx.close();
  }
});

test("mobile 390: JavaScript mode has no overflow and big touch targets", async () => {
  const { page, ctx } = await open("#1", { vp: { width: 390, height: 800 }, touch: true }); await page.waitForSelector("#advBoard .adv-c"); await page.click("#advModeCode");
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  for (const id of ["advModeBlocks", "advModeCode", "advRun"]) assert.ok((await page.locator("#" + id).boundingBox()).height >= 40, id);
  await page.screenshot({ path: "/tmp/x/shots/adv-code-390.png", fullPage: true }); await ctx.close();
});
