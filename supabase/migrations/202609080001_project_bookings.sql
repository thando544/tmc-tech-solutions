-- Anonymous Paynow deposits / project bookings. Service role only.

create table if not exists public.project_bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'cancelled', 'failed', 'expired')),
  name text not null,
  email text not null,
  phone text,
  company text,
  service_slug text not null,
  service_name text not null,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'USD',
  notes text,
  paynow_poll_url text,
  paynow_reference text,
  paynow_status text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_bookings_email_idx on public.project_bookings (email);
create index if not exists project_bookings_status_idx on public.project_bookings (status);

alter table public.project_bookings enable row level security;
