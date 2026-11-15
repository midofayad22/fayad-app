import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/adventure/levels.js";
const { chromium } = createRequire(import.meta.url)("playwright");

let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(hash = "", { reduced = true, solved = 0, vp } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", reducedMotion: reduced ? "reduce" : "no-preference", viewport: vp || { width: 1280, height: 900 } });
  if (solved) await ctx.addInitScript((n) => { const s = {}; for (let i = 1; i <= n; i++) s[i] = { at: 1, hint: false, pts: 15 }; localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { adventure: { solved: s } } })); }, solved);
  const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/play/adventure.html" + hash);
  return { page, errors, ctx };
}
const flat = (list) => list.every((b) => ["F", "L", "R"].includes(b.op));

test("intro → start → level 1: empty run explains, reference program wins with stars, points, and unlocks level 2", async () => {
  const { page, errors, ctx } = await open();
  assert.equal(await page.isVisible("#scrIntro"), true);
  await page.click("#advStart"); await page.waitForSelector("#advBoard .adv-c");
  assert.equal(await page.isVisible("#scrPlay"), true);
  await page.click("#advRun");
  assert.match(await page.textContent("#advMsg"), /فارغ/);
  const l = LEVELS[0]; assert.ok(flat(l.solution.main));
  for (const b of l.solution.main) await page.click(`#advPalette .adv-op-${b.op}`);
  assert.equal(await page.locator("#advProg .adv-blk").count(), l.solution.main.length);
  await page.click("#advRun");
  await page.waitForSelector("#advModal:not([hidden]) .adv-sheet");
  assert.equal(await page.locator("#advModal .adv-bigstars svg.on").count(), 3);
  assert.equal(await page.textContent("#advPoints"), "15");
  await page.click("#advModal .adv-btn-primary");
  assert.match(await page.textContent("#advNo"), /^2 /);
  await page.reload(); await page.waitForSelector("#advBoard .adv-c");
  assert.equal(await page.textContent("#advPoints"), "15", "persisted");
  assert.deepEqual(errors, []); await ctx.close();
});

test("a wrong program shows a specific explanation and highlights the offending block", async () => {
  const { page, ctx } = await open("#1");
  await page.waitForSelector("#advBoard .adv-c");
  await page.click("#advPalette .adv-op-F");
  await page.click("#advRun");
  await page.waitForSelector("#advMsg .adv-fb.bad");
  const t = await page.textContent("#advMsg"); assert.match(t, /(اصطدم|بعد|مفتاح|فخ)/);
  await ctx.close();
});

test("real pointer drag-and-drop: palette → program, reorder, drag out removes, undo restores", async () => {
  const { page, ctx } = await open("#1");
  await page.waitForSelector("#advBoard .adv-c");
  const drag = async (from, to, dy = 0) => { const a = await from.boundingBox(), b = await to.boundingBox(); await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2); await page.mouse.down(); await page.mouse.move(a.x + 30, a.y + 30, { steps: 4 }); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2 + dy, { steps: 8 }); await page.mouse.up(); };
  await drag(page.locator("#advPalette .adv-op-F"), page.locator("#advProg .adv-zone").first());
  await drag(page.locator("#advPalette .adv-op-L"), page.locator("#advProg .adv-zone").first());
  assert.equal(await page.locator("#advProg > .adv-zone > .adv-blk").count(), 2);
  assert.deepEqual(await page.locator("#advProg > .adv-zone > .adv-blk").evaluateAll((n) => n.map((e) => e.className.match(/adv-op-(\w+)/)[1])), ["F", "L"]);
  // reorder: drag the L block above F
  const first = page.locator("#advProg > .adv-zone > .adv-blk").nth(0), second = page.locator("#advProg > .adv-zone > .adv-blk .adv-bh").nth(1);
  const fb = await first.boundingBox(), sb = await second.boundingBox();
  await page.mouse.move(sb.x + 40, sb.y + sb.height / 2); await page.mouse.down(); await page.mouse.move(sb.x + 40, sb.y - 10, { steps: 4 }); await page.mouse.move(fb.x + 40, fb.y + 4, { steps: 8 }); await page.mouse.up();
  assert.deepEqual(await page.locator("#advProg > .adv-zone > .adv-blk").evaluateAll((n) => n.map((e) => e.className.match(/adv-op-(\w+)/)[1])), ["L", "F"]);
  // drag a block onto the palette = delete
  await drag(page.locator("#advProg > .adv-zone > .adv-blk .adv-bh").first(), page.locator("#advPalette"));
  assert.equal(await page.locator("#advProg .adv-blk").count(), 1);
  await page.click("#advUndo"); assert.equal(await page.locator("#advProg .adv-blk").count(), 2);
  await ctx.close();
});

test("execution highlights the running block and the hero actually moves (animated run)", async () => {
  const { page, ctx } = await open("#1", { reduced: false });
  await page.waitForSelector("#advBoard .adv-c");
  const l = LEVELS[0]; for (const b of l.solution.main) await page.click(`#advPalette .adv-op-${b.op}`);
  await page.click("#advSpeed"); await page.click("#advSpeed"); // 3x
  const before = await page.locator("#advBoard .adv-hero").evaluate((e) => getComputedStyle(e).transform);
  await page.click("#advRun");
  await page.waitForSelector(".adv-blk.is-run", { timeout: 4000 });
  assert.equal(await page.isVisible("#advStop"), true);
  await page.waitForSelector("#advModal:not([hidden]) .adv-sheet", { timeout: 15000 });
  const after = await page.locator("#advBoard .adv-hero").evaluate((e) => getComputedStyle(e).transform);
  assert.notEqual(before, after, "hero moved");
  await ctx.close();
});

test("locked levels fall back to the first open level; locked blocks are disabled; world map reflects progress", async () => {
  const { page, ctx } = await open("#40");
  await page.waitForSelector("#advBoard .adv-c");
  assert.match(await page.textContent("#advNo"), /^1 /);
  assert.equal(await page.locator("#advPalette .adv-op-repeat").count(), 0, "blocks not yet introduced are not offered");
  await page.goto(base + "/play/adventure.html#map"); await page.waitForSelector(".adv-world");
  assert.equal(await page.locator(".adv-world").count(), 6);
  assert.equal(await page.locator(".adv-world:disabled").count(), 5);
  await ctx.close();
});

test("a loop level can be built by tapping (prefix blocks + one repeat) and wins", async () => {
  const pick = LEVELS.find((l) => l.world === 3 && l.solution.main.at(-1).op === "repeat" && flat(l.solution.main.at(-1).body) && l.solution.main.slice(0, -1).every((b) => "FLR".includes(b.op)));
  assert.ok(pick, "expected a prefix+repeat level in world 3");
  const { page, ctx } = await open("#" + pick.id, { solved: pick.id - 1 });
  await page.waitForSelector("#advBoard .adv-c");
  const top = pick.solution.main.at(-1);
  for (const b of pick.solution.main.slice(0, -1)) await page.click(`#advPalette .adv-op-${b.op}`);
  await page.click("#advPalette .adv-op-repeat"); await page.selectOption("#advProg .adv-bh select", String(top.n));
  for (const b of top.body) await page.click(`#advPalette .adv-op-${b.op}`);
  await page.click("#advRun"); await page.waitForSelector("#advModal:not([hidden]) .adv-sheet", { timeout: 20000 });
  assert.ok((await page.locator("#advModal .adv-bigstars svg.on").count()) >= 1);
  await ctx.close();
});

test("mobile: no horizontal overflow on intro, map, trail and play at 360/390/430", async () => {
  for (const w of [360, 390, 430]) {
    const { page, ctx } = await open("", { solved: 45, vp: { width: w, height: 800 } });
    for (const h of ["", "#map", "#w2", "#46"]) { await page.goto(base + "/play/adventure.html" + (h ? "?" + w + h : "")); await page.waitForTimeout(150); if (h) await page.evaluate((x) => (location.hash = x), h); await page.waitForTimeout(250); const o = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth); assert.ok(o <= 1, `overflow ${o}px at ${w} ${h}`); }
    await ctx.close();
  }
});
