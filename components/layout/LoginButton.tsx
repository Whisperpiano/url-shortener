"use client";

import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { login } from "@/lib/actions/auth";

export const LoginButton = () => {
  return (
    <Button
      variant={"default"}
      className="cursor-pointer group"
      onClick={() => login()}
    >
      Get started
      <ArrowRight className="group-hover:translate-x-0.5 transition-transform duration-300" />
    </Button>
  );
};
