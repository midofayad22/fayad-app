/* =========================================================
   FAYAD — CSS LEARNING ENGINE
   BILINGUAL VERSION
   English / Arabic
========================================================= */

/* =========================================================
   1. LESSON DATA
========================================================= */

const lessons = [
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

    question: "What is CSS mainly used for?",
    questionAr: "فيما يُستخدم CSS بشكل أساسي؟",

    answers: ["Styling the appearance of web pages", "Creating database tables", "Running server-side code"],

    answersAr: ["تنسيق وتجميل مظهر صفحات الويب", "إنشاء جداول قواعد البيانات", "تشغيل الأكواد على الخادم"],

    correct: 0,
  },

  {
    title: "CSS Syntax",
    titleAr: "صيغة كتابة CSS",

    description: "Learn the basic structure of a CSS rule and understand selectors, properties, and values.",
    descriptionAr: "تعلم البنية الأساسية لقاعدة CSS وافهم المحددات والخصائص والقيم.",

    code: `h1 {
  color: blue;
  font-size: 40px;
}`,

    question: "Which part selects the HTML element?",
    questionAr: "أي جزء يحدد عنصر HTML الذي نريد تنسيقه؟",

    answers: ["Selector", "Value", "Property"],

    answersAr: ["Selector — المحدد", "Value — القيمة", "Property — الخاصية"],

    correct: 0,
  },

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

    question: "What does a selector do?",
    questionAr: "ماذا يفعل الـ Selector؟",

    answers: ["Selects elements to style", "Creates HTML elements", "Runs JavaScript"],

    answersAr: ["يحدد العناصر التي نريد تنسيقها", "ينشئ عناصر HTML", "يشغل JavaScript"],

    correct: 0,
  },

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

    question: "Which property changes text color?",
    questionAr: "أي خاصية تغير لون النص؟",

    answers: ["color", "background", "font"],

    answersAr: ["color", "background", "font"],

    correct: 0,
  },

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

    question: "Which property changes an element's background color?",
    questionAr: "أي خاصية تغير لون خلفية العنصر؟",

    answers: ["background-color", "color", "border-color"],

    answersAr: ["background-color", "color", "border-color"],

    correct: 0,
  },

  {
    title: "Borders",
    titleAr: "الحدود Borders",

    description: "Learn how to create borders around HTML elements.",
    descriptionAr: "تعلم كيفية إنشاء حدود حول عناصر HTML.",

    code: `.card {
  border: 2px solid #0f807a;
  border-radius: 12px;
}`,

    question: "Which property creates a border?",
    questionAr: "أي خاصية تنشئ Border حول العنصر؟",

    answers: ["border", "outline-text", "edge"],

    answersAr: ["border", "outline-text", "edge"],

    correct: 0,
  },

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

    question: "Which property controls an element's width?",
    questionAr: "أي خاصية تتحكم في عرض العنصر؟",

    answers: ["width", "size", "element-width"],

    answersAr: ["width", "size", "element-width"],

    correct: 0,
  },

  {
    title: "Margin",
    titleAr: "الهامش Margin",

    description: "Learn how margin creates space outside an element.",
    descriptionAr: "تعلم كيف ينشئ Margin مساحة خارج العنصر.",

    code: `.box {
  margin: 30px;
  background: #0f807a;
}`,

    question: "Where does margin create space?",
    questionAr: "أين ينشئ الـ Margin المساحة؟",

    answers: ["Outside the element", "Inside the element", "Inside the text"],

    answersAr: ["خارج العنصر", "داخل العنصر", "داخل النص"],

    correct: 0,
  },

  {
    title: "Padding",
    titleAr: "الحشو Padding",

    description: "Learn how padding creates space inside an element.",
    descriptionAr: "تعلم كيف ينشئ Padding مساحة داخل العنصر.",

    code: `.box {
  padding: 30px;
  background: #eaf3f8;
}`,

    question: "Where does padding create space?",
    questionAr: "أين ينشئ الـ Padding المساحة؟",

    answers: ["Inside the element", "Outside the element", "Outside the page"],

    answersAr: ["داخل العنصر", "خارج العنصر", "خارج الصفحة"],

    correct: 0,
  },

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

    question: "Which four parts make up the CSS box model?",
    questionAr: "ما الأجزاء الأربعة التي يتكون منها CSS Box Model؟",

    answers: ["Content, padding, border, margin", "Text, image, button, link", "Header, main, footer, nav"],

    answersAr: ["المحتوى، Padding، Border، Margin", "النص، الصورة، الزر، الرابط", "Header، Main، Footer، Nav"],

    correct: 0,
  },

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

    question: "What does border-box include?",
    questionAr: "ماذا يتضمن border-box؟",

    answers: ["Padding and border inside the declared size", "Only the content", "Only the margin"],

    answersAr: ["الـ Padding والـ Border داخل الحجم المحدد", "المحتوى فقط", "الـ Margin فقط"],

    correct: 0,
  },

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

    question: "Which property adds an underline?",
    questionAr: "أي خاصية تضيف خطًا أسفل النص؟",

    answers: ["text-decoration", "text-style", "underline-text"],

    answersAr: ["text-decoration", "text-style", "underline-text"],

    correct: 0,
  },

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

    question: "Which property controls the font family?",
    questionAr: "أي خاصية تتحكم في نوع الخط؟",

    answers: ["font-family", "font-type", "font-name"],

    answersAr: ["font-family", "font-type", "font-name"],

    correct: 0,
  },

  {
    title: "Line Height",
    titleAr: "ارتفاع السطر Line Height",

    description: "Learn how line-height controls vertical spacing between lines of text.",
    descriptionAr: "تعلم كيف يتحكم line-height في المسافة الرأسية بين أسطر النص.",

    code: `p {
  line-height: 1.8;
}`,

    question: "What does line-height control?",
    questionAr: "ماذا يتحكم line-height؟",

    answers: ["Vertical space between lines", "Text color", "Element width"],

    answersAr: ["المسافة الرأسية بين الأسطر", "لون النص", "عرض العنصر"],

    correct: 0,
  },

  {
    title: "Text Alignment",
    titleAr: "محاذاة النص",

    description: "Learn how to align text horizontally.",
    descriptionAr: "تعلم كيفية محاذاة النص أفقيًا.",

    code: `.title {
  text-align: center;
}`,

    question: "Which value centers text?",
    questionAr: "أي قيمة تجعل النص في المنتصف؟",

    answers: ["center", "middle", "horizontal"],

    answersAr: ["center", "middle", "horizontal"],

    correct: 0,
  },

  {
    title: "Display",
    titleAr: "Display",

    description: "Learn how display controls the layout behavior of elements.",
    descriptionAr: "تعلم كيف تتحكم خاصية display في طريقة ظهور وترتيب العناصر.",

    code: `.box {
  display: inline-block;
}`,

    question: "Which property controls an element's display behavior?",
    questionAr: "أي خاصية تتحكم في طريقة عرض العنصر؟",

    answers: ["display", "layout", "element-type"],

    answersAr: ["display", "layout", "element-type"],

    correct: 0,
  },

  {
    title: "Position",
    titleAr: "Position",

    description: "Learn how relative, absolute, fixed, and sticky positioning work.",
    descriptionAr: "تعلم كيفية عمل relative وabsolute وfixed وsticky.",

    code: `.box {
  position: relative;
  top: 20px;
}`,

    question: "Which property controls positioning?",
    questionAr: "أي خاصية تتحكم في موضع العنصر؟",

    answers: ["position", "place", "location"],

    answersAr: ["position", "place", "location"],

    correct: 0,
  },

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

    question: "Which property enables Flexbox?",
    questionAr: "أي خاصية تقوم بتفعيل Flexbox؟",

    answers: ["display: flex", "flex: true", "layout: flex"],

    answersAr: ["display: flex", "flex: true", "layout: flex"],

    correct: 0,
  },

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

    question: "Which property enables CSS Grid?",
    questionAr: "أي خاصية تقوم بتفعيل CSS Grid؟",

    answers: ["display: grid", "grid: true", "layout: grid"],

    answersAr: ["display: grid", "grid: true", "layout: grid"],

    correct: 0,
  },

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

    question: "What is responsive design?",
    questionAr: "ما هو Responsive Design؟",

    answers: ["Design that adapts to different screen sizes", "Design only for phones", "Design without CSS"],

    answersAr: ["تصميم يتكيف مع أحجام الشاشات المختلفة", "تصميم للهواتف فقط", "تصميم بدون CSS"],

    correct: 0,
  },

  {
    title: "Pseudo-classes",
    titleAr: "Pseudo-classes",

    description: "Learn how pseudo-classes style elements in specific states.",
    descriptionAr: "تعلم كيف تستخدم Pseudo-classes لتنسيق العناصر في حالات معينة.",

    code: `button:hover {
  background: #0f807a;
}`,

    question: "What does :hover represent?",
    questionAr: "ماذا يمثل :hover؟",

    answers: ["An element when the mouse is over it", "An element after clicking", "An element when hidden"],

    answersAr: ["العنصر عندما يكون مؤشر الماوس فوقه", "العنصر بعد الضغط عليه", "العنصر عندما يكون مخفيًا"],

    correct: 0,
  },

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

    question: "Which syntax represents a pseudo-element?",
    questionAr: "أي صيغة تمثل Pseudo-element؟",

    answers: ["::after", ":after-element", "pseudo-after"],

    answersAr: ["::after", ":after-element", "pseudo-after"],

    correct: 0,
  },

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

    question: "What does transition do?",
    questionAr: "ماذا تفعل transition؟",

    answers: ["Creates smooth changes", "Creates HTML", "Deletes an element"],

    answersAr: ["تنشئ تغييرات وانتقالات سلسة", "تنشئ HTML", "تحذف عنصرًا"],

    correct: 0,
  },

  {
    title: "Transforms",
    titleAr: "Transforms",

    description: "Learn how transform moves, scales, rotates, and skews elements.",
    descriptionAr: "تعلم كيف تستخدم transform لتحريك العناصر وتكبيرها وتدويرها وميلها.",

    code: `.card:hover {
  transform: translateY(-5px) scale(1.02);
}`,

    question: "Which property is used for transformations?",
    questionAr: "أي خاصية تستخدم للتحويلات؟",

    answers: ["transform", "change", "motion"],

    answersAr: ["transform", "change", "motion"],

    correct: 0,
  },

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

    question: "Which rule defines animation stages?",
    questionAr: "أي قاعدة تحدد مراحل الـ Animation؟",

    answers: ["@keyframes", "@animation", "@motion"],

    answersAr: ["@keyframes", "@animation", "@motion"],

    correct: 0,
  },

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

    question: "Which syntax creates a CSS variable?",
    questionAr: "أي صيغة تستخدم لإنشاء CSS Variable؟",

    answers: ["--variable-name", "$variable", "@variable"],

    answersAr: ["--variable-name", "$variable", "@variable"],

    correct: 0,
  },

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

    question: "What does specificity determine?",
    questionAr: "ماذا تحدد Specificity؟",

    answers: ["Which CSS rule has priority", "The element width", "The page height"],

    answersAr: ["أي قاعدة CSS لها الأولوية", "عرض العنصر", "ارتفاع الصفحة"],

    correct: 0,
  },

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

    question: "What are media queries commonly used for?",
    questionAr: "فيما تستخدم Media Queries غالبًا؟",

    answers: ["Responsive design", "Database connections", "HTML structure"],

    answersAr: ["التصميم المتجاوب", "الاتصال بقواعد البيانات", "بنية HTML"],

    correct: 0,
  },

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

    question: "Which selector targets direct children?",
    questionAr: "أي Selector يستهدف العناصر الأبناء المباشرة؟",

    answers: [">", "+", "~"],

    answersAr: [">", "+", "~"],

    correct: 0,
  },

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

    question: "Why should CSS be organized?",
    questionAr: "لماذا يجب تنظيم CSS؟",

    answers: ["To make code easier to maintain", "To make HTML unnecessary", "To remove JavaScript"],

    answersAr: ["لجعل الكود أسهل في الصيانة والتعديل", "لجعل HTML غير ضروري", "لإزالة JavaScript"],

    correct: 0,
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
  },
};

/* =========================================================
   3. ELEMENTS
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

const languageButton = document.getElementById("languageButton");

/* =========================================================
   4. CURRENT STATE
========================================================= */

let currentLesson = 0;

let currentLanguage = localStorage.getItem("fayad-css-language") || "en";

/* =========================================================
   5. STATIC TEXT ELEMENTS
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
   6. APPLY LANGUAGE
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

  languageButton.textContent = text.languageButton;

  updateLessonButtons();

  loadLesson(currentLesson, false);
}

/* =========================================================
   7. UPDATE SIDEBAR LESSON NAMES
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
   8. LOAD LESSON
========================================================= */

function loadLesson(index, scroll = true) {
  if (index < 0) {
    index = 0;
  }

  if (index >= lessons.length) {
    index = lessons.length - 1;
  }

  currentLesson = index;

  const lesson = lessons[currentLesson];

  const text = languageData[currentLanguage];

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

    if (buttonIndex === currentLesson) {
      status.classList.add("current");
    } else {
      status.classList.remove("current");
    }
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

  const question = currentLanguage === "ar" ? lesson.questionAr : lesson.question;

  document.getElementById("questionTitle").textContent = question;

  answerButtons.forEach((button, index) => {
    button.disabled = false;

    button.style.background = "";

    button.style.borderColor = "";

    button.textContent = currentLanguage === "ar" ? lesson.answersAr[index] : lesson.answers[index];
  });

  answerFeedback.textContent = "";

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
   9. SIDEBAR CLICK
========================================================= */

lessonButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    loadLesson(index);
  });
});

/* =========================================================
   10. PREVIOUS
========================================================= */

previousButton.addEventListener("click", () => {
  if (currentLesson > 0) {
    loadLesson(currentLesson - 1);
  }
});

/* =========================================================
   11. NEXT
========================================================= */

nextButton.addEventListener("click", () => {
  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);
  }
});

/* =========================================================
   12. LANGUAGE SWITCH
========================================================= */

languageButton.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";

  localStorage.setItem("fayad-css-language", currentLanguage);

  applyLanguage();
});

/* =========================================================
   13. RUN CSS
========================================================= */

function runCSS() {
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
   14. RUN BUTTON
========================================================= */

runButton.addEventListener("click", () => {
  runCSS();
});

/* =========================================================
   15. LIVE CSS
========================================================= */

cssEditor.addEventListener("input", () => {
  runCSS();
});

/* =========================================================
   16. COPY CODE
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
   17. QUICK CHECK
========================================================= */

answerButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const correct = lessons[currentLesson].correct;

    const text = languageData[currentLanguage];

    if (index === correct) {
      answerFeedback.textContent = text.correct;

      answerFeedback.style.color = "#0f807a";

      button.style.background = "rgba(15, 128, 122, 0.12)";

      button.style.borderColor = "rgba(15, 128, 122, 0.35)";
    } else {
      answerFeedback.textContent = text.wrong;

      answerFeedback.style.color = "#b14a4a";

      button.style.background = "rgba(177, 74, 74, 0.08)";

      button.style.borderColor = "rgba(177, 74, 74, 0.25)";
    }
  });
});

/* =========================================================
   18. KEYBOARD NAVIGATION
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
   19. RESTORE LAST LESSON
========================================================= */

const savedLesson = localStorage.getItem("fayad-css-current-lesson");

if (savedLesson !== null && !Number.isNaN(Number(savedLesson))) {
  currentLesson = Number(savedLesson);
} else {
  currentLesson = 0;
}

/* =========================================================
   20. INITIALIZE
========================================================= */

applyLanguage();
