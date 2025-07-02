// frontend_next/src/app/blog/page.tsx
import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Блог | NIK Studio - Новости и тенденции',
  description: 'Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда.',
  keywords: ['NIK Studio', 'блог', 'новости', 'тенденции', 'брендинг', 'стратегия'],
  openGraph: {
    title: 'Блог | NIK Studio - Новости и тенденции',
    description: 'Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда.',
    url: 'https://nikstudio.com/blog',
    siteName: 'NIK Studio',
    images: [
      {
        url: 'https://nikstudio.com/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'NIK Studio Blog Page',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function Page() {
  return <BlogClient />;
}
