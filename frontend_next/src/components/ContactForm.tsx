import React from 'react';

type ContactFormProps = {
  className?: string;
};

const ContactForm = ({ className = "" }: ContactFormProps) => {
  return (
    <form className={`flex -mt-7 sm:mt-0 flex-col gap-4 sm:gap-6 lg:gap-8 3xl:gap-12 w-full ${className}`}> 
      <div className="flex flex-col sm:flex-row gap-8 3xl:gap-12 w-full">
        {/* Name Field */}
        <div className="flex flex-col gap-3 3xl:gap-5 flex-1">
          <label className="text-white/60 text-[20px] 3xl:text-[28px] leading-[100%] font-geometria font-normal">
            Имя
          </label>
          <div className="bg-[#181A1B] border-2 border-white/20 px-3 sm:px-5 py-4 3xl:px-8 3xl:py-6">
            <input
              type="text"
              placeholder="Имя"
              className="bg-transparent w-full text-base lg:text-[18px] 3xl:text-[24px] leading-[180%] text-[#595959] placeholder:text-[#595959] outline-none font-inter"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-3 3xl:gap-5 flex-1">
          <label className="text-white/60 text-[20px] 3xl:text-[28px] leading-[100%] font-geometria font-normal">
            Email
          </label>
          <div className="bg-[#181A1B] border-2 border-white/20 px-3 sm:px-5 py-4 3xl:px-8 3xl:py-6">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full text-base lg:text-[18px] 3xl:text-[24px] leading-[180%] text-[#595959] placeholder:text-[#595959] outline-none font-inter"
            />
          </div>
        </div>
      </div>

      {/* Company Field */}
      <div className="w-full mt-4 sm:mt-0">        
        <div className="bg-[#181A1B] border-2 border-white/20 px-3 sm:px-5 py-4 3xl:px-8 3xl:py-6">
          <input
            type="text"
            placeholder="Компания"
            className="bg-transparent w-full text-base lg:text-[18px] 3xl:text-[24px] leading-[180%] text-[#595959] placeholder:text-[#595959] outline-none font-inter"
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="w-full mt-4 sm:mt-0">
        <div className="bg-[#181A1B] border-2 border-white/20 px-3 sm:px-5 py-4 3xl:px-8 3xl:py-6 h-34 sm:h-[140px] 3xl:h-[200px]">
          <textarea
            placeholder="Сообщение"
            className="bg-transparent w-full h-full text-base lg:text-[18px] 3xl:text-[24px] leading-[180%] text-[#595959] placeholder:text-[#595959] outline-none resize-none font-inter"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button className="mt-4 sm:mt-0 flex flex-row justify-center items-center py-7 sm:py-4 px-5 sm:px-[26px] gap-2 w-full h-12 sm:h-[54px] 3xl:h-[70px] 3xl:text-[28px] bg-white text-[#0E1011] text-[22px] font-semibold rounded-full mx-auto font-inter hover:cursor-pointer hover:bg-[#DE063A] hover:text-white transition-colors duration-300">
        Отправить запрос
      </button>
    </form>
  );
};

export default ContactForm;