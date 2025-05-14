import AuthModal from "@/components/header/AuthModal";
import { ParticlesComponent } from "@/components/particles/particles-component";
import AuroraHero from "@/lib/home/aurora-hero";
import FeaturesSection from "@/lib/home/features-section";

export default async function Home() {
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
      <section className="max-w-[1780px] mx-auto grid grid-cols-[40px_1fr_40px]">
        {/* Dashed left border */}
        <div className="h-full text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x "></div>

        <div>
          <div className="py-24 px-6 border-y ">
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
    </>
  );
}
