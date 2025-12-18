import { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { revalidateCollection, revalidatePages, globalPaths } from '@/utilities/revalidate'

const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    plural: 'Postagens',
    singular: 'Postagem',
  },
  admin: {
    useAsTitle: 'chamada',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Revalida a página de listagem do blog
        await revalidateCollection('/blog')

        // Se houver slug, revalida também a página individual
        if (doc.slug) {
          await revalidateCollection('/blog', doc.slug as string)
        }

        // Revalida a home, pois ela também exibe posts
        await revalidatePages(globalPaths.home)
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        // Revalida a página de listagem após deletar
        await revalidateCollection('/blog')
        // Revalida a home, pois ela também exibe posts
        await revalidatePages(globalPaths.home)
      },
    ],
  },
  fields: [
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 1920x603' },
    },
    {
      name: 'thumb',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 400x320' },
    },
    { name: 'chamada', type: 'text', localized: true },
    { name: 'descricao', type: 'text', localized: true },
    { name: 'texto', type: 'richText', localized: true },
    {
      name: 'categoria',
      type: 'relationship',
      relationTo: 'blogCategory',
      localized: true,
    },
    {
      name: 'Seo',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'titulo',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'descricao',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'palavrasChave',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'ImagemCompartilhada',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem de compartilhamento - Sem tamanho padrao',
          localized: true,
        },
      ],
    },
    slugField(),
  ],
}

export default Posts
