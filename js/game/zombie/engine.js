/*
  FAYAD Zombie Survival — pure, deterministic turn engine (no DOM, no randomness at run time).
  The player writes an ordered rule list [{ if, do }]; every turn the FIRST rule whose condition holds acts.
  Conditions: adjacent | inLine | ammoEmpty | hpLow | far | always      Actions: melee | shoot | reload | retreat | heal | wait
  Board 7x7, the survivor starts at the centre. Zombies step toward the survivor each turn (slow ones every other turn) and bite when adjacent.
*/
export const SIZE = 7, MAX_TURNS = 60, RANGE = 4, MAX_HP = 5, MAG = 4;
export const CONDS = ["adjacent", "inLine", "ammoEmpty", "hpLow", "far", "always"];
export const ACTIONS = ["melee", "shoot", "reload", "retreat", "heal", "wait"];
export const START = { x: 3, y: 3 };
const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

export const sizeOf = (rules) => rules.length;
export function validate(level, rules) {
  if (!Array.isArray(rules) || !rules.length) return { ok: false, reason: "empty" };
  if (rules.length > level.maxRules) return { ok: false, reason: "budget" };
  for (const r of rules) { if (!CONDS.includes(r.if) || !ACTIONS.includes(r.do)) return { ok: false, reason: "bad-rule" }; if (!level.actions.includes(r.do)) return { ok: false, reason: "locked-action", op: r.do }; }
  return { ok: true };
}
const nearest = (s) => s.zs.filter((z) => z.hp > 0).sort((a, b) => dist(a, s) - dist(b, s) || a.y - b.y || a.x - b.x)[0];
function lineTarget(s) {
  let best = null;
  for (const z of s.zs) {
    if (z.hp <= 0 || (z.x !== s.x && z.y !== s.y)) continue;
    const d = dist(z, s); if (d > RANGE) continue;
    if (!best || d < dist(best, s)) best = z; // the first zombie on that line blocks the ones behind it
  }
  return best;
}
const holds = (c, s) => {
  const n = nearest(s);
  switch (c) {
    case "adjacent": return !!n && dist(n, s) === 1;
    case "inLine": return !!lineTarget(s);
    case "ammoEmpty": return s.ammo === 0;
    case "hpLow": return s.hp <= 2;
    case "far": return !!n && dist(n, s) >= 3;
    default: return true;
  }
};
const free = (s, x, y) => x >= 0 && y >= 0 && x < SIZE && y < SIZE && !s.zs.some((z) => z.hp > 0 && z.x === x && z.y === y);

function act(s, a, log) {
  if (a === "melee") { const t = s.zs.filter((z) => z.hp > 0 && dist(z, s) === 1).sort((p, q) => p.hp - q.hp || p.y - q.y || p.x - q.x)[0]; if (t) { t.hp--; log.push(t.hp <= 0 ? "melee-kill" : "melee"); } else log.push("whiff"); }
  else if (a === "shoot") { if (s.ammo <= 0) log.push("click"); else { s.ammo--; const t = lineTarget(s); if (t) { t.hp--; log.push(t.hp <= 0 ? "shot-kill" : "shot"); } else log.push("miss"); } }
  else if (a === "reload") { s.ammo = Math.min(MAG, s.maxAmmo, s.ammo + MAG); log.push("reload"); }
  else if (a === "heal") { if (s.med > 0) { s.med--; s.hp = Math.min(MAX_HP, s.hp + 2); log.push("heal"); } else log.push("nomed"); }
  else if (a === "retreat") {
    const n = nearest(s); let best = null;
    DIRS.forEach(([dx, dy]) => { const x = s.x + dx, y = s.y + dy; if (!free(s, x, y)) return; const d = n ? dist({ x, y }, n) : 0; if (!best || d > best.d) best = { x, y, d }; });
    if (best && (!n || best.d > dist(s, n))) { s.x = best.x; s.y = best.y; log.push("retreat"); } else log.push("cornered");
  } else log.push("wait");
}
function zombies(s, turn, log) {
  const order = s.zs.filter((z) => z.hp > 0).sort((a, b) => dist(a, s) - dist(b, s) || a.y - b.y || a.x - b.x);
  for (const z of order) {
    if (dist(z, s) === 1) { s.hp--; log.push("bite"); continue; }
    if (z.slow && turn % 2 === 1) continue;
    const dx = s.x - z.x, dy = s.y - z.y;
    const tries = Math.abs(dx) >= Math.abs(dy) ? [[Math.sign(dx), 0], [0, Math.sign(dy)]] : [[0, Math.sign(dy)], [Math.sign(dx), 0]];
    for (const [mx, my] of tries) { if ((!mx && !my) || !free(s, z.x + mx, z.y + my) || (z.x + mx === s.x && z.y + my === s.y)) continue; z.x += mx; z.y += my; break; }
  }
}
export function snapshot(s) { return { x: s.x, y: s.y, hp: s.hp, ammo: s.ammo, med: s.med, zs: s.zs.map((z) => ({ x: z.x, y: z.y, hp: z.hp, slow: !!z.slow })) }; }

/** Runs a rule list; returns { ok, reason, frames:[{state, rule, action, log}], turns }. */
export function run(level, rules) {
  const s = { x: START.x, y: START.y, hp: MAX_HP, ammo: Math.min(level.ammo, MAG), maxAmmo: level.ammo, med: level.med, zs: level.zombies.map((z) => ({ ...z })) };
  s.maxAmmo = Math.max(MAG, level.ammo);
  const frames = [{ state: snapshot(s), rule: -1, action: null, log: [] }];
  let turn = 0;
  while (turn < MAX_TURNS && s.hp > 0 && s.zs.some((z) => z.hp > 0)) {
    const log = [], ri = rules.findIndex((r) => holds(r.if, s));
    const a = ri < 0 ? "wait" : rules[ri].do;
    act(s, a, log); zombies(s, turn, log); turn++;
    frames.push({ state: snapshot(s), rule: ri, action: a, log });
  }
  const dead = s.hp <= 0, cleared = !s.zs.some((z) => z.hp > 0);
  return { ok: !dead && cleared, reason: dead ? "dead" : cleared ? null : "timeout", frames, turns: turn, hp: s.hp };
}
/** 3 stars: win using no more rules than the reference solution; 2: within +2; else 1. Surviving with 4+ hp is not required. */
export const stars = (level, rules) => (rules.length <= level.par ? 3 : rules.length <= level.par + 2 ? 2 : 1);
