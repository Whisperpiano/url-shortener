"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import { login } from "@/lib/actions/auth/login";

import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";

export default function AuthModal({ btnText = "Sign in" }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("login")) {
      setIsOpen(true);
      setShowRegister(false);
    } else if (params.has("register")) {
      setIsOpen(true);
      setShowRegister(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (isOpen) {
      if (showRegister) {
        params.delete("login");

        const paramString = params.toString();
        const newUrl =
          window.location.pathname +
          (paramString ? `?${paramString}&register` : "?register");

        window.history.replaceState({}, "", newUrl);
      } else {
        params.delete("register");

        const paramString = params.toString();
        const newUrl =
          window.location.pathname +
          (paramString ? `?${paramString}&login` : "?login");

        window.history.replaceState({}, "", newUrl);
      }
    } else {
      params.delete("login");
      params.delete("register");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");

      window.history.replaceState({}, "", newUrl);
    }
  }, [isOpen, showRegister]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
      >
        {btnText}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-mono mt-4 text-base font-medium">
            Get started
          </SheetTitle>
          <SheetDescription className="sr-only">
            Log in form to access your account and manage your links.
          </SheetDescription>
        </SheetHeader>

        <article className="p-4 border-t border-b-muted">
          {showRegister ? (
            <RegisterForm
              onSubmitting={setIsSubmitting}
              setIsOpen={setIsOpen}
            />
          ) : (
            <LoginForm onSubmitting={setIsSubmitting} setIsOpen={setIsOpen} />
          )}

          {showRegister ? (
            <Button
              variant="secondary"
              onClick={() => setShowRegister(false)}
              className="w-full p-5 cursor-pointer mt-4"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setShowRegister(true)}
              className="w-full p-5 cursor-pointer mt-4"
              disabled={isSubmitting}
            >
              Register
            </Button>
          )}

          <div className="flex items-center">
            <div className="flex-1 bg-muted-foreground h-0.5 opacity-50"></div>
            <span className="uppercase px-3 py-6 font-mono font-medium text-muted-foreground text-sm">
              or
            </span>
            <div className="flex-1 bg-muted-foreground h-0.5 opacity-50"></div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              variant={"outline"}
              size={"lg"}
              className="cursor-pointer font-normal"
              onClick={() => login("google")}
              disabled={isSubmitting}
            >
              <FcGoogle />
              Continue with Google
            </Button>

            <Button
              variant={"outline"}
              size={"lg"}
              className="cursor-pointer font-normal"
              onClick={() => login("github")}
              disabled={isSubmitting}
            >
              <FaGithub />
              Continue with GitHub
            </Button>
          </div>
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
