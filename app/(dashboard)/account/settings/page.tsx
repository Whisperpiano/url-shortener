import { auth } from "@/app/auth";
import DashboardHeader from "@/components/layout/dashboard/dashboard-header";
import AvatarSettings from "@/components/settings/avatar-settings";
import DeleteAccountSettings from "@/components/settings/delete-account-settings";
import NameSettings from "@/components/settings/name-settings";
import ProductUpdatesSettings from "@/components/settings/product-updates-settings";
import ThemeSettings from "@/components/settings/theme-settings";
// import ThemeSettings from "@/components/settings/theme-settings";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getUserById } from "@/lib/queries/users";

export default async function Settings() {
  const session = await auth();
  const user = await getUserById(session?.user?.id || "");

  console.log(session);

  if (!user.data) {
    return <div>{user.error}</div>;
  }

  if (!session) {
    return <div>You are not signed in</div>;
  }

  return (
    <>
      <DashboardHeader group="Account" pageTitle="Settings" />
      <section className="mt-10 px-6 max-w-7xl mx-auto">
        <section className="flex flex-col gap-4">
          {/* Name */}
          <Card>
            <CardHeader>
              <CardTitle>Name</CardTitle>
              <CardDescription>
                Choose a name to represent your profile. It can be your real
                name or a nickname.
              </CardDescription>
            </CardHeader>
            <NameSettings name={session?.user?.name || ""} />
          </Card>
          {/* Email */}
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                This email address will be used to send account-related
                notifications.
              </CardDescription>
            </CardHeader>
            <ProductUpdatesSettings user={user.data} />
          </Card>

          {/* Avatar*/}
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>
                Upload a profile picture to represent your account.
              </CardDescription>
            </CardHeader>
            <AvatarSettings
              userAvatar={
                user.data.image ||
                "https://plus.unsplash.com/premium_photo-1674168441558-d73e95b2b751?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </Card>

          {/* Theme options */}
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Select your preferred theme. You can choose dark, light, or
                follow your system settings.
              </CardDescription>
            </CardHeader>

            <ThemeSettings />
          </Card>

          {/* Delete account */}

          <Card className="border-[var(--destructive)]">
            <CardHeader>
              <CardTitle>Delete account</CardTitle>
              <CardDescription>
                Permantly delete your account and all associated links and
                stats. This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <DeleteAccountSettings session={session} />
          </Card>
        </section>
      </section>
    </>
  );
}
