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
import { rng } from "./legacy.mjs";
import { trivial } from "./naive.mjs";
import { chainLevel, windingPath, corridorFeature, FOLLOWER } from "./chains.mjs";

import { compress, program } from "./compress.mjs";

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
function puzzle(spec, seed, world = 1) {
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
    if (!(world === 1 && spec.minLen < 7) && trivial(grid, world).length) continue;
    return { grid, seq: sol };
  }
  throw new Error("puzzle failed " + JSON.stringify(spec));
}

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

/* ---------------- structured families (worlds 3-6) ---------------- */
const TAG = { door: "door", bridge: "bridge", spikes: "spikes", timed: "timed", gem: "gems", star: "stars" };
const rint = (r, a, b) => a + Math.floor(r() * (b - a + 1));
function chainRec(wi, i, seed, patternFn) {
  const rej = {};
  for (let attempt = 0; attempt < 120; attempt++) {
    const r = rng(seed + attempt * 7919), pattern = patternFn(r), grid = chainLevel(pattern, r, { extra: i % 3 === 1 ? ["*"] : [] });
    const seq = solve({ grid }, { limit: 260000 }); if (!seq || seq.length < 14 || seq.length > 120) { rej.seq = (rej.seq || 0) + 1; continue; }
    let prog = program(seq, { repeat: true, fn: wi >= 4 });
    if (wi === 2 && i < 8) { // first loop levels: the reference is  prefix + `repeat n [ flat body ]`
      let best = null;
      for (let a = 0; a <= 6; a++) { const t = seq.slice(a); for (let q = 2; q <= t.length / 2; q++) { if (t.length % q || t.length / q > 9) continue; if (t.slice(0, q).repeat(t.length / q) === t) { const cost = a + q + 1; if (!best || cost < best.cost) best = { a, q, k: t.length / q, cost }; break; } } }
      if (!best) { rej.per = (rej.per || 0) + 1; continue; }
      prog = { main: [...[...seq.slice(0, best.a)].map((c) => ({ op: c })), { op: "repeat", n: best.k, body: [...seq.slice(best.a, best.a + best.q)].map((c) => ({ op: c })) }], fn: [] };
    }
    const raw = seq.length, size = sizeOf(prog); const calls = JSON.stringify(prog).split('"call"').length - 1, reps = JSON.stringify(prog).split('"repeat"').length - 1;
    if (wi === 2 && !(reps >= 1 && size <= raw * 0.62)) continue;
    if (wi === 4) { const base = sizeOf(program(seq, { repeat: true, fn: false })); if (!(calls >= 1 && size < base && size <= raw * 0.88)) { rej.fn = (rej.fn || 0) + 1; rej.last = [raw, size, base, calls]; continue; } }
    if (wi === 5 && !(size <= raw * 0.85)) continue;
    if (grid.length > 24 || grid[0].length > 24 || trivial(grid, wi + 1).length) continue;
    const res = run({ grid }, prog); if (!res.ok) continue;
    const evs = new Set(res.steps.flatMap((s) => s.ev.map((e) => e.t)));
    if (pattern.includes("door") && !evs.has("door")) continue; if (pattern.includes("bridge") && !evs.has("fill")) continue;
    return { grid, program: prog, tags: [...new Set([...pattern.map((k) => TAG[k]), ...(parseGrid(grid).star.size ? ["stars"] : [])])], raw };
  }
  throw new Error(`chain world ${wi + 1} level ${i + 1} failed ${JSON.stringify(rej)}`);
}
const K3 = ["spikes", "door", "bridge", "timed", "gem"];
const pat3 = (i) => (r) => { const a = K3[(i + rint(r, 0, 1) * 2) % 5], b = K3[(i * 2 + 1) % 5], c = K3[(i + 3) % 5]; const k = rint(r, 3, 5);
  return i < 8 ? Array(k).fill(a) : i < 16 ? Array(rint(r, 2, 3)).fill(0).flatMap(() => [a, b === a ? c : b]) : Array(2).fill(0).flatMap(() => [a, b === a ? c : b, c === a || c === b ? "door" : c]); };
const pat5 = (i) => (r) => { const A = ["door", "gem"][(i + rint(r, 0, 1)) % 2], rest = ["bridge", "timed", "spikes", "door", "gem"].filter((x) => x !== A); const B = rest[(i + rint(r, 0, 2)) % rest.length], C = rest[(i * 2 + 3) % rest.length] === B ? rest[(i + 1) % rest.length] : rest[(i * 2 + 3) % rest.length];
  const t = [[0, 1, 0, 2, 0], [0, 1, 2, 0, 1, 0], [1, 0, 2, 0, 1, 0], [0, 0, 1, 0, 2, 0]][i % 4]; return t.map((x) => [A, B, C][x]); };
const pat6 = (i) => (r) => { const pool = ["door", "bridge", "gem", "spikes", "timed", "door"]; const n = [pool[i % 6], pool[(i + 2) % 6], pool[(i + 4) % 6]]; const t = [[0, 1, 2, 0, 1, 2], [0, 1, 0, 2, 0, 1], [0, 1, 2, 2, 1, 0, 1]][rint(r, 0, 2)]; return t.map((x) => n[x]); };

function corridorRec(i, seed) {
  const feats = [["star"], ["door"], ["bridge"], ["gate", "star"], ["timed"], ["door", "bridge"], ["gem", "star"], ["gate", "bridge"], ["timed", "door"], ["door", "star"]][i % 10], extra = i >= 12 ? [["star"], ["gem"], ["timed"], ["bridge"]][i % 4] : [];
  for (let attempt = 0; attempt < 200; attempt++) {
    const r = rng(seed + attempt * 7919), w = rint(r, 8, 8 + Math.min(8, 2 + (i >> 1))), h = rint(r, 8, 8 + Math.min(8, 2 + (i >> 1)));
    const p = windingPath(w, h, 12 + i * 2, r); if (!p) continue;
    let grid = p.grid, ok = true; const tags = [];
    for (const k of [...(i < 2 ? [] : feats), ...extra]) { const g = corridorFeature(grid, p.cells, k, r); if (!g) { ok = false; break; } grid = g; tags.push(k === "gate" ? "switch" : k === "gem" ? "gems" : k === "star" ? "stars" : k); }
    if (!ok) continue;
    if (!run({ grid }, FOLLOWER).ok || trivial(grid, 4).length) continue;
    return { grid, program: FOLLOWER, tags: tags.length ? [...new Set(tags)] : ["rocks"] };
  }
  throw new Error("corridor " + (i + 1) + " failed");
}

/* ---------------- assemble ---------------- */
const out = [];
for (let wi = 0; wi < 6; wi++) for (let i = 0; i < 20; i++) {
  const id = wi * 20 + i + 1, seed = 0xfa7ad * (wi + 1) + i * 977;
  let rec;
  if (wi === 0 || wi === 1) {
    const spec = (wi === 0 ? PLAN1 : PLAN2)(i); spec.w += (i * 7 + wi) % 3; spec.h += ((i >> 1) + wi) % 2; const p = puzzle(spec, seed, wi + 1);
    rec = { grid: p.grid, program: { main: [...p.seq].map((c) => ({ op: c })), fn: [] }, tags: spec.tags, kind: "room" };
  } else if (wi === 3) {
    const c = corridorRec(i, seed); rec = { grid: c.grid, program: c.program, tags: c.tags, kind: "course" };
  } else if (wi === 2 || wi === 4 || (wi === 5 && i % 2 === 0 && i !== 14)) {
    const c = chainRec(wi, i, seed, wi === 2 ? pat3(i) : wi === 4 ? pat5(i) : pat6(i)); rec = { grid: c.grid, program: c.program, tags: c.tags, kind: "course" };
  } else {
    const boss = i === 9 || i === 14 || i === 19;
    const spec = P({ w: 9 + (i % 3), h: 5 + (i % 2), rock: 0.1 + (i % 4) * 0.02, parts: boss ? (i === 9 ? ["door", "water"] : i === 14 ? ["gate", "portal", "door"] : ["door", "gate", "water"]) : [["door", "gate"], ["water", "portal"], ["ice", "door"], ["gate", "timed"], ["portal", "door"]][(i >> 1) % 5], ice: 6, stars: boss || i % 3 === 0 ? 1 : 0, gems: i % 4 === 1 ? 1 : 0, minLen: boss ? 22 : 18, maxLen: boss ? 52 : 44 });
    const p = puzzle(spec, seed, wi + 1), pr = program(p.seq, { repeat: true, fn: true });
    const T = { door: "door", gate: "switch", water: "bridge", portal: "portal", ice: "ice", timed: "timed" };
    rec = { grid: p.grid, program: pr, tags: [...spec.parts.map((x) => T[x]), ...(spec.stars ? ["stars"] : []), ...(spec.gems ? ["gems"] : [])], kind: boss ? "boss" : "room", slack: 3 };
  }
  const check = run({ grid: rec.grid }, rec.program); if (!check.ok) throw new Error("level " + id + " reference fails: " + check.reason);
  const G = parseGrid(rec.grid);
  out.push({ id, world: wi + 1, n: i + 1, grid: rec.grid, tags: rec.tags, kind: rec.kind, bonus: G.star.size, slack: rec.slack || 0, solution: rec.program });
  process.stdout.write(".");
}
console.log();
writeFileSync(new URL("../../js/game/adventure/levels-data.js", import.meta.url), "/* Generated by tools/adventure/gen.mjs. Do not edit by hand. */\nexport const DATA = " + JSON.stringify(out) + ";\n");
console.log("wrote", out.length, "levels");
