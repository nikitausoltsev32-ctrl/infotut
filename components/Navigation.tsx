'use client'

import { useState } from 'react'
import Link from 'next/link'

const SECTIONS = [
  { name: 'Политика', slug: 'politika' },
  { name: 'Экономика', slug: 'ekonomika' },
  { name: 'Общество', slug: 'obshchestvo' },
  { name: 'Культура', slug: 'kultura' },
  { name: 'Спорт', slug: 'sport' },
  { name: 'Технологии', slug: 'tekhnologii' },
  { name: 'Мнения', slug: 'mneniya' },
]

export default function Navigation({ activeSection }: { activeSection?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-stretch border-b border-[var(--rule)] bg-[var(--paper)]" aria-label="Основная навигация">
        <ul className="max-w-[1360px] w-full mx-auto px-5 flex items-stretch font-serif text-[17px] font-medium">
          {SECTIONS.map((s, i) => (
            <li
              key={s.slug}
              className={[
                'flex-1 flex items-center justify-center',
                i > 0 ? 'border-l border-[var(--rule)]' : '',
                activeSection === s.slug ? 'nav-active' : '',
              ].join(' ')}
            >
              <Link
                href={`/${s.slug}`}
                className={[
                  'relative inline-block px-3 py-1.5 whitespace-nowrap transition-colors',
                  activeSection === s.slug ? 'text-[var(--ink)]' : 'text-[var(--ink-2)] hover:text-[var(--accent)]',
                ].join(' ')}
              >
                {s.name}
                {activeSection === s.slug && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[var(--accent)]" />
                )}
              </Link>
            </li>
          ))}
          <li className="border-l border-[var(--rule)] flex items-center justify-center flex-none">
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[var(--ink-3)] hover:text-[var(--accent)] transition-colors font-mono text-[11px] tracking-widest uppercase"
              aria-label="Поиск"
            >
              🔍 <span>Поиск</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile burger button */}
      <div className="md:hidden flex items-center border-b border-[var(--rule)] bg-[var(--paper)] px-5 py-2 justify-between">
        <button
          className="flex flex-col justify-center gap-1 w-9 h-9 border border-[var(--rule)] rounded bg-transparent p-2"
          aria-label="Открыть меню"
          onClick={() => setOpen(true)}
        >
          <span className="block h-px bg-[var(--ink)] rounded" />
          <span className="block h-px bg-[var(--ink)] rounded" />
          <span className="block h-px bg-[var(--ink)] rounded" />
        </button>
        <Link
          href="/search"
          className="flex items-center gap-1 text-[var(--ink-3)] hover:text-[var(--accent)] transition-colors font-mono text-[11px] tracking-widest uppercase"
          aria-label="Поиск"
        >
          🔍 Поиск
        </Link>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true" aria-label="Навигация">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-[280px] bg-[var(--paper)] flex flex-col overflow-y-auto overscroll-contain">
            <div className="flex items-center justify-between px-5 py-[18px] border-b border-[var(--rule)]">
              <span className="font-serif font-semibold text-[var(--ink)] text-lg">Меню</span>
              <button
                className="w-8 h-8 border border-[var(--rule)] rounded flex items-center justify-center text-[var(--ink)] bg-transparent"
                aria-label="Закрыть"
                onClick={() => setOpen(false)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>
            <ul className="py-3">
              {SECTIONS.map((s) => (
                <li key={s.slug} className="border-b border-[var(--rule-soft)]">
                  <Link
                    href={`/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className={[
                      'block px-5 py-3.5 font-serif text-[18px] font-medium transition-colors',
                      activeSection === s.slug ? 'text-[var(--ink)]' : 'text-[var(--ink-2)] hover:text-[var(--accent)]',
                    ].join(' ')}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li className="border-b border-[var(--rule-soft)]">
                <Link
                  href="/search"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-5 py-3.5 font-mono text-[13px] text-[var(--ink-3)] hover:text-[var(--accent)] transition-colors"
                >
                  🔍 Поиск
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
