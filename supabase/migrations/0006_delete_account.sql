-- Migration 0006 (owner-approved, additive): lets a signed-in user delete THEIR OWN account.
-- Every user table references auth.users ON DELETE CASCADE, so profile, progress, game, preference and notification rows go with it.
-- Avatar files are removed by the app through the Storage API first (direct SQL deletes on storage tables are blocked by Supabase).
-- The caller must pass the exact confirmation phrase; anonymous callers cannot execute it.
create or replace function public.delete_my_account(p_confirm text)
returns void language plpgsql security definer set search_path = public, auth as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  if p_confirm is distinct from 'DELETE MY ACCOUNT' then raise exception 'confirmation_required' using errcode = '22023'; end if;
  delete from auth.users where id = uid;
end $$;
revoke all on function public.delete_my_account(text) from public, anon;
grant execute on function public.delete_my_account(text) to authenticated;
