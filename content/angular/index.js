// Angular course content, shared lesson schema (see docs/lesson-schema.md).
// Generated once from the legacy implementation by tools/convert-angular-track.mjs; now hand-maintained.

export const track = {
  id: "angular",
  title: {
    ar: "Angular",
    en: "Angular",
  },
  editorLabel: "Angular",
  exampleHeading: {
    en: "Code Example",
    ar: "مثال على الكود",
  },
  practiceHeading: {
    en: "Try It Yourself",
    ar: "جرب بنفسك",
  },
  runtime: "sim-angular",
  quiz: {
    shuffle: true,
  },
  simLabels: {
    writeCode: {
      en: "Write some Angular code first.",
      ar: "اكتب بعض كود Angular أولًا.",
    },
    nothingPreview: {
      en: "Nothing to preview.",
      ar: "لا يوجد شيء لعرضه.",
    },
    angularPreview: {
      en: "Angular Preview",
      ar: "معاينة Angular",
    },
    codeLoaded: {
      en: "Angular code loaded successfully.",
      ar: "تم تحميل كود Angular بنجاح.",
    },
    detected: {
      en: "Detected:",
      ar: "تم اكتشاف:",
    },
    component: {
      en: "Component",
      ar: "Component",
    },
    interpolation: {
      en: "Interpolation",
      ar: "Interpolation",
    },
    conditionalRendering: {
      en: "Conditional rendering",
      ar: "العرض الشرطي",
    },
    listRendering: {
      en: "List rendering",
      ar: "عرض القوائم",
    },
    twoWayBinding: {
      en: "Two-way binding",
      ar: "ربط ثنائي الاتجاه",
    },
    propertyBinding: {
      en: "Property binding",
      ar: "ربط الخصائص",
    },
    eventBinding: {
      en: "Event binding",
      ar: "ربط الأحداث",
    },
    uppercasePipe: {
      en: "Uppercase pipe",
      ar: "Uppercase Pipe",
    },
    currencyPipe: {
      en: "Currency pipe",
      ar: "Currency Pipe",
    },
    inputOutput: {
      en: "Component communication",
      ar: "التواصل بين المكونات",
    },
    service: {
      en: "Service",
      ar: "Service",
    },
    dependencyInjection: {
      en: "Dependency Injection",
      ar: "Dependency Injection",
    },
    routing: {
      en: "Routing",
      ar: "Routing",
    },
    routeParameter: {
      en: "Route parameter",
      ar: "Route Parameter",
    },
    forms: {
      en: "Forms",
      ar: "Forms",
    },
    validation: {
      en: "Form validation",
      ar: "التحقق من صحة النموذج",
    },
    httpClient: {
      en: "HTTP Client",
      ar: "HTTP Client",
    },
    observable: {
      en: "Observable",
      ar: "Observable",
    },
    rxjs: {
      en: "RxJS",
      ar: "RxJS",
    },
    lifecycle: {
      en: "Lifecycle Hook",
      ar: "Lifecycle Hook",
    },
    signals: {
      en: "Signals",
      ar: "Signals",
    },
    standalone: {
      en: "Standalone component",
      ar: "Standalone Component",
    },
  },
  groups: [
    {
      id: "angular-g1",
      title: {
        en: "FUNDAMENTALS",
        ar: "الأساسيات",
      },
      lessons: [
        "angular-01",
        "angular-02",
        "angular-03",
        "angular-04",
        "angular-05",
        "angular-06",
        "angular-07",
        "angular-08",
        "angular-09",
        "angular-10",
      ],
    },
    {
      id: "angular-g2",
      title: {
        en: "CORE ANGULAR",
        ar: "أساسيات Angular",
      },
      lessons: [
        "angular-11",
        "angular-12",
        "angular-13",
        "angular-14",
        "angular-15",
        "angular-16",
        "angular-17",
        "angular-18",
        "angular-19",
        "angular-20",
      ],
    },
    {
      id: "angular-g3",
      title: {
        en: "ADVANCED",
        ar: "متقدم",
      },
      lessons: [
        "angular-21",
        "angular-22",
        "angular-23",
        "angular-24",
        "angular-25",
        "angular-26",
        "angular-27",
        "angular-28",
        "angular-29",
        "angular-30",
        "angular-31",
        "angular-32",
      ],
    },
  ],
};

export const lessons = [
  {
    id: "angular-01",
    title: {
      en: "Introduction to Angular",
      ar: "مقدمة إلى Angular",
    },
    description: {
      en: "Learn what Angular is, why developers use it, and how it helps build scalable modern web applications.",
      ar: "تعرف على Angular، ولماذا يستخدمه المطورون، وكيف يساعد في بناء تطبيقات ويب حديثة وقابلة للتوسع.",
    },
    body: {
      en: "Angular is a full-featured web framework built around TypeScript. It provides components, templates, routing, forms, dependency injection, HTTP tools, and reactive features. Angular helps developers organize large applications into reusable and maintainable parts.",
      ar: "Angular هو إطار عمل متكامل لتطوير تطبيقات الويب ويعتمد بشكل أساسي على TypeScript. يوفر Components وTemplates وRouting وForms وDependency Injection وأدوات HTTP وميزات تفاعلية. ويساعدك على تنظيم التطبيقات الكبيرة إلى أجزاء قابلة لإعادة الاستخدام والصيانة.",
    },
    example: {
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello Angular</h1>'
})
export class AppComponent {}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello Angular</h1>'
})
export class AppComponent {}`,
    },
    quiz: [
      {
        question: {
          en: "What is Angular mainly used for?",
          ar: "فيما يُستخدم Angular بشكل أساسي؟",
        },
        options: [
          {
            en: "Building modern web applications",
            ar: "بناء تطبيقات ويب حديثة",
          },
          {
            en: "Creating database tables",
            ar: "إنشاء جداول قواعد البيانات",
          },
          {
            en: "Styling HTML only",
            ar: "تنسيق HTML فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Introduction to Angular",
            ar: "مقدمة إلى Angular",
          },
          {
            en: "Angular CLI",
            ar: "Angular CLI",
          },
          {
            en: "Project Structure",
            ar: "هيكل المشروع",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Angular is a full-featured web framework built around TypeScript. It provides components, templates, routing, forms, dependency injection, HTTP tools, and reactive features. Angular helps developers organize large applications into reusable and maintainable parts.",
            ar: "Angular هو إطار عمل متكامل لتطوير تطبيقات الويب ويعتمد بشكل أساسي على TypeScript. يوفر Components وTemplates وRouting وForms وDependency Injection وأدوات HTTP وميزات تفاعلية. ويساعدك على تنظيم التطبيقات الكبيرة إلى أجزاء قابلة لإعادة الاستخدام والصيانة.",
          },
          {
            en: "Angular CLI is the official command-line tool for Angular development. It can generate projects and components, run the development server, build production applications, and perform other common tasks.",
            ar: "Angular CLI هي أداة سطر الأوامر الرسمية لتطوير Angular. يمكنك استخدامها لإنشاء المشاريع والمكونات وتشغيل خادم التطوير وبناء نسخة Production وتنفيذ العديد من المهام الشائعة.",
          },
          {
            en: "Angular projects contain source code, configuration files, assets, and application logic. The src folder contains the main application source, while configuration files such as package.json and angular.json control dependencies and project behavior.",
            ar: "تحتوي مشاريع Angular على كود المصدر وملفات الإعداد والـAssets ومنطق التطبيق. يحتوي مجلد src على الكود الأساسي للتطبيق، بينما تتحكم ملفات مثل package.json وangular.json في Dependencies وإعدادات المشروع.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn what Angular is, why developers use it, and how it helps build scalable modern web applications.",
            ar: "تعرف على Angular، ولماذا يستخدمه المطورون، وكيف يساعد في بناء تطبيقات ويب حديثة وقابلة للتوسع.",
          },
          {
            en: "Learn how Angular CLI helps you create, develop, test, and build Angular applications.",
            ar: "تعرف على كيفية استخدام Angular CLI لإنشاء وتطوير واختبار وبناء تطبيقات Angular.",
          },
          {
            en: "Understand the important files and folders inside an Angular project.",
            ar: "افهم أهم الملفات والمجلدات الموجودة داخل مشروع Angular.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Angular framework",
            ar: "إطار Angular",
          },
          {
            en: "Angular CLI",
            ar: "Angular CLI",
          },
          {
            en: "Project structure",
            ar: "هيكل المشروع",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "ng new",
            ar: "ng new",
          },
          {
            en: "ng generate",
            ar: "ng generate",
          },
          {
            en: "angular.json",
            ar: "angular.json",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-02",
    title: {
      en: "Angular CLI",
      ar: "Angular CLI",
    },
    description: {
      en: "Learn how Angular CLI helps you create, develop, test, and build Angular applications.",
      ar: "تعرف على كيفية استخدام Angular CLI لإنشاء وتطوير واختبار وبناء تطبيقات Angular.",
    },
    body: {
      en: "Angular CLI is the official command-line tool for Angular development. It can generate projects and components, run the development server, build production applications, and perform other common tasks.",
      ar: "Angular CLI هي أداة سطر الأوامر الرسمية لتطوير Angular. يمكنك استخدامها لإنشاء المشاريع والمكونات وتشغيل خادم التطوير وبناء نسخة Production وتنفيذ العديد من المهام الشائعة.",
    },
    example: {
      code: `ng new my-angular-app

cd my-angular-app

ng serve`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `ng new my-angular-app

cd my-angular-app

ng serve`,
    },
    quiz: [
      {
        question: {
          en: "What is Angular CLI?",
          ar: "ما هي Angular CLI؟",
        },
        options: [
          {
            en: "A command-line tool for Angular development",
            ar: "أداة لسطر الأوامر لتطوير Angular",
          },
          {
            en: "A database system",
            ar: "نظام قواعد بيانات",
          },
          {
            en: "A CSS framework",
            ar: "إطار عمل CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Angular CLI",
            ar: "Angular CLI",
          },
          {
            en: "Project Structure",
            ar: "هيكل المشروع",
          },
          {
            en: "Components",
            ar: "المكونات Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Angular CLI is the official command-line tool for Angular development. It can generate projects and components, run the development server, build production applications, and perform other common tasks.",
            ar: "Angular CLI هي أداة سطر الأوامر الرسمية لتطوير Angular. يمكنك استخدامها لإنشاء المشاريع والمكونات وتشغيل خادم التطوير وبناء نسخة Production وتنفيذ العديد من المهام الشائعة.",
          },
          {
            en: "Angular projects contain source code, configuration files, assets, and application logic. The src folder contains the main application source, while configuration files such as package.json and angular.json control dependencies and project behavior.",
            ar: "تحتوي مشاريع Angular على كود المصدر وملفات الإعداد والـAssets ومنطق التطبيق. يحتوي مجلد src على الكود الأساسي للتطبيق، بينما تتحكم ملفات مثل package.json وangular.json في Dependencies وإعدادات المشروع.",
          },
          {
            en: "A component represents a part of the user interface. It normally contains a TypeScript class for logic, an HTML template for the view, and optional styles. Components are the main building blocks of Angular applications.",
            ar: "يمثل الـComponent جزءًا من واجهة المستخدم. يحتوي عادةً على TypeScript Class للمنطق وHTML Template للواجهة وCSS اختياريًا للتنسيق. وتُعد المكونات اللبنات الأساسية لتطبيقات Angular.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular CLI helps you create, develop, test, and build Angular applications.",
            ar: "تعرف على كيفية استخدام Angular CLI لإنشاء وتطوير واختبار وبناء تطبيقات Angular.",
          },
          {
            en: "Understand the important files and folders inside an Angular project.",
            ar: "افهم أهم الملفات والمجلدات الموجودة داخل مشروع Angular.",
          },
          {
            en: "Learn how Angular components organize an application into reusable UI and logic.",
            ar: "تعلم كيف تنظم Components في Angular التطبيق إلى أجزاء مستقلة وقابلة لإعادة الاستخدام.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Angular CLI",
            ar: "Angular CLI",
          },
          {
            en: "Project structure",
            ar: "هيكل المشروع",
          },
          {
            en: "Component",
            ar: "المكوّن",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "ng generate",
            ar: "ng generate",
          },
          {
            en: "angular.json",
            ar: "angular.json",
          },
          {
            en: "@Component",
            ar: "@Component",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-03",
    title: {
      en: "Project Structure",
      ar: "هيكل المشروع",
    },
    description: {
      en: "Understand the important files and folders inside an Angular project.",
      ar: "افهم أهم الملفات والمجلدات الموجودة داخل مشروع Angular.",
    },
    body: {
      en: "Angular projects contain source code, configuration files, assets, and application logic. The src folder contains the main application source, while configuration files such as package.json and angular.json control dependencies and project behavior.",
      ar: "تحتوي مشاريع Angular على كود المصدر وملفات الإعداد والـAssets ومنطق التطبيق. يحتوي مجلد src على الكود الأساسي للتطبيق، بينما تتحكم ملفات مثل package.json وangular.json في Dependencies وإعدادات المشروع.",
    },
    example: {
      code: `src/
├── app/
│   ├── components/
│   ├── services/
│   └── pages/
├── assets/
├── index.html
└── main.ts`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `src/
├── app/
│   ├── components/
│   ├── services/
│   └── pages/
├── assets/
├── index.html
└── main.ts`,
    },
    quiz: [
      {
        question: {
          en: "Where is most application source code located?",
          ar: "أين يوجد معظم كود التطبيق؟",
        },
        options: [
          {
            en: "Inside the src folder",
            ar: "داخل مجلد src",
          },
          {
            en: "Inside the browser",
            ar: "داخل المتصفح",
          },
          {
            en: "Inside package.json only",
            ar: "داخل package.json فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Project Structure",
            ar: "هيكل المشروع",
          },
          {
            en: "Components",
            ar: "المكونات Components",
          },
          {
            en: "Templates",
            ar: "القوالب Templates",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Angular projects contain source code, configuration files, assets, and application logic. The src folder contains the main application source, while configuration files such as package.json and angular.json control dependencies and project behavior.",
            ar: "تحتوي مشاريع Angular على كود المصدر وملفات الإعداد والـAssets ومنطق التطبيق. يحتوي مجلد src على الكود الأساسي للتطبيق، بينما تتحكم ملفات مثل package.json وangular.json في Dependencies وإعدادات المشروع.",
          },
          {
            en: "A component represents a part of the user interface. It normally contains a TypeScript class for logic, an HTML template for the view, and optional styles. Components are the main building blocks of Angular applications.",
            ar: "يمثل الـComponent جزءًا من واجهة المستخدم. يحتوي عادةً على TypeScript Class للمنطق وHTML Template للواجهة وCSS اختياريًا للتنسيق. وتُعد المكونات اللبنات الأساسية لتطبيقات Angular.",
          },
          {
            en: "Angular templates are HTML enhanced with Angular syntax. They allow you to display component data, react to events, use bindings, render lists, and conditionally display content.",
            ar: "Angular Templates هي HTML مدعومة بخصائص Angular. تسمح لك بعرض بيانات الـComponent والتعامل مع Events واستخدام Bindings وعرض القوائم والمحتوى الشرطي.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Understand the important files and folders inside an Angular project.",
            ar: "افهم أهم الملفات والمجلدات الموجودة داخل مشروع Angular.",
          },
          {
            en: "Learn how Angular components organize an application into reusable UI and logic.",
            ar: "تعلم كيف تنظم Components في Angular التطبيق إلى أجزاء مستقلة وقابلة لإعادة الاستخدام.",
          },
          {
            en: "Learn how Angular templates define the HTML structure displayed by components.",
            ar: "تعرف على كيفية استخدام Angular Templates لتحديد بنية HTML التي تعرضها Components.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Project structure",
            ar: "هيكل المشروع",
          },
          {
            en: "Component",
            ar: "المكوّن",
          },
          {
            en: "Template",
            ar: "القالب",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "angular.json",
            ar: "angular.json",
          },
          {
            en: "@Component",
            ar: "@Component",
          },
          {
            en: "template",
            ar: "template",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-04",
    title: {
      en: "Components",
      ar: "المكونات Components",
    },
    description: {
      en: "Learn how Angular components organize an application into reusable UI and logic.",
      ar: "تعلم كيف تنظم Components في Angular التطبيق إلى أجزاء مستقلة وقابلة لإعادة الاستخدام.",
    },
    body: {
      en: "A component represents a part of the user interface. It normally contains a TypeScript class for logic, an HTML template for the view, and optional styles. Components are the main building blocks of Angular applications.",
      ar: "يمثل الـComponent جزءًا من واجهة المستخدم. يحتوي عادةً على TypeScript Class للمنطق وHTML Template للواجهة وCSS اختياريًا للتنسيق. وتُعد المكونات اللبنات الأساسية لتطبيقات Angular.",
    },
    example: {
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: '<h2>Product Card</h2>'
})
export class CardComponent {}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: '<h2>Product Card</h2>'
})
export class CardComponent {}`,
    },
    quiz: [
      {
        question: {
          en: "What is an Angular component?",
          ar: "ما هو Angular Component؟",
        },
        options: [
          {
            en: "A reusable part of the user interface",
            ar: "جزء قابل لإعادة الاستخدام من واجهة المستخدم",
          },
          {
            en: "A database",
            ar: "قاعدة بيانات",
          },
          {
            en: "A CSS property",
            ar: "خاصية CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Components",
            ar: "المكونات Components",
          },
          {
            en: "Templates",
            ar: "القوالب Templates",
          },
          {
            en: "Data Binding",
            ar: "ربط البيانات Data Binding",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "A component represents a part of the user interface. It normally contains a TypeScript class for logic, an HTML template for the view, and optional styles. Components are the main building blocks of Angular applications.",
            ar: "يمثل الـComponent جزءًا من واجهة المستخدم. يحتوي عادةً على TypeScript Class للمنطق وHTML Template للواجهة وCSS اختياريًا للتنسيق. وتُعد المكونات اللبنات الأساسية لتطبيقات Angular.",
          },
          {
            en: "Angular templates are HTML enhanced with Angular syntax. They allow you to display component data, react to events, use bindings, render lists, and conditionally display content.",
            ar: "Angular Templates هي HTML مدعومة بخصائص Angular. تسمح لك بعرض بيانات الـComponent والتعامل مع Events واستخدام Bindings وعرض القوائم والمحتوى الشرطي.",
          },
          {
            en: "Data binding connects the component class with its template. Angular supports interpolation, property binding, event binding, and two-way binding. These mechanisms reduce the amount of manual DOM manipulation you need to write.",
            ar: "يقوم Data Binding بربط الـComponent Class بالـTemplate. ويوفر Angular عدة أنواع مثل Interpolation وProperty Binding وEvent Binding وTwo-Way Binding، مما يقلل الحاجة إلى التعامل اليدوي مع DOM.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular components organize an application into reusable UI and logic.",
            ar: "تعلم كيف تنظم Components في Angular التطبيق إلى أجزاء مستقلة وقابلة لإعادة الاستخدام.",
          },
          {
            en: "Learn how Angular templates define the HTML structure displayed by components.",
            ar: "تعرف على كيفية استخدام Angular Templates لتحديد بنية HTML التي تعرضها Components.",
          },
          {
            en: "Learn how Angular connects component data with the user interface.",
            ar: "تعرف على كيفية ربط Angular بين بيانات الـComponent وواجهة المستخدم.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Component",
            ar: "المكوّن",
          },
          {
            en: "Template",
            ar: "القالب",
          },
          {
            en: "Data binding",
            ar: "ربط البيانات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "@Component",
            ar: "@Component",
          },
          {
            en: "template",
            ar: "template",
          },
          {
            en: "[property]",
            ar: "[property]",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-05",
    title: {
      en: "Templates",
      ar: "القوالب Templates",
    },
    description: {
      en: "Learn how Angular templates define the HTML structure displayed by components.",
      ar: "تعرف على كيفية استخدام Angular Templates لتحديد بنية HTML التي تعرضها Components.",
    },
    body: {
      en: "Angular templates are HTML enhanced with Angular syntax. They allow you to display component data, react to events, use bindings, render lists, and conditionally display content.",
      ar: "Angular Templates هي HTML مدعومة بخصائص Angular. تسمح لك بعرض بيانات الـComponent والتعامل مع Events واستخدام Bindings وعرض القوائم والمحتوى الشرطي.",
    },
    example: {
      code: `<h1>{{ title }}</h1>

<p>
  Welcome to Angular.
</p>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<h1>{{ title }}</h1>

<p>
  Welcome to Angular.
</p>`,
    },
    quiz: [
      {
        question: {
          en: "Where is a component's UI structure usually defined?",
          ar: "أين يتم عادةً تعريف بنية واجهة المكون؟",
        },
        options: [
          {
            en: "In its template",
            ar: "داخل الـTemplate الخاص به",
          },
          {
            en: "Inside the database",
            ar: "داخل قاعدة البيانات",
          },
          {
            en: "Inside package.json",
            ar: "داخل package.json",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Templates",
            ar: "القوالب Templates",
          },
          {
            en: "Data Binding",
            ar: "ربط البيانات Data Binding",
          },
          {
            en: "Interpolation",
            ar: "Interpolation",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Angular templates are HTML enhanced with Angular syntax. They allow you to display component data, react to events, use bindings, render lists, and conditionally display content.",
            ar: "Angular Templates هي HTML مدعومة بخصائص Angular. تسمح لك بعرض بيانات الـComponent والتعامل مع Events واستخدام Bindings وعرض القوائم والمحتوى الشرطي.",
          },
          {
            en: "Data binding connects the component class with its template. Angular supports interpolation, property binding, event binding, and two-way binding. These mechanisms reduce the amount of manual DOM manipulation you need to write.",
            ar: "يقوم Data Binding بربط الـComponent Class بالـTemplate. ويوفر Angular عدة أنواع مثل Interpolation وProperty Binding وEvent Binding وTwo-Way Binding، مما يقلل الحاجة إلى التعامل اليدوي مع DOM.",
          },
          {
            en: "Interpolation uses double curly braces to display expressions inside a template. Angular evaluates the expression and updates the displayed value when the related state changes.",
            ar: "تستخدم Interpolation الأقواس المعقوفة المزدوجة لعرض Expressions داخل الـTemplate. يقوم Angular بتقييم التعبير وتحديث القيمة المعروضة عندما تتغير البيانات المرتبطة به.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular templates define the HTML structure displayed by components.",
            ar: "تعرف على كيفية استخدام Angular Templates لتحديد بنية HTML التي تعرضها Components.",
          },
          {
            en: "Learn how Angular connects component data with the user interface.",
            ar: "تعرف على كيفية ربط Angular بين بيانات الـComponent وواجهة المستخدم.",
          },
          {
            en: "Learn how Angular interpolation displays component data inside HTML templates.",
            ar: "تعرف على كيفية عرض بيانات الـComponent داخل HTML باستخدام Interpolation.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Template",
            ar: "القالب",
          },
          {
            en: "Data binding",
            ar: "ربط البيانات",
          },
          {
            en: "Interpolation",
            ar: "Interpolation",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "template",
            ar: "template",
          },
          {
            en: "[property]",
            ar: "[property]",
          },
          {
            en: "{{ value }}",
            ar: "{{ value }}",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-06",
    title: {
      en: "Data Binding",
      ar: "ربط البيانات Data Binding",
    },
    description: {
      en: "Learn how Angular connects component data with the user interface.",
      ar: "تعرف على كيفية ربط Angular بين بيانات الـComponent وواجهة المستخدم.",
    },
    body: {
      en: "Data binding connects the component class with its template. Angular supports interpolation, property binding, event binding, and two-way binding. These mechanisms reduce the amount of manual DOM manipulation you need to write.",
      ar: "يقوم Data Binding بربط الـComponent Class بالـTemplate. ويوفر Angular عدة أنواع مثل Interpolation وProperty Binding وEvent Binding وTwo-Way Binding، مما يقلل الحاجة إلى التعامل اليدوي مع DOM.",
    },
    example: {
      code: `export class AppComponent {
  username = 'Mido';
}

<h2>{{ username }}</h2>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `export class AppComponent {
  username = 'Mido';
}

<h2>{{ username }}</h2>`,
    },
    quiz: [
      {
        question: {
          en: "What does data binding connect?",
          ar: "ماذا يربط Data Binding؟",
        },
        options: [
          {
            en: "Component data and the UI",
            ar: "بيانات الـComponent وواجهة المستخدم",
          },
          {
            en: "Two databases",
            ar: "قاعدتي بيانات",
          },
          {
            en: "CSS and the browser",
            ar: "CSS والمتصفح",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Data Binding",
            ar: "ربط البيانات Data Binding",
          },
          {
            en: "Interpolation",
            ar: "Interpolation",
          },
          {
            en: "Property Binding",
            ar: "ربط الخصائص Property Binding",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Data binding connects the component class with its template. Angular supports interpolation, property binding, event binding, and two-way binding. These mechanisms reduce the amount of manual DOM manipulation you need to write.",
            ar: "يقوم Data Binding بربط الـComponent Class بالـTemplate. ويوفر Angular عدة أنواع مثل Interpolation وProperty Binding وEvent Binding وTwo-Way Binding، مما يقلل الحاجة إلى التعامل اليدوي مع DOM.",
          },
          {
            en: "Interpolation uses double curly braces to display expressions inside a template. Angular evaluates the expression and updates the displayed value when the related state changes.",
            ar: "تستخدم Interpolation الأقواس المعقوفة المزدوجة لعرض Expressions داخل الـTemplate. يقوم Angular بتقييم التعبير وتحديث القيمة المعروضة عندما تتغير البيانات المرتبطة به.",
          },
          {
            en: "Property binding uses square brackets to dynamically set DOM properties from component state. This is useful when values such as image URLs, disabled states, classes, or other properties change dynamically.",
            ar: "يستخدم Property Binding الأقواس المربعة لربط خصائص عناصر HTML بقيم ديناميكية من الـComponent. ويُستخدم مثلًا مع الصور وحالة الأزرار والخصائص التي تتغير أثناء تشغيل التطبيق.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular connects component data with the user interface.",
            ar: "تعرف على كيفية ربط Angular بين بيانات الـComponent وواجهة المستخدم.",
          },
          {
            en: "Learn how Angular interpolation displays component data inside HTML templates.",
            ar: "تعرف على كيفية عرض بيانات الـComponent داخل HTML باستخدام Interpolation.",
          },
          {
            en: "Learn how property binding connects component values to HTML element properties.",
            ar: "تعرف على كيفية ربط قيم الـComponent بخصائص عناصر HTML.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Data binding",
            ar: "ربط البيانات",
          },
          {
            en: "Interpolation",
            ar: "Interpolation",
          },
          {
            en: "Property binding",
            ar: "Property Binding",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "[property]",
            ar: "[property]",
          },
          {
            en: "{{ value }}",
            ar: "{{ value }}",
          },
          {
            en: "[src]",
            ar: "[src]",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-07",
    title: {
      en: "Interpolation",
      ar: "Interpolation",
    },
    description: {
      en: "Learn how Angular interpolation displays component data inside HTML templates.",
      ar: "تعرف على كيفية عرض بيانات الـComponent داخل HTML باستخدام Interpolation.",
    },
    body: {
      en: "Interpolation uses double curly braces to display expressions inside a template. Angular evaluates the expression and updates the displayed value when the related state changes.",
      ar: "تستخدم Interpolation الأقواس المعقوفة المزدوجة لعرض Expressions داخل الـTemplate. يقوم Angular بتقييم التعبير وتحديث القيمة المعروضة عندما تتغير البيانات المرتبطة به.",
    },
    example: {
      code: `export class AppComponent {
  title = 'Fayad Angular';
}

<h1>{{ title }}</h1>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `export class AppComponent {
  title = 'Fayad Angular';
}

<h1>{{ title }}</h1>`,
    },
    quiz: [
      {
        question: {
          en: "Which syntax is used for Angular interpolation?",
          ar: "ما الصيغة المستخدمة في Angular للـInterpolation؟",
        },
        options: [
          {
            en: "{{ value }}",
            ar: "{{ value }}",
          },
          {
            en: "[[ value ]]",
            ar: "[[ value ]]",
          },
          {
            en: "<% value %>",
            ar: "<% value %>",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Interpolation",
            ar: "Interpolation",
          },
          {
            en: "Property Binding",
            ar: "ربط الخصائص Property Binding",
          },
          {
            en: "Event Binding",
            ar: "ربط الأحداث Event Binding",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Interpolation uses double curly braces to display expressions inside a template. Angular evaluates the expression and updates the displayed value when the related state changes.",
            ar: "تستخدم Interpolation الأقواس المعقوفة المزدوجة لعرض Expressions داخل الـTemplate. يقوم Angular بتقييم التعبير وتحديث القيمة المعروضة عندما تتغير البيانات المرتبطة به.",
          },
          {
            en: "Property binding uses square brackets to dynamically set DOM properties from component state. This is useful when values such as image URLs, disabled states, classes, or other properties change dynamically.",
            ar: "يستخدم Property Binding الأقواس المربعة لربط خصائص عناصر HTML بقيم ديناميكية من الـComponent. ويُستخدم مثلًا مع الصور وحالة الأزرار والخصائص التي تتغير أثناء تشغيل التطبيق.",
          },
          {
            en: "Event binding uses parentheses to listen for DOM events. When an event happens, Angular can call a component method or execute an expression.",
            ar: "يستخدم Event Binding الأقواس العادية للاستماع إلى DOM Events. وعند حدوث الحدث يستطيع Angular استدعاء Method داخل الـComponent أو تنفيذ Expression.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular interpolation displays component data inside HTML templates.",
            ar: "تعرف على كيفية عرض بيانات الـComponent داخل HTML باستخدام Interpolation.",
          },
          {
            en: "Learn how property binding connects component values to HTML element properties.",
            ar: "تعرف على كيفية ربط قيم الـComponent بخصائص عناصر HTML.",
          },
          {
            en: "Learn how Angular responds to user actions such as clicks, input, submit, and keyboard events.",
            ar: "تعرف على كيفية استجابة Angular لأفعال المستخدم مثل Click وInput وSubmit وأحداث لوحة المفاتيح.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Interpolation",
            ar: "Interpolation",
          },
          {
            en: "Property binding",
            ar: "Property Binding",
          },
          {
            en: "Event binding",
            ar: "Event Binding",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "{{ value }}",
            ar: "{{ value }}",
          },
          {
            en: "[src]",
            ar: "[src]",
          },
          {
            en: "(click)",
            ar: "(click)",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-08",
    title: {
      en: "Property Binding",
      ar: "ربط الخصائص Property Binding",
    },
    description: {
      en: "Learn how property binding connects component values to HTML element properties.",
      ar: "تعرف على كيفية ربط قيم الـComponent بخصائص عناصر HTML.",
    },
    body: {
      en: "Property binding uses square brackets to dynamically set DOM properties from component state. This is useful when values such as image URLs, disabled states, classes, or other properties change dynamically.",
      ar: "يستخدم Property Binding الأقواس المربعة لربط خصائص عناصر HTML بقيم ديناميكية من الـComponent. ويُستخدم مثلًا مع الصور وحالة الأزرار والخصائص التي تتغير أثناء تشغيل التطبيق.",
    },
    example: {
      code: `<img [src]="imageUrl">

<button [disabled]="isDisabled">
  Submit
</button>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<img [src]="imageUrl">

<button [disabled]="isDisabled">
  Submit
</button>`,
    },
    quiz: [
      {
        question: {
          en: "What does property binding do?",
          ar: "ماذا يفعل Property Binding؟",
        },
        options: [
          {
            en: "Connects data to an element property",
            ar: "يربط البيانات بخاصية في عنصر",
          },
          {
            en: "Creates a database",
            ar: "ينشئ قاعدة بيانات",
          },
          {
            en: "Changes the URL",
            ar: "يغير الرابط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Property Binding",
            ar: "ربط الخصائص Property Binding",
          },
          {
            en: "Event Binding",
            ar: "ربط الأحداث Event Binding",
          },
          {
            en: "Two-Way Data Binding",
            ar: "ربط البيانات ثنائي الاتجاه",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Property binding uses square brackets to dynamically set DOM properties from component state. This is useful when values such as image URLs, disabled states, classes, or other properties change dynamically.",
            ar: "يستخدم Property Binding الأقواس المربعة لربط خصائص عناصر HTML بقيم ديناميكية من الـComponent. ويُستخدم مثلًا مع الصور وحالة الأزرار والخصائص التي تتغير أثناء تشغيل التطبيق.",
          },
          {
            en: "Event binding uses parentheses to listen for DOM events. When an event happens, Angular can call a component method or execute an expression.",
            ar: "يستخدم Event Binding الأقواس العادية للاستماع إلى DOM Events. وعند حدوث الحدث يستطيع Angular استدعاء Method داخل الـComponent أو تنفيذ Expression.",
          },
          {
            en: "Two-way binding allows data to move from the component to the view and from the view back to the component. The ngModel directive is commonly used with the [(ngModel)] syntax in template-driven forms.",
            ar: "يسمح Two-Way Binding بانتقال البيانات من الـComponent إلى الواجهة ومن الواجهة إلى الـComponent. ويُستخدم ngModel بشكل شائع مع الصيغة [(ngModel)] في Template-driven Forms.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how property binding connects component values to HTML element properties.",
            ar: "تعرف على كيفية ربط قيم الـComponent بخصائص عناصر HTML.",
          },
          {
            en: "Learn how Angular responds to user actions such as clicks, input, submit, and keyboard events.",
            ar: "تعرف على كيفية استجابة Angular لأفعال المستخدم مثل Click وInput وSubmit وأحداث لوحة المفاتيح.",
          },
          {
            en: "Learn how Angular keeps component data and form controls synchronized.",
            ar: "تعرف على كيفية إبقاء بيانات الـComponent وحقول Forms متزامنة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Property binding",
            ar: "Property Binding",
          },
          {
            en: "Event binding",
            ar: "Event Binding",
          },
          {
            en: "Two-way binding",
            ar: "الربط ثنائي الاتجاه",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "[src]",
            ar: "[src]",
          },
          {
            en: "(click)",
            ar: "(click)",
          },
          {
            en: "[(ngModel)]",
            ar: "[(ngModel)]",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-09",
    title: {
      en: "Event Binding",
      ar: "ربط الأحداث Event Binding",
    },
    description: {
      en: "Learn how Angular responds to user actions such as clicks, input, submit, and keyboard events.",
      ar: "تعرف على كيفية استجابة Angular لأفعال المستخدم مثل Click وInput وSubmit وأحداث لوحة المفاتيح.",
    },
    body: {
      en: "Event binding uses parentheses to listen for DOM events. When an event happens, Angular can call a component method or execute an expression.",
      ar: "يستخدم Event Binding الأقواس العادية للاستماع إلى DOM Events. وعند حدوث الحدث يستطيع Angular استدعاء Method داخل الـComponent أو تنفيذ Expression.",
    },
    example: {
      code: `<button (click)="showMessage()">
  Click Me
</button>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<button (click)="showMessage()">
  Click Me
</button>`,
    },
    quiz: [
      {
        question: {
          en: "Which syntax is used for event binding?",
          ar: "ما الصيغة المستخدمة في Event Binding؟",
        },
        options: [
          {
            en: "(click)",
            ar: "(click)",
          },
          {
            en: "[click]",
            ar: "[click]",
          },
          {
            en: "{click}",
            ar: "{click}",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Event Binding",
            ar: "ربط الأحداث Event Binding",
          },
          {
            en: "Two-Way Data Binding",
            ar: "ربط البيانات ثنائي الاتجاه",
          },
          {
            en: "Directives",
            ar: "التوجيهات Directives",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Event binding uses parentheses to listen for DOM events. When an event happens, Angular can call a component method or execute an expression.",
            ar: "يستخدم Event Binding الأقواس العادية للاستماع إلى DOM Events. وعند حدوث الحدث يستطيع Angular استدعاء Method داخل الـComponent أو تنفيذ Expression.",
          },
          {
            en: "Two-way binding allows data to move from the component to the view and from the view back to the component. The ngModel directive is commonly used with the [(ngModel)] syntax in template-driven forms.",
            ar: "يسمح Two-Way Binding بانتقال البيانات من الـComponent إلى الواجهة ومن الواجهة إلى الـComponent. ويُستخدم ngModel بشكل شائع مع الصيغة [(ngModel)] في Template-driven Forms.",
          },
          {
            en: "Directives extend HTML with Angular behavior. Structural techniques can control what is rendered, while attribute directives can modify the behavior or appearance of existing elements.",
            ar: "تضيف Directives سلوكًا خاصًا إلى HTML. ويمكن استخدام الأساليب الهيكلية للتحكم في العناصر التي يتم عرضها، بينما تستطيع Attribute Directives تعديل سلوك أو مظهر العناصر.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular responds to user actions such as clicks, input, submit, and keyboard events.",
            ar: "تعرف على كيفية استجابة Angular لأفعال المستخدم مثل Click وInput وSubmit وأحداث لوحة المفاتيح.",
          },
          {
            en: "Learn how Angular keeps component data and form controls synchronized.",
            ar: "تعرف على كيفية إبقاء بيانات الـComponent وحقول Forms متزامنة.",
          },
          {
            en: "Learn how Angular directives change the behavior, appearance, or rendering of elements.",
            ar: "تعرف على كيفية تغيير Directives لسلوك أو شكل أو طريقة عرض العناصر.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Event binding",
            ar: "Event Binding",
          },
          {
            en: "Two-way binding",
            ar: "الربط ثنائي الاتجاه",
          },
          {
            en: "Directive",
            ar: "Directive",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "(click)",
            ar: "(click)",
          },
          {
            en: "[(ngModel)]",
            ar: "[(ngModel)]",
          },
          {
            en: "*ngIf",
            ar: "*ngIf",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-10",
    title: {
      en: "Two-Way Data Binding",
      ar: "ربط البيانات ثنائي الاتجاه",
    },
    description: {
      en: "Learn how Angular keeps component data and form controls synchronized.",
      ar: "تعرف على كيفية إبقاء بيانات الـComponent وحقول Forms متزامنة.",
    },
    body: {
      en: "Two-way binding allows data to move from the component to the view and from the view back to the component. The ngModel directive is commonly used with the [(ngModel)] syntax in template-driven forms.",
      ar: "يسمح Two-Way Binding بانتقال البيانات من الـComponent إلى الواجهة ومن الواجهة إلى الـComponent. ويُستخدم ngModel بشكل شائع مع الصيغة [(ngModel)] في Template-driven Forms.",
    },
    example: {
      code: `<input
  name="username"
  [(ngModel)]="username">

<p>Hello {{ username }}</p>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<input
  name="username"
  [(ngModel)]="username">

<p>Hello {{ username }}</p>`,
    },
    quiz: [
      {
        question: {
          en: "What does two-way binding allow?",
          ar: "ماذا يسمح Two-Way Binding؟",
        },
        options: [
          {
            en: "Data to flow in both directions",
            ar: "انتقال البيانات في الاتجاهين",
          },
          {
            en: "Only CSS to change",
            ar: "تغيير CSS فقط",
          },
          {
            en: "Only HTML to load",
            ar: "تحميل HTML فقط",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Two-Way Data Binding",
            ar: "ربط البيانات ثنائي الاتجاه",
          },
          {
            en: "Directives",
            ar: "التوجيهات Directives",
          },
          {
            en: "Conditional Rendering",
            ar: "العرض الشرطي",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Two-way binding allows data to move from the component to the view and from the view back to the component. The ngModel directive is commonly used with the [(ngModel)] syntax in template-driven forms.",
            ar: "يسمح Two-Way Binding بانتقال البيانات من الـComponent إلى الواجهة ومن الواجهة إلى الـComponent. ويُستخدم ngModel بشكل شائع مع الصيغة [(ngModel)] في Template-driven Forms.",
          },
          {
            en: "Directives extend HTML with Angular behavior. Structural techniques can control what is rendered, while attribute directives can modify the behavior or appearance of existing elements.",
            ar: "تضيف Directives سلوكًا خاصًا إلى HTML. ويمكن استخدام الأساليب الهيكلية للتحكم في العناصر التي يتم عرضها، بينما تستطيع Attribute Directives تعديل سلوك أو مظهر العناصر.",
          },
          {
            en: "Conditional rendering is useful when the interface should change according to state. Examples include authentication screens, loading states, permissions, empty results, and error messages.",
            ar: "يُستخدم العرض الشرطي عندما يجب أن تتغير الواجهة بناءً على حالة معينة. ومن أمثلته صفحات تسجيل الدخول وحالات Loading والصلاحيات والنتائج الفارغة ورسائل الخطأ.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular keeps component data and form controls synchronized.",
            ar: "تعرف على كيفية إبقاء بيانات الـComponent وحقول Forms متزامنة.",
          },
          {
            en: "Learn how Angular directives change the behavior, appearance, or rendering of elements.",
            ar: "تعرف على كيفية تغيير Directives لسلوك أو شكل أو طريقة عرض العناصر.",
          },
          {
            en: "Learn how Angular displays different content depending on application state.",
            ar: "تعرف على كيفية عرض Angular لمحتوى مختلف بناءً على حالة التطبيق.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Two-way binding",
            ar: "الربط ثنائي الاتجاه",
          },
          {
            en: "Directive",
            ar: "Directive",
          },
          {
            en: "Conditional rendering",
            ar: "العرض الشرطي",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "[(ngModel)]",
            ar: "[(ngModel)]",
          },
          {
            en: "*ngIf",
            ar: "*ngIf",
          },
          {
            en: "@if",
            ar: "@if",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-11",
    title: {
      en: "Directives",
      ar: "التوجيهات Directives",
    },
    description: {
      en: "Learn how Angular directives change the behavior, appearance, or rendering of elements.",
      ar: "تعرف على كيفية تغيير Directives لسلوك أو شكل أو طريقة عرض العناصر.",
    },
    body: {
      en: "Directives extend HTML with Angular behavior. Structural techniques can control what is rendered, while attribute directives can modify the behavior or appearance of existing elements.",
      ar: "تضيف Directives سلوكًا خاصًا إلى HTML. ويمكن استخدام الأساليب الهيكلية للتحكم في العناصر التي يتم عرضها، بينما تستطيع Attribute Directives تعديل سلوك أو مظهر العناصر.",
    },
    example: {
      code: `<p *ngIf="isLoggedIn">
  Welcome back!
</p>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<p *ngIf="isLoggedIn">
  Welcome back!
</p>`,
    },
    quiz: [
      {
        question: {
          en: "What can Angular directives do?",
          ar: "ماذا يمكن أن تفعل Angular Directives؟",
        },
        options: [
          {
            en: "Change element behavior or structure",
            ar: "تغيير سلوك أو بنية العناصر",
          },
          {
            en: "Create databases",
            ar: "إنشاء قواعد بيانات",
          },
          {
            en: "Replace JavaScript completely",
            ar: "استبدال JavaScript بالكامل",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Directives",
            ar: "التوجيهات Directives",
          },
          {
            en: "Conditional Rendering",
            ar: "العرض الشرطي",
          },
          {
            en: "Rendering Lists",
            ar: "عرض القوائم",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Directives extend HTML with Angular behavior. Structural techniques can control what is rendered, while attribute directives can modify the behavior or appearance of existing elements.",
            ar: "تضيف Directives سلوكًا خاصًا إلى HTML. ويمكن استخدام الأساليب الهيكلية للتحكم في العناصر التي يتم عرضها، بينما تستطيع Attribute Directives تعديل سلوك أو مظهر العناصر.",
          },
          {
            en: "Conditional rendering is useful when the interface should change according to state. Examples include authentication screens, loading states, permissions, empty results, and error messages.",
            ar: "يُستخدم العرض الشرطي عندما يجب أن تتغير الواجهة بناءً على حالة معينة. ومن أمثلته صفحات تسجيل الدخول وحالات Loading والصلاحيات والنتائج الفارغة ورسائل الخطأ.",
          },
          {
            en: "List rendering is essential when displaying products, users, messages, tasks, or any collection of data. Angular can repeat a template for each item and efficiently track changes.",
            ar: "يُعد عرض القوائم أساسيًا عند عرض Products أو Users أو Messages أو Tasks أو أي مجموعة من البيانات. يستطيع Angular تكرار الـTemplate لكل عنصر والتعامل مع التغييرات بكفاءة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular directives change the behavior, appearance, or rendering of elements.",
            ar: "تعرف على كيفية تغيير Directives لسلوك أو شكل أو طريقة عرض العناصر.",
          },
          {
            en: "Learn how Angular displays different content depending on application state.",
            ar: "تعرف على كيفية عرض Angular لمحتوى مختلف بناءً على حالة التطبيق.",
          },
          {
            en: "Learn how Angular renders repeated content from arrays and collections.",
            ar: "تعرف على كيفية عرض العناصر المتكررة من Arrays وCollections.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Directive",
            ar: "Directive",
          },
          {
            en: "Conditional rendering",
            ar: "العرض الشرطي",
          },
          {
            en: "List rendering",
            ar: "عرض القوائم",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "*ngIf",
            ar: "*ngIf",
          },
          {
            en: "@if",
            ar: "@if",
          },
          {
            en: "@for",
            ar: "@for",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-12",
    title: {
      en: "Conditional Rendering",
      ar: "العرض الشرطي",
    },
    description: {
      en: "Learn how Angular displays different content depending on application state.",
      ar: "تعرف على كيفية عرض Angular لمحتوى مختلف بناءً على حالة التطبيق.",
    },
    body: {
      en: "Conditional rendering is useful when the interface should change according to state. Examples include authentication screens, loading states, permissions, empty results, and error messages.",
      ar: "يُستخدم العرض الشرطي عندما يجب أن تتغير الواجهة بناءً على حالة معينة. ومن أمثلته صفحات تسجيل الدخول وحالات Loading والصلاحيات والنتائج الفارغة ورسائل الخطأ.",
    },
    example: {
      code: `<div *ngIf="isLoggedIn">
  Dashboard
</div>

<div *ngIf="!isLoggedIn">
  Please log in.
</div>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<div *ngIf="isLoggedIn">
  Dashboard
</div>

<div *ngIf="!isLoggedIn">
  Please log in.
</div>`,
    },
    quiz: [
      {
        question: {
          en: "What is conditional rendering used for?",
          ar: "فيما يستخدم العرض الشرطي؟",
        },
        options: [
          {
            en: "Displaying content based on a condition",
            ar: "عرض المحتوى بناءً على شرط",
          },
          {
            en: "Changing the browser",
            ar: "تغيير المتصفح",
          },
          {
            en: "Creating CSS files",
            ar: "إنشاء ملفات CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Conditional Rendering",
            ar: "العرض الشرطي",
          },
          {
            en: "Rendering Lists",
            ar: "عرض القوائم",
          },
          {
            en: "Component Communication",
            ar: "التواصل بين المكونات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Conditional rendering is useful when the interface should change according to state. Examples include authentication screens, loading states, permissions, empty results, and error messages.",
            ar: "يُستخدم العرض الشرطي عندما يجب أن تتغير الواجهة بناءً على حالة معينة. ومن أمثلته صفحات تسجيل الدخول وحالات Loading والصلاحيات والنتائج الفارغة ورسائل الخطأ.",
          },
          {
            en: "List rendering is essential when displaying products, users, messages, tasks, or any collection of data. Angular can repeat a template for each item and efficiently track changes.",
            ar: "يُعد عرض القوائم أساسيًا عند عرض Products أو Users أو Messages أو Tasks أو أي مجموعة من البيانات. يستطيع Angular تكرار الـTemplate لكل عنصر والتعامل مع التغييرات بكفاءة.",
          },
          {
            en: "Component communication becomes important as applications grow. A parent can pass data to a child through inputs, while a child can notify its parent through outputs and emitted events.",
            ar: "يصبح التواصل بين Components مهمًا مع زيادة حجم التطبيق. يستطيع الـParent تمرير البيانات إلى الـChild باستخدام Inputs، بينما يستطيع الـChild إرسال Events إلى الـParent باستخدام Outputs.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular displays different content depending on application state.",
            ar: "تعرف على كيفية عرض Angular لمحتوى مختلف بناءً على حالة التطبيق.",
          },
          {
            en: "Learn how Angular renders repeated content from arrays and collections.",
            ar: "تعرف على كيفية عرض العناصر المتكررة من Arrays وCollections.",
          },
          {
            en: "Learn how Angular components communicate and exchange information.",
            ar: "تعرف على كيفية تواصل Components في Angular وتبادل البيانات والأحداث.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Conditional rendering",
            ar: "العرض الشرطي",
          },
          {
            en: "List rendering",
            ar: "عرض القوائم",
          },
          {
            en: "Component communication",
            ar: "التواصل بين المكوّنات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "@if",
            ar: "@if",
          },
          {
            en: "@for",
            ar: "@for",
          },
          {
            en: "@Input",
            ar: "@Input",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-13",
    title: {
      en: "Rendering Lists",
      ar: "عرض القوائم",
    },
    description: {
      en: "Learn how Angular renders repeated content from arrays and collections.",
      ar: "تعرف على كيفية عرض العناصر المتكررة من Arrays وCollections.",
    },
    body: {
      en: "List rendering is essential when displaying products, users, messages, tasks, or any collection of data. Angular can repeat a template for each item and efficiently track changes.",
      ar: "يُعد عرض القوائم أساسيًا عند عرض Products أو Users أو Messages أو Tasks أو أي مجموعة من البيانات. يستطيع Angular تكرار الـTemplate لكل عنصر والتعامل مع التغييرات بكفاءة.",
    },
    example: {
      code: `<ul>
  <li *ngFor="let user of users">
    {{ user.name }}
  </li>
</ul>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<ul>
  <li *ngFor="let user of users">
    {{ user.name }}
  </li>
</ul>`,
    },
    quiz: [
      {
        question: {
          en: "Which directive traditionally renders a list?",
          ar: "أي Directive تستخدم تقليديًا لعرض القائمة؟",
        },
        options: [
          {
            en: "*ngFor",
            ar: "*ngFor",
          },
          {
            en: "*ngList",
            ar: "*ngList",
          },
          {
            en: "*repeat",
            ar: "*repeat",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Rendering Lists",
            ar: "عرض القوائم",
          },
          {
            en: "Component Communication",
            ar: "التواصل بين المكونات",
          },
          {
            en: "Inputs",
            ar: "Inputs",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "List rendering is essential when displaying products, users, messages, tasks, or any collection of data. Angular can repeat a template for each item and efficiently track changes.",
            ar: "يُعد عرض القوائم أساسيًا عند عرض Products أو Users أو Messages أو Tasks أو أي مجموعة من البيانات. يستطيع Angular تكرار الـTemplate لكل عنصر والتعامل مع التغييرات بكفاءة.",
          },
          {
            en: "Component communication becomes important as applications grow. A parent can pass data to a child through inputs, while a child can notify its parent through outputs and emitted events.",
            ar: "يصبح التواصل بين Components مهمًا مع زيادة حجم التطبيق. يستطيع الـParent تمرير البيانات إلى الـChild باستخدام Inputs، بينما يستطيع الـChild إرسال Events إلى الـParent باستخدام Outputs.",
          },
          {
            en: "An input is a public value that a child component can receive from its parent. This makes components reusable because the parent can provide different values to the same component.",
            ar: "الـInput هو قيمة يستطيع الـChild Component استقبالها من الـParent. وهذا يجعل Components قابلة لإعادة الاستخدام لأن الـParent يستطيع إرسال قيم مختلفة إلى نفس المكون.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular renders repeated content from arrays and collections.",
            ar: "تعرف على كيفية عرض العناصر المتكررة من Arrays وCollections.",
          },
          {
            en: "Learn how Angular components communicate and exchange information.",
            ar: "تعرف على كيفية تواصل Components في Angular وتبادل البيانات والأحداث.",
          },
          {
            en: "Learn how parent components pass data into child components using inputs.",
            ar: "تعرف على كيفية تمرير البيانات من Parent Component إلى Child Component باستخدام Inputs.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "List rendering",
            ar: "عرض القوائم",
          },
          {
            en: "Component communication",
            ar: "التواصل بين المكوّنات",
          },
          {
            en: "Input",
            ar: "Input",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "@for",
            ar: "@for",
          },
          {
            en: "@Input",
            ar: "@Input",
          },
          {
            en: "input()",
            ar: "input()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-14",
    title: {
      en: "Component Communication",
      ar: "التواصل بين المكونات",
    },
    description: {
      en: "Learn how Angular components communicate and exchange information.",
      ar: "تعرف على كيفية تواصل Components في Angular وتبادل البيانات والأحداث.",
    },
    body: {
      en: "Component communication becomes important as applications grow. A parent can pass data to a child through inputs, while a child can notify its parent through outputs and emitted events.",
      ar: "يصبح التواصل بين Components مهمًا مع زيادة حجم التطبيق. يستطيع الـParent تمرير البيانات إلى الـChild باستخدام Inputs، بينما يستطيع الـChild إرسال Events إلى الـParent باستخدام Outputs.",
    },
    example: {
      code: `@Input()
title = '';

@Output()
selected = new EventEmitter<string>();`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `@Input()
title = '';

@Output()
selected = new EventEmitter<string>();`,
    },
    quiz: [
      {
        question: {
          en: "Which decorators are commonly used for component communication?",
          ar: "ما الـDecorators المستخدمة عادةً للتواصل بين المكونات؟",
        },
        options: [
          {
            en: "@Input and @Output",
            ar: "@Input و @Output",
          },
          {
            en: "@CSS and @HTML",
            ar: "@CSS و @HTML",
          },
          {
            en: "@Route and @Style",
            ar: "@Route و @Style",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Component Communication",
            ar: "التواصل بين المكونات",
          },
          {
            en: "Inputs",
            ar: "Inputs",
          },
          {
            en: "Outputs",
            ar: "Outputs",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Component communication becomes important as applications grow. A parent can pass data to a child through inputs, while a child can notify its parent through outputs and emitted events.",
            ar: "يصبح التواصل بين Components مهمًا مع زيادة حجم التطبيق. يستطيع الـParent تمرير البيانات إلى الـChild باستخدام Inputs، بينما يستطيع الـChild إرسال Events إلى الـParent باستخدام Outputs.",
          },
          {
            en: "An input is a public value that a child component can receive from its parent. This makes components reusable because the parent can provide different values to the same component.",
            ar: "الـInput هو قيمة يستطيع الـChild Component استقبالها من الـParent. وهذا يجعل Components قابلة لإعادة الاستخدام لأن الـParent يستطيع إرسال قيم مختلفة إلى نفس المكون.",
          },
          {
            en: "Outputs are commonly implemented with EventEmitter. The child emits an event and the parent listens to that event. This creates a clear communication path from child to parent.",
            ar: "تُستخدم Outputs غالبًا مع EventEmitter. يقوم الـChild بإطلاق Event ويستمع الـParent إلى هذا الحدث. وهذا يوفر طريقة واضحة للتواصل من Child إلى Parent.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular components communicate and exchange information.",
            ar: "تعرف على كيفية تواصل Components في Angular وتبادل البيانات والأحداث.",
          },
          {
            en: "Learn how parent components pass data into child components using inputs.",
            ar: "تعرف على كيفية تمرير البيانات من Parent Component إلى Child Component باستخدام Inputs.",
          },
          {
            en: "Learn how child components send events back to their parent components.",
            ar: "تعرف على كيفية إرسال Child Components للأحداث إلى Parent Components.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Component communication",
            ar: "التواصل بين المكوّنات",
          },
          {
            en: "Input",
            ar: "Input",
          },
          {
            en: "Output",
            ar: "Output",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "@Input",
            ar: "@Input",
          },
          {
            en: "input()",
            ar: "input()",
          },
          {
            en: "@Output",
            ar: "@Output",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-15",
    title: {
      en: "Inputs",
      ar: "Inputs",
    },
    description: {
      en: "Learn how parent components pass data into child components using inputs.",
      ar: "تعرف على كيفية تمرير البيانات من Parent Component إلى Child Component باستخدام Inputs.",
    },
    body: {
      en: "An input is a public value that a child component can receive from its parent. This makes components reusable because the parent can provide different values to the same component.",
      ar: "الـInput هو قيمة يستطيع الـChild Component استقبالها من الـParent. وهذا يجعل Components قابلة لإعادة الاستخدام لأن الـParent يستطيع إرسال قيم مختلفة إلى نفس المكون.",
    },
    example: {
      code: `@Input()
userName = '';

<h2>{{ userName }}</h2>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `@Input()
userName = '';

<h2>{{ userName }}</h2>`,
    },
    quiz: [
      {
        question: {
          en: "What is an input mainly used for?",
          ar: "فيما يستخدم Input بشكل أساسي؟",
        },
        options: [
          {
            en: "Receiving data from a parent component",
            ar: "استقبال البيانات من الـParent Component",
          },
          {
            en: "Creating a database",
            ar: "إنشاء قاعدة بيانات",
          },
          {
            en: "Styling a page",
            ar: "تنسيق الصفحة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Inputs",
            ar: "Inputs",
          },
          {
            en: "Outputs",
            ar: "Outputs",
          },
          {
            en: "Services",
            ar: "الخدمات Services",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "An input is a public value that a child component can receive from its parent. This makes components reusable because the parent can provide different values to the same component.",
            ar: "الـInput هو قيمة يستطيع الـChild Component استقبالها من الـParent. وهذا يجعل Components قابلة لإعادة الاستخدام لأن الـParent يستطيع إرسال قيم مختلفة إلى نفس المكون.",
          },
          {
            en: "Outputs are commonly implemented with EventEmitter. The child emits an event and the parent listens to that event. This creates a clear communication path from child to parent.",
            ar: "تُستخدم Outputs غالبًا مع EventEmitter. يقوم الـChild بإطلاق Event ويستمع الـParent إلى هذا الحدث. وهذا يوفر طريقة واضحة للتواصل من Child إلى Parent.",
          },
          {
            en: "Services are classes designed to contain reusable logic. They are commonly used for API communication, authentication, shared data, business logic, logging, and other functionality that should not live directly inside a component.",
            ar: "الـServices هي Classes تحتوي على منطق قابل لإعادة الاستخدام. تُستخدم عادةً للتعامل مع APIs والمصادقة والبيانات المشتركة وBusiness Logic والـLogging وغيرها من الوظائف التي لا يفضل وضعها داخل Component.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how parent components pass data into child components using inputs.",
            ar: "تعرف على كيفية تمرير البيانات من Parent Component إلى Child Component باستخدام Inputs.",
          },
          {
            en: "Learn how child components send events back to their parent components.",
            ar: "تعرف على كيفية إرسال Child Components للأحداث إلى Parent Components.",
          },
          {
            en: "Learn how Angular services organize reusable application logic and shared functionality.",
            ar: "تعرف على كيفية استخدام Services لتنظيم المنطق المشترك والقابل لإعادة الاستخدام.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Input",
            ar: "Input",
          },
          {
            en: "Output",
            ar: "Output",
          },
          {
            en: "Service",
            ar: "Service",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "input()",
            ar: "input()",
          },
          {
            en: "@Output",
            ar: "@Output",
          },
          {
            en: "@Injectable",
            ar: "@Injectable",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-16",
    title: {
      en: "Outputs",
      ar: "Outputs",
    },
    description: {
      en: "Learn how child components send events back to their parent components.",
      ar: "تعرف على كيفية إرسال Child Components للأحداث إلى Parent Components.",
    },
    body: {
      en: "Outputs are commonly implemented with EventEmitter. The child emits an event and the parent listens to that event. This creates a clear communication path from child to parent.",
      ar: "تُستخدم Outputs غالبًا مع EventEmitter. يقوم الـChild بإطلاق Event ويستمع الـParent إلى هذا الحدث. وهذا يوفر طريقة واضحة للتواصل من Child إلى Parent.",
    },
    example: {
      code: `@Output()
selected = new EventEmitter<string>();

selectItem() {
  this.selected.emit('Angular');
}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `@Output()
selected = new EventEmitter<string>();

selectItem() {
  this.selected.emit('Angular');
}`,
    },
    quiz: [
      {
        question: {
          en: "What is an output commonly used for?",
          ar: "فيما يستخدم Output عادةً؟",
        },
        options: [
          {
            en: "Sending events from child to parent",
            ar: "إرسال الأحداث من Child إلى Parent",
          },
          {
            en: "Creating CSS",
            ar: "إنشاء CSS",
          },
          {
            en: "Connecting to a database",
            ar: "الاتصال بقاعدة بيانات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Outputs",
            ar: "Outputs",
          },
          {
            en: "Services",
            ar: "الخدمات Services",
          },
          {
            en: "Dependency Injection",
            ar: "Dependency Injection — حقن الاعتمادات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Outputs are commonly implemented with EventEmitter. The child emits an event and the parent listens to that event. This creates a clear communication path from child to parent.",
            ar: "تُستخدم Outputs غالبًا مع EventEmitter. يقوم الـChild بإطلاق Event ويستمع الـParent إلى هذا الحدث. وهذا يوفر طريقة واضحة للتواصل من Child إلى Parent.",
          },
          {
            en: "Services are classes designed to contain reusable logic. They are commonly used for API communication, authentication, shared data, business logic, logging, and other functionality that should not live directly inside a component.",
            ar: "الـServices هي Classes تحتوي على منطق قابل لإعادة الاستخدام. تُستخدم عادةً للتعامل مع APIs والمصادقة والبيانات المشتركة وBusiness Logic والـLogging وغيرها من الوظائف التي لا يفضل وضعها داخل Component.",
          },
          {
            en: "Dependency Injection allows a class to receive the objects it needs instead of creating them itself. This improves reusability, testing, and separation of responsibilities.",
            ar: "يسمح Dependency Injection للـClass باستقبال الأشياء التي يحتاج إليها بدلًا من إنشائها بنفسه. وهذا يحسن إعادة الاستخدام والاختبار وفصل المسؤوليات.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how child components send events back to their parent components.",
            ar: "تعرف على كيفية إرسال Child Components للأحداث إلى Parent Components.",
          },
          {
            en: "Learn how Angular services organize reusable application logic and shared functionality.",
            ar: "تعرف على كيفية استخدام Services لتنظيم المنطق المشترك والقابل لإعادة الاستخدام.",
          },
          {
            en: "Understand how Angular provides required services and dependencies to classes.",
            ar: "افهم كيف يوفر Angular الـServices والاعتمادات التي تحتاج إليها الـClasses.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Output",
            ar: "Output",
          },
          {
            en: "Service",
            ar: "Service",
          },
          {
            en: "Dependency Injection",
            ar: "Dependency Injection",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "@Output",
            ar: "@Output",
          },
          {
            en: "@Injectable",
            ar: "@Injectable",
          },
          {
            en: "constructor injection",
            ar: "constructor injection",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-17",
    title: {
      en: "Services",
      ar: "الخدمات Services",
    },
    description: {
      en: "Learn how Angular services organize reusable application logic and shared functionality.",
      ar: "تعرف على كيفية استخدام Services لتنظيم المنطق المشترك والقابل لإعادة الاستخدام.",
    },
    body: {
      en: "Services are classes designed to contain reusable logic. They are commonly used for API communication, authentication, shared data, business logic, logging, and other functionality that should not live directly inside a component.",
      ar: "الـServices هي Classes تحتوي على منطق قابل لإعادة الاستخدام. تُستخدم عادةً للتعامل مع APIs والمصادقة والبيانات المشتركة وBusiness Logic والـLogging وغيرها من الوظائف التي لا يفضل وضعها داخل Component.",
    },
    example: {
      code: `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers() {
    return ['Ali', 'Mido', 'Sara'];
  }

}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers() {
    return ['Ali', 'Mido', 'Sara'];
  }

}`,
    },
    quiz: [
      {
        question: {
          en: "Why are Angular services commonly used?",
          ar: "لماذا تستخدم Angular Services؟",
        },
        options: [
          {
            en: "To share reusable logic and data",
            ar: "لمشاركة المنطق والبيانات القابلة لإعادة الاستخدام",
          },
          {
            en: "To style buttons",
            ar: "لتنسيق الأزرار",
          },
          {
            en: "To create HTML tags",
            ar: "لإنشاء HTML Tags",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Services",
            ar: "الخدمات Services",
          },
          {
            en: "Dependency Injection",
            ar: "Dependency Injection — حقن الاعتمادات",
          },
          {
            en: "Angular Routing",
            ar: "التوجيه Routing",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Services are classes designed to contain reusable logic. They are commonly used for API communication, authentication, shared data, business logic, logging, and other functionality that should not live directly inside a component.",
            ar: "الـServices هي Classes تحتوي على منطق قابل لإعادة الاستخدام. تُستخدم عادةً للتعامل مع APIs والمصادقة والبيانات المشتركة وBusiness Logic والـLogging وغيرها من الوظائف التي لا يفضل وضعها داخل Component.",
          },
          {
            en: "Dependency Injection allows a class to receive the objects it needs instead of creating them itself. This improves reusability, testing, and separation of responsibilities.",
            ar: "يسمح Dependency Injection للـClass باستقبال الأشياء التي يحتاج إليها بدلًا من إنشائها بنفسه. وهذا يحسن إعادة الاستخدام والاختبار وفصل المسؤوليات.",
          },
          {
            en: "Angular Router maps URLs to components. It allows applications to behave like multi-page experiences while remaining a single-page application. Routes can also use guards, parameters, child routes, and lazy loading.",
            ar: "يقوم Angular Router بربط URLs بالمكونات. ويسمح للتطبيق بالتصرف كتطبيق يحتوي على صفحات متعددة مع بقائه Single-Page Application. ويمكن أيضًا استخدام Guards وParameters وChild Routes وLazy Loading.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular services organize reusable application logic and shared functionality.",
            ar: "تعرف على كيفية استخدام Services لتنظيم المنطق المشترك والقابل لإعادة الاستخدام.",
          },
          {
            en: "Understand how Angular provides required services and dependencies to classes.",
            ar: "افهم كيف يوفر Angular الـServices والاعتمادات التي تحتاج إليها الـClasses.",
          },
          {
            en: "Learn how Angular Router allows users to navigate between application views.",
            ar: "تعرف على كيفية استخدام Angular Router للتنقل بين صفحات وواجهات التطبيق.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Service",
            ar: "Service",
          },
          {
            en: "Dependency Injection",
            ar: "Dependency Injection",
          },
          {
            en: "Routing",
            ar: "Routing",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "@Injectable",
            ar: "@Injectable",
          },
          {
            en: "constructor injection",
            ar: "constructor injection",
          },
          {
            en: "Router",
            ar: "Router",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-18",
    title: {
      en: "Dependency Injection",
      ar: "Dependency Injection — حقن الاعتمادات",
    },
    description: {
      en: "Understand how Angular provides required services and dependencies to classes.",
      ar: "افهم كيف يوفر Angular الـServices والاعتمادات التي تحتاج إليها الـClasses.",
    },
    body: {
      en: "Dependency Injection allows a class to receive the objects it needs instead of creating them itself. This improves reusability, testing, and separation of responsibilities.",
      ar: "يسمح Dependency Injection للـClass باستقبال الأشياء التي يحتاج إليها بدلًا من إنشائها بنفسه. وهذا يحسن إعادة الاستخدام والاختبار وفصل المسؤوليات.",
    },
    example: {
      code: `constructor(
  private userService: UserService
) {}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `constructor(
  private userService: UserService
) {}`,
    },
    quiz: [
      {
        question: {
          en: "What does dependency injection help with?",
          ar: "في ماذا يساعد Dependency Injection؟",
        },
        options: [
          {
            en: "Providing required dependencies to a class",
            ar: "توفير الاعتمادات المطلوبة للـClass",
          },
          {
            en: "Writing CSS animations",
            ar: "كتابة CSS Animations",
          },
          {
            en: "Creating HTML elements",
            ar: "إنشاء عناصر HTML",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Dependency Injection",
            ar: "Dependency Injection — حقن الاعتمادات",
          },
          {
            en: "Angular Routing",
            ar: "التوجيه Routing",
          },
          {
            en: "Route Parameters",
            ar: "معاملات المسارات Route Parameters",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Dependency Injection allows a class to receive the objects it needs instead of creating them itself. This improves reusability, testing, and separation of responsibilities.",
            ar: "يسمح Dependency Injection للـClass باستقبال الأشياء التي يحتاج إليها بدلًا من إنشائها بنفسه. وهذا يحسن إعادة الاستخدام والاختبار وفصل المسؤوليات.",
          },
          {
            en: "Angular Router maps URLs to components. It allows applications to behave like multi-page experiences while remaining a single-page application. Routes can also use guards, parameters, child routes, and lazy loading.",
            ar: "يقوم Angular Router بربط URLs بالمكونات. ويسمح للتطبيق بالتصرف كتطبيق يحتوي على صفحات متعددة مع بقائه Single-Page Application. ويمكن أيضًا استخدام Guards وParameters وChild Routes وLazy Loading.",
          },
          {
            en: "Route parameters allow a route to contain dynamic values. A common example is a user ID or product ID. The activated route can be used to read these values inside a component.",
            ar: "تسمح Route Parameters بوضع قيم ديناميكية داخل الـURL. ومن الأمثلة الشائعة User ID أو Product ID. ويمكن استخدام ActivatedRoute لقراءة هذه القيم داخل الـComponent.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Understand how Angular provides required services and dependencies to classes.",
            ar: "افهم كيف يوفر Angular الـServices والاعتمادات التي تحتاج إليها الـClasses.",
          },
          {
            en: "Learn how Angular Router allows users to navigate between application views.",
            ar: "تعرف على كيفية استخدام Angular Router للتنقل بين صفحات وواجهات التطبيق.",
          },
          {
            en: "Learn how to pass dynamic values through URLs using route parameters.",
            ar: "تعرف على كيفية تمرير قيم ديناميكية من خلال URLs باستخدام Route Parameters.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Dependency Injection",
            ar: "Dependency Injection",
          },
          {
            en: "Routing",
            ar: "Routing",
          },
          {
            en: "Route parameters",
            ar: "معاملات المسار",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "constructor injection",
            ar: "constructor injection",
          },
          {
            en: "Router",
            ar: "Router",
          },
          {
            en: "ActivatedRoute",
            ar: "ActivatedRoute",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-19",
    title: {
      en: "Angular Routing",
      ar: "التوجيه Routing",
    },
    description: {
      en: "Learn how Angular Router allows users to navigate between application views.",
      ar: "تعرف على كيفية استخدام Angular Router للتنقل بين صفحات وواجهات التطبيق.",
    },
    body: {
      en: "Angular Router maps URLs to components. It allows applications to behave like multi-page experiences while remaining a single-page application. Routes can also use guards, parameters, child routes, and lazy loading.",
      ar: "يقوم Angular Router بربط URLs بالمكونات. ويسمح للتطبيق بالتصرف كتطبيق يحتوي على صفحات متعددة مع بقائه Single-Page Application. ويمكن أيضًا استخدام Guards وParameters وChild Routes وLazy Loading.",
    },
    example: {
      code: `import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];`,
    },
    quiz: [
      {
        question: {
          en: "What is Angular Router used for?",
          ar: "فيما يستخدم Angular Router؟",
        },
        options: [
          {
            en: "Navigation between application views",
            ar: "التنقل بين واجهات التطبيق",
          },
          {
            en: "Changing CSS colors",
            ar: "تغيير ألوان CSS",
          },
          {
            en: "Creating databases",
            ar: "إنشاء قواعد بيانات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Angular Routing",
            ar: "التوجيه Routing",
          },
          {
            en: "Route Parameters",
            ar: "معاملات المسارات Route Parameters",
          },
          {
            en: "Forms",
            ar: "النماذج Forms",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Angular Router maps URLs to components. It allows applications to behave like multi-page experiences while remaining a single-page application. Routes can also use guards, parameters, child routes, and lazy loading.",
            ar: "يقوم Angular Router بربط URLs بالمكونات. ويسمح للتطبيق بالتصرف كتطبيق يحتوي على صفحات متعددة مع بقائه Single-Page Application. ويمكن أيضًا استخدام Guards وParameters وChild Routes وLazy Loading.",
          },
          {
            en: "Route parameters allow a route to contain dynamic values. A common example is a user ID or product ID. The activated route can be used to read these values inside a component.",
            ar: "تسمح Route Parameters بوضع قيم ديناميكية داخل الـURL. ومن الأمثلة الشائعة User ID أو Product ID. ويمكن استخدام ActivatedRoute لقراءة هذه القيم داخل الـComponent.",
          },
          {
            en: "Angular provides template-driven and reactive forms. Forms allow developers to collect input, track control state, validate values, and respond to submission.",
            ar: "يوفر Angular نوعين أساسيين من Forms وهما Template-driven Forms وReactive Forms. وتسمح Forms بجمع البيانات وتتبع حالة الحقول والتحقق من القيم ومعالجة Submit.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular Router allows users to navigate between application views.",
            ar: "تعرف على كيفية استخدام Angular Router للتنقل بين صفحات وواجهات التطبيق.",
          },
          {
            en: "Learn how to pass dynamic values through URLs using route parameters.",
            ar: "تعرف على كيفية تمرير قيم ديناميكية من خلال URLs باستخدام Route Parameters.",
          },
          {
            en: "Learn the basics of handling user input and forms in Angular applications.",
            ar: "تعرف على أساسيات التعامل مع إدخال المستخدم والنماذج في Angular.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Routing",
            ar: "Routing",
          },
          {
            en: "Route parameters",
            ar: "معاملات المسار",
          },
          {
            en: "Angular Forms",
            ar: "نماذج Angular",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "Router",
            ar: "Router",
          },
          {
            en: "ActivatedRoute",
            ar: "ActivatedRoute",
          },
          {
            en: "FormControl",
            ar: "FormControl",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-20",
    title: {
      en: "Route Parameters",
      ar: "معاملات المسارات Route Parameters",
    },
    description: {
      en: "Learn how to pass dynamic values through URLs using route parameters.",
      ar: "تعرف على كيفية تمرير قيم ديناميكية من خلال URLs باستخدام Route Parameters.",
    },
    body: {
      en: "Route parameters allow a route to contain dynamic values. A common example is a user ID or product ID. The activated route can be used to read these values inside a component.",
      ar: "تسمح Route Parameters بوضع قيم ديناميكية داخل الـURL. ومن الأمثلة الشائعة User ID أو Product ID. ويمكن استخدام ActivatedRoute لقراءة هذه القيم داخل الـComponent.",
    },
    example: {
      code: `{
  path: 'users/:id',
  component: UserComponent
}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `{
  path: 'users/:id',
  component: UserComponent
}`,
    },
    quiz: [
      {
        question: {
          en: "What does :id represent in a route?",
          ar: "ماذا يمثل :id داخل الـRoute؟",
        },
        options: [
          {
            en: "A dynamic route parameter",
            ar: "Route Parameter ديناميكي",
          },
          {
            en: "A CSS selector",
            ar: "CSS Selector",
          },
          {
            en: "A component name",
            ar: "اسم Component",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Route Parameters",
            ar: "معاملات المسارات Route Parameters",
          },
          {
            en: "Forms",
            ar: "النماذج Forms",
          },
          {
            en: "Form Validation",
            ar: "التحقق من صحة النماذج",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Route parameters allow a route to contain dynamic values. A common example is a user ID or product ID. The activated route can be used to read these values inside a component.",
            ar: "تسمح Route Parameters بوضع قيم ديناميكية داخل الـURL. ومن الأمثلة الشائعة User ID أو Product ID. ويمكن استخدام ActivatedRoute لقراءة هذه القيم داخل الـComponent.",
          },
          {
            en: "Angular provides template-driven and reactive forms. Forms allow developers to collect input, track control state, validate values, and respond to submission.",
            ar: "يوفر Angular نوعين أساسيين من Forms وهما Template-driven Forms وReactive Forms. وتسمح Forms بجمع البيانات وتتبع حالة الحقول والتحقق من القيم ومعالجة Submit.",
          },
          {
            en: "Validation ensures that submitted data follows rules such as required fields, minimum length, maximum length, email format, and custom business rules. Angular exposes control states such as valid, invalid, touched, dirty, and pending.",
            ar: "يضمن Validation أن البيانات التي يدخلها المستخدم تتبع قواعد محددة مثل Required وMinimum Length وMaximum Length وصيغة Email والقواعد المخصصة. ويوفر Angular حالات مثل Valid وInvalid وTouched وDirty وPending.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how to pass dynamic values through URLs using route parameters.",
            ar: "تعرف على كيفية تمرير قيم ديناميكية من خلال URLs باستخدام Route Parameters.",
          },
          {
            en: "Learn the basics of handling user input and forms in Angular applications.",
            ar: "تعرف على أساسيات التعامل مع إدخال المستخدم والنماذج في Angular.",
          },
          {
            en: "Learn how Angular validates user input before accepting form data.",
            ar: "تعرف على كيفية التحقق من صحة بيانات المستخدم قبل قبول بيانات النموذج.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Route parameters",
            ar: "معاملات المسار",
          },
          {
            en: "Angular Forms",
            ar: "نماذج Angular",
          },
          {
            en: "Form validation",
            ar: "التحقق من صحة النموذج",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "ActivatedRoute",
            ar: "ActivatedRoute",
          },
          {
            en: "FormControl",
            ar: "FormControl",
          },
          {
            en: "Validators",
            ar: "Validators",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-21",
    title: {
      en: "Forms",
      ar: "النماذج Forms",
    },
    description: {
      en: "Learn the basics of handling user input and forms in Angular applications.",
      ar: "تعرف على أساسيات التعامل مع إدخال المستخدم والنماذج في Angular.",
    },
    body: {
      en: "Angular provides template-driven and reactive forms. Forms allow developers to collect input, track control state, validate values, and respond to submission.",
      ar: "يوفر Angular نوعين أساسيين من Forms وهما Template-driven Forms وReactive Forms. وتسمح Forms بجمع البيانات وتتبع حالة الحقول والتحقق من القيم ومعالجة Submit.",
    },
    example: {
      code: `<form (ngSubmit)="submitForm()">

  <input
    name="email"
    [(ngModel)]="email">

  <button type="submit">
    Send
  </button>

</form>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<form (ngSubmit)="submitForm()">

  <input
    name="email"
    [(ngModel)]="email">

  <button type="submit">
    Send
  </button>

</form>`,
    },
    quiz: [
      {
        question: {
          en: "What are Angular forms mainly used for?",
          ar: "فيما تستخدم Angular Forms؟",
        },
        options: [
          {
            en: "Handling and validating user input",
            ar: "التعامل مع إدخال المستخدم والتحقق منه",
          },
          {
            en: "Creating CSS layouts",
            ar: "إنشاء تخطيطات CSS",
          },
          {
            en: "Managing images",
            ar: "إدارة الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Forms",
            ar: "النماذج Forms",
          },
          {
            en: "Form Validation",
            ar: "التحقق من صحة النماذج",
          },
          {
            en: "HTTP Client",
            ar: "HTTP Client",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Angular provides template-driven and reactive forms. Forms allow developers to collect input, track control state, validate values, and respond to submission.",
            ar: "يوفر Angular نوعين أساسيين من Forms وهما Template-driven Forms وReactive Forms. وتسمح Forms بجمع البيانات وتتبع حالة الحقول والتحقق من القيم ومعالجة Submit.",
          },
          {
            en: "Validation ensures that submitted data follows rules such as required fields, minimum length, maximum length, email format, and custom business rules. Angular exposes control states such as valid, invalid, touched, dirty, and pending.",
            ar: "يضمن Validation أن البيانات التي يدخلها المستخدم تتبع قواعد محددة مثل Required وMinimum Length وMaximum Length وصيغة Email والقواعد المخصصة. ويوفر Angular حالات مثل Valid وInvalid وTouched وDirty وPending.",
          },
          {
            en: "HttpClient is Angular's standard tool for making HTTP requests. It can perform GET, POST, PUT, PATCH, and DELETE requests and works naturally with Observables.",
            ar: "يُعد HttpClient الأداة الأساسية في Angular لإرسال HTTP Requests. ويمكنه تنفيذ GET وPOST وPUT وPATCH وDELETE، ويعمل بشكل طبيعي مع Observables.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn the basics of handling user input and forms in Angular applications.",
            ar: "تعرف على أساسيات التعامل مع إدخال المستخدم والنماذج في Angular.",
          },
          {
            en: "Learn how Angular validates user input before accepting form data.",
            ar: "تعرف على كيفية التحقق من صحة بيانات المستخدم قبل قبول بيانات النموذج.",
          },
          {
            en: "Learn how Angular applications communicate with APIs and backend services.",
            ar: "تعرف على كيفية تواصل تطبيقات Angular مع APIs وخدمات الـBackend.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Angular Forms",
            ar: "نماذج Angular",
          },
          {
            en: "Form validation",
            ar: "التحقق من صحة النموذج",
          },
          {
            en: "HttpClient",
            ar: "HttpClient",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "FormControl",
            ar: "FormControl",
          },
          {
            en: "Validators",
            ar: "Validators",
          },
          {
            en: "HttpClient",
            ar: "HttpClient",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-22",
    title: {
      en: "Form Validation",
      ar: "التحقق من صحة النماذج",
    },
    description: {
      en: "Learn how Angular validates user input before accepting form data.",
      ar: "تعرف على كيفية التحقق من صحة بيانات المستخدم قبل قبول بيانات النموذج.",
    },
    body: {
      en: "Validation ensures that submitted data follows rules such as required fields, minimum length, maximum length, email format, and custom business rules. Angular exposes control states such as valid, invalid, touched, dirty, and pending.",
      ar: "يضمن Validation أن البيانات التي يدخلها المستخدم تتبع قواعد محددة مثل Required وMinimum Length وMaximum Length وصيغة Email والقواعد المخصصة. ويوفر Angular حالات مثل Valid وInvalid وTouched وDirty وPending.",
    },
    example: {
      code: `<input
  required
  minlength="3"
  name="username"
  [(ngModel)]="username"
  #usernameModel="ngModel">

<p *ngIf="usernameModel.invalid">
  Username is invalid.
</p>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<input
  required
  minlength="3"
  name="username"
  [(ngModel)]="username"
  #usernameModel="ngModel">

<p *ngIf="usernameModel.invalid">
  Username is invalid.
</p>`,
    },
    quiz: [
      {
        question: {
          en: "Why is form validation important?",
          ar: "لماذا Form Validation مهمة؟",
        },
        options: [
          {
            en: "To make sure input follows required rules",
            ar: "للتأكد من أن البيانات تتبع القواعد المطلوبة",
          },
          {
            en: "To change the browser",
            ar: "لتغيير المتصفح",
          },
          {
            en: "To create components",
            ar: "لإنشاء Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Form Validation",
            ar: "التحقق من صحة النماذج",
          },
          {
            en: "HTTP Client",
            ar: "HTTP Client",
          },
          {
            en: "Observables",
            ar: "Observables",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Validation ensures that submitted data follows rules such as required fields, minimum length, maximum length, email format, and custom business rules. Angular exposes control states such as valid, invalid, touched, dirty, and pending.",
            ar: "يضمن Validation أن البيانات التي يدخلها المستخدم تتبع قواعد محددة مثل Required وMinimum Length وMaximum Length وصيغة Email والقواعد المخصصة. ويوفر Angular حالات مثل Valid وInvalid وTouched وDirty وPending.",
          },
          {
            en: "HttpClient is Angular's standard tool for making HTTP requests. It can perform GET, POST, PUT, PATCH, and DELETE requests and works naturally with Observables.",
            ar: "يُعد HttpClient الأداة الأساسية في Angular لإرسال HTTP Requests. ويمكنه تنفيذ GET وPOST وPUT وPATCH وDELETE، ويعمل بشكل طبيعي مع Observables.",
          },
          {
            en: "An Observable represents a stream of values that can arrive over time. Angular uses Observables heavily with HttpClient, Router events, forms, and RxJS. Components can subscribe to an Observable to react to emitted values.",
            ar: "يمثل Observable تدفقًا من القيم التي يمكن أن تصل مع مرور الوقت. ويستخدم Angular Observables بشكل كبير مع HttpClient وRouter وForms وRxJS. ويمكن للـComponent الاشتراك في Observable للتفاعل مع القيم التي يتم إصدارها.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular validates user input before accepting form data.",
            ar: "تعرف على كيفية التحقق من صحة بيانات المستخدم قبل قبول بيانات النموذج.",
          },
          {
            en: "Learn how Angular applications communicate with APIs and backend services.",
            ar: "تعرف على كيفية تواصل تطبيقات Angular مع APIs وخدمات الـBackend.",
          },
          {
            en: "Understand the role of Observables in handling asynchronous data streams.",
            ar: "افهم دور Observables في التعامل مع تدفقات البيانات غير المتزامنة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Form validation",
            ar: "التحقق من صحة النموذج",
          },
          {
            en: "HttpClient",
            ar: "HttpClient",
          },
          {
            en: "Observable",
            ar: "Observable",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "Validators",
            ar: "Validators",
          },
          {
            en: "HttpClient",
            ar: "HttpClient",
          },
          {
            en: "Observable<T>",
            ar: "Observable<T>",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-23",
    title: {
      en: "HTTP Client",
      ar: "HTTP Client",
    },
    description: {
      en: "Learn how Angular applications communicate with APIs and backend services.",
      ar: "تعرف على كيفية تواصل تطبيقات Angular مع APIs وخدمات الـBackend.",
    },
    body: {
      en: "HttpClient is Angular's standard tool for making HTTP requests. It can perform GET, POST, PUT, PATCH, and DELETE requests and works naturally with Observables.",
      ar: "يُعد HttpClient الأداة الأساسية في Angular لإرسال HTTP Requests. ويمكنه تنفيذ GET وPOST وPUT وPATCH وDELETE، ويعمل بشكل طبيعي مع Observables.",
    },
    example: {
      code: `this.http
  .get('/api/users')
  .subscribe(users => {
    console.log(users);
  });`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `this.http
  .get('/api/users')
  .subscribe(users => {
    console.log(users);
  });`,
    },
    quiz: [
      {
        question: {
          en: "What is HttpClient commonly used for?",
          ar: "فيما يستخدم HttpClient؟",
        },
        options: [
          {
            en: "Making HTTP requests to APIs",
            ar: "إرسال HTTP Requests إلى APIs",
          },
          {
            en: "Creating CSS animations",
            ar: "إنشاء CSS Animations",
          },
          {
            en: "Rendering HTML manually",
            ar: "عرض HTML يدويًا",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "HTTP Client",
            ar: "HTTP Client",
          },
          {
            en: "Observables",
            ar: "Observables",
          },
          {
            en: "RxJS Basics",
            ar: "أساسيات RxJS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "HttpClient is Angular's standard tool for making HTTP requests. It can perform GET, POST, PUT, PATCH, and DELETE requests and works naturally with Observables.",
            ar: "يُعد HttpClient الأداة الأساسية في Angular لإرسال HTTP Requests. ويمكنه تنفيذ GET وPOST وPUT وPATCH وDELETE، ويعمل بشكل طبيعي مع Observables.",
          },
          {
            en: "An Observable represents a stream of values that can arrive over time. Angular uses Observables heavily with HttpClient, Router events, forms, and RxJS. Components can subscribe to an Observable to react to emitted values.",
            ar: "يمثل Observable تدفقًا من القيم التي يمكن أن تصل مع مرور الوقت. ويستخدم Angular Observables بشكل كبير مع HttpClient وRouter وForms وRxJS. ويمكن للـComponent الاشتراك في Observable للتفاعل مع القيم التي يتم إصدارها.",
          },
          {
            en: "RxJS is a reactive programming library built around Observables. Operators such as map, filter, switchMap, debounceTime, and catchError help transform and control asynchronous streams.",
            ar: "RxJS هي مكتبة للـReactive Programming تعتمد على Observables. وتوفر Operators مثل map وfilter وswitchMap وdebounceTime وcatchError لتحويل والتحكم في تدفقات البيانات غير المتزامنة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular applications communicate with APIs and backend services.",
            ar: "تعرف على كيفية تواصل تطبيقات Angular مع APIs وخدمات الـBackend.",
          },
          {
            en: "Understand the role of Observables in handling asynchronous data streams.",
            ar: "افهم دور Observables في التعامل مع تدفقات البيانات غير المتزامنة.",
          },
          {
            en: "Learn the basic ideas behind RxJS and operators used with Observables.",
            ar: "تعرف على أساسيات RxJS والـOperators المستخدمة مع Observables.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "HttpClient",
            ar: "HttpClient",
          },
          {
            en: "Observable",
            ar: "Observable",
          },
          {
            en: "RxJS",
            ar: "RxJS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "HttpClient",
            ar: "HttpClient",
          },
          {
            en: "Observable<T>",
            ar: "Observable<T>",
          },
          {
            en: "pipe()",
            ar: "pipe()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-24",
    title: {
      en: "Observables",
      ar: "Observables",
    },
    description: {
      en: "Understand the role of Observables in handling asynchronous data streams.",
      ar: "افهم دور Observables في التعامل مع تدفقات البيانات غير المتزامنة.",
    },
    body: {
      en: "An Observable represents a stream of values that can arrive over time. Angular uses Observables heavily with HttpClient, Router events, forms, and RxJS. Components can subscribe to an Observable to react to emitted values.",
      ar: "يمثل Observable تدفقًا من القيم التي يمكن أن تصل مع مرور الوقت. ويستخدم Angular Observables بشكل كبير مع HttpClient وRouter وForms وRxJS. ويمكن للـComponent الاشتراك في Observable للتفاعل مع القيم التي يتم إصدارها.",
    },
    example: {
      code: `this.userService
  .getUsers()
  .subscribe(users => {
    console.log(users);
  });`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `this.userService
  .getUsers()
  .subscribe(users => {
    console.log(users);
  });`,
    },
    quiz: [
      {
        question: {
          en: "What can an Observable represent?",
          ar: "ماذا يمكن أن يمثل Observable؟",
        },
        options: [
          {
            en: "A stream of asynchronous values",
            ar: "تدفقًا من القيم غير المتزامنة",
          },
          {
            en: "A CSS class",
            ar: "CSS Class",
          },
          {
            en: "An HTML attribute",
            ar: "HTML Attribute",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Observables",
            ar: "Observables",
          },
          {
            en: "RxJS Basics",
            ar: "أساسيات RxJS",
          },
          {
            en: "Lifecycle Hooks",
            ar: "Lifecycle Hooks",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "An Observable represents a stream of values that can arrive over time. Angular uses Observables heavily with HttpClient, Router events, forms, and RxJS. Components can subscribe to an Observable to react to emitted values.",
            ar: "يمثل Observable تدفقًا من القيم التي يمكن أن تصل مع مرور الوقت. ويستخدم Angular Observables بشكل كبير مع HttpClient وRouter وForms وRxJS. ويمكن للـComponent الاشتراك في Observable للتفاعل مع القيم التي يتم إصدارها.",
          },
          {
            en: "RxJS is a reactive programming library built around Observables. Operators such as map, filter, switchMap, debounceTime, and catchError help transform and control asynchronous streams.",
            ar: "RxJS هي مكتبة للـReactive Programming تعتمد على Observables. وتوفر Operators مثل map وfilter وswitchMap وdebounceTime وcatchError لتحويل والتحكم في تدفقات البيانات غير المتزامنة.",
          },
          {
            en: "Angular components have lifecycle stages from creation to destruction. Lifecycle hooks such as ngOnInit, ngOnChanges, ngAfterViewInit, and ngOnDestroy allow developers to run logic at specific points.",
            ar: "تمر Components في Angular بمراحل مختلفة منذ الإنشاء وحتى التدمير. وتسمح Lifecycle Hooks مثل ngOnInit وngOnChanges وngAfterViewInit وngOnDestroy بتنفيذ Logic في أوقات محددة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Understand the role of Observables in handling asynchronous data streams.",
            ar: "افهم دور Observables في التعامل مع تدفقات البيانات غير المتزامنة.",
          },
          {
            en: "Learn the basic ideas behind RxJS and operators used with Observables.",
            ar: "تعرف على أساسيات RxJS والـOperators المستخدمة مع Observables.",
          },
          {
            en: "Learn how Angular components move through different lifecycle stages.",
            ar: "تعرف على مراحل دورة حياة Components في Angular.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Observable",
            ar: "Observable",
          },
          {
            en: "RxJS",
            ar: "RxJS",
          },
          {
            en: "Lifecycle hooks",
            ar: "دورات حياة المكوّن",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "Observable<T>",
            ar: "Observable<T>",
          },
          {
            en: "pipe()",
            ar: "pipe()",
          },
          {
            en: "ngOnInit()",
            ar: "ngOnInit()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-25",
    title: {
      en: "RxJS Basics",
      ar: "أساسيات RxJS",
    },
    description: {
      en: "Learn the basic ideas behind RxJS and operators used with Observables.",
      ar: "تعرف على أساسيات RxJS والـOperators المستخدمة مع Observables.",
    },
    body: {
      en: "RxJS is a reactive programming library built around Observables. Operators such as map, filter, switchMap, debounceTime, and catchError help transform and control asynchronous streams.",
      ar: "RxJS هي مكتبة للـReactive Programming تعتمد على Observables. وتوفر Operators مثل map وfilter وswitchMap وdebounceTime وcatchError لتحويل والتحكم في تدفقات البيانات غير المتزامنة.",
    },
    example: {
      code: `import { map } from 'rxjs/operators';

users$
  .pipe(
    map(users => users.length)
  )
  .subscribe(count => {
    console.log(count);
  });`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { map } from 'rxjs/operators';

users$
  .pipe(
    map(users => users.length)
  )
  .subscribe(count => {
    console.log(count);
  });`,
    },
    quiz: [
      {
        question: {
          en: "What is RxJS mainly used for?",
          ar: "فيما تستخدم RxJS بشكل أساسي؟",
        },
        options: [
          {
            en: "Working with reactive and asynchronous data",
            ar: "التعامل مع البيانات التفاعلية وغير المتزامنة",
          },
          {
            en: "Creating HTML files",
            ar: "إنشاء ملفات HTML",
          },
          {
            en: "Designing images",
            ar: "تصميم الصور",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "RxJS Basics",
            ar: "أساسيات RxJS",
          },
          {
            en: "Lifecycle Hooks",
            ar: "Lifecycle Hooks",
          },
          {
            en: "Pipes",
            ar: "Pipes",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "RxJS is a reactive programming library built around Observables. Operators such as map, filter, switchMap, debounceTime, and catchError help transform and control asynchronous streams.",
            ar: "RxJS هي مكتبة للـReactive Programming تعتمد على Observables. وتوفر Operators مثل map وfilter وswitchMap وdebounceTime وcatchError لتحويل والتحكم في تدفقات البيانات غير المتزامنة.",
          },
          {
            en: "Angular components have lifecycle stages from creation to destruction. Lifecycle hooks such as ngOnInit, ngOnChanges, ngAfterViewInit, and ngOnDestroy allow developers to run logic at specific points.",
            ar: "تمر Components في Angular بمراحل مختلفة منذ الإنشاء وحتى التدمير. وتسمح Lifecycle Hooks مثل ngOnInit وngOnChanges وngAfterViewInit وngOnDestroy بتنفيذ Logic في أوقات محددة.",
          },
          {
            en: "Pipes transform values for presentation without changing the original data. Angular provides built-in pipes such as uppercase, lowercase, date, currency, number, and percent. Developers can also create custom pipes.",
            ar: "تقوم Pipes بتحويل القيم لأغراض العرض دون تغيير البيانات الأصلية. ويوفر Angular Pipes جاهزة مثل uppercase وlowercase وdate وcurrency وnumber وpercent، كما يمكنك إنشاء Custom Pipes.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn the basic ideas behind RxJS and operators used with Observables.",
            ar: "تعرف على أساسيات RxJS والـOperators المستخدمة مع Observables.",
          },
          {
            en: "Learn how Angular components move through different lifecycle stages.",
            ar: "تعرف على مراحل دورة حياة Components في Angular.",
          },
          {
            en: "Learn how Angular pipes transform and format data directly inside templates.",
            ar: "تعرف على كيفية استخدام Pipes لتحويل وتنسيق البيانات داخل Templates.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "RxJS",
            ar: "RxJS",
          },
          {
            en: "Lifecycle hooks",
            ar: "دورات حياة المكوّن",
          },
          {
            en: "Pipes",
            ar: "Pipes",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "pipe()",
            ar: "pipe()",
          },
          {
            en: "ngOnInit()",
            ar: "ngOnInit()",
          },
          {
            en: "| date",
            ar: "| date",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-26",
    title: {
      en: "Lifecycle Hooks",
      ar: "Lifecycle Hooks",
    },
    description: {
      en: "Learn how Angular components move through different lifecycle stages.",
      ar: "تعرف على مراحل دورة حياة Components في Angular.",
    },
    body: {
      en: "Angular components have lifecycle stages from creation to destruction. Lifecycle hooks such as ngOnInit, ngOnChanges, ngAfterViewInit, and ngOnDestroy allow developers to run logic at specific points.",
      ar: "تمر Components في Angular بمراحل مختلفة منذ الإنشاء وحتى التدمير. وتسمح Lifecycle Hooks مثل ngOnInit وngOnChanges وngAfterViewInit وngOnDestroy بتنفيذ Logic في أوقات محددة.",
    },
    example: {
      code: `import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {

  ngOnInit() {
    console.log('Component initialized');
  }

}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {

  ngOnInit() {
    console.log('Component initialized');
  }

}`,
    },
    quiz: [
      {
        question: {
          en: "When is ngOnInit commonly used?",
          ar: "متى تستخدم ngOnInit عادةً؟",
        },
        options: [
          {
            en: "After Angular initializes the component",
            ar: "بعد تهيئة Angular للمكون",
          },
          {
            en: "Before the browser starts",
            ar: "قبل تشغيل المتصفح",
          },
          {
            en: "Only when CSS loads",
            ar: "فقط عند تحميل CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Lifecycle Hooks",
            ar: "Lifecycle Hooks",
          },
          {
            en: "Pipes",
            ar: "Pipes",
          },
          {
            en: "Signals",
            ar: "Signals",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Angular components have lifecycle stages from creation to destruction. Lifecycle hooks such as ngOnInit, ngOnChanges, ngAfterViewInit, and ngOnDestroy allow developers to run logic at specific points.",
            ar: "تمر Components في Angular بمراحل مختلفة منذ الإنشاء وحتى التدمير. وتسمح Lifecycle Hooks مثل ngOnInit وngOnChanges وngAfterViewInit وngOnDestroy بتنفيذ Logic في أوقات محددة.",
          },
          {
            en: "Pipes transform values for presentation without changing the original data. Angular provides built-in pipes such as uppercase, lowercase, date, currency, number, and percent. Developers can also create custom pipes.",
            ar: "تقوم Pipes بتحويل القيم لأغراض العرض دون تغيير البيانات الأصلية. ويوفر Angular Pipes جاهزة مثل uppercase وlowercase وdate وcurrency وnumber وpercent، كما يمكنك إنشاء Custom Pipes.",
          },
          {
            en: "Signals provide a modern reactive state primitive in Angular. A signal stores a value, reads are tracked, and updates can cause dependent parts of the UI to react. Signals can be especially useful for local component state.",
            ar: "توفر Signals طريقة حديثة لإدارة Reactive State في Angular. تقوم Signal بتخزين قيمة ويتم تتبع عمليات القراءة، وعند تحديثها يمكن للأجزاء التي تعتمد عليها من الواجهة أن تتفاعل مع التغيير. وهي مفيدة خصوصًا في إدارة الحالة المحلية داخل Components.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular components move through different lifecycle stages.",
            ar: "تعرف على مراحل دورة حياة Components في Angular.",
          },
          {
            en: "Learn how Angular pipes transform and format data directly inside templates.",
            ar: "تعرف على كيفية استخدام Pipes لتحويل وتنسيق البيانات داخل Templates.",
          },
          {
            en: "Learn how Angular Signals represent reactive state and notify the application when values change.",
            ar: "تعرف على كيفية استخدام Angular Signals لتمثيل الـReactive State والتفاعل مع تغير القيم.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Lifecycle hooks",
            ar: "دورات حياة المكوّن",
          },
          {
            en: "Pipes",
            ar: "Pipes",
          },
          {
            en: "Signals",
            ar: "Signals",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "ngOnInit()",
            ar: "ngOnInit()",
          },
          {
            en: "| date",
            ar: "| date",
          },
          {
            en: "signal()",
            ar: "signal()",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-27",
    title: {
      en: "Pipes",
      ar: "Pipes",
    },
    description: {
      en: "Learn how Angular pipes transform and format data directly inside templates.",
      ar: "تعرف على كيفية استخدام Pipes لتحويل وتنسيق البيانات داخل Templates.",
    },
    body: {
      en: "Pipes transform values for presentation without changing the original data. Angular provides built-in pipes such as uppercase, lowercase, date, currency, number, and percent. Developers can also create custom pipes.",
      ar: "تقوم Pipes بتحويل القيم لأغراض العرض دون تغيير البيانات الأصلية. ويوفر Angular Pipes جاهزة مثل uppercase وlowercase وdate وcurrency وnumber وpercent، كما يمكنك إنشاء Custom Pipes.",
    },
    example: {
      code: `<p>
  {{ username | uppercase }}
</p>

<p>
  {{ price | currency }}
</p>`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `<p>
  {{ username | uppercase }}
</p>

<p>
  {{ price | currency }}
</p>`,
    },
    quiz: [
      {
        question: {
          en: "What are Angular pipes used for?",
          ar: "فيما تستخدم Angular Pipes؟",
        },
        options: [
          {
            en: "Transforming or formatting displayed data",
            ar: "تحويل أو تنسيق البيانات المعروضة",
          },
          {
            en: "Creating components",
            ar: "إنشاء Components",
          },
          {
            en: "Connecting to CSS",
            ar: "الاتصال بـCSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Pipes",
            ar: "Pipes",
          },
          {
            en: "Signals",
            ar: "Signals",
          },
          {
            en: "Standalone Components",
            ar: "Standalone Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Pipes transform values for presentation without changing the original data. Angular provides built-in pipes such as uppercase, lowercase, date, currency, number, and percent. Developers can also create custom pipes.",
            ar: "تقوم Pipes بتحويل القيم لأغراض العرض دون تغيير البيانات الأصلية. ويوفر Angular Pipes جاهزة مثل uppercase وlowercase وdate وcurrency وnumber وpercent، كما يمكنك إنشاء Custom Pipes.",
          },
          {
            en: "Signals provide a modern reactive state primitive in Angular. A signal stores a value, reads are tracked, and updates can cause dependent parts of the UI to react. Signals can be especially useful for local component state.",
            ar: "توفر Signals طريقة حديثة لإدارة Reactive State في Angular. تقوم Signal بتخزين قيمة ويتم تتبع عمليات القراءة، وعند تحديثها يمكن للأجزاء التي تعتمد عليها من الواجهة أن تتفاعل مع التغيير. وهي مفيدة خصوصًا في إدارة الحالة المحلية داخل Components.",
          },
          {
            en: "Standalone components can declare their own imports and work without being declared inside a traditional NgModule. This approach simplifies application structure and is now a central part of modern Angular development.",
            ar: "يمكن للمكونات المستقلة تعريف Imports الخاصة بها والعمل بدون أن تكون معلنة داخل NgModule تقليدي. ويساعد هذا الأسلوب على تبسيط بنية المشروع ويُعد من الأجزاء الأساسية في Angular الحديث.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular pipes transform and format data directly inside templates.",
            ar: "تعرف على كيفية استخدام Pipes لتحويل وتنسيق البيانات داخل Templates.",
          },
          {
            en: "Learn how Angular Signals represent reactive state and notify the application when values change.",
            ar: "تعرف على كيفية استخدام Angular Signals لتمثيل الـReactive State والتفاعل مع تغير القيم.",
          },
          {
            en: "Learn the modern Angular approach to building components without traditional NgModules.",
            ar: "تعرف على الطريقة الحديثة لبناء Components في Angular بدون الاعتماد على NgModules التقليدية.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Pipes",
            ar: "Pipes",
          },
          {
            en: "Signals",
            ar: "Signals",
          },
          {
            en: "Standalone components",
            ar: "Standalone Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "| date",
            ar: "| date",
          },
          {
            en: "signal()",
            ar: "signal()",
          },
          {
            en: "standalone: true",
            ar: "standalone: true",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-28",
    title: {
      en: "Signals",
      ar: "Signals",
    },
    description: {
      en: "Learn how Angular Signals represent reactive state and notify the application when values change.",
      ar: "تعرف على كيفية استخدام Angular Signals لتمثيل الـReactive State والتفاعل مع تغير القيم.",
    },
    body: {
      en: "Signals provide a modern reactive state primitive in Angular. A signal stores a value, reads are tracked, and updates can cause dependent parts of the UI to react. Signals can be especially useful for local component state.",
      ar: "توفر Signals طريقة حديثة لإدارة Reactive State في Angular. تقوم Signal بتخزين قيمة ويتم تتبع عمليات القراءة، وعند تحديثها يمكن للأجزاء التي تعتمد عليها من الواجهة أن تتفاعل مع التغيير. وهي مفيدة خصوصًا في إدارة الحالة المحلية داخل Components.",
    },
    example: {
      code: `import { signal } from '@angular/core';

count = signal(0);

increase() {
  this.count.update(
    value => value + 1
  );
}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { signal } from '@angular/core';

count = signal(0);

increase() {
  this.count.update(
    value => value + 1
  );
}`,
    },
    quiz: [
      {
        question: {
          en: "What is a Signal mainly used for?",
          ar: "فيما تستخدم Signal بشكل أساسي؟",
        },
        options: [
          {
            en: "Managing reactive state",
            ar: "إدارة الـReactive State",
          },
          {
            en: "Creating databases",
            ar: "إنشاء قواعد البيانات",
          },
          {
            en: "Writing CSS",
            ar: "كتابة CSS",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Signals",
            ar: "Signals",
          },
          {
            en: "Standalone Components",
            ar: "Standalone Components",
          },
          {
            en: "State Management",
            ar: "إدارة الحالة State Management",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Signals provide a modern reactive state primitive in Angular. A signal stores a value, reads are tracked, and updates can cause dependent parts of the UI to react. Signals can be especially useful for local component state.",
            ar: "توفر Signals طريقة حديثة لإدارة Reactive State في Angular. تقوم Signal بتخزين قيمة ويتم تتبع عمليات القراءة، وعند تحديثها يمكن للأجزاء التي تعتمد عليها من الواجهة أن تتفاعل مع التغيير. وهي مفيدة خصوصًا في إدارة الحالة المحلية داخل Components.",
          },
          {
            en: "Standalone components can declare their own imports and work without being declared inside a traditional NgModule. This approach simplifies application structure and is now a central part of modern Angular development.",
            ar: "يمكن للمكونات المستقلة تعريف Imports الخاصة بها والعمل بدون أن تكون معلنة داخل NgModule تقليدي. ويساعد هذا الأسلوب على تبسيط بنية المشروع ويُعد من الأجزاء الأساسية في Angular الحديث.",
          },
          {
            en: "State management is about controlling important application data and keeping the UI synchronized with that state. Small applications can use local component state, while larger applications may require shared services, signals, or dedicated state-management solutions.",
            ar: "تتعلق State Management بالتحكم في البيانات المهمة داخل التطبيق والحفاظ على تزامن الواجهة معها. يمكن للتطبيقات الصغيرة استخدام Local Component State، بينما قد تحتاج التطبيقات الكبيرة إلى Shared Services أو Signals أو حلول مخصصة لإدارة الحالة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how Angular Signals represent reactive state and notify the application when values change.",
            ar: "تعرف على كيفية استخدام Angular Signals لتمثيل الـReactive State والتفاعل مع تغير القيم.",
          },
          {
            en: "Learn the modern Angular approach to building components without traditional NgModules.",
            ar: "تعرف على الطريقة الحديثة لبناء Components في Angular بدون الاعتماد على NgModules التقليدية.",
          },
          {
            en: "Learn how applications manage shared and changing data using reactive state techniques.",
            ar: "تعرف على كيفية إدارة البيانات المشتركة والمتغيرة داخل التطبيقات باستخدام أساليب Reactive State.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Signals",
            ar: "Signals",
          },
          {
            en: "Standalone components",
            ar: "Standalone Components",
          },
          {
            en: "State management",
            ar: "إدارة الحالة",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "signal()",
            ar: "signal()",
          },
          {
            en: "standalone: true",
            ar: "standalone: true",
          },
          {
            en: "state",
            ar: "state",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-29",
    title: {
      en: "Standalone Components",
      ar: "Standalone Components",
    },
    description: {
      en: "Learn the modern Angular approach to building components without traditional NgModules.",
      ar: "تعرف على الطريقة الحديثة لبناء Components في Angular بدون الاعتماد على NgModules التقليدية.",
    },
    body: {
      en: "Standalone components can declare their own imports and work without being declared inside a traditional NgModule. This approach simplifies application structure and is now a central part of modern Angular development.",
      ar: "يمكن للمكونات المستقلة تعريف Imports الخاصة بها والعمل بدون أن تكون معلنة داخل NgModule تقليدي. ويساعد هذا الأسلوب على تبسيط بنية المشروع ويُعد من الأجزاء الأساسية في Angular الحديث.",
    },
    example: {
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: '<h1>Home</h1>'
})
export class HomeComponent {}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: '<h1>Home</h1>'
})
export class HomeComponent {}`,
    },
    quiz: [
      {
        question: {
          en: "What does standalone: true indicate?",
          ar: "ماذا يعني standalone: true؟",
        },
        options: [
          {
            en: "The component can work without a traditional NgModule",
            ar: "يمكن للمكون العمل بدون NgModule تقليدي",
          },
          {
            en: "The component is written only in CSS",
            ar: "المكون مكتوب باستخدام CSS فقط",
          },
          {
            en: "The component cannot use services",
            ar: "المكون لا يستطيع استخدام Services",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Standalone Components",
            ar: "Standalone Components",
          },
          {
            en: "State Management",
            ar: "إدارة الحالة State Management",
          },
          {
            en: "Angular Architecture",
            ar: "معمارية Angular",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Standalone components can declare their own imports and work without being declared inside a traditional NgModule. This approach simplifies application structure and is now a central part of modern Angular development.",
            ar: "يمكن للمكونات المستقلة تعريف Imports الخاصة بها والعمل بدون أن تكون معلنة داخل NgModule تقليدي. ويساعد هذا الأسلوب على تبسيط بنية المشروع ويُعد من الأجزاء الأساسية في Angular الحديث.",
          },
          {
            en: "State management is about controlling important application data and keeping the UI synchronized with that state. Small applications can use local component state, while larger applications may require shared services, signals, or dedicated state-management solutions.",
            ar: "تتعلق State Management بالتحكم في البيانات المهمة داخل التطبيق والحفاظ على تزامن الواجهة معها. يمكن للتطبيقات الصغيرة استخدام Local Component State، بينما قد تحتاج التطبيقات الكبيرة إلى Shared Services أو Signals أو حلول مخصصة لإدارة الحالة.",
          },
          {
            en: "Good Angular architecture separates responsibilities. Components focus on UI interaction, services handle reusable logic and data access, routing handles navigation, and APIs provide backend data. Clear separation makes applications easier to test, maintain, and scale.",
            ar: "تعتمد معمارية Angular الجيدة على فصل المسؤوليات. تركز Components على التفاعل مع الواجهة، بينما تتعامل Services مع المنطق المشترك والوصول إلى البيانات، ويتولى Routing عملية التنقل، بينما توفر APIs بيانات الـBackend. هذا الفصل يجعل التطبيق أسهل في الاختبار والصيانة والتوسع.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn the modern Angular approach to building components without traditional NgModules.",
            ar: "تعرف على الطريقة الحديثة لبناء Components في Angular بدون الاعتماد على NgModules التقليدية.",
          },
          {
            en: "Learn how applications manage shared and changing data using reactive state techniques.",
            ar: "تعرف على كيفية إدارة البيانات المشتركة والمتغيرة داخل التطبيقات باستخدام أساليب Reactive State.",
          },
          {
            en: "Understand how components, services, routing, templates, state, and APIs work together.",
            ar: "افهم كيف تعمل Components وServices وRouting وTemplates وState وAPIs معًا داخل التطبيق.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Standalone components",
            ar: "Standalone Components",
          },
          {
            en: "State management",
            ar: "إدارة الحالة",
          },
          {
            en: "Angular architecture",
            ar: "معمارية Angular",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "standalone: true",
            ar: "standalone: true",
          },
          {
            en: "state",
            ar: "state",
          },
          {
            en: "feature-based architecture",
            ar: "feature-based architecture",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-30",
    title: {
      en: "State Management",
      ar: "إدارة الحالة State Management",
    },
    description: {
      en: "Learn how applications manage shared and changing data using reactive state techniques.",
      ar: "تعرف على كيفية إدارة البيانات المشتركة والمتغيرة داخل التطبيقات باستخدام أساليب Reactive State.",
    },
    body: {
      en: "State management is about controlling important application data and keeping the UI synchronized with that state. Small applications can use local component state, while larger applications may require shared services, signals, or dedicated state-management solutions.",
      ar: "تتعلق State Management بالتحكم في البيانات المهمة داخل التطبيق والحفاظ على تزامن الواجهة معها. يمكن للتطبيقات الصغيرة استخدام Local Component State، بينما قد تحتاج التطبيقات الكبيرة إلى Shared Services أو Signals أو حلول مخصصة لإدارة الحالة.",
    },
    example: {
      code: `count = signal(0);

increase() {
  this.count.update(
    value => value + 1
  );
}

decrease() {
  this.count.update(
    value => value - 1
  );
}`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `count = signal(0);

increase() {
  this.count.update(
    value => value + 1
  );
}

decrease() {
  this.count.update(
    value => value - 1
  );
}`,
    },
    quiz: [
      {
        question: {
          en: "Why is state management important?",
          ar: "لماذا State Management مهمة؟",
        },
        options: [
          {
            en: "To organize and synchronize application data",
            ar: "لتنظيم ومزامنة بيانات التطبيق",
          },
          {
            en: "To replace HTML",
            ar: "لاستبدال HTML",
          },
          {
            en: "To remove TypeScript",
            ar: "لإزالة TypeScript",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "State Management",
            ar: "إدارة الحالة State Management",
          },
          {
            en: "Angular Architecture",
            ar: "معمارية Angular",
          },
          {
            en: "Angular Best Practices",
            ar: "أفضل ممارسات Angular",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "State management is about controlling important application data and keeping the UI synchronized with that state. Small applications can use local component state, while larger applications may require shared services, signals, or dedicated state-management solutions.",
            ar: "تتعلق State Management بالتحكم في البيانات المهمة داخل التطبيق والحفاظ على تزامن الواجهة معها. يمكن للتطبيقات الصغيرة استخدام Local Component State، بينما قد تحتاج التطبيقات الكبيرة إلى Shared Services أو Signals أو حلول مخصصة لإدارة الحالة.",
          },
          {
            en: "Good Angular architecture separates responsibilities. Components focus on UI interaction, services handle reusable logic and data access, routing handles navigation, and APIs provide backend data. Clear separation makes applications easier to test, maintain, and scale.",
            ar: "تعتمد معمارية Angular الجيدة على فصل المسؤوليات. تركز Components على التفاعل مع الواجهة، بينما تتعامل Services مع المنطق المشترك والوصول إلى البيانات، ويتولى Routing عملية التنقل، بينما توفر APIs بيانات الـBackend. هذا الفصل يجعل التطبيق أسهل في الاختبار والصيانة والتوسع.",
          },
          {
            en: "Good Angular development means keeping components focused, reusing services, using clear naming, organizing files logically, managing subscriptions correctly, avoiding unnecessary complexity, and designing components around clear responsibilities. Performance, accessibility, security, and maintainability should be considered from the beginning.",
            ar: "تطوير Angular بشكل جيد يعني الحفاظ على Components مركزة، وإعادة استخدام Services، واستخدام أسماء واضحة، وتنظيم الملفات منطقيًا، وإدارة Subscriptions بشكل صحيح، وتجنب التعقيد غير الضروري، وتصميم Components بمسؤوليات واضحة. ويجب الاهتمام أيضًا بالأداء وAccessibility والأمان وسهولة الصيانة منذ بداية المشروع.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn how applications manage shared and changing data using reactive state techniques.",
            ar: "تعرف على كيفية إدارة البيانات المشتركة والمتغيرة داخل التطبيقات باستخدام أساليب Reactive State.",
          },
          {
            en: "Understand how components, services, routing, templates, state, and APIs work together.",
            ar: "افهم كيف تعمل Components وServices وRouting وTemplates وState وAPIs معًا داخل التطبيق.",
          },
          {
            en: "Learn practical principles for writing clean, maintainable, performant, and scalable Angular applications.",
            ar: "تعرف على مبادئ عملية لكتابة تطبيقات Angular نظيفة وقابلة للصيانة والأداء والتوسع.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "State management",
            ar: "إدارة الحالة",
          },
          {
            en: "Angular architecture",
            ar: "معمارية Angular",
          },
          {
            en: "Best practices",
            ar: "أفضل الممارسات",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "state",
            ar: "state",
          },
          {
            en: "feature-based architecture",
            ar: "feature-based architecture",
          },
          {
            en: "reusable code",
            ar: "كود قابل لإعادة الاستخدام",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-31",
    title: {
      en: "Angular Architecture",
      ar: "معمارية Angular",
    },
    description: {
      en: "Understand how components, services, routing, templates, state, and APIs work together.",
      ar: "افهم كيف تعمل Components وServices وRouting وTemplates وState وAPIs معًا داخل التطبيق.",
    },
    body: {
      en: "Good Angular architecture separates responsibilities. Components focus on UI interaction, services handle reusable logic and data access, routing handles navigation, and APIs provide backend data. Clear separation makes applications easier to test, maintain, and scale.",
      ar: "تعتمد معمارية Angular الجيدة على فصل المسؤوليات. تركز Components على التفاعل مع الواجهة، بينما تتعامل Services مع المنطق المشترك والوصول إلى البيانات، ويتولى Routing عملية التنقل، بينما توفر APIs بيانات الـBackend. هذا الفصل يجعل التطبيق أسهل في الاختبار والصيانة والتوسع.",
    },
    example: {
      code: `Component
   ↓
Service
   ↓
API
   ↓
Backend`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `Component
   ↓
Service
   ↓
API
   ↓
Backend`,
    },
    quiz: [
      {
        question: {
          en: "Why is Angular architecture important?",
          ar: "لماذا معمارية Angular مهمة؟",
        },
        options: [
          {
            en: "It helps organize large applications",
            ar: "تساعد على تنظيم التطبيقات الكبيرة",
          },
          {
            en: "It removes the need for HTML",
            ar: "تلغي الحاجة إلى HTML",
          },
          {
            en: "It replaces the browser",
            ar: "تستبدل المتصفح",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Angular Architecture",
            ar: "معمارية Angular",
          },
          {
            en: "Angular Best Practices",
            ar: "أفضل ممارسات Angular",
          },
          {
            en: "Introduction to Angular",
            ar: "مقدمة إلى Angular",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Good Angular architecture separates responsibilities. Components focus on UI interaction, services handle reusable logic and data access, routing handles navigation, and APIs provide backend data. Clear separation makes applications easier to test, maintain, and scale.",
            ar: "تعتمد معمارية Angular الجيدة على فصل المسؤوليات. تركز Components على التفاعل مع الواجهة، بينما تتعامل Services مع المنطق المشترك والوصول إلى البيانات، ويتولى Routing عملية التنقل، بينما توفر APIs بيانات الـBackend. هذا الفصل يجعل التطبيق أسهل في الاختبار والصيانة والتوسع.",
          },
          {
            en: "Good Angular development means keeping components focused, reusing services, using clear naming, organizing files logically, managing subscriptions correctly, avoiding unnecessary complexity, and designing components around clear responsibilities. Performance, accessibility, security, and maintainability should be considered from the beginning.",
            ar: "تطوير Angular بشكل جيد يعني الحفاظ على Components مركزة، وإعادة استخدام Services، واستخدام أسماء واضحة، وتنظيم الملفات منطقيًا، وإدارة Subscriptions بشكل صحيح، وتجنب التعقيد غير الضروري، وتصميم Components بمسؤوليات واضحة. ويجب الاهتمام أيضًا بالأداء وAccessibility والأمان وسهولة الصيانة منذ بداية المشروع.",
          },
          {
            en: "Angular is a full-featured web framework built around TypeScript. It provides components, templates, routing, forms, dependency injection, HTTP tools, and reactive features. Angular helps developers organize large applications into reusable and maintainable parts.",
            ar: "Angular هو إطار عمل متكامل لتطوير تطبيقات الويب ويعتمد بشكل أساسي على TypeScript. يوفر Components وTemplates وRouting وForms وDependency Injection وأدوات HTTP وميزات تفاعلية. ويساعدك على تنظيم التطبيقات الكبيرة إلى أجزاء قابلة لإعادة الاستخدام والصيانة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Understand how components, services, routing, templates, state, and APIs work together.",
            ar: "افهم كيف تعمل Components وServices وRouting وTemplates وState وAPIs معًا داخل التطبيق.",
          },
          {
            en: "Learn practical principles for writing clean, maintainable, performant, and scalable Angular applications.",
            ar: "تعرف على مبادئ عملية لكتابة تطبيقات Angular نظيفة وقابلة للصيانة والأداء والتوسع.",
          },
          {
            en: "Learn what Angular is, why developers use it, and how it helps build scalable modern web applications.",
            ar: "تعرف على Angular، ولماذا يستخدمه المطورون، وكيف يساعد في بناء تطبيقات ويب حديثة وقابلة للتوسع.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Angular architecture",
            ar: "معمارية Angular",
          },
          {
            en: "Best practices",
            ar: "أفضل الممارسات",
          },
          {
            en: "Angular framework",
            ar: "إطار Angular",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "feature-based architecture",
            ar: "feature-based architecture",
          },
          {
            en: "reusable code",
            ar: "كود قابل لإعادة الاستخدام",
          },
          {
            en: "ng new",
            ar: "ng new",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "angular-32",
    title: {
      en: "Angular Best Practices",
      ar: "أفضل ممارسات Angular",
    },
    description: {
      en: "Learn practical principles for writing clean, maintainable, performant, and scalable Angular applications.",
      ar: "تعرف على مبادئ عملية لكتابة تطبيقات Angular نظيفة وقابلة للصيانة والأداء والتوسع.",
    },
    body: {
      en: "Good Angular development means keeping components focused, reusing services, using clear naming, organizing files logically, managing subscriptions correctly, avoiding unnecessary complexity, and designing components around clear responsibilities. Performance, accessibility, security, and maintainability should be considered from the beginning.",
      ar: "تطوير Angular بشكل جيد يعني الحفاظ على Components مركزة، وإعادة استخدام Services، واستخدام أسماء واضحة، وتنظيم الملفات منطقيًا، وإدارة Subscriptions بشكل صحيح، وتجنب التعقيد غير الضروري، وتصميم Components بمسؤوليات واضحة. ويجب الاهتمام أيضًا بالأداء وAccessibility والأمان وسهولة الصيانة منذ بداية المشروع.",
    },
    example: {
      code: `src/
├── app/
│   ├── components/
│   ├── services/
│   ├── pages/
│   ├── models/
│   └── shared/
└── assets/`,
    },
    practice: {
      prompt: {
        en: "Modify the example below and run your code to explore the Angular syntax.",
        ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
      },
      starterCode: `src/
├── app/
│   ├── components/
│   ├── services/
│   ├── pages/
│   ├── models/
│   └── shared/
└── assets/`,
    },
    quiz: [
      {
        question: {
          en: "Why should an Angular project be well organized?",
          ar: "لماذا يجب تنظيم مشروع Angular بشكل جيد؟",
        },
        options: [
          {
            en: "To make the application easier to maintain",
            ar: "لجعل التطبيق أسهل في الصيانة",
          },
          {
            en: "To remove TypeScript",
            ar: "لإزالة TypeScript",
          },
          {
            en: "To avoid using components",
            ar: "لتجنب استخدام Components",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is the main focus of this lesson?",
          ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
        },
        options: [
          {
            en: "Angular Best Practices",
            ar: "أفضل ممارسات Angular",
          },
          {
            en: "Introduction to Angular",
            ar: "مقدمة إلى Angular",
          },
          {
            en: "Angular CLI",
            ar: "Angular CLI",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which statement best describes this topic?",
          ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
        },
        options: [
          {
            en: "Good Angular development means keeping components focused, reusing services, using clear naming, organizing files logically, managing subscriptions correctly, avoiding unnecessary complexity, and designing components around clear responsibilities. Performance, accessibility, security, and maintainability should be considered from the beginning.",
            ar: "تطوير Angular بشكل جيد يعني الحفاظ على Components مركزة، وإعادة استخدام Services، واستخدام أسماء واضحة، وتنظيم الملفات منطقيًا، وإدارة Subscriptions بشكل صحيح، وتجنب التعقيد غير الضروري، وتصميم Components بمسؤوليات واضحة. ويجب الاهتمام أيضًا بالأداء وAccessibility والأمان وسهولة الصيانة منذ بداية المشروع.",
          },
          {
            en: "Angular is a full-featured web framework built around TypeScript. It provides components, templates, routing, forms, dependency injection, HTTP tools, and reactive features. Angular helps developers organize large applications into reusable and maintainable parts.",
            ar: "Angular هو إطار عمل متكامل لتطوير تطبيقات الويب ويعتمد بشكل أساسي على TypeScript. يوفر Components وTemplates وRouting وForms وDependency Injection وأدوات HTTP وميزات تفاعلية. ويساعدك على تنظيم التطبيقات الكبيرة إلى أجزاء قابلة لإعادة الاستخدام والصيانة.",
          },
          {
            en: "Angular CLI is the official command-line tool for Angular development. It can generate projects and components, run the development server, build production applications, and perform other common tasks.",
            ar: "Angular CLI هي أداة سطر الأوامر الرسمية لتطوير Angular. يمكنك استخدامها لإنشاء المشاريع والمكونات وتشغيل خادم التطوير وبناء نسخة Production وتنفيذ العديد من المهام الشائعة.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "What is a practical goal of this lesson?",
          ar: "ما الهدف العملي من هذا الدرس؟",
        },
        options: [
          {
            en: "Learn practical principles for writing clean, maintainable, performant, and scalable Angular applications.",
            ar: "تعرف على مبادئ عملية لكتابة تطبيقات Angular نظيفة وقابلة للصيانة والأداء والتوسع.",
          },
          {
            en: "Learn what Angular is, why developers use it, and how it helps build scalable modern web applications.",
            ar: "تعرف على Angular، ولماذا يستخدمه المطورون، وكيف يساعد في بناء تطبيقات ويب حديثة وقابلة للتوسع.",
          },
          {
            en: "Learn how Angular CLI helps you create, develop, test, and build Angular applications.",
            ar: "تعرف على كيفية استخدام Angular CLI لإنشاء وتطوير واختبار وبناء تطبيقات Angular.",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which Angular concept is directly related to this lesson?",
          ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
        },
        options: [
          {
            en: "Best practices",
            ar: "أفضل الممارسات",
          },
          {
            en: "Angular framework",
            ar: "إطار Angular",
          },
          {
            en: "Angular CLI",
            ar: "Angular CLI",
          },
        ],
        correct: 0,
      },
      {
        question: {
          en: "Which syntax or API is most closely associated with this lesson?",
          ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
        },
        options: [
          {
            en: "reusable code",
            ar: "كود قابل لإعادة الاستخدام",
          },
          {
            en: "ng new",
            ar: "ng new",
          },
          {
            en: "ng generate",
            ar: "ng generate",
          },
        ],
        correct: 0,
      },
    ],
  },
];
