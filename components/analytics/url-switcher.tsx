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

export default function UrlSwitcher({
  links,
  selectedLink,
}: {
  links: Link[];
  selectedLink?: Link;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedLink?.slug || "all");
  const [url, setUrl] = useState(selectedLink?.url || "");

  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (value: string, url: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set("key", value.toLowerCase());
    setUrl(url);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-0 sm:w-fit w-full">
      {/* {url !== "" && (
        <Image
          src={getFaviconFromUrl(url)}
          alt={url}
          width={24}
          height={24}
          className="saturate-150 contrast-125 hue-rotate-15 absolute inset-0 w-full h-full object-cover blur-[150px] scale-x-150 opacity-25 -z-1 mask-t-from-50% mask-b-from-10%"
          aria-hidden="true"
        />
      )} */}

      <div
        className={cn(
          buttonVariants({ variant: "outline" }),
          "rounded-r-none hover:bg-input/30! min-w-[49px] max-w-[49px] py-5"
        )}
      >
        {url === "" ? (
          <LinkIcon />
        ) : (
          <Image
            src={getFaviconFromUrl(url)}
            alt={url}
            width={20}
            height={20}
            className="rounded-full"
          />
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="py-5 sm:w-[250px]   flex-1 justify-between cursor-pointer rounded-l-none border-l-0 "
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
        <PopoverContent className="flex w-[calc(100vw-62px)] sm:w-[250px] sm:translate-x-0 -translate-x-1 mx-7 py-1">
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
                      className="rounded-full"
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
