import Link from 'next/link';

export default function Footer() {
  const categories = [
    {
      title: 'Рубрики',
      links: [
        { label: 'Политика', slug: 'politika' },
        { label: 'Экономика', slug: 'ekonomika' },
        { label: 'Общество', slug: 'obshchestvo' },
        { label: 'Культура', slug: 'kultura' },
        { label: 'Спорт', slug: 'sport' },
        { label: 'Технологии', slug: 'tekhnologii' },
      ],
    },
    {
      title: 'Редакция',
      links: [
        { label: 'О нас', slug: 'about' },
        { label: 'Контакты', slug: 'feedback' },
        { label: 'Политика конф.', slug: 'privacy' },
        { label: 'Условия', slug: 'terms' },
      ],
    },
    {
      title: 'Сервисы',
      links: [
        { label: 'Поиск', slug: 'search' },
        { label: 'RSS', slug: 'rss.xml' },
        { label: 'Карта сайта', slug: 'sitemap.xml' },
      ],
    },
  ];

  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <Link href="/" className="logo">
            <svg className="logo-icon" width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
              <path d="M4 4.25H2.75A1.75 1.75 0 0 0 1 6v7.25A2.75 2.75 0 0 0 3.75 16H17.5A3.5 3.5 0 0 0 21 12.5V3.75A1.75 1.75 0 0 0 19.25 2H5.75A1.75 1.75 0 0 0 4 3.75V14.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.25 5.75H17.5M7.25 8.5H17.5M7.25 11.25H13.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/>
              <path d="M4 13.5V6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round"/>
            </svg>
            <span><span className="logo-info">Инфо</span><span className="logo-tut">Тут</span></span>
          </Link>
          <p>Независимое издание о России. Политика, экономика, культура, наука — только проверенные факты.</p>
        </div>

        <div className="foot-cols">
          {categories.map((col) => (
            <div key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link.slug}>
                    <Link href={`/${link.slug}`}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="foot-bot">
        <span>© 2026 Инфотут. Все права защищены.</span>
        <div className="foot-links">
          <Link href="/privacy">Политика конф.</Link>
          <Link href="/terms">Условия</Link>
          <Link href="/feedback">Контакты</Link>
        </div>
      </div>
    </footer>
  );
}
