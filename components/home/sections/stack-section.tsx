import { HorizontalBorder, VerticalBorder } from "@/components/ui/border";

import GlobeCard from "../components/globe-card";
import StackCard from "../components/stack-card";

export default function StackSection() {
  return (
    <HorizontalBorder>
      <article id="stack">
        <VerticalBorder>
          <header className="py-32 px-6 border-b ">
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
          </header>
        </VerticalBorder>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 bg-muted-foreground/5 ">
          <StackCard />
          <GlobeCard />
        </section>
      </article>
    </HorizontalBorder>
  );
}
