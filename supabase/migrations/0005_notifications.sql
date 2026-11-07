-- Migration 0005 (owner-approved, additive only): in-app notifications.
-- Notifications are created ONLY by the database (triggers on real events + refresh_notifications()), never inserted by clients.
-- Text is not stored: each row has a `kind` + small `params` object and the app renders it in the user's language.
-- No push/email delivery exists; these are in-app notifications shown when the user opens the platform.

create table if not exists public.course_catalog (
  track text primary key check (track ~ '^[a-z]{2,10}$'),
  total smallint not null check (total > 0)
);
alter table public.course_catalog enable row level security;
grant select on public.course_catalog to authenticated;
create policy "catalog: read" on public.course_catalog for select to authenticated using (true);
insert into public.course_catalog (track, total) values
  ('com',20),('prg',20),('html',30),('css',30),('js',25),('react',30),('vue',22),('angular',32),('ajs',22),('bs',20),('tw',20)
on conflict (track) do nothing;

create table if not exists public.notification_prefs (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  reminder     boolean not null default true,
  incomplete   boolean not null default true,
  points       boolean not null default true,
  achievement  boolean not null default true,
  completion   boolean not null default true,
  milestone    boolean not null default true,
  announcement boolean not null default true,
  updated_at   timestamptz not null default now()
);
alter table public.notification_prefs enable row level security;
revoke all on public.notification_prefs from anon;
grant select, insert, update on public.notification_prefs to authenticated;
create policy "nprefs: read own"   on public.notification_prefs for select to authenticated using (user_id = (select auth.uid()));
create policy "nprefs: insert own" on public.notification_prefs for insert to authenticated with check (user_id = (select auth.uid()));
create policy "nprefs: update own" on public.notification_prefs for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  category   text not null check (category in ('reminder','incomplete','points','achievement','completion','milestone','announcement')),
  kind       text not null check (kind ~ '^[a-z_]{2,40}$'),
  params     jsonb not null default '{}'::jsonb check (jsonb_typeof(params) = 'object' and pg_column_size(params) <= 1024),
  dedupe_key text check (char_length(dedupe_key) <= 80),
  created_at timestamptz not null default now(),
  read_at    timestamptz
);
create unique index if not exists notifications_dedupe_uq on public.notifications (user_id, dedupe_key) where dedupe_key is not null;
create index if not exists notifications_user_created_idx on public.notifications (user_id, created_at desc);
create index if not exists notifications_user_unread_idx on public.notifications (user_id) where read_at is null;
alter table public.notifications enable row level security;
revoke all on public.notifications from anon, authenticated;
grant select, delete on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
create policy "notif: read own"   on public.notifications for select to authenticated using (user_id = (select auth.uid()));
create policy "notif: update own" on public.notifications for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "notif: delete own" on public.notifications for delete to authenticated using (user_id = (select auth.uid()));

-- Platform announcements: written by the owner in the dashboard (SQL editor); readable by signed-in users only.
create table if not exists public.announcements (
  id           uuid primary key default gen_random_uuid(),
  title_ar     text not null check (char_length(title_ar) <= 120),
  title_en     text not null check (char_length(title_en) <= 120),
  body_ar      text not null check (char_length(body_ar) <= 400),
  body_en      text not null check (char_length(body_en) <= 400),
  url          text check (url ~ '^/[A-Za-z0-9_./?=&#-]*$'),
  active       boolean not null default true,
  published_at timestamptz not null default now()
);
alter table public.announcements enable row level security;
revoke all on public.announcements from anon, authenticated;
grant select on public.announcements to authenticated;
create policy "announcements: read active" on public.announcements for select to authenticated using (active);

-- Internal: create one notification if the user's preference allows it; duplicates are ignored via dedupe_key.
create or replace function public._notify(p_user uuid, p_cat text, p_kind text, p_params jsonb, p_dedupe text)
returns void language plpgsql security definer set search_path = public as $$
declare allowed boolean;
begin
  select coalesce((to_jsonb(p) ->> p_cat)::boolean, true) into allowed from public.notification_prefs p where p.user_id = p_user;
  if coalesce(allowed, true) is false then return; end if;
  insert into public.notifications (user_id, category, kind, params, dedupe_key)
  values (p_user, p_cat, p_kind, coalesce(p_params, '{}'::jsonb), p_dedupe)
  on conflict (user_id, dedupe_key) where dedupe_key is not null do nothing;
end $$;
revoke all on function public._notify(uuid, text, text, jsonb, text) from public, anon, authenticated;

-- Event: a lesson was completed -> first lesson, milestones (10/25/50/100/150 lessons), course completed.
create or replace function public.trg_lesson_notify() returns trigger language plpgsql security definer set search_path = public as $$
declare total_n int; track_n int; track_total int;
begin
  select count(*) into total_n from public.lesson_completions where user_id = new.user_id;
  if total_n = 1 then perform public._notify(new.user_id, 'achievement', 'first_lesson', '{}', 'ach:first_lesson'); end if;
  if total_n in (10, 25, 50, 100, 150) then perform public._notify(new.user_id, 'milestone', 'lessons_total', jsonb_build_object('count', total_n), 'ms:lessons:' || total_n); end if;
  select count(*) into track_n from public.lesson_completions where user_id = new.user_id and track = new.track;
  select total into track_total from public.course_catalog where track = new.track;
  if track_total is not null and track_n = track_total then perform public._notify(new.user_id, 'completion', 'course_complete', jsonb_build_object('track', new.track), 'done:' || new.track); end if;
  return null;
end $$;
revoke all on function public.trg_lesson_notify() from public, anon, authenticated;
drop trigger if exists lesson_notify on public.lesson_completions;
create trigger lesson_notify after insert on public.lesson_completions for each row execute function public.trg_lesson_notify();

-- Event: a game level was solved -> first solve, point thresholds crossed.
create or replace function public.trg_solve_notify() returns trigger language plpgsql security definer set search_path = public as $$
declare after_pts int; before_pts int; t int; solves int;
begin
  select coalesce(sum(points), 0), count(*) into after_pts, solves from public.game_solves where user_id = new.user_id;
  before_pts := after_pts - new.points;
  if solves = 1 then perform public._notify(new.user_id, 'achievement', 'first_solve', '{}', 'ach:first_solve'); end if;
  foreach t in array array[100, 250, 500, 1000, 2500, 5000] loop
    if before_pts < t and after_pts >= t then perform public._notify(new.user_id, 'points', 'points_total', jsonb_build_object('points', t), 'pts:' || t); end if;
  end loop;
  return null;
end $$;
revoke all on function public.trg_solve_notify() from public, anon, authenticated;
drop trigger if exists solve_notify on public.game_solves;
create trigger solve_notify after insert on public.game_solves for each row execute function public.trg_solve_notify();

-- Called by the app when it opens: platform announcements, inactivity reminder (once per week), unfinished-course nudge (once per month per course).
create or replace function public.refresh_notifications() returns integer language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); last_act timestamptz; r record; before_n int; after_n int; created timestamptz;
begin
  if uid is null then return 0; end if;
  select count(*) into before_n from public.notifications where user_id = uid;
  select created_at into created from auth.users where id = uid;

  for r in select id, published_at from public.announcements where active and published_at >= coalesce(created, now()) - interval '1 day' and published_at > now() - interval '60 days' loop
    perform public._notify(uid, 'announcement', 'announcement', jsonb_build_object('id', r.id), 'ann:' || r.id);
  end loop;

  select greatest((select max(completed_at) from public.lesson_completions where user_id = uid), (select max(solved_at) from public.game_solves where user_id = uid)) into last_act;
  if last_act is not null and last_act <= now() - interval '3 days' then
    perform public._notify(uid, 'reminder', 'inactive', jsonb_build_object('days', extract(day from now() - last_act)::int), 'rem:' || to_char(now(), 'IYYY-IW'));
  end if;

  select lc.track, count(*) as done, max(lc.completed_at) as last_at, cc.total into r
    from public.lesson_completions lc join public.course_catalog cc on cc.track = lc.track
    where lc.user_id = uid group by lc.track, cc.total
    having count(*) < cc.total and max(lc.completed_at) <= now() - interval '7 days'
    order by max(lc.completed_at) desc limit 1;
  if r.track is not null then
    perform public._notify(uid, 'incomplete', 'unfinished_course', jsonb_build_object('track', r.track, 'done', r.done, 'total', r.total), 'inc:' || r.track || ':' || to_char(now(), 'YYYY-MM'));
  end if;

  select count(*) into after_n from public.notifications where user_id = uid;
  return after_n - before_n;
end $$;
revoke all on function public.refresh_notifications() from public, anon;
grant execute on function public.refresh_notifications() to authenticated;
