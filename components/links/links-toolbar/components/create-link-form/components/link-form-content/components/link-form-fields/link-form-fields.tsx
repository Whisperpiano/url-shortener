import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { UseCreateLinkType } from "@/lib/hooks/forms/useCreateLink";
import { cn } from "@/lib/utils";
import { Check, CircleHelp, Shuffle } from "lucide-react";

interface Props {
  formProps: UseCreateLinkType;
}

export default function LinkFormFields({ formProps }: Props) {
  const {
    register,
    errors,
    dirtyFields,
    handleGenerateSlug,
    isGeneratingSlug,
  } = formProps;

  return (
    <>
      <div className="mt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="url"
              className="font-medium text-muted-foreground text-sm"
            >
              Destination URL
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp
                    size={16}
                    className="cursor-help text-muted-foreground hover:text-foreground"
                  />
                </TooltipTrigger>
                <TooltipContent className="max-w-[240px] text-center">
                  The URL your visitors will be redirected to when they click on
                  your link.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

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
            shortleap.vercel.app/
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
    </>
  );
}
