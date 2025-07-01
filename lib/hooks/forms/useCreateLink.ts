import { createLink } from "@/lib/actions/links/create";
import { CreateLinkSchema, CreateLinkTypes } from "@/lib/zod/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCreateLink = (
  setOpen: Dispatch<SetStateAction<boolean>>,
  setDrawerOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [isGeneratingSlug, setIsGeneratingSlug] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<CreateLinkTypes>({
    resolver: zodResolver(CreateLinkSchema),
    mode: "onChange",
  });

  function generateSlug() {
    return Math.random().toString(36).substring(2, 8);
  }

  const handleGenerateSlug = () => {
    if (isGeneratingSlug) return;
    setIsGeneratingSlug(true);

    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 8);
      setValue("slug", randomString);
      setIsGeneratingSlug(false);
    }, 300);
  };

  const onSubmit = async (data: CreateLinkTypes) => {
    const test = await createLink(data);

    if (!test.success && typeof test.error === "string") {
      toast.error(test.error);
      setError("slug", {
        type: "manual",
        message: "This short URL is already taken. Please try another one.",
      });
      return;
    }
    toast.success("Link created successfully!");
    reset();
    setOpen(false);
    setDrawerOpen(false);
  };

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    errors,
    dirtyFields,
    isGeneratingSlug,
    handleGenerateSlug,
    generateSlug,
    onSubmit,
    date,
    setDate,
    popoverOpen,
    setPopoverOpen,
  };
};

export type UseCreateLinkType = ReturnType<typeof useCreateLink>;
