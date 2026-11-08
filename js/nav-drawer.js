/*
  FAYBIT global sidebar — the ONE site-wide navigation (every page opens this same component from the header menu button).
  Opens from the physical left edge in both languages (content direction follows the page). Course lessons are NOT here:
  a lesson page shows the contextual course navigation (js/course/nav.js) in the page body, and this drawer only offers a
  "current course" shortcut. Loaded lazily on first open.
*/
import { TOTALS } from "/js/engine/totals.js";
import { icon } from "/js/ui/icons.js";

const L = {
  ar: { menu: "القائمة الرئيسية", close: "إغلاق القائمة", main: "التنقل الرئيسي", acct: "حسابي", platform: "المنصة", home: "الرئيسية", courses: "المسارات التعليمية", all: "كل المسارات", games: "مركز الألعاب", dash: "لوحة التقدم",
    profile: "الملف الشخصي", ach: "الإنجازات", settings: "الإعدادات", notif: "الإشعارات", about: "عن FAYBIT", signin: "تسجيل الدخول", signup: "إنشاء حساب", guest: "زائر", guestNote: "سجّل لحفظ تقدمك على كل أجهزتك.",
    cur: "الكورس الحالي", cont: "تابع من حيث توقفت", start: "ابدأ الكورس", done: "اكتمل", g1: "الأساسيات", g2: "أساسيات الويب", g3: "الأطر والمكتبات", search: "بحث", lesson: "الدرس" },
  en: { menu: "Main menu", close: "Close menu", main: "Main navigation", acct: "My account", platform: "Platform", home: "Home", courses: "Learning paths", all: "All paths", games: "Games Center", dash: "Dashboard",
    profile: "Profile", ach: "Achievements", settings: "Settings", notif: "Notifications", about: "About FAYBIT", signin: "Sign in", signup: "Create account", guest: "Guest", guestNote: "Sign in to keep your progress on every device.",
    cur: "Current course", cont: "Continue where you left off", start: "Start the course", done: "complete", g1: "Foundations", g2: "Web basics", g3: "Frameworks & libraries", search: "Search", lesson: "Lesson" },
};
export const NAMES = { com: ["أساسيات الكمبيوتر", "Computer Basics"], prg: ["أساسيات البرمجة", "Programming Basics"], html: ["HTML", "HTML"], css: ["CSS", "CSS"], js: ["JavaScript", "JavaScript"], ajs: ["جافاسكريبت المتقدم", "Advanced JavaScript"], bs: ["Bootstrap", "Bootstrap"], tw: ["Tailwind CSS", "Tailwind CSS"], react: ["React", "React"], vue: ["Vue", "Vue"], angular: ["Angular", "Angular"] };
export const PATH = { com: "/fundamentals/computer-basics/com.html", prg: "/fundamentals/programming-basics/prg.html", html: "/html-learning/html-learning.html", css: "/css-learning/css-learning.html", js: "/javascript-learning/javascript-learning.html", ajs: "/advanced-javascript/advanced-javascript.html", bs: "/bootstrap-learning/bootstrap-learning.html", tw: "/tailwind-learning/tailwind-learning.html", react: "/react-learning/react-learning.html", vue: "/vue-learning/vue-learning.html", angular: "/angular-learning/angular-learning.html" };
const GROUPS = [["g1", ["com", "prg"]], ["g2", ["html", "css", "js", "ajs"]], ["g3", ["bs", "tw", "react", "vue", "angular"]]];
export const ROUTES = Object.values(PATH);
const COURSE_ICON = { com: "cpu", prg: "terminal", html: "code-xml", css: "palette", js: "code-xml", ajs: "rocket", bs: "layout-dashboard", tw: "sparkles", react: "layers", vue: "layers", angular: "layers" };

const lang = () => (document.documentElement.lang === "en" ? "en" : "ar");
const T = (k) => L[lang()][k];
function progress() { try { return JSON.parse(localStorage.getItem("fayad-progress-v1"))?.tracks || {}; } catch { return {}; } }
function session() { try { for (const k of Object.keys(localStorage)) if (/^sb-.*-auth-token$/.test(k)) { const u = JSON.parse(localStorage.getItem(k))?.user; if (u) return { email: u.email, name: u.user_metadata?.full_name || u.user_metadata?.name || "" }; } } catch { /* storage blocked */ } return null; }
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
const norm = (p) => p.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
function here(href) { const u = new URL(href, location.origin); return norm(u.pathname) === norm(location.pathname) && (!u.search || u.search === location.search); }
function item(href, iconName, label, { trail, cls = "" } = {}) {
  const a = el("a", "nd-item " + cls); a.href = href; a.innerHTML = icon(iconName, 20, "nd-ico"); a.append(el("span", "nd-label", label));
  if (trail) a.append(trail); if (here(href) && !href.includes("#")) a.setAttribute("aria-current", "page"); return a;
}
function group(title) { const s = el("section", "nd-sec"); s.setAttribute("aria-label", title); s.append(el("h2", "nd-h", title)); return s; }
function currentCourse() { const p = norm(location.pathname); return Object.keys(PATH).find((id) => norm(PATH[id]) === p) || null; }

let root, opener, installedCss = false;
function build() {
  const prog = progress(), user = session(), l = lang() === "en" ? 1 : 0, cur = currentCourse();
  const wrap = el("div", "nd"); wrap.setAttribute("role", "dialog"); wrap.setAttribute("aria-modal", "true"); wrap.setAttribute("aria-label", T("menu"));
  const back = el("div", "nd-back"); back.addEventListener("click", () => close());
  const panel = el("nav", "nd-panel"); panel.setAttribute("aria-label", T("menu")); panel.dir = document.documentElement.dir || "rtl";
  const head = el("div", "nd-head");
  const brand = el("a", "nd-brand"); brand.href = "/index.html"; const img = new Image(); img.src = "/assets/brand/faybit-mark.svg"; img.alt = ""; img.width = img.height = 28; brand.append(img, el("span", "", "FAYBIT"));
  const x = el("button", "nd-x"); x.type = "button"; x.setAttribute("aria-label", T("close")); x.innerHTML = icon("x", 20); x.addEventListener("click", () => close());
  head.append(brand, x);
  const body = el("div", "nd-body");

  // current course shortcut (lesson pages only): the lesson list itself stays in the page, not in a second sidebar
  if (cur) {
    const t = prog[cur] || {}, done = t.completed?.length || 0, tot = TOTALS[cur], pct = tot ? Math.round((done / tot) * 100) : 0;
    const box = el("section", "nd-now"); box.setAttribute("aria-label", T("cur"));
    box.append(el("p", "nd-now-k", T("cur")), el("p", "nd-now-t", NAMES[cur][l]));
    const bar = el("div", "nd-bar"); bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-valuenow", String(pct)); bar.setAttribute("aria-valuemin", "0"); bar.setAttribute("aria-valuemax", "100"); bar.setAttribute("aria-label", NAMES[cur][l]); const f = el("i"); f.style.width = pct + "%"; bar.append(f);
    box.append(bar, el("p", "nd-now-n", `${done}/${tot} · ${pct}%`));
    body.append(box);
  }

  const main = group(T("main"));
  main.append(item("/index.html", "house", T("home")));
  // courses: expandable, grouped, with progress
  const cg = el("div", "nd-courses"); const toggle = el("button", "nd-item nd-expand"); toggle.type = "button"; toggle.id = "nd-courses-btn"; toggle.setAttribute("aria-controls", "nd-courses-list");
  toggle.innerHTML = icon("graduation-cap", 20, "nd-ico"); toggle.append(el("span", "nd-label", T("courses"))); const chev = el("span", "nd-chev"); chev.innerHTML = icon("chevron-down", 16, "nd-chev-i"); toggle.append(chev);
  const list = el("div", "nd-sub"); list.id = "nd-courses-list"; const open0 = !!cur; toggle.setAttribute("aria-expanded", String(open0)); list.hidden = !open0;
  toggle.addEventListener("click", () => { const o = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", String(o)); list.hidden = !o; });
  for (const [gk, ids] of GROUPS) {
    list.append(el("p", "nd-sub-h", T(gk)));
    for (const id of ids) {
      const done = prog[id]?.completed?.length || 0, tot = TOTALS[id], full = tot && done >= tot;
      const trail = el("span", "nd-count", full ? "✓" : `${done}/${tot}`); if (full) trail.setAttribute("aria-label", T("done"));
      list.append(item(PATH[id], COURSE_ICON[id], NAMES[id][l], { trail, cls: "nd-course" }));
    }
  }
  cg.append(toggle, list); main.append(cg);
  main.append(item("/play/index.html", "gamepad-2", T("games")), item("/dashboard.html", "layout-dashboard", T("dash")));
  body.append(main);

  const acct = group(T("acct"));
  acct.append(item("/profile.html", "user", T("profile")), item("/dashboard.html#achievements", "trophy", T("ach")));
  { const nl = item("/settings/notifications.html", "bell", T("notif")); if (window.FAYAD?.unread) nl.append(el("span", "nd-badge", String(window.FAYAD.unread))); acct.append(nl); }
  acct.append(item("/settings/index.html", "settings", T("settings")));
  body.append(acct);

  const plat = group(T("platform")); plat.append(item("/about/about.html", "info", T("about"))); body.append(plat);

  const foot = el("div", "nd-foot");
  if (user) { const av = el("span", "nd-av", (user.name || user.email || "?").trim()[0].toUpperCase()); av.setAttribute("aria-hidden", "true"); const w = el("span", "nd-who"); w.append(el("b", "", user.name || user.email.split("@")[0]), el("small", "", user.email)); const a = el("a", "nd-user"); a.href = "/profile.html"; a.append(av, w); foot.append(a); }
  else { foot.append(el("p", "nd-guest", T("guestNote"))); const a = el("a", "nd-cta", T("signin")); a.href = "/login.html"; const b = el("a", "nd-cta nd-cta-2", T("signup")); b.href = "/login.html#signup"; const row = el("div", "nd-ctas"); row.append(a, b); foot.append(row); }
  panel.append(head, body, foot); wrap.append(back, panel); return wrap;
}
function css() { if (installedCss || document.querySelector("link[data-nd]")) return; installedCss = true; const k = el("link"); k.rel = "stylesheet"; k.href = "/css/sidebar.css"; k.setAttribute("data-nd", ""); document.head.append(k); }
export function open(from) {
  if (root) return; css(); opener = from || document.activeElement; root = build(); document.body.append(root); document.body.classList.add("nd-lock");
  requestAnimationFrame(() => requestAnimationFrame(() => root && root.classList.add("on"))); root.querySelector(".nd-x").focus();
  document.addEventListener("keydown", onKey);
}
export function close() {
  if (!root) return; const r = root; root = null; r.classList.remove("on"); document.body.classList.remove("nd-lock"); document.removeEventListener("keydown", onKey);
  setTimeout(() => r.remove(), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260); opener?.focus?.();
}
function onKey(e) {
  if (e.key === "Escape") return close();
  if (e.key !== "Tab" || !root) return;
  const f = [...root.querySelectorAll("a[href],button")].filter((n) => !n.hidden && !n.closest("[hidden]")); if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
