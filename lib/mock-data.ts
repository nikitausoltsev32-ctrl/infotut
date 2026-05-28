import type { Article, Section, TickerItem, Channel } from './types'

export const SECTIONS: Section[] = [
  { id: '1', slug: 'politika', name: 'Политика' },
  { id: '2', slug: 'ekonomika', name: 'Экономика' },
  { id: '3', slug: 'obshchestvo', name: 'Общество' },
  { id: '4', slug: 'kultura', name: 'Культура' },
  { id: '5', slug: 'sport', name: 'Спорт' },
  { id: '6', slug: 'tekhnologii', name: 'Технологии' },
  { id: '7', slug: 'mneniya', name: 'Мнения' },
]

export const HERO_ARTICLE: Article = {
  id: '1',
  slug: 'pravitelstvo-utverdilo-programmu-podderzhki-malogo-biznesa-2026',
  title: 'Правительство утвердило программу поддержки малого бизнеса на 2026 год',
  kicker: 'Экономика',
  lede: 'Объём финансирования превысит 480 миллиардов рублей. Меры включают льготные кредиты, продлённые налоговые каникулы для новых предприятий и расширение системы микрозаймов в регионах.',
  author: 'Алексей Воронцов',
  section: 'ekonomika',
  publishedAt: '2026-05-28T11:37:00',
  thumbnail: '/images/news-economy.png',
  reads: '12 408',
  status: 'published',
}

export const SECONDARY_ARTICLES: Article[] = [
  {
    id: '2',
    slug: 'rossiyskie-uchenye-neyrointerfeyst',
    title: 'Российские учёные представили прототип нейроинтерфейса нового поколения',
    kicker: 'Технологии',
    lede: 'Разработка позволяет управлять курсором силой мысли с задержкой меньше 40 мс.',
    author: 'Редакция',
    section: 'tekhnologii',
    publishedAt: '2026-05-28T10:00:00',
    thumbnail: '/images/news-tech.png',
    status: 'published',
  },
  {
    id: '3',
    slug: 'tretjakovka-goncharova',
    title: 'В Третьяковской галерее открылась ретроспектива работ Натальи Гончаровой',
    kicker: 'Культура',
    lede: 'Выставка объединила более 350 произведений из 14 музеев России и Европы.',
    author: 'Редакция',
    section: 'kultura',
    publishedAt: '2026-05-28T09:00:00',
    thumbnail: '/images/news-culture.png',
    status: 'published',
  },
  {
    id: '4',
    slug: 'sbornya-hokkey-final',
    title: 'Сборная по хоккею вышла в финал чемпионата мира',
    kicker: 'Спорт',
    lede: 'Решающий гол был забит на 58-й минуте овертайма.',
    author: 'Редакция',
    section: 'sport',
    publishedAt: '2026-05-28T08:00:00',
    thumbnail: '/images/news-sport.png',
    status: 'published',
  },
]

export const TICKER_ITEMS: TickerItem[] = [
  { time: '14:32', text: 'ЦБ сохранил ключевую ставку на уровне 16% — третий раз подряд' },
  { time: '14:18', text: 'Аэрофлот объявил о запуске прямых рейсов Москва — Бишкек с 1 июня' },
  { time: '13:55', text: 'В Санкт-Петербурге открылся седьмой международный книжный фестиваль' },
  { time: '13:40', text: 'Учёные МГУ нашли в Подмосковье останки мамонта возрастом 23 000 лет' },
  { time: '13:12', text: 'Минцифры запускает единый сервис восстановления паролей через Госуслуги' },
  { time: '12:48', text: 'В Сочи стартует чемпионат России по парусному спорту' },
  { time: '12:21', text: 'Эрмитаж получил в дар коллекцию голландской живописи XVII века' },
]

export const CHANNELS: Channel[] = [
  { name: 'Telegram', handle: '@infotut_ru', subs: '284 000', short: 'TG', url: 'https://t.me/infotut_ru' },
  { name: 'ВКонтакте', handle: 'vk.com/infotut', subs: '156 000', short: 'VK', url: 'https://vk.com/infotut' },
  { name: 'Дзен', handle: 'dzen.ru/infotut', subs: '92 400', short: 'Z', url: 'https://dzen.ru/infotut' },
  { name: 'YouTube', handle: '@infotut', subs: '48 600', short: 'YT', url: 'https://youtube.com/@infotut' },
  { name: 'Подкасты', handle: '«Звуки города»', subs: '21 300', short: '♪', url: '#' },
]

export const MOST_READ = [
  'Карта новых платных трасс: где появятся пункты оплаты до конца года',
  'Десять книг, которые рекомендуют учителя литературы 2026 года',
  'Почему стоимость аренды в столицах падает второй квартал подряд',
  'Тест: угадайте советский фильм по одному кадру',
  'Гид по майским выходным: куда поехать без машины',
]

export const OPINIONS = [
  { author: 'Е. Новикова', title: 'Почему школа всё ещё не готова к ИИ — и почему это нормально' },
  { author: 'Д. Полонский', title: 'Цена тишины: что мы теряем в эпоху бесконечного контента' },
  { author: 'А. Симонян', title: 'Дроны над виноградниками: новая экономика российского юга' },
]

export const POLITICS_ARTICLES: Article[] = [
  { id: '10', slug: 'zakon-o-tsifrovom-notariate', title: 'Принят закон о цифровом нотариате — что меняется для бизнеса', kicker: 'Госдума', lede: 'Электронные доверенности станут равноправными бумажным с 1 сентября.', author: 'Редакция', section: 'politika', publishedAt: '2026-05-28T11:48:00', thumbnail: '/images/news-economy.png', status: 'published' },
  { id: '11', slug: 'gubernatory-sibiri-transport', title: 'Губернаторы Сибири обсудили общий план развития транспорта', kicker: 'Регионы', lede: 'Речь о новой ветке БАМа и расширении аэропорта Новосибирска.', author: 'Редакция', section: 'politika', publishedAt: '2026-05-28T11:13:00', thumbnail: '/images/news-city.png', status: 'published' },
  { id: '12', slug: 'sovfed-chetyrexdnevka', title: 'Сенаторы поддержали пилот четырёхдневной рабочей недели', kicker: 'Совфед', lede: 'Эксперимент пройдёт в 12 компаниях из шести регионов.', author: 'Редакция', section: 'politika', publishedAt: '2026-05-28T10:00:00', thumbnail: '/images/news-economy.png', status: 'published' },
  { id: '13', slug: 'rossiya-indiya-luna', title: 'Россия и Индия подписали соглашение о совместных лунных миссиях', kicker: 'Внешняя политика', lede: 'Первая миссия запланирована на 2028 год.', author: 'Редакция', section: 'politika', publishedAt: '2026-05-28T08:00:00', thumbnail: '/images/news-culture.png', status: 'published' },
  { id: '14', slug: 'novye-lyudi-reforma', title: '«Новые люди» представили программу реформы высшего образования', kicker: 'Партии', lede: 'Главные пункты — гибкие траектории и снижение бюрократии.', author: 'Редакция', section: 'politika', publishedAt: '2026-05-28T07:00:00', thumbnail: '/images/news-city.png', status: 'published' },
  { id: '15', slug: 'ukaz-obrashcheniya-grazhdan', title: 'Опубликован указ о новых принципах работы с обращениями граждан', kicker: 'Кремль', lede: 'Срок ответа сокращён с 30 до 15 рабочих дней.', author: 'Редакция', section: 'politika', publishedAt: '2026-05-28T06:00:00', thumbnail: '/images/news-culture.png', status: 'published' },
]

export const TECH_ARTICLES = [
  { kicker: 'AI', title: 'Яндекс выпустил версию GPT-движка с открытыми весами', time: '08:42' },
  { kicker: 'Космос', title: '«Роскосмос» подтвердил пуск трёх «Глонасс-К2» в июне', time: '08:15' },
  { kicker: 'Госуслуги', title: 'Единый ID для платежей в общественном транспорте — пилот', time: '07:50' },
  { kicker: 'Стартапы', title: 'Казанский стартап получил $4 млн на платформу для агросектора', time: '07:28' },
  { kicker: 'Энергетика', title: 'Первая в России АЭС малой мощности подключена к сети', time: '07:05' },
  { kicker: 'IT-кадры', title: 'Минцифры расширило льготную ипотеку для разработчиков', time: '06:40' },
  { kicker: 'Авто', title: 'Сборка электромобилей «Атом» вышла на проектную мощность', time: '06:12' },
  { kicker: 'Биотех', title: 'Зарегистрирована вакцина против вируса Кетцаль', time: '05:55' },
  { kicker: 'Финтех', title: 'СБП теперь работает в шести странах СНГ без комиссии', time: '05:30' },
  { kicker: 'Игры', title: 'Российская студия выпустила симулятор советского быта', time: 'вчера' },
  { kicker: 'Хардвер', title: '«Эльбрус» представил восьмиядерный процессор для серверов', time: 'вчера' },
  { kicker: 'Регионы', title: 'В Перми открылся первый центр квантовых вычислений на Урале', time: 'вчера' },
]

export const PROJECTS = [
  { kicker: 'Спецпроект', title: 'Россия из окна поезда', desc: '14 эссе и 240 кадров о людях, живущих вдоль Транссиба.', tone: 'a' },
  { kicker: 'Подкаст', title: 'Звуки города', desc: 'Полевые записи и разговоры с горожанами 32 городов.', tone: 'b' },
  { kicker: 'Архив', title: 'Карта пожаров 2024', desc: 'Интерактивная хроника лесных пожаров за прошлый год.', tone: 'c' },
  { kicker: 'Лаборатория', title: 'Тест-полоса', desc: 'Эксперименты с форматами — данные, лонгриды, видео.', tone: 'd' },
]

export const PRINCIPLES = [
  { kicker: 'Принципы', title: 'Только проверенные факты', copy: 'Каждый материал проходит фактчек и сверку с первоисточниками. Поправки публикуем в течение часа после подтверждения ошибки.' },
  { kicker: 'Прозрачность', title: 'Раскрытие источников финансирования', copy: 'Издание принадлежит фонду «Свободное слово». Полный отчёт о доходах и расходах публикуется ежеквартально в открытом архиве.' },
  { kicker: 'Реклама', title: 'Партнёрские материалы всегда отмечаются', copy: 'Спонсорские публикации помечаются плашкой «Партнёрский материал» и отделены от редакционного потока. Реклама не влияет на повестку.' },
]

export const FEATURES_ARTICLES: Article[] = [
  { id: '20', slug: 'malye-goroda-bez-zavodov', title: 'Как маленькие города учатся жить без больших заводов', kicker: 'Долгое чтение', lede: 'Репортаж из четырёх моногородов, где открываются креативные кластеры, ремесленные мастерские и логистические хабы. Что работает, а что — нет.', author: 'Мария Лебедева', section: 'obshchestvo', publishedAt: '2026-05-27', readTime: '14 мин', thumbnail: '/images/news-city.png', status: 'published' },
  { id: '21', slug: 'choban-intervyu', title: '«Архитектура — это медленное искусство». Беседа со Сергеем Чобаном', kicker: 'Интервью', lede: 'Архитектор о новом облике Москвы, будущем стекла и бетона и о том, почему здания должны стареть красиво.', author: 'Иван Дёмин', section: 'kultura', publishedAt: '2026-05-26', readTime: '22 мин', thumbnail: '/images/news-culture.png', status: 'published' },
]
