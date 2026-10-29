-- DRAFT migration 0001: profiles + synchronized learning progress.
-- STATUS: NOT APPLIED anywhere. Review, run supabase/preflight_readonly.sql first, apply to a development project only.
-- Idempotent where practical (IF NOT EXISTS); it never drops or rewrites existing objects.
-- Design: every table is owned by auth.users, RLS is on, only the `authenticated` role can touch rows, and a user can only
-- see/change their own rows. Points are NOT stored (derived from these rows by the app), so they cannot be forged here.

create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 80),
  avatar_url   text check (char_length(avatar_url) <= 500),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.lesson_completions (
  user_id      uuid not null references auth.users (id) on delete cascade,
  track        text not null check (track ~ '^[a-z]{2,10}$'),
  lesson_id    text not null check (lesson_id ~ '^[a-z]{2,10}-[0-9]{2,3}$'),
  completed_at timestamptz not null default now(),
  primary key (user_id, track, lesson_id),
  check (lesson_id like track || '-%')
);

create table if not exists public.quiz_results (
  user_id   uuid not null references auth.users (id) on delete cascade,
  track     text not null check (track ~ '^[a-z]{2,10}$'),
  lesson_id text not null check (lesson_id ~ '^[a-z]{2,10}-[0-9]{2,3}$'),
  passed    smallint[] not null default '{}' check (cardinality(passed) <= 50),
  attempts  integer not null default 0 check (attempts >= 0),
  last_at   timestamptz not null default now(),
  primary key (user_id, track, lesson_id),
  check (lesson_id like track || '-%')
);

create table if not exists public.assessment_results (
  user_id  uuid not null references auth.users (id) on delete cascade,
  track    text not null check (track ~ '^[a-z]{2,10}$'),
  attempts integer not null default 0 check (attempts >= 0),
  best_pct smallint not null default 0 check (best_pct between 0 and 100),
  last_pct smallint not null default 0 check (last_pct between 0 and 100),
  passed   boolean not null default false,
  last_at  timestamptz not null default now(),
  primary key (user_id, track)
);

alter table public.profiles            enable row level security;
alter table public.lesson_completions  enable row level security;
alter table public.quiz_results        enable row level security;
alter table public.assessment_results  enable row level security;

-- no access for anonymous visitors
revoke all on public.profiles, public.lesson_completions, public.quiz_results, public.assessment_results from anon;
grant select, insert, update on public.profiles           to authenticated;
grant select, insert, update, delete on public.lesson_completions to authenticated;
grant select, insert, update on public.quiz_results       to authenticated;
grant select, insert, update on public.assessment_results to authenticated;

-- own-rows-only policies ((select auth.uid()) is evaluated once per statement)
create policy "profiles: read own"   on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "profiles: insert own" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles: update own" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "completions: read own"   on public.lesson_completions for select to authenticated using (user_id = (select auth.uid()));
create policy "completions: insert own" on public.lesson_completions for insert to authenticated with check (user_id = (select auth.uid()));
create policy "completions: delete own" on public.lesson_completions for delete to authenticated using (user_id = (select auth.uid()));

create policy "quiz: read own"   on public.quiz_results for select to authenticated using (user_id = (select auth.uid()));
create policy "quiz: insert own" on public.quiz_results for insert to authenticated with check (user_id = (select auth.uid()));
create policy "quiz: update own" on public.quiz_results for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy "assessment: read own"   on public.assessment_results for select to authenticated using (user_id = (select auth.uid()));
create policy "assessment: insert own" on public.assessment_results for insert to authenticated with check (user_id = (select auth.uid()));
create policy "assessment: update own" on public.assessment_results for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- profile row created automatically on sign-up (skipped if preflight shows an existing trigger on auth.users)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'), new.raw_user_meta_data ->> 'avatar_url')
  on conflict (id) do nothing;
  return new;
end $$;
revoke all on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- rollback (manual, destructive, only if this migration was applied to a dev project):
--   drop trigger if exists on_auth_user_created on auth.users; drop function if exists public.handle_new_user();
--   drop table if exists public.assessment_results, public.quiz_results, public.lesson_completions, public.profiles;
