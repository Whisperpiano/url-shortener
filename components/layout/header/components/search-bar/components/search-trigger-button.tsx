import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchTriggerButton({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Button
      variant={"outline"}
      className="cursor-pointer text-muted-foreground transition-colors duration-300 hover:text-muted-foreground w-9 lg:w-auto lg:px-4"
      onClick={() => setIsOpen(true)}
    >
      <Search className="h-4 w-4 lg:mr-2" />

      <span className="hidden lg:inline font-normal">Search documentation</span>
      <kbd className="hidden lg:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-2">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
