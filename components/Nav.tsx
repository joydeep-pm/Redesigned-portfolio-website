'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/case-studies', label: 'Teardowns' },
  { href: '/projects', label: 'Builds' },
  { href: '/threads', label: 'Writing' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur border-b-[3px] border-ink">
      <div className="max-w-6xl mx-auto px-5 h-[72px] flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-extrabold tracking-tight text-ink">
          joydeep.
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors duration-150 ${
                isActive(item.href) ? 'bg-sun border-2 border-ink' : 'border-2 border-transparent hover:border-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a href="mailto:joytdh@gmail.com" className="pop-btn ml-2 !py-2">
            Say hello
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t-[3px] border-ink bg-cream px-5 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-full px-4 py-3 font-bold border-2 border-ink ${isActive(item.href) ? 'bg-sun' : 'bg-white'}`}
            >
              {item.label}
            </Link>
          ))}
          <a href="mailto:joytdh@gmail.com" className="pop-btn justify-center">
            Say hello
          </a>
        </div>
      )}
    </nav>
  );
}
