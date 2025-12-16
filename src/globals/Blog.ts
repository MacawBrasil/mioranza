import { GlobalConfig } from 'payload'

const Blog: GlobalConfig = {
  slug: 'blog',
  label: 'Página Blog',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 1039x631' },
    },
    { name: 'titulo', type: 'text', localized: true },
    { name: 'description', type: 'text', localized: true },
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
  ],
}
export default Blog
