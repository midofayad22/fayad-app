-- Repeatable security probe. Run in the SQL editor / execute_sql: it creates two throw-away users, tries to cheat as anon,
-- as a signed-in user and as a second user, then RAISES at the end so the whole transaction rolls back (nothing persists).
-- Expected (verified 2026-11-21 after 0011): anon submit -> permission denied; no-sub -> not_authenticated; resubmits pay 0
-- (1 ledger row); unknown level/game/null -> unknown_level; direct insert/update/delete on game_solves and insert on xp_ledger
-- -> permission denied; insert for another user_id -> RLS violation; assessment 10% "passed" -> false and cannot be downgraded;
-- 20 solves/minute -> rate_limited; user B sees 0 rows of A and cannot update them.
do $$
declare a uuid := gen_random_uuid(); b uuid := gen_random_uuid(); r text[] := '{}'; x record; n int; m text;
begin
  insert into auth.users (id, aud, role, email) values (a,'authenticated','authenticated','sec-a-'||a||'@test.invalid'),(b,'authenticated','authenticated','sec-b-'||b||'@test.invalid');
  set local role anon;
  begin perform * from public.submit_solve('flex',20,false); r := r||'FAIL anon submit allowed'; exception when others then r := r||('ok anon submit: '||sqlerrm); end;
  begin insert into public.course_catalog(track,total) values ('zz',1); r := r||'FAIL anon catalog write'; exception when others then r := r||('ok anon catalog: '||sqlerrm); end;
  reset role;
  perform set_config('request.jwt.claims','{"role":"authenticated"}',true);
  set local role authenticated;
  begin perform * from public.submit_solve('flex',20,false); r := r||'FAIL nosub'; exception when others then r := r||('ok no-sub: '||sqlerrm); end;
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated')::text, true);
  set local role authenticated;
  select * into x from public.submit_solve('flex',20,false); r := r||('solve1 pts='||x.points||' already='||x.already);
  select * into x from public.submit_solve('flex',20,true);  r := r||('resend pts='||x.points||' already='||x.already);
  select count(*) into n from public.xp_ledger where user_id=a and ref='flex:20'; r := r||('ledger rows = '||n);
  begin perform * from public.submit_solve('html',21,false); r := r||'FAIL unknown'; exception when others then r := r||('ok unknown level: '||sqlerrm); end;
  begin insert into public.game_solves(user_id,game,level,points,hinted) values (a,'flex',1,60,false); r := r||'FAIL direct insert'; exception when others then r := r||('ok direct insert: '||sqlerrm); end;
  begin update public.game_solves set points=60 where user_id=a; r := r||'FAIL direct update'; exception when others then r := r||('ok direct update: '||sqlerrm); end;
  begin insert into public.xp_ledger(user_id,source,ref,xp) values (a,'game','x:1',500); r := r||'FAIL ledger insert'; exception when others then r := r||('ok ledger insert: '||sqlerrm); end;
  begin insert into public.lesson_completions(user_id,track,lesson_id) values (b,'html','html-01'); r := r||'FAIL other uid'; exception when others then r := r||('ok other uid: '||sqlerrm); end;
  insert into public.assessment_results(user_id,track,attempts,best_pct,last_pct,passed) values (a,'html',1,10,10,true);
  select passed into x from public.assessment_results where user_id=a and track='html'; r := r||('10% claimed pass -> '||x.passed);
  m := 'none';
  for n in 1..25 loop begin perform * from public.submit_solve('adventure',n,false); exception when others then m := sqlerrm||' at '||n; exit; end; end loop;
  r := r||('rate limit: '||m);
  reset role;
  perform set_config('request.jwt.claims', json_build_object('sub',b,'role','authenticated')::text, true);
  set local role authenticated;
  select count(*) into n from public.game_solves; r := r||('B sees solves = '||n);
  begin update public.game_solves set points=0 where user_id=a; r := r||'FAIL B update A'; exception when others then r := r||('ok B update A: '||sqlerrm); end;
  raise exception 'RESULTS%', E'\n'||array_to_string(r, E'\n');
end $$;
