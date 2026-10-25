import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { startServer } from "./static-server.mjs";

const ROUTES = ["/", "/about/about.html", "/login.html", "/html-learning/html-learning.html", "/css-learning/css-learning.html",
  "/javascript-learning/javascript-learning.html", "/react-learning/react-learning.html", "/vue-learning/vue-learning.html",
  "/angular-learning/angular-learning.html", "/fundamentals/computer-basics/com.html", "/fundamentals/programming-basics/prg.html"];
let server, browser;
let base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

for (const lang of ["ar", "en"]) for (const route of ROUTES) {
  test(`no horizontal overflow at 390px ${lang} ${route}`, async () => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
    await ctx.addInitScript((l) => { localStorage.setItem("fayad-language", l); }, lang);
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForTimeout(500);
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    await ctx.close();
    assert.ok(w <= 391, `scrollWidth ${w} > 390`);
  });
}
