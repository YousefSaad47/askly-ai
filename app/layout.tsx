import type { Metadata } from 'next';
import type { Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import Providers from '@/components/providers';
import { GradientBackground } from '@/components/back-ground-gradient';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Askly AI',
  description:
    'An AI assistant that provides accurate and relevant answers to user questions.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <GradientBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
