import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espaço da Beleza - Salão de Beleza',
  description: 'Serviços de manicure, pedicure e cuidados com cabelo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
