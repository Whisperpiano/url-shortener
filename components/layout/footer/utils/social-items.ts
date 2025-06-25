import { IconType } from "react-icons/lib";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

export interface SocialItem {
  href: string;
  label: string;
  icon: IconType;
  external?: boolean;
}

export const SOCIAL_ITEMS: SocialItem[] = [
  {
    href: "https://github.com/Whisperpiano",
    label: "GitHub",
    icon: FaGithub,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/jes%C3%BAs-alberola-herrero-896b61189/",
    label: "LinkedIn",
    icon: FaLinkedin,
    external: true,
  },
  {
    href: "mailto:jesusalberola90@gmail.com",
    label: "Email",
    icon: Mail,
    external: true,
  },
];
