"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Bug,
  HeartHandshake,
  Home,
  LayoutDashboard,
  Mail,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SearchBar() {
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
      <Button
        variant={"outline"}
        className="cursor-pointer text-muted-foreground transition-colors duration-300 hover:text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <Search />

        <span className="font-normal">Search documentation</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem asChild>
                <Link
                  href="/"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      setIsOpen(false);
                    }
                  }}
                >
                  <Home />
                  Home
                </Link>
              </CommandItem>
              <CommandItem asChild>
                <Link
                  href="/dashboard"
                  onClick={(e) => {
                    if (pathname === "/dashboard") {
                      e.preventDefault();
                      setIsOpen(false);
                    }
                  }}
                >
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </CommandItem>
              <CommandItem asChild>
                <Link
                  href="/account/settings"
                  onClick={(e) => {
                    if (pathname === "/account/settings") {
                      e.preventDefault();
                      setIsOpen(false);
                    }
                  }}
                >
                  <Settings />
                  Settings
                </Link>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Contribute">
              <CommandItem asChild>
                <Link
                  href="https://github.com/Whisperpiano/url-shortener"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <HeartHandshake />
                  Contribute
                </Link>
              </CommandItem>
              <CommandItem asChild>
                <Link
                  href="https://github.com/Whisperpiano/url-shortener/issues"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <Bug />
                  Report a bug
                </Link>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Contact">
              <CommandItem asChild>
                <Link
                  href="https://github.com/Whisperpiano"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <FaGithub />
                  GitHub
                </Link>
              </CommandItem>
              <CommandItem asChild>
                <Link
                  href="https://www.linkedin.com/in/jes%C3%BAs-alberola-herrero-896b61189/"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <FaLinkedin />
                  LinkedIn
                </Link>
              </CommandItem>
              <CommandItem asChild>
                <Link
                  href="mailto:jesusalberola90@gmail.com"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail />
                  Email
                </Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
