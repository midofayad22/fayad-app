/*
  Account menu: the avatar button in the navbar opens a panel with the learner's REAL data.
  - identity (name, email, avatar) comes from the Supabase user passed in by js/main-auth.js
  - progress (lessons, %, points, where to continue) comes from the learner's own `fayad-progress-v1` record
  Nothing is invented: a new learner sees an honest empty state. Every string is set with textContent (no innerHTML with data).
*/
import { createProgress } from "/js/engine/progress.js";
import { computeStats } from "/js/engine/stats.js";

const F = window.FAYAD || {};
const i18n = F.i18n;
// catalog.js is a classic deferred script that may run after this module: always read it lazily
const getTracks = () => (window.FAYAD && window.FAYAD.catalog && window.FAYAD.catalog.tracks) || [];
const NAMES = { com: "Computer Fundamentals", prg: "Programming Fundamentals", html: "HTML", css: "CSS", js: "JavaScript", ajs: "Advanced JavaScript", bs: "Bootstrap 5", tw: "Tailwind CSS", react: "React", vue: "Vue", angular: "Angular" };

i18n?.extend({
  ar: {
    "am.menu": "قائمة الحساب", "am.progress": "تقدمك", "am.lessons": "{done} من {total} درسًا", "am.points": "{p} نقطة",
    "am.continue": "تابع من حيث توقفت", "am.go": "تابع", "am.empty": "لم تبدأ أي درس بعد.", "am.start": "ابدأ أول مسار",
    "am.dashboard": "لوحة التقدم", "am.dashboard.sub": "دروسك ونقاطك وإنجازاتك", "am.profile": "الملف الشخصي", "am.profile.sub": "الحساب وبيانات هذا الجهاز",
    "am.signout": "تسجيل الخروج", "am.signingout": "جارٍ تسجيل الخروج…", "am.signout.err": "تعذّر تسجيل الخروج. حاول مرة أخرى.",
    "am.error": "تعذّرت قراءة تقدمك على هذا الجهاز.", "am.device": "التقدم محفوظ على هذا الجهاز.", "am.status": "{done} من {total} دروس",
  },
  en: {
    "am.menu": "Account menu", "am.progress": "Your progress", "am.lessons": "{done} of {total} lessons", "am.points": "{p} points",
    "am.continue": "Pick up where you left off", "am.go": "Continue", "am.empty": "You haven't started a lesson yet.", "am.start": "Start your first course",
    "am.dashboard": "Progress dashboard", "am.dashboard.sub": "Your lessons, points and achievements", "am.profile": "Profile", "am.profile.sub": "Account and data on this device",
    "am.signout": "Sign out", "am.signingout": "Signing out…", "am.signout.err": "Could not sign out. Please try again.",
    "am.error": "Your progress on this device could not be read.", "am.device": "Progress is saved on this device.", "am.status": "{done} of {total} lessons",
  },
});
const T = (k, p) => (i18n ? i18n.t(k, p) : k);

function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }

function avatar(user, cls) {
  const m = user.user_metadata || {};
  const url = m.avatar_url || m.picture || "";
  const name = m.full_name || m.name || m.username || user.email || "F";
  const wrap = el("span", "am-avatar" + (cls ? " " + cls : ""));
  if (/^https:\/\//.test(url)) { const img = el("img"); img.src = url; img.alt = ""; img.referrerPolicy = "no-referrer"; img.width = 40; img.height = 40; wrap.appendChild(img); }
  else wrap.textContent = String(name).trim().charAt(0).toUpperCase() || "F";
  return wrap;
}

function readStats() {
  const tracks = getTracks();
  const totals = Object.fromEntries(tracks.map((t) => [t.id, t.total]));
  const snap = createProgress({ totals }).snapshot();
  return computeStats(snap, tracks);
}

function chevron() {
  const ns = "http://www.w3.org/2000/svg"; const s = document.createElementNS(ns, "svg");
  s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor"); s.setAttribute("stroke-width", "2.2"); s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round"); s.setAttribute("aria-hidden", "true");
  const p = document.createElementNS(ns, "path"); p.setAttribute("d", "M5 12h14M13 6l6 6-6 6"); s.appendChild(p); return s;
}

function paintProgress(box) {
  box.textContent = "";
  box.appendChild(el("h3", "am-h", T("am.progress")));
  let st;
  try { st = readStats(); } catch (e) { box.appendChild(el("p", "am-msg", T("am.error"))); return; }
  const { completed, lessons, percent: pct } = st.totals;
  const row = el("div", "am-row");
  row.appendChild(el("strong", "", T("am.lessons", { done: completed, total: lessons })));
  row.appendChild(el("span", "am-points", T("am.points", { p: st.points })));
  box.appendChild(row);
  const bar = el("div", "am-bar"); bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-valuemin", "0"); bar.setAttribute("aria-valuemax", "100"); bar.setAttribute("aria-valuenow", String(pct)); bar.setAttribute("aria-label", T("am.progress"));
  const fill = el("span"); fill.style.width = pct + "%"; bar.appendChild(fill); box.appendChild(bar);

  const open = st.perTrack.filter((t) => t.started && !t.done).sort((a, b) => b.updatedAt - a.updatedAt)[0];
  if (open) {
    const meta = getTracks().find((t) => t.id === open.id);
    const a = el("a", "am-next"); a.href = meta.path; a.setAttribute("data-course", open.id);
    const body = el("span", "am-next-body");
    body.appendChild(el("small", "", T("am.continue")));
    body.appendChild(el("strong", "", NAMES[open.id] || open.id));
    body.appendChild(el("small", "", T("am.status", { done: open.completed, total: open.total })));
    a.appendChild(body); a.appendChild(chevron()); box.appendChild(a);
  } else if (completed === 0) {
    box.appendChild(el("p", "am-msg", T("am.empty")));
    const a = el("a", "am-next"); a.href = "/fundamentals/computer-basics/com.html"; a.setAttribute("data-course", "com");
    const body = el("span", "am-next-body"); body.appendChild(el("strong", "", T("am.start"))); a.appendChild(body); a.appendChild(chevron()); box.appendChild(a);
  }
  box.appendChild(el("p", "am-note", T("am.device")));
}

function item(href, title, sub) {
  const a = el("a", "am-item"); a.href = href; a.setAttribute("role", "menuitem");
  a.appendChild(el("strong", "", title)); if (sub) a.appendChild(el("small", "", sub)); return a;
}

/** Build the menu into `host` (#user-profile). */
function mount(host, user, { onSignOut }) {
  host.textContent = "";
  const name = (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name || user.user_metadata.username)) || "FAYAD";
  const root = el("div", "am"); root.id = "fayadUserMenu";
  const trigger = el("button", "am-trigger"); trigger.type = "button"; trigger.id = "fayadUserTrigger";
  trigger.setAttribute("aria-expanded", "false"); trigger.setAttribute("aria-haspopup", "true"); trigger.setAttribute("aria-controls", "fayadUserDropdown");
  trigger.setAttribute("aria-label", T("am.menu") + ": " + name);
  trigger.appendChild(avatar(user));
  const panel = el("div", "am-panel"); panel.id = "fayadUserDropdown"; panel.hidden = true; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", T("am.menu"));
  const head = el("div", "am-head"); head.appendChild(avatar(user, "am-avatar-lg"));
  const who = el("div", "am-who"); who.appendChild(el("strong", "", name)); who.appendChild(el("small", "", user.email || "")); head.appendChild(who);
  const prog = el("section", "am-progress"); prog.id = "fayadMenuProgress"; prog.setAttribute("aria-live", "polite");
  const nav = el("div", "am-items"); nav.setAttribute("role", "menu");
  nav.appendChild(item("/dashboard.html", T("am.dashboard"), T("am.dashboard.sub")));
  nav.appendChild(item("/profile.html", T("am.profile"), T("am.profile.sub")));
  const out = el("button", "am-item am-out", T("am.signout")); out.type = "button"; out.id = "fayadLogoutButton"; out.setAttribute("role", "menuitem");
  nav.appendChild(out);
  panel.append(head, prog, nav); root.append(trigger, panel); host.appendChild(root); host.style.display = "block";

  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let closeTimer = 0;
  const focusables = () => [...panel.querySelectorAll("a[href], button:not([disabled])")];
  function setOpen(open, { focus } = {}) {
    clearTimeout(closeTimer);
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      paintProgress(prog); panel.hidden = false;
      if (reduce) panel.classList.add("is-open"); else requestAnimationFrame(() => panel.classList.add("is-open"));
      if (focus === "first") (focusables()[0] || trigger).focus();
    } else {
      panel.classList.remove("is-open");
      if (reduce) panel.hidden = true; else closeTimer = setTimeout(() => { panel.hidden = true; }, 160);
      if (focus === "trigger") trigger.focus();
    }
  }
  const isOpen = () => trigger.getAttribute("aria-expanded") === "true";
  trigger.addEventListener("click", () => setOpen(!isOpen()));
  trigger.addEventListener("keydown", (e) => { if (e.key === "ArrowDown") { e.preventDefault(); e.stopPropagation(); setOpen(true, { focus: "first" }); } });
  root.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") { e.preventDefault(); setOpen(false, { focus: "trigger" }); return; }
    const list = focusables(); const i = list.indexOf(document.activeElement);
    if (e.key === "ArrowDown" && i >= 0) { e.preventDefault(); list[(i + 1) % list.length].focus(); }
    else if (e.key === "ArrowUp" && i >= 0) { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
    else if (e.key === "Home") { e.preventDefault(); list[0].focus(); }
    else if (e.key === "End") { e.preventDefault(); list[list.length - 1].focus(); }
  });
  root.addEventListener("focusout", (e) => { if (isOpen() && e.relatedTarget && !root.contains(e.relatedTarget)) setOpen(false); });
  const away = (e) => { if (!document.body.contains(root)) { document.removeEventListener("pointerdown", away); return; } if (isOpen() && !root.contains(e.target)) setOpen(false); };
  document.addEventListener("pointerdown", away);
  window.addEventListener("storage", () => { if (isOpen()) paintProgress(prog); });
  window.addEventListener("fayad:langchange", () => { if (isOpen()) paintProgress(prog); });
  out.addEventListener("click", async () => {
    out.disabled = true; out.textContent = T("am.signingout");
    try { await onSignOut(); } catch (err) { out.disabled = false; out.textContent = T("am.signout"); const m = el("p", "am-msg am-err", T("am.signout.err")); m.setAttribute("role", "alert"); nav.appendChild(m); }
  });
  return { setOpen };
}

window.FAYAD_ACCOUNT_MENU = { mount };
window.dispatchEvent(new CustomEvent("fayad:account-menu-ready"));
