import { CollectionConfig } from 'payload'

const ProductSubCategory: CollectionConfig = {
  slug: 'productSubCategory',
  labels: {
    plural: 'Sub Categorias Produto',
    singular: 'Sub Categoria Produto',
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
      name: 'categorias',
      type: 'relationship',
      relationTo: 'productCategory',
      hasMany: true,
    },
    {
      name: 'produtos',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
  ],
}

export default ProductSubCategory
