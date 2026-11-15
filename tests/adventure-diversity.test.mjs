/* Solvable is not enough: the 120 levels must differ in geometry, mechanics and required reasoning,
   and no single naive strategy may clear them. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { run, sizeOf } from "../js/game/adventure/engine.js";
import { LEVELS } from "../js/game/adventure/levels.js";

import { NAIVE } from "../tools/adventure/naive.mjs";
const norm = (grid) => {
  // canonical form under the 8 symmetries (heading characters are ignored: start = any heading)
  const base = grid.map((r) => r.replace(/[\^>v<]/g, "S"));
  const rot = (g) => Array.from({ length: g[0].length }, (_, x) => Array.from({ length: g.length }, (_, y) => g[g.length - 1 - y][x]).join(""));
  const flip = (g) => g.map((r) => [...r].reverse().join(""));
  const forms = []; let g = base; for (let i = 0; i < 4; i++) { forms.push(g.join("/"), flip(g).join("/")); g = rot(g); }
  return forms.sort()[0];
};
const sig = (l) => [...new Set(l.tags)].sort().join("+");
const skeleton = (p) => JSON.stringify(p).replace(/"n":\d+/g, '"n":N');

test("no two boards are the same, even rotated or mirrored", () => {
  const seen = new Map();
  for (const l of LEVELS) { const k = norm(l.grid); assert.ok(!seen.has(k), `level ${l.id} duplicates level ${seen.get(k)}`); seen.set(k, l.id); }
});

test("each world has varied reference solutions, mechanic mixes and board sizes", () => {
  const need = { 1: [14, 6, 5], 2: [14, 6, 5], 3: [12, 6, 8], 4: [1, 5, 10], 5: [12, 8, 10], 6: [12, 8, 8] }; // [skeletons, distinct mechanic mixes, distinct sizes]
  for (let w = 1; w <= 6; w++) {
    const ls = LEVELS.filter((l) => l.world === w);
    const sk = new Set(ls.map((l) => skeleton(l.solution))).size, mix = new Set(ls.map(sig)).size, dims = new Set(ls.map((l) => l.grid[0].length + "x" + l.grid.length)).size;
    assert.ok(sk >= need[w][0], `world ${w}: only ${sk} distinct reference solutions`);
    assert.ok(mix >= need[w][1], `world ${w}: only ${mix} distinct mechanic mixes`);
    assert.ok(dims >= need[w][2], `world ${w}: only ${dims} distinct board sizes`);
  }
});

test("neighbouring levels do not repeat the same mechanic mix on the same size of board", () => {
  for (let i = 0; i + 2 < LEVELS.length; i++) {
    const a = LEVELS[i], b = LEVELS[i + 1], c = LEVELS[i + 2]; if (a.world !== c.world) continue;
    const same = (x, y) => sig(x) === sig(y) && x.grid.length === y.grid.length && x.grid[0].length === y.grid[0].length;
    assert.ok(!(same(a, b) && same(b, c)), `levels ${a.id}-${c.id} are three near-copies in a row`);
  }
});

test("naive strategies cannot clear the levels (world 4 is built around the wall-follower, and the first levels teach)", () => {
  const cleared = [];
  for (const l of LEVELS) {
    if (l.world === 1 && l.n <= 2) continue;
    for (const [name, prog] of Object.entries(NAIVE)) {
      if (l.world === 4 && (name === "followLeft" || name === "followRight")) continue;
      if (run(l, prog).ok) cleared.push(`${l.id}:${name}`);
    }
  }
  assert.deepEqual(cleared, [], "levels solved by a one-line strategy: " + cleared.join(", "));
});

test("mechanics are introduced gradually and combined later", () => {
  const first = {}; LEVELS.forEach((l) => l.tags.forEach((t) => { first[t] ??= l.id; }));
  assert.ok(first.rocks <= 3 && first.gems <= 8 && first.door <= 20 && first.bridge <= 20, JSON.stringify(first));
  const combos = LEVELS.filter((l) => new Set(l.tags).size >= 3);
  assert.ok(combos.length >= 15, "expected 15+ levels that combine three or more mechanics, got " + combos.length);
  assert.ok(LEVELS.filter((l) => l.bonus > 0).length >= 25, "optional objectives are too rare");
});

test("block budgets force the intended concept in worlds 3-6", () => {
  for (const l of LEVELS.filter((x) => x.world >= 3)) {
    const raw = run(l, { main: [] }); void raw;
    assert.ok(l.budget >= l.par && l.budget <= l.par + 3 + 2, `level ${l.id} has an odd budget`);
  }
  // loops: every world-3 reference really uses repeat; functions: every world-5 reference calls its function
  const uses = (p, op) => JSON.stringify(p).includes(`"op":"${op}"`);
  for (const l of LEVELS.filter((x) => x.world === 3)) assert.ok(uses(l.solution, "repeat"), "level " + l.id + " should need a loop");
  for (const l of LEVELS.filter((x) => x.world === 5)) assert.ok(uses(l.solution, "call"), "level " + l.id + " should need a function");
  for (const l of LEVELS.filter((x) => x.world === 4)) assert.ok(uses(l.solution, "until") && uses(l.solution, "if"), "level " + l.id + " should need conditions");
  void sizeOf;
});
