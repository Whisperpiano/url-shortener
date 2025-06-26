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
import { Button, buttonVariants } from "@/components/ui/button";
import { VERSION } from "@/lib/settings/version";
import { useAuthModal } from "@/lib/hooks/modals/auth-modal/useAuthModal";
import { authItems } from "./components/auth-button/utils/auth-items";

import RegisterForm from "@/components/layout/header/components/auth-modal/components/register-form/register-form";
import LoginForm from "@/components/layout/header/components/auth-modal/components/login-form/login-form";
import AuthButton from "./components/auth-button/auth-button";
import Separator from "./components/separator/separator";

export default function AuthModal({ btnText = "Sign in" }) {
  const {
    isOpen,
    setIsOpen,
    showRegister,
    setShowRegister,
    isSubmitting,
    setIsSubmitting,
  } = useAuthModal();

  const handleSetIsOpen = (value: boolean) => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("error")) {
      setIsOpen(value);
      params.delete("error");
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
    setIsOpen(value);
    setIsSubmitting(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSetIsOpen}>
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

          <Button
            variant="secondary"
            onClick={() => setShowRegister(!showRegister)}
            className="w-full p-5 cursor-pointer mt-4"
            disabled={isSubmitting}
          >
            {showRegister ? "Sign in" : "Register"}
          </Button>

          <Separator />

          <div className="flex flex-col gap-4">
            {authItems.map((item) => (
              <AuthButton key={item.label} authItem={item} />
            ))}
          </div>
        </article>

        <SheetFooter>
          <span className="font-mono text-xs uppercase text-muted-foreground ml-auto font-medium">
            Version {VERSION}
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
