"use client";

import { Check, ChevronsUpDown, LinkIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "@/lib/zod/links";
import { useRouter, useSearchParams } from "next/navigation";
import { getFaviconFromUrl } from "@/lib/utils/getFaviconFromUrl";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";

export default function UrlSwitcher({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");
  const [url, setUrl] = useState("");

  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (value: string, url: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set("key", value.toLowerCase());
    setUrl(url);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="inline-flex items-center gap-0">
      <div
        className={cn(
          buttonVariants({ variant: "outline" }),
          "rounded-r-none hover:bg-input/30! min-w-[49px] max-w-[49px] relative overflow-hidden"
        )}
      >
        {url === "" ? (
          <LinkIcon />
        ) : (
          <>
            <Image
              src={getFaviconFromUrl(url)}
              alt={url}
              width={24}
              height={24}
              className="absolute inset-0 w-full h-full object-cover blur-sm scale-125 opacity-25"
              aria-hidden="true"
            />
            <Image
              src={getFaviconFromUrl(url)}
              alt={url}
              width={15}
              height={15}
            />
          </>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between cursor-pointer rounded-l-none border-l-0"
          >
            <span className="text-muted-foreground font-normal">
              {value === "all"
                ? "All links"
                : value
                ? value
                : "Filter links..."}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Filter links..." />
            <CommandList>
              <CommandEmpty>No link found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all"
                  className="cursor-pointer"
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    handleChange(currentValue, "");
                  }}
                >
                  <LinkIcon />
                  All links
                  <Check
                    className={cn(
                      "ml-auto",
                      value === "all" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
                {links.map((link) => (
                  <CommandItem
                    key={link.id}
                    value={link.slug}
                    className="cursor-pointer"
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                      handleChange(currentValue, link.url);
                    }}
                  >
                    <Image
                      src={getFaviconFromUrl(link.url)}
                      alt={link.url}
                      width={18}
                      height={18}
                    />
                    /{link.slug}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === link.slug ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
