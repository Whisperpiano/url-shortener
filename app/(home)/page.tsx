import AuthModal from "@/components/header/AuthModal";
import { ParticlesComponent } from "@/components/particles/particles-component";
import { buttonVariants } from "@/components/ui/button";
import AuroraHero from "@/lib/home/aurora-hero";
import ContributeSection from "@/lib/home/contribute-section";
import FeaturesSection from "@/lib/home/features-section";
import SponsorsSection from "@/lib/home/sponsors-section";
import StackSection from "@/lib/home/stack-section";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default async function Home() {
  return (
    <>
      <main className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] max-h-[calc(100vh-85px)] overflow-hidden ">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        {/* Hero */}
        <section className="text-center relative h-full w-full py-32 overflow-hidden">
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

          <div className="mt-10">
            <AuthModal btnText="Get Started" />
          </div>

          <ParticlesComponent className="absolute h-1/2 top-0 w-full" />

          <div className="mt-30 px-6">
            <AuroraHero />
          </div>
          <ParticlesComponent />
        </section>
        {/* Dashed right border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x"></div>
      </main>

      <div className="h-[1px] border-b"></div>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] ">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <div>
          <div className="h-[40px] border-b"></div>
          <div className="py-32 px-6 border-b">
            <h2 className="flex items-center justify-center gap-2.5 text-5xl font-medium tracking-tighter pb-4 ">
              Explore features that
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                matter
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg text-center">
              Discover the core functionalities that make Shortleap a powerful
              tool for developers
            </p>
          </div>
          <div className="h-[40px] border-b"></div>

          <div>
            <FeaturesSection />
          </div>
        </div>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <div className="h-[1px] border-b"></div>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <div>
          <div className="h-[40px] border-b"></div>
          <div className="py-32 px-6 border-b ">
            <h2 className="flex items-center justify-center gap-2.5 text-5xl font-medium tracking-tighter pb-4 ">
              Built to perform, ready to
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                scale
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg text-center">
              From a solid tech stack to worldwide click tracking. Everything
              you need for a powerful URL shortener
            </p>
          </div>
          <div className="h-[40px] border-b"></div>

          <StackSection />
        </div>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <div className="h-[1px] border-b"></div>

      <ContributeSection />

      <div className="h-[1px] border-b"></div>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] ">
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <div>
          <div className="h-[40px] border-b"></div>

          <div className="py-32 px-6 ">
            <h2 className="flex items-center justify-center gap-2.5 text-5xl font-medium tracking-tighter pb-4 ">
              You are in good
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                company
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg text-center">
              Designed with scalability and transparency in mind. Want to
              support the project or become a sponsor?
            </p>
          </div>
          <div className="h-[40px] border-t"></div>

          <SponsorsSection />
          <div className="h-[40px]"></div>
        </div>

        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <div className="h-[1px] border-b"></div>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]   ">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <footer className="shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 antialiased">
          <p className="mb-4 text-sm text-center text-muted-foreground sm:mb-0">
            &copy; 2025 Shortleap Inc.
          </p>

          <div className="flex justify-center items-center space-x-4">
            <Link
              href="https://github.com/Whisperpiano"
              data-tooltip-target="tooltip-facebook"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "group"
              )}
              target="_blank"
            >
              <FaGithub className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/jes%C3%BAs-alberola-herrero-896b61189/"
              data-tooltip-target="tooltip-facebook"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "group"
              )}
              target="_blank"
            >
              <FaLinkedin className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="mailto:jesusalberola90@gmail.com"
              data-tooltip-target="tooltip-facebook"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "group"
              )}
              target="_blank"
            >
              <Mail className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </footer>
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>
    </>
  );
}
