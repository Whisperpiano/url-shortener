import { RegisterFormSchema, RegisterFormTypes } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/lib/actions/auth/register";
import { login } from "@/lib/actions/auth/login";

interface Props {
  onSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const useRegisterForm = ({ onSubmitting, setIsOpen }: Props) => {
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

  const [errorAlert, setErrorAlert] = useState("");

  const onSubmit = async (data: RegisterFormTypes) => {
    try {
      onSubmitting(true);

      const { success, errors } = await registerUser(data);

      if ("user" in errors) {
        const errorMessage = errors.user?.[0] || "Unknown error";
        setErrorAlert(errorMessage);
        reset();
        return;
      }

      if (!success) {
        const errorMessage = errors._global?.[0] || "Unknown error";
        setErrorAlert(errorMessage);
        reset();
        return;
      }

      if (success) {
        setErrorAlert("");
        await login("credentials", data);
        window.location.href = "/dashboard";
      }

      setIsOpen(false);
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
