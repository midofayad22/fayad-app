/* Homepage roadmap: pick a stop on the 18-week map to read its detail; paints real progress; triggers the practice-demo ticks.
   Plain progressive enhancement: every stop is a real link to its track, the detail articles are in the HTML. */
(function () {
  "use strict";
  var F = window.FAYAD || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stage = $("#rmStage");
  if (!stage) return;

  function select(id, opts) {
    var art = $('[data-detail="' + id + '"]', stage);
    if (!art) return;
    $$(".rm-detail", stage).forEach(function (a) { a.hidden = a !== art; a.classList.remove("is-swap"); });
    if (!reduce && opts && opts.animate) { void art.offsetWidth; art.classList.add("is-swap"); }
    $$("[data-pick]").forEach(function (el) {
      if (el.getAttribute("data-pick") === id) el.setAttribute("aria-current", "true"); else el.removeAttribute("aria-current");
    });
    var cur = $('.rm-seg[data-pick="' + id + '"]');
    var sc = $(".rm-scroll");
    if (cur && sc && sc.scrollWidth > sc.clientWidth) {
      var r = cur.getBoundingClientRect(), s = sc.getBoundingClientRect();
      sc.scrollBy({ left: r.left + r.width / 2 - (s.left + s.width / 2), behavior: reduce ? "auto" : "smooth" });
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-pick]");
    if (a) { e.preventDefault(); select(a.getAttribute("data-pick"), { animate: true }); return; }
    var st = e.target.closest && e.target.closest("[data-pick-stage]");
    if (st) { select(st.getAttribute("data-pick-stage"), { animate: true }); }
  });

  function fills() {
    if (!F.catalog) return;
    var p = F.catalog.progress();
    $$(".rm-seg[data-pick]").forEach(function (el) {
      var i = p[el.getAttribute("data-pick")];
      if (i && i.done) el.style.setProperty("--p", i.percent + "%");
    });
  }

  var start = (function () {
    var h = (location.hash || "").match(/^#track-(\w+)$/);
    if (h && $('[data-detail="' + h[1] + '"]', stage)) return h[1];
    var last = F.catalog && F.catalog.lastTrack && F.catalog.lastTrack();
    if (last && $('[data-detail="' + last + '"]', stage)) return last;
    return "html";
  })();
  select(start);
  fills();

  var demo = $("#plDemo");
  if (demo && "IntersectionObserver" in window && !reduce) {
    document.documentElement.classList.add("pl-anim");
    new IntersectionObserver(function (es, o) {
      es.forEach(function (en) { if (en.isIntersecting) { demo.classList.add("is-in"); o.disconnect(); } });
    }, { threshold: 0.5 }).observe(demo);
  }
})();
