"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { RegisterFormSchema, RegisterFormTypes } from "@/lib/zod/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Check } from "lucide-react";
import {
  RegisterErrors,
  register as registerUser,
} from "@/lib/actions/auth/register";
import { Dispatch, SetStateAction } from "react";
import { login } from "@/lib/actions/auth/login";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { set } from "zod";

interface Props {
  onSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterForm({ onSubmitting, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<RegisterFormTypes>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormTypes) => {
    try {
      setError({});
      onSubmitting(true);

      const { success, errors } = await registerUser(data);

      if (!success) {
        return;
      }

      if (success) {
        await login("credentials", data);
      }

      setIsOpen(false);
    } catch (error) {
      console.log(error);
      // if (error instanceof Error) {
      //   onError({ _global: [error.message] });
      // }
    } finally {
      onSubmitting(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Sign up to create your account.
      </p>

      <div>
        <div className="flex flex-row justify-between items-center mb-1">
          <Label htmlFor="registerName" className="text-sm">
            Name <span className="text-red-400">*</span>
          </Label>

          {errors.name && dirtyFields.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}

          {!errors.name && dirtyFields.name && (
            <Check size={15} className="text-green-400" />
          )}
        </div>
        <Input
          {...register("name")}
          id="registerName"
          type="text"
          placeholder="John Doe"
          className={`py-5 ${
            errors.name && dirtyFields.name
              ? "border-red-400 focus-visible:ring-red-400/50"
              : dirtyFields.name
              ? "border-green-300 focus-visible:ring-green-300/50"
              : ""
          }`}
        />
      </div>

      <div>
        <div className="flex flex-row justify-between items-center mb-1">
          <Label htmlFor="registerEmail" className="text-sm">
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
          id="registerEmail"
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
          <Label htmlFor="registerPassword" className="text-sm">
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
          id="registerPassword"
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

      <Button
        variant={"default"}
        size={"lg"}
        className="cursor-pointer"
        disabled={isSubmitting}
      >
        Sign up
      </Button>

      {/* {state.errors.user && <p>{state.errors.user[0]}</p>} */}
    </form>
  );
}
