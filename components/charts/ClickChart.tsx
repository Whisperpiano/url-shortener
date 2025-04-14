"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

const chartData = [
  { date: "2025-04-10T11:52:22.183Z", value: 10 },
  { date: "2025-04-11T05:23:54.254Z", value: 20 },
  { date: "2025-04-11T05:24:07.047Z", value: 30 },
];

export default function ClickChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
