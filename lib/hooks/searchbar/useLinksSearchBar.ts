import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const useLinksSearchBar = () => {
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

  return {
    handleSearch,
    searchParams,
  };
};
