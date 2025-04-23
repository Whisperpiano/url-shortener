"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";

type ChartData = {
  date: string;
  value: number;
};

export default function ClickChart({ data }: { data: ChartData[] }) {
  const maxValue =
    data && data.length > 0 ? Math.max(...data.map((item) => item.value)) : 0;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          {maxValue > 0 && (
            <ReferenceLine
              y={maxValue}
              label={{
                value: `Max: ${maxValue}`,
                position: "insideTopRight",
                fill: "#8884d880",
                fontSize: 11,
              }}
              stroke="#8884d850"
              strokeDasharray="3 3"
            />
          )}

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={true}
            tickSize={10}
            tickMargin={10}
            axisLine={true}
            padding={{ left: 20 }}
          />

          <YAxis
            dataKey="value"
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            tickLine={true}
            axisLine={true}
            tickMargin={10}
            padding={{ top: 20, bottom: 0 }}
            domain={[0, "dataMax"]}
          />

          <Tooltip
            contentStyle={{ borderRadius: 8 }}
            labelStyle={{ fontWeight: "bold" }}
            cursor={{ fill: "#f5f5f5" }}
          />
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
