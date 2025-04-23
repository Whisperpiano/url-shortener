import { differenceInDays } from "date-fns";
import { groupByHour } from "./group-by-hour";
import { groupByDay } from "./group-by-day";
import { groupByMonth } from "./group-by-month";

type Click = {
  date: Date | null;
};

export function getGroupedData(
  clicks: Array<Click>,
  start: Date,
  end: Date
): Array<{ date: string; value: number }> {
  const diff = differenceInDays(end, start);

  if (diff <= 1) return groupByHour(clicks, start, end);
  else if (diff <= 30) return groupByDay(clicks, start, end);
  else return groupByMonth(clicks, start, end);
}
