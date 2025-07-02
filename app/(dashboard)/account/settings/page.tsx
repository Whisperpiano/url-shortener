import { auth } from "@/app/auth";
import { settingsItems } from "@/components/settings/utils/settings-items";
import { getUserById } from "@/lib/queries/users";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/layout/dashboard/components/dashboard-header";
import AvatarSettings from "@/components/settings/avatar-settings/avatar-settings";
import DeleteAccountSettings from "@/components/settings/delete-account-settings/delete-account-settings";
import NameSettings from "@/components/settings/name-settings/name-settings";
import ProductUpdatesSettings from "@/components/settings/product-updates-settings/product-updates-settings";
import SettingCard from "@/components/settings/setting-card/setting-card";
import ThemeSettings from "@/components/settings/theme-settings/theme-settings";
import ErrorMessage from "@/components/settings/error-message/error-message";

export const metadata = {
  title: "Settings",
  description: "Your settings for Shortleap",
};

export default async function Settings() {
  const session = await auth();

  if (!session) {
    redirect("/?login");
  }

  const user = await getUserById(session?.user?.id || "");

  if (!user.data) {
    return <ErrorMessage error={user.error || "Failed to load user data"} />;
  }

  const { name, email, avatar, theme, deleteAccount } = settingsItems;
  const fallbackAvatar =
    "https://plus.unsplash.com/premium_photo-1674168441558-d73e95b2b751?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <main className="w-full">
      <DashboardHeader group="Account" pageTitle="Settings" />
      <section className="p-6 max-w-7xl mx-auto animate-fade-in-up">
        <section className="flex flex-col gap-4">
          <SettingCard title={name.title} description={name.description}>
            <NameSettings name={session?.user?.name || ""} />
          </SettingCard>

          <SettingCard title={email.title} description={email.description}>
            <ProductUpdatesSettings user={user.data} />
          </SettingCard>

          <SettingCard title={avatar.title} description={avatar.description}>
            <AvatarSettings userAvatar={user.data.image || fallbackAvatar} />
          </SettingCard>

          <SettingCard title={theme.title} description={theme.description}>
            <ThemeSettings />
          </SettingCard>

          <SettingCard
            title={deleteAccount.title}
            description={deleteAccount.description}
            className="border-[var(--destructive)]"
          >
            <DeleteAccountSettings session={session} />
          </SettingCard>
        </section>
      </section>
    </main>
  );
}
