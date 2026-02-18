'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'real-dark';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem('site-theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark' || stored === 'real-dark') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-real-dark');
    root.classList.add(`theme-${theme}`);
    window.localStorage.setItem('site-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'real-dark') return;

    const root = document.documentElement;
    const updateFlash = (event: MouseEvent) => {
      root.style.setProperty('--flash-x', `${event.clientX}px`);
      root.style.setProperty('--flash-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', updateFlash);
    return () => {
      window.removeEventListener('mousemove', updateFlash);
      root.style.removeProperty('--flash-x');
      root.style.removeProperty('--flash-y');
    };
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {theme === 'real-dark' && <div aria-hidden className="flashlight-overlay" />}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
}
