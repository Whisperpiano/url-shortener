import { cache } from "react";
import { auth } from "@/app/auth";
import { db } from "../db/db";
import { links } from "../db/schemas/links";
import { eq } from "drizzle-orm";
import { Link } from "../zod/links";

export const getLinks = cache(async (): Promise<Link[]> => {
  const session = await auth();

  if (!session?.user?.id) {
    console.error("No user found");
    return [];
  }

  try {
    const response = await db
      .select()
      .from(links)
      .where(eq(links.userId, session.user.id))
      .execute();

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
});
