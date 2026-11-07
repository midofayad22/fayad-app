// Programming Fundamentals — deep learning layer for the "core building blocks" lessons (prg-07 .. prg-11).
// Additive to the migrated lesson data: it never changes the original fields (the legacy parity tests still hold), it only adds
//   deep       extra reading shown after the original lesson body
//   quiz[0].explain, quizMore   more questions, each with an explanation shown right after the answer
//   exercise   a coding task checked automatically in the sandbox (learner code + `test`; the test prints __OK or __FB:<n>)
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (s) => `<pre class="fd-code" dir="ltr"><code>${esc(s)}</code></pre>`;
const sec = (h, ...parts) => `<section class="lesson-section"><h3>${h}</h3>${parts.join("")}</section>`;
const note = (s) => `<p class="fd-note">${s}</p>`;
const Q = (qa, qe, opts, correct, xa, xe) => ({ question: { ar: qa, en: qe }, options: opts.map(([a, e]) => ({ ar: a, en: e ?? a })), correct, explain: { ar: xa, en: xe } });

export const DEEP = {
  "prg-07": {
    deep: {
      ar:
        sec("اختيار الاسم: القواعد والعُرف",
          "<p>اسم المتغير يجب أن يبدأ بحرف أو <span class=\"term\">_</span> أو <span class=\"term\">$</span>، ولا يحتوي مسافات أو شرطات، وحالة الأحرف مهمة: <span class=\"term\">score</span> غير <span class=\"term\">Score</span>. العُرف في JavaScript هو <span class=\"term\">camelCase</span>.</p>",
          code("let userName = \"Sara\";   // جيد: يصف المحتوى\nlet x1 = \"Sara\";         // صالح لكنه لا يعبّر\nlet user-name = 1;       // خطأ: الشرطة عامل طرح\nlet 2score = 5;          // خطأ: لا يبدأ برقم"),
          note("الاسم الجيد يوفّر عليك تعليقًا كاملًا: <strong>remainingLives</strong> أوضح من <strong>r</strong>.")) +
        sec("let أم const؟ قاعدة عملية",
          "<p>ابدأ دائمًا بـ <span class=\"term\">const</span>. حوّلها إلى <span class=\"term\">let</span> فقط إذا احتجت فعلًا إلى إعادة الإسناد. هذا يمنعك من تغيير قيمة بالخطأ، ويُعلِم من يقرأ الكود بما يتغير وما لا يتغير.</p>",
          code("const pi = 3.14159;   // لن تتغير\nlet lives = 3;          // ستتغير أثناء اللعبة\nlives = lives - 1;      // مسموح\npi = 3;                 // TypeError: Assignment to constant variable.")) +
        sec("الإسناد ليس مساواة رياضية",
          "<p>علامة <span class=\"term\">=</span> تعني: «احسب الطرف الأيمن ثم خزّن النتيجة في الاسم الذي على اليسار». لذلك <span class=\"term\">x = x + 1</span> سطر منطقي: خذ القيمة الحالية، أضف 1، واحفظها مجددًا.</p>",
          code("let count = 5;\ncount = count + 1;   // 6\ncount += 1;          // اختصار: 7\nconsole.log(count);  // 7")),
      en:
        sec("Choosing a name: rules and convention",
          "<p>A variable name must start with a letter, <span class=\"term\">_</span> or <span class=\"term\">$</span>, and cannot contain spaces or hyphens. Case matters: <span class=\"term\">score</span> is not <span class=\"term\">Score</span>. The JavaScript convention is <span class=\"term\">camelCase</span>.</p>",
          code("let userName = \"Sara\";   // good: describes the content\nlet x1 = \"Sara\";         // valid but says nothing\nlet user-name = 1;       // error: the hyphen is the minus operator\nlet 2score = 5;          // error: cannot start with a digit"),
          note("A good name saves a whole comment: <strong>remainingLives</strong> is clearer than <strong>r</strong>.")) +
        sec("let or const? A practical rule",
          "<p>Always start with <span class=\"term\">const</span>. Switch to <span class=\"term\">let</span> only when you really need to reassign. This stops accidental changes and tells the reader what can and cannot change.</p>",
          code("const pi = 3.14159;   // will not change\nlet lives = 3;          // changes during the game\nlives = lives - 1;      // allowed\npi = 3;                 // TypeError: Assignment to constant variable.")) +
        sec("Assignment is not mathematical equality",
          "<p>The <span class=\"term\">=</span> sign means: “calculate the right side, then store the result under the name on the left”. That is why <span class=\"term\">x = x + 1</span> is a sensible line: take the current value, add 1, and save it again.</p>",
          code("let count = 5;\ncount = count + 1;   // 6\ncount += 1;          // shorthand: 7\nconsole.log(count);  // 7")),
    },
    explain0: { ar: "let تسمح بإعادة إسناد قيمة جديدة لنفس الاسم، أما const فتثبّت الإسناد. fixed و change ليستا كلمتين محجوزتين في JavaScript.", en: "let allows assigning a new value to the same name, while const fixes the assignment. fixed and change are not JavaScript keywords." },
    quizMore: [
      Q("ماذا يحدث عند تنفيذ الكود: const a = 1; a = 2;", "What happens when this code runs: const a = 1; a = 2;", [["يطبع 2", "It prints 2"], ["يظهر خطأ TypeError", "A TypeError is thrown"], ["يبقى a يساوي 1 دون أي خطأ", "a stays 1 with no error"], ["لا شيء، السطر يُتجاهل", "Nothing, the line is ignored"]], 1,
        "المتغير المعرّف بـ const لا يقبل إعادة الإسناد، فتتوقف JavaScript وتُظهر: Assignment to constant variable.", "A const binding cannot be reassigned, so JavaScript stops with: Assignment to constant variable."),
      Q("أي اسم متغير صالح ويتبع العُرف المتبع؟", "Which variable name is valid and follows the usual convention?", [["2score"], ["user-name"], ["userName"], ["let"]], 2,
        "userName صالح ومكتوب بنمط camelCase. 2score يبدأ برقم، وuser-name فيه شرطة تُفهم كعامل طرح، وlet كلمة محجوزة.", "userName is valid and written in camelCase. 2score starts with a digit, user-name contains a hyphen read as minus, and let is a reserved word."),
      Q("ما قيمة x بعد: let x = 5; x = x + 3;", "What is x after: let x = 5; x = x + 3;", [["5"], ["3"], ["8"], ["53"]], 2,
        "يُحسب الطرف الأيمن أولًا (5 + 3 = 8) ثم تُخزَّن النتيجة في x.", "The right side is evaluated first (5 + 3 = 8), then the result is stored in x."),
    ],
    exercise: {
      prompt: { ar: "أنشئ متغيرًا باسم name يحتوي اسمك (نص) ومتغيرًا باسم age يحتوي عمرك (رقم)، ثم اطبع الاثنين بـ console.log.", en: "Create a variable named name that holds your name (a string) and a variable named age that holds your age (a number), then print both with console.log." },
      starter: "// your solution here\n",
      must: [{ re: "console\\.log", msg: { ar: "استخدم console.log لطباعة القيمتين.", en: "Use console.log to print both values." } }],
      test: "if (typeof name !== 'string' || name.trim() === '') console.log('__FB:0'); else if (typeof age !== 'number' || Number.isNaN(age)) console.log('__FB:1'); else console.log('__OK');",
      feedback: [{ ar: "name يجب أن يكون نصًا غير فارغ بين علامتي اقتباس.", en: "name must be a non-empty string inside quotes." }, { ar: "age يجب أن يكون رقمًا بدون علامات اقتباس.", en: "age must be a number without quotes." }],
      hint: { ar: "النص يُكتب بين علامتي اقتباس، والرقم يُكتب كما هو: const age = 20;", en: "A string goes inside quotes, a number is written as is: const age = 20;" },
      solution: "const name = \"Sara\";\nconst age = 20;\nconsole.log(name);\nconsole.log(age);",
    },
  },

  "prg-08": {
    deep: {
      ar:
        sec("الأنواع الأساسية",
          "<div class=\"info-grid\"><div class=\"info-box\"><h4>String</h4><p>نص بين علامتي اقتباس: <span class=\"term\">\"مرحبا\"</span></p></div><div class=\"info-box\"><h4>Number</h4><p>أعداد صحيحة وعشرية: <span class=\"term\">42</span> و<span class=\"term\">3.14</span></p></div><div class=\"info-box\"><h4>Boolean</h4><p>قيمتان فقط: <span class=\"term\">true</span> و<span class=\"term\">false</span></p></div><div class=\"info-box\"><h4>undefined / null</h4><p>undefined: لم تُعطَ قيمة بعد. null: «لا شيء» نختاره نحن عمدًا.</p></div></div>") +
        sec("النوع يحدد السلوك",
          "<p>العامل <span class=\"term\">+</span> يجمع الأرقام لكنه يدمج النصوص. لذلك فهم النوع يفسّر نتائج تبدو غريبة:</p>",
          code("console.log(5 + 2);      // 7   (أرقام)\nconsole.log(\"5\" + 2);    // \"52\" (نص + رقم: دمج)\nconsole.log(\"5\" * 2);    // 10  (* لا يدمج، فيحوّل النص لرقم)\nconsole.log(typeof \"5\"); // \"string\""),
          note("القيمة التي تأتي من مربع إدخال أو من ملف تكون <strong>نصًا</strong> دائمًا حتى لو بدت رقمًا. حوّلها بـ <span class=\"term\">Number(\"20\")</span> قبل الحساب.")) +
        sec("الكسور العشرية",
          "<p>الحاسوب يخزّن الأعداد العشرية بالنظام الثنائي، لذا قد تظهر فروق صغيرة:</p>",
          code("console.log(0.1 + 0.2);            // 0.30000000000000004\nconsole.log((0.1 + 0.2).toFixed(2)); // \"0.30\" (للعرض فقط)")),
      en:
        sec("The basic types",
          "<div class=\"info-grid\"><div class=\"info-box\"><h4>String</h4><p>Text inside quotes: <span class=\"term\">\"hello\"</span></p></div><div class=\"info-box\"><h4>Number</h4><p>Whole and decimal numbers: <span class=\"term\">42</span> and <span class=\"term\">3.14</span></p></div><div class=\"info-box\"><h4>Boolean</h4><p>Only two values: <span class=\"term\">true</span> and <span class=\"term\">false</span></p></div><div class=\"info-box\"><h4>undefined / null</h4><p>undefined: no value has been given yet. null: “nothing”, chosen on purpose.</p></div></div>") +
        sec("The type decides the behaviour",
          "<p>The <span class=\"term\">+</span> operator adds numbers but joins strings. Understanding the type explains results that look strange:</p>",
          code("console.log(5 + 2);      // 7   (numbers)\nconsole.log(\"5\" + 2);    // \"52\" (string + number: joined)\nconsole.log(\"5\" * 2);    // 10  (* cannot join, so the string becomes a number)\nconsole.log(typeof \"5\"); // \"string\""),
          note("A value that comes from an input box or a file is <strong>always a string</strong>, even if it looks like a number. Convert it with <span class=\"term\">Number(\"20\")</span> before calculating.")) +
        sec("Decimal fractions",
          "<p>Computers store decimals in binary, so tiny differences can appear:</p>",
          code("console.log(0.1 + 0.2);            // 0.30000000000000004\nconsole.log((0.1 + 0.2).toFixed(2)); // \"0.30\" (for display only)")),
    },
    explain0: { ar: "النوع Boolean يحمل إحدى قيمتين فقط: true أو false، وهو الأساس في اتخاذ القرارات داخل الشروط.", en: "The Boolean type holds exactly one of two values, true or false, and it is the basis of decisions inside conditions." },
    quizMore: [
      Q("ما ناتج: \"5\" + 2", "What is the result of: \"5\" + 2", [["7"], ["\"52\""], ["Error"], ["NaN"]], 1,
        "عندما يكون أحد طرفي + نصًا، تدمج JavaScript القيمتين كنصين فتصبح النتيجة \"52\".", "When one side of + is a string, JavaScript joins the values as text, so the result is \"52\"."),
      Q("ماذا يطبع: console.log(typeof 42)", "What does console.log(typeof 42) print?", [["\"number\""], ["\"integer\""], ["\"string\""], ["42"]], 0,
        "typeof يُرجع اسم النوع كنص. كل الأعداد، صحيحة أو عشرية، من النوع number.", "typeof returns the type name as a string. All numbers, whole or decimal, have the type number."),
      Q("المتغير let city; لم نعطه قيمة. ما قيمته؟", "The variable let city; was given no value. What is its value?", [["null"], ["0"], ["undefined"], ["\"\""]], 2,
        "المتغير الذي يُعرَّف دون قيمة يحمل القيمة undefined تلقائيًا. أما null فنكتبه نحن عمدًا.", "A variable declared without a value automatically holds undefined. null is something we write on purpose."),
    ],
    exercise: {
      prompt: { ar: "المتغير price يحتوي النص \"20\". أنشئ متغيرًا باسم total يساوي price بعد تحويله إلى رقم ثم ضربه في 2.", en: "The variable price holds the string \"20\". Create a variable named total equal to price converted to a number and multiplied by 2." },
      starter: "const price = \"20\";\n// create total here\n",
      must: [{ re: "Number\\s*\\(|parseInt\\s*\\(|parseFloat\\s*\\(|\\+\\s*price|\\*\\s*1|Number\\.parse", msg: { ar: "حوّل price إلى رقم أولًا (مثل Number(price)).", en: "Convert price to a number first (for example Number(price))." } }],
      test: "if (typeof total !== 'number') console.log('__FB:0'); else if (total !== 40) console.log('__FB:1'); else console.log('__OK');",
      feedback: [{ ar: "total يجب أن يكون رقمًا. هل تركته نصًا؟", en: "total must be a number. Did you leave it as a string?" }, { ar: "القيمة ليست 40. راجع العملية: 20 × 2.", en: "The value is not 40. Check the operation: 20 × 2." }],
      hint: { ar: "Number(price) يحوّل النص إلى رقم، ثم اضرب النتيجة في 2.", en: "Number(price) converts the string to a number; then multiply the result by 2." },
      solution: "const price = \"20\";\nconst total = Number(price) * 2;\nconsole.log(total); // 40",
    },
  },

  "prg-09": {
    deep: {
      ar:
        sec("عوامل الحساب",
          "<p>الجمع <span class=\"term\">+</span>، الطرح <span class=\"term\">-</span>، الضرب <span class=\"term\">*</span>، القسمة <span class=\"term\">/</span>، وباقي القسمة <span class=\"term\">%</span> (Modulus) وهو مفيد لمعرفة الزوجي والفردي.</p>",
          code("console.log(10 % 3);  // 1  (10 = 3×3 + 1)\nconsole.log(14 % 2);  // 0  -> العدد زوجي\nconsole.log(2 + 3 * 4); // 14 (الضرب أولًا)\nconsole.log((2 + 3) * 4); // 20 (الأقواس أولًا)")) +
        sec("عوامل المقارنة تُنتج Boolean",
          "<p>كل مقارنة تُرجع <span class=\"term\">true</span> أو <span class=\"term\">false</span>. استخدم دائمًا المساواة الصارمة <span class=\"term\">===</span> لأنها تقارن القيمة والنوع معًا.</p>",
          code("console.log(5 === 5);    // true\nconsole.log(5 === \"5\");  // false (النوع مختلف)\nconsole.log(5 == \"5\");   // true  (== يحوّل النوع: تجنّبه)\nconsole.log(7 >= 7);     // true\nconsole.log(3 !== 4);    // true")) +
        sec("العوامل المنطقية",
          "<p><span class=\"term\">&&</span> (و): صحيحة إذا تحقق الشرطان. <span class=\"term\">||</span> (أو): صحيحة إذا تحقق أحدهما. <span class=\"term\">!</span> (ليس): تعكس القيمة.</p>",
          code("const age = 20, hasId = true;\nconsole.log(age >= 18 && hasId);  // true\nconsole.log(age < 18 || hasId);   // true\nconsole.log(!hasId);              // false")),
      en:
        sec("Arithmetic operators",
          "<p>Addition <span class=\"term\">+</span>, subtraction <span class=\"term\">-</span>, multiplication <span class=\"term\">*</span>, division <span class=\"term\">/</span>, and the remainder <span class=\"term\">%</span> (modulus), which is handy for telling even from odd.</p>",
          code("console.log(10 % 3);  // 1  (10 = 3×3 + 1)\nconsole.log(14 % 2);  // 0  -> the number is even\nconsole.log(2 + 3 * 4); // 14 (multiplication first)\nconsole.log((2 + 3) * 4); // 20 (parentheses first)")) +
        sec("Comparison operators produce a Boolean",
          "<p>Every comparison returns <span class=\"term\">true</span> or <span class=\"term\">false</span>. Always prefer strict equality <span class=\"term\">===</span>, which compares value and type together.</p>",
          code("console.log(5 === 5);    // true\nconsole.log(5 === \"5\");  // false (different type)\nconsole.log(5 == \"5\");   // true  (== converts the type: avoid it)\nconsole.log(7 >= 7);     // true\nconsole.log(3 !== 4);    // true")) +
        sec("Logical operators",
          "<p><span class=\"term\">&&</span> (and): true when both conditions hold. <span class=\"term\">||</span> (or): true when at least one holds. <span class=\"term\">!</span> (not): flips the value.</p>",
          code("const age = 20, hasId = true;\nconsole.log(age >= 18 && hasId);  // true\nconsole.log(age < 18 || hasId);   // true\nconsole.log(!hasId);              // false")),
    },
    explain0: { ar: "10 + 5 بين رقمين فتُجمع القيمتان وتكون النتيجة 15. النتيجة 105 كانت ستظهر لو كان أحد الطرفين نصًا.", en: "10 + 5 is between two numbers, so they are added and the result is 15. 105 would appear only if one side were a string." },
    quizMore: [
      Q("ما ناتج 10 % 3؟", "What is 10 % 3?", [["3"], ["1"], ["0"], ["3.33"]], 1,
        "% يُرجع باقي القسمة: 10 ÷ 3 = 3 والباقي 1.", "% returns the remainder: 10 ÷ 3 = 3 with remainder 1."),
      Q("ما ناتج 5 === \"5\"؟", "What is the result of 5 === \"5\"?", [["true"], ["false"], ["Error"], ["undefined"]], 1,
        "=== تقارن القيمة والنوع. الأول number والثاني string، لذا النتيجة false.", "=== compares value and type. The first is a number and the second a string, so the result is false."),
      Q("ما ناتج: true && false", "What is true && false?", [["true"], ["false"], ["null"], ["1"]], 1,
        "&& لا تُرجع true إلا إذا كان الطرفان true. هنا الطرف الثاني false.", "&& is true only when both sides are true. Here the second side is false."),
    ],
    exercise: {
      prompt: { ar: "المتغير n = 14. أنشئ متغيرًا باسم isEven قيمته true إذا كان n زوجيًا، مستخدمًا عامل باقي القسمة %.", en: "The variable n = 14. Create a variable named isEven that is true when n is even, using the remainder operator %." },
      starter: "const n = 14;\n// create isEven here\n",
      must: [{ re: "%", msg: { ar: "استخدم عامل باقي القسمة % لاختبار الزوجية.", en: "Use the remainder operator % to test evenness." } }],
      test: "if (typeof isEven !== 'boolean') console.log('__FB:0'); else if (isEven !== true) console.log('__FB:1'); else console.log('__OK');",
      feedback: [{ ar: "isEven يجب أن تكون قيمة منطقية (true أو false) ناتجة عن مقارنة.", en: "isEven must be a Boolean (true or false) produced by a comparison." }, { ar: "14 عدد زوجي، فيجب أن تكون النتيجة true. راجع شرط المقارنة.", en: "14 is even, so the result must be true. Check your comparison." }],
      hint: { ar: "العدد زوجي إذا كان باقي قسمته على 2 يساوي 0: n % 2 === 0", en: "A number is even when its remainder when divided by 2 is 0: n % 2 === 0" },
      solution: "const n = 14;\nconst isEven = n % 2 === 0;\nconsole.log(isEven); // true",
    },
  },

  "prg-10": {
    deep: {
      ar:
        sec("القرار خطوة بخطوة",
          "<p>جملة <span class=\"term\">if</span> تنفّذ الكتلة التي بين الأقواس المعقوفة فقط إذا كان الشرط <span class=\"term\">true</span>. ويمكن إضافة <span class=\"term\">else if</span> لشروط أخرى و<span class=\"term\">else</span> لما عداها. تُفحص الشروط بالترتيب وتُنفَّذ أول كتلة صحيحة فقط.</p>",
          code("const score = 72;\n\nif (score >= 90) {\n  console.log(\"A\");\n} else if (score >= 70) {\n  console.log(\"B\");   // هذه تُنفَّذ، ثم يتوقف الفحص\n} else {\n  console.log(\"C\");\n}")) +
        sec("ترتيب الشروط مهم",
          "<p>لو كتبنا <span class=\"term\">score >= 50</span> قبل <span class=\"term\">score >= 90</span> فسيدخل صاحب 95 في الشرط الأول ولن يصل إلى الثاني أبدًا. ابدأ بالشرط الأكثر تحديدًا.</p>") +
        sec("دمج الشروط",
          "<p>استخدم <span class=\"term\">&&</span> و<span class=\"term\">||</span> لبناء شرط واحد من عدة شروط:</p>",
          code("const age = 17, hasParent = true;\nif (age >= 18 || (age >= 15 && hasParent)) {\n  console.log(\"مسموح\");\n} else {\n  console.log(\"غير مسموح\");\n}"),
          note("ثلاثة أخطاء شائعة: استخدام <strong>=</strong> بدل <strong>===</strong> داخل الشرط، ونسيان الأقواس المعقوفة، وترتيب الشروط بشكل خاطئ.")),
      en:
        sec("Making a decision, step by step",
          "<p>An <span class=\"term\">if</span> statement runs the block in curly braces only when the condition is <span class=\"term\">true</span>. You can add <span class=\"term\">else if</span> for more conditions and <span class=\"term\">else</span> for everything else. Conditions are checked in order and only the first true block runs.</p>",
          code("const score = 72;\n\nif (score >= 90) {\n  console.log(\"A\");\n} else if (score >= 70) {\n  console.log(\"B\");   // this runs, then checking stops\n} else {\n  console.log(\"C\");\n}")) +
        sec("Order of conditions matters",
          "<p>If we wrote <span class=\"term\">score >= 50</span> before <span class=\"term\">score >= 90</span>, a student with 95 would enter the first condition and never reach the second. Start with the most specific condition.</p>") +
        sec("Combining conditions",
          "<p>Use <span class=\"term\">&&</span> and <span class=\"term\">||</span> to build one condition out of several:</p>",
          code("const age = 17, hasParent = true;\nif (age >= 18 || (age >= 15 && hasParent)) {\n  console.log(\"allowed\");\n} else {\n  console.log(\"not allowed\");\n}"),
          note("Three common mistakes: using <strong>=</strong> instead of <strong>===</strong> inside a condition, forgetting the curly braces, and ordering the conditions wrongly.")),
    },
    explain0: { ar: "if تجعل البرنامج يختار مسارًا بحسب نتيجة شرط (true أو false)، وهذا هو معنى اتخاذ القرار.", en: "if lets the program choose a path based on the result of a condition (true or false), which is what making a decision means." },
    quizMore: [
      Q("ما الذي يُطبع؟\nlet n = 5;\nif (n > 10) { console.log(\"A\"); } else if (n > 3) { console.log(\"B\"); } else { console.log(\"C\"); }", "What is printed?\nlet n = 5;\nif (n > 10) { console.log(\"A\"); } else if (n > 3) { console.log(\"B\"); } else { console.log(\"C\"); }", [["A"], ["B"], ["C"], ["B ثم C", "B then C"]], 1,
        "الشرط الأول خاطئ (5 ليست أكبر من 10)، والثاني صحيح (5 > 3) فتُنفَّذ كتلة B ويتوقف الفحص.", "The first condition is false (5 is not greater than 10), the second is true (5 > 3), so block B runs and checking stops."),
      Q("أي شرط يتحقق عندما تكون age بين 18 و65 (شاملة)؟", "Which condition holds when age is between 18 and 65 (inclusive)?", [["age >= 18 || age <= 65"], ["age >= 18 && age <= 65"], ["age > 18 && age < 65"], ["age = 18 && age = 65"]], 1,
        "نحتاج تحقق الشرطين معًا فنستخدم &&. أما || فتكون صحيحة لأي عمر تقريبًا، وعلامة = تُسند ولا تقارن.", "We need both conditions at once, so we use &&. || would be true for almost any age, and = assigns instead of comparing."),
      Q("ما الخطأ في: if (x = 5) { ... }", "What is wrong with: if (x = 5) { ... }", [["لا شيء، هو صحيح", "Nothing, it is correct"], ["يجب استخدام === للمقارنة بدل =", "=== should be used for comparison instead of ="], ["يجب حذف الأقواس", "The parentheses must be removed"], ["x يجب أن يكون نصًا", "x must be a string"]], 1,
        "= تُسند القيمة 5 إلى x ثم تُعتبر النتيجة شرطًا صحيحًا دائمًا. المقارنة تكون بـ ===.", "= assigns 5 to x and the result then counts as an always-true condition. Comparison is done with ==="),
    ],
    exercise: {
      prompt: { ar: "المتغير score = 72. أنشئ متغيرًا باسم result بالقيمة \"pass\" إذا كان score ≥ 50، وإلا \"fail\"، مستخدمًا if / else.", en: "The variable score = 72. Create a variable named result with the value \"pass\" if score ≥ 50, otherwise \"fail\", using if / else." },
      starter: "const score = 72;\nlet result;\n// write if / else here\n",
      must: [{ re: "\\bif\\s*\\(", msg: { ar: "استخدم جملة if.", en: "Use an if statement." } }, { re: "\\belse\\b", msg: { ar: "أضف else للحالة الأخرى.", en: "Add an else for the other case." } }],
      test: "if (typeof result !== 'string') console.log('__FB:0'); else if (result !== 'pass') console.log('__FB:1'); else console.log('__OK');",
      feedback: [{ ar: "result لم تُسند إليه قيمة نصية. أسندها داخل if و else.", en: "result was not given a string value. Assign it inside the if and else blocks." }, { ar: "72 أكبر من 50 فيجب أن تكون النتيجة \"pass\". راجع الشرط.", en: "72 is greater than 50, so the result must be \"pass\". Check the condition." }],
      hint: { ar: "if (score >= 50) { result = \"pass\"; } else { result = \"fail\"; }", en: "if (score >= 50) { result = \"pass\"; } else { result = \"fail\"; }" },
      solution: "const score = 72;\nlet result;\nif (score >= 50) {\n  result = \"pass\";\n} else {\n  result = \"fail\";\n}\nconsole.log(result);",
    },
  },

  "prg-11": {
    deep: {
      ar:
        sec("أجزاء حلقة for",
          "<p>تتكون من ثلاثة أجزاء داخل الأقواس: <strong>البداية</strong> تُنفَّذ مرة واحدة، <strong>الشرط</strong> يُفحص قبل كل دورة، و<strong>التحديث</strong> يُنفَّذ بعد كل دورة.</p>",
          code("for (let i = 1; i <= 3; i++) {\n  console.log(\"دورة\", i);\n}\n// البداية: i = 1\n// الشرط:   i <= 3 ؟ نعم -> نفّذ الكتلة\n// التحديث: i++  -> i = 2 ... حتى يصبح الشرط false")) +
        sec("while: عندما لا نعرف عدد الدورات",
          "<p>استخدم <span class=\"term\">while</span> حين تتكرر العملية «ما دام» الشرط صحيحًا. تأكد أن شيئًا داخل الحلقة يغيّر الشرط في النهاية، وإلا ستصبح <strong>حلقة لا نهائية</strong> وتتجمد الصفحة.</p>",
          code("let n = 100, steps = 0;\nwhile (n > 1) {\n  n = n / 2;     // هذا السطر يقرّب الشرط من false\n  steps++;\n}\nconsole.log(steps); // 7")) +
        sec("نمط المُجمِّع Accumulator",
          "<p>كثيرًا ما نبدأ بقيمة ابتدائية ونحدّثها في كل دورة لنصل إلى نتيجة، مثل مجموع الأعداد:</p>",
          code("let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum += i;      // 1, 3, 6, 10, 15\n}\nconsole.log(sum); // 15"),
          note("تتبّع الحلقة بقلم وورقة: اكتب قيمة i وsum بعد كل دورة. هذه أسرع طريقة لفهم ما تفعله الحلقة واكتشاف الأخطاء.")),
      en:
        sec("The parts of a for loop",
          "<p>It has three parts inside the parentheses: the <strong>start</strong> runs once, the <strong>condition</strong> is checked before every round, and the <strong>update</strong> runs after every round.</p>",
          code("for (let i = 1; i <= 3; i++) {\n  console.log(\"round\", i);\n}\n// start:     i = 1\n// condition: i <= 3 ? yes -> run the block\n// update:    i++  -> i = 2 ... until the condition is false")) +
        sec("while: when we don't know the number of rounds",
          "<p>Use <span class=\"term\">while</span> when the work repeats “as long as” a condition holds. Make sure something inside the loop eventually changes the condition, otherwise it becomes an <strong>infinite loop</strong> and the page freezes.</p>",
          code("let n = 100, steps = 0;\nwhile (n > 1) {\n  n = n / 2;     // this line moves the condition toward false\n  steps++;\n}\nconsole.log(steps); // 7")) +
        sec("The accumulator pattern",
          "<p>We often start with an initial value and update it every round to build a result, such as the sum of numbers:</p>",
          code("let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum += i;      // 1, 3, 6, 10, 15\n}\nconsole.log(sum); // 15"),
          note("Trace the loop with pen and paper: write the values of i and sum after each round. It is the fastest way to understand what a loop does and to find bugs.")),
    },
    explain0: { ar: "الحلقة (Loop) تكرر تنفيذ مجموعة تعليمات عدة مرات دون كتابتها من جديد، فتختصر الكود وتتعامل مع أي عدد من العناصر.", en: "A loop repeats a set of instructions many times without rewriting them, which keeps code short and handles any number of items." },
    quizMore: [
      Q("كم مرة تُنفَّذ كتلة الحلقة؟ for (let i = 0; i < 3; i++) { ... }", "How many times does the loop body run? for (let i = 0; i < 3; i++) { ... }", [["2"], ["3"], ["4"], ["لا نهائية", "Infinitely"]], 1,
        "تأخذ i القيم 0 ثم 1 ثم 2، وعندما تصبح 3 يصبح الشرط i < 3 خاطئًا. إذن 3 دورات.", "i takes the values 0, 1 and 2; when it becomes 3 the condition i < 3 is false. So there are 3 rounds."),
      Q("ما قيمة sum في النهاية؟\nlet sum = 0;\nfor (let i = 1; i <= 4; i++) { sum += i; }", "What is sum at the end?\nlet sum = 0;\nfor (let i = 1; i <= 4; i++) { sum += i; }", [["4"], ["10"], ["24"], ["6"]], 1,
        "sum تتراكم: 1 ثم 3 ثم 6 ثم 10.", "sum accumulates: 1, then 3, then 6, then 10."),
      Q("ما سبب أن هذه الحلقة لا تنتهي؟\nlet i = 0;\nwhile (i < 5) { console.log(i); }", "Why does this loop never end?\nlet i = 0;\nwhile (i < 5) { console.log(i); }", [["لأن console.log لا تعمل", "Because console.log does not work"], ["لأن i لا تتغير داخل الحلقة فيبقى الشرط صحيحًا", "Because i never changes inside the loop, so the condition stays true"], ["لأن while لا تقبل أرقامًا", "Because while does not accept numbers"], ["لأن 5 رقم كبير", "Because 5 is a big number"]], 1,
        "لا شيء يزيد i، فتبقى 0 والشرط i < 5 صحيحًا دائمًا. الحل: أضف i++ داخل الحلقة.", "Nothing increases i, so it stays 0 and i < 5 is always true. Fix: add i++ inside the loop."),
    ],
    exercise: {
      prompt: { ar: "باستخدام حلقة for أو while، احسب مجموع الأعداد من 1 إلى 10 وخزّنه في متغير باسم sum.", en: "Using a for or while loop, calculate the sum of the numbers from 1 to 10 and store it in a variable named sum." },
      starter: "let sum = 0;\n// write the loop here\n",
      must: [{ re: "\\b(for|while)\\s*\\(", msg: { ar: "استخدم حلقة for أو while ولا تكتب الناتج مباشرة.", en: "Use a for or while loop; do not write the answer directly." } }],
      test: "if (typeof sum !== 'number') console.log('__FB:0'); else if (sum !== 55) console.log('__FB:1'); else console.log('__OK');",
      feedback: [{ ar: "sum يجب أن تبقى رقمًا.", en: "sum must stay a number." }, { ar: "الناتج ليس 55. تأكد أن الحلقة تبدأ من 1 وتنتهي عند 10 (شاملة).", en: "The result is not 55. Make sure the loop starts at 1 and ends at 10 (inclusive)." }],
      hint: { ar: "for (let i = 1; i <= 10; i++) { sum += i; }", en: "for (let i = 1; i <= 10; i++) { sum += i; }" },
      solution: "let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}\nconsole.log(sum); // 55",
    },
  },
};

/** Merge the deep layer into the lesson objects (called once from content/prg/index.js). */
export function applyDeep(lessons) {
  for (const l of lessons) {
    const d = DEEP[l.id]; if (!d) continue;
    l.deep = d.deep; l.quiz[0].explain = d.explain0; l.quizMore = d.quizMore; l.exercise = d.exercise;
  }
}
