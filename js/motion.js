/* FAYBIT motion layer (shared). Plain JS, no libraries.
   - reveal: elements with .rv fade/rise once as they enter the viewport
   - navbar: .is-scrolled state + thin progress line
   - scroll spy: the active nav link follows the section in view, with a sliding indicator
   - bottom navigation (mobile): same spy
   Content is visible without JS; nothing here changes scroll behaviour. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* reveal */
  var rv = $$(".rv");
  if (rv.length && "IntersectionObserver" in window && !reduce) {
    root.classList.add("rv-on");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { var t = e.target; t.classList.add("is-in"); io.unobserve(t); /* hand control back to the component's own hover transitions once revealed */ setTimeout(function () { t.classList.remove("rv"); }, 900 + (parseFloat(getComputedStyle(t).getPropertyValue("--i")) || 0) * 80); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(function (n) { io.observe(n); });
    setTimeout(function () { rv.forEach(function (n) { n.classList.add("is-in"); }); }, 5000); /* never leave content hidden */
  }

  /* navbar state + progress line */
  var nav = document.getElementById("navbar") || document.querySelector(".navbar");
  var sp = document.createElement("div"); sp.className = "sp"; sp.setAttribute("aria-hidden", "true"); document.body.appendChild(sp);
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || 0, h = document.documentElement.scrollHeight - innerHeight;
      var s = y > 8;
      if (nav) nav.classList.toggle("is-scrolled", s);
      root.classList.toggle("is-scrolled", s);
      sp.style.setProperty("--p", h > 0 ? Math.min(1, y / h).toFixed(4) : 0); /* on the bar itself: a root custom property forces a whole-document style recalc every frame */
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* bottom navigation: the Menu tab opens the same drawer as the header menu button */
  var bnMenu = document.getElementById("bnMenu");
  if (bnMenu) bnMenu.addEventListener("click", function () { var b = document.querySelector(".fy-btn-menu"); if (b) b.click(); });

  /* scroll spy */
  var links = $$('.nav-links a[href^="#"], .bn a[href^="#"]');
  if (!links.length) return;
  var map = {}; links.forEach(function (a) { var id = a.getAttribute("href").slice(1); (map[id] = map[id] || []).push(a); });
  var ids = Object.keys(map).filter(function (id) { return document.getElementById(id); });
  var navLinks = $$(".nav-links");
  var ind = null;
  if (navLinks[0]) { ind = document.createElement("span"); ind.className = "nav-ind"; ind.setAttribute("aria-hidden", "true"); navLinks[0].appendChild(ind); }
  function place() {
    if (!ind) return;
    var a = navLinks[0].querySelector(".nav-link.active"); if (!a) { ind.style.opacity = 0; return; }
    var pr = navLinks[0].getBoundingClientRect(), r = a.getBoundingClientRect(), rtl = getComputedStyle(navLinks[0]).direction === "rtl";
    var x = rtl ? -(pr.right - r.right) : r.left - pr.left;
    ind.style.opacity = 1; ind.style.width = r.width + "px"; ind.style.transform = "translateX(" + x + "px)";
  }
  var current = null;
  function set(id) {
    var shown = links.some(function (a) { return a.getAttribute("href") === "#" + id && a.getClientRects().length; });
    if (!shown || id === current) return; current = id; /* a section without a visible link keeps the previous indicator */
    links.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
    });
    place();
  }
  function spy() {
    var line = innerHeight * 0.38, best = ids[0];
    ids.forEach(function (id) { var r = document.getElementById(id).getBoundingClientRect(); if (r.top <= line) best = id; });
    if (window.scrollY < 40) best = ids[0];
    if (innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) best = ids[ids.length - 1] === "footer" ? best : best;
    set(best);
  }
  var t2 = false;
  addEventListener("scroll", function () { if (t2) return; t2 = true; requestAnimationFrame(function () { spy(); t2 = false; }); }, { passive: true });
  addEventListener("resize", function () { place(); });
  window.addEventListener("fayad-lang-changed", function () { setTimeout(place, 60); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(); });
  spy();
})();
