import SearchBar from "./SearchBar";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import Login from "./Login";

export default async function Header() {
  return (
    <header className="max-w-7xl mx-auto p-4 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Link href={"/"}>
          <h1 className="font-mono tracking-widest font-medium text-base">
            Shortly
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <SearchBar />
        <ToggleTheme />
        <Login />
        {/* {session?.user ? (
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
        )} */}
      </div>
    </header>
  );
}
