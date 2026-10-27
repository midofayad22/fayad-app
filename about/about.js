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
      "a.fact.tracks": "مسارات تعليمية",
      "a.fact.lessons": "درسًا",
      "a.fact.lang": "واجهة بالعربية والإنجليزية، ودروس عربية",
      "a.fact.theme": "وضع فاتح وداكن",
      "a.fayad.note": "يُحفظ تقدمك على جهازك. وتُضاف مسارات ومزايا جديدة تدريجيًا.",
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
      "a.fact.lang": "Arabic and English interface, Arabic lessons",
      "a.fact.theme": "Light and dark themes",
      "a.fayad.note": "Your progress is saved on your device. New courses and features are being added step by step.",
      "a.links.title": "Find me online",
      "a.footer": "© 2026 FAYAD. Built by Abdullhamid, Fayad.",
      "a.back": "Back to FAYAD",
    },
  });

  function facts() {
    if (!F.catalog) return;
    var t = document.querySelector("[data-fact='tracks']");
    var l = document.querySelector("[data-fact='lessons']");
    if (t) t.textContent = String(F.catalog.tracks.length);
    if (l) l.textContent = String(F.catalog.totalLessons());
  }
  facts();
  F.i18n.apply();
})();
