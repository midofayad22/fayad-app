// Milestone 3: homepage behaviour (roadmap, courses, continue-learning, i18n consistency, catalog accuracy).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";

const { chromium } = createRequire(import.meta.url)("playwright");
const ROOT = path.resolve(import.meta.dirname, "..");
let server, browser, base;
const offline = (p) => p.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(init = {}, lang = "ar") {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(([l, kv]) => { localStorage.setItem("fayad-language", l); for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); }, [lang, init]);
  const page = await ctx.newPage(); await offline(page);
  await page.goto(base + "/"); await page.waitForSelector("[data-course-card]");
  return { ctx, page };
}

test("every internal link on the homepage resolves to an existing file", async () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const hrefs = [...html.matchAll(/href="([^"#:]+?)(?:#[^"]*)?"/g)].map((m) => m[1]).filter((h) => !h.startsWith("http") && !h.startsWith("tel"));
  assert.ok(hrefs.length > 10);
  for (const h of new Set(hrefs)) {
    const file = h.startsWith("/") ? h.slice(1) : h;
    if (!file || file === "index.html" && false) continue;
    assert.ok(fs.existsSync(path.join(ROOT, file)), `missing target: ${h}`);
  }
});

test("roadmap has the 8 requested steps in order; Git/GitHub and Projects are honestly marked as coming soon", async () => {
  const { ctx, page } = await open({}, "en");
  const steps = await page.$$eval(".hm-roadmap .hm-step", (els) => els.map((e) => ({ n: e.querySelector(".hm-step-n").textContent, name: e.querySelector("strong").textContent, link: e.tagName === "A", soon: !!e.querySelector(".hm-soon") })));
  assert.deepEqual(steps.map((s) => s.name), ["Computer Fundamentals", "Programming Fundamentals", "HTML", "CSS", "JavaScript", "Git & GitHub", "Frameworks", "Projects"]);
  assert.deepEqual(steps.map((s) => s.soon), [false, false, false, false, false, true, false, true]);
  assert.deepEqual(steps.map((s) => s.link), [true, true, true, true, true, false, true, false]);
  assert.deepEqual(steps.map((s) => s.n), ["1", "2", "3", "4", "5", "6", "7", "8"]);
  await ctx.close();
});

test("exactly one primary call to action in the hero", async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator(".hm-hero .hm-cta").count(), 1);
  assert.match(await page.locator(".hm-hero .hm-cta").getAttribute("href"), /computer-basics\/com\.html$/);
  await ctx.close();
});

test("continue learning is hidden with no progress and appears from real saved data", async () => {
  let { ctx, page } = await open();
  assert.equal(await page.locator("#continue").isVisible(), false);
  await ctx.close();

  ({ ctx, page } = await open({
    "fayad-html-progress": JSON.stringify([1, 2, 3, 3, 99, "x"]),
    "fayad-js-current-lesson": "4",
    "fayad-last-track": JSON.stringify({ id: "js", ts: 1 }),
  }, "en"));
  assert.equal(await page.locator("#continue").isVisible(), true);
  const cards = await page.$$eval(".hm-continue-card", (els) => els.map((e) => ({ href: e.getAttribute("href"), text: e.textContent.replace(/\s+/g, " ").trim() })));
  assert.equal(cards.length, 2);
  assert.match(cards[0].href, /javascript-learning/); // last visited first
  assert.match(cards[0].text, /Lesson 5 of 25/);
  assert.match(cards[1].text, /3 of 30 lessons completed/); // duplicates and out-of-range / non-numeric ids ignored
  await ctx.close();
});

test("corrupt progress data does not break the page", async () => {
  const { ctx, page } = await open({ "fayad-html-progress": "{not json", "fayad-js-current-lesson": "banana", "fayad-last-track": "###" });
  assert.equal(await page.locator("#continue").isVisible(), false);
  assert.equal(await page.locator(".hm-card").count(), 8);
  await ctx.close();
});

test("a visited course page is remembered as the last track", async () => {
  const { ctx, page } = await open();
  await page.goto(base + "/html-learning/html-learning.html"); await page.waitForTimeout(500);
  const v = JSON.parse(await page.evaluate(() => localStorage.getItem("fayad-last-track")));
  assert.equal(v.id, "html");
  await ctx.close();
});

test("language switch re-renders homepage text, numbers stay derived from the catalog", async () => {
  const { ctx, page } = await open({}, "ar");
  assert.equal(await page.locator("h1").innerText(), "تعلّم تطوير الويب خطوة بخطوة");
  await page.click(".fy-btn-lang");
  assert.equal(await page.locator("h1").innerText(), "Learn web development, step by step");
  const total = await page.evaluate(() => window.FAYAD.catalog.totalLessons());
  assert.equal(await page.locator("[data-stat=lessons]").innerText(), String(total));
  // the old "content not translated" notice is for untranslated pages only
  assert.equal(await page.locator("#fy-notice").count(), 0);
  await ctx.close();
});

test("static Arabic markup matches the Arabic dictionary and every key exists in both languages", async () => {
  const { ctx, page } = await open({}, "ar");
  const res = await page.evaluate(() => {
    const bad = [];
    const dictKeys = (lang) => { document.documentElement.setAttribute("data-lang", lang); };
    document.documentElement.setAttribute("data-lang", "ar");
    document.querySelectorAll("[data-i18n]").forEach((el) => { const k = el.getAttribute("data-i18n"); if (FAYAD.i18n.t(k) === k) bad.push("missing ar: " + k); });
    document.documentElement.setAttribute("data-lang", "en");
    document.querySelectorAll("[data-i18n]").forEach((el) => { const k = el.getAttribute("data-i18n"); if (FAYAD.i18n.t(k) === k) bad.push("missing en: " + k); });
    document.documentElement.setAttribute("data-lang", "ar");
    return bad;
  });
  assert.deepEqual(res, []);
  // drift check: the HTML shipped to crawlers/no-JS users must equal what the Arabic dictionary renders
  const src = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const staticText = await page.evaluate(() => [...document.querySelectorAll("[data-i18n]")].map((e) => [e.getAttribute("data-i18n"), e.textContent.trim()]));
  for (const [k, rendered] of staticText) {
    const m = src.match(new RegExp(`data-i18n="${k.replace(/\./g, "\\.")}"[^>]*>([^<]*)<`));
    if (m && m[1].trim()) assert.equal(m[1].trim(), rendered, `static Arabic text drifted for ${k}`);
  }
  await ctx.close();
});

const PAGES = {
  html: "/html-learning/html-learning.html", css: "/css-learning/css-learning.html", js: "/javascript-learning/javascript-learning.html",
  react: "/react-learning/react-learning.html", vue: "/vue-learning/vue-learning.html", angular: "/angular-learning/angular-learning.html",
};
test("catalog lesson totals match the lesson arrays used by each course page", async () => {
  const { ctx, page } = await open();
  const catalog = await page.evaluate(() => Object.fromEntries(FAYAD.catalog.tracks.map((t) => [t.id, { total: t.total, path: t.path }])));
  for (const [id, url] of Object.entries(PAGES)) {
    assert.equal(catalog[id].path, url, `${id} path`);
    const p = await ctx.newPage(); await offline(p);
    await p.goto(base + url); await p.waitForTimeout(800);
    const len = await p.evaluate(() => (typeof lessons !== "undefined" ? lessons.length : null));
    assert.equal(len, catalog[id].total, `${id}: catalog ${catalog[id].total} vs page ${len}`);
    await p.close();
  }
  for (const [id, sel] of [["com", ".lesson-item"], ["prg", ".lesson-item:not(.final-item)"]]) {
    const p = await ctx.newPage(); await offline(p);
    await p.goto(base + catalog[id].path); await p.waitForTimeout(500);
    assert.equal(await p.locator(sel).count(), catalog[id].total, id);
    await p.close();
  }
  await ctx.close();
});

test("no phone number or tel: link is published on the homepage (privacy decision)", async () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.ok(!/tel:|\+20\s?1\d|1091573063|109 157 3063|menu-phone/.test(html));
  const { ctx, page } = await open();
  assert.equal(await page.locator("a[href^='tel:']").count(), 0);
  await ctx.close();
});
