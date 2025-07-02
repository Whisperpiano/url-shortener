import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Copy,
  EllipsisVertical,
  LucideCheckCircle,
  Pencil,
  Trash,
} from "lucide-react";

import { FaCrown } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface Props {
  slug: string;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
}

export default function LinkActionsDropdown({
  slug,
  setOpenDeleteDialog,
}: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    setOpenDropdown(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://shortleap.vercel.app/${slug}`);
    toast.success("Copied to clipboard!", {
      icon: <LucideCheckCircle size={18} />,
    });
  };
  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="cursor-pointer rounded-l-none"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[132px]">
        <DropdownMenuItem
          className="cursor-pointer flex justify-between"
          disabled
        >
          <span className="flex items-center gap-2">
            <Pencil className="text-current w-2 h-2" size={5} />
            Edit
          </span>
          <Badge variant="outline" className="bg-blue-300/25 ">
            <FaCrown className="p-0.5" />
          </Badge>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={handleCopy}>
          <Copy className="text-current w-2 h-2" size={5} />
          Copy
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleOpenDeleteDialog}
        >
          <Trash className="text-current w-2 h-2" size={5} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
