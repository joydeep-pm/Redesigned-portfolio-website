import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@fontsource/outfit/index.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Joydeep Sarkar | Fintech Product Leader',
  description: 'Director of Product at M2P Fintech. Building lending infrastructure for Indian Digital Lending.',
  openGraph: {
    title: 'Joydeep Sarkar | Fintech Product Leader',
    description: 'Director of Product at M2P Fintech. Building lending infrastructure for Indian Digital Lending.',
    url: 'https://joydeepsarkar.me',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <ThemeProvider>
          <Nav />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
