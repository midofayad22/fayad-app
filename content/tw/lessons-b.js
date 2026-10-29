// Tailwind CSS v4 lessons 11-20 (see lessons-a.js).
export const B = [
  {
    t: "الخلفيات والتدرجات والصور", d: "bg وتدرجات bg-linear وobject-fit وتصفية الصور.",
    s: [["التدرجات (v4)", "<p>في v4 صارت التدرجات: <code>bg-linear-to-r from-indigo-500 to-purple-500</code> (بدل <code>bg-gradient-to-r</code> في v3). نقطة وسطى: <code>via-sky-500</code>. وهناك <code>bg-radial</code> و<code>bg-conic</code>.</p>"],
        ["الصور", "<p><code>object-cover</code> و<code>object-contain</code> لضبط ملء الصورة داخل إطارها، <code>object-center</code> للموضع، و<code>rounded-full</code> للصور الدائرية، <code>blur-sm</code> و<code>grayscale</code> للمؤثرات.</p>"]],
    key: "تدرجات v4: bg-linear-to-{اتجاه} مع from/via/to.",
    code: `<div class="space-y-3 p-4">
  <div id="grad" class="h-24 rounded-xl bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-400"></div>
  <div class="flex items-center gap-3">
    <svg class="size-16 rounded-full bg-slate-200 object-cover" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="#0b6b78"/></svg>
    <p class="text-slate-700">الصور الحقيقية تستخدم <code>object-cover</code> داخل إطار بحجم ثابت.</p>
  </div>
  <div class="h-16 rounded-xl bg-slate-900 bg-radial from-sky-400/40 to-transparent"></div>
</div>`,
    exp: "<p>التدرج الأول يمر بثلاثة ألوان من اليسار لليمين. التدرج الدائري <code>bg-radial</code> متاح في v4.</p>",
    prompt: "اجعل التدرج رأسيًا بـ <code>bg-linear-to-b</code>.", check: ["#grad", "background-image", "linear-gradient"],
    q: [["ما صيغة التدرج الخطي في Tailwind v4؟", ["bg-linear-to-r", "bg-gradient-to-r فقط", "gradient-right", "linear-r"], 0],
        ["ما وظيفة object-cover؟", ["ملء إطار الصورة مع قص الزائد دون تشويه", "تمديد الصورة بشكل مشوه", "إخفاء الصورة", "تكرار الصورة"], 0],
        ["أي فئات تحدد ألوان بداية ونهاية التدرج؟", ["from-* و to-*", "start-* و end-*", "bg-start و bg-end", "color-1 و color-2"], 0]],
  },
  {
    t: "التصميم المتجاوب", d: "mobile-first والنقاط الفاصلة وvariants مثل md: وmax-md:.",
    s: [["mobile-first", "<p>الفئة بلا بادئة تنطبق على كل الشاشات، والبادئة تنطبق من تلك النقطة <strong>فما فوق</strong>: <code>sm</code> ≥640px، <code>md</code> ≥768px، <code>lg</code> ≥1024px، <code>xl</code> ≥1280px، <code>2xl</code> ≥1536px. مثال: <code>text-sm md:text-lg</code>.</p>"],
        ["نطاقات وحاويات", "<p><code>max-md:hidden</code> يخفي حتى أقل من md. <code>md:max-lg:flex</code> لنطاق محدد. و<code>@container</code> مع <code>@md:</code> تجعل المكوّن يتجاوب مع حجم حاويته لا الشاشة.</p>"]],
    key: "صمّم للهاتف أولًا ثم أضف md: وlg: للتوسع.",
    code: `<div class="p-4">
  <h1 id="r" class="text-lg font-bold md:text-3xl lg:text-5xl">عنوان متجاوب</h1>
  <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <div class="bg-sky-100 p-3">1</div><div class="bg-sky-100 p-3">2</div>
    <div class="bg-sky-100 p-3">3</div><div class="bg-sky-100 p-3">4</div>
  </div>
  <p class="mt-3 hidden text-slate-600 md:block">تظهر هذه الفقرة من md فما فوق.</p>
  <div class="@container mt-3"><div class="grid grid-cols-1 gap-2 @md:grid-cols-2"><div class="bg-amber-100 p-2">أ</div><div class="bg-amber-100 p-2">ب</div></div></div>
</div>`,
    exp: "<p>غيّر عرض نافذة المتصفح لترى حجم العنوان وعدد الأعمدة يتغيران. الحاوية <code>@container</code> تتجاوب مع عرضها هي لا عرض الشاشة.</p>",
    prompt: "أضف <code>xl:text-7xl</code> للعنوان وراقب النتيجة على شاشة عريضة.", check: ["#r", "font-weight", "700"],
    q: [["ماذا يعني md:text-lg؟", ["حجم lg من md فما فوق", "حجم lg حتى md فقط", "حجم lg دائمًا", "يخفي النص"], 0],
        ["كيف نخفي عنصرًا على الهاتف ونظهره من md؟", ["hidden md:block", "md:hidden", "block md:none", "invisible md:visible"], 0],
        ["ماذا تفيد @container؟", ["جعل المكون يتجاوب مع عرض حاويته", "تغيير لون الصفحة", "إنشاء مكتبة", "تحميل خطوط"], 0]],
  },
  {
    t: "الحالات: hover و focus و active و disabled", d: "تغيير المظهر حسب حالة العنصر عبر variants.",
    s: [["variants", "<p>ضع البادئة قبل الفئة: <code>hover:bg-sky-700</code> <code>focus:ring-2</code> <code>focus-visible:outline-2</code> <code>active:scale-95</code> <code>disabled:opacity-50</code>. ويمكن دمجها مع المتجاوب: <code>md:hover:bg-sky-700</code>.</p>"],
        ["إمكانية الوصول", "<p>استخدم <code>focus-visible</code> لإظهار مؤشر التركيز عند التنقل بلوحة المفاتيح، وتأكد أن <code>hover</code> ليس الطريقة الوحيدة لكشف معلومة (لأن اللمس لا يملك hover).</p>"]],
    key: "اجمع hover وfocus-visible وactive وdisabled لكل عنصر تفاعلي.",
    code: `<div class="space-x-3 p-4">
  <button id="btn" class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 active:scale-95">تفاعلي</button>
  <button class="rounded-lg bg-slate-300 px-4 py-2 font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50" disabled>معطل</button>
</div>`,
    exp: "<p>مرّر الفأرة فوق الزر الأول أو انقر عليه. الزر الثاني معطل فيظهر بشفافية 50% بفضل <code>disabled:opacity-50</code>.</p>",
    prompt: "أضف <code>hover:-translate-y-0.5</code> للزر الأول.", check: ["#btn", "border-top-left-radius", "8px"],
    q: [["ما الذي تفعله hover:bg-sky-700؟", ["تغيّر الخلفية عند مرور المؤشر", "تغيّرها دائمًا", "تغيرها عند الضغط", "تخفي العنصر"], 0],
        ["لماذا نفضل focus-visible على focus أحيانًا؟", ["يظهر المؤشر عند التنقل بلوحة المفاتيح لا عند كل نقرة", "أسرع", "لا يعمل مع الأزرار", "يغير اللون"], 0],
        ["ماذا تفعل disabled:opacity-50؟", ["تقلل شفافية العنصر المعطل", "تعطل العنصر", "تحذف العنصر", "تغير الخط"], 0]],
  },
  {
    t: "group و peer وبقية الـ variants", d: "تأثير حالة عنصر على آخر، وأنماط الأبناء، وaria وdata variants.",
    s: [["group", "<p>ضع <code>group</code> على الأب ثم <code>group-hover:*</code> على الأبناء ليتغيروا عند الحوم على الأب.</p>"],
        ["peer", "<p>ضع <code>peer</code> على عنصر <strong>سابق</strong> ثم <code>peer-checked:*</code> أو <code>peer-invalid:*</code> على الأخ التالي. ممتاز لخانات الاختيار المخصصة.</p>"],
        ["أخرى", "<p><code>first:</code> <code>last:</code> <code>odd:</code> <code>even:</code> للأبناء، و<code>aria-expanded:*</code> و<code>data-[state=open]:*</code> للحالات المعبّر عنها بخصائص.</p>"]],
    key: "peer يجب أن يسبق العنصر المتأثر في ترتيب HTML.",
    code: `<div class="space-y-4 p-4">
  <a href="#" class="group flex items-center gap-3 rounded-lg border p-3 hover:border-sky-500">
    <span class="text-slate-700 group-hover:text-sky-700">مرّر على البطاقة كلها</span>
    <span id="arrow" class="ms-auto opacity-0 transition group-hover:opacity-100">←</span>
  </a>
  <label class="flex items-center gap-2">
    <input type="checkbox" id="chk" class="peer size-5">
    <span class="text-slate-500 peer-checked:font-bold peer-checked:text-emerald-700">وافقت على الشروط</span>
  </label>
  <ul><li class="odd:bg-slate-100 p-2">1</li><li class="odd:bg-slate-100 p-2">2</li><li class="odd:bg-slate-100 p-2">3</li></ul>
</div>`,
    exp: "<p>السهم يظهر عند الحوم على البطاقة كلها بفضل <code>group</code>. النص يتغير عند تحديد الخانة بفضل <code>peer-checked</code>. <code>odd:</code> يظلل العناصر الفردية.</p>",
    prompt: "أضف <code>first:rounded-t-lg</code> على العناصر ولاحظ أنها تطبّق على الأول فقط.", check: ["#arrow", "opacity", "0"],
    q: [["ما وظيفة group؟", ["تسمح للأبناء بالتفاعل مع حالة الأب عبر group-hover", "تجمع الألوان", "تنشئ شبكة", "تخفي الأبناء"], 0],
        ["شرط peer-checked؟", ["أن يسبق peer العنصر المتأثر في HTML", "أن يكون العنصر div", "أن يكون الأب grid", "لا شرط"], 0],
        ["ماذا يفعل odd:bg-slate-100؟", ["يظلل العناصر الفردية فقط", "يظلل الزوجية", "يظلل الأول فقط", "يخفي الفردية"], 0]],
  },
  {
    t: "الوضع الداكن", d: "dark: بصيغتيه (حسب النظام أو بفئة) وتصميم ألوان يتكيف مع الوضعين.",
    s: [["الافتراضي", "<p>البادئة <code>dark:</code> تنطبق افتراضيًا عندما يفضّل النظام الوضع الداكن (<code>prefers-color-scheme: dark</code>).</p>"],
        ["التحكم اليدوي", "<p>لتبديل يدوي بفئة <code>.dark</code> عرّف المتغير: <code>@custom-variant dark (&amp;:where(.dark, .dark *));</code> داخل <code>&lt;style type=\"text/tailwindcss\"&gt;</code> (أو ملف CSS). ثم أضف الفئة <code>dark</code> للأب لتفعيله.</p>"]],
    key: "اكتب الألوان للوضعين معًا: bg-white dark:bg-slate-900.",
    code: `<style type="text/tailwindcss">
  @custom-variant dark (&:where(.dark, .dark *));
</style>
<div class="dark">
  <div id="panel" class="rounded-xl bg-white p-4 text-slate-900 dark:bg-slate-900 dark:text-white">
    <h1 class="font-bold">لوحة بوضع داكن</h1>
    <p class="text-slate-600 dark:text-slate-300">الفئة dark على الأب فعّلت dark: للأبناء.</p>
  </div>
</div>
<div class="mt-3 rounded-xl bg-white p-4 text-slate-900 dark:bg-slate-900 dark:text-white">بدون الفئة dark: يظهر فاتحًا</div>`,
    exp: "<p>بعد تعريف <code>@custom-variant</code> صار <code>dark:</code> مرتبطًا بوجود الفئة <code>dark</code> لا بإعداد النظام. اللوحة الأولى داخل <code>.dark</code> فتظهر داكنة.</p>",
    prompt: "أزل الفئة <code>dark</code> عن الأب ولاحظ عودة اللوحة للوضع الفاتح.", check: ["#panel", "padding-top", "16px"],
    q: [["متى تنطبق dark: افتراضيًا؟", ["عندما يفضل النظام الوضع الداكن", "دائمًا", "أبدًا", "في الطباعة فقط"], 0],
        ["كيف نربط dark: بفئة يدوية؟", ["@custom-variant dark (&:where(.dark, .dark *));", "dark: true", "data-dark", "<dark>"], 0],
        ["أي ثنائي يدعم الوضعين؟", ["bg-white dark:bg-slate-900", "bg-white فقط", "dark:bg-white فقط", "text-black فقط"], 0]],
  },
  {
    t: "الانتقالات والتحويلات والحركة", d: "transition وtransform وanimate لحركات خفيفة وسلسة.",
    s: [["الانتقالات", "<p><code>transition</code> (أو <code>transition-colors</code>) مع <code>duration-300</code> و<code>ease-in-out</code> و<code>delay-100</code>. أضفها على الحالة الأساسية لا على hover فقط.</p>"],
        ["التحويلات والحركات", "<p><code>scale-105</code> <code>rotate-6</code> <code>-translate-y-1</code> <code>translate-x-2</code>. حركات جاهزة: <code>animate-spin</code> <code>animate-pulse</code> <code>animate-bounce</code> <code>animate-ping</code>. احترم من يفضل تقليل الحركة بـ <code>motion-safe:</code> و<code>motion-reduce:</code>.</p>"]],
    key: "غلّف الحركات بـ motion-safe: لاحترام تفضيل تقليل الحركة.",
    code: `<div class="flex items-center gap-4 p-6">
  <div id="card" class="rounded-xl bg-white p-4 shadow transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">مرّر هنا</div>
  <div class="size-8 rounded-full border-4 border-sky-200 border-t-sky-600 motion-safe:animate-spin"></div>
  <div class="size-4 rounded-full bg-emerald-500 motion-safe:animate-pulse"></div>
</div>`,
    exp: "<p>البطاقة ترتفع قليلًا وتزداد ظلالًا بسلاسة عند الحوم. الدائرة تدور فقط إن لم يفعّل المستخدم «تقليل الحركة».</p>",
    prompt: "غيّر <code>duration-300</code> إلى <code>duration-700</code> وقارن السرعة.", check: ["#card", "transition-duration", "0.3s"],
    q: [["أي فئة تحدد مدة الانتقال؟", ["duration-300", "time-300", "speed-300", "delay-only"], 0],
        ["لماذا نستخدم motion-safe:؟", ["لاحترام تفضيل المستخدم لتقليل الحركة", "لتسريع الحركة", "لإخفاء العنصر", "لتغيير اللون"], 0],
        ["ماذا يفعل hover:-translate-y-1؟", ["يرفع العنصر قليلًا عند الحوم", "يخفيه", "يعكسه", "يدوره"], 0]],
  },
  {
    t: "القيم الاعتباطية Arbitrary Values", d: "عندما لا يكفي المقياس الجاهز: w-[17rem] وbg-[#...] وخصائص كاملة.",
    s: [["الأقواس المربعة", "<p><code>w-[17rem]</code> <code>top-[117px]</code> <code>bg-[#0b6b78]</code> <code>grid-cols-[1fr_2fr]</code> (الشرطة السفلية تعني مسافة). للمتغيرات في v4: <code>w-(--sidebar-width)</code>.</p>"],
        ["خصائص اعتباطية و variants", "<p><code>[mask-type:luminance]</code> خاصية CSS كاملة. وvariants اعتباطية: <code>[&amp;>p]:mt-2</code> و<code>[@media(min-width:900px)]:flex</code>. استخدمها باعتدال: إن تكررت القيمة فأضفها إلى <code>@theme</code>.</p>"]],
    key: "القيمة المتكررة مكانها @theme، والاعتباطية للحالات الاستثنائية.",
    code: `<div class="space-y-3 p-4" style="--sidebar-width: 12rem">
  <div id="w" class="w-[17rem] rounded bg-[#0b6b78] p-2 text-white">w-[17rem] bg-[#0b6b78]</div>
  <div class="w-(--sidebar-width) rounded bg-slate-200 p-2">w-(--sidebar-width)</div>
  <div class="grid grid-cols-[1fr_2fr] gap-2"><div class="bg-amber-100 p-2">1fr</div><div class="bg-amber-200 p-2">2fr</div></div>
  <div class="[&>p]:mt-2 rounded border p-2"><p>فقرة أولى</p><p>فقرة ثانية</p></div>
</div>`,
    exp: "<p>الأقواس تتيح قيمًا غير موجودة في المقياس. الصيغة <code>w-(--sidebar-width)</code> تقرأ متغير CSS مباشرة (v4).</p>",
    prompt: "غيّر العرض الأول إلى <code>w-[20rem]</code> ولون الخلفية إلى <code>bg-[#7c3aed]</code>.", check: ["#w", "width", "272px"],
    q: [["ماذا تعني الشرطة السفلية داخل grid-cols-[1fr_2fr]؟", ["مسافة بين القيمتين", "نقص", "تعليق", "خطأ"], 0],
        ["متى تفضل @theme على القيم الاعتباطية؟", ["عندما تتكرر القيمة في أكثر من مكان", "عندما تُستخدم مرة واحدة", "عند كتابة نص", "لا تفضّل أبدًا"], 0],
        ["ما صيغة استعمال متغير CSS في v4؟", ["w-(--my-var)", "w-$my-var", "w-@my-var", "w-var"], 0]],
  },
  {
    t: "التخصيص بـ @theme", d: "عرّف ألوانك وخطوطك ونقاطك الفاصلة كمتغيرات تُولّد فئات تلقائيًا.",
    s: [["من config إلى CSS", "<p>في v4 يتم التخصيص داخل CSS عبر <code>@theme</code>: <code>--color-brand: #0b6b78;</code> يولّد <code>bg-brand</code> و<code>text-brand</code> و<code>border-brand</code> تلقائيًا. كذلك <code>--font-display</code> و<code>--breakpoint-3xl</code> و<code>--spacing</code> و<code>--radius-card</code>.</p>"],
        ["ألوان بدرجات", "<p>عرّف <code>--color-brand-500</code> و<code>--color-brand-700</code> لتحصل على فئات بدرجات. لإلغاء لوحة الألوان الافتراضية: <code>--color-*: initial;</code>.</p>"]],
    key: "كل متغير في @theme يولّد فئات الأدوات المقابلة له تلقائيًا.",
    code: `<style type="text/tailwindcss">
  @theme {
    --color-brand-500: #0b6b78;
    --color-brand-700: #095561;
    --radius-card: 1.25rem;
    --breakpoint-3xl: 100rem;
  }
</style>
<div class="p-4">
  <button id="b" class="rounded-card bg-brand-500 px-5 py-2 font-semibold text-white hover:bg-brand-700">زر بلون العلامة</button>
  <p class="mt-3 text-brand-700">نص بلون العلامة الداكن.</p>
</div>`,
    exp: "<p>المتغيرات <code>--color-brand-*</code> ولّدت فئات <code>bg-brand-500</code> و<code>text-brand-700</code> و<code>hover:bg-brand-700</code>، والمتغير <code>--radius-card</code> ولّد <code>rounded-card</code>.</p>",
    prompt: "أضف <code>--color-accent: #f59e0b;</code> واستخدم <code>bg-accent</code>.", check: ["#b", "background-color", "rgb(11, 107, 120)"],
    q: [["أين يتم التخصيص في Tailwind v4؟", ["داخل CSS عبر @theme", "في ملف tailwind.config.js فقط", "في HTML", "في JSON"], 0],
        ["ماذا يولّد --color-brand-500 داخل @theme؟", ["فئات مثل bg-brand-500 وtext-brand-500", "لا شيء", "ملفًا جديدًا", "خطأ"], 0],
        ["كيف نحذف ألوان Tailwind الافتراضية؟", ["--color-*: initial;", "delete colors", "colors: none", "@reset"], 0]],
  },
  {
    t: "@apply و @layer وإعادة الاستخدام", d: "متى نستخرج مكونًا، وكيف نكتب فئات مخصصة مع @apply.",
    s: [["الأفضل: مكوّنات", "<p>أول حل للتكرار هو <strong>مكوّن</strong> (قالب أو دالة في إطار عملك) لا فئة CSS جديدة. عندما لا يتوفر مكوّن (مثل HTML خام) استخدم <code>@layer components</code> مع <code>@apply</code>.</p>"],
        ["الصيغة", "<p><code>@layer components { .btn { @apply rounded-lg px-4 py-2 font-semibold; } }</code>. حافظ على قلة هذه الفئات وإلا فقدت فائدة Utility-First.</p>"]],
    key: "استخدم @apply بحذر: المكوّنات أولًا ثم الفئات المخصصة للضرورة.",
    code: `<style type="text/tailwindcss">
  @layer components {
    .btn {
      @apply rounded-lg px-4 py-2 font-semibold transition;
    }
    .btn-primary {
      @apply bg-sky-600 text-white hover:bg-sky-700;
    }
  }
</style>
<div class="flex gap-3 p-4">
  <button id="x" class="btn btn-primary">أساسي</button>
  <button class="btn bg-slate-200 text-slate-800 hover:bg-slate-300">ثانوي</button>
</div>`,
    exp: "<p>الفئتان <code>btn</code> و<code>btn-primary</code> جمعتا أدوات Tailwind في اسم واحد. ويمكن تجاوزها بفئات أدوات مباشرة عند الحاجة كما في الزر الثاني.</p>",
    prompt: "أضف <code>.btn-danger</code> بخلفية <code>bg-rose-600</code> واستخدمه.", check: ["#x", "padding-left", "16px"],
    q: [["ما أول حل لتكرار مجموعة الفئات؟", ["استخراج مكوّن", "نسخ ولصق دائمًا", "حذف التصميم", "كتابة JavaScript"], 0],
        ["أي طبقة نضع فيها فئات المكونات المخصصة؟", ["@layer components", "@layer reset", "@media", "@import url"], 0],
        ["ماذا تفعل @apply؟", ["تدرج أدوات Tailwind داخل قاعدة CSS مخصصة", "تحمل خطًا", "تنشئ مكوّن React", "تحذف الأدوات"], 0]],
  },
  {
    t: "النماذج وحالات الحقول", d: "Tailwind لا ينسق النماذج افتراضيًا: صمّم الحقول وحالات التركيز والخطأ بنفسك.",
    s: [["أساس الحقل", "<p>Preflight يزيل التنسيقات الافتراضية، فاكتب: <code>w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-hidden</code>. وللنص البديل <code>placeholder:text-slate-400</code>.</p>"],
        ["الحالات", "<p><code>invalid:border-rose-500</code> مع <code>required</code>، و<code>user-invalid:</code> (يظهر بعد تفاعل المستخدم)، و<code>disabled:bg-slate-100</code>، و<code>accent-sky-600</code> للخانات الأصلية.</p>"]],
    key: "اربط كل حقل بـ label، وأعطِ التركيز مؤشرًا بصريًا واضحًا.",
    code: `<form class="max-w-sm space-y-4 p-4" onsubmit="return false">
  <div>
    <label for="mail" class="mb-1 block text-sm font-medium text-slate-700">البريد</label>
    <input id="mail" type="email" required placeholder="name@example.com"
      class="w-full rounded-lg border border-slate-300 px-3 py-2 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-hidden user-invalid:border-rose-500">
  </div>
  <label class="flex items-center gap-2 text-sm"><input type="checkbox" class="size-4 accent-sky-600"> تذكرني</label>
  <button class="w-full rounded-lg bg-sky-600 py-2 font-semibold text-white hover:bg-sky-700">إرسال</button>
</form>`,
    exp: "<p>الحقل يحصل على حلقة زرقاء عند التركيز، وحدود حمراء عند كتابة بريد غير صالح بعد التفاعل (<code>user-invalid</code>).</p>",
    prompt: "أضف حقل كلمة مرور بنفس التنسيق مع label مرتبطة.", check: ["#mail", "border-top-width", "1px"],
    q: [["لماذا نحتاج تنسيق الحقول يدويًا؟", ["لأن Preflight يزيل تنسيقات المتصفح الافتراضية", "لأن Tailwind لا يدعم الحقول", "لأن الحقول محذوفة", "لا نحتاج"], 0],
        ["ما فائدة user-invalid؟", ["يظهر حالة الخطأ بعد تفاعل المستخدم", "يعطل الحقل", "يحذف الحقل", "يغير اللغة"], 0],
        ["ما الشرط عند إخفاء outline عن الحقل؟", ["توفير بديل مرئي كـ ring", "لا شرط", "حذف الـ label", "استخدام div"], 0]],
  },
  {
    t: "مشروع: بطاقات تسعير وأفضل الممارسات", d: "صفحة بطاقات تسعير متجاوبة، مع خطأ شائع يجب تجنبه: أسماء الفئات الديناميكية.",
    s: [["المشروع", "<p>نبني ثلاث بطاقات: أساسي، احترافي (مميز)، مؤسسات. شبكة <code>grid gap-6 md:grid-cols-3</code>، والبطاقة المميزة بحلقة <code>ring-2</code>، وأزرار بحالات hover وfocus، ودعم الوضع الداكن.</p>"],
        ["تجنّب الأسماء الديناميكية", "<p>Tailwind يبحث عن أسماء الفئات <strong>كاملة كنص</strong> في ملفاتك. لذلك الكود <code>`bg-${color}-500`</code> لن يولّد شيئًا، بل اكتب الأسماء كاملة أو اربطها بخريطة: <code>{ red: \"bg-red-500\", blue: \"bg-blue-500\" }</code>.</p>"],
        ["قائمة مراجعة", "<ul><li>ترتيب ثابت للفئات (مثلًا بإضافة Prettier plugin).</li><li>استخدم <code>@theme</code> للقيم المتكررة.</li><li>اختبر التباين والوضع الداكن والتركيز.</li><li>أضف نسخة بناء حقيقية للإنتاج بدل نسخة المتصفح.</li></ul>"]],
    key: "اكتب أسماء الفئات كاملة في الكود ولا تبنِها بدمج نصوص.",
    code: `<section class="grid gap-6 p-6 md:grid-cols-3">
  <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-bold text-slate-900">أساسي</h2>
    <p class="mt-2 text-4xl font-extrabold text-slate-900">0<span class="text-base font-medium text-slate-500"> / شهر</span></p>
    <ul class="mt-4 space-y-2 text-sm text-slate-600"><li>دروس مجانية</li><li>تتبع التقدم</li></ul>
    <button class="mt-6 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-700">ابدأ</button>
  </article>
  <article id="pro" class="rounded-2xl border border-sky-500 bg-white p-6 shadow-lg ring-2 ring-sky-500">
    <p class="text-xs font-bold uppercase tracking-wide text-sky-700">الأكثر اختيارًا</p>
    <h2 class="mt-1 text-lg font-bold text-slate-900">احترافي</h2>
    <p class="mt-2 text-4xl font-extrabold text-slate-900">9<span class="text-base font-medium text-slate-500"> / شهر</span></p>
    <ul class="mt-4 space-y-2 text-sm text-slate-600"><li>كل المميزات الأساسية</li><li>شهادات إتمام</li></ul>
    <button class="mt-6 w-full rounded-lg bg-sky-600 py-2 font-semibold text-white hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">اشترك</button>
  </article>
  <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-bold text-slate-900">مؤسسات</h2>
    <p class="mt-2 text-4xl font-extrabold text-slate-900">تواصل</p>
    <ul class="mt-4 space-y-2 text-sm text-slate-600"><li>إدارة فرق</li><li>دعم مخصص</li></ul>
    <button class="mt-6 w-full rounded-lg bg-slate-900 py-2 font-semibold text-white hover:bg-slate-700">اتصل بنا</button>
  </article>
</section>`,
    exp: "<p>الشبكة تصبح عمودًا واحدًا على الهاتف وثلاثة أعمدة من <code>md</code>. البطاقة المميزة تتميز بحلقة وظل أكبر. جرّب تحويلها لوضع داكن بإضافة <code>dark:</code> لكل لون.</p>",
    prompt: "أضف <code>dark:bg-slate-800 dark:text-white</code> للبطاقات واجعل نسخة داكنة كاملة.", check: ["#pro", "border-top-width", "1px"],
    q: [["لماذا لا يعمل الكود bg-${color}-500 في Tailwind؟", ["لأن Tailwind يكتشف أسماء الفئات الكاملة كنص ولا ينفذ الكود", "لأن الأسماء قصيرة", "لأن color محجوزة", "يعمل دائمًا"], 0],
        ["كيف نحل مشكلة الألوان الديناميكية؟", ["نكتب أسماء الفئات كاملة أو نستخدم خريطة بأسماء كاملة", "نستخدم eval", "نحذف الألوان", "نغير المتصفح"], 0],
        ["ما الأفضل للإنتاج؟", ["بناء Tailwind الحقيقي بدل نسخة المتصفح", "نسخة المتصفح دائمًا", "عدم استخدام Tailwind", "تحميل كل الألوان"], 0]],
  },
];
