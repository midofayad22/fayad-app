-- Migration 0007 (APPLIED to project vsrysitexadvmmikcmfs on 2026-11-12 as avatar_privacy_0007): avatar privacy + avatar-aware public leaderboard. Additive only; no data is changed or removed.
-- Why a migration is needed: the public leaderboard function can only read what the database stores. Today profiles has no
-- "show my picture to others" flag, and get_leaderboard() returns no avatar. This adds the flag (default TRUE = current behaviour
-- for existing users until they choose otherwise) and a NEW function; the old get_leaderboard() stays untouched as a fallback.

alter table public.profiles add column if not exists avatar_public boolean not null default true;

-- Public read: rank, display name, points, solved, and an avatar URL ONLY when the owner allows it (the caller always sees their own).
-- Never returns ids or emails. Order is deterministic: points desc, solved desc, then name, then id (id is used only to break ties, never returned).
create or replace function public.get_leaderboard_v2(max_rows integer default 10)
returns table (rank bigint, display_name text, points bigint, solved bigint, avatar_url text, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with t as (
    select s.user_id,
           coalesce(nullif(trim(p.display_name), ''), 'Player') as name,
           sum(s.points)::bigint as pts,
           count(*)::bigint as n,
           case when p.avatar_public or s.user_id = (select auth.uid()) then p.avatar_url else null end as av
    from public.game_solves s
    left join public.profiles p on p.id = s.user_id
    group by s.user_id, p.display_name, p.avatar_url, p.avatar_public
  )
  select rank() over (order by pts desc, n desc), name, pts, n, av, coalesce(user_id = (select auth.uid()), false)
  from t
  order by pts desc, n desc, name, user_id
  limit greatest(1, least(coalesce(max_rows, 10), 100));
$$;
revoke all on function public.get_leaderboard_v2(integer) from public;
grant execute on function public.get_leaderboard_v2(integer) to anon, authenticated;

-- Rollback (optional): drop function if exists public.get_leaderboard_v2(integer); alter table public.profiles drop column if exists avatar_public;
