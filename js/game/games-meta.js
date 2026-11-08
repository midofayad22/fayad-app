// Game registry shared by the search index builder (and checked against js/game/hub.js by tests/search-index.test.mjs).
export const GAMES_META = [
  { id: "arena-html", href: "/play/arena.html?track=html", title: { ar: "ساحة HTML", en: "HTML Arena" }, desc: { ar: "ابنِ صفحات سليمة الدلالة وسهلة الوصول وأصلح أخطاءها.", en: "Build semantic, accessible pages and fix their mistakes." }, track: "html" },
  { id: "arena-css", href: "/play/arena.html?track=css", title: { ar: "ساحة CSS", en: "CSS Arena" }, desc: { ar: "تخطيطات Flexbox وGrid وتصميم متجاوب وحركة.", en: "Flexbox and Grid layouts, responsive design and motion." }, track: "css" },
  { id: "arena-js", href: "/play/arena.html?track=js", title: { ar: "ساحة JavaScript", en: "JavaScript Arena" }, desc: { ar: "منطق وتصحيح أخطاء وإغلاقات وDOM ووعود وخوارزميات.", en: "Logic, debugging, closures, the DOM, promises and algorithms." }, track: "js" },
  { id: "flex-quest", href: "/play/flex-quest.html", title: { ar: "Flex Quest — لعبة Flexbox", en: "Flex Quest — the Flexbox game" }, desc: { ar: "رتّب العناصر بخصائص Flexbox حتى تطابق الهدف.", en: "Arrange elements with Flexbox properties until they match the target." }, track: "css" },
  { id: "selector-quest", href: "/play/selector-quest.html", title: { ar: "Selector Quest — لعبة محددات CSS", en: "Selector Quest — the CSS selectors game" }, desc: { ar: "اكتب محدد CSS يختار العناصر المطلوبة فقط.", en: "Write a CSS selector that picks only the required elements." }, track: "css" },
];
