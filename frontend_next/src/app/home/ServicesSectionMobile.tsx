"use client"

import Image from "next/image";
import Link from "next/link";
import { useServiceVideo } from "@/hooks/useServiceVideo";

interface ServicesSectionProps {
    className?: string;
}

export default function ServicesSectionMobile({ className }: ServicesSectionProps) {
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
            <div className="flex flex-col gap-[60px] mt-[80px]">
                {/* Card 1 - решения для выставок */}
                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="px-5">
                        <h3 className="text-white font-geometria font-bold text-[40px] uppercase leading-[1em]">
                            решения для выставок
                        </h3>
                    </div>

                    {/* Image Wrapper */}
                    <div className="relative w-full h-[520px] overflow-hidden">
                        <Image
                            src="/images/home/service-1.jpg"
                            alt="Exhibition Solutions"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Frame */}
                    <div className="px-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <p className="text-white font-inter font-semibold text-[20px] leading-[1.2em] tracking-[-1px]">
                                Комплексный подход к дизайну и визуализации вашего присутствия на выставке.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-white/60 font-cabin text-[16px] leading-[1em]">
                                Из производственников — в звёзды отрасли
                            </p>
                            <div className="flex gap-5">
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Концепция</p>
                                    <p>Пространство</p>
                                </div>
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Мультимедиа</p>
                                    <p>Сопровождение</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 - стратегия брендинг */}
                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="px-5">
                        <h3 className="text-white font-geometria font-bold text-[40px] uppercase leading-[1em]">
                            стратегия брендинг
                        </h3>
                    </div>

                    {/* Image Wrapper */}
                    <div className="relative w-full h-[520px] overflow-hidden">
                        <Image
                            src="/images/home/service-2.jpg"
                            alt="Branding and Strategy"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Frame */}
                    <div className="px-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <p className="text-white font-inter font-semibold text-[20px] leading-[1.2em] tracking-[-1px]">
                                Разработка индивидуальной маркетинговой стратегии визуализации с учётом специфики вашей отрасли.
                                <br /><br />
                                Создание целостного визуального месседжа, дизайн-концепции, фирменного стиля, логотипа и брендинга.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-white/60 font-cabin text-[16px] leading-[1em]">
                                Выделяющийся из массы, стильный, технологичный
                            </p>
                            <div className="flex gap-5">
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Концепция</p>
                                    <p>Пространство</p>
                                </div>
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Мультимедиа</p>
                                    <p>Сопровождение</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3 - ДИЗАЙН */}
                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="px-5">
                        <h3 className="text-white font-geometria font-bold text-[40px] uppercase leading-[1em]">
                            ДИЗАЙН
                        </h3>
                    </div>

                    {/* Image Wrapper */}
                    <div className="relative w-full h-[520px] overflow-hidden">
                        <Image
                            src="/images/home/service-3.jpg"
                            alt="Design"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Frame */}
                    <div className="px-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <p className="text-white font-inter font-semibold text-[20px] leading-[1.2em] tracking-[-1px]">
                                Комплексный подход к дизайну и визуализации вашего присутствия на выставке.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-white/60 font-cabin text-[16px] leading-[1em]">
                                Из производственников — в звёзды отрасли
                            </p>
                            <div className="flex gap-5">
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Концепция</p>
                                    <p>Пространство</p>
                                </div>
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Мультимедиа</p>
                                    <p>Сопровождение</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 4 - 3d графика */}
                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="px-5">
                        <h3 className="text-white font-geometria font-bold text-[40px] uppercase leading-[1em]">
                            3d графика
                        </h3>
                    </div>

                    {/* Image Wrapper */}
                    <div className="relative w-full h-[520px] overflow-hidden">
                        <Image
                            src="/images/home/service-5.jpg"
                            alt="3D Graphics"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Frame */}
                    <div className="px-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <p className="text-white font-inter font-semibold text-[20px] leading-[1.2em] tracking-[-1px]">
                                Создание промышленного 3д-дизайна, анимация графики
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-white/60 font-cabin text-[16px] leading-[1em]">
                                TDM/ERP/CAD
                            </p>
                            <div className="flex gap-5">
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Доработка моделей</p>
                                    <p>Текстурирование</p>
                                </div>
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Анимация 3д</p>
                                    <p>Создание рендеров</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 5 - web-Сайты */}
                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="px-5">
                        <h3 className="text-white font-geometria font-bold text-[40px] uppercase leading-[1em]">
                            web-Сайты
                        </h3>
                    </div>

                    {/* Image Wrapper */}
                    <div className="relative w-full h-[520px] overflow-hidden">
                        <Image
                            src="/images/home/service-6.jpg"
                            alt="Web Sites"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content Frame */}
                    <div className="px-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <p className="text-white font-inter font-semibold text-[20px] leading-[1.2em] tracking-[-1px]">
                                Эксклюзивные продуманные web-сайты, созданные на основе уникального контента: брендинг, фото, видео, 3д графика - всё в едином ключе.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-white/60 font-cabin text-[16px] leading-[1em]">
                                Российские CMS
                            </p>
                            <div className="flex gap-5">
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Мобильная версия</p>
                                    <p>Тестирование удобства</p>
                                </div>
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Современный дизайн</p>
                                    <p>UI/UX аудит</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 6 - видео продакшн */}
                <div className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="px-5">
                        <h3 className="text-white font-geometria font-bold text-[40px] uppercase leading-[1em]">
                            видео продакшн
                        </h3>
                    </div>

                    {/* Image Wrapper */}
                    <div className="relative w-full h-[520px] overflow-hidden">
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

                    {/* Content Frame */}
                    <div className="px-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            <p className="text-white font-inter font-semibold text-[20px] leading-[1.2em] tracking-[-1px]">
                                Большой опыт позволяет самим создавать сценарий и понятно демонстрировать преимущества вашей компании.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-white/60 font-cabin text-[16px] leading-[1em]">
                                Профессиональная съёмка роликов
                            </p>
                            <div className="flex gap-5">
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Составим сценарий</p>
                                    <p>Продумаем детали</p>
                                </div>
                                <div className="flex-1 text-white font-inter font-semibold text-[16px] leading-[1.3em]">
                                    <p>Создадим стильный</p>
                                    <p>информативный ролик</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Projects Button */}
            <div className="mx-auto mt-[60px] mb-[80px]">
                <Link href="/projects">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-white rounded-full bg-transparent hover:bg-white/10 transition-colors">
                        <span className="text-white font-inter font-semibold text-base leading-none">
                            все проекты
                        </span>
                    </button>
                </Link>
            </div>

        </section>
    );
}