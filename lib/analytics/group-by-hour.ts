import { eachHourOfInterval, format } from "date-fns";

type Click = {
  date: Date | null;
};

export function groupByHour(clicks: Array<Click>, start: Date, end: Date) {
  const grouped = clicks.reduce((acc, item) => {
    if (!item.date) return acc;
    const hourKey = format(new Date(item.date), "HH:00");
    acc[hourKey] = (acc[hourKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const hours = eachHourOfInterval({ start, end }).map((date) =>
    format(date, "HH:00")
  );

  return hours.map((hour) => ({
    date: hour,
    value: grouped[hour] || 0,
  }));
}
