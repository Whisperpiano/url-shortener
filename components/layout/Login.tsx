"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

import { useEffect } from "react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../ui/input";
import { login } from "@/lib/actions/auth";

export default function Login({ btnText = "Sign in" }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("login")) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (isOpen) {
      const paramString = params.toString();
      const newUrl =
        window.location.pathname +
        (paramString ? `?${paramString}&login` : "?login");

      window.history.replaceState({}, "", newUrl);
    } else {
      params.delete("login");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");

      window.history.replaceState({}, "", newUrl);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
      >
        {btnText}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="py-5 border-b border-b-muted">
            <span className="font-mono tracking-wide font-medium">Shortly</span>
          </SheetTitle>
          <SheetDescription>
            <>
              <div>
                Log in to Shortly to access your account and manage your links.
              </div>
              <div className="flex flex-col gap-4">
                <Input placeholder="Email" className="py-5" />
                <Input placeholder="Password" className="py-5" />
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="cursor-pointer"
                >
                  Sign in
                </Button>
              </div>
              <div className="mt-6 py-4 border-t border-t-muted">
                Or sign in with your Google or GitHub account.
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="cursor-pointer"
                  onClick={() => login("github")}
                >
                  <FcGoogle />
                  Sign in with GitHub
                </Button>

                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="cursor-pointer"
                  onClick={() => login("google")}
                >
                  <FaGithub />
                  Sign in with Google
                </Button>
              </div>
              <span className="mb-auto">Shortly TM</span>
            </>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
