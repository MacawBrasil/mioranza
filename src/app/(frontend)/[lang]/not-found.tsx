import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl font-bold mb-4 font-baskervville">Página não encontrada</p>
      <p className="text-lg">Desculpe, a página que você está procurando não existe.</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  )
}

export const metadata = {
  title: 'Página não encontrada',
  description: 'Desculpe, a página que você está procurando não existe.',
}
