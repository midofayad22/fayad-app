/*
  FAYAD shell: shared display controls (theme + language) and the "new version" prompt.
  - On the homepage the controls sit inside the navbar (.nav-actions).
  - Everywhere else they live in a small floating dock at the inline-end bottom corner.
  Requires js/prefs.js and js/i18n.js (loaded first).
*/
(function () {
  var prefs = window.FAYAD && window.FAYAD.prefs;
  var i18n = window.FAYAD && window.FAYAD.i18n;
  if (!prefs || !i18n) return;

  var ICON_MOON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var ICON_SUN =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  var themeBtn, langBtn;

  function build() {
    var group = document.createElement("div");
    group.className = "fy-controls";
    group.setAttribute("role", "group");
    group.setAttribute("data-i18n-attr", "aria-label:dock.label");

    themeBtn = document.createElement("button");
    themeBtn.type = "button";
    themeBtn.className = "fy-btn fy-btn-theme";
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      root.classList.add("fy-theme-switching");
      prefs.setTheme(prefs.theme === "dark" ? "light" : "dark");
      window.setTimeout(function () { root.classList.remove("fy-theme-switching"); }, 320);
    });

    langBtn = document.createElement("button");
    langBtn.type = "button";
    langBtn.className = "fy-btn fy-btn-lang";
    langBtn.addEventListener("click", function () {
      prefs.setLang(prefs.lang === "ar" ? "en" : "ar");
    });

    group.appendChild(themeBtn);
    group.appendChild(langBtn);
    return group;
  }

  function refresh() {
    if (!themeBtn) return;
    var dark = prefs.theme === "dark";
    themeBtn.innerHTML = dark ? ICON_SUN : ICON_MOON;
    themeBtn.setAttribute("aria-label", i18n.t(dark ? "theme.toLight" : "theme.toDark"));
    themeBtn.setAttribute("title", i18n.t(dark ? "theme.toLight" : "theme.toDark"));
    langBtn.textContent = i18n.t("lang.short");
    var next = prefs.lang === "ar" ? "lang.toEn" : "lang.toAr";
    langBtn.setAttribute("aria-label", i18n.t(next));
    langBtn.setAttribute("title", i18n.t(next));
    // The label is in the *target* language, so mark it for screen readers.
    langBtn.setAttribute("lang", prefs.lang === "ar" ? "en" : "ar");
  }

  function mount() {
    var group = build();
    var navActions = document.querySelector(".nav-actions");
    if (navActions) {
      group.classList.add("fy-controls--inline");
      navActions.insertBefore(group, navActions.firstChild);
    } else {
      group.classList.add("fy-controls--dock");
      document.body.appendChild(group);
    }
    i18n.apply(group);
    refresh();
  }

  function showUpdatePrompt(worker) {
    if (document.getElementById("fy-update")) return;
    var bar = document.createElement("div");
    bar.id = "fy-update";
    bar.className = "fy-update";
    bar.setAttribute("role", "status");
    bar.innerHTML =
      '<span data-i18n="update.ready"></span>' +
      '<button type="button" class="fy-update-go" data-i18n="update.refresh"></button>' +
      '<button type="button" class="fy-update-later" data-i18n="update.dismiss"></button>';
    document.body.appendChild(bar);
    i18n.apply(bar);
    bar.querySelector(".fy-update-go").addEventListener("click", function () {
      navigator.serviceWorker.addEventListener("controllerchange", function () { window.location.reload(); }, { once: true });
      if (worker) worker.postMessage({ type: "SKIP_WAITING" });
    });
    bar.querySelector(".fy-update-later").addEventListener("click", function () { bar.remove(); });
  }

  // Pages whose lesson/interface content already has English; others show a one-time honest notice.
  var TRANSLATED_TRACKS = ["css", "angular", "home", "about", "com", "prg", "html", "js", "ajs", "bs", "tw", "react", "vue"];

  function maybeNotifyUntranslated() {
    if (prefs.lang !== "en") return;
    var track = document.documentElement.getAttribute("data-track");
    if (TRANSLATED_TRACKS.indexOf(track) !== -1) return;
    var key = "fayad-untranslated-" + location.pathname;
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, "1"); } catch (e) {}
    if (document.getElementById("fy-notice")) return;
    var bar = document.createElement("div");
    bar.id = "fy-notice";
    bar.className = "fy-update";
    bar.setAttribute("role", "status");
    bar.innerHTML = '<span data-i18n="notice.untranslated"></span><button type="button" class="fy-update-later" data-i18n="update.dismiss"></button>';
    document.body.appendChild(bar);
    i18n.apply(bar);
    bar.querySelector("button").addEventListener("click", function () { bar.remove(); });
  }

  // Remember which course page was opened last (read by the homepage "continue learning" section).
  function rememberTrack() {
    var track = document.documentElement.getAttribute("data-track");
    if (["com", "prg", "html", "css", "js", "react", "vue", "angular"].indexOf(track) === -1) return;
    try { localStorage.setItem("fayad-last-track", JSON.stringify({ id: track, ts: Date.now() })); } catch (e) {}
  }
  // site-wide interaction layer (progress bar, reveals, ripple, back-to-top); loaded once, never blocks rendering
  (function loadFx() {
    if (document.querySelector("link[data-fx]")) return;
    var l = document.createElement("link"); l.rel = "stylesheet"; l.href = "/css/fx.css"; l.setAttribute("data-fx", "");
    document.head.appendChild(l);
    var sc = document.createElement("script"); sc.src = "/js/fx.js"; sc.defer = true; document.head.appendChild(sc);
  })();
  document.addEventListener("DOMContentLoaded", rememberTrack);

  window.addEventListener("fayad:langchange", maybeNotifyUntranslated);
  document.addEventListener("DOMContentLoaded", maybeNotifyUntranslated);
  window.addEventListener("fayad:themechange", refresh);
  window.addEventListener("fayad:langchange", refresh);
  window.addEventListener("fayad:update-ready", function (e) { showUpdatePrompt(e.detail && e.detail.worker); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
