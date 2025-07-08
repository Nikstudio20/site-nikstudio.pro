import Image from "next/image";

export default function MainContentSection() {
  return (
    <div className="w-full lg:w-1/2 ml-auto -mt-25 sm:mt-0">
      <div className="flex flex-col p-5 sm:p-12 lg:p-24 lg:py-[85px] gap-16 lg:gap-[64px]">
        <div className="flex flex-col gap-8">
          <p className="text-white font-geometria text-[20px] sm:text-lg lg:text-[30px]">дизайн-бюро NIKstudio</p>
          
          <div className="flex flex-col gap-4 lg:gap-8 -mt-[16px] sm:mt-0 lg:-mt-[10px]">
            <h2 className="text-white font-geometria font-bold text-[40px] sm:text-[60px] 2xl:text-[80px] leading-[120%] sm:leading-[110%] w-full sm:w-[500px] 2xl:w-[768px] w-full-3xl h-[352px] uppercase flex-none self-stretch">
              комплексные решения, мощный визуал
            </h2>
            
            <div className="text-white/60 font-inter text-[16px] sm:text-[22px] leading-[100%] sm:leading-[170%] w-full lg:w-[400px] xl:w-[500px] 2xl:w-[768px] w-full-3xl font-normal flex-none self-stretch -mt-[155px] sm:-mt-[10px]">
              <p>
                Мы помогаем технологичным и производственным компаниям выглядеть ярко и понятно. Создаём дизайн, который работает — от логотипа до выставочного стенда, от презентации до 3D-видео.
              </p>
              <p className="mt-[17px] sm:mt-[35px]">
                Уникальный сервис «под ключ» для демонстрации вашей компании в цифровом пространстве, позволяющий избежать разрозненности работы с множеством подрядчиков. Единый, отлаженный механизм реализации ваших проектов.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-white font-geometria text-[20px] sm:text-lg lg:text-[30px] -mt-[50px] sm:mt-[20px]">Работали с компаниями -</p>
          
          <div className="-mt-[20px] sm:mt-0 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8 lg:gap-16">
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
  );
}