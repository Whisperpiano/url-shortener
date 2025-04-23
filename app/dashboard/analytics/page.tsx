import { getLinksWithStats } from "@/lib/queries/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChartData } from "@/lib/queries/charts";
import ClickChart from "@/components/charts/ClickChart";
import IntervalSwitcher from "@/components/analytics/interval-switcher";
import { getStartDate } from "@/lib/analytics/get-start-date";

type Props = {
  searchParams: { interval: string };
};

export default async function Analytics({ searchParams }: Props) {
  const { interval: intervalParams = "7d" } = searchParams;

  const startDate = getStartDate(intervalParams);
  const end = new Date();

  const links = await getLinksWithStats();

  const { clicksChartData } = await getChartData(startDate, end);

  if (!links) {
    return <h1>No links found</h1>;
  }

  console.log(links);

  return (
    <div className="max-w-7xl mx-auto mt-4 ">
      {/* <h1>Analytics</h1> */}

      <IntervalSwitcher />
      <section className="grid grid-cols-6 gap-4">
        <div className="grid grid-cols-2 gap-4 col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className="aspect-square w-3 bg-blue-300 rounded-xs"
                  aria-hidden="true"
                ></div>
                URLs
              </CardTitle>
            </CardHeader>
            <CardContent>{links.length}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className="aspect-square w-3 bg-green-300 rounded-xs"
                  aria-hidden="true"
                ></div>
                Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {links.reduce((acc, curr) => acc + curr.clicks.length, 0)}
            </CardContent>
          </Card>

          <Card className="min-h-[500px] col-span-2  ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                Analitic clicks
                <div>clicks, urls</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClickChart data={clicksChartData} />
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div
                className="aspect-square w-3 bg-purple-300 rounded-xs"
                aria-hidden="true"
              ></div>
              Top
            </CardTitle>
          </CardHeader>
          <CardContent>123</CardContent>
        </Card>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-4">
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Country, Region, City, Clicks
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Device, Browser, OS, Clicks
            </CardTitle>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
