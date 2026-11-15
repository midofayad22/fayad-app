/*
  FAYAD Grand Adventure — 120 levels (6 worlds x 20). The boards and their reference solutions are generated offline by
  tools/adventure/gen.mjs (every board is solved with the real engine, rooms by exhaustive search) and stored in
  levels-data.js, so levels never change between releases. tests/adventure-levels.test.mjs runs all 120 reference
  solutions through the engine: each level is provably solvable, within its block budget, and uses only unlocked blocks.

  Level fields: id, world, n, grid, tags (the mechanics it teaches), kind (room | course | boss), blocks, hasFn, par,
  budget (0 = unlimited), bonus (optional stars on the board), solution, base (points, see store.js).
*/
import { sizeOf } from "./engine.js";
import { DATA } from "./levels-data.js";

export const WORLDS = [
  { id: 1, ar: "التسلسل", en: "Sequences", blocks: ["F", "L", "R"] },
  { id: 2, ar: "المفاتيح والفخاخ", en: "Keys and traps", blocks: ["F", "L", "R"] },
  { id: 3, ar: "الحلقات", en: "Loops", blocks: ["F", "L", "R", "repeat"] },
  { id: 4, ar: "الشروط", en: "Conditions", blocks: ["F", "L", "R", "repeat", "until", "if"] },
  { id: 5, ar: "الدوال", en: "Functions", blocks: ["F", "L", "R", "repeat", "call"] },
  { id: 6, ar: "الإتقان", en: "Mastery", blocks: ["F", "L", "R", "repeat", "until", "if", "call"] },
];
export const LEVELS_PER_WORLD = 20;

export const LEVELS = DATA.map((d) => {
  const w = WORLDS[d.world - 1], par = sizeOf(d.solution), i = d.n - 1, wi = d.world - 1;
  const budget = wi >= 2 ? par + (wi === 2 && i < 4 ? 2 : 0) + (wi >= 3 && i < 3 ? 2 : 0) + (d.slack || 0) : 0;
  return { id: d.id, world: d.world, n: d.n, grid: d.grid, tags: d.tags, kind: d.kind, blocks: w.blocks, hasFn: w.blocks.includes("call"), par, budget, bonus: d.bonus, solution: d.solution, base: 8 + 2 * d.world };
});
