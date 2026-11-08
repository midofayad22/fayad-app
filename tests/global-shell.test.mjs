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
