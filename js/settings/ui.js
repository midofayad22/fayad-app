/* Shared building blocks for the Settings pages: bilingual strings, nav, controls, status messages, auth gate. */
import { ensureClient } from "/js/engine/cloud.js";

export const F = (window.FAYAD ||= {});
const D = {
  ar: {
    "st.title": "الإعدادات", "st.sub": "تحكّم في حسابك وتجربة التعلّم. التغييرات تُطبَّق على المنصة كلها.", "st.nav": "أقسام الإعدادات", "st.home": "الرئيسية",
    "st.profile": "الحساب والملف الشخصي", "st.appearance": "المظهر", "st.language": "اللغة والمنطقة", "st.learning": "تفضيلات التعلّم", "st.notifications": "الإشعارات",
    "st.security": "الخصوصية والأمان", "st.accessibility": "إمكانية الوصول",
    "st.d.profile": "الاسم والصورة وبيانات الحساب", "st.d.appearance": "الثيم واللون وحجم الخط", "st.d.language": "العربية أو الإنجليزية واتجاه الصفحة", "st.d.learning": "طريقة عرض الدروس والمحرر",
    "st.d.notifications": "التذكيرات وسجل الإشعارات", "st.d.security": "كلمة المرور والجلسات وحذف الحساب", "st.d.accessibility": "نص أكبر وتباين وحركة أقل",
    "st.saved": "تم الحفظ.", "st.error": "تعذّر الحفظ. حاول مرة أخرى.", "st.working": "جارٍ التنفيذ...", "st.reset": "إعادة الضبط الافتراضي", "st.resetDone": "أُعيدت الإعدادات إلى الافتراضي.",
    "st.guest": "أنت تستخدم المنصة كزائر: تُحفظ إعداداتك على هذا الجهاز فقط. سجّل الدخول لمزامنتها بين أجهزتك.", "st.signin": "تسجيل الدخول", "st.needAuth": "هذا القسم يحتاج إلى حساب. سجّل الدخول للمتابعة.",
    "st.offline": "تعذّر الاتصال بالخدمة الآن.", "st.syncNote": "إعداداتك محفوظة في حسابك وتتزامن بين أجهزتك.",
  },
  en: {
    "st.title": "Settings", "st.sub": "Control your account and learning experience. Changes apply across the whole platform.", "st.nav": "Settings sections", "st.home": "Home",
    "st.profile": "Account & profile", "st.appearance": "Appearance", "st.language": "Language & region", "st.learning": "Learning preferences", "st.notifications": "Notifications",
    "st.security": "Privacy & security", "st.accessibility": "Accessibility",
    "st.d.profile": "Name, picture and account details", "st.d.appearance": "Theme, accent colour and text size", "st.d.language": "Arabic or English and page direction", "st.d.learning": "How lessons and the editor look",
    "st.d.notifications": "Reminders and notification history", "st.d.security": "Password, sessions and account deletion", "st.d.accessibility": "Larger text, contrast and reduced motion",
    "st.saved": "Saved.", "st.error": "Could not save. Please try again.", "st.working": "Working...", "st.reset": "Reset to defaults", "st.resetDone": "Settings were reset to the defaults.",
    "st.guest": "You are using the platform as a guest: your settings are saved on this device only. Sign in to sync them across your devices.", "st.signin": "Sign in", "st.needAuth": "This section needs an account. Sign in to continue.",
    "st.offline": "The service can't be reached right now.", "st.syncNote": "Your settings are saved to your account and sync across your devices.",
  },
};
export function extend(d) { for (const l of ["ar", "en"]) Object.assign(D[l], d[l] || {}); F.i18n?.extend?.(d); }
F.i18n?.extend?.(D);
export const T = (k) => D[F.i18n?.lang === "en" || document.documentElement.dataset.lang === "en" ? "en" : "ar"][k] ?? D.ar[k] ?? k;

export function el(tag, attrs, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) { if (v == null || v === false) continue; if (k === "class") n.className = v; else if (k.startsWith("on")) n.addEventListener(k.slice(2), v); else n.setAttribute(k, v === true ? "" : v); }
  for (const c of kids.flat()) if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(c));
  return n;
}

export const PAGES = ["profile", "appearance", "language", "learning", "notifications", "security", "accessibility"];
let pagesLive = ["profile", "appearance", "language", "learning", "notifications", "security", "accessibility"];
export const livePages = () => pagesLive;
export function setLivePages(list) { pagesLive = list; }
export const href = (p) => (p === "index" ? "/settings/index.html" : `/settings/${p}.html`);

export function buildNav(active) {
  const nav = el("nav", { class: "st-nav", "aria-label": T("st.nav") });
  nav.append(el("a", { href: href("index"), class: active === "index" ? "on" : "", "aria-current": active === "index" ? "page" : null }, T("st.title")));
  for (const p of pagesLive) nav.append(el("a", { href: href(p), class: p === active ? "on" : "", "aria-current": p === active ? "page" : null }, T("st." + p)));
  return nav;
}

/** status line: role=status for progress/success, role=alert for errors */
export function status() {
  const n = el("p", { class: "st-status", role: "status", "aria-live": "polite", hidden: true });
  const show = (kind, msg) => { n.hidden = !msg; n.textContent = msg || ""; n.dataset.kind = kind; n.setAttribute("role", kind === "err" ? "alert" : "status"); };
  return { node: n, busy: (m) => show("busy", m || T("st.working")), ok: (m) => show("ok", m || T("st.saved")), err: (m) => show("err", m || T("st.error")), clear: () => show("", "") };
}

export function card(title, desc, ...body) {
  return el("section", { class: "st-card" }, title ? el("h2", {}, title) : null, desc ? el("p", { class: "st-desc" }, desc) : null, ...body);
}
export function field(label, desc, control, id) {
  return el("div", { class: "st-field" }, el("div", { class: "st-field-t" }, el("label", { for: id || null, id: id ? id + "-l" : null }, label), desc ? el("small", {}, desc) : null), control);
}

/** radio-style button group (keyboard: arrows move + select) */
export function segmented({ label, options, value, onChange, cls }) {
  const g = el("div", { class: "st-seg " + (cls || ""), role: "radiogroup", "aria-label": label });
  const btns = options.map((o) => el("button", { type: "button", role: "radio", "aria-checked": String(o.value === value), tabindex: o.value === value ? "0" : "-1", "data-v": o.value, title: o.hint || null },
    o.swatch ? el("i", { class: "st-sw", style: `--c:${o.swatch}` }) : null, el("span", {}, o.label)));
  const set = (v, focus) => { btns.forEach((b) => { const on = b.dataset.v === String(v); b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); }); onChange(options.find((o) => String(o.value) === String(v)).value); };
  btns.forEach((b, i) => {
    b.addEventListener("click", () => set(b.dataset.v));
    b.addEventListener("keydown", (e) => {
      const rtl = document.documentElement.dir === "rtl"; let d = 0;
      if (e.key === "ArrowRight") d = rtl ? -1 : 1; else if (e.key === "ArrowLeft") d = rtl ? 1 : -1; else if (e.key === "ArrowDown") d = 1; else if (e.key === "ArrowUp") d = -1; else return;
      e.preventDefault(); set(btns[(i + d + btns.length) % btns.length].dataset.v, true);
    });
    g.append(b);
  });
  g.setValue = (v) => btns.forEach((b) => { const on = b.dataset.v === String(v); b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
  return g;
}

export function range({ id, label, min, max, step, value, fmt, onInput }) {
  const out = el("output", { for: id }, fmt(value));
  const inp = el("input", { type: "range", id, min, max, step, value, "aria-label": label, "aria-valuetext": fmt(value) });
  inp.addEventListener("input", () => { const v = Number(inp.value); out.textContent = fmt(v); inp.setAttribute("aria-valuetext", fmt(v)); onInput(v); });
  const w = el("div", { class: "st-range" }, inp, out); w.input = inp; w.out = out; w.set = (v) => { inp.value = v; out.textContent = fmt(Number(v)); };
  return w;
}

/** guests see a note, signed-in users see where their settings are stored */
export async function accountState() {
  let c = null; try { c = await ensureClient(); } catch {}
  if (!c) return { client: null, user: null };
  try { const { data, error } = await c.auth.getUser(); if (!error && data?.user) return { client: c, user: data.user }; if (error && error.status >= 400 && error.status < 500) return { client: c, user: null }; /* rejected token: really signed out */ } catch { /* offline: fall back to the locally stored session below */ }
  try { const { data } = await c.auth.getSession(); return { client: c, user: data?.session?.user || null }; } catch { return { client: c, user: null }; }
}

export function storageNote(user) {
  return el("p", { class: "st-note" }, user ? T("st.syncNote") : [T("st.guest"), " ", el("a", { href: "/login.html" }, T("st.signin"))]);
}

/** mount(page, render): builds the frame, renders the page body, and re-renders on language change */
export async function mount(page, render) {
  const root = document.getElementById("stRoot");
  let account = await accountState();
  const paint = async () => {
    root.textContent = "";
    const titleKey = page === "index" ? "st.title" : "st." + page;
    const body = el("div", { class: "st-content" });
    root.append(buildNav(page), el("section", { class: "st-main" }, el("header", { class: "st-head" }, el("h1", { id: "stTitle" }, T(titleKey)), el("p", {}, page === "index" ? T("st.sub") : T("st.d." + page))), body));
    await render(body, account);
    F.i18n?.apply?.(root);
  };
  window.addEventListener("fayad:langchange", paint);
  window.addEventListener("fayad:prefschange", (e) => { if (e.detail?.changed?.includes("sync")) paint(); });
  document.addEventListener("fayad:prefssync", async () => { account = await accountState(); paint(); });
  await paint();
}
