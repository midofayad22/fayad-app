/* =========================================================
   FAYAD — PROGRAMMING FUNDAMENTALS ENGINE
   Arabic Foundation Track
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =====================================================
       DOM
    ====================================================== */

  const lessonNav = document.getElementById("lesson-nav");

  const lessonItems = document.querySelectorAll(".lesson-item");

  const lessonCounter = document.getElementById("lesson-counter");

  const lessonTitle = document.getElementById("lesson-title");

  const lessonHeading = document.getElementById("lesson-heading");

  const lessonContent = document.getElementById("lesson-content");

  const lessonIcon = document.getElementById("lesson-icon");

  const lessonLevel = document.getElementById("lesson-level");

  const lessonStatus = document.getElementById("lesson-status");

  const keyDescription = document.getElementById("key-description");

  const exampleCode = document.getElementById("example-code");

  const quizQuestion = document.getElementById("quiz-question");

  const quizOptions = document.getElementById("quiz-options");

  const quizResult = document.getElementById("quiz-result");

  const challengeText = document.getElementById("challenge-text");

  const completeBtn = document.getElementById("complete-btn");

  const prevBtn = document.getElementById("prev-btn");

  const nextBtn = document.getElementById("next-btn");

  const progressFill = document.getElementById("progress-fill");

  const progressPercent = document.getElementById("progress-percent");

  const progressText = document.getElementById("progress-text");

  const copyExampleBtn = document.getElementById("copy-example");

  const codeEditor = document.getElementById("code-editor");

  const runCodeBtn = document.getElementById("run-code-btn");

  const resetCodeBtn = document.getElementById("reset-code-btn");

  const consoleOutput = document.getElementById("console-output");

  const finalQuizModal = document.getElementById("final-quiz-modal");

  const closeFinalQuiz = document.getElementById("close-final-quiz");

  const finalQuestionArea = document.getElementById("final-question-area");

  const finalNextBtn = document.getElementById("final-next-btn");

  const finalProgressFill = document.getElementById("final-progress-fill");

  /* =====================================================
       COURSE STATE
    ====================================================== */

  const STORAGE_KEY = "fayad-programming-fundamentals-progress";

  let currentLesson = 1;

  let completedLessons = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  let quizAnswered = false;

  let selectedFinalAnswer = null;

  let finalQuestionIndex = 0;

  let finalScore = 0;

  /* =====================================================
       LESSON DATA
    ====================================================== */

  const lessons = {
    1: {
      title: "ما هي البرمجة؟",

      heading: "ابدأ بفهم الفكرة قبل كتابة الكود",

      icon: "fa-terminal",

      level: "FOUNDATION",

      content: `
                <section class="lesson-section">

                    <h3>البرمجة ليست مجرد كتابة كود</h3>

                    <p>
                        البرمجة هي عملية إنشاء مجموعة من التعليمات
                        التي تخبر الكمبيوتر بما يجب عليه فعله.
                        هذه التعليمات تُكتب باستخدام لغة برمجة
                        يفهمها المترجم أو بيئة التشغيل.
                    </p>

                    <p>
                        لكن أهم جزء في البرمجة ليس حفظ الكلمات،
                        وإنما القدرة على تحويل المشكلة إلى خطوات
                        واضحة ومنطقية.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>كيف يفكر المبرمج؟</h3>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>1 — المشكلة</h4>
                            <p>
                                نحدد الشيء الذي نريد حله أو بناؤه.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>2 — التحليل</h4>
                            <p>
                                نفهم البيانات المطلوبة والنتيجة
                                التي نريد الوصول إليها.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>3 — الحل</h4>
                            <p>
                                نحول التفكير إلى خطوات مرتبة.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>4 — التنفيذ</h4>
                            <p>
                                نكتب الخطوات باستخدام لغة برمجة.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "المبرمج الجيد لا يبدأ بالكود مباشرة؛ يبدأ بفهم المشكلة ثم يبني الحل خطوة بخطوة.",

      example: `const age = 20;

if (age >= 18) {
    console.log("يمكنك التسجيل");
}`,

      question: "ما الهدف الأساسي من البرمجة؟",

      answers: ["كتابة نصوص طويلة", "إعطاء الكمبيوتر تعليمات لتنفيذ مهمة", "حفظ أوامر اللغة", "تصميم الصور فقط"],

      correct: 1,

      challenge: "فكر في مهمة يومية مثل إعداد كوب من القهوة، وحوّلها إلى خطوات مرتبة كما لو كنت تشرحها للكمبيوتر.",
    },

    2: {
      title: "كيف يعمل الكود؟",

      heading: "من الكود الذي تكتبه إلى النتيجة",

      icon: "fa-gears",

      level: "CORE CONCEPT",

      content: `
                <section class="lesson-section">

                    <h3>الكود لا ينتقل مباشرة إلى الكمبيوتر</h3>

                    <p>
                        عندما تكتب برنامجًا، توجد عدة مراحل بين
                        النص الذي كتبته وبين النتيجة التي تظهر أمامك.
                    </p>

                    <div class="timeline">

                        <div class="timeline-item">
                            <span class="timeline-year">01</span>
                            <p>
                                تكتب التعليمات باستخدام لغة برمجة.
                            </p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">02</span>
                            <p>
                                يتم تحليل الكود والتأكد من قواعده.
                            </p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">03</span>
                            <p>
                                يتم تحويله أو تفسيره إلى تعليمات قابلة للتنفيذ.
                            </p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">04</span>
                            <p>
                                ينفذ الكمبيوتر التعليمات وينتج النتيجة.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "الكود هو الوسيلة التي نستخدمها لوصف خطوات الحل، والكمبيوتر ينفذ هذه الخطوات وفق القواعد التي تحددها اللغة.",

      example: `let x = 10;
let y = 5;

let result = x + y;

console.log(result);`,

      question: "ماذا يحدث بعد كتابة الكود؟",

      answers: ["ينفذه الكمبيوتر بطريقة عشوائية", "يتم تحليله ثم تنفيذه", "يُحذف تلقائيًا", "يتحول إلى صورة"],

      correct: 1,

      challenge: "اشرح بكلماتك الفرق بين الكود الذي تكتبه والعملية التي ينفذها الكمبيوتر.",
    },

    3: {
      title: "التفكير البرمجي",

      heading: "تعلم طريقة التفكير قبل تعلم اللغة",

      icon: "fa-brain",

      level: "PROBLEM SOLVING",

      content: `
                <section class="lesson-section">

                    <h3>ما هو التفكير البرمجي؟</h3>

                    <p>
                        التفكير البرمجي هو طريقة منظمة لتحليل المشكلات
                        وتقسيمها إلى أجزاء صغيرة يمكن التعامل معها.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Decomposition</h4>
                            <p>
                                تقسيم المشكلة الكبيرة إلى مشاكل أصغر.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Pattern Recognition</h4>
                            <p>
                                اكتشاف الأنماط المتكررة داخل المشكلات.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Abstraction</h4>
                            <p>
                                التركيز على المعلومات المهمة وإخفاء التفاصيل غير الضرورية.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Algorithm</h4>
                            <p>
                                بناء خطوات واضحة للوصول إلى الحل.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "التفكير البرمجي مهارة مستقلة عن لغة البرمجة؛ يمكنك استخدام نفس طريقة التفكير مع JavaScript أو Python أو C++.",

      example: `const tasks = [
    "فتح التطبيق",
    "تسجيل الدخول",
    "اختيار الدرس",
    "بدء التعلم"
];

console.log(tasks);`,

      question: "ما معنى Decomposition؟",

      answers: ["كتابة الكود بسرعة", "تقسيم المشكلة إلى أجزاء أصغر", "حذف المشكلة", "اختيار لغة البرمجة"],

      correct: 1,

      challenge: "خذ مشروعًا مثل متجر إلكتروني، وقسمه إلى أجزاء صغيرة مثل المستخدمين والمنتجات والدفع.",
    },

    4: {
      title: "الخوارزميات",

      heading: "حوّل الحل إلى خطوات واضحة",

      icon: "fa-list-ol",

      level: "ALGORITHMS",

      content: `
                <section class="lesson-section">

                    <h3>ما هي Algorithm؟</h3>

                    <p>
                        الخوارزمية هي مجموعة خطوات مرتبة ومحددة
                        تستخدم لحل مشكلة أو تنفيذ مهمة.
                    </p>

                    <p>
                        لا يشترط أن تكون الخوارزمية مكتوبة بلغة برمجة.
                        يمكن كتابتها بالكلمات أو رسمها باستخدام Flowchart
                        ثم تحويلها لاحقًا إلى كود.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>مثال</h3>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Input</h4>
                            <p>رقمان يريد المستخدم جمعهما.</p>
                        </div>

                        <div class="info-box">
                            <h4>Process</h4>
                            <p>إجراء عملية الجمع.</p>
                        </div>

                        <div class="info-box">
                            <h4>Output</h4>
                            <p>عرض الناتج للمستخدم.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "الخوارزمية تصف طريقة الحل، بينما الكود يترجم هذه الطريقة إلى لغة يستطيع الكمبيوتر تنفيذها.",

      example: `let a = 10;
let b = 20;

let sum = a + b;

console.log(sum);`,

      question: "ما الذي تصفه الخوارزمية؟",

      answers: ["لون الموقع", "خطوات حل المشكلة", "نوع الشاشة", "حجم الملف"],

      correct: 1,

      challenge: "اكتب خوارزمية بسيطة لحساب متوسط ثلاثة أرقام.",
    },

    5: {
      title: "لغات البرمجة",

      heading: "لماذا توجد لغات برمجة كثيرة؟",

      icon: "fa-language",

      level: "LANGUAGES",

      content: `
                <section class="lesson-section">

                    <h3>لغة البرمجة هي وسيلة للتواصل مع الكمبيوتر</h3>

                    <p>
                        توجد لغات كثيرة لأن كل لغة صممت لتناسب
                        أنواعًا معينة من المشاريع والمشكلات.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>JavaScript</h4>
                            <p>
                                أساسية لتطوير الويب والتفاعل داخل صفحات الويب.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Python</h4>
                            <p>
                                مشهورة بالتعلم السهل والذكاء الاصطناعي والبيانات.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>C / C++</h4>
                            <p>
                                تستخدم في الأنظمة والبرمجيات عالية الأداء.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Java</h4>
                            <p>
                                تستخدم في تطبيقات وأنظمة ومشاريع كبيرة ومتنوعة.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "لا توجد لغة برمجة واحدة هي الأفضل لكل شيء؛ اختيار اللغة يعتمد على المشكلة والمنصة ومتطلبات المشروع.",

      example: `let language = "JavaScript";

console.log(
    "I am learning " + language
);`,

      question: "لماذا توجد لغات برمجة متعددة؟",

      answers: [
        "لأن كل اللغات متطابقة",
        "لأن لكل لغة استخدامات وخصائص مختلفة",
        "لزيادة حجم الملفات",
        "لأن الكمبيوتر لا يستطيع التعلم",
      ],

      correct: 1,

      challenge: "ابحث ذهنيًا عن ثلاثة مجالات مختلفة واختر لغة مناسبة لكل مجال.",
    },

    6: {
      title: "Syntax",

      heading: "قواعد اللغة التي تكتب بها الكود",

      icon: "fa-code",

      level: "SYNTAX",

      content: `
                <section class="lesson-section">

                    <h3>ما معنى Syntax؟</h3>

                    <p>
                        Syntax هي مجموعة القواعد التي تحدد الشكل الصحيح
                        لكتابة الأوامر في لغة البرمجة.
                    </p>

                    <p>
                        كما أن اللغة الطبيعية لها قواعد، فإن JavaScript
                        وغيرها من اللغات لها قواعد يجب اتباعها.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>خطأ Syntax</h3>

                    <p>
                        إذا كتبت الكود بطريقة تخالف قواعد اللغة،
                        فقد تحصل على Syntax Error.
                    </p>

                </section>
            `,

      key: "Syntax تحدد كيف يجب أن تكتب الكود، بينما Logic تحدد هل الكود يحل المشكلة بالطريقة الصحيحة أم لا.",

      example: `const name = "FAYAD";

console.log(name);`,

      question: "ما المقصود بـ Syntax؟",

      answers: ["قواعد كتابة الكود", "سرعة الكمبيوتر", "حجم البرنامج", "نوع المعالج"],

      correct: 0,

      challenge: "اكتب سطر JavaScript صحيحًا يعرّف متغيرًا باسم username.",
    },

    7: {
      title: "المتغيرات",

      heading: "كيف نخزن المعلومات داخل البرنامج؟",

      icon: "fa-box",

      level: "DATA",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Variable؟</h3>

                    <p>
                        المتغير هو اسم نستخدمه للإشارة إلى قيمة مخزنة
                        يمكن للبرنامج استخدامها أثناء التنفيذ.
                    </p>

                    <p>
                        في JavaScript يمكنك إنشاء المتغيرات باستخدام
                        <span class="term">let</span> و
                        <span class="term">const</span>.
                    </p>

                </section>

                <section class="lesson-section">

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>let</h4>
                            <p>
                                تستخدم عندما تتوقع أن تتغير القيمة.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>const</h4>
                            <p>
                                تستخدم عندما لا تريد إعادة إسناد القيمة.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "المتغير يجعل بيانات البرنامج قابلة للتسمية والاستخدام بدل التعامل مع القيم بطريقة عشوائية.",

      example: `let score = 100;

score = 150;

const username = "FAYAD";

console.log(username);
console.log(score);`,

      question: "أي كلمة تستخدم لتعريف متغير يمكن تغيير قيمته؟",

      answers: ["const", "let", "fixed", "change"],

      correct: 1,

      challenge: "أنشئ متغيرًا لاسم المستخدم ومتغيرًا آخر لعمره ثم اطبع الاثنين.",
    },

    8: {
      title: "أنواع البيانات",

      heading: "افهم نوع القيمة التي يتعامل معها برنامجك",

      icon: "fa-database",

      level: "DATA TYPES",

      content: `
                <section class="lesson-section">

                    <h3>لماذا توجد Data Types؟</h3>

                    <p>
                        البيانات ليست كلها من النوع نفسه. الرقم يختلف
                        عن النص، والقيمة المنطقية تختلف عن Array أو Object.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>String</h4>
                            <p>نص مثل "Hello".</p>
                        </div>

                        <div class="info-box">
                            <h4>Number</h4>
                            <p>رقم مثل 25.</p>
                        </div>

                        <div class="info-box">
                            <h4>Boolean</h4>
                            <p>true أو false.</p>
                        </div>

                        <div class="info-box">
                            <h4>Object</h4>
                            <p>مجموعة بيانات مرتبطة ببعضها.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "معرفة نوع البيانات مهمة لأن العمليات التي يمكن تنفيذها تعتمد على نوع القيمة.",

      example: `const name = "Abdullhamid";
const age = 20;
const isStudent = true;

console.log(typeof name);
console.log(typeof age);
console.log(typeof isStudent);`,

      question: "أي نوع يستخدم لتخزين true أو false؟",

      answers: ["String", "Number", "Boolean", "Array"],

      correct: 2,

      challenge: "أنشئ ثلاثة متغيرات: اسم، عمر، وحالة تسجيل الدخول.",
    },

    9: {
      title: "Operators",

      heading: "اجعل البرنامج ينفذ العمليات",

      icon: "fa-calculator",

      level: "OPERATORS",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Operator؟</h3>

                    <p>
                        Operators هي رموز أو كلمات تسمح لنا بتنفيذ
                        عمليات على القيم.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Arithmetic</h4>
                            <p>
                                + &nbsp; - &nbsp; * &nbsp; / &nbsp; %
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Comparison</h4>
                            <p>
                                === &nbsp; !== &nbsp; &gt; &nbsp; &lt;
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Logical</h4>
                            <p>
                                && &nbsp; || &nbsp; !
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Assignment</h4>
                            <p>
                                = &nbsp; += &nbsp; -=
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "Operators هي الأدوات التي تسمح للبرنامج بإجراء الحساب والمقارنة واتخاذ القرارات.",

      example: `const age = 20;

console.log(age >= 18);
console.log(age === 20);`,

      question: "ما نتيجة 10 + 5؟",

      answers: ["15", "105", "5", "10"],

      correct: 0,

      challenge: "اكتب برنامجًا يقارن عمر المستخدم بالسن القانوني.",
    },

    10: {
      title: "الشروط",

      heading: "اجعل البرنامج يتخذ قرارات",

      icon: "fa-code-branch",

      level: "CONTROL FLOW",

      content: `
                <section class="lesson-section">

                    <h3>Conditional Statements</h3>

                    <p>
                        الشروط تسمح للبرنامج بتنفيذ تعليمات مختلفة
                        بناءً على تحقق شرط معين.
                    </p>

                    <p>
                        في JavaScript نستخدم غالبًا
                        <span class="term">if</span> و
                        <span class="term">else</span>.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>الفكرة</h3>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>إذا تحقق الشرط</h4>
                            <p>نفذ مجموعة التعليمات الأولى.</p>
                        </div>

                        <div class="info-box">
                            <h4>إذا لم يتحقق</h4>
                            <p>انتقل إلى التعليمات البديلة.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "الشروط تحول البرنامج من مجموعة أوامر ثابتة إلى برنامج يستطيع اتخاذ قرارات.",

      example: `const score = 85;

if (score >= 50) {
    console.log("ناجح");
} else {
    console.log("حاول مرة أخرى");
}`,

      question: "ما الذي تستخدمه if؟",

      answers: ["لتخزين الصور", "لاتخاذ قرار بناءً على شرط", "لتكرار النص فقط", "لإنشاء ملف"],

      correct: 1,

      challenge: "اكتب شرطًا يطبع 'ناجح' إذا كانت الدرجة أكبر من أو تساوي 50.",
    },

    11: {
      title: "Loops",

      heading: "كرر التعليمات بدون تكرار الكود",

      icon: "fa-repeat",

      level: "LOOPS",

      content: `
                <section class="lesson-section">

                    <h3>لماذا نستخدم Loops؟</h3>

                    <p>
                        أحيانًا نحتاج لتنفيذ نفس العملية عدة مرات.
                        بدل كتابة الكود نفسه عشرات المرات،
                        نستخدم Loop.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>for</h4>
                            <p>
                                مناسبة عندما تعرف عدد مرات التكرار.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>while</h4>
                            <p>
                                تستمر طالما الشرط ما زال صحيحًا.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "Loop تجعل الكود أكثر كفاءة وتمنع تكرار التعليمات يدويًا.",

      example: `for (let i = 1; i <= 5; i++) {
    console.log(i);
}`,

      question: "ما الهدف من Loop؟",

      answers: ["تكرار تنفيذ تعليمات", "حذف المتغيرات", "إيقاف الكمبيوتر", "تغيير اللغة"],

      correct: 0,

      challenge: "اكتب Loop تطبع الأرقام من 1 إلى 10.",
    },

    12: {
      title: "Functions",

      heading: "اكتب مرة واستخدم الكود عدة مرات",

      icon: "fa-function",

      level: "FUNCTIONS",

      content: `
                <section class="lesson-section">

                    <h3>ما هي Function؟</h3>

                    <p>
                        Function هي كتلة من الكود مصممة لتنفيذ
                        مهمة محددة ويمكن استدعاؤها عند الحاجة.
                    </p>

                    <p>
                        استخدام Functions يساعد على تنظيم المشروع
                        وتقليل تكرار الكود.
                    </p>

                </section>

                <section class="lesson-section">

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Reusable</h4>
                            <p>يمكن إعادة استخدام الدالة أكثر من مرة.</p>
                        </div>

                        <div class="info-box">
                            <h4>Organized</h4>
                            <p>تجعل المشروع مقسمًا إلى أجزاء واضحة.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "Function تجمع مجموعة تعليمات تحت اسم واحد لتصبح سهلة الاستخدام وإعادة الاستخدام.",

      example: `function greet() {
    console.log("Welcome to FAYAD");
}

greet();`,

      question: "ما فائدة Function؟",

      answers: ["تكرار وتنظيم مجموعة تعليمات", "تغيير لون الشاشة", "زيادة سرعة الإنترنت", "حذف البرنامج"],

      correct: 0,

      challenge: "أنشئ Function باسم sayHello تطبع رسالة ترحيب.",
    },

    13: {
      title: "Parameters & Arguments",

      heading: "اجعل Functions أكثر مرونة",

      icon: "fa-sliders",

      level: "FUNCTIONS",

      content: `
                <section class="lesson-section">

                    <h3>Parameters</h3>

                    <p>
                        Parameter هو متغير تستقبله Function
                        لكي تتمكن من التعامل مع بيانات مختلفة.
                    </p>

                    <h3>Arguments</h3>

                    <p>
                        Argument هي القيمة الفعلية التي نرسلها
                        إلى Function عند استدعائها.
                    </p>

                </section>
            `,

      key: "Parameters تجعل Function قابلة لإعادة الاستخدام مع بيانات مختلفة بدل كتابة Function جديدة لكل حالة.",

      example: `function greet(name) {
    console.log("Hello " + name);
}

greet("Ali");
greet("Mona");`,

      question: "في المثال، ما هو name؟",

      answers: ["Argument", "Parameter", "Operator", "Loop"],

      correct: 1,

      challenge: "أنشئ Function تستقبل رقمين وتطبع مجموعهما.",
    },

    14: {
      title: "Scope",

      heading: "أين يمكن استخدام المتغير؟",

      icon: "fa-bullseye",

      level: "SCOPE",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Scope؟</h3>

                    <p>
                        Scope يحدد المكان الذي يمكن فيه الوصول
                        إلى المتغير واستخدامه.
                    </p>

                    <p>
                        المتغير الذي يتم تعريفه داخل Function
                        لا يمكن الوصول إليه عادةً من خارجها.
                    </p>

                </section>
            `,

      key: "Scope يساعد على منع تداخل البيانات وتقليل المشاكل الناتجة عن استخدام المتغيرات في أماكن غير مناسبة.",

      example: `function test() {

    let message = "Hello";

    console.log(message);
}

test();`,

      question: "ماذا يحدد Scope؟",

      answers: ["مكان إمكانية الوصول إلى المتغير", "سرعة البرنامج", "لون الكود", "حجم الشاشة"],

      correct: 0,

      challenge: "أنشئ متغيرًا داخل Function وحاول التفكير لماذا لا يمكن استخدامه مباشرة خارجها.",
    },

    15: {
      title: "Arrays",

      heading: "خزن مجموعة من القيم في مكان واحد",

      icon: "fa-layer-group",

      level: "DATA STRUCTURES",

      content: `
                <section class="lesson-section">

                    <h3>ما هي Array؟</h3>

                    <p>
                        Array هي بنية بيانات تسمح بتخزين عدة قيم
                        داخل متغير واحد.
                    </p>

                    <p>
                        يمكن الوصول إلى العناصر باستخدام Index،
                        ويبدأ الـ Index في JavaScript من الرقم 0.
                    </p>

                </section>
            `,

      key: "Array مناسبة عندما تحتاج إلى التعامل مع مجموعة عناصر مرتبطة ببعضها مثل أسماء المستخدمين أو المنتجات.",

      example: `const languages = [
    "HTML",
    "CSS",
    "JavaScript"
];

console.log(languages[0]);
console.log(languages[2]);`,

      question: "ما هو Index أول عنصر في Array؟",

      answers: ["0", "1", "-1", "10"],

      correct: 0,

      challenge: "أنشئ Array تحتوي على خمسة أسماء واطبع الاسم الثالث.",
    },

    16: {
      title: "Objects",

      heading: "نظم البيانات المرتبطة ببعضها",

      icon: "fa-cube",

      level: "DATA STRUCTURES",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Object؟</h3>

                    <p>
                        Object يستخدم لتجميع بيانات مرتبطة بكيان معين
                        باستخدام Properties وValues.
                    </p>

                    <p>
                        على سبيل المثال يمكن تمثيل مستخدم باستخدام
                        الاسم والعمر والبريد الإلكتروني.
                    </p>

                </section>
            `,

      key: "Objects تجعل البيانات المعقدة أكثر تنظيمًا لأنها تربط كل قيمة باسم واضح.",

      example: `const user = {
    name: "Abdullhamid",
    age: 20,
    role: "Developer"
};

console.log(user.name);
console.log(user.role);`,

      question: "ما الذي يستخدمه Object لتخزين البيانات؟",

      answers: ["Properties وValues", "Loops فقط", "صور فقط", "Files"],

      correct: 0,

      challenge: "أنشئ Object يمثل طالبًا يحتوي على name وage وgrade.",
    },

    17: {
      title: "الأخطاء وتصحيحها",

      heading: "الخطأ جزء طبيعي من حياة المبرمج",

      icon: "fa-bug",

      level: "DEBUGGING",

      content: `
                <section class="lesson-section">

                    <h3>لا يوجد مبرمج لا يواجه Errors</h3>

                    <p>
                        الأخطاء جزء طبيعي من عملية التطوير.
                        المبرمج المحترف لا يحاول تجنب جميع الأخطاء،
                        بل يتعلم كيف يقرأها ويحدد سببها ويصلحها.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Syntax Error</h4>
                            <p>مشكلة في قواعد كتابة الكود.</p>
                        </div>

                        <div class="info-box">
                            <h4>Runtime Error</h4>
                            <p>خطأ يحدث أثناء تشغيل البرنامج.</p>
                        </div>

                        <div class="info-box">
                            <h4>Logic Error</h4>
                            <p>الكود يعمل لكن النتيجة غير صحيحة.</p>
                        </div>

                        <div class="info-box">
                            <h4>Debugging</h4>
                            <p>عملية اكتشاف الأخطاء وإصلاحها.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "قراءة رسالة الخطأ وفهمها مهارة أساسية للمبرمج، وليست علامة على الفشل.",

      example: `const age = 20;

if (age > 18) {
    console.log("Adult");
}`,

      question: "ما معنى Debugging؟",

      answers: ["كتابة HTML", "اكتشاف الأخطاء وإصلاحها", "تصميم الصور", "رفع الموقع"],

      correct: 1,

      challenge: "تعمد كتابة Syntax Error بسيط ثم حاول تحديد مكان الخطأ من رسالة المتصفح.",
    },

    18: {
      title: "حل المشكلات",

      heading: "هذه هي المهارة التي تصنع المبرمج",

      icon: "fa-puzzle-piece",

      level: "PROBLEM SOLVING",

      content: `
                <section class="lesson-section">

                    <h3>لا تقفز إلى الحل</h3>

                    <p>
                        عندما تواجه مشكلة برمجية، لا تبدأ بتجربة
                        أكواد عشوائية. استخدم منهجًا واضحًا.
                    </p>

                    <div class="timeline">

                        <div class="timeline-item">
                            <span class="timeline-year">01</span>
                            <p>افهم المشكلة جيدًا.</p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">02</span>
                            <p>حدد المدخلات والمخرجات.</p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">03</span>
                            <p>قسّم المشكلة إلى أجزاء.</p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">04</span>
                            <p>صمم Algorithm.</p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">05</span>
                            <p>حوّل الحل إلى Code.</p>
                        </div>

                        <div class="timeline-item">
                            <span class="timeline-year">06</span>
                            <p>اختبر وعدّل.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "كلما تحسنت قدرتك على حل المشكلات، أصبحت قادرًا على تعلم لغات وتقنيات جديدة بسهولة أكبر.",

      example: `function calculateTotal(price, quantity) {

    return price * quantity;
}

console.log(
    calculateTotal(100, 3)
);`,

      question: "ما الخطوة التي تأتي قبل كتابة الكود؟",

      answers: ["شراء كمبيوتر", "فهم المشكلة وتصميم الحل", "فتح GitHub", "اختيار اللون"],

      correct: 1,

      challenge: "اختر مشكلة بسيطة مثل حساب فاتورة شراء، وحدد Input وProcess وOutput.",
    },

    19: {
      title: "Git ومفاهيمه",

      heading: "ابدأ بفهم Version Control",

      icon: "fa-code-branch",

      level: "DEVELOPER TOOLS",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Git؟</h3>

                    <p>
                        Git هو نظام Version Control يساعد المطورين
                        على تتبع التغييرات التي تحدث في المشروع.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Repository</h4>
                            <p>المكان الذي يحتوي على ملفات المشروع وتاريخه.</p>
                        </div>

                        <div class="info-box">
                            <h4>Commit</h4>
                            <p>تسجيل مجموعة من التغييرات في تاريخ المشروع.</p>
                        </div>

                        <div class="info-box">
                            <h4>Branch</h4>
                            <p>مسار مستقل لتطوير ميزة أو تجربة.</p>
                        </div>

                        <div class="info-box">
                            <h4>GitHub</h4>
                            <p>منصة شهيرة لاستضافة مشاريع Git والتعاون عليها.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "Git ليس لغة برمجة؛ هو أداة لإدارة إصدارات المشروع وتتبع التغييرات.",

      example: `git init

git add .

git commit -m "Initial commit"`,

      question: "ما وظيفة Git الأساسية؟",

      answers: ["تصميم واجهات", "إدارة وتتبع إصدارات المشروع", "تشغيل الإنترنت", "إنشاء صور"],

      correct: 1,

      challenge: "تعلم الفرق بين Repository وCommit وBranch قبل الانتقال للمستوى التالي.",
    },

    20: {
      title: "مراجعة شاملة",

      heading: "أنت الآن تملك أساس التفكير البرمجي",

      icon: "fa-graduation-cap",

      level: "REVIEW",

      content: `
                <section class="lesson-section">

                    <h3>ماذا تعلمت؟</h3>

                    <p>
                        خلال هذا المسار تعرفت على الأساسيات التي
                        تحتاجها قبل التعمق في أي لغة أو مجال برمجي.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Thinking</h4>
                            <p>التفكير البرمجي وتحليل المشكلات.</p>
                        </div>

                        <div class="info-box">
                            <h4>Algorithms</h4>
                            <p>تحويل الحل إلى خطوات.</p>
                        </div>

                        <div class="info-box">
                            <h4>Data</h4>
                            <p>Variables وData Types وArrays وObjects.</p>
                        </div>

                        <div class="info-box">
                            <h4>Logic</h4>
                            <p>Conditions وLoops وFunctions.</p>
                        </div>

                        <div class="info-box">
                            <h4>Debugging</h4>
                            <p>فهم الأخطاء وإصلاحها.</p>
                        </div>

                        <div class="info-box">
                            <h4>Git</h4>
                            <p>أساسيات Version Control.</p>
                        </div>

                    </div>

                </section>

                <section class="lesson-section">

                    <h3>
                        الخطوة التالية
                    </h3>

                    <p>
                        بعد إنهاء هذا المسار، ستكون جاهزًا للانتقال
                        إلى Web Fundamentals ثم HTML وCSS وJavaScript
                        بشكل أكثر عمقًا.
                    </p>

                </section>
            `,

      key: "الهدف من هذا المسار ليس أن تصبح محترفًا في لغة معينة، بل أن تبني الأساس الذي ستتعلم فوقه كل شيء لاحقًا.",

      example: `const learner = {
    foundation: true,
    thinking: "problem solving",
    next: "Web Fundamentals"
};

console.log(learner);`,

      question: "ما أهم شيء يجب أن تخرج به من هذا المسار؟",

      answers: ["حفظ كل Syntax", "التفكير المنطقي وحل المشكلات", "حفظ أسماء اللغات", "كتابة أكبر عدد من الأسطر"],

      correct: 1,

      challenge: "قبل الاختبار النهائي، راجع الدروس السابقة وحاول شرح كل مفهوم بكلماتك أنت.",
    },
  };

  /* =====================================================
       FINAL QUIZ DATA
    ====================================================== */

  const finalQuestions = [
    {
      question: "ما الهدف الأساسي من البرمجة؟",

      options: ["كتابة نصوص كثيرة", "إعطاء الكمبيوتر تعليمات لتنفيذ مهام", "تصميم الصور", "زيادة سرعة الإنترنت"],

      correct: 1,
    },

    {
      question: "ما المقصود بـ Algorithm؟",

      options: ["لغة برمجة", "مجموعة خطوات لحل مشكلة", "نوع من الملفات", "برنامج حماية"],

      correct: 1,
    },

    {
      question: "أي نوع يمثل true وfalse؟",

      options: ["String", "Number", "Boolean", "Array"],

      correct: 2,
    },

    {
      question: "ما فائدة Function؟",

      options: ["تنظيم وإعادة استخدام الكود", "تغيير نظام التشغيل", "حذف البيانات", "زيادة مساحة القرص"],

      correct: 0,
    },

    {
      question: "ما الهدف من Loop؟",

      options: ["تكرار تنفيذ تعليمات", "إنشاء صورة", "إيقاف البرنامج", "تغيير اللغة"],

      correct: 0,
    },

    {
      question: "ما هو Debugging؟",

      options: ["تصميم الموقع", "اكتشاف الأخطاء وإصلاحها", "كتابة CSS", "رفع الملفات"],

      correct: 1,
    },

    {
      question: "ما وظيفة Git؟",

      options: ["إدارة وتتبع إصدارات المشروع", "تشغيل الفيديو", "إنشاء قواعد البيانات فقط", "تصميم الواجهات"],

      correct: 0,
    },

    {
      question: "في JavaScript، ما Index أول عنصر في Array؟",

      options: ["0", "1", "-1", "10"],

      correct: 0,
    },
  ];

  /* =====================================================
       SAVE PROGRESS
    ====================================================== */

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
  }

  /* =====================================================
       UPDATE PROGRESS
    ====================================================== */

  function updateProgress() {
    const total = Object.keys(lessons).length;

    const completed = completedLessons.length;

    const percent = Math.round((completed / total) * 100);

    progressFill.style.width = `${percent}%`;

    progressPercent.textContent = `${percent}%`;

    if (percent === 0) {
      progressText.textContent = "لم تبدأ بعد — هيا نبدأ 🚀";
    } else if (percent < 50) {
      progressText.textContent = `أكملت ${completed} من ${total} دروس`;
    } else if (percent < 100) {
      progressText.textContent = `ممتاز! بقي ${total - completed} دروس`;
    } else {
      progressText.textContent = "أكملت المسار بالكامل! 🎉";
    }

    lessonItems.forEach((item) => {
      const number = item.dataset.lesson;

      if (number !== "final" && completedLessons.includes(Number(number))) {
        item.classList.add("completed");

        const numberElement = item.querySelector(".lesson-number");

        if (numberElement) {
          numberElement.innerHTML = '<i class="fa-solid fa-check"></i>';
        }
      }
    });
  }

  /* =====================================================
       LOAD LESSON
    ====================================================== */

  function loadLesson(number) {
    if (number === "final") {
      openFinalQuiz();

      return;
    }

    const lesson = lessons[number];

    if (!lesson) return;

    currentLesson = Number(number);

    quizAnswered = false;

    lessonCounter.textContent = `الدرس ${String(number).padStart(2, "0")} من 20`;

    lessonTitle.textContent = lesson.title;

    lessonHeading.textContent = lesson.heading;

    lessonIcon.className = `fa-solid ${lesson.icon}`;

    lessonLevel.textContent = lesson.level;

    lessonContent.innerHTML = lesson.content;

    keyDescription.textContent = lesson.key;

    exampleCode.textContent = lesson.example;

    challengeText.textContent = lesson.challenge;

    renderQuiz(lesson);

    loadEditor(lesson.example);

    updateLessonStatus();

    updateNavigation();

    lessonItems.forEach((item) => {
      item.classList.remove("active");

      if (item.dataset.lesson === String(number)) {
        item.classList.add("active");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    updateProgress();
  }

  /* =====================================================
       QUIZ
    ====================================================== */

  function renderQuiz(lesson) {
    quizQuestion.textContent = lesson.question;

    quizOptions.innerHTML = "";

    quizResult.textContent = "";

    quizResult.className = "quiz-result";

    lesson.answers.forEach((answer, index) => {
      const button = document.createElement("button");

      button.type = "button";

      button.className = "quiz-btn";

      button.textContent = answer;

      button.addEventListener("click", () => {
        if (quizAnswered) return;

        quizAnswered = true;

        if (index === lesson.correct) {
          button.classList.add("correct");

          quizResult.textContent = "✓ إجابة صحيحة! أحسنت.";

          quizResult.classList.add("success");
        } else {
          button.classList.add("wrong");

          quizResult.textContent = "✕ ليست الإجابة الصحيحة. راجع الفكرة وحاول مرة أخرى.";

          quizResult.classList.add("error");

          const correctButton = quizOptions.children[lesson.correct];

          if (correctButton) {
            correctButton.classList.add("correct");
          }
        }
      });

      quizOptions.appendChild(button);
    });
  }

  /* =====================================================
       EDITOR
    ====================================================== */

  let currentStarterCode = "";

  function loadEditor(code) {
    currentStarterCode = code;

    codeEditor.value = code;

    consoleOutput.innerHTML = `<span class="console-placeholder">
                نتيجة الكود ستظهر هنا...
            </span>`;
  }

  /* =====================================================
       RUN CODE
    ====================================================== */

  function runUserCode() {
    const code = codeEditor.value;

    consoleOutput.textContent = "⏳ جاري تشغيل الكود...";

    consoleOutput.style.color = "#facc15";

    setTimeout(() => {
      try {
        const logs = [];

        const fakeConsole = {
          log: (...args) => {
            logs.push(
              args
                .map((value) => {
                  if (typeof value === "object") {
                    return JSON.stringify(value, null, 2);
                  }

                  return String(value);
                })
                .join(" "),
            );
          },

          error: (...args) => {
            logs.push("Error: " + args.join(" "));
          },
        };

        const execute = new Function("console", code);

        execute(fakeConsole);

        if (!logs.length) {
          consoleOutput.textContent = "✓ تم تنفيذ الكود بدون Output.";
        } else {
          consoleOutput.textContent = logs.join("\n");
        }

        consoleOutput.style.color = "#34d399";
      } catch (error) {
        consoleOutput.textContent = `✕ ${error.message}`;

        consoleOutput.style.color = "#fca5a5";
      }
    }, 350);
  }

  /* =====================================================
       RESET CODE
    ====================================================== */

  function resetCode() {
    codeEditor.value = currentStarterCode;

    consoleOutput.innerHTML = `<span class="console-placeholder">
                تم إعادة الكود إلى الحالة الأصلية.
            </span>`;

    consoleOutput.style.color = "";
  }

  /* =====================================================
       COPY EXAMPLE
    ====================================================== */

  async function copyExample() {
    try {
      await navigator.clipboard.writeText(exampleCode.textContent);

      copyExampleBtn.innerHTML = '<i class="fa-solid fa-check"></i> تم النسخ';

      setTimeout(() => {
        copyExampleBtn.innerHTML = '<i class="fa-regular fa-copy"></i> نسخ';
      }, 1500);
    } catch (error) {
      copyExampleBtn.textContent = "تعذر النسخ";
    }
  }

  /* =====================================================
       COMPLETE LESSON
    ====================================================== */

  function completeLesson() {
    if (!completedLessons.includes(currentLesson)) {
      completedLessons.push(currentLesson);

      completedLessons.sort((a, b) => a - b);

      saveProgress();
    }

    updateProgress();

    updateLessonStatus();

    showCompletionAnimation();
  }

  /* =====================================================
       COMPLETION ANIMATION
    ====================================================== */

  function showCompletionAnimation() {
    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> تم إتمام الدرس';

    completeBtn.classList.add("completed");

    lessonStatus.textContent = "✓ مكتمل";

    lessonStatus.classList.add("completed");

    setTimeout(() => {
      if (currentLesson < 20) {
        nextBtn.focus();
      }
    }, 300);
  }

  /* =====================================================
       LESSON STATUS
    ====================================================== */

  function updateLessonStatus() {
    const completed = completedLessons.includes(currentLesson);

    if (completed) {
      lessonStatus.textContent = "✓ مكتمل";

      lessonStatus.classList.add("completed");

      completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> تم إتمام الدرس';

      completeBtn.classList.add("completed");
    } else {
      lessonStatus.textContent = "غير مكتمل";

      lessonStatus.classList.remove("completed");

      completeBtn.innerHTML = '<i class="fa-solid fa-check"></i> إتمام الدرس';

      completeBtn.classList.remove("completed");
    }
  }

  /* =====================================================
       NAVIGATION
    ====================================================== */

  function updateNavigation() {
    prevBtn.disabled = currentLesson <= 1;

    nextBtn.disabled = currentLesson >= 20;

    if (currentLesson >= 20) {
      nextBtn.innerHTML = 'الاختبار النهائي <i class="fa-solid fa-trophy"></i>';

      nextBtn.disabled = false;
    } else {
      nextBtn.innerHTML = 'الدرس التالي <i class="fa-solid fa-arrow-left"></i>';
    }
  }

  /* =====================================================
       PREVIOUS
    ====================================================== */

  function previousLesson() {
    if (currentLesson > 1) {
      loadLesson(currentLesson - 1);
    }
  }

  /* =====================================================
       NEXT
    ====================================================== */

  function nextLesson() {
    if (currentLesson < 20) {
      loadLesson(currentLesson + 1);
    } else {
      openFinalQuiz();
    }
  }

  /* =====================================================
       FINAL QUIZ
    ====================================================== */

  function openFinalQuiz() {
    finalQuestionIndex = 0;

    finalScore = 0;

    selectedFinalAnswer = null;

    finalQuizModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    renderFinalQuestion();
  }

  function closeQuiz() {
    finalQuizModal.classList.add("hidden");

    document.body.style.overflow = "";
  }

  function renderFinalQuestion() {
    const question = finalQuestions[finalQuestionIndex];

    selectedFinalAnswer = null;

    finalQuestionArea.innerHTML = `

            <div class="final-question">
                ${finalQuestionIndex + 1}.
                ${question.question}
            </div>

            <div class="final-options">

                ${question.options
                  .map(
                    (option, index) => `
                            <button
                                type="button"
                                class="final-option"
                                data-index="${index}"
                            >
                                ${option}
                            </button>
                        `,
                  )
                  .join("")}

            </div>
        `;

    finalQuestionArea.querySelectorAll(".final-option").forEach((button) => {
      button.addEventListener("click", () => {
        finalQuestionArea.querySelectorAll(".final-option").forEach((item) => item.classList.remove("selected"));

        button.classList.add("selected");

        selectedFinalAnswer = Number(button.dataset.index);
      });
    });

    const progress = (finalQuestionIndex / finalQuestions.length) * 100;

    finalProgressFill.style.width = `${progress}%`;

    finalNextBtn.textContent = finalQuestionIndex === finalQuestions.length - 1 ? "إنهاء الاختبار" : "السؤال التالي";
  }

  /* =====================================================
       FINAL NEXT
    ====================================================== */

  function nextFinalQuestion() {
    if (selectedFinalAnswer === null) {
      finalQuestionArea.animate(
        [
          {
            transform: "translateX(0)",
          },
          {
            transform: "translateX(-5px)",
          },
          {
            transform: "translateX(5px)",
          },
          {
            transform: "translateX(0)",
          },
        ],
        {
          duration: 250,
        },
      );

      return;
    }

    const current = finalQuestions[finalQuestionIndex];

    if (selectedFinalAnswer === current.correct) {
      finalScore++;
    }

    finalQuestionIndex++;

    if (finalQuestionIndex >= finalQuestions.length) {
      finishFinalQuiz();
    } else {
      renderFinalQuestion();
    }
  }

  /* =====================================================
       FINAL RESULT
    ====================================================== */

  function finishFinalQuiz() {
    const total = finalQuestions.length;

    const percentage = Math.round((finalScore / total) * 100);

    finalProgressFill.style.width = "100%";

    let message = "";

    if (percentage >= 90) {
      message = "ممتاز جدًا! أساسك البرمجي قوي. 🔥";
    } else if (percentage >= 70) {
      message = "أداء رائع! أنت جاهز للخطوة التالية.";
    } else if (percentage >= 50) {
      message = "نتيجة جيدة، لكن من الأفضل مراجعة بعض الدروس.";
    } else {
      message = "لا مشكلة. راجع المسار مرة أخرى وستتحسن.";
    }

    finalQuestionArea.innerHTML = `

            <div class="final-icon">
                <i class="fa-solid fa-trophy"></i>
            </div>

            <h3 style="color:#fff;margin-bottom:10px;">
                نتيجتك
            </h3>

            <p style="color:#34d399;font-size:2rem;font-weight:800;">
                ${finalScore} / ${total}
            </p>

            <p style="color:#94a3b8;margin-top:10px;">
                ${percentage}%
            </p>

            <p style="color:#d1d5db;margin-top:15px;">
                ${message}
            </p>
        `;

    finalNextBtn.textContent = "إغلاق";

    finalNextBtn.onclick = closeQuiz;

    if (percentage >= 70) {
      completedLessons = Array.from(
        {
          length: 20,
        },
        (_, index) => index + 1,
      );

      saveProgress();

      updateProgress();
    }
  }

  /* =====================================================
       EVENT LISTENERS
    ====================================================== */

  lessonItems.forEach((item) => {
    item.addEventListener("click", () => {
      const lesson = item.dataset.lesson;

      loadLesson(lesson);
    });
  });

  prevBtn.addEventListener("click", previousLesson);

  nextBtn.addEventListener("click", nextLesson);

  completeBtn.addEventListener("click", completeLesson);

  runCodeBtn.addEventListener("click", runUserCode);

  resetCodeBtn.addEventListener("click", resetCode);

  copyExampleBtn.addEventListener("click", copyExample);

  closeFinalQuiz.addEventListener("click", closeQuiz);

  finalNextBtn.addEventListener("click", nextFinalQuestion);

  /* =====================================================
       ESCAPE MODAL
    ====================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !finalQuizModal.classList.contains("hidden")) {
      closeQuiz();
    }
  });

  /* =====================================================
       INITIALIZE
    ====================================================== */

  updateProgress();

  loadLesson(1);

  console.log(
    "%c FAYAD — Programming Fundamentals Loaded Successfully ",
    "background:#064e3b;color:#34d399;padding:7px;border-radius:6px;font-weight:bold;",
  );
});
