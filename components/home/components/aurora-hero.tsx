"use client";

import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

import Image from "next/image";

export default function AuroraHero() {
  return (
    <div className="relative">
      <div className="relative h-full w-full">
        <motion.div
          className="absolute -top-100 left-0 right-0 h-[1000px] w-[1800px] rounded-full m-auto -z-10 blur-3xl"
          animate={{
            background: [
              "radial-gradient(circle, rgba(236, 72, 228, 0.25) 0%, rgba(236, 72, 73, 0) 70%)",
              "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0) 70%)",
            ],
            scale: [1, 1.3, 1.15],
            skewX: [0, 25, -20, 30, -15, 0],
            skewY: [0, -30, 25, -20, 35, 0],
            rotate: [0, 8, -6, 10, -5, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        />
      </div>
      <div className="relative h-fit w-fit mx-auto rounded-sm animate-fade-in-up animate-delay-300">
        <Image
          src={"/images/dashboard_dark_big.webp"}
          alt="Dashboard"
          width={1080}
          height={500}
          className="mx-auto rounded-sm border border-muted-foreground/20 shadow-xl "
        />
        <BorderBeam
          duration={6}
          size={500}
          className="from-pink-500/10 via-purple-500/80 to-pink-500/10"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={500}
          className="from-purple-500/10 via-pink-500/80 to-purple-500/10"
        />
      </div>
    </div>
  );
}
