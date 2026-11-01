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
      "a.name": "عبد الحميد فياض",
      "a.role": "صاحب منصة FAYAD التعليمية",
      "a.edu": "طالب هندسة حاسبات في جامعة طنطا",
      "a.portfolio": "زيارة الـ Portfolio",
      "a.explore": "استكشف المسارات",
      "a.who.title": "من أنا",
      "a.who.p1": "تركز رحلتي في التكنولوجيا على فهم كيف تعمل الأشياء، ثم تحويل هذه المعرفة إلى مشاريع عملية.",
      "a.who.p2": "يهمني تطوير الويب بشكل خاص، وأعمل بـ HTML وCSS وJavaScript وأستكشف التقنيات الحديثة خطوة بخطوة.",
      "a.fayad.title": "عن منصة FAYAD",
      "a.fayad.p1": "FAYAD منصة تعليمية تفاعلية تهدف إلى جعل تعلم تطوير الويب أكثر تنظيمًا وعملية: تبدأ من أساسيات الحاسوب والبرمجة، ثم HTML وCSS وJavaScript، ثم أطر العمل.",
      "a.fact.tracks": "مسارات",
      "a.fact.lessons": "درسًا",
      "a.fact.lang": "الواجهة والدروس بالعربية والإنجليزية",
      "a.fact.theme": "وضع فاتح وداكن",
      "a.fayad.note": "يُحفظ تقدمك على جهازك. وتُضاف مسارات ومزايا جديدة تدريجيًا.",
      "a.what.title": "ما هي FAYAD؟",
      "a.what.p1": "FAYAD منصة لتعلم تطوير الويب بالعربية، مبنية على مسار مرتّب: أساسيات الحاسوب والبرمجة أولًا، ثم HTML وCSS وJavaScript، ثم أدوات وأطر العمل.",
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
      "a.state.p1": "يُحفظ تقدمك في متصفحك على هذا الجهاز. يمكنك إنشاء حساب وتسجيل الدخول، لكن مزامنة التقدم بين الأجهزة لم تُفعَّل بعد.",
      "a.state.p2": "قيد العمل: ترجمة بقية الدروس إلى الإنجليزية، ومزامنة التقدم مع الحساب.",
      "a.links.title": "روابطي",
      "a.footer": "© 2026 FAYAD. من تطوير عبد الحميد فياض.",
      "a.back": "العودة إلى FAYAD",
    },
    en: {
      "nav.home": "Home",
      "nav.courses": "Courses",
      "nav.about": "About",
      "nav.label": "Main navigation",
      "a.kicker": "About the platform and its creator",
      "a.name": "Abdullhamid, Fayad",
      "a.role": "Creator of the FAYAD learning platform",
      "a.edu": "Computer engineering student at Tanta University",
      "a.portfolio": "Visit the portfolio",
      "a.explore": "Explore the courses",
      "a.who.title": "About me",
      "a.who.p1": "My journey in technology is about understanding how things work, then turning that knowledge into practical projects.",
      "a.who.p2": "I care about web development in particular. I work with HTML, CSS and JavaScript and explore modern tools step by step.",
      "a.fayad.title": "About FAYAD",
      "a.fayad.p1": "FAYAD is an interactive learning platform that makes learning web development more organised and hands-on: it starts with computer and programming fundamentals, then HTML, CSS and JavaScript, then frameworks.",
      "a.fact.tracks": "courses",
      "a.fact.lessons": "lessons",
      "a.fact.lang": "Interface and lessons in Arabic and English",
      "a.fact.theme": "Light and dark themes",
      "a.fayad.note": "Your progress is saved on your device. New courses and features are being added step by step.",
      "a.what.title": "What is FAYAD?",
      "a.what.p1": "FAYAD is a platform for learning web development in Arabic, built around an ordered path: computer and programming fundamentals first, then HTML, CSS and JavaScript, then tools and frameworks.",
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
      "a.state.p1": "Your progress is saved in your browser on this device. You can create an account and sign in, but syncing progress across devices is not enabled yet.",
      "a.state.p2": "In progress: translating the remaining lessons into English, and syncing progress with your account.",
      "a.links.title": "Find me online",
      "a.footer": "© 2026 FAYAD. Built by Abdullhamid, Fayad.",
      "a.back": "Back to FAYAD",
    },
  });

  function facts() {
    if (!F.catalog) return;
    var tracks = F.catalog.tracks, byId = {};
    tracks.forEach(function (t) { byId[t.id] = t; });
    var c = String(tracks.length), l = String(F.catalog.totalLessons());
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
