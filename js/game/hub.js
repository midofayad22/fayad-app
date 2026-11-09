import { read, solvedOf } from "/js/game/store.js";
import { leaderboard, syncGames } from "/js/engine/cloud.js";
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
  ar: { "lb.you": "(أنت)", "gh.title": "مركز الألعاب", "gh.sub": "تعلّم باللعب: ألغاز قصيرة بمراحل متدرجة، والتحقق منها فوري. نقاطك تُحفظ على هذا الجهاز.", "gh.note": "مسارات التحديات المتبقية قيد الإعداد ولن تظهر هنا قبل أن تعمل وتُختبر فعلًا.", "fq.points": "نقاط اللعبة", "fq.home": "الرئيسية", "fq.dash": "لوحة التقدم", "fq.hub": "الألعاب", "gh.play": "العب", "gh.arena": "تحديات برمجية", "gh.levels": "{n} من {t} مراحل", "lb.title": "لوحة الترتيب", "lb.note": "النقاط تُحسب على الخادم من قواعد ثابتة وبحدّ للمعدّل، لكن الخادم لا يستطيع إعادة تشغيل كودك للتأكد من الحل، فالترتيب ودّي وليس مسابقة محمية بالكامل.", "lb.in": "سجّل الدخول لتظهر في اللوحة ويُحفظ تقدمك.", "lb.empty": "لا يوجد لاعبون بعد. كن الأول!", "lb.off": "تعذّر تحميل اللوحة الآن.", "lb.anon": "لاعب", "lb.pts": "نقطة" },
  en: { "lb.you": "(you)", "gh.title": "Games hub", "gh.sub": "Learn by playing: short puzzles with growing levels and instant checking. Your points stay on this device.", "gh.note": "The remaining challenge tracks are in the works and will not be listed until they run and are tested.", "fq.points": "Game points", "fq.home": "Home", "fq.dash": "Progress dashboard", "fq.hub": "Games", "gh.play": "Play", "gh.arena": "Coding challenges", "gh.levels": "{n} of {t} levels", "lb.title": "Leaderboard", "lb.note": "Points are computed on the server from fixed rules and rate-limited, but the server cannot re-run your code to confirm a solve, so the ranking is friendly, not a fully cheat-proof contest.", "lb.in": "Sign in to appear on the board and keep your progress.", "lb.empty": "No players yet. Be the first!", "lb.off": "Could not load the board right now.", "lb.anon": "Player", "lb.pts": "pts" },
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

async function board() {
  const ol = document.getElementById("lbList"); if (!ol) return;
  const rows = await leaderboard(10); ol.textContent = "";
  const msg = document.getElementById("lbMsg");
  if (!rows) { msg.textContent = T("lb.off"); return; }
  msg.textContent = rows.length ? "" : T("lb.empty");
  for (const r of rows) {
    const li = document.createElement("li"); const rank = Number(r.rank); li.dataset.rank = String(rank);
    if (rank <= 3) li.className = "top top-" + rank;
    if (r.is_me) li.classList.add("me");
    const rk = document.createElement("b"); rk.textContent = rank;
    const av = document.createElement("span"); av.className = "gh-av"; av.setAttribute("aria-hidden", "true");
    const nameText = r.display_name || T("lb.anon");
    // avatar_url is only present when its owner allows it (or it is the viewer's own); otherwise a neutral initial-less glyph is shown
    if (typeof r.avatar_url === "string" && /^https:\/\//.test(r.avatar_url)) { const im = document.createElement("img"); im.alt = ""; im.width = im.height = 32; im.loading = "lazy"; im.decoding = "async"; im.referrerPolicy = "no-referrer"; im.src = r.avatar_url; av.appendChild(im); }
    else av.classList.add("gh-av-n");
    const nm = document.createElement("span"); nm.className = "gh-nm"; nm.textContent = nameText;
    if (r.is_me) { const you = document.createElement("small"); you.textContent = T("lb.you"); nm.append(" ", you); }
    const pt = document.createElement("em"); pt.textContent = `${r.points} ${T("lb.pts")}`;
    li.append(rk, av, nm, pt); ol.appendChild(li);
  }
}
document.addEventListener("fayad:langchange", board);
board();
document.addEventListener("fayad:cloudsync", render);
window.addEventListener("load", () => setTimeout(async () => { const r = await syncGames(); if (r.ok) { render(); board(); } else if (r.reason === "signed-out") document.getElementById("lbMsg").textContent = T("lb.in"); }, 1500), { once: true });
