# TMC Tech Solutions Hosting Platform

Production-ready Next.js 15 customer portal for shared hosting, WordPress hosting, business hosting, VPS, domains, email hosting, SSL, website backups, DNS, migrations, security tools, support, invoices, and provider integrations.

## Architecture

- Next.js 15 App Router, strict TypeScript, Tailwind CSS v4, shadcn-style UI primitives.
- Supabase Auth and Postgres are the source of identity and customer data.
- Supabase RLS is enabled on every customer-facing hosting table.
- Portal pages are protected by `middleware.ts` and also use authenticated server-side Supabase reads.
- Third-party provider calls are only made through server-side API routes and server-only integration helpers.
- TanStack Query is installed and configured for client workflows that need interactive fetching.
- Product structure supports categories, plan feature matrices, plan limits, add-ons, monthly/yearly billing cycles, renewals, upgrades, and provisioning automation.

## Security Flow

- Browser receives only Supabase public URL and anonymous key.
- CyberPanel, WHMCS, registrar, payment, Resend, and Supabase service-role secrets stay in server environment variables.
- API routes validate inputs with Zod, require an authenticated user where appropriate, rate-limit requests, and write operation logs.
- Sensitive provider actions write audit logs before execution.
- Disconnected integrations return setup-required errors instead of mock success responses.
- Email, SSL, backup, CyberPanel, WHMCS, domain, and payment operations are prepared as server-side API routes.

## Database

Apply Supabase migrations in order, including `supabase/migrations/202606030001_hosting_business.sql` for business-layer hosting packages, orders, and accounts.

Apply `supabase/migrations/202605210001_hosting_platform.sql` to create:

- `profiles`
- `hosting_plans`
- `product_categories`
- `product_plans`
- `plan_features`
- `plan_limits`
- `product_addons`
- `hosting_servers`
- `server_resource_allocations`
- `hosting_services`
- `service_addons`
- `service_change_requests`
- `renewal_events`
- `websites`
- `domains`
- `dns_zones`
- `dns_records`
- `email_accounts`
- `email_forwarders`
- `email_aliases`
- `databases`
- `ssl_certificates`
- `backups`
- `usage_metrics`
- `invoices`
- `payment_transactions`
- `support_tickets`
- `support_ticket_messages`
- `provisioning_jobs`
- `audit_logs`
- `provider_sync_logs`

## Deployment

- Deploy the frontend and API routes to Vercel.
- Run hosting infrastructure on Hetzner VPS instances.
- Configure Supabase project URL, anon key, and service-role key in Vercel environment variables.
- Configure provider credentials only in Vercel server environment variables.
- Copy `.env.local.example` to `.env.local` for local development and fill in real values.
- Never commit real provider secrets or Supabase service-role keys. Rotate any service-role key that has been pasted into a tracked or shared file.
