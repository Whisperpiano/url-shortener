import { Loader2 } from "lucide-react";

export default function LogOutModal() {
  return (
    <div
      className="fixed inset-0 bg-background/5 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in"
      style={{
        animationDuration: "0.3s",
      }}
    >
      <div className="flex flex-col items-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-normal text-muted-foreground">
          Logging out...
        </p>
      </div>
    </div>
  );
}
