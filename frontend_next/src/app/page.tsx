"use client";
import Image from "next/image";
import Header_mini from "@/components/Header_mini";
import Header_mobile from "@/components/Header_mobile";
import Footer from "@/components/Footer";
import FooterMobile from "@/components/Footer_mobile";
import Link from "next/link";
import ProjectCategories from '@/components/ProjectCategories';
import React, { useState, useEffect } from "react";
import ServicesSection from '@/app/home/ServicesSection';
import TestimonialsSection from '@/app/home/TestimonialsSection';
import MainContentSection from '@/app/home/MainContentSection';

interface Project {
  id: number;
  name: string;
  year: string;
  main_image: string;
  logo: string;
  main_title: string;
  alt_text: string;
  slug: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        let url = `${apiUrl}/api/projects`;
        
        // Добавляем параметр категории, если она выбрана
        if (selectedCategory !== null) {
          url += `?category_id=${selectedCategory}`;
        }
        
        console.log('Запрос к API:', url); // Отладочная информация
        
        const response = await fetch(url);
        if (!response.ok) {
          // Получаем текст ошибки от сервера
          const errorText = await response.text();
          console.error('Ответ сервера:', response.status, errorText);
          throw new Error(`Ошибка при загрузке проектов: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Полученные данные:', data); // Отладочная информация
        
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
        } else {
          console.error('Некорректный формат данных:', data);
          setProjects([]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [selectedCategory]);

  // Обработчик изменения категории
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <main className="flex flex-col min-h-screen bg-[#0E1011] overflow-x-hidden">
      {/* Header */}
      <Header_mobile />
      <div className="absolute top-0 right-0 w-full lg:w-1/2 z-10">
        <Header_mini />
      </div>

      {/* Hero */}
      <div className="flex flex-col lg:flex-row justify-center w-full relative">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 bg-white relative h-[246px] sm:h-[540px] md:h-[720px] lg:h-[1080px]">
          <div className="relative w-full h-full overflow-hidden">
            <Image 
              src="/images/home/hero-image.png" 
              alt="Hero Image" 
              className="object-cover object-center w-full h-full"
              width={1787}
              height={1810}
              priority
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-end">
          <div className="flex flex-col p-5 sm:p-12 lg:p-24 gap-12 lg:pt-[204px] lg:pb-[64px] h-full">
            <div className="flex flex-col items-center sm:items-start gap-12 lg:gap-[73px]">
              <Link href="/" className="hidden sm:block">
                <div className="relative w-[321.99px] h-[119.99px] scale-75 sm:scale-100">
                  <Image 
                    src="/images/home/nik-logo-hero.svg" 
                    alt="NIK Studio Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              
              <div className="flex flex-col gap-8 lg:gap-10 lg:mt-[38px]">
                <p className="text-white font-geometria text-[20px] sm:text-[30px] leading-[100%] w-full lg:w-[400px] xl:w-[500px] 2xl:w-[768px] w-full-3xl h-[90px] font-normal flex-none self-stretch">
                  Комплексные решения для промышленных компаний / подготовка к отраслевым выставкам / сопровождение / вывод продукта на новый рынок
                </p>                
                <h1 className="text-white font-inter text-[32px] sm:text-[48px] leading-[100%] sm:leading-[130%] w-full lg:w-[400px] xl:w-[500px] 2xl:w-[768px] w-full-3xl h-[124px] font-semibold flex-none self-stretch sm:mt-15 xl:mt-15 2xl:mt-0">
                  Превращаем сложные технологии в понятный визуал
                </h1>
                <div className="text-white/60 font-inter text-[16px] sm:text-[30px] leading-[100%] h-[240px] font-light flex-none -mt-[40px] sm:mt-40 xl:mt-25 2xl:mt-0">
                  мультимедиа<br/>
                  брендинг<br/>
                  дизайн / презентации<br/>
                  коммерческая фотогорафия<br/>
                  3д-визуализация и анимация<br/>
                  видеопродакшн<br/>
                  создание сайтов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MainContentSection />      

      {/* Projects Section */}
      <section className="w-full bg-[#181A1B] pt-7 sm:pt-24 flex flex-col sm:mt-[25px]">
        <div className="px-5 sm:px-12 lg:px-24 flex flex-col gap-24">
          {/* Header */}
          <div className="flex flex-col gap-24">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-white/60 font-cabin font-medium text-[20px] sm:text-2xl lg:text-[32px] sm:w-[288px] h-[32px]">
                проекты под ключ
              </h3>
              <span className="text-white/60 font-cabin font-medium text-[20px] sm:text-2xl lg:text-[32px]">
                (01)
              </span>
            </div>

            <div className="flex flex-col gap-4 -mt-[80px] sm:-mt-[15px]">
              <h2 className="text-white font-geometria font-extrabold sm:font-bold text-[60px] sm:text-6xl xl:text-[200px] 2xl:text-[280px] uppercase leading-none">
                проекты
              </h2>

              <p className="text-white font-inter font-medium sm:font-semibold text-[32px] sm:text-2xl lg:text-[80px] leading-[120%] sm:leading-tight max-w-[1450px] max-w-full-3xl mt-[14px] sm:-mt-[15px]">
                Мы берём на себя составление всех технических заданий. Все части проекта в едином ключе
              </p>
            </div>
          </div>

          {/* Project Categories */}
          <ProjectCategories onCategoryChange={handleCategoryChange} className="-mt-[60px] sm:mt-0" />
        </div>

        {/* Project Items */}
        <div className="flex flex-col gap-12 mt-[25px] sm:mt-12">
          {loading ? (
            <div className="text-white text-center py-10">Загрузка проектов...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {displayedProjects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.id} className="flex flex-col group ">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={project.main_image?.replace('/storage/', '/storage/app/public/') || '/placeholder.jpg'}
                      alt={project.main_title}
                      fill
                      className="object-cover opacity-70 h-[390px] sm:h-auto transition-transform duration-300 group-hover:scale-110"
                    />
                    {project.logo && (
                      <div className="absolute inset-0 flex items-center justify-center scale-75 sm:scale-100">
                        <Image
                          src={project.logo.replace('/storage/', '/storage/app/public/')}
                          alt={`${project.main_title} Logo`}
                          width={335}
                          height={122}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 px-5 sm:px-8 lg:px-12 -mt-[20px] sm:mt-0 group-hover:bg-white transition-colors duration-300">
                    <h3 className="text-white font-inter font-medium sm:font-semibold text-[24px] sm:text-2xl lg:text-[40px] leading-[140%] sm:leading-tight tracking-[-1px] sm:tracking-normal group-hover:text-black transition-colors duration-300">
                      {project.main_title}
                    </h3>
                    <span className="text-white/60 font-cabin font-medium text-[24px] sm:text-lg lg:text-[32px] group-hover:text-black transition-colors duration-300">
                      ({project.year})
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Toggle Button */}
        {projects.length > 4 && (
          <div className="py-20 md:py-[76px] px-6 sm:px-12 lg:px-24 flex justify-center md:justify-start mt-3">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="flex items-center justify-center w-3xs h-[54px] text-center text-white border-2 border-white rounded-full font-inter font-semibold text-xl md:text-[22px] hover:bg-white hover:text-[#0E1011] hover:cursor-pointer transition-colors duration-300"
            >
              {showAllProjects ? "скрыть проекты" : "все проекты"}
            </button>
          </div>
        )}
      </section>

      {/* Другие секции */}
      <ServicesSection />
      <TestimonialsSection />      

      {/* Footer */}
      <Footer />
      <FooterMobile />
    </main>
  );
}
