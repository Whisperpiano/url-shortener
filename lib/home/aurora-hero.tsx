"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { ParticlesComponent } from "@/components/particles/particles-component";
import Image from "next/image";
import { useEffect } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";

const COLORS = ["rgba(236, 72, 228, 0.3)", "rgba(168, 85, 247, 0.4)"];

export default function AuroraHero() {
  const color = useMotionValue(COLORS[0]);
  const background = useMotionTemplate`radial-gradient(circle, ${color} 15%, rgba(236, 72, 73, 0) 75%)`;
  // const border = useMotionTemplate`1px solid ${color}`;
  // const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <div className="-translate-y-[300px]">
      {/* <motion.button
        style={{ border, boxShadow }}
        className="group relative flex w-fit items-center gap-1.5 rounded-full bg-background px-4 py-2 transition-colors"
      >
        START HERE
      </motion.button> */}
      <div className="relative max-w-7xl mx-auto overflow-hidden h-[500px]">
        <ParticlesComponent className="w-full h-full -z-20" />
      </div>

      <div className="relative h-full w-full">
        <motion.div
          className="absolute -top-180 left-0 right-0 h-[1248px] w-[1248px] rounded-full m-auto -z-10 blur-3xl"
          style={{
            background,
          }}
          animate={{
            scale: [1, 1.15, 1.1, 1.15, 1],
            skewX: [0, 6, -3, 4, -6, 6, -3, 4, -6, 0],
            skewY: [0, -4, 6, -2, 3, -4, 6, -2, 3, 0],
            opacity: [0.6, 0.7, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            background: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
            },
          }}
        />
      </div>
      <div className="relative h-fit w-fit mx-auto rounded-sm -translate-y-[160px]">
        <Image
          src="/images/dashboard_placeholder.webp"
          alt="Dashboard"
          width={1000}
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
