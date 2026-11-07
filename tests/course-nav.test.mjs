// Phase 2: the shared course navigation (js/course/*, css/course-nav.css) — structure, search, progress, persistence, RTL/LTR, responsive.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { normalize, lessonOrder, moduleStats, nextUp } from "../js/course/structure.js";

const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(query = "", viewport = { width: 1280, height: 900 }, lang = "ar") {
  const ctx = await browser.newContext({ viewport });
  if (lang === "en") await ctx.addInitScript(() => { document.documentElement.dataset.lang = "en"; document.documentElement.lang = "en"; document.documentElement.dir = "ltr"; });
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.goto(`${base}/tests/fixtures/course-nav.html?${query}`); await page.waitForSelector("html[data-ready]");
  return { ctx, page, errors };
}
const mod = (n) => `.cn-mod[data-module="m${n}"]`;
const expanded = (page, sel) => page.locator(`${sel} > .cn-mod-h`).getAttribute("aria-expanded");

// ---------- structure (pure) ----------
test("structure: old groups and new modules normalize to the same shape; ids and order are preserved", () => {
  const g = normalize({ groups: [{ id: "a", title: { ar: "أ" }, lessons: ["x-01", "x-02"] }, { id: "b", title: { ar: "ب" }, lessons: ["x-03"] }] });
  assert.deepEqual(g.map((m) => m.id), ["a", "b"]);
  assert.equal(g[0].units.length, 1); assert.equal(g[0].units[0].title, null);
  assert.deepEqual(lessonOrder(g), ["x-01", "x-02", "x-03"]);
  const m = normalize({ modules: [{ id: "m1", title: { ar: "و" }, units: [{ title: { ar: "u1" }, lessons: ["x-01"] }, { lessons: ["x-02", "x-03"] }] }] });
  assert.equal(m[0].units.length, 2); assert.deepEqual(lessonOrder(m), ["x-01", "x-02", "x-03"]);
});
test("structure: module assessments join their module, the rest form a closing module; stats and next lesson", () => {
  const mods = normalize({ modules: [{ id: "m1", title: {}, units: [{ lessons: ["a-01", "a-02"] }] }, { id: "m2", title: {}, units: [{ lessons: ["a-03"] }] }] },
    { assessments: [{ id: "t1", module: "m1", title: {} }, { id: "final", title: {} }] });
  assert.deepEqual(mods.map((m) => m.id), ["m1", "m2", "assessments"]); assert.equal(mods[2].isAssessment, true);
  assert.equal(mods[0].units[0].items.at(-1).id, "t1");
  const done = new Set(["a-01"]);
  assert.deepEqual(moduleStats(mods[0], (id) => done.has(id)), { total: 3, done: 1, percent: 33 });
  assert.equal(nextUp(mods, (id) => done.has(id)), "a-02");
  assert.equal(nextUp(mods, () => true), "a-01");
});

// ---------- component ----------
test("modules → units → lessons render; only the module of the current lesson is open when there are many", async () => {
  const { ctx, page, errors } = await open("modules=5&units=2&per=4&cur=10");
  assert.equal(await page.locator(".cn-mod").count(), 5);
  assert.equal(await page.locator(`${mod(1)} .cn-unit-t`).count(), 2);
  assert.equal(await page.locator(".cn-lesson").count(), 40);
  assert.equal(await expanded(page, mod(2)), "true");           // lesson 10 lives in module 2
  assert.equal(await expanded(page, mod(1)), "false");
  assert.equal(await page.locator(".cn-lesson.active").count(), 1);
  assert.equal(await page.locator(".cn-lesson.active").getAttribute("data-lesson"), "10");
  assert.equal(await page.locator(".cn-lesson.active").getAttribute("aria-current"), "true");
  assert.deepEqual(errors, []); await ctx.close();
});
test("open / close a module by click, with aria-expanded and inert on the hidden body", async () => {
  const { ctx, page } = await open("cur=1");
  await page.click(`${mod(3)} > .cn-mod-h`);
  assert.equal(await expanded(page, mod(3)), "true");
  assert.equal(await page.locator(`${mod(3)} .cn-mod-b`).evaluate((n) => n.hasAttribute("inert")), false);
  await page.click(`${mod(3)} > .cn-mod-h`);
  assert.equal(await expanded(page, mod(3)), "false");
  assert.equal(await page.locator(`${mod(3)} .cn-mod-b`).evaluate((n) => n.hasAttribute("inert")), true);
  await page.click(".cn-bulk button >> nth=0"); assert.equal(await page.locator(".cn-mod.is-open").count(), 5);
  await page.click(".cn-bulk button >> nth=1"); assert.equal(await page.locator(".cn-mod.is-open").count(), 1);
  await ctx.close();
});
test("open modules are remembered per course across reloads", async () => {
  const { ctx, page } = await open("cur=1");
  await page.click(`${mod(4)} > .cn-mod-h`); await page.reload(); await page.waitForSelector("html[data-ready]");
  assert.equal(await expanded(page, mod(4)), "true"); await ctx.close();
});
test("selecting a lesson calls back with its id and repaints the current marker", async () => {
  const { ctx, page } = await open("cur=1");
  await page.click('.cn-lesson[data-lesson="3"]');
  assert.equal(await page.evaluate(() => window.__selected), "fx-03");
  assert.equal(await page.locator(".cn-lesson.active").getAttribute("data-lesson"), "3"); await ctx.close();
});
test("progress: completed lessons show ✓, module counts and rings follow, and the continue button points to the next lesson", async () => {
  const { ctx, page } = await open("cur=4&done=1,2,3");
  assert.equal(await page.locator('.cn-lesson[data-lesson="1"] .cn-mark').innerText(), "✓");
  assert.equal(await page.locator('.cn-lesson[data-lesson="1"]').getAttribute("data-state"), "done");
  assert.equal((await page.locator(`${mod(1)} .cn-mod-c`).innerText()).trim(), "3/8");
  assert.equal(await page.locator(".cn-continue").getAttribute("href"), "#lesson-4");
  await page.evaluate(() => window.__complete(4)); assert.equal((await page.locator(`${mod(1)} .cn-mod-c`).innerText()).trim(), "4/8");
  await page.click(".cn-continue"); assert.equal(await page.evaluate(() => window.__selected), "fx-05");
  for (let i = 5; i <= 8; i++) await page.evaluate((k) => window.__complete(k), i);
  assert.ok(await page.locator(mod(1)).evaluate((n) => n.classList.contains("is-complete"))); await ctx.close();
});
test("search: filters by name or number, highlights, auto-opens, announces results, hides empty modules, Escape clears", async () => {
  const { ctx, page } = await open("cur=1");
  await page.fill("#sidebarSearch", "درس 25");
  assert.equal(await page.locator(".cn-lesson:visible").count(), 1);
  assert.equal(await page.locator(".cn-lesson:visible mark").count(), 1);
  assert.equal(await page.locator(`${mod(4)}:visible`).count(), 1); assert.equal(await page.locator(`${mod(1)}:visible`).count(), 0);
  assert.match(await page.locator("#sidebarEmpty").innerText(), /1/);
  await page.fill("#sidebarSearch", "لا يوجد شيء"); assert.equal(await page.locator(".cn-lesson:visible").count(), 0);
  assert.equal(await page.locator("#sidebarEmpty").getAttribute("data-empty"), "true");
  await page.fill("#sidebarSearch", "متغيرات"); assert.equal(await page.locator(".cn-lesson:visible").count(), 40);
  await page.press("#sidebarSearch", "Escape"); assert.equal(await page.inputValue("#sidebarSearch"), "");
  assert.equal(await expanded(page, mod(1)), "true"); // reopened state restored
  await ctx.close();
});
test("keyboard: arrows move between headers and lessons, Home/End jump", async () => {
  const { ctx, page } = await open("cur=1");
  await page.focus(`${mod(1)} > .cn-mod-h`); await page.keyboard.press("ArrowDown");
  assert.equal(await page.evaluate(() => document.activeElement.dataset.lesson), "1");
  await page.keyboard.press("End"); assert.equal(await page.evaluate(() => document.activeElement.classList.contains("cn-mod-h")), true);
  await page.keyboard.press("Home"); assert.equal(await page.evaluate(() => document.activeElement.classList.contains("cn-mod-h")), true);
  await ctx.close();
});
test("assessments appear in their module and as a closing module; they are separate from lesson counts", async () => {
  const { ctx, page } = await open("cur=1&assess=1");
  assert.equal(await page.locator(".cn-mod").count(), 6);
  assert.equal(await page.locator(".cn-mod.is-assess .cn-assess").count(), 1);
  assert.equal(await page.locator(`${mod(1)} .cn-assess`).count(), 1);
  assert.equal(await page.locator(`${mod(1)} .cn-assess`).getAttribute("href"), "#m1-test"); await ctx.close();
});
test("old groups structure renders through the same component (no unit titles)", async () => {
  const { ctx, page } = await open("shape=groups&modules=4&per=5&cur=1");
  assert.equal(await page.locator(".cn-mod").count(), 4); assert.equal(await page.locator(".cn-unit-t").count(), 0);
  assert.equal(await page.locator(".cn-lesson").count(), 20); await ctx.close();
});
test("English / LTR: labels switch, reading direction follows, no Arabic in the component chrome", async () => {
  const { ctx, page } = await open("cur=1", undefined, "en");
  await page.evaluate(() => { document.documentElement.dir = "ltr"; document.documentElement.dataset.lang = "en"; window.__nav.setLang("en"); });
  assert.equal(await page.locator("#sidebarSearch").getAttribute("placeholder"), "Search lessons");
  assert.match(await page.locator(`${mod(1)} .cn-mod-t small`).innerText(), /^Module 01$/);
  const chrome = await page.locator(".cn-top, .cn-mod-h small").allInnerTexts();
  assert.ok(!/[؀-ۿ]/.test(chrome.join(" ")), chrome.join("|"));
  assert.equal(await page.locator(".cn").evaluate((n) => getComputedStyle(n).direction), "ltr"); await ctx.close();
});
test("performance: 240 lessons build and filter quickly", async () => {
  const { ctx, page } = await open("modules=12&units=4&per=5&cur=1");
  assert.equal(await page.locator(".cn-lesson").count(), 240);
  const ms = await page.evaluate(() => { const t = performance.now(); const i = document.getElementById("sidebarSearch"); i.value = "درس 1"; i.dispatchEvent(new Event("input")); i.value = ""; i.dispatchEvent(new Event("input")); window.__nav.paint(); return performance.now() - t; });
  assert.ok(ms < 400, `filter+paint took ${ms}ms`); await ctx.close();
});
test("responsive: desktop rail, phone bottom sheet; no horizontal overflow at 390px and 320px", async () => {
  for (const w of [1280, 390, 320]) {
    const { ctx, page, errors } = await open("cur=3", { width: w, height: 800 });
    assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= w + 1, `overflow @${w}`);
    if (w < 901) {
      assert.equal(await page.locator("#sidebarPanel").isVisible(), false);
      await page.click("#sidebarToggle"); assert.equal(await page.locator("#sidebarPanel").isVisible(), true);
      await page.waitForTimeout(500); const box = await page.locator("#sidebarPanel").boundingBox(); assert.ok(box.y + box.height <= 801 && box.width <= w + 1);
      assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= w + 1, `overflow open @${w}`);
      await page.click('.cn-lesson[data-lesson="3"]'); assert.equal(await page.locator("#sidebarPanel").isVisible(), false);
    } else assert.equal(await page.locator("#sidebarPanel").isVisible(), true);
    assert.deepEqual(errors, []); await ctx.close();
  }
});
test("scope: the stylesheet never styles anything outside .cn / .sidebar[data-cn]", async () => {
  const css = (await import("node:fs")).readFileSync(new URL("../css/course-nav.css", import.meta.url), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
  const sels = [...css.matchAll(/(^|\})\s*([^{}@]+)\{/g)].flatMap((m) => m[2].split(",").map((s) => s.trim())).filter(Boolean);
  const bad = sels.filter((s) => !/\.cn\b|\.cn-|\.sidebar\[data-cn\]|body\.sb-lock \.fy-controls--dock|html\[data-motion/.test(s) && !/^(from|to|\d+%)$/.test(s));
  assert.deepEqual(bad, []);
});
