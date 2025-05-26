import { db } from "../db/db";
import { settings } from "../db/schemas/settings";
import { eq } from "drizzle-orm";
import { SETTINGS_ID } from "../settings/constants";

export const getSettings = async () => {
  const response = await db
    .select()
    .from(settings)
    .where(eq(settings.id, SETTINGS_ID));

  return response[0];
};
