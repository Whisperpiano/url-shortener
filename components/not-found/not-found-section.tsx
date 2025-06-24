"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import Link from "next/link";

export default function NotFoundSection() {
  return (
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
  );
}
