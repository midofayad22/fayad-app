/* About page: bilingual strings. Facts shown here come from the course catalog, never hard-coded twice. */
(function () {
  var F = window.FAYAD;
  if (!F || !F.i18n) return;

  F.i18n.extend({
    ar: {
      "nav.home": "الرئيسية",
      "nav.courses": "المسارات",
      "nav.about": "عن المنصة",
      "nav.label": "التنقل الرئيسي",
      "a.kicker": "عن المنصة وصاحبها",
      "a.explore": "استكشف المسارات",
      "a.fayad.title": "عن منصة FAYBIT",
      "a.fayad.p1": "FAYBIT منصة تعليمية تفاعلية تهدف إلى جعل تعلم تطوير الويب أكثر تنظيمًا وعملية: تبدأ من أساسيات الحاسوب والبرمجة، ثم HTML وCSS وJavaScript، ثم أطر العمل.",
      "a.fact.tracks": "مسارات",
      "a.fact.lessons": "درسًا",
      "a.fact.lang": "الواجهة والدروس بالعربية والإنجليزية",
      "a.fact.theme": "وضع فاتح وداكن",
      "a.fayad.note": "يُحفظ تقدمك على جهازك. وتُضاف مسارات ومزايا جديدة تدريجيًا.",
      "a.toc": "في هذه الصفحة", "a.arch.title": "البنية والمنهجية",
      "a.arch.1.t": "موقع ثابت وسريع", "a.arch.1.d": "صفحات HTML وCSS وJavaScript بلا إطار ثقيل، تُقدَّم من Vercel.",
      "a.arch.2.t": "محرك دروس مشترك", "a.arch.2.d": "كل المسارات تعمل بنفس المحرك، فتتشابه التجربة وتبقى الصيانة بسيطة.",
      "a.arch.3.t": "تقدم محفوظ على جهازك", "a.arch.3.d": "يُحفظ التقدم في متصفحك على هذا الجهاز. الحساب يحفظ اسمك وصورتك وتفضيلاتك.",
      "a.arch.4.t": "تعلّم بالتطبيق", "a.arch.4.d": "شرح ثم مثال ثم تجربة ثم اختبار قصير، وألعاب صغيرة لتثبيت الفكرة.",
      "a.what.title": "ما هي FAYBIT؟",
      "a.what.p1": "FAYBIT منصة لتعلم تطوير الويب بالعربية، مبنية على مسار مرتّب: أساسيات الحاسوب والبرمجة أولًا، ثم HTML وCSS وJavaScript، ثم أدوات وأطر العمل.",
      "a.how.1": "في كل درس شرح للفكرة ومثال كامل.",
      "a.how.2": "أمثلة قابلة للتجربة في معظم الدروس. تُنفَّذ أكواد HTML وCSS وJavaScript وVue وBootstrap وTailwind فعليًا داخل بيئة معزولة في المتصفح، أما معاينة React وAngular فمبسّطة ولا تنفّذ الكود.",
      "a.how.3": "اختبار قصير بعد كل درس، ويُحتسب الدرس منجزًا عند الإجابة الصحيحة عن أسئلته.",
      "a.avail.title": "ما المتاح الآن",
      "a.avail.p1": "يضم الموقع {c} مسارًا و{l} درسًا.",
      "a.avail.p2": "واجهة الموقع (القوائم والأزرار) تعمل بالعربية والإنجليزية في معظم الصفحات. ونص الدروس نفسه متوفر بالعربية والإنجليزية في كل المسارات الموضحة أدناه.",
      "a.table.cap": "المسارات وعدد دروسها وتوفر دروسها بالإنجليزية",
      "a.table.course": "المسار", "a.table.lessons": "الدروس", "a.table.en": "الدروس بالإنجليزية",
      "a.en.full": "متوفرة", "a.en.partial": "جزئية", "a.en.none": "غير متوفرة بعد",
      "a.state.title": "تقدمك وحسابك",
      "a.state.p1": "يُحفظ تقدمك في متصفحك على هذا الجهاز. يمكنك إنشاء حساب وتسجيل الدخول ليحفظ اسمك وصورتك وتفضيلاتك.",
      "a.state.p2": "قيد العمل: تعميق شرح الدروس وإضافة المزيد من التمارين التطبيقية.",
      "a.back": "العودة إلى FAYBIT",
    },
    en: {
      "a.toc": "On this page", "a.arch.title": "Architecture & method",
      "a.arch.1.t": "A static, fast site", "a.arch.1.d": "Plain HTML, CSS and JavaScript pages without a heavy framework, served from Vercel.",
      "a.arch.2.t": "One shared lesson engine", "a.arch.2.d": "Every course runs on the same engine, so the experience is consistent and easy to maintain.",
      "a.arch.3.t": "Progress kept on your device", "a.arch.3.d": "Progress is saved in your browser on this device. An account keeps your name, picture and preferences.",
      "a.arch.4.t": "Learn by doing", "a.arch.4.d": "Explanation, example, a try-it step and a short quiz, plus small games to lock the idea in.",
      "nav.home": "Home",
      "nav.courses": "Courses",
      "nav.about": "About",
      "nav.label": "Main navigation",
      "a.kicker": "About the platform and its creator",
      "a.explore": "Explore the courses",
      "a.fayad.title": "About FAYBIT",
      "a.fayad.p1": "FAYBIT is an interactive learning platform that makes learning web development more organised and hands-on: it starts with computer and programming fundamentals, then HTML, CSS and JavaScript, then frameworks.",
      "a.fact.tracks": "courses",
      "a.fact.lessons": "lessons",
      "a.fact.lang": "Interface and lessons in Arabic and English",
      "a.fact.theme": "Light and dark themes",
      "a.fayad.note": "Your progress is saved on your device. New courses and features are being added step by step.",
      "a.what.title": "What is FAYBIT?",
      "a.what.p1": "FAYBIT is a platform for learning web development in Arabic, built around an ordered path: computer and programming fundamentals first, then HTML, CSS and JavaScript, then tools and frameworks.",
      "a.how.1": "Every lesson has an explanation of the idea and a complete example.",
      "a.how.2": "Most lessons have an example you can try. HTML, CSS, JavaScript, Vue, Bootstrap and Tailwind code really runs inside an isolated sandbox in your browser; the React and Angular previews are simplified and do not execute your code.",
      "a.how.3": "A short quiz follows every lesson, and a lesson counts as completed when you answer its questions correctly.",
      "a.avail.title": "What is available now",
      "a.avail.p1": "The site has {c} courses and {l} lessons.",
      "a.avail.p2": "The site interface (menus and buttons) works in Arabic and English on most pages. The lesson text itself is available in both Arabic and English for every course shown below.",
      "a.table.cap": "Courses, their lesson counts and whether their lessons exist in English",
      "a.table.course": "Course", "a.table.lessons": "Lessons", "a.table.en": "Lessons in English",
      "a.en.full": "Available", "a.en.partial": "Partial", "a.en.none": "Not available yet",
      "a.state.title": "Your progress and account",
      "a.state.p1": "Your progress is saved in your browser on this device. You can create an account and sign in to keep your name, picture and preferences.",
      "a.state.p2": "In progress: deepening lesson explanations and adding more hands-on exercises.",
      "a.back": "Back to FAYBIT",
    },
  });

  F.i18n.extend({
    ar: {
      "menu.game": "الألعاب", "ft.tag": "منصة تعليمية مستقلة لتعلم تطوير الويب بالعربية والإنجليزية.", "ft.learnH": "تعلّم", "ft.platH": "المنصة", "ft.settings": "الإعدادات", "menu.profile": "الملف الشخصي", "menu.dashboard": "لوحة التقدم", "f.about": "عن المنصة", "f.rights": "© 2026 FAYBIT. منصة تعليمية لتطوير الويب.", "ft.learn": "المسارات",
      "a.kicker": "عن المنصة",
      "a.h1": "مكان هادئ لتتعلم تطوير الويب خطوة بخطوة",
      "a.lead": "FAYBIT منصة تعليمية مستقلة. تبدأ من أساسيات الحاسوب والبرمجة، ثم تبني مهارات HTML وCSS وJavaScript، وتنتقل إلى الأدوات والأطر، وتتمرّن بالكود الحقيقي في كل خطوة.",
      "a.play": "جرّب الألعاب",
      "a.fact.games": "ألعاب وتحديات", "a.fact.lang2": "لغتان: عربي وإنجليزي",
      "a.how.title": "كيف يسير التعلّم",
      "a.how.2": "أمثلة قابلة للتجربة في معظم الدروس، تُنفَّذ داخل بيئة معزولة في المتصفح.",
      "a.how.4": "ألعاب وتحديات برمجية تثبّت ما تعلمته وتقيس تقدمك.",
      "a.pr.title": "تمرّن بالكود", "a.pr.p": "ألعاب وتحديات تكتب فيها كودًا حقيقيًا ويُفحص فورًا داخل متصفحك، مع تقدم محفوظ ولوحة ترتيب.",
      "a.pr.1": "تحديات HTML وCSS وJavaScript بمحرر ومعاينة حية.", "a.pr.2": "اضبط Flexbox حتى يطابق التخطيط الهدف.", "a.pr.3": "اكتب محددات CSS تختار العناصر المطلوبة فقط.", "a.pr.4": "دافع عن الناجين بكود حقيقي في 15 مهمة.", "a.pr.5": "برمجة بالكتل عبر 120 مرحلة.",
      "gm.arena.t": "ساحات الكود", "gm.adv.t": "المغامرة الكبرى",
      "a.state.p1": "يُحفظ تقدمك على هذا الجهاز دون حساب، وعند تسجيل الدخول يرتبط بحسابك. الحساب اختياري ويضيف المزامنة فقط.",
      "a.state.p2": "قيد العمل: تعميق شرح بعض الدروس وإضافة المزيد من التمارين التطبيقية وترجمة بقية الدروس.",
      "a.arch.1.d": "صفحات HTML وCSS وJavaScript بلا إطار ثقيل.", "a.arch.2.d": "كل المسارات تعمل بنفس المحرك، فتتشابه التجربة.", "a.arch.4.d": "شرح ثم مثال ثم تجربة ثم اختبار قصير.",
      "a.arch.5.t": "يعمل دون اتصال", "a.arch.5.d": "يمكن تثبيت الموقع كتطبيق، وتبقى الصفحات التي زرتها متاحة دون إنترنت.",
      "a.cta.t": "ابدأ من حيث تناسبك"
    },
    en: {
      "menu.game": "Games", "ft.tag": "An independent platform for learning web development in Arabic and English.", "ft.learnH": "Learn", "ft.platH": "Platform", "ft.settings": "Settings", "menu.profile": "Profile", "menu.dashboard": "Progress dashboard", "f.about": "About", "f.rights": "© 2026 FAYBIT. A web development learning platform.", "ft.learn": "Courses",
      "a.kicker": "About the platform",
      "a.h1": "A calm place to learn web development, step by step",
      "a.lead": "FAYBIT is an independent learning platform. Start with computer and programming fundamentals, build HTML, CSS and JavaScript skills, move on to tools and frameworks, and practise with real code at every step.",
      "a.play": "Try the games",
      "a.fact.games": "games and challenges", "a.fact.lang2": "languages: Arabic and English",
      "a.how.title": "How learning works",
      "a.how.2": "Most lessons have examples you can try, run inside an isolated sandbox in your browser.",
      "a.how.4": "Coding games and challenges reinforce what you learned and track your progress.",
      "a.pr.title": "Practise with code", "a.pr.p": "Games and challenges where you write real code that is checked instantly in your browser, with saved progress and a leaderboard.",
      "a.pr.1": "HTML, CSS and JavaScript challenges with an editor and live preview.", "a.pr.2": "Set Flexbox properties until the layout matches the target.", "a.pr.3": "Write CSS selectors that pick only the required elements.", "a.pr.4": "Defend the survivors with real code across 15 missions.", "a.pr.5": "Block coding across 120 levels.",
      "gm.arena.t": "Code arenas", "gm.adv.t": "The Grand Adventure",
      "a.state.p1": "Your progress is saved on this device without an account, and linked to your account when you sign in. An account is optional and only adds syncing.",
      "a.state.p2": "In progress: deeper explanations for some lessons, more practice exercises and translating the remaining lessons.",
      "a.arch.1.d": "Plain HTML, CSS and JavaScript pages with no heavy framework.", "a.arch.2.d": "Every course runs on the same engine, so the experience stays consistent.", "a.arch.4.d": "Explanation, example, a try-it step, then a short quiz.",
      "a.arch.5.t": "Works offline", "a.arch.5.d": "Install the site as an app; pages you have visited stay available without internet.",
      "a.cta.t": "Start where it suits you"
    }
  });
  function facts() {
    if (!F.catalog) return;
    var tracks = F.catalog.tracks, byId = {};
    tracks.forEach(function (t) { byId[t.id] = t; });
    var c = String(tracks.length), l = String(F.catalog.totalLessons());
    var ft = document.querySelector("[data-fact=tracks]"), fl = document.querySelector("[data-fact=lessons]");
    if (ft) ft.textContent = c; if (fl) fl.textContent = l;
    var p = document.querySelector("[data-about-count]");
    if (p) p.textContent = F.i18n.t("a.avail.p1", { c: c, l: l });
    // the table rows are static for crawlers; flags and counts are re-read from the catalog so they can never drift
    document.querySelectorAll("[data-course]").forEach(function (row) {
      var t = byId[row.getAttribute("data-course")];
      if (!t) return;
      var td = row.querySelectorAll("td")[0];
      if (td) td.textContent = String(t.total);
      var pill = row.querySelector("[data-en-flag]");
      if (pill) { pill.className = "ab-pill ab-pill-" + t.en; pill.setAttribute("data-i18n", "a.en." + t.en); pill.textContent = F.i18n.t("a.en." + t.en); }
    });
  }
  window.addEventListener("fayad:langchange", facts);
  F.i18n.apply();
  facts();
})();

(function () {
  var links = [].slice.call(document.querySelectorAll(".ab-toc a"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var map = {}; links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (a) { a.removeAttribute("aria-current"); }); map[e.target.id].setAttribute("aria-current", "true"); } });
  }, { rootMargin: "-20% 0px -70% 0px" });
  Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
})();
