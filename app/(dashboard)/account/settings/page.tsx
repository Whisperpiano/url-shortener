import { auth } from "@/app/auth";
import DashboardHeader from "@/components/layout/dashboard/dashboard-header";
import ThemeSettings from "@/components/settings/theme-settings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, CloudUpload, Save, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function Settings() {
  const session = await auth();
  console.log(session);

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
            <CardContent>
              <form>
                <Input
                  type="text"
                  id="name"
                  placeholder={session?.user?.name || "Enter your name"}
                  className="max-w-1/2"
                />
              </form>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-muted-foreground/20">
              <span className="text-sm text-muted-foreground">
                Max 32 characters.
              </span>
              <Button variant="outline">
                <Save />
                Save changes
              </Button>
            </CardFooter>
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
            <CardContent>
              <form>
                <Input
                  type="email"
                  id="email"
                  placeholder={session?.user?.email || "Enter your name"}
                  className="max-w-1/2"
                  disabled
                />

                <Alert
                  variant="default"
                  className="mt-4 text-muted-foreground/90"
                >
                  <AlertTriangle size={16} />
                  <AlertDescription className="text-muted-foreground/90">
                    Your email address is fixed and cannot be edited. Use the
                    toggle below to manage your subscription to product updates.
                  </AlertDescription>
                </Alert>
              </form>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-muted-foreground/20">
              <div className="flex items-center gap-2">
                <Switch />
                <span className="text-sm text-muted-foreground">
                  Subscribed to product updates
                </span>
              </div>
              <Button variant="outline">
                <Save />
                Save changes
              </Button>
            </CardFooter>
          </Card>

          {/* Avatar*/}
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>
                Upload a profile picture to represent your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div>
                  <Label
                    htmlFor="picture"
                    className="relative inline-flex border-2 border-muted-foreground/20 rounded-full aspect-square group cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={session?.user?.image || "/placeholder.png"}
                      alt="Profile picture"
                      width={54}
                      height={54}
                      className="rounded-full object-cover group-hover:opacity-0 transition "
                    />
                    <CloudUpload
                      size={16}
                      className="absolute inset-0 m-auto opacity-0 transition group-hover:opacity-100"
                    />
                  </Label>
                  <Input id="picture" type="file" className="hidden" />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-muted-foreground/20">
              <span className="text-sm text-muted-foreground">
                Square image recommended. Accepted file types: .png, .jpg. Max
                file size: 2MB.
              </span>
              <Button variant="outline">
                <Save />
                Save changes
              </Button>
            </CardFooter>
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
            <CardContent>
              <ThemeSettings />
            </CardContent>
          </Card>

          <Card className="border-[var(--destructive)]">
            <CardHeader>
              <CardTitle>Delete account</CardTitle>
              <CardDescription>
                Permantly delete your account and all associated links and
                stats. This action cannot be undone.
              </CardDescription>
            </CardHeader>

            <CardFooter className="border-t border-[var(--destructive)]/50">
              <Button variant="destructive" className="ml-auto">
                <Trash2 />
                Delete
              </Button>
            </CardFooter>
          </Card>
        </section>
      </section>
    </>
  );
}
