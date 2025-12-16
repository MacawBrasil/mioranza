'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { ArrowLeft, ArrowRight } from './SVGS'
import { RichText } from './Richtext'

export function SlidesOrigem({ data, selo }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({})
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="w-screen flex items-center justify-center mt-[93px] max-[768px]:flex-col max-[768px]:h-fit">
      <div className="relative w-[240px] h-[240px] -mr-32 -mt-56 z-20 max-[768px]:-mr-0 max-[768px]:-mt-0 max-[768px]:z-20 max-[1366px]:w-[180px] max-[1366px]:h-[180px]">
        <Image src={selo.url!} fill alt="" quality={100} className="object-cover z-40" />
      </div>
      <div className="flex flex-col gap-20 w-full max-w-[1313px] px-8">
        <div className="embla__origem inline-block w-full" ref={emblaRef}>
          <div className="embla__container__origem">
            {data.map((origem: any) => (
              <div className="embla__slide__origem flex justify-center gap-10 max-[768px]:flex-col max-[768px]:items-center">
                <span className="font-bold text-[350px] max-w-[470px] break-words leading-[265px] font-rasbern pt-12 text-[#E5E4DF] max-[768px]:text-[60px] max-[768px]:leading-4">
                  {origem.anoOrigem}
                </span>
                <div className="relative w-[464px] h-[585px] -ml-44 max-[768px]:-ml-0 max-[768px]:w-[300px] max-[768px]:h-[400px]">
                  <Image
                    src={origem.imagem.url!}
                    alt=""
                    fill
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-5 max-w-[305px] mt-[116px] max-[768px]:mt-0 max-[768px]:max-w-full">
                  <span className="font-bold text-3xl font-grotesk leading-9 text-[#E97230]">
                    {origem.titulo}
                  </span>
                  <RichText
                    data={origem.descricao!}
                    className="text-[#1E1E1E] text-xl leading-6 font-grotesk"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-between gap-11 relative after:absolute after:top-2 z-10 after:left-0 after:w-full after:bg-[#E97230] after:h-1">
          {scrollSnaps.map((_, index: number) => {
            return (
              <div
                className="flex items-center justify-end flex-col gap-[10px] z-20 h-[60px] cursor-pointer"
                onClick={() => onDotButtonClick(index)}
              >
                <div
                  className={twMerge(
                    'w-6 h-6 bg-[#E97230] rounded-full opacity-100 transition-all',
                    index !== selectedIndex && 'opacity-0',
                  )}
                />
                <span
                  className={twMerge(
                    'text-lg font-grotesk text-[#E97230] transition-all',
                    index !== selectedIndex && 'text-[#CCCCCC]',
                  )}
                >
                  {data[index].anoOrigem}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
