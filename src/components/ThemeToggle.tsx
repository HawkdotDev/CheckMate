import SunIcon from "../assets/icons/sun.svg";
import MoonIcon from "../assets/icons/moon.svg";
import type { Theme } from "../types";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme.isDark ? (
        <img src={SunIcon} alt="Light Mode" width={20} height={20} />
      ) : (
        <img src={MoonIcon} alt="Dark Mode" width={20} height={20} />
      )}
    </button>
  );
}
