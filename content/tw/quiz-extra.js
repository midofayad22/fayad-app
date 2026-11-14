export const EXTRA = {
 "tw-01": [
  {
   "question": {
    "ar": "أي فئة تعطي خلفية زرقاء سماوية بدرجة 600؟",
    "en": "Which class gives a sky-blue background at shade 600?"
   },
   "options": [
    {
     "ar": "bg-sky-600",
     "en": "bg-sky-600"
    },
    {
     "ar": "text-sky-600",
     "en": "text-sky-600"
    },
    {
     "ar": "sky-600-bg",
     "en": "sky-600-bg"
    },
    {
     "ar": "background-sky:600",
     "en": "background-sky:600"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الصيغة bg-{اللون}-{الدرجة}.",
    "en": "The syntax is bg-{color}-{shade}."
   }
  },
  {
   "question": {
    "ar": "لماذا يبقى التصميم متسقاً مع فئات Tailwind؟",
    "en": "Why does the design stay consistent with Tailwind classes?"
   },
   "options": [
    {
     "ar": "لأن Tailwind يمنع تغيير الألوان",
     "en": "Because Tailwind forbids changing colors"
    },
    {
     "ar": "لأن كل فئة تقابل خاصية واحدة تقريباً وقيمها من مقياس موحد",
     "en": "Because each class maps to about one property with values from a shared scale"
    },
    {
     "ar": "لأن كل صفحة تحتاج ملف CSS مختلف",
     "en": "Because every page needs a different CSS file"
    },
    {
     "ar": "لأن الفئات تُكتب بأسماء عشوائية",
     "en": "Because classes use random names"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "القيم تأتي من مقياس ثابت فتتشابه المسافات والأحجام في كل مكان.",
    "en": "Values come from a fixed scale, so spacing and sizes look alike everywhere."
   }
  }
 ],
 "tw-02": [
  {
   "question": {
    "ar": "كم تساوي الفئة p-13 في v4؟",
    "en": "What does the class p-13 equal in v4?"
   },
   "options": [
    {
     "ar": "1.3rem",
     "en": "1.3rem"
    },
    {
     "ar": "13rem",
     "en": "13rem"
    },
    {
     "ar": "3.25rem",
     "en": "3.25rem"
    },
    {
     "ar": "13px",
     "en": "13px"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "13 × 0.25rem = 3.25rem لأن أي رقم مقبول.",
    "en": "13 times 0.25rem gives 3.25rem because any number works."
   }
  },
  {
   "question": {
    "ar": "أي فئة تمركز كتلة أفقياً؟",
    "en": "Which class centers a block horizontally?"
   },
   "options": [
    {
     "ar": "my-auto",
     "en": "my-auto"
    },
    {
     "ar": "mx-auto",
     "en": "mx-auto"
    },
    {
     "ar": "px-auto",
     "en": "px-auto"
    },
    {
     "ar": "gap-auto",
     "en": "gap-auto"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "mx-auto يجعل الهامشين الأفقيين تلقائيين.",
    "en": "mx-auto makes both horizontal margins automatic."
   }
  }
 ],
 "tw-03": [
  {
   "question": {
    "ar": "ماذا تعني text-sky-700/80؟",
    "en": "What does text-sky-700/80 mean?"
   },
   "options": [
    {
     "ar": "نص بلون sky-700 بشفافية 80%",
     "en": "Text in sky-700 at 80% opacity"
    },
    {
     "ar": "نص بحجم 80px",
     "en": "Text 80px in size"
    },
    {
     "ar": "نص بدرجة 780",
     "en": "Text at shade 780"
    },
    {
     "ar": "80 حرفاً كحد أقصى",
     "en": "A maximum of 80 characters"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الرقم بعد الشرطة المائلة هو نسبة الشفافية.",
    "en": "The number after the slash is the opacity percentage."
   }
  },
  {
   "question": {
    "ar": "ما أغمق درجة في مقياس الألوان الافتراضي؟",
    "en": "What is the darkest shade in the default color scale?"
   },
   "options": [
    {
     "ar": "50",
     "en": "50"
    },
    {
     "ar": "500",
     "en": "500"
    },
    {
     "ar": "1000",
     "en": "1000"
    },
    {
     "ar": "950",
     "en": "950"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الدرجات تمتد من 50 إلى 950.",
    "en": "The shades run from 50 to 950."
   }
  }
 ],
 "tw-04": [
  {
   "question": {
    "ar": "أي فئة تقص النص عند سطرين مع نقاط؟",
    "en": "Which class clamps text to two lines with an ellipsis?"
   },
   "options": [
    {
     "ar": "truncate-2",
     "en": "truncate-2"
    },
    {
     "ar": "line-clamp-2",
     "en": "line-clamp-2"
    },
    {
     "ar": "text-2",
     "en": "text-2"
    },
    {
     "ar": "max-lines-2",
     "en": "max-lines-2"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "line-clamp-N يحدد عدد الأسطر الظاهرة.",
    "en": "line-clamp-N sets the number of visible lines."
   }
  },
  {
   "question": {
    "ar": "أي فئة محاذاة تتبع اتجاه اللغة (RTL و LTR)؟",
    "en": "Which alignment class follows the language direction?"
   },
   "options": [
    {
     "ar": "text-left",
     "en": "text-left"
    },
    {
     "ar": "text-justify-fixed",
     "en": "text-justify-fixed"
    },
    {
     "ar": "text-start",
     "en": "text-start"
    },
    {
     "ar": "text-top",
     "en": "text-top"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "start و end منطقيتان وتنقلبان تلقائياً في RTL.",
    "en": "start and end are logical and flip automatically in RTL."
   }
  }
 ],
 "tw-05": [
  {
   "question": {
    "ar": "ماذا تعطي الفئة aspect-video؟",
    "en": "What does the class aspect-video give?"
   },
   "options": [
    {
     "ar": "نسبة عرض إلى ارتفاع 16/9",
     "en": "A 16/9 aspect ratio"
    },
    {
     "ar": "ارتفاعاً بحجم الشاشة",
     "en": "Screen-sized height"
    },
    {
     "ar": "عرضاً 100%",
     "en": "100% width"
    },
    {
     "ar": "تشغيل فيديو",
     "en": "Video playback"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "aspect-video تضبط النسبة 16:9 للعنصر.",
    "en": "aspect-video sets the element to a 16:9 ratio."
   }
  },
  {
   "question": {
    "ar": "أي فئة تجعل الارتفاع على الأقل بحجم الشاشة؟",
    "en": "Which class makes the height at least the screen height?"
   },
   "options": [
    {
     "ar": "h-min",
     "en": "h-min"
    },
    {
     "ar": "min-h-screen",
     "en": "min-h-screen"
    },
    {
     "ar": "max-h-full",
     "en": "max-h-full"
    },
    {
     "ar": "h-fit",
     "en": "h-fit"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "min-h-screen يضمن ملء الشاشة مع السماح بالنمو.",
    "en": "min-h-screen fills the screen while still allowing growth."
   }
  }
 ],
 "tw-06": [
  {
   "question": {
    "ar": "عنصر عليه items-center justify-between ولا يحدث شيء. ما السبب المرجح؟",
    "en": "An element has items-center justify-between but nothing happens. What is the likely cause?"
   },
   "options": [
    {
     "ar": "نسيان فئة flex على الحاوية",
     "en": "Forgetting the flex class on the container"
    },
    {
     "ar": "نقص فئة gap",
     "en": "A missing gap class"
    },
    {
     "ar": "استخدام Tailwind v4",
     "en": "Using Tailwind v4"
    },
    {
     "ar": "غياب فئة shrink-0",
     "en": "A missing shrink-0 class"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "فئات المحاذاة لا تعمل قبل تفعيل flex أو grid على الحاوية.",
    "en": "Alignment classes do nothing until flex or grid is set on the container."
   }
  },
  {
   "question": {
    "ar": "كيف تدفع آخر عنصر في flex إلى النهاية؟",
    "en": "How do you push the last item in a flex row to the end?"
   },
   "options": [
    {
     "ar": "me-0",
     "en": "me-0"
    },
    {
     "ar": "flex-1 only",
     "en": "flex-1 only"
    },
    {
     "ar": "ms-auto",
     "en": "ms-auto"
    },
    {
     "ar": "shrink-0",
     "en": "shrink-0"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الهامش التلقائي يمتص المساحة الفارغة قبل العنصر.",
    "en": "The auto margin absorbs the free space before the item."
   }
  }
 ],
 "tw-07": [
  {
   "question": {
    "ar": "الشاشة 800px والفئات grid-cols-1 sm:grid-cols-2 lg:grid-cols-4. كم عموداً يظهر؟",
    "en": "The screen is 800px with grid-cols-1 sm:grid-cols-2 lg:grid-cols-4. How many columns show?"
   },
   "options": [
    {
     "ar": "2",
     "en": "2"
    },
    {
     "ar": "1",
     "en": "1"
    },
    {
     "ar": "4",
     "en": "4"
    },
    {
     "ar": "3",
     "en": "3"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "sm يعمل من 640px، و lg لا يبدأ إلا عند 1024px.",
    "en": "sm applies from 640px, while lg only starts at 1024px."
   }
  },
  {
   "question": {
    "ar": "أي فئة تمركز محتوى الخلايا في grid أفقياً وعمودياً؟",
    "en": "Which class centers cell content both ways in a grid?"
   },
   "options": [
    {
     "ar": "items-grid",
     "en": "items-grid"
    },
    {
     "ar": "place-items-center",
     "en": "place-items-center"
    },
    {
     "ar": "justify-center-all",
     "en": "justify-center-all"
    },
    {
     "ar": "grid-center",
     "en": "grid-center"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "place-items-center تجمع align-items و justify-items.",
    "en": "place-items-center combines align-items and justify-items."
   }
  }
 ],
 "tw-08": [
  {
   "question": {
    "ar": "ماذا تفعل الفئة container في Tailwind؟",
    "en": "What does the container class do in Tailwind?"
   },
   "options": [
    {
     "ar": "تحدد أقصى عرض عند كل نقطة توقف",
     "en": "Sets a max width at each breakpoint"
    },
    {
     "ar": "تمركز المحتوى تلقائياً",
     "en": "Centers the content automatically"
    },
    {
     "ar": "تضيف حشوة 1rem",
     "en": "Adds 1rem of padding"
    },
    {
     "ar": "تجعل العنصر position fixed",
     "en": "Makes the element position fixed"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "لا تمركز بنفسها، فنضيف mx-auto و px-4.",
    "en": "It does not center by itself, so add mx-auto and px-4."
   }
  },
  {
   "question": {
    "ar": "عنصران متداخلان z-10 و z-50. أيهما يظهر فوق الآخر؟",
    "en": "Two overlapping elements, z-10 and z-50. Which one is on top?"
   },
   "options": [
    {
     "ar": "z-10",
     "en": "z-10"
    },
    {
     "ar": "z-50",
     "en": "z-50"
    },
    {
     "ar": "الاثنان بنفس المستوى",
     "en": "Both are on the same level"
    },
    {
     "ar": "حسب ترتيب الأحرف",
     "en": "By alphabetical order"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الرقم الأعلى لـ z-index يظهر في الطبقة الأمامية.",
    "en": "The higher z-index value sits in the front layer."
   }
  }
 ],
 "tw-09": [
  {
   "question": {
    "ar": "ما الفئة التي حلّت محل outline-none في v4؟",
    "en": "Which class replaced outline-none in v4?"
   },
   "options": [
    {
     "ar": "outline-off",
     "en": "outline-off"
    },
    {
     "ar": "outline-0-none",
     "en": "outline-0-none"
    },
    {
     "ar": "outline-hidden",
     "en": "outline-hidden"
    },
    {
     "ar": "focus-none",
     "en": "focus-none"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "outline-hidden تخفي المخطط الافتراضي مع إبقائه للوصولية في وضع التباين العالي.",
    "en": "outline-hidden hides the default outline while keeping it for high contrast modes."
   }
  },
  {
   "question": {
    "ar": "ما عرض الحلقة ring الافتراضية في v4؟",
    "en": "What is the default ring width in v4?"
   },
   "options": [
    {
     "ar": "1px",
     "en": "1px"
    },
    {
     "ar": "3px",
     "en": "3px"
    },
    {
     "ar": "0px",
     "en": "0px"
    },
    {
     "ar": "5px",
     "en": "5px"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "في v4 صارت الافتراضية 1px، ونستخدم ring-2 لحلقة أسمك.",
    "en": "In v4 the default is 1px, and ring-2 gives a thicker ring."
   }
  }
 ],
 "tw-10": [
  {
   "question": {
    "ar": "كتب مطور bg-gradient-to-r ولم يظهر التدرج في v4. ما الإصلاح؟",
    "en": "A developer wrote bg-gradient-to-r and no gradient shows in v4. What is the fix?"
   },
   "options": [
    {
     "ar": "bg-gradient-r",
     "en": "bg-gradient-r"
    },
    {
     "ar": "bg-grad-to-r",
     "en": "bg-grad-to-r"
    },
    {
     "ar": "gradient-to-right",
     "en": "gradient-to-right"
    },
    {
     "ar": "bg-linear-to-r",
     "en": "bg-linear-to-r"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الصيغة الجديدة في v4 هي bg-linear-to-*.",
    "en": "The new v4 syntax is bg-linear-to-*."
   }
  },
  {
   "question": {
    "ar": "ما دور via-sky-500 في التدرج؟",
    "en": "What is via-sky-500 for in a gradient?"
   },
   "options": [
    {
     "ar": "لون محطة وسطى بين البداية والنهاية",
     "en": "A middle color stop between start and end"
    },
    {
     "ar": "لون البداية",
     "en": "The start color"
    },
    {
     "ar": "لون النهاية",
     "en": "The end color"
    },
    {
     "ar": "لون حدود العنصر",
     "en": "The element's border color"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "via تضيف لوناً في المنتصف بين from و to.",
    "en": "via adds a color in the middle between from and to."
   }
  }
 ],
 "tw-11": [
  {
   "question": {
    "ar": "ماذا تفعل max-md:hidden؟",
    "en": "What does max-md:hidden do?"
   },
   "options": [
    {
     "ar": "تخفي العنصر على الشاشات الأصغر من md",
     "en": "Hides the element on screens smaller than md"
    },
    {
     "ar": "تخفيه من md فما فوق",
     "en": "Hides it from md and up"
    },
    {
     "ar": "تخفيه دائماً",
     "en": "Always hides it"
    },
    {
     "ar": "تخفيه عند hover",
     "en": "Hides it on hover"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "البادئة max- تعمل أسفل النقطة المحددة.",
    "en": "The max- prefix applies below the given breakpoint."
   }
  },
  {
   "question": {
    "ar": "الشاشة 500px والفئات text-sm md:text-lg. ما حجم الخط؟",
    "en": "The screen is 500px with text-sm md:text-lg. What is the font size?"
   },
   "options": [
    {
     "ar": "text-lg",
     "en": "text-lg"
    },
    {
     "ar": "text-sm",
     "en": "text-sm"
    },
    {
     "ar": "text-base",
     "en": "text-base"
    },
    {
     "ar": "text-md",
     "en": "text-md"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "md لا تبدأ إلا عند 768px فتبقى الفئة الأساسية.",
    "en": "md only starts at 768px, so the base class stays."
   }
  }
 ],
 "tw-12": [
  {
   "question": {
    "ar": "أي فئة تصغّر الزر قليلاً أثناء الضغط عليه؟",
    "en": "Which class slightly shrinks a button while pressed?"
   },
   "options": [
    {
     "ar": "active:scale-95",
     "en": "active:scale-95"
    },
    {
     "ar": "hover:scale-95",
     "en": "hover:scale-95"
    },
    {
     "ar": "focus:scale-0",
     "en": "focus:scale-0"
    },
    {
     "ar": "pressed:shrink",
     "en": "pressed:shrink"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "active: يعمل لحظة الضغط، و scale-95 يصغّره إلى 95%.",
    "en": "active: applies during the press and scale-95 shrinks it to 95%."
   }
  },
  {
   "question": {
    "ar": "لماذا لا يجب أن يكون hover الطريقة الوحيدة لإظهار معلومة؟",
    "en": "Why shouldn't hover be the only way to reveal information?"
   },
   "options": [
    {
     "ar": "لأن شاشات اللمس لا تدعم hover",
     "en": "Because touch screens have no hover"
    },
    {
     "ar": "لأن hover بطيء",
     "en": "Because hover is slow"
    },
    {
     "ar": "لأن hover يعطل الألوان",
     "en": "Because hover disables colors"
    },
    {
     "ar": "لأن Tailwind لا يدعمه",
     "en": "Because Tailwind does not support it"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "مستخدمو اللمس لن يروا المعلومة، فنوفر بديلاً.",
    "en": "Touch users would miss the information, so provide an alternative."
   }
  }
 ],
 "tw-13": [
  {
   "question": {
    "ar": "أي بادئة تنسّق أول عنصر ابن فقط؟",
    "en": "Which prefix styles only the first child?"
   },
   "options": [
    {
     "ar": "start:",
     "en": "start:"
    },
    {
     "ar": "first:",
     "en": "first:"
    },
    {
     "ar": "top:",
     "en": "top:"
    },
    {
     "ar": "head:",
     "en": "head:"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "first: و last: يستهدفان أول وآخر ابن.",
    "en": "first: and last: target the first and last child."
   }
  },
  {
   "question": {
    "ar": "أي بادئة تنسّق عنصراً عندما تكون خاصية aria-expanded تساوي true؟",
    "en": "Which prefix styles an element when aria-expanded is true?"
   },
   "options": [
    {
     "ar": "aria-expanded:",
     "en": "aria-expanded:"
    },
    {
     "ar": "expanded-aria:",
     "en": "expanded-aria:"
    },
    {
     "ar": "open:aria",
     "en": "open:aria"
    },
    {
     "ar": "state-expanded:",
     "en": "state-expanded:"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "البادئات aria-* تقرأ حالة السمة مباشرة.",
    "en": "aria-* variants read the attribute state directly."
   }
  }
 ],
 "tw-14": [
  {
   "question": {
    "ar": "مستخدم نظامه في الوضع الفاتح. ماذا يحدث لفئات dark: افتراضياً؟",
    "en": "A user's system is in light mode. What happens to dark: classes by default?"
   },
   "options": [
    {
     "ar": "لا تُطبق",
     "en": "They are not applied"
    },
    {
     "ar": "تُطبق دائماً",
     "en": "They always apply"
    },
    {
     "ar": "تُطبق بنصف الشدة",
     "en": "They apply at half strength"
    },
    {
     "ar": "تسبب خطأ",
     "en": "They cause an error"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "dark: يتبع prefers-color-scheme ما لم نعرّف متغيراً يدوياً.",
    "en": "dark: follows prefers-color-scheme unless a manual variant is defined."
   }
  },
  {
   "question": {
    "ar": "بعد تعريف @custom-variant بفئة dark، أين نضع الفئة dark لتفعيل الوضع؟",
    "en": "After defining @custom-variant with a dark class, where do you put the dark class to enable the mode?"
   },
   "options": [
    {
     "ar": "على كل عنصر ابن وحده",
     "en": "On each child element alone"
    },
    {
     "ar": "داخل ملف JavaScript فقط",
     "en": "Only inside a JavaScript file"
    },
    {
     "ar": "على عنصر أب مثل html",
     "en": "On a parent element such as html"
    },
    {
     "ar": "في وسم title",
     "en": "In the title tag"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الأبناء يرثون التفعيل من الأب الذي يحمل dark.",
    "en": "Children inherit the activation from the parent that carries dark."
   }
  }
 ],
 "tw-15": [
  {
   "question": {
    "ar": "أين نضع فئة transition لتعمل الحركة ذهاباً وإياباً؟",
    "en": "Where do you put the transition class so the motion works both ways?"
   },
   "options": [
    {
     "ar": "على الحالة الأساسية للعنصر",
     "en": "On the element's base state"
    },
    {
     "ar": "داخل hover فقط",
     "en": "Only inside hover"
    },
    {
     "ar": "على body فقط",
     "en": "Only on body"
    },
    {
     "ar": "في وسم head",
     "en": "In the head tag"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "وضعها على الأساس يحرك الدخول والخروج من الحالة.",
    "en": "Placing it on the base animates both entering and leaving the state."
   }
  },
  {
   "question": {
    "ar": "أي فئة مناسبة لمؤشر تحميل دوّار؟",
    "en": "Which class suits a spinning loading indicator?"
   },
   "options": [
    {
     "ar": "animate-ping",
     "en": "animate-ping"
    },
    {
     "ar": "animate-bounce",
     "en": "animate-bounce"
    },
    {
     "ar": "animate-pulse-fast",
     "en": "animate-pulse-fast"
    },
    {
     "ar": "animate-spin",
     "en": "animate-spin"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "animate-spin يدور العنصر باستمرار، ونغلفه بـ motion-safe.",
    "en": "animate-spin rotates continuously, and we wrap it in motion-safe."
   }
  }
 ],
 "tw-16": [
  {
   "question": {
    "ar": "ماذا تفعل الفئة w-[17rem]؟",
    "en": "What does the class w-[17rem] do?"
   },
   "options": [
    {
     "ar": "تجعل العرض 17rem بالضبط",
     "en": "Sets the width to exactly 17rem"
    },
    {
     "ar": "تجعل العرض 17 عنصراً",
     "en": "Sets the width to 17 items"
    },
    {
     "ar": "تضيف حشوة 17rem",
     "en": "Adds 17rem of padding"
    },
    {
     "ar": "ترفض القيمة",
     "en": "Rejects the value"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "القوسان المربعان يقبلان أي قيمة CSS مباشرة.",
    "en": "Square brackets accept any CSS value directly."
   }
  },
  {
   "question": {
    "ar": "ماذا تفعل الفئة [&>p]:mt-2؟",
    "en": "What does the class [&>p]:mt-2 do?"
   },
   "options": [
    {
     "ar": "تضيف هامشاً علوياً للفقرات الأبناء المباشرين",
     "en": "Adds a top margin to direct-child paragraphs"
    },
    {
     "ar": "تضيف هامشاً للعنصر نفسه فقط",
     "en": "Adds a margin only to the element itself"
    },
    {
     "ar": "تحذف الفقرات",
     "en": "Deletes paragraphs"
    },
    {
     "ar": "تخفي الفقرات",
     "en": "Hides paragraphs"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "المتغير العشوائي يكتب محدد CSS مخصصاً قبل الفئة.",
    "en": "An arbitrary variant writes a custom CSS selector before the utility."
   }
  }
 ],
 "tw-17": [
  {
   "question": {
    "ar": "ما الفئة التي يولدها --breakpoint-3xl داخل @theme؟",
    "en": "Which variant does --breakpoint-3xl inside @theme generate?"
   },
   "options": [
    {
     "ar": "3xl:",
     "en": "3xl:"
    },
    {
     "ar": "max-3xl-size",
     "en": "max-3xl-size"
    },
    {
     "ar": "screen-3xl",
     "en": "screen-3xl"
    },
    {
     "ar": "break-3xl",
     "en": "break-3xl"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "تصبح البادئة 3xl: متاحة مثل md: و lg:.",
    "en": "The 3xl: prefix becomes available like md: and lg:."
   }
  },
  {
   "question": {
    "ar": "ما الفئة التي يولدها --radius-card؟",
    "en": "Which class does --radius-card generate?"
   },
   "options": [
    {
     "ar": "radius-card",
     "en": "radius-card"
    },
    {
     "ar": "card-rounded",
     "en": "card-rounded"
    },
    {
     "ar": "rounded-card",
     "en": "rounded-card"
    },
    {
     "ar": "border-card",
     "en": "border-card"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "اسم المتغير بعد البادئة يصبح جزءاً من اسم الفئة.",
    "en": "The name after the prefix becomes part of the class name."
   }
  }
 ],
 "tw-18": [
  {
   "question": {
    "ar": "ما عيب الإكثار من فئات @apply؟",
    "en": "What is the downside of overusing @apply classes?"
   },
   "options": [
    {
     "ar": "تفقد ميزة Utility-First",
     "en": "You lose the Utility-First benefit"
    },
    {
     "ar": "تتوقف الألوان عن العمل",
     "en": "Colors stop working"
    },
    {
     "ar": "يمنع المتصفح التحميل",
     "en": "The browser blocks loading"
    },
    {
     "ar": "لا يمكن استخدامها في v4",
     "en": "They can't be used in v4"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "نعود لتسمية الفئات وإدارة ملف CSS كما كان.",
    "en": "You go back to naming classes and managing a CSS file."
   }
  },
  {
   "question": {
    "ar": "أين نكتب قاعدة @apply لزر مخصص؟",
    "en": "Where do you write an @apply rule for a custom button?"
   },
   "options": [
    {
     "ar": "داخل @layer components في قاعدة CSS",
     "en": "Inside a CSS rule within @layer components"
    },
    {
     "ar": "داخل خاصية class في HTML",
     "en": "Inside an HTML class attribute"
    },
    {
     "ar": "داخل وسم script",
     "en": "Inside a script tag"
    },
    {
     "ar": "في اسم الملف",
     "en": "In the file name"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "@apply يُستخدم داخل قواعد CSS وليس داخل HTML.",
    "en": "@apply is used inside CSS rules, not inside HTML."
   }
  }
 ],
 "tw-19": [
  {
   "question": {
    "ar": "أي فئة تلوّن نص الـ placeholder؟",
    "en": "Which class colors placeholder text?"
   },
   "options": [
    {
     "ar": "text-placeholder-slate",
     "en": "text-placeholder-slate"
    },
    {
     "ar": "hover:text-slate-400",
     "en": "hover:text-slate-400"
    },
    {
     "ar": "placeholder:text-slate-400",
     "en": "placeholder:text-slate-400"
    },
    {
     "ar": "ph-slate-400",
     "en": "ph-slate-400"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "البادئة placeholder: تستهدف نص التلميح داخل الحقل.",
    "en": "The placeholder: prefix targets the hint text inside the field."
   }
  },
  {
   "question": {
    "ar": "أي فئة تغيّر لون خانة checkbox الأصلية؟",
    "en": "Which class changes the native checkbox color?"
   },
   "options": [
    {
     "ar": "bg-sky-600",
     "en": "bg-sky-600"
    },
    {
     "ar": "accent-sky-600",
     "en": "accent-sky-600"
    },
    {
     "ar": "check-sky-600",
     "en": "check-sky-600"
    },
    {
     "ar": "ring-checkbox",
     "en": "ring-checkbox"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "accent-* تلوّن عناصر النموذج الأصلية دون إعادة بنائها.",
    "en": "accent-* colors native form controls without rebuilding them."
   }
  }
 ],
 "tw-20": [
  {
   "question": {
    "ar": "أي فئات تصنع ثلاثة أعمدة من md مع مسافة بينها؟",
    "en": "Which classes make three columns from md with spacing?"
   },
   "options": [
    {
     "ar": "grid gap-6 md:grid-cols-3",
     "en": "grid gap-6 md:grid-cols-3"
    },
    {
     "ar": "flex gap-6 md:cols-3",
     "en": "flex gap-6 md:cols-3"
    },
    {
     "ar": "grid md:gap-3-cols",
     "en": "grid md:gap-3-cols"
    },
    {
     "ar": "columns-3 md:grid",
     "en": "columns-3 md:grid"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "grid مع grid-cols-3 عند md و gap-6 للمسافات.",
    "en": "grid with grid-cols-3 at md and gap-6 for spacing."
   }
  },
  {
   "question": {
    "ar": "ما فائدة إضافة Prettier plugin لـ Tailwind؟",
    "en": "What is the benefit of adding the Tailwind Prettier plugin?"
   },
   "options": [
    {
     "ar": "ترتيب الفئات بشكل متسق",
     "en": "Sorting classes in a consistent order"
    },
    {
     "ar": "إلغاء الحاجة لـ HTML",
     "en": "Removing the need for HTML"
    },
    {
     "ar": "تحويل الفئات إلى صور",
     "en": "Converting classes into images"
    },
    {
     "ar": "تسريع الإنترنت",
     "en": "Speeding up the internet"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "ترتيب موحد للفئات يسهّل القراءة والمراجعة.",
    "en": "A uniform class order makes reading and review easier."
   }
  }
 ]
};
