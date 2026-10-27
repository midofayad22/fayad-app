// Milestone 4c: JavaScript course on the shared engine, in a real browser. Includes rollback to the legacy page.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons } from "../content/js/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/javascript-learning/javascript-learning.html";
const URL_OLD = "/legacy/javascript-learning/javascript-learning.html";
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(url = URL_NEW, seed = {}, viewport = { width: 1280, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript((kv) => { if (window !== window.top) return; /* only the course page, not the sandboxed stage */ if (!sessionStorage.getItem("__seeded")) { for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); sessionStorage.setItem("__seeded", "1"); } }, seed);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready" || (location.pathname.includes("/legacy/") && document.querySelector("#lessonTitle")?.textContent));
  return { ctx, page, errors };
}
const settle = (page) => page.waitForFunction(() => !document.querySelector("#output").textContent.includes("جاري التشغيل"), null, { timeout: 8000 });
const solveLesson = async (page) => { for (let i = 0; i < 3; i++) { const idx = await page.evaluate(() => FAYAD.course.state.questionData.correct); await page.click(`#answerOptions button[data-index="${idx}"]`); await page.click("#quizNextButton"); } };
const stored = (page, k) => page.evaluate((key) => localStorage.getItem(key), k);

test("boots without console errors; sidebar is built from data and lists every lesson", async () => {
  const { ctx, page, errors } = await open();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.engine), "ready");
  assert.equal(await page.locator(".sidebar a.lesson").count(), lessons.length);
  assert.equal(await page.locator(".sidebar .topic-group").count(), 6);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("every lesson opens from the sidebar with its exact Arabic title, description and example code", async () => {
  const { ctx, page } = await open();
  for (const [i, l] of lessons.entries()) {
    await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
    assert.equal(await page.locator("#lessonTitle").innerText(), l.title.ar, `title ${i + 1}`);
    assert.equal(await page.locator("#lessonDescription").innerText(), l.description.ar);
    assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
    assert.equal(await page.locator("#jsEditor").inputValue(), l.example.code);
    assert.equal(await page.locator(".sidebar a.lesson.active").getAttribute("data-lesson"), String(i + 1));
  }
  await ctx.close();
});

test("previous/next walk all lessons in order; boundaries are disabled", async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator("#previousButton").isDisabled(), true);
  for (let i = 1; i < lessons.length; i++) { await page.click("#nextButton"); assert.equal(await page.locator("#lessonTitle").innerText(), lessons[i].title.ar); }
  assert.equal(await page.locator("#nextButton").isDisabled(), true);
  await page.click("#previousButton");
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[lessons.length - 2].title.ar);
  await ctx.close();
});

test("legacy sections: lesson 1 shows its two articles; other lessons no longer show lesson-1 text", async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator(".content-card").count(), 2);
  await page.click('.sidebar a.lesson[data-lesson="7"]');
  assert.equal(await page.locator(".content-card").count(), 0);
  await ctx.close();
});

test("opening a lesson never completes it; completion needs 3 correct answers, then mirrors legacy + v1 storage", async () => {
  const { ctx, page } = await open();
  await page.click('.sidebar a.lesson[data-lesson="1"]');
  assert.equal(await stored(page, "fayad-js-completed-lessons"), null);
  const correct = await page.evaluate(() => FAYAD.course.state.questionData.correct);
  const wrong = (correct + 1) % 3;
  await page.click(`#answerOptions button[data-index="${wrong}"]`);
  assert.match(await page.locator("#answerFeedback").innerText(), /غير صحيحة/);
  assert.equal(await page.locator("#quizNextButton").isDisabled(), true);
  assert.ok(await page.locator(`#answerOptions button[data-index="${wrong}"]`).evaluate((b) => b.classList.contains("wrong")));
  await solveLesson(page);
  assert.equal(await stored(page, "fayad-js-completed-lessons"), "[0]");
  const v1 = JSON.parse(await stored(page, "fayad-progress-v1"));
  assert.deepEqual(v1.tracks.js.completed, ["js-01"]);
  assert.equal(v1.tracks.js.quiz["js-01"].attempts, 4);
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[1].title.ar); // moved to the next lesson
  assert.equal(await page.locator('.sidebar a.lesson[data-lesson="1"] .lesson-status').innerText(), "✓");
  assert.equal(await page.locator("#progressText").innerText(), "4%");
  await ctx.close();
});

test("legacy progress is imported on first load (completed lessons, resume position, percentage)", async () => {
  const { ctx, page } = await open(URL_NEW, { "fayad-js-completed-lessons": "[0,1,2]", "fayad-js-current-lesson": "3" });
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[3].title.ar);
  for (const n of [1, 2, 3]) assert.equal(await page.locator(`.sidebar a.lesson[data-lesson="${n}"] .lesson-status`).innerText(), "✓");
  assert.equal(await page.locator("#progressText").innerText(), "12%");
  await ctx.close();
});

test("deep link #lesson-9 opens lesson 9 (the legacy page ignored it)", async () => {
  const { ctx, page } = await open(URL_NEW + "#lesson-9");
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[8].title.ar);
  await page.click('.sidebar a.lesson[data-lesson="2"]');
  assert.equal(await page.evaluate(() => location.hash), "#lesson-2");
  await ctx.close();
});

test("keyboard: in RTL ArrowLeft goes to the previous lesson and ArrowRight to the next", async () => {
  const { ctx, page } = await open();
  await page.click("body", { position: { x: 5, y: 5 } });
  await page.keyboard.press("ArrowRight"); assert.equal(await page.locator("#lessonTitle").innerText(), lessons[1].title.ar);
  await page.keyboard.press("ArrowLeft"); assert.equal(await page.locator("#lessonTitle").innerText(), lessons[0].title.ar);
  await ctx.close();
});

test("learner code runs in the sandbox: output, DOM stage, console, errors", async () => {
  const { ctx, page } = await open();
  await settle(page);
  assert.equal(await page.locator("#output").innerText(), "تم تشغيل الكود بنجاح.");
  const frame = page.locator("#jsResultStage iframe");
  assert.equal(await frame.getAttribute("sandbox"), "allow-scripts");
  await page.fill("#jsEditor", 'console.log("a"); console.log({x:1});'); await page.click("#runButton"); await settle(page);
  assert.equal(await page.locator("#output").innerText(), 'a\n{x: 1}');
  await page.fill("#jsEditor", 'document.getElementById("jsResult").textContent = "نتيجة";'); await page.click("#runButton"); await settle(page);
  assert.equal(await page.locator("#output").innerText(), "نتيجة");
  assert.equal(await page.frameLocator("#jsResultStage iframe").locator("#jsResult").innerText(), "نتيجة");
  await page.fill("#jsEditor", "null.x"); await page.click("#runButton"); await settle(page);
  assert.match(await page.locator("#output").innerText(), /^خطأ: .*(TypeError|null)/);
  await ctx.close();
});

test("lesson 18 (events): the sandbox stage button really triggers the learner's listener", async () => {
  const { ctx, page } = await open();
  await page.click('.sidebar a.lesson[data-lesson="18"]'); await settle(page);
  const f = page.frameLocator("#jsResultStage iframe");
  await f.locator("#demoButton").click();
  assert.equal(await f.locator("#jsResult").innerText(), "تم الضغط على الزر");
  await ctx.close();
});

test("lessons 15-17 (DOM) work against the sandbox stage exactly as the legacy page did", async () => {
  const { ctx, page } = await open();
  for (const [n, expect] of [[15, lessons[14].title.ar], [16, lessons[15].title.ar], [17, "مرحبًا من JavaScript"]]) {
    await page.click(`.sidebar a.lesson[data-lesson="${n}"]`); await settle(page);
    assert.equal(await page.locator("#output").innerText(), expect, `lesson ${n}`);
  }
  await ctx.close();
});

test("SECURITY: learner code cannot read progress/session storage, cookies or the page; infinite loops are stopped", async () => {
  const { ctx, page } = await open(URL_NEW, { "fayad-supabase-auth": "SECRET-SESSION" });
  await page.evaluate(() => { document.cookie = "sid=SECRET-COOKIE"; });
  const code = `const p=(n,f)=>{try{console.log(n+':LEAK:'+f())}catch(e){console.log(n+':BLOCKED')}};
p('ls',()=>localStorage.getItem('fayad-supabase-auth'));p('ss',()=>sessionStorage.length);p('cookie',()=>document.cookie);p('parent',()=>parent.document.title);p('top',()=>top.FAYAD);`;
  await page.fill("#jsEditor", code); await page.click("#runButton"); await settle(page);
  const out = await page.locator("#output").innerText();
  assert.ok(!/LEAK|SECRET/.test(out), out);
  assert.equal((out.match(/BLOCKED/g) || []).length, 5, out);
  await page.fill("#jsEditor", "while(true){}"); await page.click("#runButton"); await settle(page);
  assert.match(await page.locator("#output").innerText(), /loop ran too many times/);
  assert.equal(await page.evaluate(() => 1 + 1), 2);
  await ctx.close();
});

test("no course path uses eval / new Function, the engine page loads no legacy script, and nothing falls back silently", async () => {
  const html = fs.readFileSync("javascript-learning/javascript-learning.html", "utf8");
  assert.ok(!/javascript-learning\.js/.test(html));
  assert.ok(!fs.existsSync("javascript-learning/javascript-learning.js"));
  for (const f of ["boot.js", "course-view.js", "state.js", "progress.js", "schema.js"]) {
    const src = fs.readFileSync("js/engine/" + f, "utf8");
    assert.ok(!/\beval\s*\(|new Function\s*\(|document\.write|\.srcdoc\s*=/.test(src), f);
  }
  const run = fs.readFileSync("js/playground/playground.js", "utf8");
  assert.ok(!/allow-same-origin/.test(run.replace(/never[^\n]*allow-same-origin[^\n]*/gi, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "")), "runner must never grant allow-same-origin");
});

test("ROLLBACK: ?engine=legacy opens the previous implementation, which sees progress made in the new engine, and vice versa", async () => {
  const { ctx, page } = await open();
  await solveLesson(page); // complete lesson 1 in the new engine
  await page.goto(base + URL_NEW + "?engine=legacy#lesson-1");
  await page.waitForURL(/\/legacy\/javascript-learning\//);
  await page.waitForSelector(".lesson-status.completed");
  assert.equal(await page.locator('.lesson[data-lesson="1"] .lesson-status').innerText(), "✓");
  assert.equal(await page.locator("#progressText").innerText(), "4%");
  assert.ok(await page.locator('meta[name="robots"][content="noindex"]').count());
  // legacy completes lesson 2 (three correct answers through its own quiz) ...
  await page.click('.lesson[data-lesson="2"]');
  for (let i = 0; i < 3; i++) { const idx = await page.evaluate(() => lessons[currentLesson].questions[currentQuestion].correct); await page.click(`#answerOptions button[data-index="${idx}"]`); await page.click("#quizNextButton"); }
  assert.equal(await stored(page, "fayad-js-completed-lessons"), "[0,1]");
  // ... and the new engine (roll forward) shows both and keeps its own v1 data
  await page.goto(base + URL_NEW);
  await page.waitForSelector('html[data-engine="ready"]');
  for (const n of [1, 2]) assert.equal(await page.locator(`.sidebar a.lesson[data-lesson="${n}"] .lesson-status`).innerText(), "✓");
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.js.completed, ["js-01", "js-02"]);
  await ctx.close();
});

test("mobile 390px: no horizontal overflow and the sandbox stage fits", async () => {
  const { ctx, page } = await open(URL_NEW, {}, { width: 390, height: 800 });
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
  const box = await page.locator("#jsResultStage iframe").boundingBox();
  assert.ok(box.width <= 390);
  await ctx.close();
});

test("the legacy rollback page is not indexable and not linked from the sitemap", async () => {
  assert.match(fs.readFileSync("robots.txt", "utf8"), /Disallow: \/legacy\//);
  assert.ok(!/legacy/.test(fs.readFileSync("sitemap.xml", "utf8")));
});
