import { extend, T, el, mount, card, field, status, F } from "/js/settings/ui.js";
extend({
  ar: { "pf.priv": "خصوصية الصورة", "pf.privD": "عند الإيقاف تظهر صورتك لك فقط، ويرى الآخرون في لوحة المتصدرين أيقونة محايدة.", "pf.privL": "إظهار صورتي للآخرين", "pf.privOk": "تم حفظ إعداد الخصوصية.", "pf.privE": "تعذّر الحفظ. قد يحتاج الإعداد إلى تفعيل من إدارة المنصة.", "pf.guestH": "سجّل الدخول لإدارة ملفك الشخصي", "pf.guestP": "الاسم والصورة وبيانات الحساب تُحفظ في حسابك. تقدّمك الحالي على هذا الجهاز لا يضيع عند تسجيل الدخول.", "pf.photo": "الصورة الشخصية", "pf.photoD": "JPG أو PNG أو WebP بحجم حتى 5 ميجابايت. تُصغَّر الصورة تلقائيًا قبل الرفع.",
    "pf.choose": "اختيار صورة", "pf.replace": "استبدال الصورة", "pf.remove": "إزالة الصورة", "pf.save": "حفظ الصورة", "pf.cancel": "إلغاء", "pf.name": "الاسم الظاهر", "pf.nameD": "يظهر في القوائم ولوحة الترتيب (حتى 80 حرفًا).", "pf.saveName": "حفظ الاسم",
    "pf.account": "بيانات الحساب", "pf.email": "البريد الإلكتروني", "pf.status": "حالة الحساب", "pf.verified": "البريد مؤكَّد", "pf.unverified": "البريد غير مؤكَّد بعد", "pf.since": "تاريخ الإنشاء", "pf.last": "آخر تسجيل دخول", "pf.provider": "طريقة الدخول", "pf.pw": "بريد وكلمة مرور",
    "pf.e.type": "نوع الملف غير مدعوم. اختر JPG أو PNG أو WebP.", "pf.e.size": "الصورة أكبر من 5 ميجابايت.", "pf.e.empty": "الملف فارغ.", "pf.e.decode": "تعذّر قراءة الصورة. اختر ملف صورة سليمًا.", "pf.e.name": "اكتب اسمًا من حرف إلى 80 حرفًا.",
    "pf.ok.photo": "تم تحديث صورتك.", "pf.ok.removed": "تمت إزالة الصورة.", "pf.ok.name": "تم حفظ الاسم.", "pf.preview": "معاينة قبل الحفظ", "pf.uploading": "جارٍ رفع الصورة...", "pf.initial": "صورتك" },
  en: { "pf.priv": "Picture privacy", "pf.privD": "When off, only you see your picture; others see a neutral icon on the leaderboard.", "pf.privL": "Show my picture to others", "pf.privOk": "Privacy setting saved.", "pf.privE": "Could not save. This setting may need to be enabled by the platform owner.", "pf.guestH": "Sign in to manage your profile", "pf.guestP": "Your name, picture and account details are saved to your account. Progress already on this device is kept when you sign in.", "pf.photo": "Profile picture", "pf.photoD": "JPG, PNG or WebP up to 5 MB. The picture is shrunk automatically before upload.",
    "pf.choose": "Choose a picture", "pf.replace": "Replace picture", "pf.remove": "Remove picture", "pf.save": "Save picture", "pf.cancel": "Cancel", "pf.name": "Display name", "pf.nameD": "Shown in menus and on the leaderboard (up to 80 characters).", "pf.saveName": "Save name",
    "pf.account": "Account details", "pf.email": "Email", "pf.status": "Account status", "pf.verified": "Email confirmed", "pf.unverified": "Email not confirmed yet", "pf.since": "Created", "pf.last": "Last sign-in", "pf.provider": "Sign-in method", "pf.pw": "Email and password",
    "pf.e.type": "Unsupported file type. Choose JPG, PNG or WebP.", "pf.e.size": "The picture is larger than 5 MB.", "pf.e.empty": "The file is empty.", "pf.e.decode": "Could not read the picture. Choose a valid image file.", "pf.e.name": "Enter a name of 1 to 80 characters.",
    "pf.ok.photo": "Your picture was updated.", "pf.ok.removed": "Picture removed.", "pf.ok.name": "Name saved.", "pf.preview": "Preview before saving", "pf.uploading": "Uploading picture...", "pf.initial": "Your picture" },
});

import { AVATAR_TYPES, validateAvatar, validateName } from "/js/settings/validate.js";
export { AVATAR_TYPES, validateAvatar, validateName };

/** Decode, centre-crop to a square, shrink to 512px, re-encode as WebP (also strips EXIF/location data). */
async function toWebp(file) {
  let bmp; try { bmp = await createImageBitmap(file); } catch { throw new Error("decode"); }
  const s = Math.min(bmp.width, bmp.height), out = Math.min(512, s);
  const c = document.createElement("canvas"); c.width = c.height = out;
  c.getContext("2d").drawImage(bmp, (bmp.width - s) / 2, (bmp.height - s) / 2, s, s, 0, 0, out, out);
  const blob = await new Promise((r) => c.toBlob(r, "image/webp", 0.88));
  if (!blob) throw new Error("decode"); return blob;
}

const fmt = (d) => { try { return new Date(d).toLocaleString(F.i18n?.lang === "en" ? "en-GB" : "ar-EG-u-nu-latn", { dateStyle: "medium", timeStyle: "short" }); } catch { return d || "—"; } };
const initial = (n, e) => (n || e || "?").trim().charAt(0).toUpperCase();

mount("profile", async (body, { client, user }) => {
  if (!user) { body.append(card(T("pf.guestH"), T("pf.guestP"), el("p", {}, el("a", { class: "st-btn", href: "/login.html" }, T("st.signin"))))); return; }
  let { data: prof } = await client.from("profiles").select("*").eq("id", user.id).maybeSingle();
  prof = prof || {};
  let name = prof.display_name || user.user_metadata?.full_name || "", avatar = prof.avatar_url || "";

  /* ---- picture ---- */
  const img = el("div", { class: "st-avatar", role: "img", "aria-label": T("pf.initial") });
  const paintAvatar = (url) => { img.textContent = ""; if (url) img.append(el("img", { src: url, alt: "", width: 96, height: 96 })); else img.append(el("span", {}, initial(name, user.email))); };
  paintAvatar(avatar);
  const ast = status(); let pending = null, previewUrl = null;
  const file = el("input", { type: "file", id: "avatarFile", accept: AVATAR_TYPES.join(","), class: "st-file", "aria-label": T("pf.choose") });
  const pick = el("label", { class: "st-btn", for: "avatarFile" }, avatar ? T("pf.replace") : T("pf.choose"));
  const save = el("button", { type: "button", class: "st-btn", hidden: true }, T("pf.save"));
  const cancel = el("button", { type: "button", class: "st-btn st-btn-ghost", hidden: true }, T("pf.cancel"));
  const remove = el("button", { type: "button", class: "st-btn st-btn-ghost", hidden: !avatar }, T("pf.remove"));
  const clearPending = () => { pending = null; if (previewUrl) URL.revokeObjectURL(previewUrl); previewUrl = null; file.value = ""; save.hidden = cancel.hidden = true; paintAvatar(avatar); };
  file.addEventListener("change", () => {
    const f = file.files?.[0]; if (!f) return;
    const bad = validateAvatar(f); if (bad) { clearPending(); ast.err(T("pf.e." + bad)); return; }
    ast.clear(); pending = f; if (previewUrl) URL.revokeObjectURL(previewUrl); previewUrl = URL.createObjectURL(f); paintAvatar(previewUrl); save.hidden = cancel.hidden = false; ast.ok(T("pf.preview"));
  });
  cancel.addEventListener("click", () => { clearPending(); ast.clear(); });
  const setAvatar = async (url) => {
    const { error } = await client.from("profiles").upsert({ id: user.id, avatar_url: url, updated_at: new Date().toISOString() }, { onConflict: "id" }); if (error) throw error;
    await client.auth.updateUser({ data: { avatar_url: url || null } });
    F.setProfile?.({ avatar: url || "" });
  };
  save.addEventListener("click", async () => {
    if (!pending) return; save.disabled = cancel.disabled = true; ast.busy(T("pf.uploading"));
    try {
      let blob; try { blob = await toWebp(pending); } catch { ast.err(T("pf.e.decode")); return; }
      const path = `${user.id}/avatar-${Date.now()}.webp`;
      const up = await client.storage.from("avatars").upload(path, blob, { contentType: "image/webp", cacheControl: "31536000", upsert: false }); if (up.error) throw up.error;
      const url = client.storage.from("avatars").getPublicUrl(path).data.publicUrl;
      await setAvatar(url);
      const old = avatar && avatar.split("/avatars/")[1]; avatar = url;
      if (old) client.storage.from("avatars").remove([decodeURIComponent(old)]).catch(() => {});
      pending = null; if (previewUrl) URL.revokeObjectURL(previewUrl); previewUrl = null; file.value = ""; paintAvatar(avatar); save.hidden = cancel.hidden = true; remove.hidden = false; pick.textContent = T("pf.replace"); ast.ok(T("pf.ok.photo"));
    } catch (e) { ast.err(/network|fetch/i.test(String(e?.message)) ? T("st.offline") : T("st.error")); }
    finally { save.disabled = cancel.disabled = false; }
  });
  remove.addEventListener("click", async () => {
    remove.disabled = true; ast.busy();
    try { const old = avatar.split("/avatars/")[1]; await setAvatar(null); if (old) client.storage.from("avatars").remove([decodeURIComponent(old)]).catch(() => {}); avatar = ""; paintAvatar(""); remove.hidden = true; pick.textContent = T("pf.choose"); ast.ok(T("pf.ok.removed")); }
    catch { ast.err(); } finally { remove.disabled = false; }
  });

  /* ---- name ---- */
  const nst = status();
  const nameIn = el("input", { type: "text", id: "dispName", maxlength: 80, value: name, autocomplete: "nickname", class: "st-input" });
  const saveName = el("button", { type: "button", class: "st-btn" }, T("pf.saveName"));
  const doName = async () => {
    const n = validateName(nameIn.value); if (!n) { nst.err(T("pf.e.name")); nameIn.focus(); return; }
    saveName.disabled = true; nst.busy();
    try {
      const { error } = await client.from("profiles").upsert({ id: user.id, display_name: n, updated_at: new Date().toISOString() }, { onConflict: "id" }); if (error) throw error;
      await client.auth.updateUser({ data: { full_name: n } }); F.setProfile?.({ name: n }); name = n; nameIn.value = n; paintAvatar(avatar); nst.ok(T("pf.ok.name"));
    } catch (e) { nst.err(/network|fetch/i.test(String(e?.message)) ? T("st.offline") : T("st.error")); } finally { saveName.disabled = false; }
  };
  saveName.addEventListener("click", doName); nameIn.addEventListener("keydown", (e) => { if (e.key === "Enter") doName(); });

  /* ---- account facts (read-only, from Supabase Auth) ---- */
  const dl = el("dl", { class: "st-facts" });
  const add = (k, v) => dl.append(el("dt", {}, k), el("dd", {}, v));
  add(T("pf.email"), el("bdi", { dir: "ltr" }, user.email || "—"));
  add(T("pf.status"), user.email_confirmed_at ? T("pf.verified") : T("pf.unverified"));

  add(T("pf.provider"), (user.app_metadata?.providers || []).map((p) => (p === "email" ? T("pf.pw") : p)).join(" · ") || "—");

  /* ---- picture privacy (profiles.avatar_public; leaderboard hides the picture from others when off) ---- */
  const pst = status();
  const pub = el("input", { type: "checkbox", id: "avatarPublic", role: "switch", checked: prof.avatar_public !== false });
  pub.addEventListener("change", async () => {
    pub.disabled = true;
    const { error } = await client.from("profiles").upsert({ id: user.id, avatar_public: pub.checked, updated_at: new Date().toISOString() }, { onConflict: "id" });
    pub.disabled = false;
    if (error) { pub.checked = !pub.checked; pst.err(T("pf.privE")); } else pst.ok(T("pf.privOk"));
  });

  body.append(
    card(T("pf.photo"), T("pf.photoD"), el("div", { class: "st-avatar-row" }, img, el("div", { class: "st-avatar-ctl" }, el("div", { class: "st-actions" }, pick, save, cancel, remove), file, ast.node))),
    card(T("pf.priv"), T("pf.privD"), field(T("pf.privL"), null, pub, "avatarPublic"), pst.node),
    card(T("pf.name"), T("pf.nameD"), el("div", { class: "st-inline" }, nameIn, saveName), nst.node),
    card(T("pf.account"), null, dl));
  nameIn.setAttribute("aria-label", T("pf.name"));
});
