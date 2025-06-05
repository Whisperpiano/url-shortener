import { buttonVariants } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { HorizontalBorder } from "@/components/ui/border";

import PixelCanvas from "@/components/PixelCanvas";
import Link from "next/link";
import GitHubStats from "@/components/home/components/github-stats";
import AnimatedHeader from "./animated-header";

export default async function ContributeSection() {
  return (
    <HorizontalBorder>
      <article className="relative overflow-hidden">
        <section className="max-w-7xl mx-auto py-24 sm:py-32 md:py-40 lg:py-60 px-4 sm:px-6">
          {/* Background */}
          <div>
            <div className="absolute inset-0 w-full bg-gradient-to-r from-violet-200 via-pink-200 to-purple-200 dark:from-violet-950 dark:via-pink-950 dark:to-purple-950 -z-20" />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background to-transparent pointer-events-none -z-5" />
            <PixelCanvas className="absolute inset-0 opacity-20 w-full h-full pointer-events-none -z-10" />
          </div>

          <AnimatedHeader />

          <GitHubStats className="flex items-center justify-center my-16 md:my-20" />

          <Link
            href={"https://github.com/Whisperpiano/url-shortener"}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "flex max-w-fit mx-auto cursor-pointer mt-8 mb-6 sm:my-10 md:my-14 gap-2"
            )}
          >
            <SiGithub />
            View on GitHub
          </Link>
        </section>
      </article>
    </HorizontalBorder>
  );
}
