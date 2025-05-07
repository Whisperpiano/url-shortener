import { z } from "zod";

export const NameSettingsSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
});

export type NameSettingsTypes = z.infer<typeof NameSettingsSchema>;

export const DeleteAccountSettingsSchema = z.object({
  confirmation: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val === "confirm delete account", {
      message: "Write exactly 'confirm delete account'",
    }),
});

export type DeleteAccountSettingsTypes = z.infer<
  typeof DeleteAccountSettingsSchema
>;
