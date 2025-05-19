import { auth } from "@/app/auth";

import SearchBar from "../header/SearchBar";
import ToggleTheme from "../header/ToggleTheme";
import AuthModal from "../header/AuthModal";
import AccountModal from "../header/AccountModal";
import Logo from "./logo";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-background/5 backdrop-blur border-b">
      <div className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
        <div className="border-x"></div>
        <div className="flex items-center justify-between p-6">
          <Logo />
          <nav>
            <ul className="flex items-center gap-2">
              <li>
                <SearchBar />
              </li>
              <li>
                <ToggleTheme />
              </li>
              <li className="flex items-center">
                {session ? <AccountModal session={session} /> : <AuthModal />}
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-x"></div>
      </div>
    </header>
  );
}
