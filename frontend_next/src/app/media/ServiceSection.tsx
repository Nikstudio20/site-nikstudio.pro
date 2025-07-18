"use client";
import CarouselWithLightbox from "../components/CarouselWithLightbox";

// Интерфейсы для типизации
interface Slide {
  mainImage: string;
  secondaryImage: string;
}

interface Feature {
  title: string;
  description: string[];
}

interface Service {
  id: number;
  title: string;
  description: string;
  slides: Slide[];
  features: Feature[];
}

// Компонент для секции сервисов
export default function ServiceSection({ service, className = "" }: { service: Service, className?: string }) {
  // Функция для определения типа медиа по расширению файла
  const getMediaType = (src: string): 'image' | 'video' => {
    const extension = src.split('.').pop()?.toLowerCase();
    return extension === 'mp4' || extension === 'webm' || extension === 'mov' ? 'video' : 'image';
  };

  // Преобразуем данные service.slides в формат для CarouselWithLightbox
  const carouselImages = service.slides.map((slide, index) => ({
    id: index + 1,
    type: 'double' as const,
    items: [
      {
        type: getMediaType(slide.mainImage),
        src: slide.mainImage,
        alt: `${service.title} - ${getMediaType(slide.mainImage) === 'video' ? 'видео' : 'изображение'} ${index + 1}-1`,
        ...(getMediaType(slide.mainImage) === 'video' && { poster: slide.mainImage.replace(/\.(mp4|webm|mov)$/i, '.jpg') })
      },
      {
        type: getMediaType(slide.secondaryImage),
        src: slide.secondaryImage,
        alt: `${service.title} - ${getMediaType(slide.secondaryImage) === 'video' ? 'видео' : 'изображение'} ${index + 1}-2`,
        ...(getMediaType(slide.secondaryImage) === 'video' && { poster: slide.secondaryImage.replace(/\.(mp4|webm|mov)$/i, '.jpg') })
      }
    ]
  }));

  return (
    <section className={`bg-[#0e1011] w-full ${className}`}>
      {/* CarouselWithLightbox */}
      <div className="mt-[20px] sm:mt-20">
        <CarouselWithLightbox
          images={carouselImages}
          className="w-full"
        />
      </div>

      {/* Content Grid */}
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-4 lg:gap-24 px-5 sm:px-12 lg:px-22 py-16 md:py-24 lg:py-[96px]">
        <h2 lang="ru" className="text-white font-geometria font-bold text-[40px] md:text-[128px] uppercase leading-none w-full md:w-[39.55%] whitespace-normal hyphens-auto break-words -mt-[40px] sm:mt-0">
          {service.title}
        </h2>
        
        <div className="flex flex-col gap-12 md:gap-20 flex-1 -ml-">
          <p className="text-white font-inter font-semibold -mt-[10px] sm:mt-0 text-[20px] md:text-[36px] lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] w-full lg:max-w-[400px] xl:max-w-[992px] break-words">
            {service.description}
          </p>

          <div className="flex flex-col gap-12 md:gap-12">
            {service.features.map((feature: Feature, index: number) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-white font-inter font-semibold -mt-[20px] sm:mt-0 text-[18px] md:text-[40px] mb-[16px] leading-[120%] sm:leading-[140%] -tracking-[1px]">
                  {feature.title}
                </h3>
                {feature.description.map((paragraph: string, i: number) => (
                  <p key={i} className="text-white/60 font-inter text-[16px] md:text-[20px] leading-[100%] sm:leading-[180%]">
                    {paragraph}
                  </p>
                ))}
                {index < service.features.length - 1 && (
                  <div className="h-[2px] bg-white/20 w-full mt-[15px] sm:mt-12"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}