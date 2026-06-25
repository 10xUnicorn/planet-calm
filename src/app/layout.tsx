import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Planet Calm — Dashboard',
  description: 'Calm-First Leadership Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
