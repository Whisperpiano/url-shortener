"use client";

import { motion } from "framer-motion";

export default function AnimatedHeader() {
  return (
    <header className="flex flex-col items-center gap-3 sm:gap-4">
      <motion.h2
        className="tracking-tighter font-semibold text-2xl sm:text-4xl md:text-5xl text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.05,
        }}
      >
        <span className="inline sm:hidden">Open source?</span>
        <span className="hidden sm:inline">Open source?</span>
        <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent block sm:inline sm:ml-4 sm:mr-3">
          Of course!
        </span>
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-balance font-normal text-base sm:text-lg max-w-2xl text-center mt-2"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.4,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.15,
        }}
      >
        Shortleap is proudly open source. That means you&apos;re free to explore
        the code, suggest improvements, and help shape the future of the
        project.
      </motion.p>
    </header>
  );
}
