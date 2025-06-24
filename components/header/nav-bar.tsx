import { auth } from "@/app/auth";

import AuthModal from "./auth-modal";
import SearchBar from "./search-bar/search-bar";
import ToggleTheme from "./toggle-theme";
import AccountModal from "./account-modal";

export default async function NavBar() {
  const session = await auth();
  return (
    <nav>
      <ul className="flex items-center gap-2">
        <li>
          <SearchBar isAuth={Boolean(session)} />
        </li>
        <li>
          <ToggleTheme />
        </li>
        <li className="flex items-center">
          {session ? <AccountModal session={session} /> : <AuthModal />}
        </li>
      </ul>
    </nav>
  );
}
