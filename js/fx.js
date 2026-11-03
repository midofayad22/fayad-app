/* Site-wide interactivity: scroll reveals, card lift, button ripple, back-to-top.
   Skipped entirely under prefers-reduced-motion. Never hides content unless it can reveal it again. */
(function () {
  "use strict";
  if (window.__fyFx) return; window.__fyFx = true;
  var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (rm && rm.matches) return;
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  // elements that get a reveal / lift. Lesson-engine internals are excluded (they re-render constantly).
  var REVEAL = ".ab-section, .ab-hero, .ab-two > *, .ab-steps > *, .ac-hero, .ac-stats > *, .ac-card, .ac-ach, .ac-tracks > *, .auth-feature, .welcome-back";
  var LIFT = ".ac-card, .ac-tracks > *, .ab-two > *, .ac-stats > *";
  var BTN = ".ab-btn, .ac-btn, .ac-btn-primary, .hm-cta, .hm-next-go, .btn, .auth-submit, button[type=submit]";

  function reveal() {
    if (!("IntersectionObserver" in window)) return;
    var els = $$(REVEAL).filter(function (e) { return !e.closest("[hidden]") && e.getBoundingClientRect().top > innerHeight * 0.9; });
    if (!els.length) return;
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("fx-in"); io.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e, i) { e.style.setProperty("--fx-d", (i % 4) * 0.07 + "s"); e.classList.add("fx-pre"); io.observe(e); });
    // safety net: never leave anything hidden
    setTimeout(function () { els.forEach(function (e) { e.classList.add("fx-in"); }); }, 6000);
  }

  function lift() { $$(LIFT).forEach(function (e) { e.classList.add("fx-lift"); }); }

  function ripple() {
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest && e.target.closest(BTN);
      if (!b || b.disabled) return;
      var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
      if (getComputedStyle(b).position === "static") b.classList.add("fx-ripple-host"); else b.style.overflow = b.style.overflow || "hidden";
      var s = document.createElement("span"); s.className = "fx-ripple"; s.setAttribute("aria-hidden", "true");
      s.style.cssText = "width:" + d + "px;height:" + d + "px;left:" + (e.clientX - r.left - d / 2) + "px;top:" + (e.clientY - r.top - d / 2) + "px";
      b.appendChild(s); setTimeout(function () { s.remove(); }, 650);
    }, { passive: true });
  }

  function toTop() {
    if (document.documentElement.scrollHeight < innerHeight * 2.2) return;
    var b = document.createElement("button"); b.type = "button"; b.className = "fx-top";
    b.setAttribute("data-i18n-attr", "aria-label:fx.top"); b.setAttribute("aria-label", document.documentElement.lang === "en" ? "Back to top" : "العودة للأعلى");
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    b.addEventListener("click", function () { scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(b);
    addEventListener("scroll", function () { b.classList.toggle("on", scrollY > innerHeight * 0.8); }, { passive: true });
    addEventListener("fayad:langchange", function () { b.setAttribute("aria-label", document.documentElement.lang === "en" ? "Back to top" : "العودة للأعلى"); });
  }

  function start() { reveal(); lift(); ripple(); toTop(); }
  if (document.readyState === "complete") start(); else addEventListener("load", start);
})();
