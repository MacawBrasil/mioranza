import { Locale } from '@/utilities/locale'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/payload-types'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Button } from '@payloadcms/ui'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({
    slug: 'download',
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
    slug: 'download',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const image = page?.imagem2 as Media
  return (
    <>
      <div className="w-screen h-[800px] relative flex items-end max-[1024px]:h-[125vh] max-[640px]:h-fit max-[640px]:pt-[200px]">
        <Navbar isWhite loja={setting?.loja} lang={lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={lang} />
        <div className="w-[1780px] h-[585px] flex gap-[156px] items-center justify-end max-[1512px]:w-[1200px] max-[1512px]:mx-auto max-[1024px]:flex-col max-[1024px]:h-fit max-[640px]:w-full max-[640px]:px-6">
          <div className="flex flex-col max-w-[623px] max-[1024px]:items-center max-[1024px]:text-center max-[640px]:w-full">
            <span className="text-[#1E1E1E] text-xl font-grotesk font-bold">{page?.titulo}</span>
            <span className="text-[#1E1E1E] text-[60px] font-grotesk uppercase leading-[60px] tracking-[12px] max-[640px]:text-4xl">
              Baixe Nossos <br /> <strong className="text-[#E97230]">conteúdos</strong> <br />
              <strong className="text-[#E97230]">Exclusivos</strong>
            </span>
            <RichText
              data={page?.descricao!}
              className="mt-[30px] text-[#1E1E1E] text-xl font-grotesk max-w-[520px]"
            />
          </div>
          <div className="relative w-[735px] h-[585px] max-[1512px]:w-[635px] max-[1512px]:h-[485px] max-[640px]:w-[359px] max-[640px]:h-[307px]">
            <Image
              //@ts-ignore
              src={page?.imagem?.url}
              fill
              alt=""
              className="object-cover z-10"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1780px] h-[1050px] bg-[#E97230] relative -mt-12 max-[1512px]:w-full max-[1512px]:mt-10 max-[1024px]:h-fit max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:gap-24 max-[1024px]:static max-[1024px]:py-20 max-[1024px]:justify-center">
        <div className="absolute left-[266px] top-[122px] flex flex-col max-[1024px]:static">
          <span className="text-[#1E1E1E] text-4xl font-grotesk font-bold leading-[30px]">
            Desvende <br /> segredos
          </span>
          <span className="text-white text-4xl font-grotesk font-normal leading-[30px]">
            com nossos <br /> materiais de <br /> download
          </span>
        </div>
        <div className="absolute w-[630px] h-[607px] left-0 bottom-0 max-[1512px]:w-[500px] max-[1512px]:h-[507px] max-[1024px]:relative max-[640px]:w-[359px] max-[640px]:h-[307px]">
          <Image src={image?.url!} fill alt="" className="object-cover" />
        </div>
        <div className="w-[866px] absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-10 max-[1512px]:w-[700px] max-[1024px]:static max-[1024px]:translate-y-0 max-[1024px]:items-center max-[1024px]:w-full max-[640px]:px-8">
          <div className="flex flex-col gap-4 max-[1024px]:items-center">
            <div className="flex items-center flex-wrap gap-9 max-[640px]:justify-center max-[640px]:text-center">
              <Image
                //@ts-ignore
                src={page?.catalogoProdutos?.icone?.url}
                width={70}
                height={70}
                alt=""
              />
              <span className="text-[#181818] text-[40px] font-grotesk tracking-[8px] leading-[40px] uppercase">
                catálogo <br />
                de produtos
              </span>
            </div>
            <div className="translate-x-[110px] flex flex-col gap-4 max-[1512px]:max-w-[450px] max-[1024px]:translate-x-0 max-[1024px]:items-center max-[1024px]:text-center">
              <p className="max-w-[520px] text-[#EEEDE8] text-xl font-grotesk leading-[25px] max-[1512px]:max-w-[450px]">
                {page?.catalogoProdutos?.descricao}
              </p>
              <Link href={`/${page?.catalogoProdutos?.arquivo}`}>
                <Button className="w-[200px] h-[60px] text-white font-grotesk font-normal rounded-lg bg-black transition-all hover:bg-transparent hover:text-black hover:border hover:border-black">
                  Baixe agora
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-[760px] h-[10px] bg-[#EEEDE8] translate-x-[106px] max-[1512px]:w-[580px] max-[1024px]:w-full max-[1024px]:translate-x-0" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center flex-wrap gap-9 max-[640px]:justify-center max-[640px]:text-center">
              <Image
                //@ts-ignore
                src={page?.midiaKit?.icone?.url}
                width={70}
                height={70}
                alt=""
              />
              <span className="text-[#181818] text-[40px] font-grotesk tracking-[8px] leading-[40px] uppercase">
                mídia kit
              </span>
            </div>
            <div className="translate-x-[110px] flex flex-col gap-4 max-[1512px]:max-w-[450px] max-[1024px]:translate-x-0 max-[1024px]:items-center max-[1024px]:text-center">
              <p className="max-w-[520px] text-[#EEEDE8] text-xl font-grotesk leading-[25px] max-[1512px]:max-w-[450px]">
                {page?.midiaKit?.descricao}
              </p>
              <Link href={`/${page?.midiaKit?.arquivo}`}>
                <Button className="w-[200px] h-[60px] text-white font-grotesk font-normal rounded-lg bg-black transition-all hover:bg-transparent hover:text-black hover:border hover:border-black">
                  Baixe agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer data={setting} border={false} lang={lang} />
    </>
  )
}
