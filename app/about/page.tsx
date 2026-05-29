import type { Metadata } from 'next';
import Link from 'next/link';
import { CHANNELS, PRINCIPLES } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'О редакции',
  description: 'Инфотут — независимое новостное издание о России, редакционных принципах и каналах связи.',
};

export default function AboutPage() {
  return (
    <main className="main" style={{ maxWidth: '980px' }}>
      <section className="editorial" style={{ marginTop: 0 }}>
        <div>
          <span className="kicker">О редакции</span>
          <h1 className="editorial-title">Инфотут пишет о том, что влияет на повседневную жизнь</h1>
          <p className="editorial-copy">
            Мы собираем главные новости по политике, экономике, обществу, культуре, спорту и технологиям.
            Формат проекта — спокойная новостная лента, рубрики, разборы и RSS для внешних площадок.
          </p>
          <Link href="/feedback" className="editorial-link">Связаться с редакцией →</Link>
        </div>
        <div>
          <p className="editorial-team-head">Разделы</p>
          <ul className="editorial-team">
            {['Политика', 'Экономика', 'Общество', 'Культура'].map((name) => (
              <li key={name}>
                <div className="team-avatar">{name.slice(0, 1)}</div>
                <div>
                  <div className="team-name">{name}</div>
                  <div className="team-role">ежедневная лента и редакционный отбор</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="principles">
        <div className="principles-head">
          <h2>Редакционные принципы</h2>
          <p>Коротко о том, как проект должен работать после подключения реального CMS-контента.</p>
        </div>
        <div className="principles-grid">
          {PRINCIPLES.map((item, index) => (
            <article key={item.title} className="principle">
              <div className="principle-num">{String(index + 1).padStart(2, '0')}</div>
              <span className="kicker">{item.kicker}</span>
              <h3 className="principle-title">{item.title}</h3>
              <p className="principle-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="channels">
        <div className="section-head">
          <h2>Каналы</h2>
          <Link href="/rss.xml" className="section-more">RSS →</Link>
        </div>
        <div className="projects-grid">
          {CHANNELS.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              className="project"
              target={channel.url.startsWith('http') ? '_blank' : undefined}
              rel={channel.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="kicker">{channel.short}</span>
              <h3 className="project-title">{channel.name}</h3>
              <p className="project-desc">{channel.handle}</p>
              <span className="project-cta">{channel.subs}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
