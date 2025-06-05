"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { features } from "../utils/home-constants";
import { HorizontalBorder, VerticalBorder } from "../../ui/border";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <HorizontalBorder>
      <article id="features">
        <VerticalBorder>
          <header className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 border-b">
            <motion.h2
              className="flex flex-row items-center justify-center gap-2.5 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tighter pb-3 sm:pb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.05,
              }}
            >
              <span>Explore features that</span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                matter
              </span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-balance font-normal text-base sm:text-lg text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.15,
              }}
            >
              Discover the core functionalities that make Shortleap a powerful
              tool for developers
            </motion.p>
          </header>
        </VerticalBorder>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 bg-muted-foreground/5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.33, 1, 0.68, 1],
                  delay: index * 0.1,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <MagicCard
                  gradientColor="oklch(0.552 0.016 285.938 / 0.2)"
                  className="rounded-sm group relative overflow-hidden transition-all h-full"
                >
                  <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 ">
                    <div className="aspect-square size-12 sm:size-16 grid place-content-center rounded-sm border border-violet-400/40 bg-background shadow-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-violet-500">
                      <Icon
                        size={20}
                        className="text-violet-400 transition-colors duration-200 group-hover:text-violet-400 group-hover:drop-shadow-glow"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <h3 className="text-lg sm:text-xl font-semibold group-hover:text-violet-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 h-full w-full bg-transparent dark:bg-[linear-gradient(to_right,#4f4f4f50_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f50_1px,transparent_1px)] bg-[linear-gradient(to_right,#4f4f4f14_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f14_1px,transparent_1px)] bg-[size:2rem_2rem] mask-l-from-1% mask-b-to-100% transition-opacity duration-500 group-hover:opacity-80 z-10" />
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </section>
      </article>
    </HorizontalBorder>
  );
}
