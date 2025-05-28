import { eq, sql } from "drizzle-orm";
import { db } from "../db/db";
import { clicks } from "../db/schemas/clicks";
import { links } from "../db/schemas/links";
import { RegisterClickSchema, RegisterClickTypes } from "../zod/clicks";

export const registerClick = async (data: RegisterClickTypes) => {
  const parsed = RegisterClickSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    linkId,
    ip,
    country,
    region,
    city,
    countryCode,
    device,
    browser,
    os,
  } = parsed.data;

  try {
    await db
      .insert(clicks)
      .values({
        linkId,
        ip,
        country,
        region,
        city,
        countryCode,
        deviceType: device.type,
        browser: browser.name,
        os: os.name,
      })
      .execute();

    await db
      .update(links)
      .set({
        clickCount: sql`${links.clickCount} + 1`,
      })
      .where(eq(links.id, linkId))
      .execute();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in registerClick: ", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while registering the click.",
    };
  }
};
