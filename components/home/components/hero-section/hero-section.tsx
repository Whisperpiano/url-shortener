import { ParticlesComponent } from "@/components/particles/particles-component";
import { HorizontalBorder } from "@/components/ui/border";
import { auth } from "@/app/auth";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import AuthModal from "@/components/layout/header/components/auth-modal/auth-modal";
import AuroraHero from "./components/aurora-hero";

export default async function HeroSection() {
  const session = await auth();

  return (
    <HorizontalBorder>
      <article
        id="hero"
        className="text-center relative h-full w-full py-16 md:py-24 lg:py-32 overflow-hidden px-4 sm:px-6"
      >
        {/* Text section */}
        <section className="relative z-10">
          <h2 className="font-mono font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl flex flex-col gap-1 sm:gap-2 animate-fade-in-up">
            <span>Shorten your links </span>
            <span>
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                fast
              </span>
              <span> and </span>
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                easy
              </span>
            </span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground pt-3 pb-4 md:py-6 mt-6 md:mt-10 max-w-lg mx-auto animate-fade-in-up animate-delay-250">
            Transform long, messy URLs into short and shareable links in
            seconds. Start simplifying your links today!
          </p>

          <div className="mt-6 md:mt-10 animate-fade-in animate-delay-500">
            {session ? (
              <Link
                href={"/dashboard"}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" })
                )}
                prefetch
              >
                Go to dashboard
              </Link>
            ) : (
              <AuthModal btnText="Get Started" />
            )}
          </div>
        </section>

        {/* Image & decoration section */}
        <div>
          <ParticlesComponent className="absolute h-1/2 top-0 w-full pointer-events-none" />

          <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-30 px-2 sm:px-4 md:px-6">
            <AuroraHero />
          </div>
        </div>
      </article>
    </HorizontalBorder>
  );
}
