import { auth } from "@/app/auth";
import { cache } from "react";
import { db } from "../db/db";
import { clicks } from "../db/schemas/clicks";
import { and, asc, eq, gt, lt } from "drizzle-orm";
import { links } from "../db/schemas/links";
import { toDate } from "date-fns";

import { getGroupedData } from "../analytics/get-grouped-data";

export const getChartData = cache(
  async (
    start: Date,
    end: Date
  ): Promise<{
    clicksChartData: Array<{ date: string; value: number }>;
  }> => {
    const session = await auth();

    if (!session?.user?.id) {
      console.error("No user found");
      return {
        clicksChartData: [],
      };
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

      const clicksChartData = getGroupedData(clicksData, start, end);

      return { clicksChartData };
    } catch (error) {
      console.error(error);
      return {
        clicksChartData: [],
      };
    }
  }
);
