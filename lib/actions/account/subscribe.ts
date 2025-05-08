"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schemas/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const subscribeToProductUpdates = async (data: boolean) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be logged in to subscribe to product updates.",
    };
  }

  try {
    await db
      .update(users)
      .set({ productUpdates: data })
      .where(eq(users.id, session.user.id))
      .execute();

    revalidatePath("/account/settings");

    return {
      success: true,
      data: {
        productUpdates: data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        "An unexpected error occurred while subscribing to product updates.",
    };
  }
};
