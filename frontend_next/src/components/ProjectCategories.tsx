'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface ProjectCategoriesProps {
  className?: string;
}

interface ApiResponse {
  status?: string;
  success?: boolean; // Для обратной совместимости
  data?: ProjectCategory[];
  message?: string;
}

const ProjectCategories: React.FC<ProjectCategoriesProps> = ({ className }) => {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/project-categories`);
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке категорий');
        }

        const data: ApiResponse = await response.json();
        
        console.log('Ответ API:', data); // Для отладки
        
        // Проверяем разные варианты структуры ответа
        if (data.status === 'success' && data.data) {
          setCategories(data.data);
        } else if (data.success && data.data) {
          // Для обратной совместимости
          setCategories(data.data);
        } else if (Array.isArray(data.data)) {
          // Если данные есть, но статус не указан
          setCategories(data.data);
        } else if (Array.isArray(data)) {
          // Если данные пришли как массив
          setCategories(data as ProjectCategory[]);
        } else {
          throw new Error(data.message || 'Ошибка при получении данных');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
        console.error('Ошибка при загрузке категорий:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className={`w-full px-5 sm:px-12 lg:px-24 flex justify-center items-center -mt-[26px] sm:mt-10 ${className}`}>
        <div className="text-white text-[20px] sm:text-xl lg:text-[32px] font-light sm:font-normal font-geometria sm:font-inter leading-[100%] sm:leading-none">
          Загрузка...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`w-full px-5 sm:px-12 lg:px-24 flex justify-center items-center -mt-[26px] sm:mt-10 ${className}`}>
        <div className="text-white text-[20px] sm:text-xl lg:text-[32px] font-light sm:font-normal font-geometria sm:font-inter leading-[100%] sm:leading-none">
          Ошибка: {error}
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full px-5 sm:px-12 lg:px-24 flex justify-center items-center -mt-[26px] sm:mt-10 ${className}`}>
      <div className="text-white text-[20px] sm:text-xl lg:text-[32px] font-light sm:font-normal font-geometria sm:font-inter leading-[100%] sm:leading-none flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-10">
        {/* Динамические категории из API */}
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={`/projects/${category.slug}`} 
            className="hover:text-[#DE063A] transition-colors duration-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectCategories;