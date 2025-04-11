"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

export type DateType = {
  date: Date | null;
};

const formatDate = (date: Date) => new Date(date).toISOString().split("T")[0];

const generateDateRange = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
};

export default function ClickChart({ data }: { data: DateType[] | undefined }) {
  const dateRange = generateDateRange();

  if (!data || data.length === 0) {
    return <div>No data found</div>;
  }

  const grouped = data.reduce((acc, item) => {
    if (!item.date) return acc;
    const day = formatDate(item.date);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = dateRange.map((date) => ({
    date,
    count: grouped[date] || 0,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
