// JavaScript course content, shared lesson schema (see docs/lesson-schema.md).
// Generated once from the legacy implementation by tools/convert-js-track.mjs; now hand-maintained.

export const track = {
  id: "js",
  title: { ar: "JavaScript", en: "JavaScript" },
  editorLabel: "JavaScript",
  exampleHeading: { ar: "كود JavaScript", en: "JavaScript code" },
  practiceHeading: { ar: "اكتب JavaScript", en: "Write JavaScript" },
  runtime: "dom-js",
  groups: [
    {
      id: "js-g1",
      title: {
        ar: "أساسيات JavaScript",
      },
      lessons: ["js-01", "js-02", "js-03", "js-04", "js-05", "js-06"],
    },
    {
      id: "js-g2",
      title: {
        ar: "الدوال Functions",
      },
      lessons: ["js-07", "js-08", "js-09", "js-10"],
    },
    {
      id: "js-g3",
      title: {
        ar: "المصفوفات والكائنات",
      },
      lessons: ["js-11", "js-12", "js-13", "js-14"],
    },
    {
      id: "js-g4",
      title: {
        ar: "DOM والمتصفح",
      },
      lessons: ["js-15", "js-16", "js-17", "js-18"],
    },
    {
      id: "js-g5",
      title: {
        ar: "JavaScript الحديثة",
      },
      lessons: ["js-19", "js-20", "js-21", "js-22"],
    },
    {
      id: "js-g6",
      title: {
        ar: "JavaScript المتقدمة",
      },
      lessons: ["js-23", "js-24", "js-25"],
    },
  ],
};

export const lessons = [
  {
    id: "js-01",
    title: {
      ar: "مقدمة إلى JavaScript",
    },
    description: {
      ar: "تعرّف على JavaScript ودورها في جعل صفحات الويب تفاعلية وإضافة المنطق والسلوك إليها.",
    },
    sections: [
      {
        title: {
          ar: "ما هي JavaScript؟",
        },
        html: {
          ar: `<p>JavaScript هي لغة برمجة تُستخدم لإضافة السلوك والتفاعل إلى صفحات ومواقع الويب.</p>
<p>
تُستخدم HTML لبناء هيكل الصفحة، وتُستخدم CSS للتحكم في المظهر والتصميم، بينما تُستخدم JavaScript لإضافة
المنطق والتفاعل والسلوك.
</p>
<p>
على سبيل المثال، يمكن استخدام JavaScript لجعل الزر يستجيب عند الضغط عليه، أو تغيير محتوى الصفحة، أو التحقق
من البيانات التي يدخلها المستخدم.
</p>`,
        },
      },
      {
        label: {
          ar: "الفكرة الأساسية",
        },
        title: {
          ar: "JavaScript تجعل صفحات الويب تفاعلية",
        },
        html: {
          ar: `<p>
يمكنك التفكير في موقع الويب على أنه جسم الإنسان: HTML تمثل الهيكل، CSS تمثل المظهر، وJavaScript تمثل السلوك
والحركة والتفاعل.
</p>`,
        },
      },
    ],
    example: {
      code: `const message = "Hello FAYAD";

document.getElementById("jsResult").textContent = message;`,
      explanation: {
        ar: `
      <p><strong>const</strong> تُستخدم لإنشاء متغير لا يمكن إعادة إسناد قيمة جديدة له.</p>
      <p><strong>message</strong> هو اسم المتغير الذي يخزن النص.</p>
      <p><strong>"Hello FAYAD"</strong> عبارة عن قيمة نصية من نوع String.</p>
      <p><strong>textContent</strong> تُستخدم لتغيير النص الموجود داخل عنصر HTML.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الأساسي لـ JavaScript؟",
        },
        options: [
          {
            ar: "إضافة التفاعل والسلوك إلى صفحات الويب",
          },
          {
            ar: "إنشاء هيكل الصفحة فقط",
          },
          {
            ar: "تغيير ألوان الصفحة فقط",
          },
          {
            ar: "إنشاء ملفات الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي لغة تُستخدم لإضافة السلوك والمنطق إلى الموقع؟",
        },
        options: [
          {
            ar: "JavaScript",
          },
          {
            ar: "HTML",
          },
          {
            ar: "CSS",
          },
          {
            ar: "SQL",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يمكن لـ JavaScript القيام به؟",
        },
        options: [
          {
            ar: "التعامل مع المستخدم وتغيير محتوى الصفحة",
          },
          {
            ar: "إنشاء الهيكل فقط",
          },
          {
            ar: "كتابة ملفات الصور فقط",
          },
          {
            ar: "استبدال نظام التشغيل",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-02",
    title: {
      ar: "المتغيرات",
    },
    description: {
      ar: "تعلّم كيف تخزن المتغيرات القيم والبيانات داخل برنامج JavaScript.",
    },
    example: {
      code: `let name = "FAYAD";
let age = 20;

document.getElementById("jsResult").textContent =
  name + " - " + age;`,
      explanation: {
        ar: `
      <p><strong>let</strong> تُستخدم لإنشاء متغير يمكن تغيير قيمته لاحقًا.</p>
      <p><strong>name</strong> يخزن قيمة نصية.</p>
      <p><strong>age</strong> يخزن قيمة رقمية.</p>
      <p>يمكن إعادة إسناد قيمة جديدة للمتغير الذي تم إنشاؤه باستخدام <strong>let</strong>.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي كلمة مفتاحية تسمح بتغيير قيمة المتغير؟",
        },
        options: [
          {
            ar: "let",
          },
          {
            ar: "const",
          },
          {
            ar: "fixed",
          },
          {
            ar: "value",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يخزن المتغير؟",
        },
        options: [
          {
            ar: "قيمة أو بيانات",
          },
          {
            ar: "لون الشاشة فقط",
          },
          {
            ar: "ملف HTML فقط",
          },
          {
            ar: "صورة فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي متغير يمكن إعادة إسناد قيمته؟",
        },
        options: [
          {
            ar: "let",
          },
          {
            ar: "const",
          },
          {
            ar: "static",
          },
          {
            ar: "constant",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-03",
    title: {
      ar: "أنواع البيانات",
    },
    description: {
      ar: "تعرّف على أهم أنواع البيانات التي تتعامل معها JavaScript.",
    },
    example: {
      code: `const name = "FAYAD";
const age = 20;
const isStudent = true;

document.getElementById("jsResult").textContent =
  name + " | " + age + " | " + isStudent;`,
      explanation: {
        ar: `
      <p><strong>String</strong> تُستخدم للنصوص مثل <code>"FAYAD"</code>.</p>
      <p><strong>Number</strong> تُستخدم للأرقام مثل <code>20</code>.</p>
      <p><strong>Boolean</strong> تحتوي على قيمتين فقط: <code>true</code> أو <code>false</code>.</p>
      <p>اختيار نوع البيانات المناسب يساعد البرنامج على التعامل مع المعلومات بشكل صحيح.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي قيمة من التالية هي Boolean؟",
        },
        options: [
          {
            ar: "true",
          },
          {
            ar: "\"Hello\"",
          },
          {
            ar: "25",
          },
          {
            ar: "null",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نوع القيمة الموجودة في \"FAYAD\"؟",
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
            ar: "Object",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نوع القيمة 25؟",
        },
        options: [
          {
            ar: "Number",
          },
          {
            ar: "String",
          },
          {
            ar: "Boolean",
          },
          {
            ar: "Array",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-04",
    title: {
      ar: "العوامل Operators",
    },
    description: {
      ar: "تعلّم كيف تستخدم JavaScript العوامل الحسابية والمقارنة والمنطقية لتنفيذ العمليات.",
    },
    example: {
      code: `const a = 10;
const b = 5;

const result = a + b;

document.getElementById("jsResult").textContent = result;`,
      explanation: {
        ar: `
      <p>العوامل <strong>Operators</strong> تُستخدم لتنفيذ عمليات على القيم.</p>
      <p><strong>+</strong> للجمع، <strong>-</strong> للطرح، <strong>*</strong> للضرب، و<strong>/</strong> للقسمة.</p>
      <p>يمكن أيضًا استخدام عوامل المقارنة مثل <strong>===</strong> و<strong>&gt;</strong> و<strong>&lt;</strong>.</p>
      <p>العوامل جزء أساسي من كتابة المنطق البرمجي.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي عامل يُستخدم للجمع؟",
        },
        options: [
          {
            ar: "+",
          },
          {
            ar: "-",
          },
          {
            ar: "*",
          },
          {
            ar: "/",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نتيجة 10 - 4؟",
        },
        options: [
          {
            ar: "6",
          },
          {
            ar: "14",
          },
          {
            ar: "40",
          },
          {
            ar: "2",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي عامل يُستخدم للمقارنة الصارمة؟",
        },
        options: [
          {
            ar: "===",
          },
          {
            ar: "=",
          },
          {
            ar: "=>",
          },
          {
            ar: "!===",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-05",
    title: {
      ar: "الشروط Conditions",
    },
    description: {
      ar: "تعلّم كيف تستخدم if وelse لجعل البرنامج يتخذ قرارات بناءً على شروط معينة.",
    },
    example: {
      code: `const age = 20;

if (age >= 18) {
  document.getElementById("jsResult").textContent = "بالغ";
} else {
  document.getElementById("jsResult").textContent = "قاصر";
}`,
      explanation: {
        ar: `
      <p><strong>if</strong> تتحقق من وجود شرط معين.</p>
      <p>إذا كان الشرط صحيحًا يتم تنفيذ الكود الموجود داخلها.</p>
      <p><strong>else</strong> تُستخدم لتنفيذ كود بديل عندما يكون الشرط غير صحيح.</p>
      <p>الشروط تسمح للبرنامج باتخاذ قرارات مختلفة حسب البيانات.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الكلمة المفتاحية المستخدمة لإنشاء شرط؟",
        },
        options: [
          {
            ar: "if",
          },
          {
            ar: "loop",
          },
          {
            ar: "check",
          },
          {
            ar: "condition",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "متى يتم تنفيذ else؟",
        },
        options: [
          {
            ar: "عندما يكون شرط if غير صحيح",
          },
          {
            ar: "دائمًا",
          },
          {
            ar: "قبل if",
          },
          {
            ar: "عند تعريف المتغير",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نتيجة الشرط 20 >= 18؟",
        },
        options: [
          {
            ar: "true",
          },
          {
            ar: "false",
          },
          {
            ar: "undefined",
          },
          {
            ar: "null",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-06",
    title: {
      ar: "الحلقات Loops",
    },
    description: {
      ar: "تعلّم كيف تكرر JavaScript تنفيذ مجموعة من الأوامر باستخدام الحلقات.",
    },
    example: {
      code: `let result = "";

for (let i = 1; i <= 5; i++) {
  result += i + " ";
}

document.getElementById("jsResult").textContent = result;`,
      explanation: {
        ar: `
      <p>الحلقات <strong>Loops</strong> تسمح بتكرار تنفيذ مجموعة من التعليمات.</p>
      <p>حلقة <strong>for</strong> تتكون عادةً من البداية والشرط والتغيير.</p>
      <p>في المثال تبدأ قيمة <strong>i</strong> من 1 وتستمر حتى تصل إلى 5.</p>
      <p>الحلقات تقلل الحاجة إلى كتابة نفس الكود عدة مرات.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الأساسي للحلقات؟",
        },
        options: [
          {
            ar: "تكرار تنفيذ الكود",
          },
          {
            ar: "إنشاء HTML",
          },
          {
            ar: "تغيير ملفات CSS",
          },
          {
            ar: "إنشاء الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي كلمة مفتاحية تُستخدم لإنشاء حلقة for؟",
        },
        options: [
          {
            ar: "for",
          },
          {
            ar: "repeat",
          },
          {
            ar: "looping",
          },
          {
            ar: "cycle",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدث عندما يصبح شرط الحلقة false؟",
        },
        options: [
          {
            ar: "تتوقف الحلقة",
          },
          {
            ar: "تبدأ من جديد",
          },
          {
            ar: "يتوقف المتصفح",
          },
          {
            ar: "يتم حذف المتغير",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-07",
    title: {
      ar: "الدوال Functions",
    },
    description: {
      ar: "تعلّم كيف تنشئ دوال قابلة لإعادة الاستخدام لتنظيم الكود وتقليل التكرار.",
    },
    example: {
      code: `function greet() {
  return "مرحبًا بك في FAYAD";
}

document.getElementById("jsResult").textContent = greet();`,
      explanation: {
        ar: `
      <p>الدالة <strong>Function</strong> هي مجموعة من التعليمات يمكن إعادة استخدامها.</p>
      <p>يتم تعريف الدالة باستخدام الكلمة المفتاحية <strong>function</strong>.</p>
      <p>يمكن تشغيل الدالة عن طريق كتابة اسمها متبوعًا بالأقواس.</p>
      <p>استخدام الدوال يجعل البرنامج أكثر تنظيمًا وأسهل في الصيانة.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما هي الدالة؟",
        },
        options: [
          {
            ar: "مجموعة قابلة لإعادة الاستخدام من التعليمات",
          },
          {
            ar: "عنصر HTML",
          },
          {
            ar: "خاصية CSS",
          },
          {
            ar: "نوع من الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي كلمة مفتاحية تُستخدم لتعريف Function تقليدية؟",
        },
        options: [
          {
            ar: "function",
          },
          {
            ar: "def",
          },
          {
            ar: "method",
          },
          {
            ar: "func",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كيف يتم استدعاء الدالة greet؟",
        },
        options: [
          {
            ar: "greet()",
          },
          {
            ar: "call greet",
          },
          {
            ar: "run.greet",
          },
          {
            ar: "function.greet",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-08",
    title: {
      ar: "Parameters و Arguments",
    },
    description: {
      ar: "تعلّم كيف تستقبل الدوال البيانات باستخدام Parameters وArguments.",
    },
    example: {
      code: `function greet(name) {
  return "مرحبًا " + name;
}

document.getElementById("jsResult").textContent =
  greet("FAYAD");`,
      explanation: {
        ar: `
      <p><strong>Parameter</strong> هو المتغير الموجود داخل تعريف الدالة لاستقبال قيمة.</p>
      <p><strong>Argument</strong> هي القيمة التي نمررها عند استدعاء الدالة.</p>
      <p>في المثال <strong>name</strong> هو Parameter.</p>
      <p>أما <strong>"FAYAD"</strong> فهي Argument تم تمريرها إلى الدالة.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما هو Parameter؟",
        },
        options: [
          {
            ar: "متغير تستقبله الدالة",
          },
          {
            ar: "عنصر HTML",
          },
          {
            ar: "ملف CSS",
          },
          {
            ar: "حلقة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي Argument؟",
        },
        options: [
          {
            ar: "القيمة التي يتم تمريرها إلى الدالة",
          },
          {
            ar: "اسم الدالة",
          },
          {
            ar: "اسم الملف",
          },
          {
            ar: "نوع البيانات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "في greet(\"FAYAD\") ما هي Argument؟",
        },
        options: [
          {
            ar: "\"FAYAD\"",
          },
          {
            ar: "greet",
          },
          {
            ar: "name",
          },
          {
            ar: "()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-09",
    title: {
      ar: "Return",
    },
    description: {
      ar: "تعلّم كيف تستخدم return لإرجاع قيمة من الدالة إلى المكان الذي تم استدعاؤها منه.",
    },
    example: {
      code: `function add(a, b) {
  return a + b;
}

const result = add(5, 3);

document.getElementById("jsResult").textContent = result;`,
      explanation: {
        ar: `
      <p>الكلمة المفتاحية <strong>return</strong> تُرجع قيمة من الدالة.</p>
      <p>بعد تنفيذ <strong>return</strong> تتوقف الدالة عن تنفيذ التعليمات الموجودة بعدها.</p>
      <p>يمكن تخزين القيمة التي أعادتها الدالة داخل متغير.</p>
      <p>هذا يسمح باستخدام نتائج الدوال في أماكن أخرى من البرنامج.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا تفعل return؟",
        },
        options: [
          {
            ar: "ترجع قيمة من الدالة",
          },
          {
            ar: "تنشئ Loop",
          },
          {
            ar: "تحذف متغيرًا",
          },
          {
            ar: "تغير HTML فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدث غالبًا بعد تنفيذ return؟",
        },
        options: [
          {
            ar: "تتوقف الدالة عن التنفيذ",
          },
          {
            ar: "تبدأ الحلقة",
          },
          {
            ar: "يتم إنشاء متغير",
          },
          {
            ar: "يتم تشغيل CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما نتيجة add(5, 3) إذا كانت الدالة ترجع a + b؟",
        },
        options: [
          {
            ar: "8",
          },
          {
            ar: "2",
          },
          {
            ar: "15",
          },
          {
            ar: "53",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-10",
    title: {
      ar: "Arrow Functions",
    },
    description: {
      ar: "تعلّم الصيغة الحديثة لكتابة الدوال باستخدام Arrow Functions.",
    },
    example: {
      code: `const add = (a, b) => {
  return a + b;
};

document.getElementById("jsResult").textContent =
  add(5, 3);`,
      explanation: {
        ar: `
      <p><strong>Arrow Function</strong> هي صيغة مختصرة وحديثة لكتابة الدوال.</p>
      <p>يتم استخدام الرمز <strong>=&gt;</strong> بين Parameters وجسم الدالة.</p>
      <p>يمكن اختصار الدالة أكثر إذا كانت تحتوي على تعبير واحد.</p>
      <p>Arrow Functions شائعة جدًا في JavaScript الحديثة.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي رمز يستخدم في Arrow Function؟",
        },
        options: [
          {
            ar: "=>",
          },
          {
            ar: "->",
          },
          {
            ar: "::",
          },
          {
            ar: "==>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي صيغة صحيحة؟",
        },
        options: [
          {
            ar: "const add = (a, b) => a + b;",
          },
          {
            ar: "const add => (a, b)",
          },
          {
            ar: "arrow add(a, b)",
          },
          {
            ar: "function => add",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما فائدة Arrow Functions؟",
        },
        options: [
          {
            ar: "كتابة الدوال بصيغة حديثة ومختصرة",
          },
          {
            ar: "إنشاء HTML",
          },
          {
            ar: "تغيير ألوان CSS",
          },
          {
            ar: "إدارة قواعد البيانات فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-11",
    title: {
      ar: "المصفوفات Arrays",
    },
    description: {
      ar: "تعلّم كيف تخزن المصفوفات عدة قيم داخل متغير واحد وكيف تصل إلى عناصرها.",
    },
    example: {
      code: `const fruits = [
  "Apple",
  "Banana",
  "Orange"
];

document.getElementById("jsResult").textContent =
  fruits[0];`,
      explanation: {
        ar: `
      <p><strong>Array</strong> هي بنية بيانات تسمح بتخزين عدة قيم داخل متغير واحد.</p>
      <p>العناصر داخل Array لها ترتيب رقمي يبدأ من <strong>0</strong>.</p>
      <p>للوصول إلى أول عنصر نستخدم <strong>array[0]</strong>.</p>
      <p>المصفوفات مهمة جدًا عند التعامل مع مجموعات البيانات.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا تخزن Array؟",
        },
        options: [
          {
            ar: "عدة قيم داخل متغير واحد",
          },
          {
            ar: "قيمة واحدة فقط",
          },
          {
            ar: "CSS فقط",
          },
          {
            ar: "HTML فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما رقم فهرس أول عنصر في Array؟",
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
      {
        question: {
          ar: "كيف تصل إلى أول عنصر في fruits؟",
        },
        options: [
          {
            ar: "fruits[0]",
          },
          {
            ar: "fruits[1]",
          },
          {
            ar: "fruits.first",
          },
          {
            ar: "fruits()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-12",
    title: {
      ar: "دوال المصفوفات",
    },
    description: {
      ar: "تعلّم بعض أهم الدوال المستخدمة للتعامل مع Arrays مثل push وpop وmap وfilter.",
    },
    example: {
      code: `const numbers = [1, 2, 3];

numbers.push(4);

document.getElementById("jsResult").textContent =
  numbers.join(", ");`,
      explanation: {
        ar: `
      <p>JavaScript توفر العديد من <strong>Array Methods</strong> للتعامل مع المصفوفات.</p>
      <p><strong>push()</strong> تضيف عنصرًا إلى نهاية المصفوفة.</p>
      <p><strong>pop()</strong> تحذف آخر عنصر.</p>
      <p><strong>map()</strong> تنشئ Array جديدة بعد تطبيق عملية على العناصر.</p>
      <p><strong>filter()</strong> تستخدم لاختيار العناصر التي تحقق شرطًا معينًا.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا تفعل push()؟",
        },
        options: [
          {
            ar: "تضيف عنصرًا إلى نهاية Array",
          },
          {
            ar: "تحذف أول عنصر",
          },
          {
            ar: "تحذف Array",
          },
          {
            ar: "تنشئ Function",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Method تحذف آخر عنصر؟",
        },
        options: [
          {
            ar: "pop()",
          },
          {
            ar: "push()",
          },
          {
            ar: "remove()",
          },
          {
            ar: "deleteLast()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الاستخدام الشائع لـ filter()؟",
        },
        options: [
          {
            ar: "اختيار العناصر التي تحقق شرطًا",
          },
          {
            ar: "إضافة عنصر دائمًا",
          },
          {
            ar: "حذف كل العناصر",
          },
          {
            ar: "إنشاء HTML",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-13",
    title: {
      ar: "الكائنات Objects",
    },
    description: {
      ar: "تعلّم كيف تخزن Objects البيانات المرتبطة باستخدام Properties وValues.",
    },
    example: {
      code: `const user = {
  name: "FAYAD",
  age: 20,
  student: true
};

document.getElementById("jsResult").textContent =
  user.name;`,
      explanation: {
        ar: `
      <p><strong>Object</strong> يستخدم لتجميع البيانات المرتبطة داخل بنية واحدة.</p>
      <p>يحتوي Object على <strong>Properties</strong>، ولكل Property قيمة.</p>
      <p>في المثال <strong>name</strong> و<strong>age</strong> و<strong>student</strong> هي Properties.</p>
      <p>يمكن الوصول إلى Property باستخدام النقطة مثل <strong>user.name</strong>.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يحتوي Object عادةً؟",
        },
        options: [
          {
            ar: "Properties وValues",
          },
          {
            ar: "CSS فقط",
          },
          {
            ar: "HTML فقط",
          },
          {
            ar: "أرقام فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كيف تصل إلى name داخل user؟",
        },
        options: [
          {
            ar: "user.name",
          },
          {
            ar: "user->name",
          },
          {
            ar: "user[name()]",
          },
          {
            ar: "name.user",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما هي name في user.name؟",
        },
        options: [
          {
            ar: "Property",
          },
          {
            ar: "Loop",
          },
          {
            ar: "Function",
          },
          {
            ar: "Array",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-14",
    title: {
      ar: "دوال الكائنات",
    },
    description: {
      ar: "تعلّم كيف يمكن للكائنات أن تحتوي على Functions تُعرف باسم Methods.",
    },
    example: {
      code: `const user = {
  name: "FAYAD",

  greet() {
    return "Hello " + this.name;
  }
};

document.getElementById("jsResult").textContent =
  user.greet();`,
      explanation: {
        ar: `
      <p><strong>Method</strong> هي Function مرتبطة بكائن Object.</p>
      <p>يمكن تعريف Method داخل Object.</p>
      <p>الكلمة المفتاحية <strong>this</strong> تشير في هذا السياق إلى الكائن الذي ينتمي إليه الـMethod.</p>
      <p>Methods تسمح للكائن بتجميع البيانات والسلوك معًا.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما هي Method؟",
        },
        options: [
          {
            ar: "Function داخل Object",
          },
          {
            ar: "خاصية CSS",
          },
          {
            ar: "HTML Attribute",
          },
          {
            ar: "Array",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي تشير إليه this غالبًا داخل Method الخاصة بالكائن؟",
        },
        options: [
          {
            ar: "الكائن الحالي",
          },
          {
            ar: "ملف CSS",
          },
          {
            ar: "المتصفح فقط",
          },
          {
            ar: "Array دائمًا",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كيف تستدعي greet داخل user؟",
        },
        options: [
          {
            ar: "user.greet()",
          },
          {
            ar: "greet.user",
          },
          {
            ar: "user->greet",
          },
          {
            ar: "call.user",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-15",
    title: {
      ar: "مقدمة إلى DOM",
    },
    description: {
      ar: "تعلّم كيف تمثل JavaScript صفحة HTML من خلال Document Object Model وكيف تتعامل معها.",
    },
    example: {
      code: `const title =
  document.getElementById("lessonTitle");

document.getElementById("jsResult").textContent =
  title.textContent;`,
      explanation: {
        ar: `
      <p><strong>DOM</strong> اختصار لـ Document Object Model.</p>
      <p>يقوم المتصفح بتمثيل مستند HTML كهيكل من العناصر والكائنات.</p>
      <p>JavaScript تستطيع الوصول إلى هذه العناصر وتغييرها والتفاعل معها.</p>
      <p>الـDOM هو الأساس الذي يسمح لـJavaScript بالتعامل مع واجهة الصفحة.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يعني DOM؟",
        },
        options: [
          {
            ar: "Document Object Model",
          },
          {
            ar: "Data Object Method",
          },
          {
            ar: "Document Order Manager",
          },
          {
            ar: "Dynamic Object Module",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يسمح DOM لـJavaScript بالتعامل معه؟",
        },
        options: [
          {
            ar: "عناصر صفحة HTML",
          },
          {
            ar: "ملفات النظام فقط",
          },
          {
            ar: "كروت الشاشة",
          },
          {
            ar: "ملفات الصوت فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "من الذي ينشئ DOM عند تحميل صفحة HTML؟",
        },
        options: [
          {
            ar: "المتصفح",
          },
          {
            ar: "CSS",
          },
          {
            ar: "قاعدة البيانات",
          },
          {
            ar: "المستخدم يدويًا",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-16",
    title: {
      ar: "اختيار العناصر",
    },
    description: {
      ar: "تعلّم الطرق الأساسية لاختيار عناصر HTML باستخدام JavaScript.",
    },
    example: {
      code: `const title =
  document.querySelector("h1");

document.getElementById("jsResult").textContent =
  title.textContent;`,
      explanation: {
        ar: `
      <p><strong>querySelector()</strong> تختار أول عنصر يطابق CSS Selector معين.</p>
      <p><strong>getElementById()</strong> تختار عنصرًا باستخدام قيمة ID.</p>
      <p>اختيار العناصر هو الخطوة الأولى قبل تعديلها أو التعامل معها.</p>
      <p>يمكن استخدام Selectors مثل <strong>h1</strong> و<strong>.class</strong> و<strong>#id</strong>.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي Method تستخدم CSS Selector لاختيار عنصر؟",
        },
        options: [
          {
            ar: "querySelector()",
          },
          {
            ar: "selectElement()",
          },
          {
            ar: "getCSS()",
          },
          {
            ar: "findCSS()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يستخدمه getElementById()؟",
        },
        options: [
          {
            ar: "ID العنصر",
          },
          {
            ar: "اسم CSS",
          },
          {
            ar: "اسم الملف",
          },
          {
            ar: "اسم المتصفح",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يعيد querySelector() عند وجود أكثر من عنصر مطابق؟",
        },
        options: [
          {
            ar: "أول عنصر مطابق",
          },
          {
            ar: "كل العناصر",
          },
          {
            ar: "آخر عنصر فقط",
          },
          {
            ar: "لا شيء",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-17",
    title: {
      ar: "تغيير المحتوى",
    },
    description: {
      ar: "تعلّم كيف تغيّر JavaScript النصوص والمحتوى الموجود داخل عناصر HTML.",
    },
    example: {
      code: `const title =
  document.querySelector("h1");

title.textContent = "مرحبًا من JavaScript";

document.getElementById("jsResult").textContent =
  title.textContent;`,
      explanation: {
        ar: `
      <p><strong>textContent</strong> تسمح بقراءة أو تغيير النص الموجود داخل العنصر.</p>
      <p>يمكن استخدامها لتحديث محتوى الصفحة بناءً على تفاعل المستخدم أو البيانات.</p>
      <p>عند إسناد قيمة جديدة إلى textContent يتم تحديث النص في الصفحة مباشرة.</p>
      <p>هذه من أكثر عمليات DOM استخدامًا.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي Property تغيّر النص داخل العنصر؟",
        },
        options: [
          {
            ar: "textContent",
          },
          {
            ar: "textChange",
          },
          {
            ar: "contentText",
          },
          {
            ar: "changeText",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدث عند كتابة element.textContent = \"Hello\"؟",
        },
        options: [
          {
            ar: "يتغير النص داخل العنصر",
          },
          {
            ar: "يتم حذف JavaScript",
          },
          {
            ar: "يتغير CSS فقط",
          },
          {
            ar: "يتم إنشاء Array",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن استخدام textContent لقراءة النص؟",
        },
        options: [
          {
            ar: "نعم",
          },
          {
            ar: "لا",
          },
          {
            ar: "فقط داخل CSS",
          },
          {
            ar: "فقط داخل HTML",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-18",
    title: {
      ar: "الأحداث Events",
    },
    description: {
      ar: "تعلّم كيف تستجيب JavaScript لأفعال المستخدم مثل الضغط والكتابة وتحريك الماوس.",
    },
    example: {
      code: `const button =
  document.querySelector("button");

button.addEventListener("click", () => {
  document.getElementById("jsResult").textContent =
    "تم الضغط على الزر";
});`,
      explanation: {
        ar: `
      <p><strong>Event</strong> هو حدث يحدث داخل الصفحة مثل الضغط على زر.</p>
      <p><strong>addEventListener()</strong> تُستخدم للاستماع إلى حدث معين.</p>
      <p>في المثال نستمع إلى حدث <strong>click</strong>.</p>
      <p>عند حدوث الحدث يتم تنفيذ Function معينة.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي Method تستمع إلى الأحداث؟",
        },
        options: [
          {
            ar: "addEventListener()",
          },
          {
            ar: "listenEvent()",
          },
          {
            ar: "eventClick()",
          },
          {
            ar: "watchEvent()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما اسم الحدث الذي يحدث عند الضغط على زر؟",
        },
        options: [
          {
            ar: "click",
          },
          {
            ar: "press",
          },
          {
            ar: "button",
          },
          {
            ar: "tapOnly",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدث عند وقوع Event؟",
        },
        options: [
          {
            ar: "يمكن تنفيذ Function مرتبطة به",
          },
          {
            ar: "يتوقف المتصفح",
          },
          {
            ar: "يُحذف HTML",
          },
          {
            ar: "يتم حذف CSS",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-19",
    title: {
      ar: "Destructuring",
    },
    description: {
      ar: "تعلّم كيف تستخرج القيم من Arrays وObjects بطريقة مختصرة ومنظمة.",
    },
    example: {
      code: `const user = {
  name: "FAYAD",
  age: 20
};

const { name, age } = user;

document.getElementById("jsResult").textContent =
  name + " - " + age;`,
      explanation: {
        ar: `
      <p><strong>Destructuring</strong> تسمح باستخراج القيم من Object أو Array داخل متغيرات.</p>
      <p>بدلًا من كتابة <strong>user.name</strong> و<strong>user.age</strong> عدة مرات يمكن استخراج القيم مباشرة.</p>
      <p>يُستخدم Destructuring بكثرة في JavaScript الحديثة.</p>
      <p>يمكن استخدامه مع Objects وArrays.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما فائدة Destructuring؟",
        },
        options: [
          {
            ar: "استخراج القيم بسهولة من Objects وArrays",
          },
          {
            ar: "إنشاء CSS",
          },
          {
            ar: "إنشاء HTML",
          },
          {
            ar: "تشغيل المتصفح",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي صيغة تستخدم Destructuring من Object؟",
        },
        options: [
          {
            ar: "const { name } = user;",
          },
          {
            ar: "const name = { user };",
          },
          {
            ar: "const [name] = user;",
          },
          {
            ar: "destructure(user)",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن استخدام Destructuring مع Arrays؟",
        },
        options: [
          {
            ar: "نعم",
          },
          {
            ar: "لا",
          },
          {
            ar: "فقط مع CSS",
          },
          {
            ar: "فقط مع Functions",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-20",
    title: {
      ar: "Spread و Rest",
    },
    description: {
      ar: "تعلّم استخدام ... في نسخ وتجميع القيم مع Arrays وObjects وFunctions.",
    },
    example: {
      code: `const numbers = [1, 2, 3];

const newNumbers = [
  ...numbers,
  4
];

document.getElementById("jsResult").textContent =
  newNumbers.join(", ");`,
      explanation: {
        ar: `
      <p>الرمز <strong>...</strong> يستخدم في JavaScript الحديثة بأكثر من طريقة.</p>
      <p><strong>Spread</strong> يفكك القيم داخل Array أو Object لاستخدامها في مكان آخر.</p>
      <p><strong>Rest</strong> يجمع عدة قيم داخل Array واحدة في Parameters الخاصة بالدالة.</p>
      <p>الفرق يعتمد على السياق الذي يتم فيه استخدام الرمز.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الرمز المستخدم في Spread وRest؟",
        },
        options: [
          {
            ar: "...",
          },
          {
            ar: "***",
          },
          {
            ar: ">>>",
          },
          {
            ar: "::",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يفعل Spread مع Array؟",
        },
        options: [
          {
            ar: "يفكك عناصرها لاستخدامها في Array أخرى",
          },
          {
            ar: "يحذفها",
          },
          {
            ar: "يحولها إلى String",
          },
          {
            ar: "يوقف البرنامج",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يفعل Rest Parameters؟",
        },
        options: [
          {
            ar: "يجمع عدة قيم داخل Array",
          },
          {
            ar: "يحذف القيم",
          },
          {
            ar: "ينشئ HTML",
          },
          {
            ar: "ينشئ CSS",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-21",
    title: {
      ar: "Modules",
    },
    description: {
      ar: "تعلّم كيف تقسّم JavaScript إلى ملفات مستقلة باستخدام export وimport.",
    },
    example: {
      code: `// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";

document.getElementById("jsResult").textContent =
  add(5, 3);`,
      explanation: {
        ar: `
      <p><strong>Modules</strong> تسمح بتقسيم البرنامج إلى ملفات منفصلة ومنظمة.</p>
      <p><strong>export</strong> تجعل قيمة أو Function متاحة لملفات أخرى.</p>
      <p><strong>import</strong> تستخدم لاستيراد ما تم تصديره من Module أخرى.</p>
      <p>استخدام Modules يساعد في تنظيم المشاريع الكبيرة.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "لماذا نستخدم Modules؟",
        },
        options: [
          {
            ar: "لتقسيم وتنظيم الكود بين ملفات متعددة",
          },
          {
            ar: "لتغيير ألوان CSS",
          },
          {
            ar: "لاستبدال HTML",
          },
          {
            ar: "لإنشاء الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي كلمة تستخدم لتصدير Function؟",
        },
        options: [
          {
            ar: "export",
          },
          {
            ar: "send",
          },
          {
            ar: "public",
          },
          {
            ar: "share",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي كلمة تستخدم لاستيراد قيمة؟",
        },
        options: [
          {
            ar: "import",
          },
          {
            ar: "include",
          },
          {
            ar: "requireOnly",
          },
          {
            ar: "load",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-22",
    title: {
      ar: "JavaScript غير المتزامنة",
    },
    description: {
      ar: "تعرّف على مفهوم Asynchronous JavaScript وكيفية التعامل مع المهام التي تستغرق وقتًا.",
    },
    example: {
      code: `document.getElementById("jsResult").textContent =
  "ابدأ";

setTimeout(() => {
  document.getElementById("jsResult").textContent =
    "اكتملت المهمة";
}, 1000);`,
      explanation: {
        ar: `
      <p><strong>Asynchronous JavaScript</strong> تسمح للبرنامج بالتعامل مع مهام لا تنتهي فورًا.</p>
      <p>من أمثلة ذلك طلب البيانات من Server أو الانتظار باستخدام Timer.</p>
      <p><strong>setTimeout()</strong> تسمح بتأجيل تنفيذ Function لمدة محددة.</p>
      <p>الهدف هو التعامل مع المهام التي تحتاج إلى وقت دون تجميد تجربة المستخدم.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يعني Asynchronous؟",
        },
        options: [
          {
            ar: "تنفيذ المهام بطريقة لا تتطلب الانتظار لكل شيء قبل الاستمرار",
          },
          {
            ar: "إيقاف البرنامج",
          },
          {
            ar: "حذف HTML",
          },
          {
            ar: "تغيير CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Function تستخدم لتأخير التنفيذ؟",
        },
        options: [
          {
            ar: "setTimeout()",
          },
          {
            ar: "delayCode()",
          },
          {
            ar: "waitJS()",
          },
          {
            ar: "pauseScript()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين تظهر الحاجة إلى Async JavaScript كثيرًا؟",
        },
        options: [
          {
            ar: "طلبات الشبكة والعمليات التي تستغرق وقتًا",
          },
          {
            ar: "كتابة CSS فقط",
          },
          {
            ar: "كتابة HTML فقط",
          },
          {
            ar: "تغيير الخطوط فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-23",
    title: {
      ar: "Promises",
    },
    description: {
      ar: "تعلّم كيف تمثل Promises نتيجة عملية غير متزامنة قد تنجح أو تفشل.",
    },
    example: {
      code: `const promise = new Promise((resolve) => {
  resolve("نجحت العملية");
});

promise.then((result) => {
  document.getElementById("jsResult").textContent =
    result;
});`,
      explanation: {
        ar: `
      <p><strong>Promise</strong> تمثل نتيجة مستقبلية لعملية غير متزامنة.</p>
      <p>يمكن أن تكون العملية في حالة Pending أو Fulfilled أو Rejected.</p>
      <p><strong>resolve</strong> تستخدم للإشارة إلى نجاح العملية.</p>
      <p><strong>then()</strong> تستخدم للتعامل مع النتيجة عند نجاح Promise.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا تمثل Promise؟",
        },
        options: [
          {
            ar: "النتيجة المستقبلية لعملية غير متزامنة",
          },
          {
            ar: "عنصر HTML",
          },
          {
            ar: "لون CSS",
          },
          {
            ar: "Array فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يعني Fulfilled؟",
        },
        options: [
          {
            ar: "نجحت العملية",
          },
          {
            ar: "العملية بدأت فقط",
          },
          {
            ar: "فشلت العملية",
          },
          {
            ar: "تم حذف Promise",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Method تستخدم للتعامل مع نجاح Promise؟",
        },
        options: [
          {
            ar: "then()",
          },
          {
            ar: "success()",
          },
          {
            ar: "doneOnly()",
          },
          {
            ar: "resolveThen()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-24",
    title: {
      ar: "Fetch API",
    },
    description: {
      ar: "تعلّم كيف تستخدم Fetch API لإرسال طلبات HTTP والحصول على البيانات من Server أو API.",
    },
    example: {
      code: `fetch("https://example.com/data")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });`,
      explanation: {
        ar: `
      <p><strong>Fetch API</strong> توفر طريقة حديثة لإرسال HTTP Requests من JavaScript.</p>
      <p>يمكن استخدامها لجلب بيانات من API أو Server.</p>
      <p>النتيجة الأولية تكون Response ويمكن تحويلها إلى JSON باستخدام <strong>response.json()</strong>.</p>
      <p>عادةً يتم التعامل مع النتيجة باستخدام Promises أو <strong>async/await</strong>.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "فيما تستخدم fetch() غالبًا؟",
        },
        options: [
          {
            ar: "إرسال طلبات والحصول على بيانات من Server",
          },
          {
            ar: "تغيير ألوان CSS",
          },
          {
            ar: "إنشاء HTML Tags",
          },
          {
            ar: "إنشاء صور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تفعل response.json()؟",
        },
        options: [
          {
            ar: "تحول Response إلى بيانات JSON قابلة للاستخدام",
          },
          {
            ar: "تحذف Response",
          },
          {
            ar: "ترسل CSS",
          },
          {
            ar: "تنشئ HTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل fetch() مرتبطة بالتعامل مع الشبكة؟",
        },
        options: [
          {
            ar: "نعم",
          },
          {
            ar: "لا",
          },
          {
            ar: "فقط مع CSS",
          },
          {
            ar: "فقط مع Arrays",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "js-25",
    title: {
      ar: "معالجة الأخطاء",
    },
    description: {
      ar: "تعلّم كيف تتعامل مع الأخطاء باستخدام try وcatch وfinally.",
    },
    example: {
      code: `try {
  const result = unknownVariable;

  document.getElementById("jsResult").textContent =
    result;
} catch (error) {
  document.getElementById("jsResult").textContent =
    "حدث خطأ";
}`,
      explanation: {
        ar: `
      <p>الأخطاء يمكن أن تحدث أثناء تشغيل JavaScript لأسباب مختلفة.</p>
      <p><strong>try</strong> تحتوي على الكود الذي قد ينتج عنه خطأ.</p>
      <p><strong>catch</strong> تستقبل الخطأ وتسمح لنا بالتعامل معه بدلًا من ترك البرنامج يتوقف بشكل غير متوقع.</p>
      <p><strong>finally</strong> يمكن استخدامها لتنفيذ كود سواء حدث خطأ أم لا.</p>
    `,
      },
    },
    quiz: [
      {
        question: {
          ar: "أي Block تستخدم للتعامل مع الخطأ؟",
        },
        options: [
          {
            ar: "catch",
          },
          {
            ar: "errorBlock",
          },
          {
            ar: "handle",
          },
          {
            ar: "exceptOnly",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين نضع الكود الذي قد ينتج عنه خطأ؟",
        },
        options: [
          {
            ar: "try",
          },
          {
            ar: "catch",
          },
          {
            ar: "finally",
          },
          {
            ar: "error",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "متى يمكن استخدام finally؟",
        },
        options: [
          {
            ar: "لتنفيذ كود بعد انتهاء try/catch سواء حدث خطأ أم لا",
          },
          {
            ar: "فقط عند حدوث خطأ",
          },
          {
            ar: "فقط عند نجاح try",
          },
          {
            ar: "لإنشاء Function",
          },
        ],
        correct: 0,
      },
    ],
  },
];

import { EN } from "./en.js";
import { withEnglish } from "../../js/engine/with-english.js";
withEnglish(track, lessons, EN);
