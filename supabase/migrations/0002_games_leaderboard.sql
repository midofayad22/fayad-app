-- Migration 0002: game solves + public leaderboard. Additive only. NOTE: the direct-insert policy created here is removed by 0003 (scores are now submitted via submit_solve).

create table if not exists public.game_solves (
  user_id   uuid not null references auth.users (id) on delete cascade,
  game      text not null check (game ~ '^[a-z0-9-]{2,24}$'),
  level     smallint not null check (level between 1 and 500),
  points    smallint not null check (points between 0 and 60),
  hinted    boolean not null default false,
  solved_at timestamptz not null default now(),
  primary key (user_id, game, level)
);
alter table public.game_solves enable row level security;
revoke all on public.game_solves from anon;
grant select, insert on public.game_solves to authenticated;
create policy "solves: read own"   on public.game_solves for select to authenticated using (user_id = (select auth.uid()));
create policy "solves: insert own" on public.game_solves for insert to authenticated with check (user_id = (select auth.uid()));

-- Leaderboard: exposes ONLY display name + totals (never ids, emails or rows). Anyone may read it.
create or replace function public.get_leaderboard(max_rows integer default 50)
returns table (rank bigint, display_name text, points bigint, solved bigint)
language sql stable security definer set search_path = '' as $$
  select rank() over (order by sum(s.points) desc) as rank,
         coalesce(nullif(trim(p.display_name), ''), 'Player') as display_name,
         sum(s.points)::bigint as points,
         count(*)::bigint as solved
  from public.game_solves s
  left join public.profiles p on p.id = s.user_id
  group by s.user_id, p.display_name
  order by points desc, solved desc
  limit greatest(1, least(coalesce(max_rows, 50), 100));
$$;
revoke all on function public.get_leaderboard(integer) from public;
grant execute on function public.get_leaderboard(integer) to anon, authenticated;
