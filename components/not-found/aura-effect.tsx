"use client";

import { motion } from "framer-motion";

export default function AuraEffect() {
  return (
    <motion.div
      className="absolute -bottom-40 left-0 right-0 h-[500px] w-[1200px] rounded-full m-auto -z-10 blur-3xl"
      animate={{
        background: [
          "radial-gradient(circle, rgba(236, 72, 228, 0.15) 0%, rgba(236, 72, 73, 0) 70%)",
          "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)",
        ],
        scale: [1, 1.2, 1.1],
        skewX: [0, 15, -10, 20, -5, 0],
        skewY: [0, -20, 15, -10, 25, 0],
        rotate: [0, 5, -3, 7, -2, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror",
      }}
    />
  );
}
