'use client'
import { useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Media, Product, ProductCategory, ProductSubCategory } from '@/payload-types'
import { Locale } from '@/utilities/locale'
import { cn } from '@/utilities/utils'
import { Button } from '@/components/Button'

interface iFilterCategoryContent {
  categories: ProductCategory[]
  products: Product[]
  locale: Locale
}

interface iSubCategoryProps {
  categoryName: string
  categoryValue: string
  subCategoryName: string
  subCategoryValue: string
}

export function FilterCategoryContent({
  categories,
  products: produtos,
  locale,
}: iFilterCategoryContent) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const categoriaTitle = searchParams.get('categoria') || ''
  const subCategoriaTitle = searchParams.get('subCategoria') || ''
  const router = useRouter()

  // Calcula produtos filtrados baseado nas categorias recebidas
  const filteredProducts = useMemo(() => {
    // Se não há categoria selecionada, retorna todos os produtos
    if (!categoriaTitle) {
      return produtos
    }

    // Encontra a categoria selecionada
    const selectedCategory = categories.find((cat) => cat.titulo === categoriaTitle)

    if (!selectedCategory) {
      return []
    }

    // Se há subcategoria selecionada, busca os produtos dela
    if (subCategoriaTitle) {
      const subCategorias = selectedCategory.SubCateroria || []
      const selectedSubCategory = subCategorias.find((sub) => {
        const subCat = sub as ProductSubCategory
        return subCat.titulo === subCategoriaTitle
      }) as ProductSubCategory | undefined

      if (selectedSubCategory?.produtos) {
        // Filtra apenas os produtos que são objetos (não strings/IDs)
        return selectedSubCategory.produtos.filter(
          (prod): prod is Product => typeof prod === 'object' && prod !== null,
        )
      }
      return []
    }

    // Se não há subcategoria, retorna os produtos da categoria
    if (selectedCategory.produto) {
      // Filtra apenas os produtos que são objetos (não strings/IDs)
      return selectedCategory.produto.filter(
        (prod): prod is Product => typeof prod === 'object' && prod !== null,
      )
    }

    return []
  }, [categoriaTitle, subCategoriaTitle, categories, produtos])

  // Atualiza query string ao clicar em categoria
  const handleCategoryClick = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.delete('subCategoria')
      router.push(`${pathname}?${params.toString()}#produtos`)
    },
    [pathname, router, searchParams],
  )

  // Atualiza query string ao clicar em subcategoria
  const handleSubCategoryClick = useCallback(
    ({ categoryName, categoryValue, subCategoryName, subCategoryValue }: iSubCategoryProps) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(categoryName, categoryValue)
      params.set(subCategoryName, subCategoryValue)
      router.push(`${pathname}?${params.toString()}#produtos`)
    },
    [pathname, router, searchParams],
  )

  // Limpa filtros
  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('categoria')
    params.delete('subCategoria')
    router.push(`${pathname}?${params.toString()}#produtos`)
  }

  return (
    <div className="flex flex-col items-center gap-[91px] mt-[121px] max-[640px]:justify-center max-[640px]:text-center max-[640px]:w-full">
      {/* filtros */}
      <span className="text-[#1E1E1E] font-grotesk font-bold text-[35px] max-[640px]:text-1xl max-[640px]:px-6">
        Escolha uma de nossas categorias
      </span>
      <div className="w-full grid grid-cols-5 place-items-center gap-7 max-[1280px]:grid-cols-4 max-[768px]:grid-cols-3 max-[640px]:grid-cols-1">
        {categories?.map((cat, idx) => {
          const image = cat.imagem as Media
          return (
            <div
              key={idx}
              className="min-h-[723px] h-auto flex flex-col items-center group gap-11 relative max-[1366px]:w-[220px]"
            >
              <div className="relative w-[131px] h-[413px]">
                <Image
                  src={image?.url || '/banner-home.png'}
                  fill
                  alt=""
                  className="z-10 object-contain"
                />
              </div>
              <div
                onClick={() => cat.titulo && handleCategoryClick('categoria', cat.titulo)}
                style={{ '--color': cat.cor } as React.CSSProperties}
                className={cn(
                  'category-title text-black text-3xl text-center font-normal leading-7 font-grotesk uppercase cursor-pointer',
                  categoriaTitle === cat.titulo &&
                    'relative before:absolute before:-bottom-2 before:left-0 z-20 before:w-full before:h-1 before:bg-black before:rounded-md',
                )}
              >
                {cat.titulo}
              </div>
              <div
                style={{ backgroundColor: cat.cor }}
                className={cn(
                  'w-[244px] h-[244px] rounded-full absolute top-7 opacity-100 transition-all group-hover:top-[244px] group-hover:opacity-0 group-hover:-z-20 max-[1366px]:w-[200px] max-[1366px]:h-[200px]',
                )}
              ></div>
              <div className={cn('flex flex-col items-center gap-3')}>
                {cat.SubCateroria?.map((sub, subIdx) => {
                  const dataSub = sub as ProductSubCategory
                  const categoryTitle = cat.titulo
                  const subCategoryTitle = dataSub.titulo
                  if (!categoryTitle || !subCategoryTitle) return null
                  return (
                    <div
                      key={subIdx}
                      onClick={() =>
                        handleSubCategoryClick({
                          categoryName: 'categoria',
                          categoryValue: categoryTitle,
                          subCategoryName: 'subCategoria',
                          subCategoryValue: subCategoryTitle,
                        })
                      }
                      //@ts-ignore
                      style={{ '--carac-color': cat.cor }}
                      className={cn(
                        'text-black text-center relative text-lg font-bold leading-7 cursor-pointer font-grotesk opacity-0 transition-all group-hover:text-[--carac-color] group-hover:opacity-100 max-[640px]:opacity-100',
                        subCategoriaTitle === dataSub.titulo &&
                          'relative before:absolute before:-bottom-px before:left-0 z-20 before:w-full before:h-1 before:bg-[--carac-color] before:rounded-md group-hover:opacity-100',
                        dataSub.titulo === subCategoriaTitle &&
                          'opacity-100 before:bg-[--carac-color] text-[--carac-color] ',
                      )}
                    >
                      {dataSub.titulo}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      {/* products */}
      <div className="w-full flex justify-evenly items-center" id="produtos">
        <div className="w-[533px] h-[2px] bg-[#CCCCCC] max-[640px]:hidden max-[1366px]:w-[450px]"></div>
        <div className="flex items-center gap-2">
          <span className="text-[#CEC4C5] font-grotesk text-[20px]">Resultados</span>
          <div className="w-[2px] h-[20px] bg-[#CCCCCC]"></div>
          <span className="text-[#CEC4C5] font-grotesk text-[20px]">Mioranza</span>
          {categoriaTitle && (
            <>
              <div className="w-[2px] h-[20px] bg-[#CCCCCC]"></div>
              <span className="text-black font-bold font-rasbern text-[20px] uppercase">
                {categoriaTitle}
              </span>
            </>
          )}
        </div>
        <div className="w-[533px] h-[2px] bg-[#CCCCCC] max-[640px]:hidden max-[1366px]:w-[450px]"></div>
      </div>

      {filteredProducts.length === 0 && <span>Nenhum produto foi encontrado com este filtro</span>}

      <div className="w-full flex gap-[63px] justify-center flex-wrap relative">
        <span
          className="absolute -top-10 right-10 font-grotesk font-medium text-sm cursor-pointer"
          onClick={handleClearFilters}
        >
          Limpar filtro
        </span>

        {filteredProducts?.map((prod: Product, idx) => {
          const thumb = prod.thumb as Media
          const bg = prod.imagemFundo as Media
          if (!prod.slug) return null
          return (
            <div
              className="w-[435px] h-[920px] flex flex-col items-center justify-end relative group"
              key={idx}
            >
              <div className="w-full h-[585px] bg-[#EBE6E7] absolute top-0 -z-10 overflow-hidden transition-all group-hover:h-[659px] group-hover:bg-black">
                {bg?.url && (
                  <Image
                    src={bg.url}
                    fill
                    alt=""
                    className="object-cover opacity-0 scale-100 transition-all group-hover:opacity-30 group-hover:scale-110"
                  />
                )}
              </div>
              {thumb?.url && (
                <Image src={thumb.url} width={143} quality={100} height={590} alt="" />
              )}
              <span className="text-[#CEC4C5] text-[22px] font-grotesk leading-6 mt-5">
                {prod.titulo}
              </span>
              <span className="font-rasbern text-[45px] text-[#CEC4C5] font-bold">{prod.tipo}</span>
              <Link href={`/${locale}/produtos/${prod.slug}`} className="mt-[33px]">
                <Button className="w-[200px] h-[60px]  bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                  Conheça mais
                </Button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
