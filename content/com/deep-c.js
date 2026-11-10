// Computer Basics — deep rewrite of lessons com-11 … com-15 (bodies only). Authored once as AR/EN pairs (see content/_doc.js).
import { T } from "../_doc.js";

const tm = (s) => `<span class="term">${s}</span>`;

export const defs = [
  // ───────────────────────── com-11 ─────────────────────────
  {
    id: "com-11",
    body: [
      { k: "objectives", items: [
        T(`تقرأ ${tm("Path")} مطلقًا ونسبيًا وتحدد موقع أي ملف في شجرة المجلدات.`, `Read an absolute and a relative ${tm("Path")} and locate any file in the folder tree.`),
        T(`تفهم دور ${tm("Extension")} وقواعد تسمية الملفات وما يُمنع منها.`, `Understand the role of an ${tm("Extension")} and the rules for naming files.`),
        T(`تفرّق بين النسخ والنقل والحذف، وتنفذها بالواجهة وبسطر الأوامر.`, `Tell copying, moving and deleting apart, and perform them in the interface and on the command line.`),
      ] },
      { k: "prereq", items: [T(`دروس التخزين (com-06) ونظام التشغيل (com-10).`, `The storage (com-06) and operating-system (com-10) lessons.`)] },
      { k: "h", t: T(`مقدمة: كيف يجد الجهاز ملفك بين ملايين الملفات؟`, `Introduction: how does the computer find your file among millions?`) },
      { k: "p", t: T(`تعلمنا أن القرص يحفظ البيانات بشكل دائم، لكنه في الحقيقة مجرد مساحة هائلة من البايتات. ما يجعلها منظمة هو ${tm("File System")}: طبقة يديرها نظام التشغيل تسجّل لكل بيانات اسمًا وحجمًا وتاريخًا ومكانًا على القرص. والوحدة الأساسية التي نتعامل معها هي ${tm("File")} أي الملف: مجموعة بيانات واحدة لها اسم، سواء كانت مستندًا أو صورة أو برنامجًا.`, `We saw that a drive keeps data permanently, but at heart it is just a vast stretch of bytes. What makes it organised is the ${tm("File System")}: a layer managed by the operating system that records, for every piece of data, a name, a size, dates and a location on the drive. The basic unit we deal with is the ${tm("File")}: one named collection of data, whether a document, a picture or a program.`) },
      { k: "p", t: T(`ولأن الملفات تبلغ عشرات الآلاف، نجمعها في ${tm("Folder")} (أو ${tm("Directory")} في لغة المطورين). المجلد حاوية تضم ملفات ومجلدات أخرى، وهذا التداخل يصنع هرمًا واضحًا يمكن تتبعه خطوة خطوة.`, `Because files number in the tens of thousands, we group them in a ${tm("Folder")} (called a ${tm("Directory")} among developers). A folder is a container that holds files and other folders, and this nesting builds a clear hierarchy you can follow step by step.`) },

      { k: "h", t: T(`شجرة المجلدات والمسارات`, `The folder tree and paths`) },
      { k: "tree", title: T(`جزء من شجرة ملفات مستخدم على Linux`, `Part of a user's file tree on Linux`), root: { t: "/", kind: "op", kids: [
        { t: "home", kids: [
          { t: "sara", kids: [
            { t: "Documents", kids: [
              { t: "report.docx", kids: [] },
              { t: "budget.xlsx", kids: [] },
            ] },
            { t: "Pictures", kids: [
              { t: "trip.jpg", kids: [] },
            ] },
          ] },
        ] },
        { t: "usr", kids: [{ t: "bin", kids: [] }] },
      ] } },
      { k: "p", t: T(`للشجرة <strong>جذر</strong> ${tm("Root")} واحد في Linux وmacOS يُكتب <code>/</code>. وفي Windows لكل قرص أو قسم جذر بحرف مثل <code>C:</code> و<code>D:</code>. أما ${tm("Path")} (المسار) فهو العنوان الذي يصف الطريق من نقطة معينة إلى الملف، وتفصل بين أجزائه شرطة مائلة <code>/</code> في Linux وmacOS، وشرطة عكسية في Windows.`, `The tree has a single <strong>root</strong> ${tm("Root")} on Linux and macOS, written <code>/</code>. On Windows each drive or partition has its own root with a letter such as <code>C:</code> and <code>D:</code>. A ${tm("Path")} is the address describing the way from some starting point to the file, with its parts separated by a forward slash <code>/</code> on Linux and macOS and a backslash on Windows.`) },
      { k: "table", head: [T(`النوع`, `Kind`), T(`التعريف`, `Definition`), T(`مثال (Linux)`, `Example (Linux)`)], rows: [
        [T(`مسار مطلق ${tm("Absolute Path")}`, `${tm("Absolute Path")}`), T(`يبدأ من الجذر، ويعني الشيء نفسه أينما كنت`, `starts at the root and means the same wherever you stand`), T(`/home/sara/Documents/report.docx`, `/home/sara/Documents/report.docx`)],
        [T(`مسار نسبي ${tm("Relative Path")}`, `${tm("Relative Path")}`), T(`يبدأ من المجلد الحالي، فيتغير معناه بتغير موقعك`, `starts at the current folder, so its meaning changes with where you are`), T(`Documents/report.docx`, `Documents/report.docx`)],
        [T(`الرمز <code>.</code>`, `The symbol <code>.</code>`), T(`المجلد الحالي`, `the current folder`), T(`./report.docx`, `./report.docx`)],
        [T(`الرمز <code>..</code>`, `The symbol <code>..</code>`), T(`المجلد الأب (درجة أعلى)`, `the parent folder (one level up)`), T(`../Pictures/trip.jpg`, `../Pictures/trip.jpg`)],
      ] },
      { k: "p", t: T(`إذا كنت داخل <code>/home/sara/Documents</code> فالمسار <code>../Pictures/trip.jpg</code> يعني: اصعد إلى <code>/home/sara</code> ثم ادخل <code>Pictures</code> واختر الصورة. ويُسمى المجلد الذي تعمل داخله الآن ${tm("Working Directory")}.`, `If you are inside <code>/home/sara/Documents</code>, the path <code>../Pictures/trip.jpg</code> means: go up to <code>/home/sara</code>, enter <code>Pictures</code> and pick the image. The folder you are working in right now is called the ${tm("Working Directory")}.`) },
      { k: "code", lang: "text", code: "Windows : C:\\Users\\Sara\\Documents\\report.docx\nLinux   : /home/sara/Documents/report.docx\nmacOS   : /Users/sara/Documents/report.docx" },

      { k: "h", t: T(`الأسماء والامتدادات`, `Names and extensions`) },
      { k: "p", t: T(`يتكون اسم الملف عادة من جزأين تفصل بينهما نقطة: الاسم ثم ${tm("Extension")} أي الامتداد، مثل <code>report.docx</code>. الامتداد لا يغيّر محتوى الملف، بل هو إشارة يستعملها النظام ليعرف البرنامج الذي يفتحه. وإذا أعدت تسمية <code>photo.png</code> إلى <code>photo.txt</code> فلن تتحول الصورة إلى نص؛ سيحاول النظام فتحها بمحرر نصوص فتظهر رموز غير مفهومة.`, `A file name usually has two parts separated by a dot: the name and the ${tm("Extension")}, as in <code>report.docx</code>. The extension does not change what is inside the file; it is a hint the system uses to choose which program opens it. Renaming <code>photo.png</code> to <code>photo.txt</code> does not turn the picture into text; the system will try a text editor and show meaningless symbols.`) },
      { k: "table", head: [T(`الامتداد`, `Extension`), T(`نوع المحتوى`, `Content`), T(`ملاحظة`, `Note`)], rows: [
        [T(`.txt`, `.txt`), T(`نص بسيط`, `plain text`), T(`بلا تنسيق`, `no formatting`)],
        [T(`.jpg / .png`, `.jpg / .png`), T(`صور`, `images`), T(`JPG مضغوط بفقد جودة، وPNG بلا فقد`, `JPG is lossy, PNG is lossless`)],
        [T(`.mp3 / .mp4`, `.mp3 / .mp4`), T(`صوت / فيديو`, `audio / video`), T(`مضغوطة`, `compressed`)],
        [T(`.pdf`, `.pdf`), T(`مستند ثابت التخطيط`, `fixed-layout document`), T(`يظهر متطابقًا على الأجهزة`, `looks the same everywhere`)],
        [T(`.zip`, `.zip`), T(`أرشيف مضغوط`, `compressed archive`), T(`يضم عدة ملفات في ملف واحد`, `bundles many files into one`)],
        [T(`.exe / .sh`, `.exe / .sh`), T(`برنامج / سكربت`, `program / script`), T(`قابل للتنفيذ، فكن حذرًا`, `executable, so be careful`)],
      ] },
      { k: "ul", items: [
        T(`<strong>أحرف ممنوعة في Windows:</strong> <code>&lt; &gt; : " / | ? *</code> ولا يجوز أن ينتهي الاسم بنقطة أو مسافة.`, `<strong>Characters forbidden on Windows:</strong> <code>&lt; &gt; : " / | ? *</code>, and a name may not end in a dot or a space.`),
        T(`<strong>الطول:</strong> يقبل الاسم عادة حتى 255 حرفًا، ويكون المسار الكامل أطول من ذلك محدودًا في بعض الإصدارات.`, `<strong>Length:</strong> a single name is usually limited to 255 characters, and some versions limit the full path as well.`),
        T(`<strong>حالة الأحرف:</strong> في Linux الاسمان <code>Report.txt</code> و<code>report.txt</code> ملفان مختلفان، أما Windows وmacOS فيعاملانهما بالعادة كاسم واحد.`, `<strong>Letter case:</strong> on Linux <code>Report.txt</code> and <code>report.txt</code> are different files, whereas Windows and macOS normally treat them as one name.`),
        T(`<strong>الملفات المخفية:</strong> في Linux وmacOS يبدأ اسم الملف المخفي بنقطة مثل <code>.config</code>.`, `<strong>Hidden files:</strong> on Linux and macOS a hidden file's name begins with a dot, such as <code>.config</code>.`),
      ] },
      { k: "note", kind: "tip", t: T(`اختر أسماء وصفية بلا مسافات متعددة أو رموز غريبة، مثل <code>budget-2026-q1.xlsx</code>؛ فهي أسهل في البحث وفي كتابتها بسطر الأوامر وأضمن عند رفعها إلى مواقع الويب.`, `Choose descriptive names without odd symbols, such as <code>budget-2026-q1.xlsx</code>; they are easier to search for, to type on the command line, and safer when uploaded to websites.`) },

      { k: "h", t: T(`النسخ والنقل والحذف`, `Copy, move and delete`) },
      { k: "ul", items: [
        T(`<strong>${tm("Copy")} (نسخ):</strong> ينشئ ملفًا مطابقًا في موضع آخر ويبقى الأصل؛ فتتضاعف المساحة المستعملة.`, `<strong>${tm("Copy")}:</strong> creates an identical file elsewhere and leaves the original, so the space used doubles.`),
        T(`<strong>${tm("Move")} (نقل):</strong> يغيّر مكان الملف فلا يبقى في موضعه القديم. داخل القرص نفسه يكتفي النظام بتعديل سجل الفهرس، فيكون النقل فوريًا مهما كبر الملف؛ أما بين قرصين فيُنسخ الملف ثم يُحذف الأصل.`, `<strong>${tm("Move")}:</strong> changes where the file lives so it no longer sits in the old place. Within the same drive the system only edits its index entry, so a move is instant however large the file; between two drives the file is copied and the original then deleted.`),
        T(`<strong>${tm("Delete")} (حذف):</strong> في الواجهة تذهب الملفات عادة إلى سلة المحذوفات (${tm("Recycle Bin")}) ويمكن استرجاعها. أما الأمر <code>rm</code> في سطر الأوامر فيحذف مباشرة بلا سلة.`, `<strong>${tm("Delete")}:</strong> in the interface files normally go to the ${tm("Recycle Bin")} and can be restored. The <code>rm</code> command on the command line deletes directly, with no bin.`),
      ] },
      { k: "code", lang: "bash", code: "pwd                          # where am I?\nmkdir -p projects/demo       # create nested folders\ncd projects/demo\necho \"hello\" > notes.txt     # create a small file\ncp notes.txt backup.txt      # copy\nmv backup.txt ../old.txt     # move up one level and rename\nls -l . ..                   # list both folders\nrm notes.txt                 # delete (no recycle bin!)" },
      { k: "out", code: "/home/sara\n.:\ntotal 0\n\n..:\ntotal 4\n-rw-r--r-- 1 sara sara 6 Nov 10 09:15 old.txt\ndrwxr-xr-x 2 sara sara 4096 Nov 10 09:14 demo" },
      { k: "note", kind: "info", t: T(`الناتج أعلاه مثال تقريبي للتوضيح، وستختلف التواريخ والأحجام وأسماء المستخدم على جهازك. لاحظ أن الأمر <code>mv</code> يستعمل لإعادة التسمية أيضًا، فإعادة التسمية هي نقل إلى اسم جديد.`, `The output above is an illustrative sample; dates, sizes and user names will differ on your machine. Notice that <code>mv</code> also renames, because renaming is just moving to a new name.`) },
      { k: "note", kind: "warn", t: T(`لا تحذف مجلدات النظام ولا ملفات لا تعرفها، وكن حذرًا مع الأمر <code>rm -r</code> لأنه يحذف المجلد بكل ما فيه دفعة واحدة. وقبل أي حذف كبير تأكد من وجود نسخة احتياطية كما تعلمت في درس التخزين.`, `Do not delete system folders or files you do not recognise, and be careful with <code>rm -r</code>, which removes a folder and everything inside it in one go. Before any large deletion make sure a backup exists, as you learned in the storage lesson.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>تنظيم العمل:</strong> بنية مثل <code>project/source/images</code> تجعل الفريق يعثر على أي ملف بلا سؤال أحد.`, `<strong>Organising work:</strong> a layout such as <code>project/source/images</code> lets a team find any file without asking anyone.`),
        T(`<strong>مواقع الويب:</strong> العنوان <code>/images/logo.png</code> في رابط هو مسار حقيقي لملف على الخادم.`, `<strong>Websites:</strong> the address <code>/images/logo.png</code> in a link is a real path to a file on the server.`),
        T(`<strong>البرمجة:</strong> يعتمد الكود على مسارات نسبية لقراءة ملفات الإعداد، فينتقل المشروع من جهاز إلى آخر دون تعديل.`, `<strong>Programming:</strong> code uses relative paths to read configuration files, so a project moves between machines unchanged.`),
      ] },

      { k: "mistakes", items: [
        T(`«تغيير الامتداد يحوّل نوع الملف»: لا يتغير المحتوى؛ لتحويل <code>.png</code> إلى <code>.jpg</code> فعليًا تحتاج أداة تعيد ترميز البيانات.`, `“Changing the extension converts the file”: the content is unchanged; to really turn a <code>.png</code> into a <code>.jpg</code> you need a tool that re-encodes the data.`),
        T(`«المجلد والملف شيء واحد»: المجلد يحتوي على بيانات تنظيمية فقط ولا يحمل محتوى مستند.`, `“A folder and a file are the same thing”: a folder holds organising information only, not document content.`),
        T(`«النقل نسخ ثم حذف دائمًا»: داخل القرص نفسه هو تعديل في الفهرس لا يُنقل فيه شيء من البيانات.`, `“Moving is always copy then delete”: within the same drive it is just an index edit and no data moves at all.`),
        T(`«كل ما أحذفه يعود من السلة»: السلة لا تشمل الملفات المحذوفة بـ <code>rm</code> أو من الأقراص الخارجية في كثير من الحالات، أو بعد تفريغها.`, `“Everything I delete comes back from the bin”: the bin does not cover files removed with <code>rm</code>, often not those on external drives, and nothing after it is emptied.`),
      ] },

      { k: "ex", q: T(`<strong>استدلال:</strong> أنت في <code>/home/sara/Documents</code>. اكتب المسار النسبي إلى <code>/home/sara/Pictures/trip.jpg</code>، ثم المسار المطلق.`, `<strong>Reasoning:</strong> you are in <code>/home/sara/Documents</code>. Write the relative path to <code>/home/sara/Pictures/trip.jpg</code>, then the absolute one.`), a: T(`<p>للوصول إلى الصورة نصعد درجة واحدة إلى <code>/home/sara</code> بالرمز <code>..</code> ثم ندخل <code>Pictures</code>: المسار النسبي هو <code>../Pictures/trip.jpg</code>. والمسار المطلق يبدأ من الجذر ولا يتغير: <code>/home/sara/Pictures/trip.jpg</code>. لو نقلنا الجهاز إلى مجلد آخر فسيتغير النسبي دون المطلق.</p>`, `<p>To reach the picture we go up one level to <code>/home/sara</code> with <code>..</code> and then enter <code>Pictures</code>, so the relative path is <code>../Pictures/trip.jpg</code>. The absolute path starts at the root and never changes: <code>/home/sara/Pictures/trip.jpg</code>. If we stood in a different folder the relative path would change but the absolute one would not.</p>`) },
      { k: "ex", q: T(`<strong>حساب:</strong> تنسخ 40 ملفًا حجم كل منها 25 MB من قرص إلى آخر، ثم تريد النقل بدلًا من النسخ. كم مساحة تستهلك في كل حالة داخل القرص الهدف، وما المساحة الإجمالية على القرصين بعد العملية؟`, `<strong>Calculation:</strong> you copy 40 files of 25 MB each from one drive to another, and then consider moving instead of copying. How much space does the target drive use, and how much is used across both drives afterwards?`), a: T(`<p>الحجم الكلي = 40 × 25 = 1,000 MB أي نحو 1 GB. عند <strong>النسخ</strong> يستهلك القرص الهدف 1,000 MB ويبقى الأصل في القرص الأول، فالمجموع على القرصين 2,000 MB. وعند <strong>النقل</strong> بين قرصين يستهلك الهدف 1,000 MB كذلك لكن يُحذف الأصل بعد نجاح النسخ، فيبقى المجموع 1,000 MB. وإن كان النقل داخل القرص الواحد فلا مساحة إضافية ويتم في لحظات.</p>`, `<p>Total size = 40 × 25 = 1,000 MB, about 1 GB. With a <strong>copy</strong> the target drive uses 1,000 MB and the original stays on the first drive, so the total across both is 2,000 MB. With a <strong>move</strong> between two drives the target also uses 1,000 MB but the original is deleted once the copy succeeds, leaving a total of 1,000 MB. If the move happens inside a single drive no extra space is needed and it finishes in moments.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> أنشئ بنية مجلدات لمشروع دراسي بالأوامر، وانسخ إليها ملفًا، ثم تحقق من النتيجة.`, `<strong>Hands-on:</strong> create a folder layout for a study project with commands, copy a file into it, then check the result.`), a: T(`<p>افتح الطرفية ونفّذ: <code>mkdir -p study/notes study/files</code> لإنشاء المجلدين دفعة واحدة، ثم <code>echo "first note" > study/notes/day1.txt</code> لإنشاء ملف، ثم <code>cp study/notes/day1.txt study/files/day1-copy.txt</code> للنسخ. أخيرًا <code>ls -R study</code> يعرض الشجرة كاملة، وتتوقع ظهور <code>day1.txt</code> في <code>notes</code> وظهور <code>day1-copy.txt</code> في <code>files</code>. جرّب <code>mv</code> لنقل أحدهما وراقب تغيّر الناتج. في Windows استعمل مستكشف الملفات بالنقر الأيمن لتحصل على النتيجة نفسها.</p>`, `<p>Open the terminal and run: <code>mkdir -p study/notes study/files</code> to create both folders at once, then <code>echo "first note" > study/notes/day1.txt</code> to create a file, then <code>cp study/notes/day1.txt study/files/day1-copy.txt</code> to copy it. Finally <code>ls -R study</code> prints the whole tree; expect <code>day1.txt</code> under <code>notes</code> and <code>day1-copy.txt</code> under <code>files</code>. Try <code>mv</code> to relocate one of them and watch the output change. On Windows use File Explorer with right-click to get the same result.</p>`) },

      { k: "summary", items: [
        T(`الملف بيانات لها اسم، والمجلد حاوية تنظم الملفات في شجرة لها جذر واحد.`, `A file is named data and a folder is a container that organises files into a tree with a single root.`),
        T(`المسار المطلق يبدأ من الجذر، والنسبي يبدأ من المجلد الحالي ويستعمل <code>.</code> و<code>..</code>.`, `An absolute path starts at the root; a relative one starts at the current folder and uses <code>.</code> and <code>..</code>.`),
        T(`الامتداد إشارة لنوع الملف وليس تحويلًا له، والأسماء الجيدة وصفية وواضحة.`, `The extension is a hint about file type, not a conversion, and good names are descriptive and clean.`),
        T(`النسخ يضاعف البيانات، والنقل ينقلها، والحذف قد لا يكون قابلًا للاسترجاع.`, `Copy duplicates data, move relocates it, and delete may not be recoverable.`),
      ], next: T(`النظام الثنائي والبيانات: كيف تتحول كل هذه الملفات إلى أصفار وآحاد.`, `Binary and data: how all these files turn into zeros and ones.`) },
      { k: "refs", items: [
        T(`دليل أوامر <code>man</code> في Linux للأوامر <code>cp</code> و<code>mv</code> و<code>rm</code>.`, `The Linux <code>man</code> pages for <code>cp</code>, <code>mv</code> and <code>rm</code>.`),
        T(`مواصفة Filesystem Hierarchy Standard لتخطيط المجلدات في Linux.`, `The Filesystem Hierarchy Standard describing Linux directory layout.`),
      ] },
    ],
  },

  // ───────────────────────── com-12 ─────────────────────────
  {
    id: "com-12",
    body: [
      { k: "objectives", items: [
        T(`تشرح لماذا تعتمد الحواسيب على النظام ${tm("Binary")} وتحوّل الأعداد بين العشري والثنائي والست عشري.`, `Explain why computers rely on ${tm("Binary")} and convert numbers between decimal, binary and hexadecimal.`),
        T(`توضح كيف يُمثَّل النص بـ ${tm("ASCII")} و${tm("Unicode")} وكيف يرمّز ${tm("UTF-8")} الحروف.`, `Describe how text is represented with ${tm("ASCII")} and ${tm("Unicode")} and how ${tm("UTF-8")} encodes characters.`),
        T(`تفسر تمثيل الألوان بنموذج ${tm("RGB")} وتحسب عدد الألوان الممكنة.`, `Interpret colours in the ${tm("RGB")} model and count the possible colours.`),
      ] },
      { k: "prereq", items: [T(`درس الملفات والمجلدات (com-11) وفهم أن الذاكرة والتخزين يحفظان بيانات.`, `The files and folders lesson (com-11) and knowing that memory and storage hold data.`)] },
      { k: "h", t: T(`مقدمة: كل شيء أرقام`, `Introduction: everything is numbers`) },
      { k: "p", t: T(`الصورة التي تراها والأغنية التي تسمعها وهذه الجملة نفسها تُخزَّن داخل الحاسوب بلا استثناء كأرقام. الفكرة العملية هي ${tm("Encoding")} أي الترميز: اتفاق على أن رقمًا معينًا يمثل حرفًا أو لونًا أو درجة صوت. فإذا عرف الطرفان الاتفاق استطاعا إعادة بناء المعنى من الأرقام.`, `The picture you see, the song you hear and this very sentence are all stored in a computer as numbers, without exception. The working idea is ${tm("Encoding")}: an agreement that a given number stands for a letter, a colour or a sound level. When both sides know the agreement, they can rebuild the meaning from the numbers.`) },
      { k: "p", t: T(`ولكن لماذا الأرقام الثنائية بالذات؟ لأن الدوائر الإلكترونية تفرّق بسهولة وثبات بين حالتين: جهد منخفض وجهد مرتفع، أو تيار يمر ولا يمر. أما التفريق بين عشر حالات كهربائية دقيقة فأكثر عرضة للخطأ بسبب الضجيج والحرارة. ومن حالتين فقط نصنع النظام الثنائي.`, `But why binary numbers in particular? Because electronic circuits tell two states apart easily and reliably: low voltage or high voltage, current flowing or not. Telling ten delicate electrical levels apart is far more error-prone because of noise and heat. Two states are all we need to build the binary system.`) },

      { k: "h", t: T(`النظام الثنائي والعشري`, `Binary versus decimal`) },
      { k: "p", t: T(`نظامنا العشري ${tm("Decimal")} له عشرة رموز (0 إلى 9) وقيمة كل خانة قوة للعدد 10: آحاد ثم عشرات ثم مئات. والثنائي له رمزان فقط (0 و1) وقيمة كل خانة قوة للعدد 2. نسمي كل خانة ثنائية ${tm("Bit")}، وهي اختصار Binary Digit.`, `Our ${tm("Decimal")} system has ten symbols (0 to 9) and the value of each place is a power of 10: ones, tens, hundreds. Binary has just two symbols (0 and 1) and each place is a power of 2. Each binary digit is called a ${tm("Bit")}, short for Binary Digit.`) },
      { k: "table", head: [T(`موضع الخانة (من اليمين)`, `Place (from the right)`), T(`8`, `8`), T(`7`, `7`), T(`6`, `6`), T(`5`, `5`), T(`4`, `4`), T(`3`, `3`), T(`2`, `2`), T(`1`, `1`)], rows: [
        [T(`القيمة`, `Value`), T(`128`, `128`), T(`64`, `64`), T(`32`, `32`), T(`16`, `16`), T(`8`, `8`), T(`4`, `4`), T(`2`, `2`), T(`1`, `1`)],
        [T(`العدد 156`, `The number 156`), T(`1`, `1`), T(`0`, `0`), T(`0`, `0`), T(`1`, `1`), T(`1`, `1`), T(`1`, `1`), T(`0`, `0`), T(`0`, `0`)],
      ] },
      { k: "h4", t: T(`من ثنائي إلى عشري`, `Binary to decimal`) },
      { k: "p", t: T(`اجمع قيم الخانات التي فيها 1. للعدد <code>101101</code> الخانات هي 32 و8 و4 و1، فالناتج 32 + 8 + 4 + 1 = 45. وفي الجدول أعلاه 156 يساوي 128 + 16 + 8 + 4 = 156 أي <code>10011100</code>.`, `Add the values of the places that hold a 1. For <code>101101</code> the places are 32, 8, 4 and 1, so the result is 32 + 8 + 4 + 1 = 45. In the table above, 156 equals 128 + 16 + 8 + 4 = 156, which is <code>10011100</code>.`) },
      { k: "h4", t: T(`من عشري إلى ثنائي: القسمة المتكررة`, `Decimal to binary: repeated division`) },
      { k: "p", t: T(`اقسم على 2 مرارًا واحفظ الباقي (0 أو 1) في كل مرة، ثم اقرأ البواقي من الأخير إلى الأول. ولتحويل 156:`, `Divide by 2 repeatedly and keep the remainder (0 or 1) each time, then read the remainders from last to first. To convert 156:`) },
      { k: "code", lang: "text", code: "156 / 2 = 78  remainder 0\n 78 / 2 = 39  remainder 0\n 39 / 2 = 19  remainder 1\n 19 / 2 =  9  remainder 1\n  9 / 2 =  4  remainder 1\n  4 / 2 =  2  remainder 0\n  2 / 2 =  1  remainder 0\n  1 / 2 =  0  remainder 1\nRead upward: 10011100" },
      { k: "p", t: T(`وللتحقق نعيد الجمع: 128 + 16 + 8 + 4 = 156. وتتبع كل خانة جديدة مضاعفة القيمة، فبـ n خانة يمكن تمثيل 2 أس n قيمة مختلفة، أي من 0 إلى 2 أس n ناقص 1. ثمانية خانات تعطي 256 قيمة من 0 إلى 255.`, `To check, add back: 128 + 16 + 8 + 4 = 156. Every new place doubles the range, so n bits can represent 2 to the power n different values, from 0 up to 2 to the power n minus 1. Eight bits give 256 values, from 0 to 255.`) },

      { k: "h", t: T(`النظام الست عشري Hex`, `Hexadecimal`) },
      { k: "p", t: T(`قراءة سلاسل طويلة من الأصفار والآحاد متعبة، فيستعمل المبرمجون نظام ${tm("Hexadecimal")} أي الست عشري، وله 16 رمزًا: 0–9 ثم A–F حيث A=10 وF=15. وجمال الأمر أن كل رمز ست عشري يقابل بالضبط أربع خانات ثنائية، فنقسم الثنائي إلى مجموعات من أربع ونحوّل كل مجموعة.`, `Reading long strings of zeros and ones is tiring, so programmers use ${tm("Hexadecimal")}, which has 16 symbols: 0–9 then A–F, where A=10 and F=15. The beauty is that each hex symbol corresponds to exactly four binary digits, so we split the binary into groups of four and convert each group.`) },
      { k: "p", t: T(`للعدد <code>10011100</code>: المجموعة <code>1001</code> تساوي 9، والمجموعة <code>1100</code> تساوي 12 أي C، فيكون الست عشري <code>9C</code>. وبالحساب المباشر 9 × 16 + 12 = 156. وأكبر قيمة في بايت واحد هي <code>FF</code> أي 15 × 16 + 15 = 255. وتبدأ الأعداد الست عشرية في الكود غالبًا بالبادئة <code>0x</code> مثل <code>0x9C</code>.`, `For <code>10011100</code>: the group <code>1001</code> is 9 and the group <code>1100</code> is 12, which is C, so the hex form is <code>9C</code>. By direct calculation 9 × 16 + 12 = 156. The largest value in one byte is <code>FF</code>, that is 15 × 16 + 15 = 255. In code, hex numbers usually carry the prefix <code>0x</code>, as in <code>0x9C</code>.`) },
      { k: "code", lang: "python", code: "print(bin(156))        # decimal -> binary\nprint(int(\"101101\", 2)) # binary -> decimal\nprint(hex(156))        # decimal -> hex\nprint(ord(\"A\"))        # character -> code number\nprint(\"é\".encode(\"utf-8\"))  # character -> UTF-8 bytes" },
      { k: "out", code: "0b10011100\n45\n0x9c\n65\nb'\\xc3\\xa9'" },

      { k: "h", t: T(`النص كأرقام: ASCII وUnicode وUTF-8`, `Text as numbers: ASCII, Unicode and UTF-8`) },
      { k: "p", t: T(`أقدم اتفاق شائع هو ${tm("ASCII")} الذي يعطي 128 رمزًا رقمًا من 0 إلى 127: الحرف <code>A</code> يساوي 65 و<code>a</code> يساوي 97 والرقم <code>0</code> كحرف يساوي 48. فالكلمة <code>Hi</code> تُخزَّن بالرقمين 72 و105 أي <code>01001000 01101001</code>. لاحظ أن الحرف <code>0</code> غير العدد صفر: الأول رمز رقمه 48 والثاني قيمة.`, `The oldest widespread agreement is ${tm("ASCII")}, which gave 128 symbols numbers from 0 to 127: the letter <code>A</code> is 65, <code>a</code> is 97 and the digit character <code>0</code> is 48. So the word <code>Hi</code> is stored as the two numbers 72 and 105, that is <code>01001000 01101001</code>. Note that the character <code>0</code> is not the number zero: the first is a symbol with code 48, the second is a value.`) },
      { k: "p", t: T(`لا يكفي ASCII للعربية ولا للصينية ولا للرموز التعبيرية، فظهر ${tm("Unicode")}: معيار يعطي لكل حرف في كل اللغات رقمًا فريدًا يسمى ${tm("Code Point")} ويُكتب هكذا <code>U+0639</code> للحرف «ع». لكن Unicode يحدد الأرقام فقط، أما طريقة تخزينها بايتات فيحددها الترميز، وأشهره ${tm("UTF-8")}.`, `ASCII is not enough for Arabic, Chinese or emoji, so ${tm("Unicode")} appeared: a standard that gives every character in every language a unique number called a ${tm("Code Point")}, written like <code>U+0639</code> for the Arabic letter ain. But Unicode fixes only the numbers; how they are stored as bytes is decided by an encoding, the best known being ${tm("UTF-8")}.`) },
      { k: "p", t: T(`يستعمل UTF-8 من بايت إلى أربعة لكل حرف: حروف ASCII تأخذ بايتًا واحدًا فتبقى متوافقة مع القديم، والحرف <code>é</code> يأخذ بايتين (<code>C3 A9</code>)، والحرف العربي «ع» بايتين (<code>D8 B9</code>)، والرمز <code>€</code> ثلاثة بايتات (<code>E2 82 AC</code>)، والرموز التعبيرية غالبًا أربعة. ولهذا يختلف عدد البايتات عن عدد الحروف في النص العربي.`, `UTF-8 uses one to four bytes per character: ASCII letters take one byte so it stays compatible with the old standard, <code>é</code> takes two (<code>C3 A9</code>), the Arabic letter ain takes two (<code>D8 B9</code>), the symbol <code>€</code> takes three (<code>E2 82 AC</code>), and emoji usually take four. That is why the number of bytes differs from the number of characters in Arabic text.`) },
      { k: "note", kind: "warn", t: T(`حين يظهر نص مثل «Ø§Ù„Ø³Ù„Ø§Ù…» بدلًا من العربية فالسبب أن البايتات قُرئت بترميز غير الذي كُتبت به. الحل أن تحدد الترميز الصحيح، وغالبًا UTF-8.`, `When text such as “Ã©” appears instead of the right letters, the bytes were read with a different encoding from the one used to write them. The fix is to choose the correct encoding, most often UTF-8.`) },

      { k: "h", t: T(`الألوان كأرقام: نموذج RGB`, `Colours as numbers: the RGB model`) },
      { k: "p", t: T(`تتكون النقطة على الشاشة من ضوء أحمر وأخضر وأزرق بدرجات مختلفة، ولذلك يصف نموذج ${tm("RGB")} كل لون بثلاثة أرقام، كل منها من 0 إلى 255 أي بايت واحد: شدة الأحمر والأخضر والأزرق. فاللون البرتقالي <code>(255, 128, 0)</code> أحمر كامل ونصف أخضر وبلا أزرق، ويُكتب بالست عشري <code>#FF8000</code> لأن 255 هي FF و128 هي 80.`, `A dot on a screen is made of red, green and blue light at varying strengths, so the ${tm("RGB")} model describes each colour with three numbers, each from 0 to 255, that is one byte: the strength of red, green and blue. Orange <code>(255, 128, 0)</code> is full red, half green and no blue, written in hex as <code>#FF8000</code> because 255 is FF and 128 is 80.`) },
      { k: "p", t: T(`ثلاثة بايتات تعني 24 خانة، أي 2 أس 24 = 16,777,216 لونًا ممكنًا. وبكسل صورة عادية يأخذ إذن 3 بايتات. ومن المصطلحات المرتبطة ${tm("Pixel")} وهو أصغر نقطة في الصورة.`, `Three bytes means 24 bits, so 2 to the power 24 = 16,777,216 possible colours, and a pixel of an ordinary picture takes 3 bytes. The related term ${tm("Pixel")} means the smallest dot in an image.`) },
      { k: "table", head: [T(`اللون`, `Colour`), T(`RGB`, `RGB`), T(`Hex`, `Hex`)], rows: [
        [T(`أسود`, `Black`), T(`(0, 0, 0)`, `(0, 0, 0)`), T(`#000000`, `#000000`)],
        [T(`أبيض`, `White`), T(`(255, 255, 255)`, `(255, 255, 255)`), T(`#FFFFFF`, `#FFFFFF`)],
        [T(`أحمر`, `Red`), T(`(255, 0, 0)`, `(255, 0, 0)`), T(`#FF0000`, `#FF0000`)],
        [T(`برتقالي`, `Orange`), T(`(255, 128, 0)`, `(255, 128, 0)`), T(`#FF8000`, `#FF8000`)],
      ] },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>تصميم الويب:</strong> أكواد الألوان <code>#FF8000</code> في CSS هي أرقام RGB ست عشرية.`, `<strong>Web design:</strong> colour codes like <code>#FF8000</code> in CSS are hexadecimal RGB numbers.`),
        T(`<strong>الشبكات:</strong> عناوين MAC وIPv6 تُكتب بالست عشري لأنه مختصر.`, `<strong>Networking:</strong> MAC and IPv6 addresses are written in hex because it is compact.`),
        T(`<strong>الرسائل متعددة اللغات:</strong> UTF-8 يتيح مزج العربية والإنجليزية والرموز في ملف واحد.`, `<strong>Multilingual messaging:</strong> UTF-8 lets Arabic, English and symbols share one file.`),
      ] },

      { k: "mistakes", items: [
        T(`«الحاسوب يفهم الحروف والصور مباشرة»: لا يتعامل إلا مع أرقام، والمعنى يأتي من الترميز الذي نتفق عليه.`, `“A computer understands letters and pictures directly”: it handles only numbers, and meaning comes from the encoding we agree on.`),
        T(`«الثنائي يعني أن الحاسوب يعرف الصحيح والخطأ فقط»: الخانة الواحدة حالتان، لكن تجميع الخانات يمثل أعدادًا وبيانات بلا حد عملي.`, `“Binary means a computer only knows true and false”: one bit is two states, but grouping bits represents numbers and data without a practical limit.`),
        T(`«الحرف 5 هو العدد 5»: الحرف رمز له رقم ترميز (53 في ASCII)، والعدد 5 قيمة تُخزَّن بطريقة مختلفة.`, `“The character 5 is the number 5”: the character is a symbol with a code (53 in ASCII), while the number 5 is a value stored differently.`),
        T(`«كل حرف يساوي بايتًا واحدًا دائمًا»: ينطبق على ASCII فقط؛ في UTF-8 قد يأخذ الحرف من بايت إلى أربعة.`, `“Every character is exactly one byte”: true only for ASCII; in UTF-8 a character can take from one to four bytes.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> حوّل 200 إلى ثنائي وست عشري، ثم حوّل <code>11010110</code> إلى عشري.`, `<strong>Calculation:</strong> convert 200 to binary and hex, then convert <code>11010110</code> to decimal.`), a: T(`<p>200 = 128 + 64 + 8 أي <code>11001000</code>. بالقسمة: 200÷2=100 (0)، 100÷2=50 (0)، 50÷2=25 (0)، 25÷2=12 (1)، 12÷2=6 (0)، 6÷2=3 (0)، 3÷2=1 (1)، 1÷2=0 (1) فنقرأ من الأسفل: 11001000. ثم نقسم إلى <code>1100</code> و<code>1000</code> فهما C و8 أي <code>C8</code>، وللتحقق 12 × 16 + 8 = 200. أما <code>11010110</code> فهو 128 + 64 + 16 + 4 + 2 = 214.</p>`, `<p>200 = 128 + 64 + 8, that is <code>11001000</code>. By division: 200÷2=100 (0), 100÷2=50 (0), 50÷2=25 (0), 25÷2=12 (1), 12÷2=6 (0), 6÷2=3 (0), 3÷2=1 (1), 1÷2=0 (1); reading from the bottom gives 11001000. Split into <code>1100</code> and <code>1000</code>, which are C and 8, so hex is <code>C8</code>; check: 12 × 16 + 8 = 200. As for <code>11010110</code>, it is 128 + 64 + 16 + 4 + 2 = 214.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> كم بايتًا يشغل النص <code>Hi €</code> بترميز UTF-8؟ ولماذا لا يساوي عدد الحروف؟`, `<strong>Reasoning:</strong> how many bytes does the text <code>Hi €</code> occupy in UTF-8, and why does it differ from the character count?`), a: T(`<p>النص أربعة رموز: <code>H</code> بايت واحد، <code>i</code> بايت واحد، المسافة بايت واحد، و<code>€</code> ثلاثة بايتات (<code>E2 82 AC</code>). المجموع 1 + 1 + 1 + 3 = 6 بايتات لأربعة رموز. السبب أن UTF-8 متغير الطول: الرموز الإنجليزية تستعمل بايتًا، وما عداها يحتاج أكثر حتى يتسع لعدد الرموز الكبير في Unicode.</p>`, `<p>The text has four characters: <code>H</code> is one byte, <code>i</code> is one byte, the space is one byte, and <code>€</code> is three bytes (<code>E2 82 AC</code>). The total is 1 + 1 + 1 + 3 = 6 bytes for four characters. UTF-8 is variable-length: English characters use a single byte while the others need more to cover the huge number of Unicode characters.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اكتشف بنفسك كيف يُرمَّز اسمك بالأرقام باستعمال بايثون أو أداة مشابهة.`, `<strong>Hands-on:</strong> discover for yourself how your name is encoded as numbers using Python or a similar tool.`), a: T(`<p>افتح مفسر بايثون واكتب <code>[ord(c) for c in "Sara"]</code> فتحصل على <code>[83, 97, 114, 97]</code>، وهي أرقام ASCII للحروف. ثم جرّب <code>"Sara".encode("utf-8")</code> لترى البايتات نفسها. وللاسم العربي ستجد أن كل حرف يعطي رقمًا كبيرًا (مثل 1593 للحرف «ع»)، وأن <code>encode("utf-8")</code> يعطي بايتين لكل حرف. قارن بين عدد الحروف وعدد البايتات.</p>`, `<p>Open the Python interpreter and type <code>[ord(c) for c in "Sara"]</code> to get <code>[83, 97, 114, 97]</code>, the ASCII numbers of the letters. Then try <code>"Sara".encode("utf-8")</code> to see the same bytes. For an Arabic name each letter gives a large number (for example 1593 for the letter ain) and <code>encode("utf-8")</code> yields two bytes per letter. Compare the number of characters with the number of bytes.</p>`) },

      { k: "summary", items: [
        T(`الحاسوب يخزن كل شيء أرقامًا ثنائية لأن الدوائر تميّز حالتين بثبات.`, `A computer stores everything as binary numbers because circuits distinguish two states reliably.`),
        T(`يمكن التحويل بين الثنائي والعشري بجمع القوى أو بالقسمة المتكررة، والست عشري اختصار لكل أربع خانات.`, `Binary and decimal convert by adding powers or by repeated division, and hex is a shorthand for every four bits.`),
        T(`النص أرقام بترميز ASCII أو Unicode، وUTF-8 يخزنها بطول متغير.`, `Text is numbers in ASCII or Unicode, and UTF-8 stores them with variable length.`),
        T(`اللون ثلاثة بايتات RGB، أي 16,777,216 احتمالًا.`, `A colour is three RGB bytes, giving 16,777,216 possibilities.`),
      ], next: T(`البت والبايت: وحدات قياس كل هذه البيانات وكيف نحسب أحجامها.`, `Bits and bytes: the units that measure all this data and how to compute sizes.`) },
      { k: "refs", items: [
        T(`معيار Unicode الذي يصدره Unicode Consortium.`, `The Unicode Standard published by the Unicode Consortium.`),
        T(`مقال «The Absolute Minimum Every Software Developer Must Know About Unicode» لجويل سبولسكي.`, `Joel Spolsky's essay "The Absolute Minimum Every Software Developer Must Know About Unicode".`),
      ] },
    ],
  },

  // ───────────────────────── com-13 ─────────────────────────
  {
    id: "com-13",
    body: [
      { k: "objectives", items: [
        T(`تعرّف ${tm("Bit")} و${tm("Byte")} وتحسب عدد القيم الممكنة بـ n خانة.`, `Define a ${tm("Bit")} and a ${tm("Byte")} and count the values n bits can hold.`),
        T(`تفرّق بين وحدات 1000 (KB, MB) ووحدات 1024 (KiB, MiB) وتفسر اختلاف سعة القرص.`, `Distinguish 1000-based units (KB, MB) from 1024-based ones (KiB, MiB) and explain disk-capacity gaps.`),
        T(`تقدّر حجم ملف غير مضغوط وتحوّل بين Mbps وMB/s وتحسب زمن التنزيل.`, `Estimate an uncompressed file size, convert between Mbps and MB/s and compute download time.`),
      ] },
      { k: "prereq", items: [T(`درس النظام الثنائي والبيانات (com-12).`, `The binary and data lesson (com-12).`)] },
      { k: "h", t: T(`مقدمة: لغة القياس في الحوسبة`, `Introduction: the language of measurement`) },
      { k: "p", t: T(`حين تقرأ «صورة 5 ميغابايت» أو «إنترنت 100 ميغابت» فأنت أمام وحدات تبدو متشابهة وهي مختلفة اختلافًا كبيرًا. فهم هذه الوحدات هو ما يجعلك تحسب سعة قرص وزمن تنزيل وحجم فيديو بدلًا من التخمين. وكل شيء يبدأ من أصغر وحدة: ${tm("Bit")}.`, `When you read “a 5-megabyte photo” or “a 100-megabit connection”, you face units that look alike yet differ greatly. Understanding them lets you compute a drive's capacity, a download time and a video's size instead of guessing. It all starts from the smallest unit: the ${tm("Bit")}.`) },

      { k: "h", t: T(`البت والبايت`, `The bit and the byte`) },
      { k: "p", t: T(`${tm("Bit")} خانة واحدة تحمل 0 أو 1، وهي أصغر معلومة ممكنة. ولأن بتًا واحدًا لا يكفي لتمثيل شيء مفيد، جُمعت ثماني خانات في ${tm("Byte")} (بايت)، وهو الوحدة التي يعنون بها الحاسوب ذاكرته. ويُكتب البت بحرف صغير <code>b</code> والبايت بحرف كبير <code>B</code>، وهذا فرق جوهري: 8 bits = 1 B.`, `A ${tm("Bit")} is one place holding 0 or 1, the smallest possible piece of information. Because a single bit is too little to represent anything useful, eight of them are grouped into a ${tm("Byte")}, the unit by which a computer addresses its memory. A bit is written with a lowercase <code>b</code> and a byte with an uppercase <code>B</code>, a crucial difference: 8 bits = 1 B.`) },
      { k: "p", t: T(`وكل خانة تضاعف عدد الاحتمالات، فبـ n خانة نحصل على 2 أس n قيمة:`, `Every added bit doubles the number of possibilities, so n bits give 2 to the power n values:`) },
      { k: "table", head: [T(`عدد الخانات`, `Bits`), T(`عدد القيم`, `Values`), T(`مثال استعمال`, `Example use`)], rows: [
        [T(`1`, `1`), T(`2`, `2`), T(`مفتاح تشغيل/إيقاف`, `an on/off switch`)],
        [T(`4`, `4`), T(`16`, `16`), T(`رمز ست عشري واحد`, `one hex digit`)],
        [T(`8`, `8`), T(`256`, `256`), T(`حرف ASCII الموسع، أو قناة لون`, `an extended ASCII char, or a colour channel`)],
        [T(`16`, `16`), T(`65,536`, `65,536`), T(`صوت CD بدقة 16 بت`, `16-bit CD audio`)],
        [T(`24`, `24`), T(`16,777,216`, `16,777,216`), T(`لون RGB كامل`, `a full RGB colour`)],
        [T(`32`, `32`), T(`4,294,967,296`, `4,294,967,296`), T(`عنوان IPv4`, `an IPv4 address`)],
        [T(`64`, `64`), T(`18,446,744,073,709,551,616`, `18,446,744,073,709,551,616`), T(`معالجات 64 بت`, `64-bit processors`)],
      ] },
      { k: "p", t: T(`ومن هنا تفهم عبارة «معالج 32 بت» و«معالج 64 بت»: عرض العنوان الذي يستطيع المعالج استعماله لتحديد مواضع الذاكرة. ثلاثون واثنتان خانة تعني 4,294,967,296 عنوانًا، أي 4 GiB كحد أقصى من الذاكرة، ولهذا احتاجت الأجهزة الحديثة إلى 64 بت.`, `This also explains “32-bit” and “64-bit” processors: the width of the address the processor can use to point at memory locations. Thirty-two bits means 4,294,967,296 addresses, that is at most 4 GiB of memory, which is why modern machines moved to 64 bits.`) },

      { k: "h", t: T(`KB أم KiB؟ مشكلة الألف والـ 1024`, `KB or KiB? The 1000 versus 1024 problem`) },
      { k: "p", t: T(`المنطق الثنائي يجعل 1024 (أي 2 أس 10) قريبًا جدًا من الألف، فجرت العادة على استعمال «كيلو» للرقمين. ولإنهاء الالتباس حدد المعيار الدولي وحدتين: الوحدات العشرية ${tm("SI")} (KB وMB وGB وTB) وقيمتها 1000 أس ن، والوحدات الثنائية ${tm("IEC")} (KiB وMiB وGiB وTiB) وقيمتها 1024 أس ن.`, `Binary logic makes 1024 (2 to the power 10) very close to a thousand, so people habitually used “kilo” for both. To end the confusion the international standards define two families: decimal ${tm("SI")} units (KB, MB, GB, TB) worth 1000 to the power n, and binary ${tm("IEC")} units (KiB, MiB, GiB, TiB) worth 1024 to the power n.`) },
      { k: "table", head: [T(`الوحدة`, `Unit`), T(`عشرية (SI)`, `Decimal (SI)`), T(`ثنائية (IEC)`, `Binary (IEC)`), T(`الفرق`, `Gap`)], rows: [
        [T(`كيلو`, `Kilo`), T(`KB = 1,000 B`, `KB = 1,000 B`), T(`KiB = 1,024 B`, `KiB = 1,024 B`), T(`2.4%`, `2.4%`)],
        [T(`ميغا`, `Mega`), T(`MB = 1,000,000 B`, `MB = 1,000,000 B`), T(`MiB = 1,048,576 B`, `MiB = 1,048,576 B`), T(`4.9%`, `4.9%`)],
        [T(`جيجا`, `Giga`), T(`GB = 1,000,000,000 B`, `GB = 1,000,000,000 B`), T(`GiB = 1,073,741,824 B`, `GiB = 1,073,741,824 B`), T(`7.4%`, `7.4%`)],
        [T(`تيرا`, `Tera`), T(`TB = 10^12 B`, `TB = 10^12 B`), T(`TiB = 1,099,511,627,776 B`, `TiB = 1,099,511,627,776 B`), T(`10.0%`, `10.0%`)],
      ] },
      { k: "p", t: T(`يتضاعف الفرق مع كل درجة، وهذا سر اختلاف سعة القرص: قرص 256 GB كما كُتب على علبته يحوي 256,000,000,000 بايت، وحين يقسمها النظام على 1,073,741,824 يعرضها نحو 238.4 فقط، أي 238.4 GiB. ويستعمل Windows الرمز GB لوحدة هي في الحقيقة GiB، بينما macOS الحديث ومعظم الشركات المصنّعة تستعمل العشرية.`, `The gap grows with each step, which is the secret behind drive-capacity differences: a drive labelled 256 GB holds 256,000,000,000 bytes, and when the system divides by 1,073,741,824 it shows only about 238.4, that is 238.4 GiB. Windows writes GB for what is really GiB, whereas modern macOS and most manufacturers use decimal units.`) },

      { k: "h", t: T(`تقدير أحجام الملفات`, `Estimating file sizes`) },
      { k: "p", t: T(`حجم صورة غير مضغوطة = العرض × الارتفاع × عدد البايتات لكل بكسل. صورة Full HD أبعادها 1920 × 1080 بنظام RGB (3 بايتات للبكسل) تحتوي 2,073,600 بكسل، فحجمها 2,073,600 × 3 = 6,220,800 بايت، أي نحو 6.22 MB أو 5.93 MiB. بينما ملف JPG لصورة بهذه الدقة قد يكون بضع مئات من الكيلوبايت لأن ${tm("Compression")} أي الضغط يلغي التكرار.`, `An uncompressed image's size = width × height × bytes per pixel. A Full HD picture of 1920 × 1080 in RGB (3 bytes per pixel) holds 2,073,600 pixels, so its size is 2,073,600 × 3 = 6,220,800 bytes, about 6.22 MB or 5.93 MiB. A JPG at this resolution may be only a few hundred kilobytes because ${tm("Compression")} removes redundancy.`) },
      { k: "flow", title: T(`خطوات تقدير حجم فيديو غير مضغوط (دقيقة واحدة)`, `Estimating an uncompressed video (one minute)`), steps: [
        { label: T(`حجم الإطار`, `Frame size`), sub: T(`1920 × 1080 × 3 = 6,220,800 بايت`, `1920 × 1080 × 3 = 6,220,800 bytes`) },
        { label: T(`إطارات الثانية`, `Frames per second`), sub: T(`30 إطارًا ← 6,220,800 × 30 = 186,624,000 بايت/ث`, `30 frames, so 6,220,800 × 30 = 186,624,000 bytes/s`) },
        { label: T(`الدقيقة`, `One minute`), sub: T(`× 60 = 11,197,440,000 بايت`, `× 60 = 11,197,440,000 bytes`) },
        { label: T(`النتيجة`, `Result`), sub: T(`نحو 11.2 GB، ولذلك تُضغط الفيديوهات دائمًا`, `about 11.2 GB, which is why video is always compressed`) },
      ] },
      { k: "p", t: T(`ومثال الصوت: قرص CD يأخذ 44,100 عينة في الثانية، لكل عينة 16 بت، وفي قناتين: 44,100 × 16 × 2 = 1,411,200 بت/ث، أي 176,400 بايت/ث، فالدقيقة 10,584,000 بايت ≈ 10.6 MB.`, `Audio example: a CD takes 44,100 samples per second, each 16 bits, in two channels: 44,100 × 16 × 2 = 1,411,200 bits/s, that is 176,400 bytes/s, so a minute is 10,584,000 bytes ≈ 10.6 MB.`) },

      { k: "h", t: T(`سرعة الشبكة: Mbps أم MB/s؟`, `Network speed: Mbps or MB/s?`) },
      { k: "p", t: T(`تقيس شركات الإنترنت السرعة بـ ${tm("Mbps")} أي ميغابت في الثانية (b صغيرة)، بينما يعرض المتصفح التنزيل بـ MB/s أي ميغابايت في الثانية (B كبيرة). التحويل: اقسم على 8. فاتصال 100 Mbps يعطي نظريًا 100 ÷ 8 = 12.5 MB/s، واتصال 500 Mbps يعطي 62.5 MB/s. والسرعة الفعلية أقل بقليل بسبب بيانات التحكم في البروتوكول وازدحام الشبكة.`, `Internet providers measure speed in ${tm("Mbps")}, megabits per second (lowercase b), while the browser shows downloads in MB/s, megabytes per second (uppercase B). The conversion: divide by 8. A 100 Mbps connection gives in theory 100 ÷ 8 = 12.5 MB/s, and 500 Mbps gives 62.5 MB/s. The real speed is somewhat lower because of protocol overhead and congestion.`) },
      { k: "code", lang: "python", code: "size_mb = 1000          # a 1 GB file, decimal\nspeed_mbps = 100        # advertised speed in megabits/s\nspeed_MBps = speed_mbps / 8\nprint(speed_MBps)       # megabytes per second\nprint(size_mb / speed_MBps)  # seconds" },
      { k: "out", code: "12.5\n80.0" },
      { k: "note", kind: "tip", t: T(`قاعدة سريعة: عند رؤية رقم مع <code>bps</code> فهو بالبت، وعند رؤية <code>B/s</code> فهو بالبايت. اقسم الأول على 8 لتقارنه بالثاني.`, `A quick rule: a number with <code>bps</code> is in bits, and one with <code>B/s</code> is in bytes. Divide the first by 8 to compare it with the second.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>شراء التخزين:</strong> تقدّر كم صورة تتسع لها ذاكرة هاتفك قبل الشراء.`, `<strong>Buying storage:</strong> you can estimate how many photos your phone's memory holds before you buy.`),
        T(`<strong>حصص الإنترنت:</strong> باقة 50 GB شهريًا تكفي لعدد معين من ساعات الفيديو بحسب جودته.`, `<strong>Data caps:</strong> a 50 GB monthly plan covers a certain number of video hours depending on quality.`),
        T(`<strong>اختيار الجودة:</strong> فهم معدل البت (Bitrate) يساعدك على اختيار إعدادات التسجيل والبث.`, `<strong>Choosing quality:</strong> understanding bitrate helps you pick recording and streaming settings.`),
      ] },

      { k: "mistakes", items: [
        T(`«Mb وMB شيء واحد»: الأول ميغابت والثاني ميغابايت، وبينهما ثمانية أضعاف.`, `“Mb and MB are the same”: the first is a megabit and the second a megabyte, eight times apart.`),
        T(`«قرصي ناقص أو الشركة تخدعني»: الفرق ناتج عن وحدة العد (1000 مقابل 1024) لا عن فقد بيانات.`, `“My drive is short, the maker is cheating me”: the gap comes from the counting unit (1000 versus 1024), not from lost data.`),
        T(`«ملف JPG يحتوي على عدد البكسلات نفسه فحجمه مثل الخام»: الضغط يقلل الحجم كثيرًا مع بقاء الأبعاد نفسها.`, `“A JPG has the same pixels so its size equals the raw size”: compression shrinks the size a lot while the dimensions stay the same.`),
        T(`«سرعة 100 Mbps تنزّل 100 ميغابايت كل ثانية»: هي 12.5 MB/s نظريًا فقط.`, `“100 Mbps downloads 100 megabytes every second”: it is only 12.5 MB/s in theory.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> ما حجم صورة غير مضغوطة أبعادها 4000 × 3000 بكسل بنظام RGB؟ وكم صورة منها تتسع على قرص 64 GB (عشري)؟`, `<strong>Calculation:</strong> what is the size of an uncompressed 4000 × 3000 RGB image, and how many fit on a 64 GB (decimal) drive?`), a: T(`<p>عدد البكسلات = 4000 × 3000 = 12,000,000. الحجم = 12,000,000 × 3 = 36,000,000 بايت = 36 MB. على قرص 64 GB = 64,000 MB يتسع 64,000 ÷ 36 ≈ 1,777 صورة (بعد تقريب الناتج للأسفل). وفي الواقع تُضغط الصورة إلى بضعة ميغابايتات، فيتسع أكثر بكثير.</p>`, `<p>Pixels = 4000 × 3000 = 12,000,000. Size = 12,000,000 × 3 = 36,000,000 bytes = 36 MB. A 64 GB drive is 64,000 MB, so 64,000 ÷ 36 ≈ 1,777 images (rounded down). In reality the image is compressed to a few megabytes, so far more would fit.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> اشتريت اتصالًا بسرعة 200 Mbps. كم تنتظر لتنزيل لعبة حجمها 40 GB، نظريًا؟`, `<strong>Reasoning:</strong> you bought a 200 Mbps connection. In theory, how long does a 40 GB game take to download?`), a: T(`<p>السرعة بالبايت = 200 ÷ 8 = 25 MB/s. اللعبة = 40 × 1000 = 40,000 MB. الزمن = 40,000 ÷ 25 = 1,600 ثانية ≈ 26.7 دقيقة. عمليًا يزيد الزمن قليلًا بسبب تحميل الخادم والبيانات الإضافية وازدحام الشبكة، وقد يحدّه كذلك قرص بطيء.</p>`, `<p>Speed in bytes = 200 ÷ 8 = 25 MB/s. The game = 40 × 1000 = 40,000 MB. Time = 40,000 ÷ 25 = 1,600 seconds ≈ 26.7 minutes. In practice it takes a little longer because of server load, protocol overhead and congestion, and a slow disk can also be a limit.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اعرف حجم ملف على جهازك بالبايت، ثم حوّله إلى KB وKiB وقارن.`, `<strong>Hands-on:</strong> find a file's size in bytes on your device, then convert it to KB and KiB and compare.`), a: T(`<p>في Windows انقر بزر الفأرة الأيمن على الملف واختر «خصائص» فيظهر الحجم بالبايت. نفترض 5,242,880 بايت: بالوحدات العشرية = 5,242.88 KB أي نحو 5.24 MB. وبالثنائية = 5,242,880 ÷ 1,024 = 5,120 KiB = 5 MiB بالضبط. فتفسير اختلاف الرقمين هو الوحدة وليس الملف. جرّب الأمر <code>ls -l</code> في Linux للحصول على الحجم بالبايت.</p>`, `<p>On Windows right-click the file and choose Properties to see its size in bytes. Suppose it is 5,242,880 bytes: in decimal units it is 5,242.88 KB, about 5.24 MB. In binary units it is 5,242,880 ÷ 1,024 = 5,120 KiB = exactly 5 MiB. The difference between the two figures comes from the unit, not from the file. On Linux try <code>ls -l</code> to get the size in bytes.</p>`) },

      { k: "summary", items: [
        T(`البت أصغر معلومة، والبايت ثماني خانات، وn خانة تعطي 2 أس n قيمة.`, `A bit is the smallest information, a byte is eight bits, and n bits give 2 to the power n values.`),
        T(`KB وMB عشريان (1000)، وKiB وMiB ثنائيان (1024)، وهذا يفسر سعة الأقراص.`, `KB and MB are decimal (1000), KiB and MiB binary (1024), which explains drive capacities.`),
        T(`حجم الصورة الخام = العرض × الارتفاع × بايتات البكسل، والضغط يقلله كثيرًا.`, `Raw image size = width × height × bytes per pixel, and compression shrinks it a lot.`),
        T(`Mbps يقسم على 8 ليصبح MB/s.`, `Mbps divided by 8 gives MB/s.`),
      ], next: T(`كيف يعمل البرنامج: كيف تتحول تعليماتك إلى أرقام ينفذها المعالج.`, `How a program runs: how your instructions become numbers the CPU executes.`) },
    ],
  },

  // ───────────────────────── com-14 ─────────────────────────
  {
    id: "com-14",
    body: [
      { k: "objectives", items: [
        T(`تشرح كيف يتحول ${tm("Source Code")} إلى ${tm("Machine Code")} وتفرّق بين اللغات المترجمة والمفسَّرة.`, `Explain how ${tm("Source Code")} becomes ${tm("Machine Code")} and tell compiled languages from interpreted ones.`),
        T(`تتبع رحلة البرنامج من التخزين إلى ${tm("RAM")} ثم إلى المعالج.`, `Follow a program's journey from storage to ${tm("RAM")} and then to the processor.`),
        T(`تفرّق بين ${tm("Program")} و${tm("Process")} وتفهم دور ${tm("Library")} والمكتبات المشتركة.`, `Distinguish a ${tm("Program")} from a ${tm("Process")} and understand the role of a ${tm("Library")} and shared libraries.`),
      ] },
      { k: "prereq", items: [T(`دروس المعالج (com-04) والذاكرة (com-05) ونظام التشغيل (com-10) والنظام الثنائي (com-12).`, `The CPU (com-04), RAM (com-05), operating-system (com-10) and binary (com-12) lessons.`)] },
      { k: "h", t: T(`مقدمة: من الفكرة إلى الأرقام`, `Introduction: from idea to numbers`) },
      { k: "p", t: T(`${tm("Program")} هو مجموعة تعليمات مرتبة تخبر الحاسوب بما يفعل. لكن المعالج لا يفهم Python ولا Java؛ لا يفهم إلا ${tm("Instruction Set")} أي مجموعة تعليماته الخاصة، وهي أرقام ثنائية تعني أشياء مثل «اجمع» أو «انقل» أو «اقفز». وهذه الأرقام ${tm("Machine Code")} أي لغة الآلة. ولأن كتابتها يدويًا شاقة، يكتب المبرمجون بلغة مفهومة للبشر ثم تُترجم.`, `A ${tm("Program")} is an ordered set of instructions telling the computer what to do. But the processor understands neither Python nor Java; it understands only its own ${tm("Instruction Set")}, a collection of binary numbers meaning things like “add”, “move” or “jump”. These numbers are ${tm("Machine Code")}. Since writing them by hand is laborious, programmers write in a human-friendly language and have it translated.`) },
      { k: "code", lang: "c", code: "int total = a + b;" },
      { k: "code", lang: "text", code: "mov  eax, [a]     ; load a into register eax\nadd  eax, [b]     ; add b to it\nmov  [total], eax ; store the result" },
      { k: "p", t: T(`السطر الأول مصدر بلغة C، والثاني مقابله بلغة ${tm("Assembly")} وهي صيغة مقروءة لتعليمات الآلة (تختلف بين أنواع المعالجات). وكل سطر Assembly يقابل تعليمة رقمية واحدة تقريبًا.`, `The first block is C source; the second is its counterpart in ${tm("Assembly")}, a readable form of machine instructions (it differs between processor families). Each Assembly line corresponds to roughly one numeric instruction.`) },

      { k: "h", t: T(`الترجمة: مترجمة أم مفسَّرة؟`, `Translation: compiled or interpreted?`) },
      { k: "p", t: T(`هناك طريقتان رئيسيتان للترجمة. ${tm("Compiler")} يترجم البرنامج كله مسبقًا إلى ملف تنفيذي، فيعمل بعد ذلك بسرعة بلا حاجة إلى المصدر، كما في C وC++ وRust وGo. أما ${tm("Interpreter")} فيقرأ البرنامج وينفذه أثناء التشغيل أمرًا أمرًا أو عبر خطوة وسيطة، كما في Python وJavaScript، وهو أسهل في التجربة وأبطأ عادة.`, `There are two main ways to translate. A ${tm("Compiler")} translates the whole program in advance into an executable file that then runs fast without needing the source, as in C, C++, Rust and Go. An ${tm("Interpreter")} reads the program and executes it while it runs, command by command or through an intermediate step, as in Python and JavaScript; it is easier to experiment with and usually slower.`) },
      { k: "flow", title: T(`مسار البرنامج المترجم`, `Pipeline of a compiled program`), steps: [
        { label: T(`الكود المصدري`, `Source code`), sub: T(`ملف نصي يكتبه المطور، مثل <code>main.c</code>`, `a text file the developer writes, such as <code>main.c</code>`) },
        { label: T(`المترجم`, `Compiler`), sub: T(`يفحص القواعد ويحوّل التعليمات إلى كود آلة`, `checks the grammar and converts instructions to machine code`) },
        { label: T(`الربط Linker`, `Linker`), sub: T(`يضم المكتبات ويصنع ملفًا تنفيذيًا`, `joins libraries and produces an executable file`) },
        { label: T(`الملف التنفيذي`, `Executable file`), sub: T(`ملف <code>.exe</code> أو ELF على القرص`, `an <code>.exe</code> or ELF file on the drive`) },
      ] },
      { k: "p", t: T(`وبين الطريقتين حلول وسطى: تترجم Java وC# إلى ${tm("Bytecode")} وهو كود وسيط يعمل على آلة افتراضية، وتستعمل الآلات الحديثة ترجمة فورية ${tm("JIT")} تحوّل الأجزاء كثيرة الاستعمال إلى كود آلة أثناء التشغيل لتسريعها. فالفرق بين «مترجمة» و«مفسَّرة» ليس صفة في اللغة نفسها بقدر ما هو طريقة تنفيذها.`, `Between the two sit hybrids: Java and C# compile to ${tm("Bytecode")}, an intermediate code that runs on a virtual machine, and modern engines use ${tm("JIT")} compilation, converting frequently used parts into machine code while running to speed them up. So “compiled” versus “interpreted” describes less the language itself and more how it is executed.`) },
      { k: "table", head: [T(`الجانب`, `Aspect`), T(`مترجمة (C, Rust)`, `Compiled (C, Rust)`), T(`مفسَّرة (Python, JS)`, `Interpreted (Python, JS)`)], rows: [
        [T(`السرعة`, `Speed`), T(`أعلى عادة`, `usually higher`), T(`أبطأ عادة`, `usually lower`)],
        [T(`التوزيع`, `Distribution`), T(`ملف تنفيذي لكل منصة`, `one executable per platform`), T(`يحتاج مفسّرًا على الجهاز`, `needs an interpreter on the device`)],
        [T(`دورة التجربة`, `Edit cycle`), T(`ترجمة ثم تشغيل`, `compile then run`), T(`تشغيل مباشر`, `run directly`)],
        [T(`اكتشاف الأخطاء`, `Finding errors`), T(`كثير منها قبل التشغيل`, `many before running`), T(`كثير منها أثناء التشغيل`, `many while running`)],
      ] },

      { k: "h", t: T(`من القرص إلى المعالج`, `From drive to processor`) },
      { k: "p", t: T(`الملف التنفيذي على القرص بيانات ساكنة لا تفعل شيئًا. وحين تنقر مرتين على أيقونته يبدأ ${tm("Loader")} في نظام التشغيل بقراءته وتحميل أجزائه في ${tm("RAM")}، لأن المعالج لا ينفذ مباشرة من القرص البطيء. ثم يضبط النظام مؤشرًا يسمى ${tm("Program Counter")} على أول تعليمة، ويبدأ المعالج دورة ${tm("Fetch-Decode-Execute")}: جلب التعليمة من الذاكرة، ثم فك رمزها لمعرفة المطلوب، ثم تنفيذها، وتتكرر مليارات المرات في الثانية.`, `The executable on the drive is inert data and does nothing. When you double-click its icon, the operating system's ${tm("Loader")} reads it and loads its parts into ${tm("RAM")}, because the processor does not execute straight from the slow drive. The system then sets a pointer called the ${tm("Program Counter")} to the first instruction, and the processor begins the ${tm("Fetch-Decode-Execute")} cycle: fetch the instruction from memory, decode it to learn what is asked, then execute it, repeating billions of times per second.`) },
      { k: "flow", title: T(`رحلة تشغيل برنامج`, `The journey of launching a program`), steps: [
        { label: T(`الطلب`, `Request`), sub: T(`تنقر الأيقونة، فيطلب نظام التشغيل الملف`, `you click the icon and the OS asks for the file`) },
        { label: T(`التحميل`, `Loading`), sub: T(`يُنسخ الكود والبيانات من القرص إلى الذاكرة`, `code and data are copied from the drive into memory`) },
        { label: T(`التهيئة`, `Setup`), sub: T(`يُنشأ ${tm("Process")} وتُعيَّن له ذاكرة ومؤشر البداية`, `a ${tm("Process")} is created with its memory and a starting pointer`) },
        { label: T(`التنفيذ`, `Execution`), sub: T(`المعالج يجلب ويفك وينفذ التعليمات`, `the CPU fetches, decodes and executes instructions`) },
        { label: T(`الإنهاء`, `Exit`), sub: T(`عند الإغلاق يستعيد النظام الذاكرة`, `on exit the OS reclaims the memory`) },
      ] },

      { k: "h", t: T(`البرنامج مقابل العملية، والمكتبات`, `Program versus process, and libraries`) },
      { k: "p", t: T(`البرنامج ملف على القرص، أما ${tm("Process")} (العملية) فهو البرنامج وهو يعمل: له رقم معرِّف ${tm("PID")} ومساحة ذاكرة خاصة وحالة. يمكنك تشغيل المتصفح مرتين فتحصل على عمليتين من برنامج واحد، ولكل منهما بياناتها المنفصلة. ويتولى نظام التشغيل تبديل المعالج بين العمليات بسرعة كبيرة فيبدو أنها تعمل معًا.`, `A program is a file on the drive, while a ${tm("Process")} is that program while it runs: it has an identifier ${tm("PID")}, its own memory space and a state. Launch the browser twice and you get two processes from one program, each with its own separate data. The operating system switches the processor among processes so fast that they appear to run together.`) },
      { k: "p", t: T(`ولا يكتب أحد كل شيء بنفسه. ${tm("Library")} (المكتبة) كود جاهز لمهام شائعة كالرسم أو الشبكات أو قراءة الملفات. بعض المكتبات تُدمج داخل الملف التنفيذي (ربط ساكن)، وبعضها مشترك يُحمَّل وقت التشغيل (ملفات <code>.dll</code> في Windows و<code>.so</code> في Linux)، فتستعمله عدة برامج بنسخة واحدة في الذاكرة. وتطلب البرامج من النظام خدمات مثل فتح ملف عبر ${tm("System Call")}، وهي الباب المنظم إلى النواة.`, `Nobody writes everything alone. A ${tm("Library")} is ready-made code for common jobs such as drawing, networking or reading files. Some libraries are built into the executable (static linking); others are shared and loaded at run time (<code>.dll</code> files on Windows, <code>.so</code> on Linux), so several programs use one copy in memory. Programs ask the system for services such as opening a file through a ${tm("System Call")}, the controlled doorway into the kernel.`) },
      { k: "code", lang: "bash", code: "python3 -c \"print('hello')\" &   # start a program in the background\nps -o pid,comm | head -n 4       # list a few processes" },
      { k: "out", code: "hello\n    PID COMMAND\n   1021 bash\n   1544 ps" },
      { k: "note", kind: "info", t: T(`الناتج أعلاه مثال توضيحي؛ أرقام PID تتغير في كل مرة. لاحظ أن كل أمر تشغّله يحصل على PID جديد، أي أنه عملية مستقلة.`, `The output above is an illustrative sample; PID numbers change every time. Notice that each command you run gets a fresh PID, meaning it is an independent process.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>مدير المهام:</strong> يعرض العمليات واستهلاكها للمعالج والذاكرة، وتستعمله لإغلاق برنامج معلّق.`, `<strong>Task Manager:</strong> shows processes and their CPU and memory use, and lets you end a frozen program.`),
        T(`<strong>التحديثات:</strong> تحديث مكتبة مشتركة واحدة يصلح عيبًا في عدة برامج معًا.`, `<strong>Updates:</strong> updating one shared library fixes a flaw in several programs at once.`),
        T(`<strong>اختيار اللغة:</strong> تُكتب أنظمة التشغيل والألعاب غالبًا بلغات مترجمة، وتُكتب مواقع الويب وسكربتات الأتمتة بلغات مفسَّرة.`, `<strong>Choosing a language:</strong> operating systems and games are often written in compiled languages, while websites and automation scripts use interpreted ones.`),
      ] },

      { k: "mistakes", items: [
        T(`«البرنامج يعمل مباشرة من القرص»: يُحمَّل أولًا إلى الذاكرة ثم ينفذه المعالج.`, `“A program runs straight from the drive”: it is loaded into memory first and then executed by the processor.`),
        T(`«اللغة إما مترجمة وإما مفسَّرة بطبيعتها»: كثير من اللغات لها منفذات بالطريقتين أو بخليط منهما.`, `“A language is inherently compiled or interpreted”: many languages have implementations of both kinds or a mix.`),
        T(`«البرنامج والعملية اسمان للشيء نفسه»: برنامج واحد قد يعطي عدة عمليات.`, `“Program and process are the same thing”: one program can yield several processes.`),
        T(`«الملف التنفيذي يعمل على أي جهاز»: هو مرتبط بنظام التشغيل وبنوع المعالج.`, `“An executable runs on any device”: it is tied to an operating system and a processor type.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> معالج يعمل بتردد 3 GHz وينفذ تعليمة واحدة كل دورة. كم تعليمة ينفذ في الثانية، وكم يستغرق تنفيذ برنامج من 6 مليارات تعليمة؟`, `<strong>Calculation:</strong> a 3 GHz processor executes one instruction per cycle. How many instructions per second, and how long does a 6-billion-instruction program take?`), a: T(`<p>3 GHz تعني 3,000,000,000 دورة في الثانية، فينفذ 3 مليارات تعليمة في الثانية. برنامج من 6 مليارات تعليمة يحتاج 6,000,000,000 ÷ 3,000,000,000 = 2 ثانية. وهذا أدنى زمن نظري؛ في الواقع تنفذ المعالجات الحديثة أكثر من تعليمة في الدورة، لكنها تنتظر الذاكرة أحيانًا، فيختلف الرقم.</p>`, `<p>3 GHz means 3,000,000,000 cycles per second, so it executes 3 billion instructions per second. A 6-billion-instruction program needs 6,000,000,000 ÷ 3,000,000,000 = 2 seconds. That is a theoretical minimum; real processors can execute more than one instruction per cycle but also wait for memory at times, so the figure differs.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> لماذا يبدأ برنامج كبير بطيئًا عند فتحه أول مرة ثم يفتح أسرع في المرة التالية؟`, `<strong>Reasoning:</strong> why does a large program open slowly the first time and faster the next?`), a: T(`<p>في المرة الأولى يقرأ نظام التشغيل ملفات البرنامج والمكتبات من القرص إلى الذاكرة، وهي العملية الأبطأ. ويحتفظ النظام بنسخ مما قرأه في ذاكرة مؤقتة (Cache) في RAM الفارغة، فإذا أعدت فتح البرنامج قريبًا وجد النظام الملفات في الذاكرة وتجاوز القراءة من القرص. وإذا كان القرص HDD فالفرق أوضح، لأن وصوله أبطأ كثيرًا من RAM.</p>`, `<p>The first time, the operating system reads the program's files and libraries from the drive into memory, which is the slowest step. The system keeps copies of what it read in a cache in spare RAM, so when you reopen the program soon after, it finds the files in memory and skips the drive read. With an HDD the difference is clearer, as its access is much slower than RAM.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> شاهد العمليات على جهازك وأنشئ عملية جديدة وتتبّعها.`, `<strong>Hands-on:</strong> watch the processes on your machine, create a new one and track it.`), a: T(`<p>افتح مدير المهام في Windows بالضغط على Ctrl+Shift+Esc أو الطرفية في Linux وابدأ الأمر <code>top</code>. سجّل PID لبرنامج مثل المتصفح. ثم شغّل نسخة ثانية منه وراقب ظهور عمليات جديدة بأرقام PID مختلفة وذاكرة مختلفة. أغلق إحدى النسختين وتأكد أن الأخرى مستمرة، وهذا يبرهن أنهما عمليتان مستقلتان من برنامج واحد.</p>`, `<p>Open Task Manager on Windows with Ctrl+Shift+Esc, or the terminal on Linux and start the <code>top</code> command. Note the PID of a program such as the browser. Then start a second instance and watch new processes appear with different PIDs and different memory. Close one instance and confirm the other keeps running, which shows they are independent processes of one program.</p>`) },

      { k: "summary", items: [
        T(`المعالج لا ينفذ إلا كود الآلة، وكل لغة أخرى تُترجم إليه أو تُفسَّر.`, `The processor runs only machine code, and every other language is translated or interpreted into it.`),
        T(`المترجم يحوّل البرنامج مسبقًا، والمفسِّر ينفذه أثناء التشغيل، وهناك حلول وسطى كالـ Bytecode وJIT.`, `A compiler converts ahead of time, an interpreter executes while running, and hybrids exist such as bytecode and JIT.`),
        T(`البرنامج يُحمَّل من القرص إلى RAM ثم يجلب المعالج تعليماته وينفذها.`, `A program is loaded from the drive into RAM, then the CPU fetches and executes its instructions.`),
        T(`العملية هي البرنامج وهو يعمل، والمكتبات تعيد استعمال الكود.`, `A process is a program in action, and libraries reuse code.`),
      ], next: T(`الإنترنت والشبكات: كيف تتواصل الحواسيب مع بعضها.`, `Internet and networks: how computers talk to each other.`) },
    ],
  },

  // ───────────────────────── com-15 ─────────────────────────
  {
    id: "com-15",
    body: [
      { k: "objectives", items: [
        T(`تفرّق بين ${tm("LAN")} و${tm("WAN")} و${tm("Internet")} وتصف دور ${tm("Router")} و${tm("Switch")}.`, `Tell a ${tm("LAN")}, a ${tm("WAN")} and the ${tm("Internet")} apart and describe the roles of a ${tm("Router")} and a ${tm("Switch")}.`),
        T(`تشرح ${tm("IP Address")} و${tm("DNS")} و${tm("Packet")} والمنافذ ونموذج ${tm("Client-Server")}.`, `Explain an ${tm("IP Address")}, ${tm("DNS")}, a ${tm("Packet")}, ports and the ${tm("Client-Server")} model.`),
        T(`تفرّق بين ${tm("Latency")} و${tm("Bandwidth")} وتقرأ ناتج <code>ping</code> و<code>nslookup</code>.`, `Distinguish ${tm("Latency")} from ${tm("Bandwidth")} and read <code>ping</code> and <code>nslookup</code> output.`),
      ] },
      { k: "prereq", items: [T(`درس البت والبايت (com-13) لحساب سرعات النقل، ودرس نظام التشغيل (com-10).`, `The bits and bytes lesson (com-13) for transfer-speed arithmetic, and the operating-system lesson (com-10).`)] },
      { k: "h", t: T(`مقدمة: حاسوبان يتحدثان`, `Introduction: two computers talking`) },
      { k: "p", t: T(`${tm("Network")} أو الشبكة مجموعة أجهزة متصلة لتتبادل البيانات، عبر كابل أو موجات لاسلكية. ما إن يتصل جهازان حتى تظهر أسئلة: كيف يُعرَّف كل منهما؟ وكيف يصل الكلام إلى المقصود وحده؟ وما اللغة المشتركة؟ الإجابات هي بنية الإنترنت، وتُحل بطبقات من القواعد تسمى ${tm("Protocol")} أي بروتوكولات.`, `A ${tm("Network")} is a group of devices connected to exchange data, by cable or radio waves. As soon as two devices connect, questions arise: how is each identified? how does a message reach only its target? what common language do they use? The answers form the structure of the internet, solved by layers of rules called a ${tm("Protocol")}.`) },

      { k: "h", t: T(`أنواع الشبكات ومكوّناتها`, `Kinds of networks and their parts`) },
      { k: "ul", items: [
        T(`<strong>${tm("LAN")}:</strong> شبكة محلية في نطاق صغير كالبيت أو المكتب أو المدرسة.`, `<strong>${tm("LAN")}:</strong> a local area network within a small area such as a home, office or school.`),
        T(`<strong>${tm("WAN")}:</strong> شبكة واسعة تربط مواقع متباعدة عبر مدن أو دول، وغالبًا بخطوط يؤجرها مزودو الخدمة.`, `<strong>${tm("WAN")}:</strong> a wide area network linking distant sites across cities or countries, often over lines leased from providers.`),
        T(`<strong>${tm("Internet")}:</strong> ليس شبكة واحدة، بل شبكة من آلاف الشبكات المستقلة المتصلة بعضها ببعض وفق بروتوكولات مشتركة.`, `<strong>${tm("Internet")}:</strong> not one network, but a network of thousands of independent networks interconnected by shared protocols.`),
      ] },
      { k: "diagram", title: T(`شبكة منزلية نموذجية`, `A typical home network`), rows: [
        { label: T(`الهواتف والحواسيب`, `Phones and computers`), sub: T(`أجهزة تتصل عبر Wi-Fi أو كابل`, `devices joining over Wi-Fi or cable`) },
        { label: T(`المبدّل Switch / نقطة الوصول`, `Switch / access point`), sub: T(`يوصل أجهزة الشبكة المحلية ويوجّه الإطارات بينها`, `joins devices in the local network and forwards frames between them`) },
        { label: T(`الموجّه Router`, `Router`), sub: T(`بوابة الشبكة المحلية إلى الشبكات الأخرى`, `the gateway from the local network to other networks`) },
        { label: T(`مزوّد الخدمة ISP`, `Internet provider (ISP)`), sub: T(`يربط بيتك ببقية الإنترنت`, `connects your home to the rest of the internet`) },
        { label: T(`الإنترنت`, `The Internet`), sub: T(`شبكات ومراكز بيانات حول العالم`, `networks and data centres worldwide`) },
      ] },
      { k: "p", t: T(`الفرق: ${tm("Switch")} يربط الأجهزة <em>داخل</em> الشبكة نفسها ويوصل الرسالة للجهاز المقصود فقط بحسب عنوانه المادي ${tm("MAC Address")}، بينما ${tm("Router")} يربط <em>بين</em> الشبكات ويختار الطريق التالي للرسالة بحسب عنوان IP. وفي المنازل يجمع جهاز واحد عدة وظائف: موجّه ونقطة وصول ومبدّل صغير.`, `The difference: a ${tm("Switch")} joins devices <em>inside</em> one network and delivers a message only to the intended device by its hardware ${tm("MAC Address")}, whereas a ${tm("Router")} joins <em>between</em> networks and chooses the message's next hop by its IP address. At home one box often combines several roles: router, access point and a small switch.`) },

      { k: "h", t: T(`العناوين وDNS`, `Addresses and DNS`) },
      { k: "p", t: T(`لكل جهاز على الشبكة ${tm("IP Address")}: رقم يعرّفه ويحدد مكانه. في ${tm("IPv4")} يتكون العنوان من 32 بتًا تُكتب أربعة أعداد من 0 إلى 255 تفصل بينها نقاط، مثل <code>192.168.1.20</code>. وعدد العناوين الممكنة 2 أس 32 = 4,294,967,296، وهو لا يكفي لكل أجهزة العالم، فظهر ${tm("IPv6")} بعناوين 128 بتًا. وتخصص نطاقات خاصة مثل <code>192.168.x.x</code> للشبكات المحلية، فيتكرر استعمالها في بيوت كثيرة، ويتولى الموجّه الترجمة بينها وبين عنوانك العام عبر ${tm("NAT")}.`, `Every device on the network has an ${tm("IP Address")}: a number that identifies it and gives its location. In ${tm("IPv4")} the address is 32 bits, written as four numbers from 0 to 255 separated by dots, such as <code>192.168.1.20</code>. The possible addresses number 2 to the power 32 = 4,294,967,296, not enough for every device on Earth, so ${tm("IPv6")} appeared with 128-bit addresses. Private ranges such as <code>192.168.x.x</code> are reserved for local networks and reused in many homes, and the router translates between them and your public address through ${tm("NAT")}.`) },
      { k: "p", t: T(`البشر يتذكرون الأسماء لا الأرقام، وهنا يأتي ${tm("DNS")} (Domain Name System): نظام موزع يشبه دليل الهاتف يحوّل الاسم مثل <code>example.com</code> إلى عنوان IP. فحين تكتب العنوان في المتصفح يسأل جهازك خادم DNS (يعيّنه مزود الخدمة عادة)، فيعود بالرقم، ثم يتصل المتصفح بالعنوان الرقمي.`, `People remember names, not numbers, and that is where ${tm("DNS")} (Domain Name System) comes in: a distributed system like a phone book that turns a name such as <code>example.com</code> into an IP address. When you type the address in the browser your device asks a DNS server (usually assigned by your provider), which replies with the number, and only then does the browser connect to the numeric address.`) },
      { k: "code", lang: "bash", code: "nslookup example.com\nping -c 3 example.com" },
      { k: "out", code: "Name:    example.com\nAddress: 192.0.2.10\n\nPING example.com (192.0.2.10): 56 data bytes\n64 bytes from 192.0.2.10: icmp_seq=0 ttl=57 time=38.2 ms\n64 bytes from 192.0.2.10: icmp_seq=1 ttl=57 time=39.1 ms\n64 bytes from 192.0.2.10: icmp_seq=2 ttl=57 time=37.8 ms\n--- 3 packets transmitted, 3 received, 0% packet loss\nround-trip min/avg/max = 37.8/38.4/39.1 ms" },
      { k: "note", kind: "info", t: T(`هذا مثال توضيحي لشكل الناتج فقط: العنوان <code>192.0.2.10</code> محجوز للأمثلة، وستختلف الأرقام والأزمنة على جهازك. تعني <code>time</code> زمن الرحلة ذهابًا وإيابًا بالميلي ثانية، و<code>ttl</code> عدد القفزات المتبقية قبل إسقاط الحزمة، و<code>packet loss</code> نسبة الحزم الضائعة.`, `This is an illustrative sample of the output's shape only: the address <code>192.0.2.10</code> is reserved for examples, and the numbers and times on your machine will differ. <code>time</code> is the round trip in milliseconds, <code>ttl</code> the hops left before a packet is dropped, and <code>packet loss</code> the share of lost packets.`) },

      { k: "h", t: T(`الحزم والعميل والخادم والمنافذ`, `Packets, client and server, and ports`) },
      { k: "p", t: T(`لا تُرسل البيانات في قطعة واحدة؛ تُقسَّم إلى ${tm("Packet")} (حزم) صغيرة، لكل منها رأس يحمل عنوان المرسل والمستقبل ورقم تسلسلها. وتسير الحزم كل منها بحسب أفضل طريق متاح، وقد تصل متأخرة أو بترتيب مختلف، فيعيد الطرف المستقبل ترتيبها ويطلب إعادة ما ضاع. وهذه ميزة: إن تعطل جزء من الشبكة أمكن للحزم أن تسلك طريقًا آخر. وتبلغ الحزمة النموذجية في الإيثرنت نحو 1500 بايت، يحمل منها المحتوى نحو 1460 بعد الرؤوس. فملف حجمه 1,000,000 بايت يحتاج نحو 685 حزمة.`, `Data is not sent in one piece; it is split into small ${tm("Packet")}s, each with a header carrying the sender and receiver addresses and a sequence number. Each packet follows the best path available, and may arrive late or out of order, so the receiver reorders them and asks for anything lost. That is an advantage: if part of the network fails, packets can take another route. A typical Ethernet packet is about 1500 bytes, of which about 1460 carry content after the headers. So a file of 1,000,000 bytes needs about 685 packets.`) },
      { k: "p", t: T(`وتتواصل التطبيقات بنمط ${tm("Client-Server")}: ${tm("Client")} (العميل) يطلب، كالمتصفح على هاتفك، و${tm("Server")} (الخادم) حاسوب يعمل باستمرار ويستجيب بالموارد. ولأن الجهاز الواحد يشغّل خدمات كثيرة في الوقت نفسه، يوجد ${tm("Port")} (منفذ): رقم من 0 إلى 65,535 يحدد أي تطبيق على الجهاز هو المقصود، كما أن رقم الشقة يكمل عنوان العمارة.`, `Applications communicate in a ${tm("Client-Server")} pattern: a ${tm("Client")} asks, like the browser on your phone, and a ${tm("Server")} is a computer that runs continuously and answers with resources. Because one machine runs many services at once, there is a ${tm("Port")}: a number from 0 to 65,535 that identifies which application on the machine is meant, just as an apartment number completes a building's address.`) },
      { k: "table", head: [T(`المنفذ`, `Port`), T(`الخدمة`, `Service`), T(`الاستعمال`, `Use`)], rows: [
        [T(`80`, `80`), T(`HTTP`, `HTTP`), T(`صفحات الويب بلا تشفير`, `unencrypted web pages`)],
        [T(`443`, `443`), T(`HTTPS`, `HTTPS`), T(`صفحات الويب المشفرة`, `encrypted web pages`)],
        [T(`22`, `22`), T(`SSH`, `SSH`), T(`دخول آمن عن بعد`, `secure remote login`)],
        [T(`53`, `53`), T(`DNS`, `DNS`), T(`تحويل الأسماء إلى عناوين`, `turning names into addresses`)],
      ] },
      { k: "flow", title: T(`ماذا يحدث حين تفتح موقعًا؟`, `What happens when you open a website?`), steps: [
        { label: T(`سؤال DNS`, `DNS query`), sub: T(`يحوّل الجهاز الاسم إلى عنوان IP`, `the device turns the name into an IP address`) },
        { label: T(`الاتصال`, `Connection`), sub: T(`يفتح المتصفح اتصالًا بالخادم على المنفذ 443`, `the browser opens a connection to the server on port 443`) },
        { label: T(`الطلب`, `Request`), sub: T(`يُقسَّم الطلب إلى حزم تعبر الموجّهات`, `the request is split into packets crossing routers`) },
        { label: T(`الاستجابة`, `Response`), sub: T(`يرسل الخادم الصفحة في حزم تعود إلى جهازك`, `the server sends the page back as packets to your device`) },
        { label: T(`العرض`, `Display`), sub: T(`يعيد المتصفح تجميعها ويعرضها`, `the browser reassembles and displays it`) },
      ] },

      { k: "h", t: T(`زمن التأخير مقابل عرض النطاق`, `Latency versus bandwidth`) },
      { k: "p", t: T(`يخلط كثيرون بين المفهومين. ${tm("Bandwidth")} هو كمية البيانات التي يمكن نقلها في الثانية، كعرض الطريق، ويُقاس بـ Mbps. أما ${tm("Latency")} فهو الزمن الذي تستغرقه رسالة صغيرة لتصل، كطول الطريق، ويقاس بالميلي ثانية، وهو ما يعطيه <code>ping</code>. لا يمكن لعرض أكبر أن يلغي زمنًا فرضته المسافة؛ فالضوء في الألياف الضوئية يقطع نحو 200,000 كم/ث، فمسافة 6,000 كم تحتاج 30 ms في اتجاه واحد، أي 60 ms ذهابًا وإيابًا على الأقل.`, `Many people confuse the two. ${tm("Bandwidth")} is how much data can be moved per second, like a road's width, measured in Mbps. ${tm("Latency")} is how long a tiny message takes to arrive, like a road's length, measured in milliseconds, and it is what <code>ping</code> reports. A wider pipe cannot cancel a delay imposed by distance: light in optical fibre covers about 200,000 km/s, so 6,000 km takes 30 ms one way, at least 60 ms round trip.`) },
      { k: "p", t: T(`ولهذا يهمك الأمران في أمور مختلفة: تنزيل ملف ضخم يعتمد على عرض النطاق، أما المكالمات المرئية والألعاب الفورية فتعتمد على زمن التأخير. وتُسمى ${tm("Jitter")} الاختلاف المتذبذب في زمن التأخير، وهو ما يسبب تقطع الصوت.`, `That is why each matters for different things: downloading a huge file depends on bandwidth, whereas video calls and real-time games depend on latency. ${tm("Jitter")} is the fluctuation of latency from one packet to the next, and it is what makes audio stutter.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>تشخيص الأعطال:</strong> إن عمل <code>ping</code> إلى عنوان رقمي ولم يعمل إلى اسم فالمشكلة غالبًا في DNS.`, `<strong>Troubleshooting:</strong> if <code>ping</code> works to a numeric address but not to a name, the problem is probably DNS.`),
        T(`<strong>الشبكات المنزلية:</strong> وضع جهاز الألعاب بكابل بدل Wi-Fi يقلل زمن التأخير ويثبّته.`, `<strong>Home networks:</strong> connecting a game console by cable instead of Wi-Fi lowers and steadies latency.`),
        T(`<strong>الخدمات السحابية:</strong> تضع الشركات خوادمها قرب مستخدميها لتقصير المسافة.`, `<strong>Cloud services:</strong> companies place servers near their users to shorten the distance.`),
      ] },

      { k: "mistakes", items: [
        T(`«الإنترنت هو الويب»: الويب خدمة تعمل فوق الإنترنت، وهناك خدمات أخرى كالبريد والمكالمات.`, `“The internet is the web”: the web is a service running on top of the internet, alongside others such as email and calls.`),
        T(`«سرعة أكبر تعني تأخيرًا أقل»: عرض النطاق وزمن التأخير مستقلان إلى حد كبير.`, `“More speed means less delay”: bandwidth and latency are largely independent.`),
        T(`«الموجّه والمبدّل شيء واحد»: المبدّل يعمل داخل الشبكة، والموجّه يربط بين الشبكات.`, `“A router and a switch are the same”: a switch works inside a network, a router connects between networks.`),
        T(`«عنوان IP الخاص بجهازي يراه كل العالم»: عنوان <code>192.168.x.x</code> محلي فقط، والمواقع ترى عنوان الموجّه العام.`, `“Everyone in the world sees my device's IP”: a <code>192.168.x.x</code> address is local only; websites see the router's public address.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> تنزل ملفًا حجمه 600 MB على اتصال 50 Mbps. كم يستغرق نظريًا؟ ثم ما التأخير الإضافي إذا كان الملف يُطلب في 100 طلب صغير متتالٍ وزمن التأخير 40 ms لكل طلب؟`, `<strong>Calculation:</strong> you download a 600 MB file on a 50 Mbps connection. How long does it take in theory? Then what extra delay arises if the file is fetched in 100 small sequential requests with 40 ms latency each?`), a: T(`<p>600 MB = 600 × 8 = 4,800 Mb. الزمن = 4,800 ÷ 50 = 96 ثانية. وبالبايت: 50 ÷ 8 = 6.25 MB/s، و600 ÷ 6.25 = 96 ثانية أيضًا. أما 100 طلب متتالٍ فيضيف 100 × 40 ms = 4,000 ms = 4 ثوانٍ انتظار، فيصبح المجموع نحو 100 ثانية. ومن ذلك نرى أن التأخير يؤثر أكثر حين تكون الطلبات كثيرة وصغيرة.</p>`, `<p>600 MB = 600 × 8 = 4,800 Mb. Time = 4,800 ÷ 50 = 96 seconds. In bytes: 50 ÷ 8 = 6.25 MB/s and 600 ÷ 6.25 = 96 seconds again. 100 sequential requests add 100 × 40 ms = 4,000 ms = 4 seconds of waiting, bringing the total to about 100 seconds. This shows latency matters most when requests are many and small.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> يفتح الموقع <code>http://203.0.113.5</code> في المتصفح لكن <code>example.com</code> لا يفتح. ما الاحتمال الأرجح، وكيف تتأكد؟`, `<strong>Reasoning:</strong> the address <code>http://203.0.113.5</code> opens in the browser but <code>example.com</code> does not. What is the most likely cause and how do you confirm it?`), a: T(`<p>الاتصال بالإنترنت سليم لأن العنوان الرقمي يعمل، فالمشكلة في تحويل الاسم أي DNS. للتأكد نفّذ <code>nslookup example.com</code>: إن لم يرجع عنوانًا أو ظهر خطأ فخادم DNS معطل أو مضبوط خطأ. الحل أن تغيّر خادم DNS في إعدادات الشبكة إلى خادم عام آخر، أو تعيد تشغيل الموجّه، ثم تعيد الاختبار.</p>`, `<p>Connectivity is fine since the numeric address works, so the problem is name resolution, that is DNS. To confirm, run <code>nslookup example.com</code>: if it returns no address or an error, the DNS server is down or misconfigured. The fix is to change the DNS server in the network settings to another public one, or restart the router, then test again.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اكتشف عنوان IP المحلي لجهازك وقِس زمن التأخير إلى موقع.`, `<strong>Hands-on:</strong> find your device's local IP address and measure latency to a website.`), a: T(`<p>في Windows اكتب <code>ipconfig</code> في موجه الأوامر وابحث عن «IPv4 Address»، وفي Linux استعمل <code>ip addr</code>، وغالبًا ستجده بصيغة <code>192.168.x.x</code>. ثم نفّذ <code>ping example.com</code> وسجّل متوسط الزمن. أعد القياس على Wi-Fi وبكابل إن أمكن وقارن، ثم جرّب موقعًا في قارة بعيدة ولاحظ زيادة الزمن بحسب المسافة. تذكّر أن الأرقام التي ستراها تخص شبكتك وليست مثل المثال.</p>`, `<p>On Windows type <code>ipconfig</code> in the command prompt and look for “IPv4 Address”; on Linux use <code>ip addr</code>. You will usually see the form <code>192.168.x.x</code>. Then run <code>ping example.com</code> and note the average time. Repeat over Wi-Fi and by cable if you can and compare, then try a site on a distant continent and notice the time grow with distance. Remember that the numbers you see belong to your network and will not match the sample.</p>`) },

      { k: "summary", items: [
        T(`LAN شبكة محلية، وWAN واسعة، والإنترنت شبكة من الشبكات؛ المبدّل يربط داخلها والموجّه يربط بينها.`, `A LAN is local, a WAN is wide, and the internet is a network of networks; a switch connects inside one and a router connects between them.`),
        T(`عنوان IP يحدد الجهاز، وDNS يحوّل الأسماء إلى عناوين، والحزم تحمل البيانات، والمنافذ تحدد التطبيق.`, `An IP address identifies the device, DNS turns names into addresses, packets carry the data and ports pick the application.`),
        T(`العميل يطلب والخادم يستجيب.`, `The client asks and the server responds.`),
        T(`عرض النطاق هو الكمية في الثانية، وزمن التأخير هو سرعة وصول الرسالة، وكلاهما مستقل عن الآخر.`, `Bandwidth is the amount per second, latency is how fast a message arrives, and the two are largely independent.`),
      ], next: T(`المتصفح والويب: كيف يستعمل المتصفح هذه الشبكة ليعرض الصفحات.`, `The Browser and the Web: how the browser uses this network to display pages.`) },
    ],
  },
];
