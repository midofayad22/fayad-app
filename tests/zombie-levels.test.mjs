import { test } from "node:test";
import assert from "node:assert/strict";
import { analyze, POLICIES } from "../tools/zombie/analyze.mjs";
import { LEVELS } from "../js/game/zombie/levels.js";
import { run, validate, MAX_TURNS } from "../js/game/zombie/engine.js";
import { compile, HELPER_DOCS } from "../js/game/zombie/helpers.js";

const A = analyze();
test("15 levels with ids 1..15 and server-compatible base points", () => {
  assert.equal(LEVELS.length, 15);
  LEVELS.forEach((l, i) => { assert.equal(l.id, i + 1); assert.equal(l.base, 11 + i); assert.ok(l.name.ar && l.name.en && l.brief.en && l.concept.en); assert.ok(l.hints.length >= 2); assert.ok(validate(l, l.starter).ok); });
});
test("every reference solution is real JavaScript and wins its level", () => {
  for (const a of A) assert.ok(a.ref.ok, `level ${a.id} reference failed: ${a.ref.error || ""}`);
});
test("references earn at least 2 stars; bonus objectives are reachable on most levels", () => {
  for (const a of A) assert.ok(a.ref.stars >= 2 || a.ref.bonus, `level ${a.id}`);
  assert.ok(A.filter((a) => a.ref.bonus).length >= 11);
});
test("waiting does not win any level", () => { for (const a of A) assert.equal(a.strategies["wait only"], false, "level " + a.id); });
test("walking to the exit never wins an escort / exit level", () => { for (const a of A) assert.equal(a.strategies["exit rusher"], false, "level " + a.id); });
test("the generic nearest-first fighter fails on at least 7 levels (tactics matter)", () => {
  const fails = A.filter((a) => !a.strategies["nearest-first fighter"]).length; assert.ok(fails >= 7, "fails " + fails);
  for (const id of [3, 5, 6, 7, 9, 13, 14]) assert.equal(A[id - 1].strategies["nearest-first fighter"], false, "level " + id);
});
test("level goals and mechanics are varied", () => {
  const goals = new Set(LEVELS.map((l) => l.goal)); for (const g of ["clear", "survive", "exit", "escort"]) assert.ok(goals.has(g), g);
  const all = new Set(A.flatMap((a) => a.mechanics)); for (const m of ["runner", "brute", "spitter", "barricades", "traps", "medkit", "allies", "noise", "waves"]) assert.ok(all.has(m), m);
  const sig = new Set(A.map((a) => a.mechanics.join("|"))); assert.ok(sig.size >= 13, "distinct mechanic sets: " + sig.size);
  assert.ok(new Set(LEVELS.map((l) => l.solution)).size === 15, "every level has its own reference");
});
test("reference solutions use progressively richer JavaScript", () => {
  const f = (re) => LEVELS.findIndex((l) => re.test(l.solution)) + 1;
  assert.equal(f(/\.find\(/) >= 3 && f(/\.find\(/) <= 5, true); assert.ok(f(/&&/) <= 5); assert.ok(f(/\.some\(/) <= 13); assert.ok(f(/Math\.abs/) >= 10); assert.ok(f(/s\.me\.noise/) >= 7);
});
test("a bug in learner code stops the run with a readable error and the helpers are documented", () => {
  const act = compile("function act(s) { return s.nope.deep; }"); const r = run(LEVELS[0], (v) => act(v)); assert.equal(r.ok, false); assert.equal(r.reason, "error"); assert.match(r.error, /deep|undefined/);
  assert.ok(HELPER_DOCS.length >= 4);
});
test("engine is deterministic and bounded", () => {
  const act = compile(LEVELS[11].solution); const a = run(LEVELS[11], (v) => act(v)), b = run(LEVELS[11], (v) => act(v));
  assert.deepEqual(a.stats, b.stats); assert.ok(a.turns <= MAX_TURNS);
});
test("an invalid action string never crashes the engine", () => {
  for (const bad of [null, undefined, 42, "fly", "move up", "throw", {}]) { const r = run(LEVELS[0], () => bad); assert.equal(r.ok, false); }
});
test("POLICIES export exists", () => assert.ok(Object.keys(POLICIES).length >= 5));
