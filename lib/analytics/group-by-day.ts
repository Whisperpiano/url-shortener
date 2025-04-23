import { eachDayOfInterval, format, parseISO } from "date-fns";

type Click = {
  date: Date | null;
};

export function groupByDay(clicks: Array<Click>, start: Date, end: Date) {
  const grouped = clicks.reduce((acc, item) => {
    if (!item.date) return acc;
    const key = format(new Date(item.date), "yyyy-MM-dd");
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const days = eachDayOfInterval({ start, end }).map((date) =>
    format(date, "yyyy-MM-dd")
  );

  return days.map((day) => ({
    date: format(parseISO(day), "dd MMMM, yyyy"),
    value: grouped[day] || 0,
  }));
}
