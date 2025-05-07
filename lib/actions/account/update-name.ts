"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db/db";
import { users } from "@/lib/db/schemas/users";
import { NameSettingsSchema } from "@/lib/zod/settings";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateName = async (name: string) => {
  const session = await auth();

  if (!session?.user?.id || !session?.user?.email) {
    return {
      success: false,
      error: "You must be logged in to update your name.",
    };
  }

  const parsedName = NameSettingsSchema.safeParse({ name });

  if (!parsedName.success) {
    return {
      success: false,
      error: parsedName.error.flatten().fieldErrors,
    };
  }

  try {
    await db
      .update(users)
      .set({ name: parsedName.data.name })
      .where(eq(users.id, session.user.id))
      .execute();

    revalidatePath("/account/settings");

    return {
      success: true,
      data: {
        name: parsedName.data.name,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An unexpected error occurred while updating your name.",
    };
  }
};
