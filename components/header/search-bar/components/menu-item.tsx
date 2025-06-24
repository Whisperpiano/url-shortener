import {
  Home,
  LayoutDashboard,
  Settings,
  Bug,
  Mail,
  HeartHandshake,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

interface CommandLinkItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  authOnly?: boolean;
}

export const commandGroups: {
  heading: string;
  items: CommandLinkItem[];
}[] = [
  {
    heading: "Suggestions",
    items: [
      {
        href: "/",
        label: "Home",
        icon: <Home />,
        authOnly: true,
      },
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard />,
        authOnly: true,
      },
      {
        href: "/account/settings",
        label: "Settings",
        icon: <Settings />,
        authOnly: true,
      },
    ],
  },
  {
    heading: "Contribute",
    items: [
      {
        href: "https://github.com/Whisperpiano/url-shortener",
        label: "Contribute",
        icon: <HeartHandshake />,
        external: true,
      },
      {
        href: "https://github.com/Whisperpiano/url-shortener/issues",
        label: "Report a bug",
        icon: <Bug />,
        external: true,
      },
    ],
  },
  {
    heading: "Contact",
    items: [
      {
        href: "https://github.com/Whisperpiano",
        label: "GitHub",
        icon: <FaGithub />,
        external: true,
      },
      {
        href: "https://www.linkedin.com/in/jes%C3%BAs-alberola-herrero-896b61189/",
        label: "LinkedIn",
        icon: <FaLinkedin />,
        external: true,
      },
      {
        href: "mailto:jesusalberola90@gmail.com",
        label: "Email",
        icon: <Mail />,
        external: true,
      },
    ],
  },
];

export type { CommandLinkItem };
