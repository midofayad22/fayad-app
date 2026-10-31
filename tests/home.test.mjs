// Milestone 3: homepage behaviour (stages, courses, next step, i18n consistency, catalog accuracy).
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
  await page.goto(base + "/"); await page.waitForSelector("[data-course-card]", { state: "attached" });
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

test("the path has 4 ordered stages containing all 11 courses once, in learning order", async () => {
  const { ctx, page } = await open({}, "en");
  const stages = await page.$$eval(".hm-stage", (els) => els.map((e) => ({ n: e.id, title: e.querySelector("h3").textContent, courses: [...e.querySelectorAll(".hm-row")].map((r) => r.dataset.courseCard) })));
  assert.deepEqual(stages.map((x) => x.title), ["Fundamentals", "Web foundations", "Go deeper", "Frameworks"]);
  assert.deepEqual(stages.flatMap((x) => x.courses), ["com", "prg", "html", "css", "js", "ajs", "bs", "tw", "react", "vue", "angular"]);
  const rows = await page.$$eval(".hm-row", (els) => els.map((r) => ({ href: r.getAttribute("href"), count: r.querySelector(".hm-count").textContent })));
  assert.equal(rows.length, 11); assert.ok(rows.every((r) => /\d+ lessons/.test(r.count) && r.href.endsWith(".html")));
  assert.equal(await page.locator(".hm-tabs [role=tab]").count(), 4);
  assert.equal(await page.locator(".hm-stage:not([hidden])").count(), 1);
  await page.locator(".hm-tab[data-seg='3']").click();
  assert.equal(await page.locator("#stage-3").isVisible(), true);
  assert.equal(await page.locator("#stage-1").isVisible(), false);
  assert.equal(await page.locator(".hm-tab[data-seg='3']").getAttribute("aria-selected"), "true");
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator(".hm-tab[data-seg='4']").getAttribute("aria-selected"), "true");
  assert.equal(await page.locator("text=/coming soon|قريبًا/i").count(), 0);
  await ctx.close();
});

test("exactly one primary call to action in the hero", async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator(".hm-hero .hm-cta").count(), 1);
  assert.match(await page.locator(".hm-hero .hm-cta").getAttribute("href"), /computer-basics\/com\.html$/);
  await ctx.close();
});

test("the next-step card starts at the first course, then continues from real saved data", async () => {
  let { ctx, page } = await open({}, "en");
  assert.equal(await page.locator("#nextLabel").textContent(), "Start here");
  assert.match(await page.locator("#heroCta").getAttribute("href"), /computer-basics\/com\.html$/);
  await ctx.close();

  ({ ctx, page } = await open({
    "fayad-html-progress": JSON.stringify([1, 2, 3, 3, 99, "x"]),
    "fayad-js-current-lesson": "4",
    "fayad-last-track": JSON.stringify({ id: "js", ts: 1 }),
  }, "en"));
  assert.equal(await page.locator("#nextLabel").textContent(), "Pick up where you left off");
  assert.equal(await page.locator("#nextName").innerText(), "JavaScript");
  assert.match(await page.locator("#nextGo").getAttribute("href"), /javascript-learning/);
  assert.match(await page.locator("#nextStatus").innerText(), /Lesson 5 of 25/);
  assert.match(await page.locator("#heroCta").getAttribute("href"), /javascript-learning/);
  assert.equal(await page.locator("#heroCta span").innerText(), "Continue learning");
  assert.match(await page.locator('[data-course-card="html"] .hm-progress-label').innerText(), /3 of 30 lessons completed/);
  await ctx.close();
});

test("corrupt progress data does not break the page", async () => {
  const { ctx, page } = await open({ "fayad-html-progress": "{not json", "fayad-js-current-lesson": "banana", "fayad-last-track": "###" });
  assert.equal(await page.locator("#nextLabel").textContent(), "ابدأ من هنا");
  assert.equal(await page.locator(".hm-row").count(), 11);
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
  assert.equal((await page.locator("h1").innerText()).replace(/\s+/g, " "), "من أول سطر كود إلى تطبيق ويب حقيقي");
  await page.click(".fy-btn-lang");
  assert.equal((await page.locator("h1").innerText()).replace(/\s+/g, " "), "From your first line of code to a real web app");
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
    let len;
    const migrated = fs.existsSync(path.join(ROOT, "content", id, "index.js"));
    if (migrated) { len = (await import(`../content/${id}/index.js`)).lessons.length; } // authoritative data
    else {
      const p = await ctx.newPage(); await offline(p);
      await p.goto(base + url); await p.waitForTimeout(800);
      len = await p.evaluate(() => (typeof lessons !== "undefined" ? lessons.length : null));
      await p.close();
    }
    assert.equal(len, catalog[id].total, `${id}: catalog ${catalog[id].total} vs data ${len}`);
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

test("hero is not hidden behind the fixed navbar and nothing overflows (320–1440, ar + en)", async () => {
  for (const lang of ["ar", "en"]) for (const w of [320, 390, 768, 1440]) {
    const { ctx, page } = await open({}, lang);
    await page.setViewportSize({ width: w, height: 900 }); await page.waitForTimeout(900);
    const r = await page.evaluate(() => ({
      navBottom: document.querySelector(".navbar").getBoundingClientRect().bottom,
      kick: document.querySelector(".hm-kicker").getBoundingClientRect().top,
      sw: document.documentElement.scrollWidth, iw: innerWidth,
      outside: [...document.querySelectorAll(".navbar .nav-actions > *")].filter((e) => { const b = e.getBoundingClientRect(); return b.width && (b.left < -0.5 || b.right > innerWidth + 0.5); }).length,
    }));
    assert.ok(r.kick >= r.navBottom, `${lang}@${w}: hero under navbar`);
    assert.ok(r.sw <= r.iw, `${lang}@${w}: horizontal overflow`);
    assert.equal(r.outside, 0, `${lang}@${w}: navbar actions leave the viewport`);
    await ctx.close();
  }
});

test("viewport-fit=cover and safe-area padding are present for iPhone notches", async () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert.match(html, /viewport-fit=cover/);
  assert.match(fs.readFileSync(path.join(ROOT, "css/shell.css"), "utf8"), /env\(safe-area-inset-top/);
});

test("the hero's 4-stage overview reflects real saved progress per stage (and is empty without any)", async () => {
  let { ctx, page } = await open({}, "en");
  assert.deepEqual(await page.$$eval(".hm-tab[data-seg] .hm-seg-bar > span", (els) => els.map((e) => e.style.width)), ["0%", "0%", "0%", "0%"]);
  await ctx.close();
  // html: 15 of 30 done; stage 2 = (html+css+js) = 85 lessons -> 15/85 = 18%; other stages untouched
  ({ ctx, page } = await open({ "fayad-html-progress": JSON.stringify(Array.from({ length: 15 }, (_, i) => i + 1)) }, "en"));
  assert.deepEqual(await page.$$eval(".hm-tab[data-seg] .hm-seg-bar > span", (els) => els.map((e) => e.style.width)), ["0%", "18%", "0%", "0%"]);
  await ctx.close();
});

test("every homepage section fills the screen height and sections never overlap (ar+en, phone to desktop)", async () => {
  for (const lang of ["ar", "en"]) for (const [w, h] of [[360, 740], [390, 844], [768, 1024], [1280, 800], [1440, 900]]) {
    const { ctx, page } = await open({}, lang);
    await page.setViewportSize({ width: w, height: h }); await page.waitForTimeout(1500);
    const r = await page.evaluate(() => [...document.querySelectorAll("main > .hm-sec")].map((s) => { const b = s.getBoundingClientRect(); return { id: s.id, top: b.top + scrollY, bottom: b.bottom + scrollY, h: b.height, sh: s.scrollHeight }; }));
    assert.equal(r.length, 4);
    r.forEach((s, i) => {
      assert.ok(s.h >= h - 1, `${lang}@${w}x${h}: #${s.id} shorter than the screen (${s.h})`);
      if (i) assert.ok(s.top >= r[i - 1].bottom - 1, `${lang}@${w}x${h}: #${s.id} overlaps previous`);
    });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${lang}@${w}: x overflow`);
    await ctx.close();
  }
});

test("motion is skipped under prefers-reduced-motion and content stays visible", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage(); await offline(page);
  await page.goto(base + "/"); await page.waitForSelector("[data-course-card]"); await page.waitForTimeout(500);
  assert.equal(await page.locator(".hm-word").count(), 0);
  assert.equal(await page.locator("h1").evaluate((e) => getComputedStyle(e).opacity), "1");
  assert.equal(await page.locator(".hm-lead").evaluate((e) => getComputedStyle(e).opacity), "1");
  await ctx.close();
});

test("GSAP animates the hero when motion is allowed and ends fully visible", async () => {
  const { ctx, page } = await open({}, "ar");
  await page.waitForTimeout(4500);
  assert.ok(await page.locator(".hm-word").count() >= 4);
  assert.equal(await page.locator(".hm-lead").evaluate((e) => getComputedStyle(e).opacity), "1");
  assert.match(await page.locator("#heroCode").innerText(), /Hello, FAYAD[\s\S]*Start/);
  await ctx.close();
});
