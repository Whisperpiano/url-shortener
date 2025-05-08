"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schemas/users";
import { eq } from "drizzle-orm";

export const deleteAccount = async (id: string) => {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return {
      success: false,
      message: "You must be signed in to delete your account.",
    };
  }

  const isOwner = session.user.id === id;

  if (!isOwner) {
    return {
      success: false,
      message: "You must be the owner of the account to delete it.",
    };
  }

  try {
    await db.transaction(async (tx) => {
      await tx.delete(users).where(eq(users.id, id)).execute();
    });

    return {
      success: true,
      message: "Account deleted successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while deleting your account.",
    };
  }
};
