import { FaLink } from "react-icons/fa";

import Link from "next/link";
import Login from "../header/Login";
import SearchBar from "../header/SearchBar";
import ToggleTheme from "../header/ToggleTheme";

export default async function Header() {
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
        <Login />
      </div>
    </header>
  );
}

{
  /* {session?.user ? (
  <img
    src={session.user.image || ""}
    alt={session.user.name || ""}
    width={24}
    height={24}
    className="h-8 w-8 rounded"
    referrerPolicy="no-referrer"
  />
) : (
  <>
    <Link
      href="/dashboard"
      className={cn(buttonVariants({ variant: "default" }))}
    >
      Sign in
    </Link>
  </>
)} */
}
