-- Zombie Survival: 15 levels, base points 11..25 (10 + level). Fixed server-side; submit_solve() refuses unlisted levels.
insert into public.game_levels (game, level, base)
select 'zombie', n, 10 + n from generate_series(1, 15) as n
on conflict (game, level) do nothing;
