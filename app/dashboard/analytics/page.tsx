import { getLinksWithStats } from "@/lib/queries/links";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChartData } from "@/lib/queries/charts";
import ClickChart from "@/components/charts/ClickChart";
import { subDays } from "date-fns";

export default async function Analytics() {
  const links = await getLinksWithStats();
  const chartData = await getChartData(subDays(new Date(), 7), new Date());

  if (!links) {
    return <h1>No links found</h1>;
  }

  if (!chartData) {
    return <h1>No data found</h1>;
  }

  console.log("CHART DATA", chartData);

  // const test = links.map((link) => {
  //   link.clicks.map((click) => {
  //     console.log("CLICK", click);
  //   });

  // console.log("LINK", links);

  return (
    <div className="max-w-7xl mx-auto mt-4 ">
      {/* <h1>Analytics</h1> */}
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
              <ClickChart />
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

      {/* 
      {result?.map((link) => {
        console.log("CLICKS", link.clicks);
        return (
          <div key={link.link.id}>
            {link.link.url}
            <div>
              <span>{link.clicks.length}</span>
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
