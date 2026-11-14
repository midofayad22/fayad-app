import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/zombie/levels.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(hash = "", { reduced = true, solved = 0, vp } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", reducedMotion: reduced ? "reduce" : "no-preference", viewport: vp || { width: 1280, height: 900 } });
  if (solved) await ctx.addInitScript((n) => { const s = {}; for (let i = 1; i <= n; i++) s[i] = { at: 1 }; localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { zombie: { solved: s } } })); }, solved);
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/play/zombie.html" + hash); return { page, errors, ctx };
}
async function setRules(page, rules) {
  while ((await page.locator(".zb-rule").count()) < rules.length) await page.click("#zbAdd");
  for (let i = 0; i < rules.length; i++) { const row = page.locator(".zb-rule").nth(i); await row.locator("select").nth(0).selectOption(rules[i].if); await row.locator("select").nth(1).selectOption(rules[i].do); }
}
test("intro → start; waiting loses with a specific explanation; reference rules win, score once, unlock night 2", async () => {
  const { page, errors, ctx } = await open();
  assert.equal(await page.isVisible("#scrIntro"), true);
  await page.click("#zbStart"); await page.waitForSelector("#zbBoard .zb-c");
  assert.equal(await page.locator("#zbBoard .zb-ent.z").count(), LEVELS[0].zombies.length);
  await page.click("#zbRun"); await page.waitForSelector("#zbMsg .zb-fb.bad");
  assert.match(await page.textContent("#zbMsg"), /(عضّك|انتهت)/);
  assert.equal(await page.textContent("#zbPoints"), "0");
  await setRules(page, LEVELS[0].solution);
  await page.click("#zbRun"); await page.waitForSelector("#zbModal:not([hidden]) .zb-sheet");
  assert.equal(await page.locator("#zbModal .zb-bigstars svg.on").count(), 3);
  assert.equal(await page.textContent("#zbPoints"), String(LEVELS[0].base + 5));
  await page.click("#zbModal .zb-btn-primary"); assert.equal(await page.textContent("#zbNo"), "2");
  await page.reload(); await page.waitForSelector("#zbBoard .zb-c");
  assert.equal(await page.textContent("#zbPoints"), String(LEVELS[0].base + 5), "persisted");
  assert.deepEqual(errors, []); await ctx.close();
});
test("rule editor: reorder by real pointer drag, up/down buttons, delete and undo", async () => {
  const { page, ctx } = await open("#1"); await page.waitForSelector("#zbBoard .zb-c");
  await setRules(page, [{ if: "adjacent", do: "melee" }, { if: "always", do: "wait" }]);
  const acts = () => page.locator(".zb-rule").evaluateAll((n) => n.map((e) => e.dataset.act));
  assert.deepEqual(await acts(), ["melee", "wait"]);
  await page.locator(".zb-rule").nth(1).locator(".zb-rb.up").click(); assert.deepEqual(await acts(), ["wait", "melee"]);
  const h = await page.locator(".zb-rule .zb-rn").nth(1).boundingBox(), t = await page.locator(".zb-rule").nth(0).boundingBox();
  await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2); await page.mouse.down(); await page.mouse.move(h.x + 20, h.y - 10, { steps: 4 }); await page.mouse.move(t.x + 60, t.y + 4, { steps: 8 }); await page.mouse.up();
  assert.deepEqual(await acts(), ["melee", "wait"], "dragged back to the top");
  await page.locator(".zb-rule").nth(0).locator(".zb-rb.rm").click(); assert.equal(await page.locator(".zb-rule").count(), 1);
  await page.click("#zbUndo"); assert.equal(await page.locator(".zb-rule").count(), 2);
  await ctx.close();
});
test("animated replay marks the fired rule and moves zombies", async () => {
  const { page, ctx } = await open("#1", { reduced: false }); await page.waitForSelector("#zbBoard .zb-c");
  await setRules(page, LEVELS[0].solution); await page.click("#zbSpeed"); await page.click("#zbSpeed");
  const before = await page.locator("#zbBoard .zb-ent.z").first().evaluate((e) => getComputedStyle(e).transform);
  await page.click("#zbRun"); await page.waitForSelector(".zb-rule.is-fired, .zb-rule.is-false", { timeout: 6000 });
  assert.equal(await page.isVisible("#zbStop"), true);
  await page.waitForSelector("#zbModal:not([hidden]) .zb-sheet", { timeout: 30000 });
  await ctx.close();
});
test("locked nights fall back; locked actions not offered; nights map reflects progress; no mobile overflow", async () => {
  const { page, ctx } = await open("#9"); await page.waitForSelector("#zbBoard .zb-c");
  assert.equal(await page.textContent("#zbNo"), "1");
  assert.equal((await page.locator(".zb-rule select.act option").allTextContents()).length, LEVELS[0].actions.length);
  await ctx.close();
  for (const w of [360, 390, 430]) {
    const c = await open("", { solved: 6, vp: { width: w, height: 800 } });
    for (const h of ["#map", "#7"]) { await c.page.evaluate((x) => (location.hash = x), h); await c.page.waitForTimeout(300); const o = await c.page.evaluate(() => document.documentElement.scrollWidth - innerWidth); assert.ok(o <= 1, `overflow ${o}px at ${w} ${h}`); }
    await c.page.evaluate(() => (location.hash = "#map")); await c.page.waitForSelector(".zb-night-n");
    assert.equal(await c.page.locator(".zb-night-n:disabled").count(), 8); await c.ctx.close();
  }
});
