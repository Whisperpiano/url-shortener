"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "../../../../ui/input";
import { useLinksSearchBar } from "@/lib/hooks/searchbar/useLinksSearchBar";

export default function SearchLinksBar() {
  const { handleSearch, searchParams } = useLinksSearchBar();

  return (
    <div className="relative max-w-[300px] w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <SearchIcon className="h-5 w-5" />
      </div>
      <Input
        type="search"
        placeholder="Search link..."
        className="pl-10 py-5"
        onChange={handleSearch}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}
