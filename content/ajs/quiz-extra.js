export const EXTRA = {
  "ajs-01": [
    {
      question: { ar: "ما ناتج الكود؟ console.log(typeof f, typeof g); function f() {} var g = function () {};", en: "What does this code print? console.log(typeof f, typeof g); function f() {} var g = function () {};" },
      options: [
        { ar: "undefined undefined", en: "undefined undefined" },
        { ar: "function function", en: "function function" },
        { ar: "خطأ ReferenceError عند g", en: "A ReferenceError at g" },
        { ar: "function undefined", en: "function undefined" }
      ],
      correct: 3,
      explain: {
        ar: "تصريح الدالة f يُرفع مع جسمها كاملاً فيكون نوعها function. أما g فمتغير var يُرفع التصريح فقط بقيمة undefined، ولا تُسند الدالة إلا عند وصول التنفيذ إلى السطر.",
        en: "The declaration f is hoisted with its whole body, so its type is function. g is a var, so only the declaration is hoisted with the value undefined, and the function is assigned only when execution reaches that line."
      }
    },
    {
      question: { ar: "ماذا يحدث؟ let x = 1; { console.log(x); let x = 2; }", en: "What happens? let x = 1; { console.log(x); let x = 2; }" },
      options: [
        { ar: "يطبع 1 لأنه يستخدم x الخارجي", en: "It prints 1 because it uses the outer x" },
        { ar: "يطبع undefined", en: "It prints undefined" },
        { ar: "يرمي ReferenceError لأن x الداخلية في TDZ حتى سطر تعريفها", en: "It throws a ReferenceError because the inner x is in the TDZ until its declaration line" },
        { ar: "يطبع 2", en: "It prints 2" }
      ],
      correct: 2,
      explain: {
        ar: "let داخل البلوك تظلل x الخارجي من بداية البلوك كله، لكنها غير قابلة للقراءة قبل تصريحها، وهذه هي TDZ. لذلك لا يُستخدم x الخارجي ولا تكون القيمة undefined.",
        en: "The inner let shadows the outer x for the whole block, but it cannot be read before its declaration, which is the TDZ. So the outer x is not used and the value is not undefined."
      }
    }
  ],
  "ajs-02": [
    {
      question: { ar: "ما ناتج الكود؟ const mk = () => { let c = 0; return () => ++c; }; const a = mk(), b = mk(); a(); a(); console.log(a(), b());", en: "What does this code print? const mk = () => { let c = 0; return () => ++c; }; const a = mk(), b = mk(); a(); a(); console.log(a(), b());" },
      options: [
        { ar: "3 و 1", en: "3 and 1" },
        { ar: "3 و 3", en: "3 and 3" },
        { ar: "1 و 1", en: "1 and 1" },
        { ar: "2 و 1", en: "2 and 1" }
      ],
      correct: 0,
      explain: {
        ar: "كل استدعاء لـ mk ينشئ نطاقاً جديداً بمتغير c مستقل تحتفظ به الدالة المعادة. لذلك a تعد وحدها حتى 3، و b تبدأ من 1.",
        en: "Each call to mk creates a new scope with its own c, kept alive by the returned function. So a counts alone up to 3, and b starts from 1."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ let n = 1; const f = () => n; n = 2; console.log(f());", en: "What does this code print? let n = 1; const f = () => n; n = 2; console.log(f());" },
      options: [
        { ar: "1 لأن الدالة نسخت القيمة عند إنشائها", en: "1, because the function copied the value when created" },
        { ar: "2 لأن closure تحتفظ بالمتغير نفسه لا بنسخة من قيمته", en: "2, because the closure keeps the variable itself, not a copy of its value" },
        { ar: "undefined", en: "undefined" },
        { ar: "خطأ لأن n تغيرت بعد الإنشاء", en: "An error because n changed after creation" }
      ],
      correct: 1,
      explain: {
        ar: "الـ closure تلتقط الربط بالمتغير وليس قيمته وقت الإنشاء، فترى التغييرات اللاحقة. لذلك تُقرأ القيمة الحالية 2 عند الاستدعاء.",
        en: "A closure captures the binding to the variable, not its value at creation time, so it sees later changes. The current value 2 is read at call time."
      }
    }
  ],
  "ajs-03": [
    {
      question: { ar: "ما ناتج الكود؟ function f() { return this.n; } const b = f.bind({ n: 1 }); console.log(b.call({ n: 2 }));", en: "What does this code print? function f() { return this.n; } const b = f.bind({ n: 1 }); console.log(b.call({ n: 2 }));" },
      options: [
        { ar: "2", en: "2" },
        { ar: "1", en: "1" },
        { ar: "undefined", en: "undefined" },
        { ar: "خطأ", en: "An error" }
      ],
      correct: 1,
      explain: {
        ar: "الدالة التي يعيدها bind مربوطة بـ this نهائياً، ولا يستطيع call أو apply أو bind لاحق تغييره. لذلك تبقى القيمة 1.",
        en: "The function returned by bind has this fixed permanently, and a later call, apply or bind cannot change it. So the result stays 1."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ const o = { n: 1, f() { return [1].map(() => this.n); } }; console.log(o.f());", en: "What does this code print? const o = { n: 1, f() { return [1].map(() => this.n); } }; console.log(o.f());" },
      options: [
        { ar: "[undefined]", en: "[undefined]" },
        { ar: "خطأ TypeError", en: "A TypeError" },
        { ar: "[1]", en: "[1]" },
        { ar: "[0]", en: "[0]" }
      ],
      correct: 2,
      explain: {
        ar: "الدالة السهمية لا تملك this خاصاً بها فترث this من الدالة المحيطة f، وهي o عند الاستدعاء o.f(). لو كانت دالة عادية لضاع this داخل map.",
        en: "An arrow function has no own this and inherits it from the enclosing f, which is o in the call o.f(). A regular function there would lose this inside map."
      }
    }
  ],
  "ajs-04": [
    {
      question: { ar: "ما ناتج الكود؟ const add = a => b => a + b; console.log([1, 2].map(add(10)));", en: "What does this code print? const add = a => b => a + b; console.log([1, 2].map(add(10)));" },
      options: [
        { ar: "[11, 12]", en: "[11, 12]" },
        { ar: "[10, 10]", en: "[10, 10]" },
        { ar: "[1, 2]", en: "[1, 2]" },
        { ar: "[NaN, NaN]", en: "[NaN, NaN]" }
      ],
      correct: 0,
      explain: {
        ar: "add(10) تعيد دالة تنتظر b وتتذكر a = 10، و map تمرر لها كل عنصر. هذا مثال على currying وتطبيق جزئي.",
        en: "add(10) returns a function that waits for b and remembers a = 10, and map feeds it each element. This is currying with partial application."
      }
    },
    {
      question: { ar: "إذا كانت inc = x => x + 1 و dbl = x => x * 2، فما ناتج compose(inc, dbl)(5) و pipe(inc, dbl)(5) على الترتيب؟", en: "Given inc = x => x + 1 and dbl = x => x * 2, what do compose(inc, dbl)(5) and pipe(inc, dbl)(5) return, in order?" },
      options: [
        { ar: "12 و 12", en: "12 and 12" },
        { ar: "11 و 12", en: "11 and 12" },
        { ar: "12 و 11", en: "12 and 11" },
        { ar: "11 و 11", en: "11 and 11" }
      ],
      correct: 1,
      explain: {
        ar: "compose تطبق الدوال من اليمين: dbl(5) = 10 ثم inc = 11. pipe تطبقها من اليسار: inc(5) = 6 ثم dbl = 12.",
        en: "compose applies functions right to left: dbl(5) = 10 then inc = 11. pipe applies them left to right: inc(5) = 6 then dbl = 12."
      }
    }
  ],
  "ajs-05": [
    {
      question: { ar: "memoize تخزن النتيجة بمفتاح args[0] فقط. ما المشكلة عند استخدامها مع دالة add(a, b)؟", en: "A memoize helper caches results by args[0] only. What goes wrong when it wraps add(a, b)?" },
      options: [
        { ar: "add(1, 2) ثم add(1, 5) يعيد الثانية نتيجة الأولى الخاطئة 3 من الذاكرة", en: "add(1, 2) then add(1, 5) returns the stale 3 from the cache for the second call" },
        { ar: "لا تعمل الذاكرة مع دوال بوسيطين", en: "The cache cannot work with two-parameter functions" },
        { ar: "تصبح الدالة أبطأ دائماً", en: "The function always becomes slower" },
        { ar: "لا مشكلة لأن الوسيط الأول يكفي دائماً", en: "No problem, the first argument is always enough" }
      ],
      correct: 0,
      explain: {
        ar: "مفتاح التخزين يجب أن يمثل كل المدخلات التي تؤثر في النتيجة، وإلا تتشابه المفاتيح وتعود نتائج قديمة خاطئة. نبني المفتاح من كل args مثلاً JSON.stringify(args).",
        en: "The cache key must represent every input that affects the result, otherwise keys collide and stale wrong results are returned. Build the key from all args, for example JSON.stringify(args)."
      }
    },
    {
      question: { ar: "دالة debounce بانتظار 200ms استُدعيت عند الزمن 0 و 50 و 100ms. متى وكم مرة تُنفذ الدالة الأصلية؟", en: "A debounced function with a 200ms wait is called at 0, 50 and 100ms. When and how many times does the original run?" },
      options: [
        { ar: "ثلاث مرات عند 200 و 250 و 300", en: "Three times at 200, 250 and 300" },
        { ar: "مرة واحدة عند 200ms", en: "Once at 200ms" },
        { ar: "مرة واحدة عند 300ms", en: "Once at 300ms" },
        { ar: "مرتان عند 0 و 100", en: "Twice at 0 and 100" }
      ],
      correct: 2,
      explain: {
        ar: "كل استدعاء جديد يلغي المؤقت السابق ويبدأ انتظاراً جديداً. آخر استدعاء كان عند 100ms فتُنفذ الدالة مرة واحدة بعد 200ms منه أي عند 300ms.",
        en: "Each new call cancels the previous timer and starts a fresh wait. The last call was at 100ms, so the function runs once, 200ms later, at 300ms."
      }
    }
  ],
  "ajs-06": [
    {
      question: { ar: "ما ناتج الكود؟ function A() {} A.prototype.hi = function () {}; const a = new A(); console.log(a.hasOwnProperty(\"hi\"), \"hi\" in a);", en: "What does this code print? function A() {} A.prototype.hi = function () {}; const a = new A(); console.log(a.hasOwnProperty(\"hi\"), \"hi\" in a);" },
      options: [
        { ar: "true true", en: "true true" },
        { ar: "false true", en: "false true" },
        { ar: "true false", en: "true false" },
        { ar: "false false", en: "false false" }
      ],
      correct: 1,
      explain: {
        ar: "الدالة hi موجودة على A.prototype وليست خاصية ذاتية للكائن a، فتعيد hasOwnProperty قيمة false. أما عامل in فيبحث في سلسلة prototype أيضاً فيعيد true.",
        en: "hi lives on A.prototype and is not an own property of a, so hasOwnProperty gives false. The in operator also searches the prototype chain, so it gives true."
      }
    },
    {
      question: { ar: "ما ناتج console.log(\"toString\" in Object.create(null))؟", en: "What does console.log(\"toString\" in Object.create(null)) print?" },
      options: [
        { ar: "true لأن كل كائن يرث toString", en: "true, because every object inherits toString" },
        { ar: "undefined", en: "undefined" },
        { ar: "خطأ TypeError", en: "A TypeError" },
        { ar: "false لأن الكائن بلا prototype فلا يرث شيئاً", en: "false, because the object has no prototype and inherits nothing" }
      ],
      correct: 3,
      explain: {
        ar: "Object.create(null) ينشئ كائناً بدون prototype، فلا تصله خصائص Object.prototype مثل toString. لذلك هو مناسب كقاموس خالٍ من الخصائص الموروثة.",
        en: "Object.create(null) creates an object with no prototype, so properties of Object.prototype such as toString never reach it. That makes it a clean dictionary free of inherited keys."
      }
    }
  ],
  "ajs-07": [
    {
      question: { ar: "ما ناتج الكود؟ class A { #x = 1; } const a = new A(); console.log(a.x, Object.keys(a));", en: "What does this code print? class A { #x = 1; } const a = new A(); console.log(a.x, Object.keys(a));" },
      options: [
        { ar: "1 و [\"x\"]", en: "1 and [\"x\"]" },
        { ar: "1 و []", en: "1 and []" },
        { ar: "undefined و []", en: "undefined and []" },
        { ar: "undefined و [\"#x\"]", en: "undefined and [\"#x\"]" }
      ],
      correct: 2,
      explain: {
        ar: "الحقل الخاص #x ليس خاصية عادية اسمها x ولا يظهر في المفاتيح، فتعطي a.x القيمة undefined. لا يُوصل إليه إلا من داخل الكلاس بـ this.#x.",
        en: "The private field #x is not a normal property named x and does not appear in the keys, so a.x is undefined. It can only be reached inside the class through this.#x."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ class C { static n = 0; constructor() { C.n++; } } new C(); new C(); console.log(C.n);", en: "What does this code print? class C { static n = 0; constructor() { C.n++; } } new C(); new C(); console.log(C.n);" },
      options: [
        { ar: "0", en: "0" },
        { ar: "1", en: "1" },
        { ar: "2", en: "2" },
        { ar: "undefined", en: "undefined" }
      ],
      correct: 2,
      explain: {
        ar: "الحقل static ينتمي إلى الكلاس نفسه ويوجد منه نسخة واحدة مشتركة، وكل استدعاء للـ constructor يزيدها. بعد إنشاء كائنين تصبح 2.",
        en: "A static field belongs to the class itself with a single shared copy, and each constructor call increments it. After two instances it is 2."
      }
    }
  ],
  "ajs-08": [
    {
      question: { ar: "ما ناتج الكود؟ class A { hi() { return \"A\"; } } class B extends A { hi() { return super.hi() + \"B\"; } } console.log(new B().hi());", en: "What does this code print? class A { hi() { return \"A\"; } } class B extends A { hi() { return super.hi() + \"B\"; } } console.log(new B().hi());" },
      options: [
        { ar: "B", en: "B" },
        { ar: "A", en: "A" },
        { ar: "AB", en: "AB" },
        { ar: "BA", en: "BA" }
      ],
      correct: 2,
      explain: {
        ar: "super.hi() يستدعي نسخة الأب فتعيد A، ثم تضيف الابنة B فتصبح AB. override لا يلغي الأب بل يسمح بالبناء عليه.",
        en: "super.hi() calls the parent version returning A, then the child appends B to give AB. Overriding does not discard the parent; it lets you build on it."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ const Fly = Base => class extends Base { fly() { return \"fly\"; } }; class Bird extends Fly(Object) {} console.log(new Bird().fly(), new Bird() instanceof Bird);", en: "What does this code print? const Fly = Base => class extends Base { fly() { return \"fly\"; } }; class Bird extends Fly(Object) {} console.log(new Bird().fly(), new Bird() instanceof Bird);" },
      options: [
        { ar: "fly true", en: "fly true" },
        { ar: "fly false", en: "fly false" },
        { ar: "undefined true", en: "undefined true" },
        { ar: "خطأ لأن الكلاس لا يعاد من دالة", en: "An error because a class cannot be returned from a function" }
      ],
      correct: 0,
      explain: {
        ar: "الكلاس قيمة عادية في JavaScript فيمكن لدالة أن تنشئ كلاساً يمتد من Base الممرر، وهذا نمط mixin. Bird يرث fly عبر السلسلة ويبقى instanceof لنفسه صحيحاً.",
        en: "A class is an ordinary value in JavaScript, so a function can create a class extending the Base it receives, which is the mixin pattern. Bird inherits fly through the chain and stays an instanceof itself."
      }
    }
  ],
  "ajs-09": [
    {
      question: { ar: "ما ناتج الكود؟ const o = {}; Object.defineProperty(o, \"id\", { value: 1 }); console.log(Object.keys(o), o.id, Object.getOwnPropertyDescriptor(o, \"id\").writable);", en: "What does this code print? const o = {}; Object.defineProperty(o, \"id\", { value: 1 }); console.log(Object.keys(o), o.id, Object.getOwnPropertyDescriptor(o, \"id\").writable);" },
      options: [
        { ar: "[\"id\"] 1 true", en: "[\"id\"] 1 true" },
        { ar: "[] 1 false", en: "[] 1 false" },
        { ar: "[\"id\"] 1 false", en: "[\"id\"] 1 false" },
        { ar: "[] undefined false", en: "[] undefined false" }
      ],
      correct: 1,
      explain: {
        ar: "عند التعريف بـ defineProperty تكون الخصائص writable و enumerable و configurable مساوية false افتراضياً. لذلك الخاصية غير قابلة للتعديل ولا تظهر في Object.keys لكن قيمتها تُقرأ.",
        en: "With defineProperty, writable, enumerable and configurable all default to false. So the property is not writable and does not show in Object.keys, but its value can be read."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ const o = Object.freeze({ list: [1] }); o.list.push(2); console.log(o.list);", en: "What does this code print? const o = Object.freeze({ list: [1] }); o.list.push(2); console.log(o.list);" },
      options: [
        { ar: "[1] لأن الكائن مجمّد", en: "[1], because the object is frozen" },
        { ar: "[1, 2] لأن freeze سطحي ولا يشمل المصفوفة الداخلية", en: "[1, 2], because freeze is shallow and does not cover the inner array" },
        { ar: "خطأ TypeError", en: "A TypeError" },
        { ar: "[2]", en: "[2]" }
      ],
      correct: 1,
      explain: {
        ar: "freeze يجمّد خصائص الكائن المباشرة فقط، فلا يمكن استبدال list بمصفوفة أخرى. لكن المصفوفة نفسها كائن غير مجمّد فيمكن تعديلها بـ push.",
        en: "freeze locks only the object's direct properties, so list cannot be replaced by another array. The array itself is a separate unfrozen object and can still be changed with push."
      }
    }
  ],
  "ajs-10": [
    {
      question: { ar: "ما ناتج الكود؟ const p = new Proxy({}, { set(t, k, v) { t[k] = v * 2; return true; } }); p.x = 5; console.log(p.x);", en: "What does this code print? const p = new Proxy({}, { set(t, k, v) { t[k] = v * 2; return true; } }); p.x = 5; console.log(p.x);" },
      options: [
        { ar: "5", en: "5" },
        { ar: "undefined", en: "undefined" },
        { ar: "خطأ لأن set لا تعدل القيمة", en: "An error because set cannot change the value" },
        { ar: "10", en: "10" }
      ],
      correct: 3,
      explain: {
        ar: "الـ trap المسمى set يعترض عملية الإسناد ويحدد ما يُخزّن في الهدف، فيخزن 10. القراءة p.x لا تملك trap فتمر إلى الهدف مباشرة.",
        en: "The set trap intercepts the assignment and decides what is stored on the target, so 10 is stored. Reading p.x has no trap and passes straight to the target."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ const p = new Proxy({}, { get: (t, k) => (k in t ? t[k] : 0) }); console.log(p.a, p.b + 1);", en: "What does this code print? const p = new Proxy({}, { get: (t, k) => (k in t ? t[k] : 0) }); console.log(p.a, p.b + 1);" },
      options: [
        { ar: "0 و 1", en: "0 and 1" },
        { ar: "undefined و NaN", en: "undefined and NaN" },
        { ar: "0 و NaN", en: "0 and NaN" },
        { ar: "0 و 0", en: "0 and 0" }
      ],
      correct: 0,
      explain: {
        ar: "الـ trap المسمى get يعيد 0 لأي مفتاح غير موجود بدل undefined، فتكون p.a تساوي 0 و p.b + 1 تساوي 1. هذا يوضح كيف يغير Proxy سلوك القراءة.",
        en: "The get trap returns 0 for any missing key instead of undefined, so p.a is 0 and p.b + 1 is 1. This shows how a Proxy changes read behavior."
      }
    }
  ],
  "ajs-11": [
    {
      question: { ar: "ما ناتج الكود؟ console.log([...\"a😀\"].length, \"a😀\".length);", en: "What does this code print? console.log([...\"a😀\"].length, \"a😀\".length);" },
      options: [
        { ar: "2 و 3", en: "2 and 3" },
        { ar: "3 و 2", en: "3 and 2" },
        { ar: "2 و 2", en: "2 and 2" },
        { ar: "3 و 3", en: "3 and 3" }
      ],
      correct: 0,
      explain: {
        ar: "النص iterable يمر على code points كاملة فيُعد الإيموجي عنصراً واحداً، فيكون الناتج 2. أما length فتعد وحدات UTF-16 والإيموجي يشغل وحدتين فيكون 3.",
        en: "A string is iterable by full code points, so the emoji counts as one element, giving 2. length counts UTF-16 units and the emoji takes two, giving 3."
      }
    },
    {
      question: { ar: "ما نتيجة for (const x of { a: 1 }) { }؟", en: "What is the result of for (const x of { a: 1 }) { }?" },
      options: [
        { ar: "يمر على المفتاح a", en: "It iterates over the key a" },
        { ar: "يمر على القيمة 1", en: "It iterates over the value 1" },
        { ar: "يرمي TypeError لأن الكائن العادي ليس iterable", en: "It throws a TypeError because a plain object is not iterable" },
        { ar: "لا يفعل شيئاً بصمت", en: "It silently does nothing" }
      ],
      correct: 2,
      explain: {
        ar: "for...of تتطلب iterable أي كائناً له Symbol.iterator، والكائن العادي لا يملكه. لمرور مفاتيحه نستخدم Object.keys أو Object.entries.",
        en: "for...of requires an iterable, meaning an object with Symbol.iterator, and a plain object has none. To loop over its keys use Object.keys or Object.entries."
      }
    }
  ],
  "ajs-12": [
    {
      question: { ar: "ما ناتج الكود؟ function* g() { yield 1; yield 2; return 3; } console.log([...g()]);", en: "What does this code print? function* g() { yield 1; yield 2; return 3; } console.log([...g()]);" },
      options: [
        { ar: "[1, 2, 3]", en: "[1, 2, 3]" },
        { ar: "[1, 2]", en: "[1, 2]" },
        { ar: "[3]", en: "[3]" },
        { ar: "[1, 2, undefined]", en: "[1, 2, undefined]" }
      ],
      correct: 1,
      explain: {
        ar: "الـ spread والحلقات تتوقف عندما تصبح done تساوي true ولا تأخذ قيمة return. لذلك تظهر القيم المنتجة بـ yield فقط.",
        en: "Spread and loops stop when done becomes true and ignore the return value. So only the values produced by yield appear."
      }
    },
    {
      question: { ar: "مع نفس المولد function* g() { yield 1; yield 2; return 3; } و it = g() و it.next() مرة، ماذا تعيد الاستدعاءات الثلاثة التالية على الترتيب؟", en: "With the same generator function* g() { yield 1; yield 2; return 3; } and it = g() after one it.next(), what do the next three calls return, in order?" },
      options: [
        { ar: "{value:2,done:false} ثم {value:3,done:true} ثم {value:undefined,done:true}", en: "{value:2,done:false} then {value:3,done:true} then {value:undefined,done:true}" },
        { ar: "{value:2,done:false} ثم {value:3,done:false} ثم {value:undefined,done:true}", en: "{value:2,done:false} then {value:3,done:false} then {value:undefined,done:true}" },
        { ar: "{value:2,done:true} ثم {value:3,done:true} ثم خطأ", en: "{value:2,done:true} then {value:3,done:true} then an error" },
        { ar: "{value:2,done:false} ثم {value:undefined,done:true} ثم {value:undefined,done:true}", en: "{value:2,done:false} then {value:undefined,done:true} then {value:undefined,done:true}" }
      ],
      correct: 0,
      explain: {
        ar: "return تعيد قيمتها مع done: true مرة واحدة، وبعدها يبقى المولد منتهياً فيعيد value غير معرّفة. لذلك ظهرت 3 مع done صحيحة ثم undefined.",
        en: "return delivers its value once with done: true, after which the generator stays finished and yields an undefined value. That is why 3 appears with done true and then undefined."
      }
    }
  ],
  "ajs-13": [
    {
      question: { ar: "ما ناتج الكود؟ console.log(new Map([[{}, 1]]).get({}));", en: "What does this code print? console.log(new Map([[{}, 1]]).get({}));" },
      options: [
        { ar: "1", en: "1" },
        { ar: "undefined", en: "undefined" },
        { ar: "null", en: "null" },
        { ar: "خطأ", en: "An error" }
      ],
      correct: 1,
      explain: {
        ar: "مفاتيح Map المأخوذة من كائنات تُقارن بالهوية وليس بالمحتوى، و {} الثانية كائن جديد مختلف عن الأول. لذلك لا يُعثر على المفتاح ونحصل على undefined.",
        en: "Object keys in a Map are compared by identity, not content, and the second {} is a new, different object. So the key is not found and the result is undefined."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ console.log(new Set([{ a: 1 }, { a: 1 }]).size, new Set([NaN, NaN]).size);", en: "What does this code print? console.log(new Set([{ a: 1 }, { a: 1 }]).size, new Set([NaN, NaN]).size);" },
      options: [
        { ar: "1 و 1", en: "1 and 1" },
        { ar: "1 و 2", en: "1 and 2" },
        { ar: "2 و 2", en: "2 and 2" },
        { ar: "2 و 1", en: "2 and 1" }
      ],
      correct: 3,
      explain: {
        ar: "الكائنان المتشابهان شكلاً مرجعان مختلفان فيبقيان معاً فيكون الحجم 2. أما Set فتعتبر NaN مساوياً لنفسه عكس ===، فيبقى عنصر واحد.",
        en: "The two look-alike objects are different references, so both stay and the size is 2. Set treats NaN as equal to itself, unlike ===, so only one remains."
      }
    }
  ],
  "ajs-14": [
    {
      question: { ar: "ما ناتج الكود؟ const s = Symbol(); const o = { [s]: 1, a: 2 }; console.log(Object.keys(o), JSON.stringify(o));", en: "What does this code print? const s = Symbol(); const o = { [s]: 1, a: 2 }; console.log(Object.keys(o), JSON.stringify(o));" },
      options: [
        { ar: "[\"a\"] و {\"a\":2}", en: "[\"a\"] and {\"a\":2}" },
        { ar: "[\"a\", \"s\"] و {\"a\":2,\"s\":1}", en: "[\"a\", \"s\"] and {\"a\":2,\"s\":1}" },
        { ar: "[] و {}", en: "[] and {}" },
        { ar: "[\"a\"] و {\"a\":2,\"s\":1}", en: "[\"a\"] and {\"a\":2,\"s\":1}" }
      ],
      correct: 0,
      explain: {
        ar: "المفاتيح من نوع Symbol لا تظهر في Object.keys ولا في for...in ويتجاهلها JSON.stringify. لذلك تبقى الخاصية a وحدها.",
        en: "Symbol keys do not show in Object.keys or for...in, and JSON.stringify ignores them. So only the property a remains."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ function tag(strings, ...vals) { return strings.length + \":\" + vals.join(\"-\"); } console.log(tag`a${1}b${2}c`);", en: "What does this code print? function tag(strings, ...vals) { return strings.length + \":\" + vals.join(\"-\"); } console.log(tag`a${1}b${2}c`);" },
      options: [
        { ar: "2:1-2", en: "2:1-2" },
        { ar: "3:1-2", en: "3:1-2" },
        { ar: "5:1-2", en: "5:1-2" },
        { ar: "3:12", en: "3:12" }
      ],
      correct: 1,
      explain: {
        ar: "القوالب تُقسم عند كل تعبير مدرج إلى نصوص ثابتة هي \"a\" و \"b\" و \"c\" أي 3 عناصر، وتصل القيم 1 و 2 في وسائط الـ rest. join بالشرطة يعطي 1-2.",
        en: "The template is split at each interpolation into the static strings \"a\", \"b\" and \"c\", which is 3 elements, and the values 1 and 2 arrive in the rest arguments. Joining with a dash gives 1-2."
      }
    }
  ],
  "ajs-15": [
    {
      question: { ar: "ما ترتيب الطباعة؟ console.log(\"1\"); setTimeout(() => console.log(\"2\")); Promise.resolve().then(() => console.log(\"3\")); console.log(\"4\");", en: "What is the print order? console.log(\"1\"); setTimeout(() => console.log(\"2\")); Promise.resolve().then(() => console.log(\"3\")); console.log(\"4\");" },
      options: [
        { ar: "1 ثم 2 ثم 3 ثم 4", en: "1, 2, 3, 4" },
        { ar: "1 ثم 4 ثم 2 ثم 3", en: "1, 4, 2, 3" },
        { ar: "1 ثم 3 ثم 4 ثم 2", en: "1, 3, 4, 2" },
        { ar: "1 ثم 4 ثم 3 ثم 2", en: "1, 4, 3, 2" }
      ],
      correct: 3,
      explain: {
        ar: "الكود المتزامن يعمل أولاً فتُطبع 1 و 4، ثم تُفرغ طابور microtasks فتُطبع 3، وأخيراً تأتي macrotask الخاصة بالمؤقت فتُطبع 2.",
        en: "Synchronous code runs first, printing 1 and 4, then the microtask queue is drained, printing 3, and only then does the timer macrotask print 2."
      }
    },
    {
      question: { ar: "ما ترتيب الطباعة؟ async function f() { console.log(\"a\"); await null; console.log(\"b\"); } f(); console.log(\"c\");", en: "What is the print order? async function f() { console.log(\"a\"); await null; console.log(\"b\"); } f(); console.log(\"c\");" },
      options: [
        { ar: "a ثم c ثم b", en: "a, c, b" },
        { ar: "a ثم b ثم c", en: "a, b, c" },
        { ar: "c ثم a ثم b", en: "c, a, b" },
        { ar: "a ثم c فقط", en: "a, c only" }
      ],
      correct: 0,
      explain: {
        ar: "الدالة async تعمل بشكل متزامن حتى أول await فتطبع a، ثم تتوقف ويعود التحكم للمستدعي فتُطبع c. الجزء بعد await يُجدول كـ microtask فيطبع b أخيراً.",
        en: "An async function runs synchronously up to the first await, printing a, then pauses and hands control back so c prints. The code after await is scheduled as a microtask, so b prints last."
      }
    }
  ],
  "ajs-16": [
    {
      question: { ar: "ما ناتج الكود؟ Promise.allSettled([Promise.resolve(1), Promise.reject(\"x\")]).then(r => console.log(r.map(i => i.status)));", en: "What does this code print? Promise.allSettled([Promise.resolve(1), Promise.reject(\"x\")]).then(r => console.log(r.map(i => i.status)));" },
      options: [
        { ar: "[\"fulfilled\", \"rejected\"]", en: "[\"fulfilled\", \"rejected\"]" },
        { ar: "[\"fulfilled\"]", en: "[\"fulfilled\"]" },
        { ar: "لا شيء، ويظهر خطأ غير معالج", en: "Nothing, with an unhandled error" },
        { ar: "[1, \"x\"]", en: "[1, \"x\"]" }
      ],
      correct: 0,
      explain: {
        ar: "allSettled لا ترفض أبداً بسبب أحد العناصر، وتعيد كائناً لكل promise فيه status و value أو reason. لذلك يعمل then وتظهر الحالتان.",
        en: "allSettled never rejects because of one element and returns an object per promise with a status and a value or reason. So then runs and both statuses appear."
      }
    },
    {
      question: { ar: "promise يُرفض بعد 10ms وآخر يتحقق بعد 50ms. ما نتيجة Promise.race عليهما، وما نتيجة Promise.any؟", en: "One promise rejects after 10ms and another fulfills after 50ms. What do Promise.race and Promise.any give for them?" },
      options: [
        { ar: "race تتحقق بنتيجة الثاني و any ترفض", en: "race fulfills with the second value and any rejects" },
        { ar: "race و any كلاهما يرفضان", en: "Both race and any reject" },
        { ar: "race و any كلاهما يتحققان بنتيجة الثاني", en: "Both race and any fulfill with the second value" },
        { ar: "race ترفض لأن الأول انتهى أولاً و any تتحقق بنتيجة الثاني", en: "race rejects because the first settled first, and any fulfills with the second value" }
      ],
      correct: 3,
      explain: {
        ar: "race تتبع أول promise ينتهي سواء بنجاح أو رفض، وهنا الرفض عند 10ms. any تتجاهل الرفض وتنتظر أول نجاح فتتحقق بالقيمة الثانية.",
        en: "race follows the first promise to settle, whether it fulfills or rejects, and here the rejection comes at 10ms. any ignores rejections and waits for the first success, so it fulfills with the second value."
      }
    }
  ],
  "ajs-17": [
    {
      question: { ar: "ما ترتيب الطباعة؟ [1, 2].forEach(async n => { await null; console.log(n); }); console.log(\"end\");", en: "What is the print order? [1, 2].forEach(async n => { await null; console.log(n); }); console.log(\"end\");" },
      options: [
        { ar: "1 ثم 2 ثم end", en: "1, 2, end" },
        { ar: "end ثم 1 ثم 2", en: "end, 1, 2" },
        { ar: "end فقط", en: "end only" },
        { ar: "1 ثم end ثم 2", en: "1, end, 2" }
      ],
      correct: 1,
      explain: {
        ar: "forEach لا تنتظر الـ promises التي تعيدها دوال async، فتكمل فوراً وتُطبع end أولاً. للانتظار الحقيقي نستخدم for...of مع await أو Promise.all مع map.",
        en: "forEach does not wait for the promises returned by async callbacks, so it finishes immediately and end prints first. For real waiting use for...of with await, or Promise.all with map."
      }
    },
    {
      question: { ar: "ماذا يطبع الكود؟ async function f() { try { return Promise.reject(new Error(\"x\")); } catch { return \"caught\"; } } f().catch(e => console.log(e.message));", en: "What does this code print? async function f() { try { return Promise.reject(new Error(\"x\")); } catch { return \"caught\"; } } f().catch(e => console.log(e.message));" },
      options: [
        { ar: "caught", en: "caught" },
        { ar: "x", en: "x" },
        { ar: "لا شيء", en: "Nothing" },
        { ar: "undefined", en: "undefined" }
      ],
      correct: 1,
      explain: {
        ar: "return دون await يمرر الـ promise المرفوض للخارج قبل أن يلتقطه try، فلا يعمل catch الداخلي. لو كتبنا return await لالتقطه catch وطبعنا caught.",
        en: "return without await hands the rejected promise outward before try can catch it, so the inner catch never runs. With return await the catch would handle it and caught would print."
      }
    }
  ],
  "ajs-18": [
    {
      question: { ar: "ما الناتج؟ const c = new AbortController(); c.signal.addEventListener(\"abort\", () => console.log(\"ab\")); c.abort(); c.abort(); console.log(c.signal.aborted);", en: "What is the output? const c = new AbortController(); c.signal.addEventListener(\"abort\", () => console.log(\"ab\")); c.abort(); c.abort(); console.log(c.signal.aborted);" },
      options: [
        { ar: "ab ثم ab ثم true", en: "ab, ab, true" },
        { ar: "ab ثم true", en: "ab, true" },
        { ar: "true فقط", en: "true only" },
        { ar: "خطأ عند الاستدعاء الثاني", en: "An error on the second call" }
      ],
      correct: 1,
      explain: {
        ar: "الإلغاء يحدث مرة واحدة فقط، والاستدعاءات التالية لـ abort لا تفعل شيئاً ولا تُطلق الحدث ثانية. وبعده تصبح signal.aborted تساوي true.",
        en: "Aborting happens only once, and later abort calls do nothing and do not fire the event again. Afterwards signal.aborted is true."
      }
    },
    {
      question: { ar: "ماذا يُطبع؟ async function* g() { try { yield 1; yield 2; } finally { console.log(\"cleanup\"); } } (async () => { for await (const x of g()) { console.log(x); break; } })();", en: "What is printed? async function* g() { try { yield 1; yield 2; } finally { console.log(\"cleanup\"); } } (async () => { for await (const x of g()) { console.log(x); break; } })();" },
      options: [
        { ar: "1 فقط", en: "1 only" },
        { ar: "1 ثم 2 ثم cleanup", en: "1, 2, cleanup" },
        { ar: "1 ثم cleanup", en: "1, cleanup" },
        { ar: "cleanup ثم 1", en: "cleanup, 1" }
      ],
      correct: 2,
      explain: {
        ar: "الخروج المبكر من for await بـ break يستدعي return للمولد، فتنفذ كتلة finally فتُطبع cleanup بعد 1. لذلك نضع التنظيف في finally ليعمل حتى عند التوقف المبكر.",
        en: "Leaving for await early with break calls the generator's return, which runs the finally block and prints cleanup after 1. That is why cleanup belongs in finally, so it runs even on early exit."
      }
    }
  ],
  "ajs-19": [
    {
      question: { ar: "ما ناتج الكود؟ class MyErr extends Error { constructor(m) { super(m); this.name = \"MyErr\"; } } const e = new MyErr(\"x\"); console.log(e instanceof Error, String(e));", en: "What does this code print? class MyErr extends Error { constructor(m) { super(m); this.name = \"MyErr\"; } } const e = new MyErr(\"x\"); console.log(e instanceof Error, String(e));" },
      options: [
        { ar: "false و Error: x", en: "false and Error: x" },
        { ar: "true و Error: x", en: "true and Error: x" },
        { ar: "true و MyErr: x", en: "true and MyErr: x" },
        { ar: "true و x", en: "true and x" }
      ],
      correct: 2,
      explain: {
        ar: "الكلاس يمتد من Error فهو instanceof Error، و String يستخدم name و message فيعطي MyErr: x. لو لم نضبط name لظهر Error: x.",
        en: "The class extends Error so it is an instanceof Error, and String uses name and message to give MyErr: x. Without setting name it would show Error: x."
      }
    },
    {
      question: { ar: "أي أسلوب أفضل في catch عندما لا نعرف نوع الخطأ؟", en: "Which approach is best in a catch block when you do not recognize the error type?" },
      options: [
        { ar: "ابتلاع الخطأ بكتلة catch فارغة حتى لا يتوقف البرنامج", en: "Swallow it with an empty catch so the program does not stop" },
        { ar: "التحقق من النوع بـ instanceof والتعامل مع المعروف وإعادة رمي غير المعروف", en: "Check the type with instanceof, handle the known ones and rethrow the unknown ones" },
        { ar: "تحويل كل الأخطاء إلى رسالة نصية عامة", en: "Turn every error into a generic text message" },
        { ar: "طباعة الخطأ فقط ثم المتابعة كأن شيئاً لم يحدث", en: "Only log it and carry on as if nothing happened" }
      ],
      correct: 1,
      explain: {
        ar: "نعالج الأخطاء التي نفهمها ونعرف كيف نتعافى منها، ونعيد رمي الباقي ليصل إلى مستوى أعلى يتعامل معه. ابتلاعها يخفي العلل الحقيقية ويصعّب اكتشافها.",
        en: "Handle the errors you understand and can recover from, and rethrow the rest so a higher level can deal with them. Swallowing hides real bugs and makes them hard to find."
      }
    }
  ],
  "ajs-20": [
    {
      question: { ar: "ما ناتج الكود؟ console.log(\"[a][b]\".match(/\\[.*\\]/)[0], \"[a][b]\".match(/\\[.*?\\]/)[0]);", en: "What does this code print? console.log(\"[a][b]\".match(/\\[.*\\]/)[0], \"[a][b]\".match(/\\[.*?\\]/)[0]);" },
      options: [
        { ar: "[a] و [a]", en: "[a] and [a]" },
        { ar: "[a][b] و [a]", en: "[a][b] and [a]" },
        { ar: "[a] و [a][b]", en: "[a] and [a][b]" },
        { ar: "[a][b] و [a][b]", en: "[a][b] and [a][b]" }
      ],
      correct: 1,
      explain: {
        ar: "الكمّ الجشع .* يلتقط أكبر نص ممكن حتى آخر ] فيعطي [a][b]. إضافة ? تجعله كسولاً فيتوقف عند أول ] ويعطي [a].",
        en: "The greedy .* grabs as much as possible up to the last ], giving [a][b]. Adding ? makes it lazy, so it stops at the first ] and gives [a]."
      }
    },
    {
      question: { ar: "ما ناتج console.log(\"10px 20em\".match(/\\d+(?=px)/)[0])؟", en: "What does console.log(\"10px 20em\".match(/\\d+(?=px)/)[0]) print?" },
      options: [
        { ar: "20", en: "20" },
        { ar: "10px", en: "10px" },
        { ar: "10", en: "10" },
        { ar: "null", en: "null" }
      ],
      correct: 2,
      explain: {
        ar: "(?=px) هو lookahead يشترط أن يتبع الرقم النص px دون أن يلتقطه ضمن النتيجة. لذلك تُرجع المطابقة 10 فقط بدون px.",
        en: "(?=px) is a lookahead that requires px to follow the digits without including it in the match. So the match is 10 without px."
      }
    }
  ],
  "ajs-21": [
    {
      question: { ar: "ما ناتج الكود؟ const s = new Set(); const l = () => console.log(\"x\"); s.add(l); s.add(l); s.forEach(f => f());", en: "What does this code print? const s = new Set(); const l = () => console.log(\"x\"); s.add(l); s.add(l); s.forEach(f => f());" },
      options: [
        { ar: "x مرة واحدة لأن Set لا تكرر العنصر نفسه", en: "x once, because a Set does not duplicate the same item" },
        { ar: "x مرتين", en: "x twice" },
        { ar: "لا شيء", en: "Nothing" },
        { ar: "خطأ عند الإضافة الثانية", en: "An error on the second add" }
      ],
      correct: 0,
      explain: {
        ar: "المستمع المسجل مرتين هو الدالة نفسها، و Set تحتفظ بنسخة واحدة منها، فلا يُنفَّذ المستمع مرتين لنفس الحدث. هذا سبب اختيارها لتخزين المشتركين.",
        en: "The listener registered twice is the same function, and a Set keeps one copy, so it is not run twice for the same event. That is why a Set suits storing subscribers."
      }
    },
    {
      question: { ar: "مكوّن واجهة اشترك في حدث عام ثم أُزيل من الصفحة دون إلغاء الاشتراك. ما النتيجة؟", en: "A UI component subscribed to a global event and was then removed from the page without unsubscribing. What is the result?" },
      options: [
        { ar: "يلغى الاشتراك تلقائياً عند إزالة المكوّن", en: "The subscription is cancelled automatically when the component is removed" },
        { ar: "تتجاهل المنصة الحدث", en: "The event is ignored by the platform" },
        { ar: "يبقى callback مسجلاً فيعمل على مكوّن ميت ويمنع تحرير ذاكرته", en: "The callback stays registered, runs for a dead component and keeps its memory from being freed" },
        { ar: "يرمي الحدث خطأ في كل مرة", en: "The event throws an error every time" }
      ],
      correct: 2,
      explain: {
        ar: "الناشر يحتفظ بمرجع إلى callback ومعه كل ما التقطه من المكوّن، فلا يستطيع GC تحريرها ويستمر تنفيذها. لذلك نستدعي دالة unsubscribe عند التنظيف.",
        en: "The publisher holds a reference to the callback and everything it captured from the component, so the garbage collector cannot free it and it keeps running. That is why we call the unsubscribe function during cleanup."
      }
    }
  ],
  "ajs-22": [
    {
      question: { ar: "حلقة تكتب style لعنصر ثم تقرأ offsetHeight في كل دورة. ما المشكلة وما الحل؟", en: "A loop writes an element's style and then reads offsetHeight on every iteration. What is the problem and the fix?" },
      options: [
        { ar: "لا مشكلة، فالقراءة سريعة دائماً", en: "No problem, reading is always fast" },
        { ar: "التبديل بين الكتابة والقراءة يجبر المتصفح على إعادة حساب التخطيط في كل دورة، فنجمّع القراءات ثم الكتابات", en: "Alternating writes and reads forces the browser to recompute layout on every iteration, so batch the reads first and then the writes" },
        { ar: "offsetHeight لا تعمل داخل الحلقات", en: "offsetHeight does not work inside loops" },
        { ar: "الحل هو استخدام var بدل let", en: "The fix is to use var instead of let" }
      ],
      correct: 1,
      explain: {
        ar: "قراءة خاصية تخطيط بعد تعديل مرتبط بها تفرض إعادة حساب متزامنة تسمى layout thrashing. تجميع كل القراءات أولاً ثم الكتابات يجعل المتصفح يحسب مرة واحدة.",
        en: "Reading a layout property after a related change forces a synchronous recalculation known as layout thrashing. Batching all reads first and then the writes lets the browser calculate once."
      }
    },
    {
      question: { ar: "قائمة فيها 1000 عنصر يجب أن يستجيب كل منها للنقر. ما الأسلوب الأكفأ؟", en: "A list has 1000 items that must each respond to a click. What is the most efficient approach?" },
      options: [
        { ar: "إضافة مستمع منفصل لكل عنصر", en: "Add a separate listener to each item" },
        { ar: "استخدام setInterval لفحص النقرات", en: "Use setInterval to poll for clicks" },
        { ar: "مستمع واحد على الحاوية يفحص event.target (event delegation)", en: "One listener on the container that checks event.target (event delegation)" },
        { ar: "إعادة بناء الصفحة بعد كل نقرة", en: "Rebuild the page after every click" }
      ],
      correct: 2,
      explain: {
        ar: "الأحداث تفقع إلى الحاوية، فمستمع واحد يخدم كل العناصر ويعمل أيضاً مع العناصر المضافة لاحقاً. هذا يوفر ذاكرة ووقتاً مقارنة بألف مستمع.",
        en: "Events bubble up to the container, so one listener serves every item and also works for items added later. This saves memory and time compared with a thousand listeners."
      }
    }
  ]
};
