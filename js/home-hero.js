/* FAYBIT home hero: decides between the discovery view (new visitors) and the continue view (signed in, or
   anyone with saved progress), and builds the track picker from the real track tiles on the page.
   No data is invented: names, levels, outcomes, lesson counts and links are read from the tiles below. */
(function () {
  "use strict";
  var root = document.documentElement;
  var pick = document.getElementById("hmPick");
  var tabsEl = document.getElementById("pickTabs");
  var panel = document.getElementById("pickPanel");
  if (!pick || !tabsEl || !panel) return;

  function t(k) { return (window.FAYAD && FAYAD.i18n && FAYAD.i18n.t(k)) || k; }
  function hasProgress() {
    try { var c = window.FAYAD && FAYAD.catalog; if (!c) return false; var p = c.progress(); return Object.keys(p).some(function (id) { return p[id] && p[id].done > 0; }); } catch (e) { return false; }
  }
  function returning() { var u = window.FAYAD && FAYAD.user && FAYAD.user(); return !!u || hasProgress(); }

  var tiles = [], cur = "html";
  function readTiles() {
    tiles = Array.prototype.slice.call(document.querySelectorAll("[data-course-card]")).map(function (a) {
      var q = function (s) { var e = a.querySelector(s); return e ? e.textContent.trim() : ""; };
      return { id: a.getAttribute("data-course-card"), name: q(".tk-title strong") || q("strong"), lv: q(".tk-lv"), oc: q(".tk-oc"), topics: q(".tk-topics"), count: q(".hm-count"), href: a.getAttribute("href"), glyph: q(".tk-glyph") };
    });
  }

  var spotTimer = 0;
  function calm() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function centerTab(b) {
    try { var r = tabsEl; if (r.scrollWidth > r.clientWidth + 4) { var x = b.offsetLeft - (r.clientWidth - b.offsetWidth) / 2; if (getComputedStyle(r).direction === "rtl") x = b.offsetLeft - (r.clientWidth - b.offsetWidth) / 2; r.scrollTo({ left: x, behavior: calm() ? "auto" : "smooth" }); } } catch (e) {}
  }
  // second activation: glide down to the real track card in the courses section and spotlight it (that card opens the track)
  function goCourse(id) {
    var card = document.querySelector('[data-course-card="' + id + '"]');
    if (!card) return;
    var inRail = !!card.closest(".tk-rail");
    try { card.scrollIntoView({ behavior: calm() ? "auto" : "smooth", block: "center", inline: inRail ? "center" : "nearest" }); } catch (e) { card.scrollIntoView(); }
    document.querySelectorAll(".tk.is-spot").forEach(function (n) { n.classList.remove("is-spot"); });
    clearTimeout(spotTimer);
    setTimeout(function () { card.classList.add("is-spot"); spotTimer = setTimeout(function () { card.classList.remove("is-spot"); }, 2400); }, calm() ? 0 : 450);
  }

  function paintPanel(animate) {
    var d = tiles.filter(function (x) { return x.id === cur; })[0] || tiles[0];
    if (!d) return;
    panel.setAttribute("data-course", d.id);
    panel.innerHTML = "";
    var h = document.createElement("div"); h.className = "hm-pick-card";
    h.innerHTML = '<div class="hm-pick-top"><span class="hm-pick-glyph" aria-hidden="true"></span><div><strong class="hm-pick-name"></strong><span class="hm-pick-meta"></span></div></div><p class="hm-pick-oc"></p><p class="hm-pick-topics"></p><a class="hm-pick-go"></a>';
    h.querySelector(".hm-pick-glyph").textContent = d.glyph || d.name.slice(0, 2);
    h.querySelector(".hm-pick-name").textContent = d.name;
    h.querySelector(".hm-pick-meta").textContent = [d.lv, d.count].filter(Boolean).join(" · ");
    h.querySelector(".hm-pick-oc").textContent = d.oc;
    h.querySelector(".hm-pick-topics").textContent = d.topics;
    var go = h.querySelector(".hm-pick-go"); go.href = "#courses"; go.textContent = t("pk.more") + " ";
    go.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>');
    h.addEventListener("click", function (e) { if (e.target.closest("a") && e.target.closest("a") !== go) return; e.preventDefault(); goCourse(d.id); });
    if (animate) h.classList.add("is-new");
    panel.appendChild(h);
    Array.prototype.forEach.call(tabsEl.children, function (b) {
      var on = b.getAttribute("data-id") === d.id; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1;
    });
  }

  function paintTabs() {
    tabsEl.innerHTML = "";
    tiles.forEach(function (d) {
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("data-id", d.id); b.setAttribute("data-course", d.id);
      b.innerHTML = '<i aria-hidden="true"></i><span class="pk-t"><b></b><small></small></span>';
      b.querySelector("i").textContent = d.glyph || d.name.slice(0, 2); b.querySelector("b").textContent = d.name; b.querySelector("small").textContent = d.count || d.lv || "";
      b.addEventListener("click", function () { if (cur === d.id && b.getAttribute("aria-selected") === "true") { goCourse(d.id); return; } cur = d.id; paintPanel(true); centerTab(b); });
      b.addEventListener("keydown", function (e) {
        var k = e.key, i = tiles.indexOf(d), n = null, rtl = getComputedStyle(tabsEl).direction === "rtl";
        if (k === "ArrowRight") n = i + (rtl ? -1 : 1); else if (k === "ArrowLeft") n = i + (rtl ? 1 : -1); else if (k === "Home") n = 0; else if (k === "End") n = tiles.length - 1;
        if (n === null) return; e.preventDefault(); n = (n + tiles.length) % tiles.length; cur = tiles[n].id; paintPanel(true); tabsEl.children[n].focus();
      });
      tabsEl.appendChild(b);
    });
  }

  function setView() {
    var back = returning();
    root.classList.toggle("hero-back", back);
    root.classList.toggle("hero-pick", !back && tiles.length > 0);
    pick.hidden = back || !tiles.length;
  }

  function addHint() {
    if (pick.querySelector(".hm-pick-hint")) return;
    var lab = pick.querySelector(".hm-pick-label"); if (!lab) return;
    var h = document.createElement("span"); h.className = "hm-pick-hint"; h.setAttribute("aria-hidden", "true");
    h.innerHTML = '<span data-hint></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    lab.insertAdjacentElement("afterend", h);
    tabsEl.addEventListener("scroll", function () { pick.classList.toggle("is-scrolled", Math.abs(tabsEl.scrollLeft) > 8); }, { passive: true });
  }
  function hintText() { var e = pick.querySelector("[data-hint]"); if (e) e.textContent = t("pk.swipe"); }

  function init() {
    readTiles(); if (!tiles.length) return;
    if (!tiles.some(function (x) { return x.id === cur; })) cur = tiles[0].id;
    paintTabs(); paintPanel(false); setView(); addHint(); hintText();
  }
  function refresh() { readTiles(); paintTabs(); paintPanel(false); setView(); hintText(); }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.addEventListener("fayad:langchange", function () { setTimeout(refresh, 60); });
  window.addEventListener("fayad-auth-changed", setView);
  window.addEventListener("storage", setView);
  window.addEventListener("load", function () { setTimeout(refresh, 120); }); // counts are filled by home.js after catalog is ready
})();
