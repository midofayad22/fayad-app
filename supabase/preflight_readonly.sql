-- READ-ONLY inspection queries. Run in the Supabase SQL editor of the project that will receive the migration and
-- share the RESULTS (structure only, no row data). Nothing here changes anything.

-- 1. Tables in the public schema and whether RLS is enabled
select c.relname as table_name, c.relrowsecurity as rls_enabled, c.relforcerowsecurity as rls_forced
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind in ('r', 'p') order by 1;

-- 2. Columns
select table_name, column_name, data_type, is_nullable, column_default
from information_schema.columns where table_schema = 'public' order by table_name, ordinal_position;

-- 3. Policies
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies where schemaname = 'public' order by tablename, policyname;

-- 4. Grants to the API roles
select table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public' and grantee in ('anon', 'authenticated') order by table_name, grantee, privilege_type;

-- 5. Triggers on auth.users (an existing profile trigger would conflict with 0001)
select tgname, pg_get_triggerdef(t.oid) from pg_trigger t where tgrelid = 'auth.users'::regclass and not tgisinternal;
