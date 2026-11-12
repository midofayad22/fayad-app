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
import { TOTALS } from "/js/engine/totals.js";
import { mergeSolves, solveRows } from "/js/game/store.js";

const client = () => window.FAYAD_AUTH?.client || null;
const SESSION_KEYS = ["fayad-supabase-auth", "sb-vsrysitexadvmmikcmfs-auth-token"]; // the client persists under fayad-supabase-auth (main-auth.js); the sb- key is the legacy name
const hasSession = () => { try { return SESSION_KEYS.some((k) => !!localStorage.getItem(k)); } catch { return false; } };
const load = (src) => new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
/** The auth libraries are only downloaded when this device has a saved sign-in (anonymous visitors pay nothing). */
export async function ensureClient() {
  if (client()) return client();
  if (!hasSession()) return null;
  try {
    if (!window.supabase) await load("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
    if (!client()) await load("/js/main-auth.js");
  } catch { return null; }
  return client();
}
async function uid(c) { try { const { data } = await c.auth.getUser(); return data?.user?.id || null; } catch { return null; } }

export async function syncProgress() {
  const c = await ensureClient(); if (!c) return { ok: false, reason: "no-client" };
  const r = await createSync({ client: c, progress: createProgress({ totals: TOTALS }), enabled: true }).sync();
  if (r.ok) document.dispatchEvent(new CustomEvent("fayad:cloudsync", { detail: r }));
  return r;
}

export async function syncGames() {
  const c = await ensureClient(); if (!c) return { ok: false, reason: "no-client" };
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
  try {
    // v2 (migration 0007) adds avatar_url (only when the owner allows it) + is_me; until it is applied we fall back to the original function.
    const v2 = await c.rpc("get_leaderboard_v2", { max_rows: limit });
    if (!v2.error && Array.isArray(v2.data) && v2.data.every((r) => r && "display_name" in r)) return v2.data;
    const { data, error } = await c.rpc("get_leaderboard", { max_rows: limit }); return error ? null : data;
  } catch { return null; }
}

let started = false;
/** Pull-merge-push once, then again whenever the local progress record changes (debounced) and when the tab is hidden. */
export function startSync() {
  if (started) return; started = true;
  let busy = false, timer = 0, last = null;
  const snap = () => { try { return localStorage.getItem("fayad-progress-v1"); } catch { return null; } };
  const run = async () => { if (busy) return; busy = true; try { await syncProgress(); last = snap(); } finally { busy = false; } };
  const later = () => { clearTimeout(timer); timer = setTimeout(run, 2500); };
  (async () => {
    const c = await ensureClient(); if (!c) return;
    c.auth.onAuthStateChange?.((ev) => { if (ev === "SIGNED_IN") later(); });
    await run();
    setInterval(() => { if (document.visibilityState === "visible" && snap() !== last) later(); }, 4000);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && snap() !== last) run(); });
  })();
}

document.addEventListener("fayad:solve", () => { if (client()) syncGames(); });
