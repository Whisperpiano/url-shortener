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

import ReactIcon from "@/lib/assets/icons/react.svg";
import TypeScriptIcon from "@/lib/assets/icons/typescript.svg";
import TailwindIcon from "@/lib/assets/icons/tailwindcss.svg";
import ShadcnIcon from "@/lib/assets/icons/shadcn.svg";
import FramerIcon from "@/lib/assets/icons/framer.svg";
import AuthjsIcon from "@/lib/assets/icons/authjs.svg";
import ZodIcon from "@/lib/assets/icons/zod.svg";
import DrizzleIcon from "@/lib/assets/icons/drizzle.svg";
import TursoIcon from "@/lib/assets/icons/turso.svg";
import CloudinaryIcon from "@/lib/assets/icons/cloudinary.svg";

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

export const outsideIcons = [
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
    dark: "dark:text-[#38bdf8]",
    light: "text-[#38bdf8]",
  },
  {
    name: "Framer Motion",
    icon: FramerIcon,
    dark: "dark:text-foreground",
    light: "text-foreground",
  },
  {
    name: "React",
    icon: ReactIcon,
    dark: "dark:text-[#58c4dc]",
    light: "text-[#087ea4]",
  },
  {
    name: "Shadcn UI",
    icon: ShadcnIcon,
    dark: "dark:text-foreground",
    light: "text-foreground",
  },
];

export const middleIcons = [
  {
    name: "TypeScript",
    icon: TypeScriptIcon,
    dark: "dark:text-[#3178C6]",
    light: "text-[#3197c6]",
  },
  {
    name: "AuthJS",
    icon: AuthjsIcon,
    dark: "dark:text-foreground",
    light: "text-foreground",
  },
  {
    name: "Zod",
    icon: ZodIcon,
    dark: "dark:text-[#3175d4]",
    light: "text-[#45a6df]",
  },
];

export const insideIcons = [
  {
    name: "Drizzle",
    icon: DrizzleIcon,
    dark: "dark:text-[#C5F74F]",
    light: "text-[#7fa724]",
  },
  {
    name: "Turso",
    icon: TursoIcon,
    dark: "dark:text-foreground",
    light: "text-foreground",
  },
  {
    name: "Cloudinary",
    icon: CloudinaryIcon,
    dark: "dark:text-[#3448C5]",
    light: "text-[#3448C5]",
  },
];
