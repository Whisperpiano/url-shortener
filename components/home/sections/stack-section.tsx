"use client";

import { motion } from "framer-motion";
import { HorizontalBorder, VerticalBorder } from "@/components/ui/border";

import GlobeCard from "../components/globe-card";
import StackCard from "../components/stack-card";

export default function StackSection() {
  return (
    <HorizontalBorder>
      <article id="stack">
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
              <span>Built to perform, ready to</span>
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                scale
              </span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-balance font-normal text-base sm:text-lg text-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.15,
              }}
            >
              From a solid tech stack to worldwide click tracking. Everything
              you need for a powerful URL shortener
            </motion.p>
          </header>
        </VerticalBorder>

        <section className="grid grid-cols-1 gap-3 sm:gap-4 p-3 sm:p-4 md:grid-cols-2 bg-muted-foreground/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.1,
            }}
          >
            <StackCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.2,
            }}
          >
            <GlobeCard />
          </motion.div>
        </section>
      </article>
    </HorizontalBorder>
  );
}
