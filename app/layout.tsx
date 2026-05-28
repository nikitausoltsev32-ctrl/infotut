import type { Metadata } from 'next'
import { Geist, Geist_Mono, Newsreader, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CHANNELS } from '@/lib/mock-data'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const newsreader = Newsreader({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
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
    <html lang="ru" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable} ${ibmPlexSans.variable}`}>
      <body>
        <Header />
        <div className="page">{children}</div>
        <Footer channels={CHANNELS} />
      </body>
    </html>
  )
}
