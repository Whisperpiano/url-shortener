"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormTypes } from "@/lib/zod/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { login } from "@/lib/actions/auth/login";
import { toast } from "sonner";
import { useRouter } from "next/router";

interface Props {
  onSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ onSubmitting, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormTypes) => {
    try {
      await login("credentials", data);
    } catch (error) {
      console.error("Error during login:", error);

      if (error instanceof Error) {
        alert(`Login failed: ${error.message}`);
      } else {
        alert("An unexpected error occurred during login.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Sign in to your account.</p>

      <div>
        <div className="flex flex-row justify-between items-center mb-1">
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
          className={`py-5 ${
            errors.email && dirtyFields.email
              ? "border-red-400 focus-visible:ring-red-400/50"
              : dirtyFields.email
              ? "border-green-300 focus-visible:ring-green-300/50"
              : ""
          }`}
        />
      </div>

      <div>
        <div className="flex flex-row justify-between items-center mb-1">
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
          className={`py-5 ${
            errors.password && dirtyFields.password
              ? "border-red-400 focus-visible:ring-red-400/50"
              : dirtyFields.password
              ? "border-green-300 focus-visible:ring-green-300/50"
              : ""
          }`}
        />
      </div>

      <Button variant={"default"} size={"lg"} className="cursor-pointer">
        Sign in
      </Button>
    </form>
  );
}
