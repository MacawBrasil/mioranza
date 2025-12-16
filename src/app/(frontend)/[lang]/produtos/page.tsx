import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Locale } from '@/utilities/locale'
import { Media } from '@/payload-types'

import { FilterCategoryContent } from './FilterCategoryContent'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navbar } from '@/components/Navbar'
import { HeaderMobile } from '@/components/HeaderMobile'
import { RichText } from '@/components/Richtext'
import { Footer } from '@/components/Footer'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({
    slug: 'produtos',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const image = page?.Seo?.ImagemCompartilhada as Media
  const title = page?.Seo?.titulo || 'Mioranza - Bem vindo'
  const description = page?.Seo?.descricao || 'Mioranza - Bem vindo'
  const keywords = page?.Seo?.palavrasChave || 'Mioranza - Bem vindo'

  return {
    metadataBase: new URL(url),
    keywords,
    title,
    description,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: image?.url ? [{ url: image?.url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image?.url ? [{ url: image?.url }] : undefined,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const payload = await getPayload({ config })

  const setting = await payload.findGlobal({
    slug: 'settings',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const page = await payload.findGlobal({
    slug: 'produtos',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const categories = await payload.find({
    collection: 'productCategory',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const products = await payload.find({
    collection: 'products',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  return (
    <>
      <div className="w-full h-[531px] relative flex items-end justify-center max-[640px]:min-h-[300px]">
        <Navbar isWhite loja={setting?.loja} lang={lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={lang} />
        <div className="absolute left-0 bottom-0 w-[520px] h-[340px] max-[1512px]:w-[400px] max-[1280px]:w-[350px] max-[1024px]:hidden">
          <Image
            //@ts-ignore
            src={page?.imagem?.url}
            fill
            alt=""
            className="object-cover"
          />
        </div>
        <div className="max-w-[835px] flex flex-col justify-center items-center max-[640px]:px-6 max-[640px]:max-w-full">
          <span className="text-[#CEC4C5] text-[30px] font-rasbern font-bold leading-[28px]">
            {page?.titulo}
          </span>
          <span className="text-[#181818] font-grotesk font-normal text-[60px] uppercase text-center  leading-[60px] mt-[20px] max-[640px]:translate-x-0 max-[640px]:text-4xl">
            O{' '}
            <strong className="text-[#E97230] font-bold">
              Melhor do <br />
              Nosso Terroir
            </strong>
            <br /> em Cada Gole
          </span>
          <RichText
            data={page?.descricao!}
            className="text-[#1E1E1E] font-grotesk text-lg text-center max-w-[418px] mt-[27px]"
          />
        </div>
      </div>
      <FilterCategoryContent categories={categories.docs} products={products.docs} locale={lang} />
      <div className="relative w-full max-w-[1638px] h-[666px] flex items-center justify-center text-center m-auto mt-[283px]">
        <Image
          //@ts-ignore
          src={page?.banner?.imagem?.url!}
          fill
          alt=""
          className="-z-10"
        />
        <p className="text-[#EEEDE8] text-[45px] font-rasbern font-normal max-w-[1091px] max-[640px]:text-4xl">
          Dos vinhos jovens aos clássicos envelhecidos, <br />
          cada rótulo é uma viagem pelos campos que <br />
          dão <strong className="text-[#E97230] text-[65px] font-rasbern font-bold">vida</strong> às
          nossas videiras.
        </p>
      </div>
      <Footer border data={setting} lang={lang} />
    </>
  )
}
