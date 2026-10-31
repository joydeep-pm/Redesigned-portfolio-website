'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#numbers', label: 'Numbers' },
  { href: '#work', label: 'Work' },
  { href: '#builds', label: 'Builds' },
  { href: '#teardowns', label: 'Teardowns' },
  { href: '#writing', label: 'Writing' },
];

export function HomeNav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={solid ? 'nav solid' : 'nav'}>
      <div className="wrap">
        <a className="logo" href="#top">
          joydeep<b></b>
        </a>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="btn solid" href="mailto:joytdh@gmail.com">
          Say hello <i>&rarr;</i>
        </a>
      </div>
    </nav>
  );
}
