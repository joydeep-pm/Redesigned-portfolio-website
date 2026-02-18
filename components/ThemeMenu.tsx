'use client';

import { type ComponentType, useEffect, useRef, useState } from 'react';
import { Sun, Moon, Lightbulb, ChevronDown, Check } from 'lucide-react';
import { useThemeMode, type ThemeMode } from './ThemeProvider';

const options: Array<{
  value: ThemeMode;
  title: string;
  subtitle: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
}> = [
  {
    value: 'light',
    title: 'Light',
    subtitle: 'Classic daylight mode',
    icon: Sun,
  },
  {
    value: 'dark',
    title: 'Dark',
    subtitle: 'Comfortable low-light mode',
    icon: Moon,
  },
  {
    value: 'real-dark',
    title: 'The Real Dark',
    subtitle: 'Cursor becomes a spotlight',
    icon: Lightbulb,
  },
];

export function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useThemeMode();
  const current = options.find((item) => item.value === theme) || options[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-12 px-4 rounded-md bg-bg-muted hover:bg-gray-200 transition-all duration-200 inline-flex items-center gap-3 text-text-primary"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Toggle theme menu"
      >
        <CurrentIcon size={18} strokeWidth={2.5} />
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 rounded-lg bg-white border-2 border-border-default p-2 z-[90]">
          {options.map((item) => {
            const Icon = item.icon;
            const selected = item.value === theme;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setTheme(item.value);
                  setOpen(false);
                }}
                className="w-full rounded-md p-3 text-left hover:bg-bg-muted transition-colors duration-200 flex items-start gap-3"
              >
                <div className="h-9 w-9 rounded-md bg-bg-muted flex items-center justify-center text-text-primary shrink-0 mt-0.5">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-2xl leading-none font-semibold tracking-tight text-text-primary">{item.title}</p>
                    {selected && <Check size={18} strokeWidth={2.8} className="text-text-primary shrink-0" />}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{item.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
