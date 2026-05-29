import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | ИнфоТут',
}

export default function PrivacyPage() {
  const feedbackEmail = process.env.FEEDBACK_EMAIL ?? 'privacy@infotut.ru'

  return (
    <main className="main">
      <article className="max-w-[780px]">
        <h1 className="font-serif text-[clamp(28px,5vw,42px)] font-semibold leading-tight tracking-tight text-[var(--ink)] mb-8">
          Политика конфиденциальности
        </h1>
        <p className="font-mono text-[11px] tracking-widest uppercase text-[var(--ink-3)] mb-10">
          Последнее обновление: май 2025
        </p>

        <div className="flex flex-col gap-8 font-serif text-[17px] leading-relaxed text-[var(--ink-2)]">

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">1. Оператор данных</h2>
            <p>
              Настоящая Политика конфиденциальности распространяется на сайт{' '}
              <strong className="text-[var(--ink)]">infotut.ru</strong> (далее — Сайт). Оператором
              персональных данных является редакция ИнфоТут. По вопросам обработки персональных
              данных обращайтесь на адрес:{' '}
              <a href={`mailto:${feedbackEmail}`} className="text-[var(--accent)] underline underline-offset-2">
                {feedbackEmail}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">2. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>
                <strong className="text-[var(--ink)]">Email-адрес</strong> — при оформлении подписки
                на рассылку или отправке обратной связи.
              </li>
              <li>
                <strong className="text-[var(--ink)]">IP-адрес</strong> — автоматически фиксируется
                серверными логами при посещении Сайта.
              </li>
              <li>
                <strong className="text-[var(--ink)]">Cookies и данные аналитики</strong> — через
                сервис Яндекс.Метрика (поведение на Сайте, технические характеристики устройства).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">3. Цель обработки</h2>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Ответ на обратную связь и обработка запросов пользователей.</li>
              <li>Рассылка новостного дайджеста (при наличии явного согласия).</li>
              <li>Анализ посещаемости и улучшение работы Сайта.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">4. Хранение данных</h2>
            <p>
              Персональные данные обрабатываются и хранятся на серверах, расположенных на территории
              Российской Федерации (REG.RU), в соответствии с требованиями Федерального закона
              №&nbsp;152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">5. Передача третьим лицам</h2>
            <p className="mb-3">
              Данные не передаются третьим лицам в коммерческих целях. Для аналитики и автоматизации
              используются следующие сервисы:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>
                <strong className="text-[var(--ink)]">Яндекс.Метрика</strong> — веб-аналитика.
                Политика конфиденциальности Яндекса:{' '}
                <a
                  href="https://yandex.ru/legal/confidential/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline underline-offset-2"
                >
                  yandex.ru/legal/confidential
                </a>.
              </li>
              <li>
                <strong className="text-[var(--ink)]">Telegram</strong> — автоматическая публикация
                материалов в телеграм-канале редакции.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">6. Cookies</h2>
            <p>
              Сайт использует файлы cookies через сервис Яндекс.Метрика. Cookies помогают анализировать
              трафик и улучшать пользовательский опыт. Вы можете отключить cookies в настройках
              браузера — это не ограничит доступ к контенту Сайта.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">7. Права пользователя</h2>
            <p className="mb-3">
              В соответствии с Федеральным законом №&nbsp;152-ФЗ вы вправе:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Запросить информацию о хранящихся персональных данных.</li>
              <li>Потребовать исправления неточных данных.</li>
              <li>Потребовать удаления персональных данных.</li>
              <li>Отозвать согласие на обработку данных.</li>
            </ul>
            <p className="mt-3">
              Для реализации прав обратитесь по адресу:{' '}
              <a href={`mailto:${feedbackEmail}`} className="text-[var(--accent)] underline underline-offset-2">
                {feedbackEmail}
              </a>. Запрос будет рассмотрен в течение 30 дней.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-[22px] font-semibold text-[var(--ink)] mb-3">8. Изменения политики</h2>
            <p>
              Редакция вправе вносить изменения в настоящую Политику. Актуальная версия всегда
              доступна по адресу{' '}
              <a href="/privacy" className="text-[var(--accent)] underline underline-offset-2">
                infotut.ru/privacy
              </a>. Продолжение использования Сайта после обновления означает согласие с новой редакцией.
            </p>
          </section>

        </div>
      </article>
    </main>
  )
}
