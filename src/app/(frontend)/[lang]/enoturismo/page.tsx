import { Metadata } from 'next'
import Image from 'next/image'

import { SlidesShow } from './SlidesShow'
import { Locale } from '@/utilities/locale'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import { LogoWhats } from '@/components/SVGS'
import { Media } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({
    slug: 'home',
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
    slug: 'enoturismo',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const image = page?.secao?.imagem as Media
  return (
    <>
      {/* imagens */}
      <a
        href={`https://wa.me/${setting?.whatsapp?.replace(
          /\D/g,
          '',
        )}?text=Vim%20pela%20pagina%20enoturismo%20do%20site%20Mioranza.com.br`}
        target="_blank"
      >
        <LogoWhats className="fixed right-[160px] top-1/2 z-20 max-[640px]:right-10 max-[640px]:top-3/4" />
      </a>
      <div className="relative w-screen h-[780px] flex items-end max-[640px]:h-[100px]">
        <Navbar isWhite loja={setting?.loja} lang={lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={lang} />
        {/* <SlidesShow banners={page?.banners} /> */}
        <div className="w-full h-[500px] flex items-end max-[640px]:hidden max-[640px]:h-0">
          <div className="relative w-[465px] h-[531px]">
            <Image
              //@ts-ignore
              src={page?.imagem1?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="relative w-[994px] h-[589px]">
            <Image
              //@ts-ignore
              src={page?.imagem2?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="relative w-[465px] h-[531px]">
            <Image
              //@ts-ignore
              src={page?.imagem3?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {/* enoturismo */}
      <div className="w-screen min-h-[986px] relative mt-[92px] max-[1512px]:min-h-[800px] max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center max-[768px]:justify-center max-[768px]:px-8 max-[768px]:text-center max-[768px]:gap-20 max-[640px]:min-h-[300px]">
        <div className="flex flex-col absolute left-[404px] top-0 max-[1512px]:left-[150px] max-[768px]:static">
          <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
            {page?.secao?.titulo}
          </span>
          <span className="text-[#181818] text-[60px] font-grotesk font-normal uppercase leading-[60px] tracking-[12px] max-[640px]:text-4xl">
            uma <strong className="text-[#E97230]">jornada</strong> <br />
            <strong className="text-[#E97230]">sensorial</strong> pelos <br /> nossos vinhedos
          </span>
        </div>
        <div className="absolute w-[463px] h-[600px] top-[187px] right-0 max-[1512px]:w-[363px] max-[1512px]:h-[500px] max-[768px]:hidden">
          <Image src={image?.url!} fill alt="" className="object-cover" />
          <video
            className="absolute object-cover w-[1266px] h-[600px] bottom-0 left-0 max-[1512px]:w-[900px] max-[1512px]:h-[450px] max-[1280px]:w-[800px] max-[1280px]:h-[400px] max-[768px]:relative max-[768px]:w-full max-[640px]:h-[200px]"
            //@ts-ignore
            src={page?.secao?.video?.url ?? undefined}
            //@ts-ignore
            poster={page?.secao?.fundoVideo?.url || '/banner-home.png'}
            controls
            playsInline
            muted
            loop
          ></video>
        </div>
        <video
          className="absolute object-cover w-[1266px] h-[600px] bottom-0 left-0 max-[1512px]:w-[900px] max-[1512px]:h-[450px] max-[1280px]:w-[800px] max-[1280px]:h-[400px] max-[768px]:relative max-[768px]:w-full max-[640px]:h-[200px]"
          //@ts-ignore
          src={page?.secao?.video?.url ?? undefined}
          //@ts-ignore
          poster={page?.secao?.fundoVideo?.url || '/banner-home.png'}
          controls
          playsInline
          muted
          loop
        ></video>
      </div>
      {/* roteiros */}
      <div className="w-screen flex flex-col items-center mb-[218px] mt-20">
        <span className="text-[#EBE6E7] text-[380px] font-rasbern font-bold uppercase max-[1512px]:text-[300px] max-[768px]:text-[100px] max-[640px]:text-[60px] max-[640px]:text-black">
          roteiros
        </span>
        <SlidesShow roteiros={page?.roteiros} />
      </div>
      <Footer border data={setting} lang={lang} />
    </>
  )
}
