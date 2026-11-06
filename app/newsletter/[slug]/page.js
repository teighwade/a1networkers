import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd, Avatar } from '../../../components/Bits';
import { issues, issue } from '../../../lib/content';
import { fmtDate, findMember, memberMedia } from '../../../lib/data';
import { SITE_URL, NAME, MEETING } from '../../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return issues().map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }) {
  const p = issue((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.description, alternates: { canonical: `/newsletter/${p.slug}/` }, openGraph: { type: 'article', title: p.title, description: p.description, images: [`/social/newsletter-${p.slug}.png`] } };
}

export default async function Issue({ params }) {
  const p = issue((await params).slug);
  if (!p) notFound();
  const m = p.spotlight ? findMember(p.spotlight) : null;
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.description, datePublished: p.date, author: { '@type': 'Organization', name: NAME }, mainEntityOfPage: `${SITE_URL}/newsletter/${p.slug}/` }} />
      <article>
        <header className="phero">
          <div className="wrap narrow">
            <p className="eyebrow"><Link href="/newsletter/">Newsletter</Link> · {fmtDate(p.date, { month: 'long', year: 'numeric' })}</p>
            <h1>{p.title}</h1>
            {p.description && <div className="phero__lead"><p>{p.description}</p></div>}
          </div>
        </header>
        <section className="band">
          <div className="wrap narrow">
            {m && (
              <aside className="card post__member">
                <p className="eyebrow">This month’s member spotlight</p>
                <div className="post__mrow"><Avatar name={m.name} size="lg" /><p className="post__mname">{m.name}</p></div>
                <p>{m.company} · {m.specialty}</p>
                <div className="btnrow">
                  {m.phone && <a className="btn btn--red" href={`tel:${m.phone.replace(/\D/g, '')}`}>Call {m.phone}</a>}
                  {m.profileUrl && <a className="btn btn--ghost" href={m.profileUrl} target="_blank" rel="noopener">BNI profile ↗</a>}
                </div>
              </aside>
            )}
            {m && memberMedia(m.name)?.banner && <img className="post__banner" src={memberMedia(m.name).banner} alt={`${m.company} banner`} loading="lazy" />}
            <div className="prose post newsletter" dangerouslySetInnerHTML={{ __html: p.html }} />
            <aside className="post__cta">
              <h2>Join us any {MEETING.day}</h2>
              <p>{MEETING.time} at {MEETING.venue}, {MEETING.street}, {MEETING.city}. Visitors are always welcome.</p>
              <Link className="btn btn--red" href="/visit/">Plan your visit</Link>
            </aside>
            <p className="mt"><Link className="tlink" href="/newsletter/">← All issues</Link></p>
          </div>
        </section>
      </article>
    </>
  );
}
