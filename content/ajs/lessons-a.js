// Advanced JavaScript, lessons 1-11. Compact authoring format; expanded to the shared lesson schema by index.js.
// Every `code` is executed by tests/ajs-content.test.mjs and its console output must equal `out`.
export const A = [
  {
    t: "النطاق والرفع و TDZ", d: "افهم كيف يبحث المحرك عن المتغيرات، وما الذي يحدث فعلًا عند الرفع (Hoisting)، ولماذا يوجد Temporal Dead Zone.",
    s: [["Scope Chain", "<p>كل دالة وكل كتلة <code>{ }</code> (مع <code>let</code> و <code>const</code>) تنشئ نطاقًا. عند قراءة متغير يبحث المحرك في النطاق الحالي ثم في النطاق الأب وهكذا حتى النطاق العام، وتسمى هذه السلسلة <strong>Scope Chain</strong>.</p>"],
        ["الرفع و TDZ", "<p>تُرفع التصريحات إلى أعلى نطاقها لكن بحالات مختلفة: <code>var</code> تبدأ بقيمة <code>undefined</code>، أما <code>let</code> و <code>const</code> فتبقى غير مهيأة حتى سطر التصريح، وأي وصول قبله يرمي <code>ReferenceError</code>. هذه الفترة تسمى <strong>Temporal Dead Zone</strong>.</p>"]],
    key: "var ترتفع بقيمة undefined، و let/const ترتفع لكنها غير قابلة للاستخدام قبل سطر التصريح.",
    code: `console.log(typeof hoisted);
var hoisted = 1;
console.log(hoisted);

try {
  console.log(late);
} catch (e) {
  console.log(e.name);
}
let late = 2;

const x = "global";
function outer() {
  const x = "outer";
  function inner() {
    return x;
  }
  return inner();
}
console.log(outer());`,
    out: "undefined\n1\nReferenceError\nouter",
    exp: "<p>المتغير <code>hoisted</code> موجود قبل سطره بقيمة <code>undefined</code>. أما <code>late</code> فقراءته قبل التصريح ترمي <code>ReferenceError</code>. و<code>inner</code> ترى <code>x</code> الخاص بـ <code>outer</code> لأنه أقرب نطاق في السلسلة.</p>",
    prompt: "أنشئ دالة تحاول قراءة متغير <code>const</code> قبل تصريحه داخل كتلة، والتقط الخطأ واطبع اسمه.",
    starter: "function test() {\n  try {\n    console.log(value); // قبل تصريح value\n  } catch (e) {\n    console.log(e.name);\n  }\n  const value = 1;\n}\ntest();",
    q: [["ما قيمة var المرفوعة قبل سطر التصريح؟", ["undefined", "null", "ReferenceError", "0"], 0],
        ["ماذا يحدث عند قراءة let قبل تصريحها؟", ["يُرمى ReferenceError", "تكون undefined", "تكون null", "تُنشأ تلقائيًا"], 0],
        ["ما المقصود بـ Scope Chain؟", ["سلسلة النطاقات التي يبحث فيها المحرك عن المتغير من الأقرب للأبعد", "ترتيب تنفيذ الدوال", "قائمة الأخطاء", "ترتيب الملفات"], 0]],
  },
  {
    t: "Closures", d: "الدالة التي تتذكر النطاق الذي وُلدت فيه: أساس الخصوصية والحالة المخبأة في JavaScript.",
    s: [["ما هو Closure؟", "<p>الـ <strong>Closure</strong> هو دالة مع إشارة إلى بيئتها المعجمية (المتغيرات المحيطة بها وقت تعريفها). تبقى هذه المتغيرات حيّة ما دامت الدالة قابلة للاستدعاء حتى بعد انتهاء الدالة الخارجية.</p>"],
        ["استخدامات عملية", "<ul><li>عدادات وحالة خاصة لا يمكن الوصول إليها من الخارج.</li><li>مصانع الدوال (Function Factories).</li><li>معالجات الأحداث التي تحتاج بيانات من وقت الإنشاء.</li></ul>"]],
    key: "كل استدعاء للدالة الخارجية ينشئ بيئة جديدة مستقلة، والدوال الداخلية تحتفظ بها.",
    code: `function makeCounter(start = 0) {
  let count = start;
  return {
    inc: () => ++count,
    value: () => count,
  };
}

const a = makeCounter();
const b = makeCounter(10);
a.inc();
a.inc();
b.inc();
console.log(a.value(), b.value());

const fns = [];
for (var i = 0; i < 3; i++) fns.push(() => i);
console.log(fns.map((f) => f()));

const fns2 = [];
for (let j = 0; j < 3; j++) fns2.push(() => j);
console.log(fns2.map((f) => f()));`,
    out: "2 11\n[ 3, 3, 3 ]\n[ 0, 1, 2 ]",
    exp: "<p>كل عداد له <code>count</code> خاص به. مع <code>var</code> توجد نسخة واحدة من <code>i</code> يشاركها الجميع فتصبح 3. مع <code>let</code> تُنشأ نسخة جديدة لكل دورة.</p>",
    prompt: "اكتب دالة <code>makeAdder(n)</code> ترجع دالة تضيف <code>n</code> إلى أي رقم، ثم اطبع <code>makeAdder(5)(3)</code>.",
    starter: "function makeAdder(n) {\n  return (x) => x + n; // عدّل هنا وجرّب\n}\nconsole.log(makeAdder(5)(3));",
    q: [["لماذا تعطي حلقة var مع دوال مؤجلة نفس القيمة؟", ["لأن هناك متغيرًا واحدًا مشتركًا في نطاق الدالة", "لأن var أبطأ", "لأن الدوال لا تتذكر شيئًا", "بسبب خطأ في المحرك"], 0],
        ["ماذا يضمن الـ Closure؟", ["بقاء المتغيرات المحيطة متاحة للدالة", "تنفيذ الدالة مرتين", "منع الأخطاء", "تسريع الكود"], 0],
        ["كيف نخفي حالة داخلية عن الخارج؟", ["بتعريفها داخل دالة وإرجاع دوال تستخدمها فقط", "بتسميتها بحرف كبير", "باستخدام console.log", "لا يمكن"], 0]],
  },
  {
    t: "this و call / apply / bind", d: "قواعد تحديد قيمة this في كل حالة، وكيف تتحكم فيها يدويًا.",
    s: [["القواعد", "<p>قيمة <code>this</code> تُحدد وقت <strong>الاستدعاء</strong> لا وقت التعريف (باستثناء الدوال السهمية):</p><ol><li><code>obj.method()</code>: this هو <code>obj</code>.</li><li>استدعاء عادي <code>fn()</code>: <code>undefined</code> في الوضع الصارم.</li><li><code>new F()</code>: الكائن الجديد.</li><li><code>call / apply / bind</code>: القيمة التي تحددها أنت.</li><li>الدالة السهمية: ترث this من النطاق المحيط.</li></ol>"]],
    key: "الدالة السهمية لا تملك this خاصًا بها، وbind ترجع دالة جديدة مثبتة.",
    code: `"use strict";
const user = {
  name: "Sara",
  hello() { return "Hi " + this.name; },
  later() { return [1].map(() => this.name); },
};
console.log(user.hello());
console.log(user.later());

const detached = user.hello;
try {
  detached();
} catch (e) {
  console.log(e.name);
}

function greet(greeting) { return greeting + ", " + this.name; }
console.log(greet.call({ name: "Omar" }, "Hello"));
console.log(greet.apply({ name: "Lina" }, ["Hey"]));
const bound = greet.bind({ name: "Zain" });
console.log(bound("Yo"));`,
    out: "Hi Sara\n[ 'Sara' ]\nTypeError\nHello, Omar\nHey, Lina\nYo, Zain",
    exp: "<p>فصل الدالة عن كائنها (<code>detached</code>) يجعل <code>this</code> قيمته <code>undefined</code> فيرمي الخطأ. <code>call</code> تمرر الوسائط واحدًا واحدًا، و<code>apply</code> كمصفوفة، و<code>bind</code> تنشئ دالة جديدة.</p>",
    prompt: "استعر الدالة <code>Math.max</code> باستخدام <code>apply</code> لإيجاد أكبر رقم في المصفوفة <code>[3, 9, 4]</code>.",
    starter: "const nums = [3, 9, 4];\nconsole.log(Math.max.apply(null, nums));",
    q: [["متى تُحدد قيمة this في الدوال العادية؟", ["وقت الاستدعاء", "وقت التعريف", "وقت تحميل الصفحة", "وقت الحفظ"], 0],
        ["ما الفرق بين call و apply؟", ["call تأخذ الوسائط منفصلة و apply تأخذها في مصفوفة", "لا فرق", "apply أسرع دائمًا", "call للكائنات فقط"], 0],
        ["ماذا ترجع bind؟", ["دالة جديدة مثبتة عليها this", "نتيجة الدالة", "undefined", "كائنًا فارغًا"], 0]],
  },
  {
    t: "الدوال عالية المرتبة والتركيب", d: "اكتب دوالًا تأخذ دوالًا وتُرجعها: Currying وCompose وPipe.",
    s: [["Higher-Order Functions", "<p>الدالة عالية المرتبة تأخذ دالة كوسيط أو تُرجع دالة. <code>map</code> و<code>filter</code> و<code>reduce</code> أمثلة معروفة، ويمكنك بناء أدواتك.</p>"],
        ["Currying والتركيب", "<p><strong>Currying</strong> تحويل دالة متعددة الوسائط إلى سلسلة دوال بوسيط واحد. <strong>Pipe</strong> تمرر النتيجة من دالة لأخرى من اليسار لليمين.</p>"]],
    key: "ابنِ الدوال الصغيرة النقية ثم ركّبها بدل كتابة دالة ضخمة واحدة.",
    code: `const curry = (fn) => function curried(...args) {
  return args.length >= fn.length
    ? fn(...args)
    : (...more) => curried(...args, ...more);
};
const add3 = curry((a, b, c) => a + b + c);
console.log(add3(1)(2)(3), add3(1, 2)(3));

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const slugify = pipe(
  (s) => s.trim(),
  (s) => s.toLowerCase(),
  (s) => s.replace(/\\s+/g, "-"),
);
console.log(slugify("  Advanced JS Course "));`,
    out: "6 6\nadvanced-js-course",
    exp: "<p><code>fn.length</code> هو عدد الوسائط المعلنة، فنستمر في جمع الوسائط حتى تكتمل. <code>pipe</code> تستخدم <code>reduce</code> لتمرير القيمة عبر سلسلة التحويلات.</p>",
    prompt: "عرّف <code>compose</code> (تنفذ من اليمين لليسار) وجرّبها على <code>double</code> و<code>inc</code>.",
    starter: "const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);\nconst double = (n) => n * 2;\nconst inc = (n) => n + 1;\nconsole.log(compose(double, inc)(5));",
    q: [["ما الدالة عالية المرتبة؟", ["دالة تأخذ دالة أو تُرجع دالة", "دالة بأكثر من 5 وسائط", "دالة داخل كائن", "دالة async"], 0],
        ["ما هو Currying؟", ["تحويل دالة متعددة الوسائط إلى دوال بوسيط واحد متتالية", "نسخ الدوال", "حذف الدوال", "تسريع الحلقات"], 0],
        ["بماذا تختلف pipe عن compose؟", ["pipe من اليسار لليمين و compose من اليمين لليسار", "لا فرق إطلاقًا", "pipe للأرقام فقط", "compose غير موجودة"], 0]],
  },
  {
    t: "Memoization و Debounce و Throttle", d: "تقنيات عملية للأداء: التخزين المؤقت للنتائج وضبط عدد الاستدعاءات.",
    s: [["Memoization", "<p>تخزين نتيجة دالة <strong>نقية</strong> لكل مدخل حتى لا تُحسب مرتين. المفتاح عادةً من المدخلات.</p>"],
        ["Debounce و Throttle", "<p><strong>Debounce</strong> ينفذ الدالة بعد توقف الاستدعاءات لمدة محددة (مثل البحث أثناء الكتابة). <strong>Throttle</strong> ينفذها بحد أقصى مرة كل فترة (مثل التمرير).</p>"]],
    key: "Memoization للدوال النقية فقط، وDebounce يؤخر بينما Throttle يحدّ.",
    code: `const memo = (fn) => {
  const cache = new Map();
  return (n) => {
    if (cache.has(n)) return cache.get(n);
    const v = fn(n);
    cache.set(n, v);
    return v;
  };
};
let calls = 0;
const square = memo((n) => { calls++; return n * n; });
square(4); square(4); square(5);
console.log("calls:", calls);

const debounce = (fn, ms) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
};
const log = debounce((v) => console.log("saved", v), 20);
log("a"); log("b"); log("c");`,
    out: "calls: 2\nsaved c",
    exp: "<p>الاستدعاء الثاني لـ <code>square(4)</code> جاء من الـ cache فلم يزد العداد. في <code>debounce</code> كل استدعاء يلغي المؤقت السابق فلا ينفذ إلا الأخير.</p>",
    prompt: "اكتب <code>once(fn)</code> تنفذ الدالة مرة واحدة فقط وتعيد نفس النتيجة بعدها.",
    starter: "const once = (fn) => {\n  let done = false, value;\n  return (...a) => {\n    if (!done) { done = true; value = fn(...a); }\n    return value;\n  };\n};\nconst init = once(() => { console.log('init'); return 42; });\nconsole.log(init(), init());",
    q: [["متى تكون Memoization آمنة؟", ["مع الدوال النقية التي لا تعتمد على حالة خارجية", "مع أي دالة", "مع الدوال غير المتزامنة فقط", "لا تكون آمنة أبدًا"], 0],
        ["ماذا يفعل Debounce؟", ["يؤخر التنفيذ حتى تتوقف الاستدعاءات", "ينفذ كل استدعاء فورًا", "يمنع الدالة نهائيًا", "يكرر الدالة"], 0],
        ["أي تقنية تناسب حدث scroll المتكرر؟", ["Throttle", "Memoization", "Currying", "Hoisting"], 0]],
  },
  {
    t: "Prototypes وسلسلة الوراثة", d: "كيف تعمل الوراثة فعلًا في JavaScript من خلال الكائنات النموذجية.",
    s: [["Prototype Chain", "<p>لكل كائن رابط داخلي إلى كائن آخر هو <code>prototype</code>. عند قراءة خاصية غير موجودة يبحث المحرك في السلسلة حتى <code>Object.prototype</code> ثم <code>null</code>.</p>"],
        ["أدوات", "<ul><li><code>Object.create(proto)</code> ينشئ كائنًا برابط مباشر.</li><li><code>Object.getPrototypeOf(obj)</code> لقراءة الرابط.</li><li><code>hasOwn</code> للتمييز بين الخاصية الخاصة والموروثة.</li></ul>"]],
    key: "الوراثة في JavaScript تفويض عبر السلسلة، لا نسخ للخصائص.",
    code: `const animal = {
  speak() { return this.name + " makes a sound"; },
};
const dog = Object.create(animal);
dog.name = "Rex";
console.log(dog.speak());
console.log(Object.hasOwn(dog, "speak"), "speak" in dog);
console.log(Object.getPrototypeOf(dog) === animal);

function Person(name) { this.name = name; }
Person.prototype.hi = function () { return "hi " + this.name; };
const p = new Person("Mona");
console.log(p.hi(), p instanceof Person);`,
    out: "Rex makes a sound\nfalse true\ntrue\nhi Mona true",
    exp: "<p><code>speak</code> غير موجودة على <code>dog</code> نفسه لذا <code>hasOwn</code> ترجع false لكن عامل <code>in</code> يبحث في السلسلة فيرجع true. الدوال المنشئة تضع الأساليب على <code>prototype</code> لمشاركتها بين كل الكائنات.</p>",
    prompt: "أنشئ كائنًا <code>child</code> يرث من <code>parent</code> الذي فيه الدالة <code>hello</code> ثم استدعها.",
    starter: "const parent = { hello() { return 'hello from parent'; } };\nconst child = Object.create(parent);\nconsole.log(child.hello());",
    q: [["كيف يبحث المحرك عن خاصية غير موجودة على الكائن؟", ["يتتبع سلسلة prototype حتى null", "يرمي خطأ فورًا", "يبحث في النطاق العام فقط", "ينشئها تلقائيًا"], 0],
        ["ماذا تفعل Object.hasOwn؟", ["تتحقق أن الخاصية موجودة على الكائن نفسه لا الموروثة", "تحذف الخاصية", "تنسخ الكائن", "تبحث في السلسلة كلها"], 0],
        ["أين تُوضع الأساليب المشتركة في الدوال المنشئة؟", ["على Constructor.prototype", "داخل كل كائن", "في النطاق العام", "في localStorage"], 0]],
  },
  {
    t: "Classes: الخصوصية والـ static", d: "بناء كلاسات حديثة بخصائص خاصة وأساليب ثابتة وGetters وSetters.",
    s: [["السكر النحوي فوق Prototypes", "<p>الـ <code>class</code> طريقة أوضح لكتابة نفس نظام الـ prototypes. الأساليب تذهب إلى <code>prototype</code> تلقائيًا.</p>"],
        ["Private و Static", "<p>الحقول التي تبدأ بـ <code>#</code> خاصة فعليًا ولا يمكن الوصول إليها من خارج الكلاس. أعضاء <code>static</code> تنتمي للكلاس نفسه لا للنسخ.</p>"]],
    key: "استخدم #private لحماية الحالة، وgetter/setter للتحقق من القيم.",
    code: `class Account {
  #balance = 0;
  static count = 0;
  constructor(owner) {
    this.owner = owner;
    Account.count++;
  }
  get balance() { return this.#balance; }
  deposit(n) {
    if (n <= 0) throw new RangeError("amount must be positive");
    this.#balance += n;
    return this;
  }
  static compare(a, b) { return a.balance - b.balance; }
}
const a = new Account("Ali").deposit(50).deposit(25);
const b = new Account("Noor").deposit(10);
console.log(a.balance, Account.count);
console.log([a, b].sort(Account.compare).map((x) => x.owner));
console.log(a.balance = 5, a.balance);
try { a.deposit(-1); } catch (e) { console.log(e.name + ": " + e.message); }`,
    out: "75 2\n[ 'Noor', 'Ali' ]\n5 75\nRangeError: amount must be positive",
    exp: "<p>لا يوجد setter للـ <code>balance</code> لذا الإسناد لا يغير شيئًا (يتجاهل بصمت خارج الوضع الصارم). الحقل <code>#balance</code> لا يمكن الوصول إليه إلا من داخل الكلاس.</p>",
    prompt: "أضف إلى الكلاس <code>Temperature</code> getter باسم <code>fahrenheit</code> يحسب القيمة من <code>celsius</code>.",
    starter: "class Temperature {\n  constructor(c) { this.celsius = c; }\n  get fahrenheit() { return this.celsius * 9 / 5 + 32; }\n}\nconsole.log(new Temperature(100).fahrenheit);",
    q: [["ماذا يعني الحقل الذي يبدأ بـ #؟", ["خاص ولا يُقرأ من خارج الكلاس", "ثابت فقط", "مؤقت", "عام"], 0],
        ["على ماذا تنتمي أعضاء static؟", ["على الكلاس نفسه لا على النسخ", "على كل نسخة", "على prototype فقط", "على window"], 0],
        ["ما فائدة getter؟", ["قراءة قيمة محسوبة كأنها خاصية", "حذف الخاصية", "تجميد الكائن", "تكرار الكائن"], 0]],
  },
  {
    t: "الوراثة بين الكلاسات و Mixins", d: "extends وsuper وتعدد السلوكيات عبر Mixins وتفضيل التركيب على الوراثة.",
    s: [["extends و super", "<p><code>extends</code> تربط prototype الكلاس الابن بالأب. <code>super()</code> في الـ constructor إلزامية قبل استخدام <code>this</code>، و<code>super.method()</code> تستدعي نسخة الأب.</p>"],
        ["التركيب أولًا", "<p>سلاسل الوراثة العميقة تصبح هشة. عندما تحتاج سلوكًا مشتركًا من أكثر من مصدر استخدم <strong>Mixins</strong> أو مرّر الاعتماديات (Composition).</p>"]],
    key: "فضّل التركيب (has-a) على الوراثة (is-a) إلا عند علاقة حقيقية.",
    code: `class Shape {
  constructor(name) { this.name = name; }
  area() { return 0; }
  describe() { return this.name + " area=" + this.area().toFixed(1); }
}
class Circle extends Shape {
  constructor(r) { super("circle"); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
  describe() { return super.describe() + "!"; }
}
console.log(new Circle(2).describe());

const Serializable = (Base) => class extends Base {
  toJSON() { return { type: this.name }; }
};
class Tagged extends Serializable(Shape) {}
console.log(JSON.stringify(new Tagged("tag")));
console.log(new Circle(1) instanceof Shape);`,
    out: "circle area=12.6!\n{\"type\":\"tag\"}\ntrue",
    exp: "<p><code>Serializable</code> دالة تأخذ كلاسًا وتُرجع كلاسًا جديدًا يرثه، وهكذا نضيف سلوكًا دون تعقيد التسلسل الهرمي.</p>",
    prompt: "أنشئ <code>Square extends Shape</code> تعيد مساحة <code>side ** 2</code> واطبع الوصف.",
    starter: "class Shape {\n  constructor(name) { this.name = name; }\n  area() { return 0; }\n}\nclass Square extends Shape {\n  constructor(s) { super('square'); this.s = s; }\n  area() { return this.s ** 2; }\n}\nconsole.log(new Square(3).area());",
    q: [["لماذا يجب استدعاء super() قبل this في constructor الابن؟", ["لأن الكائن لا يُنشأ إلا بعد تنفيذ constructor الأب", "للسرعة", "اختياري", "لأنها تحذف الأب"], 0],
        ["ما فائدة الـ Mixin؟", ["إضافة سلوك مشترك دون سلسلة وراثة عميقة", "حذف الكلاسات", "تسريع الشبكة", "تشفير البيانات"], 0],
        ["ماذا تعني قاعدة «التركيب قبل الوراثة»؟", ["بناء الكائنات من أجزاء مستقلة بدل التوسع في الهرم", "عدم استخدام الكلاسات", "استخدام var", "عدم كتابة اختبارات"], 0]],
  },
  {
    t: "Property Descriptors والتجميد", d: "تحكم في قابلية الخاصية للتعديل والعد، وافهم الفرق بين freeze وseal وبين النسخ السطحي والعميق.",
    s: [["Descriptors", "<p>كل خاصية لها صفات: <code>writable</code> و<code>enumerable</code> و<code>configurable</code> (أو get/set). تتحكم بها عبر <code>Object.defineProperty</code>.</p>"],
        ["freeze و structuredClone", "<p><code>Object.freeze</code> سطحي: يمنع تعديل الخصائص المباشرة فقط. للنسخ العميق استخدم <code>structuredClone</code> (لا يدعم الدوال).</p>"]],
    key: "freeze سطحي. الكائنات المتداخلة تبقى قابلة للتعديل ما لم تجمدها أيضًا.",
    code: `"use strict";
const cfg = {};
Object.defineProperty(cfg, "id", { value: 7, enumerable: false });
console.log(cfg.id, Object.keys(cfg));
try { cfg.id = 8; } catch (e) { console.log(e.name); }

const state = Object.freeze({ user: { name: "A" }, n: 1 });
try { state.n = 2; } catch (e) { console.log("frozen"); }
state.user.name = "B";
console.log(state.user.name);

const deep = structuredClone({ d: new Date(0), list: [1, { x: 2 }] });
console.log(deep.list[1].x, deep.d.getTime());`,
    out: "7 []\nTypeError\nfrozen\nB\n2 0",
    exp: "<p>الخاصية المعرفة بـ <code>defineProperty</code> بدون writable للقراءة فقط وغير مرئية في <code>keys</code>. التجميد لم يمنع تغيير <code>state.user.name</code> لأنه كائن متداخل.</p>",
    prompt: "اجعل الكائن <code>{a: {b: 1}}</code> مجمدًا تجميدًا عميقًا بدالة <code>deepFreeze</code> تمر على القيم.",
    starter: "function deepFreeze(o) {\n  Object.values(o).forEach((v) => { if (typeof v === 'object' && v) deepFreeze(v); });\n  return Object.freeze(o);\n}\nconst o = deepFreeze({ a: { b: 1 } });\nconsole.log(Object.isFrozen(o.a));",
    q: [["ماذا تمنع Object.freeze؟", ["تعديل وإضافة وحذف الخصائص المباشرة", "قراءة الخصائص", "استخدام الكائن في الحلقات", "التحويل إلى JSON"], 0],
        ["ما حد freeze؟", ["سطحي ولا يجمد الكائنات المتداخلة", "يجمد كل شيء عميقًا", "يعمل على الأرقام فقط", "لا يمنع شيئًا"], 0],
        ["ما الذي لا يدعمه structuredClone؟", ["الدوال", "المصفوفات", "التواريخ", "الكائنات المتداخلة"], 0]],
  },
  {
    t: "Proxy و Reflect", d: "اعترض العمليات على الكائنات لبناء التحقق والتسجيل والقيم الافتراضية.",
    s: [["Proxy", "<p><code>new Proxy(target, handler)</code> يغلف كائنًا ويعترض عمليات مثل <code>get</code> و<code>set</code> و<code>has</code> و<code>deleteProperty</code> عبر دوال تسمى <strong>traps</strong>.</p>"],
        ["Reflect", "<p><code>Reflect</code> يوفر نفس العمليات الافتراضية كدوال، فتستدعيها داخل الـ trap للحفاظ على السلوك الأصلي.</p>"]],
    key: "ارجع دائمًا بـ Reflect.set/get داخل الـ traps للحفاظ على السلوك الصحيح.",
    code: `const validator = {
  set(target, key, value, receiver) {
    if (key === "age" && !Number.isInteger(value)) {
      throw new TypeError("age must be an integer");
    }
    return Reflect.set(target, key, value, receiver);
  },
  get(target, key, receiver) {
    return key in target ? Reflect.get(target, key, receiver) : "n/a";
  },
};
const person = new Proxy({}, validator);
person.age = 30;
console.log(person.age, person.name);
try { person.age = "x"; } catch (e) { console.log(e.message); }

const logs = [];
const tracked = new Proxy({ n: 1 }, {
  set(t, k, v) { logs.push(k + "=" + v); t[k] = v; return true; },
});
tracked.n = 2; tracked.m = 3;
console.log(logs);`,
    out: "30 n/a\nage must be an integer\n[ 'n=2', 'm=3' ]",
    exp: "<p>الـ Proxy الأول يتحقق من القيم قبل الكتابة ويعيد قيمة افتراضية للمفاتيح غير الموجودة. الثاني يسجل كل تعديل دون تغيير الكائن الأصلي.</p>",
    prompt: "أنشئ Proxy يرمي خطأ عند محاولة حذف أي خاصية (trap اسمه <code>deleteProperty</code>).",
    starter: "const safe = new Proxy({ a: 1 }, {\n  deleteProperty() { throw new Error('delete not allowed'); },\n});\ntry { delete safe.a; } catch (e) { console.log(e.message); }",
    q: [["ما الـ trap؟", ["دالة في handler تعترض عملية على الكائن", "نوع من الأخطاء", "حلقة", "مكتبة خارجية"], 0],
        ["لماذا نستخدم Reflect داخل الـ traps؟", ["لتنفيذ السلوك الافتراضي بشكل صحيح", "لإبطاء الكود", "لتعطيل Proxy", "لإنشاء كلاسات"], 0],
        ["أي مما يلي استخدام مناسب للـ Proxy؟", ["التحقق من القيم وتسجيل التغييرات", "تلوين الصفحة", "تحميل الصور", "تشفير كلمات المرور"], 0]],
  },
  {
    t: "Iterators و Iterables", d: "البروتوكول الذي يقف خلف for...of والـ spread والـ destructuring.",
    s: [["البروتوكول", "<p>الكائن <strong>Iterable</strong> يملك <code>[Symbol.iterator]()</code> التي تعيد <strong>Iterator</strong>، وهو كائن بدالة <code>next()</code> ترجع <code>{ value, done }</code>.</p>"],
        ["لماذا يهم؟", "<p>أي كائن Iterable يعمل مع <code>for...of</code> و<code>...spread</code> و<code>Array.from</code> و<code>new Set</code>. يمكنك جعل كائناتك قابلة للتكرار.</p>"]],
    key: "ابنِ Iterator عندما يكون التحميل كسولًا أو البيانات ضخمة.",
    code: `const range = {
  from: 1, to: 4,
  [Symbol.iterator]() {
    let cur = this.from;
    const end = this.to;
    return {
      next: () => cur <= end ? { value: cur++, done: false } : { value: undefined, done: true },
    };
  },
};
console.log([...range]);
for (const n of range) if (n % 2 === 0) console.log("even", n);
const [first, second] = range;
console.log(first, second);
console.log(Math.max(...range));`,
    out: "[ 1, 2, 3, 4 ]\neven 2\neven 4\n1 2\n4",
    exp: "<p>بمجرد وجود <code>Symbol.iterator</code> يعمل الكائن مع spread وdestructuring وfor...of بدون كتابة أي شيء إضافي.</p>",
    prompt: "اجعل الكائن <code>{ items: ['a','b'] }</code> قابلًا للتكرار عبر إرجاع <code>this.items[Symbol.iterator]()</code>.",
    starter: "const bag = {\n  items: ['a', 'b'],\n  [Symbol.iterator]() { return this.items[Symbol.iterator](); },\n};\nconsole.log([...bag]);",
    q: [["ماذا ترجع next()؟", ["كائنًا فيه value و done", "رقمًا فقط", "مصفوفة", "Promise دائمًا"], 0],
        ["ما الذي يجعل الكائن Iterable؟", ["امتلاكه الدالة [Symbol.iterator]", "امتلاكه خاصية length", "كونه مصفوفة فقط", "وجود next فيه"], 0],
        ["أي من هذه تعمل مع الـ Iterables؟", ["spread وfor...of وdestructuring", "typeof فقط", "delete فقط", "with فقط"], 0]],
  },
  {
    t: "Generators", d: "دوال يمكن إيقافها واستئنافها لإنتاج قيم كسولة وتدفقات لا نهائية.",
    s: [["function* و yield", "<p>الدالة المولدة <code>function*</code> ترجع Iterator. عند <code>yield</code> تتوقف وتسلم قيمة، ويكمل الاستدعاء التالي من نفس المكان بحالتها المحفوظة.</p>"],
        ["كسل وتدفقات", "<p>لا تُحسب القيمة إلا عند طلبها، لذا يمكن تعريف تسلسل لا نهائي وأخذ الجزء المطلوب منه فقط. ويمكن تمرير قيم إلى المولد عبر <code>next(value)</code>.</p>"]],
    key: "yield يوقف التنفيذ ويحفظ الحالة، وnext(value) يعيد قيمة إلى داخل المولد.",
    code: `function* naturals() {
  let n = 1;
  while (true) yield n++;
}
function* take(iter, count) {
  let i = 0;
  for (const v of iter) {
    if (i++ >= count) return;
    yield v;
  }
}
console.log([...take(naturals(), 5)]);

function* conversation() {
  const name = yield "name?";
  const lang = yield "language?";
  return name + " likes " + lang;
}
const g = conversation();
console.log(g.next().value);
console.log(g.next("Sara").value);
console.log(g.next("JS"));`,
    out: "[ 1, 2, 3, 4, 5 ]\nname?\nlanguage?\n{ value: 'Sara likes JS', done: true }",
    exp: "<p>التسلسل <code>naturals</code> لا نهائي لكنه لا يعلّق البرنامج لأن <code>take</code> تطلب 5 قيم فقط. في المحادثة تُرسل الإجابات عبر <code>next</code>.</p>",
    prompt: "اكتب مولدًا <code>fib</code> ينتج أرقام فيبوناتشي، وخذ أول 6 أرقام.",
    starter: "function* fib() {\n  let [a, b] = [0, 1];\n  while (true) { yield a; [a, b] = [b, a + b]; }\n}\nconst out = [];\nfor (const n of fib()) { if (out.length === 6) break; out.push(n); }\nconsole.log(out);",
    q: [["ماذا يحدث عند yield؟", ["تتوقف الدالة وتسلم القيمة وتحفظ حالتها", "تنتهي الدالة نهائيًا", "ترمي خطأ", "تتكرر من البداية"], 0],
        ["لماذا يمكن تعريف تسلسل لا نهائي بمولد؟", ["لأن القيم تُحسب عند الطلب فقط", "لأن الذاكرة لا نهائية", "لأن المولد ينسخ المصفوفات", "لا يمكن"], 0],
        ["ماذا يفعل next('x')؟", ["يعيد 'x' كنتيجة لتعبير yield المتوقف", "يحذف المولد", "يضيف عنصرًا للمصفوفة", "يغير اسم الدالة"], 0]],
  },
];
