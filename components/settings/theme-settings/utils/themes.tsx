import { MonitorSmartphone, Moon, Sun } from "lucide-react";

export const themes = [
  {
    name: "System",
    value: "system",
    icon: <MonitorSmartphone />,
    text: "Automatic detection",
    description: "Adapts to your system settings.",
  },
  {
    name: "Light",
    value: "light",
    icon: <Sun />,
    text: "Always use light theme",
    description: "Optimized for bright environments.",
  },
  {
    name: "Dark",
    value: "dark",
    icon: <Moon />,
    text: "Dark mode",
    description: "Optimized for dark backgrounds.",
  },
];
