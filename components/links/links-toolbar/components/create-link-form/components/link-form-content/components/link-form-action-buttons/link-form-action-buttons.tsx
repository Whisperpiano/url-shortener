import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";

interface Props {
  isGeneratingSlug: boolean;
}

export default function LinkFormActionButtons({ isGeneratingSlug }: Props) {
  return (
    <div className="flex gap-2 items-center justify-between">
      <DialogClose asChild>
        <Button
          variant="outline"
          className="py-5 cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft />
          Go back
        </Button>
      </DialogClose>
      <Button
        type="submit"
        variant="default"
        className="cursor-pointer"
        disabled={isGeneratingSlug}
      >
        Create link
      </Button>
    </div>
  );
}
