// FAYBIT global search overlay (lazy-loaded by js/shell.js on first use). Everything is rendered with textContent / DOM nodes.
import { createSearch } from "./engine.js";

const STR = {
  ar: {
    label: "بحث في FAYBIT", placeholder: "ابحث عن درس أو مفهوم أو تمرين أو لعبة…", clear: "مسح", close: "إغلاق البحث", loading: "جارٍ تحميل فهرس البحث…",
    errTitle: "تعذّر تحميل فهرس البحث", errBody: "تحقق من اتصالك ثم حاول مرة أخرى.", retry: "إعادة المحاولة",
    recent: "عمليات البحث الأخيرة", clearRecent: "مسح السجل", popular: "ابدأ من هنا", none: "لا توجد نتائج لـ «{q}»", noneHint: "جرّب كلمة أخرى، أو اكتب بالعربية أو الإنجليزية، أو تصفّح المسارات.",
    didYou: "هل تقصد:", browse: "تصفّح كل المسارات", count: "{n} نتيجة", count1: "نتيجة واحدة", all: "الكل", more: "نتائج مقاربة",
    hint: "↑↓ للتنقل · Enter للفتح · Esc للإغلاق", open: "بحث", openTitle: "بحث (Ctrl+K)",
    type: { course: "مسار", module: "وحدة", lesson: "درس", topic: "موضوع", exercise: "تمرين", game: "لعبة", page: "صفحة" },
    groups: { course: "المسارات", module: "الوحدات", lesson: "الدروس", topic: "المواضيع", exercise: "التمارين", game: "الألعاب", page: "الصفحات" },
  },
  en: {
    label: "Search FAYBIT", placeholder: "Search lessons, concepts, exercises, games…", clear: "Clear", close: "Close search", loading: "Loading the search index…",
    errTitle: "Could not load the search index", errBody: "Check your connection and try again.", retry: "Try again",
    recent: "Recent searches", clearRecent: "Clear history", popular: "Start here", none: "No results for “{q}”", noneHint: "Try another word, search in Arabic or English, or browse the courses.",
    didYou: "Did you mean:", browse: "Browse all courses", count: "{n} results", count1: "1 result", all: "All", more: "Related results",
    hint: "↑↓ to move · Enter to open · Esc to close", open: "Search", openTitle: "Search (Ctrl+K)",
    type: { course: "Course", module: "Module", lesson: "Lesson", topic: "Topic", exercise: "Exercise", game: "Game", page: "Page" },
    groups: { course: "Courses", module: "Modules", lesson: "Lessons", topic: "Topics", exercise: "Exercises", game: "Games", page: "Pages" },
  },
};
const ORDER = ["course", "module", "lesson", "topic", "exercise", "game", "page"];
const FILTERS = [["all", null], ["course", ["course", "module"]], ["lesson", ["lesson", "topic"]], ["exercise", ["exercise"]], ["game", ["game"]], ["page", ["page"]]];
const INDEX_URL = "/search/index.json";
const RECENT_KEY = "fayad-search-recent";

let indexPromise = null, engine = null, root = null, lastFocus = null, state = { q: "", filter: "all", items: [], active: -1 };
const lang = () => (window.FAYAD?.prefs?.lang === "en" || document.documentElement.getAttribute("data-lang") === "en" ? "en" : "ar");
const S = () => STR[lang()];
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
const pick = (obj) => (obj && (obj[lang()] || obj.ar)) || "";

export function preload() {
  if (!indexPromise) indexPromise = fetch(INDEX_URL, { cache: "default" }).then((r) => { if (!r.ok) throw new Error("index " + r.status); return r.json(); })
    .then((idx) => { engine = createSearch(idx); return engine; }).catch((e) => { indexPromise = null; throw e; });
  return indexPromise;
}

// ---- recent searches (local to this browser only) --------------------------------------------------------------------
const recent = {
  get() { try { const v = JSON.parse(localStorage.getItem(RECENT_KEY)); return Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, 6) : []; } catch { return []; } },
  add(q) { q = q.trim(); if (q.length < 2) return; try { const v = [q, ...recent.get().filter((x) => x !== q)].slice(0, 6); localStorage.setItem(RECENT_KEY, JSON.stringify(v)); } catch { /* private mode */ } },
  clear() { try { localStorage.removeItem(RECENT_KEY); } catch { /* ignore */ } },
};

// ---- rendering -------------------------------------------------------------------------------------------------------
function marked(text, q) {
  const frag = document.createDocumentFragment();
  for (const run of engine ? engine.highlight(text, q) : [{ text, hit: false }]) { if (run.hit) frag.appendChild(el("mark", "sx-hit", run.text)); else frag.appendChild(document.createTextNode(run.text)); }
  return frag;
}
function build() {
  const t = S();
  root = el("div", "sx"); root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true"); root.setAttribute("aria-label", t.label);
  root.dir = document.documentElement.dir || (lang() === "en" ? "ltr" : "rtl"); root.lang = lang();
  const back = el("div", "sx-backdrop"); back.addEventListener("click", close);
  const panel = el("div", "sx-panel");
  const bar = el("form", "sx-bar"); bar.setAttribute("role", "search"); bar.addEventListener("submit", (e) => { e.preventDefault(); openActive(); });
  const ico = el("span", "sx-glass"); ico.setAttribute("aria-hidden", "true"); ico.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  const input = el("input", "sx-input"); input.type = "search"; input.autocomplete = "off"; input.autocapitalize = "off"; input.spellcheck = false; input.enterKeyHint = "search";
  input.placeholder = t.placeholder; input.setAttribute("aria-label", t.label); input.setAttribute("role", "combobox"); input.setAttribute("aria-expanded", "true"); input.setAttribute("aria-controls", "sx-list"); input.setAttribute("aria-autocomplete", "list");
  input.id = "sx-input";
  const clr = el("button", "sx-clear", "×"); clr.type = "button"; clr.hidden = true; clr.setAttribute("aria-label", t.clear); clr.addEventListener("click", () => { input.value = ""; update(""); input.focus(); });
  const cls = el("button", "sx-close"); cls.type = "button"; cls.setAttribute("aria-label", t.close); cls.innerHTML = '<span class="sx-esc">Esc</span><svg class="sx-x" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'; cls.addEventListener("click", close);
  bar.append(ico, input, clr, cls);
  const chips = el("div", "sx-chips"); chips.setAttribute("role", "group"); chips.setAttribute("aria-label", t.label);
  for (const [id] of FILTERS) { const b = el("button", "sx-chip", id === "all" ? t.all : t.groups[id === "course" ? "course" : id === "lesson" ? "lesson" : id === "exercise" ? "exercise" : id === "game" ? "game" : "page"]); b.type = "button"; b.dataset.filter = id; b.setAttribute("aria-pressed", String(id === "all")); b.addEventListener("click", () => { state.filter = id; chips.querySelectorAll(".sx-chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === id))); update(input.value); input.focus(); }); chips.appendChild(b); }
  const status = el("div", "sx-status"); status.id = "sx-status"; status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
  const body = el("div", "sx-body"); body.id = "sx-list"; body.setAttribute("role", "listbox"); body.setAttribute("aria-label", t.label);
  const foot = el("div", "sx-foot", t.hint);
  panel.append(bar, chips, status, body, foot); root.append(back, panel);
  input.addEventListener("input", () => update(input.value));
  root.addEventListener("keydown", onKey);
  document.body.appendChild(root);
  return { input, clr, body, status, chips };
}
let ui = null;

function setActive(i, scroll = true) {
  const opts = ui.body.querySelectorAll('[role="option"]'); if (!opts.length) { state.active = -1; ui.input.removeAttribute("aria-activedescendant"); return; }
  state.active = (i + opts.length) % opts.length;
  opts.forEach((o, k) => { o.classList.toggle("is-active", k === state.active); o.setAttribute("aria-selected", String(k === state.active)); });
  const cur = opts[state.active]; ui.input.setAttribute("aria-activedescendant", cur.id); if (scroll) cur.scrollIntoView({ block: "nearest" });
}
function go(url, q) { recent.add(ui.input.value || q); close(true); const here = location.pathname + location.search; const u = new URL(url, location.origin); if (u.pathname + u.search === here) { location.hash = u.hash; if (!u.hash) location.reload(); } else location.href = u.pathname + u.search + u.hash; }
function openActive() { const opts = ui.body.querySelectorAll('[role="option"]'); const o = opts[state.active >= 0 ? state.active : 0]; if (o) go(o.dataset.href, o.dataset.q); }

function row(doc, q, idx, extraCls) {
  const t = S(); const li = el("a", "sx-opt" + (extraCls ? " " + extraCls : "")); li.setAttribute("role", "option"); li.id = "sx-o-" + idx; li.href = doc.url; li.dataset.href = doc.url; li.dataset.q = q; li.dataset.type = doc.type; li.setAttribute("aria-selected", "false"); li.tabIndex = -1;
  const badge = el("span", "sx-ico"); badge.dataset.type = doc.type; badge.setAttribute("aria-hidden", "true"); badge.textContent = (doc.track || doc.type).slice(0, 3).toUpperCase();
  const main = el("span", "sx-main"); const title = el("span", "sx-title"); title.appendChild(marked(pick(doc.title), q));
  const subText = [pick(doc.parent), pick(doc.desc)].filter(Boolean).join(" · "); const sub = el("span", "sx-sub"); sub.appendChild(marked(subText.length > 140 ? subText.slice(0, 137) + "…" : subText, q));
  main.append(title, sub); const kind = el("span", "sx-kind", t.type[doc.type] || doc.type);
  li.append(badge, main, kind); li.addEventListener("mousemove", () => { const i = [...ui.body.querySelectorAll('[role="option"]')].indexOf(li); if (i !== state.active) setActive(i, false); });
  li.addEventListener("click", (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); go(doc.url, q); });
  return li;
}
function message(title, body, actions = []) { const box = el("div", "sx-msg"); box.appendChild(el("strong", "", title)); if (body) box.appendChild(el("p", "", body)); for (const a of actions) box.appendChild(a); return box; }

function renderIdle() {
  const t = S(), frag = document.createDocumentFragment(); let n = 0;
  const rec = recent.get();
  if (rec.length) {
    const sec = el("section", "sx-group"); const h = el("h3", "", t.recent); const clr = el("button", "sx-link", t.clearRecent); clr.type = "button"; clr.addEventListener("click", () => { recent.clear(); update(""); }); h.appendChild(clr); sec.appendChild(h);
    const wrap = el("div", "sx-recent"); for (const q of rec) { const b = el("button", "sx-pill", q); b.type = "button"; b.addEventListener("click", () => { ui.input.value = q; update(q); ui.input.focus({ preventScroll: true }); }); wrap.appendChild(b); } sec.appendChild(wrap); frag.appendChild(sec);
  }
  const sec = el("section", "sx-group"); sec.appendChild(el("h3", "", t.popular));
  for (const d of engine.docsOf(["course"])) sec.appendChild(row(d, "", n++));
  frag.appendChild(sec); ui.body.replaceChildren(frag); ui.status.textContent = ""; setActive(-1);
}
function renderResults(q) {
  const t = S(); const f = FILTERS.find((x) => x[0] === state.filter); const res = engine.search(q, { limit: 40, types: f[1], lang: lang() });
  state.items = res;
  if (!res.length) {
    const acts = [], sugg = engine.didYouMean(q);
    if (sugg.length) { const w = el("div", "sx-recent"); w.appendChild(el("span", "sx-muted", t.didYou)); for (const s of sugg) { const b = el("button", "sx-pill", s); b.type = "button"; b.addEventListener("click", () => { ui.input.value = s; update(s); ui.input.focus({ preventScroll: true }); }); w.appendChild(b); } acts.push(w); }
    const a = el("a", "sx-link sx-browse", t.browse); a.href = "/index.html#courses"; acts.push(a);
    ui.body.replaceChildren(message(t.none.replace("{q}", q.trim()), t.noneHint, acts)); ui.status.textContent = t.none.replace("{q}", q.trim()); setActive(-1); return;
  }
  const frag = document.createDocumentFragment(); let n = 0; const exact = res.filter((r) => !r.partial), rel = res.filter((r) => r.partial);
  const groups = new Map(); for (const r of exact) { (groups.get(r.doc.type) || groups.set(r.doc.type, []).get(r.doc.type)).push(r); }
  // keep relevance order across groups: the group of the best hit comes first
  const gOrder = [...groups.keys()].sort((a, b) => groups.get(b)[0].score - groups.get(a)[0].score || ORDER.indexOf(a) - ORDER.indexOf(b));
  for (const g of gOrder) { const sec = el("section", "sx-group"); sec.appendChild(el("h3", "", t.groups[g])); for (const r of groups.get(g).slice(0, 8)) sec.appendChild(row(r.doc, q, n++)); frag.appendChild(sec); }
  if (rel.length) { const sec = el("section", "sx-group"); sec.appendChild(el("h3", "", t.more)); for (const r of rel.slice(0, 6)) sec.appendChild(row(r.doc, q, n++, "is-related")); frag.appendChild(sec); }
  ui.body.replaceChildren(frag); ui.body.scrollTop = 0; ui.status.textContent = n === 1 ? t.count1 : t.count.replace("{n}", n); setActive(0, false);
}
let frame = 0;
function update(q) {
  state.q = q; ui.clr.hidden = !q; cancelAnimationFrame(frame);
  if (!engine) return;
  frame = requestAnimationFrame(() => { if (q.trim()) renderResults(q); else renderIdle(); });
}
function onKey(e) {
  if (e.key === "Escape") { e.preventDefault(); close(); return; }
  if (e.key === "ArrowDown") { e.preventDefault(); setActive(state.active + 1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); setActive(state.active - 1); }
  else if (e.key === "Home" && e.target === ui.input && !ui.input.value) { e.preventDefault(); setActive(0); }
  else if (e.key === "End" && e.target === ui.input && !ui.input.value) { e.preventDefault(); setActive(-1 + ui.body.querySelectorAll('[role="option"]').length); }
  else if (e.key === "Tab") { const f = [...root.querySelectorAll("input, button:not([hidden])")].filter((n) => n.offsetParent !== null); if (!f.length) return; const first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
}

export async function open(opts = {}) {
  if (root) return;
  lastFocus = document.activeElement; ui = build(); document.body.classList.add("sx-lock"); state = { q: "", filter: "all", items: [], active: -1 };
  ui.input.value = opts.query || ""; ui.clr.hidden = !ui.input.value; ui.input.focus({ preventScroll: true });
  requestAnimationFrame(() => root && root.classList.add("on"));
  const t = S();
  if (!engine) {
    ui.body.replaceChildren(message(t.loading, "")); ui.body.firstChild.classList.add("sx-loading"); ui.status.textContent = t.loading;
    try { await preload(); } catch {
      if (!root) return; const retry = el("button", "sx-link", t.retry); retry.type = "button"; retry.addEventListener("click", () => { close(true); open(opts); });
      ui.body.replaceChildren(message(t.errTitle, t.errBody, [retry])); ui.status.textContent = t.errTitle; return;
    }
    if (!root) return;
  }
  update(ui.input.value);
}
export function close(keepFocus) {
  if (!root) return; cancelAnimationFrame(frame); root.remove(); root = null; ui = null; document.body.classList.remove("sx-lock");
  if (!keepFocus && lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch { /* element gone */ }
}
export const isOpen = () => !!root;
window.addEventListener("fayad:langchange", () => { if (root) { const q = ui.input.value; close(true); open({ query: q }); } });
