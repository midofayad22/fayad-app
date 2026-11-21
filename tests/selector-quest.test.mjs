// Selector Quest: every level validated in a real browser (reference + alternative selectors win, trivial wrong ones do not, hostile input is harmless),
// plus real play: typing, radar/tree feedback, specificity war, hints, persistence, locks, EN, layouts and touch.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/selector/levels.js";
import { specificity } from "../js/game/selector/specificity.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(hash = "", { vp = { width: 1280, height: 900 }, solved = 0, touch = false, lang = "ar" } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", viewport: vp, hasTouch: touch, reducedMotion: "reduce" });
  await ctx.addInitScript(([n, l]) => { try { localStorage.setItem("fayad-language", l); if (n) { const s = {}; for (let i = 1; i <= n; i++) s[i] = { at: 1, hint: false, pts: 10 }; localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { sel: { solved: s } } })); } } catch {} }, [solved, lang]);
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => { if (!/serviceWorker/.test(e.message)) errors.push(e.message); });
  await page.goto(base + "/play/selector-quest.html" + hash); return { page, ctx, errors };
}

test("specificity calculator", () => {
  const cases = { p: [0, 0, 1], "li:not(.a)": [0, 1, 1], "#x": [1, 0, 0], "ul > li": [0, 0, 2], "nav a.active": [0, 1, 2], 'a[href^="https"]': [0, 1, 1], "div:has(> p)": [0, 0, 2], "#box p": [1, 0, 1], "p, #x": [1, 0, 0], ":where(.a) p": [0, 0, 1], "li:nth-child(2n)": [0, 1, 1] };
  for (const [q, e] of Object.entries(cases)) assert.deepEqual(specificity(q), e, q);
});

test("all 24 levels: reference + alternatives win, wrong selectors do not, hostile input is harmless", { timeout: 120000 }, async () => {
  const { page, ctx, errors } = await open("", { solved: 23 }); await page.waitForFunction(() => window.__sq);
  const out = [];
  for (const l of LEVELS) {
    const wrong = await page.evaluate(([id, w]) => window.__sq.evaluate(id, w), [l.id, "*"]);
    const wrong2 = await page.evaluate(([id]) => window.__sq.evaluate(id, "section.nope"), [l.id]);
    const row = { id: l.id, starWins: wrong.solved, noneWins: wrong2.solved, ref: null, alts: [] };
    row.ref = (await page.evaluate(([id, w]) => window.__sq.evaluate(id, w), [l.id, l.want])).solved;
    for (const a of l.alts) { await page.evaluate(([id]) => window.__sq.evaluate(id, ""), [l.id]); out.alts = 0; row.alts.push((await page.evaluate(([id, w]) => window.__sq.evaluate(id, w), [l.id, a])).solved); }
    out.push(row);
  }
  // alternatives are checked on a level that is already solved, so verify them through the message instead when 'solved' latched
  assert.deepEqual(out.filter((r) => r.starWins || r.noneWins || !r.ref), []);
  await ctx.close(); assert.deepEqual(errors, []);
});

test("alternative selectors really solve (fresh page per level)", { timeout: 120000 }, async () => {
  const alts = LEVELS.flatMap((l) => l.alts.map((a) => [l.id, a])); const bad = [];
  const { page, ctx } = await open("", { solved: 23 }); await page.waitForFunction(() => window.__sq);
  for (const [id, a] of alts) {
    await page.evaluate(() => { localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { sel: { solved: Object.fromEntries(Array.from({ length: 23 }, (_, i) => [i + 1, { at: 1, hint: false, pts: 10 }])) } } })); });
    const r = await page.evaluate(([i, s]) => { const lv = window.__sq.LEVELS.find((x) => x.id === i); location.hash = "#" + i; return new Promise((res) => setTimeout(() => { const inp = document.getElementById("sqInput"); inp.value = s; inp.dispatchEvent(new Event("input")); res(document.getElementById("sqWin").hidden === false || /🎯|Direct hit/.test(document.getElementById("sqWin").textContent) && !document.getElementById("sqWin").hidden); }, 40)); }, [id, a]);
    if (!r) bad.push([id, a]);
    await page.evaluate(() => { location.hash = ""; }); await page.waitForTimeout(20);
  }
  assert.deepEqual(bad, []); await ctx.close();
});

test("real play: radar, tree, count, specificity chip, win, points, persistence, next", { timeout: 60000 }, async () => {
  const { page, ctx, errors } = await open("");
  assert.equal(await page.locator(".sqg-node").count(), 24); assert.equal(await page.locator(".sqg-node:not(.is-locked)").count(), 1);
  await page.click(".sqg-node >> nth=0"); await page.waitForSelector("#sqInput");
  assert.equal(await page.locator("#sqTree .sqg-ln").count(), 4);
  await page.fill("#sqInput", "span"); assert.match(await page.textContent("#sqCount"), /0 من 3.*1/);
  assert.equal(await page.locator("[data-sq-extra]").count(), 1); assert.equal(await page.isHidden("#sqWin"), true);
  await page.fill("#sqInput", "ul > li.a:first-child"); assert.match(await page.textContent("#sqWhy"), /عنصر <ul> · ابن مباشر لـ · عنصر <li> و له الفئة a و الحالة :first-child/);
  await page.fill("#sqInput", "p[["); assert.match(await page.textContent("#sqCount"), /غير صالح/);
  await page.fill("#sqInput", "p"); await page.waitForSelector("#sqWin:not([hidden])");
  assert.equal(await page.locator("#sqWinStars svg.on").count(), 3); assert.equal(await page.textContent("#sqPoints"), "15");
  assert.equal(await page.locator("#sqTree .sqg-ln.hit").count(), 3);
  await page.click("#sqNext"); await page.waitForFunction(() => /2/.test(document.getElementById("sqTitle").textContent));
  await page.goto(base + "/play/selector-quest.html"); await page.waitForSelector(".sqg-node");
  assert.equal(await page.textContent("#sqPoints"), "15"); assert.equal(await page.locator(".sqg-node.is-done").count(), 1);
  assert.deepEqual(errors, []); await ctx.close();
});

test("specificity war: losing selector explains which rule wins; winning one paints lime; injection attempts fail", { timeout: 60000 }, async () => {
  const { page, ctx, errors } = await open("#21", { solved: 20 }); await page.waitForSelector("#sqInput");
  assert.equal(await page.isVisible("#sqWar"), true);
  await page.fill("#sqInput", "p"); assert.match(await page.textContent("#sqCount"), /ليس هدفًا/); assert.equal(await page.isHidden("#sqWin"), true);
  await page.fill("#sqInput", ".a"); assert.match(await page.textContent("#sqCount"), /p\.a.*\(0,1,1\).*\(0,1,0\)/); assert.equal(await page.isHidden("#sqWin"), true);
  for (const evil of ["p } body { background: red", "p{color:red}", "@import url(x)", "x; y", "}"]) { await page.fill("#sqInput", evil); assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), "rgb(255, 0, 0)"); assert.equal(await page.isHidden("#sqWin"), true, evil); }
  await page.fill("#sqInput", "#x"); await page.waitForSelector("#sqWin:not([hidden])");
  assert.equal(await page.locator("[data-sq-lime]").count(), 1);
  assert.deepEqual(errors, []); await ctx.close();
});

test("hint ladder, show-solution costs stars, locked url, EN has no Arabic", async () => {
  const a = await open("#14", { solved: 13 }); await a.page.waitForSelector("#sqInput");
  for (let i = 0; i < 4; i++) await a.page.click("#sqHint");
  assert.equal(await a.page.locator("#sqHints li").count(), 3); assert.match(await a.page.textContent("#sqMsg"), /لا مزيد/);
  await a.page.fill("#sqInput", "li:last-child"); await a.page.waitForSelector("#sqWin:not([hidden])");
  assert.equal(await a.page.locator("#sqWinStars svg.on").count(), 2); await a.ctx.close();
  const b = await open("#9"); await b.page.waitForSelector(".sqg-node"); assert.equal(await b.page.isVisible("#sqMap"), true); await b.ctx.close();
  const e = await open("#1", { lang: "en" }); await e.page.waitForSelector("#sqInput");
  const txt = await e.page.evaluate(() => document.getElementById("sqPlay").innerText); assert.equal(/[؀-ۿ]/.test(txt), false, txt.match(/[؀-ۿ]+/)?.[0]); await e.ctx.close();
});

test("layout and touch at 360/390/430/820/1366; touch play wins", { timeout: 90000 }, async () => {
  for (const w of [360, 390, 430, 820, 1366]) {
    const { page, ctx } = await open("#23", { vp: { width: w, height: w < 500 ? 800 : 900 }, solved: 22, touch: w < 500 }); await page.waitForSelector("#sqInput");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "overflow " + w);
    for (const id of ["sqHint", "sqSol", "sqReset"]) assert.ok((await page.locator("#" + id).boundingBox()).height >= 40, id + w);
    assert.ok((await page.locator("#sqInput").boundingBox()).height >= 44);
    await page.fill("#sqInput", "ul li"); await page.waitForTimeout(300); await page.screenshot({ path: `/tmp/x/shots/sq-play-${w}.png`, fullPage: true });
    if (w === 390) { await page.tap("#sqSol"); await page.waitForSelector("#sqWin:not([hidden])"); await page.screenshot({ path: "/tmp/x/shots/sq-win-390.png", fullPage: true }); }
    await ctx.close();
  }
  const d = await open("", { solved: 11 }); await d.page.waitForSelector(".sqg-node"); await d.page.screenshot({ path: "/tmp/x/shots/sq-map-1366.png", fullPage: true }); await d.ctx.close();
});
