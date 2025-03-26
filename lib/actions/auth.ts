"use server";

import { signIn, signOut } from "@/app/auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schemas/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

type Provider = "github" | "google" | "credentials";

// 🔐 Login function
export const login = async (provider: Provider, credentials?: FormData) => {
  if (credentials) {
    await signIn(provider, {
      email: credentials.get("email"),
      password: credentials.get("password"),
      redirectTo: "/dashboard",
    });
  } else {
    await signIn(provider, { redirectTo: "/dashboard" });
  }
};

// 🔓 Logout function
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

// 🆕 Register function
const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const { email, password, name } = parsed.data;

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    return {
      error: "User with this email already exists. Please try another email.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: true };
};
