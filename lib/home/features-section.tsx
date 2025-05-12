"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import clsx from "clsx";
import {
  Link as LinkIcon,
  PencilLine,
  BarChart3,
  QrCode,
  Hourglass,
  Github,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const features = [
  {
    title: "URL Shortening",
    description:
      "Transform long, messy links into clean, short URLs in a single click.",
    icon: LinkIcon,
  },
  {
    title: "Custom Slugs",
    description:
      "Choose your own short link endings to make your URLs memorable and brand-friendly.",
    icon: PencilLine,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track clicks, referrers, geolocation data, and performance over time with a simple, clear dashboard.",
    icon: BarChart3,
  },
  {
    title: "QR Code Generator",
    description:
      "Generate scannable QR codes for any shortened link, ready to share in print or digitally.",
    icon: QrCode,
  },
  {
    title: "Link Expiration",
    description:
      "Set expiration dates or click limits to automatically deactivate links after a period of time.",
    icon: Hourglass,
  },
  {
    title: "Open Source & Self-Hostable",
    description:
      "Fully open source on GitHub — deploy it yourself or contribute to the project and help shape its future.",
    icon: Github,
  },
];

export default function FeaturesSection() {
  const [mounted, setMountd] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMountd(true);
  }, []);

  return (
    <section className="my-30 border p-4 ">
      <h2 className="text-4xl font-bold text-center mb-12">
        Powerful features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide border ">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <MagicCard
              gradientColor={clsx(
                mounted && theme === "dark" ? "#262626" : "#D9D9D955"
              )}
              className="p-0 z-20"
              key={feature.title}
            >
              <div
                key={feature.title}
                className="group relative flex items-center gap-8 py-16 px-8 transition duration-300 hover:outline hover:outline-offset-[-1px] hover:outline-violet-500 overflow-hidden "
              >
                <div className=" aspect-square size-20 grid place-content-center rounded-lg bg-background border-2 border-violet-500/50 transition-all duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:border-violet-500">
                  <Icon className="size-8 text-violet-500 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,1)] group-hover:text-violet-400 group-hover:animate-jiggle" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-violet-400">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground transition-colors duration-300 group-hover:text-zinc-300">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#4f4f4f50_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f50_1px,transparent_1px)] bg-[size:2rem_2rem] mask-r-from-1% mask-b-to-100% transition-opacity duration-500 group-hover:opacity-80 z-10" />
              </div>
            </MagicCard>
          );
        })}
      </div>
    </section>
  );
}
