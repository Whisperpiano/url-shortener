import {
  BarChart3,
  Hourglass,
  LinkIcon,
  PencilLine,
  QrCode,
} from "lucide-react";

import { SiGithub } from "react-icons/si";

export const features = [
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
    icon: SiGithub,
  },
];
