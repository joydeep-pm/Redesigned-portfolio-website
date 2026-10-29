import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { PortfolioChatWidget } from '@/components/PortfolioChatWidget';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { CHAT_ENABLED, SAME_AS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', weight: ['500', '700', '800'] });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-dm', weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Senior Director of Product',
  worksFor: { '@type': 'Organization', name: 'M2P Fintech' },
  description: SITE_DESCRIPTION,
  sameAs: SAME_AS,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        <Nav />
        <main className="pt-20">{children}</main>
        <Footer />
        {CHAT_ENABLED && <PortfolioChatWidget />}
        <Analytics />
      </body>
    </html>
  );
}
