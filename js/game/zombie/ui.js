/* Zombie Survival — rule-list editor and replay. Rules are plain data interpreted by the pure engine; nothing from the player is evaluated or injected as HTML. */
import { read, award } from "/js/game/store.js";
import { LEVELS } from "./levels.js";
import { run, validate, stars, CONDS, ACTIONS, SIZE, MAX_HP } from "./engine.js";

const F = window.FAYAD, $ = (id) => document.getElementById(id), GAME = "zombie", STAR_KEY = "fayad-zb-stars";
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.points": "نقاط اللعبة", "fq.hint": "تلميح", "fq.next": "المرحلة التالية", "adv.run": "تشغيل", "adv.stop": "إيقاف",
    "zb.sub": "اكتب قواعد «إذا… فافعل…» يتبعها الناجي كل دور. أول قاعدة تتحقق هي التي تُنفَّذ، فرتّبها جيدًا.", "zb.level": "المرحلة", "zb.add": "+ قاعدة",
    "zb.note": "النقاط تُسجَّل على الخادم عند النجاة لأول مرة، والنجوم تعتمد على قلة القواعد. استخدام التلميح يلغي نقاط الخمس الإضافية.",
    if: "إذا", do: "فافعل", adjacent: "زومبي ملاصق", inLine: "زومبي في خط الرمي", ammoEmpty: "الذخيرة فارغة", hpLow: "الصحة منخفضة", far: "الزومبي بعيد", always: "دائمًا",
    melee: "اضرب بالسلاح الأبيض", shoot: "أطلق النار", reload: "أعد التعبئة", retreat: "تراجع", heal: "استخدم حقيبة إسعاف", wait: "انتظر",
    up: "أعلى", down: "أسفل", del: "حذف", hp: "الصحة", ammo: "الذخيرة", med: "الإسعاف", goal: "اقضِ على كل الزومبي وأنت حي. القواعد المتاحة: حتى {m}.", size: "القواعد: {n} / {m} · للنجوم الثلاث: {p} أو أقل",
    ok: "نجا! +{p} نقطة، {s} نجوم.", again: "حُلّت من قبل ({s} نجوم).", dead: "مات الناجي. غيّر ترتيب القواعد أو أضف قاعدة.", timeout: "انتهى الوقت والزومبي ما زالوا أحياء.", empty: "أضف قاعدة واحدة على الأقل.", budget: "عدد القواعد أكبر من المسموح.", "locked-action": "هذا الإجراء غير متاح في هذه المرحلة.", "bad-rule": "قاعدة غير صالحة.",
    hint: "يمكن حلها بـ {n} قواعد. ابدأ بقاعدة «{c} ← {a}».", turn: "الدور {t}", lvl: "المرحلة {n}", locked: "مقفل: أنهِ المرحلة السابقة",
    "log.bite": "عضّة!", "log.melee-kill": "قتلتَ زومبي", "log.melee": "ضربة", "log.whiff": "ضربة في الهواء", "log.shot-kill": "رصاصة قاتلة", "log.shot": "أصبتَه", "log.miss": "أخطأت", "log.click": "لا ذخيرة!", "log.reload": "أعدتَ التعبئة", "log.heal": "عالجتَ نفسك", "log.nomed": "لا توجد حقائب إسعاف", "log.retreat": "تراجعتَ", "log.cornered": "محاصر", "log.wait": "انتظرت" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.points": "Game points", "fq.hint": "Hint", "fq.next": "Next level", "adv.run": "Run", "adv.stop": "Stop",
    "zb.sub": "Write “if… then…” rules the survivor follows every turn. The first rule that holds is the one that runs, so order matters.", "zb.level": "Level", "zb.add": "+ Rule",
    "zb.note": "Points are recorded by the server the first time you survive a level; stars depend on using few rules. Using the hint removes the 5 bonus points.",
    if: "if", do: "then", adjacent: "a zombie is adjacent", inLine: "a zombie is in the firing line", ammoEmpty: "ammo is empty", hpLow: "health is low", far: "zombies are far", always: "always",
    melee: "melee attack", shoot: "shoot", reload: "reload", retreat: "retreat", heal: "use a medkit", wait: "wait",
    up: "Up", down: "Down", del: "Delete", hp: "Health", ammo: "Ammo", med: "Medkits", goal: "Defeat every zombie and stay alive. Up to {m} rules.", size: "Rules: {n} / {m} · three stars: {p} or fewer",
    ok: "Survived! +{p} points, {s} stars.", again: "Already solved ({s} stars).", dead: "The survivor died. Reorder the rules or add one.", timeout: "Time ran out with zombies still alive.", empty: "Add at least one rule.", budget: "Too many rules.", "locked-action": "That action is not available on this level.", "bad-rule": "Invalid rule.",
    hint: "It can be solved with {n} rules. Start with the rule “{c} → {a}”.", turn: "Turn {t}", lvl: "Level {n}", locked: "Locked: finish the previous level",
    "log.bite": "Bitten!", "log.melee-kill": "Zombie down", "log.melee": "Hit", "log.whiff": "Swung at nothing", "log.shot-kill": "Killing shot", "log.shot": "Hit it", "log.miss": "Missed", "log.click": "Out of ammo!", "log.reload": "Reloaded", "log.heal": "Healed", "log.nomed": "No medkits", "log.retreat": "Retreated", "log.cornered": "Cornered", "log.wait": "Waited" },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const readStars = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (lv, s) => { const d = readStars(); if (!d[lv] || d[lv] < s) { d[lv] = s; try { localStorage.setItem(STAR_KEY, JSON.stringify(d)); } catch { /* blocked */ } } };
const isDone = (n) => !!read().games[GAME]?.solved[n];
const unlocked = (n) => n === 1 || isDone(n - 1) || isDone(n);
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

let idx = 0, rules = [], hinted = false, timer = 0, running = false;
const lvl = () => LEVELS[idx];

function board(state) {
  const b = $("zbBoard"); b.textContent = ""; b.style.setProperty("--c", SIZE);
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const c = document.createElement("div"); c.className = "zb-c";
    if (state.x === x && state.y === y) { c.classList.add("is-me"); c.textContent = state.hp > 0 ? "●" : "✝"; }
    const z = state.zs.find((q) => q.hp > 0 && q.x === x && q.y === y);
    if (z) { c.classList.add("is-z"); if (z.slow) c.classList.add("is-slow"); c.textContent = z.hp; }
    b.appendChild(c);
  }
  $("zbHp").textContent = T("hp") + ": " + "♥".repeat(Math.max(0, state.hp)) + "♡".repeat(Math.max(0, MAX_HP - state.hp));
  $("zbAmmo").textContent = T("ammo") + ": " + state.ammo; $("zbMed").textContent = T("med") + ": " + state.med;
}
function opts(list, cur, label) {
  const s = document.createElement("select"); s.setAttribute("aria-label", label);
  list.forEach((v) => { const o = document.createElement("option"); o.value = v; o.textContent = T(v); if (v === cur) o.selected = true; s.appendChild(o); });
  return s;
}
function renderRules() {
  const ol = $("zbRules"); ol.textContent = ""; const l = lvl();
  rules.forEach((r, i) => {
    const li = document.createElement("li"); li.className = "zb-rule"; li.dataset.i = i;
    const a = opts(CONDS, r.if, T("if")), b = opts(ACTIONS.filter((x) => l.actions.includes(x)), r.do, T("do"));
    a.addEventListener("change", () => { r.if = a.value; }); b.addEventListener("change", () => { r.do = b.value; });
    const mkb = (cls, txt, label, fn, dis) => { const x = document.createElement("button"); x.type = "button"; x.className = "zb-b " + cls; x.textContent = txt; x.setAttribute("aria-label", label); x.disabled = !!dis || running; x.addEventListener("click", fn); return x; };
    const lab1 = document.createElement("span"); lab1.textContent = T("if"); const lab2 = document.createElement("span"); lab2.textContent = T("do");
    li.append(lab1, a, lab2, b,
      mkb("up", "↑", T("up"), () => { [rules[i - 1], rules[i]] = [rules[i], rules[i - 1]]; renderRules(); }, i === 0),
      mkb("dn", "↓", T("down"), () => { [rules[i + 1], rules[i]] = [rules[i], rules[i + 1]]; renderRules(); }, i === rules.length - 1),
      mkb("rm", "×", T("del"), () => { rules.splice(i, 1); renderRules(); }));
    ol.appendChild(li);
  });
  $("zbAdd").disabled = rules.length >= l.maxRules || running;
  $("zbSize").textContent = T("size", { n: rules.length, m: l.maxRules, p: l.par });
}
function header() {
  const l = lvl(), d = read();
  $("zbNo").textContent = l.id; $("zbPoints").textContent = d.points;
  const s = readStars()[l.id] || 0; $("zbStars").textContent = "★".repeat(s) + "☆".repeat(3 - s);
  $("zbGoal").textContent = T("goal", { m: l.maxRules });
  const box = $("zbLevels"); box.textContent = ""; const st = readStars();
  LEVELS.forEach((x) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "fq-dot" + (x.id === l.id ? " is-cur" : "") + (isDone(x.id) ? " is-done" : "");
    b.textContent = x.id; b.setAttribute("role", "listitem"); const ok = unlocked(x.id); b.disabled = !ok;
    b.setAttribute("aria-label", T("lvl", { n: x.id }) + (isDone(x.id) ? " — " + "★".repeat(st[x.id] || 1) : ok ? "" : " — " + T("locked")));
    b.addEventListener("click", () => go(x.id)); box.appendChild(b);
  });
}
function start() { const l = lvl(); board({ x: 3, y: 3, hp: MAX_HP, ammo: Math.min(l.ammo, 4), med: l.med, zs: l.zombies }); }
function go(id) {
  stop(); idx = id - 1; rules = [{ if: "always", do: "wait" }]; hinted = false;
  $("zbMsg").textContent = ""; $("zbLog").textContent = ""; $("zbNext").hidden = true;
  start(); header(); renderRules();
  try { history.replaceState(null, "", "#" + id); } catch { /* ignore */ }
}
function stop() { clearTimeout(timer); timer = 0; running = false; $("zbRun").hidden = false; $("zbStop").hidden = true; }
function finish(res) {
  const l = lvl(); stop(); renderRules();
  if (!res.ok) { $("zbMsg").textContent = T(res.reason); return; }
  const s = stars(l, rules), r = award(GAME, l.id, hinted, l.base); saveStars(l.id, s);
  $("zbMsg").textContent = r.earned ? T("ok", { p: r.earned, s }) : T("again", { s: readStars()[l.id] || s });
  $("zbNext").hidden = l.id >= LEVELS.length; header();
}
function play() {
  const l = lvl(), v = validate(l, rules);
  if (!v.ok) { $("zbMsg").textContent = T(v.reason); return; }
  const res = run(l, rules); running = true; $("zbRun").hidden = true; $("zbStop").hidden = false; $("zbMsg").textContent = ""; renderRules();
  const show = (i) => { const f = res.frames[i]; board(f.state); $("zbLog").textContent = i ? T("turn", { t: i }) + ": " + f.log.map((k) => T("log." + k)).join(" · ") : ""; };
  document.querySelectorAll(".zb-rule").forEach((e) => e.classList.remove("is-run"));
  if (reduced()) { show(res.frames.length - 1); return finish(res); }
  let i = 0;
  const tick = () => {
    show(i);
    document.querySelectorAll(".zb-rule").forEach((e, k) => e.classList.toggle("is-run", k === res.frames[i].rule));
    if (++i < res.frames.length) timer = setTimeout(tick, 480); else timer = setTimeout(() => finish(res), 400);
  };
  tick();
}
$("zbRun").addEventListener("click", play);
$("zbStop").addEventListener("click", () => { stop(); start(); renderRules(); $("zbLog").textContent = ""; });
$("zbAdd").addEventListener("click", () => { if (rules.length < lvl().maxRules) { rules.push({ if: "always", do: "wait" }); renderRules(); } });
$("zbNext").addEventListener("click", () => { if (idx < LEVELS.length - 1) go(idx + 2); });
$("zbHint").addEventListener("click", () => { hinted = true; const s = lvl().solution; $("zbMsg").textContent = T("hint", { n: lvl().par, c: T(s[0].if), a: T(s[0].do) }); });
document.addEventListener("fayad:langchange", () => { header(); renderRules(); });
document.addEventListener("fayad:cloudsync", () => header());

const want = parseInt(location.hash.slice(1), 10) || 0;
const firstOpen = (() => { for (let n = 1; n <= LEVELS.length; n++) if (!isDone(n)) return n; return LEVELS.length; })();
go(want >= 1 && want <= LEVELS.length && unlocked(want) ? want : firstOpen);
