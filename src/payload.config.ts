import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import BlogCategory from './collections/BlogCategory'
import ProductCategory from './collections/ProductCategory'
import Products from './collections/Products'
import ProductSubCategory from './collections/ProductSubCateroty'
import Blog from './globals/Blog'
import Contato from './globals/Contato'
import Download from './globals/Download'
import Enoturismo from './globals/Enoturismo'
import Home from './globals/Home'
import Legado from './globals/Legado'
import Produtos from './globals/Produtos'
import Settings from './globals/Settings'
import Sobre from './globals/Sobre'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      {
        code: 'pt',
        label: 'Portugues',
      },
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'es',
        label: 'Spain',
      },
    ],
    defaultLocale: 'pt',
    fallback: true,
  },
  collections: [Users, Media, Posts, ProductCategory, Products, BlogCategory, ProductSubCategory],
  globals: [Home, Blog, Legado, Contato, Download, Enoturismo, Produtos, Settings, Sobre],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
