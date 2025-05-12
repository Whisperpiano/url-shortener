import AuthModal from "@/components/header/AuthModal";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "../auth";

import { ArrowDown } from "lucide-react";
import AuroraHero from "@/lib/home/aurora-hero";
import FeaturesSection from "@/lib/home/features-section";
import GlobeSection from "@/lib/home/globe-section";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <main className="max-w-7xl mx-auto px-4">
        <section
          className="text-center relative h-full w-full py-32 overflow-hidden mask-l-from-80% mask-l-to-100%
        mask-r-from-80% mask-r-to-100% mask-b-from-80% mask-b-to-100%"
        >
          <h2 className="font-mono font-semibold text-7xl flex flex-col gap-2">
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
          <p className="text-lg text-muted-foreground pt-3 pb-6 mt-10 max-w-lg mx-auto">
            Transform long, messy URLs into short and shareable links in
            seconds. Start simplifying your links today!
          </p>

          {/* <ParticlesContainer /> */}

          {session ? (
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "default" }),
                "cursor-pointer"
              )}
            >
              Go to dashboard
            </Link>
          ) : (
            <div className="mt-10">
              <AuthModal btnText="Get Started" />
            </div>
          )}

          <div className="mt-10 flex flex-col gap-2 items-center justify-center group cursor-pointer ">
            <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
              Learn more
            </span>
            <ArrowDown
              className="text-muted-foreground group-hover:text-foreground transition-colors"
              size={20}
            />
          </div>

          <div className="mt-10">
            <AuroraHero />
          </div>
        </section>
        <FeaturesSection />
        <GlobeSection />
      </main>
    </>
  );
}
