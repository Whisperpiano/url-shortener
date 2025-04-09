"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { deleteLink } from "@/lib/actions/links/delete";
import { toast } from "sonner";
import { DeleteLinkSchema, DeleteLinkTypes } from "@/lib/zod/links";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormInputs = {
  id: string;
};

export default function DeleteLinkButton({ id }: { id: string }) {
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("id")} type="hidden" value={id} />
      <Button variant="destructive" type="submit">
        {isSubmitting ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
