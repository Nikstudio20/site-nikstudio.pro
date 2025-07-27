"use client";
import CarouselWithLightboxBasic from "../components/CarouselWithLightboxBasic";

// Интерфейсы для типизации
interface Slide {
  mainImage: string;
  mainPoster?: string | null;
  mainType?: string;
  secondaryImage: string;
  secondaryPoster?: string | null;
  secondaryType?: string;
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
export default function ServiceSectionMobile({ service, className = "" }: { service: Service, className?: string }) {
  // Функция для определения типа медиа по расширению файла (fallback)
  const getMediaType = (src: string, type?: string): 'image' | 'video' => {
    // Используем тип из API, если доступен
    if (type === 'video' || type === 'image') {
      return type;
    }
    
    // Fallback: определяем по расширению файла
    const extension = src.split('.').pop()?.toLowerCase();
    return extension === 'mp4' || extension === 'webm' || extension === 'mov' ? 'video' : 'image';
  };

  // Преобразуем данные service.slides в формат для CarouselWithLightboxBasic
  const carouselImages = service.slides?.map((slide, index) => {
    const mainType = getMediaType(slide.mainImage, slide.mainType);
    const secondaryType = getMediaType(slide.secondaryImage, slide.secondaryType);
    
    // Фильтруем только валидные медиа элементы
    const items = [];
    
    if (slide.mainImage && slide.mainImage.trim()) {
      items.push({
        type: mainType,
        src: slide.mainImage,
        alt: `${service.title} - ${mainType === 'video' ? 'видео' : 'изображение'} ${index + 1}-1`,
        ...(mainType === 'video' && slide.mainPoster && { poster: slide.mainPoster })
      });
    }
    
    if (slide.secondaryImage && slide.secondaryImage.trim()) {
      items.push({
        type: secondaryType,
        src: slide.secondaryImage,
        alt: `${service.title} - ${secondaryType === 'video' ? 'видео' : 'изображение'} ${index + 1}-2`,
        ...(secondaryType === 'video' && slide.secondaryPoster && { poster: slide.secondaryPoster })
      });
    }
    
    return {
      id: index + 1,
      type: items.length === 2 ? 'double' as const : 'single' as const,
      items: items
    };
  }).filter(slide => slide.items.length > 0) || [];

  return (
    <section className={`bg-[#0e1011] w-full ${className}`}>

      {/* Content Grid */}
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-4 lg:gap-24 py-16 md:py-24 lg:py-[96px] -mt-[12px]">
        <h2 lang="ru" className="text-white px-5 font-geometria font-bold text-[40px] md:text-[128px] uppercase leading-none w-full md:w-[39.55%] whitespace-normal hyphens-auto break-words -mt-[40px] sm:mt-0">
          {service.title}
        </h2>

        {/* CarouselWithLightboxBasic */}
        <div className="mt-[0px] sm:mt-20">
          <CarouselWithLightboxBasic
            images={carouselImages}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-12 md:gap-20 pl-5 pr-[22px] mt-[25px] flex-1 -ml-">
          <p className="text-white font-inter font-semibold  sm:mt-0 text-[20px] md:text-[36px] lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] w-full lg:max-w-[400px] xl:max-w-[992px] break-words">
            {service.description}
          </p>

          <div className="flex flex-col gap-12 md:gap-12">
            {service.features?.map((feature: Feature, index: number) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-white font-inter font-semibold -mt-[24px] sm:mt-0 text-[18px] md:text-[40px] mb-[16px] leading-[120%] sm:leading-[140%] -tracking-[1px]">
                  {feature.title}
                </h3>
                {feature.description?.map((paragraph: string, i: number) => (
                  <p key={i} className="text-white/60 font-inter text-[16px] md:text-[20px] leading-[100%] sm:leading-[180%]">
                    {paragraph}
                  </p>
                ))}
                {index < (service.features?.length || 0) - 1 && (
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