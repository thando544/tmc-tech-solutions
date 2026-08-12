create extension if not exists "pgcrypto";

do $$ begin create type service_type as enum ('shared_hosting', 'vps_hosting'); exception when duplicate_object then null; end $$;
do $$ begin create type service_status as enum ('pending', 'provisioning', 'active', 'suspended', 'cancelled', 'terminated'); exception when duplicate_object then null; end $$;
do $$ begin create type server_provider as enum ('hetzner', 'hostafrica', 'manual'); exception when duplicate_object then null; end $$;
do $$ begin create type domain_status as enum ('pending', 'active', 'expired', 'transferring', 'suspended'); exception when duplicate_object then null; end $$;
do $$ begin create type dns_record_type as enum ('A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV', 'CAA', 'NS'); exception when duplicate_object then null; end $$;
do $$ begin create type ssl_status as enum ('pending', 'issued', 'renewing', 'expired', 'failed'); exception when duplicate_object then null; end $$;
do $$ begin create type backup_status as enum ('queued', 'running', 'completed', 'failed', 'expired'); exception when duplicate_object then null; end $$;
do $$ begin create type invoice_status as enum ('draft', 'open', 'paid', 'void', 'overdue'); exception when duplicate_object then null; end $$;
do $$ begin create type payment_provider as enum ('paynow', 'stripe', 'paypal'); exception when duplicate_object then null; end $$;
do $$ begin create type payment_status as enum ('initiated', 'pending', 'succeeded', 'failed', 'refunded'); exception when duplicate_object then null; end $$;
do $$ begin create type ticket_status as enum ('open', 'pending', 'resolved', 'closed'); exception when duplicate_object then null; end $$;
do $$ begin create type ticket_priority as enum ('low', 'normal', 'high', 'urgent'); exception when duplicate_object then null; end $$;
do $$ begin create type job_status as enum ('queued', 'running', 'succeeded', 'failed', 'cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type sync_status as enum ('started', 'succeeded', 'failed', 'setup_required'); exception when duplicate_object then null; end $$;
do $$ begin create type billing_cycle as enum ('monthly', 'yearly', 'one_time'); exception when duplicate_object then null; end $$;
do $$ begin create type product_category_type as enum ('shared_hosting', 'wordpress_hosting', 'business_hosting', 'vps_hosting', 'email_hosting', 'ssl_certificate', 'backup', 'domain', 'migration', 'security', 'reseller_hosting'); exception when duplicate_object then null; end $$;
do $$ begin create type service_change_status as enum ('requested', 'approved', 'scheduled', 'completed', 'rejected', 'cancelled'); exception when duplicate_object then null; end $$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  company_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.hosting_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  service_type service_type not null default 'shared_hosting',
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD',
  websites_limit integer not null,
  storage_mb integer not null,
  bandwidth_mb integer not null,
  email_accounts_limit integer not null,
  databases_limit integer not null,
  backups_included boolean not null default true,
  ssl_included boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.product_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_type product_category_type not null,
  description text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.product_plans (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.product_categories(id) on delete cascade,
  slug text not null unique,
  name text not null,
  description text,
  billing_cycle billing_cycle not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.plan_features (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.product_plans(id) on delete cascade,
  feature_key text not null,
  label text not null,
  value text not null,
  included boolean not null default true,
  display_order integer not null default 0,
  unique(plan_id, feature_key)
);

create table public.plan_limits (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.product_plans(id) on delete cascade,
  limit_key text not null,
  limit_value integer,
  limit_unit text,
  is_unlimited boolean not null default false,
  unique(plan_id, limit_key)
);

create table public.product_addons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category_type product_category_type not null,
  billing_cycle billing_cycle not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'USD',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.hosting_servers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  provider server_provider not null default 'hetzner',
  region text,
  hostname text not null,
  public_ip inet,
  panel_type text not null default 'cyberpanel',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table public.hosting_services (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.hosting_plans(id),
  server_id uuid references public.hosting_servers(id),
  service_type service_type not null,
  status service_status not null default 'pending',
  primary_domain text,
  external_whmcs_service_id text,
  external_panel_id text,
  billing_cycle billing_cycle not null default 'monthly',
  provisioned_at timestamptz,
  renews_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.server_resource_allocations (
  id uuid primary key default gen_random_uuid(),
  server_id uuid not null references public.hosting_servers(id) on delete cascade,
  service_id uuid references public.hosting_services(id) on delete cascade,
  cpu_cores numeric(6,2),
  memory_mb integer,
  storage_mb integer,
  bandwidth_mb integer,
  ip_address inet,
  created_at timestamptz not null default now()
);

create table public.service_addons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid references public.hosting_services(id) on delete cascade,
  addon_id uuid not null references public.product_addons(id),
  status service_status not null default 'pending',
  renews_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.service_change_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid not null references public.hosting_services(id) on delete cascade,
  from_plan_id uuid references public.product_plans(id),
  to_plan_id uuid references public.product_plans(id),
  change_type text not null,
  status service_change_status not null default 'requested',
  effective_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.websites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid not null references public.hosting_services(id) on delete cascade,
  domain_name text not null,
  document_root text,
  php_version text,
  status service_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.domains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid references public.hosting_services(id) on delete set null,
  domain_name text not null,
  registrar text not null default 'manual',
  status domain_status not null default 'pending',
  auto_renew boolean not null default false,
  registered_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.dns_zones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain_id uuid not null references public.domains(id) on delete cascade,
  zone_name text not null,
  provider text not null default 'manual',
  created_at timestamptz not null default now()
);

create table public.dns_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  zone_id uuid not null references public.dns_zones(id) on delete cascade,
  type dns_record_type not null,
  name text not null,
  value text not null,
  ttl integer not null default 3600,
  priority integer,
  created_at timestamptz not null default now()
);

create table public.email_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid not null references public.hosting_services(id) on delete cascade,
  email_address text not null,
  quota_mb integer not null,
  used_mb integer not null default 0,
  spam_filtering_enabled boolean not null default true,
  webmail_enabled boolean not null default true,
  status service_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.email_forwarders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid not null references public.hosting_services(id) on delete cascade,
  source_address text not null,
  destination_address text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.email_aliases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email_account_id uuid not null references public.email_accounts(id) on delete cascade,
  alias_address text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.databases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid not null references public.hosting_services(id) on delete cascade,
  database_name text not null,
  engine text not null default 'mysql',
  size_mb integer not null default 0,
  status service_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.ssl_certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid references public.hosting_services(id) on delete cascade,
  domain_id uuid references public.domains(id) on delete cascade,
  common_name text not null,
  issuer text,
  status ssl_status not null default 'pending',
  issued_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.backups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid not null references public.hosting_services(id) on delete cascade,
  website_id uuid references public.websites(id) on delete cascade,
  status backup_status not null default 'queued',
  backup_type text not null default 'full',
  size_mb integer,
  provider_reference text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.usage_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid not null references public.hosting_services(id) on delete cascade,
  metric_date date not null,
  storage_used_mb integer not null default 0,
  bandwidth_used_mb integer not null default 0,
  email_used_mb integer not null default 0,
  database_used_mb integer not null default 0,
  created_at timestamptz not null default now(),
  unique(service_id, metric_date)
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  invoice_number text not null unique,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'USD',
  status invoice_status not null default 'draft',
  due_at timestamptz,
  external_whmcs_invoice_id text,
  created_at timestamptz not null default now()
);

create table public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  provider payment_provider not null,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'USD',
  status payment_status not null default 'initiated',
  provider_reference text,
  created_at timestamptz not null default now()
);

create table public.renewal_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid references public.hosting_services(id) on delete cascade,
  domain_id uuid references public.domains(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete set null,
  billing_cycle billing_cycle not null,
  renews_at timestamptz not null,
  status text not null default 'scheduled',
  created_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id uuid references public.hosting_services(id) on delete set null,
  subject text not null,
  status ticket_status not null default 'open',
  priority ticket_priority not null default 'normal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  is_staff boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.provisioning_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  service_id uuid references public.hosting_services(id) on delete cascade,
  provider text not null,
  operation text not null,
  status job_status not null default 'queued',
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.provider_sync_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  provider text not null,
  operation text not null,
  status sync_status not null,
  error_message text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.hosting_plans enable row level security;
alter table public.hosting_servers enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_plans enable row level security;
alter table public.plan_features enable row level security;
alter table public.plan_limits enable row level security;
alter table public.product_addons enable row level security;
alter table public.server_resource_allocations enable row level security;
alter table public.hosting_services enable row level security;
alter table public.service_addons enable row level security;
alter table public.service_change_requests enable row level security;
alter table public.renewal_events enable row level security;
alter table public.websites enable row level security;
alter table public.domains enable row level security;
alter table public.dns_zones enable row level security;
alter table public.dns_records enable row level security;
alter table public.email_accounts enable row level security;
alter table public.email_forwarders enable row level security;
alter table public.email_aliases enable row level security;
alter table public.databases enable row level security;
alter table public.ssl_certificates enable row level security;
alter table public.backups enable row level security;
alter table public.usage_metrics enable row level security;
alter table public.invoices enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_ticket_messages enable row level security;
alter table public.provisioning_jobs enable row level security;
alter table public.audit_logs enable row level security;
alter table public.provider_sync_logs enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "plans_select_active" on public.hosting_plans for select using (is_active = true);
create policy "product_categories_select_active" on public.product_categories for select using (is_active = true);
create policy "product_plans_select_active" on public.product_plans for select using (is_active = true);
create policy "plan_features_select_active_plans" on public.plan_features for select using (
  exists (select 1 from public.product_plans where product_plans.id = plan_features.plan_id and product_plans.is_active = true)
);
create policy "plan_limits_select_active_plans" on public.plan_limits for select using (
  exists (select 1 from public.product_plans where product_plans.id = plan_limits.plan_id and product_plans.is_active = true)
);
create policy "product_addons_select_active" on public.product_addons for select using (is_active = true);

create policy "services_select_own" on public.hosting_services for select using (auth.uid() = user_id);
create policy "server_allocations_select_own" on public.server_resource_allocations for select using (
  exists (select 1 from public.hosting_services where hosting_services.id = server_resource_allocations.service_id and hosting_services.user_id = auth.uid())
);
create policy "service_addons_select_own" on public.service_addons for select using (auth.uid() = user_id);
create policy "service_changes_select_own" on public.service_change_requests for select using (auth.uid() = user_id);
create policy "service_changes_insert_own" on public.service_change_requests for insert with check (auth.uid() = user_id);
create policy "renewal_events_select_own" on public.renewal_events for select using (auth.uid() = user_id);
create policy "websites_select_own" on public.websites for select using (auth.uid() = user_id);
create policy "domains_select_own" on public.domains for select using (auth.uid() = user_id);
create policy "dns_zones_select_own" on public.dns_zones for select using (auth.uid() = user_id);
create policy "dns_records_select_own" on public.dns_records for select using (auth.uid() = user_id);
create policy "email_accounts_select_own" on public.email_accounts for select using (auth.uid() = user_id);
create policy "email_forwarders_select_own" on public.email_forwarders for select using (auth.uid() = user_id);
create policy "email_aliases_select_own" on public.email_aliases for select using (auth.uid() = user_id);
create policy "databases_select_own" on public.databases for select using (auth.uid() = user_id);
create policy "ssl_select_own" on public.ssl_certificates for select using (auth.uid() = user_id);
create policy "backups_select_own" on public.backups for select using (auth.uid() = user_id);
create policy "usage_select_own" on public.usage_metrics for select using (auth.uid() = user_id);
create policy "invoices_select_own" on public.invoices for select using (auth.uid() = user_id);
create policy "payments_select_own" on public.payment_transactions for select using (auth.uid() = user_id);
create policy "tickets_select_own" on public.support_tickets for select using (auth.uid() = user_id);
create policy "tickets_insert_own" on public.support_tickets for insert with check (auth.uid() = user_id);
create policy "ticket_messages_select_own" on public.support_ticket_messages for select using (auth.uid() = user_id);
create policy "ticket_messages_insert_own" on public.support_ticket_messages for insert with check (auth.uid() = user_id);
create policy "jobs_select_own" on public.provisioning_jobs for select using (auth.uid() = user_id);
create policy "audit_select_own" on public.audit_logs for select using (auth.uid() = user_id);
create policy "sync_logs_select_own" on public.provider_sync_logs for select using (auth.uid() = user_id);

create index hosting_services_user_id_idx on public.hosting_services(user_id);
create index service_addons_user_id_idx on public.service_addons(user_id);
create index service_change_requests_user_id_idx on public.service_change_requests(user_id);
create index renewal_events_user_id_idx on public.renewal_events(user_id);
create index websites_user_id_idx on public.websites(user_id);
create index domains_user_id_idx on public.domains(user_id);
create index dns_zones_user_id_idx on public.dns_zones(user_id);
create index dns_records_user_id_idx on public.dns_records(user_id);
create index email_accounts_user_id_idx on public.email_accounts(user_id);
create index email_forwarders_user_id_idx on public.email_forwarders(user_id);
create index email_aliases_user_id_idx on public.email_aliases(user_id);
create index databases_user_id_idx on public.databases(user_id);
create index ssl_user_id_idx on public.ssl_certificates(user_id);
create index backups_user_id_idx on public.backups(user_id);
create index usage_metrics_user_id_idx on public.usage_metrics(user_id);
create index invoices_user_id_idx on public.invoices(user_id);
create index payment_transactions_user_id_idx on public.payment_transactions(user_id);
create index support_tickets_user_id_idx on public.support_tickets(user_id);
create index provisioning_jobs_user_id_idx on public.provisioning_jobs(user_id);
create index audit_logs_user_id_idx on public.audit_logs(user_id);
create index provider_sync_logs_user_id_idx on public.provider_sync_logs(user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
