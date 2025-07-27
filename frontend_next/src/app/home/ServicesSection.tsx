"use client"

import Image from "next/image";
import { useServiceVideo } from "@/hooks/useServiceVideo";

interface ServicesSectionProps {
  className?: string;
}

export default function ServicesSection({ className }: ServicesSectionProps) {
  const { video: videoProductionVideo, loading: videoLoading } = useServiceVideo('video_production');
  return (
    <section className={`w-full bg-[#0E1011] flex flex-col mt-[28px] sm:mt-3 ${className || ''}`}>
      <div className="px-5 sm:px-12 lg:px-24 sm:py-24 flex flex-col gap-24">
        {/* Header */}
        <div className="flex flex-col gap-24">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-white/60 font-cabin font-medium text-[20px] sm:text-2xl lg:text-[32px]">услуги</h3>
            <span className="text-white/60 font-cabin font-medium text-[20px] sm:text-2xl lg:text-[32px]">(02)</span>
          </div>

          <div className="flex flex-col gap-4 -mt-[58px] sm:-mt-3">
            <h2 className="text-white font-geometria font-extrabold sm:font-bold text-[60px] sm:text-6xl lg:text-[200px] xl:text-[280px] uppercase leading-none">
              медиа
            </h2>

            <p className="mt-[25px] sm:mt-0 text-white font-inter font-medium sm:font-semibold text-[32px] sm:text-2xl lg:text-[80px] leading-[120%] sm:tracking-[-2px] max-w-[1400px] max-w-full-3xl">
              Создаём проекты комплексно и выполняем отдельные задачи
            </p>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="flex flex-col">
        {/* Card 1 */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 px-5 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-geometria font-bold text-[40px] sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none mt-[10px] sm:mt-0">
                  решения для выставок
                </h3>
                <p className="w-full lg:w-[600px] 2xl:w-[800px] w-full-3xl h-[168px] font-inter text-[20px] sm:text-[40px] leading-[120%] sm:leading-[140%] tracking-[-1px] sm:tracking-normal text-white font-semibold flex-none order-1">
                  Комплексный подход к дизайну и визуализации вашего присутствия на выставке.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:gap-8 -mt-[76px] sm:mt-20 md:mt-11">
                <h3 className="w-full lg:w-[500px] xl:w-[600px] 2xl:w-[691px] h-8 font-cabin text-[16px] sm:text-[32px] leading-[100%] text-white/60 font-normal flex-none order-0">
                  Из производственников — в звёзды отрасли
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24 -mt-[12px] sm:mt-10 md:mt-0">
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Концепция</p>
                    <p>Пространство</p>
                  </div>
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Мультимедиа</p>
                    <p>Сопровождение</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-2/5 h-[520px] sm:h-[400px] lg:h-[1080px]">
            <Image
              src="/images/home/service-1.jpg"
              alt="Exhibition Solutions"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col lg:flex-row mt-[25px] sm:mt-0">
          <div className="relative w-full lg:w-2/5 h-[520px] sm:h-[400px] lg:h-[1080px]">
            <Image
              src="/images/home/service-2.jpg"
              alt="Branding and Strategy"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-3/5 px-5 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24 bg-[#181A1B]">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-geometria font-bold text-[40px] sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none -mt-[40px] sm:mt-0">
                  стратегия
                  <br />брендинг
                </h3>
                <p className="w-full lg:w-[600px] 2xl:w-[800px] w-full-3xl h-[168px] font-inter text-[20px] sm:text-[40px] leading-[120%] sm:leading-[140%] tracking-[-1px] text-white font-semibold flex-none order-1">
                  Разработка индивидуальной маркетинговой стратегии визуализации с учётом специфики вашей отрасли.<br />
                  Создание целостного визуального месседжа, дизайн-концепции, фирменного стиля, логотипа и брендинга.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:gap-8 mt-[44px] sm:mt-0">
                <p className="text-white/60 font-cabin text-[16px] sm:text-xl lg:text-[32px] leading-[100%] sm:leading-tight">
                  Выделяющийся из массы, стильный, технологичный
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Концепция брендинга</p>
                    <p>Логотип</p>
                  </div>
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Позиционирование</p>
                    <p>Гайдлайн</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 px-5 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-geometria font-bold text-[40px] sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none mt-[10px] sm:mt-0">
                  ДИЗАЙН
                  <br />полиграфии
                </h3>
                <p className="text-white font-inter font-semibold text-[20px] sm:text-2xl lg:text-[40px] leading-[120%] sm:leading-[140%] max-w-[800px] max-w-full-3xl tracking-[-1px] sm:tracking-normal">
                  Стильный и понятный дизайн, отражающий суть продукта, созданный точно под целевого клиента. Изготовление в точной цветопередачей.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:gap-8 mt-[20px] sm:mt-14">
                <p className="text-white/60 font-cabin text-[16px] sm:text-xl lg:text-[32px] leading-tight">
                  Создание полиграфических материалов под ключ
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Презентации</p>
                    <p>Буклеты</p>
                  </div>
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Корпоративные журналы</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-2/5 h-[520px] sm:h-[400px] lg:h-[1080px]">
            <Image
              src="/images/home/service-3.jpg"
              alt="Print Design"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col lg:flex-row mt-[25px] sm:mt-0">
          <div className="relative w-full lg:w-2/5 h-[520px] sm:h-[400px] lg:h-[1080px]">
            <Image
              src="/images/home/service-4.jpg"
              alt="Photography"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-3/5 px-5 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24 bg-[#181A1B]">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-geometria font-bold text-[40px] sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none -mt-[40px] sm:mt-0">
                  Фото
                </h3>
                <p className="text-white font-inter font-semibold text-[20px] sm:text-2xl lg:text-[40px] leading-[120%] sm:leading-[140%] tracking-[-1px] sm:tracking-normal max-w-[800px] max-w-full-3xl">
                  Профессиональное фото продукта и процесса производства
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:gap-8  mt-[24px] sm:mt-0">
                <p className="text-white/60 font-cabin text-[16px] sm:text-xl lg:text-[32px] leading-[100%] sm:leading-tight">
                  Опыт более 15 лет
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Фото продукта</p>
                    <p>Портреты команды</p>
                  </div>
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Съёмка производства</p>
                    <p>Фото мероприятий</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 px-5 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-geometria font-bold text-[40px] sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none mt-[10px] sm:mt-0">
                  3d графика
                </h3>
                <p className="text-white font-inter font-semibold text-[20px] sm:text-2xl lg:text-[40px] leading-[120%] sm:leading-[140%] max-w-[800px] max-w-full-3xl tracking-[-1px] sm:tracking-normal">
                  Создание промышленного 3д-дизайна, анимация графики
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:gap-8 mt-[20px] sm:mt-0">
                <p className="text-white/60 font-cabin text-[16px] sm:text-xl lg:text-[32px] leading-tight">
                  TDM/ERP/CAD
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Доработка моделей</p>
                    <p>Текстурирование</p>
                  </div>
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Анимация 3д</p>
                    <p>Создание рендеров</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-2/5 h-[520px] sm:h-[400px] lg:h-[1080px]">
            <Image
              src="/images/home/service-5.jpg"
              alt="3D Graphics"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col lg:flex-row mt-[25px] sm:mt-0">
          <div className="relative w-full lg:w-2/5 h-[520px] sm:h-[400px] lg:h-[1080px]">
            <Image
              src="/images/home/service-6.jpg"
              alt="Web Design"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-3/5 px-6 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24 bg-[#181A1B]">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-geometria font-bold text-[40px] sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none -mt-[40px] sm:mt-0">
                  web-Сайты
                </h3>
                <p className="text-white font-inter font-semibold text-[20px] sm:text-2xl lg:text-[40px] leading-[120%] sm:leading-[140%] tracking-[-1px] sm:tracking-normal max-w-[800px] max-w-full-3xl">
                  Эксклюзивные продуманные web-сайты, созданные на основе уникального контента: брендинг, фото, видео, 3д графика - всё в едином ключе.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:gap-8 mt-[24px] sm:mt-0">
                <p className="text-white/60 font-cabin text-[16px] sm:text-xl lg:text-[32px] leading-[100%] sm:leading-tight">
                  Российские CMS
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[100%] sm:leading-tight">
                    <p>Мобильная версия</p>
                    <p>Тестирование удобства</p>
                  </div>
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[100%] sm:leading-tight">
                    <p>Современный дизайн</p>
                    <p>UI/UX аудит</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 7 */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 px-5 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-geometria font-bold text-[40px] sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none mt-[10px] sm:mt-0">
                  видео
                  <br />продакшн
                </h3>
                <p className="text-white font-inter font-semibold text-[20px] sm:text-2xl lg:text-[40px] leading-[120%] sm:leading-[140%] max-w-[800px] max-w-full-3xl tracking-[-1px] sm:tracking-normal">
                  Большой опыт позволяет самим создавать сценарий и понятно демонстрировать преимущества вашей компании.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:gap-8 mt-[20px] sm:mt-0">
                <p className="text-white/60 font-cabin text-[16px] sm:text-xl lg:text-[32px] leading-tight">
                  Профессиональная съёмка роликов
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Составим сценарий</p>
                    <p>Продумаем детали</p>
                  </div>
                  <div className="text-white font-inter font-semibold text-[16px] sm:text-xl lg:text-[32px] leading-[130%] sm:leading-tight">
                    <p>Создадим стильный</p>
                    <p>информативный ролик</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-2/5 h-[520px] sm:h-[400px] lg:h-[1080px]">
            {videoLoading ? (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : videoProductionVideo?.video_url ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videoProductionVideo.video_url} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            ) : (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/video/Авиационный Буксировочный Комплекс Геркулес (АБК ГЕРКУЛЕС).mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}