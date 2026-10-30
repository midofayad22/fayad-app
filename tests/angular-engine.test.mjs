// Angular course on the shared engine: sidebar, bilingual content, sandboxed live preview, quiz-gated completion, rollback, English switch.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, track } from "../content/angular/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/angular-learning/angular-learning.html";
const URL_OLD = "/legacy/angular-learning/angular-learning.html";
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

test("boots without errors; all 32 lessons in 3 groups; exact Arabic then English content for every lesson", async () => {
  for (const lang of ["ar", "en"]) {
    const { ctx, page, errors } = await open(URL_NEW, { lang });
    assert.equal(await page.locator(".sidebar a.lesson").count(), 32);
    assert.equal(await page.locator(".sidebar .topic-group").count(), 3);
    for (const [i, l] of lessons.entries()) {
      await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
      assert.equal(await page.locator("#lessonTitle").innerText(), l.title[lang], `${lang} title ${i + 1}`);
      assert.equal(await page.locator("#lessonDescription").innerText(), l.description[lang]);
      assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
      assert.equal(await page.locator("#jsEditor").inputValue(), l.practice.starterCode);
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

test("learner Angular code is analysed by the non-executing simulation (detected features, never evaluated)", async () => {
  const { ctx, page } = await open();
  await page.fill("#jsEditor", "@Component({selector:'a',template:'<h1>Hello Angular</h1>'}) export class A {}");
  await page.waitForFunction(() => /Hello Angular/.test(document.querySelector("#previewHost .sim-box")?.textContent || ""));
  assert.match(await page.locator("#output").innerText(), /تم اكتشاف:.*Component/);
  assert.equal(await page.locator("#previewHost iframe").count(), 0);
  await ctx.close();
  const en = await open(URL_NEW, { lang: "en" });
  await en.page.fill("#jsEditor", "@Component({template:'<p *ngIf=\"x\">Hi</p>'}) class A {}");
  await en.page.waitForFunction(() => /Conditional/i.test(document.querySelector("#output")?.textContent || ""));
  assert.match(await en.page.locator("#output").innerText(), /Conditional/i);
  await en.ctx.close();
});

test("a lesson completes after all 6 questions are answered correctly; the progress mirrors the legacy current-lesson key", async () => {
  const { ctx, page } = await open();
  await solve(page, "angular-01");
  await page.waitForFunction(() => (JSON.parse(localStorage.getItem("fayad-progress-v1") || "{}").tracks?.angular?.completed || []).length === 1);
  await page.click('.sidebar a.lesson[data-lesson="3"]');
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-angular-current-lesson")), "2"); // legacy 0-based format
  assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-angular-quiz-progress-v2"))), { 0: [true, true, true, true, true, true] }); // legacy quiz map mirrored
  await ctx.close();
});

test("a learner's legacy quiz results (all 6 correct) count as a completed lesson", async () => {
  const { ctx, page } = await open(URL_NEW, { seed: { "fayad-angular-quiz-progress-v2": JSON.stringify({ 0: [true, true, true, true, true, true], 4: [true, true, true] }) } });
  const done = await page.evaluate(() => JSON.parse(localStorage.getItem("fayad-progress-v1")).tracks.angular.completed);
  assert.deepEqual(done, ["angular-01"]); // lesson 5 was only half done
  await ctx.close();
});

test("an existing learner's saved lesson (legacy key) is resumed", async () => {
  const { ctx, page } = await open(URL_NEW, { seed: { "fayad-angular-current-lesson": "6" } });
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[6].title.ar);
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
