// Computer Basics content, shared lesson schema (see docs/lesson-schema.md).
// Generated once from the legacy implementation by tools/convert-com-track.mjs; now hand-maintained.

export const track = {
  id: "com",
  runtime: "none",
  layout: "foundation-lite",
  groups: [
    {
      id: "com-g1",
      title: {
        ar: "أساسيات الكمبيوتر",
      },
      lessons: [
        "com-01",
        "com-02",
        "com-03",
        "com-04",
        "com-05",
        "com-06",
        "com-07",
        "com-08",
        "com-09",
        "com-10",
        "com-11",
        "com-12",
        "com-13",
        "com-14",
        "com-15",
        "com-16",
        "com-17",
        "com-18",
        "com-19",
        "com-20",
      ],
    },
  ],
};

export const lessons = [
  {
    id: "com-01",
    title: {
      ar: "ما هو الكمبيوتر؟",
    },
    icon: "fa-computer",
    body: {
      ar: `
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
    },
    key: {
      ar: "الكمبيوتر لا يفكر مثل الإنسان؛ بل ينفذ تعليمات محددة على البيانات وفق ما تمت برمجته للقيام به.",
    },
    practice: {
      prompt: {
        ar: "انظر إلى هاتفك أو الكمبيوتر أمامك وحاول تحديد مثال واحد لكل من Input وProcessing وOutput وStorage.",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي مرحلة يتم فيها تنفيذ العمليات على البيانات؟",
        },
        options: [
          {
            ar: "Input",
          },
          {
            ar: "Processing",
          },
          {
            ar: "Output",
          },
          {
            ar: "Storage",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "com-02",
    title: {
      ar: "كيف يعمل الكمبيوتر؟",
    },
    icon: "fa-gears",
    body: {
      ar: `
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
    },
    key: {
      ar: "الكمبيوتر عبارة عن منظومة مترابطة؛ سرعة النظام وأداؤه يعتمدان على تعاون عدة مكونات وليس مكونًا واحدًا فقط.",
    },
    practice: {
      prompt: {
        ar: "افتح برنامجًا على جهازك ولاحظ ما يحدث: الضغط على الأيقونة، تحميل البرنامج، ثم ظهور واجهته.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما المكون المسؤول بشكل أساسي عن تنفيذ التعليمات؟",
        },
        options: [
          {
            ar: "الشاشة",
          },
          {
            ar: "لوحة المفاتيح",
          },
          {
            ar: "CPU",
          },
          {
            ar: "السماعات",
          },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "com-03",
    title: {
      ar: "Hardware و Software",
    },
    icon: "fa-microchip",
    body: {
      ar: `
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
    },
    key: {
      ar: "Hardware هو الجزء المادي، بينما Software هو مجموعة البرامج والتعليمات التي تعمل على ذلك الجزء المادي.",
    },
    practice: {
      prompt: {
        ar: "حاول تصنيف العناصر التالية إلى Hardware أو Software: Windows، RAM، Chrome، CPU، Photoshop.",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي مما يلي يعتبر Software؟",
        },
        options: [
          {
            ar: "RAM",
          },
          {
            ar: "CPU",
          },
          {
            ar: "Windows",
          },
          {
            ar: "Motherboard",
          },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "com-04",
    title: {
      ar: "المعالج CPU",
    },
    icon: "fa-microchip",
    body: {
      ar: `
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
    },
    key: {
      ar: "CPU هو المسؤول الرئيسي عن تنفيذ تعليمات البرامج ومعالجة العمليات الحسابية والمنطقية.",
    },
    practice: {
      prompt: {
        ar: "افتح Task Manager في Windows وابحث عن معلومات المعالج وعدد الـCores وسرعته.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يعني CPU؟",
        },
        options: [
          {
            ar: "Central Processing Unit",
          },
          {
            ar: "Computer Program Utility",
          },
          {
            ar: "Central Power Unit",
          },
          {
            ar: "Computer Processing User",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-05",
    title: {
      ar: "الذاكرة RAM",
    },
    icon: "fa-memory",
    body: {
      ar: `
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
    },
    key: {
      ar: "RAM ذاكرة مؤقتة وسريعة يستخدمها الكمبيوتر أثناء تشغيل البرامج.",
    },
    practice: {
      prompt: {
        ar: "راقب استهلاك RAM في Task Manager عند فتح عدة برامج ثم أغلقها ولاحظ الفرق.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ماذا يحدث لمحتويات RAM عادةً عند إيقاف تشغيل الكمبيوتر؟",
        },
        options: [
          {
            ar: "تبقى دائمًا",
          },
          {
            ar: "تنتقل إلى الشاشة",
          },
          {
            ar: "تُفقد",
          },
          {
            ar: "تتحول إلى CPU",
          },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "com-06",
    title: {
      ar: "التخزين Storage",
    },
    icon: "fa-hard-drive",
    body: {
      ar: `
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
    },
    key: {
      ar: "Storage يحتفظ بالبيانات حتى بعد إيقاف تشغيل الجهاز، بعكس RAM.",
    },
    practice: {
      prompt: {
        ar: "تحقق من نوع وحدة التخزين الموجودة في جهازك: هل هي SSD أم HDD؟",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي نوع من التخزين أسرع عادةً؟",
        },
        options: [
          {
            ar: "SSD",
          },
          {
            ar: "HDD",
          },
          {
            ar: "كلاهما دائمًا بنفس السرعة",
          },
          {
            ar: "RAM",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-07",
    title: {
      ar: "اللوحة الأم Motherboard",
    },
    icon: "fa-sitemap",
    body: {
      ar: `
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
    },
    key: {
      ar: "Motherboard هي نقطة الاتصال الأساسية بين معظم مكونات الكمبيوتر.",
    },
    practice: {
      prompt: {
        ar: "ابحث عن صورة للوحة أم حديثة وحاول تحديد مكان CPU وRAM وGPU وStorage.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الدور الأساسي للـMotherboard؟",
        },
        options: [
          {
            ar: "عرض الصور فقط",
          },
          {
            ar: "ربط مكونات الكمبيوتر",
          },
          {
            ar: "تخزين الملفات فقط",
          },
          {
            ar: "تشغيل الصوت فقط",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "com-08",
    title: {
      ar: "بطاقة الرسوميات GPU",
    },
    icon: "fa-display",
    body: {
      ar: `
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
    },
    key: {
      ar: "GPU متخصص في معالجة الرسوميات والعمليات المتوازية، وليس مجرد نسخة ثانية من CPU.",
    },
    practice: {
      prompt: {
        ar: "ابحث عن مواصفات جهازك لمعرفة اسم الـGPU الموجود فيه.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما المجال الذي يرتبط بشكل مباشر بالـGPU؟",
        },
        options: [
          {
            ar: "الرسوميات",
          },
          {
            ar: "الطباعة الورقية فقط",
          },
          {
            ar: "إدارة الملفات فقط",
          },
          {
            ar: "لوحة المفاتيح",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-09",
    title: {
      ar: "أجهزة الإدخال والإخراج",
    },
    icon: "fa-keyboard",
    body: {
      ar: `
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
    },
    key: {
      ar: "Input يدخل البيانات إلى النظام، بينما Output يعرض النتائج الناتجة عن المعالجة.",
    },
    practice: {
      prompt: {
        ar: "صنف Mouse وMonitor وKeyboard وSpeaker إلى Input أو Output.",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي جهاز يعتبر Input Device؟",
        },
        options: [
          {
            ar: "Monitor",
          },
          {
            ar: "Speaker",
          },
          {
            ar: "Keyboard",
          },
          {
            ar: "Projector",
          },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "com-10",
    title: {
      ar: "أنظمة التشغيل",
    },
    icon: "fa-window-maximize",
    body: {
      ar: `
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
    },
    key: {
      ar: "Operating System يعمل كوسيط بين المستخدم والتطبيقات من جهة وHardware من جهة أخرى.",
    },
    practice: {
      prompt: {
        ar: "حدد نظام التشغيل الذي تستخدمه الآن، ثم ابحث عن إصدار النظام.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الوظيفة الأساسية لنظام التشغيل؟",
        },
        options: [
          {
            ar: "إدارة موارد الجهاز",
          },
          {
            ar: "زيادة حجم الشاشة",
          },
          {
            ar: "استبدال CPU",
          },
          {
            ar: "صنع الإنترنت",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-11",
    title: {
      ar: "الملفات والمجلدات",
    },
    icon: "fa-folder-open",
    body: {
      ar: `
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
    },
    key: {
      ar: "تنظيم الملفات والمجلدات مهارة أساسية لأي شخص يعمل مع الكمبيوتر.",
    },
    practice: {
      prompt: {
        ar: "أنشئ مجلدًا باسم FAYAD ثم أنشئ داخله مجلدات باسم HTML وCSS وJavaScript.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الهدف الأساسي من Folder؟",
        },
        options: [
          {
            ar: "تبريد CPU",
          },
          {
            ar: "تنظيم الملفات",
          },
          {
            ar: "زيادة RAM",
          },
          {
            ar: "عرض الصور",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "com-12",
    title: {
      ar: "Binary و Data",
    },
    icon: "fa-code",
    body: {
      ar: `
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
    },
    key: {
      ar: "الكمبيوتر الرقمي يمثل البيانات بطريقة ثنائية تعتمد على 0 و1.",
    },
    practice: {
      prompt: {
        ar: "تعلم تمثيل الأرقام الصغيرة بالنظام الثنائي، مثل 1 و2 و4 و8.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الرموز الأساسية في Binary؟",
        },
        options: [
          {
            ar: "0 و1",
          },
          {
            ar: "1 و2",
          },
          {
            ar: "A وB",
          },
          {
            ar: "0 و9",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-13",
    title: {
      ar: "Bits و Bytes",
    },
    icon: "fa-database",
    body: {
      ar: `
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
    },
    key: {
      ar: "Byte واحد يتكون من 8 Bits.",
    },
    practice: {
      prompt: {
        ar: "حاول ترتيب KB وMB وGB وTB من الأصغر إلى الأكبر.",
      },
    },
    quiz: [
      {
        question: {
          ar: "كم Bit يوجد في Byte واحد؟",
        },
        options: [
          {
            ar: "2",
          },
          {
            ar: "4",
          },
          {
            ar: "8",
          },
          {
            ar: "16",
          },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "com-14",
    title: {
      ar: "كيف يعمل البرنامج؟",
    },
    icon: "fa-terminal",
    body: {
      ar: `
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
    },
    key: {
      ar: "البرنامج هو تعليمات منظمة، ويقوم الكمبيوتر بتنفيذها خطوة بخطوة باستخدام المعالج.",
    },
    practice: {
      prompt: {
        ar: "افتح أي ملف JavaScript بسيط وحاول تحديد أين توجد التعليمات التي ينفذها الكمبيوتر.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الذي يحتويه البرنامج؟",
        },
        options: [
          {
            ar: "تعليمات",
          },
          {
            ar: "كهرباء فقط",
          },
          {
            ar: "صور فقط",
          },
          {
            ar: "مراوح",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-15",
    title: {
      ar: "أساسيات الإنترنت والشبكات",
    },
    icon: "fa-network-wired",
    body: {
      ar: `
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
    },
    key: {
      ar: "الإنترنت ليس جهازًا واحدًا؛ بل شبكة عالمية من الشبكات والأجهزة المتصلة ببعضها.",
    },
    practice: {
      prompt: {
        ar: "ابحث عن الفرق بين Local Network وInternet وحاول شرحه بكلماتك.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما الإنترنت؟",
        },
        options: [
          {
            ar: "جهاز كمبيوتر واحد",
          },
          {
            ar: "شبكة عالمية من الشبكات",
          },
          {
            ar: "برنامج للرسم",
          },
          {
            ar: "نوع من وحدات التخزين",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "com-16",
    title: {
      ar: "المتصفح والويب",
    },
    icon: "fa-globe",
    body: {
      ar: `
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
    },
    key: {
      ar: "المتصفح هو البرنامج الذي يستخدمه المستخدم لعرض والتفاعل مع محتوى الويب.",
    },
    practice: {
      prompt: {
        ar: "افتح DevTools في المتصفح وشاهد HTML وCSS الخاصين بصفحة بسيطة.",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي مما يلي يعتبر Web Browser؟",
        },
        options: [
          {
            ar: "Chrome",
          },
          {
            ar: "RAM",
          },
          {
            ar: "CPU",
          },
          {
            ar: "SSD",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-17",
    title: {
      ar: "الأمن السيبراني",
    },
    icon: "fa-shield-halved",
    body: {
      ar: `
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
    },
    key: {
      ar: "الأمن السيبراني ليس مسؤولية الشركات فقط؛ بل يبدأ من عادات المستخدم اليومية.",
    },
    practice: {
      prompt: {
        ar: "راجع حساباتك المهمة وتأكد من استخدام كلمات مرور مختلفة وتفعيل المصادقة متعددة العوامل.",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي ممارسة تزيد من أمان حساباتك؟",
        },
        options: [
          {
            ar: "استخدام كلمة المرور نفسها في كل المواقع",
          },
          {
            ar: "مشاركة كلمة المرور",
          },
          {
            ar: "تفعيل MFA",
          },
          {
            ar: "فتح أي رابط مجهول",
          },
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "com-18",
    title: {
      ar: "تاريخ الكمبيوتر",
    },
    icon: "fa-timeline",
    body: {
      ar: `
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
    },
    key: {
      ar: "تطور الكمبيوتر ارتبط بتطور تقنيات المعالجة والذاكرة والتخزين والاتصال.",
    },
    practice: {
      prompt: {
        ar: "رتب Vacuum Tubes وTransistors وIntegrated Circuits وMicroprocessors زمنيًا.",
      },
    },
    quiz: [
      {
        question: {
          ar: "ما التقنية المرتبطة بالجيل الأول من الحواسيب؟",
        },
        options: [
          {
            ar: "Transistors",
          },
          {
            ar: "Vacuum Tubes",
          },
          {
            ar: "Microprocessors",
          },
          {
            ar: "Cloud Computing",
          },
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "com-19",
    title: {
      ar: "الحوسبة الحديثة",
    },
    icon: "fa-cloud",
    body: {
      ar: `
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
    },
    key: {
      ar: "الحوسبة الحديثة تعتمد على منظومة ضخمة من الأجهزة والشبكات والخدمات السحابية والبيانات.",
    },
    practice: {
      prompt: {
        ar: "فكر في التطبيقات التي تستخدمها يوميًا وحدد أيها يعتمد على Cloud Computing.",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي مفهوم يشير إلى استخدام موارد حوسبية عبر الإنترنت؟",
        },
        options: [
          {
            ar: "Cloud Computing",
          },
          {
            ar: "Keyboard",
          },
          {
            ar: "RAM",
          },
          {
            ar: "BIOS",
          },
        ],
        correct: 0,
      },
    ],
  },
  {
    id: "com-20",
    title: {
      ar: "الاختبار النهائي",
    },
    isFinal: true,
    icon: "fa-graduation-cap",
    body: {
      ar: `
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
    },
    key: {
      ar: "فهم أساسيات الكمبيوتر سيجعل تعلم البرمجة والويب أسهل بكثير.",
    },
    practice: {
      prompt: {
        ar: "راجع الدروس السابقة قبل محاولة الاختبار النهائي.",
      },
    },
    quiz: [
      {
        question: {
          ar: "أي مكون مسؤول بشكل أساسي عن تنفيذ تعليمات البرامج؟",
        },
        options: [
          {
            ar: "CPU",
          },
          {
            ar: "Monitor",
          },
          {
            ar: "Keyboard",
          },
          {
            ar: "SSD",
          },
        ],
        correct: 0,
      },
    ],
  },
];
