import {
  Copy,
  CornerDownRight,
  EllipsisVertical,
  MousePointerClick,
  Pencil,
  QrCode,
  Trash,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";

import QRComponent from "../QRComponent";
import Image from "next/image";
import { auth } from "@/app/auth";
import Link from "next/link";
import { Link as LinkType } from "@/lib/zod/links";

interface LinkCardProps {
  link: LinkType;
}

export default async function LinkCard({ link }: LinkCardProps) {
  const session = await auth();
  return (
    <article className="border border-muted-foreground/20 rounded-lg p-6 mt-10 flex items-center justify-between flex-1">
      <div className="flex gap-3 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <button
              role="checkbox"
              aria-checked
              className="aspect-square w-12 rounded-full overflow-hidden cursor-pointer group hover:border-ring hover:ring-ring/50 hover:ring-[3px] transition-all duration-200 flex items-center justify-center bg-muted-foreground/20"
            >
              <QrCode />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR Code</DialogTitle>
              <DialogDescription className="relative"></DialogDescription>
            </DialogHeader>
            <QRComponent />
          </DialogContent>
        </Dialog>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Link
              href={`/dashboard/links/${link.url}`}
              className="font-medium lowercase text-sm"
              target="_blank"
            >
              shortly.link/{link.slug}
            </Link>
            <button
              type="button"
              className="cursor-pointer p-2 hover:bg-muted-foreground/15 rounded-full transition-colors "
            >
              <Copy size={12} />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              href={link.url}
              className="text-xs text-muted-foreground lowercase flex items-center gap-1.5 hover:underline hover:text-accent-foreground"
              target="_blank"
            >
              <CornerDownRight size={12} />
              {link.url}
            </Link>
            <div>
              <span className="text-sm text-muted-foreground">|</span>
            </div>
            <div className="flex gap-2 items-center">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session?.user?.name || ""}
                  width={40}
                  height={40}
                  className="aspect-square w-6 rounded-full"
                />
              ) : (
                <span>A</span>
              )}
              <span className="text-xs text-muted-foreground">
                04 April, 2025
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" className="text-xs ">
                <MousePointerClick className="dark:text-blue-300 text-blue-600" />
                3 clicks
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-secondary rounded-md p-2 text-xs mb-2">
              <p>Last clicked: 12 minutes ago</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={"icon"} className="cursor-pointer">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="text-current w-2 h-2" size={5} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <QrCode className="text-current w-2 h-2" size={5} />
              QR Code
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Copy className="text-current w-2 h-2" size={5} />
              Copy link
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" className="cursor-pointer">
              <Trash className="text-current w-2 h-2" size={5} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}
