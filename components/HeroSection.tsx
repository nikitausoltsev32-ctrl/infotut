import Image from 'next/image';
import Link from 'next/link';
import { formatTime } from '@/lib/utils';
import { Article } from '@/lib/types';

interface HeroSectionProps {
  article: Article;
}

export default function HeroSection({ article }: HeroSectionProps) {
  const { section, slug, title, kicker, lede, thumbnail, author, publishedAt, reads } = article;

  return (
    <Link href={`/${section}/${slug}`}>
      <article className="hero">
        <div className="hero-visual">
          <div className="imgslot hero-img">
            <Image
              fill
              src={thumbnail ?? '/placeholder.jpg'}
              alt={title}
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="hero-gradient" aria-hidden="true" />
          <div className="hero-caption">
            <span className="kicker hero-kicker">{kicker}</span>
            <h1 className="hero-title">{title}</h1>
            <p className="hero-lede">{lede}</p>
            <div className="meta hero-meta">
              <span>{author}</span>
              <span className="meta-dot">·</span>
              <span>{formatTime(publishedAt)}</span>
              {reads && (
                <>
                  <span className="meta-dot">·</span>
                  <span>{reads} читателей</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
