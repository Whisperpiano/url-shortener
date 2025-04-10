import { z } from "zod";

// ip-api.com
export const FirstAPISchema = z.object({
  country: z.string(),
  city: z.string(),
  regionName: z.string(),
  countryCode: z.string(),
});

export type FirstAPISchema = z.infer<typeof FirstAPISchema>;

// ipwhois.io
export const SecondAPISchema = z.object({
  country: z.string(),
  city: z.string(),
  region: z.string(),
  country_code: z.string(),
});

export type SecondAPISchema = z.infer<typeof SecondAPISchema>;
