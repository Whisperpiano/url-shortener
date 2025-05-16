import { MagicCard } from "@/components/magicui/magic-card";
import { features } from "../utils/home-constants";
import { HorizontalBorder, VerticalBorder } from "../../ui/border";

export default function FeaturesSection() {
  return (
    <HorizontalBorder>
      <article id="features">
        <VerticalBorder>
          <header className="py-32 px-6 border-b">
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
          </header>
        </VerticalBorder>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3 p-4 bg-muted-foreground/5 ">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <MagicCard
                gradientColor="oklch(0.552 0.016 285.938 / 0.2)"
                className="rounded-sm group relative overflow-hidden "
                key={feature.title}
              >
                <div className="p-6 flex flex-col gap-6">
                  <div className="aspect-square size-16 grid place-content-center rounded-sm border border-violet-400/40 bg-background shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 group-hover:border-violet-500">
                    <Icon
                      size={24}
                      className="text-violet-400 transition-all duration-300 group-hover:text-violet-400 group-hover:drop-shadow-glow group-hover:animate-jiggle"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold group-hover:text-violet-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-base text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300 ">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 h-full w-full bg-transparent dark:bg-[linear-gradient(to_right,#4f4f4f50_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f50_1px,transparent_1px)] bg-[linear-gradient(to_right,#4f4f4f14_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f14_1px,transparent_1px)] bg-[size:2rem_2rem] mask-l-from-1% mask-b-to-100% transition-opacity duration-500 group-hover:opacity-80 z-10 " />
                </div>
              </MagicCard>
            );
          })}
        </section>
      </article>
    </HorizontalBorder>
  );
}
