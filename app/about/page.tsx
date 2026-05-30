import type { Metadata } from 'next';
import Link from 'next/link';
import { CHANNELS, PRINCIPLES } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'О нас — ИнфоТут',
  description: 'ИнфоТут — новостной и информационный проект о главных событиях, контракте на СВО, выплатах и условиях службы.',
};

export default function AboutPage() {
  return (
    <main className="main" style={{ maxWidth: '980px' }}>
      <section className="editorial" style={{ marginTop: 0 }}>
        <div>
          <span className="kicker">О нас</span>
          <h1 className="editorial-title">ИнфоТут — понятные и актуальные материалы без лишней воды</h1>
          <p className="editorial-copy">
            ИнфоТут — новостной и информационный проект, созданный для тех, кто хочет разбираться в главных событиях
            и получать ответы на важные вопросы. Мы публикуем свежие новости по политике, обществу и экономике,
            а также подробные статьи о контракте на СВО: условия службы, выплаты, льготы и реальные истории участников.
          </p>
          <p className="editorial-copy">
            Наша задача — давать понятные, проверенные и актуальные материалы, которые помогают людям быстро находить
            нужную информацию. Для связи: <a href="mailto:info@infotut.ru">info@infotut.ru</a>
          </p>
          <Link href="/feedback" className="editorial-link">Написать в редакцию →</Link>
        </div>
        <div>
          <p className="editorial-team-head">Темы</p>
          <ul className="editorial-team">
            {[
              { name: 'Новости', role: 'политика, общество, экономика' },
              { name: 'Статьи о СВО', role: 'контракт, условия, выплаты, льготы' },
              { name: 'БПЛА', role: 'беспилотные подразделения, требования, служба' },
              { name: 'Истории', role: 'реальный опыт участников СВО' },
            ].map((item) => (
              <li key={item.name}>
                <div className="team-avatar">{item.name.slice(0, 1)}</div>
                <div>
                  <div className="team-name">{item.name}</div>
                  <div className="team-role">{item.role}</div>
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
