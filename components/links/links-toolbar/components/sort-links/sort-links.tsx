"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortLinksItems } from "./utils/sort-links-items";
import { useSortLinks } from "@/lib/hooks/sort/useSortLinks";

export default function SortLinks() {
  const { handleChange, selectOpen, setSelectOpen } = useSortLinks();

  return (
    <>
      <Select
        onValueChange={handleChange}
        open={selectOpen}
        onOpenChange={setSelectOpen}
      >
        <SelectTrigger
          className={` py-5 cursor-pointer [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:text-foreground sm:flex-0 flex-1 ${
            selectOpen ? "[&>svg]:rotate-180" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <ArrowUpDown />
            <SelectValue placeholder="Sort by" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {sortLinksItems.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="cursor-pointer"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
