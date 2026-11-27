/*
  FAYAD preferences bootstrap — MUST load synchronously in <head>, before any stylesheet paints.
  Resolves theme + language + course accent and sets them on <html> so there is no flash of the
  wrong theme/direction. Keep this file tiny and dependency-free.

  Storage keys:
    fayad-prefs-v1  JSON {themeMode,accent,fontScale,contrast,motion,reading,sections,explainLang,editorSize,editorTheme,updatedAt}
    fayad-theme     "light" | "dark"      (legacy mirror of themeMode; kept so older pages/tests keep working)
    fayad-language  "ar" | "en"           (absent = Arabic, the platform's primary language)
  ("fayad-language" is the key the Angular track already used, so existing choices are preserved.)
*/
(function () {
  var root = document.documentElement;

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable (private mode / blocked): preference lasts for this page only */
    }
  }

  function trackFromPath(path) {
    var map = [
      ["html-learning", "html"],
      ["css-learning", "css"],
      ["advanced-javascript", "ajs"],
      ["javascript-learning", "js"],
      ["bootstrap-learning", "bs"],
      ["tailwind-learning", "tw"],
      ["react-learning", "react"],
      ["vue-learning", "vue"],
      ["angular-learning", "angular"],
      ["computer-basics", "com"],
      ["programming-basics", "prg"],
      ["/about/", "about"],
      ["login", "login"],
    ];
    for (var i = 0; i < map.length; i++) {
      if (path.indexOf(map[i][0]) !== -1) return map[i][1];
    }
    return "home";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f4f8f9" : "#07121c");
  }

  function applyLang(lang) {
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("data-lang", lang);
    /* Markup is authored in Arabic and translated by i18n.js on DOMContentLoaded. For other languages hide the page body until the first translation pass (
       DCL, well under a second) so users never see a flash of Arabic or the layout jump of the swap; i18n.js clears the flag, a timer is the fallback. */
    if (lang !== "ar" && document.readyState === "loading" && !root.hasAttribute("data-i18n-pending")) {
      root.setAttribute("data-i18n-pending", "");
      var st = document.createElement("style"); st.id = "i18n-pending-css"; st.textContent = "html[data-i18n-pending] body{opacity:0}";
      (document.head || root).appendChild(st);
      setTimeout(function () { root.removeAttribute("data-i18n-pending"); }, 2500);
    }
  }

  /* ---- unified preference store: one JSON object (key fayad-prefs-v1) + legacy keys kept in step ---- */
  var KEY = "fayad-prefs-v1";
  var DEFAULTS = {
    themeMode: "dark", accent: "teal", fontScale: 100, contrast: "normal", motion: "system",
    reading: "comfortable", sections: "expanded", explainLang: "auto", editorSize: 14, editorTheme: "dark",
  };
  var ENUMS = {
    themeMode: ["light", "dark", "system"],
    accent: ["teal", "blue", "violet", "rose", "amber", "slate"],
    contrast: ["normal", "high"],
    motion: ["system", "reduce", "full"],
    reading: ["comfortable", "compact"],
    sections: ["expanded", "collapsed"],
    explainLang: ["auto", "ar", "en"],
    editorTheme: ["dark", "light"],
  };
  var RANGES = { fontScale: [90, 130], editorSize: [11, 22] };

  function clean(src) {
    var out = {}, k;
    src = src && typeof src === "object" ? src : {};
    for (k in DEFAULTS) {
      var v = src[k];
      if (ENUMS[k]) out[k] = ENUMS[k].indexOf(v) !== -1 ? v : DEFAULTS[k];
      else {
        v = Math.round(Number(v));
        out[k] = isFinite(v) && v >= RANGES[k][0] && v <= RANGES[k][1] ? v : DEFAULTS[k];
      }
    }
    out.updatedAt = Number(src.updatedAt) > 0 ? Number(src.updatedAt) : 0;
    return out;
  }

  var state;
  try {
    state = clean(JSON.parse(read(KEY) || "null"));
  } catch (e) {
    state = clean(null);
  }
  var storedTheme = read("fayad-theme"); // legacy toggle: honour it when no unified record exists yet
  if (!read(KEY) && (storedTheme === "light" || storedTheme === "dark")) state.themeMode = storedTheme;
  var storedLang = read("fayad-language");
  var lang = storedLang === "en" ? "en" : "ar";

  var mqDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var mqMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

  var view = null; // transient, non-persisted preview (settings pages); null = show the saved state
  function V() {
    return view || state;
  }
  function resolvedTheme() {
    if (V().themeMode === "system") return mqDark && mqDark.matches ? "dark" : "light";
    return V().themeMode;
  }
  function reducedMotion() {
    return V().motion === "reduce" || (V().motion === "system" && !!(mqMotion && mqMotion.matches));
  }
  function applyAll() {
    var theme = resolvedTheme();
    if (root.getAttribute("data-theme") !== theme) applyTheme(theme);
    root.setAttribute("data-accent", V().accent);
    root.setAttribute("data-contrast", V().contrast);
    root.setAttribute("data-motion", reducedMotion() ? "reduce" : "full");
    root.setAttribute("data-reading", V().reading);
    root.setAttribute("data-sections", V().sections);
    root.setAttribute("data-editor-theme", V().editorTheme);
    root.style.setProperty("--fy-scale", String(V().fontScale / 100));
    root.style.setProperty("--fy-editor-size", V().editorSize + "px");
  }

  root.setAttribute("data-track", trackFromPath(location.pathname));
  applyLang(lang);
  applyAll();

  function persist() {
    write(KEY, JSON.stringify(state));
    if (state.themeMode !== "system") write("fayad-theme", state.themeMode);
  }
  function emit(changed) {
    window.dispatchEvent(new CustomEvent("fayad:prefschange", { detail: { prefs: snapshot(), changed: changed || [] } }));
  }
  function snapshot() {
    var o = {};
    for (var k in DEFAULTS) o[k] = state[k];
    o.updatedAt = state.updatedAt;
    return o;
  }
  // set(patch, opts): validates, persists, applies. opts.remote = true keeps the remote timestamp (no re-upload).
  function set(patch, opts) {
    opts = opts || {};
    var next = clean(Object.assign({}, state, patch));
    var changed = [];
    for (var k in DEFAULTS) if (next[k] !== state[k]) changed.push(k);
    next.updatedAt = opts.remote && patch && patch.updatedAt ? Number(patch.updatedAt) : changed.length || opts.touch ? Date.now() : state.updatedAt;
    var prevTheme = root.getAttribute("data-theme");
    view = null;
    state = next;
    persist();
    applyAll();
    var t = root.getAttribute("data-theme");
    if (t !== prevTheme) window.dispatchEvent(new CustomEvent("fayad:themechange", { detail: { theme: t } }));
    if (changed.length) emit(changed);
    return changed;
  }

  var P = (window.FAYAD = window.FAYAD || {}).prefs = {
    get theme() {
      return root.getAttribute("data-theme");
    },
    get lang() {
      return root.getAttribute("data-lang");
    },
    get all() {
      return snapshot();
    },
    defaults: Object.assign({}, DEFAULTS),
    enums: ENUMS,
    ranges: RANGES,
    get reducedMotion() {
      return reducedMotion();
    },
    set: set,
    // Show a draft without saving it (live preview). preview(null) / discard() returns to the saved state.
    preview: function (patch) {
      var t0 = root.getAttribute("data-theme");
      view = patch ? clean(Object.assign({}, state, patch)) : null;
      applyAll();
      if (root.getAttribute("data-theme") !== t0)
        window.dispatchEvent(new CustomEvent("fayad:themechange", { detail: { theme: root.getAttribute("data-theme") } }));
      return view ? Object.assign({}, view) : null;
    },
    reset: function () {
      return set(Object.assign({}, DEFAULTS), { touch: true });
    },
    // Replace local state with a remote copy (cloud sync); never re-uploads.
    applyRemote: function (data, updatedAt) {
      return set(Object.assign({}, data, { updatedAt: updatedAt }), { remote: true });
    },
    setTheme: function (next) {
      if (next !== "light" && next !== "dark" && next !== "system") return;
      set({ themeMode: next });
    },
    setLang: function (next, remoteTs) {
      if (next !== "ar" && next !== "en") return;
      if (next === root.getAttribute("data-lang") && !remoteTs) return;
      state.updatedAt = remoteTs ? Number(remoteTs) : Date.now();
      persist();
      write("fayad-language", next);
      applyLang(next);
      window.dispatchEvent(new CustomEvent("fayad:langchange", { detail: { lang: next } }));
      emit(["lang"]);
    },
  };

  window.addEventListener("storage", function (event) {
    if (event.key === KEY && event.newValue) {
      try {
        var next = clean(JSON.parse(event.newValue));
        var t0 = root.getAttribute("data-theme");
        state = next;
        applyAll();
        if (root.getAttribute("data-theme") !== t0)
          window.dispatchEvent(new CustomEvent("fayad:themechange", { detail: { theme: root.getAttribute("data-theme") } }));
        emit(["sync"]);
      } catch (e) {}
    }
    if (event.key === "fayad-language" && (event.newValue === "ar" || event.newValue === "en")) {
      applyLang(event.newValue);
      window.dispatchEvent(new CustomEvent("fayad:langchange", { detail: { lang: event.newValue } }));
    }
  });
  function onSys() {
    if (state.themeMode === "system" || state.motion === "system") {
      var t0 = root.getAttribute("data-theme");
      applyAll();
      if (root.getAttribute("data-theme") !== t0)
        window.dispatchEvent(new CustomEvent("fayad:themechange", { detail: { theme: root.getAttribute("data-theme") } }));
    }
  }
  [mqDark, mqMotion].forEach(function (m) {
    if (m && m.addEventListener) m.addEventListener("change", onSys);
  });
})();

/* ===== FAYBIT boot loader =====
   First page of a visit only (sessionStorage). Cinematic but honest: the ring + percentage follow REAL readiness
   (DOM parsed -> fonts -> window load -> two painted frames); it can never block forever (hard cap 5s, any error removes it).
   Sound: a short synthesized chime (Web Audio, no file) when loading completes. Browsers only allow audio after a user gesture,
   so it plays when the browser permits it (or after the visitor's first tap/key during loading); the speaker button mutes it
   (kept in localStorage "fayad-boot-sound"). Skipped for automation (navigator.webdriver) unless ?loader=1, and for bfcache restores. */
(function () {
  try {
    var d = document, root = d.documentElement, ss = window.sessionStorage;
    var force = /[?&]loader=1\b/.test(location.search);
    if (!force && (navigator.webdriver || ss.getItem("fayad-boot") === "1")) return;
    var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    if (!force && nav && nav.type === "back_forward") return;
    ss.setItem("fayad-boot", "1");
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ar = (root.getAttribute("lang") || "ar") === "ar";
    var E = "cubic-bezier(.2,.8,.2,1)";
    var css =
      '#fy-boot{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;overflow:hidden;color:#e6fffb;font-family:system-ui,sans-serif;background:#050f0e;clip-path:circle(150% at 50% 44%);transition:clip-path 1s cubic-bezier(.7,0,.2,1)}' +
      'html[data-theme=light] #fy-boot{background:#e4eeec;color:#0b3b38}' +
      '#fy-boot.is-out{clip-path:circle(0 at 50% 44%);pointer-events:none}' +
      '#fy-boot .b-bg{position:absolute;inset:-20%;background:radial-gradient(45% 40% at 50% 44%,rgba(20,184,166,.28),transparent 70%),radial-gradient(35% 35% at 20% 80%,rgba(45,212,191,.12),transparent 70%),radial-gradient(30% 30% at 85% 15%,rgba(15,118,110,.2),transparent 70%);animation:fyb-drift 9s ease-in-out infinite alternate}' +
      'html[data-theme=light] #fy-boot .b-bg{background:radial-gradient(45% 40% at 50% 44%,rgba(255,255,255,.95),transparent 70%),radial-gradient(35% 35% at 20% 80%,rgba(20,184,166,.16),transparent 70%),radial-gradient(30% 30% at 85% 15%,rgba(15,118,110,.14),transparent 70%)}' +
      '#fy-boot .b-grid{position:absolute;inset:0;opacity:.5;background-image:linear-gradient(rgba(94,234,212,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(94,234,212,.06) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(circle at 50% 44%,#000 0,transparent 62%);mask-image:radial-gradient(circle at 50% 44%,#000 0,transparent 62%);animation:fyb-fade-in 1.2s ease both}' +
      'html[data-theme=light] #fy-boot .b-grid{background-image:linear-gradient(rgba(15,118,110,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(15,118,110,.08) 1px,transparent 1px)}' +
      '#fy-boot .b-px{position:absolute;inset:0;pointer-events:none}#fy-boot .b-px i{position:absolute;width:6px;height:6px;border-radius:1px;background:#2dd4bf;opacity:0;animation:fyb-float var(--d,6s) linear var(--w,0s) infinite}' +
      '#fy-boot .b-wrap{position:relative;display:grid;justify-items:center;gap:22px;direction:ltr;transition:transform .5s ' + E + ',opacity .45s ease}' +
      '#fy-boot.is-out .b-wrap{transform:scale(.9);opacity:0}' +
      '#fy-boot .b-ring{position:relative;width:148px;height:148px;animation:fyb-ring-in .9s ' + E + ' both}' +
      '#fy-boot .b-ring>svg:first-child{display:block;width:100%;height:100%;overflow:visible}' +
      '#fy-boot .b-track{fill:none;stroke:currentColor;stroke-opacity:.1;stroke-width:2.5}' +
      '#fy-boot .b-prog{fill:none;stroke:url(#fyb-g);stroke-width:3.5;stroke-linecap:round;transform:rotate(-90deg);transform-origin:74px 74px;stroke-dasharray:408;stroke-dashoffset:408;filter:drop-shadow(0 0 7px rgba(20,184,166,.65))}' +
      '#fy-boot .b-head{position:absolute;inset:0;transform:rotate(var(--r,0deg))}#fy-boot .b-head::after{content:"";position:absolute;top:-1px;left:50%;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;background:#99f6e4;box-shadow:0 0 14px 3px rgba(45,212,191,.8);opacity:var(--ho,1);transition:opacity .3s}' +
      '#fy-boot .b-shock{position:absolute;inset:0;border-radius:50%;border:2px solid #2dd4bf;opacity:0}' +
      '#fy-boot.is-done .b-shock{animation:fyb-shock 1s ease-out}' +
      '#fy-boot .b-mark{position:absolute;left:calc(50% - 36px);top:calc(50% - 36px);width:72px;height:72px;display:block;overflow:visible;filter:drop-shadow(0 6px 18px rgba(20,184,166,.35))}' +
      '#fy-boot .b-mark .m{opacity:0;transform-box:fill-box;transform-origin:center;animation:fyb-pop .85s cubic-bezier(.2,1.2,.3,1) forwards}' +
      '#fy-boot .b-mark .p1{animation-delay:.25s;--fx:-26px;--fy:-6px}#fy-boot .b-mark .p2{animation-delay:.5s;--fx:-10px;--fy:26px}#fy-boot .b-mark .p3{animation-delay:.85s;--fx:-30px;--fy:0px}' +
      '#fy-boot .b-mark .q1{animation-delay:1s;--fx:-40px;--fy:0}#fy-boot .b-mark .q2{animation-delay:1.1s;--fx:-40px;--fy:0}#fy-boot .b-mark .q3{animation-delay:1.2s;--fx:-40px;--fy:0}' +
      '#fy-boot.is-done .b-mark{animation:fyb-pulse .7s ease}' +
      '#fy-boot .b-word{position:relative;display:flex;gap:.14em;font:800 1.9rem/1 system-ui,sans-serif;letter-spacing:.18em;text-indent:.18em;overflow:hidden;padding:4px 2px}' +
      '#fy-boot .b-word i{font-style:normal;opacity:0;transform:translateY(60%) scale(.8);filter:blur(8px);animation:fyb-let .7s ' + E + ' forwards}' +
      '#fy-boot .b-word::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.75) 50%,transparent 65%);transform:translateX(-120%);animation:fyb-shine 1.1s ease 2s forwards;mix-blend-mode:overlay}' +
      '#fy-boot .b-meta{display:grid;justify-items:center;gap:10px;margin-top:-4px}' +
      '#fy-boot .b-sub{margin:0;font:600 .72rem/1 system-ui,sans-serif;letter-spacing:.32em;text-indent:.32em;color:#5eead4;opacity:0;animation:fyb-fade .8s 1.5s ease forwards}html[data-theme=light] #fy-boot .b-sub{color:#0f766e}' +
      '#fy-boot .b-pct{font:600 .74rem/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em;opacity:.7;font-variant-numeric:tabular-nums;min-width:4ch;text-align:center}' +
      '#fy-boot .b-snd{position:absolute;bottom:max(22px,env(safe-area-inset-bottom));inset-inline-end:22px;width:42px;height:42px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(94,234,212,.28);background:rgba(94,234,212,.06);color:inherit;cursor:pointer;opacity:0;animation:fyb-fade-in .6s 1.2s ease forwards;transition:background-color .2s,border-color .2s,transform .2s}' +
      '#fy-boot .b-snd:hover{background:rgba(94,234,212,.16);border-color:#2dd4bf}#fy-boot .b-snd:active{transform:scale(.9)}#fy-boot .b-snd:focus-visible{outline:2px solid #5eead4;outline-offset:3px}' +
      '#fy-boot .b-snd svg{width:20px;height:20px}#fy-boot .b-snd .off{display:none}#fy-boot .b-snd[aria-pressed=false] .on{display:none}#fy-boot .b-snd[aria-pressed=false] .off{display:block}' +
      '@keyframes fyb-pop{from{opacity:0;transform:translate(var(--fx,0),var(--fy,0)) scale(.5)}to{opacity:1;transform:none}}' +
      '@keyframes fyb-let{to{opacity:1;transform:none;filter:none}}@keyframes fyb-fade{to{opacity:.9}}@keyframes fyb-fade-in{from{opacity:0}to{opacity:1}}' +
      '@keyframes fyb-ring-in{from{opacity:0;transform:scale(.7) rotate(-40deg)}to{opacity:1;transform:none}}@keyframes fyb-pulse{40%{transform:scale(1.1)}}' +
      '@keyframes fyb-shock{from{opacity:.75;transform:scale(1)}to{opacity:0;transform:scale(1.9)}}@keyframes fyb-shine{to{transform:translateX(120%)}}' +
      '@keyframes fyb-drift{from{transform:translate3d(-2%,-1%,0) scale(1)}to{transform:translate3d(2%,2%,0) scale(1.08)}}' +
      '@keyframes fyb-float{0%{opacity:0;transform:translateY(20px)}15%{opacity:.5}80%{opacity:.18}100%{opacity:0;transform:translateY(-90px)}}' +
      '@media (max-width:420px){#fy-boot .b-word{font-size:1.6rem}#fy-boot .b-ring{width:128px;height:128px}#fy-boot .b-mark{left:calc(50% - 32px);top:calc(50% - 32px);width:64px;height:64px}}' +
      '@media (prefers-reduced-motion:reduce){#fy-boot,#fy-boot *{animation-duration:.01ms!important;animation-delay:0s!important;animation-iteration-count:1!important;transition-duration:.25s!important}#fy-boot.is-out{clip-path:none;opacity:0;visibility:hidden}}';
    var st = d.createElement("style"); st.id = "fy-boot-css"; st.textContent = css; (d.head || root).appendChild(st);
    root.classList.add("fy-booting");
    var el = d.createElement("div"); el.id = "fy-boot"; el.setAttribute("role", "progressbar"); el.setAttribute("aria-label", "FAYBIT"); el.setAttribute("aria-valuemin", "0"); el.setAttribute("aria-valuemax", "100"); el.setAttribute("aria-valuenow", "0");
    var word = "FAYBIT".split("").map(function (c, i) { return '<i style="animation-delay:' + (0.9 + i * 0.1).toFixed(2) + 's">' + c + "</i>"; }).join("");
    var px = ""; for (var k = 0; k < 14; k++) px += '<i style="left:' + (6 + k * 6.7) + '%;top:' + (55 + (k * 37) % 40) + '%;--d:' + (5 + (k * 13) % 5) + 's;--w:' + ((k * 0.43) % 4).toFixed(2) + 's;width:' + (4 + k % 3 * 2) + 'px;height:' + (4 + k % 3 * 2) + 'px"></i>';
    var muted = false; try { muted = window.localStorage.getItem("fayad-boot-sound") === "off"; } catch (e) {}
    el.innerHTML = '<div class="b-bg"></div><div class="b-grid"></div><div class="b-px" aria-hidden="true">' + px + '</div>' +
      '<div class="b-wrap"><div class="b-ring"><svg viewBox="0 0 148 148" aria-hidden="true"><defs><linearGradient id="fyb-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2dd4bf"/><stop offset="1" stop-color="#0d9488"/></linearGradient></defs><circle class="b-track" cx="74" cy="74" r="65"/><circle class="b-prog" cx="74" cy="74" r="65"/></svg><div class="b-head"></div><div class="b-shock"></div>' +
      '<svg class="b-mark" viewBox="0 0 100 100" aria-hidden="true"><path class="m p1" fill="#0d9488" d="M18 22Q18 8 33 8H78L68 24Q66 27 62 27H37Q33 27 30 30L18 43Z"/><path class="m p2" fill="#14b8a6" d="M18 62 30 46Q33 42 38 42H64Q74 42 74 52Q74 62 64 62H46V80Q46 84 43 86L24 98Q18 101 18 94Z"/><path class="m p3" fill="#2dd4bf" stroke="#2dd4bf" stroke-width="3" stroke-linejoin="round" d="M83 41 96 51 83 61Z"/><rect class="m q1" x="3" y="41" width="8" height="8" fill="#2dd4bf"/><rect class="m q2" x="0" y="55" width="6" height="6" fill="#0d9488"/><rect class="m q3" x="7" y="69" width="7" height="7" fill="#14b8a6"/></svg></div>' +
      '<div class="b-word" aria-hidden="true">' + word + '</div><div class="b-meta"><p class="b-sub" aria-hidden="true">LEARN · BUILD · BECOME</p><span class="b-pct" aria-hidden="true">0%</span></div></div>' +
      '<button type="button" class="b-snd" aria-pressed="' + (muted ? "false" : "true") + '" aria-label="' + (ar ? "الصوت" : "Sound") + '"><svg class="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg><svg class="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 6 6M22 9l-6 6"/></svg></button>';
    root.appendChild(el);
    var prog = el.querySelector(".b-prog"), head = el.querySelector(".b-head"), pct = el.querySelector(".b-pct"), snd = el.querySelector(".b-snd");
    var t0 = Date.now(), target = 8, shown = 0, finished = false, ctx = null;
    var stages = { dom: false, fonts: false, load: false, paint: false };
    /* ---- sound ---- */
    function audio() { try { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; if (!ctx) ctx = new AC(); if (ctx.state === "suspended") ctx.resume(); return ctx; } catch (e) { return null; } }
    function wantSound() { try { return window.localStorage.getItem("fayad-boot-sound") !== "off"; } catch (e) { return true; } }
    function chime() {
      var c = audio(); if (!c || !wantSound() || c.state !== "running") return false;
      var now = c.currentTime, master = c.createGain(); master.gain.value = 0.2; master.connect(c.destination);
      [[659.25, 0], [987.77, 0.1], [1318.51, 0.2], [1975.53, 0.32]].forEach(function (n, i) {
        [["sine", 1, 1], ["triangle", 2, 0.18]].forEach(function (o) {
          var os = c.createOscillator(), g = c.createGain(); os.type = o[0]; os.frequency.value = n[0] * o[1];
          var t = now + n[1], peak = (i === 3 ? 0.5 : 0.7) * o[2];
          g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
          os.connect(g); g.connect(master); os.start(t); os.stop(t + 1.2);
        });
      });
      return true;
    }
    snd.addEventListener("click", function () {
      var on = snd.getAttribute("aria-pressed") !== "true";
      snd.setAttribute("aria-pressed", String(on));
      try { window.localStorage.setItem("fayad-boot-sound", on ? "on" : "off"); } catch (e) {}
      if (on) { audio(); }
    });
    ["pointerdown", "keydown", "touchstart"].forEach(function (ev) { window.addEventListener(ev, function () { audio(); }, { once: true, passive: true }); });
    audio(); // allowed straight away when the visitor arrived through a click (sticky activation); otherwise it simply stays suspended
    /* ---- readiness ---- */
    function bump() { target = 8 + (stages.dom ? 30 : 0) + (stages.fonts ? 24 : 0) + (stages.load ? 30 : 0) + (stages.paint ? 8 : 0); }
    function ready() { return stages.dom && stages.fonts && stages.load && stages.paint; }
    function tick() {
      var t = Date.now() - t0;
      var timeCap = Math.min(86, t / 16);
      var goal = ready() ? 100 : Math.min(target, Math.max(timeCap, 8));
      shown += (goal - shown) * (calm ? 1 : 0.07);
      if (Math.abs(goal - shown) < 0.25) shown = goal;
      prog.style.strokeDashoffset = String(408 * (1 - shown / 100));
      head.style.setProperty("--r", (shown * 3.6) + "deg");
      head.style.setProperty("--ho", shown >= 99.5 ? "0" : "1");
      pct.textContent = Math.round(shown) + "%";
      el.setAttribute("aria-valuenow", String(Math.round(shown)));
      if (!finished && ready() && shown >= 99.5 && t > (calm ? 250 : 2300)) return finish();
      if (!finished) requestAnimationFrame(tick);
    }
    function finish() {
      if (finished) return; finished = true;
      el.classList.add("is-done"); chime();
      setTimeout(function () { root.classList.remove("fy-booting"); root.classList.add("fy-booted"); el.classList.add("is-out"); }, calm ? 0 : 650);
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); if (st.parentNode) st.parentNode.removeChild(st); try { if (ctx) ctx.close(); } catch (e) {} }, calm ? 500 : 2000);
    }
    function mark(kx) { stages[kx] = true; bump(); }
    if (d.readyState !== "loading") mark("dom"); else d.addEventListener("DOMContentLoaded", function () { mark("dom"); });
    (d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve()).then(function () { mark("fonts"); }, function () { mark("fonts"); });
    function onLoad() { mark("load"); requestAnimationFrame(function () { requestAnimationFrame(function () { mark("paint"); }); }); }
    if (d.readyState === "complete") onLoad(); else window.addEventListener("load", onLoad);
    setTimeout(function () { stages.dom = stages.fonts = stages.load = stages.paint = true; bump(); }, 5500); // an external resource is stuck: open anyway
    window.addEventListener("pageshow", function (e) { if (e.persisted) finish(); });
    requestAnimationFrame(tick);
  } catch (e) { var n = document.getElementById("fy-boot"); if (n && n.parentNode) n.parentNode.removeChild(n); document.documentElement.classList.remove("fy-booting"); }
})();
