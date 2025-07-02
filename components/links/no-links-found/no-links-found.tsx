/* eslint-disable @next/next/no-img-element */

import { Marquee } from "../../special/marquee";
import { LinkCardSkeleton } from "../link-card/link-card-skeleton";

import CreateLinkForm from "../links-toolbar/components/create-link-form/create-link-form";

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
