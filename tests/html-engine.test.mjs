// HTML course on the shared engine: sidebar completeness (30), sandboxed live preview, quiz, progress, rollback, mobile.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons } from "../content/html/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/html-learning/html-learning.html";
const URL_OLD = "/legacy/html-learning/html-learning.html";
const LEG = "fayad-html-progress";
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(url = URL_NEW, seed = {}, viewport = { width: 1280, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript((kv) => { if (window !== window.top) return; if (!sessionStorage.getItem("__seeded")) { for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); sessionStorage.setItem("__seeded", "1"); } }, seed);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url);
  if (url.startsWith("/legacy/")) await page.waitForFunction(() => document.querySelector("#lesson-title")?.textContent && document.querySelector("#answer-options button"));
  else await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  return { ctx, page, errors };
}
const stored = (page, k) => page.evaluate((key) => localStorage.getItem(key), k);
const dom = (page, h) => page.evaluate((x) => { const d = document.createElement("div"); d.innerHTML = x; return d.innerHTML; }, h);
const link = (n) => `.sidebar a.lesson[data-lesson="${n}"]`;
// quiz helpers: shuffled order, so buttons are found by their original index
const answer = (page, i) => page.click(`#answerOptions button[data-index="${i}"]`);
const solve = async (page, id) => { for (const q of lessons.find((l) => l.id === id).quiz) { await answer(page, q.correct); await page.click("#quizNextButton"); } };

test("boots without console errors; the sidebar lists ALL 30 lessons (legacy listed 22) in 5 groups", async () => {
  const { ctx, page, errors } = await open();
  assert.equal(await page.locator(".sidebar a.lesson").count(), 30);
  assert.equal(await page.locator(".sidebar .topic-group").count(), 5);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("every lesson (incl. the 8 the old sidebar never reached) opens from the sidebar with its exact Arabic content", async () => {
  const { ctx, page } = await open();
  for (const [i, l] of lessons.entries()) {
    await page.click(link(i + 1));
    assert.equal(await page.locator("#lessonTitle").innerText(), l.title.ar, `title ${i + 1}`);
    assert.equal(await page.locator("#lessonDescription").innerText(), l.description.ar);
    assert.equal(await page.locator("#lessonBody").innerHTML(), await dom(page, l.body.ar));
    assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
    assert.equal(await page.locator("#exampleResult").innerHTML(), await dom(page, l.example.result.ar));
    assert.equal(await page.locator("#exampleExplanation").innerHTML(), await dom(page, l.example.explanation.ar));
    assert.equal(await page.locator("#practiceText").textContent(), l.practice.prompt.ar);
    assert.equal(await page.locator("#jsEditor").inputValue(), l.practice.starterCode);
    assert.equal(await page.locator(".sidebar a.lesson.active").getAttribute("data-lesson"), String(i + 1));
  }
  await ctx.close();
});

test("previous/next walk all 30 lessons; deep links work for every lesson", async () => {
  const { ctx, page } = await open();
  for (let i = 1; i < 30; i++) { await page.click("#nextButton"); assert.equal(await page.locator("#lessonTitle").innerText(), lessons[i].title.ar); }
  assert.equal(await page.locator("#nextButton").isDisabled(), true);
  for (const n of [1, 23, 30]) { await page.goto(base + URL_NEW + `#lesson-${n}`); await page.reload(); await page.waitForSelector('html[data-engine="ready"]'); assert.equal(await page.locator("#lessonTitle").innerText(), lessons[n - 1].title.ar); }
  await ctx.close();
});

test("quiz: 3 questions with shuffled options that stay correct, wrong answers can be retried, lesson completes after the third", async () => {
  const { ctx, page } = await open();
  const q = lessons[0].quiz[0], wrong = (q.correct + 1) % q.options.length;
  const texts = await page.locator("#answerOptions button").allTextContents();
  assert.deepEqual([...texts].sort(), q.options.map((o) => o.ar).sort());
  await answer(page, wrong);
  assert.match(await page.locator("#answerFeedback").innerText(), /غير صحيحة/);
  assert.equal(await page.locator("#quizNextButton").isDisabled(), true);
  assert.equal(await stored(page, LEG), null);
  await solve(page, "html-01");
  assert.equal(await stored(page, LEG), "[1]");
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.html.completed, ["html-01"]);
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[1].title.ar);
  assert.equal(await page.locator("#progressText").innerText(), "3%");
  await ctx.close();
});

test("legacy progress (1-based list) is imported once and never duplicated", async () => {
  const { ctx, page } = await open(URL_NEW, { [LEG]: "[1,2,2,23,99]" });
  for (const n of [1, 2, 23]) assert.equal(await page.locator(`${link(n)} .lesson-status`).innerText(), "✓", `lesson ${n}`);
  assert.equal(await page.locator("#progressText").innerText(), "10%");
  await page.reload(); await page.waitForSelector('html[data-engine="ready"]');
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.html.completed, ["html-01", "html-02", "html-23"]);
  await ctx.close();
});

test("live preview runs in the sandbox: renders the learner's HTML, scripts cannot touch the page, no allow-same-origin", async () => {
  const { ctx, page } = await open(URL_NEW, { "fayad-supabase-auth": "SECRET-SESSION" });
  const frame = page.locator("#previewHost iframe");
  await frame.waitFor();
  assert.equal(await frame.getAttribute("sandbox"), "allow-scripts");
  await page.fill("#jsEditor", "<h1 id=x>مرحبا</h1>");
  await page.waitForFunction(() => document.querySelector("#previewHost iframe")?.contentDocument === null || true);
  await page.click("#runButton");
  assert.equal(await page.frameLocator("#previewHost iframe").locator("#x").innerText(), "مرحبا");
  // a script in the learner's HTML cannot read the site's storage / parent
  await page.fill("#jsEditor", `<p id=r></p><script>var o=[];try{o.push(localStorage.getItem('fayad-supabase-auth'))}catch(e){o.push('BLOCKED')}try{o.push(parent.document.title)}catch(e){o.push('BLOCKED')}document.getElementById('r').textContent=o.join('|')</script>`);
  await page.click("#runButton");
  const out = await page.frameLocator("#previewHost iframe").locator("#r").innerText();
  assert.equal(out, "BLOCKED|BLOCKED");
  assert.ok(!(await page.evaluate(() => localStorage.getItem("hacked"))));
  await ctx.close();
});

test("a runaway loop in the preview is stopped and the page stays responsive", async () => {
  const { ctx, page } = await open();
  await page.fill("#jsEditor", "<script>while(true){}</script>"); await page.click("#runButton");
  await page.waitForFunction(() => !document.querySelector("#outputWrap").hidden, null, { timeout: 8000 });
  assert.match(await page.locator("#output").innerText(), /loop ran too many times/);
  assert.equal(await page.evaluate(() => 1 + 1), 2);
  await ctx.close();
});

test("a runaway loop in an inline event handler is stopped too", async () => {
  const { ctx, page } = await open();
  await page.fill("#jsEditor", `<button id=b onclick="for(;;){}">x</button>`); await page.click("#runButton");
  await page.frameLocator("#previewHost iframe").locator("#b").click();
  await page.waitForFunction(() => !document.querySelector("#outputWrap").hidden, null, { timeout: 8000 });
  assert.match(await page.locator("#output").innerText(), /loop ran too many times/);
  await ctx.close();
});

test("reset restores the starter code; the old unsandboxed preview is gone", async () => {
  const { ctx, page } = await open();
  await page.fill("#jsEditor", "x"); await page.click("#resetButton");
  assert.equal(await page.locator("#jsEditor").inputValue(), lessons[0].practice.starterCode);
  assert.ok(!fs.existsSync("html-learning/html-learning.js"));
  assert.ok(!/<iframe(?![^>]*sandbox)/.test(fs.readFileSync("html-learning/html-learning.html", "utf8")));
  await ctx.close();
});

test("ROLLBACK: ?engine=legacy opens the previous page; progress is shared in both directions", async () => {
  const { ctx, page } = await open();
  await solve(page, "html-01");
  await page.goto(base + URL_NEW + "?engine=legacy");
  await page.waitForURL(/\/legacy\/html-learning\//);
  await page.waitForSelector(".sidebar .lesson-status.completed");
  assert.equal(await page.locator("#progress-text").innerText(), "3%");
  assert.ok(await page.locator('meta[name="robots"][content="noindex"]').count());
  await page.evaluate((k) => localStorage.setItem(k, JSON.stringify([1, 2])), LEG); // legacy completes lesson 2
  await page.goto(base + URL_NEW); await page.waitForSelector('html[data-engine="ready"]');
  for (const n of [1, 2]) assert.equal(await page.locator(`${link(n)} .lesson-status`).innerText(), "✓");
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.html.completed, ["html-01", "html-02"]);
  await ctx.close();
});

test("English interface: switching the language changes the chrome (not just direction) and keeps the Arabic lesson", async () => {
  const { ctx, page } = await open();
  await page.evaluate(() => window.FAYAD.prefs.setLang("en"));
  assert.equal(await page.evaluate(() => document.documentElement.dir), "ltr");
  assert.equal(await page.locator("#quizNextButton").innerText(), "Next question");
  assert.equal(await page.locator("#runButton").innerText(), "Run code");
  assert.equal(await page.locator("#pathTitle").innerText(), "HTML learning path");
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[0].title.ar); // no English lesson content yet: falls back to Arabic
  await page.evaluate(() => window.FAYAD.prefs.setLang("ar"));
  assert.equal(await page.locator("#runButton").innerText(), "تشغيل الكود");
  await ctx.close();
});

test("mobile 390px: no overflow; the lesson list is a collapsible panel that reaches lesson 30", async () => {
  const { ctx, page, errors } = await open(URL_NEW, {}, { width: 390, height: 800 });
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
  assert.equal(await page.locator("#sidebarGroups").isVisible(), false);
  await page.click("#sidebarToggle");
  assert.equal(await page.locator("#sidebarToggle").getAttribute("aria-expanded"), "true");
  await page.locator(link(30)).scrollIntoViewIfNeeded(); await page.click(link(30));
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[29].title.ar);
  assert.equal(await page.locator("#sidebarGroups").isVisible(), false); // closes after choosing
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
  assert.deepEqual(errors, []);
  await ctx.close();
});
