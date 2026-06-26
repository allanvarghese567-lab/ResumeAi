'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage
    const savedTheme = (localStorage.getItem('theme') || 'system') as Theme;
    setTheme(savedTheme);

    // Check system theme preference
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemTheme(darkModeQuery.matches ? 'dark' : 'light');

      const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };

      darkModeQuery.addEventListener('change', handleChange);
      return () => darkModeQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    const newTheme = effectiveTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const setThemeMode = (mode: Theme) => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
    applyTheme(mode === 'system' ? systemTheme : mode);
  };

  const applyTheme = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (mounted) {
      applyTheme(effectiveTheme);
    }
  }, [effectiveTheme, mounted]);

  return {
    theme,
    effectiveTheme,
    toggleTheme,
    setThemeMode,
    mounted,
  };
}
