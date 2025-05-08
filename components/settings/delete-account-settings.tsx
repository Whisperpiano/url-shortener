"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

import { Session } from "next-auth";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import {
  DeleteAccountSettingsSchema,
  DeleteAccountSettingsTypes,
} from "@/lib/zod/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccount } from "@/lib/actions/account/delete-account";
import { toast } from "sonner";
import { logout } from "@/lib/actions/auth/logout";
import { Spinner } from "../ui/spinner";
import { useState } from "react";

export default function DeleteAccountSettings({
  session,
}: {
  session: Session;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccountSettingsTypes>({
    resolver: zodResolver(DeleteAccountSettingsSchema),
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const userID = session?.user?.id;

  if (!userID) {
    return null;
  }

  const onSubmit = async (data: DeleteAccountSettingsTypes) => {
    setIsDeleting(true);
    const confirmed = data.confirmation === "confirm delete account";

    if (!confirmed) {
      return;
    }
    const { success, message } = await deleteAccount(userID);

    if (success) {
      toast.success(message);
      await logout();
    } else {
      toast.error(message);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <CardFooter className="border-t border-[var(--destructive)]/50">
        <DialogTrigger asChild>
          <Button variant="destructive" className="ml-auto cursor-pointer">
            <Trash2 />
            Delete
          </Button>
        </DialogTrigger>
      </CardFooter>
      <DialogContent className="px-0 py-0" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-center px-6 pt-10 pb-3">
            Delete user account
          </DialogTitle>
          <DialogDescription className="text-center px-6 pb-7 max-w-[350px] m-auto w-full">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <form className="w-full relative" onSubmit={handleSubmit(onSubmit)}>
            {errors.confirmation && (
              <div className="absolute -top-4 left-0 right-0 flex items-center justify-center animate">
                <span className="text-xs font-normal px-4 py-2  border border-[var(--destructive)] rounded-sm bg-[var(--destructive)]/10 backdrop-blur-xl flex items-center gap-2 text-[var(--destructive)]">
                  <AlertTriangle size={14} />
                  {errors.confirmation.message}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-6 w-full text-center bg-muted-foreground/8 border-t border-muted-foreground/20 p-10">
              <div className="flex flex-col gap-6 max-w-[350px] m-auto w-full">
                <p className="text-sm text-muted-foreground">
                  To verify, type{" "}
                  <span className="text-accent-foreground font-medium animate-bouncing">
                    confirm delete account
                  </span>{" "}
                  below:
                </p>
                <Input {...register("confirmation")} type="text" />
              </div>
              <div className="flex gap-4 bg-muted-foreground/8 max-w-[350px] m-auto w-full">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer flex-1"
                    type="button"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  variant="destructive"
                  className="cursor-pointer flex-1"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Spinner size={16} />
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Trash2 />
                      Delete
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
