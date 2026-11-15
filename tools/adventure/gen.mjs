/*
  Offline generator for js/game/adventure/levels-data.js (run: node tools/adventure/gen.mjs).
  Two level families, both proven solvable with the real engine before they are written:
    • puzzle rooms (worlds 1, 2 and the mastery bosses): random rooms built around one mechanic, solved by breadth-first
      search; a room is kept only if its shortest solution really uses that mechanic.
    • structured courses (worlds 3-6): the classic loop / condition / function courses, now carrying extra mechanics
      (keys + doors, switches + gates, crates + water, timed spikes, optional stars) added along the reference route.
*/
import { writeFileSync } from "node:fs";
import { run, solve, sizeOf, parseGrid } from "../../js/game/adventure/engine.js";
import { rng, BUILD } from "./legacy.mjs";

/* ---------------- compression of an action string into blocks ---------------- */
const atom = (c) => (c === "C" ? { op: "call" } : { op: c });
function compress(seq, allowRepeat) {
  const n = seq.length, memo = new Map();
  function best(i, j) {
    const k = i * 1000 + j; if (memo.has(k)) return memo.get(k);
    let res;
    if (j - i === 1) res = { size: 1, prog: [atom(seq[i])] };
    else {
      res = null;
      for (let m = i + 1; m < j; m++) { const a = best(i, m), b = best(m, j), sz = a.size + b.size; if (!res || sz < res.size) res = { size: sz, prog: [...a.prog, ...b.prog] }; }
      if (allowRepeat) {
        const len = j - i;
        for (let p = 1; p <= len / 2; p++) {
          if (len % p) continue; const times = len / p; if (times < 2 || times > 9) continue;
          const body = seq.slice(i, i + p); let same = true; for (let t = 1; t < times && same; t++) same = seq.slice(i + t * p, i + (t + 1) * p) === body;
          if (!same) continue; const inner = best(i, i + p), sz = 1 + inner.size;
          if (sz < res.size) res = { size: sz, prog: [{ op: "repeat", n: times, body: inner.prog }] };
        }
      }
    }
    memo.set(k, res); return res;
  }
  return best(0, n);
}
function program(seq, { repeat, fn }) {
  let bestP = compress(seq, repeat); let out = { main: bestP.prog, fn: [] }, size = bestP.size;
  if (fn) {
    const seen = new Set();
    for (let len = 3; len <= Math.min(24, seq.length >> 1); len++) for (let i = 0; i + len <= seq.length; i++) {
      const sub = seq.slice(i, i + len); if (seen.has(sub)) continue; seen.add(sub);
      let main = "", cnt = 0, p = 0; while (p < seq.length) { if (seq.startsWith(sub, p)) { main += "C"; p += len; cnt++; } else main += seq[p++]; }
      if (cnt < 2) continue;
      const m = compress(main, repeat), f = compress(sub, repeat), total = m.size + f.size;
      if (total < size) { size = total; out = { main: m.prog, fn: f.prog }; }
    }
  }
  return out;
}

/* ---------------- puzzle rooms ---------------- */
const pickR = (r, a) => a[Math.floor(r() * a.length)];
const shuffle = (r, a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** spec: { w, h, rock, parts:[{type}], gems, stars, spikes, minLen, maxLen, need:[events] } */
function room(spec, r) {
  const { w, h } = spec;
  const g = Array.from({ length: h }, () => Array(w).fill("."));
  const parts = spec.parts || [];
  // partitions: columns that split the room into sections left -> right
  const cols = []; const n = parts.filter((p) => ["door", "water", "gate", "portal", "timed"].includes(p)).length;
  if (n > 3) return null;
  for (let k = 1; k <= n; k++) cols.push(Math.round((k * (w - 1)) / (n + 1)));
  const order = shuffle(r, parts.filter((p) => ["door", "water", "gate", "portal", "timed"].includes(p)));
  const sectionOf = (x) => cols.filter((c) => c < x).length; // 0..n
  const cells = (xa, xb) => { const o = []; for (let y = 0; y < h; y++) for (let x = xa; x <= xb; x++) o.push([x, y]); return o; };
  const sec = (k) => { const xa = k === 0 ? 0 : cols[k - 1] + 1, xb = k === n ? w - 1 : cols[k] - 1; return cells(xa, xb); };
  const used = new Set();
  const put = (x, y, ch) => { g[y][x] = ch; used.add(x + "," + y); };
  const freeIn = (k) => shuffle(r, sec(k)).filter(([x, y]) => g[y][x] === "." && !used.has(x + "," + y));
  // rocks first so features are placed on free cells
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (!cols.includes(x) && r() < spec.rock) g[y][x] = "#";
  order.forEach((type, k) => {
    const cx = cols[k], gap = Math.floor(r() * h);
    for (let y = 0; y < h; y++) g[y][cx] = "#";
    if (type === "door") { put(cx, gap, "D"); const f = freeIn(k)[0]; if (f) put(f[0], f[1], "K"); }
    else if (type === "water") {
      for (let y = 0; y < h; y++) g[y][cx] = "~"; const row = Math.floor(r() * h);
      for (let y = 0; y < h; y++) g[y][cx] = r() < 0.12 && y !== row ? "#" : "~";
      g[row][cx - 1] = "."; used.add((cx - 1) + "," + row); if (cx - 2 >= 0) { g[row][cx - 2] = "."; used.add((cx - 2) + "," + row); }
      const back = r() < 0.5 ? 1 : 0; const crx = cx - 1 - (back && cx - 3 >= 0 ? 1 : 0);
      put(crx, row, "c"); if (crx - 1 >= 0 && g[row][crx - 1] === "#") g[row][crx - 1] = ".";
    } else if (type === "gate") { for (let y = 0; y < h; y++) g[y][cx] = "="; const f = freeIn(k)[0]; if (f) put(f[0], f[1], "s"); }
    else if (type === "portal") { const a = freeIn(k)[0], b = freeIn(k + 1)[0]; if (a && b) { put(a[0], a[1], "1"); put(b[0], b[1], "2"); } }
    else if (type === "timed") { for (let y = 0; y < h; y++) g[y][cx] = (y + (r() < 0.5 ? 0 : 1)) % 2 ? "T" : "t"; g[gap][cx] = r() < 0.5 ? "T" : "t"; }
  });
  if (parts.includes("ice")) {
    const k0 = Math.floor(r() * (n + 1)); const sc = freeIn(k0); const m = Math.min(sc.length, spec.ice || 8);
    for (let i = 0; i < m; i++) put(sc[i][0], sc[i][1], "i");
  }
  const place = (k, ch, count) => { const f = freeIn(k); for (let i = 0; i < count && i < f.length; i++) put(f[i][0], f[i][1], ch); };
  place(r() < 0.5 ? 0 : n, "k", spec.gems || 0);
  place(Math.floor(r() * (n + 1)), "*", spec.stars || 0);
  place(Math.floor(r() * (n + 1)), "x", spec.spikes || 0);
  // start in the first section, goal in the last
  const s = freeIn(0)[0], gl = freeIn(n).filter(([x, y]) => !s || Math.abs(x - s[0]) + Math.abs(y - s[1]) >= 3)[0];
  if (!s || !gl) return null;
  g[s[1]][s[0]] = "^>v<"[Math.floor(r() * 4)]; g[gl[1]][gl[0]] = "G";
  return g.map((row) => row.join(""));
}
const NEED = { door: "door", water: "fill", gate: "switch", portal: "portal", ice: "slide" };
function puzzle(spec, seed) {
  for (let attempt = 0; attempt < 400; attempt++) {
    const r = rng(seed + attempt * 7919), grid = room(spec, r); if (!grid) continue;
    const level = { grid, blocks: ["F", "L", "R"] };
    const sol = solve(level, { limit: 120000 }); if (!sol || sol.length < spec.minLen || sol.length > spec.maxLen) continue;
    const G = parseGrid(grid), probe = { main: [...sol].map((c) => ({ op: c })) };
    const res = run(level, probe); if (!res.ok) continue;
    const evs = new Set(res.steps.flatMap((s) => s.ev.map((e) => e.t)));
    if (!(spec.parts || []).every((p) => !NEED[p] || evs.has(NEED[p]))) continue;
    if (spec.stars) { const ss = solve(level, { stars: true, limit: 120000 }); if (!ss || ss.length > sol.length + 12) continue; }
    if ((spec.parts || []).includes("timed")) { const flat = grid.map((row) => row.replace(/[Tt]/g, ".")); const s2 = solve({ grid: flat }); if (!s2 || s2.length >= sol.length) continue; }
    if (spec.spikes) { const flat = grid.map((row) => row.replace(/x/g, ".")); const s2 = solve({ grid: flat }); if (!s2 || s2.length >= sol.length) continue; }
    void G;
    return { grid, seq: sol };
  }
  throw new Error("puzzle failed " + JSON.stringify(spec));
}

/* ---------------- decorators for structured courses ---------------- */
function visits(grid, prog) {
  const res = run({ grid }, prog), seq = []; let last = null;
  res.steps.forEach((s, i) => { const k = s.x + "," + s.y; if (k !== last) { seq.push({ x: s.x, y: s.y, t: i, k }); last = k; } });
  const count = {}; seq.forEach((v) => (count[v.k] = (count[v.k] || 0) + 1));
  return { seq, count, steps: res.steps };
}
const setCh = (grid, x, y, ch) => grid.map((row, j) => (j === y ? row.slice(0, x) + ch + row.slice(x + 1) : row));
function decorate(grid, prog, kind, r) {
  const { seq, count, steps } = visits(grid, prog);
  const plain = (v) => grid[v.y][v.x] === "." && count[v.k] === 1;
  const idx = seq.map((v, i) => i).filter((i) => i > 0 && i < seq.length - 1 && plain(seq[i]));
  const H = grid.length, W = grid[0].length, first = seq[0], last = seq.at(-1);
  let g = grid;
  /* a "gate cell" is a path cell that is the ONLY path cell on its column or row and separates start from goal:
     the whole line through it becomes the barrier, so the mechanic cannot be walked around */
  const crossings = () => idx.filter((i) => i > 1).map((i) => {
    const v = seq[i], prev = seq[i - 1], next = seq[i + 1], out = [];
    const colOnly = seq.filter((u) => u.x === v.x).length === 1, rowOnly = seq.filter((u) => u.y === v.y).length === 1;
    if (colOnly && (prev.x - v.x) * (next.x - v.x) < 0 && (first.x - v.x) * (last.x - v.x) < 0) out.push({ i, axis: "x" });
    if (rowOnly && (prev.y - v.y) * (next.y - v.y) < 0 && (first.y - v.y) * (last.y - v.y) < 0) out.push({ i, axis: "y" });
    return out;
  }).flat();
  const line = (c, ch, keep) => { const v = seq[c.i]; let o = g; if (c.axis === "x") for (let y = 0; y < H; y++) { if (o[y][v.x] !== "#" && y !== v.y) o = setCh(o, v.x, y, ch); } else for (let x = 0; x < W; x++) { if (o[v.y][x] !== "#" && x !== v.x) o = setCh(o, x, v.y, ch); } return o; };
  if (kind === "door" || kind === "gate") {
    const cs = crossings(); if (!cs.length) return null;
    const c = cs[Math.floor(r() * cs.length)], before = idx.filter((i) => i < c.i - 0 && i >= 1); if (!before.length) return null;
    const a = before[Math.floor(r() * before.length)], v = seq[c.i];
    g = line(c, kind === "door" ? "#" : "=");
    g = setCh(g, v.x, v.y, kind === "door" ? "D" : "="); g = setCh(g, seq[a].x, seq[a].y, kind === "door" ? "K" : "s");
  } else if (kind === "timed") {
    const cand = idx.filter((i) => steps[seq[i].t + 1] && (steps[seq[i].t + 1].x !== seq[i].x || steps[seq[i].t + 1].y !== seq[i].y));
    if (!cand.length) return null; const i = cand[Math.floor(r() * cand.length)];
    g = setCh(g, seq[i].x, seq[i].y, seq[i].t % 2 ? "t" : "T");
  } else if (kind === "bridge") {
    const cs = crossings().filter((c) => { const a = seq[c.i - 2], b = seq[c.i - 1], v = seq[c.i]; return a && b.x - a.x === v.x - b.x && b.y - a.y === v.y - b.y && plain(b) && c.i < seq.length - 2; });
    if (!cs.length) return null; const c = cs[Math.floor(r() * cs.length)], v = seq[c.i], b = seq[c.i - 1];
    g = line(c, "~"); g = setCh(g, v.x, v.y, "~"); g = setCh(g, b.x, b.y, "c");
  } else if (kind === "star") {
    const free = [];
    seq.forEach((v) => { for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = v.x + dx, y = v.y + dy; if (x >= 0 && y >= 0 && x < W && y < H && (grid[y][x] === "." || grid[y][x] === "#") && !count[x + "," + y]) free.push([x, y]); } });
    if (!free.length) return null; const [x, y] = free[Math.floor(r() * free.length)];
    g = setCh(g, x, y, "*");
  }
  const res = run({ grid: g }, prog); if (!res.ok) return null;
  return g;
}
/** water decoys instead of spikes in open fields (same cells, different look and meaning) */
const swapHazards = (grid, r) => grid.map((row) => row.replace(/x/g, () => (r() < 0.5 ? "~" : "x")));

/* ---------------- level plans ---------------- */
const W_BLOCKS = [["F", "L", "R"], ["F", "L", "R"], ["F", "L", "R", "repeat"], ["F", "L", "R", "repeat", "until", "if"], ["F", "L", "R", "repeat", "call"], ["F", "L", "R", "repeat", "until", "if", "call"]];
const P = (o) => o;
const PLAN1 = (i) => i < 3 ? P({ w: 5 + (i > 0), h: 5, rock: 0.16, minLen: 5 + i, maxLen: 14, tags: ["rocks"] })
  : i < 6 ? P({ w: 6, h: 5 + (i > 4), rock: 0.18, gems: 1 + (i > 3), minLen: 8, maxLen: 18, tags: ["gems"] })
  : i < 9 ? P({ w: 7, h: 5, rock: 0.16, gems: 1, stars: 1 + (i > 7), minLen: 9, maxLen: 20, tags: ["stars"] })
  : i < 12 ? P({ w: 7, h: 6, rock: 0.12, gems: 1, spikes: 3 + (i - 9), minLen: 10, maxLen: 22, tags: ["spikes"] })
  : i < 15 ? P({ w: 7, h: 5, rock: 0.1, parts: ["water"], minLen: 9, maxLen: 24, tags: ["bridge"] })
  : i < 18 ? P({ w: 7, h: 5, rock: 0.12, parts: ["door"], gems: i > 16 ? 1 : 0, minLen: 11, maxLen: 26, tags: ["door"] })
  : i === 18 ? P({ w: 9, h: 5, rock: 0.1, parts: ["door", "water"], gems: 1, minLen: 16, maxLen: 34, tags: ["door", "bridge"] })
  : P({ w: 10, h: 6, rock: 0.1, parts: ["door", "water"], stars: 1, gems: 1, minLen: 20, maxLen: 38, tags: ["door", "bridge", "stars"] });
const PLAN2 = (i) => i < 3 ? P({ w: 7, h: 6, rock: 0.1, spikes: 4, gems: 1, minLen: 9, maxLen: 24, tags: ["spikes"] })
  : i < 6 ? P({ w: 6, h: 5, rock: 0.08, parts: ["timed"], minLen: 8, maxLen: 24, tags: ["timed"] })
  : i < 9 ? P({ w: 7, h: 5, rock: 0.1, parts: ["gate"], minLen: 11, maxLen: 28, tags: ["switch"] })
  : i < 12 ? P({ w: 7, h: 6, rock: 0.2, parts: ["ice"], ice: 9, minLen: 6, maxLen: 20, tags: ["ice"] })
  : i < 15 ? P({ w: 8, h: 5, rock: 0.12, parts: ["portal"], gems: i > 13 ? 1 : 0, minLen: 7, maxLen: 24, tags: ["portal"] })
  : i < 17 ? P({ w: 9, h: 5, rock: 0.1, parts: ["door"], spikes: 3, minLen: 13, maxLen: 30, tags: ["door", "spikes"] })
  : i < 19 ? P({ w: 9, h: 5, rock: 0.1, parts: i === 17 ? ["gate", "ice"] : ["portal", "timed"], ice: 6, minLen: 12, maxLen: 34, tags: i === 17 ? ["switch", "ice"] : ["portal", "timed"] })
  : P({ w: 11, h: 6, rock: 0.1, parts: ["door", "gate", "water"], stars: 1, minLen: 24, maxLen: 44, tags: ["door", "switch", "bridge", "stars"] });

const cyc = (base, extra) => (i) => [...base[i % base.length], ...(i >= 8 ? extra[(i * 3 + 1) % extra.length] : [])];
const STRUCT_DECOR = [
  null, null,
  cyc([["star"], ["door"], ["bridge"], ["timed"], ["gate"]], [["star"], [], ["star"], []]),
  cyc([["door"], ["bridge"], ["gate"], ["timed"], ["star"]], [["star"], [], ["timed"], ["star"]]),
  cyc([["bridge"], ["door"], ["timed"], ["gate"], ["star", "door"]], [["star"], ["timed"], [], ["star"]]),
  cyc([["bridge", "door"], ["gate", "timed"], ["door", "star"], ["bridge", "gate"], ["timed", "door"]], [["star"], [], ["star"], []]),
];

function structured(wi, i, seedBase) {
  for (let attempt = 0; attempt < 80; attempt++) {
    const r = rng(seedBase + attempt * 7919);
    const b = BUILD[wi](i, r); let grid = b.grid; const prog = b.program;
    if (!run({ grid }, prog).ok) continue;
    const wants = (i % 4 === 0 && wi < 2) ? [] : STRUCT_DECOR[wi](i);
    const tags = []; let ok = true;
    for (const k of wants) {
      let done = null, used = k;
      for (const kk of [k, "door", "gate", "star", "timed"]) { for (let t = 0; t < 12 && !done; t++) done = decorate(grid, prog, kk, r); if (done) { used = kk; break; } }
      if (!done) { ok = false; break; } grid = done; tags.push(used === "gate" ? "switch" : used);
    }
    if (!ok) continue;
    if (wi >= 2 && r() < 0.5) grid = swapHazards(grid, r);
    if (!run({ grid }, prog).ok || grid.length > 24 || grid[0].length > 24) continue;
    return { grid, program: prog, tags };
  }
  throw new Error(`structured world ${wi + 1} level ${i + 1} failed`);
}

/* ---------------- assemble ---------------- */
const out = [];
for (let wi = 0; wi < 6; wi++) for (let i = 0; i < 20; i++) {
  const id = wi * 20 + i + 1, seed = 0xfa7ad * (wi + 1) + i * 977;
  let rec;
  if (wi === 0 || wi === 1) {
    const spec = (wi === 0 ? PLAN1 : PLAN2)(i), p = puzzle(spec, seed);
    rec = { grid: p.grid, program: { main: [...p.seq].map((c) => ({ op: c })), fn: [] }, tags: spec.tags, kind: "room" };
  } else if (wi === 5 && (i === 9 || i === 14 || i === 19)) {
    const spec = P({ w: 10 + (i > 9), h: 6, rock: 0.1, parts: i === 9 ? ["door", "water"] : i === 14 ? ["gate", "portal", "door"] : ["door", "gate", "water"], ice: 6, stars: 1, gems: 1, minLen: 22, maxLen: 50 });
    const p = puzzle(spec, seed), pr = program(p.seq, { repeat: true, fn: true });
    rec = { grid: p.grid, program: pr, tags: i === 9 ? ["door", "bridge", "stars"] : i === 14 ? ["switch", "portal", "door", "stars"] : ["door", "switch", "bridge", "stars"], kind: "boss", slack: 3 };
  } else {
    const s = structured(wi, i, seed); rec = { grid: s.grid, program: s.program, tags: s.tags, kind: "course" };
  }
  const check = run({ grid: rec.grid }, rec.program); if (!check.ok) throw new Error("level " + id + " reference fails: " + check.reason);
  const G = parseGrid(rec.grid);
  out.push({ id, world: wi + 1, n: i + 1, grid: rec.grid, tags: rec.tags, kind: rec.kind, bonus: G.star.size, slack: rec.slack || 0, solution: rec.program });
  process.stdout.write(".");
}
console.log();
writeFileSync(new URL("../../js/game/adventure/levels-data.js", import.meta.url), "/* Generated by tools/adventure/gen.mjs. Do not edit by hand. */\nexport const DATA = " + JSON.stringify(out) + ";\n");
console.log("wrote", out.length, "levels");
