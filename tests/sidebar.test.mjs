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

// ---------- navbar + sidebar refinement ----------
test("opening the sidebar or search never changes the scroll position (top, middle, bottom; stylesheets delayed to expose load-order bugs)", async () => {
  for (const [path, lang] of [["/index.html", "ar"], ["/index.html", "en"], ["/css-learning/css-learning.html", "en"], ["/about/about.html", "ar"]]) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: "block" });
    await ctx.addInitScript((l) => { localStorage.setItem("fayad-language", l); localStorage.setItem("fayad-prefs-v1", JSON.stringify({ v: 1, lang: l })); }, lang);
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    await ctx.route(/\/css\/(sidebar|search)\.css/, async (r) => { await new Promise((x) => setTimeout(x, 500)); r.continue(); });   // the original bug: unstyled panel at the end of <body> took focus
    const page = await ctx.newPage(); await page.goto(base + path); await page.waitForSelector(".fy-btn-menu"); await page.waitForTimeout(1200);
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    for (const y of [0, Math.round(max / 2), max]) {
      await page.evaluate((v) => scrollTo({ top: v, behavior: "instant" }), y); await page.waitForTimeout(500); const before = await page.evaluate(() => Math.round(scrollY));
      await page.locator(".fy-btn-menu").first().click(); await page.waitForSelector(".nd.on"); await page.waitForTimeout(400);
      assert.equal(await page.evaluate(() => Math.round(scrollY)), before, `${path} ${lang}: sidebar open moved scroll from ${before}`);
      await page.keyboard.press("Escape"); await page.waitForTimeout(400); assert.equal(await page.evaluate(() => Math.round(scrollY)), before, `${path} ${lang}: sidebar close moved scroll`);
      await page.locator(".fy-btn-search").first().click(); await page.waitForSelector(".sx.on"); await page.waitForTimeout(400);
      assert.equal(await page.evaluate(() => Math.round(scrollY)), before, `${path} ${lang}: search open moved scroll`);
      await page.keyboard.press("Escape"); await page.waitForTimeout(300); assert.equal(await page.evaluate(() => Math.round(scrollY)), before, `${path} ${lang}: search close moved scroll`);
    }
    await ctx.close();
  }
});

for (const [lang, dir] of [["ar", "rtl"], ["en", "ltr"]]) test(`navbar: balanced action group, menu toggle at the far edge, no sign-in button (${lang})`, async () => {
  for (const w of [1440, 768, 390, 320]) {
    const { ctx, page } = await open("/index.html", { w, lang });
    const r = await page.evaluate(() => { const bs = [...document.querySelectorAll(".navbar .fy-controls .fy-btn")].map((b) => { const x = b.getBoundingClientRect(); return { c: b.className.replace("fy-btn ", ""), l: Math.round(x.left), r: Math.round(x.right), w: Math.round(x.width), h: Math.round(x.height), t: Math.round(x.top) }; });
      const nav = document.querySelector(".navbar").getBoundingClientRect(); return { bs, signin: document.querySelectorAll(".navbar .nav-signin-btn, .navbar a[href*='login']").length, navL: nav.left, navR: nav.right, dir: document.documentElement.dir, over: document.documentElement.scrollWidth - innerWidth }; });
    assert.deepEqual(r.bs.map((b) => b.c), ["fy-btn-search", "fy-btn-lang", "fy-btn-theme", "fy-btn-menu"], `${w}: order`);
    assert.equal(new Set(r.bs.map((b) => b.w)).size, 1, `${w}: equal widths`); assert.equal(new Set(r.bs.map((b) => b.h)).size, 1); assert.equal(new Set(r.bs.map((b) => b.t)).size, 1, `${w}: aligned`);
    const gaps = r.bs.slice(1).map((b, i) => (dir === "ltr" ? b.l - r.bs[i].r : r.bs[i].l - b.r)); assert.ok(gaps.every((g) => g >= 0 && g <= 12), `${w}: gaps ${gaps}`);
    const menu = r.bs[3]; if (dir === "ltr") assert.ok(r.bs.every((b) => b.r <= menu.r)); else assert.ok(r.bs.every((b) => b.l >= menu.l)); // toggle is the last control in reading order
    assert.equal(r.signin, 0, `${w}: sign-in must not be in the navbar`); assert.ok(r.bs.every((b) => b.l >= 0 && b.r <= w), `${w}: controls inside viewport`); assert.ok(r.over <= 0, `${w}: overflow`); await ctx.close();
  }
});

test("sidebar account area: guests get a quiet sign-in row (no CTA button); signed-in users get their profile row", async () => {
  const g = await open("/index.html", { lang: "en" }); await openMenu(g.page);
  assert.equal(await g.page.locator(".nd-cta, .nd-foot").count(), 0); const row = g.page.locator(".nd-account a.nd-acct"); assert.equal(await row.getAttribute("href"), "/login.html"); assert.match(await row.innerText(), /Sign in/);
  assert.equal(await g.page.locator(".nd-account .nd-acct-alt a").getAttribute("href"), "/login.html#signup"); assert.equal(await g.page.locator(".nd").count(), 1);
  const bg = await row.evaluate((e) => getComputedStyle(e).backgroundColor); assert.match(bg, /rgba\(0, 0, 0, 0\)|transparent/, "sign-in row must not be a filled button");
  await g.ctx.close();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: "block" });
  await ctx.addInitScript(() => { localStorage.setItem("fayad-language", "en"); localStorage.setItem("sb-vsrysitexadvmmikcmfs-auth-token", JSON.stringify({ user: { id: "u1", email: "sara@example.com", user_metadata: { full_name: "Sara" } }, expires_at: 9999999999 })); });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort()); const page = await ctx.newPage(); await page.goto(base + "/index.html"); await page.waitForTimeout(700); await openMenu(page);
  assert.equal(await page.locator(".nd-account a.nd-acct").getAttribute("href"), "/profile.html"); assert.match(await page.locator(".nd-account .nd-who").innerText(), /Sara/); assert.equal(await page.locator(".nd-account .nd-acct-alt").count(), 0); await ctx.close();
});

test("motion: hover/focus transitions are short, panel timing is ≤ 220ms with a decelerating curve, reduced-motion disables them", async () => {
  const { ctx, page } = await open("/index.html", { lang: "en" }); await openMenu(page);
  const t = await page.evaluate(() => { const d = (e) => getComputedStyle(e).transitionDuration.split(",").map((x) => parseFloat(x) * (x.includes("ms") ? 1 : 1000)); return { item: d(document.querySelector(".nd-item")), panel: d(document.querySelector(".nd-panel")), back: d(document.querySelector(".nd-back")), btn: d(document.querySelector(".fy-controls--inline .fy-btn")), ease: getComputedStyle(document.querySelector(".nd-panel")).transitionTimingFunction }; });
  for (const [k, v] of Object.entries({ item: t.item, panel: t.panel, back: t.back, btn: t.btn })) assert.ok(Math.max(...v) <= 220, `${k}: ${v}`); assert.match(t.ease, /cubic-bezier\(0\.2, 0\.8, 0\.2, 1\)/); await ctx.close();
  const c2 = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: "block", reducedMotion: "reduce" }); await c2.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const p2 = await c2.newPage(); await p2.goto(base + "/index.html"); await p2.waitForTimeout(800); await openMenu(p2);
  const rd = await p2.evaluate(() => [".nd-panel", ".nd-back", ".nd-item"].map((s) => parseFloat(getComputedStyle(document.querySelector(s)).transitionDuration))); assert.ok(rd.every((v) => v < 0.001), `reduced motion: ${rd}`); await c2.close();
});
