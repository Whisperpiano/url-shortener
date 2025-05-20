"use client";

import { Check, Copy, LucideCheckCircle } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!", {
      icon: <LucideCheckCircle size={18} />,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      disabled={copied}
      className=" cursor-pointer p-2 hover:bg-muted-foreground/15 rounded-full transition-colors "
    >
      {copied ? <Check size={4} /> : <Copy size={4} />}
    </Button>
  );
}
