export const EXTRA = {
 "vue-01": [
  {
   "question": {
    "ar": "أي مما يلي مثال على فائدة ربط البيانات بالواجهة في Vue؟",
    "en": "Which of these is a benefit of binding data to the interface in Vue?"
   },
   "options": [
    {
     "ar": "تحديث الصفحة يدوياً بعد كل تغيير",
     "en": "Manually refreshing the page after each change"
    },
    {
     "ar": "تحديث الواجهة تلقائياً عند تغير البيانات",
     "en": "The interface updates automatically when data changes"
    },
    {
     "ar": "منع المستخدم من التفاعل مع الصفحة",
     "en": "Preventing the user from interacting with the page"
    },
    {
     "ar": "حذف الحاجة إلى HTML تماماً",
     "en": "Removing the need for HTML entirely"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "عند الربط تراقب Vue البيانات وتعيد رسم الجزء المتأثر وحده دون تدخل منك.",
    "en": "With binding, Vue watches the data and updates the affected part of the page for you."
   }
  },
  {
   "question": {
    "ar": "فريق يريد بناء تطبيق صغير الآن ثم توسيعه لاحقاً إلى تطبيق كبير. لماذا قد تناسبهم Vue؟",
    "en": "A team wants a small app now and to grow it into a large one later. Why might Vue suit them?"
   },
   "options": [
    {
     "ar": "لأنها تعمل فقط في المشاريع الصغيرة",
     "en": "Because it only works for small projects"
    },
    {
     "ar": "لأنها لا تدعم التوسع",
     "en": "Because it does not support scaling"
    },
    {
     "ar": "لأنها تتطلب لغة برمجة جديدة كلياً",
     "en": "Because it requires an entirely new programming language"
    },
    {
     "ar": "لأنها سهلة التعلم ومرنة وتصلح للحجمين",
     "en": "Because it is easy to learn, flexible, and fits both sizes"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "Vue سهلة البدء ويمكن استخدامها في تطبيقات صغيرة أو كبيرة ومعقدة.",
    "en": "Vue is easy to start with and can be used for both small and large, complex apps."
   }
  }
 ],
 "vue-02": [
  {
   "question": {
    "ar": "ما نتيجة هذا الكود إذا لم يوجد عنصر #app في الصفحة؟\ncreateApp({}).mount('#app')",
    "en": "What happens with this code if no #app element exists on the page?\ncreateApp({}).mount('#app')"
   },
   "options": [
    {
     "ar": "يظهر التطبيق في أعلى الصفحة",
     "en": "The app appears at the top of the page"
    },
    {
     "ar": "لا يُعرض التطبيق لأنه لا يوجد عنصر يتصل به",
     "en": "The app is not rendered because there is no element to attach to"
    },
    {
     "ar": "ينشئ Vue عنصر #app تلقائياً",
     "en": "Vue creates the #app element automatically"
    },
    {
     "ar": "تتحول الصفحة إلى تطبيق Vue كاملة",
     "en": "The whole page becomes a Vue app"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "mount يحتاج عنصراً موجوداً يطابق المحدد، وإلا لا يجد Vue مكاناً ليعرض فيه التطبيق.",
    "en": "mount needs an existing element matching the selector; otherwise Vue has nowhere to render the app."
   }
  },
  {
   "question": {
    "ar": "ما الترتيب الصحيح لبدء تطبيق Vue؟",
    "en": "What is the correct order to start a Vue app?"
   },
   "options": [
    {
     "ar": "mount ثم createApp",
     "en": "mount, then createApp"
    },
    {
     "ar": "createApp ثم mount",
     "en": "createApp, then mount"
    },
    {
     "ar": "لا يهم الترتيب",
     "en": "The order does not matter"
    },
    {
     "ar": "mount فقط دون createApp",
     "en": "mount only, without createApp"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "نحتاج أولاً كائن التطبيق من createApp ثم نستدعي عليه mount لربطه بعنصر HTML.",
    "en": "First you need the app object from createApp, then call mount on it to attach it to an HTML element."
   }
  }
 ],
 "vue-03": [
  {
   "question": {
    "ar": "ماذا يعرض هذا القالب إذا كانت message = 'مرحبا'؟\n<p>{{ message }}</p>",
    "en": "What does this template show if message = 'Hello'?\n<p>{{ message }}</p>"
   },
   "options": [
    {
     "ar": "{{ message }} حرفياً",
     "en": "The literal text {{ message }}"
    },
    {
     "ar": "message",
     "en": "message"
    },
    {
     "ar": "Hello",
     "en": "Hello"
    },
    {
     "ar": "لا شيء",
     "en": "Nothing"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الأقواس المزدوجة تُستبدل بقيمة المتغير، فيظهر النص المخزن فيه.",
    "en": "The double braces are replaced with the variable's value, so the stored text appears."
   }
  },
  {
   "question": {
    "ar": "أي تعبير مما يلي يمكن كتابته داخل {{ }}؟",
    "en": "Which expression can be written inside {{ }}?"
   },
   "options": [
    {
     "ar": "{{ count + 1 }}",
     "en": "{{ count + 1 }}"
    },
    {
     "ar": "{{ for (i=0;i<3;i++) }}",
     "en": "{{ for (i=0;i<3;i++) }}"
    },
    {
     "ar": "{{ let x = 5 }}",
     "en": "{{ let x = 5 }}"
    },
    {
     "ar": "{{ if (ok) { } }}",
     "en": "{{ if (ok) { } }}"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "داخل الأقواس نكتب تعابير JavaScript فقط مثل الجمع، أما الجمل مثل for وlet وif فلا تصلح.",
    "en": "Only JavaScript expressions work inside the braces, such as addition; statements like for, let, and if do not."
   }
  }
 ],
 "vue-04": [
  {
   "question": {
    "ar": "في Options API، ماذا يحدث إذا غيّرنا this.count++ داخل دالة وكان count معرفاً في data()؟",
    "en": "In the Options API, what happens if we run this.count++ in a function and count is defined in data()?"
   },
   "options": [
    {
     "ar": "تتحدث الواجهة التي تعرض count",
     "en": "The interface showing count updates"
    },
    {
     "ar": "يحدث خطأ دائماً",
     "en": "An error always occurs"
    },
    {
     "ar": "لا يتغير شيء حتى نعيد تحميل الصفحة",
     "en": "Nothing changes until the page is reloaded"
    },
    {
     "ar": "تُحذف قيمة count",
     "en": "count is deleted"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "قيم data تفاعلية، لذلك يلاحظ Vue التغيير ويحدّث الواجهة تلقائياً.",
    "en": "Values in data are reactive, so Vue notices the change and updates the interface automatically."
   }
  },
  {
   "question": {
    "ar": "أي جزء يميّز البيانات التفاعلية عن متغير JavaScript عادي؟",
    "en": "What distinguishes reactive data from a plain JavaScript variable?"
   },
   "options": [
    {
     "ar": "لونها في المحرر",
     "en": "Its color in the editor"
    },
    {
     "ar": "أن Vue تتتبع تغيّرها لتحديث الواجهة",
     "en": "Vue tracks its changes to update the UI"
    },
    {
     "ar": "أنها لا تقبل التعديل",
     "en": "It cannot be modified"
    },
    {
     "ar": "أنها تُحفظ في قاعدة بيانات",
     "en": "It is saved in a database"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "التفاعلية تعني أن Vue تراقب القيمة وتعيد عرض ما يعتمد عليها عند تغيرها.",
    "en": "Reactivity means Vue monitors the value and re-renders whatever depends on it when it changes."
   }
  }
 ],
 "vue-05": [
  {
   "question": {
    "ar": "ما الخطأ في هذا الكود؟\n<button @click=\"add\">+</button>\nmethods: { add: this.count++ }",
    "en": "What is wrong with this code?\n<button @click=\"add\">+</button>\nmethods: { add: this.count++ }"
   },
   "options": [
    {
     "ar": "الزر لا يدعم click",
     "en": "Buttons do not support click"
    },
    {
     "ar": "add يجب أن تكون دالة وليست تعبيراً",
     "en": "add should be a function, not an expression"
    },
    {
     "ar": "methods يجب أن تكون خارج الكائن",
     "en": "methods must be outside the object"
    },
    {
     "ar": "لا يوجد خطأ",
     "en": "There is no error"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "كل Method يجب أن تكون دالة مثل add() { this.count++ }، وإلا لن تُستدعى عند الضغط.",
    "en": "Each method must be a function such as add() { this.count++ }, otherwise it cannot be called on click."
   }
  },
  {
   "question": {
    "ar": "كيف نصل إلى data داخل Method في Options API؟",
    "en": "How do we access data inside a method in the Options API?"
   },
   "options": [
    {
     "ar": "عبر this مثل this.count",
     "en": "Through this, e.g. this.count"
    },
    {
     "ar": "عبر window.count",
     "en": "Through window.count"
    },
    {
     "ar": "عبر document.count",
     "en": "Through document.count"
    },
    {
     "ar": "لا يمكن الوصول إليها",
     "en": "It cannot be accessed"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "داخل Methods يشير this إلى نسخة المكون، فنقرأ ونعدل data عبره.",
    "en": "Inside methods, this refers to the component instance, so we read and change data through it."
   }
  }
 ],
 "vue-06": [
  {
   "question": {
    "ar": "ما الفرق العملي بين Computed وMethod لحساب fullName؟",
    "en": "What is the practical difference between a computed and a method for fullName?"
   },
   "options": [
    {
     "ar": "Computed تُخزّن نتيجتها وتعيد الحساب فقط عند تغير اعتماداتها",
     "en": "A computed caches its result and recalculates only when its dependencies change"
    },
    {
     "ar": "لا فرق إطلاقاً",
     "en": "There is no difference at all"
    },
    {
     "ar": "Method تُخزّن النتيجة دائماً",
     "en": "A method always caches the result"
    },
    {
     "ar": "Computed لا تعمل في القالب",
     "en": "A computed does not work in templates"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "التخزين المؤقت هو ميزة Computed الأساسية مقارنة بالـ Methods التي تُنفَّذ في كل استدعاء.",
    "en": "Caching is the main advantage of computed over methods, which run on every call."
   }
  },
  {
   "question": {
    "ar": "كيف نعرض computed اسمها total في القالب؟",
    "en": "How do we display a computed named total in the template?"
   },
   "options": [
    {
     "ar": "{{ total() }}",
     "en": "{{ total() }}"
    },
    {
     "ar": "{{ total }}",
     "en": "{{ total }}"
    },
    {
     "ar": "{{ computed.total }}",
     "en": "{{ computed.total }}"
    },
    {
     "ar": "{{ this.total() }}",
     "en": "{{ this.total() }}"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "Computed تُستخدم كأنها خاصية عادية دون أقواس استدعاء.",
    "en": "A computed is used like a normal property, without call parentheses."
   }
  }
 ],
 "vue-07": [
  {
   "question": {
    "ar": "ما الخطأ في هذا السطر إذا أردنا ربط الصورة بالمتغير imgUrl؟\n<img src=\"imgUrl\">",
    "en": "What is wrong with this line if we want to bind the image to the variable imgUrl?\n<img src=\"imgUrl\">"
   },
   "options": [
    {
     "ar": "لا يوجد خطأ",
     "en": "There is no error"
    },
    {
     "ar": "يجب استخدام {{ imgUrl }} داخل src",
     "en": "{{ imgUrl }} must be used inside src"
    },
    {
     "ar": "ينقص الاختصار : فيصبح src نصاً ثابتاً",
     "en": "The : is missing, so src is just static text"
    },
    {
     "ar": "الصور لا تدعم الربط",
     "en": "Images do not support binding"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "بدون v-bind أو : يُعامل imgUrl كنص حرفي، والصحيح :src=\"imgUrl\".",
    "en": "Without v-bind or :, imgUrl is treated as literal text; the correct form is :src=\"imgUrl\"."
   }
  },
  {
   "question": {
    "ar": "أي سطر يربط الخاصية disabled بالمتغير isLocked؟",
    "en": "Which line binds the disabled attribute to isLocked?"
   },
   "options": [
    {
     "ar": "<button disabled=\"isLocked\">",
     "en": "<button disabled=\"isLocked\">"
    },
    {
     "ar": "<button {{ disabled }}>",
     "en": "<button {{ disabled }}>"
    },
    {
     "ar": "<button v-disabled=\"isLocked\">",
     "en": "<button v-disabled=\"isLocked\">"
    },
    {
     "ar": "<button :disabled=\"isLocked\">",
     "en": "<button :disabled=\"isLocked\">"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "نستخدم :attr للربط بقيمة ديناميكية، وهنا يتعطل الزر عندما تكون isLocked صحيحة.",
    "en": "We use :attr for a dynamic value; here the button is disabled when isLocked is true."
   }
  }
 ],
 "vue-08": [
  {
   "question": {
    "ar": "ما الخطأ هنا؟\n<p v-if=\"ok\">نعم</p>\n<span>فاصل</span>\n<p v-else>لا</p>",
    "en": "What is wrong here?\n<p v-if=\"ok\">Yes</p>\n<span>divider</span>\n<p v-else>No</p>"
   },
   "options": [
    {
     "ar": "v-else يجب أن يأتي مباشرة بعد عنصر v-if",
     "en": "v-else must come directly after the v-if element"
    },
    {
     "ar": "لا يمكن استخدام p مع v-if",
     "en": "p cannot be used with v-if"
    },
    {
     "ar": "v-else لا يقبل نصاً",
     "en": "v-else does not accept text"
    },
    {
     "ar": "لا يوجد خطأ",
     "en": "There is no error"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "v-else يجب أن يلي v-if أو v-else-if مباشرة، وإلا لن يتعرف Vue عليه.",
    "en": "v-else must immediately follow a v-if or v-else-if element, or Vue will not recognize it."
   }
  },
  {
   "question": {
    "ar": "إذا كانت قيمة الشرط في v-if خاطئة، ماذا يحدث للعنصر؟",
    "en": "If the v-if condition is false, what happens to the element?"
   },
   "options": [
    {
     "ar": "يُخفى بـ display:none فقط",
     "en": "It is only hidden with display:none"
    },
    {
     "ar": "يتحول لونه إلى الرمادي",
     "en": "It turns gray"
    },
    {
     "ar": "لا يُعرض في DOM",
     "en": "It is not rendered in the DOM"
    },
    {
     "ar": "يُعرض مرتين",
     "en": "It is rendered twice"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "v-if يضيف العنصر إلى DOM أو يزيله بحسب الشرط، وليس مجرد إخفاء بصري.",
    "en": "v-if adds or removes the element in the DOM based on the condition, not just a visual hide."
   }
  }
 ],
 "vue-09": [
  {
   "question": {
    "ar": "ما الناتج؟\nitems = ['A','B','C']\n<li v-for=\"x in items\">{{ x }}</li>",
    "en": "What is the output?\nitems = ['A','B','C']\n<li v-for=\"x in items\">{{ x }}</li>"
   },
   "options": [
    {
     "ar": "عنصر li واحد",
     "en": "One li element"
    },
    {
     "ar": "ثلاثة عناصر li تعرض A وB وC",
     "en": "Three li elements showing A, B, and C"
    },
    {
     "ar": "لا شيء",
     "en": "Nothing"
    },
    {
     "ar": "خطأ",
     "en": "An error"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "v-for يكرر العنصر لكل عنصر في المصفوفة.",
    "en": "v-for repeats the element once for each item in the array."
   }
  },
  {
   "question": {
    "ar": "لماذا نضيف :key عند استخدام v-for؟",
    "en": "Why do we add :key when using v-for?"
   },
   "options": [
    {
     "ar": "ليساعد Vue على تتبع كل عنصر وتحديث القائمة بكفاءة",
     "en": "To help Vue track each item and update the list efficiently"
    },
    {
     "ar": "ليغيّر لون العناصر",
     "en": "To change the items' color"
    },
    {
     "ar": "ليمنع تكرار العناصر",
     "en": "To prevent repeating items"
    },
    {
     "ar": "هو مطلوب لعمل {{ }}",
     "en": "It is required for {{ }} to work"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "المفتاح الفريد يسمح لـ Vue بمعرفة العنصر المتغير وإعادة استخدام الباقي.",
    "en": "A unique key lets Vue know which item changed and reuse the rest."
   }
  }
 ],
 "vue-10": [
  {
   "question": {
    "ar": "أي صيغة تنفّذ save عند الضغط على الزر فقط وليس عند عرض الصفحة؟",
    "en": "Which form runs save only on button click, not when the page renders?"
   },
   "options": [
    {
     "ar": "@click=\"save\"",
     "en": "@click=\"save\""
    },
    {
     "ar": "click=\"save\"",
     "en": "click=\"save\""
    },
    {
     "ar": "{{ save() }}",
     "en": "{{ save() }}"
    },
    {
     "ar": "v-if=\"save\"",
     "en": "v-if=\"save\""
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "@click يربط الدالة بحدث الضغط، أما {{ save() }} فتُنفَّذ أثناء العرض وclick بدون @ مجرد خاصية.",
    "en": "@click binds the function to the click event; {{ save() }} would run during render and click without @ is just an attribute."
   }
  },
  {
   "question": {
    "ar": "كيف نستمع لضغط مفتاح Enter في حقل إدخال؟",
    "en": "How do we listen for the Enter key in an input?"
   },
   "options": [
    {
     "ar": "@keyup.enter=\"submit\"",
     "en": "@keyup.enter=\"submit\""
    },
    {
     "ar": "@enter=\"submit\"",
     "en": "@enter=\"submit\""
    },
    {
     "ar": "v-enter=\"submit\"",
     "en": "v-enter=\"submit\""
    },
    {
     "ar": "@press=\"enter\"",
     "en": "@press=\"enter\""
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "المعدّلات مثل .enter تُضاف بعد اسم الحدث لتقييد الاستجابة بمفتاح معين.",
    "en": "Modifiers such as .enter are added after the event name to restrict it to a specific key."
   }
  }
 ],
 "vue-11": [
  {
   "question": {
    "ar": "ما قيمة name بعد أن يكتب المستخدم Ali في الحقل؟\n<input v-model=\"name\">",
    "en": "What is name after the user types Ali in the field?\n<input v-model=\"name\">"
   },
   "options": [
    {
     "ar": "تبقى فارغة",
     "en": "It stays empty"
    },
    {
     "ar": "Ali",
     "en": "Ali"
    },
    {
     "ar": "undefined",
     "en": "undefined"
    },
    {
     "ar": "null",
     "en": "null"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "v-model يحدّث المتغير فور الكتابة فتصبح قيمته ما أدخله المستخدم.",
    "en": "v-model updates the variable as the user types, so it holds what was entered."
   }
  },
  {
   "question": {
    "ar": "ما الأنسب لربط مربع اختيار checkbox واحد بقيمة صحيحة أو خاطئة؟",
    "en": "What best binds a single checkbox to a true or false value?"
   },
   "options": [
    {
     "ar": "<input type=\"checkbox\" v-model=\"agree\">",
     "en": "<input type=\"checkbox\" v-model=\"agree\">"
    },
    {
     "ar": "<input type=\"checkbox\" :agree>",
     "en": "<input type=\"checkbox\" :agree>"
    },
    {
     "ar": "<input type=\"checkbox\" @model=\"agree\">",
     "en": "<input type=\"checkbox\" @model=\"agree\">"
    },
    {
     "ar": "<checkbox>{{ agree }}</checkbox>",
     "en": "<checkbox>{{ agree }}</checkbox>"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "v-model مع checkbox يخزن true أو false تلقائياً بحسب التحديد.",
    "en": "v-model on a checkbox stores true or false automatically depending on its checked state."
   }
  }
 ],
 "vue-12": [
  {
   "question": {
    "ar": "ما class الناتج؟\n<div :class=\"{ red: isRed, big: isBig }\">\nisRed=true, isBig=false",
    "en": "What class results?\n<div :class=\"{ red: isRed, big: isBig }\">\nisRed=true, isBig=false"
   },
   "options": [
    {
     "ar": "red big",
     "en": "red big"
    },
    {
     "ar": "big",
     "en": "big"
    },
    {
     "ar": "red",
     "en": "red"
    },
    {
     "ar": "لا شيء",
     "en": "none"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "في صيغة الكائن تُضاف الأسماء التي قيمتها صحيحة فقط.",
    "en": "In object syntax, only class names whose value is true are added."
   }
  },
  {
   "question": {
    "ar": "كيف نكتب خاصية CSS ذات اسم مركب مثل font-size في :style؟",
    "en": "How do we write a hyphenated CSS property such as font-size in :style?"
   },
   "options": [
    {
     "ar": ":style=\"{ font-size: size }\"",
     "en": ":style=\"{ font-size: size }\""
    },
    {
     "ar": ":style=\"{ fontSize: size + 'px' }\"",
     "en": ":style=\"{ fontSize: size + 'px' }\""
    },
    {
     "ar": ":style=\"font-size=size\"",
     "en": ":style=\"font-size=size\""
    },
    {
     "ar": "style=\"{{ size }}\"",
     "en": "style=\"{{ size }}\""
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "داخل كائن JavaScript نستخدم camelCase مثل fontSize أو نضع الاسم بين علامتي اقتباس.",
    "en": "In a JavaScript object we use camelCase like fontSize, or quote the hyphenated name."
   }
  }
 ],
 "vue-13": [
  {
   "question": {
    "ar": "ما الخطأ عند استخدام <Card /> في القالب إذا لم نسجل المكون أو نستورده؟",
    "en": "What is wrong with using <Card /> in a template if the component was never registered or imported?"
   },
   "options": [
    {
     "ar": "لا يوجد خطأ",
     "en": "There is no error"
    },
    {
     "ar": "القوالب لا تقبل المكونات",
     "en": "Templates do not accept components"
    },
    {
     "ar": "Vue لن يعرف المكون ولن يعرضه",
     "en": "Vue will not recognize or render the component"
    },
    {
     "ar": "يجب أن يكون الاسم بالأرقام",
     "en": "The name must contain numbers"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "يجب تسجيل أو استيراد المكون قبل استخدامه في القالب.",
    "en": "A component must be registered or imported before it can be used in a template."
   }
  },
  {
   "question": {
    "ar": "ما الذي يحصل عند وضع <Counter /> ثلاث مرات في الصفحة؟",
    "en": "What happens when <Counter /> is placed three times on a page?"
   },
   "options": [
    {
     "ar": "تظهر نسخة واحدة فقط",
     "en": "Only one copy appears"
    },
    {
     "ar": "تُنشأ ثلاث نسخ مستقلة لكل منها حالتها",
     "en": "Three independent instances are created, each with its own state"
    },
    {
     "ar": "يحدث خطأ",
     "en": "An error occurs"
    },
    {
     "ar": "تشترك النسخ في نفس البيانات دائماً",
     "en": "The copies always share the same data"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "كل استخدام ينشئ نسخة مستقلة من المكون ببياناته الخاصة.",
    "en": "Each use creates a separate instance of the component with its own data."
   }
  }
 ],
 "vue-14": [
  {
   "question": {
    "ar": "كيف يمرر الأب قيمة النص 'Ali' إلى prop اسمها name؟",
    "en": "How does a parent pass the text 'Ali' to a prop named name?"
   },
   "options": [
    {
     "ar": "<Child name=\"Ali\" />",
     "en": "<Child name=\"Ali\" />"
    },
    {
     "ar": "<Child {{ name }} />",
     "en": "<Child {{ name }} />"
    },
    {
     "ar": "<Child @name=\"Ali\" />",
     "en": "<Child @name=\"Ali\" />"
    },
    {
     "ar": "<Child v-on:name=\"Ali\" />",
     "en": "<Child v-on:name=\"Ali\" />"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "النص الثابت يُمرر كخاصية HTML عادية، ولتمرير متغير نستخدم :name.",
    "en": "A static string is passed as a normal attribute; to pass a variable we use :name."
   }
  },
  {
   "question": {
    "ar": "لماذا لا يجب أن يعدّل الـ Child قيمة prop مباشرة؟",
    "en": "Why should a child not modify a prop directly?"
   },
   "options": [
    {
     "ar": "لأنها قيمة ثابتة لا تُقرأ",
     "en": "Because it cannot be read"
    },
    {
     "ar": "لأن البيانات تتدفق من الأب إلى الابن وملكيتها للأب",
     "en": "Because data flows from parent to child and the parent owns it"
    },
    {
     "ar": "لأن Vue تحذف الـ props",
     "en": "Because Vue deletes props"
    },
    {
     "ar": "لا مشكلة في التعديل",
     "en": "There is no problem modifying it"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "تدفق البيانات في اتجاه واحد يجعل التطبيق أسهل في التتبع، ولتغييرها يُرسل الابن حدثاً للأب.",
    "en": "One-way data flow keeps the app easy to follow; to change it, the child emits an event to the parent."
   }
  }
 ],
 "vue-15": [
  {
   "question": {
    "ar": "أي سطر يطلق حدثاً اسمه save مع قيمة 5 في Options API؟",
    "en": "Which line fires an event named save with the value 5 in the Options API?"
   },
   "options": [
    {
     "ar": "this.emit('save', 5)",
     "en": "this.emit('save', 5)"
    },
    {
     "ar": "this.$emit('save', 5)",
     "en": "this.$emit('save', 5)"
    },
    {
     "ar": "this.save(5)",
     "en": "this.save(5)"
    },
    {
     "ar": "this.$props.save(5)",
     "en": "this.$props.save(5)"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الدالة $emit تأخذ اسم الحدث ثم القيم التي نريد إرسالها للأب.",
    "en": "$emit takes the event name followed by the values to send to the parent."
   }
  },
  {
   "question": {
    "ar": "الابن يطلق emit('done') لكن الأب لا يتفاعل. ما السبب الأرجح؟",
    "en": "The child emits 'done' but the parent does not react. What is the most likely cause?"
   },
   "options": [
    {
     "ar": "الأب لم يضف @done على وسم الابن",
     "en": "The parent did not add @done on the child tag"
    },
    {
     "ar": "الابن لا يملك قالباً",
     "en": "The child has no template"
    },
    {
     "ar": "emit لا يعمل إلا مع أحداث click",
     "en": "emit only works with click events"
    },
    {
     "ar": "يجب استخدام v-model بدلاً منه",
     "en": "v-model must be used instead"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الأب يستمع للحدث المخصص عبر @done=\"handler\" على المكون الابن.",
    "en": "The parent listens to the custom event with @done=\"handler\" on the child component."
   }
  }
 ],
 "vue-16": [
  {
   "question": {
    "ar": "أين نستدعي ref وcomputed عند استخدام <script setup>؟",
    "en": "Where do we call ref and computed when using <script setup>?"
   },
   "options": [
    {
     "ar": "داخل <script setup> بعد استيرادها من vue",
     "en": "Inside <script setup> after importing them from vue"
    },
    {
     "ar": "داخل وسوم <style>",
     "en": "Inside <style> tags"
    },
    {
     "ar": "داخل <template> فقط",
     "en": "Only inside <template>"
    },
    {
     "ar": "لا تحتاج استيراداً أبداً",
     "en": "They never need importing"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "نستورد الدوال من 'vue' ونكتب المنطق داخل script setup ويصبح متاحاً للقالب.",
    "en": "We import the functions from 'vue' and write the logic in script setup, making it available to the template."
   }
  },
  {
   "question": {
    "ar": "ما ميزة تجميع المنطق المتعلق بميزة واحدة معاً في Composition API؟",
    "en": "What is the benefit of grouping logic for one feature together in the Composition API?"
   },
   "options": [
    {
     "ar": "يصبح الكود أصعب في القراءة",
     "en": "The code becomes harder to read"
    },
    {
     "ar": "يسهل تنظيمه وإعادة استخدامه",
     "en": "It is easier to organize and reuse"
    },
    {
     "ar": "يمنع استخدام القوالب",
     "en": "It prevents using templates"
    },
    {
     "ar": "يوقف التفاعلية",
     "en": "It stops reactivity"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "تجميع المنطق بحسب الميزة يجعل المكونات الكبيرة أنظف ويسهّل استخراج دوال قابلة لإعادة الاستخدام.",
    "en": "Grouping by feature keeps large components cleaner and makes it easy to extract reusable functions."
   }
  }
 ],
 "vue-17": [
  {
   "question": {
    "ar": "ما الخطأ؟\nconst n = ref(0)\nn++",
    "en": "What is wrong?\nconst n = ref(0)\nn++"
   },
   "options": [
    {
     "ar": "لا شيء",
     "en": "Nothing"
    },
    {
     "ar": "يجب استخدام n.value++ في JavaScript",
     "en": "n.value++ must be used in JavaScript"
    },
    {
     "ar": "ref لا تقبل الأرقام",
     "en": "ref does not accept numbers"
    },
    {
     "ar": "يجب استخدام reactive",
     "en": "reactive must be used"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "ref تغلف القيمة في كائن، فنصل إليها داخل JavaScript عبر .value.",
    "en": "ref wraps the value in an object, so in JavaScript you access it through .value."
   }
  },
  {
   "question": {
    "ar": "كيف نعرض ref اسمها count في القالب؟",
    "en": "How do we display a ref named count in the template?"
   },
   "options": [
    {
     "ar": "{{ count.value }}",
     "en": "{{ count.value }}"
    },
    {
     "ar": "{{ ref(count) }}",
     "en": "{{ ref(count) }}"
    },
    {
     "ar": "{{ count }}",
     "en": "{{ count }}"
    },
    {
     "ar": "{{ $count }}",
     "en": "{{ $count }}"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "القالب يفك ref تلقائياً فلا نحتاج إلى .value هناك.",
    "en": "The template unwraps refs automatically, so .value is not needed there."
   }
  }
 ],
 "vue-18": [
  {
   "question": {
    "ar": "ما الذي يطبعه هذا الكود عندما تتغير q من 'a' إلى 'ab'؟\nwatch(q,(n,o)=>console.log(o,n))",
    "en": "What does this log when q changes from 'a' to 'ab'?\nwatch(q,(n,o)=>console.log(o,n))"
   },
   "options": [
    {
     "ar": "ab a",
     "en": "ab a"
    },
    {
     "ar": "a ab",
     "en": "a ab"
    },
    {
     "ar": "a",
     "en": "a"
    },
    {
     "ar": "لا شيء",
     "en": "nothing"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الوسيط الأول للدالة هو القيمة الجديدة والثاني القديمة، لذا نطبع القديمة a ثم الجديدة ab.",
    "en": "The callback receives (new, old); we print old a then new ab."
   }
  },
  {
   "question": {
    "ar": "متى نفضّل watch على computed؟",
    "en": "When do we prefer watch over computed?"
   },
   "options": [
    {
     "ar": "لاشتقاق نص من بيانات أخرى",
     "en": "To derive text from other data"
    },
    {
     "ar": "لتنفيذ عملية جانبية مثل طلب شبكة عند تغير قيمة",
     "en": "To run a side effect such as a network request when a value changes"
    },
    {
     "ar": "لعرض قيمة في القالب فقط",
     "en": "To simply show a value in the template"
    },
    {
     "ar": "لتعريف دالة عند الضغط",
     "en": "To define a click handler"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "computed للقيم المشتقة، أما watch فمناسب للأعمال الجانبية عند حدوث التغيير.",
    "en": "computed is for derived values, while watch suits side effects triggered by a change."
   }
  }
 ],
 "vue-19": [
  {
   "question": {
    "ar": "أين نضع طلب جلب البيانات الذي نريده عند ظهور المكون على الصفحة؟",
    "en": "Where do we put a data fetch we want to run when the component appears on the page?"
   },
   "options": [
    {
     "ar": "داخل onMounted",
     "en": "Inside onMounted"
    },
    {
     "ar": "داخل <style>",
     "en": "Inside <style>"
    },
    {
     "ar": "بعد حذف المكون",
     "en": "After the component is removed"
    },
    {
     "ar": "داخل الـ props",
     "en": "Inside the props"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "onMounted يعمل بعد إدخال المكون في DOM، وهو مكان شائع لجلب البيانات الأولية.",
    "en": "onMounted runs after the component is inserted into the DOM and is a common place for initial data fetching."
   }
  },
  {
   "question": {
    "ar": "أي hook مناسب لتنظيف مؤقت setInterval قبل إزالة المكون؟",
    "en": "Which hook is suitable for clearing a setInterval before the component is removed?"
   },
   "options": [
    {
     "ar": "onMounted",
     "en": "onMounted"
    },
    {
     "ar": "onUpdated",
     "en": "onUpdated"
    },
    {
     "ar": "onBeforeUnmount",
     "en": "onBeforeUnmount"
    },
    {
     "ar": "watch",
     "en": "watch"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "onBeforeUnmount يعمل قبل إزالة المكون فنوقف فيه المؤقتات والمستمعات لتجنب التسريب.",
    "en": "onBeforeUnmount runs just before removal, so we stop timers and listeners there to avoid leaks."
   }
  }
 ],
 "vue-20": [
  {
   "question": {
    "ar": "ما فائدة @submit.prevent على النموذج؟",
    "en": "What is the benefit of @submit.prevent on a form?"
   },
   "options": [
    {
     "ar": "يمنع إعادة تحميل الصفحة ويسمح لدالتنا بمعالجة الإرسال",
     "en": "It stops the page reload and lets our method handle the submit"
    },
    {
     "ar": "يحذف الحقول",
     "en": "It deletes the fields"
    },
    {
     "ar": "يمنع كتابة أي بيانات",
     "en": "It prevents typing any data"
    },
    {
     "ar": "يرسل النموذج مرتين",
     "en": "It submits the form twice"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "بدون prevent يعيد المتصفح تحميل الصفحة قبل أن نتحقق من البيانات.",
    "en": "Without prevent, the browser reloads the page before we can validate the data."
   }
  },
  {
   "question": {
    "ar": "أي شرط تحقق مناسب لمنع إرسال بريد فارغ؟",
    "en": "Which validation check suits blocking an empty email from being submitted?"
   },
   "options": [
    {
     "ar": "if (email) send()",
     "en": "if (email) send()"
    },
    {
     "ar": "if (!email) { error = 'Required'; return }",
     "en": "if (!email) { error = 'Required'; return }"
    },
    {
     "ar": "email = ''",
     "en": "email = ''"
    },
    {
     "ar": "if (email === email) send()",
     "en": "if (email === email) send()"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "نفحص القيمة، وإذا كانت فارغة نعرض رسالة خطأ ونوقف الإرسال بـ return.",
    "en": "We check the value; if empty, we show an error message and stop the submit with return."
   }
  }
 ],
 "vue-21": [
  {
   "question": {
    "ar": "أي مكون من Vue Router نستخدمه لإنشاء رابط تنقل بدون إعادة تحميل الصفحة؟",
    "en": "Which Vue Router component creates a navigation link without a page reload?"
   },
   "options": [
    {
     "ar": "<a href>",
     "en": "<a href>"
    },
    {
     "ar": "<RouterLink to=\"/about\">",
     "en": "<RouterLink to=\"/about\">"
    },
    {
     "ar": "<RouterView>",
     "en": "<RouterView>"
    },
    {
     "ar": "<Link src>",
     "en": "<Link src>"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "RouterLink يغيّر المسار داخل التطبيق دون تحميل صفحة جديدة، أما RouterView فيعرض المكون المطابق.",
    "en": "RouterLink changes the route inside the app without a full page load, while RouterView renders the matched component."
   }
  },
  {
   "question": {
    "ar": "أين يظهر المكون المطابق للمسار الحالي؟",
    "en": "Where does the component matching the current route appear?"
   },
   "options": [
    {
     "ar": "داخل <RouterView />",
     "en": "Inside <RouterView />"
    },
    {
     "ar": "داخل <head>",
     "en": "Inside <head>"
    },
    {
     "ar": "داخل <RouterLink>",
     "en": "Inside <RouterLink>"
    },
    {
     "ar": "في وحدة التحكم",
     "en": "In the console"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "RouterView هو المكان الذي يعرض فيه الراوتر مكون الصفحة الحالية.",
    "en": "RouterView is the placeholder where the router renders the current page's component."
   }
  }
 ],
 "vue-22": [
  {
   "question": {
    "ar": "ما المشكلة التي يحلها store مشترك مثل Pinia؟",
    "en": "What problem does a shared store such as Pinia solve?"
   },
   "options": [
    {
     "ar": "تمرير نفس البيانات عبر طبقات كثيرة من props",
     "en": "Passing the same data through many layers of props"
    },
    {
     "ar": "تحويل CSS إلى JavaScript",
     "en": "Converting CSS to JavaScript"
    },
    {
     "ar": "منع استخدام المكونات",
     "en": "Preventing the use of components"
    },
    {
     "ar": "تسريع الإنترنت",
     "en": "Speeding up the internet"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "المخزن يتيح لأي مكون الوصول إلى الحالة المشتركة مباشرة بدل تمريرها يدوياً.",
    "en": "A store lets any component reach shared state directly instead of passing it down manually."
   }
  },
  {
   "question": {
    "ar": "متى نبقي الحالة محلية داخل المكون بدل وضعها في store عام؟",
    "en": "When should state stay local inside a component rather than in a global store?"
   },
   "options": [
    {
     "ar": "عندما يحتاجها هذا المكون وحده",
     "en": "When only that component needs it"
    },
    {
     "ar": "عندما تستخدمها كل الصفحات",
     "en": "When every page uses it"
    },
    {
     "ar": "عندما تتشاركها عشرة مكونات",
     "en": "When ten components share it"
    },
    {
     "ar": "لا يجوز ذلك",
     "en": "That is never allowed"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الحالة الخاصة بمكون واحد لا تحتاج إلى store، ونضع المشتركة فقط في المخزن.",
    "en": "State used by a single component needs no store; only shared state belongs in the store."
   }
  }
 ]
};
