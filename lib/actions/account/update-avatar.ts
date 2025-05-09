"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schemas/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateAvatar = async (avatarUrl: string) => {
  const session = await auth();

  if (!session?.user?.id || !session?.user?.email) {
    return {
      success: false,
      error: "You must be logged in to update your avatar.",
    };
  }

  try {
    await db
      .update(users)
      .set({ image: avatarUrl })
      .where(eq(users.id, session.user.id))
      .execute();

    revalidatePath("/account/settings");

    return {
      success: true,
      data: {
        avatarUrl,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An unexpected error occurred while updating your avatar.",
    };
  }
};
