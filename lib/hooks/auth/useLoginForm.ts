import { login } from "@/lib/actions/auth/login";
import { LoginFormSchema, LoginFormTypes } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const useLoginForm = ({ onSubmitting, setIsOpen }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorAlert, setErrorAlert] = useState("");

  const onSubmit = async (data: LoginFormTypes) => {
    try {
      onSubmitting(true);
      const response = await login("credentials", data);

      if (!response) {
        return;
      }

      const { success, errors } = response;

      if ("user" in errors) {
        const errorMessage = errors.user?.[0] || "Unknown error";
        setErrorAlert(errorMessage);
        reset();
        return;
      }
      if ("_global" in errors) {
        const errorMessage = errors._global?.[0] || "Unknown error";
        setErrorAlert(errorMessage);
        reset();
        return;
      }
      if (success) {
        window.location.href = "/dashboard";
        setIsOpen(false);
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorAlert(error.message);
      }
    } finally {
      onSubmitting(false);
      reset();
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitting },
    onSubmit,
    errorAlert,
    setErrorAlert,
  };
};
