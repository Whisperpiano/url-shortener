import { auth } from "@/app/auth";
import { cache } from "react";
import { db } from "../db/db";
import { clicks } from "../db/schemas/clicks";
import { and, asc, eq, gt, lt } from "drizzle-orm";
import { links } from "../db/schemas/links";
import { toDate, format, parseISO } from "date-fns";

export const getChartData = cache(async (start: Date, end: Date) => {
  const session = await auth();

  if (!session?.user?.id) {
    console.error("No user found");
    return [];
  }

  try {
    const clicksData = await db
      .select({
        date: clicks.timestamp,
      })
      .from(clicks)
      .leftJoin(links, eq(clicks.linkId, links.id))
      .where(
        and(
          eq(links.userId, session.user.id),
          gt(clicks.timestamp, toDate(start)),
          lt(clicks.timestamp, toDate(end))
        )
      )
      .orderBy(asc(clicks.timestamp))
      .execute();

    const groupedByDay = clicksData.reduce((acc, item) => {
      if (!item.date) {
        return acc;
      }

      const dateKey = format(new Date(item.date), "yyyy-MM-dd");

      acc[dateKey] = (acc[dateKey] || 0) + 1;

      return acc;
    }, {} as Record<string, number>);

    const formattedData = Object.entries(groupedByDay).map(([key, value]) => {
      return {
        date: format(parseISO(key), "dd MMMM, yyyy"),
        value,
      };
    });

    return formattedData;
  } catch (error) {
    console.error(error);
  }
});
