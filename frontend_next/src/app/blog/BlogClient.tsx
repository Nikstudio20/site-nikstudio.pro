'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Header_mobile from '@/components/Header_mobile';
import Footer from '@/components/Footer';
import FooterMobile from "@/components/Footer_mobile";

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
});

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  position: string;
  created_at: string;
  updated_at: string;
  slug: string;
  status: boolean | string | number;
}

interface ApiResponse {
  status: string;
  data: BlogPost[];
}

function getImageUrl(imagePath: string | null): string {
  if (!imagePath) return '/images/blog/blog_img1.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/storage/')) return `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
  if (imagePath.startsWith('/images/')) return imagePath;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/blog/${imagePath}`;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog-posts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch blog posts');

    const data: ApiResponse = await res.json();
    console.log('All posts:', data.data);
    console.log('Posts status values:', data.data?.map(post => ({ id: post.id, status: post.status, type: typeof post.status })));
    return data.data?.filter(post => post.status === true).map(post => ({
      ...post,
      image: getImageUrl(post.image),
    })) || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default function BlogClient() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getBlogPosts().then(setBlogPosts);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visiblePosts = isMobile && !showAll ? blogPosts.slice(0, 3) : blogPosts;

  return (
    <main className={`relative flex flex-col min-h-screen bg-[#0E1011] max-w-[2560px] w-full mx-auto ${inter.variable}`}>
      <Header />
      <Header_mobile />

      <section className="w-full pt-1 sm:pt-38 pb-24 px-6 sm:px-12 lg:px-24 3xl:px-[120px] 3xl:pt-[200px] 3xl:pb-[100px]">
        <div className="flex flex-col">
          <h1 className="text-white text-[60px] sm:text-[200px] 2xl:text-[280px] 3xl:text-[320px] font-geometria font-extrabold uppercase leading-[100%]">
            БЛОГ
          </h1>
          <p className="mt-[29px] sm:mt-[10px] text-white text-[32px] sm:text-4xl md:text-6xl lg:text-[80px] 3xl:text-[100px] font-geometria font-medium sm:font-semibold leading-[100%] sm:leading-[1.2] tracking-[-0.025em] max-w-[1400px]">
            Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда.
          </p>
        </div>
      </section>

      <section className="w-full flex flex-wrap -mt-14 sm:mt-0">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 group">
              <article className="relative bg-[#0E1011] transition-colors duration-300 group-hover:bg-white h-full">
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={post.image || '/images/blog/blog_img1.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="px-[20px] sm:px-0 pb-[78px] sm:pb-0 pt-[38px] sm:pt-0 sm:p-8 md:p-20 3xl:p-[120px] flex flex-col gap-12 3xl:gap-16 bg-inherit">
                  <span className="text-white/60 group-hover:text-black/60 text-[20px] sm:text-xl md:text-[30px] 3xl:text-[40px] font-geometria font-light sm:font-normal leading-none transition-colors duration-300">
                    {post.position || 'Блог'}
                  </span>
                  <div className="flex flex-col gap-4 3xl:gap-6">
                    <h2 className="-mt-7 sm:mt-0 text-white group-hover:text-black text-[24px] sm:text-3xl xl:text-[36px] 2xl:text-[48px] 3xl:text-[60px] font-geometria font-bold uppercase leading-[1.3] transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-white group-hover:text-black text-[16px] sm:text-lg md:text-[22px] 3xl:text-[28px] font-inter font-normal leading-[1.7] transition-colors duration-300">
                      {post.description}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <Link href="/blog/pochemu-produmannyj-dizajn-prodaet" className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 group">
            <article className="relative bg-[#0E1011] transition-colors duration-300 group-hover:bg-white h-full">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src="/images/blog/blog_img1.jpg"
                  alt="Почему продуманный дизайн продает"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 md:p-20 3xl:p-[120px] flex flex-col gap-12 3xl:gap-16 bg-inherit">
                <span className="text-white/60 group-hover:text-black/60 text-xl md:text-[30px] 3xl:text-[40px] font-geometria font-normal leading-none transition-colors duration-300">
                  (Креативный директор)
                </span>
                <div className="flex flex-col gap-4 3xl:gap-6">
                  <h2 className="text-white group-hover:text-black text-3xl xl:text-[36px] 2xl:text-[48px] 3xl:text-[60px] font-geometria font-bold uppercase leading-[1.3] transition-colors duration-300">
                    ПОЧЕМУ ПРОДУМАННЫЙ ДИЗАЙН ПРОДАЕТ
                  </h2>
                  <p className="text-white group-hover:text-black text-lg md:text-[22px] 3xl:text-[28px] font-inter font-normal leading-[1.7] transition-colors duration-300">
                    Discover key strategies to create a memorable and impactful brand for your small business.
                  </p>
                </div>
              </div>
            </article>
          </Link>
        )}
      </section>

      {isMobile && blogPosts.length > 3 && (
        <div className="w-full flex justify-center mt-0 sm:hidden mb-15">
            <button
            onClick={() => setShowAll(!showAll)}
            className="flex flex-row items-center justify-between gap-2 px-4 w-[173px] h-[40px] text-white border-2 border-white rounded-full font-inter font-semibold text-[16px] hover:bg-white hover:text-[#0E1011] transition-colors duration-300"
            >
            {showAll ? 'скрыть' : 'смотреть все'}
            <Image
                src={showAll ? '/images/blog/arrow-up.svg' : '/images/blog/arrow.svg'}
                alt="Arrow"
                width={12}
                height={6}
            />
            </button>
        </div>
        )}           

      <Footer />
      <FooterMobile />
    </main>
  );
}
