import {
  SubscribeToProductUpdatesSchema,
  SubscribeToProductUpdatesTypes,
} from "@/lib/zod/settings";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeToProductUpdates } from "@/lib/actions/account/subscribe";
import { toast } from "sonner";
import { UserData } from "@/lib/zod/user";

export const useProductUpdatesSettings = (user: UserData) => {
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

  return {
    register,
    handleSubmit,
    watch,
    isSubmitting,
    reset,
    optimisticUpdates,
    setOptimisticUpdates,
    onSubmit,
    hasChanged,
    handleSwitchChange,
    currentUpdates,
  };
};
