"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db/db";
import { links } from "@/lib/db/schemas/links";
import { settings } from "@/lib/db/schemas/settings";
import { blackList } from "@/lib/db/schemas/users";
import { LIMIT_LINKS } from "@/lib/settings/constants";
import { CreateLinkSchema, CreateLinkTypes } from "@/lib/zod/links";
import { sql, eq } from "drizzle-orm";

export const createLink = async (data: CreateLinkTypes) => {
  // 1: Check if the user is logged in
  const session = await auth();

  if (!session?.user?.id || !session?.user?.email) {
    return {
      success: false,
      error: "You must be logged in to create a link.",
    };
  }

  // 2: Validate the form data recieved
  const validatedFormData = CreateLinkSchema.safeParse(data);

  if (!validatedFormData.success) {
    return {
      success: false,
      error: validatedFormData.error.flatten().fieldErrors,
    };
  }

  // 3: Check if the user has reached the limit
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(links)
    .where(eq(links.userId, session.user.id));

  const limitDB = await db
    .select({ limit: settings.limit })
    .from(settings)
    .get();

  const limit = limitDB?.limit ?? LIMIT_LINKS;

  if (count >= limit) {
    return {
      success: false,
      error: "You have reached the maximum number of links allowed.",
    };
  }

  // 4: Check if the user is in the black list

  const isBlacklisted = await db
    .select()
    .from(blackList)
    .where(eq(blackList.email, session.user.email));

  if (isBlacklisted.length > 0) {
    return {
      success: false,
      error: "Your account is blocked, please contact the admin.",
    };
  }

  // 5: Insert the link into the database
  const { url, slug, description } = validatedFormData.data;

  try {
    await db
      .insert(links)
      .values({
        userId: session.user.id,
        url,
        slug,
        description,
      })
      .execute();

    return {
      success: true,
      data: {
        url,
        slug,
        description,
      },
    };
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      return {
        success: false,
        error: "This slug is already in use.",
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while creating the link.",
    };
  }
};
