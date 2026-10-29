// CSS course on the shared engine: sidebar, bilingual content, sandboxed live preview, quiz-gated completion, rollback, English switch.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, track } from "../content/css/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/css-learning/css-learning.html";
const URL_OLD = "/legacy/css-learning/css-learning.html";
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(url = URL_NEW, { lang = "ar", seed = {}, viewport = { width: 1280, height: 900 } } = {}) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript(([l, kv]) => { if (window !== window.top) return; localStorage.setItem("fayad-language", l); if (!sessionStorage.getItem("__s")) { for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); sessionStorage.setItem("__s", "1"); } }, [lang, seed]);
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url);
  if (!url.startsWith("/legacy/")) await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  else await page.waitForSelector("#lessonTitle");
  return { ctx, page, errors };
}
const frameOf = async (page, host) => { await page.waitForSelector(`${host} iframe`); const f = await (await page.$(`${host} iframe`)).contentFrame(); await f.waitForLoadState("load"); return f; };
const solve = async (page, id) => { for (const q of lessons.find((l) => l.id === id).quiz) { await page.click(`#answerOptions button[data-index="${q.correct}"]`); await page.click("#quizNextButton"); } };

test("boots without errors; all 30 lessons in 6 groups; exact Arabic then English content for every lesson", async () => {
  for (const lang of ["ar", "en"]) {
    const { ctx, page, errors } = await open(URL_NEW, { lang });
    assert.equal(await page.locator(".sidebar a.lesson").count(), 30);
    assert.equal(await page.locator(".sidebar .topic-group").count(), 6);
    for (const [i, l] of lessons.entries()) {
      await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
      assert.equal(await page.locator("#lessonTitle").innerText(), l.title[lang], `${lang} title ${i + 1}`);
      assert.equal(await page.locator("#lessonDescription").innerText(), l.description[lang]);
      assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
      assert.equal(await page.locator("#cssEditor, #jsEditor").first().inputValue(), l.example.code);
    }
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});

test("the quiz is bilingual: English mode shows the English question and answers", async () => {
  const { ctx, page } = await open(URL_NEW, { lang: "en" });
  const q = lessons[0].quiz[0];
  assert.equal(await page.locator("#questionTitle").innerText(), q.question.en);
  const texts = await page.locator("#answerOptions button").allInnerTexts();
  assert.deepEqual([...texts].sort(), q.options.map((o) => o.en).sort());
  await ctx.close();
});

test("learner CSS is applied inside the sandboxed preview only (not to the page); the example is rendered in its own sandbox", async () => {
  const { ctx, page } = await open();
  const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.fill("#cssEditor, #jsEditor", "body{background:rgb(255,0,0)} h1{color:rgb(0,128,0)}");
  await page.waitForTimeout(1200);
  const frame = await frameOf(page, "#previewHost");
  await frame.waitForFunction(() => getComputedStyle(document.querySelector("h1")).color === "rgb(0, 128, 0)");
  assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), before);
  await frameOf(page, "#jsResultStage");
  await ctx.close();
});

test("a lesson completes after all 3 questions are answered correctly; the progress mirrors the legacy current-lesson key", async () => {
  const { ctx, page } = await open();
  await solve(page, "css-01");
  await page.waitForFunction(() => (JSON.parse(localStorage.getItem("fayad-progress-v1") || "{}").tracks?.css?.completed || []).length === 1);
  await page.click('.sidebar a.lesson[data-lesson="3"]');
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-css-current-lesson")), "2"); // legacy 0-based format
  await ctx.close();
});

test("an existing learner's saved lesson (legacy key) is resumed", async () => {
  const { ctx, page } = await open(URL_NEW, { seed: { "fayad-css-current-lesson": "6" } });
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[6].title.ar);
  await ctx.close();
});

test("rollback: the frozen legacy page still loads and shares the current-lesson key", async () => {
  const { ctx, page } = await open(URL_OLD, { seed: { "fayad-css-current-lesson": "4" } });
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[4].title.ar);
  const r = await page.evaluate(() => document.querySelector('meta[name="robots"]')?.content);
  assert.match(r, /noindex/);
  await ctx.close();
});

test("?engine=legacy redirects to the legacy copy", async () => {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + URL_NEW + "?engine=legacy"); await page.waitForURL(/\/legacy\/css-learning\//);
  await ctx.close();
});

test("mobile: no horizontal overflow at 320 and 390 and a collapsible lesson list", async () => {
  for (const w of [320, 390]) {
    const { ctx, page } = await open(URL_NEW, { viewport: { width: w, height: 800 } });
    assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= w + 1);
    assert.equal(await page.locator("#sidebarToggle").isVisible(), true);
    await ctx.close();
  }
});
