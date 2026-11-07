import { extend, T, el, mount, card, field, status } from "/js/settings/ui.js";
import { passwordIssue, DELETE_PHRASE } from "/js/settings/validate.js";
extend({
  ar: { "sc.guestH": "سجّل الدخول لإدارة الأمان", "sc.pw": "تغيير كلمة المرور", "sc.pwD": "أدخل كلمة المرور الحالية ثم الجديدة (8 أحرف على الأقل، وتحتوي على حرف ورقم).", "sc.cur": "كلمة المرور الحالية", "sc.new": "كلمة المرور الجديدة", "sc.conf": "تأكيد كلمة المرور الجديدة",
    "sc.others": "تسجيل الخروج من الأجهزة الأخرى بعد التغيير", "sc.change": "تغيير كلمة المرور", "sc.e.cur": "كلمة المرور الحالية غير صحيحة.", "sc.e.empty": "أدخل كلمة المرور.", "sc.e.len": "كلمة المرور يجب ألا تقل عن 8 أحرف.", "sc.e.weak": "أضف حرفًا ورقمًا واحدًا على الأقل.", "sc.e.match": "كلمتا المرور غير متطابقتين.", "sc.e.same": "اختر كلمة مرور مختلفة عن الحالية.", "sc.e.rate": "محاولات كثيرة. حاول بعد قليل.", "sc.e.net": "تعذّر الاتصال بالخدمة الآن.", "sc.e.gen": "تعذّر إكمال العملية. حاول مرة أخرى.",
    "sc.ok.pw": "تم تغيير كلمة المرور.", "sc.rec": "استعادة كلمة المرور", "sc.recD": "نرسل رابط إعادة التعيين إلى بريدك المسجَّل. الرابط يفتح صفحة تسجيل الدخول لتختار كلمة مرور جديدة.", "sc.recBtn": "إرسال رابط إعادة التعيين", "sc.ok.rec": "أرسلنا رابط إعادة التعيين إلى بريدك إن كان مسجَّلًا.",
    "sc.sess": "الجلسات", "sc.sessD": "يمكنك تسجيل الخروج من هذا الجهاز أو من كل الأجهزة الأخرى. لا تتوفر قائمة تفصيلية بالأجهزة.", "sc.here": "تسجيل الخروج من هذا الجهاز", "sc.others2": "تسجيل الخروج من الأجهزة الأخرى", "sc.all": "تسجيل الخروج من كل الأجهزة", "sc.ok.others": "تم تسجيل الخروج من الأجهزة الأخرى.", "sc.cur2": "الجلسة الحالية تنتهي تلقائيًا ما لم تُجدَّد:",
    "sc.info": "معلومات أمان الحساب", "sc.email": "البريد الإلكتروني", "sc.verified": "حالة البريد", "sc.yes": "مؤكَّد", "sc.no": "غير مؤكَّد", "sc.methods": "طرق الدخول", "sc.last": "آخر تسجيل دخول", "sc.created": "تاريخ الإنشاء", "sc.mfa": "التحقق بخطوتين", "sc.mfaV": "غير متاح حاليًا", "sc.pwm": "بريد وكلمة مرور",
    "sc.del": "حذف الحساب", "sc.delD": "يحذف حسابك وتقدمك المحفوظ ونقاطك وإشعاراتك وصورتك من خوادمنا نهائيًا ولا يمكن التراجع. التقدم المحفوظ على هذا الجهاز لا يُمسح.", "sc.delPw": "كلمة المرور للتأكيد", "sc.delType": "اكتب العبارة التالية للتأكيد", "sc.delBtn": "حذف حسابي نهائيًا", "sc.e.phrase": "اكتب العبارة بالضبط كما هي.", "sc.ok.del": "تم حذف حسابك. جارٍ فتح الصفحة الرئيسية...", "sc.delConfirm": "هل أنت متأكد من حذف الحساب نهائيًا؟" },
  en: { "sc.guestH": "Sign in to manage security", "sc.pw": "Change password", "sc.pwD": "Enter your current password, then a new one (at least 8 characters, with a letter and a number).", "sc.cur": "Current password", "sc.new": "New password", "sc.conf": "Confirm new password",
    "sc.others": "Sign out of other devices after changing", "sc.change": "Change password", "sc.e.cur": "The current password is incorrect.", "sc.e.empty": "Enter the password.", "sc.e.len": "The password must be at least 8 characters.", "sc.e.weak": "Add at least one letter and one number.", "sc.e.match": "The passwords do not match.", "sc.e.same": "Choose a password different from the current one.", "sc.e.rate": "Too many attempts. Try again shortly.", "sc.e.net": "The service can't be reached right now.", "sc.e.gen": "Could not complete the operation. Please try again.",
    "sc.ok.pw": "Your password was changed.", "sc.rec": "Password recovery", "sc.recD": "We send a reset link to your registered email. The link opens the sign-in page so you can choose a new password.", "sc.recBtn": "Send reset link", "sc.ok.rec": "We sent a reset link to your email if it is registered.",
    "sc.sess": "Sessions", "sc.sessD": "You can sign out of this device or of all your other devices. A detailed device list is not available.", "sc.here": "Sign out of this device", "sc.others2": "Sign out of other devices", "sc.all": "Sign out of all devices", "sc.ok.others": "Signed out of your other devices.", "sc.cur2": "The current session expires automatically unless renewed:",
    "sc.info": "Account security information", "sc.email": "Email", "sc.verified": "Email status", "sc.yes": "Confirmed", "sc.no": "Not confirmed", "sc.methods": "Sign-in methods", "sc.last": "Last sign-in", "sc.created": "Created", "sc.mfa": "Two-step verification", "sc.mfaV": "Not available yet", "sc.pwm": "Email and password",
    "sc.del": "Delete account", "sc.delD": "Permanently deletes your account, saved progress, points, notifications and picture from our servers. This cannot be undone. Progress stored on this device is not erased.", "sc.delPw": "Password to confirm", "sc.delType": "Type this phrase to confirm", "sc.delBtn": "Delete my account permanently", "sc.e.phrase": "Type the phrase exactly as shown.", "sc.ok.del": "Your account was deleted. Opening the home page...", "sc.delConfirm": "Are you sure you want to permanently delete your account?" },
});
const fmt = (d) => { try { return new Date(d).toLocaleString(document.documentElement.dataset.lang === "en" ? "en-GB" : "ar-EG", { dateStyle: "medium", timeStyle: "short" }); } catch { return "—"; } };
const mapErr = (e) => { const m = String(e?.message || e || "").toLowerCase(); if (/invalid login|invalid credentials/.test(m)) return "sc.e.cur"; if (/rate limit|too many/.test(m)) return "sc.e.rate"; if (/network|fetch|failed to/.test(m)) return "sc.e.net"; if (/same password|different from the old/.test(m)) return "sc.e.same"; if (/weak|at least|short/.test(m)) return "sc.e.weak"; return "sc.e.gen"; };
const pwInput = (id, ac) => el("input", { type: "password", id, class: "st-input", autocomplete: ac, "aria-labelledby": id + "-l" });

mount("security", async (body, { client, user }) => {
  if (!user) { body.append(card(T("sc.guestH"), T("st.needAuth"), el("p", {}, el("a", { class: "st-btn", href: "/login.html" }, T("st.signin"))))); return; }
  /* ---- change password ---- */
  const pst = status(); const cur = pwInput("pwCur", "current-password"), nw = pwInput("pwNew", "new-password"), cf = pwInput("pwConf", "new-password");
  const others = el("input", { type: "checkbox", id: "pwOthers", checked: true });
  const go = el("button", { type: "submit", class: "st-btn" }, T("sc.change"));
  const form = el("form", { class: "st-form", novalidate: true }, field(T("sc.cur"), null, cur, "pwCur"), field(T("sc.new"), null, nw, "pwNew"), field(T("sc.conf"), null, cf, "pwConf"),
    el("label", { class: "st-check", for: "pwOthers" }, others, T("sc.others")), el("div", { class: "st-actions" }, go), pst.node);
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); pst.clear();
    if (!cur.value) { pst.err(T("sc.e.empty")); cur.focus(); return; }
    const iss = passwordIssue(nw.value); if (iss) { pst.err(T("sc.e." + iss)); nw.focus(); return; }
    if (nw.value !== cf.value) { pst.err(T("sc.e.match")); cf.focus(); return; }
    if (nw.value === cur.value) { pst.err(T("sc.e.same")); nw.focus(); return; }
    go.disabled = true; pst.busy();
    try {
      const v = await client.auth.signInWithPassword({ email: user.email, password: cur.value }); if (v.error) throw v.error;   // proves the person at the keyboard knows the current password
      const u = await client.auth.updateUser({ password: nw.value }); if (u.error) throw u.error;
      if (others.checked) await client.auth.signOut({ scope: "others" }).catch(() => {});
      cur.value = nw.value = cf.value = ""; pst.ok(T("sc.ok.pw"));
    } catch (err) { pst.err(T(mapErr(err))); } finally { go.disabled = false; }
  });

  /* ---- recovery ---- */
  const rst = status(); const rec = el("button", { type: "button", class: "st-btn st-btn-ghost" }, T("sc.recBtn"));
  rec.addEventListener("click", async () => { rec.disabled = true; rst.busy(); try { const { error } = await client.auth.resetPasswordForEmail(user.email, { redirectTo: location.origin + "/login.html" }); if (error) throw error; rst.ok(T("sc.ok.rec")); } catch (err) { rst.err(T(mapErr(err))); } finally { rec.disabled = false; } });

  /* ---- sessions ---- */
  const sst = status(); let exp = null; try { const { data } = await client.auth.getSession(); exp = data?.session?.expires_at ? data.session.expires_at * 1000 : null; } catch {}
  const out = async (scope, okMsg) => { sst.busy(); try { const { error } = await client.auth.signOut({ scope }); if (error) throw error; if (scope === "others") sst.ok(okMsg); else location.href = "/index.html"; } catch (err) { sst.err(T(mapErr(err))); } };
  const sessBtns = el("div", { class: "st-actions" },
    el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: () => out("local") }, T("sc.here")),
    el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: () => out("others", T("sc.ok.others")) }, T("sc.others2")),
    el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: () => out("global") }, T("sc.all")));

  /* ---- info ---- */
  const dl = el("dl", { class: "st-facts" }); const add = (k, v) => dl.append(el("dt", {}, k), el("dd", {}, v));
  add(T("sc.email"), el("bdi", { dir: "ltr" }, user.email || "—")); add(T("sc.verified"), user.email_confirmed_at ? T("sc.yes") : T("sc.no"));
  add(T("sc.methods"), (user.app_metadata?.providers || []).map((p) => (p === "email" ? T("sc.pwm") : p)).join(" · ") || "—");
  add(T("sc.last"), fmt(user.last_sign_in_at)); add(T("sc.created"), fmt(user.created_at)); add(T("sc.mfa"), T("sc.mfaV"));

  /* ---- delete ---- */
  const dst = status(); const dpw = pwInput("delPw", "current-password"), dph = el("input", { type: "text", id: "delPhrase", class: "st-input", autocomplete: "off", dir: "ltr", spellcheck: "false", "aria-labelledby": "delPhrase-l" });
  const dbtn = el("button", { type: "submit", class: "st-btn st-btn-danger" }, T("sc.delBtn"));
  const dform = el("form", { class: "st-form", novalidate: true }, field(T("sc.delPw"), null, dpw, "delPw"), field(T("sc.delType") + ": " + DELETE_PHRASE, null, dph, "delPhrase"), el("div", { class: "st-actions" }, dbtn), dst.node);
  dform.addEventListener("submit", async (e) => {
    e.preventDefault(); dst.clear();
    if (!dpw.value) { dst.err(T("sc.e.empty")); dpw.focus(); return; }
    if (dph.value.trim() !== DELETE_PHRASE) { dst.err(T("sc.e.phrase")); dph.focus(); return; }
    if (!confirm(T("sc.delConfirm"))) return;
    dbtn.disabled = true; dst.busy();
    try {
      const v = await client.auth.signInWithPassword({ email: user.email, password: dpw.value }); if (v.error) throw v.error;
      const folder = client.storage.from("avatars"); const { data: files } = await folder.list(user.id);
      if (files?.length) await folder.remove(files.map((f) => `${user.id}/${f.name}`)).catch(() => {});
      const { error } = await client.rpc("delete_my_account", { p_confirm: DELETE_PHRASE }); if (error) throw error;
      dst.ok(T("sc.ok.del")); await client.auth.signOut({ scope: "local" }).catch(() => {});
      try { for (const k of Object.keys(localStorage)) if (/^sb-.*-auth-token$/.test(k) || k === "fayad-prefs-pending") localStorage.removeItem(k); } catch {}
      setTimeout(() => (location.href = "/index.html"), 1500);
    } catch (err) { dst.err(T(mapErr(err))); dbtn.disabled = false; }
  });

  body.append(card(T("sc.pw"), T("sc.pwD"), form), card(T("sc.rec"), T("sc.recD"), el("div", { class: "st-actions" }, rec), rst.node),
    card(T("sc.sess"), T("sc.sessD"), exp ? el("p", { class: "st-desc" }, T("sc.cur2") + " ", el("bdi", {}, fmt(exp))) : null, sessBtns, sst.node), card(T("sc.info"), null, dl),
    el("section", { class: "st-card st-danger" }, el("h2", {}, T("sc.del")), el("p", { class: "st-desc" }, T("sc.delD")), dform));
});
