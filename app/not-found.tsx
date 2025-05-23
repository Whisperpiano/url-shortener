import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl font-medium mb-6">Link not found</h2>
        <p className="text-muted-foreground mb-8">
          The short link you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/">
          <Button variant="default" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
