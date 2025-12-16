import { Metadata } from 'next'
import Image from 'next/image'

import { ContentBlogs } from './contentBlogs'
import { Locale } from '@/utilities/locale'
import { Media } from '@/payload-types'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const payload = await getPayload({ config })
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

  const page = await payload.findGlobal({
    slug: 'blog',
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
      images: image?.url! && [{ url: image?.url! }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image.url! && [{ url: image.url! }],
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
    slug: 'blog',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const posts = await payload.find({
    collection: 'posts',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  return (
    <>
      <div className="relative w-screen h-[209px]">
        <Navbar isWhite loja={setting?.loja} lang={lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={lang} />
      </div>
      <div className="flex items-center gap-[173px] max-[1280px]:gap-[80px] max-[768px]:w-full">
        <div className="relative w-[1039px] h-[631px] max-[1512px]:w-[739px] max-[1512px]:h-[431px] max-[768px]:hidden">
          <Image
            //@ts-ignore
            src={page?.imagem?.url!}
            fill
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex flex-col max-[768px]:w-full max-[768px]:justify-center max-[768px]:items-center max-[768px]:text-center max-[640px]:px-6">
          <span className="text-[#CEC4C5] text-xl font-bold font-grotesk">{page?.titulo}</span>
          <span className="text-[#181818] font-grotesk text-[60px] leading-[60px] uppercase max-[640px]:text-4xl">
            HISTÓRIAS E <br />
            <strong className="text-[#E97230]">SABORES</strong>
          </span>
          <p className="mt-[60px] text-[#1E1E1E] text-lg font-grotesk max-w-[384px]">
            {page?.description}
          </p>
        </div>
      </div>
      <ContentBlogs data={posts.docs} locale={lang as any} />
      <Footer border data={setting} lang={lang} />
    </>
  )
}
