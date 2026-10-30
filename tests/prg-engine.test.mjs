// Milestone 4d: Programming Fundamentals on the shared engine, in a real browser. Includes execution parity with the legacy page and rollback.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, track } from "../content/prg/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/fundamentals/programming-basics/prg.html";
const URL_OLD = "/legacy/programming-basics/prg.html";
const LEG = "fayad-programming-fundamentals-progress";
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
  if (url.startsWith("/legacy/")) await page.waitForFunction(() => document.querySelectorAll(".lesson-item").length === 21 && document.querySelector("#lesson-title")?.textContent);
  else await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  return { ctx, page, errors };
}
const stored = (page, k) => page.evaluate((key) => localStorage.getItem(key), k);
const settle = (page) => page.waitForFunction(() => !document.querySelector("#console-output").textContent.includes("جاري تشغيل"), null, { timeout: 8000 });
const runCode = async (page, code) => { await page.fill("#code-editor", code); await page.click("#run-code-btn"); await settle(page); return page.locator("#console-output").innerText(); };
const item = (n) => `.lesson-item[data-lesson="${n}"]`;

test("boots without console errors; the sidebar is built from data: 20 lessons + the final assessment", async () => {
  const { ctx, page, errors } = await open();
  assert.equal(await page.locator(".lesson-item").count(), 21);
  assert.equal(await page.locator(".lesson-item.final-item").count(), 1);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("every lesson opens from the sidebar with its exact Arabic content", async () => {
  const { ctx, page } = await open();
  for (const [i, l] of lessons.entries()) {
    await page.click(item(i + 1));
    assert.equal(await page.locator("#lesson-title").innerText(), l.title.ar, `title ${i + 1}`);
    assert.equal(await page.locator("#lesson-counter").innerText(), `الدرس ${String(i + 1).padStart(2, "0")} من 20`);
    assert.equal(await page.locator("#lesson-heading").innerText(), l.heading.ar);
    assert.equal(await page.locator("#lesson-level").innerText(), l.level.ar);
    assert.equal(await page.locator("#lesson-icon").getAttribute("class"), `fa-solid ${l.icon}`);
    // compare as parsed DOM (the browser serialises "&&" as "&amp;&amp;"), i.e. exactly what the legacy innerHTML assignment produced
    assert.equal(await page.locator("#lesson-content").innerHTML(), await page.evaluate((h) => { const d = document.createElement("div"); d.innerHTML = h; return d.innerHTML; }, l.body.ar));
    assert.equal(await page.locator("#key-description").textContent(), l.key.ar);
    assert.equal(await page.locator("#example-code").textContent(), l.example.code);
    assert.equal(await page.locator("#code-editor").inputValue(), l.example.code);
    assert.equal(await page.locator("#challenge-text").textContent(), l.challenge.ar);
    assert.equal(await page.locator("#quiz-question").textContent(), l.quiz[0].question.ar);
    assert.deepEqual(await page.locator("#quiz-options button").allTextContents(), l.quiz[0].options.map((o) => o.ar));
    assert.equal(await page.locator(".lesson-item.active").getAttribute("data-lesson"), String(i + 1));
    assert.equal(await page.locator(`${item(i + 1)} span`).nth(1).innerText(), (l.navTitle ?? l.title).ar);
  }
  await ctx.close();
});

test("previous/next walk all lessons in order; the last lesson leads to the final assessment", async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator("#prev-btn").isDisabled(), true);
  for (let i = 1; i < lessons.length; i++) { await page.click("#next-btn"); assert.equal(await page.locator("#lesson-title").innerText(), lessons[i].title.ar); }
  assert.match(await page.locator("#next-btn").innerText(), /الاختبار النهائي/);
  await page.click("#next-btn");
  assert.equal(await page.locator("#final-quiz-modal").evaluate((m) => m.classList.contains("hidden")), false);
  await ctx.close();
});

test("deep links: #lesson-7 opens lesson 7, #final opens the assessment, bad hashes fall back to lesson 1, the hash follows navigation", async () => {
  let { ctx, page } = await open(URL_NEW + "#lesson-7");
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[6].title.ar);
  await page.click(item(3)); assert.equal(await page.evaluate(() => location.hash), "#lesson-3");
  await page.reload(); await page.waitForSelector('html[data-engine="ready"]');
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[2].title.ar);
  await ctx.close();
  ({ ctx, page } = await open(URL_NEW + "#final"));
  assert.equal(await page.locator("#final-quiz-modal").evaluate((m) => m.classList.contains("hidden")), false);
  await ctx.close();
  for (const bad of ["#lesson-0", "#lesson-21", "#lesson-x", "#nonsense"]) {
    ({ ctx, page } = await open(URL_NEW + bad));
    assert.equal(await page.locator("#lesson-title").innerText(), lessons[0].title.ar, bad);
    await ctx.close();
  }
});

test("quiz feedback: one attempt, wrong answer reveals the right one, nothing completes the lesson, attempts reach v1", async () => {
  const { ctx, page } = await open();
  const q = lessons[0].quiz[0], wrong = (q.correct + 1) % q.options.length;
  await page.click(`#quiz-options button:nth-child(${wrong + 1})`);
  assert.equal(await page.locator("#quiz-result").innerText(), "✕ ليست الإجابة الصحيحة. راجع الفكرة وحاول مرة أخرى.");
  assert.ok(await page.locator("#quiz-result").evaluate((e) => e.classList.contains("error")));
  assert.ok(await page.locator(`#quiz-options button:nth-child(${wrong + 1})`).evaluate((b) => b.classList.contains("wrong")));
  assert.ok(await page.locator(`#quiz-options button:nth-child(${q.correct + 1})`).evaluate((b) => b.classList.contains("correct")));
  await page.click(`#quiz-options button:nth-child(${q.correct + 1})`); // locked after the first answer
  assert.match(await page.locator("#quiz-result").innerText(), /ليست الإجابة/);
  assert.equal(await page.locator("#lesson-status").innerText(), "غير مكتمل");
  assert.equal(await stored(page, LEG), null);
  const v1 = JSON.parse(await stored(page, "fayad-progress-v1"));
  assert.equal(v1.tracks.prg.quiz["prg-01"].attempts, 1);
  assert.deepEqual(v1.tracks.prg.quiz["prg-01"].passed, []);
  assert.deepEqual(v1.tracks.prg.completed, []);
  await page.click(item(2)); await page.click(item(1)); // a fresh attempt next time the lesson is opened
  await page.click(`#quiz-options button:nth-child(${q.correct + 1})`);
  assert.equal(await page.locator("#quiz-result").innerText(), "✓ إجابة صحيحة! أحسنت.");
  assert.ok(await page.locator("#quiz-result").evaluate((e) => e.classList.contains("success")));
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.prg.quiz["prg-01"].passed, [0]);
  await ctx.close();
});

test("completion is manual: the button completes, stores v1 + the legacy 1-based list, updates progress, survives reload", async () => {
  const { ctx, page } = await open();
  await page.click(item(1)); await page.click(item(2));
  assert.equal(await stored(page, LEG), null); // opening never completes
  await page.click("#complete-btn");
  assert.equal(await page.locator("#lesson-status").innerText(), "✓ مكتمل");
  assert.equal(await stored(page, LEG), "[2]");
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.prg.completed, ["prg-02"]);
  assert.equal(await page.locator("#progress-percent").innerText(), "5%");
  assert.equal(await page.locator("#progress-text").innerText(), "أكملت 1 من 20 دروس");
  assert.ok(await page.locator(item(2)).evaluate((b) => b.classList.contains("completed")));
  await page.click("#complete-btn"); // idempotent
  assert.equal(await stored(page, LEG), "[2]");
  await page.reload(); await page.waitForSelector('html[data-engine="ready"]');
  assert.ok(await page.locator(item(2)).evaluate((b) => b.classList.contains("completed")));
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[1].title.ar); // resumes where the learner was
  await ctx.close();
});

test("legacy progress (1-based list) is imported on first load and the page opened twice does not duplicate it", async () => {
  const { ctx, page } = await open(URL_NEW, { [LEG]: "[1,3,3,99,\"final\"]" });
  for (const n of [1, 3]) assert.ok(await page.locator(item(n)).evaluate((b) => b.classList.contains("completed")), `lesson ${n}`);
  assert.ok(!(await page.locator(item(2)).evaluate((b) => b.classList.contains("completed"))));
  assert.equal(await page.locator("#progress-percent").innerText(), "10%");
  await page.reload(); await page.waitForSelector('html[data-engine="ready"]');
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.prg.completed, ["prg-01", "prg-03"]);
  await page.click(item(2)); await page.click("#complete-btn");
  assert.equal(await stored(page, LEG), "[1,2,3]");
  await ctx.close();
});

test("code execution: console output, objects as JSON, no-output message, errors, console.error", async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator("#console-output").innerText(), "نتيجة الكود ستظهر هنا...");
  assert.equal(await runCode(page, 'console.log("a", 1); console.log([1,2]);'), "a 1\n[\n  1,\n  2\n]");
  assert.equal(await runCode(page, "const x = 1;"), "✓ تم تنفيذ الكود بدون Output.");
  assert.equal(await runCode(page, 'console.error("bad")'), "Error: bad");
  assert.match(await runCode(page, "nope.x"), /^✕ ReferenceError: nope is not defined/);
  assert.equal(await runCode(page, "x ="), "✕ SyntaxError: Unexpected end of input");
  assert.equal(await runCode(page, "console.log(1+1)"), "2"); // the value of the last expression is not echoed
  await page.click("#reset-code-btn");
  assert.equal(await page.locator("#code-editor").inputValue(), lessons[0].example.code);
  assert.equal(await page.locator("#console-output").innerText(), "تم إعادة الكود إلى الحالة الأصلية.");
  await ctx.close();
});


test("SECURITY: learner code is sandboxed (opaque origin Worker): no access to storage, cookies, page; infinite loops are stopped", async () => {
  const { ctx, page } = await open(URL_NEW, { "fayad-supabase-auth": "SECRET-SESSION" });
  await page.evaluate(() => { document.cookie = "sid=SECRET-COOKIE"; });
  const code = `const p=(n,f)=>{try{console.log(n+':LEAK:'+f())}catch(e){console.log(n+':BLOCKED')}};
p('ls',()=>localStorage.getItem('fayad-supabase-auth'));p('ss',()=>sessionStorage.length);p('cookie',()=>document.cookie);p('parent',()=>parent.document.title);p('top',()=>top.FAYAD);p('win',()=>window.FAYAD);`;
  const out = await runCode(page, code);
  assert.ok(!/LEAK|SECRET/.test(out), out);
  assert.equal((out.match(/BLOCKED/g) || []).length, 6, out);
  await page.fill("#code-editor", 'localStorage.setItem("hacked","1")'); await page.click("#run-code-btn"); await settle(page);
  assert.equal(await stored(page, "hacked"), null);
  const frame = page.locator("#playground-section iframe");
  assert.equal(await frame.getAttribute("sandbox"), "allow-scripts");
  const t0 = Date.now();
  assert.match(await runCode(page, "while(true){}"), /تم إيقاف التنفيذ/);
  assert.ok(Date.now() - t0 < 6000);
  assert.equal(await page.evaluate(() => 1 + 1), 2); // the page stayed responsive
  await ctx.close();
});

test("no course path uses eval / new Function; the engine page loads no legacy script", async () => {
  const html = fs.readFileSync("fundamentals/programming-basics/prg.html", "utf8");
  assert.ok(!/src="prg\.js"/.test(html));
  assert.ok(!fs.existsSync("fundamentals/programming-basics/prg.js"));
  for (const f of ["boot.js", "foundation-view.js", "progress.js", "schema.js"]) {
    const src = fs.readFileSync("js/engine/" + f, "utf8");
    assert.ok(!/\beval\s*\(|new Function\s*\(|document\.write|\.srcdoc\s*=/.test(src), f);
  }
});

test("final assessment: 8 questions, must pick before continuing, failing completes nothing, reopening works", async () => {
  const { ctx, page } = await open();
  await page.click(".final-item");
  assert.equal(await page.locator("#final-question-area .final-question").innerText(), `1. ${track.assessment.questions[0].question.ar}`);
  await page.click("#final-next-btn"); // nothing selected: stays on question 1
  assert.match(await page.locator("#final-question-area .final-question").innerText(), /^1\./);
  for (let i = 0; i < 8; i++) {
    const q = track.assessment.questions[i];
    assert.deepEqual(await page.locator("#final-question-area .final-option").allTextContents(), q.options.map((o) => o.ar));
    assert.equal(await page.locator("#final-next-btn").innerText(), i === 7 ? "إنهاء الاختبار" : "السؤال التالي");
    await page.click(`#final-question-area .final-option[data-index="${(q.correct + 1) % q.options.length}"]`); // always wrong
    await page.click("#final-next-btn");
  }
  assert.match(await page.locator("#final-question-area").innerText(), /0 \/ 8/);
  assert.match(await page.locator("#final-question-area").innerText(), /لا مشكلة/);
  assert.equal(await stored(page, LEG), null);
  await page.click("#final-next-btn"); // "إغلاق"
  assert.ok(await page.locator("#final-quiz-modal").evaluate((m) => m.classList.contains("hidden")));
  await page.click(".final-item"); // reopening restarts at question 1 and "next" does not also close the dialog
  assert.match(await page.locator("#final-question-area .final-question").innerText(), /^1\./);
  await page.click(`#final-question-area .final-option[data-index="${track.assessment.questions[0].correct}"]`);
  await page.click("#final-next-btn");
  assert.match(await page.locator("#final-question-area .final-question").innerText(), /^2\./);
  assert.equal(await page.locator("#final-quiz-modal").evaluate((m) => m.classList.contains("hidden")), false);
  await page.keyboard.press("Escape");
  assert.ok(await page.locator("#final-quiz-modal").evaluate((m) => m.classList.contains("hidden")));
  await ctx.close();
});

test("final assessment: 5/8 (63%) fails, 6/8 (75%) passes and completes all 20 lessons in v1 and the legacy list", async () => {
  const { ctx, page } = await open();
  const take = async (rightCount) => {
    await page.click(".final-item");
    for (let i = 0; i < 8; i++) {
      const q = track.assessment.questions[i];
      await page.click(`#final-question-area .final-option[data-index="${i < rightCount ? q.correct : (q.correct + 1) % q.options.length}"]`);
      await page.click("#final-next-btn");
    }
    const text = await page.locator("#final-question-area").innerText();
    await page.click("#final-next-btn");
    return text;
  };
  assert.match(await take(5), /5 \/ 8[\s\S]*63%/);
  assert.equal(await stored(page, LEG), null);
  assert.match(await take(6), /6 \/ 8[\s\S]*75%[\s\S]*أداء رائع/);
  assert.equal(await stored(page, LEG), JSON.stringify(Array.from({ length: 20 }, (_, i) => i + 1)));
  assert.equal(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.prg.completed.length, 20);
  assert.equal(await page.locator("#progress-percent").innerText(), "100%");
  assert.equal(await page.locator("#progress-text").innerText(), "أكملت المسار بالكامل! 🎉");
  await ctx.close();
});


test("mobile 390px: no horizontal overflow, no console errors, every lesson reachable", async () => {
  const { ctx, page, errors } = await open(URL_NEW, {}, { width: 390, height: 800 });
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
  await page.locator(item(20)).scrollIntoViewIfNeeded(); await page.click(item(20));
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[19].title.ar);
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
  await page.click(".final-item");
  const box = await page.locator(".final-quiz").boundingBox();
  assert.ok(box.x >= 0 && box.x + box.width <= 391, JSON.stringify(box));
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("the legacy copy is not indexable and not in the sitemap", async () => {
  assert.match(fs.readFileSync("robots.txt", "utf8"), /Disallow: \/legacy\//);
  assert.ok(!/legacy/.test(fs.readFileSync("sitemap.xml", "utf8")));
  assert.match(fs.readFileSync("legacy/programming-basics/prg.html", "utf8"), /name="robots" content="noindex"/);
});
