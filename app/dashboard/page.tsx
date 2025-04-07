import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Copy,
  CornerDownRight,
  EllipsisVertical,
  MousePointerClick,
  Pencil,
  QrCode,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { auth } from "../auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import PixelCanvas from "@/components/PixelCanvas";

const testLink = {
  id: 1,
  title: "Test link",
  url: "google.com",
  shortUrl: "shortly.link/test",
  createdAt: new Date(),
  views: 100,
  clicks: 100,
  isPublic: true,
  isDeleted: false,
  user: {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    image: "https://avatars.githubusercontent.com/u/123456789?v=4",
  },
  tags: ["tag1", "tag2"],
  description: "This is a test link",
};

export default async function Dashboard() {
  const session = await auth();

  return (
    <section className="max-w-7xl mx-auto py-6 px-4">
      <h1>Links</h1>
      <div className="flex gap-4 items-center">
        <Input placeholder="Search..." />
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Display</Button>
        <Button variant="default">Create link</Button>
      </div>

      <section className="flex gap-2">
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

                <PixelCanvas gap={6} speed={0.1} className="opacity-50" />
              </DialogContent>
            </Dialog>

            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <Link
                  href={`/dashboard/links/${testLink.id}`}
                  className="font-medium lowercase text-sm"
                  target="_blank"
                >
                  {testLink.shortUrl}
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
                  href={`https://www.${testLink.url}`}
                  className="text-xs text-muted-foreground lowercase flex items-center gap-1.5 hover:underline hover:text-accent-foreground"
                  target="_blank"
                >
                  <CornerDownRight size={12} />
                  {testLink.url}
                </Link>
                <div>
                  <span className="text-sm text-muted-foreground">|</span>
                </div>
                <div className="flex gap-2 items-center">
                  <img
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                    className="w-4 h-4 rounded-full"
                  />
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
                <Button
                  variant="outline"
                  size={"icon"}
                  className="cursor-pointer"
                >
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
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <Trash className="text-current w-2 h-2" size={5} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </article>
        <article className="border border-muted-foreground/20 rounded-lg p-6 mt-10 flex items-center justify-between flex-1">
          <div className="flex gap-2 items-center">
            <button
              role="checkbox"
              aria-checked
              className="aspect-square w-10 rounded-full overflow-hidden cursor-pointer group hover:border-ring hover:ring-ring/50 hover:ring-[3px] transition-all duration-200"
            >
              <img src={testLink.user.image} alt={testLink.user.name} />
            </button>
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <Link
                  href={`/dashboard/links/${testLink.id}`}
                  className="font-medium lowercase"
                  target="_blank"
                >
                  {testLink.shortUrl}
                </Link>
                <Button variant="ghost" size={"icon"}>
                  <Copy />
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Link
                  href={`https://www.${testLink.url}`}
                  className="text-xs text-muted-foreground lowercase flex items-center gap-1.5 hover:underline hover:text-accent-foreground"
                  target="_blank"
                >
                  <CornerDownRight size={12} />
                  {testLink.url}
                </Link>
                <div>
                  <span className="text-sm text-muted-foreground">|</span>
                </div>
                <div className="flex gap-2 items-center">
                  <img
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-xs text-muted-foreground">
                    April 4, 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="text-xs py-4">
                    <MousePointerClick className="dark:text-blue-300 text-blue-600" />
                    3 clicks
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-secondary rounded-md p-2 text-xs mb-2">
                  <p>Last clicked: 12 minutes ago</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <Button variant="ghost" size={"icon"}>
                <QrCode />
              </Button>
              <Button variant="ghost" size={"icon"}>
                <Pencil />
              </Button>
              <Button variant="ghost" size={"icon"}>
                <Trash />
              </Button>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
