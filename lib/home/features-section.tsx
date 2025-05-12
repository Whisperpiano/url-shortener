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
  return (
    <section className="mt-30">
      <h2 className="text-4xl font-bold text-center mb-12">
        Powerful features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex items-start gap-4">
              <Icon className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
