// Deep-dive layer for the HTML track (see content/_deep.js). Original explanations; references point to primary documentation.
import { D } from "../_deep.js";

export const DEEP = {
  "html-01": {
    deep: [
      { t: D("ماذا يفعل المتصفح بملف HTML فعليًا؟", "What does the browser actually do with an HTML file?"),
        html: D(
          "<p>المتصفح لا «يعرض» الملف مباشرة؛ بل <strong>يحلّله (parse)</strong> إلى شجرة كائنات تسمى <strong>DOM</strong>، ثم يدمجها مع CSS لبناء شجرة العرض، ثم يرسم الصفحة. وإذا وجد خطأ في الترميز فإنه يُصلحه بقواعد محددة في المواصفة بدل أن يتوقف، ولذلك قد تبدو صفحة بها أخطاء تعمل «بشكل سليم» رغم أنها غير صالحة.</p><p>فهم هذه السلسلة (نص ← DOM ← عرض) هو أساس كل ما بعده: لماذا يهم ترتيب العناصر، ولماذا يمكن لـ JavaScript تعديل الصفحة بعد التحميل.</p>",
          "<p>The browser does not simply \"display\" the file. It <strong>parses</strong> it into an object tree called the <strong>DOM</strong>, combines that with CSS to build a render tree, then paints the page. When it meets invalid markup it repairs it using exact rules from the specification instead of stopping, which is why a broken page often still \"works\" even though it is not valid.</p><p>Understanding this chain (text → DOM → paint) underpins everything later: why element order matters and why JavaScript can change a page after it loads.</p>") },
    ],
    interview: [
      { lv: "junior", q: D("ما الفرق بين HTML وCSS وJavaScript؟", "What is the difference between HTML, CSS and JavaScript?"),
        a: D("<p>HTML تصف <strong>بنية المحتوى ومعناه</strong>، وCSS تتحكم في <strong>المظهر والتخطيط</strong>، وJavaScript تضيف <strong>السلوك والتفاعل</strong>. الفصل بينها يجعل الكود أسهل في الصيانة وإعادة الاستخدام.</p>", "<p>HTML describes the <strong>structure and meaning</strong> of content, CSS controls <strong>presentation and layout</strong>, and JavaScript adds <strong>behaviour and interactivity</strong>. Keeping them separate makes code easier to maintain and reuse.</p>") },
      { lv: "junior", q: D("هل HTML لغة برمجة؟ ولماذا؟", "Is HTML a programming language? Why or why not?"),
        a: D("<p>لا، فهي لغة <strong>ترميز (markup)</strong> وصفية: لا تحتوي على متغيرات أو شروط أو حلقات، بل تصف المحتوى فقط. تُعرَّف بأنها «declarative».</p>", "<p>No. It is a descriptive <strong>markup</strong> language: it has no variables, conditions or loops, it only describes content. It is called <em>declarative</em>.</p>") },
      { lv: "mid", q: D("ماذا يحدث عندما تكتب HTML غير صالحة؟", "What happens when you write invalid HTML?"),
        a: D("<p>المتصفح يطبّق خوارزمية <strong>تعافٍ من الأخطاء</strong> محددة في مواصفة WHATWG، فيغلق وسوم ناقصة وينقل عناصر لأماكن مقبولة. النتيجة قد تختلف عمّا قصدت، ويصعب اكتشاف الخطأ، لذلك نستخدم مدقق الصلاحية (validator).</p>", "<p>The browser runs a defined <strong>error-recovery</strong> algorithm from the WHATWG specification: it closes missing tags and moves elements to acceptable places. The result may differ from what you meant and the bug is hard to spot, which is why we use a validator.</p>") },
    ],
    refs: [
      { s: "MDN", u: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax", t: D("أساسيات بنية HTML", "Basic HTML syntax") },
      { s: "WHATWG", u: "https://html.spec.whatwg.org/multipage/introduction.html", t: D("مقدمة مواصفة HTML", "HTML Standard: introduction") },
      { s: "W3S", u: "https://www.w3schools.com/html/html_intro.asp", t: D("مقدمة HTML (شرح مبسّط)", "HTML introduction (beginner-friendly)") },
    ],
  },
};
