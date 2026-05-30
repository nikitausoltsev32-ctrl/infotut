'use client'

import { useLayoutEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SECTIONS } from '@/lib/mock-data'

export default function Header({ activeSection }: { activeSection?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentSection = activeSection ?? pathname.split('/').filter(Boolean)[0]
  const currentDate = useMemo(() => {
    const formatted = new Intl.DateTimeFormat('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Moscow',
    }).format(new Date())

    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }, [])

  useLayoutEffect(() => {
    const head = document.querySelector<HTMLElement>('.site-head')
    if (!head) return

    let settleTimer: number | undefined

    const update = () => {
      const y = window.scrollY
      const collapsed = head.classList.contains('site-head-collapsed')
      // Hysteresis so the header never flickers around the threshold.
      if (!collapsed && y > 90) head.classList.add('site-head-collapsed')
      else if (collapsed && y < 50) head.classList.remove('site-head-collapsed')
    }

    const onScroll = () => {
      window.clearTimeout(settleTimer)
      update()
      settleTimer = window.setTimeout(update, 160)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('scrollend', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      window.removeEventListener('scrollend', update)
      window.clearTimeout(settleTimer)
    }
  }, [])

  return (
    <>
      <div className="site-head">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span className="topbar-date">{currentDate}</span>
            <span className="topbar-sep">·</span>
            <span className="topbar-weather">
              <span className="dot" />
              Москва +14°C · Малооблачно
            </span>
          </div>
          <div className="topbar-right">
            <Link href="/rss.xml" className="topbar-link">RSS</Link>
            <Link href="/feedback" className="topbar-link">Контакты</Link>
          </div>
        </div>
      </div>

      <header className="masthead">
        <div className="masthead-row">
          <button
            className="hamburger"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
          <Link href="/" className="logo">
            <svg className="logo-icon" width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
              <path d="M4 4.25H2.75A1.75 1.75 0 0 0 1 6v7.25A2.75 2.75 0 0 0 3.75 16H17.5A3.5 3.5 0 0 0 21 12.5V3.75A1.75 1.75 0 0 0 19.25 2H5.75A1.75 1.75 0 0 0 4 3.75V14.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.25 5.75H17.5M7.25 8.5H17.5M7.25 11.25H13.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/>
              <path d="M4 13.5V6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/>
            </svg>
            <span><span className="logo-info">Инфо</span><span className="logo-tut">Тут</span></span>
          </Link>
          <div className="masthead-actions">
            <button className="search-btn" aria-label="Поиск" onClick={() => router.push('/search')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span className="search-label">Поиск</span>
            </button>
          </div>
        </div>

        <nav className="nav" aria-label="Основная навигация">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.slug} className={currentSection === s.slug ? 'nav-active' : ''}>
                <Link href={`/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
          <span className="nav-live">
            <span className="live-dot" />
            Прямой эфир
          </span>
        </nav>
      </header>
      </div>
      {menuOpen && (
        <div className="mobile-overlay" role="dialog" aria-modal="true" aria-label="Навигация">
          <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-head">
              <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
                <svg className="logo-icon" width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
                  <path d="M4 4.25H2.75A1.75 1.75 0 0 0 1 6v7.25A2.75 2.75 0 0 0 3.75 16H17.5A3.5 3.5 0 0 0 21 12.5V3.75A1.75 1.75 0 0 0 19.25 2H5.75A1.75 1.75 0 0 0 4 3.75V14.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.25 5.75H17.5M7.25 8.5H17.5M7.25 11.25H13.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/>
                  <path d="M4 13.5V6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/>
                </svg>
                <span><span className="logo-info">Инфо</span><span className="logo-tut">Тут</span></span>
              </Link>
              <button className="mobile-close" aria-label="Закрыть" onClick={() => setMenuOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>
            <ul className="mobile-nav-list">
              {SECTIONS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} onClick={() => setMenuOpen(false)}>{s.name}</Link>
                </li>
              ))}
            </ul>
            <div className="mobile-socials">
              <a href="https://t.me/infotut_ru" target="_blank" rel="noopener noreferrer">TG</a>
              <a href="https://vk.com/infotut" target="_blank" rel="noopener noreferrer">VK</a>
              <a href="https://dzen.ru/infotut" target="_blank" rel="noopener noreferrer">Дзен</a>
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
