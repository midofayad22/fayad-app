# Supabase dashboard steps that cannot be done from the repo

Project `vsrysitexadvmmikcmfs` (Fayad Learning Platform).

1. **Authentication → URL Configuration → Redirect URLs**: add `https://fayad-learning.vercel.app/login.html` (password recovery and email confirmation return here). Add `http://localhost:3000/login.html` only if you test locally. Set **Site URL** to `https://fayad-learning.vercel.app`.
2. **Authentication → Providers → Email → Password security**: turn on *Leaked password protection* (the security advisor flags it; may require a paid plan).
3. **Authentication → Providers → Email**: keep *Confirm email* on if you want verified accounts; the Settings pages show the confirmation status.
4. **Platform announcements** (no admin UI): insert rows in SQL Editor, e.g.
   `insert into public.announcements (title_ar,title_en,body_ar,body_en,url) values ('…','…','…','…','/about/about.html');`
   Signed-in users receive it as a notification the next time they open the platform (once, if the "announcement" category is on).
5. Storage bucket `avatars` already exists (migration 0004: public read, owner-only write under `<user id>/`, 2 MB, JPEG/PNG/WebP). Nothing to do.

Migrations applied by this branch: 0004 preferences + avatars, 0005 notifications, 0006 `delete_my_account`. All are additive.
Notifications are in-app only: there is no push or email delivery.
