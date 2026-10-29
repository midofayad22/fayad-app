/*
  Account pages: dashboard.html (progress dashboard) and profile.html.
  All numbers come from the learner's own `fayad-progress-v1` record (js/engine/progress.js) through
  js/engine/stats.js. Nothing is fabricated: a new learner sees zeros and an empty state.
  Strings are built with textContent only (no innerHTML with data).
*/
import { createProgress } from "/js/engine/progress.js";
import { computeStats, POINTS } from "/js/engine/stats.js";

const F = window.FAYAD;
const i18n = F && F.i18n;
const tracks = (F && F.catalog && F.catalog.tracks) || [];
const page = document.body.dataset.page;
const $ = (id) => document.getElementById(id);
const T = (k, p) => (i18n ? i18n.t(k, p) : k);

const NAMES = { com: "Computer Fundamentals", prg: "Programming Fundamentals", html: "HTML", css: "CSS", js: "JavaScript", react: "React", vue: "Vue", angular: "Angular" };

i18n?.extend({
  ar: {
    "ac.nav": "حسابي", "ac.home": "الرئيسية", "ac.dashboard": "لوحة التقدم", "ac.profile": "الملف الشخصي",
    "d.title": "لوحة التقدم", "d.sub": "كل الأرقام هنا محسوبة من نشاطك الفعلي على هذا الجهاز.",
    "d.empty.t": "لم تبدأ أي درس بعد", "d.empty.p": "أكمل أول درس وستظهر هنا نقاطك وإنجازاتك وإحصاءاتك.", "h.cta": "ابدأ من الأساسيات",
    "d.stats": "إحصاءات التعلم", "d.tracks": "التقدم في كل مسار", "d.ach": "الإنجازات", "d.points": "كيف تُحسب النقاط",
    "s.points": "النقاط", "s.completed": "دروس مكتملة", "s.percent": "من إجمالي الدروس", "s.tracks": "مسارات مكتملة", "s.started": "مسارات بدأتها",
    "s.correct": "إجابات صحيحة في الاختبارات", "s.attempts": "محاولات الاختبارات", "s.accuracy": "دقة المحاولات", "s.assess": "تقييمات نهائية ناجحة", "s.last": "آخر نشاط",
    "t.lessons": "{done} من {total} درسًا", "t.quiz": "الاختبارات: {c} صحيحة / {a} محاولة", "t.assess": "التقييم النهائي: أفضل نتيجة {p}%", "t.assess.pass": "ناجح",
    "t.continue": "تابع", "t.open": "افتح", "t.done": "مكتمل", "t.none": "لم يبدأ",
    "a.first-lesson": "أول درس", "a.ten-lessons": "10 دروس", "a.fifty-lessons": "50 درسًا", "a.hundred-lessons": "100 درس",
    "a.first-track": "أول مسار مكتمل", "a.three-tracks": "3 مسارات مكتملة", "a.quiz-25": "25 إجابة صحيحة", "a.quiz-100": "100 إجابة صحيحة", "a.assessment": "نجاح في تقييم نهائي",
    "a.earned": "تم الإنجاز", "a.locked": "قيد التقدم",
    "d.points.note": "{l} نقاط لكل درس مكتمل، و{c} لكل سؤال أُجيب عنه صحيحًا (مرة واحدة لكل سؤال)، و{t} لكل مسار مكتمل، و{a} لكل تقييم نهائي ناجح.",
    "p.title": "الملف الشخصي", "p.sub": "بيانات حسابك وتفضيلاتك.", "p.summary": "ملخص التعلم", "p.seeDash": "افتح لوحة التقدم",
    "p.data": "بيانات هذا الجهاز", "p.data.note": "يُحفظ تقدمك في متصفحك. يمكنك تنزيل نسخة منه أو مسحه بالكامل.", "p.export": "تنزيل نسخة من تقدمي", "p.reset": "مسح تقدمي على هذا الجهاز",
    "p.reset.confirm": "سيُمسح تقدمك على هذا الجهاز نهائيًا ولا يمكن التراجع. هل تريد المتابعة؟", "p.reset.done": "تم مسح التقدم على هذا الجهاز.", "p.export.done": "تم تنزيل النسخة.",
    "p.acc.title": "الحساب", "p.acc.out": "أنت غير مسجل الدخول. يعمل FAYAD بالكامل بدون حساب، ويُحفظ تقدمك على هذا الجهاز.", "p.acc.signin": "تسجيل الدخول أو إنشاء حساب",
    "p.acc.name": "الاسم", "p.acc.email": "البريد الإلكتروني", "p.acc.signout": "تسجيل الخروج", "p.acc.sync": "مزامنة التقدم مع حسابك غير مفعّلة بعد؛ تقدمك محفوظ على هذا الجهاز فقط.", "p.acc.unavail": "تعذّر الاتصال بخدمة الحساب الآن.",
  },
  en: {
    "ac.nav": "My account", "ac.home": "Home", "ac.dashboard": "Progress", "ac.profile": "Profile",
    "d.title": "Progress dashboard", "d.sub": "Every number here is computed from your real activity on this device.",
    "d.empty.t": "You haven't started a lesson yet", "d.empty.p": "Complete your first lesson and your points, achievements and statistics will appear here.", "h.cta": "Start with the fundamentals",
    "d.stats": "Learning statistics", "d.tracks": "Progress by course", "d.ach": "Achievements", "d.points": "How points work",
    "s.points": "Points", "s.completed": "Lessons completed", "s.percent": "of all lessons", "s.tracks": "Courses completed", "s.started": "Courses started",
    "s.correct": "Correct quiz answers", "s.attempts": "Quiz attempts", "s.accuracy": "Attempt accuracy", "s.assess": "Final assessments passed", "s.last": "Last activity",
    "t.lessons": "{done} of {total} lessons", "t.quiz": "Quizzes: {c} correct / {a} attempts", "t.assess": "Final assessment: best {p}%", "t.assess.pass": "Passed",
    "t.continue": "Continue", "t.open": "Open", "t.done": "Completed", "t.none": "Not started",
    "a.first-lesson": "First lesson", "a.ten-lessons": "10 lessons", "a.fifty-lessons": "50 lessons", "a.hundred-lessons": "100 lessons",
    "a.first-track": "First course completed", "a.three-tracks": "3 courses completed", "a.quiz-25": "25 correct answers", "a.quiz-100": "100 correct answers", "a.assessment": "Passed a final assessment",
    "a.earned": "Earned", "a.locked": "In progress",
    "d.points.note": "{l} points per completed lesson, {c} per quiz question answered correctly (once per question), {t} per completed course and {a} per passed final assessment.",
    "p.title": "Profile", "p.sub": "Your account details and preferences.", "p.summary": "Learning summary", "p.seeDash": "Open the progress dashboard",
    "p.data": "Data on this device", "p.data.note": "Your progress is stored in your browser. You can download a copy or erase it completely.", "p.export": "Download a copy of my progress", "p.reset": "Erase my progress on this device",
    "p.reset.confirm": "This permanently erases your progress on this device and cannot be undone. Continue?", "p.reset.done": "Progress on this device was erased.", "p.export.done": "Copy downloaded.",
    "p.acc.title": "Account", "p.acc.out": "You are not signed in. FAYAD works fully without an account and keeps your progress on this device.", "p.acc.signin": "Sign in or create an account",
    "p.acc.name": "Name", "p.acc.email": "Email", "p.acc.signout": "Sign out", "p.acc.sync": "Syncing progress to your account is not enabled yet; your progress is stored on this device only.", "p.acc.unavail": "The account service can't be reached right now.",
  },
});

const totals = Object.fromEntries(tracks.map((t) => [t.id, t.total]));
const progress = createProgress({ totals });
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
const nf = () => new Intl.NumberFormat(document.documentElement.lang === "en" ? "en" : "ar-EG-u-nu-latn");

function statCard(value, label, sub) {
  const c = el("div", "ac-stat");
  c.append(el("b", "", value), el("span", "", label));
  if (sub) c.append(el("small", "", sub));
  return c;
}

function stats() { return computeStats(progress.snapshot(), tracks); }

function renderDashboard() {
  const s = stats(); const n = nf(); const g = s.totals;
  $("dEmpty").hidden = g.completed > 0 || g.quizAttempts > 0 || g.tracksStarted > 0;
  const box = $("dStats"); box.textContent = "";
  box.append(
    statCard(n.format(s.points), T("s.points")),
    statCard(n.format(g.completed), T("s.completed"), `${n.format(g.percent)}% ${T("s.percent")}`),
    statCard(`${n.format(g.tracksDone)} / ${n.format(g.tracks)}`, T("s.tracks")),
    statCard(n.format(g.tracksStarted), T("s.started")),
    statCard(n.format(g.quizCorrect), T("s.correct")),
    statCard(n.format(g.quizAttempts), T("s.attempts"), g.accuracy === null ? "" : `${T("s.accuracy")}: ${n.format(g.accuracy)}%`),
    statCard(n.format(g.assessmentsPassed), T("s.assess")),
  );
  if (s.lastActivityAt) box.append(statCard(new Date(s.lastActivityAt).toLocaleDateString(document.documentElement.lang === "en" ? "en" : "ar-EG-u-nu-latn"), T("s.last")));

  const list = $("dTracks"); list.textContent = "";
  for (const t of s.perTrack) {
    const meta = tracks.find((x) => x.id === t.id);
    const card = el("a", "ac-track"); card.href = meta.path; card.dataset.course = t.id;
    const top = el("span", "ac-track-top");
    top.append(el("strong", "", NAMES[t.id] || t.id), el("em", "", t.done ? T("t.done") : t.started ? `${n.format(t.percent)}%` : T("t.none")));
    const bar = el("span", "ac-bar"); bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-label", NAMES[t.id] || t.id);
    bar.setAttribute("aria-valuemin", "0"); bar.setAttribute("aria-valuemax", "100"); bar.setAttribute("aria-valuenow", String(t.percent));
    const fill = el("span"); fill.style.width = `${t.percent}%`; bar.append(fill);
    card.append(top, bar, el("small", "", T("t.lessons", { done: n.format(t.completed), total: n.format(t.total) })));
    if (t.quizAttempts) card.append(el("small", "", T("t.quiz", { c: n.format(t.quizCorrect), a: n.format(t.quizAttempts) })));
    if (t.assessment && t.assessment.attempts) card.append(el("small", "", T("t.assess", { p: n.format(t.assessment.bestPct) }) + (t.assessment.passed ? ` — ${T("t.assess.pass")}` : "")));
    list.append(card);
  }

  const ach = $("dAch"); ach.textContent = "";
  for (const a of s.achievements) {
    const li = el("li", "ac-ach-item" + (a.earned ? " is-earned" : "")); li.dataset.id = a.id;
    li.append(el("strong", "", T("a." + a.id)), el("small", "", a.earned ? T("a.earned") : `${n.format(a.progress)} / ${n.format(a.target)} — ${T("a.locked")}`));
    ach.append(li);
  }
  $("dPoints").textContent = T("d.points.note", { l: POINTS.lesson, c: POINTS.correctAnswer, t: POINTS.trackComplete, a: POINTS.assessmentPassed });
}

async function renderAccount() {
  const box = $("pAccount"); box.textContent = "";
  box.append(el("h2", "ac-h2", T("p.acc.title")));
  const A = window.FAYAD_AUTH;
  let user = null, unavailable = false;
  if (!A) unavailable = true;
  else { try { const { data } = await A.getSession(); user = data?.session?.user || null; } catch { unavailable = true; } }
  if (user) {
    const dl = el("dl", "ac-dl");
    dl.append(el("dt", "", T("p.acc.name")), el("dd", "", A.getUserDisplayName(user)), el("dt", "", T("p.acc.email")), el("dd", "", A.getUserEmail(user)));
    const out = el("button", "ac-btn", T("p.acc.signout")); out.type = "button";
    out.addEventListener("click", async () => { try { await A.signOut(); } catch { /* handled by auth module */ } renderAccount(); });
    box.append(dl, el("p", "ac-note", T("p.acc.sync")), out);
  } else {
    box.append(el("p", "ac-note", unavailable && A ? T("p.acc.unavail") : T("p.acc.out")));
    const a = el("a", "ac-btn ac-btn-primary", T("p.acc.signin")); a.href = "/login.html"; box.append(a);
  }
}

function renderProfile() {
  const s = stats(); const n = nf(); const g = s.totals;
  const box = $("pSummary"); box.textContent = "";
  box.append(statCard(n.format(s.points), T("s.points")), statCard(n.format(g.completed), T("s.completed")), statCard(`${n.format(g.tracksDone)} / ${n.format(g.tracks)}`, T("s.tracks")));
  renderAccount();
}

function wireProfile() {
  $("pExport").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(progress.snapshot(), null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "fayad-progress.json";
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    $("pMsg").textContent = T("p.export.done");
  });
  $("pReset").addEventListener("click", () => {
    if (!window.confirm(T("p.reset.confirm"))) return;
    for (const t of tracks) progress.reset(t.id);
    progress.reload(); renderProfile(); $("pMsg").textContent = T("p.reset.done");
  });
}

function render() { progress.reload(); if (page === "dashboard") renderDashboard(); else renderProfile(); }
i18n?.apply();
if (page === "profile") wireProfile();
render();
window.addEventListener("fayad:langchange", render);
window.addEventListener("storage", render);
window.addEventListener("pageshow", render);
window.addEventListener("fayad-auth-changed", () => { if (page === "profile") renderAccount(); });
