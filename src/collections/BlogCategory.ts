import { CollectionConfig } from 'payload'

const BlogCategory: CollectionConfig = {
  slug: 'blogCategory',
  labels: {
    plural: 'Categorias Blog',
    singular: 'Categoria Blog',
  },
  admin: {
    useAsTitle: 'titulo',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'titulo', type: 'text', localized: true },
    {
      name: 'postagem',
      type: 'relationship',
      relationTo: 'posts',
      localized: true,
      hasMany: true,
    },
  ],
}

export default BlogCategory
