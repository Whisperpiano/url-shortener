import { subDays, subHours, subMonths } from "date-fns";

export function getStartDate(date: string): Date {
  const now = new Date();

  switch (date) {
    case "24h":
      return subHours(now, 23);
    case "7d":
      return subDays(now, 6);
    case "14d":
      return subDays(now, 13);
    case "30d":
      return subDays(now, 30);
    case "3m":
      return subMonths(now, 2);
    case "12m":
      return subMonths(now, 11);
    default:
      return subDays(now, 6);
  }
}
