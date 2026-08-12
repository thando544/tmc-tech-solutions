import { z } from "zod";

const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

export const hostingPackageSchema = z.object({
  name: z.string().min(2).max(80),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens."),
  description: z.string().max(2000).optional().default(""),
  price: z.coerce.number().min(0),
  currency: z.string().length(3).default("USD"),
  billing_cycle: z.enum(["monthly", "yearly", "one_time"]),
  storage_gb: z.coerce.number().int().positive(),
  bandwidth_gb: z.coerce.number().int().positive(),
  websites_limit: z.coerce.number().int().positive(),
  email_accounts_limit: z.coerce.number().int().min(0),
  databases_limit: z.coerce.number().int().min(0),
  support_level: z.string().min(2).max(40),
  is_featured: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true),
  sort_order: z.coerce.number().int().optional().default(0),
  cyberpanel_package_name: z.string().min(1).max(120)
});

export const hostingOrderSchema = z.object({
  package_id: z.string().uuid(),
  domain: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => domainRegex.test(value), "Enter a valid domain name.")
});

export const hostingAccountStatusSchema = z.object({
  account_id: z.string().uuid(),
  action: z.enum(["suspend", "unsuspend"])
});
