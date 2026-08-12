do $$ begin create type order_status as enum ('draft', 'pending_payment', 'paid', 'provisioning', 'completed', 'failed', 'cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type cart_status as enum ('active', 'converted', 'abandoned'); exception when duplicate_object then null; end $$;
do $$ begin create type provisioning_target as enum ('cyberpanel', 'opensrs', 'whmcs', 'paynow', 'stripe', 'paypal', 'resend', 'manual'); exception when duplicate_object then null; end $$;

alter type service_type add value if not exists 'wordpress_hosting';
alter type service_type add value if not exists 'email_hosting';

alter table public.product_plans add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.product_plans add column if not exists setup_required boolean not null default false;
alter table public.product_addons add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.hosting_services add column if not exists product_plan_id uuid references public.product_plans(id);
alter table public.hosting_services add column if not exists provider_status text;
alter table public.hosting_services add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.domains add column if not exists external_registrar_id text;
alter table public.domains add column if not exists transfer_lock_enabled boolean not null default true;
alter table public.domains add column if not exists privacy_enabled boolean not null default false;
alter table public.domains add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table public.dns_records add column if not exists updated_at timestamptz not null default now();
alter table public.provisioning_jobs add column if not exists order_id uuid;
alter table public.provisioning_jobs add column if not exists target provisioning_target not null default 'manual';
alter table public.provisioning_jobs add column if not exists payload jsonb not null default '{}'::jsonb;
alter table public.provisioning_jobs add column if not exists provider_reference text;
alter table public.provisioning_jobs add column if not exists attempts integer not null default 0;

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  status cart_status not null default 'active',
  currency text not null default 'USD',
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  product_slug text not null,
  product_type text not null,
  product_name text not null,
  billing_cycle billing_cycle not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  domain_mode text,
  domain_name text,
  addons jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cart_id uuid references public.carts(id) on delete set null,
  invoice_id uuid references public.invoices(id) on delete set null,
  order_number text not null unique,
  status order_status not null default 'pending_payment',
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'USD',
  customer_snapshot jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.provisioning_jobs
  drop constraint if exists provisioning_jobs_order_id_fkey;

alter table public.provisioning_jobs
  add constraint provisioning_jobs_order_id_fkey foreign key (order_id) references public.orders(id) on delete set null;

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_slug text not null,
  product_type text not null,
  product_name text not null,
  billing_cycle billing_cycle not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  domain_mode text,
  domain_name text,
  addons jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.vps_services (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid references public.hosting_services(id) on delete cascade,
  hostname text,
  os_image text,
  vcpu integer not null,
  memory_mb integer not null,
  storage_mb integer not null,
  ipv4 inet,
  root_access_enabled boolean not null default true,
  status service_status not null default 'pending',
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.email_services (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain_id uuid references public.domains(id) on delete set null,
  service_id uuid references public.hosting_services(id) on delete cascade,
  status service_status not null default 'pending',
  mailbox_limit integer not null default 0,
  mailbox_quota_mb integer not null default 0,
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.domain_nameservers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain_id uuid not null references public.domains(id) on delete cascade,
  hostname text not null,
  position integer not null default 0,
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(domain_id, hostname)
);

create table if not exists public.dns_record_audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  zone_id uuid references public.dns_zones(id) on delete cascade,
  record_id uuid references public.dns_records(id) on delete set null,
  action text not null,
  before_value jsonb,
  after_value jsonb,
  created_at timestamptz not null default now()
);

alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.vps_services enable row level security;
alter table public.email_services enable row level security;
alter table public.domain_nameservers enable row level security;
alter table public.dns_record_audit_logs enable row level security;

create policy "carts_select_own" on public.carts for select using (auth.uid() = user_id);
create policy "cart_items_select_own" on public.cart_items for select using (auth.uid() = user_id);
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);
create policy "order_items_select_own" on public.order_items for select using (auth.uid() = user_id);
create policy "vps_services_select_own" on public.vps_services for select using (auth.uid() = user_id);
create policy "email_services_select_own" on public.email_services for select using (auth.uid() = user_id);
create policy "domain_nameservers_select_own" on public.domain_nameservers for select using (auth.uid() = user_id);
create policy "dns_record_audit_select_own" on public.dns_record_audit_logs for select using (auth.uid() = user_id);

create index if not exists carts_user_id_idx on public.carts(user_id);
create index if not exists cart_items_user_id_idx on public.cart_items(user_id);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists order_items_user_id_idx on public.order_items(user_id);
create index if not exists vps_services_user_id_idx on public.vps_services(user_id);
create index if not exists email_services_user_id_idx on public.email_services(user_id);
create index if not exists domain_nameservers_user_id_idx on public.domain_nameservers(user_id);
create index if not exists dns_record_audit_user_id_idx on public.dns_record_audit_logs(user_id);
