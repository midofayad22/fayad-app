import { read, solvedOf } from "/js/game/store.js";
const F = window.FAYAD;
const ARENA = [
  { id: "html", name: "HTML", ar: "ابنِ صفحات سليمة الدلالة وسهلة الوصول وأصلح أخطاءها.", en: "Build semantic, accessible pages and fix their bugs." },
  { id: "css", name: "CSS", ar: "تخطيطات Flexbox وGrid وتصميم متجاوب وحركة بقياسات حقيقية.", en: "Flexbox and Grid layouts, responsive design and motion, graded by real measurements." },
  { id: "js", name: "JavaScript", ar: "منطق وتصحيح أخطاء وإغلاقات وDOM ووعود وخوارزميات سريعة.", en: "Logic, debugging, closures, the DOM, promises and fast algorithms." },
].map((t) => ({ ...t, arena: true, href: `/play/arena.html?track=${t.id}`, total: 10, tag: "10 · " }));
const GAMES = [
  { id: "flex", href: "/play/flex-quest.html", name: "Flex Quest", total: 10, tag: "CSS", ar: "رتّب العناصر بخصائص Flexbox حتى تطابق الهدف.", en: "Arrange items with Flexbox properties until they match the target." },
  { id: "sel", href: "/play/selector-quest.html", name: "Selector Quest", total: 10, tag: "CSS", ar: "اكتب محدد CSS يختار العناصر المطلوبة فقط.", en: "Write a CSS selector that picks only the wanted elements." },
];
const DICT = {
  ar: { "gh.title": "مركز الألعاب", "gh.sub": "تعلّم باللعب: ألغاز قصيرة بمراحل متدرجة، والتحقق منها فوري. نقاطك تُحفظ على هذا الجهاز.", "gh.note": "مسارات التحديات المتبقية قيد الإعداد ولن تظهر هنا قبل أن تعمل وتُختبر فعلًا.", "fq.points": "نقاط اللعبة", "fq.home": "الرئيسية", "fq.dash": "لوحة التقدم", "fq.hub": "الألعاب", "gh.play": "العب", "gh.arena": "تحديات برمجية", "gh.levels": "{n} من {t} مراحل" },
  en: { "gh.title": "Games hub", "gh.sub": "Learn by playing: short puzzles with growing levels and instant checking. Your points stay on this device.", "gh.note": "The remaining challenge tracks are in the works and will not be listed until they run and are tested.", "fq.points": "Game points", "fq.home": "Home", "fq.dash": "Progress dashboard", "fq.hub": "Games", "gh.play": "Play", "gh.arena": "Coding challenges", "gh.levels": "{n} of {t} levels" },
};
F?.i18n?.extend(DICT);
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
function render() {
  const d = read();
  document.getElementById("ghPoints").textContent = d.points;
  const ul = document.getElementById("ghGrid"); ul.textContent = "";
  for (const g of [...ARENA, ...GAMES]) {
    const n = solvedOf(d, g.id), li = document.createElement("li"), a = document.createElement("a");
    a.href = g.href; a.className = "gh-card";
    const tag = document.createElement("span"); tag.className = "gh-tag"; tag.textContent = g.arena ? T("gh.arena") : g.tag;
    const h = document.createElement("h2"); h.textContent = g.name;
    const p = document.createElement("p"); p.textContent = g[lang()];
    const bar = document.createElement("span"); bar.className = "gh-bar"; const fill = document.createElement("i"); fill.style.width = Math.round((n / g.total) * 100) + "%"; bar.appendChild(fill);
    const meta = document.createElement("span"); meta.className = "gh-meta"; meta.textContent = T("gh.levels", { n, t: g.total });
    const go = document.createElement("span"); go.className = "gh-go"; go.textContent = T("gh.play") + " →";
    a.append(tag, h, p, bar, meta, go); li.appendChild(a); ul.appendChild(li);
  }
}
document.addEventListener("fayad:langchange", () => { F?.i18n?.apply?.(); render(); });
render();
