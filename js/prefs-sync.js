/*
  Account-level preference sync (Supabase table user_preferences, one jsonb row per user, own-row RLS).
  Last-writer-wins on a millisecond timestamp:
    - sign-in / page load: newer side wins (guest settings made on this device reconcile with the account here);
    - local change: pushed after a short debounce; offline or failed pushes stay marked pending and retry on 'online' / next load.
  Anonymous visitors never load Supabase; their settings live only in localStorage (fayad-prefs-v1).
*/
import { ensureClient } from "/js/engine/cloud.js";

const P = () => window.FAYAD?.prefs;
const PENDING = "fayad-prefs-pending";
const flag = (v) => { try { v ? localStorage.setItem(PENDING, "1") : localStorage.removeItem(PENDING); } catch {} };
let timer = 0, running = null;

const payload = () => ({ ...P().all, lang: P().lang });

async function uid(c) { try { const { data } = await c.auth.getUser(); return data?.user?.id || null; } catch { return null; } }

export async function pull(c, id) {
  const { data, error } = await c.from("user_preferences").select("data,updated_at").eq("user_id", id).maybeSingle();
  if (error) throw error;
  return data ? { data: data.data || {}, ts: Date.parse(data.updated_at) || 0 } : null;
}
export async function push(c, id) {
  const body = payload(); const ts = body.updatedAt || Date.now(); delete body.updatedAt;
  const { error } = await c.from("user_preferences").upsert({ user_id: id, data: body, updated_at: new Date(ts).toISOString() }, { onConflict: "user_id" });
  if (error) throw error;
  flag(false);
}

export function syncPrefs() {
  if (running) return running;
  running = (async () => {
    try {
      const c = await ensureClient(); if (!c) return { ok: false, reason: "no-client" };
      const id = await uid(c); if (!id) return { ok: false, reason: "signed-out" };
      const remote = await pull(c, id);
      const local = P().all;
      if (!remote) { if (local.updatedAt > 0) await push(c, id); return { ok: true, action: remote ? "none" : "created" }; }
      if (remote.ts > local.updatedAt) {
        const { lang, ...rest } = remote.data;
        P().applyRemote(rest, remote.ts);
        if (lang === "ar" || lang === "en") P().setLang(lang, remote.ts);
        flag(false);
        return { ok: true, action: "pulled" };
      }
      if (local.updatedAt > remote.ts || localStorage.getItem(PENDING)) { await push(c, id); return { ok: true, action: "pushed" }; }
      return { ok: true, action: "none" };
    } catch (e) { flag(true); return { ok: false, reason: "error", message: String(e?.message || e) }; }
    finally { running = null; }
  })();
  return running;
}

function schedule() { clearTimeout(timer); flag(true); timer = setTimeout(syncPrefs, 900); }

export function start() {
  window.addEventListener("fayad:prefschange", (e) => { if (!e.detail.changed.includes("sync")) schedule(); });
  window.addEventListener("online", () => { if (localStorage.getItem(PENDING)) syncPrefs(); });
  window.addEventListener("fayad-auth-changed", (e) => { if (e.detail?.event === "SIGNED_IN") syncPrefs(); });
  return syncPrefs().then((r) => { document.dispatchEvent(new CustomEvent("fayad:prefssync", { detail: r })); return r; });
}
