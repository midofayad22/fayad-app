import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(path, { w = 1280, h = 800, lang = "ar" } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: "block" });
  await ctx.addInitScript((lang) => { if (window !== window.top) return; localStorage.setItem("fayad-language", lang);
    localStorage.setItem("fayad-progress-v1", JSON.stringify({ v: 1, tracks: { html: { completed: ["html-01", "html-02", "html-03"], current: "html-04", quiz: {}, updatedAt: 5 } }, imported: {} })); }, lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + path); await page.waitForTimeout(700); return { ctx, page };
}
const menu = (p) => p.locator(".fy-btn-menu").first();

test("drawer: sections, real progress, continue link, and every route resolves", async () => {
  const { ctx, page } = await open("/about/about.html");
  await menu(page).click(); await page.waitForSelector(".nd.on");
  assert.equal(await page.locator(".nd-h").count(), 3);                      // learn, games, account
  assert.equal(await page.locator(".nd-course").count(), 11);
  assert.match(await page.locator('.nd-course[href*="html-learning"] small').innerText(), /^3\/30$/);
  assert.equal(await page.locator(".nd-continue").getAttribute("href"), "/html-learning/html-learning.html#lesson-4");
  const hrefs = await page.locator(".nd a[href]").evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href").split("#")[0]))]);
  for (const h of hrefs) { if (h.startsWith("/settings/")) continue; const r = await page.request.get(base + h.split("?")[0]); assert.equal(r.status(), 200, h); }
  await ctx.close();
});

test("drawer: filter, Escape closes and returns focus, no horizontal overflow on a phone", async () => {
  const { ctx, page } = await open("/about/about.html", { w: 320, h: 640 });
  const b = menu(page); await b.click(); await page.waitForSelector(".nd.on");
  await page.fill(".nd-filter", "react"); assert.equal(await page.locator(".nd-course:visible").count(), 1);
  await page.fill(".nd-filter", "zzz"); assert.equal(await page.locator(".nd-none").isVisible(), true);
  await page.waitForTimeout(400); const box = await page.locator(".nd-panel").boundingBox(); assert.ok(box.x >= 0 && box.x + box.width <= 320 && box.y + box.height <= 640 + 1);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.keyboard.press("Escape"); await page.waitForTimeout(350);
  assert.equal(await page.locator(".nd").count(), 0);
  assert.equal(await page.evaluate(() => document.activeElement.className.includes("fy-btn-menu")), true);
  await ctx.close();
});

test("drawer in English has no Arabic", async () => {
  const { ctx, page } = await open("/play/index.html", { lang: "en" });
  await menu(page).click(); await page.waitForSelector(".nd.on");
  const txt = await page.locator(".nd").innerText(); assert.doesNotMatch(txt, /[؀-ۿ]/);
  await ctx.close();
});
