"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { mediaServices } from "./mediaServices";

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

interface Step {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  description: {
    left: string;
    right: string;
  };
}

interface Testimonial {
  company: string;
  quote: string;
  text: string;
  image: string;
}

// Универсальный компонент для рендера изображения или видео
function MediaRenderer({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const isVideo = src.match(/\.mp4($|\?)/i);
  if (isVideo) {
    return (
      <a href={src} target="_blank" rel="noopener noreferrer">
        <video
          src={src}
          className={className}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          autoPlay
          loop
          muted
          playsInline
        />
      </a>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill
      priority
    />
  );
}

// Компонент для секции сервисов
function ServiceSection({ service }: { service: Service }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideTransitioning, setIsSlideTransitioning] = useState(false);

  const handlePrevSlide = () => {
    if (isSlideTransitioning) return;
    setIsSlideTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => prev === 0 ? service.slides.length - 1 : prev - 1);
      setTimeout(() => setIsSlideTransitioning(false), 50);
    }, 450);
  };
  
  const handleNextSlide = () => {
    if (isSlideTransitioning) return;
    setIsSlideTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % service.slides.length);
      setTimeout(() => setIsSlideTransitioning(false), 50);
    }, 450);
  };

  return (
    <section className={`bg-[#0e1011] w-full`}>
      {/* Image Grid */}
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-6 mt-20 relative">
        <div className="w-full md:w-[39.55%] h-[500px] md:h-[750px] shrink-0 relative">
          <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isSlideTransitioning ? 'opacity-0' : 'opacity-100'}`}> 
            <MediaRenderer
              src={service.slides[currentSlide].mainImage}
              alt={service.title}
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full h-[500px] md:h-[750px] relative">
          <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isSlideTransitioning ? 'opacity-0' : 'opacity-100'}`}> 
            <MediaRenderer
              src={service.slides[currentSlide].secondaryImage}
              alt={service.title}
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center pointer-events-none">
          <button
            className="w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 cursor-pointer group z-10 pointer-events-auto"
            onClick={handlePrevSlide}
            disabled={isSlideTransitioning}
            aria-label="Previous slide"
          >
            <Image
              src="/images/media/arrow_left.svg"
              alt="Previous"
              width={21}
              height={21}
              className="[filter:invert(1)] group-hover:[filter:invert(0)]"
              draggable={false}
            />
          </button>
          <button
            className="w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 cursor-pointer group z-10 pointer-events-auto"
            onClick={handleNextSlide}
            disabled={isSlideTransitioning}
            aria-label="Next slide"
          >
            <Image
              src="/images/media/arrow_right.svg"
              alt="Next"
              width={21}
              height={21}
              className="[filter:invert(1)] group-hover:[filter:invert(0)]"
              draggable={false}
            />
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-4 lg:gap-24 px-6 sm:px-12 lg:px-22 py-16 md:py-24 lg:py-[96px]">
        <h2 lang="ru" className="text-white font-geometria font-bold text-5xl md:text-[128px] uppercase leading-none w-full md:w-[39.55%] whitespace-normal hyphens-auto break-words">
          {service.title}
        </h2>
        
        <div className="flex flex-col gap-12 md:gap-20 flex-1 -ml-">
          <p className="text-white font-inter font-semibold text-2xl md:text-[36px] lg:text-[48px] leading-[130%] -tracking-[0.5px] w-full lg:max-w-[400px] xl:max-w-[992px] break-words">
            {service.description}
          </p>

          <div className="flex flex-col gap-12 md:gap-12">
            {service.features.map((feature: Feature, index: number) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-white font-inter font-semibold text-2xl md:text-[40px] mb-[16px] leading-[140%] -tracking-[1px]">
                  {feature.title}
                </h3>
                {feature.description.map((paragraph: string, i: number) => (
                  <p key={i} className="text-white/60 font-inter text-base md:text-[20px] leading-[180%]">
                    {paragraph}
                  </p>
                ))}
                {index < service.features.length - 1 && (
                  <div className="h-[2px] bg-white/20 w-full mt-12"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MediaPage() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      company: "Группа компаний «ИКАР»",
      quote: "По итогам выставки был заключен контракт",
      text: "Существенно повысили репутацию и узнаваемость бренда с помощью NIKstudio.",
      image: "/images/media/testimonial/1.jpg"
    },
    {
      company: "НПП «Авиаспецмаш»",
      quote: "Получили инновационный корпоративный сайт, интегрированный с внутренними ИТ-системами.",
      text: "Повысили доверие со стороны партнёров и заказчиков за счёт технологичного цифрового имиджа.",
      image: "/images/media/testimonial/2.png"
    },
    {
      company: "ОЭЗ «Технополис Москва»",
      quote: "Реализован масштабный медиапроект с интерактивными разделами.",
      text: "Закрепили статус флагмана высокотехнологичного развития столицы в digital-среде.",
      image: "/images/media/testimonial/3.png"
    },
    {
      company: "Алмаз Антей «Монитор СОФТ»",
      quote: "Создана презентационная платформа для ключевого программного продукта.",
      text: "Упростили коммуникацию с B2B-клиентами и ускорили цикл принятия решений.",
      image: "/images/media/testimonial/4.png"
    }
  ];

  const testimonialsData = {
    title: "говорят о нас",
    subtitle: "Команда NIKstudio закрывает целый ряд задач с энтузиазмом и полной ответственностью",
  };

  const processData = {
    title: "процесс",
    subtitle: "Процесс работы строится на взаимодействии всех специалистов под единым руководством",
    steps: [
      {
        id: "01",
        title: "Изучаем ваш продукт",
        subtitle: "Вникаем в нишу и смотрим конкурентов",
        image: "/images/media/process-1.jpg",
        description: {
          left: "In the discovery phase, we immerse ourselves in your brand's vision, goals, and target audience. Through collaborative discussions and research, we gather insights that inform our strategy.",
          right: "This foundational step ensures that our design solutions align perfectly with your objectives and resonate deeply with your audience."
        }
      },
      {
        id: "02",
        title: "Концепция",
        subtitle: "Уникальная стратегия",
        image: "/images/media/process-2.jpg",
        description: {
          left: "During the design phase, our team translates insights into visually captivating and functional designs. We create wireframes, prototypes, and mockups, allowing you to visualize the project.",
          right: "This iterative process encourages collaboration and feedback, ensuring the final design reflects your brand identity while enhancing user experience."
        }
      },
      {
        id: "03",
        title: "Создаём контент",
        subtitle: "Генерим идеи",
        image: "/images/media/process-3.jpg",
        description: {
          left: "In the development stage, we transform approved designs into fully functional websites or applications. Our skilled developers utilize the latest technologies to ensure optimal performance, responsiveness, and security.",
          right: "We conduct thorough testing throughout this phase, addressing any issues to deliver a polished final product that exceeds expectations."
        }
      },
      {
        id: "04",
        title: "Реализуем концепцию",
        subtitle: "Собираем весь проект воедино",
        image: "/images/media/process-4.jpg",
        description: {
          left: "After final reviews and testing, we launch your project with precision and care. Our team ensures a smooth transition while providing ongoing support and maintenance.",
          right: "We're committed to your success, offering guidance and updates to keep your website or application running optimally and evolving with your needs."
        }
      }
    ]
  };
  
  const handlePreviousTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonialIndex((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 450);
  };
  
  const handleNextTestimonial = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonialIndex((prev) => 
        (prev + 1) % testimonials.length
      );
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 450);
  };
  
  const currentTestimonial = testimonials[currentTestimonialIndex];

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setCurrentX(e.clientX);
    }
  };
  
  const handleMouseUp = () => {
    if (isDragging) {
      const dragDistance = currentX - startX;
      const threshold = 50; // Minimum drag distance to trigger slide change
      
      if (dragDistance > threshold) {
        handlePreviousTestimonial();
      } else if (dragDistance < -threshold) {
        handleNextTestimonial();
      }
      
      setIsDragging(false);
    }
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return (
    <main className="bg-[#0E1011] min-h-screen flex flex-col items-stretch">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-90 sm:pt-40 md:pt-[150px] pb-24 md:pb-[17px] px-6 sm:px-12 lg:px-24">
        <h1 className="text-white font-geometria font-extrabold text-[68px] sm:text-[150px] lg:text-[200px] 2xl:text-[280px] uppercase leading-none">
          МЕДИА
        </h1>
        <p className="text-white font-inter font-semibold text-xl md:text-[80px] leading-tight md:leading-[1.2em] mt-6 md:mt-2 max-w-[1400px] max-w-full-3xl -tracking-[2px]">
          Создаём проекты комплексно и выполняем отдельные задачи
        </p>
      </section>

      {/* Services Sections */}
      {mediaServices.map((service: Service) => (
        <ServiceSection key={service.id} service={service} />
      ))}
      <div className="h-[130px] bg-[#0e1011] w-auto"></div>

      {/* Projects Link Section */}
      <section className="py-20 md:py-[76px] px-6 sm:px-12 lg:px-24 flex justify-center md:justify-start">
        <Link 
          href="/projects"
          className="flex items-center justify-center w-[192px] h-[54px] text-center text-white border-2 border-white rounded-full font-inter font-semibold text-xl md:text-[22px] hover:bg-white hover:text-[#0E1011] transition-colors duration-300"
        >
          все проекты
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="w-full">
        <div className="flex flex-col gap-24 py-16 md:py-24">
          <div className="flex flex-col px-4 sm:px-22">
            <div className="md:col-span-4 flex flex-col md:flex-row justify-end items-center mt-3">
              <span className="text-white/60 font-cabin text-2xl md:text-[32px]">(01)</span>
            </div>

            <div className="md:col-span-8 flex flex-col gap-6 mt-21">
              <h2 className="text-white font-geometria font-extrabold text-[54px] sm:text-[100px] lg:text-[150px] xl:text-[200px] 2xl:text-[240px] uppercase leading-none">
                {testimonialsData.title}
              </h2>
              <p className="text-white font-inter font-semibold text-xl md:text-[72px] lg:text-[80px] leading-[120%] -tracking-[2px] max-w-[1400px] max-w-full-3xl">
                {testimonialsData.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div 
              ref={carouselRef}
              className={`relative h-[400px] md:h-[1080px] w-full overflow-hidden ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Image 
                  src={currentTestimonial.image}
                  alt={`Testimonial from ${currentTestimonial.company}`} 
                  className="object-cover transition-transform duration-300"
                  fill
                  priority
                  draggable={false}
                />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center">
                <button 
                  className="w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 cursor-pointer group z-10"
                  onClick={handlePreviousTestimonial}
                  disabled={isTransitioning}
                  aria-label="Previous testimonial"
                >
                  <Image
                    src="/images/media/arrow_left.svg"
                    alt="Previous"
                    width={21}
                    height={21}
                    className="[filter:invert(1)] group-hover:[filter:invert(0)]"
                    draggable={false}
                  />
                </button>
                <button 
                  className="w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 cursor-pointer group z-10"
                  onClick={handleNextTestimonial}
                  disabled={isTransitioning}
                  aria-label="Next testimonial"
                >
                  <Image
                    src="/images/media/arrow_right.svg"
                    alt="Next"
                    width={21}
                    height={21}
                    className="[filter:invert(1)] group-hover:[filter:invert(0)]"
                    draggable={false}
                  />
                </button>
              </div>              
            </div>
            <div className="bg-[#181A1B] py-12 md:py-24 px-4 sm:px-12 md:px-12 lg:px-24 flex flex-col h-full">
              <Image 
                src="/images/media/quote-icon.svg"
                alt="Quote icon"
                width={74.09}
                height={46.93}
                className="mb-8"
              />
              
              <div className="flex flex-col justify-center flex-grow">
                <div className={`transition-all duration-300 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}>
                  <span className="text-white/60 font-cabin text-xl md:text-[32px] block mb-7">{currentTestimonial.company}</span>
                  <h3 className="text-white font-inter font-semibold text-[32px] sm:text-4xl md:text-[36px] lg:text-[44px] xl:text-[60px] 2xl:text-[64px] leading-[130%] -tracking-[1px] mb-7">
                    {currentTestimonial.quote}
                  </h3>
                  <p className="text-white/60 font-inter text-xl md:text-[28px] leading-[160%]">
                    {currentTestimonial.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full">
        <div className="flex flex-col gap-24 -mt-1">
          <div className="flex flex-col px-4 sm:px-22">
            <div className="md:col-span-4 flex flex-row justify-between items-center">
              <span className="text-white/60 font-cabin text-2xl md:text-[32px]">Как мы работаем</span>
              <span className="text-white font-cabin text-2xl md:text-[32px]">t</span>
            </div>

            <div className="md:col-span-8 flex flex-col gap-6 mt-20">
              <h2 className="text-white font-geometria font-extrabold text-[54px] sm:text-[100px] lg:text-[150px] xl:text-[200px] 2xl:text-[280px] uppercase leading-none">
                {processData.title}
              </h2>
              <p className="text-white font-inter font-semibold text-xl md:text-[80px] leading-[120%] -tracking-[2px] max-w-[1400px] max-w-full-3xl">
                {processData.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0">
            {processData.steps.map((step: Step, index: number) => (
              <div 
                key={step.id} 
                className="grid grid-cols-1 md:grid-cols-2 gap-0"
              >
                <div className="relative h-[400px] md:h-[1080px] w-full">
                  <Image 
                    src={step.image || `/images/media/process-${index+1}.jpg`}
                    alt={step.title} 
                    className="object-cover"
                    fill
                    priority
                  />
                </div>
                <div className={`${index % 2 === 1 ? 'bg-transparent' : 'bg-[#181A1B]'} p-8 md:p-12 lg:p-24 flex flex-col gap-12`}>
                  <span className="text-white font-geometria font-bold text-6xl md:text-[160px] uppercase">
                    {step.id}
                  </span>
                  <div className="flex flex-col gap-4 mt-49">
                    <span className="text-white/60 font-geometria text-2xl md:text-[32px]">
                      {step.title}
                    </span>
                    <h3 className="text-white font-inter font-semibold text-4xl md:text-[52px] lg:text-[64px] leading-[130%] -tracking-[1px] mt-3">
                      {step.subtitle}
                    </h3>
                    <div className="flex flex-row flex-start gap-[32px]">
                      <p className="w-[368px] font-inter font-normal text-[16px] sm:text-[20px] leading-[180%] text-white/60">{step.description.left}</p>
                      <p className="w-[368px] font-inter font-normal text-[16px] sm:text-[20px] leading-[180%] text-white/60">{step.description.right}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
