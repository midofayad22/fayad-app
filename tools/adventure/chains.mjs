/*
  Structured level families for worlds 3-6 (offline generator helpers).
    chainLevel  — a lane built from modules (door+key, crate+water, spikes, timed spikes, gem/star pockets). Repeating a module
                  makes loops worthwhile; mixing a few module types in the pattern A B A C A makes a function worthwhile.
                  Every chain is turned/mirrored at random so no two boards read the same way.
    corridorLevel — a randomly winding one-cell corridor with mechanics on the route; a wall-following program (conditions) solves it.
  All results are checked with the real engine by the caller.
*/
import { run, solve } from "../../js/game/adventure/engine.js";
import { program } from "./compress.mjs";

const DIRMAP = { "^": ">", ">": "v", v: "<", "<": "^" };
const rot = (rows) => { const h = rows.length, w = rows[0].length; return Array.from({ length: w }, (_, x) => Array.from({ length: h }, (_, j) => rows[h - 1 - j][x]).join("").replace(/[\^>v<]/g, (c) => DIRMAP[c])); };
export function xf(rows, k) {
  let g = rows.slice(); for (let i = 0; i < k % 4; i++) g = rot(g);
  if (k >= 4) g = g.map((r) => [...r].reverse().join("").replace(/[<>]/g, (c) => (c === "<" ? ">" : "<")));
  return g;
}
const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
const KINDS = { door: "door", bridge: "fill", gem: "gem" };

function moduleRows(kind, mw, mh, lane, r) {
  const g = Array.from({ length: mh }, () => Array(mw).fill("#"));
  for (let y = 0; y < mh; y++) for (let x = 0; x < mw; x++) if (y !== lane && r() < 0.3) g[y][x] = ".";
  for (let x = 0; x < mw; x++) g[lane][x] = ".";
  const side = () => (lane - 1 >= 0 && (lane + 1 >= mh || r() < 0.5) ? lane - 1 : lane + 1);
  const pocket = (ch, x0, x1) => { const y = side(); if (y < 0 || y >= mh) return; g[y][ri(r, x0, x1)] = ch; };
  if (kind === "door") { const dc = ri(r, 1, mw - 2); g[lane][dc] = "D"; pocket("K", 0, dc - 1); }
  else if (kind === "bridge") { g[lane][1] = "c"; g[lane][2] = "~"; for (let y = 0; y < mh; y++) if (y !== lane) { g[y][2] = "#"; g[y][1] = "#"; } }
  else if (kind === "spikes") { g[lane][1] = "x"; const y = side(); if (y >= 0 && y < mh) for (let x = 0; x <= 2; x++) g[y][x] = "."; }
  else if (kind === "timed") { g[lane][1] = r() < 0.5 ? "T" : "t"; g[lane][2] = g[lane][1] === "T" ? "t" : "T"; }
  else if (kind === "gem") pocket("k", 0, mw - 1);
  else if (kind === "star") pocket("*", 0, mw - 1);
  return g.map((row) => row.join(""));
}

/** pattern: array of module kinds, e.g. ["door","door","door"] or ["door","bridge","door","spikes","door"] */
export function chainLevel(pattern, r, { extra = [] } = {}) {
  const mh = ri(r, 3, 5), lane = ri(r, 1, mh - 2);
  const widths = {}; for (const k of new Set(pattern)) widths[k] = k === "bridge" || k === "timed" ? ri(r, 4, 5) : ri(r, 3, 5);
  const cache = {};
  const mods = pattern.map((k, i) => { const key = k; if (!cache[key]) cache[key] = moduleRows(k, widths[k], mh, lane, r); return cache[key]; });
  const rows = Array.from({ length: mh }, (_, y) => (y === lane ? ">" : "#") + mods.map((m) => m[y]).join("") + (y === lane ? "G" : "#"));
  // optional extras in the end columns: a star pocket beside the route
  let grid = rows;
  for (const e of extra) { const cand = []; grid.forEach((row, y) => [...row].forEach((c, x) => { if (c === "#" && y !== lane && grid[lane][x] === "." && Math.abs(y - lane) === 1) cand.push([x, y]); })); if (cand.length) { const [x, y] = cand[Math.floor(r() * cand.length)]; grid = grid.map((row, j) => (j === y ? row.slice(0, x) + e + row.slice(x + 1) : row)); } }
  return xf(grid, ri(r, 0, 7));
}

/** Winding corridor. Returns { grid, cells } with cells[0] = start and cells.at(-1) = goal. */
export function windingPath(w, h, minLen, r) {
  for (let attempt = 0; attempt < 400; attempt++) {
    const occ = new Set(), path = []; const key = (x, y) => y * w + x;
    let x = ri(r, 0, w - 1), y = r() < 0.5 ? 0 : h - 1; if (r() < 0.5) { const t = x; x = y === 0 ? 0 : w - 1; y = ri(r, 0, h - 1); void t; }
    path.push([x, y]); occ.add(key(x, y)); let dir = -1;
    const D = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    for (;;) {
      const opts = [];
      for (let d = 0; d < 4; d++) {
        const nx = x + D[d][0], ny = y + D[d][1]; if (nx < 0 || ny < 0 || nx >= w || ny >= h || occ.has(key(nx, ny))) continue;
        let touch = 0; for (let e = 0; e < 4; e++) { const ax = nx + D[e][0], ay = ny + D[e][1]; if (ax >= 0 && ay >= 0 && ax < w && ay < h && occ.has(key(ax, ay))) touch++; }
        if (touch > 1) continue; opts.push(d);
      }
      if (!opts.length) break;
      const straight = opts.includes(dir) && r() < 0.5; const d = straight ? dir : opts[Math.floor(r() * opts.length)];
      x += D[d][0]; y += D[d][1]; dir = d; path.push([x, y]); occ.add(key(x, y));
    }
    if (path.length >= minLen) {
      const turns = path.slice(2).filter((p, i) => (p[0] - path[i + 1][0]) !== (path[i + 1][0] - path[i][0]) || (p[1] - path[i + 1][1]) !== (path[i + 1][1] - path[i][1])).length;
      if (turns < Math.max(3, path.length / 6)) continue;
      const grid = Array.from({ length: h }, () => Array(w).fill("#"));
      path.forEach(([px, py]) => (grid[py][px] = "."));
      const [sx, sy] = path[0], [nx, ny] = path[1], hd = nx > sx ? ">" : nx < sx ? "<" : ny > sy ? "v" : "^";
      grid[sy][sx] = hd; const [gx, gy] = path.at(-1); grid[gy][gx] = "G";
      return { grid: grid.map((row) => row.join("")), cells: path };
    }
  }
  return null;
}
export const FOLLOWER = { main: [{ op: "until", body: [{ op: "if", cond: "wallAhead", then: [{ op: "if", cond: "openLeft", then: [{ op: "L" }], else: [{ op: "R" }] }], else: [{ op: "F" }] }] }], fn: [] };

const setCh = (grid, x, y, ch) => grid.map((row, j) => (j === y ? row.slice(0, x) + ch + row.slice(x + 1) : row));
/** put a mechanic on the route of a winding corridor; returns the new grid or null */
export function corridorFeature(grid, cells, kind, r) {
  const n = cells.length, plain = (i) => grid[cells[i][1]][cells[i][0]] === ".";
  const straight = (i) => i > 0 && i < n - 1 && cells[i - 1][0] - cells[i][0] === cells[i][0] - cells[i + 1][0] && cells[i - 1][1] - cells[i][1] === cells[i][1] - cells[i + 1][1];
  const idx = [...Array(n).keys()].filter((i) => i > 1 && i < n - 2 && plain(i));
  if (kind === "door" || kind === "gate") {
    const b = idx.filter((i) => straight(i) && i > 3); if (!b.length) return null;
    const j = b[Math.floor(r() * b.length)], a = idx.filter((i) => i < j - 1); if (!a.length) return null; const i = a[Math.floor(r() * a.length)];
    let g = setCh(grid, cells[j][0], cells[j][1], kind === "door" ? "D" : "="); return setCh(g, cells[i][0], cells[i][1], kind === "door" ? "K" : "s");
  }
  if (kind === "bridge") {
    const b = idx.filter((i) => straight(i) && i > 3 && i < n - 3 && plain(i - 1) && straight(i - 1)); if (!b.length) return null; const j = b[Math.floor(r() * b.length)];
    let g = setCh(grid, cells[j][0], cells[j][1], "~"); return setCh(g, cells[j - 1][0], cells[j - 1][1], "c");
  }
  if (kind === "gem") { const b = idx.filter((i) => i > 2); if (!b.length) return null; const j = b[Math.floor(r() * b.length)]; return setCh(grid, cells[j][0], cells[j][1], "k"); }
  if (kind === "spikes") { return null; }
  if (kind === "star") {
    const cand = []; const h = grid.length, w = grid[0].length;
    cells.forEach(([x, y], i) => { if (!straight(i)) return; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const px = x + dx, py = y + dy; if (px < 0 || py < 0 || px >= w || py >= h || grid[py][px] !== "#") continue; let touch = 0; for (const [ex, ey] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const qx = px + ex, qy = py + ey; if (qx >= 0 && qy >= 0 && qx < w && qy < h && grid[qy][qx] !== "#") touch++; } if (touch === 1) cand.push([px, py]); } });
    if (!cand.length) return null; const [px, py] = cand[Math.floor(r() * cand.length)]; return setCh(grid, px, py, "*");
  }
  if (kind === "timed") {
    // run once to learn when the hero walks over each cell, then make that cell safe at that exact moment
    const res = run({ grid }, FOLLOWER); const stepAt = new Map(); let last = ""; res.steps.forEach((s, t) => { const k = s.x + "," + s.y; if (k !== last) { if (!stepAt.has(k)) stepAt.set(k, t); last = k; } });
    const c = idx.filter((i) => straight(i)); if (!c.length) return null; const i = c[Math.floor(r() * c.length)], t = stepAt.get(cells[i][0] + "," + cells[i][1]);
    if (t === undefined) return null; return setCh(grid, cells[i][0], cells[i][1], t % 2 ? "t" : "T");
  }
  return null;
}
export { run, solve, program };
