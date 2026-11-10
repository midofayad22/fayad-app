// Extra assessment questions: every lesson ends with at least five questions.
// Each track keeps its extra questions in content/<track>/quiz-extra.js as { "<lessonId>": [question, …] };
// a question is { question:{ar,en}, options:[{ar,en}×4], correct:<index>, explain:{ar,en} } (explain is shown after the right answer).
// Appended after the original questions, so existing questions, ids and progress records are untouched.
// target "quiz" appends to lesson.quiz (generic engine); "quizMore" appends to lesson.quizMore (foundation engine: com, prg).
export function applyExtraQuiz(lessons, EXTRA, target = "quiz") {
  for (const [id, qs] of Object.entries(EXTRA)) {
    const l = lessons.find((x) => x.id === id);
    if (!l) throw new Error("extra quiz for unknown lesson " + id);
    if (target === "quizMore") l.quizMore = [...(l.quizMore || []), ...qs];
    else l.quiz = [...l.quiz, ...qs];
  }
}
