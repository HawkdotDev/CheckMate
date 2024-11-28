import { useState, useEffect } from 'react';
import type { Theme } from '../types';

const THEME_KEY = 'theme-preference';

const lightTheme: Theme = {
  isDark: false,
  background: '#f3f4f6',
  text: '#111827',
  headerBg: '#ffffff',
  headerText: '#111827',
};

const darkTheme: Theme = {
  isDark: true,
  background: '#1f2937',
  text: '#f3f4f6',
  headerBg: '#111827',
  headerText: '#f3f4f6',
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    document.documentElement.classList.toggle('dark', theme.isDark);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev.isDark ? lightTheme : darkTheme));
  };

  return { theme, toggleTheme };
}