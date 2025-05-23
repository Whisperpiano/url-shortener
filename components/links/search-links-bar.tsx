"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchLinksBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      if (e.target.value) {
        params.set("search", e.target.value);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    },
    200
  );

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
