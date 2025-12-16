import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import { Post, Media, Setting, BlogCategory } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Button } from '@payloadcms/ui'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Locale } from '@/utilities/locale'
import { formatDate } from '@/utilities/FormatDate'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string; lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const payload = await getPayload({ config })
  const doc = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const image = doc?.docs[0]?.Seo?.ImagemCompartilhada as Media | undefined
  const title = doc?.docs[0]?.Seo?.titulo || 'Mioranza - Bem vindo'
  const description = doc?.docs[0]?.Seo?.descricao || 'Mioranza - Bem vindo'
  const keywords = doc?.docs[0]?.Seo?.palavrasChave || 'Mioranza - Bem vindo'

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

interface PageProps {
  params: Promise<{ slug: string; lang: Locale }>
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params
  const payload = await getPayload({ config })
  const {
    docs: [doc],
  } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
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

  const relationalPosts = await payload.find({
    collection: 'posts',
    where: {
      categoria: {
        equals: doc?.categoria,
      },
    },
  })

  return (
    <>
      <div className="w-screen h-[603px] relative max-[640px]:h-[200px]">
        <div className="bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.00)_90.2%)] h-[245px]">
          <Navbar loja={setting?.loja} lang={lang} />
          <HeaderMobile loja={setting?.loja} lang={lang} />
        </div>
        <Image
          //@ts-ignore
          src={doc?.banner?.url!}
          fill
          alt=""
          className="object-cover -z-10"
        />
      </div>
      <div className="w-full max-w-[1015px] m-auto mt-[65px] max-[1024px]:px-10">
        <div className="flex items-end gap-8 flex-wrap max-[1024px]:justify-center mb-20">
          <div className="flex flex-col max-w-full">
            <span className="text-[#CEC4C5] text-xl font-grotesk font-bold max-[640px]:text-base">
              {formatDate(doc.updatedAt)}
            </span>
            <h1 className="text-[#181818] text-4xl font-grotesk font-normal leading-normal max-[640px]:text-2xl">
              {doc?.chamada}
            </h1>
          </div>
          <p className="w-full text-[#1E1E1E] text-xl font-grotesk max-[640px]:text-sm">
            {doc?.descricao}
          </p>
        </div>
        <RichText
          data={doc?.texto!}
          className="text-[#1E1E1E] font-grotesk text-xl mt-8 max-[640px]:text-sm"
        />
      </div>
      <div className="w-full max-w-[1645px] flex items-center justify-between mt-[170px] mb-[90px] max-[1512px]:pr-9 max-[1512px]:justify-around">
        <div className="w-[1191px] h-[2px] bg-[#CEC4C5] max-[1512px]:w-[1000px] max-[768px]:w-[400px] max-[640px]:w-[100px]" />
        <Link href={`/${lang}/blog`}>
          <Button className="w-[200px] h-[60px] text-black font-grotesk font-normal rounded-lg bg-[#CEC4C5] transition-all hover:bg-transparent hover:border hover:border-black">
            Voltar
          </Button>
        </Link>
      </div>
      <div className="flex flex-col w-full max-w-[1600px] px-9 m-auto mb-[146px] gap-[80px] max-[640px]:gap-10">
        <span className="text-[#1E1E1E] font-grotesk font-bold text-[35px] max-[640px]:text-2xl">
          Conteúdos relacionados
        </span>
        <div className="w-full grid grid-cols-3 gap-14 max-[1280px]:grid-cols-2 max-[640px]:gap-8 max-[768px]:grid-cols-1">
          {relationalPosts.docs.map((blog) => {
            const image = blog.thumb as Media
            return (
              <div className="h-fit w-full flex flex-col justify-end  pb-[60px] relative bg-[#D9D9D9] max-[640px]:px-4">
                <div className="absolute -top-[180px] left-0 w-[400px] h-[320px] max-[1366px]:w-full max-[1512px]:h-[220px] max-[1512px]:-top-[100px] max-[1366px]:relative max-[1366px]:top-0">
                  <Image src={image.url!} fill alt="" className="object-cover" />
                </div>
                <div className="flex flex-col gap-4 mt-44 px-[50px] max-[1366px]:mt-10 max-[640px]:px-4">
                  <span className="text-[#1E1E1E] font-grotesk text-base">
                    {formatDate(blog.updatedAt)}
                  </span>
                  <span className="text-[#1E1E1E] font-grotesk text-[25px] font-bold max-w-[280px] max-[640px]:text-lg max-[1280px]:max-w-full">
                    {blog.chamada}
                  </span>
                  <p className="text-[#1E1E1E] font-grotesk text-lg max-w-[354px] max-[1280px]:max-w-full">
                    {blog.descricao}
                  </p>
                  <Link href={`/${lang}/blog/${blog.slug}`}>
                    <Button className="w-[147px] h-[35px] rounded-lg border border-black text-black font-grotesk text-lg transition-all hover:bg-black hover:text-white">
                      Leia mais
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer border data={setting} lang={lang} />
    </>
  )
}
