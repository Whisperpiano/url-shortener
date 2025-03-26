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
import { Input } from "../ui/input";
import { login, register } from "@/lib/actions/auth";

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

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    const formData = new FormData(e.currentTarget);
    await login("credentials", formData);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await register(formData);

    if (result?.error) {
      alert(result.error);
      return;
    }

    await login("credentials", formData);
  };

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
          <p className="text-muted-foreground text-sm mb-4">
            Continue with your email and password.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              className="py-5"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="py-5"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="py-5"
            />
            <Button variant={"default"} size={"lg"} className="cursor-pointer">
              Sign up
            </Button>
          </form>
          <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="py-5"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="py-5"
            />
            <Button variant={"default"} size={"lg"} className="cursor-pointer">
              Sign in
            </Button>
          </form>
          <p className="mt-6 py-4 border-t border-t-muted text-muted-foreground text-sm">
            Quick sign in with your Google or GitHub account.
          </p>
          <div className="flex flex-col gap-4">
            <Button
              variant={"outline"}
              size={"lg"}
              className="cursor-pointer font-normal"
              onClick={() => login("google")}
            >
              <FcGoogle />
              Continue with Google
            </Button>

            <Button
              variant={"outline"}
              size={"lg"}
              className="cursor-pointer font-normal"
              onClick={() => login("github")}
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
