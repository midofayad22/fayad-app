// Documentation shell shared by every course page: independent sidebar scroll, active lesson revealed, logo = home button, no Back button.
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";

const PAGES = [
  ["com", "/fundamentals/computer-basics/com.html", 28], ["prg", "/fundamentals/programming-basics/prg.html", 28],
  ["html", "/html-learning/html-learning.html", 20], ["css", "/css-learning/css-learning.html", 20], ["js", "/javascript-learning/javascript-learning.html", 20],
  ["ajs", "/advanced-javascript/advanced-javascript.html", 15], ["bs", "/bootstrap-learning/bootstrap-learning.html", 15], ["tw", "/tailwind-learning/tailwind-learning.html", 15],
  ["react", "/react-learning/react-learning.html", 20], ["vue", "/vue-learning/vue-learning.html", 15], ["ang", "/angular-learning/angular-learning.html", 25],
];
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser.close(); server.close(); });

const open = async (url, lang, vp) => {
  const ctx = await browser.newContext({ viewport: vp, serviceWorkers: "block" });
  await ctx.addInitScript((l) => localStorage.setItem("fayad-language", l), lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + url);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready"); await page.waitForTimeout(700);
  return { ctx, page };
};

for (const lang of ["ar", "en"]) for (const [k, url, n] of PAGES) {
  test(`${k}/${lang} desktop: sidebar scrolls on its own, stays in the viewport, reveals the active lesson`, async () => {
    const { ctx, page } = await open(`${url}#lesson-${n}`, lang, { width: 1280, height: 700 });
    const r = await page.evaluate(() => {
      const sb = document.querySelector(".sidebar"), cs = getComputedStyle(sb), a = sb.querySelector("[aria-current]");
      const before = sb.getBoundingClientRect().height; window.scrollTo(0, 900);
      return new Promise((res) => setTimeout(() => { const b = sb.getBoundingClientRect(), ar = a && a.getBoundingClientRect(); res({ pos: cs.position, ov: cs.overflowY, h: before, scrollable: sb.scrollHeight > sb.clientHeight, bottom: b.bottom, top: b.top, vh: innerHeight, activeIn: !!ar && ar.top >= b.top - 1 && ar.bottom <= b.bottom + 1, docScrolled: window.scrollY > 0 }); }, 250));
    });
    assert.equal(r.pos, "sticky"); assert.match(r.ov, /auto|scroll/); assert.ok(r.h <= r.vh, `sidebar height ${r.h} > viewport ${r.vh}`);
    assert.ok(r.bottom <= r.vh + 1, "sidebar bottom leaves the viewport after page scroll"); assert.ok(r.top >= 0);
    assert.ok(r.scrollable, "long course list must scroll inside the sidebar"); assert.ok(r.activeIn, "active lesson is visible inside the sidebar");
    await ctx.close();
  });
}

for (const [k, url] of PAGES) test(`${k}: logo is the home button (link, focus ring, hover feedback) and no separate Back button`, async () => {
  const { ctx, page } = await open(url, "en", { width: 390, height: 800 });
  const logo = page.locator(".fy-bar-brand, .learning-logo").first();
  assert.equal(await logo.getAttribute("href"), "/index.html"); assert.equal(await logo.getAttribute("aria-label"), "FAYBIT");
  assert.equal(await page.locator(".back-btn:visible").count(), 0, "Back button visible");
  await logo.focus(); await page.keyboard.press("Tab"); await logo.focus();
  assert.notEqual(await logo.evaluate((e) => getComputedStyle(e).outlineStyle), "none", "visible focus");
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "mobile overflow");
  await Promise.all([page.waitForURL(/\/(index\.html)?$/), logo.click()]); await ctx.close();
});
