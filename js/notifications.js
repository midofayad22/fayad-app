/*
  In-app notifications (Supabase tables notifications / notification_prefs / announcements; see migration 0005).
  Rows are created by the database from real events; this module only reads, marks read, deletes, and renders them.
  There is no push or email delivery: notifications appear when the user opens the platform.
*/
import { ensureClient } from "/js/engine/cloud.js";
import { NAMES, PATH } from "/js/nav-drawer.js";

export const CATEGORIES = ["reminder", "incomplete", "points", "achievement", "completion", "milestone", "announcement"];
const L = {
  ar: {
    first_lesson: ["أنجزت أول درس", "بداية موفقة! أكملت أول درس لك على المنصة.", "/dashboard.html"],
    lessons_total: (p) => [`أكملت ${p.count} درسًا`, "تقدّم رائع، استمر على هذا الإيقاع.", "/dashboard.html"],
    course_complete: (p) => [`أنهيت كورس ${nm(p.track, "ar")}`, `أكملت كل دروس ${nm(p.track, "ar")}. مبارك!`, PATH[p.track] || "/dashboard.html"],
    points_total: (p) => [`وصلت إلى ${p.points} نقطة`, "نقاطك من حل التحديات في الألعاب.", "/play/index.html"],
    first_solve: ["حللت أول تحدٍّ", "أول مستوى تحلّه في الألعاب البرمجية.", "/play/index.html"],
    inactive: (p) => ["حان وقت المتابعة", `مرّت ${p.days} أيام منذ آخر نشاط لك. دقائق قليلة اليوم تكفي لتستمر.`, "/dashboard.html"],
    unfinished_course: (p) => [`تابع ${nm(p.track, "ar")}`, `أنجزت ${p.done} من ${p.total} درسًا في هذا الكورس.`, PATH[p.track] || "/dashboard.html"],
    announcement: () => ["إعلان من المنصة", "", "/"],
  },
  en: {
    first_lesson: ["You finished your first lesson", "A great start! You completed your first lesson on the platform.", "/dashboard.html"],
    lessons_total: (p) => [`${p.count} lessons completed`, "Great progress, keep this pace.", "/dashboard.html"],
    course_complete: (p) => [`You finished ${nm(p.track, "en")}`, `You completed every lesson of ${nm(p.track, "en")}. Congratulations!`, PATH[p.track] || "/dashboard.html"],
    points_total: (p) => [`You reached ${p.points} points`, "Points come from solving game challenges.", "/play/index.html"],
    first_solve: ["You solved your first challenge", "Your first solved level in the coding games.", "/play/index.html"],
    inactive: (p) => ["Time to continue", `It has been ${p.days} days since your last activity. A few minutes today is enough to keep going.`, "/dashboard.html"],
    unfinished_course: (p) => [`Continue ${nm(p.track, "en")}`, `You completed ${p.done} of ${p.total} lessons in this course.`, PATH[p.track] || "/dashboard.html"],
    announcement: () => ["Platform announcement", "", "/"],
  },
};
const nm = (t, lang) => (NAMES[t] ? NAMES[t][lang === "en" ? 1 : 0] : t);

/** n: {kind, params}; ann: optional announcement row for kind "announcement" */
export function render(n, lang = "ar", ann = null) {
  const l = lang === "en" ? "en" : "ar";
  if (n.kind === "announcement" && ann) return { title: ann["title_" + l], body: ann["body_" + l], href: ann.url || "/" };
  const e = L[l][n.kind]; if (!e) return { title: l === "en" ? "Notification" : "إشعار", body: "", href: "/" };
  const [title, body, href] = typeof e === "function" ? e(n.params || {}) : e;
  return { title, body, href };
}

async function ctx() { const c = await ensureClient(); if (!c) return null; try { const { data } = await c.auth.getUser(); return data?.user ? { c, uid: data.user.id } : null; } catch { return null; } }

export async function refresh() { const x = await ctx(); if (!x) return null; try { const { data, error } = await x.c.rpc("refresh_notifications"); return error ? null : data; } catch { return null; } }
export async function unreadCount() {
  const x = await ctx(); if (!x) return null;
  try { const { count, error } = await x.c.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null); return error ? null : count || 0; } catch { return null; }
}
export async function list({ limit = 50, before = null } = {}) {
  const x = await ctx(); if (!x) return null;
  let q = x.c.from("notifications").select("id,category,kind,params,created_at,read_at").order("created_at", { ascending: false }).limit(limit);
  if (before) q = q.lt("created_at", before);
  const { data, error } = await q; if (error) throw error;
  const ids = [...new Set((data || []).filter((n) => n.kind === "announcement").map((n) => n.params?.id).filter(Boolean))];
  const ann = {};
  if (ids.length) { const r = await x.c.from("announcements").select("id,title_ar,title_en,body_ar,body_en,url").in("id", ids); (r.data || []).forEach((a) => (ann[a.id] = a)); }
  return (data || []).map((n) => ({ ...n, ann: ann[n.params?.id] || null }));
}
export async function markRead(ids) { const x = await ctx(); if (!x) return false; const { error } = await x.c.from("notifications").update({ read_at: new Date().toISOString() }).in("id", ids).is("read_at", null); return !error; }
export async function markAllRead() { const x = await ctx(); if (!x) return false; const { error } = await x.c.from("notifications").update({ read_at: new Date().toISOString() }).is("read_at", null); return !error; }
export async function remove(ids) { const x = await ctx(); if (!x) return false; const { error } = await x.c.from("notifications").delete().in("id", ids); return !error; }
export async function clearAll() { const x = await ctx(); if (!x) return false; const { error } = await x.c.from("notifications").delete().eq("user_id", x.uid); return !error; }
export async function getPrefs() {
  const x = await ctx(); if (!x) return null;
  const { data } = await x.c.from("notification_prefs").select("*").eq("user_id", x.uid).maybeSingle();
  return Object.fromEntries(CATEGORIES.map((k) => [k, data ? data[k] !== false : true]));
}
export async function setPref(cat, on) {
  if (!CATEGORIES.includes(cat)) return false; const x = await ctx(); if (!x) return false;
  const { error } = await x.c.from("notification_prefs").upsert({ user_id: x.uid, [cat]: !!on, updated_at: new Date().toISOString() }, { onConflict: "user_id" }); return !error;
}
