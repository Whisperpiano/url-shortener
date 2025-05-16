import AuthModal from "@/components/header/AuthModal";
import { ParticlesComponent } from "@/components/particles/particles-component";
import { HorizontalBorder } from "@/components/ui/border";
import AuroraHero from "../components/aurora-hero";

export default function HeroSection() {
  return (
    <HorizontalBorder>
      <article
        id="hero"
        className="text-center relative h-full w-full py-32 overflow-hidden"
      >
        {/* Text section */}
        <section>
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
        </section>

        {/* Image & decoration section */}
        <div>
          <ParticlesComponent className="absolute h-1/2 top-0 w-full pointer-events-none" />

          <div className="mt-30 px-6">
            <AuroraHero />
          </div>
          <ParticlesComponent />
        </div>
      </article>
    </HorizontalBorder>
  );
}
