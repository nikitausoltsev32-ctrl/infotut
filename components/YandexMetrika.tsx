'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window { ym: (id: number, action: string, ...args: unknown[]) => void }
}

export function YandexMetrika() {
  const pathname = usePathname()
  const id = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID)

  useEffect(() => {
    if (!id) return
    window.ym?.(id, 'hit', pathname)
  }, [pathname, id])

  if (!id) return null

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`,
      }}
    />
  )
}
