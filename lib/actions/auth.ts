"use server";

import { signIn, signOut } from "@/app/auth";

type Provider = "github" | "google";

export const login = async (provider: Provider) => {
  await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
