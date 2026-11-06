import Link from 'next/link';
import { fmtDate } from '../lib/data';
import { catSlug } from '../lib/content';

export function PostCard({ p, base = '/blog/' }) {
  return (
    <article className={`pcard pcard--${catSlug(p.category)}`}>
      <Link href={`${base}${p.slug}/`} className="pcard__link">
        <div className="pcard__top">
          <span className="pcard__cat">{p.category || 'Newsletter'}</span>
          <span className="pcard__mark" aria-hidden="true">{(p.category || 'N')[0]}</span>
        </div>
        <div className="pcard__body">
          <h3>{p.title}</h3>
          {p.description && <p>{p.description}</p>}
          <p className="pcard__meta">{fmtDate(p.date, { month: 'long', day: 'numeric', year: 'numeric' })} · {p.minutes} min read</p>
        </div>
      </Link>
    </article>
  );
}

export function PostGrid({ items, base }) {
  return <div className="pgrid">{items.map((p) => <PostCard key={p.slug} p={p} base={base} />)}</div>;
}
