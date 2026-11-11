export const EXTRA = {
  "js-01": [
    {
      question: { ar: "ما العلاقة بين Java و JavaScript؟", en: "What is the relationship between Java and JavaScript?" },
      options: [
        { ar: "هما اللغة نفسها بإصدارين مختلفين", en: "They are the same language in two versions" },
        { ar: "JavaScript نسخة مبسطة من Java", en: "JavaScript is a simplified version of Java" },
        { ar: "لغتان مختلفتان تماماً، والتشابه في الاسم فقط", en: "They are two completely different languages that only share part of a name" },
        { ar: "Java تعمل داخل المتصفح و JavaScript على الخوادم فقط", en: "Java runs in the browser and JavaScript runs only on servers" }
      ],
      correct: 2,
      explain: {
        ar: "Java و JavaScript لغتان مستقلتان بقواعد وأهداف مختلفة، والاسم المتشابه تسويقي تاريخي. JavaScript ليست نسخة من Java ولا مبنية عليها.",
        en: "Java and JavaScript are independent languages with different rules and goals; the similar name is a historical marketing choice. JavaScript is neither a version of Java nor built on it."
      }
    },
    {
      question: { ar: "موقع يتحقق من أن حقل البريد الإلكتروني ليس فارغاً قبل إرسال النموذج وبدون إعادة تحميل الصفحة. أي جزء يقوم بهذا العمل؟", en: "A site checks that the email field is not empty before submitting the form, without reloading the page. Which part does this work?" },
      options: [
        { ar: "HTML لأنه يبني حقل الإدخال", en: "HTML, because it builds the input field" },
        { ar: "CSS لأنه يتحكم بمظهر الحقل", en: "CSS, because it controls the look of the field" },
        { ar: "اسم النطاق للموقع", en: "The domain name of the site" },
        { ar: "JavaScript لأنه ينفذ المنطق والتحقق عند الإرسال", en: "JavaScript, because it runs the logic and validation on submit" }
      ],
      correct: 3,
      explain: {
        ar: "HTML ينشئ الحقل و CSS ينسقه، لكن فحص القيمة واتخاذ قرار بناءً عليها منطق برمجي يتولاه JavaScript.",
        en: "HTML creates the field and CSS styles it, but checking the value and deciding what to do is program logic, which JavaScript handles."
      }
    }
  ],
  "js-02": [
    {
      question: { ar: "ما ناتج الكود التالي؟ const user = { n: 1 }; user.n = 2; console.log(user.n);", en: "What does this code output? const user = { n: 1 }; user.n = 2; console.log(user.n);" },
      options: [
        { ar: "1", en: "1" },
        { ar: "2", en: "2" },
        { ar: "خطأ TypeError لأن user معرّف بـ const", en: "A TypeError because user is declared with const" },
        { ar: "undefined", en: "undefined" }
      ],
      correct: 1,
      explain: {
        ar: "const يمنع إعادة إسناد المتغير نفسه إلى قيمة جديدة، لكنه لا يمنع تعديل خصائص الكائن الذي يشير إليه. لذلك يطبع 2 دون خطأ.",
        en: "const prevents reassigning the variable itself, but it does not stop changes to the properties of the object it points to. So it prints 2 with no error."
      }
    },
    {
      question: { ar: "ما الخطأ في هذا الكود؟ const total = 0; total = total + 5;", en: "What is wrong with this code? const total = 0; total = total + 5;" },
      options: [
        { ar: "لا يمكن إعادة إسناد متغير معرّف بـ const، ويجب استخدام let هنا", en: "A const variable cannot be reassigned; let should be used here" },
        { ar: "لا يمكن جمع رقم مع نفسه", en: "A number cannot be added to itself" },
        { ar: "يجب كتابة اسم المتغير بحروف كبيرة", en: "The variable name must be written in capital letters" },
        { ar: "الصفر ليس قيمة صالحة للمتغيرات", en: "Zero is not a valid value for variables" }
      ],
      correct: 0,
      explain: {
        ar: "الإسناد الثاني يحاول تغيير ارتباط const فيرمي TypeError. عندما نعرف أن القيمة ستتغير نستخدم let.",
        en: "The second assignment tries to change a const binding and throws a TypeError. When the value will change, use let."
      }
    }
  ],
  "js-03": [
    {
      question: { ar: "ما ناتج console.log(typeof null)؟", en: "What does console.log(typeof null) print?" },
      options: [
        { ar: "null", en: "null" },
        { ar: "undefined", en: "undefined" },
        { ar: "object", en: "object" },
        { ar: "string", en: "string" }
      ],
      correct: 2,
      explain: {
        ar: "typeof null يعيد object، وهو خطأ تاريخي في اللغة بقي للحفاظ على التوافق. لا يعني ذلك أن null كائن فعلي.",
        en: "typeof null returns object, a historical quirk kept for backward compatibility. It does not mean null is really an object."
      }
    },
    {
      question: { ar: "ما ناتج console.log(typeof NaN)؟", en: "What does console.log(typeof NaN) print?" },
      options: [
        { ar: "NaN", en: "NaN" },
        { ar: "number", en: "number" },
        { ar: "undefined", en: "undefined" },
        { ar: "error", en: "error" }
      ],
      correct: 1,
      explain: {
        ar: "NaN اختصار Not a Number لكنه قيمة من النوع number، ويظهر عند عمليات حسابية غير صالحة مثل 0 / 0. لذلك typeof يعيد number.",
        en: "NaN stands for Not a Number, yet it is a value of type number that appears from invalid math such as 0 / 0. So typeof returns number."
      }
    }
  ],
  "js-04": [
    {
      question: { ar: "ما ناتج console.log(5 + \"5\", 5 - \"5\")؟", en: "What does console.log(5 + \"5\", 5 - \"5\") print?" },
      options: [
        { ar: "10 و 0", en: "10 and 0" },
        { ar: "55 و 0", en: "55 and 0" },
        { ar: "55 و 55", en: "55 and 55" },
        { ar: "10 و NaN", en: "10 and NaN" }
      ],
      correct: 1,
      explain: {
        ar: "عند وجود نص مع + تُدمج القيم كنصوص فيصبح الناتج 55. أما - فتعمل على الأرقام فقط، فتحول النص إلى رقم والناتج 0.",
        en: "With a string, + concatenates, giving 55. The - operator only works on numbers, so it converts the string to a number and gives 0."
      }
    },
    {
      question: { ar: "ما ناتج console.log(0 || 10, 0 ?? 10)؟", en: "What does console.log(0 || 10, 0 ?? 10) print?" },
      options: [
        { ar: "10 و 10", en: "10 and 10" },
        { ar: "0 و 0", en: "0 and 0" },
        { ar: "0 و 10", en: "0 and 10" },
        { ar: "10 و 0", en: "10 and 0" }
      ],
      correct: 3,
      explain: {
        ar: "|| يتجاوز أي قيمة falsy ومنها 0 فيعيد 10. أما ?? فيتجاوز null و undefined فقط، فيبقى 0 كما هو.",
        en: "|| skips any falsy value including 0, so it returns 10. ?? only skips null and undefined, so 0 is kept."
      }
    }
  ],
  "js-05": [
    {
      question: { ar: "أي قيمة من التالية تُعتبر falsy في الشرط؟", en: "Which of these values is falsy in a condition?" },
      options: [
        { ar: "النص \"0\"", en: "The string \"0\"" },
        { ar: "المصفوفة الفارغة []", en: "The empty array []" },
        { ar: "الرقم 0", en: "The number 0" },
        { ar: "الكائن الفارغ {}", en: "The empty object {}" }
      ],
      correct: 2,
      explain: {
        ar: "القيم falsy هي false و 0 و \"\" و null و undefined و NaN. النص \"0\" والمصفوفة والكائن الفارغان كلها truthy لأنها ليست في تلك القائمة.",
        en: "The falsy values are false, 0, \"\", null, undefined and NaN. The string \"0\" and empty arrays or objects are truthy because they are not on that list."
      }
    },
    {
      question: { ar: "ماذا يطبع الكود؟ let n = 7; if (n === 7) { console.log(\"a\"); } else if (n === 7) { console.log(\"b\"); } else { console.log(\"c\"); }", en: "What does this code print? let n = 7; if (n === 7) { console.log(\"a\"); } else if (n === 7) { console.log(\"b\"); } else { console.log(\"c\"); }" },
      options: [
        { ar: "a فقط", en: "a only" },
        { ar: "a ثم b", en: "a then b" },
        { ar: "b فقط", en: "b only" },
        { ar: "c", en: "c" }
      ],
      correct: 0,
      explain: {
        ar: "تُفحص الشروط بالترتيب وعند أول شرط صحيح ينفذ بلوكه ويتوقف الباقي. لذلك لا يصل التنفيذ إلى else if رغم أن شرطه صحيح أيضاً.",
        en: "Conditions are checked in order, and the first true one runs while the rest are skipped. So else if is never reached even though its condition is also true."
      }
    }
  ],
  "js-06": [
    {
      question: { ar: "ماذا يطبع الكود؟ for (let i = 0; i !== 5; i++) { if (i === 2) continue; if (i === 4) break; console.log(i); }", en: "What does this code print? for (let i = 0; i !== 5; i++) { if (i === 2) continue; if (i === 4) break; console.log(i); }" },
      options: [
        { ar: "0 1 3", en: "0 1 3" },
        { ar: "0 1 2 3", en: "0 1 2 3" },
        { ar: "0 1", en: "0 1" },
        { ar: "0 1 3 4", en: "0 1 3 4" }
      ],
      correct: 0,
      explain: {
        ar: "continue يتخطى دورة i = 2 فقط، و break يوقف الحلقة بالكامل عند i = 4 قبل طباعته. لذلك المطبوع 0 و 1 و 3.",
        en: "continue skips only the i = 2 iteration, and break ends the whole loop at i = 4 before it is printed. So 0, 1 and 3 are printed."
      }
    },
    {
      question: { ar: "ما المشكلة في هذا الكود؟ let i = 0; while (i !== 3) { console.log(i); }", en: "What is the problem in this code? let i = 0; while (i !== 3) { console.log(i); }" },
      options: [
        { ar: "while لا تقبل الشرط !==", en: "while does not accept the !== condition" },
        { ar: "الحلقة لا تعمل أبداً لأن i يساوي 0", en: "The loop never runs because i equals 0" },
        { ar: "لا شيء يزيد i فتصبح الحلقة لا نهائية", en: "Nothing increases i, so the loop is infinite" },
        { ar: "يجب استخدام const بدل let", en: "const should be used instead of let" }
      ],
      correct: 2,
      explain: {
        ar: "الشرط i !== 3 يبقى صحيحاً دائماً لأن قيمة i لا تتغير داخل الحلقة. نحتاج مثلاً إلى i++ حتى تصل إلى 3 وتتوقف.",
        en: "The condition i !== 3 stays true forever because i never changes inside the loop. We need something like i++ so it reaches 3 and stops."
      }
    }
  ],
  "js-07": [
    {
      question: { ar: "ما ناتج console.log(typeof greet) إذا عُرّفت function greet() {}؟", en: "What does console.log(typeof greet) print if function greet() {} is defined?" },
      options: [
        { ar: "string", en: "string" },
        { ar: "undefined", en: "undefined" },
        { ar: "object", en: "object" },
        { ar: "function", en: "function" }
      ],
      correct: 3,
      explain: {
        ar: "كتابة greet دون أقواس تشير إلى الدالة نفسها كقيمة ولا تستدعيها، ونوعها function. الاستدعاء يتطلب الأقواس greet().",
        en: "Writing greet without parentheses refers to the function itself as a value and does not call it, and its type is function. Calling needs parentheses: greet()."
      }
    },
    {
      question: { ar: "ماذا يحدث؟ sayHi(); function sayHi() { console.log(\"Hi\"); }", en: "What happens? sayHi(); function sayHi() { console.log(\"Hi\"); }" },
      options: [
        { ar: "يطبع Hi لأن الدوال المعرّفة بـ function تُرفع كاملة", en: "It prints Hi because function declarations are hoisted completely" },
        { ar: "خطأ ReferenceError لأن الاستدعاء قبل التعريف", en: "A ReferenceError because the call comes before the definition" },
        { ar: "يطبع undefined", en: "It prints undefined" },
        { ar: "لا يطبع شيئاً ولا يحدث خطأ", en: "It prints nothing and raises no error" }
      ],
      correct: 0,
      explain: {
        ar: "تصريحات الدوال التقليدية تُرفع مع جسمها إلى أعلى النطاق، لذلك يمكن استدعاؤها قبل سطر تعريفها. هذا لا ينطبق على دالة مخزنة في const أو let.",
        en: "Function declarations are hoisted together with their body, so they can be called before their line. This does not apply to a function stored in const or let."
      }
    }
  ],
  "js-08": [
    {
      question: { ar: "ما ناتج الكود؟ function f(a, b = 2) { return a + b; } console.log(f(1), f(1, 5));", en: "What does this code print? function f(a, b = 2) { return a + b; } console.log(f(1), f(1, 5));" },
      options: [
        { ar: "NaN و 6", en: "NaN and 6" },
        { ar: "3 و 6", en: "3 and 6" },
        { ar: "3 و 3", en: "3 and 3" },
        { ar: "1 و 6", en: "1 and 6" }
      ],
      correct: 1,
      explain: {
        ar: "القيمة الافتراضية b = 2 تُستخدم فقط عند عدم تمرير argument، فيكون f(1) يساوي 3. عند تمرير 5 تحل محل الافتراضية فيكون الناتج 6.",
        en: "The default b = 2 is used only when no argument is passed, so f(1) is 3. Passing 5 replaces the default, giving 6."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ function show(a, b) { console.log(b); } show(1);", en: "What does this code print? function show(a, b) { console.log(b); } show(1);" },
      options: [
        { ar: "1", en: "1" },
        { ar: "خطأ لأن عدد arguments ناقص", en: "An error because an argument is missing" },
        { ar: "null", en: "null" },
        { ar: "undefined", en: "undefined" }
      ],
      correct: 3,
      explain: {
        ar: "JavaScript لا تشترط تطابق عدد arguments مع parameters، والـ parameter الذي لا يصله argument يكون undefined. لا يُرمى خطأ ولا تستخدم null.",
        en: "JavaScript does not require the number of arguments to match the parameters, and a parameter that receives no argument is undefined. No error is thrown and null is not used."
      }
    }
  ],
  "js-09": [
    {
      question: { ar: "ما ناتج الكود؟ function f(a) { a * 2; } console.log(f(4));", en: "What does this code print? function f(a) { a * 2; } console.log(f(4));" },
      options: [
        { ar: "8", en: "8" },
        { ar: "undefined", en: "undefined" },
        { ar: "4", en: "4" },
        { ar: "NaN", en: "NaN" }
      ],
      correct: 1,
      explain: {
        ar: "الدالة تحسب a * 2 لكنها لا تستخدم return، والدالة التي لا تعيد قيمة صراحة تعيد undefined. الحل أن نكتب return a * 2.",
        en: "The function computes a * 2 but has no return, and a function that does not return a value explicitly gives undefined. The fix is return a * 2."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ function g() { return 1; console.log(\"x\"); return 2; } console.log(g());", en: "What does this code print? function g() { return 1; console.log(\"x\"); return 2; } console.log(g());" },
      options: [
        { ar: "1 فقط", en: "1 only" },
        { ar: "x ثم 1", en: "x then 1" },
        { ar: "x ثم 2", en: "x then 2" },
        { ar: "2", en: "2" }
      ],
      correct: 0,
      explain: {
        ar: "return ينهي تنفيذ الدالة فوراً، فلا يصل التنفيذ إلى console.log ولا إلى return الثانية. لذلك يطبع 1 فقط.",
        en: "return ends the function immediately, so execution never reaches the console.log or the second return. Only 1 is printed."
      }
    }
  ],
  "js-10": [
    {
      question: { ar: "ما ناتج الكود؟ const f = () => { a: 1 }; console.log(f());", en: "What does this code print? const f = () => { a: 1 }; console.log(f());" },
      options: [
        { ar: "{ a: 1 }", en: "{ a: 1 }" },
        { ar: "1", en: "1" },
        { ar: "undefined", en: "undefined" },
        { ar: "خطأ في الصياغة", en: "A syntax error" }
      ],
      correct: 2,
      explain: {
        ar: "الأقواس المعقوفة بعد السهم تُفسَّر كجسم دالة وليست كائناً، و a: 1 تصبح label، ولا يوجد return. لإعادة كائن نضعه بين أقواس عادية: () => ({ a: 1 }).",
        en: "Curly braces after the arrow are read as a function body, not an object, and a: 1 becomes a label with no return. To return an object, wrap it in parentheses: () => ({ a: 1 })."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ const sq = n => n * n; console.log([1, 2, 3].map(sq));", en: "What does this code print? const sq = n => n * n; console.log([1, 2, 3].map(sq));" },
      options: [
        { ar: "[1, 4, 9]", en: "[1, 4, 9]" },
        { ar: "[1, 2, 3]", en: "[1, 2, 3]" },
        { ar: "14", en: "14" },
        { ar: "[2, 4, 6]", en: "[2, 4, 6]" }
      ],
      correct: 0,
      explain: {
        ar: "الدالة السهمية بدون أقواس معقوفة تعيد نتيجة التعبير تلقائياً، و map تطبقها على كل عنصر وتعيد مصفوفة جديدة بمربعاتها.",
        en: "An arrow function without curly braces returns the expression result automatically, and map applies it to each element and returns a new array of the squares."
      }
    }
  ],
  "js-11": [
    {
      question: { ar: "ما ناتج الكود؟ const a = [1, 2, 3]; a[5] = 9; console.log(a.length);", en: "What does this code print? const a = [1, 2, 3]; a[5] = 9; console.log(a.length);" },
      options: [
        { ar: "4", en: "4" },
        { ar: "3", en: "3" },
        { ar: "6", en: "6" },
        { ar: "5", en: "5" }
      ],
      correct: 2,
      explain: {
        ar: "length يساوي أكبر index زائد واحد، والإسناد إلى index 5 يجعل الطول 6 ويترك فجوات فارغة في المنتصف. لا يضيف العنصر في المكان التالي مباشرة.",
        en: "length is the highest index plus one, so assigning to index 5 makes it 6 and leaves empty gaps in between. The element is not placed in the next free slot."
      }
    },
    {
      question: { ar: "كيف نصل إلى آخر عنصر في المصفوفة arr مهما كان طولها؟", en: "How do you reach the last element of an array arr whatever its length?" },
      options: [
        { ar: "arr[arr.length]", en: "arr[arr.length]" },
        { ar: "arr[arr.length - 1]", en: "arr[arr.length - 1]" },
        { ar: "arr[-1]", en: "arr[-1]" },
        { ar: "arr.last", en: "arr.last" }
      ],
      correct: 1,
      explain: {
        ar: "الفهرسة تبدأ من 0 لذلك آخر index هو length ناقص واحد. arr[arr.length] يعطي undefined، و arr[-1] ليست index صالحاً في JavaScript، و last غير موجودة.",
        en: "Indexing starts at 0, so the last index is length minus one. arr[arr.length] gives undefined, arr[-1] is not a valid index in JavaScript, and last does not exist."
      }
    }
  ],
  "js-12": [
    {
      question: { ar: "ما ناتج الكود؟ const r = [1, 2, 3].forEach(n => n * 2); console.log(r);", en: "What does this code print? const r = [1, 2, 3].forEach(n => n * 2); console.log(r);" },
      options: [
        { ar: "[2, 4, 6]", en: "[2, 4, 6]" },
        { ar: "[1, 2, 3]", en: "[1, 2, 3]" },
        { ar: "undefined", en: "undefined" },
        { ar: "12", en: "12" }
      ],
      correct: 2,
      explain: {
        ar: "forEach تنفذ الدالة لكل عنصر لكنها تعيد undefined دائماً. إذا أردنا مصفوفة جديدة من النتائج نستخدم map.",
        en: "forEach runs the function for each element but always returns undefined. To get a new array of results, use map."
      }
    },
    {
      question: { ar: "ما ناتج console.log([10, 1, 5].sort())؟", en: "What does console.log([10, 1, 5].sort()) print?" },
      options: [
        { ar: "[1, 5, 10]", en: "[1, 5, 10]" },
        { ar: "[10, 5, 1]", en: "[10, 5, 1]" },
        { ar: "[1, 10, 5]", en: "[1, 10, 5]" },
        { ar: "[10, 1, 5]", en: "[10, 1, 5]" }
      ],
      correct: 2,
      explain: {
        ar: "sort بدون دالة مقارنة ترتب العناصر كنصوص، فيأتي \"10\" قبل \"5\" لأن الحرف 1 يسبق 5. للترتيب الرقمي نستخدم sort((a, b) => a - b).",
        en: "sort without a compare function orders elements as strings, so \"10\" comes before \"5\" because the character 1 comes before 5. For numeric order use sort((a, b) => a - b)."
      }
    }
  ],
  "js-13": [
    {
      question: { ar: "ما ناتج الكود؟ const u = { name: \"A\" }; const key = \"name\"; console.log(u.key, u[key]);", en: "What does this code print? const u = { name: \"A\" }; const key = \"name\"; console.log(u.key, u[key]);" },
      options: [
        { ar: "A و A", en: "A and A" },
        { ar: "undefined و A", en: "undefined and A" },
        { ar: "name و A", en: "name and A" },
        { ar: "A و undefined", en: "A and undefined" }
      ],
      correct: 1,
      explain: {
        ar: "الصيغة u.key تبحث عن خاصية اسمها key حرفياً فلا تجدها. الأقواس u[key] تقيّم المتغير أولاً فتصبح u[\"name\"].",
        en: "u.key looks for a property literally named key and does not find it. Brackets evaluate the variable first, so u[key] becomes u[\"name\"]."
      }
    },
    {
      question: { ar: "ماذا يطبع الكود؟ const u = { name: \"A\" }; console.log(u.age);", en: "What does this code print? const u = { name: \"A\" }; console.log(u.age);" },
      options: [
        { ar: "خطأ ReferenceError", en: "A ReferenceError" },
        { ar: "null", en: "null" },
        { ar: "0", en: "0" },
        { ar: "undefined", en: "undefined" }
      ],
      correct: 3,
      explain: {
        ar: "قراءة خاصية غير موجودة في كائن لا ترمي خطأ بل تعيد undefined. الخطأ يظهر فقط عند قراءة متغير غير معرّف أو عند الوصول إلى خاصية على undefined.",
        en: "Reading a missing property from an object does not throw; it returns undefined. An error appears only when reading an undeclared variable or accessing a property of undefined."
      }
    }
  ],
  "js-14": [
    {
      question: { ar: "ما ناتج الكود؟ const c = { count: 0, inc() { this.count++; } }; c.inc(); c.inc(); console.log(c.count);", en: "What does this code print? const c = { count: 0, inc() { this.count++; } }; c.inc(); c.inc(); console.log(c.count);" },
      options: [
        { ar: "0", en: "0" },
        { ar: "1", en: "1" },
        { ar: "2", en: "2" },
        { ar: "NaN", en: "NaN" }
      ],
      correct: 2,
      explain: {
        ar: "عند استدعاء c.inc() يشير this إلى الكائن c، فيزيد count في كل استدعاء. بعد استدعاءين تصبح القيمة 2.",
        en: "When c.inc() is called, this points to c, so count increases on every call. After two calls the value is 2."
      }
    },
    {
      question: { ar: "ما المشكلة؟ const c = { count: 0, inc() { count++; } }; c.inc();", en: "What is the problem? const c = { count: 0, inc() { count++; } }; c.inc();" },
      options: [
        { ar: "نسيان this فيبحث الكود عن متغير count منفصل غير موجود فيرمي ReferenceError", en: "this is missing, so the code looks for a separate count variable that does not exist and throws a ReferenceError" },
        { ar: "لا يمكن استخدام ++ داخل method", en: "++ cannot be used inside a method" },
        { ar: "لا يمكن تعريف method داخل كائن بهذه الصيغة", en: "A method cannot be defined inside an object this way" },
        { ar: "count خاصية للقراءة فقط", en: "count is a read-only property" }
      ],
      correct: 0,
      explain: {
        ar: "خصائص الكائن لا تصبح متغيرات داخل الـ method، ويجب الوصول إليها عبر this.count. بدون this يُبحث عن متغير count في النطاق فلا يوجد.",
        en: "Object properties do not become variables inside a method; they must be reached through this.count. Without this, a count variable is looked up in scope and does not exist."
      }
    }
  ],
  "js-15": [
    {
      question: { ar: "ماذا يحدث لملف HTML الأصلي عندما ينفذ JavaScript تعديلاً على عنصر في DOM؟", en: "What happens to the original HTML file when JavaScript modifies an element in the DOM?" },
      options: [
        { ar: "يتغير الملف على الخادم أيضاً", en: "The file on the server changes too" },
        { ar: "يتغير الملف المحفوظ على جهاز المستخدم", en: "The file saved on the user's device changes" },
        { ar: "يتغير ما يعرضه المتصفح في الذاكرة فقط، وعند إعادة التحميل يعود كما كان", en: "Only what the browser holds in memory changes, and a reload brings back the original" },
        { ar: "لا يتغير شيء لأن DOM للقراءة فقط", en: "Nothing changes because the DOM is read-only" }
      ],
      correct: 2,
      explain: {
        ar: "DOM تمثيل حي في ذاكرة المتصفح لبنية الصفحة، وتعديله يغير العرض فقط. ملف HTML على الخادم لا يتأثر، ولذلك تضيع التغييرات عند إعادة تحميل الصفحة ما لم تُحفظ بطريقة أخرى.",
        en: "The DOM is a live in-memory representation of the page, and changing it changes only the display. The HTML file on the server is untouched, so changes are lost on reload unless saved another way."
      }
    },
    {
      question: { ar: "أي كائن هو نقطة البداية للوصول إلى عناصر الصفحة من JavaScript؟", en: "Which object is the starting point for reaching page elements from JavaScript?" },
      options: [
        { ar: "window.html", en: "window.html" },
        { ar: "document", en: "document" },
        { ar: "console", en: "console" },
        { ar: "navigator", en: "navigator" }
      ],
      correct: 1,
      explain: {
        ar: "document يمثل الصفحة المحمّلة ويوفر طرق البحث عن العناصر مثل querySelector. console للتسجيل و navigator لمعلومات المتصفح، وليس لهما علاقة بعناصر الصفحة.",
        en: "document represents the loaded page and offers lookup methods such as querySelector. console is for logging and navigator holds browser information, so neither reaches page elements."
      }
    }
  ],
  "js-16": [
    {
      question: { ar: "ما الخطأ في هذا الكود؟ document.getElementById(\"#title\")", en: "What is wrong with this code? document.getElementById(\"#title\")" },
      options: [
        { ar: "لا شيء، فالعلامة # مطلوبة دائماً", en: "Nothing, the # sign is always required" },
        { ar: "getElementById تتطلب CSS Selector كاملاً", en: "getElementById requires a full CSS Selector" },
        { ar: "تعيد مصفوفة بدل عنصر", en: "It returns an array instead of an element" },
        { ar: "getElementById تأخذ الـ id فقط بدون #، لذلك تعيد null", en: "getElementById takes the id alone without #, so it returns null" }
      ],
      correct: 3,
      explain: {
        ar: "getElementById تبحث عن id مطابق نصاً، ولا يوجد id يبدأ بـ # فتعيد null. العلامة # تُستخدم مع querySelector فقط.",
        en: "getElementById looks for an id matching the text exactly, and no id starts with #, so it returns null. The # sign is used with querySelector."
      }
    },
    {
      question: { ar: "في الصفحة ثلاثة عناصر لها class باسم item. ماذا يعيد document.querySelectorAll(\".item\").length؟", en: "A page has three elements with the class item. What does document.querySelectorAll(\".item\").length return?" },
      options: [
        { ar: "3", en: "3" },
        { ar: "1", en: "1" },
        { ar: "undefined", en: "undefined" },
        { ar: "0", en: "0" }
      ],
      correct: 0,
      explain: {
        ar: "querySelectorAll تعيد NodeList بكل العناصر المطابقة، وله خاصية length فتكون 3. أما querySelector فتعيد أول عنصر مطابق فقط.",
        en: "querySelectorAll returns a NodeList of all matching elements, which has a length of 3. querySelector returns only the first match."
      }
    }
  ],
  "js-17": [
    {
      question: { ar: "تضع في textContent نصاً يحتوي على علامات HTML مثل عنصر b. كيف يظهر في الصفحة؟", en: "You assign to textContent a string containing HTML markup such as a b element. How does it appear on the page?" },
      options: [
        { ar: "كنص حرفي كما كُتب، فتظهر العلامات نفسها", en: "As literal text exactly as written, so the markup itself is visible" },
        { ar: "كنص بخط عريض", en: "As bold text" },
        { ar: "لا يظهر شيء", en: "Nothing appears" },
        { ar: "يرمي خطأ في الصياغة", en: "It throws a syntax error" }
      ],
      correct: 0,
      explain: {
        ar: "textContent يعامل القيمة كنص عادي ولا يحللها كـ HTML، لذلك تظهر العلامات كما هي. هذا يجعله أكثر أماناً عند عرض نصوص قادمة من المستخدم.",
        en: "textContent treats the value as plain text and does not parse it as HTML, so the markup shows as written. This makes it safer for displaying user-provided text."
      }
    },
    {
      question: { ar: "ما الخطأ في هذا الكود؟ document.querySelector(\"#msg\").textContent(\"Hi\");", en: "What is wrong with this code? document.querySelector(\"#msg\").textContent(\"Hi\");" },
      options: [
        { ar: "textContent خاصية وليست دالة، والصحيح textContent = \"Hi\"", en: "textContent is a property, not a function; the correct form is textContent = \"Hi\"" },
        { ar: "يجب استخدام getElementById فقط", en: "Only getElementById may be used" },
        { ar: "لا يمكن كتابة نص داخل عنصر", en: "Text cannot be written inside an element" },
        { ar: "علامة # ممنوعة في querySelector", en: "The # sign is not allowed in querySelector" }
      ],
      correct: 0,
      explain: {
        ar: "textContent خاصية نسندها بعلامة = ، واستدعاؤها بأقواس يرمي TypeError لأنها ليست دالة. علامة # صحيحة مع querySelector.",
        en: "textContent is a property assigned with =, and calling it with parentheses throws a TypeError because it is not a function. The # sign is correct with querySelector."
      }
    }
  ],
  "js-18": [
    {
      question: { ar: "ما الخطأ في هذا الكود؟ btn.addEventListener(\"click\", handle());", en: "What is wrong with this code? btn.addEventListener(\"click\", handle());" },
      options: [
        { ar: "اسم الحدث click خاطئ", en: "The event name click is wrong" },
        { ar: "handle() تُستدعى فوراً ويُمرَّر ناتجها، والصحيح تمرير handle بدون أقواس", en: "handle() is called immediately and its result is passed; the correct form passes handle without parentheses" },
        { ar: "addEventListener تقبل دوال سهمية فقط", en: "addEventListener accepts only arrow functions" },
        { ar: "لا يمكن ربط الحدث بزر", en: "An event cannot be attached to a button" }
      ],
      correct: 1,
      explain: {
        ar: "الأقواس تنفذ الدالة لحظة تسجيل المستمع، فيُمرَّر undefined بدل الدالة ولا تعمل عند الضغط. نمرر مرجع الدالة لينفذها المتصفح عند وقوع الحدث.",
        en: "The parentheses run the function at registration time, so undefined is passed instead of the function and nothing runs on click. Pass the function reference so the browser calls it when the event happens."
      }
    },
    {
      question: { ar: "سُجّل مستمعان لحدث click على الزر نفسه، الأول يطبع A والثاني يطبع B. ماذا يحدث عند الضغط؟", en: "Two click listeners are registered on the same button, the first printing A and the second printing B. What happens on a click?" },
      options: [
        { ar: "يطبع A فقط لأن الثاني يستبدله", en: "Only A is printed because the second replaces it" },
        { ar: "يطبع B فقط", en: "Only B is printed" },
        { ar: "يطبع A ثم B بترتيب التسجيل", en: "A then B is printed in registration order" },
        { ar: "يحدث خطأ لأن الحدث له مستمع واحد فقط", en: "An error occurs because an event allows only one listener" }
      ],
      correct: 2,
      explain: {
        ar: "addEventListener تضيف مستمعاً جديداً ولا تستبدل القديم، وتُنفذ المستمعات بترتيب إضافتها. الاستبدال يحدث مع الخاصية onclick فقط.",
        en: "addEventListener adds a new listener without replacing the old one, and listeners run in the order they were added. Replacement happens only with the onclick property."
      }
    }
  ],
  "js-19": [
    {
      question: { ar: "ما ناتج الكود؟ const [x, y = 5] = [1]; const { name, age = 30 } = { name: \"Z\" }; console.log(x, y, name, age);", en: "What does this code print? const [x, y = 5] = [1]; const { name, age = 30 } = { name: \"Z\" }; console.log(x, y, name, age);" },
      options: [
        { ar: "1 undefined Z undefined", en: "1 undefined Z undefined" },
        { ar: "1 5 Z 30", en: "1 5 Z 30" },
        { ar: "1 5 Z undefined", en: "1 5 Z undefined" },
        { ar: "خطأ لأن المصفوفة أقصر من المتغيرات", en: "An error because the array is shorter than the variables" }
      ],
      correct: 1,
      explain: {
        ar: "القيم الافتراضية في destructuring تُستخدم عندما تكون القيمة المقابلة undefined أو غير موجودة. لذلك y تصبح 5 و age تصبح 30.",
        en: "Defaults in destructuring are used when the matching value is undefined or missing. So y becomes 5 and age becomes 30."
      }
    },
    {
      question: { ar: "ما الذي تفعله هذه العبارة؟ [a, b] = [b, a];", en: "What does this statement do? [a, b] = [b, a];" },
      options: [
        { ar: "تنسخ a إلى b فقط", en: "It copies a into b only" },
        { ar: "تبدّل قيمتي المتغيرين دون متغير مؤقت", en: "It swaps the two variables without a temporary variable" },
        { ar: "ترمي خطأ لأن المصفوفة لا تُسند", en: "It throws because an array cannot be assigned" },
        { ar: "تنشئ مصفوفة جديدة فقط دون تغيير المتغيرات", en: "It only creates a new array without changing the variables" }
      ],
      correct: 1,
      explain: {
        ar: "الطرف الأيمن يبني مصفوفة بالقيم الحالية أولاً، ثم يفككها destructuring إلى a و b بالترتيب المعكوس. هكذا يتم التبديل دون متغير ثالث.",
        en: "The right side first builds an array of the current values, then destructuring assigns them back to a and b in swapped order. That swaps them without a third variable."
      }
    }
  ],
  "js-20": [
    {
      question: { ar: "ما ناتج الكود؟ const a = { x: { n: 1 } }; const b = { ...a }; b.x.n = 2; console.log(a.x.n);", en: "What does this code print? const a = { x: { n: 1 } }; const b = { ...a }; b.x.n = 2; console.log(a.x.n);" },
      options: [
        { ar: "1", en: "1" },
        { ar: "2", en: "2" },
        { ar: "undefined", en: "undefined" },
        { ar: "خطأ", en: "An error" }
      ],
      correct: 1,
      explain: {
        ar: "الـ spread ينسخ نسخة سطحية فقط، فالكائن الداخلي x يبقى مشتركاً بين a و b. تغيير b.x.n يظهر في a.x.n، وللنسخ العميق نستخدم structuredClone.",
        en: "Spread makes only a shallow copy, so the inner object x is shared between a and b. Changing b.x.n shows up in a.x.n; use structuredClone for a deep copy."
      }
    },
    {
      question: { ar: "ما ناتج الكود؟ function f(first, ...rest) { return rest; } console.log(f(1, 2, 3));", en: "What does this code print? function f(first, ...rest) { return rest; } console.log(f(1, 2, 3));" },
      options: [
        { ar: "[1, 2, 3]", en: "[1, 2, 3]" },
        { ar: "[1]", en: "[1]" },
        { ar: "[2, 3]", en: "[2, 3]" },
        { ar: "3", en: "3" }
      ],
      correct: 2,
      explain: {
        ar: "first تأخذ الـ argument الأول، و ...rest تجمع بقية الـ arguments في مصفوفة حقيقية هي [2, 3]. الـ rest يجب أن يكون آخر parameter.",
        en: "first takes the first argument, and ...rest gathers the remaining arguments into a real array, [2, 3]. The rest parameter must be last."
      }
    }
  ],
  "js-21": [
    {
      question: { ar: "الملف يحتوي export default add;. أي استيراد صحيح؟", en: "The file contains export default add;. Which import is correct?" },
      options: [
        { ar: "import { add } from \"./math.js\";", en: "import { add } from \"./math.js\";" },
        { ar: "import add from \"./math.js\";", en: "import add from \"./math.js\";" },
        { ar: "import * add from \"./math.js\";", en: "import * add from \"./math.js\";" },
        { ar: "require add from \"./math.js\";", en: "require add from \"./math.js\";" }
      ],
      correct: 1,
      explain: {
        ar: "الـ default export يُستورد دون أقواس معقوفة وباسم نختاره. الأقواس المعقوفة مخصصة للتصدير المسمى named export.",
        en: "A default export is imported without braces under any name you choose. Braces are for named exports."
      }
    },
    {
      question: { ar: "عرّفنا const secret = 1 في ملف module دون export. هل يمكن لملف آخر قراءتها؟", en: "We declared const secret = 1 in a module file without export. Can another file read it?" },
      options: [
        { ar: "نعم، لأنها متغير عام", en: "Yes, because it is a global variable" },
        { ar: "نعم إذا كتبنا import secret فقط", en: "Yes, if we just write import secret" },
        { ar: "نعم لكن للقراءة فقط", en: "Yes, but read-only" },
        { ar: "لا، فكل ما في الـ module خاص به إلا ما يُصدَّر بـ export", en: "No, everything in a module is private unless exported with export" }
      ],
      correct: 3,
      explain: {
        ar: "للـ module نطاق خاص به، فلا تتسرب متغيراته إلى النطاق العام. لا يراه غيره إلا بالتصدير الصريح، وهذه إحدى فوائد الـ modules.",
        en: "A module has its own scope, so its variables do not leak into the global scope. Others can see only what is explicitly exported, which is a key benefit of modules."
      }
    }
  ],
  "js-22": [
    {
      question: { ar: "ما ترتيب الطباعة؟ console.log(1); setTimeout(() => console.log(2), 0); console.log(3);", en: "What is the print order? console.log(1); setTimeout(() => console.log(2), 0); console.log(3);" },
      options: [
        { ar: "1 ثم 2 ثم 3", en: "1, 2, 3" },
        { ar: "2 ثم 1 ثم 3", en: "2, 1, 3" },
        { ar: "1 ثم 3 ثم 2", en: "1, 3, 2" },
        { ar: "3 ثم 2 ثم 1", en: "3, 2, 1" }
      ],
      correct: 2,
      explain: {
        ar: "دالة setTimeout تؤجل callback حتى ينتهي الكود المتزامن حتى لو كان التأخير صفراً. لذلك تُطبع 1 و 3 أولاً ثم 2.",
        en: "setTimeout defers its callback until the synchronous code finishes, even with a delay of zero. So 1 and 3 print first, then 2."
      }
    },
    {
      question: { ar: "جُدول setTimeout بتأخير 100ms ثم setTimeout بتأخير 0ms. أيهما يُنفَّذ أولاً؟", en: "A setTimeout with a 100ms delay is scheduled, then one with a 0ms delay. Which runs first?" },
      options: [
        { ar: "الأول لأنه جُدول أولاً", en: "The first, because it was scheduled first" },
        { ar: "الثاني لأن مدة انتظاره أقصر", en: "The second, because its wait is shorter" },
        { ar: "يعملان معاً في اللحظة نفسها", en: "They run together at the same moment" },
        { ar: "يتوقف البرنامج 100ms ثم يعمل الاثنان", en: "The program pauses 100ms then both run" }
      ],
      correct: 1,
      explain: {
        ar: "الترتيب يحدده زمن انتهاء المؤقت وليس ترتيب الكتابة، والانتظار لا يوقف بقية البرنامج. لذلك ينفذ المؤقت ذو 0ms أولاً.",
        en: "Order is decided by when each timer expires, not by the order written, and waiting does not block the rest of the program. So the 0ms timer runs first."
      }
    }
  ],
  "js-23": [
    {
      question: { ar: "ما ناتج الكود؟ Promise.resolve(1).then(v => v + 1).then(v => console.log(v));", en: "What does this code print? Promise.resolve(1).then(v => v + 1).then(v => console.log(v));" },
      options: [
        { ar: "1", en: "1" },
        { ar: "2", en: "2" },
        { ar: "undefined", en: "undefined" },
        { ar: "Promise", en: "Promise" }
      ],
      correct: 1,
      explain: {
        ar: "قيمة return من then الأولى تصبح قيمة الـ promise التالي، فتصل 2 إلى then الثانية. هذا هو سلسلة then.",
        en: "The value returned from the first then becomes the value of the next promise, so 2 reaches the second then. That is promise chaining."
      }
    },
    {
      question: { ar: "ماذا يطبع الكود؟ Promise.reject(\"x\").then(() => console.log(\"ok\")).catch(e => console.log(\"caught\", e));", en: "What does this code print? Promise.reject(\"x\").then(() => console.log(\"ok\")).catch(e => console.log(\"caught\", e));" },
      options: [
        { ar: "ok", en: "ok" },
        { ar: "caught x", en: "caught x" },
        { ar: "ok ثم caught x", en: "ok then caught x" },
        { ar: "لا شيء ويظهر خطأ غير معالج", en: "Nothing, with an unhandled error" }
      ],
      correct: 1,
      explain: {
        ar: "الـ promise مرفوض لذلك تُتخطى then وينتقل الرفض إلى أقرب catch في السلسلة. فيطبع caught x فقط.",
        en: "The promise is rejected, so then is skipped and the rejection travels down to the nearest catch in the chain. Only caught x is printed."
      }
    }
  ],
  "js-24": [
    {
      question: { ar: "ما المشكلة في هذا الكود؟ const data = fetch(url).json();", en: "What is the problem in this code? const data = fetch(url).json();" },
      options: [
        { ar: "fetch تعيد promise لا يملك json()، والصحيح انتظار fetch ثم استدعاء json() على response", en: "fetch returns a promise that has no json(); you must await fetch and then call json() on the response" },
        { ar: "json() تعمل مع POST فقط", en: "json() works only with POST" },
        { ar: "يجب إضافة new قبل fetch", en: "new must be added before fetch" },
        { ar: "url يجب أن يكون كائناً وليس نصاً", en: "url must be an object, not a string" }
      ],
      correct: 0,
      explain: {
        ar: "fetch تعيد Promise وليس response مباشرة، ولذلك استدعاء json() عليه يرمي TypeError. نكتب const res = await fetch(url); const data = await res.json().",
        en: "fetch returns a Promise, not the response itself, so calling json() on it throws a TypeError. Write const res = await fetch(url); const data = await res.json()."
      }
    },
    {
      question: { ar: "يعيد الخادم الحالة 404 عند طلب fetch. ماذا يحدث للـ promise؟", en: "The server answers a fetch request with status 404. What happens to the promise?" },
      options: [
        { ar: "يُرفض ويذهب إلى catch تلقائياً", en: "It rejects and goes to catch automatically" },
        { ar: "يتحقق عادة ونفحص response.ok لاكتشاف الخطأ", en: "It fulfills normally and we check response.ok to detect the error" },
        { ar: "يبقى معلقاً pending إلى الأبد", en: "It stays pending forever" },
        { ar: "تعاد المحاولة تلقائياً", en: "The request is retried automatically" }
      ],
      correct: 1,
      explain: {
        ar: "fetch ترفض الـ promise فقط عند فشل الشبكة نفسها، أما حالات HTTP مثل 404 و 500 فتصل كـ response عادي. لذلك نفحص response.ok أو status ونرمي الخطأ بأنفسنا.",
        en: "fetch rejects only on a network failure; HTTP statuses such as 404 and 500 arrive as a normal response. So we check response.ok or status and throw the error ourselves."
      }
    }
  ],
  "js-25": [
    {
      question: { ar: "ماذا يطبع الكود؟ try { JSON.parse(\"{bad\"); } catch (e) { console.log(\"err\"); } finally { console.log(\"done\"); }", en: "What does this code print? try { JSON.parse(\"{bad\"); } catch (e) { console.log(\"err\"); } finally { console.log(\"done\"); }" },
      options: [
        { ar: "done فقط", en: "done only" },
        { ar: "err فقط", en: "err only" },
        { ar: "done ثم err", en: "done then err" },
        { ar: "err ثم done", en: "err then done" }
      ],
      correct: 3,
      explain: {
        ar: "JSON.parse يرمي خطأً لأن النص غير صالح، فينفذ catch ثم يعمل finally دائماً في النهاية. الترتيب إذاً err ثم done.",
        en: "JSON.parse throws because the text is invalid, so catch runs and then finally always runs last. The order is err then done."
      }
    },
    {
      question: { ar: "ماذا يطبع الكود؟ function f() { try { return 1; } finally { console.log(\"f\"); } } console.log(f());", en: "What does this code print? function f() { try { return 1; } finally { console.log(\"f\"); } } console.log(f());" },
      options: [
        { ar: "1 فقط", en: "1 only" },
        { ar: "f ثم 1", en: "f then 1" },
        { ar: "1 ثم f", en: "1 then f" },
        { ar: "f فقط", en: "f only" }
      ],
      correct: 1,
      explain: {
        ar: "finally تعمل حتى مع وجود return داخل try، وتنفذ قبل أن تغادر الدالة. لذلك يطبع f أولاً ثم تُطبع القيمة المعادة 1.",
        en: "finally runs even when try contains a return, and it runs before the function actually exits. So f is printed first and then the returned 1."
      }
    }
  ]
};
