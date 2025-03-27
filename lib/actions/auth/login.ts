"use server";

import { signIn } from "@/app/auth";

type Provider = "github" | "google" | "credentials";

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
