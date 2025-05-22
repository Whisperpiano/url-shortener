import { getLinks } from "@/lib/queries/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClicksData, getLinksData } from "@/lib/queries/charts";
import IntervalSwitcher from "@/components/analytics/interval-switcher";
import { getStartDate } from "@/lib/analytics/get-start-date";

import InformationTabs from "@/components/analytics/information-tabs";
import DashboardHeader from "@/components/layout/dashboard/dashboard-header";
import UrlSwitcher from "@/components/analytics/url-switcher";
import { MainChart } from "@/components/analytics/main-chart";
import TopChart from "@/components/analytics/top-chart";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { DownloadCSVButton } from "@/components/analytics/download-csv-btn";

export default async function Analytics({
  searchParams,
}: {
  searchParams: Promise<{ interval: string; key: string }>;
}) {
  const { interval: intervalParam = "7d", key: keyParam = "all" } =
    await searchParams;

  const startDate = getStartDate(intervalParam);
  const end = new Date();

  const links = await getLinks();

  const selectedLink = links.find((link) => link.slug === keyParam);

  const { clicksChartData, clicksData } = await getClicksData(
    startDate,
    end,
    keyParam
  );

  const { location, device } = await getLinksData(startDate, end, keyParam);

  return (
    <main className="w-full ">
      <DashboardHeader group="Dashboard" pageTitle="Analytics" />

      <div className="max-w-7xl mx-auto mt-4 ">
        {/* <h1>Analytics</h1> */}

        <div className="flex items-center justify-between pb-6 pt-2 px-6">
          <div className="flex items-center gap-2 ">
            <UrlSwitcher links={links} selectedLink={selectedLink} />
            <IntervalSwitcher />
          </div>
          <DownloadCSVButton data={clicksData} />
        </div>

        <section className="grid grid-cols-6 gap-4 px-6 ">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className="aspect-square w-3 bg-blue-300 rounded-xs"
                  aria-hidden="true"
                ></div>
                Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NumberTicker
                duration={300}
                value={clicksChartData.reduce(
                  (acc, curr) => acc + curr.clicks,
                  0
                )}
                className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
              />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className="aspect-square w-3 bg-green-300 rounded-xs"
                  aria-hidden="true"
                ></div>
                Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NumberTicker
                duration={300}
                value={clicksChartData.reduce(
                  (acc, curr) => acc + curr.visitors,
                  0
                )}
                className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
              />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className="aspect-square w-3 bg-purple-300 rounded-xs"
                  aria-hidden="true"
                ></div>
                Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NumberTicker
                duration={300}
                value={links.length}
                className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
              />
            </CardContent>
          </Card>

          <MainChart data={clicksChartData} />
        </section>
        <section className="mt-4 grid grid-cols-2 gap-4 px-6">
          {device && (
            <InformationTabs data={{ type: "location", data: location }} />
          )}
          <TopChart data={{ type: "location", data: location }} />

          {device && (
            <InformationTabs data={{ type: "device", data: device }} />
          )}
          <TopChart data={{ type: "device", data: device }} />
        </section>
      </div>
    </main>
  );
}
