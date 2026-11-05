/* Shared game store: "fayad-game-v1" = { v:1, points, games: { flex:{solved:{n:{at,hint}}}, sel:{...} } } (this device only).
   Migrates the first release shape { flex:{solved}, points }. Never throws. */
export const KEY = "fayad-game-v1";
export const POINTS = { solve: 10, noHint: 5 };
export function read() {
  let d = null;
  try { d = JSON.parse(localStorage.getItem(KEY)); } catch { d = null; }
  const out = { v: 1, points: 0, games: {} };
  if (d && d.v === 1) {
    out.points = Number.isFinite(d.points) ? Math.max(0, d.points | 0) : 0;
    const g = d.games || (d.flex ? { flex: d.flex } : {});
    for (const [id, v] of Object.entries(g)) if (v && typeof v.solved === "object" && v.solved) out.games[id] = { solved: { ...v.solved } };
  }
  return out;
}
export const solvedOf = (d, game) => Object.keys(d.games[game]?.solved || {}).length;
/** Records a first-time solve; returns points earned (0 if already solved). */
export function award(game, level, hinted, base = POINTS.solve) {
  const d = read();
  const g = (d.games[game] ||= { solved: {} });
  if (g.solved[level]) return { earned: 0, data: d };
  const earned = base + (hinted ? 0 : POINTS.noHint);
  g.solved[level] = { at: Date.now(), hint: !!hinted, pts: earned };
  d.points += earned;
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage full or blocked: play continues */ }
  try { document.dispatchEvent(new CustomEvent("fayad:solve", { detail: { game, level, earned } })); } catch { /* non-DOM */ }
  return { earned, data: d };
}

/** Union-merge solves (from the cloud) into the local store. Never lowers anything. Returns true if something was added. */
export function mergeSolves(rows) {
  const d = read(); let added = false;
  for (const r of rows) {
    const g = (d.games[r.game] ||= { solved: {} });
    if (g.solved[r.level]) continue;
    g.solved[r.level] = { at: Date.parse(r.solved_at) || Date.now(), hint: !!r.hinted, pts: r.points };
    d.points += r.points; added = true;
  }
  if (added) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* ignore */ } }
  return added;
}
/** Local solves as cloud rows (points default to the old flat rule when an entry predates per-solve points). */
export function solveRows(userId) {
  const d = read(), out = [];
  for (const [game, g] of Object.entries(d.games)) for (const [level, v] of Object.entries(g.solved)) {
    out.push({ user_id: userId, game, level: Number(level), points: Math.min(60, Math.max(0, Number.isFinite(v.pts) ? v.pts : POINTS.solve + (v.hint ? 0 : POINTS.noHint))), hinted: !!v.hint });
  }
  return out;
}
