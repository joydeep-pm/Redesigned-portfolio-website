'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/') {
    return <main>{children}</main>;
  }

  return (
    <>
      <Nav />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
