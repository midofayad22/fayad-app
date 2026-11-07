import { extend, T, el, mount, card, status, F } from "/js/settings/ui.js";
import * as N from "/js/notifications.js";
extend({
  ar: { "nt.prefs": "أنواع الإشعارات", "nt.prefsD": "اختر ما تريد استلامه. الإيقاف يمنع إنشاء هذا النوع من الإشعارات مستقبلًا.", "nt.center": "مركز الإشعارات", "nt.unread": "غير مقروء", "nt.empty": "لا توجد إشعارات بعد. ستظهر هنا عند حدوث نشاط حقيقي مثل إنهاء درس أو كورس أو الوصول إلى نقاط جديدة.",
    "nt.markAll": "تعليم الكل كمقروء", "nt.clear": "مسح السجل", "nt.confirmClear": "سيتم حذف كل الإشعارات نهائيًا. متابعة؟", "nt.del": "حذف", "nt.read": "تعليم كمقروء", "nt.more": "عرض المزيد", "nt.open": "فتح",
    "nt.note": "الإشعارات تظهر داخل المنصة عندما تفتحها. لا يوجد إرسال إشعارات للهاتف أو البريد.", "nt.guestH": "سجّل الدخول لتصلك الإشعارات", "nt.now": "الآن",
    "nc.reminder": "تذكير بالتعلّم", "nc.incomplete": "تقدّم غير مكتمل", "nc.points": "النقاط", "nc.achievement": "الإنجازات", "nc.completion": "إنهاء الكورسات", "nc.milestone": "محطات التعلّم", "nc.announcement": "إعلانات المنصة",
    "nd.reminder": "عند الانقطاع عن التعلّم 3 أيام أو أكثر (مرة أسبوعيًا كحد أقصى)", "nd.incomplete": "كورس بدأته ولم تتابعه منذ أسبوع (مرة شهريًا لكل كورس)", "nd.points": "عند الوصول إلى 100 و250 و500 و1000 نقطة وما بعدها", "nd.achievement": "أول درس وأول تحدٍّ تحلّه",
    "nd.completion": "عند إكمال كل دروس كورس", "nd.milestone": "عند إكمال 10 و25 و50 و100 درس", "nd.announcement": "أخبار مهمة من المنصة" },
  en: { "nt.prefs": "Notification types", "nt.prefsD": "Choose what you want to receive. Turning a type off stops new notifications of that type from being created.", "nt.center": "Notification center", "nt.unread": "unread", "nt.empty": "No notifications yet. They appear here when something real happens, such as finishing a lesson or course or reaching new points.",
    "nt.markAll": "Mark all as read", "nt.clear": "Clear history", "nt.confirmClear": "All notifications will be permanently deleted. Continue?", "nt.del": "Delete", "nt.read": "Mark as read", "nt.more": "Show more", "nt.open": "Open",
    "nt.note": "Notifications appear inside the platform when you open it. There are no phone push or email notifications.", "nt.guestH": "Sign in to receive notifications", "nt.now": "Just now",
    "nc.reminder": "Learning reminders", "nc.incomplete": "Unfinished progress", "nc.points": "Points", "nc.achievement": "Achievements", "nc.completion": "Course completion", "nc.milestone": "Learning milestones", "nc.announcement": "Platform announcements",
    "nd.reminder": "When you have been away for 3 days or more (at most once a week)", "nd.incomplete": "A course you started but haven't touched for a week (once a month per course)", "nd.points": "When you reach 100, 250, 500, 1000 points and beyond", "nd.achievement": "Your first lesson and first solved challenge",
    "nd.completion": "When you finish every lesson of a course", "nd.milestone": "When you complete 10, 25, 50 and 100 lessons", "nd.announcement": "Important news from the platform" },
});
const lang = () => (document.documentElement.dataset.lang === "en" ? "en" : "ar");
export function when(iso, now = Date.now()) {
  const d = new Date(iso), s = Math.round((now - d.getTime()) / 1000), rtf = new Intl.RelativeTimeFormat(lang() === "en" ? "en" : "ar", { numeric: "auto" });
  if (s < 60) return T("nt.now"); if (s < 3600) return rtf.format(-Math.floor(s / 60), "minute"); if (s < 86400) return rtf.format(-Math.floor(s / 3600), "hour"); if (s < 86400 * 7) return rtf.format(-Math.floor(s / 86400), "day");
  return d.toLocaleDateString(lang() === "en" ? "en-GB" : "ar-EG", { dateStyle: "medium" });
}

mount("notifications", async (body, { client, user }) => {
  if (!user) { body.append(card(T("nt.guestH"), T("nt.note"), el("p", {}, el("a", { class: "st-btn", href: "/login.html" }, T("st.signin"))))); return; }
  const st = status(); const PAGE = 20;
  let prefs = (await N.getPrefs()) || {}, items = [], done = false;
  const listEl = el("ul", { class: "st-notifs" }); const more = el("button", { type: "button", class: "st-btn st-btn-ghost", hidden: true }, T("nt.more"));
  const count = el("span", { class: "st-count", role: "status" });
  const tell = () => window.dispatchEvent(new CustomEvent("fayad:notifchange"));
  const paint = () => {
    listEl.textContent = ""; const unread = items.filter((n) => !n.read_at).length; count.textContent = unread ? `${unread} ${T("nt.unread")}` : "";
    if (!items.length) { listEl.append(el("li", { class: "st-empty" }, T("nt.empty"))); }
    for (const n of items) {
      const r = N.render(n, lang(), n.ann);
      const li = el("li", { class: "st-notif" + (n.read_at ? "" : " unread"), "data-id": n.id, "data-cat": n.category },
        el("div", { class: "st-notif-b" }, el("strong", {}, r.title), r.body ? el("p", {}, r.body) : null,
          el("small", {}, el("span", {}, T("nc." + n.category)), " · ", el("time", { datetime: n.created_at, title: new Date(n.created_at).toLocaleString() }, when(n.created_at)))),
        el("div", { class: "st-notif-a" },
          r.href && r.href !== "/" ? el("a", { class: "st-btn st-btn-ghost", href: r.href, onclick: () => { if (!n.read_at) N.markRead([n.id]); } }, T("nt.open")) : null,
          n.read_at ? null : el("button", { type: "button", class: "st-btn st-btn-ghost", "data-act": "read" }, T("nt.read")),
          el("button", { type: "button", class: "st-btn st-btn-ghost", "data-act": "del" }, T("nt.del"))));
      listEl.append(li);
    }
    more.hidden = done; markAll.disabled = !unread; clear.disabled = !items.length;
  };
  const load = async (more_) => {
    try { const rows = await N.list({ limit: PAGE, before: more_ && items.length ? items[items.length - 1].created_at : null }); items = more_ ? items.concat(rows) : rows; done = rows.length < PAGE; st.clear(); }
    catch { st.err(T("st.offline")); }
    paint();
  };
  listEl.addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-act]"); if (!b) return; const id = b.closest("li").dataset.id; b.disabled = true;
    const ok = b.dataset.act === "read" ? await N.markRead([id]) : await N.remove([id]);
    if (!ok) { st.err(); b.disabled = false; return; }
    if (b.dataset.act === "read") items.find((n) => n.id === id).read_at = new Date().toISOString(); else items = items.filter((n) => n.id !== id);
    st.clear(); paint(); tell();
  });
  const markAll = el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: async () => { if (await N.markAllRead()) { const t = new Date().toISOString(); items.forEach((n) => (n.read_at ||= t)); paint(); tell(); } else st.err(); } }, T("nt.markAll"));
  const clear = el("button", { type: "button", class: "st-btn st-btn-ghost st-btn-danger", onclick: async () => { if (!confirm(T("nt.confirmClear"))) return; if (await N.clearAll()) { items = []; done = true; paint(); tell(); } else st.err(); } }, T("nt.clear"));
  more.addEventListener("click", () => load(true));

  const prefList = el("div", { class: "st-toggles" });
  for (const c of N.CATEGORIES) {
    const id = "np-" + c;
    const cb = el("input", { type: "checkbox", id, role: "switch", checked: prefs[c] !== false });
    cb.addEventListener("change", async () => { cb.disabled = true; const ok = await N.setPref(c, cb.checked); if (!ok) { cb.checked = !cb.checked; st.err(); } else st.ok(); cb.disabled = false; });
    prefList.append(el("label", { class: "st-toggle", for: id }, cb, el("span", { class: "st-toggle-t" }, el("strong", {}, T("nc." + c)), el("small", {}, T("nd." + c)))));
  }
  body.append(card(T("nt.prefs"), T("nt.prefsD"), prefList), card(T("nt.center"), null, el("div", { class: "st-actions st-actions-tight" }, count, markAll, clear), listEl, more), st.node, el("p", { class: "st-note" }, T("nt.note")));
  await load(false);
});
