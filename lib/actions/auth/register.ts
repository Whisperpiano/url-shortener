"use server";

import { users } from "../../db/schemas/users";
import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { RegisterFormSchema } from "@/lib/zod/auth";
import bcrypt from "bcryptjs";

export const register = async (formData: FormData) => {
  // 1: Validate the form data
  const validatedFormData = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFormData.success) {
    return {
      success: false,
      errors: validatedFormData.error.flatten().fieldErrors,
    };
  }
  // 2: Clean and sanitize the form data
  const name = validatedFormData.data.name.toString().trim();
  const email = validatedFormData.data.email.toString().trim().toLowerCase();
  const password = validatedFormData.data.password.toString().trim();

  // 3: Check if the user already exists
  const userExisting = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (userExisting.length > 0) {
    return {
      success: false,
      errors: { user: ["User with this email already exists."] },
    };
  }
  // 4: Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5: Insert the user into the database
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: true, errors: {} };
};
