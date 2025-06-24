import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { commandGroups } from "./menu-item";

import Link from "next/link";

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
                {group.items.map(({ href, label, icon, external }) => (
                  <CommandItem asChild key={href}>
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      onClick={(e) => {
                        if (!external && pathname === href) {
                          e.preventDefault();
                        }
                        setIsOpen(false);
                      }}
                    >
                      {icon}
                      {label}
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
