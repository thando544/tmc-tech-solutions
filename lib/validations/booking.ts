import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  company: z.string().max(160).optional(),
  serviceSlug: z.string().min(2).max(80),
  amountCents: z.number().int().min(10_000).max(2_000_000).optional(),
  notes: z.string().max(2000).optional()
});
