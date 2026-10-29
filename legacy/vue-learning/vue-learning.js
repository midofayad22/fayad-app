/* =========================================================
   FAYAD — VUE LEARNING ENGINE
   Arabic Complete Working Version
   22 Lessons + 3 Questions Per Lesson
   Randomized Quiz Answers
========================================================= */

const lessons = [
  /* =======================================================
     01 — ما هي Vue.js؟
  ======================================================= */
  {
    id: 1,
    group: "أساسيات Vue",
    title: "ما هي Vue.js؟",
    description: "تعرّف على Vue.js، وفهم الهدف منها، ولماذا تُستخدم في بناء واجهات المستخدم التفاعلية.",

    content: `

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

    keyTitle: "Vue تربط البيانات بالواجهة",
    keyDescription: "عندما تتغير البيانات في التطبيق، تستطيع Vue تحديث الجزء المناسب من الواجهة تلقائيًا.",

    example: `
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

    result: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2 style="margin:0;">Hello Vue!</h2>
      </div>
    `,

    challenge: "أنشئ عنوانًا يعرض رسالة من بيانات Vue باستخدام Interpolation.",

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

    explanation: `
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

    questions: [
      {
        question: "ما الاستخدام الأساسي لـ Vue.js؟",
        options: ["بناء واجهات مستخدم تفاعلية", "إنشاء قواعد البيانات فقط", "تصميم الصور فقط", "إدارة نظام التشغيل"],
        correct: 0,
      },
      {
        question: "Vue.js مبنية أساسًا باستخدام ماذا؟",
        options: ["JavaScript", "SQL", "Python فقط", "C++ فقط"],
        correct: 0,
      },
      {
        question: "ما الفكرة المهمة التي توفرها Vue؟",
        options: ["ربط البيانات بالواجهة", "إلغاء HTML", "استبدال نظام التشغيل", "إنشاء ملفات PDF فقط"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     02 — بنية تطبيق Vue
  ======================================================= */
  {
    id: 2,
    group: "أساسيات Vue",
    title: "بنية تطبيق Vue",
    description: "تعرّف على الطريقة الأساسية لإنشاء تطبيق Vue وربطه بعنصر HTML.",

    content: `

      <p>
        يبدأ تطبيق Vue عادةً باستخدام <code>createApp()</code>.
      </p>

      <p>
        بعد إنشاء التطبيق نستخدم <code>mount()</code> لتحديد عنصر
        HTML الذي سيعمل بداخله التطبيق.
      </p>
    `,

    keyTitle: "createApp تبدأ التطبيق",
    keyDescription: "نستخدم createApp لإنشاء تطبيق Vue ثم mount لربطه بعنصر HTML.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">My Vue App</h2>
      </div>
    `,

    challenge: "غيّر العنوان الذي يظهر داخل تطبيق Vue.",

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

    explanation: `
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

    questions: [
      {
        question: "ما الوظيفة الأساسية لـ createApp()؟",
        options: ["إنشاء تطبيق Vue", "إنشاء قاعدة بيانات", "تغيير نظام التشغيل", "إنشاء ملف CSS"],
        correct: 0,
      },
      {
        question: "ما الطريقة التي تربط تطبيق Vue بعنصر HTML؟",
        options: ["mount()", "attach()", "connect()", "link()"],
        correct: 0,
      },
      {
        question: "ما الذي تحدده mount() عادةً؟",
        options: ["العنصر الذي سيعمل بداخله تطبيق Vue", "لون الصفحة", "اسم قاعدة البيانات", "نوع المتصفح"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     03 — Template Syntax
  ======================================================= */
  {
    id: 3,
    group: "أساسيات Vue",
    title: "Template Syntax",
    description: "تعلّم كيف تعرض البيانات داخل Template باستخدام Syntax الخاص بـ Vue.",

    content: `
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

    keyTitle: "استخدم {{ }} لعرض البيانات",
    keyDescription: "Interpolation تسمح لك بعرض قيم JavaScript داخل Template الخاص بـ Vue.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0 0 8px;">FAYAD</h2>
        <p style="margin:0;">Welcome to Vue!</p>
      </div>
    `,

    challenge: "اعرض الاسم والرسالة داخل الصفحة باستخدام Interpolation.",

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

    explanation: `
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

    questions: [
      {
        question: "ما استخدام {{ }} في Vue؟",
        options: ["عرض البيانات داخل الـ Template", "إنشاء ملفات CSS", "إنشاء قواعد البيانات", "تشغيل نظام التشغيل"],
        correct: 0,
      },
      {
        question: "ماذا تسمى طريقة {{ variable }}؟",
        options: ["Interpolation", "Inheritance", "Compilation", "Routing"],
        correct: 0,
      },
      {
        question: "أين يمكن استخدام {{ message }}؟",
        options: [
          "داخل Template لعرض قيمة message",
          "داخل قاعدة البيانات فقط",
          "داخل ملف الصور فقط",
          "داخل نظام التشغيل",
        ],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     04 — البيانات والتفاعلية
  ======================================================= */
  {
    id: 4,
    group: "أساسيات Vue",
    title: "البيانات والتفاعلية",
    description: "تعلّم كيف تعمل البيانات التفاعلية في Vue وكيف تؤثر التغييرات على الواجهة.",

    content: `
      <h2>البيانات والتفاعلية</h2>

      <p>
        البيانات في Vue ليست مجرد قيم ثابتة؛ Vue تستطيع مراقبتها
        وتحديث الواجهة عندما تتغير.
      </p>

      <p>
        هذه الفكرة تسمى Reactivity وهي من أهم أفكار Vue.
      </p>
    `,

    keyTitle: "البيانات تقود الواجهة",
    keyDescription: "عندما تتغير البيانات التفاعلية، تقوم Vue بتحديث الواجهة المرتبطة بها.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2>Count: 0</h2>
        <button style="padding:8px 14px;">Increase</button>
      </div>
    `,

    challenge: "أنشئ عدادًا تفاعليًا يتغير عندما تضغط على الزر.",

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

    explanation: `
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

    questions: [
      {
        question: "ماذا تعني Reactivity في Vue؟",
        options: ["تحديث الواجهة عند تغير البيانات", "إنشاء ملفات JavaScript", "تغيير نظام التشغيل", "ضغط الصور"],
        correct: 0,
      },
      {
        question: "أين يتم تعريف البيانات في Options API؟",
        options: ["data()", "style()", "html()", "database()"],
        correct: 0,
      },
      {
        question: "ماذا يحدث عندما تتغير قيمة reactive؟",
        options: [
          "يمكن أن تتحدث الواجهة المرتبطة بها تلقائيًا",
          "يتوقف التطبيق دائمًا",
          "يُحذف HTML",
          "يتم إغلاق المتصفح",
        ],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     05 — Methods
  ======================================================= */
  {
    id: 5,
    group: "أساسيات Vue",
    title: "Methods",
    description: "تعلّم كيف تستخدم Methods لتنفيذ العمليات والتعامل مع تفاعل المستخدم.",

    content: `
      <h2>Methods</h2>

      <p>
        Methods هي دوال نستخدمها لتنفيذ عمليات داخل تطبيق Vue.
      </p>

      <p>
        يمكن استدعاء Method من Template عند حدوث Event مثل الضغط
        على زر.
      </p>
    `,

    keyTitle: "Methods تنفذ العمليات",
    keyDescription: "يمكنك وضع الدوال داخل methods ثم استدعاؤها من Template.",

    example: `
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

    result: `
      <div style="padding:20px;">
        <button style="padding:9px 16px;">اضغط هنا</button>
      </div>
    `,

    challenge: "أنشئ زرًا يستدعي Method عند الضغط عليه.",

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

    explanation: `
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

    questions: [
      {
        question: "أين نضع Methods في Options API؟",
        options: ["methods", "functions", "actions", "events"],
        correct: 0,
      },
      {
        question: "كيف نستدعي Method عند الضغط؟",
        options: ["@click", "@hover", "@press-only", "@mouse"],
        correct: 0,
      },
      {
        question: "ما وظيفة Method؟",
        options: ["تنفيذ عملية أو منطق معين", "إنشاء قاعدة بيانات تلقائيًا", "تغيير نظام التشغيل", "حذف HTML"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     06 — Computed Properties
  ======================================================= */
  {
    id: 6,
    group: "أساسيات Vue",
    title: "Computed Properties",
    description: "تعلّم كيف تنشئ قيمًا مشتقة من البيانات باستخدام Computed Properties.",

    content: `
      <h2>Computed Properties</h2>

      <p>
        Computed Property هي قيمة يتم حسابها اعتمادًا على بيانات أخرى.
      </p>

      <p>
        وهي مفيدة عندما نحتاج إلى إنشاء نتيجة مشتقة من البيانات
        الموجودة لدينا.
      </p>
    `,

    keyTitle: "Computed للقيم المشتقة",
    keyDescription: "استخدم Computed عندما تحتاج إلى حساب قيمة اعتمادًا على بيانات أخرى.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">Abdullhamid Fayad</h2>
      </div>
    `,

    challenge: "أنشئ Computed Property تجمع الاسم الأول واسم العائلة.",

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

    explanation: `
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

    questions: [
      {
        question: "ما استخدام Computed Properties؟",
        options: ["إنشاء قيم مشتقة من البيانات", "إنشاء ملفات CSS", "إنشاء صور", "إدارة نظام التشغيل"],
        correct: 0,
      },
      {
        question: "على ماذا تعتمد Computed عادةً؟",
        options: ["على بيانات Reactive أخرى", "على الصور فقط", "على HTML comments", "على نظام التشغيل"],
        correct: 0,
      },
      {
        question: "أين نضع Computed في Options API؟",
        options: ["computed", "derived", "calculations", "values"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     07 — v-bind
  ======================================================= */
  {
    id: 7,
    group: "Directives",
    title: "v-bind",
    description: "تعلّم كيف تربط خصائص HTML بالبيانات باستخدام v-bind.",

    content: `
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

    keyTitle: "استخدم : لربط Attributes",
    keyDescription: "يمكنك ربط src وhref وclass وstyle وغيرها من Attributes ببيانات Vue.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <p>تم ربط مصدر الصورة بالبيانات باستخدام <strong>v-bind</strong>.</p>
      </div>
    `,

    challenge: "اربط src الخاص بالصورة بمتغير موجود في Vue.",

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

    explanation: `
      <p>
        <code>:src</code> هو اختصار لـ <code>v-bind:src</code>.
      </p>

      <p>
        Vue تأخذ قيمة <code>imageUrl</code> وتضعها داخل Attribute
        الخاص بـ <code>src</code>.
      </p>
    `,

    questions: [
      {
        question: "ما الاختصار الخاص بـ v-bind؟",
        options: [":", "@", "#", "$"],
        correct: 0,
      },
      {
        question: "ماذا يفعل v-bind؟",
        options: ["يربط Attribute ببيانات Vue", "ينشئ قاعدة بيانات", "يضيف JavaScript إلى النظام", "يحذف العنصر"],
        correct: 0,
      },
      {
        question: "أي صيغة صحيحة لربط src؟",
        options: [':src="imageUrl"', '@src="imageUrl"', '#src="imageUrl"', '$src="imageUrl"'],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     08 — v-if و v-else
  ======================================================= */
  {
    id: 8,
    group: "Directives",
    title: "v-if و v-else",
    description: "تعلّم كيف تعرض أو تخفي عناصر HTML بناءً على شروط معينة.",

    content: `
      <h2>v-if و v-else</h2>

      <p>
        تستخدم <code>v-if</code> لعرض عنصر عندما يكون الشرط صحيحًا.
      </p>

      <p>
        ويمكن استخدام <code>v-else</code> لعرض عنصر بديل عندما يكون
        الشرط غير صحيح.
      </p>
    `,

    keyTitle: "v-if تتحكم في العرض",
    keyDescription: "استخدم v-if وv-else لإظهار عناصر مختلفة حسب حالة البيانات.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <p>مرحبًا بك مرة أخرى!</p>
      </div>
    `,

    challenge: "اعرض رسالة مختلفة عندما تكون قيمة isLoggedIn صحيحة أو خاطئة.",

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

    explanation: `
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

    questions: [
      {
        question: "ما Directive المستخدمة في Conditional Rendering؟",
        options: ["v-if", "v-condition", "v-show-text", "v-check"],
        correct: 0,
      },
      {
        question: "متى يعمل v-else؟",
        options: ["عندما يكون شرط v-if غير صحيح", "دائمًا", "عندما يتغير CSS", "عند تحميل الصورة"],
        correct: 0,
      },
      {
        question: "ماذا يتحكم v-if؟",
        options: ["عرض العنصر بناءً على شرط", "لون النص فقط", "حجم قاعدة البيانات", "عنوان الصفحة"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     09 — v-for
  ======================================================= */
  {
    id: 9,
    group: "Directives",
    title: "v-for",
    description: "تعلّم كيف تعرض عناصر متعددة من Array باستخدام v-for.",

    content: `
      <h2>v-for</h2>

      <p>
        تستخدم <code>v-for</code> لتكرار عنصر HTML لكل عنصر موجود
        داخل Array أو Collection.
      </p>

      <p>
        وهي من أكثر Directives استخدامًا عند إنشاء القوائم.
      </p>
    `,

    keyTitle: "v-for تعرض القوائم",
    keyDescription: "يمكنك استخدام v-for لتكرار عنصر HTML اعتمادًا على عناصر Array.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <ul style="margin:0;padding-right:20px;">
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
      </div>
    `,

    challenge: "استخدم v-for لعرض جميع عناصر Array داخل قائمة.",

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

    explanation: `
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

    questions: [
      {
        question: "ما Directive المستخدمة لإنشاء Lists؟",
        options: ["v-for", "v-list", "v-repeat", "v-loop-html"],
        correct: 0,
      },
      {
        question: "ماذا يفعل v-for؟",
        options: ["يكرر عنصرًا اعتمادًا على بيانات", "يغير لون الصفحة", "ينشئ قاعدة بيانات", "يشغل CSS فقط"],
        correct: 0,
      },
      {
        question: "إذا كان لدينا items Array، كيف نمر على عناصرها؟",
        options: ['v-for="item in items"', 'v-loop="items"', 'v-array="items"', 'v-each="items"'],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     10 — v-on والأحداث
  ======================================================= */
  {
    id: 10,
    group: "Directives",
    title: "v-on والأحداث",
    description: "تعلّم كيف تتعامل Vue مع أحداث المستخدم مثل click باستخدام v-on.",

    content: `
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

    keyTitle: "@click يتعامل مع الضغط",
    keyDescription: "يمكنك استخدام @click لتشغيل منطق معين عند ضغط المستخدم على عنصر.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <p>تم الضغط 0 مرة</p>
        <button style="padding:8px 14px;">اضغط</button>
      </div>
    `,

    challenge: "أنشئ زرًا يزيد قيمة العداد عند الضغط عليه.",

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

    explanation: `
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

    questions: [
      {
        question: "ما الاختصار لـ v-on:click؟",
        options: ["@click", ":click", "#click", "$click"],
        correct: 0,
      },
      {
        question: "ما وظيفة v-on؟",
        options: ["الاستماع إلى Events", "إنشاء قاعدة بيانات", "ربط الصور فقط", "تغيير HTML بالكامل"],
        correct: 0,
      },
      {
        question: "أي Event يحدث عند ضغط المستخدم على زر؟",
        options: ["click", "hover-only", "load-css", "database"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     11 — v-model
  ======================================================= */
  {
    id: 11,
    group: "Directives",
    title: "v-model",
    description: "تعلّم كيف تنشئ Two-Way Binding بين عناصر الإدخال وبيانات Vue.",

    content: `
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

    keyTitle: "v-model للربط ثنائي الاتجاه",
    keyDescription: "v-model تربط قيمة Input بالبيانات بحيث يتحرك التحديث في الاتجاهين.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <input placeholder="اكتب اسمك"
          style="padding:8px 10px;border:1px solid #ccc;border-radius:6px;">
        <h2>مرحبًا</h2>
      </div>
    `,

    challenge: "اربط Input بمتغير name باستخدام v-model واعرض القيمة أسفل Input.",

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

    explanation: `
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

    questions: [
      {
        question: "ما Directive المستخدمة عادةً مع Form Inputs؟",
        options: ["v-model", "v-input", "v-form", "v-value-only"],
        correct: 0,
      },
      {
        question: "ماذا توفر v-model؟",
        options: ["Two-Way Binding", "Database Binding", "CSS Binding فقط", "Image Binding فقط"],
        correct: 0,
      },
      {
        question: "ماذا يحدث عند الكتابة في Input مرتبط بـ v-model؟",
        options: ["تتغير قيمة البيانات المرتبطة", "يتم حذف Input", "يتوقف Vue", "يتم إغلاق الصفحة"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     12 — Class و Style
  ======================================================= */
  {
    id: 12,
    group: "Directives",
    title: "ربط Class و Style",
    description: "تعلّم كيف تتحكم في CSS Classes وStyles بشكل ديناميكي في Vue.",

    content: `
      <h2>ربط Class و Style</h2>

      <p>
        تسمح Vue بربط CSS Classes وInline Styles بالبيانات.
      </p>

      <p>
        هذا مفيد عندما تريد تغيير شكل العنصر بناءً على حالة معينة.
      </p>
    `,

    keyTitle: "تحكم في الشكل باستخدام البيانات",
    keyDescription: "يمكنك تغيير Class أو Style بشكل ديناميكي بناءً على البيانات.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <p style="margin:0;font-weight:bold;">حالة العنصر — Active</p>
      </div>
    `,

    challenge: "اربط Class باسم active بحيث تتم إضافته عندما تكون isActive صحيحة.",

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

    explanation: `
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

    questions: [
      {
        question: "كيف نربط CSS Class بشكل ديناميكي؟",
        options: [":class", "@class", "#class", "v-css-only"],
        correct: 0,
      },
      {
        question: "متى تظهر active في المثال؟",
        options: ["عندما تكون isActive صحيحة", "دائمًا", "عندما تكون CSS محذوفة", "عندما يتغير عنوان الصفحة"],
        correct: 0,
      },
      {
        question: "أي Directive تستخدم لربط Inline Style؟",
        options: [":style", "@style", "#style", "v-css"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     13 — Components
  ======================================================= */
  {
    id: 13,
    group: "المكونات Components",
    title: "المكونات Components",
    description: "تعلّم مفهوم Components وكيف تساعدك على بناء واجهات قابلة لإعادة الاستخدام.",

    content: `
      <h2>Components</h2>

      <p>
        Component هو جزء مستقل وقابل لإعادة الاستخدام من واجهة المستخدم.
      </p>

      <p>
        تقسيم التطبيق إلى Components يجعل الكود أكثر تنظيمًا
        وأسهل في الصيانة.
      </p>
    `,

    keyTitle: "Components تجعل الواجهة قابلة لإعادة الاستخدام",
    keyDescription: "قسّم الواجهة إلى أجزاء صغيرة مستقلة يمكن إعادة استخدامها في أكثر من مكان.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0 0 6px;">FAYAD</h2>
        <p style="margin:0;">Vue Developer</p>
      </div>
    `,

    challenge: "أنشئ Component بسيطًا يعرض اسمًا ووصفًا ويمكن إعادة استخدامه.",

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

    explanation: `
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

    questions: [
      {
        question: "لماذا نستخدم Components؟",
        options: ["لإنشاء أجزاء قابلة لإعادة الاستخدام", "لاستبدال JavaScript", "لإنشاء نظام تشغيل", "لحذف HTML"],
        correct: 0,
      },
      {
        question: "ما فائدة تقسيم التطبيق إلى Components؟",
        options: ["تنظيم الكود وإعادة استخدام الأجزاء", "إلغاء CSS", "منع JavaScript", "حذف البيانات"],
        correct: 0,
      },
      {
        question: "هل يمكن استخدام Component أكثر من مرة؟",
        options: ["نعم", "لا", "فقط داخل CSS", "فقط داخل Database"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     14 — Props
  ======================================================= */
  {
    id: 14,
    group: "المكونات Components",
    title: "Props",
    description: "تعلّم كيف تمرر البيانات من Parent Component إلى Child Component باستخدام Props.",

    content: `
      <h2>Props</h2>

      <p>
        Props هي الطريقة الأساسية لتمرير البيانات من Parent Component
        إلى Child Component.
      </p>

      <p>
        تساعد Props على جعل Components أكثر مرونة وقابلية لإعادة الاستخدام.
      </p>
    `,

    keyTitle: "Props تمرر البيانات إلى المكونات الأبناء",
    keyDescription: "يمكن للـ Parent إرسال بيانات إلى Child من خلال Props.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">Hello FAYAD</h2>
      </div>
    `,

    challenge: "مرر اسمًا من Parent إلى UserCard باستخدام Props.",

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

    explanation: `
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

    questions: [
      {
        question: "ما الاستخدام الأساسي لـ Props؟",
        options: ["تمرير البيانات إلى Child Component", "إنشاء CSS", "إنشاء قاعدة بيانات", "تشغيل Browser"],
        correct: 0,
      },
      {
        question: "من أين تأتي Props عادةً؟",
        options: ["من Parent Component", "من نظام التشغيل", "من CSS", "من المتصفح فقط"],
        correct: 0,
      },
      {
        question: "هل يمكن للـ Child استخدام قيمة Prop؟",
        options: ["نعم", "لا", "فقط في CSS", "فقط في Database"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     15 — Events و Emits
  ======================================================= */
  {
    id: 15,
    group: "المكونات Components",
    title: "Events و Emits",
    description: "تعلّم كيف يتواصل Child Component مع Parent باستخدام Custom Events و Emits.",

    content: `
      <h2>Events و Emits</h2>

      <p>
        Props تستخدم غالبًا لتمرير البيانات من Parent إلى Child.
      </p>

      <p>
        وعندما يحتاج Child إلى إخبار Parent بحدوث شيء، يمكنه إطلاق
        Custom Event باستخدام <code>emit</code>.
      </p>
    `,

    keyTitle: "emit ترسل أحداثًا إلى Parent",
    keyDescription: "يمكن للـ Child إطلاق Custom Event، ويستطيع Parent الاستماع إليه.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <button style="padding:8px 14px;">زيادة</button>
        <p>العدد: 0</p>
      </div>
    `,

    challenge: "أنشئ Child Component يرسل Event إلى Parent عند الضغط على زر.",

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

    explanation: `
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

    questions: [
      {
        question: "ما وظيفة emit في Vue؟",
        options: ["إرسال Custom Event من Child إلى Parent", "إنشاء CSS", "إنشاء Database", "تغيير URL"],
        correct: 0,
      },
      {
        question: "أين يحدث التواصل العكسي من Child إلى Parent؟",
        options: ["باستخدام Events و Emits", "باستخدام CSS", "باستخدام HTML comments", "باستخدام الصور"],
        correct: 0,
      },
      {
        question: "كيف يستمع Parent إلى Custom Event اسمه increase؟",
        options: ["@increase", ":increase", "#increase", "$increase"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     16 — Composition API
  ======================================================= */
  {
    id: 16,
    group: "Composition API",
    title: "Composition API",
    description: "تعرّف على Composition API ولماذا تستخدم لتنظيم Logic داخل مكونات Vue.",

    content: `
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

    keyTitle: "Composition API لتنظيم Logic",
    keyDescription: "تسمح لك Composition API بتجميع Logic المرتبط ببعضه في مكان واضح وقابل لإعادة الاستخدام.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <button style="padding:9px 16px;">0</button>
      </div>
    `,

    challenge: "أنشئ Counter باستخدام Composition API وref().",

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

    explanation: `
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

    questions: [
      {
        question: "ما الهدف الأساسي من Composition API؟",
        options: ["تنظيم Logic الخاص بالمكونات", "إنشاء قواعد بيانات", "تصميم الصور", "استبدال HTML"],
        correct: 0,
      },
      {
        question: "أين نكتب Composition API Logic غالبًا؟",
        options: ["داخل setup()", "داخل style فقط", "داخل HTML comments", "داخل database()"],
        correct: 0,
      },
      {
        question: "أي Function من التالية مرتبطة بـ Composition API؟",
        options: ["ref()", "htmlDatabase()", "cssEngine()", "browserState()"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     17 — ref و reactive
  ======================================================= */
  {
    id: 17,
    group: "Composition API",
    title: "ref و reactive",
    description: "تعلّم الفرق الأساسي بين ref و reactive وكيف تستخدمهما مع البيانات التفاعلية.",

    content: `
      <h2>ref و reactive</h2>

      <p>
        <code>ref()</code> تستخدم لإنشاء Reactive Reference ويمكنها
        التعامل مع قيم بسيطة مثل Number وString.
      </p>

      <p>
        <code>reactive()</code> تستخدم لإنشاء Reactive Object.
      </p>
    `,

    keyTitle: "ref للقيم و reactive للكائنات",
    keyDescription: "استخدم ref للقيم التفاعلية وreactive عندما تحتاج إلى Reactive Object.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0 0 6px;">0</h2>
        <p>FAYAD</p>
        <button style="padding:8px 14px;">زيادة</button>
      </div>
    `,

    challenge: "أنشئ count باستخدام ref وuser باستخدام reactive.",

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

    explanation: `
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

    questions: [
      {
        question: "ما Function المستخدمة لإنشاء Reactive Reference؟",
        options: ["ref()", "stateRef()", "reactiveValue()", "reference()"],
        correct: 0,
      },
      {
        question: "ما Function المناسبة لإنشاء Reactive Object؟",
        options: ["reactive()", "objectState()", "makeObject()", "watchObject()"],
        correct: 0,
      },
      {
        question: "كيف نصل إلى قيمة ref داخل JavaScript؟",
        options: ["باستخدام .value", "باستخدام .data", "باستخدام .state", "باستخدام .refValue فقط"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     18 — watch
  ======================================================= */
  {
    id: 18,
    group: "Composition API",
    title: "watch",
    description: "تعلّم كيف تراقب تغير البيانات التفاعلية باستخدام watch.",

    content: `
      <h2>watch</h2>

      <p>
        تستخدم <code>watch()</code> لمراقبة تغير قيمة Reactive معينة.
      </p>

      <p>
        وهي مفيدة عندما يؤدي تغير قيمة معينة إلى تنفيذ Side Effect
        أو عملية إضافية.
      </p>
    `,

    keyTitle: "راقب تغير البيانات",
    keyDescription: "استخدم watch عندما تحتاج إلى تنفيذ Logic إضافي عند تغير قيمة Reactive.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <input placeholder="ابحث هنا"
          style="padding:8px 10px;border:1px solid #ccc;border-radius:6px;">
        <p>البحث:</p>
      </div>
    `,

    challenge: "أنشئ Watcher يراقب قيمة search ويطبع القيمة الجديدة.",

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

    explanation: `
      <p>
        <code>watch()</code تراقب مصدرًا Reactive.
      </p>

      <p>
        عندما تتغير القيمة يتم تشغيل Callback.
      </p>

      <p>
        <code>newValue</code> تحتوي على القيمة الجديدة بعد التغيير.
      </p>
    `,

    questions: [
      {
        question: "ماذا تراقب watch؟",
        options: ["تغيرات Reactive Data", "تغيرات CSS فقط", "HTML comments", "صور الصفحة فقط"],
        correct: 0,
      },
      {
        question: "متى يعمل Callback الخاص بـ watch؟",
        options: [
          "عندما تتغير القيمة التي تتم مراقبتها",
          "مرة واحدة فقط دائمًا",
          "عند تغيير لون الصفحة",
          "عند إغلاق المتصفح",
        ],
        correct: 0,
      },
      {
        question: "ما فائدة watch الأساسية؟",
        options: ["تنفيذ Logic إضافي عند تغير البيانات", "إنشاء Components", "إنشاء CSS", "إنشاء Routes فقط"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     19 — Lifecycle Hooks
  ======================================================= */
  {
    id: 19,
    group: "Composition API",
    title: "Lifecycle Hooks",
    description: "تعلّم فكرة Lifecycle Hooks وكيف تنفذ كودًا في مراحل معينة من حياة Component.",

    content: `
      <h2>Lifecycle Hooks</h2>

      <p>
        تمر Components في Vue بمراحل مختلفة أثناء حياتها.
      </p>

      <p>
        Lifecycle Hooks تسمح لك بتنفيذ Logic في مراحل محددة،
        مثل لحظة Mounting الخاصة بالمكون.
      </p>
    `,

    keyTitle: "Hooks تعمل في مراحل محددة",
    keyDescription: "يمكنك تنفيذ Logic عند حدوث مراحل مهمة في دورة حياة Component.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h2 style="margin:0;">مرحبًا Vue</h2>
        <p style="margin-bottom:0;">تم تشغيل onMounted بعد تركيب Component.</p>
      </div>
    `,

    challenge: "استخدم onMounted لتنفيذ كود بعد تركيب Component.",

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

    explanation: `
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

    questions: [
      {
        question: "متى يعمل onMounted()؟",
        options: ["بعد Mount الـ Component", "قبل تحميل JavaScript", "عند تغيير CSS فقط", "عند حذف HTML"],
        correct: 0,
      },
      {
        question: "ما وظيفة Lifecycle Hooks؟",
        options: [
          "تنفيذ Logic في مراحل معينة من حياة Component",
          "إنشاء قواعد بيانات",
          "تغيير نظام التشغيل",
          "إنشاء الصور",
        ],
        correct: 0,
      },
      {
        question: "أي Hook تستخدم لتنفيذ Logic بعد Mount؟",
        options: ["onMounted()", "onStarted()", "onLoadedCSS()", "afterVue()"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     20 — النماذج والتحقق
  ======================================================= */
  {
    id: 20,
    group: "Vue المتقدم",
    title: "النماذج والتحقق",
    description: "تعلّم كيفية التعامل مع Forms وإضافة Validation بسيطة باستخدام Vue.",

    content: `
      <h2>النماذج والتحقق</h2>

      <p>
        يمكن استخدام <code>v-model</code> لربط قيم Form بالبيانات.
      </p>

      <p>
        ويمكنك استخدام Methods للتحقق من البيانات قبل تنفيذ عملية
        الإرسال.
      </p>
    `,

    keyTitle: "تحقق من البيانات قبل الإرسال",
    keyDescription: "اربط حقول Form بالبيانات ثم تحقق من القيم قبل إرسالها أو تنفيذ العملية.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <input placeholder="الاسم"
          style="padding:8px 10px;border:1px solid #ccc;border-radius:6px;">
        <button style="padding:8px 14px;margin-right:6px;">إرسال</button>
      </div>
    `,

    challenge: "أنشئ Form يتحقق من أن الاسم ليس فارغًا قبل الإرسال.",

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

    explanation: `
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

    questions: [
      {
        question: "ما فائدة Validation في Forms؟",
        options: ["التأكد من صحة البيانات قبل استخدامها", "إنشاء CSS", "إنشاء Components", "تغيير لون المتصفح"],
        correct: 0,
      },
      {
        question: "ما الذي يمكن استخدامه لربط Input بالبيانات؟",
        options: ["v-model", "v-route", "v-check-only", "v-input-data"],
        correct: 0,
      },
      {
        question: "ماذا تفعل .prevent مع submit؟",
        options: ["تمنع السلوك الافتراضي للمتصفح", "تحذف Form", "تنشئ Component", "تغلق الصفحة"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     21 — Vue Router
  ======================================================= */
  {
    id: 21,
    group: "Vue المتقدم",
    title: "Vue Router",
    description: "تعلّم دور Vue Router في إنشاء Navigation بين Views المختلفة.",

    content: `
      <h2>Vue Router</h2>

      <p>
        Vue Router هو الحل الرسمي للتعامل مع Navigation داخل تطبيقات Vue.
      </p>

      <p>
        يسمح لك بربط URLs مختلفة بمكونات مختلفة مع الحفاظ على طبيعة
        Single Page Application.
      </p>
    `,

    keyTitle: "Router يتحكم في Navigation",
    keyDescription: "Vue Router يربط URLs بالمكونات ويتيح للمستخدم الانتقال بين Views المختلفة.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <p>/ → Home</p>
        <p>/about → About</p>
      </div>
    `,

    challenge: "عرّف Route للصفحة الرئيسية Route آخر لصفحة About.",

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

    explanation: `
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

    questions: [
      {
        question: "ما الاستخدام الأساسي لـ Vue Router؟",
        options: ["إدارة Navigation بين Views", "إدارة قواعد البيانات", "تصميم الصور", "إنشاء CSS"],
        correct: 0,
      },
      {
        question: "ماذا يمثل path داخل Route؟",
        options: ["URL أو المسار", "اسم CSS Class", "اسم Database", "اسم الصورة"],
        correct: 0,
      },
      {
        question: "ماذا يحدد component داخل Route؟",
        options: ["المكون الذي سيظهر للمسار", "لون الصفحة", "نوع قاعدة البيانات", "نوع المتصفح"],
        correct: 0,
      },
    ],
  },

  /* =======================================================
     22 — إدارة الحالة
  ======================================================= */
  {
    id: 22,
    group: "Vue المتقدم",
    title: "إدارة الحالة",
    description: "تعلّم الفكرة الأساسية لإدارة State المشتركة بين أجزاء تطبيق Vue.",

    content: `
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

    keyTitle: "State مشتركة تحتاج إلى تنظيم",
    keyDescription: "عندما تحتاج Components متعددة إلى نفس البيانات، استخدم نظامًا منظمًا لإدارة الحالة.",

    example: `
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

    result: `
      <div style="padding:20px;font-family:Arial;">
        <h3 style="margin:0 0 8px;">Counter Store</h3>
        <p style="margin:0;">إدارة State مشتركة بين Components.</p>
      </div>
    `,

    challenge: "فكر في تطبيق يحتوي على Components متعددة تحتاج إلى نفس قيمة count وكيف ستنظم هذه الحالة.",

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

    explanation: `
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

    questions: [
      {
        question: "ما المقصود بـ State؟",
        options: ["البيانات التي تمثل الحالة الحالية للتطبيق", "ملفات CSS فقط", "صور الموقع", "روابط HTML فقط"],
        correct: 0,
      },
      {
        question: "لماذا نحتاج State Management؟",
        options: ["لتنظيم البيانات المشتركة بين Components", "لإنشاء الصور", "لحذف JavaScript", "لتغيير نظام التشغيل"],
        correct: 0,
      },
      {
        question: "ما المكتبة الشائعة لإدارة State في Vue الحديثة؟",
        options: ["Pinia", "jQuery", "Bootstrap", "Express فقط"],
        correct: 0,
      },
    ],
  },
];

/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY = "fayad-vue-learning-progress";

let currentLesson = 1;
let completedLessons = [];
let currentLessonData = null;

let currentQuizQuestions = [];
let currentQuizIndex = 0;
let currentQuizAnswered = false;

/* =========================================================
   DOM ELEMENTS
========================================================= */

const lessonLinks = document.querySelectorAll(".lesson");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

const lessonNumber = document.getElementById("lesson-number");
const lessonTitle = document.getElementById("lesson-title");
const lessonDescription = document.getElementById("lesson-description");
const lessonContent = document.getElementById("lesson-content");

const keyTitle = document.getElementById("key-title");
const keyDescription = document.getElementById("key-description");

const exampleCode = document.getElementById("example-code");
const exampleResult = document.getElementById("example-result");

const codeEditor = document.getElementById("code-editor");
const challengeText = document.getElementById("challenge-text");
const codeExplanation = document.getElementById("code-explanation");

const question = document.getElementById("question");
const questionInstruction = document.getElementById("questionInstruction");
const answerOptions = document.getElementById("answer-options");
const answerFeedback = document.getElementById("answer-feedback");

const quizQuestionNumber = document.getElementById("quizQuestionNumber");
const quizTotalQuestions = document.getElementById("quizTotalQuestions");
const quizNextButton = document.getElementById("quizNextButton");

const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

const previousTitle = document.getElementById("previous-title");
const nextTitle = document.getElementById("next-title");

const copyButton = document.getElementById("copy-btn");
const runButton = document.getElementById("run-code");
const resetButton = document.getElementById("reset-code");

const livePreview = document.getElementById("live-preview");

/* =========================================================
   SHUFFLE
   Fisher-Yates Shuffle
========================================================= */

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

/* =========================================================
   CREATE SHUFFLED QUESTION
========================================================= */

function createShuffledQuestion(originalQuestion) {
  const answers = originalQuestion.options.map((text, index) => ({
    text,
    originalIndex: index,
  }));

  const shuffledAnswers = shuffleArray(answers);

  return {
    question: originalQuestion.question,
    options: shuffledAnswers.map((item) => item.text),
    correctIndex: shuffledAnswers.findIndex((item) => item.originalIndex === originalQuestion.correct),
  };
}

/* =========================================================
   LOAD PROGRESS
========================================================= */

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      completedLessons = [];
      return;
    }

    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed)) {
      completedLessons = [
        ...new Set(parsed.map(Number).filter((id) => Number.isFinite(id) && id >= 1 && id <= lessons.length)),
      ].sort((a, b) => a - b);
    } else {
      completedLessons = [];
    }
  } catch (error) {
    console.error("Unable to load Vue learning progress:", error);

    completedLessons = [];
  }
}

/* =========================================================
   SAVE PROGRESS
========================================================= */

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
  } catch (error) {
    console.error("Unable to save Vue learning progress:", error);
  }
}

/* =========================================================
   COMPLETE LESSON
========================================================= */

function markLessonCompleted(id) {
  const numericId = Number(id);

  if (!completedLessons.includes(numericId) && numericId >= 1 && numericId <= lessons.length) {
    completedLessons.push(numericId);

    completedLessons.sort((a, b) => a - b);

    saveProgress();
  }

  renderSidebar();
  updateProgress();
}

/* =========================================================
   SIDEBAR
========================================================= */

function renderSidebar() {
  lessonLinks.forEach((link) => {
    const index = Number(link.dataset.lesson);
    const lessonId = index + 1;

    const status = link.querySelector(".lesson-status");

    link.classList.remove("active", "completed");

    if (status) {
      status.classList.remove("current", "completed");
    }

    if (lessonId === currentLesson) {
      link.classList.add("active");

      if (status) {
        status.classList.add("current");
      }
    }

    if (completedLessons.includes(lessonId)) {
      link.classList.add("completed");

      if (status) {
        status.classList.add("completed");
      }
    }
  });
}

/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {
  const total = lessons.length;
  const completed = completedLessons.length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (progressText) {
    progressText.textContent = `${percentage}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
}

/* =========================================================
   LOAD LESSON
========================================================= */

function loadLesson(id) {
  const numericId = Number(id);

  const lesson = lessons.find((item) => item.id === numericId);

  if (!lesson) {
    return;
  }

  currentLesson = numericId;
  currentLessonData = lesson;

  if (lessonNumber) {
    lessonNumber.textContent = `الدرس ${String(lesson.id).padStart(2, "0")}`;
  }

  if (lessonTitle) {
    lessonTitle.textContent = lesson.title;
  }

  if (lessonDescription) {
    lessonDescription.textContent = lesson.description;
  }

  if (lessonContent) {
    lessonContent.innerHTML = lesson.content;
  }

  if (keyTitle) {
    keyTitle.textContent = lesson.keyTitle;
  }

  if (keyDescription) {
    keyDescription.textContent = lesson.keyDescription;
  }

  if (exampleCode) {
    exampleCode.textContent = lesson.example.trim();
  }

  if (exampleResult) {
    exampleResult.innerHTML = lesson.result;
  }

  if (codeEditor) {
    codeEditor.value = lesson.starterCode.trim();
  }

  if (challengeText) {
    challengeText.textContent = lesson.challenge;
  }

  if (codeExplanation) {
    codeExplanation.innerHTML = lesson.explanation;
  }

  renderQuiz(lesson);
  updateNavigation();
  renderSidebar();
  updateProgress();

  runCode();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* =========================================================
   RENDER QUIZ
========================================================= */

function renderQuiz(lesson) {
  if (!question || !answerOptions) {
    return;
  }

  currentQuizQuestions = Array.isArray(lesson.questions) ? lesson.questions.map(createShuffledQuestion) : [];

  currentQuizIndex = 0;
  currentQuizAnswered = false;

  if (quizTotalQuestions) {
    quizTotalQuestions.textContent = currentQuizQuestions.length || 3;
  }

  renderCurrentQuestion();
}

/* =========================================================
   RENDER CURRENT QUESTION
========================================================= */

function renderCurrentQuestion() {
  if (!question || !answerOptions) {
    return;
  }

  const currentQuestion = currentQuizQuestions[currentQuizIndex];

  if (!currentQuestion) {
    showQuizCompleted();
    return;
  }

  currentQuizAnswered = false;

  question.textContent = currentQuestion.question;

  answerOptions.innerHTML = "";

  if (quizQuestionNumber) {
    quizQuestionNumber.textContent = `السؤال ${currentQuizIndex + 1}`;
  }

  if (quizTotalQuestions) {
    quizTotalQuestions.textContent = currentQuizQuestions.length;
  }

  if (questionInstruction) {
    questionInstruction.textContent = "اختر الإجابة الصحيحة.";
  }

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.className = "answer-feedback";
  }

  if (quizNextButton) {
    quizNextButton.disabled = true;

    if (currentQuizIndex === currentQuizQuestions.length - 1) {
      quizNextButton.textContent = "إنهاء الاختبار";
    } else {
      quizNextButton.textContent = "السؤال التالي";
    }
  }

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", () => {
      handleAnswer(index);
    });

    answerOptions.appendChild(button);
  });
}

/* =========================================================
   HANDLE ANSWER
========================================================= */

function handleAnswer(selectedIndex) {
  if (currentQuizAnswered) {
    return;
  }

  const currentQuestion = currentQuizQuestions[currentQuizIndex];

  if (!currentQuestion) {
    return;
  }

  currentQuizAnswered = true;

  const buttons = answerOptions.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove("correct", "wrong");
  });

  const selectedButton = buttons[selectedIndex];

  const correctButton = buttons[currentQuestion.correctIndex];

  if (selectedIndex === currentQuestion.correctIndex) {
    if (selectedButton) {
      selectedButton.classList.add("correct");
    }

    if (answerFeedback) {
      answerFeedback.textContent = "إجابة صحيحة! أحسنت جدًا.";
      answerFeedback.className = "answer-feedback correct";
    }
  } else {
    if (selectedButton) {
      selectedButton.classList.add("wrong");
    }

    if (correctButton) {
      correctButton.classList.add("correct");
    }

    if (answerFeedback) {
      answerFeedback.textContent = "ليست الإجابة الصحيحة. تم تحديد الإجابة الصحيحة باللون الأخضر.";
      answerFeedback.className = "answer-feedback wrong";
    }
  }

  if (quizNextButton) {
    quizNextButton.disabled = false;
  }
}

/* =========================================================
   NEXT QUIZ QUESTION
========================================================= */

function nextQuizQuestion() {
  if (!currentQuizAnswered) {
    return;
  }

  if (currentQuizIndex < currentQuizQuestions.length - 1) {
    currentQuizIndex++;

    renderCurrentQuestion();

    const quizElement = document.getElementById("quick-check");

    if (quizElement) {
      quizElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  } else {
    showQuizCompleted();
  }
}

/* =========================================================
   QUIZ COMPLETED
========================================================= */

function showQuizCompleted() {
  markLessonCompleted(currentLesson);

  if (question) {
    question.textContent = "أحسنت! لقد أنهيت أسئلة هذا الدرس.";
  }

  if (questionInstruction) {
    questionInstruction.textContent = "يمكنك الآن الانتقال إلى الدرس التالي.";
  }

  if (answerOptions) {
    answerOptions.innerHTML = `
      <div style="
        padding:18px;
        text-align:center;
        line-height:1.8;
      ">
        <strong>تم إكمال اختبار الدرس بنجاح.</strong>
        <br>
        واصل تقدمك في مسار Vue.js.
      </div>
    `;
  }

  if (answerFeedback) {
    answerFeedback.textContent = "تم تسجيل الدرس كمكتمل.";
    answerFeedback.className = "answer-feedback correct";
  }

  if (quizQuestionNumber) {
    quizQuestionNumber.textContent = "اكتمل الاختبار";
  }

  if (quizNextButton) {
    quizNextButton.disabled = true;
    quizNextButton.textContent = "تم الإكمال";
  }
}

/* =========================================================
   QUIZ NEXT BUTTON
========================================================= */

if (quizNextButton) {
  quizNextButton.addEventListener("click", nextQuizQuestion);
}

/* =========================================================
   NAVIGATION
========================================================= */

function updateNavigation() {
  const currentIndex = lessons.findIndex((lesson) => lesson.id === currentLesson);

  const previous = lessons[currentIndex - 1];

  const next = lessons[currentIndex + 1];

  if (previous) {
    if (previousButton) {
      previousButton.disabled = false;
    }

    if (previousTitle) {
      previousTitle.textContent = previous.title;
    }
  } else {
    if (previousButton) {
      previousButton.disabled = true;
    }

    if (previousTitle) {
      previousTitle.textContent = "الرئيسية";
    }
  }

  if (next) {
    if (nextButton) {
      nextButton.disabled = false;
    }

    if (nextTitle) {
      nextTitle.textContent = next.title;
    }
  } else {
    if (nextButton) {
      nextButton.disabled = false;
    }

    if (nextTitle) {
      nextTitle.textContent = "اكتمل المسار";
    }
  }
}

/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (previousButton) {
  previousButton.addEventListener("click", () => {
    const index = lessons.findIndex((lesson) => lesson.id === currentLesson);

    if (index > 0) {
      loadLesson(lessons[index - 1].id);
    }
  });
}

/* =========================================================
   NEXT BUTTON
========================================================= */

if (nextButton) {
  nextButton.addEventListener("click", () => {
    const current = lessons.find((lesson) => lesson.id === currentLesson);

    if (!current) {
      return;
    }

    /*
     * إكمال الدرس عند الانتقال للأمام
     */
    markLessonCompleted(current.id);

    const index = lessons.findIndex((lesson) => lesson.id === currentLesson);

    const next = lessons[index + 1];

    if (next) {
      loadLesson(next.id);
    } else {
      updateProgress();
      renderSidebar();

      alert("مبروك! لقد أكملت مسار تعلم Vue.js بالكامل.");
    }
  });
}

/* =========================================================
   SIDEBAR EVENTS
========================================================= */

lessonLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const index = Number(link.dataset.lesson);

    if (!Number.isInteger(index) || index < 0 || index >= lessons.length) {
      return;
    }

    const lesson = lessons[index];

    if (lesson) {
      loadLesson(lesson.id);
    }
  });
});

/* =========================================================
   COPY CODE
========================================================= */

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    if (!currentLessonData) {
      return;
    }

    const code = currentLessonData.example.trim();

    try {
      await navigator.clipboard.writeText(code);

      copyButton.textContent = "تم النسخ";

      setTimeout(() => {
        copyButton.textContent = "نسخ";
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);

      /*
       * Fallback للمتصفحات التي لا تدعم
       * navigator.clipboard بشكل مباشر.
       */
      try {
        const temporaryTextarea = document.createElement("textarea");

        temporaryTextarea.value = code;

        temporaryTextarea.style.position = "fixed";
        temporaryTextarea.style.opacity = "0";

        document.body.appendChild(temporaryTextarea);

        temporaryTextarea.select();

        document.execCommand("copy");

        temporaryTextarea.remove();

        copyButton.textContent = "تم النسخ";

        setTimeout(() => {
          copyButton.textContent = "نسخ";
        }, 1500);
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError);
      }
    }
  });
}

/* =========================================================
   RUN CODE
========================================================= */

function runCode() {
  if (!codeEditor || !livePreview) {
    return;
  }

  const code = codeEditor.value;

  /*
   * مهم:
   * الرابط هنا أصبح URL حقيقيًا وليس Markdown.
   */
  const vueCDN = "https://unpkg.com/vue@3/dist/vue.global.js";

  const finalHTML = `
<!doctype html>

<html lang="ar" dir="rtl">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <style>

    * {
      box-sizing: border-box;
    }

    body {
      font-family:
        Arial,
        sans-serif;

      padding: 24px;

      color: #111;

      background: #fff;

      direction: rtl;
    }

    button,
    input,
    textarea,
    select {
      font: inherit;
    }

    button {
      padding: 8px 14px;

      cursor: pointer;

      border: 1px solid #ccc;

      border-radius: 6px;

      background: #f5f5f5;
    }

    input {
      padding: 8px 10px;

      border: 1px solid #ccc;

      border-radius: 6px;
    }

    img {
      max-width: 100%;
    }

    ul {
      padding-right: 20px;
    }

  </style>

</head>

<body>

${code}

<script src="${vueCDN}"><\\/script>

</body>

</html>
`;

  livePreview.srcdoc = finalHTML;
}

/* =========================================================
   RUN BUTTON
========================================================= */

if (runButton) {
  runButton.addEventListener("click", () => {
    runCode();
  });
}

/* =========================================================
   RESET CODE
========================================================= */

if (resetButton) {
  resetButton.addEventListener("click", () => {
    if (!currentLessonData) {
      return;
    }

    codeEditor.value = currentLessonData.starterCode.trim();

    runCode();
  });
}

/* =========================================================
   AUTO PREVIEW
========================================================= */

if (codeEditor) {
  codeEditor.addEventListener("input", () => {
    clearTimeout(window.__vuePreviewTimer);

    window.__vuePreviewTimer = setTimeout(runCode, 400);
  });
}

/* =========================================================
   INITIALIZE
========================================================= */

function init() {
  loadProgress();

  /*
   * HTML الحالي يستخدم:
   * data-lesson="0" إلى data-lesson="21"
   *
   * بينما lessons تستخدم IDs من 1 إلى 22.
   */
  if (!lessons.some((lesson) => lesson.id === currentLesson)) {
    currentLesson = 1;
  }

  /*
   * التأكد من أن عدد الدروس في JavaScript
   * متوافق مع عدد الدروس الموجودة في Sidebar.
   */
  if (lessonLinks.length !== lessons.length) {
    console.warn(
      `FAYAD Vue: يوجد ${lessonLinks.length} رابط درس في HTML بينما يوجد ${lessons.length} درس في JavaScript.`,
    );
  }

  loadLesson(currentLesson);
}

init();
