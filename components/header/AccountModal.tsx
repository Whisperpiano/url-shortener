"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import { logout } from "@/lib/actions/auth/logout";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  LogOut,
  Settings,
  Loader2,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface Props {
  session: Session;
}

export default function AccountDropdown({ session }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (url: string) => {
    setDropdownOpen(false);
    router.push(url);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout();
  };

  return (
    <>
      {isLoggingOut && pathname !== "/" && (
        <div
          className="fixed inset-0 bg-background/5 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in"
          style={{
            animationDuration: "0.3s",
          }}
        >
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-normal text-muted-foreground">
              Logging out...
            </p>
          </div>
        </div>
      )}

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "cursor-pointer sm:block hidden"
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
            <span>A</span>
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

          <DropdownMenuItem
            className="text-sm mt-2 cursor-pointer"
            onClick={() => handleNavigation("/dashboard")}
          >
            <LayoutDashboard /> Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-sm mt-2 cursor-pointer"
            onClick={() => handleNavigation("/dashboard/analytics")}
          >
            <ChartNoAxesCombined /> Analytics
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-sm mt-2 cursor-pointer mb-2"
            onClick={() => handleNavigation("/account/settings")}
          >
            <Settings /> Settings
          </DropdownMenuItem>

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

      {/* Mobile */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "cursor-pointer sm:hidden block"
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
            <span>A</span>
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
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="w-full flex items-center text-sm gap-2 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>

            <button
              onClick={() => handleNavigation("/dashboard/analytics")}
              className="w-full flex items-center text-sm gap-2 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
            >
              <ChartNoAxesCombined className="h-4 w-4" />
              Analytics
            </button>

            <button
              onClick={() => handleNavigation("/account/settings")}
              className="w-full flex items-center text-sm gap-2 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>

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
    </>
  );
}
