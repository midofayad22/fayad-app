import { test } from "node:test";
import assert from "node:assert/strict";
import { LEVELS, WORLDS } from "../js/game/adventure/levels.js";
import { run, validate, stars } from "../js/game/adventure/engine.js";

test("120 levels, 20 per world", () => {
  assert.equal(LEVELS.length, 120);
  for (const w of WORLDS) assert.equal(LEVELS.filter((l) => l.world === w.id).length, 20);
});
test("every reference solution wins within its rules and earns 3 stars", () => {
  for (const l of LEVELS) {
    const res = run(l, l.solution);
    assert.ok(res.ok, `level ${l.id} failed: ${res.reason}`);
    const v = validate(l, l.solution);
    assert.ok(v.ok, `level ${l.id} invalid: ${v.reason}`);
    assert.equal(stars(l, l.solution), 3);
  }
});
test("levels are distinct and bounded", () => {
  const seen = new Set();
  for (const l of LEVELS) { seen.add(l.grid.join("/")); assert.ok(l.grid.length <= 24 && l.grid[0].length <= 24, `level ${l.id} too large`); }
  assert.ok(seen.size >= 110, "too many duplicate boards: " + seen.size);
});
