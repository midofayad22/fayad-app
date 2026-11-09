// Documentation-style lesson component (Computer Basics OS section), explanation card, signed-in welcome and deep "continue" link.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, base, browser;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser.close(); server.close(); });

async function open(path, { lang = "ar", width = 1280, session = false, extra } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript(([l, s, x]) => {
    localStorage.setItem("fayad-language", l);
    if (s) localStorage.setItem("sb-vsrysitexadvmmikcmfs-auth-token", JSON.stringify({ user: { id: "u1", email: "sara@example.com", user_metadata: { full_name: "Sara Ahmed" } }, expires_at: Math.floor(Date.now() / 1000) + 3600 }));
    for (const [k, v] of Object.entries(x || {})) localStorage.setItem(k, v);
  }, [lang, session, extra]);
  const page = await ctx.newPage(); await page.goto(base + path); await page.waitForTimeout(1200);
  return { ctx, page };
}

for (const lang of ["ar", "en"]) {
  test(`Computer Basics OS lesson renders the doc components (${lang}) with no horizontal overflow at 320px`, async () => {
    const { ctx, page } = await open("/fundamentals/computer-basics/com.html#lesson-22", { lang, width: 320 });
    const r = await page.evaluate(() => ({ objectives: !!document.querySelector(".doc-objectives li"), code: !!document.querySelector(".code-ex pre code"), table: !!document.querySelector(".doc-table"), ex: !!document.querySelector(".doc-exercise"), ovf: document.documentElement.scrollWidth > innerWidth, dir: document.documentElement.dir, lang: document.documentElement.lang }));
    assert.deepEqual([r.objectives, r.code, r.table, r.ex, r.ovf], [true, true, true, true, false]);
    assert.equal(r.dir, lang === "ar" ? "rtl" : "ltr");
    if (lang === "en") assert.ok(!/[؀-ۿ]/.test(await page.locator("#lesson-content").innerText()), "English mode has no Arabic");
    await ctx.close();
  });
}

test("code example: copy button copies the code and exercises reveal their solution", async () => {
  const { ctx, page } = await open("/fundamentals/computer-basics/com.html#lesson-22", { lang: "en" });
  const code = await page.locator(".code-ex code").first().innerText();
  await page.locator(".code-ex-copy").first().click();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), code);
  const ex = page.locator(".doc-exercise").first();
  await ex.locator("summary").click();
  assert.ok(await ex.locator(".doc-solution").isVisible());
  await ctx.close();
});

test("the OS lessons are in the course, the final test is still com-20 and listed last", async () => {
  const { track, lessons } = await import("../content/com/index.js");
  const ids = track.groups.flatMap((g) => g.lessons);
  assert.equal(ids.length, 30); assert.equal(ids.at(-1), "com-20"); assert.equal(new Set(ids).size, 30);
  for (let n = 1; n <= 20; n++) assert.ok(lessons.some((l) => l.id === `com-${String(n).padStart(2, "0")}`), "original ids are preserved");
});

test("explanation card is a framed block with padding, border and an accent edge", async () => {
  const { ctx, page } = await open("/html-learning/html-learning.html#lesson-3", { lang: "ar" });
  const s = await page.evaluate(() => { const c = document.getElementById("explainCard"); const k = getComputedStyle(c); return { hidden: c.hidden, pad: parseFloat(k.paddingTop), border: parseFloat(k.borderTopWidth), radius: parseFloat(k.borderTopLeftRadius), edge: parseFloat(k.borderRightWidth) }; });
  assert.equal(s.hidden, false); assert.ok(s.pad >= 16 && s.border >= 1 && s.radius >= 10); assert.ok(s.edge >= 3, "accent edge sits on the start side (right in RTL)");
  await ctx.close();
});

test("home: signed-out has no welcome; signed-in shows the name and 'continue' links to the exact lesson", async () => {
  const progress = { "fayad-js-current-lesson": "4", "fayad-js-completed-lessons": JSON.stringify(["js-01", "js-02", "js-03", "js-04"]), "fayad-last-track": JSON.stringify({ id: "js" }) };
  let t = await open("/index.html", { lang: "en", extra: progress });
  assert.equal(await t.page.locator("#hmWelcome").isHidden(), true);
  assert.match(await t.page.locator("#heroCta").getAttribute("href"), /javascript-learning\.html#lesson-5$/);
  await t.ctx.close();
  t = await open("/index.html", { lang: "en", session: true, extra: progress });
  assert.equal(await t.page.locator("#hmWelcome").isVisible(), true);
  assert.match(await t.page.locator("#hmWelcomeHi").innerText(), /Sara Ahmed/);
  assert.equal(await t.page.locator("#hmWelcomeAv").innerText(), "S");
  await t.ctx.close();
});
