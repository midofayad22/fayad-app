/*
  Zombie Survival — game shell: intro, nights map, play screen, rule-list editor (pointer drag to reorder, up/down, undo), an animated replay that mirrors the
  engine's events exactly, per-turn rule evaluation (✓ fired / ✗ false / skipped) and explained failure. Rules are plain data; points are decided by the server.
*/
import { read, award } from "/js/game/store.js";
import { LEVELS } from "./levels.js";
import { run, validate, stars, CONDS, ACTIONS, SIZE, MAX_HP } from "./engine.js";
import { armDrag, confetti, countUp, reduced, sleep } from "/js/game/kit.js";

const F = window.FAYAD, $ = (id) => document.getElementById(id), GAME = "zombie", STAR_KEY = "fayad-zb-stars";
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.hint": "تلميح", "common.skip": "تخطي إلى المحتوى", "adv.run": "تشغيل", "adv.stop": "إيقاف", "adv.undo": "تراجع", "adv.speed": "السرعة",
    "zb.eyebrow": "منطق وشروط · 15 ليلة", "zb.sub": "لا تتحكم بالناجي مباشرة. اكتب قواعد «إذا… فافعل…» يتبعها كل دور: أول قاعدة تتحقق هي التي تُنفَّذ، فرتّبها جيدًا لتصمد حتى الفجر.", "zb.nights": "الليالي", "zb.mapSub": "كل ليلة أصعب: زومبي أكثر، ذخيرة أقل، وإجراءات جديدة تُفتح.",
    "zb.how1": "اكتب قاعدة: شرط ثم إجراء", "zb.how2": "رتّب القواعد: الأولى تتحقق تُنفَّذ", "zb.how3": "شاهد الليلة وصحّح قاعدتك", "zb.night": "الليلة", "zb.rules": "قواعد الناجي", "zb.rulesNote": "تُقرأ من الأعلى إلى الأسفل — أول شرط صحيح يُنفَّذ", "zb.add": "+ قاعدة",
    start: "ابدأ البقاء", cont: "تابع من حيث توقفت", back: "الألعاب", if: "إذا", do: "فافعل", adjacent: "زومبي ملاصق", inLine: "زومبي في خط الرمي", ammoEmpty: "الذخيرة فارغة", hpLow: "الصحة منخفضة", far: "الزومبي بعيد", always: "دائمًا",
    melee: "اضرب بالسلاح الأبيض", shoot: "أطلق النار", reload: "أعد التعبئة", retreat: "تراجع", heal: "استخدم حقيبة إسعاف", wait: "انتظر", up: "أعلى", down: "أسفل", del: "حذف", hp: "الصحة", ammo: "الذخيرة", med: "الإسعاف",
    goal: "اقضِ على كل الزومبي وأنت حي. حتى {m} قواعد.", size: "القواعد: {n} / {m} · ثلاث نجوم: {p} أو أقل", lvl: "الليلة {n}", locked: "مقفلة: أنهِ الليلة السابقة",
    fired: "✓ نُفّذت", falsy: "✗ الشرط غير متحقق", turn: "الدور {t}", "log.bite": "عضّة!", "log.melee-kill": "قتلتَ زومبي", "log.melee": "ضربة", "log.whiff": "ضربة في الهواء", "log.shot-kill": "رصاصة قاتلة", "log.shot": "أصبتَه", "log.miss": "أخطأت", "log.click": "لا ذخيرة!", "log.reload": "أعدتَ التعبئة", "log.heal": "عالجتَ نفسك", "log.nomed": "لا توجد حقائب", "log.retreat": "تراجعتَ", "log.cornered": "محاصر", "log.wait": "انتظرت", norule: "لا قاعدة تحققت",
    dawn: "نجوتَ حتى الفجر!", dawnSub: "كانت قواعدك كافية لهذه الليلة.", pts: "+{n} نقطة", ptsOld: "محلولة سابقًا", used: "استخدمت {n} قواعد · المرجع {p}", more3: "للنجوم الثلاث جرّب {p} قواعد أو أقل.", unlocked: "فُتحت الليلة {n}", all: "نجوتَ من كل الليالي!", next: "الليلة التالية", replay: "إعادة", toMap: "الليالي",
    fTitle: "لم تصمد", fNext: "ما العمل: ", empty0: "أضف قاعدة واحدة على الأقل.", budget: "عدد القواعد أكبر من المسموح.", "locked-action": "هذا الإجراء غير متاح في هذه الليلة.", "bad-rule": "قاعدة غير صالحة.", empty: "أضف قاعدة واحدة على الأقل.",
    fBite: "عضّك زومبي في الدور {t} بينما نُفّذت القاعدة {r} («{a}»).", fBiteN: "ضع قبلها قاعدة تتعامل مع الزومبي الملاصق (اضرب أو تراجع).", fClick: "نفدت الذخيرة في الدور {t} وأنت تطلق النار.", fClickN: "ضع قاعدة «الذخيرة فارغة ← أعد التعبئة» قبل قاعدة الإطلاق.", fTime: "انتهت الأدوار والزومبي ما زالوا أحياء.", fTimeN: "قاعدة «دائمًا ← انتظر» لا تقتل أحدًا: ضع إجراءً هجوميًا مكانها.", fDead: "مات الناجي في الدور {t}.", fDeadN: "عالج نفسك قبل أن تنخفض الصحة (حقيبة إسعاف) أو تراجع عن الزومبي.", again: "جرّب مجددًا", hintT: "يمكن حلها بـ {n} قواعد. ابدأ بقاعدة «{c} ← {a}».", running: "…" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.hint": "Hint", "common.skip": "Skip to content", "adv.run": "Run", "adv.stop": "Stop", "adv.undo": "Undo", "adv.speed": "Speed",
    "zb.eyebrow": "Logic and conditions · 15 nights", "zb.sub": "You do not control the survivor directly. Write “if… then…” rules followed every turn: the first rule that holds is the one that runs, so order them well to last until dawn.", "zb.nights": "Nights", "zb.mapSub": "Each night is harder: more zombies, less ammo, new actions unlock.",
    "zb.how1": "Write a rule: a condition, then an action", "zb.how2": "Order matters: the first true rule runs", "zb.how3": "Watch the night and fix your rule", "zb.night": "Night", "zb.rules": "Survivor rules", "zb.rulesNote": "Read top to bottom — the first true condition runs", "zb.add": "+ Rule",
    start: "Start surviving", cont: "Continue where you left off", back: "Games", if: "if", do: "then", adjacent: "a zombie is adjacent", inLine: "a zombie is in the firing line", ammoEmpty: "ammo is empty", hpLow: "health is low", far: "zombies are far", always: "always",
    melee: "melee attack", shoot: "shoot", reload: "reload", retreat: "retreat", heal: "use a medkit", wait: "wait", up: "Up", down: "Down", del: "Delete", hp: "Health", ammo: "Ammo", med: "Medkits",
    goal: "Defeat every zombie and stay alive. Up to {m} rules.", size: "Rules: {n} / {m} · three stars: {p} or fewer", lvl: "Night {n}", locked: "Locked: finish the previous night",
    fired: "✓ ran", falsy: "✗ condition false", turn: "Turn {t}", "log.bite": "Bitten!", "log.melee-kill": "Zombie down", "log.melee": "Hit", "log.whiff": "Swung at nothing", "log.shot-kill": "Killing shot", "log.shot": "Hit it", "log.miss": "Missed", "log.click": "Out of ammo!", "log.reload": "Reloaded", "log.heal": "Healed", "log.nomed": "No medkits", "log.retreat": "Retreated", "log.cornered": "Cornered", "log.wait": "Waited", norule: "no rule matched",
    dawn: "You made it to dawn!", dawnSub: "Your rules were enough for this night.", pts: "+{n} points", ptsOld: "Already solved", used: "You used {n} rules · reference {p}", more3: "For three stars try {p} rules or fewer.", unlocked: "Night {n} unlocked", all: "You survived every night!", next: "Next night", replay: "Replay", toMap: "Nights",
    fTitle: "You did not hold out", fNext: "What to do: ", empty0: "Add at least one rule.", budget: "Too many rules.", "locked-action": "That action is not available on this night.", "bad-rule": "Invalid rule.", empty: "Add at least one rule.",
    fBite: "A zombie bit you on turn {t} while rule {r} (“{a}”) ran.", fBiteN: "Put a rule before it that deals with the adjacent zombie (melee or retreat).", fClick: "You ran out of ammo on turn {t} while shooting.", fClickN: "Add “ammo is empty → reload” before the shoot rule.", fTime: "The turns ran out with zombies still alive.", fTimeN: "“always → wait” kills nobody: put an attacking action there.", fDead: "The survivor died on turn {t}.", fDeadN: "Heal before health gets low (medkit) or retreat from the zombie.", again: "Try again", hintT: "It can be solved with {n} rules. Start with the rule “{c} → {a}”.", running: "…" },
};
DICT.ar["gnav.home"] = "البداية"; DICT.ar["gnav.continue"] = "تابع اللعب"; DICT.ar["gnav.sections"] = "الأقسام";
DICT.en["gnav.home"] = "Start"; DICT.en["gnav.continue"] = "Continue"; DICT.en["gnav.sections"] = "Sections";
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const el = (tag, cls = "", txt = "") => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
const NS = "http://www.w3.org/2000/svg";
const svg = (id, cls = "") => { const s = document.createElementNS(NS, "svg"); if (cls) s.setAttribute("class", cls); s.setAttribute("aria-hidden", "true"); s.setAttribute("viewBox", "0 0 24 24"); const u = document.createElementNS(NS, "use"); u.setAttribute("href", "#" + id); s.appendChild(u); return s; };
const sprite = (id) => { const s = svg(id, "sp"); s.setAttribute("viewBox", "0 0 48 48"); return s; };

const readStars = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (lv, s) => { const d = readStars(); if (!d[lv] || d[lv] < s) { d[lv] = s; try { localStorage.setItem(STAR_KEY, JSON.stringify(d)); } catch { /* blocked */ } } };
const isDone = (n) => !!read().games[GAME]?.solved[n];
const unlocked = (n) => n === 1 || isDone(n - 1) || isDone(n);
const firstOpen = () => { for (let n = 1; n <= LEVELS.length; n++) if (!isDone(n)) return n; return LEVELS.length; };

/* ---------- night scene (dead forest + a lit cabin) ---------- */
(function scene() {
  let a = 7; const r = () => ((a = (a * 16807) % 2147483647) / 2147483647); let s = `<path d="M0 600V430c120-40 230-10 340-30s220-60 360-30 330-10 500 20V600z" fill="#0b1b20"/>`;
  for (let i = 0; i < 26; i++) { const x = r() * 1200, h = 120 + r() * 200, y = 560; s += `<g stroke="#050b10" stroke-width="${4 + r() * 5}" stroke-linecap="round" fill="none"><path d="M${x} ${y} V${y - h}"/><path d="M${x} ${y - h * 0.5} l${-30 - r() * 30} ${-40 - r() * 30}M${x} ${y - h * 0.7} l${26 + r() * 30} ${-34 - r() * 30}M${x} ${y - h * 0.3} l${24 + r() * 26} ${-22}"/></g>`; }
  s += `<g><rect x="860" y="468" width="120" height="70" fill="#07121a"/><path d="M850 470 L920 420 L990 470z" fill="#050d14"/><rect x="884" y="492" width="22" height="26" fill="#ffb02e"/><rect x="930" y="492" width="22" height="26" fill="#ff9a1f" opacity=".85"/><ellipse cx="920" cy="540" rx="150" ry="34" fill="#ffb02e" opacity=".12"/></g>`;
  s += `<path d="M0 600V540c200 20 400-10 600 6s400 10 600-6V600z" fill="#050b10"/>`;
  document.querySelector(".zb-forest").innerHTML = s;
})();

/* ---------- state ---------- */
let idx = 0, rules = [], hist = [], hinted = false, running = false, token = 0, speed = 1, justUnlocked = 0, screen = "intro", lastRes = null;
const lvl = () => LEVELS[idx];
const main = $("main");
const SCREENS = { intro: $("scrIntro"), map: $("scrMap"), play: $("scrPlay") };
function show(name) {
  stopRun(); screen = name; main.dataset.screen = name; main.dataset.dawn = "0";
  for (const [k, s] of Object.entries(SCREENS)) s.hidden = k !== name;
  $("zbBackTxt").textContent = name === "play" ? T("zb.nights") : T("back");
  try { history.replaceState(null, "", name === "play" ? "#" + lvl().id : name === "map" ? "#map" : location.pathname + location.search); } catch { /* ignore */ }
  window.scrollTo({ top: 0, behavior: "instant" }); header();
}
$("zbBack").addEventListener("click", () => { if (screen === "play") { renderMap(); show("map"); } else if (screen === "map") show("intro"); else location.href = "/play/index.html"; });

/* in-game navigation: section tabs */
function markNav() { document.querySelectorAll(".gnav-tab[data-go]").forEach((b) => { const k = b.dataset.go; b.setAttribute("aria-current", String(k === screen || (k === "map" && screen === "world"))); }); }
document.querySelectorAll(".gnav-tab[data-go]").forEach((b) => b.addEventListener("click", () => { const k = b.dataset.go; if (k === "continue") go(firstOpen()); else if (k === "map") { renderMap(); show("map"); } else show(k); }));
$("zbStart").addEventListener("click", () => go(firstOpen()));
$("zbToMap").addEventListener("click", () => { renderMap(); show("map"); });
function header() {
  markNav();
  const d = read(), st = readStars(); $("zbPoints").textContent = d.points; $("zbStarTotal").textContent = Object.values(st).reduce((a, b) => a + b, 0);
  $("zbStartTxt").textContent = Object.keys(d.games[GAME]?.solved || {}).length ? T("cont") : T("start");
}
function renderMap() {
  const ol = $("zbNights"); ol.textContent = ""; const st = readStars(), fo = firstOpen();
  LEVELS.forEach((l, i) => {
    const li = el("li"), ok = unlocked(l.id), b = el("button", "zb-night-n" + (isDone(l.id) ? " done" : "") + (l.id === fo ? " cur" : "") + (l.id === justUnlocked ? " is-new" : "")); b.type = "button"; b.style.setProperty("--i", i); b.disabled = !ok;
    b.setAttribute("aria-label", T("lvl", { n: l.id }) + (isDone(l.id) ? " — ★" + (st[l.id] || 1) : ok ? "" : " — " + T("locked")));
    if (ok) b.appendChild(document.createTextNode(l.id)); else b.appendChild(svg("z-lock", "lk"));
    b.addEventListener("click", () => go(l.id)); li.appendChild(b);
    const meta = el("div", "meta"); const sk = Math.ceil(l.id / 5); for (let k = 0; k < 3; k++) { const s = svg("z-skull"); s.setAttribute("class", k < sk ? "sk" : "off"); meta.appendChild(s); }
    if (isDone(l.id)) { meta.textContent = ""; for (let k = 1; k <= 3; k++) { const s = svg("z-star"); if (k > (st[l.id] || 1)) s.setAttribute("class", "off"); meta.appendChild(s); } }
    li.appendChild(meta); ol.appendChild(li);
  });
  justUnlocked = 0;
}

/* ---------- board ---------- */
let B = null;
function buildBoard() {
  const l = lvl(), board = $("zbBoard"); board.textContent = ""; board.style.setProperty("--c", SIZE);
  const taken = new Set(l.zombies.map((z) => z.y * SIZE + z.x));
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const c = el("div", "zb-c" + ((x + y) % 2 ? " alt" : "")); const k = y * SIZE + x;
    if ([0, 6, 42, 48].includes(k) && !taken.has(k)) { const kind = ["z-crate", "z-barrel", "z-tree"][(k + l.id) % 3]; const s = svg(kind, "zb-prop"); s.setAttribute("viewBox", "0 0 48 48"); c.appendChild(s); }
    board.appendChild(c);
  }
  const me = el("div", "zb-ent me"); me.appendChild(sprite("z-me")); board.appendChild(me);
  const zs = l.zombies.map((z, i) => { const e = el("div", "zb-ent z idle" + (z.slow ? " slow" : "")); e.appendChild(sprite("z-zom")); const pips = el("div", "zb-hpips"); for (let k = 0; k < z.hp; k++) pips.appendChild(el("i")); e.appendChild(pips); board.appendChild(e); return { e, pips, hp0: z.hp }; });
  const fx = el("div", "zb-fx"); board.appendChild(fx);
  const wrap = board.parentElement; wrap.classList.remove("dawn", "lost", "shake"); $("zbVig").classList.remove("hit");
  let light = wrap.querySelector(".zb-light"); if (!light) { light = el("div", "zb-light"); wrap.insertBefore(light, $("zbVig")); } light.style.setProperty("--c", SIZE);
  B = { me, zs, fx, light, face: 1, x: 3, y: 3 };
  const st0 = { x: 3, y: 3, hp: MAX_HP, ammo: Math.min(l.ammo, 4), med: l.med, zs: l.zombies.map((z) => ({ ...z })) };
  paint(st0, 0); $("zbLog").textContent = "";
}
const cell = (x, y) => ({ l: ((x + 0.5) / SIZE) * 100, t: ((y + 0.5) / SIZE) * 100 });
function paint(st, ms) {
  const l = lvl(); B.me.style.setProperty("--step", ms + "ms"); B.me.style.setProperty("--ex", st.x); B.me.style.setProperty("--ey", st.y); B.me.style.setProperty("--face", B.face); B.x = st.x; B.y = st.y;
  B.light.style.setProperty("--lx", st.x); B.light.style.setProperty("--ly", st.y);
  st.zs.forEach((z, i) => { const o = B.zs[i]; o.e.style.setProperty("--step", ms + "ms"); o.e.style.setProperty("--ex", z.x); o.e.style.setProperty("--ey", z.y); [...o.pips.children].forEach((p, k) => p.classList.toggle("off", k >= z.hp)); o.e.classList.toggle("dead", z.hp <= 0); });
  const hp = $("zbHp"); hp.textContent = ""; hp.append(el("span", "", T("hp") + " "), ...Array.from({ length: MAX_HP }, (_, k) => { const s = svg("z-heart"); if (k >= st.hp) s.setAttribute("class", "off"); return s; }));
  const am = $("zbAmmo"); am.textContent = ""; const maxA = Math.min(12, Math.max(4, l.ammo)); am.append(el("span", "", T("ammo") + " "), ...Array.from({ length: maxA }, (_, k) => { const s = svg("z-bullet"); if (k >= st.ammo) s.setAttribute("class", "off"); return s; }));
  const md = $("zbMed"); md.textContent = ""; md.append(svg("z-med"), el("span", "", "×" + st.med));
}
function fxAt(cls, x, y, rot, len) { const f = el("div", cls); const c = cell(x, y); f.style.left = c.l + "%"; f.style.top = c.t + "%"; if (len) { f.style.width = len + "%"; f.style.transform = `rotate(${rot}deg)`; } B.fx.appendChild(f); setTimeout(() => f.remove(), 1700); return f; }
function pop(text, x, y, color) { const p = fxAt("zb-pop", x, y); p.textContent = text; p.style.setProperty("--c", color); }
function animate(prev, f, ms) {
  const board = $("zbBoard"), st = f.state; let killedAt = [];
  for (const ev of f.ev) {
    if (ev.k === "shot" || ev.k === "miss" || ev.k === "click") {
      B.face = ev.z !== undefined && prev.zs[ev.z] ? (prev.zs[ev.z].x < prev.x ? -1 : 1) : B.face; B.me.classList.remove("recoil"); void B.me.offsetWidth; B.me.classList.add("recoil");
      if (ev.k === "shot") { const z = prev.zs[ev.z], a = cell(prev.x, prev.y), b = cell(z.x, z.y); const len = Math.hypot(b.l - a.l, b.t - a.t), rot = (Math.atan2(b.t - a.t, b.l - a.l) * 180) / Math.PI; fxAt("zb-bolt", prev.x, prev.y, rot, len); fxAt("zb-flash", prev.x, prev.y); pop("−1", z.x, z.y, "#ffb02e"); if (ev.kill) killedAt.push(z); }
      else pop(ev.k === "click" ? "click!" : "miss", prev.x, prev.y, "#a9b8cc");
    } else if (ev.k === "melee") { const z = prev.zs[ev.z]; B.face = z.x < prev.x ? -1 : 1; fxAt("zb-slash", z.x, z.y); pop("−1", z.x, z.y, "#fff"); if (ev.kill) killedAt.push(z); }
    else if (ev.k === "heal") pop("+2 ♥", st.x, st.y, "#34d27b"); else if (ev.k === "reload") pop("↻", st.x, st.y, "#e8c32b"); else if (ev.k === "retreat") pop("»", prev.x, prev.y, "#4aa8ff"); else if (ev.k === "nomed" || ev.k === "cornered") pop("✕", prev.x, prev.y, "#ff5a60");
  }
  killedAt.forEach((z) => fxAt("zb-splat", z.x, z.y));
  // player phase: me + resources + zombie hp/deaths (zombies keep their previous cell until their own phase)
  const mid = { ...st, zs: st.zs.map((z, i) => ({ ...z, x: prev.zs[i].x, y: prev.zs[i].y })) }; paint(mid, Math.round(ms * 0.4));
  return sleep(ms * 0.5).then(() => {
    paint(st, Math.round(ms * 0.45));
    st.zs.forEach((z, i) => { if (z.hp > 0 && (z.x !== prev.zs[i].x || z.y !== prev.zs[i].y)) { const e = B.zs[i].e; e.classList.remove("idle", "walk"); void e.offsetWidth; e.classList.add("walk"); } });
    const bites = f.ev.filter((e) => e.k === "bite");
    bites.forEach((e) => { const z = st.zs[e.z], o = B.zs[e.z].e; o.style.setProperty("--lx", (st.x - z.x) * 14 + "%"); o.style.setProperty("--ly", (st.y - z.y) * 14 + "%"); o.classList.remove("lunge"); void o.offsetWidth; o.classList.add("lunge"); });
    if (bites.length) { B.me.classList.remove("hurt"); void B.me.offsetWidth; B.me.classList.add("hurt"); $("zbVig").classList.add("hit"); setTimeout(() => $("zbVig").classList.remove("hit"), 320); const bw = board.parentElement; bw.classList.remove("shake"); void bw.offsetWidth; bw.classList.add("shake"); pop("−" + bites.length, st.x, st.y, "#ff5a60"); const h = $("zbHp"); h.classList.remove("hit"); void h.offsetWidth; h.classList.add("hit"); }
  });
}

/* ---------- rules editor ---------- */
const snap = () => JSON.stringify(rules);
function mutate(fn) { hist.push(snap()); if (hist.length > 60) hist.shift(); fn(); afterEdit(); }
function afterEdit() { if (!running) { buildBoard(); $("zbMsg").textContent = ""; $("zbMsg").dataset.k = ""; } renderRules(); }
function undo() { if (!hist.length || running) return; rules = JSON.parse(hist.pop()); afterEdit(); }
function opts(list, cur, label, cls) { const s = el("select", cls); s.setAttribute("aria-label", label); list.forEach((v) => { const o = el("option", "", T(v)); o.value = v; if (v === cur) o.selected = true; s.appendChild(o); }); return s; }
const rows = () => [...$("zbRules").children];
function dropIndex(y) { const rs = rows().filter((r) => !r.classList.contains("is-drag")); for (const r of rs) { const b = r.getBoundingClientRect(); if (y < b.top + b.height / 2) return +r.dataset.i; } return rules.length; }
function renderRules() {
  const ol = $("zbRules"); ol.textContent = ""; const l = lvl(), acts = ACTIONS.filter((x) => l.actions.includes(x));
  rules.forEach((r, i) => {
    const li = el("li", "zb-rule"); li.dataset.i = i; li.dataset.act = r.do;
    const rn = el("div", "zb-rn"); rn.setAttribute("aria-hidden", "true"); rn.dataset.nodrag = "";
    const a = opts(CONDS, r.if, T("if")), b = opts(acts, r.do, T("do"), "act");
    a.addEventListener("change", () => { hist.push(snap()); r.if = a.value; afterEdit(); }); b.addEventListener("change", () => { hist.push(snap()); r.do = b.value; li.dataset.act = r.do; afterEdit(); });
    const body = el("div", "zb-rbody"); body.append(el("span", "", T("if")), a, el("span", "", T("do")), b);
    const bt = el("div", "zb-rbtns"); const mk = (cls, txt, label, fn, dis) => { const x = el("button", "zb-rb " + cls, txt); x.type = "button"; x.setAttribute("aria-label", label); x.disabled = !!dis || running; x.addEventListener("click", fn); return x; };
    bt.append(mk("up", "↑", T("up"), () => mutate(() => { [rules[i - 1], rules[i]] = [rules[i], rules[i - 1]]; }), i === 0), mk("dn", "↓", T("down"), () => mutate(() => { [rules[i + 1], rules[i]] = [rules[i], rules[i + 1]]; }), i === rules.length - 1), mk("rm", "×", T("del"), () => mutate(() => rules.splice(i, 1))));
    li.append(rn, body, bt, el("div", "zb-chk"));
    rn.removeAttribute("data-nodrag");
    armDrag(rn, () => { if (running) return null; li.classList.add("is-drag"); const g = el("div", "zb-rule"); g.dataset.act = r.do; g.style.width = Math.min(300, li.offsetWidth) + "px"; g.append(el("div", "zb-rn"), el("div", "zb-rbody", T(r.if) + " → " + T(r.do))); let to = i;
      return { ghost: g, move: (x, y) => { to = dropIndex(y); ol.querySelectorAll(".ins").forEach((n) => n.classList.remove("ins")); ol.classList.remove("ins-end"); const t = rows().find((n) => +n.dataset.i === to && !n.classList.contains("is-drag")); if (t) t.classList.add("ins"); else ol.classList.add("ins-end"); },
        drop: (x, y) => { li.classList.remove("is-drag"); to = dropIndex(y); ol.querySelectorAll(".ins").forEach((n) => n.classList.remove("ins")); ol.classList.remove("ins-end"); if (to === i || to === i + 1) return; mutate(() => { const it = rules.splice(i, 1)[0]; rules.splice(to > i ? to - 1 : to, 0, it); }); },
        cancel: () => { li.classList.remove("is-drag"); ol.querySelectorAll(".ins").forEach((n) => n.classList.remove("ins")); ol.classList.remove("ins-end"); } }; });
    ol.appendChild(li);
  });
  $("zbAdd").disabled = rules.length >= l.maxRules || running; $("zbUndo").disabled = !hist.length || running;
  $("zbSize").textContent = T("size", { n: rules.length, m: l.maxRules, p: l.par });
}
function paintStars(host, n) { host.textContent = ""; for (let k = 1; k <= 3; k++) { const s = svg("z-star"); if (k > n) s.setAttribute("class", "off"); host.appendChild(s); } host.setAttribute("aria-label", n + "/3"); }
function go(id) {
  stopRun(); idx = id - 1; rules = [{ if: "always", do: "wait" }]; hist = []; hinted = false; lastRes = null; $("zbModal").hidden = true;
  $("zbNo").textContent = lvl().id; $("zbGoal").textContent = T("goal", { m: lvl().maxRules }); paintStars($("zbStars"), readStars()[lvl().id] || 0);
  $("zbMsg").textContent = ""; show("play"); buildBoard(); renderRules();
  SCREENS.play.style.animation = "none"; void SCREENS.play.offsetWidth; SCREENS.play.style.animation = "";
}

/* ---------- execution ---------- */
function stopRun() { token++; if (running) { running = false; $("zbRun").hidden = false; $("zbStop").hidden = true; $("zbHint").disabled = false; } }
function setRunning(on) { running = on; $("zbRun").hidden = on; $("zbStop").hidden = !on; $("zbHint").disabled = on; renderRules(); }
function markRules(f) {
  rows().forEach((li, k) => { li.classList.remove("is-fired", "is-false", "is-skip", "is-bad"); const chk = li.querySelector(".zb-chk"); chk.textContent = "";
    if (f.rule < 0) { li.classList.add("is-false"); chk.textContent = T("falsy"); }
    else if (k === f.rule) { li.classList.add("is-fired"); chk.textContent = T("fired"); }
    else if (k < f.rule) { li.classList.add("is-false"); chk.textContent = T("falsy"); } else li.classList.add("is-skip"); });
}
function feedback(kind, title, lines, retry) { const b = $("zbMsg"); b.textContent = ""; const d = el("div", "zb-fb " + kind); d.appendChild(el("b", "", title)); lines.filter(Boolean).forEach((t) => d.appendChild(el("p", "", t))); if (retry) { const r = el("button", "zb-btn", T("again")); r.type = "button"; r.addEventListener("click", () => { buildBoard(); renderRules(); b.textContent = ""; }); d.appendChild(r); } b.appendChild(d); d.scrollIntoView?.({ block: "nearest", behavior: reduced() ? "auto" : "smooth" }); }
async function play() {
  const l = lvl(), v = validate(l, rules);
  if (!v.ok) { feedback("bad", T("fTitle"), [T(v.reason === "empty" ? "empty0" : v.reason)]); return; }
  const res = run(l, rules), my = ++token; lastRes = res; buildBoard(); setRunning(true); $("zbMsg").textContent = "";
  const ms = reduced() ? 0 : Math.round(900 / speed);
  for (let i = 1; i < res.frames.length; i++) {
    if (my !== token) return; const f = res.frames[i], prev = res.frames[i - 1].state;
    markRules(f);
    $("zbLog").textContent = T("turn", { t: i }) + ": " + (f.rule >= 0 ? f.log.filter((k) => k !== "bite").map((k) => T("log." + k)).join(" · ") : T("norule")) + (f.log.includes("bite") ? " · " + T("log.bite") : "");
    if (!ms) paint(f.state, 0); else await animate(prev, f, ms); if (ms) await sleep(ms * 0.5);
    if (my !== token) return;
  }
  if (my !== token) return; rows().forEach((li) => li.classList.remove("is-fired", "is-false", "is-skip")); setRunning(false);
  const wrap = $("zbBoard").parentElement;
  if (res.ok) win(res); else { wrap.classList.add("lost"); B.me.classList.add("dead"); fail(res); }
}
function fail(res) {
  const fr = res.frames; let title = T("fTitle"), what, next, bad = -1;
  const fc = fr.findIndex((f) => f.ev?.some((e) => e.k === "click")), fb = fr.findIndex((f) => f.log.includes("bite"));
  if (fc > 0 && (fb < 0 || fc <= fb)) { what = T("fClick", { t: fc }); next = T("fClickN"); bad = fr[fc].rule; }
  else if (fb > 0) { const f = fr[fb]; what = res.reason === "dead" ? T("fDead", { t: res.turns }) + " " + T("fBite", { t: fb, r: f.rule + 1, a: T(f.action) }) : T("fBite", { t: fb, r: f.rule + 1, a: T(f.action) }); next = res.reason === "dead" ? T("fDeadN") + " " + T("fBiteN") : T("fBiteN"); bad = f.rule; }
  else { what = T("fTime"); next = T("fTimeN"); }
  if (bad >= 0) rows()[bad]?.classList.add("is-bad");
  feedback("bad", title, [what, T("fNext") + next], true);
}
function win(res) {
  const l = lvl(), s = stars(l, rules), nextWas = l.id < LEVELS.length && unlocked(l.id + 1), r = award(GAME, l.id, hinted, l.base); saveStars(l.id, s);
  paintStars($("zbStars"), readStars()[l.id]); header(); main.dataset.dawn = "1"; $("zbBoard").parentElement.classList.add("dawn"); B.me.classList.add("win"); confetti($("zbBoard").parentElement, 30, ["#ffe27a", "#ffb02e", "#b6f23a", "#fff"]);
  if (!nextWas && l.id < LEVELS.length) justUnlocked = l.id + 1;
  setTimeout(() => modal(l, s, r.earned, !nextWas && l.id < LEVELS.length), reduced() ? 0 : 1100);
}
function modal(l, s, earned, newUnlock) {
  const m = $("zbModal"); m.textContent = ""; const sh = el("div", "zb-sheet"); const last = l.id === LEVELS.length;
  sh.appendChild(el("div", "sun")); const h = el("h2", "", last ? T("all") : T("dawn")); h.id = "zbModalT"; sh.append(h, el("p", "", T("dawnSub")));
  const bs = el("div", "zb-bigstars"); bs.setAttribute("role", "img"); bs.setAttribute("aria-label", s + "/3"); for (let k = 1; k <= 3; k++) { const st = svg("z-star"); st.setAttribute("class", k <= s ? "on" : ""); st.style.setProperty("--k", k - 1); bs.appendChild(st); } sh.appendChild(bs);
  const rw = el("div", "zb-reward"), pc = el("span", "zb-chip"); if (earned) { const nb = el("b", "", "0"); pc.append(document.createTextNode("+"), nb, document.createTextNode(" " + (lang() === "en" ? "points" : "نقطة"))); countUp(nb, earned, 900); } else pc.textContent = T("ptsOld"); rw.appendChild(pc);
  if (newUnlock) rw.appendChild(el("span", "zb-chip new", T("unlocked", { n: l.id + 1 }))); sh.appendChild(rw);
  sh.appendChild(el("p", "", T("used", { n: rules.length, p: l.par }) + (s < 3 ? " — " + T("more3", { p: l.par }) : "")));
  const row = el("div", "row"); if (!last) { const nx = el("button", "zb-btn zb-btn-primary", T("next")); nx.type = "button"; nx.addEventListener("click", () => go(l.id + 1)); row.appendChild(nx); }
  const rp = el("button", "zb-btn", T("replay")); rp.type = "button"; rp.addEventListener("click", () => { m.hidden = true; main.dataset.dawn = "0"; buildBoard(); renderRules(); });
  const tr = el("button", "zb-btn", T("toMap")); tr.type = "button"; tr.addEventListener("click", () => { m.hidden = true; renderMap(); show("map"); }); row.append(rp, tr); sh.appendChild(row); m.appendChild(sh); m.hidden = false; confetti(sh, 40, ["#ffe27a", "#ffb02e", "#b6f23a", "#fff"]);
  (row.querySelector(".zb-btn-primary") || rp).focus();
  m.onkeydown = (e) => { if (e.key === "Escape") m.hidden = true; else if (e.key === "Tab") { const f = [...sh.querySelectorAll("button")], i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus(); } };
  m.onclick = (e) => { if (e.target === m) m.hidden = true; };
}

/* ---------- controls ---------- */
$("zbRun").addEventListener("click", play);
$("zbStop").addEventListener("click", () => { stopRun(); buildBoard(); renderRules(); });
$("zbUndo").addEventListener("click", undo);
$("zbAdd").addEventListener("click", () => { if (rules.length < lvl().maxRules) mutate(() => rules.push({ if: "always", do: "wait" })); });
$("zbSpeed").addEventListener("click", () => { speed = speed === 1 ? 2 : speed === 2 ? 3 : 1; $("zbSpeed").textContent = speed + "×"; });
$("zbHint").addEventListener("click", () => { hinted = true; const s = lvl().solution; feedback("good", T("fq.hint"), [T("hintT", { n: lvl().par, c: T(s[0].if), a: T(s[0].do) })]); });
document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "z" && screen === "play" && !e.target.closest("select,input")) { e.preventDefault(); undo(); } });
document.addEventListener("fayad:langchange", () => { header(); if (screen === "map") renderMap(); else if (screen === "play") go(lvl().id); else show("intro"); });
document.addEventListener("fayad:cloudsync", () => { header(); if (screen === "map") renderMap(); });

function route() {
  header(); const h = location.hash.slice(1), n = parseInt(h, 10);
  if (h === "map") { renderMap(); show("map"); } else if (n >= 1 && n <= LEVELS.length) go(unlocked(n) ? n : firstOpen()); else show("intro");
}
window.addEventListener("hashchange", route); route();
