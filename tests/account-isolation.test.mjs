// V5: device-local progress must not leak between accounts on one browser, and must never be deleted.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const evt = (page, event, id) => page.evaluate(([e, i]) => window.dispatchEvent(new CustomEvent("fayad-auth-changed", { detail: { event: e, user: i ? { id: i } : null, loggedIn: !!i } })), [event, id]);
const snap = (page) => page.evaluate(() => ({ owner: localStorage.getItem("fayad-device-owner"), html: localStorage.getItem("fayad-html-progress"), game: localStorage.getItem("fayad-game-v1"), prog: localStorage.getItem("fayad-progress-v1"), stashA: localStorage.getItem("fayad-stash-v1:A"), stashB: localStorage.getItem("fayad-stash-v1:B"), lang: localStorage.getItem("fayad-language"), theme: localStorage.getItem("fayad-theme") }));

test("guest progress is adopted by the first account; switching accounts stashes it instead of sharing or deleting it", async () => {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/about/about.html");
  await page.evaluate(() => { localStorage.setItem("fayad-html-progress", JSON.stringify({ done: [1, 2, 3] })); localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 20, games: {} })); localStorage.setItem("fayad-language", "en"); localStorage.setItem("fayad-theme", "light"); });
  // first account on this device adopts guest progress (unchanged behaviour), nothing moves
  await evt(page, "SIGNED_IN", "A"); let s = await snap(page); assert.equal(s.owner, "A"); assert.ok(s.html && s.game, "adopted, not moved");
  // account B signs in on the same browser -> A's progress is stashed, B starts clean
  await Promise.all([page.waitForEvent("load").catch(() => {}), evt(page, "SIGNED_IN", "B")]); await page.waitForTimeout(500);
  s = await snap(page); assert.equal(s.owner, "B"); assert.equal(s.html, null); assert.equal(s.game, null); assert.ok(s.stashA && s.stashA.includes("fayad-html-progress"), "A's data is preserved in the stash");
  assert.equal(s.lang, "en"); assert.equal(s.theme, "light", "preferences are never touched");
  // B earns something, signs out -> B stashed, device is clean for a guest
  await page.evaluate(() => localStorage.setItem("fayad-html-progress", JSON.stringify({ done: [9] })));
  await Promise.all([page.waitForEvent("load").catch(() => {}), evt(page, "SIGNED_OUT", null)]); await page.waitForTimeout(500);
  s = await snap(page); assert.equal(s.owner, null); assert.equal(s.html, null); assert.ok(s.stashB.includes("[9]") || s.stashB.includes("9"));
  // A signs back in -> A's progress returns exactly as it was
  await Promise.all([page.waitForEvent("load").catch(() => {}), evt(page, "SIGNED_IN", "A")]); await page.waitForTimeout(500);
  s = await snap(page); assert.equal(s.owner, "A"); assert.deepEqual(JSON.parse(s.html), { done: [1, 2, 3] }); assert.equal(JSON.parse(s.game).points, 20); assert.equal(s.stashA, null);
  await ctx.close();
});

test("same account signing in again (or INITIAL_SESSION on every page) never moves data", async () => {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/about/about.html");
  await page.evaluate(() => localStorage.setItem("fayad-html-progress", JSON.stringify({ done: [1] })));
  await evt(page, "SIGNED_IN", "A"); await evt(page, "INITIAL_SESSION", "A"); await evt(page, "SIGNED_IN", "A");
  const s = await snap(page); assert.equal(s.owner, "A"); assert.ok(s.html); assert.equal(s.stashA, null);
  await ctx.close();
});
