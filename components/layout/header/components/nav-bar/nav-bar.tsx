import { auth } from "@/app/auth";

import SearchBar from "../search-bar/search-bar";
import ToggleTheme from "../toggle-theme/toggle-theme";
import AuthModal from "../auth-modal/auth-modal";
import AccountModal from "../account-modal/account-modal";

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
