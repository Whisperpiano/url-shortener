"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { UseCreateLinkType } from "@/lib/hooks/forms/useCreateLink";

import LinkFormContent from "../link-form-content/link-form-content";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formProps: UseCreateLinkType;
}

export default function CreateLinkFormMobile({
  open,
  setOpen,
  formProps,
}: Props) {
  const { generateSlug, setValue, reset } = formProps;

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
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

        <LinkFormContent formProps={{ ...formProps }} />
      </DrawerContent>
    </Drawer>
  );
}
