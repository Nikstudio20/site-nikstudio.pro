import Link from 'next/link';

const ProjectCategories = () => {
  return (
    <section className="w-full px-6 sm:px-12 lg:px-24 flex justify-center items-cente mt-10">
      <div className="text-white text-lg sm:text-xl lg:text-[32px] font-inter leading-none flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-10">
        <Link href="/projects" className="hover:text-[#DE063A] transition-colors duration-300">
          Проекты
        </Link>
        <Link href="/projects/branding" className="hover:text-[#DE063A] transition-colors duration-300">
          Брендинг
        </Link>
        <Link href="/projects/design" className="hover:text-[#DE063A] transition-colors duration-300">
          Дизайн
        </Link>
        <Link href="/projects/3d" className="hover:text-[#DE063A] transition-colors duration-300">
          3д графика
        </Link>
        <Link href="/projects/photo" className="hover:text-[#DE063A] transition-colors duration-300">
          Фото
        </Link>
        <Link href="/projects/video" className="hover:text-[#DE063A] transition-colors duration-300">
          Видео
        </Link>
        <Link href="/projects/websites" className="hover:text-[#DE063A] transition-colors duration-300">
          Сайты
        </Link>
      </div>
    </section>
  );
};

export default ProjectCategories; 