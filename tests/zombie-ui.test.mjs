import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/zombie/levels.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(hash = "") {
  const ctx = await browser.newContext({ serviceWorkers: "block", reducedMotion: "reduce" });
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/play/zombie.html" + hash); await page.waitForSelector("#zbBoard .zb-c");
  return { page, errors, ctx };
}
async function setRules(page, rules) {
  while ((await page.locator(".zb-rule").count()) < rules.length) await page.click("#zbAdd");
  for (let i = 0; i < rules.length; i++) { const row = page.locator(".zb-rule").nth(i); await row.locator("select").nth(0).selectOption(rules[i].if); await row.locator("select").nth(1).selectOption(rules[i].do); }
}
test("waiting loses; the reference rules win, score once and unlock level 2", async () => {
  const { page, errors, ctx } = await open();
  assert.equal(await page.locator(".zb-c.is-z").count(), LEVELS[0].zombies.length);
  await page.click("#zbRun");
  assert.match(await page.textContent("#zbMsg"), /مات|انتهى/);
  assert.equal(await page.textContent("#zbPoints"), "0");
  await setRules(page, LEVELS[0].solution);
  await page.click("#zbRun");
  assert.match(await page.textContent("#zbMsg"), /نجا/);
  assert.equal(await page.textContent("#zbPoints"), String(LEVELS[0].base + 5));
  await page.click("#zbNext"); assert.equal(await page.textContent("#zbNo"), "2");
  await page.reload(); await page.waitForSelector("#zbBoard .zb-c");
  assert.equal(await page.textContent("#zbPoints"), String(LEVELS[0].base + 5), "persisted");
  assert.deepEqual(errors, []); await ctx.close();
});
test("locked levels fall back; locked actions are not offered", async () => {
  const { page, ctx } = await open("#9");
  assert.equal(await page.textContent("#zbNo"), "1");
  const acts = await page.locator(".zb-rule select").nth(1).locator("option").allTextContents();
  assert.equal(acts.length, LEVELS[0].actions.length);
  await ctx.close();
});
