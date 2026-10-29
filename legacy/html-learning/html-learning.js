/* =========================================================
   FAYAD — HTML LEARNING ENGINE
   Full Engine Code - 30 Complete Lessons & 90 Detailed Questions
========================================================= */

/* =========================================================
   1. LESSON DATA (30 LESSONS)
========================================================= */

const lessons = [
  /* =======================================================
     HTML FUNDAMENTALS
  ======================================================= */
  {
    id: 1,
    group: "HTML FUNDAMENTALS",
    title: "مقدمة إلى HTML",
    description: "تعرّف على HTML، وما وظيفتها، وكيف تستخدم لبناء هيكل صفحات الويب.",
    content: `
      <article class="content-card">
        <h2>ما هي HTML؟</h2>
        <p>HTML اختصار لـ <strong>HyperText Markup Language</strong>. وهي لغة الترميز الأساسية المستخدمة لبناء هيكل صفحات الويب.</p>
        <p>HTML تخبر المتصفح بنوع المحتوى الموجود في الصفحة، مثل العناوين والفقرات والروابط والصور والنماذج.</p>
      </article>
      <article class="content-card">
        <div class="info-label">الفكرة الأساسية</div>
        <h2>HTML تبني هيكل الصفحة</h2>
        <p>يمكنك تخيل الموقع مثل مبنى: HTML تبني الهيكل، وCSS تهتم بالمظهر، وJavaScript تضيف السلوك والتفاعل.</p>
      </article>
    `,
    exampleTitle: "أول كود HTML لك",
    exampleCode: `<h1>مرحبًا بك</h1>\n<p>أهلًا بك في FAYAD.</p>`,
    result: `<h1>مرحبًا بك</h1><p>أهلًا بك في FAYAD.</p>`,
    explanation: `<p>العنصر <code>&lt;h1&gt;</code> يستخدم لإنشاء العنوان الرئيسي.</p><p>العنصر <code>&lt;p&gt;</code> يستخدم لإنشاء فقرة.</p>`,
    practice: "أنشئ عنوانًا رئيسيًا وفقرة ترحب بزائر موقعك.",
    starterCode: `<h1>مرحبًا بك في موقعي</h1>\n<p>هذا أول موقع HTML لي.</p>`,
    questions: [
      {
        question: "ماذا تعني اختصار كلمة HTML؟",
        options: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language"],
        correct: 0,
      },
      {
        question: "ما الوظيفة الأساسية لـ HTML؟",
        options: ["بناء هيكل صفحة الويب الأساسي", "تنسيق وتلوين العناصر فقط", "إدارة قواعد البيانات والتحكم بالسيرفر"],
        correct: 0,
      },
      {
        question: "أي عنصر يستخدم لإنشاء فقرة نصية عادية؟",
        options: ["<p>", "<text>", "<paragraph>"],
        correct: 0,
      },
    ],
  },
  {
    id: 2,
    group: "HTML FUNDAMENTALS",
    title: "هيكل مستند HTML",
    description: "تعلّم الهيكل الأساسي لمستند HTML ووظيفة html وhead وbody.",
    content: `
      <article class="content-card">
        <h2>هيكل المستند</h2>
        <p>مستند HTML يتكون من أجزاء منظمة تساعد المتصفح على فهم الصفحة وعرضها بشكل صحيح.</p>
        <p>أهم العناصر الأساسية هي <code>&lt;html&gt;</code> و <code>&lt;head&gt;</code> و <code>&lt;body&gt;</code>.</p>
      </article>
    `,
    exampleTitle: "مستند HTML أساسي",
    exampleCode: `<!DOCTYPE html>\n<html>\n<head>\n  <title>صفحتي</title>\n</head>\n<body>\n  <h1>مرحبًا</h1>\n  <p>هذه صفحتي.</p>\n</body>\n</html>`,
    result: `<h1>مرحبًا</h1><p>هذه صفحتي.</p>`,
    explanation: `<p><code>&lt;!DOCTYPE html&gt;</code> يخبر المتصفح أن المستند يستخدم HTML5.</p><p><code>&lt;head&gt;</code> يحتوي على معلومات الصفحة، و<code>&lt;body&gt;</code> يحتوي على المحتوى الظاهر.</p>`,
    practice: "أنشئ مستند HTML كاملًا يحتوي على title وh1 وفقرة.",
    starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <title>صفحتي</title>\n</head>\n<body>\n  <h1>مرحبًا</h1>\n  <p>أول صفحة لي.</p>\n</body>\n</html>`,
    questions: [
      {
        question: "أين يوضع المحتوى الذي يظهر للمستخدم في الصفحة؟",
        options: ["<body>", "<head>", "<title>"],
        correct: 0,
      },
      {
        question: "ما وظيفة عنصر <head> في مستند HTML؟",
        options: [
          "يحتوي على بيانات ومعلومات وإعدادات الصفحة للمتصفح",
          "يعرض الصور والنصوص المباشرة للمستخدم",
          "ينشئ أزرار الإرسال بالصفحة",
        ],
        correct: 0,
      },
      {
        question: "ما فائدة الإعلان DOCTYPE في بداية المستند؟",
        options: ["تحديد إصدار ونوع مستند الويب للمتصفح", "إنشاء فقرة نصية جديدة", "ربط ملف التنسيقات الخارجية"],
        correct: 0,
      },
    ],
  },
  {
    id: 3,
    group: "HTML FUNDAMENTALS",
    title: "Tags و Elements",
    description: "تعلّم الفرق بين Tags وElements وكيف يتكون عنصر HTML.",
    content: `
      <article class="content-card">
        <h2>ما هو Tag و Element؟</h2>
        <p>الـ Tag هو وسم الفتح أو الإغلاق مثل <code>&lt;p&gt;</code>. بينما الـ Element يشمل وسم الفتح والمحتوى ووسم الإغلاق معًا.</p>
      </article>
    `,
    exampleTitle: "عناصر HTML",
    exampleCode: `<h1>عنوان</h1>\n<p>فقرة</p>\n<strong>نص مهم</strong>`,
    result: `<h1>عنوان</h1><p>فقرة</p><strong>نص مهم</strong>`,
    explanation: `<p>يتكون عنصر HTML من opening tag ومحتوى وclosing tag.</p>`,
    practice: "أنشئ عنوانًا وفقرة ونصًا مهمًا باستخدام HTML.",
    starterCode: `<h1>عنواني</h1>\n<p>هذه فقرة.</p>\n<strong>نص مهم</strong>`,
    questions: [
      {
        question: "أي مما يلي يمثل عنصر فقرة مكتمل (Element)؟",
        options: ["<p>أهلاً بك</p>", "<p>", "</p>"],
        correct: 0,
      },
      {
        question: "ما الذي يميز وسم الإغلاق (Closing Tag) عن وسم الفتح؟",
        options: ["يحتوي على شرطة مائلة / قبل اسم الوسم", "يحتوي على علامة تعجب !", "يكتب بالحروف الكبيرة دائماً"],
        correct: 0,
      },
      {
        question: "أين يقع المحتوى النصي للعنصر؟",
        options: ["بين وسومي الفتح والإغلاق", "قبل وسم الفتح", "داخل ملف JavaScript"],
        correct: 0,
      },
    ],
  },
  {
    id: 4,
    group: "HTML FUNDAMENTALS",
    title: "Attributes",
    description: "تعلّم كيف تضيف Attributes معلومات إضافية إلى عناصر HTML.",
    content: `
      <article class="content-card">
        <h2>ما هو Attribute؟</h2>
        <p>تضيف الخاصية (Attribute) معلومات وخيارات إضافية للعنصر، وتكتب دائماً داخل وسم الفتح.</p>
      </article>
    `,
    exampleTitle: "مثال على Attributes",
    exampleCode: `<a href="https://example.com">زيارة الموقع</a>\n<img src="image.jpg" alt="صورة">`,
    result: `<a href="#" onclick="return false;">زيارة الموقع</a><p>مثال على الخصائص</p>`,
    explanation: `<p>تتكون الخاصية من اسم وقيمة، مثل href="url".</p>`,
    practice: "أنشئ رابطًا وصورة مع إضافة الخصائص المناسبة.",
    starterCode: `<a href="https://example.com">زيارة الموقع</a>`,
    questions: [
      {
        question: "أين تكتب الخصائص (Attributes) في HTML عادةً؟",
        options: ["داخل وسم الفتح (Opening Tag)", "داخل وسم الإغلاق (Closing Tag)", "خارج المستند نهائياً"],
        correct: 0,
      },
      {
        question: "ما الخاصية المستخدمة لتحديد الرابط المستهدف في العنصر <a>؟",
        options: ["href", "src", "link"],
        correct: 0,
      },
      {
        question: "ما الخاصية التي تقدم نصًا بديلًا للصورة في حال تعذر تحميلها؟",
        options: ["alt", "src", "title"],
        correct: 0,
      },
    ],
  },
  {
    id: 5,
    group: "HTML FUNDAMENTALS",
    title: "Headings",
    description: "تعلّم استخدام العناوين من h1 إلى h6 وتنظيم المحتوى.",
    content: `
      <article class="content-card">
        <h2>العناوين في HTML</h2>
        <p>تستخدم العناوين من h1 إلى h6 لتحديد التسلسل الهرمي للمحتوى.</p>
      </article>
    `,
    exampleTitle: "مستويات العناوين",
    exampleCode: `<h1>عنوان رئيسي</h1>\n<h2>عنوان فرعي</h2>\n<h3>عنوان أصغر</h3>`,
    result: `<h1>عنوان رئيسي</h1><h2>عنوان فرعي</h2><h3>عنوان أصغر</h3>`,
    explanation: `<p>h1 هو العنوان الأهم والأكبر، بينما h6 هو الأصغر.</p>`,
    practice: "أنشئ عناوين بمستويات مختلفة لتنظيم المقال.",
    starterCode: `<h1>عنوان الصفحة</h1>\n<h2>القسم الأول</h2>`,
    questions: [
      {
        question: "ما هو الوسم الذي يمثل العنوان الأكبر والأهم في الصفحة؟",
        options: ["<h1>", "<h6>", "<head>"],
        correct: 0,
      },
      {
        question: "كم عدد مستويات العناوين المتوفرة في HTML؟",
        options: ["6 مستويات من h1 إلى h6", "3 مستويات فقط", "10 مستويات متدرجة"],
        correct: 0,
      },
      {
        question: "أي وسم يمثل أقل وأصغر مستوى عنوان؟",
        options: ["<h6>", "<h1>", "<h3>"],
        correct: 0,
      },
    ],
  },
  {
    id: 6,
    group: "HTML FUNDAMENTALS",
    title: "Paragraphs",
    description: "تعلّم إنشاء الفقرات وتنظيم النصوص باستخدام عنصر p.",
    content: `
      <article class="content-card">
        <h2>الفقرات النصية</h2>
        <p>يستخدم وسم &lt;p&gt; لتقسيم النصوص إلى فقرات أسهل في القراءة.</p>
      </article>
    `,
    exampleTitle: "إنشاء فقرات",
    exampleCode: `<p>هذه هي الفقرة الأولى.</p>\n<p>هذه هي الفقرة الثانية.</p>`,
    result: `<p>هذه هي الفقرة الأولى.</p><p>هذه هي الفقرة الثانية.</p>`,
    explanation: `<p>يقوم المتصفح تلقائياً بترك مسافة قبل وبعد كل فقرة.</p>`,
    practice: "اكتب فقرتين تتحدث فيهما عن شغفك بتعلم الويب.",
    starterCode: `<p>أنا أتعلم برمجة الويب.</p>`,
    questions: [
      {
        question: "ما هو الوسم المخصص لإنشاء فقرة نصية؟",
        options: ["<p>", "<paragraph>", "<text>"],
        correct: 0,
      },
      {
        question: "ماذا يفعل المتصفح تلقائياً عند إضافة عنصر <p> جديد؟",
        options: ["يضيف مسافة عمودية قبل وبعد الفقرة", "يجعل خط النص مائلاً تلقائياً", "يحول اللون إلى الأزرق"],
        correct: 0,
      },
      {
        question: "هل يمكن إضافة أكثر من عنصر <p> في الصفحة الواحدة؟",
        options: ["نعم، بلا حد أقصى", "لا، فقرة واحدة فقط في المستند", "فقط مع استخدام تنسيقات CSS"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     TEXT & CONTENT
  ======================================================= */
  {
    id: 7,
    group: "TEXT & CONTENT",
    title: "تنسيق النصوص",
    description: "تعلّم عناصر HTML المستخدمة لإعطاء النص معنى أو أهمية.",
    content: `
      <article class="content-card">
        <h2>تنسيق النصوص</h2>
        <p>استخدم <code>&lt;strong&gt;</code> لإبراز الأهمية و <code>&lt;em&gt;</code> للتأكيد.</p>
      </article>
    `,
    exampleTitle: "تنسيق النص",
    exampleCode: `<strong>نص مهم جداً</strong>\n<em>نص مائل للتأكيد</em>\n<mark>نص مضلل</mark>`,
    result: `<p><strong>نص مهم جداً</strong></p><p><em>نص مائل للتأكيد</em></p><p><mark>نص مضلل</mark></p>`,
    explanation: `<p>الوسوم المعنوية تساعد محركات البحث وقارئات الشاشة.</p>`,
    practice: "جرب استخدام strong وem وmark على نصوص من اختيارك.",
    starterCode: `<strong>مهم</strong> <em>تأكيد</em>`,
    questions: [
      {
        question: "أي وسم يستخدم لإعطاء النص أهمية بارزة وجعله غامقاً (Bold)؟",
        options: ["<strong>", "<small>", "<mark>"],
        correct: 0,
      },
      {
        question: "أي وسم يستخدم للتركيز على النص وجعله مائلًا (Italic)؟",
        options: ["<em>", "<bold>", "<i>"],
        correct: 0,
      },
      {
        question: "ما هو الوسم المستخدم لتظليل النص باللون الأصفر (Highlight)؟",
        options: ["<mark>", "<color>", "<highlight>"],
        correct: 0,
      },
    ],
  },
  {
    id: 8,
    group: "TEXT & CONTENT",
    title: "Links",
    description: "تعلّم إنشاء الروابط والتنقل بين صفحات الويب.",
    content: `
      <article class="content-card">
        <h2>الروابط التشعبية</h2>
        <p>أنشئ رابطًا ينتقل بالمستخدم باستخدام الوسم <code>&lt;a&gt;</code> والخاصية <code>href</code>.</p>
      </article>
    `,
    exampleTitle: "إنشاء رابط",
    exampleCode: `<a href="https://google.com" target="_blank">زيارة جوجل</a>`,
    result: `<a href="#" onclick="return false;">زيارة جوجل</a>`,
    explanation: `<p>الخاصية target="_blank" تفتح الرابط في تبويب جديد.</p>`,
    practice: "أنشئ رابطًا يشير إلى أي موقع مفضل لديك.",
    starterCode: `<a href="https://example.com">الموقع</a>`,
    questions: [
      {
        question: "أي وسم يستخدم لإنشاء رابط تشعبي للانتقال بين الصفحات؟",
        options: ["<a>", "<link>", "<url>"],
        correct: 0,
      },
      {
        question: "ما هي الخاصية المسؤولة عن تحديد عنوان الويب للرابط المستهدف؟",
        options: ["href", "src", "target"],
        correct: 0,
      },
      {
        question: "كيف تفتح الرابط في نافذة أو تبويب جديد تلقائياً؟",
        options: ['target="_blank"', 'new="page"', 'open="tab"'],
        correct: 0,
      },
    ],
  },
  {
    id: 9,
    group: "TEXT & CONTENT",
    title: "Images",
    description: "تعلّم إضافة الصور إلى صفحات الويب باستخدام img.",
    content: `
      <article class="content-card">
        <h2>إضافة الصور</h2>
        <p>عنصر <code>&lt;img&gt;</code> هو عنصر ذاتي الإغلاق يستخدم لضم الصور للصفحة.</p>
      </article>
    `,
    exampleTitle: "إضافة صورة",
    exampleCode: `<img src="logo.png" alt="شعار الشعار" width="200">`,
    result: `<p>عنصر صورة يظهر هنا بحسب المسار المحدد</p>`,
    explanation: `<p>src يحدد المسار و alt تقدم وصفاً للصورة.</p>`,
    practice: "أضف وسم صورة مع تحديد العرض وخصائص alt.",
    starterCode: `<img src="image.jpg" alt="وصف الصورة">`,
    questions: [
      {
        question: "أي عنصر ينشئ صورة في HTML؟",
        options: ["<img>", "<image>", "<pic>"],
        correct: 0,
      },
      {
        question: "هل يمتلك العنصر <img> وسم إغلاق منفصل </img>؟",
        options: [
          "لا، هو عنصر ذاتي الإغلاق (Self-closing)",
          "نعم، يجب إغلاقه دائماً بوسم منفصل",
          "فقط في الإكواد القديمة",
        ],
        correct: 0,
      },
      {
        question: "ما هي الخاصية المحددة لمسار ورابط ملف الصورة؟",
        options: ["src", "href", "path"],
        correct: 0,
      },
    ],
  },
  {
    id: 10,
    group: "TEXT & CONTENT",
    title: "Lists",
    description: "تعلّم إنشاء القوائم المرتبة وغير المرتبة.",
    content: `
      <article class="content-card">
        <h2>القوائم في HTML</h2>
        <p>استخدم <code>&lt;ul&gt;</code> للقوائم المُنقطة، و <code>&lt;ol&gt;</code> للقوائم المرقّمة.</p>
      </article>
    `,
    exampleTitle: "القوائم",
    exampleCode: `<ul>\n  <li>تفاح</li>\n  <li>موز</li>\n</ul>`,
    result: `<ul><li>تفاح</li><li>موز</li></ul>`,
    explanation: `<p>عنصر <code>&lt;li&gt;</code> يمثل عنصراً داخل القائمة.</p>`,
    practice: "أنشئ قائمة مرقمة تحتوي على 3 أهداف لك.",
    starterCode: `<ol>\n  <li>الهدف الأول</li>\n</ol>`,
    questions: [
      {
        question: "أي وسم ينشئ قائمة غير مرتبة (تظهر كنقاط)؟",
        options: ["<ul>", "<ol>", "<list>"],
        correct: 0,
      },
      {
        question: "أي وسم ينشئ قائمة مرتبة (تظهر كأرقام تسلسلية)؟",
        options: ["<ol>", "<ul>", "<dl>"],
        correct: 0,
      },
      {
        question: "ما هو الوسم المخصص لكل عنصر منفرد داخل القائمة؟",
        options: ["<li>", "<item>", "<point>"],
        correct: 0,
      },
    ],
  },
  {
    id: 11,
    group: "TEXT & CONTENT",
    title: "Tables",
    description: "تعلّم تنظيم البيانات باستخدام جداول HTML.",
    content: `
      <article class="content-card">
        <h2>الجداول البيانات</h2>
        <p>يتكون الجدول من صفوف <code>&lt;tr&gt;</code> وعناوين <code>&lt;th&gt;</code> وخلايا <code>&lt;td&gt;</code>.</p>
      </article>
    `,
    exampleTitle: "جدول بسيط",
    exampleCode: `<table>\n  <tr>\n    <th>الاسم</th>\n    <th>الدرجة</th>\n  </tr>\n  <tr>\n    <td>أحمد</td>\n    <td>100</td>\n  </tr>\n</table>`,
    result: `<table border="1"><tr><th>الاسم</th><th>الدرجة</th></tr><tr><td>أحمد</td><td>100</td></tr></table>`,
    explanation: `<p>الوسم table يحتوي كامل بنية الجدول.</p>`,
    practice: "أنشئ جدولاً بسيطاً من صفين وعمودين.",
    starterCode: `<table>\n  <tr><td>1</td><td>2</td></tr>\n</table>`,
    questions: [
      {
        question: "أي وسم يمثل الصف في الجدول (Table Row)؟",
        options: ["<tr>", "<td>", "<th>"],
        correct: 0,
      },
      {
        question: "ما الوسم المخصص لخلية العنوان الرئيسية البارزة في الجدول؟",
        options: ["<th>", "<td>", "<head>"],
        correct: 0,
      },
      {
        question: "ما هو الوسم المخصص لخلية البيانات العادية داخل الصف؟",
        options: ["<td>", "<tr>", "<data>"],
        correct: 0,
      },
    ],
  },
  {
    id: 12,
    group: "TEXT & CONTENT",
    title: "Semantic HTML",
    description: "تعلّم معنى Semantic HTML ولماذا تساعد في تنظيم وفهم الصفحة.",
    content: `
      <article class="content-card">
        <h2>العناصر الدلالية</h2>
        <p>هي عناصر لها معنى واضح للمتصفح والمطور مثل <code>&lt;header&gt;</code> و <code>&lt;article&gt;</code>.</p>
      </article>
    `,
    exampleTitle: "هيكل دلالي",
    exampleCode: `<header>رأس الصفحة</header>\n<main>المحتوى</main>\n<footer>الذيل</footer>`,
    result: `<header>رأس الصفحة</header><main>المحتوى</main><footer>الذيل</footer>`,
    explanation: `<p>تساعد العناصر الدلالية تحسين محركات البحث SEO وسهولة الوصول.</p>`,
    practice: "اكتب هيكل صفحة باستخدام العناصر الدلالية.",
    starterCode: `<header>عنوان</header>\n<main>محتوى</main>`,
    questions: [
      {
        question: "ما الفائدة الرئيسية من استخدام العناصر الدلالية (Semantic HTML)؟",
        options: [
          "تحسين هيكلة الكود ومحركات البحث SEO وقارئات الشاشة",
          "زيادة سرعة اتصال الإنترنت للمستخدم",
          "تغيير تصميم الصفحة أوتوماتيكياً",
        ],
        correct: 0,
      },
      {
        question: "أي عنصر دلالي يفضل استخدامه للمحتوى المستقل كالمقالات والأخبار؟",
        options: ["<article>", "<div>", "<span>"],
        correct: 0,
      },
      {
        question: "أي عنصر دلالي يمثل المنطقة الفرعية أو الشريط الجانبي بالصفحة؟",
        options: ["<aside>", "<section>", "<nav>"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     FORMS
  ======================================================= */
  {
    id: 13,
    group: "FORMS",
    title: "Forms",
    description: "تعلّم إنشاء النماذج التي تسمح للمستخدم بإدخال وإرسال البيانات.",
    content: `
      <article class="content-card">
        <h2>النماذج Forms</h2>
        <p>تُستخدم النماذج لجمع المدخلات من المستخدمين وإرسالها للسيرفر.</p>
      </article>
    `,
    exampleTitle: "نموذج بسيط",
    exampleCode: `<form action="/submit">\n  <input type="text">\n  <button type="submit">إرسال</button>\n</form>`,
    result: `<form><input type="text" placeholder="اكتب هنا"><button type="button">إرسال</button></form>`,
    explanation: `<p>عنصر form يحوي أدوات الإدخال المختلفة.</p>`,
    practice: "أنشئ نموذج إدخال نص بسيط مع زر إرسال.",
    starterCode: `<form>\n  <input type="text">\n  <button type="submit">إرسال</button>\n</form>`,
    questions: [
      {
        question: "ما هو الحاوي الرئيسي لجميع أدوات مدخلات المستخدم بالنموذج؟",
        options: ["<form>", "<input>", "<group>"],
        correct: 0,
      },
      {
        question: "ما الخاصية التي تحدد رابط الوجهة لإرسال بيانات النموذج؟",
        options: ["action", "method", "href"],
        correct: 0,
      },
      {
        question: "ما نوع الزر المخصص لإرسال بيانات النموذج فور النقر عليه؟",
        options: ['type="submit"', 'type="button"', 'type="reset"'],
        correct: 0,
      },
    ],
  },
  {
    id: 14,
    group: "FORMS",
    title: "Input Types",
    description: "تعلّم أنواع input المختلفة وكيف تحدد نوع البيانات التي يدخلها المستخدم.",
    content: `
      <article class="content-card">
        <h2>أنواع حقول الإدخال</h2>
        <p>تحدد الخاصية <code>type</code> نوع البيانات مثل text, password, email, number.</p>
      </article>
    `,
    exampleTitle: "أنواع الإدخال",
    exampleCode: `<input type="email" placeholder="البريد">\n<input type="password">`,
    result: `<input type="email" placeholder="البريد"><br><br><input type="password" placeholder="كلمة السر">`,
    explanation: `<p>نوع password يختفي فيه النص لحماية السرية.</p>`,
    practice: "أنشئ حقل بريد إلكتروني وحقل كلمة مرور.",
    starterCode: `<input type="email">\n<input type="password">`,
    questions: [
      {
        question: "ما هو نوع الحقل المناسب لإدخال كلمات المرور وتشفيرها ظاهرياً على الشاشة؟",
        options: ['type="password"', 'type="text"', 'type="hidden"'],
        correct: 0,
      },
      {
        question: "ما نوع الإدخال المخصص لاختيار التاريخ من تقويم تفاعلي؟",
        options: ['type="date"', 'type="time"', 'type="calendar"'],
        correct: 0,
      },
      {
        question: "أي نوع يضمن مطابقة المدخلات لصيغة البريد الإلكتروني؟",
        options: ['type="email"', 'type="text"', 'type="mail"'],
        correct: 0,
      },
    ],
  },
  {
    id: 15,
    group: "FORMS",
    title: "Labels & Buttons",
    description: "تعلّم استخدام labels مع inputs وإنشاء الأزرار.",
    content: `
      <article class="content-card">
        <h2>العناوين والأزرار</h2>
        <p>ربط الـ <code>label</code> بالحقل يحسن سهولة الوصول والاستخدام.</p>
      </article>
    `,
    exampleTitle: "ربط Label بـ Input",
    exampleCode: `<label for="user">الاسم:</label>\n<input id="user" type="text">`,
    result: `<label for="user">الاسم: </label><input id="user" type="text">`,
    explanation: `<p>خاصية for في label تطابق خاصية id في input.</p>`,
    practice: "قم بربط label بحقل إدخال بـ id مناسب.",
    starterCode: `<label for="email">البريد:</label>\n<input id="email" type="email">`,
    questions: [
      {
        question: "ما هي الخاصية في وسم <label> التي ترتبطه بمعرف الحقل id؟",
        options: ["for", "to", "target"],
        correct: 0,
      },
      {
        question: "ما فائدة استخدام وسم Label بجانب حقل الإدخال؟",
        options: [
          "تحسين استخدام القارئات وسهولة النقر وتحديد الحقول",
          "تغيير شكل الحقل وتلوينه تلقائياً",
          "حفظ البيانات بالمتصفح",
        ],
        correct: 0,
      },
      {
        question: "أي وسم يمثل زراً تفاعلياً قابلاً للنقر؟",
        options: ["<button>", "<click>", "<press>"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     PAGE STRUCTURE
  ======================================================= */
  {
    id: 16,
    group: "PAGE STRUCTURE",
    title: "Header & Navigation",
    description: "تعلّم إنشاء رأس الصفحة ومنطقة التنقل.",
    content: `
      <article class="content-card">
        <h2>رأس الصفحة والتنقل</h2>
        <p>استخدم <code>&lt;header&gt;</code> للترويسة و <code>&lt;nav&gt;</code> لروابط القائمة.</p>
      </article>
    `,
    exampleTitle: "قائمة الهيدر",
    exampleCode: `<header>\n  <nav>\n    <a href="#">الرئيسية</a>\n  </nav>\n</header>`,
    result: `<header><nav><a href="#">الرئيسية</a></nav></header>`,
    explanation: `<p>يجمع nav روابط التنقل الأساسية للموقع.</p>`,
    practice: "أنشئ ترويسة تحتوي على رابطين.",
    starterCode: `<header>\n  <nav>\n    <a href="#">الرئيسية</a>\n  </nav>\n</header>`,
    questions: [
      {
        question: "أي عنصر دلالي يخصص لجمع روابط التنقل الأساسية في الموقع؟",
        options: ["<nav>", "<header>", "<menu>"],
        correct: 0,
      },
      {
        question: "أين يوضع عادةً وسم الترويسة العليا للموقع أو المقال؟",
        options: ["<header>", "<footer>", "<aside>"],
        correct: 0,
      },
      {
        question: "هل يمكن أن يحتوي header على شعار الموقع وعنوانه وروابط التنقل معاً؟",
        options: ["نعم، هذه الممارسة القياسية", "لا، يمنع إضافة أكثر من عنصر داخله", "فقط عند استخدام تنسيقات خاصة"],
        correct: 0,
      },
    ],
  },
  {
    id: 17,
    group: "PAGE STRUCTURE",
    title: "Main & Section",
    description: "تعلّم تنظيم المحتوى في أجزاء رئيسية وأقسام.",
    content: `
      <article class="content-card">
        <h2>المحتوى الرئيسي والأقسام</h2>
        <p>استخدم <code>&lt;main&gt;</code> للمحتوى الفريد و <code>&lt;section&gt;</code> لتجميع الأقسام.</p>
      </article>
    `,
    exampleTitle: "أقسام الموقع",
    exampleCode: `<main>\n  <section>\n    <h2>خدماتنا</h2>\n  </section>\n</main>`,
    result: `<main><section><h2>خدماتنا</h2></section></main>`,
    explanation: `<p>main يظهر مرة واحدة فقط في كل صفحة.</p>`,
    practice: "أنشئ محتوى رئيسي يحتوي على قسم واحد.",
    starterCode: `<main>\n  <section>محتوى</section>\n</main>`,
    questions: [
      {
        question: "كم مرة يفضل استخدام العنصر الرئيسي <main> في الصفحة الواحدة؟",
        options: ["مرة واحدة فقط بالصفحة", "عدة مرات في كل قسم", "بلا حدود"],
        correct: 0,
      },
      {
        question: "ما هو الوسم المخصص لتقسيم الصفحة إلى مواضيع وأقسام مستقلة؟",
        options: ["<section>", "<div>", "<span>"],
        correct: 0,
      },
      {
        question: "هل يصح وضع عدة عناصر <section> داخل <main>؟",
        options: ["نعم، ممارسة صحيحة وممتازة", "لا، يمنع ذلك برمجيًا", "فقط في الصفحة الرئيسية للموقع"],
        correct: 0,
      },
    ],
  },
  {
    id: 18,
    group: "PAGE STRUCTURE",
    title: "Article & Aside",
    description: "تعلّم استخدام article للمحتوى المستقل وaside للمحتوى الجانبي المرتبط.",
    content: `
      <article class="content-card">
        <h2>المقالات والجانبيات</h2>
        <p>استخدم <code>&lt;article&gt;</code> للمحتوى القابل للنشر المستقل و <code>&lt;aside&gt;</code> للشريط الجانبي.</p>
      </article>
    `,
    exampleTitle: "مقال وشريط جانبي",
    exampleCode: `<article><h2>خبر اليوم</h2></article>\n<aside>روابط ذات صلة</aside>`,
    result: `<article><h2>خبر اليوم</h2></article><aside>روابط ذات صلة</aside>`,
    explanation: `<p>article ممتاز للمنشورات والمقالات والأخبار.</p>`,
    practice: "اكتب وسم article مع عنوان وبداخله نص بسيط.",
    starterCode: `<article>\n  <h2>عنوان المقال</h2>\n</article>`,
    questions: [
      {
        question: "أي وسم يناسب الأخبار والمقالات القابلة للشرح والنشر بمفردها؟",
        options: ["<article>", "<aside>", "<div>"],
        correct: 0,
      },
      {
        question: "ما هو الوسم المناسب للشريط الجانبي والإعلانات والروابط الإضافية؟",
        options: ["<aside>", "<article>", "<section>"],
        correct: 0,
      },
      {
        question: "هل يمكن استخدام عناصر <article> متعددة في الصفحة الواحدة؟",
        options: ["نعم، مثل عرض قائمة مقالات أو أخبار", "لا غير ممكن إطلاقاً", "فقط مع الصور"],
        correct: 0,
      },
    ],
  },
  {
    id: 19,
    group: "PAGE STRUCTURE",
    title: "Footer",
    description: "تعلّم إنشاء تذييل الصفحة وإضافة حقوق النشر والمعلومات.",
    content: `
      <article class="content-card">
        <h2>تذييل الصفحة Footer</h2>
        <p>يحتوي التذييل على حقوق الملكية وروابط الاتصال والمعلومات القانونية.</p>
      </article>
    `,
    exampleTitle: "تذييل بسيط",
    exampleCode: `<footer>\n  <p>© 2026 جميع الحقوق محفوظة</p>\n</footer>`,
    result: `<footer><p>© 2026 جميع الحقوق محفوظة</p></footer>`,
    explanation: `<p>يوضع التذييل عادة في نهاية مستند الصفحة.</p>`,
    practice: "أنشئ تذييل صفحة يحتوي على حقوق النشر باسمك.",
    starterCode: `<footer>\n  <p>© حقوق النشر</p>\n</footer>`,
    questions: [
      {
        question: "أين يوضع وسم <footer> عادةً في الصفحة؟",
        options: ["في أسفل وتذييل الصفحة", "في أعلى الصفحة", "داخل القائمة الجانبية فقط"],
        correct: 0,
      },
      {
        question: "ما هي البيانات النموذجية التي توجد داخل Footer؟",
        options: ["حقوق الملكية والنشر ومعلومات الاتصال", "عناوين المقالات الرئيسية", "مدخلات الشراء المباشر"],
        correct: 0,
      },
      {
        question: "هل يمكن استخدام وسم footer داخل عناصر أخرى كـ article؟",
        options: ["نعم، لتذييل المقال ببيانات الكاتب", "لا، يتواجد بالصفحة الرئيسية فقط", "فقط مع النماذج"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     ADVANCED HTML
  ======================================================= */
  {
    id: 20,
    group: "ADVANCED HTML",
    title: "Accessibility",
    description: "تعلّم أساسيات جعل صفحات HTML أكثر سهولة للاستخدام لمختلف المستخدمين.",
    content: `
      <article class="content-card">
        <h2>سهولة الوصول Accessibility</h2>
        <p>تعني إتاحة استخدام الموقع لجميع الأفراد بمن فيهم ذوي الاحتياجات الخاصة عبر أدوات القراءة.</p>
      </article>
    `,
    exampleTitle: "إتاحة الصور",
    exampleCode: `<img src="cat.jpg" alt="قطة بيضاء تنام على الأريكة">`,
    result: `<p>صورة وصفية واضحة لقارئات الشاشة</p>`,
    explanation: `<p>إضافة وصف alt دقيق يساعد قارئات الشاشة للمكفوفين.</p>`,
    practice: "أضف وسم صورة مجهز بخاصية alt توضيحية ممتازة.",
    starterCode: `<img src="book.jpg" alt="كتاب مفتوح">`,
    questions: [
      {
        question: "ما الهدف الرئيسي من تطبيق مفهوم Accessibility في الويب؟",
        options: [
          "جعل الموقع متاحاً ومفهوماً لجميع المستخدمين بمن فيهم ذوي الاحتياجات",
          "تسريع السيرفر",
          "منع نسخ الصور والرموز",
        ],
        correct: 0,
      },
      {
        question: "ما هي الخاصية الأكثر أهمية لمساعدة قارئات الشاشة مع الصور؟",
        options: ["alt", "title", "src"],
        correct: 0,
      },
      {
        question: "أي الأساليب تساعد أدوات تكبير وقراءة الشاشات أكثر؟",
        options: [
          "استخدام عناصر HTML الدلالية المنظمة",
          "استخدام الألوان الفاقعة للغاية",
          "استخدام الصور بدلاً من النصوص",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 21,
    group: "ADVANCED HTML",
    title: "SEO Basics",
    description: "تعلّم أساسيات SEO وكيف تحسن من ظهور موقعك في محركات البحث.",
    content: `
      <article class="content-card">
        <h2>تهيئة محركات البحث SEO</h2>
        <p>تساعد وسوم العناوين والعناوين الوصفية Meta في تصدر نتائج البحث في جوجل.</p>
      </article>
    `,
    exampleTitle: "وسوم SEO",
    exampleCode: `<title>تعلم HTML بسهولة</title>\n<meta name="description" content="دورة تعليمية">`,
    result: `<p>إعدادات رأس الصفحة لتحسين الظهور</p>`,
    explanation: `<p>العنوان الوصفي يظهر تحت رابط الموقع في نتائج جوجل.</p>`,
    practice: "اكتب وسم title مميز لموقع تعليمي.",
    starterCode: `<title>موقعي التعليمي</title>`,
    questions: [
      {
        question: "ماذا تعني اختصار كلمة SEO؟",
        options: ["Search Engine Optimization", "Site Engine Options", "System Easy Output"],
        correct: 0,
      },
      {
        question: "أي وسم يحدد اسم ونعنوان الصفحة الظاهر في تبويب المتصفح ومحرك البحث؟",
        options: ["<title>", "<header>", "<meta>"],
        correct: 0,
      },
      {
        question: "ما الوسم الذي يحدد وصف الصفحة للظهور تحت العنوان في نتائج البحث؟",
        options: ['<meta name="description">', '<p class="desc">', '<link rel="seo">'],
        correct: 0,
      },
    ],
  },
  {
    id: 22,
    group: "ADVANCED HTML",
    title: "Audio & Video",
    description: "تعلّم إضافة محتوى صوتي ومرئي إلى صفحات HTML.",
    content: `
      <article class="content-card">
        <h2>الوسائط الصوتية والمرئية</h2>
        <p>استخدم <code>&lt;audio&gt;</code> للصوتيات و <code>&lt;video&gt;</code> لمقاطع الفيديو.</p>
      </article>
    `,
    exampleTitle: "تضمين فيديو وصوت",
    exampleCode: `<video controls width="300">\n  <source src="video.mp4" type="video/mp4">\n</video>`,
    result: `<p>مشغل وسائط يدعم أزرار التحكم controls</p>`,
    explanation: `<p>الخاصية controls تضيف أزرار التشغيل والتحكم بالصوت.</p>`,
    practice: "أنشئ عنصر فيديو يحتوي على خاصية controls.",
    starterCode: `<video controls>\n  <source src="movie.mp4" type="video/mp4">\n</video>`,
    questions: [
      {
        question: "ما هي الخاصية التي تُظهر أزرار التشغيل والإيقاف للوسائط على الشاشة؟",
        options: ["controls", "autoplay", "loop"],
        correct: 0,
      },
      {
        question: "ما هو الوسم المخصص لإدراج الصوتيات في HTML5؟",
        options: ["<audio>", "<sound>", "<mp3>"],
        correct: 0,
      },
      {
        question: "أي وسم فرعي يحدد مصدر ورابط ملف الميديا داخل وسم الفيديو؟",
        options: ["<source>", "<src>", "<file>"],
        correct: 0,
      },
    ],
  },
  {
    id: 23,
    group: "ADVANCED HTML",
    title: "Div & Span",
    description: "تعلّم استخدام div كحاوية عامة وspan لتنسيق الأجزاء الصغيرة.",
    content: `
      <article class="content-card">
        <h2>العناصر الحاوية Div و Span</h2>
        <p><code>&lt;div&gt;</code> عنصر كتلوي Block لتجميع العناصر، بينما <code>&lt;span&gt;</code> عنصر مضمن Inline لقطعة نصية.</p>
      </article>
    `,
    exampleTitle: "Div و Span",
    exampleCode: `<div class="card">\n  <p>أنا أدرس <span style="color:red">HTML</span></p>\n</div>`,
    result: `<div><p>أنا أدرس <span style="color:red">HTML</span></p></div>`,
    explanation: `<p>Div ينشئ سطرًا جديداً، أما Span لا يقطع السطر.</p>`,
    practice: "استخدم span لتغيير كلمة واحدة داخل الفقرة.",
    starterCode: `<p>مرحباً <span>بالجميع</span></p>`,
    questions: [
      {
        question: "ما نوع العنصر <div> من حيث طريقة العرض بالصفحة؟",
        options: ["عنصر كتلوي (Block-level) يتأخذ السطر كاملاً", "عنصر مضمن (Inline)", "عنصر مخفي تلقائياً"],
        correct: 0,
      },
      {
        question: "ما هو الوسم المناسب لتغليف كلمة داخل فقرة لتنسيقها دون قطع السطر؟",
        options: ["<span>", "<div>", "<p>"],
        correct: 0,
      },
      {
        question: "هل يمتلك div أو span أي شكل جمالي افتراضي بدون CSS؟",
        options: ["لا، هما حاويات بلا أشكال أو حدود افتراضية", "نعم، يضيفان إطاراً خفيفاً", "يغيران نوع الخط تلقائياً"],
        correct: 0,
      },
    ],
  },
  {
    id: 24,
    group: "ADVANCED HTML",
    title: "Comments",
    description: "تعلّم كتابة التعليقات داخل HTML واستخدامها لتنظيم الكود.",
    content: `
      <article class="content-card">
        <h2>التعليقات في HTML</h2>
        <p>التعليقات هي ملاحظات برمجية للمطور لا تظهر للمستخدمين على الصفحة.</p>
      </article>
    `,
    exampleTitle: "كتابة تعليق",
    exampleCode: `<!-- هذا تعليق توضيحي -->\n<p>محتوى ظاهر</p>`,
    result: `<p>محتوى ظاهر</p>`,
    explanation: `<p>تبدأ التعليقات بـ &lt;!-- وتنتهي بـ --&gt;.</p>`,
    practice: "اكتب تعليقاً توضيحياً قبل الوسم الرئيسي.",
    starterCode: `<!-- بداية الترويسة -->\n<h1>أهلاً</h1>`,
    questions: [
      {
        question: "ما هي الصيغة الصحيحة لكتابة تعليق في HTML؟",
        options: ["<!-- تعليق -->", "// تعليق", "/* تعليق */"],
        correct: 0,
      },
      {
        question: "هل تظهر نصوص التعليقات للمستخدمين أثناء تصفح الصفحة؟",
        options: ["لا، يتجاهلها المتصفح تماماً أثناء العرض", "نعم دائماً", "تظهر في أسفل الصفحة فقط"],
        correct: 0,
      },
      {
        question: "ما فائدة كتابة التعليقات في أكواد HTML؟",
        options: ["توضيح وتنظيم وتسهيل قراءة الكود للمطورين", "تسريع فتح الصفحة بالموقع", "تغيير الألوان مجاناً"],
        correct: 0,
      },
    ],
  },
  {
    id: 25,
    group: "ADVANCED HTML",
    title: "Meta Elements",
    description: "تعلّم أساسيات Meta Elements ودورها في معلومات الصفحة.",
    content: `
      <article class="content-card">
        <h2>وسوم Meta</h2>
        <p>تزود المتصفح بترميز النصوص وحجم الشاشة والمعلومات الإضافية.</p>
      </article>
    `,
    exampleTitle: "ترميز وسوم الشاشة",
    exampleCode: `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    result: `<p>وسوم الميتا الأساسية لضبط الترميز والاستجابة</p>`,
    explanation: `<p>UTF-8 يضمن دعم اللغة العربية بشكل صحيح بدون رموز غريبة.</p>`,
    practice: "اكتب وسم تحديد الترميز للغة العربية UTF-8.",
    starterCode: `<meta charset="UTF-8">`,
    questions: [
      {
        question: 'ما فائدة وسم <meta charset="UTF-8">؟',
        options: ["دعم وعرض اللغة العربية وجميع اللغات بدون رموش غريبة", "تغيير عرض الصفحة", "توفير الحماية للموقع"],
        correct: 0,
      },
      {
        question: "أي وسم ميتا يضمن تجاوب الصفحة مع شاشات الهواتف والموبايل؟",
        options: ['<meta name="viewport">', '<meta name="mobile">', '<meta name="screen">'],
        correct: 0,
      },
      {
        question: "أين توضع جميع وسوم Meta داخل هيكل المستند؟",
        options: ["داخل عنصر <head>", "داخل عنصر <body>", "في تذييل الصفحة"],
        correct: 0,
      },
    ],
  },
  {
    id: 26,
    group: "ADVANCED HTML",
    title: "Select & Option",
    description: "تعلّم إنشاء قوائم اختيار منسدلة باستخدام select وoption.",
    content: `
      <article class="content-card">
        <h2>القوائم المنسدلة Dropdowns</h2>
        <p>أنشئ قائمة منسدلة باستخدام <code>&lt;select&gt;</code> والخيارات <code>&lt;option&gt;</code>.</p>
      </article>
    `,
    exampleTitle: "قائمة اختيار",
    exampleCode: `<select>\n  <option>مصر</option>\n  <option>السعودية</option>\n</select>`,
    result: `<select><option>مصر</option><option>السعودية</option></select>`,
    explanation: `<p>يمكن إعطاء القيمة الحقيقية لكل خيار باستخدام خاصية value.</p>`,
    practice: "أنشئ قائمة اختيار تحتوي على لغتين بـ option.",
    starterCode: `<select>\n  <option value="ar">العربية</option>\n</select>`,
    questions: [
      {
        question: "ما هو الوسم الذي ينشئ القائمة المنسدلة للاختيار؟",
        options: ["<select>", "<dropdown>", "<choose>"],
        correct: 0,
      },
      {
        question: "ما هو الوسم الذي يمثل كل خيار فرعي داخل قائمة select؟",
        options: ["<option>", "<item>", "<list>"],
        correct: 0,
      },
      {
        question: "ما هي الخاصية المستخدمة لتحديد القيمة المرسلة للسيرفر عند الاختيار؟",
        options: ["value", "name", "data"],
        correct: 0,
      },
    ],
  },
  {
    id: 27,
    group: "ADVANCED HTML",
    title: "Textarea",
    description: "تعلّم استخدام textarea لإدخال نصوص متعددة الأسطر.",
    content: `
      <article class="content-card">
        <h2>مربع النص المتعدد الأسطر</h2>
        <p>يسمح عنصر <code>&lt;textarea&gt;</code> بكتابة نصوص طويلة ومقالات ورسائل التواصل.</p>
      </article>
    `,
    exampleTitle: "مربع ملاحظات",
    exampleCode: `<textarea rows="4" cols="50" placeholder="اكتب ملاحظتك"></textarea>`,
    result: `<textarea rows="3" placeholder="اكتب ملاحظتك"></textarea>`,
    explanation: `<p>الخصائص rows و cols تحددان الأبعاد بالأعمدة والأسطر.</p>`,
    practice: "أنشئ textarea لكتابة رسالة مع تحديد عدد الأسطر.",
    starterCode: `<textarea rows="5" placeholder="ارسل رسالتك"></textarea>`,
    questions: [
      {
        question: "ما العنصر المناسب لإدخال نص مطول يتكون من عدة أسطر كالملاحظات؟",
        options: ["<textarea>", '<input type="text">', "<p>"],
        correct: 0,
      },
      {
        question: "ما الخاصية المحددة لارتفاع مربع النص بعدد الأسطر؟",
        options: ["rows", "cols", "height"],
        correct: 0,
      },
      {
        question: "هل يمتلك وسم textarea وسم إغلاق منفصل؟",
        options: ["نعم، يمتلك وسم إغلاق </textarea>", "لا هو وسم مغلق ذاتياً", "فقط مع النماذج المتقدمة"],
        correct: 0,
      },
    ],
  },
  {
    id: 28,
    group: "ADVANCED HTML",
    title: "Details & Summary",
    description: "تعلّم إنشاء عناصر قابلة للطي للتفاصيل والأسئلة الشائعة.",
    content: `
      <article class="content-card">
        <h2>عناصر الإظهار والإخفاء</h2>
        <p>استخدم <code>&lt;details&gt;</code> مع <code>&lt;summary&gt;</code> لإنشاء قائمة أسئلة تفاعلية.</p>
      </article>
    `,
    exampleTitle: "سؤال وشرح مطوي",
    exampleCode: `<details>\n  <summary>ما هي الدورة؟</summary>\n  <p>دورة تعليمية شاملة.</p>\n</details>`,
    result: `<details><summary>ما هي الدورة؟</summary><p>دورة تعليمية شاملة.</p></details>`,
    explanation: `<p>عند النقر على summary يفتح المتصفح محتوى details.</p>`,
    practice: "أنشئ سؤال شائع مع إجابته المطوية.",
    starterCode: `<details>\n  <summary>سؤال</summary>\n  <p>إجابة</p>\n</details>`,
    questions: [
      {
        question: "ما العنصر المسؤول عن العنوان الظاهر والقابل للنقر لإظهار وإخفاء المحتوى؟",
        options: ["<summary>", "<details>", "<title>"],
        correct: 0,
      },
      {
        question: "ما الوسم الحاوي للعملية التفاعلية المطوية بالكامل دون الحاجة لـ JavaScript؟",
        options: ["<details>", "<toggle>", "<accordion>"],
        correct: 0,
      },
      {
        question: "هل تظهر محتويات details التفصيلية تلقائياً قبل أن ينقر عليها المستخدم؟",
        options: ["تكون مخفية افتراضياً حتى يتم النقر عليها", "تظهر مفتوحة دائماً", "تحتاج CSS لتختفي"],
        correct: 0,
      },
    ],
  },
  {
    id: 29,
    group: "ADVANCED HTML",
    title: "Iframes",
    description: "تعلّم أساسيات تضمين صفحات أو محتوى خارجي باستخدام iframe.",
    content: `
      <article class="content-card">
        <h2>التضمين بـ Iframe</h2>
        <p>يسمح <code>&lt;iframe&gt;</code> بتضمين خرائط جوجل أو مقاطع يوتيوب أو صفحات خارجية.</p>
      </article>
    `,
    exampleTitle: "تضمين صفحة",
    exampleCode: `<iframe src="https://example.com" width="100%" height="200"></iframe>`,
    result: `<p>مربع تضمين محتوى خارجي يظهر هنا</p>`,
    explanation: `<p>الخاصية src تحدد رابط الصفحة المضمنة.</p>`,
    practice: "أنشئ iframe مع العرض والارتفاع المناسبين.",
    starterCode: `<iframe src="https://example.com" width="300" height="200"></iframe>`,
    questions: [
      {
        question: "ما وظيفة العنصر <iframe>؟",
        options: [
          "تضمين صفحة أو موقع أو ميديا خارجية داخل الصفحة الحالية",
          "إنشاء إطار أحمر حول الفقرة",
          "تشغيل الصوت فقط",
        ],
        correct: 0,
      },
      {
        question: "ما هي الخاصية المحددة لرابط الصفحة الخارجية المضمنة داخل iframe؟",
        options: ["src", "href", "link"],
        correct: 0,
      },
      {
        question: "ما الخصائص المستخدمة لضبط أبعاد إطار التضمين؟",
        options: ["width و height", "size و scale", "max و min"],
        correct: 0,
      },
    ],
  },
  {
    id: 30,
    group: "ADVANCED HTML",
    title: "مشروع تطبيق HTML كامل",
    description: "تطبيق شامل لجميع المهارات والمفاهيم التي تعلمتها في الدورة.",
    content: `
      <article class="content-card">
        <h2>التطبيق النهائي</h2>
        <p>تهانينا! أنت الآن قادر على بناء صفحة ويب متكاملة ومتحكمة باستخدام أحدث معايير HTML5.</p>
      </article>
    `,
    exampleTitle: "صفحة ويب متكاملة",
    exampleCode: `<!DOCTYPE html>\n<html lang="ar">\n<head>\n  <title>موقعي النهائي</title>\n</head>\n<body>\n  <header><h1>موقعي</h1></header>\n  <main><p>محتوى متكامل</p></main>\n  <footer>الحقوق محفوظة</footer>\n</body>\n</html>`,
    result: `<header><h1>موقعي</h1></header><main><p>محتوى متكامل</p></main><footer>الحقوق محفوظة</footer>`,
    explanation: `<p>تم دمج كافة الوسوم الهيكلية والدلالية لبناء الصفحة بشكل احترافي.</p>`,
    practice: "قم بكتابة صفحة HTML متكاملة تحتوي على هيدر ومحتوى وتذييل.",
    starterCode: `<!DOCTYPE html>\n<html lang="ar">\n<head>\n  <title>مشروعي</title>\n</head>\n<body>\n  <!-- ابدأ البناء هنا -->\n</body>\n</html>`,
    questions: [
      {
        question: "ما هو التسلسل السليم والمنظم لبناء صفحة ويب دلالية ممتازة؟",
        options: ["<header> ثم <main> ثم <footer>", "<footer> ثم <header> ثم <main>", "<main> فقط بدون باقي الوسوم"],
        correct: 0,
      },
      {
        question: "ما هو الوسم الذي يغلف كامل المستند ويحدد الاتجاه واللغة؟",
        options: ["<html>", "<body>", "<head>"],
        correct: 0,
      },
      {
        question: "أي مما يلي يعد الممارسة الأفضل عند بناء أي موقع حالياً؟",
        options: [
          "استخدام العناصر الدلالية المعنوية والتنظيم الاحترافي",
          "استخدام div في كل الكود بدون دلالة",
          "تجاهل العناوين تماماً",
        ],
        correct: 0,
      },
    ],
  },
];

/* =========================================================
   FAYAD — HTML LEARNING ENGINE
   FIXED ENGINE
   30 LESSONS × 3 QUESTIONS
   Arabic Only
========================================================= */

/* =========================================================
   1. STATE MANAGEMENT
========================================================= */
const QUIZ_QUESTION_COUNT = 3;

let currentLesson = 1;
let currentQuestion = 0;
let quizLocked = false;
let currentQuestionPassed = false;
let completedLessons = [];
try {
  const savedProgress = JSON.parse(localStorage.getItem("fayad-html-progress") || "[]");

  completedLessons = Array.isArray(savedProgress) ? savedProgress.map(Number).filter(Number.isFinite) : [];
} catch (error) {
  completedLessons = [];
}

/* =========================================================
   2. DOM HELPERS
========================================================= */

function getElement(...ids) {
  for (const id of ids) {
    const element = document.getElementById(id);

    if (element) {
      return element;
    }
  }

  return null;
}

/* =========================================================
   3. LESSON DOM ELEMENTS
========================================================= */

const lessonGroup = getElement("lesson-group", "lessonGroup");

const lessonTitle = getElement("lesson-title", "lessonTitle");

const lessonDescription = getElement("lesson-description", "lessonDescription");

const lessonContent = getElement("lesson-content", "lessonContent");

const exampleTitle = getElement("example-title", "exampleTitle");

const exampleCode = getElement("example-code", "exampleCode");

const exampleResult = getElement("example-result", "exampleResult");

const exampleExplanation = getElement("example-explanation", "exampleExplanation");

const practiceTask = getElement("practice-task", "practiceTask");

const progressText = getElement("progress-text", "progressText");

const progressFill = getElement("progress-fill", "progressFill");

/* =========================================================
   4. EDITOR / PREVIEW DOM
========================================================= */

const codeEditor = getElement("code-editor", "codeEditor");

const livePreview = getElement("live-preview", "livePreview");

const resetCodeBtn = getElement("reset-code-btn", "resetCodeBtn");

const copyButton = getElement("copy-btn", "copyButton");

/* =========================================================
   5. LESSON NAVIGATION DOM
========================================================= */

const previousButton = getElement("previous-btn", "previousButton");

const nextButton = getElement("next-btn", "nextButton");

const previousTitle = getElement("previous-title", "previousTitle");

const nextTitle = getElement("next-title", "nextTitle");

/* =========================================================
   6. QUIZ DOM
========================================================= */

const quizQuestionNumber = getElement("quiz-question-number", "quizQuestionNumber");

const quizTotalQuestions = getElement("quiz-total-questions", "quizTotalQuestions");

const quizQuestionText = document.getElementById("questionTitle");

const answerOptions = getElement("answer-options", "answerOptions");

const answerFeedback = getElement("answer-feedback", "answerFeedback");

/* =========================================================
   7. FIND EXISTING QUIZ NEXT BUTTON
========================================================= */

function getQuizNextButtons() {
  return Array.from(document.querySelectorAll("#quiz-next-button, #quizNextButton, .quiz-next-btn"));
}

/* =========================================================
   8. REMOVE DUPLICATE QUIZ BUTTONS
========================================================= */

function cleanupQuizNextButtons() {
  const buttons = getQuizNextButtons();

  if (buttons.length === 0) {
    return null;
  }

  /*
    نحتفظ بأول زر فقط.
    أي نسخة إضافية يتم حذفها.
  */

  const mainButton = buttons[0];

  buttons.slice(1).forEach((button) => {
    button.remove();
  });

  return mainButton;
}

/* =========================================================
   9. SAVE PROGRESS
========================================================= */

function saveProgress() {
  localStorage.setItem("fayad-html-progress", JSON.stringify(completedLessons));
}
/* =========================================================
   10. NORMALIZE PROGRESS
========================================================= */

function normalizeProgress() {
  completedLessons = [
    ...new Set(completedLessons.map(Number).filter((id) => lessons.some((lesson) => Number(lesson.id) === id))),
  ].sort((a, b) => a - b);

  saveProgress();
}

/* =========================================================
   11. CURRENT LESSON
========================================================= */

function getCurrentLesson() {
  return lessons.find((lesson) => Number(lesson.id) === Number(currentLesson)) || null;
}

/* =========================================================
   12. CURRENT QUESTIONS
========================================================= */

function getCurrentLessonQuestions() {
  const lesson = getCurrentLesson();

  if (!lesson || !Array.isArray(lesson.questions)) {
    return [];
  }

  return lesson.questions.slice(0, QUIZ_QUESTION_COUNT);
}

/* =========================================================
   13. CURRENT QUESTION
========================================================= */

function getCurrentQuestion() {
  const questions = getCurrentLessonQuestions();

  return questions[currentQuestion] || null;
}

/* =========================================================
   14. SIDEBAR
========================================================= */

function renderSidebar() {
  const links = document.querySelectorAll(".sidebar .lesson");

  links.forEach((link) => {
    const dataLesson = Number(link.dataset.lesson);

    if (!Number.isFinite(dataLesson)) {
      return;
    }

    /*
      يدعم الحالتين:
      data-lesson="1"  → lesson 1
      data-lesson="0"  → lesson 1
    */

    let lessonId = dataLesson;

    if (dataLesson === 0) {
      lessonId = 1;
    }

    if (!lessons.some((lesson) => Number(lesson.id) === lessonId)) {
      lessonId = dataLesson + 1;
    }

    link.classList.toggle("active", lessonId === Number(currentLesson));

    const status = link.querySelector(".lesson-status");

    if (!status) {
      return;
    }

    status.classList.remove("current", "completed");

    if (lessonId === Number(currentLesson)) {
      status.classList.add("current");
    }

    if (completedLessons.includes(lessonId)) {
      status.classList.add("completed");
      status.textContent = "✓";
    } else {
      status.textContent = String(lessonId).padStart(2, "0");
    }
  });
}

/* =========================================================
   15. COURSE PROGRESS
========================================================= */

function updateProgress() {
  const total = lessons.length;
  const completed = completedLessons.length;

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (progressText) {
    progressText.textContent = `${percentage}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
}

/* =========================================================
   16. MARK LESSON COMPLETED
========================================================= */

function markLessonCompleted(id) {
  id = Number(id);

  if (!Number.isFinite(id)) {
    return;
  }

  const exists = lessons.some((lesson) => Number(lesson.id) === id);

  if (!exists) {
    return;
  }

  if (!completedLessons.includes(id)) {
    completedLessons.push(id);
  }

  normalizeProgress();
  renderSidebar();
  updateProgress();
}

/* =========================================================
   17. RESET QUIZ
========================================================= */

function resetQuizState() {
  currentQuestion = 0;
  quizLocked = false;
  currentQuestionPassed = false;
}

/* =========================================================
   18. LOAD LESSON
========================================================= */

function loadLesson(id, shouldScroll = true) {
  const lesson = lessons.find((item) => Number(item.id) === Number(id));

  if (!lesson) {
    console.error("FAYAD: Lesson not found:", id);
    return;
  }

  currentLesson = Number(lesson.id);

  resetQuizState();

  /* LESSON */

  if (lessonGroup) {
    lessonGroup.textContent = lesson.group || "";
  }

  if (lessonTitle) {
    lessonTitle.textContent = lesson.title || "";
  }

  if (lessonDescription) {
    lessonDescription.textContent = lesson.description || "";
  }

  if (lessonContent) {
    lessonContent.innerHTML = lesson.content || "";
  }

  /* EXAMPLE */

  if (exampleTitle) {
    exampleTitle.textContent = lesson.exampleTitle || "";
  }

  if (exampleCode) {
    exampleCode.textContent = lesson.exampleCode || "";
  }

  if (exampleResult) {
    exampleResult.innerHTML = lesson.result || "";
  }

  if (exampleExplanation) {
    exampleExplanation.innerHTML = lesson.explanation || "";
  }

  /* PRACTICE */

  if (practiceTask) {
    practiceTask.textContent = lesson.practice || "";
  }

  /* EDITOR */

  if (codeEditor) {
    codeEditor.value = lesson.starterCode || "";
  }

  updatePreview();
  renderSidebar();
  updateProgress();
  updateNavigation();
  renderQuiz();

  if (shouldScroll) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

/* =========================================================
   19. LESSON NAVIGATION
========================================================= */

function updateNavigation() {
  const previous = lessons.find((lesson) => Number(lesson.id) === Number(currentLesson) - 1);

  const next = lessons.find((lesson) => Number(lesson.id) === Number(currentLesson) + 1);

  if (previousButton) {
    previousButton.disabled = !previous;
  }

  if (previousTitle) {
    previousTitle.textContent = previous ? previous.title : "بداية الدورة";
  }

  if (nextButton) {
    nextButton.disabled = !next;
  }

  if (nextTitle) {
    nextTitle.textContent = next ? next.title : "اكتملت الدورة";
  }
}

/* =========================================================
   20. QUIZ NEXT BUTTON
========================================================= */

let quizNextButton = null;

function setupQuizNextButton() {
  const buttons = document.querySelectorAll("#quiz-next-button, #quizNextButton, .quiz-next-btn");

  if (!buttons.length) {
    quizNextButton = null;
    return;
  }

  quizNextButton = buttons[0];

  buttons.forEach((button, index) => {
    if (index > 0) {
      button.remove();
    }
  });

  quizNextButton.type = "button";

  quizNextButton.onclick = handleQuizNext;
}

/* =========================================================
21. RENDER QUIZ
========================================================= */

function renderQuiz() {
  const lesson = getCurrentLesson();
  const questions = getCurrentLessonQuestions();

  setupQuizNextButton();

  if (!lesson || questions.length === 0) {
    if (quizQuestionNumber) {
      quizQuestionNumber.textContent = "السؤال 0";
    }

    if (quizTotalQuestions) {
      quizTotalQuestions.textContent = "0";
    }

    if (quizQuestionText) {
      quizQuestionText.textContent = "";
    }

    if (answerOptions) {
      answerOptions.innerHTML = "";
    }

    if (answerFeedback) {
      answerFeedback.textContent = "";
    }

    return;
  }

  if (currentQuestion < 0 || currentQuestion >= questions.length) {
    currentQuestion = 0;
  }

  const question = questions[currentQuestion];

  if (!question) {
    return;
  }

  /* COUNTER */

  if (quizQuestionNumber) {
    quizQuestionNumber.textContent = `السؤال ${currentQuestion + 1}`;
  }

  if (quizTotalQuestions) {
    quizTotalQuestions.textContent = String(questions.length);
  }

  /* QUESTION */

  if (quizQuestionText) {
    quizQuestionText.textContent = question.question || "";
  }

  /* FEEDBACK */

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
  }

  /* NEXT BUTTON */

  quizLocked = false;
  currentQuestionPassed = false;

  if (quizNextButton) {
    quizNextButton.disabled = true;

    quizNextButton.textContent =
      currentQuestion < questions.length - 1
        ? "السؤال التالي →"
        : "إنهاء الاختبار →";
  }

  /* ANSWERS */

  if (!answerOptions) {
    return;
  }

  answerOptions.innerHTML = "";

  const options = Array.isArray(question.options)
    ? question.options
    : [];

  if (!options.length) {
    const message = document.createElement("p");

    message.className = "quiz-empty-message";
    message.textContent = "لا توجد إجابات متاحة لهذا السؤال.";

    answerOptions.appendChild(message);

    return;
  }

  /* =======================================================
     SHUFFLE ANSWERS
     نحفظ رقم الإجابة الأصلي حتى تظل الإجابة الصحيحة صحيحة
  ======================================================= */

  const shuffledOptions = options
    .map((optionText, originalIndex) => ({
      optionText,
      originalIndex
    }))
    .sort(() => Math.random() - 0.5);

  // حفظ الترتيب العشوائي للسؤال الحالي
  question._shuffledOptions = shuffledOptions;

  shuffledOptions.forEach((item, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-btn";

    button.textContent = item.optionText;

    button.setAttribute(
      "aria-label",
      `الإجابة ${index + 1}`
    );

    button.addEventListener("click", () => {
      handleAnswerSelect(index);
    });

    answerOptions.appendChild(button);
  });
}


/* =========================================================
22. HANDLE ANSWER
========================================================= */

function handleAnswerSelect(selectedIndex) {
  if (quizLocked) {
    return;
  }

  const question = getCurrentQuestion();

  if (!question) {
    return;
  }

  const buttons = answerOptions
    ? answerOptions.querySelectorAll("button.answer-btn")
    : [];

  /* =======================================================
     معرفة رقم الإجابة الأصلي قبل الـ Shuffle
  ======================================================= */

  const shuffledItem =
    question._shuffledOptions?.[selectedIndex];

  if (!shuffledItem) {
    return;
  }

  const originalIndex = shuffledItem.originalIndex;

  const isCorrect =
    Number(originalIndex) === Number(question.correct);

  if (isCorrect) {
    quizLocked = true;
    currentQuestionPassed = true;

    buttons.forEach((button) => {
      button.disabled = true;
    });

    const selectedButton = buttons[selectedIndex];

    if (selectedButton) {
      selectedButton.classList.add(
        "correct",
        "correct-answer"
      );
    }

    if (answerFeedback) {
      answerFeedback.textContent =
        "إجابة صحيحة! أحسنت 👏";

      answerFeedback.className =
        "answer-feedback correct";
    }

    if (quizNextButton) {
      quizNextButton.disabled = false;
    }

    return;
  }

  /* =======================================================
     WRONG ANSWER
  ======================================================= */

  const wrongButton = buttons[selectedIndex];

  if (wrongButton) {
    wrongButton.classList.add(
      "wrong",
      "wrong-answer"
    );

    wrongButton.disabled = true;
  }

  if (answerFeedback) {
    answerFeedback.textContent =
      "إجابة غير صحيحة. حاول مرة أخرى.";

    answerFeedback.className =
      "answer-feedback wrong";
  }
}
/* =========================================================
   23. NEXT QUESTION / NEXT LESSON
========================================================= */

function handleQuizNext() {
  if (!currentQuestionPassed) {
    return;
  }

  const questions = getCurrentLessonQuestions();

  /* QUESTION → NEXT QUESTION */

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;

    quizLocked = false;
    currentQuestionPassed = false;

    renderQuiz();

    return;
  }

  /* COMPLETE LESSON */

  markLessonCompleted(currentLesson);

  /* LAST LESSON */

  if (Number(currentLesson) >= lessons.length) {
    if (quizNextButton) {
      quizNextButton.disabled = true;
      quizNextButton.textContent = "اكتملت الدورة 🎉";
    }

    if (answerFeedback) {
      answerFeedback.textContent = "مبروك! لقد أكملت مسار HTML كاملًا 🎉";

      answerFeedback.className = "answer-feedback correct";
    }

    return;
  }

  /* NEXT LESSON */

  const nextLesson = lessons.find((lesson) => Number(lesson.id) === Number(currentLesson) + 1);

  if (nextLesson) {
    loadLesson(nextLesson.id, true);
  }
}

/* =========================================================
   24. PREVIEW
========================================================= */

function updatePreview() {
  if (!livePreview || !codeEditor) {
    return;
  }

  const code = codeEditor.value;

  const documentContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<style>

body {
  font-family: Arial, sans-serif;
  padding: 20px;
  line-height: 1.7;
  direction: rtl;
}

img {
  max-width: 100%;
  height: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

a {
  color: #0066cc;
}

</style>

</head>

<body>

${code}

</body>

</html>
`;

  livePreview.srcdoc = documentContent;
}

/* =========================================================
   25. RESET EDITOR
========================================================= */

function resetEditor() {
  const lesson = getCurrentLesson();

  if (!lesson || !codeEditor) {
    return;
  }

  codeEditor.value = lesson.starterCode || "";

  updatePreview();
}

/* =========================================================
   26. SIDEBAR EVENTS
========================================================= */

function setupSidebar() {
  const links = document.querySelectorAll(".sidebar .lesson");

  links.forEach((link) => {
    if (link.dataset.fayadBound === "true") {
      return;
    }

    link.dataset.fayadBound = "true";

    link.addEventListener("click", (event) => {
      event.preventDefault();

      const dataLesson = Number(link.dataset.lesson);

      if (!Number.isFinite(dataLesson)) {
        return;
      }

      /*
          لو HTML يستخدم:
          data-lesson="0" → الدرس الأول
          data-lesson="1" → الدرس الأول أيضاً
          data-lesson="2" → الدرس الثاني
        */

      let lessonId = dataLesson === 0 ? 1 : dataLesson;

      if (!lessons.some((lesson) => Number(lesson.id) === lessonId)) {
        lessonId = dataLesson + 1;
      }

      loadLesson(lessonId, true);
    });
  });
}

/* =========================================================
   27. PREVIOUS BUTTON
========================================================= */

function setupPreviousButton() {
  if (!previousButton) {
    return;
  }

  if (previousButton.dataset.fayadBound === "true") {
    return;
  }

  previousButton.dataset.fayadBound = "true";

  previousButton.addEventListener("click", () => {
    if (currentLesson > 1) {
      loadLesson(currentLesson - 1, true);
    }
  });
}

/* =========================================================
   28. NEXT BUTTON
========================================================= */

function setupNextButton() {
  if (!nextButton) {
    return;
  }

  if (nextButton.dataset.fayadBound === "true") {
    return;
  }

  nextButton.dataset.fayadBound = "true";

  nextButton.addEventListener("click", () => {
    if (currentLesson < lessons.length) {
      loadLesson(currentLesson + 1, true);
    }
  });
}

/* =========================================================
   29. EDITOR EVENTS
========================================================= */

function setupEditor() {
  if (resetCodeBtn) {
    resetCodeBtn.addEventListener("click", resetEditor);
  }

  if (copyButton && codeEditor) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeEditor.value);

        const originalText = copyButton.textContent;

        copyButton.textContent = "تم النسخ ✓";

        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 1500);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    });
  }

  if (codeEditor) {
    codeEditor.addEventListener("input", updatePreview);
  }
}

/* =========================================================
   30. VALIDATE LESSONS
========================================================= */

function validateLessons() {
  console.group("FAYAD HTML Lessons Validation");

  console.log("عدد الدروس:", lessons.length);

  lessons.forEach((lesson) => {
    const questions = Array.isArray(lesson.questions) ? lesson.questions : [];

    if (questions.length < QUIZ_QUESTION_COUNT) {
      console.warn(`الدرس ${lesson.id} يحتوي على ${questions.length} أسئلة فقط.`);
    }

    questions.forEach((question, index) => {
      if (!question.question) {
        console.warn(`الدرس ${lesson.id} - السؤال ${index + 1} بدون نص.`);
      }

      if (!Array.isArray(question.options) || question.options.length === 0) {
        console.warn(`الدرس ${lesson.id} - السؤال ${index + 1} بدون إجابات.`);
      }

      if (typeof question.correct !== "number") {
        console.warn(`الدرس ${lesson.id} - السؤال ${index + 1} لديه correct غير صحيح.`);
      }
    });
  });

  console.groupEnd();
}

/* =========================================================
   31. INITIALIZE
========================================================= */

function initializeLearningEngine() {
  if (!Array.isArray(lessons) || lessons.length === 0) {
    console.error("FAYAD: لا توجد دروس.");
    return;
  }

  normalizeProgress();

  validateLessons();

  setupSidebar();
  setupPreviousButton();
  setupNextButton();
  setupEditor();
  setupQuizNextButton();

  /*
    يبدأ دائماً من الدرس الأول
    إذا لم يوجد درس محفوظ.
  */

  if (!lessons.some((lesson) => Number(lesson.id) === Number(currentLesson))) {
    currentLesson = 1;
  }

  loadLesson(currentLesson, false);
}

/* =========================================================
   32. START
========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLearningEngine);
} else {
  initializeLearningEngine();
}
