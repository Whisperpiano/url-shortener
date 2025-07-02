import { useState } from "react";
import { useForm } from "react-hook-form";
import { NameSettingsSchema, NameSettingsTypes } from "@/lib/zod/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateName } from "@/lib/actions/account/update-name";
import { toast } from "sonner";
import { useEffect } from "react";

export const useNameSettings = (name: string) => {
  const [optimisticName, setOptimisticName] = useState(name);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm<NameSettingsTypes>({
    resolver: zodResolver(NameSettingsSchema),
    defaultValues: {
      name: optimisticName,
    },
  });

  useEffect(() => {
    setOptimisticName(name);
    reset({ name });
  }, [name, reset]);

  const currentName = watch("name");
  const isDisabled = currentName === optimisticName || currentName.length < 3;

  const onSubmit = async (data: NameSettingsTypes) => {
    try {
      setOptimisticName(data.name);
      await updateName(data.name);
      toast.success("Name updated successfully.");
    } catch (error) {
      console.error(error);
      setOptimisticName(name);
      toast.error("Something went wrong while updating your name.");
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    isSubmitting,
    reset,
    optimisticName,
    setOptimisticName,
    onSubmit,
    isDisabled,
  };
};
