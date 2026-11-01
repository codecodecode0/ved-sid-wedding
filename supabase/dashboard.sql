-- Password-protected guest list for the /invitees page.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
--
-- The password is checked inside the database against a bcrypt hash, so it
-- never appears in the website's code. Set or change it with the statement at
-- the bottom (replace CHANGE-ME; don't commit the real password).

create extension if not exists pgcrypto with schema extensions;

-- "private" is not exposed through the Supabase API, so guests can't read these tables.
create schema if not exists private;

create table if not exists private.dashboard_secret (
  id            smallint primary key default 1 check (id = 1),
  password_hash text not null
);

create table if not exists private.dashboard_attempts (
  attempted_at timestamptz not null default now()
);

-- Returns {"rows": [...]} for the right password, otherwise {"error": "..."}.
-- Errors are returned rather than raised so failed attempts are still recorded.
create or replace function public.get_rsvps(p_password text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions, private
as $$
declare
  recent_failures int;
begin
  select count(*) into recent_failures
  from private.dashboard_attempts
  where attempted_at > now() - interval '10 minutes';

  if recent_failures >= 10 then
    return jsonb_build_object('error', 'too_many_attempts');
  end if;

  if not exists (
    select 1 from private.dashboard_secret
    where password_hash = extensions.crypt(p_password, password_hash)
  ) then
    insert into private.dashboard_attempts default values;
    return jsonb_build_object('error', 'wrong_password');
  end if;

  return jsonb_build_object(
    'rows',
    coalesce((select jsonb_agg(to_jsonb(r) order by r.created_at desc) from public.rsvps r where r.deleted_at is null), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.get_rsvps(text) from public;
grant execute on function public.get_rsvps(text) to anon;

-- Soft-deletes one RSVP for the right password. Same lockout as get_rsvps.
-- To restore one: Table Editor → rsvps → clear its deleted_at.
create or replace function public.delete_rsvp(p_password text, p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions, private
as $$
declare
  recent_failures int;
begin
  select count(*) into recent_failures
  from private.dashboard_attempts
  where attempted_at > now() - interval '10 minutes';

  if recent_failures >= 10 then
    return jsonb_build_object('error', 'too_many_attempts');
  end if;

  if not exists (
    select 1 from private.dashboard_secret
    where password_hash = extensions.crypt(p_password, password_hash)
  ) then
    insert into private.dashboard_attempts default values;
    return jsonb_build_object('error', 'wrong_password');
  end if;

  -- Soft delete: keep the row, hide it from the guest list
  update public.rsvps set deleted_at = now() where id = p_id and deleted_at is null;
  return jsonb_build_object('deleted', found);
end;
$$;

revoke all on function public.delete_rsvp(text, uuid) from public;
grant execute on function public.delete_rsvp(text, uuid) to anon;

-- Set or change the dashboard password:
-- insert into private.dashboard_secret (id, password_hash)
-- values (1, extensions.crypt('CHANGE-ME', extensions.gen_salt('bf')))
-- on conflict (id) do update set password_hash = excluded.password_hash;
