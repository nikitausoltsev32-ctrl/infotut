/* global React */
// News homepage — Russian-language editorial news site.
// Responsive via CSS container queries; each instance is wrapped in a
// container-type:inline-size root so it reflows to the artboard width.

const news = {
  date: 'Понедельник, 11 мая 2026',
  weather: '+14°C · Малооблачно',
  city: 'Москва',
  sections: ['Политика', 'Экономика', 'Общество', 'Культура', 'Спорт', 'Технологии', 'Мнения'],
  hero: {
    kicker: 'Экономика',
    title: 'Правительство утвердило программу поддержки малого бизнеса на 2026 год',
    lede:
      'Объём финансирования превысит 480 миллиардов рублей. Меры включают льготные кредиты, продлённые налоговые каникулы для новых предприятий и расширение системы микрозаймов в регионах.',
    author: 'Алексей Воронцов',
    time: '23 минуты назад',
    reads: '12 408',
  },
  secondary: [
    {
      kicker: 'Технологии',
      title: 'Российские учёные представили прототип нейроинтерфейса нового поколения',
      lede: 'Разработка позволяет управлять курсором силой мысли с задержкой меньше 40 мс.',
      time: '1 час назад',
    },
    {
      kicker: 'Культура',
      title: 'В Третьяковской галерее открылась ретроспектива работ Натальи Гончаровой',
      lede: 'Выставка объединила более 350 произведений из 14 музеев России и Европы.',
      time: '2 часа назад',
    },
    {
      kicker: 'Спорт',
      title: 'Сборная по хоккею вышла в финал чемпионата мира',
      lede: 'Решающий гол был забит на 58-й минуте овертайма.',
      time: '3 часа назад',
    },
  ],
  ticker: [
    { time: '14:32', text: 'ЦБ сохранил ключевую ставку на уровне 16% — третий раз подряд' },
    { time: '14:18', text: 'Аэрофлот объявил о запуске прямых рейсов Москва — Бишкек с 1 июня' },
    { time: '13:55', text: 'В Санкт-Петербурге открылся седьмой международный книжный фестиваль' },
    { time: '13:40', text: 'Учёные МГУ нашли в Подмосковье останки мамонта возрастом 23 000 лет' },
    { time: '13:12', text: 'Минцифры запускает единый сервис восстановления паролей через Госуслуги' },
    { time: '12:48', text: 'В Сочи стартует чемпионат России по парусному спорту' },
    { time: '12:21', text: 'Эрмитаж получил в дар коллекцию голландской живописи XVII века' },
  ],
  features: [
    {
      kicker: 'Долгое чтение',
      title: 'Как маленькие города учатся жить без больших заводов',
      lede:
        'Репортаж из четырёх моногородов, где открываются креативные кластеры, ремесленные мастерские и логистические хабы. Что работает, а что — нет.',
      author: 'Мария Лебедева',
      readTime: '14 мин',
    },
    {
      kicker: 'Интервью',
      title: '«Архитектура — это медленное искусство». Беседа со Сергеем Чобаном',
      lede:
        'Архитектор о новом облике Москвы, будущем стекла и бетона и о том, почему здания должны стареть красиво.',
      author: 'Иван Дёмин',
      readTime: '22 мин',
    },
  ],
  opinion: [
    { author: 'Е. Новикова', title: 'Почему школа всё ещё не готова к ИИ — и почему это нормально' },
    { author: 'Д. Полонский', title: 'Цена тишины: что мы теряем в эпоху бесконечного контента' },
    { author: 'А. Симонян', title: 'Дроны над виноградниками: новая экономика российского юга' },
  ],
  mostRead: [
    'Карта новых платных трасс: где появятся пункты оплаты до конца года',
    'Десять книг, которые рекомендуют учителя литературы 2026 года',
    'Почему стоимость аренды в столицах падает второй квартал подряд',
    'Тест: угадайте советский фильм по одному кадру',
    'Гид по майским выходным: куда поехать без машины',
  ],
  culture: {
    kicker: 'Фотография дня',
    caption: 'Туман над Камой. Пермский край, утро 9 мая',
    credit: 'Фото: А. Тимофеев / Infotut',
  },
  channels: [
    { name: 'Telegram',   handle: '@infotut_ru',     subs: '284 000', short: 'TG' },
    { name: 'ВКонтакте',  handle: 'vk.com/infotut',  subs: '156 000', short: 'VK' },
    { name: 'Дзен',       handle: 'dzen.ru/infotut', subs: '92 400',  short: 'Z'  },
    { name: 'YouTube',    handle: '@infotut',        subs: '48 600',  short: 'YT' },
    { name: 'Подкасты',   handle: '«Звуки города»',  subs: '21 300',  short: '♪'  },
  ],
  politicsCategory: [
    { kicker: 'Госдума',          title: 'Принят закон о цифровом нотариате — что меняется для бизнеса',         lede: 'Электронные доверенности станут равноправными бумажным с 1 сентября.',   time: '12 минут назад' },
    { kicker: 'Регионы',          title: 'Губернаторы Сибири обсудили общий план развития транспорта',           lede: 'Речь о новой ветке БАМа и расширении аэропорта Новосибирска.',           time: '47 минут назад' },
    { kicker: 'Совфед',           title: 'Сенаторы поддержали пилот четырёхдневной рабочей недели',              lede: 'Эксперимент пройдёт в 12 компаниях из шести регионов.',                  time: '1 час назад'    },
    { kicker: 'Внешняя политика', title: 'Россия и Индия подписали соглашение о совместных лунных миссиях',      lede: 'Первая миссия запланирована на 2028 год.',                                time: '2 часа назад'   },
    { kicker: 'Партии',           title: '«Новые люди» представили программу реформы высшего образования',       lede: 'Главные пункты — гибкие траектории и снижение бюрократии.',              time: '3 часа назад'   },
    { kicker: 'Кремль',           title: 'Опубликован указ о новых принципах работы с обращениями граждан',       lede: 'Срок ответа сокращён с 30 до 15 рабочих дней.',                          time: '4 часа назад'   },
  ],
  techCategory: [
    { kicker: 'AI',          title: 'Яндекс выпустил версию GPT-движка с открытыми весами',         time: '08:42' },
    { kicker: 'Космос',      title: '«Роскосмос» подтвердил пуск трёх «Глонасс-К2» в июне',           time: '08:15' },
    { kicker: 'Госуслуги',   title: 'Единый ID для платежей в общественном транспорте — пилот',      time: '07:50' },
    { kicker: 'Стартапы',    title: 'Казанский стартап получил $4 млн на платформу для агросектора',  time: '07:28' },
    { kicker: 'Энергетика',  title: 'Первая в России АЭС малой мощности подключена к сети',           time: '07:05' },
    { kicker: 'IT-кадры',    title: 'Минцифры расширило льготную ипотеку для разработчиков',          time: '06:40' },
    { kicker: 'Авто',        title: 'Сборка электромобилей «Атом» вышла на проектную мощность',       time: '06:12' },
    { kicker: 'Биотех',      title: 'Зарегистрирована вакцина против вируса Кетцаль',                  time: '05:55' },
    { kicker: 'Финтех',      title: 'СБП теперь работает в шести странах СНГ без комиссии',           time: '05:30' },
    { kicker: 'Игры',        title: 'Российская студия выпустила симулятор советского быта',          time: 'вчера' },
    { kicker: 'Хардвер',     title: '«Эльбрус» представил восьмиядерный процессор для серверов',       time: 'вчера' },
    { kicker: 'Регионы',     title: 'В Перми открылся первый центр квантовых вычислений на Урале',    time: 'вчера' },
  ],
  editorial: {
    title: 'Восемнадцать лет независимой журналистики',
    copy:
      'Мы пишем о том, что определяет ежедневную жизнь в России — от решений власти до тихих процессов в обществе. Без сенсаций и без партий. Только проверенные факты, прозрачные источники и редакторский разбор каждой темы.',
    stats: [
      { value: '61',       label: 'штатных корреспондентов' },
      { value: '27',       label: 'городов в редакционной сети' },
      { value: '2,4 млн',  label: 'уникальных читателей в месяц' },
      { value: '184',      label: 'лонгрида в 2025 году' },
    ],
    team: [
      { name: 'Екатерина Новикова', role: 'Главный редактор' },
      { name: 'Михаил Серов',       role: 'Зам. главного редактора' },
      { name: 'Анна Розова',        role: 'Редактор отдела политики' },
      { name: 'Иван Дёмин',         role: 'Редактор спецпроектов' },
    ],
  },
  projects: [
    { kicker: 'Спецпроект',  title: 'Россия из окна поезда',  desc: '14 эссе и 240 кадров о людях, живущих вдоль Транссиба.',   tone: 'a' },
    { kicker: 'Подкаст',     title: 'Звуки города',           desc: 'Полевые записи и разговоры с горожанами 32 городов.',     tone: 'b' },
    { kicker: 'Архив',       title: 'Карта пожаров 2024',     desc: 'Интерактивная хроника лесных пожаров за прошлый год.',     tone: 'c' },
    { kicker: 'Лаборатория', title: 'Тест-полоса',            desc: 'Эксперименты с форматами — данные, лонгриды, видео.',     tone: 'd' },
  ],
  principles: [
    { kicker: 'Принципы',     title: 'Только проверенные факты',                copy: 'Каждый материал проходит фактчек и сверку с первоисточниками. Поправки публикуем в течение часа после подтверждения ошибки.' },
    { kicker: 'Прозрачность', title: 'Раскрытие источников финансирования',     copy: 'Издание принадлежит фонду «Свободное слово». Полный отчёт о доходах и расходах публикуется ежеквартально в открытом архиве.' },
    { kicker: 'Реклама',      title: 'Партнёрские материалы всегда отмечаются', copy: 'Спонсорские публикации помечаются плашкой «Партнёрский материал» и отделены от редакционного потока. Реклама не влияет на повестку.' },
  ],
};

// ── Building blocks ────────────────────────────────────────────────

const Kicker = ({ children }) => (
  <span className="kicker">{children}</span>
);

const Meta = ({ author, time, reads, readTime }) => (
  <div className="meta">
    {author && <span>{author}</span>}
    {time && <span className="meta-dot">·</span>}
    {time && <span>{time}</span>}
    {readTime && <span className="meta-dot">·</span>}
    {readTime && <span>{readTime}</span>}
    {reads && <span className="meta-dot">·</span>}
    {reads && <span>{reads} прочтений</span>}
  </div>
);

// SVG image placeholder — subtle stripes + monospace label
const ImgSlot = ({ label, ratio = '3 / 2', tone = 'warm' }) => {
  const palette = tone === 'warm'
    ? { bg: '#ece6d8', stripe: '#dfd6c2', ink: '#6a5e44' }
    : tone === 'ink'
      ? { bg: '#1f1c17', stripe: '#2a2620', ink: '#9c8f76' }
      : { bg: '#e6e1d4', stripe: '#d8d1bf', ink: '#675c43' };
  return (
    <div className="imgslot" style={{ aspectRatio: ratio, background: palette.bg }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern id={`s-${label}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={palette.stripe} strokeWidth="3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#s-${label})`} />
      </svg>
      <span className="imgslot-label" style={{ color: palette.ink }}>{label}</span>
    </div>
  );
};

// ── Sub-sections ───────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span className="topbar-date">{news.date}</span>
          <span className="topbar-sep">·</span>
          <span className="topbar-weather"><span className="dot" /> {news.city} {news.weather}</span>
        </div>
        <div className="topbar-right">
          <a className="topbar-link" href="#">Подписка</a>
          <a className="topbar-link" href="#">Архив</a>
          <a className="topbar-link" href="#">Войти</a>
        </div>
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead-row">
        <button className="hamburger" aria-label="Меню">
          <span /><span /><span />
        </button>
        <div className="logo">
          <span className="logo-mark">i</span>
          <span className="logo-word">nfotut</span>
          <span className="logo-dot">.</span>
          <span className="logo-tld">ru</span>
        </div>
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
      <nav className="nav">
        <ul>
          {news.sections.map((s, i) => (
            <li key={s} className={i === 0 ? 'nav-active' : ''}>
              <a href="#">{s}</a>
            </li>
          ))}
        </ul>
        <a href="#" className="nav-live"><span className="live-dot" />Прямой эфир</a>
      </nav>
    </header>
  );
}

function Hero() {
  const h = news.hero;
  return (
    <article className="hero">
      <div className="hero-img">
        <ImgSlot label="HERO · 16:9" ratio="16 / 9" />
      </div>
      <div className="hero-body">
        <Kicker>{h.kicker}</Kicker>
        <h1 className="hero-title">{h.title}</h1>
        <p className="hero-lede">{h.lede}</p>
        <Meta author={h.author} time={h.time} reads={h.reads} />
      </div>
    </article>
  );
}

function SecondaryGrid() {
  return (
    <section className="secondary">
      {news.secondary.map((s) => (
        <article key={s.title} className="sec-card">
          <div className="sec-img">
            <ImgSlot label={s.kicker} ratio="4 / 3" />
          </div>
          <Kicker>{s.kicker}</Kicker>
          <h3 className="sec-title">{s.title}</h3>
          <p className="sec-lede">{s.lede}</p>
          <Meta time={s.time} />
        </article>
      ))}
    </section>
  );
}

function HeroAside() {
  return (
    <aside className="hero-aside">
      <div className="ticker">
        <div className="ticker-head">
          <span className="ticker-dot" />
          <h4>Сейчас</h4>
          <span className="ticker-sub">обновлено 14:32</span>
        </div>
        <ol className="ticker-list">
          {news.ticker.map((t) => (
            <li key={t.time}>
              <span className="ticker-time">{t.time}</span>
              <span className="ticker-text">{t.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="channels">
        <div className="channels-head">
          <h4>Подпишитесь</h4>
          <span className="channels-sub">5 каналов · 600 000+ читателей</span>
        </div>
        <ul className="channels-list">
          {news.channels.map((c) => (
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
        <a href="#" className="channels-all">Все каналы редакции →</a>
      </div>

      <div className="about-card">
        <Kicker>О сайте</Kicker>
        <p className="about-card-text">
          Infotut.ru — независимое издание о России. С 2008 года рассказываем о политике, экономике, культуре и науке без сенсаций и без партий. Только проверенные факты и редакторский разбор каждой темы.
        </p>
        <a href="#" className="about-card-link">Подробнее о редакции →</a>
      </div>
    </aside>
  );
}

function Features() {
  return (
    <section className="features">
      <div className="section-head">
        <h2>Длинные тексты</h2>
        <a href="#" className="section-more">Все материалы →</a>
      </div>
      <div className="features-grid">
        {news.features.map((f, i) => (
          <article key={f.title} className={`feat ${i === 0 ? 'feat-lead' : ''}`}>
            <div className="feat-img">
              <ImgSlot label={`FEATURE · ${i + 1}`} ratio={i === 0 ? '3 / 2' : '4 / 3'} />
            </div>
            <div className="feat-body">
              <Kicker>{f.kicker}</Kicker>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-lede">{f.lede}</p>
              <Meta author={f.author} readTime={f.readTime} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OpinionAndMostRead() {
  return (
    <section className="aside-cols">
      <div className="opinion">
        <div className="section-head">
          <h2>Мнения</h2>
          <a href="#" className="section-more">Все колонки →</a>
        </div>
        <ul className="opinion-list">
          {news.opinion.map((o) => (
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
          {news.mostRead.map((m, i) => (
            <li key={m}>
              <span className="mostread-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mostread-text">{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PhotoOfDay() {
  const c = news.culture;
  return (
    <section className="photo-day">
      <div className="photo-img">
        <ImgSlot label="ФОТО ДНЯ · 3:2" ratio="3 / 2" tone="ink" />
      </div>
      <div className="photo-body">
        <Kicker>{c.kicker}</Kicker>
        <p className="photo-caption">{c.caption}</p>
        <p className="photo-credit">{c.credit}</p>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-text">
        <h3>Утренняя рассылка</h3>
        <p>Семь главных историй дня — каждое утро в 8:00. Без спама, без рекламы.</p>
      </div>
      <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="ваш@email.ru" />
        <button type="submit">Подписаться</button>
      </form>
    </section>
  );
}

function CategoryPolitics() {
  return (
    <section className="cat cat-politics">
      <div className="section-head">
        <h2>Политика · 6 материалов</h2>
        <a href="#" className="section-more">Все новости рубрики →</a>
      </div>
      <div className="cat-grid cat-grid-6">
        {news.politicsCategory.map((p, i) => (
          <article key={p.title} className={`cat-card ${i === 0 ? 'cat-card-lead' : ''}`}>
            <div className="cat-img">
              <ImgSlot label={p.kicker} ratio={i === 0 || i >= 4 ? '3 / 2' : '4 / 3'} />
            </div>
            <Kicker>{p.kicker}</Kicker>
            <h3 className="cat-title">{p.title}</h3>
            {(i === 0 || i >= 4) && <p className="cat-lede">{p.lede}</p>}
            <Meta time={p.time} />
          </article>
        ))}
      </div>
    </section>
  );
}

function CategoryTech() {
  return (
    <section className="cat cat-tech">
      <div className="section-head">
        <h2>Технологии · 12 материалов</h2>
        <a href="#" className="section-more">Перейти в рубрику →</a>
      </div>
      <div className="cat-grid cat-grid-12">
        {news.techCategory.map((t) => (
          <article key={t.title} className="tech-card">
            <Kicker>{t.kicker}</Kicker>
            <h3 className="tech-title">{t.title}</h3>
            <div className="tech-time">{t.time}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EditorialBlock() {
  const e = news.editorial;
  return (
    <section className="editorial">
      <div className="editorial-left">
        <Kicker>О редакции</Kicker>
        <h2 className="editorial-title">{e.title}</h2>
        <p className="editorial-copy">{e.copy}</p>
        <div className="editorial-stats">
          {e.stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="editorial-right">
        <h4 className="editorial-team-head">Редакция</h4>
        <ul className="editorial-team">
          {e.team.map((t) => (
            <li key={t.name}>
              <div className="team-avatar">{t.name.split(' ').map(x => x[0]).join('')}</div>
              <div>
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
              </div>
            </li>
          ))}
        </ul>
        <a href="#" className="editorial-link">Вся команда — 61 человек →</a>
      </div>
    </section>
  );
}

function ProjectsBlock() {
  return (
    <section className="projects">
      <div className="section-head">
        <h2>Наши проекты</h2>
        <a href="#" className="section-more">Архив спецпроектов →</a>
      </div>
      <div className="projects-grid">
        {news.projects.map((p) => (
          <article key={p.title} className={`project project-${p.tone}`}>
            <Kicker>{p.kicker}</Kicker>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <span className="project-cta">Открыть →</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PrinciplesBlock() {
  return (
    <section className="principles">
      <div className="principles-head">
        <h2>Как мы работаем</h2>
        <p>Три простых правила, которым следует редакция Infotut с момента основания.</p>
      </div>
      <div className="principles-grid">
        {news.principles.map((p, i) => (
          <article key={p.title} className="principle">
            <div className="principle-num">{String(i + 1).padStart(2, '0')}</div>
            <Kicker>{p.kicker}</Kicker>
            <h3 className="principle-title">{p.title}</h3>
            <p className="principle-copy">{p.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <div className="logo logo-foot">
            <span className="logo-mark">i</span>
            <span className="logo-word">nfotut</span>
            <span className="logo-dot">.</span>
            <span className="logo-tld">ru</span>
          </div>
          <p>Независимое издание о России. Издаётся с 2008 года.</p>
        </div>
        <div className="foot-cols">
          <div>
            <h5>Разделы</h5>
            <ul>
              {news.sections.slice(0, 5).map((s) => <li key={s}><a href="#">{s}</a></li>)}
            </ul>
          </div>
          <div>
            <h5>Издание</h5>
            <ul>
              <li><a href="#">О нас</a></li>
              <li><a href="#">Редакция</a></li>
              <li><a href="#">Реклама</a></li>
              <li><a href="#">Вакансии</a></li>
            </ul>
          </div>
          <div>
            <h5>Сервисы</h5>
            <ul>
              <li><a href="#">RSS</a></li>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">Подкасты</a></li>
              <li><a href="#">Архив</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="foot-bot">
        <span>© 2008–2026 Infotut. Все права защищены.</span>
        <span className="foot-links">
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Условия</a>
          <a href="#">18+</a>
        </span>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────

function Homepage({ theme, font }) {
  const cls = ['page'];
  if (theme) cls.push('theme-' + theme);
  if (font) cls.push('font-' + font);
  return (
    <div className={cls.join(' ')}>
      <TopBar />
      <Masthead />
      <main className="main">
        <div className="lead-row">
          <Hero />
          <HeroAside />
        </div>
        <SecondaryGrid />
        <CategoryPolitics />
        <Features />
        <PhotoOfDay />
        <CategoryTech />
        <EditorialBlock />
        <OpinionAndMostRead />
        <ProjectsBlock />
        <PrinciplesBlock />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

window.Homepage = Homepage;
