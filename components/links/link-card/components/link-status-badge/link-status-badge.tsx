import { Badge } from "@/components/ui/badge";

export default function LinkStatusBadge() {
  return (
    <Badge
      variant={"default"}
      className="h-8 text-xs text-green-600 dark:text-green-300 gap-2 p-1.5 bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700/50 flex items-center px-3 hover:bg-green-200/50 dark:hover:bg-green-800/30 transition-colors"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
      </span>
      <span>Active</span>
    </Badge>
  );
}
