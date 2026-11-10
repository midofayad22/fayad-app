// Computer Basics — deep rewrite of lessons com-06 … com-10 (bodies only). Authored once as AR/EN pairs (see content/_doc.js).
import { T } from "../_doc.js";

const tm = (s) => `<span class="term">${s}</span>`;

export const defs = [
  // ───────────────────────── com-06 ─────────────────────────
  {
    id: "com-06",
    body: [
      { k: "objectives", items: [
        T(`تفرّق بين ${tm("RAM")} والتخزين الدائم، وتشرح لماذا يحتاج الجهاز إلى الاثنين.`, `Explain how <span class="term">RAM</span> differs from permanent storage and why a computer needs both.`),
        T(`تقارن بين ${tm("HDD")} و${tm("SSD")} و${tm("NVMe")} من حيث الآلية والسرعة والعمر.`, `Compare ${tm("HDD")}, ${tm("SSD")} and ${tm("NVMe")} drives by mechanism, speed and lifespan.`),
        T(`تحسب السعة الفعلية وزمن النقل، وتضع خطة نسخ احتياطي بسيطة.`, `Calculate real capacity and transfer time, and set up a simple backup plan.`),
      ] },
      { k: "prereq", items: [T(`دروس المعالج (com-04) والذاكرة RAM (com-05).`, `The CPU (com-04) and RAM (com-05) lessons.`)] },
      { k: "h", t: T(`مقدمة: ما الذي يبقى بعد إطفاء الجهاز؟`, `Introduction: what survives a shutdown?`) },
      { k: "p", t: T(`حين تُطفئ الحاسوب تختفي كل البيانات من الذاكرة RAM، ومع ذلك تجد صورك ومستنداتك وبرامجك في مكانها عند التشغيل التالي. السبب أن هذه الأشياء محفوظة في ${tm("Storage")}، أي وحدة التخزين: مكوّن يحتفظ بالبيانات دون حاجة إلى كهرباء مستمرة. نسمي هذه الخاصية ${tm("Non-volatile")}، أي غير متطايرة، مقابل ${tm("Volatile")} وهي حال الذاكرة العشوائية.`, `When you switch a computer off, everything in RAM vanishes, yet your photos, documents and programs are still there at the next start. They survive because they live in ${tm("Storage")}: a component that keeps data without needing continuous power. That property is called ${tm("Non-volatile")}, as opposed to ${tm("Volatile")}, which describes RAM.`) },
      { k: "p", t: T(`لماذا لا نكتفي بنوع واحد من الذاكرة؟ لأن السرعة والسعة والسعر لا تجتمع. الذاكرة العشوائية سريعة لكنها مكلفة ومؤقتة، والتخزين رخيص وكبير ودائم لكنه أبطأ بكثير. فالتخزين هو «المخزن» والذاكرة هي «طاولة العمل»: تُنقل إلى الطاولة الأشياء التي تعمل عليها الآن فقط.`, `Why not use a single kind of memory? Because speed, capacity and price never come together. RAM is fast but expensive and temporary; storage is cheap, large and permanent but much slower. Think of storage as the warehouse and RAM as the workbench: only what you are working on right now is carried to the bench.`) },

      { k: "h", t: T(`كيف تُخزَّن البيانات: ثلاث تقنيات`, `How data is stored: three technologies`) },
      { k: "p", t: T(`يخزّن ${tm("HDD")} (القرص الصلب التقليدي) البيانات مغناطيسيًا على أقراص معدنية تدور بسرعة 5400 أو 7200 لفة في الدقيقة، وتقرأها رأس صغير يتحرك فوق السطح. الحركة الميكانيكية هي سبب بطئه وحساسيته للصدمات. أما ${tm("SSD")} (قرص الحالة الصلبة) فلا يحتوي أجزاء متحركة، ويخزّن البيانات في رقائق ${tm("Flash")} من نوع NAND تحتفظ بالشحنة الكهربائية حتى دون طاقة.`, `An ${tm("HDD")} (hard disk drive) stores data magnetically on metal platters spinning at 5400 or 7200 revolutions per minute, read by a tiny head that moves over the surface. That mechanical motion is the reason for its slowness and its sensitivity to shocks. An ${tm("SSD")} (solid-state drive) has no moving parts and keeps data in NAND ${tm("Flash")} chips that hold their electrical charge even without power.`) },
      { k: "p", t: T(`ثم يأتي ${tm("NVMe")}: ليس نوعًا جديدًا من الرقائق بل بروتوكول حديث يوصل SSD مباشرة بمسارات ${tm("PCIe")} على اللوحة الأم، فيتجاوز قيود واجهة SATA القديمة. وعادة يأتي بشكل شريحة صغيرة تسمى M.2 تُركَّب على اللوحة.`, `Then there is ${tm("NVMe")}: not a new kind of chip but a modern protocol that connects an SSD directly to ${tm("PCIe")} lanes on the motherboard, escaping the limits of the older SATA interface. It usually comes as a small stick called M.2 that plugs into the board.`) },
      { k: "table", head: [T(`النوع`, `Type`), T(`الآلية`, `Mechanism`), T(`سرعة القراءة المتتابعة التقريبية`, `Approx. sequential read speed`), T(`الاستخدام المعتاد`, `Typical use`)], rows: [
        [T(`HDD`, `HDD`), T(`أقراص مغناطيسية دوارة`, `spinning magnetic platters`), T(`100–200 MB/s`, `100–200 MB/s`), T(`أرشفة وسعة كبيرة بسعر قليل`, `archives and cheap bulk capacity`)],
        [T(`SSD عبر SATA`, `SATA SSD`), T(`رقائق Flash`, `flash chips`), T(`نحو 550 MB/s`, `about 550 MB/s`), T(`ترقية الحواسيب القديمة`, `upgrading older computers`)],
        [T(`NVMe عبر PCIe 3.0`, `NVMe on PCIe 3.0`), T(`رقائق Flash على مسارات PCIe`, `flash chips on PCIe lanes`), T(`حتى نحو 3,500 MB/s`, `up to about 3,500 MB/s`), T(`الحواسيب الحديثة`, `modern computers`)],
        [T(`NVMe عبر PCIe 4.0`, `NVMe on PCIe 4.0`), T(`رقائق Flash على مسارات PCIe`, `flash chips on PCIe lanes`), T(`حتى نحو 7,000 MB/s`, `up to about 7,000 MB/s`), T(`العمل الاحترافي والألعاب`, `professional work and gaming`)],
      ] },
      { k: "note", kind: "info", t: T(`الأرقام في الجدول سقوف نظرية للنقل المتتابع لملفات كبيرة. الأداء الفعلي يتفاوت بحسب الطراز، وفي القراءات العشوائية لملفات صغيرة تقل الفروق بين الأنواع نسبيًا لكن يبقى SSD أسرع بعشرات المرات من HDD.`, `The table gives theoretical ceilings for sequential transfer of large files. Real performance varies by model; with small random reads the gap narrows somewhat, but an SSD is still tens of times faster than an HDD.`) },

      { k: "h", t: T(`ماذا يحدث داخل SSD؟`, `What happens inside an SSD?`) },
      { k: "p", t: T(`تُنظَّم خلايا NAND في صفحات وكتل. يمكن كتابة صفحة جديدة بسرعة، لكن لا يمكن الكتابة فوق بيانات موجودة؛ يجب مسح الكتلة كاملة أولًا. ولهذا يحتوي SSD على متحكم (${tm("Controller")}) يدير الأمر بذكاء: يوزّع الكتابة على الخلايا بالتساوي (${tm("Wear Leveling")}) لأن لكل خلية عددًا محدودًا من دورات المسح قبل أن تتعب. ويقيس المصنّعون ذلك بقيمة ${tm("TBW")} أي إجمالي البيانات التي يضمنون كتابتها، وهي عادة مئات التيرابايت للأقراص المنزلية.`, `NAND cells are organised into pages and blocks. A fresh page can be written quickly, but existing data cannot be overwritten in place; the whole block must be erased first. So an SSD contains a ${tm("Controller")} that manages this cleverly: it spreads writes evenly across cells (${tm("Wear Leveling")}) because each cell survives only a limited number of erase cycles. Manufacturers express this as ${tm("TBW")}, the total data they guarantee can be written, usually hundreds of terabytes for consumer drives.`) },
      { k: "p", t: T(`لا تقلق على قرصك في الاستعمال العادي: كتابة 50 جيجابايت يوميًا تعني 18.25 تيرابايت في السنة، فقرص بـ 600 TBW يحتاج أكثر من 30 سنة ليبلغ حده.`, `Do not worry about your drive in normal use: writing 50 GB a day is 18.25 TB a year, so a drive rated at 600 TBW would take over 30 years to reach its limit.`) },

      { k: "h", t: T(`السعة الحقيقية ونظام الملفات`, `Real capacity and file systems`) },
      { k: "p", t: T(`يعرّف المصنّعون الـ جيجابايت بالنظام العشري: 1 TB = 1,000,000,000,000 بايت. أما Windows فيحسب بقوى الرقم 2 (1 GiB = 1,073,741,824 بايت) ويعرض الناتج بالرمز GB، ولذلك يبدو القرص أصغر مما كُتب على علبته. القرص 1 TB يظهر بنحو 931 GB، وليست هذه خسارة حقيقية بل اختلاف في وحدة القياس.`, `Manufacturers define a gigabyte in decimal: 1 TB = 1,000,000,000,000 bytes. Windows counts in powers of 2 (1 GiB = 1,073,741,824 bytes) and displays the result with the label GB, so a drive looks smaller than the box says. A 1 TB drive shows up as about 931 GB; nothing is actually lost, it is just a different unit.`) },
      { k: "p", t: T(`ولكي يستعمل النظام القرص يجب أن يُقسَّم إلى ${tm("Partition")} (أقسام)، ثم يُهيَّأ كل قسم بـ ${tm("File System")}: البنية التي تسجّل أسماء الملفات ومواضعها. من أشهرها NTFS في Windows وAPFS في macOS وext4 في Linux، وexFAT وFAT32 للأقراص المتنقلة، علمًا بأن FAT32 لا يقبل ملفًا أكبر من 4 GB.`, `For the system to use a drive it is split into ${tm("Partition")}s, and each partition is formatted with a ${tm("File System")}: the structure that records file names and where they sit. Well-known ones are NTFS on Windows, APFS on macOS, ext4 on Linux, and exFAT and FAT32 for portable drives; note that FAT32 cannot hold a single file larger than 4 GB.`) },
      { k: "note", kind: "warn", t: T(`حذف ملف لا يمحو محتواه فورًا: النظام يزيل سجله من الفهرس ويعلّم المساحة صالحة لإعادة الاستعمال. لذلك يمكن أحيانًا استرجاع الملفات المحذوفة حتى تُكتب بيانات جديدة فوقها. وعند بيع جهاز أو التخلص منه استعمل أداة الإعادة الآمنة أو التشفير.`, `Deleting a file does not erase its content immediately: the system removes its entry from the index and marks the space as reusable. That is why deleted files can sometimes be recovered until new data overwrites them. When selling or discarding a device, use a secure reset tool or encryption.`) },

      { k: "h", t: T(`تخزين خارجي وسحابي ونسخ احتياطي`, `External, cloud and backup storage`) },
      { k: "ul", items: [
        T(`<strong>الأقراص الخارجية وذاكرات USB:</strong> مناسبة للنقل والنسخ، وتتصل عبر USB.`, `<strong>External drives and USB sticks:</strong> convenient for carrying and copying, connected over USB.`),
        T(`<strong>التخزين السحابي:</strong> ملفاتك على حواسيب مزوّد الخدمة وتصل إليها عبر الإنترنت من أي جهاز؛ هو في الحقيقة مخزن بعيد وليس «سحابة» غامضة.`, `<strong>Cloud storage:</strong> your files sit on a provider's computers and you reach them over the internet from any device; it is really a remote warehouse, not a mysterious cloud.`),
        T(`<strong>NAS:</strong> جهاز تخزين متصل بالشبكة المنزلية أو المكتبية، يشاركه عدة مستخدمين.`, `<strong>NAS:</strong> a storage device attached to a home or office network and shared by several users.`),
      ] },
      { k: "p", t: T(`ولأن أي قرص قد يتعطل، تُنصح بقاعدة ${tm("3-2-1")}: ثلاث نسخ من بياناتك، على نوعين مختلفين من الوسائط، ونسخة واحدة على الأقل خارج المكان. أما ${tm("RAID")} فيجمع عدة أقراص لتحمل عطل أحدها، لكنه ليس بديلًا عن النسخ الاحتياطي لأنه لا يحميك من الحذف بالخطأ أو الفيروسات.`, `Because any drive can fail, the ${tm("3-2-1")} rule is recommended: three copies of your data, on two different kinds of media, with at least one copy off-site. ${tm("RAID")} combines several disks so the array survives one failure, but it is not a substitute for backup, since it does not protect against accidental deletion or malware.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>تسريع جهاز قديم:</strong> استبدال HDD بـ SSD يقلص الإقلاع غالبًا من دقيقة أو أكثر إلى بضع عشرات من الثواني.`, `<strong>Reviving an old machine:</strong> swapping an HDD for an SSD often cuts boot time from a minute or more to a few tens of seconds.`),
        T(`<strong>المصورون ومحررو الفيديو:</strong> يعملون على NVMe سريع ويؤرشفون المشاريع المنتهية على HDD كبير رخيص.`, `<strong>Photographers and video editors:</strong> work on fast NVMe and archive finished projects on large, cheap HDDs.`),
        T(`<strong>مراكز البيانات:</strong> تخلط الأنواع في طبقات: SSD للبيانات الساخنة الكثيرة الطلب وHDD للبيانات الباردة.`, `<strong>Data centres:</strong> mix media in tiers: SSDs for hot, frequently used data and HDDs for cold data.`),
      ] },

      { k: "mistakes", items: [
        T(`«التخزين هو الذاكرة»: الذاكرة RAM تعمل مؤقتًا أثناء التشغيل، أما التخزين فدائم؛ وامتلاء أحدهما لا يعني امتلاء الآخر.`, `“Storage is the same as memory”: RAM works temporarily while the machine runs, whereas storage is permanent; one filling up says nothing about the other.`),
        T(`«قرصي ينقص عن المكتوب فالمصنّع يغشّ»: الفرق ناتج عن اختلاف الوحدات العشرية والثنائية، إضافة إلى مساحة النظام والأقسام.`, `“My drive is smaller than advertised, so the maker is cheating”: the gap comes from decimal versus binary units, plus space taken by the system and partitions.`),
        T(`«الحذف يمحو الملف نهائيًا»: الملف غالبًا يبقى على القرص حتى تُكتب فوقه بيانات جديدة.`, `“Deleting erases a file for good”: the file usually stays on the disk until new data is written over it.`),
        T(`«الملفات في السحابة نسخة احتياطية كافية»: خدمات المزامنة تنقل الحذف والتلف إلى كل الأجهزة، فتحتاج نسخة منفصلة غير متزامنة.`, `“Files in the cloud are a sufficient backup”: sync services propagate deletions and corruption to every device, so you also need a separate, non-synced copy.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> تريد نسخ مجلد حجمه 50 GB. كم يستغرق ذلك تقريبًا على HDD بسرعة 150 MB/s، وعلى SSD عبر SATA بسرعة 550 MB/s، وعلى NVMe بسرعة 3,500 MB/s؟ (اعتبر 1 GB = 1000 MB).`, `<strong>Calculation:</strong> you want to copy a 50 GB folder. About how long does it take on an HDD at 150 MB/s, a SATA SSD at 550 MB/s and an NVMe drive at 3,500 MB/s? (Take 1 GB = 1000 MB.)`), a: T(`<p>الحجم = 50,000 MB. على HDD: 50,000 ÷ 150 ≈ 333 ثانية، أي نحو 5.6 دقيقة. على SATA SSD: 50,000 ÷ 550 ≈ 91 ثانية. على NVMe: 50,000 ÷ 3,500 ≈ 14 ثانية. وهذه أزمنة مثالية؛ في الواقع تقل السرعة عند الملفات الصغيرة الكثيرة، وقد يحدّها القرص الآخر الذي تنسخ منه أو إليه.</p>`, `<p>Size = 50,000 MB. On the HDD: 50,000 ÷ 150 ≈ 333 s, about 5.6 minutes. On the SATA SSD: 50,000 ÷ 550 ≈ 91 s. On NVMe: 50,000 ÷ 3,500 ≈ 14 s. These are best-case times; in practice speed drops with many small files and may be capped by the other drive you copy from or to.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> لماذا يظهر قرص سعته 512 GB على النظام بنحو 477 GB؟ وهل يمكن توقع الرقم؟`, `<strong>Reasoning:</strong> why does a 512 GB drive show up as about 477 GB in the system, and can you predict the number?`), a: T(`<p>المصنّع يعدّ 512 × 1,000,000,000 = 512,000,000,000 بايت. والنظام يقسم على 1,073,741,824 (أي 2 أس 30): 512,000,000,000 ÷ 1,073,741,824 ≈ 476.8، فيعرض نحو 477. إذن القاعدة: السعة المعروضة ≈ السعة المعلنة × 0.931. وهذا هو التفسير نفسه لكل الأحجام.</p>`, `<p>The maker counts 512 × 1,000,000,000 = 512,000,000,000 bytes. The system divides by 1,073,741,824 (2 to the power 30): 512,000,000,000 ÷ 1,073,741,824 ≈ 476.8, so about 477 is displayed. The rule of thumb: displayed capacity ≈ advertised capacity × 0.931, the same explanation for every size.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اكتشف نوع قرص جهازك وحجمه ومساحته الفارغة، ثم ضع خطة نسخ احتياطي من ثلاثة أسطر.`, `<strong>Hands-on:</strong> find out the type, size and free space of your device's drive, then write a three-line backup plan.`), a: T(`<p>في Windows افتح «إدارة الأقراص» أو إعدادات التخزين وانظر خانة نوع الوسيط (SSD أو HDD)، وفي macOS افتح «معلومات النظام» ثم «التخزين». سجّل الحجم والمساحة الحرة. مثال لخطة: (1) المستندات تُزامَن تلقائيًا إلى خدمة سحابية. (2) أول كل شهر نسخة كاملة على قرص خارجي. (3) القرص الخارجي يُحفظ في مكان آخر غير مكان الجهاز. بهذا تحقق مبدأ 3-2-1 تقريبًا.</p>`, `<p>On Windows open Disk Management or the storage settings and read the media type (SSD or HDD); on macOS open System Information and then Storage. Note the size and the free space. A sample plan: (1) documents sync automatically to a cloud service; (2) on the first of each month, make a full copy to an external drive; (3) keep that drive somewhere other than where the computer sits. This roughly satisfies the 3-2-1 rule.</p>`) },

      { k: "summary", items: [
        T(`التخزين دائم وكبير وأبطأ، والذاكرة RAM مؤقتة وسريعة وصغيرة.`, `Storage is permanent, large and slower; RAM is temporary, fast and small.`),
        T(`HDD يعتمد على الحركة الميكانيكية، وSSD وNVMe على رقائق Flash، وNVMe هو الأسرع لاتصاله بـ PCIe.`, `HDDs rely on mechanical motion; SSDs and NVMe drives use flash chips, and NVMe is fastest because it connects over PCIe.`),
        T(`السعة المعروضة أقل من المعلنة بسبب الوحدات، ويحتاج القرص إلى أقسام ونظام ملفات.`, `Displayed capacity is lower than advertised because of units, and a drive needs partitions and a file system.`),
        T(`النسخ الاحتياطي ضرورة، وقاعدة 3-2-1 نقطة بداية جيدة.`, `Backup is a necessity, and the 3-2-1 rule is a good starting point.`),
      ], next: T(`اللوحة الأم Motherboard: نرى كيف تتصل كل هذه المكوّنات ببعضها.`, `The Motherboard: we see how all these components are wired to each other.`) },
    ],
  },

  // ───────────────────────── com-07 ─────────────────────────
  {
    id: "com-07",
    body: [
      { k: "objectives", items: [
        T(`تحدد المكوّنات الرئيسية على ${tm("Motherboard")} وتشرح وظيفة كل منها.`, `Identify the main parts on a ${tm("Motherboard")} and explain what each does.`),
        T(`تفهم ${tm("Chipset")} و${tm("PCIe")} وكيف تنتقل البيانات بين المكوّنات.`, `Understand the ${tm("Chipset")} and ${tm("PCIe")} and how data travels between components.`),
        T(`تتحقق من توافق المعالج والذاكرة وحجم اللوحة قبل شراء قطعة أو ترقيتها.`, `Check processor, memory and board-size compatibility before buying or upgrading a part.`),
      ] },
      { k: "prereq", items: [T(`دروس المعالج والذاكرة والتخزين (com-04 إلى com-06).`, `The CPU, RAM and storage lessons (com-04 to com-06).`)] },
      { k: "h", t: T(`مقدمة: الهيكل الذي يجمع كل شيء`, `Introduction: the structure that joins everything`) },
      { k: "p", t: T(`المعالج والذاكرة والتخزين وبطاقة الرسوميات قطع منفصلة، فكيف تعمل كفريق؟ الجواب في ${tm("Motherboard")} أو اللوحة الأم: لوحة دوائر مطبوعة كبيرة تحمل المقابس والمنافذ، وتمدّ بينها مسارات نحاسية دقيقة تنقل البيانات والطاقة. إن كان الجهاز جسدًا فاللوحة الأم هي الجهاز العصبي والهيكل معًا.`, `The processor, memory, storage and graphics card are separate parts, so how do they work as a team? The answer is the ${tm("Motherboard")}: a large printed circuit board that carries the sockets and ports and runs fine copper traces between them for data and power. If a computer were a body, the motherboard would be its skeleton and nervous system at once.`) },
      { k: "p", t: T(`وهي لا تفكر بنفسها، لكن اختيارها يحدد ما يمكنك تركيبه اليوم، وما يمكنك ترقيته غدًا.`, `It does no thinking of its own, but choosing it decides what you can install today and what you can upgrade tomorrow.`) },

      { k: "h", t: T(`خريطة اللوحة: ما الموجود عليها؟`, `Map of the board: what is on it?`) },
      { k: "diagram", title: T(`المكوّنات الأساسية على لوحة أم لحاسوب مكتبي`, `Core parts on a desktop motherboard`), rows: [
        { label: T(`مقبس المعالج (Socket)`, `CPU socket`), sub: T(`يثبّت المعالج ويوصله بباقي اللوحة، ويحدد الأجيال المدعومة`, `holds the CPU and wires it to the board; it decides which generations fit`) },
        { label: T(`فتحات الذاكرة (DIMM)`, `Memory slots (DIMM)`), sub: T(`تستقبل شرائح RAM، وعددها عادة 2 أو 4`, `take the RAM sticks, usually 2 or 4 of them`) },
        { label: T(`فتحات التوسعة PCIe`, `PCIe expansion slots`), sub: T(`لبطاقة الرسوميات وبطاقات الشبكة والصوت`, `for the graphics card and network or sound cards`) },
        { label: T(`فتحات M.2 ومنافذ SATA`, `M.2 slots and SATA ports`), sub: T(`لتوصيل أقراص SSD وHDD`, `connect SSDs and HDDs`) },
        { label: T(`الشريحة Chipset`, `Chipset`), sub: T(`تنسق حركة البيانات للأجهزة الطرفية وتوفر مسارات إضافية`, `coordinates traffic for peripherals and provides extra lanes`) },
        { label: T(`VRM ومنافذ الطاقة`, `VRM and power connectors`), sub: T(`يحوّل جهد 12 فولت إلى ما يناسب المعالج، قرابة فولت واحد`, `converts 12 V into what the CPU wants, around 1 V`) },
        { label: T(`شريحة Firmware`, `Firmware chip`), sub: T(`تحمل UEFI أو BIOS الذي يبدأ الإقلاع`, `holds the UEFI or BIOS that starts the boot`) },
        { label: T(`المنافذ الخلفية`, `Rear I/O panel`), sub: T(`USB وشبكة وصوت وشاشة`, `USB, network, audio and display ports`) },
      ] },
      { k: "p", t: T(`<strong>المقبس</strong> مادي بالكامل: لكل عائلة معالجات مقبس خاص، وبعضها يستعمل دبابيس في المعالج (PGA) وبعضها في اللوحة (LGA)، فلا يركّب معالج في مقبس غير مصمم له. وأما <strong>VRM</strong> (Voltage Regulator Module) فهو مجموعة ملفات ومكثفات ومحوّلات تعطي المعالج جهدًا مستقرًا؛ لهذا تحمل اللوحات القوية مشتتات حرارة فوقه.`, `The <strong>socket</strong> is entirely physical: each processor family has its own, with pins on either the CPU (PGA) or the board (LGA), so a processor cannot be fitted into a socket it was not designed for. The <strong>VRM</strong> (Voltage Regulator Module) is a group of coils, capacitors and converters that gives the CPU a steady voltage; powerful boards carry heatsinks over it for that reason.`) },
      { k: "p", t: T(`وهناك بطارية صغيرة قرصية CR2032 بجهد 3 فولت تحفظ إعدادات الساعة والـ Firmware عند فصل الكهرباء. إن عاد جهازك قديمًا إلى تاريخ خاطئ بعد كل إطفاء، فالبطارية غالبًا فارغة.`, `A small coin-cell CR2032 battery at 3 V keeps the clock and firmware settings alive when the power is cut. If an older machine keeps resetting to a wrong date after every shutdown, that battery is probably flat.`) },

      { k: "h", t: T(`المسارات والشريحة: كيف تنتقل البيانات`, `Lanes and the chipset: how data travels`) },
      { k: "p", t: T(`تسمى المسارات الكهربائية التي تحمل البيانات ${tm("Bus")}. أهمها ${tm("PCIe")} (PCI Express)، وتتكون من «مسارات» ${tm("Lane")} كل منها خط اتصال مزدوج الاتجاه. يُكتب عدد المسارات هكذا: x1 وx4 وx16. فبطاقة الرسوميات تأخذ عادة x16، وقرص NVMe يأخذ x4. وكل جيل جديد يضاعف تقريبًا سرعة المسار: نحو 1 GB/s لكل مسار في PCIe 3.0، ونحو 2 GB/s في PCIe 4.0، ونحو 4 GB/s في PCIe 5.0 (في كل اتجاه).`, `The electrical pathways that carry data are called a ${tm("Bus")}. The most important is ${tm("PCIe")} (PCI Express), made of ${tm("Lane")}s, each a two-way link. The lane count is written x1, x4, x16. A graphics card usually takes x16 and an NVMe drive takes x4. Each new generation roughly doubles per-lane speed: about 1 GB/s per lane on PCIe 3.0, about 2 GB/s on PCIe 4.0 and about 4 GB/s on PCIe 5.0 (in each direction).`) },
      { k: "p", t: T(`في اللوحات الحديثة تتصل الذاكرة وفتحة الرسوميات الرئيسية وأحيانًا قرص NVMe بالمعالج مباشرة، لأنها تحتاج أقل زمن تأخير. أما باقي الأجهزة (منافذ USB وSATA والشبكة وفتحات إضافية) فتمر عبر الـ ${tm("Chipset")} الذي يرتبط بدوره بالمعالج بوصلة واحدة سريعة. فالـ Chipset أشبه بمحوّل مرور يجمع الطرق الفرعية في طريق رئيسي.`, `On modern boards the memory, the main graphics slot and sometimes an NVMe drive connect straight to the CPU, because they need the lowest latency. Everything else (USB and SATA ports, networking, extra slots) goes through the ${tm("Chipset")}, which itself links to the processor with one fast connection. The chipset is like a traffic interchange that merges side roads into a main highway.`) },
      { k: "flow", title: T(`مسار القراءة من قرص NVMe إلى المعالج`, `Path of a read from an NVMe drive to the CPU`), steps: [
        { label: T(`القرص في فتحة M.2`, `Drive in the M.2 slot`), sub: T(`يرسل البيانات عبر 4 مسارات PCIe`, `sends data over 4 PCIe lanes`) },
        { label: T(`مسارات اللوحة`, `Board traces`), sub: T(`نحاس مطبوع داخل طبقات اللوحة`, `copper printed inside the board layers`) },
        { label: T(`المعالج`, `The CPU`), sub: T(`يستقبلها مباشرة أو عبر Chipset`, `receives it directly or via the chipset`) },
        { label: T(`الذاكرة RAM`, `RAM`), sub: T(`تُنسخ البيانات إلى الذاكرة ليعمل عليها المعالج`, `the data is copied into memory for the CPU to work on`) },
      ] },

      { k: "h", t: T(`أحجام اللوحات والتوافق`, `Board sizes and compatibility`) },
      { k: "p", t: T(`يسمى حجم اللوحة وترتيب فتحات تثبيتها ${tm("Form Factor")}، ويجب أن يطابق حجم صندوق الجهاز (Case).`, `A board's size and the layout of its mounting holes are called its ${tm("Form Factor")}, and it must match the computer case.`) },
      { k: "table", head: [T(`الحجم`, `Form factor`), T(`الأبعاد التقريبية`, `Approx. size`), T(`فتحات PCIe النموذجية`, `Typical PCIe slots`), T(`الاستعمال`, `Use`)], rows: [
        [T(`ATX`, `ATX`), T(`305 × 244 ملم`, `305 × 244 mm`), T(`حتى 7`, `up to 7`), T(`حواسيب مكتبية كاملة التوسعة`, `full-expansion desktops`)],
        [T(`Micro-ATX`, `Micro-ATX`), T(`244 × 244 ملم`, `244 × 244 mm`), T(`حتى 4`, `up to 4`), T(`توازن بين السعر والحجم`, `a balance of price and size`)],
        [T(`Mini-ITX`, `Mini-ITX`), T(`170 × 170 ملم`, `170 × 170 mm`), T(`فتحة واحدة`, `1`), T(`حواسيب صغيرة الحجم`, `compact builds`)],
      ] },
      { k: "p", t: T(`قبل شراء أي قطعة افحص ثلاثة أشياء: (1) <strong>المقبس والـ Chipset</strong>: هل تدعم اللوحة هذا المعالج؟ ومن أحيانًا تحتاج تحديث Firmware لدعم معالج أحدث. (2) <strong>جيل الذاكرة</strong>: DDR4 وDDR5 غير قابلتين للتبادل، فشق شريحة الذاكرة في مكان مختلف ولن تدخل في الفتحة الخطأ. (3) <strong>الحجم</strong>: هل تناسب اللوحة الصندوق؟ وهل توصيلات مزود الطاقة كافية، مثل موصل اللوحة الرئيسي ذي 24 دبوسًا وموصل المعالج ذي 8 دبابيس؟`, `Before buying any part check three things: (1) <strong>socket and chipset</strong>: does the board support this processor? Sometimes a firmware update is needed for a newer CPU. (2) <strong>memory generation</strong>: DDR4 and DDR5 are not interchangeable, and the notch on the stick sits in a different place so it will not fit the wrong slot. (3) <strong>size</strong>: does the board fit the case, and does the power supply have the right connectors, such as the 24-pin main connector and the 8-pin CPU connector?`) },
      { k: "note", kind: "tip", t: T(`قبل ترقية جهاز جاهز ابحث عن اسم طراز اللوحة الأم في أداة معلومات النظام، ثم افتح صفحة مواصفاتها لدى المصنّع؛ فهي تذكر قائمة المعالجات والذاكرات المدعومة بالضبط.`, `Before upgrading a prebuilt machine, find the motherboard model name in the system information tool and open its specification page from the manufacturer; it lists exactly which processors and memory it supports.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>بناء حاسوب:</strong> يبدأ المجمّعون باختيار المعالج ثم اللوحة المطابقة، لأن اللوحة تحدد باقي القطع.`, `<strong>Building a PC:</strong> builders start from the processor and then pick the matching board, because the board constrains the other parts.`),
        T(`<strong>الحواسيب المحمولة والهواتف:</strong> تُدمج معظم المكوّنات على لوحة واحدة، ولذلك يصعب ترقيتها بخلاف المكتبي.`, `<strong>Laptops and phones:</strong> most components are integrated on a single board, which is why they are hard to upgrade compared with a desktop.`),
        T(`<strong>الإصلاح:</strong> أعطال مثل عدم التشغيل أو إعادة التشغيل العشوائي غالبًا تعود إلى مزود الطاقة أو بطارية CMOS أو VRM قبل المعالج نفسه.`, `<strong>Repair:</strong> faults such as no power or random restarts often trace back to the power supply, the CMOS battery or the VRM before the processor itself.`),
      ] },

      { k: "mistakes", items: [
        T(`«أي معالج يعمل على أي لوحة»: لا بد أن يطابق مقبس المعالج واللوحة، وأن يكون الـ Chipset والـ Firmware داعمين له.`, `“Any processor works on any board”: the socket must match, and the chipset and firmware must support it.`),
        T(`«الأغلى لوحة هي الأسرع»: اللوحة لا تضيف سرعة بنفسها؛ تعطيك مزايا أكثر مثل الفتحات والمنافذ ومرحلة طاقة أقوى، أما السرعة فمصدرها المعالج والذاكرة والقرص.`, `“A pricier board is faster”: the board adds no speed by itself; it gives you more features such as slots, ports and a stronger power stage, while speed comes from the CPU, memory and drive.`),
        T(`«الفتحة الطويلة تعني دائمًا سرعة x16»: قد تكون فتحة بطول x16 لكنها موصولة بـ x4 فقط، ويُكتب ذلك في دليل اللوحة.`, `“A long slot always runs at x16”: a physically x16 slot may be wired for only x4, which the board manual states.`),
        T(`«DDR4 وDDR5 تتبادلان إن تحايلت على الشريحة»: التصميم الميكانيكي والكهربائي يختلف، والإدخال بالقوة قد يتلف الفتحة.`, `“DDR4 and DDR5 can be swapped if I force the stick”: the mechanical and electrical designs differ, and forcing it can damage the slot.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> قرص NVMe يستعمل PCIe 3.0 بأربعة مسارات (x4) بسرعة نحو 1 GB/s للمسار. ما أقصى سرعة نظرية؟ وما سرعة بطاقة رسوميات على PCIe 4.0 x16 بسرعة نحو 2 GB/s للمسار؟`, `<strong>Calculation:</strong> an NVMe drive uses PCIe 3.0 with four lanes (x4) at about 1 GB/s per lane. What is its theoretical maximum? And what does a graphics card on PCIe 4.0 x16 get at about 2 GB/s per lane?`), a: T(`<p>القرص: 4 × 1 = نحو 4 GB/s (الرقم الفعلي أقل قليلًا، حوالي 3.9، بسبب الحمل الإضافي في البروتوكول، وهذا ما يفسر سقف الأقراص عند نحو 3,500 MB/s). البطاقة: 16 × 2 = نحو 32 GB/s في كل اتجاه. أي أن وصلة البطاقة أسرع بنحو ثماني مرات من وصلة القرص.</p>`, `<p>The drive: 4 × 1 = about 4 GB/s (the real figure is a little lower, around 3.9, because of protocol overhead, which explains why such drives top out near 3,500 MB/s). The card: 16 × 2 = about 32 GB/s in each direction. So the graphics link is roughly eight times wider and faster than the drive link.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> عندك لوحة Micro-ATX وصندوق ATX، وتريد شراء لوحة أصغر لاحقًا لجهاز مكتبي صغير. ما الذي تتحقق منه؟`, `<strong>Reasoning:</strong> you own a Micro-ATX board and an ATX case, and later want a smaller board for a compact desktop. What do you check?`), a: T(`<p>الصناديق الأكبر تقبل عادة اللوحات الأصغر منها لأن فتحات التثبيت متوافقة، فيعمل Micro-ATX داخل صندوق ATX، لكن العكس غير صحيح. وللجهاز الصغير تحتاج صندوقًا يقبل Mini-ITX، وتتحقق أيضًا من أن المعالج الحالي يناسب مقبس اللوحة الجديدة، وأن عدد فتحات الذاكرة والأقراص يكفي، لأن Mini-ITX عادة تقتصر على فتحتي ذاكرة وفتحة PCIe واحدة.</p>`, `<p>Larger cases normally accept smaller boards because the mounting holes are compatible, so Micro-ATX works inside an ATX case, but not the other way round. For the compact build you need a case that takes Mini-ITX, and you should also check that your current processor fits the new board's socket and that the number of memory and drive slots is enough, since Mini-ITX usually has just two memory slots and a single PCIe slot.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اعرف طراز اللوحة الأم في جهازك ونوع ذاكرته وعدد فتحاتها.`, `<strong>Hands-on:</strong> find your device's motherboard model, its memory type and how many memory slots it has.`), a: T(`<p>في Windows اضغط مفتاح Windows مع R واكتب <code>msinfo32</code> ثم اقرأ «الشركة المصنعة للوحة الأساسية» و«المنتج». يمكنك أيضًا فتح مدير المهام وتبويب الأداء ثم الذاكرة لترى النوع (DDR4 أو DDR5) وعدد الفتحات المستعملة. على macOS افتح «حول هذا الـ Mac» ثم «تقرير النظام». سجّل الطراز وافتح صفحة مواصفاته لدى المصنّع للتحقق من أقصى ذاكرة يدعمها.</p>`, `<p>On Windows press the Windows key with R and type <code>msinfo32</code>, then read the baseboard manufacturer and product entries. You can also open Task Manager, the Performance tab and then Memory to see the type (DDR4 or DDR5) and slots in use. On macOS open About This Mac and then System Report. Record the model and open its specification page from the manufacturer to check the maximum memory it supports.</p>`) },

      { k: "summary", items: [
        T(`اللوحة الأم تحمل المقابس والفتحات وتمدّ المسارات التي تصل المكوّنات ببعضها.`, `The motherboard carries the sockets and slots and runs the traces that connect components.`),
        T(`PCIe يمثل المسارات السريعة، ويحدد عدد المسارات وجيلها السرعة، ويوزع الـ Chipset الأجهزة الطرفية.`, `PCIe provides the fast lanes, lane count and generation set the speed, and the chipset distributes peripherals.`),
        T(`التوافق يعتمد على المقبس وجيل الذاكرة والحجم ومزود الطاقة.`, `Compatibility depends on socket, memory generation, size and the power supply.`),
        T(`اللوحة لا تزيد السرعة بذاتها، لكنها تحدد إمكانيات الترقية.`, `The board adds no speed itself, but it sets your upgrade options.`),
      ], next: T(`بطاقة الرسوميات GPU: المكوّن الذي يرسم الصورة ويتفوق في الحسابات المتوازية.`, `The Graphics Card (GPU): the component that draws the picture and excels at parallel computation.`) },
    ],
  },

  // ───────────────────────── com-08 ─────────────────────────
  {
    id: "com-08",
    body: [
      { k: "objectives", items: [
        T(`تشرح الفرق بين ${tm("GPU")} و${tm("CPU")} من حيث التصميم والمهام.`, `Explain how a ${tm("GPU")} differs from a ${tm("CPU")} in design and in tasks.`),
        T(`تفرّق بين الرسوميات المدمجة والمنفصلة وتفهم دور ${tm("VRAM")}.`, `Distinguish integrated from dedicated graphics and understand the role of ${tm("VRAM")}.`),
        T(`تحسب عدد البكسلات والزمن المتاح لكل إطار، وتعرف استعمالات GPU غير الألعاب.`, `Calculate pixel counts and the time budget per frame, and know uses of a GPU beyond games.`),
      ] },
      { k: "prereq", items: [T(`دروس المعالج CPU (com-04) واللوحة الأم (com-07).`, `The CPU (com-04) and motherboard (com-07) lessons.`)] },
      { k: "h", t: T(`مقدمة: لماذا نحتاج معالجًا ثانيًا؟`, `Introduction: why a second processor?`) },
      { k: "p", t: T(`شاشة بدقة Full HD تحتوي نحو مليوني نقطة ضوئية، ويجب تحديد لون كل منها عشرات المرات في الثانية. لو كُلّف المعالج الرئيسي بذلك وحده لانشغل به عن بقية عمل النظام. لهذا وُجدت ${tm("GPU")} (Graphics Processing Unit)، وهي معالج متخصص في إنتاج الصورة، يعمل جنبًا إلى جنب مع CPU.`, `A Full HD screen holds about two million pixels, and the colour of each must be decided dozens of times per second. If the main processor did that alone it would have no time left for the rest of the system. That is why the ${tm("GPU")} (Graphics Processing Unit) exists: a processor specialised in producing the image, working beside the CPU.`) },
      { k: "p", t: T(`ليست GPU «معالجًا أقوى»، بل معالجًا مختلف التصميم. ${tm("CPU")} مثل مجموعة قليلة من الخبراء ينجزون مهامًا معقدة متتابعة، و GPU مثل آلاف العمال البسطاء ينفذون العملية البسيطة نفسها في وقت واحد على بيانات كثيرة.`, `A GPU is not a “stronger processor” but one with a different design. A ${tm("CPU")} is like a few experts who finish complex tasks one after another; a GPU is like thousands of simple workers each doing the same simple operation at the same time on lots of data.`) },

      { k: "h", t: T(`تصميم يعتمد على التوازي`, `A design built on parallelism`) },
      { k: "table", head: [T(`الخاصية`, `Property`), T(`CPU`, `CPU`), T(`GPU`, `GPU`)], rows: [
        [T(`عدد الأنوية`, `Number of cores`), T(`بضع إلى عشرات الأنوية القوية`, `a handful to dozens of powerful cores`), T(`آلاف الأنوية الأبسط`, `thousands of simpler cores`)],
        [T(`الأفضل في`, `Best at`), T(`منطق معقد وقرارات وتفرعات`, `complex logic, decisions and branching`), T(`حسابات متكررة على كمٍّ ضخم من البيانات`, `repetitive maths over huge amounts of data`)],
        [T(`الذاكرة`, `Memory`), T(`RAM النظام`, `system RAM`), T(`ذاكرة خاصة VRAM ذات نطاق عريض`, `its own high-bandwidth VRAM`)],
        [T(`مثال`, `Example`), T(`تشغيل نظام التشغيل وتنفيذ برنامج`, `running the OS and application logic`), T(`حساب لون كل بكسل في الصورة`, `computing the colour of every pixel`)],
      ] },
      { k: "p", t: T(`تصلح هذه الفكرة للرسوميات لأن لون كل بكسل لا يعتمد غالبًا على بكسل مجاور، فيمكن حسابها كلها في آن واحد. ويسمى هذا النوع من المسائل ${tm("Data Parallelism")}.`, `This works for graphics because the colour of each pixel rarely depends on its neighbour, so all of them can be computed at once. That kind of problem is called ${tm("Data Parallelism")}.`) },

      { k: "h", t: T(`كيف تُرسم الصورة؟`, `How is an image drawn?`) },
      { k: "flow", title: T(`مسار الرسوميات المبسط لإطار واحد`, `Simplified graphics pipeline for one frame`), steps: [
        { label: T(`وصف المشهد`, `Scene description`), sub: T(`يرسل البرنامج عبر CPU مجسمات ثلاثية الأبعاد كمجموعة نقاط (رؤوس) ومثلثات`, `through the CPU, the program sends 3D objects as points (vertices) and triangles`) },
        { label: T(`معالجة الرؤوس`, `Vertex processing`), sub: T(`تحسب GPU موقع كل رأس على الشاشة بحسب زاوية الكاميرا`, `the GPU works out each vertex's place on screen from the camera angle`) },
        { label: T(`التحويل إلى بكسلات (Rasterization)`, `Rasterization`), sub: T(`تُحوَّل المثلثات إلى نقاط ضوئية`, `triangles are turned into pixels`) },
        { label: T(`التظليل (Shading)`, `Shading`), sub: T(`يحسب لون كل بكسل بحسب الإضاءة والخامة`, `each pixel's colour is computed from lighting and texture`) },
        { label: T(`الإخراج`, `Output`), sub: T(`يُكتب الإطار في ذاكرة الإطار ثم يُرسل إلى الشاشة`, `the frame is written to the frame buffer and sent to the display`) },
      ] },
      { k: "p", t: T(`تتم هذه الخطوات بتطبيقات برمجية مسماة ${tm("Graphics API")} مثل DirectX وVulkan وOpenGL وMetal، تتولى الربط بين اللعبة وبين تعريفات الجهاز. وتكتب برامج صغيرة تسمى ${tm("Shader")} تُنفَّذ على آلاف الأنوية معًا.`, `These steps are driven through software interfaces called a ${tm("Graphics API")}, such as DirectX, Vulkan, OpenGL and Metal, which connect the game to the device's drivers. Developers write small programs called a ${tm("Shader")} that run on thousands of cores at once.`) },

      { k: "h", t: T(`مدمجة أم منفصلة؟ ودور VRAM`, `Integrated or dedicated? And the role of VRAM`) },
      { k: "p", t: T(`${tm("Integrated GPU")} جزء من شريحة المعالج نفسها وتستعمل RAM النظام، وهي كافية لتصفح الويب والفيديو والمكتب وألعاب خفيفة، وتوفر الطاقة والحرارة. أما ${tm("Dedicated GPU")} فبطاقة مستقلة تركّب في فتحة PCIe على اللوحة الأم ولها ذاكرتها ${tm("VRAM")} ومبرّدها وتغذيتها الكهربائية؛ تعطي أداءً أعلى لكن تستهلك طاقة وتحتاج مساحة وتبريدًا.`, `An ${tm("Integrated GPU")} is part of the processor chip itself and shares system RAM; it is enough for web browsing, video, office work and light games, and it saves power and heat. A ${tm("Dedicated GPU")} is a separate card that plugs into a PCIe slot on the motherboard and has its own ${tm("VRAM")}, cooler and power feed; it gives higher performance but uses more power and needs space and cooling.`) },
      { k: "p", t: T(`تحتفظ VRAM بالخامات (Textures) وبيانات المشهد وذاكرة الإطار. فإن امتلأت اضطرت البطاقة إلى استعارة RAM النظام عبر PCIe الأبطأ بكثير، فيحدث تقطّع واضح. ولذلك تُهم سعة VRAM عند اللعب بدقة عالية أو العمل على نماذج ثلاثية الأبعاد كبيرة.`, `VRAM holds textures, scene data and the frame buffer. When it fills up the card has to borrow system RAM across the much slower PCIe link, which causes visible stutter. That is why VRAM size matters for high-resolution gaming or large 3D models.`) },
      { k: "note", kind: "info", t: T(`لا تعتمد GPU على نفس ساعة CPU ولا تقاس مثله. لا تقارن بين بطاقتين بعدد الأنوية فقط؛ فبنى الأنوية تختلف بين الشركات والأجيال، والأصح مراجعة اختبارات الأداء في العمل الذي يهمك.`, `A GPU's clock and cores cannot be measured the way a CPU's are. Do not compare two cards by core count alone; core designs differ between vendors and generations, so look at benchmarks for the work you care about.`) },

      { k: "h", t: T(`أبعد من الألعاب: الحوسبة العامة على GPU`, `Beyond games: general-purpose GPU computing`) },
      { k: "p", t: T(`لأن GPU تنفذ عمليات حسابية كثيرة متوازية فقد استُعملت في مجالات لا علاقة لها بالرسم، ويسمى ذلك ${tm("GPGPU")}، عبر منصات مثل CUDA وOpenCL. أبرز استعمالاتها اليوم تدريب نماذج الذكاء الاصطناعي، لأن التدريب يقوم على ضرب مصفوفات ضخمة. وتستعمل كذلك في المحاكاة العلمية وتحرير الفيديو وفك التشفير والتنقيب عن العملات المشفرة. وتحوي معظم البطاقات دوائر مخصصة لترميز الفيديو وفك ترميزه تخفف العبء عن CPU.`, `Because a GPU runs so many calculations in parallel, it has been put to work on tasks unrelated to drawing, a practice known as ${tm("GPGPU")}, through platforms such as CUDA and OpenCL. Its best-known use today is training artificial-intelligence models, since training is built on multiplying huge matrices. It is also used in scientific simulation, video editing, and cryptographic workloads. Most cards also have dedicated circuits for video encoding and decoding that relieve the CPU.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>الألعاب:</strong> تحدد البطاقة الدقة ومعدل الإطارات وجودة الإضاءة.`, `<strong>Gaming:</strong> the card sets the resolution, frame rate and lighting quality.`),
        T(`<strong>التصميم والمونتاج:</strong> برامج الرسم ثلاثي الأبعاد والمونتاج تسرّع المعاينة والتصدير باستعمال GPU.`, `<strong>Design and editing:</strong> 3D and video-editing software use the GPU to speed up preview and export.`),
        T(`<strong>الذكاء الاصطناعي:</strong> مراكز بيانات تضم آلاف الـ GPU لتدريب النماذج.`, `<strong>Artificial intelligence:</strong> data centres house thousands of GPUs to train models.`),
        T(`<strong>الهواتف:</strong> رقاقة الهاتف تضم GPU صغيرة ترسم الواجهة والألعاب بأقل طاقة.`, `<strong>Phones:</strong> the phone chip includes a small GPU that draws the interface and games on minimal power.`),
      ] },

      { k: "mistakes", items: [
        T(`«GPU تعني بطاقة ألعاب فقط»: تستعملها الواجهة الرسومية وتصفح الويب والمونتاج والذكاء الاصطناعي، وكل جهاز له شاشة فيه GPU ما.`, `“A GPU is just a gaming card”: the desktop interface, web browsing, editing and AI all use it, and every device with a display has some GPU.`),
        T(`«GPU أقوى من CPU في كل شيء»: GPU ضعيفة في المنطق المتتابع المعقد، ولا تغني عن CPU؛ كلاهما يكمل الآخر.`, `“A GPU beats a CPU at everything”: a GPU is poor at complex sequential logic and cannot replace the CPU; each complements the other.`),
        T(`«الذاكرة الأكبر تعني بطاقة أسرع»: VRAM تمنع التقطع عند امتلائها فقط، لكن سرعة البطاقة تتحدد بعدد الأنوية وتصميمها ونطاق الذاكرة.`, `“More memory means a faster card”: VRAM only prevents stutter when it would otherwise fill up; card speed is set by cores, architecture and memory bandwidth.`),
        T(`«ترقية GPU وحدها ترفع أداء أي جهاز»: قد يصبح المعالج أو ضعف مزود الطاقة هو عنق الزجاجة.`, `“Upgrading only the GPU speeds up any computer”: the CPU may become the bottleneck, or the power supply may be too weak.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> كم بكسلًا في شاشة 1920×1080؟ وكم في شاشة 4K بدقة 3840×2160؟ وكم بكسلًا تحتاج GPU إلى إنتاجها في الثانية عند 60 إطارًا في الثانية على كل منهما؟`, `<strong>Calculation:</strong> how many pixels are on a 1920×1080 screen? On a 4K screen at 3840×2160? And how many pixels per second must the GPU produce at 60 frames per second on each?`), a: T(`<p>1920 × 1080 = 2,073,600 بكسل. و3840 × 2160 = 8,294,400 بكسل، أي أربعة أضعاف بالضبط. عند 60 إطارًا: 2,073,600 × 60 ≈ 124.4 مليون بكسل في الثانية، وللـ 4K: 8,294,400 × 60 ≈ 497.7 مليون بكسل في الثانية. لهذا يثقل رفع الدقة على البطاقة حتى لو لم تتغير اللعبة.</p>`, `<p>1920 × 1080 = 2,073,600 pixels. 3840 × 2160 = 8,294,400 pixels, exactly four times as many. At 60 frames: 2,073,600 × 60 ≈ 124.4 million pixels per second, and for 4K: 8,294,400 × 60 ≈ 497.7 million pixels per second. This is why raising the resolution burdens the card even when the game does not change.</p>`) },
      { k: "ex", q: T(`<strong>حساب واستدلال:</strong> كم ميلي ثانية تتاح لإنتاج كل إطار عند 60 و144 إطارًا في الثانية؟ وكم يحتاج إطار 4K واحد من الذاكرة إن خُزّن كل بكسل في 4 بايت؟`, `<strong>Calculation and reasoning:</strong> how many milliseconds are available per frame at 60 and at 144 frames per second? And how much memory does one 4K frame need if each pixel is stored in 4 bytes?`), a: T(`<p>عند 60: 1000 ÷ 60 ≈ 16.7 ميلي ثانية للإطار. عند 144: 1000 ÷ 144 ≈ 6.9 ميلي ثانية، أي أقل من نصف الزمن، فيجب أن تكون الحسابات أسرع بكثير. حجم إطار 4K: 8,294,400 × 4 = 33,177,600 بايت، أي نحو 33 MB. وتحتفظ البطاقة بعدة إطارات مع الخامات، لذلك تحتاج إلى VRAM بسعة كبيرة.</p>`, `<p>At 60: 1000 ÷ 60 ≈ 16.7 ms per frame. At 144: 1000 ÷ 144 ≈ 6.9 ms, less than half the time, so the computation must be much faster. A 4K frame: 8,294,400 × 4 = 33,177,600 bytes, about 33 MB. The card keeps several frames alongside the textures, which is why it needs plenty of VRAM.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اعرف اسم GPU في جهازك، وهل هي مدمجة أم منفصلة، وكم VRAM فيها، وراقب استعمالها أثناء تشغيل فيديو.`, `<strong>Hands-on:</strong> find your GPU's name, whether it is integrated or dedicated, how much VRAM it has, and watch its usage while a video plays.`), a: T(`<p>في Windows افتح مدير المهام ثم الأداء ثم GPU: ترى الاسم والذاكرة المخصصة (VRAM) والمشتركة (من RAM النظام). إن ظهرت ذاكرة مشتركة فقط فهي غالبًا مدمجة. يمكنك استعمال <code>dxdiag</code> أيضًا. في macOS افتح «حول هذا الـ Mac». شغّل فيديو بدقة عالية وراقب خانة «Video Decode» أو الاستعمال العام: سترى ارتفاعًا طفيفًا لأن فك الترميز يعالج في GPU، بينما يبقى استعمال CPU منخفضًا.</p>`, `<p>On Windows open Task Manager, then Performance, then GPU: you see the name plus dedicated memory (VRAM) and shared memory (from system RAM). If only shared memory appears, it is probably integrated. You can also use <code>dxdiag</code>. On macOS open About This Mac. Play a high-resolution video and watch the Video Decode entry or overall usage: you will see a slight rise because decoding runs on the GPU, while CPU usage stays low.</p>`) },

      { k: "summary", items: [
        T(`GPU معالج متخصص بآلاف الأنوية البسيطة لتنفيذ عمليات متوازية.`, `A GPU is a specialised processor with thousands of simple cores for parallel operations.`),
        T(`المدمجة تشارك RAM مع المعالج، والمنفصلة لها VRAM وفتحة PCIe خاصة.`, `Integrated GPUs share RAM with the processor; dedicated ones have their own VRAM and a PCIe slot.`),
        T(`الدقة ومعدل الإطارات يحددان حجم العمل، وكل زيادة فيهما تضاعف الحساب.`, `Resolution and frame rate set the workload, and each increase multiplies the computation.`),
        T(`تُستعمل GPU اليوم في الذكاء الاصطناعي والحوسبة العلمية إلى جانب الرسوميات.`, `GPUs today serve AI and scientific computing as well as graphics.`),
      ], next: T(`أجهزة الإدخال والإخراج: كيف يتصل الإنسان بكل هذه الآلة.`, `Input and Output Devices: how a person connects to all this machinery.`) },
    ],
  },

  // ───────────────────────── com-09 ─────────────────────────
  {
    id: "com-09",
    body: [
      { k: "objectives", items: [
        T(`تصنّف الأجهزة إلى ${tm("Input")} و${tm("Output")} وأجهزة تؤدي الدورين.`, `Classify devices as ${tm("Input")}, ${tm("Output")} or both.`),
        T(`تشرح كيف تتحول الإشارات الفيزيائية إلى بيانات رقمية والعكس، ودور ${tm("Driver")}.`, `Explain how physical signals become digital data and back, and the role of a ${tm("Driver")}.`),
        T(`تقارن المنافذ الشائعة وتحسب أحجام الصوت وأزمنة النقل.`, `Compare common ports and calculate audio sizes and transfer times.`),
      ] },
      { k: "prereq", items: [T(`درس كيف يعمل الكمبيوتر (com-02) ودرس اللوحة الأم (com-07).`, `The “How a Computer Works” (com-02) and motherboard (com-07) lessons.`)] },
      { k: "h", t: T(`مقدمة: الجسر بين الإنسان والآلة`, `Introduction: the bridge between person and machine`) },
      { k: "p", t: T(`الكمبيوتر يتعامل مع الأرقام فقط، أما أنت فتتعامل مع ضغطات وأصوات وصور وكلمات. تتولى ${tm("I/O Devices")} (أجهزة الإدخال والإخراج) الترجمة بين العالمين. ${tm("Input")} يدخل البيانات من العالم الخارجي إلى النظام، و${tm("Output")} يعيد نتائج المعالجة إلى الحواس البشرية أو إلى جهاز آخر.`, `A computer deals only in numbers, while you deal in key presses, sounds, pictures and words. ${tm("I/O Devices")} (input and output devices) translate between the two worlds. ${tm("Input")} brings data from the outside world into the system, and ${tm("Output")} sends processing results back to human senses or to another machine.`) },

      { k: "h", t: T(`تصنيف الأجهزة`, `Classifying devices`) },
      { k: "table", head: [T(`الجهاز`, `Device`), T(`الفئة`, `Category`), T(`ما يحدث`, `What happens`)], rows: [
        [T(`لوحة المفاتيح`, `Keyboard`), T(`إدخال`, `Input`), T(`ضغطة مفتاح تتحول إلى رمز رقمي`, `a key press becomes a digital code`)],
        [T(`الفأرة ولوحة اللمس`, `Mouse and touchpad`), T(`إدخال`, `Input`), T(`حركة المستشعر تتحول إلى إحداثيات`, `sensor motion becomes coordinates`)],
        [T(`الميكروفون والكاميرا`, `Microphone and camera`), T(`إدخال`, `Input`), T(`صوت وضوء يتحولان إلى أرقام`, `sound and light become numbers`)],
        [T(`الشاشة`, `Monitor`), T(`إخراج`, `Output`), T(`أرقام تتحول إلى لون كل بكسل`, `numbers become the colour of each pixel`)],
        [T(`السماعة والطابعة`, `Speaker and printer`), T(`إخراج`, `Output`), T(`إشارة رقمية تتحول إلى اهتزاز أو حبر`, `a digital signal becomes vibration or ink`)],
        [T(`شاشة اللمس وبطاقة الشبكة وذاكرة USB`, `Touchscreen, network card and USB stick`), T(`إدخال وإخراج معًا`, `Both`), T(`تستقبل البيانات وترسلها`, `they receive and send data`)],
      ] },
      { k: "note", kind: "info", t: T(`التصنيف يتعلق بالدور لا بالجهاز: القرص يعدّ مخزنًا لكنه من زاوية أخرى يقرأ ويكتب عبر قنوات إدخال وإخراج أيضًا.`, `Classification depends on the role rather than the device: a drive is called storage, yet from another angle it too reads and writes through I/O channels.`) },

      { k: "h", t: T(`من العالم الفيزيائي إلى الأرقام`, `From the physical world to numbers`) },
      { k: "p", t: T(`معظم الظواهر الفيزيائية مستمرة (تناظرية) كالصوت والضوء. ويحوّلها مكوّن يسمى ${tm("ADC")} (محوّل تناظري إلى رقمي) إلى أرقام بأخذ قياسات متكررة تسمى ${tm("Sampling")}. بالنسبة للصوت، قياس صوت CD يتم 44,100 مرة في الثانية، وكل قياس يخزن في 16 بت، ولقناتين (يمين ويسار). وفي الإخراج يحدث العكس بواسطة ${tm("DAC")} الذي يعيد الأرقام إلى جهد كهربائي يحرّك السماعة.`, `Most physical phenomena such as sound and light are continuous (analogue). A component called an ${tm("ADC")} (analogue-to-digital converter) turns them into numbers by taking repeated measurements called ${tm("Sampling")}. For sound, CD-quality audio is measured 44,100 times per second, each sample stored in 16 bits, for two channels (left and right). On the output side the reverse happens through a ${tm("DAC")}, which turns numbers back into a voltage that moves the speaker.`) },
      { k: "flow", title: T(`رحلة ضغطة مفتاح حتى ظهور الحرف`, `The journey of a key press until the letter appears`), steps: [
        { label: T(`لوحة المفاتيح`, `Keyboard`), sub: T(`المتحكم الداخلي يكتشف المفتاح المضغوط ويرسل رمزه`, `its internal controller detects the pressed key and sends its code`) },
        { label: T(`المنفذ والمقاطعة`, `Port and interrupt`), sub: T(`ينبّه الجهاز المعالج بإشارة ${tm("Interrupt")} بدل أن ينتظر المعالج`, `the device alerts the CPU with an ${tm("Interrupt")} so the CPU need not wait`) },
        { label: T(`التعريف والنظام`, `Driver and OS`), sub: T(`يفسر الـ Driver الرمز ويسلمه نظام التشغيل`, `the driver interprets the code and hands it to the operating system`) },
        { label: T(`البرنامج`, `Application`), sub: T(`يعالج البرنامج الحرف ويضيفه إلى النص`, `the program handles the character and adds it to the text`) },
        { label: T(`الشاشة`, `Display`), sub: T(`يُرسم الحرف على الشاشة`, `the character is drawn on the screen`) },
      ] },
      { k: "p", t: T(`${tm("Driver")} (التعريف) برنامج صغير يشرح لنظام التشغيل كيف يخاطب جهازًا بعينه. بوجوده تعمل أجهزة من مصنّعين مختلفين بالطريقة نفسها من منظور البرامج. أما ${tm("Interrupt")} فسبب سرعة الاستجابة: بدل أن يسأل المعالج كل جزء من الثانية «هل ضُغط مفتاح؟» (وهذا يسمى Polling) ينتظر حتى يُنبَّه فيهتم بما حدث فقط.`, `A ${tm("Driver")} is a small program that tells the operating system how to talk to one particular device; with it, devices from different makers look the same to software. An ${tm("Interrupt")} is why response is quick: instead of asking every fraction of a second “was a key pressed?” (known as polling), the CPU waits to be alerted and attends only to what happened.`) },

      { k: "h", t: T(`المنافذ والتوصيلات`, `Ports and connections`) },
      { k: "table", head: [T(`المنفذ`, `Port`), T(`الاستخدام`, `Use`), T(`ملاحظة`, `Note`)], rows: [
        [T(`USB-A وUSB-C`, `USB-A and USB-C`), T(`أجهزة طرفية وتخزين وشحن`, `peripherals, storage and charging`), T(`النوع هو شكل المنفذ، أما السرعة فتحددها نسخة USB`, `the type is the connector shape; speed depends on the USB version`)],
        [T(`HDMI وDisplayPort`, `HDMI and DisplayPort`), T(`صورة وصوت إلى الشاشة`, `video and sound to the display`), T(`الأول شائع في التلفاز والثاني في شاشات الحاسوب`, `HDMI is common on TVs, DisplayPort on computer monitors`)],
        [T(`3.5 ملم`, `3.5 mm jack`), T(`صوت تناظري`, `analogue audio`), T(`سماعات وميكروفون`, `headphones and microphone`)],
        [T(`Ethernet`, `Ethernet`), T(`شبكة سلكية`, `wired network`), T(`ثابت وسريع`, `stable and fast`)],
        [T(`Bluetooth وWi-Fi`, `Bluetooth and Wi-Fi`), T(`اتصال لاسلكي`, `wireless links`), T(`أسهل لكنه أكثر عرضة للتداخل`, `more convenient but prone to interference`)],
      ] },
      { k: "p", t: T(`تختلف سرعات USB بحسب النسخة: USB 2.0 حتى 480 ميغابت في الثانية، وUSB 3.0 حتى 5 جيجابت، وUSB 3.2 Gen 2 حتى 10 جيجابت، وUSB4 حتى 40 جيجابت. لاحظ أن الأرقام بالـ <strong>بت</strong> (حرف b صغير) وليس البايت، وكل بايت 8 بت؛ ولذلك فإن 480 Mbit/s يساوي 60 MB/s نظريًا فقط.`, `USB speeds vary with the version: USB 2.0 up to 480 megabits per second, USB 3.0 up to 5 gigabits, USB 3.2 Gen 2 up to 10 gigabits and USB4 up to 40 gigabits. Note that these figures are in <strong>bits</strong> (small b), not bytes, and a byte is 8 bits; so 480 Mbit/s is only 60 MB/s in theory.`) },
      { k: "note", kind: "warn", t: T(`قبل أن تخرج ذاكرة USB أو قرصًا خارجيًا استعمل خيار «إزالة آمنة»؛ فالنظام قد يحتفظ ببعض الكتابات في الذاكرة ولم يُنهِها بعد، فيتلف الملف إن سحبته فجأة.`, `Before unplugging a USB stick or external drive, use the safe-removal option; the system may still be holding writes in memory, and the file can be corrupted if you pull it out abruptly.`) },

      { k: "h", t: T(`خصائص تهمّك عند الاختيار`, `Specifications that matter when choosing`) },
      { k: "ul", items: [
        T(`<strong>الشاشة:</strong> الدقة (عدد البكسلات)، ومعدل التحديث بوحدة هرتز (عدد المرات التي تُحدّث فيها الصورة في الثانية)، وزمن الاستجابة، ونوع اللوحة.`, `<strong>Monitor:</strong> resolution (pixel count), refresh rate in hertz (how many times the image updates per second), response time and panel type.`),
        T(`<strong>الفأرة:</strong> قيمة DPI (نقاط لكل بوصة) تحدد مقدار حركة المؤشر مقابل حركة اليد.`, `<strong>Mouse:</strong> its DPI (dots per inch) sets how far the pointer moves for a given hand movement.`),
        T(`<strong>الطابعة:</strong> الدقة بوحدة DPI وطريقة الطباعة بالحبر أو الليزر.`, `<strong>Printer:</strong> resolution in DPI and the print method, inkjet or laser.`),
        T(`<strong>الكاميرا والميكروفون:</strong> الدقة ومعدل أخذ العينات وجودة المستشعر.`, `<strong>Camera and microphone:</strong> resolution, sampling rate and sensor quality.`),
      ] },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>إمكانية الوصول:</strong> قارئات الشاشة وأجهزة الإدخال الصوتي ولوحات برايل الإلكترونية تتيح لمن لديه إعاقة استعمال الحاسوب.`, `<strong>Accessibility:</strong> screen readers, voice input and refreshable braille displays let people with disabilities use a computer.`),
        T(`<strong>الاستشعار:</strong> الهاتف يحتوي مستشعرات للحركة والموقع والضوء، وكلها أجهزة إدخال.`, `<strong>Sensing:</strong> a phone contains motion, location and light sensors, all of which are input devices.`),
        T(`<strong>الصناعة والصحة:</strong> مستشعرات المصانع وأجهزة قياس النبض ترسل قراءات مستمرة لأنظمة المراقبة.`, `<strong>Industry and health:</strong> factory sensors and pulse monitors send continuous readings to monitoring systems.`),
      ] },

      { k: "mistakes", items: [
        T(`«الشاشة جزء من الحاسوب نفسه»: هي جهاز إخراج طرفي له معالجه الصغير، ويمكن فصله وتبديله.`, `“The screen is part of the computer itself”: it is a peripheral output device with its own small controller and can be detached and swapped.`),
        T(`«منفذ USB-C يعني أنه سريع»: USB-C مجرد شكل للمنفذ، وقد يدعم USB 2.0 البطيء أو USB4 السريع.`, `“A USB-C port means it is fast”: USB-C is only a connector shape and may carry slow USB 2.0 or fast USB4.`),
        T(`«الميغابت هو الميغابايت»: الفرق 8 أضعاف، فخلطهما يجعل التقدير خاطئًا بشدة.`, `“A megabit is a megabyte”: they differ by a factor of 8, and mixing them makes estimates badly wrong.`),
        T(`«كل جهاز يعمل فور توصيله دون تعريف»: كثير من الأجهزة تتضمن تعريفات عامة، لكن الميزات المتقدمة تحتاج Driver خاصًا.`, `“Every device works the moment it is plugged in with no driver”: many include generic drivers, but advanced features need a specific driver.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> كم يحتاج تسجيل صوتي بجودة CD (44,100 عينة في الثانية، 16 بت، قناتان) من حجم لدقيقة واحدة؟`, `<strong>Calculation:</strong> how much space does one minute of CD-quality audio (44,100 samples per second, 16 bits, two channels) need?`), a: T(`<p>معدل البتات = 44,100 × 16 × 2 = 1,411,200 بت في الثانية. لدقيقة: 1,411,200 × 60 = 84,672,000 بت. وبالقسمة على 8 نحصل على 10,584,000 بايت، أي نحو 10.6 MB. وهذا الحجم قبل أي ضغط؛ ولهذا تبلغ ملفات MP3 أصغر بنحو عشر مرات.</p>`, `<p>Bit rate = 44,100 × 16 × 2 = 1,411,200 bits per second. For a minute: 1,411,200 × 60 = 84,672,000 bits. Dividing by 8 gives 10,584,000 bytes, about 10.6 MB. That is before any compression, which is why MP3 files come out roughly ten times smaller.</p>`) },
      { k: "ex", q: T(`<strong>حساب:</strong> كم يستغرق نقل 1 GB على USB 2.0 (480 Mbit/s نظريًا)؟ وعلى USB 3.0 (5 Gbit/s)؟ وماذا نتوقع عمليًا؟`, `<strong>Calculation:</strong> how long does moving 1 GB take over USB 2.0 (480 Mbit/s in theory)? And USB 3.0 (5 Gbit/s)? What should we expect in practice?`), a: T(`<p>1 GB = 8,000 ميغابت. على USB 2.0: 8,000 ÷ 480 ≈ 16.7 ثانية. على USB 3.0: 8,000 ÷ 5,000 = 1.6 ثانية. عمليًا تكون الأزمنة أطول: تقل سرعة USB 2.0 عادة إلى 30 – 40 MB/s فتحتاج نحو 25 – 35 ثانية، وفي USB 3.0 تحدّ سرعةَ النقل في الغالب سرعةُ الذاكرة أو القرص المتصل وليس المنفذ.</p>`, `<p>1 GB = 8,000 megabits. Over USB 2.0: 8,000 ÷ 480 ≈ 16.7 s. Over USB 3.0: 8,000 ÷ 5,000 = 1.6 s. In practice times are longer: USB 2.0 typically drops to 30–40 MB/s, which takes roughly 25–35 s, and on USB 3.0 the speed of the attached stick or drive usually limits the transfer rather than the port.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اكتب قائمة بكل ما يتصل بجهازك أو يكون جزءًا منه، وصنّفه إلى إدخال أو إخراج أو الاثنين، وحدد المنافذ المتاحة وسرعتها.`, `<strong>Hands-on:</strong> list everything attached to or built into your device, classify each as input, output or both, and identify the available ports and their speeds.`), a: T(`<p>مثال على حاسوب محمول: لوحة المفاتيح ولوحة اللمس وكاميرا الويب والميكروفون (إدخال)، والشاشة والسماعات (إخراج)، وشاشة اللمس وبطاقة Wi-Fi ومنفذ USB (إدخال وإخراج). لمعرفة سرعة المنفذ انظر إلى رمزه: علامة SS تعني 5 Gbit/s أو أكثر، ورمز البرق يعني Thunderbolt، وإن لم يوجد رمز فارجع إلى دليل الجهاز. وفي إدارة الأجهزة (Windows) أو تقرير النظام (macOS) يمكنك رؤية أجهزة USB المتصلة وإصدار الـ Driver.</p>`, `<p>Example for a laptop: keyboard, touchpad, webcam and microphone (input); screen and speakers (output); touchscreen, Wi-Fi card and USB port (both). To learn a port's speed look at its symbol: SS means 5 Gbit/s or more, a lightning bolt means Thunderbolt, and with no symbol consult the device manual. In Device Manager (Windows) or System Report (macOS) you can see the connected USB devices and the driver version.</p>`) },

      { k: "summary", items: [
        T(`أجهزة الإدخال تدخل البيانات، والإخراج يعرض النتائج، وبعض الأجهزة تؤدي الدورين.`, `Input devices bring data in, output devices present results, and some devices do both.`),
        T(`الإشارات الفيزيائية تتحول إلى أرقام بالـ ADC وتعود بالـ DAC، والـ Driver والمقاطعات يضمنان التفاهم والسرعة.`, `Physical signals become numbers through an ADC and return through a DAC, while drivers and interrupts ensure understanding and speed.`),
        T(`شكل المنفذ لا يحدد سرعته، وانتبه إلى الفرق بين البت والبايت.`, `A port's shape does not set its speed, and watch the difference between bits and bytes.`),
      ], next: T(`أنظمة التشغيل: البرنامج الذي يدير كل هذه الأجهزة ويجمعها في تجربة واحدة.`, `Operating Systems: the software that manages all of these devices and ties them into one experience.`) },
    ],
  },

  // ───────────────────────── com-10 ─────────────────────────
  {
    id: "com-10",
    body: [
      { k: "objectives", items: [
        T(`تعرّف ${tm("Operating System")} وتعدد مهامه الأساسية.`, `Define an ${tm("Operating System")} and list its core duties.`),
        T(`تفرّق بين ${tm("Kernel")} والتطبيقات والواجهة وتفهم فكرة تعدد المهام.`, `Distinguish the ${tm("Kernel")}, applications and interface, and grasp multitasking.`),
        T(`تتعرف على Windows وmacOS وLinux وAndroid وiOS وتختار ما يناسب الحاجة.`, `Recognise Windows, macOS, Linux, Android and iOS and choose what fits a need.`),
      ] },
      { k: "prereq", items: [T(`دروس العتاد والبرمجيات (com-03) والذاكرة (com-05) وأجهزة الإدخال والإخراج (com-09).`, `The hardware and software (com-03), RAM (com-05) and I/O devices (com-09) lessons.`)] },
      { k: "h", t: T(`مقدمة: من يدير الحفلة؟`, `Introduction: who runs the show?`) },
      { k: "p", t: T(`تخيل عشرة برامج تريد كلها المعالج والذاكرة والشاشة والقرص في الوقت ذاته. لو تُركت وشأنها لتصادمت وأفسد كل منها بيانات الآخر. ${tm("Operating System")} أو نظام التشغيل هو البرنامج الأساسي الذي يدير العتاد ويتيح للبرامج الأخرى استعماله بأمان وبترتيب. هو الوسيط بينك وبين الجهاز، وبين البرامج والجهاز.`, `Imagine ten programs all wanting the processor, memory, screen and disk at the same time. Left alone they would collide and corrupt each other's data. The ${tm("Operating System")} is the foundational program that manages the hardware and lets other programs use it safely and in order. It is the go-between for you and the machine, and for programs and the machine.`) },
      { k: "p", t: T(`هذا الدرس مقدمة عامة. وفي القسم المتقدم من المسار (الدروس 21–30) ندرس المعمارية الداخلية للأنظمة بالتفصيل، فلن نكررها هنا.`, `This lesson is a general introduction. The advanced section of the path (lessons 21–30) studies OS internals in detail, so we will not repeat that here.`) },

      { k: "h", t: T(`ما الذي يفعله نظام التشغيل؟`, `What does an operating system do?`) },
      { k: "ul", items: [
        T(`<strong>إدارة العمليات:</strong> يقرر أي برنامج يستعمل المعالج ولأي مدة، وكل برنامج قيد التشغيل يسمى ${tm("Process")}.`, `<strong>Process management:</strong> decides which program uses the CPU and for how long; each running program is called a ${tm("Process")}.`),
        T(`<strong>إدارة الذاكرة:</strong> يعطي كل برنامج مساحة من RAM ويمنعه من الوصول إلى مساحة غيره.`, `<strong>Memory management:</strong> gives each program a region of RAM and stops it from touching anyone else's.`),
        T(`<strong>إدارة الملفات:</strong> ينظم التخزين في ملفات ومجلدات بحسب نظام الملفات.`, `<strong>File management:</strong> organises storage into files and folders using the file system.`),
        T(`<strong>إدارة الأجهزة:</strong> يتعامل مع لوحة المفاتيح والشاشة والشبكة عبر التعريفات Drivers.`, `<strong>Device management:</strong> deals with the keyboard, screen and network through drivers.`),
        T(`<strong>الأمان والمستخدمون:</strong> حسابات وصلاحيات وتحديثات أمنية.`, `<strong>Security and users:</strong> accounts, permissions and security updates.`),
        T(`<strong>الواجهة:</strong> سطح مكتب أو شاشة لمس أو سطر أوامر للتعامل معه.`, `<strong>Interface:</strong> a desktop, touchscreen or command line for interacting with it.`),
      ] },

      { k: "h", t: T(`الطبقات: العتاد والنواة والتطبيقات`, `The layers: hardware, kernel and applications`) },
      { k: "diagram", title: T(`موقع نظام التشغيل بين العتاد والبرامج`, `Where the OS sits between hardware and programs`), rows: [
        { label: T(`المستخدم`, `User`), sub: T(`يتعامل مع الواجهة وينقر ويكتب`, `works with the interface, clicking and typing`) },
        { label: T(`التطبيقات`, `Applications`), sub: T(`متصفح، محرر نصوص، لعبة — تطلب الخدمات ولا تلمس العتاد مباشرة`, `browser, editor, game — they request services and never touch hardware directly`) },
        { label: T(`النواة Kernel`, `Kernel`), sub: T(`قلب النظام، تعمل بأعلى صلاحية وتتحكم بالمعالج والذاكرة والأجهزة`, `the heart of the system, running with top privilege and controlling the CPU, memory and devices`) },
        { label: T(`العتاد Hardware`, `Hardware`), sub: T(`المعالج والذاكرة والتخزين والأجهزة الطرفية`, `processor, memory, storage and peripherals`) },
      ] },
      { k: "p", t: T(`${tm("Kernel")} هي الجزء الأساسي من النظام وتعمل بصلاحية عليا، بينما تعمل التطبيقات بصلاحية محدودة. وحين يحتاج تطبيق إلى قراءة ملف مثلًا فلا يقرأ القرص بنفسه، بل يطلب ذلك من النواة عبر ما يسمى ${tm("System Call")}. هذا الفصل يحمي النظام: فتعطل تطبيق لا يسقط الجهاز كله. وللتوسع في ذلك ارجع إلى درس المعمارية في القسم المتقدم.`, `The ${tm("Kernel")} is the core of the system and runs with high privilege, while applications run with limited privilege. When an application wants to read a file, it does not read the disk itself; it asks the kernel through what is called a ${tm("System Call")}. This separation protects the system: a crashing application does not bring down the whole machine. The advanced section's architecture lesson covers this in depth.`) },

      { k: "h", t: T(`تعدد المهام: وهم التوازي`, `Multitasking: the illusion of parallelism`) },
      { k: "p", t: T(`حين تستمع إلى الموسيقى وتكتب وتحمّل ملفًا، يبدو أن كل ذلك يحدث معًا. والحقيقة أن النواة تقسم الزمن إلى شرائح صغيرة جدًا (${tm("Time Slice")}) من أجزاء الميلي ثانية، وتنقل المعالج بين البرامج بسرعة تفوق إدراكك. وفي المعالجات متعددة الأنوية يعمل فعلًا عدة برامج في اللحظة نفسها، كل منها على نواة.`, `While you listen to music, type and download a file, it seems everything happens together. In truth, the kernel carves time into very short ${tm("Time Slice")}s measured in milliseconds and switches the processor between programs faster than you can perceive. On multi-core processors several programs really do run at the same instant, each on its own core.`) },
      { k: "code", lang: "text", code: "Single core, time slice = 10 ms, 4 processes\n\n0-10 ms   process A\n10-20 ms  process B\n20-30 ms  process C\n30-40 ms  process D\n40-50 ms  process A  (again)" },
      { k: "p", t: T(`في هذا المثال يعود كل برنامج ليعمل كل 40 ميلي ثانية، وحصته 25% من الزمن، وهو أقل مما يلاحظه المستخدم فتبدو الاستجابة متواصلة.`, `In this example each program gets another turn every 40 ms and 25% of the time, which is below what a user notices, so responses seem continuous.`) },

      { k: "h", t: T(`أنظمة التشغيل الشائعة`, `Common operating systems`) },
      { k: "table", head: [T(`النظام`, `System`), T(`المطوّر`, `Developer`), T(`الأجهزة`, `Devices`), T(`ما يميزه`, `Highlights`)], rows: [
        [T(`Windows`, `Windows`), T(`Microsoft`, `Microsoft`), T(`حواسيب شخصية وأجهزة محمولة`, `PCs and laptops`), T(`أوسع دعم للبرامج والألعاب والعتاد`, `the widest software, gaming and hardware support`)],
        [T(`macOS`, `macOS`), T(`Apple`, `Apple`), T(`حواسيب Mac`, `Mac computers`), T(`مبني على أساس يونكس، تكامل مع أجهزة Apple`, `built on a Unix foundation, integrated with Apple devices`)],
        [T(`Linux`, `Linux`), T(`مجتمع مفتوح المصدر`, `open-source community`), T(`خوادم وحواسيب وأجهزة مدمجة`, `servers, PCs and embedded devices`), T(`مجاني ومفتوح ومرن، ويأتي في توزيعات مثل Ubuntu وFedora`, `free, open and flexible, shipped as distributions such as Ubuntu and Fedora`)],
        [T(`Android`, `Android`), T(`Google`, `Google`), T(`هواتف ولوحيات وتلفازات`, `phones, tablets and TVs`), T(`مبني على نواة Linux، وأكثر نظام تشغيل هواتف انتشارًا`, `built on the Linux kernel, the most widely used phone OS`)],
        [T(`iOS`, `iOS`), T(`Apple`, `Apple`), T(`iPhone وiPad`, `iPhone and iPad`), T(`نظام مغلق ومتكامل مع تطبيقات App Store`, `closed and integrated, with apps from the App Store`)],
      ] },
      { k: "p", t: T(`يُلاحظ أن Linux هي في الحقيقة اسم النواة التي بدأها لينوس تورفالدز عام 1991، أما ما يثبّته الناس فهو ${tm("Distribution")} تجمع النواة مع الأدوات والواجهة. ولا يوجد نظام «أفضل» مطلقًا: يعتمد الاختيار على البرامج التي تحتاجها، والعتاد، والخبرة، والميزانية.`, `Note that Linux is really the name of the kernel started by Linus Torvalds in 1991; what people install is a ${tm("Distribution")} that bundles the kernel with tools and an interface. There is no single “best” system: the choice depends on the software you need, your hardware, your experience and your budget.`) },
      { k: "note", kind: "tip", t: T(`الخوادم التي تشغّل معظم المواقع تعمل في الغالب على Linux، بينما تتنوع الحواسيب المكتبية بين Windows وmacOS وLinux.`, `The servers that run most websites mostly use Linux, while desktops are split among Windows, macOS and Linux.`) },

      { k: "h", t: T(`تطبيقات من الواقع`, `Real-world applications`) },
      { k: "ul", items: [
        T(`<strong>التحديثات:</strong> تصلح ثغرات النظام وتضيف ميزات، وتأجيلها يترك الجهاز معرّضًا للهجمات.`, `<strong>Updates:</strong> they patch OS vulnerabilities and add features; postponing them leaves a machine exposed to attacks.`),
        T(`<strong>الأجهزة الافتراضية:</strong> تشغيل أكثر من نظام على جهاز واحد لاختبار برنامج أو تجربة Linux بأمان.`, `<strong>Virtual machines:</strong> running more than one OS on a single device to test software or try Linux safely.`),
        T(`<strong>اختيار الجهاز:</strong> قبل الشراء تحقق من أن البرامج التي تعتمد عليها تعمل على نظام الجهاز.`, `<strong>Choosing a device:</strong> before buying, check that the programs you rely on run on that device's OS.`),
      ] },

      { k: "mistakes", items: [
        T(`«نظام التشغيل هو الواجهة التي أراها»: الواجهة جزء واحد، وأغلب عمل النظام يجري في النواة خلف الكواليس.`, `“The OS is the interface I see”: the interface is one part; most of the OS's work happens in the kernel behind the scenes.`),
        T(`«Linux نظام واحد»: توجد عشرات التوزيعات تختلف في الواجهة والأدوات وعمر الدعم.`, `“Linux is one system”: there are dozens of distributions differing in interface, tools and support period.`),
        T(`«تعدد المهام يعني أن كل شيء يعمل حرفيًا في الوقت نفسه»: على نواة واحدة يتناوب النظام بين البرامج بسرعة فائقة.`, `“Multitasking means everything runs literally at once”: on one core the system alternates between programs extremely quickly.`),
        T(`«Android وiOS نظام واحد لأنهما للهواتف»: لهما أصلان مختلفان وشركتان مختلفتان وأساليب مختلفة.`, `“Android and iOS are the same since both are for phones”: they have different origins, different companies and different approaches.`),
      ] },

      { k: "ex", q: T(`<strong>حساب:</strong> نظام بنواة واحدة وشريحة زمنية 20 ميلي ثانية يشغّل 5 عمليات بالتناوب. بعد كم ميلي ثانية يعود دور العملية الأولى؟ وكم نسبة الزمن التي تنالها كل عملية؟`, `<strong>Calculation:</strong> a single-core system with a 20 ms time slice runs 5 processes in turn. After how many milliseconds does the first process get another turn, and what share of time does each receive?`), a: T(`<p>الدورة الكاملة = 5 × 20 = 100 ميلي ثانية، فتعود العملية الأولى بعد 100 ميلي ثانية. حصة كل عملية = 1 ÷ 5 = 20% (وهذا مع إهمال زمن التبديل نفسه الذي يأخذ جزءًا صغيرًا). وبما أن 100 ميلي ثانية قريبة من حد الإدراك البشري فقد يبدأ المستخدم بملاحظة بعض البطء؛ لذا تستعمل الأنظمة شرائح أقصر وأولويات.</p>`, `<p>A full round = 5 × 20 = 100 ms, so the first process runs again after 100 ms. Each process gets 1 ÷ 5 = 20% (ignoring the switching cost itself, which takes a small slice). Since 100 ms is near the threshold of human perception, a user might begin to notice lag, so systems use shorter slices and priorities.</p>`) },
      { k: "ex", q: T(`<strong>استدلال:</strong> لماذا لا يسمح النظام لتطبيق بقراءة الذاكرة التي يستعملها تطبيق آخر؟ ماذا قد يحدث لو سمح؟`, `<strong>Reasoning:</strong> why does the OS not let an application read memory used by another application? What could happen if it did?`), a: T(`<p>العزل يحقق الاستقرار والأمان معًا. لو استطاع برنامج الكتابة في ذاكرة غيره لأفسد بياناته أو أسقطه بخطأ بسيط، ولاستطاع برنامج خبيث قراءة كلمات المرور من المتصفح. لذلك تمنح النواة كل عملية فضاء عناوين خاصًا بها، وأي محاولة للتعدي تُوقف البرنامج المخالف وحده برسالة خطأ، ويستمر الباقي بالعمل.</p>`, `<p>Isolation delivers stability and security together. If a program could write into another's memory, it could corrupt its data or crash it with a simple bug, and a malicious program could read passwords from the browser. So the kernel gives each process its own address space, and any attempt to trespass stops only the offending program with an error while the rest keep running.</p>`) },
      { k: "ex", q: T(`<strong>تطبيق عملي:</strong> اعرف نظام التشغيل وإصداره على جهازك، ثم افتح قائمة العمليات الجارية واذكر ثلاث عمليات ووظيفة كل منها.`, `<strong>Hands-on:</strong> find the operating system and version on your device, then open the list of running processes and name three of them with their roles.`), a: T(`<p>في Windows اضغط مفتاح Windows مع R واكتب <code>winver</code>. في macOS اختر «حول هذا الـ Mac». في Linux افتح الطرفية واكتب <code>uname -a</code>. ثم افتح مدير المهام أو مراقب النشاط: ستجد غالبًا عملية المتصفح (تطبيق)، وعملية مثل Explorer أو Finder (الواجهة وإدارة الملفات)، وعملية خدمة نظام أو مضاد فيروسات (خدمة تعمل في الخلفية). لاحظ عدد العمليات الكبير حتى حين لا تفتح تطبيقات، وهذا دليل على أن النظام يدير الكثير خلف الكواليس.</p>`, `<p>On Windows press the Windows key with R and type <code>winver</code>. On macOS choose About This Mac. On Linux open a terminal and type <code>uname -a</code>. Then open Task Manager or Activity Monitor: you will typically find a browser process (an application), a process such as Explorer or Finder (the interface and file management), and a system service or antivirus process (a background service). Notice how many processes run even with no applications open; that shows how much the system manages behind the scenes.</p>`) },

      { k: "summary", items: [
        T(`نظام التشغيل يدير المعالج والذاكرة والملفات والأجهزة والأمان ويوفر الواجهة.`, `The operating system manages the processor, memory, files, devices and security, and provides the interface.`),
        T(`النواة تعمل بصلاحية عليا، والتطبيقات تطلب منها الخدمات عبر System Calls.`, `The kernel runs with top privilege, and applications request services from it through system calls.`),
        T(`تعدد المهام تناوب سريع بين البرامج وتشغيل متوازٍ حقيقي على الأنوية المتعددة.`, `Multitasking is rapid alternation between programs plus true parallel running on multiple cores.`),
        T(`لا يوجد نظام أفضل بإطلاق؛ يُختار بحسب الحاجة.`, `No system is best in absolute terms; choose by need.`),
      ], next: T(`الملفات والمجلدات: كيف ينظم النظام ما نخزنه ونجد به ملفاتنا.`, `Files and Folders: how the system organises what we store and how we find our files.`) },
    ],
  },
];
