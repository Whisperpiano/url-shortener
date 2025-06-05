"use client";

import { AlertTriangle, Save } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { UserData } from "@/lib/zod/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { subscribeToProductUpdates } from "@/lib/actions/account/subscribe";
import { useForm } from "react-hook-form";
import {
  SubscribeToProductUpdatesSchema,
  SubscribeToProductUpdatesTypes,
} from "@/lib/zod/settings";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProductUpdatesSettings({ user }: { user: UserData }) {
  const [optimisticUpdates, setOptimisticUpdates] = useState(
    user.productUpdates
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<SubscribeToProductUpdatesTypes>({
    resolver: zodResolver(SubscribeToProductUpdatesSchema),
    defaultValues: {
      productUpdates: optimisticUpdates,
    },
  });

  useEffect(() => {
    setOptimisticUpdates(user.productUpdates);
    reset({ productUpdates: user.productUpdates });
  }, [user.productUpdates, reset]);

  const currentUpdates = watch("productUpdates");
  const hasChanged = currentUpdates !== optimisticUpdates;

  const handleSwitchChange = (checked: boolean) => {
    setValue("productUpdates", checked, { shouldValidate: true });
  };

  const onSubmit = async (data: SubscribeToProductUpdatesTypes) => {
    try {
      setOptimisticUpdates(data.productUpdates);

      const { success, error } = await subscribeToProductUpdates(
        data.productUpdates
      );

      if (!success || error) {
        setValue("productUpdates", optimisticUpdates);
        throw new Error(error);
      }

      if (data.productUpdates) {
        toast.success("Thank you for subscribing to product updates!");
      } else {
        toast.success("Unsubscribed from product updates.");
      }
    } catch (error) {
      console.error(error);
      setValue("productUpdates", optimisticUpdates);
      toast.error("Something went wrong. Your changes have been reverted.");
    }
  };

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
