import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  message: z.string().min(10).max(4000)
});

export const supportTicketSchema = z.object({
  subject: z.string().min(4).max(160),
  message: z.string().min(10).max(4000),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal")
});

export const integrationOperationSchema = z.object({
  operation: z.string().min(2).max(80),
  payload: z.record(z.string(), z.unknown()).default({})
});

export const paymentSchema = z.object({
  invoiceId: z.string().uuid(),
  amountCents: z.number().int().positive(),
  currency: z.string().length(3).default("USD")
});

export const checkoutItemSchema = z.object({
  slug: z.string().min(2).max(120),
  name: z.string().min(2).max(160),
  type: z.enum(["hosting", "wordpress", "email", "vps", "ssl", "domain", "website_service", "mobile_app"]),
  priceCents: z.number().int().min(0),
  currency: z.literal("USD"),
  billingCycle: z.enum(["monthly", "yearly", "one-time", "quote"]),
  quantity: z.literal(1),
  domainMode: z.enum(["register", "existing"]).optional(),
  domainName: z.string().min(3).max(253).optional(),
  addons: z.array(z.string().min(2).max(80)).optional()
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
  paymentMethod: z.enum(["ecocash", "card", "paypal"]),
  customer: z.object({
    fullName: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().min(7).max(30).optional().or(z.literal(""))
  })
});

export const cartItemMutationSchema = z.object({
  slug: z.string().min(2).max(120),
  type: z.enum(["hosting", "wordpress", "email", "vps", "ssl", "domain", "website_service", "mobile_app"]),
  domainMode: z.enum(["register", "existing"]).optional(),
  domainName: z.string().min(3).max(253).optional(),
  addons: z.array(z.string().min(2).max(80)).optional()
});

export const cartItemUpdateSchema = z.object({
  id: z.string().min(3).max(160),
  domainMode: z.enum(["register", "existing"]).optional(),
  domainName: z.string().max(253).optional(),
  addons: z.array(z.string().min(2).max(80)).optional()
});

export const domainAvailabilitySchema = z.object({
  domainName: z.string().trim().toLowerCase().min(3).max(253).regex(/^[a-z0-9][a-z0-9.-]+\.[a-z]{2,}$/),
  operation: z.enum(["checkAvailability"]).default("checkAvailability")
});

export const dnsRecordSchema = z.object({
  zoneId: z.string().uuid(),
  recordId: z.string().uuid().optional(),
  type: z.enum(["A", "AAAA", "CNAME", "MX", "TXT", "SRV", "CAA"]),
  name: z.string().min(1).max(253),
  value: z.string().min(1).max(2000),
  ttl: z.number().int().min(60).max(86400),
  priority: z.number().int().min(0).max(65535).optional()
});

export const nameserverUpdateSchema = z.object({
  domainId: z.string().uuid(),
  nameservers: z.array(z.string().trim().toLowerCase().min(4).max(253)).min(2).max(8)
});
