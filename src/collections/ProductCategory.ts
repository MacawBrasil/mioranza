import { CollectionConfig } from 'payload'

const ProductCategory: CollectionConfig = {
  slug: 'productCategory',
  labels: {
    plural: 'Categorias Produto',
    singular: 'Categoria Produto',
  },
  admin: {
    useAsTitle: 'titulo',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'destaque', type: 'checkbox' },
    {
      name: 'cor',
      type: 'text',
      required: true,
      admin: { description: 'Exemplo: #FFFFFF' },
    },
    { name: 'titulo', type: 'text', localized: true },
    {
      name: 'imagem',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: { description: 'Tamanho: 110x413' },
    },
    {
      name: 'produto',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'SubCateroria',
      type: 'relationship',
      relationTo: 'productSubCategory',
      hasMany: true,
    },
  ],
}

export default ProductCategory
