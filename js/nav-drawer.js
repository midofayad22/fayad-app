/*
  Global navigation drawer (all pages). Structure:
    Home | Learn (continue, courses by group with progress, filter) | Games | Account | About
  Desktop: panel from the inline-start edge. Phones: bottom sheet with safe-area padding. Lazy: loaded on first open.
*/
import { TOTALS } from "/js/engine/totals.js";

const L = {
  ar: { menu: "القائمة", close: "إغلاق", home: "الرئيسية", dash: "لوحة التقدم", learn: "التعلّم", cont: "تابع التعلم", contNone: "ابدأ أول درس", courses: "المسارات", filter: "ابحث عن مسار", none: "لا توجد نتائج.",
    g1: "الأساسيات", g2: "أساسيات الويب", g3: "الأطر والمكتبات", games: "الألعاب", hub: "مركز الألعاب", arena: "ساحة التحديات", acct: "الحساب", settings: "الإعدادات", profile: "الملف الشخصي", signin: "تسجيل الدخول", signout: "تسجيل الخروج", about: "عن المنصة", lessons: "درس" },
  en: { menu: "Menu", close: "Close", home: "Home", dash: "Progress dashboard", learn: "Learn", cont: "Continue learning", contNone: "Start your first lesson", courses: "Courses", filter: "Find a course", none: "No results.",
    g1: "Foundations", g2: "Web basics", g3: "Frameworks & libraries", games: "Games", hub: "Games hub", arena: "Challenge Arena", acct: "Account", settings: "Settings", profile: "Profile", signin: "Sign in", signout: "Sign out", about: "About", lessons: "lessons" },
};
const NAMES = { com: ["أساسيات الكمبيوتر", "Computer Basics"], prg: ["أساسيات البرمجة", "Programming Basics"], html: ["HTML", "HTML"], css: ["CSS", "CSS"], js: ["JavaScript", "JavaScript"], ajs: ["جافاسكريبت المتقدم", "Advanced JavaScript"], bs: ["Bootstrap", "Bootstrap"], tw: ["Tailwind CSS", "Tailwind CSS"], react: ["React", "React"], vue: ["Vue", "Vue"], angular: ["Angular", "Angular"] };
const PATH = { com: "/fundamentals/computer-basics/com.html", prg: "/fundamentals/programming-basics/prg.html", html: "/html-learning/html-learning.html", css: "/css-learning/css-learning.html", js: "/javascript-learning/javascript-learning.html", ajs: "/advanced-javascript/advanced-javascript.html", bs: "/bootstrap-learning/bootstrap-learning.html", tw: "/tailwind-learning/tailwind-learning.html", react: "/react-learning/react-learning.html", vue: "/vue-learning/vue-learning.html", angular: "/angular-learning/angular-learning.html" };
const GROUPS = [["g1", ["com", "prg"]], ["g2", ["html", "css", "js", "ajs"]], ["g3", ["bs", "tw", "react", "vue", "angular"]]];
export const ROUTES = Object.values(PATH);

const lang = () => (document.documentElement.lang === "en" ? "en" : "ar");
const T = (k) => L[lang()][k];
function progress() { try { return JSON.parse(localStorage.getItem("fayad-progress-v1"))?.tracks || {}; } catch { return {}; } }
function session() { try { for (const k of Object.keys(localStorage)) if (/^sb-.*-auth-token$/.test(k)) { const u = JSON.parse(localStorage.getItem(k))?.user; if (u) return { email: u.email, name: u.user_metadata?.full_name }; } } catch { /* none */ } return null; }
function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function link(href, label, cls = "nd-link") { const a = el("a", cls); a.href = href; a.textContent = label; if (location.pathname === href.split("#")[0] && !href.includes("#")) a.setAttribute("aria-current", "page"); return a; }
function section(title) { const s = el("section", "nd-sec"); s.append(el("h2", "nd-h", title)); return s; }

let root, opener;
function build() {
  const prog = progress(), user = session(), l = lang();
  const wrap = el("div", "nd"); wrap.setAttribute("role", "dialog"); wrap.setAttribute("aria-modal", "true"); wrap.setAttribute("aria-label", T("menu"));
  const back = el("div", "nd-back"); back.addEventListener("click", close);
  const panel = el("nav", "nd-panel"); panel.setAttribute("aria-label", T("menu"));
  const head = el("div", "nd-head");
  const brand = el("a", "nd-brand"); brand.href = "/index.html"; const img = new Image(); img.src = "/assets/brand/faybit-mark.svg"; img.alt = ""; img.width = img.height = 30; brand.append(img, el("span", "", "FAYBIT"));
  const x = el("button", "nd-x", "×"); x.type = "button"; x.setAttribute("aria-label", T("close")); x.addEventListener("click", close);
  head.append(brand, x); panel.append(head);
  const body = el("div", "nd-body");

  const main = el("section", "nd-sec"); main.append(link("/index.html", T("home")), link("/dashboard.html", T("dash")));
  body.append(main);

  // learn
  const learn = section(T("learn"));
  let resume = null, best = 0;
  for (const [id, t] of Object.entries(prog)) { if (t.current && PATH[id] && (t.updatedAt || 0) >= best) { best = t.updatedAt || 0; resume = [id, t.current]; } }
  const c = el("a", "nd-continue"); if (resume) { const n = parseInt(resume[1].split("-")[1], 10); c.href = PATH[resume[0]] + (["com", "prg"].includes(resume[0]) ? "" : `#lesson-${n}`); c.append(el("small", "", T("cont")), el("b", "", `${NAMES[resume[0]][l === "en" ? 1 : 0]} · ${String(n).padStart(2, "0")}`)); }
  else { c.href = PATH.html; c.append(el("small", "", T("cont")), el("b", "", T("contNone"))); }
  learn.append(c);
  const q = el("input", "nd-filter"); q.type = "search"; q.placeholder = T("filter"); q.setAttribute("aria-label", T("filter")); learn.append(q);
  const groups = [];
  for (const [gk, ids] of GROUPS) {
    const g = el("div", "nd-group"); const h = el("button", "nd-gh"); h.type = "button"; h.setAttribute("aria-expanded", "true"); h.append(el("span", "", T(gk)));
    h.addEventListener("click", () => { const o = h.getAttribute("aria-expanded") !== "true"; h.setAttribute("aria-expanded", String(o)); list.hidden = !o; });
    const list = el("div", "nd-list"); const items = [];
    for (const id of ids) {
      const done = prog[id]?.completed?.length || 0, tot = TOTALS[id], pct = Math.round((done / tot) * 100);
      const a = link(PATH[id], NAMES[id][l === "en" ? 1 : 0], "nd-course"); a.dataset.k = (NAMES[id][0] + " " + NAMES[id][1]).toLowerCase();
      const m = el("span", "nd-meter"); m.setAttribute("aria-hidden", "true"); const f = el("i"); f.style.width = pct + "%"; m.append(f);
      const n = el("small", "", `${done}/${tot}`); a.append(n, m); list.append(a); items.push(a);
    }
    g.append(h, list); learn.append(g); groups.push({ g, items });
  }
  const none = el("p", "nd-none", T("none")); none.hidden = true; learn.append(none);
  q.addEventListener("input", () => { const v = q.value.trim().toLowerCase(); let n = 0; for (const { g, items } of groups) { let any = false; for (const a of items) { const hit = !v || a.dataset.k.includes(v); a.hidden = !hit; if (hit) { any = true; n++; } } g.hidden = !any; } none.hidden = n > 0; });
  body.append(learn);

  const games = section(T("games")); games.append(link("/play/index.html", T("hub")), link("/play/arena.html?track=js", T("arena")), link("/play/flex-quest.html", "Flex Quest"), link("/play/selector-quest.html", "Selector Quest")); body.append(games);

  const acct = section(T("acct"));
  if (user) { acct.append(el("p", "nd-user", user.name || user.email)); acct.append(link("/settings/index.html", T("settings")), link("/profile.html", T("profile"))); const out = el("button", "nd-link nd-out", T("signout")); out.type = "button"; out.addEventListener("click", async () => { try { await window.FAYAD_AUTH?.signOut?.(); } catch { /* ignore */ } location.href = "/index.html"; }); acct.append(out); }
  else { acct.append(link("/login.html", T("signin")), link("/settings/index.html", T("settings"))); }
  body.append(acct, link("/about/about.html", T("about"), "nd-link nd-about"));
  panel.append(body); wrap.append(back, panel); return wrap;
}
export function open(from) {
  if (root) return; opener = from || document.activeElement; root = build(); document.body.append(root); document.body.classList.add("nd-lock");
  requestAnimationFrame(() => root.classList.add("on")); root.querySelector(".nd-x").focus();
  document.addEventListener("keydown", onKey);
}
export function close() {
  if (!root) return; const r = root; root = null; r.classList.remove("on"); document.body.classList.remove("nd-lock"); document.removeEventListener("keydown", onKey);
  setTimeout(() => r.remove(), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220); opener?.focus?.();
}
function onKey(e) {
  if (e.key === "Escape") return close();
  if (e.key !== "Tab" || !root) return;
  const f = [...root.querySelectorAll("a[href],button,input")].filter((n) => !n.hidden && !n.closest("[hidden]")); if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
