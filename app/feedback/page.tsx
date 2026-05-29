import type { Metadata } from 'next';
import Link from 'next/link';
import FeedbackForm from '@/components/FeedbackForm';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с редакцией Инфотут — вопросы, предложения, пресс-релизы.',
};

export default function FeedbackPage() {
  const feedbackEmail = process.env.FEEDBACK_EMAIL ?? 'feedback@infotut.ru';

  return (
    <main className="main contact-page">
      <header className="section-cover contact-cover">
        <div className="section-cover-copy">
          <Link href="/" className="section-back">← Главная</Link>
          <span className="kicker">Редакция</span>
          <h1>Контакты</h1>
          <p>
            Вопросы, предложения, пресс-релизы и сообщения об ошибках — пишите нам.
            Мы отвечаем в течение одного рабочего дня.
          </p>
        </div>
      </header>

      <section className="contact-layout">
        <FeedbackForm />

        <aside className="contact-card">
          <div>
            <span className="kicker">Почта</span>
            <a href={`mailto:${feedbackEmail}`} className="contact-link">{feedbackEmail}</a>
          </div>
          <div>
            <span className="kicker">Материалы</span>
            <p>Для пресс-релизов, уточнений, исправлений и редакционных предложений.</p>
          </div>
          <div className="contact-service-list">
            <Link href="/about">О редакции</Link>
            <Link href="/rss.xml">RSS</Link>
            <Link href="/privacy">Политика конфиденциальности</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
