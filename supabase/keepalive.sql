-- Keep-alive for the "Keep Supabase awake" GitHub workflow.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
--
-- The public anon key can't read RSVPs, so the workflow calls this instead. It
-- updates one timestamp row and returns true; it never touches guest data.

create schema if not exists private;

create table if not exists private.keep_awake (
  id           smallint primary key default 1 check (id = 1),
  last_ping_at timestamptz not null default now()
);

create or replace function public.keep_awake()
returns boolean
language sql
security definer
set search_path = ''
as $$
  insert into private.keep_awake (id, last_ping_at) values (1, pg_catalog.now())
  on conflict (id) do update set last_ping_at = excluded.last_ping_at
  returning true;
$$;

revoke all on function public.keep_awake() from public;
grant execute on function public.keep_awake() to anon;

-- Make the new function visible to the API right away.
notify pgrst, 'reload schema';
