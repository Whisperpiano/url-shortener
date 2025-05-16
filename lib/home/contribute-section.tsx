import { NumberTicker } from "@/components/magicui/number-ticker";
import { buttonVariants } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { fetchGitHubStats } from "../actions/github/github-stats";
import PixelCanvas from "@/components/PixelCanvas";
import Link from "next/link";
import { cn } from "../utils";

export default async function ContributeSection() {
  const { stars, contributors, pulls } = await fetchGitHubStats();

  return (
    <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
      {/* Dashed left border */}
      <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

      <div>
        <article className="relative overflow-hidden">
          <div className="absolute inset-0 w-full  bg-gradient-to-r from-violet-200 via-pink-200 to-purple-200 dark:from-violet-950 dark:via-pink-950 dark:to-purple-950 -z-20"></div>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background to-transparent pointer-events-none -z-5"></div>

          <div className="max-w-7xl mx-auto py-60 px-6">
            <div className="flex flex-col items-center gap-4">
              <h2 className="tracking-tighter font-semibold text-5xl">
                Open source?
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent ml-4 mr-3">
                  Of course!
                </span>
              </h2>
              <p className="text-muted-foreground text-balance font-normal text-lg max-w-2xl text-center">
                Shortleap is proudly open source. That means you’re free to
                explore the code, suggest improvements, and help shape the
                future of the project.
              </p>
            </div>

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

            <div className="flex items-center justify-center ">
              <div className="flex flex-col items-center justify-center gap-3 min-w-[250px]">
                <div className="text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/50 text-transparent bg-clip-text">
                  <NumberTicker value={stars} />
                  <span>+</span>
                </div>
                <span className="text-muted-foreground text-balance font-medium text-sm uppercase tracking-tighter ">
                  Github Stars
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 min-w-[250px] border-x-2 ">
                <div className="text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/50 text-transparent bg-clip-text">
                  <NumberTicker value={contributors} />
                  <span>+</span>
                </div>
                <span className="text-muted-foreground text-balance font-medium text-sm uppercase tracking-tighter ">
                  Contributors
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 min-w-[250px]">
                <div className="text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/50 text-transparent bg-clip-text">
                  <NumberTicker value={pulls} />
                  <span>+</span>
                </div>
                <span className="text-muted-foreground text-balance font-medium text-sm uppercase tracking-tighter ">
                  Pull Requests
                </span>
              </div>
            </div>
          </div>

          <PixelCanvas className="absolute inset-0 opacity-20 w-full h-full pointer-events-none -z-10" />
        </article>
      </div>

      {/* Dashed left border */}
      <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
    </section>
  );
}
