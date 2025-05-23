"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ParticlesComponent } from "@/components/particles/particles-component";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative overflow-hidden">
      {/* Particles background */}
      <ParticlesComponent className="absolute inset-0 pointer-events-none rotate-180" />

      {/* Content */}
      <motion.div
        className="max-w-md mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-8">
          <motion.div
            className="font-mono font-bold text-8xl leading-none select-none bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            404
          </motion.div>
        </div>

        <motion.h2
          className="text-2xl font-medium mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Link not found
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The short link you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/">
            <Button
              variant="default"
              className="flex items-center gap-2 mx-auto group relative overflow-hidden cursor-pointer"
              size="lg"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Shortleap</span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

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
    </div>
  );
}
