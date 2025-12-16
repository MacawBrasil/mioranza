import { Metadata } from 'next'
import Image from 'next/image'

import { Form } from './Form'
import { Locale } from '@/utilities/locale'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import { Media, Setting, Contato } from '@/payload-types'
import { Button } from '@payloadcms/ui'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@/components/Richtext'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({
    slug: 'contato',
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
    slug: 'contato',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  return (
    <>
      <div className="relative w-screen h-[209px] max-[640px]:h-[100px]">
        <Navbar isWhite loja={setting?.loja} lang={lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={lang} />
      </div>
      <div className="w-full h-[560px] relative flex items-center justify-center">
        <Image
          //@ts-ignore
          src={page?.banner.url}
          fill
          alt=""
          className="object-cover -z-10"
        />
        <div className="flex flex-col w-full max-w-[762px] items-center text-center max-[768px]:px-9">
          <span className="text-[#EEEDE8] text-xl font-grotesk font-bold">{page?.titulo}</span>
          <span className="text-[#EEEDE8] text-[60px] font-grotesk font-normal uppercase leading-[60px] tracking-[12px] max-[640px]:text-4xl">
            descubra o <br />
            <strong className="">
              sabor por trás <br />
              dos vinhedos
            </strong>
          </span>
          <p className="text-[#EEEDE8] text-xl font-grotesk font-normal max-w-[520px] mt-[30px]">
            {page?.description}
          </p>
        </div>
      </div>
      <div className="w-screen flex justify-center flex-wrap gap-[200px] max-[1280px]:gap-[100px]">
        <div className="w-[560px] h-[1280px] bg-[#E97230] pt-[274px] flex flex-col items-center max-[1024px]:order-2 max-[640px]:w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3489.1310573329047!2d-51.25307632334021!3d-29.013109684223757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951e9a6aaaaaaaad%3A0xe653b49e05ac7d9e!2sVin%C3%ADcola%20Mioranza!5e0!3m2!1spt-BR!2sbr!4v1709065819993!5m2!1spt-BR!2sbr"
            className="border-none w-[560px] h-[511px] max-[640px]:w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="flex flex-col gap-5 pt-[61px] max-[640px]:items-center max-[640px]:text-center">
            <Button className="w-[200px] h-[60px] bg-transparent border border-white text-white rounded-lg">
              Abrir no mapa
            </Button>
            <RichText
              data={setting?.endereco!}
              className="text-white text-lg font-grotesk max-w-[235px]"
            />
            <a href={`mailto:${setting?.email}`} className="text-white text-lg font-grotesk">
              {setting?.email}
            </a>
            <a href={`tel:${setting?.telefone}`} className="text-white text-lg font-grotesk">
              {setting?.telefone}
            </a>
            <div className="flex gap-3">
              {setting?.redes?.map((_: any) => {
                const icon = _.icone as Media
                return (
                  <a href={`${_.link}`} target="_blank" key={_.id}>
                    <Image src={icon.url!} width={30} height={30} alt="" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start w-[540px] pt-[80px] gap-[60px] max-[1024px]:items-center max-[640px]:w-full max-[640px]:px-10">
          <p className="text-[#1E1E1E] text-xl font-grotesk max-w-[333px] max-[1024px]:max-w-full max-[1024px]:text-center">
            {page?.texto}
          </p>
          <Form />
        </div>
      </div>
      <Footer border={false} data={setting} lang={lang} />
    </>
  )
}
