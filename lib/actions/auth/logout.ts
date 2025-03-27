"use server";

import { signOut } from "@/app/auth";

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
