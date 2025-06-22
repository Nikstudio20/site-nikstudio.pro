// components/CarouselWithLightbox.tsx
'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from 'react'

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
}

export default function CarouselWithLightbox({ images }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleOpen = (src: string) => {
    setSelectedImage(src)
    setIsOpen(true)
  }

  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination]}
        className="w-full custom-swiper"
      >
        {images.map((slide) => (
          <SwiperSlide key={slide.id}>
            {slide.type === 'double' ? (
              <div className="flex flex-col sm:flex-row gap-6">
                {slide.items.map((media: MediaItem) => (
                  <div
                    key={media.src}
                    className="w-full h-[300px] lg:h-[500px] 2xl:h-[946px] relative cursor-zoom-in"
                    onClick={() =>
                      media.type === 'image' && handleOpen(media.src)
                    }
                  >
                    {media.type === 'image' ? (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        className="object-cover rounded-xl"
                      />
                    ) : (
                      <video
                        src={media.src}
                        poster={media.poster}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
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
                className="w-full h-[300px] sm:h-[500px] lg:h-[1080px] relative cursor-zoom-in"
                onClick={() =>
                  slide.items[0].type === 'image' &&
                  handleOpen(slide.items[0].src)
                }
              >
                {slide.items[0].type === 'image' ? (
                  <Image
                    src={slide.items[0].src}
                    alt={slide.items[0].alt}
                    fill
                    className="object-cover rounded-xl"
                  />
                ) : (
                  <video
                    src={slide.items[0].src}
                    poster={slide.items[0].poster}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
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

      {/* Lightbox — только для изображений */}
      {isOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-[90%] h-[90%]">
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
