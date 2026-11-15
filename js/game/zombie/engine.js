/*
  FAYAD Zombie Survival — pure, deterministic turn engine (no DOM, no randomness).
  The learner writes a JavaScript function act(s) that is called once per turn with a read-only view of the game
  (s.me, s.zombies, s.allies, s.items ...). It returns one action string:
      "wait" | "reload" | "heal" | "melee"
      "shoot" (nearest zombie in a straight, clear line) | "shoot N|E|S|W"
      "move N|E|S|W"     "throw N|E|S|W"  (noise lands up to 3 cells away and lures every zombie for a few turns)
  The engine itself never runs learner code: tests call it with plain functions, the game runs the learner code inside the
  sandboxed Worker (js/game/zombie/sandbox.js) and then replays the recorded actions here to animate them.
  This file must stay a single script of plain declarations (only `export` prefixes) because sandbox.js inlines it.

  Map legend:  # wall   B barricade (zombies break it)   ^ spike trap   A ammo   M medkit   E exit   . floor
  Zombies:  walker (2 hp, moves every 2nd turn) · runner (1 hp, every turn) · brute (4 hp, bites for 2, every 2nd turn)
            · spitter (2 hp, every 2nd turn, hurts from up to 3 cells away in a clear line)
  Goals:  clear | survive (turns) | exit | escort (player on E with every ally alive and next to it)
*/
export const SIZE = 7, MAX_TURNS = 60, RANGE = 4, MAX_HP = 5, MAG = 4;
export const DIRS = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
export const DIR_KEYS = ["N", "E", "S", "W"];
export const TYPES = { walker: { hp: 2, every: 2, dmg: 1 }, runner: { hp: 1, every: 1, dmg: 1 }, brute: { hp: 4, every: 2, dmg: 2 }, spitter: { hp: 2, every: 2, dmg: 1, range: 3 } };
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const idOf = (x, y) => y * SIZE + x;
const inb = (x, y) => x >= 0 && y >= 0 && x < SIZE && y < SIZE;

function init(level) {
  const s = { x: level.start.x, y: level.start.y, hp: level.hp || MAX_HP, ammo: Math.min(MAG, level.ammo), reserve: level.reserve || 0, med: level.med || 0, noiseLeft: level.noise || 0, turn: 0,
    kills: 0, shots: 0, taken: 0, walls: new Set(), bars: new Map(), traps: new Set(), items: new Map(), exit: null, noise: null, over: null, zs: [], allies: [] };
  level.grid.forEach((row, y) => [...row].forEach((c, x) => {
    const id = idOf(x, y);
    if (c === "#") s.walls.add(id); else if (c === "B") s.bars.set(id, 2); else if (c === "^") s.traps.add(id); else if (c === "A" || c === "M") s.items.set(id, c); else if (c === "E") s.exit = { x, y };
  }));
  s.zs = level.zombies.map((z, i) => ({ id: i, x: z.x, y: z.y, t: z.t, hp: TYPES[z.t].hp, at: z.at || 0, alive: true }));
  s.allies = (level.allies || []).map((a, i) => ({ id: i, x: a.x, y: a.y, hp: 2, alive: true }));
  return s;
}
const live = (s) => s.zs.filter((z) => z.alive && z.at <= s.turn);
const blockedFor = (s, x, y, ignore) => !inb(x, y) || s.walls.has(idOf(x, y)) || (s.x === x && s.y === y && ignore !== "me") || live(s).some((z) => z.x === x && z.y === y && z !== ignore) || s.allies.some((a) => a.alive && a.x === x && a.y === y && a !== ignore);

/** first zombie hit by a shot / line of sight from (x,y) in direction d (stops at walls and barricades) */
function ray(s, x, y, d, range) {
  for (let k = 1; k <= range; k++) {
    const cx = x + DIRS[d][0] * k, cy = y + DIRS[d][1] * k, id = idOf(cx, cy);
    if (!inb(cx, cy) || s.walls.has(id) || s.bars.has(id)) return null;
    const z = live(s).find((q) => q.x === cx && q.y === cy); if (z) return z;
  }
  return null;
}
function autoDir(s) {
  let best = null;
  for (const d of DIR_KEYS) { const z = ray(s, s.x, s.y, d, RANGE); if (z) { const k = dist(z, s); if (!best || k < best.k) best = { d, k }; } }
  return best && best.d;
}

/** breadth-first next step from a to b; barricades are passable (they are broken, not walked through); `me` marks the player's cell as a goal */
function nextStep(s, a, b, self) {
  const seen = new Set([idOf(a.x, a.y)]); let frontier = [{ x: a.x, y: a.y, first: null }];
  while (frontier.length) {
    const next = [];
    for (const c of frontier) for (const d of DIR_KEYS) {
      const x = c.x + DIRS[d][0], y = c.y + DIRS[d][1]; if (!inb(x, y)) continue; const id = idOf(x, y); if (seen.has(id)) continue; seen.add(id);
      if (x === b.x && y === b.y) return c.first || { x, y };
      if (s.walls.has(id)) continue;
      if (blockedFor(s, x, y, self) && !s.bars.has(id)) continue;
      next.push({ x, y, first: c.first || { x, y } });
    }
    frontier = next;
  }
  return null;
}

export function view(s, level) {
  const zombies = live(s).map((z) => { const line = DIR_KEYS.find((d) => ray(s, s.x, s.y, d, RANGE) === z) || null; return { id: z.id, x: z.x, y: z.y, hp: z.hp, type: z.t, dist: dist(z, s), line }; })
    .sort((p, q) => p.dist - q.dist || p.id - q.id);
  const can = {}; for (const d of DIR_KEYS) { const x = s.x + DIRS[d][0], y = s.y + DIRS[d][1]; can[d] = !blockedFor(s, x, y, "me") && !s.bars.has(idOf(x, y)); }
  const cells = (set, fn) => [...set].map((id) => fn(id % SIZE, Math.floor(id / SIZE), id));
  return Object.freeze({
    turn: s.turn, goal: level.goal, turnsLeft: level.goal === "survive" ? Math.max(0, level.turns - s.turn) : null,
    me: { x: s.x, y: s.y, hp: s.hp, ammo: s.ammo, reserve: s.reserve, med: s.med, noise: s.noiseLeft, can },
    zombies, allies: s.allies.filter((a) => a.alive).map((a) => ({ x: a.x, y: a.y, hp: a.hp, dist: dist(a, s) })),
    exit: s.exit ? { x: s.exit.x, y: s.exit.y, dist: dist(s.exit, s) } : null,
    items: [...s.items].map(([id, k]) => ({ x: id % SIZE, y: Math.floor(id / SIZE), type: k === "A" ? "ammo" : "med", dist: Math.abs(id % SIZE - s.x) + Math.abs(Math.floor(id / SIZE) - s.y) })),
    traps: cells(s.traps, (x, y) => ({ x, y })), barricades: [...s.bars].map(([id, hp]) => ({ x: id % SIZE, y: Math.floor(id / SIZE), hp })),
    noiseAt: s.noise ? { x: s.noise.x, y: s.noise.y, turns: s.noise.ttl } : null,
  });
}
export function snapshot(s) {
  return { x: s.x, y: s.y, hp: s.hp, ammo: s.ammo, reserve: s.reserve, med: s.med, noiseLeft: s.noiseLeft, turn: s.turn,
    zs: s.zs.map((z) => ({ id: z.id, x: z.x, y: z.y, hp: z.hp, t: z.t, alive: z.alive, here: z.at <= s.turn })), allies: s.allies.map((a) => ({ x: a.x, y: a.y, hp: a.hp, alive: a.alive })),
    bars: [...s.bars].map(([id, hp]) => [id, hp]), traps: [...s.traps], items: [...s.items], noise: s.noise ? { x: s.noise.x, y: s.noise.y, ttl: s.noise.ttl } : null };
}

function pickup(s, ev) {
  const id = idOf(s.x, s.y), k = s.items.get(id);
  if (k) { s.items.delete(id); if (k === "A") s.reserve += 3; else s.med++; ev.push({ k: "pick", x: s.x, y: s.y, what: k === "A" ? "ammo" : "med" }); }
  if (s.traps.has(id)) { s.traps.delete(id); s.hp -= 2; s.taken += 2; ev.push({ k: "trap", me: true, x: s.x, y: s.y }); }
}

function playerAct(s, raw, ev) {
  const parts = String(raw == null ? "" : raw).trim().split(/\s+/), a = (parts[0] || "").toLowerCase(), arg = (parts[1] || "").toUpperCase();
  const hasDir = DIR_KEYS.includes(arg);
  if (a === "wait") ev.push({ k: "wait" });
  else if (a === "reload") { const n = Math.min(MAG - s.ammo, s.reserve); if (n > 0) { s.ammo += n; s.reserve -= n; ev.push({ k: "reload", n }); } else ev.push({ k: "noreload" }); }
  else if (a === "heal") { if (s.med > 0 && s.hp < MAX_HP) { s.med--; s.hp = Math.min(MAX_HP, s.hp + 2); ev.push({ k: "heal" }); } else ev.push({ k: "noheal" }); }
  else if (a === "melee") { const t = live(s).filter((z) => dist(z, s) === 1).sort((p, q) => p.hp - q.hp || p.id - q.id)[0]; if (t) { t.hp--; if (t.hp <= 0) { t.alive = false; s.kills++; } ev.push({ k: "melee", z: t.id, kill: !t.alive }); } else ev.push({ k: "swing" }); }
  else if (a === "shoot") {
    if (s.ammo <= 0) ev.push({ k: "click" });
    else {
      const d = hasDir ? arg : autoDir(s); s.ammo--; s.shots++;
      const t = d ? ray(s, s.x, s.y, d, RANGE) : null;
      if (t) { t.hp--; if (t.hp <= 0) { t.alive = false; s.kills++; } ev.push({ k: "shot", d, z: t.id, kill: !t.alive }); } else ev.push({ k: "miss", d: d || "N" });
    }
  } else if (a === "move" && hasDir) {
    const x = s.x + DIRS[arg][0], y = s.y + DIRS[arg][1];
    if (blockedFor(s, x, y, "me") || s.bars.has(idOf(x, y))) ev.push({ k: "bump", d: arg }); else { s.x = x; s.y = y; ev.push({ k: "move", d: arg }); pickup(s, ev); }
  } else if (a === "throw" && hasDir) {
    if (s.noiseLeft <= 0) ev.push({ k: "nonoise" });
    else {
      let x = s.x, y = s.y; for (let k = 0; k < 3; k++) { const nx = x + DIRS[arg][0], ny = y + DIRS[arg][1]; if (!inb(nx, ny) || s.walls.has(idOf(nx, ny)) || s.bars.has(idOf(nx, ny))) break; x = nx; y = ny; }
      s.noiseLeft--; s.noise = { x, y, ttl: 4 }; ev.push({ k: "throw", x, y });
    }
  } else ev.push({ k: "invalid", text: String(raw).slice(0, 24) });
}

function alliesAct(s, ev) {
  for (const a of s.allies) {
    if (!a.alive || dist(a, s) <= 1) continue;
    const n = nextStep(s, a, s, a); if (n && !(n.x === s.x && n.y === s.y) && !blockedFor(s, n.x, n.y, a) && !s.bars.has(idOf(n.x, n.y))) { ev.push({ k: "ally", i: a.id, from: [a.x, a.y], to: [n.x, n.y] }); a.x = n.x; a.y = n.y; }
  }
}
function hurt(s, who, dmg, ev, by, extra) {
  if (who === "me") { s.hp -= dmg; s.taken += dmg; ev.push({ k: extra || "bite", z: by, me: true, dmg }); }
  else { who.hp -= dmg; if (who.hp <= 0) who.alive = false; ev.push({ k: extra || "bite", z: by, ally: who.id, dmg }); }
}
function zombiesAct(s, ev) {
  const order = live(s).sort((p, q) => dist(p, s) - dist(q, s) || p.id - q.id);
  for (const z of order) {
    if (!z.alive) continue;
    const T = TYPES[z.t], targets = [{ who: "me", x: s.x, y: s.y }, ...s.allies.filter((a) => a.alive).map((a) => ({ who: a, x: a.x, y: a.y }))].sort((p, q) => dist(z, p) - dist(z, q));
    const tg = s.noise ? { who: null, x: s.noise.x, y: s.noise.y } : targets[0];
    // ranged spit
    if (T.range) {
      const hit = targets.find((t) => (t.x === z.x || t.y === z.y) && dist(z, t) <= T.range && dist(z, t) > 1 && clearLine(s, z, t));
      if (hit && !s.noise) { hurt(s, hit.who, T.dmg, ev, z.id, "spit"); continue; }
    }
    const adj = targets.find((t) => dist(z, t) === 1);
    if (adj && !s.noise) { hurt(s, adj.who, T.dmg, ev, z.id); continue; }
    if (s.turn % T.every !== 0) continue;
    const n = nextStep(s, z, tg, z); if (!n) continue;
    const nid = idOf(n.x, n.y);
    if (s.bars.has(nid)) { const hp = s.bars.get(nid) - 1; if (hp <= 0) s.bars.delete(nid); else s.bars.set(nid, hp); ev.push({ k: "bar", z: z.id, x: n.x, y: n.y, hp: Math.max(0, hp) }); continue; }
    if (blockedFor(s, n.x, n.y, z)) continue;
    ev.push({ k: "zmove", z: z.id, from: [z.x, z.y], to: [n.x, n.y] }); z.x = n.x; z.y = n.y;
    if (s.traps.has(nid)) { s.traps.delete(nid); z.hp -= 3; if (z.hp <= 0) { z.alive = false; s.kills++; } ev.push({ k: "trap", z: z.id, x: n.x, y: n.y, kill: !z.alive }); }
  }
}
function clearLine(s, a, b) { const dx = Math.sign(b.x - a.x), dy = Math.sign(b.y - a.y); let x = a.x + dx, y = a.y + dy; while (x !== b.x || y !== b.y) { const id = idOf(x, y); if (s.walls.has(id) || s.bars.has(id)) return false; x += dx; y += dy; } return true; }

function judge(s, level) {
  if (s.hp <= 0) return "dead";
  if (s.allies.some((a) => !a.alive)) return "ally";
  const onExit = s.exit && s.x === s.exit.x && s.y === s.exit.y;
  if (level.goal === "clear" && !s.zs.some((z) => z.alive)) return "win";
  if (level.goal === "exit" && onExit) return "win";
  if (level.goal === "escort" && onExit && s.allies.every((a) => a.alive && dist(a, s.exit) <= 1)) return "win";
  if (level.goal === "survive" && s.turn >= level.turns) return "win";
  return null;
}
const REASON = { dead: "dead", ally: "ally" };

/** Runs a level. `policy(view, turn)` returns the action string each turn (it may throw: the run stops with reason "error"). */
export function run(level, policy) {
  const s = init(level), frames = [{ state: snapshot(s), action: null, ev: [], turn: 0 }], limit = level.limit || MAX_TURNS; let end = null, error = null;
  while (!end && s.turn < limit) {
    let action;
    try { action = policy(view(s, level), s.turn); } catch (e) { error = e && e.message ? String(e.message) : String(e); break; }
    const ev = [];
    playerAct(s, action, ev);
    end = judge(s, level);
    if (!end) { alliesAct(s, ev); end = judge(s, level); }
    if (!end) { zombiesAct(s, ev); if (s.noise && --s.noise.ttl <= 0) s.noise = null; end = judge(s, level); }
    s.turn++;
    if (!end && level.goal === "survive") end = judge(s, level);
    frames.push({ state: snapshot(s), action: String(action == null ? "" : action).slice(0, 24), ev, turn: s.turn });
  }
  const ok = end === "win";
  const reason = ok ? null : error ? "error" : REASON[end] || "timeout";
  const stats = { turns: s.turn, hp: s.hp, ammo: s.ammo + s.reserve, shots: s.shots, kills: s.kills, taken: s.taken };
  return { ok, reason, error, frames, turns: s.turn, hp: s.hp, stats, bonus: ok && bonusMet(level, stats) };
}
export function bonusMet(level, st) {
  const b = level.bonus; if (!b) return false;
  return b.kind === "ammo" ? st.ammo >= b.n : b.kind === "hp" ? st.hp >= b.n : b.kind === "turns" ? st.turns <= b.n : b.kind === "shots" ? st.shots <= b.n : b.kind === "clean" ? st.taken === 0 : false;
}
/** 1 star for winning, +1 for finishing healthy (3+ hp), +1 for the level's bonus objective. */
export function stars(level, res) { return res.ok ? 1 + (res.hp >= 3 ? 1 : 0) + (res.bonus ? 1 : 0) : 0; }
/** replays recorded actions (what the sandbox returned) through the engine */
export function replay(level, actions, error) {
  let i = 0; const r = run(level, () => { if (i >= actions.length) { if (error) throw new Error(error); return "wait"; } return actions[i++]; });
  return r;
}
export function validate(level, code) {
  if (typeof code !== "string" || !code.trim()) return { ok: false, reason: "empty" };
  if (code.length > 6000) return { ok: false, reason: "long" };
  return { ok: true };
}
