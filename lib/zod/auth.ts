import { z } from "zod";

// Register Schema
export const RegisterFormSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters long."),
  email: z.string().email("Must be a valid email."),
  password: z.string().min(6, "Must be at least 6 characters long."),
});

export type RegisterFormTypes = z.infer<typeof RegisterFormSchema>;

// Login Schema
export const LoginFormSchema = z.object({
  email: z.string().email("Must be a valid email."),
  password: z.string().min(6, "Must be at least 6 characters long."),
});

export type LoginFormTypes = z.infer<typeof LoginFormSchema>;
