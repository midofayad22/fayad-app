/* Sign-in / sign-up page. Uses the shared Supabase client (window.FAYAD_AUTH.client from main-auth.js). */
const F = (window.FAYAD ||= {});
const D = {
  ar: { "au.title": "تعلّم، طبّق، وتابع تقدمك", "au.p1": "دروس تفاعلية بمحرر ومعاينة حية", "au.p2": "تقدمك يُحفظ ويتزامن بين أجهزتك", "au.p3": "ألعاب وتحديات برمجية بلوحة ترتيب", "au.guest": "يمكنك التعلم بدون حساب؛ الحساب يضيف المزامنة فقط.",
    "au.tabIn": "تسجيل الدخول", "au.tabUp": "حساب جديد", "au.welcome": "مرحبًا بعودتك", "au.use": "استخدام", "au.hIn": "أهلاً بعودتك", "au.sIn": "سجّل الدخول لتكمل من حيث توقفت.", "au.hUp": "أنشئ حسابك", "au.sUp": "مجاني، ويحفظ تقدمك بين الأجهزة.",
    "au.name": "الاسم الظاهر (اختياري)", "au.email": "البريد الإلكتروني", "au.pass": "كلمة المرور", "au.confirm": "تأكيد كلمة المرور", "au.hint": "8 أحرف على الأقل، وتحتوي على حرف ورقم.", "au.show": "إظهار كلمة المرور", "au.hide": "إخفاء كلمة المرور",
    "au.btnIn": "تسجيل الدخول", "au.btnUp": "إنشاء الحساب", "au.forgot": "نسيت كلمة المرور؟", "au.back": "العودة إلى الرئيسية", "au.hNew": "كلمة مرور جديدة", "au.sNew": "اختر كلمة مرور جديدة لحسابك.", "au.save": "حفظ كلمة المرور",
    "au.working": "جارٍ التنفيذ...", "au.ok.in": "تم تسجيل الدخول. جارٍ فتح المنصة...", "au.ok.up": "تم إنشاء الحساب. جارٍ فتح المنصة...", "au.ok.confirm": "تم إنشاء الحساب. افتح رسالة التأكيد في بريدك ثم سجّل الدخول.", "au.ok.reset": "إن كان البريد مسجلًا فقد أرسلنا رابط إعادة التعيين إليه.", "au.ok.saved": "تم حفظ كلمة المرور الجديدة. جارٍ فتح المنصة...",
    "au.e.email": "أدخل بريدًا إلكترونيًا صحيحًا.", "au.e.pass": "أدخل كلمة المرور.", "au.e.len": "كلمة المرور يجب ألا تقل عن 8 أحرف.", "au.e.weak": "أضف حرفًا ورقمًا واحدًا على الأقل إلى كلمة المرور.", "au.e.match": "كلمتا المرور غير متطابقتين.",
    "au.e.cred": "البريد الإلكتروني أو كلمة المرور غير صحيحة.", "au.e.unconf": "أكّد بريدك الإلكتروني أولًا من الرسالة التي وصلتك.", "au.e.rate": "محاولات كثيرة. حاول بعد قليل.", "au.e.exists": "هذا البريد مسجل بالفعل. سجّل الدخول بدلًا من إنشاء حساب.", "au.e.net": "تعذر الاتصال بالخادم. تحقق من الإنترنت.", "au.e.load": "تعذر تحميل نظام الحساب. أعد تحميل الصفحة.", "au.e.gen": "حدث خطأ غير متوقع. حاول مرة أخرى.", "au.m.weak": "ضعيفة", "au.m.ok": "متوسطة", "au.m.good": "جيدة", "au.m.strong": "قوية" },
  en: { "au.title": "Learn, practise, and track your progress", "au.p1": "Interactive lessons with an editor and live preview", "au.p2": "Your progress is saved and synced across your devices", "au.p3": "Coding games and challenges with a leaderboard", "au.guest": "You can learn without an account; an account only adds syncing.",
    "au.tabIn": "Sign in", "au.tabUp": "Create account", "au.welcome": "Welcome back", "au.use": "Use", "au.hIn": "Welcome back", "au.sIn": "Sign in to continue where you left off.", "au.hUp": "Create your account", "au.sUp": "Free, and it keeps your progress across devices.",
    "au.name": "Display name (optional)", "au.email": "Email", "au.pass": "Password", "au.confirm": "Confirm password", "au.hint": "At least 8 characters, with a letter and a number.", "au.show": "Show password", "au.hide": "Hide password",
    "au.btnIn": "Sign in", "au.btnUp": "Create account", "au.forgot": "Forgot your password?", "au.back": "Back to home", "au.hNew": "New password", "au.sNew": "Choose a new password for your account.", "au.save": "Save password",
    "au.working": "Working...", "au.ok.in": "Signed in. Opening the platform...", "au.ok.up": "Account created. Opening the platform...", "au.ok.confirm": "Account created. Open the confirmation email, then sign in.", "au.ok.reset": "If that email is registered, we sent a reset link to it.", "au.ok.saved": "New password saved. Opening the platform...",
    "au.e.email": "Enter a valid email address.", "au.e.pass": "Enter your password.", "au.e.len": "The password must be at least 8 characters.", "au.e.weak": "Add at least one letter and one number to the password.", "au.e.match": "The passwords do not match.",
    "au.e.cred": "Incorrect email or password.", "au.e.unconf": "Confirm your email first using the message we sent.", "au.e.rate": "Too many attempts. Try again shortly.", "au.e.exists": "This email is already registered. Sign in instead.", "au.e.net": "Could not reach the server. Check your connection.", "au.e.load": "The account system could not load. Reload the page.", "au.e.gen": "Something went wrong. Please try again.", "au.m.weak": "Weak", "au.m.ok": "Fair", "au.m.good": "Good", "au.m.strong": "Strong" },
};
F.i18n?.extend?.(D);
const T = (k) => (F.i18n?.t ? F.i18n.t(k) : D.ar[k]) || k;
const $ = (id) => document.getElementById(id);
const el = { form: $("authForm"), reset: $("resetForm"), email: $("email"), pass: $("password"), name: $("name"), confirm: $("confirm"), status: $("status"), status2: $("status2"), submit: $("submit"), submitText: $("submitText"), head: $("auHead"), sub: $("auSub"), toggle: $("togglePw"), meter: $("meterFill"), hint: $("pwHint") };
let mode = "signin", busy = false;
const isRecovery = /type=recovery/.test(location.hash);

const say = (msg, kind = "", node = el.status) => { node.textContent = msg; node.className = "au-status" + (kind ? " " + kind : ""); };
const go = (delay = 500) => setTimeout(() => { location.href = "index.html"; }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : delay);
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export function passwordIssue(pw) { if (!pw) return "au.e.pass"; if (pw.length < 8) return "au.e.len"; if (!/[A-Za-z؀-ۿ]/.test(pw) || !/[0-9٠-٩]/.test(pw)) return "au.e.weak"; return null; }
export function mapError(e) {
  const m = String(e?.message || e || "").toLowerCase();
  if (/invalid login|invalid credentials/.test(m)) return "au.e.cred"; if (/not confirmed/.test(m)) return "au.e.unconf"; if (/rate limit|too many/.test(m)) return "au.e.rate";
  if (/already registered|already been registered/.test(m)) return "au.e.exists"; if (/weak|at least/.test(m)) return "au.e.weak"; if (/network|fetch|failed to/.test(m)) return "au.e.net"; if (/could not be loaded|unavailable/.test(m)) return "au.e.load";
  return "au.e.gen";
}
function waitForAuth(timeout = 12000) { return new Promise((res, rej) => { const t0 = Date.now(); (function c() { const a = window.FAYAD_AUTH; if (a?.client?.auth) return res(a); if (Date.now() - t0 > timeout) return rej(new Error("could not be loaded")); setTimeout(c, 60); })(); }); }

function setMode(m) {
  mode = m; const up = m === "signup";
  for (const b of document.querySelectorAll(".au-tabs button")) { const on = b.dataset.mode === m; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; }
  for (const n of document.querySelectorAll("[data-only]")) n.hidden = n.dataset.only !== m;
  el.head.setAttribute("data-i18n", up ? "au.hUp" : "au.hIn"); el.sub.setAttribute("data-i18n", up ? "au.sUp" : "au.sIn"); el.submitText.setAttribute("data-i18n", up ? "au.btnUp" : "au.btnIn");
  el.pass.autocomplete = up ? "new-password" : "current-password"; F.i18n?.apply?.(); say("");
  el.head.textContent = T(up ? "au.hUp" : "au.hIn"); el.sub.textContent = T(up ? "au.sUp" : "au.sIn"); el.submitText.textContent = T(up ? "au.btnUp" : "au.btnIn");
  if (up) meter();
}
for (const b of document.querySelectorAll(".au-tabs button")) {
  b.addEventListener("click", () => setMode(b.dataset.mode));
  b.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { const next = document.querySelector(`.au-tabs button:not([data-mode="${mode}"])`); setMode(next.dataset.mode); next.focus(); } });
}
document.addEventListener("fayad:langchange", () => setMode(mode));

function meter() {
  const v = el.pass.value; let score = 0; if (v.length >= 8) score++; if (v.length >= 12) score++; if (/[A-Za-z]/.test(v) && /[0-9]/.test(v)) score++; if (/[^A-Za-z0-9]/.test(v)) score++;
  el.meter.style.width = v ? `${(score / 4) * 100}%` : "0"; el.meter.style.background = ["#dc2626", "#dc2626", "#d97706", "#0d9488", "#0f766e"][score];
  el.hint.textContent = v ? `${T(["au.m.weak", "au.m.weak", "au.m.ok", "au.m.good", "au.m.strong"][score])} — ${T("au.hint")}` : T("au.hint");
}
el.pass.addEventListener("input", () => { if (mode === "signup") meter(); if (el.status.classList.contains("error")) say(""); });
el.email.addEventListener("input", () => { if (el.status.classList.contains("error")) say(""); });
el.toggle.addEventListener("click", () => { const show = el.pass.type === "password"; el.pass.type = show ? "text" : "password"; el.toggle.setAttribute("aria-pressed", String(show)); el.toggle.setAttribute("aria-label", T(show ? "au.hide" : "au.show")); });

function busyState(on) { busy = on; el.submit.disabled = on; if (on) el.submitText.textContent = T("au.working"); else el.submitText.textContent = T(mode === "signup" ? "au.btnUp" : "au.btnIn"); }
function remember(email) { try { localStorage.setItem("fayad_last_user_email", email); localStorage.setItem("fayad_has_used_account", "true"); } catch { /* private mode */ } }

el.form.addEventListener("submit", async (ev) => {
  ev.preventDefault(); if (busy) return;
  const email = el.email.value.trim(), pw = el.pass.value;
  el.email.removeAttribute("aria-invalid"); el.pass.removeAttribute("aria-invalid");
  if (!validEmail(email)) { el.email.setAttribute("aria-invalid", "true"); el.email.focus(); return say(T("au.e.email"), "error"); }
  if (mode === "signin") { if (!pw) { el.pass.setAttribute("aria-invalid", "true"); el.pass.focus(); return say(T("au.e.pass"), "error"); } }
  else {
    const issue = passwordIssue(pw); if (issue) { el.pass.setAttribute("aria-invalid", "true"); el.pass.focus(); return say(T(issue), "error"); }
    if (pw !== el.confirm.value) { el.confirm.setAttribute("aria-invalid", "true"); el.confirm.focus(); return say(T("au.e.match"), "error"); }
  }
  busyState(true); say(T("au.working"), "loading");
  try {
    const { client } = await waitForAuth();
    if (mode === "signin") {
      const { data, error } = await client.auth.signInWithPassword({ email, password: pw });
      if (error) throw error; if (!data?.user) throw new Error("no session");
      remember(email); say(T("au.ok.in"), "success"); go();
    } else {
      const name = el.name.value.trim();
      const { data, error } = await client.auth.signUp({ email, password: pw, options: { data: name ? { full_name: name } : {} } });
      if (error) throw error;
      // an already-registered address returns a user with no identities and no error (to avoid revealing accounts): treat it as "exists"
      if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) throw new Error("already registered");
      remember(email);
      if (data?.session) { say(T("au.ok.up"), "success"); go(); } else { say(T("au.ok.confirm"), "success"); busyState(false); }
      return;
    }
  } catch (e) { say(T(mapError(e)), "error"); busyState(false); }
});

$("forgot").addEventListener("click", async () => {
  const email = el.email.value.trim(); if (!validEmail(email)) { el.email.focus(); el.email.setAttribute("aria-invalid", "true"); return say(T("au.e.email"), "error"); }
  try { const { client } = await waitForAuth(); const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: location.origin + "/login.html" }); if (error && /rate/i.test(error.message)) throw error; say(T("au.ok.reset"), "success"); }
  catch (e) { say(T(mapError(e)), "error"); }
});

el.reset.addEventListener("submit", async (ev) => {
  ev.preventDefault(); const a = $("newPw").value, b = $("newPw2").value;
  const issue = passwordIssue(a); if (issue) return say(T(issue), "error", el.status2); if (a !== b) return say(T("au.e.match"), "error", el.status2);
  try { const { client } = await waitForAuth(); const { error } = await client.auth.updateUser({ password: a }); if (error) throw error; say(T("au.ok.saved"), "success", el.status2); go(); }
  catch (e) { say(T(mapError(e)), "error", el.status2); }
});

function showRecovery() { el.form.hidden = true; document.querySelector(".au-tabs").hidden = true; $("welcomeBack").hidden = true; el.reset.hidden = false; $("newPw").focus(); }

(async function init() {
  setMode("signin");
  try {
    const auth = await waitForAuth();
    auth.client.auth.onAuthStateChange((ev) => { if (ev === "PASSWORD_RECOVERY") showRecovery(); });
    if (isRecovery) { showRecovery(); return; }
    const { data } = await auth.client.auth.getSession();
    if (data?.session?.user) { location.replace("index.html"); return; }
    const email = auth.getLastUserEmail?.() || localStorage.getItem("fayad_last_user_email");
    if (email) { $("rememberedEmail").textContent = email; $("welcomeBack").hidden = false; el.email.value = email; $("useRemembered").addEventListener("click", () => { el.email.value = email; el.pass.focus(); }); }
  } catch { /* offline or blocked: the form still renders; submitting reports the error */ }
})();
