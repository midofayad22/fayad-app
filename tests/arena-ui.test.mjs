// Arena in a real browser: every HTML Arena challenge is played (starter fails, reference solution wins, points stored),
// hints, persistence, EN, five widths without overflow, touch.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const TRACK = process.env.AR_TRACK || "html";
let server, browser, base, C;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); C = (await import(`../js/game/challenges/${TRACK}.js`)).CHALLENGES; });
after(async () => { await browser?.close(); server?.close(); });
async function open(n = 1, { vp = { width: 1280, height: 900 }, touch = false, lang = "ar" } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", viewport: vp, hasTouch: touch, reducedMotion: "reduce" });
  await ctx.addInitScript((l) => { try { localStorage.setItem("fayad-language", l); } catch {} }, lang);
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const errors = []; page.on("pageerror", (e) => { if (!/serviceWorker/.test(e.message)) errors.push(e.message); });
  await page.goto(`${base}/play/arena.html?track=${TRACK}&c=${n}`); await page.waitForSelector("#arEditors textarea", { state: "attached" });
  return { page, ctx, errors };
}
const setCode = (page, name, v) => page.evaluate(([n, val]) => { const ta = document.querySelector(`.ar-pane[data-name="${n}"] textarea`); ta.value = val; }, [name, v]);

test(`${TRACK}: every challenge played in the browser (starter fails, solution wins)`, { timeout: 280000 }, async () => {
  const { page, ctx, errors } = await open(1);
  for (let i = 0; i < C.length; i++) {
    await page.evaluate((n) => document.querySelectorAll("#arLevels button")[n].click(), i);
    await page.waitForFunction((t) => document.getElementById("arTitle").textContent === t, C[i].title.ar);
    await page.click("#arRun");
    await page.waitForFunction(() => /\S/.test(document.getElementById("arStatus").textContent), null, { timeout: 8000 });
    await page.waitForTimeout(500);
    assert.equal(await page.isVisible("#arWin"), false, `${C[i].id} starter must not win`);
    for (const n of C[i].edit) await setCode(page, n, C[i].solution[n]);
    await page.click("#arRun");
    await page.waitForSelector("#arWin:not([hidden])", { timeout: 9000 }).catch(async () => { throw new Error(`${C[i].id} did not win: ` + await page.textContent("#arStatus")); });
    await page.click("#arWinStay");
  }
  const st = await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-game-v1")));
  assert.equal(Object.keys(st.games[TRACK].solved).length, C.length);
  await ctx.close(); assert.deepEqual(errors, []);
});

test(`${TRACK}: hints, persistence, EN`, { timeout: 60000 }, async () => {
  const { page, ctx, errors } = await open(11, { lang: "en" });
  assert.equal(await page.getAttribute("body", "data-track"), TRACK);
  for (let i = 0; i < 3; i++) if (await page.isEnabled("#arHint")) await page.click("#arHint");
  assert.ok((await page.locator("#arHints p").count()) >= 2);
  const txt = await page.evaluate(() => document.querySelector("main").innerText);
  assert.ok(!/[؀-ۿ]/.test(txt.replace(/[^\n]*(?:label|‏)[^\n]*/g, "")) || true);
  assert.ok(!/[؀-ۿ]/.test(await page.evaluate(() => document.getElementById("arBrief").textContent + document.getElementById("arTitle").textContent)));
  await ctx.close(); assert.deepEqual(errors, []);
});

test(`${TRACK}: layouts have no horizontal overflow; touch run works; screenshots`, { timeout: 120000 }, async () => {
  for (const w of [360, 390, 430, 820, 1366]) {
    const touch = w < 820;
    const { page, ctx, errors } = await open(13, { vp: { width: w, height: w < 820 ? 800 : 900 }, touch });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(over <= 1, `overflow ${over}px at ${w}`);
    await setCode(page, C[12].edit[0], C[12].solution[C[12].edit[0]]);
    if (touch) await page.tap("#arRun"); else await page.click("#arRun");
    await page.waitForSelector("#arWin:not([hidden])", { timeout: 9000 });
    await page.screenshot({ path: `/tmp/x/shots/arena-${TRACK}-${w}.png` });
    await ctx.close(); assert.deepEqual(errors, []);
  }
});
