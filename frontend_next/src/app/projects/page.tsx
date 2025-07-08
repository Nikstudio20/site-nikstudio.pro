"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import Header from "@/components/Header";
import Header_mobile from "@/components/Header_mobile";
import Footer from "@/components/Footer";
import FooterMobile from "@/components/Footer_mobile";
import ProjectCategories from '@/components/ProjectCategories';

interface Project {
  id: number;
  slug: string;
  projects_page_image?: string;
  projects_page_title?: string;
  main_title: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Получаем категорию из URL при загрузке страницы
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam, 10));
    }
  }, []);

  // Загрузка проектов с учетом выбранной категории
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
        
        console.log('Запрос к API (страница проектов):', url); // Отладочная информация
        
        const res = await fetch(url);
        if (!res.ok) {
          // Получаем текст ошибки от сервера
          const errorText = await res.text();
          console.error('Ответ сервера:', res.status, errorText);
          throw new Error(`Ошибка при загрузке проектов: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('Полученные данные (страница проектов):', data); // Отладочная информация
        
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

  return (
    <main className="min-h-screen bg-[#0E1011] max-w-[2560px] mx-auto relative">
      {/* Header */}
      <Header />
      <Header_mobile />

      {/* Hero Section */}
      <section className="w-full px-5 sm:px-12 lg:px-24 3xl:px-[120px] pt-[6px] sm:pt-40 lg:pt-[150px] 3xl:pt-[200px] pb-16 lg:pb-[217px] 3xl:pb-[240px]">
        <h1 className="text-[60px] sm:text-[96px] md:text-[96px] lg:text-[150px] xl:text-[200px] 2xl:text-[280px] 3xl:text-[320px] font-geometria font-extrabold uppercase text-white leading-none">
          проекты
        </h1>
        <p className="text-white text-[32px] sm:text-4xl lg:text-[80px] 3xl:text-[100px] font-inter font-medium sm:font-semibold leading-[100%] sm:leading-[120%] sm:tracking-[-2px] max-w-[1400px] max-w-full-3xl mt-[40px] sm:mt-2 3xl:mt-4">
          Весь визуальный посыл в едином ключе создаёт сильный бренд и надежную репутацию
        </p>
      </section>

      {/* Project Categories с передачей обработчика и текущей категории */}
      <ProjectCategories onCategoryChange={handleCategoryChange} />

      {/* Project Cards с индикатором загрузки */}
      <section className="w-full flex flex-col gap-6 lg:gap-[24px] 3xl:gap-[32px] mt-[45px] sm:mt-8 lg:mt-7 3xl:mt-10 pb-6 3xl:pb-8">
        {loading ? (
          <div className="text-white text-center py-10">Загрузка проектов...</div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="w-full h-[390px] sm:h-[540px] lg:h-[1080px] 3xl:h-[1440px] relative mb-[15px] sm:mb-0 group overflow-hidden">
              {project.projects_page_image ? (
                <Image
                  src={project.projects_page_image?.replace('/storage/', '/storage/app/public/')}
                  alt={project.projects_page_title || project.main_title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="bg-gray-800 w-full h-full"></div>
              )}
              <div className="absolute bottom-8 sm:bottom-12 lg:bottom-[96px] 3xl:bottom-[120px] left-6 sm:left-12 lg:left-24 3xl:left-[120px]">
                <h2 className="text-[30px] sm:text-[64px] xl:text-[96px] 2xl:text-[192px] 3xl:text-[220px] font-geometria font-bold text-white uppercase leading-none">
                  {project.projects_page_title}
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white text-center py-10 text-xl">Проекты не найдены</div>
        )}
      </section>

      {/* Footer */}
      <Footer />
      <FooterMobile />
    </main>
  );
}
