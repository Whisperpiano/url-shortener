"use client";

import { MonitorSmartphone, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import clsx from "clsx";

const themes = [
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

export default function ThemeSettings() {
  const { theme: activeTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CardContent>
      <ul>
        {themes.map((theme) => (
          <li
            key={theme.value}
            onClick={() => setTheme(theme.value)}
            className={clsx(
              "group cursor-pointer hover:bg-muted/70 rounded-none transition-colors duration-400 p-4 flex items-center gap-4",
              mounted &&
                activeTheme === theme.value &&
                "bg-muted hover:bg-muted"
            )}
          >
            {theme.icon}
            <div className="flex flex-col">
              <span className="text-sm font-normal">{theme.text}</span>
              <span className="text-xs text-muted-foreground">
                {theme.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
  );
}
