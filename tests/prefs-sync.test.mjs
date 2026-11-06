import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

// Stub Supabase client holding one in-memory user_preferences row.
const stub = ({ row, fail }) => {
  window.__row = row; window.__upserts = [];
  window.FAYAD_AUTH = { client: {
    auth: { getUser: async () => ({ data: { user: { id: "u1" } } }) },
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: window.__row, error: null }) }) }),
      upsert: async (r) => { if (window.__fail) return { error: { message: "offline" } }; window.__upserts.push(r); window.__row = { data: r.data, updated_at: r.updated_at }; return { error: null }; },
    }) } };
  window.__fail = fail;
};
async function run(local, row, fail) {
  const ctx = await browser.newContext({ serviceWorkers: "block" });
  await ctx.addInitScript((l) => { if (l) localStorage.setItem("fayad-prefs-v1", JSON.stringify(l)); }, local);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + "/about/about.html");
  await page.evaluate(stub, { row, fail });
  const res = await page.evaluate(async () => (await import("/js/prefs-sync.js")).syncPrefs());
  return { ctx, page, res };
}

test("remote newer than local: account settings (incl. language) are applied", async () => {
  const { ctx, page, res } = await run({ accent: "rose", updatedAt: 1000 }, { data: { accent: "blue", themeMode: "dark", fontScale: 110, lang: "en" }, updated_at: new Date(5000).toISOString() });
  assert.equal(res.action, "pulled");
  const a = await page.evaluate(() => ({ ...FAYAD.prefs.all, lang: FAYAD.prefs.lang, theme: FAYAD.prefs.theme }));
  assert.deepEqual([a.accent, a.theme, a.fontScale, a.lang, a.updatedAt], ["blue", "dark", 110, "en", 5000]);
  assert.equal(await page.evaluate(() => window.__upserts.length), 0);
  await ctx.close();
});

test("guest settings newer than account: pushed to Supabase", async () => {
  const { ctx, page, res } = await run({ accent: "violet", updatedAt: 9000 }, { data: { accent: "blue" }, updated_at: new Date(2000).toISOString() });
  assert.equal(res.action, "pushed");
  const u = await page.evaluate(() => window.__upserts[0]);
  assert.equal(u.user_id, "u1"); assert.equal(u.data.accent, "violet"); assert.equal(Date.parse(u.updated_at), 9000);
  await ctx.close();
});

test("no remote row: customised guest settings create it; untouched defaults do not", async () => {
  let r = await run({ accent: "amber", updatedAt: 777 }, null);
  assert.equal(r.res.action, "created"); assert.equal(await r.page.evaluate(() => window.__upserts.length), 1); await r.ctx.close();
  r = await run(null, null);
  assert.equal(await r.page.evaluate(() => window.__upserts.length), 0); await r.ctx.close();
});

test("failed push stays pending and a later sync retries it", async () => {
  const { ctx, page, res } = await run({ accent: "rose", updatedAt: 9000 }, { data: {}, updated_at: new Date(1).toISOString() }, true);
  assert.equal(res.ok, false);
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-prefs-pending")), "1");
  await page.evaluate(() => { window.__fail = false; });
  const r2 = await page.evaluate(async () => (await import("/js/prefs-sync.js")).syncPrefs());
  assert.equal(r2.action, "pushed"); assert.equal(await page.evaluate(() => localStorage.getItem("fayad-prefs-pending")), null);
  await ctx.close();
});

test("signed-out visitors never load Supabase and keep local settings", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" }); let ext = 0;
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => { ext++; r.abort(); });
  const page = await ctx.newPage(); await page.goto(base + "/about/about.html"); await page.waitForTimeout(500);
  await page.evaluate(() => FAYAD.prefs.set({ accent: "blue" })); await page.waitForTimeout(1200);
  assert.equal(await page.evaluate(() => FAYAD.prefs.all.accent), "blue");
  assert.equal(await page.evaluate(() => !!window.supabase), false);
  await ctx.close();
});
