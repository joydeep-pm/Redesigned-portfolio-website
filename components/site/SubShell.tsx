import type { ReactNode } from 'react';
import { HomeNav } from '@/components/home/HomeNav';
import { HomeEffects } from '@/components/home/HomeEffects';
import { ContactBand } from '@/components/site/ContactBand';
import '@/app/home.css';

export function SubShell({ children }: { children: ReactNode }) {
  return (
    <div className="oh sub">
      <HomeEffects />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <HomeNav variant="site" />
      <main id="main">{children}</main>
      <ContactBand />
    </div>
  );
}
