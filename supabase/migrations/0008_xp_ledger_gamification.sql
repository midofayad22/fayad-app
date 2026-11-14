-- 0008: server-authoritative XP ledger, hearts, streaks, weekly leaderboard.
-- Additive. Nothing here can be written by the browser directly: the ledger and hearts tables have no
-- INSERT/UPDATE/DELETE policies and no table grants for anon/authenticated; every write goes through the
-- SECURITY DEFINER functions below, which derive XP from rows the server already holds (never from a client-sent number).

-- the server catalog was behind the curriculum (com 20 -> 30, prg 20 -> 31 lessons); XP validation and track completion use it
update public.course_catalog set total = 30 where track = 'com' and total <> 30;
update public.course_catalog set total = 31 where track = 'prg' and total <> 31;

alter table public.profiles add column if not exists show_on_leaderboard boolean not null default true;

create table if not exists public.xp_ledger (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  source     text not null check (source in ('lesson','assessment','track','game')),
  ref        text not null,
  xp         integer not null check (xp between 1 and 500),
  created_at timestamptz not null default now(),
  unique (user_id, source, ref)            -- idempotent: one reward per (user, source, ref), ever
);
create index if not exists xp_ledger_user_time on public.xp_ledger (user_id, created_at desc);
create index if not exists xp_ledger_time on public.xp_ledger (created_at desc);
alter table public.xp_ledger enable row level security;
create policy "xp: read own" on public.xp_ledger for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.xp_ledger from anon, authenticated;
grant select on public.xp_ledger to authenticated;

create table if not exists public.hearts (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  hearts     smallint not null default 5 check (hearts between 0 and 5),
  updated_at timestamptz not null default now()
);
alter table public.hearts enable row level security;
create policy "hearts: read own" on public.hearts for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.hearts from anon, authenticated;
grant select on public.hearts to authenticated;

-- XP values (kept in one place so they can be tuned without touching the client)
create or replace function public.xp_value(p_source text) returns integer language sql immutable set search_path = '' as $$
  select case p_source when 'lesson' then 20 when 'assessment' then 100 when 'track' then 150 else 0 end;
$$;

-- Idempotent: claims XP for everything the signed-in user has genuinely recorded. Safe to call after any completion.
create or replace function public.sync_my_xp()
returns table (new_xp integer, total_xp bigint)
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); gained integer := 0; n integer;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  -- lessons: only ids that exist in the catalog (<track>-<NN>, NN between 1 and total)
  insert into public.xp_ledger (user_id, source, ref, xp)
  select uid, 'lesson', lc.track || ':' || lc.lesson_id, public.xp_value('lesson')
  from public.lesson_completions lc
  join public.course_catalog cc on cc.track = lc.track
  where lc.user_id = uid
    and lc.lesson_id ~ ('^' || lc.track || '-[0-9]{1,3}$')
    and substring(lc.lesson_id from '[0-9]+$')::int between 1 and cc.total
  on conflict do nothing;
  get diagnostics n = row_count; gained := gained + n * public.xp_value('lesson');
  -- passed final assessment, once per track
  insert into public.xp_ledger (user_id, source, ref, xp)
  select uid, 'assessment', ar.track, public.xp_value('assessment')
  from public.assessment_results ar join public.course_catalog cc on cc.track = ar.track
  where ar.user_id = uid and ar.passed
  on conflict do nothing;
  get diagnostics n = row_count; gained := gained + n * public.xp_value('assessment');
  -- completed track (every catalog lesson recorded)
  insert into public.xp_ledger (user_id, source, ref, xp)
  select uid, 'track', cc.track, public.xp_value('track')
  from public.course_catalog cc
  where (select count(distinct lc.lesson_id) from public.lesson_completions lc
         where lc.user_id = uid and lc.track = cc.track
           and lc.lesson_id ~ ('^' || cc.track || '-[0-9]{1,3}$')
           and substring(lc.lesson_id from '[0-9]+$')::int between 1 and cc.total) >= cc.total
  on conflict do nothing;
  get diagnostics n = row_count; gained := gained + n * public.xp_value('track');
  return query select gained, coalesce((select sum(x.xp) from public.xp_ledger x where x.user_id = uid), 0)::bigint;
end $$;

-- Game solves feed the same ledger (replaces the body of submit_solve; behaviour and limits are unchanged).
create or replace function public.submit_solve(p_game text, p_level integer, p_hinted boolean default false)
returns table (points integer, already boolean)
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); b smallint; pts integer;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  select gl.base into b from public.game_levels gl where gl.game = p_game and gl.level = p_level;
  if b is null then raise exception 'unknown_level' using errcode = '22023'; end if;
  pts := b + case when coalesce(p_hinted, false) then 0 else 5 end;
  if exists (select 1 from public.game_solves s where s.user_id = uid and s.game = p_game and s.level = p_level) then
    return query select 0, true; return;
  end if;
  if (select count(*) from public.game_solves s where s.user_id = uid and s.solved_at > now() - interval '1 minute') >= 20
     or (select count(*) from public.game_solves s where s.user_id = uid and s.solved_at > now() - interval '1 day') >= 300 then
    raise exception 'rate_limited' using errcode = '53400';
  end if;
  insert into public.game_solves (user_id, game, level, points, hinted) values (uid, p_game, p_level, pts, coalesce(p_hinted, false)) on conflict do nothing;
  insert into public.xp_ledger (user_id, source, ref, xp) values (uid, 'game', p_game || ':' || p_level, least(pts, 500)) on conflict do nothing;
  return query select pts, false;
end $$;

-- Hearts: 5 max, one regenerates every 30 minutes (computed lazily), never below 0.
create or replace function public.hearts_now(p_hearts smallint, p_updated timestamptz) returns smallint language sql stable set search_path = '' as $$
  select least(5, p_hearts + floor(extract(epoch from (now() - p_updated)) / 1800)::int)::smallint;
$$;
create or replace function public.get_hearts() returns table (hearts integer, next_in_seconds integer)
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); h public.hearts; cur smallint;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  insert into public.hearts (user_id) values (uid) on conflict do nothing;
  select * into h from public.hearts where user_id = uid;
  cur := public.hearts_now(h.hearts, h.updated_at);
  return query select cur::int, case when cur >= 5 then 0 else 1800 - (extract(epoch from (now() - h.updated_at))::int % 1800) end;
end $$;
create or replace function public.lose_heart() returns integer
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); h public.hearts; cur smallint;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  insert into public.hearts (user_id) values (uid) on conflict do nothing;
  select * into h from public.hearts where user_id = uid for update;
  cur := public.hearts_now(h.hearts, h.updated_at);
  if cur <= 0 then return 0; end if;
  -- keep the regen phase: only reset the clock when we were full
  update public.hearts set hearts = cur - 1,
     updated_at = case when cur >= 5 then now() else h.updated_at + ((cur - h.hearts) * interval '30 minutes') end
   where user_id = uid;
  return cur - 1;
end $$;

-- One call for the dashboard/profile: XP, level, streak (timezone-aware, a missed day is forgiven until the end of the next day), week XP.
create or replace function public.get_my_gamification(p_tz text default 'UTC')
returns table (xp_total bigint, level integer, xp_in_level integer, xp_for_next integer, streak_days integer, best_streak integer, week_xp bigint, active_today boolean)
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); tz text := p_tz; total bigint; lv integer; today date; run integer := 0; best integer := 0; prev date; d date; alive boolean := false;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  if not exists (select 1 from pg_timezone_names where name = tz) then tz := 'UTC'; end if;
  select coalesce(sum(xp), 0) into total from public.xp_ledger where user_id = uid;
  lv := floor(sqrt(total / 50.0))::int + 1;
  today := (now() at time zone tz)::date;
  for d in
    select distinct (t at time zone tz)::date as dd from (
      select created_at t from public.xp_ledger where user_id = uid
      union all select completed_at from public.lesson_completions where user_id = uid) a order by 1
  loop
    if prev is not null and d = prev + 1 then run := run + 1; else run := 1; end if;
    best := greatest(best, run); prev := d;
  end loop;
  -- streak is alive when the last active day is today or yesterday
  alive := prev is not null and prev >= today - 1;
  return query select total, lv,
    (total - 50 * (lv - 1) * (lv - 1))::int, (50 * lv * lv - 50 * (lv - 1) * (lv - 1))::int,
    case when alive then run else 0 end, best,
    coalesce((select sum(xp) from public.xp_ledger where user_id = uid and created_at >= date_trunc('week', now())), 0)::bigint,
    coalesce(prev = today, false);
end $$;

-- Weekly leaderboard: display name + XP (+ avatar only if the user made it public). Never emails or ids.
create or replace function public.get_weekly_leaderboard(max_rows integer default 10)
returns table (rank bigint, display_name text, xp bigint, avatar_url text, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with t as (
    select l.user_id, sum(l.xp)::bigint as pts,
           coalesce(nullif(trim(p.display_name), ''), 'Learner') as name,
           case when p.avatar_public or l.user_id = (select auth.uid()) then p.avatar_url else null end as av
    from public.xp_ledger l join public.profiles p on p.id = l.user_id
    where l.created_at >= date_trunc('week', now()) and (p.show_on_leaderboard or l.user_id = (select auth.uid()))
    group by l.user_id, p.display_name, p.avatar_url, p.avatar_public
  )
  select rank() over (order by pts desc), name, pts, av, coalesce(user_id = (select auth.uid()), false)
  from t order by pts desc, name, user_id limit greatest(1, least(coalesce(max_rows, 10), 50));
$$;

revoke all on function public.sync_my_xp(), public.get_hearts(), public.lose_heart(), public.get_my_gamification(text), public.get_weekly_leaderboard(integer), public.hearts_now(smallint, timestamptz), public.xp_value(text) from public, anon;
grant execute on function public.sync_my_xp(), public.get_hearts(), public.lose_heart(), public.get_my_gamification(text), public.get_weekly_leaderboard(integer) to authenticated;
revoke all on function public.submit_solve(text, integer, boolean) from public, anon;
grant execute on function public.submit_solve(text, integer, boolean) to authenticated;
