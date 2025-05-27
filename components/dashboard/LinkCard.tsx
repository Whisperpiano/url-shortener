"use client";

import {
  ArrowLeft,
  Calendar1,
  Copy,
  CornerDownRight,
  EllipsisVertical,
  LucideCheckCircle,
  MousePointerClick,
  Pencil,
  QrCode,
  Trash,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import QRComponent from "../QRComponent";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkType } from "@/lib/zod/links";
import { Button } from "@/components/ui/button";
import { getFaviconFromUrl } from "@/lib/utils/getFaviconFromUrl";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { MagicCard } from "../magicui/magic-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CopyButton } from "../ui/copy-button";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import DeleteLinkButton from "../DeleteLinkButton";
import { FaCrown } from "react-icons/fa";

interface LinkCardProps {
  link: LinkType;
}

export default function LinkCard({ link }: LinkCardProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    setOpenDropdown(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://shortleap.vercel.app/${link.slug}`);
    toast.success("Copied to clipboard!", {
      icon: <LucideCheckCircle size={18} />,
    });
  };
  <Link
    href={`https://shortleap.vercel.app/${link.slug}`}
    className="font-medium lowercase text-sm"
    target="_blank"
    prefetch={false}
  >
    shortleap.vercel.app/
    <span className="dark:text-purple-400 text-purple-600">{link.slug}</span>
  </Link>;

  return (
    <MagicCard className="rounded-xl">
      <Card>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full border border-foreground/20 relative overflow-hidden">
              <Image
                src={getFaviconFromUrl(link.url)}
                alt={link.url}
                width={24}
                height={24}
                className="rounded-full z-10 relative"
              />
              <Image
                src={getFaviconFromUrl(link.url)}
                alt={link.url}
                width={24}
                height={24}
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-125 opacity-30 z-0"
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <Link
                  href={`https://shortleap.vercel.app/${link.slug}`}
                  className="font-medium lowercase text-sm"
                  target="_blank"
                  prefetch={false}
                >
                  shortleap.vercel.app/
                  <span className="dark:text-purple-400 text-purple-600">
                    {link.slug}
                  </span>
                </Link>

                <CopyButton
                  text={`https://shortleap.vercel.app/${link.slug}`}
                />
              </div>

              <Link
                href={link.url}
                className="text-xs text-muted-foreground lowercase flex items-center gap-1.5 hover:underline hover:text-accent-foreground"
                target="_blank"
              >
                <CornerDownRight size={12} />
                {link.url.slice(0, 50)}...
              </Link>
            </div>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="text-xs rounded-r-none cursor-pointer"
                >
                  <QrCode />
                  QR code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>QR Code</DialogTitle>
                  <DialogDescription className="relative"></DialogDescription>
                </DialogHeader>
                <QRComponent url={link.url} />
              </DialogContent>
            </Dialog>
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

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleCopy}
                >
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
          </div>
        </CardContent>

        <Separator />
        <CardFooter className="flex justify-between items-center">
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
                  {link.clickCount} clicks
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total clicks: {link.clickCount}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant={"secondary"}
                  className="text-xs text-muted-foreground flex items-center gap-2 p-1.5"
                >
                  <Calendar1
                    size={16}
                    className="dark:text-pink-300 text-pink-500"
                  />
                  {format(link.createdAt, "dd MMM, yyyy")}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Created: {format(link.createdAt, "dd MMM, yyyy")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Badge
            variant={"default"}
            className="text-xs text-green-600 dark:text-green-300 gap-2 p-1.5 bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700/50 flex items-center px-3 hover:bg-green-200/50 dark:hover:bg-green-800/30 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
            </span>
            Active
          </Badge>
        </CardFooter>
      </Card>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <Trash size={14} />
                <span className="text-base">Delete link</span>
              </div>
            </DialogTitle>
            <DialogDescription />
            <Separator className="mt-2" />
            <div className="my-4 text-sm text-muted-foreground">
              <p>Are you sure you want to delete this link?</p>
              <p className="my-4">
                Deleting this link will remove it from your account, and you
                will loose all the data associated with it.
              </p>
              <div className="border p-2 rounded-sm">
                <div className="flex items-center gap-4 p-4 border rounded-sm bg-muted-foreground/10">
                  <div className="p-2 rounded-full border border-foreground/20 relative overflow-hidden">
                    <Image
                      src={getFaviconFromUrl(link.url)}
                      alt={link.url}
                      width={24}
                      height={24}
                      className="rounded-full z-10 relative"
                    />
                    <Image
                      src={getFaviconFromUrl(link.url)}
                      alt={link.url}
                      width={24}
                      height={24}
                      className="absolute inset-0 w-full h-full object-cover blur-sm scale-125 opacity-30 z-0"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-medium lowercase text-sm">
                      shortleap.vercel.app/
                      <span className="dark:text-purple-400 text-purple-600">
                        {link.slug}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground lowercase flex items-center gap-1.5  ">
                      <CornerDownRight size={12} />
                      {link.url.slice(0, 50)}...
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-6 mb-2">
                To verify, type{" "}
                <strong className="text-foreground">delete</strong> below:
              </p>
              <Input
                className="py-5"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </DialogHeader>
          <Separator />
          <DialogFooter>
            <div className="flex gap-2 items-center justify-between w-full mt-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="py-5 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft />
                  Go back
                </Button>
              </DialogClose>
              <DeleteLinkButton
                id={link.id}
                disabled={value !== "delete"}
                onSuccess={() => setOpenDeleteDialog(false)}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MagicCard>
  );
}
