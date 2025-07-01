import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { UseCreateLinkType } from "@/lib/hooks/forms/useCreateLink";
import { Globe, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";

import LinkFormContent from "../link-form-content/link-form-content";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formProps: UseCreateLinkType;
}

export default function CreateLinkFormDesktop({
  open,
  setOpen,
  formProps,
}: Props) {
  const { generateSlug, setValue, reset } = formProps;

  return (
    <Dialog
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
          <DialogDescription className="relative" />
          <LinkFormContent formProps={{ ...formProps }} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
