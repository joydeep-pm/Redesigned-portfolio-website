'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const homeLinks = [
  { href: '#numbers', label: 'Numbers' },
  { href: '#work', label: 'Work' },
  { href: '#builds', label: 'Builds' },
  { href: '#teardowns', label: 'Teardowns' },
  { href: '#writing', label: 'Writing' },
];

const siteLinks = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Builds' },
  { href: '/case-studies', label: 'Teardowns' },
  { href: '/threads', label: 'Writing' },
];

export function HomeNav({ variant = 'home' }: { variant?: 'home' | 'site' }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = variant === 'home' ? homeLinks : siteLinks;
  const solid = variant === 'site' || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => variant === 'site' && pathname.startsWith(href);

  return (
    <nav className={solid || open ? 'nav solid' : 'nav'}>
      <div className="wrap">
        {variant === 'home' ? (
          <a className="logo" href="#top">
            joydeep<b></b>
          </a>
        ) : (
          <Link className="logo" href="/">
            joydeep<b></b>
          </Link>
        )}
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              {variant === 'home' ? (
                <a href={l.href}>{l.label}</a>
              ) : (
                <Link href={l.href} className={isActive(l.href) ? 'act' : undefined}>
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="navr">
          <button type="button" className="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
          <a className="btn solid" href="mailto:joytdh@gmail.com">
            Say hello <i>&rarr;</i>
          </a>
        </div>
      </div>
      {open && (
        <div className="mnav">
          {variant === 'site' && (
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          )}
          {links.map((l) =>
            variant === 'home' ? (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
