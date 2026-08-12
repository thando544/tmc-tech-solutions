do $$ begin create type project_request_status as enum ('quote_requested', 'pending_review', 'approved', 'in_progress', 'completed', 'cancelled'); exception when duplicate_object then null; end $$;

alter type product_category_type add value if not exists 'website_services';
alter type product_category_type add value if not exists 'mobile_app_development';
alter type product_category_type add value if not exists 'addons';

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.product_categories(id) on delete set null,
  slug text not null unique,
  name text not null,
  product_type text not null,
  description text,
  is_active boolean not null default true,
  requires_provisioning boolean not null default true,
  requires_project_review boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_prices (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  billing_cycle billing_cycle not null,
  amount_cents integer not null default 0 check (amount_cents >= 0),
  currency text not null default 'USD',
  is_quote_based boolean not null default false,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  product_slug text not null,
  product_type text not null,
  title text not null,
  status project_request_status not null default 'pending_review',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  product_slug text not null,
  product_type text not null,
  title text not null,
  status project_request_status not null default 'pending_review',
  budget_cents integer not null default 0 check (budget_cents >= 0),
  currency text not null default 'USD',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.product_prices enable row level security;
alter table public.service_requests enable row level security;
alter table public.project_requests enable row level security;

create policy "products_select_active" on public.products for select using (is_active = true);
create policy "product_prices_select_active" on public.product_prices for select using (is_active = true);
create policy "service_requests_select_own" on public.service_requests for select using (auth.uid() = user_id);
create policy "project_requests_select_own" on public.project_requests for select using (auth.uid() = user_id);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists product_prices_product_id_idx on public.product_prices(product_id);
create index if not exists service_requests_user_id_idx on public.service_requests(user_id);
create index if not exists project_requests_user_id_idx on public.project_requests(user_id);
