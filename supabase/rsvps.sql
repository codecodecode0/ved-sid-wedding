-- RSVP storage for the wedding site.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.rsvps (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 120),
  email       text check (email is null or (char_length(email) <= 254 and email like '%_@_%.__%')),
  phone       text check (phone is null or phone ~ '^\+[0-9]{1,4} [0-9]{6,14}$'),
  attendance  text not null check (attendance in ('attending', 'not-attending')),
  guests      smallint check (guests is null or guests between 1 and 10),
  dietary     text check (dietary is null or char_length(dietary) <= 300),
  message     text check (message is null or char_length(message) <= 2000),
  -- Soft delete: set when the couple removes an RSVP from the dashboard
  deleted_at  timestamptz
);

alter table public.rsvps add column if not exists deleted_at timestamptz;

-- Guests (the public anon key) may add a response but never read, change or delete any.
alter table public.rsvps enable row level security;

drop policy if exists "Guests can submit an RSVP" on public.rsvps;
create policy "Guests can submit an RSVP"
  on public.rsvps for insert
  to anon
  with check (deleted_at is null);

grant insert on public.rsvps to anon;
revoke select, update, delete on public.rsvps from anon;
