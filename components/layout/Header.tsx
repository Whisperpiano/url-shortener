import { FaLink } from "react-icons/fa";

import Link from "next/link";
import SearchBar from "../header/SearchBar";
import ToggleTheme from "../header/ToggleTheme";
import AuthModal from "../header/AuthModal";
import AccountModal from "../header/AccountModal";
import { auth } from "@/app/auth";

export default async function Header() {
  const session = await auth();
  console.log(session);

  return (
    <header className="max-w-7xl mx-auto p-4 flex items-center justify-between">
      <Link
        href={"/"}
        className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-200"
      >
        <FaLink />
        <h1 className="font-mono tracking-widest font-medium text-base">
          Shortly
        </h1>
      </Link>

      <div className="flex items-center gap-2">
        <SearchBar />
        <ToggleTheme />
        {session ? <AccountModal session={session} /> : <AuthModal />}
      </div>
    </header>
  );
}
