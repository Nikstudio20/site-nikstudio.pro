import { Metadata } from 'next';
import { SEOMetadataGenerator } from '@/lib/seo-metadata';
import ProjectsClient from './ProjectsClient';

// Generate metadata for projects listing page
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  
  return SEOMetadataGenerator.generateMetadata({
    content: {
      title: 'Проекты',
      main_title: 'Проекты',
      description: 'Комплексные решения для промышленных компаний. Все части проекта в едином ключе.',
      main_image: undefined
    },
    globalSettings,
    pageType: 'project'
  });
}

export default function ProjectsPage() {
  return <ProjectsClient />;
}