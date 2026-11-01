/* Homepage motion (GSAP 3.13 + ScrollTrigger, vendored). Progressive enhancement:
   content is fully visible without it; it is skipped for prefers-reduced-motion or if GSAP failed to load.
   Arabic is split by whole words only (never letters) so joining forms are not broken. */
(function () {
  "use strict";
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap) return;
  var mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq && mq.matches) return;
  if (ST) gsap.registerPlugin(ST);
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var heroTl = null, typed = null;

  function splitWords(el) {
    var text = el.textContent.trim();
    el.textContent = "";
    text.split(/\s+/).forEach(function (w, i, a) {
      var o = document.createElement("span"); o.className = "hm-word";
      var inner = document.createElement("span"); inner.textContent = w; o.appendChild(inner);
      el.appendChild(o);
      if (i < a.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return $$(".hm-word > span", el);
  }

  function typeCode() {
    var code = $("#heroCode");
    if (!code) return null;
    var nodes = [], w = document.createTreeWalker(code, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) nodes.push({ n: n, t: n.nodeValue });
    var total = nodes.reduce(function (s, x) { return s + x.t.length; }, 0);
    var caret = document.createElement("span"); caret.className = "hm-caret"; caret.setAttribute("aria-hidden", "true");
    code.appendChild(caret);
    var st = { v: 0 };
    function paint() {
      var left = Math.round(st.v);
      nodes.forEach(function (x) { var k = Math.max(0, Math.min(x.t.length, left)); x.n.nodeValue = x.t.slice(0, k); left -= x.t.length; });
    }
    paint();
    return gsap.to(st, { v: total, duration: 2.2, ease: "none", onUpdate: paint, onComplete: function () { nodes.forEach(function (x) { x.n.nodeValue = x.t; }); } });
  }

  function counters() {
    $$("[data-stat]").forEach(function (el) {
      var end = parseInt(el.textContent, 10);
      if (!isFinite(end) || end < 1) return;
      var o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", delay: 0.5, onUpdate: function () { el.textContent = String(Math.round(o.v)); }, onComplete: function () { el.textContent = String(end); } });
    });
  }

  function hero() {
    if (heroTl) heroTl.kill();
    if (typed) { typed.progress(1); typed.kill(); }
    var words = [].concat(splitWords($(".hm-t1")), splitWords($(".hm-t2")));
    heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl.from(".hm-kicker", { y: 14, opacity: 0, duration: 0.5 })
      .from(words, { yPercent: 110, duration: 0.8, stagger: 0.07 }, "-=0.25")
      .from([".hm-lead", ".hm-actions > *", ".hm-stats li"], { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.45")
      .from(".hm-win", { y: 40, opacity: 0, scale: 0.97, duration: 0.9 }, 0.2)
      .from(".hm-next", { y: 30, opacity: 0, duration: 0.8 }, 0.7)
      .from(".hm-marquee", { opacity: 0, duration: 0.8 }, 0.8);
    typed = typeCode();
    if (typed) typed.delay(0.9);
  }

  function reveals() {
    if (!ST) return;
    function on(trigger, targets, vars) {
      var els = $$(targets);
      if (!els.length) return;
      gsap.from(els, Object.assign({ opacity: 0, y: 28, duration: 0.7, ease: "power3.out", stagger: 0.09, clearProps: "transform,opacity",
        scrollTrigger: { trigger: trigger, start: "top 72%", once: true } }, vars || {}));
    }
    on("#courses", "#courses .hm-head > *, #courses .hm-tab");
    on("#courses .hm-stage:not([hidden])", "#courses .hm-stage:not([hidden]) .hm-stage-rail > *, #courses .hm-stage:not([hidden]) .hm-row", { stagger: 0.07 });
    on("#how", "#how .hm-head > *");
    on("#how .hm-how-list", "#how .hm-step", { y: 44, stagger: 0.15 });
    on("#owner", "#owner .hm-owner-body > *, #owner .hm-owner-photo", { y: 34, stagger: 0.1 });
    on("#start", "#start .hm-final-box > *", { y: 34, stagger: 0.12 });
    // gentle parallax on the ambient orbs
    $$(".hm-orb").forEach(function (o, i) {
      gsap.to(o, { yPercent: i ? -18 : 18, ease: "none", scrollTrigger: { trigger: o.closest(".hm-sec"), start: "top bottom", end: "bottom top", scrub: 0.6 } });
    });
    // progress bars in the step art fill as the step enters
    $$("#how .hm-step-art > i").forEach(function (b) {
      gsap.from(b, { scaleX: 0, transformOrigin: "inline-start", duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 90%", once: true } });
    });
  }

  // re-animate the rows whenever another stage is opened
  window.addEventListener("fayad:stagechange", function () {
    var rows = $$(".hm-stage:not([hidden]) .hm-stage-rail > *, .hm-stage:not([hidden]) .hm-row");
    if (!rows.length || !window.__hmMotionReady) return;
    gsap.fromTo(rows, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06, clearProps: "transform,opacity", overwrite: true });
  });

  // micro-interactions: pointer-follow glow lift on primary buttons (fine pointers only)
  function magnetic() {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    $$(".hm-cta").forEach(function (b) {
      var qx = gsap.quickTo(b, "x", { duration: 0.4, ease: "power3.out" }), qy = gsap.quickTo(b, "y", { duration: 0.4, ease: "power3.out" });
      b.addEventListener("pointermove", function (e) { var r = b.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.12); qy((e.clientY - r.top - r.height / 2) * 0.25); });
      b.addEventListener("pointerleave", function () { qx(0); qy(0); });
    });
  }

  // pointer reactions (fine pointers only): ambient glow that trails the mouse, per-card spotlight, 3D tilt, hero parallax
  function pointer() {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    var hero = $("#home"), art = $(".hm-hero-art"), orbs = $$("#home .hm-orb");
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      var t = e.target.closest && e.target.closest(".hm-row, .hm-step, .hm-next, .hm-tab, [data-tilt]");
      if (t) { var r = t.getBoundingClientRect(); t.style.setProperty("--mx", (e.clientX - r.left) + "px"); t.style.setProperty("--my", (e.clientY - r.top) + "px"); }
      if (hero && e.clientY < hero.getBoundingClientRect().bottom) {
        var nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        if (art) gsap.to(art, { x: nx * -18, y: ny * -14, duration: 0.9, ease: "power3.out", overwrite: "auto" });
        orbs.forEach(function (o, i) { gsap.to(o, { x: nx * (i ? 40 : -50), duration: 1.2, ease: "power3.out", overwrite: "auto" }); });
      }
    }, { passive: true });
    $$("[data-tilt], .hm-win").forEach(function (el) {
      var rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" }), ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener("pointermove", function (e) { var r = el.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 10); rx(-((e.clientY - r.top) / r.height - 0.5) * 10); });
      el.addEventListener("pointerleave", function () { rx(0); ry(0); });
    });
  }

  var lastLang = document.documentElement.lang;
  window.addEventListener("fayad:langchange", function () {
    if (document.documentElement.lang === lastLang) return;
    lastLang = document.documentElement.lang;
    requestAnimationFrame(function () {
      if (heroTl) heroTl.kill();
      if (typed) { typed.progress(1); typed.kill(); }
      var code = $("#heroCode .hm-caret"); if (code) code.remove();
      hero();
      if (ST) ST.refresh();
    });
  });

  function start() { hero(); counters(); reveals(); magnetic(); pointer(); window.__hmMotionReady = true; }
  // i18n re-applies text on DOMContentLoaded, so split/animate only after that
  function later() { requestAnimationFrame(start); }
  if (document.readyState === "complete") later(); else document.addEventListener("DOMContentLoaded", later);
})();
