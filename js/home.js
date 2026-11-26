/*
  FAYBIT homepage: interface strings (Arabic + English), roadmap/course status, and "continue learning".
  Requires js/i18n.js and js/catalog.js. Never writes lesson progress; it only reads it.
  Course/track names and code terms are kept in Latin script in both languages on purpose.
*/
(function () {
  var F = window.FAYAD;
  if (!F || !F.i18n || !F.catalog) return;

  F.i18n.extend({
    ar: {
      "w.hi": "أهلًا، {name}", "w.sum": "أكملت {done} من {total} درسًا في المسارات المحفوظة", "w.sumNone": "ابدأ أول درس وسنحفظ تقدمك هنا", "w.me": "حسابي",
      "nav.home": "الرئيسية",
      "menu.game": "الألعاب", "menu.account": "حسابي", "menu.dashboard": "لوحة التقدم", "menu.dashboard.sub": "دروسك ونقاطك وإنجازاتك", "menu.profile": "الملف الشخصي", "menu.profile.sub": "الحساب وبيانات التقدم",
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
      "menu.about.sub": "من يقف وراء FAYBIT",
      "menu.contact": "تواصل",
      "h.kicker": "منصة FAYBIT التعليمية",
      "h.title": "من أول سطر كود إلى تطبيق ويب حقيقي",
      "h.t1": "من أول سطر كود",
      "h.t2": "إلى تطبيق ويب حقيقي",
      "t.eyebrow": "المسار التعليمي",
      "how.eyebrow": "طريقة التعلم",
      "fin.sub": "افتح الدرس الأول الآن. لا حاجة لتسجيل الدخول للبدء.",
      "h.desc": "مسار مرتّب يبدأ بأساسيات الحاسوب والبرمجة، ثم HTML وCSS وJavaScript، وينتهي بأطر العمل. كل درس: شرح، مثال، تمرين، واختبار.",
      "h.cta": "ابدأ من الأساسيات",
      
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
      "f.rights": "© 2026 FAYBIT. منصة تعليمية لتطوير الويب.",
      "f.tag": "Learn · Build · Become",
      "f.nav": "روابط التذييل",
      "nav.how": "كيف تتعلم",
      "bn.label": "التنقل السريع",
      "ft.tag": "منصة تعليمية مستقلة لتعلم تطوير الويب بالعربية والإنجليزية.", "ft.learnH": "تعلّم", "ft.platH": "المنصة", "ft.settings": "الإعدادات",
      "h.signup": "أنشئ حسابك مجانًا",
      "h.signin": "لدي حساب",
      "pk.label": "اختر ما تريد تعلمه",
      "pk.s1": "اقرأ الدرس", "pk.s2": "جرّب الكود", "pk.s3": "اختبر نفسك",
      "pk.open": "افتح المسار", "pk.lessons": "دروس",
      "bn.account": "حسابي",

      "bn.menu": "القائمة",
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
      "o.eyebrow": "صاحب المنصة",
      "o.name": "عبد الحميد فياض",
      "o.role": "أبني FAYBIT لأن أفضل طريقة للتعلم هي أن تكتب الكود بنفسك.",
      "o.edu": "طالب هندسة حاسبات في جامعة طنطا",
      "o.portfolio": "الـ Portfolio",
      "o.more": "المزيد عن المنصة وصاحبها",
      "o.alt": "صورة عبد الحميد فياض",
      "ft.cta": "جاهز لكتابة أول سطر كود؟",
      "ft.cta.btn": "اختر مسارك",
      "ft.learn": "المسارات",
      "ft.platform": "المنصة",
      "ft.top": "للأعلى",
      "fin.title": "جاهز لتبدأ؟",
      "n.start": "ابدأ من هنا",
      "n.start.d": "الخطوة الأولى في المسار",
      "n.open": "افتح المسار",
      "n.continue": "تابع من حيث توقفت",
      "n.resume": "تابع",
    },
    en: {
      "w.hi": "Welcome back, {name}", "w.sum": "{done} of {total} lessons completed in tracks that record progress", "w.sumNone": "Start your first lesson and your progress will appear here", "w.me": "My account",
      "nav.home": "Home",
      "menu.game": "Games", "menu.account": "My account", "menu.dashboard": "Progress dashboard", "menu.dashboard.sub": "Your lessons, points and achievements", "menu.profile": "Profile", "menu.profile.sub": "Account and progress data",
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
      "menu.about.sub": "Who is behind FAYBIT",
      "menu.contact": "Contact",
      "h.kicker": "FAYBIT",
      "h.title": "From your first line of code to a real web app",
      "h.t1": "From your first line of code",
      "h.t2": "to a real web app",
      "t.eyebrow": "Learning path",
      "how.eyebrow": "How you learn",
      "fin.sub": "Open the first lesson now. No sign-in needed to start.",
      "h.desc": "An ordered path that starts with computer and programming fundamentals, then HTML, CSS and JavaScript, and ends with frameworks. Every lesson: explanation, example, practice and a quiz.",
      "h.cta": "Start with the fundamentals",
      
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
      "f.rights": "© 2026 FAYBIT. A web development learning platform.",
      "f.tag": "Learn · Build · Become",
      "f.nav": "Footer links",
      "nav.how": "How it works",
      "bn.label": "Quick navigation",
      "ft.tag": "An independent platform for learning web development in Arabic and English.", "ft.learnH": "Learn", "ft.platH": "Platform", "ft.settings": "Settings",
      "h.signup": "Create your free account",
      "h.signin": "I have an account",
      "pk.label": "Pick what you want to learn",
      "pk.s1": "Read the lesson", "pk.s2": "Try the code", "pk.s3": "Test yourself",
      "pk.open": "Open the course", "pk.lessons": "lessons",
      "bn.account": "Account",

      "bn.menu": "Menu",
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
      "o.eyebrow": "Behind the platform",
      "o.name": "Abdullhamid, Fayad",
      "o.role": "I build FAYBIT because the best way to learn is to write the code yourself.",
      "o.edu": "Computer Engineering student at Tanta University",
      "o.portfolio": "Portfolio",
      "o.more": "More about the platform and its creator",
      "o.alt": "Portrait of Abdullhamid Fayad",
      "ft.cta": "Ready to write your first line of code?",
      "ft.cta.btn": "Pick your course",
      "ft.learn": "Courses",
      "ft.platform": "Platform",
      "ft.top": "Back to top",
      "fin.title": "Ready to start?",
      "n.start": "Start here",
      "n.start.d": "The first step on the path",
      "n.open": "Open course",
      "n.continue": "Pick up where you left off",
      "n.resume": "Continue",
    },
  });

  F.i18n.extend({ ar: {
 "h.desc2": "تتعلم تطوير الويب خطوة بخطوة بالعربية والإنجليزية: تقرأ الدرس، تجرّب الكود في محرر داخل الصفحة، ثم تختبر فهمك وتتمرّن.",
 "h.cta3": "شاهد المسار كاملًا",
 "h.f1": "ما الذي تتعلمه",
 "h.f1d": "HTML وCSS وJavaScript ثم أطر العمل",
 "h.f2": "من أين تبدأ",
 "h.f2d": "من الصفر، دون خبرة سابقة",
 "h.f3": "المحتوى",
 "s.title": "تقدمك في المراحل",
 "s.note": "يُحفظ تقدمك على هذا الجهاز، ومع حسابك إن سجّلت الدخول.",
 "oc.com": "تفهم كيف يعمل الحاسوب من العتاد إلى الشبكات والأمن السيبراني.",
 "oc.prg": "تفكّر كمبرمج: متغيرات وشروط وحلقات ودوال، وتحلّ مسائل صغيرة بنفسك.",
 "oc.html": "تبني صفحة ويب سليمة البنية بعناصر دلالية ونماذج وجداول وإمكانية وصول.",
 "oc.css": "تصمّم صفحات متجاوبة: المحددات والتتابع ونموذج الصندوق وFlexbox وGrid.",
 "oc.js": "تجعل الصفحة تتفاعل: أساسيات اللغة وDOM والأحداث والوحدات وPromises وFetch.",
 "oc.ajs": "تفهم ما تحت الغطاء: النطاق والـ Closures وحلقة الأحداث والمولدات وأنماط التصميم.",
 "oc.bs": "تبني واجهات جاهزة بسرعة بالشبكة والمكونات والأدوات المساعدة.",
 "oc.tw": "تصمّم مباشرة في الـ HTML بفئات Utility، مع التجاوب والوضع الداكن والتخصيص.",
 "oc.angular": "تبني تطبيقًا منظمًا: مكونات وقوالب وخدمات وتوجيه ونماذج وRxJS.",
 "oc.react": "تبني واجهات من مكونات: JSX وProps وState وHooks والتوجيه.",
 "oc.vue": "تبني واجهات تفاعلية بقوالب بسيطة وComposition API وVue Router.",
 "lv.b": "مبتدئ",
 "lv.i": "متوسط",
 "lv.a": "متقدم",
 "pr.com": "دون متطلبات",
 "pr.prg": "مفضّل: أساسيات الحاسوب",
 "pr.html": "دون متطلبات",
 "pr.css": "يتطلب: HTML",
 "pr.js": "يتطلب: HTML وCSS",
 "pr.ajs": "يتطلب: JavaScript",
 "pr.bs": "يتطلب: HTML وCSS",
 "pr.tw": "يتطلب: CSS",
 "pr.angular": "يتطلب: JavaScript",
 "pr.react": "يتطلب: JavaScript",
 "pr.vue": "يتطلب: JavaScript",
 "st.4.d2": "ابنِ تطبيقًا كاملًا بإطار حديث. الخطة المعتمدة تعتمد Angular؛ React وVue بدائل إضافية.",
 "how.title2": "كيف يسير كل درس",
 "how.1.d2": "شرح قصير ثم مثال كامل يمكنك قراءته.",
 "how.2.d2": "عدّل المثال وشغّله في محرر الدرس، داخل بيئة معزولة.",
 "how.3.d2": "أسئلة بعد كل درس مع شرح للإجابة.",
 "how.4": "تمرّن باللعب",
 "how.4.d": "طبّق ما تعلمته في تحديات الكود والألعاب.",
 "g.title2": "تمرّن بالكود",
 "g.lead2": "ألعاب وتحديات تكتب فيها كودًا حقيقيًا، ويُفحص فورًا داخل متصفحك.",
 "gm.arena.t": "ساحات الكود",
 "gm.arena.d": "محرر ومعاينة حية في HTML وCSS وJavaScript، 20 تحديًا في كل ساحة.",
 "gm.arena.lv": "من مبتدئ إلى خبير",
 "gm.flex.d": "اضبط خصائص Flexbox حتى يطابق التخطيط الهدف.",
 "gm.flex.lv": "CSS · مبتدئ إلى متوسط",
 "gm.sel.d": "اكتب محدد CSS يختار العناصر المطلوبة فقط.",
 "gm.sel.lv": "CSS · مبتدئ إلى متوسط",
 "gm.zombie.d": "دافع عن الناجين بكود HTML وCSS وJavaScript حقيقي في 15 مهمة.",
 "gm.zombie.lv": "مشروع تطبيقي · متوسط",
 "gm.adv.t": "المغامرة الكبرى",
 "gm.adv.d": "برمجة بالكتل عبر 120 مرحلة: تسلسل وحلقات وشروط ودوال.",
 "gm.adv.lv": "منطق برمجي · مبتدئ",
 "h.cta2": "العب وتعلّم"
}, en: {
 "h.desc2": "Learn web development step by step in Arabic or English: read the lesson, try the code in an editor on the page, then test yourself and practise.",
 "h.cta3": "See the full path",
 "h.f1": "What you learn",
 "h.f1d": "HTML, CSS and JavaScript, then frameworks",
 "h.f2": "Where to start",
 "h.f2d": "From zero, no prior experience",
 "h.f3": "Content",
 "s.title": "Your progress by stage",
 "s.note": "Progress is saved on this device, and with your account if you sign in.",
 "oc.com": "Understand how a computer works, from hardware to networks and cybersecurity.",
 "oc.prg": "Think like a programmer: variables, conditions, loops and functions, and solve small problems yourself.",
 "oc.html": "Build a well-structured web page with semantic elements, forms, tables and accessibility.",
 "oc.css": "Design responsive pages: selectors, the cascade, the box model, Flexbox and Grid.",
 "oc.js": "Make the page interactive: language basics, the DOM, events, modules, Promises and Fetch.",
 "oc.ajs": "Understand what is under the hood: scope, closures, the event loop, generators and design patterns.",
 "oc.bs": "Build ready-made interfaces fast with the grid, components and utilities.",
 "oc.tw": "Style directly in HTML with utility classes, including responsive design, dark mode and theming.",
 "oc.angular": "Build a structured app: components, templates, services, routing, forms and RxJS.",
 "oc.react": "Build interfaces from components: JSX, props, state, hooks and routing.",
 "oc.vue": "Build interactive interfaces with simple templates, the Composition API and Vue Router.",
 "lv.b": "Beginner",
 "lv.i": "Intermediate",
 "lv.a": "Advanced",
 "pr.com": "No prerequisites",
 "pr.prg": "Suggested: computer basics",
 "pr.html": "No prerequisites",
 "pr.css": "Requires: HTML",
 "pr.js": "Requires: HTML and CSS",
 "pr.ajs": "Requires: JavaScript",
 "pr.bs": "Requires: HTML and CSS",
 "pr.tw": "Requires: CSS",
 "pr.angular": "Requires: JavaScript",
 "pr.react": "Requires: JavaScript",
 "pr.vue": "Requires: JavaScript",
 "st.4.d2": "Build a complete app with a modern framework. The approved plan uses Angular; React and Vue are extra alternatives.",
 "how.title2": "How each lesson runs",
 "how.1.d2": "A short explanation, then a complete example you can read.",
 "how.2.d2": "Edit the example and run it in the lesson editor, in an isolated sandbox.",
 "how.3.d2": "Questions after every lesson, with an explanation of the answer.",
 "how.4": "Practise by playing",
 "how.4.d": "Apply what you learned in code challenges and games.",
 "g.title2": "Practise with code",
 "g.lead2": "Games and challenges where you write real code, checked instantly in your browser.",
 "gm.arena.t": "Code arenas",
 "gm.arena.d": "Editor and live preview in HTML, CSS and JavaScript, 20 challenges per arena.",
 "gm.arena.lv": "Beginner to expert",
 "gm.flex.d": "Set Flexbox properties until the layout matches the target.",
 "gm.flex.lv": "CSS · beginner to intermediate",
 "gm.sel.d": "Write a CSS selector that picks only the required elements.",
 "gm.sel.lv": "CSS · beginner to intermediate",
 "gm.zombie.d": "Defend the survivors with real HTML, CSS and JavaScript across 15 missions.",
 "gm.zombie.lv": "Applied project · intermediate",
 "gm.adv.t": "The Grand Adventure",
 "gm.adv.d": "Block coding across 120 levels: sequences, loops, conditions and functions.",
 "gm.adv.lv": "Programming logic · beginner",
 "h.cta2": "Play and learn"
} });

  F.i18n.extend({ ar: {
 "pl.lab": "تحدٍّ حقيقي من ساحة CSS",
 "pl.brief": "اجعل العنوان برتقاليًا (#e34f26)، بحجم 40px، في منتصف السطر.",
 "pl.c1": "اللون #e34f26",
 "pl.c2": "الحجم 40px",
 "pl.c3": "المحاذاة center",
 "pl.cta": "جرّب ساحة CSS"
}, en: {
 "pl.lab": "A real challenge from the CSS arena",
 "pl.brief": "Make the heading orange (#e34f26), 40px, centred.",
 "pl.c1": "Colour is #e34f26",
 "pl.c2": "Size is 40px",
 "pl.c3": "text-align is center",
 "pl.cta": "Try the CSS arena"
} });

  F.i18n.extend({ ar: {
 "h.cta3": "استعرض المسارات",
 "tk.title": "اختر مسارك",
 "tk.sub": "ابدأ من الأساسيات أو انتقل مباشرة إلى ما تحتاجه. تقدمك في كل مسار يُحفظ تلقائيًا.",
 "tk.found": "قبل أن تبدأ",
 "tk.core": "الأساس: ثلاث لغات خلف كل صفحة ويب",
 "tk.more": "تعمّق وأدوات وأطر عمل",
 "tk.prev": "السابق",
 "tk.next": "التالي",
 "pl.cta2": "افتح الساحات"
}, en: {
 "h.cta3": "Browse the tracks",
 "tk.title": "Choose your track",
 "tk.sub": "Start from the fundamentals or jump straight to what you need. Your progress in every track is saved automatically.",
 "tk.found": "Before you start",
 "tk.core": "The core: three languages behind every web page",
 "tk.more": "Go further: tools and frameworks",
 "tk.prev": "Previous",
 "tk.next": "Next",
 "pl.cta2": "Open the arenas"
} });

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
    var deep = tr.path.replace(/^\//, "") + (t && info.current !== null ? "#lesson-" + (info.current + 1) : "");
    $("#nextGo").setAttribute("href", deep);
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
    if (cta) cta.setAttribute("href", deep);
    if (fin) { fin.setAttribute("href", deep); var ft = $("span", fin); if (ft && ctaText) ft.textContent = ctaText.textContent; }
  }

  // ---- stage meta + sticky stage nav highlight ----
  function stageMeta() {
    $$("[data-stage-meta]").forEach(function (el) {
      var ids = el.getAttribute("data-stage-meta").split(",");
      var lessons = ids.reduce(function (n, id) { return n + (tracksById[id] ? tracksById[id].total : 0); }, 0);
      el.textContent = F.i18n.t("st.meta", { c: ids.length, l: lessons });
    });
  }
  // 4-segment overview of real progress per stage (only tracks that record completed lessons contribute)
  var STAGES = [["com", "prg"], ["html", "css", "js"], ["ajs", "bs", "tw"], ["react", "vue", "angular"]];
  function paintSegments() {
    var p = F.catalog.progress();
    STAGES.forEach(function (ids, i) {
      var done = 0, total = 0;
      ids.forEach(function (id) { total += p[id].total; done += p[id].done || 0; });
      var a = $('.hm-seg[data-seg="' + (i + 1) + '"]');
      if (!a) return;
      var pct = total ? Math.round((done / total) * 100) : 0;
      $(".hm-seg-bar > span", a).style.width = pct + "%";
      $("[data-pct]", a).textContent = done ? pct + "%" : "0/" + total;
      a.setAttribute("title", F.i18n.t("c.done", { done: done, total: total }));
    });
  }

  // ---- signed-in welcome (real session from FAYAD.user(); real saved progress) ----
  function renderWelcome() {
    var box = $("#hmWelcome"), u = F.user && F.user();
    if (!box) return;
    if (!u) { box.hidden = true; return; }
    var name = (u.name || (u.email || "").split("@")[0] || "").trim();
    var p = F.catalog.progress(), done = 0, total = 0;
    F.catalog.tracks.forEach(function (t) { if (p[t.id].done !== null) { done += p[t.id].done; total += t.total; } });
    var av = $("#hmWelcomeAv", box);
    av.textContent = "";
    if (u.avatar && /^https:\/\//.test(u.avatar)) { var im = document.createElement("img"); im.alt = ""; im.width = im.height = 44; im.referrerPolicy = "no-referrer"; im.src = u.avatar; av.appendChild(im); }
    else av.textContent = (name.charAt(0) || "?").toUpperCase();
    $("#hmWelcomeHi", box).textContent = F.i18n.t("w.hi", { name: name || "" }).replace(/[،,]\s*$/, "");
    $("#hmWelcomeSum", box).textContent = done > 0 ? F.i18n.t("w.sum", { done: done, total: total }) : F.i18n.t("w.sumNone");
    $("#hmWelcomeMe", box).textContent = F.i18n.t("w.me");
    box.hidden = false;
  }
  function render() { renderWelcome(); fillStats(); paintProgress(); renderNext(); stageMeta(); paintSegments(); }

  window.addEventListener("fayad:langchange", render);
  window.addEventListener("storage", renderWelcome);
  window.addEventListener("fayad-auth-changed", renderWelcome); window.addEventListener("fayad-profile-changed", renderWelcome);
  // progress can change in another tab, or when returning via the back button
  window.addEventListener("storage", render);
  window.addEventListener("pageshow", render);
  F.i18n.apply();
  render();
})();
