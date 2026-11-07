import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function lesson(prefs, lang = "ar") {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });
  await ctx.addInitScript(([p, l]) => { localStorage.setItem("fayad-language", l); if (p) localStorage.setItem("fayad-prefs-v1", JSON.stringify(p)); }, [prefs, lang]);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + "/css-learning/css-learning.html#lesson-1");
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready" && document.querySelector("#lessonSections .content-card")); await page.waitForTimeout(400); return { ctx, page };
}
test("sections: expanded = articles; collapsed = details (first open) and toggles; live switch re-renders", async () => {
  let { ctx, page } = await lesson(null);
  assert.equal(await page.locator("#lessonSections details").count(), 0);
  const n = await page.locator("#lessonSections article.content-card").count(); assert.ok(n >= 2);
  await page.evaluate(() => FAYAD.prefs.set({ sections: "collapsed" })); await page.waitForTimeout(200);
  assert.equal(await page.locator("#lessonSections details.content-card").count(), n);
  assert.equal(await page.locator("#lessonSections details[open]").count(), 1);
  await page.locator("#lessonSections summary").nth(1).click();
  assert.equal(await page.locator("#lessonSections details[open]").count(), 2);
  await ctx.close();
});
test("reading density changes real line-height / spacing", async () => {
  const { ctx, page } = await lesson({ reading: "compact" });
  const c = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector(".lesson-content")).lineHeight) / parseFloat(getComputedStyle(document.querySelector(".lesson-content")).fontSize));
  await page.evaluate(() => FAYAD.prefs.set({ reading: "comfortable" }));
  const k = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector(".lesson-content")).lineHeight) / parseFloat(getComputedStyle(document.querySelector(".lesson-content")).fontSize));
  assert.ok(k > c + 0.2, `${c} vs ${k}`); await ctx.close();
});
test("explanation language: English lesson text under an Arabic interface, and back", async () => {
  const { ctx, page } = await lesson({ explainLang: "en" });
  assert.doesNotMatch(await page.locator("#lessonTitle").innerText(), /[؀-ۿ]/);
  assert.equal(await page.locator("#lessonSections").getAttribute("dir"), "ltr");
  assert.equal(await page.evaluate(() => document.documentElement.dir), "rtl");   // interface stays Arabic
  await page.evaluate(() => FAYAD.prefs.set({ explainLang: "auto" })); await page.waitForTimeout(200);
  assert.match(await page.locator("#lessonTitle").innerText(), /[؀-ۿ]/);
  await ctx.close();
});
test("editor size and light editor theme reach the code panels", async () => {
  const { ctx, page } = await lesson({ editorSize: 19, editorTheme: "light" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => { const p = document.querySelector(".editor-panel textarea, .cm-editor") ; const panel = document.querySelector(".editor-panel"); return { fs: getComputedStyle(p).fontSize, bg: getComputedStyle(document.querySelector(".example-card")).backgroundColor }; });
  assert.equal(r.fs, "19px"); assert.match(r.bg, /246, 250, 251/);
  await page.evaluate(() => FAYAD.prefs.set({ editorTheme: "dark" }));
  assert.doesNotMatch(await page.evaluate(() => getComputedStyle(document.querySelector(".example-card")).backgroundColor), /246, 250, 251/);
  await ctx.close();
});
