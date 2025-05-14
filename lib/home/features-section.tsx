import { MagicCard } from "@/components/magicui/magic-card";

import {
  Link as LinkIcon,
  PencilLine,
  BarChart3,
  QrCode,
  Hourglass,
  Github,
} from "lucide-react";

const features = [
  {
    title: "URL Shortening",
    description:
      "Transform long, messy links into clean, short URLs in a single click or copy-paste.",
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
      "Track clicks,  geolocation data, and performance over time with a simple, clear dashboard.",
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
      "Fully open source on GitHub, deploy it yourself or contribute to the project and help shape its future.",
    icon: Github,
  },
];

export default function FeaturesSection() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3 p-4 bg-muted-foreground/5 ">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <MagicCard
            gradientColor="oklch(0.552 0.016 285.938 / 0.2)"
            className="rounded-sm group relative overflow-hidden "
            key={feature.title}
          >
            <div className="p-8 flex flex-col gap-4">
              <div className="aspect-square size-16 grid place-content-center rounded-sm border border-violet-400/40 bg-background shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 group-hover:border-violet-500">
                <Icon
                  size={24}
                  className="text-violet-400 transition-all duration-300 group-hover:text-violet-400 group-hover:drop-shadow-glow group-hover:animate-jiggle"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold group-hover:text-violet-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300 ">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#4f4f4f50_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f50_1px,transparent_1px)] bg-[size:2rem_2rem] mask-l-from-1% mask-b-to-100% transition-opacity duration-500 group-hover:opacity-80 z-10" />
            </div>
          </MagicCard>
        );
      })}

      <div className="border-l"></div>
    </section>
  );
}
