import Link from "next/link";
import Image from "next/image";
import BackToTopLink from "./BackToTopLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

export default function FooterMobile() {
  return (
    <footer className="bg-white w-full block sm:hidden pb-[60px]">
      <div className="flex flex-col justify-between gap-20 lg:gap-40 px-21 lg:px-24 pt-12 lg:pt-24 pb-8 lg:pb-16 w-full">
        {/* Logo and Navigation */}
        <div className="flex flex-col items-center justify-stretch gap-16 lg:gap-32 w-full">
          {/* Logo */}
          <div className="relative">
            <div className="mt-10 lg:mt-[79px]">
              <Link href="/">
                <Image
                  src="/images/footer/logo_footer.svg"
                  alt="NIK Studio Logo"
                  className="w-full max-w-[125.75px] h-auto"
                  width={125.75}
                  height={51.69}
                />
              </Link>
            </div>
          </div>

          {/* Navigation Lists */}
          <div className="flex flex-col gap-12 lg:gap-24 w-full -mt-8 sm:mt-24 lg:mt-[203px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-24 2xl:gap-26 w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pages">
                  <AccordionTrigger className="flex items-center justify-between w-full">
                    <h3 className="text-[#0E1011]/60 text-xl lg:text-[30px] font-geometria font-normal leading-[100%] flex-shrink-0">
                      Страницы
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <nav className="flex flex-col gap-2 lg:gap-4">
                      <Link href="/" className="text-[#0E1011] hover:text-[#DE063A] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Студия</Link>
                      <Link href="/about" className="text-[#0E1011] hover:text-[#DE063A] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">О нас</Link>
                      <Link href="/blog" className="text-[#0E1011] hover:text-[#DE063A] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Блог</Link>
                      <Link href="/contact" className="text-[#0E1011] hover:text-[#DE063A] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Связаться</Link>
                    </nav>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="projects">
                  <AccordionTrigger className="flex items-center justify-between w-full">
                    <h3 className="text-[#0E1011]/60 text-xl lg:text-[30px] font-geometria font-normal leading-[100%] w-full lg:w-[360px] lg:h-[30px] self-stretch flex-grow-0">
                      Проекты
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <nav className="flex flex-col gap-2 lg:gap-4">
                      <Link href="/projects" className="text-[#0E1011] hover:text-[#DE063A] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Проекты под ключ</Link>
                      <Link href="#" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Брендинг</Link>
                      <Link href="/blog" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Дизайн</Link>
                      <Link href="#" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">3д графика</Link>
                    </nav>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="media">
                  <AccordionTrigger className="flex items-center justify-between w-full">
                    <h3 className="text-[#0E1011]/60 text-xl lg:text-[30px] font-geometria font-normal leading-[100%] w-full lg:w-[360px] lg:h-[30px] self-stretch flex-grow-0">
                      Фото
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <nav className="flex flex-col gap-2 lg:gap-4">
                      <Link href="#" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Видео</Link>
                      <Link href="#" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Сайты</Link>
                    </nav>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="social">
                  <AccordionTrigger className="flex items-center justify-between w-full">
                    <h3 className="text-[#0E1011]/60 text-xl lg:text-[30px] font-geometria font-normal leading-[100%] w-full lg:w-[360px] lg:h-[30px] self-stretch flex-grow-0">
                      Социальные сети
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <nav className="flex flex-col gap-2 lg:gap-4">
                      <Link href="#" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Instagram</Link>
                      <Link href="#" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Вконтакте</Link>
                      <Link href="#" className="text-[#0E1011] hover:text-[#DE063А] text-xl lg:text-[26px] font-inter font-semibold leading-[130%] w-full lg:w-[360px] lg:h-[34px] self-stretch flex-grow-0 transition-colors duration-300">Телеграмм</Link>
                    </nav>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col sm:flex-row justify-between w-full -mt-15 sm:-mt-8 lg:-mt-[67px] gap-8 sm:gap-0">          
          <BackToTopLink />
        </div>
      </div>
    </footer>
  );
} 