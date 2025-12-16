'use client'
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from './Button'
import { ArrowLeft, ArrowRight } from './SVGS'

import './stylesCarouselBlog.css'
import { Home, Media, Post } from '@/payload-types'
import { Locale } from '@/utilities/locale'
import { RichText } from './Richtext'
import { formatDate } from '@/utilities/FormatDate'

interface iCarouselBlog {
  home: Home | null
  data: Post[] | null
  lang: Locale
}

export function CarouselBlog({ home, data, lang }: iCarouselBlog) {
  const [emblaRef, emblaApi] = useEmblaCarousel({})

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="w-screen flex items-start flex-wrap gap-[100px] mt-[389px] pl-[50px] h-[900px] max-[1512px]:gap-[50px] max-[1512px]:pl-[28px] max-[1280px]:justify-between max-[768px]:justify-center max-[768px]:px-2 max-[768px]:h-[1600px] max-[768px]:gap-5 max-[768px]:mt-0 max-[1024px]:pl-8 max-[1024px]:gap-[60px] max-[640px]:px-0 max-[640px]:h-auto max-[640px]:pb-16">
      <div className="flex flex-col max-w-[472px] pl-10 max-[768px]:pl-0 max-[768px]:items-center max-[768px]:text-center">
        <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
          {home?.secaoBlog?.titulo}
        </span>
        <span className="font-grotesk text-[60px] leading-[60px] uppercase max-[640px]:text-4xl">
          Histórias <br />e <strong className="font-bold text-[#E97230]">sabores</strong>
        </span>
        <RichText
          data={home?.secaoBlog?.descricao!}
          className="tex-[#1E1E1E] font-grotesk text-lg mt-[60px] max-w-[384px]"
        />
        <Link href={`/${lang}/blog`}>
          <Button className="mt-[60px] w-[200px] h-[60px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
            Conheça mais
          </Button>
        </Link>

        <div className="flex items-center gap-0 mt-[120px]">
          <ArrowLeft onClick={() => scrollPrev()} className="cursor-pointer" />
          <ArrowRight onClick={() => scrollNext()} className="cursor-pointer" />
        </div>
      </div>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {data?.map((blog, idx) => {
              const image = blog.thumb as Media
              return (
                <div className="embla__slide" key={idx}>
                  <div className="min-h-[600px] flex flex-col px-[50px] pb-[60px] pt-[180px] relative bg-[#D9D9D9]">
                    <div className="absolute -top-[180px] left-0 w-11/12 h-[320px] max-[768px]:w-[350px] max-[640px]:w-[280px]">
                      <Image src={image.url!} fill alt="" className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-4">
                      <span className="text-[#1E1E1E] font-grotesk text-base">
                        {formatDate(blog.updatedAt)}
                      </span>
                      <span className="text-[#1E1E1E] font-grotesk text-[25px] font-bold max-w-[280px]">
                        {blog.chamada}
                      </span>
                      <p className="text-[#1E1E1E] font-grotesk text-lg max-w-[354px] max-[640px]:max-w-[280px]">
                        {blog.descricao}
                      </p>
                      <Link href={`/${lang}/blog/${blog.slug}`}>
                        <Button className="w-[147px] h-[35px] rounded-lg border border-black text-black font-grotesk text-lg transition-all hover:bg-black hover:text-white">
                          Leia mais
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
