import { eachHourOfInterval, format } from "date-fns";

type Click = {
  date: Date | null;
  ip: string | null;
};

export function groupByHour(clicks: Array<Click>, start: Date, end: Date) {
  const grouped = clicks.reduce((acc, item) => {
    if (!item.date) return acc;
    const hourKey = format(new Date(item.date), "HH:00");

    if (!acc[hourKey]) {
      acc[hourKey] = {
        clicks: 0,
        visitors: new Set<string>(),
      };
    }

    acc[hourKey].clicks += 1;

    if (item.ip) {
      acc[hourKey].visitors.add(item.ip);
    }

    return acc;
  }, {} as Record<string, { clicks: number; visitors: Set<string> }>);

  const hours = eachHourOfInterval({ start, end }).map((date) =>
    format(date, "HH:00")
  );

  return hours.map((hour) => ({
    date: hour,
    clicks: grouped[hour]?.clicks || 0,
    visitors: grouped[hour]?.visitors.size || 0,
  }));
}
