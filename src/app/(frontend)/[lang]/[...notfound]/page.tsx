import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Página não encontrada',
  description: 'Desculpe, a página que você está procurando não existe.',
}

export default function NotFound() {
  return notFound()
}
