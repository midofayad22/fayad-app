// Advanced JavaScript, lessons 12-22 (see lessons-a.js for the format).
export const B = [
  {
    t: "Map و Set و WeakMap و WeakRef", d: "اختر بنية البيانات المناسبة، وافهم المراجع الضعيفة ومتى تفيد في منع تسرب الذاكرة.",
    s: [["Map و Set", "<p><code>Map</code> يقبل أي نوع مفتاح ويحافظ على ترتيب الإدخال. <code>Set</code> مجموعة قيم فريدة. كلاهما أسرع وأوضح من الكائنات في كثير من الحالات.</p>"],
        ["المراجع الضعيفة", "<p><code>WeakMap</code> و<code>WeakSet</code> تمسكان بمفاتيح كائنات دون منع جامع القمامة من حذفها. مناسبة لربط بيانات خاصة بكائن دون تسريب ذاكرة. مفاتيحها كائنات فقط ولا يمكن تعدادها.</p>"]],
    key: "WeakMap لا تمنع حذف المفتاح من الذاكرة، ولا يمكن المرور على عناصرها.",
    code: `const counts = new Map();
for (const w of "to be or not to be".split(" ")) {
  counts.set(w, (counts.get(w) ?? 0) + 1);
}
console.log([...counts].filter(([, n]) => n > 1));

const unique = [...new Set([3, 1, 3, 2, 1])];
console.log(unique);

const keyObj = { id: 1 };
const m = new Map([[keyObj, "object key"], [NaN, "nan key"]]);
console.log(m.get(keyObj), m.get(NaN), m.size);

const meta = new WeakMap();
const el = {};
meta.set(el, { clicks: 0 });
meta.get(el).clicks++;
console.log(meta.get(el), meta.has({}));`,
    out: "[ [ 'to', 2 ], [ 'be', 2 ] ]\n[ 3, 1, 2 ]\nobject key nan key 2\n{ clicks: 1 } false",
    exp: "<p>الـ Map يقبل كائنًا و<code>NaN</code> كمفتاح، وهو ما لا تقدمه الكائنات العادية. WeakMap تربط بيانات بالكائن، وتختفي البيانات تلقائيًا إذا اختفى الكائن.</p>",
    prompt: "احسب تكرار كل حرف في كلمة <code>banana</code> باستخدام <code>Map</code>.",
    starter: "const freq = new Map();\nfor (const ch of 'banana') freq.set(ch, (freq.get(ch) || 0) + 1);\nconsole.log(freq);",
    q: [["أي بنية تقبل كائنًا كمفتاح مع إمكانية التعداد؟", ["Map", "Object العادي", "Array", "JSON"], 0],
        ["ما ميزة WeakMap؟", ["لا تمنع جامع القمامة من حذف المفتاح", "أسرع من Map دائمًا", "تقبل أي نوع مفتاح", "قابلة للتعداد"], 0],
        ["كيف تزيل التكرار من مصفوفة بسرعة؟", ["[...new Set(arr)]", "arr.unique()", "arr.deleteDuplicates()", "Object.keys(arr)"], 0]],
  },
  {
    t: "Symbols والـ Tagged Templates", d: "مفاتيح فريدة غير قابلة للتصادم، وقوالب نصية يمكنك معالجتها بدالة خاصة.",
    s: [["Symbol", "<p>كل <code>Symbol()</code> قيمة فريدة تمامًا. تصلح كمفاتيح خصائص لا تتصادم مع غيرها ولا تظهر في <code>for...in</code> أو <code>Object.keys</code>.</p>"],
        ["Tagged Templates", "<p>عند كتابة <code>tag`نص ${قيمة}`</code> تستدعى الدالة <code>tag</code> بمصفوفة الأجزاء النصية ثم القيم. تُستخدم لتهريب HTML وبناء استعلامات آمنة ولغات مخصصة.</p>"]],
    key: "Symbols للمفاتيح الفريدة، والـ tagged templates تتيح معالجة القيم المدرجة قبل بناء النص.",
    code: `const id = Symbol("id");
const user = { name: "Lina", [id]: 101 };
console.log(Object.keys(user), user[id]);
console.log(Symbol("a") === Symbol("a"), Symbol.for("a") === Symbol.for("a"));

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const html = (strings, ...values) =>
  strings.reduce((out, s, i) => out + s + (i < values.length ? escapeHtml(values[i]) : ""), "");
const input = "<script>alert(1)</script>";
console.log(html\`<p>\${input}</p>\`);`,
    out: "[ 'name' ] 101\nfalse true\n<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>",
    exp: "<p>المفتاح <code>id</code> لم يظهر في <code>keys</code>. دالة <code>html</code> تهرّب كل قيمة مدرجة تلقائيًا، فيصبح بناء HTML من مدخلات المستخدم أكثر أمانًا.</p>",
    prompt: "اكتب tag باسم <code>upper</code> تحول القيم المدرجة إلى أحرف كبيرة.",
    starter: "const upper = (s, ...v) => s.reduce((o, x, i) => o + x + (v[i] !== undefined ? String(v[i]).toUpperCase() : ''), '');\nconst who = 'fayad';\nconsole.log(upper`hello ${who}!`);",
    q: [["ماذا يميز Symbol()؟", ["كل استدعاء يرجع قيمة فريدة", "هو نص عادي", "يساوي دائمًا Symbol('a')", "يُحفظ في الشبكة"], 0],
        ["ماذا تستلم دالة الـ tag كوسيط أول؟", ["مصفوفة الأجزاء النصية", "القيم فقط", "كائن DOM", "رقم السطر"], 0],
        ["أي استخدام مناسب للـ tagged templates؟", ["تهريب HTML وبناء استعلامات آمنة", "تغيير ألوان الصفحة", "تحميل الملفات", "ضغط الصور"], 0]],
  },
  {
    t: "حلقة الأحداث: Microtasks و Macrotasks", d: "افهم ترتيب تنفيذ الكود المتزامن واللامتزامن بدقة.",
    s: [["Call Stack وطوابير المهام", "<p>JavaScript تنفذ على خيط واحد. الكود المتزامن يعمل أولًا على الـ Call Stack. عند فراغه تنفذ الـ Event Loop كل <strong>Microtasks</strong> (Promise.then وqueueMicrotask) ثم مهمة واحدة من <strong>Macrotasks</strong> (setTimeout وأحداث DOM) وتكرر.</p>"]],
    key: "Microtasks تنفذ كلها قبل أي Macrotask، حتى لو كان setTimeout بصفر.",
    code: `console.log("1 sync");
setTimeout(() => console.log("5 timeout"), 0);
Promise.resolve().then(() => console.log("3 promise"));
queueMicrotask(() => console.log("4 microtask"));
(async () => {
  console.log("2 inside async (sync part)");
  await null;
  console.log("4b after await");
})();
console.log("2b sync end");`,
    out: "1 sync\n2 inside async (sync part)\n2b sync end\n3 promise\n4 microtask\n4b after await\n5 timeout",
    exp: "<p>الجزء الأول من دالة async ينفذ فورًا. كل ما بعد <code>await</code> ينتقل إلى طابور الـ microtasks، وتنفذ كلها قبل أن يصل الدور إلى <code>setTimeout</code>.</p>",
    prompt: "توقع ثم اختبر ترتيب الطباعة: <code>setTimeout</code> ثم <code>Promise.then</code> ثم سطر عادي.",
    starter: "setTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('sync');",
    q: [["أي شيء ينفذ أولًا بعد انتهاء الكود المتزامن؟", ["الـ Microtasks", "setTimeout", "أحداث الشبكة", "لا شيء"], 0],
        ["هل setTimeout(fn, 0) ينفذ فورًا؟", ["لا، يُجدول كـ Macrotask بعد الكود الحالي والـ Microtasks", "نعم فورًا", "لا ينفذ أبدًا", "ينفذ قبل Promise"], 0],
        ["أين يستأنف الكود بعد await؟", ["كـ Microtask", "كـ Macrotask", "في خيط جديد", "في الشبكة"], 0]],
  },
  {
    t: "Promise.all و allSettled و race و any", d: "نسّق عدة عمليات لا متزامنة بالاستراتيجية الصحيحة لكل حالة.",
    s: [["المقارنة", "<ul><li><code>all</code>: تنتظر الجميع وتفشل عند أول فشل.</li><li><code>allSettled</code>: تنتظر الجميع وتعيد حالة كل واحد.</li><li><code>race</code>: أول واحد ينتهي (نجاحًا أو فشلًا).</li><li><code>any</code>: أول نجاح، وتفشل فقط إذا فشل الجميع.</li></ul>"]],
    key: "اختر all عندما تحتاج كل النتائج، وallSettled عندما يجوز أن يفشل بعضها.",
    code: `const ok = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));
const fail = (m, ms) => new Promise((_, j) => setTimeout(() => j(new Error(m)), ms));

(async () => {
  console.log(await Promise.all([ok("a", 20), ok("b", 5)]));
  try { await Promise.all([ok("a", 20), fail("boom", 5)]); }
  catch (e) { console.log("all failed:", e.message); }
  const settled = await Promise.allSettled([ok("x", 5), fail("no", 5)]);
  console.log(settled.map((s) => s.status));
  console.log(await Promise.race([ok("slow", 30), ok("fast", 5)]));
  console.log(await Promise.any([fail("e1", 5), ok("winner", 15)]));
})();`,
    out: "[ 'a', 'b' ]\nall failed: boom\n[ 'fulfilled', 'rejected' ]\nfast\nwinner",
    exp: "<p>ترتيب النتائج في <code>all</code> يطابق ترتيب المدخلات لا ترتيب الانتهاء. <code>any</code> تتجاهل الفشل المبكر وتنتظر أول نجاح.</p>",
    prompt: "استخدم <code>allSettled</code> لحساب عدد العمليات الناجحة من ثلاث عمليات (اثنتان تنجحان وواحدة تفشل).",
    starter: "const p = [Promise.resolve(1), Promise.reject(new Error('x')), Promise.resolve(3)];\nPromise.allSettled(p).then((r) => console.log(r.filter((x) => x.status === 'fulfilled').length));",
    q: [["أي دالة تفشل عند أول فشل؟", ["Promise.all", "Promise.allSettled", "Promise.any", "لا شيء منها"], 0],
        ["أي دالة تعطيك حالة كل وعد مهما كان؟", ["Promise.allSettled", "Promise.race", "Promise.all", "Promise.resolve"], 0],
        ["ماذا تعيد Promise.any عند فشل الجميع؟", ["ترفض بـ AggregateError", "تنجح بمصفوفة فارغة", "تعيد undefined", "تتجمد"], 0]],
  },
  {
    t: "أنماط async/await العملية", d: "التنفيذ المتسلسل مقابل المتوازي، وإعادة المحاولة، والمهلة، ومعالجة الأخطاء الصحيحة.",
    s: [["تسلسلي أم متوازٍ؟", "<p>استخدام <code>await</code> داخل حلقة ينفذ العمليات واحدة بعد أخرى. إن كانت مستقلة فابدأها كلها ثم انتظرها معًا بـ <code>Promise.all</code> لتوفير الوقت.</p>"],
        ["إعادة المحاولة والمهلة", "<p>كثير من العمليات الشبكية تفشل مؤقتًا. اكتب دالة <code>retry</code> بعدد محاولات محدد، وسباقًا مع مؤقت لفرض مهلة.</p>"]],
    key: "لا تضع await داخل حلقة إذا كانت العمليات مستقلة.",
    code: `const wait = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));

async function retry(fn, times) {
  let lastError;
  for (let i = 1; i <= times; i++) {
    try { return await fn(i); }
    catch (e) { lastError = e; console.log("attempt", i, "failed"); }
  }
  throw lastError;
}
const withTimeout = (p, ms) =>
  Promise.race([p, new Promise((_, j) => setTimeout(() => j(new Error("timeout")), ms))]);

(async () => {
  const v = await retry(async (n) => { if (n < 3) throw new Error("flaky"); return "ok on " + n; }, 5);
  console.log(v);
  const t0 = Date.now();
  await Promise.all([wait(40), wait(40), wait(40)]);
  console.log("parallel under 110ms:", Date.now() - t0 < 110);
  try { await withTimeout(wait(100), 10); } catch (e) { console.log(e.message); }
})();`,
    out: "attempt 1 failed\nattempt 2 failed\nok on 3\nparallel under 110ms: true\ntimeout",
    exp: "<p>ثلاث عمليات انتظار 40ms تنتهي في ~40ms معًا لا 120ms لأنها بدأت في وقت واحد. دالة <code>retry</code> تحتفظ بآخر خطأ وترميه إذا استنفدت المحاولات.</p>",
    prompt: "اكتب <code>sleep(ms)</code> تعيد Promise ثم استخدمها داخل async لطباعة رسالة بعد 50ms.",
    starter: "const sleep = (ms) => new Promise((r) => setTimeout(r, ms));\n(async () => {\n  await sleep(50);\n  console.log('done');\n})();",
    q: [["لماذا نستخدم Promise.all للعمليات المستقلة؟", ["لتنفيذها بالتوازي وتقليل الزمن الكلي", "لتقليل عدد الأخطاء", "لأنها تحذف await", "لتشفيرها"], 0],
        ["كيف نفرض مهلة على وعد؟", ["Promise.race مع وعد يرفض بعد المهلة", "setTimeout فقط", "console.log", "typeof"], 0],
        ["ما الغرض من retry؟", ["إعادة محاولة العملية عند الفشل المؤقت", "تسريع المتصفح", "حذف الأخطاء", "إنشاء Promise جديد دائمًا"], 0]],
  },
  {
    t: "AbortController والـ Async Iterators", d: "إلغاء العمليات الجارية وقراءة التدفقات اللامتزامنة بـ for await...of.",
    s: [["إلغاء العمليات", "<p><code>AbortController</code> ينتج <code>signal</code> تمرره إلى العملية (مثل fetch). استدعاء <code>abort()</code> يجعل العملية ترفض بخطأ <code>AbortError</code> وتتوقف.</p>"],
        ["Async Iterators", "<p>المولد اللامتزامن <code>async function*</code> ينتج قيمًا عبر الزمن، ونقرؤه بـ <code>for await...of</code>. مناسب للتدفقات والصفحات المتتابعة.</p>"]],
    key: "مرّر signal وتحقق منه، وتعامل مع الإلغاء كحالة عادية لا خطأ مفاجئ.",
    code: `const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener("abort", () => {
    clearTimeout(t);
    reject(signal.reason);
  });
});

(async () => {
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(new Error("cancelled")), 10);
  try { await sleep(200, ctrl.signal); }
  catch (e) { console.log(e.message); }

  async function* pages() {
    for (let p = 1; p <= 3; p++) {
      await sleep(5);
      yield [p * 10, p * 10 + 1];
    }
  }
  const all = [];
  for await (const items of pages()) all.push(...items);
  console.log(all);
})();`,
    out: "cancelled\n[ 10, 11, 20, 21, 30, 31 ]",
    exp: "<p>الإلغاء يمنع الانتظار الكامل (200ms). المولد اللامتزامن يسلّم صفحات متتابعة، و<code>for await</code> تنتظر كل صفحة قبل الانتقال للتالية.</p>",
    prompt: "أنشئ <code>AbortController</code> وأخبره بالإلغاء فورًا ثم اطبع قيمة <code>signal.aborted</code>.",
    starter: "const c = new AbortController();\nc.abort();\nconsole.log(c.signal.aborted);",
    q: [["ماذا ينتج AbortController؟", ["signal يمكن تمريره للعمليات", "نافذة جديدة", "ملفًا", "خيطًا جديدًا"], 0],
        ["ما الذي يقرأ المولد اللامتزامن؟", ["for await...of", "for...in", "while فقط", "switch"], 0],
        ["ماذا تفعل عند إلغاء العملية؟", ["تتعامل مع AbortError كحالة متوقعة", "تتجاهلها دائمًا", "تعيد تحميل الصفحة", "تحذف المتغيرات"], 0]],
  },
  {
    t: "أخطاء مخصصة واستراتيجيات المعالجة", d: "صمّم أنواع أخطاء واضحة مع السبب الأصلي، وقرر أين تلتقط الأخطاء.",
    s: [["Custom Errors", "<p>ارثِ من <code>Error</code> وحدد <code>name</code> وخصائص إضافية. استخدم الخيار <code>cause</code> للاحتفاظ بالخطأ الأصلي عند الالتفاف حوله.</p>"],
        ["أين نلتقط؟", "<p>التقط الخطأ حيث تستطيع <strong>فعل شيء مفيد</strong> به (إعادة محاولة، رسالة للمستخدم)، وإلا اتركه يصعد. لا تبتلع الأخطاء بصمت.</p>"]],
    key: "أضف السياق عند إعادة الرمي بدل إخفاء الخطأ الأصلي.",
    code: `class ValidationError extends Error {
  constructor(field, message, options) {
    super(message, options);
    this.name = "ValidationError";
    this.field = field;
  }
}

function parseAge(input) {
  const n = Number(input);
  if (!Number.isInteger(n) || n < 0) {
    throw new ValidationError("age", "invalid age: " + input);
  }
  return n;
}
function load(input) {
  try { return parseAge(input); }
  catch (e) { throw new Error("load failed", { cause: e }); }
}
try { load("abc"); }
catch (e) {
  console.log(e.message, "|", e.cause.name, e.cause.field);
  console.log(e instanceof Error, e.cause instanceof ValidationError);
}
console.log(load("42"));`,
    out: "load failed | ValidationError age\ntrue true\n42",
    exp: "<p>الخطأ المغلّف يحتفظ بالسبب الأصلي في <code>cause</code> فيسهل التتبع. <code>instanceof</code> تتيح التفرقة بين الأنواع داخل <code>catch</code>.</p>",
    prompt: "عرّف <code>NotFoundError extends Error</code> وارمِه والتقطه واطبع <code>e.name</code>.",
    starter: "class NotFoundError extends Error {\n  constructor(what) { super(what + ' not found'); this.name = 'NotFoundError'; }\n}\ntry { throw new NotFoundError('user'); }\ncatch (e) { console.log(e.name, e.message); }",
    q: [["ما فائدة الخيار cause؟", ["حفظ الخطأ الأصلي عند إعادة الرمي", "إيقاف البرنامج", "تحويل الخطأ لنص", "تجاهل الخطأ"], 0],
        ["ما أفضل مكان لالتقاط الخطأ؟", ["حيث يمكنك معالجته بشكل مفيد", "في كل سطر", "في النطاق العام فقط دائمًا", "لا تلتقطه أبدًا"], 0],
        ["لماذا نعرف أنواع أخطاء مخصصة؟", ["للتفرقة بينها بـ instanceof وإضافة بيانات", "لتسريع الكود", "لأنها إلزامية", "لإخفاء الرسائل"], 0]],
  },
  {
    t: "التعابير النمطية المتقدمة", d: "المجموعات المسماة والنظر للأمام والخلف وmatchAll لاستخراج البيانات بدقة.",
    s: [["أدوات حديثة", "<ul><li>مجموعات مسماة: <code>(?&lt;year&gt;\\d{4})</code>.</li><li>Lookahead <code>(?=...)</code> وLookbehind <code>(?&lt;=...)</code>.</li><li><code>matchAll</code> للحصول على كل النتائج مع المجموعات.</li><li>العلم <code>u</code> للتعامل الصحيح مع Unicode.</li></ul>"]],
    key: "المجموعات المسماة تجعل الـ regex مقروءًا، وmatchAll تتطلب العلم g.",
    code: `const date = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/u;
const { groups } = "Due 2026-03-09".match(date);
console.log(groups.year, groups.month, groups.day);

const prices = "usd:10 eur:20 usd:35";
const usd = [...prices.matchAll(/usd:(\\d+)/g)].map((m) => Number(m[1]));
console.log(usd);

console.log("1234567".replace(/\\B(?=(\\d{3})+(?!\\d))/g, ","));
console.log("price: $45".match(/(?<=\\$)\\d+/)[0]);
console.log("2026-03-09".replace(date, "$<day>/$<month>/$<year>"));`,
    out: "2026 03 09\n[ 10, 35 ]\n1,234,567\n45\n09/03/2026",
    exp: "<p>الـ lookahead يضع الفواصل كل 3 أرقام دون استهلاك الأرقام. والـ lookbehind يلتقط الرقم بعد علامة <code>$</code> دون إدراجها في النتيجة.</p>",
    prompt: "استخرج كل الكلمات التي تبدأ بـ <code>#</code> من النص <code>I love #js and #css</code> باستخدام <code>matchAll</code>.",
    starter: "const tags = [...'I love #js and #css'.matchAll(/#(\\w+)/g)].map((m) => m[1]);\nconsole.log(tags);",
    q: [["ما فائدة المجموعات المسماة؟", ["الوصول للنتائج بالاسم بدل الأرقام", "تسريع الصفحة", "تشفير النص", "تحويل النص لأرقام"], 0],
        ["ماذا يشترط matchAll؟", ["العلم g", "العلم i فقط", "لا شرط", "العلم y فقط"], 0],
        ["ماذا يفعل (?<=\\$)؟", ["يتحقق من وجود $ قبل الموضع دون استهلاكها", "يطابق $ ويحذفها", "يتحقق بعد الموضع", "يعيد كل النص"], 0]],
  },
  {
    t: "أنماط التصميم: Observer و Pub/Sub", d: "اربط أجزاء التطبيق بدون اعتماد مباشر بينها بأنماط الأحداث.",
    s: [["Observer / Pub-Sub", "<p>ينشر المصدر (Subject) أحداثًا ويشترك فيها مستمعون دون أن يعرف المصدر من هم. هذا يقلل الاقتران ويسهل الاختبار والتوسع.</p>"],
        ["احذر التسرب", "<p>كل اشتراك يجب أن يكون له إلغاء (<code>unsubscribe</code>)، وإلا بقيت المراجع في الذاكرة.</p>"]],
    key: "كل subscribe يُرجع دالة إلغاء الاشتراك.",
    code: `function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set(next) {
      state = { ...state, ...next };
      listeners.forEach((fn) => fn(state));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
const store = createStore({ count: 0 });
const off = store.subscribe((s) => console.log("A sees", s.count));
store.subscribe((s) => console.log("B sees", s.count));
store.set({ count: 1 });
off();
store.set({ count: 2 });`,
    out: "A sees 1\nB sees 1\nB sees 2",
    exp: "<p>بعد استدعاء <code>off()</code> لم يعد المشترك A يتلقى التحديثات. استخدام <code>Set</code> يمنع تسجيل نفس الدالة مرتين.</p>",
    prompt: "أنشئ <code>emitter</code> بسيطًا فيه <code>on(event, fn)</code> و<code>emit(event, data)</code>.",
    starter: "const handlers = {};\nconst emitter = {\n  on(e, fn) { (handlers[e] ||= []).push(fn); },\n  emit(e, d) { (handlers[e] || []).forEach((fn) => fn(d)); },\n};\nemitter.on('hi', (n) => console.log('hello', n));\nemitter.emit('hi', 'Sara');",
    q: [["ما الميزة الأساسية لنمط Pub/Sub؟", ["تقليل الاقتران بين الناشر والمستمعين", "تسريع الشبكة", "تشفير البيانات", "إلغاء الأخطاء"], 0],
        ["لماذا نرجع دالة من subscribe؟", ["لإلغاء الاشتراك ومنع تسرب الذاكرة", "لطباعة النتيجة", "لتكرار الحدث", "لتغيير الحالة"], 0],
        ["لماذا نستخدم Set لتخزين المستمعين؟", ["لمنع تكرار نفس المستمع وسهولة الحذف", "لأن Array غير موجودة", "لتشفيرهم", "لترتيبهم أبجديًا"], 0]],
  },
  {
    t: "الأداء والذاكرة", d: "تعقيد الخوارزميات، تجنب التسريبات الشائعة، وقياس الأداء قبل التحسين.",
    s: [["فكّر في التعقيد", "<p>البحث في مصفوفة <code>O(n)</code> بينما <code>Set.has</code> و<code>Map.get</code> تقريبًا <code>O(1)</code>. استبدال بحث داخل حلقة بـ Set قد يحول <code>O(n²)</code> إلى <code>O(n)</code>.</p>"],
        ["تسريبات الذاكرة الشائعة", "<ul><li>مستمعو أحداث لم تُزَل.</li><li>مؤقتات <code>setInterval</code> لم تُلغَ.</li><li>Closures تمسك بكائنات ضخمة.</li><li>Maps عامة تكبر بلا حد (استخدم WeakMap أو حدًّا للحجم).</li></ul>"]],
    key: "قِس أولًا ثم حسّن. التحسين المبكر دون قياس يضيّع الوقت.",
    code: `const N = 2000;
const a = Array.from({ length: N }, (_, i) => i);
const b = Array.from({ length: N }, (_, i) => i * 2);

function slow() {
  let n = 0;
  for (const x of a) if (b.includes(x)) n++;
  return n;
}
function fast() {
  const set = new Set(b);
  let n = 0;
  for (const x of a) if (set.has(x)) n++;
  return n;
}
console.log(slow() === fast(), fast());

const cache = new Map();
function remember(key, value, max = 3) {
  cache.set(key, value);
  if (cache.size > max) cache.delete(cache.keys().next().value);
}
["a", "b", "c", "d", "e"].forEach((k, i) => remember(k, i));
console.log([...cache.keys()]);`,
    out: "true 1000\n[ 'c', 'd', 'e' ]",
    exp: "<p>النسختان تعطيان نفس النتيجة لكن الثانية أسرع كثيرًا مع الأحجام الكبيرة. الـ cache المحدود يحذف أقدم مفتاح (Map تحافظ على ترتيب الإدخال) فلا ينمو بلا حد.</p>",
    prompt: "اكتب دالة تعيد العناصر المشتركة بين مصفوفتين باستخدام <code>Set</code>.",
    starter: "const common = (x, y) => { const s = new Set(y); return x.filter((v) => s.has(v)); };\nconsole.log(common([1, 2, 3, 4], [3, 4, 5]));",
    q: [["ما فائدة Set.has مقارنة بـ includes؟", ["بحث أسرع (تقريبًا ثابت الزمن) في المجموعات الكبيرة", "تحذف التكرار تلقائيًا من الإخراج", "تعمل على النصوص فقط", "لا فرق أبدًا"], 0],
        ["أي مما يلي سبب شائع لتسرب الذاكرة؟", ["مستمعو أحداث لم تُزَل", "استخدام const", "كتابة تعليقات", "استخدام map"], 0],
        ["ما القاعدة الصحيحة للتحسين؟", ["قِس أولًا ثم حسّن الأبطأ فعلًا", "حسّن كل سطر مبكرًا", "لا تحسّن أبدًا", "اكتب كل شيء بحلقات متداخلة"], 0]],
  },
];
