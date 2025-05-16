import { buttonVariants } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { cn } from "@/lib/utils";
import { HorizontalBorder } from "@/components/ui/border";

import PixelCanvas from "@/components/PixelCanvas";
import Link from "next/link";
import GitHubStats from "@/components/home/components/github-stats";

export default async function ContributeSection() {
  return (
    <HorizontalBorder>
      <article className="relative overflow-hidden">
        <section className="max-w-7xl mx-auto py-60 px-6">
          {/* Background */}
          <div>
            <div className="absolute inset-0 w-full  bg-gradient-to-r from-violet-200 via-pink-200 to-purple-200 dark:from-violet-950 dark:via-pink-950 dark:to-purple-950 -z-20" />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background to-transparent pointer-events-none -z-5" />
            <PixelCanvas className="absolute inset-0 opacity-20 w-full h-full pointer-events-none -z-10" />
          </div>

          <header className="flex flex-col items-center gap-4">
            <h2 className="tracking-tighter font-semibold text-5xl">
              Open source?
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent ml-4 mr-3">
                Of course!
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg max-w-2xl text-center">
              Shortleap is proudly open source. That means you’re free to
              explore the code, suggest improvements, and help shape the future
              of the project.
            </p>
          </header>

          <GitHubStats className="flex items-center justify-center mt-10" />

          <Link
            href={"https://github.com/Whisperpiano/url-shortener"}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "flex max-w-fit mx-auto cursor-pointer my-14"
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
