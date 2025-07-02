import Link from 'next/link';

interface ProjectCategoriesProps {
  className?: string;
}

const ProjectCategories: React.FC<ProjectCategoriesProps> = ({ className }) => {
  return (
    <section className={`w-full px-5 sm:px-12 lg:px-24 flex justify-center items-cente -mt-[26px] sm:mt-10 ${className}`}>
      <div className="text-white text-[20px] sm:text-xl lg:text-[32px] font-light sm:font-normal font-geometria sm:font-inter leading-[100%] sm:leading-none flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-10">
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
        {/* <Link href="/projects/websites" className="hover:text-[#DE063A] transition-colors duration-300">
          Сайты
        </Link> */}
      </div>
    </section>
  );
};

export default ProjectCategories;