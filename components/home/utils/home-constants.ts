import {
  BarChart3,
  Hourglass,
  LinkIcon,
  PencilLine,
  QrCode,
} from "lucide-react";

import Sponsor1 from "@/lib/assets/sponsors/logoipsum-1.svg";
import Sponsor2 from "@/lib/assets/sponsors/logoipsum-2.svg";
import Sponsor3 from "@/lib/assets/sponsors/logoipsum-3.svg";
import Sponsor4 from "@/lib/assets/sponsors/logoipsum-4.svg";
import Sponsor5 from "@/lib/assets/sponsors/logoipsum-5.svg";
import Sponsor6 from "@/lib/assets/sponsors/logoipsum-6.svg";
import Sponsor7 from "@/lib/assets/sponsors/logoipsum-7.svg";
import Sponsor8 from "@/lib/assets/sponsors/logoipsum-8.svg";

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

export const sponsors = [
  {
    id: 1,
    name: "Logo Ipsum",
    logo: Sponsor1,
    href: "https://logoipsum.com/",
  },
  {
    id: 2,
    name: "Logo Ipsum",
    logo: Sponsor2,
    href: "https://logoipsum.com/",
  },
  {
    id: 3,
    name: "Logo Ipsum",
    logo: Sponsor3,
    href: "https://logoipsum.com/",
  },
  {
    id: 4,
    name: "Logo Ipsum",
    logo: Sponsor4,
    href: "https://logoipsum.com/",
  },
  {
    id: 5,
    name: "Logo Ipsum",
    logo: Sponsor5,
    href: "https://logoipsum.com/",
  },
  {
    id: 6,
    name: "Logo Ipsum",
    logo: Sponsor6,
    href: "https://logoipsum.com/",
  },
  {
    id: 7,
    name: "Logo Ipsum",
    logo: Sponsor7,
    href: "https://logoipsum.com/",
  },
  {
    id: 8,
    name: "Logo Ipsum",
    logo: Sponsor8,
    href: "https://logoipsum.com/",
  },
];
