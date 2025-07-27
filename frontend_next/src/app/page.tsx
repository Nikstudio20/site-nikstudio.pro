import { Metadata } from 'next';
import { SEOMetadataGenerator } from '@/lib/seo-metadata';
import Header_mini from "@/components/Header_mini";
import Header_mobile from "@/components/Header_mobile";
import Footer from "@/components/Footer";
import FooterMobile from "@/components/Footer_mobile";
import HomeContentWrapper from '@/components/HomeContentWrapper';

// Generate metadata for homepage
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await SEOMetadataGenerator.fetchGlobalSettings();
  
  return SEOMetadataGenerator.generateMetadata({
    content: null,
    globalSettings,
    pageType: 'home'
  });
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0E1011] overflow-x-hidden">
      {/* Header */}
      <Header_mobile />
      <div className="absolute top-0 right-0 w-full lg:w-1/2 z-10">
        <Header_mini />
      </div>

      {/* Content wrapped in Suspense */}
      <HomeContentWrapper />

      {/* Footer */}
      <Footer />
      <FooterMobile />
    </main>
  );
}