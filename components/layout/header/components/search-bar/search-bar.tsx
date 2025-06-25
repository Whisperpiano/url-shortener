"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import SearchTriggerButton from "./components/search-trigger-button";
import CommandDialogContent from "./components/command-dialog-content";

export default function SearchBar({ isAuth }: { isAuth: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SearchTriggerButton setIsOpen={setIsOpen} />

      <CommandDialogContent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isAuth={isAuth}
        pathname={pathname}
      />
    </>
  );
}
