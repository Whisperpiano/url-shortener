import { cache } from "react";
import { auth } from "@/app/auth";
import { db } from "../db/db";
import { users } from "../db/schemas/users";
import { eq } from "drizzle-orm";
import { UserData } from "../zod/user";

interface GetUser {
  success: boolean;
  data?: UserData;
  error?: string;
}

export const getUserById = cache(async (id: string): Promise<GetUser> => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be logged in to get your user data.",
    };
  }

  const isOwner = session.user.id === id;

  if (!isOwner) {
    return {
      success: false,
      error: "You must be the owner of the user to get their data.",
    };
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .execute();

    if (user.length === 0) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    return {
      success: true,
      data: user[0],
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An unexpected error occurred while getting the user data.",
    };
  }
});
