import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/adventure/levels.js";
const { chromium } = createRequire(import.meta.url)("playwright");

let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(hash = "") {
  const ctx = await browser.newContext({ serviceWorkers: "block", reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/play/adventure.html" + hash);
  await page.waitForSelector("#advBoard .adv-c");
  return { page, errors, ctx };
}
const label = { F: "تقدّم", L: "يسار", R: "يمين" };

test("an empty or wrong program does not score; the reference program does, persists and unlocks level 2", async () => {
  const { page, errors, ctx } = await open();
  await page.click("#advRun");
  assert.match(await page.textContent("#advMsg"), /فارغ/);
  await page.click(".adv-op-F"); // a single step is (almost) never the full solution
  const l = LEVELS[0];
  assert.ok(l.solution.main.length > 1);
  await page.click("#advRun");
  assert.match(await page.textContent("#advMsg"), /لم يصل/);
  assert.equal(await page.textContent("#advPoints"), "0");
  await page.click("#advClear");
  for (const b of l.solution.main) await page.click(`#advPalette .adv-op-${b.op}`);
  await page.click("#advRun");
  assert.match(await page.textContent("#advMsg"), /أحسنت/);
  assert.equal(await page.textContent("#advPoints"), "15"); // base 10 + 5 no-hint
  assert.equal(await page.isVisible("#advNext"), true);
  await page.click("#advNext");
  assert.equal(await page.textContent("#advNo"), "2");
  await page.reload(); await page.waitForSelector("#advBoard .adv-c");
  assert.equal(await page.textContent("#advPoints"), "15", "persisted");
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("locked levels cannot be opened; block palette honours the world", async () => {
  const { page, ctx } = await open("#40");
  assert.equal(await page.textContent("#advNo"), "1", "falls back to the first open level");
  assert.equal(await page.isDisabled("#advPalette .adv-op-repeat"), true);
  assert.equal(await page.isDisabled("#advLevels button:nth-child(2)"), true);
  await ctx.close();
});

test("repeat block nests and runs (world 3 reference level)", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block", reducedMotion: "reduce" });
  await ctx.addInitScript(() => { const solved = {}; for (let i = 1; i <= 40; i++) solved[i] = { at: 1, hint: false, pts: 15 }; localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { adventure: { solved } } })); });
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/play/adventure.html#41"); await page.waitForSelector("#advBoard .adv-c");
  const l = LEVELS[40];
  const build = async (list) => { for (const b of list) { await page.click(`#advPalette .adv-op-${b.op}`); if (b.op === "repeat") { await page.selectOption(".adv-blk select >> nth=-1", String(b.n)); await build(b.body); } } };
  const top = l.solution.main[0];
  assert.ok(top.op === "repeat" && top.body.every((b) => ["F", "L", "R"].includes(b.op)), "level 41 is one flat repeat");
  if (top.op === "repeat") { await page.click("#advPalette .adv-op-repeat"); await page.selectOption(".adv-blk select", String(top.n)); await build(top.body); }
  await page.click("#advRun");
  assert.match(await page.textContent("#advMsg"), /أحسنت/);
  await ctx.close();
});
