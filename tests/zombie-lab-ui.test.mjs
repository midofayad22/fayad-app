import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(w, h, lang = "ar", c = 1) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { try { localStorage.setItem("fayad-language", l); } catch {} }, lang);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => { if (!/serviceWorker/.test(e.message)) errs.push(e.message); });
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|ERR_FAILED|net::|Supabase library|serviceWorker/.test(m.text())) errs.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + `/play/zombie.html?c=${c}`); await page.waitForSelector("#arTitle:not(:empty)");
  return { ctx, page, errs };
}
for (const [w, h] of [[360, 740], [390, 844], [430, 932], [820, 1180], [1366, 800]]) {
  test(`zombie lab at ${w}px: no overflow, lesson + 6 fields, no errors`, async () => {
    const { ctx, page, errs } = await open(w, h);
    assert.equal(await page.locator("#labTeach dt").count(), 6);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "horizontal overflow");
    assert.equal(await page.locator("#arLevels .ar-lv").count(), 15);
    assert.deepEqual(errs, []); await ctx.close();
  });
}
test("hints go idea→property→example→solution; solving shows consequence + points", async () => {
  const { ctx, page, errs } = await open(1366, 800);
  for (let i = 1; i <= 3; i++) { await page.click("#arHint"); assert.equal(await page.locator("#arHints p").count(), i); }
  assert.ok(await page.locator("#arSol").isVisible());
  await page.click("#arRun"); await page.waitForSelector("#arChecks li.bad", { timeout: 8000 });
  await page.click("#arSol"); await page.click("#labApply");
  await page.waitForFunction(() => document.querySelectorAll("#arChecks li.ok").length === 3, null, { timeout: 8000 });
  await page.waitForSelector("#arWin:not([hidden])", { timeout: 6000 });
  const pts = await page.locator("#arWinPts").innerText(); assert.match(pts, /\d/);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-game-v1")));
  assert.ok(stored.games.zombie.solved[1]);
  assert.deepEqual(errs, []); await ctx.close();
});
for (const [vw, vh] of [[1366, 900], [360, 740]]) test(`every mission is solvable through the real UI at ${vw}px (solution → all checks ✓)`, async () => {
  const { ctx, page, errs } = await open(vw, vh);
  for (let n = 1; n <= 15; n++) {
    await page.goto(base + `/play/zombie.html?c=${n}`); await page.waitForSelector("#arTitle:not(:empty)");
    for (let i = 0; i < 3; i++) await page.click("#arHint");
    await page.click("#arSol"); await page.click("#labApply");
    const total = await page.locator("#arChecks li").count();
    await page.waitForFunction((t) => document.querySelectorAll("#arChecks li.ok").length === t, total, { timeout: 9000 }).catch(async () => { throw new Error(`mission ${n}: ` + await page.locator('#arChecks').innerText() + ' | ' + await page.locator('#arStatus').innerText()); });
  }
  assert.deepEqual(errs, []); await ctx.close();
});
test("English UI contains no Arabic letters in the play card", async () => {
  const { ctx, page } = await open(390, 844, "en", 3);
  const txt = await page.locator(".ar-brief").innerText();
  assert.ok(!/[؀-ۿ]/.test(txt), "Arabic found: " + (txt.match(/.{0,20}[؀-ۿ]+.{0,10}/) || [""])[0]); await ctx.close();
});
