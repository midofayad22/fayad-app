/* =========================================================
   FAYAD — JAVASCRIPT LEARNING ENGINE
   Arabic Learning Experience
========================================================= */

/* =========================================================
   1. LESSON DATA
========================================================= */

const lessons = [
  /* =======================================================
     LESSON 1 — INTRODUCTION
  ======================================================== */

  {
    title: "مقدمة إلى JavaScript",

    description: "تعرّف على JavaScript ودورها في جعل صفحات الويب تفاعلية وإضافة المنطق والسلوك إليها.",

    code: `const message = "Hello FAYAD";

document.getElementById("jsResult").textContent = message;`,

    explanation: `
      <p><strong>const</strong> تُستخدم لإنشاء متغير لا يمكن إعادة إسناد قيمة جديدة له.</p>
      <p><strong>message</strong> هو اسم المتغير الذي يخزن النص.</p>
      <p><strong>"Hello FAYAD"</strong> عبارة عن قيمة نصية من نوع String.</p>
      <p><strong>textContent</strong> تُستخدم لتغيير النص الموجود داخل عنصر HTML.</p>
    `,

    questions: [
      {
        question: "ما الاستخدام الأساسي لـ JavaScript؟",
        answers: [
          "إضافة التفاعل والسلوك إلى صفحات الويب",
          "إنشاء هيكل الصفحة فقط",
          "تغيير ألوان الصفحة فقط",
          "إنشاء ملفات الصور",
        ],
        correct: 0,
      },
      {
        question: "أي لغة تُستخدم لإضافة السلوك والمنطق إلى الموقع؟",
        answers: ["JavaScript", "HTML", "CSS", "SQL"],
        correct: 0,
      },
      {
        question: "ما الذي يمكن لـ JavaScript القيام به؟",
        answers: [
          "التعامل مع المستخدم وتغيير محتوى الصفحة",
          "إنشاء الهيكل فقط",
          "كتابة ملفات الصور فقط",
          "استبدال نظام التشغيل",
        ],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 2 — VARIABLES
  ======================================================== */

  {
    title: "المتغيرات",

    description: "تعلّم كيف تخزن المتغيرات القيم والبيانات داخل برنامج JavaScript.",

    code: `let name = "FAYAD";
let age = 20;

document.getElementById("jsResult").textContent =
  name + " - " + age;`,

    explanation: `
      <p><strong>let</strong> تُستخدم لإنشاء متغير يمكن تغيير قيمته لاحقًا.</p>
      <p><strong>name</strong> يخزن قيمة نصية.</p>
      <p><strong>age</strong> يخزن قيمة رقمية.</p>
      <p>يمكن إعادة إسناد قيمة جديدة للمتغير الذي تم إنشاؤه باستخدام <strong>let</strong>.</p>
    `,

    questions: [
      {
        question: "أي كلمة مفتاحية تسمح بتغيير قيمة المتغير؟",
        answers: ["let", "const", "fixed", "value"],
        correct: 0,
      },
      {
        question: "ماذا يخزن المتغير؟",
        answers: ["قيمة أو بيانات", "لون الشاشة فقط", "ملف HTML فقط", "صورة فقط"],
        correct: 0,
      },
      {
        question: "أي متغير يمكن إعادة إسناد قيمته؟",
        answers: ["let", "const", "static", "constant"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 3 — DATA TYPES
  ======================================================== */

  {
    title: "أنواع البيانات",

    description: "تعرّف على أهم أنواع البيانات التي تتعامل معها JavaScript.",

    code: `const name = "FAYAD";
const age = 20;
const isStudent = true;

document.getElementById("jsResult").textContent =
  name + " | " + age + " | " + isStudent;`,

    explanation: `
      <p><strong>String</strong> تُستخدم للنصوص مثل <code>"FAYAD"</code>.</p>
      <p><strong>Number</strong> تُستخدم للأرقام مثل <code>20</code>.</p>
      <p><strong>Boolean</strong> تحتوي على قيمتين فقط: <code>true</code> أو <code>false</code>.</p>
      <p>اختيار نوع البيانات المناسب يساعد البرنامج على التعامل مع المعلومات بشكل صحيح.</p>
    `,

    questions: [
      {
        question: "أي قيمة من التالية هي Boolean؟",
        answers: ["true", '"Hello"', "25", "null"],
        correct: 0,
      },
      {
        question: 'ما نوع القيمة الموجودة في "FAYAD"؟',
        answers: ["String", "Number", "Boolean", "Object"],
        correct: 0,
      },
      {
        question: "ما نوع القيمة 25؟",
        answers: ["Number", "String", "Boolean", "Array"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 4 — OPERATORS
  ======================================================== */

  {
    title: "العوامل Operators",

    description: "تعلّم كيف تستخدم JavaScript العوامل الحسابية والمقارنة والمنطقية لتنفيذ العمليات.",

    code: `const a = 10;
const b = 5;

const result = a + b;

document.getElementById("jsResult").textContent = result;`,

    explanation: `
      <p>العوامل <strong>Operators</strong> تُستخدم لتنفيذ عمليات على القيم.</p>
      <p><strong>+</strong> للجمع، <strong>-</strong> للطرح، <strong>*</strong> للضرب، و<strong>/</strong> للقسمة.</p>
      <p>يمكن أيضًا استخدام عوامل المقارنة مثل <strong>===</strong> و<strong>&gt;</strong> و<strong>&lt;</strong>.</p>
      <p>العوامل جزء أساسي من كتابة المنطق البرمجي.</p>
    `,

    questions: [
      {
        question: "أي عامل يُستخدم للجمع؟",
        answers: ["+", "-", "*", "/"],
        correct: 0,
      },
      {
        question: "ما نتيجة 10 - 4؟",
        answers: ["6", "14", "40", "2"],
        correct: 0,
      },
      {
        question: "أي عامل يُستخدم للمقارنة الصارمة؟",
        answers: ["===", "=", "=>", "!==="],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 5 — CONDITIONS
  ======================================================== */

  {
    title: "الشروط Conditions",

    description: "تعلّم كيف تستخدم if وelse لجعل البرنامج يتخذ قرارات بناءً على شروط معينة.",

    code: `const age = 20;

if (age >= 18) {
  document.getElementById("jsResult").textContent = "بالغ";
} else {
  document.getElementById("jsResult").textContent = "قاصر";
}`,

    explanation: `
      <p><strong>if</strong> تتحقق من وجود شرط معين.</p>
      <p>إذا كان الشرط صحيحًا يتم تنفيذ الكود الموجود داخلها.</p>
      <p><strong>else</strong> تُستخدم لتنفيذ كود بديل عندما يكون الشرط غير صحيح.</p>
      <p>الشروط تسمح للبرنامج باتخاذ قرارات مختلفة حسب البيانات.</p>
    `,

    questions: [
      {
        question: "ما الكلمة المفتاحية المستخدمة لإنشاء شرط؟",
        answers: ["if", "loop", "check", "condition"],
        correct: 0,
      },
      {
        question: "متى يتم تنفيذ else؟",
        answers: ["عندما يكون شرط if غير صحيح", "دائمًا", "قبل if", "عند تعريف المتغير"],
        correct: 0,
      },
      {
        question: "ما نتيجة الشرط 20 >= 18؟",
        answers: ["true", "false", "undefined", "null"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 6 — LOOPS
  ======================================================== */

  {
    title: "الحلقات Loops",

    description: "تعلّم كيف تكرر JavaScript تنفيذ مجموعة من الأوامر باستخدام الحلقات.",

    code: `let result = "";

for (let i = 1; i <= 5; i++) {
  result += i + " ";
}

document.getElementById("jsResult").textContent = result;`,

    explanation: `
      <p>الحلقات <strong>Loops</strong> تسمح بتكرار تنفيذ مجموعة من التعليمات.</p>
      <p>حلقة <strong>for</strong> تتكون عادةً من البداية والشرط والتغيير.</p>
      <p>في المثال تبدأ قيمة <strong>i</strong> من 1 وتستمر حتى تصل إلى 5.</p>
      <p>الحلقات تقلل الحاجة إلى كتابة نفس الكود عدة مرات.</p>
    `,

    questions: [
      {
        question: "ما الاستخدام الأساسي للحلقات؟",
        answers: ["تكرار تنفيذ الكود", "إنشاء HTML", "تغيير ملفات CSS", "إنشاء الصور"],
        correct: 0,
      },
      {
        question: "أي كلمة مفتاحية تُستخدم لإنشاء حلقة for؟",
        answers: ["for", "repeat", "looping", "cycle"],
        correct: 0,
      },
      {
        question: "ماذا يحدث عندما يصبح شرط الحلقة false؟",
        answers: ["تتوقف الحلقة", "تبدأ من جديد", "يتوقف المتصفح", "يتم حذف المتغير"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 7 — FUNCTIONS
  ======================================================== */

  {
    title: "الدوال Functions",

    description: "تعلّم كيف تنشئ دوال قابلة لإعادة الاستخدام لتنظيم الكود وتقليل التكرار.",

    code: `function greet() {
  return "مرحبًا بك في FAYAD";
}

document.getElementById("jsResult").textContent = greet();`,

    explanation: `
      <p>الدالة <strong>Function</strong> هي مجموعة من التعليمات يمكن إعادة استخدامها.</p>
      <p>يتم تعريف الدالة باستخدام الكلمة المفتاحية <strong>function</strong>.</p>
      <p>يمكن تشغيل الدالة عن طريق كتابة اسمها متبوعًا بالأقواس.</p>
      <p>استخدام الدوال يجعل البرنامج أكثر تنظيمًا وأسهل في الصيانة.</p>
    `,

    questions: [
      {
        question: "ما هي الدالة؟",
        answers: ["مجموعة قابلة لإعادة الاستخدام من التعليمات", "عنصر HTML", "خاصية CSS", "نوع من الصور"],
        correct: 0,
      },
      {
        question: "أي كلمة مفتاحية تُستخدم لتعريف Function تقليدية؟",
        answers: ["function", "def", "method", "func"],
        correct: 0,
      },
      {
        question: "كيف يتم استدعاء الدالة greet؟",
        answers: ["greet()", "call greet", "run.greet", "function.greet"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 8 — PARAMETERS & ARGUMENTS
  ======================================================== */

  {
    title: "Parameters و Arguments",

    description: "تعلّم كيف تستقبل الدوال البيانات باستخدام Parameters وArguments.",

    code: `function greet(name) {
  return "مرحبًا " + name;
}

document.getElementById("jsResult").textContent =
  greet("FAYAD");`,

    explanation: `
      <p><strong>Parameter</strong> هو المتغير الموجود داخل تعريف الدالة لاستقبال قيمة.</p>
      <p><strong>Argument</strong> هي القيمة التي نمررها عند استدعاء الدالة.</p>
      <p>في المثال <strong>name</strong> هو Parameter.</p>
      <p>أما <strong>"FAYAD"</strong> فهي Argument تم تمريرها إلى الدالة.</p>
    `,

    questions: [
      {
        question: "ما هو Parameter؟",
        answers: ["متغير تستقبله الدالة", "عنصر HTML", "ملف CSS", "حلقة"],
        correct: 0,
      },
      {
        question: "ما هي Argument؟",
        answers: ["القيمة التي يتم تمريرها إلى الدالة", "اسم الدالة", "اسم الملف", "نوع البيانات"],
        correct: 0,
      },
      {
        question: 'في greet("FAYAD") ما هي Argument؟',
        answers: ['"FAYAD"', "greet", "name", "()"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 9 — RETURN
  ======================================================== */

  {
    title: "Return",

    description: "تعلّم كيف تستخدم return لإرجاع قيمة من الدالة إلى المكان الذي تم استدعاؤها منه.",

    code: `function add(a, b) {
  return a + b;
}

const result = add(5, 3);

document.getElementById("jsResult").textContent = result;`,

    explanation: `
      <p>الكلمة المفتاحية <strong>return</strong> تُرجع قيمة من الدالة.</p>
      <p>بعد تنفيذ <strong>return</strong> تتوقف الدالة عن تنفيذ التعليمات الموجودة بعدها.</p>
      <p>يمكن تخزين القيمة التي أعادتها الدالة داخل متغير.</p>
      <p>هذا يسمح باستخدام نتائج الدوال في أماكن أخرى من البرنامج.</p>
    `,

    questions: [
      {
        question: "ماذا تفعل return؟",
        answers: ["ترجع قيمة من الدالة", "تنشئ Loop", "تحذف متغيرًا", "تغير HTML فقط"],
        correct: 0,
      },
      {
        question: "ماذا يحدث غالبًا بعد تنفيذ return؟",
        answers: ["تتوقف الدالة عن التنفيذ", "تبدأ الحلقة", "يتم إنشاء متغير", "يتم تشغيل CSS"],
        correct: 0,
      },
      {
        question: "ما نتيجة add(5, 3) إذا كانت الدالة ترجع a + b؟",
        answers: ["8", "2", "15", "53"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 10 — ARROW FUNCTIONS
  ======================================================== */

  {
    title: "Arrow Functions",

    description: "تعلّم الصيغة الحديثة لكتابة الدوال باستخدام Arrow Functions.",

    code: `const add = (a, b) => {
  return a + b;
};

document.getElementById("jsResult").textContent =
  add(5, 3);`,

    explanation: `
      <p><strong>Arrow Function</strong> هي صيغة مختصرة وحديثة لكتابة الدوال.</p>
      <p>يتم استخدام الرمز <strong>=&gt;</strong> بين Parameters وجسم الدالة.</p>
      <p>يمكن اختصار الدالة أكثر إذا كانت تحتوي على تعبير واحد.</p>
      <p>Arrow Functions شائعة جدًا في JavaScript الحديثة.</p>
    `,

    questions: [
      {
        question: "أي رمز يستخدم في Arrow Function؟",
        answers: ["=>", "->", "::", "==>"],
        correct: 0,
      },
      {
        question: "أي صيغة صحيحة؟",
        answers: ["const add = (a, b) => a + b;", "const add => (a, b)", "arrow add(a, b)", "function => add"],
        correct: 0,
      },
      {
        question: "ما فائدة Arrow Functions؟",
        answers: ["كتابة الدوال بصيغة حديثة ومختصرة", "إنشاء HTML", "تغيير ألوان CSS", "إدارة قواعد البيانات فقط"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 11 — ARRAYS
  ======================================================== */

  {
    title: "المصفوفات Arrays",

    description: "تعلّم كيف تخزن المصفوفات عدة قيم داخل متغير واحد وكيف تصل إلى عناصرها.",

    code: `const fruits = [
  "Apple",
  "Banana",
  "Orange"
];

document.getElementById("jsResult").textContent =
  fruits[0];`,

    explanation: `
      <p><strong>Array</strong> هي بنية بيانات تسمح بتخزين عدة قيم داخل متغير واحد.</p>
      <p>العناصر داخل Array لها ترتيب رقمي يبدأ من <strong>0</strong>.</p>
      <p>للوصول إلى أول عنصر نستخدم <strong>array[0]</strong>.</p>
      <p>المصفوفات مهمة جدًا عند التعامل مع مجموعات البيانات.</p>
    `,

    questions: [
      {
        question: "ماذا تخزن Array؟",
        answers: ["عدة قيم داخل متغير واحد", "قيمة واحدة فقط", "CSS فقط", "HTML فقط"],
        correct: 0,
      },
      {
        question: "ما رقم فهرس أول عنصر في Array؟",
        answers: ["0", "1", "-1", "10"],
        correct: 0,
      },
      {
        question: "كيف تصل إلى أول عنصر في fruits؟",
        answers: ["fruits[0]", "fruits[1]", "fruits.first", "fruits()"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 12 — ARRAY METHODS
  ======================================================== */

  {
    title: "دوال المصفوفات",

    description: "تعلّم بعض أهم الدوال المستخدمة للتعامل مع Arrays مثل push وpop وmap وfilter.",

    code: `const numbers = [1, 2, 3];

numbers.push(4);

document.getElementById("jsResult").textContent =
  numbers.join(", ");`,

    explanation: `
      <p>JavaScript توفر العديد من <strong>Array Methods</strong> للتعامل مع المصفوفات.</p>
      <p><strong>push()</strong> تضيف عنصرًا إلى نهاية المصفوفة.</p>
      <p><strong>pop()</strong> تحذف آخر عنصر.</p>
      <p><strong>map()</strong> تنشئ Array جديدة بعد تطبيق عملية على العناصر.</p>
      <p><strong>filter()</strong> تستخدم لاختيار العناصر التي تحقق شرطًا معينًا.</p>
    `,

    questions: [
      {
        question: "ماذا تفعل push()؟",
        answers: ["تضيف عنصرًا إلى نهاية Array", "تحذف أول عنصر", "تحذف Array", "تنشئ Function"],
        correct: 0,
      },
      {
        question: "أي Method تحذف آخر عنصر؟",
        answers: ["pop()", "push()", "remove()", "deleteLast()"],
        correct: 0,
      },
      {
        question: "ما الاستخدام الشائع لـ filter()؟",
        answers: ["اختيار العناصر التي تحقق شرطًا", "إضافة عنصر دائمًا", "حذف كل العناصر", "إنشاء HTML"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 13 — OBJECTS
  ======================================================== */

  {
    title: "الكائنات Objects",

    description: "تعلّم كيف تخزن Objects البيانات المرتبطة باستخدام Properties وValues.",

    code: `const user = {
  name: "FAYAD",
  age: 20,
  student: true
};

document.getElementById("jsResult").textContent =
  user.name;`,

    explanation: `
      <p><strong>Object</strong> يستخدم لتجميع البيانات المرتبطة داخل بنية واحدة.</p>
      <p>يحتوي Object على <strong>Properties</strong>، ولكل Property قيمة.</p>
      <p>في المثال <strong>name</strong> و<strong>age</strong> و<strong>student</strong> هي Properties.</p>
      <p>يمكن الوصول إلى Property باستخدام النقطة مثل <strong>user.name</strong>.</p>
    `,

    questions: [
      {
        question: "ماذا يحتوي Object عادةً؟",
        answers: ["Properties وValues", "CSS فقط", "HTML فقط", "أرقام فقط"],
        correct: 0,
      },
      {
        question: "كيف تصل إلى name داخل user؟",
        answers: ["user.name", "user->name", "user[name()]", "name.user"],
        correct: 0,
      },
      {
        question: "ما هي name في user.name؟",
        answers: ["Property", "Loop", "Function", "Array"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 14 — OBJECT METHODS
  ======================================================== */

  {
    title: "دوال الكائنات",

    description: "تعلّم كيف يمكن للكائنات أن تحتوي على Functions تُعرف باسم Methods.",

    code: `const user = {
  name: "FAYAD",

  greet() {
    return "Hello " + this.name;
  }
};

document.getElementById("jsResult").textContent =
  user.greet();`,

    explanation: `
      <p><strong>Method</strong> هي Function مرتبطة بكائن Object.</p>
      <p>يمكن تعريف Method داخل Object.</p>
      <p>الكلمة المفتاحية <strong>this</strong> تشير في هذا السياق إلى الكائن الذي ينتمي إليه الـMethod.</p>
      <p>Methods تسمح للكائن بتجميع البيانات والسلوك معًا.</p>
    `,

    questions: [
      {
        question: "ما هي Method؟",
        answers: ["Function داخل Object", "خاصية CSS", "HTML Attribute", "Array"],
        correct: 0,
      },
      {
        question: "ما الذي تشير إليه this غالبًا داخل Method الخاصة بالكائن؟",
        answers: ["الكائن الحالي", "ملف CSS", "المتصفح فقط", "Array دائمًا"],
        correct: 0,
      },
      {
        question: "كيف تستدعي greet داخل user؟",
        answers: ["user.greet()", "greet.user", "user->greet", "call.user"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 15 — DOM
  ======================================================== */

  {
    title: "مقدمة إلى DOM",

    description: "تعلّم كيف تمثل JavaScript صفحة HTML من خلال Document Object Model وكيف تتعامل معها.",

    code: `const title =
  document.getElementById("lessonTitle");

document.getElementById("jsResult").textContent =
  title.textContent;`,

    explanation: `
      <p><strong>DOM</strong> اختصار لـ Document Object Model.</p>
      <p>يقوم المتصفح بتمثيل مستند HTML كهيكل من العناصر والكائنات.</p>
      <p>JavaScript تستطيع الوصول إلى هذه العناصر وتغييرها والتفاعل معها.</p>
      <p>الـDOM هو الأساس الذي يسمح لـJavaScript بالتعامل مع واجهة الصفحة.</p>
    `,

    questions: [
      {
        question: "ماذا يعني DOM؟",
        answers: ["Document Object Model", "Data Object Method", "Document Order Manager", "Dynamic Object Module"],
        correct: 0,
      },
      {
        question: "ما الذي يسمح DOM لـJavaScript بالتعامل معه؟",
        answers: ["عناصر صفحة HTML", "ملفات النظام فقط", "كروت الشاشة", "ملفات الصوت فقط"],
        correct: 0,
      },
      {
        question: "من الذي ينشئ DOM عند تحميل صفحة HTML؟",
        answers: ["المتصفح", "CSS", "قاعدة البيانات", "المستخدم يدويًا"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 16 — SELECTING ELEMENTS
  ======================================================== */

  {
    title: "اختيار العناصر",

    description: "تعلّم الطرق الأساسية لاختيار عناصر HTML باستخدام JavaScript.",

    code: `const title =
  document.querySelector("h1");

document.getElementById("jsResult").textContent =
  title.textContent;`,

    explanation: `
      <p><strong>querySelector()</strong> تختار أول عنصر يطابق CSS Selector معين.</p>
      <p><strong>getElementById()</strong> تختار عنصرًا باستخدام قيمة ID.</p>
      <p>اختيار العناصر هو الخطوة الأولى قبل تعديلها أو التعامل معها.</p>
      <p>يمكن استخدام Selectors مثل <strong>h1</strong> و<strong>.class</strong> و<strong>#id</strong>.</p>
    `,

    questions: [
      {
        question: "أي Method تستخدم CSS Selector لاختيار عنصر؟",
        answers: ["querySelector()", "selectElement()", "getCSS()", "findCSS()"],
        correct: 0,
      },
      {
        question: "ما الذي يستخدمه getElementById()؟",
        answers: ["ID العنصر", "اسم CSS", "اسم الملف", "اسم المتصفح"],
        correct: 0,
      },
      {
        question: "ماذا يعيد querySelector() عند وجود أكثر من عنصر مطابق؟",
        answers: ["أول عنصر مطابق", "كل العناصر", "آخر عنصر فقط", "لا شيء"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 17 — CHANGING CONTENT
  ======================================================== */

  {
    title: "تغيير المحتوى",

    description: "تعلّم كيف تغيّر JavaScript النصوص والمحتوى الموجود داخل عناصر HTML.",

    code: `const title =
  document.querySelector("h1");

title.textContent = "مرحبًا من JavaScript";

document.getElementById("jsResult").textContent =
  title.textContent;`,

    explanation: `
      <p><strong>textContent</strong> تسمح بقراءة أو تغيير النص الموجود داخل العنصر.</p>
      <p>يمكن استخدامها لتحديث محتوى الصفحة بناءً على تفاعل المستخدم أو البيانات.</p>
      <p>عند إسناد قيمة جديدة إلى textContent يتم تحديث النص في الصفحة مباشرة.</p>
      <p>هذه من أكثر عمليات DOM استخدامًا.</p>
    `,

    questions: [
      {
        question: "أي Property تغيّر النص داخل العنصر؟",
        answers: ["textContent", "textChange", "contentText", "changeText"],
        correct: 0,
      },
      {
        question: 'ماذا يحدث عند كتابة element.textContent = "Hello"؟',
        answers: ["يتغير النص داخل العنصر", "يتم حذف JavaScript", "يتغير CSS فقط", "يتم إنشاء Array"],
        correct: 0,
      },
      {
        question: "هل يمكن استخدام textContent لقراءة النص؟",
        answers: ["نعم", "لا", "فقط داخل CSS", "فقط داخل HTML"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 18 — EVENTS
  ======================================================== */

  {
    title: "الأحداث Events",

    description: "تعلّم كيف تستجيب JavaScript لأفعال المستخدم مثل الضغط والكتابة وتحريك الماوس.",

    code: `const button =
  document.querySelector("button");

button.addEventListener("click", () => {
  document.getElementById("jsResult").textContent =
    "تم الضغط على الزر";
});`,

    explanation: `
      <p><strong>Event</strong> هو حدث يحدث داخل الصفحة مثل الضغط على زر.</p>
      <p><strong>addEventListener()</strong> تُستخدم للاستماع إلى حدث معين.</p>
      <p>في المثال نستمع إلى حدث <strong>click</strong>.</p>
      <p>عند حدوث الحدث يتم تنفيذ Function معينة.</p>
    `,

    questions: [
      {
        question: "أي Method تستمع إلى الأحداث؟",
        answers: ["addEventListener()", "listenEvent()", "eventClick()", "watchEvent()"],
        correct: 0,
      },
      {
        question: "ما اسم الحدث الذي يحدث عند الضغط على زر؟",
        answers: ["click", "press", "button", "tapOnly"],
        correct: 0,
      },
      {
        question: "ماذا يحدث عند وقوع Event؟",
        answers: ["يمكن تنفيذ Function مرتبطة به", "يتوقف المتصفح", "يُحذف HTML", "يتم حذف CSS"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 19 — DESTRUCTURING
  ======================================================== */

  {
    title: "Destructuring",

    description: "تعلّم كيف تستخرج القيم من Arrays وObjects بطريقة مختصرة ومنظمة.",

    code: `const user = {
  name: "FAYAD",
  age: 20
};

const { name, age } = user;

document.getElementById("jsResult").textContent =
  name + " - " + age;`,

    explanation: `
      <p><strong>Destructuring</strong> تسمح باستخراج القيم من Object أو Array داخل متغيرات.</p>
      <p>بدلًا من كتابة <strong>user.name</strong> و<strong>user.age</strong> عدة مرات يمكن استخراج القيم مباشرة.</p>
      <p>يُستخدم Destructuring بكثرة في JavaScript الحديثة.</p>
      <p>يمكن استخدامه مع Objects وArrays.</p>
    `,

    questions: [
      {
        question: "ما فائدة Destructuring؟",
        answers: ["استخراج القيم بسهولة من Objects وArrays", "إنشاء CSS", "إنشاء HTML", "تشغيل المتصفح"],
        correct: 0,
      },
      {
        question: "أي صيغة تستخدم Destructuring من Object؟",
        answers: ["const { name } = user;", "const name = { user };", "const [name] = user;", "destructure(user)"],
        correct: 0,
      },
      {
        question: "هل يمكن استخدام Destructuring مع Arrays؟",
        answers: ["نعم", "لا", "فقط مع CSS", "فقط مع Functions"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 20 — SPREAD & REST
  ======================================================== */

  {
    title: "Spread و Rest",

    description: "تعلّم استخدام ... في نسخ وتجميع القيم مع Arrays وObjects وFunctions.",

    code: `const numbers = [1, 2, 3];

const newNumbers = [
  ...numbers,
  4
];

document.getElementById("jsResult").textContent =
  newNumbers.join(", ");`,

    explanation: `
      <p>الرمز <strong>...</strong> يستخدم في JavaScript الحديثة بأكثر من طريقة.</p>
      <p><strong>Spread</strong> يفكك القيم داخل Array أو Object لاستخدامها في مكان آخر.</p>
      <p><strong>Rest</strong> يجمع عدة قيم داخل Array واحدة في Parameters الخاصة بالدالة.</p>
      <p>الفرق يعتمد على السياق الذي يتم فيه استخدام الرمز.</p>
    `,

    questions: [
      {
        question: "ما الرمز المستخدم في Spread وRest؟",
        answers: ["...", "***", ">>>", "::"],
        correct: 0,
      },
      {
        question: "ماذا يفعل Spread مع Array؟",
        answers: ["يفكك عناصرها لاستخدامها في Array أخرى", "يحذفها", "يحولها إلى String", "يوقف البرنامج"],
        correct: 0,
      },
      {
        question: "ماذا يفعل Rest Parameters؟",
        answers: ["يجمع عدة قيم داخل Array", "يحذف القيم", "ينشئ HTML", "ينشئ CSS"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 21 — MODULES
  ======================================================== */

  {
    title: "Modules",

    description: "تعلّم كيف تقسّم JavaScript إلى ملفات مستقلة باستخدام export وimport.",

    code: `// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";

document.getElementById("jsResult").textContent =
  add(5, 3);`,

    explanation: `
      <p><strong>Modules</strong> تسمح بتقسيم البرنامج إلى ملفات منفصلة ومنظمة.</p>
      <p><strong>export</strong> تجعل قيمة أو Function متاحة لملفات أخرى.</p>
      <p><strong>import</strong> تستخدم لاستيراد ما تم تصديره من Module أخرى.</p>
      <p>استخدام Modules يساعد في تنظيم المشاريع الكبيرة.</p>
    `,

    questions: [
      {
        question: "لماذا نستخدم Modules؟",
        answers: ["لتقسيم وتنظيم الكود بين ملفات متعددة", "لتغيير ألوان CSS", "لاستبدال HTML", "لإنشاء الصور"],
        correct: 0,
      },
      {
        question: "أي كلمة تستخدم لتصدير Function؟",
        answers: ["export", "send", "public", "share"],
        correct: 0,
      },
      {
        question: "أي كلمة تستخدم لاستيراد قيمة؟",
        answers: ["import", "include", "requireOnly", "load"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 22 — ASYNC JAVASCRIPT
  ======================================================== */

  {
    title: "JavaScript غير المتزامنة",

    description: "تعرّف على مفهوم Asynchronous JavaScript وكيفية التعامل مع المهام التي تستغرق وقتًا.",

    code: `document.getElementById("jsResult").textContent =
  "ابدأ";

setTimeout(() => {
  document.getElementById("jsResult").textContent =
    "اكتملت المهمة";
}, 1000);`,

    explanation: `
      <p><strong>Asynchronous JavaScript</strong> تسمح للبرنامج بالتعامل مع مهام لا تنتهي فورًا.</p>
      <p>من أمثلة ذلك طلب البيانات من Server أو الانتظار باستخدام Timer.</p>
      <p><strong>setTimeout()</strong> تسمح بتأجيل تنفيذ Function لمدة محددة.</p>
      <p>الهدف هو التعامل مع المهام التي تحتاج إلى وقت دون تجميد تجربة المستخدم.</p>
    `,

    questions: [
      {
        question: "ماذا يعني Asynchronous؟",
        answers: [
          "تنفيذ المهام بطريقة لا تتطلب الانتظار لكل شيء قبل الاستمرار",
          "إيقاف البرنامج",
          "حذف HTML",
          "تغيير CSS",
        ],
        correct: 0,
      },
      {
        question: "أي Function تستخدم لتأخير التنفيذ؟",
        answers: ["setTimeout()", "delayCode()", "waitJS()", "pauseScript()"],
        correct: 0,
      },
      {
        question: "أين تظهر الحاجة إلى Async JavaScript كثيرًا؟",
        answers: ["طلبات الشبكة والعمليات التي تستغرق وقتًا", "كتابة CSS فقط", "كتابة HTML فقط", "تغيير الخطوط فقط"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 23 — PROMISES
  ======================================================== */

  {
    title: "Promises",

    description: "تعلّم كيف تمثل Promises نتيجة عملية غير متزامنة قد تنجح أو تفشل.",

    code: `const promise = new Promise((resolve) => {
  resolve("نجحت العملية");
});

promise.then((result) => {
  document.getElementById("jsResult").textContent =
    result;
});`,

    explanation: `
      <p><strong>Promise</strong> تمثل نتيجة مستقبلية لعملية غير متزامنة.</p>
      <p>يمكن أن تكون العملية في حالة Pending أو Fulfilled أو Rejected.</p>
      <p><strong>resolve</strong> تستخدم للإشارة إلى نجاح العملية.</p>
      <p><strong>then()</strong> تستخدم للتعامل مع النتيجة عند نجاح Promise.</p>
    `,

    questions: [
      {
        question: "ماذا تمثل Promise؟",
        answers: ["النتيجة المستقبلية لعملية غير متزامنة", "عنصر HTML", "لون CSS", "Array فقط"],
        correct: 0,
      },
      {
        question: "ماذا يعني Fulfilled؟",
        answers: ["نجحت العملية", "العملية بدأت فقط", "فشلت العملية", "تم حذف Promise"],
        correct: 0,
      },
      {
        question: "أي Method تستخدم للتعامل مع نجاح Promise؟",
        answers: ["then()", "success()", "doneOnly()", "resolveThen()"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 24 — FETCH API
  ======================================================== */

  {
    title: "Fetch API",

    description: "تعلّم كيف تستخدم Fetch API لإرسال طلبات HTTP والحصول على البيانات من Server أو API.",

    code: `fetch("https://example.com/data")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });`,

    explanation: `
      <p><strong>Fetch API</strong> توفر طريقة حديثة لإرسال HTTP Requests من JavaScript.</p>
      <p>يمكن استخدامها لجلب بيانات من API أو Server.</p>
      <p>النتيجة الأولية تكون Response ويمكن تحويلها إلى JSON باستخدام <strong>response.json()</strong>.</p>
      <p>عادةً يتم التعامل مع النتيجة باستخدام Promises أو <strong>async/await</strong>.</p>
    `,

    questions: [
      {
        question: "فيما تستخدم fetch() غالبًا؟",
        answers: ["إرسال طلبات والحصول على بيانات من Server", "تغيير ألوان CSS", "إنشاء HTML Tags", "إنشاء صور"],
        correct: 0,
      },
      {
        question: "ماذا تفعل response.json()؟",
        answers: ["تحول Response إلى بيانات JSON قابلة للاستخدام", "تحذف Response", "ترسل CSS", "تنشئ HTML"],
        correct: 0,
      },
      {
        question: "هل fetch() مرتبطة بالتعامل مع الشبكة؟",
        answers: ["نعم", "لا", "فقط مع CSS", "فقط مع Arrays"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     LESSON 25 — ERROR HANDLING
  ======================================================== */

  {
    title: "معالجة الأخطاء",

    description: "تعلّم كيف تتعامل مع الأخطاء باستخدام try وcatch وfinally.",

    code: `try {
  const result = unknownVariable;

  document.getElementById("jsResult").textContent =
    result;
} catch (error) {
  document.getElementById("jsResult").textContent =
    "حدث خطأ";
}`,

    explanation: `
      <p>الأخطاء يمكن أن تحدث أثناء تشغيل JavaScript لأسباب مختلفة.</p>
      <p><strong>try</strong> تحتوي على الكود الذي قد ينتج عنه خطأ.</p>
      <p><strong>catch</strong> تستقبل الخطأ وتسمح لنا بالتعامل معه بدلًا من ترك البرنامج يتوقف بشكل غير متوقع.</p>
      <p><strong>finally</strong> يمكن استخدامها لتنفيذ كود سواء حدث خطأ أم لا.</p>
    `,

    questions: [
      {
        question: "أي Block تستخدم للتعامل مع الخطأ؟",
        answers: ["catch", "errorBlock", "handle", "exceptOnly"],
        correct: 0,
      },
      {
        question: "أين نضع الكود الذي قد ينتج عنه خطأ؟",
        answers: ["try", "catch", "finally", "error"],
        correct: 0,
      },
      {
        question: "متى يمكن استخدام finally؟",
        answers: [
          "لتنفيذ كود بعد انتهاء try/catch سواء حدث خطأ أم لا",
          "فقط عند حدوث خطأ",
          "فقط عند نجاح try",
          "لإنشاء Function",
        ],
        correct: 0,
      },
    ],
  },
];

/* =========================================================
   2. CONSTANTS & STATE
========================================================= */

const QUIZ_QUESTION_COUNT = 3;

let currentLesson = 0;
let currentQuestion = 0;

let quizLocked = false;
let currentQuestionPassed = false;

/* =========================================================
   3. COMPLETED LESSONS
========================================================= */

let completedLessons = [];

try {
  const savedProgress = JSON.parse(localStorage.getItem("fayad-js-completed-lessons") || "[]");

  if (Array.isArray(savedProgress)) {
    completedLessons = savedProgress.map(Number).filter(Number.isInteger);
  }
} catch (error) {
  completedLessons = [];
}

/* =========================================================
   4. DOM ELEMENTS
========================================================= */

const lessonButtons = document.querySelectorAll(".lesson");

const lessonNumber = document.getElementById("lessonNumber");

const lessonTitle = document.getElementById("lessonTitle");

const lessonDescription = document.getElementById("lessonDescription");

const exampleCode = document.getElementById("exampleCode");

const exampleExplanation = document.getElementById("exampleExplanation");

const progressText = document.getElementById("progressText");

const progressFill = document.getElementById("progressFill");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const copyButton = document.getElementById("copyButton");

const jsEditor = document.getElementById("jsEditor");

const runButton = document.getElementById("runButton");

const resetButton = document.getElementById("resetButton");

const jsResult = document.getElementById("jsResult");

const output = document.getElementById("output");

/* =========================================================
   QUIZ ELEMENTS
========================================================= */

const quizQuestionNumber = document.getElementById("quizQuestionNumber");

const quizTotalQuestions = document.getElementById("quizTotalQuestions");

const questionTitle = document.getElementById("questionTitle");

const answerOptions = document.getElementById("answerOptions");

const answerFeedback = document.getElementById("answerFeedback");

const quizNextButton = document.getElementById("quizNextButton");

/* =========================================================
   5. SAVE PROGRESS
========================================================= */

function saveProgress() {
  localStorage.setItem("fayad-js-completed-lessons", JSON.stringify(completedLessons));
}

/* =========================================================
   6. MARK LESSON COMPLETE
========================================================= */

function markLessonCompleted(index) {
  if (!completedLessons.includes(index)) {
    completedLessons.push(index);
    completedLessons.sort((a, b) => a - b);
    saveProgress();
  }
}

/* =========================================================
   7. GET LESSON QUESTIONS
========================================================= */

function getCurrentQuestions() {
  const lesson = lessons[currentLesson];

  if (!lesson || !Array.isArray(lesson.questions)) {
    return [];
  }

  return lesson.questions.slice(0, QUIZ_QUESTION_COUNT);
}

/* =========================================================
   8. RESET QUIZ
========================================================= */

function resetQuiz() {
  currentQuestion = 0;

  quizLocked = false;

  currentQuestionPassed = false;

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
  }

  if (quizNextButton) {
    quizNextButton.disabled = true;
    quizNextButton.textContent = "السؤال التالي";
  }
}

/* =========================================================
   9. UPDATE QUIZ
========================================================= */

function updateQuiz() {
  const questions = getCurrentQuestions();

  if (!questions.length) {
    return;
  }

  const question = questions[currentQuestion];

  if (!question) {
    return;
  }

  /* QUESTION NUMBER */

  if (quizQuestionNumber) {
    quizQuestionNumber.textContent = `السؤال ${currentQuestion + 1}`;
  }

  /* TOTAL */

  if (quizTotalQuestions) {
    quizTotalQuestions.textContent = String(QUIZ_QUESTION_COUNT);
  }

  /* QUESTION TEXT */

  if (questionTitle) {
    questionTitle.textContent = question.question;
  }

  /* ANSWERS */

  if (answerOptions) {
    answerOptions.innerHTML = "";

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");

      button.type = "button";

      button.textContent = answer;

      button.dataset.index = String(index);

      button.addEventListener("click", () => handleAnswer(index));

      answerOptions.appendChild(button);
    });
  }

  /* FEEDBACK */

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
  }

  /* NEXT BUTTON */

  if (quizNextButton) {
    quizNextButton.disabled = true;

    if (currentQuestion === QUIZ_QUESTION_COUNT - 1) {
      quizNextButton.textContent = "إكمال الدرس";
    } else {
      quizNextButton.textContent = "السؤال التالي";
    }
  }
}

/* =========================================================
   10. HANDLE ANSWER
========================================================= */

function handleAnswer(selectedIndex) {
  if (quizLocked) {
    return;
  }

  const questions = getCurrentQuestions();

  const question = questions[currentQuestion];

  if (!question) {
    return;
  }

  const buttons = answerOptions.querySelectorAll("button");

  /* WRONG ANSWER */

  if (selectedIndex !== question.correct) {
    if (answerFeedback) {
      answerFeedback.textContent = "✗ إجابة غير صحيحة، حاول مرة أخرى.";

      answerFeedback.className = "answer-feedback wrong-answer";
    }

    const selectedButton = buttons[selectedIndex];

    if (selectedButton) {
      selectedButton.classList.add("wrong-answer");
    }

    return;
  }

  /* CORRECT ANSWER */

  quizLocked = true;

  currentQuestionPassed = true;

  const correctButton = buttons[question.correct];

  if (correctButton) {
    correctButton.classList.add("correct-answer");
  }

  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (answerFeedback) {
    answerFeedback.textContent = "✓ إجابة صحيحة! أحسنت.";

    answerFeedback.className = "answer-feedback correct-answer";
  }

  if (quizNextButton) {
    quizNextButton.disabled = false;
  }
}

/* =========================================================
   11. NEXT QUESTION / COMPLETE LESSON
========================================================= */

function handleQuizNext() {
  if (!currentQuestionPassed) {
    return;
  }

  /* MOVE TO NEXT QUESTION */

  if (currentQuestion < QUIZ_QUESTION_COUNT - 1) {
    currentQuestion++;

    quizLocked = false;

    currentQuestionPassed = false;

    updateQuiz();

    return;
  }

  /* LESSON COMPLETED */

  markLessonCompleted(currentLesson);

  /* UPDATE SIDEBAR */

  updateSidebar();

  /* MOVE TO NEXT LESSON */

  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    if (quizNextButton) {
      quizNextButton.disabled = true;

      quizNextButton.textContent = "اكتمل المسار ✓";
    }

    if (answerFeedback) {
      answerFeedback.textContent = "🎉 ممتاز! لقد أكملت جميع دروس JavaScript.";

      answerFeedback.className = "answer-feedback correct-answer";
    }
  }
}

/* =========================================================
   12. UPDATE SIDEBAR
========================================================= */

function updateSidebar() {
  lessonButtons.forEach((button, index) => {
    const status = button.querySelector(".lesson-status");

    /* ACTIVE */

    button.classList.toggle("active", index === currentLesson);

    /* CURRENT */

    if (status) {
      status.classList.toggle("current", index === currentLesson);

      /* COMPLETED */

      if (completedLessons.includes(index)) {
        status.classList.add("completed");

        status.textContent = "✓";
      } else {
        status.classList.remove("completed");

        status.textContent = String(index + 1).padStart(2, "0");
      }
    }
  });
}

/* =========================================================
   13. UPDATE COURSE PROGRESS
========================================================= */

function updateProgress() {
  const completedCount = completedLessons.length;

  const progress = Math.round((completedCount / lessons.length) * 100);

  if (progressText) {
    progressText.textContent = `${progress}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
}

/* =========================================================
   14. UPDATE NAVIGATION
========================================================= */

function updateNavigation() {
  if (!previousButton || !nextButton) {
    return;
  }

  /* PREVIOUS */

  previousButton.disabled = currentLesson === 0;

  const previousStrong = previousButton.querySelector("strong");

  if (previousStrong) {
    if (currentLesson > 0) {
      previousStrong.textContent = lessons[currentLesson - 1].title;
    } else {
      previousStrong.textContent = "CSS Learning";
    }
  }

  /* NEXT */

  nextButton.disabled = currentLesson === lessons.length - 1;

  const nextStrong = nextButton.querySelector("strong");

  if (nextStrong) {
    if (currentLesson < lessons.length - 1) {
      nextStrong.textContent = lessons[currentLesson + 1].title;
    } else {
      nextStrong.textContent = "اكتمل المسار";
    }
  }
}

/* =========================================================
   15. LOAD LESSON
========================================================= */

function loadLesson(index) {
  if (index < 0) {
    index = 0;
  }

  if (index >= lessons.length) {
    index = lessons.length - 1;
  }

  currentLesson = index;

  const lesson = lessons[currentLesson];

  if (!lesson) {
    return;
  }

  /* RESET QUIZ */

  resetQuiz();

  /* LESSON NUMBER */

  if (lessonNumber) {
    lessonNumber.textContent = `الدرس ${String(currentLesson + 1).padStart(2, "0")}`;
  }

  /* TITLE */

  if (lessonTitle) {
    lessonTitle.textContent = lesson.title;
  }

  /* DESCRIPTION */

  if (lessonDescription) {
    lessonDescription.textContent = lesson.description;
  }

  /* CODE */

  if (exampleCode) {
    exampleCode.textContent = lesson.code;
  }

  /* EXPLANATION */

  if (exampleExplanation) {
    exampleExplanation.innerHTML = lesson.explanation || "";
  }

  /* EDITOR */

  if (jsEditor) {
    jsEditor.value = lesson.code;
  }

  /* SIDEBAR */

  updateSidebar();

  /* PROGRESS */

  updateProgress();

  /* NAVIGATION */

  updateNavigation();

  /* QUIZ */

  updateQuiz();

  /* SAVE CURRENT LESSON */

  localStorage.setItem("fayad-js-current-lesson", String(currentLesson));

  /* RUN CODE */

  runJavaScript();
}

/* =========================================================
   16. SIDEBAR EVENTS
========================================================= */

lessonButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    loadLesson(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   17. PREVIOUS BUTTON
========================================================= */

if (previousButton) {
  previousButton.addEventListener("click", () => {
    if (currentLesson > 0) {
      loadLesson(currentLesson - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

/* =========================================================
   18. NEXT BUTTON
========================================================= */

if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (currentLesson < lessons.length - 1) {
      loadLesson(currentLesson + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

/* =========================================================
   19. QUIZ NEXT BUTTON
========================================================= */

if (quizNextButton) {
  quizNextButton.addEventListener("click", handleQuizNext);
}

/* =========================================================
   20. RUN JAVASCRIPT
========================================================= */

function runJavaScript() {
  if (!jsEditor || !output) {
    return;
  }

  const code = jsEditor.value;

  /* RESET OUTPUT */

  output.textContent = "جاري التشغيل...";

  /* RESET RESULT */

  if (jsResult) {
    jsResult.textContent = "Hello FAYAD";
  }

  try {
    const customConsole = {
      log: (...values) => {
        output.textContent = values
          .map((value) => {
            if (typeof value === "object" && value !== null) {
              try {
                return JSON.stringify(value, null, 2);
              } catch (error) {
                return String(value);
              }
            }

            return String(value);
          })
          .join(" ");
      },
    };

    const executeCode = new Function("console", code);

    executeCode(customConsole);

    /* SHOW DOM RESULT */

    if (jsResult && jsResult.textContent !== "Hello FAYAD") {
      output.textContent = jsResult.textContent;
    }

    /* EMPTY OUTPUT */

    if (output.textContent === "جاري التشغيل...") {
      output.textContent = "تم تشغيل الكود بنجاح.";
    }
  } catch (error) {
    output.textContent = `خطأ: ${error.message}`;
  }
}

/* =========================================================
   21. RUN BUTTON
========================================================= */

if (runButton) {
  runButton.addEventListener("click", () => {
    runJavaScript();
  });
}

/* =========================================================
   22. RESET BUTTON
========================================================= */

if (resetButton) {
  resetButton.addEventListener("click", () => {
    const lesson = lessons[currentLesson];

    if (!lesson) {
      return;
    }

    jsEditor.value = lesson.code;

    output.textContent = "ستظهر النتيجة هنا.";

    runJavaScript();
  });
}

/* =========================================================
   23. COPY CODE
========================================================= */

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const code = exampleCode ? exampleCode.textContent : "";

    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);

      copyButton.textContent = "تم النسخ ✓";

      setTimeout(() => {
        copyButton.textContent = "نسخ";
      }, 1500);
    } catch (error) {
      /* FALLBACK */

      try {
        const temporary = document.createElement("textarea");

        temporary.value = code;

        document.body.appendChild(temporary);

        temporary.select();

        document.execCommand("copy");

        temporary.remove();

        copyButton.textContent = "تم النسخ ✓";

        setTimeout(() => {
          copyButton.textContent = "نسخ";
        }, 1500);
      } catch (fallbackError) {
        copyButton.textContent = "فشل النسخ";

        setTimeout(() => {
          copyButton.textContent = "نسخ";
        }, 1500);
      }
    }
  });
}

/* =========================================================
   24. KEYBOARD NAVIGATION
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.target && (event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT")) {
    return;
  }

  /* RTL:
       ArrowLeft = Previous
       ArrowRight = Next
    */

  if (event.key === "ArrowLeft" && currentLesson > 0) {
    loadLesson(currentLesson - 1);
  }

  if (event.key === "ArrowRight" && currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);
  }
});

/* =========================================================
   25. VALIDATE LESSON DATA
========================================================= */

function validateLessons() {
  if (lessons.length !== 25) {
    console.warn(`FAYAD: Expected 25 lessons, found ${lessons.length}.`);
  }

  lessons.forEach((lesson, index) => {
    if (!lesson.title) {
      console.warn(`Lesson ${index + 1} has no title.`);
    }

    if (!Array.isArray(lesson.questions) || lesson.questions.length !== QUIZ_QUESTION_COUNT) {
      console.warn(`Lesson ${index + 1} must contain exactly 3 questions.`);
    }
  });
}

/* =========================================================
   26. INITIALIZE
========================================================= */

function initializeLearningEngine() {
  validateLessons();

  let savedLesson = Number(localStorage.getItem("fayad-js-current-lesson"));

  if (!Number.isInteger(savedLesson) || savedLesson < 0 || savedLesson >= lessons.length) {
    savedLesson = 0;
  }

  loadLesson(savedLesson);
}

/* =========================================================
   27. START
========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLearningEngine);
} else {
  initializeLearningEngine();
}
