"use server";

import { signIn } from "@/app/auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schemas/users";
import { LoginFormSchema, LoginFormTypes } from "@/lib/zod/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

type Provider = "github" | "google" | "credentials";

export const login = async (provider: Provider, data?: LoginFormTypes) => {
  if (data) {
    const validatedFormData = LoginFormSchema.safeParse({
      email: data.email,
      password: data.password,
    });

    if (!validatedFormData.success) {
      return {
        success: false,
        errors: validatedFormData.error.flatten().fieldErrors,
      };
    }

    const email = validatedFormData.data.email.toString().trim();
    const password = validatedFormData.data.password.toString().trim();

    const userExisting = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (userExisting.length <= 0) {
      return {
        success: false,
        errors: { user: ["User with this email does not exist."] },
      };
    } else if (userExisting.length > 0 && userExisting[0].password) {
      const passwordMatch = await bcrypt.compare(
        password,
        userExisting[0].password
      );

      if (!passwordMatch) {
        return {
          success: false,
          errors: { user: ["Incorrect password."] },
        };
      } else {
        await signIn(provider, {
          email: validatedFormData.data.email,
          password: validatedFormData.data.password,
          redirect: false,
        });

        return {
          success: true,
          errors: {},
        };
      }
    } else {
      return {
        success: false,
        errors: { _global: ["Something went wrong trying to log in."] },
      };
    }
  } else {
    await signIn(provider, { redirectTo: "/dashboard" });
  }
};
