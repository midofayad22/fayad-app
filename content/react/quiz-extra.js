export const EXTRA = {
 "react-01": [
  {
   "question": {
    "ar": "ما الذي تفعله React عادة عندما تتغير البيانات؟",
    "en": "What does React typically do when data changes?"
   },
   "options": [
    {
     "ar": "تحذف المتصفح",
     "en": "It deletes the browser"
    },
    {
     "ar": "تحدّث الأجزاء المتأثرة من الواجهة",
     "en": "It updates the affected parts of the interface"
    },
    {
     "ar": "تعيد كتابة ملفات CSS",
     "en": "It rewrites the CSS files"
    },
    {
     "ar": "تغلق التطبيق",
     "en": "It closes the application"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "React مصممة للواجهات التي تتغير بياناتها باستمرار فتحدّث ما تأثر بالتغيير.",
    "en": "React is built for interfaces whose data changes constantly, so it updates what was affected."
   }
  },
  {
   "question": {
    "ar": "فريق يبني لوحة تحكم تفاعلية كبيرة. لماذا قد يختار React؟",
    "en": "A team builds a large interactive dashboard. Why might it choose React?"
   },
   "options": [
    {
     "ar": "لأنها تمنع استخدام JavaScript",
     "en": "Because it forbids JavaScript"
    },
    {
     "ar": "لأنها تقسم الواجهة إلى مكونات منظمة قابلة لإعادة الاستخدام",
     "en": "Because it splits the UI into organized reusable components"
    },
    {
     "ar": "لأنها تعمل بدون متصفح فقط",
     "en": "Because it only works without a browser"
    },
    {
     "ar": "لأنها تحول الموقع إلى صورة",
     "en": "Because it turns the site into an image"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المكونات تنظّم الواجهات الكبيرة والتفاعلية وتسهّل صيانتها.",
    "en": "Components organize large interactive UIs and make them easier to maintain."
   }
  }
 ],
 "react-02": [
  {
   "question": {
    "ar": "لديك زر يظهر في عشرة أماكن. ما فائدة React هنا؟",
    "en": "A button appears in ten places. How does React help?"
   },
   "options": [
    {
     "ar": "تنسخ الكود عشر مرات",
     "en": "Copy the code ten times"
    },
    {
     "ar": "لا يمكن تكراره",
     "en": "It cannot be repeated"
    },
    {
     "ar": "تستخدم عشرة ملفات HTML",
     "en": "Use ten HTML files"
    },
    {
     "ar": "تكتب المكون مرة وتستخدمه في الأماكن العشرة",
     "en": "Write the component once and use it in all ten places"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "إعادة الاستخدام تعني مكوناً واحداً يُستعمل في أماكن متعددة، فأي تعديل يطبق في كل مكان.",
    "en": "Reuse means one component used in many places, so one change applies everywhere."
   }
  },
  {
   "question": {
    "ar": "أي فائدة تنتج من تقسيم التطبيق الكبير إلى أجزاء صغيرة؟",
    "en": "What benefit comes from splitting a large app into small parts?"
   },
   "options": [
    {
     "ar": "يمكن تطوير واختبار كل جزء بشكل مستقل",
     "en": "Each part can be developed and tested independently"
    },
    {
     "ar": "تختفي الأخطاء تلقائياً",
     "en": "Bugs vanish automatically"
    },
    {
     "ar": "يصبح التطبيق أبطأ دائماً",
     "en": "The app always becomes slower"
    },
    {
     "ar": "لا حاجة لاختبار أي جزء",
     "en": "No part needs testing"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الأجزاء المستقلة أسهل في التطوير والاختبار والصيانة.",
    "en": "Independent parts are easier to develop, test and maintain."
   }
  }
 ],
 "react-03": [
  {
   "question": {
    "ar": "أي مما يلي يُعد مكوناً صحيحاً في React؟",
    "en": "Which of these is a valid React component?"
   },
   "options": [
    {
     "ar": "return Card;",
     "en": "return Card;"
    },
    {
     "ar": "const x = 5;",
     "en": "const x = 5;"
    },
    {
     "ar": "function Card() { return <div>Hi</div>; }",
     "en": "function Card() { return <div>Hi</div>; }"
    },
    {
     "ar": "Card = <div>",
     "en": "Card = <div>"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "المكون دالة تعيد JSX، ويفضّل أن يبدأ اسمها بحرف كبير.",
    "en": "A component is a function that returns JSX, and its name should start with a capital letter."
   }
  },
  {
   "question": {
    "ar": "ما الخطأ في هذا الكود؟ function card(){ return <p>Hi</p>; } ثم استخدام <card />",
    "en": "What is wrong here? function card(){ return <p>Hi</p>; } used as <card />"
   },
   "options": [
    {
     "ar": "لا يوجد خطأ",
     "en": "Nothing is wrong"
    },
    {
     "ar": "React تعامل card كوسم HTML عادي لأن اسمه يبدأ بحرف صغير",
     "en": "React treats card as a plain HTML tag because it starts lowercase"
    },
    {
     "ar": "لا يمكن إرجاع p",
     "en": "You cannot return p"
    },
    {
     "ar": "الدالة يجب ألا تعيد شيئاً",
     "en": "The function must return nothing"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "أسماء المكونات تبدأ بحرف كبير، وإلا اعتبرتها React عنصر HTML.",
    "en": "Component names must start with a capital letter, otherwise React treats them as HTML elements."
   }
  }
 ],
 "react-04": [
  {
   "question": {
    "ar": "ماذا سيعرض هذا الكود؟ const n = 3; <p>{n + 2}</p>",
    "en": "What will this render? const n = 3; <p>{n + 2}</p>"
   },
   "options": [
    {
     "ar": "32",
     "en": "32"
    },
    {
     "ar": "5",
     "en": "5"
    },
    {
     "ar": "خطأ",
     "en": "An error"
    },
    {
     "ar": "n + 2",
     "en": "n + 2"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الأقواس المعقوفة تقيّم تعبير JavaScript فيصبح الناتج 5.",
    "en": "Curly braces evaluate a JavaScript expression, so the result is 5."
   }
  },
  {
   "question": {
    "ar": "أي سطر JSX هو الصحيح لإضافة class؟",
    "en": "Which JSX line correctly adds a class?"
   },
   "options": [
    {
     "ar": "<div klass=\"box\">",
     "en": "<div klass=\"box\">"
    },
    {
     "ar": "<div .box>",
     "en": "<div .box>"
    },
    {
     "ar": "<div class=\"box\">",
     "en": "<div class=\"box\">"
    },
    {
     "ar": "<div className=\"box\">",
     "en": "<div className=\"box\">"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "في JSX نستخدم className لأن class كلمة محجوزة في JavaScript.",
    "en": "JSX uses className because class is a reserved word in JavaScript."
   }
  }
 ],
 "react-05": [
  {
   "question": {
    "ar": "ما ناتج هذا الكود؟ function Hi({name}){ return <p>Hi {name}</p>; } ... <Hi name=\"Sara\" />",
    "en": "What is the output? function Hi({name}){ return <p>Hi {name}</p>; } ... <Hi name=\"Sara\" />"
   },
   "options": [
    {
     "ar": "خطأ",
     "en": "An error"
    },
    {
     "ar": "Hi name",
     "en": "Hi name"
    },
    {
     "ar": "Hi Sara",
     "en": "Hi Sara"
    },
    {
     "ar": "Hi",
     "en": "Hi"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "القيمة المرسلة في الوسم name تصل للمكون كـ prop وتُعرض داخل JSX.",
    "en": "The value passed as name arrives as a prop and is rendered in the JSX."
   }
  },
  {
   "question": {
    "ar": "ما الخطأ هنا؟ function A(props){ props.title = 'x'; return <h1>{props.title}</h1>; }",
    "en": "What is wrong here? function A(props){ props.title = 'x'; return <h1>{props.title}</h1>; }"
   },
   "options": [
    {
     "ar": "لا يوجد خطأ",
     "en": "Nothing is wrong"
    },
    {
     "ar": "الـ props للقراءة فقط ولا تُعدّل مباشرة",
     "en": "Props are read-only and must not be mutated"
    },
    {
     "ar": "h1 غير مسموح",
     "en": "h1 is not allowed"
    },
    {
     "ar": "يجب استخدام var",
     "en": "var must be used"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "لتغيير القيمة نستخدم state أو نمرر قيمة جديدة من المكون الأب.",
    "en": "To change a value use state or pass a new value from the parent."
   }
  }
 ],
 "react-06": [
  {
   "question": {
    "ar": "أي مما يلي مناسب ليكون state؟",
    "en": "Which of these is suitable as state?"
   },
   "options": [
    {
     "ar": "عدد العناصر في السلة الذي يتغير عند الضغط",
     "en": "The cart item count that changes on click"
    },
    {
     "ar": "اسم الدالة",
     "en": "A function name"
    },
    {
     "ar": "اسم الملف",
     "en": "A file name"
    },
    {
     "ar": "اسم الثابت PI",
     "en": "The constant PI"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "State للبيانات التي تتغير مع الوقت وتؤثر على ما يظهر.",
    "en": "State is for data that changes over time and affects what is displayed."
   }
  },
  {
   "question": {
    "ar": "ما الخطأ؟ const [n,setN]=useState(0); n = n + 1;",
    "en": "What is wrong? const [n,setN]=useState(0); n = n + 1;"
   },
   "options": [
    {
     "ar": "useState لا تقبل صفر",
     "en": "useState does not accept zero"
    },
    {
     "ar": "يجب أن يكون n نصاً",
     "en": "n must be a string"
    },
    {
     "ar": "لا يوجد خطأ",
     "en": "Nothing is wrong"
    },
    {
     "ar": "تغيير المتغير مباشرة لا يعيد الرسم؛ يجب استخدام setN",
     "en": "Mutating directly does not re-render; use setN"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "التغيير المباشر لا يخبر React، أما دالة التحديث فتطلب إعادة الرسم.",
    "en": "Direct mutation does not notify React; the setter schedules a re-render."
   }
  }
 ],
 "react-07": [
  {
   "question": {
    "ar": "أي كتابة صحيحة لمعالج النقر؟",
    "en": "Which click handler is written correctly?"
   },
   "options": [
    {
     "ar": "<button click={handle}>",
     "en": "<button click={handle}>"
    },
    {
     "ar": "<button onClick={handle()}>",
     "en": "<button onClick={handle()}>"
    },
    {
     "ar": "<button onClick={handle}>",
     "en": "<button onClick={handle}>"
    },
    {
     "ar": "<button onclick=handle>",
     "en": "<button onclick=handle>"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "نمرر الدالة نفسها دون استدعائها، وإلا ستعمل أثناء الرسم.",
    "en": "Pass the function itself without calling it, otherwise it runs during render."
   }
  },
  {
   "question": {
    "ar": "ماذا يعيد e.target.value في حدث onChange لحقل إدخال؟",
    "en": "What does e.target.value return in an input's onChange?"
   },
   "options": [
    {
     "ar": "النص الحالي في الحقل",
     "en": "The current text in the field"
    },
    {
     "ar": "اسم الصفحة",
     "en": "The page name"
    },
    {
     "ar": "لون الحقل",
     "en": "The field color"
    },
    {
     "ar": "لا شيء",
     "en": "Nothing"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الحدث يحمل العنصر الذي أطلقه، وقيمته هي ما كتبه المستخدم.",
    "en": "The event carries the element that fired it, and its value is what the user typed."
   }
  }
 ],
 "react-08": [
  {
   "question": {
    "ar": "ماذا يظهر؟ {isLoggedIn && <p>Welcome</p>} وكانت isLoggedIn = false",
    "en": "What shows? {isLoggedIn && <p>Welcome</p>} with isLoggedIn = false"
   },
   "options": [
    {
     "ar": "لا شيء",
     "en": "Nothing"
    },
    {
     "ar": "خطأ",
     "en": "An error"
    },
    {
     "ar": "isLoggedIn",
     "en": "isLoggedIn"
    },
    {
     "ar": "Welcome",
     "en": "Welcome"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "عندما يكون الشرط false لا يُعرض العنصر بعد &&.",
    "en": "When the condition is false the element after && is not rendered."
   }
  },
  {
   "question": {
    "ar": "أي تعبير يعرض Login أو Logout حسب الحالة؟",
    "en": "Which expression shows Login or Logout based on state?"
   },
   "options": [
    {
     "ar": "{for user}",
     "en": "{for user}"
    },
    {
     "ar": "{user -> Login}",
     "en": "{user -> Login}"
    },
    {
     "ar": "{user ? <Logout /> : <Login />}",
     "en": "{user ? <Logout /> : <Login />}"
    },
    {
     "ar": "{user = <Logout />}",
     "en": "{user = <Logout />}"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "العامل الثلاثي يختار بين عنصرين داخل JSX.",
    "en": "The ternary operator picks between two elements inside JSX."
   }
  }
 ],
 "react-09": [
  {
   "question": {
    "ar": "ما المشكلة؟ items.map(i => <li>{i}</li>)",
    "en": "What is the problem? items.map(i => <li>{i}</li>)"
   },
   "options": [
    {
     "ar": "li ممنوع",
     "en": "li is forbidden"
    },
    {
     "ar": "لا مشكلة إطلاقاً",
     "en": "No problem at all"
    },
    {
     "ar": "ينقصه key لكل عنصر",
     "en": "Each element is missing a key"
    },
    {
     "ar": "map لا تعمل مع المصفوفات",
     "en": "map does not work on arrays"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "React تحتاج key ثابتاً لتتعرف على كل عنصر في القائمة.",
    "en": "React needs a stable key to identify each item in the list."
   }
  },
  {
   "question": {
    "ar": "أي key أفضل لقائمة مستخدمين قد تُعاد ترتيبها؟",
    "en": "Which key is best for a reorderable list of users?"
   },
   "options": [
    {
     "ar": "index الموضع",
     "en": "The array index"
    },
    {
     "ar": "Math.random()",
     "en": "Math.random()"
    },
    {
     "ar": "user.id",
     "en": "user.id"
    },
    {
     "ar": "نص ثابت 'a'",
     "en": "The fixed text 'a'"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "المعرّف الثابت يبقى مع العنصر عند إعادة الترتيب، بخلاف الفهرس.",
    "en": "A stable id stays with the item when reordered, unlike the index."
   }
  }
 ],
 "react-10": [
  {
   "question": {
    "ar": "ما الذي يجعل حقل الإدخال Controlled؟",
    "en": "What makes an input controlled?"
   },
   "options": [
    {
     "ar": "<input value={name} onChange={e => setName(e.target.value)} />",
     "en": "<input value={name} onChange={e => setName(e.target.value)} />"
    },
    {
     "ar": "<input type=\"text\">",
     "en": "<input type=\"text\">"
    },
    {
     "ar": "<input id=\"name\">",
     "en": "<input id=\"name\">"
    },
    {
     "ar": "<input />",
     "en": "<input />"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "قيمة الحقل تأتي من state ويحدّثها onChange.",
    "en": "The value comes from state and onChange updates it."
   }
  },
  {
   "question": {
    "ar": "لماذا نستدعي e.preventDefault() في onSubmit؟",
    "en": "Why call e.preventDefault() in onSubmit?"
   },
   "options": [
    {
     "ar": "لحذف النموذج",
     "en": "To delete the form"
    },
    {
     "ar": "لتشفير البيانات",
     "en": "To encrypt the data"
    },
    {
     "ar": "لتسريع الشبكة",
     "en": "To speed up the network"
    },
    {
     "ar": "لمنع إعادة تحميل الصفحة الافتراضية عند الإرسال",
     "en": "To stop the default page reload on submit"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "بدونها يعيد المتصفح تحميل الصفحة ويضيع state.",
    "en": "Without it the browser reloads the page and state is lost."
   }
  }
 ],
 "react-11": [
  {
   "question": {
    "ar": "ما المثال الأقرب للـ Composition؟",
    "en": "Which is closest to composition?"
   },
   "options": [
    {
     "ar": "حذف المكونات",
     "en": "Deleting components"
    },
    {
     "ar": "<Page><Header /><Content /></Page>",
     "en": "<Page><Header /><Content /></Page>"
    },
    {
     "ar": "كتابة كل شيء في ملف واحد",
     "en": "Writing everything in one file"
    },
    {
     "ar": "نسخ الكود",
     "en": "Copying code"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "نبني مكوناً كبيراً من مكونات أصغر مجمّعة.",
    "en": "A large component is built by combining smaller ones."
   }
  },
  {
   "question": {
    "ar": "ماذا يعرض <Box>Hello</Box> إذا كان Box يعيد <div>{children}</div>؟",
    "en": "What does <Box>Hello</Box> render if Box returns <div>{children}</div>?"
   },
   "options": [
    {
     "ar": "div فارغ",
     "en": "An empty div"
    },
    {
     "ar": "div يحتوي Hello",
     "en": "A div containing Hello"
    },
    {
     "ar": "خطأ",
     "en": "An error"
    },
    {
     "ar": "children",
     "en": "children"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "المحتوى بين وسمي المكون يصل كـ children.",
    "en": "Content between the tags arrives as children."
   }
  }
 ],
 "react-12": [
  {
   "question": {
    "ar": "أين يجب استدعاء Hook مثل useState؟",
    "en": "Where must a Hook like useState be called?"
   },
   "options": [
    {
     "ar": "في المستوى الأعلى من المكون",
     "en": "At the top level of the component"
    },
    {
     "ar": "بعد return",
     "en": "After return"
    },
    {
     "ar": "خارج أي دالة",
     "en": "Outside any function"
    },
    {
     "ar": "داخل حلقة أو شرط",
     "en": "Inside a loop or condition"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "Hooks تُستدعى في أعلى المكون وبنفس الترتيب في كل رسم.",
    "en": "Hooks are called at the top level in the same order on every render."
   }
  },
  {
   "question": {
    "ar": "ما الخطأ؟ if (open) { const [n,setN] = useState(0); }",
    "en": "What is wrong? if (open) { const [n,setN] = useState(0); }"
   },
   "options": [
    {
     "ar": "الصفر غير مسموح",
     "en": "Zero is not allowed"
    },
    {
     "ar": "open خاطئ الاسم",
     "en": "open is a bad name"
    },
    {
     "ar": "لا خطأ",
     "en": "Nothing"
    },
    {
     "ar": "Hook داخل شرط يخالف قواعد Hooks",
     "en": "A Hook inside a condition breaks the rules of Hooks"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "يجب أن يُستدعى الHook في كل رسم ليبقى الترتيب ثابتاً.",
    "en": "A Hook must run on every render so the order stays stable."
   }
  }
 ],
 "react-13": [
  {
   "question": {
    "ar": "ما قيمة count بعد نقرة واحدة؟ const [count,setCount]=useState(0); onClick={() => setCount(count + 1)}",
    "en": "What is count after one click? const [count,setCount]=useState(0); onClick={() => setCount(count + 1)}"
   },
   "options": [
    {
     "ar": "undefined",
     "en": "undefined"
    },
    {
     "ar": "0",
     "en": "0"
    },
    {
     "ar": "1",
     "en": "1"
    },
    {
     "ar": "2",
     "en": "2"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الاستدعاء يطلب إعادة رسم بالقيمة الجديدة 1.",
    "en": "The call triggers a re-render with the new value 1."
   }
  },
  {
   "question": {
    "ar": "أي طريقة آمنة لتحديث state بناءً على قيمتها السابقة؟",
    "en": "Which is the safe way to update state from its previous value?"
   },
   "options": [
    {
     "ar": "setCount(prev => prev + 1)",
     "en": "setCount(prev => prev + 1)"
    },
    {
     "ar": "count++",
     "en": "count++"
    },
    {
     "ar": "count = count + 1",
     "en": "count = count + 1"
    },
    {
     "ar": "useState(count + 1)",
     "en": "useState(count + 1)"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "صيغة الدالة تضمن استخدام أحدث قيمة.",
    "en": "The function form guarantees the latest value is used."
   }
  }
 ],
 "react-14": [
  {
   "question": {
    "ar": "متى يعمل هذا التأثير؟ useEffect(() => { document.title = n; }, [n]);",
    "en": "When does this effect run? useEffect(() => { document.title = n; }, [n]);"
   },
   "options": [
    {
     "ar": "عند كل تغير في n وبعد الرسم الأول",
     "en": "After first render and whenever n changes"
    },
    {
     "ar": "أبداً",
     "en": "Never"
    },
    {
     "ar": "عند كل نقرة في الصفحة",
     "en": "On every click on the page"
    },
    {
     "ar": "مرة واحدة فقط",
     "en": "Only once"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "مصفوفة الاعتماديات تحدد متى يُعاد تشغيل التأثير.",
    "en": "The dependency array decides when the effect reruns."
   }
  },
  {
   "question": {
    "ar": "ما وظيفة دالة الإرجاع داخل useEffect؟",
    "en": "What is the function returned inside useEffect for?"
   },
   "options": [
    {
     "ar": "تعطيل التأثير",
     "en": "Disabling the effect"
    },
    {
     "ar": "تغيير الprops",
     "en": "Changing props"
    },
    {
     "ar": "تعيد قيمة للمكون",
     "en": "Returning a value to the component"
    },
    {
     "ar": "التنظيف مثل إلغاء الاشتراك أو المؤقت",
     "en": "Cleanup, such as clearing a timer or subscription"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "دالة التنظيف تعمل قبل إعادة التأثير أو عند إزالة المكون.",
    "en": "Cleanup runs before the effect reruns or when the component unmounts."
   }
  }
 ],
 "react-15": [
  {
   "question": {
    "ar": "ما الكود الذي يركّز حقل الإدخال عند النقر؟",
    "en": "Which code focuses the input on click?"
   },
   "options": [
    {
     "ar": "input.current = focus",
     "en": "input.current = focus"
    },
    {
     "ar": "inputRef.current.focus()",
     "en": "inputRef.current.focus()"
    },
    {
     "ar": "inputRef.focus()",
     "en": "inputRef.focus()"
    },
    {
     "ar": "useRef.focus()",
     "en": "useRef.focus()"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الوصول لعنصر DOM يتم عبر ref.current.",
    "en": "The DOM element is reached through ref.current."
   }
  },
  {
   "question": {
    "ar": "لماذا لا يظهر الرقم الجديد؟ ref.current += 1; return <p>{ref.current}</p>;",
    "en": "Why does the new number not appear? ref.current += 1; return <p>{ref.current}</p>;"
   },
   "options": [
    {
     "ar": "تغيير ref لا يسبب إعادة رسم",
     "en": "Changing a ref does not trigger a re-render"
    },
    {
     "ar": "ref ممنوع في JSX",
     "en": "ref is forbidden in JSX"
    },
    {
     "ar": "الرقم يجب أن يكون نصاً",
     "en": "The number must be text"
    },
    {
     "ar": "هناك خطأ في p",
     "en": "p is wrong"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "للقيم المعروضة والمتغيرة استخدم state بدل ref.",
    "en": "For displayed changing values use state instead of a ref."
   }
  }
 ],
 "react-16": [
  {
   "question": {
    "ar": "ما الذي يوفره Provider؟",
    "en": "What does a Provider supply?"
   },
   "options": [
    {
     "ar": "ملفات CSS",
     "en": "CSS files"
    },
    {
     "ar": "مسارات الصفحات",
     "en": "Page routes"
    },
    {
     "ar": "اتصالاً بالإنترنت",
     "en": "An internet connection"
    },
    {
     "ar": "قيمة السياق لكل المكونات تحته",
     "en": "The context value to all components beneath it"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "المكونات داخل Provider تقرأ قيمته عبر useContext.",
    "en": "Components inside the Provider read its value via useContext."
   }
  },
  {
   "question": {
    "ar": "ماذا تعيد useContext(ThemeContext) خارج أي Provider؟",
    "en": "What does useContext(ThemeContext) return outside any Provider?"
   },
   "options": [
    {
     "ar": "null دائماً",
     "en": "Always null"
    },
    {
     "ar": "اسم المكون",
     "en": "The component name"
    },
    {
     "ar": "خطأ دائماً",
     "en": "Always an error"
    },
    {
     "ar": "القيمة الافتراضية الممررة إلى createContext",
     "en": "The default value passed to createContext"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "عند غياب Provider تُستخدم القيمة الافتراضية.",
    "en": "With no Provider the default value is used."
   }
  }
 ],
 "react-17": [
  {
   "question": {
    "ar": "ما ناتج الاستخدام؟ function useCounter(){ const [n,setN]=useState(0); return [n,()=>setN(n+1)]; }",
    "en": "What does this Custom Hook return? function useCounter(){ const [n,setN]=useState(0); return [n,()=>setN(n+1)]; }"
   },
   "options": [
    {
     "ar": "ملف CSS",
     "en": "A CSS file"
    },
    {
     "ar": "عداداً وزيادة له",
     "en": "A counter value and an incrementer"
    },
    {
     "ar": "لا شيء",
     "en": "Nothing"
    },
    {
     "ar": "مكوناً",
     "en": "A component"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الهوك المخصص يغلّف الحالة والمنطق ويعيدهما للمكون.",
    "en": "A custom hook wraps state and logic and hands them to the component."
   }
  },
  {
   "question": {
    "ar": "مكونان يستدعيان useCounter. هل يشتركان في قيمة العداد؟",
    "en": "Two components call useCounter. Do they share the counter value?"
   },
   "options": [
    {
     "ar": "نعم دائماً",
     "en": "Yes, always"
    },
    {
     "ar": "لا، لكل استدعاء state مستقل",
     "en": "No, each call gets its own state"
    },
    {
     "ar": "فقط في نفس الصفحة",
     "en": "Only on the same page"
    },
    {
     "ar": "فقط إذا كانا أخوين",
     "en": "Only if they are siblings"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "يشارك الهوك المنطق لا الحالة نفسها.",
    "en": "A hook shares logic, not the state itself."
   }
  }
 ],
 "react-18": [
  {
   "question": {
    "ar": "ما وظيفة <Link to=\"/about\">؟",
    "en": "What does <Link to=\"/about\"> do?"
   },
   "options": [
    {
     "ar": "يحذف الصفحة",
     "en": "Deletes the page"
    },
    {
     "ar": "يرسل نموذجاً",
     "en": "Submits a form"
    },
    {
     "ar": "يغيّر CSS",
     "en": "Changes CSS"
    },
    {
     "ar": "ينتقل دون إعادة تحميل الصفحة",
     "en": "Navigates without a full page reload"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "Link يغيّر المسار داخل التطبيق دون تحميل كامل.",
    "en": "Link changes the route inside the app without a full reload."
   }
  },
  {
   "question": {
    "ar": "كيف تقرأ الجزء المتغير id من المسار /users/:id؟",
    "en": "How do you read the dynamic id from /users/:id?"
   },
   "options": [
    {
     "ar": "useRef()",
     "en": "useRef()"
    },
    {
     "ar": "useMemo()",
     "en": "useMemo()"
    },
    {
     "ar": "useParams()",
     "en": "useParams()"
    },
    {
     "ar": "useState()",
     "en": "useState()"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "useParams يعيد كائناً بمعاملات المسار.",
    "en": "useParams returns an object of the route parameters."
   }
  }
 ],
 "react-19": [
  {
   "question": {
    "ar": "ما الخطأ؟ fetch(url).then(res => setData(res))",
    "en": "What is the bug? fetch(url).then(res => setData(res))"
   },
   "options": [
    {
     "ar": "setData لا تقبل كائنات",
     "en": "setData rejects objects"
    },
    {
     "ar": "لا خطأ",
     "en": "None"
    },
    {
     "ar": "res هي Response وليست البيانات؛ يجب res.json() أولاً",
     "en": "res is a Response, not data; call res.json() first"
    },
    {
     "ar": "then ممنوعة",
     "en": "then is forbidden"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "نحوّل الاستجابة إلى JSON ثم نخزن البيانات.",
    "en": "Convert the response to JSON, then store the data."
   }
  },
  {
   "question": {
    "ar": "أي طريقة HTTP تُستخدم عادة لإنشاء سجل جديد؟",
    "en": "Which HTTP method is usually used to create a new record?"
   },
   "options": [
    {
     "ar": "GET",
     "en": "GET"
    },
    {
     "ar": "POST",
     "en": "POST"
    },
    {
     "ar": "HEAD",
     "en": "HEAD"
    },
    {
     "ar": "TRACE",
     "en": "TRACE"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "POST يرسل بيانات جديدة إلى الخادم.",
    "en": "POST sends new data to the server."
   }
  }
 ],
 "react-20": [
  {
   "question": {
    "ar": "أي ترتيب لفحوص العرض صحيح؟",
    "en": "Which render check order is sensible?"
   },
   "options": [
    {
     "ar": "return <List/> دائماً",
     "en": "Always return <List/>"
    },
    {
     "ar": "عرض Err قبل بدء الطلب",
     "en": "Show Err before the request begins"
    },
    {
     "ar": "إخفاء كل شيء",
     "en": "Hide everything"
    },
    {
     "ar": "if (loading) return <Spinner/>; if (error) return <Err/>; return <List/>",
     "en": "if (loading) return <Spinner/>; if (error) return <Err/>; return <List/>"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "نعالج التحميل ثم الخطأ ثم النجاح.",
    "en": "Handle loading, then error, then success."
   }
  },
  {
   "question": {
    "ar": "ماذا يحدث إن لم نضف catch أو فحص res.ok؟",
    "en": "What happens if we skip catch and checking res.ok?"
   },
   "options": [
    {
     "ar": "يُصلح الخادم نفسه",
     "en": "The server fixes itself"
    },
    {
     "ar": "لا يتغير شيء أبداً",
     "en": "Nothing ever changes"
    },
    {
     "ar": "قد تبقى الشاشة بحالة تحميل أو تعرض بيانات خاطئة",
     "en": "The screen may stay loading or show wrong data"
    },
    {
     "ar": "يصبح الطلب أسرع",
     "en": "The request gets faster"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "بدون معالجة الأخطاء لا يعرف المستخدم ما حدث.",
    "en": "Without error handling the user never learns what happened."
   }
  }
 ],
 "react-21": [
  {
   "question": {
    "ar": "ما سبب إعادة رسم المكون؟",
    "en": "What causes a component to re-render?"
   },
   "options": [
    {
     "ar": "حفظ الملف فقط",
     "en": "Only saving a file"
    },
    {
     "ar": "تغير state أو props أو إعادة رسم الأب",
     "en": "A change in state or props, or the parent re-rendering"
    },
    {
     "ar": "مرور الوقت فقط",
     "en": "Just time passing"
    },
    {
     "ar": "تغيير لون الشاشة",
     "en": "Changing screen color"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "فهم أسباب الرسم يسبق أي تحسين.",
    "en": "Understanding why renders happen comes before any optimization."
   }
  },
  {
   "question": {
    "ar": "ما الخطوة الأولى لتحسين بطء ملحوظ؟",
    "en": "What is the first step for a noticeable slowdown?"
   },
   "options": [
    {
     "ar": "إضافة memo في كل مكان",
     "en": "Add memo everywhere"
    },
    {
     "ar": "القياس وتحديد الجزء البطيء",
     "en": "Measure and find the slow part"
    },
    {
     "ar": "حذف المكونات",
     "en": "Delete components"
    },
    {
     "ar": "إعادة كتابة المشروع",
     "en": "Rewrite the project"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "نقيس أولاً حتى لا نحسّن ما لا يحتاج.",
    "en": "Measure first so you don't optimize what doesn't need it."
   }
  }
 ],
 "react-22": [
  {
   "question": {
    "ar": "لماذا يعاد رسم ابن مغلّف بـ memo رغم ثبات النص؟ <Child style={{a:1}} />",
    "en": "Why does a memo-wrapped child still re-render? <Child style={{a:1}} />"
   },
   "options": [
    {
     "ar": "memo معطلة",
     "en": "memo is disabled"
    },
    {
     "ar": "style ممنوعة",
     "en": "style is forbidden"
    },
    {
     "ar": "لا يمكن حدوث ذلك",
     "en": "It cannot happen"
    },
    {
     "ar": "الكائن الجديد في كل رسم يغيّر المرجع",
     "en": "A new object each render changes the reference"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "memo تقارن props مقارنة سطحية فالكائن الجديد يُعد تغييراً.",
    "en": "memo compares props shallowly, so a fresh object counts as a change."
   }
  },
  {
   "question": {
    "ar": "كيف تغلّف مكوناً بـ memo؟",
    "en": "How do you wrap a component with memo?"
   },
   "options": [
    {
     "ar": "Card.memo()",
     "en": "Card.memo()"
    },
    {
     "ar": "useMemo(Card)",
     "en": "useMemo(Card)"
    },
    {
     "ar": "const Card = React.memo(function Card(props){ ... })",
     "en": "const Card = React.memo(function Card(props){ ... })"
    },
    {
     "ar": "const Card = memo.Card",
     "en": "const Card = memo.Card"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "React.memo يأخذ المكون ويعيد نسخة محسّنة.",
    "en": "React.memo takes a component and returns a memoized one."
   }
  }
 ],
 "react-23": [
  {
   "question": {
    "ar": "متى يُعاد حساب useMemo(() => heavy(a), [a])؟",
    "en": "When is useMemo(() => heavy(a), [a]) recomputed?"
   },
   "options": [
    {
     "ar": "عند النقر",
     "en": "On click"
    },
    {
     "ar": "عند كل رسم",
     "en": "On every render"
    },
    {
     "ar": "فقط عند تغير a",
     "en": "Only when a changes"
    },
    {
     "ar": "أبداً",
     "en": "Never"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الاعتماديات تحدد إعادة الحساب.",
    "en": "The dependencies determine recomputation."
   }
  },
  {
   "question": {
    "ar": "متى يفيد useCallback؟",
    "en": "When is useCallback useful?"
   },
   "options": [
    {
     "ar": "عند تمرير دالة إلى ابن مغلّف بـ memo",
     "en": "When passing a function to a memo-wrapped child"
    },
    {
     "ar": "عند عرض نص",
     "en": "When showing text"
    },
    {
     "ar": "عند تعريف ثابت",
     "en": "When defining a constant"
    },
    {
     "ar": "دائماً لكل دالة",
     "en": "Always for every function"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "ثبات مرجع الدالة يمنع إعادة رسم الابن بلا داعٍ.",
    "en": "A stable function reference prevents needless child re-renders."
   }
  }
 ],
 "react-24": [
  {
   "question": {
    "ar": "مكونان بعيدان يحتاجان نفس state. ما أبسط حل؟",
    "en": "Two distant components need the same state. What is the simplest solution?"
   },
   "options": [
    {
     "ar": "نسخه في الاثنين",
     "en": "Copy it in both"
    },
    {
     "ar": "استخدام متغير عام عشوائي",
     "en": "Use a random global variable"
    },
    {
     "ar": "حذف أحدهما",
     "en": "Delete one"
    },
    {
     "ar": "رفع state إلى أقرب أب مشترك أو استخدام Context",
     "en": "Lift state to a common parent or use Context"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "نبدأ بالحلول البسيطة قبل مكتبات الحالة.",
    "en": "Start with simple solutions before state libraries."
   }
  },
  {
   "question": {
    "ar": "ما معنى رفع الحالة Lifting State Up؟",
    "en": "What does Lifting State Up mean?"
   },
   "options": [
    {
     "ar": "تخزينها في CSS",
     "en": "Storing it in CSS"
    },
    {
     "ar": "تحويلها لمصفوفة",
     "en": "Turning it into an array"
    },
    {
     "ar": "نقل state إلى أب مشترك وتمريرها عبر props",
     "en": "Moving state to a shared parent and passing it down via props"
    },
    {
     "ar": "حذف state",
     "en": "Deleting state"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "الأب يملك الحالة ويشاركها مع أبنائه.",
    "en": "The parent owns the state and shares it with its children."
   }
  }
 ],
 "react-25": [
  {
   "question": {
    "ar": "أين يُنصح بوضع منطق استدعاء API؟",
    "en": "Where is API-calling logic best placed?"
   },
   "options": [
    {
     "ar": "في ملف الصور",
     "en": "In the images folder"
    },
    {
     "ar": "في ملف خدمة أو هوك مخصص",
     "en": "In a service file or custom hook"
    },
    {
     "ar": "داخل كل زر",
     "en": "Inside every button"
    },
    {
     "ar": "في CSS",
     "en": "In CSS"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "فصل المسؤوليات يقلل الترابط.",
    "en": "Separating responsibilities reduces coupling."
   }
  },
  {
   "question": {
    "ar": "ما معنى تقليل الترابط Coupling؟",
    "en": "What does reducing coupling mean?"
   },
   "options": [
    {
     "ar": "جعل الأجزاء أقل اعتماداً على بعضها",
     "en": "Making parts depend less on each other"
    },
    {
     "ar": "دمج كل الملفات",
     "en": "Merging all files"
    },
    {
     "ar": "نسخ الكود",
     "en": "Copying code"
    },
    {
     "ar": "حذف الاختبارات",
     "en": "Deleting tests"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "الأجزاء المستقلة أسهل في التعديل.",
    "en": "Independent parts are easier to change."
   }
  }
 ],
 "react-26": [
  {
   "question": {
    "ar": "ما فائدة prop باسم variant في Button؟",
    "en": "What is a variant prop on Button for?"
   },
   "options": [
    {
     "ar": "حذف الزر",
     "en": "Deleting the button"
    },
    {
     "ar": "تشفير النص",
     "en": "Encrypting text"
    },
    {
     "ar": "لا فائدة",
     "en": "No use"
    },
    {
     "ar": "تغيير شكل الزر دون إنشاء مكون جديد",
     "en": "Changing the look without a new component"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "props تجعل المكون مرناً.",
    "en": "Props make a component flexible."
   }
  },
  {
   "question": {
    "ar": "ماذا يعرض <Card><h2>Hi</h2></Card> إذا أعاد Card <div>{children}</div>؟",
    "en": "What does <Card><h2>Hi</h2></Card> render if Card returns <div>{children}</div>?"
   },
   "options": [
    {
     "ar": "خطأ",
     "en": "An error"
    },
    {
     "ar": "h2 فقط بلا div",
     "en": "Only the h2"
    },
    {
     "ar": "div يحتوي h2",
     "en": "A div containing the h2"
    },
    {
     "ar": "لا شيء",
     "en": "Nothing"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "children هي المحتوى المحاط بالمكون.",
    "en": "children is the content wrapped by the component."
   }
  }
 ],
 "react-27": [
  {
   "question": {
    "ar": "أين يوضع مكون صفحة كاملة مثل Home؟",
    "en": "Where would a full-page component like Home go?"
   },
   "options": [
    {
     "ar": "خارج المشروع",
     "en": "Outside the project"
    },
    {
     "ar": "مجلد pages",
     "en": "The pages folder"
    },
    {
     "ar": "مجلد assets",
     "en": "The assets folder"
    },
    {
     "ar": "مجلد styles فقط",
     "en": "Only styles"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "الصفحات تُجمع في مجلد خاص بها.",
    "en": "Pages are grouped in their own folder."
   }
  },
  {
   "question": {
    "ar": "ما العيب في مجلد واحد يحوي مئات الملفات؟",
    "en": "What is wrong with one folder holding hundreds of files?"
   },
   "options": [
    {
     "ar": "يصعب إيجاد الملفات",
     "en": "Files become hard to find"
    },
    {
     "ar": "لا يعمل React",
     "en": "React stops working"
    },
    {
     "ar": "يصبح الموقع أسرع",
     "en": "The site gets faster"
    },
    {
     "ar": "لا عيب",
     "en": "Nothing"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "التنظيم الواضح يسهل التنقل والصيانة.",
    "en": "Clear organization eases navigation and maintenance."
   }
  }
 ],
 "react-28": [
  {
   "question": {
    "ar": "أي اسم مكون أوضح؟",
    "en": "Which component name is clearest?"
   },
   "options": [
    {
     "ar": "Thing1",
     "en": "Thing1"
    },
    {
     "ar": "X",
     "en": "X"
    },
    {
     "ar": "data2",
     "en": "data2"
    },
    {
     "ar": "UserProfileCard",
     "en": "UserProfileCard"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "الأسماء الواضحة توثّق الغرض.",
    "en": "Clear names document purpose."
   }
  },
  {
   "question": {
    "ar": "مكون من 800 سطر يفعل كل شيء. ما الحل؟",
    "en": "An 800-line component does everything. What is the fix?"
   },
   "options": [
    {
     "ar": "تركه",
     "en": "Leave it"
    },
    {
     "ar": "حذف التعليقات فقط",
     "en": "Only delete comments"
    },
    {
     "ar": "تقسيمه إلى مكونات وهوكس أصغر",
     "en": "Split it into smaller components and hooks"
    },
    {
     "ar": "إضافة أسطر أكثر",
     "en": "Add more lines"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "مسؤولية واحدة لكل مكون تسهل الفهم.",
    "en": "One responsibility per component is easier to understand."
   }
  }
 ],
 "react-29": [
  {
   "question": {
    "ar": "لماذا نحتاج مصفوفة [] في useEffect عند الجلب؟",
    "en": "Why add [] in useEffect when fetching?"
   },
   "options": [
    {
     "ar": "لتغيير CSS",
     "en": "To change CSS"
    },
    {
     "ar": "لتشغيل الجلب مرة عند تحميل المكون",
     "en": "To fetch once when the component mounts"
    },
    {
     "ar": "لتكرار الجلب بلا نهاية",
     "en": "To fetch forever"
    },
    {
     "ar": "لإلغاء المكون",
     "en": "To cancel the component"
    }
   ],
   "correct": 1,
   "explain": {
    "ar": "بدونها يعمل التأثير بعد كل رسم وقد يسبب حلقة.",
    "en": "Without it the effect runs after every render and can loop."
   }
  },
  {
   "question": {
    "ar": "لماذا قد يتكرر هذا الكود بلا نهاية؟ useEffect(() => { fetch(u).then(r=>r.json()).then(setData); });",
    "en": "Why can this loop forever? useEffect(() => { fetch(u).then(r=>r.json()).then(setData); });"
   },
   "options": [
    {
     "ar": "لا مصفوفة اعتماديات فيعمل بعد كل رسم وsetData تسبب رسماً",
     "en": "No dependency array, so it runs after each render and setData causes another"
    },
    {
     "ar": "fetch ممنوعة",
     "en": "fetch is forbidden"
    },
    {
     "ar": "json خطأ",
     "en": "json is wrong"
    },
    {
     "ar": "لا حلقة",
     "en": "No loop"
    }
   ],
   "correct": 0,
   "explain": {
    "ar": "أضف [] أو الاعتماديات الصحيحة.",
    "en": "Add [] or the proper dependencies."
   }
  }
 ],
 "react-30": [
  {
   "question": {
    "ar": "ما أفضل طريقة لتقسيم العمل في المشروع النهائي؟",
    "en": "How best to plan the final project work?"
   },
   "options": [
    {
     "ar": "كتابة كل شيء مرة واحدة",
     "en": "Write everything at once"
    },
    {
     "ar": "البدء بالتنسيق فقط",
     "en": "Start with styling only"
    },
    {
     "ar": "تجنب الاختبار",
     "en": "Avoid testing"
    },
    {
     "ar": "خطوات صغيرة: مكونات ثم state ثم API ثم الأخطاء",
     "en": "Small steps: components, then state, then API, then errors"
    }
   ],
   "correct": 3,
   "explain": {
    "ar": "البناء التدريجي يسهل اكتشاف الأخطاء.",
    "en": "Incremental building makes bugs easier to find."
   }
  },
  {
   "question": {
    "ar": "أي ميزة تُظهر فهم النماذج في المشروع؟",
    "en": "Which feature shows form understanding in the project?"
   },
   "options": [
    {
     "ar": "نص ثابت",
     "en": "Static text"
    },
    {
     "ar": "رابط خارجي",
     "en": "An external link"
    },
    {
     "ar": "حقول controlled مع تحقق قبل الإرسال",
     "en": "Controlled fields with validation before submit"
    },
    {
     "ar": "صورة فقط",
     "en": "Just an image"
    }
   ],
   "correct": 2,
   "explain": {
    "ar": "النماذج المتحكَّم بها تجمع البيانات وتتحقق منها.",
    "en": "Controlled forms collect and validate data."
   }
  }
 ]
};
