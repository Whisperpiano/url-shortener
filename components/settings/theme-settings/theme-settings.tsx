"use client";

import { CardContent } from "@/components/ui/card";
import { themes } from "./utils/themes";
import { useThemeSettings } from "@/lib/hooks/settings/useThemeSettings";

import clsx from "clsx";

export default function ThemeSettings() {
  const { theme: activeTheme, setTheme, mounted } = useThemeSettings();

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
