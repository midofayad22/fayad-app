/*
  FAYAD Grand Adventure — pure engine (no DOM). A hero walks a grid; the player builds a program from blocks.

  Program (a tree, plain JSON):
    { op: "F" }                       move one cell forward (pushes a crate, opens a door with a key, may slide on ice)
    { op: "L" } | { op: "R" }          turn left / right
    { op: "repeat", n: 2..9, body: [] }
    { op: "until", body: [] }          repeat the body until the hero stands on the goal (max 200 loops)
    { op: "if", cond, then: [], else: [] }   cond: wallAhead | openAhead | openLeft | openRight | dangerAhead | crateAhead
    { op: "call" }                     run the single user function ("fn" block list)
  A program is { main: [], fn: [] }.

  Map legend
    #  rock / wall                  .  floor                     G  goal flag (needs every gem)
    k  gem (required)               *  star (optional bonus)     K  brass key        D  locked door (uses one key)
    x  spikes (deadly)              ~  water (deadly; a crate pushed into it makes a bridge)
    T  timed spikes, up on odd ticks   t  timed spikes, up on even ticks   (a tick = one executed F / L / R)
    c  crate (pushed by F)          i  ice (the hero keeps sliding)
    s  pressure switch (toggles every gate)   =  gate, closed until the switch is pressed (a second press closes it)
    1 2  portal pair (entering one leaves from the other, same heading)
    ^ > v <  hero start (heading N/E/S/W)

  A run is deterministic and returns { ok, reason, steps, keysLeft, bonus, bonusTotal, ... }; every step carries
  { x, y, dir, keys, held, tick, ev: [events], path?: [[x,y]...] } so the UI can animate exactly what the engine decided.
*/
export const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // N, E, S, W
export const MAX_STEPS = 600;
export const CONDS = ["wallAhead", "openAhead", "openLeft", "openRight", "dangerAhead", "crateAhead"];

/** Size of a program for the block budget: every block counts 1, containers add their bodies; fn counted once. */
export function sizeOf(p) {
  const n = (list) => list.reduce((a, b) => a + 1 + (b.body ? n(b.body) : 0) + (b.then ? n(b.then) : 0) + (b.else ? n(b.else) : 0), 0);
  return n(p.main || []) + n(p.fn || []);
}

export function parseGrid(rows) {
  const g = { w: rows[0].length, h: rows.length, wall: new Set(), key: new Set(), hazard: new Set(), water: new Set(), door: new Set(), crate: new Set(), ice: new Set(),
    gem: new Set(), brass: new Set(), star: new Set(), sw: new Set(), gate: new Set(), tUp: new Set(), tDown: new Set(), portal: {}, start: null, goal: null };
  rows.forEach((row, y) => [...row].forEach((c, x) => {
    const id = y * g.w + x;
    if (c === "#") g.wall.add(id);
    else if (c === "k") { g.key.add(id); g.gem.add(id); }
    else if (c === "x") g.hazard.add(id);
    else if (c === "~") g.water.add(id);
    else if (c === "D") g.door.add(id);
    else if (c === "K") g.brass.add(id);
    else if (c === "*") g.star.add(id);
    else if (c === "c") g.crate.add(id);
    else if (c === "i") g.ice.add(id);
    else if (c === "s") g.sw.add(id);
    else if (c === "=") g.gate.add(id);
    else if (c === "T") g.tUp.add(id);
    else if (c === "t") g.tDown.add(id);
    else if (c === "1" || c === "2") (g.portal[c] = g.portal[c] || []).push(id);
    else if (c === "G") g.goal = { x, y };
    else if ("^>v<".includes(c)) g.start = { x, y, dir: "^>v<".indexOf(c) };
  }));
  return g;
}

/* ---------- state + single actions (shared by run() and the offline level solver) ---------- */
export function initState(g) {
  return { x: g.start.x, y: g.start.y, dir: g.start.dir, tick: 0, held: 0, gems: new Set(g.gem), brass: new Set(g.brass), stars: new Set(g.star),
    doors: new Set(g.door), crates: new Set(g.crate), water: new Set(g.water), gateOpen: false, dead: null };
}
export function cloneState(s) { return { ...s, gems: new Set(s.gems), brass: new Set(s.brass), stars: new Set(s.stars), doors: new Set(s.doors), crates: new Set(s.crates), water: new Set(s.water) }; }
export function keyOf(s) {
  const j = (set) => [...set].sort((a, b) => a - b).join(",");
  return `${s.x},${s.y},${s.dir},${s.tick & 1},${s.held}|${j(s.gems)}|${j(s.brass)}|${j(s.stars)}|${j(s.doors)}|${j(s.crates)}|${j(s.water)}|${s.gateOpen ? 1 : 0}`;
}
const inb = (g, x, y) => x >= 0 && y >= 0 && x < g.w && y < g.h;
const timedUp = (g, id, tick) => (g.tUp.has(id) && tick % 2 === 1) || (g.tDown.has(id) && tick % 2 === 0);
const gateBlocks = (g, s, id) => g.gate.has(id) && !s.gateOpen;

/** can the hero enter (nx,ny) heading d? (a crate must have room to be pushed; a door needs a key) */
function canEnter(g, s, nx, ny, d) {
  if (!inb(g, nx, ny)) return false;
  const id = ny * g.w + nx;
  if (g.wall.has(id) || gateBlocks(g, s, id)) return false;
  if (s.doors.has(id)) return s.held > 0;
  if (s.crates.has(id)) {
    const bx = nx + DIRS[d][0], by = ny + DIRS[d][1];
    if (!inb(g, bx, by)) return false;
    const b = by * g.w + bx;
    if (g.wall.has(b) || s.crates.has(b) || s.doors.has(b) || gateBlocks(g, s, b) || g.sw.has(b) || (g.goal && g.goal.x === bx && g.goal.y === by)) return false;
    if (g.hazard.has(b) || g.portal["1"]?.includes(b) || g.portal["2"]?.includes(b)) return false;
    return true;
  }
  return true;
}
const danger = (g, s, id, tick) => s.water.has(id) || g.hazard.has(id) || timedUp(g, id, tick);

export function sense(g, s, c) {
  const at = (rel) => { const d = (s.dir + rel + 4) % 4; return [s.x + DIRS[d][0], s.y + DIRS[d][1], d]; };
  const free = (rel) => { const [nx, ny, d] = at(rel); return canEnter(g, s, nx, ny, d); };
  if (c === "wallAhead") return !free(0);
  if (c === "openAhead") return free(0);
  if (c === "openLeft") return free(3);
  if (c === "openRight") return free(1);
  if (c === "dangerAhead") { const [nx, ny] = at(0); return inb(g, nx, ny) && danger(g, s, ny * g.w + nx, s.tick + 1); }
  if (c === "crateAhead") { const [nx, ny] = at(0); return inb(g, nx, ny) && s.crates.has(ny * g.w + nx); }
  return false;
}

function land(g, s, ev, path) {
  const id = s.y * g.w + s.x;
  if (s.gems.delete(id)) ev.push({ t: "gem", x: s.x, y: s.y });
  if (s.brass.delete(id)) { s.held++; ev.push({ t: "key", x: s.x, y: s.y }); }
  if (s.stars.delete(id)) ev.push({ t: "star", x: s.x, y: s.y });
  if (g.sw.has(id)) { s.gateOpen = !s.gateOpen; ev.push({ t: "switch", on: s.gateOpen, x: s.x, y: s.y }); }
  if (danger(g, s, id, s.tick)) { s.dead = s.water.has(id) ? "water" : g.hazard.has(id) ? "hazard" : "spikes"; ev.push({ t: "dead", x: s.x, y: s.y, why: s.dead }); }
}

/** one action: "F" | "L" | "R". Returns the step record (mutates s). */
export function act(g, s, a) {
  const ev = []; let bump = false, path = null;
  s.tick++;
  if (a === "L" || a === "R") s.dir = (s.dir + (a === "L" ? 3 : 1)) % 4;
  else {
    const nx = s.x + DIRS[s.dir][0], ny = s.y + DIRS[s.dir][1];
    if (!canEnter(g, s, nx, ny, s.dir)) { bump = true; ev.push({ t: "bump", x: nx, y: ny }); }
    else {
      const id = ny * g.w + nx;
      if (s.doors.delete(id)) { s.held--; ev.push({ t: "door", x: nx, y: ny }); }
      if (s.crates.has(id)) {
        s.crates.delete(id);
        const bx = nx + DIRS[s.dir][0], by = ny + DIRS[s.dir][1], b = by * g.w + bx;
        if (s.water.has(b)) { s.water.delete(b); ev.push({ t: "fill", from: [nx, ny], to: [bx, by] }); } else { s.crates.add(b); ev.push({ t: "push", from: [nx, ny], to: [bx, by] }); }
      }
      s.x = nx; s.y = ny; land(g, s, ev);
      // portals: leave from the twin cell, same heading (not chained)
      const here = s.y * g.w + s.x;
      for (const k of ["1", "2"]) {
        const pair = g.portal[k === "1" ? "1" : "2"]; if (!pair) continue;
        const twin = k === "1" ? g.portal["2"]?.[0] : g.portal["1"]?.[0];
        if (!s.dead && pair.includes(here) && twin !== undefined) { ev.push({ t: "portal", from: [s.x, s.y], to: [twin % g.w, Math.floor(twin / g.w)] }); s.x = twin % g.w; s.y = Math.floor(twin / g.w); break; }
      }
      // ice: keep sliding while standing on ice and the next cell is free
      if (!s.dead && g.ice.has(s.y * g.w + s.x)) {
        path = [[s.x, s.y]];
        for (let n = 0; n < 30; n++) {
          const sx = s.x + DIRS[s.dir][0], sy = s.y + DIRS[s.dir][1];
          if (!inb(g, sx, sy)) break; const sid = sy * g.w + sx;
          if (g.wall.has(sid) || s.crates.has(sid) || s.doors.has(sid) || gateBlocks(g, s, sid)) break;
          s.x = sx; s.y = sy; path.push([sx, sy]); ev.push({ t: "slide", x: sx, y: sy }); land(g, s, ev);
          if (s.dead || !g.ice.has(sid)) break;
        }
      }
    }
  }
  if (!s.dead) { const id = s.y * g.w + s.x; if (timedUp(g, id, s.tick)) { s.dead = "spikes"; ev.push({ t: "dead", x: s.x, y: s.y, why: "spikes" }); } }
  const rec = { x: s.x, y: s.y, dir: s.dir, keys: s.gems.size, held: s.held, tick: s.tick, ev };
  if (bump) rec.bump = true; if (path) rec.path = path;
  if (ev.some((e) => e.t === "gem" || e.t === "key" || e.t === "star")) rec.took = true;
  return rec;
}
export const atGoal = (g, s) => !!g.goal && s.x === g.goal.x && s.y === g.goal.y;

export function run(level, program) {
  const g = parseGrid(level.grid), s = initState(g);
  const steps = [{ x: s.x, y: s.y, dir: s.dir, keys: s.gems.size, held: 0, tick: 0, ev: [] }];
  let budget = MAX_STEPS, fnDepth = 0;
  const stack = [];
  function exec(list) {
    for (const b of list) {
      if (s.dead || budget <= 0) return;
      budget--; stack.push(b); one(b); stack.pop();
    }
  }
  function one(b) {
    if (b.op === "F" || b.op === "L" || b.op === "R") { const r = act(g, s, b.op); r.trail = stack.slice(); steps.push(r); }
    else if (b.op === "repeat") { for (let i = 0; i < Math.min(9, Math.max(1, b.n | 0)); i++) { exec(b.body || []); if (s.dead) return; } }
    else if (b.op === "until") { let guard = 0; while (!atGoal(g, s) && !s.dead && budget > 0 && guard++ < 200) exec(b.body || []); }
    else if (b.op === "if") exec(sense(g, s, b.cond) ? b.then || [] : b.else || []);
    else if (b.op === "call") { if (fnDepth < 1) { fnDepth++; exec(program.fn || []); fnDepth--; } }
  }
  const total = g.star.size;
  exec(program.main || []);
  const ok = !s.dead && atGoal(g, s) && s.gems.size === 0;
  return { ok, reason: s.dead || (!atGoal(g, s) ? "not-at-goal" : s.gems.size ? "keys-left" : null), steps, keysLeft: s.gems.size, atGoal: atGoal(g, s), exhausted: budget <= 0, goal: g.goal,
    bonus: total - s.stars.size, bonusTotal: total, held: s.held };
}

/** Replay a plain action string ("FFLRF…") — used by the real-JavaScript mode, whose sandbox only reports the actions the learner's code asked for.
    The host re-simulates them here, so the sandbox is never trusted with the outcome. Same result shape as run(). */
export function runActions(level, actions) {
  const g = parseGrid(level.grid), s = initState(g);
  const steps = [{ x: s.x, y: s.y, dir: s.dir, keys: s.gems.size, held: 0, tick: 0, ev: [] }];
  let n = 0;
  for (const a of String(actions).slice(0, MAX_STEPS)) {
    if (s.dead || !"FLR".includes(a)) break;
    const r = act(g, s, a); r.trail = [{ op: a }]; steps.push(r); n++;
  }
  const total = g.star.size, ok = !s.dead && atGoal(g, s) && s.gems.size === 0;
  return { ok, reason: s.dead || (!atGoal(g, s) ? "not-at-goal" : s.gems.size ? "keys-left" : null), steps, keysLeft: s.gems.size, atGoal: atGoal(g, s), exhausted: n >= MAX_STEPS, goal: g.goal,
    bonus: total - s.stars.size, bonusTotal: total, held: s.held };
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

/** Offline helper (level generator + tests): breadth-first search for the shortest F/L/R sequence that wins. */
export function solve(level, { stars: wantStars = false, limit = 400000 } = {}) {
  const g = parseGrid(level.grid), s0 = initState(g);
  const seen = new Map([[keyOf(s0), null]]); let frontier = [{ s: s0, path: "" }], n = 0;
  while (frontier.length) {
    const next = [];
    for (const { s, path } of frontier) {
      for (const a of "FLR") {
        const c = cloneState(s); act(g, c, a); if (c.dead) continue;
        const k = keyOf(c); if (seen.has(k)) continue; seen.set(k, 1);
        const p = path + a;
        if (atGoal(g, c) && c.gems.size === 0 && (!wantStars || c.stars.size === 0)) return p;
        if (++n > limit) return null;
        next.push({ s: c, path: p });
      }
    }
    frontier = next;
  }
  return null;
}
