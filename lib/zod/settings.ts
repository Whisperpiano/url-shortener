import { z } from "zod";

export const NameSettingsSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
});

export type NameSettingsTypes = z.infer<typeof NameSettingsSchema>;
