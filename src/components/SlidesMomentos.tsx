'use client'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { Swiper, SwiperSlide } from '../components/Swiper'
import { ArrowLeftMoment, ArrowRightMoment } from './SVGS'
import { Media } from '@/payload-types'

export function SlidesMomentos({ data }: any) {
  return (
    <div className="w-screen bg-[#E97230] h-[500px] mt-[254px] pl-[234px] relative max-[768px]:h-[1000px] max-[768px]:pl-8 max-[768px]:pr-8 max-[768px]:mt-[254px]">
      <div className="flex items-center justify-end gap-14 absolute -top-[135px] right-0 max-[768px]:flex-col max-[768px]:justify-center max-[768px]:items-center max-[768px]:static max-[768px]:text-center max-[768px]:top-0">
        <div className="flex flex-col mt-32 max-[768px]:items-center max-[768px]:mt-8">
          <span className="text-white font-bold font-grotesk leading-7">{data.titulo}</span>
          <span className="text-6xl font-grotesk text-white max-w-[383px]">{data.chamada}</span>
          <span className="text-xl font-grotesk leading-6 text-white mt-3 max-w-[264px]">
            {data.descricao}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <Swiper
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
            className="w-full max-w-[1246px] min-h-[508px] max-[1512px]:max-w-[900px] max-[1024px]:max-w-[500px] max-[768px]:max-w-[400px]"
            slideActiveClass="active__momento"
            slideClass="slide__momento"
          >
            {data?.slidesMomentos.map((_: any, idx: any) => {
              const image = _.imagem as Media
              if (!data.slidesMomentos.length) {
                return
              }
              return (
                <SwiperSlide key={idx}>
                  <div
                    className={twMerge(
                      'relative h-[310px] max-[1512px]:w-[370px] max-[1512px]:h-[300px] max-[640px]:w-[90%] transition-all',
                      idx === data?.slidesMomentos?.length - 1 && 'h-[508px]',
                    )}
                    id="image_legado"
                  >
                    <Image src={image.url!} fill alt="" className="object-cover" />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          {/* <div className="flex items-center gap-2 max-[768px]:order-1">
            <ArrowLeftMoment id="momento-prev" />
            <ArrowRightMoment id="momento-next" />
          </div> */}
        </div>
      </div>
    </div>
  )
}
