"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type AggregatedItem = {
  label: string;
  value: number;
  countryCode?: string;
};

type LocationData = {
  type: "location";
  data: {
    Country: AggregatedItem[];
    Region: AggregatedItem[];
    City: AggregatedItem[];
  };
};

function ProcessDataChart(data: AggregatedItem[], max = 3) {
  const sort = data.sort((a, b) => b.value - a.value);
  const top = sort.slice(0, max);
  const processed = top.map((item) => ({
    label: item.label || "Unknown",
    value: item.value || 0,
    countryCode: item.countryCode || "Unknown",
  }));

  return processed;
}

function ProcessChartConfig(data: AggregatedItem[] | AggregatedItem[]) {
  return data.reduce((acc, item, index) => {
    acc[item.countryCode ?? item.label] = {
      label: item.label,
      color: `var(--chart-${index + 1})`,
    };
    return acc;
  }, {} as ChartConfig);
}

export default function TopChart({ data }: { data: LocationData }) {
  const processedData = ProcessDataChart(data.data.Country);
  const chartConfiguration = ProcessChartConfig(processedData);

  console.log(chartConfiguration);
  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center items-center pb-0">
        <CardTitle>Top 3 - Countries</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfiguration}
          className="mx-auto aspect-square max-h-[275px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={processedData} dataKey="value" nameKey="countryCode">
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfiguration[entry.countryCode]?.color || "gray"}
                />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="countryCode" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
