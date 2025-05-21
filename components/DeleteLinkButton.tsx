"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { deleteLink } from "@/lib/actions/links/delete";
import { toast } from "sonner";
import { DeleteLinkSchema, DeleteLinkTypes } from "@/lib/zod/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export type FormInputs = {
  id: string;
  disabled: boolean;
  onSuccess: () => void;
};

export default function DeleteLinkButton({
  id,
  disabled,
  onSuccess,
}: FormInputs) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DeleteLinkTypes>({
    resolver: zodResolver(DeleteLinkSchema),
    mode: "onChange",
    defaultValues: {
      id,
    },
  });

  const onSubmit = async (data: DeleteLinkTypes) => {
    try {
      const result = await deleteLink(data);

      if (result.success) {
        onSuccess();
        toast.success("The link was deleted successfully.");
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !disabled) {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, handleSubmit, onSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("id")} type="hidden" value={id} />
      <Button
        variant="destructive"
        type="submit"
        className="py-5 cursor-pointer hover:opacity-80"
        disabled={disabled}
      >
        {isSubmitting ? "Deleting..." : "Delete link"}
      </Button>
    </form>
  );
}
