import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd, Avatar } from '../../../components/Bits';
import { PostGrid } from '../../../components/Posts';
import { posts, post } from '../../../lib/content';
import { fmtDate, findMember, memberMedia } from '../../../lib/data';
import { SITE_URL, NAME, MEETING } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return posts().map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }) {
  const p = post((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.description, alternates: { canonical: `/blog/${p.slug}/` }, openGraph: { type: 'article', title: p.title, description: p.description, publishedTime: p.date, images: [`/social/${p.slug}.png`] } };
}

export default async function Post({ params }) {
  const p = post((await params).slug);
  if (!p) notFound();
  const m = p.member ? findMember(p.member) : null;
  const more = posts().filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description, datePublished: p.date, author: { '@type': 'Organization', name: NAME }, publisher: { '@type': 'Organization', name: NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/img/logo.png` } }, mainEntityOfPage: `${SITE_URL}/blog/${p.slug}/` }} />
      <article>
        <header className="phero">
          <div className="wrap narrow">
            <p className="eyebrow"><Link href="/blog/">Blog</Link> · {p.category}</p>
            <h1>{p.title}</h1>
            <p className="post__meta">{fmtDate(p.date, { month: 'long', day: 'numeric', year: 'numeric' })} · {p.minutes} min read</p>
          </div>
        </header>
        <section className="band">
          <div className="wrap narrow">
            {m && memberMedia(m.name)?.banner && <img className="post__banner" src={memberMedia(m.name).banner} alt={`${m.company} banner`} loading="lazy" />}
            <div className="prose post" dangerouslySetInnerHTML={{ __html: p.html }} />
            {m && (
              <aside className="card post__member">
                <p className="eyebrow">Meet the member</p>
                <div className="post__mrow"><Avatar name={m.name} size="lg" /><p className="post__mname">{m.name}</p></div>
                <p>{m.company} · {m.specialty}</p>
                <div className="btnrow">
                  {m.phone && <a className="btn btn--red" href={`tel:${m.phone.replace(/\D/g, '')}`}>Call {m.phone}</a>}
                  {m.profileUrl && <a className="btn btn--ghost" href={m.profileUrl} target="_blank" rel="noopener">BNI profile ↗</a>}
                </div>
              </aside>
            )}
            <aside className="post__cta">
              <h2>Grow your business with referrals</h2>
              <p>Visit {NAME} any {MEETING.day} at {MEETING.time} at {MEETING.venue} in {MEETING.city}. Visitors are always welcome.</p>
              <Link className="btn btn--red" href="/visit/">Plan your visit</Link>
            </aside>
          </div>
        </section>
      </article>
      {more.length > 0 && (
        <section className="band band--soft">
          <div className="wrap">
            <h2>More from the blog</h2>
            <PostGrid items={more} />
          </div>
        </section>
      )}
    </>
  );
}
