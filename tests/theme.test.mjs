// Milestone 2 tests: theme + language + direction persistence, controls, English content, contrast budget.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { audit, PAGES as AUDIT_PAGES } from "../tools/contrast-audit.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
let server, browser, base;
const offline = (page) => page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());

before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const ROUTES = ["/", "/html-learning/html-learning.html", "/fundamentals/programming-basics/prg.html"];

for (const theme of ["light", "dark"]) for (const lang of ["ar", "en"]) {
  test(`preferences applied before DOMContentLoaded: ${theme}/${lang} on representative routes`, async () => {
    for (const route of ROUTES) {
      const ctx = await browser.newContext();
      await ctx.addInitScript(([t, l]) => {
        localStorage.setItem("fayad-theme", t); localStorage.setItem("fayad-language", l);
        document.addEventListener("DOMContentLoaded", () => { const r = document.documentElement; window.__seen = { theme: r.dataset.theme, lang: r.lang, dir: r.dir, track: r.dataset.track }; });
      }, [theme, lang]);
      const page = await ctx.newPage(); await offline(page);
      await page.goto(base + route);
      const seen = await page.evaluate(() => window.__seen);
      assert.equal(seen.theme, theme, route); assert.equal(seen.lang, lang, route);
      assert.equal(seen.dir, lang === "ar" ? "rtl" : "ltr", route); assert.ok(seen.track, "track attr");
      await ctx.close();
    }
  });
}

test("theme defaults to the system preference when nothing is stored", async () => {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ colorScheme: scheme });
    const page = await ctx.newPage(); await offline(page);
    await page.goto(base + "/about/about.html");
    assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), scheme);
    assert.equal(await page.evaluate(() => document.documentElement.lang), "ar", "Arabic is the default language");
    await ctx.close();
  }
});

test("theme and language toggles work, persist across reload and navigation, and are accessible", async () => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage(); await offline(page);
  await page.goto(base + "/html-learning/html-learning.html");
  const theme = page.locator(".fy-btn-theme"), lang = page.locator(".fy-btn-lang");
  assert.ok(await theme.getAttribute("aria-label"), "theme button labelled");
  assert.ok(await lang.getAttribute("aria-label"), "language button labelled");
  const arLabel = await theme.getAttribute("aria-label");

  await theme.click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "light");
  await lang.click();
  assert.deepEqual(await page.evaluate(() => [document.documentElement.lang, document.documentElement.dir]), ["en", "ltr"]);
  assert.notEqual(await theme.getAttribute("aria-label"), arLabel, "labels follow the language");

  await page.reload(); // persistence
  assert.deepEqual(await page.evaluate(() => [document.documentElement.dataset.theme, document.documentElement.lang]), ["light", "en"]);
  await page.goto(base + "/fundamentals/computer-basics/com.html"); // navigation to another page
  assert.deepEqual(await page.evaluate(() => [document.documentElement.dataset.theme, document.documentElement.lang, document.documentElement.dir]), ["light", "en", "ltr"]);

  // keyboard operable
  await page.locator(".fy-btn-theme").focus(); await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "dark");
  await ctx.close();
});

test("legacy Angular language key is honoured (existing users keep their choice)", async () => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => localStorage.setItem("fayad-language", "en"));
  const page = await ctx.newPage(); await offline(page);
  await page.goto(base + "/angular-learning/angular-learning.html");
  assert.equal(await page.evaluate(() => document.documentElement.dir), "ltr");
  await ctx.close();
});

test("CSS track switches to real English lesson content via the shared language control", async () => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage(); await offline(page);
  await page.goto(base + "/css-learning/css-learning.html");
  const arTitle = await page.locator("#lessonTitle").textContent();
  await page.locator(".fy-btn-lang").click();
  const enTitle = await page.locator("#lessonTitle").textContent();
  assert.notEqual(enTitle, arTitle);
  assert.match(enTitle, /[A-Za-z]{3}/);
  await ctx.close();
});

test("untranslated pages show an honest notice in English; translated tracks do not", async () => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => localStorage.setItem("fayad-language", "en"));
  const page = await ctx.newPage(); await offline(page);
  await page.goto(base + "/javascript-learning/javascript-learning.html");
  assert.equal(await page.locator("#fy-notice").count(), 1);
  await page.goto(base + "/css-learning/css-learning.html");
  assert.equal(await page.locator("#fy-notice").count(), 0);
  await ctx.close();
});

test("contrast: no WCAG AA text-contrast offenders in either theme (known gradient estimate allowed)", { timeout: 300000 }, async () => {
  const allowed = [/a\.learning-logo/]; // gradient averaging artefact in the audit heuristic (white on dark green gradient)
  const failures = [];
  for (const theme of ["light", "dark"]) for (const [name, path] of Object.entries(AUDIT_PAGES)) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    await ctx.addInitScript((t) => { localStorage.setItem("fayad-theme", t); localStorage.setItem("fayad-language", "ar"); }, theme);
    const page = await ctx.newPage(); await offline(page);
    await page.goto(base + path); await page.waitForTimeout(1500);
    for (const o of await audit(page)) if (!allowed.some((re) => re.test(o.sel))) failures.push(`${theme} ${name}: ${o.ratio.toFixed(2)}<${o.need} ${o.sel} "${o.sample}"`);
    await ctx.close();
  }
  assert.deepEqual(failures, []);
});
