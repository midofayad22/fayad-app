import { extend, T, el, mount, card, segmented, range, status, storageNote, F } from "/js/settings/ui.js";
extend({
  ar: { "ln.reading": "تخطيط القراءة", "ln.readingD": "يغيّر تباعد الأسطر والبطاقات داخل الدروس.", "ln.comfortable": "مريح", "ln.compact": "مضغوط",
    "ln.sections": "أقسام الدرس", "ln.sectionsD": "«موسّعة»: تظهر كل الأقسام مفتوحة. «مطويّة»: تبدأ الأقسام مغلقة ما عدا الأول، وتفتحها بالنقر.", "ln.expanded": "موسّعة", "ln.collapsed": "مطويّة",
    "ln.explain": "لغة شرح الدروس", "ln.explainD": "لغة نص الدروس والأسئلة. واجهة المنصة تبقى بلغتك المختارة.", "ln.auto": "نفس لغة الواجهة", "ln.ar": "العربية", "ln.en": "الإنجليزية",
    "ln.edSize": "حجم خط المحرر", "ln.edTheme": "ثيم المحرر والأمثلة البرمجية", "ln.edDark": "داكن", "ln.edLight": "فاتح", "ln.edD": "يُطبَّق على محرر الشيفرة وأمثلة الكود في الدروس.",
    "ln.preview": "معاينة", "ln.s1": "ما هو CSS؟", "ln.s1t": "CSS هو اللغة التي تتحكم في شكل الصفحة: الألوان والمسافات والخطوط.", "ln.s2": "قاعدة بسيطة", "ln.s2t": "كل قاعدة تختار عنصرًا ثم تحدد خصائصه.", "ln.sample": "مثال" },
  en: { "ln.reading": "Reading layout", "ln.readingD": "Changes line spacing and card spacing inside lessons.", "ln.comfortable": "Comfortable", "ln.compact": "Compact",
    "ln.sections": "Lesson sections", "ln.sectionsD": "“Expanded”: every section is open. “Collapsed”: sections start closed except the first; click to open.", "ln.expanded": "Expanded", "ln.collapsed": "Collapsed",
    "ln.explain": "Lesson explanation language", "ln.explainD": "The language of lesson text and questions. The platform interface keeps your chosen language.", "ln.auto": "Same as interface", "ln.ar": "Arabic", "ln.en": "English",
    "ln.edSize": "Editor font size", "ln.edTheme": "Editor and code example theme", "ln.edDark": "Dark", "ln.edLight": "Light", "ln.edD": "Applies to the code editor and code examples in lessons.",
    "ln.preview": "Preview", "ln.s1": "What is CSS?", "ln.s1t": "CSS is the language that controls how a page looks: colours, spacing and fonts.", "ln.s2": "A simple rule", "ln.s2t": "Each rule selects an element, then sets its properties.", "ln.sample": "Example" },
});
const P = F.prefs;
mount("learning", async (body, { user }) => {
  const st = status(); const a = P.all;
  const set = (k) => (v) => { P.set({ [k]: v }); paintDemo(); };
  const demo = el("div", { class: "st-demo st-lesson", "aria-label": T("ln.preview") });
  function paintDemo() {
    const p = P.all; demo.textContent = "";
    [["ln.s1", "ln.s1t"], ["ln.s2", "ln.s2t"]].forEach(([h, t], i) => {
      const d = el(p.sections === "collapsed" ? "details" : "div", { class: "st-sec" }, el(p.sections === "collapsed" ? "summary" : "h3", {}, T(h)), el("p", {}, T(t)));
      if (p.sections === "collapsed" && i === 0) d.open = true; demo.append(d);
    });
    demo.append(el("div", { class: "st-code editor-panel", dir: "ltr" }, el("pre", {}, el("code", {}, "h1 {\n  color: teal;\n  font-size: 2rem;\n}"))));
  }
  const reading = segmented({ label: T("ln.reading"), value: a.reading, onChange: set("reading"), options: [{ value: "comfortable", label: T("ln.comfortable") }, { value: "compact", label: T("ln.compact") }] });
  const sections = segmented({ label: T("ln.sections"), value: a.sections, onChange: set("sections"), options: [{ value: "expanded", label: T("ln.expanded") }, { value: "collapsed", label: T("ln.collapsed") }] });
  const explain = segmented({ label: T("ln.explain"), value: a.explainLang, onChange: set("explainLang"), options: [{ value: "auto", label: T("ln.auto") }, { value: "ar", label: T("ln.ar") }, { value: "en", label: T("ln.en") }] });
  const edSize = range({ id: "es", label: T("ln.edSize"), min: 11, max: 22, step: 1, value: a.editorSize, fmt: (v) => v + "px", onInput: set("editorSize") });
  const edTheme = segmented({ label: T("ln.edTheme"), value: a.editorTheme, onChange: set("editorTheme"), options: [{ value: "dark", label: T("ln.edDark") }, { value: "light", label: T("ln.edLight") }] });
  const reset = el("button", { type: "button", class: "st-btn st-btn-ghost", onclick: () => { const k = ["reading", "sections", "explainLang", "editorSize", "editorTheme"]; P.set(Object.fromEntries(k.map((x) => [x, P.defaults[x]])), { touch: true }); st.ok(T("st.resetDone")); body.dispatchEvent(new Event("repaint")); location.reload(); } }, T("st.reset"));
  body.append(card(T("ln.reading"), T("ln.readingD"), reading), card(T("ln.sections"), T("ln.sectionsD"), sections), card(T("ln.explain"), T("ln.explainD"), explain),
    card(T("ln.edSize"), T("ln.edD"), edSize), card(T("ln.edTheme"), null, edTheme), card(T("ln.preview"), null, demo), el("div", { class: "st-actions" }, reset), st.node, storageNote(user));
  paintDemo();
});
