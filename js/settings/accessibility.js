import { extend, T, el, mount, card, segmented, range, status, storageNote, F } from "/js/settings/ui.js";
extend({
  ar: { "ay.text": "نص أكبر", "ay.textD": "يكبّر المحتوى في كل صفحات المنصة (نفس إعداد «حجم الخط» في المظهر).", "ay.contrast": "التباين", "ay.contrastD": "«عالٍ» يرفع تباين النصوص والحدود ويؤكد الروابط ومؤشر التركيز.", "ay.normal": "عادي", "ay.high": "عالٍ",
    "ay.motion": "الحركة", "ay.motionD": "«تقليل» يوقف الانتقالات والحركات. «حسب النظام» يتبع إعداد جهازك.", "ay.msys": "حسب النظام", "ay.mreduce": "تقليل الحركة", "ay.mfull": "السماح بالحركة",
    "ay.kb": "لوحة المفاتيح", "ay.kbD": "كل عناصر المنصة قابلة للوصول بلوحة المفاتيح، ومؤشر التركيز ظاهر دائمًا على العنصر الحالي.", "ay.k1": "التنقل بين العناصر", "ay.k2": "تفعيل زر أو رابط", "ay.k3": "تشغيل الكود في المحرر", "ay.k4": "الخروج من المحرر والعودة إلى الصفحة", "ay.k5": "التنقل داخل خيارات الإعدادات" },
  en: { "ay.text": "Larger text", "ay.textD": "Enlarges content on every page of the platform (the same setting as “Text size” in Appearance).", "ay.contrast": "Contrast", "ay.contrastD": "“High” raises text and border contrast and emphasises links and the focus ring.", "ay.normal": "Normal", "ay.high": "High",
    "ay.motion": "Motion", "ay.motionD": "“Reduce” stops transitions and animation. “System” follows your device setting.", "ay.msys": "Follow system", "ay.mreduce": "Reduce motion", "ay.mfull": "Allow motion",
    "ay.kb": "Keyboard", "ay.kbD": "Everything on the platform is reachable by keyboard, and the focus ring is always visible on the current element.", "ay.k1": "Move between elements", "ay.k2": "Activate a button or link", "ay.k3": "Run the code in the editor", "ay.k4": "Leave the editor and return to the page", "ay.k5": "Move within a settings option group" },
});
const P = F.prefs;
mount("accessibility", async (body, { user }) => {
  const a = P.all, st = status();
  const set = (k) => (v) => P.set({ [k]: v });
  const mod = /Mac|iPhone|iPad/.test(navigator.platform || "") ? "⌘" : "Ctrl";
  const keys = [["Tab / Shift+Tab", "ay.k1"], ["Enter / Space", "ay.k2"], [mod + "+Enter", "ay.k3"], ["Esc", "ay.k4"], ["← → ↑ ↓", "ay.k5"]];
  const reset = el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: () => { P.set({ fontScale: P.defaults.fontScale, contrast: P.defaults.contrast, motion: P.defaults.motion }, { touch: true }); location.reload(); } }, T("st.reset"));
  body.append(
    card(T("ay.text"), T("ay.textD"), range({ id: "fs2", label: T("ay.text"), min: 90, max: 130, step: 10, value: a.fontScale, fmt: (v) => v + "%", onInput: set("fontScale") })),
    card(T("ay.contrast"), T("ay.contrastD"), segmented({ label: T("ay.contrast"), value: a.contrast, onChange: set("contrast"), options: [{ value: "normal", label: T("ay.normal") }, { value: "high", label: T("ay.high") }] })),
    card(T("ay.motion"), T("ay.motionD"), segmented({ label: T("ay.motion"), value: a.motion, onChange: set("motion"), options: [{ value: "system", label: T("ay.msys") }, { value: "reduce", label: T("ay.mreduce") }, { value: "full", label: T("ay.mfull") }] })),
    card(T("ay.kb"), T("ay.kbD"), el("dl", { class: "st-keys" }, keys.flatMap(([k, d]) => [el("dt", { dir: "ltr" }, el("kbd", {}, k)), el("dd", {}, T(d))]))),
    el("div", { class: "st-actions" }, reset), st.node, storageNote(user));
});
