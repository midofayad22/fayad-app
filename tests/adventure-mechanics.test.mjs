import { test } from "node:test";
import assert from "node:assert/strict";
import { run, solve } from "../js/game/adventure/engine.js";
import { LEVELS } from "../js/game/adventure/levels.js";

const F = { op: "F" }, L = { op: "L" }, R = { op: "R" };
const prog = (...main) => ({ main });
const r = (grid, ...main) => run({ grid }, prog(...main));

test("rocks, keys and doors: a door needs a key and uses it up", () => {
  assert.equal(r([">DG"], F, F).reason, "not-at-goal");
  assert.ok(r([">KDG"], F, F, F).ok);
  assert.equal(r([">KDDG"], F, F, F, F).atGoal, false);
});
test("crates fill water and become a bridge", () => {
  assert.equal(r([">~G"], F, F).reason, "water");
  assert.ok(r([">c~G"], F, F, F).ok);
  assert.equal(r([">c.G"], F).steps.at(-1).x, 1);
  assert.ok(r([">cG"], F).steps[1].bump, "a crate cannot be pushed onto the flag");
  assert.ok(r([">c#G"], F).steps[1].bump);
});
test("switch toggles gates; a second press closes them again", () => {
  assert.ok(r([">s=G"], F, F, F).ok);
  assert.equal(r([">=G"], F).steps.at(-1).bump, true);
  assert.equal(r([">s<=G"], F, L, L, F, F, L, L, F, F).reason, "not-at-goal");
});
test("ice slides until something stops the hero", () => {
  const res = r([">iii#G"], F);
  assert.equal(res.steps.at(-1).x, 3);
  assert.ok(res.steps.at(-1).path.length >= 3);
});
test("timed spikes follow the tick parity", () => {
  assert.equal(r([">TG"], F).reason, "spikes");
  assert.ok(r([">tG"], F, F).ok);
  assert.ok(r([">tTG"], F, F, F).ok, "phases alternate along the corridor");
  assert.equal(r([">TtG"], F, F, F).reason, "spikes");
});
test("portals keep the heading", () => {
  const res = r([">1#2G"], F, F);
  assert.ok(res.ok, res.reason);
});
test("optional stars never block the goal and are counted", () => {
  const res = r([">*G"], F, F);
  assert.ok(res.ok); assert.equal(res.bonus, 1); assert.equal(res.bonusTotal, 1);
  assert.equal(r([">.G*"], F, F).bonus, 0);
});
test("new conditions: dangerAhead and crateAhead", () => {
  assert.ok(r([">~."], { op: "if", cond: "dangerAhead", then: [R], else: [F] }).steps.at(-1).dir === 2);
  assert.ok(r([">c."], { op: "if", cond: "crateAhead", then: [L], else: [R] }).steps.at(-1).dir === 0);
});
test("reference solutions are shortest or structured, and mechanic levels really need their mechanic", () => {
  const rooms = LEVELS.filter((l) => l.kind === "room");
  assert.ok(rooms.length >= 40);
  for (const l of rooms.slice(0, 40)) {
    const best = solve(l, { limit: 150000 });
    assert.equal(l.solution.main.length, best.length, `level ${l.id} reference is not optimal`);
  }
  const tags = new Set(LEVELS.flatMap((l) => l.tags));
  for (const t of ["door", "bridge", "switch", "ice", "portal", "timed", "spikes", "stars", "gems", "rocks"]) assert.ok(tags.has(t), "missing mechanic " + t);
});
test("consecutive levels do not all repeat the same mechanic", () => {
  for (let i = 0; i + 3 < LEVELS.length; i++) {
    const w = LEVELS.slice(i, i + 4).filter((l) => l.world === LEVELS[i].world);
    if (w.length < 4) continue;
    const sig = new Set(w.map((l) => l.tags.join("+")));
    assert.ok(sig.size >= 2 || w[0].world <= 2, `levels ${w[0].id}-${w[3].id} look identical`);
  }
});
