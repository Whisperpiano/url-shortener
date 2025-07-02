"use client";

import { AlertTriangle, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/zod/user";
import { useProductUpdatesSettings } from "@/lib/hooks/settings/useProductUpdatesSettings";

export default function ProductUpdatesSettings({ user }: { user: UserData }) {
  const {
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    hasChanged,
    handleSwitchChange,
    currentUpdates,
  } = useProductUpdatesSettings(user);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Input
          type="email"
          id="email"
          placeholder={user.email || "Enter your email"}
          className="max-w-full lg:max-w-1/2"
          disabled
        />

        <Alert variant="default" className="mt-4 text-muted-foreground/90">
          <AlertTriangle size={16} />
          <AlertDescription className="text-muted-foreground/90">
            Your email address is fixed and cannot be edited. Use the toggle
            below to manage your subscription.
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-muted-foreground/20 mt-6">
        <div className="flex items-center gap-2">
          <Switch
            {...register("productUpdates")}
            checked={currentUpdates}
            onCheckedChange={handleSwitchChange}
            disabled={isSubmitting}
            className="cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-muted-foreground">
            Subscribed to product updates
          </span>
        </div>
        <Button
          variant="outline"
          type="submit"
          disabled={!hasChanged || isSubmitting}
          className="cursor-pointer ml-6"
        >
          <Save />
          Save
          <span className="sm:block hidden">changes</span>
        </Button>
      </CardFooter>
    </form>
  );
}
