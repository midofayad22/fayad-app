import { extend, T, el, mount, card, segmented, status, storageNote, F } from "/js/settings/ui.js";
extend({
  ar: { "lg.title": "لغة الواجهة", "lg.desc": "تغيّر لغة القوائم والأزرار واتجاه الصفحة (يمين←يسار للعربية، يسار←يمين للإنجليزية) في كل صفحات المنصة.", "lg.ar": "العربية", "lg.en": "الإنجليزية",
    "lg.dir": "اتجاه الصفحة الحالي", "lg.rtl": "من اليمين إلى اليسار (RTL)", "lg.ltr": "من اليسار إلى اليمين (LTR)", "lg.learn": "لغة شرح الدروس تُضبط بشكل منفصل من «تفضيلات التعلّم».", "lg.done": "تم تغيير اللغة." },
  en: { "lg.title": "Interface language", "lg.desc": "Changes menus, buttons and page direction (right-to-left for Arabic, left-to-right for English) on every page of the platform.", "lg.ar": "Arabic", "lg.en": "English",
    "lg.dir": "Current page direction", "lg.rtl": "Right to left (RTL)", "lg.ltr": "Left to right (LTR)", "lg.learn": "The lesson explanation language is set separately in Learning preferences.", "lg.done": "Language changed." },
});
const P = F.prefs;
mount("language", async (body, { user }) => {
  const st = status();
  const dirText = el("strong", {}, document.documentElement.dir === "rtl" ? T("lg.rtl") : T("lg.ltr"));
  const seg = segmented({ label: T("lg.title"), value: P.lang, onChange: (v) => { P.setLang(v); }, options: [{ value: "ar", label: T("lg.ar") }, { value: "en", label: T("lg.en") }] });
  body.append(card(T("lg.title"), T("lg.desc"), seg), card(T("lg.dir"), null, el("p", {}, dirText)), el("p", { class: "st-note" }, T("lg.learn"), " ", el("a", { href: "/settings/learning.html" }, T("st.learning"))), st.node, storageNote(user));
});
