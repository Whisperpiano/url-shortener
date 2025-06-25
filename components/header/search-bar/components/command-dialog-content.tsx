import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import Link from "next/link";
import { commandGroups } from "../utils/searchbar-items";

interface CommandDialogContentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isAuth: boolean;
  pathname: string;
}

export default function CommandDialogContent({
  isOpen,
  setIsOpen,
  isAuth,
  pathname,
}: CommandDialogContentProps) {
  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commandGroups.map((group) => {
            if (group.heading === "Suggestions" && !isAuth) return null;

            return (
              <CommandGroup key={group.heading} heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem asChild key={item.href}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      onClick={(e) => {
                        if (!item.external && pathname === item.href) {
                          e.preventDefault();
                        }
                        setIsOpen(false);
                      }}
                    >
                      <item.icon />
                      {item.label}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
