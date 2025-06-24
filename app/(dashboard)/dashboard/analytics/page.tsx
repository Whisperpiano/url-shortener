import { getLinks } from "@/lib/queries/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClicksData, getLinksData } from "@/lib/queries/charts";
import IntervalSwitcher from "@/components/analytics/interval-switcher";
import { getStartDate } from "@/lib/analytics/get-start-date";

import InformationTabs from "@/components/analytics/information-tabs";
import DashboardHeader from "@/components/layout/dashboard/components/dashboard-header";
import UrlSwitcher from "@/components/analytics/url-switcher";
import { MainChart } from "@/components/analytics/main-chart";
import TopChart from "@/components/analytics/top-chart";
import { NumberTicker } from "@/components/special/number-ticker";
import { DownloadCSVButton } from "@/components/analytics/download-csv-btn";
import Image from "next/image";
import { getFaviconFromUrl } from "@/lib/utils/getFaviconFromUrl";

export const metadata = {
  title: "Analytics",
  description: "Your analytics for Shortleap",
};

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

  const { location, device, locationDetails, devicesDetails } =
    await getLinksData(startDate, end, keyParam);

  return (
    <main className="w-full relative">
      <DashboardHeader group="Dashboard" pageTitle="Analytics" />

      {selectedLink !== undefined && (
        <Image
          src={getFaviconFromUrl(selectedLink.url)}
          alt={selectedLink.url}
          width={24}
          height={24}
          className="saturate-150 contrast-125 hue-rotate-15 absolute inset-0 w-full h-full object-cover blur-[150px] opacity-25 -z-1 mask-t-from-40% mask-b-from-10%"
          aria-hidden="true"
        />
      )}
      <div className="max-w-7xl mx-auto p-6 @container animate-fade-in-up ">
        <div className="flex @[650px]:flex-row flex-col @[650px]:items-center items-start @[650px]justify-between pb-6 gap-4">
          <div className="flex items-center gap-4 flex-1 w-full sm:flex-row flex-col ">
            <UrlSwitcher links={links} selectedLink={selectedLink} />
            <IntervalSwitcher />
          </div>
          <DownloadCSVButton data={clicksData} />
        </div>

        <section className="grid grid-cols-6 gap-4 animate-fade-in-up ">
          <Card className="@[450px]:col-span-2 col-span-3">
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

          <Card className="@[450px]:col-span-2 col-span-3">
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

          <Card className="@[450px]:col-span-2 col-span-6">
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
        <section className="mt-4 grid grid-cols-2 gap-4 ">
          {device && (
            <InformationTabs
              data={{ type: "location", data: location }}
              details={locationDetails}
            />
          )}
          <TopChart data={{ type: "location", data: location }} />

          {device && (
            <InformationTabs
              data={{ type: "device", data: device }}
              details={devicesDetails}
            />
          )}
          <TopChart data={{ type: "device", data: device }} />
        </section>
      </div>
    </main>
  );
}
