import { revalidatePath } from 'next/cache'

const locales = ['pt', 'en', 'es']

/**
 * Revalida todas as rotas de uma página para todos os locales
 * @param paths - Array de paths relativos (sem o locale) para revalidar
 */
export async function revalidatePages(paths: string[]) {
  try {
    const pathsToRevalidate = new Set<string>()

    // Adiciona paths para cada locale
    for (const locale of locales) {
      for (const path of paths) {
        // Normaliza o path (remove barras duplicadas)
        const normalizedPath =
          path === '/' || path === '' ? '' : path.startsWith('/') ? path : `/${path}`
        const fullPath = `/${locale}${normalizedPath}`
        pathsToRevalidate.add(fullPath)
      }
    }

    // Adiciona paths sem locale (rota raiz)
    for (const path of paths) {
      const normalizedPath =
        path === '/' || path === '' ? '/' : path.startsWith('/') ? path : `/${path}`
      pathsToRevalidate.add(normalizedPath)
    }

    // Revalida todos os paths únicos
    for (const path of pathsToRevalidate) {
      revalidatePath(path)
    }

    console.log(`Páginas revalidadas: ${Array.from(pathsToRevalidate).join(', ')}`)
  } catch (error) {
    console.error('Erro ao revalidar páginas:', error)
  }
}

/**
 * Revalida páginas de collections (listagem e página individual com slug)
 * @param collectionPath - Path base da collection (ex: '/blog' ou '/produtos')
 * @param slug - Slug do documento (opcional, se não fornecido, revalida apenas a listagem)
 */
export async function revalidateCollection(collectionPath: string, slug?: string) {
  try {
    const pathsToRevalidate = new Set<string>()

    // Normaliza o collectionPath
    const normalizedPath = collectionPath.startsWith('/') ? collectionPath : `/${collectionPath}`

    // Adiciona paths para cada locale
    for (const locale of locales) {
      // Revalida a página de listagem
      const listPath = `/${locale}${normalizedPath}`
      pathsToRevalidate.add(listPath)

      // Se houver slug, revalida também a página individual
      if (slug) {
        const itemPath = `/${locale}${normalizedPath}/${slug}`
        pathsToRevalidate.add(itemPath)
      }
    }

    // Revalida paths sem locale
    pathsToRevalidate.add(normalizedPath)
    if (slug) {
      pathsToRevalidate.add(`${normalizedPath}/${slug}`)
    }

    // Revalida todos os paths únicos
    for (const path of pathsToRevalidate) {
      revalidatePath(path)
    }

    console.log(
      `Collection revalidada: ${normalizedPath}${slug ? ` (slug: ${slug})` : ''} - Paths: ${Array.from(pathsToRevalidate).join(', ')}`,
    )
  } catch (error) {
    console.error('Erro ao revalidar collection:', error)
  }
}

/**
 * Mapeamento de slugs de globals para seus paths
 */
export const globalPaths: Record<string, string[]> = {
  home: ['/', ''],
  contato: ['/contato'],
  download: ['/download'],
  enoturismo: ['/enoturismo'],
  legado: ['/nosso-legado'],
  produtos: ['/produtos'],
  sobre: ['/a-vinicola'],
  blog: ['/blog'],
}
