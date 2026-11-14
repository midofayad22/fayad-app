export const EXTRA = {
 "com-16": [
  {
   "question": {
    "ar": "في الرابط https://shop.example.com/books?q=linux#reviews، أي جزء لا يُرسل إلى الخادم؟",
    "en": "In the link https://shop.example.com/books?q=linux#reviews, which part is not sent to the server?"
   },
   "options": [
    {
     "ar": "q=linux",
     "en": "q=linux"
    },
    {
     "ar": "books",
     "en": "books"
    },
    {
     "ar": "reviews بعد علامة #",
     "en": "reviews after the # sign"
    },
    {
     "ar": "shop.example.com",
     "en": "shop.example.com"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الجزء بعد # (fragment) يبقى في المتصفح ويشير إلى موضع داخل الصفحة فقط.",
    "en": "The fragment after # stays in the browser and only points to a spot inside the page."
   }
  },
  {
   "question": {
    "ar": "فتح المستخدم صفحة فظهر له الرمز 404. ماذا يعني ذلك؟",
    "en": "A user opens a page and sees status 404. What does it mean?"
   },
   "options": [
    {
     "ar": "الخادم نفسه معطّل بسبب خطأ برمجي",
     "en": "The server itself crashed because of a bug"
    },
    {
     "ar": "الخادم يعمل لكنه لم يجد المورد المطلوب",
     "en": "The server works but cannot find the requested resource"
    },
    {
     "ar": "نُقلت الصفحة نقلاً دائماً إلى عنوان آخر",
     "en": "The page was moved permanently to another address"
    },
    {
     "ar": "نجح الطلب وحُمّلت الصفحة",
     "en": "The request succeeded and the page loaded"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "رموز 4xx تدل على خطأ في الطلب، و404 تعني أن المورد غير موجود مثل رابط مكسور.",
    "en": "4xx codes mean a problem with the request, and 404 means the resource is missing, like a broken link."
   }
  },
  {
   "question": {
    "ar": "أي ترتيب صحيح لما يحدث بعد كتابة العنوان والضغط على Enter؟",
    "en": "Which order is correct for what happens after typing an address and pressing Enter?"
   },
   "options": [
    {
     "ar": "TLS ثم DNS ثم HTTP ثم TCP",
     "en": "TLS, then DNS, then HTTP, then TCP"
    },
    {
     "ar": "HTTP ثم DNS ثم TCP ثم TLS",
     "en": "HTTP, then DNS, then TCP, then TLS"
    },
    {
     "ar": "TCP ثم HTTP ثم DNS ثم TLS",
     "en": "TCP, then HTTP, then DNS, then TLS"
    },
    {
     "ar": "DNS ثم TCP ثم TLS ثم طلب HTTP",
     "en": "DNS, then TCP, then TLS, then the HTTP request"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "يُحوَّل الاسم إلى IP أولاً، ثم يُنشأ اتصال TCP، ثم يُؤمَّن بـ TLS، ثم يُرسل طلب HTTP.",
    "en": "The name is resolved to an IP first, then TCP connects, TLS secures it, and only then is the HTTP request sent."
   }
  },
  {
   "question": {
    "ar": "ظهر في تبويب Network أن logo.svg حالته 304 وحجمه من (cache). ماذا يعني؟",
    "en": "In the Network tab, logo.svg shows 304 and is served from cache. What does that mean?"
   },
   "options": [
    {
     "ar": "النسخة المخزنة على جهازك ما زالت صالحة فلم يُعاد إرسال المحتوى",
     "en": "Your cached copy is still valid so the content was not sent again"
    },
    {
     "ar": "الملف غير موجود على الخادم",
     "en": "The file does not exist on the server"
    },
    {
     "ar": "حدث خطأ داخل الخادم",
     "en": "An error occurred inside the server"
    },
    {
     "ar": "الملف نُقل نقلاً دائماً إلى عنوان جديد",
     "en": "The file was moved permanently to a new address"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الرمز 304 يعني أن النسخة المخزنة صالحة، وهذا يوفر الوقت وعرض النطاق.",
    "en": "Code 304 means the cached copy is still good, which saves time and bandwidth."
   }
  }
 ],
 "com-17": [
  {
   "question": {
    "ar": "تسرّبت قاعدة بيانات عملاء شركة وقرأها غرباء. أي هدف من ثلاثية CIA انكسر؟",
    "en": "A company's customer database leaked and strangers read it. Which CIA goal was broken?"
   },
   "options": [
    {
     "ar": "السرية",
     "en": "Confidentiality"
    },
    {
     "ar": "السلامة",
     "en": "Integrity"
    },
    {
     "ar": "التوافر",
     "en": "Availability"
    },
    {
     "ar": "المصادقة فقط",
     "en": "Authentication only"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "قراءة بيانات من غير مصرّح لهم هي خرق للسرية.",
    "en": "Reading data by unauthorised people is a breach of confidentiality."
   }
  },
  {
   "question": {
    "ar": "ملفاتك أصبحت مشفّرة وتظهر رسالة تطلب مبلغاً لفتحها. ما الدفاع الأفضل مسبقاً؟",
    "en": "Your files are encrypted and a message demands payment. What is the best defence in advance?"
   },
   "options": [
    {
     "ar": "دفع المبلغ بسرعة",
     "en": "Pay quickly"
    },
    {
     "ar": "نسخ احتياطي 3-2-1 مجرَّب الاستعادة",
     "en": "A tested 3-2-1 backup"
    },
    {
     "ar": "استخدام كلمة مرور أقصر",
     "en": "Using a shorter password"
    },
    {
     "ar": "إطفاء الجهاز دائماً",
     "en": "Always keeping the device off"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "إذا كانت لديك نسخ احتياطية سليمة تستعيد ملفاتك دون دفع.",
    "en": "With good backups you restore your files without paying."
   }
  },
  {
   "question": {
    "ar": "اتصل شخص يدّعي أنه دعم فني ويطلب رمز التحقق فوراً وإلا أُغلق حسابك. ما التصرف الصحيح؟",
    "en": "Someone claiming to be tech support demands your verification code at once or your account will be closed. What is the right move?"
   },
   "options": [
    {
     "ar": "أعطيه الرمز كي لا يُغلق الحساب",
     "en": "Give the code so the account is not closed"
    },
    {
     "ar": "أرسل الرمز برسالة نصية",
     "en": "Send the code by text"
    },
    {
     "ar": "أتوقف وأتحقق عبر قناة رسمية أخرى",
     "en": "Pause and verify through another official channel"
    },
    {
     "ar": "أغيّر كلمة المرور إلى اسمي",
     "en": "Change the password to my own name"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الاستعجال والخوف سمتان للهندسة الاجتماعية، والحل التحقق من قناة ثانية.",
    "en": "Urgency and fear mark social engineering; the fix is checking through a second channel."
   }
  },
  {
   "question": {
    "ar": "ما الفرق بين التجزئة (Hashing) والتشفير؟",
    "en": "What is the difference between hashing and encryption?"
   },
   "options": [
    {
     "ar": "كلاهما يمكن عكسه بالمفتاح",
     "en": "Both can be reversed with a key"
    },
    {
     "ar": "التجزئة لا يمكن عكسها والتشفير يمكن فكه بالمفتاح",
     "en": "Hashing cannot be reversed while encryption can be undone with the key"
    },
    {
     "ar": "التشفير ينتج دائماً طولاً ثابتاً",
     "en": "Encryption always gives a fixed length"
    },
    {
     "ar": "التجزئة تحتاج مفتاحاً سرياً لفكها",
     "en": "Hashing needs a secret key to undo"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "التجزئة اتجاه واحد وتصلح لكشف التغيير وتخزين كلمات المرور، أما التشفير فيعكس بالمفتاح.",
    "en": "Hashing is one-way, good for detecting change and storing passwords, while encryption is reversed with a key."
   }
  }
 ],
 "com-18": [
  {
   "question": {
    "ar": "أي ترتيب زمني تقريبي صحيح؟",
    "en": "Which approximate chronological order is correct?"
   },
   "options": [
    {
     "ar": "الترانزستور ثم ENIAC ثم Pascaline",
     "en": "Transistor, then ENIAC, then Pascaline"
    },
    {
     "ar": "Pascaline ثم ENIAC ثم الترانزستور",
     "en": "Pascaline, then ENIAC, then the transistor"
    },
    {
     "ar": "ENIAC ثم Pascaline ثم الترانزستور",
     "en": "ENIAC, then Pascaline, then the transistor"
    },
    {
     "ar": "Pascaline ثم الترانزستور ثم ENIAC",
     "en": "Pascaline, then the transistor, then ENIAC"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "Pascaline عام 1642 وENIAC نحو 1946 والترانزستور 1947.",
    "en": "The Pascaline is from 1642, ENIAC about 1946 and the transistor 1947."
   }
  },
  {
   "question": {
    "ar": "أي ابتكار وضع وحدة المعالجة المركزية كاملة على شريحة واحدة عام 1971؟",
    "en": "Which invention put a whole CPU on one chip in 1971?"
   },
   "options": [
    {
     "ar": "الدارة المتكاملة",
     "en": "The integrated circuit"
    },
    {
     "ar": "المعالج الدقيق Intel 4004",
     "en": "The Intel 4004 microprocessor"
    },
    {
     "ar": "الأنبوب المفرغ",
     "en": "The vacuum tube"
    },
    {
     "ar": "الترانزستور",
     "en": "The transistor"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الدارة المتكاملة جمعت عدة ترانزستورات، أما 4004 فجمع المعالج كله في شريحة وبدأ الجيل الرابع.",
    "en": "The integrated circuit combined transistors, while the 4004 put the whole processor on a chip, starting the fourth generation."
   }
  },
  {
   "question": {
    "ar": "ما الذي حلّ محل الأنبوب المفرغ فجعل الحواسيب أصغر وأوثق في الجيل الثاني؟",
    "en": "What replaced the vacuum tube, making second generation computers smaller and more reliable?"
   },
   "options": [
    {
     "ar": "المعالج الدقيق",
     "en": "The microprocessor"
    },
    {
     "ar": "الذاكرة العشوائية",
     "en": "RAM"
    },
    {
     "ar": "الترانزستور",
     "en": "The transistor"
    },
    {
     "ar": "بطاقات جاكار المثقبة",
     "en": "Jacquard punched cards"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الترانزستور مفتاح إلكتروني صغير أقل حرارة وأعطالاً من الأنبوب.",
    "en": "The transistor is a small electronic switch with less heat and fewer failures than a tube."
   }
  },
  {
   "question": {
    "ar": "أي عبارة عن قانون مور هي الأدق؟",
    "en": "Which statement about Moore's law is the most accurate?"
   },
   "options": [
    {
     "ar": "قانون فيزيائي لا يتخلف أبداً",
     "en": "A law of physics that never fails"
    },
    {
     "ar": "ملاحظة بأن عدد الترانزستورات في الشريحة تضاعف تقريباً كل بضع سنوات",
     "en": "An observation that transistors per chip roughly doubled every couple of years"
    },
    {
     "ar": "يعني أن سرعة الإنترنت تتضاعف كل سنة",
     "en": "It says internet speed doubles every year"
    },
    {
     "ar": "يعني أن الأسعار ترتفع كل عام",
     "en": "It says prices rise every year"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "هو ملاحظة تاريخية لا قانون طبيعي، وبدأ تباطؤها مع الحدود الفيزيائية.",
    "en": "It is a historical observation, not a natural law, and it has slowed near physical limits."
   }
  }
 ],
 "com-19": [
  {
   "question": {
    "ar": "شركة تحتاج خادماً افتراضياً لتثبّت عليه نظامها وبرامجها بنفسها. أي نموذج يناسبها؟",
    "en": "A company needs a virtual server on which it installs its own OS and software. Which model fits?"
   },
   "options": [
    {
     "ar": "SaaS",
     "en": "SaaS"
    },
    {
     "ar": "IaaS",
     "en": "IaaS"
    },
    {
     "ar": "PaaS",
     "en": "PaaS"
    },
    {
     "ar": "IoT",
     "en": "IoT"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "IaaS يعطيك الخادم والشبكة والتخزين وتدير أنت النظام والبرامج.",
    "en": "IaaS gives servers, network and storage while you manage the OS and software."
   }
  },
  {
   "question": {
    "ar": "ما الفرق الأساسي بين الحاوية والآلة الافتراضية؟",
    "en": "What is the main difference between a container and a virtual machine?"
   },
   "options": [
    {
     "ar": "الحاوية تحمل نظام تشغيل كاملاً خاصاً بها",
     "en": "A container carries its own full operating system"
    },
    {
     "ar": "الآلة الافتراضية تشارك نواة المضيف دائماً",
     "en": "A VM always shares the host kernel"
    },
    {
     "ar": "الحاوية تشارك نواة النظام المضيف فتبدأ أسرع وأخف",
     "en": "A container shares the host kernel so it starts faster and is lighter"
    },
    {
     "ar": "لا فرق بينهما في العزل",
     "en": "There is no difference in isolation"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "مشاركة النواة تجعل الحاوية أخف لكن عزلها أضعف من الآلة الافتراضية.",
    "en": "Sharing the kernel makes a container lighter but its isolation is weaker than a VM."
   }
  },
  {
   "question": {
    "ar": "كاميرا ذكية تكتشف الحركة بنفسها وترفع مقطعاً قصيراً بدل بث ساعات. ما هذا النمط؟",
    "en": "A smart camera detects motion itself and uploads a short clip instead of streaming hours. What is this pattern?"
   },
   "options": [
    {
     "ar": "الحوسبة الطرفية",
     "en": "Edge computing"
    },
    {
     "ar": "الحوسبة السحابية الكاملة",
     "en": "Pure cloud computing"
    },
    {
     "ar": "التجزئة",
     "en": "Hashing"
    },
    {
     "ar": "الترحيل الدائم للبيانات",
     "en": "Permanent data migration"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "معالجة جزء من البيانات قرب مصدرها توفر النطاق وتقلل التأخير.",
    "en": "Processing data near its source saves bandwidth and cuts latency."
   }
  },
  {
   "question": {
    "ar": "أي جملة صحيحة عن تعلّم الآلة؟",
    "en": "Which statement about machine learning is correct?"
   },
   "options": [
    {
     "ar": "النموذج لا يخطئ أبداً",
     "en": "The model never makes mistakes"
    },
    {
     "ar": "يتدرب على أمثلة كثيرة فيتعلم النمط وقد يخطئ فيحتاج مراجعة بشرية",
     "en": "It trains on many examples to learn patterns and can be wrong, needing human review"
    },
    {
     "ar": "المبرمج يكتب كل القواعد يدوياً",
     "en": "The programmer writes every rule by hand"
    },
    {
     "ar": "التدريب أخف من الاستخدام",
     "en": "Training is lighter than using the model"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "النموذج يتنبأ بما يشبه أمثلته، لذلك تلزم المراجعة في المواقف المهمة.",
    "en": "A model predicts what resembles its examples, so important cases need human review."
   }
  }
 ],
 "com-20": [
  {
   "question": {
    "ar": "أي مكوّن يخزّن البيانات مؤقتاً بسرعة عالية أثناء عمل البرامج؟",
    "en": "Which component temporarily stores data at high speed while programs run?"
   },
   "options": [
    {
     "ar": "RAM",
     "en": "RAM"
    },
    {
     "ar": "القرص الصلب فقط",
     "en": "The hard disk only"
    },
    {
     "ar": "مزوّد الطاقة",
     "en": "The power supply"
    },
    {
     "ar": "لوحة المفاتيح",
     "en": "The keyboard"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "RAM ذاكرة سريعة مؤقتة تفقد محتواها عند انقطاع الكهرباء.",
    "en": "RAM is fast temporary memory and loses its contents without power."
   }
  },
  {
   "question": {
    "ar": "ما الفرق بين الإنترنت والويب؟",
    "en": "What is the difference between the Internet and the Web?"
   },
   "options": [
    {
     "ar": "هما اسمان للشيء نفسه",
     "en": "They are two names for the same thing"
    },
    {
     "ar": "الويب هو الكابلات والإنترنت هو المتصفح",
     "en": "The Web is the cables and the Internet is the browser"
    },
    {
     "ar": "الإنترنت شبكة الشبكات والويب خدمة تعمل فوقها",
     "en": "The Internet is the network of networks and the Web is a service on top of it"
    },
    {
     "ar": "الويب أقدم من الإنترنت",
     "en": "The Web is older than the Internet"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "البريد والألعاب تستعمل الإنترنت دون أن تكون جزءاً من الويب.",
    "en": "Email and games use the Internet without being part of the Web."
   }
  },
  {
   "question": {
    "ar": "كيف يخزّن الحاسوب النصوص والصور والصوت في النهاية؟",
    "en": "How does a computer ultimately store text, images and sound?"
   },
   "options": [
    {
     "ar": "كأرقام ثنائية من 0 و1",
     "en": "As binary numbers made of 0s and 1s"
    },
    {
     "ar": "كحروف عربية فقط",
     "en": "As Arabic letters only"
    },
    {
     "ar": "كرسومات صغيرة داخل المعالج",
     "en": "As tiny drawings inside the CPU"
    },
    {
     "ar": "كل نوع بنظام مختلف تماماً غير رقمي",
     "en": "Each type in an entirely non-digital system"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "كل البيانات تُمثّل بالبتات، والبرامج تفسّرها نصاً أو صورة أو صوتاً.",
    "en": "All data is represented in bits, and programs interpret them as text, images or sound."
   }
  },
  {
   "question": {
    "ar": "أي سطر يصف علاقة نظام التشغيل بالعتاد والبرامج؟",
    "en": "Which line best describes the operating system's relation to hardware and applications?"
   },
   "options": [
    {
     "ar": "يمنع البرامج من استخدام العتاد نهائياً",
     "en": "It forbids applications from using hardware at all"
    },
    {
     "ar": "يعمل وسيطاً يدير العتاد ويتيح للبرامج استخدامه",
     "en": "It acts as a go-between, managing hardware and letting applications use it"
    },
    {
     "ar": "هو جزء من اللوحة الأم لا يمكن تغييره",
     "en": "It is part of the motherboard and cannot change"
    },
    {
     "ar": "يعمل فقط عند الاتصال بالإنترنت",
     "en": "It only works when online"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "نظام التشغيل يدير الموارد ويقدّم واجهة موحدة للبرامج.",
    "en": "The OS manages resources and gives applications a uniform interface."
   }
  }
 ],
 "com-21": [
  {
   "question": {
    "ar": "لماذا ينهار المتصفح وحده عند وقوع خطأ فيه بينما قد يُسقط خطأ في مشغّل جهاز النظام كله؟",
    "en": "Why does a bug in the browser crash only the browser, while a bug in a device driver can bring down the whole system?"
   },
   "options": [
    {
     "ar": "المتصفح يعمل في Kernel Space",
     "en": "The browser runs in Kernel Space"
    },
    {
     "ar": "المشغّل يعمل في User Space بلا صلاحيات",
     "en": "The driver runs in User Space with no privileges"
    },
    {
     "ar": "المتصفح معزول في User Space والمشغّل يعمل بصلاحيات كاملة داخل النواة",
     "en": "The browser is isolated in User Space while the driver runs with full privilege in the kernel"
    },
    {
     "ar": "كلاهما يعمل بالصلاحيات نفسها",
     "en": "Both run with the same privileges"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "خطأ في الفضاء الكامل الصلاحيات قد يفسد الذاكرة والعتاد، أما خطأ التطبيق فيُنهى عمليته فقط.",
    "en": "A fault in fully privileged space can corrupt memory and hardware, while an application fault only ends that process."
   }
  },
  {
   "question": {
    "ar": "أي نواة تُبقي الحد الأدنى فيها وتشغّل باقي الخدمات كعمليات عادية؟",
    "en": "Which kernel keeps only the minimum inside and runs other services as ordinary processes?"
   },
   "options": [
    {
     "ar": "النواة المتراصة",
     "en": "Monolithic kernel"
    },
    {
     "ar": "النواة الدقيقة",
     "en": "Microkernel"
    },
    {
     "ar": "لا يوجد هذا النوع",
     "en": "No such type exists"
    },
    {
     "ar": "نواة المتصفح",
     "en": "A browser kernel"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "النواة الدقيقة مثل MINIX وQNX أعزل لكنها أبطأ قليلاً.",
    "en": "A microkernel such as MINIX or QNX is more isolated but slightly slower."
   }
  },
  {
   "question": {
    "ar": "أي عبارة تخلط بين النواة ونظام التشغيل؟",
    "en": "Which statement confuses the kernel with the operating system?"
   },
   "options": [
    {
     "ar": "النواة جزء من نظام التشغيل",
     "en": "The kernel is part of the operating system"
    },
    {
     "ar": "Ubuntu نواة Linux مع مكتبات وأدوات وسطح مكتب",
     "en": "Ubuntu is the Linux kernel plus libraries, tools and a desktop"
    },
    {
     "ar": "النواة هي نظام التشغيل كله ولا شيء غيرها",
     "en": "The kernel is the entire operating system and nothing else"
    },
    {
     "ar": "Linux بالمعنى الدقيق نواة فقط",
     "en": "Strictly, Linux is only a kernel"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "النواة جزء من النظام وليست كله، فالنظام يشمل المكتبات والأدوات أيضاً.",
    "en": "The kernel is part of the system, not all of it; libraries and tools belong too."
   }
  },
  {
   "question": {
    "ar": "ماذا يحدث عندما ينفّذ تطبيق في User Mode تعليمة حساسة كتعديل جداول الذاكرة؟",
    "en": "What happens when an application in User Mode runs a sensitive instruction like changing memory tables?"
   },
   "options": [
    {
     "ar": "تُنفَّذ بصمت",
     "en": "It runs silently"
    },
    {
     "ar": "يرفضها المعالج ويُطلق استثناءً يعالجه النظام",
     "en": "The CPU refuses it and raises an exception handled by the OS"
    },
    {
     "ar": "يعيد الحاسوب التشغيل فوراً",
     "en": "The computer reboots immediately"
    },
    {
     "ar": "تُنقل إلى القرص",
     "en": "It is moved to disk"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المعالج نفسه يفرض الفصل بين الأوضاع ويمنع التعليمات الحساسة خارج وضع النواة.",
    "en": "The CPU itself enforces the mode split and blocks sensitive instructions outside kernel mode."
   }
  }
 ],
 "com-22": [
  {
   "question": {
    "ar": "ما الدور الذي يؤديه الرقم 3 في الناتج openat(...) = 3؟",
    "en": "What role does the number 3 play in openat(...) = 3?"
   },
   "options": [
    {
     "ar": "حجم الملف بالبايت",
     "en": "The file size in bytes"
    },
    {
     "ar": "واصف ملف يمنحه النواة للملف المفتوح",
     "en": "A file descriptor the kernel gives to the open file"
    },
    {
     "ar": "رقم العملية PID",
     "en": "The process PID"
    },
    {
     "ar": "رمز الخطأ",
     "en": "An error code"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الواصف مقبض تستعمله الاستدعاءات التالية مثل read وclose للإشارة إلى الملف.",
    "en": "The descriptor is a handle later calls like read and close use to refer to the file."
   }
  },
  {
   "question": {
    "ar": "ما الخطأ في العبارة: الصدفة shell جزء من النواة؟",
    "en": "What is wrong with the statement: the shell is part of the kernel?"
   },
   "options": [
    {
     "ar": "لا خطأ فيها",
     "en": "Nothing is wrong"
    },
    {
     "ar": "الصدفة برنامج عادي في User Space يطلب من النواة تشغيل البرامج",
     "en": "The shell is an ordinary User Space program that asks the kernel to run programs"
    },
    {
     "ar": "الصدفة عتاد",
     "en": "The shell is hardware"
    },
    {
     "ar": "الصدفة تعمل في Kernel Mode دائماً",
     "en": "The shell always runs in Kernel Mode"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الصدفة تطبيق مثل غيره، سواء نصية كـ Bash أو رسومية كسطح المكتب.",
    "en": "The shell is an application like any other, text-based like Bash or graphical like a desktop."
   }
  },
  {
   "question": {
    "ar": "أي ترتيب صحيح لقراءة ملف؟",
    "en": "Which order is correct when reading a file?"
   },
   "options": [
    {
     "ar": "النواة تقرأ ثم المكتبة تتصل ثم التطبيق",
     "en": "Kernel reads, then library calls, then the application"
    },
    {
     "ar": "التطبيق يستدعي دالة مكتبة، ثم تعليمة trap، ثم تفحص النواة وتقرأ، ثم تعود البيانات",
     "en": "The app calls a library function, then the trap instruction, then the kernel checks and reads, then data returns"
    },
    {
     "ar": "التطبيق يقرأ القرص مباشرة ثم يخبر النواة",
     "en": "The app reads the disk directly then tells the kernel"
    },
    {
     "ar": "trap أولاً ثم التطبيق ثم المكتبة",
     "en": "Trap first, then the app, then the library"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الانتقال إلى وضع النواة يتم بتعليمة معالج خاصة، والنواة تتحقق من الأذونات قبل القراءة.",
    "en": "A special CPU instruction enters kernel mode, and the kernel checks permissions before reading."
   }
  },
  {
   "question": {
    "ar": "لماذا تجمّع المكتبات العمليات الصغيرة في دفعات (buffering)؟",
    "en": "Why do libraries batch small operations (buffering)?"
   },
   "options": [
    {
     "ar": "لأن استدعاء النظام أبطأ من استدعاء دالة عادية فتقلّ مرات دخول النواة",
     "en": "Because a system call is slower than a normal function call, so entries into the kernel are reduced"
    },
    {
     "ar": "لأن النواة لا تقبل أكثر من بايت واحد",
     "en": "Because the kernel accepts only one byte"
    },
    {
     "ar": "لتخفي الملفات عن المستخدم",
     "en": "To hide files from the user"
    },
    {
     "ar": "لتزيد عدد استدعاءات النظام",
     "en": "To increase the number of system calls"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "كل دخول للنواة له كلفة، فتجميع العمليات يخفضها.",
    "en": "Each kernel entry has a cost, so batching lowers it."
   }
  }
 ],
 "com-23": [
  {
   "question": {
    "ar": "شغّلت المحرر نفسه مرتين. كم برنامجاً وكم عملية لديك؟",
    "en": "You launched the same editor twice. How many programs and processes do you have?"
   },
   "options": [
    {
     "ar": "برنامجان وعملية واحدة",
     "en": "Two programs and one process"
    },
    {
     "ar": "برنامج واحد وعمليتان",
     "en": "One program and two processes"
    },
    {
     "ar": "برنامج واحد وعملية واحدة",
     "en": "One program and one process"
    },
    {
     "ar": "برنامجان وعمليتان",
     "en": "Two programs and two processes"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "البرنامج ملف واحد على القرص، وكل تشغيل عملية مستقلة بمعرّفها PID.",
    "en": "The program is one file on disk, and each run is a separate process with its own PID."
   }
  },
  {
   "question": {
    "ar": "عملية تنتظر انتهاء قراءة من القرص. في أي حالة هي؟",
    "en": "A process is waiting for a disk read to finish. Which state is it in?"
   },
   "options": [
    {
     "ar": "Running",
     "en": "Running"
    },
    {
     "ar": "Ready",
     "en": "Ready"
    },
    {
     "ar": "Waiting",
     "en": "Waiting"
    },
    {
     "ar": "Terminated",
     "en": "Terminated"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "حالة Waiting تعني انتظار حدث مثل إنهاء القراءة أو ضغطة مفتاح.",
    "en": "Waiting means waiting for an event such as a finished read or a key press."
   }
  },
  {
   "question": {
    "ar": "أي مما يلي تخزّنه النواة في PCB؟",
    "en": "Which of these does the kernel store in the PCB?"
   },
   "options": [
    {
     "ar": "كلمة مرور المستخدم",
     "en": "The user's password"
    },
    {
     "ar": "المعرّف PID وحالة العملية وقيم المسجلات والملفات المفتوحة",
     "en": "The PID, process state, register values and open files"
    },
    {
     "ar": "محتوى الشاشة",
     "en": "The screen contents"
    },
    {
     "ar": "سجل الإنترنت",
     "en": "The browsing history"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "PCB جدول يحفظ ما يلزم لإيقاف العملية واستئنافها.",
    "en": "The PCB holds what is needed to pause and resume a process."
   }
  },
  {
   "question": {
    "ar": "ما المشكلة في أن خيطين يعدّلان المتغير المشترك نفسه دون قفل؟",
    "en": "What is the problem when two threads change the same shared variable without a lock?"
   },
   "options": [
    {
     "ar": "لا مشكلة لأن كل خيط له ذاكرة مستقلة",
     "en": "None, since each thread has separate memory"
    },
    {
     "ar": "حالة سباق تتغير فيها النتيجة بحسب توقيت الخيوط",
     "en": "A race condition where the result depends on thread timing"
    },
    {
     "ar": "تتحول الخيوط إلى عمليات",
     "en": "The threads turn into processes"
    },
    {
     "ar": "يتوقف المعالج نهائياً",
     "en": "The CPU stops permanently"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الخيوط تتشارك ذاكرة العملية، فالوصول غير المنسّق يعطي نتائج غير متوقعة.",
    "en": "Threads share the process memory, so uncoordinated access gives unpredictable results."
   }
  }
 ],
 "com-24": [
  {
   "question": {
    "ar": "ثلاث عمليات تصل عند 0 بأزمنة 8 و4 و2 ms بهذا الترتيب في FCFS. ما متوسط الانتظار؟",
    "en": "Three processes arrive at 0 needing 8, 4 and 2 ms in that order under FCFS. What is the average wait?"
   },
   "options": [
    {
     "ar": "2.67 ms",
     "en": "2.67 ms"
    },
    {
     "ar": "4.67 ms",
     "en": "4.67 ms"
    },
    {
     "ar": "6.67 ms",
     "en": "6.67 ms"
    },
    {
     "ar": "14 ms",
     "en": "14 ms"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الانتظار 0 و8 و12، والمجموع 20 مقسوماً على 3 يساوي 6.67.",
    "en": "Waits are 0, 8 and 12; the sum 20 divided by 3 is 6.67."
   }
  },
  {
   "question": {
    "ar": "ما سلبية الجدولة بالأولوية البسيطة؟",
    "en": "What is the drawback of simple priority scheduling?"
   },
   "options": [
    {
     "ar": "لا تُعطي أي عملية وقتاً",
     "en": "It gives no process any time"
    },
    {
     "ar": "قد تتجوّع العمليات منخفضة الأولوية ويحلّها التقادم (aging)",
     "en": "Low-priority processes may starve, fixed with aging"
    },
    {
     "ar": "تحتاج دائماً معالجاً واحداً",
     "en": "It always needs a single CPU"
    },
    {
     "ar": "تلغي تبديل السياق",
     "en": "It removes context switching"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الأولوية العالية تسبق دائماً، فالتقادم يرفع أولوية من طال انتظاره.",
    "en": "High priorities always go first, so aging raises the priority of long-waiting processes."
   }
  },
  {
   "question": {
    "ar": "في Round Robin ماذا يحدث عند انتهاء شريحة الوقت (quantum) والعملية لم تنتهِ؟",
    "en": "In Round Robin, what happens when the quantum ends and the process is not finished?"
   },
   "options": [
    {
     "ar": "تُنهى العملية فوراً",
     "en": "The process is terminated at once"
    },
    {
     "ar": "تعود إلى نهاية الطابور وتأخذ العملية التالية دورها",
     "en": "It goes to the back of the queue and the next process gets its turn"
    },
    {
     "ar": "تأخذ المعالج للأبد",
     "en": "It keeps the CPU forever"
    },
    {
     "ar": "تُحذف من الذاكرة",
     "en": "It is removed from memory"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المشاركة بالتناوب تمنح الجميع حصصاً عادلة، لكن الشريحة الصغيرة جداً تكثر التبديلات.",
    "en": "Taking turns gives everyone a fair share, but a tiny quantum causes many switches."
   }
  },
  {
   "question": {
    "ar": "ما معنى تبديل السياق (context switch)؟",
    "en": "What does a context switch involve?"
   },
   "options": [
    {
     "ar": "حفظ حالة العملية الحالية وتحميل حالة التالية",
     "en": "Saving the current process state and loading the next one's"
    },
    {
     "ar": "إعادة تشغيل الحاسوب",
     "en": "Rebooting the computer"
    },
    {
     "ar": "نسخ القرص إلى RAM",
     "en": "Copying the disk to RAM"
    },
    {
     "ar": "تغيير لغة النظام",
     "en": "Changing the system language"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "التبديل ضروري للمشاركة لكنه ليس مجانياً فيستهلك وقتاً.",
    "en": "Switching enables sharing but is not free; it costs time."
   }
  }
 ],
 "com-25": [
  {
   "question": {
    "ar": "بصفحة 4096 بايت، ما رقم الصفحة والإزاحة للعنوان 0x00005FFF؟",
    "en": "With 4096-byte pages, what are the page number and offset of address 0x00005FFF?"
   },
   "options": [
    {
     "ar": "الصفحة 5 والإزاحة 0xFFF",
     "en": "Page 5, offset 0xFFF"
    },
    {
     "ar": "الصفحة 0xFFF والإزاحة 5",
     "en": "Page 0xFFF, offset 5"
    },
    {
     "ar": "الصفحة 6 والإزاحة 0",
     "en": "Page 6, offset 0"
    },
    {
     "ar": "الصفحة 4 والإزاحة 0x5FF",
     "en": "Page 4, offset 0x5FF"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الإزاحة هي آخر 12 بت (0xFFF) ورقم الصفحة هو الإزاحة اليمنى بـ 12 أي 5.",
    "en": "The offset is the low 12 bits (0xFFF) and the page number is the address shifted right by 12, which is 5."
   }
  },
  {
   "question": {
    "ar": "ما الخطأ في قول: الذاكرة الافتراضية تعني زيادة في RAM؟",
    "en": "What is wrong with saying virtual memory means extra RAM?"
   },
   "options": [
    {
     "ar": "لا خطأ فيه",
     "en": "Nothing is wrong"
    },
    {
     "ar": "هي تجريد وحماية، والمبادلة swap أبطأ من RAM بكثير",
     "en": "It is an abstraction plus protection, and swap is far slower than RAM"
    },
    {
     "ar": "هي آلة افتراضية كاملة",
     "en": "It is a full virtual machine"
    },
    {
     "ar": "هي ذاكرة أسرع من RAM",
     "en": "It is memory faster than RAM"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الذاكرة الافتراضية تعطي كل عملية فضاء عناوين خاصاً، ولا تزيد سعة RAM الحقيقية ولا سرعتها.",
    "en": "It gives each process a private address space and adds neither real capacity nor speed."
   }
  },
  {
   "question": {
    "ar": "الجهاز يصبح بطيئاً جداً لأن النواة تنقل الصفحات بين RAM والقرص باستمرار. ما اسم الحالة؟",
    "en": "A machine becomes extremely slow because the kernel constantly moves pages between RAM and disk. What is this called?"
   },
   "options": [
    {
     "ar": "Paging المثالي",
     "en": "Ideal paging"
    },
    {
     "ar": "Thrashing",
     "en": "Thrashing"
    },
    {
     "ar": "Booting",
     "en": "Booting"
    },
    {
     "ar": "Caching",
     "en": "Caching"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "كثرة أخطاء الصفحات تدل على ضغط الذاكرة وتسمى thrashing.",
    "en": "Constant page faults signal memory pressure and are called thrashing."
   }
  },
  {
   "question": {
    "ar": "ماذا يحدث عندما تحاول عملية لمس عنوان محظور؟",
    "en": "What happens when a process touches a forbidden address?"
   },
   "options": [
    {
     "ar": "تحصل على RAM إضافية",
     "en": "It gets extra RAM"
    },
    {
     "ar": "تُنفَّذ العملية بسرعة أكبر",
     "en": "It runs faster"
    },
    {
     "ar": "يحدث segmentation fault وتنهي النواة العملية",
     "en": "A segmentation fault occurs and the kernel terminates the process"
    },
    {
     "ar": "يُعاد تشغيل النظام كله",
     "en": "The whole system restarts"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "لكل صفحة أذونات قراءة وكتابة وتنفيذ، ومخالفتها تُنهي العملية المخالفة فقط.",
    "en": "Each page has read, write and execute permissions, and violating them ends only the offending process."
   }
  }
 ],
 "com-26": [
  {
   "question": {
    "ar": "لماذا حذف ملف ضخم فوري بينما نسخه يستغرق وقتاً؟",
    "en": "Why is deleting a huge file instant while copying it takes time?"
   },
   "options": [
    {
     "ar": "الحذف يمحو كل البايتات بسرعة",
     "en": "Deleting erases every byte quickly"
    },
    {
     "ar": "الحذف يزيل مدخل الدليل ويحرر الكتل دون مسح المحتوى، والنسخ يقرأ كل كتلة ويكتبها",
     "en": "Deleting removes the directory entry and frees blocks without erasing content, while copying reads and writes every block"
    },
    {
     "ar": "النسخ يحذف الأصل أولاً",
     "en": "Copying deletes the original first"
    },
    {
     "ar": "لا فرق بينهما",
     "en": "There is no difference"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "لذلك يمكن أحياناً استرجاع ملف محذوف قبل أن تُكتب بيانات جديدة فوقه.",
    "en": "That is why a deleted file can sometimes be recovered before new data overwrites it."
   }
  },
  {
   "question": {
    "ar": "ما فائدة الـ Journaling؟",
    "en": "What is the benefit of journaling?"
   },
   "options": [
    {
     "ar": "يضغط الملفات",
     "en": "It compresses files"
    },
    {
     "ar": "يسجّل العملية في سجل قبل تنفيذها فيصلح النظام نفسه بعد انقطاع الكهرباء",
     "en": "It logs an operation before doing it so the system can repair itself after a power cut"
    },
    {
     "ar": "يشفّر القرص",
     "en": "It encrypts the disk"
    },
    {
     "ar": "يزيد حجم القرص",
     "en": "It enlarges the disk"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "يعيد النظام تنفيذ السجل بدل فحص القرص كله.",
    "en": "The system replays the log instead of scanning the whole disk."
   }
  },
  {
   "question": {
    "ar": "ما سبب فشل نسخ ملف حجمه 6 GB إلى فلاشة بنظام FAT32؟",
    "en": "Why does copying a 6 GB file to a FAT32 flash drive fail?"
   },
   "options": [
    {
     "ar": "FAT32 يعمل على macOS فقط",
     "en": "FAT32 works only on macOS"
    },
    {
     "ar": "FAT32 لا يقبل ملفاً أكبر من 4 GB",
     "en": "FAT32 cannot hold a file over 4 GB"
    },
    {
     "ar": "الفلاشة لا تدعم الملفات",
     "en": "Flash drives do not support files"
    },
    {
     "ar": "الملف بلا اسم",
     "en": "The file has no name"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "حدّ الحجم هو قيد معروف في FAT32، وحلّه exFAT أو NTFS.",
    "en": "The size limit is a known FAT32 restriction; exFAT or NTFS solves it."
   }
  },
  {
   "question": {
    "ar": "لماذا يجب «إخراج» الفلاشة بأمان؟",
    "en": "Why should you safely eject a flash drive?"
   },
   "options": [
    {
     "ar": "لأن النظام يغيّر اسمها",
     "en": "Because the system renames it"
    },
    {
     "ar": "لأن الإخراج يزيد سعتها",
     "en": "Because ejecting increases capacity"
    },
    {
     "ar": "لأن الكتابة قد تكون مؤجلة في الذاكرة المؤقتة فيتلف الملف إن سُحبت مبكراً",
     "en": "Because writes may be delayed in the cache and the file can be corrupted if pulled early"
    },
    {
     "ar": "لأن الفلاشة تنفجر",
     "en": "Because the drive would explode"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "النواة تكتب في page cache أولاً ثم تنقل إلى القرص لاحقاً، والإخراج يُنهي ذلك.",
    "en": "The kernel writes to the page cache first and flushes later, and ejecting finishes that."
   }
  }
 ],
 "com-27": [
  {
   "question": {
    "ar": "ماذا تفعل المشغّلات (drivers)؟",
    "en": "What does a driver do?"
   },
   "options": [
    {
     "ar": "تترجم بين واجهة موحدة يعرفها النظام ولغة عتاد محدد",
     "en": "Translates between a uniform interface the OS knows and the language of specific hardware"
    },
    {
     "ar": "تزيد حجم الشاشة",
     "en": "Enlarges the screen"
    },
    {
     "ar": "تحذف الملفات القديمة",
     "en": "Deletes old files"
    },
    {
     "ar": "تستبدل المعالج",
     "en": "Replaces the CPU"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "بفضلها يطلب التطبيق «اطبع» ويعرف المشغّل كيف يكلّم هذه الطابعة بالذات.",
    "en": "Thanks to it, an app says print and the driver knows how to talk to that exact printer."
   }
  },
  {
   "question": {
    "ar": "ما فائدة DMA؟",
    "en": "What is the benefit of DMA?"
   },
   "options": [
    {
     "ar": "تستبدل المقاطعات بالاستطلاع",
     "en": "It replaces interrupts with polling"
    },
    {
     "ar": "تنقل كتل كبيرة بين الجهاز وRAM دون أن يحرّك المعالج كل بايت",
     "en": "It moves large blocks between a device and RAM without the CPU moving each byte"
    },
    {
     "ar": "تجعل المعالج يستعلم عن الجهاز باستمرار",
     "en": "It makes the CPU keep asking the device"
    },
    {
     "ar": "تشفّر القرص",
     "en": "It encrypts the disk"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "بعد الانتهاء تُطلق DMA مقاطعة واحدة فيتفرغ المعالج لعمل آخر.",
    "en": "When done, DMA raises one interrupt, leaving the CPU free for other work."
   }
  },
  {
   "question": {
    "ar": "بعد تحديث مشغّل الشاشة ظهرت مشكلة ولم تحتفظ بالإصدار السابق. ما الخطأ الشائع هنا؟",
    "en": "After a graphics driver update a problem appeared and you kept no earlier version. What common mistake is this?"
   },
   "options": [
    {
     "ar": "الكتابة بسرعة",
     "en": "Typing too fast"
    },
    {
     "ar": "تشغيل الجهاز صباحاً",
     "en": "Turning on the device in the morning"
    },
    {
     "ar": "تحديث المشغّل دون نقطة استعادة أو المثبّت القديم",
     "en": "Updating a driver without a restore point or the old installer"
    },
    {
     "ar": "استخدام الشاشة طويلاً",
     "en": "Using the screen too long"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "كثير من المشاكل سببها مشغّلات غير متوافقة، فالاحتفاظ بنسخة قديمة يسهّل التراجع.",
    "en": "Many problems come from incompatible drivers, so keeping the old one makes rollback easy."
   }
  },
  {
   "question": {
    "ar": "لماذا يجب الحذر من تثبيت مشغّل من مصدر غير موثوق؟",
    "en": "Why be careful installing a driver from an untrusted source?"
   },
   "options": [
    {
     "ar": "لأنه يستهلك حبراً",
     "en": "Because it uses ink"
    },
    {
     "ar": "لأنه يغيّر لغة النظام",
     "en": "Because it changes the system language"
    },
    {
     "ar": "لا خطر منه",
     "en": "There is no risk"
    },
    {
     "ar": "لأنه يعمل غالباً بصلاحيات النواة فقد يمنح المهاجم سيطرة كاملة",
     "en": "Because it usually runs with kernel privileges and could give an attacker full control"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "خطأ أو شيفرة خبيثة داخل المشغّل تُنفَّذ بأعلى صلاحيات.",
    "en": "A bug or malicious code in a driver runs with the highest privileges."
   }
  }
 ],
 "com-28": [
  {
   "question": {
    "ar": "بعد تثبيت Windows بعد Linux اختفى خيار Linux عند الإقلاع. ما التفسير الأرجح؟",
    "en": "After installing Windows after Linux, the Linux option vanished at startup. What is the likely explanation?"
   },
   "options": [
    {
     "ar": "احترق القرص",
     "en": "The disk burned out"
    },
    {
     "ar": "استبدل مثبّت Windows محمّل الإقلاع بمحمّله الذي لا يعرف Linux",
     "en": "The Windows installer replaced the bootloader with its own, which does not know Linux"
    },
    {
     "ar": "النواة حُذفت من RAM",
     "en": "The kernel was deleted from RAM"
    },
    {
     "ar": "انتهت صلاحية Linux",
     "en": "Linux expired"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الحل بإعادة تثبيت GRUB أو إضافة مدخل Linux في إعدادات UEFI.",
    "en": "The fix is reinstalling GRUB or adding a Linux entry in the UEFI settings."
   }
  },
  {
   "question": {
    "ar": "ما وظيفة Secure Boot في UEFI؟",
    "en": "What does Secure Boot in UEFI do?"
   },
   "options": [
    {
     "ar": "يسرّع الإنترنت",
     "en": "Speeds up the internet"
    },
    {
     "ar": "يتحقق من توقيع محمّل الإقلاع قبل تشغيله",
     "en": "Verifies the bootloader signature before running it"
    },
    {
     "ar": "يحذف الفيروسات تلقائياً",
     "en": "Removes viruses automatically"
    },
    {
     "ar": "يضغط القرص",
     "en": "Compresses the disk"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "BIOS القديم لا يتحقق من شيء، أما UEFI فيمنع محمّلات غير موقّعة.",
    "en": "Old BIOS verifies nothing, while UEFI can block unsigned bootloaders."
   }
  },
  {
   "question": {
    "ar": "أي جزء يحمّل النواة إلى RAM؟",
    "en": "Which part loads the kernel into RAM?"
   },
   "options": [
    {
     "ar": "POST",
     "en": "POST"
    },
    {
     "ar": "مزوّد الطاقة",
     "en": "The power supply"
    },
    {
     "ar": "محمّل الإقلاع مثل GRUB",
     "en": "The bootloader such as GRUB"
    },
    {
     "ar": "شاشة الدخول",
     "en": "The login screen"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الفيرموير يجد جهاز الإقلاع ويشغّل المحمّل، والمحمّل يحمّل النواة.",
    "en": "The firmware finds the boot device and starts the bootloader, which loads the kernel."
   }
  },
  {
   "question": {
    "ar": "ما أول عملية يطلقها النواة بعد التهيئة على Linux الحديث؟",
    "en": "Which is the first process started after kernel initialisation on modern Linux?"
   },
   "options": [
    {
     "ar": "systemd (init)",
     "en": "systemd (init)"
    },
    {
     "ar": "wininit",
     "en": "wininit"
    },
    {
     "ar": "GRUB",
     "en": "GRUB"
    },
    {
     "ar": "POST",
     "en": "POST"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "العملية الأولى تُطلق بقية الخدمات، وwininit مقابلها في Windows.",
    "en": "The first process starts the other services; wininit is the Windows counterpart."
   }
  }
 ],
 "com-29": [
  {
   "question": {
    "ar": "ملف صلاحياته -rwxr-x---. ماذا يستطيع أعضاء المجموعة أن يفعلوا؟",
    "en": "A file has permissions -rwxr-x---. What can group members do?"
   },
   "options": [
    {
     "ar": "القراءة والكتابة والتنفيذ",
     "en": "Read, write and execute"
    },
    {
     "ar": "القراءة والتنفيذ فقط",
     "en": "Read and execute only"
    },
    {
     "ar": "لا شيء",
     "en": "Nothing"
    },
    {
     "ar": "الكتابة فقط",
     "en": "Write only"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الجزء الأوسط r-x يعطي المجموعة القراءة والتنفيذ دون الكتابة.",
    "en": "The middle part r-x gives the group read and execute without write."
   }
  },
  {
   "question": {
    "ar": "ما الصيغة الرقمية للصلاحيات rw-r--r--؟",
    "en": "What is the numeric form of rw-r--r--?"
   },
   "options": [
    {
     "ar": "755",
     "en": "755"
    },
    {
     "ar": "600",
     "en": "600"
    },
    {
     "ar": "777",
     "en": "777"
    },
    {
     "ar": "644",
     "en": "644"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "rw-=6 وr--=4 وr--=4 فتصبح 644.",
    "en": "rw-=6, r--=4 and r--=4, giving 644."
   }
  },
  {
   "question": {
    "ar": "مستخدم يضع chmod 777 على ملف ليتخلص من Permission denied. لماذا هذا خطأ؟",
    "en": "A user runs chmod 777 on a file to get rid of Permission denied. Why is this a mistake?"
   },
   "options": [
    {
     "ar": "لأنه يفتح الملف لكل المستخدمين للقراءة والكتابة والتنفيذ",
     "en": "Because it opens the file to everyone for read, write and execute"
    },
    {
     "ar": "لأنه يحذف الملف",
     "en": "Because it deletes the file"
    },
    {
     "ar": "لأنه يغلق الملف للجميع",
     "en": "Because it locks the file for everyone"
    },
    {
     "ar": "لأنه يغيّر اسم المالك",
     "en": "Because it changes the owner's name"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الأفضل معرفة سبب الرفض ومنح أقل صلاحية تحل المشكلة.",
    "en": "Better to find why access was denied and grant the minimum that solves it."
   }
  },
  {
   "question": {
    "ar": "أي حالة تمثّل المصادقة (authentication) وليس التخويل؟",
    "en": "Which case is authentication rather than authorisation?"
   },
   "options": [
    {
     "ar": "نظام يمنعك من تعديل ملف لا تملكه",
     "en": "The system stops you editing a file you do not own"
    },
    {
     "ar": "إدخال بصمتك لإثبات هويتك",
     "en": "Scanning your fingerprint to prove who you are"
    },
    {
     "ar": "رفض تشغيل برنامج بلا صلاحية",
     "en": "Refusing to run a program without permission"
    },
    {
     "ar": "تحديد من يقرأ المجلد",
     "en": "Setting who may read a folder"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المصادقة تجيب من أنت، والتخويل يجيب ماذا يُسمح لك.",
    "en": "Authentication answers who you are; authorisation answers what you may do."
   }
  }
 ],
 "com-30": [
  {
   "question": {
    "ar": "بعد ln a.txt b.txt وجدت رقم inode واحداً للملفين وغيّرت صلاحيات a.txt فتغيّرت لـ b.txt أيضاً. لماذا؟",
    "en": "After ln a.txt b.txt both files show the same inode, and changing a.txt permissions changed b.txt too. Why?"
   },
   "options": [
    {
     "ar": "الاسمان يشيران إلى البيانات نفسها وسجل inode نفسه",
     "en": "Both names point to the same data and the same inode record"
    },
    {
     "ar": "النظام نسخ الملف",
     "en": "The system copied the file"
    },
    {
     "ar": "هناك عطل في القرص",
     "en": "The disk is faulty"
    },
    {
     "ar": "الصلاحيات تُنسخ دائماً",
     "en": "Permissions always copy"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الاسم يُخزَّن في الدليل، والصلاحيات في inode المشترك.",
    "en": "The name lives in the directory, while permissions live in the shared inode."
   }
  },
  {
   "question": {
    "ar": "أي أمر في PowerShell يقابل ps aux؟",
    "en": "Which PowerShell command corresponds to ps aux?"
   },
   "options": [
    {
     "ar": "Get-Volume",
     "en": "Get-Volume"
    },
    {
     "ar": "Get-ChildItem",
     "en": "Get-ChildItem"
    },
    {
     "ar": "Stop-Process",
     "en": "Stop-Process"
    },
    {
     "ar": "Get-Process",
     "en": "Get-Process"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "Get-Process يسرد العمليات، وGet-ChildItem يقابل ls.",
    "en": "Get-Process lists processes, while Get-ChildItem matches ls."
   }
  },
  {
   "question": {
    "ar": "عملية تستهلك المعالج كله. ما أول خطوة معقولة؟",
    "en": "A process uses all the CPU. What is a sensible first step?"
   },
   "options": [
    {
     "ar": "إيقاف كل العمليات دفعة واحدة",
     "en": "Kill every process at once"
    },
    {
     "ar": "حذف مجلد النظام",
     "en": "Delete the system folder"
    },
    {
     "ar": "معرفة العملية وPID عبر top أو Get-Process والتأكد أنها ليست أساسية",
     "en": "Identify the process and PID with top or Get-Process and check it is not essential"
    },
    {
     "ar": "إرسال SIGKILL مباشرة لأي عملية",
     "en": "Send SIGKILL straight to any process"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الأدب أن تبدأ بالتحديد ثم SIGTERM اللطيف قبل SIGKILL القسري.",
    "en": "First identify, then try the gentle SIGTERM before the forceful SIGKILL."
   }
  },
  {
   "question": {
    "ar": "أي أمر يقابل ls -l في Windows PowerShell، وأي أمر يعرض مساحة القرص في Linux؟",
    "en": "Which command matches ls -l in Windows PowerShell, and which shows disk space on Linux?"
   },
   "options": [
    {
     "ar": "Get-Process وfree -h",
     "en": "Get-Process and free -h"
    },
    {
     "ar": "Stop-Process وps",
     "en": "Stop-Process and ps"
    },
    {
     "ar": "Get-Volume وls",
     "en": "Get-Volume and ls"
    },
    {
     "ar": "Get-ChildItem وdf -h",
     "en": "Get-ChildItem and df -h"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "Get-ChildItem يسرد الملفات، وdf -h يعرض الأنظمة المركّبة والمساحة الحرة.",
    "en": "Get-ChildItem lists files, and df -h shows mounted file systems and free space."
   }
  }
 ]
};
