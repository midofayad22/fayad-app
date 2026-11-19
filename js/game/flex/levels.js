/*
  Flex Quest — 24 harbor levels. Every level is a REAL CSS puzzle: the learner edits the CSS of a dock, the crates move for real
  (rendered in a sandboxed iframe) and the level is won when every crate sits where the hidden reference layout puts it
  (size and position, measured with getBoundingClientRect). Any CSS that produces the same layout wins, so `alts` are other valid solutions.
  Levels 1–10 keep the original ids, targets and 3-crate boards so existing progress stays valid.
*/
const b = (ar, en) => ({ ar, en });
const OLD = [[44, 44], [44, 64], [44, 34]];
const dock = (decl) => `.dock {\n  display: flex;\n${decl.map((d) => "  " + d + ";").join("\n")}\n}`;
const oldLevel = (id, sol, ar, en, hints, teach) => ({
  id, chapter: id <= 5 ? 1 : 2, sizes: OLD, items: 3,
  start: dock(Object.keys(sol).map((k) => `${k}: ${{ "flex-direction": "row", "justify-content": "flex-start", "align-items": "flex-start" }[k]}`)),
  solution: dock(Object.entries(sol).map(([k, v]) => `${k}: ${v}`)), alts: [], brief: b(ar, en), hints, teach,
});

export const CHAPTERS = [
  { id: 1, name: b("الرصيف: المحور الرئيسي", "The Quay: main axis"), blurb: b("وزّع الصناديق على طول الرصيف.", "Spread the crates along the quay.") },
  { id: 2, name: b("الاتجاه والمحاذاة", "Direction & alignment"), blurb: b("اقلب الاتجاه وحاذِ الصناديق على المحور الآخر.", "Flip the direction and align on the other axis.") },
  { id: 3, name: b("الأسطر والفراغات والترتيب", "Rows, gaps & order"), blurb: b("لفّ الصناديق، اترك فراغات، وغيّر ترتيبها.", "Wrap the crates, add gaps, change their order.") },
  { id: 4, name: b("حجم العناصر وحيلها", "Item sizing & tricks"), blurb: b("خصائص العناصر نفسها: تمدّد، انكماش، هوامش تلقائية.", "Item properties: grow, shrink, auto margins.") },
];

const H = (a1, e1, a2, e2, a3, e3) => [b(a1, e1), b(a2, e2), b(a3, e3)];
export const LEVELS = [
  oldLevel(1, { "justify-content": "flex-end" }, "السفينة وصلت. ادفع الصناديق إلى نهاية الرصيف.", "The ship is in. Push the crates to the end of the quay.",
    H("justify-content توزّع العناصر على المحور الرئيسي (الأفقي في الوضع العادي).", "justify-content spreads items along the main axis (horizontal by default).", "جرّب القيمة flex-end.", "Try the value flex-end.", "اكتب: justify-content: flex-end;", "Write: justify-content: flex-end;"),
    b("justify-content تتحكم في مكان العناصر على المحور الرئيسي. flex-start بداية، flex-end نهاية.", "justify-content controls where items sit on the main axis. flex-start is the start, flex-end the end.")),
  oldLevel(2, { "justify-content": "center" }, "ضع الصناديق في منتصف الرصيف.", "Put the crates in the middle of the quay.",
    H("نريد المنتصف تمامًا.", "We want the exact middle.", "القيمة center.", "The value is center.", "justify-content: center;", "justify-content: center;"),
    b("center يجمع العناصر في المنتصف ويترك مساحة متساوية على الجانبين.", "center groups the items in the middle with equal space on both sides.")),
  oldLevel(3, { "align-items": "flex-end" }, "الصناديق يجب أن تقف على أرضية الرصيف، لا في سقفه.", "The crates must stand on the floor of the quay, not hang from the ceiling.",
    H("الارتفاع هو المحور المتقاطع (cross axis). الخاصية المسؤولة عنه align-items.", "Height is the cross axis. The property for it is align-items.", "قيمة النهاية: flex-end.", "The end value is flex-end.", "align-items: flex-end;", "align-items: flex-end;"),
    b("align-items تحاذي العناصر على المحور المتقاطع (عموديًا في الوضع العادي).", "align-items aligns items on the cross axis (vertical by default).")),
  oldLevel(4, { "justify-content": "center", "align-items": "center" }, "ضع الصناديق في قلب الرصيف تمامًا: أفقيًا وعموديًا.", "Put the crates in the exact heart of the quay: horizontally and vertically.",
    H("تحتاج خاصيتين، واحدة لكل محور.", "You need two properties, one per axis.", "كلاهما center.", "Both are center.", "justify-content: center; align-items: center;", "justify-content: center; align-items: center;"),
    b("التوسيط المثالي في Flexbox سطران فقط: justify-content و align-items بقيمة center.", "Perfect centering in Flexbox is two lines: justify-content and align-items set to center.")),
  oldLevel(5, { "justify-content": "space-between" }, "وزّع الصناديق: الأول في البداية والأخير في النهاية والباقي بينهما بالتساوي.", "Spread the crates: first at the start, last at the end, the rest evenly between.",
    H("الفراغات تُوزَّع بين العناصر لا حولها.", "Space goes between the items, not around them.", "القيمة space-between.", "The value is space-between.", "justify-content: space-between;", "justify-content: space-between;"),
    b("space-between يلصق أول عنصر بالبداية وآخر عنصر بالنهاية ويقسم الباقي بالتساوي.", "space-between sticks the first item to the start, the last to the end and splits the rest equally.")),
  oldLevel(6, { "justify-content": "space-around", "align-items": "flex-end" }, "فراغ متساوٍ حول كل صندوق، والصناديق على الأرضية.", "Equal space around every crate, resting on the floor.",
    H("space-around يعطي كل عنصر نصف فراغ على كل جانب.", "space-around gives each item half a gap on each side.", "justify-content: space-around ثم align-items.", "justify-content: space-around, then align-items.", "justify-content: space-around; align-items: flex-end;", "justify-content: space-around; align-items: flex-end;"),
    b("space-around: فراغ حول كل عنصر (الأطراف نصف الفراغ الداخلي). تختلف عن space-evenly التي تساوي كل الفراغات.", "space-around: space around each item (edges get half the inner gap). space-evenly makes every gap equal.")),
  oldLevel(7, { "flex-direction": "column", "justify-content": "center" }, "الرافعة تكدّس الصناديق عموديًا: ضعها فوق بعضها في المنتصف.", "The crane stacks crates vertically: put them in a column, centered.",
    H("flex-direction تغيّر اتجاه المحور الرئيسي.", "flex-direction changes the direction of the main axis.", "column يجعل المحور الرئيسي رأسيًا، فيصبح justify-content رأسيًا.", "column makes the main axis vertical, so justify-content becomes vertical.", "flex-direction: column; justify-content: center;", "flex-direction: column; justify-content: center;"),
    b("عند column ينقلب المحوران: justify-content يعمل رأسيًا وalign-items أفقيًا.", "With column the axes swap: justify-content works vertically and align-items horizontally.")),
  oldLevel(8, { "flex-direction": "row-reverse", "justify-content": "flex-start", "align-items": "flex-end" }, "الصناديق تصل بالعكس: اعكس الترتيب وأبقها على الأرضية.", "The crates arrive in reverse: flip their order and keep them on the floor.",
    H("row-reverse يعكس ترتيب الصف، والبداية تصبح اليمين.", "row-reverse flips the row, and the start becomes the right.", "مع row-reverse تعني flex-start الجهة اليمنى.", "With row-reverse, flex-start means the right side.", "flex-direction: row-reverse; align-items: flex-end;", "flex-direction: row-reverse; align-items: flex-end;"),
    b("row-reverse يعكس اتجاه المحور الرئيسي: العنصر الأول يبدأ من النهاية.", "row-reverse reverses the main axis: the first item starts from the end.")),
  oldLevel(9, { "flex-direction": "column", "justify-content": "space-between", "align-items": "flex-end" }, "عمود من الصناديق بين السقف والأرض، ملتصقة بالجدار الأيمن.", "A column of crates between ceiling and floor, hugging the right wall.",
    H("اجمع: column + توزيع رأسي + محاذاة أفقية.", "Combine: column + vertical spacing + horizontal alignment.", "في العمود: justify-content رأسي، align-items أفقي.", "In a column: justify-content is vertical, align-items horizontal.", "flex-direction: column; justify-content: space-between; align-items: flex-end;", "flex-direction: column; justify-content: space-between; align-items: flex-end;"),
    b("فكّر بالمحاور أولًا: حدّد الاتجاه، ثم أيّ خاصية تعمل على أي محور.", "Think axes first: set the direction, then which property works on which axis.")),
  oldLevel(10, { "flex-direction": "column-reverse", "justify-content": "center", "align-items": "center" }, "كدّس الصناديق من الأسفل إلى الأعلى وسط الرصيف.", "Stack the crates bottom-to-top in the middle of the quay.",
    H("column-reverse يبدأ العمود من الأسفل.", "column-reverse starts the column from the bottom.", "الترتيب معكوس والتوسيط بقيمتي center.", "The order is reversed and centering uses two centers.", "flex-direction: column-reverse; justify-content: center; align-items: center;", "flex-direction: column-reverse; justify-content: center; align-items: center;"),
    b("column-reverse يعكس ترتيب العمود: العنصر الأول في الأسفل.", "column-reverse flips the column: the first item is at the bottom.")),
  { id: 11, chapter: 0, sizes: [[50, 50], [50, 50], [50, 50], [50, 50]], items: 4, start: ".dock {\n  display: flex;\n}", solution: ".dock {\n  display: flex;\n  gap: 24px;\n}",
    alts: [".dock {\n  display: flex;\n  column-gap: 24px;\n}", ".dock {\n  display: flex;\n}\n.crate {\n  margin-right: 24px;\n}"],
    brief: b("اترك مسافة 24px بين كل صندوقين حتى لا تحتك ببعضها.", "Leave 24px between neighbouring crates so they do not rub."),
    hints: H("هناك خاصية مخصصة للمسافة بين العناصر.", "There is a property made for the space between items.", "اسمها gap.", "It is called gap.", "gap: 24px;", "gap: 24px;"),
    teach: b("gap يضع مسافة بين العناصر فقط (لا قبل الأول ولا بعد الأخير)، وهو أنظف من الهوامش.", "gap puts space between items only (not before the first or after the last), and is cleaner than margins.") },
  { id: 12, chapter: 0, sizes: Array(6).fill([90, 50]), items: 6, start: ".dock {\n  display: flex;\n}", solution: ".dock {\n  display: flex;\n  flex-wrap: wrap;\n}",
    alts: [".dock {\n  display: flex;\n  flex-flow: row wrap;\n}"],
    brief: b("ستة صناديق عريضة تنضغط في سطر واحد. اسمح لها بالنزول إلى سطر جديد عندما لا يتّسع الرصيف.", "Six wide crates are squashed into one row. Let them drop to a new row when the quay is full."),
    hints: H("افتراضيًا Flexbox يجبر كل شيء على سطر واحد.", "By default Flexbox forces everything into one line.", "الخاصية flex-wrap.", "The property is flex-wrap.", "flex-wrap: wrap;", "flex-wrap: wrap;"),
    teach: b("flex-wrap: wrap يسمح بسطور متعددة. بدونه ينكمش كل شيء داخل سطر واحد (nowrap).", "flex-wrap: wrap allows multiple lines. Without it everything shrinks into one line (nowrap).") },
  { id: 13, chapter: 0, sizes: Array(6).fill([90, 40]), items: 6, start: ".dock {\n  display: flex;\n  flex-wrap: wrap;\n}", solution: ".dock {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: center;\n}",
    alts: [".dock {\n  display: flex;\n  flex-flow: row wrap;\n  align-content: center;\n}"],
    brief: b("الصناديق على سطرين. اجمع السطرين معًا في منتصف ارتفاع الرصيف.", "The crates sit in two rows. Gather both rows in the middle of the quay's height."),
    hints: H("align-items يحاذي داخل السطر، لكننا نريد تحريك السطور نفسها.", "align-items aligns inside a row, but we want to move the rows themselves.", "الخاصية align-content (تعمل مع wrap).", "The property is align-content (works with wrap).", "align-content: center;", "align-content: center;"),
    teach: b("align-content يوزّع السطور المتعددة على المحور المتقاطع. يعمل فقط عند وجود أكثر من سطر.", "align-content distributes multiple rows on the cross axis. It only works when there is more than one row.") },
  { id: 15, chapter: 0, sizes: [[60, 60], [60, 60], [60, 60]], items: 3, start: ".dock {\n  display: flex;\n}\n\n.c3 {\n  \n}", solution: ".dock {\n  display: flex;\n}\n\n.c3 {\n  order: -1;\n}",
    alts: [".dock {\n  display: flex;\n}\n\n.c1, .c2 {\n  order: 1;\n}"],
    brief: b("الصندوق C وصل متأخرًا لكنه عاجل: اجعله أول صندوق دون تغيير ترتيب الـ HTML.", "Crate C arrived late but is urgent: make it first without touching the HTML order."),
    hints: H("order يغيّر الترتيب البصري فقط.", "order changes only the visual order.", "القيمة الافتراضية 0، فاستعمل رقمًا أصغر.", "The default is 0, so use something smaller.", ".c3 { order: -1; }", ".c3 { order: -1; }"),
    teach: b("order يعيد ترتيب العناصر بصريًا (الأصغر أولًا). الـ HTML ولوحة المفاتيح يبقيان بالترتيب الأصلي، فاستعمله بحذر.", "order reorders items visually (smallest first). HTML and keyboard order stay the same, so use it carefully.") },
  { id: 16, chapter: 0, sizes: [[60, 50], [60, 50], [60, 50]], items: 3, start: ".dock {\n  display: flex;\n  align-items: center;\n}\n\n.c2 {\n  \n}", solution: ".dock {\n  display: flex;\n  align-items: center;\n}\n\n.c2 {\n  align-self: flex-end;\n}",
    alts: [".dock {\n  display: flex;\n  align-items: center;\n}\n\n.c2 {\n  margin-top: auto;\n}"],
    brief: b("كل الصناديق في المنتصف إلا B: ينبغي أن ينزل وحده إلى الأرضية.", "All crates are centered except B: it alone must drop to the floor."),
    hints: H("نريد استثناءً لعنصر واحد.", "We want an exception for one item.", "align-self يتجاوز align-items لعنصر واحد.", "align-self overrides align-items for one item.", ".c2 { align-self: flex-end; }", ".c2 { align-self: flex-end; }"),
    teach: b("align-self يحاذي عنصرًا واحدًا بشكل مختلف عن بقية العناصر.", "align-self aligns a single item differently from the others.") },
  { id: 17, chapter: 0, sizes: [[60, 50], [60, 50], [60, 50]], items: 3, start: ".dock {\n  display: flex;\n}\n\n.c2 {\n  \n}", solution: ".dock {\n  display: flex;\n}\n\n.c2 {\n  flex-grow: 1;\n}",
    alts: [".dock {\n  display: flex;\n}\n\n.c2 {\n  flex: 1;\n}"],
    brief: b("الصندوق B يجب أن يملأ كل الفراغ المتبقي بين A وC.", "Crate B must fill all the leftover space between A and C."),
    hints: H("اطلب من العنصر أن يتمدد.", "Ask the item to stretch.", "flex-grow يوزّع المساحة الفارغة.", "flex-grow shares the free space.", ".c2 { flex-grow: 1; }", ".c2 { flex-grow: 1; }"),
    teach: b("flex-grow يوزّع المساحة الفارغة على العناصر. القيمة 1 تعني «خذ حصتك كاملة».", "flex-grow shares the free space between items. 1 means 'take your share'.") },
  { id: 18, chapter: 0, sizes: [[40, 50], [40, 50], [40, 50]], items: 3, start: ".dock {\n  display: flex;\n}\n\n.c1 {\n  \n}\n\n.c2 {\n  \n}", solution: ".dock {\n  display: flex;\n}\n\n.c1 {\n  flex-grow: 1;\n}\n\n.c2 {\n  flex-grow: 2;\n}",
    alts: [".dock {\n  display: flex;\n}\n\n.c1 {\n  flex: 1 1 auto;\n}\n\n.c2 {\n  flex: 2 1 auto;\n}"],
    brief: b("A يأخذ حصة، وB يأخذ ضعف حصة A من الفراغ، وC يبقى بحجمه.", "A takes a share, B takes twice A's share of the free space, C keeps its size."),
    hints: H("القيم نسبية: 1 مقابل 2.", "Values are ratios: 1 versus 2.", "استعمل flex-grow على A وB فقط.", "Use flex-grow on A and B only.", ".c1 { flex-grow: 1; } .c2 { flex-grow: 2; }", ".c1 { flex-grow: 1; } .c2 { flex-grow: 2; }"),
    teach: b("flex-grow نسبي: من يملك 2 يأخذ ضعف من يملك 1 من المساحة المتبقية.", "flex-grow is proportional: an item with 2 gets twice the leftover space of one with 1.") },
  { id: 19, chapter: 0, sizes: [[60, 50], [60, 50], [60, 50]], items: 3, start: ".dock {\n  display: flex;\n}\n\n.c1 {\n  \n}", solution: ".dock {\n  display: flex;\n}\n\n.c1 {\n  flex-basis: 150px;\n}",
    alts: [".dock {\n  display: flex;\n}\n\n.c1 {\n  width: 150px;\n}"],
    brief: b("الصندوق A يحتاج مساحة أكبر: اجعل عرضه الابتدائي 150px.", "Crate A needs more room: make its starting width 150px."),
    hints: H("هناك خاصية للحجم الابتدائي على المحور الرئيسي.", "There is a property for the starting size on the main axis.", "flex-basis.", "flex-basis.", ".c1 { flex-basis: 150px; }", ".c1 { flex-basis: 150px; }"),
    teach: b("flex-basis هو الحجم الابتدائي للعنصر قبل التمدد أو الانكماش، ويتفوق على width في صف Flex.", "flex-basis is the item's starting size before growing or shrinking, and it beats width in a flex row.") },
  { id: 20, chapter: 0, sizes: [[150, 50], [150, 50], [150, 50]], items: 3, start: ".dock {\n  display: flex;\n}\n\n.c1 {\n  \n}", solution: ".dock {\n  display: flex;\n}\n\n.c1 {\n  flex-shrink: 0;\n}",
    alts: [".dock {\n  display: flex;\n}\n\n.c1 {\n  flex: none;\n}"],
    brief: b("الصناديق عريضة جدًا فتنكمش كلها بالتساوي. امنع A وحده من الانكماش.", "The crates are so wide they all shrink equally. Stop A alone from shrinking."),
    hints: H("الانكماش هو الجانب المعاكس للتمدد.", "Shrinking is the opposite of growing.", "flex-shrink.", "flex-shrink.", ".c1 { flex-shrink: 0; }", ".c1 { flex-shrink: 0; }"),
    teach: b("flex-shrink: 0 يمنع العنصر من الانكماش عند ضيق المساحة، فيتحمّل الباقون الانكماش.", "flex-shrink: 0 stops an item from shrinking when space is tight, so the others take the squeeze.") },
  { id: 21, chapter: 0, sizes: [[60, 50], [60, 50], [60, 50]], items: 3, start: ".dock {\n  display: flex;\n}\n\n.c3 {\n  \n}", solution: ".dock {\n  display: flex;\n}\n\n.c3 {\n  margin-left: auto;\n}",
    alts: [".dock {\n  display: flex;\n}\n\n.c2 {\n  margin-right: auto;\n}"],
    brief: b("A وB معًا على اليسار، وC وحده على أقصى اليمين.", "A and B together on the left, C alone at the far right."),
    hints: H("justify-content يحرّك الجميع، ونحن نريد فصل عنصر واحد.", "justify-content moves everyone, but we want to split one item off.", "الهامش auto يأخذ كل المساحة الفارغة.", "An auto margin takes all the free space.", ".c3 { margin-left: auto; }", ".c3 { margin-left: auto; }"),
    teach: b("margin: auto داخل Flexbox يمتص المساحة الفارغة. أسلوب مشهور لدفع عنصر إلى الطرف (مثل زر في شريط التنقل).", "Auto margins inside Flexbox absorb free space. A classic way to push one item to the edge (like a nav button).") },
  { id: 14, chapter: 0, sizes: Array(5).fill([90, 50]), items: 5, start: ".dock {\n  display: flex;\n  flex-wrap: wrap;\n}", solution: ".dock {\n  display: flex;\n  flex-wrap: wrap-reverse;\n}",
    alts: [".dock {\n  display: flex;\n  flex-flow: row wrap-reverse;\n}"],
    brief: b("اجعل أول سطر من الصناديق يبدأ من الأسفل لا من الأعلى.", "Make the first row of crates start from the bottom, not the top."),
    hints: H("قيمة أخرى لـ flex-wrap تعكس اتجاه السطور.", "Another flex-wrap value reverses the rows.", "wrap-reverse.", "wrap-reverse.", "flex-wrap: wrap-reverse;", "flex-wrap: wrap-reverse;"),
    teach: b("wrap-reverse يقلب اتجاه تراكم السطور على المحور المتقاطع (السطر الأول في الأسفل).", "wrap-reverse flips the stacking direction of rows on the cross axis (first row at the bottom).") },
  { id: 22, chapter: 0, sizes: Array(5).fill([60, 60]), items: 5, start: ".dock {\n  display: flex;\n}", solution: ".dock {\n  display: flex;\n  flex-flow: column wrap;\n}",
    alts: [".dock {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n}"],
    brief: b("كدّس الصناديق في أعمدة: عندما يمتلئ العمود ينتقل الباقي إلى عمود جديد.", "Stack the crates in columns: when a column is full, the rest start a new one."),
    hints: H("اتجاه عمودي + السماح باللف.", "A vertical direction + allowing wrap.", "هناك اختصار يجمع الاثنين: flex-flow.", "A shorthand combines both: flex-flow.", "flex-flow: column wrap;", "flex-flow: column wrap;"),
    teach: b("flex-flow اختصار لـ flex-direction وflex-wrap معًا.", "flex-flow is the shorthand for flex-direction and flex-wrap together.") },
  { id: 23, chapter: 0, sizes: [[70, 40], [60, 30], [60, 30], [80, 40]], items: 4, start: ".dock {\n  display: flex;\n}\n\n.c4 {\n  \n}", solution: ".dock {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.c4 {\n  margin-left: auto;\n}",
    alts: [".dock {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.c3 {\n  margin-right: auto;\n}"],
    brief: b("ابنِ شريط تنقل: الشعار A ثم روابط B وC متقاربة، والزر D على أقصى اليمين، والكل في منتصف الارتفاع.", "Build a nav bar: logo A, then links B and C close together, button D at the far right, everything vertically centered."),
    hints: H("ثلاث أدوات: محاذاة، مسافة، هامش auto.", "Three tools: alignment, gap, an auto margin.", "align-items: center + gap: 12px + margin-left: auto على D.", "align-items: center + gap: 12px + margin-left: auto on D.", ".dock { align-items: center; gap: 12px; } .c4 { margin-left: auto; }", ".dock { align-items: center; gap: 12px; } .c4 { margin-left: auto; }"),
    teach: b("تركيب الأدوات: هذا بالضبط ما تفعله أشرطة التنقل في المواقع الحقيقية.", "Combining the tools: this is exactly how nav bars in real websites work.") },
  { id: 24, chapter: 0, sizes: Array(5).fill([70, 50]), items: 5, start: ".dock {\n  display: flex;\n}\n\n.c5 {\n  \n}", solution: ".dock {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-content: center;\n  gap: 12px;\n}\n\n.c5 {\n  order: -1;\n}",
    alts: [".dock {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-content: center;\n  gap: 12px;\n}\n\n.c1, .c2, .c3, .c4 {\n  order: 1;\n}"],
    brief: b("التحدي الأخير: رصيف مزدحم. لفّ الصناديق، وسّطها أفقيًا وعموديًا، اترك 12px بينها، وقدّم E ليكون أولًا.", "Final challenge: a crowded quay. Wrap the crates, center them both ways, leave 12px between them, and bring E to the front."),
    hints: H("خمس خصائص: wrap، justify-content، align-content، gap، order.", "Five properties: wrap, justify-content, align-content, gap, order.", "السطر الأخير يتوسط أيضًا بفضل justify-content.", "The last row is centered too thanks to justify-content.", ".dock { flex-wrap: wrap; justify-content: center; align-content: center; gap: 12px; } .c5 { order: -1; }", ".dock { flex-wrap: wrap; justify-content: center; align-content: center; gap: 12px; } .c5 { order: -1; }"),
    teach: b("أنت الآن تستعمل كل أدوات Flexbox الأساسية معًا.", "You are now using all the core Flexbox tools together.") },
].sort((a, c) => a.id - c.id).map((l) => ({ ...l, chapter: l.id <= 5 ? 1 : l.id <= 10 ? 2 : l.id <= 16 ? 3 : 4 }));

export const BASE_POINTS = (id) => (id <= 10 ? 10 : 12);

/** HTML + trusted base CSS of a level's board (learner CSS is added after it). */
export function boardHtml(level) {
  const L = "ABCDEF";
  return `<div class="dock">${Array.from({ length: level.items }, (_, i) => `<div class="crate c${i + 1}">${L[i]}</div>`).join("")}</div>`;
}
export function baseCss(level) {
  const colors = ["#22d3ee", "#f4c95d", "#f472b6", "#a3e635", "#fb923c", "#c4b5fd"];
  return `*{box-sizing:border-box}html,body{margin:0}body{padding:10px;background:#0b1a2a}
.dock{width:300px;height:180px;border:2px dashed #3d6c92;border-radius:10px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.035) 0 20px,transparent 20px 40px)}
.crate{display:grid;place-items:center;font:800 15px system-ui,sans-serif;color:#0b1a2a;border-radius:6px;box-shadow:inset 0 -5px rgba(0,0,0,.25),inset 0 2px rgba(255,255,255,.35)}
${level.sizes.map(([w, h], i) => `.c${i + 1}{width:${w}px;height:${h}px;background:${colors[i]}}`).join("")}`;
}
