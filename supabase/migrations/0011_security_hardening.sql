-- 0011 Security hardening (additive; no rows deleted or reset).
-- 1) game_levels: register every level the client now ships (submit_solve refuses unlisted levels, so these never scored).
insert into public.game_levels (game, level, base)
select 'flex', n, 12 from generate_series(11, 24) n on conflict (game, level) do nothing;
insert into public.game_levels (game, level, base)
select 'sel', n, 12 from generate_series(11, 24) n on conflict (game, level) do nothing;
insert into public.game_levels (game, level, base)
select g, n, 30 from unnest(array['html','css','js']) g, generate_series(11, 20) n on conflict (game, level) do nothing;

-- 2) Table privileges: nobody needs TRUNCATE/TRIGGER/REFERENCES through the API; anon never writes; server-owned tables are read-only for users.
revoke truncate, trigger, references on all tables in schema public from anon, authenticated;
revoke insert, update, delete on all tables in schema public from anon;
revoke insert, update, delete on public.course_catalog, public.game_levels, public.game_solves, public.xp_ledger, public.hearts, public.announcements from authenticated;
revoke all on public.user_progress from anon, authenticated;   -- unused legacy table (RLS on, no policies)

-- 3) submit_solve: per-user serialisation, race-proof idempotence (points only when a row was really inserted).
create or replace function public.submit_solve(p_game text, p_level integer, p_hinted boolean default false)
returns table(points integer, already boolean)
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); b smallint; pts integer; n integer;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  if p_game is null or p_level is null then raise exception 'unknown_level' using errcode = '22023'; end if;
  perform pg_advisory_xact_lock(hashtextextended('solve:' || uid::text, 0));
  select gl.base into b from public.game_levels gl where gl.game = p_game and gl.level = p_level;
  if b is null then raise exception 'unknown_level' using errcode = '22023'; end if;
  if exists (select 1 from public.game_solves s where s.user_id = uid and s.game = p_game and s.level = p_level) then
    return query select 0, true; return;
  end if;
  if (select count(*) from public.game_solves s where s.user_id = uid and s.solved_at > now() - interval '1 minute') >= 20
     or (select count(*) from public.game_solves s where s.user_id = uid and s.solved_at > now() - interval '1 day') >= 300 then
    raise exception 'rate_limited' using errcode = '53400';
  end if;
  pts := b + case when coalesce(p_hinted, false) then 0 else 5 end;
  insert into public.game_solves (user_id, game, level, points, hinted) values (uid, p_game, p_level, pts, coalesce(p_hinted, false)) on conflict do nothing;
  get diagnostics n = row_count;
  if n = 0 then return query select 0, true; return; end if;
  insert into public.xp_ledger (user_id, source, ref, xp) values (uid, 'game', p_game || ':' || p_level, least(pts, 500)) on conflict do nothing;
  return query select pts, false;
end $$;
revoke all on function public.submit_solve(text, integer, boolean) from public, anon;
grant execute on function public.submit_solve(text, integer, boolean) to authenticated;

-- 4) assessment_results: a claimed pass needs a plausible score (>=50%), and results can only improve (never downgrade a pass).
create or replace function public.trg_assessment_integrity() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.passed and new.best_pct < 50 then new.passed := false; end if;
  if tg_op = 'UPDATE' then
    if old.passed then new.passed := true; end if;
    if new.best_pct < old.best_pct then new.best_pct := old.best_pct; end if;
    if new.attempts < old.attempts then new.attempts := old.attempts; end if;
  end if;
  return new;
end $$;
drop trigger if exists assessment_integrity on public.assessment_results;
create trigger assessment_integrity before insert or update on public.assessment_results for each row execute function public.trg_assessment_integrity();
