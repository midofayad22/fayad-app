import { test } from "node:test";
import assert from "node:assert/strict";
import { LEVELS } from "../js/game/zombie/levels.js";
import { run, validate, stars } from "../js/game/zombie/engine.js";

test("15 levels; every reference solution is valid, wins and earns 3 stars", () => {
  assert.equal(LEVELS.length, 15);
  for (const l of LEVELS) {
    assert.ok(validate(l, l.solution).ok, `level ${l.id} reference invalid`);
    const r = run(l, l.solution);
    assert.ok(r.ok, `level ${l.id} reference loses: ${r.reason}`);
    assert.equal(stars(l, l.solution), 3);
  }
});
test("the engine is deterministic", () => {
  for (const l of LEVELS) assert.deepEqual(run(l, l.solution), run(l, l.solution));
});
test("doing nothing never wins, and late levels need more than melee alone", () => {
  for (const l of LEVELS) assert.equal(run(l, [{ if: "always", do: "wait" }]).ok, false, `level ${l.id} is won by waiting`);
  const late = LEVELS.filter((l) => l.id >= 9 && l.actions.includes("shoot"));
  assert.ok(late.some((l) => !run(l, [{ if: "adjacent", do: "melee" }, { if: "always", do: "wait" }]).ok), "melee alone should fail somewhere late");
});
test("rules are validated: locked actions, empty and over-budget lists are refused", () => {
  const l = LEVELS[0];
  assert.equal(validate(l, []).reason, "empty");
  assert.equal(validate(l, [{ if: "always", do: "heal" }]).reason, "locked-action");
  assert.equal(validate(l, [{ if: "x", do: "wait" }]).reason, "bad-rule");
  assert.equal(validate(l, Array(9).fill({ if: "always", do: "wait" })).reason, "budget");
});
