import { z } from "zod";

export const LinkDataSchema = z.object({
  country: z.string().nullable(),
  region: z.string().nullable(),
  city: z.string().nullable(),
  device: z.string().nullable(),
  browser: z.string().nullable(),
  os: z.string().nullable(),
  countryCode: z.string().nullable(),
});

export const LinksDataArray = z.array(LinkDataSchema);

export type LinkDataType = z.infer<typeof LinkDataSchema>;
export type LinksDataType = z.infer<typeof LinksDataArray>;
