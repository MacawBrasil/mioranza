import { Post, Media } from '@/payload-types'
import { formatDate } from '@/utilities/FormatDate'
import { Button } from '@payloadcms/ui'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from 'payload'

interface iContentBlogs {
  data: Post[] | null
  locale: Locale
}

export function ContentBlogs({ data, locale }: iContentBlogs) {
  return (
    <div className="mt-[142px] flex flex-col w-full max-w-[1600px] px-9 m-auto mb-[259px]">
      <span className="text-[#1E1E1E] font-grotesk font-bold text-[35px]">Conteúdos recentes</span>
      <div className="w-full flex gap-[60px] flex-wrap mt-[280px] gap-y-[280px] justify-center">
        {data?.map((blog) => {
          const image = blog.thumb as Media
          return (
            <div
              key={blog.id}
              className="min-h-[600px] w-[450px] flex flex-col px-[50px] pb-[60px] pt-[180px] relative bg-[#D9D9D9] max-[1512px]:w-[350px]"
            >
              <div className="absolute -top-[180px] left-0 w-[400px] h-[320px] max-[1512px]:w-[300px] max-[1512px]:h-[220px] max-[1512px]:-top-[100px] max-[640px]:w-full">
                <Image src={image.url!} fill alt="" className="object-cover" />
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[#1E1E1E] font-grotesk text-base">
                  {formatDate(blog.updatedAt)}
                </span>
                <span className="text-[#1E1E1E] font-grotesk text-[25px] font-bold max-w-[280px]">
                  {blog.chamada}
                </span>
                <p className="text-[#1E1E1E] font-grotesk text-lg max-w-[354px]">
                  {blog.descricao}
                </p>
                <Link href={`/${locale}/blog/${blog.slug}`}>
                  <Button className="w-[147px] h-[35px] rounded-lg border border-black text-black font-grotesk text-lg transition-all hover:bg-black hover:text-white">
                    Leia mais
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className="w-full flex items-center justify-center gap-2 mt-[150px]">
        <span className="text-[#1E1E1E] font-grotesk text-xl">1</span>
        <span className="text-[#E97230] font-grotesk text-3xl font-bold">
          2
        </span>
        <span className="text-[#1E1E1E] font-grotesk text-xl">3</span>
        <span className="text-[#1E1E1E] font-grotesk text-xl">4</span>
      </div> */}
    </div>
  )
}
