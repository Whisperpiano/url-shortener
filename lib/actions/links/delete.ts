"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db/db";
import { links } from "@/lib/db/schemas/links";
import { DeleteLinkTypes } from "@/lib/zod/links";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteLink = async (data: DeleteLinkTypes) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "No autorizado" };
  }

  if (!data.id) {
    return { success: false, error: "ID requerido" };
  }

  try {
    await db.delete(links).where(eq(links.id, data.id)).execute();
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Unexpected error while deleting the link.",
    };
  }
};
