/* =========================================================
   FAYAD — COMPUTER FUNDAMENTALS
   Interactive Arabic Foundation Track
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const lessons = [
    /* =====================================================
           01 — WHAT IS A COMPUTER?
        ===================================================== */

    {
      title: "ما هو الكمبيوتر؟",
      icon: "fa-computer",

      content: `
                <section class="lesson-section">
                    <h3>تعريف الكمبيوتر</h3>

                    <p>
                        الكمبيوتر هو جهاز إلكتروني يستطيع استقبال البيانات
                        ومعالجتها وفق مجموعة من التعليمات، ثم إنتاج نتائج
                        يمكن للإنسان الاستفادة منها.
                    </p>

                    <p>
                        هذه العملية يمكن تبسيطها إلى أربع مراحل أساسية:
                        <span class="term">Input</span> ثم
                        <span class="term">Processing</span> ثم
                        <span class="term">Output</span> وأخيرًا
                        <span class="term">Storage</span>.
                    </p>
                </section>

                <section class="lesson-section">

                    <h3>كيف نفكر في الكمبيوتر؟</h3>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Input</h4>
                            <p>
                                البيانات التي تدخل إلى الكمبيوتر، مثل الكتابة
                                باستخدام لوحة المفاتيح أو النقر بالماوس.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Processing</h4>
                            <p>
                                معالجة البيانات وتنفيذ العمليات المطلوبة
                                باستخدام مكونات الكمبيوتر.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Output</h4>
                            <p>
                                النتيجة التي يحصل عليها المستخدم، مثل ظهور
                                صورة أو نص على الشاشة.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Storage</h4>
                            <p>
                                الاحتفاظ بالبيانات لاستخدامها في وقت لاحق.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "الكمبيوتر لا يفكر مثل الإنسان؛ بل ينفذ تعليمات محددة على البيانات وفق ما تمت برمجته للقيام به.",

      practice: "انظر إلى هاتفك أو الكمبيوتر أمامك وحاول تحديد مثال واحد لكل من Input وProcessing وOutput وStorage.",

      question: "أي مرحلة يتم فيها تنفيذ العمليات على البيانات؟",

      answers: ["Input", "Processing", "Output", "Storage"],

      correct: 1,
    },

    /* =====================================================
           02
        ===================================================== */

    {
      title: "كيف يعمل الكمبيوتر؟",
      icon: "fa-gears",

      content: `
                <section class="lesson-section">

                    <h3>من الضغط على الزر إلى ظهور النتيجة</h3>

                    <p>
                        عندما تقوم بأي عملية على الكمبيوتر، تحدث سلسلة من
                        العمليات الداخلية خلال وقت قصير جدًا.
                    </p>

                    <ul>
                        <li>يدخل المستخدم البيانات.</li>
                        <li>يتم نقل البيانات إلى الذاكرة.</li>
                        <li>يقوم المعالج CPU بتنفيذ التعليمات.</li>
                        <li>يتم إرسال النتيجة إلى أحد أجهزة الإخراج.</li>
                    </ul>

                </section>

                <section class="lesson-section">

                    <h3>العلاقة بين المكونات</h3>

                    <p>
                        لا يعمل أي مكون من مكونات الكمبيوتر بمعزل عن بقية
                        المكونات. فالمعالج يحتاج إلى الذاكرة، والبرامج تحتاج
                        إلى نظام التشغيل، والبيانات تحتاج إلى وسيلة تخزين.
                    </p>

                </section>
            `,

      key: "الكمبيوتر عبارة عن منظومة مترابطة؛ سرعة النظام وأداؤه يعتمدان على تعاون عدة مكونات وليس مكونًا واحدًا فقط.",

      practice: "افتح برنامجًا على جهازك ولاحظ ما يحدث: الضغط على الأيقونة، تحميل البرنامج، ثم ظهور واجهته.",

      question: "ما المكون المسؤول بشكل أساسي عن تنفيذ التعليمات؟",

      answers: ["الشاشة", "لوحة المفاتيح", "CPU", "السماعات"],

      correct: 2,
    },

    /* =====================================================
           03
        ===================================================== */

    {
      title: "Hardware و Software",
      icon: "fa-microchip",

      content: `
                <section class="lesson-section">

                    <h3>Hardware</h3>

                    <p>
                        يشير مصطلح <span class="term">Hardware</span>
                        إلى الأجزاء المادية التي يمكن لمسها ورؤيتها في
                        الكمبيوتر، مثل CPU وRAM وMotherboard وSSD والشاشة.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>Software</h3>

                    <p>
                        يشير مصطلح <span class="term">Software</span>
                        إلى البرامج والتعليمات التي تخبر الـHardware بما
                        يجب أن يفعله.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Hardware</h4>
                            <p>
                                CPU، RAM، SSD، GPU، Keyboard، Monitor.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Software</h4>
                            <p>
                                Windows، Linux، Browsers، Applications.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "Hardware هو الجزء المادي، بينما Software هو مجموعة البرامج والتعليمات التي تعمل على ذلك الجزء المادي.",

      practice: "حاول تصنيف العناصر التالية إلى Hardware أو Software: Windows، RAM، Chrome، CPU، Photoshop.",

      question: "أي مما يلي يعتبر Software؟",

      answers: ["RAM", "CPU", "Windows", "Motherboard"],

      correct: 2,
    },

    /* =====================================================
           04
        ===================================================== */

    {
      title: "المعالج CPU",
      icon: "fa-microchip",

      content: `
                <section class="lesson-section">

                    <h3>ما هو CPU؟</h3>

                    <p>
                        وحدة المعالجة المركزية
                        <span class="term">CPU — Central Processing Unit</span>
                        هي أحد أهم مكونات الكمبيوتر، وتقوم بتنفيذ التعليمات
                        والعمليات الحسابية والمنطقية.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>ما معنى Core؟</h3>

                    <p>
                        يحتوي المعالج الحديث عادةً على أكثر من
                        <span class="term">Core</span>.
                        وكل Core يستطيع تنفيذ مجموعة من التعليمات، مما يسمح
                        للمعالج بالتعامل مع عدة مهام بكفاءة أكبر.
                    </p>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Clock Speed</h4>
                            <p>
                                سرعة تشغيل المعالج، وتقاس عادةً بالـGHz.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Cores</h4>
                            <p>
                                عدد وحدات المعالجة الموجودة داخل المعالج.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "CPU هو المسؤول الرئيسي عن تنفيذ تعليمات البرامج ومعالجة العمليات الحسابية والمنطقية.",

      practice: "افتح Task Manager في Windows وابحث عن معلومات المعالج وعدد الـCores وسرعته.",

      question: "ماذا يعني CPU؟",

      answers: [
        "Central Processing Unit",
        "Computer Program Utility",
        "Central Power Unit",
        "Computer Processing User",
      ],

      correct: 0,
    },

    /* =====================================================
           05
        ===================================================== */

    {
      title: "الذاكرة RAM",
      icon: "fa-memory",

      content: `
                <section class="lesson-section">

                    <h3>ما هي RAM؟</h3>

                    <p>
                        ذاكرة الوصول العشوائي
                        <span class="term">RAM — Random Access Memory</span>
                        هي مساحة مؤقتة يستخدمها الكمبيوتر لتخزين البيانات
                        والبرامج التي يتم استخدامها حاليًا.
                    </p>

                    <p>
                        RAM تختلف عن Storage؛ فالـRAM أسرع بكثير، لكنها
                        تفقد محتوياتها عند إيقاف تشغيل الجهاز.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>مثال بسيط</h3>

                    <p>
                        عندما تفتح المتصفح وتفتح عدة Tabs، يحتاج الكمبيوتر
                        إلى استخدام RAM للاحتفاظ بالبيانات التي تحتاجها
                        هذه البرامج أثناء عملها.
                    </p>

                </section>
            `,

      key: "RAM ذاكرة مؤقتة وسريعة يستخدمها الكمبيوتر أثناء تشغيل البرامج.",

      practice: "راقب استهلاك RAM في Task Manager عند فتح عدة برامج ثم أغلقها ولاحظ الفرق.",

      question: "ماذا يحدث لمحتويات RAM عادةً عند إيقاف تشغيل الكمبيوتر؟",

      answers: ["تبقى دائمًا", "تنتقل إلى الشاشة", "تُفقد", "تتحول إلى CPU"],

      correct: 2,
    },

    /* =====================================================
           06
        ===================================================== */

    {
      title: "التخزين Storage",
      icon: "fa-hard-drive",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Storage؟</h3>

                    <p>
                        التخزين هو المكان الذي يتم فيه الاحتفاظ بالبيانات
                        والملفات لفترة طويلة، مثل الصور والفيديوهات
                        والبرامج ونظام التشغيل.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>HDD مقابل SSD</h3>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>HDD</h4>
                            <p>
                                يعتمد على أجزاء ميكانيكية متحركة، وعادةً يكون
                                أقل سرعة من SSD.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>SSD</h4>
                            <p>
                                يعتمد على شرائح ذاكرة ولا يحتوي على أجزاء
                                ميكانيكية متحركة، ولذلك يكون أسرع غالبًا.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "Storage يحتفظ بالبيانات حتى بعد إيقاف تشغيل الجهاز، بعكس RAM.",

      practice: "تحقق من نوع وحدة التخزين الموجودة في جهازك: هل هي SSD أم HDD؟",

      question: "أي نوع من التخزين أسرع عادةً؟",

      answers: ["SSD", "HDD", "كلاهما دائمًا بنفس السرعة", "RAM"],

      correct: 0,
    },

    /* =====================================================
           07
        ===================================================== */

    {
      title: "اللوحة الأم Motherboard",
      icon: "fa-sitemap",

      content: `
                <section class="lesson-section">

                    <h3>ما هي Motherboard؟</h3>

                    <p>
                        اللوحة الأم هي اللوحة الرئيسية التي تربط مكونات
                        الكمبيوتر المختلفة ببعضها، وتوفر مسارات الاتصال
                        والطاقة اللازمة للتواصل بين هذه المكونات.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>ماذا يتصل بها؟</h3>

                    <ul>
                        <li>CPU</li>
                        <li>RAM</li>
                        <li>GPU</li>
                        <li>Storage</li>
                        <li>أجهزة الإدخال والإخراج</li>
                    </ul>

                </section>
            `,

      key: "Motherboard هي نقطة الاتصال الأساسية بين معظم مكونات الكمبيوتر.",

      practice: "ابحث عن صورة للوحة أم حديثة وحاول تحديد مكان CPU وRAM وGPU وStorage.",

      question: "ما الدور الأساسي للـMotherboard؟",

      answers: ["عرض الصور فقط", "ربط مكونات الكمبيوتر", "تخزين الملفات فقط", "تشغيل الصوت فقط"],

      correct: 1,
    },

    /* =====================================================
           08
        ===================================================== */

    {
      title: "بطاقة الرسوميات GPU",
      icon: "fa-display",

      content: `
                <section class="lesson-section">

                    <h3>ما هو GPU؟</h3>

                    <p>
                        وحدة معالجة الرسوميات
                        <span class="term">GPU — Graphics Processing Unit</span>
                        متخصصة في تنفيذ العمليات المتعلقة بالرسوميات
                        والصور والفيديو وبعض العمليات المتوازية.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>أين نحتاج GPU بشكل كبير؟</h3>

                    <ul>
                        <li>الألعاب</li>
                        <li>3D Graphics</li>
                        <li>تحرير الفيديو</li>
                        <li>التعلم الآلي والذكاء الاصطناعي في بعض المهام</li>
                    </ul>

                </section>
            `,

      key: "GPU متخصص في معالجة الرسوميات والعمليات المتوازية، وليس مجرد نسخة ثانية من CPU.",

      practice: "ابحث عن مواصفات جهازك لمعرفة اسم الـGPU الموجود فيه.",

      question: "ما المجال الذي يرتبط بشكل مباشر بالـGPU؟",

      answers: ["الرسوميات", "الطباعة الورقية فقط", "إدارة الملفات فقط", "لوحة المفاتيح"],

      correct: 0,
    },

    /* =====================================================
           09
        ===================================================== */

    {
      title: "أجهزة الإدخال والإخراج",
      icon: "fa-keyboard",

      content: `
                <section class="lesson-section">

                    <h3>Input Devices</h3>

                    <p>
                        هي الأجهزة التي تسمح للمستخدم بإدخال البيانات إلى
                        الكمبيوتر.
                    </p>

                    <p>
                        أمثلة: Keyboard، Mouse، Microphone، Camera.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>Output Devices</h3>

                    <p>
                        هي الأجهزة التي يستخدمها الكمبيوتر لإظهار النتائج
                        للمستخدم.
                    </p>

                    <p>
                        أمثلة: Monitor، Speakers، Printer.
                    </p>

                </section>
            `,

      key: "Input يدخل البيانات إلى النظام، بينما Output يعرض النتائج الناتجة عن المعالجة.",

      practice: "صنف Mouse وMonitor وKeyboard وSpeaker إلى Input أو Output.",

      question: "أي جهاز يعتبر Input Device؟",

      answers: ["Monitor", "Speaker", "Keyboard", "Projector"],

      correct: 2,
    },

    /* =====================================================
           10
        ===================================================== */

    {
      title: "أنظمة التشغيل",
      icon: "fa-window-maximize",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Operating System؟</h3>

                    <p>
                        نظام التشغيل
                        <span class="term">Operating System</span>
                        هو البرنامج الأساسي الذي يدير موارد الكمبيوتر
                        ويسمح للتطبيقات والمستخدم بالتعامل مع Hardware.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>أمثلة</h3>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Windows</h4>
                            <p>نظام تشغيل شائع لأجهزة الكمبيوتر الشخصية.</p>
                        </div>

                        <div class="info-box">
                            <h4>Linux</h4>
                            <p>عائلة من أنظمة التشغيل مفتوحة المصدر.</p>
                        </div>

                        <div class="info-box">
                            <h4>macOS</h4>
                            <p>نظام تشغيل لأجهزة Mac.</p>
                        </div>

                        <div class="info-box">
                            <h4>Android</h4>
                            <p>نظام تشغيل شائع للأجهزة المحمولة.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "Operating System يعمل كوسيط بين المستخدم والتطبيقات من جهة وHardware من جهة أخرى.",

      practice: "حدد نظام التشغيل الذي تستخدمه الآن، ثم ابحث عن إصدار النظام.",

      question: "ما الوظيفة الأساسية لنظام التشغيل؟",

      answers: ["إدارة موارد الجهاز", "زيادة حجم الشاشة", "استبدال CPU", "صنع الإنترنت"],

      correct: 0,
    },

    /* =====================================================
           11
        ===================================================== */

    {
      title: "الملفات والمجلدات",
      icon: "fa-folder-open",

      content: `
                <section class="lesson-section">

                    <h3>ما هو File؟</h3>

                    <p>
                        الملف هو وحدة لتخزين نوع معين من البيانات، مثل صورة
                        أو فيديو أو مستند أو برنامج.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>ما هو Folder؟</h3>

                    <p>
                        المجلد يستخدم لتنظيم الملفات والمجلدات الأخرى في
                        هيكل يسهل الوصول إليه وإدارته.
                    </p>

                    <p>
                        ستتعامل مع مفاهيم مثل
                        <span class="term">File Extension</span> و
                        <span class="term">Path</span> و
                        <span class="term">Directory</span>.
                    </p>

                </section>
            `,

      key: "تنظيم الملفات والمجلدات مهارة أساسية لأي شخص يعمل مع الكمبيوتر.",

      practice: "أنشئ مجلدًا باسم FAYAD ثم أنشئ داخله مجلدات باسم HTML وCSS وJavaScript.",

      question: "ما الهدف الأساسي من Folder؟",

      answers: ["تبريد CPU", "تنظيم الملفات", "زيادة RAM", "عرض الصور"],

      correct: 1,
    },

    /* =====================================================
           12
        ===================================================== */

    {
      title: "Binary و Data",
      icon: "fa-code",

      content: `
                <section class="lesson-section">

                    <h3>لماذا يستخدم الكمبيوتر Binary؟</h3>

                    <p>
                        الأجهزة الإلكترونية الرقمية تعمل باستخدام حالات
                        كهربائية يمكن تمثيلها بصورة مبسطة باستخدام
                        0 و1.
                    </p>

                    <p>
                        لذلك يتم تمثيل أنواع مختلفة من البيانات، مثل النصوص
                        والصور والصوت، بطريقة رقمية يمكن للكمبيوتر معالجتها.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>0 و1</h3>

                    <p>
                        الرقم 0 والرقم 1 هما الرمزان الأساسيان في النظام
                        الثنائي <span class="term">Binary</span>.
                    </p>

                </section>
            `,

      key: "الكمبيوتر الرقمي يمثل البيانات بطريقة ثنائية تعتمد على 0 و1.",

      practice: "تعلم تمثيل الأرقام الصغيرة بالنظام الثنائي، مثل 1 و2 و4 و8.",

      question: "ما الرموز الأساسية في Binary؟",

      answers: ["0 و1", "1 و2", "A وB", "0 و9"],

      correct: 0,
    },

    /* =====================================================
           13
        ===================================================== */

    {
      title: "Bits و Bytes",
      icon: "fa-database",

      content: `
                <section class="lesson-section">

                    <h3>Bit</h3>

                    <p>
                        الـ<span class="term">Bit</span> هو أصغر وحدة أساسية
                        لتمثيل البيانات الرقمية، ويمكن أن تكون قيمته
                        0 أو 1.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>Byte</h3>

                    <p>
                        الـ<span class="term">Byte</span> يساوي 8 Bits.
                    </p>

                    <p>
                        ومن وحدات قياس البيانات أيضًا:
                        KB، MB، GB، TB.
                    </p>

                </section>
            `,

      key: "Byte واحد يتكون من 8 Bits.",

      practice: "حاول ترتيب KB وMB وGB وTB من الأصغر إلى الأكبر.",

      question: "كم Bit يوجد في Byte واحد؟",

      answers: ["2", "4", "8", "16"],

      correct: 2,
    },

    /* =====================================================
           14
        ===================================================== */

    {
      title: "كيف يعمل البرنامج؟",
      icon: "fa-terminal",

      content: `
                <section class="lesson-section">

                    <h3>من الكود إلى التنفيذ</h3>

                    <p>
                        البرنامج عبارة عن مجموعة من التعليمات التي تمت
                        كتابتها لكي ينفذ الكمبيوتر مهمة معينة.
                    </p>

                    <p>
                        عند تشغيل البرنامج، يقوم النظام بتحميل الأجزاء
                        المطلوبة إلى الذاكرة ثم يبدأ CPU في تنفيذ التعليمات.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>لماذا نحتاج Programming Languages؟</h3>

                    <p>
                        الإنسان يحتاج إلى طريقة منظمة لكتابة التعليمات.
                        لذلك توجد لغات برمجة مثل C وC++ وPython وJavaScript.
                    </p>

                </section>
            `,

      key: "البرنامج هو تعليمات منظمة، ويقوم الكمبيوتر بتنفيذها خطوة بخطوة باستخدام المعالج.",

      practice: "افتح أي ملف JavaScript بسيط وحاول تحديد أين توجد التعليمات التي ينفذها الكمبيوتر.",

      question: "ما الذي يحتويه البرنامج؟",

      answers: ["تعليمات", "كهرباء فقط", "صور فقط", "مراوح"],

      correct: 0,
    },

    /* =====================================================
           15
        ===================================================== */

    {
      title: "أساسيات الإنترنت والشبكات",
      icon: "fa-network-wired",

      content: `
                <section class="lesson-section">

                    <h3>ما هي الشبكة؟</h3>

                    <p>
                        الشبكة <span class="term">Network</span> هي مجموعة
                        من الأجهزة المتصلة ببعضها بهدف تبادل البيانات
                        والموارد.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>الإنترنت</h3>

                    <p>
                        الإنترنت شبكة عالمية ضخمة تربط عددًا هائلًا من
                        الشبكات والأجهزة حول العالم.
                    </p>

                    <p>
                        عند إرسال طلب إلى موقع ويب، تنتقل البيانات بين
                        أجهزة وشبكات متعددة حتى تصل إلى الخادم المطلوب.
                    </p>

                </section>
            `,

      key: "الإنترنت ليس جهازًا واحدًا؛ بل شبكة عالمية من الشبكات والأجهزة المتصلة ببعضها.",

      practice: "ابحث عن الفرق بين Local Network وInternet وحاول شرحه بكلماتك.",

      question: "ما الإنترنت؟",

      answers: ["جهاز كمبيوتر واحد", "شبكة عالمية من الشبكات", "برنامج للرسم", "نوع من وحدات التخزين"],

      correct: 1,
    },

    /* =====================================================
           16
        ===================================================== */

    {
      title: "المتصفح والويب",
      icon: "fa-globe",

      content: `
                <section class="lesson-section">

                    <h3>Browser</h3>

                    <p>
                        المتصفح <span class="term">Web Browser</span>
                        هو برنامج يسمح لك بالوصول إلى صفحات الويب والتفاعل
                        معها.
                    </p>

                    <p>
                        من أمثلته Chrome وFirefox وEdge وSafari.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>Website وWeb Page</h3>

                    <p>
                        موقع الويب قد يحتوي على عدد كبير من صفحات الويب.
                        وتُبنى صفحات الويب غالبًا باستخدام HTML وCSS
                        وJavaScript.
                    </p>

                </section>
            `,

      key: "المتصفح هو البرنامج الذي يستخدمه المستخدم لعرض والتفاعل مع محتوى الويب.",

      practice: "افتح DevTools في المتصفح وشاهد HTML وCSS الخاصين بصفحة بسيطة.",

      question: "أي مما يلي يعتبر Web Browser؟",

      answers: ["Chrome", "RAM", "CPU", "SSD"],

      correct: 0,
    },

    /* =====================================================
           17
        ===================================================== */

    {
      title: "الأمن السيبراني",
      icon: "fa-shield-halved",

      content: `
                <section class="lesson-section">

                    <h3>ما هو Cybersecurity؟</h3>

                    <p>
                        الأمن السيبراني هو مجموعة من الممارسات والتقنيات
                        التي تهدف إلى حماية الأجهزة والأنظمة والشبكات
                        والبيانات من الوصول غير المصرح به والهجمات.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>عادات أساسية</h3>

                    <ul>
                        <li>استخدم كلمات مرور قوية وفريدة.</li>
                        <li>فعّل المصادقة متعددة العوامل عند توفرها.</li>
                        <li>لا تفتح الروابط والملفات المشبوهة.</li>
                        <li>حدّث نظام التشغيل والبرامج باستمرار.</li>
                        <li>لا تشارك معلوماتك الحساسة مع الآخرين.</li>
                    </ul>

                </section>
            `,

      key: "الأمن السيبراني ليس مسؤولية الشركات فقط؛ بل يبدأ من عادات المستخدم اليومية.",

      practice: "راجع حساباتك المهمة وتأكد من استخدام كلمات مرور مختلفة وتفعيل المصادقة متعددة العوامل.",

      question: "أي ممارسة تزيد من أمان حساباتك؟",

      answers: ["استخدام كلمة المرور نفسها في كل المواقع", "مشاركة كلمة المرور", "تفعيل MFA", "فتح أي رابط مجهول"],

      correct: 2,
    },

    /* =====================================================
           18
        ===================================================== */

    {
      title: "تاريخ الكمبيوتر",
      icon: "fa-timeline",

      content: `
                <section class="lesson-section">

                    <h3>من الآلات الميكانيكية إلى الحواسيب الحديثة</h3>

                    <p>
                        مر تطور الكمبيوتر بمراحل طويلة بدأت بآلات حسابية
                        ميكانيكية، ثم ظهرت الحواسيب الإلكترونية الضخمة.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>أجيال الكمبيوتر</h3>

                    <ul>
                        <li>
                            الجيل الأول: Vacuum Tubes
                        </li>

                        <li>
                            الجيل الثاني: Transistors
                        </li>

                        <li>
                            الجيل الثالث: Integrated Circuits
                        </li>

                        <li>
                            الأجيال الحديثة: Microprocessors والحوسبة
                            المتقدمة والذكاء الاصطناعي
                        </li>
                    </ul>

                </section>
            `,

      key: "تطور الكمبيوتر ارتبط بتطور تقنيات المعالجة والذاكرة والتخزين والاتصال.",

      practice: "رتب Vacuum Tubes وTransistors وIntegrated Circuits وMicroprocessors زمنيًا.",

      question: "ما التقنية المرتبطة بالجيل الأول من الحواسيب؟",

      answers: ["Transistors", "Vacuum Tubes", "Microprocessors", "Cloud Computing"],

      correct: 1,
    },

    /* =====================================================
           19
        ===================================================== */

    {
      title: "الحوسبة الحديثة",
      icon: "fa-cloud",

      content: `
                <section class="lesson-section">

                    <h3>كيف أصبحت الحوسبة اليوم؟</h3>

                    <p>
                        لم تعد الحوسبة مقتصرة على أجهزة الكمبيوتر الشخصية.
                        اليوم توجد الهواتف الذكية والخوادم وCloud Computing
                        ومراكز البيانات والأجهزة الذكية.
                    </p>

                </section>

                <section class="lesson-section">

                    <h3>تقنيات مهمة</h3>

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Cloud Computing</h4>
                            <p>
                                استخدام موارد حوسبية عبر الإنترنت بدل الاعتماد
                                على جهاز محلي فقط.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>AI</h4>
                            <p>
                                تقنيات تسمح للأنظمة بتنفيذ مهام تحتاج عادةً
                                إلى قدر من الذكاء البشري.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>IoT</h4>
                            <p>
                                ربط الأجهزة المادية بالإنترنت لتبادل البيانات.
                            </p>
                        </div>

                        <div class="info-box">
                            <h4>Data Centers</h4>
                            <p>
                                منشآت تحتوي على عدد كبير من الخوادم والبنية
                                التحتية الحاسوبية.
                            </p>
                        </div>

                    </div>

                </section>
            `,

      key: "الحوسبة الحديثة تعتمد على منظومة ضخمة من الأجهزة والشبكات والخدمات السحابية والبيانات.",

      practice: "فكر في التطبيقات التي تستخدمها يوميًا وحدد أيها يعتمد على Cloud Computing.",

      question: "أي مفهوم يشير إلى استخدام موارد حوسبية عبر الإنترنت؟",

      answers: ["Cloud Computing", "Keyboard", "RAM", "BIOS"],

      correct: 0,
    },

    /* =====================================================
           20 — FINAL
        ===================================================== */

    {
      title: "الاختبار النهائي",
      icon: "fa-graduation-cap",

      final: true,

      content: `
                <section class="lesson-section">

                    <h3>أحسنت! وصلت إلى الاختبار النهائي.</h3>

                    <p>
                        قبل الانتقال إلى مسار البرمجة، يجب أن تكون قادرًا
                        على فهم المكونات الأساسية للكمبيوتر وطريقة عمل
                        البرامج والبيانات والإنترنت.
                    </p>

                    <p>
                        هذا الاختبار يجمع أهم المفاهيم التي تعلمتها في
                        المسار.
                    </p>

                </section>

                <section class="lesson-section">

                    <div class="info-grid">

                        <div class="info-box">
                            <h4>Hardware</h4>
                            <p>المكونات المادية.</p>
                        </div>

                        <div class="info-box">
                            <h4>Software</h4>
                            <p>البرامج والتعليمات.</p>
                        </div>

                        <div class="info-box">
                            <h4>CPU</h4>
                            <p>تنفيذ التعليمات.</p>
                        </div>

                        <div class="info-box">
                            <h4>RAM</h4>
                            <p>ذاكرة مؤقتة سريعة.</p>
                        </div>

                    </div>

                </section>
            `,

      key: "فهم أساسيات الكمبيوتر سيجعل تعلم البرمجة والويب أسهل بكثير.",

      practice: "راجع الدروس السابقة قبل محاولة الاختبار النهائي.",

      question: "أي مكون مسؤول بشكل أساسي عن تنفيذ تعليمات البرامج؟",

      answers: ["CPU", "Monitor", "Keyboard", "SSD"],

      correct: 0,
    },
  ];

  /* =====================================================
       STATE
    ===================================================== */

  const STORAGE_KEY = "fayad-computer-progress";

  let currentLesson = 0;

  let completedLessons = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  /* =====================================================
       DOM
    ===================================================== */

  const lessonItems = document.querySelectorAll(".lesson-item");

  const lessonCounter = document.getElementById("lesson-counter");

  const lessonTitle = document.getElementById("lesson-title");

  const contentTitle = document.getElementById("content-title");

  const lessonContent = document.getElementById("lesson-content");

  const lessonIcon = document.getElementById("lesson-icon");

  const keyConcept = document.getElementById("key-concept-text");

  const practiceText = document.getElementById("practice-text");

  const quizQuestion = document.getElementById("quiz-question");

  const quizOptions = document.getElementById("quiz-options");

  const quizResult = document.getElementById("quiz-result");

  const completeBtn = document.getElementById("complete-btn");

  const prevBtn = document.getElementById("prev-btn");

  const nextBtn = document.getElementById("next-btn");

  const progressFill = document.getElementById("progress-fill");

  const progressText = document.getElementById("progress-text");

  const lessonStatus = document.getElementById("lesson-status");

  /* =====================================================
       SAVE PROGRESS
    ===================================================== */

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons));
  }

  /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

  function updateProgress() {
    const total = lessons.length;

    const completed = completedLessons.length;

    const percentage = Math.round((completed / total) * 100);

    progressFill.style.width = `${percentage}%`;

    progressText.textContent = `${percentage}%`;
  }

  /* =====================================================
       UPDATE SIDEBAR
    ===================================================== */

  function updateSidebar() {
    lessonItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentLesson);

      item.classList.toggle("completed", completedLessons.includes(index));

      const number = item.querySelector(".lesson-number");

      if (completedLessons.includes(index)) {
        number.innerHTML = `<i class="fa-solid fa-check"></i>`;
      } else {
        number.textContent = String(index + 1).padStart(2, "0");
      }
    });
  }

  /* =====================================================
       RENDER QUIZ
    ===================================================== */

  function renderQuiz(lesson) {
    quizQuestion.textContent = lesson.question;

    quizOptions.innerHTML = "";

    quizResult.textContent = "";

    quizResult.className = "quiz-result";

    lesson.answers.forEach((answer, index) => {
      const button = document.createElement("button");

      button.className = "quiz-btn";

      button.textContent = answer;

      button.addEventListener("click", () => {
        document.querySelectorAll(".quiz-btn").forEach((btn) => {
          btn.disabled = true;
        });

        if (index === lesson.correct) {
          button.classList.add("correct");

          quizResult.textContent = "إجابة صحيحة! أحسنت، لقد فهمت المفهوم.";

          quizResult.classList.add("success");
        } else {
          button.classList.add("wrong");

          const correctButton = document.querySelectorAll(".quiz-btn")[lesson.correct];

          if (correctButton) {
            correctButton.classList.add("correct");
          }

          quizResult.textContent = `إجابة غير صحيحة. الإجابة الصحيحة هي: ${lesson.answers[lesson.correct]}`;

          quizResult.classList.add("error");
        }
      });

      quizOptions.appendChild(button);
    });
  }

  /* =====================================================
       LOAD LESSON
    ===================================================== */

  function loadLesson(index) {
    if (index < 0 || index >= lessons.length) {
      return;
    }

    currentLesson = index;

    const lesson = lessons[currentLesson];

    lessonCounter.textContent = `الدرس ${currentLesson + 1} من ${lessons.length}`;

    lessonTitle.textContent = lesson.title;

    contentTitle.textContent = lesson.title;

    lessonIcon.innerHTML = `<i class="fa-solid ${lesson.icon}"></i>`;

    lessonContent.innerHTML = lesson.content;

    keyConcept.textContent = lesson.key;

    practiceText.textContent = lesson.practice;

    renderQuiz(lesson);

    updateLessonStatus();

    updateSidebar();

    updateNavigation();

    updateProgress();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =====================================================
       LESSON STATUS
    ===================================================== */

  function updateLessonStatus() {
    const completed = completedLessons.includes(currentLesson);

    if (completed) {
      lessonStatus.classList.add("completed");

      lessonStatus.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                مكتمل
                `;

      completeBtn.classList.add("completed");

      completeBtn.innerHTML = `
                <i class="fa-solid fa-check"></i>
                تم إكمال الدرس
                `;
    } else {
      lessonStatus.classList.remove("completed");

      lessonStatus.innerHTML = `
                <i class="fa-regular fa-circle"></i>
                غير مكتمل
                `;

      completeBtn.classList.remove("completed");

      completeBtn.innerHTML = `
                <i class="fa-solid fa-check"></i>
                إكمال الدرس
                `;
    }
  }

  /* =====================================================
       NAVIGATION
    ===================================================== */

  function updateNavigation() {
    prevBtn.disabled = currentLesson === 0;

    nextBtn.disabled = currentLesson === lessons.length - 1;

    if (currentLesson === lessons.length - 1) {
      nextBtn.innerHTML = `
                تم الوصول للنهاية
                <i class="fa-solid fa-flag-checkered"></i>
                `;
    } else {
      nextBtn.innerHTML = `
                الدرس التالي
                <i class="fa-solid fa-arrow-left"></i>
                `;
    }
  }

  /* =====================================================
       COMPLETE LESSON
    ===================================================== */

  completeBtn.addEventListener("click", () => {
    if (!completedLessons.includes(currentLesson)) {
      completedLessons.push(currentLesson);

      completedLessons.sort((a, b) => a - b);

      saveProgress();
    }

    updateLessonStatus();

    updateSidebar();

    updateProgress();
  });

  /* =====================================================
       NEXT
    ===================================================== */

  nextBtn.addEventListener("click", () => {
    if (currentLesson < lessons.length - 1) {
      loadLesson(currentLesson + 1);
    }
  });

  /* =====================================================
       PREVIOUS
    ===================================================== */

  prevBtn.addEventListener("click", () => {
    if (currentLesson > 0) {
      loadLesson(currentLesson - 1);
    }
  });

  /* =====================================================
       SIDEBAR CLICK
    ===================================================== */

  lessonItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      loadLesson(index);
    });
  });

  /* =====================================================
       INITIALIZE
    ===================================================== */

  updateProgress();

  updateSidebar();

  loadLesson(0);
});
