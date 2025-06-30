import { buttonVariants } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { menuItems } from "../../utils/account-modal-items";
import { cn } from "@/lib/utils";
import { LogOut, User as UserIcon } from "lucide-react";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

interface Props {
  session: Session;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => Promise<void>;
  handleNavigation: (url: string) => void;
}

export default function AccountModalDesktop({
  session,
  open,
  onOpenChange,
  handleLogout,
  handleNavigation,
}: Props) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "cursor-pointer sm:block hidden group"
        )}
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session?.user?.name || ""}
            width={40}
            height={40}
            className="w-full h-full rounded"
          />
        ) : (
          <span className="w-full h-full rounded-full flex items-center justify-center">
            <UserIcon className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-2 bg-background "
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center gap-3 px-2 py-3">
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="text-sm mt-2 cursor-pointer"
            onClick={() => handleNavigation(item.url)}
          >
            <item.icon /> {item.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="text-sm text-muted-foreground hover:text-foreground cursor-pointer mt-2 "
        >
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
