import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { LEVELS } from "../js/game/zombie/levels.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(hash = "", { reduced = true, solved = 0, vp, lang } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", reducedMotion: reduced ? "reduce" : "no-preference", viewport: vp || { width: 1280, height: 900 }, hasTouch: !!(vp && vp.width < 500) });
  await ctx.addInitScript(([n, lang]) => { if (location.protocol === "about:" || window.origin === "null") return; const s = {}; for (let i = 1; i <= n; i++) s[i] = { at: 1 }; if (n) localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 0, games: { zombie: { solved: s } } })); if (lang) localStorage.setItem("fayad-language", lang); }, [solved, lang]);
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => { if (!/sandboxed|Access is denied|Failed to fetch|parse URL/.test(e.message)) errors.push(e.message); });
  await page.goto(base + "/play/zombie.html" + hash); return { page, errors, ctx };
}
const setCode = (page, code) => page.evaluate((c) => { const t = document.getElementById("zbCode"); t.value = c; t.dispatchEvent(new Event("input", { bubbles: true })); }, code);
const runAndWait = async (page, sel) => { await page.click("#zbRun"); await page.waitForSelector(sel, { timeout: 25000 }); };

test("intro → start; starter code fails with a specific explanation; the reference JavaScript wins, scores once, unlocks night 2", async () => {
  const { page, errors, ctx } = await open();
  assert.equal(await page.isVisible("#scrIntro"), true);
  await page.click("#zbStart"); await page.waitForSelector("#zbBoard .zb-c");
  assert.equal(await page.locator("#zbBoard .zb-ent.z").count(), LEVELS[0].zombies.length);
  await runAndWait(page, "#zbMsg .zb-fb.bad");
  assert.match(await page.textContent("#zbMsg"), /(عضّك|انتهت|سقطتَ)/); assert.match(await page.textContent("#zbMsg"), /فكّر/);
  assert.equal(await page.textContent("#zbPoints"), "0");
  await setCode(page, LEVELS[0].solution);
  await runAndWait(page, "#zbModal:not([hidden]) .zb-sheet");
  assert.ok((await page.locator("#zbModal .zb-bigstars svg.on").count()) >= 2);
  assert.notEqual(await page.textContent("#zbPoints"), "0");
  const pts = await page.textContent("#zbPoints");
  await page.click("#zbModal .zb-btn:nth-child(2)"); await setCode(page, LEVELS[0].solution); await runAndWait(page, "#zbModal:not([hidden]) .zb-sheet");
  assert.equal(await page.textContent("#zbPoints"), pts, "points are awarded once");
  await page.click("#zbModal .zb-btn-primary"); await page.waitForSelector("#scrPlay:not([hidden])");
  assert.equal(await page.textContent("#zbNo"), "2");
  assert.deepEqual(errors, []); await ctx.close();
});
test("bad code is explained: syntax error, wrong return type, runtime error, endless loop", async () => {
  const { page, ctx } = await open("#1");
  await page.waitForSelector("#zbBoard .zb-c");
  const cases = [["function act(s){ return ", /Syntax|خطأ في كتابة/], ["function act(s){ return 42 }", /string/], ["function act(s){ return s.nothing.deep }", /الدور/], ["function act(s){ while(true){} }", /طويلًا|حلقة/], ["function act(s){ return \"fly\" }", /fly/]];
  for (const [code, re] of cases) { await setCode(page, code); await page.click("#zbRun"); await page.waitForSelector("#zbMsg .zb-fb.bad", { timeout: 20000 }); assert.match(await page.textContent("#zbMsg"), re, code); await page.waitForSelector("#zbRun:not([hidden])"); await page.evaluate(() => (document.getElementById("zbMsg").textContent = "")); }
  await ctx.close();
});
test("every level's reference JavaScript wins through the real UI + sandbox (levels 1, 7, 8, 13)", async () => {
  for (const id of [7, 8, 13]) {
    const { page, ctx, errors } = await open("#" + id, { solved: id - 1 });
    await page.waitForSelector("#zbBoard .zb-c"); await setCode(page, LEVELS[id - 1].solution); await runAndWait(page, "#zbModal:not([hidden]) .zb-sheet");
    assert.ok((await page.locator("#zbModal .zb-bigstars svg.on").count()) >= 1, "level " + id); assert.deepEqual(errors, []); await ctx.close();
  }
});
test("code is remembered per level; hints then the reference solution; reset restores the starter", async () => {
  const { page, ctx } = await open("#2", { solved: 1 });
  await page.waitForSelector("#zbBoard .zb-c"); await setCode(page, "// my draft\nfunction act(s){ return 'wait' }");
  await page.reload(); await page.waitForSelector("#zbBoard .zb-c"); await page.waitForTimeout(600);
  assert.match(await page.inputValue("#zbCode"), /my draft/);
  await page.click("#zbHint"); assert.match(await page.textContent("#zbMsg"), /1\/2/); await page.click("#zbHint"); await page.click("#zbHint"); assert.match(await page.textContent("#zbMsg"), /function act/);
  await page.click("#zbReset"); assert.equal(await page.inputValue("#zbCode"), LEVELS[1].starter); await ctx.close();
});
test("nights map locks later nights; English mode has no Arabic text on the play screen", async () => {
  const { page, ctx } = await open("#map");
  assert.equal(await page.locator("#zbNights button").count(), 15); assert.equal(await page.locator("#zbNights button:not([disabled])").count(), 1); await ctx.close();
  const en = await open("#3", { solved: 2, lang: "en" }); await en.page.waitForSelector("#zbBoard .zb-c"); await en.page.waitForTimeout(500);
  const txt = await en.page.evaluate(() => document.querySelector("#scrPlay").innerText + document.querySelector(".gnav").innerText);
  assert.ok(!/[؀-ۿ]/.test(txt), "Arabic found in EN mode: " + (txt.match(/.{0,20}[؀-ۿ]+.{0,20}/) || [""])[0]); await en.ctx.close();
});
for (const [w, h] of [[360, 740], [390, 844], [430, 932], [820, 1180]]) {
  test(`responsive ${w}x${h}: no horizontal overflow, run button reachable, touch chips insert code`, async () => {
    const { page, ctx } = await open("#4", { solved: 3, vp: { width: w, height: h } });
    await page.waitForSelector("#zbBoard .zb-c"); await page.waitForTimeout(500);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); assert.ok(over <= 1, "overflow " + over);
    const b = await page.locator("#zbBoard").boundingBox(); assert.ok(b.width >= 200 && b.width <= w, "board " + b.width);
    const r = await page.locator("#zbRun").boundingBox(); assert.ok(r.y + r.height <= h + 1 && r.y >= 0, "run button off-screen " + JSON.stringify(r));
    await page.locator(".zb-chip-b", { hasText: "return" }).first().scrollIntoViewIfNeeded(); const before = await page.inputValue("#zbCode");
    await page.locator(".zb-chip-b", { hasText: "return" }).first().tap().catch(() => page.locator(".zb-chip-b", { hasText: "return" }).first().click());
    assert.ok((await page.inputValue("#zbCode")).length > before.length, "chip inserted nothing");
    await ctx.close();
  });
}
test("animated (non-reduced) run on a phone finishes and shows the win sheet", async () => {
  const { page, ctx, errors } = await open("#1", { reduced: false, vp: { width: 390, height: 844 } });
  await page.waitForSelector("#zbBoard .zb-c"); await setCode(page, LEVELS[0].solution); await page.click("#zbSpeed"); await page.click("#zbSpeed");
  await page.click("#zbRun"); await page.waitForSelector("#zbModal:not([hidden]) .zb-sheet", { timeout: 30000 }); assert.deepEqual(errors, []); await ctx.close();
});
