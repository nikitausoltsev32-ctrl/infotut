import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { YandexMetrika } from '@/components/YandexMetrika'
import { CHANNELS } from '@/lib/mock-data'

const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-VariableFont_opsz,wght.ttf', style: 'normal' },
    { path: '../public/fonts/Inter-Italic-VariableFont_opsz,wght.ttf', style: 'italic' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Инфотут — независимые новости России', template: '%s | Инфотут' },
  description: 'Независимое издание о России. Политика, экономика, культура, наука — только проверенные факты.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://infotut.ru'),
  openGraph: {
    siteName: 'Инфотут',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <YandexMetrika />
      </head>
      <body>
        <Header />
        <div className="page">{children}</div>
        <Footer channels={CHANNELS} />
      </body>
    </html>
  )
}
