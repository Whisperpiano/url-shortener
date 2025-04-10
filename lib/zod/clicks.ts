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
