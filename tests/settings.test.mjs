import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { validateAvatar, validateName } from "../js/settings/validate.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
const LIVE = ["profile", "appearance", "language", "learning", "accessibility"];
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");

async function open(path, { w = 1200, h = 900, lang = "ar", init, stub } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { if (window === window.top && !localStorage.getItem("fayad-language")) localStorage.setItem("fayad-language", l); }, lang);
  if (init) await ctx.addInitScript(init);
  if (stub) await ctx.addInitScript(stub);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(base + path); await page.waitForSelector(".st-nav"); await page.waitForTimeout(250); page.errs = errs; return { ctx, page };
}
const prefs = (p) => p.evaluate(() => FAYAD.prefs.all);

test("avatar/name validation rules", () => {
  assert.equal(validateAvatar({ size: 1000, type: "image/png" }), null);
  assert.equal(validateAvatar({ size: 1000, type: "image/gif" }), "type");
  assert.equal(validateAvatar({ size: 1000, type: "application/pdf" }), "type");
  assert.equal(validateAvatar({ size: 6 * 1024 * 1024, type: "image/jpeg" }), "size");
  assert.equal(validateAvatar({ size: 0, type: "image/png" }), "empty");
  assert.equal(validateName("  Ali   Ahmed "), "Ali Ahmed"); assert.equal(validateName("   "), null); assert.equal(validateName("x".repeat(81)), null);
});

test("every settings page loads without errors, in both languages, with working nav; English has zero Arabic", async () => {
  for (const lang of ["ar", "en"]) for (const p of ["index", ...LIVE]) {
    const { ctx, page } = await open(`/settings/${p}.html`, { lang });
    assert.deepEqual(page.errs, [], `${p}/${lang}`);
    assert.equal(await page.locator(".st-nav a").count(), LIVE.length + 1);
    assert.equal(await page.locator(".st-nav a.on").count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.dir), lang === "ar" ? "rtl" : "ltr");
    if (lang === "en") { const txt = await page.evaluate(() => document.body.innerText + document.title); assert.doesNotMatch(txt, /[؀-ۿ]/, `${p}: ${txt.match(/[؀-ۿ].{0,20}/)}`); }
    await ctx.close();
  }
});

test("320px / 390px: no horizontal overflow on any page", async () => {
  for (const w of [320, 390]) for (const p of ["index", ...LIVE]) {
    const { ctx, page } = await open(`/settings/${p}.html`, { w, h: 800 });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth); assert.ok(sw <= w, `${p}@${w}: ${sw}`); await ctx.close();
  }
});

test("appearance: live preview is not saved until applied; discard reverts; apply persists on other pages; reset restores", async () => {
  const { ctx, page } = await open("/settings/appearance.html");
  const apply = page.locator(".st-actions .st-btn").first(), discard = page.locator(".st-actions .st-btn").nth(1);
  assert.equal(await apply.isDisabled(), true);
  await page.locator('[role="radio"][data-v="dark"]').click(); await page.locator('[role="radio"][data-v="violet"]').click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "dark");           // previewed everywhere on the page
  assert.equal(await page.evaluate(() => document.documentElement.dataset.accent), "violet");
  assert.equal((await prefs(page)).themeMode, "light");                                              // ...but not saved
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-prefs-v1")), null);
  await discard.click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), "light");
  await page.locator('[role="radio"][data-v="dark"]').click(); await page.locator('[role="radio"][data-v="rose"]').click();
  await page.locator("#fs").fill("120"); await apply.click();
  assert.deepEqual([(await prefs(page)).themeMode, (await prefs(page)).accent, (await prefs(page)).fontScale], ["dark", "rose", 120]);
  await page.goto(base + "/about/about.html"); await page.waitForTimeout(300);                       // another page keeps them
  assert.deepEqual(await page.evaluate(() => [document.documentElement.dataset.theme, document.documentElement.dataset.accent, document.documentElement.style.getPropertyValue("--fy-scale")]), ["dark", "rose", "1.2"]);
  await page.goto(base + "/settings/appearance.html"); await page.waitForSelector(".st-nav");
  await page.locator(".st-actions .st-btn").nth(2).click();
  const a = await prefs(page); assert.deepEqual([a.themeMode, a.accent, a.fontScale], ["light", "teal", 100]);
  await ctx.close();
});

test("appearance: arrow keys move within the radio group", async () => {
  const { ctx, page } = await open("/settings/appearance.html");
  await page.locator('[role="radio"][data-v="light"]').focus(); await page.keyboard.press("ArrowLeft");   // RTL: left = next
  assert.equal(await page.locator('[role="radio"][aria-checked="true"]').first().getAttribute("data-v"), "dark");
  await ctx.close();
});

test("language: switching changes interface, direction and persists across pages", async () => {
  const { ctx, page } = await open("/settings/language.html");
  await page.locator('[role="radio"][data-v="en"]').click(); await page.waitForTimeout(300);
  assert.deepEqual(await page.evaluate(() => [document.documentElement.lang, document.documentElement.dir]), ["en", "ltr"]);
  assert.match(await page.locator("h1").innerText(), /Language/);
  await page.goto(base + "/"); await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => document.documentElement.dir), "ltr");
  await ctx.close();
});

test("learning: every control writes the real preference and the preview follows", async () => {
  const { ctx, page } = await open("/settings/learning.html", { lang: "en" });
  await page.locator('[role="radio"][data-v="compact"]').click();
  await page.locator('[role="radio"][data-v="collapsed"]').click();
  await page.locator('[role="radio"][data-v="en"]').last().click();
  await page.locator("#es").fill("18"); await page.locator('[role="radio"][data-v="light"]').last().click();
  const a = await prefs(page); assert.deepEqual([a.reading, a.sections, a.explainLang, a.editorSize, a.editorTheme], ["compact", "collapsed", "en", 18, "light"]);
  assert.equal(await page.locator(".st-lesson details").count(), 2);
  assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector(".st-code pre")).fontSize), "18px");
  await ctx.close();
});

test("accessibility: text size, contrast, motion apply platform-wide", async () => {
  const { ctx, page } = await open("/settings/accessibility.html", { lang: "en" });
  await page.locator('[role="radio"][data-v="high"]').click(); await page.locator('[role="radio"][data-v="reduce"]').click(); await page.locator("#fs2").fill("130");
  assert.deepEqual(await page.evaluate(() => [document.documentElement.dataset.contrast, document.documentElement.dataset.motion, document.documentElement.style.getPropertyValue("--fy-scale")]), ["high", "reduce", "1.3"]);
  await page.goto(base + "/about/about.html"); await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => document.documentElement.dataset.contrast), "high");
  await ctx.close();
});

// ---- profile, with an in-memory Supabase stub ----
const STUB = () => {
  const db = { profile: { display_name: "Old Name", avatar_url: "" }, calls: [], uploads: [], removed: [], meta: {} };
  window.__db = db;
  window.FAYAD_AUTH = { client: {
    auth: { getUser: async () => ({ data: { user: { id: "u1", email: "a@b.co", email_confirmed_at: "2026-01-01T00:00:00Z", created_at: "2026-01-01T00:00:00Z", last_sign_in_at: "2026-11-05T00:00:00Z", app_metadata: { providers: ["email"] }, user_metadata: {} } } }),
      updateUser: async ({ data }) => { Object.assign(db.meta, data); return { error: null }; } },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: db.profile, error: null }) }) }),
      upsert: async (r) => { if (db.fail) return { error: { message: "network down" } }; db.calls.push(r); Object.assign(db.profile, r); return { error: null }; } }),
    storage: { from: () => ({ upload: async (path, blob, o) => { if (db.fail) return { error: { message: "network down" } }; db.uploads.push({ path, type: blob.type, size: blob.size, o }); return { error: null }; },
      getPublicUrl: (p) => ({ data: { publicUrl: "https://x.supabase.co/storage/v1/object/public/avatars/" + p } }), remove: async (l) => { db.removed.push(...l); return {}; } }) },
  } };
};
test("profile (signed out): sign-in prompt, no editing controls", async () => {
  const { ctx, page } = await open("/settings/profile.html");
  assert.equal(await page.locator('a[href="/login.html"]').count() >= 1, true); assert.equal(await page.locator("#dispName").count(), 0); await ctx.close();
});
test("profile: shows account facts, saves display name to profiles + auth metadata, validates, shows errors", async () => {
  const { ctx, page } = await open("/settings/profile.html", { lang: "en", stub: STUB });
  await page.waitForSelector("#dispName");
  assert.equal(await page.locator("#dispName").inputValue(), "Old Name");
  const facts = await page.locator(".st-facts").innerText(); assert.match(facts, /a@b\.co/); assert.match(facts, /Email confirmed/);
  await page.fill("#dispName", "   "); await page.getByRole("button", { name: "Save name" }).click();
  assert.match(await page.locator(".st-status[data-kind=err]").innerText(), /1 to 80/);
  await page.fill("#dispName", "New  Name"); await page.getByRole("button", { name: "Save name" }).click(); await page.waitForTimeout(150);
  assert.match(await page.locator(".st-status[data-kind=ok]").innerText(), /Name saved/);
  assert.deepEqual(await page.evaluate(() => [__db.profile.display_name, __db.meta.full_name]), ["New Name", "New Name"]);
  await page.evaluate(() => { __db.fail = true; }); await page.fill("#dispName", "Fail"); await page.getByRole("button", { name: "Save name" }).click(); await page.waitForTimeout(150);
  assert.match(await page.locator(".st-status[data-kind=err]").innerText(), /reached|save/i);
  await ctx.close();
});
test("profile: avatar rejects bad type/size, previews, uploads a WebP into <uid>/, updates profile, removes it", async () => {
  const { ctx, page } = await open("/settings/profile.html", { lang: "en", stub: STUB });
  await page.waitForSelector("#avatarFile");
  await page.setInputFiles("#avatarFile", { name: "a.txt", mimeType: "text/plain", buffer: Buffer.from("hi") });
  assert.match(await page.locator(".st-avatar-ctl .st-status").innerText(), /Unsupported/);
  await page.setInputFiles("#avatarFile", { name: "big.png", mimeType: "image/png", buffer: Buffer.alloc(6 * 1024 * 1024) });
  assert.match(await page.locator(".st-avatar-ctl .st-status").innerText(), /larger than 5 MB/);
  assert.equal(await page.evaluate(() => __db.uploads.length), 0);
  await page.setInputFiles("#avatarFile", { name: "ok.png", mimeType: "image/png", buffer: PNG });
  assert.equal(await page.locator(".st-avatar img").count(), 1);                                      // preview before saving
  assert.equal(await page.evaluate(() => __db.uploads.length), 0);
  await page.getByRole("button", { name: "Save picture" }).click(); await page.waitForFunction(() => __db.uploads.length === 1);
  const up = await page.evaluate(() => __db.uploads[0]); assert.match(up.path, /^u1\/avatar-\d+\.webp$/); assert.equal(up.type, "image/webp");
  await page.waitForTimeout(200);
  assert.match(await page.evaluate(() => __db.profile.avatar_url), /\/avatars\/u1\/avatar-\d+\.webp$/);
  assert.match(await page.locator(".st-avatar-ctl .st-status").innerText(), /updated/);
  await page.getByRole("button", { name: "Remove picture" }).click(); await page.waitForTimeout(200);
  assert.deepEqual(await page.evaluate(() => [__db.profile.avatar_url, __db.removed.length]), [null, 1]);
  await ctx.close();
});
