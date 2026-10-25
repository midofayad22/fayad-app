/*
  FAYAD preferences bootstrap — MUST load synchronously in <head>, before any stylesheet paints.
  Resolves theme + language + course accent and sets them on <html> so there is no flash of the
  wrong theme/direction. Keep this file tiny and dependency-free.

  Storage keys:
    fayad-theme     "light" | "dark"      (absent = follow the operating-system preference)
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

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function trackFromPath(path) {
    var map = [
      ["html-learning", "html"],
      ["css-learning", "css"],
      ["javascript-learning", "js"],
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

  var storedTheme = read("fayad-theme");
  var theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme();
  var storedLang = read("fayad-language");
  var lang = storedLang === "en" ? "en" : "ar";

  root.setAttribute("data-track", trackFromPath(location.pathname));
  applyTheme(theme);
  applyLang(lang);

  var listeners = [];

  window.FAYAD = window.FAYAD || {};
  window.FAYAD.prefs = {
    get theme() {
      return root.getAttribute("data-theme");
    },
    get lang() {
      return root.getAttribute("data-lang");
    },
    setTheme: function (next) {
      if (next !== "light" && next !== "dark") return;
      write("fayad-theme", next);
      applyTheme(next);
      window.dispatchEvent(new CustomEvent("fayad:themechange", { detail: { theme: next } }));
    },
    setLang: function (next) {
      if (next !== "ar" && next !== "en") return;
      write("fayad-language", next);
      applyLang(next);
      window.dispatchEvent(new CustomEvent("fayad:langchange", { detail: { lang: next } }));
    },
  };

  // Keep other open tabs in sync.
  window.addEventListener("storage", function (event) {
    if (event.key === "fayad-theme" && (event.newValue === "light" || event.newValue === "dark")) {
      applyTheme(event.newValue);
      window.dispatchEvent(new CustomEvent("fayad:themechange", { detail: { theme: event.newValue } }));
    }
    if (event.key === "fayad-language" && (event.newValue === "ar" || event.newValue === "en")) {
      applyLang(event.newValue);
      window.dispatchEvent(new CustomEvent("fayad:langchange", { detail: { lang: event.newValue } }));
    }
  });

  // Follow the OS theme live, but only while the user has not chosen explicitly.
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: light)");
    var onChange = function () {
      if (!read("fayad-theme")) {
        var t = systemTheme();
        applyTheme(t);
        window.dispatchEvent(new CustomEvent("fayad:themechange", { detail: { theme: t } }));
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
  }
})();
