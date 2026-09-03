/* =========================================================
   FAYAD — ANGULAR LEARNING ENGINE
   BILINGUAL VERSION
   EN / AR
   Beginner → Advanced
   ========================================================= */

/* =========================================================
   1. STORAGE HELPERS
   ========================================================= */

function getStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("FAYAD Storage Error:", error);
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("FAYAD Storage Error:", error);
  }
}

/* =========================================================
   2. LANGUAGE
   ========================================================= */

let currentLanguage = getStorage("fayad-language", "ar") === "en" ? "en" : "ar";

function t(value) {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value[currentLanguage] ?? value.en ?? value.ar ?? "";
}

function setLanguage(language) {
  currentLanguage = language === "ar" ? "ar" : "en";

  setStorage("fayad-language", currentLanguage);

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  updateStaticLanguage();
  updateSidebar();

  loadLesson(currentLesson, false, true);
}

/* =========================================================
   3. LESSON DATA
   ========================================================= */

const lessons = [
  /* =======================================================
     01 — INTRODUCTION
     ======================================================= */

  {
    title: {
      en: "Introduction to Angular",
      ar: "مقدمة إلى Angular",
    },

    description: {
      en: "Learn what Angular is, why developers use it, and how it helps build scalable modern web applications.",
      ar: "تعرف على Angular، ولماذا يستخدمه المطورون، وكيف يساعد في بناء تطبيقات ويب حديثة وقابلة للتوسع.",
    },

    explanation: {
      en: "Angular is a full-featured web framework built around TypeScript. It provides components, templates, routing, forms, dependency injection, HTTP tools, and reactive features. Angular helps developers organize large applications into reusable and maintainable parts.",
      ar: "Angular هو إطار عمل متكامل لتطوير تطبيقات الويب ويعتمد بشكل أساسي على TypeScript. يوفر Components وTemplates وRouting وForms وDependency Injection وأدوات HTTP وميزات تفاعلية. ويساعدك على تنظيم التطبيقات الكبيرة إلى أجزاء قابلة لإعادة الاستخدام والصيانة.",
    },

    code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello Angular</h1>'
})
export class AppComponent {}`,

    question: {
      en: "What is Angular mainly used for?",
      ar: "فيما يُستخدم Angular بشكل أساسي؟",
    },

    answers: {
      en: ["Building modern web applications", "Creating database tables", "Styling HTML only"],

      ar: ["بناء تطبيقات ويب حديثة", "إنشاء جداول قواعد البيانات", "تنسيق HTML فقط"],
    },

    correct: 0,
  },

  /* =======================================================
     02 — CLI
     ======================================================= */

  {
    title: {
      en: "Angular CLI",
      ar: "Angular CLI",
    },

    description: {
      en: "Learn how Angular CLI helps you create, develop, test, and build Angular applications.",
      ar: "تعرف على كيفية استخدام Angular CLI لإنشاء وتطوير واختبار وبناء تطبيقات Angular.",
    },

    explanation: {
      en: "Angular CLI is the official command-line tool for Angular development. It can generate projects and components, run the development server, build production applications, and perform other common tasks.",
      ar: "Angular CLI هي أداة سطر الأوامر الرسمية لتطوير Angular. يمكنك استخدامها لإنشاء المشاريع والمكونات وتشغيل خادم التطوير وبناء نسخة Production وتنفيذ العديد من المهام الشائعة.",
    },

    code: `ng new my-angular-app

cd my-angular-app

ng serve`,

    question: {
      en: "What is Angular CLI?",
      ar: "ما هي Angular CLI؟",
    },

    answers: {
      en: ["A command-line tool for Angular development", "A database system", "A CSS framework"],

      ar: ["أداة لسطر الأوامر لتطوير Angular", "نظام قواعد بيانات", "إطار عمل CSS"],
    },

    correct: 0,
  },

  /* =======================================================
     03 — PROJECT STRUCTURE
     ======================================================= */

  {
    title: {
      en: "Project Structure",
      ar: "هيكل المشروع",
    },

    description: {
      en: "Understand the important files and folders inside an Angular project.",
      ar: "افهم أهم الملفات والمجلدات الموجودة داخل مشروع Angular.",
    },

    explanation: {
      en: "Angular projects contain source code, configuration files, assets, and application logic. The src folder contains the main application source, while configuration files such as package.json and angular.json control dependencies and project behavior.",
      ar: "تحتوي مشاريع Angular على كود المصدر وملفات الإعداد والـAssets ومنطق التطبيق. يحتوي مجلد src على الكود الأساسي للتطبيق، بينما تتحكم ملفات مثل package.json وangular.json في Dependencies وإعدادات المشروع.",
    },

    code: `src/
├── app/
│   ├── components/
│   ├── services/
│   └── pages/
├── assets/
├── index.html
└── main.ts`,

    question: {
      en: "Where is most application source code located?",
      ar: "أين يوجد معظم كود التطبيق؟",
    },

    answers: {
      en: ["Inside the src folder", "Inside the browser", "Inside package.json only"],

      ar: ["داخل مجلد src", "داخل المتصفح", "داخل package.json فقط"],
    },

    correct: 0,
  },

  /* =======================================================
     04 — COMPONENTS
     ======================================================= */

  {
    title: {
      en: "Components",
      ar: "المكونات Components",
    },

    description: {
      en: "Learn how Angular components organize an application into reusable UI and logic.",
      ar: "تعلم كيف تنظم Components في Angular التطبيق إلى أجزاء مستقلة وقابلة لإعادة الاستخدام.",
    },

    explanation: {
      en: "A component represents a part of the user interface. It normally contains a TypeScript class for logic, an HTML template for the view, and optional styles. Components are the main building blocks of Angular applications.",
      ar: "يمثل الـComponent جزءًا من واجهة المستخدم. يحتوي عادةً على TypeScript Class للمنطق وHTML Template للواجهة وCSS اختياريًا للتنسيق. وتُعد المكونات اللبنات الأساسية لتطبيقات Angular.",
    },

    code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: '<h2>Product Card</h2>'
})
export class CardComponent {}`,

    question: {
      en: "What is an Angular component?",
      ar: "ما هو Angular Component؟",
    },

    answers: {
      en: ["A reusable part of the user interface", "A database", "A CSS property"],

      ar: ["جزء قابل لإعادة الاستخدام من واجهة المستخدم", "قاعدة بيانات", "خاصية CSS"],
    },

    correct: 0,
  },

  /* =======================================================
     05 — TEMPLATES
     ======================================================= */

  {
    title: {
      en: "Templates",
      ar: "القوالب Templates",
    },

    description: {
      en: "Learn how Angular templates define the HTML structure displayed by components.",
      ar: "تعرف على كيفية استخدام Angular Templates لتحديد بنية HTML التي تعرضها Components.",
    },

    explanation: {
      en: "Angular templates are HTML enhanced with Angular syntax. They allow you to display component data, react to events, use bindings, render lists, and conditionally display content.",
      ar: "Angular Templates هي HTML مدعومة بخصائص Angular. تسمح لك بعرض بيانات الـComponent والتعامل مع Events واستخدام Bindings وعرض القوائم والمحتوى الشرطي.",
    },

    code: `<h1>{{ title }}</h1>

<p>
  Welcome to Angular.
</p>`,

    question: {
      en: "Where is a component's UI structure usually defined?",
      ar: "أين يتم عادةً تعريف بنية واجهة المكون؟",
    },

    answers: {
      en: ["In its template", "Inside the database", "Inside package.json"],

      ar: ["داخل الـTemplate الخاص به", "داخل قاعدة البيانات", "داخل package.json"],
    },

    correct: 0,
  },

  /* =======================================================
     06 — DATA BINDING
     ======================================================= */

  {
    title: {
      en: "Data Binding",
      ar: "ربط البيانات Data Binding",
    },

    description: {
      en: "Learn how Angular connects component data with the user interface.",
      ar: "تعرف على كيفية ربط Angular بين بيانات الـComponent وواجهة المستخدم.",
    },

    explanation: {
      en: "Data binding connects the component class with its template. Angular supports interpolation, property binding, event binding, and two-way binding. These mechanisms reduce the amount of manual DOM manipulation you need to write.",
      ar: "يقوم Data Binding بربط الـComponent Class بالـTemplate. ويوفر Angular عدة أنواع مثل Interpolation وProperty Binding وEvent Binding وTwo-Way Binding، مما يقلل الحاجة إلى التعامل اليدوي مع DOM.",
    },

    code: `export class AppComponent {
  username = 'Mido';
}

<h2>{{ username }}</h2>`,

    question: {
      en: "What does data binding connect?",
      ar: "ماذا يربط Data Binding؟",
    },

    answers: {
      en: ["Component data and the UI", "Two databases", "CSS and the browser"],

      ar: ["بيانات الـComponent وواجهة المستخدم", "قاعدتي بيانات", "CSS والمتصفح"],
    },

    correct: 0,
  },

  /* =======================================================
     07 — INTERPOLATION
     ======================================================= */

  {
    title: {
      en: "Interpolation",
      ar: "Interpolation",
    },

    description: {
      en: "Learn how Angular interpolation displays component data inside HTML templates.",
      ar: "تعرف على كيفية عرض بيانات الـComponent داخل HTML باستخدام Interpolation.",
    },

    explanation: {
      en: "Interpolation uses double curly braces to display expressions inside a template. Angular evaluates the expression and updates the displayed value when the related state changes.",
      ar: "تستخدم Interpolation الأقواس المعقوفة المزدوجة لعرض Expressions داخل الـTemplate. يقوم Angular بتقييم التعبير وتحديث القيمة المعروضة عندما تتغير البيانات المرتبطة به.",
    },

    code: `export class AppComponent {
  title = 'Fayad Angular';
}

<h1>{{ title }}</h1>`,

    question: {
      en: "Which syntax is used for Angular interpolation?",
      ar: "ما الصيغة المستخدمة في Angular للـInterpolation؟",
    },

    answers: {
      en: ["{{ value }}", "[[ value ]]", "<% value %>"],

      ar: ["{{ value }}", "[[ value ]]", "<% value %>"],
    },

    correct: 0,
  },

  /* =======================================================
     08 — PROPERTY BINDING
     ======================================================= */

  {
    title: {
      en: "Property Binding",
      ar: "ربط الخصائص Property Binding",
    },

    description: {
      en: "Learn how property binding connects component values to HTML element properties.",
      ar: "تعرف على كيفية ربط قيم الـComponent بخصائص عناصر HTML.",
    },

    explanation: {
      en: "Property binding uses square brackets to dynamically set DOM properties from component state. This is useful when values such as image URLs, disabled states, classes, or other properties change dynamically.",
      ar: "يستخدم Property Binding الأقواس المربعة لربط خصائص عناصر HTML بقيم ديناميكية من الـComponent. ويُستخدم مثلًا مع الصور وحالة الأزرار والخصائص التي تتغير أثناء تشغيل التطبيق.",
    },

    code: `<img [src]="imageUrl">

<button [disabled]="isDisabled">
  Submit
</button>`,

    question: {
      en: "What does property binding do?",
      ar: "ماذا يفعل Property Binding؟",
    },

    answers: {
      en: ["Connects data to an element property", "Creates a database", "Changes the URL"],

      ar: ["يربط البيانات بخاصية في عنصر", "ينشئ قاعدة بيانات", "يغير الرابط"],
    },

    correct: 0,
  },

  /* =======================================================
     09 — EVENT BINDING
     ======================================================= */

  {
    title: {
      en: "Event Binding",
      ar: "ربط الأحداث Event Binding",
    },

    description: {
      en: "Learn how Angular responds to user actions such as clicks, input, submit, and keyboard events.",
      ar: "تعرف على كيفية استجابة Angular لأفعال المستخدم مثل Click وInput وSubmit وأحداث لوحة المفاتيح.",
    },

    explanation: {
      en: "Event binding uses parentheses to listen for DOM events. When an event happens, Angular can call a component method or execute an expression.",
      ar: "يستخدم Event Binding الأقواس العادية للاستماع إلى DOM Events. وعند حدوث الحدث يستطيع Angular استدعاء Method داخل الـComponent أو تنفيذ Expression.",
    },

    code: `<button (click)="showMessage()">
  Click Me
</button>`,

    question: {
      en: "Which syntax is used for event binding?",
      ar: "ما الصيغة المستخدمة في Event Binding؟",
    },

    answers: {
      en: ["(click)", "[click]", "{click}"],

      ar: ["(click)", "[click]", "{click}"],
    },

    correct: 0,
  },

  /* =======================================================
     10 — TWO WAY
     ======================================================= */

  {
    title: {
      en: "Two-Way Data Binding",
      ar: "ربط البيانات ثنائي الاتجاه",
    },

    description: {
      en: "Learn how Angular keeps component data and form controls synchronized.",
      ar: "تعرف على كيفية إبقاء بيانات الـComponent وحقول Forms متزامنة.",
    },

    explanation: {
      en: "Two-way binding allows data to move from the component to the view and from the view back to the component. The ngModel directive is commonly used with the [(ngModel)] syntax in template-driven forms.",
      ar: "يسمح Two-Way Binding بانتقال البيانات من الـComponent إلى الواجهة ومن الواجهة إلى الـComponent. ويُستخدم ngModel بشكل شائع مع الصيغة [(ngModel)] في Template-driven Forms.",
    },

    code: `<input
  name="username"
  [(ngModel)]="username">

<p>Hello {{ username }}</p>`,

    question: {
      en: "What does two-way binding allow?",
      ar: "ماذا يسمح Two-Way Binding؟",
    },

    answers: {
      en: ["Data to flow in both directions", "Only CSS to change", "Only HTML to load"],

      ar: ["انتقال البيانات في الاتجاهين", "تغيير CSS فقط", "تحميل HTML فقط"],
    },

    correct: 0,
  },

  /* =======================================================
     11 — DIRECTIVES
     ======================================================= */

  {
    title: {
      en: "Directives",
      ar: "التوجيهات Directives",
    },

    description: {
      en: "Learn how Angular directives change the behavior, appearance, or rendering of elements.",
      ar: "تعرف على كيفية تغيير Directives لسلوك أو شكل أو طريقة عرض العناصر.",
    },

    explanation: {
      en: "Directives extend HTML with Angular behavior. Structural techniques can control what is rendered, while attribute directives can modify the behavior or appearance of existing elements.",
      ar: "تضيف Directives سلوكًا خاصًا إلى HTML. ويمكن استخدام الأساليب الهيكلية للتحكم في العناصر التي يتم عرضها، بينما تستطيع Attribute Directives تعديل سلوك أو مظهر العناصر.",
    },

    code: `<p *ngIf="isLoggedIn">
  Welcome back!
</p>`,

    question: {
      en: "What can Angular directives do?",
      ar: "ماذا يمكن أن تفعل Angular Directives؟",
    },

    answers: {
      en: ["Change element behavior or structure", "Create databases", "Replace JavaScript completely"],

      ar: ["تغيير سلوك أو بنية العناصر", "إنشاء قواعد بيانات", "استبدال JavaScript بالكامل"],
    },

    correct: 0,
  },

  /* =======================================================
     12 — CONDITIONAL
     ======================================================= */

  {
    title: {
      en: "Conditional Rendering",
      ar: "العرض الشرطي",
    },

    description: {
      en: "Learn how Angular displays different content depending on application state.",
      ar: "تعرف على كيفية عرض Angular لمحتوى مختلف بناءً على حالة التطبيق.",
    },

    explanation: {
      en: "Conditional rendering is useful when the interface should change according to state. Examples include authentication screens, loading states, permissions, empty results, and error messages.",
      ar: "يُستخدم العرض الشرطي عندما يجب أن تتغير الواجهة بناءً على حالة معينة. ومن أمثلته صفحات تسجيل الدخول وحالات Loading والصلاحيات والنتائج الفارغة ورسائل الخطأ.",
    },

    code: `<div *ngIf="isLoggedIn">
  Dashboard
</div>

<div *ngIf="!isLoggedIn">
  Please log in.
</div>`,

    question: {
      en: "What is conditional rendering used for?",
      ar: "فيما يستخدم العرض الشرطي؟",
    },

    answers: {
      en: ["Displaying content based on a condition", "Changing the browser", "Creating CSS files"],

      ar: ["عرض المحتوى بناءً على شرط", "تغيير المتصفح", "إنشاء ملفات CSS"],
    },

    correct: 0,
  },

  /* =======================================================
     13 — LISTS
     ======================================================= */

  {
    title: {
      en: "Rendering Lists",
      ar: "عرض القوائم",
    },

    description: {
      en: "Learn how Angular renders repeated content from arrays and collections.",
      ar: "تعرف على كيفية عرض العناصر المتكررة من Arrays وCollections.",
    },

    explanation: {
      en: "List rendering is essential when displaying products, users, messages, tasks, or any collection of data. Angular can repeat a template for each item and efficiently track changes.",
      ar: "يُعد عرض القوائم أساسيًا عند عرض Products أو Users أو Messages أو Tasks أو أي مجموعة من البيانات. يستطيع Angular تكرار الـTemplate لكل عنصر والتعامل مع التغييرات بكفاءة.",
    },

    code: `<ul>
  <li *ngFor="let user of users">
    {{ user.name }}
  </li>
</ul>`,

    question: {
      en: "Which directive traditionally renders a list?",
      ar: "أي Directive تستخدم تقليديًا لعرض القائمة؟",
    },

    answers: {
      en: ["*ngFor", "*ngList", "*repeat"],

      ar: ["*ngFor", "*ngList", "*repeat"],
    },

    correct: 0,
  },

  /* =======================================================
     14 — COMPONENT COMMUNICATION
     ======================================================= */

  {
    title: {
      en: "Component Communication",
      ar: "التواصل بين المكونات",
    },

    description: {
      en: "Learn how Angular components communicate and exchange information.",
      ar: "تعرف على كيفية تواصل Components في Angular وتبادل البيانات والأحداث.",
    },

    explanation: {
      en: "Component communication becomes important as applications grow. A parent can pass data to a child through inputs, while a child can notify its parent through outputs and emitted events.",
      ar: "يصبح التواصل بين Components مهمًا مع زيادة حجم التطبيق. يستطيع الـParent تمرير البيانات إلى الـChild باستخدام Inputs، بينما يستطيع الـChild إرسال Events إلى الـParent باستخدام Outputs.",
    },

    code: `@Input()
title = '';

@Output()
selected = new EventEmitter<string>();`,

    question: {
      en: "Which decorators are commonly used for component communication?",
      ar: "ما الـDecorators المستخدمة عادةً للتواصل بين المكونات؟",
    },

    answers: {
      en: ["@Input and @Output", "@CSS and @HTML", "@Route and @Style"],

      ar: ["@Input و @Output", "@CSS و @HTML", "@Route و @Style"],
    },

    correct: 0,
  },

  /* =======================================================
     15 — INPUTS
     ======================================================= */

  {
    title: {
      en: "Inputs",
      ar: "Inputs",
    },

    description: {
      en: "Learn how parent components pass data into child components using inputs.",
      ar: "تعرف على كيفية تمرير البيانات من Parent Component إلى Child Component باستخدام Inputs.",
    },

    explanation: {
      en: "An input is a public value that a child component can receive from its parent. This makes components reusable because the parent can provide different values to the same component.",
      ar: "الـInput هو قيمة يستطيع الـChild Component استقبالها من الـParent. وهذا يجعل Components قابلة لإعادة الاستخدام لأن الـParent يستطيع إرسال قيم مختلفة إلى نفس المكون.",
    },

    code: `@Input()
userName = '';

<h2>{{ userName }}</h2>`,

    question: {
      en: "What is an input mainly used for?",
      ar: "فيما يستخدم Input بشكل أساسي؟",
    },

    answers: {
      en: ["Receiving data from a parent component", "Creating a database", "Styling a page"],

      ar: ["استقبال البيانات من الـParent Component", "إنشاء قاعدة بيانات", "تنسيق الصفحة"],
    },

    correct: 0,
  },

  /* =======================================================
     16 — OUTPUTS
     ======================================================= */

  {
    title: {
      en: "Outputs",
      ar: "Outputs",
    },

    description: {
      en: "Learn how child components send events back to their parent components.",
      ar: "تعرف على كيفية إرسال Child Components للأحداث إلى Parent Components.",
    },

    explanation: {
      en: "Outputs are commonly implemented with EventEmitter. The child emits an event and the parent listens to that event. This creates a clear communication path from child to parent.",
      ar: "تُستخدم Outputs غالبًا مع EventEmitter. يقوم الـChild بإطلاق Event ويستمع الـParent إلى هذا الحدث. وهذا يوفر طريقة واضحة للتواصل من Child إلى Parent.",
    },

    code: `@Output()
selected = new EventEmitter<string>();

selectItem() {
  this.selected.emit('Angular');
}`,

    question: {
      en: "What is an output commonly used for?",
      ar: "فيما يستخدم Output عادةً؟",
    },

    answers: {
      en: ["Sending events from child to parent", "Creating CSS", "Connecting to a database"],

      ar: ["إرسال الأحداث من Child إلى Parent", "إنشاء CSS", "الاتصال بقاعدة بيانات"],
    },

    correct: 0,
  },

  /* =======================================================
     17 — SERVICES
     ======================================================= */

  {
    title: {
      en: "Services",
      ar: "الخدمات Services",
    },

    description: {
      en: "Learn how Angular services organize reusable application logic and shared functionality.",
      ar: "تعرف على كيفية استخدام Services لتنظيم المنطق المشترك والقابل لإعادة الاستخدام.",
    },

    explanation: {
      en: "Services are classes designed to contain reusable logic. They are commonly used for API communication, authentication, shared data, business logic, logging, and other functionality that should not live directly inside a component.",
      ar: "الـServices هي Classes تحتوي على منطق قابل لإعادة الاستخدام. تُستخدم عادةً للتعامل مع APIs والمصادقة والبيانات المشتركة وBusiness Logic والـLogging وغيرها من الوظائف التي لا يفضل وضعها داخل Component.",
    },

    code: `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers() {
    return ['Ali', 'Mido', 'Sara'];
  }

}`,

    question: {
      en: "Why are Angular services commonly used?",
      ar: "لماذا تستخدم Angular Services؟",
    },

    answers: {
      en: ["To share reusable logic and data", "To style buttons", "To create HTML tags"],

      ar: ["لمشاركة المنطق والبيانات القابلة لإعادة الاستخدام", "لتنسيق الأزرار", "لإنشاء HTML Tags"],
    },

    correct: 0,
  },

  /* =======================================================
     18 — DEPENDENCY INJECTION
     ======================================================= */

  {
    title: {
      en: "Dependency Injection",
      ar: "Dependency Injection — حقن الاعتمادات",
    },

    description: {
      en: "Understand how Angular provides required services and dependencies to classes.",
      ar: "افهم كيف يوفر Angular الـServices والاعتمادات التي تحتاج إليها الـClasses.",
    },

    explanation: {
      en: "Dependency Injection allows a class to receive the objects it needs instead of creating them itself. This improves reusability, testing, and separation of responsibilities.",
      ar: "يسمح Dependency Injection للـClass باستقبال الأشياء التي يحتاج إليها بدلًا من إنشائها بنفسه. وهذا يحسن إعادة الاستخدام والاختبار وفصل المسؤوليات.",
    },

    code: `constructor(
  private userService: UserService
) {}`,

    question: {
      en: "What does dependency injection help with?",
      ar: "في ماذا يساعد Dependency Injection؟",
    },

    answers: {
      en: ["Providing required dependencies to a class", "Writing CSS animations", "Creating HTML elements"],

      ar: ["توفير الاعتمادات المطلوبة للـClass", "كتابة CSS Animations", "إنشاء عناصر HTML"],
    },

    correct: 0,
  },

  /* =======================================================
     19 — ROUTING
     ======================================================= */

  {
    title: {
      en: "Angular Routing",
      ar: "التوجيه Routing",
    },

    description: {
      en: "Learn how Angular Router allows users to navigate between application views.",
      ar: "تعرف على كيفية استخدام Angular Router للتنقل بين صفحات وواجهات التطبيق.",
    },

    explanation: {
      en: "Angular Router maps URLs to components. It allows applications to behave like multi-page experiences while remaining a single-page application. Routes can also use guards, parameters, child routes, and lazy loading.",
      ar: "يقوم Angular Router بربط URLs بالمكونات. ويسمح للتطبيق بالتصرف كتطبيق يحتوي على صفحات متعددة مع بقائه Single-Page Application. ويمكن أيضًا استخدام Guards وParameters وChild Routes وLazy Loading.",
    },

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

    question: {
      en: "What is Angular Router used for?",
      ar: "فيما يستخدم Angular Router؟",
    },

    answers: {
      en: ["Navigation between application views", "Changing CSS colors", "Creating databases"],

      ar: ["التنقل بين واجهات التطبيق", "تغيير ألوان CSS", "إنشاء قواعد بيانات"],
    },

    correct: 0,
  },

  /* =======================================================
     20 — ROUTE PARAMETERS
     ======================================================= */

  {
    title: {
      en: "Route Parameters",
      ar: "معاملات المسارات Route Parameters",
    },

    description: {
      en: "Learn how to pass dynamic values through URLs using route parameters.",
      ar: "تعرف على كيفية تمرير قيم ديناميكية من خلال URLs باستخدام Route Parameters.",
    },

    explanation: {
      en: "Route parameters allow a route to contain dynamic values. A common example is a user ID or product ID. The activated route can be used to read these values inside a component.",
      ar: "تسمح Route Parameters بوضع قيم ديناميكية داخل الـURL. ومن الأمثلة الشائعة User ID أو Product ID. ويمكن استخدام ActivatedRoute لقراءة هذه القيم داخل الـComponent.",
    },

    code: `{
  path: 'users/:id',
  component: UserComponent
}`,

    question: {
      en: "What does :id represent in a route?",
      ar: "ماذا يمثل :id داخل الـRoute؟",
    },

    answers: {
      en: ["A dynamic route parameter", "A CSS selector", "A component name"],

      ar: ["Route Parameter ديناميكي", "CSS Selector", "اسم Component"],
    },

    correct: 0,
  },

  /* =======================================================
     21 — FORMS
     ======================================================= */

  {
    title: {
      en: "Forms",
      ar: "النماذج Forms",
    },

    description: {
      en: "Learn the basics of handling user input and forms in Angular applications.",
      ar: "تعرف على أساسيات التعامل مع إدخال المستخدم والنماذج في Angular.",
    },

    explanation: {
      en: "Angular provides template-driven and reactive forms. Forms allow developers to collect input, track control state, validate values, and respond to submission.",
      ar: "يوفر Angular نوعين أساسيين من Forms وهما Template-driven Forms وReactive Forms. وتسمح Forms بجمع البيانات وتتبع حالة الحقول والتحقق من القيم ومعالجة Submit.",
    },

    code: `<form (ngSubmit)="submitForm()">

  <input
    name="email"
    [(ngModel)]="email">

  <button type="submit">
    Send
  </button>

</form>`,

    question: {
      en: "What are Angular forms mainly used for?",
      ar: "فيما تستخدم Angular Forms؟",
    },

    answers: {
      en: ["Handling and validating user input", "Creating CSS layouts", "Managing images"],

      ar: ["التعامل مع إدخال المستخدم والتحقق منه", "إنشاء تخطيطات CSS", "إدارة الصور"],
    },

    correct: 0,
  },

  /* =======================================================
     22 — VALIDATION
     ======================================================= */

  {
    title: {
      en: "Form Validation",
      ar: "التحقق من صحة النماذج",
    },

    description: {
      en: "Learn how Angular validates user input before accepting form data.",
      ar: "تعرف على كيفية التحقق من صحة بيانات المستخدم قبل قبول بيانات النموذج.",
    },

    explanation: {
      en: "Validation ensures that submitted data follows rules such as required fields, minimum length, maximum length, email format, and custom business rules. Angular exposes control states such as valid, invalid, touched, dirty, and pending.",
      ar: "يضمن Validation أن البيانات التي يدخلها المستخدم تتبع قواعد محددة مثل Required وMinimum Length وMaximum Length وصيغة Email والقواعد المخصصة. ويوفر Angular حالات مثل Valid وInvalid وTouched وDirty وPending.",
    },

    code: `<input
  required
  minlength="3"
  name="username"
  [(ngModel)]="username"
  #usernameModel="ngModel">

<p *ngIf="usernameModel.invalid">
  Username is invalid.
</p>`,

    question: {
      en: "Why is form validation important?",
      ar: "لماذا Form Validation مهمة؟",
    },

    answers: {
      en: ["To make sure input follows required rules", "To change the browser", "To create components"],

      ar: ["للتأكد من أن البيانات تتبع القواعد المطلوبة", "لتغيير المتصفح", "لإنشاء Components"],
    },

    correct: 0,
  },

  /* =======================================================
     23 — HTTP CLIENT
     ======================================================= */

  {
    title: {
      en: "HTTP Client",
      ar: "HTTP Client",
    },

    description: {
      en: "Learn how Angular applications communicate with APIs and backend services.",
      ar: "تعرف على كيفية تواصل تطبيقات Angular مع APIs وخدمات الـBackend.",
    },

    explanation: {
      en: "HttpClient is Angular's standard tool for making HTTP requests. It can perform GET, POST, PUT, PATCH, and DELETE requests and works naturally with Observables.",
      ar: "يُعد HttpClient الأداة الأساسية في Angular لإرسال HTTP Requests. ويمكنه تنفيذ GET وPOST وPUT وPATCH وDELETE، ويعمل بشكل طبيعي مع Observables.",
    },

    code: `this.http
  .get('/api/users')
  .subscribe(users => {
    console.log(users);
  });`,

    question: {
      en: "What is HttpClient commonly used for?",
      ar: "فيما يستخدم HttpClient؟",
    },

    answers: {
      en: ["Making HTTP requests to APIs", "Creating CSS animations", "Rendering HTML manually"],

      ar: ["إرسال HTTP Requests إلى APIs", "إنشاء CSS Animations", "عرض HTML يدويًا"],
    },

    correct: 0,
  },

  /* =======================================================
     24 — OBSERVABLES
     ======================================================= */

  {
    title: {
      en: "Observables",
      ar: "Observables",
    },

    description: {
      en: "Understand the role of Observables in handling asynchronous data streams.",
      ar: "افهم دور Observables في التعامل مع تدفقات البيانات غير المتزامنة.",
    },

    explanation: {
      en: "An Observable represents a stream of values that can arrive over time. Angular uses Observables heavily with HttpClient, Router events, forms, and RxJS. Components can subscribe to an Observable to react to emitted values.",
      ar: "يمثل Observable تدفقًا من القيم التي يمكن أن تصل مع مرور الوقت. ويستخدم Angular Observables بشكل كبير مع HttpClient وRouter وForms وRxJS. ويمكن للـComponent الاشتراك في Observable للتفاعل مع القيم التي يتم إصدارها.",
    },

    code: `this.userService
  .getUsers()
  .subscribe(users => {
    console.log(users);
  });`,

    question: {
      en: "What can an Observable represent?",
      ar: "ماذا يمكن أن يمثل Observable؟",
    },

    answers: {
      en: ["A stream of asynchronous values", "A CSS class", "An HTML attribute"],

      ar: ["تدفقًا من القيم غير المتزامنة", "CSS Class", "HTML Attribute"],
    },

    correct: 0,
  },

  /* =======================================================
     25 — RXJS
     ======================================================= */

  {
    title: {
      en: "RxJS Basics",
      ar: "أساسيات RxJS",
    },

    description: {
      en: "Learn the basic ideas behind RxJS and operators used with Observables.",
      ar: "تعرف على أساسيات RxJS والـOperators المستخدمة مع Observables.",
    },

    explanation: {
      en: "RxJS is a reactive programming library built around Observables. Operators such as map, filter, switchMap, debounceTime, and catchError help transform and control asynchronous streams.",
      ar: "RxJS هي مكتبة للـReactive Programming تعتمد على Observables. وتوفر Operators مثل map وfilter وswitchMap وdebounceTime وcatchError لتحويل والتحكم في تدفقات البيانات غير المتزامنة.",
    },

    code: `import { map } from 'rxjs/operators';

users$
  .pipe(
    map(users => users.length)
  )
  .subscribe(count => {
    console.log(count);
  });`,

    question: {
      en: "What is RxJS mainly used for?",
      ar: "فيما تستخدم RxJS بشكل أساسي؟",
    },

    answers: {
      en: ["Working with reactive and asynchronous data", "Creating HTML files", "Designing images"],

      ar: ["التعامل مع البيانات التفاعلية وغير المتزامنة", "إنشاء ملفات HTML", "تصميم الصور"],
    },

    correct: 0,
  },

  /* =======================================================
     26 — LIFECYCLE
     ======================================================= */

  {
    title: {
      en: "Lifecycle Hooks",
      ar: "Lifecycle Hooks",
    },

    description: {
      en: "Learn how Angular components move through different lifecycle stages.",
      ar: "تعرف على مراحل دورة حياة Components في Angular.",
    },

    explanation: {
      en: "Angular components have lifecycle stages from creation to destruction. Lifecycle hooks such as ngOnInit, ngOnChanges, ngAfterViewInit, and ngOnDestroy allow developers to run logic at specific points.",
      ar: "تمر Components في Angular بمراحل مختلفة منذ الإنشاء وحتى التدمير. وتسمح Lifecycle Hooks مثل ngOnInit وngOnChanges وngAfterViewInit وngOnDestroy بتنفيذ Logic في أوقات محددة.",
    },

    code: `import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {

  ngOnInit() {
    console.log('Component initialized');
  }

}`,

    question: {
      en: "When is ngOnInit commonly used?",
      ar: "متى تستخدم ngOnInit عادةً؟",
    },

    answers: {
      en: ["After Angular initializes the component", "Before the browser starts", "Only when CSS loads"],

      ar: ["بعد تهيئة Angular للمكون", "قبل تشغيل المتصفح", "فقط عند تحميل CSS"],
    },

    correct: 0,
  },

  /* =======================================================
     27 — PIPES
     ======================================================= */

  {
    title: {
      en: "Pipes",
      ar: "Pipes",
    },

    description: {
      en: "Learn how Angular pipes transform and format data directly inside templates.",
      ar: "تعرف على كيفية استخدام Pipes لتحويل وتنسيق البيانات داخل Templates.",
    },

    explanation: {
      en: "Pipes transform values for presentation without changing the original data. Angular provides built-in pipes such as uppercase, lowercase, date, currency, number, and percent. Developers can also create custom pipes.",
      ar: "تقوم Pipes بتحويل القيم لأغراض العرض دون تغيير البيانات الأصلية. ويوفر Angular Pipes جاهزة مثل uppercase وlowercase وdate وcurrency وnumber وpercent، كما يمكنك إنشاء Custom Pipes.",
    },

    code: `<p>
  {{ username | uppercase }}
</p>

<p>
  {{ price | currency }}
</p>`,

    question: {
      en: "What are Angular pipes used for?",
      ar: "فيما تستخدم Angular Pipes؟",
    },

    answers: {
      en: ["Transforming or formatting displayed data", "Creating components", "Connecting to CSS"],

      ar: ["تحويل أو تنسيق البيانات المعروضة", "إنشاء Components", "الاتصال بـCSS"],
    },

    correct: 0,
  },

  /* =======================================================
     28 — SIGNALS
     ======================================================= */

  {
    title: {
      en: "Signals",
      ar: "Signals",
    },

    description: {
      en: "Learn how Angular Signals represent reactive state and notify the application when values change.",
      ar: "تعرف على كيفية استخدام Angular Signals لتمثيل الـReactive State والتفاعل مع تغير القيم.",
    },

    explanation: {
      en: "Signals provide a modern reactive state primitive in Angular. A signal stores a value, reads are tracked, and updates can cause dependent parts of the UI to react. Signals can be especially useful for local component state.",
      ar: "توفر Signals طريقة حديثة لإدارة Reactive State في Angular. تقوم Signal بتخزين قيمة ويتم تتبع عمليات القراءة، وعند تحديثها يمكن للأجزاء التي تعتمد عليها من الواجهة أن تتفاعل مع التغيير. وهي مفيدة خصوصًا في إدارة الحالة المحلية داخل Components.",
    },

    code: `import { signal } from '@angular/core';

count = signal(0);

increase() {
  this.count.update(
    value => value + 1
  );
}`,

    question: {
      en: "What is a Signal mainly used for?",
      ar: "فيما تستخدم Signal بشكل أساسي؟",
    },

    answers: {
      en: ["Managing reactive state", "Creating databases", "Writing CSS"],

      ar: ["إدارة الـReactive State", "إنشاء قواعد البيانات", "كتابة CSS"],
    },

    correct: 0,
  },

  /* =======================================================
     29 — STANDALONE
     ======================================================= */

  {
    title: {
      en: "Standalone Components",
      ar: "Standalone Components",
    },

    description: {
      en: "Learn the modern Angular approach to building components without traditional NgModules.",
      ar: "تعرف على الطريقة الحديثة لبناء Components في Angular بدون الاعتماد على NgModules التقليدية.",
    },

    explanation: {
      en: "Standalone components can declare their own imports and work without being declared inside a traditional NgModule. This approach simplifies application structure and is now a central part of modern Angular development.",
      ar: "يمكن للمكونات المستقلة تعريف Imports الخاصة بها والعمل بدون أن تكون معلنة داخل NgModule تقليدي. ويساعد هذا الأسلوب على تبسيط بنية المشروع ويُعد من الأجزاء الأساسية في Angular الحديث.",
    },

    code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: '<h1>Home</h1>'
})
export class HomeComponent {}`,

    question: {
      en: "What does standalone: true indicate?",
      ar: "ماذا يعني standalone: true؟",
    },

    answers: {
      en: [
        "The component can work without a traditional NgModule",
        "The component is written only in CSS",
        "The component cannot use services",
      ],

      ar: [
        "يمكن للمكون العمل بدون NgModule تقليدي",
        "المكون مكتوب باستخدام CSS فقط",
        "المكون لا يستطيع استخدام Services",
      ],
    },

    correct: 0,
  },

  /* =======================================================
     30 — STATE MANAGEMENT
     ======================================================= */

  {
    title: {
      en: "State Management",
      ar: "إدارة الحالة State Management",
    },

    description: {
      en: "Learn how applications manage shared and changing data using reactive state techniques.",
      ar: "تعرف على كيفية إدارة البيانات المشتركة والمتغيرة داخل التطبيقات باستخدام أساليب Reactive State.",
    },

    explanation: {
      en: "State management is about controlling important application data and keeping the UI synchronized with that state. Small applications can use local component state, while larger applications may require shared services, signals, or dedicated state-management solutions.",
      ar: "تتعلق State Management بالتحكم في البيانات المهمة داخل التطبيق والحفاظ على تزامن الواجهة معها. يمكن للتطبيقات الصغيرة استخدام Local Component State، بينما قد تحتاج التطبيقات الكبيرة إلى Shared Services أو Signals أو حلول مخصصة لإدارة الحالة.",
    },

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

    question: {
      en: "Why is state management important?",
      ar: "لماذا State Management مهمة؟",
    },

    answers: {
      en: ["To organize and synchronize application data", "To replace HTML", "To remove TypeScript"],

      ar: ["لتنظيم ومزامنة بيانات التطبيق", "لاستبدال HTML", "لإزالة TypeScript"],
    },

    correct: 0,
  },

  /* =======================================================
     31 — ARCHITECTURE
     ======================================================= */

  {
    title: {
      en: "Angular Architecture",
      ar: "معمارية Angular",
    },

    description: {
      en: "Understand how components, services, routing, templates, state, and APIs work together.",
      ar: "افهم كيف تعمل Components وServices وRouting وTemplates وState وAPIs معًا داخل التطبيق.",
    },

    explanation: {
      en: "Good Angular architecture separates responsibilities. Components focus on UI interaction, services handle reusable logic and data access, routing handles navigation, and APIs provide backend data. Clear separation makes applications easier to test, maintain, and scale.",
      ar: "تعتمد معمارية Angular الجيدة على فصل المسؤوليات. تركز Components على التفاعل مع الواجهة، بينما تتعامل Services مع المنطق المشترك والوصول إلى البيانات، ويتولى Routing عملية التنقل، بينما توفر APIs بيانات الـBackend. هذا الفصل يجعل التطبيق أسهل في الاختبار والصيانة والتوسع.",
    },

    code: `Component
   ↓
Service
   ↓
API
   ↓
Backend`,

    question: {
      en: "Why is Angular architecture important?",
      ar: "لماذا معمارية Angular مهمة؟",
    },

    answers: {
      en: ["It helps organize large applications", "It removes the need for HTML", "It replaces the browser"],

      ar: ["تساعد على تنظيم التطبيقات الكبيرة", "تلغي الحاجة إلى HTML", "تستبدل المتصفح"],
    },

    correct: 0,
  },

  /* =======================================================
     32 — BEST PRACTICES
     ======================================================= */

  {
    title: {
      en: "Angular Best Practices",
      ar: "أفضل ممارسات Angular",
    },

    description: {
      en: "Learn practical principles for writing clean, maintainable, performant, and scalable Angular applications.",
      ar: "تعرف على مبادئ عملية لكتابة تطبيقات Angular نظيفة وقابلة للصيانة والأداء والتوسع.",
    },

    explanation: {
      en: "Good Angular development means keeping components focused, reusing services, using clear naming, organizing files logically, managing subscriptions correctly, avoiding unnecessary complexity, and designing components around clear responsibilities. Performance, accessibility, security, and maintainability should be considered from the beginning.",
      ar: "تطوير Angular بشكل جيد يعني الحفاظ على Components مركزة، وإعادة استخدام Services، واستخدام أسماء واضحة، وتنظيم الملفات منطقيًا، وإدارة Subscriptions بشكل صحيح، وتجنب التعقيد غير الضروري، وتصميم Components بمسؤوليات واضحة. ويجب الاهتمام أيضًا بالأداء وAccessibility والأمان وسهولة الصيانة منذ بداية المشروع.",
    },

    code: `src/
├── app/
│   ├── components/
│   ├── services/
│   ├── pages/
│   ├── models/
│   └── shared/
└── assets/`,

    question: {
      en: "Why should an Angular project be well organized?",
      ar: "لماذا يجب تنظيم مشروع Angular بشكل جيد؟",
    },

    answers: {
      en: ["To make the application easier to maintain", "To remove TypeScript", "To avoid using components"],

      ar: ["لجعل التطبيق أسهل في الصيانة", "لإزالة TypeScript", "لتجنب استخدام Components"],
    },

    correct: 0,
  },
];

/* =========================================================
   4. APPLICATION STATE
   ========================================================= */

let currentLesson = 0;
let lessonButtons = [];

const QUIZ_QUESTION_COUNT = 6;
let currentQuestion = 0;
let quizLocked = false;
let quizQuestionNumber = null;
let quizTotalQuestions = null;
let quizNextButton = null;
let quizQuestionsCache = [];

let copyTimer = null;
/* =========================================================
   5. QUIZ STORAGE
   ========================================================= */

const QUIZ_STORAGE_KEY = "fayad-angular-quiz-progress-v2";

function getQuizProgress() {
  try {
    const stored = JSON.parse(getStorage(QUIZ_STORAGE_KEY, "{}"));

    return stored && typeof stored === "object" ? stored : {};
  } catch (error) {
    return {};
  }
}

function saveQuizResult(lessonIndex, questionIndex) {
  const results = getQuizProgress();

  if (!Array.isArray(results[lessonIndex])) {
    results[lessonIndex] = [];
  }

  results[lessonIndex][questionIndex] = true;

  setStorage(QUIZ_STORAGE_KEY, JSON.stringify(results));
}

function isQuestionPassed(lessonIndex, questionIndex) {
  const results = getQuizProgress();

  return Array.isArray(results[lessonIndex]) && results[lessonIndex][questionIndex] === true;
}

function isQuizPassed(index) {
  for (let questionIndex = 0; questionIndex < QUIZ_QUESTION_COUNT; questionIndex++) {
    if (!isQuestionPassed(index, questionIndex)) {
      return false;
    }
  }

  return true;
}

function getPassedQuizCount() {
  return lessons.reduce((count, _, index) => {
    return count + (isQuizPassed(index) ? 1 : 0);
  }, 0);
}
/* =========================================================
   QUIZ QUESTION BANK + NAVIGATION
   ========================================================= */

const quizKeywords = [
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
  {
    en: "Angular architecture",
    ar: "معمارية Angular",
  },
  {
    en: "Best practices",
    ar: "أفضل الممارسات",
  },
];

const quizCodeHints = [
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
  {
    en: "feature-based architecture",
    ar: "feature-based architecture",
  },
  {
    en: "reusable code",
    ar: "كود قابل لإعادة الاستخدام",
  },
];

function normalizeQuizOption(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return {
      en: value,
      ar: value,
    };
  }

  return value;
}

function makeQuizQuestion(question, correctAnswer, distractors = []) {
  const options = [correctAnswer, ...distractors]
    .map(normalizeQuizOption)
    .filter(Boolean);

  const normalizedCorrect = normalizeQuizOption(correctAnswer);

  const correctIndex = options.findIndex((option) => {
    return (
      option.en === normalizedCorrect.en &&
      option.ar === normalizedCorrect.ar
    );
  });

  return {
    question,
    answers: options,
    correct: correctIndex >= 0 ? correctIndex : 0,
  };
}

function getLessonQuestions(index) {
  if (quizQuestionsCache[index]) {
    return quizQuestionsCache[index];
  }

  const lesson = lessons[index];

  if (!lesson) {
    return [];
  }

  const nextLesson = lessons[(index + 1) % lessons.length];
  const nextNextLesson = lessons[(index + 2) % lessons.length];

  const questions = [];

  /* Q1 */
  const originalAnswers = lesson.answers?.en || [];

  const originalQuestion = lesson.question;

  const originalCorrect = originalAnswers[lesson.correct];

  if (originalQuestion && originalCorrect) {
    questions.push(
      makeQuizQuestion(
        originalQuestion,
        originalCorrect,
        originalAnswers.filter((_, answerIndex) => answerIndex !== lesson.correct),
      ),
    );
  }

  /* Q2 */
  questions.push(
    makeQuizQuestion(
      {
        en: "What is the main focus of this lesson?",
        ar: "ما هو الموضوع الرئيسي لهذا الدرس؟",
      },
      lesson.title,
      [nextLesson?.title, nextNextLesson?.title],
    ),
  );

  /* Q3 */
  questions.push(
    makeQuizQuestion(
      {
        en: "Which statement best describes this topic?",
        ar: "أي عبارة تصف هذا الموضوع بشكل أفضل؟",
      },
      lesson.explanation,
      [nextLesson?.explanation, nextNextLesson?.explanation],
    ),
  );

  /* Q4 */
  questions.push(
    makeQuizQuestion(
      {
        en: "What is a practical goal of this lesson?",
        ar: "ما الهدف العملي من هذا الدرس؟",
      },
      lesson.description,
      [nextLesson?.description, nextNextLesson?.description],
    ),
  );

  /* Q5 */
  questions.push(
    makeQuizQuestion(
      {
        en: "Which Angular concept is directly related to this lesson?",
        ar: "أي مفهوم في Angular يرتبط مباشرة بهذا الدرس؟",
      },
      quizKeywords[index],
      [quizKeywords[(index + 1) % quizKeywords.length], quizKeywords[(index + 2) % quizKeywords.length]],
    ),
  );

  /* Q6 */
  questions.push(
    makeQuizQuestion(
      {
        en: "Which syntax or API is most closely associated with this lesson?",
        ar: "أي صيغة أو API ترتبط بشكل أكبر بهذا الدرس؟",
      },
      quizCodeHints[index],
      [quizCodeHints[(index + 1) % quizCodeHints.length], quizCodeHints[(index + 2) % quizCodeHints.length]],
    ),
  );

  quizQuestionsCache[index] = questions;

  return questions;
}
function goNextQuestion() {
  if (
    !isQuestionPassed(
      currentLesson,
      currentQuestion
    )
  ) {
    return;
  }

  if (
    currentQuestion >=
    QUIZ_QUESTION_COUNT - 1
  ) {
    return;
  }

  currentQuestion++;

  quizLocked = false;

  updateQuickCheck(
    lessons[currentLesson]
  );
}
/* =========================================================
   6. DOM ELEMENTS
   ========================================================= */

let lessonNumber;
let lessonTitle;
let lessonDescription;
let lessonExplanation;
let learnHeading;
let exampleCode;
let progressText;
let progressFill;
let previousButton;
let nextButton;
let copyButton;
let codeEditor;
let runButton;
let resetButton;
let angularResult;
let output;
let answerFeedback;
let languageButton;
let questionText;
let currentLessonNumber;
let totalLessons;
let nextLessonText;
let previousLessonText;

let answerButtons = [];

/* =========================================================
   7. STATIC TRANSLATIONS
   ========================================================= */

const staticText = {
  navbarCourseTitle: {
    en: "Angular Learning",
    ar: "تعلم Angular",
  },

  backText: {
    en: "Back",
    ar: "رجوع",
  },

  frameworkLabel: {
    en: "FRAMEWORK",
    ar: "إطار العمل",
  },

  lessonCount: {
    en: `${lessons.length} Lessons`,
    ar: `${lessons.length} درس`,
  },

  levelText: {
    en: "Beginner → Advanced",
    ar: "مبتدئ → متقدم",
  },

  fundamentalsTitle: {
    en: "FUNDAMENTALS",
    ar: "الأساسيات",
  },

  coreAngularTitle: {
    en: "CORE ANGULAR",
    ar: "أساسيات Angular",
  },

  advancedTitle: {
    en: "ADVANCED",
    ar: "متقدم",
  },

  lessonWord: {
    en: "Lesson",
    ar: "الدرس",
  },

  ofWord: {
    en: "of",
    ar: "من",
  },

  whatYouLearnLabel: {
    en: "WHAT YOU WILL LEARN",
    ar: "ماذا ستتعلم",
  },

  exampleLabel: {
    en: "ANGULAR EXAMPLE",
    ar: "مثال Angular",
  },

  codeExampleTitle: {
    en: "Code Example",
    ar: "مثال على الكود",
  },

  liveResultLabel: {
    en: "LIVE RESULT",
    ar: "النتيجة المباشرة",
  },

  practiceLabel: {
    en: "PRACTICE",
    ar: "تدريب",
  },

  tryItTitle: {
    en: "Try It Yourself",
    ar: "جرب بنفسك",
  },

  practiceDescription: {
    en: "Modify the example below and run your code to explore the Angular syntax.",
    ar: "عدّل المثال بالأسفل وشغّل الكود لاستكشاف صيغة Angular بنفسك.",
  },

  outputLabel: {
    en: "OUTPUT",
    ar: "المخرجات",
  },

  quickCheckLabel: {
    en: "QUICK CHECK",
    ar: "اختبار سريع",
  },
  questionWord: {
    en: "Question",
    ar: "السؤال",
  },

  nextQuestion: {
    en: "Next Question",
    ar: "السؤال التالي",
  },

  chooseAnswerText: {
    en: "Choose the best answer.",
    ar: "اختر أفضل إجابة.",
  },

  previousLabel: {
    en: "PREVIOUS",
    ar: "السابق",
  },

  nextLabel: {
    en: "NEXT LESSON",
    ar: "الدرس التالي",
  },

  previousLessonText: {
    en: "Previous Lesson",
    ar: "الدرس السابق",
  },

  courseComplete: {
    en: "Course Complete",
    ar: "اكتملت الدورة",
  },

  copy: {
    en: "Copy",
    ar: "نسخ",
  },

  copied: {
    en: "Copied!",
    ar: "تم النسخ!",
  },

  failed: {
    en: "Failed",
    ar: "فشل",
  },

  run: {
    en: "▶ Run",
    ar: "▶ تشغيل",
  },

  reset: {
    en: "Reset",
    ar: "إعادة ضبط",
  },

  correct: {
    en: "✓ Correct! Great job.",
    ar: "✓ إجابة صحيحة! أحسنت.",
  },

  wrong: {
    en: "✗ Not quite. Try again.",
    ar: "✗ ليست الإجابة الصحيحة. حاول مرة أخرى.",
  },

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

  ready: {
    en: "Ready to run your Angular example.",
    ar: "جاهز لتشغيل مثال Angular.",
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

  stateManagement: {
    en: "State management",
    ar: "إدارة الحالة",
  },
};

/* =========================================================
   8. DOM INITIALIZATION
   ========================================================= */

function cacheElements() {
  lessonNumber = document.getElementById("lessonNumber");

  lessonTitle = document.getElementById("lessonTitle");

  lessonDescription = document.getElementById("lessonDescription");

  lessonExplanation = document.getElementById("lessonExplanation");

  learnHeading = document.getElementById("learnHeading");

  exampleCode = document.getElementById("exampleCode");

  progressText = document.getElementById("progressText");

  progressFill = document.getElementById("progressFill");

  previousButton = document.getElementById("previousButton");

  nextButton = document.getElementById("nextButton");

  copyButton = document.getElementById("copyButton");

  codeEditor = document.getElementById("codeEditor");

  runButton = document.getElementById("runButton");

  resetButton = document.getElementById("resetButton");

  angularResult = document.getElementById("angularResult");

  output = document.getElementById("output");

  answerFeedback = document.getElementById("answerFeedback");

  languageButton = document.getElementById("languageButton");

  questionText = document.getElementById("questionText");
  quizQuestionNumber =
  document.getElementById("quizQuestionNumber");

quizTotalQuestions =
  document.getElementById("quizTotalQuestions");

quizNextButton =
  document.getElementById("quizNextButton");

  currentLessonNumber = document.getElementById("currentLessonNumber");

  totalLessons = document.getElementById("totalLessons");

  nextLessonText = document.getElementById("nextLessonText");

  previousLessonText = document.getElementById("previousLessonText");

  answerButtons = Array.from(document.querySelectorAll(".answer-options button"));
}

/* =========================================================
   9. SIDEBAR SYNC
   ========================================================= */

function syncSidebarWithLessons() {
  let buttons = Array.from(document.querySelectorAll(".lesson"));

  if (buttons.length < lessons.length) {
    let container =
      document.querySelector(".topic-group:last-child .lessons") ||
      document.querySelector(".lessons") ||
      document.querySelector(".sidebar-lessons") ||
      document.querySelector(".sidebar");

    if (container) {
      for (let i = buttons.length; i < lessons.length; i++) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "lesson";

        button.innerHTML = `
          <span class="lesson-status">
            ${String(i + 1).padStart(2, "0")}
          </span>

          <span class="lesson-name"></span>
        `;

        container.appendChild(button);
      }
    }
  }

  lessonButtons = Array.from(document.querySelectorAll(".lesson")).slice(0, lessons.length);

  lessonButtons.forEach((button, index) => {
    button.dataset.lessonIndex = index;

    button.setAttribute("aria-label", t(lessons[index].title));
  });
}

/* =========================================================
   10. STATIC LANGUAGE
   ========================================================= */

function updateStaticLanguage() {
  Object.entries(staticText).forEach(([id, value]) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = t(value);
  });

  if (languageButton) {
    languageButton.textContent = currentLanguage === "en" ? "AR" : "EN";

    languageButton.setAttribute(
      "aria-label",
      currentLanguage === "en" ? "تغيير اللغة إلى العربية" : "Change language to English",
    );
  }

  if (runButton) {
    runButton.textContent = t(staticText.run);
  }

  if (resetButton) {
    resetButton.textContent = t(staticText.reset);
  }

  if (copyButton) {
    copyButton.textContent = t(staticText.copy);
  }

  document.title = currentLanguage === "en" ? "Fayad — Angular Learning" : "فياض — تعلم Angular";
}

/* =========================================================
   11. UPDATE SIDEBAR
   ========================================================= */

function updateSidebar() {
  lessonButtons.forEach((button, index) => {
    const lesson = lessons[index];

    if (!lesson) {
      button.hidden = true;
      return;
    }

    button.hidden = false;

    const isCurrent = index === currentLesson;

    button.classList.toggle("active", isCurrent);

    button.setAttribute("aria-current", isCurrent ? "step" : "false");

    const status = button.querySelector(".lesson-status");

    if (status) {
      status.textContent = String(index + 1).padStart(2, "0");

      status.classList.toggle("current", isCurrent);
    }

    const name = button.querySelector(".lesson-name");

    if (name) {
      name.textContent = t(lesson.title);
    }

    button.title = t(lesson.title);
  });
}

/* =========================================================
   12. NAVIGATION
   ========================================================= */

function updateNavigation() {
  if (previousButton) {
    previousButton.disabled = currentLesson === 0;
  }

  if (nextButton) {
    nextButton.disabled = currentLesson === lessons.length - 1;
  }

  if (nextLessonText) {
    const nextLesson = lessons[currentLesson + 1];

    nextLessonText.textContent = nextLesson ? t(nextLesson.title) : t(staticText.courseComplete);
  }

  if (previousLessonText) {
    const previousLesson = lessons[currentLesson - 1];

    previousLessonText.textContent = previousLesson ? t(previousLesson.title) : t(staticText.previousLessonText);
  }
}

/* =========================================================
   13. QUIZ RESET
   ========================================================= */

function resetQuickCheck() {
  quizLocked = false;

  if (answerFeedback) {
    answerFeedback.textContent = "";
    answerFeedback.style.color = "";
  }

  answerButtons.forEach((button) => {
    button.disabled = false;

    button.classList.remove("correct-answer", "wrong-answer");

    button.style.background = "";
    button.style.borderColor = "";
  });
}
/* =========================================================
14. UPDATE QUIZ
========================================================= */
function updateQuickCheck(lesson) {
  if (!lesson) {
    return;
  }

  const questions = getLessonQuestions(currentLesson);
  const question = questions[currentQuestion];

  if (!question) {
    return;
  }

  /* -------------------------------------------------------
     QUESTION TITLE
  ------------------------------------------------------- */

  if (questionText) {
    questionText.textContent = t(question.question);
  }

  /* -------------------------------------------------------
     QUESTION PROGRESS
  ------------------------------------------------------- */

  if (quizQuestionNumber) {
    quizQuestionNumber.textContent =
      `${t(staticText.questionWord)} ${currentQuestion + 1}`;
  }

  if (quizTotalQuestions) {
    quizTotalQuestions.textContent = String(QUIZ_QUESTION_COUNT);
  }

  /* -------------------------------------------------------
     GET ANSWERS
  ------------------------------------------------------- */

  const answers = Array.isArray(question.answers)
    ? question.answers
    : [];

  /* -------------------------------------------------------
     CREATE ORIGINAL INDEXES
     
     مثال:
     [0, 1, 2]

     ثم يتم عمل Shuffle:

     [2, 0, 1]

     الرقم الموجود هنا هو رقم الإجابة الأصلي
     وليس رقم الزر الحالي.
  ------------------------------------------------------- */

  const shuffledIndexes = answers.map((_, index) => index);

  for (let i = shuffledIndexes.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffledIndexes[i], shuffledIndexes[randomIndex]] = [
      shuffledIndexes[randomIndex],
      shuffledIndexes[i],
    ];
  }

  /* -------------------------------------------------------
     STORE SHUFFLED ORDER
     
     مهم جدًا:
     لا نغير question.answers نفسها.
  ------------------------------------------------------- */

  question._shuffledIndexes = shuffledIndexes;

  /* -------------------------------------------------------
     QUIZ LOCK
  ------------------------------------------------------- */

  quizLocked = isQuestionPassed(
    currentLesson,
    currentQuestion
  );

  /* -------------------------------------------------------
     RENDER ANSWERS
  ------------------------------------------------------- */

  answerButtons.forEach((button, displayIndex) => {
    const originalIndex = shuffledIndexes[displayIndex];

    if (originalIndex === undefined) {
      button.textContent = "";
      button.disabled = true;

      delete button.dataset.answerIndex;
      delete button.dataset.originalIndex;

      return;
    }

    const answerValue = answers[originalIndex];

    button.textContent = t(answerValue);

    /*
      answerIndex:
      رقم الزر الظاهر حاليًا.

      originalIndex:
      رقم الإجابة الحقيقي داخل السؤال.
    */

    button.dataset.answerIndex = String(displayIndex);
    button.dataset.originalIndex = String(originalIndex);

    button.disabled = quizLocked;

    button.classList.remove(
      "wrong-answer",
      "correct-answer"
    );

    button.removeAttribute("aria-invalid");

    /* -----------------------------------------------------
       IF ALREADY PASSED
       SHOW THE REAL CORRECT ANSWER
    ----------------------------------------------------- */

    if (
      quizLocked &&
      originalIndex === Number(question.correct)
    ) {
      button.classList.add("correct-answer");
    }
  });

  /* -------------------------------------------------------
     FEEDBACK
  ------------------------------------------------------- */

  if (answerFeedback) {
    if (quizLocked) {
      answerFeedback.textContent =
        t(staticText.correct);

      answerFeedback.style.color = "#159570";
    } else {
      answerFeedback.textContent = "";
      answerFeedback.style.color = "";
    }
  }

  /* -------------------------------------------------------
     NEXT QUESTION
  ------------------------------------------------------- */

  if (quizNextButton) {
    const isLastQuestion =
      currentQuestion >= QUIZ_QUESTION_COUNT - 1;

    const canMoveNext =
      isQuestionPassed(
        currentLesson,
        currentQuestion
      );

    quizNextButton.textContent =
      t(staticText.nextQuestion);

    quizNextButton.disabled =
      !canMoveNext || isLastQuestion;

    quizNextButton.style.display =
      isLastQuestion ? "none" : "";
  }
}
/* =========================================================
   15. DRAFT STORAGE
   ========================================================= */

function getDraft(index) {
  return getStorage(`fayad-angular-draft-${index}`, null);
}

function saveDraft(index, code) {
  setStorage(`fayad-angular-draft-${index}`, code);
}

function clearDraft(index) {
  removeStorage(`fayad-angular-draft-${index}`);
}

/* =========================================================
   16. LOAD LESSON
   ========================================================= */

function loadLesson(index, saveProgress = true, preserveEditor = false) {
  if (!lessons.length) return;

  index = Number(index);

  if (Number.isNaN(index)) {
    index = 0;
  }

  index = Math.max(0, Math.min(index, lessons.length - 1));

  const previousLesson = currentLesson;

  currentLesson = index;

  if (currentLesson !== previousLesson) {
    currentQuestion = 0;
  }
  const lesson = lessons[currentLesson];

  /* -------------------------------------------------------
     LESSON HEADER
     ------------------------------------------------------- */

  if (lessonNumber) {
    lessonNumber.textContent =
      currentLanguage === "en"
        ? `LESSON ${String(currentLesson + 1).padStart(2, "0")}`
        : `الدرس ${String(currentLesson + 1).padStart(2, "0")}`;
  }

  if (lessonTitle) {
    lessonTitle.textContent = t(lesson.title);
  }

  if (lessonDescription) {
    lessonDescription.textContent = t(lesson.description);
  }

  /* -------------------------------------------------------
     WHAT YOU LEARN
     ------------------------------------------------------- */

  if (learnHeading) {
    learnHeading.textContent = t(lesson.title);
  }

  if (lessonExplanation) {
    lessonExplanation.textContent = t(lesson.explanation);
  }

  /* -------------------------------------------------------
     EXAMPLE
     ------------------------------------------------------- */

  if (exampleCode) {
    exampleCode.textContent = lesson.code;
  }

  /* -------------------------------------------------------
     PRACTICE
     ------------------------------------------------------- */

  const savedDraft = getDraft(currentLesson);

  if (codeEditor) {
    if (preserveEditor) {
      /* Keep whatever the learner currently wrote. */
    } else if (savedDraft !== null) {
      codeEditor.value = savedDraft;
    } else {
      codeEditor.value = lesson.code;
    }
  }

  /* -------------------------------------------------------
     PROGRESS
     ------------------------------------------------------- */

  const progress = Math.round(((currentLesson + 1) / lessons.length) * 100);

  if (progressText) {
    progressText.textContent = `${progress}%`;
  }

  if (progressFill) {
    progressFill.style.width = `${progress}%`;

    progressFill.setAttribute("aria-valuenow", progress);
  }

  if (currentLessonNumber) {
    currentLessonNumber.textContent = String(currentLesson + 1).padStart(2, "0");
  }

  if (totalLessons) {
    totalLessons.textContent = lessons.length;
  }

  /* -------------------------------------------------------
     SIDEBAR
     ------------------------------------------------------- */

  updateSidebar();

  /* -------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------- */

  updateNavigation();

  /* -------------------------------------------------------
     QUICK CHECK
     ------------------------------------------------------- */

  resetQuickCheck();

  updateQuickCheck(lesson);

  /* -------------------------------------------------------
     SAVE PROGRESS
     ------------------------------------------------------- */

  if (saveProgress) {
    setStorage("fayad-angular-current-lesson", currentLesson);
  }

  /* -------------------------------------------------------
     PRACTICE PREVIEW
     ------------------------------------------------------- */

  runAngularCode();
}

/* =========================================================
   17. SCROLL TO TOP
   ========================================================= */

function scrollToLessonTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* =========================================================
   18. SIDEBAR EVENTS
   ========================================================= */

function bindSidebarEvents() {
  lessonButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.lessonIndex);

      if (Number.isNaN(index)) {
        return;
      }

      loadLesson(index);

      scrollToLessonTop();
    });
  });
}

/* =========================================================
   19. PREVIOUS LESSON
   ========================================================= */

function goPreviousLesson() {
  if (currentLesson <= 0) {
    return;
  }

  loadLesson(currentLesson - 1);

  scrollToLessonTop();
}

/* =========================================================
   20. NEXT LESSON
   ========================================================= */
function goNextLesson() {
  if (currentLesson >= lessons.length - 1) {
    return;
  }

  if (!isQuizPassed(currentLesson)) {
    updateQuickCheck(lessons[currentLesson]);

    return;
  }

  loadLesson(currentLesson + 1);

  scrollToLessonTop();
}

/* =========================================================
   21. VALUE RESOLVER
   ========================================================= */

function resolveExpression(expression, code) {
  const cleanExpression = expression.trim().replace(/;$/, "");

  /* Simple string */

  const stringRegex = new RegExp(`${escapeRegExp(cleanExpression)}\\s*=\\s*['"]([^'"]*)['"]`);

  const stringMatch = code.match(stringRegex);

  if (stringMatch) {
    return stringMatch[1];
  }

  /* signal(value) */

  const signalRegex = new RegExp(`${escapeRegExp(cleanExpression)}\\s*=\\s*signal\\(([^)]*)\\)`);

  const signalMatch = code.match(signalRegex);

  if (signalMatch) {
    const value = signalMatch[1].trim().replace(/^['"]|['"]$/g, "");

    return value;
  }

  /* number */

  const numberRegex = new RegExp(`${escapeRegExp(cleanExpression)}\\s*=\\s*(-?\\d+(?:\\.\\d+)?)`);

  const numberMatch = code.match(numberRegex);

  if (numberMatch) {
    return numberMatch[1];
  }

  return cleanExpression;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* =========================================================
   22. EXTRACT DISPLAY TEXT
   ========================================================= */

function extractVisibleText(code) {
  const htmlText = code.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");

  const matches = htmlText.match(/>([^<]+)</g);

  if (!matches) {
    return "";
  }

  const texts = matches.map((item) => item.slice(1, -1).trim()).filter(Boolean);

  return texts.join(" • ");
}

/* =========================================================
   23. ANGULAR PRACTICE RUNNER
   ========================================================= */

function runAngularCode() {
  if (!codeEditor || !angularResult || !output) {
    return;
  }

  const code = codeEditor.value.trim();

  if (!code) {
    angularResult.textContent = t(staticText.writeCode);

    output.textContent = t(staticText.nothingPreview);

    return;
  }

  let previewText = t(staticText.angularPreview);

  const features = [];

  /* -------------------------------------------------------
     COMPONENT
     ------------------------------------------------------- */

  if (/@Component\s*\(/.test(code)) {
    features.push(t(staticText.component));
  }

  /* -------------------------------------------------------
     INTERPOLATION
     ------------------------------------------------------- */

  const interpolationRegex = /\{\{\s*([^}]+?)\s*\}\}/g;

  const interpolations = [...code.matchAll(interpolationRegex)];

  if (interpolations.length) {
    features.push(t(staticText.interpolation));

    const values = interpolations.map((match) => resolveExpression(match[1], code));

    if (values.length) {
      previewText = values.join(" • ");
    }
  }

  /* -------------------------------------------------------
     COMMON TEXT
     ------------------------------------------------------- */

  const visibleText = extractVisibleText(code);

  if (visibleText) {
    previewText = visibleText;
  }

  /* -------------------------------------------------------
     SPECIAL TEXT
     ------------------------------------------------------- */

  const knownTexts = [
    "Hello Angular",
    "Product Card",
    "Welcome to Angular",
    "Welcome back!",
    "Please log in.",
    "Dashboard",
    "Home",
  ];

  for (const text of knownTexts) {
    if (code.includes(text)) {
      previewText = text;

      break;
    }
  }

  /* -------------------------------------------------------
     CONDITIONAL
     ------------------------------------------------------- */

  if (code.includes("*ngIf")) {
    features.push(t(staticText.conditionalRendering));
  }

  /* -------------------------------------------------------
     LIST
     ------------------------------------------------------- */

  if (code.includes("*ngFor") || code.includes("@for")) {
    features.push(t(staticText.listRendering));
  }

  /* -------------------------------------------------------
     TWO-WAY
     ------------------------------------------------------- */

  if (code.includes("[(ngModel)]")) {
    features.push(t(staticText.twoWayBinding));
  }

  /* -------------------------------------------------------
     PROPERTY
     ------------------------------------------------------- */

  if (/\[[a-zA-Z0-9_-]+\]\s*=/.test(code)) {
    features.push(t(staticText.propertyBinding));
  }

  /* -------------------------------------------------------
     EVENT
     ------------------------------------------------------- */

  if (/\([a-zA-Z0-9_-]+\)\s*=/.test(code)) {
    features.push(t(staticText.eventBinding));
  }

  /* -------------------------------------------------------
     PIPES
     ------------------------------------------------------- */

  if (/\|\s*uppercase\b/.test(code)) {
    features.push(t(staticText.uppercasePipe));
  }

  if (/\|\s*currency\b/.test(code)) {
    features.push(t(staticText.currencyPipe));
  }

  /* -------------------------------------------------------
     INPUT / OUTPUT
     ------------------------------------------------------- */

  if (/@Input\s*\(/.test(code) || /@Output\s*\(/.test(code)) {
    features.push(t(staticText.inputOutput));
  }

  /* -------------------------------------------------------
     SERVICES
     ------------------------------------------------------- */

  if (/@Injectable\s*\(/.test(code) || /Service\b/.test(code)) {
    features.push(t(staticText.service));
  }

  /* -------------------------------------------------------
     DEPENDENCY INJECTION
     ------------------------------------------------------- */

  if (/constructor\s*\(/.test(code) || /\binject\s*\(/.test(code)) {
    features.push(t(staticText.dependencyInjection));
  }

  /* -------------------------------------------------------
     ROUTING
     ------------------------------------------------------- */

  if (/\bRoutes\b/.test(code) || /\bRouter\b/.test(code) || /path\s*:/.test(code)) {
    features.push(t(staticText.routing));
  }

  /* -------------------------------------------------------
     ROUTE PARAMETER
     ------------------------------------------------------- */

  if (/:[a-zA-Z_$][\w$]*/.test(code)) {
    features.push(t(staticText.routeParameter));
  }

  /* -------------------------------------------------------
     FORMS
     ------------------------------------------------------- */

  if (/\bngModel\b/.test(code) || /ngSubmit/.test(code) || /<form\b/i.test(code)) {
    features.push(t(staticText.forms));
  }

  /* -------------------------------------------------------
     VALIDATION
     ------------------------------------------------------- */

  if (
    /\brequired\b/.test(code) ||
    /\bminlength\b/.test(code) ||
    /\bmaxlength\b/.test(code) ||
    /\.invalid\b/.test(code)
  ) {
    features.push(t(staticText.validation));
  }

  /* -------------------------------------------------------
     HTTP
     ------------------------------------------------------- */

  if (/\bHttpClient\b/.test(code) || /\.get\s*\(/.test(code) || /\.post\s*\(/.test(code)) {
    features.push(t(staticText.httpClient));
  }

  /* -------------------------------------------------------
     OBSERVABLE
     ------------------------------------------------------- */

  if (/\bObservable\b/.test(code) || /\.subscribe\s*\(/.test(code)) {
    features.push(t(staticText.observable));
  }

  /* -------------------------------------------------------
     RXJS
     ------------------------------------------------------- */

  if (
    /\.pipe\s*\(/.test(code) ||
    /\bmap\s*\(/.test(code) ||
    /\bfilter\s*\(/.test(code) ||
    /\bswitchMap\s*\(/.test(code)
  ) {
    features.push(t(staticText.rxjs));
  }

  /* -------------------------------------------------------
     LIFECYCLE
     ------------------------------------------------------- */

  if (/\bngOnInit\b/.test(code) || /\bngOnDestroy\b/.test(code) || /\bngOnChanges\b/.test(code)) {
    features.push(t(staticText.lifecycle));
  }

  /* -------------------------------------------------------
     SIGNALS
     ------------------------------------------------------- */

  if (/\bsignal\s*\(/.test(code) || /\.set\s*\(/.test(code) || /\.update\s*\(/.test(code)) {
    features.push(t(staticText.signals));
  }

  /* -------------------------------------------------------
     STANDALONE
     ------------------------------------------------------- */

  if (/standalone\s*:\s*true/.test(code)) {
    features.push(t(staticText.standalone));
  }

  /* -------------------------------------------------------
     REMOVE DUPLICATES
     ------------------------------------------------------- */

  const uniqueFeatures = [...new Set(features)];

  /* -------------------------------------------------------
     RESULT
     ------------------------------------------------------- */

  angularResult.textContent = previewText;

  if (uniqueFeatures.length) {
    output.textContent = `${t(staticText.detected)} ${uniqueFeatures.join(", ")}`;
  } else {
    output.textContent = t(staticText.codeLoaded);
  }
}

/* =========================================================
   24. RESET EDITOR
   ========================================================= */

function resetEditor() {
  if (!codeEditor) {
    return;
  }

  clearDraft(currentLesson);

  codeEditor.value = lessons[currentLesson].code;

  runAngularCode();

  if (output) {
    output.textContent = t(staticText.ready);
  }
}

/* =========================================================
   25. COPY CODE
   ========================================================= */

async function copyCode() {
  if (!copyButton || !exampleCode) {
    return;
  }

  const code = exampleCode.textContent || "";

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code);
    } else {
      const textarea = document.createElement("textarea");

      textarea.value = code;

      textarea.style.position = "fixed";

      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      document.execCommand("copy");

      textarea.remove();
    }

    copyButton.textContent = t(staticText.copied);

    clearTimeout(copyTimer);

    copyTimer = setTimeout(() => {
      copyButton.textContent = t(staticText.copy);
    }, 1500);
  } catch (error) {
    copyButton.textContent = t(staticText.failed);

    clearTimeout(copyTimer);

    copyTimer = setTimeout(() => {
      copyButton.textContent = t(staticText.copy);
    }, 1500);
  }
}

/* =========================================================
   26. QUIZ EVENTS
   ========================================================= */

function handleQuizAnswer(displayIndex) {
  if (quizLocked) {
    return;
  }

  const questions = getLessonQuestions(currentLesson);

  const question = questions[currentQuestion];

  if (!question) {
    return;
  }

  /* -------------------------------------------------------
     GET CLICKED BUTTON
  ------------------------------------------------------- */

  const clickedButton =
    answerButtons[displayIndex];

  if (!clickedButton) {
    return;
  }

  /* -------------------------------------------------------
     IMPORTANT:
     
     displayIndex != correct index

     لأن الإجابات تم عمل Shuffle لها.

     لذلك نقرأ originalIndex من الـdataset.
  ------------------------------------------------------- */

  const originalIndex =
    Number(clickedButton.dataset.originalIndex);

  if (Number.isNaN(originalIndex)) {
    return;
  }

  /* -------------------------------------------------------
     CHECK REAL ANSWER
  ------------------------------------------------------- */

  if (originalIndex === Number(question.correct)) {

    /* -----------------------------------------------
       SAVE QUESTION AS PASSED
    ----------------------------------------------- */

    saveQuizResult(
      currentLesson,
      currentQuestion
    );

    /* -----------------------------------------------
       LOCK QUESTION
    ----------------------------------------------- */

    quizLocked = true;

    /* -----------------------------------------------
       REFRESH QUIZ
       
       سيتم عمل Shuffle جديد، لكن الصحيح سيظل
       مرتبطًا بالـoriginalIndex.
    ----------------------------------------------- */

    updateQuickCheck(
      lessons[currentLesson]
    );

    return;
  }

  /* -------------------------------------------------------
     WRONG ANSWER
  ------------------------------------------------------- */

  if (answerFeedback) {
    answerFeedback.textContent =
      t(staticText.wrong);

    answerFeedback.style.color =
      "#c55353";
  }

  clickedButton.classList.add(
    "wrong-answer"
  );

  clickedButton.setAttribute(
    "aria-invalid",
    "true"
  );

  setTimeout(() => {
    clickedButton.classList.remove(
      "wrong-answer"
    );

    clickedButton.removeAttribute(
      "aria-invalid"
    );
  }, 900);
}
/* =========================================================
   27. KEYBOARD NAVIGATION
   ========================================================= */

function handleKeyboardNavigation(event) {
  const target = event.target;

  const tag = target?.tagName?.toLowerCase();

  const isTyping =
    tag === "textarea" || tag === "input" || tag === "select" || tag === "button" || target?.isContentEditable;

  if (isTyping) {
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();

    if (currentLanguage === "ar") {
      goPreviousLesson();
    } else {
      goNextLesson();
    }
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    if (currentLanguage === "ar") {
      goNextLesson();
    } else {
      goPreviousLesson();
    }
  }
}

/* =========================================================
   28. EVENT BINDING
   ========================================================= */

function bindEvents() {
  /* Sidebar */

  bindSidebarEvents();

  /* Previous */

  if (previousButton) {
    previousButton.addEventListener("click", goPreviousLesson);
  }

  /* Next */

  if (nextButton) {
    nextButton.addEventListener("click", goNextLesson);
  }

  /* Run */

  if (runButton) {
    runButton.addEventListener("click", runAngularCode);
  }

  /* Reset */

  if (resetButton) {
    resetButton.addEventListener("click", resetEditor);
  }

  /* Copy */

  if (copyButton) {
    copyButton.addEventListener("click", copyCode);
  }

  /* Language */

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      setLanguage(currentLanguage === "en" ? "ar" : "en");
    });
  }

  /* Editor */

  if (codeEditor) {
    codeEditor.addEventListener("input", () => {
      saveDraft(currentLesson, codeEditor.value);

      runAngularCode();
    });
  }

/* Quiz */

answerButtons.forEach((button, displayIndex) => {
  button.addEventListener("click", () => {
    handleQuizAnswer(displayIndex);
  });
});

if (quizNextButton) {
  quizNextButton.addEventListener("click", goNextQuestion);
}
  /* Keyboard */

  document.addEventListener("keydown", handleKeyboardNavigation);
}

/* =========================================================
   29. PUBLIC API
   ========================================================= */

function getProgress() {
  const passedQuizzes = getPassedQuizCount();

  return {
    currentLesson,

    currentLessonNumber: currentLesson + 1,

    totalLessons: lessons.length,

    lessonProgress: Math.round(((currentLesson + 1) / lessons.length) * 100),

    passedQuizzes,

    quizProgress: Math.round((passedQuizzes / lessons.length) * 100),
  };
}

/* =========================================================
   30. INITIALIZATION
   ========================================================= */

function initAngularLearning() {
  if (window.__FAYAD_ANGULAR_ENGINE_INITIALIZED__) {
    return;
  }

  window.__FAYAD_ANGULAR_ENGINE_INITIALIZED__ = true;

  cacheElements();

  syncSidebarWithLessons();

  document.documentElement.lang = currentLanguage;

  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  updateStaticLanguage();

  bindEvents();

  const savedLesson = getStorage("fayad-angular-current-lesson", null);

  let startingLesson = 0;

  if (savedLesson !== null) {
    const parsedLesson = Number(savedLesson);

    if (!Number.isNaN(parsedLesson)) {
      startingLesson = parsedLesson;
    }
  }

  loadLesson(startingLesson, false);
}

/* =========================================================
   31. GLOBAL FAYAD ANGULAR API
   ========================================================= */

window.FAYADAngular = {
  lessons,

  loadLesson,

  nextLesson: goNextLesson,

  previousLesson: goPreviousLesson,

  run: runAngularCode,

  reset: resetEditor,

  setLanguage,

  getProgress,

  getCurrentLesson: () => currentLesson,

  getLanguage: () => currentLanguage,
};

/* =========================================================
   32. START
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAngularLearning);
} else {
  initAngularLearning();
}
