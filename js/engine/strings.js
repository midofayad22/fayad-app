/*
  Interface strings of the shared course view (Arabic + English). Lesson CONTENT lives in content/<track>/index.js;
  this file only holds the chrome around it: buttons, labels, quiz feedback, status text.
  Technical words (JavaScript, HTML, CSS, Console ...) stay in English in both languages by design.
  Usage: const S = strings(lang); S("quiz.question", { n: 2 })
*/
const dict = {
  ar: {
    "path.title": "مسار تعلم {course}",
    "page.title": "FAYAD — تعلم {course}",
    "sidebar.label": "مسار التعلم",
    "sidebar.aria": "دروس {course}",
    "lesson.label": "الدرس",
    "progress.label": "تقدم {course}",
    "example.label": "مثال برمجي",
    "example.heading": "الكود",
    "copy": "نسخ", "copied": "تم النسخ ✓", "copyFailed": "فشل النسخ",
    "result.label": "النتيجة",
    "explain.heading": "فهم الكود",
    "practice.label": "جرّب بنفسك",
    "practice.hint": "غيّر الكود الموجود بالأسفل ثم شغّله لترى النتيجة.",
    "editor.aria": "محرر الكود",
    "run": "تشغيل الكود", "reset": "إعادة ضبط",
    "output.label": "الناتج", "output.placeholder": "ستظهر النتيجة هنا.", "output.running": "جاري التشغيل...", "output.ran": "تم تشغيل الكود بنجاح.",
    "output.error": "خطأ: {message}", "output.timeout": "تم إيقاف التنفيذ: استغرق الكود وقتًا طويلًا.",
    "preview.label": "المعاينة المباشرة", "preview.title": "معاينة الكود", "preview.sim": "معاينة مبسّطة للتعلم (لا يتم تشغيل React الحقيقي).",
    "stage.button": "زر تجريبي",
    "quiz.label": "اختبار سريع", "quiz.question": "السؤال {n}", "quiz.instruction": "اختر الإجابة الصحيحة.",
    "quiz.correct": "✓ إجابة صحيحة! أحسنت.", "quiz.wrong": "✗ إجابة غير صحيحة، حاول مرة أخرى.",
    "quiz.next": "السؤال التالي", "quiz.complete": "إكمال الدرس", "quiz.done": "اكتمل المسار ✓", "quiz.doneMsg": "🎉 ممتاز! لقد أكملت جميع دروس {course}.",
    "nav.prev": "الدرس السابق", "nav.next": "الدرس التالي", "nav.start": "بداية المسار", "nav.end": "اكتمل المسار",
    "nav.lessons": "كل الدروس", "nav.back": "رجوع", "nav.aria": "التنقل بين الدروس",
    "state.loadError": "تعذّر تحميل الدروس. أعد تحميل الصفحة، وإذا استمرت المشكلة جرّب النسخة السابقة: ?engine=legacy",
    "quiz.noAnswers": "لا توجد إجابات متاحة لهذا السؤال.",
  },
  en: {
    "path.title": "{course} learning path",
    "page.title": "FAYAD — Learn {course}",
    "sidebar.label": "Learning path",
    "sidebar.aria": "{course} lessons",
    "lesson.label": "Lesson",
    "progress.label": "{course} progress",
    "example.label": "Code example",
    "example.heading": "The code",
    "copy": "Copy", "copied": "Copied ✓", "copyFailed": "Copy failed",
    "result.label": "Result",
    "explain.heading": "Understanding the code",
    "practice.label": "Try it yourself",
    "practice.hint": "Change the code below, then run it to see the result.",
    "editor.aria": "Code editor",
    "run": "Run code", "reset": "Reset",
    "output.label": "Output", "output.placeholder": "The result will appear here.", "output.running": "Running...", "output.ran": "The code ran successfully.",
    "output.error": "Error: {message}", "output.timeout": "Execution stopped: the code took too long.",
    "preview.label": "Live preview", "preview.title": "Code preview", "preview.sim": "Simplified learning preview (real React is not executed).",
    "stage.button": "Demo button",
    "quiz.label": "Quick check", "quiz.question": "Question {n}", "quiz.instruction": "Choose the correct answer.",
    "quiz.correct": "✓ Correct! Well done.", "quiz.wrong": "✗ Not quite — try again.",
    "quiz.next": "Next question", "quiz.complete": "Complete lesson", "quiz.done": "Course complete ✓", "quiz.doneMsg": "🎉 Great job! You finished every lesson of {course}.",
    "nav.prev": "Previous lesson", "nav.next": "Next lesson", "nav.start": "Start of the course", "nav.end": "Course complete",
    "nav.lessons": "All lessons", "nav.back": "Back", "nav.aria": "Lesson navigation",
    "state.loadError": "The lessons could not be loaded. Reload the page; if the problem persists try the previous version: ?engine=legacy",
    "quiz.noAnswers": "No answers are available for this question.",
  },
};

export const keys = (lang) => Object.keys(dict[lang]);

/** Returns a translator for `lang` (missing English keys fall back to Arabic, then to the key so tests can see gaps). */
export function strings(lang) {
  const l = lang === "en" ? "en" : "ar";
  return (key, vars) => {
    let v = dict[l][key] ?? dict.ar[key] ?? key;
    if (vars) v = v.replace(/\{(\w+)\}/g, (m, n) => (vars[n] !== undefined ? vars[n] : m));
    return v;
  };
}
