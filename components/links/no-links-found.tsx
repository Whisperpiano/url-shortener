/* eslint-disable @next/next/no-img-element */

import { Plus } from "lucide-react";
import { Marquee } from "../magicui/marquee";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import CreateLinkForm from "./CreateLinkForm";

const LinkCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-4 w-full">
          {/* Favicon Skeleton */}
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />

          <div className="flex-1 space-y-2">
            {/* URL Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </div>

            {/* Original URL Skeleton */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-muted rounded-full" />
              <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex">
            <div className="h-9 w-20 bg-muted rounded-l-md animate-pulse" />
            <div className="h-9 w-9 bg-muted/80 rounded-r-md animate-pulse" />
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between px-6 py-2">
        {/* Badges Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-muted rounded-md animate-pulse" />
          <div className="h-6 w-24 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Status Badge Skeleton */}
        <div className="h-6 w-16 bg-muted/50 rounded-md animate-pulse" />
      </CardFooter>
    </Card>
  );
};

export default function NoLinksFound() {
  return (
    <div className="relative w-full h-[82dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Marquee vertical className="[--duration:20s] w-full">
          <div className="w-full">
            <LinkCardSkeleton />
          </div>
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>

      <div className="grid place-content-center z-10 text-center px-4 py-6 rounded-lg backdrop-blur-sm bg-background/5 border border-border/10 shadow-sm w-full h-full">
        <h2 className="text-2xl font-medium text-foreground">No links found</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
          Either they&apos;ve gone undercover or you haven&apos;t created any
          yet. Why not add one now?
        </p>
        <div className="flex items-center justify-center gap-2 mt-6">
          <CreateLinkForm />
        </div>
      </div>
    </div>
  );
}
