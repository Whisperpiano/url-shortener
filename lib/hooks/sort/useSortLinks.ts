import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useSortLinks = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectOpen, setSelectOpen] = useState(false);

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    router.push(`?${newParams.toString()}`);
  };

  return {
    handleChange,
    selectOpen,
    setSelectOpen,
  };
};
