import AuthModal from "@/components/header/AuthModal";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ParticlesComponent } from "@/components/particles/particles-component";
import PixelCanvas from "@/components/PixelCanvas";
import { Button } from "@/components/ui/button";
import { fetchGitHubStats } from "@/lib/actions/github/github-stats";
import AuroraHero from "@/lib/home/aurora-hero";
import FeaturesSection from "@/lib/home/features-section";
import SponsorsSection from "@/lib/home/sponsors-section";
import StackSection from "@/lib/home/stack-section";
import { SiGithub } from "react-icons/si";

export default async function Home() {
  const { stars, contributors, pulls } = await fetchGitHubStats();

  return (
    <>
      <main className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] max-h-[calc(100vh-85px)] overflow-hidden ">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        {/* Hero */}
        <section className="text-center relative h-full w-full py-32 overflow-hidden mask-b-from-60% mask-b-to-100%">
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

          <ParticlesComponent className="absolute h-1/2 top-0 w-full -z-20" />

          <div className="mt-30 px-6">
            <AuroraHero />
          </div>
        </section>
        {/* Dashed right border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x"></div>
      </main>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] border-t">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] border-t">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <div>
          <div className="py-24 px-6 border-b ">
            <h2 className="flex items-center  gap-2.5 text-5xl font-medium tracking-tighter pb-1.5 ">
              Explore features that
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                matter
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg">
              Discover the core functionalities that make Shortleap a powerful
              tool for developers
            </p>
          </div>
          <FeaturesSection />
        </div>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] border-t">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <div>
          <div className="py-24 px-6 border-b ">
            <h2 className="flex items-center  gap-2.5 text-5xl font-medium tracking-tighter pb-1.5 ">
              Built to perform, ready to
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                scale
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg">
              From a solid tech stack to worldwide click tracking. Everything
              you need for a powerful URL shortener
            </p>
          </div>
          <StackSection />
        </div>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] border-y">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
        <div className="relative bg-gradient-to-br from-violet-950 via-pink-950 to-purple-950 ">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background to-transparent z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
            <h2 className="tracking-tighter font-semibold text-5xl">
              Open source?
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent ml-4 mr-3">
                Of course!
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-lg max-w-2xl text-center mt-4">
              Shortleap is proudly open source. That means you’re free to
              explore the code, suggest improvements, and help shape the future
              of the project.
            </p>
            <div className="mt-12">
              <Button
                variant={"default"}
                className="w-full cursor-pointer"
                size={"lg"}
              >
                <SiGithub />
                View on GitHub
              </Button>
            </div>

            <div className="flex mt-20">
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
          <PixelCanvas className="w-full opacity-20 " />
        </div>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] border-y mb-10">
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <div>
          <div>
            <h2 className="py-24 px-6 border-b text-center text-muted-foreground text-balance font-semibold text-lg">
              You are in good company
            </h2>
          </div>
          <SponsorsSection />
        </div>

        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>

      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px] border-y mb-10  ">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>

        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>
      </section>
    </>
  );
}
