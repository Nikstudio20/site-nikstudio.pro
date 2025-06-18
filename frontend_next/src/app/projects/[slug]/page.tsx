"use client";

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import MediaCarousel, { MediaItem } from '@/components/MediaCarousel';

// Hero Media Items
const heroMediaItems: MediaItem[] = [
  { type: "image", src: "/images/project_single/hero_image/image_1.png" },
  { type: "image", src: "/images/project_single/hero_image/image_2.jpg" },
  { type: "image", src: "/images/project_single/hero_image/image_3.jpg" },
  { type: "image", src: "/images/project_single/hero_image/image_4.jpg" },
  { type: "video", src: "/video/project_single/3d_3_Moscow.mp4", poster: "/images/project_single/hero_image/image_5.webp" }
];

// Promo Media Items
const promoMediaItems: MediaItem[] = [
  { type: "video", src: "/video/project_single/promo_video/1.mp4", poster: "/images/project_single/video_image.jpg" },
  { type: "image", src: "/images/project_single/promo_video/2.jpg" },
  { type: "image", src: "/images/project_single/promo_video/3.jpg" },
  { type: "image", src: "/images/project_single/promo_video/4.jpg" },
  { type: "image", src: "/images/project_single/promo_video/5.jpg" }
];

// Presentation Media Items
const presentationMediaItems: MediaItem[] = [
  { type: "image", src: "/images/project_single/presentation/bpla_io.jpg" },
  { type: "image", src: "/images/project_single/presentation/ER1_9926 copy.jpg" },
  { type: "image", src: "/images/project_single/presentation/5.jpg" },
  { type: "image", src: "/images/project_single/presentation/pervyi-element-bpla-na-vodorode-zashitit-strategicheskuyu-infrastrukturu-5wnnurrx-1724364601.jpg" },
  { type: "image", src: "/images/project_single/presentation/Silent-Arrow-Autonomous-Cargo-Glider.webp" }
];

// Website Media Items
const websiteMediaItems: MediaItem[] = [
  { type: "image", src: "/images/project_single/website/website_image.jpg" },
  { type: "image", src: "/images/project_single/website/website.jpg" },
  { type: "image", src: "/images/project_single/website/web-site-ornekleri.jpg" },
  { type: "image", src: "/images/project_single/website/sozdanie-saytov-v-moskve.jpg" },
  { type: "image", src: "/images/project_single/website/bg_2-min.jpeg" }
];

export default function ProjectPage() {
  return (
    <main className="min-h-screen flex flex-col items-stretch bg-[#0E1011]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full flex flex-col items-stretch">
        {/* Hero Content */}
        <div className="w-full flex flex-col gap-20 px-6 sm:px-12 lg:px-24 pt-90 sm:pt-[150px] pb-16 sm:pb-[64px]">
          <div className="w-full flex flex-col">
            <h1 className="font-geometria font-extrabold text-[70px] sm:text-[140px] lg:text-[280px] uppercase leading-[100%] text-white">
              икар
            </h1>
            <p className="font-inter font-semibold text-2xl sm:text-4xl lg:text-[80px] leading-[120%] -tracking-[2px] text-white max-w-[1400px] max-w-full-3xl mt-4 sm:mt-2">
              Полная подготовка и сопровождение нескольких отраслевых выставок
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-geometria font-normal text-xl lg:text-[30px] text-white/60 leading-none">
                Клиент
              </p>
              <p className="font-inter font-semibold text-xl lg:text-[32px] text-white leading-[130%] -tracking-[0.5px]">
                ГК «ИКАР», Корпорация «АФК Система»
              </p>
            </div>
            <div className="flex flex-col gap-4 xl:ml-0 2xl:-ml-51">
              <p className="font-geometria font-normal text-xl lg:text-[30px] text-white/60 leading-none">
                Год
              </p>
              <p className="font-inter font-semibold text-xl lg:text-[32px] text-white leading-[1.3] -tracking-[1.5625%]">
                2023
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:ml-40">
              <p className="font-geometria font-normal text-xl lg:text-[30px] text-white/60 leading-none">
                Услуги
              </p>
              <p className="font-inter font-semibold text-xl lg:text-[32px] text-white leading-[130%] -tracking-[0.5px]">
                Брендинг, фото, видео, 3д-анимация, презентация, сайт, сопровождение
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image Carousel */}
        <MediaCarousel 
          items={heroMediaItems}
          altPrefix="ИКАР проект"
          ariaLabel="Проектная галерея"
        />
      </section>

      {/* Branding Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px]">
        <h2 className="font-geometria font-bold text-5xl md:text-7xl xl:text-[128px] uppercase leading-[100%] text-white w-full max-w-[640px]">
          брендинг
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-[48px] leading-[130%] -tracking-[0.5px] text-white">
              Доработка уже имеющегося логотипа компании
            </h3>
            <p className="font-inter font-normal text-lg sm:text-xl lg:text-[22px] leading-[170%] text-white/60 max-w-[992px] max-w-full-3xl">
              Задачи не было переделывать весь логотип, необходимо было доработать уже имеющуюся версию. В данном случае компания «ИКАР» в какой то момент обрела статус группы компаний и соответственно для разных подразделений и предприятий, входящих в состав группы, были доработаны логотипы. Так же был создан фирменный паттерн, набор инфо-графических элементов, точно отражающих деятельность компании.
            </p>
          </div>
        </div>
      </section>

      {/* Branding Gallery */}
      <section className="flex flex-col gap-6 -mt-9">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full h-[300px] lg:h-[500px] 2xl:h-[946px] relative">
            <Image 
              src="/images/project_single/pattern_main.svg" 
              alt="ИКАР брендинг паттерн" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full h-[300px] lg:h-[500px] 2xl:h-[946px] relative">
            <Image 
              src="/images/project_single/logo_companies.jpg" 
              alt="ИКАР логотипы компаний" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[500px] lg:h-[1080px] relative">
          <Image 
            src="/images/project_single/branding_image.jpg" 
            alt="ИКАР брендинг" 
            fill 
            className="object-cover"
          />
        </div>
      </section>

      {/* Photo Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px]">
        <h2 className="font-geometria font-bold text-5xl md:text-7xl xl:text-[128px] uppercase leading-none text-white w-full max-w-[640px]">
          фото
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-[48px] leading-[130%] -tracking-[0.5px] text-white">
              Профессиональная фото-съёмка всех процессов, продукции и выставок
            </h3>
            <p className="font-inter font-normal text-lg sm:text-xl lg:text-[22px] leading-[1.7] text-white/60">
              Съёмка фотографии - один из наиболее важных моментов, так как это важная часть любого визуала и основная составляющая всех медиа.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="flex flex-col gap-6 mt-6">
        {/* First Row */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full h-[300px] sm:h-[500px] lg:h-[946px] relative">
            <Image 
              src="/images/project_single/photo_1.jpg" 
              alt="ИКАР фото 1" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full h-[300px] sm:h-[500px] lg:h-[946px] relative">
            <Image 
              src="/images/project_single/photo_2.jpg" 
              alt="ИКАР фото 2" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Large Image */}
        <div className="w-full h-[300px] sm:h-[500px] lg:h-[1080px] relative">
          <Image 
            src="/images/project_single/photo_3.jpg" 
            alt="ИКАР фото 3" 
            fill 
            className="object-cover"
          />
        </div>

        {/* Second Row */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full h-[300px] sm:h-[500px] lg:h-[946px] relative">
            <Image 
              src="/images/project_single/photo_4.jpg" 
              alt="ИКАР фото 4" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full h-[300px] sm:h-[500px] lg:h-[946px] relative">
            <Image 
              src="/images/project_single/photo_5.jpg" 
              alt="ИКАР фото 5" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Large Image */}
        <div className="w-full h-[300px] sm:h-[500px] lg:h-[1080px] relative">
          <Image 
            src="/images/project_single/photo_6.jpg" 
            alt="ИКАР фото 6" 
            fill 
            className="object-cover"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-5">
          <button className="font-inter font-semibold text-lg sm:text-xl lg:text-[22px] text-white border-2 border-white py-[16px] px-[26px] w-[159px] h-[54px] rounded-full hover:bg-white/10 hover:cursor-pointer transition-colors whitespace-nowrap leading-[100%]">
            Ещё фото
          </button>
        </div>
      </section>

      {/* 3D Graphics Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:pt-[90px] lg:pb-[139px]">
        <h2 className="font-geometria font-bold text-5xl md:text-7xl xl:text-[128px] uppercase leading-none text-white w-full max-w-[640px]">
          3d графика
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-[48px] leading-[130%] -tracking-[0.5px] text-white max-w-[992px] max-w-full-3xl">
              На основе CAD моделей создали реальные объекты в материале и окрасе. Анимировали и применили в проморолике, презентациях и на сайте сайте.
            </h3>
            <p className="font-inter font-normal text-lg sm:text-xl lg:text-[22px] leading-[170%] text-white/60 max-w-[992px] max-w-full-3xl">
              На основе всех 3д моделей в инженерном сером виде, мы создали уникальные по красоте и эффектности объекты, наложили на них все материалы и логотипы. Положили надписи и ливреи. Анимировали объекты и создали сцены с графикой, которую в последствии использовали во всех визуальных компонентах, усилив эффект от просмотра и вовлеченность зрителя
            </p>
          </div>
        </div>
      </section>

      {/* 3D Gallery */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full h-[300px] sm:h-[500px] lg:h-[946px] relative">
            <Image 
              src="/images/project_single/3d_1.jpg" 
              alt="ИКАР 3D графика 1" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="w-full h-[300px] sm:h-[500px] lg:h-[946px] relative group">
            <video 
              src="/video/project_single/3d_2.mp4" 
              className="absolute inset-0 w-full h-full object-cover"
              controls
              controlsList="nodownload"
              poster="/images/project_single/3d_2.jpg"
              preload="metadata"
            />
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[500px] lg:h-[1080px] relative group">
          <video 
            src="/video/project_single/3d_3_Moscow.mp4" 
            className="absolute inset-0 w-full h-full object-cover"
            controls
            controlsList="nodownload"
            poster="/images/project_single/3d_3.jpg"
            preload="metadata"
          />
        </div>
      </section>

      {/* Promo Video Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px]">
        <h2 className="font-geometria font-bold text-5xl md:text-7xl xl:text-[128px] uppercase leading-none text-white w-full max-w-[640px]">
          промо
          видео
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-[48px] leading-[130%] -tracking-[0.5px] text-white">
              Промо видео для стенда и диджитал, точно передающее смыслы
            </h3>
            <p className="font-inter font-normal text-lg sm:text-xl lg:text-[22px] leading-[1.7] text-white/60">
              Работа над роликом велась в предельно короткий промежуток времени. Сэкономили время для компании, ускоренно начав работу по составлению ТЗ самостоятельно - что сильно ускорило процесс. В итоге показали все важнейшие моменты на видео: процесс разработки, испытаний, локализация производства, возможность расширения производства в кратчайшие сроки, и конечно сами полёты изделия, демонстрирующие его возможности.
            </p>
          </div>
        </div>
      </section>

      {/* Video Player */}
      <MediaCarousel 
        items={promoMediaItems}
        height="h-[300px] sm:h-[500px] lg:h-[1080px]"
        altPrefix="ИКАР промо контент"
        ariaLabel="Промо видео галерея"
      />

      {/* Presentation Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:pt-[90px] lg:pb-[128px]">
        <h2 className="font-geometria font-bold text-5xl md:text-7xl xl:text-[128px] uppercase leading-[100%] text-white w-full sm:max-w-[260px] md:max-w-[400px] xl:max-w-[640px] break-words">
          презентация
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-[48px] leading-[130%] -tracking-[0.5px] text-white">
              Неотъемлемой частью выставки и любого коммерческого предложения является презентация
            </h3>
            <p className="font-inter font-normal text-lg sm:text-xl lg:text-[22px] leading-[170%] text-white/60">
              В презентации использовали: брендинг, паттерны, коммерческие фотографии, 3д графику. Всё это позволило создать понятную брошюру без воды. Так же были изготовлены полиграфические варианты самой презентации, и созданы папки, блокноты и другая полиграфия для выставки.
            </p>
          </div>
        </div>
      </section>

      {/* Presentation Image */}
      <MediaCarousel
        items={presentationMediaItems}
        height="h-[300px] sm:h-[500px] lg:h-[1080px]"
        altPrefix="ИКАР презентация"
        ariaLabel="Презентация"
      />

      {/* Website Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px]">
        <h2 className="font-geometria font-bold text-5xl md:text-7xl xl:text-[128px] uppercase leading-none text-white w-full max-w-[640px]">
          сайт
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-8 lg:gap-[32px] w-full">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-[48px] leading-[130%] -tracking-[0.5px] text-white">
              Создание сайта в кратчайшие сроки
            </h3>
            <p className="font-inter font-normal text-lg sm:text-xl lg:text-[22px] leading-[170%] text-white/60 max-w-[992px] -tracking-[0.1px] max-w-full-3xl">
              Веб сайт отвечающий всем требованиям времени. Создан на российской системе управления и размещён на российском сервере, отвечающий запросам безопастности. Учтена верстка под все устройства: мобильный телефон, планшет, ноутбуки и компьютеры. Так же на сайте продуман весь путь клиента от ознакомления с продукцией к действию по запросу более подробной информации и квалификации клиента.
              <br />
              В основе создания лежат технологии анимированной 3д графики, промовидео, UX/UI дизайн.
              <br />
              Созданы русская и английская версия.
              <br />
              Работы сделаны под ключ за 3 недели.
            </p>
          </div>
          <div className="flex justify-center sm:justify-start -mt-1">
            <a 
              href="https://ikartech.ru" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center font-inter font-semibold text-lg sm:text-xl lg:text-[22px] text-white border-2 border-white w-[169px] h-[54px] rounded-full hover:bg-white/10 hover:cursor-pointer transition-colors whitespace-nowrap leading-[100%]"
            >
              ikartech.ru
            </a>
          </div>
        </div>
      </section>

      {/* Website Image */}
      <MediaCarousel
        items={websiteMediaItems}
        height="h-[300px] sm:h-[500px] lg:h-[1080px]"
        altPrefix="ИКАР сайт"
        ariaLabel="Сайт изображения"
      />

      {/* All Projects Button */}
      <section className="w-full flex items-center justify-center sm:justify-start py-16 sm:py-20 lg:py-[76px] lg:pb-[96px] sm:pl-24">
        <Link 
          href="/projects" 
          className="flex items-center justify-center font-inter font-semibold text-lg sm:text-xl lg:text-[22px] text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors w-[192px] h-[54px] leading-[100%]"
        >
          все проекты
        </Link>
      </section>

      {/* Contact Section */}
      <section className="w-full flex flex-col lg:flex-row">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 h-[400px] sm:h-[600px] lg:h-[1175px] bg-white relative">
          <Image 
            src="/images/project_single/contact_image.jpg" 
            alt="Связаться с нами" 
            fill 
            className="object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 lg:p-24 bg-[#0E1011] -mt-2">
          <div className="w-full max-w-[768px] flex flex-col gap-8 sm:gap-16 lg:gap-24 max-w-full-3xl">
            <div className="flex flex-col gap-4 mb-18">
              <h2 className="font-geometria font-bold text-4xl sm:text-5xl xl:text-[80px] uppercase leading-[1.1] text-white">
                интересует подобный проект ?
              </h2>
              <p className="font-inter font-normal text-lg sm:text-xl lg:text-[24px] leading-[1.7] text-white mt-1">
                Если вас заинтересовал подобный проект под ключ, напишите и мы с вами свяжемся для обсуждения подробностей.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
