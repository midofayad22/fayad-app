export const EXTRA = {
 "css-01": [
  {
   "question": {
    "ar": "أي أسلوب يسمح لملف تنسيق واحد بتنسيق عدة صفحات معاً؟",
    "en": "Which approach lets one stylesheet style many pages at once?"
   },
   "options": [
    {
     "ar": "كتابة خاصية style داخل كل عنصر في كل صفحة",
     "en": "Writing a style attribute inside every element on every page"
    },
    {
     "ar": "ربط ملف css خارجي بكل صفحة",
     "en": "Linking one external css file from every page"
    },
    {
     "ar": "نسخ نفس القواعد داخل كل صفحة يدوياً",
     "en": "Copying the same rules into every page by hand"
    },
    {
     "ar": "استخدام HTML فقط لأنه يدعم الألوان",
     "en": "Using HTML only, because it supports colors"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الملف الخارجي يُكتب مرة واحدة ويُربط من كل صفحة، فتغيير قاعدة واحدة يغير الموقع كله. النسخ اليدوي أو style داخل العناصر يجبرك على التعديل في كل مكان.",
    "en": "An external file is written once and linked from every page, so changing one rule updates the whole site. Copying rules or using inline styles forces you to edit every place separately."
   }
  },
  {
   "question": {
    "ar": "ملف CSS فشل تحميله بسبب خطأ في مسار الربط. ماذا ستعرض الصفحة؟",
    "en": "The CSS file failed to load because of a wrong link path. What will the page show?"
   },
   "options": [
    {
     "ar": "صفحة بيضاء فارغة بدون أي محتوى",
     "en": "A blank white page with no content"
    },
    {
     "ar": "رسالة خطأ بدل الصفحة",
     "en": "An error message instead of the page"
    },
    {
     "ar": "المحتوى كاملاً بتنسيق المتصفح الافتراضي",
     "en": "All the content, with the browser's default styling"
    },
    {
     "ar": "المحتوى بنفس الألوان والتصميم المقصود",
     "en": "The content with the intended colors and design"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "CSS يضيف مظهراً فقط، أما المحتوى فمصدره HTML. عند فشل التحميل يعرض المتصفح العناصر بأنماطه الافتراضية.",
    "en": "CSS only adds appearance; the content comes from HTML. When the file fails to load, the browser renders the elements with its default styles."
   }
  }
 ],
 "css-02": [
  {
   "question": {
    "ar": "ما الخطأ في هذه القاعدة؟ p { color: blue font-size: 20px; }",
    "en": "What is wrong with this rule? p { color: blue font-size: 20px; }"
   },
   "options": [
    {
     "ar": "نقص فاصلة منقوطة بعد blue تفصل بين التصريحين",
     "en": "A semicolon is missing after blue to separate the two declarations"
    },
    {
     "ar": "يجب كتابة الوحدة px قبل الرقم",
     "en": "The unit px must come before the number"
    },
    {
     "ar": "يجب وضع اسم العنصر داخل الأقواس",
     "en": "The element name must go inside the braces"
    },
    {
     "ar": "لا يجوز وضع تصريحين في قاعدة واحدة",
     "en": "A rule cannot hold two declarations"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "كل تصريح ينتهي بفاصلة منقوطة. بدونها يقرأ المتصفح blue font-size: 20px كقيمة واحدة غير صالحة فيتجاهل التصريحين، ويجوز وضع أي عدد من التصريحات داخل القاعدة.",
    "en": "Each declaration ends with a semicolon. Without it the browser reads blue font-size: 20px as one invalid value and drops the declaration; a rule may hold any number of declarations."
   }
  },
  {
   "question": {
    "ar": "أي قاعدة مكتوبة بصيغة صحيحة؟",
    "en": "Which rule is written with correct syntax?"
   },
   "options": [
    {
     "ar": "h1 ( color: red; )",
     "en": "h1 ( color: red; )"
    },
    {
     "ar": "h1 { red: color; }",
     "en": "h1 { red: color; }"
    },
    {
     "ar": "h1 { color: red; }",
     "en": "h1 { color: red; }"
    },
    {
     "ar": "h1 { color = red; }",
     "en": "h1 { color = red; }"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الصيغة هي محدد ثم أقواس معقوفة تحوي property: value; بالنقطتين. الأقواس العادية وعلامة المساواة وعكس الترتيب كلها غير صالحة.",
    "en": "The syntax is a selector followed by curly braces holding property: value; with a colon. Round brackets, an equals sign, or swapping the order are all invalid."
   }
  }
 ],
 "css-03": [
  {
   "question": {
    "ar": "العنصر p يحمل الصنف note. القواعد: .note { color: green; } و p { color: red; }. ما لون النص؟",
    "en": "A p element has the class note. The rules are .note { color: green; } and p { color: red; }. What is the text color?"
   },
   "options": [
    {
     "ar": "أخضر لأن محدد الصنف أخص من محدد العنصر",
     "en": "Green, because a class selector is more specific than an element selector"
    },
    {
     "ar": "أحمر لأن p مكتوبة أخيراً",
     "en": "Red, because p is written last"
    },
    {
     "ar": "مزيج من الأخضر والأحمر",
     "en": "A mix of green and red"
    },
    {
     "ar": "أسود لأن القاعدتين تتعارضان وتلغيان بعضهما",
     "en": "Black, because the two rules conflict and cancel out"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "محدد الصنف أقوى من محدد العنصر، فيفوز الأخضر بغض النظر عن الترتيب. التعارض لا يلغي القاعدتين، بل تُختار الأقوى.",
    "en": "A class selector is stronger than an element selector, so green wins regardless of order. A conflict does not cancel both rules; the stronger one is chosen."
   }
  },
  {
   "question": {
    "ar": "ماذا يستهدف المحدد h1, h2 { color: blue; }؟",
    "en": "What does the selector h1, h2 { color: blue; } target?"
   },
   "options": [
    {
     "ar": "كل h2 الموجودة داخل h1 فقط",
     "en": "Only h2 elements located inside an h1"
    },
    {
     "ar": "كل عناصر h1 وكل عناصر h2",
     "en": "All h1 elements and all h2 elements"
    },
    {
     "ar": "أول h1 يتبعه h2 مباشرة",
     "en": "An h1 immediately followed by an h2"
    },
    {
     "ar": "عنصراً اسمه h1,h2",
     "en": "An element named h1,h2"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الفاصلة تجمع عدة محددات في قاعدة واحدة، فتنطبق القاعدة على كل منها منفصلاً. وجود عنصر داخل آخر يحتاج مسافة وليس فاصلة.",
    "en": "A comma groups several selectors into one rule so it applies to each separately. Nesting one element inside another requires a space, not a comma."
   }
  }
 ],
 "css-04": [
  {
   "question": {
    "ar": "ما معنى color: rgba(255, 0, 0, 0.5)؟",
    "en": "What does color: rgba(255, 0, 0, 0.5) mean?"
   },
   "options": [
    {
     "ar": "أحمر شبه شفاف بنسبة 50 بالمئة",
     "en": "Red that is 50 percent transparent"
    },
    {
     "ar": "أحمر داكن بنسبة 50 بالمئة",
     "en": "Red darkened by 50 percent"
    },
    {
     "ar": "لون رمادي بين الأحمر والأسود",
     "en": "A gray between red and black"
    },
    {
     "ar": "أحمر كامل لأن القيمة الأخيرة تُهمل",
     "en": "Full red, because the last value is ignored"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "القيم الثلاث الأولى هي الأحمر والأخضر والأزرق، والرابعة هي alpha أي الشفافية، و0.5 تعني نصف شفاف. القيمة الأخيرة لا تغير درجة اللون بل شفافيته.",
    "en": "The first three values are red, green and blue, and the fourth is alpha, the transparency; 0.5 means half transparent. The last value changes opacity, not the hue."
   }
  },
  {
   "question": {
    "ar": "أي لون يمثله الرمز #0f0؟",
    "en": "Which color does the code #0f0 represent?"
   },
   "options": [
    {
     "ar": "أحمر",
     "en": "Red"
    },
    {
     "ar": "أزرق",
     "en": "Blue"
    },
    {
     "ar": "أسود",
     "en": "Black"
    },
    {
     "ar": "أخضر",
     "en": "Green"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الصيغة المختصرة تكرر كل خانة، فـ #0f0 تساوي #00ff00، أي الأحمر 0 والأخضر كامل والأزرق 0، والناتج أخضر.",
    "en": "The short form repeats each digit, so #0f0 equals #00ff00: red 0, green full and blue 0, which gives green."
   }
  }
 ],
 "css-05": [
  {
   "question": {
    "ar": "صورة صغيرة وُضعت بـ background-image على صندوق كبير بدون أي خصائص خلفية أخرى. ماذا يحدث؟",
    "en": "A small image is set with background-image on a large box with no other background properties. What happens?"
   },
   "options": [
    {
     "ar": "تتمدد الصورة لتملأ الصندوق",
     "en": "The image stretches to fill the box"
    },
    {
     "ar": "تتكرر الصورة كالبلاط في الاتجاهين",
     "en": "The image tiles repeatedly in both directions"
    },
    {
     "ar": "تظهر مرة واحدة في المنتصف",
     "en": "It appears once in the center"
    },
    {
     "ar": "لا تظهر الصورة حتى نحدد الحجم",
     "en": "It does not appear until a size is set"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "القيمة الافتراضية لـ background-repeat هي repeat فتتكرر الصورة أفقياً وعمودياً، وتبدأ من الزاوية العلوية اليسرى. نستخدم no-repeat لمنع التكرار.",
    "en": "The default background-repeat is repeat, so the image tiles horizontally and vertically starting from the top-left corner. Use no-repeat to stop the tiling."
   }
  },
  {
   "question": {
    "ar": "ماذا يفعل background-size: cover؟",
    "en": "What does background-size: cover do?"
   },
   "options": [
    {
     "ar": "يكبّر الصورة لتغطي الصندوق كله مع قص الزائد",
     "en": "Scales the image to cover the whole box, cropping any excess"
    },
    {
     "ar": "يعرض الصورة كاملة دائماً دون أي قص مع ترك فراغ",
     "en": "Always shows the whole image uncropped, leaving gaps"
    },
    {
     "ar": "يكرر الصورة حتى يمتلئ الصندوق",
     "en": "Repeats the image until the box is full"
    },
    {
     "ar": "يخفي الصورة خلف المحتوى",
     "en": "Hides the image behind the content"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "cover يحافظ على نسبة الصورة ويكبرها حتى لا يبقى فراغ، وقد يقص جزءاً منها. الخيار الذي يعرض الصورة كاملة مع فراغ هو contain.",
    "en": "cover keeps the image ratio and scales it until no gap remains, which may crop part of it. The option that shows the whole image with possible gaps is contain."
   }
  }
 ],
 "css-06": [
  {
   "question": {
    "ar": "كُتبت border: 2px red; ولا يظهر أي إطار. ما السبب؟",
    "en": "border: 2px red; was written but no border appears. Why?"
   },
   "options": [
    {
     "ar": "اللون red غير مدعوم",
     "en": "The color red is not supported"
    },
    {
     "ar": "السماكة 2px صغيرة جداً لتظهر",
     "en": "2px is too thin to show"
    },
    {
     "ar": "نمط الإطار مفقود وقيمته الافتراضية none",
     "en": "The border style is missing and its default is none"
    },
    {
     "ar": "يجب كتابة border داخل عنصر body",
     "en": "border must be written inside body"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الإطار يحتاج نمطاً مثل solid أو dashed، وبدونه يكون border-style هو none فلا يُرسم شيء مهما كانت السماكة. الصحيح border: 2px solid red.",
    "en": "A border needs a style such as solid or dashed; without it border-style is none and nothing is drawn regardless of width. The fix is border: 2px solid red."
   }
  },
  {
   "question": {
    "ar": "مربع عرضه وارتفاعه 100px. ما أثر border-radius: 50%؟",
    "en": "A box is 100px wide and 100px tall. What does border-radius: 50% do?"
   },
   "options": [
    {
     "ar": "يحوّله إلى دائرة",
     "en": "It turns it into a circle"
    },
    {
     "ar": "يجعل الإطار شفافاً بنسبة 50 بالمئة",
     "en": "It makes the border 50 percent transparent"
    },
    {
     "ar": "يصغّر المربع إلى نصف حجمه",
     "en": "It shrinks the box to half its size"
    },
    {
     "ar": "يقص الزوايا الأربع بمقدار 50px فقط من الأعلى",
     "en": "It trims only the top corners by 50px"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "النسبة تُحسب من أبعاد الصندوق، و50 بالمئة تجعل الانحناء نصف الضلع فتتحول الزوايا إلى قوس كامل. ويبقى الحجم كما هو.",
    "en": "The percentage is relative to the box size, and 50 percent makes the curve half of each side so the corners form a full arc. The size stays the same."
   }
  }
 ],
 "css-07": [
  {
   "question": {
    "ar": "div داخل عنصر أب عرضه 400px، وقاعدة الابن width: 50%. كم عرض الابن؟",
    "en": "A div sits inside a parent that is 400px wide and has width: 50%. How wide is the child?"
   },
   "options": [
    {
     "ar": "50px",
     "en": "50px"
    },
    {
     "ar": "200px",
     "en": "200px"
    },
    {
     "ar": "400px",
     "en": "400px"
    },
    {
     "ar": "800px",
     "en": "800px"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "النسبة المئوية للعرض تُحسب من عرض الأب، و50 بالمئة من 400 تساوي 200px. وليست من حجم الشاشة.",
    "en": "A percentage width is calculated from the parent's width, and 50 percent of 400 is 200px. It is not based on the screen size."
   }
  },
  {
   "question": {
    "ar": "صندوق قاعدته width: 100%; max-width: 600px. ما عرضه على شاشة عرضها 400px؟",
    "en": "A box has width: 100%; max-width: 600px. How wide is it on a 400px wide screen?"
   },
   "options": [
    {
     "ar": "600px",
     "en": "600px"
    },
    {
     "ar": "400px",
     "en": "400px"
    },
    {
     "ar": "200px",
     "en": "200px"
    },
    {
     "ar": "1000px",
     "en": "1000px"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "100 بالمئة من 400 هي 400px وهي أقل من الحد 600px فلا يتدخل max-width. الحد يعمل فقط عندما يتجاوز العرض 600px.",
    "en": "100 percent of 400 is 400px, which is under the 600px limit, so max-width does not intervene. The cap only applies when the width would exceed 600px."
   }
  }
 ],
 "css-08": [
  {
   "question": {
    "ar": "عنصران متتاليان: الأول margin-bottom: 30px والثاني margin-top: 20px. كم المسافة بينهما؟",
    "en": "Two stacked blocks: the first has margin-bottom: 30px and the second has margin-top: 20px. How big is the gap between them?"
   },
   "options": [
    {
     "ar": "50px",
     "en": "50px"
    },
    {
     "ar": "20px",
     "en": "20px"
    },
    {
     "ar": "30px",
     "en": "30px"
    },
    {
     "ar": "10px",
     "en": "10px"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الهوامش العمودية بين كتلتين متجاورتين تنطوي على بعضها (margin collapse) فيُؤخذ الأكبر وهو 30px، ولا تُجمع.",
    "en": "Vertical margins between adjacent blocks collapse, so the larger one, 30px, is used instead of adding them up."
   }
  },
  {
   "question": {
    "ar": "كيف تُوسّط div ثابت العرض أفقياً داخل أبيه؟",
    "en": "How do you horizontally center a fixed-width block div inside its parent?"
   },
   "options": [
    {
     "ar": "margin: 0 auto",
     "en": "margin: 0 auto"
    },
    {
     "ar": "padding: auto",
     "en": "padding: auto"
    },
    {
     "ar": "text-align: center على الـ div نفسه",
     "en": "text-align: center on the div itself"
    },
    {
     "ar": "margin: center",
     "en": "margin: center"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "عندما يكون للعنصر عرض محدد، يقسم auto المساحة الأفقية المتبقية بالتساوي على الجانبين فيتوسط. text-align يوسّط المحتوى الداخلي لا الصندوق نفسه.",
    "en": "When the element has a set width, auto splits the remaining horizontal space equally on both sides, centering it. text-align centers inner content, not the box itself."
   }
  }
 ],
 "css-09": [
  {
   "question": {
    "ar": "صندوق width: 200px; padding: 20px بدون إطار، والحجم الافتراضي content-box. ما عرضه الكلي؟",
    "en": "A box has width: 200px; padding: 20px, no border, and the default content-box sizing. What is its total width?"
   },
   "options": [
    {
     "ar": "200px",
     "en": "200px"
    },
    {
     "ar": "220px",
     "en": "220px"
    },
    {
     "ar": "240px",
     "en": "240px"
    },
    {
     "ar": "160px",
     "en": "160px"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "في content-box العرض يخص المحتوى فقط، ويُضاف الحشو من الجانبين: 200 + 20 + 20 = 240px.",
    "en": "In content-box the width applies to the content only, and padding is added on both sides: 200 + 20 + 20 = 240px."
   }
  },
  {
   "question": {
    "ar": "في padding: 10px 20px 30px 40px، كم حشو الجانب الأيسر؟",
    "en": "In padding: 10px 20px 30px 40px, what is the left padding?"
   },
   "options": [
    {
     "ar": "10px",
     "en": "10px"
    },
    {
     "ar": "20px",
     "en": "20px"
    },
    {
     "ar": "30px",
     "en": "30px"
    },
    {
     "ar": "40px",
     "en": "40px"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الترتيب مع عقارب الساعة: أعلى ثم يمين ثم أسفل ثم يسار، فالقيمة الرابعة 40px هي لليسار.",
    "en": "The order is clockwise: top, right, bottom, left, so the fourth value, 40px, is the left padding."
   }
  }
 ],
 "css-10": [
  {
   "question": {
    "ar": "صندوق content-box: width: 100px; padding: 10px; border: 5px solid; margin: 20px. كم عرضه المرئي بدون الهامش؟",
    "en": "A content-box box has width: 100px; padding: 10px; border: 5px solid; margin: 20px. How wide is the visible box, not counting margin?"
   },
   "options": [
    {
     "ar": "100px",
     "en": "100px"
    },
    {
     "ar": "120px",
     "en": "120px"
    },
    {
     "ar": "130px",
     "en": "130px"
    },
    {
     "ar": "170px",
     "en": "170px"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "المرئي = المحتوى + الحشو + الإطار من الجانبين: 100 + 20 + 10 = 130px. الهامش خارج الصندوق المرئي، وإضافته تعطي 170px.",
    "en": "Visible width = content + padding + border on both sides: 100 + 20 + 10 = 130px. Margin is outside the visible box; adding it would give 170px."
   }
  },
  {
   "question": {
    "ar": "عنصر له background-color وpadding وborder وmargin. أي جزء لا يُلوَّن بلون الخلفية افتراضياً؟",
    "en": "An element has background-color, padding, border and margin. Which part is not painted with the background color by default?"
   },
   "options": [
    {
     "ar": "الحشو",
     "en": "The padding"
    },
    {
     "ar": "المحتوى",
     "en": "The content"
    },
    {
     "ar": "الهامش",
     "en": "The margin"
    },
    {
     "ar": "المنطقة تحت الإطار",
     "en": "The area under the border"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الخلفية تمتد تحت المحتوى والحشو والإطار، أما الهامش فهو مسافة خارجية شفافة لا تُلوَّن.",
    "en": "The background extends under the content, padding and border, while margin is transparent external space that is never painted."
   }
  }
 ],
 "css-11": [
  {
   "question": {
    "ar": "box-sizing: border-box; width: 300px; padding: 20px; border: 5px solid. كم عرض منطقة المحتوى؟",
    "en": "With box-sizing: border-box; width: 300px; padding: 20px; border: 5px solid, how wide is the content area?"
   },
   "options": [
    {
     "ar": "250px",
     "en": "250px"
    },
    {
     "ar": "300px",
     "en": "300px"
    },
    {
     "ar": "340px",
     "en": "340px"
    },
    {
     "ar": "260px",
     "en": "260px"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "في border-box يشمل العرض المحتوى والحشو والإطار، فالمحتوى = 300 - 40 - 10 = 250px، والصندوق كله يبقى 300px.",
    "en": "In border-box the width includes content, padding and border, so content = 300 - 40 - 10 = 250px, and the whole box stays 300px."
   }
  },
  {
   "question": {
    "ar": "عمودان كل منهما width: 50% وpadding: 20px بحجم content-box داخل حاوية. ماذا يحدث؟",
    "en": "Two columns each have width: 50% and padding: 20px with content-box sizing inside a container. What happens?"
   },
   "options": [
    {
     "ar": "يتسعان تماماً بجانب بعضهما",
     "en": "They fit exactly side by side"
    },
    {
     "ar": "يتجاوز مجموعهما 100 بالمئة فينزل أحدهما أو يفيض",
     "en": "Together they exceed 100 percent, so one wraps or overflows"
    },
    {
     "ar": "يتقلص الحشو تلقائياً",
     "en": "The padding shrinks automatically"
    },
    {
     "ar": "يتجاهل المتصفح الحشو",
     "en": "The browser ignores the padding"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الحشو يُضاف فوق 50 بالمئة في content-box فيصبح مجموع العرضين أكبر من الحاوية. الحل box-sizing: border-box.",
    "en": "Padding is added on top of 50 percent in content-box, so the combined width is larger than the container. The fix is box-sizing: border-box."
   }
  }
 ],
 "css-12": [
  {
   "question": {
    "ar": "العنصر p يحوي النص hello وقاعدته text-transform: uppercase. ماذا يظهر؟",
    "en": "A p element contains the text hello and has text-transform: uppercase. What is displayed?"
   },
   "options": [
    {
     "ar": "hello",
     "en": "hello"
    },
    {
     "ar": "Hello",
     "en": "Hello"
    },
    {
     "ar": "HELLO",
     "en": "HELLO"
    },
    {
     "ar": "HeLLo",
     "en": "HeLLo"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "uppercase يحول كل الحروف إلى كبيرة في العرض فقط، دون تغيير النص الأصلي في HTML.",
    "en": "uppercase turns every letter into a capital in the display only, without changing the original text in the HTML."
   }
  },
  {
   "question": {
    "ar": "في text-shadow: 2px 4px 6px gray، ماذا تمثل القيمتان الأوليان؟",
    "en": "In text-shadow: 2px 4px 6px gray, what do the first two values represent?"
   },
   "options": [
    {
     "ar": "الإزاحة الأفقية ثم العمودية للظل",
     "en": "The horizontal then the vertical offset of the shadow"
    },
    {
     "ar": "سماكة الظل وشفافيته",
     "en": "The shadow thickness and its opacity"
    },
    {
     "ar": "عرض وارتفاع النص",
     "en": "The text width and height"
    },
    {
     "ar": "نصف قطر التمويه ثم اللون",
     "en": "The blur radius then the color"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "أول رقمين هما إزاحة الظل أفقياً ثم عمودياً، والثالث نصف قطر التمويه، ثم اللون.",
    "en": "The first two numbers are the shadow's horizontal and vertical offsets, the third is the blur radius, and then comes the color."
   }
  }
 ],
 "css-13": [
  {
   "question": {
    "ar": "ماذا تعني font-family: 'Poppins', sans-serif؟",
    "en": "What does font-family: 'Poppins', sans-serif mean?"
   },
   "options": [
    {
     "ar": "يستخدم الخطين معاً فوق بعضهما",
     "en": "It layers both fonts on top of each other"
    },
    {
     "ar": "يجرب Poppins وإن لم يتوفر يستخدم خط sans-serif عام",
     "en": "It tries Poppins and falls back to a generic sans-serif font if unavailable"
    },
    {
     "ar": "يحمّل Poppins من الإنترنت تلقائياً",
     "en": "It downloads Poppins from the internet automatically"
    },
    {
     "ar": "يستخدم sans-serif أولاً ثم Poppins",
     "en": "It uses sans-serif first and then Poppins"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "القائمة تُقرأ بالترتيب، فيُستخدم أول خط متاح. الخط العام في النهاية شبكة أمان. ولا يحمّل التصريح الخط بنفسه بل يحتاج @font-face أو رابط خط.",
    "en": "The list is read in order and the first available font is used, with the generic family as a safety net. The declaration does not download the font; that needs @font-face or a font link."
   }
  },
  {
   "question": {
    "ar": "الجذر html بحجم خط 16px والعنصر له font-size: 1.5rem. ما حجم خطه؟",
    "en": "The root html has a font size of 16px and an element has font-size: 1.5rem. What is its font size?"
   },
   "options": [
    {
     "ar": "1.5px",
     "en": "1.5px"
    },
    {
     "ar": "16px",
     "en": "16px"
    },
    {
     "ar": "24px",
     "en": "24px"
    },
    {
     "ar": "32px",
     "en": "32px"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الوحدة rem نسبة إلى حجم خط العنصر الجذر، و1.5 × 16 = 24px.",
    "en": "The rem unit is relative to the root element's font size, and 1.5 x 16 = 24px."
   }
  }
 ],
 "css-14": [
  {
   "question": {
    "ar": "عنصر font-size: 20px وline-height: 1.6 (بدون وحدة). كم ارتفاع السطر؟",
    "en": "An element has font-size: 20px and line-height: 1.6 with no unit. How tall is a line?"
   },
   "options": [
    {
     "ar": "1.6px",
     "en": "1.6px"
    },
    {
     "ar": "20px",
     "en": "20px"
    },
    {
     "ar": "32px",
     "en": "32px"
    },
    {
     "ar": "36px",
     "en": "36px"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الرقم بدون وحدة يُضرب في حجم خط العنصر: 1.6 × 20 = 32px، وهذا يجعله يتكيف إذا تغير حجم الخط.",
    "en": "A unitless number is multiplied by the element's font size: 1.6 x 20 = 32px, so it adapts if the font size changes."
   }
  },
  {
   "question": {
    "ar": "زر ارتفاعه 50px ونصه سطر واحد. كيف تُوسّط النص عمودياً بخاصية line-height؟",
    "en": "A button is 50px tall and has one line of text. How do you center the text vertically using line-height?"
   },
   "options": [
    {
     "ar": "line-height: 1",
     "en": "line-height: 1"
    },
    {
     "ar": "line-height: 50px",
     "en": "line-height: 50px"
    },
    {
     "ar": "line-height: 0",
     "en": "line-height: 0"
    },
    {
     "ar": "line-height: 100",
     "en": "line-height: 100"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "عندما يساوي ارتفاع السطر ارتفاع الصندوق يقع السطر الواحد في المنتصف عمودياً. القيمة 100 بدون وحدة تعني 100 ضعف حجم الخط وهي ضخمة.",
    "en": "When the line height equals the box height, a single line sits in the vertical middle. The unitless 100 would mean 100 times the font size, which is huge."
   }
  }
 ],
 "css-15": [
  {
   "question": {
    "ar": "div عرضه 300px وعليه text-align: center. ماذا يتوسط؟",
    "en": "A div is 300px wide with text-align: center. What gets centered?"
   },
   "options": [
    {
     "ar": "الـ div نفسه داخل أبيه",
     "en": "The div itself inside its parent"
    },
    {
     "ar": "النص والمحتوى المضمن داخل الـ div",
     "en": "The text and inline content inside the div"
    },
    {
     "ar": "كل الأبناء من نوع block",
     "en": "All block-level children"
    },
    {
     "ar": "لا شيء لأن العنصر block",
     "en": "Nothing, because the element is block"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "text-align يحاذي المحتوى المضمن داخل الصندوق، ولا يحرك الصندوق نفسه. لتوسيط الصندوق نستخدم margin: 0 auto.",
    "en": "text-align aligns inline content inside the box and does not move the box itself. To center the box use margin: 0 auto."
   }
  },
  {
   "question": {
    "ar": "ماذا يفعل text-align: justify على فقرة طويلة؟",
    "en": "What does text-align: justify do on a long paragraph?"
   },
   "options": [
    {
     "ar": "يوسّط كل الأسطر",
     "en": "Centers every line"
    },
    {
     "ar": "يحاذي الأسطر إلى اليمين فقط",
     "en": "Aligns lines to the right only"
    },
    {
     "ar": "يوزع المسافات لتتساوى حافتا الأسطر، عدا السطر الأخير",
     "en": "Spreads spacing so both edges line up, except the last line"
    },
    {
     "ar": "يكبّر الخط ليملأ العرض",
     "en": "Enlarges the font to fill the width"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "justify يضبط المسافات بين الكلمات لتبدأ الأسطر وتنتهي عند الحافتين، ويُترك السطر الأخير محاذياً للبداية افتراضياً.",
    "en": "justify adjusts spacing between words so lines start and end at both edges, and the last line stays start-aligned by default."
   }
  }
 ],
 "css-16": [
  {
   "question": {
    "ar": "span مكتوب له width: 200px; height: 100px بدون تغيير display. ماذا يحدث؟",
    "en": "A span has width: 200px; height: 100px with no display change. What happens?"
   },
   "options": [
    {
     "ar": "يُتجاهل العرض والارتفاع لأنه inline",
     "en": "The width and height are ignored because it is inline"
    },
    {
     "ar": "يأخذ المقاسين كاملين",
     "en": "It takes both dimensions fully"
    },
    {
     "ar": "يصبح block تلقائياً",
     "en": "It automatically becomes block"
    },
    {
     "ar": "يختفي العنصر",
     "en": "The element disappears"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "العناصر inline لا تقبل width و height. نغير إلى inline-block أو block لتطبيقهما.",
    "en": "Inline elements ignore width and height. Switch to inline-block or block for them to apply."
   }
  },
  {
   "question": {
    "ar": "ما الفرق بين display: none و visibility: hidden؟",
    "en": "What is the difference between display: none and visibility: hidden?"
   },
   "options": [
    {
     "ar": "none يخفي مع إبقاء مكانه، وhidden يزيل المكان",
     "en": "none hides but keeps its space, while hidden removes the space"
    },
    {
     "ar": "لا فرق بينهما",
     "en": "There is no difference"
    },
    {
     "ar": "none يزيل العنصر من التخطيط، وhidden يخفيه ويبقي مساحته",
     "en": "none removes the element from layout, while hidden hides it but keeps its space"
    },
    {
     "ar": "hidden يحذف العنصر من HTML",
     "en": "hidden deletes the element from the HTML"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "display: none يجعل العنصر لا يشغل أي مساحة، أما visibility: hidden فيخفيه بصرياً مع بقاء مساحته. والعنصر يبقى في HTML في الحالتين.",
    "en": "display: none makes the element take up no space, while visibility: hidden hides it visually but keeps its space. The element stays in the HTML in both cases."
   }
  }
 ],
 "css-17": [
  {
   "question": {
    "ar": "شارة badge بقاعدة position: absolute; top: 0; right: 0 تظهر في زاوية الصفحة بدل زاوية البطاقة. ما الحل؟",
    "en": "A badge with position: absolute; top: 0; right: 0 appears in the page corner instead of the card corner. What is the fix?"
   },
   "options": [
    {
     "ar": "إضافة position: relative إلى البطاقة",
     "en": "Add position: relative to the card"
    },
    {
     "ar": "تغيير الشارة إلى position: fixed",
     "en": "Change the badge to position: fixed"
    },
    {
     "ar": "زيادة قيمة top",
     "en": "Increase the top value"
    },
    {
     "ar": "إضافة margin إلى الشارة",
     "en": "Add a margin to the badge"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الموضع المطلق يُحسب نسبة إلى أقرب سلف له position غير static، وإن لم يوجد فنسبة إلى الصفحة. جعل البطاقة relative يجعلها المرجع. fixed سيثبتها على الشاشة.",
    "en": "Absolute positioning is calculated from the nearest ancestor with a non-static position, and from the page if none exists. Making the card relative makes it the reference. fixed would pin it to the screen."
   }
  },
  {
   "question": {
    "ar": "ماذا يفعل position: sticky; top: 0 على عنوان؟",
    "en": "What does position: sticky; top: 0 do to a heading?"
   },
   "options": [
    {
     "ar": "يبقى مكانه في التدفق ثم يلتصق بأعلى الإطار عند وصول التمرير إليه",
     "en": "It stays in flow, then sticks to the top when scrolling reaches it"
    },
    {
     "ar": "يثبت دائماً بأعلى الشاشة من أول لحظة",
     "en": "It is always fixed to the top of the screen from the start"
    },
    {
     "ar": "يُزال من التدفق ويتحرك مع الماوس",
     "en": "It leaves the flow and follows the mouse"
    },
    {
     "ar": "يختفي عند التمرير",
     "en": "It disappears when scrolling"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "sticky هجين: يتصرف كـ relative حتى يصل إلى حد top المحدد أثناء التمرير فيتصرف كـ fixed، وذلك داخل حدود أبيه.",
    "en": "sticky is a hybrid: it acts like relative until scrolling reaches the given top offset, then acts like fixed, within the limits of its parent."
   }
  }
 ],
 "css-18": [
  {
   "question": {
    "ar": "حاوية فيها display: flex; flex-direction: column; height: 400px; justify-content: center. كيف تتوزع العناصر؟",
    "en": "A container has display: flex; flex-direction: column; height: 400px; justify-content: center. How are the items placed?"
   },
   "options": [
    {
     "ar": "متوسطة أفقياً فقط",
     "en": "Centered horizontally only"
    },
    {
     "ar": "متوسطة عمودياً داخل الحاوية",
     "en": "Centered vertically inside the container"
    },
    {
     "ar": "متجاورة في صف أفقي",
     "en": "Side by side in a horizontal row"
    },
    {
     "ar": "ملتصقة بالأعلى",
     "en": "Stuck to the top"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "justify-content يعمل على المحور الرئيسي، وعند flex-direction: column يصبح المحور الرئيسي عمودياً، فيتوسط المحتوى عمودياً.",
    "en": "justify-content works on the main axis, and with flex-direction: column the main axis is vertical, so the items are centered vertically."
   }
  },
  {
   "question": {
    "ar": "حاوية flex عرضها 500px فيها ثلاثة عناصر عرض كل منها 200px بدون flex-wrap. ماذا يحدث؟",
    "en": "A flex container is 500px wide with three items each 200px wide and no flex-wrap. What happens?"
   },
   "options": [
    {
     "ar": "تنزل العناصر إلى سطر ثانٍ",
     "en": "The items wrap to a second line"
    },
    {
     "ar": "يفيض العنصر الثالث خارج الحاوية بثبات",
     "en": "The third item overflows rigidly"
    },
    {
     "ar": "تتقلص العناصر لتناسب السطر الواحد",
     "en": "The items shrink to fit on one line"
    },
    {
     "ar": "يُخفى العنصر الأخير",
     "en": "The last item is hidden"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الافتراضي flex-wrap: nowrap وflex-shrink: 1، فتتقلص العناصر معاً (حوالي 167px لكل منها) لتبقى في سطر واحد. لكي تنزل نحتاج flex-wrap: wrap.",
    "en": "The defaults are flex-wrap: nowrap and flex-shrink: 1, so the items shrink together (about 167px each) to stay on one line. To wrap them you need flex-wrap: wrap."
   }
  }
 ],
 "css-19": [
  {
   "question": {
    "ar": "حاوية فيها display: grid; grid-template-columns: repeat(3, 1fr) وبداخلها 6 عناصر. كيف تظهر؟",
    "en": "A container has display: grid; grid-template-columns: repeat(3, 1fr) and 6 children. How do they appear?"
   },
   "options": [
    {
     "ar": "3 أعمدة متساوية العرض في صفين",
     "en": "3 equal-width columns in 2 rows"
    },
    {
     "ar": "6 أعمدة في صف واحد",
     "en": "6 columns in 1 row"
    },
    {
     "ar": "عمود واحد من 6 صفوف",
     "en": "One column of 6 rows"
    },
    {
     "ar": "صفان من عمودين لكل منهما",
     "en": "2 rows of 2 columns"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "repeat(3, 1fr) يصنع ثلاثة أعمدة بحصص متساوية، وتتوزع العناصر الستة تلقائياً على صفين.",
    "en": "repeat(3, 1fr) creates three columns with equal shares, and the six items flow automatically into two rows."
   }
  },
  {
   "question": {
    "ar": "ماذا يعني grid-template-columns: 200px 1fr؟",
    "en": "What does grid-template-columns: 200px 1fr mean?"
   },
   "options": [
    {
     "ar": "عمودان بعرض 200px لكل منهما",
     "en": "Two columns, each 200px wide"
    },
    {
     "ar": "عمود ثابت 200px والثاني يأخذ المساحة المتبقية",
     "en": "A fixed 200px column and a second that takes the remaining space"
    },
    {
     "ar": "العمود الأول 1fr والثاني 200px",
     "en": "The first column is 1fr and the second is 200px"
    },
    {
     "ar": "عمود واحد بعرض 201px",
     "en": "One column 201px wide"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الوحدة fr تقسم المساحة المتاحة بعد خصم الأعمدة الثابتة، فيأخذ العمود الثاني كل الباقي. هذا نمط شائع للشريط الجانبي.",
    "en": "The fr unit divides the space left after fixed columns, so the second column takes all the rest. It is a common pattern for a sidebar layout."
   }
  }
 ],
 "css-20": [
  {
   "question": {
    "ar": "صفحتك متجاوبة لكن الجوال يعرضها مصغرة كأنها لسطح المكتب. ما السبب المحتمل؟",
    "en": "Your page is responsive but a phone shows it zoomed out like a desktop page. What is the likely cause?"
   },
   "options": [
    {
     "ar": "غياب وسم meta viewport في head",
     "en": "The meta viewport tag is missing from the head"
    },
    {
     "ar": "استخدام flexbox",
     "en": "Using flexbox"
    },
    {
     "ar": "استخدام الوحدة rem",
     "en": "Using the rem unit"
    },
    {
     "ar": "كثرة الصور",
     "en": "Having many images"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "بدون وسم meta viewport تفترض متصفحات الجوال عرضاً يقارب 980px وتصغر الصفحة، فلا تنطبق استعلامات الوسائط كما تتوقع. الوسم يضبط العرض على عرض الجهاز.",
    "en": "Without the meta viewport tag, mobile browsers assume a width near 980px and shrink the page, so media queries do not behave as expected. The tag sets the width to the device width."
   }
  },
  {
   "question": {
    "ar": "لماذا نكتب img { max-width: 100%; height: auto; } في تصميم متجاوب؟",
    "en": "Why write img { max-width: 100%; height: auto; } in a responsive design?"
   },
   "options": [
    {
     "ar": "لتكبير كل الصور فوق حجمها الأصلي",
     "en": "To enlarge all images beyond their original size"
    },
    {
     "ar": "لمنع الصورة من تجاوز حاويتها مع حفظ نسبتها",
     "en": "To stop images overflowing their container while keeping their ratio"
    },
    {
     "ar": "لإخفاء الصور على الجوال",
     "en": "To hide images on mobile"
    },
    {
     "ar": "لتكرار الصورة في الخلفية",
     "en": "To repeat the image in the background"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "max-width: 100% يمنع العرض من تجاوز الحاوية، وheight: auto يضبط الارتفاع تناسبياً فلا تتشوه الصورة.",
    "en": "max-width: 100% stops the width from exceeding the container, and height: auto scales the height proportionally so the image is not distorted."
   }
  }
 ],
 "css-21": [
  {
   "question": {
    "ar": "a:hover كُتبت قبل a:link بنفس القوة. لماذا لا يتغير اللون عند المرور؟",
    "en": "a:hover is written before a:link with the same specificity. Why does the color not change on hover?"
   },
   "options": [
    {
     "ar": "لأن hover لا يعمل على الروابط",
     "en": "Because hover does not work on links"
    },
    {
     "ar": "لأن a:link المتأخرة تتغلب على hover السابقة",
     "en": "Because the later a:link overrides the earlier hover"
    },
    {
     "ar": "لأن اللون لا يمكن تغييره بـ hover",
     "en": "Because color cannot be changed by hover"
    },
    {
     "ar": "لأن المتصفح يحتاج JavaScript",
     "en": "Because the browser needs JavaScript"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "عند تساوي القوة يفوز الأخير كتابة، فتلغي a:link المتأخرة أثر hover. لذلك الترتيب الموصى به link ثم visited ثم hover ثم active.",
    "en": "With equal specificity the later rule wins, so the later a:link overrides the hover effect. That is why the recommended order is link, visited, hover, active."
   }
  },
  {
   "question": {
    "ar": "أي عناصر تستهدفها li:nth-child(2n)؟",
    "en": "Which items does li:nth-child(2n) select?"
   },
   "options": [
    {
     "ar": "العناصر الفردية 1 و3 و5",
     "en": "The odd items 1, 3, 5"
    },
    {
     "ar": "العنصر الثاني فقط",
     "en": "Only the second item"
    },
    {
     "ar": "العناصر الزوجية 2 و4 و6",
     "en": "The even items 2, 4, 6"
    },
    {
     "ar": "كل العناصر",
     "en": "All items"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الصيغة 2n تعطي مضاعفات 2 أي 2 و4 و6 وهي مرادفة لـ even. أما الفردية فهي 2n+1 أو odd.",
    "en": "The formula 2n gives multiples of 2, so 2, 4, 6, which is the same as even. The odd items are 2n+1 or odd."
   }
  }
 ],
 "css-22": [
  {
   "question": {
    "ar": "لماذا لا يظهر شيء من p::after { color: red; }؟",
    "en": "Why does p::after { color: red; } show nothing?"
   },
   "options": [
    {
     "ar": "لأن ::after لا يقبل الألوان",
     "en": "Because ::after does not accept colors"
    },
    {
     "ar": "لأن الخاصية content غير مكتوبة فلا يُنشأ العنصر",
     "en": "Because the content property is missing, so the pseudo-element is not created"
    },
    {
     "ar": "لأن اللون red غير صالح",
     "en": "Because red is not a valid color"
    },
    {
     "ar": "لأن ::after تحتاج نقطة واحدة فقط",
     "en": "Because ::after needs only one colon"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الكيان ::before و::after لا يُولَّد إلا إذا وُجدت content ولو كانت نصاً فارغاً content: ''. لذلك لا يظهر شيء ولو أضفنا ألواناً.",
    "en": "::before and ::after are only generated when content is set, even an empty string content: ''. So nothing appears no matter what colors are added."
   }
  },
  {
   "question": {
    "ar": "ماذا يطبّق p::first-letter { font-size: 2em; }؟",
    "en": "What does p::first-letter { font-size: 2em; } style?"
   },
   "options": [
    {
     "ar": "أول كلمة في كل فقرة",
     "en": "The first word of each paragraph"
    },
    {
     "ar": "أول حرف فقط في كل فقرة",
     "en": "Only the first letter of each paragraph"
    },
    {
     "ar": "أول فقرة في الصفحة",
     "en": "The first paragraph on the page"
    },
    {
     "ar": "كل الحروف الكبيرة",
     "en": "All capital letters"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "::first-letter جزء من نص العنصر هو حرفه الأول، وتُستخدم عادة لعمل حرف استهلالي كبير. ليس عنصراً مستقلاً في HTML.",
    "en": "::first-letter targets the first letter of the element's text, commonly used for a large drop-cap effect. It is not a separate element in the HTML."
   }
  }
 ],
 "css-23": [
  {
   "question": {
    "ar": "الزر: .btn { background: blue; } .btn:hover { background: red; transition: 0.5s; }. ماذا يحدث؟",
    "en": "The button: .btn { background: blue; } .btn:hover { background: red; transition: 0.5s; }. What happens?"
   },
   "options": [
    {
     "ar": "يتغير بسلاسة عند المرور ويرجع فوراً عند الخروج",
     "en": "It changes smoothly on hover and snaps back instantly on leave"
    },
    {
     "ar": "يتغير بسلاسة في الاتجاهين",
     "en": "It changes smoothly in both directions"
    },
    {
     "ar": "يتغير فوراً في الاتجاهين",
     "en": "It changes instantly in both directions"
    },
    {
     "ar": "لا يتغير أبداً",
     "en": "It never changes"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الانتقال المكتوب في حالة hover يُطبق عند الدخول فقط، وعند الخروج تعود الحالة الأساسية بلا transition. نكتبه في القاعدة الأساسية ليعمل في الاتجاهين.",
    "en": "A transition placed in the hover state applies only when entering; on leave the base state has no transition. Put it in the base rule to animate both ways."
   }
  },
  {
   "question": {
    "ar": "أي تغيير لن يتحرك بسلاسة عبر transition؟",
    "en": "Which change will not animate smoothly with transition?"
   },
   "options": [
    {
     "ar": "opacity من 0 إلى 1",
     "en": "opacity from 0 to 1"
    },
    {
     "ar": "width من 100px إلى 200px",
     "en": "width from 100px to 200px"
    },
    {
     "ar": "background-color من أزرق إلى أحمر",
     "en": "background-color from blue to red"
    },
    {
     "ar": "display من none إلى block",
     "en": "display from none to block"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "display قيمة منفصلة لا تقبل القيم الوسيطة فتقفز فوراً. لذلك نستخدم opacity وغيرها للتلاشي والحركة السلسة.",
    "en": "display is a discrete value with no in-between steps, so it jumps instantly. That is why opacity and similar properties are used for smooth fades."
   }
  }
 ],
 "css-24": [
  {
   "question": {
    "ar": "ماذا يحدث لباقي العناصر عند transform: translateY(-5px) على بطاقة؟",
    "en": "What happens to surrounding elements when a card gets transform: translateY(-5px)?"
   },
   "options": [
    {
     "ar": "تتحرك للأعلى معها",
     "en": "They move up with it"
    },
    {
     "ar": "لا تتأثر لأن transform لا يغير التخطيط",
     "en": "They are unaffected, because transform does not change the layout"
    },
    {
     "ar": "تُدفع للأسفل 5px",
     "en": "They are pushed down 5px"
    },
    {
     "ar": "تختفي",
     "en": "They disappear"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "التحويل يغير الرسم فقط ولا يغير المساحة المحجوزة في التخطيط، لذلك لا تتحرك الجوار. وهذا يجعله مناسباً لتأثيرات hover.",
    "en": "A transform changes only the rendering and not the space reserved in layout, so neighbors stay put. That makes it ideal for hover effects."
   }
  },
  {
   "question": {
    "ar": "كيف تدوّر عنصراً حول زاويته العلوية اليسرى بدل مركزه؟",
    "en": "How do you rotate an element around its top-left corner instead of its center?"
   },
   "options": [
    {
     "ar": "transform-origin: top left",
     "en": "transform-origin: top left"
    },
    {
     "ar": "rotate: left",
     "en": "rotate: left"
    },
    {
     "ar": "transform: top left",
     "en": "transform: top left"
    },
    {
     "ar": "margin: 0",
     "en": "margin: 0"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "نقطة الأصل الافتراضية هي المركز، وtransform-origin يغيّرها لتصبح محور الدوران أو التحجيم.",
    "en": "The default origin is the center, and transform-origin changes it to set the pivot of rotation or scaling."
   }
  }
 ],
 "css-25": [
  {
   "question": {
    "ar": "ما نتيجة: @keyframes spin { to { transform: rotate(360deg); } } مع animation: spin 2s linear infinite؟",
    "en": "What is the result of @keyframes spin { to { transform: rotate(360deg); } } with animation: spin 2s linear infinite?"
   },
   "options": [
    {
     "ar": "دورانة واحدة ثم يتوقف",
     "en": "One rotation, then it stops"
    },
    {
     "ar": "دوران مستمر كل ثانيتين بسرعة ثابتة",
     "en": "Continuous rotation every 2 seconds at constant speed"
    },
    {
     "ar": "يتحرك للأمام ثم للخلف",
     "en": "It moves forward and backward"
    },
    {
     "ar": "لا شيء لأن from مفقودة",
     "en": "Nothing, because from is missing"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "infinite يكرر بلا نهاية، وlinear يجعل السرعة ثابتة. وعند غياب from يستخدم المتصفح الحالة الحالية للعنصر كبداية.",
    "en": "infinite repeats forever and linear keeps the speed constant. When from is missing, the browser uses the element's current state as the start."
   }
  },
  {
   "question": {
    "ar": "بعد انتهاء حركة الظهور يعود العنصر إلى opacity: 0 فجأة. ما الحل؟",
    "en": "After a fade-in animation ends, the element suddenly returns to opacity: 0. What is the fix?"
   },
   "options": [
    {
     "ar": "animation-fill-mode: forwards",
     "en": "animation-fill-mode: forwards"
    },
    {
     "ar": "animation-iteration-count: 0",
     "en": "animation-iteration-count: 0"
    },
    {
     "ar": "transition: none",
     "en": "transition: none"
    },
    {
     "ar": "animation-direction: reverse",
     "en": "animation-direction: reverse"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "بعد الانتهاء تعود الأنماط إلى حالتها الأصلية، وforwards يُبقي القيم من آخر إطار.",
    "en": "After finishing, styles go back to their original state, and forwards keeps the values from the last keyframe."
   }
  }
 ],
 "css-26": [
  {
   "question": {
    "ar": "عُرّف .card { --gap: 10px; } ثم استُخدم var(--gap) في body. ماذا يحدث؟",
    "en": "The variable .card { --gap: 10px; } is defined and var(--gap) is used on body. What happens?"
   },
   "options": [
    {
     "ar": "تعمل لأن المتغيرات عامة دائماً",
     "en": "It works, because variables are always global"
    },
    {
     "ar": "لا تعمل لأن المتغير متاح فقط داخل .card وأبنائه",
     "en": "It fails, because the variable is only available inside .card and its descendants"
    },
    {
     "ar": "تعمل لكن بقيمة صفر",
     "en": "It works but with the value zero"
    },
    {
     "ar": "يحدث خطأ في الصفحة كلها",
     "en": "An error breaks the whole page"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المتغيرات تُورَّث لأبناء العنصر الذي عُرّفت فيه فقط. لذلك نعرّف العامة في :root.",
    "en": "Custom properties are inherited only by descendants of the element where they are defined. Global ones are therefore defined on :root."
   }
  },
  {
   "question": {
    "ar": "ماذا تعني var(--color, blue)؟",
    "en": "What does var(--color, blue) mean?"
   },
   "options": [
    {
     "ar": "يعرّف المتغير color بقيمة blue",
     "en": "It defines the variable color as blue"
    },
    {
     "ar": "يستخدم blue دائماً",
     "en": "It always uses blue"
    },
    {
     "ar": "يستخدم --color، وإذا لم يكن معرفاً يستخدم blue",
     "en": "It uses --color, and if it is not defined it uses blue"
    },
    {
     "ar": "يدمج اللونين",
     "en": "It blends the two colors"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الوسيط الثاني قيمة احتياطية تُستخدم فقط عندما لا يوجد المتغير الأول.",
    "en": "The second argument is a fallback that is used only when the first variable is not defined."
   }
  }
 ],
 "css-27": [
  {
   "question": {
    "ar": "القاعدتان: #a { color: red; } و .a.a.a { color: blue; } على عنصر id a وclass a. ما اللون؟",
    "en": "Given #a { color: red; } and .a.a.a { color: blue; } on an element with id a and class a, what is the color?"
   },
   "options": [
    {
     "ar": "أحمر",
     "en": "Red"
    },
    {
     "ar": "أزرق",
     "en": "Blue"
    },
    {
     "ar": "بنفسجي",
     "en": "Purple"
    },
    {
     "ar": "الافتراضي",
     "en": "The default color"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "محدد id أقوى من أي عدد من محددات الصنف، فالأعمدة لا تُرحّل: 1,0,0 أكبر من 0,3,0. لذلك يفوز الأحمر.",
    "en": "An id selector outweighs any number of class selectors, since the columns do not carry over: 1,0,0 beats 0,3,0. So red wins."
   }
  },
  {
   "question": {
    "ar": "العنصر p له style='color: blue' والستايل شيت يحوي p { color: red !important; }. ما اللون؟",
    "en": "A p has style='color: blue' and the stylesheet has p { color: red !important; }. What color is it?"
   },
   "options": [
    {
     "ar": "أزرق لأن inline أقوى",
     "en": "Blue, because inline is stronger"
    },
    {
     "ar": "أحمر لأن !important تتغلب على الـ inline العادي",
     "en": "Red, because !important beats normal inline styles"
    },
    {
     "ar": "أسود",
     "en": "Black"
    },
    {
     "ar": "يتغير بشكل عشوائي",
     "en": "It varies randomly"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "تصريح !important في ورقة الأنماط يتفوق على تصريح inline غير مهم. ولهذا يجب تجنبه لأنه يصعّب التعديل لاحقاً.",
    "en": "An !important declaration in a stylesheet beats a normal inline declaration. That is why it should be avoided; it makes later changes harder."
   }
  }
 ],
 "css-28": [
  {
   "question": {
    "ar": "لدينا p { color: blue; } وداخل @media (min-width: 768px) { p { color: red; } }. ما لون p على شاشة 500px؟",
    "en": "We have p { color: blue; } and inside @media (min-width: 768px) { p { color: red; } }. What is p's color on a 500px screen?"
   },
   "options": [
    {
     "ar": "أزرق",
     "en": "Blue"
    },
    {
     "ar": "أحمر",
     "en": "Red"
    },
    {
     "ar": "أخضر",
     "en": "Green"
    },
    {
     "ar": "أسود",
     "en": "Black"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الشرط min-width: 768px لا يتحقق على 500px فتبقى القاعدة الأساسية. هذا أسلوب mobile-first.",
    "en": "The min-width: 768px condition is false at 500px, so the base rule stays. This is the mobile-first approach."
   }
  },
  {
   "question": {
    "ar": "كُتب @media (max-width: 600px) { .a { color: red; } } ثم بعده .a { color: blue; } خارجه. لماذا لا يظهر الأحمر على الجوال؟",
    "en": "@media (max-width: 600px) { .a { color: red; } } is written, then .a { color: blue; } after it outside. Why is red never seen on mobile?"
   },
   "options": [
    {
     "ar": "لأن max-width لا يعمل على الجوال",
     "en": "Because max-width does not work on mobile"
    },
    {
     "ar": "لأن القاعدة المتأخرة بنفس القوة تتغلب على القاعدة داخل الاستعلام",
     "en": "Because the later rule with equal specificity overrides the one inside the query"
    },
    {
     "ar": "لأن الاستعلام يحتاج screen",
     "en": "Because the query needs screen"
    },
    {
     "ar": "لأن red غير مدعوم",
     "en": "Because red is not supported"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الاستعلام لا يرفع قوة القاعدة، فيفوز الأخير كتابة. لذا نضع قواعد الاستعلام بعد القواعد الأساسية.",
    "en": "A media query does not raise specificity, so the last rule written wins. Put media query rules after the base rules."
   }
  }
 ],
 "css-29": [
  {
   "question": {
    "ar": "h2 ~ p بعد h2 يتبعه ثلاث فقرات. كم فقرة تستهدف؟",
    "en": "With h2 ~ p, after an h2 followed by three paragraphs, how many paragraphs are targeted?"
   },
   "options": [
    {
     "ar": "الأولى فقط",
     "en": "Only the first"
    },
    {
     "ar": "الثلاث كلها",
     "en": "All three"
    },
    {
     "ar": "الأخيرة فقط",
     "en": "Only the last"
    },
    {
     "ar": "لا شيء",
     "en": "None"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المقرن ~ يستهدف كل الأشقاء التالين، بينما + يستهدف الشقيق المباشر فقط.",
    "en": "The ~ combinator targets all following siblings, while + targets only the immediate sibling."
   }
  },
  {
   "question": {
    "ar": "أي عناصر يستهدفها a[href^='https']؟",
    "en": "Which elements does a[href^='https'] target?"
   },
   "options": [
    {
     "ar": "الروابط التي تنتهي قيمتها بـ https",
     "en": "Links whose value ends with https"
    },
    {
     "ar": "الروابط التي تحتوي https في أي موضع",
     "en": "Links containing https anywhere"
    },
    {
     "ar": "الروابط التي تبدأ قيمة href فيها بـ https",
     "en": "Links whose href value starts with https"
    },
    {
     "ar": "الروابط بدون href",
     "en": "Links without href"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "العلامة ^= تعني يبدأ بـ، و$= تعني ينتهي بـ، و*= تعني يحتوي.",
    "en": "The ^= operator means starts with, $= means ends with, and *= means contains."
   }
  }
 ],
 "css-30": [
  {
   "question": {
    "ar": "فريق يضيف !important لكل قاعدة ليضمن فوزها. ما المشكلة؟",
    "en": "A team adds !important to every rule to make sure it wins. What is the problem?"
   },
   "options": [
    {
     "ar": "لا مشكلة",
     "en": "No problem"
    },
    {
     "ar": "تصبح كل القواعد متساوية في القوة وتتحول الأمور إلى حرب خصوصية يصعب تعديلها",
     "en": "All rules end up equally strong and it becomes a specificity war that is hard to change"
    },
    {
     "ar": "يتجاهلها المتصفح",
     "en": "The browser ignores it"
    },
    {
     "ar": "تبطئ الخادم",
     "en": "It slows down the server"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الإفراط في !important يسلب القدرة على التغلب لاحقاً إلا بـ !important أخرى. الأفضل تنظيم المحددات وقوتها.",
    "en": "Overusing !important removes the ability to override later except with another !important. It is better to organize selectors and specificity."
   }
  },
  {
   "question": {
    "ar": "أي اسم صنف أفضل ممارسة؟",
    "en": "Which class name is best practice?"
   },
   "options": [
    {
     "ar": ".big-red-left",
     "en": ".big-red-left"
    },
    {
     "ar": ".card-title",
     "en": ".card-title"
    },
    {
     "ar": ".x1",
     "en": ".x1"
    },
    {
     "ar": ".div2",
     "en": ".div2"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الاسم يجب أن يصف الغرض لا الشكل، فإذا تغير التصميم يبقى الاسم صحيحاً. كذلك الأسماء العشوائية لا تُفهم.",
    "en": "A name should describe purpose rather than appearance, so it stays correct if the design changes. Random names are also hard to understand."
   }
  }
 ]
};
