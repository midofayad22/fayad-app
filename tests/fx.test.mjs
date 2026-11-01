// Site-wide interaction layer: works on content pages, never hides content, respects reduced motion.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(url, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...opts });
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url); await page.waitForTimeout(1200);
  return { ctx, page };
}
test("about page: reveal-on-scroll and back-to-top work; nothing stays hidden", async () => {
  const { ctx, page } = await open("/about/about.html");
  assert.ok(await page.locator(".fx-pre").count() > 0, "some below-the-fold blocks should wait for reveal");
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(1200);
  assert.equal(await page.locator(".fx-pre:not(.fx-in)").evaluateAll((e) => e.filter((x) => { const r = x.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }).length), 0);
  assert.equal(await page.locator(".fx-progress").count(), 0, "no scroll progress bar");
  assert.ok(await page.locator(".fx-top.on").count() === 1);
  await page.locator(".fx-top").click(); await page.waitForFunction(() => scrollY < 5);
  await ctx.close();
});
test("reduced motion: no fx elements and no hidden content", async () => {
  const { ctx, page } = await open("/about/about.html", { reducedMotion: "reduce" });
  assert.equal(await page.locator(".fx-top, .fx-pre").count(), 0);
  await ctx.close();
});
test("buttons produce a ripple that cleans itself up", async () => {
  const { ctx, page } = await open("/about/about.html");
  await page.locator(".ab-btn").first().dispatchEvent("pointerdown", { clientX: 5, clientY: 5 });
  assert.equal(await page.locator(".fx-ripple").count(), 1);
  await page.waitForTimeout(900);
  assert.equal(await page.locator(".fx-ripple").count(), 0);
  await ctx.close();
});
