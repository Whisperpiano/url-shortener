"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorMessage({ error }: { error: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 w-full">
      <h2 className="text-muted-foreground mt-2 text-lg mb-4">{error}</h2>

      <Button onClick={() => router.refresh()} className="cursor-pointer">
        Try again
      </Button>
    </div>
  );
}
