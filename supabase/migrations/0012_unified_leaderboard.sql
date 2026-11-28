-- Migration 0012: ONE all-time leaderboard over the XP ledger, so games, lessons, final assessments and finished tracks all rank together.
-- Additive: new function only. get_leaderboard / get_leaderboard_v2 / get_weekly_leaderboard and every table stay untouched (clients fall back to v2 until this is applied).
-- Honours profiles.show_on_leaderboard (a user who opted out is hidden from others but always sees themself). Never returns ids or emails.
create or replace function public.get_leaderboard_v3(max_rows integer default 10)
returns table (rank bigint, display_name text, points bigint, solved bigint, avatar_url text, is_me boolean)
language sql stable security definer set search_path = '' as $$
  with t as (
    select l.user_id,
           coalesce(nullif(trim(p.display_name), ''), 'Learner') as name,
           sum(l.xp)::bigint as pts,
           count(*)::bigint as n,
           case when p.avatar_public or l.user_id = (select auth.uid()) then p.avatar_url else null end as av
    from public.xp_ledger l
    join public.profiles p on p.id = l.user_id
    where p.show_on_leaderboard or l.user_id = (select auth.uid())
    group by l.user_id, p.display_name, p.avatar_url, p.avatar_public
  )
  select rank() over (order by pts desc, n desc), name, pts, n, av, coalesce(user_id = (select auth.uid()), false)
  from t
  order by pts desc, n desc, name, user_id
  limit greatest(1, least(coalesce(max_rows, 10), 100));
$$;
revoke all on function public.get_leaderboard_v3(integer) from public;
grant execute on function public.get_leaderboard_v3(integer) to anon, authenticated;
