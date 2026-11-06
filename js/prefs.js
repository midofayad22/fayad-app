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
    if (meta) meta.setAttribute("content", theme === "light" ? "#f5f9fa" : "#071014");
  }

  function applyLang(lang) {
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("data-lang", lang);
  }

  /* ---- unified preference store: one JSON object (key fayad-prefs-v1) + legacy keys kept in step ---- */
  var KEY = "fayad-prefs-v1";
  var DEFAULTS = {
    themeMode: "light", accent: "teal", fontScale: 100, contrast: "normal", motion: "system",
    reading: "comfortable", sections: "expanded", explainLang: "auto", editorSize: 14, editorTheme: "auto",
  };
  var ENUMS = {
    themeMode: ["light", "dark", "system"],
    accent: ["teal", "blue", "violet", "rose", "amber", "slate"],
    contrast: ["normal", "high"],
    motion: ["system", "reduce", "full"],
    reading: ["comfortable", "compact"],
    sections: ["expanded", "collapsed"],
    explainLang: ["auto", "ar", "en"],
    editorTheme: ["auto", "light", "dark"],
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

  function resolvedTheme() {
    if (state.themeMode === "system") return mqDark && mqDark.matches ? "dark" : "light";
    return state.themeMode;
  }
  function reducedMotion() {
    return state.motion === "reduce" || (state.motion === "system" && !!(mqMotion && mqMotion.matches));
  }
  function applyAll() {
    var theme = resolvedTheme();
    if (root.getAttribute("data-theme") !== theme) applyTheme(theme);
    root.setAttribute("data-accent", state.accent);
    root.setAttribute("data-contrast", state.contrast);
    root.setAttribute("data-motion", reducedMotion() ? "reduce" : "full");
    root.setAttribute("data-reading", state.reading);
    root.setAttribute("data-sections", state.sections);
    root.setAttribute("data-editor-theme", state.editorTheme);
    root.style.setProperty("--fy-scale", String(state.fontScale / 100));
    root.style.setProperty("--fy-editor-size", state.editorSize + "px");
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
    setLang: function (next) {
      if (next !== "ar" && next !== "en") return;
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
