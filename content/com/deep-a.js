// Computer Basics — deep rewrite of lessons com-01 … com-05 (bodies only). Authored once as AR/EN pairs (see content/_doc.js).
import { T } from "../_doc.js";

const tm = (s) => `<span class="term">${s}</span>`;

export const defs = [
  // ───────────────────────── com-01 ─────────────────────────
  {
    id: "com-01",
    body: [
      { k: "objectives", items: [
        T(`تعرّف الكمبيوتر تعريفًا دقيقًا وتفرّق بينه وبين الآلة الحاسبة العادية.`, `Define a computer precisely and tell it apart from a simple fixed-function machine.`),
        T(`تحلّل أي جهاز إلى المراحل الأربع: ${tm("Input")} و${tm("Processing")} و${tm("Output")} و${tm("Storage")}.`, `Break any device down into four stages: ${tm("Input")}, ${tm("Processing")}, ${tm("Output")} and ${tm("Storage")}.`),
        T(`تذكر أنواع الأجهزة الحاسوبية من الهاتف إلى الخادم والنظم المدمجة.`, `Name the main families of computing devices, from phones to servers and embedded systems.`),
      ] },
      { k: "prereq", items: [T(`لا شيء؛ هذا أول درس في المسار.`, `None; this is the first lesson of the path.`)] },
      { k: "h", t: T(`مقدمة: آلة تتبع التعليمات`, `Introduction: a machine that follows instructions`) },
      { k: "p", t: T(`حين تضغط «إعجاب» على منشور، أو تسحب بطاقتك من جهاز الصراف الآلي، أو تضبط إعدادات تلفازك الذكي، فأنت تتعامل مع ${tm("Computer")}. الكمبيوتر جهاز إلكتروني <strong>قابل للبرمجة</strong>: يستقبل بيانات، ويعالجها وفق تعليمات مخزَّنة فيه، ثم يعطي نتيجة. الكلمة المهمة هنا هي «قابل للبرمجة»؛ فالمصباح الإلكتروني يعالج الكهرباء لكنه لا يغيّر سلوكه إذا غيّرنا التعليمات، أما الكمبيوتر فيصبح آلة لتحرير النصوص أو لعبة أو برنامج حسابات بمجرد تغيير البرنامج.`, `When you tap “like” on a post, pull your card out of an ATM, or change a setting on your smart TV, you are dealing with a ${tm("Computer")}. A computer is an electronic device that is <strong>programmable</strong>: it accepts data, processes it according to instructions stored inside it, and produces a result. The key word is “programmable”. A light switch handles electricity but never changes its behaviour; a computer becomes a word processor, a game or an accounting tool simply by swapping the program it runs.`) },
      { k: "p", t: T(`هذه الفكرة، أن التعليمات نفسها تُخزَّن في الذاكرة كما تُخزَّن البيانات، تُنسب إلى مفهوم ${tm("Stored-Program Computer")} الذي صاغه علماء في أربعينيات القرن العشرين، وما زالت أساس كل جهاز اليوم.`, `This idea, that the instructions themselves are kept in memory just like data, is known as the ${tm("Stored-Program Computer")} concept. It was worked out by researchers in the 1940s and is still the foundation of every device today.`) },

      { k: "h", t: T(`دورة المعالجة: أربع مراحل`, `The processing cycle: four stages`) },
      { k: "p", t: T(`كل ما يفعله أي كمبيوتر يمكن وصفه بأربع مراحل. تذكّرها لأنك ستستعملها لتحليل أي جهاز يقابلك في بقية المسار.`, `Everything a computer does can be described with four stages. Remember them, because you will use them to analyse any device you meet in the rest of this path.`) },
      { k: "flow", title: T(`مثال: كتابة رسالة وحفظها`, `Example: typing a message and saving it`), steps: [
        { label: T(`Input — الإدخال`, `Input`), sub: T(`تضغط مفاتيح لوحة المفاتيح فتتحول إلى إشارات رقمية`, `key presses on the keyboard become digital signals`) },
        { label: T(`Processing — المعالجة`, `Processing`), sub: T(`المعالج يحدد الحرف المضغوط ويحدّث نص الرسالة`, `the CPU identifies each character and updates the message text`) },
        { label: T(`Output — الإخراج`, `Output`), sub: T(`تظهر الحروف على الشاشة بعد لحظات`, `the characters appear on the screen a moment later`) },
        { label: T(`Storage — التخزين`, `Storage`), sub: T(`عند الحفظ تُكتب الرسالة على القرص لتبقى بعد إطفاء الجهاز`, `on save, the message is written to disk so it survives a shutdown`) },
      ] },
      { k: "p", t: T(`لاحظ أن المراحل ليست بالضرورة متتابعة دائمًا؛ فجهازك يخزّن ويعالج ويعرض في وقت واحد تقريبًا. لكنها تفيد كنموذج ذهني: لكل شيء مدخل، ومعالجة، ومخرج، وذاكرة يحتفظ بها.`, `The stages do not always happen strictly in order; your device stores, processes and displays almost at the same time. Still, the model is useful: everything has an input, some processing, an output, and memory that holds on to results.`) },
      { k: "table", head: [T(`الجهاز`, `Device`), T(`Input`, `Input`), T(`Processing`, `Processing`), T(`Output`, `Output`), T(`Storage`, `Storage`)], rows: [
        [T(`الهاتف الذكي`, `Smartphone`), T(`شاشة اللمس والميكروفون والكاميرا`, `touchscreen, microphone, camera`), T(`معالج SoC`, `SoC processor`), T(`الشاشة والسماعة`, `display and speaker`), T(`ذاكرة فلاش`, `flash memory`)],
        [T(`جهاز الصراف الآلي`, `ATM`), T(`البطاقة ولوحة الأرقام`, `card reader and keypad`), T(`حاسوب مدمج يتحقق من الحساب`, `embedded computer checking the account`), T(`الشاشة وموزع النقود`, `screen and cash dispenser`), T(`سجل العمليات`, `transaction log`)],
        [T(`الساعة الذكية`, `Smartwatch`), T(`مستشعر النبض`, `heart-rate sensor`), T(`معالج صغير منخفض الطاقة`, `small low-power processor`), T(`شاشة صغيرة واهتزاز`, `small display and vibration`), T(`بيانات النشاط`, `activity data`)],
      ] },

      { k: "h", t: T(`أنواع الأجهزة الحاسوبية`, `Families of computing devices`) },
      { k: "p", t: T(`الفرق بين الأنواع ليس في المبدأ، فكلها تتبع الدورة نفسها، بل في الحجم والقدرة والغرض.`, `The families differ not in principle, since they all follow the same cycle, but in size, power and purpose.`) },
      { k: "ul", items: [
        T(`<strong>الحاسوب الشخصي</strong> (Desktop وLaptop): لأغراض عامة، تثبّت عليه ما تشاء من البرامج.`, `<strong>Personal computers</strong> (desktop and laptop): general purpose; you install whatever programs you like.`),
        T(`<strong>الأجهزة المحمولة</strong> (هاتف، لوحي): تعتمد على رقاقة واحدة تجمع أكثر من مكوّن لتوفير الطاقة.`, `<strong>Mobile devices</strong> (phones, tablets): built around a single chip that combines several components to save power.`),
        T(`<strong>الخوادم</strong> (Servers): حواسيب قوية تعمل دائمًا وتخدم آلاف المستخدمين عبر الشبكة، مثل التي تستضيف المواقع.`, `<strong>Servers</strong>: powerful machines that run around the clock and serve thousands of users over a network, such as those hosting websites.`),
        T(`<strong>النظم المدمجة</strong> (Embedded Systems): حواسيب صغيرة مخصّصة لمهمة واحدة داخل غسالة أو سيارة أو جهاز طبي، ويستعمل الناس منها يوميًا أكثر مما يستعملون الحواسيب الشخصية.`, `<strong>Embedded systems</strong>: tiny computers dedicated to one job inside a washing machine, a car or a medical device. People use far more of these every day than they use personal computers.`),
      ] },
      { k: "note", kind: "info", t: T(`كلمة «كمبيوتر» كانت تُطلق قبل الآلات على البشر الذين يجرون الحسابات يدويًا، ثم انتقلت إلى الآلة التي حلّت محلهم.`, `The word “computer” originally referred to people who carried out calculations by hand; it later passed to the machines that replaced them.`) },

      { k: "h", t: T(`ماذا يميّز الكمبيوتر عن الآلة الحاسبة؟`, `What separates a computer from a calculator?`) },
      { k: "p", t: T(`الآلة الحاسبة البسيطة تنفّذ عمليات ثابتة مدمجة فيها. الكمبيوتر يتميز بثلاث خصائص: <strong>السرعة</strong> (مليارات العمليات البسيطة في الثانية)، و<strong>الدقة</strong> (ينفّذ العملية نفسها بالنتيجة نفسها)، و<strong>المرونة</strong> (تغيّر وظيفته بتغيير البرنامج). لكن انتبه: الكمبيوتر لا «يفهم» ولا «يفكر»؛ هو ينفّذ حرفيًا ما كتبه له المبرمج.`, `A basic calculator performs a fixed set of operations built into it. A computer is distinguished by three properties: <strong>speed</strong> (billions of simple operations per second), <strong>accuracy</strong> (the same operation always gives the same result) and <strong>flexibility</strong> (its function changes when the program changes). Be careful, though: a computer does not “understand” or “think”; it does literally what a programmer wrote for it.`) },
      { k: "code", lang: "javascript", code: "// A tiny program: input -> processing -> output\nconst price = 120;          // input (data)\nconst taxRate = 0.15;       // input (data)\nconst total = price * (1 + taxRate); // processing\nconsole.log(total);         // output" },
      { k: "out", code: "138" },
      { k: "p", t: T(`هذا البرنامج القصير يحوي المراحل الثلاث الأولى. غيّر القيم أو الصيغة وستتغير النتيجة دون أن تغيّر أي قطعة مادية.`, `This short program contains the first three stages. Change the values or the formula and the result changes without touching any physical part.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>الصحة:</strong> أجهزة التصوير بالرنين المغناطيسي تعالج ملايين القياسات لتبني صورة ثلاثية الأبعاد للجسم.`, `<strong>Healthcare:</strong> MRI scanners process millions of measurements to build a three-dimensional image of the body.`),
        T(`<strong>النقل:</strong> سيارة حديثة تحتوي عادة على عشرات الوحدات الحاسوبية الصغيرة تتحكم في المحرك والفرامل والوسائد الهوائية.`, `<strong>Transport:</strong> a modern car typically contains dozens of small computers controlling the engine, brakes and airbags.`),
        T(`<strong>التعليم:</strong> منصات التعلم تخزّن تقدمك وتقترح الدرس التالي.`, `<strong>Education:</strong> learning platforms store your progress and suggest the next lesson.`),
        T(`<strong>المال:</strong> التحويل المصرفي هو سلسلة من عمليات الإدخال والتحقق والتخزين تحدث في أجزاء من الثانية.`, `<strong>Finance:</strong> a bank transfer is a chain of input, validation and storage operations completed in a fraction of a second.`),
      ] },

      { k: "mistakes", items: [
        T(`«الكمبيوتر هو الصندوق أو الشاشة فقط»: الحاسوب نظام متكامل من مكوّنات مادية وبرامج، والصندوق مجرد غلاف.`, `“The computer is just the box or the screen”: a computer is a whole system of hardware and software; the case is only a shell.`),
        T(`«الكمبيوتر ذكي ويعرف ما أقصده»: هو ينفّذ التعليمات بدقة، ولذلك يعطيك نتيجة خاطئة تمامًا إذا كانت التعليمات خاطئة.`, `“The computer is smart and knows what I mean”: it executes instructions exactly, which is why wrong instructions give a perfectly confident wrong answer.`),
        T(`«الهاتف ليس كمبيوترًا»: الهاتف حاسوب كامل بمعالج وذاكرة وتخزين ونظام تشغيل، وقدرته تفوق حواسيب مكتبية قديمة.`, `“A phone is not a computer”: a phone is a complete computer with a processor, memory, storage and an operating system, and it outperforms many older desktops.`),
        T(`«التخزين والمعالجة شيء واحد»: التخزين يحتفظ بالبيانات، أما المعالجة فتغيّرها؛ وهما مكوّنان منفصلان.`, `“Storage and processing are the same thing”: storage keeps data, processing transforms it; they are separate components.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> إن كان حاسوب ينفّذ مليار عملية بسيطة في الثانية، فكم يستغرق تنفيذ 5 ملايين عملية؟`, `<strong>Calculation:</strong> if a computer performs one billion simple operations per second, how long do 5 million operations take?`), a: T(`<p>المدة = 5,000,000 ÷ 1,000,000,000 = 0.005 ثانية، أي 5 ميلي ثانية، وهو أقل بكثير مما يلاحظه الإنسان (نحو 100 ميلي ثانية). لهذا تبدو الحواسيب فورية في الأعمال الصغيرة.</p>`, `<p>Time = 5,000,000 ÷ 1,000,000,000 = 0.005 seconds, i.e. 5 milliseconds, far below what a person notices (roughly 100 ms). That is why computers feel instant on small jobs.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> هل المصعد الحديث كمبيوتر؟ حلّله بالمراحل الأربع.`, `<strong>Reasoning:</strong> is a modern elevator a computer? Analyse it with the four stages.`), a: T(`<p>نعم، يحتوي على حاسوب مدمج. الإدخال: أزرار الطوابق ومستشعرات الأبواب والوزن. المعالجة: برنامج يقرر أي طابق يخدم أولًا. الإخراج: تشغيل المحرك وإضاءة الأزرار. التخزين: يحتفظ بطلبات الطوابق وإعداداته. هو مبرمج لمهمة واحدة فقط، وهذا يجعله نظامًا مدمجًا لا حاسوبًا عامًا.</p>`, `<p>Yes, it contains an embedded computer. Input: floor buttons, door sensors and a load sensor. Processing: a program decides which floor to serve first. Output: driving the motor and lighting the buttons. Storage: it remembers pending requests and its settings. It is programmed for one job only, which makes it an embedded system rather than a general-purpose computer.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> التقط هاتفك وحدد مثالًا لكل مرحلة من المراحل الأربع أثناء التقاط صورة.`, `<strong>Hands-on:</strong> pick up your phone and identify one example of each of the four stages while taking a photo.`), a: T(`<p>الإدخال: عدسة الكاميرا ولمسة الشاشة. المعالجة: المعالج يضبط الإضاءة والتركيز ويضغط الصورة إلى JPEG أو HEIC. الإخراج: المعاينة على الشاشة وصوت الغالق. التخزين: حفظ الملف في ذاكرة الهاتف، ويمكنك التأكد بفتح معرض الصور وبعده تطبيق الملفات.</p>`, `<p>Input: the camera lens and your tap on the screen. Processing: the processor adjusts exposure and focus and compresses the image to JPEG or HEIC. Output: the on-screen preview and the shutter sound. Storage: the file is saved to phone memory, which you can confirm by opening the gallery and then the Files app.</p>`) },

      { k: "summary", items: [
        T(`الكمبيوتر جهاز إلكتروني قابل للبرمجة يعالج البيانات وفق تعليمات مخزَّنة.`, `A computer is a programmable electronic device that processes data according to stored instructions.`),
        T(`تُلخَّص وظيفته في Input وProcessing وOutput وStorage.`, `Its work is summarised as Input, Processing, Output and Storage.`),
        T(`الأنواع تختلف في الحجم والغرض لكنها تشترك في المبدأ نفسه.`, `The families differ in size and purpose but share the same principle.`),
        T(`قوته في السرعة والدقة والمرونة، لا في الفهم.`, `Its strength is speed, accuracy and flexibility, not understanding.`),
      ], next: T(`كيف يعمل الكمبيوتر؟ ننظر داخل الجهاز لنرى ما يحدث بين الضغطة والنتيجة.`, `How a Computer Works: we look inside the machine to see what happens between the click and the result.`) },
    ],
  },

  // ───────────────────────── com-02 ─────────────────────────
  {
    id: "com-02",
    body: [
      { k: "objectives", items: [
        T(`تتتبع رحلة البيانات بين الإدخال والذاكرة والمعالج والإخراج.`, `Trace the journey of data between input, memory, the processor and output.`),
        T(`تشرح دورة ${tm("Fetch-Decode-Execute")} وما تعنيه دورات الساعة.`, `Explain the ${tm("Fetch-Decode-Execute")} cycle and what clock cycles mean.`),
        T(`تصف ما يحدث من لحظة الضغط على زر التشغيل حتى ظهور سطح المكتب.`, `Describe what happens from pressing the power button to seeing the desktop.`),
      ] },
      { k: "prereq", items: [T(`درس «ما هو الكمبيوتر؟» (com-01).`, `The lesson “What is a computer?” (com-01).`)] },
      { k: "h", t: T(`مقدمة: ما بين الضغطة والنتيجة`, `Introduction: between the click and the result`) },
      { k: "p", t: T(`حين تنقر على أيقونة متصفحك، يمر زمن يقارب الثانية قبل ظهور النافذة. في هذه الثانية تحدث مليارات الخطوات الصغيرة: قراءة من القرص، ونقل إلى الذاكرة، وتنفيذ تعليمات في المعالج، ورسم على الشاشة. الهدف من هذا الدرس أن ترى الصورة الكبرى قبل أن ندخل في كل مكوّن على حدة في الدروس التالية.`, `When you click your browser icon, about a second passes before the window appears. In that second billions of tiny steps happen: reading from disk, moving data into memory, executing instructions on the processor, and drawing on the screen. This lesson gives you the big picture before later lessons examine each component on its own.`) },

      { k: "h", t: T(`المكوّنات الأساسية وأدوارها`, `The core components and their roles`) },
      { k: "p", t: T(`تعمل أربعة أجزاء معًا، ويربط بينها ما يسمى ${tm("Bus")}: مسارات كهربائية تنقل البيانات والعناوين والإشارات. الأجزاء هي: المعالج ${tm("CPU")} الذي ينفّذ التعليمات، والذاكرة ${tm("RAM")} التي تحمل ما نعمل عليه الآن، والتخزين ${tm("Storage")} الذي يحفظ كل شيء بشكل دائم، وأجهزة الإدخال والإخراج.`, `Four parts work together, linked by what is called a ${tm("Bus")}: electrical pathways that carry data, addresses and control signals. The parts are the ${tm("CPU")}, which executes instructions; ${tm("RAM")}, which holds what we are working on right now; ${tm("Storage")}, which keeps everything permanently; and the input and output devices.`) },
      { k: "diagram", title: T(`مسار البيانات داخل الجهاز`, `Data path inside the machine`), rows: [
        { label: T(`أجهزة الإدخال والإخراج`, `Input and output devices`), sub: T(`لوحة مفاتيح، فأرة، شاشة — أبطأ الأجزاء وتتعامل مع الإنسان`, `keyboard, mouse, display — the slowest part, facing the human`) },
        { label: T(`التخزين Storage`, `Storage`), sub: T(`SSD أو HDD — كبير ودائم لكنه أبطأ بكثير من الذاكرة`, `SSD or HDD — large and permanent but far slower than memory`) },
        { label: T(`الذاكرة RAM`, `Memory (RAM)`), sub: T(`سريعة ومؤقتة — تحمل البرامج والبيانات الجارية`, `fast and temporary — holds the running programs and data`) },
        { label: T(`المعالج CPU`, `The CPU`), sub: T(`الأسرع، ويحوي ذاكرة صغيرة جدًا تسمى Cache`, `the fastest part, with a tiny built-in memory called Cache`) },
      ] },
      { k: "note", kind: "info", t: T(`كلما اقتربنا من المعالج صارت الذاكرة أسرع وأصغر وأغلى لكل غيغابايت؛ وهذا هو سبب وجود طبقات متعددة بدل ذاكرة واحدة.`, `The closer memory sits to the processor, the faster, smaller and more expensive per gigabyte it is; that is why there are several layers instead of one memory.`) },

      { k: "h", t: T(`دورة Fetch-Decode-Execute`, `The Fetch-Decode-Execute cycle`) },
      { k: "p", t: T(`المعالج لا يفهم برامج كاملة، بل ينفّذ تعليمات بسيطة جدًا واحدة تلو الأخرى، مثل «اجمع هذين الرقمين» أو «انسخ قيمة من الذاكرة». لكل تعليمة ثلاث خطوات تتكرر بلا توقف:`, `The processor does not understand whole programs; it carries out very simple instructions one after another, such as “add these two numbers” or “copy a value from memory”. Each instruction goes through three steps that repeat without stopping:`) },
      { k: "ol", items: [
        T(`<strong>Fetch:</strong> يجلب المعالج التعليمة التالية من الذاكرة، ويحدد مكانها عدّاد خاص يسمى ${tm("Program Counter")}.`, `<strong>Fetch:</strong> the CPU fetches the next instruction from memory; a special counter called the ${tm("Program Counter")} tracks where it is.`),
        T(`<strong>Decode:</strong> تفكّ وحدة التحكم معنى التعليمة وتحدد ما المطلوب.`, `<strong>Decode:</strong> the control unit works out what the instruction means and what is required.`),
        T(`<strong>Execute:</strong> تنفّذ ${tm("ALU")} (وحدة الحساب والمنطق) العملية، ثم تُحفظ النتيجة في سجل أو في الذاكرة.`, `<strong>Execute:</strong> the ${tm("ALU")} (arithmetic logic unit) performs the operation, and the result is stored in a register or in memory.`),
      ] },
      { k: "code", lang: "text", code: "1: LOAD  A, 5      ; put 5 in register A\n2: LOAD  B, 3      ; put 3 in register B\n3: ADD   A, B      ; A = A + B\n4: STORE total, A  ; write A to memory at 'total'" },
      { k: "p", t: T(`هذه لغة تجميعية مبسّطة (Assembly) توضح الفكرة: أربع تعليمات تمرّ كل منها بالخطوات الثلاث، وفي النهاية تحتفظ الذاكرة بالقيمة 8. أما برنامج مثل <code>total = 5 + 3</code> بلغة عالية المستوى فيُترجم إلى سلسلة شبيهة بهذه.`, `This is a simplified assembly language that shows the idea: four instructions, each passing through the three steps, and at the end memory holds the value 8. A high-level statement such as <code>total = 5 + 3</code> is translated into a sequence like this.`) },

      { k: "h", t: T(`الساعة والسرعة`, `The clock and speed`) },
      { k: "p", t: T(`يعمل المعالج بإيقاع منتظم تضبطه ساعة داخلية، وكل نبضة تسمى ${tm("Clock Cycle")}. معالج بتردد 3.5 GHz ينفّذ نحو 3.5 مليار نبضة في الثانية، أي أن كل نبضة تستغرق حوالي 0.29 نانو ثانية. ومع ذلك فإن عدد التعليمات المنفَّذة في الثانية لا يساوي التردد تمامًا، فبعض التعليمات تحتاج نبضات متعددة وبعضها يُنفَّذ مع غيره في الوقت نفسه. سنعود لهذا في درس المعالج.`, `The processor works to a steady rhythm set by an internal clock, and each beat is a ${tm("Clock Cycle")}. A 3.5 GHz processor ticks about 3.5 billion times per second, so one cycle lasts roughly 0.29 nanoseconds. Even so, instructions completed per second is not exactly the frequency: some instructions need several cycles and others run alongside each other. We return to this in the CPU lesson.`) },

      { k: "h", t: T(`من زر التشغيل إلى سطح المكتب`, `From the power button to the desktop`) },
      { k: "flow", title: T(`مراحل الإقلاع Boot`, `The boot sequence`), steps: [
        { label: T(`التشغيل`, `Power on`), sub: T(`تصل الطاقة وتبدأ اللوحة الأم بتشغيل برنامج مخزَّن فيها يسمى Firmware (UEFI أو BIOS)`, `power reaches the motherboard, which runs a program stored on it called firmware (UEFI or BIOS)`) },
        { label: T(`فحص POST`, `POST check`), sub: T(`يتحقق Firmware من وجود المعالج والذاكرة والتخزين`, `the firmware checks that the CPU, memory and storage are present`) },
        { label: T(`برنامج الإقلاع`, `Bootloader`), sub: T(`يجد Firmware برنامجًا صغيرًا على القرص يحمّل نظام التشغيل`, `the firmware finds a small program on disk that loads the operating system`) },
        { label: T(`نظام التشغيل`, `Operating system`), sub: T(`تُنسخ النواة إلى RAM وتشغّل الخدمات الأساسية`, `the kernel is copied into RAM and starts the core services`) },
        { label: T(`سطح المكتب`, `Desktop`), sub: T(`تظهر الواجهة وتصبح جاهزًا لفتح البرامج`, `the interface appears and you can open programs`) },
      ] },
      { k: "p", t: T(`عند فتح برنامج بعد ذلك يتكرر النمط نفسه على نطاق أصغر: يُنسخ البرنامج من القرص إلى الذاكرة، ثم يبدأ المعالج بجلب تعليماته. ولهذا يكون الفتح الأول أبطأ من الثاني أحيانًا، فجزء من الملفات يبقى مخبَّأً في الذاكرة.`, `When you open a program afterwards, the same pattern repeats on a smaller scale: the program is copied from disk into memory, then the processor begins fetching its instructions. That is why the first launch is sometimes slower than the second: part of the files stay cached in memory.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>تشخيص البطء:</strong> إن عرفت أن المعالج والذاكرة والقرص يتشاركون العمل، فستعرف أن جهازًا يتباطأ عند فتح عدة برامج غالبًا يعاني من نقص الذاكرة لا من ضعف المعالج.`, `<strong>Diagnosing slowness:</strong> knowing that the CPU, memory and disk share the work tells you that a machine that slows down with many programs open usually lacks memory rather than CPU power.`),
        T(`<strong>اختيار الترقية:</strong> استبدال القرص الدوار بـ SSD يسرّع الإقلاع أكثر من تغيير المعالج في كثير من الحواسيب القديمة.`, `<strong>Choosing upgrades:</strong> replacing a spinning hard disk with an SSD speeds up boot more than changing the CPU in many older computers.`),
        T(`<strong>الإقلاع المزدوج والإصلاح:</strong> فهم Firmware وبرنامج الإقلاع يشرح كيف تُثبّت Linux بجوار Windows وكيف تُصلح جهازًا لا يقلع.`, `<strong>Dual boot and repair:</strong> understanding firmware and the bootloader explains how Linux is installed beside Windows and how to repair a machine that will not start.`),
      ] },

      { k: "mistakes", items: [
        T(`«المعالج يخزّن ملفاتي»: المعالج لا يخزّن شيئًا بشكل دائم؛ الملفات على القرص، والمعالج يعالج ما يصله مؤقتًا.`, `“The CPU stores my files”: the CPU stores nothing permanently; files live on disk and the CPU only processes what reaches it temporarily.`),
        T(`«المعالج يقرأ البرنامج من القرص مباشرة»: لا بد أن ينتقل البرنامج أولًا إلى الذاكرة، لأن القرص بطيء جدًا بالنسبة للمعالج.`, `“The CPU reads the program straight from disk”: the program must be copied into memory first, because the disk is far too slow for the processor.`),
        T(`«الجهاز بطيء إذن المعالج ضعيف»: البطء قد يأتي من الذاكرة أو القرص أو الشبكة أو البرمجيات، والنظام لا يسرع أكثر من أبطأ حلقة فيه.`, `“The machine is slow, so the CPU is weak”: slowness can come from memory, disk, network or software; a system is only as fast as its slowest link.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> معالج بتردد 4 GHz. كم نانو ثانية تستغرق النبضة الواحدة؟ وكم نبضة تحدث خلال ميلي ثانية؟`, `<strong>Calculation:</strong> a processor runs at 4 GHz. How many nanoseconds does one cycle take, and how many cycles occur in one millisecond?`), a: T(`<p>4 GHz تعني 4 مليار نبضة في الثانية، فالنبضة = 1 ÷ 4,000,000,000 = 0.25 نانو ثانية. وفي ميلي ثانية (جزء من ألف من الثانية) تحدث 4,000,000,000 ÷ 1000 = 4,000,000 نبضة.</p>`, `<p>4 GHz means 4 billion cycles per second, so one cycle = 1 ÷ 4,000,000,000 = 0.25 nanoseconds. In one millisecond (a thousandth of a second) there are 4,000,000,000 ÷ 1000 = 4,000,000 cycles.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> لماذا لا يُحمَّل برنامج من القرص إلى المعالج مباشرة دون المرور بالذاكرة؟`, `<strong>Reasoning:</strong> why is a program not loaded from disk straight into the processor, skipping memory?`), a: T(`<p>المعالج ينفّذ مليارات التعليمات في الثانية، بينما يحتاج SSD جيد إلى عشرات الميكروثواني لتلبية طلب واحد، والقرص الدوار إلى أجزاء من الثانية. لو انتظر المعالج القرص عند كل تعليمة لبقي معظم وقته خاملًا. الذاكرة أسرع بمئات المرات، فتقف وسيطًا يغذي المعالج بما يحتاج.</p>`, `<p>A processor executes billions of instructions per second, while a good SSD needs tens of microseconds to serve one request and a spinning disk several milliseconds. If the CPU waited on the disk for each instruction it would sit idle most of the time. Memory is hundreds of times faster, so it acts as a middleman that feeds the CPU what it needs.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> افتح مدير المهام أو مراقب النشاط، ولاحظ استهلاك المعالج والذاكرة والقرص قبل فتح متصفحك وبعد فتحه مع عدة تبويبات. ماذا تتوقع أن ترى؟`, `<strong>Hands-on:</strong> open Task Manager or Activity Monitor and watch CPU, memory and disk usage before launching your browser and after opening several tabs. What do you expect to see?`), a: T(`<p>عند الفتح يرتفع استخدام القرص لفترة قصيرة لأن الملفات تُقرأ، ثم ترتفع الذاكرة بشكل ملحوظ مع كل تبويب، بينما يقفز المعالج لحظيًا عند تحميل الصفحات ثم يهدأ. إن اقتربت الذاكرة من الامتلاء فسترى القرص يعمل باستمرار، وهي علامة على أن النظام يستعمل القرص بديلًا مؤقتًا للذاكرة.</p>`, `<p>On launch, disk usage rises briefly as files are read; memory then climbs noticeably with each tab, while the CPU spikes momentarily as pages load and then settles. If memory gets close to full you will see the disk working continuously, a sign that the system is using it as a temporary substitute for memory.</p>`) },

      { k: "summary", items: [
        T(`البيانات تنتقل من الإدخال والتخزين إلى الذاكرة ثم المعالج، وتعود النتيجة إلى الإخراج أو التخزين.`, `Data moves from input and storage into memory and then the CPU, and the result returns to output or storage.`),
        T(`المعالج ينفّذ تعليماته بدورة Fetch-Decode-Execute بإيقاع الساعة.`, `The CPU runs its instructions through the Fetch-Decode-Execute cycle at the pace of the clock.`),
        T(`الإقلاع سلسلة: Firmware ثم برنامج الإقلاع ثم نظام التشغيل.`, `Booting is a chain: firmware, then the bootloader, then the operating system.`),
        T(`أداء النظام يحدده توازن مكوّناته لا مكوّن واحد.`, `System performance is set by the balance of its parts, not one part.`),
      ], next: T(`Hardware و Software: نفرّق بين العتاد والبرمجيات ونرى كيف يتعاونان.`, `Hardware and Software: we separate the physical machine from the programs and see how they cooperate.`) },
    ],
  },

  // ───────────────────────── com-03 ─────────────────────────
  {
    id: "com-03",
    body: [
      { k: "objectives", items: [
        T(`تفرّق بين ${tm("Hardware")} و${tm("Software")} و${tm("Firmware")} بأمثلة صحيحة.`, `Distinguish ${tm("Hardware")}, ${tm("Software")} and ${tm("Firmware")} with correct examples.`),
        T(`تصنّف البرمجيات إلى برمجيات نظام وبرمجيات تطبيقية.`, `Classify software into system software and application software.`),
        T(`تشرح كيف يتواصل البرنامج مع العتاد عبر نظام التشغيل والسواقات.`, `Explain how a program reaches the hardware through the operating system and drivers.`),
      ] },
      { k: "prereq", items: [T(`دروس «ما هو الكمبيوتر؟» و«كيف يعمل الكمبيوتر؟».`, `The lessons “What is a computer?” and “How a computer works”.`)] },
      { k: "h", t: T(`مقدمة: الجسد والتعليمات`, `Introduction: the body and the instructions`) },
      { k: "p", t: T(`تخيّل بيانو بلا عازف، أو عازفًا بلا بيانو: كلاهما لا ينتج موسيقى. الحاسوب يعمل بالطريقة نفسها: عتاد يمكنه تنفيذ العمليات لكنه لا يعرف ماذا يفعل، وبرمجيات تعرف ماذا تفعل لكنها لا تستطيع تنفيذ شيء دون عتاد. الجهاز المفيد هو الذي يجمع الاثنين.`, `Imagine a piano with no pianist, or a pianist with no piano: neither makes music. A computer works the same way: hardware can carry out operations but does not know what to do, and software knows what to do but cannot run without hardware. A useful device combines the two.`) },

      { k: "h", t: T(`Hardware: الجزء المادي`, `Hardware: the physical part`) },
      { k: "p", t: T(`${tm("Hardware")} هو كل ما يمكن لمسه: المعالج والذاكرة والقرص واللوحة الأم والشاشة ولوحة المفاتيح والكابلات. ويُقسم عمليًا إلى مكوّنات داخلية (داخل الصندوق) وأجهزة طرفية ${tm("Peripherals")} تتصل به من الخارج كالطابعة والفأرة.`, `${tm("Hardware")} is everything you can touch: the processor, memory, disk, motherboard, screen, keyboard and cables. In practice it divides into internal components (inside the case) and ${tm("Peripherals")} that attach from outside, such as a printer or a mouse.`) },

      { k: "h", t: T(`Software: الجزء المنطقي`, `Software: the logical part`) },
      { k: "p", t: T(`${tm("Software")} هو مجموعة تعليمات وبيانات مكتوبة بلغات برمجة، لا تُلمس لكنها تُخزَّن كملفات. وللتمييز بين أنواعها نصنّفها حسب وظيفتها:`, `${tm("Software")} is a set of instructions and data written in programming languages; it cannot be touched but is stored as files. To tell kinds of software apart we classify them by function:`) },
      { k: "tree", title: T(`تصنيف البرمجيات`, `Classification of software`), root: { t: T(`Software`, `Software`), kind: "op", kids: [
        { t: T(`برمجيات النظام`, `System software`), kids: [
          { t: T(`نظام التشغيل (Windows, Linux, macOS, Android)`, `Operating system (Windows, Linux, macOS, Android)`), kids: [] },
          { t: T(`السواقات Drivers`, `Drivers`), kids: [] },
          { t: T(`أدوات مساعدة (ضغط، نسخ احتياطي)`, `Utilities (compression, backup)`), kids: [] },
        ] },
        { t: T(`برمجيات تطبيقية`, `Application software`), kids: [
          { t: T(`إنتاجية (Word, Excel)`, `Productivity (Word, Excel)`), kids: [] },
          { t: T(`تصفح وتواصل (Chrome, WhatsApp)`, `Browsing and messaging (Chrome, WhatsApp)`), kids: [] },
          { t: T(`إبداع وألعاب (Photoshop, ألعاب)`, `Creative and games (Photoshop, video games)`), kids: [] },
        ] },
      ] } },
      { k: "p", t: T(`<strong>نظام التشغيل</strong> يدير العتاد ويقدّم خدماته للتطبيقات، و<strong>السواقة</strong> (Driver) برنامج صغير يعرف كيف يتحدث إلى جهاز محدد كبطاقة رسومات أو طابعة. أما التطبيقات فتخدم المستخدم مباشرة.`, `The <strong>operating system</strong> manages the hardware and offers services to applications, while a <strong>driver</strong> is a small program that knows how to talk to one specific device such as a graphics card or a printer. Applications serve the user directly.`) },

      { k: "h", t: T(`Firmware: الحلقة الوسطى`, `Firmware: the middle ground`) },
      { k: "p", t: T(`${tm("Firmware")} برنامج مخزَّن بشكل دائم داخل شريحة في الجهاز نفسه، مثل UEFI على اللوحة الأم أو البرنامج الذي يشغّل جهاز التوجيه (Router) أو جهاز التحكم عن بعد. إنه برمجيات في جسد عتاد؛ تُحدَّث أحيانًا، لكنها تبقى بعد انقطاع الكهرباء.`, `${tm("Firmware")} is a program stored permanently inside a chip in the device itself, such as UEFI on the motherboard or the program that runs a router or a TV remote. It is software living in a piece of hardware; it can sometimes be updated but it persists when power is cut.`) },

      { k: "h", t: T(`كيف يتعاونان؟ طبقات`, `How they cooperate: layers`) },
      { k: "diagram", title: T(`طريق الطلب من التطبيق إلى العتاد`, `The path of a request from application to hardware`), rows: [
        { label: T(`التطبيق`, `Application`), sub: T(`«اطبع هذا المستند»`, `“print this document”`) },
        { label: T(`نظام التشغيل`, `Operating system`), sub: T(`يضع المستند في طابور الطباعة ويدير الصلاحيات`, `queues the document and manages permissions`) },
        { label: T(`السواقة Driver`, `Driver`), sub: T(`تترجم الطلب إلى أوامر تفهمها هذه الطابعة تحديدًا`, `translates the request into commands this specific printer understands`) },
        { label: T(`العتاد Hardware`, `Hardware`), sub: T(`الطابعة تحرّك الورق وتنفث الحبر`, `the printer moves paper and lays down ink`) },
      ] },
      { k: "table", head: [T(`الجانب`, `Aspect`), T(`Hardware`, `Hardware`), T(`Software`, `Software`)], rows: [
        [T(`الطبيعة`, `Nature`), T(`مادي ملموس`, `Physical, tangible`), T(`تعليمات وبيانات غير ملموسة`, `Intangible instructions and data`)],
        [T(`التغيير`, `Changing it`), T(`يحتاج استبدال قطع`, `Needs parts replaced`), T(`يتغير بالتثبيت أو التحديث`, `Changes through installing or updating`)],
        [T(`التلف`, `Failure`), T(`يتآكل ويتعطل`, `Wears out and breaks`), T(`لا يتآكل لكنه قد يحوي أخطاء Bugs`, `Does not wear out but can contain bugs`)],
        [T(`أمثلة`, `Examples`), T(`CPU, RAM, SSD, شاشة`, `CPU, RAM, SSD, display`), T(`Linux, Chrome, Excel`, `Linux, Chrome, Excel`)],
      ] },
      { k: "note", kind: "tip", t: T(`قاعدة سريعة: إن استطعت أن «تنسخه» دون أن تحتاج لمصنع فهو Software؛ وإن احتاج تصنيعًا ومادة خام فهو Hardware.`, `Quick rule: if you can copy it without needing a factory, it is software; if making it needs manufacturing and raw material, it is hardware.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>تحديث الهاتف:</strong> يحسّن كاميرا هاتفك دون تغيير العدسة، لأن جزءًا من جودة الصورة يأتي من البرمجيات.`, `<strong>Phone updates:</strong> an update can improve your phone camera without changing the lens, because part of image quality comes from software.`),
        T(`<strong>السواقات:</strong> بطاقة رسومات جديدة قد تعمل بأداء ضعيف حتى تثبّت سائقها الصحيح.`, `<strong>Drivers:</strong> a new graphics card may perform poorly until you install its correct driver.`),
        T(`<strong>الأجهزة الذكية:</strong> التلفاز والثلاجة وجهاز التوجيه كلها عتاد يعمل ببرنامج Firmware قابل للتحديث لسد الثغرات الأمنية.`, `<strong>Smart appliances:</strong> TVs, fridges and routers are hardware driven by updatable firmware, which is how security holes get patched.`),
        T(`<strong>الحوسبة السحابية:</strong> ما يبدو لك «خدمة افتراضية» يعمل فعليًا على عتاد مادي في مراكز بيانات.`, `<strong>Cloud computing:</strong> what looks like a “virtual service” actually runs on physical hardware in data centres.`),
      ] },

      { k: "mistakes", items: [
        T(`«القرص المضغوط الذي عليه البرنامج هو Software»: القرص عتاد، والبرنامج هو المحتوى المسجل عليه.`, `“The disc a program comes on is software”: the disc is hardware; the program is the content recorded on it.`),
        T(`«تحديث البرنامج يجعل العتاد أسرع دائمًا»: التحديث قد يحسّن الاستفادة من العتاد لكنه لا يزيد قدرته الفعلية، وقد يبطئ جهازًا قديمًا أحيانًا.`, `“Updating software always makes hardware faster”: an update may use hardware better but cannot raise its real capability, and it can even slow an old device.`),
        T(`«نظام التشغيل جزء من العتاد لأنه يأتي مع الجهاز»: هو برنامج مخزَّن على التخزين، ويمكن استبداله.`, `“The operating system is hardware because it comes with the device”: it is a program stored on storage and can be replaced.`),
        T(`«السحابة لا تحتاج عتادًا»: كل خدمة سحابية تقف خلفها خوادم مادية.`, `“The cloud needs no hardware”: every cloud service stands on physical servers.`),
      ] },

      { k: "ex", q: T(`<strong>تصنيف:</strong> صنّف كلًا مما يلي: Windows، RAM، Chrome، شاشة، UEFI، سائق الطابعة.`, `<strong>Classification:</strong> classify each of these: Windows, RAM, Chrome, a monitor, UEFI, a printer driver.`), a: T(`<p>Windows: برمجيات نظام. RAM: عتاد. Chrome: برمجيات تطبيقية. الشاشة: عتاد (جهاز إخراج). UEFI: Firmware، أي برنامج مخزَّن في شريحة على اللوحة الأم. سائق الطابعة: برمجيات نظام تتوسط بين نظام التشغيل والطابعة.</p>`, `<p>Windows: system software. RAM: hardware. Chrome: application software. The monitor: hardware (an output device). UEFI: firmware, a program stored in a chip on the motherboard. The printer driver: system software that sits between the operating system and the printer.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> وصّلت ماسحًا ضوئيًا جديدًا بحاسوبك فلم يظهر في قائمة الأجهزة رغم أن الكابل سليم. ما التفسير الأرجح وما الحل؟`, `<strong>Reasoning:</strong> you plugged a new scanner into your computer and it does not appear in the device list although the cable is fine. What is the likely cause and fix?`), a: T(`<p>العتاد سليم لكن نظام التشغيل لا يملك البرنامج الذي يخاطبه، أي السائق. الحل: تثبيت السائق من موقع الشركة المصنّعة أو من تحديثات النظام، ثم إعادة توصيل الجهاز. ويبيّن ذلك أن العتاد وحده لا يكفي.</p>`, `<p>The hardware is fine, but the operating system lacks the program that talks to it, the driver. The fix is to install the driver from the manufacturer or through system updates, then reconnect the device. It shows that hardware alone is not enough.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> افتح إعدادات النظام ثم صفحة «حول الجهاز» (About). اكتب اسم المعالج وحجم الذاكرة وإصدار نظام التشغيل، وصنّف كل معلومة.`, `<strong>Hands-on:</strong> open your system settings and the “About” page. Write down the processor name, memory size and operating system version, and classify each.`), a: T(`<p>ستجد مثلًا معالجًا بعدد أنوية وتردد معينين وذاكرة 8 أو 16 غيغابايت، وهذه معلومات عن العتاد. أما اسم النظام وإصداره (مثل Windows 11 أو Android 14) فمعلومة عن البرمجيات. إن وجدت «إصدار البرنامج الثابت» فهو Firmware. لاحظ أن تغيير الإصدار ممكن بالتحديث، بينما تغيير حجم الذاكرة يحتاج قطعة جديدة.</p>`, `<p>You will find, for example, a processor with a certain number of cores and speed and 8 or 16 GB of memory; these describe hardware. The system name and version (such as Windows 11 or Android 14) describe software. If you see a “firmware version”, that is firmware. Notice that the version can change with an update, while the memory size needs a new part.</p>`) },

      { k: "summary", items: [
        T(`Hardware هو المادي، وSoftware هو التعليمات، وFirmware برنامج دائم في شريحة.`, `Hardware is the physical, software is the instructions, and firmware is a permanent program inside a chip.`),
        T(`البرمجيات نوعان رئيسيان: نظام وتطبيقات.`, `Software has two main kinds: system and application.`),
        T(`التطبيق يصل للعتاد عبر نظام التشغيل والسواقات.`, `An application reaches hardware through the operating system and drivers.`),
      ], next: T(`المعالج CPU: ننظر عن قرب إلى أهم مكوّن في العتاد.`, `The CPU: a closer look at the most important hardware component.`) },
    ],
  },

  // ───────────────────────── com-04 ─────────────────────────
  {
    id: "com-04",
    body: [
      { k: "objectives", items: [
        T(`تشرح بنية ${tm("CPU")} الداخلية: ${tm("ALU")} و${tm("Control Unit")} و${tm("Registers")}.`, `Explain the internal structure of the ${tm("CPU")}: the ${tm("ALU")}, the ${tm("Control Unit")} and ${tm("Registers")}.`),
        T(`تفهم معنى ${tm("Core")} و${tm("Thread")} والتردد و${tm("Cache")}.`, `Understand what a ${tm("Core")}, a ${tm("Thread")}, clock speed and ${tm("Cache")} mean.`),
        T(`تقارن بين معالجين بشكل صحيح بدل الاكتفاء بالتردد.`, `Compare two processors properly instead of relying on clock speed alone.`),
      ] },
      { k: "prereq", items: [T(`درسا «كيف يعمل الكمبيوتر؟» و«Hardware و Software».`, `The lessons “How a computer works” and “Hardware and Software”.`)] },
      { k: "h", t: T(`مقدمة: مصنع التعليمات`, `Introduction: the instruction factory`) },
      { k: "p", t: T(`${tm("CPU")} (وحدة المعالجة المركزية) رقاقة سيليكون بحجم طابع بريد تقريبًا، لكنها تحوي مليارات الترانزستورات، وهي مفاتيح كهربائية صغيرة تُفتح وتُغلق لتمثيل 0 و1. وظيفتها الجوهرية هي دورة Fetch-Decode-Execute التي رأيناها، لكن ما يميّز معالجًا عن آخر هو كيف يؤدي هذه الدورة وكم مرة في الوقت نفسه.`, `The ${tm("CPU")} (central processing unit) is a silicon chip about the size of a postage stamp, yet it holds billions of transistors, tiny electrical switches that open and close to represent 0 and 1. Its core job is the Fetch-Decode-Execute cycle we saw earlier, but what sets one processor apart from another is how it performs that cycle and how many at once.`) },

      { k: "h", t: T(`البنية الداخلية`, `Internal structure`) },
      { k: "diagram", title: T(`أجزاء النواة الواحدة`, `Parts of a single core`), rows: [
        { label: T(`وحدة التحكم Control Unit`, `Control Unit`), sub: T(`تجلب التعليمات وتفكّها وتوجّه باقي الأجزاء`, `fetches and decodes instructions and directs the other parts`) },
        { label: T(`ALU`, `ALU`), sub: T(`وحدة الحساب والمنطق: تجمع وتطرح وتقارن`, `arithmetic logic unit: adds, subtracts and compares`) },
        { label: T(`السجلات Registers`, `Registers`), sub: T(`خانات صغيرة جدًا وسريعة تحمل القيم الجارية`, `very small, very fast slots holding the values in use`) },
        { label: T(`ذاكرة Cache`, `Cache`), sub: T(`ذاكرة أسرع من RAM تحتفظ بنسخ مما يُستعمل كثيرًا`, `memory faster than RAM that keeps copies of frequently used data`) },
      ] },
      { k: "p", t: T(`<strong>Cache</strong> مرتّب في مستويات: L1 الأصغر والأسرع (عشرات الكيلوبايت لكل نواة)، ثم L2، ثم L3 المشترك بين الأنوية والذي قد يبلغ عشرات الميغابايت. عندما يجد المعالج ما يحتاجه في Cache يسمى ذلك <span class="term">Cache Hit</span>، وإلا يضطر للذهاب إلى RAM الأبطأ بعدة أضعاف.`, `<strong>Cache</strong> is arranged in levels: L1 is smallest and fastest (tens of kilobytes per core), then L2, then L3 which is shared between cores and can reach tens of megabytes. When the CPU finds what it needs in cache this is a <span class="term">Cache Hit</span>; otherwise it must go to RAM, which is several times slower.`) },

      { k: "h", t: T(`الأنوية والخيوط`, `Cores and threads`) },
      { k: "p", t: T(`${tm("Core")} هو معالج كامل مصغّر داخل الرقاقة، يستطيع تنفيذ سلسلة تعليمات بمفرده. المعالج بأربع أنوية يستطيع تنفيذ أربع مهام فعلًا في اللحظة نفسها. وبعض المعالجات تدعم تقنية ${tm("SMT")} (مثل Hyper-Threading عند Intel) تجعل كل نواة تتظاهر بنواتين منطقيتين، فتُظهر «خيوطًا» أكثر؛ المعالج 4 أنوية / 8 خيوط مثال شائع.`, `A ${tm("Core")} is a complete miniature processor inside the chip that can run an instruction stream on its own. A four-core CPU can genuinely work on four tasks at the same moment. Some processors support ${tm("SMT")} (such as Intel's Hyper-Threading), which lets each core present itself as two logical cores and so exposes more “threads”; a 4-core / 8-thread chip is a common example.`) },
      { k: "p", t: T(`الأنوية الإضافية تفيد حين يمكن تقسيم العمل: تحرير الفيديو وتشغيل عدة برامج معًا. أما برنامج يعمل بمسار واحد فلن يستفيد من أكثر من نواة واحدة.`, `Extra cores help when the work can be split: video editing, or running several programs together. A program that follows a single path cannot use more than one core.`) },

      { k: "h", t: T(`التردد ليس كل شيء`, `Clock speed is not everything`) },
      { k: "p", t: T(`التردد (GHz) هو عدد النبضات في الثانية، لكن ما يهم هو عدد التعليمات المنجزة في الثانية، أي تقريبًا: <code>clock × IPC</code>، حيث ${tm("IPC")} متوسط التعليمات المنفَّذة في كل نبضة. معالج أحدث بتردد أقل قد يتفوق على قديم بتردد أعلى لأن IPC عنده أكبر.`, `Clock speed (GHz) is the number of cycles per second, but what matters is instructions completed per second, roughly <code>clock × IPC</code>, where ${tm("IPC")} is the average number of instructions executed per cycle. A newer processor at a lower clock can beat an older one at a higher clock because its IPC is larger.`) },
      { k: "table", head: [T(`المعالج`, `CPU`), T(`التردد`, `Clock`), T(`IPC (مفترض)`, `IPC (assumed)`), T(`الأداء التقريبي`, `Approximate throughput`)], rows: [
        [T(`قديم`, `Older`), T(`4.0 GHz`, `4.0 GHz`), T(`2`, `2`), T(`8 مليار تعليمة/ث`, `8 billion instr/s`)],
        [T(`حديث`, `Newer`), T(`3.2 GHz`, `3.2 GHz`), T(`4`, `4`), T(`12.8 مليار تعليمة/ث`, `12.8 billion instr/s`)],
      ] },
      { k: "note", kind: "warn", t: T(`أرقام IPC في الجدول أمثلة تعليمية مبسّطة وليست قياسات لمعالجات بعينها.`, `The IPC figures in the table are simplified teaching values, not measurements of specific processors.`) },
      { k: "p", t: T(`هناك أيضًا ${tm("Boost Clock")}: يرفع المعالج ترددّه مؤقتًا حين يكون هناك حرارة وطاقة كافيتان، ثم يخفضه عند السخونة، وهذا ما يُسمى Thermal Throttling.`, `There is also ${tm("Boost Clock")}: the processor raises its frequency temporarily when heat and power allow, then lowers it when it gets hot, which is called thermal throttling.`) },

      { k: "h", t: T(`المعمارية: x86 وARM`, `Architecture: x86 and ARM`) },
      { k: "p", t: T(`لكل عائلة معالجات مجموعة تعليمات ${tm("ISA")} خاصة بها. معالجات حواسيب سطح المكتب والمحمولة عمومًا من عائلة x86-64 (Intel وAMD)، بينما الهواتف وأجهزة Apple Silicon تعتمد معمارية ARM المعروفة بكفاءتها في استهلاك الطاقة. البرنامج المترجم لمعمارية لا يعمل مباشرة على أخرى دون ترجمة أو محاكاة.`, `Each processor family has its own instruction set, the ${tm("ISA")}. Desktop and laptop processors are generally from the x86-64 family (Intel and AMD), while phones and Apple Silicon machines use the ARM architecture, known for energy efficiency. A program compiled for one architecture does not run directly on another without translation or emulation.`) },
      { k: "code", lang: "bash", code: "nproc          # number of logical processors (Linux)\nlscpu | head -n 8   # architecture, cores, model name" },
      { k: "out", code: "8\nArchitecture:  x86_64\nCPU(s):        8\nThread(s) per core: 2\nCore(s) per socket: 4\nModel name:    (your CPU name)" },
      { k: "p", t: T(`الناتج أعلاه مثال؛ سيختلف حسب جهازك، لكن العلاقة ثابتة: عدد المعالجات المنطقية = الأنوية × الخيوط لكل نواة (هنا 4 × 2 = 8).`, `The output above is an example and will differ on your machine, but the relation is fixed: logical processors = cores × threads per core (here 4 × 2 = 8).`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>شراء جهاز:</strong> للألعاب يهم الأداء لكل نواة مع بطاقة رسومات جيدة، وللمونتاج والترجمة البرمجية يفيد عدد أكبر من الأنوية.`, `<strong>Buying a machine:</strong> for gaming, per-core performance matters along with a good graphics card; for video editing and compiling code, more cores help.`),
        T(`<strong>الهواتف:</strong> تجمع بعض الهواتف أنوية قوية وأخرى موفّرة للطاقة، فتبدّل بينها حسب الحمل لإطالة عمر البطارية.`, `<strong>Phones:</strong> many phones combine powerful cores with energy-saving ones and switch between them by workload to extend battery life.`),
        T(`<strong>الخوادم:</strong> معالجات الخوادم قد تحوي عشرات الأنوية لخدمة طلبات كثيرة في وقت واحد.`, `<strong>Servers:</strong> server processors can have dozens of cores to handle many requests at once.`),
      ] },

      { k: "mistakes", items: [
        T(`«كلما زادت GHz كان أسرع دائمًا»: الأداء يعتمد على IPC وعدد الأنوية وCache والمعمارية، وليس التردد وحده.`, `“More GHz is always faster”: performance depends on IPC, core count, cache and architecture, not clock speed alone.`),
        T(`«ضعف عدد الأنوية يعني ضعف السرعة»: هذا صحيح فقط للبرامج التي تقسّم عملها على الأنوية، أما الباقي فيستخدم نواة واحدة.`, `“Double the cores means double the speed”: that holds only for programs that split their work across cores; others use a single core.`),
        T(`«الخيوط مثل الأنوية الحقيقية»: النواة ذات الخيطين تعطي عادة مكسبًا يقارب 20 إلى 30 في المئة، لا ضعفًا كاملًا.`, `“Threads are as good as real cores”: a two-thread core typically gives a gain of roughly 20 to 30 percent, not a full doubling.`),
        T(`«المعالج هو الذاكرة التي يعتمد عليها الجهاز»: Cache صغير جدًا؛ والتخزين الحقيقي في RAM والقرص.`, `“The CPU is where the machine keeps its memory”: cache is tiny; the real storage is in RAM and on disk.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> المعالج A بتردد 3.0 GHz وIPC = 3، والمعالج B بتردد 4.0 GHz وIPC = 2 (لنواة واحدة). أيهما أسرع؟`, `<strong>Calculation:</strong> processor A runs at 3.0 GHz with IPC = 3, and processor B at 4.0 GHz with IPC = 2 (one core each). Which is faster?`), a: T(`<p>A: 3.0 × 3 = 9 مليار تعليمة في الثانية. B: 4.0 × 2 = 8 مليار. إذن A أسرع بنحو 12.5 في المئة رغم أن تردده أقل، لأن IPC يعوّض.</p>`, `<p>A: 3.0 × 3 = 9 billion instructions per second. B: 4.0 × 2 = 8 billion. So A is about 12.5 percent faster despite the lower clock, because IPC makes up for it.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> برنامج يقضي نصف وقته في عمل يمكن توزيعه على الأنوية والنصف الآخر في عمل متسلسل. هل يتسارع إلى الضعف بثماني أنوية؟`, `<strong>Reasoning:</strong> a program spends half its time on work that can be spread across cores and half on strictly sequential work. Does it get twice as fast with eight cores?`), a: T(`<p>لا. الجزء المتسلسل يبقى كما هو. مع ثماني أنوية يصبح الجزء الموزَّع 1/8 من نصف الوقت، أي 0.0625، والمتسلسل 0.5، فالمجموع 0.5625 من الزمن الأصلي، أي تسارع قدره نحو 1.78 مرة فقط. هذه فكرة قانون أمدال وتفسر لماذا لا تحقق الأنوية الإضافية مكسبًا خطيًا.</p>`, `<p>No. The sequential part stays as it is. With eight cores the parallel half shrinks to 1/8 of half the time, i.e. 0.0625, plus the sequential 0.5, for a total of 0.5625 of the original time, a speed-up of only about 1.78 times. This is the idea behind Amdahl's law and explains why extra cores do not scale linearly.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> افتح مدير المهام (Windows) ثم تبويب الأداء ثم المعالج، أو شغّل <code>lscpu</code>. اكتب عدد الأنوية والمعالجات المنطقية والتردد، وافحص العلاقة بينها.`, `<strong>Hands-on:</strong> open Task Manager (Windows), then the Performance tab, then CPU, or run <code>lscpu</code>. Write down the number of cores, logical processors and the clock speed, and check how they relate.`), a: T(`<p>ستجد مثلًا «Cores: 6، Logical processors: 12». إن كان الرقم الثاني ضعف الأول فالجهاز يدعم SMT. التردد المعروض قد يتغير أثناء المشاهدة بين الأساسي والـ Boost. وإن فتحت برنامجًا ثقيلًا فسترى أي أنوية ترتفع نسبة استخدامها؛ فإن ارتفعت نواة واحدة فقط فالبرنامج أحادي المسار.</p>`, `<p>You may see, for example, “Cores: 6, Logical processors: 12”. If the second number is double the first, the machine supports SMT. The displayed clock can change while you watch, moving between base and boost. If you run a heavy program you can see which cores climb in usage; if only one does, the program is single-threaded.</p>`) },

      { k: "summary", items: [
        T(`المعالج يجمع وحدة تحكم وALU وسجلات وCache وينفّذ التعليمات بالدورة المعروفة.`, `The CPU combines a control unit, an ALU, registers and cache, and runs instructions through the familiar cycle.`),
        T(`الأنوية تتيح العمل المتوازي، لكن المكسب يعتمد على قابلية البرنامج للتقسيم.`, `Cores enable parallel work, but the gain depends on how well a program can be split.`),
        T(`قارن المعالجات بالتردد وIPC والأنوية وCache معًا، لا بالتردد وحده.`, `Compare processors by clock, IPC, cores and cache together, not clock alone.`),
      ], next: T(`الذاكرة RAM: نرى أين يحتفظ الحاسوب بما يعمل عليه الآن.`, `RAM: where the computer keeps what it is working on right now.`) },
    ],
  },

  // ───────────────────────── com-05 ─────────────────────────
  {
    id: "com-05",
    body: [
      { k: "objectives", items: [
        T(`تشرح ما هي ${tm("RAM")} ولماذا تُعد ذاكرة مؤقتة (${tm("Volatile")}).`, `Explain what ${tm("RAM")} is and why it is temporary (${tm("Volatile")}) memory.`),
        T(`تقارن بين RAM والتخزين من حيث السرعة والسعة والدوام.`, `Compare RAM with storage in speed, capacity and persistence.`),
        T(`تحسب احتياج الذاكرة تقريبيًا وتفهم ما يحدث حين تمتلئ.`, `Estimate memory needs roughly and understand what happens when it fills up.`),
      ] },
      { k: "prereq", items: [T(`دروس «كيف يعمل الكمبيوتر؟» و«المعالج CPU».`, `The lessons “How a computer works” and “The CPU”.`)] },
      { k: "h", t: T(`مقدمة: طاولة العمل`, `Introduction: the workbench`) },
      { k: "p", t: T(`تخيّل مكتبة ضخمة (التخزين) وطاولة عمل أمامك (RAM). لا تعمل على الكتب داخل المكتبة، بل تحضر ما تحتاجه إلى الطاولة، وكلما كبرت الطاولة وضعت عليها مراجع أكثر في وقت واحد. ${tm("RAM")} (Random Access Memory) هي هذه الطاولة: مساحة سريعة يضع فيها نظام التشغيل البرامج والبيانات التي تُستعمل الآن ليصل إليها المعالج بسرعة.`, `Imagine a huge library (storage) and a workbench in front of you (RAM). You do not work on books inside the library; you bring what you need to the bench, and the bigger the bench the more references you can lay out at once. ${tm("RAM")} (Random Access Memory) is that bench: a fast space where the operating system puts the programs and data in use so the processor can reach them quickly.`) },
      { k: "p", t: T(`كلمة «عشوائي» لا تعني الفوضى، بل أن أي موضع في الذاكرة يمكن الوصول إليه مباشرة بعنوانه، في زمن متقارب، دون المرور على ما قبله.`, `“Random” does not mean chaotic; it means any location in memory can be reached directly by its address in roughly the same time, without reading everything before it.`) },

      { k: "h", t: T(`لماذا تفقد RAM محتواها؟`, `Why does RAM lose its contents?`) },
      { k: "p", t: T(`معظم ذاكرة الحواسيب هي ${tm("DRAM")}: كل بت فيها يُخزَّن كشحنة كهربائية دقيقة في مكثف صغير، والشحنة تتسرب خلال أجزاء من الثانية فتحتاج إلى إنعاش دوري. وعند انقطاع الكهرباء يختفي كل شيء، ولذلك تسمى ذاكرة <strong>متطايرة</strong>. في المقابل يحتفظ SSD أو HDD ببياناته بلا كهرباء.`, `Most computer memory is ${tm("DRAM")}: each bit is stored as a tiny electrical charge in a small capacitor, and the charge leaks away within fractions of a second, so it must be refreshed constantly. When power is cut everything vanishes, which is why it is called <strong>volatile</strong> memory. An SSD or HDD, by contrast, keeps its data without power.`) },

      { k: "h", t: T(`RAM مقابل التخزين`, `RAM versus storage`) },
      { k: "table", head: [T(`الخاصية`, `Property`), T(`RAM`, `RAM`), T(`SSD`, `SSD`), T(`HDD`, `HDD`)], rows: [
        [T(`السعة النموذجية`, `Typical capacity`), T(`8 إلى 32 GB`, `8 to 32 GB`), T(`256 GB إلى 2 TB`, `256 GB to 2 TB`), T(`1 إلى 8 TB`, `1 to 8 TB`)],
        [T(`زمن الوصول التقريبي`, `Approximate access time`), T(`نحو 100 نانو ثانية`, `about 100 nanoseconds`), T(`نحو 0.1 ميلي ثانية`, `about 0.1 milliseconds`), T(`نحو 5 إلى 10 ميلي ثانية`, `about 5 to 10 milliseconds`)],
        [T(`الدوام`, `Persistence`), T(`تزول عند الإطفاء`, `Lost at power-off`), T(`دائمة`, `Permanent`), T(`دائمة`, `Permanent`)],
        [T(`السعر لكل GB`, `Price per GB`), T(`الأعلى`, `Highest`), T(`متوسط`, `Medium`), T(`الأقل`, `Lowest`)],
      ] },
      { k: "p", t: T(`الأرقام أعلاه تقديرية وتتفاوت حسب الجيل والطراز، لكن النسبة بينها هي المهمة: الوصول إلى RAM أسرع من SSD بآلاف المرات تقريبًا.`, `The figures above are approximate and vary by generation and model, but the ratio is what matters: accessing RAM is roughly thousands of times faster than an SSD.`) },

      { k: "h", t: T(`الأنواع والعرض الترددي`, `Types and bandwidth`) },
      { k: "p", t: T(`الجيل الشائع حاليًا هو ${tm("DDR4")} و${tm("DDR5")} (Double Data Rate): تنقل البيانات مرتين في كل نبضة. تُقاس سرعتها بـ MT/s أي ملايين عمليات النقل في الثانية. ناقل الذاكرة عرضه 64 بت = 8 بايت، فذاكرة DDR4-3200 تنقل نظريًا 3200 × 8 = 25,600 ميغابايت في الثانية، أي نحو 25.6 GB/s في القناة الواحدة. وتتضاعف تقريبًا عند استعمال قناتين (Dual Channel) بوحدتين متطابقتين.`, `The common generations today are ${tm("DDR4")} and ${tm("DDR5")} (Double Data Rate): they transfer data twice per clock cycle. Speed is measured in MT/s, millions of transfers per second. The memory bus is 64 bits = 8 bytes wide, so DDR4-3200 theoretically moves 3200 × 8 = 25,600 MB per second, about 25.6 GB/s per channel. It roughly doubles with two channels (dual channel) using two matching modules.`) },
      { k: "note", kind: "info", t: T(`وحدات DDR4 وDDR5 لا تتبادل؛ فلكل جيل فتحة وشكل مختلفان، وتحدد اللوحة الأم الجيل المدعوم.`, `DDR4 and DDR5 modules are not interchangeable; each generation has a different slot notch, and the motherboard decides which one is supported.`) },

      { k: "h", t: T(`ماذا يحدث حين تمتلئ الذاكرة؟`, `What happens when memory fills up?`) },
      { k: "flow", title: T(`امتلاء الذاكرة`, `When memory runs short`), steps: [
        { label: T(`تفتح برامج أكثر`, `You open more programs`), sub: T(`يزداد ما يطلبه النظام من RAM`, `the system demands more RAM`) },
        { label: T(`الذاكرة تقترب من الامتلاء`, `Memory nears full`), sub: T(`يحذف النظام أولًا ما يخبّئه من ملفات يمكن إعادة قراءتها`, `the system first drops cached files that can be re-read`) },
        { label: T(`الذاكرة الافتراضية`, `Virtual memory`), sub: T(`ينقل النظام أجزاء غير مستعملة إلى القرص (Swap أو Page File)`, `the system moves unused pieces to disk (swap or page file)`) },
        { label: T(`تباطؤ ملحوظ`, `Noticeable slowdown`), sub: T(`الوصول للقرص أبطأ بكثير فيشعر المستخدم بالتجمد`, `disk access is far slower, so the user feels freezing`) },
      ] },
      { k: "code", lang: "bash", code: "free -h" },
      { k: "out", code: "              total   used   free   shared  buff/cache  available\nMem:           15Gi   6.2Gi  1.1Gi   0.4Gi        8.0Gi       8.6Gi\nSwap:         2.0Gi   0B     2.0Gi" },
      { k: "p", t: T(`في هذا المثال (قيم توضيحية) تبدو الذاكرة «الحرّة» 1.1 فقط، لكن عمود <code>available</code> يبيّن أن 8.6 متاحة فعليًا، لأن النظام يستعمل الباقي مخبّأً ويستطيع إخلاءه عند الحاجة.`, `In this example (illustrative values) “free” memory looks like only 1.1, but the <code>available</code> column shows 8.6 is actually obtainable, because the system uses the rest as a cache and can release it on demand.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>التصفح:</strong> كل تبويب في المتصفح قد يستهلك مئات الميغابايت، فعشرون تبويبًا قد تستهلك عدة غيغابايتات.`, `<strong>Browsing:</strong> each browser tab can use hundreds of megabytes, so twenty tabs can take several gigabytes.`),
        T(`<strong>المونتاج والتصميم:</strong> الملفات الكبيرة والطبقات المتعددة تحتاج ذاكرة أكبر، وغالبًا يوصى بـ 16 GB أو أكثر.`, `<strong>Video and design work:</strong> large files and many layers need more memory; 16 GB or more is often recommended.`),
        T(`<strong>الخوادم وقواعد البيانات:</strong> تحتفظ بالبيانات الأكثر طلبًا في RAM للإجابة بسرعة.`, `<strong>Servers and databases:</strong> they keep the most requested data in RAM to answer quickly.`),
        T(`<strong>الهواتف:</strong> عندما «تُغلق» تطبيقًا في الخلفية فقد يكون النظام أخرجه من الذاكرة ليعطي المساحة لتطبيق آخر.`, `<strong>Phones:</strong> when an app in the background “reloads” from scratch, the system probably evicted it from memory to make room for another.`),
      ] },

      { k: "mistakes", items: [
        T(`«RAM أكثر دائمًا يعني جهازًا أسرع»: إضافة الذاكرة تفيد فقط إن كنت تستنفد الموجودة؛ وإلا فلا يتغير شيء.`, `“More RAM always means a faster machine”: adding memory only helps if you are running out of what you have; otherwise nothing changes.`),
        T(`«الذاكرة الحرّة جيدة والمستعملة سيئة»: الذاكرة غير المستعملة مهدورة، والنظام الجيد يملؤها بالتخزين المؤقت ويحرره عند الطلب.`, `“Free memory is good and used memory is bad”: unused memory is wasted; a good system fills it with caches and releases them on demand.`),
        T(`«RAM هي مكان حفظ ملفاتي»: الملفات تُحفظ في التخزين، وما في RAM يضيع إن لم تحفظه، ولهذا تضيع مسودتك عند انقطاع الكهرباء.`, `“RAM is where my files are saved”: files are saved to storage, and what is in RAM is lost unless you save, which is why an unsaved draft disappears in a power cut.`),
        T(`«برامج تنظيف الذاكرة تسرّع الجهاز»: تفريغها يُجبر النظام على إعادة القراءة من القرص فيصير أبطأ غالبًا.`, `“Memory cleaner apps speed up the machine”: emptying memory forces the system to re-read from disk, which usually makes things slower.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> ذاكرة DDR5-5600 بقناة واحدة. ما العرض الترددي النظري؟ وكم تحتاج تقريبًا لتحميل ملف حجمه 4 GB منها؟`, `<strong>Calculation:</strong> a DDR5-5600 module on a single channel. What is the theoretical bandwidth, and roughly how long would it take to read a 4 GB block?`), a: T(`<p>5600 × 8 بايت = 44,800 MB/s، أي نحو 44.8 GB/s. وقراءة 4 GB تستغرق نظريًا 4 ÷ 44.8 ≈ 0.09 ثانية (نحو 90 ميلي ثانية). في الواقع تكون القيمة أقل قليلًا بسبب الكلفة الإضافية.</p>`, `<p>5600 × 8 bytes = 44,800 MB/s, about 44.8 GB/s. Reading 4 GB takes theoretically 4 ÷ 44.8 ≈ 0.09 seconds (about 90 ms). In practice the figure is a little lower because of overhead.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> جهازك فيه 8 GB، والنظام يستهلك 3 GB، وتفتح 20 تبويبًا بمعدل 300 MB لكل تبويب. هل ستواجه مشكلة؟`, `<strong>Reasoning:</strong> your machine has 8 GB, the system uses 3 GB, and you open 20 tabs at about 300 MB each. Will you have a problem?`), a: T(`<p>التبويبات: 20 × 300 = 6000 MB تقريبًا أي نحو 6 GB (باعتبار 1 GB = 1000 MB للتقدير). المجموع مع النظام 9 GB وهو أكثر من 8، فسيلجأ النظام إلى الذاكرة الافتراضية على القرص، وستلاحظ بطئًا وتأخرًا عند التبديل بين التبويبات. الحل: إغلاق بعضها أو استخدام ميزة تعليق التبويبات غير النشطة أو ترقية الذاكرة.</p>`, `<p>The tabs: 20 × 300 = 6000 MB, about 6 GB (using 1 GB = 1000 MB for estimation). With the system that totals 9 GB, more than 8, so the system will fall back to virtual memory on disk and you will notice lag when switching tabs. Fixes: close some, use a feature that suspends inactive tabs, or upgrade the memory.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> افتح مدير المهام وتبويب الأداء ثم الذاكرة (أو شغّل <code>free -h</code>). سجّل المستعمل قبل فتح عدة برامج وبعدها وبعد إغلاقها.`, `<strong>Hands-on:</strong> open Task Manager, the Performance tab, then Memory (or run <code>free -h</code>). Record the used amount before opening several programs, after opening them, and after closing them.`), a: T(`<p>سترتفع القيمة مع كل برنامج ثم تنخفض عند الإغلاق، لكنها لن تعود تمامًا إلى الرقم الأول لأن النظام يبقي بعض الملفات مخبّأة. وإن رأيت في Windows مقدار «Cached» أو في Linux عمود <code>buff/cache</code> فهو دليل على هذا السلوك. والمهم أن تراقب هل يقترب المستعمل من السعة الكلية أم لا.</p>`, `<p>The value will rise with each program and drop when you close them, but it will not return exactly to the first number because the system keeps some files cached. The “Cached” figure in Windows or the <code>buff/cache</code> column in Linux is evidence of this behaviour. What matters is whether usage approaches total capacity.</p>`) },

      { k: "summary", items: [
        T(`RAM ذاكرة سريعة مؤقتة تحمل البرامج والبيانات الجارية.`, `RAM is fast, temporary memory holding the programs and data in use.`),
        T(`هي أسرع من التخزين بآلاف المرات لكنها أصغر وأغلى وتفقد محتواها عند الإطفاء.`, `It is thousands of times faster than storage but smaller, pricier, and loses its contents at power-off.`),
        T(`عند امتلائها يلجأ النظام إلى القرص فيتباطأ الجهاز.`, `When it fills, the system falls back on the disk and the machine slows down.`),
      ], next: T(`التخزين Storage: نتعرف على الأماكن التي تحفظ فيها البيانات بشكل دائم.`, `Storage: the places where data is kept permanently.`) },
    ],
  },
];
