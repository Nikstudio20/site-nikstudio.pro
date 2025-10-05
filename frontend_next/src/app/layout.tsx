import type { Metadata } from 'next';
import { Inter, Cabin } from 'next/font/google';
// import localFont from 'next/font/local';
import { generateHomeMetadata } from '@/lib/seo-helpers';
import './globals.css';

// Подключаем Google Fonts Inter
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

// Подключаем Google Fonts Cabin с оптимизацией
const cabin = Cabin({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cabin',
  display: 'swap',
  preload: true,
});

// NOTE: Geometria font files are not available in the project.
// Using system font fallback (sans-serif) for now.
// To add Geometria as a local font:
// 1. Download Geometria font files (woff2 format)
// 2. Place them in src/fonts/ directory
// 3. Uncomment and configure the localFont below:
/*
const geometria = localFont({
  src: [
    {
      path: '../fonts/geometria-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/geometria-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geometria',
  display: 'swap',
});
*/

export async function generateMetadata(): Promise<Metadata> {
  return generateHomeMetadata();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* DNS Prefetch and Preconnect for critical domains */}
        <link rel="preconnect" href="http://localhost:8000" />
        <link rel="dns-prefetch" href="http://localhost:8000" />
        
        {/* DNS Prefetch and Preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.cdnfonts.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Geometria font from CDN - to be replaced with local font files */}
        <link 
          href="https://fonts.cdnfonts.com/css/geometria" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.variable} ${cabin.variable}`}>
        {children}
      </body>
    </html>
  );
}