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

const NAMES = { com: "Computer Fundamentals", prg: "Programming Fundamentals", html: "HTML", css: "CSS", js: "JavaScript", react: "React", vue: "Vue", angular: "Angular", ajs: "Advanced JavaScript", bs: "Bootstrap 5", tw: "Tailwind CSS" };

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
    "pf.courses": "التقدم في المسارات", "pf.details": "تفاصيل الحساب", "pf.edit": "تعديل الملف الشخصي", "pf.guest": "زائر", "pf.guestNote": "تعلّم بدون حساب؛ يُحفظ تقدمك على هذا الجهاز. أنشئ حسابًا لحفظ اسمك وصورتك.", "pf.signedIn": "تم تسجيل الدخول. اسمك وصورتك محفوظان في حسابك.", "pf.accuracy": "دقة الإجابات", "pf.none": "لم تبدأ بعد", "pf.last": "آخر نشاط", "pf.noact": "لا يوجد نشاط بعد", "pf.started": "قيد التقدم", "pf.mode": "نوع الحساب", "pf.modeGuest": "زائر (على هذا الجهاز)", "pf.modeUser": "حساب مسجّل",
    "p.title": "الملف الشخصي", "p.sub": "بيانات حسابك وتفضيلاتك.", "p.summary": "ملخص التعلم", "p.seeDash": "افتح لوحة التقدم",
    "p.data": "بيانات هذا الجهاز", "p.data.note": "يُحفظ تقدمك في متصفحك. يمكنك تنزيل نسخة منه أو مسحه بالكامل.", "p.export": "تنزيل نسخة من تقدمي", "p.reset": "مسح تقدمي على هذا الجهاز",
    "p.reset.confirm": "سيُمسح تقدمك على هذا الجهاز نهائيًا ولا يمكن التراجع. هل تريد المتابعة؟", "p.reset.done": "تم مسح التقدم على هذا الجهاز.", "p.export.done": "تم تنزيل النسخة.",
    "p.acc.title": "الحساب", "p.acc.out": "أنت غير مسجل الدخول. يعمل FAYBIT بالكامل بدون حساب، ويُحفظ تقدمك على هذا الجهاز.", "p.acc.signin": "تسجيل الدخول أو إنشاء حساب",
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
    "pf.courses": "Course progress", "pf.details": "Account details", "pf.edit": "Edit profile", "pf.guest": "Guest", "pf.guestNote": "You are learning without an account; progress stays on this device. Create an account to keep your name and picture.", "pf.signedIn": "Signed in. Your name and picture are saved to your account.", "pf.accuracy": "Answer accuracy", "pf.none": "Not started", "pf.last": "Last activity", "pf.noact": "No activity yet", "pf.started": "In progress", "pf.mode": "Account type", "pf.modeGuest": "Guest (this device)", "pf.modeUser": "Registered account",
    "p.title": "Profile", "p.sub": "Your account details and preferences.", "p.summary": "Learning summary", "p.seeDash": "Open the progress dashboard",
    "p.data": "Data on this device", "p.data.note": "Your progress is stored in your browser. You can download a copy or erase it completely.", "p.export": "Download a copy of my progress", "p.reset": "Erase my progress on this device",
    "p.reset.confirm": "This permanently erases your progress on this device and cannot be undone. Continue?", "p.reset.done": "Progress on this device was erased.", "p.export.done": "Copy downloaded.",
    "p.acc.title": "Account", "p.acc.out": "You are not signed in. FAYBIT works fully without an account and keeps your progress on this device.", "p.acc.signin": "Sign in or create an account",
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

function avatarEl(u, big) {
  const a = el("span", "pf-avatar" + (big ? " pf-avatar-lg" : "")); a.setAttribute("aria-hidden", "true");
  const label = (u && (u.name || u.email) || "").trim();
  a.textContent = label ? [...label][0].toUpperCase() : "";
  if (u && u.avatar) { const im = new Image(); im.alt = ""; im.referrerPolicy = "no-referrer"; im.onload = () => { a.textContent = ""; a.append(im); }; im.src = u.avatar; }
  return a;
}

function addLast() {
  const dl = $("pDetails"); if (!dl) return; dl.querySelectorAll("[data-last]").forEach((x) => x.remove());
  const when = stats().lastActivityAt; const dt = el("dt", "", T("pf.last")), dd = el("dd", "", when ? new Date(when).toLocaleDateString(document.documentElement.lang === "en" ? "en" : "ar-EG-u-nu-latn") : T("pf.noact"));
  dt.dataset.last = "1"; dd.dataset.last = "1"; dl.append(dt, dd);
}

async function renderAccount() {
  const box = $("pAccount"), det = $("pDetails"); box.textContent = ""; det.textContent = "";
  const A = window.FAYAD_AUTH;
  let user = null, unavailable = false;
  if (!A) unavailable = true;
  else { try { const { data } = await A.getSession(); user = data?.session?.user || null; } catch { unavailable = true; } }
  const cached = F.user && F.user();           // the shell's view of the stored session + profile row: works even when the auth service is unreachable
  const signedIn = !!user || !!cached;
  const name = (cached && cached.name) || (user && A.getUserDisplayName(user)) || "";
  const email = (cached && cached.email) || (user && A.getUserEmail(user)) || "";
  const text = el("div", "pf-id-text");
  if (signedIn) {
    text.append(el("h1", "", name || email), name ? el("p", "pf-email", email) : el("span"));
    text.append(el("p", "pf-note", unavailable ? T("p.acc.unavail") : T("pf.signedIn")));
    const row = el("div", "pf-actions");
    const edit = el("a", "ac-btn ac-btn-primary", T("pf.edit")); edit.href = "/settings/profile.html";
    const out = el("button", "ac-btn", T("p.acc.signout")); out.type = "button";
    out.addEventListener("click", async () => { try { await A?.signOut(); } catch { /* handled by auth module */ } renderAccount(); });
    row.append(edit, out); text.append(row);
    det.append(el("dt", "", T("p.acc.name")), el("dd", "", name || "—"), el("dt", "", T("p.acc.email")), el("dd", "", email), el("dt", "", T("pf.mode")), el("dd", "", T("pf.modeUser")));
  } else {
    text.append(el("h1", "", T("pf.guest")), el("p", "pf-note", unavailable && A ? T("p.acc.unavail") : T("pf.guestNote")));
    const row = el("div", "pf-actions"); const a = el("a", "ac-btn ac-btn-primary", T("p.acc.signin")); a.href = "/login.html"; row.append(a); text.append(row);
    det.append(el("dt", "", T("pf.mode")), el("dd", "", T("pf.modeGuest")));
  }
  box.append(avatarEl(signedIn ? (cached || { name, email }) : null, true), text); addLast();
}

function renderProfile() {
  const s = stats(); const n = nf(); const g = s.totals; const en = document.documentElement.lang === "en";
  const box = $("pSummary"); box.textContent = "";
  const fig = (v, l) => { const d = el("div", "pf-fig"); d.append(el("b", "", v), el("span", "", l)); return d; };
  box.append(fig(n.format(s.points), T("s.points")), fig(n.format(g.completed), T("s.completed")), fig(`\u2066${n.format(g.tracksDone)} / ${n.format(g.tracks)}\u2069`, T("s.tracks")),
    fig(g.accuracy === null ? "—" : `${n.format(g.accuracy)}%`, T("pf.accuracy")));
  const list = $("pCourses"); list.textContent = "";
  const order = [...s.perTrack].sort((a, b) => (b.started - a.started) || (b.percent - a.percent));
  for (const t of order) {
    const meta = tracks.find((x) => x.id === t.id); if (!meta) continue;
    const li = el("li", "pf-course" + (t.started ? "" : " is-idle"));
    const a = el("a", "pf-course-link"); a.href = meta.path; a.dataset.course = t.id;
    const top = el("span", "pf-course-top"); top.append(el("strong", "", NAMES[t.id] || t.id), el("em", "", t.done ? T("t.done") : t.started ? `${n.format(t.percent)}%` : T("pf.none")));
    const bar = el("span", "ac-bar"); bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-label", NAMES[t.id] || t.id); bar.setAttribute("aria-valuemin", "0"); bar.setAttribute("aria-valuemax", "100"); bar.setAttribute("aria-valuenow", String(t.percent));
    const fill = el("span"); fill.style.width = `${t.percent}%`; bar.append(fill);
    a.append(top, bar, el("small", "", T("t.lessons", { done: n.format(t.completed), total: n.format(t.total) }))); li.append(a); list.append(li);
  }
  const ach = $("pAch"); ach.textContent = "";
  for (const x of s.achievements) { const li = el("li", "pf-badge" + (x.earned ? " is-earned" : "")); li.dataset.id = x.id; li.append(el("strong", "", T("a." + x.id)), el("small", "", x.earned ? T("a.earned") : `${n.format(x.progress)} / ${n.format(x.target)}`)); ach.append(li); }
  addLast();
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
if (page === "profile") renderAccount();
window.addEventListener("fayad:langchange", render);
window.addEventListener("storage", render);
window.addEventListener("pageshow", render);
window.addEventListener("fayad-auth-changed", () => { if (page === "profile") renderAccount(); });
window.addEventListener("fayad-profile-changed", () => { if (page === "profile") renderAccount(); });
