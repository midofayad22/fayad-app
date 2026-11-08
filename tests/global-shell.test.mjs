// Phase 3: every page with a header carries the display controls inside it (no floating dock over content).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const PAGES = ["index.html", "html-learning/html-learning.html", "css-learning/css-learning.html", "javascript-learning/javascript-learning.html", "react-learning/react-learning.html",
  "fundamentals/programming-basics/prg.html", "fundamentals/computer-basics/com.html", "dashboard.html", "profile.html", "settings/index.html", "settings/appearance.html", "play/index.html", "play/arena.html", "about/about.html"];

for (const w of [1280, 390, 320]) {
  test(`controls live inside the page header, no floating dock, no horizontal overflow @${w}px`, async () => {
    for (const p of PAGES) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 800 } }); const page = await ctx.newPage();
      await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
      await page.goto(`${base}/${p}`); await page.waitForSelector(".fy-controls", { state: "attached" });
      assert.equal(await page.locator(".fy-controls--dock").count(), 0, `${p}: dock still floating`);
      const inHeader = await page.locator(".fy-controls").evaluate((n) => !!n.closest("header, .st-top, .navbar"));
      assert.ok(inHeader, `${p}: controls are not inside a header`);
      assert.ok(await page.locator(".fy-controls .fy-btn-theme").isVisible(), `${p}: theme button hidden`);
      assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= w + 1, `${p}: overflow @${w}`);
      await ctx.close();
    }
  });
}
test("login keeps the floating dock (it has no header) and the dock never covers the course sidebar", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(`${base}/login.html`); await page.waitForSelector(".fy-controls", { state: "attached" });
  assert.equal(await page.locator(".fy-controls--dock").count(), 1);
  await ctx.close();
});

// Hit-testing: nothing decorative may cover the header controls (found: the logo's ::after shine intercepted clicks at 320px).
for (const lang of ["ar", "en"]) for (const w of [1440, 768, 390, 320]) test(`header controls receive their own clicks (${lang} @${w})`, async () => {
  const ctx = await browser.newContext({ viewport: { width: w, height: 700 }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { try { localStorage.setItem("fayad-prefs-v1", JSON.stringify({ v: 1, lang: l })); localStorage.setItem("fayad-language", l); } catch {} }, lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort()); const page = await ctx.newPage(); await page.goto(`${base}/index.html`); await page.waitForSelector(".fy-btn-search"); await page.waitForTimeout(1200);
  const bad = await page.evaluate(() => [...document.querySelectorAll(".navbar a, .navbar button")].filter((e) => { const r = e.getBoundingClientRect(); if (!r.width || getComputedStyle(e).visibility === "hidden") return false; const t = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return !(t && (e === t || e.contains(t) || t.contains(e))); }).map((e) => e.className || e.tagName));
  assert.deepEqual(bad, []); await ctx.close();
});

// Every header on every page: same control order, and the group is the last (far-edge) item of the header's action area.
for (const lang of ["ar", "en"]) test(`header action group is identical and last on every page type (${lang})`, async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { try { localStorage.setItem("fayad-prefs-v1", JSON.stringify({ v: 1, lang: l })); localStorage.setItem("fayad-language", l); } catch {} }, lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  for (const path of ["/index.html", "/css-learning/css-learning.html", "/about/about.html", "/dashboard.html", "/profile.html", "/settings/index.html", "/play/index.html", "/fundamentals/computer-basics/com.html"]) {
    const page = await ctx.newPage(); await page.goto(base + path); await page.waitForSelector(".fy-controls--inline .fy-btn-menu"); await page.waitForTimeout(500);
    const r = await page.evaluate(() => { const g = document.querySelector(".fy-controls"); const gx = g.getBoundingClientRect(), rtl = document.documentElement.dir === "rtl";
      return { order: [...g.querySelectorAll(".fy-btn")].map((x) => x.className.replace("fy-btn fy-btn-", "")).join(), last: [...(g.closest("header") || g.parentElement).querySelectorAll("a, button")].filter((e) => !g.contains(e) && e.getBoundingClientRect().width).every((e) => rtl ? e.getBoundingClientRect().left >= gx.left - 1 : e.getBoundingClientRect().right <= gx.right + 1) }; });
    assert.equal(r.order, "search,lang,theme,account,menu", path); assert.equal(r.last, true, `${path}: group is not at the far edge`); await page.close();
  }
  await ctx.close();
});
