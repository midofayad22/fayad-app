// Zombie Survival through the REAL game page in Chromium: map, HUD, real mouse/touch shooting, win, loss + retry, mobile, EN.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
const { MISSIONS } = await import("../js/game/zombie/missions.js");

async function open(w, h, { lang = "ar", m = null, touch = false, solved = 0 } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: "block", hasTouch: touch });
  await ctx.addInitScript(([l, n]) => { try { localStorage.setItem("fayad-language", l); if (n) { const solvedO = {}; for (let i = 1; i <= n; i++) solvedO[i] = { at: 1, hint: false, pts: 10 }; localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: n * 10, games: { zombie: { solved: solvedO } } })); } } catch {} }, [lang, solved]);
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => { if (!/serviceWorker/.test(e.message)) errs.push(e.message); });
  page.on("console", (c) => { if (c.type() === "error" && !/Failed to load resource|ERR_FAILED|net::|Supabase library|serviceWorker/.test(c.text())) errs.push(c.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/play/zombie.html" + (m ? `?m=${m}` : "")); await page.waitForSelector(".zg-loc-card", { state: "attached" });
  return { ctx, page, errs };
}
const frameOf = (page) => page.frames().find((f) => f !== page.mainFrame());
async function setCode(page, name, text) { await page.click(`.zg-tabs button[data-tab=build]`); const tab = page.locator("#zbTabs .ar-tab", { hasText: name === "js" ? "JavaScript" : name.toUpperCase() }); await tab.click(); await page.locator(`#zbEditors .ar-pane[data-name=${name}] textarea`).fill(text); }
async function applySolution(page, m) { for (const n of m.edit) await setCode(page, n, m.solution[n]); }
/** Real mouse play: click the nearest zombie inside gun range ~ every 0.9s, press #rescue early, grab crates, until the result card shows. */
async function playByMouse(page, m, { touch = false, maxMs = 120000 } = {}) {
  const t0 = Date.now(); let shots = 0, rescued = false, crates = false;
  while (Date.now() - t0 < maxMs) {
    if (await page.locator("#zbResult").isVisible()) break;
    const fr = frameOf(page); if (!fr) { await page.waitForTimeout(200); continue; }
    const info = await fr.evaluate(() => { const S = window.__ZBsim; if (!S) return null; const w = document.getElementById("world").getBoundingClientRect(); const sh = document.getElementById("shelter").getBoundingClientRect(); const K = w.width / 600; return { K, w: { x: w.left, y: w.top }, zs: S.zombies.filter((z) => z.hp > 0).map((z) => ({ x: z.x, y: z.y, hp: z.hp })), sh: { x: (sh.left - w.left) / K, w: sh.width / K, y: (sh.top - w.top) / K, h: sh.height / K }, st: S.state(), resc: (() => { const b = document.getElementById("rescue"); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })(), crate: (() => { const b = document.querySelector(".ammo-crate:not([data-taken])"); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })() }; }).catch(() => null);
    if (!info) { await page.waitForTimeout(150); continue; }
    const box = await page.locator("#zbStage iframe").boundingBox(); const k = box.width / 600, toPage = (x, y) => ({ x: box.x + x * k, y: box.y + y * k });
    const tap = async (p) => (touch ? page.touchscreen.tap(p.x, p.y) : page.mouse.click(p.x, p.y));
    if (info.resc && info.st.t > 1 && !rescued) { rescued = true; await tap(toPage(info.resc.x / info.K - info.w.x / info.K, info.resc.y / info.K - info.w.y / info.K)); }
    if (info.crate && info.st.t > 2 && !crates) { crates = true; await tap(toPage(info.crate.x / info.K - info.w.x / info.K, info.crate.y / info.K - info.w.y / info.K)); }
    const inRange = info.zs.map((z) => ({ ...z, d: Math.hypot(Math.max(info.sh.x - z.x, 0, z.x - (info.sh.x + info.sh.w)), Math.max(info.sh.y - z.y, 0, z.y - (info.sh.y + info.sh.h))) })).filter((z) => z.d <= 170).sort((a, b) => a.hp - b.hp || a.d - b.d);
    if (inRange.length) { await tap(toPage(inRange[0].x, inRange[0].y)); shots++; await page.waitForTimeout(850); } else await page.waitForTimeout(250);
  }
  return { shots, ms: Date.now() - t0 };
}

test("map: five locations, only mission 1 unlocked, identities shown, no overflow at 360/390/820", async () => {
  for (const w of [360, 390, 820, 1366]) {
    const { ctx, page, errs } = await open(w, 800);
    assert.equal(await page.locator(".zg-loc-card").count(), 5);
    assert.equal(await page.locator(".zg-ms:not([disabled])").count(), 1);
    assert.equal(await page.locator(".zg-ms").count(), 15);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "overflow at " + w);
    assert.deepEqual(errs, []); await ctx.close();
  }
});
test("mission screen: HUD, legend with behaviours, objectives, tabs; no overflow at 360/390/430/820", async () => {
  for (const w of [360, 390, 430, 820, 1366]) {
    const { ctx, page, errs } = await open(w, 800, { m: 1 });
    await page.waitForSelector("#zbStage iframe");
    assert.equal(await page.locator("#zbAmmo").innerText(), "6");
    assert.match(await page.locator("#zbDawn").innerText(), /45/);
    assert.ok((await page.locator("#zbLegend li").count()) >= 2);
    assert.ok((await page.locator("#zbObj li").count()) >= 2);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "overflow at " + w);
    assert.deepEqual(errs, []); await ctx.close();
  }
});
test("preview reacts to code: starter leaves the lane open, edited CSS moves the barricades onto the lane", async () => {
  const { ctx, page } = await open(1000, 800, { m: 1 });
  await page.waitForSelector("#zbStage iframe"); await page.waitForTimeout(800);
  const top = async () => frameOf(page).evaluate(() => [...document.querySelectorAll(".barricade")].map((e) => Math.round(e.getBoundingClientRect().top / (document.getElementById("world").getBoundingClientRect().width / 600))));
  const before = await top(); assert.ok(before.every((y) => y < 120), "starter stacks at the top " + before);
  await setCode(page, "css", MISSIONS[0].solution.css); await page.waitForTimeout(1500);
  const after = await top(); assert.ok(after[0] >= 90 && after[1] <= 215, "solution centred " + after); await ctx.close();
});
test("REAL PLAY mission 1: build with code, shoot with the mouse, hold until dawn, win, points + stars saved", { timeout: 150000 }, async () => {
  const { ctx, page, errs } = await open(1100, 900, { m: 1 });
  await page.waitForSelector("#zbStage iframe", { state: "attached", timeout: 8000 }).catch(async (e) => { console.log("DBG", m.id, i, page.url(), await page.locator("#zbPlay").isVisible(), await page.locator("#zbStage").innerHTML().then((h) => h.slice(0, 200))); throw e; }); await applySolution(page, MISSIONS[0]); await page.waitForTimeout(900);
  await page.click("#zbStart"); await page.waitForTimeout(1500);
  assert.ok(await page.locator("#zbStart").isDisabled(), "start disabled while running");
  const r = await playByMouse(page, MISSIONS[0]);
  assert.ok(r.shots >= 2, "player shot zombies: " + r.shots);
  await page.waitForSelector("#zbResult:not([hidden])"); assert.equal(await page.locator("#zbResult").getAttribute("data-win"), "1");
  assert.ok((await page.locator("#zbStars i.on").count()) >= 1);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-game-v1"))); assert.ok(stored.games.zombie.solved[1]);
  assert.ok(await page.locator("#zbNext").isVisible()); assert.deepEqual(errs, []);
  await page.click("#zbNext"); assert.match(await page.locator("#zbLocName").innerText(), /2\/15/); await ctx.close();
});
test("REAL PLAY failure: starter code loses, the overlay explains why, retry starts a new wave", { timeout: 150000 }, async () => {
  const { ctx, page } = await open(1100, 900, { m: 1 });
  await page.waitForSelector("#zbStage iframe"); await page.click("#zbStart");
  await page.waitForSelector("#zbResult:not([hidden])", { timeout: 100000 });
  assert.equal(await page.locator("#zbResult").getAttribute("data-win"), "0");
  const why = await page.locator("#zbResWhy").innerText(); assert.ok(why.length > 40, why);
  assert.ok(!(await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-game-v1") || "{}").games?.zombie?.solved?.[1])));
  await page.click("#zbRetry"); await page.waitForTimeout(2500);
  assert.ok(await page.locator("#zbStart").isDisabled(), "a new wave is running"); assert.ok(await page.locator("#zbResult").isHidden()); await ctx.close();
});
test("English UI has no Arabic in the HUD, legend, objectives and briefing", async () => {
  const { ctx, page } = await open(1100, 800, { lang: "en", m: 1 }); await page.waitForSelector("#zbStage iframe");
  for (const sel of ["#zbHud", "#zbLegend", "#zbObj", "#zbBrief", ".zg-controls"]) { const tx = await page.locator(sel).innerText(); assert.ok(!/[؀-ۿ]/.test(tx), sel + ": " + tx); } await ctx.close();
});
test("REAL PLAY on a phone (touch taps) at 390px: mission 1 won", { timeout: 150000 }, async () => {
  const { ctx, page, errs } = await open(390, 844, { m: 1, touch: true });
  await page.waitForSelector("#zbStage iframe", { state: "attached", timeout: 8000 }).catch(async (e) => { console.log("DBG", m.id, i, page.url(), await page.locator("#zbPlay").isVisible(), await page.locator("#zbStage").innerHTML().then((h) => h.slice(0, 200))); throw e; }); await applySolution(page, MISSIONS[0]); await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0)); await page.click("#zbStart");
  await page.evaluate(() => document.querySelector("#zbStage").scrollIntoView({ block: "center" }));
  await playByMouse(page, MISSIONS[0], { touch: true });
  await page.waitForSelector("#zbResult:not([hidden])"); assert.equal(await page.locator("#zbResult").getAttribute("data-win"), "1"); assert.deepEqual(errs, []); await ctx.close();
});
// every mission played through the real page with real mouse input (set ZB_ALL=1; ~5 min, parallel)
test("EVERY mission can be won by actually playing it in the browser", { timeout: 900000, skip: process.env.ZB_ALL !== "1" }, async () => {
  const ids = process.env.ZB_ONLY ? process.env.ZB_ONLY.split(",") : MISSIONS.map((m) => m.id), out = {}; let next = 0;
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (next < ids.length) {
      const id = ids[next++], m = MISSIONS.find((x) => x.id === id), i = MISSIONS.indexOf(m);
      const { ctx, page } = await open(process.env.ZB_TOUCH ? 430 : 1100, 900, { m: i + 1, solved: i, touch: !!process.env.ZB_TOUCH });
      await page.waitForSelector("#zbStage iframe", { state: "attached", timeout: 8000 }).catch(async (e) => { console.log("DBG", m.id, i, page.url(), await page.locator("#zbPlay").isVisible(), await page.locator("#zbStage").innerHTML().then((h) => h.slice(0, 200))); throw e; }); await applySolution(page, m); await page.waitForTimeout(1200);
      await page.click("#zbStart"); const r = await playByMouse(page, m, { touch: !!process.env.ZB_TOUCH });
      await page.waitForSelector("#zbResult:not([hidden])", { timeout: 20000 }).catch(() => {});
      if (!(await page.locator("#zbResult").isVisible().catch(() => false))) await page.screenshot({ path: `/tmp/x/fail-${m.id}.png` }).catch(() => {});
      out[m.id] = { win: await page.locator("#zbResult").getAttribute("data-win", { timeout: 3000 }).catch(() => "none"), shots: r.shots, why: await page.locator("#zbResWhy").innerText().catch(() => "") }; await ctx.close();
    }
  }));
  fs.writeFileSync("/tmp/x/zb-ui-all.json", JSON.stringify(out, null, 1));
  assert.deepEqual(Object.entries(out).filter(([, v]) => v.win !== "1").map(([k, v]) => `${k}: ${v.why}`), []);
});
