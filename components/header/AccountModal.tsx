"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import { logout } from "@/lib/actions/auth/logout";

interface Props {
  session: Session;
}

export default function AccountModal({ session }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "cursor-pointer"
        )}
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session?.user?.name || ""}
            width={40}
            height={40}
            className="w-full h-full rounded"
          />
        ) : (
          <span>A</span>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-mono mt-4 text-base font-medium">
            My account
          </SheetTitle>
          <SheetDescription className="sr-only">
            Manage your account details.
          </SheetDescription>
        </SheetHeader>

        <article className="p-4 border-t border-b-muted">
          <h2>Profile</h2>
          <div className="flex gap-4 items-center">
            <div>
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session?.user?.name || ""}
                  width={40}
                  height={40}
                  className="rounded"
                />
              ) : (
                <span>A</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{session?.user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {session?.user?.email}
              </span>
            </div>
          </div>
          <ul>
            <li>Settings</li>
          </ul>
          <Button
            variant="secondary"
            onClick={() => logout()}
            className="w-full p-5 mt-4 cursor-pointer"
          >
            Logout
          </Button>
          <h2>Dashboard</h2>
          <ul>
            <li>Your links</li>
          </ul>
          <h2>Help</h2>
          <ul>
            <li>Report a bug</li>
            <li>Contact us</li>
          </ul>
        </article>

        <SheetFooter>
          <span className="font-mono text-xs uppercase text-muted-foreground ml-auto font-medium">
            Version 1.0.0
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
