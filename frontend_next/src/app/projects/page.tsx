import Image from "next/image";
import Header from "@/components/Header";
import Header_mobile from "@/components/Header_mobile";
import Footer from "@/components/Footer";
import FooterMobile from "@/components/Footer_mobile";
import ProjectCategories from '@/components/ProjectCategories';

export default function ProjectsPage() {
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

      {/* Project Categories */}
      <ProjectCategories />

      {/* Project Cards */}
      <section className="w-full flex flex-col gap-6 lg:gap-[24px] 3xl:gap-[32px] mt-[45px] sm:mt-8 lg:mt-7 3xl:mt-10 pb-6 3xl:pb-8">
        {/* ИКАР Project */}
        <div className="w-full h-[390px] sm:h-[540px] lg:h-[1080px] 3xl:h-[1440px] relative mb-[15px] sm:mb-0">
          <Image 
            src="/images/projects/ikar.jpg" 
            alt="ИКАР проект" 
            fill 
            className="object-cover" 
          />
          <div className="absolute bottom-8 sm:bottom-12 lg:bottom-[96px] 3xl:bottom-[120px] left-6 sm:left-12 lg:left-24 3xl:left-[120px]">
            <h2 className="text-[30px] sm:text-[64px] xl:text-[96px] 2xl:text-[192px] 3xl:text-[220px] font-geometria font-bold text-white uppercase leading-none">
              икар
            </h2>
          </div>
        </div>

        {/* АВИАСПЕЦМАШ Project */}
        <div className="w-full h-[390px] sm:h-[540px] lg:h-[1080px] 3xl:h-[1440px] relative mb-[15px] sm:mb-0">
          <div className="absolute inset-0 bg-black/40"></div>
          <Image 
            src="/images/projects/aviaspecmash.jpg" 
            alt="АВИАСПЕЦМАШ проект" 
            fill 
            className="object-cover" 
          />
          <div className="absolute bottom-8 sm:bottom-12 lg:bottom-[96px] 3xl:bottom-[120px] left-6 sm:left-12 lg:left-24 3xl:left-[120px]">
            <h2 className="text-[30px] sm:text-[64px] xl:text-[96px] 2xl:text-[192px] 3xl:text-[220px] font-geometria font-bold text-white uppercase leading-none">
              авиаспецмаш
            </h2>
          </div>
        </div>

        {/* ТЕХНОПОЛИС МОСКВА Project */}
        <div className="w-full h-[390px] sm:h-[540px] lg:h-[1080px] 3xl:h-[1440px] relative mb-[15px] sm:mb-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <Image 
            src="/images/projects/tehnopolis.jpg" 
            alt="ТЕХНОПОЛИС МОСКВА проект" 
            fill 
            className="object-cover" 
          />
          <div className="absolute bottom-8 sm:bottom-12 lg:bottom-28 3xl:bottom-36">
            <h2 className="text-[30px] sm:text-[64px] xl:text-[96px] 2xl:text-[192px] 3xl:text-[220px] font-geometria font-bold text-white uppercase leading-none ml-6 sm:ml-12 lg:ml-24 3xl:ml-[120px]">
              технополис<br />москва
            </h2>
          </div>
        </div>

        {/* МОНИТОР СОФТ Project */}
        <div className="w-full h-[390px] sm:h-[540px] lg:h-[1080px] 3xl:h-[1440px] relative mb-[15px] sm:mb-0">
          <Image 
            src="/images/projects/monitor-soft.jpg" 
            alt="МОНИТОР СОФТ проект" 
            fill 
            className="object-cover" 
          />
          <div className="absolute bottom-8 sm:bottom-12 lg:bottom-[96px] 3xl:bottom-[120px] left-6 sm:left-12 lg:left-24 3xl:left-[120px]">
            <h2 className="text-[30px] sm:text-[64px] xl:text-[96px] 2xl:text-[192px] 3xl:text-[220px] font-geometria font-bold text-white uppercase leading-none">
              монитор софт
            </h2>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <FooterMobile />
    </main>
  );
}
