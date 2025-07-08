// components/CarouselWithLightbox.tsx
'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useState, useRef, useEffect } from 'react'

type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt: string
  poster?: string
}

type Slide = {
  id: number
  type: 'single' | 'double'
  items: ReadonlyArray<MediaItem>
}

type Props = {
  images: readonly Slide[]
  className?: string
}

export default function CarouselWithLightbox({ images, className = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const swiperRef = useRef<SwiperType | null>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const handleOpen = (src: string) => {
    setSelectedImage(src)
    setIsOpen(true)
  }

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiperInstance = swiperRef.current;
      if (swiperInstance.params && swiperInstance.params.navigation && typeof swiperInstance.params.navigation !== 'boolean') {
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }
    }
  }, []);

  const handleDotClick = (index: number) => {
    if (swiperRef.current && index !== currentIndex) {
      swiperRef.current.slideTo(index)
    }
  }

  return (
    <>
      <div className={`relative ${className}`}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          spaceBetween={30}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation]}
          className="w-full custom-swiper"
          pagination={false}
        >
          {images.map((slide) => (
            <SwiperSlide key={slide.id}>
              {slide.type === 'double' ? (
                <div className="flex flex-row gap-[10px] sm:gap-6">
                  {slide.items.map((media: MediaItem) => (
                    <div
                      key={media.src}
                      className="w-full h-[200px] sm:h-[500px] lg:h-[1080px] relative cursor-zoom-in"
                      onClick={() => media.type === 'image' && handleOpen(media.src)}
                    >
                      {media.type === 'image' ? (
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <video
                          src={media.src}
                          poster={media.poster}
                          className="absolute inset-0 w-full h-full object-cover"
                          controls
                          controlsList="nodownload"
                          preload="metadata"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="w-full h-[200px] sm:h-[500px] lg:h-[1080px] relative cursor-zoom-in"
                  onClick={() => slide.items[0].type === 'image' && handleOpen(slide.items[0].src)}
                >
                  {slide.items[0].type === 'image' ? (
                    <Image
                      src={slide.items[0].src}
                      alt={slide.items[0].alt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={slide.items[0].src}
                      poster={slide.items[0].poster}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      controlsList="nodownload"
                      preload="metadata"
                    />
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 group opacity-50 sm:opacity-100"
          aria-label="Previous slide"
        >
          <Image
            src="/images/media/arrow_left.svg"
            alt="Previous"
            width={21}
            height={21}
            className="[filter:invert(1)] group-hover:[filter:invert(0)]"
          />
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer w-[60px] h-[60px] flex items-center justify-center bg-[#0E1011] hover:bg-white transition-colors duration-300 group opacity-50 sm:opacity-100"
          aria-label="Next slide"
        >
          <Image
            src="/images/media/arrow_right.svg"
            alt="Next"
            width={21}
            height={21}
            className="[filter:invert(1)] group-hover:[filter:invert(0)]"
          />
        </button>

        {/* Кастомные точки навигации */}
        <div
          className="absolute bottom-[10px] sm:bottom-[20px] left-1/2 -translate-x-1/2 flex gap-10 z-20"
          role="tablist"
          aria-label="Навигация по слайдам"
        >
          {images.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all cursor-pointer duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                index === currentIndex
                  ? 'w-4 sm:w-5 h-4 sm:h-5 bg-[#0e1011]'
                  : 'w-3 sm:w-4 h-3 sm:h-4 bg-[#5e6265] hover:bg-[#5e6265] flex flex-row items-center'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Слайд ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>

      {/* Lightbox — только для изображений */}
      {isOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-[90%] max-w-[80vh] aspect-[4/3]">
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}