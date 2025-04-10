"use server";

import { db } from "@/lib/db/db";
import { links } from "@/lib/db/schemas/links";
import { eq } from "drizzle-orm";

export const findLink = async (slug: string) => {
  const link = await db
    .select()
    .from(links)
    .where(eq(links.slug, slug))
    .execute();

  if (link.length === 0) {
    return {
      success: false,
      error: "Link not found",
    };
  }

  return {
    success: true,
    data: link[0],
  };
};
