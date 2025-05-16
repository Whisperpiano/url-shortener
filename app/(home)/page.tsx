import ContributeSection from "@/components/home/sections/contribute-section";
import FeaturesSection from "@/components/home/sections/features-section";
import HeroSection from "@/components/home/sections/hero-section";
import SponsorsSection from "@/components/home/sections/sponsors-section";
import StackSection from "@/components/home/sections/stack-section";
import Divider from "@/components/ui/divider";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default async function Home() {
  return (
    <>
      <main>
        <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] max-h-[calc(100vh-85px)] overflow-hidden">
          <HeroSection />
        </section>

        <Divider />

        <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
          <FeaturesSection />
        </section>

        <Divider />

        <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
          <StackSection />
        </section>

        <Divider />

        <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
          <ContributeSection />
        </section>
      </main>

      <div className="h-[1px] border-b"></div>

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
