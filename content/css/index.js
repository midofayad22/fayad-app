// CSS course content, shared lesson schema (see docs/lesson-schema.md). Arabic + English text come from the legacy page.
// Generated once from the legacy implementation by tools/convert-css-track.mjs; now hand-maintained.

export const track = {
  id: "css",
  title: {
    ar: "CSS",
    en: "CSS",
  },
  editorLabel: "CSS",
  exampleHeading: {
    ar: "أول كود CSS لك",
    en: "Your first CSS code",
  },
  practiceHeading: {
    ar: "اكتب CSS وشاهد النتيجة",
    en: "Write CSS and see the result",
  },
  runtime: "css",
  preview: {
    html: {
      ar: "<h1>Hello CSS</h1><p>غيّر كود CSS ثم اضغط <strong>تشغيل CSS</strong>.</p><button>زر تجريبي</button>",
      en: "<h1>Hello CSS</h1><p>Change the CSS and click <strong>Run CSS</strong>.</p><button>Example Button</button>",
    },
  },
  groups: [
    {
      id: "css-g1",
      title: {
        ar: "أساسيات CSS",
        en: "CSS BASICS",
      },
      lessons: ["css-01", "css-02", "css-03", "css-04", "css-05", "css-06"],
    },
    {
      id: "css-g2",
      title: {
        ar: "نموذج الصندوق",
        en: "BOX MODEL",
      },
      lessons: ["css-07", "css-08", "css-09", "css-10", "css-11"],
    },
    {
      id: "css-g3",
      title: {
        ar: "النصوص والخطوط",
        en: "TEXT & FONTS",
      },
      lessons: ["css-12", "css-13", "css-14", "css-15"],
    },
    {
      id: "css-g4",
      title: {
        ar: "التخطيط",
        en: "LAYOUT",
      },
      lessons: ["css-16", "css-17", "css-18", "css-19", "css-20"],
    },
    {
      id: "css-g5",
      title: {
        ar: "CSS الحديثة",
        en: "MODERN CSS",
      },
      lessons: ["css-21", "css-22", "css-23", "css-24", "css-25"],
    },
    {
      id: "css-g6",
      title: {
        ar: "CSS المتقدمة",
        en: "ADVANCED CSS",
      },
      lessons: ["css-26", "css-27", "css-28", "css-29", "css-30"],
    },
  ],
};

export const lessons = [
  {
    id: "css-01",
    title: {
      ar: "مقدمة إلى CSS",
      en: "Introduction to CSS",
    },
    description: {
      ar: "تعرف على ماهية CSS ولماذا نستخدمه وكيف يتحكم في مظهر عناصر HTML.",
      en: "Learn what CSS is, why we use it, and how it controls the appearance of HTML elements.",
    },
    sections: [
      {
        title: {
          ar: "ما هو CSS؟",
          en: "What is CSS?",
        },
        html: {
          ar: "<p>CSS اختصار لـ <strong>Cascading Style Sheets</strong> أي أوراق الأنماط المتتالية.</p><p>يُستخدم CSS للتحكم في المظهر المرئي لعناصر HTML.</p><p>باستخدام CSS يمكنك تغيير الألوان والأحجام والمسافات والتخطيطات والخطوط والحركات وغير ذلك الكثير.</p>",
          en: "<p>CSS stands for <strong>Cascading Style Sheets</strong>.</p><p>CSS is used to control the visual appearance of HTML elements.</p><p>With CSS, you can change colors, sizes, spacing, layouts, fonts, animations, and much more.</p>",
        },
      },
      {
        label: {
          ar: "الفكرة الأساسية",
          en: "KEY IDEA",
        },
        title: {
          ar: "HTML ينشئ الهيكل، وCSS ينشئ التصميم.",
          en: "HTML creates the structure. CSS creates the design.",
        },
        html: {
          ar: "<p>تخيل أنك تبني منزلًا. HTML يمثل هيكل المنزل، بينما CSS يتحكم في الألوان والحجم والمسافات والمظهر العام.</p>",
          en: "<p>Think about a house. HTML is the structure of the house, while CSS controls the colors, size, spacing, and overall appearance.</p>",
        },
      },
    ],
    example: {
      code: `h1 {
  color: #0f807a;
  font-size: 40px;
}

p {
  color: #536777;
}`,
    },
    quiz: [
      {
        question: {
          ar: "فيما يُستخدم CSS بشكل أساسي؟",
          en: "What is CSS mainly used for?",
        },
        options: [
          {
            ar: "تنسيق وتجميل مظهر صفحات الويب",
            en: "Styling the appearance of web pages",
          },
          {
            ar: "إنشاء جداول قواعد البيانات",
            en: "Creating database tables",
          },
          {
            ar: "تشغيل الأكواد على الخادم",
            en: "Running server-side code",
          },
          {
            ar: "إنشاء هيكل HTML",
            en: "Creating HTML structure",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تعني CSS؟",
          en: "What does CSS stand for?",
        },
        options: [
          {
            ar: "Cascading Style Sheets",
            en: "Cascading Style Sheets",
          },
          {
            ar: "Computer Style System",
            en: "Computer Style System",
          },
          {
            ar: "Creative Styling System",
            en: "Creative Styling System",
          },
          {
            ar: "Coded Style Syntax",
            en: "Coded Style Syntax",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي تقنية توفر الهيكل الأساسي لصفحة الويب؟",
          en: "Which technology provides the structure of a webpage?",
        },
        options: [
          {
            ar: "HTML",
            en: "HTML",
          },
          {
            ar: "CSS",
            en: "CSS",
          },
          {
            ar: "JavaScript",
            en: "JavaScript",
          },
          {
            ar: "SQL",
            en: "SQL",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-02",
    title: {
      ar: "صيغة كتابة CSS",
      en: "CSS Syntax",
    },
    description: {
      ar: "تعلم البنية الأساسية لقاعدة CSS وافهم المحددات والخصائص والقيم.",
      en: "Learn the basic structure of a CSS rule and understand selectors, properties, and values.",
    },
    sections: [
      {
        title: {
          ar: "فهم صيغة كتابة CSS",
          en: "Understanding CSS Syntax",
        },
        html: {
          ar: "<p>تحتوي قاعدة CSS على <strong>Selector</strong> ومجموعة من <strong>Declarations</strong>.</p><p>يحدد الـ Selector عنصر HTML الذي تريد تنسيقه.</p><p>كل Declaration تحتوي على Property وValue.</p>",
          en: "<p>A CSS rule contains a <strong>selector</strong> and a group of <strong>declarations</strong>.</p><p>The selector chooses the HTML element you want to style.</p><p>Each declaration contains a property and a value.</p>",
        },
      },
    ],
    example: {
      code: `h1 {
  color: blue;
  font-size: 40px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي جزء يحدد عنصر HTML الذي نريد تنسيقه؟",
          en: "Which part selects the HTML element?",
        },
        options: [
          {
            ar: "Selector — المحدد",
            en: "Selector",
          },
          {
            ar: "Value — القيمة",
            en: "Value",
          },
          {
            ar: "Property — الخاصية",
            en: "Property",
          },
          {
            ar: "Declaration — التصريح",
            en: "Declaration",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي جزء يحدد نوع التنسيق الذي سيتم تغييره؟",
          en: "Which part defines what style is changed?",
        },
        options: [
          {
            ar: "Property — الخاصية",
            en: "Property",
          },
          {
            ar: "Selector — المحدد",
            en: "Selector",
          },
          {
            ar: "HTML",
            en: "HTML",
          },
          {
            ar: "Comment — التعليق",
            en: "Comment",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "في color: blue، ماذا تمثل blue؟",
          en: "In color: blue, what is blue?",
        },
        options: [
          {
            ar: "Value — القيمة",
            en: "Value",
          },
          {
            ar: "Selector — المحدد",
            en: "Selector",
          },
          {
            ar: "Property — الخاصية",
            en: "Property",
          },
          {
            ar: "Element — العنصر",
            en: "Element",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-03",
    title: {
      ar: "المحددات Selectors",
      en: "Selectors",
    },
    description: {
      ar: "تعلم كيف تستخدم محددات CSS لاستهداف عناصر HTML.",
      en: "Learn how CSS selectors target HTML elements.",
    },
    example: {
      code: `p {
  color: #0b5d91;
}

.title {
  color: #0f807a;
}`,
    },
    quiz: [
      {
        question: {
          ar: "ماذا يفعل الـ Selector؟",
          en: "What does a selector do?",
        },
        options: [
          {
            ar: "يحدد العناصر التي نريد تنسيقها",
            en: "Selects elements to style",
          },
          {
            ar: "ينشئ عناصر HTML",
            en: "Creates HTML elements",
          },
          {
            ar: "يشغل JavaScript",
            en: "Runs JavaScript",
          },
          {
            ar: "ينشئ قاعدة بيانات",
            en: "Creates a database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Selector يستهدف Class باسم title؟",
          en: "Which selector targets a class named title?",
        },
        options: [
          {
            ar: ".title",
            en: ".title",
          },
          {
            ar: "#title",
            en: "#title",
          },
          {
            ar: "title()",
            en: "title()",
          },
          {
            ar: "class-title",
            en: "class-title",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يستهدف الـ p Selector؟",
          en: "What does the p selector target?",
        },
        options: [
          {
            ar: "عناصر الفقرات Paragraph",
            en: "Paragraph elements",
          },
          {
            ar: "العناصر التي لها ID",
            en: "Elements with an ID",
          },
          {
            ar: "العناصر التي لها Class",
            en: "Elements with a class",
          },
          {
            ar: "الصور",
            en: "Images",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-04",
    title: {
      ar: "الألوان",
      en: "Colors",
    },
    description: {
      ar: "تعلم كيفية استخدام أسماء الألوان وHEX وRGB وغيرها من طرق تحديد الألوان.",
      en: "Learn how to use named colors, HEX, RGB, and other color formats.",
    },
    example: {
      code: `h1 {
  color: #0b5d91;
}

p {
  color: rgb(15, 128, 122);
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تغير لون النص؟",
          en: "Which property changes text color?",
        },
        options: [
          {
            ar: "color",
            en: "color",
          },
          {
            ar: "background",
            en: "background",
          },
          {
            ar: "font",
            en: "font",
          },
          {
            ar: "text",
            en: "text",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نوع قيمة اللون #0b5d91؟",
          en: "What type of color value is #0b5d91?",
        },
        options: [
          {
            ar: "HEX",
            en: "HEX",
          },
          {
            ar: "RGB",
            en: "RGB",
          },
          {
            ar: "HSL",
            en: "HSL",
          },
          {
            ar: "Keyword",
            en: "Keyword",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي دالة تستخدم لكتابة لون بصيغة RGB؟",
          en: "Which function represents an RGB color?",
        },
        options: [
          {
            ar: "rgb()",
            en: "rgb()",
          },
          {
            ar: "color()",
            en: "color()",
          },
          {
            ar: "hex()",
            en: "hex()",
          },
          {
            ar: "paint()",
            en: "paint()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-05",
    title: {
      ar: "الخلفيات",
      en: "Backgrounds",
    },
    description: {
      ar: "تعلم كيفية التحكم في ألوان وصور خلفيات العناصر.",
      en: "Learn how to control background colors and images.",
    },
    example: {
      code: `body {
  background-color: #eaf3f8;
}

.card {
  background: white;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تغير لون خلفية العنصر؟",
          en: "Which property changes an element's background color?",
        },
        options: [
          {
            ar: "background-color",
            en: "background-color",
          },
          {
            ar: "color",
            en: "color",
          },
          {
            ar: "border-color",
            en: "border-color",
          },
          {
            ar: "background-text",
            en: "background-text",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية مختصرة يمكنها التحكم في إعدادات الخلفية؟",
          en: "Which shorthand property can control background styles?",
        },
        options: [
          {
            ar: "background",
            en: "background",
          },
          {
            ar: "back",
            en: "back",
          },
          {
            ar: "bg-style",
            en: "bg-style",
          },
          {
            ar: "background-style-only",
            en: "background-style-only",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تستخدم لإضافة صورة للخلفية؟",
          en: "Which property is used for a background image?",
        },
        options: [
          {
            ar: "background-image",
            en: "background-image",
          },
          {
            ar: "image-background",
            en: "image-background",
          },
          {
            ar: "background-picture",
            en: "background-picture",
          },
          {
            ar: "image",
            en: "image",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-06",
    title: {
      ar: "الحدود Borders",
      en: "Borders",
    },
    description: {
      ar: "تعلم كيفية إنشاء حدود حول عناصر HTML.",
      en: "Learn how to create borders around HTML elements.",
    },
    example: {
      code: `.card {
  border: 2px solid #0f807a;
  border-radius: 12px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تنشئ Border حول العنصر؟",
          en: "Which property creates a border?",
        },
        options: [
          {
            ar: "border",
            en: "border",
          },
          {
            ar: "outline-text",
            en: "outline-text",
          },
          {
            ar: "edge",
            en: "edge",
          },
          {
            ar: "frame",
            en: "frame",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تجعل زوايا العنصر مستديرة؟",
          en: "Which property creates rounded corners?",
        },
        options: [
          {
            ar: "border-radius",
            en: "border-radius",
          },
          {
            ar: "corner",
            en: "corner",
          },
          {
            ar: "radius-border",
            en: "radius-border",
          },
          {
            ar: "round",
            en: "round",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تمثل 2px في border: 2px solid؟",
          en: "What does 2px represent in border: 2px solid?",
        },
        options: [
          {
            ar: "سمك الـ Border",
            en: "Border width",
          },
          {
            ar: "لون الـ Border",
            en: "Border color",
          },
          {
            ar: "استدارة الـ Border",
            en: "Border radius",
          },
          {
            ar: "ارتفاع العنصر",
            en: "Element height",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-07",
    title: {
      ar: "العرض والارتفاع",
      en: "Width & Height",
    },
    description: {
      ar: "تعلم كيفية التحكم في عرض وارتفاع العناصر.",
      en: "Learn how to control the width and height of elements.",
    },
    example: {
      code: `.box {
  width: 300px;
  height: 150px;
  background: #0b5d91;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تتحكم في عرض العنصر؟",
          en: "Which property controls an element's width?",
        },
        options: [
          {
            ar: "width",
            en: "width",
          },
          {
            ar: "size",
            en: "size",
          },
          {
            ar: "element-width",
            en: "element-width",
          },
          {
            ar: "horizontal-size",
            en: "horizontal-size",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في ارتفاع العنصر؟",
          en: "Which property controls an element's height?",
        },
        options: [
          {
            ar: "height",
            en: "height",
          },
          {
            ar: "size-height",
            en: "size-height",
          },
          {
            ar: "element-height-value",
            en: "element-height-value",
          },
          {
            ar: "vertical",
            en: "vertical",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الوحدة المستخدمة في 300px؟",
          en: "What unit is used in 300px?",
        },
        options: [
          {
            ar: "px",
            en: "px",
          },
          {
            ar: "em",
            en: "em",
          },
          {
            ar: "percent",
            en: "percent",
          },
          {
            ar: "rem-only",
            en: "rem-only",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-08",
    title: {
      ar: "الهامش Margin",
      en: "Margin",
    },
    description: {
      ar: "تعلم كيف ينشئ Margin مساحة خارج العنصر.",
      en: "Learn how margin creates space outside an element.",
    },
    example: {
      code: `.box {
  margin: 30px;
  background: #0f807a;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أين ينشئ الـ Margin المساحة؟",
          en: "Where does margin create space?",
        },
        options: [
          {
            ar: "خارج العنصر",
            en: "Outside the element",
          },
          {
            ar: "داخل العنصر",
            en: "Inside the element",
          },
          {
            ar: "داخل النص",
            en: "Inside the text",
          },
          {
            ar: "داخل الـ Border",
            en: "Inside the border",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في المساحة خارج العنصر؟",
          en: "Which property controls the space outside an element?",
        },
        options: [
          {
            ar: "margin",
            en: "margin",
          },
          {
            ar: "padding",
            en: "padding",
          },
          {
            ar: "spacing",
            en: "spacing",
          },
          {
            ar: "outside",
            en: "outside",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يعني margin: 30px؟",
          en: "What does margin: 30px apply?",
        },
        options: [
          {
            ar: "مساحة 30px خارج العنصر",
            en: "30px outside the element",
          },
          {
            ar: "مساحة 30px داخل المحتوى",
            en: "30px inside the content",
          },
          {
            ar: "Border بحجم 30px",
            en: "30px border",
          },
          {
            ar: "حجم خط 30px",
            en: "30px font size",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-09",
    title: {
      ar: "الحشو Padding",
      en: "Padding",
    },
    description: {
      ar: "تعلم كيف ينشئ Padding مساحة داخل العنصر.",
      en: "Learn how padding creates space inside an element.",
    },
    example: {
      code: `.box {
  padding: 30px;
  background: #eaf3f8;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أين ينشئ الـ Padding المساحة؟",
          en: "Where does padding create space?",
        },
        options: [
          {
            ar: "داخل العنصر",
            en: "Inside the element",
          },
          {
            ar: "خارج العنصر",
            en: "Outside the element",
          },
          {
            ar: "خارج الصفحة",
            en: "Outside the page",
          },
          {
            ar: "داخل الـ Margin",
            en: "Inside the margin",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في المسافة بين المحتوى والـ Border؟",
          en: "Which property controls space between content and border?",
        },
        options: [
          {
            ar: "padding",
            en: "padding",
          },
          {
            ar: "margin",
            en: "margin",
          },
          {
            ar: "gap-outside",
            en: "gap-outside",
          },
          {
            ar: "content-space",
            en: "content-space",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يضيف padding: 20px؟",
          en: "What does padding: 20px add?",
        },
        options: [
          {
            ar: "مساحة داخلية مقدارها 20px",
            en: "20px of inner space",
          },
          {
            ar: "مساحة خارجية مقدارها 20px",
            en: "20px of outer space",
          },
          {
            ar: "Border بحجم 20px",
            en: "20px border",
          },
          {
            ar: "ارتفاع فقط بمقدار 20px",
            en: "20px height only",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-10",
    title: {
      ar: "نموذج الصندوق Box Model",
      en: "Box Model",
    },
    description: {
      ar: "افهم أجزاء نموذج الصندوق: المحتوى والـ Padding والـ Border والـ Margin.",
      en: "Understand content, padding, border, and margin.",
    },
    example: {
      code: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid #0f807a;
  margin: 20px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "ما الأجزاء الأربعة التي يتكون منها CSS Box Model؟",
          en: "Which four parts make up the CSS box model?",
        },
        options: [
          {
            ar: "المحتوى، Padding، Border، Margin",
            en: "Content, padding, border, margin",
          },
          {
            ar: "النص، الصورة، الزر، الرابط",
            en: "Text, image, button, link",
          },
          {
            ar: "Header، Main، Footer، Nav",
            en: "Header, main, footer, nav",
          },
          {
            ar: "العرض، الارتفاع، اللون، الخط",
            en: "Width, height, color, font",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي جزء يكون الأقرب إلى المحتوى نفسه؟",
          en: "Which part is closest to the actual content?",
        },
        options: [
          {
            ar: "Content — المحتوى",
            en: "Content",
          },
          {
            ar: "Margin",
            en: "Margin",
          },
          {
            ar: "Border",
            en: "Border",
          },
          {
            ar: "المساحة الخارجية",
            en: "Outer spacing",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي جزء ينشئ مساحة خارج الـ Border؟",
          en: "Which part creates space outside the border?",
        },
        options: [
          {
            ar: "Margin",
            en: "Margin",
          },
          {
            ar: "Padding",
            en: "Padding",
          },
          {
            ar: "Content",
            en: "Content",
          },
          {
            ar: "Width",
            en: "Width",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-11",
    title: {
      ar: "حساب حجم الصندوق Box Sizing",
      en: "Box Sizing",
    },
    description: {
      ar: "تعلم كيف تغير خاصية box-sizing طريقة حساب العرض والارتفاع.",
      en: "Learn how box-sizing changes how width and height are calculated.",
    },
    example: {
      code: `* {
  box-sizing: border-box;
}

.box {
  width: 300px;
  padding: 30px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "ماذا يتضمن border-box؟",
          en: "What does border-box include?",
        },
        options: [
          {
            ar: "الـ Padding والـ Border داخل الحجم المحدد",
            en: "Padding and border inside the declared size",
          },
          {
            ar: "المحتوى فقط",
            en: "Only the content",
          },
          {
            ar: "الـ Margin فقط",
            en: "Only the margin",
          },
          {
            ar: "الـ Padding فقط",
            en: "Only the padding",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في طريقة حساب حجم الصندوق؟",
          en: "Which property controls box sizing behavior?",
        },
        options: [
          {
            ar: "box-sizing",
            en: "box-sizing",
          },
          {
            ar: "box-size",
            en: "box-size",
          },
          {
            ar: "size-model",
            en: "size-model",
          },
          {
            ar: "element-sizing",
            en: "element-sizing",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي قيمة تستخدم غالبًا لتسهيل التحكم في أحجام العناصر؟",
          en: "Which value is commonly used to make sizing easier to control?",
        },
        options: [
          {
            ar: "border-box",
            en: "border-box",
          },
          {
            ar: "content-only",
            en: "content-only",
          },
          {
            ar: "margin-box",
            en: "margin-box",
          },
          {
            ar: "size-box",
            en: "size-box",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-12",
    title: {
      ar: "تنسيق النصوص",
      en: "Text Styling",
    },
    description: {
      ar: "تعلم كيفية التحكم في لون النص وتزيينه والمسافات والمظهر.",
      en: "Learn how to control text color, decoration, spacing, and appearance.",
    },
    example: {
      code: `p {
  color: #0b5d91;
  text-decoration: underline;
  letter-spacing: 1px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تضيف خطًا أسفل النص؟",
          en: "Which property adds an underline?",
        },
        options: [
          {
            ar: "text-decoration",
            en: "text-decoration",
          },
          {
            ar: "text-style",
            en: "text-style",
          },
          {
            ar: "underline-text",
            en: "underline-text",
          },
          {
            ar: "font-line",
            en: "font-line",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في المسافة بين الحروف؟",
          en: "Which property controls spacing between letters?",
        },
        options: [
          {
            ar: "letter-spacing",
            en: "letter-spacing",
          },
          {
            ar: "word-spacing-only",
            en: "word-spacing-only",
          },
          {
            ar: "text-gap",
            en: "text-gap",
          },
          {
            ar: "font-spacing",
            en: "font-spacing",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تغير لون النص؟",
          en: "Which property changes the text color?",
        },
        options: [
          {
            ar: "color",
            en: "color",
          },
          {
            ar: "text-color-property",
            en: "text-color-property",
          },
          {
            ar: "font-color-only",
            en: "font-color-only",
          },
          {
            ar: "paint",
            en: "paint",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-13",
    title: {
      ar: "الخطوط Fonts",
      en: "Fonts",
    },
    description: {
      ar: "تعلم كيفية التحكم في نوع الخط وحجمه ووزنه وشكله.",
      en: "Learn how to control font family, size, weight, and style.",
    },
    example: {
      code: `h1 {
  font-family: Arial, sans-serif;
  font-size: 42px;
  font-weight: 700;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تتحكم في نوع الخط؟",
          en: "Which property controls the font family?",
        },
        options: [
          {
            ar: "font-family",
            en: "font-family",
          },
          {
            ar: "font-type",
            en: "font-type",
          },
          {
            ar: "font-name",
            en: "font-name",
          },
          {
            ar: "typeface",
            en: "typeface",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في حجم الخط؟",
          en: "Which property controls font size?",
        },
        options: [
          {
            ar: "font-size",
            en: "font-size",
          },
          {
            ar: "text-size",
            en: "text-size",
          },
          {
            ar: "font-scale",
            en: "font-scale",
          },
          {
            ar: "size-font",
            en: "size-font",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تتحكم font-weight؟",
          en: "What does font-weight control?",
        },
        options: [
          {
            ar: "سمك الخط",
            en: "Font thickness",
          },
          {
            ar: "لون الخط",
            en: "Font color",
          },
          {
            ar: "نوع الخط",
            en: "Font family",
          },
          {
            ar: "المسافة بين الأسطر",
            en: "Line spacing",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-14",
    title: {
      ar: "ارتفاع السطر Line Height",
      en: "Line Height",
    },
    description: {
      ar: "تعلم كيف يتحكم line-height في المسافة الرأسية بين أسطر النص.",
      en: "Learn how line-height controls vertical spacing between lines of text.",
    },
    example: {
      code: `p {
  line-height: 1.8;
}`,
    },
    quiz: [
      {
        question: {
          ar: "ماذا يتحكم line-height؟",
          en: "What does line-height control?",
        },
        options: [
          {
            ar: "المسافة الرأسية بين الأسطر",
            en: "Vertical space between lines",
          },
          {
            ar: "لون النص",
            en: "Text color",
          },
          {
            ar: "عرض العنصر",
            en: "Element width",
          },
          {
            ar: "نوع الخط",
            en: "Font family",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تغير المسافة بين أسطر النص؟",
          en: "Which property changes the space between text lines?",
        },
        options: [
          {
            ar: "line-height",
            en: "line-height",
          },
          {
            ar: "line-spacing-css",
            en: "line-spacing-css",
          },
          {
            ar: "text-height",
            en: "text-height",
          },
          {
            ar: "paragraph-gap",
            en: "paragraph-gap",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يتحكم line-height بشكل أساسي في مسافة أفقية أم رأسية؟",
          en: "Does line-height mainly control horizontal or vertical spacing?",
        },
        options: [
          {
            ar: "رأسية",
            en: "Vertical",
          },
          {
            ar: "أفقية",
            en: "Horizontal",
          },
          {
            ar: "مائلة",
            en: "Diagonal",
          },
          {
            ar: "لا يتحكم في المسافات",
            en: "None",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-15",
    title: {
      ar: "محاذاة النص",
      en: "Text Alignment",
    },
    description: {
      ar: "تعلم كيفية محاذاة النص أفقيًا.",
      en: "Learn how to align text horizontally.",
    },
    example: {
      code: `.title {
  text-align: center;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي قيمة تجعل النص في المنتصف؟",
          en: "Which value centers text?",
        },
        options: [
          {
            ar: "center",
            en: "center",
          },
          {
            ar: "middle",
            en: "middle",
          },
          {
            ar: "horizontal",
            en: "horizontal",
          },
          {
            ar: "central",
            en: "central",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في محاذاة النص أفقيًا؟",
          en: "Which property controls horizontal text alignment?",
        },
        options: [
          {
            ar: "text-align",
            en: "text-align",
          },
          {
            ar: "text-position",
            en: "text-position",
          },
          {
            ar: "align-text-property",
            en: "align-text-property",
          },
          {
            ar: "horizontal-text",
            en: "horizontal-text",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي قيمة تجعل النص بمحاذاة اليمين؟",
          en: "Which value aligns text to the right?",
        },
        options: [
          {
            ar: "right",
            en: "right",
          },
          {
            ar: "end-text-only",
            en: "end-text-only",
          },
          {
            ar: "east",
            en: "east",
          },
          {
            ar: "right-align-property",
            en: "right-align-property",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-16",
    title: {
      ar: "Display",
      en: "Display",
    },
    description: {
      ar: "تعلم كيف تتحكم خاصية display في طريقة ظهور وترتيب العناصر.",
      en: "Learn how display controls the layout behavior of elements.",
    },
    example: {
      code: `.box {
  display: inline-block;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تتحكم في طريقة عرض العنصر؟",
          en: "Which property controls an element's display behavior?",
        },
        options: [
          {
            ar: "display",
            en: "display",
          },
          {
            ar: "layout",
            en: "layout",
          },
          {
            ar: "element-type",
            en: "element-type",
          },
          {
            ar: "show",
            en: "show",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي قيمة تجعل العنصر يتصرف كـ inline مع إمكانية تحديد العرض والارتفاع؟",
          en: "Which display value makes an element behave inline while accepting width and height?",
        },
        options: [
          {
            ar: "inline-block",
            en: "inline-block",
          },
          {
            ar: "inline-only",
            en: "inline-only",
          },
          {
            ar: "block-inline",
            en: "block-inline",
          },
          {
            ar: "flex-inline",
            en: "flex-inline",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي قيمة تجعل العنصر Block-level؟",
          en: "Which display value creates a block-level element?",
        },
        options: [
          {
            ar: "block",
            en: "block",
          },
          {
            ar: "section",
            en: "section",
          },
          {
            ar: "box",
            en: "box",
          },
          {
            ar: "full-block",
            en: "full-block",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-17",
    title: {
      ar: "Position",
      en: "Position",
    },
    description: {
      ar: "تعلم كيفية عمل relative وabsolute وfixed وsticky.",
      en: "Learn how relative, absolute, fixed, and sticky positioning work.",
    },
    example: {
      code: `.box {
  position: relative;
  top: 20px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تتحكم في موضع العنصر؟",
          en: "Which property controls positioning?",
        },
        options: [
          {
            ar: "position",
            en: "position",
          },
          {
            ar: "place",
            en: "place",
          },
          {
            ar: "location",
            en: "location",
          },
          {
            ar: "element-positioning",
            en: "element-positioning",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي قيمة تجعل العنصر مرتبطًا بالـ viewport؟",
          en: "Which position value keeps an element attached to the viewport?",
        },
        options: [
          {
            ar: "fixed",
            en: "fixed",
          },
          {
            ar: "absolute",
            en: "absolute",
          },
          {
            ar: "relative",
            en: "relative",
          },
          {
            ar: "static",
            en: "static",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي قيمة تستخدم غالبًا كنقطة مرجعية لعناصر absolute الداخلية؟",
          en: "Which value is commonly used as a reference point for absolutely positioned children?",
        },
        options: [
          {
            ar: "relative",
            en: "relative",
          },
          {
            ar: "static",
            en: "static",
          },
          {
            ar: "fixed",
            en: "fixed",
          },
          {
            ar: "normal",
            en: "normal",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-18",
    title: {
      ar: "Flexbox",
      en: "Flexbox",
    },
    description: {
      ar: "تعلم كيف يساعدك Flexbox على إنشاء تخطيطات مرنة أحادية الاتجاه.",
      en: "Learn how Flexbox helps you create flexible one-dimensional layouts.",
    },
    example: {
      code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تقوم بتفعيل Flexbox؟",
          en: "Which property enables Flexbox?",
        },
        options: [
          {
            ar: "display: flex",
            en: "display: flex",
          },
          {
            ar: "flex: true",
            en: "flex: true",
          },
          {
            ar: "layout: flex",
            en: "layout: flex",
          },
          {
            ar: "enable-flex",
            en: "enable-flex",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في المحاذاة على الـ Main Axis؟",
          en: "Which property controls alignment along the main axis?",
        },
        options: [
          {
            ar: "justify-content",
            en: "justify-content",
          },
          {
            ar: "align-main",
            en: "align-main",
          },
          {
            ar: "flex-position",
            en: "flex-position",
          },
          {
            ar: "main-align",
            en: "main-align",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تتحكم في المحاذاة على الـ Cross Axis؟",
          en: "Which property controls alignment on the cross axis?",
        },
        options: [
          {
            ar: "align-items",
            en: "align-items",
          },
          {
            ar: "cross-content",
            en: "cross-content",
          },
          {
            ar: "flex-cross",
            en: "flex-cross",
          },
          {
            ar: "align-main",
            en: "align-main",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-19",
    title: {
      ar: "CSS Grid",
      en: "CSS Grid",
    },
    description: {
      ar: "تعلم كيف ينشئ CSS Grid تخطيطات قوية ثنائية الاتجاه.",
      en: "Learn how CSS Grid creates powerful two-dimensional layouts.",
    },
    example: {
      code: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تقوم بتفعيل CSS Grid؟",
          en: "Which property enables CSS Grid?",
        },
        options: [
          {
            ar: "display: grid",
            en: "display: grid",
          },
          {
            ar: "grid: true",
            en: "grid: true",
          },
          {
            ar: "layout: grid",
            en: "layout: grid",
          },
          {
            ar: "enable-grid",
            en: "enable-grid",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تحدد أعمدة الـ Grid؟",
          en: "Which property defines grid columns?",
        },
        options: [
          {
            ar: "grid-template-columns",
            en: "grid-template-columns",
          },
          {
            ar: "grid-columns-only",
            en: "grid-columns-only",
          },
          {
            ar: "columns-grid",
            en: "columns-grid",
          },
          {
            ar: "grid-layout-columns",
            en: "grid-layout-columns",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تتحكم gap في الـ Grid؟",
          en: "What does gap control in a grid?",
        },
        options: [
          {
            ar: "المسافة بين عناصر الـ Grid",
            en: "Space between grid items",
          },
          {
            ar: "لون الـ Grid",
            en: "Grid color",
          },
          {
            ar: "عرض الأعمدة فقط",
            en: "Column width only",
          },
          {
            ar: "ارتفاع العنصر",
            en: "Element height",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-20",
    title: {
      ar: "التصميم المتجاوب",
      en: "Responsive Design",
    },
    description: {
      ar: "تعلم كيف يجعل CSS المواقع تتكيف مع أحجام الشاشات المختلفة.",
      en: "Learn how CSS adapts websites to different screen sizes.",
    },
    example: {
      code: `@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
  }
}`,
    },
    quiz: [
      {
        question: {
          ar: "ما هو Responsive Design؟",
          en: "What is responsive design?",
        },
        options: [
          {
            ar: "تصميم يتكيف مع أحجام الشاشات المختلفة",
            en: "Design that adapts to different screen sizes",
          },
          {
            ar: "تصميم للهواتف فقط",
            en: "Design only for phones",
          },
          {
            ar: "تصميم بدون CSS",
            en: "Design without CSS",
          },
          {
            ar: "تصميم لأجهزة الكمبيوتر فقط",
            en: "Design only for desktop",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي ميزة في CSS تستخدم غالبًا لتحديد Breakpoints؟",
          en: "Which CSS feature is commonly used for responsive breakpoints?",
        },
        options: [
          {
            ar: "Media Queries",
            en: "Media Queries",
          },
          {
            ar: "Animations",
            en: "Animations",
          },
          {
            ar: "Variables",
            en: "Variables",
          },
          {
            ar: "Borders",
            en: "Borders",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يعني max-width: 600px داخل Media Query؟",
          en: "What does max-width: 600px mean in a media query?",
        },
        options: [
          {
            ar: "تطبيق التنسيقات عندما يكون عرض الشاشة 600px أو أقل",
            en: "Apply styles when the viewport is 600px or narrower",
          },
          {
            ar: "جعل الصفحة بعرض 600px بالضبط",
            en: "Make the page exactly 600px",
          },
          {
            ar: "جعل كل عنصر بعرض 600px",
            en: "Make every element 600px wide",
          },
          {
            ar: "تحديد أقل عرض للشاشة إلى 600px",
            en: "Set the minimum screen width to 600px",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-21",
    title: {
      ar: "Pseudo-classes",
      en: "Pseudo-classes",
    },
    description: {
      ar: "تعلم كيف تستخدم Pseudo-classes لتنسيق العناصر في حالات معينة.",
      en: "Learn how pseudo-classes style elements in specific states.",
    },
    example: {
      code: `button:hover {
  background: #0f807a;
}`,
    },
    quiz: [
      {
        question: {
          ar: "ماذا يمثل :hover؟",
          en: "What does :hover represent?",
        },
        options: [
          {
            ar: "العنصر عندما يكون مؤشر الماوس فوقه",
            en: "An element when the mouse is over it",
          },
          {
            ar: "العنصر بعد الضغط عليه",
            en: "An element after clicking",
          },
          {
            ar: "العنصر عندما يكون مخفيًا",
            en: "An element when hidden",
          },
          {
            ar: "العنصر قبل تحميله",
            en: "An element before loading",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي مما يلي يعتبر Pseudo-class؟",
          en: "Which of these is a pseudo-class?",
        },
        options: [
          {
            ar: ":hover",
            en: ":hover",
          },
          {
            ar: "::after",
            en: "::after",
          },
          {
            ar: ".hover-element",
            en: ".hover-element",
          },
          {
            ar: "#hover",
            en: "#hover",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل تصف Pseudo-classes عادة حالة العنصر أم جزءًا منه؟",
          en: "Do pseudo-classes usually describe an element's state or part?",
        },
        options: [
          {
            ar: "حالة العنصر",
            en: "State",
          },
          {
            ar: "هيكل HTML",
            en: "HTML structure",
          },
          {
            ar: "حالة قاعدة البيانات",
            en: "Database state",
          },
          {
            ar: "نوع الملف",
            en: "File type",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-22",
    title: {
      ar: "Pseudo-elements",
      en: "Pseudo-elements",
    },
    description: {
      ar: "تعلم كيف تستخدم Pseudo-elements لتنسيق أجزاء محددة من العناصر.",
      en: "Learn how pseudo-elements style specific parts of elements.",
    },
    example: {
      code: `h1::after {
  content: "";
  display: block;
  height: 3px;
  background: #0f807a;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي صيغة تمثل Pseudo-element؟",
          en: "Which syntax represents a pseudo-element?",
        },
        options: [
          {
            ar: "::after",
            en: "::after",
          },
          {
            ar: ":after-element",
            en: ":after-element",
          },
          {
            ar: "pseudo-after",
            en: "pseudo-after",
          },
          {
            ar: ".after",
            en: ".after",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تستخدم عادة مع ::before أو ::after لإنشاء المحتوى؟",
          en: "Which property is commonly required to generate content with ::before or ::after?",
        },
        options: [
          {
            ar: "content",
            en: "content",
          },
          {
            ar: "generate",
            en: "generate",
          },
          {
            ar: "pseudo-content",
            en: "pseudo-content",
          },
          {
            ar: "create",
            en: "create",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تستهدف Pseudo-elements؟",
          en: "What do pseudo-elements target?",
        },
        options: [
          {
            ar: "أجزاء محددة من العنصر",
            en: "Specific parts of an element",
          },
          {
            ar: "الصفحات بالكامل فقط",
            en: "Only entire pages",
          },
          {
            ar: "سجلات قواعد البيانات",
            en: "Database records",
          },
          {
            ar: "دوال JavaScript",
            en: "JavaScript functions",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-23",
    title: {
      ar: "Transitions",
      en: "Transitions",
    },
    description: {
      ar: "تعلم كيف تجعل Transitions التغييرات بين الحالات أكثر سلاسة.",
      en: "Learn how CSS transitions create smooth changes between states.",
    },
    example: {
      code: `button {
  transition: 0.3s ease;
}

button:hover {
  transform: translateY(-3px);
}`,
    },
    quiz: [
      {
        question: {
          ar: "ماذا تفعل transition؟",
          en: "What does transition do?",
        },
        options: [
          {
            ar: "تنشئ تغييرات وانتقالات سلسة",
            en: "Creates smooth changes",
          },
          {
            ar: "تنشئ HTML",
            en: "Creates HTML",
          },
          {
            ar: "تحذف عنصرًا",
            en: "Deletes an element",
          },
          {
            ar: "تنشئ جداول قواعد البيانات",
            en: "Creates database tables",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تمثل 0.3s في transition؟",
          en: "What does 0.3s represent in a transition?",
        },
        options: [
          {
            ar: "مدة الانتقال",
            en: "Duration",
          },
          {
            ar: "اللون",
            en: "Color",
          },
          {
            ar: "العرض",
            en: "Width",
          },
          {
            ar: "التأخير فقط",
            en: "Delay only",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تستخدم كثيرًا مع transition لإنشاء تأثيرات Hover؟",
          en: "Which CSS property is often combined with transition for hover effects?",
        },
        options: [
          {
            ar: "transform",
            en: "transform",
          },
          {
            ar: "database",
            en: "database",
          },
          {
            ar: "position-text",
            en: "position-text",
          },
          {
            ar: "html-change",
            en: "html-change",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-24",
    title: {
      ar: "Transforms",
      en: "Transforms",
    },
    description: {
      ar: "تعلم كيف تستخدم transform لتحريك العناصر وتكبيرها وتدويرها وميلها.",
      en: "Learn how transform moves, scales, rotates, and skews elements.",
    },
    example: {
      code: `.card:hover {
  transform: translateY(-5px) scale(1.02);
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي خاصية تستخدم للتحويلات؟",
          en: "Which property is used for transformations?",
        },
        options: [
          {
            ar: "transform",
            en: "transform",
          },
          {
            ar: "change",
            en: "change",
          },
          {
            ar: "motion",
            en: "motion",
          },
          {
            ar: "move-element",
            en: "move-element",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي دالة من Transform تستخدم لتحريك العنصر؟",
          en: "Which transform function moves an element?",
        },
        options: [
          {
            ar: "translate()",
            en: "translate()",
          },
          {
            ar: "move-css()",
            en: "move-css()",
          },
          {
            ar: "position()",
            en: "position()",
          },
          {
            ar: "shift-element()",
            en: "shift-element()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي دالة تغير حجم العنصر؟",
          en: "Which transform function changes an element's size?",
        },
        options: [
          {
            ar: "scale()",
            en: "scale()",
          },
          {
            ar: "size()",
            en: "size()",
          },
          {
            ar: "resize-css()",
            en: "resize-css()",
          },
          {
            ar: "zoom-element-only",
            en: "zoom-element-only",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-25",
    title: {
      ar: "Animations",
      en: "Animations",
    },
    description: {
      ar: "تعلم كيف تستخدم CSS Keyframes لإنشاء الحركات Animation.",
      en: "Learn how CSS keyframes create animations.",
    },
    example: {
      code: `@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.box {
  animation: fade 1s ease;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي قاعدة تحدد مراحل الـ Animation؟",
          en: "Which rule defines animation stages?",
        },
        options: [
          {
            ar: "@keyframes",
            en: "@keyframes",
          },
          {
            ar: "@animation",
            en: "@animation",
          },
          {
            ar: "@motion",
            en: "@motion",
          },
          {
            ar: "@frames-css",
            en: "@frames-css",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي خاصية تطبق Animation على العنصر؟",
          en: "Which property applies an animation to an element?",
        },
        options: [
          {
            ar: "animation",
            en: "animation",
          },
          {
            ar: "animate",
            en: "animate",
          },
          {
            ar: "keyframe",
            en: "keyframe",
          },
          {
            ar: "motion",
            en: "motion",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يعني opacity: 0؟",
          en: "What does opacity: 0 mean?",
        },
        options: [
          {
            ar: "العنصر شفاف بالكامل",
            en: "The element is fully transparent",
          },
          {
            ar: "العنصر ظاهر بالكامل",
            en: "The element is fully visible",
          },
          {
            ar: "العنصر يتم حذفه من HTML",
            en: "The element is removed from HTML",
          },
          {
            ar: "العنصر يصبح أكبر",
            en: "The element becomes larger",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-26",
    title: {
      ar: "متغيرات CSS",
      en: "CSS Variables",
    },
    description: {
      ar: "تعلم كيف تجعل المتغيرات المخصصة CSS أسهل في التنظيم والصيانة.",
      en: "Learn how custom properties make CSS easier to maintain.",
    },
    example: {
      code: `:root {
  --primary: #0f807a;
}

button {
  background: var(--primary);
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي صيغة تستخدم لإنشاء CSS Variable؟",
          en: "Which syntax creates a CSS variable?",
        },
        options: [
          {
            ar: "--variable-name",
            en: "--variable-name",
          },
          {
            ar: "$variable",
            en: "$variable",
          },
          {
            ar: "@variable",
            en: "@variable",
          },
          {
            ar: "#variable",
            en: "#variable",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي دالة تستخدم لقراءة قيمة CSS Variable؟",
          en: "Which function reads a CSS variable?",
        },
        options: [
          {
            ar: "var()",
            en: "var()",
          },
          {
            ar: "get()",
            en: "get()",
          },
          {
            ar: "css-var()",
            en: "css-var()",
          },
          {
            ar: "value()",
            en: "value()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يتم تعريف CSS Variables العامة غالبًا؟",
          en: "Where are global CSS variables commonly defined?",
        },
        options: [
          {
            ar: ":root",
            en: ":root",
          },
          {
            ar: ":global-css",
            en: ":global-css",
          },
          {
            ar: "body-root-only",
            en: "body-root-only",
          },
          {
            ar: "#variables",
            en: "#variables",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-27",
    title: {
      ar: "Specificity",
      en: "Specificity",
    },
    description: {
      ar: "افهم كيف يحدد CSS أي قاعدة لها الأولوية عند تعارض القواعد.",
      en: "Understand how CSS decides which rule has priority.",
    },
    example: {
      code: `p {
  color: blue;
}

.article p {
  color: #0f807a;
}`,
    },
    quiz: [
      {
        question: {
          ar: "ماذا تحدد Specificity؟",
          en: "What does specificity determine?",
        },
        options: [
          {
            ar: "أي قاعدة CSS لها الأولوية",
            en: "Which CSS rule has priority",
          },
          {
            ar: "عرض العنصر",
            en: "The element width",
          },
          {
            ar: "ارتفاع الصفحة",
            en: "The page height",
          },
          {
            ar: "نوع الخط",
            en: "The font family",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Selector يمتلك عادة Specificity أعلى؟",
          en: "Which usually has higher specificity?",
        },
        options: [
          {
            ar: "ID Selector",
            en: "ID selector",
          },
          {
            ar: "Element Selector",
            en: "Element selector",
          },
          {
            ar: "Universal Selector",
            en: "Universal selector",
          },
          {
            ar: "النص العادي",
            en: "Plain text",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Selector أكثر تحديدًا؟",
          en: "Which selector is more specific?",
        },
        options: [
          {
            ar: ".article p",
            en: ".article p",
          },
          {
            ar: "p",
            en: "p",
          },
          {
            ar: "*",
            en: "*",
          },
          {
            ar: "body",
            en: "body",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-28",
    title: {
      ar: "Media Queries",
      en: "Media Queries",
    },
    description: {
      ar: "تعلم كيف تطبق Media Queries تنسيقات مختلفة بناءً على ظروف الشاشة.",
      en: "Learn how media queries apply styles based on screen conditions.",
    },
    example: {
      code: `@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}`,
    },
    quiz: [
      {
        question: {
          ar: "فيما تستخدم Media Queries غالبًا؟",
          en: "What are media queries commonly used for?",
        },
        options: [
          {
            ar: "التصميم المتجاوب",
            en: "Responsive design",
          },
          {
            ar: "الاتصال بقواعد البيانات",
            en: "Database connections",
          },
          {
            ar: "بنية HTML",
            en: "HTML structure",
          },
          {
            ar: "تشغيل JavaScript",
            en: "JavaScript execution",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي كلمة تبدأ بها Media Query؟",
          en: "Which keyword starts a media query?",
        },
        options: [
          {
            ar: "@media",
            en: "@media",
          },
          {
            ar: "@screen",
            en: "@screen",
          },
          {
            ar: "@responsive",
            en: "@responsive",
          },
          {
            ar: "@device",
            en: "@device",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدد max-width؟",
          en: "What does max-width define?",
        },
        options: [
          {
            ar: "شرطًا لأقصى عرض للـ viewport",
            en: "A maximum viewport width condition",
          },
          {
            ar: "أقصى حجم للخط",
            en: "The maximum font size",
          },
          {
            ar: "أقصى ارتفاع لكل العناصر",
            en: "The maximum height of every element",
          },
          {
            ar: "أقصى طول للصفحة",
            en: "The maximum page length",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-29",
    title: {
      ar: "المحددات المتقدمة",
      en: "Advanced Selectors",
    },
    description: {
      ar: "تعلم المحددات المتقدمة مثل Child وSibling وAttribute وDescendant Selectors.",
      en: "Learn powerful selectors such as child, sibling, attribute, and descendant selectors.",
    },
    example: {
      code: `nav > a {
  color: #0b5d91;
}

input[type="text"] {
  border-color: #0f807a;
}`,
    },
    quiz: [
      {
        question: {
          ar: "أي Selector يستهدف العناصر الأبناء المباشرة؟",
          en: "Which selector targets direct children?",
        },
        options: [
          {
            ar: ">",
            en: ">",
          },
          {
            ar: "+",
            en: "+",
          },
          {
            ar: "~",
            en: "~",
          },
          {
            ar: "*",
            en: "*",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Selector يستهدف عنصرًا بناءً على Attribute؟",
          en: "Which selector targets an element based on an attribute?",
        },
        options: [
          {
            ar: "[attribute]",
            en: "[attribute]",
          },
          {
            ar: ".attribute",
            en: ".attribute",
          },
          {
            ar: "#attribute",
            en: "#attribute",
          },
          {
            ar: ":attribute",
            en: ":attribute",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدد الـ + Combinator؟",
          en: "What does the + combinator select?",
        },
        options: [
          {
            ar: "العنصر الشقيق المباشر التالي",
            en: "The adjacent sibling",
          },
          {
            ar: "كل العناصر الأبناء",
            en: "All children",
          },
          {
            ar: "العنصر الأب",
            en: "The parent",
          },
          {
            ar: "كل العناصر",
            en: "Every element",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "css-30",
    title: {
      ar: "أفضل ممارسات CSS",
      en: "CSS Best Practices",
    },
    description: {
      ar: "تعلم كيفية تنظيم CSS وكتابته بطريقة أنظف وأسهل في الصيانة.",
      en: "Learn how to organize, maintain, and write cleaner CSS.",
    },
    example: {
      code: `:root {
  --primary: #0f807a;
}

.button {
  background: var(--primary);
  border-radius: 10px;
}`,
    },
    quiz: [
      {
        question: {
          ar: "لماذا يجب تنظيم CSS؟",
          en: "Why should CSS be organized?",
        },
        options: [
          {
            ar: "لجعل الكود أسهل في الصيانة والتعديل",
            en: "To make code easier to maintain",
          },
          {
            ar: "لجعل HTML غير ضروري",
            en: "To make HTML unnecessary",
          },
          {
            ar: "لإزالة JavaScript",
            en: "To remove JavaScript",
          },
          {
            ar: "لإيقاف CSS عن العمل",
            en: "To make CSS stop working",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي تقنية تساعد على تجنب تكرار نفس قيمة اللون؟",
          en: "Which technique helps avoid repeating the same color value?",
        },
        options: [
          {
            ar: "CSS Variables",
            en: "CSS Variables",
          },
          {
            ar: "إضافة HTML إضافي",
            en: "Extra HTML",
          },
          {
            ar: "استخدام IDs أكثر",
            en: "More IDs",
          },
          {
            ar: "JavaScript داخل السطر",
            en: "Inline JavaScript",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما أحد أهداف كتابة CSS بشكل نظيف؟",
          en: "What is one goal of clean CSS?",
        },
        options: [
          {
            ar: "سهولة الصيانة وقراءة الكود",
            en: "Easy maintenance and readability",
          },
          {
            ar: "إزالة كل الـSelectors",
            en: "Removing all selectors",
          },
          {
            ar: "استبدال HTML",
            en: "Replacing HTML",
          },
          {
            ar: "تجنب التصميم المتجاوب بالكامل",
            en: "Avoiding all responsive design",
          },
        ],
        correct: 0,
      },
    ],
  },
];
