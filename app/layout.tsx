import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PortfolioChatWidget } from '@/components/PortfolioChatWidget';
import { Analytics } from '@vercel/analytics/next';
import { SAME_AS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site';
import '@fontsource/outfit/index.css';
import './globals.css';

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
  jobTitle: 'Director of Product',
  worksFor: { '@type': 'Organization', name: 'M2P Fintech' },
  description: SITE_DESCRIPTION,
  sameAs: SAME_AS,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        <ThemeProvider>
          <Nav />
          <main className="pt-16">{children}</main>
          <Footer />
          <PortfolioChatWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
