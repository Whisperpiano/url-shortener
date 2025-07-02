import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ArrowLeft, CornerDownRight, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getFaviconFromUrl } from "@/lib/utils/getFaviconFromUrl";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link as LinkType } from "@/lib/zod/links";

import Image from "next/image";
import DeleteLinkButton from "@/components/DeleteLinkButton";

interface DeleteLinkDialogProps {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
  link: LinkType;
}

export default function DeleteLinkDialog({
  openDeleteDialog,
  setOpenDeleteDialog,
  link,
}: DeleteLinkDialogProps) {
  const [value, setValue] = useState("");

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Trash size={14} />
              <span className="text-base">Delete link</span>
            </div>
          </DialogTitle>
          <DialogDescription />
          <Separator className="mt-2" />
          <div className="my-4 text-sm text-muted-foreground">
            <p>Are you sure you want to delete this link?</p>
            <p className="my-4">
              Deleting this link will remove it from your account, and you will
              loose all the data associated with it.
            </p>
            <div className="border p-2 rounded-sm">
              <div className="flex items-center gap-4 p-4 border rounded-sm bg-muted-foreground/10">
                <div className="p-2 rounded-full border border-foreground/20 relative overflow-hidden">
                  <Image
                    src={getFaviconFromUrl(link.url)}
                    alt={link.url}
                    width={24}
                    height={24}
                    className="rounded-full z-10 relative"
                  />
                  <Image
                    src={getFaviconFromUrl(link.url)}
                    alt={link.url}
                    width={24}
                    height={24}
                    className="absolute inset-0 w-full h-full object-cover blur-sm scale-125 opacity-30 z-0"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-medium lowercase text-sm">
                    shortleap.vercel.app/
                    <span className="dark:text-purple-400 text-purple-600">
                      {link.slug}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground lowercase flex items-center gap-1.5  ">
                    <CornerDownRight size={12} />
                    {link.url.slice(0, 50)}...
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-6 mb-2">
              To verify, type{" "}
              <strong className="text-foreground">delete</strong> below:
            </p>
            <Input
              className="py-5"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </DialogHeader>
        <Separator />
        <DialogFooter>
          <div className="flex gap-2 items-center justify-between w-full mt-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="py-5 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft />
                Go back
              </Button>
            </DialogClose>
            <DeleteLinkButton
              id={link.id}
              disabled={value !== "delete"}
              onSuccess={() => setOpenDeleteDialog(false)}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
