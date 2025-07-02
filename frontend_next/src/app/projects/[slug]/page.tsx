"use client";
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Header_mobile from "@/components/Header_mobile";
import Footer from '@/components/Footer';
import FooterMobile from "@/components/Footer_mobile";
import ContactForm from '@/components/ContactForm';
import CarouselWithLightbox from '@/app/components/CarouselWithLightbox'

// Данные для Branding Gallery
const brandingImages = [
  {
    id: 1,
    type: 'double',
    items: [
      {
        type: 'image',
        src: '/images/project_single/pattern_main.svg',
        alt: 'ИКАР брендинг паттерн',
      },
      {
        type: 'image',
        src: '/images/project_single/logo_companies.jpg',
        alt: 'ИКАР логотипы компаний',
      },
    ],
  },
  {
    id: 2,
    type: 'single',
    items: [
      {
        type: 'image',
        src: '/images/project_single/branding_image.jpg',
        alt: 'ИКАР брендинг',
      },
    ],
  },
] as const

// Данные для Photo Gallery
const photoGalleryImages = [
  {
    id: 1,
    type: 'double',
    items: [
      { type: 'image', src: '/images/project_single/photo_1.jpg', alt: 'ИКАР фото 1' },
      { type: 'image', src: '/images/project_single/photo_2.jpg', alt: 'ИКАР фото 2' },
    ],
  },
  {
    id: 2,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/photo_3.jpg', alt: 'ИКАР фото 3' },
    ],
  },
  {
    id: 3,
    type: 'double',
    items: [
      { type: 'image', src: '/images/project_single/photo_4.jpg', alt: 'ИКАР фото 4' },
      { type: 'image', src: '/images/project_single/photo_5.jpg', alt: 'ИКАР фото 5' },
    ],
  },
  {
    id: 4,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/photo_6.jpg', alt: 'ИКАР фото 6' },
    ],
  },
] as const

const threeDGalleryImages = [
  {
    id: 1,
    type: 'double',
    items: [
      {
        type: 'image',
        src: '/images/project_single/3d_1.png',
        alt: 'ИКАР 3D графика 1',
      },
      {
        type: 'video',
        src: '/video/project_single/3d_2.mp4',
        alt: 'ИКАР 3D видео 2',
        poster: '/images/project_single/3d_2.png',
      },
    ],
  },
  {
    id: 2,
    type: 'single',
    items: [
      {
        type: 'video',
        src: '/video/project_single/3d_3_Moscow.mp4',
        alt: 'ИКАР 3D видео 3',
        poster: '/images/project_single/3d_3.jpg',
      },
    ],
  },
] as const

// Hero Media Items
const heroMediaItems = [
  {
    id: 1,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/hero_image/image_1.jpg', alt: 'ИКАР герой изображение 1' },
    ],
  },
  {
    id: 2,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/hero_image/image_2.jpg', alt: 'ИКАР герой изображение 2' },
    ],
  },
  {
    id: 3,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/hero_image/image_3.jpg', alt: 'ИКАР герой изображение 3' },
    ],
  },
  {
    id: 4,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/hero_image/image_4.jpg', alt: 'ИКАР герой изображение 4' },
    ],
  },
  {
    id: 5,
    type: 'single',
    items: [
      { type: 'video', src: '/video/project_single/3d_3_Moscow.mp4', alt: 'ИКАР герой видео 5', poster: '/images/project_single/hero_image/image_5.webp' },
    ],
  },
] as const

// Promo Media Items
const promoMediaItems = [
  {
    id: 1,
    type: 'single',
    items: [
      { type: 'video', src: '/video/project_single/promo_video/1.mp4', alt: 'Promo Video 1', poster: '/images/project_single/video_image.png' },
    ],
  },
  {
    id: 2,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/promo_video/2.jpg', alt: 'Promo Image 2' },
    ],
  },
  {
    id: 3,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/promo_video/3.jpg', alt: 'Promo Image 3' },
    ],
  },
  {
    id: 4,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/promo_video/4.jpg', alt: 'Promo Image 4' },
    ],
  },
  {
    id: 5,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/promo_video/5.jpg', alt: 'Promo Image 5' },
    ],
  },
] as const;

// Presentation Media Items
const presentationMediaItems = [
  {
    id: 1,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/presentation/presentation.png', alt: 'Презентация изображение 1' },
    ],
  },
  {
    id: 2,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/presentation/ER1_9926 copy.jpg', alt: 'Презентация изображение 2' },
    ],
  },
  {
    id: 3,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/presentation/5.jpg', alt: 'Презентация изображение 3' },
    ],
  },
  {
    id: 4,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/presentation/pervyi-element-bpla-na-vodorode-zashitit-strategicheskuyu-infrastrukturu-5wnnurrx-1724364601.jpg', alt: 'Презентация изображение 4' },
    ],
  },
  {
    id: 5,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/presentation/Silent-Arrow-Autonomous-Cargo-Glider.webp', alt: 'Презентация изображение 5' },
    ],
  },
] as const;

// Website Media Items
const websiteMediaItems = [
  {
    id: 1,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/website/website_image.jpg', alt: 'ИКАР сайт изображение 1' },
    ],
  },
  {
    id: 2,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/website/website.jpg', alt: 'ИКАР сайт изображение 2' },
    ],
  },
  {
    id: 3,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/website/web-site-ornekleri.jpg', alt: 'ИКАР сайт изображение 3' },
    ],
  },
  {
    id: 4,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/website/sozdanie-saytov-v-moskve.jpg', alt: 'ИКАР сайт изображение 4' },
    ],
  },
  {
    id: 5,
    type: 'single',
    items: [
      { type: 'image', src: '/images/project_single/website/bg_2-min.jpeg', alt: 'ИКАР сайт изображение 5' },
    ],
  },
] as const;

export default function ProjectPage() {
  return (
    <main className="min-h-screen flex flex-col items-stretch bg-[#0E1011]">
      {/* Header */}
      <Header />
      <Header_mobile />

      {/* Hero Section */}
      <section className="w-full flex flex-col items-stretch">
        {/* Hero Content */}
        <div className="w-full flex flex-col gap-20 px-5 sm:px-12 lg:px-24 mt-[7px] sm:mt-0 sm:pt-[150px] pb-16 sm:pb-[64px]">
          <div className="w-full flex flex-col">
            <h1 className="font-geometria font-extrabold text-[60px] sm:text-[140px] lg:text-[280px] uppercase leading-[100%] sm:leading-[100%] text-white">
              икар
            </h1>
            <p className="font-inter font-semibold text-[32px] sm:text-4xl lg:text-[80px] leading-[100%] sm:leading-[120%] tracking-normal sm:-tracking-[2px] text-white max-w-[1400px] max-w-full-3xl mt-[30px] sm:mt-2">
              Полная подготовка и сопровождение нескольких отраслевых выставок
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between -mt-[64px] sm:mt-0">
            <div className="flex flex-col gap-4 w-full">
              <p className="font-geometria font-light sm:font-normal text-[24px] lg:text-[30px] text-white/60 leading-none">
                Клиент
              </p>
              <p className="font-inter font-semibold text-[24px] lg:text-[32px] text-white leading-[130%] -tracking-[0.5px]">
                ГК «ИКАР», Корпорация «АФК Система»
              </p>
            </div>
            <div className="flex flex-col gap-4 xl:ml-0 2xl:-ml-51 mt-[20px] sm:mt-0">
              <p className="font-geometria font-light sm:font-normal text-[24px] lg:text-[30px] text-white/60 leading-none">
                Год
              </p>
              <p className="font-inter font-semibold text-[24px] lg:text-[32px] text-white leading-[130%] -tracking-[0.5px]">
                2023
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:ml-40 mt-[20px] sm:mt-0">
              <p className="font-geometria font-light sm:font-normal text-[24px] lg:text-[30px] text-white/60 leading-none">
                Услуги
              </p>
              <p className="font-inter font-semibold text-[24px] lg:text-[32px] text-white leading-[130%] -tracking-[0.5px]">
                Брендинг, фото, видео, 3д-анимация, презентация, сайт, сопровождение
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image Carousel */}
        <CarouselWithLightbox images={heroMediaItems} className="-mt-[45px] sm:mt-0" />
      </section>

      {/* Branding Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px] -mt-[5px] sm:mt-0">
        <h2 className="font-geometria font-extrabold sm:font-bold text-[60px] md:text-7xl xl:text-[128px] uppercase leading-[120%] sm:leading-[100%] text-white w-full max-w-[640px]">
          брендинг
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full -mt-[1px] sm:mt-0">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-[20px] sm:text-3xl lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] text-white">
              Доработка уже имеющегося логотипа компании
            </h3>
            <p className="font-inter font-normal text-[16px] sm:text-xl lg:text-[22px] leading-[100%] sm:leading-[170%] text-white/60 max-w-[992px] max-w-full-3xl -mt-[5px] sm:mt-0">
              Задачи не было переделывать весь логотип, необходимо было доработать уже имеющуюся версию. В данном случае компания «ИКАР» в какой то момент обрела статус группы компаний и соответственно для разных подразделений и предприятий, входящих в состав группы, были доработаны логотипы. Так же был создан фирменный паттерн, набор инфо-графических элементов, точно отражающих деятельность компании.
            </p>
          </div>
        </div>
      </section>

      {/* Branding Gallery */}
      <section className="flex flex-col gap-6 -mt-9">
         <CarouselWithLightbox images={brandingImages} className='mt-[12px] sm:mt-0' />
      </section>

      {/* Photo Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px] -mt-[5px] sm:mt-0">
        <h2 className="font-geometria font-extrabold sm:font-bold text-[60px] md:text-7xl xl:text-[128px] uppercase leading-[120%] sm:leading-none text-white w-full max-w-[640px]">
          фото
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full -mt-[1px] sm:mt-0">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-[20px] sm:text-3xl lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] text-white">
              Профессиональная фото-съёмка всех процессов, продукции и выставок
            </h3>
            <p className="font-inter font-normal text-[16px] sm:text-xl lg:text-[22px] leading-[100%] sm:leading-[1.7] text-white/60 -mt-[5px] sm:mt-0">
              Съёмка фотографии - один из наиболее важных моментов, так как это важная часть любого визуала и основная составляющая всех медиа.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="flex flex-col gap-6 mt-6">
        <CarouselWithLightbox images={photoGalleryImages} className='-mt-[50px] sm:mt-0' />

        {/* Button */}
        {/* <div className="flex justify-center mt-5">
          <button className="font-inter font-semibold text-lg sm:text-xl lg:text-[22px] text-white border-2 border-white py-[16px] px-[26px] w-[159px] h-[54px] rounded-full hover:bg-white/10 hover:cursor-pointer transition-colors whitespace-nowrap leading-[100%]">
            Ещё фото
          </button>
        </div> */}
      </section>

      {/* 3D Graphics Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:pt-[90px] lg:pb-[139px] -mt-[5px] sm:mt-0">
        <h2 className="font-geometria font-bold text-[60px] md:text-7xl xl:text-[128px] uppercase leading-[120%] sm:leading-none text-white w-full max-w-[640px]">
          3d графика
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full -mt-[1px] sm:mt-0">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-[20px] sm:text-3xl lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] text-white max-w-[992px] max-w-full-3xl">
              На основе CAD моделей создали реальные объекты в материале и окрасе. Анимировали и применили в проморолике, презентациях и на сайте сайте.
            </h3>
            <p className="font-inter font-normal text-[16px] sm:text-xl lg:text-[22px] leading-[100%] sm:leading-[170%] text-white/60 max-w-[992px] max-w-full-3xl -mt-[5px] sm:mt-0">
              На основе всех 3д моделей в инженерном сером виде, мы создали уникальные по красоте и эффектности объекты, наложили на них все материалы и логотипы. Положили надписи и ливреи. Анимировали объекты и создали сцены с графикой, которую в последствии использовали во всех визуальных компонентах, усилив эффект от просмотра и вовлеченность зрителя
            </p>
          </div>
        </div>
      </section>

      {/* 3D Gallery */}
      <section className="flex flex-col gap-6">
        <CarouselWithLightbox images={threeDGalleryImages} className='-mt-[25px] sm:mt-0' />
      </section>

      {/* Promo Video Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px] -mt-[5px] sm:mt-0">
        <h2 className="font-geometria font-bold text-[60px] md:text-7xl xl:text-[128px] uppercase leading-[120%] sm:leading-none text-white w-full max-w-[640px]">
          промо
          видео
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full -mt-[1px] sm:mt-0">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-[20px] sm:text-3xl lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] text-white">
              Промо видео для стенда и диджитал, точно передающее смыслы
            </h3>
            <p className="font-inter font-normal text-[16px] sm:text-xl lg:text-[22px] leading-[100%] sm:leading-[1.7] text-white/60 -mt-[5px] sm:mt-0">
              Работа над роликом велась в предельно короткий промежуток времени. Сэкономили время для компании, ускоренно начав работу по составлению ТЗ самостоятельно - что сильно ускорило процесс. В итоге показали все важнейшие моменты на видео: процесс разработки, испытаний, локализация производства, возможность расширения производства в кратчайшие сроки, и конечно сами полёты изделия, демонстрирующие его возможности.
            </p>
          </div>
        </div>
      </section>

      {/* Video Player */}
      <CarouselWithLightbox images={promoMediaItems} className='-mt-[25px] sm:mt-0' />      

      {/* Presentation Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:pt-[90px] lg:pb-[128px] -mt-[5px] sm:mt-0">
        <h2 className="font-geometria font-bold text-[60px] md:text-7xl xl:text-[128px] uppercase leading-[120%] sm:leading-[100%] text-white w-full sm:max-w-[260px] md:max-w-[400px] xl:max-w-[640px] break-words">
          презентация
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-16 lg:gap-20 w-full -mt-[1px] sm:mt-0">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-[20px] sm:text-3xl lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] text-white">
              Неотъемлемой частью выставки и любого коммерческого предложения является презентация
            </h3>
            <p className="font-inter font-normal text-[16px] sm:text-xl lg:text-[22px] leading-[100%] sm:leading-[170%] text-white/60 -mt-[5px] sm:mt-0">
              В презентации использовали: брендинг, паттерны, коммерческие фотографии, 3д графику. Всё это позволило создать понятную брошюру без воды. Так же были изготовлены полиграфические варианты самой презентации, и созданы папки, блокноты и другая полиграфия для выставки.
            </p>
          </div>
        </div>
      </section>

      {/* Presentation Image */}
      <CarouselWithLightbox images={presentationMediaItems} className='-mt-[25px] sm:mt-0' />

      {/* Website Section */}
      <section className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 lg:gap-24 px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-[96px] lg:pb-[128px] -mt-[5px] sm:mt-0">
        <h2 className="font-geometria font-bold text-[60px] md:text-7xl xl:text-[128px] uppercase leading-[120%] sm:leading-none text-white w-full max-w-[640px]">
          сайт
        </h2>
        <div className="flex flex-col justify-center gap-10 sm:gap-8 lg:gap-[32px] w-full -mt-[1px] sm:mt-0">
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-inter font-semibold text-[20px] sm:text-3xl lg:text-[48px] leading-[120%] sm:leading-[130%] -tracking-[1px] sm:-tracking-[0.5px] text-white">
              Создание сайта в кратчайшие сроки
            </h3>
            <p className="font-inter font-normal text-[16px] sm:text-xl lg:text-[22px] leading-[100%] sm:leading-[170%] text-white/60 max-w-[992px] -tracking-[0.1px] max-w-full-3xl -mt-[5px] sm:mt-0">
              Веб сайт отвечающий всем требованиям времени. Создан на российской системе управления и размещён на российском сервере, отвечающий запросам безопастности. Учтена верстка под все устройства: мобильный телефон, планшет, ноутбуки и компьютеры. Так же на сайте продуман весь путь клиента от ознакомления с продукцией к действию по запросу более подробной информации и квалификации клиента.
              <br />
              В основе создания лежат технологии анимированной 3д графики, промовидео, UX/UI дизайн.
              <br />
              Созданы русская и английская версия.
              <br />
              Работы сделаны под ключ за 3 недели.
            </p>
          </div>
          <div className="flex justify-start -mt-1">
            <a 
              href="https://ikartech.ru" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center font-inter font-semibold text-[16px] sm:text-xl lg:text-[22px] text-white border-2 border-white w-[117px] sm:w-[169px] h-[32px] sm:h-[54px] rounded-full hover:bg-white/10 hover:cursor-pointer transition-colors whitespace-nowrap leading-[100%]"
            >
              ikartech.ru
            </a>
          </div>
        </div>
      </section>

      {/* Website Image */}
      <CarouselWithLightbox images={websiteMediaItems} className='-mt-[23px] sm:mt-0' />

      {/* All Projects Button */}
      <section className="w-full flex items-center justify-center sm:justify-start py-16 sm:py-20 lg:py-[76px] lg:pb-[96px] sm:pl-24">
        <Link 
          href="/projects" 
          className="flex items-center justify-center font-inter font-semibold text-[16px] sm:text-xl lg:text-[22px] text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors w-[134px] sm:w-[192px] h-[32px] sm:h-[54px] leading-[100%]"
        >
          все проекты
        </Link>
      </section>

      {/* Contact Section */}
      <section className="w-full flex flex-col lg:flex-row pb-[90px] sm:pb-0">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 h-[350px] sm:h-[600px] lg:h-[1175px] bg-white relative">
          <Image 
            src="/images/project_single/contact_image.jpg" 
            alt="Связаться с нами" 
            fill 
            className="object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-5 sm:p-16 lg:p-24 bg-[#0E1011] mt-[60px] sm:-mt-2">
          <div className="w-full max-w-[768px] flex flex-col gap-8 sm:gap-16 lg:gap-24 max-w-full-3xl">
            <div className="flex flex-col gap-4 mb-18">
              <h2 className="font-geometria font-bold text-[40px] sm:text-5xl xl:text-[80px] uppercase leading-[130%] sm:leading-[1.1] text-white tracking-[-1px] sm:tracking-normal">
                интересует подобный проект ?
              </h2>
              <p className="font-inter font-normal text-[16px] sm:text-xl lg:text-[24px] leading-[180%] sm:leading-[1.7] text-white mt-1">
                Если вас заинтересовал подобный проект под ключ, напишите и мы с вами свяжемся для обсуждения подробностей.
              </p>
            </div>

            <ContactForm className="-mt-[64px]" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <FooterMobile />
    </main>
  );
}