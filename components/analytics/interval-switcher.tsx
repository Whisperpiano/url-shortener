"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CalendarFold } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function IntervalSwitcher() {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set("interval", value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <Select
      defaultValue="7d"
      onValueChange={handleChange}
      value={params.get("interval") || "7d"}
    >
      <SelectTrigger className="cursor-pointer py-5 @[650px]:flex-0 flex-1 w-full max-h-11">
        <div className="flex items-center gap-2 ">
          <CalendarFold />
          <SelectValue placeholder="Interval" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="24h" className="cursor-pointer">
          Last 24 hours
        </SelectItem>
        <SelectItem value="7d" className="cursor-pointer">
          Last 7 days
        </SelectItem>
        <SelectItem value="14d" className="cursor-pointer">
          Last 14 days
        </SelectItem>
        <SelectItem value="30d" className="cursor-pointer">
          Last 30 days
        </SelectItem>
        <SelectItem value="3m" className="cursor-pointer">
          Last 3 months
        </SelectItem>
        <SelectItem value="12m" className="cursor-pointer">
          Last 12 months
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
