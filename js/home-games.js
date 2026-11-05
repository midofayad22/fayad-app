/* Homepage games section: real progress from this device's game store ("fayad-game-v1"); nothing is invented. */
(function () {
  "use strict";
  var F = window.FAYAD || (window.FAYAD = {});
  var DICT = {
    ar: { "g.eyebrow": "ألعاب FAYBIT", "g.title": "تعلّم باللعب", "g.lead": "تحديات برمجية قصيرة بمراحل متدرجة، والتحقق منها فوري داخل متصفحك.", "g.arena.tag": "ساحة التحديات", "g.arena.t": "تحديات برمجية حقيقية", "g.arena.d": "محرر ومعاينة حية وتحقق فوري، بمستويات من المبتدئ إلى الخبير في HTML وCSS وJavaScript.", "g.play": "العب الآن", "g.css": "CSS", "g.flex.d": "رتّب العناصر بخصائص Flexbox حتى تطابق الهدف.", "g.sel.d": "اكتب محدد CSS يختار العناصر المطلوبة فقط.", "g.soon": "قيد التطوير", "g.zombie.d": "لعبة بقاء تتعلم فيها منطق البرمجة. لم تصدر بعد.", "g.adv.t": "FAYAD: المغامرة الكبرى", "g.adv.d": "رحلة عبر 120 مرحلة نحو الجائزة الكبرى. لم تصدر بعد.", "g.all": "مركز الألعاب ولوحة الترتيب", "g.prog": "{n} من {t} مراحل" },
    en: { "g.eyebrow": "FAYBIT Games", "g.title": "Learn by playing", "g.lead": "Short coding challenges with growing levels, checked instantly in your browser.", "g.arena.tag": "Challenge arena", "g.arena.t": "Real coding challenges", "g.arena.d": "Editor, live preview and instant checks, from beginner to expert in HTML, CSS and JavaScript.", "g.play": "Play now", "g.css": "CSS", "g.flex.d": "Arrange items with Flexbox properties until they match the target.", "g.sel.d": "Write a CSS selector that picks only the wanted elements.", "g.soon": "In development", "g.zombie.d": "A survival game that teaches programming logic. Not released yet.", "g.adv.t": "FAYAD: The Grand Adventure", "g.adv.d": "A journey through 120 levels toward the grand prize. Not released yet.", "g.all": "Games hub and leaderboard", "g.prog": "{n} of {t} levels" },
  };
  if (F.i18n && F.i18n.extend) F.i18n.extend(DICT);
  var TOTAL = { arena: 30, flex: 10, sel: 10 };
  function solved(d, ids) { var n = 0; ids.forEach(function (id) { n += Object.keys((d.games && d.games[id] && d.games[id].solved) || {}).length; }); return n; }
  function paint() {
    var d = { games: {} };
    try { d = JSON.parse(localStorage.getItem("fayad-game-v1")) || d; } catch (e) { /* none yet */ }
    var lang = document.documentElement.lang === "en" ? "en" : "ar";
    var groups = { arena: ["html", "css", "js"], flex: ["flex"], sel: ["sel"] };
    Array.prototype.forEach.call(document.querySelectorAll("[data-prog]"), function (el) {
      var k = el.getAttribute("data-prog"), n = solved(d, groups[k] || []), t = TOTAL[k];
      el.innerHTML = '<span class="gm-bar"><i style="width:' + Math.round((n / t) * 100) + '%"></i></span><span class="gm-meta"></span>';
      el.querySelector(".gm-meta").textContent = DICT[lang]["g.prog"].replace("{n}", n).replace("{t}", t);
    });
  }
  paint();
  document.addEventListener("fayad:langchange", function () { if (F.i18n && F.i18n.apply) F.i18n.apply(); paint(); });
})();
