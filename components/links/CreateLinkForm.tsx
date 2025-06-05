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
import {
  ArrowLeft,
  CalendarIcon,
  Check,
  CircleHelp,
  Globe,
  Plus,
  Shuffle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import { CreateLinkSchema, CreateLinkTypes } from "@/lib/zod/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { createLink } from "@/lib/actions/links/create";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { FaCrown } from "react-icons/fa";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

export default function CreateLinkForm() {
  const [isGeneratingSlug, setIsGeneratingSlug] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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

    if (!test.success && typeof test.error === "string") {
      toast.error(test.error);
      setError("slug", {
        type: "manual",
        message: "This short URL is already taken. Please try another one.",
      });
      return;
    }
    toast.success("Link created successfully!");
    setDrawerOpen(false);
    setDialogOpen(false);
    reset();
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (open) {
            const test = generateSlug();
            setValue("slug", test);
          } else {
            reset();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="cursor-pointer py-5 sm:flex hidden"
            size={"default"}
          >
            <span className="sm:block hidden">Create link</span>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span className="text-sm">New link</span>
              </div>
            </DialogTitle>
            <Separator className="mt-4" />
            <DialogDescription className="relative"></DialogDescription>
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                          The URL your visitors will be redirected to when they
                          click on your link.
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
                    <p className="text-xs text-red-400">
                      {errors.slug.message}
                    </p>
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
                          {isGeneratingSlug ? (
                            <Spinner size={16} />
                          ) : (
                            <Shuffle />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[180px] text-center">
                        Use this button to generate a random short URL.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="options">
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "py-5 justify-between hover:no-underline cursor-pointer group text-muted-foreground [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2 ">
                      <Badge variant="outline" className="bg-blue-300/25">
                        <FaCrown className="p-0.5" />
                        PRO
                      </Badge>
                      Advanced options
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 border rounded-md bg-muted-background mt-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor="description"
                            className="font-medium text-muted-foreground text-sm"
                          >
                            Description
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
                                Short description for your link to help people
                                understand what it is about.
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <Textarea
                        {...register("description")}
                        placeholder="Short description"
                        id="description"
                        className="resize-none max-h-[120px] min-h-[120px] h-full"
                        disabled
                      />
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor="expirationDate"
                            className="font-medium text-muted-foreground text-sm"
                          >
                            Expiration date
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
                                Set an expiration date for your link to
                                automatically expire and be deleted.
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <Popover
                        modal={true}
                        open={popoverOpen}
                        onOpenChange={setPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            disabled
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal py-5",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(date) => {
                              setDate(date);
                              setPopoverOpen(false);
                            }}
                            disabled={(date) => {
                              const tomorrow = new Date();
                              tomorrow.setDate(tomorrow.getDate() + 1);
                              tomorrow.setHours(0, 0, 0, 0);
                              return date < tomorrow;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />

              <div className="flex gap-2 items-center justify-between">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="py-5 cursor-pointer text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft />
                    Go back
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
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Drawer
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open);
          if (open) {
            const test = generateSlug();
            setValue("slug", test);
          } else {
            reset();
          }
        }}
      >
        <DrawerTrigger asChild>
          <Button
            variant="default"
            className="cursor-pointer py-5 sm:hidden flex"
            size="default"
          >
            <span className="sm:block hidden">Create link</span>
            <Plus />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="px-4 pb-6">
          <DrawerHeader className="sr-only">
            <DrawerTitle />

            <DrawerDescription className="mt-1"></DrawerDescription>
          </DrawerHeader>

          <form
            className="flex flex-col gap-6 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                        The URL your visitors will be redirected to when they
                        click on your link.
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

            <Accordion type="single" collapsible>
              <AccordionItem value="options">
                <AccordionTrigger
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "py-5 justify-between hover:no-underline cursor-pointer group text-muted-foreground [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2 ">
                    <Badge variant="outline" className="bg-blue-300/25">
                      <FaCrown className="p-0.5" />
                      PRO
                    </Badge>
                    Advanced options
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 border rounded-md bg-muted-background mt-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="description"
                          className="font-medium text-muted-foreground text-sm"
                        >
                          Description
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
                              Short description for your link to help people
                              understand what it is about.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <Textarea
                      {...register("description")}
                      placeholder="Short description"
                      id="description"
                      className="resize-none max-h-[120px] min-h-[120px] h-full"
                      disabled
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="expirationDate"
                          className="font-medium text-muted-foreground text-sm"
                        >
                          Expiration date
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
                              Set an expiration date for your link to
                              automatically expire and be deleted.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <Popover
                      modal={true}
                      open={popoverOpen}
                      onOpenChange={setPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          disabled
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal py-5",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => {
                            setDate(date);
                            setPopoverOpen(false);
                          }}
                          disabled={(date) => {
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(0, 0, 0, 0);
                            return date < tomorrow;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            <div className="flex flex-col gap-6 items-center justify-between">
              <Button
                type="submit"
                variant="default"
                className="cursor-pointer w-full"
                disabled={isGeneratingSlug}
              >
                Create link
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="py-5 cursor-pointer text-muted-foreground hover:text-foreground w-full"
                >
                  <ArrowLeft />
                  Go back
                </Button>
              </DrawerClose>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
