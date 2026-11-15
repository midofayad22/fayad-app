/* Level-quality analysis for Zombie Survival: runs the reference solution and a set of generic strategies through the real engine. */
import { run, stars } from "../../js/game/zombie/engine.js";
import { compile } from "../../js/game/zombie/helpers.js";
import { LEVELS } from "../../js/game/zombie/levels.js";

const dirTo = (a, b) => { const dx = b.x - a.x, dy = b.y - a.y; return Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? "E" : "W") : dy > 0 ? "S" : "N"; };
const opp = (d) => ({ N: "S", S: "N", E: "W", W: "E" })[d];
const basic = (s) => { const z = s.zombies[0]; if (!z) return null; if (z.dist === 1) return "melee"; if (s.me.ammo === 0 && s.me.reserve > 0) return "reload"; if (z.line && s.me.ammo > 0) return "shoot " + z.line; return null; };
export const POLICIES = {
  "wait only": () => "wait",
  "nearest-first fighter": (s) => basic(s) || "wait",
  "sniper (never melee)": (s) => { const z = s.zombies.find((q) => q.line); if (z && s.me.ammo > 0) return "shoot " + z.line; if (s.me.ammo === 0 && s.me.reserve > 0) return "reload"; return "wait"; },
  "kiter (fight + back away)": (s) => { const z = s.zombies[0]; if (z && z.dist <= 2 && z.dist > 1) { const d = opp(dirTo(s.me, z)); if (s.me.can[d]) return "move " + d; } return basic(s) || "wait"; },
  "exit rusher": (s) => (s.exit ? "move " + dirTo(s.me, s.exit) : "wait"),
  "medic fighter": (s) => (s.me.hp <= 2 && s.me.med > 0 ? "heal" : basic(s) || "wait"),
};
export function mechanics(l) {
  const m = new Set(); const g = l.grid.join("");
  m.add("goal:" + l.goal);
  for (const t of new Set(l.zombies.map((z) => z.t))) m.add(t);
  if (g.includes("B")) m.add("barricades"); if (g.includes("^")) m.add("traps"); if (g.includes("M")) m.add("medkit"); if (g.includes("A")) m.add("ammo pickup"); if (g.includes("#")) m.add("cover/walls");
  if (l.allies) m.add("allies"); if (l.noise) m.add("noise"); if (l.zombies.some((z) => z.at > 0)) m.add("waves"); if (l.hp && l.hp < 5) m.add("low start hp"); if (l.reserve === 0 && l.ammo <= 4) m.add("tight ammo");
  return [...m];
}
export function analyze() {
  return LEVELS.map((l) => {
    const ref = run(l, compile(l.solution)), res = { id: l.id, ref: { ok: ref.ok, stars: stars(l, ref), bonus: ref.bonus, turns: ref.turns, hp: ref.hp, shots: ref.stats.shots, error: ref.error }, strategies: {}, mechanics: mechanics(l) };
    for (const [k, p] of Object.entries(POLICIES)) { const r = run(l, p); res.strategies[k] = r.ok; }
    return res;
  });
}
