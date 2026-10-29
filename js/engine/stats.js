/*
  Learning statistics, points and achievements: pure functions over a `fayad-progress-v1` snapshot.

  Everything here is DERIVED from what the learner actually did (completed lessons, remembered quiz answers,
  recorded attempts, final-assessment results). Nothing is invented: a brand-new learner sees zeros.

  Points (documented in docs/progress-dashboard.md):
    10 per completed lesson  +  2 per distinct quiz question answered correctly  +  50 per fully completed track
    +  25 per passed final assessment
*/

export const POINTS = { lesson: 10, correctAnswer: 2, trackComplete: 50, assessmentPassed: 25 };

/** @param {object} snapshot progress.snapshot()  @param {{id:string,total:number}[]} tracks catalog entries */
export function computeStats(snapshot, tracks) {
  const perTrack = tracks.map((meta) => {
    const t = snapshot?.tracks?.[meta.id] || {};
    const completed = Array.isArray(t.completed) ? Math.min(t.completed.length, meta.total) : 0;
    const quizEntries = Object.values(t.quiz || {});
    const quizAttempts = quizEntries.reduce((n, q) => n + (q.attempts || 0), 0);
    const quizCorrect = quizEntries.reduce((n, q) => n + (q.passed?.length || 0), 0);
    return {
      id: meta.id,
      total: meta.total,
      completed,
      percent: meta.total ? Math.round((completed / meta.total) * 100) : 0,
      started: completed > 0 || !!t.current || quizAttempts > 0,
      done: meta.total > 0 && completed >= meta.total,
      current: t.current || null,
      quizLessons: quizEntries.length,
      quizAttempts,
      quizCorrect,
      assessment: t.assessment || null,
      updatedAt: t.updatedAt || 0,
    };
  });

  const sum = (k) => perTrack.reduce((n, t) => n + t[k], 0);
  const lessons = sum("total");
  const completed = sum("completed");
  const quizAttempts = sum("quizAttempts");
  const quizCorrect = sum("quizCorrect");
  const assessmentsPassed = perTrack.filter((t) => t.assessment?.passed).length;
  const tracksDone = perTrack.filter((t) => t.done).length;

  const breakdown = {
    lessons: completed * POINTS.lesson,
    answers: quizCorrect * POINTS.correctAnswer,
    tracks: tracksDone * POINTS.trackComplete,
    assessments: assessmentsPassed * POINTS.assessmentPassed,
  };
  const points = breakdown.lessons + breakdown.answers + breakdown.tracks + breakdown.assessments;

  const ladder = [
    ["first-lesson", "lessons", 1],
    ["ten-lessons", "lessons", 10],
    ["fifty-lessons", "lessons", 50],
    ["hundred-lessons", "lessons", 100],
    ["first-track", "tracks", 1],
    ["three-tracks", "tracks", 3],
    ["quiz-25", "answers", 25],
    ["quiz-100", "answers", 100],
    ["assessment", "assessments", 1],
  ];
  const value = { lessons: completed, tracks: tracksDone, answers: quizCorrect, assessments: assessmentsPassed };
  const achievements = ladder.map(([id, metric, target]) => ({ id, metric, target, progress: Math.min(value[metric], target), earned: value[metric] >= target }));

  const last = Math.max(0, ...perTrack.map((t) => t.updatedAt));
  return {
    perTrack,
    totals: {
      tracks: tracks.length, lessons, completed,
      percent: lessons ? Math.round((completed / lessons) * 100) : 0,
      tracksStarted: perTrack.filter((t) => t.started).length, tracksDone,
      quizAttempts, quizCorrect,
      accuracy: quizAttempts ? Math.round((quizCorrect / quizAttempts) * 100) : null,
      assessmentsPassed,
    },
    points, pointsBreakdown: breakdown, achievements, lastActivityAt: last || null,
  };
}
