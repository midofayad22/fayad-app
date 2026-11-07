import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, track } from "../content/prg/index.js";
import { validateTrack } from "../js/engine/schema.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
const DEEP_IDS = ["prg-07", "prg-08", "prg-09", "prg-10", "prg-11"];

async function open(n, lang = "ar") {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { if (!localStorage.getItem("fayad-language")) localStorage.setItem("fayad-language", l); }, lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => { if (!/sandboxed/.test(e.message)) errs.push(e.message); }); // the runner's own hardening probes (serviceWorker/localStorage) are expected
  await page.goto(`${base}/fundamentals/programming-basics/prg.html#lesson-${n}`);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready"); await page.waitForTimeout(300); return { ctx, page, errs };
}
const check = async (page, code) => { await page.fill("#code-editor", code); await page.locator(".fd-ex-actions button").first().click(); await page.waitForFunction(() => /ok|bad/.test(document.querySelector(".fd-ex-status")?.className || ""), null, { timeout: 8000 }); return page.locator(".fd-ex-status").innerText(); };

test("content is valid and every deep lesson has deep reading, 4 quiz questions with explanations, and an exercise", () => {
  assert.deepEqual(validateTrack(track, lessons), []);
  for (const id of DEEP_IDS) {
    const l = lessons.find((x) => x.id === id);
    assert.ok(l.deep.ar.length > 800 && l.deep.en.length > 800, id);
    assert.equal(1 + l.quizMore.length, 4, id);
    for (const q of [l.quiz[0], ...l.quizMore]) assert.ok(q.explain.ar && q.explain.en, id);
    assert.ok(l.exercise.solution && l.exercise.starter.length > 0 && l.exercise.feedback.length >= 2);
  }
});

for (const [i, id] of DEEP_IDS.entries()) {
  const n = 7 + i;
  test(`${id}: quiz shows explanation and moves through 4 questions; exercise rejects the starter and accepts the solution`, async () => {
    const l = lessons.find((x) => x.id === id);
    const { ctx, page, errs } = await open(n, "en");
    for (let k = 0; k < 4; k++) {
      const q = k === 0 ? l.quiz[0] : l.quizMore[k - 1];
      assert.match(await page.locator(".fd-qmeta").innerText(), new RegExp(`Question ${k + 1} of 4`));
      const wrong = (q.correct + 1) % q.options.length;
      await page.locator("#quiz-options .quiz-btn").nth(k === 1 ? wrong : q.correct).click();
      assert.equal(await page.locator("#quiz-options .quiz-btn.correct").count(), 1);
      if (k === 1) assert.equal(await page.locator("#quiz-options .quiz-btn.wrong").count(), 1);
      assert.ok((await page.locator(".fd-explain").innerText()).length > 20);
      if (k < 3) await page.locator(".fd-qnext").click(); else assert.equal(await page.locator(".fd-qnext").count(), 0);
    }
    const startMsg = await check(page, l.exercise.starter); assert.match(startMsg, /^✕/);
    assert.equal(await page.locator(".fd-ex-status.bad").count(), 1);
    assert.match(await check(page, l.exercise.solution), /Well done/);
    await page.getByRole("button", { name: "Show solution" }).click(); assert.ok((await page.locator(".fd-ex-extra pre").innerText()).length > 10);
    await page.getByRole("button", { name: "Hint" }).click(); assert.ok((await page.locator(".fd-ex-extra").innerText()).includes("💡"));
    assert.deepEqual(errs, []);
    await ctx.close();
  });
}

test("English mode shows no Arabic in the upgraded lessons (reading, quiz, exercise UI, editor)", async () => {
  for (const n of [7, 8, 9, 10, 11]) {
    const { ctx, page } = await open(n, "en");
    await page.locator("#quiz-options .quiz-btn").first().click();
    const txt = await page.evaluate(() => document.querySelector(".lesson-area, main")?.innerText + " " + document.querySelector("#code-editor").value + " " + document.querySelector("#example-code").textContent);
    assert.doesNotMatch(txt, /[؀-ۿ]/, `lesson ${n}: ${txt.match(/[؀-ۿ].{0,25}/)}`);
    await ctx.close();
  }
});

test("targeted feedback: wrong values give the lesson-specific message; infinite loop times out cleanly", async () => {
  let { ctx, page } = await open(8, "en");
  assert.match(await check(page, "const price = \"20\";\nconst total = Number(price) * 3;"), /not 40/); await ctx.close();
  ({ ctx, page } = await open(10, "en"));
  assert.match(await check(page, "const score = 72;\nlet result;\nif (score >= 50) { result = \"fail\"; } else { result = \"pass\"; }"), /must be \"pass\"/);
  assert.match(await check(page, "let result = \"pass\";"), /Use an if statement/); await ctx.close();
  ({ ctx, page } = await open(11, "en"));
  assert.match(await check(page, "let sum = 0;\nwhile (true) {}"), /timed out/); await ctx.close();
});

test("Arabic: the same lessons render Arabic feedback and RTL reading", async () => {
  const { ctx, page } = await open(9, "ar");
  assert.match(await check(page, "const n = 14;\nconst isEven = n % 2 === 0;"), /أحسنت/);
  assert.match(await page.locator("#lesson-content").innerText(), /عوامل الحساب/);
  await ctx.close();
});
