/* Homepage: "what FAYBIT offers" pillars + hero secondary CTA copy. Pure i18n extension; no behaviour. */
(function () {
  "use strict";
  var F = window.FAYAD || (window.FAYAD = {});
  var D = {
    ar: {
      "pl.eyebrow": "ما تقدمه FAYBIT", "pl.title": "منصة تعليم كاملة، لا مجرد دروس", "pl.lead": "كل ما تحتاجه لتتعلم البرمجة وتطبّقها في مكان واحد، بالعربية والإنجليزية.",
      "pl.1.t": "دروس منظّمة بالترتيب", "pl.1.d": "مسارات تبدأ من أساسيات الحاسوب وتنتهي بأطر العمل، وفي كل درس شرح ومثال وتمرين.",
      "pl.2.t": "محرر تفاعلي", "pl.2.d": "عدّل الكود وشاهد النتيجة فورًا داخل الدرس في بيئة معزولة وآمنة.",
      "pl.3.t": "اختبارات وتغذية راجعة", "pl.3.d": "أسئلة بعد الدروس وتصحيح فوري مع تلميحات وشرح للإجابة.",
      "pl.4.t": "ألعاب برمجة", "pl.4.d": "مغامرة من 120 مرحلة، وبقاء من الزومبي بالقواعد المنطقية، وتحديات للمتصفح.",
      "pl.5.t": "تقدّم ونقاط", "pl.5.d": "لوحة تقدم وسلاسل أيام ونقاط تُحفظ على جهازك ومع حسابك.",
      "pl.6.t": "عربي وإنجليزي", "pl.6.d": "واجهة كاملة من اليمين لليسار ومن اليسار لليمين، مع وضع فاتح وداكن.",
      "h.cta2": "العب وتعلّم"
    },
    en: {
      "pl.eyebrow": "What FAYBIT offers", "pl.title": "A complete learning platform, not just lessons", "pl.lead": "Everything you need to learn programming and put it to work, in one place, in Arabic and English.",
      "pl.1.t": "Ordered, structured lessons", "pl.1.d": "Tracks from computer basics to frameworks, with an explanation, an example and an exercise in every lesson.",
      "pl.2.t": "Interactive editor", "pl.2.d": "Edit the code and see the result instantly inside the lesson, in a safe sandbox.",
      "pl.3.t": "Quizzes and feedback", "pl.3.d": "Questions after lessons with instant checking, hints and an explanation of the answer.",
      "pl.4.t": "Coding games", "pl.4.d": "A 120-level adventure, zombie survival with logic rules, and challenges for the browser.",
      "pl.5.t": "Progress and points", "pl.5.d": "A progress dashboard, day streaks and points saved on your device and with your account.",
      "pl.6.t": "Arabic and English", "pl.6.d": "A full right-to-left and left-to-right interface, with light and dark modes.",
      "h.cta2": "Play and learn"
    }
  };
  if (F.i18n && F.i18n.extend) F.i18n.extend(D);
})();
