/* eslint-disable no-console */
import { Locale } from '@/utilities/locale'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Media } from '@/payload-types'
import { Hero } from '@/components/Hero'
import { cn } from '@/utilities/utils'
import { RichText } from '@/components/Richtext'
import { Button } from '@/components/Button'
import { CarouselBlog } from '@/components/CarouselBlog'
import { Footer } from '@/components/Footer'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({
    slug: 'home',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const image = home?.Seo?.ImagemCompartilhada as Media
  const title = home?.Seo?.titulo || 'Mioranza - Bem vindo'
  const description = home?.Seo?.descricao || 'Mioranza - Bem vindo'
  const keywords = home?.Seo?.palavrasChave || 'Mioranza - Bem vindo'
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

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
      images: image?.url ? [{ url: image.url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image?.url ? [{ url: image.url }] : undefined,
    },
  }
}

export default async function Page({ params }: PageProps) {
  // Valida se o locale é válido, se não for, redireciona para a versão com locale válido
  const { lang } = await params
  const payload = await getPayload({ config })

  const home = await payload.findGlobal({
    slug: 'home',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const setting = await payload.findGlobal({
    slug: 'settings',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const prodCategories = await payload.find({
    collection: 'productCategory',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const productsHighlights = await payload.find({
    collection: 'products',
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
      <Hero data={home} loja={setting?.loja} lang={lang} whats={setting?.whatsapp} />
      {/* nossas marcas */}
      <div className="max-w-[1640px] w-full m-auto flex flex-col items-center gap-[88px] pt-[140px] mb-[183px] max-[768px]:text-center">
        <span className="font-grotesk font-normal text-6xl uppercase">
          Nossas <strong>marcas</strong>
        </span>
        <div className="w-full grid grid-cols-5 place-items-center gap-7 max-[1280px]:grid-cols-4 max-[768px]:grid-cols-3 max-[640px]:grid-cols-1">
          {prodCategories?.docs?.map((_, idx) => {
            const image = _.imagem as Media
            return (
              <div
                className="h-[564px] flex flex-col items-center gap-11 relative group max-[1366px]:w-[220px]"
                key={idx}
              >
                <div className="relative w-[131px] h-[413px]">
                  <Image
                    src={image.url || '/banner-home.png'}
                    fill
                    alt=""
                    className="z-10 object-contain"
                  />
                </div>
                <span
                  //@ts-ignore
                  style={{ '--color': _.cor }}
                  className={cn(
                    'group-hover:text-[--color]',
                    'text-black text-3xl font-normal leading-7 font-grotesk',
                  )}
                >
                  {_.titulo}
                </span>
                <div
                  //@ts-ignore
                  style={{ '--bg-color': _.cor }}
                  className={cn(
                    'bg-[--bg-color]',
                    'w-[244px] h-[244px] rounded-full absolute top-7 opacity-100 transition-all group-hover:top-[244px] group-hover:opacity-0 max-[1366px]:w-[200px] max-[1366px]:h-[200px]',
                  )}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
      {/* enoturismo */}
      <div className="w-screen h-[870px] flex justify-end relative max-[768px]:h-auto max-[768px]:justify-center max-[768px]:flex-wrap">
        <div className="relative w-[844px] h-[870px] max-[768px]:h-[300px] max-[768px]:w-full max-[768px]:-mb-16">
          <Image
            //@ts-ignore
            src={home?.enoturismo?.imagem?.url}
            fill
            alt=""
            className="object-cover"
          />
        </div>
        <div className="w-[940px] h-[870px] bg-[#CEC4C5] pl-[122px] pt-[130px] max-[1024px]:w-full max-[1024px]:pl-10 max-[640px]:px-4">
          <div className="flex flex-col items-end gap-[85px] max-w-[440px] max-[768px]:items-center max-[768px]:max-w-full">
            <div className="max-[768px]:flex flex-col max-[768px]:items-center max-[768px]:text-center">
              <span className="text-[#1E1E1E] font-grotesk font-bold text-xl">
                {home?.enoturismo?.titulo}
              </span>
              <h2 className="font-grotesk text-[50px] font-light leading-[60px] max-w-[450px] uppercase max-[768px]:w-full max-[768px]:text-4xl">
                O ENOTURISMO EM UMA{' '}
                <strong className="font-bold text-[#E97230]">JORNADA INESQUECÍVEL</strong>
              </h2>
              <RichText
                data={home?.enoturismo?.descricao!}
                className="max-w-[356px] pt-[40px] w-full"
              />
            </div>
            <Link href={`/${lang}/enoturismo`}>
              <Button className="w-[200px] h-[60px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black  hover:text-black">
                {home?.enoturismo?.textoBotao}
              </Button>
            </Link>
          </div>
          <video
            className="absolute w-[540px] h-[300px] -bottom-[179px] left-1/2 -translate-x-1/2 max-[768px]:w-full max-[1512px]:-bottom-[220px] object-cover"
            //@ts-ignore
            src={home?.enoturismo?.video?.url ?? undefined}
            poster={
              //@ts-ignore
              home?.enoturismo?.fundoVideo?.url || '/banner-fundo.png'
            }
            controls
            muted
            loop
          ></video>
        </div>
      </div>
      {/* produtos em destaque */}
      <div className="flex flex-col items-center pt-[293px]">
        <span className="tex-[#CEC4C5] text-xl font-grotesk font-bold">Nossos produtos</span>
        <span className="tex-[#CEC4C5] text-[60px] font-grotesk font-bold uppercase">
          destaques
        </span>
        <div className="w-full flex gap-[63px] justify-center pt-[70px] flex-wrap">
          {productsHighlights?.docs?.map((prod, idx) => {
            const thumb = prod.thumb as Media
            const bg = prod.imagemFundo as Media
            return (
              <div
                className="w-[435px] h-[920px] flex flex-col items-center justify-end relative group max-[1366px]:w-[340px]"
                key={idx}
              >
                <div className="w-full h-[585px] bg-[#EBE6E7] absolute top-0 -z-10 overflow-hidden transition-all group-hover:h-[659px] group-hover:bg-black">
                  <Image
                    src={bg.url!}
                    fill
                    alt=""
                    className="object-cover opacity-0 scale-100 transition-all group-hover:opacity-30 group-hover:scale-110"
                  />
                </div>
                <Image src={thumb.url!} width={143} quality={100} height={590} alt="" />
                <span className="text-[#CEC4C5] text-[22px] font-grotesk leading-6 mt-5">
                  {prod.titulo}
                </span>
                <span className="font-rasbern text-[45px] text-[#CEC4C5] font-bold">
                  {prod.tipo}
                </span>
                <Link href={`/${lang}/produtos/${prod.slug}`}>
                  <Button className="w-[200px] h-[60px] mt-[33px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                    Conheça mais
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className="relative w-[1554px] h-[422px] max-[1024px]:w-full mt-[225px] mb-[83px] max-[1512px]:w-full">
        <Image
          //@ts-ignore
          src={home?.imagem?.url}
          fill
          alt=""
          className="object-cover"
        />
      </div>
      <div className="max-w-[1458px] w-full flex flex-col gap-[116px] m-auto max-[1280px]:pl-5 max-[640px]:px-6 max-[1366px]:items-center">
        <div className="flex flex-col max-[1512px]:px-8 max-[1366px]:items-center max-[1366px]:text-center">
          <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
            {home?.secaoDiferenciais?.titulo}
          </span>
          <span className="font-grotesk text-[60px] leading-[60px] uppercase max-[640px]:text-4xl">
            Um <strong className="font-bold text-[#E97230]">toque</strong> <br />
            distinto
          </span>
        </div>
        <div className="flex justify-center gap-[60px] flex-wrap">
          {home?.secaoDiferenciais?.diferenciais?.map((dif, idx) => {
            const image = dif.imagem as Media
            return (
              <div
                className="max-w-[160px] flex items-center justify-center flex-col text-center gap-6"
                key={idx}
              >
                <Image src={image.url!} width={110} height={110} alt="" />
                <RichText data={dif.titulo!} className="text-[#1E1E1E] font-grotesk text-lg" />
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-[272px] w-full max-w-[1920px] max-[768px]:flex max-[768px]:flex-col max-[768px]:gap-5 max-[768px]:mt-40">
        <div className="flex justify-between w-full max-[1024px]:gap-5 max-[1024px]:justify-center max-[768px]:flex-wrap">
          <div className="relative w-[390px] h-[390px] max-[768px]:w-full max-[1366px]:w-[300px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem1?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="flex flex-col max-w-[570px] pl-10 pt-4 max-[768px]:pl-5 max-[768px]:text-center max-[640px]:px-6">
            <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
              {home?.secaoQuemSomos?.titulo}
            </span>
            <span className="font-grotesk text-[60px] leading-[60px] uppercase max-[640px]:text-4xl">
              <strong className="font-bold text-[#E97230]">Paixão</strong> <br /> e tradição
            </span>
            <RichText
              data={home?.secaoQuemSomos?.descicao!}
              className="mt-[60px] text-[#1E1E1E] font-grotesk text-lg max-w-[384px] w-full max-[768px]:mt-10"
            />
          </div>
          <video
            className="max-[768px]:mt-5 relative w-[960px] object-cover h-[390px] after:z-10 after:absolute after:-top-[18px] after:left-0 after:w-full after:h-[18px] after:bg-[#E97230] max-[1512px]:w-[700px] max-[1280px]:w-[400px] max-[1024px]:w-full max-[1366px]:w-[600px]"
            //@ts-ignore
            src={home?.secaoQuemSomos?.video?.url ?? undefined}
            poster={
              //@ts-ignore
              home?.enoturismo?.fundoVideo?.url || '/banner-fundo.png'
            }
            controls
            muted
            loop
          ></video>
        </div>
        <div className="w-full flex max-[1024px]:justify-center max-[768px]:flex-wrap">
          <div className="w-[570px] h-[390px] bg-[#D9D9D9] flex items-center justify-center max-[768px]:w-full max-[1512px]:w-[300px] max-[1024px]:w-[250px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem2?.url}
              width={230}
              height={230}
              alt=""
              className="ml-28 max-[768px]:ml-0 max-[1512px]:ml-0"
            />
          </div>
          <div className="w-[390px] h-[576px] relative max-[768px]:w-full max-[1280px]:w-[300px] max-[1280px]:h-[470px] max-[1024px]:w-[250px] max-[1024px]:h-[390px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem3?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="h-[390px] w-[390px] flex items-center justify-center max-[1024px]:order-6 max-[1512px]:w-[300px] max-[1024px]:w-[250px]">
            <Link href={`/${lang}/a-vinicola`}>
              <Button className="w-[200px] h-[60px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                {home?.secaoQuemSomos?.textoBotao}
              </Button>
            </Link>
          </div>
          <div className="w-[390px] h-[390px] relative max-[768px]:w-full max-[1280px]:w-[360px] max-[1024px]:w-[250px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem4?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="w-[145px] h-[390px] bg-[#D9D9D9] max-[1280px]:hidden max-[1512px]:w-[138px]"></div>
        </div>
      </div>
      <CarouselBlog home={home} data={posts.docs} lang={lang} />
      <Footer border data={setting} lang={lang} />
    </>
  )
}
