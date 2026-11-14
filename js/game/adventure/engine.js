/*
  FAYAD Grand Adventure — pure engine (no DOM). A hero walks a grid; the player builds a program from blocks.

  Program (a tree, plain JSON):
    { op: "F" }                       move one cell forward (blocked by walls / the border; collects a key; hazards end the run)
    { op: "L" } | { op: "R" }          turn left / right
    { op: "repeat", n: 2..9, body: [] }
    { op: "until", body: [] }          repeat the body until the hero stands on the goal (max 200 loops)
    { op: "if", cond: "wallAhead"|"openLeft"|"openRight"|"openAhead", then: [], else: [] }
    { op: "call" }                     run the single user function ("fn" block list)
  A program is { main: [], fn: [] }.

  A run is deterministic and returns { ok, reason, steps: [{x,y,dir,keys}], goal, keysLeft }.
*/
export const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // N, E, S, W
export const MAX_STEPS = 600;

/** Size of a program for the block budget: every block counts 1, containers add their bodies; fn counted once. */
export function sizeOf(p) {
  const n = (list) => list.reduce((a, b) => a + 1 + (b.body ? n(b.body) : 0) + (b.then ? n(b.then) : 0) + (b.else ? n(b.else) : 0), 0);
  return n(p.main || []) + n(p.fn || []);
}

export function parseGrid(rows) {
  const g = { w: rows[0].length, h: rows.length, wall: new Set(), key: new Set(), hazard: new Set(), start: null, goal: null };
  rows.forEach((row, y) => [...row].forEach((c, x) => {
    const id = y * g.w + x;
    if (c === "#") g.wall.add(id);
    else if (c === "k") g.key.add(id);
    else if (c === "x") g.hazard.add(id);
    else if (c === "G") g.goal = { x, y };
    else if ("^>v<".includes(c)) g.start = { x, y, dir: "^>v<".indexOf(c) };
  }));
  return g;
}

export function run(level, program) {
  const g = parseGrid(level.grid);
  const keys = new Set(g.key);
  let { x, y, dir } = g.start;
  const steps = [{ x, y, dir, keys: keys.size }];
  let budget = MAX_STEPS, dead = null, fnDepth = 0;

  const open = (dx) => { const d = (dir + dx + 4) % 4; const nx = x + DIRS[d][0], ny = y + DIRS[d][1]; return nx >= 0 && ny >= 0 && nx < g.w && ny < g.h && !g.wall.has(ny * g.w + nx); };
  const cond = (c) => (c === "wallAhead" ? !open(0) : c === "openAhead" ? open(0) : c === "openLeft" ? open(-1) : c === "openRight" ? open(1) : false);
  const atGoal = () => x === g.goal.x && y === g.goal.y;

  function exec(list) {
    for (const b of list) {
      if (dead || budget <= 0) return;
      budget--;
      if (b.op === "F") {
        if (!open(0)) { steps.push({ x, y, dir, keys: keys.size, bump: true }); continue; }
        x += DIRS[dir][0]; y += DIRS[dir][1];
        const id = y * g.w + x;
        keys.delete(id);
        if (g.hazard.has(id)) { dead = "hazard"; }
        steps.push({ x, y, dir, keys: keys.size });
      } else if (b.op === "L" || b.op === "R") { dir = (dir + (b.op === "L" ? 3 : 1)) % 4; steps.push({ x, y, dir, keys: keys.size }); }
      else if (b.op === "repeat") { for (let i = 0; i < Math.min(9, Math.max(1, b.n | 0)); i++) { exec(b.body || []); if (dead) return; } }
      else if (b.op === "until") { let guard = 0; while (!atGoal() && !dead && budget > 0 && guard++ < 200) exec(b.body || []); }
      else if (b.op === "if") exec(cond(b.cond) ? b.then || [] : b.else || []);
      else if (b.op === "call") { if (fnDepth < 1) { fnDepth++; exec(program.fn || []); fnDepth--; } }
    }
  }
  exec(program.main || []);
  const ok = !dead && atGoal() && keys.size === 0;
  return { ok, reason: dead || (!atGoal() ? "not-at-goal" : keys.size ? "keys-left" : null), steps, keysLeft: keys.size, atGoal: atGoal() };
}

/** Stars: 3 = within the level's par (the reference solution size), 2 = within 1.5x par, otherwise 1. */
export function stars(level, program) {
  const s = sizeOf(program);
  return s <= level.par ? 3 : s <= Math.ceil(level.par * 1.5) ? 2 : 1;
}
/** A level may restrict the blocks the player can use and cap total blocks. */
export function validate(level, program) {
  const s = sizeOf(program);
  if (level.budget && s > level.budget) return { ok: false, reason: "budget", size: s };
  const used = new Set();
  const walk = (l) => l.forEach((b) => { used.add(b.op); b.body && walk(b.body); b.then && walk(b.then); b.else && walk(b.else); });
  walk(program.main || []); walk(program.fn || []);
  for (const u of used) if (!level.blocks.includes(u)) return { ok: false, reason: "locked-block", op: u };
  return { ok: true, size: s };
}
