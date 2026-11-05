// Cloud wiring with a mocked Supabase client: points are never sent by the browser, signed-out stays local, leaderboard renders text safely.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const mock = (signedIn) => ({ signedIn });
async function open(signedIn) {
  const ctx = await browser.newContext({ serviceWorkers: "block" });
  await ctx.addInitScript((si) => {
    if (window !== window.top) return;
    localStorage.setItem("fayad-game-v1", JSON.stringify({ v: 1, points: 40, games: { html: { solved: { 1: { at: 1, hint: false, pts: 15 }, 2: { at: 2, hint: true, pts: 10 } } } } }));
    window.__calls = [];
    window.FAYAD_AUTH = { client: {
      auth: { getUser: async () => ({ data: { user: si ? { id: "u1" } : null } }) },
      from: () => ({ select: () => ({ eq: async () => ({ data: [], error: null }) }) }),
      rpc: async (name, args) => { window.__calls.push([name, args]); if (name === "get_leaderboard") return { data: [{ rank: 1, display_name: "<b>x</b>", points: 99, solved: 3 }], error: null }; return { data: [{ points: 1, already: false }], error: null }; },
    } };
  }, signedIn);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + "/play/index.html"); return { ctx, page };
}

test("signed in: local solves are reported by level only (no points sent) and the board renders as text", async () => {
  const { ctx, page } = await open(true);
  await page.waitForFunction(() => window.__calls.filter((c) => c[0] === "submit_solve").length === 2, null, { timeout: 8000 });
  const calls = await page.evaluate(() => window.__calls.filter((c) => c[0] === "submit_solve").map((c) => c[1]));
  for (const a of calls) assert.deepEqual(Object.keys(a).sort(), ["p_game", "p_hinted", "p_level"]);
  assert.deepEqual(calls.map((a) => [a.p_game, a.p_level, a.p_hinted]), [["html", 1, false], ["html", 2, true]]);
  assert.equal(await page.locator("#lbList li span").first().innerText(), "<b>x</b>");
  assert.equal(await page.locator("#lbList b b").count(), 0);
  await ctx.close();
});

test("signed out: nothing is submitted, local points stay, a sign-in hint is shown", async () => {
  const { ctx, page } = await open(false);
  await page.waitForFunction(() => document.getElementById("lbMsg").textContent.length > 0, null, { timeout: 8000 });
  assert.equal(await page.evaluate(() => window.__calls.filter((c) => c[0] === "submit_solve").length), 0);
  assert.equal(await page.locator("#ghPoints").innerText(), "40");
  await ctx.close();
});
