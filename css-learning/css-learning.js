/* =========================================================
   FAYAD — CSS LEARNING ENGINE
   30 LESSONS × 3 QUESTIONS
   English / Arabic
========================================================= */

/* =========================================================
   1. LESSON DATA
========================================================= */

const lessons = [
  /* =======================================================
     LESSON 01
  ======================================================= */

  {
    title: "Introduction to CSS",
    titleAr: "مقدمة إلى CSS",

    description: "Learn what CSS is, why we use it, and how it controls the appearance of HTML elements.",

    descriptionAr: "تعرف على ماهية CSS ولماذا نستخدمه وكيف يتحكم في مظهر عناصر HTML.",

    code: `h1 {
  color: #0f807a;
  font-size: 40px;
}

p {
  color: #536777;
}`,

    questions: [
      {
        question: "What is CSS mainly used for?",
        questionAr: "فيما يُستخدم CSS بشكل أساسي؟",

        answers: [
          "Styling the appearance of web pages",
          "Creating database tables",
          "Running server-side code",
          "Creating HTML structure",
        ],

        answersAr: [
          "تنسيق وتجميل مظهر صفحات الويب",
          "إنشاء جداول قواعد البيانات",
          "تشغيل الأكواد على الخادم",
          "إنشاء هيكل HTML",
        ],

        correct: 0,
      },

      {
        question: "What does CSS stand for?",
        questionAr: "ماذا تعني CSS؟",

        answers: ["Cascading Style Sheets", "Computer Style System", "Creative Styling System", "Coded Style Syntax"],

        answersAr: ["Cascading Style Sheets", "Computer Style System", "Creative Styling System", "Coded Style Syntax"],

        correct: 0,
      },

      {
        question: "Which technology provides the structure of a webpage?",
        questionAr: "أي تقنية توفر الهيكل الأساسي لصفحة الويب؟",

        answers: ["HTML", "CSS", "JavaScript", "SQL"],

        answersAr: ["HTML", "CSS", "JavaScript", "SQL"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 02
  ======================================================= */

  {
    title: "CSS Syntax",
    titleAr: "صيغة كتابة CSS",

    description: "Learn the basic structure of a CSS rule and understand selectors, properties, and values.",

    descriptionAr: "تعلم البنية الأساسية لقاعدة CSS وافهم المحددات والخصائص والقيم.",

    code: `h1 {
  color: blue;
  font-size: 40px;
}`,

    questions: [
      {
        question: "Which part selects the HTML element?",
        questionAr: "أي جزء يحدد عنصر HTML الذي نريد تنسيقه؟",

        answers: ["Selector", "Value", "Property", "Declaration"],

        answersAr: ["Selector — المحدد", "Value — القيمة", "Property — الخاصية", "Declaration — التصريح"],

        correct: 0,
      },

      {
        question: "Which part defines what style is changed?",
        questionAr: "أي جزء يحدد نوع التنسيق الذي سيتم تغييره؟",

        answers: ["Property", "Selector", "HTML", "Comment"],

        answersAr: ["Property — الخاصية", "Selector — المحدد", "HTML", "Comment — التعليق"],

        correct: 0,
      },

      {
        question: "In color: blue, what is blue?",
        questionAr: "في color: blue، ماذا تمثل blue؟",

        answers: ["Value", "Selector", "Property", "Element"],

        answersAr: ["Value — القيمة", "Selector — المحدد", "Property — الخاصية", "Element — العنصر"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 03
  ======================================================= */

  {
    title: "Selectors",
    titleAr: "المحددات Selectors",

    description: "Learn how CSS selectors target HTML elements.",

    descriptionAr: "تعلم كيف تستخدم محددات CSS لاستهداف عناصر HTML.",

    code: `p {
  color: #0b5d91;
}

.title {
  color: #0f807a;
}`,

    questions: [
      {
        question: "What does a selector do?",
        questionAr: "ماذا يفعل الـ Selector؟",

        answers: ["Selects elements to style", "Creates HTML elements", "Runs JavaScript", "Creates a database"],

        answersAr: ["يحدد العناصر التي نريد تنسيقها", "ينشئ عناصر HTML", "يشغل JavaScript", "ينشئ قاعدة بيانات"],

        correct: 0,
      },

      {
        question: "Which selector targets a class named title?",
        questionAr: "أي Selector يستهدف Class باسم title؟",

        answers: [".title", "#title", "title()", "class-title"],

        answersAr: [".title", "#title", "title()", "class-title"],

        correct: 0,
      },

      {
        question: "What does the p selector target?",
        questionAr: "ماذا يستهدف الـ p Selector؟",

        answers: ["Paragraph elements", "Elements with an ID", "Elements with a class", "Images"],

        answersAr: ["عناصر الفقرات Paragraph", "العناصر التي لها ID", "العناصر التي لها Class", "الصور"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 04
  ======================================================= */

  {
    title: "Colors",
    titleAr: "الألوان",

    description: "Learn how to use named colors, HEX, RGB, and other color formats.",

    descriptionAr: "تعلم كيفية استخدام أسماء الألوان وHEX وRGB وغيرها من طرق تحديد الألوان.",

    code: `h1 {
  color: #0b5d91;
}

p {
  color: rgb(15, 128, 122);
}`,

    questions: [
      {
        question: "Which property changes text color?",
        questionAr: "أي خاصية تغير لون النص؟",

        answers: ["color", "background", "font", "text"],

        answersAr: ["color", "background", "font", "text"],

        correct: 0,
      },

      {
        question: "What type of color value is #0b5d91?",
        questionAr: "ما نوع قيمة اللون #0b5d91؟",

        answers: ["HEX", "RGB", "HSL", "Keyword"],

        answersAr: ["HEX", "RGB", "HSL", "Keyword"],

        correct: 0,
      },

      {
        question: "Which function represents an RGB color?",
        questionAr: "أي دالة تستخدم لكتابة لون بصيغة RGB؟",

        answers: ["rgb()", "color()", "hex()", "paint()"],

        answersAr: ["rgb()", "color()", "hex()", "paint()"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 05
  ======================================================= */

  {
    title: "Backgrounds",
    titleAr: "الخلفيات",

    description: "Learn how to control background colors and images.",

    descriptionAr: "تعلم كيفية التحكم في ألوان وصور خلفيات العناصر.",

    code: `body {
  background-color: #eaf3f8;
}

.card {
  background: white;
}`,

    questions: [
      {
        question: "Which property changes an element's background color?",
        questionAr: "أي خاصية تغير لون خلفية العنصر؟",

        answers: ["background-color", "color", "border-color", "background-text"],

        answersAr: ["background-color", "color", "border-color", "background-text"],

        correct: 0,
      },

      {
        question: "Which shorthand property can control background styles?",
        questionAr: "أي خاصية مختصرة يمكنها التحكم في إعدادات الخلفية؟",

        answers: ["background", "back", "bg-style", "background-style-only"],

        answersAr: ["background", "back", "bg-style", "background-style-only"],

        correct: 0,
      },

      {
        question: "Which property is used for a background image?",
        questionAr: "أي خاصية تستخدم لإضافة صورة للخلفية؟",

        answers: ["background-image", "image-background", "background-picture", "image"],

        answersAr: ["background-image", "image-background", "background-picture", "image"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 06
  ======================================================= */

  {
    title: "Borders",
    titleAr: "الحدود Borders",

    description: "Learn how to create borders around HTML elements.",

    descriptionAr: "تعلم كيفية إنشاء حدود حول عناصر HTML.",

    code: `.card {
  border: 2px solid #0f807a;
  border-radius: 12px;
}`,

    questions: [
      {
        question: "Which property creates a border?",
        questionAr: "أي خاصية تنشئ Border حول العنصر؟",

        answers: ["border", "outline-text", "edge", "frame"],

        answersAr: ["border", "outline-text", "edge", "frame"],

        correct: 0,
      },

      {
        question: "Which property creates rounded corners?",
        questionAr: "أي خاصية تجعل زوايا العنصر مستديرة؟",

        answers: ["border-radius", "corner", "radius-border", "round"],

        answersAr: ["border-radius", "corner", "radius-border", "round"],

        correct: 0,
      },

      {
        question: "What does 2px represent in border: 2px solid?",
        questionAr: "ماذا تمثل 2px في border: 2px solid؟",

        answers: ["Border width", "Border color", "Border radius", "Element height"],

        answersAr: ["سمك الـ Border", "لون الـ Border", "استدارة الـ Border", "ارتفاع العنصر"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 07
  ======================================================= */

  {
    title: "Width & Height",
    titleAr: "العرض والارتفاع",

    description: "Learn how to control the width and height of elements.",

    descriptionAr: "تعلم كيفية التحكم في عرض وارتفاع العناصر.",

    code: `.box {
  width: 300px;
  height: 150px;
  background: #0b5d91;
}`,

    questions: [
      {
        question: "Which property controls an element's width?",
        questionAr: "أي خاصية تتحكم في عرض العنصر؟",

        answers: ["width", "size", "element-width", "horizontal-size"],

        answersAr: ["width", "size", "element-width", "horizontal-size"],

        correct: 0,
      },

      {
        question: "Which property controls an element's height?",
        questionAr: "أي خاصية تتحكم في ارتفاع العنصر؟",

        answers: ["height", "size-height", "element-height-value", "vertical"],

        answersAr: ["height", "size-height", "element-height-value", "vertical"],

        correct: 0,
      },

      {
        question: "What unit is used in 300px?",
        questionAr: "ما الوحدة المستخدمة في 300px؟",

        answers: ["px", "em", "percent", "rem-only"],

        answersAr: ["px", "em", "percent", "rem-only"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 08
  ======================================================= */

  {
    title: "Margin",
    titleAr: "الهامش Margin",

    description: "Learn how margin creates space outside an element.",

    descriptionAr: "تعلم كيف ينشئ Margin مساحة خارج العنصر.",

    code: `.box {
  margin: 30px;
  background: #0f807a;
}`,

    questions: [
      {
        question: "Where does margin create space?",
        questionAr: "أين ينشئ الـ Margin المساحة؟",

        answers: ["Outside the element", "Inside the element", "Inside the text", "Inside the border"],

        answersAr: ["خارج العنصر", "داخل العنصر", "داخل النص", "داخل الـ Border"],

        correct: 0,
      },

      {
        question: "Which property controls the space outside an element?",
        questionAr: "أي خاصية تتحكم في المساحة خارج العنصر؟",

        answers: ["margin", "padding", "spacing", "outside"],

        answersAr: ["margin", "padding", "spacing", "outside"],

        correct: 0,
      },

      {
        question: "What does margin: 30px apply?",
        questionAr: "ماذا يعني margin: 30px؟",

        answers: ["30px outside the element", "30px inside the content", "30px border", "30px font size"],

        answersAr: ["مساحة 30px خارج العنصر", "مساحة 30px داخل المحتوى", "Border بحجم 30px", "حجم خط 30px"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 09
  ======================================================= */

  {
    title: "Padding",
    titleAr: "الحشو Padding",

    description: "Learn how padding creates space inside an element.",

    descriptionAr: "تعلم كيف ينشئ Padding مساحة داخل العنصر.",

    code: `.box {
  padding: 30px;
  background: #eaf3f8;
}`,

    questions: [
      {
        question: "Where does padding create space?",
        questionAr: "أين ينشئ الـ Padding المساحة؟",

        answers: ["Inside the element", "Outside the element", "Outside the page", "Inside the margin"],

        answersAr: ["داخل العنصر", "خارج العنصر", "خارج الصفحة", "داخل الـ Margin"],

        correct: 0,
      },

      {
        question: "Which property controls space between content and border?",
        questionAr: "أي خاصية تتحكم في المسافة بين المحتوى والـ Border؟",

        answers: ["padding", "margin", "gap-outside", "content-space"],

        answersAr: ["padding", "margin", "gap-outside", "content-space"],

        correct: 0,
      },

      {
        question: "What does padding: 20px add?",
        questionAr: "ماذا يضيف padding: 20px؟",

        answers: ["20px of inner space", "20px of outer space", "20px border", "20px height only"],

        answersAr: [
          "مساحة داخلية مقدارها 20px",
          "مساحة خارجية مقدارها 20px",
          "Border بحجم 20px",
          "ارتفاع فقط بمقدار 20px",
        ],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 10
  ======================================================= */

  {
    title: "Box Model",
    titleAr: "نموذج الصندوق Box Model",

    description: "Understand content, padding, border, and margin.",

    descriptionAr: "افهم أجزاء نموذج الصندوق: المحتوى والـ Padding والـ Border والـ Margin.",

    code: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid #0f807a;
  margin: 20px;
}`,

    questions: [
      {
        question: "Which four parts make up the CSS box model?",
        questionAr: "ما الأجزاء الأربعة التي يتكون منها CSS Box Model؟",

        answers: [
          "Content, padding, border, margin",
          "Text, image, button, link",
          "Header, main, footer, nav",
          "Width, height, color, font",
        ],

        answersAr: [
          "المحتوى، Padding، Border، Margin",
          "النص، الصورة، الزر، الرابط",
          "Header، Main، Footer، Nav",
          "العرض، الارتفاع، اللون، الخط",
        ],

        correct: 0,
      },

      {
        question: "Which part is closest to the actual content?",
        questionAr: "أي جزء يكون الأقرب إلى المحتوى نفسه؟",

        answers: ["Content", "Margin", "Border", "Outer spacing"],

        answersAr: ["Content — المحتوى", "Margin", "Border", "المساحة الخارجية"],

        correct: 0,
      },

      {
        question: "Which part creates space outside the border?",
        questionAr: "أي جزء ينشئ مساحة خارج الـ Border؟",

        answers: ["Margin", "Padding", "Content", "Width"],

        answersAr: ["Margin", "Padding", "Content", "Width"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 11
  ======================================================= */

  {
    title: "Box Sizing",
    titleAr: "حساب حجم الصندوق Box Sizing",

    description: "Learn how box-sizing changes how width and height are calculated.",

    descriptionAr: "تعلم كيف تغير خاصية box-sizing طريقة حساب العرض والارتفاع.",

    code: `* {
  box-sizing: border-box;
}

.box {
  width: 300px;
  padding: 30px;
}`,

    questions: [
      {
        question: "What does border-box include?",
        questionAr: "ماذا يتضمن border-box؟",

        answers: [
          "Padding and border inside the declared size",
          "Only the content",
          "Only the margin",
          "Only the padding",
        ],

        answersAr: ["الـ Padding والـ Border داخل الحجم المحدد", "المحتوى فقط", "الـ Margin فقط", "الـ Padding فقط"],

        correct: 0,
      },

      {
        question: "Which property controls box sizing behavior?",
        questionAr: "أي خاصية تتحكم في طريقة حساب حجم الصندوق؟",

        answers: ["box-sizing", "box-size", "size-model", "element-sizing"],

        answersAr: ["box-sizing", "box-size", "size-model", "element-sizing"],

        correct: 0,
      },

      {
        question: "Which value is commonly used to make sizing easier to control?",
        questionAr: "أي قيمة تستخدم غالبًا لتسهيل التحكم في أحجام العناصر؟",

        answers: ["border-box", "content-only", "margin-box", "size-box"],

        answersAr: ["border-box", "content-only", "margin-box", "size-box"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 12
  ======================================================= */

  {
    title: "Text Styling",
    titleAr: "تنسيق النصوص",

    description: "Learn how to control text color, decoration, spacing, and appearance.",

    descriptionAr: "تعلم كيفية التحكم في لون النص وتزيينه والمسافات والمظهر.",

    code: `p {
  color: #0b5d91;
  text-decoration: underline;
  letter-spacing: 1px;
}`,

    questions: [
      {
        question: "Which property adds an underline?",
        questionAr: "أي خاصية تضيف خطًا أسفل النص؟",

        answers: ["text-decoration", "text-style", "underline-text", "font-line"],

        answersAr: ["text-decoration", "text-style", "underline-text", "font-line"],

        correct: 0,
      },

      {
        question: "Which property controls spacing between letters?",
        questionAr: "أي خاصية تتحكم في المسافة بين الحروف؟",

        answers: ["letter-spacing", "word-spacing-only", "text-gap", "font-spacing"],

        answersAr: ["letter-spacing", "word-spacing-only", "text-gap", "font-spacing"],

        correct: 0,
      },

      {
        question: "Which property changes the text color?",
        questionAr: "أي خاصية تغير لون النص؟",

        answers: ["color", "text-color-property", "font-color-only", "paint"],

        answersAr: ["color", "text-color-property", "font-color-only", "paint"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 13
  ======================================================= */

  {
    title: "Fonts",
    titleAr: "الخطوط Fonts",

    description: "Learn how to control font family, size, weight, and style.",

    descriptionAr: "تعلم كيفية التحكم في نوع الخط وحجمه ووزنه وشكله.",

    code: `h1 {
  font-family: Arial, sans-serif;
  font-size: 42px;
  font-weight: 700;
}`,

    questions: [
      {
        question: "Which property controls the font family?",
        questionAr: "أي خاصية تتحكم في نوع الخط؟",

        answers: ["font-family", "font-type", "font-name", "typeface"],

        answersAr: ["font-family", "font-type", "font-name", "typeface"],

        correct: 0,
      },

      {
        question: "Which property controls font size?",
        questionAr: "أي خاصية تتحكم في حجم الخط؟",

        answers: ["font-size", "text-size", "font-scale", "size-font"],

        answersAr: ["font-size", "text-size", "font-scale", "size-font"],

        correct: 0,
      },

      {
        question: "What does font-weight control?",
        questionAr: "ماذا تتحكم font-weight؟",

        answers: ["Font thickness", "Font color", "Font family", "Line spacing"],

        answersAr: ["سمك الخط", "لون الخط", "نوع الخط", "المسافة بين الأسطر"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 14
  ======================================================= */

  {
    title: "Line Height",
    titleAr: "ارتفاع السطر Line Height",

    description: "Learn how line-height controls vertical spacing between lines of text.",

    descriptionAr: "تعلم كيف يتحكم line-height في المسافة الرأسية بين أسطر النص.",

    code: `p {
  line-height: 1.8;
}`,

    questions: [
      {
        question: "What does line-height control?",
        questionAr: "ماذا يتحكم line-height؟",

        answers: ["Vertical space between lines", "Text color", "Element width", "Font family"],

        answersAr: ["المسافة الرأسية بين الأسطر", "لون النص", "عرض العنصر", "نوع الخط"],

        correct: 0,
      },

      {
        question: "Which property changes the space between text lines?",
        questionAr: "أي خاصية تغير المسافة بين أسطر النص؟",

        answers: ["line-height", "line-spacing-css", "text-height", "paragraph-gap"],

        answersAr: ["line-height", "line-spacing-css", "text-height", "paragraph-gap"],

        correct: 0,
      },

      {
        question: "Does line-height mainly control horizontal or vertical spacing?",
        questionAr: "هل يتحكم line-height بشكل أساسي في مسافة أفقية أم رأسية؟",

        answers: ["Vertical", "Horizontal", "Diagonal", "None"],

        answersAr: ["رأسية", "أفقية", "مائلة", "لا يتحكم في المسافات"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 15
  ======================================================= */

  {
    title: "Text Alignment",
    titleAr: "محاذاة النص",

    description: "Learn how to align text horizontally.",

    descriptionAr: "تعلم كيفية محاذاة النص أفقيًا.",

    code: `.title {
  text-align: center;
}`,

    questions: [
      {
        question: "Which value centers text?",
        questionAr: "أي قيمة تجعل النص في المنتصف؟",

        answers: ["center", "middle", "horizontal", "central"],

        answersAr: ["center", "middle", "horizontal", "central"],

        correct: 0,
      },

      {
        question: "Which property controls horizontal text alignment?",
        questionAr: "أي خاصية تتحكم في محاذاة النص أفقيًا؟",

        answers: ["text-align", "text-position", "align-text-property", "horizontal-text"],

        answersAr: ["text-align", "text-position", "align-text-property", "horizontal-text"],

        correct: 0,
      },

      {
        question: "Which value aligns text to the right?",
        questionAr: "أي قيمة تجعل النص بمحاذاة اليمين؟",

        answers: ["right", "end-text-only", "east", "right-align-property"],

        answersAr: ["right", "end-text-only", "east", "right-align-property"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 16
  ======================================================= */

  {
    title: "Display",
    titleAr: "Display",

    description: "Learn how display controls the layout behavior of elements.",

    descriptionAr: "تعلم كيف تتحكم خاصية display في طريقة ظهور وترتيب العناصر.",

    code: `.box {
  display: inline-block;
}`,

    questions: [
      {
        question: "Which property controls an element's display behavior?",
        questionAr: "أي خاصية تتحكم في طريقة عرض العنصر؟",

        answers: ["display", "layout", "element-type", "show"],

        answersAr: ["display", "layout", "element-type", "show"],

        correct: 0,
      },

      {
        question: "Which display value makes an element behave inline while accepting width and height?",
        questionAr: "أي قيمة تجعل العنصر يتصرف كـ inline مع إمكانية تحديد العرض والارتفاع؟",

        answers: ["inline-block", "inline-only", "block-inline", "flex-inline"],

        answersAr: ["inline-block", "inline-only", "block-inline", "flex-inline"],

        correct: 0,
      },

      {
        question: "Which display value creates a block-level element?",
        questionAr: "أي قيمة تجعل العنصر Block-level؟",

        answers: ["block", "section", "box", "full-block"],

        answersAr: ["block", "section", "box", "full-block"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 17
  ======================================================= */

  {
    title: "Position",
    titleAr: "Position",

    description: "Learn how relative, absolute, fixed, and sticky positioning work.",

    descriptionAr: "تعلم كيفية عمل relative وabsolute وfixed وsticky.",

    code: `.box {
  position: relative;
  top: 20px;
}`,

    questions: [
      {
        question: "Which property controls positioning?",
        questionAr: "أي خاصية تتحكم في موضع العنصر؟",

        answers: ["position", "place", "location", "element-positioning"],

        answersAr: ["position", "place", "location", "element-positioning"],

        correct: 0,
      },

      {
        question: "Which position value keeps an element attached to the viewport?",
        questionAr: "أي قيمة تجعل العنصر مرتبطًا بالـ viewport؟",

        answers: ["fixed", "absolute", "relative", "static"],

        answersAr: ["fixed", "absolute", "relative", "static"],

        correct: 0,
      },

      {
        question: "Which value is commonly used as a reference point for absolutely positioned children?",
        questionAr: "أي قيمة تستخدم غالبًا كنقطة مرجعية لعناصر absolute الداخلية؟",

        answers: ["relative", "static", "fixed", "normal"],

        answersAr: ["relative", "static", "fixed", "normal"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 18
  ======================================================= */

  {
    title: "Flexbox",
    titleAr: "Flexbox",

    description: "Learn how Flexbox helps you create flexible one-dimensional layouts.",

    descriptionAr: "تعلم كيف يساعدك Flexbox على إنشاء تخطيطات مرنة أحادية الاتجاه.",

    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,

    questions: [
      {
        question: "Which property enables Flexbox?",
        questionAr: "أي خاصية تقوم بتفعيل Flexbox؟",

        answers: ["display: flex", "flex: true", "layout: flex", "enable-flex"],

        answersAr: ["display: flex", "flex: true", "layout: flex", "enable-flex"],

        correct: 0,
      },

      {
        question: "Which property controls alignment along the main axis?",
        questionAr: "أي خاصية تتحكم في المحاذاة على الـ Main Axis؟",

        answers: ["justify-content", "align-main", "flex-position", "main-align"],

        answersAr: ["justify-content", "align-main", "flex-position", "main-align"],

        correct: 0,
      },

      {
        question: "Which property controls alignment on the cross axis?",
        questionAr: "أي خاصية تتحكم في المحاذاة على الـ Cross Axis؟",

        answers: ["align-items", "cross-content", "flex-cross", "align-main"],

        answersAr: ["align-items", "cross-content", "flex-cross", "align-main"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 19
  ======================================================= */

  {
    title: "CSS Grid",
    titleAr: "CSS Grid",

    description: "Learn how CSS Grid creates powerful two-dimensional layouts.",

    descriptionAr: "تعلم كيف ينشئ CSS Grid تخطيطات قوية ثنائية الاتجاه.",

    code: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`,

    questions: [
      {
        question: "Which property enables CSS Grid?",
        questionAr: "أي خاصية تقوم بتفعيل CSS Grid؟",

        answers: ["display: grid", "grid: true", "layout: grid", "enable-grid"],

        answersAr: ["display: grid", "grid: true", "layout: grid", "enable-grid"],

        correct: 0,
      },

      {
        question: "Which property defines grid columns?",
        questionAr: "أي خاصية تحدد أعمدة الـ Grid؟",

        answers: ["grid-template-columns", "grid-columns-only", "columns-grid", "grid-layout-columns"],

        answersAr: ["grid-template-columns", "grid-columns-only", "columns-grid", "grid-layout-columns"],

        correct: 0,
      },

      {
        question: "What does gap control in a grid?",
        questionAr: "ماذا تتحكم gap في الـ Grid؟",

        answers: ["Space between grid items", "Grid color", "Column width only", "Element height"],

        answersAr: ["المسافة بين عناصر الـ Grid", "لون الـ Grid", "عرض الأعمدة فقط", "ارتفاع العنصر"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 20
  ======================================================= */

  {
    title: "Responsive Design",
    titleAr: "التصميم المتجاوب",

    description: "Learn how CSS adapts websites to different screen sizes.",

    descriptionAr: "تعلم كيف يجعل CSS المواقع تتكيف مع أحجام الشاشات المختلفة.",

    code: `@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
  }
}`,

    questions: [
      {
        question: "What is responsive design?",
        questionAr: "ما هو Responsive Design؟",

        answers: [
          "Design that adapts to different screen sizes",
          "Design only for phones",
          "Design without CSS",
          "Design only for desktop",
        ],

        answersAr: [
          "تصميم يتكيف مع أحجام الشاشات المختلفة",
          "تصميم للهواتف فقط",
          "تصميم بدون CSS",
          "تصميم لأجهزة الكمبيوتر فقط",
        ],

        correct: 0,
      },

      {
        question: "Which CSS feature is commonly used for responsive breakpoints?",
        questionAr: "أي ميزة في CSS تستخدم غالبًا لتحديد Breakpoints؟",

        answers: ["Media Queries", "Animations", "Variables", "Borders"],

        answersAr: ["Media Queries", "Animations", "Variables", "Borders"],

        correct: 0,
      },

      {
        question: "What does max-width: 600px mean in a media query?",
        questionAr: "ماذا يعني max-width: 600px داخل Media Query؟",

        answers: [
          "Apply styles when the viewport is 600px or narrower",
          "Make the page exactly 600px",
          "Make every element 600px wide",
          "Set the minimum screen width to 600px",
        ],

        answersAr: [
          "تطبيق التنسيقات عندما يكون عرض الشاشة 600px أو أقل",
          "جعل الصفحة بعرض 600px بالضبط",
          "جعل كل عنصر بعرض 600px",
          "تحديد أقل عرض للشاشة إلى 600px",
        ],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 21
  ======================================================= */

  {
    title: "Pseudo-classes",
    titleAr: "Pseudo-classes",

    description: "Learn how pseudo-classes style elements in specific states.",

    descriptionAr: "تعلم كيف تستخدم Pseudo-classes لتنسيق العناصر في حالات معينة.",

    code: `button:hover {
  background: #0f807a;
}`,

    questions: [
      {
        question: "What does :hover represent?",
        questionAr: "ماذا يمثل :hover؟",

        answers: [
          "An element when the mouse is over it",
          "An element after clicking",
          "An element when hidden",
          "An element before loading",
        ],

        answersAr: [
          "العنصر عندما يكون مؤشر الماوس فوقه",
          "العنصر بعد الضغط عليه",
          "العنصر عندما يكون مخفيًا",
          "العنصر قبل تحميله",
        ],

        correct: 0,
      },

      {
        question: "Which of these is a pseudo-class?",
        questionAr: "أي مما يلي يعتبر Pseudo-class؟",

        answers: [":hover", "::after", ".hover-element", "#hover"],

        answersAr: [":hover", "::after", ".hover-element", "#hover"],

        correct: 0,
      },

      {
        question: "Do pseudo-classes usually describe an element's state or part?",
        questionAr: "هل تصف Pseudo-classes عادة حالة العنصر أم جزءًا منه؟",

        answers: ["State", "HTML structure", "Database state", "File type"],

        answersAr: ["حالة العنصر", "هيكل HTML", "حالة قاعدة البيانات", "نوع الملف"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 22
  ======================================================= */

  {
    title: "Pseudo-elements",
    titleAr: "Pseudo-elements",

    description: "Learn how pseudo-elements style specific parts of elements.",

    descriptionAr: "تعلم كيف تستخدم Pseudo-elements لتنسيق أجزاء محددة من العناصر.",

    code: `h1::after {
  content: "";
  display: block;
  height: 3px;
  background: #0f807a;
}`,

    questions: [
      {
        question: "Which syntax represents a pseudo-element?",
        questionAr: "أي صيغة تمثل Pseudo-element؟",

        answers: ["::after", ":after-element", "pseudo-after", ".after"],

        answersAr: ["::after", ":after-element", "pseudo-after", ".after"],

        correct: 0,
      },

      {
        question: "Which property is commonly required to generate content with ::before or ::after?",
        questionAr: "أي خاصية تستخدم عادة مع ::before أو ::after لإنشاء المحتوى؟",

        answers: ["content", "generate", "pseudo-content", "create"],

        answersAr: ["content", "generate", "pseudo-content", "create"],

        correct: 0,
      },

      {
        question: "What do pseudo-elements target?",
        questionAr: "ماذا تستهدف Pseudo-elements؟",

        answers: ["Specific parts of an element", "Only entire pages", "Database records", "JavaScript functions"],

        answersAr: ["أجزاء محددة من العنصر", "الصفحات بالكامل فقط", "سجلات قواعد البيانات", "دوال JavaScript"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 23
  ======================================================= */

  {
    title: "Transitions",
    titleAr: "Transitions",

    description: "Learn how CSS transitions create smooth changes between states.",

    descriptionAr: "تعلم كيف تجعل Transitions التغييرات بين الحالات أكثر سلاسة.",

    code: `button {
  transition: 0.3s ease;
}

button:hover {
  transform: translateY(-3px);
}`,

    questions: [
      {
        question: "What does transition do?",
        questionAr: "ماذا تفعل transition؟",

        answers: ["Creates smooth changes", "Creates HTML", "Deletes an element", "Creates database tables"],

        answersAr: ["تنشئ تغييرات وانتقالات سلسة", "تنشئ HTML", "تحذف عنصرًا", "تنشئ جداول قواعد البيانات"],

        correct: 0,
      },

      {
        question: "What does 0.3s represent in a transition?",
        questionAr: "ماذا تمثل 0.3s في transition؟",

        answers: ["Duration", "Color", "Width", "Delay only"],

        answersAr: ["مدة الانتقال", "اللون", "العرض", "التأخير فقط"],

        correct: 0,
      },

      {
        question: "Which CSS property is often combined with transition for hover effects?",
        questionAr: "أي خاصية تستخدم كثيرًا مع transition لإنشاء تأثيرات Hover؟",

        answers: ["transform", "database", "position-text", "html-change"],

        answersAr: ["transform", "database", "position-text", "html-change"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 24
  ======================================================= */

  {
    title: "Transforms",
    titleAr: "Transforms",

    description: "Learn how transform moves, scales, rotates, and skews elements.",

    descriptionAr: "تعلم كيف تستخدم transform لتحريك العناصر وتكبيرها وتدويرها وميلها.",

    code: `.card:hover {
  transform: translateY(-5px) scale(1.02);
}`,

    questions: [
      {
        question: "Which property is used for transformations?",
        questionAr: "أي خاصية تستخدم للتحويلات؟",

        answers: ["transform", "change", "motion", "move-element"],

        answersAr: ["transform", "change", "motion", "move-element"],

        correct: 0,
      },

      {
        question: "Which transform function moves an element?",
        questionAr: "أي دالة من Transform تستخدم لتحريك العنصر؟",

        answers: ["translate()", "move-css()", "position()", "shift-element()"],

        answersAr: ["translate()", "move-css()", "position()", "shift-element()"],

        correct: 0,
      },

      {
        question: "Which transform function changes an element's size?",
        questionAr: "أي دالة تغير حجم العنصر؟",

        answers: ["scale()", "size()", "resize-css()", "zoom-element-only"],

        answersAr: ["scale()", "size()", "resize-css()", "zoom-element-only"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 25
  ======================================================= */

  {
    title: "Animations",
    titleAr: "Animations",

    description: "Learn how CSS keyframes create animations.",

    descriptionAr: "تعلم كيف تستخدم CSS Keyframes لإنشاء الحركات Animation.",

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

    questions: [
      {
        question: "Which rule defines animation stages?",
        questionAr: "أي قاعدة تحدد مراحل الـ Animation؟",

        answers: ["@keyframes", "@animation", "@motion", "@frames-css"],

        answersAr: ["@keyframes", "@animation", "@motion", "@frames-css"],

        correct: 0,
      },

      {
        question: "Which property applies an animation to an element?",
        questionAr: "أي خاصية تطبق Animation على العنصر؟",

        answers: ["animation", "animate", "keyframe", "motion"],

        answersAr: ["animation", "animate", "keyframe", "motion"],

        correct: 0,
      },

      {
        question: "What does opacity: 0 mean?",
        questionAr: "ماذا يعني opacity: 0؟",

        answers: [
          "The element is fully transparent",
          "The element is fully visible",
          "The element is removed from HTML",
          "The element becomes larger",
        ],

        answersAr: ["العنصر شفاف بالكامل", "العنصر ظاهر بالكامل", "العنصر يتم حذفه من HTML", "العنصر يصبح أكبر"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 26
  ======================================================= */

  {
    title: "CSS Variables",
    titleAr: "متغيرات CSS",

    description: "Learn how custom properties make CSS easier to maintain.",

    descriptionAr: "تعلم كيف تجعل المتغيرات المخصصة CSS أسهل في التنظيم والصيانة.",

    code: `:root {
  --primary: #0f807a;
}

button {
  background: var(--primary);
}`,

    questions: [
      {
        question: "Which syntax creates a CSS variable?",
        questionAr: "أي صيغة تستخدم لإنشاء CSS Variable؟",

        answers: ["--variable-name", "$variable", "@variable", "#variable"],

        answersAr: ["--variable-name", "$variable", "@variable", "#variable"],

        correct: 0,
      },

      {
        question: "Which function reads a CSS variable?",
        questionAr: "أي دالة تستخدم لقراءة قيمة CSS Variable؟",

        answers: ["var()", "get()", "css-var()", "value()"],

        answersAr: ["var()", "get()", "css-var()", "value()"],

        correct: 0,
      },

      {
        question: "Where are global CSS variables commonly defined?",
        questionAr: "أين يتم تعريف CSS Variables العامة غالبًا؟",

        answers: [":root", ":global-css", "body-root-only", "#variables"],

        answersAr: [":root", ":global-css", "body-root-only", "#variables"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 27
  ======================================================= */

  {
    title: "Specificity",
    titleAr: "Specificity",

    description: "Understand how CSS decides which rule has priority.",

    descriptionAr: "افهم كيف يحدد CSS أي قاعدة لها الأولوية عند تعارض القواعد.",

    code: `p {
  color: blue;
}

.article p {
  color: #0f807a;
}`,

    questions: [
      {
        question: "What does specificity determine?",
        questionAr: "ماذا تحدد Specificity؟",

        answers: ["Which CSS rule has priority", "The element width", "The page height", "The font family"],

        answersAr: ["أي قاعدة CSS لها الأولوية", "عرض العنصر", "ارتفاع الصفحة", "نوع الخط"],

        correct: 0,
      },

      {
        question: "Which usually has higher specificity?",
        questionAr: "أي Selector يمتلك عادة Specificity أعلى؟",

        answers: ["ID selector", "Element selector", "Universal selector", "Plain text"],

        answersAr: ["ID Selector", "Element Selector", "Universal Selector", "النص العادي"],

        correct: 0,
      },

      {
        question: "Which selector is more specific?",
        questionAr: "أي Selector أكثر تحديدًا؟",

        answers: [".article p", "p", "*", "body"],

        answersAr: [".article p", "p", "*", "body"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 28
  ======================================================= */

  {
    title: "Media Queries",
    titleAr: "Media Queries",

    description: "Learn how media queries apply styles based on screen conditions.",

    descriptionAr: "تعلم كيف تطبق Media Queries تنسيقات مختلفة بناءً على ظروف الشاشة.",

    code: `@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}`,

    questions: [
      {
        question: "What are media queries commonly used for?",
        questionAr: "فيما تستخدم Media Queries غالبًا؟",

        answers: ["Responsive design", "Database connections", "HTML structure", "JavaScript execution"],

        answersAr: ["التصميم المتجاوب", "الاتصال بقواعد البيانات", "بنية HTML", "تشغيل JavaScript"],

        correct: 0,
      },

      {
        question: "Which keyword starts a media query?",
        questionAr: "أي كلمة تبدأ بها Media Query؟",

        answers: ["@media", "@screen", "@responsive", "@device"],

        answersAr: ["@media", "@screen", "@responsive", "@device"],

        correct: 0,
      },

      {
        question: "What does max-width define?",
        questionAr: "ماذا يحدد max-width؟",

        answers: [
          "A maximum viewport width condition",
          "The maximum font size",
          "The maximum height of every element",
          "The maximum page length",
        ],

        answersAr: ["شرطًا لأقصى عرض للـ viewport", "أقصى حجم للخط", "أقصى ارتفاع لكل العناصر", "أقصى طول للصفحة"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 29
  ======================================================= */

  {
    title: "Advanced Selectors",
    titleAr: "المحددات المتقدمة",

    description: "Learn powerful selectors such as child, sibling, attribute, and descendant selectors.",

    descriptionAr: "تعلم المحددات المتقدمة مثل Child وSibling وAttribute وDescendant Selectors.",

    code: `nav > a {
  color: #0b5d91;
}

input[type="text"] {
  border-color: #0f807a;
}`,

    questions: [
      {
        question: "Which selector targets direct children?",
        questionAr: "أي Selector يستهدف العناصر الأبناء المباشرة؟",

        answers: [">", "+", "~", "*"],

        answersAr: [">", "+", "~", "*"],

        correct: 0,
      },

      {
        question: "Which selector targets an element based on an attribute?",
        questionAr: "أي Selector يستهدف عنصرًا بناءً على Attribute؟",

        answers: ["[attribute]", ".attribute", "#attribute", ":attribute"],

        answersAr: ["[attribute]", ".attribute", "#attribute", ":attribute"],

        correct: 0,
      },

      {
        question: "What does the + combinator select?",
        questionAr: "ماذا يحدد الـ + Combinator؟",

        answers: ["The adjacent sibling", "All children", "The parent", "Every element"],

        answersAr: ["العنصر الشقيق المباشر التالي", "كل العناصر الأبناء", "العنصر الأب", "كل العناصر"],

        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 30
  ======================================================= */

  {
    title: "CSS Best Practices",
    titleAr: "أفضل ممارسات CSS",

    description: "Learn how to organize, maintain, and write cleaner CSS.",

    descriptionAr: "تعلم كيفية تنظيم CSS وكتابته بطريقة أنظف وأسهل في الصيانة.",

    code: `:root {
  --primary: #0f807a;
}

.button {
  background: var(--primary);
  border-radius: 10px;
}`,

    questions: [
      {
        question: "Why should CSS be organized?",
        questionAr: "لماذا يجب تنظيم CSS؟",

        answers: [
          "To make code easier to maintain",
          "To make HTML unnecessary",
          "To remove JavaScript",
          "To make CSS stop working",
        ],

        answersAr: [
          "لجعل الكود أسهل في الصيانة والتعديل",
          "لجعل HTML غير ضروري",
          "لإزالة JavaScript",
          "لإيقاف CSS عن العمل",
        ],

        correct: 0,
      },

      {
        question: "Which technique helps avoid repeating the same color value?",
        questionAr: "أي تقنية تساعد على تجنب تكرار نفس قيمة اللون؟",

        answers: ["CSS Variables", "Extra HTML", "More IDs", "Inline JavaScript"],

        answersAr: ["CSS Variables", "إضافة HTML إضافي", "استخدام IDs أكثر", "JavaScript داخل السطر"],

        correct: 0,
      },

      {
        question: "What is one goal of clean CSS?",
        questionAr: "ما أحد أهداف كتابة CSS بشكل نظيف؟",

        answers: [
          "Easy maintenance and readability",
          "Removing all selectors",
          "Replacing HTML",
          "Avoiding all responsive design",
        ],

        answersAr: [
          "سهولة الصيانة وقراءة الكود",
          "إزالة كل الـSelectors",
          "استبدال HTML",
          "تجنب التصميم المتجاوب بالكامل",
        ],

        correct: 0,
      },
    ],
  },
];

/* =========================================================
   2. LANGUAGE DATA
========================================================= */

const languageData = {
  en: {
    learningPath: "LEARNING PATH",
    learningTitle: "CSS Learning Path",

    basics: "CSS BASICS",
    boxModel: "BOX MODEL",
    textFonts: "TEXT & FONTS",
    layout: "LAYOUT",
    modern: "MODERN CSS",
    advanced: "ADVANCED CSS",

    progress: "CSS Progress",

    lesson: "LESSON",

    whatIsCss: "What is CSS?",

    whatIsCssP1: "CSS stands for <strong>Cascading Style Sheets</strong>.",

    whatIsCssP2: "CSS is used to control the visual appearance of HTML elements.",

    whatIsCssP3: "With CSS, you can change colors, sizes, spacing, layouts, fonts, animations, and much more.",

    keyIdea: "KEY IDEA",

    keyIdeaTitle: "HTML creates the structure. CSS creates the design.",

    keyIdeaText:
      "Think about a house. HTML is the structure of the house, while CSS controls the colors, size, spacing, and overall appearance.",

    codeExample: "CODE EXAMPLE",

    codeExampleTitle: "Your first CSS code",

    copy: "Copy",
    copied: "Copied!",
    failed: "Failed",

    result: "RESULT",

    tryIt: "TRY IT YOURSELF",

    tryItTitle: "Write CSS and see the result",

    runCss: "Run CSS",

    cssEditor: "CSS EDITOR",

    livePreview: "LIVE PREVIEW",

    livePreviewText: "Change the CSS and click <strong>Run CSS</strong>.",

    exampleButton: "Example Button",

    syntaxTitle: "Understanding CSS Syntax",

    syntaxP1: "A CSS rule contains a <strong>selector</strong> and a group of <strong>declarations</strong>.",

    syntaxP2: "The selector chooses the HTML element you want to style.",

    syntaxP3: "Each declaration contains a property and a value.",

    quickCheck: "QUICK CHECK",

    chooseAnswer: "Choose the correct answer.",

    correct: "✓ Correct! Great job.",

    wrong: "✗ Not quite. Try again.",

    previous: "Previous",

    previousLesson: "Previous Lesson",

    next: "Next Lesson",

    courseComplete: "Course Complete",

    back: "← Back",

    languageButton: "AR",

    question: "Question",

    nextQuestion: "Next Question",

    nextLesson: "Next Lesson",
  },

  ar: {
    learningPath: "مسار التعلم",
    learningTitle: "مسار تعلم CSS",

    basics: "أساسيات CSS",
    boxModel: "نموذج الصندوق",
    textFonts: "النصوص والخطوط",
    layout: "التخطيط",
    modern: "CSS الحديثة",
    advanced: "CSS المتقدمة",

    progress: "تقدم CSS",

    lesson: "الدرس",

    whatIsCss: "ما هو CSS؟",

    whatIsCssP1: "CSS اختصار لـ <strong>Cascading Style Sheets</strong> أي أوراق الأنماط المتتالية.",

    whatIsCssP2: "يُستخدم CSS للتحكم في المظهر المرئي لعناصر HTML.",

    whatIsCssP3: "باستخدام CSS يمكنك تغيير الألوان والأحجام والمسافات والتخطيطات والخطوط والحركات وغير ذلك الكثير.",

    keyIdea: "الفكرة الأساسية",

    keyIdeaTitle: "HTML ينشئ الهيكل، وCSS ينشئ التصميم.",

    keyIdeaText:
      "تخيل أنك تبني منزلًا. HTML يمثل هيكل المنزل، بينما CSS يتحكم في الألوان والحجم والمسافات والمظهر العام.",

    codeExample: "مثال على الكود",

    codeExampleTitle: "أول كود CSS لك",

    copy: "نسخ",

    copied: "تم النسخ!",

    failed: "فشل النسخ",

    result: "النتيجة",

    tryIt: "جرب بنفسك",

    tryItTitle: "اكتب CSS وشاهد النتيجة",

    runCss: "تشغيل CSS",

    cssEditor: "محرر CSS",

    livePreview: "المعاينة المباشرة",

    livePreviewText: "غيّر كود CSS ثم اضغط <strong>تشغيل CSS</strong>.",

    exampleButton: "زر تجريبي",

    syntaxTitle: "فهم صيغة كتابة CSS",

    syntaxP1: "تحتوي قاعدة CSS على <strong>Selector</strong> ومجموعة من <strong>Declarations</strong>.",

    syntaxP2: "يحدد الـ Selector عنصر HTML الذي تريد تنسيقه.",

    syntaxP3: "كل Declaration تحتوي على Property وValue.",

    quickCheck: "اختبار سريع",

    chooseAnswer: "اختر الإجابة الصحيحة.",

    correct: "✓ إجابة صحيحة! أحسنت.",

    wrong: "✗ ليست الإجابة الصحيحة. حاول مرة أخرى.",

    previous: "السابق",

    previousLesson: "الدرس السابق",

    next: "الدرس التالي",

    courseComplete: "اكتمل الكورس",

    back: "رجوع →",

    languageButton: "EN",

    question: "السؤال",

    nextQuestion: "السؤال التالي",

    nextLesson: "الدرس التالي",
  },
};

/* =========================================================
   3. QUIZ SETTINGS
========================================================= */

const QUIZ_QUESTION_COUNT = 3;

/* =========================================================
   4. ELEMENTS
========================================================= */

const lessonButtons = document.querySelectorAll(".lesson");

const lessonNumber = document.getElementById("lessonNumber");

const lessonTitle = document.getElementById("lessonTitle");

const lessonDescription = document.getElementById("lessonDescription");

const exampleCode = document.getElementById("exampleCode");

const progressText = document.getElementById("progressText");

const progressFill = document.getElementById("progressFill");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const copyButton = document.getElementById("copyButton");

const cssEditor = document.getElementById("cssEditor");

const runButton = document.getElementById("runButton");

const answerButtons = document.querySelectorAll(".answer-options button");

const answerFeedback = document.getElementById("answerFeedback");

const questionTitle = document.getElementById("questionTitle");

const quizQuestionNumber = document.getElementById("quizQuestionNumber");

const quizTotalQuestions = document.getElementById("quizTotalQuestions");

const quizNextButton = document.getElementById("quizNextButton");

/* =========================================================
   5. CURRENT STATE
========================================================= */

let currentLesson = 0;

let currentQuestion = 0;

let quizLocked = false;

let currentLanguage = "ar";

/* =========================================================
   6. STATIC TEXT ELEMENTS
========================================================= */

const textElements = {
  learningPathLabel: document.getElementById("learningPathLabel"),

  learningPathTitle: document.getElementById("learningPathTitle"),

  groupBasics: document.getElementById("groupBasics"),

  groupBoxModel: document.getElementById("groupBoxModel"),

  groupTextFonts: document.getElementById("groupTextFonts"),

  groupLayout: document.getElementById("groupLayout"),

  groupModern: document.getElementById("groupModern"),

  groupAdvanced: document.getElementById("groupAdvanced"),

  progressLabel: document.getElementById("progressLabel"),

  whatIsCssTitle: document.getElementById("whatIsCssTitle"),

  whatIsCssP1: document.getElementById("whatIsCssP1"),

  whatIsCssP2: document.getElementById("whatIsCssP2"),

  whatIsCssP3: document.getElementById("whatIsCssP3"),

  keyIdeaLabel: document.getElementById("keyIdeaLabel"),

  keyIdeaTitle: document.getElementById("keyIdeaTitle"),

  keyIdeaText: document.getElementById("keyIdeaText"),

  codeExampleLabel: document.getElementById("codeExampleLabel"),

  codeExampleTitle: document.getElementById("codeExampleTitle"),

  resultLabel: document.getElementById("resultLabel"),

  tryItLabel: document.getElementById("tryItLabel"),

  tryItTitle: document.getElementById("tryItTitle"),

  cssEditorLabel: document.getElementById("cssEditorLabel"),

  livePreviewLabel: document.getElementById("livePreviewLabel"),

  livePreviewText: document.getElementById("livePreviewText"),

  exampleButton: document.getElementById("exampleButton"),

  syntaxTitle: document.getElementById("syntaxTitle"),

  syntaxP1: document.getElementById("syntaxP1"),

  syntaxP2: document.getElementById("syntaxP2"),

  syntaxP3: document.getElementById("syntaxP3"),

  quickCheckLabel: document.getElementById("quickCheckLabel"),

  questionInstruction: document.getElementById("questionInstruction"),

  previousLabel: document.getElementById("previousLabel"),

  previousLessonText: document.getElementById("previousLessonText"),

  nextLabel: document.getElementById("nextLabel"),
};

/* =========================================================
   7. APPLY LANGUAGE
========================================================= */

function applyLanguage() {
  const lang = currentLanguage;

  const text = languageData[lang];

  document.documentElement.lang = lang;

  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.body.classList.toggle("rtl-mode", lang === "ar");

  textElements.learningPathLabel.textContent = text.learningPath;

  textElements.learningPathTitle.textContent = text.learningTitle;

  textElements.groupBasics.textContent = text.basics;

  textElements.groupBoxModel.textContent = text.boxModel;

  textElements.groupTextFonts.textContent = text.textFonts;

  textElements.groupLayout.textContent = text.layout;

  textElements.groupModern.textContent = text.modern;

  textElements.groupAdvanced.textContent = text.advanced;

  textElements.progressLabel.textContent = text.progress;

  textElements.whatIsCssTitle.textContent = text.whatIsCss;

  textElements.whatIsCssP1.innerHTML = text.whatIsCssP1;

  textElements.whatIsCssP2.textContent = text.whatIsCssP2;

  textElements.whatIsCssP3.textContent = text.whatIsCssP3;

  textElements.keyIdeaLabel.textContent = text.keyIdea;

  textElements.keyIdeaTitle.textContent = text.keyIdeaTitle;

  textElements.keyIdeaText.textContent = text.keyIdeaText;

  textElements.codeExampleLabel.textContent = text.codeExample;

  textElements.codeExampleTitle.textContent = text.codeExampleTitle;

  copyButton.textContent = text.copy;

  textElements.resultLabel.textContent = text.result;

  textElements.tryItLabel.textContent = text.tryIt;

  textElements.tryItTitle.textContent = text.tryItTitle;

  runButton.textContent = text.runCss;

  textElements.cssEditorLabel.textContent = text.cssEditor;

  textElements.livePreviewLabel.textContent = text.livePreview;

  textElements.livePreviewText.innerHTML = text.livePreviewText;

  textElements.exampleButton.textContent = text.exampleButton;

  textElements.syntaxTitle.textContent = text.syntaxTitle;

  textElements.syntaxP1.innerHTML = text.syntaxP1;

  textElements.syntaxP2.textContent = text.syntaxP2;

  textElements.syntaxP3.textContent = text.syntaxP3;

  textElements.quickCheckLabel.textContent = text.quickCheck;

  textElements.questionInstruction.textContent = text.chooseAnswer;

  textElements.previousLabel.textContent = text.previous;

  textElements.nextLabel.textContent = text.next;
  
  updateLessonButtons();

  loadLesson(currentLesson, false, false);
}

/* =========================================================
   8. UPDATE SIDEBAR LESSON NAMES
========================================================= */

function updateLessonButtons() {
  lessonButtons.forEach((button, index) => {
    const name = button.querySelector(".lesson-name");

    if (!name || !lessons[index]) {
      return;
    }

    name.textContent = currentLanguage === "ar" ? lessons[index].titleAr : lessons[index].title;
  });
}

/* =========================================================
   9. GET CURRENT QUESTIONS
========================================================= */

function getLessonQuestions() {
  const lesson = lessons[currentLesson];

  if (!lesson || !Array.isArray(lesson.questions)) {
    return [];
  }

  return lesson.questions.slice(0, QUIZ_QUESTION_COUNT);
}

/* =========================================================
   10. UPDATE QUICK CHECK
========================================================= */

function updateQuickCheck() {
  const questions = getLessonQuestions();

  const question = questions[currentQuestion];

  if (!question) {
    return;
  }

  const text = languageData.ar;

  const questionText = question.questionAr;

  const answers = question.answersAr;

  questionTitle.textContent = questionText;

  quizQuestionNumber.textContent = `${text.question} ${currentQuestion + 1}`;

  quizTotalQuestions.textContent = String(QUIZ_QUESTION_COUNT);

  answerFeedback.textContent = "";

  answerFeedback.style.color = "";

  answerButtons.forEach((button, index) => {
    button.disabled = false;

    button.textContent = answers[index] || "";

    button.style.background = "";

    button.style.borderColor = "";

    button.classList.remove("correct-answer", "wrong-answer");
  });

  quizLocked = false;

  quizNextButton.disabled = true;

  if (currentQuestion === QUIZ_QUESTION_COUNT - 1) {
    if (currentLesson === lessons.length - 1) {
      quizNextButton.textContent = text.courseComplete;
    } else {
      quizNextButton.textContent = text.nextLesson;
    }
  } else {
    quizNextButton.textContent = text.nextQuestion;
  }
}

/* =========================================================
   11. LOAD LESSON
========================================================= */

function loadLesson(index, scroll = true, resetQuiz = true) {
  if (index < 0) {
    index = 0;
  }

  if (index >= lessons.length) {
    index = lessons.length - 1;
  }

  currentLesson = index;

  if (resetQuiz) {
    currentQuestion = 0;

    quizLocked = false;
  }

  const lesson = lessons[currentLesson];

  const text = languageData.ar;

  /* =========================
     TITLE
  ========================== */

  lessonNumber.textContent = `${text.lesson} ${String(currentLesson + 1).padStart(2, "0")}`;

  lessonTitle.textContent = currentLanguage === "ar" ? lesson.titleAr : lesson.title;

  lessonDescription.textContent = currentLanguage === "ar" ? lesson.descriptionAr : lesson.description;

  /* =========================
     CODE
  ========================== */

  exampleCode.textContent = lesson.code;

  cssEditor.value = lesson.code;

  /* =========================
     PROGRESS
  ========================== */

  const progress = Math.round(((currentLesson + 1) / lessons.length) * 100);

  progressText.textContent = `${progress}%`;

  progressFill.style.width = `${progress}%`;

  /* =========================
     SIDEBAR
  ========================== */

  lessonButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === currentLesson);

    const status = button.querySelector(".lesson-status");

    if (!status) {
      return;
    }

    status.classList.toggle("current", buttonIndex === currentLesson);
  });

  /* =========================
     NAVIGATION
  ========================== */

  previousButton.disabled = currentLesson === 0;

  nextButton.disabled = currentLesson === lessons.length - 1;

  const previousStrong = previousButton.querySelector("strong");

  const nextStrong = nextButton.querySelector("strong");

  if (currentLesson === 0) {
    previousStrong.textContent = text.previousLesson;
  } else {
    const previousLesson = lessons[currentLesson - 1];

    previousStrong.textContent = currentLanguage === "ar" ? previousLesson.titleAr : previousLesson.title;
  }

  if (currentLesson === lessons.length - 1) {
    nextStrong.textContent = text.courseComplete;
  } else {
    const nextLesson = lessons[currentLesson + 1];

    nextStrong.textContent = currentLanguage === "ar" ? nextLesson.titleAr : nextLesson.title;
  }

  /* =========================
     QUICK CHECK
  ========================== */

  updateQuickCheck();

  /* =========================
     SAVE
  ========================== */

  localStorage.setItem("fayad-css-current-lesson", currentLesson);

  /* =========================
     RUN PREVIEW
  ========================== */

  runCSS();

  /* =========================
     SCROLL
  ========================== */

  if (scroll) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

/* =========================================================
   12. SIDEBAR CLICK
========================================================= */

lessonButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    loadLesson(index, true, true);
  });
});

/* =========================================================
   13. PREVIOUS LESSON
========================================================= */

previousButton.addEventListener("click", () => {
  if (currentLesson > 0) {
    loadLesson(currentLesson - 1, true, true);
  }
});

/* =========================================================
   14. NEXT LESSON
========================================================= */

nextButton.addEventListener("click", () => {
  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1, true, true);
  }
});

/* =========================================================
   16. RUN CSS
========================================================= */

function runCSS() {
  if (!cssEditor) {
    return;
  }

  const css = cssEditor.value;

  let styleElement = document.getElementById("user-css-preview");

  if (!styleElement) {
    styleElement = document.createElement("style");

    styleElement.id = "user-css-preview";

    document.head.appendChild(styleElement);
  }

  styleElement.textContent = `

    #livePreview {
      isolation: isolate;
    }

    #livePreview * {
      box-sizing: border-box;
    }

    ${css}

  `;
}

/* =========================================================
   17. RUN BUTTON
========================================================= */

runButton.addEventListener("click", () => {
  runCSS();
});

/* =========================================================
   18. LIVE CSS
========================================================= */

cssEditor.addEventListener("input", () => {
  runCSS();
});

/* =========================================================
   19. COPY CODE
========================================================= */

copyButton.addEventListener("click", async () => {
  const text = languageData[currentLanguage];

  try {
    await navigator.clipboard.writeText(exampleCode.textContent);

    copyButton.textContent = text.copied;

    setTimeout(() => {
      copyButton.textContent = text.copy;
    }, 1500);
  } catch (error) {
    copyButton.textContent = text.failed;

    setTimeout(() => {
      copyButton.textContent = text.copy;
    }, 1500);
  }
});

/* =========================================================
   20. QUIZ ANSWERS
========================================================= */

answerButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (quizLocked) {
      return;
    }

    const questions = getLessonQuestions();

    const question = questions[currentQuestion];

    if (!question) {
      return;
    }

    const text = languageData[currentLanguage];

    /* =========================
           RESET ANSWER STYLES
        ========================== */

    answerButtons.forEach((answerButton) => {
      answerButton.style.background = "";

      answerButton.style.borderColor = "";

      answerButton.classList.remove("correct-answer", "wrong-answer");
    });

    /* =========================
           CORRECT
        ========================== */

    if (index === question.correct) {
      quizLocked = true;

      answerFeedback.textContent = text.correct;

      answerFeedback.style.color = "#0f807a";

      button.style.background = "rgba(15, 128, 122, 0.12)";

      button.style.borderColor = "rgba(15, 128, 122, 0.35)";

      button.classList.add("correct-answer");

      answerButtons.forEach((answerButton) => {
        answerButton.disabled = true;
      });

      quizNextButton.disabled = false;

      /* =========================
             LAST QUESTION
          ========================== */

      if (currentQuestion === QUIZ_QUESTION_COUNT - 1) {
        if (currentLesson === lessons.length - 1) {
          quizNextButton.textContent = text.courseComplete;
        } else {
          quizNextButton.textContent = text.nextLesson;
        }
      } else {
        quizNextButton.textContent = text.nextQuestion;
      }
    } else {

    /* =========================
           WRONG
        ========================== */
      answerFeedback.textContent = text.wrong;

      answerFeedback.style.color = "#b14a4a";

      button.style.background = "rgba(177, 74, 74, 0.08)";

      button.style.borderColor = "rgba(177, 74, 74, 0.25)";

      button.classList.add("wrong-answer");
    }
  });
});

/* =========================================================
   21. NEXT QUESTION / NEXT LESSON
========================================================= */

quizNextButton.addEventListener("click", () => {
  if (quizNextButton.disabled) {
    return;
  }

  /* =========================
       QUESTION 1 → 2
    ========================== */

  if (currentQuestion < QUIZ_QUESTION_COUNT - 1) {
    currentQuestion++;

    quizLocked = false;

    updateQuickCheck();

    return;
  }

  /* =========================
       QUESTION 3 → NEXT LESSON
    ========================== */

  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1, true, true);
  }
});

/* =========================================================
   22. KEYBOARD NAVIGATION
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "TEXTAREA") {
    return;
  }

  if (event.key === "ArrowRight" && currentLanguage === "en" && currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);
  }

  if (event.key === "ArrowLeft" && currentLanguage === "en" && currentLesson > 0) {
    loadLesson(currentLesson - 1);
  }

  if (event.key === "ArrowLeft" && currentLanguage === "ar" && currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);
  }

  if (event.key === "ArrowRight" && currentLanguage === "ar" && currentLesson > 0) {
    loadLesson(currentLesson - 1);
  }
});

/* =========================================================
   23. RESTORE LAST LESSON
========================================================= */

const savedLesson = localStorage.getItem("fayad-css-current-lesson");

if (savedLesson !== null && !Number.isNaN(Number(savedLesson))) {
  currentLesson = Math.min(Math.max(Number(savedLesson), 0), lessons.length - 1);
} else {
  currentLesson = 0;
}

/* =========================================================
   24. INITIALIZE
========================================================= */

applyLanguage();
