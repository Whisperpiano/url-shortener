import { HorizontalBorder, VerticalBorder } from "@/components/ui/border";

import GlobeCard from "../components/globe-card";
import StackCard from "../components/stack-card";

export default function StackSection() {
  return (
    <HorizontalBorder>
      <article id="stack">
        <VerticalBorder>
          <header className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 border-b">
            <h2 className="flex flex-row items-center justify-center gap-2.5 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tighter pb-3 sm:pb-4">
              <span>Built to perform, ready to</span>
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                scale
              </span>
            </h2>
            <p className="text-muted-foreground text-balance font-normal text-base sm:text-lg text-center">
              From a solid tech stack to worldwide click tracking. Everything
              you need for a powerful URL shortener
            </p>
          </header>
        </VerticalBorder>

        <section className="grid grid-cols-1 gap-3 sm:gap-4 p-3 sm:p-4 md:grid-cols-2 bg-muted-foreground/5">
          <StackCard />
          <GlobeCard />
        </section>
      </article>
    </HorizontalBorder>
  );
}
