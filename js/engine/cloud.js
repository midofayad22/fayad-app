/*
  Cloud sync (Supabase), best-effort and silent: if the visitor is signed out, offline, or anything fails, the site keeps working
  from local storage exactly as before. Local data is the source of truth for the UI; the cloud is additive (never lowers or deletes).
    - lesson progress  -> lesson_completions / quiz_results / assessment_results   (via sync.js)
    - game solves      -> game_solves
    - leaderboard      -> rpc get_leaderboard (public: display name + totals only)
  RLS on the server limits every user to their own rows.
*/
import { createProgress } from "/js/engine/progress.js";
import { createSync } from "/js/engine/sync.js";
import { mergeSolves, solveRows } from "/js/game/store.js";

const client = () => window.FAYAD_AUTH?.client || null;
async function uid(c) { try { const { data } = await c.auth.getUser(); return data?.user?.id || null; } catch { return null; } }

export async function syncProgress() {
  const c = client(); if (!c) return { ok: false, reason: "no-client" };
  const tracks = window.FAYAD?.catalog?.tracks || [];
  const totals = Object.fromEntries(tracks.map((t) => [t.id, t.total]));
  const r = await createSync({ client: c, progress: createProgress({ totals }), enabled: true }).sync();
  if (r.ok) document.dispatchEvent(new CustomEvent("fayad:cloudsync", { detail: r }));
  return r;
}

export async function syncGames() {
  const c = client(); if (!c) return { ok: false, reason: "no-client" };
  try {
    const id = await uid(c); if (!id) return { ok: false, reason: "signed-out" };
    const { data, error } = await c.from("game_solves").select("game,level,points,hinted,solved_at").eq("user_id", id);
    if (error) throw error;
    const added = mergeSolves(data || []);
    const have = new Set((data || []).map((r) => `${r.game}:${r.level}`));
    const missing = solveRows(id).filter((r) => !have.has(`${r.game}:${r.level}`));
    let pushed = 0;
    for (const r of missing) {                       // points are decided by the server (submit_solve); we only report which level and whether hints were used
      const { error: e2 } = await c.rpc("submit_solve", { p_game: r.game, p_level: r.level, p_hinted: r.hinted });
      if (e2) { if (/rate_limited/.test(e2.message)) break; if (/unknown_level/.test(e2.message)) continue; throw e2; }
      pushed++;
    }
    if (pushed) { const { data: again } = await c.from("game_solves").select("game,level,points,hinted,solved_at").eq("user_id", id); mergeSolves(again || []); }
    return { ok: true, pulled: added, pushed };
  } catch (e) { return { ok: false, reason: "error", message: String(e?.message || e) }; }
}

export async function leaderboard(limit = 20) {
  const c = client(); if (!c) return null;
  try { const { data, error } = await c.rpc("get_leaderboard", { max_rows: limit }); return error ? null : data; } catch { return null; }
}

/** Fire-and-forget after any local change; waits for the auth library the pages already load. */
export function syncSoon() {
  const run = () => { syncProgress(); syncGames(); };
  if (client()) setTimeout(run, 800); else window.addEventListener("load", () => setTimeout(() => client() && run(), 1200), { once: true });
}

document.addEventListener("fayad:solve", () => { if (client()) syncGames(); });
