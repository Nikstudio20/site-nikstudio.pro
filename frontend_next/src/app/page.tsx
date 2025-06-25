import Image from "next/image";
import Header_mini from "@/components/Header_mini";
import Footer from "@/components/Footer";
import Link from "next/link";
import ProjectCategories from '@/components/ProjectCategories';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0E1011] overflow-x-hidden">
      {/* Header */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 z-10">
        <Header_mini />
      </div>

      <div className="flex flex-col lg:flex-row justify-center w-full relative">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 bg-white relative h-[360px] sm:h-[540px] md:h-[720px] lg:h-[1080px]">
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
          <div className="flex flex-col p-6 sm:p-12 lg:p-24 gap-12 lg:pt-[204px] lg:pb-[64px] h-full">
            <div className="flex flex-col items-center sm:items-start gap-12 lg:gap-[73px]">
              <Link href="/">
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
                <p className="text-white font-geometria text-[30px] leading-[100%] w-full lg:w-[400px] xl:w-[500px] 2xl:w-[768px] w-full-3xl h-[90px] font-normal flex-none self-stretch">
                  Комплексные решения для промышленных компаний / подготовка к отраслевым выставкам / сопровождение / вывод продукта на новый рынок
                </p>
                
                <h1 className="text-white font-inter text-[40px] sm:text-[48px] leading-[130%] w-full lg:w-[400px] xl:w-[500px] 2xl:w-[768px] w-full-3xl h-[124px] font-semibold flex-none self-stretch mt-55 sm:mt-15 xl:mt-15 2xl:mt-0">
                  Превращаем сложные технологии в понятный визуал
                </h1>
                <div className="text-white/60 font-inter text-[30px] leading-[100%] h-[240px] font-light flex-none mt-40 xl:mt-25 2xl:mt-0">
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

      {/* Main Content */}
      <div className="w-full lg:w-1/2 ml-auto mt-5 sm:mt-0">
        <div className="flex flex-col p-6 sm:p-12 lg:p-24 lg:py-[85px] gap-16 lg:gap-[64px]">
          <div className="flex flex-col gap-8">
            <p className="text-white font-geometria text-lg lg:text-[30px]">дизайн-бюро NIKstudio</p>
            
            <div className="flex flex-col gap-4 lg:gap-8 lg:-mt-[10px]">
              <h2 className="text-white font-geometria font-bold xl:text-[60px] 2xl:text-[80px] leading-[110%] w-full sm:w-[500px] 2xl:w-[768px] w-full-3xl h-[352px] uppercase flex-none self-stretch">
                комплексные решения, мощный визуал
              </h2>
              
              <div className="text-white/60 font-inter text-[22px] leading-[170%] w-full lg:w-[400px] xl:w-[500px] 2xl:w-[768px] w-full-3xl font-normal flex-none self-stretch -mt-[300px] sm:-mt-[10px]">
                <p>
                  Мы помогаем технологичным и производственным компаниям выглядеть ярко и понятно. Создаём дизайн, который работает — от логотипа до выставочного стенда, от презентации до 3D-видео.
                </p>
                <p className="mt-[35px]">
                  Уникальный сервис «под ключ» для демонстрации вашей компании в цифровом пространстве, позволяющий избежать разрозненности работы с множеством подрядчиков. Единый, отлаженный механизм реализации ваших проектов.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-white font-geometria text-lg lg:text-[30px] mt-[20px]">Работали с компаниями -</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
              <div className="bg-[#0E1011] rounded-lg flex items-center justify-center h-[72px]">
                <Image 
                  src="/images/home/ikar-logo.svg" 
                  alt="IKAR" 
                  width={147.32} 
                  height={40.41} 
                  className="object-contain"
                />
              </div>
              <div className="bg-[#0E1011] rounded-lg flex items-center justify-center h-[72px]">
                <Image 
                  src="/images/home/technopolis-logo.svg" 
                  alt="Technopolis" 
                  width={256} 
                  height={71.54} 
                  className="object-contain"
                />
              </div>

              <div className="bg-[#0E1011] rounded-lg flex items-center justify-center h-[72px]">
                <Image 
                  src="/images/home/almaz-logo.svg" 
                  alt="Almaz Antey" 
                  width={169.6} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <div className="bg-[#0E1011] rounded-lg flex items-center justify-center h-[72px]">
                <Image 
                  src="/images/home/aviaspecmash-logo.svg" 
                  alt="Aviaspecmash" 
                  width={229.34} 
                  height={30.79} 
                  className="object-contain"
                />
              </div>

              <div className="bg-[#0E1011] rounded-lg flex items-center justify-center h-[72px]">
                <Image 
                  src="/images/home/style_eko.svg" 
                  alt="StyleEko" 
                  width={215.37} 
                  height={46.45} 
                  className="object-contain"
                />
              </div>
              
              <div className="bg-[#0E1011] rounded-lg flex items-center justify-center h-[72px]">
                <Image 
                  src="/images/home/garden_foresta.svg" 
                  alt="GardenForesta" 
                  width={179} 
                  height={58.01} 
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section className="w-full bg-[#181A1B] pt-10 sm:pt-24 flex flex-col mt-[25px]">
        <div className="px-6 sm:px-12 lg:px-24 flex flex-col gap-24">
          {/* Header */}
          <div className="flex flex-col gap-24">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-white/60 font-cabin font-medium text-xl sm:text-2xl lg:text-[32px]sm:w-[288px] h-[32px]">
                проекты под ключ
              </h3>
              <span className="text-white/60 font-cabin font-medium text-xl sm:text-2xl lg:text-[32px]">(01)</span>
            </div>
            
            <div className="flex flex-col gap-4 -mt-[15px]">
              <h2 className="text-white font-geometria font-bold text-5xl sm:text-6xl xl:text-[200px] 2xl:text-[280px] uppercase leading-none">
                проекты
              </h2>
              
              <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[80px] leading-tight max-w-[1450px] max-w-full-3xl -mt-[15px]">
                Мы берём на себя составление всех технических заданий. Все части проекта в едином ключе
              </p>
            </div>
          </div>
          
          {/* Project Categories */}
          <ProjectCategories />
        </div>
        
        {/* Project Items */}
        <div className="flex flex-col gap-12 mt-12">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col">
              <div className="relative w-full aspect-square">
                <Image 
                  src="/images/home/project-1.jpg" 
                  alt="Project IKAR" 
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center scale-75 sm:scale-100">
                  <Image 
                    src="/images/home/ikar-logo.svg" 
                    alt="IKAR Logo" 
                    width={329} 
                    height={90} 
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center py-8 px-6 sm:px-8 lg:px-12">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-tight">
                  Группа компаний «ИКАР»
                </h3>
                <span className="text-white/60 font-cabin font-medium text-base sm:text-lg lg:text-[32px]">(2024)</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="relative w-full aspect-square">
                <Image 
                  src="/images/home/project-2.jpg" 
                  alt="Project Aviaspecmash" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center scale-75 sm:scale-100">
                  <Image 
                    src="/images/home/aviaspecmash-logo.svg" 
                    alt="Aviaspecmash Logo" 
                    width={595} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center py-8 px-6 sm:px-8 lg:px-12">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-tight">
                  НПП «Авиаспецмаш»
                </h3>
                <span className="text-white/60 font-cabin font-medium text-base sm:text-lg lg:text-[32px]">(2024)</span>
              </div>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 -mt-[30px]">
            <div className="flex flex-col">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image 
                  src="/images/home/project-3.jpg" 
                  alt="Project Technopolis" 
                  fill
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center scale-75 sm:scale-100">
                  <Image 
                    src="/images/home/technopolis-logo.svg" 
                    alt="Technopolis Logo" 
                    width={433} 
                    height={121} 
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center py-8 px-6 sm:px-8 lg:px-12">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-tight">
                  ОЭЗ «Технополис Москва»
                </h3>
                <span className="text-white/60 font-cabin font-medium text-base sm:text-lg lg:text-[32px]">(2024)</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="relative w-full aspect-square">
                <Image 
                  src="/images/home/project-4.jpg" 
                  alt="Project Almaz Antey" 
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center scale-75 sm:scale-100">
                  <Image 
                    src="/images/home/almaz-logo.svg" 
                    alt="Almaz Antey Logo" 
                    width={335} 
                    height={122} 
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center py-8 px-6 sm:px-8 lg:px-12">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-tight">
                  Алмаз Антей «Монитор СОФТ»
                </h3>
                <span className="text-white/60 font-cabin font-medium text-base sm:text-lg lg:text-[32px]">(2024)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Link Section */}
      <section className="py-20 md:py-[76px] px-6 sm:px-12 lg:px-24 flex justify-center md:justify-start mt-3">
        <Link 
          href="/projects"
          className="flex items-center justify-center w-[192px] h-[54px] text-center text-white border-2 border-white rounded-full font-inter font-semibold text-xl md:text-[22px] hover:bg-white hover:text-[#0E1011] transition-colors duration-300"
        >
          все проекты
        </Link>
      </section>
      
      {/* Services Section */}
      <section className="w-full bg-[#0E1011] flex flex-col mt-3">
        <div className="px-6 sm:px-12 lg:px-24 py-24 flex flex-col gap-24">
          {/* Header */}
          <div className="flex flex-col gap-24">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-white/60 font-cabin font-medium text-xl sm:text-2xl lg:text-[32px]">услуги</h3>
              <span className="text-white/60 font-cabin font-medium text-xl sm:text-2xl lg:text-[32px]">(02)</span>
            </div>
            
            <div className="flex flex-col gap-4 -mt-3">
              <h2 className="text-white font-geometria font-bold text-5xl sm:text-6xl lg:text-[200px] xl:text-[280px] uppercase leading-none">
                медиа
              </h2>
              
              <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[80px] leading-[120%] tracking-[-2px] max-w-[1400px] max-w-full-3xl">
                Создаём проекты комплексно и выполняем отдельные задачи
              </p>
            </div>
          </div>
        </div>
        
        {/* Service Cards */}
        <div className="flex flex-col">
          {/* Card 1 */}
          <div className="flex flex-col lg:flex-row">            
            <div className="w-full lg:w-3/5 px-6 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-geometria font-bold text-3xl sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none -mt-30 sm:mt-0">
                    решения для выставок
                  </h3>
                  <p className="w-full lg:w-[600px] 2xl:w-[800px] w-full-3xl h-[168px] font-inter text-[40px] leading-[140%] tracking-[-1px] text-white font-semibold flex-none order-1">
                    Комплексный подход к дизайну и визуализации вашего присутствия на выставке.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8 mt-55 sm:mt-20 md:mt-11">
                  <h3 className="w-full lg:w-[500px] xl:w-[600px] 2xl:w-[691px] h-8 font-cabin text-[28px] sm:text-[32px] leading-[100%] text-white/60 font-normal flex-none order-0">
                    Из производственников — в звёзды отрасли
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24 mt-15 sm:mt-10 md:mt-0">
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Концепция</p>
                      <p>Пространство</p>
                    </div>
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Мультимедиа</p>
                      <p>Сопровождение</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-2/5 h-[400px] lg:h-[1080px]">
              <Image 
                src="/images/home/service-1.jpg" 
                alt="Exhibition Solutions" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-2/5 h-[400px] lg:h-[1080px]">
              <Image 
                src="/images/home/service-2.jpg" 
                alt="Branding and Strategy" 
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full lg:w-3/5 px-6 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24 bg-[#181A1B]">
              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-geometria font-bold text-3xl sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none">
                    стратегия
                    <br />брендинг
                  </h3>
                  <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%]">
                    Разработка индивидуальной маркетинговой стратегии визуализации с учётом специфики вашей отрасли.                    
                    Создание целостного визуального месседжа, дизайн-концепции, фирменного стиля, логотипа и брендинга.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="text-white/60 font-cabin text-base sm:text-xl lg:text-[32px] leading-tight">
                    Выделяющийся из массы, стильный, технологичный
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Концепция брендинга</p>
                      <p>Логотип</p>
                    </div>
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
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
            <div className="w-full lg:w-3/5 px-6 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-geometria font-bold text-3xl sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none">
                    ДИЗАЙН
                    <br />полиграфии
                  </h3>
                  <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%] max-w-[800px] max-w-full-3xl">
                    Стильный и понятный дизайн, отражающий суть продукта, созданный точно под целевого клиента. Изготовление в точной цветопередачей.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8 mt-14">
                  <p className="text-white/60 font-cabin text-base sm:text-xl lg:text-[32px] leading-tight">
                    Создание полиграфических материалов под ключ
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Презентации</p>
                      <p>Буклеты</p>
                    </div>
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Корпоративные журналы</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-2/5 h-[400px] lg:h-[1080px]">
              <Image 
                src="/images/home/service-3.jpg" 
                alt="Print Design" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-2/5 h-[400px] lg:h-[1080px]">
              <Image 
                src="/images/home/service-4.jpg" 
                alt="Photography" 
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full lg:w-3/5 px-6 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24 bg-[#181A1B]">
              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-geometria font-bold text-3xl sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none">
                    Фото
                  </h3>
                  <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%] max-w-[800px] max-w-full-3xl">
                    Профессиональное фото продукта и процесса производства
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="text-white/60 font-cabin text-base sm:text-xl lg:text-[32px] leading-tight">
                    Опыт более 15 лет
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Фото продукта</p>
                      <p>Портреты команды</p>
                    </div>
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
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
            <div className="w-full lg:w-3/5 px-6 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-geometria font-bold text-3xl sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none">
                    3d графика
                  </h3>
                  <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%] max-w-[800px] max-w-full-3xl">
                    Создание промышленного 3д-дизайна, анимация графики
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="text-white/60 font-cabin text-base sm:text-xl lg:text-[32px] leading-tight">
                    TDM/ERP/CAD
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Доработка моделей</p>
                      <p>Текстурирование</p>
                    </div>
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Анимация 3д</p>
                      <p>Создание рендеров</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-2/5 h-[400px] lg:h-[1080px]">
              <Image 
                src="/images/home/service-5.jpg" 
                alt="3D Graphics" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Card 6 */}
          <div className="flex flex-col lg:flex-row">            
            <div className="relative w-full lg:w-2/5 h-[400px] lg:h-[1080px]">
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
                  <h3 className="text-white font-geometria font-bold text-3xl sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none">
                    web-Сайты
                  </h3>
                  <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%] max-w-[800px] max-w-full-3xl">
                    Эксклюзивные продуманные web-сайты, созданные на основе уникального контента: брендинг, фото, видео, 3д графика - всё в едином ключе.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="text-white/60 font-cabin text-base sm:text-xl lg:text-[32px] leading-tight">
                    Российские CMS
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Мобильная версия</p>
                      <p>Тестирование удобства</p>
                    </div>
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
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
            <div className="w-full lg:w-3/5 px-6 sm:px-12 lg:px-32 py-16 lg:py-32 flex flex-col justify-between gap-12 lg:gap-24">
              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-geometria font-bold text-3xl sm:text-4xl xl:text-[80px] 2xl:text-[128px] uppercase leading-none">
                    видео
                    <br />продакшн
                  </h3>
                  <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%] max-w-[800px] max-w-full-3xl">
                    Большой опыт позволяет самим создавать сценарий и понятно демонстрировать преимущества вашей компании.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <p className="text-white/60 font-cabin text-base sm:text-xl lg:text-[32px] leading-tight">
                    Профессиональная съёмка роликов
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-24">
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Составим сценарий</p>
                      <p>Продумаем детали</p>
                    </div>
                    <div className="text-white font-inter font-semibold text-lg sm:text-xl lg:text-[32px] leading-tight">
                      <p>Создадим стильный</p>
                      <p>информативный ролик</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-2/5 h-[400px] lg:h-[1080px]">
              <Image 
                src="/images/home/service-7.jpg" 
                alt="Video Production" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full bg-[#0E1011] mt-29">
        {/* Header with padding */}
        <div className="px-6 sm:px-12 lg:px-24 mb-24">
          <div className="flex flex-col gap-24">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-white/60 font-cabin font-medium text-xl sm:text-2xl lg:text-[32px]">Информация</h3>
              <span className="text-white/60 font-cabin font-medium text-xl sm:text-2xl lg:text-[32px]">(03)</span>
            </div>
            
            <div className="flex flex-col gap-4 -mt-4">
              <h2 className="text-white font-geometria font-bold text-5xl sm:text-6xl xl:text-[200px] 2xl:text-[240px] uppercase leading-none">
                говорят о нас
              </h2>
              
              <p className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[80px] leading-tight tracking-[-2px] max-w-[1400px] max-w-full-3xl">
                Команда NIKstudio закрывает целый ряд задач с энтузиазмом и полной ответственностью
              </p>
            </div>
          </div>
        </div>
        
        {/* Testimonial Cards - Full width */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-[#181A1B] p-12 md:p-4 2xl:p-20 flex flex-col justify-between flex-1 h-[600px] sm:h-[500px] md:h-[600px] lg:h-[696px]">
            <div className="relative w-[48px] h-[30px]">
              <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z" fill="white"/>
              </svg>
            </div>
            
            <div className="flex flex-col justify-between flex-1 mt-[95px]">
              <div className="flex flex-col gap-4 lg:gap-8">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%]">
                  Exceptional Branding That Elevated Our Identity.
                </h3>
                <p className="text-white/60 font-inter text-base lg:text-xl leading-[180%] -mt-[17px]">
                  Their strategic approach completely transformed our brand. We&apos;ve seen a huge increase in recognition and client engagement.
                </p>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative w-16 h-16 lg:w-[70px] lg:h-[70px] rounded-full bg-[#CCCCCC] overflow-hidden">
                  <Image 
                    src="/images/home/testimonial-1.jpg" 
                    alt="Testimonial" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-inter font-semibold text-[12px] lg:text-[20px] xl:text-[26px]">Трофимов Сергей</h4>
                  <p className="text-white/60 font-cabin text-[12px] lg:text-xl">«Монитор СОФТ»</p>
                </div>
              </div>
            </div>
          </div>          
          {/* Card 2 */}
          <div className="bg-[#1F2122] p-12 md:p-4 2xl:p-20 flex flex-col justify-between flex-1 h-[600px] sm:h-[500px] md:h-[600px] lg:h-[696px]">
            <div className="relative w-[48px] h-[30px]">
              <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z" fill="white"/>
              </svg>
            </div>
            
            <div className="flex flex-col justify-between flex-1 mt-[95px]">
              <div className="flex flex-col gap-4 lg:gap-8">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%]">
                  По итогам выставки был заключен контракт
                </h3>
                <p className="text-white/60 font-inter text-base lg:text-xl leading-[180%] -mt-[17px]">
                  The website they created is stunning, user-friendly, and has boosted our online conversions significantly. Highly recommend!
                </p>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative w-16 h-16 lg:w-[70px] lg:h-[70px] rounded-full bg-[#CCCCCC] overflow-hidden">
                  <Image 
                    src="/images/home/testimonial-3.jpg" 
                    alt="Testimonial" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-inter font-semibold text-[12px] lg:text-[20px] xl:text-[26px]">Юлия Данилова</h4>
                  <p className="text-white/60 font-cabin text-[12px] lg:text-xl">Группа компаний «ИКАР»</p>
                </div>
              </div>
            </div>
          </div> 
          {/* Card 3 */}
          <div className="bg-[#181A1B] p-12 md:p-4 2xl:p-20 flex flex-col justify-between flex-1 h-[600px] sm:h-[500px] md:h-[600px] lg:h-[696px]">
            <div className="relative w-[48px] h-[30px]">
              <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z" fill="white"/>
              </svg>
            </div>
            
            <div className="flex flex-col justify-between flex-1 mt-[95px]">
              <div className="flex flex-col gap-4 lg:gap-8">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%]">
                  Creative Solutions That Drove Real Results for Our Website.
                </h3>
                <p className="text-white/60 font-inter text-base lg:text-xl leading-[180%] -mt-[17px]">
                  Their designs are not only beautiful but effective. Our sales increased by 30% post-launch. Incredible experience!
                </p>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative w-16 h-16 lg:w-[70px] lg:h-[70px] rounded-full bg-[#CCCCCC] overflow-hidden">
                  <Image 
                    src="/images/home/testimonial-5.jpg" 
                    alt="Testimonial" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-inter font-semibold text-[12px] lg:text-[20px] xl:text-[26px]">Колушов Михаил</h4>
                  <p className="text-white/60 font-cabin text-[12px] lg:text-xl">АО «НПП Авиаспецмаш»</p>
                </div>
              </div>
            </div>
          </div> 
          {/* Card 4 */}
          <div className="bg-[#1F2122] p-12 md:p-4 2xl:p-20 flex flex-col justify-between flex-1 h-[600px] sm:h-[500px] md:h-[600px] lg:h-[696px]">
            <div className="relative w-[48px] h-[30px]">
              <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z" fill="white"/>
              </svg>
            </div>
            
            <div className="flex flex-col justify-between flex-1 mt-[95px]">
              <div className="flex flex-col gap-4 lg:gap-8">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%]">
                  Seamless Collaboration & Support With Exceptional Results.
                </h3>
                <p className="text-white/60 font-inter text-base lg:text-xl leading-[180%] -mt-[17px]">
                  Working with them was easy and efficient. They perfectly captured our vision, and the results were outstanding.
                </p>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative w-16 h-16 lg:w-[70px] lg:h-[70px] rounded-full bg-[#CCCCCC] overflow-hidden">
                  <Image 
                    src="/images/home/testimonial-2.jpg" 
                    alt="Testimonial" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-inter font-semibold text-[12px] lg:text-[20px] xl:text-[26px]">Александра Райкова</h4>
                  <p className="text-white/60 font-cabin text-[12px] lg:text-xl">GARDEN Foresta</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="bg-[#181A1B] p-12 md:p-4 2xl:p-20 flex flex-col justify-between flex-1 h-[600px] sm:h-[500px] md:h-[600px] lg:h-[696px]">
            <div className="relative w-[48px] h-[30px]">
              <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z" fill="white"/>
              </svg>
            </div>
            
            <div className="flex flex-col justify-between flex-1 mt-[95px]">
              <div className="flex flex-col gap-4 lg:gap-8">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%]">
                  Запустили интернет магазин для розничной продукции
                </h3>
                <p className="text-white/60 font-inter text-base lg:text-xl leading-[180%] -mt-[17px]">
                  Our new branding resonated with our audience immediately. We&apos;ve received so many compliments and new business inquiries.
                </p>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative w-16 h-16 lg:w-[70px] lg:h-[70px] rounded-full bg-[#CCCCCC] overflow-hidden">
                  <Image 
                    src="/images/home/testimonial-4.jpg" 
                    alt="Testimonial" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-inter font-semibold text-[12px] lg:text-[20px] xl:text-[26px]">Егорова Марина</h4>
                  <p className="text-white/60 font-cabin text-[12px] lg:text-xl">«ЕГОРОВ мясо»</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-[#1F2122] p-12 md:p-4 2xl:p-20 flex flex-col justify-between flex-1 h-[600px] sm:h-[500px] md:h-[600px] lg:h-[696px]">
            <div className="relative w-[48px] h-[30px]">
              <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z" fill="white"/>
              </svg>
            </div>
            
            <div className="flex flex-col justify-between flex-1 mt-[95px]">
              <div className="flex flex-col gap-4 lg:gap-8">
                <h3 className="text-white font-inter font-semibold text-xl sm:text-2xl lg:text-[40px] leading-[140%]">
                  UX Design That Transformed Our User Experience.
                </h3>
                <p className="text-white/60 font-inter text-base lg:text-xl leading-[180%] -mt-[17px]">
                  Their UX design made our platform more intuitive and enjoyable to use. Customer satisfaction has dramatically improved.
                </p>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative w-16 h-16 lg:w-[70px] lg:h-[70px] rounded-full bg-[#CCCCCC] overflow-hidden">
                  <Image 
                    src="/images/home/testimonial-6.jpg" 
                    alt="Testimonial" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-white font-inter font-semibold text-[12px] lg:text-[20px] xl:text-[26px]">Дмитрий Страшкевич</h4>
                  <p className="text-white/60 font-cabin text-[12px] lg:text-xl">«Эко Стиль»</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
