// Assessment coverage ratchet: every lesson of the listed tracks has ≥5 valid, explained, unique bilingual questions.
// A track is added to COVERED when its extra questions land; tracks not listed are reported by the last test (never silently ignored).
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";

const COVERED = ["com", "prg", "html", "css", "js", "ajs", "bs", "tw", "react", "vue"];
const ALL = ["com", "prg", "html", "css", "js", "ajs", "bs", "tw", "react", "vue"];
const AR = /[؀-ۿ]/;
const txt = (o) => (typeof o === "string" ? o : o?.en || o?.ar || "");
const qs = (l) => [...(l.quiz || []), ...(l.quizMore || [])];

for (const t of COVERED) test(`${t}: every lesson has ≥5 valid unique questions; new ones carry explanations in both languages`, async () => {
  const { lessons } = await import(`../content/${t}/index.js`);
  for (const l of lessons) {
    const list = qs(l); assert.ok(list.length >= 5, `${l.id}: ${list.length} questions`);
    const seen = new Set();
    for (const q of list) {
      const key = txt(q.question).trim().toLowerCase(); assert.ok(!seen.has(key), `${l.id} duplicate: ${key}`); seen.add(key);
      assert.ok(q.options.length >= 3 && Number.isInteger(q.correct) && q.correct < q.options.length, `${l.id} malformed`);
      if (q.explain) { assert.ok(q.explain.ar && q.explain.en, `${l.id} explain needs ar+en`); assert.ok(!AR.test(q.explain.en), `${l.id} Arabic in EN explain`); assert.ok(!AR.test(q.question.en + q.options.map((o) => o.en).join("")), `${l.id} Arabic in EN question`); }
    }
    assert.ok(list.filter((q) => q.explain).length >= 2, `${l.id}: extra questions should be explained`);
  }
});

test("not-yet-covered tracks are reported explicitly", async () => {
  const gaps = [];
  for (const t of ALL.filter((x) => !COVERED.includes(x))) { const { lessons } = await import(`../content/${t}/index.js`); const short = lessons.filter((l) => qs(l).length < 5).length; if (short) gaps.push(`${t}: ${short}/${lessons.length} lessons below 5`); }
  console.log("QUIZ COVERAGE GAPS →", gaps.length ? gaps.join("; ") : "none");
  assert.ok(true);
});

let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser.close(); server.close(); });
test("html lesson: five questions run to completion and the explanation appears after the right answer", async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, serviceWorkers: "block" });
  await ctx.addInitScript(() => localStorage.setItem("fayad-language", "en")); await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(`${base}/html-learning/html-learning.html#lesson-3`);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  const { lessons } = await import("../content/html/index.js"); const l = lessons[2];
  assert.equal(await page.locator("#quizTotalQuestions").textContent(), "5");
  let explained = 0;
  for (let i = 0; i < 5; i++) {
    const q = l.quiz[i]; await page.locator(`#answerOptions button[data-index="${q.correct}"]`).click();
    if (q.explain) { await page.locator(".answer-explain").waitFor(); assert.equal((await page.locator(".answer-explain").textContent()).trim(), q.explain.en); explained++; }
    if (i < 4) await page.locator("#quizNextButton").click();
  }
  assert.ok(explained >= 2); assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); await ctx.close();
});
