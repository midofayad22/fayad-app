// Tailwind CSS v4 lessons 1-10. `check` = [selector, cssProperty, expectedComputedValue] verified in the sandboxed preview
// (tests/tw-engine.test.mjs), so every claim about a utility is checked against the real compiler.
export const A = [
  {
    t: "مقدمة: فلسفة Utility-First وطرق الإعداد", d: "ما هو Tailwind CSS، ولماذا نكتب الفئات الصغيرة مباشرة في HTML، وكيف نبدأ.",
    s: [["Utility-First", "<p>بدل كتابة ملف CSS وتسمية الفئات، تركّب الواجهة من <strong>فئات صغيرة بغرض واحد</strong>: <code>p-4</code> حشوة، <code>text-lg</code> حجم خط، <code>bg-sky-600</code> خلفية. كل فئة تقابل خاصية CSS واحدة تقريبًا، فتبقى التصاميم متسقة دون مغادرة ملف HTML.</p>"],
        ["كيف نبدأ (الإصدار 4)", "<p>هذا الكورس مبني على <strong>Tailwind CSS v4</strong> (المثبت في المعاينة 4.3.3). في المشاريع الحقيقية تثبّت Tailwind وتضيف في ملف CSS السطر <code>@import \"tailwindcss\";</code> (عبر إضافة Vite أو واجهة الأوامر). أما هنا فالمعاينة تستخدم نسخة <strong>المتصفح</strong> التي تحوّل الفئات إلى CSS لحظيًا، وهي للتجربة والتعلم فقط، لا للإنتاج.</p>"]],
    key: "فئة صغيرة لكل غرض، وتركّبها في HTML. الإصدار 4 يبدأ بـ @import \"tailwindcss\".",
    code: `<div id="card" class="m-6 max-w-sm rounded-xl bg-white p-6 shadow-lg">
  <h1 class="text-xl font-bold text-slate-900">أول بطاقة Tailwind</h1>
  <p class="mt-2 text-slate-600">بدون أي سطر CSS مكتوب يدويًا.</p>
  <button class="mt-4 rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white">ابدأ</button>
</div>`,
    exp: "<p><code>p-6</code> حشوة 1.5rem، <code>rounded-xl</code> زوايا دائرية، <code>shadow-lg</code> ظل كبير، <code>mt-2</code> هامش علوي، و<code>px-4 py-2</code> حشوة أفقية ورأسية للزر.</p>",
    prompt: "غيّر لون الزر إلى <code>bg-emerald-600</code> وزد الحشوة إلى <code>px-6</code>.", check: ["#card", "padding-top", "24px"],
    q: [["ما فكرة Utility-First؟", ["تركيب الواجهة من فئات صغيرة بغرض واحد", "كتابة CSS ضخم لكل صفحة", "استخدام JavaScript لكل نمط", "تجنب HTML"], 0],
        ["ما السطر الذي يبدأ به Tailwind v4 في ملف CSS؟", ["@import \"tailwindcss\";", "@tailwind base;", "import tailwind", "<tailwind>"], 0],
        ["لماذا نسخة المتصفح مناسبة للتعلم فقط؟", ["تحوّل الفئات داخل المتصفح لحظيًا وهو غير مثالي للأداء في الإنتاج", "لأنها لا تعمل أبدًا", "لأنها مدفوعة", "لأنها بدون ألوان"], 0]],
  },
  {
    t: "المسافات: padding و margin و gap", d: "مقياس المسافات في Tailwind: كل وحدة تساوي 0.25rem.",
    s: [["المقياس", "<p>في v4 تُشتق كل المسافات من متغير واحد <code>--spacing: 0.25rem</code>. لذلك <code>p-1</code> = 0.25rem و<code>p-4</code> = 1rem و<code>p-8</code> = 2rem، وأي رقم يعمل (<code>p-13</code> = 3.25rem).</p>"],
        ["الصيغ", "<p><code>p</code> حشوة، <code>m</code> هامش، مع الاتجاه: <code>t</code> <code>b</code> <code>x</code> <code>y</code> وللمنطقي <code>s</code> (بداية) و<code>e</code> (نهاية) مثل <code>ps-4</code> <code>me-2</code>. <code>gap-*</code> للمسافة بين عناصر flex/grid، و<code>space-x-*</code> للمسافة بين الأبناء. الهامش السالب: <code>-mt-2</code>. <code>mx-auto</code> للتوسيط.</p>"]],
    key: "رقم المسافة × 0.25rem. استخدم s/e بدل l/r لتدعم RTL.",
    code: `<div class="p-4">
  <div id="a" class="mb-4 bg-slate-100 p-4">p-4 = 1rem</div>
  <div id="b" class="mb-4 bg-slate-100 px-8 py-2">px-8 py-2</div>
  <div id="c" class="ms-8 bg-slate-100 p-3">ms-8 (هامش من البداية)</div>
  <div class="mt-4 flex gap-3"><span class="bg-amber-200 p-2">1</span><span class="bg-amber-200 p-2">2</span></div>
</div>`,
    exp: "<p><code>p-4</code> يعطي 16px لأن 4 × 0.25rem = 1rem. و<code>px-8</code> يعطي 32px أفقيًا. <code>gap-3</code> يضع 12px بين العنصرين.</p>",
    prompt: "اجعل الحشوة الأفقية للعنصر الثاني <code>px-12</code> ثم جرّب <code>-mt-2</code> على الثالث.", check: ["#b", "padding-left", "32px"],
    q: [["كم تساوي p-4؟", ["1rem (16px)", "4px", "4rem", "0.4rem"], 0],
        ["أي فئة تضع هامشًا من بداية العنصر بما يناسب RTL؟", ["ms-4", "ml-4", "mt-4", "mb-4"], 0],
        ["ما وظيفة gap-3؟", ["مسافة بين عناصر flex/grid", "حشوة داخل العنصر", "عرض العنصر", "لون الحدود"], 0]],
  },
  {
    t: "الألوان والشفافية", d: "لوحة الألوان بدرجاتها من 50 إلى 950 وطريقة التحكم في الشفافية.",
    s: [["اللوحة", "<p>لكل لون درجات: <code>50, 100, 200 … 900, 950</code>. الصيغة: <code>bg-{لون}-{درجة}</code> و<code>text-</code> و<code>border-</code> و<code>ring-</code> و<code>fill-</code>. مثل <code>bg-sky-600</code> و<code>text-slate-700</code>. ألوان خاصة: <code>white</code> <code>black</code> <code>transparent</code> <code>current</code>.</p>"],
        ["الشفافية", "<p>أضف <code>/نسبة</code> بعد اللون: <code>bg-black/50</code> و<code>text-sky-700/80</code>. وللعنصر كله <code>opacity-50</code>. اختر درجات متباعدة (مثل 50 للخلفية و800 للنص) لضمان التباين.</p>"]],
    key: "bg-sky-600/50 يعني اللون نفسه بشفافية 50%. تأكد من تباين كافٍ بين النص والخلفية.",
    code: `<div class="space-y-3 p-4">
  <div class="rounded bg-sky-100 p-3 text-sky-900">خلفية فاتحة بنص داكن</div>
  <div class="rounded bg-slate-800 p-3 text-white">خلفية داكنة بنص أبيض</div>
  <div class="rounded bg-black/10 p-3">أسود بشفافية 10%</div>
  <div id="o" class="rounded bg-emerald-500 p-3 opacity-50">opacity-50</div>
</div>`,
    exp: "<p>الدرجات القريبة من 50 فاتحة، والقريبة من 900 داكنة. <code>/10</code> يغير شفافية اللون فقط، أما <code>opacity-50</code> فتؤثر على العنصر ومحتواه.</p>",
    prompt: "اجعل الخلفية الأولى <code>bg-rose-100</code> والنص <code>text-rose-900</code>.", check: ["#o", "opacity", "0.5"],
    q: [["ماذا يعني bg-black/50؟", ["خلفية سوداء بشفافية 50%", "خلفية بعرض 50", "50 عنصرًا أسود", "ظل أسود"], 0],
        ["أي ثنائي يعطي تباينًا جيدًا؟", ["bg-slate-800 مع text-white", "bg-sky-100 مع text-white", "bg-white مع text-yellow-100", "bg-gray-300 مع text-gray-400"], 0],
        ["ما الفرق بين bg-black/50 و opacity-50؟", ["الأولى للون الخلفية فقط والثانية للعنصر كله", "لا فرق", "الثانية للون فقط", "الأولى تخفي العنصر"], 0]],
  },
  {
    t: "الطباعة", d: "أحجام الخطوط والأوزان وارتفاع السطر والمحاذاة والتقليم.",
    s: [["الأساسيات", "<ul><li>الحجم: <code>text-xs</code> <code>text-sm</code> <code>text-base</code> <code>text-lg</code> … <code>text-9xl</code>.</li><li>الوزن: <code>font-light</code> <code>font-normal</code> <code>font-semibold</code> <code>font-bold</code>.</li><li>ارتفاع السطر: <code>leading-tight</code> <code>leading-relaxed</code> أو <code>leading-7</code>.</li><li>التباعد: <code>tracking-wide</code>.</li><li>المحاذاة: <code>text-start</code> <code>text-center</code> <code>text-end</code>.</li></ul>"],
        ["أدوات مفيدة", "<p><code>truncate</code> لقص النص بنقاط، <code>line-clamp-2</code> لعدد أسطر محدد، <code>text-balance</code> لتوازن العناوين، <code>uppercase</code> و<code>italic</code> و<code>underline</code> و<code>decoration-sky-500</code>.</p>"]],
    key: "اجمع الحجم والوزن وارتفاع السطر لتحصل على تسلسل بصري واضح.",
    code: `<article class="max-w-md p-4">
  <h1 id="h" class="text-3xl font-bold leading-tight tracking-tight text-slate-900">عنوان رئيسي كبير</h1>
  <p class="mt-2 text-base leading-relaxed text-slate-600">فقرة بحجم أساسي وارتفاع سطر مريح تسهّل القراءة الطويلة.</p>
  <p class="mt-2 line-clamp-1 text-sm text-slate-500">هذا النص الطويل جدًا سيُقص عند سطر واحد فقط مهما كان طوله، ويظهر بعده ثلاث نقاط توضح أن هناك بقية للنص.</p>
  <a class="mt-2 inline-block text-sky-700 underline decoration-sky-300 underline-offset-4" href="#">رابط مسطر</a>
</article>`,
    exp: "<p><code>text-3xl</code> يضبط الحجم (1.875rem) وارتفاع السطر معه. <code>line-clamp-1</code> يقص عند سطر واحد.</p>",
    prompt: "غيّر العنوان إلى <code>text-5xl</code> وأضف <code>uppercase</code> للفقرة الأولى.", check: ["#h", "font-weight", "700"],
    q: [["أي فئة تقص النص بسطر واحد وتضيف نقاطًا؟", ["truncate", "line-through", "text-wrap", "break-all"], 0],
        ["ما وظيفة leading-relaxed؟", ["زيادة ارتفاع السطر لراحة القراءة", "تكبير الخط", "تغيير اللون", "تقليل الوزن"], 0],
        ["أي فئة تجعل الخط عريضًا؟", ["font-bold", "text-bold", "weight-700", "bold"], 0]],
  },
  {
    t: "الأحجام: العرض والارتفاع", d: "w وh وsize وmax-w وmin-h والكسور والقيم الخاصة.",
    s: [["العرض والارتفاع", "<p>نفس مقياس المسافات: <code>w-16</code> = 4rem. كسور: <code>w-1/2</code> <code>w-2/3</code>. كلمات: <code>w-full</code> <code>w-screen</code> <code>w-fit</code> <code>w-auto</code>. وللمربع <code>size-12</code> (عرض وارتفاع معًا).</p>"],
        ["الحدود", "<p><code>max-w-sm|md|lg|xl|2xl…</code> لتحديد أقصى عرض للمحتوى النصي، و<code>min-h-screen</code> لارتفاع لا يقل عن الشاشة، و<code>aspect-video</code> لنسبة 16/9.</p>"]],
    key: "استخدم max-w بدل w الثابت ليتجاوب العنصر مع الشاشات الصغيرة.",
    code: `<div class="space-y-3 p-4">
  <div id="half" class="w-1/2 bg-sky-200 p-2">w-1/2</div>
  <div class="size-16 bg-amber-300"></div>
  <div id="mx" class="max-w-xs bg-slate-200 p-2">max-w-xs: لا يتجاوز 20rem مهما كبرت الشاشة.</div>
  <div class="aspect-video w-48 bg-emerald-200"></div>
</div>`,
    exp: "<p><code>size-16</code> يعطي عنصرًا مربعًا 4rem × 4rem. <code>aspect-video</code> يحافظ على نسبة العرض للارتفاع.</p>",
    prompt: "اجعل العنصر الأول <code>w-2/3</code> وأضف عنصرًا بـ <code>h-24 w-full</code>.", check: ["#mx", "max-width", "320px"],
    q: [["ماذا يعني w-1/2؟", ["عرض 50% من الأب", "عرض 1 بكسل", "نصف الارتفاع", "نصف الشاشة دائمًا"], 0],
        ["أي فئة تجعل العرض والارتفاع متساويين بسطر واحد؟", ["size-12", "wh-12", "square-12", "box-12"], 0],
        ["لماذا نفضل max-w على w ثابت؟", ["ليتقلص العنصر على الشاشات الصغيرة", "لأنها أسرع", "لأنها تغير اللون", "لا فرق"], 0]],
  },
  {
    t: "Flexbox", d: "تخطيطات الصف والعمود والمحاذاة والتوزيع.",
    s: [["الأساسيات", "<p><code>flex</code> للحاوية، <code>flex-col</code> للاتجاه الرأسي، <code>flex-wrap</code> للالتفاف، <code>items-start|center|end|stretch</code> للمحور العرضي، <code>justify-start|center|between|around|evenly</code> للمحور الرئيسي، و<code>gap-*</code> للمسافات.</p>"],
        ["على العناصر", "<p><code>flex-1</code> لتمدد العنصر ليملأ المتاح، <code>shrink-0</code> لمنع الانكماش، <code>grow</code>، <code>order-*</code>، <code>ms-auto</code> لدفع العنصر إلى النهاية.</p>"]],
    key: "flex + items-center + justify-between + gap تغطي معظم الحالات.",
    code: `<nav id="nav" class="flex items-center justify-between gap-4 bg-slate-900 px-4 py-3 text-white">
  <span class="font-bold">FAYAD</span>
  <div class="flex gap-4 text-sm"><a href="#">الدورات</a><a href="#">المدونة</a></div>
  <button class="rounded bg-sky-500 px-3 py-1 text-sm font-semibold">دخول</button>
</nav>
<div class="mt-4 flex flex-col gap-2 p-4 sm:flex-row">
  <div class="flex-1 bg-slate-100 p-3">يتمدد</div>
  <div class="shrink-0 bg-slate-200 p-3">ثابت</div>
</div>`,
    exp: "<p>الشريط يوزع العناصر على الأطراف ويحاذيها عموديًا. الحاوية الثانية عمودية على الشاشة الصغيرة وأفقية من <code>sm</code>.</p>",
    prompt: "اجعل الشريط <code>justify-center</code> ثم أرجعه <code>justify-between</code>.", check: ["#nav", "justify-content", "space-between"],
    q: [["أي فئة تحاذي العناصر عموديًا في flex أفقي؟", ["items-center", "justify-center", "text-center", "place-center فقط"], 0],
        ["ماذا تفعل flex-1؟", ["تجعل العنصر يتمدد ليملأ المساحة المتاحة", "تثبت عرضه 1px", "تعكس الاتجاه", "تخفيه"], 0],
        ["ماذا يعني sm:flex-row؟", ["يصبح الاتجاه أفقيًا من نقطة sm فما فوق", "أفقي دائمًا", "رأسي دائمًا", "مخفي على sm"], 0]],
  },
  {
    t: "Grid", d: "شبكات ثنائية الأبعاد بأعمدة وصفوف وامتداد الخلايا.",
    s: [["الأعمدة والصفوف", "<p><code>grid grid-cols-3 gap-4</code> ثلاثة أعمدة متساوية. <code>col-span-2</code> يمتد عمودين، و<code>row-span-2</code> صفين. أعمدة تلقائية متجاوبة: <code>grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]</code>.</p>"],
        ["المحاذاة", "<p><code>place-items-center</code> لتوسيط الخلايا، <code>justify-items</code> و<code>items-*</code>، و<code>auto-rows-fr</code> لصفوف متساوية الارتفاع.</p>"]],
    key: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 نمط شائع لشبكة متجاوبة.",
    code: `<div id="g" class="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
  <div class="col-span-2 bg-sky-200 p-4">col-span-2</div>
  <div class="bg-sky-100 p-4">1</div>
  <div class="bg-sky-100 p-4">2</div>
  <div class="bg-sky-100 p-4">3</div>
  <div class="bg-sky-100 p-4">4</div>
  <div class="col-span-2 bg-sky-200 p-4 md:col-span-4">كامل العرض من md</div>
</div>`,
    exp: "<p>على الشاشة الصغيرة عمودان، ومن <code>md</code> أربعة أعمدة. العنصر الأخير يمتد على كل الأعمدة الأربعة بـ <code>md:col-span-4</code>.</p>",
    prompt: "غيّر <code>md:grid-cols-4</code> إلى <code>md:grid-cols-3</code> وراقب إعادة التوزيع.", check: ["#g", "display", "grid"],
    q: [["ما الفئة التي تنشئ ثلاثة أعمدة متساوية؟", ["grid grid-cols-3", "grid-3", "cols-3", "flex-3"], 0],
        ["ماذا تفعل col-span-2؟", ["تجعل الخلية تمتد عمودين", "تضاعف عدد الأعمدة", "تخفي عمودين", "تغير الحدود"], 0],
        ["ما فائدة gap في grid؟", ["المسافة بين الخلايا", "لون الخلايا", "عدد الصفوف", "عرض الصفحة"], 0]],
  },
  {
    t: "التموضع والـ container وترتيب الطبقات", d: "relative وabsolute وsticky وinset وz-index والتجاوز.",
    s: [["Position", "<p><code>relative</code> <code>absolute</code> <code>fixed</code> <code>sticky</code> مع <code>inset-0</code> <code>top-0</code> <code>start-0</code> <code>end-4</code> (المنطقية). العنصر المطلق يتمركز بالنسبة لأقرب أب <code>relative</code>.</p>"],
        ["z-index والتجاوز", "<p><code>z-10</code> <code>z-50</code> لترتيب الطبقات. <code>overflow-hidden</code> و<code>overflow-auto</code> لقص أو تمرير المحتوى. <code>container</code> يحدد أقصى عرض حسب النقطة الفاصلة، ويُستخدم عادة مع <code>mx-auto px-4</code>.</p>"]],
    key: "اجعل الأب relative قبل وضع عنصر absolute بداخله.",
    code: `<div class="container mx-auto px-4 py-6">
  <div id="wrap" class="relative h-32 overflow-hidden rounded-xl bg-slate-200">
    <span class="absolute end-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">جديد</span>
    <div class="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-sm text-white">شريط سفلي</div>
  </div>
  <div class="sticky top-0 z-10 mt-4 bg-white p-2 shadow">شريط لاصق (sticky)</div>
</div>`,
    exp: "<p>الشارة والشريط السفلي مطلقان داخل الأب النسبي. <code>inset-x-0</code> يمدّد الشريط أفقيًا. <code>overflow-hidden</code> يقص ما يخرج عن الزوايا الدائرية.</p>",
    prompt: "انقل الشارة إلى أسفل البداية بـ <code>start-3 bottom-3</code>.", check: ["#wrap", "position", "relative"],
    q: [["ما الذي يجعل absolute يتمركز داخل الأب؟", ["أن يكون الأب relative", "أن يكون الأب flex", "وجود z-10", "وجود gap"], 0],
        ["ماذا تفعل inset-0؟", ["top/right/bottom/left = 0", "تضيف حدودًا", "تغير اللون", "تخفي العنصر"], 0],
        ["ما فائدة overflow-hidden مع rounded؟", ["قص المحتوى الخارج عن الزوايا الدائرية", "تكبير الصورة", "تحريك العنصر", "تعطيل التمرير فقط دائمًا"], 0]],
  },
  {
    t: "الحدود والظلال والحلقات", d: "border وrounded وshadow وring وoutline (مع تغييرات الإصدار 4).",
    s: [["الحدود والزوايا", "<p><code>border</code> <code>border-2</code> <code>border-t</code> <code>border-slate-300</code> <code>divide-y</code> بين العناصر. الزوايا: <code>rounded</code> <code>rounded-lg</code> <code>rounded-full</code>.</p>"],
        ["الظلال والحلقات", "<p><code>shadow-xs</code> <code>shadow-sm</code> <code>shadow-md</code> <code>shadow-lg</code>. الحلقة <code>ring-2 ring-sky-500</code> تُرسم خارج العنصر بلا تأثير على التخطيط وهي شائعة لحالات التركيز. في v4 الحلقة الافتراضية <code>ring</code> بعرض 1px، ولإخفاء الإطار الافتراضي للتركيز استعمل <code>outline-hidden</code> (بدل outline-none القديمة) مع بديل مرئي.</p>"]],
    key: "لا تُخفِ مؤشر التركيز دون بديل مرئي (ring) لإمكانية الوصول.",
    code: `<div class="space-y-4 p-4">
  <div id="b" class="rounded-lg border-2 border-sky-500 p-3">border-2 rounded-lg</div>
  <div class="rounded-xl p-3 shadow-md">shadow-md</div>
  <button class="rounded-lg bg-white px-4 py-2 ring-2 ring-sky-500 ring-offset-2">ring-2</button>
  <ul class="divide-y divide-slate-200 rounded-lg border border-slate-200">
    <li class="p-3">عنصر 1</li><li class="p-3">عنصر 2</li><li class="p-3">عنصر 3</li>
  </ul>
</div>`,
    exp: "<p><code>divide-y</code> تضيف خطًا فاصلًا بين الأبناء دون كتابة حدود لكل عنصر. الحلقة لا تغير أبعاد الزر لأنها ظل خارجي.</p>",
    prompt: "غيّر الحدود إلى <code>border-4 border-dashed</code>.", check: ["#b", "border-top-width", "2px"],
    q: [["ما ميزة ring مقارنة بـ border؟", ["لا تؤثر على أبعاد العنصر", "أسرع دائمًا", "تلون الخلفية", "تعمل مع النص فقط"], 0],
        ["ماذا تفعل divide-y؟", ["تضع خطًا فاصلًا بين العناصر الأبناء رأسيًا", "تقسم الشاشة", "تخفي الحدود", "تلون الخلفية"], 0],
        ["ما الحذر عند إخفاء outline الافتراضي؟", ["يجب توفير بديل مرئي مثل ring للتركيز", "لا حذر", "يتعطل الزر", "يتغير الخط"], 0]],
  },
];
