"use client";

import { motion } from "framer-motion";
import { HorizontalBorder, VerticalBorder } from "@/components/ui/border";
import { ArrowRight } from "lucide-react";
import { sponsors } from "../utils/home-constants";

import Link from "next/link";

export default function SponsorsSection() {
  return (
    <HorizontalBorder>
      <article id="sponsors">
        <VerticalBorder>
          <header className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 border-b">
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
              You are in good
              <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent bg-foreground">
                company
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
              Designed with scalability and transparency in mind. Want to
              support the project or become a sponsor?
            </motion.p>
          </header>
        </VerticalBorder>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.1,
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.id}
              className="overflow-hidden group border aspect-[16/6] flex items-center justify-center relative p-3 sm:p-4"
              href={sponsor.href}
              target="_blank"
            >
              <div className="transition-all duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:-translate-y-4 duration-300 flex items-center justify-center w-full h-full">
                <sponsor.logo className="w-24 sm:w-28 md:w-32 h-auto" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-6 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </motion.section>
      </article>
    </HorizontalBorder>
  );
}
