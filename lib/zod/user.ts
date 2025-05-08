import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;

export default userSchema;

export const userDataSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  password: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  productUpdates: z.boolean(),
});

export type UserData = z.infer<typeof userDataSchema>;
