// HTML course content, shared lesson schema (see docs/lesson-schema.md).
// Generated once from the legacy implementation by tools/convert-html-track.mjs; now hand-maintained.

export const track = {
  id: "html",
  title: {
    ar: "HTML",
    en: "HTML",
  },
  editorLabel: "HTML",
  practiceHeading: {
    ar: "اكتب كود HTML",
    en: "Write HTML code",
  },
  runtime: "html",
  quiz: {
    shuffle: true,
  },
  groups: [
    {
      id: "html-g1",
      title: {
        ar: "أساسيات HTML",
      },
      lessons: ["html-01", "html-02", "html-03", "html-04", "html-05", "html-06"],
    },
    {
      id: "html-g2",
      title: {
        ar: "النص والمحتوى",
      },
      lessons: ["html-07", "html-08", "html-09", "html-10", "html-11", "html-12"],
    },
    {
      id: "html-g3",
      title: {
        ar: "النماذج",
      },
      lessons: ["html-13", "html-14", "html-15"],
    },
    {
      id: "html-g4",
      title: {
        ar: "بنية الصفحة",
      },
      lessons: ["html-16", "html-17", "html-18", "html-19"],
    },
    {
      id: "html-g5",
      title: {
        ar: "HTML متقدم",
      },
      lessons: [
        "html-20",
        "html-21",
        "html-22",
        "html-23",
        "html-24",
        "html-25",
        "html-26",
        "html-27",
        "html-28",
        "html-29",
        "html-30",
      ],
    },
  ],
};

export const lessons = [
  {
    id: "html-01",
    kicker: "HTML FUNDAMENTALS",
    title: {
      ar: "مقدمة إلى HTML",
    },
    description: {
      ar: "تعرّف على HTML، وما وظيفتها، وكيف تستخدم لبناء هيكل صفحات الويب.",
    },
    body: {
      ar: `
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
    },
    example: {
      title: {
        ar: "أول كود HTML لك",
      },
      code: `<h1>مرحبًا بك</h1>
<p>أهلًا بك في FAYAD.</p>`,
      result: {
        ar: "<h1>مرحبًا بك</h1><p>أهلًا بك في FAYAD.</p>",
      },
      explanation: {
        ar: "<p>العنصر <code>&lt;h1&gt;</code> يستخدم لإنشاء العنوان الرئيسي.</p><p>العنصر <code>&lt;p&gt;</code> يستخدم لإنشاء فقرة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ عنوانًا رئيسيًا وفقرة ترحب بزائر موقعك.",
      },
      starterCode: `<h1>مرحبًا بك في موقعي</h1>
<p>هذا أول موقع HTML لي.</p>`,
    },
    quiz: [
      {
        question: {
          ar: "ماذا تعني اختصار كلمة HTML؟",
        },
        options: [
          {
            ar: "HyperText Markup Language",
          },
          {
            ar: "HighText Machine Language",
          },
          {
            ar: "Home Tool Markup Language",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الوظيفة الأساسية لـ HTML؟",
        },
        options: [
          {
            ar: "بناء هيكل صفحة الويب الأساسي",
          },
          {
            ar: "تنسيق وتلوين العناصر فقط",
          },
          {
            ar: "إدارة قواعد البيانات والتحكم بالسيرفر",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي عنصر يستخدم لإنشاء فقرة نصية عادية؟",
        },
        options: [
          {
            ar: "<p>",
          },
          {
            ar: "<text>",
          },
          {
            ar: "<paragraph>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-02",
    kicker: "HTML FUNDAMENTALS",
    title: {
      ar: "هيكل مستند HTML",
    },
    navTitle: {
      ar: "بنية مستند HTML",
    },
    description: {
      ar: "تعلّم الهيكل الأساسي لمستند HTML ووظيفة html وhead وbody.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>هيكل المستند</h2>
        <p>مستند HTML يتكون من أجزاء منظمة تساعد المتصفح على فهم الصفحة وعرضها بشكل صحيح.</p>
        <p>أهم العناصر الأساسية هي <code>&lt;html&gt;</code> و <code>&lt;head&gt;</code> و <code>&lt;body&gt;</code>.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "مستند HTML أساسي",
      },
      code: `<!DOCTYPE html>
<html>
<head>
  <title>صفحتي</title>
</head>
<body>
  <h1>مرحبًا</h1>
  <p>هذه صفحتي.</p>
</body>
</html>`,
      result: {
        ar: "<h1>مرحبًا</h1><p>هذه صفحتي.</p>",
      },
      explanation: {
        ar: "<p><code>&lt;!DOCTYPE html&gt;</code> يخبر المتصفح أن المستند يستخدم HTML5.</p><p><code>&lt;head&gt;</code> يحتوي على معلومات الصفحة، و<code>&lt;body&gt;</code> يحتوي على المحتوى الظاهر.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ مستند HTML كاملًا يحتوي على title وh1 وفقرة.",
      },
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>صفحتي</title>
</head>
<body>
  <h1>مرحبًا</h1>
  <p>أول صفحة لي.</p>
</body>
</html>`,
    },
    quiz: [
      {
        question: {
          ar: "أين يوضع المحتوى الذي يظهر للمستخدم في الصفحة؟",
        },
        options: [
          {
            ar: "<body>",
          },
          {
            ar: "<head>",
          },
          {
            ar: "<title>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما وظيفة عنصر <head> في مستند HTML؟",
        },
        options: [
          {
            ar: "يحتوي على بيانات ومعلومات وإعدادات الصفحة للمتصفح",
          },
          {
            ar: "يعرض الصور والنصوص المباشرة للمستخدم",
          },
          {
            ar: "ينشئ أزرار الإرسال بالصفحة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما فائدة الإعلان DOCTYPE في بداية المستند؟",
        },
        options: [
          {
            ar: "تحديد إصدار ونوع مستند الويب للمتصفح",
          },
          {
            ar: "إنشاء فقرة نصية جديدة",
          },
          {
            ar: "ربط ملف التنسيقات الخارجية",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-03",
    kicker: "HTML FUNDAMENTALS",
    title: {
      ar: "Tags و Elements",
    },
    description: {
      ar: "تعلّم الفرق بين Tags وElements وكيف يتكون عنصر HTML.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>ما هو Tag و Element؟</h2>
        <p>الـ Tag هو وسم الفتح أو الإغلاق مثل <code>&lt;p&gt;</code>. بينما الـ Element يشمل وسم الفتح والمحتوى ووسم الإغلاق معًا.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "عناصر HTML",
      },
      code: `<h1>عنوان</h1>
<p>فقرة</p>
<strong>نص مهم</strong>`,
      result: {
        ar: "<h1>عنوان</h1><p>فقرة</p><strong>نص مهم</strong>",
      },
      explanation: {
        ar: "<p>يتكون عنصر HTML من opening tag ومحتوى وclosing tag.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ عنوانًا وفقرة ونصًا مهمًا باستخدام HTML.",
      },
      starterCode: `<h1>عنواني</h1>
<p>هذه فقرة.</p>
<strong>نص مهم</strong>`,
    },
    quiz: [
      {
        question: {
          ar: "أي مما يلي يمثل عنصر فقرة مكتمل (Element)؟",
        },
        options: [
          {
            ar: "<p>أهلاً بك</p>",
          },
          {
            ar: "<p>",
          },
          {
            ar: "</p>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يميز وسم الإغلاق (Closing Tag) عن وسم الفتح؟",
        },
        options: [
          {
            ar: "يحتوي على شرطة مائلة / قبل اسم الوسم",
          },
          {
            ar: "يحتوي على علامة تعجب !",
          },
          {
            ar: "يكتب بالحروف الكبيرة دائماً",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يقع المحتوى النصي للعنصر؟",
        },
        options: [
          {
            ar: "بين وسومي الفتح والإغلاق",
          },
          {
            ar: "قبل وسم الفتح",
          },
          {
            ar: "داخل ملف JavaScript",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-04",
    kicker: "HTML FUNDAMENTALS",
    title: {
      ar: "Attributes",
    },
    description: {
      ar: "تعلّم كيف تضيف Attributes معلومات إضافية إلى عناصر HTML.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>ما هو Attribute؟</h2>
        <p>تضيف الخاصية (Attribute) معلومات وخيارات إضافية للعنصر، وتكتب دائماً داخل وسم الفتح.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "مثال على Attributes",
      },
      code: `<a href="https://example.com">زيارة الموقع</a>
<img src="image.jpg" alt="صورة">`,
      result: {
        ar: "<a href=\"#\" onclick=\"return false;\">زيارة الموقع</a><p>مثال على الخصائص</p>",
      },
      explanation: {
        ar: "<p>تتكون الخاصية من اسم وقيمة، مثل href=\"url\".</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ رابطًا وصورة مع إضافة الخصائص المناسبة.",
      },
      starterCode: "<a href=\"https://example.com\">زيارة الموقع</a>",
    },
    quiz: [
      {
        question: {
          ar: "أين تكتب الخصائص (Attributes) في HTML عادةً؟",
        },
        options: [
          {
            ar: "داخل وسم الفتح (Opening Tag)",
          },
          {
            ar: "داخل وسم الإغلاق (Closing Tag)",
          },
          {
            ar: "خارج المستند نهائياً",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الخاصية المستخدمة لتحديد الرابط المستهدف في العنصر <a>؟",
        },
        options: [
          {
            ar: "href",
          },
          {
            ar: "src",
          },
          {
            ar: "link",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الخاصية التي تقدم نصًا بديلًا للصورة في حال تعذر تحميلها؟",
        },
        options: [
          {
            ar: "alt",
          },
          {
            ar: "src",
          },
          {
            ar: "title",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-05",
    kicker: "HTML FUNDAMENTALS",
    title: {
      ar: "Headings",
    },
    description: {
      ar: "تعلّم استخدام العناوين من h1 إلى h6 وتنظيم المحتوى.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>العناوين في HTML</h2>
        <p>تستخدم العناوين من h1 إلى h6 لتحديد التسلسل الهرمي للمحتوى.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "مستويات العناوين",
      },
      code: `<h1>عنوان رئيسي</h1>
<h2>عنوان فرعي</h2>
<h3>عنوان أصغر</h3>`,
      result: {
        ar: "<h1>عنوان رئيسي</h1><h2>عنوان فرعي</h2><h3>عنوان أصغر</h3>",
      },
      explanation: {
        ar: "<p>h1 هو العنوان الأهم والأكبر، بينما h6 هو الأصغر.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ عناوين بمستويات مختلفة لتنظيم المقال.",
      },
      starterCode: `<h1>عنوان الصفحة</h1>
<h2>القسم الأول</h2>`,
    },
    quiz: [
      {
        question: {
          ar: "ما هو الوسم الذي يمثل العنوان الأكبر والأهم في الصفحة؟",
        },
        options: [
          {
            ar: "<h1>",
          },
          {
            ar: "<h6>",
          },
          {
            ar: "<head>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كم عدد مستويات العناوين المتوفرة في HTML؟",
        },
        options: [
          {
            ar: "6 مستويات من h1 إلى h6",
          },
          {
            ar: "3 مستويات فقط",
          },
          {
            ar: "10 مستويات متدرجة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي وسم يمثل أقل وأصغر مستوى عنوان؟",
        },
        options: [
          {
            ar: "<h6>",
          },
          {
            ar: "<h1>",
          },
          {
            ar: "<h3>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-06",
    kicker: "HTML FUNDAMENTALS",
    title: {
      ar: "Paragraphs",
    },
    description: {
      ar: "تعلّم إنشاء الفقرات وتنظيم النصوص باستخدام عنصر p.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>الفقرات النصية</h2>
        <p>يستخدم وسم &lt;p&gt; لتقسيم النصوص إلى فقرات أسهل في القراءة.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "إنشاء فقرات",
      },
      code: `<p>هذه هي الفقرة الأولى.</p>
<p>هذه هي الفقرة الثانية.</p>`,
      result: {
        ar: "<p>هذه هي الفقرة الأولى.</p><p>هذه هي الفقرة الثانية.</p>",
      },
      explanation: {
        ar: "<p>يقوم المتصفح تلقائياً بترك مسافة قبل وبعد كل فقرة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "اكتب فقرتين تتحدث فيهما عن شغفك بتعلم الويب.",
      },
      starterCode: "<p>أنا أتعلم برمجة الويب.</p>",
    },
    quiz: [
      {
        question: {
          ar: "ما هو الوسم المخصص لإنشاء فقرة نصية؟",
        },
        options: [
          {
            ar: "<p>",
          },
          {
            ar: "<paragraph>",
          },
          {
            ar: "<text>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يفعل المتصفح تلقائياً عند إضافة عنصر <p> جديد؟",
        },
        options: [
          {
            ar: "يضيف مسافة عمودية قبل وبعد الفقرة",
          },
          {
            ar: "يجعل خط النص مائلاً تلقائياً",
          },
          {
            ar: "يحول اللون إلى الأزرق",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن إضافة أكثر من عنصر <p> في الصفحة الواحدة؟",
        },
        options: [
          {
            ar: "نعم، بلا حد أقصى",
          },
          {
            ar: "لا، فقرة واحدة فقط في المستند",
          },
          {
            ar: "فقط مع استخدام تنسيقات CSS",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-07",
    kicker: "TEXT & CONTENT",
    title: {
      ar: "تنسيق النصوص",
    },
    description: {
      ar: "تعلّم عناصر HTML المستخدمة لإعطاء النص معنى أو أهمية.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>تنسيق النصوص</h2>
        <p>استخدم <code>&lt;strong&gt;</code> لإبراز الأهمية و <code>&lt;em&gt;</code> للتأكيد.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "تنسيق النص",
      },
      code: `<strong>نص مهم جداً</strong>
<em>نص مائل للتأكيد</em>
<mark>نص مضلل</mark>`,
      result: {
        ar: "<p><strong>نص مهم جداً</strong></p><p><em>نص مائل للتأكيد</em></p><p><mark>نص مضلل</mark></p>",
      },
      explanation: {
        ar: "<p>الوسوم المعنوية تساعد محركات البحث وقارئات الشاشة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "جرب استخدام strong وem وmark على نصوص من اختيارك.",
      },
      starterCode: "<strong>مهم</strong> <em>تأكيد</em>",
    },
    quiz: [
      {
        question: {
          ar: "أي وسم يستخدم لإعطاء النص أهمية بارزة وجعله غامقاً (Bold)؟",
        },
        options: [
          {
            ar: "<strong>",
          },
          {
            ar: "<small>",
          },
          {
            ar: "<mark>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي وسم يستخدم للتركيز على النص وجعله مائلًا (Italic)؟",
        },
        options: [
          {
            ar: "<em>",
          },
          {
            ar: "<bold>",
          },
          {
            ar: "<i>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم المستخدم لتظليل النص باللون الأصفر (Highlight)؟",
        },
        options: [
          {
            ar: "<mark>",
          },
          {
            ar: "<color>",
          },
          {
            ar: "<highlight>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-08",
    kicker: "TEXT & CONTENT",
    title: {
      ar: "Links",
    },
    navTitle: {
      ar: "الروابط",
    },
    description: {
      ar: "تعلّم إنشاء الروابط والتنقل بين صفحات الويب.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>الروابط التشعبية</h2>
        <p>أنشئ رابطًا ينتقل بالمستخدم باستخدام الوسم <code>&lt;a&gt;</code> والخاصية <code>href</code>.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "إنشاء رابط",
      },
      code: "<a href=\"https://google.com\" target=\"_blank\">زيارة جوجل</a>",
      result: {
        ar: "<a href=\"#\" onclick=\"return false;\">زيارة جوجل</a>",
      },
      explanation: {
        ar: "<p>الخاصية target=\"_blank\" تفتح الرابط في تبويب جديد.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ رابطًا يشير إلى أي موقع مفضل لديك.",
      },
      starterCode: "<a href=\"https://example.com\">الموقع</a>",
    },
    quiz: [
      {
        question: {
          ar: "أي وسم يستخدم لإنشاء رابط تشعبي للانتقال بين الصفحات؟",
        },
        options: [
          {
            ar: "<a>",
          },
          {
            ar: "<link>",
          },
          {
            ar: "<url>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي الخاصية المسؤولة عن تحديد عنوان الويب للرابط المستهدف؟",
        },
        options: [
          {
            ar: "href",
          },
          {
            ar: "src",
          },
          {
            ar: "target",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كيف تفتح الرابط في نافذة أو تبويب جديد تلقائياً؟",
        },
        options: [
          {
            ar: "target=\"_blank\"",
          },
          {
            ar: "new=\"page\"",
          },
          {
            ar: "open=\"tab\"",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-09",
    kicker: "TEXT & CONTENT",
    title: {
      ar: "Images",
    },
    navTitle: {
      ar: "الصور",
    },
    description: {
      ar: "تعلّم إضافة الصور إلى صفحات الويب باستخدام img.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>إضافة الصور</h2>
        <p>عنصر <code>&lt;img&gt;</code> هو عنصر ذاتي الإغلاق يستخدم لضم الصور للصفحة.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "إضافة صورة",
      },
      code: "<img src=\"logo.png\" alt=\"شعار الشعار\" width=\"200\">",
      result: {
        ar: "<p>عنصر صورة يظهر هنا بحسب المسار المحدد</p>",
      },
      explanation: {
        ar: "<p>src يحدد المسار و alt تقدم وصفاً للصورة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أضف وسم صورة مع تحديد العرض وخصائص alt.",
      },
      starterCode: "<img src=\"image.jpg\" alt=\"وصف الصورة\">",
    },
    quiz: [
      {
        question: {
          ar: "أي عنصر ينشئ صورة في HTML؟",
        },
        options: [
          {
            ar: "<img>",
          },
          {
            ar: "<image>",
          },
          {
            ar: "<pic>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمتلك العنصر <img> وسم إغلاق منفصل </img>؟",
        },
        options: [
          {
            ar: "لا، هو عنصر ذاتي الإغلاق (Self-closing)",
          },
          {
            ar: "نعم، يجب إغلاقه دائماً بوسم منفصل",
          },
          {
            ar: "فقط في الإكواد القديمة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي الخاصية المحددة لمسار ورابط ملف الصورة؟",
        },
        options: [
          {
            ar: "src",
          },
          {
            ar: "href",
          },
          {
            ar: "path",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-10",
    kicker: "TEXT & CONTENT",
    title: {
      ar: "Lists",
    },
    navTitle: {
      ar: "القوائم",
    },
    description: {
      ar: "تعلّم إنشاء القوائم المرتبة وغير المرتبة.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>القوائم في HTML</h2>
        <p>استخدم <code>&lt;ul&gt;</code> للقوائم المُنقطة، و <code>&lt;ol&gt;</code> للقوائم المرقّمة.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "القوائم",
      },
      code: `<ul>
  <li>تفاح</li>
  <li>موز</li>
</ul>`,
      result: {
        ar: "<ul><li>تفاح</li><li>موز</li></ul>",
      },
      explanation: {
        ar: "<p>عنصر <code>&lt;li&gt;</code> يمثل عنصراً داخل القائمة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ قائمة مرقمة تحتوي على 3 أهداف لك.",
      },
      starterCode: `<ol>
  <li>الهدف الأول</li>
</ol>`,
    },
    quiz: [
      {
        question: {
          ar: "أي وسم ينشئ قائمة غير مرتبة (تظهر كنقاط)؟",
        },
        options: [
          {
            ar: "<ul>",
          },
          {
            ar: "<ol>",
          },
          {
            ar: "<list>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي وسم ينشئ قائمة مرتبة (تظهر كأرقام تسلسلية)؟",
        },
        options: [
          {
            ar: "<ol>",
          },
          {
            ar: "<ul>",
          },
          {
            ar: "<dl>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم المخصص لكل عنصر منفرد داخل القائمة؟",
        },
        options: [
          {
            ar: "<li>",
          },
          {
            ar: "<item>",
          },
          {
            ar: "<point>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-11",
    kicker: "TEXT & CONTENT",
    title: {
      ar: "Tables",
    },
    navTitle: {
      ar: "الجداول",
    },
    description: {
      ar: "تعلّم تنظيم البيانات باستخدام جداول HTML.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>الجداول البيانات</h2>
        <p>يتكون الجدول من صفوف <code>&lt;tr&gt;</code> وعناوين <code>&lt;th&gt;</code> وخلايا <code>&lt;td&gt;</code>.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "جدول بسيط",
      },
      code: `<table>
  <tr>
    <th>الاسم</th>
    <th>الدرجة</th>
  </tr>
  <tr>
    <td>أحمد</td>
    <td>100</td>
  </tr>
</table>`,
      result: {
        ar: "<table border=\"1\"><tr><th>الاسم</th><th>الدرجة</th></tr><tr><td>أحمد</td><td>100</td></tr></table>",
      },
      explanation: {
        ar: "<p>الوسم table يحتوي كامل بنية الجدول.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ جدولاً بسيطاً من صفين وعمودين.",
      },
      starterCode: `<table>
  <tr><td>1</td><td>2</td></tr>
</table>`,
    },
    quiz: [
      {
        question: {
          ar: "أي وسم يمثل الصف في الجدول (Table Row)؟",
        },
        options: [
          {
            ar: "<tr>",
          },
          {
            ar: "<td>",
          },
          {
            ar: "<th>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الوسم المخصص لخلية العنوان الرئيسية البارزة في الجدول؟",
        },
        options: [
          {
            ar: "<th>",
          },
          {
            ar: "<td>",
          },
          {
            ar: "<head>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم المخصص لخلية البيانات العادية داخل الصف؟",
        },
        options: [
          {
            ar: "<td>",
          },
          {
            ar: "<tr>",
          },
          {
            ar: "<data>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-12",
    kicker: "TEXT & CONTENT",
    title: {
      ar: "Semantic HTML",
    },
    description: {
      ar: "تعلّم معنى Semantic HTML ولماذا تساعد في تنظيم وفهم الصفحة.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>العناصر الدلالية</h2>
        <p>هي عناصر لها معنى واضح للمتصفح والمطور مثل <code>&lt;header&gt;</code> و <code>&lt;article&gt;</code>.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "هيكل دلالي",
      },
      code: `<header>رأس الصفحة</header>
<main>المحتوى</main>
<footer>الذيل</footer>`,
      result: {
        ar: "<header>رأس الصفحة</header><main>المحتوى</main><footer>الذيل</footer>",
      },
      explanation: {
        ar: "<p>تساعد العناصر الدلالية تحسين محركات البحث SEO وسهولة الوصول.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "اكتب هيكل صفحة باستخدام العناصر الدلالية.",
      },
      starterCode: `<header>عنوان</header>
<main>محتوى</main>`,
    },
    quiz: [
      {
        question: {
          ar: "ما الفائدة الرئيسية من استخدام العناصر الدلالية (Semantic HTML)؟",
        },
        options: [
          {
            ar: "تحسين هيكلة الكود ومحركات البحث SEO وقارئات الشاشة",
          },
          {
            ar: "زيادة سرعة اتصال الإنترنت للمستخدم",
          },
          {
            ar: "تغيير تصميم الصفحة أوتوماتيكياً",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي عنصر دلالي يفضل استخدامه للمحتوى المستقل كالمقالات والأخبار؟",
        },
        options: [
          {
            ar: "<article>",
          },
          {
            ar: "<div>",
          },
          {
            ar: "<span>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي عنصر دلالي يمثل المنطقة الفرعية أو الشريط الجانبي بالصفحة؟",
        },
        options: [
          {
            ar: "<aside>",
          },
          {
            ar: "<section>",
          },
          {
            ar: "<nav>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-13",
    kicker: "FORMS",
    title: {
      ar: "Forms",
    },
    description: {
      ar: "تعلّم إنشاء النماذج التي تسمح للمستخدم بإدخال وإرسال البيانات.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>النماذج Forms</h2>
        <p>تُستخدم النماذج لجمع المدخلات من المستخدمين وإرسالها للسيرفر.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "نموذج بسيط",
      },
      code: `<form action="/submit">
  <input type="text">
  <button type="submit">إرسال</button>
</form>`,
      result: {
        ar: "<form><input type=\"text\" placeholder=\"اكتب هنا\"><button type=\"button\">إرسال</button></form>",
      },
      explanation: {
        ar: "<p>عنصر form يحوي أدوات الإدخال المختلفة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ نموذج إدخال نص بسيط مع زر إرسال.",
      },
      starterCode: `<form>
  <input type="text">
  <button type="submit">إرسال</button>
</form>`,
    },
    quiz: [
      {
        question: {
          ar: "ما هو الحاوي الرئيسي لجميع أدوات مدخلات المستخدم بالنموذج؟",
        },
        options: [
          {
            ar: "<form>",
          },
          {
            ar: "<input>",
          },
          {
            ar: "<group>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الخاصية التي تحدد رابط الوجهة لإرسال بيانات النموذج؟",
        },
        options: [
          {
            ar: "action",
          },
          {
            ar: "method",
          },
          {
            ar: "href",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نوع الزر المخصص لإرسال بيانات النموذج فور النقر عليه؟",
        },
        options: [
          {
            ar: "type=\"submit\"",
          },
          {
            ar: "type=\"button\"",
          },
          {
            ar: "type=\"reset\"",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-14",
    kicker: "FORMS",
    title: {
      ar: "Input Types",
    },
    navTitle: {
      ar: "Input",
    },
    description: {
      ar: "تعلّم أنواع input المختلفة وكيف تحدد نوع البيانات التي يدخلها المستخدم.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>أنواع حقول الإدخال</h2>
        <p>تحدد الخاصية <code>type</code> نوع البيانات مثل text, password, email, number.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "أنواع الإدخال",
      },
      code: `<input type="email" placeholder="البريد">
<input type="password">`,
      result: {
        ar: "<input type=\"email\" placeholder=\"البريد\"><br><br><input type=\"password\" placeholder=\"كلمة السر\">",
      },
      explanation: {
        ar: "<p>نوع password يختفي فيه النص لحماية السرية.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ حقل بريد إلكتروني وحقل كلمة مرور.",
      },
      starterCode: `<input type="email">
<input type="password">`,
    },
    quiz: [
      {
        question: {
          ar: "ما هو نوع الحقل المناسب لإدخال كلمات المرور وتشفيرها ظاهرياً على الشاشة؟",
        },
        options: [
          {
            ar: "type=\"password\"",
          },
          {
            ar: "type=\"text\"",
          },
          {
            ar: "type=\"hidden\"",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نوع الإدخال المخصص لاختيار التاريخ من تقويم تفاعلي؟",
        },
        options: [
          {
            ar: "type=\"date\"",
          },
          {
            ar: "type=\"time\"",
          },
          {
            ar: "type=\"calendar\"",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي نوع يضمن مطابقة المدخلات لصيغة البريد الإلكتروني؟",
        },
        options: [
          {
            ar: "type=\"email\"",
          },
          {
            ar: "type=\"text\"",
          },
          {
            ar: "type=\"mail\"",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-15",
    kicker: "FORMS",
    title: {
      ar: "Labels & Buttons",
    },
    navTitle: {
      ar: "Labels و Buttons",
    },
    description: {
      ar: "تعلّم استخدام labels مع inputs وإنشاء الأزرار.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>العناوين والأزرار</h2>
        <p>ربط الـ <code>label</code> بالحقل يحسن سهولة الوصول والاستخدام.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "ربط Label بـ Input",
      },
      code: `<label for="user">الاسم:</label>
<input id="user" type="text">`,
      result: {
        ar: "<label for=\"user\">الاسم: </label><input id=\"user\" type=\"text\">",
      },
      explanation: {
        ar: "<p>خاصية for في label تطابق خاصية id في input.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "قم بربط label بحقل إدخال بـ id مناسب.",
      },
      starterCode: `<label for="email">البريد:</label>
<input id="email" type="email">`,
    },
    quiz: [
      {
        question: {
          ar: "ما هي الخاصية في وسم <label> التي ترتبطه بمعرف الحقل id؟",
        },
        options: [
          {
            ar: "for",
          },
          {
            ar: "to",
          },
          {
            ar: "target",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما فائدة استخدام وسم Label بجانب حقل الإدخال؟",
        },
        options: [
          {
            ar: "تحسين استخدام القارئات وسهولة النقر وتحديد الحقول",
          },
          {
            ar: "تغيير شكل الحقل وتلوينه تلقائياً",
          },
          {
            ar: "حفظ البيانات بالمتصفح",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي وسم يمثل زراً تفاعلياً قابلاً للنقر؟",
        },
        options: [
          {
            ar: "<button>",
          },
          {
            ar: "<click>",
          },
          {
            ar: "<press>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-16",
    kicker: "PAGE STRUCTURE",
    title: {
      ar: "Header & Navigation",
    },
    navTitle: {
      ar: "Header و Navigation",
    },
    description: {
      ar: "تعلّم إنشاء رأس الصفحة ومنطقة التنقل.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>رأس الصفحة والتنقل</h2>
        <p>استخدم <code>&lt;header&gt;</code> للترويسة و <code>&lt;nav&gt;</code> لروابط القائمة.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "قائمة الهيدر",
      },
      code: `<header>
  <nav>
    <a href="#">الرئيسية</a>
  </nav>
</header>`,
      result: {
        ar: "<header><nav><a href=\"#\">الرئيسية</a></nav></header>",
      },
      explanation: {
        ar: "<p>يجمع nav روابط التنقل الأساسية للموقع.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ ترويسة تحتوي على رابطين.",
      },
      starterCode: `<header>
  <nav>
    <a href="#">الرئيسية</a>
  </nav>
</header>`,
    },
    quiz: [
      {
        question: {
          ar: "أي عنصر دلالي يخصص لجمع روابط التنقل الأساسية في الموقع؟",
        },
        options: [
          {
            ar: "<nav>",
          },
          {
            ar: "<header>",
          },
          {
            ar: "<menu>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يوضع عادةً وسم الترويسة العليا للموقع أو المقال؟",
        },
        options: [
          {
            ar: "<header>",
          },
          {
            ar: "<footer>",
          },
          {
            ar: "<aside>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن أن يحتوي header على شعار الموقع وعنوانه وروابط التنقل معاً؟",
        },
        options: [
          {
            ar: "نعم، هذه الممارسة القياسية",
          },
          {
            ar: "لا، يمنع إضافة أكثر من عنصر داخله",
          },
          {
            ar: "فقط عند استخدام تنسيقات خاصة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-17",
    kicker: "PAGE STRUCTURE",
    title: {
      ar: "Main & Section",
    },
    navTitle: {
      ar: "Main و Section",
    },
    description: {
      ar: "تعلّم تنظيم المحتوى في أجزاء رئيسية وأقسام.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>المحتوى الرئيسي والأقسام</h2>
        <p>استخدم <code>&lt;main&gt;</code> للمحتوى الفريد و <code>&lt;section&gt;</code> لتجميع الأقسام.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "أقسام الموقع",
      },
      code: `<main>
  <section>
    <h2>خدماتنا</h2>
  </section>
</main>`,
      result: {
        ar: "<main><section><h2>خدماتنا</h2></section></main>",
      },
      explanation: {
        ar: "<p>main يظهر مرة واحدة فقط في كل صفحة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ محتوى رئيسي يحتوي على قسم واحد.",
      },
      starterCode: `<main>
  <section>محتوى</section>
</main>`,
    },
    quiz: [
      {
        question: {
          ar: "كم مرة يفضل استخدام العنصر الرئيسي <main> في الصفحة الواحدة؟",
        },
        options: [
          {
            ar: "مرة واحدة فقط بالصفحة",
          },
          {
            ar: "عدة مرات في كل قسم",
          },
          {
            ar: "بلا حدود",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم المخصص لتقسيم الصفحة إلى مواضيع وأقسام مستقلة؟",
        },
        options: [
          {
            ar: "<section>",
          },
          {
            ar: "<div>",
          },
          {
            ar: "<span>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يصح وضع عدة عناصر <section> داخل <main>؟",
        },
        options: [
          {
            ar: "نعم، ممارسة صحيحة وممتازة",
          },
          {
            ar: "لا، يمنع ذلك برمجيًا",
          },
          {
            ar: "فقط في الصفحة الرئيسية للموقع",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-18",
    kicker: "PAGE STRUCTURE",
    title: {
      ar: "Article & Aside",
    },
    navTitle: {
      ar: "Article و Aside",
    },
    description: {
      ar: "تعلّم استخدام article للمحتوى المستقل وaside للمحتوى الجانبي المرتبط.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>المقالات والجانبيات</h2>
        <p>استخدم <code>&lt;article&gt;</code> للمحتوى القابل للنشر المستقل و <code>&lt;aside&gt;</code> للشريط الجانبي.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "مقال وشريط جانبي",
      },
      code: `<article><h2>خبر اليوم</h2></article>
<aside>روابط ذات صلة</aside>`,
      result: {
        ar: "<article><h2>خبر اليوم</h2></article><aside>روابط ذات صلة</aside>",
      },
      explanation: {
        ar: "<p>article ممتاز للمنشورات والمقالات والأخبار.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "اكتب وسم article مع عنوان وبداخله نص بسيط.",
      },
      starterCode: `<article>
  <h2>عنوان المقال</h2>
</article>`,
    },
    quiz: [
      {
        question: {
          ar: "أي وسم يناسب الأخبار والمقالات القابلة للشرح والنشر بمفردها؟",
        },
        options: [
          {
            ar: "<article>",
          },
          {
            ar: "<aside>",
          },
          {
            ar: "<div>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم المناسب للشريط الجانبي والإعلانات والروابط الإضافية؟",
        },
        options: [
          {
            ar: "<aside>",
          },
          {
            ar: "<article>",
          },
          {
            ar: "<section>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن استخدام عناصر <article> متعددة في الصفحة الواحدة؟",
        },
        options: [
          {
            ar: "نعم، مثل عرض قائمة مقالات أو أخبار",
          },
          {
            ar: "لا غير ممكن إطلاقاً",
          },
          {
            ar: "فقط مع الصور",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-19",
    kicker: "PAGE STRUCTURE",
    title: {
      ar: "Footer",
    },
    description: {
      ar: "تعلّم إنشاء تذييل الصفحة وإضافة حقوق النشر والمعلومات.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>تذييل الصفحة Footer</h2>
        <p>يحتوي التذييل على حقوق الملكية وروابط الاتصال والمعلومات القانونية.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "تذييل بسيط",
      },
      code: `<footer>
  <p>© 2026 جميع الحقوق محفوظة</p>
</footer>`,
      result: {
        ar: "<footer><p>© 2026 جميع الحقوق محفوظة</p></footer>",
      },
      explanation: {
        ar: "<p>يوضع التذييل عادة في نهاية مستند الصفحة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ تذييل صفحة يحتوي على حقوق النشر باسمك.",
      },
      starterCode: `<footer>
  <p>© حقوق النشر</p>
</footer>`,
    },
    quiz: [
      {
        question: {
          ar: "أين يوضع وسم <footer> عادةً في الصفحة؟",
        },
        options: [
          {
            ar: "في أسفل وتذييل الصفحة",
          },
          {
            ar: "في أعلى الصفحة",
          },
          {
            ar: "داخل القائمة الجانبية فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي البيانات النموذجية التي توجد داخل Footer؟",
        },
        options: [
          {
            ar: "حقوق الملكية والنشر ومعلومات الاتصال",
          },
          {
            ar: "عناوين المقالات الرئيسية",
          },
          {
            ar: "مدخلات الشراء المباشر",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن استخدام وسم footer داخل عناصر أخرى كـ article؟",
        },
        options: [
          {
            ar: "نعم، لتذييل المقال ببيانات الكاتب",
          },
          {
            ar: "لا، يتواجد بالصفحة الرئيسية فقط",
          },
          {
            ar: "فقط مع النماذج",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-20",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Accessibility",
    },
    description: {
      ar: "تعلّم أساسيات جعل صفحات HTML أكثر سهولة للاستخدام لمختلف المستخدمين.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>سهولة الوصول Accessibility</h2>
        <p>تعني إتاحة استخدام الموقع لجميع الأفراد بمن فيهم ذوي الاحتياجات الخاصة عبر أدوات القراءة.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "إتاحة الصور",
      },
      code: "<img src=\"cat.jpg\" alt=\"قطة بيضاء تنام على الأريكة\">",
      result: {
        ar: "<p>صورة وصفية واضحة لقارئات الشاشة</p>",
      },
      explanation: {
        ar: "<p>إضافة وصف alt دقيق يساعد قارئات الشاشة للمكفوفين.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أضف وسم صورة مجهز بخاصية alt توضيحية ممتازة.",
      },
      starterCode: "<img src=\"book.jpg\" alt=\"كتاب مفتوح\">",
    },
    quiz: [
      {
        question: {
          ar: "ما الهدف الرئيسي من تطبيق مفهوم Accessibility في الويب؟",
        },
        options: [
          {
            ar: "جعل الموقع متاحاً ومفهوماً لجميع المستخدمين بمن فيهم ذوي الاحتياجات",
          },
          {
            ar: "تسريع السيرفر",
          },
          {
            ar: "منع نسخ الصور والرموز",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي الخاصية الأكثر أهمية لمساعدة قارئات الشاشة مع الصور؟",
        },
        options: [
          {
            ar: "alt",
          },
          {
            ar: "title",
          },
          {
            ar: "src",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي الأساليب تساعد أدوات تكبير وقراءة الشاشات أكثر؟",
        },
        options: [
          {
            ar: "استخدام عناصر HTML الدلالية المنظمة",
          },
          {
            ar: "استخدام الألوان الفاقعة للغاية",
          },
          {
            ar: "استخدام الصور بدلاً من النصوص",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-21",
    kicker: "ADVANCED HTML",
    title: {
      ar: "SEO Basics",
    },
    navTitle: {
      ar: "أساسيات SEO",
    },
    description: {
      ar: "تعلّم أساسيات SEO وكيف تحسن من ظهور موقعك في محركات البحث.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>تهيئة محركات البحث SEO</h2>
        <p>تساعد وسوم العناوين والعناوين الوصفية Meta في تصدر نتائج البحث في جوجل.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "وسوم SEO",
      },
      code: `<title>تعلم HTML بسهولة</title>
<meta name="description" content="دورة تعليمية">`,
      result: {
        ar: "<p>إعدادات رأس الصفحة لتحسين الظهور</p>",
      },
      explanation: {
        ar: "<p>العنوان الوصفي يظهر تحت رابط الموقع في نتائج جوجل.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "اكتب وسم title مميز لموقع تعليمي.",
      },
      starterCode: "<title>موقعي التعليمي</title>",
    },
    quiz: [
      {
        question: {
          ar: "ماذا تعني اختصار كلمة SEO؟",
        },
        options: [
          {
            ar: "Search Engine Optimization",
          },
          {
            ar: "Site Engine Options",
          },
          {
            ar: "System Easy Output",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي وسم يحدد اسم ونعنوان الصفحة الظاهر في تبويب المتصفح ومحرك البحث؟",
        },
        options: [
          {
            ar: "<title>",
          },
          {
            ar: "<header>",
          },
          {
            ar: "<meta>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الوسم الذي يحدد وصف الصفحة للظهور تحت العنوان في نتائج البحث؟",
        },
        options: [
          {
            ar: "<meta name=\"description\">",
          },
          {
            ar: "<p class=\"desc\">",
          },
          {
            ar: "<link rel=\"seo\">",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-22",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Audio & Video",
    },
    navTitle: {
      ar: "Audio و Video",
    },
    description: {
      ar: "تعلّم إضافة محتوى صوتي ومرئي إلى صفحات HTML.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>الوسائط الصوتية والمرئية</h2>
        <p>استخدم <code>&lt;audio&gt;</code> للصوتيات و <code>&lt;video&gt;</code> لمقاطع الفيديو.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "تضمين فيديو وصوت",
      },
      code: `<video controls width="300">
  <source src="video.mp4" type="video/mp4">
</video>`,
      result: {
        ar: "<p>مشغل وسائط يدعم أزرار التحكم controls</p>",
      },
      explanation: {
        ar: "<p>الخاصية controls تضيف أزرار التشغيل والتحكم بالصوت.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ عنصر فيديو يحتوي على خاصية controls.",
      },
      starterCode: `<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>`,
    },
    quiz: [
      {
        question: {
          ar: "ما هي الخاصية التي تُظهر أزرار التشغيل والإيقاف للوسائط على الشاشة؟",
        },
        options: [
          {
            ar: "controls",
          },
          {
            ar: "autoplay",
          },
          {
            ar: "loop",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم المخصص لإدراج الصوتيات في HTML5؟",
        },
        options: [
          {
            ar: "<audio>",
          },
          {
            ar: "<sound>",
          },
          {
            ar: "<mp3>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي وسم فرعي يحدد مصدر ورابط ملف الميديا داخل وسم الفيديو؟",
        },
        options: [
          {
            ar: "<source>",
          },
          {
            ar: "<src>",
          },
          {
            ar: "<file>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-23",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Div & Span",
    },
    description: {
      ar: "تعلّم استخدام div كحاوية عامة وspan لتنسيق الأجزاء الصغيرة.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>العناصر الحاوية Div و Span</h2>
        <p><code>&lt;div&gt;</code> عنصر كتلوي Block لتجميع العناصر، بينما <code>&lt;span&gt;</code> عنصر مضمن Inline لقطعة نصية.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "Div و Span",
      },
      code: `<div class="card">
  <p>أنا أدرس <span style="color:red">HTML</span></p>
</div>`,
      result: {
        ar: "<div><p>أنا أدرس <span style=\"color:red\">HTML</span></p></div>",
      },
      explanation: {
        ar: "<p>Div ينشئ سطرًا جديداً، أما Span لا يقطع السطر.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "استخدم span لتغيير كلمة واحدة داخل الفقرة.",
      },
      starterCode: "<p>مرحباً <span>بالجميع</span></p>",
    },
    quiz: [
      {
        question: {
          ar: "ما نوع العنصر <div> من حيث طريقة العرض بالصفحة؟",
        },
        options: [
          {
            ar: "عنصر كتلوي (Block-level) يتأخذ السطر كاملاً",
          },
          {
            ar: "عنصر مضمن (Inline)",
          },
          {
            ar: "عنصر مخفي تلقائياً",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم المناسب لتغليف كلمة داخل فقرة لتنسيقها دون قطع السطر؟",
        },
        options: [
          {
            ar: "<span>",
          },
          {
            ar: "<div>",
          },
          {
            ar: "<p>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمتلك div أو span أي شكل جمالي افتراضي بدون CSS؟",
        },
        options: [
          {
            ar: "لا، هما حاويات بلا أشكال أو حدود افتراضية",
          },
          {
            ar: "نعم، يضيفان إطاراً خفيفاً",
          },
          {
            ar: "يغيران نوع الخط تلقائياً",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-24",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Comments",
    },
    description: {
      ar: "تعلّم كتابة التعليقات داخل HTML واستخدامها لتنظيم الكود.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>التعليقات في HTML</h2>
        <p>التعليقات هي ملاحظات برمجية للمطور لا تظهر للمستخدمين على الصفحة.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "كتابة تعليق",
      },
      code: `<!-- هذا تعليق توضيحي -->
<p>محتوى ظاهر</p>`,
      result: {
        ar: "<p>محتوى ظاهر</p>",
      },
      explanation: {
        ar: "<p>تبدأ التعليقات بـ &lt;!-- وتنتهي بـ --&gt;.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "اكتب تعليقاً توضيحياً قبل الوسم الرئيسي.",
      },
      starterCode: `<!-- بداية الترويسة -->
<h1>أهلاً</h1>`,
    },
    quiz: [
      {
        question: {
          ar: "ما هي الصيغة الصحيحة لكتابة تعليق في HTML؟",
        },
        options: [
          {
            ar: "<!-- تعليق -->",
          },
          {
            ar: "// تعليق",
          },
          {
            ar: "/* تعليق */",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل تظهر نصوص التعليقات للمستخدمين أثناء تصفح الصفحة؟",
        },
        options: [
          {
            ar: "لا، يتجاهلها المتصفح تماماً أثناء العرض",
          },
          {
            ar: "نعم دائماً",
          },
          {
            ar: "تظهر في أسفل الصفحة فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما فائدة كتابة التعليقات في أكواد HTML؟",
        },
        options: [
          {
            ar: "توضيح وتنظيم وتسهيل قراءة الكود للمطورين",
          },
          {
            ar: "تسريع فتح الصفحة بالموقع",
          },
          {
            ar: "تغيير الألوان مجاناً",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-25",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Meta Elements",
    },
    description: {
      ar: "تعلّم أساسيات Meta Elements ودورها في معلومات الصفحة.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>وسوم Meta</h2>
        <p>تزود المتصفح بترميز النصوص وحجم الشاشة والمعلومات الإضافية.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "ترميز وسوم الشاشة",
      },
      code: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
      result: {
        ar: "<p>وسوم الميتا الأساسية لضبط الترميز والاستجابة</p>",
      },
      explanation: {
        ar: "<p>UTF-8 يضمن دعم اللغة العربية بشكل صحيح بدون رموز غريبة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "اكتب وسم تحديد الترميز للغة العربية UTF-8.",
      },
      starterCode: "<meta charset=\"UTF-8\">",
    },
    quiz: [
      {
        question: {
          ar: "ما فائدة وسم <meta charset=\"UTF-8\">؟",
        },
        options: [
          {
            ar: "دعم وعرض اللغة العربية وجميع اللغات بدون رموش غريبة",
          },
          {
            ar: "تغيير عرض الصفحة",
          },
          {
            ar: "توفير الحماية للموقع",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي وسم ميتا يضمن تجاوب الصفحة مع شاشات الهواتف والموبايل؟",
        },
        options: [
          {
            ar: "<meta name=\"viewport\">",
          },
          {
            ar: "<meta name=\"mobile\">",
          },
          {
            ar: "<meta name=\"screen\">",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين توضع جميع وسوم Meta داخل هيكل المستند؟",
        },
        options: [
          {
            ar: "داخل عنصر <head>",
          },
          {
            ar: "داخل عنصر <body>",
          },
          {
            ar: "في تذييل الصفحة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-26",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Select & Option",
    },
    description: {
      ar: "تعلّم إنشاء قوائم اختيار منسدلة باستخدام select وoption.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>القوائم المنسدلة Dropdowns</h2>
        <p>أنشئ قائمة منسدلة باستخدام <code>&lt;select&gt;</code> والخيارات <code>&lt;option&gt;</code>.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "قائمة اختيار",
      },
      code: `<select>
  <option>مصر</option>
  <option>السعودية</option>
</select>`,
      result: {
        ar: "<select><option>مصر</option><option>السعودية</option></select>",
      },
      explanation: {
        ar: "<p>يمكن إعطاء القيمة الحقيقية لكل خيار باستخدام خاصية value.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ قائمة اختيار تحتوي على لغتين بـ option.",
      },
      starterCode: `<select>
  <option value="ar">العربية</option>
</select>`,
    },
    quiz: [
      {
        question: {
          ar: "ما هو الوسم الذي ينشئ القائمة المنسدلة للاختيار؟",
        },
        options: [
          {
            ar: "<select>",
          },
          {
            ar: "<dropdown>",
          },
          {
            ar: "<choose>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم الذي يمثل كل خيار فرعي داخل قائمة select؟",
        },
        options: [
          {
            ar: "<option>",
          },
          {
            ar: "<item>",
          },
          {
            ar: "<list>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي الخاصية المستخدمة لتحديد القيمة المرسلة للسيرفر عند الاختيار؟",
        },
        options: [
          {
            ar: "value",
          },
          {
            ar: "name",
          },
          {
            ar: "data",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-27",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Textarea",
    },
    description: {
      ar: "تعلّم استخدام textarea لإدخال نصوص متعددة الأسطر.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>مربع النص المتعدد الأسطر</h2>
        <p>يسمح عنصر <code>&lt;textarea&gt;</code> بكتابة نصوص طويلة ومقالات ورسائل التواصل.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "مربع ملاحظات",
      },
      code: "<textarea rows=\"4\" cols=\"50\" placeholder=\"اكتب ملاحظتك\"></textarea>",
      result: {
        ar: "<textarea rows=\"3\" placeholder=\"اكتب ملاحظتك\"></textarea>",
      },
      explanation: {
        ar: "<p>الخصائص rows و cols تحددان الأبعاد بالأعمدة والأسطر.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ textarea لكتابة رسالة مع تحديد عدد الأسطر.",
      },
      starterCode: "<textarea rows=\"5\" placeholder=\"ارسل رسالتك\"></textarea>",
    },
    quiz: [
      {
        question: {
          ar: "ما العنصر المناسب لإدخال نص مطول يتكون من عدة أسطر كالملاحظات؟",
        },
        options: [
          {
            ar: "<textarea>",
          },
          {
            ar: "<input type=\"text\">",
          },
          {
            ar: "<p>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الخاصية المحددة لارتفاع مربع النص بعدد الأسطر؟",
        },
        options: [
          {
            ar: "rows",
          },
          {
            ar: "cols",
          },
          {
            ar: "height",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمتلك وسم textarea وسم إغلاق منفصل؟",
        },
        options: [
          {
            ar: "نعم، يمتلك وسم إغلاق </textarea>",
          },
          {
            ar: "لا هو وسم مغلق ذاتياً",
          },
          {
            ar: "فقط مع النماذج المتقدمة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-28",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Details & Summary",
    },
    description: {
      ar: "تعلّم إنشاء عناصر قابلة للطي للتفاصيل والأسئلة الشائعة.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>عناصر الإظهار والإخفاء</h2>
        <p>استخدم <code>&lt;details&gt;</code> مع <code>&lt;summary&gt;</code> لإنشاء قائمة أسئلة تفاعلية.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "سؤال وشرح مطوي",
      },
      code: `<details>
  <summary>ما هي الدورة؟</summary>
  <p>دورة تعليمية شاملة.</p>
</details>`,
      result: {
        ar: "<details><summary>ما هي الدورة؟</summary><p>دورة تعليمية شاملة.</p></details>",
      },
      explanation: {
        ar: "<p>عند النقر على summary يفتح المتصفح محتوى details.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ سؤال شائع مع إجابته المطوية.",
      },
      starterCode: `<details>
  <summary>سؤال</summary>
  <p>إجابة</p>
</details>`,
    },
    quiz: [
      {
        question: {
          ar: "ما العنصر المسؤول عن العنوان الظاهر والقابل للنقر لإظهار وإخفاء المحتوى؟",
        },
        options: [
          {
            ar: "<summary>",
          },
          {
            ar: "<details>",
          },
          {
            ar: "<title>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الوسم الحاوي للعملية التفاعلية المطوية بالكامل دون الحاجة لـ JavaScript؟",
        },
        options: [
          {
            ar: "<details>",
          },
          {
            ar: "<toggle>",
          },
          {
            ar: "<accordion>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل تظهر محتويات details التفصيلية تلقائياً قبل أن ينقر عليها المستخدم؟",
        },
        options: [
          {
            ar: "تكون مخفية افتراضياً حتى يتم النقر عليها",
          },
          {
            ar: "تظهر مفتوحة دائماً",
          },
          {
            ar: "تحتاج CSS لتختفي",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-29",
    kicker: "ADVANCED HTML",
    title: {
      ar: "Iframes",
    },
    description: {
      ar: "تعلّم أساسيات تضمين صفحات أو محتوى خارجي باستخدام iframe.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>التضمين بـ Iframe</h2>
        <p>يسمح <code>&lt;iframe&gt;</code> بتضمين خرائط جوجل أو مقاطع يوتيوب أو صفحات خارجية.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "تضمين صفحة",
      },
      code: "<iframe src=\"https://example.com\" width=\"100%\" height=\"200\"></iframe>",
      result: {
        ar: "<p>مربع تضمين محتوى خارجي يظهر هنا</p>",
      },
      explanation: {
        ar: "<p>الخاصية src تحدد رابط الصفحة المضمنة.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ iframe مع العرض والارتفاع المناسبين.",
      },
      starterCode: "<iframe src=\"https://example.com\" width=\"300\" height=\"200\"></iframe>",
    },
    quiz: [
      {
        question: {
          ar: "ما وظيفة العنصر <iframe>؟",
        },
        options: [
          {
            ar: "تضمين صفحة أو موقع أو ميديا خارجية داخل الصفحة الحالية",
          },
          {
            ar: "إنشاء إطار أحمر حول الفقرة",
          },
          {
            ar: "تشغيل الصوت فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي الخاصية المحددة لرابط الصفحة الخارجية المضمنة داخل iframe؟",
        },
        options: [
          {
            ar: "src",
          },
          {
            ar: "href",
          },
          {
            ar: "link",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الخصائص المستخدمة لضبط أبعاد إطار التضمين؟",
        },
        options: [
          {
            ar: "width و height",
          },
          {
            ar: "size و scale",
          },
          {
            ar: "max و min",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "html-30",
    kicker: "ADVANCED HTML",
    title: {
      ar: "مشروع تطبيق HTML كامل",
    },
    description: {
      ar: "تطبيق شامل لجميع المهارات والمفاهيم التي تعلمتها في الدورة.",
    },
    body: {
      ar: `
      <article class="content-card">
        <h2>التطبيق النهائي</h2>
        <p>تهانينا! أنت الآن قادر على بناء صفحة ويب متكاملة ومتحكمة باستخدام أحدث معايير HTML5.</p>
      </article>
    `,
    },
    example: {
      title: {
        ar: "صفحة ويب متكاملة",
      },
      code: `<!DOCTYPE html>
<html lang="ar">
<head>
  <title>موقعي النهائي</title>
</head>
<body>
  <header><h1>موقعي</h1></header>
  <main><p>محتوى متكامل</p></main>
  <footer>الحقوق محفوظة</footer>
</body>
</html>`,
      result: {
        ar: "<header><h1>موقعي</h1></header><main><p>محتوى متكامل</p></main><footer>الحقوق محفوظة</footer>",
      },
      explanation: {
        ar: "<p>تم دمج كافة الوسوم الهيكلية والدلالية لبناء الصفحة بشكل احترافي.</p>",
      },
    },
    practice: {
      prompt: {
        ar: "قم بكتابة صفحة HTML متكاملة تحتوي على هيدر ومحتوى وتذييل.",
      },
      starterCode: `<!DOCTYPE html>
<html lang="ar">
<head>
  <title>مشروعي</title>
</head>
<body>
  <!-- ابدأ البناء هنا -->
</body>
</html>`,
    },
    quiz: [
      {
        question: {
          ar: "ما هو التسلسل السليم والمنظم لبناء صفحة ويب دلالية ممتازة؟",
        },
        options: [
          {
            ar: "<header> ثم <main> ثم <footer>",
          },
          {
            ar: "<footer> ثم <header> ثم <main>",
          },
          {
            ar: "<main> فقط بدون باقي الوسوم",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو الوسم الذي يغلف كامل المستند ويحدد الاتجاه واللغة؟",
        },
        options: [
          {
            ar: "<html>",
          },
          {
            ar: "<body>",
          },
          {
            ar: "<head>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي مما يلي يعد الممارسة الأفضل عند بناء أي موقع حالياً؟",
        },
        options: [
          {
            ar: "استخدام العناصر الدلالية المعنوية والتنظيم الاحترافي",
          },
          {
            ar: "استخدام div في كل الكود بدون دلالة",
          },
          {
            ar: "تجاهل العناوين تماماً",
          },
        ],
        correct: 0,
      },
    ],
  },
];
