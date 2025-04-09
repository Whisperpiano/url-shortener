import { InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { links } from "../db/schemas/links";

export type Link = InferSelectModel<typeof links>;

export const CreateLinkSchema = z.object({
  url: z.string().min(1, "URL is required.").url({
    message: "URL must be a valid URL.",
  }),
  slug: z
    .string()
    .min(6, { message: "Short URL must be at least 6 characters long." })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: "Only alphanumeric characters, dashes, and underscores.",
    }),

  description: z
    .string()
    .max(150, { message: "Description must be 150 characters or less." })
    .optional(),
});

export type CreateLinkTypes = z.infer<typeof CreateLinkSchema>;

export const DeleteLinkSchema = z.object({
  id: z.string().min(1, "ID is required."),
});

export type DeleteLinkTypes = z.infer<typeof DeleteLinkSchema>;
