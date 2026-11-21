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

test("games hub lists both games with progress from the shared store", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.addInitScript(() => localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, flex: { solved: { 1: { at: 1 }, 2: { at: 1 } } }, points: 30 })));
  await page.goto(base + "/play/index.html"); await page.waitForSelector(".gh-card");
  assert.equal(await page.locator(".gh-card").count(), 7);
  assert.equal(await page.textContent("#ghPoints"), "30");
  assert.match(await page.locator(".gh-card").filter({ hasText: "Flex Quest" }).textContent(), /2/);
  await ctx.close();
});

test("arena: solving a challenge awards points once, shows the explanation and persists", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/play/arena.html?track=html&c=1"); await page.waitForSelector(".ar-ta");
  await page.click("#arRun");
  await page.waitForSelector("#arChecks li.bad");
  assert.equal(await page.textContent("#arPoints"), "0");
  await page.locator(".ar-ta").first().evaluate((t) => { t.value = "<h1>FAYBIT</h1>\n<p>x</p>"; t.dispatchEvent(new Event("input")); });
  await page.click("#arRun");
  await page.waitForSelector("#arWin:not([hidden])");
  assert.equal(await page.textContent("#arPoints"), "15");
  assert.ok((await page.textContent("#arWinExplain")).length > 20);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-game-v1")));
  assert.ok(saved.games.html.solved["1"]);
  // (Playwright's own probe of navigator.serviceWorker inside the sandboxed frame is not an app error)
  assert.deepEqual(errors.filter((m) => !/serviceWorker/.test(m)), []); await ctx.close();
});
