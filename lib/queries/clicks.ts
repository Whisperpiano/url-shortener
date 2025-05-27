import { eq, sql } from "drizzle-orm";
import { db } from "../db/db";
import { clicks } from "../db/schemas/clicks";
import { links } from "../db/schemas/links";
import { RegisterClickSchema, RegisterClickTypes } from "../zod/clicks";
import { headers } from "next/headers";

export const registerClick = async (data: RegisterClickTypes) => {
  // Añadir una validación de seguridad para evitar clics desde rutas protegidas
  try {
    const headersList = await headers();
    const referrer = headersList.get("referer") || "";

    if (referrer) {
      const url = new URL(referrer);

      // Si la URL proviene del dashboard o rutas protegidas, no registrar el clic
      if (
        url.pathname.startsWith("/dashboard") ||
        url.pathname.startsWith("/account") ||
        url.pathname.includes("/dashboard/")
      ) {
        console.log(
          "🛑 Click blocked: request from protected route",
          url.pathname
        );
        return {
          success: true, // Devolvemos success: true para no romper el flujo
          protected: true,
        };
      }
    }
  } catch (error) {
    console.log("Error checking referrer:", error);
    // Continuamos con el flujo normal si hay algún error al verificar el referrer
  }

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
