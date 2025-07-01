import { auth } from "@/app/auth";
import { SidebarTrigger } from "@/components/ui/sidebar";

import SearchBar from "@/components/layout/header/components/search-bar/search-bar";
import ToggleTheme from "@/components/layout/header/components/toggle-theme/toggle-theme";
import AccountModal from "@/components/layout/header/components/account-modal/account-modal";

type Props = {
  group: "Dashboard" | "Account";
  pageTitle: string;
};

export default async function DashboardHeader({ group, pageTitle }: Props) {
  const session = await auth();
  return (
    <section
      aria-label="Dashboard header"
      className="flex items-center justify-between py-6 border-b border-b-muted px-6"
    >
      <ul className="flex items-center space-x-2 ">
        <li className="flex items-center gap-1">
          <SidebarTrigger className="cursor-pointer" />
          <span className="text-sm text-muted-foreground">{group}</span>
        </li>
        <li className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">/</span>
        </li>
        <li>
          <span className="text-sm font-medium">{pageTitle}</span>
        </li>
      </ul>

      <nav className="flex items-center gap-2">
        <SearchBar isAuth={Boolean(session)} />
        <ToggleTheme />
        {session && <AccountModal session={session} />}
      </nav>
    </section>
  );
}
