/*
  Course state machine (pure: no DOM, no storage globals). Implements the established completion rules:

    - A lesson is "open" when shown. Opening NEVER completes it.
    - Each quiz question must be answered correctly (unlimited retries; a wrong answer only counts an attempt).
    - After the last question is correct, "complete lesson" marks the lesson complete and moves to the next one.
    - Previous/next and the sidebar all follow the same ordered id list, so every lesson is reachable.
    - Partial quiz state is not persisted: switching lesson restarts its quiz (as in the legacy courses).
*/
import { orderedIds } from "./schema.js";

export function createState({ track, lessons, progress }) {
  const order = orderedIds(track);
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const trackId = track.id;

  let current = order[0];
  let question = 0;
  let passedThis = false; // current question answered correctly, waiting for "next"

  const quizOf = (id) => byId.get(id).quiz;

  return {
    order,
    get current() { return current; },
    get index() { return order.indexOf(current); },
    get lesson() { return byId.get(current); },
    get question() { return question; },
    get questionCount() { return quizOf(current).length; },
    get questionData() { return quizOf(current)[question]; },
    get passedQuestion() { return passedThis; },
    get isLastQuestion() { return question === quizOf(current).length - 1; },
    get hasPrev() { return order.indexOf(current) > 0; },
    get hasNext() { return order.indexOf(current) < order.length - 1; },
    prevId() { const i = order.indexOf(current); return i > 0 ? order[i - 1] : null; },
    nextId() { const i = order.indexOf(current); return i < order.length - 1 ? order[i + 1] : null; },
    isCompleted(id) { return progress.isCompleted(trackId, id); },
    get completedCount() { return order.filter((id) => progress.isCompleted(trackId, id)).length; },
    get percent() { return Math.round((this.completedCount / order.length) * 100); },

    /** Open a lesson (resume pointer is saved; completion is NOT). Returns false for unknown ids. */
    open(id) {
      if (!byId.has(id)) return false;
      current = id; question = 0; passedThis = false;
      progress.setCurrent(trackId, id);
      return true;
    },

    /** Resume position from storage without writing anything. */
    resumeId() { const c = progress.current(trackId); return c && byId.has(c) ? c : order[0]; },

    /** @returns {{correct: boolean, ignored?: boolean}} */
    answer(optionIndex) {
      if (passedThis) return { correct: true, ignored: true }; // locked after a correct answer (legacy behaviour)
      const q = quizOf(current)[question];
      if (!q || !Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= q.options.length) return { correct: false, ignored: true };
      const correct = optionIndex === q.correct;
      progress.recordAnswer(trackId, current, question, correct);
      if (correct) passedThis = true;
      return { correct };
    },

    /**
     * Quiz "next" button. Only acts after a correct answer.
     * @returns {{type: "noop"} | {type: "question"} | {type: "completed", next: string|null, courseDone: boolean}}
     */
    advance() {
      if (!passedThis) return { type: "noop" };
      if (question < quizOf(current).length - 1) { question += 1; passedThis = false; return { type: "question" }; }
      progress.markCompleted(trackId, current);
      const next = this.nextId();
      if (next) this.open(next);
      return { type: "completed", next, courseDone: !next };
    },
  };
}
