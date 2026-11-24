/* FAYBIT home: tracks rail controls, staggered reveal, arena check ticking.
   Plain JS, no libraries. Content is visible without JS; animation is armed only when JS runs
   and the user has not asked for reduced motion. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canIO = "IntersectionObserver" in window;

  /* rail buttons (RTL-aware: scrollBy follows the logical direction via sign) */
  var rail = document.getElementById("tkRail");
  if (rail) {
    var step = function () { var c = rail.querySelector(".tk-card"); return c ? c.getBoundingClientRect().width + 16 : 300; };
    document.querySelectorAll("[data-rail]").forEach(function (b) {
      b.addEventListener("click", function () {
        var rtl = getComputedStyle(rail).direction === "rtl";
        var dir = (b.getAttribute("data-rail") === "next" ? 1 : -1) * (rtl ? -1 : 1);
        rail.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
      });
    });
  }

  /* staggered reveal for track tiles */
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tk"));
  if (tiles.length && canIO && !reduce) {
    root.classList.add("tk-anim");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    tiles.forEach(function (t) { io.observe(t); });
    /* safety: never leave content hidden */
    setTimeout(function () { tiles.forEach(function (t) { t.classList.add("is-in"); }); }, 4000);
  }

  /* arena demo: checks tick once when it enters the viewport */
  var demo = document.getElementById("plDemo");
  if (demo) {
    if (canIO && !reduce) {
      root.classList.add("pl-anim");
      var io2 = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { demo.classList.add("is-in"); io2.disconnect(); } });
      }, { threshold: 0.4 });
      io2.observe(demo);
      setTimeout(function () { demo.classList.add("is-in"); }, 4000);
    } else demo.classList.add("is-in");
  }
})();
