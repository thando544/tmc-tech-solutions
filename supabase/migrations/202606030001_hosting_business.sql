-- Business-layer hosting packages, orders, and accounts (CyberPanel is infrastructure only).

do $$ begin
  create type hosting_order_status as enum (
    'pending', 'provisioning', 'active', 'suspended', 'failed', 'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type hosting_account_status as enum (
    'active', 'suspended', 'terminated'
  );
exception when duplicate_object then null;
end $$;

alter table public.profiles add column if not exists is_admin boolean not null default false;

create table if not exists public.hosting_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  currency text not null default 'USD',
  billing_cycle billing_cycle not null default 'monthly',
  storage_gb integer not null check (storage_gb > 0),
  bandwidth_gb integer not null check (bandwidth_gb > 0),
  websites_limit integer not null check (websites_limit > 0),
  email_accounts_limit integer not null check (email_accounts_limit >= 0),
  databases_limit integer not null check (databases_limit >= 0),
  support_level text not null default 'standard',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  cyberpanel_package_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hosting_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  package_id uuid not null references public.hosting_packages(id) on delete restrict,
  domain text not null,
  status hosting_order_status not null default 'pending',
  cyberpanel_package_name text not null,
  provisioned_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hosting_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null unique references public.hosting_orders(id) on delete restrict,
  package_id uuid not null references public.hosting_packages(id) on delete restrict,
  domain text not null,
  server_ip text,
  panel_url text,
  status hosting_account_status not null default 'active',
  cyberpanel_package_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists hosting_packages_active_sort_idx
  on public.hosting_packages (is_active, sort_order);

create index if not exists hosting_orders_user_id_idx on public.hosting_orders (user_id);
create index if not exists hosting_orders_status_idx on public.hosting_orders (status);

create index if not exists hosting_accounts_user_id_idx on public.hosting_accounts (user_id);
create index if not exists hosting_accounts_status_idx on public.hosting_accounts (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists hosting_packages_updated_at on public.hosting_packages;
create trigger hosting_packages_updated_at
  before update on public.hosting_packages
  for each row execute function public.set_updated_at();

drop trigger if exists hosting_orders_updated_at on public.hosting_orders;
create trigger hosting_orders_updated_at
  before update on public.hosting_orders
  for each row execute function public.set_updated_at();

drop trigger if exists hosting_accounts_updated_at on public.hosting_accounts;
create trigger hosting_accounts_updated_at
  before update on public.hosting_accounts
  for each row execute function public.set_updated_at();

alter table public.hosting_packages enable row level security;
alter table public.hosting_orders enable row level security;
alter table public.hosting_accounts enable row level security;

drop policy if exists "hosting_packages_select_active" on public.hosting_packages;
create policy "hosting_packages_select_active" on public.hosting_packages
  for select using (is_active = true);

drop policy if exists "hosting_orders_select_own" on public.hosting_orders;
create policy "hosting_orders_select_own" on public.hosting_orders
  for select using (auth.uid() = user_id);

drop policy if exists "hosting_orders_insert_own" on public.hosting_orders;
create policy "hosting_orders_insert_own" on public.hosting_orders
  for insert with check (auth.uid() = user_id);

drop policy if exists "hosting_accounts_select_own" on public.hosting_accounts;
create policy "hosting_accounts_select_own" on public.hosting_accounts
  for select using (auth.uid() = user_id);

-- Seed business packages (CyberPanel package names are infrastructure mapping only).
insert into public.hosting_packages (
  name, slug, description, price, currency, billing_cycle,
  storage_gb, bandwidth_gb, websites_limit, email_accounts_limit, databases_limit,
  support_level, is_featured, is_active, sort_order, cyberpanel_package_name
) values
  (
    'Starter', 'starter',
    'Entry shared hosting for portfolios, landing pages, and personal websites.',
    4.99, 'USD', 'monthly',
    10, 100, 1, 5, 2,
    'standard', false, true, 10, 'Default'
  ),
  (
    'Business', 'business',
    'Business shared hosting with more websites, daily backups, and priority support.',
    9.99, 'USD', 'monthly',
    25, 250, 3, 25, 5,
    'priority', true, true, 20, 'Default'
  ),
  (
    'Pro', 'pro',
    'Higher allocation shared hosting for ecommerce and growing businesses.',
    14.99, 'USD', 'monthly',
    50, 500, 10, 50, 10,
    'priority', false, true, 30, 'Default'
  ),
  (
    'Agency', 'agency',
    'Multi-site hosting for agencies and teams managing client websites.',
    24.99, 'USD', 'monthly',
    100, 1000, 25, 100, 25,
    'premium', false, true, 40, 'Default'
  )
on conflict (slug) do nothing;
