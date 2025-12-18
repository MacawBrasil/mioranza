import { Media, Product, ProductCategory, Produto } from '@/payload-types'
import { Locale } from '@/utilities/locale'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navbar } from '@/components/Navbar'
import { HeaderMobile } from '@/components/HeaderMobile'
import { RichText } from '@/components/Richtext'
import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'

interface PageProps {
  params: Promise<{ slug: string; lang: Locale }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const locales: Locale[] = ['pt', 'en', 'es']
  const params: Array<{ slug: string; lang: Locale }> = []

  for (const locale of locales) {
    const products = await payload.find({
      collection: 'products',
      locale,
      limit: 1000, // Ajuste conforme necessário
      depth: 0,
    })

    for (const product of products.docs) {
      if (product.slug) {
        params.push({
          slug: product.slug as string,
          lang: locale,
        })
      }
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const { slug } = await params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const payload = await getPayload({ config })
  const doc = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const image = doc?.docs[0]?.Seo?.ImagemCompartilhada as Media
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

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params
  const payload = await getPayload({ config })
  const setting = await payload.findGlobal({
    slug: 'settings',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const doc = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })

  const categoria = doc?.docs[0]?.categoria?.[0] as ProductCategory
  const categoriaId = categoria?.id

  const products = await payload.find({
    collection: 'products',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
    where: {
      categoria: {
        equals: categoriaId,
      },
    },
  })
  const fundoHero = doc?.docs[0]?.imagemFundoHero as Media

  return (
    <>
      <div
        //@ts-ignore
        after={`${doc?.titulo + doc?.tipo}`}
        className="w-screen h-[1080px] bg-[#EEEDE8] relative max-[768px]:h-fit after:content-[attr(after)] after:absolute after:-bottom-[150px] after:left-1/2 after:-translate-x-1/2 after:text-[300px] after:font-rasbern after:text-nowrap  after:font-bold after:text-[#E5E4DF] max-[1366px]:after:text-[200px] max-[1366px]:after:-bottom-[110px] max-[1024px]:after:text-[170px] max-[1024px]:after:-bottom-[80px] max-[640px]:after:text-[50px] max-[640px]:after:-bottom-[10px]"
      >
        <Navbar isWhite loja={setting?.loja} lang={lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={lang} />
        <div className="flex gap-[144px] w-full h-full items-end justify-center max-[768px]:flex-wrap max-[768px]:h-auto max-[768px]:pt-[300px] max-[768px]:text-center max-[640px]:pt-[200px]">
          <div className="flex flex-col items-start max-w-[595px] -translate-y-80 max-[1024px]:max-w-[300px] max-[1024px]:z-10 max-[768px]:translate-y-0 max-[768px]:max-w-full max-[768px]:items-center">
            <span className="text-[#CEC4C5] font-rasbern font-bold text-3xl leading-7 uppercase max-[640px]:text-1xl">
              {doc?.docs[0]?.titulo}
            </span>
            <span className="text-[#CEC4C5] font-rasbern font-bold text-3xl leading-7 mb-[20px] uppercase max-[640px]:text-1xl">
              {doc?.docs[0]?.tipo}
            </span>
            <RichText
              data={doc?.docs[0]?.chamada!}
              className="text-[#181818] text-[60px] font-grotesk font-bold tracking-[12px] leading-[60px] max-[640px]:text-4xl"
            />
            <p className="text-[#181818] text-lg font-grotesk font-normal mt-[30px] leading-5 mb-[50px] max-w-[384px] max-[640px]:text-base">
              {doc?.docs[0]?.descricao}
            </p>
            <a href={doc?.docs[0]?.link!} className="text-black font-grotesk font-normal">
              <Button className="w-[200px] h-[60px] rounded-lg bg-[#CEC4C5] transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                Compre agora
              </Button>
            </a>
          </div>
          <div className="relative w-[365px] h-[829px] max-[1024px]:h-[630px] max-[768px]:h-[530px]">
            {/* <IconProductHero className="absolute -top-9 -left-36 max-[1024px]:w-[534px] max-[1024px]:-left-24 max-[768px]:w-full max-[768px]:-top-40 max-[768px]:left-0" /> */}
            <div className="w-[634px] h-[539px] absolute -top-9 -left-36 max-[1024px]:w-[534px] max-[1024px]:-left-24 max-[768px]:w-full max-[768px]:-top-40 max-[768px]:left-0">
              {fundoHero?.url && <Image src={fundoHero.url} fill alt="" />}
            </div>
            <Image
              //@ts-ignore
              src={doc?.docs[0]?.imagemHero?.url}
              fill
              alt=""
              className="object-cover max-[1024px]:object-contain z-10"
            />
          </div>
        </div>
      </div>
      {/* Sabores em sintonia */}
      <div className="w-screen py-[100px] pl-[362px] flex flex-col bg-[#EEEDE8] max-[1024px]:pl-0 max-[1024px]:items-center max-[1024px]:px-8 max-[640px]:px-0 relative z-50">
        <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">Sabores em sintonia</span>
        <span className="text-[#181818] text-[60px] font-grotesk font-normal leading-[60px] max-[640px]:text-4xl">
          <strong className="text-[#E97230]">HARMONIZAÇÃO</strong> <br />
          EM CADA PRATO
        </span>
        <div className="pt-[100px] w-full flex items-center justify-start max-[1024px]:justify-center">
          {doc?.docs[0]?.secaoHarmonizacao?.harmonizacoes?.map((_, idx) => {
            const image = _.imagem as Media
            return (
              <div className="flex flex-col items-center gap-2" key={idx}>
                {image?.url && <Image src={image.url} width={55} height={55} alt="" />}
                <span className="text-[#CEC4C5] text-lg font-grotesk font-bold">{_.titulo}</span>
              </div>
            )
          })}
        </div>
      </div>
      {/* banner */}
      <div className="relative w-screen h-[826px] max-[640px]:h-[300px]">
        <div className="absolute w-full max-w-[1620px] px-11 h-4 bg-[#E97230] -top-4 left-1/2 -translate-x-1/2 z-20 max-[1024px]:w-full" />
        <div className="absolute w-full max-w-[1620px] px-11 h-4 bg-[#E97230] -bottom-4 left-1/2 -translate-x-1/2 z-20 max-[1024px]:w-full" />
        <Image
          //@ts-ignore
          src={doc?.docs[0]?.banner?.url}
          fill
          alt=""
          className="object-cover"
        />
      </div>
      {/* Sobre */}
      <div className="w-screen max-[1512px]:flex max-[1512px]:flex-col max-[1512px]:gap-20">
        <div className="pl-[362px] flex flex-col mt-[116px] max-[1512px]:pl-[220px] max-[1024px]:pl-0 max-[1024px]:items-center max-[1024px]:text-center">
          <span className="font-bold font-grotesk text-xl text-[rgb(206,196,197)] leading-7 ">
            {doc?.docs[0]?.sobre?.titulo}
          </span>
          <span className="text-6xl font-grotesk font-normal tex-[#181818]">
            <strong className="font-bold text-[#E97230]">CONHEÇA</strong> SOBRE <br />
            NOSSO VINHO
          </span>
        </div>
        <div className="w-full flex items-end gap-[120px] pl-[362px] max-[1512px]:pl-[150px] max-[1512px]:flex-wrap max-[1512px]:justify-center max-[1024px]:pl-0 max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:text-center">
          <div className="max-w-[520px] flex flex-col gap-10 max-[1280px]:max-w-[400px] max-[1024px]:items-center max-[640px]:max-w-full max-[640px]:px-6">
            <p className="text-[#1E1E1E ] text-xl font-grotesk font-normal">
              {doc?.docs[0]?.sobre?.descricao}
            </p>
            <ul className="mt-[55px] flex flex-col">
              {doc?.docs[0]?.sobre?.caracteristicas?.map((_, idx) => (
                <div className="flex flex-col gap-4 py-4">
                  <div className="w-full h-1 bg-stone-300 rounded"></div>
                  <li key={idx} className="h-[76px]">
                    <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
                      {_.titulo}
                    </span>
                    <RichText
                      data={_.descricao!}
                      className="text-[#1E1E1E] text-[22px] font-grotesk font-normal"
                    />
                  </li>
                </div>
              ))}
            </ul>
            <a
              href={doc?.docs[0]?.link!}
              className="text-black font-grotesk font-normal mt-[112px]"
            >
              <Button className="w-[200px] h-[60px] rounded-lg bg-[#CEC4C5]  transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                Compre agora
              </Button>
            </a>
          </div>
          <div className="relative w-[623px] h-[800px] max-[1512px]:w-[500px] max-[1512px]:h-[650px] max-[768px]:w-[300px] max-[768px]:h-[400px]">
            <Image
              //@ts-ignore
              src={doc?.docs[0]?.sobre?.imagemCaracteristicas?.url}
              fill
              alt=""
            />
          </div>
        </div>
      </div>
      {/* vinhos relacionados */}
      <div className="w-screen flex flex-col items-center gap-[80px] mt-[157px] mb-[234px]">
        <div className="flex flex-col items-center">
          <span className="font-bold font-grotesk text-xl text-[#CEC4C5] leading-7 ">
            De vinho em vinho
          </span>
          <span className="text-6xl font-grotesk font-normal tex-[#181818] max-[640px]:text-5xl">
            APRIMORE O <br />
            <strong className="font-bold text-[#E97230]">SEU MUNDO</strong>
          </span>
        </div>
        <div className="flex items-center gap-[183px] flex-wrap justify-center">
          {products?.docs.map((prod: Product) => {
            const image = prod.thumb as Media
            return (
              <div
                className="flex items-center gap-8 relative max-[768px]:flex-wrap max-[768px]:justify-center max-[768px]:text-center max-[640px]:flex-col"
                key={prod?.id}
              >
                <div className="absolute -left-[100px] top-10 w-[144px] h-[268px] bg-[#EBE6E7] -z-10 max-[640px]:-left-[50px]" />
                <div className="relative w-[120px] h-[339px]">
                  {image?.url && <Image src={image.url} alt="" fill className="object-contain" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-black font-grotesk font-normal text-[22px]">
                    {prod?.titulo}
                  </span>
                  <span className="text-black text-[45px] font-rasbern font-bold">
                    {prod?.tipo}
                  </span>
                  <Link href={`/${lang}/produtos/${prod?.slug}`}>
                    <Button className="w-[200px] h-[60px] bg-black text-white text-xl font-grotesk rounded-lg">
                      Conheça mais
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
