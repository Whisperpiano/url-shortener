"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useLoginForm } from "@/lib/hooks/auth/useLoginForm";

interface Props {
  onSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ onSubmitting, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
    onSubmit,
    errorAlert,
  } = useLoginForm({ onSubmitting, setIsOpen });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
      {errorAlert && (
        <Alert variant="destructive" className=" border-red-400 bg-red-300/15">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorAlert}</AlertDescription>
        </Alert>
      )}

      <div>
        <div className="flex flex-row justify-between items-center mb-1.5">
          <Label htmlFor="loginEmail" className="text-sm">
            Email <span className="text-red-400">*</span>
          </Label>

          {errors.email && dirtyFields.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}

          {!errors.email && dirtyFields.email && (
            <Check size={15} className="text-green-400" />
          )}
        </div>
        <Input
          {...register("email")}
          id="loginEmail"
          type="email"
          placeholder="john.doe@example.com"
          className={`py-5 placeholder:text-sm text-sm ${
            errors.email && dirtyFields.email
              ? "border-red-400 focus-visible:ring-red-400/50"
              : dirtyFields.email
              ? "border-green-300 focus-visible:ring-green-300/50"
              : ""
          }`}
        />
      </div>

      <div>
        <div className="flex flex-row justify-between items-center mb-1.5">
          <Label htmlFor="loginPassword" className="text-sm">
            Password <span className="text-red-400">*</span>
          </Label>

          {errors.password && dirtyFields.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}

          {!errors.password && dirtyFields.password && (
            <Check size={15} className="text-green-400" />
          )}
        </div>
        <Input
          {...register("password")}
          id="loginPassword"
          type="password"
          placeholder="••••••••"
          className={`py-5 placeholder:text-sm text-sm ${
            errors.password && dirtyFields.password
              ? "border-red-400 focus-visible:ring-red-400/50"
              : dirtyFields.password
              ? "border-green-300 focus-visible:ring-green-300/50"
              : ""
          }`}
        />
      </div>

      <Button
        variant={"default"}
        size={"lg"}
        className="cursor-pointer mt-3 "
        disabled={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
}
