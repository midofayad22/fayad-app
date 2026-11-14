/*
  Zombie Survival — 15 deterministic levels. Each ships a reference rule list found by testing a small set of strategies against the engine
  (generation fails loudly if none wins), so every level is provably winnable. The tests also check the trivial "wait" and "melee only" programs do not win late levels.
*/
import { run, START } from "./engine.js";

const R = (...p) => p.map(([i, d]) => ({ if: i, do: d }));
export const STRATEGIES = [
  R(["adjacent", "melee"], ["always", "wait"]),
  R(["inLine", "shoot"], ["adjacent", "melee"], ["always", "wait"]),
  R(["ammoEmpty", "reload"], ["inLine", "shoot"], ["adjacent", "melee"], ["always", "wait"]),
  R(["hpLow", "heal"], ["adjacent", "melee"], ["ammoEmpty", "reload"], ["inLine", "shoot"], ["always", "wait"]),
  R(["hpLow", "heal"], ["ammoEmpty", "reload"], ["inLine", "shoot"], ["adjacent", "melee"], ["always", "wait"]),
  R(["hpLow", "heal"], ["adjacent", "retreat"], ["ammoEmpty", "reload"], ["inLine", "shoot"], ["always", "wait"]),
  R(["hpLow", "heal"], ["adjacent", "melee"], ["ammoEmpty", "reload"], ["inLine", "shoot"], ["far", "reload"], ["always", "wait"]),
];
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const ring = []; for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) if (Math.abs(x - START.x) + Math.abs(y - START.y) >= 4) ring.push({ x, y });

function make() {
  const out = [];
  for (let n = 1; n <= 15; n++) {
    const count = Math.min(7, 1 + Math.floor((n + 1) / 2));
    let ok = null;
    for (let attempt = 0; attempt < 400 && !ok; attempt++) {
      const r = rng(0x2b1e * n + attempt * 104729);
      const cells = [...ring].sort(() => r() - 0.5).slice(0, count);
      const zombies = cells.map((c, i) => ({ ...c, hp: n < 4 ? 1 : n < 12 ? 1 + (i % 2) : 1 + (i % 3 === 2 ? 1 : 0) + (n >= 14 && i === 0 ? 1 : 0), slow: n >= 6 && i % 3 === 2 }));
      const need = zombies.reduce((a, z) => a + z.hp, 0);
      const ammo = n < 3 ? 0 : Math.max(2, Math.ceil(need * 0.6)) + Math.floor(attempt / 100);
      const level = { id: n, zombies, ammo, med: n < 5 ? 0 : 1 + (n >= 10) + (attempt >= 200 ? 1 : 0), actions: n < 3 ? ["melee", "wait"] : n < 5 ? ["melee", "shoot", "reload", "wait"] : n < 8 ? ["melee", "shoot", "reload", "heal", "wait"] : ["melee", "shoot", "reload", "retreat", "heal", "wait"], maxRules: 8 };
      const win = STRATEGIES.filter((s) => s.every((x) => level.actions.includes(x.do))).filter((s) => run(level, s).ok).sort((a, b) => a.length - b.length)[0];
      if (win) ok = { ...level, par: win.length, solution: win, base: Math.min(30, 10 + n) };
    }
    if (!ok) throw new Error("zombie level " + n + " could not be generated");
    out.push(ok);
  }
  return out;
}
export const LEVELS = make();
