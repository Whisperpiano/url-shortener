"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { NumberTicker } from "@/components/magicui/number-ticker";

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

type DeviceData = {
  type: "device";
  data: {
    Device: AggregatedItem[];
    Browser: AggregatedItem[];
    OS: AggregatedItem[];
  };
};

type DataType = LocationData | DeviceData;

function ProcessDataChart(data: AggregatedItem[], max = 3) {
  const sort = data.sort((a, b) => b.value - a.value);
  const top = sort.slice(0, max);
  const total = sort.reduce((acc, item) => acc + item.value, 0);

  const processed = top.map((item) => ({
    label: item.label || "Unknown",
    value: item.value || 0,
    percentage: Math.round((item.value / total) * 100),
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

export default function TopChart({ data }: { data: DataType }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeData =
    data.type === "location"
      ? (data as LocationData).data.Country
      : (data as DeviceData).data.Device;

  const processedData = ProcessDataChart(activeData);
  const chartConfiguration = ProcessChartConfig(processedData);

  const total = processedData.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="min-h-[300px] py-0 flex flex-col gap-0">
      <CardHeader className="px-4 border-b-2 ">
        <CardTitle className="flex items-center justify-center gap-1 text-sm h-[47px]">
          <span className="text-sm text-muted-foreground">Top 3</span>
          <div className="mx-2 h-3 w-px bg-muted-foreground/30"></div>
          <span className="text-sm font-medium">
            {data.type === "location" ? "Countries" : "Devices"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pb-8">
        <div className="flex-1 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <defs>
                {processedData.map((entry, index) => (
                  <filter
                    key={`glow-${index}`}
                    id={`glow-${index}`}
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>
                ))}
              </defs>
              <Pie
                data={processedData}
                dataKey="value"
                nameKey="countryCode"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                animationDuration={1000}
                animationBegin={0}
                animationEasing="ease-out"
                stroke="none"
              >
                {processedData.map((entry, index) => {
                  const isActive = activeIndex === index;
                  const baseColor =
                    chartConfiguration[entry.countryCode]?.color || "gray";

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={baseColor}
                      stroke={isActive ? baseColor : "none"}
                      strokeWidth={isActive ? 2 : 0}
                      strokeOpacity={0.7}
                      className={`transition-all duration-300 ${
                        isActive ? "filter drop-shadow-xl" : ""
                      }`}
                      style={{
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                        transformBox: "fill-box",
                        filter: isActive ? `url(#glow-${index})` : "none",
                        opacity: isActive ? 1 : 0.85,
                      }}
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Total</div>
              <NumberTicker
                value={total}
                duration={300}
                className="text-xl font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <div
            className={`grid gap-1 ${
              processedData.length === 1
                ? "grid-cols-1 w-1/3"
                : processedData.length === 2
                ? "grid-cols-2 w-2/3"
                : "grid-cols-3 w-full"
            }`}
          >
            {processedData.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-3 rounded-sm transition-all duration-300 hover:bg-muted-foreground/10 cursor-pointer`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`aspect-square size-2 rounded-xs transition-all duration-300 `}
                    style={{
                      backgroundColor:
                        chartConfiguration[item.countryCode]?.color,
                    }}
                  />
                  <div
                    className="text-sm font-medium truncate w-full text-center"
                    title={item.label}
                  >
                    {item.label.slice(0, 1).toUpperCase() + item.label.slice(1)}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
