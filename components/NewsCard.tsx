import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatTime } from '@/lib/utils';

type Props = {
  article: Article;
  variant?: 'secondary' | 'feature' | 'category' | 'feature-lead' | 'cat-lead';
};

export default function NewsCard({ article, variant = 'secondary' }: Props) {
  const getAspectRatio = () => {
    if (variant === 'feature' || variant === 'feature-lead') return 16 / 9;
    return 3 / 2;
  };

  const aspectRatio = getAspectRatio();

  if (variant === 'secondary') {
    return (
      <Link href={`/${article.section}/${article.slug}`}>
        <article className="sec-card">
          <div className="imgslot" style={{ aspectRatio }}>
            <Image
              src={article.thumbnail ?? '/placeholder.jpg'}
              alt={article.title}
              fill
            />
          </div>
          <h3 className="sec-title">{article.title}</h3>
          <div className="meta">
            <span>{article.author}</span>
            <span className="meta-dot">·</span>
            <span>{formatTime(article.publishedAt)}</span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'feature' || variant === 'feature-lead') {
    return (
      <Link href={`/${article.section}/${article.slug}`}>
        <article className={`feat ${variant === 'feature-lead' ? 'feat-lead' : ''}`}>
          <div className="imgslot" style={{ aspectRatio }}>
            <Image
              src={article.thumbnail ?? '/placeholder.jpg'}
              alt={article.title}
              fill
            />
          </div>
          <div className="kicker">{article.kicker}</div>
          <h2 className="feat-title">{article.title}</h2>
          <p className="feat-lede">{article.lede}</p>
          <div className="meta">
            <span>{article.author}</span>
            <span className="meta-dot">·</span>
            <span>{formatTime(article.publishedAt)}</span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'category') {
    return (
      <Link href={`/${article.section}/${article.slug}`}>
        <article className="cat-card">
          <div className="imgslot" style={{ aspectRatio }}>
            <Image
              src={article.thumbnail ?? '/placeholder.jpg'}
              alt={article.title}
              fill
            />
          </div>
          <div className="kicker">{article.kicker}</div>
          <h3 className="cat-title">{article.title}</h3>
          <p className="cat-lede">{article.lede}</p>
          <div className="meta">
            <span>{article.author}</span>
            <span className="meta-dot">·</span>
            <span>{formatTime(article.publishedAt)}</span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'cat-lead') {
    return (
      <Link href={`/${article.section}/${article.slug}`}>
        <article className="cat-card cat-card-lead">
          <div className="imgslot" style={{ aspectRatio }}>
            <Image
              src={article.thumbnail ?? '/placeholder.jpg'}
              alt={article.title}
              fill
            />
          </div>
          <div>
            <div className="kicker">{article.kicker}</div>
            <h3 className="cat-title">{article.title}</h3>
            <p className="cat-lede">{article.lede}</p>
            <div className="meta">
              <span>{article.author}</span>
              <span className="meta-dot">·</span>
              <span>{formatTime(article.publishedAt)}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }
}
