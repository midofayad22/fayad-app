/*
  Zombie Survival — 15 missions that teach real HTML, CSS and JavaScript.
  The scene (zombies, survivors, walls) is authored HTML + CSS; the player edits real CSS / HTML / JavaScript and the checks read real
  computed styles, geometry and DOM state inside the sandboxed preview. Any code that produces the right result passes, so there are
  many valid solutions. When every check passes, the scene plays the consequence (zombies fall back, the gate closes, the trap fires).
*/
const t = (ar, en) => ({ ar, en });
const cs = (s, p) => `getComputedStyle(document.querySelector(${JSON.stringify(s)})).${p}`;
const $ = (s) => `document.querySelector(${JSON.stringify(s)})`;
const $$ = (s) => `[].slice.call(document.querySelectorAll(${JSON.stringify(s)}))`;
const rects = (s) => `${$$(s)}.map(function(e){return e.getBoundingClientRect()})`;

export const SCENE = `<style>
*{box-sizing:border-box}
body{margin:0;padding:10px;min-height:100vh;color:#e4f6e8;font:14px/1.5 system-ui,sans-serif;background:radial-gradient(120% 90% at 50% 0,#1c3a2b,#0a1511 70%)}
.field{position:relative;padding:8px 64px}
.zone{border:2px dashed #4f8a67;border-radius:12px;background:rgba(255,255,255,.05);padding:8px;min-height:90px;max-width:100%}
.zombie{position:absolute;left:4px;top:50%;width:40px;height:54px;margin-top:-27px;transition:left 1.4s ease,transform 1s,opacity 1s;
 background:radial-gradient(circle at 50% 24%,#a6d35f 0 13px,transparent 14px),linear-gradient(#4a5d3a,#33422a) 50% 100%/26px 28px no-repeat}
.zombie:before{content:"";position:absolute;left:11px;top:17px;width:6px;height:6px;border-radius:50%;background:#e5393f;box-shadow:12px 0 #e5393f}
.zombie:after{content:"";position:absolute;left:3px;top:32px;width:34px;height:7px;border-radius:4px;background:#a6d35f;box-shadow:0 0 0 0 #0000}
.survivor{position:absolute;right:8px;top:50%;width:34px;height:54px;margin-top:-27px;border-radius:50% 50% 8px 8px;background:radial-gradient(circle at 50% 24%,#f2c9a0 0 11px,transparent 12px),linear-gradient(#3a7bc0,#274f7e) 50% 100%/26px 30px no-repeat}
.wall,.crate,.bag,.board,.cell{border:2px solid #4a3219;border-radius:6px;background:repeating-linear-gradient(#8a5a2b 0 8px,#a06a35 8px 16px);color:#2c1c0b;font-weight:700;text-align:center}
.wall{width:46px;height:46px}.crate{width:56px;height:40px}.bag{width:70px;height:30px;border-radius:14px;background:#c9ae6c;border-color:#7a6430}
.board{min-width:30px;height:46px}.cell{height:46px;background:#274a39;border-color:#58a07a;color:#cdeedd;padding-top:10px}
.gate,.tower,.yard,.med{border:2px solid #58a07a;border-radius:8px;background:#274a39;padding:10px;text-align:center;font-weight:700}
.gate{background:#6b2630;border-color:#d1485a}.yard{background:#1d3a2c}.med{background:#2a4f6b;border-color:#6fb4e6}
.turret{width:36px;height:36px;border-radius:50% 50% 6px 6px;background:#9aa8b8;border:2px solid #4b5766}
.sign{padding:6px 10px;background:#e9c46a;color:#3b2a00;border-radius:6px;font-weight:700}.ladder{height:30px;border-radius:4px;background:repeating-linear-gradient(90deg,#b98a4a 0 6px,transparent 6px 16px);border:2px solid #7a5a2b}
.card{display:inline-block;margin:4px;padding:8px 12px;border-radius:10px;background:#274a39;border:2px solid #58a07a}.card.wounded{background:#6b2630;border-color:#ff7b8a}.card.safe{background:#1d5a3f;border-color:#46e08a;box-shadow:0 0 10px #46e08a66}
.walker{display:inline-block;margin:4px;padding:6px 10px;border-radius:8px;background:#4a5d3a;cursor:pointer;user-select:none}
#trap{margin:8px 0;padding:12px;border-radius:10px;background:#3b3b3b;border:2px solid #777;text-align:center;font-weight:800;transition:all .3s}#trap.active{background:#e5393f;border-color:#ffb02e;box-shadow:0 0 18px #e5393f;transform:scale(1.04)}
#panel{padding:10px;border-radius:12px;background:rgba(255,255,255,.05)}
button{font:inherit;font-weight:700;padding:8px 14px;border-radius:8px;border:2px solid #58a07a;background:#1f3f2f;color:#e4f6e8;cursor:pointer}
input,textarea,select{font:inherit;padding:6px 8px;border-radius:6px;border:1px solid #58a07a;background:#0f1d17;color:#e4f6e8}
form{display:grid;gap:8px;max-width:360px}label{font-weight:700}header,nav,main,footer{display:block;padding:6px 0}
.fy-win .zombie{transform:rotate(80deg) translate(0,20px);opacity:.25}
.fy-lose .zombie{left:calc(100% - 118px)}
@media (prefers-reduced-motion:reduce){.zombie{transition:none}}
</style>`;
const FIELD = (zone, zoneAttrs = 'class="zone" id="zone"') => `<div class="field"><div class="zombie"></div><div ${zoneAttrs}>${zone}</div><div class="survivor"></div></div>`;
const walls = (n, cls = "wall") => Array.from({ length: n }, () => `<div class="${cls}"></div>`).join("");

export const MISSIONS = [
  { id: "zb-1", level: "beginner", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("الممر الأول", "The First Corridor"), goal: t("display: flex و justify-content", "display: flex and justify-content"),
    brief: t("زومبي قادم من اليسار. رتّب الجدران الثلاثة في صف واحد وفي منتصف المنطقة الدفاعية.", "A zombie comes from the left. Line the three walls up in one row, in the middle of the defence zone."),
    teach: { what: t("Flexbox طريقة في CSS لترتيب العناصر داخل حاوية. الحاوية تسمى Flex Container وأبناؤها Flex Items.", "Flexbox is a CSS layout method. The parent is the flex container and its children are flex items."),
      does: t("عند كتابة display: flex تصطف الأبناء في صف، وتتحكم justify-content في توزيعها على المحور الأفقي.", "With display: flex the children line up in a row, and justify-content spreads them along the horizontal (main) axis."),
      why: t("بدونها تتكدس الجدران فوق بعضها كأنها فقرات، ولا يمكنك حماية الناجي.", "Without it the walls stack like paragraphs and the survivor is not protected."),
      how: t("اكتب داخل القاعدة .zone الخاصية display ثم justify-content بقيمة مناسبة للتوسيط.", "Inside the .zone rule write display, then justify-content with a value that centres the items."),
      expect: t("ثلاثة جدران في صف واحد بينها وبين طرفي المنطقة مسافة متساوية.", "Three walls in one row with equal space on both sides."),
      mistake: t("كتابة justify-content وحدها لا تفعل شيئًا إذا نسيت display: flex على الحاوية نفسها.", "justify-content does nothing if you forget display: flex on the container itself.") },
    files: { html: FIELD(walls(3)), css: ".zone {\n  /* اكتب هنا — write here */\n}" },
    checks: [
      { ar: "الحاوية .zone هي Flex Container", en: ".zone is a flex container", test: `return ${cs(".zone", "display")}==='flex'` },
      { ar: "الجدران الثلاثة في صف واحد", en: "The three walls sit in one row", test: `var r=${rects(".wall")};return r.length===3&&r.every(function(x){return Math.abs(x.top-r[0].top)<1})` },
      { ar: "الصف في منتصف المنطقة أفقيًا", en: "The row is horizontally centred", test: `var r=${rects(".wall")},z=${$(".zone")}.getBoundingClientRect();var c=(r[0].left+r[2].right)/2;return r[2].right-r[0].left>100&&Math.abs(c-(z.left+z.width/2))<3` }],
    hints: [{ ar: "الفكرة: اجعل .zone حاوية Flexbox ثم وسّط محتواها أفقيًا.", en: "Idea: make .zone a flex container, then centre its content horizontally." }, { ar: "الخاصيتان: display وjustify-content.", en: "The two properties: display and justify-content." }, { ar: "مثال: .box { display: flex; justify-content: flex-end; } يدفع العناصر لليمين.", en: "Example: .box { display: flex; justify-content: flex-end; } pushes items to the right." }],
    explain: t("display: flex حوّل .zone إلى حاوية فاصطف الأبناء في صف، وjustify-content: center وزّعهم على المحور الرئيسي حول المنتصف.", "display: flex turned .zone into a container so its children formed a row, and justify-content: center placed them around the middle of the main axis."),
    solution: { css: ".zone {\n  display: flex;\n  justify-content: center;\n}" }, alts: [{ css: ".zone {\n  display: flex;\n  justify-content: space-evenly;\n}" }] },

  { id: "zb-2", level: "beginner", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("جدار على الأرض", "A Wall on the Ground"), goal: t("align-items و space-between", "align-items and space-between"),
    brief: t("وزّع الجدران الثلاثة: الأول في أقصى اليسار والأخير في أقصى اليمين والأوسط بينهما، وكلها مستندة إلى أرض المنطقة.", "Spread the walls: first at the far left, last at the far right, one in between, all standing on the bottom of the zone."),
    teach: { what: t("المحور الرئيسي أفقي في الصف، والمحور المتقاطع (cross axis) رأسي.", "In a row the main axis is horizontal and the cross axis is vertical."),
      does: t("justify-content يوزّع على المحور الرئيسي، وalign-items يحاذي على المتقاطع. القيمة space-between تترك المسافات بين العناصر فقط.", "justify-content distributes along the main axis, align-items aligns on the cross axis. space-between puts all free space between the items."),
      why: t("الجدار المرتفع في الهواء لا يحمي أحدًا؛ نحتاج محاذاة رأسية صحيحة.", "A wall floating in mid-air protects nobody; we need correct vertical alignment."),
      how: t("استخدم justify-content: space-between مع align-items: flex-end.", "Use justify-content: space-between together with align-items: flex-end."),
      expect: t("جدار عند كل طرف وجدار في الوسط، وقواعدها على خط واحد.", "A wall at each end and one in the middle, bases on one line."),
      mistake: t("نسيان min-height في الحاوية لا يضر هنا، لكن align-items لا تُرى فروقها إذا كانت الحاوية بنفس ارتفاع العناصر.", "align-items shows no difference if the container is exactly as tall as its items; here the zone already has spare height.") },
    files: { html: FIELD(walls(3), 'class="zone" id="zone" style="min-height:150px"'), css: ".zone {\n  display: flex;\n  /* أكمل — continue */\n}" },
    checks: [
      { ar: "الجدار الأول عند الطرف الأيسر", en: "First wall at the left edge", test: `var r=${rects(".wall")},z=${$(".zone")}.getBoundingClientRect();return r[0].left-z.left<12` },
      { ar: "الجدار الأخير عند الطرف الأيمن والأوسط بينهما بالتساوي", en: "Last wall at the right edge, the middle one evenly between", test: `var r=${rects(".wall")},z=${$(".zone")}.getBoundingClientRect();return z.right-r[2].right<12&&Math.abs((r[1].left-r[0].right)-(r[2].left-r[1].right))<2&&r[1].left-r[0].right>20` },
      { ar: "قواعد الجدران ملاصقة لأرض المنطقة", en: "Walls stand on the zone's floor", test: `var r=${rects(".wall")},z=${$(".zone")}.getBoundingClientRect();return r.every(function(x){return z.bottom-x.bottom<12})` }],
    hints: [{ ar: "الفكرة: توزيع أفقي بين الأطراف + محاذاة رأسية للأسفل.", en: "Idea: horizontal spread between the ends + vertical alignment to the bottom." }, { ar: "justify-content: space-between وalign-items: flex-end.", en: "justify-content: space-between and align-items: flex-end." }, { ar: "مثال: align-items: center يضع العناصر في منتصف الارتفاع.", en: "Example: align-items: center puts the items in the vertical middle." }],
    explain: t("space-between وزّع الفراغ بين الجدران فقط، وflex-end على المحور المتقاطع أنزلها إلى قاع الحاوية.", "space-between put all the free space between the walls, and flex-end on the cross axis dropped them to the container's bottom."),
    solution: { css: ".zone {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}" }, alts: [] },

  { id: "zb-3", level: "beginner", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("طابور أكياس الرمل", "Sandbag Line"), goal: t("flex-direction و gap", "flex-direction and gap"),
    brief: t("ضع أربعة أكياس رمل فوق بعضها في عمود واحد، بينها مسافة 12px بالضبط.", "Stack four sandbags in one column with exactly 12px between each."),
    teach: { what: t("flex-direction يغيّر اتجاه المحور الرئيسي: row أفقي وcolumn رأسي.", "flex-direction changes the main axis: row is horizontal, column is vertical."),
      does: t("مع column تصطف العناصر من الأعلى للأسفل، وgap يضيف مسافة ثابتة بينها دون هوامش.", "With column items go top to bottom, and gap adds a fixed space between them without margins."),
      why: t("الممرات الضيقة تحتاج صفوفًا رأسية، والمسافة المنتظمة تمنع الثغرات.", "Narrow corridors need vertical lines, and even spacing avoids gaps."),
      how: t("display: flex; flex-direction: column; gap: 12px;", "display: flex; flex-direction: column; gap: 12px;"),
      expect: t("أربعة أكياس في عمود، المسافة بين كل كيسين 12px.", "Four bags in a column, 12px between each pair."),
      mistake: t("وضع gap على العناصر الأبناء لا يعمل؛ يجب أن يكون على الحاوية.", "gap on the children does nothing; it belongs on the container.") },
    files: { html: FIELD(walls(4, "bag")), css: ".zone {\n  \n}" },
    checks: [
      { ar: "الحاوية Flexbox", en: "The zone is a flex container", test: `return ${cs(".zone", "display")}==='flex'` },
      { ar: "الأكياس في عمود (نفس الموضع الأفقي)", en: "Bags form a column (same left edge)", test: `var r=${rects(".bag")};return r.length===4&&r.every(function(x,i){return Math.abs(x.left-r[0].left)<1&&(i===0||x.top>r[i-1].top)})` },
      { ar: "المسافة بين كل كيسين 12px", en: "12px between each pair of bags", test: `var r=${rects(".bag")};return r.every(function(x,i){return i===0||Math.abs(x.top-r[i-1].bottom-12)<1})` }],
    hints: [{ ar: "الفكرة: غيّر اتجاه المحور الرئيسي إلى الرأسي ثم أضف مسافة.", en: "Idea: switch the main axis to vertical, then add spacing." }, { ar: "flex-direction وgap.", en: "flex-direction and gap." }, { ar: "مثال: .row { display:flex; gap: 8px; } يضع 8px بين العناصر.", en: "Example: .row { display:flex; gap: 8px; } puts 8px between items." }],
    explain: t("column جعل المحور الرئيسي رأسيًا فاصطفت الأكياس بالطول، وgap أعطى مسافة موحدة بينها.", "column made the main axis vertical so the bags line up top to bottom, and gap gave them one uniform space."),
    solution: { css: ".zone {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}" }, alts: [{ css: ".zone {\n  display: flex;\n  flex-flow: column;\n  row-gap: 12px;\n}" }] },

  { id: "zb-4", level: "intermediate", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("صناديق بلا مكان", "Crates with No Room"), goal: t("flex-wrap", "flex-wrap"),
    brief: t("المنطقة ضيقة (260px) وفيها 8 صناديق عرض كل منها 56px. يجب أن تنتقل الزائدة إلى صف جديد دون أن ينضغط أي صندوق أو يخرج من المنطقة.", "The zone is narrow (260px) and holds 8 crates 56px wide. The extra ones must move to a new row without any crate shrinking or leaving the zone."),
    teach: { what: t("افتراضيًا يحاول Flexbox إبقاء كل العناصر في سطر واحد فيضغطها (flex-shrink).", "By default Flexbox keeps everything on one line and squeezes items (flex-shrink)."),
      does: t("flex-wrap: wrap يسمح بسطور متعددة فتنتقل العناصر الزائدة للسطر التالي بدل أن تنكمش.", "flex-wrap: wrap allows several lines, so extra items move to the next line instead of shrinking."),
      why: t("ساحات الدفاع تتغير مقاساتها، ولا بد أن تتكيف الصناديق دون أن تتشوه.", "Defence areas change size and crates must adapt without being distorted."),
      how: t("أضف display: flex و flex-wrap: wrap، ويمكنك إضافة gap.", "Add display: flex and flex-wrap: wrap; you may add a gap."),
      expect: t("ثلاثة أو أربعة صناديق في كل صف، كلها بعرضها الأصلي.", "Three or four crates per row, all at their original width."),
      mistake: t("استخدام overflow: hidden يخفي الزائد فقط ولا يحل المشكلة.", "overflow: hidden merely hides the extra crates; it does not solve the layout.") },
    files: { html: FIELD(walls(8, "crate"), 'class="zone" id="zone" style="width:260px;margin:0 auto"'), css: ".zone {\n  display: flex;\n}" },
    checks: [
      { ar: "الحاوية Flexbox", en: "The zone is a flex container", test: `return ${cs(".zone", "display")}==='flex'` },
      { ar: "الصناديق تحتفظ بعرضها 56px", en: "Crates keep their 56px width", test: `return ${rects(".crate")}.every(function(x){return Math.abs(x.width-56)<0.6})` },
      { ar: "الصناديق على أكثر من صف ولا تخرج من المنطقة", en: "Crates use several rows and stay inside the zone", test: `var r=${rects(".crate")},z=${$(".zone")}.getBoundingClientRect(),tops={};r.forEach(function(x){tops[Math.round(x.top)]=1});return Object.keys(tops).length>=2&&r.every(function(x){return x.right<=z.right+0.5&&x.left>=z.left-0.5})` }],
    hints: [{ ar: "الفكرة: اسمح للعناصر بالانتقال إلى سطر جديد.", en: "Idea: let items move to a new line." }, { ar: "الخاصية flex-wrap.", en: "The flex-wrap property." }, { ar: "مثال: .box { display:flex; flex-wrap: wrap; }", en: "Example: .box { display:flex; flex-wrap: wrap; }" }],
    explain: t("مع wrap تُحسب الأسطر بناءً على عرض الحاوية، فينتقل الصندوق الذي لا يتسع إلى السطر التالي وتبقى كل الصناديق بحجمها.", "With wrap, lines are computed from the container width, so a crate that does not fit starts the next line and all crates keep their size."),
    solution: { css: ".zone {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}" }, alts: [{ css: ".zone {\n  display: flex;\n  flex-flow: row wrap;\n}" }] },

  { id: "zb-5", level: "intermediate", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("سدّ بنسب", "A Proportional Barrier"), goal: t("flex-grow / flex", "flex-grow / flex"),
    brief: t("ثلاثة ألواح يجب أن تملأ عرض الممر كله: اللوح الأوسط (class big) ضعف عرض كل لوح جانبي.", "Three boards must fill the whole corridor: the middle board (class big) is twice as wide as each side board."),
    teach: { what: t("flex-grow يحدد كم يأخذ العنصر من المساحة الفارغة مقارنة بإخوته.", "flex-grow decides how much of the free space an item takes compared to its siblings."),
      does: t("القيمة 1 لكل العناصر توزع المساحة بالتساوي، و2 تعطي العنصر ضعف الحصة.", "1 for everyone shares space equally; 2 gives that item twice the share."),
      why: t("الألواح المرنة تتكيف مع أي عرض بدل أن نحسب البكسلات يدويًا.", "Flexible boards adapt to any width instead of hard-coded pixels."),
      how: t("استخدم الاختصار flex: 1 للجانبيين و flex: 2 للأوسط.", "Use the shorthand flex: 1 for the sides and flex: 2 for the middle."),
      expect: t("ثلاثة ألواح بلا فراغ، الأوسط ضعف الجانبي تقريبًا.", "Three boards with no gap, the middle about twice a side."),
      mistake: t("تحديد width ثابت للألواح يعطّل النمو.", "A fixed width on the boards defeats growing.") },
    files: { html: FIELD('<div class="board"></div><div class="board big"></div><div class="board"></div>'), css: ".zone {\n  display: flex;\n}\n" },
    checks: [
      { ar: "الألواح تملأ عرض المنطقة", en: "Boards fill the zone width", test: `var r=${rects(".board")},z=${$(".zone")}.getBoundingClientRect();return Math.abs((r[2].right-r[0].left)-(z.width-20))<3` },
      { ar: "الأوسط ضعف الجانبي تقريبًا", en: "The middle one is about twice a side", test: `var r=${rects(".board")};var k=r[1].width/r[0].width;return k>1.8&&k<2.15&&Math.abs(r[0].width-r[2].width)<1.5` },
      { ar: "لا فراغات بين الألواح", en: "No gaps between boards", test: `var r=${rects(".board")};return Math.abs(r[1].left-r[0].right)<1&&Math.abs(r[2].left-r[1].right)<1` }],
    hints: [{ ar: "الفكرة: وزّع المساحة الفارغة بنسب 1:2:1.", en: "Idea: share the free space in the ratio 1:2:1." }, { ar: "flex-grow أو الاختصار flex.", en: "flex-grow, or the flex shorthand." }, { ar: "مثال: .a { flex: 1 } .b { flex: 3 } يعطي b ثلاثة أضعاف a.", en: "Example: .a { flex: 1 } .b { flex: 3 } gives b three times a." }],
    explain: t("المساحة الفارغة قُسّمت إلى 4 أجزاء: جزء لكل جانبي وجزآن للأوسط، لذلك تبقى النسبة محفوظة عند أي عرض.", "The free space was split into 4 parts: one for each side board and two for the middle, so the ratio holds at any width."),
    solution: { css: ".zone {\n  display: flex;\n}\n.board {\n  flex: 1;\n}\n.big {\n  flex: 2;\n}" }, alts: [{ css: ".zone { display: flex; }\n.board { flex-grow: 1; }\n.board.big { flex-grow: 2; }" }] },

  { id: "zb-6", level: "intermediate", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("مناطق آمنة", "Safe Zones"), goal: t("CSS Grid: columns و gap", "CSS Grid: columns and gap"),
    brief: t("ستة مناطق آمنة يجب أن تصطف في شبكة من 3 أعمدة متساوية العرض وصفين، والمسافة بينها 10px.", "Six safe zones must form a grid of 3 equal columns and 2 rows with 10px between cells."),
    teach: { what: t("Grid نظام تخطيط ثنائي الأبعاد: صفوف وأعمدة معًا، بعكس Flexbox ذي البعد الواحد.", "Grid is a two-dimensional layout system: rows and columns together, unlike one-dimensional Flexbox."),
      does: t("grid-template-columns يحدد الأعمدة، والوحدة fr تعني جزءًا من المساحة المتاحة.", "grid-template-columns defines the columns and the fr unit means a fraction of the available space."),
      why: t("المناطق المتكررة المرتبة أسهل بكثير بالشبكة.", "Repeated, ordered areas are far easier with a grid."),
      how: t("display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;", "display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;"),
      expect: t("صفان بثلاث خلايا متساوية.", "Two rows of three equal cells."),
      mistake: t("كتابة flex بدل grid، أو نسيان تعريف الأعمدة فتبقى الخلايا في عمود واحد.", "Using flex instead of grid, or forgetting the columns so everything stays in one column.") },
    files: { html: FIELD(walls(6, "cell")), css: ".zone {\n  \n}" },
    checks: [
      { ar: "الحاوية Grid", en: "The zone is a grid", test: `return ${cs(".zone", "display")}==='grid'` },
      { ar: "ثلاثة أعمدة متساوية وصفان", en: "Three equal columns and two rows", test: `var r=${rects(".cell")},L={},T={};r.forEach(function(x){L[Math.round(x.left)]=1;T[Math.round(x.top)]=1});return Object.keys(L).length===3&&Object.keys(T).length===2&&r.every(function(x){return Math.abs(x.width-r[0].width)<1.5})` },
      { ar: "المسافة بين الخلايا 10px", en: "10px between cells", test: `var r=${rects(".cell")};return Math.abs(r[1].left-r[0].right-10)<1&&Math.abs(r[3].top-r[0].bottom-10)<1` }],
    hints: [{ ar: "الفكرة: اجعلها شبكة بثلاثة أعمدة.", en: "Idea: make it a grid with three columns." }, { ar: "grid-template-columns وgap.", en: "grid-template-columns and gap." }, { ar: "مثال: grid-template-columns: 1fr 2fr; عمودان الثاني ضعف الأول.", en: "Example: grid-template-columns: 1fr 2fr; two columns, the second twice the first." }],
    explain: t("repeat(3, 1fr) أنشأ ثلاثة أعمدة متساوية، فنزلت الخلايا الزائدة تلقائيًا إلى صف جديد، وgap أضاف المسافة.", "repeat(3, 1fr) created three equal columns, so the extra cells flowed into a new row automatically, and gap added the spacing."),
    solution: { css: ".zone {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}" }, alts: [{ css: ".zone {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  column-gap: 10px;\n  row-gap: 10px;\n}" }] },

  { id: "zb-7", level: "intermediate", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("مخطط الملجأ", "Shelter Plan"), goal: t("CSS Grid: span و areas", "CSS Grid: span and areas"),
    brief: t("خطة الملجأ: البوابة (gate) تمتد عبر الأعلى بالكامل. تحتها ثلاثة أقسام في صف: البرج (tower) ثم الساحة (yard) الأوسع (ضعف عرض كل جانب) ثم الإسعاف (med).", "Shelter plan: the gate spans the whole top. Below it, three sections in a row: the tower, the yard (twice as wide as each side) and the med bay."),
    teach: { what: t("في Grid يمكن للعنصر أن يمتد على أكثر من عمود باستخدام grid-column، أو أن نصف المخطط بأسماء مع grid-template-areas.", "In Grid an item can span several columns with grid-column, or you can describe the plan with names using grid-template-areas."),
      does: t("grid-column: 1 / -1 تعني من أول خط إلى آخر خط، أي كل العرض.", "grid-column: 1 / -1 means from the first line to the last line: the full width."),
      why: t("المباني الحقيقية ليست خلايا متساوية؛ نحتاج عناصر تمتد وأعمدة بنسب مختلفة.", "Real layouts are not equal cells; we need spanning items and columns of different ratios."),
      how: t("عرّف الأعمدة 1fr 2fr 1fr ثم اجعل .gate تمتد على كل الأعمدة.", "Define columns 1fr 2fr 1fr then make .gate span them all."),
      expect: t("صف علوي واحد عريض وتحته ثلاثة أقسام بالترتيب.", "One wide top row and three sections beneath it, in order."),
      mistake: t("نسيان أن بقية العناصر تُوضع تلقائيًا بالترتيب في الخلايا الفارغة.", "Forgetting that the remaining items are auto-placed, in order, in the free cells.") },
    files: { html: FIELD('<div class="gate">gate</div><div class="tower">tower</div><div class="yard">yard</div><div class="med">med</div>'), css: ".zone {\n  \n}" },
    checks: [
      { ar: "الحاوية Grid", en: "The zone is a grid", test: `return ${cs(".zone", "display")}==='grid'` },
      { ar: "البوابة تمتد على عرض المنطقة", en: "The gate spans the zone width", test: `var g=${$(".gate")}.getBoundingClientRect(),z=${$(".zone")}.getBoundingClientRect();return g.width>z.width-24` },
      { ar: "الأقسام الثلاثة في صف تحت البوابة بالترتيب", en: "Three sections in one row under the gate, in order", test: `var g=${$(".gate")}.getBoundingClientRect(),a=${$(".tower")}.getBoundingClientRect(),b=${$(".yard")}.getBoundingClientRect(),c=${$(".med")}.getBoundingClientRect();return a.top>=g.bottom&&Math.abs(a.top-b.top)<1&&Math.abs(b.top-c.top)<1&&a.left<b.left&&b.left<c.left` },
      { ar: "الساحة أعرض من كل جانب (ضعفه تقريبًا)", en: "The yard is about twice as wide as each side", test: `var a=${$(".tower")}.getBoundingClientRect(),b=${$(".yard")}.getBoundingClientRect(),c=${$(".med")}.getBoundingClientRect();return b.width/a.width>1.7&&b.width/a.width<2.3&&Math.abs(a.width-c.width)<2` }],
    hints: [{ ar: "الفكرة: ثلاثة أعمدة بنسبة 1:2:1 وعنصر يمتد على الكل.", en: "Idea: three columns in a 1:2:1 ratio and one item spanning all." }, { ar: "grid-template-columns وgrid-column.", en: "grid-template-columns and grid-column." }, { ar: "مثال: .hero { grid-column: 1 / 3; } يمتد على عمودين.", en: "Example: .hero { grid-column: 1 / 3; } spans two columns." }],
    explain: t("الأعمدة 1fr 2fr 1fr أعطت الساحة ضعف الحصة، وgrid-column: 1 / -1 مدّد البوابة على كل الأعمدة، فنزلت البقية تلقائيًا في الصف التالي.", "Columns 1fr 2fr 1fr gave the yard a double share and grid-column: 1 / -1 stretched the gate across them, so the rest auto-placed in the next row."),
    solution: { css: ".zone {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 8px;\n}\n.gate {\n  grid-column: 1 / -1;\n}" }, alts: [{ css: ".zone {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  grid-template-areas: 'gate gate gate' 'tower yard med';\n  gap: 8px;\n}\n.gate { grid-area: gate; }\n.tower { grid-area: tower; }\n.yard { grid-area: yard; }\n.med { grid-area: med; }" }] },

  { id: "zb-8", level: "advanced", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("مدفع على السطح", "Turret on the Roof"), goal: t("position: relative / absolute", "position: relative / absolute"),
    brief: t("ثبّت المدفع (turret) في الزاوية العلوية اليمنى من البرج، على بعد 10px من الحافة العلوية و10px من اليمنى.", "Pin the turret to the top-right corner of the tower, 10px from the top edge and 10px from the right edge."),
    teach: { what: t("position: absolute يُخرج العنصر من التدفق العادي ويضعه بإحداثيات نسبة إلى أقرب جدّ مُموضَع.", "position: absolute takes an element out of normal flow and places it by coordinates relative to its nearest positioned ancestor."),
      does: t("top وright وbottom وleft تحدد المسافة من حواف الجد، بشرط أن يكون الجد position: relative.", "top, right, bottom and left set the distance from the ancestor's edges, provided it is position: relative."),
      why: t("بعض العناصر (مدفع، ملصق، زر إغلاق) يجب أن تُثبَّت في مكان محدد مهما كان محتوى الحاوية.", "Some items (a turret, a badge, a close button) must stay at a fixed spot whatever the container holds."),
      how: t(".tower { position: relative } و .turret { position: absolute; top: 10px; right: 10px }", ".tower { position: relative } and .turret { position: absolute; top: 10px; right: 10px }"),
      expect: t("المدفع في الزاوية بينما النص يبقى في مكانه.", "The turret sits in the corner while the text stays where it was."),
      mistake: t("نسيان position: relative على الأب، فيتموضع المدفع بالنسبة إلى الصفحة كلها.", "Forgetting position: relative on the parent, so the turret is placed relative to the whole page.") },
    files: { html: FIELD('<div class="turret"></div><p>Tower roof</p>', 'class="zone tower" id="zone" style="min-height:140px"'), css: ".tower {\n  \n}\n.turret {\n  \n}" },
    checks: [
      { ar: "البرج مُموضَع (ليس static)", en: "The tower is positioned (not static)", test: `return ${cs(".tower", "position")}!=='static'` },
      { ar: "المدفع position: absolute", en: "The turret is position: absolute", test: `return ${cs(".turret", "position")}==='absolute'` },
      { ar: "10px من الأعلى و10px من اليمين داخل البرج", en: "10px from the top and 10px from the right inside the tower", test: `var t=${$(".turret")}.getBoundingClientRect(),z=${$(".tower")}.getBoundingClientRect();return Math.abs(t.top-(z.top+2)-10)<1.5&&Math.abs((z.right-2)-t.right-10)<1.5` }],
    hints: [{ ar: "الفكرة: الأب يحتاج مرجعًا، والابن يحتاج إحداثيات.", en: "Idea: the parent needs to be a reference, the child needs coordinates." }, { ar: "position على الاثنين مع top وright.", en: "position on both, with top and right." }, { ar: "مثال: .card { position: relative } .badge { position: absolute; bottom: 0; left: 0 }", en: "Example: .card { position: relative } .badge { position: absolute; bottom: 0; left: 0 }" }],
    explain: t("relative على البرج جعله مرجع الإحداثيات، وabsolute أخرج المدفع من التدفق فثبّتته top وright في الزاوية.", "relative made the tower the coordinate reference; absolute removed the turret from the flow so top and right pinned it to the corner."),
    solution: { css: ".tower {\n  position: relative;\n}\n.turret {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}" }, alts: [] },

  { id: "zb-9", level: "advanced", tech: "css", runtime: "html", edit: ["css"], head: SCENE,
    title: t("السلم المخفي", "The Hidden Ladder"), goal: t("display و visibility", "display and visibility"),
    brief: t("اكشف السلم (class ladder) المخفي، وأخفِ اللافتة المخادعة (class sign) بصريًا لكن دون أن يتغير مكان بقية العناصر.", "Reveal the hidden ladder (class ladder) and hide the decoy sign (class sign) visually without moving anything else."),
    teach: { what: t("display: none يحذف العنصر من التخطيط تمامًا، أما visibility: hidden فيخفيه ويحتفظ بمساحته.", "display: none removes the element from layout entirely; visibility: hidden hides it but keeps its space."),
      does: t("نستخدم الأول لإظهار/إلغاء عناصر، والثاني عندما لا نريد أن يقفز التخطيط.", "Use the first to add/remove items; the second when the layout must not jump."),
      why: t("إخفاء اللافتة بـ display: none سيجعل السلم والجدار يقفزان مكانهما.", "Hiding the sign with display: none would make the ladder and wall jump."),
      how: t(".ladder { display: block } .sign { visibility: hidden }", ".ladder { display: block } .sign { visibility: hidden }"),
      expect: t("يظهر السلم، وتختفي اللافتة وتبقى مساحتها فارغة.", "The ladder appears; the sign disappears but its space stays empty."),
      mistake: t("استعمال opacity: 0 يُخفي بصريًا لكن العنصر ما زال يستقبل النقرات.", "opacity: 0 hides visually but the element still receives clicks.") },
    files: { html: FIELD('<div class="sign">DANGER: GO BACK</div><div class="ladder" style=""></div><div class="wall"></div>'), css: ".ladder {\n  display: none;\n}\n" },
    checks: [
      { ar: "السلم ظاهر ويشغل مساحة", en: "The ladder is visible and takes space", test: `return ${$(".ladder")}.offsetHeight>0` },
      { ar: "اللافتة مخفية بـ visibility", en: "The sign is hidden with visibility", test: `return ${cs(".sign", "visibility")}==='hidden'` },
      { ar: "اللافتة ما زالت تشغل مكانها", en: "The sign still keeps its space", test: `return ${$(".sign")}.offsetHeight>0&&${cs(".sign", "display")}!=='none'` }],
    hints: [{ ar: "الفكرة: إظهار عنصر مُلغى + إخفاء عنصر مع بقاء مكانه.", en: "Idea: show a removed element + hide one while keeping its place." }, { ar: "display وvisibility.", en: "display and visibility." }, { ar: "مثال: .x { visibility: hidden } يخفي العنصر ويبقى مكانه.", en: "Example: .x { visibility: hidden } hides the element but keeps its place." }],
    explain: t("غيّرنا display للسلم فعاد للتخطيط، واستعملنا visibility لللافتة فاختفت دون أن ينتقل ما حولها.", "We changed the ladder's display so it re-entered the layout, and used visibility on the sign so it vanished without moving its neighbours."),
    solution: { css: ".ladder {\n  display: block;\n}\n.sign {\n  visibility: hidden;\n}" }, alts: [{ css: ".ladder { display: flex; }\n.sign { visibility: hidden; opacity: 0; }" }] },

  { id: "zb-10", level: "advanced", tech: "css", runtime: "html", edit: ["css"], head: SCENE + `<style>.zone.gatezone{overflow:hidden;height:70px;padding:0}.gate{display:block;height:60px;transform:translateY(-62px)}</style>`,
    title: t("بوابة تنزلق", "A Sliding Gate"), goal: t("transition و transform", "transition and transform"),
    brief: t("البوابة (class gate) مرفوعة. عند إضافة الصنف closed يجب أن تنزل إلى مكانها (translateY(0)) بحركة ناعمة تستغرق ثانية أو أقل ولا تقفز فجأة.", "The gate (class gate) is raised. When the class closed is added it must slide down to its place (translateY(0)) smoothly, not jump."),
    teach: { what: t("transition تجعل تغيّر خاصية CSS يحدث تدريجيًا بدل أن يكون فوريًا، وtransform يحرك العنصر دون التأثير في التخطيط.", "transition makes a CSS change happen gradually instead of instantly; transform moves an element without affecting layout."),
      does: t("transition: transform .5s ease يقول: حين يتغير transform استغرق نصف ثانية.", "transition: transform .5s ease means: when transform changes, take half a second."),
      why: t("الحركة تعطي اللاعب إحساسًا بما حدث، وتُرشد العين إلى التغيير.", "Motion tells the player what just happened and guides the eye."),
      how: t("اكتب transition على .gate، ثم قاعدة .gate.closed بقيمة transform جديدة.", "Write transition on .gate, then a .gate.closed rule with the new transform."),
      expect: t("بعد النجاح تُغلق البوابة بحركة ناعمة أمامك.", "After success the gate slides shut right in front of you."),
      mistake: t("وضع transition داخل قاعدة .closed فقط فتعمل الحركة في اتجاه واحد.", "Putting transition only inside .closed so the animation runs in one direction only.") },
    files: { html: FIELD('<div class="gate">GATE</div>', 'class="zone gatezone" id="zone"'), css: ".gate {\n  \n}\n\n.gate.closed {\n  \n}" },
    onWin: `document.querySelector('.gate').classList.add('closed');`,
    checks: [
      { ar: "لدى .gate انتقال transition على transform", en: ".gate has a transition on transform", test: `var s=getComputedStyle(${$(".gate")});return (s.transitionProperty.indexOf('transform')>-1||s.transitionProperty==='all')&&parseFloat(s.transitionDuration)>0` },
      { ar: "المدة لا تتجاوز ثانية", en: "Duration is at most one second", test: `return parseFloat(${cs(".gate", "transitionDuration")})<=1` },
      { ar: "مع closed تصبح البوابة في مكانها (translateY(0))", en: "With closed the gate sits in place (translateY(0))", test: `var g=${$(".gate")};var old=g.style.transition;g.style.transition='none';g.classList.add('closed');var tr=getComputedStyle(g).transform;g.classList.remove('closed');g.style.transition=old;return tr==='none'||/^matrix\\(1, 0, 0, 1, 0, -?0\\)$/.test(tr)` }],
    hints: [{ ar: "الفكرة: حالة جديدة للبوابة + حركة بين الحالتين.", en: "Idea: a new state for the gate + motion between the states." }, { ar: "transition على الحالة الأساسية وtransform على .closed.", en: "transition on the base state and transform on .closed." }, { ar: "مثال: .box { transition: opacity .3s } .box.on { opacity: 1 }", en: "Example: .box { transition: opacity .3s } .box.on { opacity: 1 }" }],
    explain: t("الانتقال على الحالة الأساسية يعمل في الاتجاهين، وقاعدة .closed تحدد نقطة النهاية فتنزلق البوابة بدل أن تقفز.", "A transition on the base state works both ways, and the .closed rule sets the end point so the gate slides instead of jumping."),
    solution: { css: ".gate {\n  transition: transform .5s ease;\n}\n\n.gate.closed {\n  transform: translateY(0);\n}" }, alts: [{ css: ".gate { transition: all .8s linear; }\n.gate.closed { transform: none; }" }] },

  { id: "zb-11", level: "intermediate", tech: "html", runtime: "html", edit: ["html"], head: SCENE,
    title: t("نموذج نداء الاستغاثة", "Distress Call Form"), goal: t("HTML: form و label و input", "HTML: form, label and input"),
    brief: t("ابنِ نموذج استغاثة يستطيع الناجي ملأه: حقل للاسم وحقل للرسالة (كل حقل له label مرتبط)، والاسم إجباري، وزر إرسال حقيقي.", "Build a distress form: a name field and a message field (each with a linked label), the name is required, and a real submit button."),
    teach: { what: t("النموذج form يجمع حقول الإدخال، وlabel يربط نصًا بالحقل عبر for و id.", "A form groups inputs; label ties text to a field through for and id."),
      does: t("الربط يجعل النقر على النص يركّز الحقل، وهو ضروري لقارئات الشاشة. required يمنع الإرسال الفارغ.", "The link focuses the field when the text is clicked and is essential for screen readers. required blocks empty submissions."),
      why: t("الناجي المصاب قد يستخدم لوحة صغيرة أو قارئ شاشة؛ البنية الصحيحة تنقذ الوقت.", "A wounded survivor may use a small keyboard or a screen reader; correct structure saves time."),
      how: t('<label for="name">…</label><input id="name" name="name" required>', '<label for="name">…</label><input id="name" name="name" required>'),
      expect: t("حقلان واضحا العنوان وزر إرسال، ولا يمكن إرسال الاسم فارغًا.", "Two clearly labelled fields and a submit button; an empty name cannot be sent."),
      mistake: t("وضع نص عادي بجانب الحقل بدل label، أو نسيان type=\"submit\".", "Using plain text next to the field instead of a label, or forgetting type=\"submit\".") },
    files: { html: "<h2>Distress call</h2>\n<!-- build the form here -->\n", css: "" },
    checks: [
      { ar: "يوجد عنصر form", en: "There is a form element", test: `return !!${$("form")}` },
      { ar: "حقلان على الأقل وكل حقل له label مرتبط", en: "At least two fields, each with a linked label", test: `var f=${$$("form input:not([type=submit]):not([type=button]), form textarea, form select")};return f.length>=2&&f.every(function(x){return (x.id&&document.querySelector('label[for="'+x.id+'"]'))||x.closest('label')})` },
      { ar: "حقل واحد على الأقل required وله name", en: "At least one required field with a name", test: `return ${$$("form [required]")}.some(function(x){return x.getAttribute('name')})` },
      { ar: "زر إرسال حقيقي (type=submit)", en: "A real submit button (type=submit)", test: `return !!${$('form button[type=submit], form input[type=submit]')}` }],
    hints: [{ ar: "الفكرة: عنصر form يحوي حقولًا لكل منها label.", en: "Idea: a form element holding fields, each with a label." }, { ar: "for في label يساوي id في الحقل.", en: "label's for equals the field's id." }, { ar: 'مثال: <label for="a">A</label><input id="a" name="a">', en: 'Example: <label for="a">A</label><input id="a" name="a">' }],
    explain: t("الـ label المرتبط يضمن إمكانية الوصول، وrequired يتحقق منه المتصفح تلقائيًا، وزر type=submit يرسل النموذج.", "A linked label guarantees accessibility, the browser validates required automatically, and a type=submit button sends the form."),
    solution: { html: '<h2>Distress call</h2>\n<form>\n  <label for="name">Name</label>\n  <input id="name" name="name" required>\n  <label for="msg">Where are you?</label>\n  <textarea id="msg" name="msg"></textarea>\n  <button type="submit">Send call</button>\n</form>' },
    alts: [{ html: '<form><label>Name <input name="n" required></label><label>Place <input name="p"></label><input type="submit" value="Send"></form>' }] },

  { id: "zb-12", level: "intermediate", tech: "html", runtime: "html", edit: ["html"], head: SCENE,
    title: t("ترميم الملجأ", "Repairing the Shelter"), goal: t("HTML الدلالي والوصول", "Semantic HTML and accessibility"),
    brief: t("صفحة الملجأ مبنية كلها من div. أصلحها: header فيه h1، وnav فيه رابطان، وmain فيه قائمة ul بالناجين، وfooter، وصورة لها alt وصفي.", "The shelter page is made only of divs. Repair it: header with an h1, nav with two links, main with a ul of survivors, a footer and an image with a descriptive alt."),
    teach: { what: t("HTML الدلالي يستعمل عناصر تصف معناها: header وnav وmain وfooter وul.", "Semantic HTML uses elements that describe their meaning: header, nav, main, footer, ul."),
      does: t("المتصفحات وقارئات الشاشة ومحركات البحث تفهم البنية وتتنقل بين الأقسام.", "Browsers, screen readers and search engines understand the structure and can jump between sections."),
      why: t("عشرون div متداخلة لا تعني شيئًا لأحد، أما العناصر الدلالية فتحكي القصة.", "Twenty nested divs mean nothing to anybody; semantic elements tell the story."),
      how: t("بدّل كل div بالعنصر المناسب، وحوّل الأسماء إلى li، وأضف alt للصورة.", "Replace each div with the right element, turn the names into li items and add alt to the image."),
      expect: t("نفس المحتوى لكن ببنية واضحة.", "The same content with a clear structure."),
      mistake: t("alt فارغ أو غير مفيد مثل \"image\"، وعدم وجود h1 واحد في الصفحة.", "An empty or useless alt such as \"image\", and not having a single h1.") },
    files: { html: '<div id="top"><div class="title">Safe House</div></div>\n<div id="menu"><a href="#supplies">Supplies</a> <a href="#exits">Exits</a></div>\n<div id="content">\n  <div>Survivors inside:</div>\n  <div>Sara</div>\n  <div>Omar</div>\n  <div>Lina</div>\n  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="60" height="40">\n</div>\n<div id="foot">© FAYBIT shelter</div>', css: "" },
    checks: [
      { ar: "header يحوي h1", en: "header contains an h1", test: `return !!${$("header h1")}` },
      { ar: "nav يحوي رابطين على الأقل", en: "nav contains at least two links", test: `return ${$$("nav a[href]")}.length>=2` },
      { ar: "main يحوي ul فيه ثلاثة li", en: "main contains a ul with three li", test: `return ${$$("main ul > li")}.length>=3` },
      { ar: "footer موجود", en: "A footer exists", test: `return !!${$("footer")}` },
      { ar: "الصورة لها alt وصفي (3 أحرف فأكثر)", en: "The image has a descriptive alt (3+ chars)", test: `var i=${$("img")};return !!i&&(i.getAttribute('alt')||'').trim().length>=3` }],
    hints: [{ ar: "الفكرة: استبدل كل div بعنصر يصف دوره.", en: "Idea: replace each div with an element that describes its role." }, { ar: "header وnav وmain وfooter وul/li وalt.", en: "header, nav, main, footer, ul/li and alt." }, { ar: 'مثال: <img src="x.png" alt="A wooden barricade">', en: 'Example: <img src="x.png" alt="A wooden barricade">' }],
    explain: t("كل عنصر دلالي أعطى المحتوى معنى: قارئ الشاشة يستطيع القفز إلى nav أو main، والقائمة تُقرأ بعدد العناصر، والـ alt يصف الصورة لمن لا يراها.", "Each semantic element gave the content meaning: a screen reader can jump to nav or main, the list announces its item count and alt describes the image to those who cannot see it."),
    solution: { html: '<header><h1>Safe House</h1></header>\n<nav><a href="#supplies">Supplies</a> <a href="#exits">Exits</a></nav>\n<main>\n  <p>Survivors inside:</p>\n  <ul>\n    <li>Sara</li>\n    <li>Omar</li>\n    <li>Lina</li>\n  </ul>\n  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="60" height="40" alt="Reinforced shelter door">\n</main>\n<footer>© FAYBIT shelter</footer>' }, alts: [] },

  { id: "zb-13", level: "advanced", tech: "js", runtime: "html", edit: ["js"], head: SCENE,
    title: t("فخ يعمل عند الدخول", "A Trap That Reacts"), goal: t("JavaScript: الأحداث والحلقات", "JavaScript: events and loops"),
    brief: t("ثلاثة زومبي (class walker) في الساحة. اجعل النقر على أي زومبي ينشّط الفخ (يضيف له الصنف active) ويزيد العدّاد #count بواحد.", "Three zombies (class walker) are in the yard. Make clicking any zombie activate the trap (add class active) and raise the #count counter by one."),
    teach: { what: t("الحدث (event) إشارة من المتصفح عند حدوث شيء (نقر، حركة…). addEventListener يربط دالة بالحدث.", "An event is a signal from the browser when something happens (click, move…). addEventListener attaches a function to it."),
      does: t("querySelectorAll تعيد قائمة عناصر، وforEach تكرر نفس الربط على كل عنصر.", "querySelectorAll returns a list of elements and forEach repeats the same hook for each of them."),
      why: t("الفخاخ لا تعمل وحدها؛ يجب أن تتفاعل مع ما يفعله اللاعب أو الزومبي.", "Traps do not act alone; they must react to what the player or zombies do."),
      how: t("walkers.forEach(w => w.addEventListener('click', () => { ... }))", "walkers.forEach(w => w.addEventListener('click', () => { ... }))"),
      expect: t("كل نقرة تُشعل الفخ وتزيد العدد.", "Every click lights the trap and raises the count."),
      mistake: t("ربط الحدث بالعنصر الأول فقط، أو كتابة textContent كنص بدل رقم فيصبح العدّ \"01\".", "Hooking only the first element, or treating textContent as a number so counting breaks.") },
    files: { html: '<ul id="yard" style="margin:0;padding:0"><li class="walker">Z1</li><li class="walker">Z2</li><li class="walker">Z3</li></ul>\n<div id="trap">TRAP</div>\n<p>Caught: <b id="count">0</b></p>', css: "", js: "const walkers = document.querySelectorAll('.walker');\nconst trap = document.getElementById('trap');\nconst count = document.getElementById('count');\n\n// when a walker is clicked: activate the trap and add 1 to the count\n" },
    checks: [
      { ar: "الفخ غير نشط قبل أي نقر", en: "The trap is inactive before any click", test: `return !${$("#trap")}.classList.contains('active')` },
      { ar: "النقر على أي زومبي ينشّط الفخ", en: "Clicking any zombie activates the trap", test: `return ${$$(".walker")}.every(function(w){var t=${$("#trap")};t.classList.remove('active');w.click();var ok=t.classList.contains('active');return ok})` },
      { ar: "كل نقرة تزيد العدّاد بواحد", en: "Each click raises the counter by one", test: `var c=${$("#count")},b=Number(c.textContent);${$$(".walker")}.forEach(function(w){w.click()});return Number(c.textContent)-b===3` }],
    hints: [{ ar: "الفكرة: كرّر ربط حدث النقر على كل زومبي.", en: "Idea: repeat the click hook on every zombie." }, { ar: "forEach وaddEventListener وclassList.add.", en: "forEach, addEventListener and classList.add." }, { ar: "مثال: btn.addEventListener('click', () => { box.classList.add('on') })", en: "Example: btn.addEventListener('click', () => { box.classList.add('on') })" }],
    explain: t("حلقة forEach ربطت المستمع بكل زومبي؛ وعند النقر أضفنا الصنف active (الذي يعرّف شكل الفخ في CSS) وزدنا الرقم بعد تحويله بـ Number.", "forEach attached the listener to every zombie; on click we added the active class (which the CSS styles) and raised the number after converting it with Number."),
    solution: { js: "const walkers = document.querySelectorAll('.walker');\nconst trap = document.getElementById('trap');\nconst count = document.getElementById('count');\n\nwalkers.forEach((w) => {\n  w.addEventListener('click', () => {\n    trap.classList.add('active');\n    count.textContent = Number(count.textContent) + 1;\n  });\n});" },
    alts: [{ js: "const trap = document.getElementById('trap');\nconst count = document.getElementById('count');\nfor (const w of document.querySelectorAll('.walker')) {\n  w.onclick = function () { trap.classList.add('active'); count.textContent = +count.textContent + 1; };\n}" }] },

  { id: "zb-14", level: "advanced", tech: "js", runtime: "html", edit: ["js"], head: SCENE,
    title: t("فرز المصابين", "Triage"), goal: t("JavaScript: الدوال والشروط والبيانات", "JavaScript: functions, conditions and data"),
    brief: t("اكتب الدالة markWounded(limit): تمرّ على كل بطاقة ناجٍ (class card)، وتضيف الصنف wounded لمن صحته (data-hp) أقل من limit وتزيله عن غيره، ثم تكتب في #report العبارة «Wounded: N». ثم استدعها بالقيمة 40.", "Write markWounded(limit): loop over every survivor card (class card), add class wounded to those whose data-hp is below limit and remove it from the others, then write “Wounded: N” into #report. Finally call it with 40."),
    teach: { what: t("الدالة تجمّع خطوات تحت اسم، وتأخذ مدخلات (parameters) لتعمل على قيم مختلفة.", "A function groups steps under a name and takes parameters so it can work on different values."),
      does: t("الحلقة تمر على العناصر، والشرط if يقرر لكل عنصر، وdataset يقرأ سمات data-*.", "A loop visits the items, if decides for each one, and dataset reads data-* attributes."),
      why: t("الفرز الطبي يتكرر في كل موجة؛ دالة واحدة أفضل من نسخ الكود.", "Triage repeats every wave; one function beats copy-pasted code."),
      how: t("for (const c of cards) { if (Number(c.dataset.hp) < limit) ... }", "for (const c of cards) { if (Number(c.dataset.hp) < limit) ... }"),
      expect: t("بطاقتان باللون الأحمر عند 40 وتقرير «Wounded: 2».", "Two red cards at 40 and the report “Wounded: 2”."),
      mistake: t("مقارنة النص بالرقم دون Number، أو نسيان إزالة الصنف عند إعادة الاستدعاء.", "Comparing text to a number without Number, or forgetting to remove the class on a second call.") },
    files: { html: '<div id="camp"><span class="card" data-hp="70">Sara 70</span><span class="card" data-hp="20">Omar 20</span><span class="card" data-hp="55">Lina 55</span><span class="card" data-hp="10">Adam 10</span><span class="card" data-hp="90">Nour 90</span></div>\n<p id="report"></p>', css: "", js: "function markWounded(limit) {\n  // loop over the cards, compare data-hp with limit\n}\n\n// call it with 40\n" },
    checks: [
      { ar: "استدعيتَ markWounded(40) بنفسك في الكود", en: "You called markWounded(40) in your own code", test: `return ${$$(".card.wounded")}.length===2` },
      { ar: "markWounded(40) تعلّم صاحبَي الصحة 20 و10 فقط", en: "markWounded(40) marks only the survivors with 20 and 10", test: `markWounded(40);var w=${$$(".card.wounded")}.map(function(c){return c.dataset.hp}).sort().join(',');return w==='10,20'` },
      { ar: "التقرير «Wounded: 2»", en: "The report reads “Wounded: 2”", test: `markWounded(40);return ${$("#report")}.textContent.trim()==='Wounded: 2'` },
      { ar: "الدالة تعمل مع قيمة أخرى (60 ← 3 مصابين) وتُزيل العلامات القديمة", en: "It works with another value (60 → 3 wounded) and clears old marks", test: `markWounded(60);var n=${$$(".card.wounded")}.length;markWounded(40);return n===3&&${$$(".card.wounded")}.length===2&&${$("#report")}.textContent.trim()==='Wounded: 2'` }],
    hints: [{ ar: "الفكرة: حلقة + شرط + عدّاد داخل دالة.", en: "Idea: a loop + a condition + a counter inside a function." }, { ar: "dataset.hp نص؛ حوّله بـ Number.", en: "dataset.hp is text; convert it with Number." }, { ar: "مثال: for (const x of list) { if (x.value > 3) { n++ } }", en: "Example: for (const x of list) { if (x.value > 3) { n++ } }" }],
    explain: t("الحلقة زارت كل بطاقة، وif قارنت الرقم بالحد، وclassList.toggle/add/remove حدّثت الشكل، والعدّاد n جُمع ثم كُتب في التقرير.", "The loop visited every card, if compared the number with the limit, classList updated the look, and the counter n was summed then written into the report."),
    solution: { js: "function markWounded(limit) {\n  let n = 0;\n  const cards = document.querySelectorAll('.card');\n  for (const c of cards) {\n    c.classList.remove('wounded');\n    if (Number(c.dataset.hp) < limit) {\n      c.classList.add('wounded');\n      n++;\n    }\n  }\n  document.getElementById('report').textContent = 'Wounded: ' + n;\n}\n\nmarkWounded(40);" },
    alts: [{ js: "const markWounded = (limit) => {\n  const cards = [...document.querySelectorAll('.card')];\n  cards.forEach((c) => c.classList.toggle('wounded', Number(c.dataset.hp) < limit));\n  document.getElementById('report').textContent = `Wounded: ${cards.filter((c) => c.classList.contains('wounded')).length}`;\n};\nmarkWounded(40);" }] },

  { id: "zb-15", level: "expert", tech: "html+css+js", runtime: "html", edit: ["html", "css", "js"], head: SCENE,
    title: t("لوحة الإنقاذ", "The Rescue Panel"), goal: t("HTML + CSS + JavaScript معًا", "HTML + CSS + JavaScript together"),
    brief: t("أكمل لوحة الإنقاذ: (HTML) أضف زر #rescue من النوع button وفقرة #status فيها role=\"status\"؛ (CSS) رتّب #panel كشبكة من عمودين؛ (JS) عند النقر على الزر يأخذ كل ناجٍ الصنف safe وتُكتب في #status العبارة «Rescued: 4/4».", "Finish the rescue panel: (HTML) add a #rescue button of type button and a #status paragraph with role=\"status\"; (CSS) lay #panel out as a two-column grid; (JS) on click every survivor gets class safe and #status reads “Rescued: 4/4”."),
    teach: { what: t("التطبيقات الحقيقية تجمع الثلاثة: HTML للبنية وCSS للشكل وJavaScript للسلوك.", "Real apps combine all three: HTML for structure, CSS for looks and JavaScript for behaviour."),
      does: t("كل جزء يقوم بدوره، والربط بينها يتم عبر id وclass.", "Each part does its job and ids and classes connect them."),
      why: t("هذه هي المهارة التي تُبنى بها المواقع فعلًا.", "This is the skill real websites are built with."),
      how: t("ابدأ بالبنية في HTML، ثم الشبكة في CSS، ثم الحدث في JS.", "Start with the structure in HTML, then the grid in CSS, then the event in JS."),
      expect: t("لوحة من عمودين، وزر يُنقذ الجميع بنقرة.", "A two-column panel and a button that rescues everyone with one click."),
      mistake: t("نسيان type=\"button\" أو role=\"status\" (إتاحة الوصول)، أو تغيير ترتيب تحميل JS قبل وجود العناصر.", "Forgetting type=\"button\" or role=\"status\" (accessibility), or running the JS before the elements exist.") },
    files: { html: '<section id="panel">\n  <div class="card">Sara</div>\n  <div class="card">Omar</div>\n  <div class="card">Lina</div>\n  <div class="card">Adam</div>\n  <!-- add the button and the status paragraph -->\n</section>', css: "#panel {\n  \n}", js: "// when #rescue is clicked: every .card gets class safe, #status says Rescued: 4/4\n" },
    checks: [
      { ar: "الزر #rescue من النوع button", en: "#rescue is a button of type button", test: `var b=${$("#rescue")};return !!b&&b.tagName==='BUTTON'&&b.getAttribute('type')==='button'` },
      { ar: "#status له role=status", en: "#status has role=status", test: `var s=${$("#status")};return !!s&&s.getAttribute('role')==='status'` },
      { ar: "#panel شبكة بعمودين", en: "#panel is a two-column grid", test: `var p=${$("#panel")};if(getComputedStyle(p).display!=='grid')return false;var L={};${rects(".card")}.forEach(function(r){L[Math.round(r.left)]=1});return Object.keys(L).length===2` },
      { ar: "النقر على الزر ينقذ الجميع ويكتب Rescued: 4/4", en: "Clicking rescues everyone and writes Rescued: 4/4", test: `var b=${$("#rescue")};if(!b)return false;b.click();return ${$$(".card.safe")}.length===4&&${$("#status")}.textContent.trim()==='Rescued: 4/4'` }],
    hints: [{ ar: "الفكرة: ثلاث خطوات: زر وفقرة، ثم شبكة، ثم حدث.", en: "Idea: three steps: a button and paragraph, then a grid, then an event." }, { ar: "button type وrole في HTML، grid-template-columns في CSS، addEventListener في JS.", en: "button type and role in HTML, grid-template-columns in CSS, addEventListener in JS." }, { ar: "مثال: document.querySelector('#x').addEventListener('click', () => { ... })", en: "Example: document.querySelector('#x').addEventListener('click', () => { ... })" }],
    explain: t("الـ HTML وفّر الزر والنص المُعلَن، والـ CSS رتب البطاقات في شبكة، والـ JS ربط النقر بحلقة تضيف الصنف safe وتكتب النتيجة.", "HTML provided the button and the announced text, CSS arranged the cards in a grid and JS tied the click to a loop that adds safe and writes the result."),
    solution: { html: '<section id="panel">\n  <div class="card">Sara</div>\n  <div class="card">Omar</div>\n  <div class="card">Lina</div>\n  <div class="card">Adam</div>\n  <button id="rescue" type="button">Rescue all</button>\n  <p id="status" role="status"></p>\n</section>', css: "#panel {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n#panel button, #panel p { grid-column: 1 / -1; }", js: "const cards = document.querySelectorAll('.card');\nconst status = document.getElementById('status');\ndocument.getElementById('rescue').addEventListener('click', () => {\n  cards.forEach((c) => c.classList.add('safe'));\n  status.textContent = 'Rescued: ' + cards.length + '/' + cards.length;\n});" }, alts: [] },
];
