// Vue course content, shared lesson schema (see docs/lesson-schema.md).
// Generated once from the legacy implementation by tools/convert-vue-track.mjs; now hand-maintained.

export const track = {
  id: "vue",
  title: {
    ar: "Vue.js",
    en: "Vue.js",
  },
  editorLabel: "HTML + Vue",
  runtime: "html",
  quiz: {
    shuffle: true,
  },
  preview: {
    baseCss: false,
    bodyClass: "",
    head: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><script src=\"/vendor/vue-3.5.13/vue.global.prod.js\"></script>",
  },
  groups: [
    {
      id: "vue-g1",
      title: {
        ar: "أساسيات Vue",
      },
      lessons: ["vue-01", "vue-02", "vue-03", "vue-04", "vue-05", "vue-06"],
    },
    {
      id: "vue-g2",
      title: {
        ar: "Directives",
      },
      lessons: ["vue-07", "vue-08", "vue-09", "vue-10", "vue-11", "vue-12"],
    },
    {
      id: "vue-g3",
      title: {
        ar: "المكونات Components",
      },
      lessons: ["vue-13", "vue-14", "vue-15"],
    },
    {
      id: "vue-g4",
      title: {
        ar: "Composition API",
      },
      lessons: ["vue-16", "vue-17", "vue-18", "vue-19"],
    },
    {
      id: "vue-g5",
      title: {
        ar: "Vue المتقدم",
      },
      lessons: ["vue-20", "vue-21", "vue-22"],
    },
  ],
};

export const lessons = [
  {
    id: "vue-01",
    title: {
      ar: "ما هي Vue.js؟",
    },
    description: {
      ar: "تعرّف على Vue.js، وفهم الهدف منها، ولماذا تُستخدم في بناء واجهات المستخدم التفاعلية.",
    },
    body: {
      ar: `

      <p>
        Vue.js هي JavaScript Framework تُستخدم لبناء واجهات مستخدم
        تفاعلية وحديثة.
      </p>

      <p>
        تتميز Vue بأنها سهلة التعلم ومرنة، ويمكن استخدامها لبناء
        تطبيقات صغيرة أو تطبيقات كبيرة ومعقدة.
      </p>

      <p>
        تعتمد Vue على فكرة ربط البيانات بالواجهة بحيث يتم تحديث
        الواجهة تلقائيًا عندما تتغير البيانات.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Vue تربط البيانات بالواجهة",
      },
      text: {
        ar: "عندما تتغير البيانات في التطبيق، تستطيع Vue تحديث الجزء المناسب من الواجهة تلقائيًا.",
      },
    },
    example: {
      code: `
<div id="app">
  <h1>{{ message }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello Vue!"
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2 style="margin:0;">Hello Vue!</h2>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>createApp()</code> تُستخدم لإنشاء تطبيق Vue جديد.
      </p>

      <p>
        <code>data()</code> تُعيد البيانات التي سيستخدمها التطبيق.
      </p>

      <p>
        <code>{{ message }}</code> تعرض قيمة <code>message</code>
        داخل الـ Template.
      </p>

      <p>
        <code>mount("#app")</code> تربط تطبيق Vue بالعنصر الذي يحمل
        المعرف <code>app</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ عنوانًا يعرض رسالة من بيانات Vue باستخدام Interpolation.",
      },
      starterCode: `
<div id="app">
  <h1>{{ message }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello Vue!"
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الأساسي لـ Vue.js؟",
        },
        options: [
          {
            ar: "بناء واجهات مستخدم تفاعلية",
          },
          {
            ar: "إنشاء قواعد البيانات فقط",
          },
          {
            ar: "تصميم الصور فقط",
          },
          {
            ar: "إدارة نظام التشغيل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "Vue.js مبنية أساسًا باستخدام ماذا؟",
        },
        options: [
          {
            ar: "JavaScript",
          },
          {
            ar: "SQL",
          },
          {
            ar: "Python فقط",
          },
          {
            ar: "C++ فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الفكرة المهمة التي توفرها Vue؟",
        },
        options: [
          {
            ar: "ربط البيانات بالواجهة",
          },
          {
            ar: "إلغاء HTML",
          },
          {
            ar: "استبدال نظام التشغيل",
          },
          {
            ar: "إنشاء ملفات PDF فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-02",
    title: {
      ar: "بنية تطبيق Vue",
    },
    description: {
      ar: "تعرّف على الطريقة الأساسية لإنشاء تطبيق Vue وربطه بعنصر HTML.",
    },
    body: {
      ar: `

      <p>
        يبدأ تطبيق Vue عادةً باستخدام <code>createApp()</code>.
      </p>

      <p>
        بعد إنشاء التطبيق نستخدم <code>mount()</code> لتحديد عنصر
        HTML الذي سيعمل بداخله التطبيق.
      </p>
    `,
    },
    key: {
      title: {
        ar: "createApp تبدأ التطبيق",
      },
      text: {
        ar: "نستخدم createApp لإنشاء تطبيق Vue ثم mount لربطه بعنصر HTML.",
      },
    },
    example: {
      code: `
<div id="app">
  <h1>{{ title }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      title: "My Vue App"
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">My Vue App</h2>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>createApp()</code> تنشئ تطبيق Vue.
      </p>

      <p>
        <code>data()</code> تحتوي على البيانات المستخدمة داخل التطبيق.
      </p>

      <p>
        <code>mount("#app")</code> تجعل Vue تتحكم في العنصر
        الذي يحمل <code>id="app"</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "غيّر العنوان الذي يظهر داخل تطبيق Vue.",
      },
      starterCode: `
<div id="app">
  <h1>{{ title }}</h1>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      title: "My Vue App"
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما الوظيفة الأساسية لـ createApp()؟",
        },
        options: [
          {
            ar: "إنشاء تطبيق Vue",
          },
          {
            ar: "إنشاء قاعدة بيانات",
          },
          {
            ar: "تغيير نظام التشغيل",
          },
          {
            ar: "إنشاء ملف CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الطريقة التي تربط تطبيق Vue بعنصر HTML؟",
        },
        options: [
          {
            ar: "mount()",
          },
          {
            ar: "attach()",
          },
          {
            ar: "connect()",
          },
          {
            ar: "link()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي تحدده mount() عادةً؟",
        },
        options: [
          {
            ar: "العنصر الذي سيعمل بداخله تطبيق Vue",
          },
          {
            ar: "لون الصفحة",
          },
          {
            ar: "اسم قاعدة البيانات",
          },
          {
            ar: "نوع المتصفح",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-03",
    title: {
      ar: "Template Syntax",
    },
    description: {
      ar: "تعلّم كيف تعرض البيانات داخل Template باستخدام Syntax الخاص بـ Vue.",
    },
    body: {
      ar: `
      <h2>Template Syntax</h2>

      <p>
        تستخدم Vue طريقة بسيطة لعرض البيانات داخل HTML باستخدام
        الأقواس المزدوجة <code>{{ }}</code>.
      </p>

      <p>
        تسمى هذه الطريقة Interpolation، وتسمح لك بعرض قيم البيانات
        مباشرة داخل الـ Template.
      </p>
    `,
    },
    key: {
      title: {
        ar: "استخدم {{ }} لعرض البيانات",
      },
      text: {
        ar: "Interpolation تسمح لك بعرض قيم JavaScript داخل Template الخاص بـ Vue.",
      },
    },
    example: {
      code: `
<div id="app">
  <h1>{{ name }}</h1>
  <p>{{ message }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: "FAYAD",
      message: "Welcome to Vue!"
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0 0 8px;">FAYAD</h2>
        <p style="margin:0;">Welcome to Vue!</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>{{ name }}</code> تعرض قيمة المتغير <code>name</code>.
      </p>

      <p>
        <code>{{ message }}</code> تعرض قيمة <code>message</code>.
      </p>

      <p>
        Vue تراقب هذه البيانات وتحدث الواجهة عندما تتغير.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "اعرض الاسم والرسالة داخل الصفحة باستخدام Interpolation.",
      },
      starterCode: `
<div id="app">
  <h1>{{ name }}</h1>
  <p>{{ message }}</p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: "FAYAD",
      message: "Welcome to Vue!"
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما استخدام {{ }} في Vue؟",
        },
        options: [
          {
            ar: "عرض البيانات داخل الـ Template",
          },
          {
            ar: "إنشاء ملفات CSS",
          },
          {
            ar: "إنشاء قواعد البيانات",
          },
          {
            ar: "تشغيل نظام التشغيل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تسمى طريقة {{ variable }}؟",
        },
        options: [
          {
            ar: "Interpolation",
          },
          {
            ar: "Inheritance",
          },
          {
            ar: "Compilation",
          },
          {
            ar: "Routing",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يمكن استخدام {{ message }}؟",
        },
        options: [
          {
            ar: "داخل Template لعرض قيمة message",
          },
          {
            ar: "داخل قاعدة البيانات فقط",
          },
          {
            ar: "داخل ملف الصور فقط",
          },
          {
            ar: "داخل نظام التشغيل",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-04",
    title: {
      ar: "البيانات والتفاعلية",
    },
    description: {
      ar: "تعلّم كيف تعمل البيانات التفاعلية في Vue وكيف تؤثر التغييرات على الواجهة.",
    },
    body: {
      ar: `
      <h2>البيانات والتفاعلية</h2>

      <p>
        البيانات في Vue ليست مجرد قيم ثابتة؛ Vue تستطيع مراقبتها
        وتحديث الواجهة عندما تتغير.
      </p>

      <p>
        هذه الفكرة تسمى Reactivity وهي من أهم أفكار Vue.
      </p>
    `,
    },
    key: {
      title: {
        ar: "البيانات تقود الواجهة",
      },
      text: {
        ar: "عندما تتغير البيانات التفاعلية، تقوم Vue بتحديث الواجهة المرتبطة بها.",
      },
    },
    example: {
      code: `
<div id="app">
  <h2>Count: {{ count }}</h2>

  <button @click="count++">
    Increase
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 0
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2>Count: 0</h2>
        <button style="padding:8px 14px;">Increase</button>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>count</code> موجود داخل <code>data()</code>.
      </p>

      <p>
        عند تنفيذ <code>count++</code> تتغير قيمة البيانات.
      </p>

      <p>
        Vue تلاحظ التغيير وتحدث <code>{{ count }}</code> تلقائيًا.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ عدادًا تفاعليًا يتغير عندما تضغط على الزر.",
      },
      starterCode: `
<div id="app">
  <h2>Count: {{ count }}</h2>

  <button @click="count++">
    Increase
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 0
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ماذا تعني Reactivity في Vue؟",
        },
        options: [
          {
            ar: "تحديث الواجهة عند تغير البيانات",
          },
          {
            ar: "إنشاء ملفات JavaScript",
          },
          {
            ar: "تغيير نظام التشغيل",
          },
          {
            ar: "ضغط الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يتم تعريف البيانات في Options API؟",
        },
        options: [
          {
            ar: "data()",
          },
          {
            ar: "style()",
          },
          {
            ar: "html()",
          },
          {
            ar: "database()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدث عندما تتغير قيمة reactive؟",
        },
        options: [
          {
            ar: "يمكن أن تتحدث الواجهة المرتبطة بها تلقائيًا",
          },
          {
            ar: "يتوقف التطبيق دائمًا",
          },
          {
            ar: "يُحذف HTML",
          },
          {
            ar: "يتم إغلاق المتصفح",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-05",
    title: {
      ar: "Methods",
    },
    description: {
      ar: "تعلّم كيف تستخدم Methods لتنفيذ العمليات والتعامل مع تفاعل المستخدم.",
    },
    body: {
      ar: `
      <h2>Methods</h2>

      <p>
        Methods هي دوال نستخدمها لتنفيذ عمليات داخل تطبيق Vue.
      </p>

      <p>
        يمكن استدعاء Method من Template عند حدوث Event مثل الضغط
        على زر.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Methods تنفذ العمليات",
      },
      text: {
        ar: "يمكنك وضع الدوال داخل methods ثم استدعاؤها من Template.",
      },
    },
    example: {
      code: `
<div id="app">
  <button @click="sayHello">
    اضغط هنا
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  methods: {
    sayHello() {
      alert("Hello Vue!");
    }
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;">
        <button style="padding:9px 16px;">اضغط هنا</button>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        نضع الدوال داخل <code>methods</code>.
      </p>

      <p>
        <code>@click="sayHello"</code> تستدعي الدالة عند الضغط.
      </p>

      <p>
        يمكن للـ Method قراءة البيانات وتعديلها وتنفيذ عمليات مختلفة.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ زرًا يستدعي Method عند الضغط عليه.",
      },
      starterCode: `
<div id="app">
  <button @click="sayHello">
    اضغط هنا
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  methods: {
    sayHello() {
      alert("Hello Vue!");
    }
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "أين نضع Methods في Options API؟",
        },
        options: [
          {
            ar: "methods",
          },
          {
            ar: "functions",
          },
          {
            ar: "actions",
          },
          {
            ar: "events",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كيف نستدعي Method عند الضغط؟",
        },
        options: [
          {
            ar: "@click",
          },
          {
            ar: "@hover",
          },
          {
            ar: "@press-only",
          },
          {
            ar: "@mouse",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما وظيفة Method؟",
        },
        options: [
          {
            ar: "تنفيذ عملية أو منطق معين",
          },
          {
            ar: "إنشاء قاعدة بيانات تلقائيًا",
          },
          {
            ar: "تغيير نظام التشغيل",
          },
          {
            ar: "حذف HTML",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-06",
    title: {
      ar: "Computed Properties",
    },
    description: {
      ar: "تعلّم كيف تنشئ قيمًا مشتقة من البيانات باستخدام Computed Properties.",
    },
    body: {
      ar: `
      <h2>Computed Properties</h2>

      <p>
        Computed Property هي قيمة يتم حسابها اعتمادًا على بيانات أخرى.
      </p>

      <p>
        وهي مفيدة عندما نحتاج إلى إنشاء نتيجة مشتقة من البيانات
        الموجودة لدينا.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Computed للقيم المشتقة",
      },
      text: {
        ar: "استخدم Computed عندما تحتاج إلى حساب قيمة اعتمادًا على بيانات أخرى.",
      },
    },
    example: {
      code: `
<div id="app">
  <h2>{{ fullName }}</h2>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      firstName: "Abdullhamid",
      lastName: "Fayad"
    };
  },

  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    }
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">Abdullhamid Fayad</h2>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>computed</code> تحتوي على القيم المشتقة.
      </p>

      <p>
        <code>fullName()</code> تعتمد على <code>firstName</code>
        و<code>lastName</code>.
      </p>

      <p>
        عندما تتغير البيانات التي تعتمد عليها Computed، تقوم Vue
        بإعادة حسابها عند الحاجة.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Computed Property تجمع الاسم الأول واسم العائلة.",
      },
      starterCode: `
<div id="app">
  <h2>{{ fullName }}</h2>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      firstName: "Abdullhamid",
      lastName: "Fayad"
    };
  },

  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    }
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما استخدام Computed Properties؟",
        },
        options: [
          {
            ar: "إنشاء قيم مشتقة من البيانات",
          },
          {
            ar: "إنشاء ملفات CSS",
          },
          {
            ar: "إنشاء صور",
          },
          {
            ar: "إدارة نظام التشغيل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "على ماذا تعتمد Computed عادةً؟",
        },
        options: [
          {
            ar: "على بيانات Reactive أخرى",
          },
          {
            ar: "على الصور فقط",
          },
          {
            ar: "على HTML comments",
          },
          {
            ar: "على نظام التشغيل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين نضع Computed في Options API؟",
        },
        options: [
          {
            ar: "computed",
          },
          {
            ar: "derived",
          },
          {
            ar: "calculations",
          },
          {
            ar: "values",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-07",
    title: {
      ar: "v-bind",
    },
    description: {
      ar: "تعلّم كيف تربط خصائص HTML بالبيانات باستخدام v-bind.",
    },
    body: {
      ar: `
      <h2>v-bind</h2>

      <p>
        Directive <code>v-bind</code> تستخدم لربط Attribute في HTML
        بقيمة موجودة في بيانات Vue.
      </p>

      <p>
        يمكن استخدام الاختصار <code>:</code> بدلًا من كتابة
        <code>v-bind:</code>.
      </p>
    `,
    },
    key: {
      title: {
        ar: "استخدم : لربط Attributes",
      },
      text: {
        ar: "يمكنك ربط src وhref وclass وstyle وغيرها من Attributes ببيانات Vue.",
      },
    },
    example: {
      code: `
<div id="app">
  <img :src="imageUrl" alt="Vue Logo">
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      imageUrl: "https://vuejs.org/images/logo.png"
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <p>تم ربط مصدر الصورة بالبيانات باستخدام <strong>v-bind</strong>.</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>:src</code> هو اختصار لـ <code>v-bind:src</code>.
      </p>

      <p>
        Vue تأخذ قيمة <code>imageUrl</code> وتضعها داخل Attribute
        الخاص بـ <code>src</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "اربط src الخاص بالصورة بمتغير موجود في Vue.",
      },
      starterCode: `
<div id="app">
  <img :src="imageUrl" alt="Vue Logo">
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      imageUrl: "https://vuejs.org/images/logo.png"
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما الاختصار الخاص بـ v-bind؟",
        },
        options: [
          {
            ar: ":",
          },
          {
            ar: "@",
          },
          {
            ar: "#",
          },
          {
            ar: "$",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يفعل v-bind؟",
        },
        options: [
          {
            ar: "يربط Attribute ببيانات Vue",
          },
          {
            ar: "ينشئ قاعدة بيانات",
          },
          {
            ar: "يضيف JavaScript إلى النظام",
          },
          {
            ar: "يحذف العنصر",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي صيغة صحيحة لربط src؟",
        },
        options: [
          {
            ar: ":src=\"imageUrl\"",
          },
          {
            ar: "@src=\"imageUrl\"",
          },
          {
            ar: "#src=\"imageUrl\"",
          },
          {
            ar: "$src=\"imageUrl\"",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-08",
    title: {
      ar: "v-if و v-else",
    },
    description: {
      ar: "تعلّم كيف تعرض أو تخفي عناصر HTML بناءً على شروط معينة.",
    },
    body: {
      ar: `
      <h2>v-if و v-else</h2>

      <p>
        تستخدم <code>v-if</code> لعرض عنصر عندما يكون الشرط صحيحًا.
      </p>

      <p>
        ويمكن استخدام <code>v-else</code> لعرض عنصر بديل عندما يكون
        الشرط غير صحيح.
      </p>
    `,
    },
    key: {
      title: {
        ar: "v-if تتحكم في العرض",
      },
      text: {
        ar: "استخدم v-if وv-else لإظهار عناصر مختلفة حسب حالة البيانات.",
      },
    },
    example: {
      code: `
<div id="app">
  <p v-if="isLoggedIn">
    مرحبًا بك مرة أخرى!
  </p>

  <p v-else>
    من فضلك قم بتسجيل الدخول.
  </p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: true
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <p>مرحبًا بك مرة أخرى!</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>v-if</code> تختبر الشرط.
      </p>

      <p>
        إذا كانت القيمة <code>true</code> يظهر العنصر.
      </p>

      <p>
        <code>v-else</code> يستخدم للفرع الآخر عندما يكون الشرط
        غير صحيح.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "اعرض رسالة مختلفة عندما تكون قيمة isLoggedIn صحيحة أو خاطئة.",
      },
      starterCode: `
<div id="app">
  <p v-if="isLoggedIn">
    مرحبًا بك مرة أخرى!
  </p>

  <p v-else>
    من فضلك قم بتسجيل الدخول.
  </p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      isLoggedIn: true
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما Directive المستخدمة في Conditional Rendering؟",
        },
        options: [
          {
            ar: "v-if",
          },
          {
            ar: "v-condition",
          },
          {
            ar: "v-show-text",
          },
          {
            ar: "v-check",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "متى يعمل v-else؟",
        },
        options: [
          {
            ar: "عندما يكون شرط v-if غير صحيح",
          },
          {
            ar: "دائمًا",
          },
          {
            ar: "عندما يتغير CSS",
          },
          {
            ar: "عند تحميل الصورة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يتحكم v-if؟",
        },
        options: [
          {
            ar: "عرض العنصر بناءً على شرط",
          },
          {
            ar: "لون النص فقط",
          },
          {
            ar: "حجم قاعدة البيانات",
          },
          {
            ar: "عنوان الصفحة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-09",
    title: {
      ar: "v-for",
    },
    description: {
      ar: "تعلّم كيف تعرض عناصر متعددة من Array باستخدام v-for.",
    },
    body: {
      ar: `
      <h2>v-for</h2>

      <p>
        تستخدم <code>v-for</code> لتكرار عنصر HTML لكل عنصر موجود
        داخل Array أو Collection.
      </p>

      <p>
        وهي من أكثر Directives استخدامًا عند إنشاء القوائم.
      </p>
    `,
    },
    key: {
      title: {
        ar: "v-for تعرض القوائم",
      },
      text: {
        ar: "يمكنك استخدام v-for لتكرار عنصر HTML اعتمادًا على عناصر Array.",
      },
    },
    example: {
      code: `
<div id="app">
  <ul>
    <li v-for="item in items">
      {{ item }}
    </li>
  </ul>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      items: ["HTML", "CSS", "JavaScript"]
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <ul style="margin:0;padding-right:20px;">
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>v-for="item in items"</code> تمر على جميع عناصر
        <code>items</code>.
      </p>

      <p>
        في كل مرة يتم إنشاء نسخة من العنصر الموجود داخل الـ Template.
      </p>

      <p>
        عند استخدام Arrays مع v-for من الأفضل استخدام <code>key</code>
        عندما يكون ذلك مناسبًا.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "استخدم v-for لعرض جميع عناصر Array داخل قائمة.",
      },
      starterCode: `
<div id="app">
  <ul>
    <li v-for="item in items">
      {{ item }}
    </li>
  </ul>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      items: ["HTML", "CSS", "JavaScript"]
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما Directive المستخدمة لإنشاء Lists؟",
        },
        options: [
          {
            ar: "v-for",
          },
          {
            ar: "v-list",
          },
          {
            ar: "v-repeat",
          },
          {
            ar: "v-loop-html",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يفعل v-for؟",
        },
        options: [
          {
            ar: "يكرر عنصرًا اعتمادًا على بيانات",
          },
          {
            ar: "يغير لون الصفحة",
          },
          {
            ar: "ينشئ قاعدة بيانات",
          },
          {
            ar: "يشغل CSS فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "إذا كان لدينا items Array، كيف نمر على عناصرها؟",
        },
        options: [
          {
            ar: "v-for=\"item in items\"",
          },
          {
            ar: "v-loop=\"items\"",
          },
          {
            ar: "v-array=\"items\"",
          },
          {
            ar: "v-each=\"items\"",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-10",
    title: {
      ar: "v-on والأحداث",
    },
    description: {
      ar: "تعلّم كيف تتعامل Vue مع أحداث المستخدم مثل click باستخدام v-on.",
    },
    body: {
      ar: `
      <h2>v-on والأحداث</h2>

      <p>
        تستخدم <code>v-on</code> للاستماع إلى Events التي تحدث
        على عناصر الصفحة.
      </p>

      <p>
        الاختصار الشائع لـ <code>v-on:click</code> هو
        <code>@click</code>.
      </p>
    `,
    },
    key: {
      title: {
        ar: "@click يتعامل مع الضغط",
      },
      text: {
        ar: "يمكنك استخدام @click لتشغيل منطق معين عند ضغط المستخدم على عنصر.",
      },
    },
    example: {
      code: `
<div id="app">
  <p>تم الضغط {{ count }} مرة</p>

  <button @click="count++">
    اضغط
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 0
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <p>تم الضغط 0 مرة</p>
        <button style="padding:8px 14px;">اضغط</button>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>v-on</code> تستخدم للاستماع إلى Events.
      </p>

      <p>
        <code>@click</code> هو الاختصار لـ <code>v-on:click</code>.
      </p>

      <p>
        عند الضغط على الزر يتم تنفيذ الكود الموجود بعد <code>@click</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ زرًا يزيد قيمة العداد عند الضغط عليه.",
      },
      starterCode: `
<div id="app">
  <p>تم الضغط {{ count }} مرة</p>

  <button @click="count++">
    اضغط
  </button>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      count: 0
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما الاختصار لـ v-on:click؟",
        },
        options: [
          {
            ar: "@click",
          },
          {
            ar: ":click",
          },
          {
            ar: "#click",
          },
          {
            ar: "$click",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما وظيفة v-on؟",
        },
        options: [
          {
            ar: "الاستماع إلى Events",
          },
          {
            ar: "إنشاء قاعدة بيانات",
          },
          {
            ar: "ربط الصور فقط",
          },
          {
            ar: "تغيير HTML بالكامل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Event يحدث عند ضغط المستخدم على زر؟",
        },
        options: [
          {
            ar: "click",
          },
          {
            ar: "hover-only",
          },
          {
            ar: "load-css",
          },
          {
            ar: "database",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-11",
    title: {
      ar: "v-model",
    },
    description: {
      ar: "تعلّم كيف تنشئ Two-Way Binding بين عناصر الإدخال وبيانات Vue.",
    },
    body: {
      ar: `
      <h2>v-model</h2>

      <p>
        <code>v-model</code> تستخدم لعمل Two-Way Data Binding
        بين Input والبيانات.
      </p>

      <p>
        عندما يكتب المستخدم داخل Input تتغير البيانات، وعندما تتغير
        البيانات يمكن أن ينعكس ذلك على Input.
      </p>
    `,
    },
    key: {
      title: {
        ar: "v-model للربط ثنائي الاتجاه",
      },
      text: {
        ar: "v-model تربط قيمة Input بالبيانات بحيث يتحرك التحديث في الاتجاهين.",
      },
    },
    example: {
      code: `
<div id="app">
  <input v-model="name" placeholder="اكتب اسمك">

  <h2>مرحبًا {{ name }}</h2>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: ""
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <input placeholder="اكتب اسمك"
          style="padding:8px 10px;border:1px solid #ccc;border-radius:6px;">
        <h2>مرحبًا</h2>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>v-model</code> تختصر عملية ربط قيمة Input بالبيانات.
      </p>

      <p>
        عندما يكتب المستخدم قيمة جديدة تتحدث <code>name</code>.
      </p>

      <p>
        ثم تعرض Vue القيمة الجديدة داخل <code>{{ name }}</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "اربط Input بمتغير name باستخدام v-model واعرض القيمة أسفل Input.",
      },
      starterCode: `
<div id="app">
  <input v-model="name" placeholder="اكتب اسمك">

  <h2>مرحبًا {{ name }}</h2>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: ""
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما Directive المستخدمة عادةً مع Form Inputs؟",
        },
        options: [
          {
            ar: "v-model",
          },
          {
            ar: "v-input",
          },
          {
            ar: "v-form",
          },
          {
            ar: "v-value-only",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا توفر v-model؟",
        },
        options: [
          {
            ar: "Two-Way Binding",
          },
          {
            ar: "Database Binding",
          },
          {
            ar: "CSS Binding فقط",
          },
          {
            ar: "Image Binding فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدث عند الكتابة في Input مرتبط بـ v-model؟",
        },
        options: [
          {
            ar: "تتغير قيمة البيانات المرتبطة",
          },
          {
            ar: "يتم حذف Input",
          },
          {
            ar: "يتوقف Vue",
          },
          {
            ar: "يتم إغلاق الصفحة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-12",
    title: {
      ar: "ربط Class و Style",
    },
    description: {
      ar: "تعلّم كيف تتحكم في CSS Classes وStyles بشكل ديناميكي في Vue.",
    },
    body: {
      ar: `
      <h2>ربط Class و Style</h2>

      <p>
        تسمح Vue بربط CSS Classes وInline Styles بالبيانات.
      </p>

      <p>
        هذا مفيد عندما تريد تغيير شكل العنصر بناءً على حالة معينة.
      </p>
    `,
    },
    key: {
      title: {
        ar: "تحكم في الشكل باستخدام البيانات",
      },
      text: {
        ar: "يمكنك تغيير Class أو Style بشكل ديناميكي بناءً على البيانات.",
      },
    },
    example: {
      code: `
<div id="app">
  <p :class="{ active: isActive }">
    حالة العنصر
  </p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      isActive: true
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <p style="margin:0;font-weight:bold;">حالة العنصر — Active</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>:class</code> تستخدم لربط CSS Class بالبيانات.
      </p>

      <p>
        في المثال، Class باسم <code>active</code> تظهر عندما تكون
        <code>isActive</code> تساوي <code>true</code>.
      </p>

      <p>
        يمكن أيضًا استخدام <code>:style</code> لربط Inline Styles.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "اربط Class باسم active بحيث تتم إضافته عندما تكون isActive صحيحة.",
      },
      starterCode: `
<div id="app">
  <p :class="{ active: isActive }">
    حالة العنصر
  </p>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      isActive: true
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "كيف نربط CSS Class بشكل ديناميكي؟",
        },
        options: [
          {
            ar: ":class",
          },
          {
            ar: "@class",
          },
          {
            ar: "#class",
          },
          {
            ar: "v-css-only",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "متى تظهر active في المثال؟",
        },
        options: [
          {
            ar: "عندما تكون isActive صحيحة",
          },
          {
            ar: "دائمًا",
          },
          {
            ar: "عندما تكون CSS محذوفة",
          },
          {
            ar: "عندما يتغير عنوان الصفحة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Directive تستخدم لربط Inline Style؟",
        },
        options: [
          {
            ar: ":style",
          },
          {
            ar: "@style",
          },
          {
            ar: "#style",
          },
          {
            ar: "v-css",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-13",
    title: {
      ar: "المكونات Components",
    },
    description: {
      ar: "تعلّم مفهوم Components وكيف تساعدك على بناء واجهات قابلة لإعادة الاستخدام.",
    },
    body: {
      ar: `
      <h2>Components</h2>

      <p>
        Component هو جزء مستقل وقابل لإعادة الاستخدام من واجهة المستخدم.
      </p>

      <p>
        تقسيم التطبيق إلى Components يجعل الكود أكثر تنظيمًا
        وأسهل في الصيانة.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Components تجعل الواجهة قابلة لإعادة الاستخدام",
      },
      text: {
        ar: "قسّم الواجهة إلى أجزاء صغيرة مستقلة يمكن إعادة استخدامها في أكثر من مكان.",
      },
    },
    example: {
      code: `
<div id="app">
  <user-card></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  template: \`
    <div>
      <h2>FAYAD</h2>
      <p>Vue Developer</p>
    </div>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0 0 6px;">FAYAD</h2>
        <p style="margin:0;">Vue Developer</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>UserCard</code> هو Component قابل لإعادة الاستخدام.
      </p>

      <p>
        قمنا بتسجيله داخل <code>components</code>.
      </p>

      <p>
        بعد ذلك يمكن استخدامه داخل Template باستخدام
        <code>&lt;user-card&gt;</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Component بسيطًا يعرض اسمًا ووصفًا ويمكن إعادة استخدامه.",
      },
      starterCode: `
<div id="app">
  <user-card></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  template: \`
    <div>
      <h2>FAYAD</h2>
      <p>Vue Developer</p>
    </div>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "لماذا نستخدم Components؟",
        },
        options: [
          {
            ar: "لإنشاء أجزاء قابلة لإعادة الاستخدام",
          },
          {
            ar: "لاستبدال JavaScript",
          },
          {
            ar: "لإنشاء نظام تشغيل",
          },
          {
            ar: "لحذف HTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما فائدة تقسيم التطبيق إلى Components؟",
        },
        options: [
          {
            ar: "تنظيم الكود وإعادة استخدام الأجزاء",
          },
          {
            ar: "إلغاء CSS",
          },
          {
            ar: "منع JavaScript",
          },
          {
            ar: "حذف البيانات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن استخدام Component أكثر من مرة؟",
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
            ar: "فقط داخل Database",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-14",
    title: {
      ar: "Props",
    },
    description: {
      ar: "تعلّم كيف تمرر البيانات من Parent Component إلى Child Component باستخدام Props.",
    },
    body: {
      ar: `
      <h2>Props</h2>

      <p>
        Props هي الطريقة الأساسية لتمرير البيانات من Parent Component
        إلى Child Component.
      </p>

      <p>
        تساعد Props على جعل Components أكثر مرونة وقابلية لإعادة الاستخدام.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Props تمرر البيانات إلى المكونات الأبناء",
      },
      text: {
        ar: "يمكن للـ Parent إرسال بيانات إلى Child من خلال Props.",
      },
    },
    example: {
      code: `
<div id="app">
  <user-card name="FAYAD"></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  props: ["name"],

  template: \`
    <h2>Hello {{ name }}</h2>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">Hello FAYAD</h2>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>props: ["name"]</code> تحدد أن Component يستقبل
        Prop باسم <code>name</code>.
      </p>

      <p>
        Parent يمرر القيمة باستخدام
        <code>&lt;user-card name="FAYAD"&gt;</code>.
      </p>

      <p>
        داخل Child يمكن استخدام <code>{{ name }}</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "مرر اسمًا من Parent إلى UserCard باستخدام Props.",
      },
      starterCode: `
<div id="app">
  <user-card name="FAYAD"></user-card>
</div>

<script>
const { createApp } = Vue;

const UserCard = {
  props: ["name"],

  template: \`
    <h2>Hello {{ name }}</h2>
  \`
};

createApp({
  components: {
    UserCard
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الأساسي لـ Props؟",
        },
        options: [
          {
            ar: "تمرير البيانات إلى Child Component",
          },
          {
            ar: "إنشاء CSS",
          },
          {
            ar: "إنشاء قاعدة بيانات",
          },
          {
            ar: "تشغيل Browser",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "من أين تأتي Props عادةً؟",
        },
        options: [
          {
            ar: "من Parent Component",
          },
          {
            ar: "من نظام التشغيل",
          },
          {
            ar: "من CSS",
          },
          {
            ar: "من المتصفح فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "هل يمكن للـ Child استخدام قيمة Prop؟",
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
            ar: "فقط في Database",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-15",
    title: {
      ar: "Events و Emits",
    },
    description: {
      ar: "تعلّم كيف يتواصل Child Component مع Parent باستخدام Custom Events و Emits.",
    },
    body: {
      ar: `
      <h2>Events و Emits</h2>

      <p>
        Props تستخدم غالبًا لتمرير البيانات من Parent إلى Child.
      </p>

      <p>
        وعندما يحتاج Child إلى إخبار Parent بحدوث شيء، يمكنه إطلاق
        Custom Event باستخدام <code>emit</code>.
      </p>
    `,
    },
    key: {
      title: {
        ar: "emit ترسل أحداثًا إلى Parent",
      },
      text: {
        ar: "يمكن للـ Child إطلاق Custom Event، ويستطيع Parent الاستماع إليه.",
      },
    },
    example: {
      code: `
<div id="app">
  <button-counter @increase="handleIncrease"></button-counter>

  <p>العدد: {{ count }}</p>
</div>

<script>
const { createApp } = Vue;

const ButtonCounter = {
  emits: ["increase"],

  template: \`
    <button @click="$emit('increase')">
      زيادة
    </button>
  \`
};

createApp({
  components: {
    ButtonCounter
  },

  data() {
    return {
      count: 0
    };
  },

  methods: {
    handleIncrease() {
      this.count++;
    }
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <button style="padding:8px 14px;">زيادة</button>
        <p>العدد: 0</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>emits</code> تحدد Custom Events التي يمكن للـ Component إطلاقها.
      </p>

      <p>
        <code>$emit("increase")</code> تطلق Event باسم
        <code>increase</code>.
      </p>

      <p>
        Parent يستمع إلى الحدث باستخدام
        <code>@increase</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Child Component يرسل Event إلى Parent عند الضغط على زر.",
      },
      starterCode: `
<div id="app">
  <button-counter @increase="handleIncrease"></button-counter>

  <p>العدد: {{ count }}</p>
</div>

<script>
const { createApp } = Vue;

const ButtonCounter = {
  emits: ["increase"],

  template: \`
    <button @click="$emit('increase')">
      زيادة
    </button>
  \`
};

createApp({
  components: {
    ButtonCounter
  },

  data() {
    return {
      count: 0
    };
  },

  methods: {
    handleIncrease() {
      this.count++;
    }
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما وظيفة emit في Vue؟",
        },
        options: [
          {
            ar: "إرسال Custom Event من Child إلى Parent",
          },
          {
            ar: "إنشاء CSS",
          },
          {
            ar: "إنشاء Database",
          },
          {
            ar: "تغيير URL",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين يحدث التواصل العكسي من Child إلى Parent؟",
        },
        options: [
          {
            ar: "باستخدام Events و Emits",
          },
          {
            ar: "باستخدام CSS",
          },
          {
            ar: "باستخدام HTML comments",
          },
          {
            ar: "باستخدام الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كيف يستمع Parent إلى Custom Event اسمه increase؟",
        },
        options: [
          {
            ar: "@increase",
          },
          {
            ar: ":increase",
          },
          {
            ar: "#increase",
          },
          {
            ar: "$increase",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-16",
    title: {
      ar: "Composition API",
    },
    description: {
      ar: "تعرّف على Composition API ولماذا تستخدم لتنظيم Logic داخل مكونات Vue.",
    },
    body: {
      ar: `
      <h2>Composition API</h2>

      <p>
        Composition API توفر مجموعة من Functions تساعدك على تنظيم
        منطق Component بطريقة أكثر مرونة.
      </p>

      <p>
        من أشهر Functions الموجودة فيها <code>ref()</code> و
        <code>reactive()</code> و<code>computed()</code>.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Composition API لتنظيم Logic",
      },
      text: {
        ar: "تسمح لك Composition API بتجميع Logic المرتبط ببعضه في مكان واضح وقابل لإعادة الاستخدام.",
      },
    },
    example: {
      code: `
<div id="app">
  <button @click="increment">
    {{ count }}
  </button>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const count = ref(0);

    function increment() {
      count.value++;
    }

    return {
      count,
      increment
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <button style="padding:9px 16px;">0</button>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>setup()</code> هي المكان الأساسي لكتابة Logic باستخدام
        Composition API.
      </p>

      <p>
        <code>ref(0)</code> تنشئ قيمة Reactive.
      </p>

      <p>
        داخل JavaScript نستخدم <code>count.value</code> للوصول للقيمة.
      </p>

      <p>
        عند إرجاع <code>count</code> و<code>increment</code> يمكن
        استخدامهما داخل Template.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Counter باستخدام Composition API وref().",
      },
      starterCode: `
<div id="app">
  <button @click="increment">
    {{ count }}
  </button>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const count = ref(0);

    function increment() {
      count.value++;
    }

    return {
      count,
      increment
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما الهدف الأساسي من Composition API؟",
        },
        options: [
          {
            ar: "تنظيم Logic الخاص بالمكونات",
          },
          {
            ar: "إنشاء قواعد بيانات",
          },
          {
            ar: "تصميم الصور",
          },
          {
            ar: "استبدال HTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أين نكتب Composition API Logic غالبًا؟",
        },
        options: [
          {
            ar: "داخل setup()",
          },
          {
            ar: "داخل style فقط",
          },
          {
            ar: "داخل HTML comments",
          },
          {
            ar: "داخل database()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Function من التالية مرتبطة بـ Composition API؟",
        },
        options: [
          {
            ar: "ref()",
          },
          {
            ar: "htmlDatabase()",
          },
          {
            ar: "cssEngine()",
          },
          {
            ar: "browserState()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-17",
    title: {
      ar: "ref و reactive",
    },
    description: {
      ar: "تعلّم الفرق الأساسي بين ref و reactive وكيف تستخدمهما مع البيانات التفاعلية.",
    },
    body: {
      ar: `
      <h2>ref و reactive</h2>

      <p>
        <code>ref()</code> تستخدم لإنشاء Reactive Reference ويمكنها
        التعامل مع قيم بسيطة مثل Number وString.
      </p>

      <p>
        <code>reactive()</code> تستخدم لإنشاء Reactive Object.
      </p>
    `,
    },
    key: {
      title: {
        ar: "ref للقيم و reactive للكائنات",
      },
      text: {
        ar: "استخدم ref للقيم التفاعلية وreactive عندما تحتاج إلى Reactive Object.",
      },
    },
    example: {
      code: `
<div id="app">
  <h2>{{ count }}</h2>
  <p>{{ user.name }}</p>

  <button @click="increment">
    زيادة
  </button>
</div>

<script>
const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const count = ref(0);

    const user = reactive({
      name: "FAYAD"
    });

    function increment() {
      count.value++;
    }

    return {
      count,
      user,
      increment
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0 0 6px;">0</h2>
        <p>FAYAD</p>
        <button style="padding:8px 14px;">زيادة</button>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>ref()</code> تنشئ Reactive Reference.
      </p>

      <p>
        في JavaScript نصل إلى القيمة باستخدام
        <code>.value</code>.
      </p>

      <p>
        <code>reactive()</code> تجعل Object نفسه Reactive.
      </p>

      <p>
        داخل Template تقوم Vue بعمل Unwrap تلقائي لـ ref.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ count باستخدام ref وuser باستخدام reactive.",
      },
      starterCode: `
<div id="app">
  <h2>{{ count }}</h2>
  <p>{{ user.name }}</p>

  <button @click="increment">
    زيادة
  </button>
</div>

<script>
const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const count = ref(0);

    const user = reactive({
      name: "FAYAD"
    });

    function increment() {
      count.value++;
    }

    return {
      count,
      user,
      increment
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما Function المستخدمة لإنشاء Reactive Reference؟",
        },
        options: [
          {
            ar: "ref()",
          },
          {
            ar: "stateRef()",
          },
          {
            ar: "reactiveValue()",
          },
          {
            ar: "reference()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما Function المناسبة لإنشاء Reactive Object؟",
        },
        options: [
          {
            ar: "reactive()",
          },
          {
            ar: "objectState()",
          },
          {
            ar: "makeObject()",
          },
          {
            ar: "watchObject()",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "كيف نصل إلى قيمة ref داخل JavaScript؟",
        },
        options: [
          {
            ar: "باستخدام .value",
          },
          {
            ar: "باستخدام .data",
          },
          {
            ar: "باستخدام .state",
          },
          {
            ar: "باستخدام .refValue فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-18",
    title: {
      ar: "watch",
    },
    description: {
      ar: "تعلّم كيف تراقب تغير البيانات التفاعلية باستخدام watch.",
    },
    body: {
      ar: `
      <h2>watch</h2>

      <p>
        تستخدم <code>watch()</code> لمراقبة تغير قيمة Reactive معينة.
      </p>

      <p>
        وهي مفيدة عندما يؤدي تغير قيمة معينة إلى تنفيذ Side Effect
        أو عملية إضافية.
      </p>
    `,
    },
    key: {
      title: {
        ar: "راقب تغير البيانات",
      },
      text: {
        ar: "استخدم watch عندما تحتاج إلى تنفيذ Logic إضافي عند تغير قيمة Reactive.",
      },
    },
    example: {
      code: `
<div id="app">
  <input v-model="search">

  <p>البحث: {{ search }}</p>
</div>

<script>
const { createApp, ref, watch } = Vue;

createApp({
  setup() {
    const search = ref("");

    watch(search, (newValue) => {
      console.log("Search:", newValue);
    });

    return {
      search
    };
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <input placeholder="ابحث هنا"
          style="padding:8px 10px;border:1px solid #ccc;border-radius:6px;">
        <p>البحث:</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>watch()</code> تراقب مصدرًا Reactive.
      </p>

      <p>
        عندما تتغير القيمة يتم تشغيل Callback.
      </p>

      <p>
        <code>newValue</code> تحتوي على القيمة الجديدة بعد التغيير.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Watcher يراقب قيمة search ويطبع القيمة الجديدة.",
      },
      starterCode: `
<div id="app">
  <input v-model="search">

  <p>البحث: {{ search }}</p>
</div>

<script>
const { createApp, ref, watch } = Vue;

createApp({
  setup() {
    const search = ref("");

    watch(search, (newValue) => {
      console.log("Search:", newValue);
    });

    return {
      search
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ماذا تراقب watch؟",
        },
        options: [
          {
            ar: "تغيرات Reactive Data",
          },
          {
            ar: "تغيرات CSS فقط",
          },
          {
            ar: "HTML comments",
          },
          {
            ar: "صور الصفحة فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "متى يعمل Callback الخاص بـ watch؟",
        },
        options: [
          {
            ar: "عندما تتغير القيمة التي تتم مراقبتها",
          },
          {
            ar: "مرة واحدة فقط دائمًا",
          },
          {
            ar: "عند تغيير لون الصفحة",
          },
          {
            ar: "عند إغلاق المتصفح",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما فائدة watch الأساسية؟",
        },
        options: [
          {
            ar: "تنفيذ Logic إضافي عند تغير البيانات",
          },
          {
            ar: "إنشاء Components",
          },
          {
            ar: "إنشاء CSS",
          },
          {
            ar: "إنشاء Routes فقط",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-19",
    title: {
      ar: "Lifecycle Hooks",
    },
    description: {
      ar: "تعلّم فكرة Lifecycle Hooks وكيف تنفذ كودًا في مراحل معينة من حياة Component.",
    },
    body: {
      ar: `
      <h2>Lifecycle Hooks</h2>

      <p>
        تمر Components في Vue بمراحل مختلفة أثناء حياتها.
      </p>

      <p>
        Lifecycle Hooks تسمح لك بتنفيذ Logic في مراحل محددة،
        مثل لحظة Mounting الخاصة بالمكون.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Hooks تعمل في مراحل محددة",
      },
      text: {
        ar: "يمكنك تنفيذ Logic عند حدوث مراحل مهمة في دورة حياة Component.",
      },
    },
    example: {
      code: `
<div id="app">
  <h2>مرحبًا Vue</h2>
</div>

<script>
const { createApp, onMounted } = Vue;

createApp({
  setup() {
    onMounted(() => {
      console.log("Component mounted!");
    });
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">مرحبًا Vue</h2>
        <p style="margin-bottom:0;">تم تشغيل onMounted بعد تركيب Component.</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>onMounted()</code> هو Lifecycle Hook من Composition API.
      </p>

      <p>
        يتم تشغيل Callback بعد أن يتم Mount للـ Component في DOM.
      </p>

      <p>
        توجد Hooks أخرى مثل <code>onUpdated()</code> و
        <code>onUnmounted()</code>.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "استخدم onMounted لتنفيذ كود بعد تركيب Component.",
      },
      starterCode: `
<div id="app">
  <h2>مرحبًا Vue</h2>
</div>

<script>
const { createApp, onMounted } = Vue;

createApp({
  setup() {
    onMounted(() => {
      console.log("Component mounted!");
    });
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "متى يعمل onMounted()؟",
        },
        options: [
          {
            ar: "بعد Mount الـ Component",
          },
          {
            ar: "قبل تحميل JavaScript",
          },
          {
            ar: "عند تغيير CSS فقط",
          },
          {
            ar: "عند حذف HTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما وظيفة Lifecycle Hooks؟",
        },
        options: [
          {
            ar: "تنفيذ Logic في مراحل معينة من حياة Component",
          },
          {
            ar: "إنشاء قواعد بيانات",
          },
          {
            ar: "تغيير نظام التشغيل",
          },
          {
            ar: "إنشاء الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "أي Hook تستخدم لتنفيذ Logic بعد Mount؟",
        },
        options: [
          {
            ar: "onMounted()",
          },
          {
            ar: "onStarted()",
          },
          {
            ar: "onLoadedCSS()",
          },
          {
            ar: "afterVue()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-20",
    title: {
      ar: "النماذج والتحقق",
    },
    description: {
      ar: "تعلّم كيفية التعامل مع Forms وإضافة Validation بسيطة باستخدام Vue.",
    },
    body: {
      ar: `
      <h2>النماذج والتحقق</h2>

      <p>
        يمكن استخدام <code>v-model</code> لربط قيم Form بالبيانات.
      </p>

      <p>
        ويمكنك استخدام Methods للتحقق من البيانات قبل تنفيذ عملية
        الإرسال.
      </p>
    `,
    },
    key: {
      title: {
        ar: "تحقق من البيانات قبل الإرسال",
      },
      text: {
        ar: "اربط حقول Form بالبيانات ثم تحقق من القيم قبل إرسالها أو تنفيذ العملية.",
      },
    },
    example: {
      code: `
<div id="app">
  <form @submit.prevent="submitForm">
    <input v-model="name" placeholder="الاسم">

    <button type="submit">
      إرسال
    </button>

    <p v-if="error">
      {{ error }}
    </p>
  </form>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: "",
      error: ""
    };
  },

  methods: {
    submitForm() {
      if (!this.name.trim()) {
        this.error = "من فضلك اكتب اسمك";
        return;
      }

      this.error = "";
      alert("تم الإرسال");
    }
  }
}).mount("#app");
</script>
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <input placeholder="الاسم"
          style="padding:8px 10px;border:1px solid #ccc;border-radius:6px;">
        <button style="padding:8px 14px;margin-right:6px;">إرسال</button>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        <code>v-model</code> تربط Input بالبيانات.
      </p>

      <p>
        <code>@submit.prevent</code> تمنع إرسال Form بالطريقة الافتراضية.
      </p>

      <p>
        داخل <code>submitForm()</code> نتحقق من البيانات قبل تنفيذ العملية.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "أنشئ Form يتحقق من أن الاسم ليس فارغًا قبل الإرسال.",
      },
      starterCode: `
<div id="app">
  <form @submit.prevent="submitForm">
    <input v-model="name" placeholder="الاسم">

    <button type="submit">
      إرسال
    </button>

    <p v-if="error">
      {{ error }}
    </p>
  </form>
</div>

<script>
const { createApp } = Vue;

createApp({
  data() {
    return {
      name: "",
      error: ""
    };
  },

  methods: {
    submitForm() {
      if (!this.name.trim()) {
        this.error = "من فضلك اكتب اسمك";
        return;
      }

      this.error = "";
      alert("تم الإرسال");
    }
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما فائدة Validation في Forms؟",
        },
        options: [
          {
            ar: "التأكد من صحة البيانات قبل استخدامها",
          },
          {
            ar: "إنشاء CSS",
          },
          {
            ar: "إنشاء Components",
          },
          {
            ar: "تغيير لون المتصفح",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما الذي يمكن استخدامه لربط Input بالبيانات؟",
        },
        options: [
          {
            ar: "v-model",
          },
          {
            ar: "v-route",
          },
          {
            ar: "v-check-only",
          },
          {
            ar: "v-input-data",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا تفعل .prevent مع submit؟",
        },
        options: [
          {
            ar: "تمنع السلوك الافتراضي للمتصفح",
          },
          {
            ar: "تحذف Form",
          },
          {
            ar: "تنشئ Component",
          },
          {
            ar: "تغلق الصفحة",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-21",
    title: {
      ar: "Vue Router",
    },
    description: {
      ar: "تعلّم دور Vue Router في إنشاء Navigation بين Views المختلفة.",
    },
    body: {
      ar: `
      <h2>Vue Router</h2>

      <p>
        Vue Router هو الحل الرسمي للتعامل مع Navigation داخل تطبيقات Vue.
      </p>

      <p>
        يسمح لك بربط URLs مختلفة بمكونات مختلفة مع الحفاظ على طبيعة
        Single Page Application.
      </p>
    `,
    },
    key: {
      title: {
        ar: "Router يتحكم في Navigation",
      },
      text: {
        ar: "Vue Router يربط URLs بالمكونات ويتيح للمستخدم الانتقال بين Views المختلفة.",
      },
    },
    example: {
      code: `
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: About
  }
];
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <p>/ → Home</p>
        <p>/about → About</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        Array باسم <code>routes</code> تحتوي على Routes الخاصة بالتطبيق.
      </p>

      <p>
        <code>path</code> يمثل URL.
      </p>

      <p>
        <code>component</code> يحدد Component الذي سيظهر لهذا المسار.
      </p>

      <p>
        في المشاريع الحقيقية يتم استخدام Vue Router كحزمة منفصلة.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "عرّف Route للصفحة الرئيسية Route آخر لصفحة About.",
      },
      starterCode: `
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: About
  }
];
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما الاستخدام الأساسي لـ Vue Router؟",
        },
        options: [
          {
            ar: "إدارة Navigation بين Views",
          },
          {
            ar: "إدارة قواعد البيانات",
          },
          {
            ar: "تصميم الصور",
          },
          {
            ar: "إنشاء CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يمثل path داخل Route؟",
        },
        options: [
          {
            ar: "URL أو المسار",
          },
          {
            ar: "اسم CSS Class",
          },
          {
            ar: "اسم Database",
          },
          {
            ar: "اسم الصورة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ماذا يحدد component داخل Route؟",
        },
        options: [
          {
            ar: "المكون الذي سيظهر للمسار",
          },
          {
            ar: "لون الصفحة",
          },
          {
            ar: "نوع قاعدة البيانات",
          },
          {
            ar: "نوع المتصفح",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "vue-22",
    title: {
      ar: "إدارة الحالة",
    },
    description: {
      ar: "تعلّم الفكرة الأساسية لإدارة State المشتركة بين أجزاء تطبيق Vue.",
    },
    body: {
      ar: `
      <h2>إدارة الحالة</h2>

      <p>
        State هي البيانات التي تمثل الحالة الحالية للتطبيق.
      </p>

      <p>
        عندما يكبر التطبيق قد تحتاج عدة Components إلى الوصول إلى
        نفس البيانات، وهنا تظهر أهمية إدارة الحالة بشكل منظم.
      </p>

      <p>
        يمكن استخدام حلول مثل Pinia لإدارة الحالة المشتركة في تطبيقات Vue الحديثة.
      </p>
    `,
    },
    key: {
      title: {
        ar: "State مشتركة تحتاج إلى تنظيم",
      },
      text: {
        ar: "عندما تحتاج Components متعددة إلى نفس البيانات، استخدم نظامًا منظمًا لإدارة الحالة.",
      },
    },
    example: {
      code: `
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0
  }),

  actions: {
    increment() {
      this.count++;
    }
  }
});
    `,
      result: {
        ar: `
      <div style="padding:20px;font-family:Arial;">
        <h3 style="margin:0 0 8px;">Counter Store</h3>
        <p style="margin:0;">إدارة State مشتركة بين Components.</p>
      </div>
    `,
      },
      explanation: {
        ar: `
      <p>
        عندما تكون البيانات خاصة بـ Component واحد يمكن أن تكون داخل
        ذلك Component.
      </p>

      <p>
        لكن عندما تحتاج Components متعددة إلى نفس State، يصبح من الأفضل
        استخدام حل منظم لإدارة الحالة.
      </p>

      <p>
        <strong>Pinia</strong> هو حل شائع وحديث لإدارة State في Vue.
      </p>
    `,
      },
    },
    practice: {
      prompt: {
        ar: "فكر في تطبيق يحتوي على Components متعددة تحتاج إلى نفس قيمة count وكيف ستنظم هذه الحالة.",
      },
      starterCode: `
<div id="app">
  <h2>Count: {{ count }}</h2>

  <button @click="increment">
    زيادة
  </button>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const count = ref(0);

    function increment() {
      count.value++;
    }

    return {
      count,
      increment
    };
  }
}).mount("#app");
</script>
    `,
    },
    quiz: [
      {
        question: {
          ar: "ما المقصود بـ State؟",
        },
        options: [
          {
            ar: "البيانات التي تمثل الحالة الحالية للتطبيق",
          },
          {
            ar: "ملفات CSS فقط",
          },
          {
            ar: "صور الموقع",
          },
          {
            ar: "روابط HTML فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "لماذا نحتاج State Management؟",
        },
        options: [
          {
            ar: "لتنظيم البيانات المشتركة بين Components",
          },
          {
            ar: "لإنشاء الصور",
          },
          {
            ar: "لحذف JavaScript",
          },
          {
            ar: "لتغيير نظام التشغيل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          ar: "ما المكتبة الشائعة لإدارة State في Vue الحديثة؟",
        },
        options: [
          {
            ar: "Pinia",
          },
          {
            ar: "jQuery",
          },
          {
            ar: "Bootstrap",
          },
          {
            ar: "Express فقط",
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
