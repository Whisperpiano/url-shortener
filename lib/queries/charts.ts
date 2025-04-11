import { auth } from "@/app/auth";
import { cache } from "react";
import { db } from "../db/db";
import { clicks } from "../db/schemas/clicks";
import { and, eq, sql } from "drizzle-orm";
import { links } from "../db/schemas/links";
import { subDays, subMonths, subYears } from "date-fns";

type TimeRange = "week" | "month" | "year";

export const getChartData = cache(async (range: TimeRange = "week") => {
  const session = await auth();

  if (!session?.user?.id) {
    console.error("No user found");
    return [];
  }

  let startDate: Date;

  switch (range) {
    case "week":
      startDate = subDays(new Date(), 7);
      break;
    case "month":
      startDate = subMonths(new Date(), 1);
      break;
    case "year":
      startDate = subYears(new Date(), 1);
      break;
    default:
      startDate = subDays(new Date(), 7);
      break;
  }

  const startTimestamp = Math.floor(startDate.getTime() / 1000);

  try {
    const result = await db
      .select({
        date: clicks.timestamp,
      })
      .from(clicks)
      .innerJoin(links, eq(clicks.linkId, links.id))
      .where(
        and(
          eq(links.userId, session.user.id),
          sql`(${clicks.timestamp} / 1000) >= ${startTimestamp}`
        )
      )
      .execute();

    return result;
  } catch (error) {
    console.error(error);
  }
});
