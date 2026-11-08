// Phase A: ONE global sidebar (js/nav-drawer.js + css/sidebar.css) used by every page; course navigation stays contextual.
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
const openMenu = async (p) => { await menu(p).click(); await p.waitForSelector(".nd.on"); await p.waitForTimeout(350); };

test("structure: three groups, expandable courses with real progress, every link resolves and has an icon", async () => {
  const { ctx, page } = await open("/about/about.html");
  await openMenu(page);
  assert.equal(await page.locator(".nd-h").count(), 3);                       // main / account / platform
  assert.equal(await page.locator("#nd-courses-btn").getAttribute("aria-expanded"), "false");
  await page.click("#nd-courses-btn"); assert.equal(await page.locator("#nd-courses-btn").getAttribute("aria-expanded"), "true");
  assert.equal(await page.locator(".nd-course").count(), 11);
  assert.match(await page.locator('.nd-course[href*="html-learning"] .nd-count').innerText(), /^3\/30$/);
  assert.equal(await page.locator(".nd-item:visible").evaluateAll((n) => n.every((a) => a.querySelector("svg.nd-ico"))), true);
  const hrefs = await page.locator(".nd a[href]").evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  for (const h of hrefs) { const [p, hash] = h.split("#"); const path = p.split("?")[0]; if (!path.startsWith("/")) continue;
    const r = await page.request.get(base + path); assert.equal(r.status(), 200, h);
    if (hash && !/^signup$/.test(hash)) assert.match(await r.text(), new RegExp(`id="${hash}"`), `${h}: anchor missing`); }
  const dupes = hrefs.filter((h, i) => hrefs.indexOf(h) !== i); assert.deepEqual(dupes, []);
  await ctx.close();
});

test("one sidebar: no leftover home menu, one menu button, the course list is contextual and the drawer never co-exists open with it", async () => {
  const { ctx, page } = await open("/index.html");
  assert.equal(await page.locator(".site-menu, #siteMenu, #menuToggle, .menu-overlay").count(), 0);
  assert.equal(await page.locator(".fy-btn-menu").count(), 1);
  await openMenu(page); assert.equal(await page.locator(".nd").count(), 1); await ctx.close();
  const c = await open("/css-learning/css-learning.html");
  assert.equal(await c.page.locator("aside.sidebar[data-cn]").count(), 1);   // contextual course navigation
  assert.equal(await c.page.locator(".nd").count(), 0);                      // global drawer only exists while open
  await openMenu(c.page);
  assert.equal(await c.page.locator(".nd-now").count(), 1);                  // "current course" shortcut, not a lesson list
  assert.equal(await c.page.locator(".nd .cn-lesson").count(), 0);
  await c.page.keyboard.press("Escape"); await c.page.waitForTimeout(400); assert.equal(await c.page.locator(".nd").count(), 0);
  await c.ctx.close();
});

for (const lang of ["ar", "en"]) test(`opens from the physical left edge (${lang}) and closes with Escape, backdrop and the close button`, async () => {
  const { ctx, page } = await open("/play/index.html", { lang });
  await openMenu(page);
  const box = await page.locator(".nd-panel").boundingBox(); assert.ok(Math.abs(box.x) <= 1, `panel x=${box.x}`);
  assert.equal(await page.locator(".nd-panel").getAttribute("dir"), lang === "ar" ? "rtl" : "ltr");
  await page.keyboard.press("Escape"); await page.waitForTimeout(400); assert.equal(await page.locator(".nd").count(), 0);
  assert.equal(await page.evaluate(() => document.activeElement.className.includes("fy-btn-menu")), true);
  await openMenu(page); await page.mouse.click(1100, 400); await page.waitForTimeout(400); assert.equal(await page.locator(".nd").count(), 0);
  await openMenu(page); await page.click(".nd-x"); await page.waitForTimeout(400); assert.equal(await page.locator(".nd").count(), 0);
  await ctx.close();
});

test("keyboard: focus starts inside, Tab wraps, the current page is marked", async () => {
  const { ctx, page } = await open("/play/index.html");
  await openMenu(page); assert.equal(await page.evaluate(() => !!document.activeElement.closest(".nd")), true);
  for (let i = 0; i < 40; i++) await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => !!document.activeElement.closest(".nd")), true);
  assert.equal(await page.locator('.nd-item[aria-current="page"]').getAttribute("href"), "/play/index.html"); await ctx.close();
});

test("phone: 320px has no horizontal overflow and the panel stays on screen", async () => {
  const { ctx, page } = await open("/fundamentals/programming-basics/prg.html", { w: 320, h: 640 });
  await openMenu(page); const box = await page.locator(".nd-panel").boundingBox();
  assert.ok(box.x >= 0 && box.x + box.width <= 320 && box.y + box.height <= 641, JSON.stringify(box));
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)); await ctx.close();
});

test("English sidebar contains no Arabic", async () => {
  const { ctx, page } = await open("/play/index.html", { lang: "en" });
  await openMenu(page); await page.click("#nd-courses-btn"); assert.doesNotMatch(await page.locator(".nd").innerText(), /[؀-ۿ]/); await ctx.close();
});
