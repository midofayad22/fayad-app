// Static lesson pages in a real browser: no horizontal overflow at five widths, readable, links work, theme + RTL/LTR.
import { test, before, after } from "node:test"; import assert from "node:assert/strict"; import { createRequire } from "node:module"; import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
const SAMPLE = ["/react-learning/lessons/react-02.html", "/en/react-learning/lessons/react-02.html", "/fundamentals/computer-basics/lessons/com-03.html", "/en/fundamentals/programming-basics/lessons/prg-05.html", "/bootstrap-learning/lessons/bs-04.html", "/en/advanced-javascript/lessons/ajs-03.html", "/html-learning/lessons/index.html", "/en/css-learning/lessons/index.html"];
test("sample lesson pages: five widths, no overflow, both themes, links resolve", { timeout: 240000 }, async () => {
  for (const w of [360, 390, 430, 820, 1366]) for (const dark of [false, true]) {
    const ctx = await browser.newContext({ serviceWorkers: "block", viewport: { width: w, height: w < 820 ? 800 : 900 }, colorScheme: dark ? "dark" : "light", reducedMotion: "reduce" });
    const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort()); const errs = []; page.on("pageerror", (e) => errs.push(e.message));
    for (const u of SAMPLE) {
      if (dark && w !== 390) continue;
      const r = await page.goto(base + u); assert.equal(r.status(), 200, u);
      const info = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth, h1: document.querySelectorAll("h1").length, h1text: document.querySelector("h1")?.textContent.trim().length, dir: document.documentElement.dir, theme: document.documentElement.getAttribute("data-theme"), small: [...document.querySelectorAll("a,button,summary")].filter((e) => { const b = e.getBoundingClientRect(); return b.width && b.height && b.height < 32 && !e.closest("pre,code,.lp-body p,.lp-body li,.lp-crumbs"); }).length }));
      assert.ok(info.over <= 1, `${u} overflow ${info.over}px at ${w}`); assert.equal(info.h1, 1); assert.ok(info.h1text > 2);
      assert.equal(info.dir, u.startsWith("/en/") ? "ltr" : "rtl"); if (dark) assert.equal(info.theme, "dark");
      assert.equal(info.small, 0, `${u} has small touch targets at ${w}`);
      if (w === 390 || w === 1366) await page.screenshot({ path: `/tmp/x/shots/lesson-${u.replace(/[^a-z0-9]+/gi, "_")}-${w}${dark ? "-dark" : ""}.png`, fullPage: false });
    }
    assert.deepEqual(errs, []); await ctx.close();
  }
  const ctx = await browser.newContext({ serviceWorkers: "block" }); const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/react-learning/lessons/react-02.html"); const href = await page.getAttribute(".lp-cta a", "href"); assert.equal(href, "/react-learning/react-learning.html#lesson-2");
  await page.click(".lp-nav a[hreflang=en]"); assert.match(page.url(), /\/en\/react-learning\/lessons\/react-02\.html$/);
  await page.click("a[rel=next]"); assert.match(page.url(), /react-03\.html$/);
  await ctx.close();
});
