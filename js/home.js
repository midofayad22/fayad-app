/*
  FAYAD homepage: interface strings (Arabic + English), roadmap/course status, and "continue learning".
  Requires js/i18n.js and js/catalog.js. Never writes lesson progress; it only reads it.
  Course/track names and code terms are kept in Latin script in both languages on purpose.
*/
(function () {
  var F = window.FAYAD;
  if (!F || !F.i18n || !F.catalog) return;

  F.i18n.extend({
    ar: {
      "nav.home": "الرئيسية",
      "menu.account": "حسابي", "menu.dashboard": "لوحة التقدم", "menu.dashboard.sub": "دروسك ونقاطك وإنجازاتك", "menu.profile": "الملف الشخصي", "menu.profile.sub": "الحساب وبيانات التقدم",
      "nav.courses": "المسارات",
      "nav.roadmap": "خريطة التعلم",
      "nav.about": "عن المنصة",
      "nav.label": "التنقل الرئيسي",
      "nav.signin": "تسجيل الدخول",
      "menu.open": "فتح القائمة",
      "menu.close": "إغلاق القائمة",
      "menu.title": "استكشف",
      "menu.learn": "التعلم",
      "menu.courses": "كل المسارات",
      "menu.courses.sub": "اختر المسار المناسب وابدأ",
      "menu.roadmap": "خريطة التعلم",
      "menu.roadmap.sub": "الترتيب المقترح من الأساسيات إلى الأطر",
      "menu.web": "أساسيات الويب",
      "menu.frameworks": "أطر العمل",
      "menu.fundamentals": "الأساسيات",
      "menu.html.sub": "هيكل الصفحة",
      "menu.css.sub": "التصميم والتنسيق",
      "menu.js.sub": "المنطق والتفاعل",
      "menu.react.sub": "واجهات من مكونات",
      "menu.angular.sub": "تطبيقات منظمة وقابلة للتوسع",
      "menu.vue.sub": "إطار مرن لبناء الواجهات",
      "menu.com.sub": "كيف يعمل الحاسوب",
      "menu.prg.sub": "المنطق وحل المشكلات",
      "menu.about": "عن المنصة وصاحبها",
      "menu.about.sub": "من يقف وراء FAYAD",
      "menu.contact": "تواصل",
      "h.kicker": "منصة FAYAD التعليمية",
      "h.title": "تعلّم تطوير الويب خطوة بخطوة",
      "h.desc": "مسار واضح من أساسيات الحاسوب والبرمجة حتى HTML وCSS وJavaScript وأطر العمل، بدروس تفاعلية وتمارين تطبيقية.",
      "h.cta": "ابدأ من الأساسيات",
      "h.browse": "تصفّح كل المسارات",
      "h.stat.tracks": "مسارات",
      "h.stat.lessons": "درسًا",
      "h.preview": "مثال من درس تفاعلي",
      "c.title": "تابع من حيث توقفت",
      "c.sub": "يُحفظ تقدمك على هذا الجهاز.",
      "c.last": "آخر مسار فتحته",
      "c.btn": "تابع",
      "c.done": "أنجزت {done} من {total} درسًا",
      "c.at": "الدرس {n} من {total}",
      "c.opened": "فتحت هذا المسار سابقًا",
      "r.title": "خريطة التعلم",
      "r.sub": "اتبع الترتيب للحصول على أفضل نتيجة، أو انتقل مباشرة إلى ما تحتاجه.",
      "r.com": "أساسيات الحاسوب",
      "r.prg": "أساسيات البرمجة",
      "r.html": "HTML",
      "r.css": "CSS",
      "r.js": "JavaScript",
      "r.frameworks": "أطر العمل",
      "r.projects": "المشاريع",
      "r.com.d": "كيف يعمل الحاسوب",
      "r.prg.d": "التفكير البرمجي",
      "r.html.d": "هيكل الصفحة",
      "r.css.d": "التصميم",
      "r.js.d": "التفاعل والمنطق",
      "r.frameworks.d": "React وVue وAngular",
      "r.projects.d": "طبّق ما تعلمته",
      "r.soon": "قريبًا",
      "r.step": "الخطوة {n}",
      "t.title": "المسارات",
      "t.sub": "ثمانية مسارات بدروس عربية، يمكنك البدء من أي مسار.",
      "t.fundamentals": "الأساسيات",
      "t.web": "أساسيات الويب",
      "t.frameworks": "أطر العمل",
      "t.lessons": "{n} درسًا",
      "t.open": "افتح المسار",
      "t.com": "من العتاد والمعالج والذاكرة إلى أنظمة التشغيل والشبكات والأمن السيبراني.",
      "t.prg": "المتغيرات والشروط والحلقات والدوال والمصفوفات والكائنات وحل المشكلات.",
      "t.html": "بنية الصفحة والنصوص والروابط والجداول والنماذج والعناصر الدلالية وإمكانية الوصول.",
      "t.css": "المحددات ونموذج الصندوق وFlexbox وGrid والتصميم المتجاوب والحركة.",
      "t.js": "أساسيات اللغة وDOM والأحداث والوحدات وPromises وFetch.",
      "t.react": "المكونات وJSX وProps وState وHooks والتوجيه وبنية التطبيق.",
      "t.vue": "القوالب والتفاعلية والمكونات وComposition API وVue Router.",
      "t.angular": "المكونات والقوالب والتوجيهات والخدمات والتوجيه والنماذج وRxJS.",
      "f.text": "تعلّم بالممارسة: اكتب الكود، جرّبه، أخطئ، ثم أصلح.",
      "f.about": "عن المنصة",
      "f.rights": "© 2026 FAYAD. من تطوير Abdullhamid, Fayad.",
      "f.tag": "Learn · Build · Become",
      "f.nav": "روابط التذييل",
    },
    en: {
      "nav.home": "Home",
      "menu.account": "My account", "menu.dashboard": "Progress dashboard", "menu.dashboard.sub": "Your lessons, points and achievements", "menu.profile": "Profile", "menu.profile.sub": "Account and progress data",
      "nav.courses": "Courses",
      "nav.roadmap": "Roadmap",
      "nav.about": "About",
      "nav.label": "Main navigation",
      "nav.signin": "Sign in",
      "menu.open": "Open menu",
      "menu.close": "Close menu",
      "menu.title": "Explore",
      "menu.learn": "Learn",
      "menu.courses": "All courses",
      "menu.courses.sub": "Pick a course and start",
      "menu.roadmap": "Learning roadmap",
      "menu.roadmap.sub": "The suggested order, from fundamentals to frameworks",
      "menu.web": "Web foundations",
      "menu.frameworks": "Frameworks",
      "menu.fundamentals": "Fundamentals",
      "menu.html.sub": "Page structure",
      "menu.css.sub": "Design and layout",
      "menu.js.sub": "Logic and interactivity",
      "menu.react.sub": "Component-based interfaces",
      "menu.angular.sub": "Structured, scalable apps",
      "menu.vue.sub": "A flexible UI framework",
      "menu.com.sub": "How a computer works",
      "menu.prg.sub": "Logic and problem solving",
      "menu.about": "About the platform",
      "menu.about.sub": "Who is behind FAYAD",
      "menu.contact": "Contact",
      "h.kicker": "FAYAD Learning Platform",
      "h.title": "Learn web development, step by step",
      "h.desc": "A clear path from computer and programming fundamentals to HTML, CSS, JavaScript and frameworks, with interactive lessons and hands-on practice.",
      "h.cta": "Start with the fundamentals",
      "h.browse": "Browse all courses",
      "h.stat.tracks": "courses",
      "h.stat.lessons": "lessons",
      "h.preview": "A taste of an interactive lesson",
      "c.title": "Pick up where you left off",
      "c.sub": "Your progress is saved on this device.",
      "c.last": "Last course you opened",
      "c.btn": "Continue",
      "c.done": "{done} of {total} lessons completed",
      "c.at": "Lesson {n} of {total}",
      "c.opened": "You have opened this course before",
      "r.title": "Learning roadmap",
      "r.sub": "Follow the order for the best results, or jump straight to what you need.",
      "r.com": "Computer Fundamentals",
      "r.prg": "Programming Fundamentals",
      "r.html": "HTML",
      "r.css": "CSS",
      "r.js": "JavaScript",
      "r.frameworks": "Frameworks",
      "r.projects": "Projects",
      "r.com.d": "How computers work",
      "r.prg.d": "Thinking like a programmer",
      "r.html.d": "Page structure",
      "r.css.d": "Design",
      "r.js.d": "Logic and interactivity",
      "r.frameworks.d": "React, Vue and Angular",
      "r.projects.d": "Apply what you learned",
      "r.soon": "Coming soon",
      "r.step": "Step {n}",
      "t.title": "Courses",
      "t.sub": "Eight courses with Arabic lessons. Start from any of them.",
      "t.fundamentals": "Fundamentals",
      "t.web": "Web foundations",
      "t.frameworks": "Frameworks",
      "t.lessons": "{n} lessons",
      "t.open": "Open course",
      "t.com": "From hardware, CPU and memory to operating systems, networks and cybersecurity.",
      "t.prg": "Variables, conditions, loops, functions, arrays, objects and problem solving.",
      "t.html": "Page structure, text, links, tables, forms, semantic elements and accessibility.",
      "t.css": "Selectors, the box model, Flexbox and Grid, responsive design and animation.",
      "t.js": "Language basics, the DOM and events, modules, Promises and Fetch.",
      "t.react": "Components, JSX, props, state, hooks, routing and app structure.",
      "t.vue": "Templates, reactivity, components, the Composition API and Vue Router.",
      "t.angular": "Components, templates, directives, services, routing, forms and RxJS.",
      "f.text": "Learn by doing: write the code, try it, break it, then fix it.",
      "f.about": "About",
      "f.rights": "© 2026 FAYAD. Built by Abdullhamid, Fayad.",
      "f.tag": "Learn · Build · Become",
      "f.nav": "Footer links",
    },
  });

  var tracksById = {};
  F.catalog.tracks.forEach(function (t) { tracksById[t.id] = t; });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // ---- static numbers derived from the catalog (never hard-coded in markup) ----
  function fillStats() {
    var tr = $("[data-stat='tracks']");
    var ls = $("[data-stat='lessons']");
    if (tr) tr.textContent = String(F.catalog.tracks.length);
    if (ls) ls.textContent = String(F.catalog.totalLessons());
    $$("[data-lessons-for]").forEach(function (el) {
      var t = tracksById[el.getAttribute("data-lessons-for")];
      if (t) el.textContent = F.i18n.t("t.lessons", { n: t.total });
    });
  }

  // ---- per-card progress bars ----
  function paintProgress() {
    var p = F.catalog.progress();
    $$("[data-course-card]").forEach(function (card) {
      var id = card.getAttribute("data-course-card");
      var info = p[id];
      var bar = $(".hm-bar", card);
      var label = $(".hm-progress-label", card);
      if (!bar || !label || !info) return;
      if (info.done !== null && info.done > 0) {
        bar.hidden = false;
        $("span", bar).style.width = info.percent + "%";
        bar.setAttribute("aria-valuenow", String(info.percent));
        label.hidden = false;
        label.textContent = F.i18n.t("c.done", { done: info.done, total: info.total });
      } else if (info.current !== null) {
        bar.hidden = true;
        label.hidden = false;
        label.textContent = F.i18n.t("c.at", { n: info.current + 1, total: info.total });
      } else {
        bar.hidden = true;
        label.hidden = true;
      }
    });
  }

  // ---- continue learning ----
  function renderContinue() {
    var section = $("#continue");
    var list = $("#continueList");
    if (!section || !list) return;
    var p = F.catalog.progress();
    var started = F.catalog.tracks.filter(function (t) { return p[t.id].started; });
    if (!started.length) { section.hidden = true; list.textContent = ""; return; }

    var last = F.catalog.lastTrack();
    started.sort(function (a, b) {
      if (a.id === last) return -1;
      if (b.id === last) return 1;
      return F.catalog.tracks.indexOf(a) - F.catalog.tracks.indexOf(b);
    });

    list.textContent = "";
    started.slice(0, 3).forEach(function (t) {
      var info = p[t.id];
      var a = document.createElement("a");
      a.className = "hm-continue-card";
      a.href = t.path;
      a.setAttribute("data-course", t.id);

      var top = document.createElement("span");
      top.className = "hm-continue-top";
      var name = document.createElement("strong");
      var FRAMEWORK_NAMES = { react: "React", vue: "Vue", angular: "Angular" };
      name.textContent = FRAMEWORK_NAMES[t.id] || F.i18n.t("r." + t.id);
      top.appendChild(name);
      if (t.id === last) {
        var badge = document.createElement("em");
        badge.textContent = F.i18n.t("c.last");
        top.appendChild(badge);
      }
      a.appendChild(top);

      var status = document.createElement("span");
      status.className = "hm-continue-status";
      if (info.done !== null && info.done > 0) status.textContent = F.i18n.t("c.done", { done: info.done, total: info.total });
      else if (info.current !== null && info.current > 0) status.textContent = F.i18n.t("c.at", { n: info.current + 1, total: info.total });
      else status.textContent = F.i18n.t("c.opened");
      a.appendChild(status);

      if (info.percent !== null) {
        var bar = document.createElement("span");
        bar.className = "hm-bar";
        bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-valuemin", "0");
        bar.setAttribute("aria-valuemax", "100");
        bar.setAttribute("aria-valuenow", String(info.percent));
        var fill = document.createElement("span");
        fill.style.width = info.percent + "%";
        bar.appendChild(fill);
        a.appendChild(bar);
      }

      var go = document.createElement("span");
      go.className = "hm-continue-go";
      go.textContent = F.i18n.t("c.btn");
      a.appendChild(go);
      list.appendChild(a);
    });
    section.hidden = false;
  }

  function render() { fillStats(); paintProgress(); renderContinue(); }

  window.addEventListener("fayad:langchange", render);
  // progress can change in another tab, or when returning via the back button
  window.addEventListener("storage", render);
  window.addEventListener("pageshow", render);
  F.i18n.apply();
  render();
})();
