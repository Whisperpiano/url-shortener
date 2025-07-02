"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useNameSettings } from "@/lib/hooks/settings/useNameSettings";

export default function NameSettings({ name }: { name: string }) {
  const {
    register,
    handleSubmit,
    onSubmit,
    optimisticName,
    isDisabled,
    isSubmitting,
  } = useNameSettings(name);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <Input
          {...register("name")}
          type="text"
          id="name"
          placeholder="Enter your name"
          className="lg:max-w-1/2 max-w-full"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-muted-foreground/20 mt-6">
        <span
          className={`text-xs sm:text-sm ${
            optimisticName.length < 3
              ? "text-destructive"
              : "text-muted-foreground"
          }`}
        >
          Min 3 characters.
        </span>
        <Button
          variant="outline"
          type="submit"
          className="cursor-pointer ml-6"
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
              Save
              <span className="sm:block hidden"> changes</span>
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  );
}
