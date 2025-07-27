import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateHomeMetadata } from '@/lib/seo-helpers';
import './globals.css';

// Подключаем Google Fonts Inter
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.cdnfonts.com/css/geometria" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}