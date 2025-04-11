import { z } from "zod";

export const RegisterClickSchema = z.object({
  slug: z.string(),
  ip: z.string().nullable(),
  country: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  countryCode: z.string().nullable().optional(),
  device: z.object({
    type: z.string().nullable().optional(),
  }),
  browser: z.object({
    name: z.string().nullable().optional(),
  }),
  os: z.object({
    name: z.string().nullable().optional(),
  }),
});

export type RegisterClickTypes = z.infer<typeof RegisterClickSchema>;

export const ClickSchema = z.object({
  id: z.string(),
  linkId: z.string(),
  timestamp: z.number(),
  ip: z.string().nullable(),
  countryCode: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  deviceType: z.string().nullable().optional(),
  browser: z.string().nullable().optional(),
  os: z.string().nullable().optional(),
});

export const ClickSchemaArray = z.array(ClickSchema);
export type ClickTypes = z.infer<typeof ClickSchema>;
