"use server";

import { signIn } from "@/app/auth";
import { LoginFormTypes } from "@/lib/zod/auth";

type Provider = "github" | "google" | "credentials";

export const login = async (provider: Provider, data?: LoginFormTypes) => {
  if (data) {
    await signIn(provider, {
      email: data.email,
      password: data.password,
      redirectTo: "/dashboard",
    });
  } else {
    await signIn(provider, { redirectTo: "/dashboard" });
  }
};
