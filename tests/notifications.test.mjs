import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

// In-memory stand-in for the Supabase tables; mimics only the filters the app uses.
const STUB = (seed) => {
  const now = Date.now(), iso = (m) => new Date(now - m * 60000).toISOString();
  const db = { n: seed.map((s, i) => ({ id: "n" + i, user_id: "u1", category: s.category, kind: s.kind, params: s.params || {}, created_at: iso(s.ago ?? i + 1), read_at: s.read ? iso(0) : null })), prefs: window.__seedPrefs || null, ann: [{ id: "a1", title_ar: "إعلان تجريبي", title_en: "Maintenance tonight", body_ar: "ص", body_en: "Short downtime at 10pm", url: "/about/about.html" }], rpc: 0, log: [] };
  window.__db = db;
  const q = (table, op, payload) => {
    const f = []; let order = null, lim = 1e9, head = false;
    const api = {
      select(_c, o) { head = !!(o && o.head); return api; }, order() { order = true; return api; }, limit(n) { lim = n; return api; },
      lt(c, v) { f.push((r) => r[c] < v); return api; }, is(c, v) { f.push((r) => r[c] === v); return api; }, in(c, vs) { f.push((r) => vs.includes(r[c])); return api; },
      eq(c, v) { f.push((r) => r[c] === v); if (table === "notification_prefs" && op === "select") return Object.assign(api, { maybeSingle: async () => ({ data: db.prefs }) }); return api; },
      then(res) {
        let out;
        if (table === "notifications") {
          const m = db.n.filter((r) => f.every((x) => x(r)));
          if (op === "select") { const s = [...m].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, lim); out = head ? { count: m.length, error: null } : { data: s, error: null }; }
          else if (op === "update") { m.forEach((r) => Object.assign(r, payload)); db.log.push("update"); out = { error: null }; }
          else if (op === "delete") { db.n = db.n.filter((r) => !m.includes(r)); db.log.push("delete"); out = { error: null }; }
        } else if (table === "announcements") out = { data: db.ann.filter((r) => f.every((x) => x(r))), error: null };
        else if (table === "notification_prefs" && op === "upsert") { db.prefs = { ...(db.prefs || {}), ...payload }; out = { error: null }; }
        else out = { data: null, error: null };
        return Promise.resolve(out).then(res);
      },
    };
    return api;
  };
  window.FAYAD_AUTH = { client: { auth: { getUser: async () => ({ data: { user: { id: "u1", email: "a@b.co" } } }) }, rpc: async () => { db.rpc++; return { data: 0, error: null }; },
    from: (t) => ({ select: (c, o) => q(t, "select").select(c, o), update: (p) => q(t, "update", p), delete: () => q(t, "delete"), upsert: (p) => q(t, "upsert", p) }) } };
};
async function open(seed, { lang = "en", path = "/settings/notifications.html", w = 1100, seedPrefs = null } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { if (!localStorage.getItem("fayad-language")) localStorage.setItem("fayad-language", l); }, lang);
  await ctx.addInitScript((p) => { window.__seedPrefs = p; }, seedPrefs);
  await ctx.addInitScript(STUB, seed);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + path); await page.waitForTimeout(500); return { ctx, page };
}
const SEED = [
  { category: "completion", kind: "course_complete", params: { track: "css" } },
  { category: "points", kind: "points_total", params: { points: 250 }, read: true },
  { category: "announcement", kind: "announcement", params: { id: "a1" } },
  { category: "incomplete", kind: "unfinished_course", params: { track: "js", done: 7, total: 25 } },
];

test("renders real events bilingually (no fake samples), with unread state and timestamps", async () => {
  const { ctx, page } = await open(SEED);
  const t = await page.locator(".st-notifs").innerText();
  assert.match(t, /You finished CSS/); assert.match(t, /You reached 250 points/); assert.match(t, /Maintenance tonight/); assert.match(t, /7 of 25 lessons/);
  assert.equal(await page.locator(".st-notif.unread").count(), 3); assert.match(await page.locator(".st-count").innerText(), /3 unread/);
  assert.ok(await page.locator(".st-notif time[datetime]").count() === 4);
  assert.doesNotMatch(await page.locator("body").innerText(), /[؀-ۿ]/);                       // English UI: zero Arabic
  await page.evaluate(() => FAYAD.i18n && 0); await page.locator('button.fy-btn-lang').click(); await page.waitForTimeout(400);
  assert.match(await page.locator(".st-notifs").innerText(), /أنهيت كورس CSS/);
  await ctx.close();
});
test("empty state is honest; guest sees sign-in, not notifications", async () => {
  let { ctx, page } = await open([]); assert.match(await page.locator(".st-empty").innerText(), /No notifications yet/); await ctx.close();
  const c2 = await browser.newContext({ serviceWorkers: "block" }); const p2 = await c2.newPage(); await c2.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await p2.goto(base + "/settings/notifications.html"); await p2.waitForSelector(".st-nav"); assert.equal(await p2.locator(".st-notif").count(), 0); assert.ok(await p2.locator('a[href="/login.html"]').count() >= 1); await c2.close();
});
test("mark read / mark all / delete / clear update the store and the unread counter", async () => {
  const { ctx, page } = await open(SEED);
  await page.locator(".st-notif.unread button[data-act=read]").first().click(); await page.waitForTimeout(150);
  assert.equal(await page.locator(".st-notif.unread").count(), 2);
  await page.locator(".st-notif button[data-act=del]").first().click(); await page.waitForTimeout(150);
  assert.equal(await page.locator(".st-notif").count(), 3);
  await page.getByRole("button", { name: "Mark all as read" }).click(); await page.waitForTimeout(150);
  assert.equal(await page.locator(".st-notif.unread").count(), 0); assert.equal(await page.evaluate(() => __db.n.every((n) => n.read_at)), true);
  page.once("dialog", (d) => d.accept()); await page.getByRole("button", { name: "Clear history" }).click(); await page.waitForTimeout(150);
  assert.equal(await page.evaluate(() => __db.n.length), 0); assert.equal(await page.locator(".st-empty").count(), 1);
  await ctx.close();
});
test("category toggles are saved per category and loaded back", async () => {
  let { ctx, page } = await open([]);
  assert.equal(await page.locator(".st-toggle input").count(), 7);
  await page.locator("#np-points").uncheck(); await page.waitForTimeout(150);
  assert.equal(await page.evaluate(() => __db.prefs.points), false); assert.equal(await page.evaluate(() => __db.prefs.reminder), undefined);
  await ctx.close();
  ({ ctx, page } = await open([], { seedPrefs: { points: false } }));
  assert.equal(await page.locator("#np-points").isChecked(), false); assert.equal(await page.locator("#np-reminder").isChecked(), true);
  await ctx.close();
});
test("menu button shows the unread count; the server is asked to generate due notifications once per visit", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" });
  await ctx.addInitScript(() => localStorage.setItem("sb-vsrysitexadvmmikcmfs-auth-token", JSON.stringify({ user: { email: "a@b.co" } })));
  await ctx.addInitScript(STUB, SEED);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + "/about/about.html"); await page.waitForTimeout(1500);
  assert.equal(await page.locator(".fy-btn-menu").first().getAttribute("data-unread"), "3");
  assert.equal(await page.evaluate(() => __db.rpc), 1);
  await page.locator(".fy-btn-menu").first().click(); await page.waitForSelector(".nd.on");
  assert.match(await page.locator('.nd a[href="/settings/notifications.html"]').innerText(), /3/);
  await ctx.close();
});
