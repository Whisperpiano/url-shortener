"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function DisplayStyleButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select open={isOpen} onOpenChange={setIsOpen}>
      <SelectTrigger
        className={`w-[200px] cursor-pointer [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:text-foreground ${
          isOpen ? "[&>svg]:rotate-180" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal />
          <SelectValue placeholder="Display" />
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
    // <DropdownMenu>
    //   <DropdownMenuTrigger className="w-[200px]">
    //     <Button
    //       variant="outline"
    //       size={"default"}
    //       className="w-full items-center justify-start"
    //     >
    //       <SlidersHorizontal />
    //       Display
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>Profile</DropdownMenuItem>
    //     <DropdownMenuItem>Billing</DropdownMenuItem>
    //     <DropdownMenuItem>Team</DropdownMenuItem>
    //     <DropdownMenuItem>Subscription</DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
