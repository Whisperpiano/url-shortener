import { eq } from "drizzle-orm";
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

  const { slug, ip, country, region, city, countryCode, device, browser, os } =
    parsed.data;

  // Check if the device is desktop or another type.
  // This is because UA Parser doesn't return the correct device type for desktop devices.
  const isDesktop = !device.type;

  try {
    await db.transaction(async (tx) => {
      // 1. Check if the link exists
      const link = await tx
        .select()
        .from(links)
        .where(eq(links.slug, slug))
        .execute();

      if (link.length === 0) throw new Error("Link not found");

      // 2. Insert the click into the database
      await tx.insert(clicks).values({
        linkId: link[0].id,
        ip,
        country,
        region,
        city,
        countryCode,
        deviceType: isDesktop ? "desktop" : device.type,
        browser: browser.name,
        os: os.name,
      });

      // 3. Update the link's click count
      await tx
        .update(links)
        .set({ clickCount: link[0].clickCount + 1 })
        .where(eq(links.id, link[0].id))
        .execute();
    });

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
