// Programming Fundamentals content, shared lesson schema (see docs/lesson-schema.md).
// Generated once from the legacy implementation by tools/convert-prg-track.mjs; now hand-maintained.

export const track = {
  id: "prg",
  runtime: "js",
  layout: "foundation",
  groups: [
    {
      id: "prg-g1",
      title: {
        ar: "أساسيات البرمجة",
      },
      lessons: [
        "prg-01",
        "prg-02",
        "prg-03",
        "prg-04",
        "prg-05",
        "prg-06",
        "prg-07",
        "prg-08",
        "prg-09",
        "prg-10",
        "prg-11",
        "prg-12",
        "prg-13",
        "prg-14",
        "prg-15",
        "prg-16",
        "prg-17",
        "prg-18",
        "prg-19",
        "prg-20",
      ],
    },
  ],
  assessment: {
    id: "prg-final",
    title: {
      ar: "الاختبار النهائي",
    },
    passPercent: 70,
    questions: [
      {
        question: {
          ar: "ما الهدف الأساسي من البرمجة؟",
        },
        options: [
          {
            ar: "كتابة نصوص كثيرة",
          },
          {
            ar: "إعطاء الكمبيوتر تعليمات لتنفيذ مهام",
          },
          {
            ar: "تصميم الصور",
          },
          {
            ar: "زيادة سرعة الإنترنت",
          },
        ],
        correct: 1,
      },
      {
        question: {
          ar: "ما المقصود بـ Algorithm؟",
        },
        options: [
          {
            ar: "لغة برمجة",
          },
          {
            ar: "مجموعة خطوات لحل مشكلة",
          },
          {
            ar: "نوع من الملفات",
          },
          {
            ar: "برنامج حماية",
          },
        ],
        correct: 1,
      },
      {
        question: {
          ar: "أي نوع يمثل true وfalse؟",
        },
        options: [
          {
            ar: "String",
          },
          {
            ar: "Number",
          },
          {
            ar: "Boolean",
          },
          {
            ar: "Array",
          },
        ],
        correct: 2,
      },
      {
        question: {
          ar: "ما فائدة Function؟",
        },
        options: [
          {
            ar: "تنظيم وإعادة استخدام الكود",
          },
          {
            ar: "تغيير نظام التشغيل",
          },
          {
            ar: "حذف البيانات",
          },
          {
            ar: "زيادة مساحة القرص",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الهدف من Loop؟",
        },
        options: [
          {
            ar: "تكرار تنفيذ تعليمات",
          },
          {
            ar: "إنشاء صورة",
          },
          {
            ar: "إيقاف البرنامج",
          },
          {
            ar: "تغيير اللغة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هو Debugging؟",
        },
        options: [
          {
            ar: "تصميم الموقع",
          },
          {
            ar: "اكتشاف الأخطاء وإصلاحها",
          },
          {
            ar: "كتابة CSS",
          },
          {
            ar: "رفع الملفات",
          },
        ],
        correct: 1,
      },
      {
        question: {
          ar: "ما وظيفة Git؟",
        },
        options: [
          {
            ar: "إدارة وتتبع إصدارات المشروع",
          },
          {
            ar: "تشغيل الفيديو",
          },
          {
            ar: "إنشاء قواعد البيانات فقط",
          },
          {
            ar: "تصميم الواجهات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "في JavaScript، ما Index أول عنصر في Array؟",
        },
        options: [
          {
            ar: "0",
          },
          {
            ar: "1",
          },
          {
            ar: "-1",
          },
          {
            ar: "10",
          },
        ],
        correct: 0,
      },
    ],
  },
};

export const lessons = [
  {
    id: "prg-01",
    title: {
      ar: "ما هي البرمجة؟",
    },
    heading: {
      ar: "ابدأ بفهم الفكرة قبل كتابة الكود",
    },
    icon: "fa-terminal",
    level: {
      ar: "FOUNDATION",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "المبرمج الجيد لا يبدأ بالكود مباشرة؛ يبدأ بفهم المشكلة ثم يبني الحل خطوة بخطوة.",
    },
    example: {
      code: `const age = 20;

if (age >= 18) {
    console.log("يمكنك التسجيل");
}`,
    },
    challenge: {
      ar: "فكر في مهمة يومية مثل إعداد كوب من القهوة، وحوّلها إلى خطوات مرتبة كما لو كنت تشرحها للكمبيوتر.",
    },
    quiz: [
      {
        question: {
          ar: "ما الهدف الأساسي من البرمجة؟",
        },
        options: [
          {
            ar: "كتابة نصوص طويلة",
          },
          {
            ar: "إعطاء الكمبيوتر تعليمات لتنفيذ مهمة",
          },
          {
            ar: "حفظ أوامر اللغة",
          },
          {
            ar: "تصميم الصور فقط",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-02",
    title: {
      ar: "كيف يعمل الكود؟",
    },
    heading: {
      ar: "من الكود الذي تكتبه إلى النتيجة",
    },
    icon: "fa-gears",
    level: {
      ar: "CORE CONCEPT",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "الكود هو الوسيلة التي نستخدمها لوصف خطوات الحل، والكمبيوتر ينفذ هذه الخطوات وفق القواعد التي تحددها اللغة.",
    },
    example: {
      code: `let x = 10;
let y = 5;

let result = x + y;

console.log(result);`,
    },
    challenge: {
      ar: "اشرح بكلماتك الفرق بين الكود الذي تكتبه والعملية التي ينفذها الكمبيوتر.",
    },
    quiz: [
      {
        question: {
          ar: "ماذا يحدث بعد كتابة الكود؟",
        },
        options: [
          {
            ar: "ينفذه الكمبيوتر بطريقة عشوائية",
          },
          {
            ar: "يتم تحليله ثم تنفيذه",
          },
          {
            ar: "يُحذف تلقائيًا",
          },
          {
            ar: "يتحول إلى صورة",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-03",
    title: {
      ar: "التفكير البرمجي",
    },
    heading: {
      ar: "تعلم طريقة التفكير قبل تعلم اللغة",
    },
    icon: "fa-brain",
    level: {
      ar: "PROBLEM SOLVING",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "التفكير البرمجي مهارة مستقلة عن لغة البرمجة؛ يمكنك استخدام نفس طريقة التفكير مع JavaScript أو Python أو C++.",
    },
    example: {
      code: `const tasks = [
    "فتح التطبيق",
    "تسجيل الدخول",
    "اختيار الدرس",
    "بدء التعلم"
];

console.log(tasks);`,
    },
    challenge: {
      ar: "خذ مشروعًا مثل متجر إلكتروني، وقسمه إلى أجزاء صغيرة مثل المستخدمين والمنتجات والدفع.",
    },
    quiz: [
      {
        question: {
          ar: "ما معنى Decomposition؟",
        },
        options: [
          {
            ar: "كتابة الكود بسرعة",
          },
          {
            ar: "تقسيم المشكلة إلى أجزاء أصغر",
          },
          {
            ar: "حذف المشكلة",
          },
          {
            ar: "اختيار لغة البرمجة",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-04",
    title: {
      ar: "الخوارزميات",
    },
    heading: {
      ar: "حوّل الحل إلى خطوات واضحة",
    },
    icon: "fa-list-ol",
    level: {
      ar: "ALGORITHMS",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "الخوارزمية تصف طريقة الحل، بينما الكود يترجم هذه الطريقة إلى لغة يستطيع الكمبيوتر تنفيذها.",
    },
    example: {
      code: `let a = 10;
let b = 20;

let sum = a + b;

console.log(sum);`,
    },
    challenge: {
      ar: "اكتب خوارزمية بسيطة لحساب متوسط ثلاثة أرقام.",
    },
    quiz: [
      {
        question: {
          ar: "ما الذي تصفه الخوارزمية؟",
        },
        options: [
          {
            ar: "لون الموقع",
          },
          {
            ar: "خطوات حل المشكلة",
          },
          {
            ar: "نوع الشاشة",
          },
          {
            ar: "حجم الملف",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-05",
    title: {
      ar: "لغات البرمجة",
    },
    heading: {
      ar: "لماذا توجد لغات برمجة كثيرة؟",
    },
    icon: "fa-language",
    level: {
      ar: "LANGUAGES",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "لا توجد لغة برمجة واحدة هي الأفضل لكل شيء؛ اختيار اللغة يعتمد على المشكلة والمنصة ومتطلبات المشروع.",
    },
    example: {
      code: `let language = "JavaScript";

console.log(
    "I am learning " + language
);`,
    },
    challenge: {
      ar: "ابحث ذهنيًا عن ثلاثة مجالات مختلفة واختر لغة مناسبة لكل مجال.",
    },
    quiz: [
      {
        question: {
          ar: "لماذا توجد لغات برمجة متعددة؟",
        },
        options: [
          {
            ar: "لأن كل اللغات متطابقة",
          },
          {
            ar: "لأن لكل لغة استخدامات وخصائص مختلفة",
          },
          {
            ar: "لزيادة حجم الملفات",
          },
          {
            ar: "لأن الكمبيوتر لا يستطيع التعلم",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-06",
    title: {
      ar: "Syntax",
    },
    heading: {
      ar: "قواعد اللغة التي تكتب بها الكود",
    },
    icon: "fa-code",
    level: {
      ar: "SYNTAX",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Syntax تحدد كيف يجب أن تكتب الكود، بينما Logic تحدد هل الكود يحل المشكلة بالطريقة الصحيحة أم لا.",
    },
    example: {
      code: `const name = "FAYAD";

console.log(name);`,
    },
    challenge: {
      ar: "اكتب سطر JavaScript صحيحًا يعرّف متغيرًا باسم username.",
    },
    quiz: [
      {
        question: {
          ar: "ما المقصود بـ Syntax؟",
        },
        options: [
          {
            ar: "قواعد كتابة الكود",
          },
          {
            ar: "سرعة الكمبيوتر",
          },
          {
            ar: "حجم البرنامج",
          },
          {
            ar: "نوع المعالج",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "prg-07",
    title: {
      ar: "المتغيرات",
    },
    heading: {
      ar: "كيف نخزن المعلومات داخل البرنامج؟",
    },
    icon: "fa-box",
    level: {
      ar: "DATA",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "المتغير يجعل بيانات البرنامج قابلة للتسمية والاستخدام بدل التعامل مع القيم بطريقة عشوائية.",
    },
    example: {
      code: `let score = 100;

score = 150;

const username = "FAYAD";

console.log(username);
console.log(score);`,
    },
    challenge: {
      ar: "أنشئ متغيرًا لاسم المستخدم ومتغيرًا آخر لعمره ثم اطبع الاثنين.",
    },
    quiz: [
      {
        question: {
          ar: "أي كلمة تستخدم لتعريف متغير يمكن تغيير قيمته؟",
        },
        options: [
          {
            ar: "const",
          },
          {
            ar: "let",
          },
          {
            ar: "fixed",
          },
          {
            ar: "change",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-08",
    title: {
      ar: "أنواع البيانات",
    },
    heading: {
      ar: "افهم نوع القيمة التي يتعامل معها برنامجك",
    },
    icon: "fa-database",
    level: {
      ar: "DATA TYPES",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "معرفة نوع البيانات مهمة لأن العمليات التي يمكن تنفيذها تعتمد على نوع القيمة.",
    },
    example: {
      code: `const name = "Abdullhamid";
const age = 20;
const isStudent = true;

console.log(typeof name);
console.log(typeof age);
console.log(typeof isStudent);`,
    },
    challenge: {
      ar: "أنشئ ثلاثة متغيرات: اسم، عمر، وحالة تسجيل الدخول.",
    },
    quiz: [
      {
        question: {
          ar: "أي نوع يستخدم لتخزين true أو false؟",
        },
        options: [
          {
            ar: "String",
          },
          {
            ar: "Number",
          },
          {
            ar: "Boolean",
          },
          {
            ar: "Array",
          },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "prg-09",
    title: {
      ar: "Operators",
    },
    heading: {
      ar: "اجعل البرنامج ينفذ العمليات",
    },
    icon: "fa-calculator",
    level: {
      ar: "OPERATORS",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Operators هي الأدوات التي تسمح للبرنامج بإجراء الحساب والمقارنة واتخاذ القرارات.",
    },
    example: {
      code: `const age = 20;

console.log(age >= 18);
console.log(age === 20);`,
    },
    challenge: {
      ar: "اكتب برنامجًا يقارن عمر المستخدم بالسن القانوني.",
    },
    quiz: [
      {
        question: {
          ar: "ما نتيجة 10 + 5؟",
        },
        options: [
          {
            ar: "15",
          },
          {
            ar: "105",
          },
          {
            ar: "5",
          },
          {
            ar: "10",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "prg-10",
    title: {
      ar: "الشروط",
    },
    heading: {
      ar: "اجعل البرنامج يتخذ قرارات",
    },
    icon: "fa-code-branch",
    level: {
      ar: "CONTROL FLOW",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "الشروط تحول البرنامج من مجموعة أوامر ثابتة إلى برنامج يستطيع اتخاذ قرارات.",
    },
    example: {
      code: `const score = 85;

if (score >= 50) {
    console.log("ناجح");
} else {
    console.log("حاول مرة أخرى");
}`,
    },
    challenge: {
      ar: "اكتب شرطًا يطبع 'ناجح' إذا كانت الدرجة أكبر من أو تساوي 50.",
    },
    quiz: [
      {
        question: {
          ar: "ما الذي تستخدمه if؟",
        },
        options: [
          {
            ar: "لتخزين الصور",
          },
          {
            ar: "لاتخاذ قرار بناءً على شرط",
          },
          {
            ar: "لتكرار النص فقط",
          },
          {
            ar: "لإنشاء ملف",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-11",
    title: {
      ar: "Loops",
    },
    heading: {
      ar: "كرر التعليمات بدون تكرار الكود",
    },
    icon: "fa-repeat",
    level: {
      ar: "LOOPS",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Loop تجعل الكود أكثر كفاءة وتمنع تكرار التعليمات يدويًا.",
    },
    example: {
      code: `for (let i = 1; i <= 5; i++) {
    console.log(i);
}`,
    },
    challenge: {
      ar: "اكتب Loop تطبع الأرقام من 1 إلى 10.",
    },
    quiz: [
      {
        question: {
          ar: "ما الهدف من Loop؟",
        },
        options: [
          {
            ar: "تكرار تنفيذ تعليمات",
          },
          {
            ar: "حذف المتغيرات",
          },
          {
            ar: "إيقاف الكمبيوتر",
          },
          {
            ar: "تغيير اللغة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "prg-12",
    title: {
      ar: "Functions",
    },
    heading: {
      ar: "اكتب مرة واستخدم الكود عدة مرات",
    },
    icon: "fa-function",
    level: {
      ar: "FUNCTIONS",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Function تجمع مجموعة تعليمات تحت اسم واحد لتصبح سهلة الاستخدام وإعادة الاستخدام.",
    },
    example: {
      code: `function greet() {
    console.log("Welcome to FAYAD");
}

greet();`,
    },
    challenge: {
      ar: "أنشئ Function باسم sayHello تطبع رسالة ترحيب.",
    },
    quiz: [
      {
        question: {
          ar: "ما فائدة Function؟",
        },
        options: [
          {
            ar: "تكرار وتنظيم مجموعة تعليمات",
          },
          {
            ar: "تغيير لون الشاشة",
          },
          {
            ar: "زيادة سرعة الإنترنت",
          },
          {
            ar: "حذف البرنامج",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "prg-13",
    title: {
      ar: "Parameters & Arguments",
    },
    navTitle: {
      ar: "Parameters",
    },
    heading: {
      ar: "اجعل Functions أكثر مرونة",
    },
    icon: "fa-sliders",
    level: {
      ar: "FUNCTIONS",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Parameters تجعل Function قابلة لإعادة الاستخدام مع بيانات مختلفة بدل كتابة Function جديدة لكل حالة.",
    },
    example: {
      code: `function greet(name) {
    console.log("Hello " + name);
}

greet("Ali");
greet("Mona");`,
    },
    challenge: {
      ar: "أنشئ Function تستقبل رقمين وتطبع مجموعهما.",
    },
    quiz: [
      {
        question: {
          ar: "في المثال، ما هو name؟",
        },
        options: [
          {
            ar: "Argument",
          },
          {
            ar: "Parameter",
          },
          {
            ar: "Operator",
          },
          {
            ar: "Loop",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-14",
    title: {
      ar: "Scope",
    },
    heading: {
      ar: "أين يمكن استخدام المتغير؟",
    },
    icon: "fa-bullseye",
    level: {
      ar: "SCOPE",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Scope يساعد على منع تداخل البيانات وتقليل المشاكل الناتجة عن استخدام المتغيرات في أماكن غير مناسبة.",
    },
    example: {
      code: `function test() {

    let message = "Hello";

    console.log(message);
}

test();`,
    },
    challenge: {
      ar: "أنشئ متغيرًا داخل Function وحاول التفكير لماذا لا يمكن استخدامه مباشرة خارجها.",
    },
    quiz: [
      {
        question: {
          ar: "ماذا يحدد Scope؟",
        },
        options: [
          {
            ar: "مكان إمكانية الوصول إلى المتغير",
          },
          {
            ar: "سرعة البرنامج",
          },
          {
            ar: "لون الكود",
          },
          {
            ar: "حجم الشاشة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "prg-15",
    title: {
      ar: "Arrays",
    },
    heading: {
      ar: "خزن مجموعة من القيم في مكان واحد",
    },
    icon: "fa-layer-group",
    level: {
      ar: "DATA STRUCTURES",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Array مناسبة عندما تحتاج إلى التعامل مع مجموعة عناصر مرتبطة ببعضها مثل أسماء المستخدمين أو المنتجات.",
    },
    example: {
      code: `const languages = [
    "HTML",
    "CSS",
    "JavaScript"
];

console.log(languages[0]);
console.log(languages[2]);`,
    },
    challenge: {
      ar: "أنشئ Array تحتوي على خمسة أسماء واطبع الاسم الثالث.",
    },
    quiz: [
      {
        question: {
          ar: "ما هو Index أول عنصر في Array؟",
        },
        options: [
          {
            ar: "0",
          },
          {
            ar: "1",
          },
          {
            ar: "-1",
          },
          {
            ar: "10",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "prg-16",
    title: {
      ar: "Objects",
    },
    heading: {
      ar: "نظم البيانات المرتبطة ببعضها",
    },
    icon: "fa-cube",
    level: {
      ar: "DATA STRUCTURES",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Objects تجعل البيانات المعقدة أكثر تنظيمًا لأنها تربط كل قيمة باسم واضح.",
    },
    example: {
      code: `const user = {
    name: "Abdullhamid",
    age: 20,
    role: "Developer"
};

console.log(user.name);
console.log(user.role);`,
    },
    challenge: {
      ar: "أنشئ Object يمثل طالبًا يحتوي على name وage وgrade.",
    },
    quiz: [
      {
        question: {
          ar: "ما الذي يستخدمه Object لتخزين البيانات؟",
        },
        options: [
          {
            ar: "Properties وValues",
          },
          {
            ar: "Loops فقط",
          },
          {
            ar: "صور فقط",
          },
          {
            ar: "Files",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "prg-17",
    title: {
      ar: "الأخطاء وتصحيحها",
    },
    heading: {
      ar: "الخطأ جزء طبيعي من حياة المبرمج",
    },
    icon: "fa-bug",
    level: {
      ar: "DEBUGGING",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "قراءة رسالة الخطأ وفهمها مهارة أساسية للمبرمج، وليست علامة على الفشل.",
    },
    example: {
      code: `const age = 20;

if (age > 18) {
    console.log("Adult");
}`,
    },
    challenge: {
      ar: "تعمد كتابة Syntax Error بسيط ثم حاول تحديد مكان الخطأ من رسالة المتصفح.",
    },
    quiz: [
      {
        question: {
          ar: "ما معنى Debugging؟",
        },
        options: [
          {
            ar: "كتابة HTML",
          },
          {
            ar: "اكتشاف الأخطاء وإصلاحها",
          },
          {
            ar: "تصميم الصور",
          },
          {
            ar: "رفع الموقع",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-18",
    title: {
      ar: "حل المشكلات",
    },
    heading: {
      ar: "هذه هي المهارة التي تصنع المبرمج",
    },
    icon: "fa-puzzle-piece",
    level: {
      ar: "PROBLEM SOLVING",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "كلما تحسنت قدرتك على حل المشكلات، أصبحت قادرًا على تعلم لغات وتقنيات جديدة بسهولة أكبر.",
    },
    example: {
      code: `function calculateTotal(price, quantity) {

    return price * quantity;
}

console.log(
    calculateTotal(100, 3)
);`,
    },
    challenge: {
      ar: "اختر مشكلة بسيطة مثل حساب فاتورة شراء، وحدد Input وProcess وOutput.",
    },
    quiz: [
      {
        question: {
          ar: "ما الخطوة التي تأتي قبل كتابة الكود؟",
        },
        options: [
          {
            ar: "شراء كمبيوتر",
          },
          {
            ar: "فهم المشكلة وتصميم الحل",
          },
          {
            ar: "فتح GitHub",
          },
          {
            ar: "اختيار اللون",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-19",
    title: {
      ar: "Git ومفاهيمه",
    },
    heading: {
      ar: "ابدأ بفهم Version Control",
    },
    icon: "fa-code-branch",
    level: {
      ar: "DEVELOPER TOOLS",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Git ليس لغة برمجة؛ هو أداة لإدارة إصدارات المشروع وتتبع التغييرات.",
    },
    example: {
      code: `git init

git add .

git commit -m "Initial commit"`,
    },
    challenge: {
      ar: "تعلم الفرق بين Repository وCommit وBranch قبل الانتقال للمستوى التالي.",
    },
    quiz: [
      {
        question: {
          ar: "ما وظيفة Git الأساسية؟",
        },
        options: [
          {
            ar: "تصميم واجهات",
          },
          {
            ar: "إدارة وتتبع إصدارات المشروع",
          },
          {
            ar: "تشغيل الإنترنت",
          },
          {
            ar: "إنشاء صور",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "prg-20",
    title: {
      ar: "مراجعة شاملة",
    },
    heading: {
      ar: "أنت الآن تملك أساس التفكير البرمجي",
    },
    icon: "fa-graduation-cap",
    level: {
      ar: "REVIEW",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "الهدف من هذا المسار ليس أن تصبح محترفًا في لغة معينة، بل أن تبني الأساس الذي ستتعلم فوقه كل شيء لاحقًا.",
    },
    example: {
      code: `const learner = {
    foundation: true,
    thinking: "problem solving",
    next: "Web Fundamentals"
};

console.log(learner);`,
    },
    challenge: {
      ar: "قبل الاختبار النهائي، راجع الدروس السابقة وحاول شرح كل مفهوم بكلماتك أنت.",
    },
    quiz: [
      {
        question: {
          ar: "ما أهم شيء يجب أن تخرج به من هذا المسار؟",
        },
        options: [
          {
            ar: "حفظ كل Syntax",
          },
          {
            ar: "التفكير المنطقي وحل المشكلات",
          },
          {
            ar: "حفظ أسماء اللغات",
          },
          {
            ar: "كتابة أكبر عدد من الأسطر",
          },
        ],
        correct: 1,
      },
    ],
  },
];

import { EN } from "./en.js";
import { withEnglish } from "../../js/engine/with-english.js";
withEnglish(track, lessons, EN);
