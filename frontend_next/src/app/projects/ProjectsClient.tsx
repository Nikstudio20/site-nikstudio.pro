'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import Header from "@/components/Header";
import Header_mobile from "@/components/Header_mobile";
import Footer from "@/components/Footer";
import FooterMobile from "@/components/Footer_mobile";
import ProjectCategories from '@/components/ProjectCategories';
import StructuredDataComponent from '@/components/StructuredDataComponent';
import { SEOMetadataGenerator } from '@/lib/seo-metadata';

interface Project {
  id: number;
  slug: string;
  projects_page_image?: string;
  projects_page_title?: string;
  main_title: string;
}

// Функция для получения полного URL изображения
const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '/placeholder.jpg';

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Если путь уже содержит полный URL, используем его
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Убираем все лишние префиксы и получаем чистый путь
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/storage/')) {
    cleanPath = cleanPath.substring('/storage/'.length);
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  return `${apiUrl}/storage/${cleanPath}`;
};

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [globalSettings, setGlobalSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        let url = `${apiUrl}/api/projects`;

        if (selectedCategory !== null) {
          url += `?category_id=${selectedCategory}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке проектов: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
        } else {
          setProjects([]);
        }

        // Fetch global SEO settings
        const globalSettingsData = await SEOMetadataGenerator.fetchGlobalSettings();
        setGlobalSettings(globalSettingsData);

      } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <main className="min-h-screen bg-[#0E1011] overflow-x-hidden">
      {/* Structured Data */}
      <StructuredDataComponent
        contentType="project"
        globalSettings={globalSettings}
      />

      {/* Header */}
      <Header />
      <Header_mobile />

      {/* Main Content */}
      <div className="pt-0 sm:pt-20 lg:pt-32">
        {/* Hero Section */}
        <section className="px-5 sm:px-12 lg:px-24 mb-12 lg:mb-24">
          <div className="flex flex-col gap-8 lg:gap-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-[60px] sm:text-[96px] md:text-[96px] lg:text-[150px] xl:text-[200px] 2xl:text-[280px] 3xl:text-[320px] font-geometria font-extrabold uppercase text-white leading-none">
                Проекты
              </h1>
              <p className="text-white text-[32px] sm:text-4xl lg:text-[80px] 3xl:text-[100px] font-inter font-medium sm:font-semibold leading-[100%] sm:leading-[120%] sm:tracking-[-2px] max-w-[1400px] max-w-full-3xl mt-[25px] sm:mt-2 3xl:mt-4">
                Весь визуальный посыл в едином ключе создаёт сильный бренд и надежную репутацию
              </p>
            </div>

            {/* Project Categories */}
            <ProjectCategories
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="w-full flex flex-col pb-6">
          {loading ? (
            <div className="text-white text-center py-20">
              <div className="text-xl">Загрузка проектов...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-white text-center py-20">
              <div className="text-xl">Проекты не найдены</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 lg:gap-6">
              {projects.map((project, _index) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project.id}
                  className="group block"
                >
                  <div className="relative w-full aspect-square lg:aspect-[1920/1080] overflow-hidden bg-[#0E1011]">
                    <Image
                      src={getImageUrl(project.projects_page_image || '')}
                      alt={project.projects_page_title || project.main_title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error('Ошибка загрузки изображения:', project.projects_page_image);
                        e.currentTarget.src = '/placeholder.jpg';
                      }}
                    />

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="p-5 lg:p-24">
                        <h3 className="text-white font-geometria font-bold text-[32px] lg:text-[96px] xl:text-[128px] 2xl:text-[192px] uppercase leading-none tracking-tight">
                          {project.projects_page_title || project.main_title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <Footer />
      <FooterMobile />
    </main>
  );
}