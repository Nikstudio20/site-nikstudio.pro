"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Header_mobile from "@/components/Header_mobile";
import Footer from "@/components/Footer";
import FooterMobile from "@/components/Footer_mobile";
import { useState, useRef } from "react";
import { mediaServices } from "./mediaServices";
import ServiceSection from "./ServiceSection";
import ServiceSectionMobile from "./ServiceSection_mobile";

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
        image: "/images/media/process-1.png",
        description: {
          left: "In the discovery phase, we immerse ourselves in your brand's vision, goals, and target audience. Through collaborative discussions and research, we gather insights that inform our strategy.",
          right: "This foundational step ensures that our design solutions align perfectly with your objectives and resonate deeply with your audience."
        }
      },
      {
        id: "02",
        title: "Концепция",
        subtitle: "Уникальная стратегия",
        image: "/images/media/process-2.png",
        description: {
          left: "During the design phase, our team translates insights into visually captivating and functional designs. We create wireframes, prototypes, and mockups, allowing you to visualize the project.",
          right: "This iterative process encourages collaboration and feedback, ensuring the final design reflects your brand identity while enhancing user experience."
        }
      },
      {
        id: "03",
        title: "Создаём контент",
        subtitle: "Генерим идеи",
        image: "/images/media/process-3.png",
        description: {
          left: "In the development stage, we transform approved designs into fully functional websites or applications. Our skilled developers utilize the latest technologies to ensure optimal performance, responsiveness, and security.",
          right: "We conduct thorough testing throughout this phase, addressing any issues to deliver a polished final product that exceeds expectations."
        }
      },
      {
        id: "04",
        title: "Реализуем концепцию",
        subtitle: "Собираем весь проект воедино",
        image: "/images/media/process-4.png",
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
      <Header_mobile />
      
      {/* Hero Section */}
      <section className="pt-[0px] sm:pt-40 md:pt-[150px] pb-[35px] md:pb-[17px] px-5 sm:px-12 lg:px-24">
        <h1 className="text-white font-geometria font-extrabold text-[60px] sm:text-[150px] lg:text-[200px] 2xl:text-[280px] uppercase leading-[120%] sm:leading-none">
          МЕДИА
        </h1>
        <p className="text-white font-inter font-medium sm:font-semibold text-[32px] md:text-[80px] leading-[100%] md:leading-[1.2em] mt-6 md:mt-2 max-w-[1400px] max-w-full-3xl tracking-normal sm:-tracking-[2px]">
          Создаём проекты комплексно и выполняем отдельные задачи
        </p>
      </section>

      {/* Services Sections */}
      {mediaServices.map((service: Service) => (
        <ServiceSection key={service.id} service={service} className="mt-[10px] sm:mt-0 hidden sm:block" />
      ))}

      {mediaServices.map((service: Service) => (
        <ServiceSectionMobile key={service.id} service={service} className="mt-[10px] sm:mt-0 block sm:hidden" />
      ))}
      <div className="h-[130px] bg-[#0e1011] w-auto"></div>

      {/* Projects Link Section */}
      <section className="py-20 md:py-[76px] px-5 sm:px-12 lg:px-24 flex justify-center md:justify-start -mt-[220px] sm:mt-0">
        <Link 
          href="/projects"
          className="flex items-center justify-center w-[134px] sm:w-[192px] h-[32px] sm:h-[54px] text-center text-white border-2 border-white rounded-full font-inter font-semibold text-[16px] md:text-[22px] hover:bg-white hover:text-[#0E1011] transition-colors duration-300"
        >
          все проекты
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="w-full">
        <div className="flex flex-col gap-24 py-16 md:py-24">
          <div className="flex flex-col px-5 sm:px-22">
            <div className="md:col-span-4 hidden sm:flex flex-col md:flex-row justify-end items-center mt-3">
              <span className="text-white/60 font-cabin text-2xl md:text-[32px]">(01)</span>
            </div>
            <div className="md:col-span-4 flex sm:hidden flex-row justify-between items-center -mt-[28px] px-1">
              <span className="text-white/60 font-cabin font-medium text-[20px] md:text-[32px]">информация</span>
              <span className="text-white/60 font-cabin font-medium text-[20px] md:text-[32px]">03</span>
            </div>

            <div className="md:col-span-8 flex flex-col gap-6 mt-[35px] sm:mt-21">
              <h2 className="text-white font-geometria font-extrabold text-[60px] sm:text-[100px] lg:text-[150px] xl:text-[200px] 2xl:text-[240px] uppercase leading-[120%] sm:leading-none">
                {testimonialsData.title}
              </h2>
              <p className="text-white font-inter font-medium sm:font-semibold text-[32px] md:text-[72px] lg:text-[80px] leading-[120%] tracking-normal sm:-tracking-[2px] max-w-[1400px] max-w-full-3xl">
                {testimonialsData.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 -mt-[60px] sm:mt-0">
            <div 
              ref={carouselRef}
              className={`relative h-[248px] md:h-[1080px] w-full overflow-hidden ${
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
                  className="w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 cursor-pointer group z-10 opacity-50 sm:opacity-100"
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
                  className="w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 cursor-pointer group z-10 opacity-50 sm:opacity-100"
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
            <div className="bg-[#181A1B] pt-12 pb-[56px] md:pt-24 md:pb-24 px-5 sm:px-12 md:px-12 lg:px-24 flex flex-col h-full -mt-[17px] sm:mt-0">
              <Image 
                src="/images/media/quote-icon.svg"
                alt="Quote icon"
                width={74.09}
                height={46.93}
                className="mb-8 w-[43px] sm:w-[74.09px] h-[27px] sm:h-[46.93px]"
              />
              
              <div className="flex flex-col justify-center flex-grow">
                <div className={`transition-all duration-300 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}>
                  <span className="text-white/60 font-cabin font-medium sm:font-normal text-[16px] md:text-[32px] block mb-7 mt-[5px] sm:mt-0">{currentTestimonial.company}</span>
                  <h3 className="text-white font-inter font-semibold text-[24px] sm:text-4xl md:text-[36px] lg:text-[44px] xl:text-[60px] 2xl:text-[64px] leading-[130%] -tracking-[1px] mb-7 -mt-[17px] sm:mt-0">
                    {currentTestimonial.quote}
                  </h3>
                  <p className="text-white/60 font-inter text-[16px] md:text-[28px] leading-[160%] -mt-[12px] sm:mt-0">
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
        <div className="flex flex-col gap-24 -mt-[25px] sm:-mt-1">
          <div className="flex flex-col px-5 sm:px-22">
            <div className="md:col-span-4 flex flex-row justify-between items-center">
              <span className="text-white/60 font-geometria sm:font-cabin font-medium sm:font-normal text-[20px] md:text-[32px]">Как мы работаем</span>
              <span className="hidden sm:block text-white font-cabin text-2xl md:text-[32px]">t</span>
              <span className="block sm:hidden text-white/60 font-geometria sm:font-cabin font-medium text-[20px] md:text-[32px]">02</span>
            </div>

            <div className="md:col-span-8 flex flex-col gap-6 mt-[20px] sm:mt-20">
              <h2 className="text-white font-geometria font-extrabold text-[60px] sm:text-[100px] lg:text-[150px] xl:text-[200px] 2xl:text-[280px] uppercase leading-none">
                {processData.title}
              </h2>
              <p className="text-white font-inter font-medium sm:font-semibold text-[32px] md:text-[80px] leading-[100%] sm:leading-[120%] tracking-normal sm:-tracking-[2px] max-w-[1400px] max-w-full-3xl mt-[5px] sm:mt-0">
                {processData.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 -mt-[58px] sm:mt-0">
            {processData.steps.map((step: Step, index: number) => (
              <div 
                key={step.id} 
                className="grid grid-cols-1 md:grid-cols-2 gap-0"
              >
                <div className="relative h-[360px] md:h-[1080px] w-full">
                  <Image 
                    src={step.image || `/images/media/process-${index+1}.jpg`}
                    alt={step.title} 
                    className="object-cover"
                    fill
                    priority
                  />
                </div>
                <div className={`${index % 2 === 1 ? 'bg-transparent' : 'bg-[#181A1B]'} p-5 md:p-12 pb-[40px] sm:pb-0 lg:p-24 flex flex-col gap-12`}>
                  <span className="text-white font-geometria font-bold text-6xl md:text-[160px] uppercase mt-[18px] sm:mt-0">
                    {step.id}
                  </span>
                  <div className="flex flex-col gap-4 -mt-[11px] sm:mt-49">
                    <span className="text-white/60 font-geometria text-[20px] md:text-[32px]">
                      {step.title}
                    </span>
                    <h3 className="text-white font-inter font-semibold text-[32px] md:text-[52px] lg:text-[64px] leading-[130%] -tracking-[1px] mt-0 sm:mt-3">
                      {step.subtitle}
                    </h3>
                    <div className="flex flex-col sm:flex-row flex-start gap-[32px] mt-[5px] sm:mt-0">
                      <p className="w-full sm:w-[368px] font-inter font-normal text-[16px] sm:text-[20px] leading-[180%] text-white/60">{step.description.left}</p>
                      <p className="w-full sm:w-[368px] font-inter font-normal text-[16px] sm:text-[20px] leading-[180%] text-white/60">{step.description.right}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-15 sm:py-20 md:py-[76px] pb-[102px] px-5 sm:px-12 lg:px-24 flex sm:hidden justify-center md:justify-start mt-0 sm:-mt-35">
        <Link 
          href="/contact"
          className="flex flex-row justify-center items-center py-7 sm:py-4 px-5 sm:px-[26px] gap-2 w-full h-12 sm:h-[54px] 3xl:h-[70px] 3xl:text-[28px] bg-white text-[#0E1011] text-[22px] font-semibold rounded-full mx-auto font-inter hover:cursor-pointer hover:bg-[#DE063A] hover:text-white transition-colors duration-300"
        >
          Связаться
        </Link>              
      </section>

      <Footer />
      <FooterMobile />
    </main>
  );
}
