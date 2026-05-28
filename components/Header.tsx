'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SECTIONS } from '@/lib/mock-data'

export default function Header({ activeSection }: { activeSection?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const head = document.querySelector<HTMLElement>('.site-head')
    if (!head) return

    let ticking = false

    const update = () => {
      const progress = Math.min(window.scrollY / 120, 1)
      const opacity = Math.max(1 - progress, 0)
      head.style.setProperty('--head-progress', progress.toFixed(3))
      head.style.setProperty('--head-opacity', opacity.toFixed(3))
      head.style.setProperty('--topbar-height', `${44 * opacity}px`)
      head.style.setProperty('--topbar-offset', `${-8 * progress}px`)
      head.style.setProperty('--nav-height', `${96 * opacity}px`)
      head.style.setProperty('--nav-offset', `${-10 * progress}px`)
      head.classList.toggle('site-head-collapsed', progress > 0.96)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="site-head">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span className="topbar-date">Среда, 28 мая 2026</span>
            <span className="topbar-sep">·</span>
            <span className="topbar-weather">
              <span className="dot" />
              Москва +14°C · Малооблачно
            </span>
          </div>
          <div className="topbar-right">
            <Link href="#" className="topbar-link">Подписка</Link>
            <Link href="#" className="topbar-link">Архив</Link>
            <Link href="#" className="topbar-link">Войти</Link>
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
            <button className="search-btn" aria-label="Поиск">
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
              <li key={s.slug} className={activeSection === s.slug ? 'nav-active' : ''}>
                <Link href={`/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
          <Link href="#" className="nav-live">
            <span className="live-dot" />
            Прямой эфир
          </Link>
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
              <a href="/api/rss" target="_blank" rel="noopener noreferrer">RSS</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
