/*
  Account synchronisation of learning progress (Supabase), DISABLED BY DEFAULT.

  Nothing here talks to a database unless a caller passes `enabled: true` AND a client. The pages do not enable it
  until the schema in supabase/migrations/0001_learning_progress.sql has been reviewed and applied by the project owner
  (docs/supabase-sync.md). Local progress is always the source of truth for the UI; sync is additive:

    pull:  download this user's rows, union-merge them into the local record (progress.mergeSnapshot)
    push:  upload only what the server lacks (new completions, higher quiz/assessment results)

  It never deletes remote rows, never lowers a remote value and never overwrites local data. Every failure resolves to a
  { ok:false } result so the app keeps working offline.
*/

const TABLES = { completions: "lesson_completions", quiz: "quiz_results", assessments: "assessment_results" };

/** Rows (as returned by Supabase for ONE user) -> a v1 document fragment. */
export function rowsToSnapshot({ completions = [], quiz = [], assessments = [] }) {
  const doc = { v: 1, tracks: {}, imported: {} };
  const t = (id) => (doc.tracks[id] ||= { completed: [], current: null, quiz: {}, updatedAt: 0 });
  for (const r of completions) t(r.track).completed.push(r.lesson_id);
  for (const r of quiz) t(r.track).quiz[r.lesson_id] = { passed: (r.passed || []).map(Number), attempts: r.attempts | 0, lastAt: Date.parse(r.last_at) || 0 };
  for (const r of assessments) t(r.track).assessment = { attempts: r.attempts | 0, bestPct: r.best_pct | 0, lastPct: r.last_pct | 0, passed: !!r.passed, lastAt: Date.parse(r.last_at) || 0 };
  return doc;
}

/** Local snapshot + rows already on the server -> the rows that must be written (additive only). */
export function diffForUpload(snapshot, userId, remote) {
  const have = rowsToSnapshot(remote);
  const out = { completions: [], quiz: [], assessments: [] };
  for (const [track, t] of Object.entries(snapshot.tracks || {})) {
    const r = have.tracks[track] || { completed: [], quiz: {} };
    for (const id of t.completed || []) if (!r.completed.includes(id)) out.completions.push({ user_id: userId, track, lesson_id: id });
    for (const [lesson, q] of Object.entries(t.quiz || {})) {
      const rq = r.quiz[lesson];
      const merged = [...new Set([...(rq?.passed || []), ...q.passed])].sort((a, b) => a - b);
      const attempts = Math.max(rq?.attempts || 0, q.attempts);
      if (!rq || merged.length !== rq.passed.length || attempts > rq.attempts) {
        out.quiz.push({ user_id: userId, track, lesson_id: lesson, passed: merged, attempts, last_at: new Date(Math.max(q.lastAt || 0, rq?.lastAt || 0) || Date.now()).toISOString() });
      }
    }
    const a = t.assessment, ra = r.assessment;
    if (a && (!ra || a.bestPct > ra.bestPct || a.attempts > ra.attempts || (a.passed && !ra.passed))) {
      out.assessments.push({ user_id: userId, track, attempts: Math.max(a.attempts, ra?.attempts || 0), best_pct: Math.max(a.bestPct, ra?.bestPct || 0), last_pct: a.lastPct, passed: a.passed || !!ra?.passed, last_at: new Date(a.lastAt || Date.now()).toISOString() });
    }
  }
  return out;
}

/**
 * @param {{client: object, progress: object, enabled?: boolean}} opts  client = supabase-js client
 */
export function createSync({ client, progress, enabled = false }) {
  async function userId() {
    const { data, error } = await client.auth.getUser();
    if (error || !data?.user) return null;
    return data.user.id;
  }

  async function fetchRemote(uid) {
    const out = {};
    for (const [key, table] of Object.entries(TABLES)) {
      const { data, error } = await client.from(table).select("*").eq("user_id", uid);
      if (error) throw error;
      out[key] = data || [];
    }
    return out;
  }

  return {
    enabled,
    /** pull -> merge -> push. Safe to call repeatedly (idempotent). */
    async sync() {
      if (!enabled || !client) return { ok: false, reason: "disabled" };
      try {
        const uid = await userId();
        if (!uid) return { ok: false, reason: "signed-out" };
        const remote = await fetchRemote(uid);
        const merged = progress.mergeSnapshot(rowsToSnapshot(remote));
        const rows = diffForUpload(progress.snapshot(), uid, remote);
        for (const [key, table] of Object.entries(TABLES)) {
          if (!rows[key].length) continue;
          const conflict = key === "completions" || key === "quiz" ? "user_id,track,lesson_id" : "user_id,track";
          const { error } = await client.from(table).upsert(rows[key], { onConflict: conflict, ignoreDuplicates: key === "completions" });
          if (error) throw error;
        }
        return { ok: true, mergedLocal: merged, uploaded: { completions: rows.completions.length, quiz: rows.quiz.length, assessments: rows.assessments.length } };
      } catch (e) {
        return { ok: false, reason: "error", message: String(e?.message || e) };
      }
    },
  };
}
