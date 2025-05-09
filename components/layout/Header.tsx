import { auth } from "@/app/auth";

import SearchBar from "../header/SearchBar";
import ToggleTheme from "../header/ToggleTheme";
import AuthModal from "../header/AuthModal";
import AccountModal from "../header/AccountModal";
import Logo from "./logo";

export default async function Header() {
  const session = await auth();
  console.log(session);

  return (
    <header className="max-w-7xl mx-auto p-4 flex items-center justify-between">
      <Logo />
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <SearchBar />
          </li>
          <li>
            <ToggleTheme />
          </li>
          <li>
            {session ? <AccountModal session={session} /> : <AuthModal />}
          </li>
        </ul>
      </nav>
    </header>
  );
}
