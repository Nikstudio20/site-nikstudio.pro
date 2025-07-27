import { Service, Step, TestimonialLegacy } from '@/types/media';

/**
 * Transform API media page data to match existing component interfaces
 */
export const transformMediaPageData = (apiData: any) => {
  console.log('🔄 Начало трансформации данных медиа страницы');
  console.log('📊 Исходные данные API:', JSON.stringify(apiData, null, 2));

  // Transform services to match existing ServiceSection component interface
  const transformedServices: Service[] = apiData.services.map((service: any) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    slides: transformMediaToSlides(service.media || []),
    features: service.features.map((feature: any) => ({
      title: feature.title,
      description: feature.description
    })),
    darkBackground: service.darkBackground
  }));

  // Transform testimonials to match existing component interface
  console.log('👥 Трансформация отзывов...');
  console.log('📝 Исходные отзывы из API:', JSON.stringify(apiData.testimonials, null, 2));
  
  const transformedTestimonials: TestimonialLegacy[] = apiData.testimonials.items.map((testimonial: any, index: number) => {
    console.log(`🔍 Обработка отзыва ${index + 1}:`, {
      id: testimonial.id,
      company: testimonial.company,
      originalImage: testimonial.image,
      imageExists: !!testimonial.image
    });
    
    const transformedImage = testimonial.image ? addStoragePrefix(testimonial.image) : '';
    console.log(`🖼️ Трансформированное изображение для отзыва ${index + 1}:`, transformedImage);
    
    return {
      company: testimonial.company,
      quote: testimonial.quote,
      text: testimonial.description, // API uses 'description' instead of 'text'
      image: transformedImage
    };
  });
  
  console.log('✅ Результат трансформации отзывов:', JSON.stringify(transformedTestimonials, null, 2));

  // Transform process steps to match existing component interface
  const transformedProcessSteps: Step[] = apiData.process.steps.map((step: any) => ({
    id: step.stepNumber,
    title: step.title,
    subtitle: step.subtitle,
    image: addStoragePrefix(step.image),
    description: {
      left: step.descriptionLeft,
      right: step.descriptionRight
    }
  }));

  const finalData = {
    services: transformedServices,
    testimonials: transformedTestimonials,
    testimonialsData: {
      title: apiData.testimonials.title,
      subtitle: apiData.testimonials.subtitle
    },
    processData: {
      title: apiData.process.title,
      subtitle: apiData.process.subtitle,
      steps: transformedProcessSteps
    },
    heroData: {
      title: apiData.hero.title,
      description: apiData.hero.description
    }
  };

  console.log('🎯 Финальные трансформированные данные:', JSON.stringify(finalData, null, 2));
  console.log('📊 Количество отзывов в финальных данных:', finalData.testimonials.length);
  
  return finalData;
};

/**
 * Transform media array to slides format
 */
const transformMediaToSlides = (mediaArray: any[]) => {
  return mediaArray.map((mediaGroup: any) => {
    // Transform main media
    const mainMedia = mediaGroup.main;
    const mainImage = addStoragePrefix(mainMedia?.src || '');
    const mainPoster = mainMedia?.poster ? addStoragePrefix(mainMedia.poster) : null;
    
    // Transform secondary media (get first secondary item)
    const secondaryArray = mediaGroup.secondary || [];
    const firstSecondary = Array.isArray(secondaryArray) ? secondaryArray[0] : secondaryArray;
    const secondaryImage = addStoragePrefix(firstSecondary?.src || '');
    const secondaryPoster = firstSecondary?.poster ? addStoragePrefix(firstSecondary.poster) : null;
    
    return {
      mainImage,
      mainPoster,
      mainType: mainMedia?.type || 'image',
      secondaryImage,
      secondaryPoster,
      secondaryType: firstSecondary?.type || 'image'
    };
  });
};

/**
 * Add storage prefix to file paths for Laravel images
 */
const addStoragePrefix = (filePath: string | null): string => {
  if (!filePath) {
    console.warn('⚠️ Пустой путь к изображению');
    return '';
  }
  
  // Если уже полный URL, возвращаем как есть
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    console.log('🔗 Полный URL изображения:', filePath);
    return filePath;
  }
  
  // Если уже начинается с /storage/, добавляем только базовый URL
  if (filePath.startsWith('/storage/')) {
    const laravelStorageUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${filePath}`;
    console.log('📁 URL с /storage/ префиксом:', laravelStorageUrl);
    return laravelStorageUrl;
  }
  
  // Добавляем Laravel storage URL с полным путем
  const laravelStorageUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${filePath}`;
  console.log('🖼️ Сформированный URL изображения:', laravelStorageUrl);
  return laravelStorageUrl;
};

/**
 * Fallback data when API is unavailable
 */
export const getFallbackMediaData = () => {
  return {
    services: [] as Service[],
    testimonials: [] as TestimonialLegacy[],
    testimonialsData: {
      title: "говорят о нас",
      subtitle: "Команда NIKstudio закрывает целый ряд задач с энтузиазмом и полной ответственностью"
    },
    processData: {
      title: "процесс",
      subtitle: "Процесс работы строится на взаимодействии всех специалистов под единым руководством",
      steps: [] as Step[]
    },
    heroData: {
      title: "МЕДИА",
      description: "Создаём проекты комплексно и выполняем отдельные задачи"
    }
  };
};