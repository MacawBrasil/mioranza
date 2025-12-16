import { Locale } from '@/utilities/locale'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/payload-types'
import { Navbar } from '@/components/Navbar'
import { HeaderMobile } from '@/components/HeaderMobile'
import { SlidesOrigem } from '@/components/SlidesOrigem'
import { SlidesMomentos } from '@/components/SlidesMomentos'
import { SlidesOnline } from '@/components/SlidesOnline'
import { Footer } from '@/components/Footer'

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
    slug: 'legado',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  return (
    <>
      <div className="w-screen h-[231px] relative max-[640px]:h-[200px]">
        <Navbar loja={setting?.loja} lang={lang} isWhite />
        <HeaderMobile loja={setting?.loja} lang={lang} isWhite />
      </div>
      <div className="flex flex-col items-center w-full px-8 max-[640px]:text-center">
        <span className="font-grotesk text-xl text-[#CEC4C5]">{page?.titulo}</span>
        <span className="font-grotesk font-normal text-6xl uppercase leading-[60px] tracking-[12px]">
          Da terra, das <br /> mãos e <strong className="text-[#E97230]">da uva</strong>
        </span>
        <SlidesOrigem data={page?.slidesOrigem} selo={setting?.selo} />
      </div>
      <SlidesMomentos data={page?.secaoMomentos} />
      <SlidesOnline data={{ secaoOnline: page.secaoOnline }} />
      <Footer border data={setting} lang={lang} />
    </>
  )
}
