import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseCreateLinkType } from "@/lib/hooks/forms/useCreateLink";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CircleHelp } from "lucide-react";
import { FaCrown } from "react-icons/fa";

interface Props {
  formProps: UseCreateLinkType;
}

export default function LinkFormAdvanced({ formProps }: Props) {
  const { register, popoverOpen, setPopoverOpen, date, setDate } = formProps;
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="options">
        <AccordionTrigger
          className={cn(
            buttonVariants({ variant: "outline" }),
            "py-5 justify-between hover:no-underline cursor-pointer group text-muted-foreground [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground"
          )}
        >
          <span className="flex items-center gap-2 ">
            <Badge variant="outline" className="bg-blue-300/25">
              <FaCrown className="p-0.5" />
              PRO
            </Badge>
            Advanced options
          </span>
        </AccordionTrigger>
        <AccordionContent className="p-4 border rounded-md bg-muted-background mt-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="description"
                  className="font-medium text-muted-foreground text-sm"
                >
                  Description
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp
                        size={16}
                        className="cursor-help text-muted-foreground hover:text-foreground"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[240px] text-center">
                      Short description for your link to help people understand
                      what it is about.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Textarea
              {...register("description")}
              placeholder="Short description"
              id="description"
              className="resize-none max-h-[120px] min-h-[120px] h-full"
              disabled
            />
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="expirationDate"
                  className="font-medium text-muted-foreground text-sm"
                >
                  Expiration date
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp
                        size={16}
                        className="cursor-help text-muted-foreground hover:text-foreground"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[240px] text-center">
                      Set an expiration date for your link to automatically
                      expire and be deleted.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Popover
              modal={true}
              open={popoverOpen}
              onOpenChange={setPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  disabled
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal py-5",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setPopoverOpen(false);
                  }}
                  disabled={(date) => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(0, 0, 0, 0);
                    return date < tomorrow;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
