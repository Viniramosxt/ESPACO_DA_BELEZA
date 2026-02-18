import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Espaço da Beleza | Salão de Beleza em Manaus',
  description: 'Transformando autoestima em beleza desde 2011. Serviços de cabelo, manicure, pedicure e sobrancelhas na Zona Norte de Manaus. Por Soraia Fernandes.',
  keywords: 'salão de beleza, manaus, cabelo, manicure, pedicure, progressiva, sobrancelha, zona norte, nova cidade',
  openGraph: {
    title: 'Espaço da Beleza | Salão de Beleza em Manaus',
    description: 'Transformando autoestima em beleza desde 2011. Agende seu horário!',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-dark-950 text-white antialiased">{children}</body>
    </html>
  )
}
