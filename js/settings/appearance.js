import { extend, T, el, mount, card, field, segmented, range, status, storageNote, F } from "/js/settings/ui.js";
extend({
  ar: { "ap.theme": "الثيم", "ap.light": "فاتح", "ap.dark": "داكن", "ap.system": "حسب النظام", "ap.themeD": "«حسب النظام» يتبع إعداد جهازك ويتغير معه تلقائيًا.", "ap.accent": "لون التمييز", "ap.accentD": "يغيّر لون الأزرار والروابط والعناصر النشطة. ألوان الكورسات تبقى كما هي.",
    "ap.size": "حجم الخط", "ap.sizeD": "يكبّر محتوى الصفحات والدروس.", "ap.preview": "معاينة مباشرة", "ap.pTitle": "هكذا ستبدو صفحاتك", "ap.pText": "مثال على نص عادي مع رابط وزر. أي تغيير هنا يظهر فورًا على الصفحة كلها قبل أن تحفظه.", "ap.pBtn": "زر رئيسي", "ap.pLink": "رابط",
    "ap.apply": "تطبيق وحفظ", "ap.discard": "تراجع عن المعاينة", "ap.dirty": "لديك تغييرات غير محفوظة (تظهر كمعاينة فقط).", "ap.clean": "لا توجد تغييرات.",
    "ac.teal": "أخضر مزرق", "ac.blue": "أزرق", "ac.violet": "بنفسجي", "ac.rose": "وردي", "ac.amber": "كهرماني", "ac.slate": "رمادي" },
  en: { "ap.theme": "Theme", "ap.light": "Light", "ap.dark": "Dark", "ap.system": "System", "ap.themeD": "“System” follows your device setting and changes with it.", "ap.accent": "Accent colour", "ap.accentD": "Changes buttons, links and active items. Course colours stay as they are.",
    "ap.size": "Text size", "ap.sizeD": "Enlarges page and lesson content.", "ap.preview": "Live preview", "ap.pTitle": "This is how your pages will look", "ap.pText": "Sample body text with a link and a button. Any change here shows on the whole page right away, before you save it.", "ap.pBtn": "Primary button", "ap.pLink": "A link",
    "ap.apply": "Apply and save", "ap.discard": "Discard preview", "ap.dirty": "You have unsaved changes (shown as a preview only).", "ap.clean": "No changes.",
    "ac.teal": "Teal", "ac.blue": "Blue", "ac.violet": "Violet", "ac.rose": "Rose", "ac.amber": "Amber", "ac.slate": "Slate" },
});
const KEYS = ["themeMode", "accent", "fontScale"];
const SW = { teal: "#0f766e", blue: "#1d4ed8", violet: "#6d28d9", rose: "#be123c", amber: "#a15207", slate: "#334155" };
const P = F.prefs;

mount("appearance", async (body, { user }) => {
  const saved = P.all; let draft = Object.fromEntries(KEYS.map((k) => [k, saved[k]]));
  const st = status(); const msg = el("p", { class: "st-note", role: "status" });
  const dirty = () => KEYS.some((k) => draft[k] !== P.all[k]);
  const sync = () => { const d = dirty(); apply.disabled = discard.disabled = !d; msg.textContent = d ? T("ap.dirty") : T("ap.clean"); P.preview(d ? draft : null); };
  const set = (k) => (v) => { draft[k] = v; sync(); };

  const theme = segmented({ label: T("ap.theme"), value: draft.themeMode, onChange: set("themeMode"), options: [{ value: "light", label: T("ap.light") }, { value: "dark", label: T("ap.dark") }, { value: "system", label: T("ap.system") }] });
  const accent = segmented({ label: T("ap.accent"), value: draft.accent, onChange: set("accent"), cls: "st-seg-sw", options: P.enums.accent.map((a) => ({ value: a, label: T("ac." + a), swatch: SW[a] })) });
  const size = range({ id: "fs", label: T("ap.size"), min: 90, max: 130, step: 10, value: draft.fontScale, fmt: (v) => v + "%", onInput: set("fontScale") });
  const apply = el("button", { type: "button", class: "st-btn", onclick: () => { P.set(draft); st.ok(); sync(); } }, T("ap.apply"));
  const discard = el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: () => { draft = Object.fromEntries(KEYS.map((k) => [k, P.all[k]])); theme.setValue(draft.themeMode); accent.setValue(draft.accent); size.set(draft.fontScale); st.clear(); sync(); } }, T("ap.discard"));
  const reset = el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: () => { P.set(Object.fromEntries(KEYS.map((k) => [k, P.defaults[k]])), { touch: true }); draft = Object.fromEntries(KEYS.map((k) => [k, P.all[k]])); theme.setValue(draft.themeMode); accent.setValue(draft.accent); size.set(draft.fontScale); st.ok(T("st.resetDone")); sync(); } }, T("st.reset"));

  body.append(
    card(T("ap.theme"), T("ap.themeD"), theme),
    card(T("ap.accent"), T("ap.accentD"), accent),
    card(T("ap.size"), T("ap.sizeD"), size),
    card(T("ap.preview"), null, el("div", { class: "st-demo" }, el("h3", {}, T("ap.pTitle")), el("p", {}, T("ap.pText")), el("p", {}, el("button", { type: "button", class: "st-btn" }, T("ap.pBtn")), " ", el("a", { href: "#" , onclick: (e) => e.preventDefault() }, T("ap.pLink"))))),
    el("div", { class: "st-actions" }, apply, discard, reset), msg, st.node, storageNote(user));
  sync();
});
