/* =========================================================
   FAYAD — ANGULAR LEARNING ENGINE
   BILINGUAL VERSION
   EN / AR
   ========================================================= */

/* =========================================================
   1. LANGUAGE
   ========================================================= */

let currentLanguage = localStorage.getItem("fayad-language") || "en";

function t(value) {
  if (!value) return "";
  return value[currentLanguage] ?? value.en ?? "";
}

function setLanguage(language) {
  currentLanguage = language === "ar" ? "ar" : "en";

  localStorage.setItem("fayad-language", currentLanguage);

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  updateStaticLanguage();
  updateSidebar();
  loadLesson(currentLesson, false);
}

/* =========================================================
   2. LESSON DATA
   ========================================================= */

const lessons = [
  {
    title: {
      en: "Introduction to Angular",
      ar: "مقدمة إلى Angular",
    },

    description: {
      en: "Learn what Angular is, why developers use it, and how it helps build modern web applications.",
      ar: "تعرف على Angular ولماذا يستخدمه المطورون وكيف يساعد في بناء تطبيقات ويب حديثة.",
    },

    explanation: {
      en: "Angular is a powerful framework for building scalable web applications using components, templates, services, routing, and reactive features.",
      ar: "Angular هو إطار عمل قوي لبناء تطبيقات ويب قابلة للتوسع باستخدام المكونات والقوالب والخدمات والتوجيه والميزات التفاعلية.",
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

  {
    title: {
      en: "Angular CLI",
      ar: "Angular CLI",
    },

    description: {
      en: "Learn how Angular CLI helps developers create, run, build, and manage Angular projects.",
      ar: "تعرف على كيفية مساعدة Angular CLI للمطورين في إنشاء وتشغيل وبناء وإدارة مشاريع Angular.",
    },

    explanation: {
      en: "Angular CLI is a command-line tool that simplifies common Angular development tasks.",
      ar: "Angular CLI هي أداة تعمل من خلال سطر الأوامر وتسهّل المهام الشائعة في تطوير Angular.",
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

  {
    title: {
      en: "Project Structure",
      ar: "هيكل المشروع",
    },

    description: {
      en: "Understand the important files and folders inside an Angular project.",
      ar: "تعرف على أهم الملفات والمجلدات الموجودة داخل مشروع Angular.",
    },

    explanation: {
      en: "A well-organized Angular project separates components, services, pages, assets, and configuration files.",
      ar: "المشروع المنظم في Angular يفصل بين المكونات والخدمات والصفحات والملفات الثابتة وملفات الإعداد.",
    },

    code: `src/
├── app/
│   ├── components/
│   ├── services/
│   └── pages/
├── assets/
└── main.ts`,

    question: {
      en: "Where is most application code located?",
      ar: "أين يوجد معظم كود التطبيق؟",
    },

    answers: {
      en: ["Inside the src folder", "Inside the browser", "Inside package.json only"],
      ar: ["داخل مجلد src", "داخل المتصفح", "داخل package.json فقط"],
    },

    correct: 0,
  },

  {
    title: {
      en: "Components",
      ar: "المكونات",
    },

    description: {
      en: "Learn how Angular components organize an application into reusable UI and logic.",
      ar: "تعلم كيف تنظم مكونات Angular التطبيق إلى أجزاء قابلة لإعادة الاستخدام.",
    },

    explanation: {
      en: "A component controls a part of the user interface and contains its template, logic, and styles.",
      ar: "المكون يتحكم في جزء من واجهة المستخدم ويحتوي على القالب والمنطق والتنسيقات الخاصة به.",
    },

    code: `@Component({
  selector: 'app-card',
  template: '<h2>Product Card</h2>'
})
export class CardComponent {}`,

    question: {
      en: "What is an Angular component?",
      ar: "ما هو مكون Angular؟",
    },

    answers: {
      en: ["A reusable part of the user interface", "A database", "A CSS property"],
      ar: ["جزء قابل لإعادة الاستخدام من واجهة المستخدم", "قاعدة بيانات", "خاصية CSS"],
    },

    correct: 0,
  },

  {
    title: {
      en: "Templates",
      ar: "القوالب",
    },

    description: {
      en: "Learn how Angular templates define the HTML structure displayed by components.",
      ar: "تعرف على كيفية استخدام قوالب Angular لتحديد بنية HTML التي تعرضها المكونات.",
    },

    explanation: {
      en: "Angular templates combine HTML with Angular syntax to create dynamic user interfaces.",
      ar: "تجمع قوالب Angular بين HTML وخصائص Angular لإنشاء واجهات مستخدم ديناميكية.",
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

  {
    title: {
      en: "Data Binding",
      ar: "ربط البيانات",
    },

    description: {
      en: "Learn how Angular connects component data with the user interface.",
      ar: "تعرف على كيفية ربط Angular بين بيانات المكون وواجهة المستخدم.",
    },

    explanation: {
      en: "Data binding allows information to move between component logic and the template.",
      ar: "يسمح ربط البيانات بانتقال المعلومات بين منطق المكون والـTemplate.",
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
      ar: ["بيانات المكون وواجهة المستخدم", "قاعدتي بيانات", "CSS والمتصفح"],
    },

    correct: 0,
  },

  {
    title: {
      en: "Interpolation",
      ar: "Interpolation",
    },

    description: {
      en: "Learn how Angular interpolation displays component data inside HTML templates.",
      ar: "تعرف على كيفية عرض بيانات المكون داخل HTML باستخدام Interpolation.",
    },

    explanation: {
      en: "Interpolation uses double curly braces to display values from the component.",
      ar: "تستخدم Interpolation الأقواس المعقوفة المزدوجة لعرض القيم القادمة من المكون.",
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

  {
    title: {
      en: "Property Binding",
      ar: "ربط الخصائص",
    },

    description: {
      en: "Learn how property binding connects component values to HTML element properties.",
      ar: "تعرف على كيفية ربط قيم المكونات بخصائص عناصر HTML.",
    },

    explanation: {
      en: "Property binding uses square brackets to dynamically set element properties.",
      ar: "يستخدم Property Binding الأقواس المربعة لتعيين خصائص العناصر بشكل ديناميكي.",
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

  {
    title: {
      en: "Event Binding",
      ar: "ربط الأحداث",
    },

    description: {
      en: "Learn how Angular responds to user actions such as clicks and input events.",
      ar: "تعرف على كيفية استجابة Angular لأفعال المستخدم مثل الضغط وإدخال البيانات.",
    },

    explanation: {
      en: "Event binding lets a component respond when an event occurs in the template.",
      ar: "يسمح Event Binding للمكون بالاستجابة عند حدوث حدث داخل الـTemplate.",
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

  {
    title: {
      en: "Two-Way Data Binding",
      ar: "ربط البيانات ثنائي الاتجاه",
    },

    description: {
      en: "Learn how Angular keeps component data and form controls synchronized.",
      ar: "تعرف على كيفية إبقاء بيانات المكون وحقول النماذج متزامنة.",
    },

    explanation: {
      en: "Two-way binding allows data to move from the component to the view and back again.",
      ar: "يسمح الربط ثنائي الاتجاه بانتقال البيانات من المكون إلى الواجهة والعكس.",
    },

    code: `<input
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

  {
    title: {
      en: "Directives",
      ar: "التوجيهات Directives",
    },

    description: {
      en: "Learn how Angular directives change the behavior, appearance, or structure of elements.",
      ar: "تعرف على كيفية تغيير Directives لسلوك أو شكل أو بنية العناصر.",
    },

    explanation: {
      en: "Directives add special behavior to elements and can control how content is rendered.",
      ar: "تضيف Directives سلوكًا خاصًا للعناصر ويمكنها التحكم في طريقة عرض المحتوى.",
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

  {
    title: {
      en: "Conditional Rendering",
      ar: "العرض الشرطي",
    },

    description: {
      en: "Learn how Angular displays content depending on conditions.",
      ar: "تعرف على كيفية عرض Angular للمحتوى بناءً على شروط معينة.",
    },

    explanation: {
      en: "Conditional rendering allows different content to appear depending on application state.",
      ar: "يسمح العرض الشرطي بإظهار محتوى مختلف حسب حالة التطبيق.",
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
      en: "Angular can repeat template content for each item in a collection.",
      ar: "يمكن لـAngular تكرار محتوى الـTemplate لكل عنصر داخل مجموعة.",
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

  {
    title: {
      en: "Component Communication",
      ar: "التواصل بين المكونات",
    },

    description: {
      en: "Learn how Angular components communicate with each other.",
      ar: "تعرف على كيفية تواصل مكونات Angular مع بعضها.",
    },

    explanation: {
      en: "Components can communicate by passing data and emitting events.",
      ar: "يمكن للمكونات التواصل عن طريق تمرير البيانات وإطلاق الأحداث.",
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

  {
    title: {
      en: "Inputs",
      ar: "Inputs",
    },

    description: {
      en: "Learn how parent components pass data into child components using inputs.",
      ar: "تعرف على كيفية تمرير البيانات من المكون الأب إلى المكون الابن باستخدام Inputs.",
    },

    explanation: {
      en: "An input allows a child component to receive data from its parent.",
      ar: "يسمح Input للمكون الابن باستقبال البيانات من المكون الأب.",
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
      ar: ["استقبال البيانات من المكون الأب", "إنشاء قاعدة بيانات", "تنسيق الصفحة"],
    },

    correct: 0,
  },

  {
    title: {
      en: "Outputs",
      ar: "Outputs",
    },

    description: {
      en: "Learn how child components send events back to their parent components.",
      ar: "تعرف على كيفية إرسال المكونات الابنة للأحداث إلى المكونات الأب.",
    },

    explanation: {
      en: "Outputs allow child components to notify parent components about events.",
      ar: "يسمح Output للمكون الابن بإبلاغ المكون الأب بحدوث أحداث.",
    },

    code: `@Output()
selected =
  new EventEmitter<string>();

selectItem() {
  this.selected.emit('Angular');
}`,

    question: {
      en: "What is an output commonly used for?",
      ar: "فيما يستخدم Output عادةً؟",
    },

    answers: {
      en: ["Sending events from child to parent", "Creating CSS", "Connecting to a database"],
      ar: ["إرسال الأحداث من الابن إلى الأب", "إنشاء CSS", "الاتصال بقاعدة بيانات"],
    },

    correct: 0,
  },

  {
    title: {
      en: "Services",
      ar: "الخدمات",
    },

    description: {
      en: "Learn how Angular services organize reusable application logic and shared functionality.",
      ar: "تعرف على كيفية تنظيم الخدمات للمنطق المشترك والقابل لإعادة الاستخدام.",
    },

    explanation: {
      en: "Services are useful for shared logic, data access, authentication, and communication with APIs.",
      ar: "الخدمات مفيدة للمنطق المشترك والوصول إلى البيانات والمصادقة والتعامل مع APIs.",
    },

    code: `@Injectable({
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

  {
    title: {
      en: "Dependency Injection",
      ar: "حقن الاعتمادات",
    },

    description: {
      en: "Understand how Angular provides required services and dependencies to classes.",
      ar: "افهم كيف يوفر Angular الخدمات والاعتمادات المطلوبة للكلاسات.",
    },

    explanation: {
      en: "Dependency Injection allows a class to receive the objects it needs instead of creating them itself.",
      ar: "يسمح Dependency Injection للكلاس باستقبال الأشياء التي يحتاجها بدلًا من إنشائها بنفسه.",
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
      ar: ["توفير الاعتمادات المطلوبة للكلاس", "كتابة CSS Animations", "إنشاء عناصر HTML"],
    },

    correct: 0,
  },

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
      en: "Routing maps URLs to components and allows users to navigate through an Angular application.",
      ar: "يقوم Routing بربط الروابط بالمكونات ويسمح للمستخدم بالتنقل داخل تطبيق Angular.",
    },

    code: `const routes: Routes = [
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

  {
    title: {
      en: "Route Parameters",
      ar: "معاملات المسارات",
    },

    description: {
      en: "Learn how to pass dynamic values through URLs using route parameters.",
      ar: "تعرف على كيفية تمرير قيم ديناميكية من خلال الروابط باستخدام Route Parameters.",
    },

    explanation: {
      en: "Route parameters allow a URL to contain dynamic information such as a user ID.",
      ar: "تسمح Route Parameters بوضع معلومات ديناميكية داخل الرابط مثل User ID.",
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
      en: "Angular provides tools for building forms, reading values, validating input, and handling submission.",
      ar: "يوفر Angular أدوات لبناء النماذج وقراءة القيم والتحقق من البيانات ومعالجة الإرسال.",
    },

    code: `<form>
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
      en: "Validation helps ensure that users provide data that follows the required rules.",
      ar: "يساعد Validation في التأكد من أن المستخدم أدخل بيانات تتوافق مع القواعد المطلوبة.",
    },

    code: `<input
  required
  minlength="3"
  name="username">

<p *ngIf="username.invalid">
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
      en: "HttpClient is used to send HTTP requests and receive data from backend APIs.",
      ar: "يستخدم HttpClient لإرسال HTTP Requests واستقبال البيانات من Backend APIs.",
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
      en: "An Observable represents a stream of values that can arrive over time.",
      ar: "يمثل Observable تدفقًا من القيم التي يمكن أن تصل مع مرور الوقت.",
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
      en: "RxJS provides operators that help transform, filter, combine, and handle asynchronous streams.",
      ar: "توفر RxJS Operators تساعد على تحويل وتصفية ودمج والتعامل مع تدفقات البيانات غير المتزامنة.",
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

  {
    title: {
      en: "Lifecycle Hooks",
      ar: "Lifecycle Hooks",
    },

    description: {
      en: "Learn how Angular components move through different lifecycle stages.",
      ar: "تعرف على مراحل دورة حياة مكونات Angular.",
    },

    explanation: {
      en: "Lifecycle hooks let developers run code at specific moments during a component's life.",
      ar: "تسمح Lifecycle Hooks بتشغيل الكود في لحظات محددة أثناء دورة حياة المكون.",
    },

    code: `ngOnInit() {
  console.log(
    'Component initialized'
  );
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

  {
    title: {
      en: "Pipes",
      ar: "Pipes",
    },

    description: {
      en: "Learn how Angular pipes transform and format data directly inside templates.",
      ar: "تعرف على كيفية استخدام Pipes لتحويل وتنسيق البيانات داخل الـTemplates.",
    },

    explanation: {
      en: "Pipes transform displayed values without changing the original data.",
      ar: "تقوم Pipes بتحويل القيم المعروضة دون تغيير البيانات الأصلية.",
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

  {
    title: {
      en: "Signals",
      ar: "Signals",
    },

    description: {
      en: "Learn how Angular Signals represent reactive state and notify the application when values change.",
      ar: "تعرف على كيفية استخدام Angular Signals لتمثيل الـState التفاعلي.",
    },

    explanation: {
      en: "Signals provide a reactive way to store values and respond when those values change.",
      ar: "توفر Signals طريقة تفاعلية لتخزين القيم والاستجابة عند تغييرها.",
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
      ar: ["إدارة الـState التفاعلي", "إنشاء قواعد البيانات", "كتابة CSS"],
    },

    correct: 0,
  },

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
      en: "Standalone components can declare their own dependencies and can be used without a traditional NgModule.",
      ar: "يمكن للمكونات المستقلة تعريف Dependencies الخاصة بها والعمل بدون NgModule تقليدي.",
    },

    code: `@Component({
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

  {
    title: {
      en: "State Management",
      ar: "إدارة الحالة State Management",
    },

    description: {
      en: "Learn how applications manage shared and changing data using reactive state techniques.",
      ar: "تعرف على كيفية إدارة البيانات المشتركة والمتغيرة داخل التطبيقات باستخدام الأساليب التفاعلية.",
    },

    explanation: {
      en: "State management helps applications keep important data organized and synchronized across components.",
      ar: "تساعد State Management التطبيقات على تنظيم البيانات المهمة ومزامنتها بين المكونات.",
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

  {
    title: {
      en: "Angular Architecture",
      ar: "معمارية Angular",
    },

    description: {
      en: "Understand how components, services, routing, templates, and APIs work together.",
      ar: "افهم كيف تعمل Components وServices وRouting وTemplates وAPIs معًا.",
    },

    explanation: {
      en: "A good Angular architecture separates responsibilities and makes large applications easier to maintain.",
      ar: "تقوم معمارية Angular الجيدة بفصل المسؤوليات وتجعل التطبيقات الكبيرة أسهل في الصيانة.",
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

  {
    title: {
      en: "Angular Best Practices",
      ar: "أفضل ممارسات Angular",
    },

    description: {
      en: "Learn practical principles for writing clean, maintainable, and scalable Angular applications.",
      ar: "تعرف على مبادئ عملية لكتابة تطبيقات Angular نظيفة وقابلة للصيانة والتوسع.",
    },

    explanation: {
      en: "Good practices include organizing files, keeping components focused, reusing services, and writing maintainable code.",
      ar: "تشمل الممارسات الجيدة تنظيم الملفات والحفاظ على المكونات مركزة وإعادة استخدام الخدمات وكتابة كود سهل الصيانة.",
    },

    code: `src/
├── app/
│   ├── components/
│   ├── services/
│   ├── pages/
│   └── models/
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
   3. ELEMENTS
   ========================================================= */

const lessonButtons = document.querySelectorAll(".lesson");

const lessonNumber = document.getElementById("lessonNumber");

const lessonTitle = document.getElementById("lessonTitle");

const lessonDescription = document.getElementById("lessonDescription");

const lessonExplanation = document.getElementById("lessonExplanation");

const learnHeading = document.getElementById("learnHeading");

const exampleCode = document.getElementById("exampleCode");

const progressText = document.getElementById("progressText");

const progressFill = document.getElementById("progressFill");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const copyButton = document.getElementById("copyButton");

const codeEditor = document.getElementById("codeEditor");

const runButton = document.getElementById("runButton");

const resetButton = document.getElementById("resetButton");

const angularResult = document.getElementById("angularResult");

const output = document.getElementById("output");

const answerButtons = document.querySelectorAll(".answer-options button");

const answerFeedback = document.getElementById("answerFeedback");

const languageButton = document.getElementById("languageButton");

/* =========================================================
   4. CURRENT LESSON
   ========================================================= */

let currentLesson = 0;

/* =========================================================
   5. STATIC TRANSLATIONS
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
    en: "30 Lessons",
    ar: "30 درس",
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
    en: "Modify the example below and run your code to see the result.",
    ar: "عدّل المثال بالأسفل وشغّل الكود لرؤية النتيجة.",
  },

  outputLabel: {
    en: "OUTPUT",
    ar: "المخرجات",
  },

  quickCheckLabel: {
    en: "QUICK CHECK",
    ar: "اختبار سريع",
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
};

/* =========================================================
   6. UPDATE STATIC LANGUAGE
   ========================================================= */

function updateStaticLanguage() {
  Object.entries(staticText).forEach(([id, value]) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = t(value);
  });

  languageButton.textContent = currentLanguage === "en" ? "EN" : "AR";

  languageButton.setAttribute("aria-label", currentLanguage === "en" ? "Change language" : "تغيير اللغة");

  runButton.textContent = t(staticText.run);

  resetButton.textContent = t(staticText.reset);

  copyButton.textContent = t(staticText.copy);

  document.title = currentLanguage === "en" ? "Fayad — Angular Learning" : "فياض — تعلم Angular";
}

/* =========================================================
   7. UPDATE SIDEBAR
   ========================================================= */

function updateSidebar() {
  lessonButtons.forEach((button, index) => {
    const lesson = lessons[index];

    if (!lesson) return;

    button.classList.toggle("active", index === currentLesson);

    const status = button.querySelector(".lesson-status");

    if (status) {
      status.classList.toggle("current", index === currentLesson);

      status.textContent = String(index + 1).padStart(2, "0");
    }

    const name = button.querySelector(".lesson-name");

    if (name) {
      name.textContent = t(lesson.title);
    }
  });
}

/* =========================================================
   8. UPDATE NAVIGATION
   ========================================================= */

function updateNavigation() {
  previousButton.disabled = currentLesson === 0;

  nextButton.disabled = currentLesson === lessons.length - 1;

  const nextLesson = lessons[currentLesson + 1];

  const nextStrong = document.getElementById("nextLessonText");

  if (nextLesson) {
    nextStrong.textContent = t(nextLesson.title);
  } else {
    nextStrong.textContent = t(staticText.courseComplete);
  }
}

/* =========================================================
   9. RESET QUICK CHECK
   ========================================================= */

function resetQuickCheck() {
  answerFeedback.textContent = "";

  answerFeedback.style.color = "";

  answerButtons.forEach((button) => {
    button.disabled = false;

    button.classList.remove("correct-answer", "wrong-answer");

    button.style.background = "";

    button.style.borderColor = "";
  });
}

/* =========================================================
   10. UPDATE QUICK CHECK
   ========================================================= */

function updateQuickCheck(lesson) {
  document.getElementById("questionText").textContent = t(lesson.question);

  const answers = lesson.answers[currentLanguage];

  answerButtons.forEach((button, index) => {
    button.textContent = answers[index] || "";
  });
}

/* =========================================================
   11. LOAD LESSON
   ========================================================= */

function loadLesson(index, saveProgress = true) {
  if (index < 0) {
    index = 0;
  }

  if (index >= lessons.length) {
    index = lessons.length - 1;
  }

  currentLesson = index;

  const lesson = lessons[currentLesson];

  /* -----------------------------------------
     LESSON HEADER
     ----------------------------------------- */

  lessonNumber.textContent =
    currentLanguage === "en"
      ? `LESSON ${String(currentLesson + 1).padStart(2, "0")}`
      : `الدرس ${String(currentLesson + 1).padStart(2, "0")}`;

  lessonTitle.textContent = t(lesson.title);

  lessonDescription.textContent = t(lesson.description);

  /* -----------------------------------------
     WHAT YOU LEARN
     ----------------------------------------- */

  learnHeading.textContent = t(lesson.title);

  lessonExplanation.textContent = t(lesson.explanation);

  /* -----------------------------------------
     EXAMPLE
     ----------------------------------------- */

  exampleCode.textContent = lesson.code;

  /* -----------------------------------------
     PRACTICE
     ----------------------------------------- */

  codeEditor.value = lesson.code;

  /* -----------------------------------------
     PROGRESS
     ----------------------------------------- */

  const progress = Math.round(((currentLesson + 1) / lessons.length) * 100);

  progressText.textContent = `${progress}%`;

  progressFill.style.width = `${progress}%`;

  document.getElementById("currentLessonNumber").textContent = String(currentLesson + 1).padStart(2, "0");

  document.getElementById("totalLessons").textContent = lessons.length;

  /* -----------------------------------------
     SIDEBAR
     ----------------------------------------- */

  updateSidebar();

  /* -----------------------------------------
     NAVIGATION
     ----------------------------------------- */

  updateNavigation();

  const previousStrong = document.getElementById("previousLessonText");

  if (currentLesson > 0) {
    previousStrong.textContent = t(lessons[currentLesson - 1].title);
  } else {
    previousStrong.textContent = t(staticText.previousLessonText);
  }

  /* -----------------------------------------
     QUICK CHECK
     ----------------------------------------- */

  resetQuickCheck();

  updateQuickCheck(lesson);

  /* -----------------------------------------
     SAVE PROGRESS
     ----------------------------------------- */

  if (saveProgress) {
    localStorage.setItem("fayad-angular-current-lesson", currentLesson);
  }

  /* -----------------------------------------
     PRACTICE PREVIEW
     ----------------------------------------- */

  runAngularCode();
}

/* =========================================================
   12. SIDEBAR CLICK
   ========================================================= */

lessonButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    loadLesson(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   13. PREVIOUS BUTTON
   ========================================================= */

previousButton.addEventListener("click", () => {
  if (currentLesson > 0) {
    loadLesson(currentLesson - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

/* =========================================================
   14. NEXT BUTTON
   ========================================================= */

nextButton.addEventListener("click", () => {
  if (currentLesson < lessons.length - 1) {
    loadLesson(currentLesson + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

/* =========================================================
   15. PRACTICE RUNNER
   ========================================================= */

function runAngularCode() {
  const code = codeEditor.value.trim();

  if (!code) {
    angularResult.textContent = t(staticText.writeCode);

    output.textContent = t(staticText.nothingPreview);

    return;
  }

  let previewText = t(staticText.angularPreview);

  /* -----------------------------------------
     INTERPOLATION
     ----------------------------------------- */

  const interpolation = code.match(/\{\{\s*([^}]+)\s*\}\}/);

  if (interpolation) {
    previewText = interpolation[1].trim();
  }

  /* -----------------------------------------
     COMMON ANGULAR TEXT
     ----------------------------------------- */

  if (code.includes("Hello Angular")) {
    previewText = "Hello Angular";
  }

  if (code.includes("Product Card")) {
    previewText = "Product Card";
  }

  if (code.includes("Welcome to Angular")) {
    previewText = "Welcome to Angular";
  }

  if (code.includes("Welcome back!")) {
    previewText = "Welcome back!";
  }

  if (code.includes("Please log in.")) {
    previewText = "Please log in.";
  }

  if (code.includes("Dashboard")) {
    previewText = "Dashboard";
  }

  if (code.includes("Home")) {
    previewText = "Home";
  }

  /* -----------------------------------------
     DIRECTIVE DETECTION
     ----------------------------------------- */

  const features = [];

  if (code.includes("*ngIf")) {
    features.push(t(staticText.conditionalRendering));
  }

  if (code.includes("*ngFor")) {
    features.push(t(staticText.listRendering));
  }

  if (code.includes("[(ngModel)]")) {
    features.push(t(staticText.twoWayBinding));
  }

  if (code.includes("[src]")) {
    features.push(t(staticText.propertyBinding));
  }

  if (code.includes("(click)")) {
    features.push(t(staticText.eventBinding));
  }

  if (code.includes("| uppercase")) {
    features.push(t(staticText.uppercasePipe));
  }

  if (code.includes("| currency")) {
    features.push(t(staticText.currencyPipe));
  }

  /* -----------------------------------------
     RESULT
     ----------------------------------------- */

  angularResult.textContent = previewText;

  if (features.length > 0) {
    output.textContent = `${t(staticText.detected)} ${features.join(", ")}`;
  } else {
    output.textContent = t(staticText.codeLoaded);
  }
}

/* =========================================================
   16. RUN BUTTON
   ========================================================= */

runButton.addEventListener("click", () => {
  runAngularCode();
});

/* =========================================================
   17. LIVE EDITOR
   ========================================================= */

codeEditor.addEventListener("input", () => {
  runAngularCode();
});

/* =========================================================
   18. RESET EDITOR
   ========================================================= */

resetButton.addEventListener("click", () => {
  codeEditor.value = lessons[currentLesson].code;

  runAngularCode();
});

/* =========================================================
   19. COPY CODE
   ========================================================= */

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(exampleCode.textContent);

    copyButton.textContent = t(staticText.copied);

    setTimeout(() => {
      copyButton.textContent = t(staticText.copy);
    }, 1500);
  } catch (error) {
    copyButton.textContent = t(staticText.failed);

    setTimeout(() => {
      copyButton.textContent = t(staticText.copy);
    }, 1500);
  }
});

/* =========================================================
   20. LANGUAGE BUTTON
   ========================================================= */

languageButton.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "ar" : "en");
});

/* =========================================================
   21. QUICK CHECK
   ========================================================= */

answerButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const correct = lessons[currentLesson].correct;

    if (index === correct) {
      answerFeedback.textContent = t(staticText.correct);

      answerFeedback.style.color = "#159570";

      button.classList.add("correct-answer");

      button.disabled = true;
    } else {
      answerFeedback.textContent = t(staticText.wrong);

      answerFeedback.style.color = "#c55353";

      button.classList.add("wrong-answer");
    }
  });
});

/* =========================================================
   22. KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "TEXTAREA") {
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
   23. RESTORE LAST LESSON
   ========================================================= */

const savedLesson = localStorage.getItem("fayad-angular-current-lesson");

/* =========================================================
   24. INITIALIZE
   ========================================================= */

document.documentElement.lang = currentLanguage;

document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

updateStaticLanguage();

if (savedLesson !== null && !Number.isNaN(Number(savedLesson))) {
  loadLesson(Number(savedLesson), false);
} else {
  loadLesson(0, false);
}
