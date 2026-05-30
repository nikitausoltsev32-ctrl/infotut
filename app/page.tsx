import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import NewsletterForm from '@/components/NewsletterForm';
import {
  HERO_ARTICLE,
  SECONDARY_ARTICLES,
  TICKER_ITEMS,
  FEATURES_ARTICLES,
  OPINIONS,
  MOST_READ,
  POLITICS_ARTICLES,
  TECH_ARTICLES,
  CHANNELS,
  PROJECTS,
  PRINCIPLES,
} from '@/lib/mock-data';

export default function HomePage() {
  return (
    <main className="main">
      <div className="lead-row">
        <HeroSection article={HERO_ARTICLE} />
        <aside className="hero-aside">
          <div className="ticker">
            <div className="ticker-head">
              <h4>Лента</h4>
              <span className="ticker-sub">обновлено {TICKER_ITEMS[0].time}</span>
            </div>
            <ol className="ticker-list">
              {TICKER_ITEMS.map((item, i) => (
                <li key={i}>
                  <span className="ticker-time">{item.time}</span>
                  <span className="ticker-text">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="channels">
            <div className="channels-head">
              <h4>Подпишитесь</h4>
              <span className="channels-sub">5 каналов · 600 000+</span>
            </div>
            <ul className="channels-list">
              {CHANNELS.map((c) => (
                <li key={c.name} className="channel">
                  <span className="channel-mark">{c.short}</span>
                  <div className="channel-text">
                    <div className="channel-name">{c.name}</div>
                    <div className="channel-handle">{c.handle}</div>
                  </div>
                  <span className="channel-subs">{c.subs}</span>
                </li>
              ))}
            </ul>
            <Link href="/about#channels" className="channels-all">Все каналы редакции →</Link>
          </div>

          <div className="about-card">
            <span className="kicker">О сайте</span>
            <p className="about-card-text">
              Infotut.ru — независимое издание о России. С 2008 года рассказываем о политике, экономике, культуре и науке без сенсаций и без партий. Только проверенные факты и редакторский разбор каждой темы.
            </p>
            <Link href="/about" className="about-card-link">Подробнее о редакции →</Link>
          </div>
        </aside>
      </div>

      <div className="secondary">
        {SECONDARY_ARTICLES.map((a) => (
          <NewsCard key={a.id} article={a} variant="secondary" />
        ))}
      </div>

      <section>
        <div className="section-head">
          <h2>Политика · {POLITICS_ARTICLES.length} материалов</h2>
          <Link href="/politika" className="section-more">Все новости рубрики →</Link>
        </div>
        <div className="cat-grid cat-grid-6">
          <NewsCard article={POLITICS_ARTICLES[0]} variant="cat-lead" />
          {POLITICS_ARTICLES.slice(1, 4).map((a) => (
            <NewsCard key={a.id} article={a} variant="category" />
          ))}
        </div>
        <div className="pol-feature-row">
          <NewsCard article={POLITICS_ARTICLES[4]} variant="feature" />
          <div className="pol-feature-side">
            {POLITICS_ARTICLES.slice(5, 7).map((a) => (
              <NewsCard key={a.id} article={a} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>Длинные тексты</h2>
          <Link href="/obshchestvo" className="section-more">Все материалы →</Link>
        </div>
        <div className="features-grid">
          <NewsCard article={FEATURES_ARTICLES[0]} variant="feature-lead" />
          <NewsCard article={FEATURES_ARTICLES[1]} variant="feature" />
        </div>
      </section>

      <div className="photo-day">
        <div className="imgslot" style={{ aspectRatio: '3/2' }}>
          <Image fill src="/placeholder.jpg" alt="Фото дня" style={{ objectFit: 'cover' }} />
        </div>
        <div className="photo-body">
          <span className="kicker">Фотография дня</span>
          <p className="photo-caption">Туман над Камой. Пермский край, утро 9 мая</p>
          <span className="photo-credit">Фото: А. Тимофеев / Infotut</span>
        </div>
      </div>

      <section>
        <div className="section-head">
          <h2>Технологии · {TECH_ARTICLES.length} материалов</h2>
          <Link href="/tekhnologii" className="section-more">Перейти в рубрику →</Link>
        </div>
        <div className="cat-grid cat-grid-12">
          {TECH_ARTICLES.map((item, i) => (
            <article key={i} className="tech-card">
              <span className="kicker">{item.kicker}</span>
              <h3 className="tech-title">{item.title}</h3>
              <div className="tech-time">{item.time}</div>
            </article>
          ))}
        </div>
      </section>

      <div className="editorial">
        <div>
          <span className="kicker">О редакции</span>
          <h2 className="editorial-title">Восемнадцать лет независимой журналистики</h2>
          <p className="editorial-copy">
            Мы пишем о том, что определяет ежедневную жизнь в России — от решений власти до тихих процессов в обществе.
            Без сенсаций и без партий. Только проверенные факты, прозрачные источники и редакторский разбор каждой темы.
          </p>
          <Link href="/about" className="editorial-link">Подробнее о нас →</Link>
          <div className="editorial-stats">
            {[
              { value: '61', label: 'штатный корреспондент' },
              { value: '27', label: 'городов в редакционной сети' },
              { value: '2,4 млн', label: 'уникальных читателей в месяц' },
              { value: '184', label: 'лонгрида в 2025 году' },
            ].map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="editorial-team-head">Редакция</p>
          <ul className="editorial-team">
            {[
              { name: 'Екатерина Новикова', role: 'Главный редактор' },
              { name: 'Михаил Серов', role: 'Зам. главного редактора' },
              { name: 'Анна Розова', role: 'Редактор отдела политики' },
              { name: 'Иван Дёмин', role: 'Редактор спецпроектов' },
            ].map((m) => (
              <li key={m.name}>
                <div className="team-avatar">
                  {m.name.split(' ').map((x) => x[0]).join('')}
                </div>
                <div>
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/about" className="editorial-link">Вся команда — 61 человек →</Link>
        </div>
      </div>

      <div className="aside-cols">
        <div className="opinion">
          <div className="section-head">
            <h2>Мнения</h2>
            <Link href="/mneniya" className="section-more">Все колонки →</Link>
          </div>
          <ul className="opinion-list">
            {OPINIONS.map((o) => (
              <li key={o.title}>
                <div className="opinion-author">{o.author}</div>
                <div className="opinion-title">«{o.title}»</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mostread">
          <div className="section-head">
            <h2>Читают сейчас</h2>
          </div>
          <ol className="mostread-list">
            {MOST_READ.map((text, i) => (
              <li key={i}>
                <span className="mostread-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mostread-text">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <section>
        <div className="section-head">
          <h2>Наши проекты</h2>
          <Link href="/search?q=спецпроект" className="section-more">Архив спецпроектов →</Link>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <article key={p.title} className={`project project-${p.tone}`}>
              <span className="kicker">{p.kicker}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <span className="project-cta">Открыть →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="principles">
        <div className="principles-head">
          <h2>Как мы работаем</h2>
          <p>Три простых правила, которым следует редакция Infotut с момента основания.</p>
        </div>
        <div className="principles-grid">
          {PRINCIPLES.map((p, i) => (
            <article key={p.title} className="principle">
              <div className="principle-num">{String(i + 1).padStart(2, '0')}</div>
              <span className="kicker">{p.kicker}</span>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-copy">{p.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="newsletter">
        <div className="newsletter-text">
          <h3>Утренняя рассылка</h3>
          <p>Семь главных историй дня — каждое утро в 8:00. Без спама, без рекламы.</p>
        </div>
        <NewsletterForm />
      </div>
    </main>
  );
}
