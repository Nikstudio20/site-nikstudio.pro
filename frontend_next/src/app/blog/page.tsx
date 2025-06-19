import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const inter = Inter({
  weight: ["400", "600"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Блог | NIK Studio - Новости и тенденции",
  description: "Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда.",
  keywords: ["NIK Studio", "блог", "новости", "тенденции", "брендинг", "стратегия"],
  openGraph: {
    title: "Блог | NIK Studio - Новости и тенденции",
    description: "Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда.",
    url: "https://nikstudio.com/blog",
    siteName: "NIK Studio",
    images: [
      {
        url: "https://nikstudio.com/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "NIK Studio Blog Page",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

// Типы данных для блога
interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  position: string;
  created_at: string;
  updated_at: string;
  slug: string;
}

interface ApiResponse {
  status: string;
  data: BlogPost[];
}

// Функция для формирования корректного URL изображения
function getImageUrl(imagePath: string | null): string {
  if (!imagePath) return '/images/blog/blog_img1.jpg';
  
  // Проверяем, начинается ли путь с http/https (абсолютный URL)
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Если путь начинается с /storage/ - это загруженный через форму файл
  if (imagePath.startsWith('/storage/')) {
    return `http://localhost:8000${imagePath}`;
  }
  
  // Для изображений, добавленных вручную через DBeaver (в public/images/blog)
  if (imagePath.startsWith('/images/')) {
    // Используем относительный путь для локальных изображений в Next.js
    return imagePath;
  }
  
  // Для случаев, когда передан только имя файла без пути
  return `http://localhost:8000/storage/blog/${imagePath}`;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/blog-posts`, {
      next: { revalidate: 60 },  // ISR: обновлять кэш раз в 60 секунд
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    const data: ApiResponse = await res.json();
    
    return data.data?.map(post => ({
      ...post,
      image: getImageUrl(post.image)
    })) || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function Blog() {
  // Получаем данные с API
  const blogPosts = await getBlogPosts();
  
  return (
    <main className={`relative flex flex-col min-h-screen bg-[#0E1011] max-w-[2560px] w-full mx-auto ${inter.variable}`}>
      {/* Header */}
      <Header />

      {/* Blog Title Section */}
      <section className="w-full pt-96 sm:pt-38 pb-24 px-6 sm:px-12 lg:px-24 3xl:px-[120px] 3xl:pt-[200px] 3xl:pb-[100px]">
        <div className="flex flex-col">
          <h1 className="text-white text-[88px] sm:text-[200px] 2xl:text-[280px] 3xl:text-[320px] font-geometria font-extrabold uppercase leading-[100%]">
            БЛОГ
          </h1>
          <p className="mt-[10px] text-white text-2xl sm:text-4xl md:text-6xl lg:text-[80px] 3xl:text-[100px] font-inter font-semibold leading-[1.2] tracking-[-0.025em] max-w-[1400px] 2xl:max-w-[1400px] max-w-full-3xl">
            Новости и тенденции, которые помогут усовершенствовать стратегию вашего бренда.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full flex flex-wrap">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 group"
            >
              <article className="relative bg-[#0E1011] transition-colors duration-300 group-hover:bg-white h-full">
                <div className="relative w-full aspect-square overflow-hidden">
                  {/* Использовать консоль для отладки */}
                  {/* {console.log(`Изображение: ${post.title}, URL: ${post.image}`)} */}
                  <Image
                    src={post.image || "/images/blog/blog_img1.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 md:p-20 3xl:p-[120px] flex flex-col gap-12 3xl:gap-16 bg-inherit">
                  <span className="text-white/60 group-hover:text-black/60 text-xl md:text-[30px] 3xl:text-[40px] font-geometria font-normal leading-none transition-colors duration-300">
                    {post.position || 'Блог'}
                  </span>
                  <div className="flex flex-col gap-4 3xl:gap-6">
                    <h2 className="text-white group-hover:text-black text-3xl xl:text-[36px] 2xl:text-[48px] 3xl:text-[60px] font-geometria font-bold uppercase leading-[1.3] transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-white group-hover:text-black text-lg md:text-[22px] 3xl:text-[28px] font-inter font-normal leading-[1.7] transition-colors duration-300">
                      {post.description}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          // Пример карточки (будет показана, если API не вернул постов)
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

      {/* Include Footer Component */}
      <Footer />
    </main>
  );
}
