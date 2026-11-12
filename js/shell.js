/*
  FAYAD shell: shared display controls (theme + language) and the "new version" prompt.
  - On the homepage the controls sit inside the navbar (.nav-actions).
  - Every page with a header (course, account, games, settings, about) gets them inside that header; only header-less pages (login, offline) keep the small floating dock.
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

  var themeBtn, langBtn, menuBtn, accountBtn;

  /* The signed-in learner, read from the session supabase-js itself persists (sb-<project>-auth-token). Exposed so every component
     (account button, sidebar, homepage) agrees on who is signed in. Expired sessions count as signed out. */
  /* Profile cache: profiles.display_name / avatar_url for the signed-in user, kept in sync with Supabase so the navbar, account menu, drawer, home
     and profile page all show the same name and picture immediately after a change (no logout/login). Cleared on sign-out. */
  var PKEY = "fayad-profile-v1";
  function readProfile(id) { try { var p = JSON.parse(localStorage.getItem(PKEY) || "null"); return p && p.id === id ? p : null; } catch (e) { return null; } }
  function writeProfile(p) { try { if (p) localStorage.setItem(PKEY, JSON.stringify(p)); else localStorage.removeItem(PKEY); } catch (e) { /* storage blocked */ } window.dispatchEvent(new CustomEvent("fayad-profile-changed", { detail: p })); }
  function readUser() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!/^(sb-.*-auth-token|fayad-supabase-auth)$/.test(k)) continue;
        var raw = JSON.parse(localStorage.getItem(k) || "null"), u = raw && (raw.user || (raw.currentSession && raw.currentSession.user));
        if (!u) continue; var exp = raw.expires_at || (raw.currentSession && raw.currentSession.expires_at);
        if (exp && exp * 1000 < Date.now() - 7 * 864e5) continue; // access tokens refresh silently; only treat long-dead sessions as gone
        var m = u.user_metadata || {}, out = { id: u.id, email: u.email || "", name: m.full_name || m.name || m.username || "", avatar: m.avatar_url || m.picture || "" };
        var c = readProfile(u.id); if (c) { if (c.name) out.name = c.name; if ("avatar" in c) out.avatar = c.avatar || ""; } // profiles row is the source of truth once synced
        return out;
      }
    } catch (e) { /* storage blocked */ }
    return null;
  }
  window.FAYAD.user = readUser;
  window.FAYAD.setProfile = function (patch) { var u = readUser(); if (!u) return; var c = readProfile(u.id) || { id: u.id }; for (var k in patch) c[k] = patch[k]; c.id = u.id; writeProfile(c); };
  function refreshProfile(tries) {
    var u = readUser(), cl = window.FAYAD_AUTH && window.FAYAD_AUTH.client;
    if (!u) return; if (!cl) { if ((tries || 0) < 8) setTimeout(function () { refreshProfile((tries || 0) + 1); }, 400); return; }
    cl.from("profiles").select("display_name,avatar_url").eq("id", u.id).maybeSingle().then(function (r) {
      if (r && r.data) writeProfile({ id: u.id, name: r.data.display_name || "", avatar: r.data.avatar_url || "", at: Date.now() });
    }, function () { /* offline: keep the cached profile */ });
  }
  window.addEventListener("fayad-auth-changed", function (e) {
    var ev = e.detail && e.detail.event;
    if (ev === "SIGNED_OUT" || (e.detail && e.detail.loggedIn === false)) { writeProfile(null); closeMenu(); }
    else if (ev === "SIGNED_IN" || ev === "INITIAL_SESSION" || ev === "USER_UPDATED") refreshProfile(0);
  });
  window.addEventListener("fayad-profile-changed", function () { paintAccount(); });
  /* Lesson pages do not ship the Supabase client for guests. When a saved session exists, load it on demand so the session is refreshed,
     auth events fire (SIGNED_OUT in another tab, USER_UPDATED…) and progress/preferences sync works on every page, not only on the homepage. */
  function ensureAuth() {
    if (window.FAYAD_AUTH || document.querySelector("script[data-fy-auth]") || !readUser()) return;
    function load(src, done) { var sc = document.createElement("script"); sc.src = src; sc.async = false; sc.setAttribute("data-fy-auth", ""); sc.onload = done; sc.onerror = function () { /* offline: stay on the cached session */ }; document.head.appendChild(sc); }
    if (window.supabase) load("/js/main-auth.js"); else load("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2", function () { load("/js/main-auth.js"); });
  }
  document.addEventListener("DOMContentLoaded", ensureAuth);
  document.addEventListener("DOMContentLoaded", function () { refreshProfile(0); });
  var ICON_USER = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
  /* Account menu (signed-in): avatar button opens Dashboard / Profile / Settings / Sign out. Guests keep the plain Sign-in link. */
  var menuEl = null, menuOpener = null;
  function closeMenu(focusBack) {
    if (!menuEl) return; menuEl.remove(); menuEl = null; document.removeEventListener("keydown", menuKey, true); document.removeEventListener("pointerdown", menuOutside, true);
    if (menuOpener) { menuOpener.setAttribute("aria-expanded", "false"); if (focusBack) menuOpener.focus(); }
  }
  function menuKey(e) {
    if (!menuEl) return;
    if (e.key === "Escape") { e.preventDefault(); closeMenu(true); return; }
    var items = Array.prototype.slice.call(menuEl.querySelectorAll("[role=menuitem]")), i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    else if (e.key === "Tab") closeMenu(false);
  }
  function menuOutside(e) { if (menuEl && !menuEl.contains(e.target) && !(menuOpener && menuOpener.contains(e.target))) closeMenu(false); }
  function toast(msg) {
    var t = document.createElement("div"); t.className = "fy-toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); t.textContent = msg; document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("on"); }); setTimeout(function () { t.classList.remove("on"); setTimeout(function () { t.remove(); }, 260); }, 4200);
  }
  function openMenu() {
    var u = readUser(); if (!u || !accountBtn) return; closeMenu(false); menuOpener = accountBtn; accountBtn.setAttribute("aria-expanded", "true");
    var ar = prefs.lang === "ar", label = u.name || (u.email ? u.email.split("@")[0] : "?");
    var m = document.createElement("div"); m.className = "fy-menu"; m.setAttribute("role", "menu"); m.setAttribute("aria-label", ar ? "قائمة الحساب" : "Account menu"); m.dir = ar ? "rtl" : "ltr";
    var head = document.createElement("div"); head.className = "fy-menu-head";
    var av = document.createElement("span"); av.className = "fy-avatar fy-avatar-lg"; av.setAttribute("aria-hidden", "true"); av.textContent = label.trim().charAt(0).toUpperCase();
    if (u.avatar) { var im = new Image(); im.alt = ""; im.referrerPolicy = "no-referrer"; im.onload = function () { av.textContent = ""; av.appendChild(im); }; im.src = u.avatar; }
    var who = document.createElement("span"); who.className = "fy-menu-who"; var b = document.createElement("b"); b.textContent = label; var em = document.createElement("small"); em.textContent = u.email; em.dir = "ltr"; who.append(b, em);
    head.append(av, who); m.appendChild(head);
    function item(href, text, onclick) { var a = document.createElement(href ? "a" : "button"); a.className = "fy-menu-item"; a.setAttribute("role", "menuitem"); a.textContent = text; if (href) a.href = href; else { a.type = "button"; a.addEventListener("click", onclick); } return a; }
    m.append(item("/dashboard.html", ar ? "لوحة التعلم" : "Learning dashboard"), item("/profile.html", ar ? "الملف الشخصي" : "Profile"), item("/settings/index.html", ar ? "الإعدادات" : "Settings"));
    var sep = document.createElement("hr"); m.appendChild(sep);
    var out = item(null, ar ? "تسجيل الخروج" : "Sign out", function () {
      out.disabled = true; var cl = window.FAYAD_AUTH && window.FAYAD_AUTH.client;
      Promise.resolve(cl ? cl.auth.signOut() : null).catch(function () {}).then(function () {
        try { Object.keys(localStorage).filter(function (k) { return /^(sb-.*-auth-token|fayad-supabase-auth)$/.test(k) || k === PKEY; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) { /* storage blocked */ }
        closeMenu(false); window.dispatchEvent(new CustomEvent("fayad-auth-changed", { detail: { event: "SIGNED_OUT", loggedIn: false, user: null, session: null } })); paintAccount();
        toast(ar ? "تم تسجيل الخروج." : "You have been signed out.");
      });
    });
    out.classList.add("fy-menu-out"); m.appendChild(out); document.body.appendChild(m);
    var r = accountBtn.getBoundingClientRect(), w = m.offsetWidth; m.style.top = Math.round(r.bottom + 8) + "px";
    var left = ar ? r.left : r.right - w; m.style.left = Math.max(8, Math.min(innerWidth - w - 8, left)) + "px";
    menuEl = m; requestAnimationFrame(function () { m.classList.add("on"); m.querySelector("[role=menuitem]").focus({ preventScroll: true }); });
    document.addEventListener("keydown", menuKey, true); document.addEventListener("pointerdown", menuOutside, true);
  }
  // one welcome per browser session and user, on a real sign-in event (never on a plain page load or token refresh)
  window.addEventListener("fayad-auth-changed", function (e) {
    if (!e.detail || e.detail.event !== "SIGNED_IN") return; var u = readUser(); if (!u) return;
    try { if (sessionStorage.getItem("fayad-welcomed") === u.id) return; sessionStorage.setItem("fayad-welcomed", u.id); } catch (x) { /* ignore */ }
    var n = (u.name || (u.email ? u.email.split("@")[0] : "")).split(/\s+/)[0]; toast(prefs.lang === "ar" ? "أهلاً بعودتك، " + n + "!" : "Welcome back, " + n + "!");
  });
  function paintAccount() {
    if (!accountBtn) return;
    var u = readUser(), ar = prefs.lang === "ar";
    accountBtn.textContent = "";
    if (u) {
      var label = u.name || (u.email ? u.email.split("@")[0] : "") || "?";
      accountBtn.href = "/profile.html"; accountBtn.classList.add("has-avatar"); accountBtn.setAttribute("aria-haspopup", "menu"); accountBtn.setAttribute("aria-expanded", menuEl ? "true" : "false");
      var av = document.createElement("span"); av.className = "fy-avatar"; av.setAttribute("aria-hidden", "true"); av.textContent = label.trim().charAt(0).toUpperCase();
      if (u.avatar) { var img = new Image(); img.alt = ""; img.decoding = "async"; img.referrerPolicy = "no-referrer"; img.onload = function () { av.textContent = ""; av.appendChild(img); }; img.src = u.avatar; }
      accountBtn.appendChild(av);
      var t = (ar ? "حسابي: " : "My account: ") + label; accountBtn.setAttribute("aria-label", t); accountBtn.setAttribute("title", t);
    } else {
      accountBtn.href = "/login.html"; accountBtn.classList.remove("has-avatar"); accountBtn.removeAttribute("aria-haspopup"); accountBtn.removeAttribute("aria-expanded"); accountBtn.innerHTML = ICON_USER;
      var l = ar ? "تسجيل الدخول" : "Sign in"; accountBtn.setAttribute("aria-label", l); accountBtn.setAttribute("title", l);
    }
  }
  window.addEventListener("storage", paintAccount);
  window.addEventListener("fayad-auth-changed", paintAccount);

  // Global search: the overlay (js/search/ui.js, css/search.css, search/index.json) loads on first use only.
  var searchMod = null;
  function loadSearch() {
    if (!searchMod) {
      // the stylesheet must be applied before the overlay is inserted, otherwise focusing it scrolls the page
      var l = document.querySelector("link[data-sx]");
      if (!l) { l = document.createElement("link"); l.rel = "stylesheet"; l.href = "/css/search.css"; l.setAttribute("data-sx", ""); document.head.appendChild(l); }
      var cssDone = l.sheet ? Promise.resolve() : new Promise(function (r) { l.addEventListener("load", r, { once: true }); l.addEventListener("error", r, { once: true }); setTimeout(r, 1500); });
      searchMod = Promise.all([import("/js/search/ui.js"), cssDone]).then(function (a) { return a[0]; });
    }
    return searchMod;
  }
  function preloadSearch() { loadSearch().then(function (m) { m.preload().catch(function () {}); }); }
  function openSearch(query) { return loadSearch().then(function (m) { return m.open({ query: query || "" }); }); }
  window.FAYAD.openSearch = openSearch;
  document.addEventListener("keydown", function (e) {
    var k = e.key;
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || "") || (e.target && e.target.isContentEditable);
    if (((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && (k === "k" || k === "K")) || (k === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey)) {
      if (document.querySelector(".sx")) return;
      e.preventDefault(); openSearch();
    }
  });
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest && e.target.closest("[data-open-search]");
    if (t) { e.preventDefault(); openSearch(); }
  });

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

    menuBtn = document.createElement("button");
    menuBtn.type = "button";
    menuBtn.className = "fy-btn fy-btn-menu";
    menuBtn.setAttribute("aria-haspopup", "dialog");
    menuBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    function loadDrawer() { return import("/js/nav-drawer.js"); }
    menuBtn.addEventListener("pointerenter", function () { loadDrawer().then(function (m) { m.preload(); }); }, { once: true });
    menuBtn.addEventListener("focus", function () { loadDrawer().then(function (m) { m.preload(); }); }, { once: true });
    menuBtn.addEventListener("click", function () { loadDrawer().then(function (m) { m.open(menuBtn); }); });

    var searchBtn = document.createElement("button");
    searchBtn.type = "button";
    searchBtn.className = "fy-btn fy-btn-search";
    searchBtn.setAttribute("aria-haspopup", "dialog");
    searchBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
    searchBtn.addEventListener("click", function () { openSearch(); });
    searchBtn.addEventListener("pointerenter", preloadSearch, { once: true });
    searchBtn.addEventListener("focus", preloadSearch, { once: true });

    accountBtn = document.createElement("a");
    accountBtn.className = "fy-btn fy-btn-account";
    accountBtn.addEventListener("click", function (e) { if (readUser()) { e.preventDefault(); if (menuEl) closeMenu(false); else openMenu(); } });
    paintAccount();

    // order (start → end): search · language · theme · account · menu. The menu toggle always closes the group, at the far edge.
    group.appendChild(searchBtn);
    group.appendChild(langBtn);
    group.appendChild(themeBtn);
    group.appendChild(accountBtn);
    group.appendChild(menuBtn);
    return group;
  }

  function refresh() {
    if (!themeBtn) return;
    var dark = prefs.theme === "dark";
    themeBtn.innerHTML = dark ? ICON_SUN : ICON_MOON;
    themeBtn.setAttribute("aria-label", i18n.t(dark ? "theme.toLight" : "theme.toDark"));
    themeBtn.setAttribute("title", i18n.t(dark ? "theme.toLight" : "theme.toDark"));
    var ml = prefs.lang === "ar" ? "القائمة" : "Menu"; menuBtn.setAttribute("aria-label", ml); menuBtn.setAttribute("title", ml);
    langBtn.textContent = i18n.t("lang.short");
    paintAccount();
    var next = prefs.lang === "ar" ? "lang.toEn" : "lang.toAr";
    langBtn.setAttribute("aria-label", i18n.t(next));
    langBtn.setAttribute("title", i18n.t(next));
    // The label is in the *target* language, so mark it for screen readers.
    langBtn.setAttribute("lang", prefs.lang === "ar" ? "en" : "ar");
    var sb = document.querySelector(".fy-btn-search");
    if (sb) { var sl = prefs.lang === "ar" ? "بحث (Ctrl+K)" : "Search (Ctrl+K)"; sb.setAttribute("aria-label", sl); sb.setAttribute("title", sl); }
  }

  // Every page gets the controls inside a real header: use the page's own header when it has one, otherwise add a slim bar.
  var HOSTS = [".learning-actions", ".ac-top-in", ".ab-header-inner", ".st-top"];
  function findSlot() {
    var slot = document.querySelector(".nav-actions");
    if (slot) return slot;
    for (var i = 0; i < HOSTS.length; i++) {
      var host = document.querySelector(HOSTS[i]);
      if (!host) continue;
      slot = document.createElement("div");
      slot.className = "nav-actions fy-slot";
      host.appendChild(slot); // after page-specific actions (e.g. "Back") so the menu toggle is always the far-edge control
      return slot;
    }
    // hero-style course pages (Programming / Computer Basics): a slim sticky bar above the hero
    if (document.querySelector(".app-header")) {
      var bar = document.createElement("header");
      bar.className = "fy-bar";
      bar.innerHTML = '<a class="fy-bar-brand" href="/index.html" aria-label="FAYBIT"><img src="/assets/brand/logo-mark.svg" alt="" width="28" height="28" /><span>FAYBIT</span></a><div class="nav-actions fy-slot"></div>';
      document.body.insertBefore(bar, document.body.firstChild);
      return bar.querySelector(".fy-slot");
    }
    return null;
  }

  function mount() {
    var group = build();
    var navActions = findSlot();
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

  // Signed-in devices sync account preferences (guests never load Supabase).
  try {
    if (localStorage.getItem("fayad-supabase-auth") || localStorage.getItem("sb-vsrysitexadvmmikcmfs-auth-token"))
      {
        import("/js/prefs-sync.js").then(function (m) { m.start(); }).catch(function () {});
        import("/js/notif-badge.js").then(function (m) { m.start(); }).catch(function () {});
      }
  } catch (e) {}
})();
