"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
  date: string;
  clicks: number;
  visitors: number;
};

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MainChart({ data }: { data: ChartData[] }) {
  return (
    <Card className="min-h-[400px] col-span-6">
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 h-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
        >
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
            />

            <Area
              dataKey="clicks"
              type="monotone"
              fill="url(#fillClicks)"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />

            <Area
              dataKey="visitors"
              type="monotone"
              fill="url(#fillVisitors)"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
