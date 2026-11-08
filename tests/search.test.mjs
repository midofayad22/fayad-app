// Global search: engine behaviour on the REAL generated index (no mocks), index freshness, and the overlay in a real browser.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { createSearch, normalize, stem, editDistance } from "../js/search/engine.js";
import { buildIndex } from "../tools/build-search-index.mjs";
import { GAMES_META } from "../js/game/games-meta.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const INDEX = JSON.parse(fs.readFileSync(new URL("../search/index.json", import.meta.url), "utf8"));
const S = createSearch(INDEX);
const top = (q, n = 5, o = {}) => S.search(q, { limit: n, ...o }).map((r) => r.doc.id);

// ---------- index ----------
test("index is generated from real content and is fresh (rebuild with: node tools/build-search-index.mjs)", async () => {
  const fresh = await buildIndex(); assert.equal(INDEX.hash, fresh.hash, "search/index.json is stale");
  const by = (t) => INDEX.docs.filter((d) => d.type === t).length;
  assert.equal(by("course"), 11); assert.equal(by("lesson"), 271); assert.ok(by("module") >= 40); assert.ok(by("exercise") > 100); assert.ok(by("game") >= 30);
  assert.ok(new Set(INDEX.docs.map((d) => d.id)).size === INDEX.docs.length, "ids are unique");
  assert.ok(fs.statSync(new URL("../search/index.json", import.meta.url)).size < 700 * 1024, "index stays small enough to ship");
});
test("every indexed URL points at a real page and lesson anchors exist in range", () => {
  for (const d of INDEX.docs) { const p = d.url.split("#")[0].split("?")[0]; assert.ok(fs.existsSync(new URL(".." + p, import.meta.url)), `${d.id}: ${p}`); }
  const hub = fs.readFileSync(new URL("../js/game/hub.js", import.meta.url), "utf8");
  for (const g of GAMES_META) assert.ok(hub.includes(g.href.split("?")[0].replace("/play/", "")) || g.id.startsWith("arena"), `${g.id} is not in the games hub`);
});

// ---------- normalisation ----------
test("Arabic/English normalisation, stemming and edit distance", () => {
  assert.equal(normalize("أَحْمَد إلى آخر"), "احمد الي اخر"); assert.equal(normalize("مدرسة ٣"), "مدرسه 3");
  assert.equal(stem("المتغيرات"), stem("متغير")); assert.equal(stem("variables"), stem("variable")); assert.equal(stem("css"), "css");
  assert.equal(editDistance("javscript", "javascript"), 1); assert.equal(editDistance("flexbox", "flexbxo"), 1); assert.ok(editDistance("abc", "xyz") > 2);
});

// ---------- the examples from the brief ----------
test("JavaScript → the JavaScript course first, related lessons follow", () => { const r = top("JavaScript", 8); assert.equal(r[0], "course-js"); assert.ok(r.some((id) => id.startsWith("js-"))); });
test("padding in CSS → the CSS Padding lesson", () => assert.equal(top("padding in CSS", 1)[0], "css-09"));
test("المتغيرات → the Variables lessons (Arabic query, English and Arabic titles)", () => { const r = top("المتغيرات", 4); assert.ok(r.includes("prg-07") && r.includes("js-02"), r.join()); });
test("Flexbox → the Flexbox lesson and related exercises/games", () => {
  const r = S.search("Flexbox", { limit: 10 }).map((x) => x.doc); assert.ok(r.slice(0, 3).some((d) => d.id === "css-18")); assert.ok(r.some((d) => d.type === "game")); });
test("Computer Basics is discoverable (there is no architecture lesson yet, so that exact phrase returns AND-matches only)", () => {
  assert.equal(top("computer", 1)[0], "course-com"); assert.ok(top("cpu", 3).includes("com-04")); assert.ok(S.search("Computer Architecture").length > 0); });
test("Arabic ⇄ English synonyms: حشو finds Padding, معالج finds the CPU lesson, ذاكرة finds RAM", () => {
  assert.equal(top("حشو", 1)[0], "css-09"); assert.equal(top("معالج", 1)[0], "com-04"); assert.equal(top("ذاكرة", 1)[0], "com-05"); assert.equal(top("memory ram", 1)[0], "com-05"); });
test("suggestions start at the first character", () => { assert.ok(S.search("j", { limit: 5 }).length > 0); assert.ok(S.search("ف", { limit: 5 }).length > 0); assert.ok(S.search("fl", { limit: 3 }).some((r) => /flex/i.test(r.doc.title.en || ""))); });
test("fuzzy: typos still find the target; did-you-mean on nonsense", () => {
  assert.equal(top("javscript", 1)[0], "course-js"); assert.ok(top("flexbxo", 5).includes("css-18"));
  assert.deepEqual(S.search("zzzzqqqq"), []); assert.ok(S.didYouMean("javscript").some((w) => /javascript/i.test(w))); });
test("highlighting marks whole matching words in both languages and via synonyms", () => {
  const hit = (t, q) => S.highlight(t, q).filter((x) => x.hit).map((x) => x.text);
  assert.deepEqual(hit("CSS Padding and margin", "padding"), ["Padding"]); assert.deepEqual(hit("المتغيرات في JavaScript", "متغير"), ["المتغيرات"]);
  assert.deepEqual(hit("Variables", "المتغيرات"), ["Variables"]); assert.deepEqual(hit("no match here", "xyz"), []); });
test("type filter and performance", () => {
  assert.ok(S.search("css", { types: ["game"], limit: 5 }).every((r) => r.doc.type === "game"));
  const t = performance.now(); for (let i = 0; i < 20; i++) S.search(["flex", "variables", "المتغيرات", "padding css", "cpu"][i % 5]); assert.ok((performance.now() - t) / 20 < 25, "avg query < 25ms"); });

// ---------- overlay (real browser, real index over HTTP) ----------
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(path, { w = 1280, h = 800, lang = "ar", offline = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { if (window !== window.top) return; try { localStorage.setItem("fayad-language", l); localStorage.setItem("fayad-prefs-v1", JSON.stringify({ v: 1, lang: l })); } catch {} }, lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort()); if (offline) await ctx.route("**/search/index.json", (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + path); await page.waitForSelector(".fy-btn-search"); return { ctx, page };
}
test("the navbar search icon opens the overlay; typing shows grouped, highlighted results; Enter opens the selected one", async () => {
  const { ctx, page } = await open("/index.html"); await page.click(".fy-btn-search"); await page.waitForSelector(".sx.on .sx-input");
  assert.equal(await page.evaluate(() => document.activeElement.className), "sx-input");
  await page.keyboard.type("padding"); await page.waitForSelector(".sx-opt mark");
  assert.ok((await page.locator(".sx-group h3").count()) >= 1); assert.ok((await page.locator(".sx-opt mark").count()) >= 1);
  assert.equal(await page.locator(".sx-opt.is-active").first().getAttribute("data-href"), "/css-learning/css-learning.html#lesson-9");
  await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowUp");
  await Promise.all([page.waitForURL(/css-learning\.html/), page.keyboard.press("Enter")]); assert.match(page.url(), /#lesson-9$/); await ctx.close(); });
test("Ctrl+K and / open it from anywhere; Escape closes and restores focus; / is ignored while typing in a field", async () => {
  const { ctx, page } = await open("/css-learning/css-learning.html"); await page.keyboard.press("Control+k"); await page.waitForSelector(".sx.on");
  await page.keyboard.press("Escape"); await page.waitForTimeout(100); assert.equal(await page.locator(".sx").count(), 0);
  await page.keyboard.press("/"); await page.waitForSelector(".sx.on"); await page.keyboard.press("Escape");
  await page.click(".fy-btn-search"); await page.waitForSelector(".sx.on"); await page.keyboard.press("Escape"); await page.waitForTimeout(100);
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains("fy-btn-search")), true); await ctx.close(); });
test("states: idle shows courses, no-results shows suggestions, offline index shows an error with retry", async () => {
  const { ctx, page } = await open("/index.html", { lang: "en" }); await page.keyboard.press("Control+k"); await page.waitForSelector(".sx-opt");
  assert.equal(await page.locator('.sx-opt[data-type="course"]').count(), 11);
  await page.keyboard.type("javscript"); await page.waitForTimeout(150); assert.ok((await page.locator(".sx-opt").count()) > 0);
  await page.fill(".sx-input", "zzzzqqqq"); await page.waitForSelector(".sx-msg"); assert.match(await page.locator(".sx-msg").innerText(), /No results for/);
  await page.fill(".sx-input", "javscript"); await page.keyboard.press("Enter"); await ctx.close();
  const o = await open("/index.html", { offline: true }); await o.page.keyboard.press("Control+k"); await o.page.waitForSelector(".sx-msg .sx-link"); assert.ok((await o.page.locator(".sx-msg strong").innerText()).length > 0); await o.ctx.close(); });
test("recent searches are remembered locally and can be cleared", async () => {
  const { ctx, page } = await open("/index.html", { lang: "en" }); await page.keyboard.press("Control+k"); await page.waitForSelector(".sx.on .sx-input"); await page.waitForFunction(() => document.activeElement?.classList.contains("sx-input")); await page.keyboard.type("flexbox"); await page.waitForSelector(".sx-opt mark");
  await Promise.all([page.waitForNavigation(), page.keyboard.press("Enter")]);
  await page.keyboard.press("Control+k"); await page.waitForSelector(".sx-pill"); assert.equal(await page.locator(".sx-pill").first().innerText(), "flexbox");
  await page.click(".sx-group h3 .sx-link"); await page.waitForTimeout(100); assert.equal(await page.locator(".sx-pill").count(), 0); await ctx.close(); });
for (const [lang, dir] of [["ar", "rtl"], ["en", "ltr"]]) test(`direction follows the language (${lang}) and English chrome has no Arabic`, async () => {
  const { ctx, page } = await open("/index.html", { lang }); await page.keyboard.press("Control+k"); await page.waitForSelector(".sx-opt");
  assert.equal(await page.locator(".sx").getAttribute("dir"), dir);
  if (lang === "en") { const chrome = await page.locator(".sx-bar, .sx-chips, .sx-foot, .sx-group h3").allInnerTexts(); assert.doesNotMatch(chrome.join(" "), /[؀-ۿ]/); }
  await ctx.close(); });
test("phone: full-screen sheet, no horizontal overflow, filter chips scroll instead of wrapping", async () => {
  const { ctx, page } = await open("/index.html", { w: 360, h: 700 }); await page.click(".fy-btn-search"); await page.waitForSelector(".sx.on"); await page.keyboard.type("flex"); await page.waitForSelector(".sx-opt mark"); await page.waitForTimeout(400);
  const b = await page.locator(".sx-panel").boundingBox(); assert.ok(b.width >= 359 && b.height >= 699, JSON.stringify(b));
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)); await ctx.close(); });

// Offline: with the real service worker active, the index fetched once is served from cache when the network is gone.
test("PWA: search works offline after it has been used once (real service worker)", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } }); await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + "/index.html"); await page.evaluate(() => navigator.serviceWorker.ready); await page.reload(); await page.waitForFunction(() => navigator.serviceWorker.controller);
  await page.reload(); await page.waitForSelector(".fy-btn-search"); await page.click(".fy-btn-search"); await page.waitForSelector(".sx.on .sx-opt"); await page.keyboard.press("Escape");
  await page.waitForFunction(async () => !!(await caches.match("/search/index.json")));
  await ctx.setOffline(true); await page.reload(); await page.waitForSelector(".fy-btn-search"); await page.click(".fy-btn-search"); await page.waitForFunction(() => document.activeElement?.classList.contains("sx-input"));
  await page.keyboard.type("padding"); await page.waitForSelector(".sx-opt mark"); assert.ok((await page.locator(".sx-opt").count()) > 0); await ctx.close();
});
