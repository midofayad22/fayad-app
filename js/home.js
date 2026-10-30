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
      "h.title": "من أول سطر كود إلى تطبيق ويب حقيقي",
      "h.desc": "مسار مرتّب يبدأ بأساسيات الحاسوب والبرمجة، ثم HTML وCSS وJavaScript، وينتهي بأطر العمل. كل درس: شرح، مثال، تمرين، واختبار.",
      "h.cta": "ابدأ من الأساسيات",
      "h.browse": "استعرض المسار كاملًا",
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
      "t.title": "المسار التعليمي",
      "t.sub": "أربع مراحل مرتّبة. اتبعها بالترتيب، أو ابدأ من المرحلة التي تناسبك.",
      "t.cssfw": "أطر CSS",
      "t.ajs": "النطاق والـ Closures والـ prototypes وProxy والمولدات وحلقة الأحداث والـ async وأنماط التصميم.",
      "t.bs": "الشبكة والأدوات المساعدة والنماذج والمكونات التفاعلية والوضع الداكن وRTL (Bootstrap 5.3).",
      "t.tw": "فلسفة Utility-First والتخطيط والتجاوب والحالات والوضع الداكن والتخصيص بـ @theme (Tailwind v4).",
      "r.ajs": "JavaScript متقدم", "r.ajs.d": "Closures وAsync وProxy", "r.cssfw": "Bootstrap وTailwind", "r.cssfw.d": "أطر CSS جاهزة",
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
      "nav.how": "كيف تتعلم",
      "h.continue": "تابع التعلم",
      "st.1": "الأساسيات",
      "st.1.s": "الأساسيات",
      "st.1.d": "افهم كيف يعمل الحاسوب وكيف يفكر المبرمج قبل أي لغة.",
      "st.2": "أساسيات الويب",
      "st.2.s": "أساسيات الويب",
      "st.2.d": "ابنِ الصفحة وصمّمها وأضف التفاعل: HTML وCSS وJavaScript.",
      "st.3": "تعمّق وأدوات",
      "st.3.s": "تعمّق",
      "st.3.d": "JavaScript المتقدم، وأطر CSS الجاهزة لتسريع العمل.",
      "st.4": "أطر العمل",
      "st.4.s": "أطر العمل",
      "st.4.d": "ابنِ واجهات كاملة بإطار حديث: اختر React أو Vue أو Angular.",
      "st.meta": "{c} مسار · {l} درسًا",
      "how.title": "كيف يعمل كل درس",
      "how.1": "افهم الفكرة",
      "how.1.d": "شرح مختصر للمفهوم مع مثال كامل يمكنك قراءته.",
      "how.2": "جرّب بنفسك",
      "how.2.d": "عدّل المثال وشغّله في محرر الدرس، ويُنفَّذ كودك في بيئة معزولة لا تمس الموقع.",
      "how.3": "اختبر نفسك",
      "how.3.d": "أسئلة بعد كل درس، ويُحسب الدرس منجزًا عند الإجابة الصحيحة. يُحفظ تقدمك على جهازك.",
      "fin.title": "جاهز لتبدأ؟",
      "n.start": "ابدأ من هنا",
      "n.start.d": "الخطوة الأولى في المسار",
      "n.open": "افتح المسار",
      "n.continue": "تابع من حيث توقفت",
      "n.resume": "تابع",
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
      "h.title": "From your first line of code to a real web app",
      "h.desc": "An ordered path that starts with computer and programming fundamentals, then HTML, CSS and JavaScript, and ends with frameworks. Every lesson: explanation, example, practice and a quiz.",
      "h.cta": "Start with the fundamentals",
      "h.browse": "See the full path",
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
      "t.title": "The learning path",
      "t.sub": "Four ordered stages. Follow them in order, or start at the stage that fits you.",
      "t.cssfw": "CSS frameworks",
      "t.ajs": "Scope, closures, prototypes, Proxy, generators, the event loop, async patterns and design patterns.",
      "t.bs": "Grid, utilities, forms, interactive components, dark mode and RTL (Bootstrap 5.3).",
      "t.tw": "Utility-first thinking, layout, responsive design, states, dark mode and @theme customization (Tailwind v4).",
      "r.ajs": "Advanced JavaScript", "r.ajs.d": "Closures, async, Proxy", "r.cssfw": "Bootstrap & Tailwind", "r.cssfw.d": "CSS frameworks",
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
      "nav.how": "How it works",
      "h.continue": "Continue learning",
      "st.1": "Fundamentals",
      "st.1.s": "Fundamentals",
      "st.1.d": "Understand how a computer works and how a programmer thinks, before any language.",
      "st.2": "Web foundations",
      "st.2.s": "Web foundations",
      "st.2.d": "Build, style and add behaviour to a page: HTML, CSS and JavaScript.",
      "st.3": "Go deeper",
      "st.3.s": "Go deeper",
      "st.3.d": "Advanced JavaScript, and ready-made CSS frameworks to speed up your work.",
      "st.4": "Frameworks",
      "st.4.s": "Frameworks",
      "st.4.d": "Build complete interfaces with a modern framework: pick React, Vue or Angular.",
      "st.meta": "{c} courses · {l} lessons",
      "how.title": "How each lesson works",
      "how.1": "Understand the idea",
      "how.1.d": "A short explanation of the concept with a complete example you can read.",
      "how.2": "Try it yourself",
      "how.2.d": "Edit the example and run it in the lesson editor. Your code runs in an isolated sandbox that cannot touch the site.",
      "how.3": "Test yourself",
      "how.3.d": "Questions after every lesson; a lesson counts as completed once you answer correctly. Your progress is saved on your device.",
      "fin.title": "Ready to start?",
      "n.start": "Start here",
      "n.start.d": "The first step on the path",
      "n.open": "Open course",
      "n.continue": "Pick up where you left off",
      "n.resume": "Continue",
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

  // ---- next step (hero card + hero button) ----
  var NAMES = { com: "Computer Fundamentals", prg: "Programming Fundamentals", html: "HTML", css: "CSS", js: "JavaScript", ajs: "Advanced JavaScript", bs: "Bootstrap 5", tw: "Tailwind CSS", react: "React", vue: "Vue", angular: "Angular" };
  var BADGES = { com: "CS", prg: "{ }", html: "HTML", css: "CSS", js: "JS", ajs: "+JS", bs: "BS", tw: "TW", react: "Re", vue: "Vue", angular: "Ng" };

  function pickNext(p) {
    var last = F.catalog.lastTrack();
    var open = function (t) { return p[t.id].started && !(p[t.id].done !== null && p[t.id].done >= p[t.id].total); };
    if (last && tracksById[last] && open(tracksById[last])) return tracksById[last];
    var any = F.catalog.tracks.filter(open)[0];
    return any || null;
  }

  function renderNext() {
    var card = $("#nextStep");
    if (!card) return;
    var p = F.catalog.progress();
    var t = pickNext(p);
    var tr = t || tracksById.com;
    var info = p[tr.id];
    card.setAttribute("data-course", tr.id);
    $("#nextBadge").textContent = BADGES[tr.id];
    $("#nextName").textContent = NAMES[tr.id];
    $("#nextGo").setAttribute("href", tr.path.replace(/^\//, ""));
    var label = $("#nextLabel"), status = $("#nextStatus"), goText = $("#nextGoText"), bar = $("#nextBar");
    var cta = $("#heroCta"), ctaText = cta && $("span", cta), fin = $("#finalCta");
    if (t) {
      label.setAttribute("data-i18n", "n.continue"); label.textContent = F.i18n.t("n.continue");
      if (info.done !== null && info.done > 0) status.textContent = F.i18n.t("c.done", { done: info.done, total: info.total });
      else if (info.current !== null) status.textContent = F.i18n.t("c.at", { n: info.current + 1, total: info.total });
      else status.textContent = F.i18n.t("c.opened");
      status.removeAttribute("data-i18n");
      goText.setAttribute("data-i18n", "n.resume"); goText.textContent = F.i18n.t("n.resume");
      if (info.percent !== null) { bar.hidden = false; $("span", bar).style.width = info.percent + "%"; bar.setAttribute("aria-valuenow", String(info.percent)); } else bar.hidden = true;
      if (ctaText) { ctaText.setAttribute("data-i18n", "h.continue"); ctaText.textContent = F.i18n.t("h.continue"); }
    } else {
      label.setAttribute("data-i18n", "n.start"); label.textContent = F.i18n.t("n.start");
      status.setAttribute("data-i18n", "n.start.d"); status.textContent = F.i18n.t("n.start.d");
      goText.setAttribute("data-i18n", "n.open"); goText.textContent = F.i18n.t("n.open");
      bar.hidden = true;
      if (ctaText) { ctaText.setAttribute("data-i18n", "h.cta"); ctaText.textContent = F.i18n.t("h.cta"); }
    }
    if (cta) cta.setAttribute("href", tr.path.replace(/^\//, ""));
    if (fin) { fin.setAttribute("href", tr.path.replace(/^\//, "")); var ft = $("span", fin); if (ft && ctaText) ft.textContent = ctaText.textContent; }
  }

  // ---- stage meta + sticky stage nav highlight ----
  function stageMeta() {
    $$("[data-stage-meta]").forEach(function (el) {
      var ids = el.getAttribute("data-stage-meta").split(",");
      var lessons = ids.reduce(function (n, id) { return n + (tracksById[id] ? tracksById[id].total : 0); }, 0);
      el.textContent = F.i18n.t("st.meta", { c: ids.length, l: lessons });
    });
  }
  function watchStages() {
    var links = $$("[data-stage-link]");
    var stages = $$("[data-stage]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target.getAttribute("data-stage");
        links.forEach(function (a) { if (a.getAttribute("data-stage-link") === n) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
        var cur = $(".hm-stagenav a[aria-current]");
        if (cur && cur.scrollIntoView && cur.parentNode.scrollWidth > cur.parentNode.clientWidth) cur.parentNode.scrollTo({ left: cur.offsetLeft - cur.parentNode.clientWidth / 2 + cur.clientWidth / 2, behavior: "smooth" });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    stages.forEach(function (s) { io.observe(s); });
  }

  function render() { fillStats(); paintProgress(); renderNext(); stageMeta(); }

  window.addEventListener("fayad:langchange", render);
  // progress can change in another tab, or when returning via the back button
  window.addEventListener("storage", render);
  window.addEventListener("pageshow", render);
  F.i18n.apply();
  render();
  watchStages();
})();
