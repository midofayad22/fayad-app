export const EXTRA = {
 "com-01": [
  {
   "question": {
    "ar": "ما الخاصية الأساسية التي تميّز الكمبيوتر عن مفتاح الإضاءة؟",
    "en": "Which key property separates a computer from a light switch?"
   },
   "options": [
    {
     "ar": "يعمل بالكهرباء",
     "en": "It runs on electricity"
    },
    {
     "ar": "يملك شاشة",
     "en": "It has a screen"
    },
    {
     "ar": "قابل للبرمجة فيتغير سلوكه بتغيير البرنامج",
     "en": "It is programmable, so its behaviour changes when the program changes"
    },
    {
     "ar": "يخزّن الملفات فقط",
     "en": "It only stores files"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "مفتاح الإضاءة يعالج الكهرباء دون أن يتغير سلوكه، أما الكمبيوتر فيصبح أداة مختلفة بتبديل البرنامج.",
    "en": "A switch handles electricity but never changes behaviour, while a computer becomes a different tool simply by swapping the program."
   }
  },
  {
   "question": {
    "ar": "كتبت رسالة ثم ضغطت «حفظ» لتبقى بعد إطفاء الجهاز. أي مرحلة من الدورة الأربع نفّذت هذا؟",
    "en": "You typed a message and pressed Save so it survives a shutdown. Which of the four stages did that?"
   },
   "options": [
    {
     "ar": "Input",
     "en": "Input"
    },
    {
     "ar": "Processing",
     "en": "Processing"
    },
    {
     "ar": "Output",
     "en": "Output"
    },
    {
     "ar": "Storage",
     "en": "Storage"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الكتابة على القرص لتبقى البيانات بعد انقطاع الكهرباء هي مرحلة Storage.",
    "en": "Writing data to disk so it persists without power is the Storage stage."
   }
  },
  {
   "question": {
    "ar": "أي مما يلي مثال على نظام مدمج (Embedded System)؟",
    "en": "Which of the following is an example of an embedded system?"
   },
   "options": [
    {
     "ar": "حاسوب صغير مخصص لمهمة واحدة داخل غسالة",
     "en": "A tiny computer dedicated to one job inside a washing machine"
    },
    {
     "ar": "حاسوب مكتبي يشغّل برامج متنوعة",
     "en": "A desktop PC running many different programs"
    },
    {
     "ar": "خادم يستضيف آلاف المستخدمين",
     "en": "A server hosting thousands of users"
    },
    {
     "ar": "حاسوب محمول للألعاب",
     "en": "A gaming laptop"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "النظم المدمجة حواسيب صغيرة مخصصة لعمل واحد داخل أجهزة مثل الغسالة والسيارة.",
    "en": "Embedded systems are tiny computers dedicated to a single job inside devices such as washing machines and cars."
   }
  },
  {
   "question": {
    "ar": "أي عبارة عن الكمبيوتر صحيحة؟",
    "en": "Which statement about computers is correct?"
   },
   "options": [
    {
     "ar": "يفهم الأوامر ويفكر مثل الإنسان",
     "en": "It understands and thinks like a person"
    },
    {
     "ar": "ينفذ حرفياً ما كتبه المبرمج له",
     "en": "It does literally what a programmer wrote for it"
    },
    {
     "ar": "يعطي نتائج مختلفة للعملية نفسها في كل مرة",
     "en": "It gives different results for the same operation each time"
    },
    {
     "ar": "لا يحتاج إلى تعليمات لكي يعمل",
     "en": "It needs no instructions to work"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الكمبيوتر سريع ودقيق ومرن لكنه لا يفكر؛ ينفّذ ما كُتب له بالحرف.",
    "en": "A computer is fast, accurate and flexible, but it does not think; it follows exactly what was written."
   }
  }
 ],
 "com-02": [
  {
   "question": {
    "ar": "ما ترتيب خطوات الدورة التي تمر بها كل تعليمة في المعالج؟",
    "en": "What is the order of the steps every instruction goes through in the processor?"
   },
   "options": [
    {
     "ar": "Execute ثم Fetch ثم Decode",
     "en": "Execute, then Fetch, then Decode"
    },
    {
     "ar": "Decode ثم Execute ثم Fetch",
     "en": "Decode, then Execute, then Fetch"
    },
    {
     "ar": "Fetch ثم Execute ثم Decode",
     "en": "Fetch, then Execute, then Decode"
    },
    {
     "ar": "Fetch ثم Decode ثم Execute",
     "en": "Fetch, then Decode, then Execute"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "يجلب المعالج التعليمة أولاً، ثم تُفكّ شيفرتها، ثم تُنفَّذ، وتتكرر الدورة بلا توقف.",
    "en": "The CPU fetches the instruction, decodes it, then executes it, and the cycle repeats without stopping."
   }
  },
  {
   "question": {
    "ar": "ما وظيفة Program Counter؟",
    "en": "What does the Program Counter do?"
   },
   "options": [
    {
     "ar": "يعدّ عدد البرامج المفتوحة",
     "en": "It counts the open programs"
    },
    {
     "ar": "يتتبع موضع التعليمة التالية التي ستُجلب من الذاكرة",
     "en": "It tracks where the next instruction to fetch is in memory"
    },
    {
     "ar": "يقيس سرعة الساعة",
     "en": "It measures the clock speed"
    },
    {
     "ar": "يخزن الملفات الدائمة",
     "en": "It stores permanent files"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "العداد يشير إلى عنوان التعليمة التالية لتجلبها وحدة المعالجة في خطوة Fetch.",
    "en": "The counter points to the address of the next instruction so it can be fetched in the Fetch step."
   }
  },
  {
   "question": {
    "ar": "معالج بتردد 3.5 GHz. ماذا يعني ذلك تقريباً؟",
    "en": "A processor runs at 3.5 GHz. Roughly what does that mean?"
   },
   "options": [
    {
     "ar": "ينفذ 3.5 مليار دورة ساعة في الثانية",
     "en": "It ticks about 3.5 billion clock cycles per second"
    },
    {
     "ar": "ينفذ 3.5 مليون تعليمة في الثانية",
     "en": "It runs 3.5 million instructions per second"
    },
    {
     "ar": "يحتاج 3.5 ثانية لتشغيل برنامج",
     "en": "It needs 3.5 seconds to start a program"
    },
    {
     "ar": "يملك 3.5 جيجابايت ذاكرة",
     "en": "It has 3.5 GB of memory"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الجيجاهرتز يقيس دورات الساعة، وكل دورة نحو 0.29 نانوثانية، وليس بالضرورة عدد التعليمات.",
    "en": "GHz measures clock cycles, each about 0.29 nanoseconds, which is not necessarily the number of instructions."
   }
  },
  {
   "question": {
    "ar": "أي ترتيب يصف تسلسل الإقلاع بعد ضغط زر التشغيل؟",
    "en": "Which sequence describes the boot process after pressing the power button?"
   },
   "options": [
    {
     "ar": "النظام ثم الفحص ثم البرنامج الثابت ثم المحمّل",
     "en": "Operating system, POST, firmware, bootloader"
    },
    {
     "ar": "البرنامج الثابت ثم فحص POST ثم المحمّل ثم نظام التشغيل",
     "en": "Firmware, POST, bootloader, operating system"
    },
    {
     "ar": "المحمّل ثم النظام ثم الفحص ثم البرنامج الثابت",
     "en": "Bootloader, operating system, POST, firmware"
    },
    {
     "ar": "سطح المكتب ثم النظام ثم البرنامج الثابت",
     "en": "Desktop, operating system, firmware"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الـ firmware يفحص المكونات (POST) ثم يجد المحمّل الذي يحمّل النظام ثم يظهر سطح المكتب.",
    "en": "The firmware checks the hardware (POST), finds the bootloader, which loads the OS, and then the desktop appears."
   }
  }
 ],
 "com-03": [
  {
   "question": {
    "ar": "ما هو Firmware؟",
    "en": "What is firmware?"
   },
   "options": [
    {
     "ar": "برنامج مخزّن بشكل دائم داخل شريحة في الجهاز نفسه",
     "en": "A program stored permanently inside a chip in the device itself"
    },
    {
     "ar": "لعبة تُنزَّل من متجر التطبيقات",
     "en": "A game downloaded from an app store"
    },
    {
     "ar": "قطعة مادية تُركَّب خارج الجهاز",
     "en": "A physical part attached from outside the device"
    },
    {
     "ar": "ملف مؤقت يُحذف عند الإغلاق",
     "en": "A temporary file deleted at shutdown"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "البرنامج الثابت برمجيات تعيش داخل قطعة عتاد وتبقى عند انقطاع الكهرباء، مثل UEFI.",
    "en": "Firmware is software living in a piece of hardware and it persists without power, such as UEFI."
   }
  },
  {
   "question": {
    "ar": "في مسار الطباعة، أي طبقة تترجم الطلب إلى أوامر تفهمها هذه الطابعة تحديداً؟",
    "en": "In the printing path, which layer translates the request into commands that this specific printer understands?"
   },
   "options": [
    {
     "ar": "التطبيق",
     "en": "The application"
    },
    {
     "ar": "نظام التشغيل",
     "en": "The operating system"
    },
    {
     "ar": "السائق Driver",
     "en": "The driver"
    },
    {
     "ar": "الورق",
     "en": "The paper"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الـ Driver برنامج صغير يعرف كيف يتخاطب مع جهاز محدد مثل طابعة أو بطاقة رسوميات.",
    "en": "A driver is a small program that knows how to talk to one specific device such as a printer or graphics card."
   }
  },
  {
   "question": {
    "ar": "قال أحدهم: «القرص الذي يأتي عليه البرنامج هو برمجيات». ما التصحيح؟",
    "en": "Someone says: \"The disc a program comes on is software.\" What is the correction?"
   },
   "options": [
    {
     "ar": "القرص عتاد، والبرنامج هو المحتوى المسجل عليه",
     "en": "The disc is hardware; the program is the content recorded on it"
    },
    {
     "ar": "القرص برمجيات والبرنامج عتاد",
     "en": "The disc is software and the program is hardware"
    },
    {
     "ar": "كلاهما عتاد",
     "en": "Both are hardware"
    },
    {
     "ar": "كلاهما Firmware",
     "en": "Both are firmware"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الشيء الملموس عتاد، أما التعليمات المسجلة عليه فهي البرمجيات.",
    "en": "The physical object is hardware, while the instructions recorded on it are the software."
   }
  },
  {
   "question": {
    "ar": "أي مما يلي يُصنَّف برمجيات نظام (System Software) وليس تطبيقاً؟",
    "en": "Which of the following is classified as system software rather than an application?"
   },
   "options": [
    {
     "ar": "لعبة فيديو",
     "en": "A video game"
    },
    {
     "ar": "برنامج Excel",
     "en": "Excel"
    },
    {
     "ar": "Photoshop",
     "en": "Photoshop"
    },
    {
     "ar": "أداة نسخ احتياطي وضغط",
     "en": "A backup and compression utility"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الأدوات المساعدة (Utilities) مثل الضغط والنسخ الاحتياطي تُصنَّف ضمن برمجيات النظام.",
    "en": "Utilities such as compression and backup tools belong to system software."
   }
  }
 ],
 "com-04": [
  {
   "question": {
    "ar": "معالج فيه 4 أنوية وكل نواة تدعم خيطين (SMT). كم معالجاً منطقياً يظهر في النظام؟",
    "en": "A CPU has 4 cores and each core supports 2 threads (SMT). How many logical processors will the system show?"
   },
   "options": [
    {
     "ar": "4",
     "en": "4"
    },
    {
     "ar": "6",
     "en": "6"
    },
    {
     "ar": "8",
     "en": "8"
    },
    {
     "ar": "16",
     "en": "16"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "المعالجات المنطقية = الأنوية × الخيوط لكل نواة = 4 × 2 = 8.",
    "en": "Logical processors = cores x threads per core = 4 x 2 = 8."
   }
  },
  {
   "question": {
    "ar": "معالج قديم 4.0 GHz و IPC = 2، وجديد 3.2 GHz و IPC = 4. أيهما أسرع وفق القاعدة في الدرس؟",
    "en": "An older CPU runs at 4.0 GHz with IPC 2, a newer one at 3.2 GHz with IPC 4. Which is faster by the lesson's rule?"
   },
   "options": [
    {
     "ar": "القديم لأن تردده أعلى",
     "en": "The older one, because its clock is higher"
    },
    {
     "ar": "الجديد (12.8 مقابل 8 مليار تعليمة/ث)",
     "en": "The newer one (12.8 vs 8 billion instructions/s)"
    },
    {
     "ar": "متساويان",
     "en": "They are equal"
    },
    {
     "ar": "لا يمكن المقارنة أبداً",
     "en": "They can never be compared"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الأداء ≈ التردد × IPC، فالجديد 3.2 × 4 = 12.8 أكبر من 4.0 × 2 = 8.",
    "en": "Throughput is roughly clock x IPC, so 3.2 x 4 = 12.8 beats 4.0 x 2 = 8."
   }
  },
  {
   "question": {
    "ar": "ما معنى Cache Hit؟",
    "en": "What does a Cache Hit mean?"
   },
   "options": [
    {
     "ar": "ارتفاع حرارة المعالج",
     "en": "The processor overheats"
    },
    {
     "ar": "انهيار البرنامج",
     "en": "The program crashes"
    },
    {
     "ar": "وجد المعالج ما يحتاجه في الكاش دون الذهاب إلى RAM",
     "en": "The CPU found what it needed in cache without going to RAM"
    },
    {
     "ar": "كتابة البيانات على القرص",
     "en": "Data is written to disk"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "إيجاد البيانات في الكاش أسرع بكثير من الرجوع إلى RAM البطيئة نسبياً.",
    "en": "Finding data in cache is much faster than going to the comparatively slow RAM."
   }
  },
  {
   "question": {
    "ar": "برنامج مُترجَم لمعالج x86 هل يعمل مباشرة على معالج ARM؟",
    "en": "Does a program compiled for an x86 processor run directly on an ARM processor?"
   },
   "options": [
    {
     "ar": "نعم دائماً",
     "en": "Yes, always"
    },
    {
     "ar": "نعم لكن أبطأ بنصف السرعة فقط",
     "en": "Yes, but at exactly half speed"
    },
    {
     "ar": "فقط إذا زاد التردد",
     "en": "Only if the clock speed is higher"
    },
    {
     "ar": "لا، يحتاج ترجمة أو محاكاة لاختلاف مجموعة التعليمات",
     "en": "No, it needs translation or emulation because the instruction set differs"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "لكل عائلة معالجات مجموعة تعليمات (ISA) خاصة، فالبرنامج المترجم لواحدة لا يعمل مباشرة على أخرى.",
    "en": "Each processor family has its own instruction set, so a program compiled for one does not run directly on another."
   }
  }
 ],
 "com-05": [
  {
   "question": {
    "ar": "لماذا تفقد DRAM محتواها عند انقطاع الكهرباء؟",
    "en": "Why does DRAM lose its contents when power is cut?"
   },
   "options": [
    {
     "ar": "تخزن كل بت كشحنة في مكثف صغير تتسرب بسرعة فتحتاج إلى تحديث مستمر",
     "en": "Each bit is a charge in a tiny capacitor that leaks quickly and needs constant refreshing"
    },
    {
     "ar": "لأنها تُمسح تلقائياً بأمر من المستخدم",
     "en": "Because the user's command wipes it automatically"
    },
    {
     "ar": "لأنها مصنوعة من أقراص دوّارة",
     "en": "Because it is made of spinning platters"
    },
    {
     "ar": "لأن سعتها صغيرة جداً",
     "en": "Because its capacity is too small"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الشحنة تتسرب خلال أجزاء من الثانية، لذلك تسمى ذاكرة متطايرة (Volatile).",
    "en": "The charge leaks within fractions of a second, which is why it is called volatile memory."
   }
  },
  {
   "question": {
    "ar": "أظهر free -h أن Free = 1.1Gi لكن available = 8.6Gi. ماذا نستنتج؟",
    "en": "free -h shows Free = 1.1Gi but available = 8.6Gi. What can we conclude?"
   },
   "options": [
    {
     "ar": "الذاكرة شبه ممتلئة والجهاز سيتوقف",
     "en": "Memory is nearly full and the machine will stop"
    },
    {
     "ar": "الذاكرة تالفة",
     "en": "The memory is faulty"
    },
    {
     "ar": "يمكن تحرير معظم الذاكرة المستخدمة ككاش عند الحاجة",
     "en": "Most of the memory used as cache can be released on demand"
    },
    {
     "ar": "8.6 هي حجم القرص",
     "en": "8.6 is the disk size"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "النظام يستخدم الذاكرة الفارغة ككاش ويستطيع إعادتها فوراً، فالعمود available هو الأدق.",
    "en": "The system uses spare memory as cache and can release it instantly, so the available column is the accurate one."
   }
  },
  {
   "question": {
    "ar": "عند امتلاء RAM ولجوء النظام إلى ملف التبديل (swap) على القرص، ما النتيجة المتوقعة؟",
    "en": "When RAM fills up and the system falls back to swap on disk, what is the expected result?"
   },
   "options": [
    {
     "ar": "يصبح الجهاز أسرع",
     "en": "The machine gets faster"
    },
    {
     "ar": "تتضاعف سعة RAM فعلياً بنفس السرعة",
     "en": "RAM capacity doubles at the same speed"
    },
    {
     "ar": "لا يتغير شيء يلاحظه المستخدم",
     "en": "Nothing the user would notice changes"
    },
    {
     "ar": "بطء ملحوظ أو تجمّد لأن القرص أبطأ بكثير",
     "en": "Noticeable slowdown or freezing because disk is far slower"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الذاكرة الافتراضية تعتمد على القرص، ووصوله أبطأ بآلاف المرات من RAM.",
    "en": "Virtual memory relies on disk, whose access is thousands of times slower than RAM."
   }
  },
  {
   "question": {
    "ar": "كم تبلغ السعة النظرية لذاكرة DDR4-3200 لكل قناة؟ (الناقل 8 بايت)",
    "en": "What is the theoretical bandwidth of DDR4-3200 per channel? (The bus is 8 bytes wide)"
   },
   "options": [
    {
     "ar": "6.4 GB/s",
     "en": "6.4 GB/s"
    },
    {
     "ar": "25.6 GB/s",
     "en": "25.6 GB/s"
    },
    {
     "ar": "3200 GB/s",
     "en": "3200 GB/s"
    },
    {
     "ar": "256 GB/s",
     "en": "256 GB/s"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "3200 مليون عملية نقل × 8 بايت = 25,600 MB/s أي نحو 25.6 GB/s.",
    "en": "3200 million transfers x 8 bytes = 25,600 MB/s, about 25.6 GB/s."
   }
  }
 ],
 "com-06": [
  {
   "question": {
    "ar": "قرص مكتوب عليه 1 TB يظهر في ويندوز بنحو 931 GB. ما السبب؟",
    "en": "A drive labelled 1 TB shows up as about 931 GB in Windows. Why?"
   },
   "options": [
    {
     "ar": "الشركة باعت قرصاً أصغر",
     "en": "The maker sold a smaller drive"
    },
    {
     "ar": "فُقد جزء من البيانات",
     "en": "Part of the data was lost"
    },
    {
     "ar": "القرص معطوب",
     "en": "The drive is faulty"
    },
    {
     "ar": "الشركة تحسب بالنظام العشري وويندوز بقوى 2 مع الاسم GB",
     "en": "The maker counts in decimal while Windows counts in powers of 2 but labels it GB"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "لا شيء مفقود؛ 10^12 بايت ÷ 1,073,741,824 ≈ 931 GiB.",
    "en": "Nothing is lost: 10^12 bytes / 1,073,741,824 is about 931 GiB."
   }
  },
  {
   "question": {
    "ar": "ما هو NVMe بدقة؟",
    "en": "What exactly is NVMe?"
   },
   "options": [
    {
     "ar": "نوع جديد من شرائح الذاكرة",
     "en": "A new type of memory chip"
    },
    {
     "ar": "بروتوكول حديث يربط SSD مباشرة بمسارات PCIe",
     "en": "A modern protocol that connects an SSD directly to PCIe lanes"
    },
    {
     "ar": "قرص دوّار سريع",
     "en": "A fast spinning disk"
    },
    {
     "ar": "نظام ملفات من مايكروسوفت",
     "en": "A file system from Microsoft"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "NVMe ليس نوع شرائح بل بروتوكول يتجاوز حدود واجهة SATA القديمة.",
    "en": "NVMe is not a chip type but a protocol that escapes the limits of the older SATA interface."
   }
  },
  {
   "question": {
    "ar": "ما الغرض من Wear Leveling في SSD؟",
    "en": "What is the purpose of wear leveling in an SSD?"
   },
   "options": [
    {
     "ar": "ضغط الملفات لتوفير المساحة",
     "en": "Compressing files to save space"
    },
    {
     "ar": "تسريع الدوران",
     "en": "Speeding up rotation"
    },
    {
     "ar": "توزيع الكتابة بالتساوي على الخلايا لأن لكل خلية عدداً محدوداً من دورات المسح",
     "en": "Spreading writes evenly because each cell survives a limited number of erase cycles"
    },
    {
     "ar": "تبريد القرص",
     "en": "Cooling the drive"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "المتحكم يوزع الكتابة كي لا تتآكل خلايا معينة قبل غيرها.",
    "en": "The controller spreads writes so certain cells do not wear out before others."
   }
  },
  {
   "question": {
    "ar": "لماذا يكون HDD أبطأ وأكثر حساسية للصدمات من SSD؟",
    "en": "Why is an HDD slower and more sensitive to shocks than an SSD?"
   },
   "options": [
    {
     "ar": "لأنه يعتمد على حركة ميكانيكية: أقراص تدور ورأس قراءة يتحرك",
     "en": "Because it relies on mechanical motion: spinning platters and a moving head"
    },
    {
     "ar": "لأنه يحتوي شرائح NAND أكثر",
     "en": "Because it has more NAND chips"
    },
    {
     "ar": "لأنه يستخدم بروتوكول NVMe",
     "en": "Because it uses the NVMe protocol"
    },
    {
     "ar": "لأنه يخزن البيانات في RAM",
     "en": "Because it stores data in RAM"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الـ SSD بلا أجزاء متحركة، أما HDD فالحركة الميكانيكية سبب بطئه وحساسيته.",
    "en": "An SSD has no moving parts, while the HDD's mechanical motion causes its slowness and fragility."
   }
  }
 ],
 "com-07": [
  {
   "question": {
    "ar": "جهاز قديم يعود تاريخه إلى تاريخ خاطئ بعد كل إطفاء. ما السبب الأرجح؟",
    "en": "An older machine resets to a wrong date after every shutdown. What is the most likely cause?"
   },
   "options": [
    {
     "ar": "بطارية CR2032 فارغة",
     "en": "The CR2032 battery is flat"
    },
    {
     "ar": "كرت الشاشة تالف",
     "en": "The graphics card is broken"
    },
    {
     "ar": "ذاكرة RAM ممتلئة",
     "en": "RAM is full"
    },
    {
     "ar": "القرص ممتلئ",
     "en": "The disk is full"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "هذه البطارية 3 فولت تحفظ الساعة وإعدادات البرنامج الثابت عند انقطاع الكهرباء.",
    "en": "This 3 V battery keeps the clock and firmware settings alive when power is cut."
   }
  },
  {
   "question": {
    "ar": "أي اتصال يرتبط عادة مباشرة بالمعالج لا عبر الـ Chipset؟",
    "en": "Which connection usually goes straight to the CPU rather than through the chipset?"
   },
   "options": [
    {
     "ar": "منافذ USB",
     "en": "USB ports"
    },
    {
     "ar": "شريحة الشبكة",
     "en": "The network chip"
    },
    {
     "ar": "منافذ SATA",
     "en": "SATA ports"
    },
    {
     "ar": "فتحة كرت الشاشة الرئيسية",
     "en": "The main graphics slot"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الذاكرة وفتحة الرسوميات تحتاجان أقل زمن استجابة، فتتصلان مباشرة بالمعالج.",
    "en": "Memory and the main graphics slot need the lowest latency, so they connect directly to the CPU."
   }
  },
  {
   "question": {
    "ar": "ما وظيفة VRM على اللوحة الأم؟",
    "en": "What is the job of the VRM on a motherboard?"
   },
   "options": [
    {
     "ar": "تخزين نظام التشغيل",
     "en": "Storing the operating system"
    },
    {
     "ar": "تحويل 12 فولت إلى جهد ثابت قرابة 1 فولت يحتاجه المعالج",
     "en": "Converting 12 V into a steady voltage of around 1 V for the CPU"
    },
    {
     "ar": "ربط الأجهزة الخارجية",
     "en": "Connecting external devices"
    },
    {
     "ar": "تحديد حجم الحالة",
     "en": "Determining the case size"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الـ VRM مجموعة ملفات ومكثفات ومحولات تعطي المعالج جهداً مستقراً، ولذلك تُغطى بمشتتات حرارة.",
    "en": "The VRM is a group of coils, capacitors and converters giving the CPU stable voltage, hence the heatsinks."
   }
  },
  {
   "question": {
    "ar": "قرص NVMe يستخدم 4 مسارات PCIe 4.0 بسرعة نحو 2 GB/s لكل مسار. ما السرعة التقريبية؟",
    "en": "An NVMe drive uses 4 PCIe 4.0 lanes at about 2 GB/s per lane. What is the approximate speed?"
   },
   "options": [
    {
     "ar": "2 GB/s",
     "en": "2 GB/s"
    },
    {
     "ar": "4 GB/s",
     "en": "4 GB/s"
    },
    {
     "ar": "8 GB/s",
     "en": "8 GB/s"
    },
    {
     "ar": "32 GB/s",
     "en": "32 GB/s"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "4 مسارات × 2 GB/s = 8 GB/s في كل اتجاه.",
    "en": "4 lanes x 2 GB/s = 8 GB/s in each direction."
   }
  }
 ],
 "com-08": [
  {
   "question": {
    "ar": "ما الفرق التصميمي الأساسي بين GPU و CPU؟",
    "en": "What is the main design difference between a GPU and a CPU?"
   },
   "options": [
    {
     "ar": "GPU آلاف أنوية بسيطة تعمل بالتوازي، وCPU أنوية قليلة قوية",
     "en": "A GPU has thousands of simple cores working in parallel, a CPU a few powerful cores"
    },
    {
     "ar": "GPU أنوية قليلة جداً وأقوى",
     "en": "A GPU has very few, stronger cores"
    },
    {
     "ar": "لا فرق بينهما",
     "en": "There is no difference"
    },
    {
     "ar": "GPU لا يملك ذاكرة",
     "en": "A GPU has no memory"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الرسوميات تتطلب عملية بسيطة مكررة على بيانات ضخمة، وهذا ما يناسب التوازي في البيانات.",
    "en": "Graphics needs a simple operation repeated over huge data, which suits data parallelism."
   }
  },
  {
   "question": {
    "ar": "أي عبارة تصف الكرت المدمج (Integrated GPU)؟",
    "en": "Which statement describes an integrated GPU?"
   },
   "options": [
    {
     "ar": "بطاقة منفصلة لها VRAM خاصة",
     "en": "A separate card with its own VRAM"
    },
    {
     "ar": "جزء من شريحة المعالج ويشارك ذاكرة النظام",
     "en": "Part of the processor chip that shares system RAM"
    },
    {
     "ar": "يتطلب مصدر طاقة مستقلاً",
     "en": "It requires its own power supply"
    },
    {
     "ar": "يعمل فقط للذكاء الاصطناعي",
     "en": "It works only for artificial intelligence"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المدمج يوفر الطاقة والحرارة ويكفي للتصفح والمكتب والألعاب الخفيفة.",
    "en": "Integrated graphics saves power and heat and is enough for browsing, office work and light games."
   }
  },
  {
   "question": {
    "ar": "ماذا يحدث حين تمتلئ VRAM في لعبة عالية الدقة؟",
    "en": "What happens when VRAM fills up in a high-resolution game?"
   },
   "options": [
    {
     "ar": "تزداد سرعة الإطارات",
     "en": "Frame rate increases"
    },
    {
     "ar": "تُغلق اللعبة دائماً",
     "en": "The game always closes"
    },
    {
     "ar": "يستعير الكرت ذاكرة النظام عبر PCIe الأبطأ فيحدث تقطّع",
     "en": "The card borrows system RAM over the slower PCIe link, causing stutter"
    },
    {
     "ar": "يتحول إلى استخدام القرص كشاشة",
     "en": "It uses the disk as the screen"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "ذاكرة النظام أبطأ كثيراً من VRAM، لذلك يظهر التقطع.",
    "en": "System RAM is much slower than VRAM, so visible stutter appears."
   }
  },
  {
   "question": {
    "ar": "اشترى أحمد بطاقة لأن عدد أنويتها أكبر من الأخرى فقط. ما الخطأ؟",
    "en": "Ahmed bought a card only because it has more cores than another. What is the mistake?"
   },
   "options": [
    {
     "ar": "لا خطأ؛ الأنوية الأكثر تعني دائماً أداءً أفضل",
     "en": "None; more cores always means better performance"
    },
    {
     "ar": "تصاميم الأنوية تختلف بين الشركات والأجيال فيجب الاعتماد على اختبارات الأداء",
     "en": "Core designs differ between vendors and generations, so benchmarks should be used"
    },
    {
     "ar": "الأنوية لا تؤثر في الأداء إطلاقاً",
     "en": "Cores have no effect on performance at all"
    },
    {
     "ar": "الحل في مقارنة حجم الصندوق",
     "en": "Comparing the box size is the solution"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "عدد الأنوية وحده لا يصلح للمقارنة بين بطاقات مختلفة؛ انظر إلى benchmarks لعملك.",
    "en": "Core count alone is not a fair comparison between different cards; look at benchmarks for your workload."
   }
  }
 ],
 "com-09": [
  {
   "question": {
    "ar": "وحدة USB 2.0 سرعتها 480 Mbit/s. كم تساوي نظرياً بالـ MB/s؟",
    "en": "USB 2.0 is rated at 480 Mbit/s. What is that in MB/s in theory?"
   },
   "options": [
    {
     "ar": "480 MB/s",
     "en": "480 MB/s"
    },
    {
     "ar": "3840 MB/s",
     "en": "3840 MB/s"
    },
    {
     "ar": "60 MB/s",
     "en": "60 MB/s"
    },
    {
     "ar": "4.8 MB/s",
     "en": "4.8 MB/s"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "البايت 8 بتات، لذا 480 ÷ 8 = 60 MB/s.",
    "en": "A byte is 8 bits, so 480 / 8 = 60 MB/s."
   }
  },
  {
   "question": {
    "ar": "ما فائدة الـ Interrupt مقارنة بالاستطلاع (Polling)؟",
    "en": "What is the benefit of an interrupt compared with polling?"
   },
   "options": [
    {
     "ar": "يجعل المعالج يسأل الجهاز في كل لحظة",
     "en": "It makes the CPU ask the device every moment"
    },
    {
     "ar": "يمنع الجهاز من إرسال بيانات",
     "en": "It stops the device sending data"
    },
    {
     "ar": "يزيد حجم الذاكرة",
     "en": "It increases memory size"
    },
    {
     "ar": "ينبّه الجهاز المعالج عند حدوث شيء فلا ينتظر المعالج ويسأل",
     "en": "The device alerts the CPU when something happens so the CPU need not keep asking"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الانتظار حتى التنبيه يوفر وقت المعالج ويجعل الاستجابة سريعة.",
    "en": "Waiting to be alerted saves CPU time and keeps the response quick."
   }
  },
  {
   "question": {
    "ar": "أي جهاز يُصنَّف إدخالاً وإخراجاً معاً؟",
    "en": "Which device counts as both input and output?"
   },
   "options": [
    {
     "ar": "لوحة المفاتيح",
     "en": "Keyboard"
    },
    {
     "ar": "كرت الشبكة",
     "en": "Network card"
    },
    {
     "ar": "الشاشة",
     "en": "Monitor"
    },
    {
     "ar": "الفأرة",
     "en": "Mouse"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "كرت الشبكة يستقبل البيانات ويرسلها، وكذلك شاشة اللمس وذاكرة USB.",
    "en": "A network card receives and sends data, as do touchscreens and USB sticks."
   }
  },
  {
   "question": {
    "ar": "ماذا يفعل الـ ADC؟",
    "en": "What does an ADC do?"
   },
   "options": [
    {
     "ar": "يحوّل الأرقام إلى صوت",
     "en": "Turns numbers into sound"
    },
    {
     "ar": "يحوّل الظواهر التماثلية كالصوت والضوء إلى أرقام بأخذ قياسات متكررة",
     "en": "Turns analogue phenomena such as sound and light into numbers by repeated sampling"
    },
    {
     "ar": "يطبع الصفحات",
     "en": "Prints pages"
    },
    {
     "ar": "يشحن الجهاز",
     "en": "Charges the device"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "هذه العملية تُسمى Sampling، والـ DAC يقوم بالعكس عند الإخراج.",
    "en": "This process is called sampling, and the DAC does the reverse on output."
   }
  }
 ],
 "com-10": [
  {
   "question": {
    "ar": "ما هي System Call؟",
    "en": "What is a system call?"
   },
   "options": [
    {
     "ar": "خطأ يوقف الجهاز",
     "en": "An error that halts the machine"
    },
    {
     "ar": "اتصال هاتفي عبر الشبكة",
     "en": "A phone call over the network"
    },
    {
     "ar": "أداة لتسريع المعالج",
     "en": "A tool to speed up the processor"
    },
    {
     "ar": "طلب من التطبيق إلى النواة للقيام بعمل مثل قراءة ملف",
     "en": "A request from an application to the kernel to do something such as read a file"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "التطبيق لا يقرأ القرص بنفسه بل يطلب من النواة، وهذا يحمي النظام.",
    "en": "An application does not read the disk itself but asks the kernel, which protects the system."
   }
  },
  {
   "question": {
    "ar": "نواة وحيدة وشريحة زمن 10 ms مع 4 عمليات. كم تنتظر كل عملية بين دورين؟",
    "en": "A single core, a 10 ms time slice and 4 processes. How long does each process wait between turns?"
   },
   "options": [
    {
     "ar": "10 ms",
     "en": "10 ms"
    },
    {
     "ar": "30 ms",
     "en": "30 ms"
    },
    {
     "ar": "40 ms",
     "en": "40 ms"
    },
    {
     "ar": "100 ms",
     "en": "100 ms"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "تعمل العمليات الثلاث الأخرى 30 ms قبل عودة دورك، فيحصل كل برنامج على 25% من الوقت.",
    "en": "The other three run for 30 ms before your turn returns, so each gets 25% of the time."
   }
  },
  {
   "question": {
    "ar": "ما علاقة Android بـ Linux؟",
    "en": "How is Android related to Linux?"
   },
   "options": [
    {
     "ar": "لا علاقة بينهما",
     "en": "They are unrelated"
    },
    {
     "ar": "Linux مبني فوق Android",
     "en": "Linux is built on top of Android"
    },
    {
     "ar": "Android مبني على نواة Linux",
     "en": "Android is built on the Linux kernel"
    },
    {
     "ar": "Android نسخة من Windows",
     "en": "Android is a copy of Windows"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "Linux اسم النواة، وأندرويد نظام مبني عليها وهو الأكثر استخداماً على الهواتف.",
    "en": "Linux is the kernel's name, and Android is a system built on it and the most widely used phone OS."
   }
  },
  {
   "question": {
    "ar": "لماذا لا ينهار الجهاز كله عندما ينهار تطبيق واحد؟",
    "en": "Why does the whole machine not go down when a single application crashes?"
   },
   "options": [
    {
     "ar": "لأن التطبيقات تعمل بصلاحيات محدودة والنواة وحدها تتحكم بالعتاد",
     "en": "Because applications run with limited privilege and only the kernel controls the hardware"
    },
    {
     "ar": "لأن التطبيقات لا تستخدم المعالج",
     "en": "Because applications do not use the CPU"
    },
    {
     "ar": "لأن النظام يتجاهل الأخطاء",
     "en": "Because the system ignores errors"
    },
    {
     "ar": "لأن الانهيار مستحيل",
     "en": "Because crashes are impossible"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "فصل الامتيازات بين النواة والتطبيقات يعزل أخطاء التطبيق عن بقية النظام.",
    "en": "Privilege separation between kernel and applications isolates an application's faults from the rest."
   }
  }
 ],
 "com-11": [
  {
   "question": {
    "ar": "أنت داخل /home/sara/Documents. إلى أين يشير المسار ../Pictures/trip.jpg؟",
    "en": "You are inside /home/sara/Documents. Where does ../Pictures/trip.jpg point?"
   },
   "options": [
    {
     "ar": "/home/sara/Documents/Pictures/trip.jpg",
     "en": "/home/sara/Documents/Pictures/trip.jpg"
    },
    {
     "ar": "/Pictures/trip.jpg",
     "en": "/Pictures/trip.jpg"
    },
    {
     "ar": "/home/sara/Pictures/trip.jpg",
     "en": "/home/sara/Pictures/trip.jpg"
    },
    {
     "ar": "/home/Pictures/trip.jpg",
     "en": "/home/Pictures/trip.jpg"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "النقطتان .. تعنيان المجلد الأب /home/sara، ثم ندخل Pictures.",
    "en": "The two dots .. mean the parent folder /home/sara, and then we enter Pictures."
   }
  },
  {
   "question": {
    "ar": "غيّرت اسم photo.png إلى photo.txt. ماذا حدث للصورة؟",
    "en": "You renamed photo.png to photo.txt. What happened to the picture?"
   },
   "options": [
    {
     "ar": "صارت نصاً فعلاً",
     "en": "It really became text"
    },
    {
     "ar": "بقي المحتوى كما هو، لكن النظام سيحاول فتحه بمحرر نصوص ويعرض رموزاً غير مفهومة",
     "en": "The content is unchanged, but the system will try a text editor and show meaningless symbols"
    },
    {
     "ar": "حُذفت الصورة",
     "en": "The picture was deleted"
    },
    {
     "ar": "صغر حجمها",
     "en": "Its size shrank"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الامتداد مجرد تلميح لاختيار البرنامج، ولا يغيّر ما بداخل الملف.",
    "en": "The extension is only a hint for choosing a program; it does not change what is inside the file."
   }
  },
  {
   "question": {
    "ar": "في Linux، ما العلاقة بين Report.txt و report.txt؟",
    "en": "On Linux, what is the relation between Report.txt and report.txt?"
   },
   "options": [
    {
     "ar": "ملفان مختلفان لأن حالة الأحرف مهمة",
     "en": "Two different files because letter case matters"
    },
    {
     "ar": "الملف نفسه",
     "en": "The same file"
    },
    {
     "ar": "كلاهما غير مسموح",
     "en": "Both are disallowed"
    },
    {
     "ar": "الثاني نسخة مخفية من الأول",
     "en": "The second is a hidden copy of the first"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "لينكس حساس لحالة الأحرف، بينما يعاملهما ويندوز وماك عادةً كاسم واحد.",
    "en": "Linux is case-sensitive, whereas Windows and macOS normally treat them as one name."
   }
  },
  {
   "question": {
    "ar": "أي اسم ملف غير صالح على ويندوز؟",
    "en": "Which file name is invalid on Windows?"
   },
   "options": [
    {
     "ar": "budget-2026-q1.xlsx",
     "en": "budget-2026-q1.xlsx"
    },
    {
     "ar": "my report.docx",
     "en": "my report.docx"
    },
    {
     "ar": "notes_final.txt",
     "en": "notes_final.txt"
    },
    {
     "ar": "budget:q1?.xlsx",
     "en": "budget:q1?.xlsx"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الرموز : و ؟ و * و | و / و < و > و \" ممنوعة في أسماء الملفات على ويندوز.",
    "en": "The characters : ? * | / < > and \" are forbidden in Windows file names."
   }
  }
 ],
 "com-12": [
  {
   "question": {
    "ar": "ما القيمة العشرية للعدد الثنائي 101101؟",
    "en": "What is the decimal value of the binary number 101101?"
   },
   "options": [
    {
     "ar": "45",
     "en": "45"
    },
    {
     "ar": "54",
     "en": "54"
    },
    {
     "ar": "36",
     "en": "36"
    },
    {
     "ar": "101",
     "en": "101"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "32 + 8 + 4 + 1 = 45، فنجمع قيم الخانات التي تحمل 1.",
    "en": "32 + 8 + 4 + 1 = 45: add the values of the places holding 1."
   }
  },
  {
   "question": {
    "ar": "ما الصيغة السداسية العشرية (Hex) للعدد 156؟",
    "en": "What is the hexadecimal form of 156?"
   },
   "options": [
    {
     "ar": "9C",
     "en": "9C"
    },
    {
     "ar": "C9",
     "en": "C9"
    },
    {
     "ar": "F9",
     "en": "F9"
    },
    {
     "ar": "A6",
     "en": "A6"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "156 = 10011100، المجموعتان 1001 = 9 و1100 = C فتصبح 9C.",
    "en": "156 = 10011100; the groups 1001 = 9 and 1100 = C give 9C."
   }
  },
  {
   "question": {
    "ar": "كم قيمة مختلفة يمكن لـ 8 بتات تمثيلها؟",
    "en": "How many different values can 8 bits represent?"
   },
   "options": [
    {
     "ar": "8",
     "en": "8"
    },
    {
     "ar": "128",
     "en": "128"
    },
    {
     "ar": "255",
     "en": "255"
    },
    {
     "ar": "256",
     "en": "256"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "n بتات تعطي 2^n قيمة، أي 256 قيمة من 0 إلى 255.",
    "en": "n bits give 2^n values, so 256 values from 0 to 255."
   }
  },
  {
   "question": {
    "ar": "في ASCII، ما الفرق بين الرمز '0' والقيمة صفر؟",
    "en": "In ASCII, what is the difference between the character '0' and the value zero?"
   },
   "options": [
    {
     "ar": "لا فرق",
     "en": "There is no difference"
    },
    {
     "ar": "الرمز '0' له الرمز 48 أما القيمة صفر فهي عدد",
     "en": "The character '0' has code 48, while zero is a numeric value"
    },
    {
     "ar": "الرمز '0' له الرمز 0",
     "en": "The character '0' has code 0"
    },
    {
     "ar": "الرمز '0' له الرمز 65",
     "en": "The character '0' has code 65"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الحرف A يساوي 65 والرمز 0 يساوي 48؛ فالرمز مجرد حرف مشفّر وليس قيمة.",
    "en": "A is 65 and the character 0 is 48; a character is just an encoded symbol, not a value."
   }
  }
 ],
 "com-13": [
  {
   "question": {
    "ar": "قرص 256 GB يظهر بنحو 238.4 في ويندوز. لماذا؟",
    "en": "A 256 GB drive shows about 238.4 in Windows. Why?"
   },
   "options": [
    {
     "ar": "بسبب القسمة على 1,073,741,824 بدلاً من 1,000,000,000 (وحدة GiB)",
     "en": "Because it divides by 1,073,741,824 instead of 1,000,000,000 (GiB units)"
    },
    {
     "ar": "بسبب عطل في القرص",
     "en": "Because the drive is faulty"
    },
    {
     "ar": "بسبب فيروس",
     "en": "Because of a virus"
    },
    {
     "ar": "لأن الشركة غشّت",
     "en": "Because the maker cheated"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "ويندوز يكتب GB لما هو فعلاً GiB، والفجوة 7.4% عند مستوى الجيجا.",
    "en": "Windows writes GB for what is really GiB, and the gap is 7.4% at the giga level."
   }
  },
  {
   "question": {
    "ar": "لماذا حُدّت ذاكرة المعالجات 32 بت بنحو 4 GiB؟",
    "en": "Why were 32-bit processors limited to about 4 GiB of memory?"
   },
   "options": [
    {
     "ar": "لأن الذاكرة 4 جيجا فقط في كل الأجهزة",
     "en": "Because every machine only had 4 GB"
    },
    {
     "ar": "لأن 32 بت تعطي 4,294,967,296 عنواناً فقط",
     "en": "Because 32 bits give only 4,294,967,296 addresses"
    },
    {
     "ar": "بسبب سرعة الساعة",
     "en": "Because of clock speed"
    },
    {
     "ar": "بسبب حجم الشاشة",
     "en": "Because of screen size"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "عرض العنوان 32 بت يعني 2^32 موقعاً، أي 4 GiB.",
    "en": "A 32-bit address width means 2^32 locations, which is 4 GiB."
   }
  },
  {
   "question": {
    "ar": "ما حجم صورة 1920×1080 غير مضغوطة بثلاثة بايت لكل بكسل؟",
    "en": "What is the size of an uncompressed 1920 x 1080 image at 3 bytes per pixel?"
   },
   "options": [
    {
     "ar": "نحو 2 MB",
     "en": "About 2 MB"
    },
    {
     "ar": "نحو 600 KB",
     "en": "About 600 KB"
    },
    {
     "ar": "نحو 6.22 MB",
     "en": "About 6.22 MB"
    },
    {
     "ar": "نحو 62 MB",
     "en": "About 62 MB"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "2,073,600 بكسل × 3 = 6,220,800 بايت، أي نحو 6.22 MB.",
    "en": "2,073,600 pixels x 3 = 6,220,800 bytes, about 6.22 MB."
   }
  },
  {
   "question": {
    "ar": "اتصال إنترنت بسرعة 100 Mbps. كم MB/s هي تقريباً؟",
    "en": "An internet connection is 100 Mbps. About how many MB/s is that?"
   },
   "options": [
    {
     "ar": "800 MB/s",
     "en": "800 MB/s"
    },
    {
     "ar": "100 MB/s",
     "en": "100 MB/s"
    },
    {
     "ar": "50 MB/s",
     "en": "50 MB/s"
    },
    {
     "ar": "12.5 MB/s",
     "en": "12.5 MB/s"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الميغابت (b صغيرة) ثُمن الميغابايت، فـ 100 ÷ 8 = 12.5 MB/s.",
    "en": "A megabit (lowercase b) is an eighth of a megabyte, so 100 / 8 = 12.5 MB/s."
   }
  }
 ],
 "com-14": [
  {
   "question": {
    "ar": "ما الفرق الأساسي بين المترجم (Compiler) والمفسّر (Interpreter)؟",
    "en": "What is the main difference between a compiler and an interpreter?"
   },
   "options": [
    {
     "ar": "المترجم يترجم البرنامج كله مسبقاً إلى ملف تنفيذي، والمفسّر ينفذه أثناء التشغيل أمراً أمراً",
     "en": "A compiler translates the whole program in advance into an executable, an interpreter runs it as it goes, command by command"
    },
    {
     "ar": "المترجم أبطأ دائماً",
     "en": "A compiler is always slower"
    },
    {
     "ar": "المفسّر ينتج ملف exe دائماً",
     "en": "An interpreter always produces an exe file"
    },
    {
     "ar": "لا يوجد فرق",
     "en": "There is no difference"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "C و Rust مترجمة غالباً أسرع، وPython و JavaScript مفسّرة أسهل في التجريب.",
    "en": "C and Rust are compiled and usually faster; Python and JavaScript are interpreted and easier to experiment with."
   }
  },
  {
   "question": {
    "ar": "ما الفرق بين Program و Process؟",
    "en": "What is the difference between a program and a process?"
   },
   "options": [
    {
     "ar": "هما اسمان للشيء نفسه",
     "en": "They are two names for the same thing"
    },
    {
     "ar": "البرنامج هو ما يعمل والعملية ملف على القرص",
     "en": "The program is what runs and the process is a file on disk"
    },
    {
     "ar": "البرنامج ملف على القرص والعملية هو أثناء تشغيله وله PID وذاكرة خاصة",
     "en": "A program is a file on disk, while a process is it while running, with a PID and its own memory"
    },
    {
     "ar": "العملية تعمل على القرص فقط",
     "en": "A process lives only on disk"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "يمكن تشغيل البرنامج نفسه مرتين فتحصل على عمليتين لكل منهما PID.",
    "en": "You can launch the same program twice and get two processes, each with its own PID."
   }
  },
  {
   "question": {
    "ar": "لماذا يحمّل المُحمِّل (Loader) البرنامج إلى RAM قبل التنفيذ؟",
    "en": "Why does the loader copy a program into RAM before running it?"
   },
   "options": [
    {
     "ar": "لأن المعالج لا ينفذ مباشرة من القرص البطيء",
     "en": "Because the processor does not execute straight from the slow drive"
    },
    {
     "ar": "لأن RAM أرخص",
     "en": "Because RAM is cheaper"
    },
    {
     "ar": "لحذف الملف من القرص",
     "en": "To delete the file from disk"
    },
    {
     "ar": "لأن القرص لا يحتفظ بالبيانات",
     "en": "Because the drive cannot keep data"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الملف على القرص بيانات خاملة، وينسخه الـ Loader إلى الذاكرة ثم يبدأ Program Counter.",
    "en": "The file on disk is inert data; the loader copies it into memory and then the program counter starts."
   }
  },
  {
   "question": {
    "ar": "ما المقصود بـ Bytecode في Java؟",
    "en": "What is bytecode in Java?"
   },
   "options": [
    {
     "ar": "شيفرة آلة جاهزة للمعالج مباشرة",
     "en": "Machine code ready for the processor directly"
    },
    {
     "ar": "نص يكتبه المستخدم",
     "en": "Text typed by the user"
    },
    {
     "ar": "رمز يُشفّر كلمات المرور",
     "en": "A code that encrypts passwords"
    },
    {
     "ar": "شيفرة وسيطة تعمل على آلة افتراضية",
     "en": "An intermediate code that runs on a virtual machine"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "جافا و C# تُترجمان إلى Bytecode ثم تنفذه آلة افتراضية وغالباً بتقنية JIT.",
    "en": "Java and C# compile to bytecode, which a virtual machine runs, often with JIT compilation."
   }
  }
 ],
 "com-15": [
  {
   "question": {
    "ar": "ما الفرق بين Switch و Router؟",
    "en": "What is the difference between a switch and a router?"
   },
   "options": [
    {
     "ar": "Switch يربط بين شبكات ويستخدم IP، وRouter يربط داخل الشبكة",
     "en": "A switch joins networks using IP, a router joins within a network"
    },
    {
     "ar": "السويتش يربط الأجهزة داخل شبكة واحدة بعنوان MAC، والراوتر يربط بين الشبكات بعنوان IP",
     "en": "A switch joins devices inside one network by MAC address, a router joins between networks by IP address"
    },
    {
     "ar": "لا فرق",
     "en": "There is no difference"
    },
    {
     "ar": "الراوتر يخزّن الملفات",
     "en": "A router stores files"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "في المنزل يجمع صندوق واحد غالباً دور الراوتر ونقطة الوصول وسويتش صغير.",
    "en": "At home one box often combines the roles of router, access point and a small switch."
   }
  },
  {
   "question": {
    "ar": "ما وظيفة DNS؟",
    "en": "What is the job of DNS?"
   },
   "options": [
    {
     "ar": "تشفير الاتصال",
     "en": "Encrypting the connection"
    },
    {
     "ar": "تسريع الشبكة",
     "en": "Speeding up the network"
    },
    {
     "ar": "تحويل اسم مثل example.com إلى عنوان IP",
     "en": "Turning a name such as example.com into an IP address"
    },
    {
     "ar": "منع الإعلانات",
     "en": "Blocking ads"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الناس يتذكرون الأسماء لا الأرقام، فيسأل جهازك خادم DNS ثم يتصل بالعنوان الرقمي.",
    "en": "People remember names, not numbers, so your device asks a DNS server and then connects to the numeric address."
   }
  },
  {
   "question": {
    "ar": "أي عنوان مما يلي ضمن النطاقات الخاصة المخصصة للشبكات المحلية؟",
    "en": "Which of the following addresses is in a private range reserved for local networks?"
   },
   "options": [
    {
     "ar": "8.8.8.8",
     "en": "8.8.8.8"
    },
    {
     "ar": "300.1.1.1",
     "en": "300.1.1.1"
    },
    {
     "ar": "192.168.1.20",
     "en": "192.168.1.20"
    },
    {
     "ar": "256.256.256.256",
     "en": "256.256.256.256"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "النطاق 192.168.x.x خاص ويُعاد استخدامه في بيوت كثيرة، والـ NAT يترجمه إلى عنوانك العام.",
    "en": "The 192.168.x.x range is private and reused in many homes; NAT translates it to your public address."
   }
  },
  {
   "question": {
    "ar": "أظهر ping: 3 packets transmitted, 3 received, time=38.2 ms. ماذا يعني ذلك؟",
    "en": "ping shows: 3 packets transmitted, 3 received, time=38.2 ms. What does it mean?"
   },
   "options": [
    {
     "ar": "لا فقدان للحزم والرحلة ذهاباً وإياباً نحو 38 ms",
     "en": "No packet loss and a round trip of about 38 ms"
    },
    {
     "ar": "فُقدت جميع الحزم",
     "en": "All packets were lost"
    },
    {
     "ar": "سرعة التنزيل 38 ميغابت",
     "en": "Download speed is 38 megabits"
    },
    {
     "ar": "عدد القفزات 38",
     "en": "The hop count is 38"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الحقل time هو زمن الذهاب والإياب (latency)، و0% packet loss يعني وصول كل الحزم.",
    "en": "The time field is the round trip (latency), and 0% packet loss means every packet arrived."
   }
  }
 ]
};
