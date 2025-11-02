import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 transition-all absolute rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="h-5 w-5 transition-all absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  );
}