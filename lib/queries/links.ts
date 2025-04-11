import { cache } from "react";
import { auth } from "@/app/auth";
import { db } from "../db/db";
import { links } from "../db/schemas/links";
import { eq, sql } from "drizzle-orm";
import { Link } from "../zod/links";
import { clicks } from "../db/schemas/clicks";
import { ClickSchemaArray, ClickTypes } from "../zod/clicks";

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

export const getLinksWithStats = cache(async () => {
  const session = await auth();

  if (!session?.user?.id) {
    console.error("No user found");
    return [];
  }

  try {
    const result: {
      link: typeof links.$inferSelect;
      clicks: ClickTypes[];
    }[] = await db
      .select({
        link: links,
        clicks: sql<ClickTypes[]>`coalesce(
            json_group_array(
              case
                when ${clicks.id} is not null
                then json_object(
                  'id', ${clicks.id}, 
                  'linkId', ${clicks.linkId},
                  'timestamp', ${clicks.timestamp},
                  'ip', ${clicks.ip},
                  'countryCode', ${clicks.countryCode},
                  'country', ${clicks.country},
                  'city', ${clicks.city},
                  'device', ${clicks.deviceType},
                  'browser', ${clicks.browser},
                  'os', ${clicks.os}
                )
              end
            ),
            json_array()
          )`.mapWith((v) => {
          const arr = JSON.parse(v);
          const parsed =
            Array.isArray(arr) && arr.length === 1 && arr[0] === null
              ? []
              : arr;

          const validatedData = ClickSchemaArray.safeParse(parsed);

          if (!validatedData.success) {
            console.error("Invalid click data", validatedData.error.format());
            return [];
          }

          return validatedData.data;
        }),
      })
      .from(links)
      .leftJoin(clicks, eq(links.id, clicks.linkId))
      .where(eq(links.userId, session.user.id))
      .groupBy(links.id, links.url)
      .execute();

    return result;
  } catch (error) {
    console.error(error);
  }
});
