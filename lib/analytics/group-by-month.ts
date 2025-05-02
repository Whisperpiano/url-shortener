import { addMonths, format, isBefore, parseISO, startOfMonth } from "date-fns";

type Click = {
  date: Date | null;
  ip: string | null;
};

export function groupByMonth(clicks: Array<Click>, start: Date, end: Date) {
  const grouped = clicks.reduce((acc, item) => {
    if (!item.date) return acc;
    const key = format(startOfMonth(new Date(item.date)), "yyyy-MM");

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

  const months: string[] = [];
  let current = startOfMonth(start);
  const last = startOfMonth(end);

  while (!isBefore(last, current)) {
    months.push(format(current, "yyyy-MM"));
    current = addMonths(current, 1);
  }

  return months.map((month) => ({
    date: format(parseISO(`${month}-01`), "MMMM yyyy"),
    clicks: grouped[month]?.clicks || 0,
    visitors: grouped[month]?.visitors.size || 0,
  }));
}
