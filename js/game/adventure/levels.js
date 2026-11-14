/*
  FAYAD Grand Adventure — 120 levels (6 worlds x 20), generated deterministically (seeded) so they never change between
  releases. Every level ships a reference solution; tests/adventure.test.mjs runs all 120 through the engine, so every
  level is provably solvable, within its block budget, and uses only the blocks it unlocks.
*/
import { run, sizeOf } from "./engine.js";

export const WORLDS = [
  { id: 1, ar: "التسلسل", en: "Sequences", blocks: ["F", "L", "R"] },
  { id: 2, ar: "المفاتيح والفخاخ", en: "Keys and traps", blocks: ["F", "L", "R"] },
  { id: 3, ar: "الحلقات", en: "Loops", blocks: ["F", "L", "R", "repeat"] },
  { id: 4, ar: "الشروط", en: "Conditions", blocks: ["F", "L", "R", "repeat", "until", "if"] },
  { id: 5, ar: "الدوال", en: "Functions", blocks: ["F", "L", "R", "repeat", "call"] },
  { id: 6, ar: "الإتقان", en: "Mastery", blocks: ["F", "L", "R", "repeat", "until", "if", "call"] },
];
export const LEVELS_PER_WORLD = 20;

function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const F = { op: "F" }, L = { op: "L" }, R = { op: "R" };
const rep = (n, body) => ({ op: "repeat", n, body });
const ifc = (cond, then, els = []) => ({ op: "if", cond, then, else: els });
const until = (body) => ({ op: "until", body });
const call = { op: "call" };

/* ---------- open-field levels: the grid is cropped around the reference path ---------- */
function openLevel(program, r, { keys = 0, hazards = 0, margin = 1 } = {}) {
  const N = 70, rows = Array.from({ length: N }, () => ".".repeat(N));
  const startDir = Math.floor(r() * 4);
  const probe = { grid: rows.map((row, y) => (y === 35 ? row.slice(0, 35) + "^>v<"[startDir] + row.slice(36) : row)).map((row, y) => (y === 0 ? row.slice(0, 1) + "G" + row.slice(2) : row)) };
  const res = run(probe, program);
  const cells = res.steps.map((s) => [s.x, s.y]);
  const xs = cells.map((c) => c[0]), ys = cells.map((c) => c[1]);
  const x0 = Math.min(...xs) - margin, x1 = Math.max(...xs) + margin, y0 = Math.min(...ys) - margin, y1 = Math.max(...ys) + margin;
  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  const g = Array.from({ length: h }, () => Array(w).fill("."));
  const path = [], seen = new Set();
  for (const [x, y] of cells) { const k = x + "," + y; if (!seen.has(k)) { seen.add(k); path.push([x - x0, y - y0]); } }
  const [sx, sy] = path[0], [gx, gy] = path[path.length - 1];
  const free = (x, y) => !seen.has((x + x0) + "," + (y + y0));
  const near = (x, y, c) => c.some(([a, b]) => Math.abs(a - x) + Math.abs(b - y) <= 1);
  // keys on path cells (not start / goal)
  const mid = path.slice(1, -1); for (let i = 0; i < keys && mid.length; i++) { const j = Math.floor(r() * mid.length); const [kx, ky] = mid.splice(j, 1)[0]; g[ky][kx] = "k"; }
  // hazards on free cells (never next to the start)
  let tries = 0; for (let i = 0; i < hazards && tries < 400; tries++) { const x = Math.floor(r() * w), y = Math.floor(r() * h); if (free(x, y) && g[y][x] === "." && Math.abs(x - sx) + Math.abs(y - sy) > 1 && !(x === gx && y === gy)) { g[y][x] = "x"; i++; } }
  g[gy][gx] = "G"; g[sy][sx] = "^>v<"[startDir];
  // a heading that points at the first move would be ideal; the reference path already starts in startDir
  return g.map((row) => row.join(""));
}

/* ---------- corridor levels (walls everywhere except the path) ---------- */
function corridor(cellsList, startDir, keys, r) {
  const xs = cellsList.map((c) => c[0]), ys = cellsList.map((c) => c[1]);
  const x0 = Math.min(...xs) - 1, y0 = Math.min(...ys) - 1, w = Math.max(...xs) - x0 + 2, h = Math.max(...ys) - y0 + 2;
  const g = Array.from({ length: h }, () => Array(w).fill("#"));
  cellsList.forEach(([x, y]) => (g[y - y0][x - x0] = "."));
  const mid = cellsList.slice(1, -1).map(([x, y]) => [x - x0, y - y0]);
  for (let i = 0; i < keys && mid.length; i++) { const j = Math.floor(r() * mid.length); const [kx, ky] = mid.splice(j, 1)[0]; g[ky][kx] = "k"; }
  const [sx, sy] = [cellsList[0][0] - x0, cellsList[0][1] - y0], [gx, gy] = [cellsList.at(-1)[0] - x0, cellsList.at(-1)[1] - y0];
  g[gy][gx] = "G"; g[sy][sx] = "^>v<"[startDir];
  return g.map((row) => row.join(""));
}
const D = [[0, -1], [1, 0], [0, 1], [-1, 0]];
/** square spiral inward; turn = +1 (right) or -1 (left) */
function spiral(size, turn) {
  const vis = new Set(), cells = [[0, 0]]; vis.add("0,0"); let x = 0, y = 0, d = 1;
  const inb = (a, b) => a >= 0 && b >= 0 && a < size && b < size;
  const okc = (a, b, dd) => inb(a, b) && !vis.has(a + "," + b) && !(inb(a + D[dd][0], b + D[dd][1]) && vis.has((a + D[dd][0]) + "," + (b + D[dd][1])));
  for (;;) {
    let nx = x + D[d][0], ny = y + D[d][1];
    if (!okc(nx, ny, d)) { d = (d + (turn > 0 ? 1 : 3)) % 4; nx = x + D[d][0]; ny = y + D[d][1]; if (!okc(nx, ny, d)) break; }
    x = nx; y = ny; vis.add(x + "," + y); cells.push([x, y]);
  }
  return { cells, startDir: 1 };
}
/** random corridor with no branches: a new cell may only touch the previous cell */
function snake(len, r) {
  for (let attempt = 0; attempt < 200; attempt++) {
    const vis = new Map(), cells = [[0, 0]]; vis.set("0,0", 1); let x = 0, y = 0, d = 1, straight = 0;
    const touches = (a, b, from) => D.some(([dx, dy]) => { const k = (a + dx) + "," + (b + dy); return vis.has(k) && k !== from; });
    while (cells.length < len) {
      const opts = []; for (const t of [0, 0, 1, 3]) { const dd = (d + t) % 4; if (t !== 0 || straight < 6) opts.push(dd); }
      let moved = false;
      for (const dd of opts.sort(() => r() - 0.5)) {
        const nx = x + D[dd][0], ny = y + D[dd][1]; if (vis.has(nx + "," + ny) || touches(nx, ny, x + "," + y)) continue;
        straight = dd === d ? straight + 1 : 0; d = dd; x = nx; y = ny; vis.set(x + "," + y, 1); cells.push([x, y]); moved = true; break;
      }
      if (!moved) break;
    }
    const xs = cells.map((c) => c[0]), ys = cells.map((c) => c[1]);
    if (cells.length >= len && Math.max(...xs) - Math.min(...xs) <= 16 && Math.max(...ys) - Math.min(...ys) <= 16) return { cells, startDir: 1 };
  }
  throw new Error("snake generation failed");
}
/** the first move must face along the corridor: orient the start toward cells[1] */
function faceFirst(cells) { const [a, b] = [cells[0], cells[1]]; const dx = b[0] - a[0], dy = b[1] - a[1]; return D.findIndex(([x, y]) => x === dx && y === dy); }

const solvePattern = { snake: until([ifc("wallAhead", [ifc("openRight", [R], [L])], [F])]), spiralR: until([ifc("wallAhead", [R], [F])]), spiralL: until([ifc("wallAhead", [L], [F])]) };

/* ---------- world builders ---------- */
function walkProgram(len, r, turnBias) {
  const out = []; let straight = 0;
  for (let i = 0; i < len; i++) {
    if (straight >= 1 && r() < turnBias) { out.push(r() < 0.5 ? L : R); straight = 0; }
    out.push(F); straight++;
  }
  return out;
}
function world1(i, r) { const prog = walkProgram(3 + Math.floor(i * 0.9), r, 0.35 + i * 0.01); return { program: { main: prog }, grid: openLevel({ main: prog }, r, { margin: 1 }) }; }
function world2(i, r) { const prog = walkProgram(6 + Math.floor(i * 0.9), r, 0.4); const keys = 1 + Math.floor(i / 6), hz = 1 + Math.floor(i / 2); return { program: { main: prog }, grid: openLevel({ main: prog }, r, { keys, hazards: Math.min(hz, 12), margin: 2 }) }; }
const UNITS = [[F, R, F, L], [F, F, R, F, L], [F, F, L, F, R], [F, L, F, F, R], [F, R, F, R, F, L, F, L]];
function world3(i, r, withHazards) {
  const u = i % UNITS.length; let unit = UNITS[u], n = 3 + Math.floor(i / 4) + (i % 3);
  if (i >= 12 && i % 2 === 1) unit = [rep(2 + (i % 3), [F]), R, F, L];
  const dx = 2 + Math.floor(i / 6); n = Math.min(9, Math.max(3, Math.min(n, Math.floor(18 / dx))));
  const main = [rep(n, unit)];
  return { program: { main }, grid: openLevel({ main }, r, withHazards ? { keys: 1 + (i % 4), hazards: 3 + Math.floor(i / 2), margin: 2 } : { keys: i > 8 ? 1 + (i % 3) : 0, margin: 1 }) };
}
function world4(i, r) {
  if (i < 10) { const size = 5 + Math.floor(i * 0.9), t = i % 2 ? -1 : 1; const s = spiral(size, t); const g = corridor(s.cells, s.startDir, i > 5 ? 1 + (i % 3) : 0, r); return { program: { main: [t > 0 ? solvePattern.spiralR : solvePattern.spiralL] }, grid: g }; }
  const s = snake(14 + (i - 10) * 3, r); const sd = faceFirst(s.cells); return { program: { main: [solvePattern.snake] }, grid: corridor(s.cells, sd, i > 14 ? 1 + (i % 3) : 0, r) };
}
function world5(i, r) {
  const FN = [[F, F, R], [F, R, F, L], [F, F, R, F], [rep(2, [F]), R, F], [F, R, F, R, F, L], [rep(3, [F]), L]];
  const X = [[L], [R], [F], [R, F], [L, F], [F, F]];
  const fn = FN[i % FN.length], x = X[(i * 3 + Math.floor(r() * X.length)) % X.length], k = Math.min(6, 3 + Math.floor(i / 5) + (i % 2));
  const main = []; for (let j = 0; j < k; j++) { main.push(call); if (j < k - 1) main.push(...x); }
  const prog = { main, fn };
  return { program: prog, grid: openLevel(prog, r, { keys: i > 7 ? 1 + (i % 3) : 0, hazards: i > 11 ? 2 + (i % 5) : 0, margin: 2 }) };
}
function world6(i, r) {
  if (i < 10) return world3(i + 5, r, true);
  const s = snake(30 + (i - 10) * 4, r); const sd = faceFirst(s.cells); return { program: { main: [solvePattern.snake] }, grid: corridor(s.cells, sd, 2 + (i % 4), r) };
}
const BUILD = [world1, world2, (i, r) => world3(i, r, false), world4, world5, world6];

function make() {
  const out = [];
  WORLDS.forEach((w, wi) => {
    for (let i = 0; i < LEVELS_PER_WORLD; i++) {
      const id = wi * LEVELS_PER_WORLD + i + 1;
      let program, grid;
      for (let attempt = 0; attempt < 60; attempt++) {
        const r = rng(0xfa7ad * (wi + 1) + i * 977 + attempt * 7919);
        const b = BUILD[wi](i, r); program = b.program; grid = b.grid;
        const rows = grid.length, cols = grid[0].length;
        const find = (ch) => { for (let y = 0; y < rows; y++) { const x = [...grid[y]].findIndex((c) => ch.includes(c)); if (x >= 0) return [x, y]; } };
        const s0 = find("^>v<"), g0 = find("G");
        if (s0 && g0 && rows <= 24 && cols <= 24 && run({ grid }, program).ok) break;
        program = null;
      }
      if (!program) throw new Error("level " + id + " could not be generated");
      const par = sizeOf(program);
      // levels from world 3 on cap the total number of blocks at the reference size (+ headroom while learning)
      const budget = wi >= 2 ? par + (wi === 2 && i < 4 ? 2 : 0) + (wi >= 3 && i < 3 ? 2 : 0) : 0;
      out.push({ id, world: w.id, n: i + 1, grid, blocks: w.blocks, hasFn: w.blocks.includes("call"), par, budget, solution: program, base: 8 + 2 * w.id });
    }
  });
  return out;
}
export const LEVELS = make();
