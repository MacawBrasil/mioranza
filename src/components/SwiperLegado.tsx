'use client'

// import Swiper core and required modules
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from './Swiper'
import { Media } from '@/payload-types'
import { A11y, Navigation } from 'swiper/modules'
import { cn } from '@/utilities/utils'

export function SwiperLegado(props: any) {
  return (
    <Swiper
      modules={[A11y, Navigation]}
      breakpoints={{
        0: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
      }}
      navigation={{
        enabled: true,
        prevEl: '#legado-prev',
        nextEl: '#legado-next',
      }}
      className="w-full max-[1280px]:w-[95%] h-fit after:absolute after:bottom-0 after:left-0 after:w-full after:h-[10px] after:bg-[#E97230] "
    >
      {props.data?.map((_: any, idx: any) => {
        const image = _.imagem as Media
        return (
          <SwiperSlide key={idx}>
            <div className="w-full pb-[50px] flex flex-col gap-[50px] overflow-hidden">
              <div
                className="relative w-full h-[400px] max-[1512px]:h-[300px] overflow-hidden"
                id="image_legado"
              >
                <Image src={image.url!} fill alt="" className="object-cover" />
              </div>
              <p
                className={cn(
                  'text-[#E97230] text-xl font-grotesk max-w-[300px] max-[768px]:max-w-[90%]',
                )}
              >
                {_.descricao}
              </p>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
