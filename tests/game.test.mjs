import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open() {
  const ctx = await browser.newContext({ serviceWorkers: "block" });
  const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/play/flex-quest.html");
  await page.waitForSelector("#fqControls select");
  return { page, errors, ctx };
}

test("a wrong arrangement does not score; the right one does and persists", async () => {
  const { page, errors, ctx } = await open();
  assert.equal(await page.textContent("#fqPoints"), "0");
  await page.selectOption('select[data-prop="justify-content"]', "center");
  assert.equal(await page.textContent("#fqPoints"), "0", "wrong answer gives no points");
  await page.selectOption('select[data-prop="justify-content"]', "flex-end");
  await page.waitForFunction(() => document.getElementById("fqPoints").textContent === "15");
  assert.equal(await page.locator("#fqNext").isHidden(), false);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-game-v1")));
  assert.equal(saved.points, 15);
  assert.ok(saved.flex.solved["1"]);
  await page.reload(); await page.waitForSelector("#fqControls select");
  assert.equal(await page.textContent("#fqPoints"), "15");
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("using a hint reduces the bonus and solving twice never double-counts", async () => {
  const { page, ctx } = await open();
  await page.click("#fqHint");
  await page.selectOption('select[data-prop="justify-content"]', "flex-end");
  await page.waitForFunction(() => document.getElementById("fqPoints").textContent === "10");
  await page.click("#fqReset");
  await page.selectOption('select[data-prop="justify-content"]', "flex-end");
  await page.waitForTimeout(200);
  assert.equal(await page.textContent("#fqPoints"), "10");
  await ctx.close();
});

test("every level is solvable and the game uses no eval", async () => {
  const { page, ctx } = await open();
  const levels = [
    { "justify-content": "flex-end" }, { "justify-content": "center" }, { "align-items": "flex-end" },
    { "justify-content": "center", "align-items": "center" }, { "justify-content": "space-between" },
    { "justify-content": "space-around", "align-items": "flex-end" },
    { "flex-direction": "column", "justify-content": "center" },
    { "flex-direction": "row-reverse", "justify-content": "flex-start", "align-items": "flex-end" },
  ];
  for (let i = 0; i < levels.length; i++) {
    for (const [k, v] of Object.entries(levels[i])) await page.selectOption(`select[data-prop="${k}"]`, v);
    await page.waitForFunction((n) => document.querySelectorAll(".fq-dot")[n].classList.contains("is-done"), i);
    if (i < levels.length - 1) await page.click("#fqNext");
  }
  assert.equal(await page.textContent("#fqPoints"), String(levels.length * 15 - 0));
  await ctx.close();
  const src = (await import("node:fs")).readFileSync("js/game/flex-quest.js", "utf8");
  assert.ok(!/\beval\s*\(|new Function/.test(src));
});
