// Motion safety: the homepage hero must not flash (disappear and reappear) while it loads or when the language changes.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

for (const lang of ["ar", "en"]) test(`hero headline never flashes while loading (${lang})`, async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.addInitScript((l) => { try { localStorage.setItem("fayad-prefs-v1", JSON.stringify({ v: 1, lang: l })); localStorage.setItem("fayad-language", l); } catch {}
    window.__s = []; const tick = () => { const h = document.querySelector(".hm-t1"); if (h) { const r = h.getBoundingClientRect(); window.__s.push({ o: +getComputedStyle(h).opacity, y: Math.round(r.top), h: Math.round(r.height), w: h.querySelectorAll("span").length }); } if (window.__s.length < 400) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, lang);
  await page.goto(`${base}/index.html`); await page.waitForTimeout(2200);
  const s = await page.evaluate(() => window.__s);
  assert.ok(s.length > 20, "sampler ran");
  // opacity may only go up, never down, once the element exists
  let peak = 0; for (const x of s) { assert.ok(x.o >= peak - 0.001, `opacity dropped from ${peak} to ${x.o}`); peak = Math.max(peak, x.o); }
  assert.equal(peak, 1, "headline ends fully visible");
  assert.ok(s.every((x) => x.w === 0), "headline is not split into per-word spans");
  const tops = s.filter((x) => x.o > 0.99).map((x) => x.y); assert.ok(Math.max(...tops) - Math.min(...tops) <= 1, "no layout movement once visible");
  await ctx.close();
});
test("language switch does not restart or hide the hero", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort()); await page.goto(`${base}/index.html`); await page.waitForTimeout(1800);
  await page.click(".fy-btn-lang"); await page.waitForTimeout(100);
  const o = await page.evaluate(() => [...document.querySelectorAll(".hm-t1, .hm-t2, .hm-lead")].map((n) => +getComputedStyle(n).opacity));
  assert.deepEqual(o, [1, 1, 1]); await ctx.close();
});
test("reduced motion: hero is visible immediately and nothing animates", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort()); await page.goto(`${base}/index.html`); await page.waitForSelector(".hm-t1");
  assert.equal(await page.evaluate(() => +getComputedStyle(document.querySelector(".hm-t1")).opacity), 1); await ctx.close();
});
