// Bootstrap 5.3 lessons 11-20 (see lessons-a.js).
export const B = [
  {
    t: "شريط التنقل Navbar و Nav", d: "شريط تنقل متجاوب يتحول إلى قائمة منسدلة على الهاتف، مع التبويبات.",
    s: [["Navbar", "<p><code>.navbar</code> مع <code>.navbar-expand-lg</code> يظهر مفتوحًا من lg ومطويًا قبلها. المكونات: <code>.navbar-brand</code> و<code>.navbar-toggler</code> و<code>.collapse.navbar-collapse</code> و<code>.navbar-nav</code> و<code>.nav-link</code>. الزر يتحكم عبر <code>data-bs-toggle=\"collapse\"</code> و<code>data-bs-target</code>.</p>"],
        ["إمكانية الوصول", "<p>أضف <code>aria-controls</code> و<code>aria-expanded</code> و<code>aria-label</code> لزر القائمة، و<code>aria-current=\"page\"</code> للرابط الحالي.</p>"]],
    key: "navbar-expand-{bp} يحدد النقطة التي تُفتح عندها القائمة، والزر يفتحها بـ data-bs-toggle.",
    code: `<nav class="navbar navbar-expand-md bg-body-tertiary border-bottom">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">FAYAD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="فتح القائمة">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">الرئيسية</a></li>
        <li class="nav-item"><a class="nav-link" href="#">الدورات</a></li>
        <li class="nav-item"><a class="nav-link disabled" aria-disabled="true">قريبًا</a></li>
      </ul>
      <a class="btn btn-primary" href="#">تسجيل الدخول</a>
    </div>
  </div>
</nav>`,
    exp: "<p>صغّر عرض المعاينة (أقل من 768px) لتظهر أيقونة القائمة. <code>me-auto</code> تدفع الروابط إلى البداية والزر إلى النهاية.</p>",
    prompt: "أضف رابطًا رابعًا باسم «من نحن» في القائمة.", check: ".navbar-toggler[data-bs-toggle=collapse]",
    q: [["أي فئة تحدد متى تنفتح القائمة أفقيًا؟", ["navbar-expand-md", "navbar-open", "navbar-fixed", "navbar-md-only"], 0],
        ["أي خاصية تربط الزر بالعنصر الذي يفتحه؟", ["data-bs-target", "href فقط", "id فقط", "for"], 0],
        ["ما فائدة aria-current=\"page\"؟", ["إعلام التقنيات المساعدة بالصفحة الحالية", "تلوين الرابط", "تعطيل الرابط", "فتح الرابط في نافذة جديدة"], 0]],
  },
  {
    t: "النماذج Forms", d: "عناصر النماذج الأساسية: الحقول والتسميات والقوائم وخانات الاختيار.",
    s: [["العناصر", "<p><code>.form-label</code> للتسمية، <code>.form-control</code> للحقول النصية، <code>.form-select</code> للقوائم، <code>.form-check</code> مع <code>.form-check-input</code> و<code>.form-check-label</code> لخانات الاختيار والراديو، <code>.form-switch</code> للمفاتيح، <code>.form-range</code> للمنزلق. أحجام: <code>form-control-lg</code> و<code>-sm</code>.</p>"],
        ["الربط", "<p>اربط كل تسمية بحقلها عبر <code>for</code> و<code>id</code> — هذا أساس إمكانية الوصول.</p>"]],
    key: "كل حقل يحتاج label مرتبطة بـ for/id.",
    code: `<form class="container py-3" style="max-width:480px">
  <div class="mb-3">
    <label for="email" class="form-label">البريد الإلكتروني</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com">
  </div>
  <div class="mb-3">
    <label for="level" class="form-label">المستوى</label>
    <select class="form-select" id="level"><option>مبتدئ</option><option>متوسط</option></select>
  </div>
  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" role="switch" id="news" checked>
    <label class="form-check-label" for="news">استقبال الأخبار</label>
  </div>
  <button type="button" class="btn btn-primary">حفظ</button>
</form>`,
    exp: "<p>كل مجموعة حقل في <code>mb-3</code> لتباعد منتظم. المفتاح هو خانة اختيار بـ <code>form-switch</code> و<code>role=\"switch\"</code>.</p>",
    prompt: "أضف حقل كلمة مرور مع label وربطها بـ <code>for</code>.", check: ".form-select",
    q: [["أي فئة تنسق حقل الإدخال النصي؟", ["form-control", "input-box", "form-input", "text-field"], 0],
        ["كيف نربط label بالحقل؟", ["for في label يساوي id في الحقل", "بوضعهما في نفس السطر فقط", "بنفس اللون", "لا حاجة"], 0],
        ["أي فئة تصنع مفتاح تبديل؟", ["form-switch", "form-toggle", "btn-switch", "switch-box"], 0]],
  },
  {
    t: "التحقق ومجموعات الإدخال والتسميات العائمة", d: "رسائل التحقق، وinput-group، وform-floating.",
    s: [["التحقق", "<p>أضف <code>novalidate</code> للنموذج و<code>needs-validation</code>، ثم عند الإرسال أضف <code>was-validated</code> ليظهر الأخضر/الأحمر حسب قواعد HTML (<code>required</code> و<code>type</code> و<code>minlength</code>). أو ضع <code>is-invalid</code>/<code>is-valid</code> يدويًا مع <code>.invalid-feedback</code>. التحقق من الخادم لا غنى عنه.</p>"],
        ["مجموعات وتسميات", "<p><code>.input-group</code> يدمج نصًا أو زرًا مع الحقل (<code>.input-group-text</code>). <code>.form-floating</code> يضع التسمية داخل الحقل وترتفع عند الكتابة (يجب أن يأتي الـ input قبل الـ label).</p>"]],
    key: "التحقق في المتصفح للتجربة فقط، تحقق دائمًا من الخادم أيضًا.",
    code: `<form class="container py-3 needs-validation" novalidate style="max-width:480px" onsubmit="event.preventDefault(); this.classList.add('was-validated')">
  <div class="input-group mb-3">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="اسم المستخدم" aria-label="اسم المستخدم" required minlength="3">
    <div class="invalid-feedback">الاسم مطلوب (3 أحرف على الأقل).</div>
  </div>
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="mail" placeholder="name@example.com" required>
    <label for="mail">البريد الإلكتروني</label>
    <div class="invalid-feedback">أدخل بريدًا صحيحًا.</div>
  </div>
  <button class="btn btn-primary" type="submit">إرسال</button>
</form>`,
    exp: "<p>اضغط «إرسال» بحقول فارغة لتظهر الرسائل الحمراء. الفئة <code>was-validated</code> تضيف التنسيق حسب حالة كل حقل.</p>",
    prompt: "أضف حقل كلمة مرور <code>required minlength=\"8\"</code> داخل <code>form-floating</code>.", check: ".form-floating label",
    q: [["ماذا تفعل was-validated؟", ["تفعّل تنسيق الصح والخطأ حسب حالة الحقول", "ترسل النموذج", "تحذف الحقول", "تحفظ البيانات"], 0],
        ["لماذا نحتاج التحقق من الخادم رغم التحقق في المتصفح؟", ["لأن التحقق في المتصفح يمكن تجاوزه", "لأن المتصفح لا يدعمه", "للسرعة فقط", "لا نحتاج"], 0],
        ["ما الشرط في form-floating؟", ["أن يأتي input قبل label", "أن يأتي label قبل input", "وجود select فقط", "عدم وجود placeholder"], 0]],
  },
  {
    t: "الجداول والقوائم", d: "تنسيق الجداول وجعلها متجاوبة، ومجموعات القوائم list-group.",
    s: [["الجداول", "<p><code>.table</code> أساس، ويضاف <code>table-striped</code> (أشرطة) و<code>table-hover</code> و<code>table-bordered</code> و<code>table-sm</code> و<code>table-dark</code>. لتمرير الجدول أفقيًا على الهاتف غلّفه بـ <code>.table-responsive</code>.</p>"],
        ["القوائم", "<p><code>.list-group</code> + <code>.list-group-item</code> (يمكن أن تكون روابط <code>list-group-item-action</code>)، ولإضافة شارة <code>d-flex justify-content-between</code> مع <code>.badge</code>.</p>"]],
    key: "ضع الجداول العريضة داخل table-responsive.",
    code: `<div class="container py-3">
  <div class="table-responsive">
    <table class="table table-striped table-hover align-middle">
      <thead class="table-dark"><tr><th scope="col">#</th><th scope="col">الدرس</th><th scope="col">الحالة</th></tr></thead>
      <tbody>
        <tr><th scope="row">1</th><td>الشبكة</td><td><span class="badge text-bg-success">مكتمل</span></td></tr>
        <tr><th scope="row">2</th><td>النماذج</td><td><span class="badge text-bg-warning">قيد التقدم</span></td></tr>
      </tbody>
    </table>
  </div>
  <ul class="list-group mt-3">
    <li class="list-group-item d-flex justify-content-between align-items-center">الإشعارات <span class="badge text-bg-primary rounded-pill">3</span></li>
    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">الرسائل</a>
  </ul>
</div>`,
    exp: "<p>التظليل المتبادل والتمرير عند المرور من <code>table-striped</code> و<code>table-hover</code>. الجدول داخل <code>table-responsive</code> يمرَّر أفقيًا بدل كسر التخطيط.</p>",
    prompt: "أضف صفًا ثالثًا للجدول وعنصرًا ثالثًا للقائمة.", check: ".table-responsive .table-striped",
    q: [["أي فئة تغلف الجدول ليتمرر أفقيًا على الشاشات الصغيرة؟", ["table-responsive", "table-scroll", "overflow-table", "table-mobile"], 0],
        ["ما فائدة scope=\"col\" في th؟", ["تحديد أن الخلية عنوان عمود لقارئ الشاشة", "تلوين الرأس", "دمج الأعمدة", "ترتيب الجدول"], 0],
        ["أي فئة تجعل عنصر القائمة تفاعليًا برابط؟", ["list-group-item-action", "list-link", "list-active", "item-click"], 0]],
  },
  {
    t: "التنبيهات والشارات والتقدم والمؤشرات", d: "مكونات الحالة: alert وbadge وprogress وspinner.",
    s: [["Alerts و Badges", "<p><code>.alert.alert-{لون}</code> مع <code>role=\"alert\"</code>، وللإغلاق <code>alert-dismissible</code> و<code>btn-close</code> مع <code>data-bs-dismiss=\"alert\"</code>. الشارة <code>.badge.text-bg-{لون}</code>.</p>"],
        ["Progress و Spinner", "<p>شريط التقدم: <code>.progress</code> وبداخله <code>.progress-bar</code> بعرض <code>style=\"width: 60%\"</code> مع <code>role=\"progressbar\"</code> و<code>aria-valuenow</code> و<code>aria-valuemin</code> و<code>aria-valuemax</code>. المؤشر: <code>.spinner-border</code> مع <code>.visually-hidden</code> لنص «جارٍ التحميل».</p>"]],
    key: "لا تعتمد على اللون وحده: أضف نصًا وخصائص aria للتقدم والتحميل.",
    code: `<div class="container py-3">
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>تنبيه!</strong> أكمل ملفك الشخصي.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
  </div>
  <p>الدروس <span class="badge text-bg-primary">12</span></p>
  <div class="progress mb-3" role="progressbar" aria-label="تقدم الكورس" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped" style="width: 60%">60%</div>
  </div>
  <div class="spinner-border text-primary" role="status"><span class="visually-hidden">جارٍ التحميل...</span></div>
</div>`,
    exp: "<p>اضغط زر الإغلاق ليختفي التنبيه (بفضل ملف JavaScript). <code>visually-hidden</code> يخفي النص بصريًا ويبقيه لقارئ الشاشة.</p>",
    prompt: "غيّر التنبيه إلى <code>alert-success</code> واجعل التقدم 85%.", check: ".progress .progress-bar",
    q: [["أي خاصية تغلق التنبيه عند الضغط؟", ["data-bs-dismiss=\"alert\"", "onclick=\"close\"", "href=\"#close\"", "data-close"], 0],
        ["ما الغرض من visually-hidden؟", ["إخفاء النص بصريًا مع إبقائه لقارئ الشاشة", "حذف العنصر", "إخفاؤه عن الجميع", "تصغير الخط"], 0],
        ["أي خاصية تحدد عرض شريط التقدم؟", ["style=\"width: 60%\"", "data-width", "col-60", "value"], 0]],
  },
  {
    t: "النوافذ Modal و Offcanvas", d: "نوافذ حوارية ولوحات جانبية بسمات data وبواجهة JavaScript.",
    s: [["Modal", "<p>زر <code>data-bs-toggle=\"modal\" data-bs-target=\"#id\"</code> يفتح العنصر <code>.modal</code> الذي بداخله <code>.modal-dialog > .modal-content</code> مع <code>.modal-header</code> و<code>.modal-body</code> و<code>.modal-footer</code>. يتولى Bootstrap حبس التركيز وإغلاق Escape.</p>"],
        ["Offcanvas", "<p>لوحة تنزلق من الجانب: <code>.offcanvas.offcanvas-start|end|top|bottom</code> وتُفتح بنفس الطريقة بـ <code>data-bs-toggle=\"offcanvas\"</code>.</p>"],
        ["JavaScript API", "<p><code>const m = new bootstrap.Modal(el); m.show(); m.hide();</code> وتصدر أحداث مثل <code>shown.bs.modal</code> و<code>hidden.bs.modal</code>.</p>"]],
    key: "استخدم aria-labelledby للنافذة، ودع Bootstrap يدير التركيز.",
    code: `<div class="container py-3">
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#demoModal">فتح النافذة</button>
  <button class="btn btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#side">لوحة جانبية</button>

  <div class="modal fade" id="demoModal" tabindex="-1" aria-labelledby="demoTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header"><h2 class="modal-title fs-5" id="demoTitle">تأكيد</h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="إغلاق"></button></div>
        <div class="modal-body">هل تريد المتابعة؟</div>
        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button><button class="btn btn-primary">نعم</button></div>
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="side" aria-labelledby="sideTitle">
    <div class="offcanvas-header"><h2 class="offcanvas-title fs-5" id="sideTitle">القائمة</h2><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="إغلاق"></button></div>
    <div class="offcanvas-body">محتوى اللوحة الجانبية.</div>
  </div>
</div>`,
    exp: "<p>جرّب الزرين. النافذة لها خلفية معتمة وتغلق بـ Escape. اللوحة الجانبية تنزلق من النهاية (<code>offcanvas-end</code>).</p>",
    prompt: "غيّر اللوحة لتأتي من البداية بالفئة <code>offcanvas-start</code>.", check: ".modal.fade .modal-dialog",
    q: [["أي سمتين تفتحان Modal من زر؟", ["data-bs-toggle=\"modal\" و data-bs-target", "href و onclick", "data-open و data-id", "role و tabindex"], 0],
        ["كيف تفتح Modal برمجيًا؟", ["new bootstrap.Modal(el).show()", "el.openModal()", "bootstrap.show(el)", "modal(el)"], 0],
        ["أي فئة تجعل اللوحة تنزلق من اليمين في LTR؟", ["offcanvas-end", "offcanvas-right", "offcanvas-slide", "offcanvas-open"], 0]],
  },
  {
    t: "Collapse و Accordion و Dropdown", d: "مكونات الطي والقوائم المنسدلة التفاعلية.",
    s: [["Collapse و Accordion", "<p>العنصر <code>.collapse</code> يُظهر ويخفي بزر <code>data-bs-toggle=\"collapse\"</code>. الـ <code>.accordion</code> يجمع عناصر collapse، وعند وضع <code>data-bs-parent</code> على كل عنصر يُغلق الآخر عند فتح واحد.</p>"],
        ["Dropdown", "<p><code>.dropdown</code> يضم زرًا <code>data-bs-toggle=\"dropdown\"</code> وقائمة <code>.dropdown-menu</code> بعناصر <code>.dropdown-item</code>. الاتجاه: <code>dropup</code>/<code>dropend</code>/<code>dropstart</code>.</p>"]],
    key: "استخدم button للمحفزات (لا رابط فارغ) وaria-expanded تُدار تلقائيًا.",
    code: `<div class="container py-3">
  <div class="dropdown mb-3">
    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">اللغة</button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item active" href="#">العربية</a></li>
      <li><a class="dropdown-item" href="#">English</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item disabled" aria-disabled="true">Français</a></li>
    </ul>
  </div>
  <div class="accordion" id="faq">
    <div class="accordion-item">
      <h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1" aria-expanded="true" aria-controls="q1">ما هو Bootstrap؟</button></h2>
      <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faq"><div class="accordion-body">مكتبة لبناء واجهات متجاوبة.</div></div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2" aria-expanded="false" aria-controls="q2">هل هو مجاني؟</button></h2>
      <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faq"><div class="accordion-body">نعم، بترخيص MIT.</div></div>
    </div>
  </div>
</div>`,
    exp: "<p>السمة <code>data-bs-parent=\"#faq\"</code> تجعل فتح عنصر يغلق الآخر. القائمة المنسدلة تغلق بالضغط خارجها أو بـ Escape.</p>",
    prompt: "أضف عنصر أكورديون ثالثًا بسؤال وجواب من اختيارك.", check: ".accordion .collapse.show",
    q: [["ماذا تفعل data-bs-parent في الأكورديون؟", ["تجعل فتح عنصر يغلق العناصر الأخرى", "تلون الأكورديون", "تحذف الأكورديون", "تغير الاتجاه"], 0],
        ["أي فئة تعطي قائمة منسدلة؟", ["dropdown-menu داخل dropdown", "menu-list", "select-box", "popup"], 0],
        ["ما فائدة استخدام button لمحفز Collapse؟", ["قابلية الوصول بلوحة المفاتيح وقارئ الشاشة", "تلوينه", "تسريعه", "لا فائدة"], 0]],
  },
  {
    t: "Tooltips و Popovers و Toasts", d: "المكونات التي تحتاج تهيئة JavaScript، وكيف نفعّلها.",
    s: [["لماذا تحتاج تهيئة؟", "<p>Tooltips وPopovers لا تعمل تلقائيًا لأسباب أداء، فيجب إنشاؤها: <code>new bootstrap.Tooltip(el)</code> (أو لكل العناصر ذات <code>data-bs-toggle=\"tooltip\"</code>). Toast كذلك: <code>new bootstrap.Toast(el).show()</code>.</p>"],
        ["إمكانية الوصول", "<p>الـ Tooltip لا يظهر للمستخدمين على اللمس بسهولة ولا يجوز وضع معلومة أساسية فيه فقط. استخدمه كمساعد وليس كمحتوى رئيسي.</p>"]],
    key: "فعّل Tooltips/Popovers/Toasts يدويًا، ولا تضع المعلومات الحرجة فيها.",
    code: `<div class="container py-4">
  <button id="tipBtn" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-title="نص المساعدة">مرّر الفأرة</button>
  <button id="toastBtn" class="btn btn-primary">أظهر Toast</button>

  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast" role="status" aria-live="polite" aria-atomic="true">
      <div class="toast-header"><strong class="me-auto">FAYAD</strong><small>الآن</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="إغلاق"></button></div>
      <div class="toast-body">تم حفظ التقدم.</div>
    </div>
  </div>
</div>
<script>
  new bootstrap.Tooltip(document.getElementById('tipBtn'));
  document.getElementById('toastBtn').addEventListener('click', () => {
    bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast')).show();
  });
</script>`,
    exp: "<p>الـ Tooltip أنشئ برمجيًا لأن Bootstrap لا يفعّله تلقائيًا. <code>getOrCreateInstance</code> تنشئ النسخة إن لم توجد أو تعيد الموجودة.</p>",
    prompt: "أضف زرًا ثالثًا مع Tooltip آخر وفعّله بنفس الطريقة.", check: ".toast-container .toast",
    q: [["لماذا لا تعمل Tooltips بدون كود JavaScript؟", ["لأنها تحتاج تهيئة صريحة لأسباب الأداء", "لأنها محذوفة", "لأنها تحتاج الإنترنت", "لأنها للطابعات"], 0],
        ["ما الدالة التي تُظهر Toast؟", ["bootstrap.Toast(el).show()", "toast.open()", "el.showToast()", "alert(el)"], 0],
        ["ما التحفظ الأساسي على استخدام Tooltip؟", ["لا تضع فيه معلومات أساسية لأنه صعب الوصول على اللمس", "يبطئ الشبكة", "يلغي النموذج", "يحتاج ترخيصًا"], 0]],
  },
  {
    t: "الوضع الداكن و RTL والتخصيص بمتغيرات CSS", d: "data-bs-theme وbootstrap.rtl.css وتغيير مظهر Bootstrap بدون Sass.",
    s: [["Color modes", "<p>منذ 5.3 ضع <code>data-bs-theme=\"dark\"</code> على <code>&lt;html&gt;</code> أو على أي عنصر ليتحول هو وأبناؤه للوضع الداكن. استخدم الفئات المتكيفة (<code>bg-body</code>, <code>text-body</code>, <code>bg-body-tertiary</code>, <code>-subtle</code>) بدل <code>bg-white</code> و<code>text-dark</code>.</p>"],
        ["RTL", "<p>للغة العربية: <code>&lt;html lang=\"ar\" dir=\"rtl\"&gt;</code> مع ملف <code>bootstrap.rtl.min.css</code> بدلًا من العادي. الفئات المنطقية (<code>ms-*</code>, <code>me-*</code>, <code>text-start</code>) تنعكس تلقائيًا.</p>"],
        ["التخصيص بالمتغيرات", "<p>كل مكون يعرّف متغيرات CSS مثل <code>--bs-btn-bg</code>، ويمكنك تعديلها على فئة خاصة بك، أو تغيير <code>--bs-primary</code> و<code>--bs-body-font-family</code> عالميًا. هذا أسهل من Sass في المشاريع الصغيرة.</p>"]],
    key: "اضبط data-bs-theme على العنصر، وغيّر المظهر بمتغيرات --bs-* بدل تجاوز CSS بقوة.",
    code: `<style>
  .btn-brand {
    --bs-btn-bg: #0b6b78;
    --bs-btn-border-color: #0b6b78;
    --bs-btn-hover-bg: #095561;
    --bs-btn-hover-border-color: #095561;
    --bs-btn-color: #fff;
    --bs-btn-hover-color: #fff;
  }
</style>
<div class="container py-3">
  <div class="p-3 border rounded mb-3 bg-body text-body">وضع النظام الحالي</div>
  <div class="p-3 border rounded mb-3 bg-body text-body" data-bs-theme="dark">وضع داكن على هذا العنصر فقط</div>
  <button class="btn btn-brand">زر بلون العلامة</button>
</div>`,
    exp: "<p>العنصر الثاني داكن فقط لأن السمة موضوعة عليه. الزر خصص لونه بتعيين متغيرات المكون في فئة واحدة دون تعديل الكود الأساسي.</p>",
    prompt: "اجعل الفئة <code>btn-brand</code> تستخدم لونًا مختلفًا وجرّب data-bs-theme على الزر.", check: "[data-bs-theme=dark]",
    q: [["كيف نفعّل الوضع الداكن لعنصر محدد؟", ["data-bs-theme=\"dark\" على العنصر", "class=\"dark\" فقط", "style=\"dark\"", "theme.css"], 0],
        ["أي ملف نحتاجه للاتجاه من اليمين لليسار؟", ["bootstrap.rtl.min.css", "bootstrap-arabic.js", "rtl.json", "bootstrap.dark.css"], 0],
        ["ما أسهل طريقة لتخصيص زر دون Sass؟", ["تعيين متغيرات --bs-btn-* في فئة خاصة", "تعديل ملف bootstrap.min.css", "استخدام !important في كل مكان", "حذف الفئة btn"], 0]],
  },
  {
    t: "مشروع: صفحة هبوط متجاوبة", d: "اجمع ما تعلمته في صفحة كاملة: شريط تنقل، قسم رئيسي، بطاقات، نموذج وتذييل.",
    s: [["خطة المشروع", "<ol><li>شريط تنقل <code>navbar-expand-md</code>.</li><li>قسم رئيسي (hero) بعنوان وزر دعوة للعمل.</li><li>شبكة بطاقات <code>row-cols-1 row-cols-md-3</code>.</li><li>نموذج اشتراك بسيط مع تحقق.</li><li>تذييل بخلفية <code>bg-body-tertiary</code>.</li></ol>"],
        ["نصائح", "<ul><li>ابدأ بالهاتف ثم وسّع بالنقاط.</li><li>استخدم <code>container</code> مرة واحدة لكل قسم.</li><li>اختبر الوضع الداكن واتجاه RTL.</li></ul>"]],
    key: "ابدأ من الهاتف، وابنِ كل قسم بحاوية وشبكة، ثم اختبر الوضعين والاتجاهين.",
    code: `<nav class="navbar navbar-expand-md bg-body-tertiary border-bottom">
  <div class="container"><a class="navbar-brand fw-bold" href="#">FAYAD</a><a href="#join" class="btn btn-sm btn-primary">انضم</a></div>
</nav>
<header class="py-5 text-center bg-primary-subtle">
  <div class="container">
    <h1 class="display-5 fw-bold">تعلّم الويب بطريقة عملية</h1>
    <p class="lead mx-auto" style="max-width:36rem">دروس تفاعلية وتمارين ومعاينة مباشرة.</p>
    <a href="#join" class="btn btn-primary btn-lg">ابدأ الآن</a>
  </div>
</header>
<section class="container py-5">
  <div class="row row-cols-1 row-cols-md-3 g-3">
    <div class="col"><div class="card h-100"><div class="card-body"><h2 class="h5 card-title">دروس قصيرة</h2><p class="card-text mb-0">فكرة واحدة في كل درس.</p></div></div></div>
    <div class="col"><div class="card h-100"><div class="card-body"><h2 class="h5 card-title">تمارين عملية</h2><p class="card-text mb-0">اكتب الكود وجرّبه فورًا.</p></div></div></div>
    <div class="col"><div class="card h-100"><div class="card-body"><h2 class="h5 card-title">اختبارات</h2><p class="card-text mb-0">تحقق من فهمك بعد كل درس.</p></div></div></div>
  </div>
</section>
<section id="join" class="container pb-5" style="max-width:520px">
  <form class="input-group" onsubmit="return false">
    <input type="email" class="form-control" placeholder="بريدك الإلكتروني" aria-label="البريد الإلكتروني" required>
    <button class="btn btn-primary" type="submit">اشترك</button>
  </form>
</section>
<footer class="py-3 text-center text-body-secondary bg-body-tertiary border-top"><small>© FAYAD</small></footer>`,
    exp: "<p>الصفحة تستخدم كل ما تعلمته: تنقل، hero، شبكة بطاقات، input-group، وتذييل. جرّب تصغير المعاينة لترى الأعمدة تتحول إلى عمود واحد.</p>",
    prompt: "أضف قسمًا رابعًا للأسئلة الشائعة باستخدام الأكورديون، ثم اختبر الوضع الداكن بوضع <code>data-bs-theme=\"dark\"</code> على الوسم الأول.", check: "header .display-5",
    q: [["من أين تبدأ في تصميم صفحة متجاوبة بـ Bootstrap؟", ["من تصميم الهاتف ثم التوسع بالنقاط", "من الشاشة الكبيرة فقط", "من الطباعة", "من ملف JavaScript"], 0],
        ["أي فئة تعطي خلفية ثانوية تتكيف مع الوضع الداكن للتذييل؟", ["bg-body-tertiary", "bg-white", "bg-light دائمًا", "bg-transparent"], 0],
        ["أين يوضع container في الصفحة عادةً؟", ["داخل كل قسم لمحاذاة المحتوى", "حول الـ html", "داخل كل زر", "لا يستخدم أبدًا"], 0]],
  },
];
