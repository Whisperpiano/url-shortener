import { buttonVariants } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { menuItems } from "../../utils/account-modal-items";
import { LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Image from "next/image";

interface Props {
  session: Session;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => Promise<void>;
  handleNavigation: (url: string) => void;
}

export default function AccountModalMobile({
  session,
  open,
  onOpenChange,
  handleLogout,
  handleNavigation,
}: Props) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "cursor-pointer sm:hidden block group"
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
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <DrawerHeader className="mb-4">
          <DrawerTitle className="text-base">
            {session?.user?.name || "User"}
          </DrawerTitle>
          <p className="text-xs text-muted-foreground">
            {session?.user?.email}
          </p>
        </DrawerHeader>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.url)}
              className="w-full flex items-center text-sm gap-2 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center text-sm gap-2 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
