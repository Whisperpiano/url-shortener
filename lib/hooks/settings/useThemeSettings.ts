import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const useThemeSettings = () => {
  const { theme: activeTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme: activeTheme,
    setTheme,
    mounted,
  };
};
