"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button, buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Check, CircleHelp, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import { CreateLinkSchema, CreateLinkTypes } from "@/lib/zod/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLink } from "@/lib/actions/links/create";

export default function CreateLinkForm() {
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<CreateLinkTypes>({
    resolver: zodResolver(CreateLinkSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
      slug: generateSlug(),
      description: "",
    },
  });

  function generateSlug() {
    const randomString = Math.random().toString(36).substring(2, 8);
    return randomString;
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
    console.log(test);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <Label
            htmlFor="url"
            className="font-medium text-muted-foreground text-sm "
          >
            Destination URL
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={16} />
                </TooltipTrigger>
                <TooltipContent className="max-w-[240px] text-center">
                  The URL your visitors will be redirected to when they click on
                  your link.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>

          {errors.url && (
            <p className="text-xs text-red-400">{errors.url.message}</p>
          )}

          {!errors.url && dirtyFields.url && (
            <Check size={15} className="text-green-400" />
          )}
        </div>

        <Input
          {...register("url")}
          placeholder="https://www.example.com"
          id="url"
          className={`py-5 placeholder:text-sm text-sm ${
            errors.url
              ? "border-red-400 focus-visible:ring-red-400/50"
              : dirtyFields.url
              ? "border-green-300 focus-visible:ring-green-300/50"
              : ""
          }`}
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label
            htmlFor="slug"
            className="font-medium text-muted-foreground text-sm "
          >
            Short URL
          </Label>

          {errors.slug && (
            <p className="text-xs text-red-400">{errors.slug.message}</p>
          )}

          {!errors.slug && dirtyFields.slug && (
            <Check size={15} className="text-green-400" />
          )}
        </div>
        <div
          className={`flex items-center ${
            errors.slug
              ? "border rounded-sm border-red-400 focus-visible:ring-red-400/50"
              : dirtyFields.slug
              ? "border rounded-sm border-green-300 focus-visible:ring-green-300/50"
              : ""
          }`}
        >
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "text-sm rounded-r-none text-muted-foreground hover:text-muted-foreground border-r-0 bg-none hover:bg-none py-5"
            )}
          >
            shortly.link/
          </div>
          <Input
            {...register("slug")}
            id="slug"
            className="rounded-none placeholder:text-sm py-5"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-l-none border-l-0 cursor-pointer py-5"
                  onClick={handleGenerateSlug}
                  disabled={isGeneratingSlug}
                >
                  {isGeneratingSlug ? <Spinner size={16} /> : <Shuffle />}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[180px] text-center">
                Use this button to generate a random short URL.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div>
        <Label
          htmlFor="description"
          className="font-medium text-muted-foreground text-sm mb-2"
        >
          Description
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp size={16} />
              </TooltipTrigger>
              <TooltipContent className="max-w-[240px] text-center">
                Short description for your link to help people understand what
                it is about.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Textarea
          {...register("description")}
          placeholder="Short description"
          id="description"
          className="resize-none max-h-[120px] min-h-[120px] h-full"
        />
      </div>
      <div className="flex gap-2 items-center justify-end">
        <DialogClose asChild>
          <Button variant="outline" className="py-5 cursor-pointer">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          variant="default"
          className="cursor-pointer"
          disabled={isGeneratingSlug}
        >
          Create link
        </Button>
      </div>
    </form>
  );
}
