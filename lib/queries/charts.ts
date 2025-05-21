import { auth } from "@/app/auth";
import { cache } from "react";
import { db } from "../db/db";
import { clicks } from "../db/schemas/clicks";
import { and, asc, eq, gt, lt, sql } from "drizzle-orm";
import { links } from "../db/schemas/links";
import { toDate } from "date-fns";

import { getGroupedData } from "../analytics/get-grouped-data";
import { groupByKey } from "../analytics/group-by-key";

export const getClicksData = cache(
  async (
    start: Date,
    end: Date,
    linkSlug: string
  ): Promise<{
    clicksChartData: Array<{ date: string; clicks: number; visitors: number }>;
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
          ip: clicks.ip,
        })
        .from(clicks)
        .leftJoin(links, eq(clicks.linkId, links.id))
        .where(
          and(
            eq(links.userId, session.user.id),
            linkSlug === "all" ? sql`1=1` : eq(links.slug, linkSlug),
            gt(clicks.timestamp, toDate(start)),
            lt(clicks.timestamp, toDate(end))
          )
        )
        .orderBy(asc(clicks.timestamp))
        .execute();
      console.log(clicksData);
      const clicksChartData = getGroupedData(clicksData, start, end);

      console.log(clicksChartData);

      return { clicksChartData };
    } catch (error) {
      console.error(error);
      return {
        clicksChartData: [],
      };
    }
  }
);

export const getLinksData = cache(
  async (start: Date, end: Date, linkSlug: string) => {
    const session = await auth();

    if (!session?.user?.id) {
      console.error("No user found");
      return {
        location: {
          Country: [],
          Region: [],
          City: [],
        },
        device: {
          Device: [],
          Browser: [],
          OS: [],
        },
      };
    }
    try {
      const result = await db
        .select({
          country: clicks.country,
          region: clicks.region,
          city: clicks.city,
          device: clicks.deviceType,
          browser: clicks.browser,
          os: clicks.os,
          countryCode: clicks.countryCode,
        })
        .from(clicks)
        .leftJoin(links, eq(clicks.linkId, links.id))
        .where(
          and(
            eq(links.userId, session.user.id),
            linkSlug === "all" ? sql`1=1` : eq(links.slug, linkSlug),
            gt(clicks.timestamp, toDate(start)),
            lt(clicks.timestamp, toDate(end))
          )
        )
        .orderBy(asc(clicks.timestamp))
        .execute();

      const countryChart = groupByKey(result, "country");
      const regionChart = groupByKey(result, "region");
      const cityChart = groupByKey(result, "city");

      const deviceChart = groupByKey(result, "device");
      const browserChart = groupByKey(result, "browser");
      const osChart = groupByKey(result, "os");

      console.log("FETCHING");

      return {
        location: {
          Country: countryChart,
          Region: regionChart,
          City: cityChart,
        },
        device: {
          Device: deviceChart,
          Browser: browserChart,
          OS: osChart,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        location: {
          Country: [],
          Region: [],
          City: [],
        },
        device: {
          Device: [],
          Browser: [],
          OS: [],
        },
      };
    }
  }
);
