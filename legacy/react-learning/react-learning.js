/* =========================================================
   FAYAD — REACT LEARNING JAVASCRIPT
   ========================================================= */

/* =========================================================
   1. LESSON DATA
   ========================================================= */

const lessons = [
  {
    title: "مقدمة إلى React",
    description: "تعرّف على React، ولماذا أصبحت من أشهر المكتبات المستخدمة لبناء واجهات المستخدم الحديثة.",
    content: `
      <p>
        React هي مكتبة JavaScript تُستخدم لبناء واجهات المستخدم
        (User Interfaces)، خصوصًا التطبيقات التفاعلية التي تتغير
        بياناتها باستمرار.
      </p>
      <p>
        تعتمد React على فكرة تقسيم الواجهة إلى مكونات صغيرة تسمى
        Components، بحيث يكون لكل مكون مسؤولية واضحة ويمكن إعادة
        استخدامه في أكثر من مكان.
      </p>
      <p>
        React لا تستبدل HTML أو CSS أو JavaScript، بل تعمل معها
        لبناء واجهات أكثر تنظيمًا وقابلية للصيانة.
      </p>
    `,
    keyIdea: "الفكرة الأساسية في React هي بناء الواجهة باستخدام Components قابلة لإعادة الاستخدام.",
    explanation: "في React تكتب مكونات تصف الشكل الذي تريد عرضه، ثم تتولى React تحديث الواجهة عندما تتغير البيانات.",
    practice: "جرّب تعديل النص داخل العنصر h1 وشاهد النتيجة في المعاينة.",
    code: `function App() {
  return <h1>مرحبًا بك في FAYAD</h1>;
}`,
    questions: [
      {
        question: "ما الاستخدام الأساسي لمكتبة React؟",
        answers: [
          "بناء واجهات المستخدم",
          "إدارة قواعد البيانات فقط",
          "كتابة ملفات CSS فقط",
          "استبدال JavaScript بالكامل",
        ],
        correct: 0,
      },
      {
        question: "بماذا تعتمد React بشكل أساسي في تنظيم الواجهة؟",
        answers: ["Components", "Database Tables", "CSS Selectors", "SQL Queries"],
        correct: 0,
      },
      {
        question: "هل React تستبدل HTML وCSS وJavaScript بالكامل؟",
        answers: ["لا، تعمل معها لبناء الواجهات", "نعم، تستبدلهم جميعًا", "تستبدل CSS فقط", "تستبدل HTML فقط"],
        correct: 0,
      },
    ],
  },

  {
    title: "لماذا React؟",
    description: "افهم أهم الأسباب التي تجعل React مناسبة لبناء التطبيقات الحديثة والقابلة للتوسع.",
    content: `
      <p>
        من أهم أسباب انتشار React أنها تعتمد على المكونات القابلة
        لإعادة الاستخدام.
      </p>
      <p>
        بدلًا من كتابة نفس الواجهة عدة مرات، يمكنك إنشاء Component
        واحد واستخدامه في أماكن متعددة.
      </p>
      <p>
        كما تساعد React على تنظيم التطبيقات الكبيرة وتقسيمها إلى
        أجزاء صغيرة يمكن تطويرها واختبارها بشكل مستقل.
      </p>
    `,
    keyIdea: "إعادة استخدام المكونات تجعل الكود أكثر تنظيمًا وأسهل في الصيانة.",
    explanation: "عندما يكون لديك Button أو Card أو Navbar متكرر، يمكنك بناءه مرة واحدة ثم استخدامه في أماكن مختلفة.",
    practice: "أنشئ Component باسم Button يعرض زرًا بسيطًا.",
    code: `function Button() {
  return <button>اضغط هنا</button>;
}`,
    questions: [
      {
        question: "ما إحدى أهم مزايا React؟",
        answers: [
          "إعادة استخدام المكونات",
          "إلغاء الحاجة إلى JavaScript",
          "إلغاء الحاجة إلى HTML",
          "استخدام قواعد البيانات فقط",
        ],
        correct: 0,
      },
      {
        question: "لماذا تساعد Components في المشاريع الكبيرة؟",
        answers: ["تقسم التطبيق إلى أجزاء منظمة", "تحذف CSS", "تحذف JavaScript", "تمنع استخدام APIs"],
        correct: 0,
      },
      {
        question: "ماذا يعني Reusability؟",
        answers: [
          "إمكانية استخدام نفس المكون أكثر من مرة",
          "كتابة الكود مرة واحدة ثم حذفه",
          "منع استخدام المكون",
          "استخدام CSS فقط",
        ],
        correct: 0,
      },
    ],
  },

  {
    title: "المكونات Components",
    description: "تعلم مفهوم Components وكيف تستخدمها React لتقسيم الواجهة إلى أجزاء مستقلة وقابلة لإعادة الاستخدام.",
    content: `
      <p>
        Component هو جزء مستقل من واجهة المستخدم يمكن أن يحتوي على
        HTML-like JSX، وبيانات، وسلوك.
      </p>
      <p>
        يمكن أن يكون المكون بسيطًا جدًا مثل Button، أو كبيرًا مثل
        Dashboard يحتوي على عدة مكونات أخرى.
      </p>
      <p>
        هذه الطريقة تجعل بناء التطبيقات أكثر تنظيمًا بدلًا من وضع
        كل شيء في ملف واحد.
      </p>
    `,
    keyIdea: "Component هو وحدة بناء أساسية في React تمثل جزءًا من واجهة المستخدم.",
    explanation: "يمكنك تركيب Components متعددة معًا لبناء صفحة كاملة.",
    practice: "أنشئ Component باسم Welcome يعرض عنوان ترحيبي.",
    code: `function Welcome() {
  return <h1>مرحبًا بك في FAYAD</h1>;
}`,
    questions: [
      {
        question: "ما هو React Component؟",
        answers: ["جزء قابل لإعادة الاستخدام من الواجهة", "جدول قاعدة بيانات", "خاصية CSS", "ملف SQL"],
        correct: 0,
      },
      {
        question: "هل يمكن أن يحتوي Component على Components أخرى؟",
        answers: ["نعم", "لا", "فقط في CSS", "فقط في HTML"],
        correct: 0,
      },
      {
        question: "ما الهدف من تقسيم الواجهة إلى Components؟",
        answers: ["تنظيم وإعادة استخدام الكود", "إلغاء JavaScript", "إلغاء HTML", "منع التفاعل"],
        correct: 0,
      },
    ],
  },

  {
    title: "JSX",
    description: "تعلم JSX وكيف تسمح لك بكتابة صيغة تشبه HTML داخل JavaScript عند بناء Components.",
    content: `
      <p>
        JSX هي صيغة تستخدمها React لكتابة واجهة المستخدم بطريقة
        قريبة من HTML داخل JavaScript.
      </p>
      <p>
        JSX ليست HTML عادية، بل يتم تحويلها أثناء عملية البناء إلى
        JavaScript تفهمه البيئة التي تشغل التطبيق.
      </p>
      <p>
        يمكنك أيضًا إدخال expressions من JavaScript داخل JSX باستخدام
        الأقواس المعقوفة.
      </p>
    `,
    keyIdea: "JSX تجعل وصف واجهة React داخل JavaScript أكثر وضوحًا وسهولة.",
    explanation: "يمكنك كتابة عناصر مثل h1 وp وbutton داخل Component، واستخدام JavaScript expressions داخل {}.",
    practice: "غيّر النص داخل h1 وأضف فقرة p جديدة.",
    code: `function App() {
  return (
    <div>
      <h1>مرحبًا بك</h1>
      <p>تعلم React مع FAYAD</p>
    </div>
  );
}`,
    questions: [
      {
        question: "ماذا تسمح JSX للمطور أن يكتب؟",
        answers: [
          "صيغة تشبه HTML داخل JavaScript",
          "SQL داخل CSS",
          "CSS داخل قاعدة البيانات",
          "HTML فقط بدون JavaScript",
        ],
        correct: 0,
      },
      {
        question: "أين نستخدم JavaScript expressions داخل JSX؟",
        answers: ["داخل { }", "داخل [ ] فقط", "داخل SQL", "داخل CSS"],
        correct: 0,
      },
      {
        question: "هل JSX هي HTML عادية تمامًا؟",
        answers: ["لا", "نعم دائمًا", "هي CSS", "هي قاعدة بيانات"],
        correct: 0,
      },
    ],
  },

  {
    title: "Props",
    description: "تعلم كيف تسمح Props بتمرير البيانات من Component إلى Component آخر.",
    content: `
      <p>
        Props هي البيانات التي يمررها Component إلى Component آخر.
      </p>
      <p>
        غالبًا يتم استخدام Props لجعل المكون قابلًا لإعادة الاستخدام،
        لأن نفس المكون يستطيع استقبال بيانات مختلفة كل مرة.
      </p>
      <p>
        Props تكون للقراءة داخل المكون، ولا ينبغي تعديلها مباشرة.
      </p>
    `,
    keyIdea: "Props هي وسيلة أساسية لتمرير البيانات إلى Components.",
    explanation: "يمكنك إرسال name أو title أو image أو أي قيمة أخرى إلى Component.",
    practice: "غيّر قيمة name وجرب تمرير اسم مختلف إلى Welcome.",
    code: `function Welcome({ name }) {
  return <h1>مرحبًا {name}</h1>;
}

function App() {
  return <Welcome name="FAYAD" />;
}`,
    questions: [
      {
        question: "ما الاستخدام الأساسي لـ Props؟",
        answers: ["تمرير البيانات إلى Components", "إنشاء ملفات CSS", "إنشاء قواعد بيانات", "تشغيل الخادم"],
        correct: 0,
      },
      {
        question: "من أين تأتي Props غالبًا؟",
        answers: ["من Component الأب", "من CSS", "من HTML فقط", "من قاعدة البيانات مباشرة دائمًا"],
        correct: 0,
      },
      {
        question: "هل يجب تعديل Props مباشرة داخل Component؟",
        answers: ["لا", "نعم دائمًا", "نعم باستخدام CSS", "فقط داخل HTML"],
        correct: 0,
      },
    ],
  },

  {
    title: "State",
    description: "افهم مفهوم State وكيف تستخدمه React لتخزين البيانات التي يمكن أن تتغير أثناء تشغيل التطبيق.",
    content: `
      <p>
        State هي بيانات داخل Component يمكن أن تتغير مع مرور الوقت.
      </p>
      <p>
        عندما تتغير State، يمكن أن تعيد React حساب الواجهة وعرض
        البيانات الجديدة.
      </p>
      <p>
        من أشهر الأدوات المستخدمة لإدارة State داخل Component هي
        Hook تسمى useState.
      </p>
    `,
    keyIdea: "State تمثل البيانات المتغيرة التي تؤثر في واجهة المستخدم.",
    explanation: "مثل عداد clicks أو حالة تسجيل الدخول أو قيمة input.",
    practice: "جرّب تغيير القيمة الأولية للعداد.",
    code: `const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    {count}
  </button>
);`,
    questions: [
      {
        question: "ماذا تمثل State؟",
        answers: ["بيانات يمكن أن تتغير بمرور الوقت", "CSS Selector", "ملف HTML", "جدول قاعدة بيانات فقط"],
        correct: 0,
      },
      {
        question: "ماذا يحدث عادة عند تحديث State؟",
        answers: ["تُعاد معالجة الواجهة لعرض البيانات الجديدة", "يتم حذف Component", "يتم حذف CSS", "يتوقف التطبيق"],
        correct: 0,
      },
      {
        question: "أي Hook تستخدم لإدارة State البسيطة؟",
        answers: ["useState", "useHTML", "useCSS", "useDatabase"],
        correct: 0,
      },
    ],
  },

  {
    title: "الأحداث Events",
    description: "تعلم كيف تتعامل React مع تفاعل المستخدم مثل الضغط والكتابة وإرسال النماذج.",
    content: `
      <p>
        Events تسمح للتطبيق بالاستجابة لتصرفات المستخدم.
      </p>
      <p>
        في React تستخدم خصائص مثل onClick وonChange وonSubmit
        للتعامل مع الأحداث.
      </p>
      <p>
        عادة نمرر function إلى event handler ليتم تنفيذها عند وقوع
        الحدث.
      </p>
    `,
    keyIdea: "Events تربط تصرف المستخدم بالسلوك الذي تريد تنفيذه داخل التطبيق.",
    explanation: "عند الضغط على زر يمكن تنفيذ function، وعند الكتابة في input يمكن تحديث State.",
    practice: "غيّر النص الذي يظهر عند الضغط على الزر.",
    code: `function App() {
  function handleClick() {
    console.log("تم الضغط على الزر");
  }

  return <button onClick={handleClick}>اضغط هنا</button>;
}`,
    questions: [
      {
        question: "ما الحدث المستخدم غالبًا عند الضغط على زر؟",
        answers: ["onClick", "onButton", "buttonEvent", "clickOnly"],
        correct: 0,
      },
      {
        question: "ماذا نمرر عادة إلى onClick؟",
        answers: ["Function", "CSS file", "Database", "HTML document"],
        correct: 0,
      },
      {
        question: "ما الهدف من Events؟",
        answers: ["التعامل مع تفاعل المستخدم", "إنشاء قواعد البيانات", "كتابة CSS", "إزالة Components"],
        correct: 0,
      },
    ],
  },

  {
    title: "العرض الشرطي",
    description: "تعلم كيف تعرض React عناصر مختلفة بناءً على قيمة شرط معين.",
    content: `
      <p>
        Conditional Rendering يعني عرض جزء مختلف من الواجهة حسب
        حالة أو شرط معين.
      </p>
      <p>
        يمكن استخدام if أو ternary operator أو && لتنفيذ العرض
        الشرطي.
      </p>
      <p>
        هذه الفكرة مهمة جدًا في حالات مثل تسجيل الدخول وحالات
        التحميل والصلاحيات.
      </p>
    `,
    keyIdea: "يمكن لـReact تغيير ما يظهر للمستخدم بناءً على البيانات الحالية.",
    explanation: "مثل عرض Dashboard للمستخدم المسجل وإظهار Login للمستخدم غير المسجل.",
    practice: "غيّر قيمة isLoggedIn وشاهد النتيجة.",
    code: `function App({ isLoggedIn }) {
  return (
    <h1>
      {isLoggedIn ? "مرحبًا بك مجددًا!" : "يرجى تسجيل الدخول"}
    </h1>
  );
}`,
    questions: [
      {
        question: "ما المقصود بـ Conditional Rendering؟",
        answers: ["عرض UI بناءً على شرط", "إنشاء CSS Animation", "إنشاء Database", "كتابة HTML فقط"],
        correct: 0,
      },
      {
        question: "أي Operator يستخدم كثيرًا في العرض الشرطي؟",
        answers: ["Ternary ?", "SQL JOIN", "CSS #", "HTML !DOCTYPE"],
        correct: 0,
      },
      {
        question: "أين يمكن استخدام Conditional Rendering؟",
        answers: ["في حالات تسجيل الدخول والتحميل", "في CSS فقط", "في قواعد البيانات فقط", "في ملفات الصور"],
        correct: 0,
      },
    ],
  },

  {
    title: "Lists & Keys",
    description: "تعلم كيفية عرض مجموعة من البيانات باستخدام map ولماذا تحتاج React إلى Keys.",
    content: `
      <p>
        غالبًا تكون البيانات في التطبيقات على شكل Array، مثل قائمة
        المستخدمين أو المنتجات.
      </p>
      <p>
        يمكن استخدام map لإنشاء عنصر UI لكل عنصر داخل Array.
      </p>
      <p>
        تحتاج العناصر الناتجة عن القوائم إلى key مستقرة تساعد React
        على معرفة هوية كل عنصر.
      </p>
    `,
    keyIdea: "map تعرض عناصر القائمة، وkey تساعد React على تحديد هوية كل عنصر.",
    explanation: "يفضل استخدام ID فريد كمفتاح بدلًا من استخدام index عندما تكون القائمة قابلة للتغيير.",
    practice: "أضف مهارة جديدة إلى Array.",
    code: `const skills = ["HTML", "CSS", "JavaScript"];

function App() {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}`,
    questions: [
      {
        question: "لماذا نستخدم map في React؟",
        answers: ["لعرض مجموعة من البيانات", "لإنشاء CSS", "لإنشاء Database", "لتشغيل الخادم"],
        correct: 0,
      },
      {
        question: "لماذا نستخدم key؟",
        answers: ["لمساعدة React على تحديد عناصر القائمة", "لتغيير اللون", "لإنشاء variable", "لإضافة CSS"],
        correct: 0,
      },
      {
        question: "ما الأفضل عادة كقيمة لـ key؟",
        answers: ["معرّف فريد ومستقر", "قيمة عشوائية تتغير دائمًا", "CSS class", "اسم الملف"],
        correct: 0,
      },
    ],
  },

  {
    title: "Forms",
    description: "تعلم كيفية التعامل مع حقول الإدخال والنماذج داخل تطبيقات React.",
    content: `
      <p>
        Forms تستخدم لجمع البيانات من المستخدم مثل الاسم والبريد
        الإلكتروني وكلمة المرور.
      </p>
      <p>
        يمكن التحكم في قيم الحقول باستخدام State، وهذا يسمى
        Controlled Components.
      </p>
      <p>
        يمكن التعامل مع إرسال النموذج باستخدام onSubmit ومنع السلوك
        الافتراضي للمتصفح عند الحاجة.
      </p>
    `,
    keyIdea: "React تسمح لك بربط قيم حقول النموذج مع State والتحكم فيها.",
    explanation: "هذا يجعل التحقق من البيانات وإرسالها إلى API أسهل.",
    practice: "أضف input آخر إلى النموذج.",
    code: `function App() {
  return (
    <form>
      <input placeholder="اكتب اسمك" />
      <button type="submit">إرسال</button>
    </form>
  );
}`,
    questions: [
      {
        question: "ماذا تستخدم Forms لجمعه؟",
        answers: ["بيانات المستخدم", "ألوان CSS فقط", "صور فقط", "ملفات JavaScript فقط"],
        correct: 0,
      },
      {
        question: "ما الحدث المستخدم غالبًا عند إرسال Form؟",
        answers: ["onSubmit", "onFormOnly", "onSendCSS", "submitHTML"],
        correct: 0,
      },
      {
        question: "ما معنى Controlled Component؟",
        answers: ["قيمة الحقل يتم التحكم فيها من خلال React State", "عنصر CSS", "ملف HTML", "قاعدة بيانات"],
        correct: 0,
      },
    ],
  },

  {
    title: "تركيب المكونات Component Composition",
    description: "تعلم كيف تجمع عدة Components معًا لبناء واجهات أكبر وأكثر تنظيمًا.",
    content: `
      <p>
        Component Composition يعني بناء Component كبير من مجموعة
        Components أصغر.
      </p>
      <p>
        هذه الطريقة تجعل كل Component مسؤولًا عن جزء محدد، ثم يتم
        تركيب الأجزاء معًا لتكوين واجهة كاملة.
      </p>
    `,
    keyIdea: "التطبيق الكبير يمكن بناؤه من مجموعة Components صغيرة ومتخصصة.",
    explanation: "مثل تركيب صفحة من Header وSidebar وContent وFooter.",
    practice: "أضف Component جديدًا إلى App.",
    code: `function Header() {
  return <header>FAYAD</header>;
}

function App() {
  return (
    <>
      <Header />
      <main>تعلم React</main>
    </>
  );
}`,
    questions: [
      {
        question: "ماذا يعني Component Composition؟",
        answers: ["جمع Components لبناء واجهة", "حذف Components", "كتابة CSS فقط", "إنشاء Database"],
        correct: 0,
      },
      {
        question: "ما فائدة Composition؟",
        answers: ["تنظيم الواجهة إلى أجزاء", "إلغاء JavaScript", "إلغاء Props", "منع إعادة الاستخدام"],
        correct: 0,
      },
      {
        question: "أي مثال يمثل Composition؟",
        answers: ["App يحتوي Header وFooter", "ملف CSS فقط", "جدول Database", "صورة فقط"],
        correct: 0,
      },
    ],
  },

  {
    title: "مقدمة إلى Hooks",
    description: "افهم مفهوم React Hooks ولماذا أصبحت أساسية في كتابة المكونات الحديثة.",
    content: `
      <p>
        Hooks هي Functions توفر للمكونات إمكانية استخدام خصائص React
        مثل State وEffects.
      </p>
      <p>
        من أشهر Hooks: useState وuseEffect وuseRef وuseContext.
      </p>
      <p>
        Hooks تسمح بكتابة منطق قابل لإعادة الاستخدام دون الحاجة إلى
        Class Components في الأسلوب الحديث.
      </p>
    `,
    keyIdea: "Hooks توفر وظائف React الأساسية داخل Function Components.",
    explanation: "كل Hook لها وظيفة محددة، ويجب الالتزام بقواعد استخدامها.",
    practice: "جرّب تغيير القيمة الأولية في useState.",
    code: `import { useState } from "react";

function App() {
  const [name, setName] = useState("FAYAD");

  return <h1>{name}</h1>;
}`,
    questions: [
      {
        question: "ما هي React Hooks؟",
        answers: ["Functions تسمح باستخدام خصائص React", "CSS classes", "HTML attributes", "Database tables"],
        correct: 0,
      },
      {
        question: "أي من التالي Hook حقيقية؟",
        answers: ["useState", "useHTML", "useCSS", "useDatabase"],
        correct: 0,
      },
      {
        question: "لماذا تستخدم Hooks؟",
        answers: ["لاستخدام وإعادة تنظيم منطق React", "لكتابة CSS فقط", "لإنشاء قواعد بيانات", "لإلغاء Components"],
        correct: 0,
      },
    ],
  },

  {
    title: "useState",
    description: "تعلم كيف تستخدم useState لإضافة State إلى Function Components وتحديث الواجهة.",
    content: `
      <p>
        useState هي Hook تسمح للمكون بامتلاك قيمة State.
      </p>
      <p>
        ترجع useState قيمتين: القيمة الحالية، وFunction لتحديثها.
      </p>
      <p>
        عند استدعاء Function التحديث، تقوم React بإعادة معالجة
        Component لعرض القيمة الجديدة.
      </p>
    `,
    keyIdea: "useState ترجع State value وState setter.",
    explanation: "مثال: const [count, setCount] = useState(0).",
    practice: "غيّر الرقم الأولي للعداد أو قيمة الزيادة.",
    code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
    questions: [
      {
        question: "ماذا توفر useState؟",
        answers: ["قيمة State وFunction لتحديثها", "CSS فقط", "HTML فقط", "Database فقط"],
        correct: 0,
      },
      {
        question: "ماذا تمثل setCount؟",
        answers: ["Function لتحديث State", "CSS Selector", "HTML Tag", "Database"],
        correct: 0,
      },
      {
        question: "ما القيمة الأولية في useState(0)؟",
        answers: ["0", "1", "null", "undefined دائمًا"],
        correct: 0,
      },
    ],
  },

  {
    title: "useEffect",
    description: "تعلم كيف تستخدم useEffect للتعامل مع Side Effects مثل جلب البيانات والاشتراكات.",
    content: `
      <p>
        useEffect تستخدم لتنفيذ Side Effects المرتبطة بعملية عرض
        Component أو بتغير بيانات معينة.
      </p>
      <p>
        من الاستخدامات الشائعة جلب البيانات من API أو التعامل مع
        subscriptions أو تحديث عنوان الصفحة.
      </p>
      <p>
        Dependency Array تحدد متى يتم تشغيل Effect مرة أخرى.
      </p>
    `,
    keyIdea: "useEffect مناسبة للعمليات التي تحدث خارج حساب الواجهة المباشر.",
    explanation: "يمكن تشغيل Effect مرة بعد Mount باستخدام dependency array فارغة، أو عند تغير قيم محددة.",
    practice: "غيّر النص الموجود داخل console.log.",
    code: `import { useEffect } from "react";

useEffect(() => {
  console.log("تم تشغيل Effect");
}, []);`,
    questions: [
      {
        question: "ما الاستخدام الشائع لـuseEffect؟",
        answers: ["التعامل مع Side Effects", "إنشاء CSS selectors", "تعريف HTML tags", "إنشاء Database"],
        correct: 0,
      },
      {
        question: "ماذا تعني [] في dependency array؟",
        answers: ["لا توجد dependencies", "تشغيل كل ثانية", "تشغيل عند كل CSS change", "إلغاء Effect"],
        correct: 0,
      },
      {
        question: "أي مثال مناسب لـuseEffect؟",
        answers: ["جلب بيانات من API", "كتابة لون الزر", "إنشاء HTML file", "تعريف CSS class"],
        correct: 0,
      },
    ],
  },

  {
    title: "useRef",
    description: "تعلم كيف تستخدم useRef للاحتفاظ بقيمة أو الوصول إلى عنصر DOM دون التسبب في Re-render.",
    content: `
      <p>
        useRef ترجع Object يحتوي على خاصية current يمكن أن تحتفظ
        بقيمة بين عمليات Render.
      </p>
      <p>
        من الاستخدامات الشائعة الوصول إلى DOM element مثل input
        للتركيز عليه.
      </p>
      <p>
        تغيير ref.current لا يسبب Re-render للمكون.
      </p>
    `,
    keyIdea: "useRef مفيدة للقيم التي تحتاج إلى الاحتفاظ بها دون التسبب في إعادة Render.",
    explanation: "يمكن استخدامها أيضًا لحفظ reference إلى DOM element.",
    practice: "جرّب تغيير اسم inputRef.",
    code: `import { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  return <input ref={inputRef} />;
}`,
    questions: [
      {
        question: "في ماذا يمكن استخدام useRef؟",
        answers: ["الوصول إلى DOM elements", "إنشاء CSS فقط", "إنشاء Database tables", "استبدال JavaScript"],
        correct: 0,
      },
      {
        question: "أين توجد القيمة المخزنة في ref؟",
        answers: ["current", "valueOnly", "state", "data"],
        correct: 0,
      },
      {
        question: "هل تغيير ref.current يسبب Re-render؟",
        answers: ["لا", "نعم دائمًا", "فقط في CSS", "فقط في HTML"],
        correct: 0,
      },
    ],
  },

  {
    title: "useContext",
    description: "تعلم كيف تسمح useContext بمشاركة البيانات بين Components دون تمرير Props عبر كل مستوى.",
    content: `
      <p>
        عندما تحتاج عدة Components إلى نفس البيانات، قد يصبح تمرير
        Props عبر مستويات كثيرة أمرًا مزعجًا.
      </p>
      <p>
        Context يوفر طريقة لمشاركة بيانات معينة عبر شجرة Components.
      </p>
      <p>
        useContext تستخدم لقراءة القيمة الموجودة في Context داخل
        Component.
      </p>
    `,
    keyIdea: "Context مناسب للبيانات المشتركة التي تحتاجها Components متعددة.",
    explanation: "مثل Theme أو معلومات المستخدم أو إعدادات عامة للتطبيق.",
    practice: "غيّر قيمة ThemeContext من light إلى dark.",
    code: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}`,
    questions: [
      {
        question: "ما المشكلة التي يساعد useContext في حلها؟",
        answers: ["مشاركة البيانات بين Components", "كتابة CSS", "إنشاء HTML", "إنشاء Database"],
        correct: 0,
      },
      {
        question: "ما الذي يوفره Context؟",
        answers: ["قيمة يمكن الوصول إليها من Components داخل Provider", "CSS Animation", "HTML file", "SQL table"],
        correct: 0,
      },
      {
        question: "أي بيانات مناسبة لـContext؟",
        answers: ["Theme أو بيانات مستخدم عامة", "لون زر واحد فقط دائمًا", "ملف CSS", "صورة واحدة"],
        correct: 0,
      },
    ],
  },

  {
    title: "Custom Hooks",
    description: "تعلم كيفية إنشاء Custom Hooks لإعادة استخدام منطق React بين عدة Components.",
    content: `
      <p>
        Custom Hook هي Function تبدأ عادة بكلمة use وتستخدم Hooks
        أخرى بداخلها.
      </p>
      <p>
        الهدف الأساسي منها هو استخراج منطق مشترك وإعادة استخدامه
        في أكثر من Component.
      </p>
      <p>
        Custom Hooks لا تشارك State نفسها بين Components، لكنها تشارك
        منطق التعامل مع State أو Effects.
      </p>
    `,
    keyIdea: "Custom Hooks تساعدك على إعادة استخدام Logic بدلًا من تكراره.",
    explanation: "يمكنك إنشاء useFetch أو useToggle أو useLocalStorage مثلًا.",
    practice: "أنشئ Hook باسم useGreeting.",
    code: `function useGreeting(name) {
  return \`مرحبًا \${name}\`;
}`,
    questions: [
      {
        question: "لماذا ننشئ Custom Hook؟",
        answers: ["لإعادة استخدام Logic", "لاستبدال CSS", "لإنشاء HTML", "لإنشاء Database"],
        correct: 0,
      },
      {
        question: "بماذا يبدأ اسم Custom Hook عادة؟",
        answers: ["use", "hook", "react", "custom"],
        correct: 0,
      },
      {
        question: "هل Custom Hook يمكنها استخدام Hooks أخرى؟",
        answers: ["نعم", "لا", "فقط CSS", "فقط HTML"],
        correct: 0,
      },
    ],
  },

  {
    title: "React Router",
    description: "تعلم كيف تستخدم React Router لإنشاء التنقل بين الصفحات والمشاهد داخل تطبيق React.",
    content: `
      <p>
        React Router مكتبة تستخدم لإدارة Navigation داخل تطبيقات
        React.
      </p>
      <p>
        يمكنك تعريف Routes مختلفة مثل / و/about و/profile وربط كل
        Route بـComponent معين.
      </p>
      <p>
        هذا يسمح ببناء تطبيقات متعددة الصفحات من ناحية تجربة
        المستخدم دون الحاجة إلى إعادة تحميل الصفحة في كل انتقال.
      </p>
    `,
    keyIdea: "React Router يدير Navigation وربط URLs بالمكونات.",
    explanation: "يمكن تعريف Route لكل صفحة داخل التطبيق.",
    practice: "أضف Route جديدًا لصفحة Contact.",
    code: `import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>`,
    questions: [
      {
        question: "في ماذا يستخدم React Router؟",
        answers: ["Client-side navigation", "إدارة قواعد البيانات", "كتابة CSS", "إنشاء الصور"],
        correct: 0,
      },
      {
        question: "ماذا يحدد Route؟",
        answers: ["العلاقة بين URL وComponent", "لون الصفحة", "نوع قاعدة البيانات", "ملف CSS"],
        correct: 0,
      },
      {
        question: "أي عنصر يستخدم لتعريف مجموعة Routes؟",
        answers: ["Routes", "RouteGroup", "RouterList", "NavigationCSS"],
        correct: 0,
      },
    ],
  },

  {
    title: "طلبات API",
    description: "تعلم كيف تتواصل تطبيقات React مع APIs للحصول على بيانات خارجية.",
    content: `
      <p>
        التطبيقات الحقيقية غالبًا تحتاج إلى بيانات من Server أو
        خدمة خارجية.
      </p>
      <p>
        يمكن استخدام fetch أو مكتبات أخرى لإرسال HTTP Requests
        واستقبال البيانات.
      </p>
      <p>
        بعد وصول البيانات يمكن تخزينها في State وعرضها داخل
        Components.
      </p>
    `,
    keyIdea: "API هي حلقة الاتصال بين واجهة React ومصدر البيانات الخارجي.",
    explanation: "عادة يتم جلب البيانات ثم تحويل Response إلى JSON ثم تخزينها في State.",
    practice: "غيّر اسم الدالة أو مسار API في المثال.",
    code: `async function getUsers() {
  const response = await fetch(
    "https://example.com/users"
  );

  const data = await response.json();

  return data;
}`,
    questions: [
      {
        question: "لماذا تستخدم React APIs؟",
        answers: ["للتواصل مع مصادر بيانات خارجية", "لإنشاء CSS", "لإلغاء JavaScript", "لإنشاء HTML فقط"],
        correct: 0,
      },
      {
        question: "ما الدالة الشائعة لإرسال HTTP Request في JavaScript؟",
        answers: ["fetch", "style", "renderCSS", "queryHTML"],
        correct: 0,
      },
      {
        question: "ما وظيفة response.json()؟",
        answers: ["تحويل Response إلى بيانات JSON", "إضافة CSS", "إنشاء Component", "حذف البيانات"],
        correct: 0,
      },
    ],
  },

  {
    title: "حالات التحميل والأخطاء",
    description: "تعلم كيف تعرض واجهة مناسبة أثناء تحميل البيانات أو عند حدوث خطأ.",
    content: `
      <p>
        عند جلب البيانات من API قد يحتاج التطبيق بعض الوقت قبل
        وصول النتيجة.
      </p>
      <p>
        لذلك من الأفضل إظهار Loading state حتى يعرف المستخدم أن
        العملية ما زالت مستمرة.
      </p>
      <p>
        وفي حالة فشل الطلب يجب إظهار Error state مناسبة بدل ترك
        المستخدم دون أي معلومات.
      </p>
    `,
    keyIdea: "Loading وError states جزء أساسي من تجربة المستخدم الجيدة.",
    explanation: "التطبيق الاحترافي لا يعرض البيانات فقط، بل يتعامل أيضًا مع حالات الانتظار والفشل.",
    practice: "غيّر رسائل Loading وError.",
    code: `if (loading) {
  return <p>جارٍ التحميل...</p>;
}

if (error) {
  return <p>حدث خطأ.</p>;
}`,
    questions: [
      {
        question: "لماذا نستخدم Loading state؟",
        answers: ["لإخبار المستخدم أن البيانات ما زالت تُحمّل", "لتغيير CSS", "لحذف Component", "لإنشاء Database"],
        correct: 0,
      },
      {
        question: "متى نستخدم Error state؟",
        answers: ["عند حدوث مشكلة في العملية", "عند نجاح الطلب فقط", "عند تغيير اللون", "عند تحميل CSS"],
        correct: 0,
      },
      {
        question: "ما الفائدة الأساسية من هذه الحالات؟",
        answers: ["تحسين تجربة المستخدم", "حذف JavaScript", "إلغاء APIs", "إلغاء State"],
        correct: 0,
      },
    ],
  },

  {
    title: "تحسين الأداء Performance",
    description: "تعرف على المبادئ الأساسية لتحسين أداء تطبيقات React وتقليل العمل غير الضروري.",
    content: `
      <p>
        Performance optimization يعني تقليل العمليات غير الضرورية
        التي يقوم بها التطبيق.
      </p>
      <p>
        من المهم أولًا فهم سبب إعادة Render ثم تحديد الجزء الذي
        يحتاج إلى تحسين.
      </p>
      <p>
        أدوات مثل React.memo وuseMemo وuseCallback قد تساعد في حالات
        معينة، لكنها ليست مطلوبة لكل Component.
      </p>
    `,
    keyIdea: "تحسين الأداء يبدأ بفهم المشكلة وليس بإضافة أدوات Optimization عشوائيًا.",
    explanation: "راقب عمليات Render والعمليات الحسابية الثقيلة قبل اختيار طريقة التحسين.",
    practice: "حاول تحديد Component الذي قد يحتاج إلى تحسين في المثال.",
    code: `function ProductList({ products }) {
  return products.map((product) => (
    <Product
      key={product.id}
      product={product}
    />
  ));
}`,
    questions: [
      {
        question: "ما الهدف من Performance Optimization؟",
        answers: ["تقليل العمل والعمليات غير الضرورية", "إضافة CSS أكثر", "حذف Components", "إلغاء JavaScript"],
        correct: 0,
      },
      {
        question: "ماذا يجب أن تفعل قبل Optimization؟",
        answers: ["تفهم سبب المشكلة أولًا", "تستخدم كل Hooks", "تحذف State", "تحذف Components"],
        correct: 0,
      },
      {
        question: "هل يجب استخدام memoization في كل Component؟",
        answers: ["لا", "نعم دائمًا", "فقط في HTML", "فقط في CSS"],
        correct: 0,
      },
    ],
  },

  {
    title: "React.memo",
    description: "تعلم كيف يمكن لـReact.memo تقليل بعض عمليات إعادة Render غير الضرورية.",
    content: `
      <p>
        React.memo هي API تساعد على إعادة استخدام نتيجة Render
        للمكون عندما لا تتغير Props الخاصة به.
      </p>
      <p>
        إذا أعيد Render للمكون الأب وكانت Props للمكون الابن مساوية
        حسب المقارنة المستخدمة، يمكن لـReact تخطي Render للابن.
      </p>
      <p>
        React.memo ليست حلًا سحريًا، ويجب استخدامها عندما يكون لها
        تأثير مفيد على الأداء.
      </p>
    `,
    keyIdea: "React.memo يمكن أن تمنع بعض عمليات Render غير الضرورية عندما لا تتغير Props.",
    explanation: "تكون مفيدة خصوصًا عندما يكون Component مكلفًا في Render ويتلقى Props مستقرة.",
    practice: "غيّر اسم UserCard وجرب استخدامه مع Props مختلفة.",
    code: `const UserCard = React.memo(function UserCard({ name }) {
  return <h2>{name}</h2>;
});`,
    questions: [
      {
        question: "ما الذي يمكن أن تساعد React.memo في تقليله؟",
        answers: ["Unnecessary re-renders", "HTML files", "CSS files", "Database tables"],
        correct: 0,
      },
      {
        question: "على ماذا تعتمد React.memo بشكل أساسي؟",
        answers: ["مقارنة Props", "لون العنصر", "اسم ملف CSS", "حجم الصورة"],
        correct: 0,
      },
      {
        question: "هل React.memo مطلوبة لكل Component؟",
        answers: ["لا", "نعم", "فقط للصور", "فقط للنماذج"],
        correct: 0,
      },
    ],
  },

  {
    title: "useMemo وuseCallback",
    description: "تعلم الفرق بين useMemo وuseCallback ومتى يمكن استخدامهما في تحسين الأداء.",
    content: `
      <p>
        useMemo تستخدم لحفظ نتيجة عملية حسابية بين عمليات Render
        عندما لا تتغير dependencies.
      </p>
      <p>
        useCallback تستخدم لحفظ نفس Function reference بين عمليات
        Render عندما لا تتغير dependencies.
      </p>
      <p>
        يجب استخدامهما عند وجود سبب حقيقي متعلق بالأداء، لأن
        استخدامهما بلا حاجة قد يزيد التعقيد.
      </p>
    `,
    keyIdea: "useMemo تحفظ قيمة محسوبة، بينما useCallback تحفظ Function reference.",
    explanation: "الاثنتان أدوات Optimization وليستا بديلًا عن تصميم التطبيق الجيد.",
    practice: "غيّر dependencies في المثال وشاهد كيف تؤثر.",
    code: `const total = useMemo(() => {
  return calculateTotal(items);
}, [items]);`,
    questions: [
      {
        question: "ماذا يمكن أن تحفظ useMemo؟",
        answers: ["قيمة محسوبة", "ملف HTML", "ملف CSS", "قاعدة بيانات"],
        correct: 0,
      },
      {
        question: "ماذا تحفظ useCallback؟",
        answers: ["Function reference", "HTML element", "CSS color", "Database"],
        correct: 0,
      },
      {
        question: "هل يجب استخدام useMemo دائمًا؟",
        answers: ["لا", "نعم", "فقط في Forms", "فقط في Router"],
        correct: 0,
      },
    ],
  },

  {
    title: "إدارة الحالة State Management",
    description: "افهم الطرق المختلفة لإدارة State عندما يكبر حجم تطبيق React.",
    content: `
      <p>
        في التطبيقات الصغيرة قد تكفي useState وuseContext لإدارة
        معظم الحالات.
      </p>
      <p>
        عندما يكبر التطبيق قد تحتاج إلى تنظيم State بشكل أفضل أو
        استخدام مكتبة مخصصة لإدارة الحالة.
      </p>
      <p>
        اختيار الطريقة يعتمد على حجم التطبيق وطبيعة البيانات وكيف
        تشاركها Components.
      </p>
    `,
    keyIdea: "اختيار State Management المناسب يعتمد على طبيعة وحجم التطبيق.",
    explanation: "لا توجد أداة واحدة مناسبة لكل المشاريع.",
    practice: "غيّر القيمة الأولية لـuser.",
    code: `const [user, setUser] = useState(null);

function login(userData) {
  setUser(userData);
}`,
    questions: [
      {
        question: "ما المقصود بـState Management؟",
        answers: ["إدارة بيانات التطبيق وتغيراتها", "تنسيق CSS", "إنشاء HTML فقط", "ضغط الصور"],
        correct: 0,
      },
      {
        question: "هل كل تطبيق React يحتاج مكتبة State Management خارجية؟",
        answers: ["لا", "نعم دائمًا", "فقط في HTML", "فقط في CSS"],
        correct: 0,
      },
      {
        question: "ما الذي يؤثر في اختيار طريقة إدارة State؟",
        answers: ["حجم التطبيق وطبيعة البيانات", "لون الموقع", "اسم Component فقط", "نوع الصورة"],
        correct: 0,
      },
    ],
  },

  {
    title: "معمارية React",
    description: "تعلم المبادئ الأساسية لتنظيم مشروع React إلى طبقات ومكونات واضحة وقابلة للصيانة.",
    content: `
      <p>
        Architecture تصف الطريقة التي يتم بها تقسيم وتنظيم أجزاء
        التطبيق.
      </p>
      <p>
        يمكن فصل Components وPages وHooks وServices وغيرها في مجلدات
        واضحة حسب احتياجات المشروع.
      </p>
      <p>
        التنظيم الجيد يقلل التشابك ويساعد الفريق على فهم المشروع
        وتطويره بسهولة.
      </p>
    `,
    keyIdea: "المعمارية الجيدة تجعل المشروع أسهل في الفهم والتطوير والصيانة.",
    explanation: "لا توجد بنية مجلدات واحدة إجبارية لكل مشاريع React، بل تختار الهيكل المناسب للمشروع.",
    practice: "أضف مجلدًا مناسبًا إلى هيكل المشروع.",
    code: `src/
├── components/
├── pages/
├── hooks/
├── services/
└── App.jsx`,
    questions: [
      {
        question: "لماذا تعتبر Architecture مهمة؟",
        answers: ["تجعل المشروع أسهل في الصيانة", "تحذف JavaScript", "تستبدل React", "تمنع استخدام Components"],
        correct: 0,
      },
      {
        question: "أين يمكن وضع Components المشتركة؟",
        answers: ["components/", "database/", "css-only/", "sql/"],
        correct: 0,
      },
      {
        question: "هل توجد بنية مجلدات واحدة إلزامية لكل React projects؟",
        answers: ["لا", "نعم دائمًا", "نعم فقط في Vercel", "نعم فقط في Windows"],
        correct: 0,
      },
    ],
  },

  {
    title: "المكونات القابلة لإعادة الاستخدام",
    description: "تعلم كيف تصمم Components مرنة يمكن استخدامها في أكثر من مكان داخل التطبيق.",
    content: `
      <p>
        المكون القابل لإعادة الاستخدام يجب أن يكون مرنًا بما يكفي
        ليستقبل بيانات مختلفة.
      </p>
      <p>
        يمكن استخدام Props وchildren لتحديد المحتوى أو السلوك الذي
        يتغير من استخدام لآخر.
      </p>
      <p>
        الهدف هو تقليل التكرار مع الحفاظ على وضوح المكون.
      </p>
    `,
    keyIdea: "صمم Component عامًا عندما يكون هناك سلوك أو واجهة مشتركة فعلًا.",
    explanation: "Button مثال بسيط على Component يمكن استخدامه بأكثر من نص أو وظيفة.",
    practice: "جرّب تمرير نص مختلف باستخدام children.",
    code: `function Button({ children }) {
  return (
    <button className="button">
      {children}
    </button>
  );
}`,
    questions: [
      {
        question: "ما هو Reusable Component؟",
        answers: ["Component يمكن استخدامه في أماكن متعددة", "Component يعمل مرة واحدة فقط", "CSS file", "Database"],
        correct: 0,
      },
      {
        question: "ما الذي يمكن استخدامه لجعل Button مرنًا؟",
        answers: ["Props وchildren", "CSS فقط", "SQL", "Database"],
        correct: 0,
      },
      {
        question: "ما الهدف من Reusability؟",
        answers: ["تقليل التكرار", "زيادة التكرار", "حذف Components", "حذف JavaScript"],
        correct: 0,
      },
    ],
  },

  {
    title: "تنظيم المشروع Project Structure",
    description: "تعلم كيفية تنظيم ملفات ومجلدات مشروع React بطريقة تساعد على التوسع.",
    content: `
      <p>
        Project Structure توضح كيف يتم ترتيب ملفات المشروع.
      </p>
      <p>
        يمكن فصل assets وcomponents وpages وhooks وservices حسب
        احتياجات المشروع.
      </p>
      <p>
        الهدف ليس إنشاء مجلدات كثيرة، بل الوصول إلى تنظيم واضح
        يسهل العثور على الملفات.
      </p>
    `,
    keyIdea: "تنظيم الملفات يجب أن يخدم وضوح المشروع وليس أن يزيد التعقيد.",
    explanation: "اختر هيكلًا واضحًا يتناسب مع حجم التطبيق وطريقة عمل الفريق.",
    practice: "أضف مجلدًا خاصًا بالصور والأصول.",
    code: `src/
├── components/
├── pages/
├── assets/
├── hooks/
├── services/
└── main.jsx`,
    questions: [
      {
        question: "ماذا يصف Project Structure؟",
        answers: ["تنظيم ملفات ومجلدات المشروع", "ألوان الموقع فقط", "قاعدة البيانات فقط", "سرعة الإنترنت"],
        correct: 0,
      },
      {
        question: "أين يمكن وضع الصور والأصول؟",
        answers: ["assets/", "database/", "hooks-only/", "sql/"],
        correct: 0,
      },
      {
        question: "ما الهدف من تنظيم المشروع؟",
        answers: [
          "تسهيل العثور على الملفات وصيانة المشروع",
          "زيادة حجم المشروع",
          "إلغاء Components",
          "منع إعادة الاستخدام",
        ],
        correct: 0,
      },
    ],
  },

  {
    title: "أفضل الممارسات Best Practices",
    description: "تعلم مجموعة من الممارسات التي تساعدك على كتابة React code واضح وقابل للصيانة.",
    content: `
      <p>
        Clean Code مهم جدًا عندما يكبر المشروع ويعمل عليه أكثر من
        شخص.
      </p>
      <p>
        من الممارسات الجيدة استخدام أسماء واضحة، Components صغيرة
        نسبيًا، وتقليل التكرار.
      </p>
      <p>
        كما يجب فصل المسؤوليات وعدم وضع كل منطق التطبيق في Component
        واحد ضخم.
      </p>
    `,
    keyIdea: "الكود الجيد ليس فقط كودًا يعمل، بل كود يمكن فهمه وتطويره بسهولة.",
    explanation: "استخدم أسماء واضحة وحافظ على مسؤولية محددة لكل Component قدر الإمكان.",
    practice: "حاول تحسين اسم Component أو المتغير في المثال.",
    code: `function UserCard({ user }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  );
}`,
    questions: [
      {
        question: "لماذا Best Practices مهمة؟",
        answers: ["تحسن جودة الكود وقابليته للصيانة", "تلغي Components", "تجعل JavaScript غير ضرورية", "تستبدل React"],
        correct: 0,
      },
      {
        question: "أي اسم أفضل عادة؟",
        answers: ["UserCard", "x1", "abc123", "thing"],
        correct: 0,
      },
      {
        question: "ما المشكلة في Component ضخم جدًا؟",
        answers: ["يصعب فهمه وصيانته", "يصبح CSS فقط", "لا يمكن تشغيل React", "يتحول إلى Database"],
        correct: 0,
      },
    ],
  },

  {
    title: "React + APIs",
    description: "اربط بين React وState وEffects وAPIs لبناء تطبيقات تعتمد على البيانات الحقيقية.",
    content: `
      <p>
        معظم التطبيقات العملية تحتاج إلى جلب بيانات من Backend أو
        API خارجي.
      </p>
      <p>
        غالبًا يتم استخدام useEffect لبدء عملية الجلب، ثم يتم تخزين
        النتيجة داخل State.
      </p>
      <p>
        يجب أيضًا التعامل مع Loading وError وSuccess states حتى تكون
        تجربة المستخدم جيدة.
      </p>
    `,
    keyIdea: "التطبيقات المعتمدة على البيانات تحتاج إلى تنسيق جيد بين API وState وUI.",
    explanation: "يمكن فصل منطق API في services لتقليل مسؤوليات Components.",
    practice: "غيّر endpoint في المثال إلى endpoint آخر.",
    code: `useEffect(() => {
  fetch("/api/users")
    .then((response) => response.json())
    .then((data) => setUsers(data));
}, []);`,
    questions: [
      {
        question: "ماذا يمكن أن يوفر API لتطبيق React؟",
        answers: ["بيانات خارجية", "CSS فقط", "HTML فقط", "صور CSS"],
        correct: 0,
      },
      {
        question: "أين يمكن تخزين البيانات القادمة من API؟",
        answers: ["React State", "CSS", "HTML attribute", "Class name فقط"],
        correct: 0,
      },
      {
        question: "ما Hook الشائعة لتنفيذ Fetch عند تحميل Component؟",
        answers: ["useEffect", "useHTML", "useCSS", "useDatabase"],
        correct: 0,
      },
    ],
  },

  {
    title: "المشروع النهائي",
    description: "اجمع ما تعلمته في React لبناء تطبيق متكامل منظم وقابل للتوسع.",
    content: `
      <p>
        المشروع النهائي هو المرحلة التي تجمع فيها المفاهيم التي
        تعلمتها في React.
      </p>
      <p>
        يمكن أن يحتوي المشروع على Components وState وForms وRouting
        وAPIs وLoading وError states.
      </p>
      <p>
        الهدف ليس كتابة أكبر عدد من الملفات، بل بناء تطبيق حقيقي
        منظم يوضح أنك تستطيع استخدام React لحل مشكلة كاملة.
      </p>
    `,
    keyIdea: "المشروع النهائي هو فرصة لتطبيق المفاهيم بدلًا من دراستها بشكل منفصل.",
    explanation: "ابدأ بتحديد فكرة التطبيق، ثم قسمها إلى Components وFeatures صغيرة.",
    practice: "خطط للمكونات الأساسية في مشروعك قبل كتابة الكود.",
    code: `function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <Footer />
    </>
  );
}`,
    questions: [
      {
        question: "ما الهدف الأساسي من المشروع النهائي؟",
        answers: ["تطبيق ما تعلمته في تطبيق كامل", "تجنب استخدام React", "كتابة CSS فقط", "حذف Components"],
        correct: 0,
      },
      {
        question: "ما الذي يمكن أن يجمعه المشروع النهائي؟",
        answers: ["Components وState وAPIs وRouting وغيرها", "CSS فقط", "HTML فقط", "Database فقط"],
        correct: 0,
      },
      {
        question: "ما أفضل طريقة للبدء في مشروع كبير؟",
        answers: [
          "تقسيم الفكرة إلى Components وFeatures",
          "كتابة كل شيء في Component واحد",
          "حذف Architecture",
          "عدم التخطيط",
        ],
        correct: 0,
      },
    ],
  },
];

/* =========================================================
   2. ELEMENTS
   ========================================================= */

const lessonButtons = document.querySelectorAll(".lesson");

const lessonNumber = document.getElementById("lessonNumber");
const lessonTitle = document.getElementById("lessonTitle");
const lessonDescription = document.getElementById("lessonDescription");

const lessonContent = document.getElementById("lessonContent");

const keyIdeaTitle = document.getElementById("keyIdeaTitle");
const keyIdea = document.getElementById("keyIdea");

const exampleTitle = document.getElementById("exampleTitle");
const exampleCode = document.getElementById("exampleCode");

const exampleExplanation = document.getElementById("exampleExplanation");

const practiceDescription = document.getElementById("practiceDescription");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const copyButton = document.getElementById("copyButton");

const codeEditor = document.getElementById("codeEditor");

const runButton = document.getElementById("runCode");
const resetButton = document.getElementById("resetCode");

const output = document.getElementById("output");

const answerButtons = document.querySelectorAll(".answer-options button");

const answerFeedback = document.getElementById("answerFeedback");

const reactResult = document.getElementById("reactResult");

const quizQuestionNumber = document.getElementById("quizQuestionNumber");

const quizTotalQuestions = document.getElementById("quizTotalQuestions");

const quizNextButton = document.getElementById("quizNextButton");

/* =========================================================
   3. COURSE STATE
   ========================================================= */

let currentLesson = 0;

let currentQuestion = 0;

let quizLocked = false;

const QUIZ_QUESTION_COUNT = 3;

const STORAGE_CURRENT_LESSON = "fayad-react-current-lesson";

const STORAGE_COMPLETED = "fayad-react-completed-lessons";

const STORAGE_QUIZ_PROGRESS = "fayad-react-quiz-progress";

/* =========================================================
   4. COMPLETED LESSONS
   ========================================================= */

let completedLessons = [];

try {
  const savedCompleted = localStorage.getItem(STORAGE_COMPLETED);

  if (savedCompleted) {
    const parsed = JSON.parse(savedCompleted);

    if (Array.isArray(parsed)) {
      completedLessons = parsed;
    }
  }
} catch (error) {
  completedLessons = [];
}

/* =========================================================
   5. SAVE COMPLETED LESSONS
   ========================================================= */

function saveCompletedLessons() {
  localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedLessons));
}

/* =========================================================
   6. MARK LESSON COMPLETE
   ========================================================= */

function markLessonComplete(index) {
  if (!completedLessons.includes(index)) {
    completedLessons.push(index);
    completedLessons.sort((a, b) => a - b);
    saveCompletedLessons();
  }

  updateSidebar();
}

/* =========================================================
   7. SIDEBAR UPDATE
   ========================================================= */

function updateSidebar() {
  lessonButtons.forEach((button, index) => {
    button.classList.toggle("active", index === currentLesson);

    button.classList.toggle("completed", completedLessons.includes(index));

    const status = button.querySelector(".lesson-status");

    if (!status) return;

    status.classList.toggle("current", index === currentLesson);

    if (completedLessons.includes(index)) {
      status.textContent = "✓";
    } else {
      status.textContent = "";
    }
  });
}

/* =========================================================
   8. UPDATE COURSE PROGRESS
   ========================================================= */

function updateCourseProgress() {
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
   9. SAVE CURRENT LESSON
   ========================================================= */

function saveCurrentLesson() {
  localStorage.setItem(STORAGE_CURRENT_LESSON, String(currentLesson));
}

/* =========================================================
   10. SAVE QUIZ PROGRESS
   ========================================================= */

function saveQuizProgress() {
  const quizData = {
    lesson: currentLesson,
    question: currentQuestion,
  };

  localStorage.setItem(STORAGE_QUIZ_PROGRESS, JSON.stringify(quizData));
}

/* =========================================================
   11. GET QUIZ PROGRESS
   ========================================================= */

function getSavedQuizProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_QUIZ_PROGRESS);

    if (!saved) return null;

    const parsed = JSON.parse(saved);

    if (typeof parsed.lesson !== "number" || typeof parsed.question !== "number") {
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
}

/* =========================================================
   12. RESET QUIZ
   ========================================================= */

function resetQuickCheck() {
  currentQuestion = 0;
  quizLocked = false;

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
  }

  answerButtons.forEach((button) => {
    button.disabled = false;

    button.classList.remove("correct-answer", "wrong-answer", "correct", "wrong");
  });

  if (quizNextButton) {
    quizNextButton.disabled = true;
  }

  updateQuickCheck();
}

/* =========================================================
   13. UPDATE QUICK CHECK
   ========================================================= */
function updateQuickCheck() {
  const lesson = lessons[currentLesson];

  if (!lesson || !lesson.questions) return;

  const question = lesson.questions[currentQuestion];

  if (!question) return;

  if (quizQuestionNumber) {
    quizQuestionNumber.textContent = `السؤال ${currentQuestion + 1}`;
  }

  if (quizTotalQuestions) {
    quizTotalQuestions.textContent = String(QUIZ_QUESTION_COUNT);
  }

  const questionText = document.getElementById("questionText");

  if (questionText) {
    questionText.textContent = question.question;
  }

  // إنشاء ترتيب عشوائي للاختيارات
  const shuffledAnswers = question.answers
    .map((answer, originalIndex) => ({
      answer,
      originalIndex
    }))
    .sort(() => Math.random() - 0.5);

  // حفظ الترتيب العشوائي
  question._shuffledAnswers = shuffledAnswers;

  answerButtons.forEach((button, index) => {
    const item = shuffledAnswers[index];

    button.textContent = item ? item.answer : "";

    button.disabled = quizLocked;

    button.classList.remove(
      "correct-answer",
      "wrong-answer",
      "correct",
      "wrong"
    );
  });

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
  }

  if (quizNextButton) {
    quizNextButton.disabled = true;

    if (currentQuestion === QUIZ_QUESTION_COUNT - 1) {
      quizNextButton.textContent = "الدرس التالي";
    } else {
      quizNextButton.textContent = "السؤال التالي";
    }
  }

  saveQuizProgress();
}


/* =========================================================
   HANDLE ANSWER
========================================================= */

function handleAnswer(index) {
  if (quizLocked) return;

  const lesson = lessons[currentLesson];

  if (!lesson || !lesson.questions) return;

  const question = lesson.questions[currentQuestion];

  if (!question) return;

  // معرفة الإجابة الأصلية التي يمثلها الزر العشوائي
  const selectedAnswer = question._shuffledAnswers[index];

  if (!selectedAnswer) return;

  const isCorrect =
    selectedAnswer.originalIndex === question.correct;

  answerButtons.forEach((button) => {
    button.classList.remove(
      "correct-answer",
      "wrong-answer",
      "correct",
      "wrong"
    );
  });

  if (isCorrect) {
    quizLocked = true;

    answerButtons.forEach((button) => {
      button.disabled = true;
    });

    answerButtons[index].classList.add(
      "correct-answer",
      "correct"
    );

    if (answerFeedback) {
      answerFeedback.textContent = "✓ إجابة صحيحة! أحسنت.";
      answerFeedback.className = "answer-feedback correct";
    }

    if (quizNextButton) {
      quizNextButton.disabled = false;
    }

  } else {
    answerButtons[index].classList.add(
      "wrong-answer",
      "wrong"
    );

    if (answerFeedback) {
      answerFeedback.textContent =
        "✗ إجابة غير صحيحة. حاول مرة أخرى.";

      answerFeedback.className =
        "answer-feedback wrong";
    }
  }
}
/* =========================================================
   15. NEXT QUIZ QUESTION / NEXT LESSON
   ========================================================= */

function goNextQuizStep() {
  if (!quizLocked) return;

  if (currentQuestion < QUIZ_QUESTION_COUNT - 1) {
    currentQuestion += 1;

    quizLocked = false;

    if (quizNextButton) {
      quizNextButton.disabled = true;
      quizNextButton.textContent = "السؤال التالي";
    }

    updateQuickCheck();

    return;
  }

  markLessonComplete(currentLesson);

  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    if (quizNextButton) {
      quizNextButton.textContent = "اكتمل المسار ✓";
      quizNextButton.disabled = true;
    }

    if (answerFeedback) {
      answerFeedback.textContent = "🎉 أحسنت! لقد أكملت جميع دروس React.";
      answerFeedback.className = "answer-feedback correct";
    }
  }
}

/* =========================================================
   16. LOAD LESSON
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

  if (!lesson) return;

  /* TITLE */

  if (lessonNumber) {
    lessonNumber.textContent = `الدرس ${String(currentLesson + 1).padStart(2, "0")}`;
  }

  if (lessonTitle) {
    lessonTitle.textContent = lesson.title;
  }

  if (lessonDescription) {
    lessonDescription.textContent = lesson.description;
  }

  /* LESSON CONTENT */

  if (lessonContent) {
    lessonContent.innerHTML = lesson.content || "";
  }

  /* KEY IDEA */

  if (keyIdeaTitle) {
    keyIdeaTitle.textContent = "الفكرة الأساسية";
  }

  if (keyIdea) {
    keyIdea.textContent = lesson.keyIdea || "";
  }

  /* EXAMPLE */

  if (exampleTitle) {
    exampleTitle.textContent = "مثال عملي";
  }

  if (exampleCode) {
    exampleCode.textContent = lesson.code;
  }

  if (exampleExplanation) {
    exampleExplanation.textContent = lesson.explanation || "";
  }

  /* PRACTICE */

  if (practiceDescription) {
    practiceDescription.textContent = lesson.practice || "";
  }

  /* EDITOR */

  if (codeEditor) {
    codeEditor.value = lesson.code;
  }

  /* SIDEBAR */

  updateSidebar();

  /* PROGRESS */

  updateCourseProgress();

  /* NAVIGATION */

  if (previousButton) {
    previousButton.disabled = currentLesson === 0;

    const previousStrong = previousButton.querySelector("strong");

    if (previousStrong) {
      if (currentLesson === 0) {
        previousStrong.textContent = "الدرس الأول";
      } else {
        previousStrong.textContent = lessons[currentLesson - 1].title;
      }
    }
  }

  if (nextButton) {
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

  /* RESET QUIZ */

  resetQuickCheck();

  /* RESET OUTPUT */

  if (output) {
    output.textContent = "ستظهر النتيجة هنا.";
  }

  /* PREVIEW */

  renderReactPreview(lesson.code);

  /* SAVE */

  saveCurrentLesson();
}

/* =========================================================
   17. SIDEBAR NAVIGATION
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
   18. PREVIOUS LESSON
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
   19. NEXT LESSON
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
   20. REACT PREVIEW
   ========================================================= */

function renderReactPreview(code) {
  if (!reactResult) return;

  if (!code) {
    reactResult.textContent = "React Preview";
    return;
  }

  /* h1 */

  const h1Match = code.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);

  if (h1Match) {
    reactResult.textContent = cleanJSXText(h1Match[1]);
    return;
  }

  /* h2 */

  const h2Match = code.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);

  if (h2Match) {
    reactResult.textContent = cleanJSXText(h2Match[1]);
    return;
  }

  /* p */

  const paragraphMatch = code.match(/<p[^>]*>([\s\S]*?)<\/p>/);

  if (paragraphMatch) {
    reactResult.textContent = cleanJSXText(paragraphMatch[1]);
    return;
  }

  /* button */

  const buttonMatch = code.match(/<button[^>]*>([\s\S]*?)<\/button>/);

  if (buttonMatch) {
    reactResult.textContent = cleanJSXText(buttonMatch[1]);
    return;
  }

  /* input */

  if (/<input\b/i.test(code)) {
    reactResult.innerHTML = `<input placeholder="React Input" />`;
    return;
  }

  /* fallback */

  reactResult.textContent = "تم تشغيل كود React في المعاينة.";
}

/* =========================================================
   21. CLEAN JSX TEXT
   ========================================================= */

function cleanJSXText(text) {
  if (!text) return "";

  return text
    .replace(/\{[^}]*\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   22. RUN CODE
   ========================================================= */

if (runButton) {
  runButton.addEventListener("click", () => {
    const code = codeEditor?.value.trim() || "";

    if (!code) {
      if (output) {
        output.textContent = "اكتب بعض الأكواد أولًا.";
      }

      return;
    }

    try {
      renderReactPreview(code);

      if (output) {
        output.textContent = "✓ تم تشغيل الكود في معاينة التعلم.";
      }
    } catch (error) {
      if (output) {
        output.textContent = "حدث خطأ أثناء تشغيل الكود.";
      }
    }
  });
}

/* =========================================================
   23. RESET CODE
   ========================================================= */

if (resetButton) {
  resetButton.addEventListener("click", () => {
    const lesson = lessons[currentLesson];

    if (!lesson) return;

    if (codeEditor) {
      codeEditor.value = lesson.code;
    }

    if (output) {
      output.textContent = "ستظهر النتيجة هنا.";
    }

    renderReactPreview(lesson.code);
  });
}

/* =========================================================
   24. COPY CODE
   ========================================================= */

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const code = exampleCode?.textContent || "";

    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);

      copyButton.textContent = "تم النسخ ✓";

      setTimeout(() => {
        copyButton.textContent = "نسخ";
      }, 1500);
    } catch (error) {
      copyButton.textContent = "فشل النسخ";

      setTimeout(() => {
        copyButton.textContent = "نسخ";
      }, 1500);
    }
  });
}

/* =========================================================
   25. ANSWER BUTTONS
   ========================================================= */

answerButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    handleAnswer(index);
  });
});

/* =========================================================
   26. NEXT QUESTION BUTTON
   ========================================================= */

if (quizNextButton) {
  quizNextButton.addEventListener("click", () => {
    goNextQuizStep();
  });
}

/* =========================================================
   27. KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener("keydown", (event) => {
  const tagName = event.target?.tagName;

  if (tagName === "TEXTAREA" || tagName === "INPUT") {
    return;
  }

  if (event.key === "ArrowRight" && currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);
  }

  if (event.key === "ArrowLeft" && currentLesson > 0) {
    loadLesson(currentLesson - 1);
  }
});

/* =========================================================
   28. RESTORE LAST LESSON
   ========================================================= */

const savedLesson = localStorage.getItem(STORAGE_CURRENT_LESSON);

let initialLesson = 0;

if (savedLesson !== null && !Number.isNaN(Number(savedLesson))) {
  initialLesson = Number(savedLesson);
}

/* =========================================================
   29. INITIALIZE
   ========================================================= */

loadLesson(initialLesson);

updateSidebar();

updateCourseProgress();

/* =========================================================
   30. FINAL SAFETY CHECK
   ========================================================= */

if (
  lessons.length > 0 &&
  lessons.every((lesson) => Array.isArray(lesson.questions) && lesson.questions.length === QUIZ_QUESTION_COUNT)
) {
  console.log("FAYAD React Learning Engine loaded successfully.");
}
