"use client";

import { Session } from "next-auth";
import { logout } from "@/lib/actions/auth/logout";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import LogOutModal from "./components/log-out-modal/log-out-modal";
import AccountModalDesktop from "./components/account-modal-desktop/account-modal-desktop";
import AccountModalMobile from "./components/account-modal-mobile/account-modal-mobile";

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
      {isLoggingOut && pathname !== "/" && <LogOutModal />}

      <AccountModalDesktop
        session={session}
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        handleLogout={handleLogout}
        handleNavigation={handleNavigation}
      />

      <AccountModalMobile
        session={session}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        handleLogout={handleLogout}
        handleNavigation={handleNavigation}
      />
    </>
  );
}
