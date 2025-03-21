"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="cursor-pointer text-muted-foreground transition-colors duration-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </Button>
  );
}
