"use client";

import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { NameSettingsSchema, NameSettingsTypes } from "@/lib/zod/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateName } from "@/lib/actions/account/update-name";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";

export default function NameSettings({ name }: { name: string }) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Input
          {...register("name")}
          type="text"
          id="name"
          placeholder="Enter your name"
          className="max-w-1/2"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-muted-foreground/20 mt-6">
        <span
          className={`text-sm ${
            currentName.length < 3
              ? "text-destructive"
              : "text-muted-foreground"
          }`}
        >
          Min 3 characters.
        </span>
        <Button
          variant="outline"
          type="submit"
          className="cursor-pointer min-w-[135px]"
          disabled={isDisabled || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner size={16} />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Save />
              <span>Save changes</span>
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}
