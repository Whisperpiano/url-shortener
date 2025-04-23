import { addMonths, format, isBefore, parseISO, startOfMonth } from "date-fns";

type Click = {
  date: Date | null;
};

export function groupByMonth(clicks: Array<Click>, start: Date, end: Date) {
  const grouped = clicks.reduce((acc, item) => {
    if (!item.date) return acc;
    const key = format(startOfMonth(new Date(item.date)), "yyyy-MM");
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const months: string[] = [];
  let current = startOfMonth(start);
  const last = startOfMonth(end);

  while (!isBefore(last, current)) {
    months.push(format(current, "yyyy-MM"));
    current = addMonths(current, 1);
  }

  return months.map((month) => ({
    date: format(parseISO(`${month}-01`), "MMMM yyyy"),
    value: grouped[month] || 0,
  }));
}
