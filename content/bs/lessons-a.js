// Bootstrap 5.3 lessons 1-10 (compact authoring format, expanded by index.js). `check` = selector that must exist after the
// snippet renders in the sandboxed preview (verified by tests/bs-content.test.mjs).
export const A = [
  {
    t: "مقدمة: ما هو Bootstrap وكيف نبدأ", d: "إطار CSS/JS جاهز لبناء واجهات متجاوبة بسرعة، مع الصفحة الأولى بخطوات الإعداد الصحيحة.",
    s: [["ما هو Bootstrap؟", "<p><strong>Bootstrap</strong> مكتبة مفتوحة المصدر توفر ملف CSS جاهزًا (أزرار، شبكة، نماذج، مكونات) وملف JavaScript للمكونات التفاعلية. تكتب <strong>فئات (classes)</strong> على عناصر HTML بدل كتابة CSS من الصفر. هذا الكورس مبني على الإصدار <strong>5.3</strong> (المثبت محليًا في المعاينة: 5.3.8).</p>"],
        ["الإعداد الأساسي", "<p>أي صفحة Bootstrap تحتاج: <code>&lt;!doctype html&gt;</code> و<code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code> (أساس التجاوب)، ورابط ملف CSS، ثم ملف <code>bootstrap.bundle.min.js</code> في آخر الصفحة إن استخدمت المكونات التفاعلية. المعاينة هنا تضيف هذه الملفات لك تلقائيًا.</p>"]],
    key: "اكتب الفئات على العناصر، ولا تنسَ وسم viewport وإلا لن يتجاوب التصميم على الهاتف.",
    code: `<div class="container py-4">
  <h1 class="display-6">مرحبًا Bootstrap</h1>
  <p class="lead">هذه صفحتي الأولى بدون كتابة CSS.</p>
  <button type="button" class="btn btn-primary">زر أساسي</button>
</div>`,
    exp: "<p><code>container</code> يمركز المحتوى ويحدد عرضه، و<code>py-4</code> يضيف حشوة رأسية، و<code>display-6</code> و<code>lead</code> فئات للنصوص، و<code>btn btn-primary</code> يحول العنصر إلى زر ملوّن.</p>",
    prompt: "غيّر لون الزر إلى <code>btn-success</code> وأضف زرًا ثانيًا بفئة <code>btn-outline-secondary</code>.", check: ".btn.btn-primary",
    q: [["ما الوسم الضروري لعمل التصميم المتجاوب على الهاتف؟", ["meta viewport", "meta charset فقط", "link rel=icon", "script defer"], 0],
        ["كيف نستخدم Bootstrap أساسًا؟", ["بإضافة فئات جاهزة إلى عناصر HTML", "بكتابة Sass يدويًا دائمًا", "بتحويل HTML إلى PDF", "بتثبيت برنامج على الجهاز"], 0],
        ["أي ملف يلزم للمكونات التفاعلية مثل Modal وDropdown؟", ["bootstrap.bundle.min.js", "bootstrap.min.css فقط", "favicon.ico", "robots.txt"], 0]],
  },
  {
    t: "الحاويات والنقاط الفاصلة", d: "container وcontainer-fluid والنقاط الفاصلة (breakpoints) التي تبني عليها كل الفئات المتجاوبة.",
    s: [["Containers", "<p><code>.container</code> عرضه ثابت يتغير عند كل نقطة فاصلة، و<code>.container-fluid</code> بعرض 100% دائمًا، و<code>.container-md</code> وأخواتها تكون 100% حتى النقطة المحددة ثم تصبح ثابتة.</p>"],
        ["Breakpoints", "<p>النقاط الفاصلة (mobile-first): <strong>sm ≥576px</strong>، <strong>md ≥768px</strong>، <strong>lg ≥992px</strong>، <strong>xl ≥1200px</strong>، <strong>xxl ≥1400px</strong>. الفئة بدون نقطة (مثل <code>col-6</code>) تنطبق من أصغر الشاشات، والفئة مع نقطة (<code>col-md-6</code>) تنطبق من تلك النقطة فصاعدًا.</p>"]],
    key: "Bootstrap mobile-first: الفئة بدون نقطة تنطبق دائمًا، والمتجاوبة تنطبق من النقطة وما فوقها.",
    code: `<div class="container bg-light border py-2 mb-3">.container</div>
<div class="container-fluid bg-light border py-2 mb-3">.container-fluid</div>
<div class="container-md bg-light border py-2">.container-md</div>`,
    exp: "<p>غيّر عرض المعاينة أو افتح الصفحة على شاشات مختلفة: الحاوية الأولى تتغير عرضها عند النقاط الفاصلة، والثانية تملأ العرض، والثالثة تملأ العرض حتى 768px.</p>",
    prompt: "أضف حاوية رابعة بالفئة <code>container-lg</code> واكتب بداخلها اسم الفئة.", check: ".container-fluid",
    q: [["عند أي عرض تبدأ النقطة md؟", ["768px", "576px", "992px", "1200px"], 0],
        ["ما الفرق بين container وcontainer-fluid؟", ["الأول عرض ثابت حسب النقطة والثاني 100% دائمًا", "لا فرق", "الثاني للجوال فقط", "الأول للطباعة"], 0],
        ["ماذا تعني mobile-first؟", ["الأنماط الأساسية للشاشات الصغيرة وتُوسَّع بالنقاط للأكبر", "التصميم للحاسوب أولًا", "حذف الشاشات الصغيرة", "لا تدعم الجوال"], 0]],
  },
  {
    t: "نظام الشبكة (Grid)", d: "12 عمودًا، صفوف وأعمدة، وتغيير التخطيط حسب حجم الشاشة.",
    s: [["الفكرة", "<p>الصف <code>.row</code> داخل حاوية يقسم العرض إلى <strong>12 جزءًا</strong>. العمود <code>.col-N</code> يشغل N جزءًا. إذا لم تحدد رقمًا (<code>.col</code>) توزع الأعمدة العرض بالتساوي.</p>"],
        ["أعمدة متجاوبة", "<p>اجمع فئات لعدة نقاط: <code>col-12 col-md-6 col-lg-4</code> = عمود كامل على الهاتف، نصف على الجهاز اللوحي، ثلث على الشاشات الكبيرة. إذا تجاوز مجموع الأعمدة 12 ينتقل الزائد إلى سطر جديد.</p>"]],
    key: "الصف يحتوي أعمدة فقط، والأعمدة مجموعها 12 في السطر الواحد.",
    code: `<div class="container text-center">
  <div class="row g-2">
    <div class="col-12 col-md-6 col-lg-4"><div class="p-3 bg-primary-subtle border">1</div></div>
    <div class="col-12 col-md-6 col-lg-4"><div class="p-3 bg-primary-subtle border">2</div></div>
    <div class="col-12 col-md-12 col-lg-4"><div class="p-3 bg-primary-subtle border">3</div></div>
  </div>
</div>`,
    exp: "<p>على الهاتف كل عمود في سطر. من md يتجاور 1 و2 ويأخذ الثالث سطرًا كاملًا. من lg تصبح الأعمدة الثلاثة في سطر واحد. <code>g-2</code> يضبط المسافة بين الأعمدة.</p>",
    prompt: "اجعل الصف يحتوي أربعة أعمدة متساوية على الشاشات الكبيرة باستخدام <code>col-lg-3</code>.", check: ".row .col-lg-4",
    q: [["كم عمودًا في شبكة Bootstrap؟", ["12", "10", "16", "24"], 0],
        ["ماذا تعني col-12 col-md-6؟", ["عمود كامل على الهاتف ونصف العرض من md فما فوق", "نصف العرض دائمًا", "مخفي على الهاتف", "عمودان معًا"], 0],
        ["ماذا يحدث إذا زاد مجموع الأعمدة عن 12 في الصف؟", ["ينتقل الزائد إلى سطر جديد", "يحدث خطأ", "تُحذف الأعمدة", "تتداخل"], 0]],
  },
  {
    t: "الشبكة المتقدمة: المسافات والترتيب والتداخل", d: "gutters وoffset وorder والصفوف المتداخلة والأعمدة المتساوية بـ row-cols.",
    s: [["Gutters", "<p>المسافة بين الأعمدة تُضبط بفئات <code>g-*</code> (أفقي ورأسي) أو <code>gx-*</code> و<code>gy-*</code>. القيم من 0 إلى 5.</p>"],
        ["Offset وOrder وNesting", "<ul><li><code>offset-md-2</code> يزيح العمود بمقدار عمودين.</li><li><code>order-1</code>…<code>order-5</code> يغير ترتيب العرض (وليس ترتيب HTML المقروء بقارئ الشاشة).</li><li>يمكن وضع <code>.row</code> جديدة داخل عمود لتقسيمه.</li><li><code>row-cols-2 row-cols-md-4</code> يحدد عدد الأعمدة لكل صف دون كتابة <code>col-*</code> لكل عنصر.</li></ul>"]],
    key: "الترتيب البصري عبر order لا يغير ترتيب القراءة لقارئ الشاشة، فاستخدمه بحذر.",
    code: `<div class="container">
  <div class="row row-cols-2 row-cols-md-4 g-3 mb-3">
    <div class="col"><div class="p-2 border bg-light">A</div></div>
    <div class="col"><div class="p-2 border bg-light">B</div></div>
    <div class="col"><div class="p-2 border bg-light">C</div></div>
    <div class="col"><div class="p-2 border bg-light">D</div></div>
  </div>
  <div class="row">
    <div class="col-md-4 offset-md-4 order-2 order-md-1"><div class="p-2 border bg-warning-subtle">Offset</div></div>
    <div class="col-md-4 order-1 order-md-2">
      <div class="row"><div class="col-6"><div class="p-1 border">متداخل</div></div><div class="col-6"><div class="p-1 border">متداخل</div></div></div>
    </div>
  </div>
</div>`,
    exp: "<p><code>row-cols-*</code> تحدد عدد الأعمدة في الصف. العمود الثاني يحتوي صفًا داخليًا. الترتيب يتبدل على الهاتف بفضل <code>order-1</code> و<code>order-2</code>.</p>",
    prompt: "غيّر المسافة بين الأعمدة الأربعة إلى <code>g-5</code> ولاحظ الفرق.", check: ".row-cols-2",
    q: [["ماذا تفعل الفئة g-3؟", ["تضبط المسافة بين الأعمدة أفقيًا ورأسيًا", "تغير اللون", "تضاعف العمود", "تخفي الصف"], 0],
        ["ماذا يفعل offset-md-2؟", ["يزيح العمود بمقدار عمودين من md فما فوق", "يحذف عمودين", "يغير اللون", "يجعل العمود مخفيًا"], 0],
        ["ما فائدة row-cols-md-3؟", ["ثلاثة أعمدة في كل صف من md دون تحديد col لكل عنصر", "ثلاثة صفوف", "ثلاث حاويات", "ثلاث نقاط فاصلة"], 0]],
  },
  {
    t: "النصوص والألوان", d: "فئات الطباعة والألوان السياقية وخلفيات subtle في الإصدار 5.3.",
    s: [["الطباعة", "<ul><li><code>h1</code>–<code>h6</code> للحجم دون تغيير الوسم الدلالي، و<code>display-1</code>–<code>display-6</code> للعناوين الكبيرة، و<code>lead</code> للفقرة التمهيدية.</li><li><code>fw-bold</code> و<code>fst-italic</code> و<code>text-center</code> و<code>text-uppercase</code> و<code>text-truncate</code>.</li><li><code>fs-1</code>…<code>fs-6</code> لأحجام الخط.</li></ul>"],
        ["الألوان السياقية", "<p>الألوان: <code>primary</code> <code>secondary</code> <code>success</code> <code>danger</code> <code>warning</code> <code>info</code> <code>light</code> <code>dark</code>. تُستخدم مع <code>text-*</code> و<code>bg-*</code> و<code>border-*</code>. في 5.3 توجد أيضًا <code>text-primary-emphasis</code> و<code>bg-primary-subtle</code> التي تتكيف مع الوضع الداكن.</p>"]],
    key: "اختر اللون بمعناه (danger للخطأ) لا بشكله فقط، وفضّل -subtle و-emphasis لدعم الوضع الداكن.",
    code: `<div class="container py-3">
  <p class="h3 text-primary-emphasis">عنوان بحجم h3 (وسم p)</p>
  <p class="fw-bold fst-italic text-uppercase">bold italic uppercase</p>
  <p class="text-success">نجاح</p>
  <p class="text-danger">خطأ</p>
  <p class="bg-warning-subtle text-warning-emphasis p-2 rounded">ملاحظة بخلفية خفيفة</p>
  <p class="bg-dark text-white p-2 rounded">نص أبيض على خلفية داكنة</p>
</div>`,
    exp: "<p>الفئات <code>.h3</code> تعطي مظهر العنوان دون تغيير بنية الصفحة. وفئات <code>-subtle</code> و<code>-emphasis</code> تعطي تباينًا جيدًا في الوضعين الفاتح والداكن.</p>",
    prompt: "أضف فقرة بخلفية <code>bg-info-subtle</code> ونص <code>text-info-emphasis</code>.", check: ".text-primary-emphasis",
    q: [["ماذا تفعل الفئة h3 على وسم p؟", ["تعطيه مظهر عنوان دون تغيير دلالته", "تحوله إلى وسم h3", "تخفيه", "تجعله رابطًا"], 0],
        ["أي فئة تعطي خلفية خفيفة تتكيف مع الوضع الداكن؟", ["bg-primary-subtle", "bg-white", "bg-dark فقط", "text-bg"], 0],
        ["أي فئة تقص النص الطويل بنقاط؟", ["text-truncate", "text-wrap", "text-break", "text-nowrap"], 0]],
  },
  {
    t: "المسافات والأحجام", d: "فئات margin وpadding وgap والعرض والارتفاع المنطقية (تدعم RTL).",
    s: [["صيغة المسافات", "<p><code>{property}{sides}-{size}</code> حيث property هو <code>m</code> (margin) أو <code>p</code> (padding)، وsides هي <code>t</code> <code>b</code> <code>s</code> (البداية) <code>e</code> (النهاية) <code>x</code> <code>y</code> أو فارغة للكل، وsize من <code>0</code> إلى <code>5</code> أو <code>auto</code>. القيم: 1=0.25rem، 2=0.5rem، 3=1rem، 4=1.5rem، 5=3rem.</p>"],
        ["start و end", "<p>استخدم <code>ms-*</code> و<code>me-*</code> (بدل left/right) لتنعكس تلقائيًا في الواجهات العربية RTL.</p>"],
        ["الأحجام", "<p><code>w-25</code> <code>w-50</code> <code>w-75</code> <code>w-100</code> <code>w-auto</code> و<code>h-*</code> بنفس الفكرة، و<code>mw-100</code> و<code>vh-100</code> و<code>min-vh-100</code>.</p>"]],
    key: "استخدم ms/me بدل ml/mr لتعمل التصاميم في الاتجاهين.",
    code: `<div class="container">
  <div class="bg-light border p-3 mb-3">p-3 (1rem من كل جهة)</div>
  <div class="bg-light border px-5 py-1 mb-3">px-5 py-1</div>
  <div class="bg-light border ms-5 mb-3">ms-5: هامش من البداية</div>
  <div class="bg-light border mx-auto w-50 text-center">mx-auto w-50: في المنتصف</div>
</div>`,
    exp: "<p>الحرف <code>x</code> للأفقي و<code>y</code> للرأسي. <code>mx-auto</code> مع عرض محدد يمركز العنصر. القيمة 5 تساوي 3rem.</p>",
    prompt: "اجعل العنصر الأخير بعرض <code>w-75</code> وهامش سفلي <code>mb-5</code>.", check: ".mx-auto.w-50",
    q: [["ماذا تعني الفئة mt-4؟", ["هامش علوي 1.5rem", "هامش سفلي 4px", "حشوة علوية 4rem", "عرض 4"], 0],
        ["لماذا نفضل ms-3 على ml-3؟", ["لأنها تنعكس تلقائيًا في RTL", "لأنها أقصر", "لأن ml غير موجودة في أي إصدار", "لا فرق ولا سبب"], 0],
        ["أي فئة تجعل العرض نصف الحاوية؟", ["w-50", "col-50", "half", "mw-50"], 0]],
  },
  {
    t: "Flexbox والأدوات المساعدة", d: "التوزيع والمحاذاة والاتجاه وتغليف العناصر بفئات d-flex.",
    s: [["أساسيات", "<p><code>d-flex</code> يحول الحاوية إلى Flex. الاتجاه: <code>flex-row</code> / <code>flex-column</code>. المحاذاة الرئيسية: <code>justify-content-start|center|end|between|around|evenly</code>. المحاذاة العرضية: <code>align-items-start|center|end|stretch</code>. التغليف: <code>flex-wrap</code>. المسافة: <code>gap-*</code>.</p>"],
        ["على العناصر", "<p><code>flex-fill</code> و<code>flex-grow-1</code> لتمدد العنصر، و<code>ms-auto</code> لدفع العنصر إلى النهاية. وكلها تدعم النقاط (<code>flex-md-row</code>).</p>"]],
    key: "d-flex + justify-content + align-items تغطي معظم احتياجات المحاذاة.",
    code: `<div class="container">
  <div class="d-flex justify-content-between align-items-center border p-3 mb-3">
    <strong>FAYAD</strong>
    <span class="text-muted">يسار/يمين حسب الاتجاه</span>
    <button class="btn btn-sm btn-primary">إجراء</button>
  </div>
  <div class="d-flex flex-column flex-md-row gap-2">
    <div class="p-3 bg-light border flex-fill">1</div>
    <div class="p-3 bg-light border flex-fill">2</div>
    <div class="p-3 bg-light border ms-md-auto">ms-md-auto</div>
  </div>
</div>`,
    exp: "<p>الصف الأول يوزع العناصر على الأطراف ويتوسطها عموديًا. الثاني عمودي على الهاتف وأفقي من md، و<code>ms-md-auto</code> يدفع العنصر الأخير لنهاية السطر.</p>",
    prompt: "اجعل الصف الأول <code>justify-content-center</code> وشاهد التأثير.", check: ".d-flex.justify-content-between",
    q: [["أي فئة تحاذي العناصر عموديًا في المنتصف داخل d-flex أفقي؟", ["align-items-center", "justify-content-center", "text-center", "m-auto فقط"], 0],
        ["ماذا يفعل justify-content-between؟", ["يوزع المسافات بين العناصر ويضع الأولى والأخيرة على الأطراف", "يمركز كل شيء", "يعكس الترتيب", "يخفي العناصر"], 0],
        ["ماذا تفعل flex-column؟", ["تجعل الاتجاه رأسيًا", "تجعل العرض 100%", "تحذف gap", "تلغي d-flex"], 0]],
  },
  {
    t: "الحدود والظلال والموضع والعرض", d: "borders وrounded وshadow وposition وd-none لإظهار وإخفاء العناصر حسب الشاشة.",
    s: [["الحدود والزوايا والظلال", "<p><code>border</code> <code>border-top</code> <code>border-primary</code> <code>border-2</code>، والزوايا <code>rounded</code> <code>rounded-3</code> <code>rounded-circle</code> <code>rounded-pill</code>، والظلال <code>shadow-sm</code> <code>shadow</code> <code>shadow-lg</code>.</p>"],
        ["العرض والموضع", "<p>إخفاء/إظهار حسب النقطة: <code>d-none d-md-block</code> (مخفي على الهاتف ظاهر من md). الموضع: <code>position-relative</code> و<code>position-absolute</code> مع <code>top-0 start-0 translate-middle</code>، و<code>sticky-top</code> و<code>fixed-bottom</code>.</p>"]],
    key: "d-none d-md-block يخفي العنصر على الهاتف ويظهره من md.",
    code: `<div class="container py-3">
  <div class="p-3 border border-2 border-primary rounded-3 shadow-sm mb-3">بطاقة بحدود وظل</div>
  <div class="d-none d-md-block p-3 bg-success-subtle mb-3">يظهر من md فما فوق</div>
  <div class="d-md-none p-3 bg-danger-subtle mb-3">يظهر على الهاتف فقط</div>
  <div class="position-relative d-inline-block">
    <button class="btn btn-outline-dark">الرسائل</button>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">9</span>
  </div>
</div>`,
    exp: "<p>الشارة الحمراء موضوعة بشكل مطلق في زاوية الزر الذي له <code>position-relative</code>، و<code>translate-middle</code> ينقلها لتتمركز على الزاوية.</p>",
    prompt: "اجعل الظل <code>shadow-lg</code> والزوايا <code>rounded-pill</code> للعنصر الأول.", check: ".position-relative .badge",
    q: [["أي فئات تخفي العنصر على الهاتف وتظهره من md؟", ["d-none d-md-block", "d-md-none", "invisible", "hidden-xs"], 0],
        ["ما فائدة position-relative على الأب؟", ["ليصبح مرجع الموضع للعناصر المطلقة بداخله", "لتكبير الأب", "لإخفائه", "لتلوينه"], 0],
        ["أي فئة تعطي زاوية دائرية كاملة (كحبة الدواء)؟", ["rounded-pill", "rounded-0", "border-0", "shadow"], 0]],
  },
  {
    t: "الأزرار ومجموعات الأزرار", d: "أنماط الأزرار وأحجامها وحالاتها والمجموعات.",
    s: [["الأنماط", "<p><code>btn</code> + <code>btn-primary|secondary|success|danger|warning|info|light|dark|link</code>. النسخة المحيطة: <code>btn-outline-*</code>. الأحجام: <code>btn-lg</code> و<code>btn-sm</code>. التعطيل: <code>disabled</code> (وللروابط <code>aria-disabled=\"true\"</code>). الزر بعرض كامل: <code>w-100</code> أو داخل <code>d-grid</code>.</p>"],
        ["المجموعات", "<p><code>.btn-group</code> يجمع أزرارًا في شريط واحد، ويفضل إضافة <code>role=\"group\"</code> و<code>aria-label</code> لإمكانية الوصول.</p>"]],
    key: "استخدم button للإجراءات و a للتنقل، وأضف aria-label لمجموعات الأزرار.",
    code: `<div class="container py-3 d-grid gap-3">
  <div>
    <button class="btn btn-primary">أساسي</button>
    <button class="btn btn-outline-danger">حذف</button>
    <button class="btn btn-secondary btn-sm">صغير</button>
    <button class="btn btn-success btn-lg" disabled>معطل</button>
  </div>
  <div class="btn-group" role="group" aria-label="مجموعة التنسيق">
    <button type="button" class="btn btn-outline-dark">عريض</button>
    <button type="button" class="btn btn-outline-dark">مائل</button>
    <button type="button" class="btn btn-outline-dark">تحته خط</button>
  </div>
  <a class="btn btn-link" href="#">رابط بمظهر زر</a>
</div>`,
    exp: "<p>الصف الأول يعرض الأنماط المختلفة، والمجموعة تدمج الحدود بين الأزرار. الفئة <code>d-grid</code> على الحاوية تجعل أبناءها بعرض كامل.</p>",
    prompt: "أضف زر <code>btn-warning btn-lg</code> بنص «تحذير».", check: ".btn-group[role=group]",
    q: [["كيف نصنع زرًا بحدود فقط؟", ["btn-outline-primary", "btn-border", "btn-ghost", "btn-line"], 0],
        ["ما فائدة role=group مع aria-label في btn-group؟", ["إخبار قارئ الشاشة أن الأزرار مجموعة واحدة بوصف", "تلوين الأزرار", "تسريع الصفحة", "تعطيل الأزرار"], 0],
        ["أي فئة تغير حجم الزر إلى أكبر؟", ["btn-lg", "btn-xl", "btn-big", "btn-large"], 0]],
  },
  {
    t: "البطاقات Cards", d: "مكوّن المحتوى الأكثر استخدامًا: صورة وعنوان ونص وأزرار وتخطيطات.",
    s: [["البنية", "<p><code>.card</code> ثم <code>.card-body</code> وبداخله <code>.card-title</code> و<code>.card-text</code> والأزرار. اختياريًا: <code>.card-header</code> و<code>.card-footer</code> و<code>.card-img-top</code>. البطاقة بعرض الأب افتراضيًا فتحتاج شبكة أو <code>style=\"width\"</code>.</p>"],
        ["بطاقات متساوية الارتفاع", "<p>ضع البطاقات داخل <code>.row.row-cols-1.row-cols-md-3.g-4</code> وأضف <code>h-100</code> للبطاقة لتتساوى الارتفاعات.</p>"]],
    key: "ضع البطاقات في شبكة row-cols مع h-100 لتخطيط متجاوب متساوي الارتفاع.",
    code: `<div class="container py-3">
  <div class="row row-cols-1 row-cols-md-3 g-3">
    <div class="col">
      <div class="card h-100">
        <div class="card-header">HTML</div>
        <div class="card-body">
          <h5 class="card-title">أساسيات الويب</h5>
          <p class="card-text">تعلّم بنية الصفحات خطوة بخطوة.</p>
        </div>
        <div class="card-footer"><a href="#" class="btn btn-primary btn-sm">ابدأ</a></div>
      </div>
    </div>
    <div class="col"><div class="card h-100"><div class="card-body"><h5 class="card-title">CSS</h5><p class="card-text">تنسيق وتصميم متجاوب.</p></div></div></div>
    <div class="col"><div class="card h-100 text-bg-dark"><div class="card-body"><h5 class="card-title">JavaScript</h5><p class="card-text">التفاعل والمنطق.</p></div></div></div>
  </div>
</div>`,
    exp: "<p>ثلاث بطاقات بنفس الارتفاع بفضل <code>h-100</code>. الفئة <code>text-bg-dark</code> تضبط لون الخلفية والنص معًا بتباين صحيح.</p>",
    prompt: "أضف بطاقة رابعة وغيّر الشبكة إلى <code>row-cols-md-4</code>.", check: ".card .card-footer",
    q: [["ما الحاوية الأساسية لمحتوى البطاقة؟", ["card-body", "card-content", "card-main", "card-inner"], 0],
        ["كيف نجعل بطاقات الصف بنفس الارتفاع؟", ["h-100 على كل بطاقة داخل الشبكة", "width:100%", "d-none", "position-absolute"], 0],
        ["ما فائدة text-bg-dark؟", ["تضبط الخلفية والنص بتباين مناسب معًا", "تخفي النص", "تغير الخط", "تضيف ظلًا"], 0]],
  },
];
