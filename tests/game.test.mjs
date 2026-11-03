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
  assert.ok(saved.games.flex.solved["1"]);
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
    { "flex-direction": "column", "justify-content": "space-between", "align-items": "flex-end" },
    { "flex-direction": "column-reverse", "justify-content": "center", "align-items": "center" },
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

test("selector quest: wrong selector does not solve, exact selector does, invalid selector is handled", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/play/selector-quest.html"); await page.waitForSelector("#sqInput");
  await page.fill("#sqInput", "span"); assert.equal(await page.textContent("#fqPoints"), "0");
  await page.fill("#sqInput", "p[["); assert.ok((await page.textContent("#sqCount")).length > 3);
  await page.fill("#sqInput", "p");
  await page.waitForFunction(() => document.getElementById("fqPoints").textContent === "15");
  const answers = ["p", ".a", "#x", "p.a", "ul li", "ul > li", "li:first-child", ":disabled", "li:not(.a)", "h2 + p"];
  for (let i = 1; i < answers.length; i++) { await page.click("#fqNext"); await page.fill("#sqInput", answers[i]); await page.waitForFunction((n) => document.querySelectorAll(".fq-dot")[n].classList.contains("is-done"), i); }
  assert.equal(await page.textContent("#fqPoints"), "150");
  assert.deepEqual(errors, []); await ctx.close();
});

test("games hub lists both games with progress from the shared store", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.addInitScript(() => localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, flex: { solved: { 1: { at: 1 }, 2: { at: 1 } } }, points: 30 })));
  await page.goto(base + "/play/index.html"); await page.waitForSelector(".gh-card");
  assert.equal(await page.locator(".gh-card").count(), 2);
  assert.equal(await page.textContent("#ghPoints"), "30");
  assert.match(await page.locator(".gh-card").first().textContent(), /2/);
  await ctx.close();
});
