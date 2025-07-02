import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { format } from "date-fns";
import { Calendar1, MousePointerClick } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  count: number;
  createdAt: Date;
}

export default function LinkStats({ count, createdAt }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={"secondary"}
            className="text-xs text-muted-foreground flex items-center gap-2 p-1.5"
          >
            <MousePointerClick
              size={16}
              className="dark:text-pink-300 text-pink-500"
            />
            {count}
            <span className="sm:block hidden">clicks</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Total clicks: {count}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={"secondary"}
            className="text-xs text-muted-foreground flex items-center gap-2 p-1.5"
          >
            <Calendar1 size={16} className="dark:text-pink-300 text-pink-500" />
            {format(createdAt, "dd MMM, yyyy")}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Created: {format(createdAt, "dd MMM, yyyy")}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
