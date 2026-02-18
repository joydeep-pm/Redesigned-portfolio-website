'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Linkedin } from 'lucide-react';
import { ThemeMenu } from './ThemeMenu';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/projects', label: 'Projects' },
  { href: '/threads', label: 'Threads' },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-border-default">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-base md:text-lg font-extrabold tracking-wider uppercase text-text-primary">
          Joydeep Sarkar
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105 ${
                isActive(item.href)
                  ? 'text-white bg-accent-primary px-3 py-2 rounded-md'
                  : 'text-text-primary hover:text-accent-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/in/joydeepsarkar1987/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-md bg-bg-muted text-text-primary hover:bg-accent-secondary hover:text-white transition-all duration-200 hover:scale-105 flex items-center justify-center"
          >
            <Linkedin size={18} strokeWidth={2.5} />
          </a>
          <ThemeMenu />
        </div>

        <button
          className="md:hidden p-2 text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-muted border-t-2 border-border-default px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-accent-primary text-white'
                  : 'text-text-primary hover:bg-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/in/joydeepsarkar1987/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white text-text-primary text-sm font-semibold uppercase tracking-wider"
          >
            <Linkedin size={16} strokeWidth={2.5} /> LinkedIn
          </a>
          <div className="pt-1">
            <ThemeMenu />
          </div>
        </div>
      )}
    </nav>
  );
}
