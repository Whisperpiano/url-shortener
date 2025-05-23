"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SortLinks() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <Select onValueChange={handleChange} open={isOpen} onOpenChange={setIsOpen}>
      <SelectTrigger
        className={`py-5 cursor-pointer [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:text-foreground ${
          isOpen ? "[&>svg]:rotate-180" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <ArrowUpDown />
          <SelectValue placeholder="Sort by" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest" className="cursor-pointer">
          Newest first
        </SelectItem>
        <SelectItem value="oldest" className="cursor-pointer">
          Oldest first
        </SelectItem>
        <SelectItem value="clicks-desc" className="cursor-pointer">
          Most clicked
        </SelectItem>
        <SelectItem value="clicks-asc" className="cursor-pointer">
          Least clicked
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
