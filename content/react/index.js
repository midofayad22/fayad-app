// React course content, shared lesson schema (see docs/lesson-schema.md).
// Generated once from the legacy implementation by tools/convert-react-track.mjs; now hand-maintained.

export const track = {
  id: "react",
  title: {
    ar: "React",
    en: "React",
  },
  editorLabel: "React",
  runtime: "sim-react",
  quiz: {
    shuffle: true,
  },
  groups: [
    {
      id: "react-g1",
      title: {
        ar: "أساسيات React",
      },
      lessons: ["react-01", "react-02", "react-03", "react-04", "react-05", "react-06"],
    },
    {
      id: "react-g2",
      title: {
        ar: "React الأساسية",
      },
      lessons: ["react-07", "react-08", "react-09", "react-10", "react-11", "react-12"],
    },
    {
      id: "react-g3",
      title: {
        ar: "React Hooks",
      },
      lessons: ["react-13", "react-14", "react-15", "react-16", "react-17"],
    },
    {
      id: "react-g4",
      title: {
        ar: "React المتقدم",
      },
      lessons: ["react-18", "react-19", "react-20", "react-21", "react-22", "react-23", "react-24"],
    },
    {
      id: "react-g5",
      title: {
        ar: "React الحديثة",
      },
      lessons: ["react-25", "react-26", "react-27", "react-28", "react-29", "react-30"],
    },
  ],
};

export const lessons = [
  {
    id: "react-01",
    title: {
      ar: "مقدمة إلى React",
    },
    description: {
      ar: "تعرّف على React، ولماذا أصبحت من أشهر المكتبات المستخدمة لبناء واجهات المستخدم الحديثة.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "الفكرة الأساسية في React هي بناء الواجهة باستخدام Components قابلة لإعادة الاستخدام.",
    },
    example: {
      code: `function App() {
  return <h1>مرحبًا بك في FAYAD</h1>;
}`,
      explanation: {
        ar: "في React تكتب مكونات تصف الشكل الذي تريد عرضه، ثم تتولى React تحديث الواجهة عندما تتغير البيانات.",
      },
    },
    practice: {
      prompt: {
        ar: "جرّب تعديل النص داخل العنصر h1 وشاهد النتيجة في المعاينة.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الأساسي لمكتبة React؟",
        },
        options: [
          {
            ar: "بناء واجهات المستخدم",
          },
          {
            ar: "إدارة قواعد البيانات فقط",
          },
          {
            ar: "كتابة ملفات CSS فقط",
          },
          {
            ar: "استبدال JavaScript بالكامل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "بماذا تعتمد React بشكل أساسي في تنظيم الواجهة؟",
        },
        options: [
          {
            ar: "Components",
          },
          {
            ar: "Database Tables",
          },
          {
            ar: "CSS Selectors",
          },
          {
            ar: "SQL Queries",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل React تستبدل HTML وCSS وJavaScript بالكامل؟",
        },
        options: [
          {
            ar: "لا، تعمل معها لبناء الواجهات",
          },
          {
            ar: "نعم، تستبدلهم جميعًا",
          },
          {
            ar: "تستبدل CSS فقط",
          },
          {
            ar: "تستبدل HTML فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-02",
    title: {
      ar: "لماذا React؟",
    },
    description: {
      ar: "افهم أهم الأسباب التي تجعل React مناسبة لبناء التطبيقات الحديثة والقابلة للتوسع.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "إعادة استخدام المكونات تجعل الكود أكثر تنظيمًا وأسهل في الصيانة.",
    },
    example: {
      code: `function Button() {
  return <button>اضغط هنا</button>;
}`,
      explanation: {
        ar: "عندما يكون لديك Button أو Card أو Navbar متكرر، يمكنك بناءه مرة واحدة ثم استخدامه في أماكن مختلفة.",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Component باسم Button يعرض زرًا بسيطًا.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما إحدى أهم مزايا React؟",
        },
        options: [
          {
            ar: "إعادة استخدام المكونات",
          },
          {
            ar: "إلغاء الحاجة إلى JavaScript",
          },
          {
            ar: "إلغاء الحاجة إلى HTML",
          },
          {
            ar: "استخدام قواعد البيانات فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "لماذا تساعد Components في المشاريع الكبيرة؟",
        },
        options: [
          {
            ar: "تقسم التطبيق إلى أجزاء منظمة",
          },
          {
            ar: "تحذف CSS",
          },
          {
            ar: "تحذف JavaScript",
          },
          {
            ar: "تمنع استخدام APIs",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يعني Reusability؟",
        },
        options: [
          {
            ar: "إمكانية استخدام نفس المكون أكثر من مرة",
          },
          {
            ar: "كتابة الكود مرة واحدة ثم حذفه",
          },
          {
            ar: "منع استخدام المكون",
          },
          {
            ar: "استخدام CSS فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-03",
    title: {
      ar: "المكونات Components",
    },
    description: {
      ar: "تعلم مفهوم Components وكيف تستخدمها React لتقسيم الواجهة إلى أجزاء مستقلة وقابلة لإعادة الاستخدام.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Component هو وحدة بناء أساسية في React تمثل جزءًا من واجهة المستخدم.",
    },
    example: {
      code: `function Welcome() {
  return <h1>مرحبًا بك في FAYAD</h1>;
}`,
      explanation: {
        ar: "يمكنك تركيب Components متعددة معًا لبناء صفحة كاملة.",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Component باسم Welcome يعرض عنوان ترحيبي.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما هو React Component؟",
        },
        options: [
          {
            ar: "جزء قابل لإعادة الاستخدام من الواجهة",
          },
          {
            ar: "جدول قاعدة بيانات",
          },
          {
            ar: "خاصية CSS",
          },
          {
            ar: "ملف SQL",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن أن يحتوي Component على Components أخرى؟",
        },
        options: [
          {
            ar: "نعم",
          },
          {
            ar: "لا",
          },
          {
            ar: "فقط في CSS",
          },
          {
            ar: "فقط في HTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الهدف من تقسيم الواجهة إلى Components؟",
        },
        options: [
          {
            ar: "تنظيم وإعادة استخدام الكود",
          },
          {
            ar: "إلغاء JavaScript",
          },
          {
            ar: "إلغاء HTML",
          },
          {
            ar: "منع التفاعل",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-04",
    title: {
      ar: "JSX",
    },
    description: {
      ar: "تعلم JSX وكيف تسمح لك بكتابة صيغة تشبه HTML داخل JavaScript عند بناء Components.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "JSX تجعل وصف واجهة React داخل JavaScript أكثر وضوحًا وسهولة.",
    },
    example: {
      code: `function App() {
  return (
    <div>
      <h1>مرحبًا بك</h1>
      <p>تعلم React مع FAYAD</p>
    </div>
  );
}`,
      explanation: {
        ar: "يمكنك كتابة عناصر مثل h1 وp وbutton داخل Component، واستخدام JavaScript expressions داخل {}.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر النص داخل h1 وأضف فقرة p جديدة.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا تسمح JSX للمطور أن يكتب؟",
        },
        options: [
          {
            ar: "صيغة تشبه HTML داخل JavaScript",
          },
          {
            ar: "SQL داخل CSS",
          },
          {
            ar: "CSS داخل قاعدة البيانات",
          },
          {
            ar: "HTML فقط بدون JavaScript",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين نستخدم JavaScript expressions داخل JSX؟",
        },
        options: [
          {
            ar: "داخل { }",
          },
          {
            ar: "داخل [ ] فقط",
          },
          {
            ar: "داخل SQL",
          },
          {
            ar: "داخل CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل JSX هي HTML عادية تمامًا؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم دائمًا",
          },
          {
            ar: "هي CSS",
          },
          {
            ar: "هي قاعدة بيانات",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-05",
    title: {
      ar: "Props",
    },
    description: {
      ar: "تعلم كيف تسمح Props بتمرير البيانات من Component إلى Component آخر.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Props هي وسيلة أساسية لتمرير البيانات إلى Components.",
    },
    example: {
      code: `function Welcome({ name }) {
  return <h1>مرحبًا {name}</h1>;
}

function App() {
  return <Welcome name="FAYAD" />;
}`,
      explanation: {
        ar: "يمكنك إرسال name أو title أو image أو أي قيمة أخرى إلى Component.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر قيمة name وجرب تمرير اسم مختلف إلى Welcome.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الأساسي لـ Props؟",
        },
        options: [
          {
            ar: "تمرير البيانات إلى Components",
          },
          {
            ar: "إنشاء ملفات CSS",
          },
          {
            ar: "إنشاء قواعد بيانات",
          },
          {
            ar: "تشغيل الخادم",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "من أين تأتي Props غالبًا؟",
        },
        options: [
          {
            ar: "من Component الأب",
          },
          {
            ar: "من CSS",
          },
          {
            ar: "من HTML فقط",
          },
          {
            ar: "من قاعدة البيانات مباشرة دائمًا",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يجب تعديل Props مباشرة داخل Component؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم دائمًا",
          },
          {
            ar: "نعم باستخدام CSS",
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
    id: "react-06",
    title: {
      ar: "State",
    },
    description: {
      ar: "افهم مفهوم State وكيف تستخدمه React لتخزين البيانات التي يمكن أن تتغير أثناء تشغيل التطبيق.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "State تمثل البيانات المتغيرة التي تؤثر في واجهة المستخدم.",
    },
    example: {
      code: `const [count, setCount] = useState(0);

return (
  <button onClick={() => setCount(count + 1)}>
    {count}
  </button>
);`,
      explanation: {
        ar: "مثل عداد clicks أو حالة تسجيل الدخول أو قيمة input.",
      },
    },
    practice: {
      prompt: {
        ar: "جرّب تغيير القيمة الأولية للعداد.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا تمثل State؟",
        },
        options: [
          {
            ar: "بيانات يمكن أن تتغير بمرور الوقت",
          },
          {
            ar: "CSS Selector",
          },
          {
            ar: "ملف HTML",
          },
          {
            ar: "جدول قاعدة بيانات فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدث عادة عند تحديث State؟",
        },
        options: [
          {
            ar: "تُعاد معالجة الواجهة لعرض البيانات الجديدة",
          },
          {
            ar: "يتم حذف Component",
          },
          {
            ar: "يتم حذف CSS",
          },
          {
            ar: "يتوقف التطبيق",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Hook تستخدم لإدارة State البسيطة؟",
        },
        options: [
          {
            ar: "useState",
          },
          {
            ar: "useHTML",
          },
          {
            ar: "useCSS",
          },
          {
            ar: "useDatabase",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-07",
    title: {
      ar: "الأحداث Events",
    },
    description: {
      ar: "تعلم كيف تتعامل React مع تفاعل المستخدم مثل الضغط والكتابة وإرسال النماذج.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Events تربط تصرف المستخدم بالسلوك الذي تريد تنفيذه داخل التطبيق.",
    },
    example: {
      code: `function App() {
  function handleClick() {
    console.log("تم الضغط على الزر");
  }

  return <button onClick={handleClick}>اضغط هنا</button>;
}`,
      explanation: {
        ar: "عند الضغط على زر يمكن تنفيذ function، وعند الكتابة في input يمكن تحديث State.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر النص الذي يظهر عند الضغط على الزر.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الحدث المستخدم غالبًا عند الضغط على زر؟",
        },
        options: [
          {
            ar: "onClick",
          },
          {
            ar: "onButton",
          },
          {
            ar: "buttonEvent",
          },
          {
            ar: "clickOnly",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا نمرر عادة إلى onClick؟",
        },
        options: [
          {
            ar: "Function",
          },
          {
            ar: "CSS file",
          },
          {
            ar: "Database",
          },
          {
            ar: "HTML document",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الهدف من Events؟",
        },
        options: [
          {
            ar: "التعامل مع تفاعل المستخدم",
          },
          {
            ar: "إنشاء قواعد البيانات",
          },
          {
            ar: "كتابة CSS",
          },
          {
            ar: "إزالة Components",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-08",
    title: {
      ar: "العرض الشرطي",
    },
    description: {
      ar: "تعلم كيف تعرض React عناصر مختلفة بناءً على قيمة شرط معين.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "يمكن لـReact تغيير ما يظهر للمستخدم بناءً على البيانات الحالية.",
    },
    example: {
      code: `function App({ isLoggedIn }) {
  return (
    <h1>
      {isLoggedIn ? "مرحبًا بك مجددًا!" : "يرجى تسجيل الدخول"}
    </h1>
  );
}`,
      explanation: {
        ar: "مثل عرض Dashboard للمستخدم المسجل وإظهار Login للمستخدم غير المسجل.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر قيمة isLoggedIn وشاهد النتيجة.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما المقصود بـ Conditional Rendering؟",
        },
        options: [
          {
            ar: "عرض UI بناءً على شرط",
          },
          {
            ar: "إنشاء CSS Animation",
          },
          {
            ar: "إنشاء Database",
          },
          {
            ar: "كتابة HTML فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Operator يستخدم كثيرًا في العرض الشرطي؟",
        },
        options: [
          {
            ar: "Ternary ?",
          },
          {
            ar: "SQL JOIN",
          },
          {
            ar: "CSS #",
          },
          {
            ar: "HTML !DOCTYPE",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يمكن استخدام Conditional Rendering؟",
        },
        options: [
          {
            ar: "في حالات تسجيل الدخول والتحميل",
          },
          {
            ar: "في CSS فقط",
          },
          {
            ar: "في قواعد البيانات فقط",
          },
          {
            ar: "في ملفات الصور",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-09",
    title: {
      ar: "Lists & Keys",
    },
    description: {
      ar: "تعلم كيفية عرض مجموعة من البيانات باستخدام map ولماذا تحتاج React إلى Keys.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "map تعرض عناصر القائمة، وkey تساعد React على تحديد هوية كل عنصر.",
    },
    example: {
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
      explanation: {
        ar: "يفضل استخدام ID فريد كمفتاح بدلًا من استخدام index عندما تكون القائمة قابلة للتغيير.",
      },
    },
    practice: {
      prompt: {
        ar: "أضف مهارة جديدة إلى Array.",
      },
    },
    quiz: [
      {
        question: {
          ar: "لماذا نستخدم map في React؟",
        },
        options: [
          {
            ar: "لعرض مجموعة من البيانات",
          },
          {
            ar: "لإنشاء CSS",
          },
          {
            ar: "لإنشاء Database",
          },
          {
            ar: "لتشغيل الخادم",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "لماذا نستخدم key؟",
        },
        options: [
          {
            ar: "لمساعدة React على تحديد عناصر القائمة",
          },
          {
            ar: "لتغيير اللون",
          },
          {
            ar: "لإنشاء variable",
          },
          {
            ar: "لإضافة CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الأفضل عادة كقيمة لـ key؟",
        },
        options: [
          {
            ar: "معرّف فريد ومستقر",
          },
          {
            ar: "قيمة عشوائية تتغير دائمًا",
          },
          {
            ar: "CSS class",
          },
          {
            ar: "اسم الملف",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-10",
    title: {
      ar: "Forms",
    },
    navTitle: {
      ar: "النماذج Forms",
    },
    description: {
      ar: "تعلم كيفية التعامل مع حقول الإدخال والنماذج داخل تطبيقات React.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "React تسمح لك بربط قيم حقول النموذج مع State والتحكم فيها.",
    },
    example: {
      code: `function App() {
  return (
    <form>
      <input placeholder="اكتب اسمك" />
      <button type="submit">إرسال</button>
    </form>
  );
}`,
      explanation: {
        ar: "هذا يجعل التحقق من البيانات وإرسالها إلى API أسهل.",
      },
    },
    practice: {
      prompt: {
        ar: "أضف input آخر إلى النموذج.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا تستخدم Forms لجمعه؟",
        },
        options: [
          {
            ar: "بيانات المستخدم",
          },
          {
            ar: "ألوان CSS فقط",
          },
          {
            ar: "صور فقط",
          },
          {
            ar: "ملفات JavaScript فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الحدث المستخدم غالبًا عند إرسال Form؟",
        },
        options: [
          {
            ar: "onSubmit",
          },
          {
            ar: "onFormOnly",
          },
          {
            ar: "onSendCSS",
          },
          {
            ar: "submitHTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما معنى Controlled Component؟",
        },
        options: [
          {
            ar: "قيمة الحقل يتم التحكم فيها من خلال React State",
          },
          {
            ar: "عنصر CSS",
          },
          {
            ar: "ملف HTML",
          },
          {
            ar: "قاعدة بيانات",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-11",
    title: {
      ar: "تركيب المكونات Component Composition",
    },
    navTitle: {
      ar: "تركيب المكونات",
    },
    description: {
      ar: "تعلم كيف تجمع عدة Components معًا لبناء واجهات أكبر وأكثر تنظيمًا.",
    },
    body: {
      ar: `
      <p>
        Component Composition يعني بناء Component كبير من مجموعة
        Components أصغر.
      </p>
      <p>
        هذه الطريقة تجعل كل Component مسؤولًا عن جزء محدد، ثم يتم
        تركيب الأجزاء معًا لتكوين واجهة كاملة.
      </p>
    `,
    },
    key: {
      ar: "التطبيق الكبير يمكن بناؤه من مجموعة Components صغيرة ومتخصصة.",
    },
    example: {
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
      explanation: {
        ar: "مثل تركيب صفحة من Header وSidebar وContent وFooter.",
      },
    },
    practice: {
      prompt: {
        ar: "أضف Component جديدًا إلى App.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يعني Component Composition؟",
        },
        options: [
          {
            ar: "جمع Components لبناء واجهة",
          },
          {
            ar: "حذف Components",
          },
          {
            ar: "كتابة CSS فقط",
          },
          {
            ar: "إنشاء Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما فائدة Composition؟",
        },
        options: [
          {
            ar: "تنظيم الواجهة إلى أجزاء",
          },
          {
            ar: "إلغاء JavaScript",
          },
          {
            ar: "إلغاء Props",
          },
          {
            ar: "منع إعادة الاستخدام",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي مثال يمثل Composition؟",
        },
        options: [
          {
            ar: "App يحتوي Header وFooter",
          },
          {
            ar: "ملف CSS فقط",
          },
          {
            ar: "جدول Database",
          },
          {
            ar: "صورة فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-12",
    title: {
      ar: "مقدمة إلى Hooks",
    },
    description: {
      ar: "افهم مفهوم React Hooks ولماذا أصبحت أساسية في كتابة المكونات الحديثة.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Hooks توفر وظائف React الأساسية داخل Function Components.",
    },
    example: {
      code: `import { useState } from "react";

function App() {
  const [name, setName] = useState("FAYAD");

  return <h1>{name}</h1>;
}`,
      explanation: {
        ar: "كل Hook لها وظيفة محددة، ويجب الالتزام بقواعد استخدامها.",
      },
    },
    practice: {
      prompt: {
        ar: "جرّب تغيير القيمة الأولية في useState.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما هي React Hooks؟",
        },
        options: [
          {
            ar: "Functions تسمح باستخدام خصائص React",
          },
          {
            ar: "CSS classes",
          },
          {
            ar: "HTML attributes",
          },
          {
            ar: "Database tables",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي من التالي Hook حقيقية؟",
        },
        options: [
          {
            ar: "useState",
          },
          {
            ar: "useHTML",
          },
          {
            ar: "useCSS",
          },
          {
            ar: "useDatabase",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "لماذا تستخدم Hooks؟",
        },
        options: [
          {
            ar: "لاستخدام وإعادة تنظيم منطق React",
          },
          {
            ar: "لكتابة CSS فقط",
          },
          {
            ar: "لإنشاء قواعد بيانات",
          },
          {
            ar: "لإلغاء Components",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-13",
    title: {
      ar: "useState",
    },
    description: {
      ar: "تعلم كيف تستخدم useState لإضافة State إلى Function Components وتحديث الواجهة.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "useState ترجع State value وState setter.",
    },
    example: {
      code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
      explanation: {
        ar: "مثال: const [count, setCount] = useState(0).",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر الرقم الأولي للعداد أو قيمة الزيادة.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا توفر useState؟",
        },
        options: [
          {
            ar: "قيمة State وFunction لتحديثها",
          },
          {
            ar: "CSS فقط",
          },
          {
            ar: "HTML فقط",
          },
          {
            ar: "Database فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تمثل setCount؟",
        },
        options: [
          {
            ar: "Function لتحديث State",
          },
          {
            ar: "CSS Selector",
          },
          {
            ar: "HTML Tag",
          },
          {
            ar: "Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما القيمة الأولية في useState(0)؟",
        },
        options: [
          {
            ar: "0",
          },
          {
            ar: "1",
          },
          {
            ar: "null",
          },
          {
            ar: "undefined دائمًا",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-14",
    title: {
      ar: "useEffect",
    },
    description: {
      ar: "تعلم كيف تستخدم useEffect للتعامل مع Side Effects مثل جلب البيانات والاشتراكات.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "useEffect مناسبة للعمليات التي تحدث خارج حساب الواجهة المباشر.",
    },
    example: {
      code: `import { useEffect } from "react";

useEffect(() => {
  console.log("تم تشغيل Effect");
}, []);`,
      explanation: {
        ar: "يمكن تشغيل Effect مرة بعد Mount باستخدام dependency array فارغة، أو عند تغير قيم محددة.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر النص الموجود داخل console.log.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الشائع لـuseEffect؟",
        },
        options: [
          {
            ar: "التعامل مع Side Effects",
          },
          {
            ar: "إنشاء CSS selectors",
          },
          {
            ar: "تعريف HTML tags",
          },
          {
            ar: "إنشاء Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تعني [] في dependency array؟",
        },
        options: [
          {
            ar: "لا توجد dependencies",
          },
          {
            ar: "تشغيل كل ثانية",
          },
          {
            ar: "تشغيل عند كل CSS change",
          },
          {
            ar: "إلغاء Effect",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي مثال مناسب لـuseEffect؟",
        },
        options: [
          {
            ar: "جلب بيانات من API",
          },
          {
            ar: "كتابة لون الزر",
          },
          {
            ar: "إنشاء HTML file",
          },
          {
            ar: "تعريف CSS class",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-15",
    title: {
      ar: "useRef",
    },
    description: {
      ar: "تعلم كيف تستخدم useRef للاحتفاظ بقيمة أو الوصول إلى عنصر DOM دون التسبب في Re-render.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "useRef مفيدة للقيم التي تحتاج إلى الاحتفاظ بها دون التسبب في إعادة Render.",
    },
    example: {
      code: `import { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  return <input ref={inputRef} />;
}`,
      explanation: {
        ar: "يمكن استخدامها أيضًا لحفظ reference إلى DOM element.",
      },
    },
    practice: {
      prompt: {
        ar: "جرّب تغيير اسم inputRef.",
      },
    },
    quiz: [
      {
        question: {
          ar: "في ماذا يمكن استخدام useRef؟",
        },
        options: [
          {
            ar: "الوصول إلى DOM elements",
          },
          {
            ar: "إنشاء CSS فقط",
          },
          {
            ar: "إنشاء Database tables",
          },
          {
            ar: "استبدال JavaScript",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين توجد القيمة المخزنة في ref؟",
        },
        options: [
          {
            ar: "current",
          },
          {
            ar: "valueOnly",
          },
          {
            ar: "state",
          },
          {
            ar: "data",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل تغيير ref.current يسبب Re-render؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم دائمًا",
          },
          {
            ar: "فقط في CSS",
          },
          {
            ar: "فقط في HTML",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-16",
    title: {
      ar: "useContext",
    },
    description: {
      ar: "تعلم كيف تسمح useContext بمشاركة البيانات بين Components دون تمرير Props عبر كل مستوى.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Context مناسب للبيانات المشتركة التي تحتاجها Components متعددة.",
    },
    example: {
      code: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}`,
      explanation: {
        ar: "مثل Theme أو معلومات المستخدم أو إعدادات عامة للتطبيق.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر قيمة ThemeContext من light إلى dark.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما المشكلة التي يساعد useContext في حلها؟",
        },
        options: [
          {
            ar: "مشاركة البيانات بين Components",
          },
          {
            ar: "كتابة CSS",
          },
          {
            ar: "إنشاء HTML",
          },
          {
            ar: "إنشاء Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يوفره Context؟",
        },
        options: [
          {
            ar: "قيمة يمكن الوصول إليها من Components داخل Provider",
          },
          {
            ar: "CSS Animation",
          },
          {
            ar: "HTML file",
          },
          {
            ar: "SQL table",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي بيانات مناسبة لـContext؟",
        },
        options: [
          {
            ar: "Theme أو بيانات مستخدم عامة",
          },
          {
            ar: "لون زر واحد فقط دائمًا",
          },
          {
            ar: "ملف CSS",
          },
          {
            ar: "صورة واحدة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-17",
    title: {
      ar: "Custom Hooks",
    },
    description: {
      ar: "تعلم كيفية إنشاء Custom Hooks لإعادة استخدام منطق React بين عدة Components.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Custom Hooks تساعدك على إعادة استخدام Logic بدلًا من تكراره.",
    },
    example: {
      code: `function useGreeting(name) {
  return \`مرحبًا \${name}\`;
}`,
      explanation: {
        ar: "يمكنك إنشاء useFetch أو useToggle أو useLocalStorage مثلًا.",
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Hook باسم useGreeting.",
      },
    },
    quiz: [
      {
        question: {
          ar: "لماذا ننشئ Custom Hook؟",
        },
        options: [
          {
            ar: "لإعادة استخدام Logic",
          },
          {
            ar: "لاستبدال CSS",
          },
          {
            ar: "لإنشاء HTML",
          },
          {
            ar: "لإنشاء Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "بماذا يبدأ اسم Custom Hook عادة؟",
        },
        options: [
          {
            ar: "use",
          },
          {
            ar: "hook",
          },
          {
            ar: "react",
          },
          {
            ar: "custom",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل Custom Hook يمكنها استخدام Hooks أخرى؟",
        },
        options: [
          {
            ar: "نعم",
          },
          {
            ar: "لا",
          },
          {
            ar: "فقط CSS",
          },
          {
            ar: "فقط HTML",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-18",
    title: {
      ar: "React Router",
    },
    description: {
      ar: "تعلم كيف تستخدم React Router لإنشاء التنقل بين الصفحات والمشاهد داخل تطبيق React.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "React Router يدير Navigation وربط URLs بالمكونات.",
    },
    example: {
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
      explanation: {
        ar: "يمكن تعريف Route لكل صفحة داخل التطبيق.",
      },
    },
    practice: {
      prompt: {
        ar: "أضف Route جديدًا لصفحة Contact.",
      },
    },
    quiz: [
      {
        question: {
          ar: "في ماذا يستخدم React Router؟",
        },
        options: [
          {
            ar: "Client-side navigation",
          },
          {
            ar: "إدارة قواعد البيانات",
          },
          {
            ar: "كتابة CSS",
          },
          {
            ar: "إنشاء الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدد Route؟",
        },
        options: [
          {
            ar: "العلاقة بين URL وComponent",
          },
          {
            ar: "لون الصفحة",
          },
          {
            ar: "نوع قاعدة البيانات",
          },
          {
            ar: "ملف CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي عنصر يستخدم لتعريف مجموعة Routes؟",
        },
        options: [
          {
            ar: "Routes",
          },
          {
            ar: "RouteGroup",
          },
          {
            ar: "RouterList",
          },
          {
            ar: "NavigationCSS",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-19",
    title: {
      ar: "طلبات API",
    },
    description: {
      ar: "تعلم كيف تتواصل تطبيقات React مع APIs للحصول على بيانات خارجية.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "API هي حلقة الاتصال بين واجهة React ومصدر البيانات الخارجي.",
    },
    example: {
      code: `async function getUsers() {
  const response = await fetch(
    "https://example.com/users"
  );

  const data = await response.json();

  return data;
}`,
      explanation: {
        ar: "عادة يتم جلب البيانات ثم تحويل Response إلى JSON ثم تخزينها في State.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر اسم الدالة أو مسار API في المثال.",
      },
    },
    quiz: [
      {
        question: {
          ar: "لماذا تستخدم React APIs؟",
        },
        options: [
          {
            ar: "للتواصل مع مصادر بيانات خارجية",
          },
          {
            ar: "لإنشاء CSS",
          },
          {
            ar: "لإلغاء JavaScript",
          },
          {
            ar: "لإنشاء HTML فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الدالة الشائعة لإرسال HTTP Request في JavaScript؟",
        },
        options: [
          {
            ar: "fetch",
          },
          {
            ar: "style",
          },
          {
            ar: "renderCSS",
          },
          {
            ar: "queryHTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما وظيفة response.json()؟",
        },
        options: [
          {
            ar: "تحويل Response إلى بيانات JSON",
          },
          {
            ar: "إضافة CSS",
          },
          {
            ar: "إنشاء Component",
          },
          {
            ar: "حذف البيانات",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-20",
    title: {
      ar: "حالات التحميل والأخطاء",
    },
    description: {
      ar: "تعلم كيف تعرض واجهة مناسبة أثناء تحميل البيانات أو عند حدوث خطأ.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "Loading وError states جزء أساسي من تجربة المستخدم الجيدة.",
    },
    example: {
      code: `if (loading) {
  return <p>جارٍ التحميل...</p>;
}

if (error) {
  return <p>حدث خطأ.</p>;
}`,
      explanation: {
        ar: "التطبيق الاحترافي لا يعرض البيانات فقط، بل يتعامل أيضًا مع حالات الانتظار والفشل.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر رسائل Loading وError.",
      },
    },
    quiz: [
      {
        question: {
          ar: "لماذا نستخدم Loading state؟",
        },
        options: [
          {
            ar: "لإخبار المستخدم أن البيانات ما زالت تُحمّل",
          },
          {
            ar: "لتغيير CSS",
          },
          {
            ar: "لحذف Component",
          },
          {
            ar: "لإنشاء Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "متى نستخدم Error state؟",
        },
        options: [
          {
            ar: "عند حدوث مشكلة في العملية",
          },
          {
            ar: "عند نجاح الطلب فقط",
          },
          {
            ar: "عند تغيير اللون",
          },
          {
            ar: "عند تحميل CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الفائدة الأساسية من هذه الحالات؟",
        },
        options: [
          {
            ar: "تحسين تجربة المستخدم",
          },
          {
            ar: "حذف JavaScript",
          },
          {
            ar: "إلغاء APIs",
          },
          {
            ar: "إلغاء State",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-21",
    title: {
      ar: "تحسين الأداء Performance",
    },
    navTitle: {
      ar: "تحسين الأداء",
    },
    description: {
      ar: "تعرف على المبادئ الأساسية لتحسين أداء تطبيقات React وتقليل العمل غير الضروري.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "تحسين الأداء يبدأ بفهم المشكلة وليس بإضافة أدوات Optimization عشوائيًا.",
    },
    example: {
      code: `function ProductList({ products }) {
  return products.map((product) => (
    <Product
      key={product.id}
      product={product}
    />
  ));
}`,
      explanation: {
        ar: "راقب عمليات Render والعمليات الحسابية الثقيلة قبل اختيار طريقة التحسين.",
      },
    },
    practice: {
      prompt: {
        ar: "حاول تحديد Component الذي قد يحتاج إلى تحسين في المثال.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الهدف من Performance Optimization؟",
        },
        options: [
          {
            ar: "تقليل العمل والعمليات غير الضرورية",
          },
          {
            ar: "إضافة CSS أكثر",
          },
          {
            ar: "حذف Components",
          },
          {
            ar: "إلغاء JavaScript",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يجب أن تفعل قبل Optimization؟",
        },
        options: [
          {
            ar: "تفهم سبب المشكلة أولًا",
          },
          {
            ar: "تستخدم كل Hooks",
          },
          {
            ar: "تحذف State",
          },
          {
            ar: "تحذف Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يجب استخدام memoization في كل Component؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم دائمًا",
          },
          {
            ar: "فقط في HTML",
          },
          {
            ar: "فقط في CSS",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-22",
    title: {
      ar: "React.memo",
    },
    description: {
      ar: "تعلم كيف يمكن لـReact.memo تقليل بعض عمليات إعادة Render غير الضرورية.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "React.memo يمكن أن تمنع بعض عمليات Render غير الضرورية عندما لا تتغير Props.",
    },
    example: {
      code: `const UserCard = React.memo(function UserCard({ name }) {
  return <h2>{name}</h2>;
});`,
      explanation: {
        ar: "تكون مفيدة خصوصًا عندما يكون Component مكلفًا في Render ويتلقى Props مستقرة.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر اسم UserCard وجرب استخدامه مع Props مختلفة.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الذي يمكن أن تساعد React.memo في تقليله؟",
        },
        options: [
          {
            ar: "Unnecessary re-renders",
          },
          {
            ar: "HTML files",
          },
          {
            ar: "CSS files",
          },
          {
            ar: "Database tables",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "على ماذا تعتمد React.memo بشكل أساسي؟",
        },
        options: [
          {
            ar: "مقارنة Props",
          },
          {
            ar: "لون العنصر",
          },
          {
            ar: "اسم ملف CSS",
          },
          {
            ar: "حجم الصورة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل React.memo مطلوبة لكل Component؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم",
          },
          {
            ar: "فقط للصور",
          },
          {
            ar: "فقط للنماذج",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-23",
    title: {
      ar: "useMemo وuseCallback",
    },
    navTitle: {
      ar: "useMemo & useCallback",
    },
    description: {
      ar: "تعلم الفرق بين useMemo وuseCallback ومتى يمكن استخدامهما في تحسين الأداء.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "useMemo تحفظ قيمة محسوبة، بينما useCallback تحفظ Function reference.",
    },
    example: {
      code: `const total = useMemo(() => {
  return calculateTotal(items);
}, [items]);`,
      explanation: {
        ar: "الاثنتان أدوات Optimization وليستا بديلًا عن تصميم التطبيق الجيد.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر dependencies في المثال وشاهد كيف تؤثر.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يمكن أن تحفظ useMemo؟",
        },
        options: [
          {
            ar: "قيمة محسوبة",
          },
          {
            ar: "ملف HTML",
          },
          {
            ar: "ملف CSS",
          },
          {
            ar: "قاعدة بيانات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تحفظ useCallback؟",
        },
        options: [
          {
            ar: "Function reference",
          },
          {
            ar: "HTML element",
          },
          {
            ar: "CSS color",
          },
          {
            ar: "Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يجب استخدام useMemo دائمًا؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم",
          },
          {
            ar: "فقط في Forms",
          },
          {
            ar: "فقط في Router",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-24",
    title: {
      ar: "إدارة الحالة State Management",
    },
    navTitle: {
      ar: "إدارة الحالة",
    },
    description: {
      ar: "افهم الطرق المختلفة لإدارة State عندما يكبر حجم تطبيق React.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "اختيار State Management المناسب يعتمد على طبيعة وحجم التطبيق.",
    },
    example: {
      code: `const [user, setUser] = useState(null);

function login(userData) {
  setUser(userData);
}`,
      explanation: {
        ar: "لا توجد أداة واحدة مناسبة لكل المشاريع.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر القيمة الأولية لـuser.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما المقصود بـState Management؟",
        },
        options: [
          {
            ar: "إدارة بيانات التطبيق وتغيراتها",
          },
          {
            ar: "تنسيق CSS",
          },
          {
            ar: "إنشاء HTML فقط",
          },
          {
            ar: "ضغط الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل كل تطبيق React يحتاج مكتبة State Management خارجية؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم دائمًا",
          },
          {
            ar: "فقط في HTML",
          },
          {
            ar: "فقط في CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يؤثر في اختيار طريقة إدارة State؟",
        },
        options: [
          {
            ar: "حجم التطبيق وطبيعة البيانات",
          },
          {
            ar: "لون الموقع",
          },
          {
            ar: "اسم Component فقط",
          },
          {
            ar: "نوع الصورة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-25",
    title: {
      ar: "معمارية React",
    },
    description: {
      ar: "تعلم المبادئ الأساسية لتنظيم مشروع React إلى طبقات ومكونات واضحة وقابلة للصيانة.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "المعمارية الجيدة تجعل المشروع أسهل في الفهم والتطوير والصيانة.",
    },
    example: {
      code: `src/
├── components/
├── pages/
├── hooks/
├── services/
└── App.jsx`,
      explanation: {
        ar: "لا توجد بنية مجلدات واحدة إجبارية لكل مشاريع React، بل تختار الهيكل المناسب للمشروع.",
      },
    },
    practice: {
      prompt: {
        ar: "أضف مجلدًا مناسبًا إلى هيكل المشروع.",
      },
    },
    quiz: [
      {
        question: {
          ar: "لماذا تعتبر Architecture مهمة؟",
        },
        options: [
          {
            ar: "تجعل المشروع أسهل في الصيانة",
          },
          {
            ar: "تحذف JavaScript",
          },
          {
            ar: "تستبدل React",
          },
          {
            ar: "تمنع استخدام Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يمكن وضع Components المشتركة؟",
        },
        options: [
          {
            ar: "components/",
          },
          {
            ar: "database/",
          },
          {
            ar: "css-only/",
          },
          {
            ar: "sql/",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل توجد بنية مجلدات واحدة إلزامية لكل React projects؟",
        },
        options: [
          {
            ar: "لا",
          },
          {
            ar: "نعم دائمًا",
          },
          {
            ar: "نعم فقط في Vercel",
          },
          {
            ar: "نعم فقط في Windows",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-26",
    title: {
      ar: "المكونات القابلة لإعادة الاستخدام",
    },
    description: {
      ar: "تعلم كيف تصمم Components مرنة يمكن استخدامها في أكثر من مكان داخل التطبيق.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "صمم Component عامًا عندما يكون هناك سلوك أو واجهة مشتركة فعلًا.",
    },
    example: {
      code: `function Button({ children }) {
  return (
    <button className="button">
      {children}
    </button>
  );
}`,
      explanation: {
        ar: "Button مثال بسيط على Component يمكن استخدامه بأكثر من نص أو وظيفة.",
      },
    },
    practice: {
      prompt: {
        ar: "جرّب تمرير نص مختلف باستخدام children.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما هو Reusable Component؟",
        },
        options: [
          {
            ar: "Component يمكن استخدامه في أماكن متعددة",
          },
          {
            ar: "Component يعمل مرة واحدة فقط",
          },
          {
            ar: "CSS file",
          },
          {
            ar: "Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يمكن استخدامه لجعل Button مرنًا؟",
        },
        options: [
          {
            ar: "Props وchildren",
          },
          {
            ar: "CSS فقط",
          },
          {
            ar: "SQL",
          },
          {
            ar: "Database",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الهدف من Reusability؟",
        },
        options: [
          {
            ar: "تقليل التكرار",
          },
          {
            ar: "زيادة التكرار",
          },
          {
            ar: "حذف Components",
          },
          {
            ar: "حذف JavaScript",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-27",
    title: {
      ar: "تنظيم المشروع Project Structure",
    },
    navTitle: {
      ar: "تنظيم المشروع",
    },
    description: {
      ar: "تعلم كيفية تنظيم ملفات ومجلدات مشروع React بطريقة تساعد على التوسع.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "تنظيم الملفات يجب أن يخدم وضوح المشروع وليس أن يزيد التعقيد.",
    },
    example: {
      code: `src/
├── components/
├── pages/
├── assets/
├── hooks/
├── services/
└── main.jsx`,
      explanation: {
        ar: "اختر هيكلًا واضحًا يتناسب مع حجم التطبيق وطريقة عمل الفريق.",
      },
    },
    practice: {
      prompt: {
        ar: "أضف مجلدًا خاصًا بالصور والأصول.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يصف Project Structure؟",
        },
        options: [
          {
            ar: "تنظيم ملفات ومجلدات المشروع",
          },
          {
            ar: "ألوان الموقع فقط",
          },
          {
            ar: "قاعدة البيانات فقط",
          },
          {
            ar: "سرعة الإنترنت",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يمكن وضع الصور والأصول؟",
        },
        options: [
          {
            ar: "assets/",
          },
          {
            ar: "database/",
          },
          {
            ar: "hooks-only/",
          },
          {
            ar: "sql/",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الهدف من تنظيم المشروع؟",
        },
        options: [
          {
            ar: "تسهيل العثور على الملفات وصيانة المشروع",
          },
          {
            ar: "زيادة حجم المشروع",
          },
          {
            ar: "إلغاء Components",
          },
          {
            ar: "منع إعادة الاستخدام",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-28",
    title: {
      ar: "أفضل الممارسات Best Practices",
    },
    navTitle: {
      ar: "أفضل الممارسات",
    },
    description: {
      ar: "تعلم مجموعة من الممارسات التي تساعدك على كتابة React code واضح وقابل للصيانة.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "الكود الجيد ليس فقط كودًا يعمل، بل كود يمكن فهمه وتطويره بسهولة.",
    },
    example: {
      code: `function UserCard({ user }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  );
}`,
      explanation: {
        ar: "استخدم أسماء واضحة وحافظ على مسؤولية محددة لكل Component قدر الإمكان.",
      },
    },
    practice: {
      prompt: {
        ar: "حاول تحسين اسم Component أو المتغير في المثال.",
      },
    },
    quiz: [
      {
        question: {
          ar: "لماذا Best Practices مهمة؟",
        },
        options: [
          {
            ar: "تحسن جودة الكود وقابليته للصيانة",
          },
          {
            ar: "تلغي Components",
          },
          {
            ar: "تجعل JavaScript غير ضرورية",
          },
          {
            ar: "تستبدل React",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي اسم أفضل عادة؟",
        },
        options: [
          {
            ar: "UserCard",
          },
          {
            ar: "x1",
          },
          {
            ar: "abc123",
          },
          {
            ar: "thing",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما المشكلة في Component ضخم جدًا؟",
        },
        options: [
          {
            ar: "يصعب فهمه وصيانته",
          },
          {
            ar: "يصبح CSS فقط",
          },
          {
            ar: "لا يمكن تشغيل React",
          },
          {
            ar: "يتحول إلى Database",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-29",
    title: {
      ar: "React + APIs",
    },
    description: {
      ar: "اربط بين React وState وEffects وAPIs لبناء تطبيقات تعتمد على البيانات الحقيقية.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "التطبيقات المعتمدة على البيانات تحتاج إلى تنسيق جيد بين API وState وUI.",
    },
    example: {
      code: `useEffect(() => {
  fetch("/api/users")
    .then((response) => response.json())
    .then((data) => setUsers(data));
}, []);`,
      explanation: {
        ar: "يمكن فصل منطق API في services لتقليل مسؤوليات Components.",
      },
    },
    practice: {
      prompt: {
        ar: "غيّر endpoint في المثال إلى endpoint آخر.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يمكن أن يوفر API لتطبيق React؟",
        },
        options: [
          {
            ar: "بيانات خارجية",
          },
          {
            ar: "CSS فقط",
          },
          {
            ar: "HTML فقط",
          },
          {
            ar: "صور CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يمكن تخزين البيانات القادمة من API؟",
        },
        options: [
          {
            ar: "React State",
          },
          {
            ar: "CSS",
          },
          {
            ar: "HTML attribute",
          },
          {
            ar: "Class name فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما Hook الشائعة لتنفيذ Fetch عند تحميل Component؟",
        },
        options: [
          {
            ar: "useEffect",
          },
          {
            ar: "useHTML",
          },
          {
            ar: "useCSS",
          },
          {
            ar: "useDatabase",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "react-30",
    title: {
      ar: "المشروع النهائي",
    },
    description: {
      ar: "اجمع ما تعلمته في React لبناء تطبيق متكامل منظم وقابل للتوسع.",
    },
    body: {
      ar: `
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
    },
    key: {
      ar: "المشروع النهائي هو فرصة لتطبيق المفاهيم بدلًا من دراستها بشكل منفصل.",
    },
    example: {
      code: `function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <Footer />
    </>
  );
}`,
      explanation: {
        ar: "ابدأ بتحديد فكرة التطبيق، ثم قسمها إلى Components وFeatures صغيرة.",
      },
    },
    practice: {
      prompt: {
        ar: "خطط للمكونات الأساسية في مشروعك قبل كتابة الكود.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الهدف الأساسي من المشروع النهائي؟",
        },
        options: [
          {
            ar: "تطبيق ما تعلمته في تطبيق كامل",
          },
          {
            ar: "تجنب استخدام React",
          },
          {
            ar: "كتابة CSS فقط",
          },
          {
            ar: "حذف Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يمكن أن يجمعه المشروع النهائي؟",
        },
        options: [
          {
            ar: "Components وState وAPIs وRouting وغيرها",
          },
          {
            ar: "CSS فقط",
          },
          {
            ar: "HTML فقط",
          },
          {
            ar: "Database فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما أفضل طريقة للبدء في مشروع كبير؟",
        },
        options: [
          {
            ar: "تقسيم الفكرة إلى Components وFeatures",
          },
          {
            ar: "كتابة كل شيء في Component واحد",
          },
          {
            ar: "حذف Architecture",
          },
          {
            ar: "عدم التخطيط",
          },
        ],
        correct: 0,
      },
    ],
  },
];
