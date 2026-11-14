-- FAYAD Grand Adventure: 120 levels, 6 worlds x 20. Base points rise per world (10..20), same rule as the other games.
-- Levels are fixed server-side; submit_solve() refuses any level not listed here.
insert into public.game_levels (game, level, base)
select 'adventure', n, 8 + 2 * (((n - 1) / 20) + 1)
from generate_series(1, 120) as n
on conflict (game, level) do nothing;
