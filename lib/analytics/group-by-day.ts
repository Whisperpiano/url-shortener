import { eachDayOfInterval, format, parseISO } from "date-fns";

type Click = {
  date: Date | null;
  ip: string | null;
};

export function groupByDay(clicks: Array<Click>, start: Date, end: Date) {
  const grouped = clicks.reduce((acc, item) => {
    if (!item.date) return acc;
    const key = format(new Date(item.date), "yyyy-MM-dd");

    if (!acc[key]) {
      acc[key] = {
        clicks: 0,
        visitors: new Set<string>(),
      };
    }

    acc[key].clicks += 1;

    if (item.ip) {
      acc[key].visitors.add(item.ip);
    }

    return acc;
  }, {} as Record<string, { clicks: number; visitors: Set<string> }>);

  console.log(grouped);

  const days = eachDayOfInterval({ start, end }).map((date) =>
    format(date, "yyyy-MM-dd")
  );

  return days.map((day) => ({
    date: format(parseISO(day), "dd MMMM, yyyy"),
    clicks: grouped[day]?.clicks || 0,
    visitors: grouped[day]?.visitors.size || 0,
  }));
}
