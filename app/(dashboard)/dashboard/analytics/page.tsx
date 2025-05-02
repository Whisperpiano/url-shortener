import { getLinks } from "@/lib/queries/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClicksData, getLinksData } from "@/lib/queries/charts";
import IntervalSwitcher from "@/components/analytics/interval-switcher";
import { getStartDate } from "@/lib/analytics/get-start-date";

import InformationTabs from "@/components/analytics/information-tabs";
import DashboardHeader from "@/components/layout/dashboard/dashboard-header";
import UrlSwitcher from "@/components/analytics/url-switcher";
import { Button } from "@/components/ui/button";
import { MainChart } from "@/components/analytics/main-chart";

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

  const { clicksChartData } = await getClicksData(startDate, end);

  const { location, device } = await getLinksData();

  console.log(keyParam);

  return (
    <main className="px-4">
      <DashboardHeader group="Dashboard" pageTitle="Analytics" />

      <div className="max-w-7xl mx-auto mt-4 ">
        {/* <h1>Analytics</h1> */}

        <div className="flex items-center justify-between pb-6 pt-2">
          <div className="flex items-center gap-2 ">
            <UrlSwitcher links={links} />
            <IntervalSwitcher />
          </div>
          <Button variant="default" className="cursor-pointer">
            Download as CSV
          </Button>
        </div>

        <section className="grid grid-cols-6 gap-4">
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
            <CardContent>{links.length}</CardContent>
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
              {links.reduce((acc, curr) => acc + curr.clickCount, 0)}
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className="aspect-square w-3 bg-purple-300 rounded-xs"
                  aria-hidden="true"
                ></div>
                Last click
              </CardTitle>
            </CardHeader>
            <CardContent>
              {links.reduce((acc, curr) => acc + curr.clickCount, 0)}
            </CardContent>
          </Card>

          <MainChart data={clicksChartData} />
        </section>
        <section className="mt-4 grid grid-cols-2 gap-4">
          {device && (
            <InformationTabs data={{ type: "location", data: location }} />
          )}

          {device && (
            <InformationTabs data={{ type: "device", data: device }} />
          )}
        </section>
      </div>
    </main>
  );
}
