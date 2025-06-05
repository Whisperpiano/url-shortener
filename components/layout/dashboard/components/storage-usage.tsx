import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LinkIcon } from "lucide-react";

export default function StorageUsage({
  linkCount,
  limit,
}: {
  linkCount: number;
  limit: number;
}) {
  return (
    <div className="flex flex-col animate-fade-in-right ">
      <span className="text-sm text-muted-foreground">Storage usage &gt;</span>

      <div className="flex items-center justify-between text-sm text-accent-foreground mb-2 mt-4">
        <span className="inline-flex items-center gap-1">
          <LinkIcon size={14} />
          Links
        </span>
        <div className="flex items-center gap-1.5 text-accent-foreground">
          <span>
            {linkCount} of {limit}
          </span>
          <span className="text-accent-foreground/50">
            ({((linkCount / limit) * 100).toFixed()}%)
          </span>
        </div>
      </div>

      <Progress value={(linkCount / limit) * 100} />

      <Button variant="default" className="cursor-pointer mt-6">
        Get Shortly Pro
      </Button>
    </div>
  );
}
