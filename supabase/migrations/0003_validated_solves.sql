-- Migration 0003: server-side validated score submission. Additive; no existing rows are modified (game_solves was empty when applied).
-- Threat model: a client can no longer choose its own points. Points come from a server-side rule table, levels must exist,
-- each (user, game, level) counts once, and submissions are rate limited. What the server still CANNOT verify is that the
-- learner really solved a challenge (it does not re-run their code), so a determined cheater can claim valid levels; the effect
-- is bounded by the total points a legitimate player could earn and by the rate limits below.

create table if not exists public.game_levels (
  game  text not null check (game ~ '^[a-z0-9-]{2,24}$'),
  level smallint not null check (level between 1 and 500),
  base  smallint not null check (base between 1 and 55),
  primary key (game, level)
);
alter table public.game_levels enable row level security;   -- no policies: only the security-definer function reads it
revoke all on public.game_levels from anon, authenticated;

insert into public.game_levels (game, level, base) values
  ('html',1,10),
  ('html',2,10),
  ('html',3,10),
  ('html',4,10),
  ('html',5,15),
  ('html',6,15),
  ('html',7,15),
  ('html',8,20),
  ('html',9,20),
  ('html',10,30),
  ('css',1,10),
  ('css',2,10),
  ('css',3,10),
  ('css',4,10),
  ('css',5,15),
  ('css',6,15),
  ('css',7,20),
  ('css',8,20),
  ('css',9,20),
  ('css',10,30),
  ('js',1,10),
  ('js',2,10),
  ('js',3,10),
  ('js',4,15),
  ('js',5,15),
  ('js',6,15),
  ('js',7,20),
  ('js',8,20),
  ('js',9,30),
  ('js',10,30),
  ('flex',1,10),
  ('flex',2,10),
  ('flex',3,10),
  ('flex',4,10),
  ('flex',5,10),
  ('flex',6,10),
  ('flex',7,10),
  ('flex',8,10),
  ('flex',9,10),
  ('flex',10,10),
  ('sel',1,10),
  ('sel',2,10),
  ('sel',3,10),
  ('sel',4,10),
  ('sel',5,10),
  ('sel',6,10),
  ('sel',7,10),
  ('sel',8,10),
  ('sel',9,10),
  ('sel',10,10)
on conflict (game, level) do update set base = excluded.base;

-- Direct inserts are no longer possible from the browser: everything goes through submit_solve().
drop policy if exists "solves: insert own" on public.game_solves;
revoke insert, update, delete on public.game_solves from authenticated, anon;

create or replace function public.submit_solve(p_game text, p_level integer, p_hinted boolean default false)
returns table (points integer, already boolean)
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
  b smallint;
  pts integer;
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
  insert into public.game_solves (user_id, game, level, points, hinted) values (uid, p_game, p_level, pts, coalesce(p_hinted, false))
  on conflict do nothing;
  return query select pts, false;
end $$;
revoke all on function public.submit_solve(text, integer, boolean) from public, anon;
grant execute on function public.submit_solve(text, integer, boolean) to authenticated;
