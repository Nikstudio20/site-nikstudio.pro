import { Metadata } from 'next';
import { SEOMetadataGenerator } from '@/lib/seo-metadata';
import BlogClient from './BlogClient';

// Generate metadata for blog listing page
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  
  return SEOMetadataGenerator.generateMetadata({
    content: {
      title: 'Блог',
      main_title: 'Блог',
      description: 'Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда.',
      main_image: undefined
    },
    globalSettings,
    pageType: 'blog'
  });
}

export default function Page() {
  return <BlogClient />;
}
