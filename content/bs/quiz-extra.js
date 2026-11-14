export const EXTRA = {
 "bs-01": [
  {
   "question": {
    "ar": "أين يُوضع ملف bootstrap.bundle.min.js في الصفحة عادة؟",
    "en": "Where is bootstrap.bundle.min.js usually placed in the page?"
   },
   "options": [
    {
     "ar": "في آخر الصفحة قبل إغلاق body",
     "en": "At the end of the page, before closing body"
    },
    {
     "ar": "داخل وسم title",
     "en": "Inside the title tag"
    },
    {
     "ar": "قبل وسم doctype",
     "en": "Before the doctype"
    },
    {
     "ar": "داخل ملف CSS",
     "en": "Inside the CSS file"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "يوضع في آخر الصفحة ليعمل بعد تحميل العناصر التي سيتحكم بها.",
    "en": "It goes at the end so it runs after the elements it controls have loaded."
   }
  },
  {
   "question": {
    "ar": "أي كود يحوّل عنصراً إلى زر أزرق جاهز؟",
    "en": "Which markup turns an element into a ready-made blue button?"
   },
   "options": [
    {
     "ar": "<button class=\"button blue\">",
     "en": "<button class=\"button blue\">"
    },
    {
     "ar": "<button class=\"primary\">",
     "en": "<button class=\"primary\">"
    },
    {
     "ar": "<button class=\"btn btn-primary\">",
     "en": "<button class=\"btn btn-primary\">"
    },
    {
     "ar": "<button style=\"btn-primary\">",
     "en": "<button style=\"btn-primary\">"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الزر يحتاج الفئة الأساسية btn مع فئة اللون btn-primary.",
    "en": "A button needs the base class btn plus the color class btn-primary."
   }
  }
 ],
 "bs-02": [
  {
   "question": {
    "ar": "تريد حاوية بعرض 100% على الهاتف وتصبح بعرض ثابت ابتداءً من lg. أي فئة تستخدم؟",
    "en": "You want a container that is 100% wide on phones and becomes fixed-width from lg. Which class do you use?"
   },
   "options": [
    {
     "ar": "container-fluid",
     "en": "container-fluid"
    },
    {
     "ar": "container-lg",
     "en": "container-lg"
    },
    {
     "ar": "container-sm",
     "en": "container-sm"
    },
    {
     "ar": "container-xxl-fluid",
     "en": "container-xxl-fluid"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "container-lg يبقى 100% حتى نقطة lg ثم يصبح ثابت العرض.",
    "en": "container-lg stays 100% wide until the lg breakpoint and then becomes fixed."
   }
  },
  {
   "question": {
    "ar": "الشاشة عرضها 700px. أي عبارة صحيحة؟",
    "en": "The screen is 700px wide. Which statement is correct?"
   },
   "options": [
    {
     "ar": "col-md-6 يعمل و col-6 لا يعمل",
     "en": "col-md-6 applies and col-6 does not"
    },
    {
     "ar": "الاثنان يعملان معاً",
     "en": "Both apply together"
    },
    {
     "ar": "لا يعمل أي منهما",
     "en": "Neither applies"
    },
    {
     "ar": "col-6 يعمل و col-md-6 لا يعمل",
     "en": "col-6 applies and col-md-6 does not"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الفئة بلا نقطة توقف تعمل دائماً، أما md فتبدأ من 768px فأكثر.",
    "en": "A class with no breakpoint always applies, while md starts at 768px and above."
   }
  }
 ],
 "bs-03": [
  {
   "question": {
    "ar": "تريد ثلاثة أعمدة متساوية في السطر على الشاشات الكبيرة. أي فئة تضعها على كل عمود؟",
    "en": "You want three equal columns per line on large screens. Which class goes on each column?"
   },
   "options": [
    {
     "ar": "col-lg-3",
     "en": "col-lg-3"
    },
    {
     "ar": "col-lg-6",
     "en": "col-lg-6"
    },
    {
     "ar": "col-lg-4",
     "en": "col-lg-4"
    },
    {
     "ar": "col-4-lg",
     "en": "col-4-lg"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "12 ÷ 3 = 4 أجزاء لكل عمود، فنستخدم col-lg-4.",
    "en": "12 divided by 3 gives 4 parts per column, so use col-lg-4."
   }
  },
  {
   "question": {
    "ar": "ماذا يحدث للأعمدة التي تكتب عليها col فقط بدون رقم؟",
    "en": "What happens to columns that just use col with no number?"
   },
   "options": [
    {
     "ar": "تتقاسم عرض الصف بالتساوي",
     "en": "They share the row width equally"
    },
    {
     "ar": "تأخذ كل منها عمودين",
     "en": "Each takes two columns"
    },
    {
     "ar": "تصبح مخفية",
     "en": "They become hidden"
    },
    {
     "ar": "تأخذ عرضاً ثابتاً 100px",
     "en": "They get a fixed 100px width"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "col بلا رقم يوزع المساحة المتاحة بالتساوي بين الأعمدة.",
    "en": "A bare col divides the available space equally among the columns."
   }
  }
 ],
 "bs-04": [
  {
   "question": {
    "ar": "أي فئة تضبط المسافة الأفقية فقط بين الأعمدة؟",
    "en": "Which class sets only the horizontal spacing between columns?"
   },
   "options": [
    {
     "ar": "gx-4",
     "en": "gx-4"
    },
    {
     "ar": "gy-4",
     "en": "gy-4"
    },
    {
     "ar": "g-0 row",
     "en": "g-0 row"
    },
    {
     "ar": "offset-4",
     "en": "offset-4"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "gx-* للمسافة الأفقية و gy-* للعمودية و g-* للاثنتين.",
    "en": "gx-* is horizontal, gy-* is vertical and g-* sets both."
   }
  },
  {
   "question": {
    "ar": "أين يوضع الصف المتداخل (nested row)؟",
    "en": "Where do you place a nested row?"
   },
   "options": [
    {
     "ar": "مباشرة داخل صف آخر",
     "en": "Directly inside another row"
    },
    {
     "ar": "خارج الحاوية container",
     "en": "Outside the container"
    },
    {
     "ar": "داخل عمود col",
     "en": "Inside a col column"
    },
    {
     "ar": "داخل وسم head",
     "en": "Inside the head tag"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "يوضع .row جديد داخل عمود لتقسيم هذا العمود إلى 12 جزءاً من جديد.",
    "en": "A new .row goes inside a column to split that column into its own 12 parts."
   }
  }
 ],
 "bs-05": [
  {
   "question": {
    "ar": "تريد فقرة تمهيدية بخط أكبر قليلاً من النص العادي. أي فئة؟",
    "en": "You want an introductory paragraph slightly larger than normal text. Which class?"
   },
   "options": [
    {
     "ar": "display-1",
     "en": "display-1"
    },
    {
     "ar": "lead",
     "en": "lead"
    },
    {
     "ar": "h6 small",
     "en": "h6 small"
    },
    {
     "ar": "fs-6 only",
     "en": "fs-6 only"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "lead مخصصة للفقرة التمهيدية، أما display-* فللعناوين الكبيرة جداً.",
    "en": "lead is meant for introductory paragraphs, while display-* is for very large headings."
   }
  },
  {
   "question": {
    "ar": "أي فئة مناسبة لرسالة خطأ من حيث المعنى؟",
    "en": "Which class fits an error message by meaning?"
   },
   "options": [
    {
     "ar": "text-danger",
     "en": "text-danger"
    },
    {
     "ar": "text-success",
     "en": "text-success"
    },
    {
     "ar": "text-info",
     "en": "text-info"
    },
    {
     "ar": "text-light",
     "en": "text-light"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "نختار اللون لمعناه: danger للأخطاء و success للنجاح.",
    "en": "Choose colors for meaning: danger for errors and success for success."
   }
  }
 ],
 "bs-06": [
  {
   "question": {
    "ar": "ما قيمة الهامش في الفئة mb-5؟",
    "en": "What margin does the class mb-5 give?"
   },
   "options": [
    {
     "ar": "هامش سفلي 3rem",
     "en": "A bottom margin of 3rem"
    },
    {
     "ar": "هامش سفلي 0.5rem",
     "en": "A bottom margin of 0.5rem"
    },
    {
     "ar": "حشوة سفلية 3rem",
     "en": "A bottom padding of 3rem"
    },
    {
     "ar": "هامش علوي 3rem",
     "en": "A top margin of 3rem"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الحرف m هامش و b سفلي والحجم 5 يساوي 3rem.",
    "en": "m is margin, b is bottom and size 5 equals 3rem."
   }
  },
  {
   "question": {
    "ar": "أي فئة تمركز عنصراً له عرض محدد أفقياً داخل أبيه؟",
    "en": "Which class horizontally centers an element with a set width inside its parent?"
   },
   "options": [
    {
     "ar": "my-auto",
     "en": "my-auto"
    },
    {
     "ar": "px-auto",
     "en": "px-auto"
    },
    {
     "ar": "ms-100",
     "en": "ms-100"
    },
    {
     "ar": "mx-auto",
     "en": "mx-auto"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "mx-auto يجعل الهامش الأفقي تلقائياً فيتوسط العنصر.",
    "en": "mx-auto makes both horizontal margins automatic so the element is centered."
   }
  }
 ],
 "bs-07": [
  {
   "question": {
    "ar": "داخل d-flex تريد دفع زر إلى نهاية الصف. أي فئة تضعها على الزر؟",
    "en": "Inside d-flex you want to push a button to the end of the row. Which class goes on it?"
   },
   "options": [
    {
     "ar": "me-0",
     "en": "me-0"
    },
    {
     "ar": "ms-auto",
     "en": "ms-auto"
    },
    {
     "ar": "flex-fill",
     "en": "flex-fill"
    },
    {
     "ar": "align-self-start",
     "en": "align-self-start"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "ms-auto يأخذ كل المساحة الفارغة قبل العنصر فيدفعه إلى النهاية.",
    "en": "ms-auto takes all the free space before the item, pushing it to the end."
   }
  },
  {
   "question": {
    "ar": "أي فئات تجعل العناصر عمودية على الهاتف وأفقية من md؟",
    "en": "Which classes stack items on phones and put them in a row from md?"
   },
   "options": [
    {
     "ar": "d-flex flex-row flex-md-column",
     "en": "d-flex flex-row flex-md-column"
    },
    {
     "ar": "d-block flex-md-row",
     "en": "d-block flex-md-row"
    },
    {
     "ar": "d-flex flex-column flex-md-row",
     "en": "d-flex flex-column flex-md-row"
    },
    {
     "ar": "flex-column d-md-flex-row",
     "en": "flex-column d-md-flex-row"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الاتجاه الأساسي عمودي ثم flex-md-row يعيده أفقياً من md.",
    "en": "The base direction is column, then flex-md-row turns it horizontal from md."
   }
  }
 ],
 "bs-08": [
  {
   "question": {
    "ar": "أي فئة تُظهر العنصر على الهاتف فقط وتخفيه من md؟",
    "en": "Which class shows an element on phones only and hides it from md?"
   },
   "options": [
    {
     "ar": "d-md-none",
     "en": "d-md-none"
    },
    {
     "ar": "d-none d-md-block",
     "en": "d-none d-md-block"
    },
    {
     "ar": "d-md-block",
     "en": "d-md-block"
    },
    {
     "ar": "d-none",
     "en": "d-none"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "d-md-none تخفي العنصر ابتداءً من md فيبقى ظاهراً على الشاشات الأصغر.",
    "en": "d-md-none hides the element from md up, so it stays visible on smaller screens."
   }
  },
  {
   "question": {
    "ar": "أي فئة تجعل شريطاً يلتصق بأعلى الشاشة أثناء التمرير؟",
    "en": "Which class makes a bar stick to the top while scrolling?"
   },
   "options": [
    {
     "ar": "fixed-bottom",
     "en": "fixed-bottom"
    },
    {
     "ar": "sticky-top",
     "en": "sticky-top"
    },
    {
     "ar": "position-static",
     "en": "position-static"
    },
    {
     "ar": "top-0 only",
     "en": "top-0 only"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "sticky-top يثبت العنصر عند الأعلى عند وصول التمرير إليه.",
    "en": "sticky-top pins the element at the top once scrolling reaches it."
   }
  }
 ],
 "bs-09": [
  {
   "question": {
    "ar": "كيف تعطّل رابطاً بشكل زر btn بطريقة صحيحة؟",
    "en": "How do you correctly disable a link styled as a btn?"
   },
   "options": [
    {
     "ar": "إضافة الفئة disabled مع aria-disabled=\"true\"",
     "en": "Add the disabled class with aria-disabled=\"true\""
    },
    {
     "ar": "كتابة disabled كخاصية فقط على a",
     "en": "Only write the disabled attribute on a"
    },
    {
     "ar": "إضافة btn-off",
     "en": "Add btn-off"
    },
    {
     "ar": "حذف href فقط",
     "en": "Just remove href"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الروابط لا تدعم الخاصية disabled، لذا نستخدم الفئة مع aria-disabled للقارئات.",
    "en": "Links do not support the disabled attribute, so use the class plus aria-disabled for screen readers."
   }
  },
  {
   "question": {
    "ar": "أي فئة تجعل الزر بعرض الحاوية بالكامل؟",
    "en": "Which class makes a button as wide as its container?"
   },
   "options": [
    {
     "ar": "btn-wide",
     "en": "btn-wide"
    },
    {
     "ar": "btn-block-100",
     "en": "btn-block-100"
    },
    {
     "ar": "d-inline",
     "en": "d-inline"
    },
    {
     "ar": "w-100",
     "en": "w-100"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "w-100 يعطي عرض 100%، وبديلها وضع الزر داخل d-grid.",
    "en": "w-100 gives 100% width; the alternative is placing the button inside d-grid."
   }
  }
 ],
 "bs-10": [
  {
   "question": {
    "ar": "أي فئة تضع صورة في أعلى البطاقة؟",
    "en": "Which class places an image at the top of a card?"
   },
   "options": [
    {
     "ar": "card-top-image",
     "en": "card-top-image"
    },
    {
     "ar": "card-img-top",
     "en": "card-img-top"
    },
    {
     "ar": "card-body-img",
     "en": "card-body-img"
    },
    {
     "ar": "img-card",
     "en": "img-card"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "card-img-top مخصصة للصورة أعلى البطاقة وتتمدد بعرضها.",
    "en": "card-img-top is made for a top image and stretches to the card width."
   }
  },
  {
   "question": {
    "ar": "بطاقة تمتد على كامل عرض الصفحة بشكل مزعج. ما الحل؟",
    "en": "A card stretches awkwardly across the whole page. What is the fix?"
   },
   "options": [
    {
     "ar": "وضعها داخل عمود في شبكة أو تحديد عرضها",
     "en": "Put it inside a grid column or set its width"
    },
    {
     "ar": "إضافة card-narrow",
     "en": "Add card-narrow"
    },
    {
     "ar": "حذف card-body",
     "en": "Remove card-body"
    },
    {
     "ar": "استخدام h-100 فقط",
     "en": "Use h-100 only"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "البطاقة تأخذ عرض أبيها افتراضياً، فنتحكم بعرضها بالشبكة.",
    "en": "A card takes its parent's width by default, so control it with the grid."
   }
  }
 ],
 "bs-11": [
  {
   "question": {
    "ar": "الشاشة 800px والـ navbar يحمل navbar-expand-lg. كيف تظهر القائمة؟",
    "en": "The screen is 800px and the navbar has navbar-expand-lg. How does the menu appear?"
   },
   "options": [
    {
     "ar": "مطوية خلف زر التبديل",
     "en": "Collapsed behind the toggler button"
    },
    {
     "ar": "ممتدة أفقياً",
     "en": "Expanded horizontally"
    },
    {
     "ar": "مخفية نهائياً",
     "en": "Hidden permanently"
    },
    {
     "ar": "تظهر كنافذة Modal",
     "en": "Shown as a Modal"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "lg يبدأ من 992px، وما دونه تبقى القائمة مطوية.",
    "en": "lg starts at 992px, and below it the menu stays collapsed."
   }
  },
  {
   "question": {
    "ar": "أي عنصر يغلّف الروابط ليُطوى ويُفتح بزر التبديل؟",
    "en": "Which element wraps the links so they fold and open with the toggler?"
   },
   "options": [
    {
     "ar": "navbar-brand",
     "en": "navbar-brand"
    },
    {
     "ar": "nav-link-wrap",
     "en": "nav-link-wrap"
    },
    {
     "ar": "collapse navbar-collapse",
     "en": "collapse navbar-collapse"
    },
    {
     "ar": "navbar-expand",
     "en": "navbar-expand"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الغلاف collapse navbar-collapse هو ما يستهدفه data-bs-target.",
    "en": "The collapse navbar-collapse wrapper is what data-bs-target points to."
   }
  }
 ],
 "bs-12": [
  {
   "question": {
    "ar": "أي فئة تنسّق قائمة منسدلة select؟",
    "en": "Which class styles a select dropdown?"
   },
   "options": [
    {
     "ar": "form-control-select",
     "en": "form-control-select"
    },
    {
     "ar": "form-select",
     "en": "form-select"
    },
    {
     "ar": "select-menu",
     "en": "select-menu"
    },
    {
     "ar": "form-dropdown",
     "en": "form-dropdown"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "form-select خاصة بعنصر select بينما form-control للحقول النصية.",
    "en": "form-select is for the select element, while form-control is for text fields."
   }
  },
  {
   "question": {
    "ar": "ما البنية الصحيحة لخانة اختيار checkbox؟",
    "en": "What is the correct structure for a checkbox?"
   },
   "options": [
    {
     "ar": "input.form-control فقط",
     "en": "Only input.form-control"
    },
    {
     "ar": "div.form-check يحوي input.form-check-input و label.form-check-label",
     "en": "div.form-check holding input.form-check-input and label.form-check-label"
    },
    {
     "ar": "label.form-switch فقط",
     "en": "Only label.form-switch"
    },
    {
     "ar": "div.checkbox يحوي span",
     "en": "div.checkbox holding a span"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "هذه الفئات الثلاث معاً تعطي المحاذاة والتنسيق الصحيحين.",
    "en": "These three classes together give the correct alignment and styling."
   }
  }
 ],
 "bs-13": [
  {
   "question": {
    "ar": "أي فئة تحمل الرمز @ بجانب حقل الإدخال داخل input-group؟",
    "en": "Which class holds the @ symbol beside the field inside input-group?"
   },
   "options": [
    {
     "ar": "input-addon",
     "en": "input-addon"
    },
    {
     "ar": "form-text-box",
     "en": "form-text-box"
    },
    {
     "ar": "group-label",
     "en": "group-label"
    },
    {
     "ar": "input-group-text",
     "en": "input-group-text"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "input-group-text ينسّق النص أو الأيقونة الملاصقة للحقل.",
    "en": "input-group-text styles the text or icon attached to the field."
   }
  },
  {
   "question": {
    "ar": "كيف تُظهر رسالة خطأ حمراء يدوياً تحت حقل؟",
    "en": "How do you manually show a red error message under a field?"
   },
   "options": [
    {
     "ar": "is-invalid على الحقل و invalid-feedback للرسالة",
     "en": "is-invalid on the field and invalid-feedback for the message"
    },
    {
     "ar": "text-error على الحقل",
     "en": "text-error on the field"
    },
    {
     "ar": "was-validated على الحقل وحده",
     "en": "was-validated on the field alone"
    },
    {
     "ar": "alert-red بعد الحقل",
     "en": "alert-red after the field"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الفئة is-invalid تلوّن الحقل وتُظهر النص الموجود في invalid-feedback.",
    "en": "is-invalid colors the field and reveals the text inside invalid-feedback."
   }
  }
 ],
 "bs-14": [
  {
   "question": {
    "ar": "أي فئة تضيف خطوطاً بالتناوب لصفوف الجدول؟",
    "en": "Which class adds alternating stripes to table rows?"
   },
   "options": [
    {
     "ar": "table-zebra",
     "en": "table-zebra"
    },
    {
     "ar": "table-alt",
     "en": "table-alt"
    },
    {
     "ar": "table-striped",
     "en": "table-striped"
    },
    {
     "ar": "table-lined",
     "en": "table-lined"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "table-striped يلوّن الصفوف الفردية بخلفية خفيفة.",
    "en": "table-striped shades alternate rows with a light background."
   }
  },
  {
   "question": {
    "ar": "كيف تضع شارة badge في نهاية عنصر قائمة list-group-item؟",
    "en": "How do you put a badge at the end of a list-group-item?"
   },
   "options": [
    {
     "ar": "d-flex justify-content-between مع badge",
     "en": "d-flex justify-content-between with a badge"
    },
    {
     "ar": "badge-end على العنصر",
     "en": "badge-end on the item"
    },
    {
     "ar": "table-responsive حول العنصر",
     "en": "table-responsive around the item"
    },
    {
     "ar": "list-group-badge فقط",
     "en": "list-group-badge only"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "flex مع التوزيع between يدفع الشارة إلى الطرف الآخر.",
    "en": "Flex with between spacing pushes the badge to the opposite edge."
   }
  }
 ],
 "bs-15": [
  {
   "question": {
    "ar": "أي خاصية aria تحمل القيمة الحالية لشريط التقدم؟",
    "en": "Which aria attribute holds the current value of a progress bar?"
   },
   "options": [
    {
     "ar": "aria-valuemax",
     "en": "aria-valuemax"
    },
    {
     "ar": "aria-valuenow",
     "en": "aria-valuenow"
    },
    {
     "ar": "aria-label",
     "en": "aria-label"
    },
    {
     "ar": "aria-current",
     "en": "aria-current"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "aria-valuenow للقيمة الحالية، و min و max للحدود.",
    "en": "aria-valuenow is the current value, while min and max set the limits."
   }
  },
  {
   "question": {
    "ar": "أي مجموعة تصنع تنبيهاً قابلاً للإغلاق؟",
    "en": "Which set makes a dismissible alert?"
   },
   "options": [
    {
     "ar": "alert-dismissible مع btn-close و data-bs-dismiss=\"alert\"",
     "en": "alert-dismissible with btn-close and data-bs-dismiss=\"alert\""
    },
    {
     "ar": "alert-close فقط",
     "en": "alert-close only"
    },
    {
     "ar": "badge مع data-bs-toggle",
     "en": "badge with data-bs-toggle"
    },
    {
     "ar": "btn-close بدون أي خاصية",
     "en": "btn-close with no attribute"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الفئة تهيّئ المساحة، والخاصية data-bs-dismiss تغلق التنبيه.",
    "en": "The class prepares the space and data-bs-dismiss closes the alert."
   }
  }
 ],
 "bs-16": [
  {
   "question": {
    "ar": "ما العنصر الذي يحوي modal-header و modal-body و modal-footer؟",
    "en": "Which element contains modal-header, modal-body and modal-footer?"
   },
   "options": [
    {
     "ar": "modal-backdrop",
     "en": "modal-backdrop"
    },
    {
     "ar": "modal-trigger",
     "en": "modal-trigger"
    },
    {
     "ar": "modal-content",
     "en": "modal-content"
    },
    {
     "ar": "modal-root",
     "en": "modal-root"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الترتيب: modal ثم modal-dialog ثم modal-content ثم الأجزاء.",
    "en": "The order is modal, then modal-dialog, then modal-content, then the parts."
   }
  },
  {
   "question": {
    "ar": "أي حدث يُطلق بعد اكتمال ظهور الـ Modal؟",
    "en": "Which event fires after the Modal is fully shown?"
   },
   "options": [
    {
     "ar": "shown.bs.modal",
     "en": "shown.bs.modal"
    },
    {
     "ar": "hidden.bs.modal",
     "en": "hidden.bs.modal"
    },
    {
     "ar": "open.bs.modal",
     "en": "open.bs.modal"
    },
    {
     "ar": "load.bs.modal",
     "en": "load.bs.modal"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "shown تأتي بعد انتهاء الحركة، أما hidden فبعد الإخفاء.",
    "en": "shown fires after the animation ends, while hidden fires after closing."
   }
  }
 ],
 "bs-17": [
  {
   "question": {
    "ar": "أي فئة تجعل القائمة المنسدلة تفتح للأعلى؟",
    "en": "Which class makes the dropdown open upward?"
   },
   "options": [
    {
     "ar": "dropend",
     "en": "dropend"
    },
    {
     "ar": "dropup",
     "en": "dropup"
    },
    {
     "ar": "dropdown-up-menu",
     "en": "dropdown-up-menu"
    },
    {
     "ar": "dropstart",
     "en": "dropstart"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "dropup للأعلى و dropend لليمين و dropstart لجهة البداية.",
    "en": "dropup opens upward, dropend to the end side and dropstart to the start side."
   }
  },
  {
   "question": {
    "ar": "accordion بدون data-bs-parent على عناصره. ماذا يحدث عند فتح عنصر ثانٍ؟",
    "en": "An accordion without data-bs-parent on its items. What happens when you open a second item?"
   },
   "options": [
    {
     "ar": "يبقى الأول مفتوحاً",
     "en": "The first stays open"
    },
    {
     "ar": "يُغلق الأول تلقائياً",
     "en": "The first closes automatically"
    },
    {
     "ar": "تتعطل الأزرار",
     "en": "The buttons stop working"
    },
    {
     "ar": "يُعاد تحميل الصفحة",
     "en": "The page reloads"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "data-bs-parent هو ما يغلق العناصر الأخرى، وبدونه تعمل كل عنصر باستقلال.",
    "en": "data-bs-parent is what closes the others; without it each item works independently."
   }
  }
 ],
 "bs-18": [
  {
   "question": {
    "ar": "كيف تفعّل كل الـ Tooltips في الصفحة؟",
    "en": "How do you enable all Tooltips on the page?"
   },
   "options": [
    {
     "ar": "تحديد العناصر ذات data-bs-toggle=\"tooltip\" وإنشاء new bootstrap.Tooltip لكل منها",
     "en": "Select elements with data-bs-toggle=\"tooltip\" and create new bootstrap.Tooltip for each"
    },
    {
     "ar": "إضافة الفئة tooltip فقط",
     "en": "Just add the tooltip class"
    },
    {
     "ar": "لا حاجة لشيء",
     "en": "Nothing is needed"
    },
    {
     "ar": "استدعاء bootstrap.Modal",
     "en": "Call bootstrap.Modal"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "السمة وحدها لا تكفي، يلزم إنشاء كائن Tooltip لكل عنصر.",
    "en": "The attribute alone is not enough; a Tooltip object must be created per element."
   }
  },
  {
   "question": {
    "ar": "وضع شروط كلمة المرور داخل Tooltip فقط. ما المشكلة؟",
    "en": "Putting the password rules only inside a Tooltip. What is the problem?"
   },
   "options": [
    {
     "ar": "الـ Tooltip يبطئ الخادم",
     "en": "The Tooltip slows the server"
    },
    {
     "ar": "لا يدعم الـ Tooltip النصوص",
     "en": "Tooltips do not support text"
    },
    {
     "ar": "مستخدمو اللمس قد لا يصلون إليه",
     "en": "Touch users may not be able to reach it"
    },
    {
     "ar": "يمنع إرسال النموذج",
     "en": "It blocks form submission"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الـ Tooltip مساعد فقط، والمعلومة الأساسية يجب أن تظهر في الصفحة نفسها.",
    "en": "A Tooltip is only a helper; essential info must appear in the page itself."
   }
  }
 ],
 "bs-19": [
  {
   "question": {
    "ar": "ما الإعداد الصحيح لصفحة عربية بدعم RTL؟",
    "en": "What is the correct setup for an Arabic page with RTL support?"
   },
   "options": [
    {
     "ar": "<html lang=\"ar\" dir=\"rtl\"> مع bootstrap.rtl.min.css",
     "en": "<html lang=\"ar\" dir=\"rtl\"> with bootstrap.rtl.min.css"
    },
    {
     "ar": "<html dir=\"ltr\"> مع ملف CSS العادي",
     "en": "<html dir=\"ltr\"> with the regular CSS file"
    },
    {
     "ar": "وسم meta اسمه rtl فقط",
     "en": "Only a meta tag named rtl"
    },
    {
     "ar": "الفئة rtl على body فقط",
     "en": "Only an rtl class on body"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "نحتاج الاتجاه في html وملف RTL المخصص معاً.",
    "en": "You need the direction on html and the dedicated RTL file together."
   }
  },
  {
   "question": {
    "ar": "أي فئة بدل bg-white تتكيف مع الوضع الداكن؟",
    "en": "Which class replaces bg-white and adapts to dark mode?"
   },
   "options": [
    {
     "ar": "bg-light-fixed",
     "en": "bg-light-fixed"
    },
    {
     "ar": "bg-body",
     "en": "bg-body"
    },
    {
     "ar": "bg-white-dark",
     "en": "bg-white-dark"
    },
    {
     "ar": "bg-static",
     "en": "bg-static"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "bg-body يتبع لون خلفية الوضع الحالي بدل لون ثابت.",
    "en": "bg-body follows the current mode's background instead of a fixed color."
   }
  }
 ],
 "bs-20": [
  {
   "question": {
    "ar": "أي فئات تعرض بطاقة واحدة في السطر على الهاتف وثلاثاً من md؟",
    "en": "Which classes show one card per line on phones and three from md?"
   },
   "options": [
    {
     "ar": "row row-cols-1 row-cols-md-3",
     "en": "row row-cols-1 row-cols-md-3"
    },
    {
     "ar": "row col-1 col-md-3",
     "en": "row col-1 col-md-3"
    },
    {
     "ar": "row cols-1 cols-md-3",
     "en": "row cols-1 cols-md-3"
    },
    {
     "ar": "container col-md-3",
     "en": "container col-md-3"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "row-cols-* تحدد عدد الأعمدة لكل صف دون كتابة col لكل عنصر.",
    "en": "row-cols-* sets columns per row without writing col on each item."
   }
  },
  {
   "question": {
    "ar": "ما آخر خطوة منصوح بها قبل اعتماد صفحة الهبوط؟",
    "en": "What is the recommended last step before finalizing the landing page?"
   },
   "options": [
    {
     "ar": "حذف وسم viewport",
     "en": "Removing the viewport tag"
    },
    {
     "ar": "استبدال الشبكة بجداول",
     "en": "Replacing the grid with tables"
    },
    {
     "ar": "اختبار الوضع الداكن واتجاه RTL",
     "en": "Testing dark mode and the RTL direction"
    },
    {
     "ar": "إضافة container واحد للصفحة كلها",
     "en": "Adding a single container for the whole page"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الاختبار في الوضعين والاتجاهين يكشف أخطاء التصميم المتأخرة.",
    "en": "Testing in both modes and directions reveals late design bugs."
   }
  }
 ]
};
