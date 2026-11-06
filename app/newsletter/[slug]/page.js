import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd, Avatar } from '../../../components/Bits';
import { issues, issue } from '../../../lib/content';
import { fmtDate, findMember, memberMedia } from '../../../lib/data';
import { SITE_URL, NAME, MEETING } from '../../../lib/site';
import { PAPER, headline, issueNo, sections } from '../../../lib/times';

export const dynamicParams = false;
export function generateStaticParams() { return issues().map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }) {
  const p = issue((await params).slug);
  if (!p) return {};
  const t = `${PAPER}, ${fmtDate(p.date, { month: 'long', year: 'numeric' })}: ${headline(p)}`;
  return { title: t, description: p.description, alternates: { canonical: `/newsletter/${p.slug}/` }, openGraph: { type: 'article', title: t, description: p.description, images: [`/social/newsletter-${p.slug}.png`] } };
}

export default async function Issue({ params }) {
  const p = issue((await params).slug);
  if (!p) notFound();
  const m = p.spotlight ? findMember(p.spotlight) : null;
  const media = m ? memberMedia(m.name) : null;
  const secs = sections(p.html);
  const lead = secs.find((s) => /^welcome/i.test(s.title)) || secs[0];
  const spot = secs.find((s) => /^member spotlight/i.test(s.title));
  const rest = secs.filter((s) => s !== lead && s !== spot);
  const all = issues();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const newer = all[idx - 1], older = all[idx + 1];
  const month = fmtDate(p.date, { month: 'long', year: 'numeric' });
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'NewsArticle', headline: `${PAPER}, ${month}: ${headline(p)}`, description: p.description, datePublished: p.date, author: { '@type': 'Organization', name: NAME }, publisher: { '@type': 'Organization', name: NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/img/logo.png` } }, isPartOf: { '@type': 'Periodical', name: PAPER }, image: `${SITE_URL}/social/newsletter-${p.slug}.png`, mainEntityOfPage: `${SITE_URL}/newsletter/${p.slug}/` }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: PAPER, item: `${SITE_URL}/newsletter/` }, { '@type': 'ListItem', position: 3, name: month, item: `${SITE_URL}/newsletter/${p.slug}/` }] }} />
      <div className="paper-wrap">
        <article className="paper">
          <header className="paper__mast">
            <div className="paper__ears">
              <span>Vol. 1, No. {issueNo(p)}</span>
              <span>Peoria, Arizona</span>
              <span>Free to every guest</span>
            </div>
            <p className="paper__name">{PAPER}</p>
            <p className="paper__motto">The monthly newsletter of {NAME} · Givers Gain®</p>
            <div className="paper__dateline">
              <span>{fmtDate(p.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>Meets {MEETING.day}s, {MEETING.time}, {MEETING.venue}</span>
              <Link href="/newsletter/">All editions</Link>
            </div>
          </header>

          <div className="paper__front">
            <div className="paper__lead">
              <h1 className="paper__h1">{headline(p)}</h1>
              {p.description && <p className="paper__deck">{p.description}</p>}
              <div className="paper__cols paper__cols--2 paper__dropcap" dangerouslySetInnerHTML={{ __html: lead.body }} />
            </div>
            {m && (
              <aside className="paper__box">
                <p className="paper__kicker">Member spotlight</p>
                <Avatar name={m.name} size="lg" />
                <p className="paper__boxname">{m.name.replace(/,.*$/, '')}</p>
                <p className="paper__boxco">{m.company}<br /><i>{m.specialty}</i></p>
                <div className="paper__boxlinks">
                  {m.phone && <a href={`tel:${m.phone.replace(/\D/g, '')}`}>{m.phone}</a>}
                  {m.website && <a href={m.website} target="_blank" rel="noopener">Website</a>}
                  {m.profileUrl && <a href={m.profileUrl} target="_blank" rel="noopener">BNI profile</a>}
                </div>
                <a className="paper__jump" href="#spotlight">Read the story inside</a>
              </aside>
            )}
          </div>

          {spot && (
            <section className="paper__story paper__story--feature" id="spotlight">
              <p className="paper__kicker">Member spotlight</p>
              <h2 className="paper__h2">{spot.title.replace(/^member spotlight:\s*/i, '')}</h2>
              {media?.banner && <img className="paper__photo" src={media.banner} alt={`${m.company}`} loading="lazy" />}
              <div className="paper__cols paper__cols--3" dangerouslySetInnerHTML={{ __html: spot.body }} />
            </section>
          )}

          <div className="paper__grid">
            {rest.map((s) => (
              <section key={s.title} className="paper__story">
                <h2 className="paper__h3">{s.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: s.body }} />
              </section>
            ))}
          </div>

          <footer className="paper__foot">
            <p>{NAME} meets every {MEETING.day} at {MEETING.time} at {MEETING.venue}, {MEETING.street}, {MEETING.city}. Visitors are always welcome.</p>
            <div className="paper__footnav">
              {older ? <Link href={`/newsletter/${older.slug}/`}>Previous edition: {fmtDate(older.date, { month: 'long', year: 'numeric' })}</Link> : <span />}
              <Link className="btn btn--red" href="/visit/">Plan your visit</Link>
              {newer ? <Link href={`/newsletter/${newer.slug}/`}>Next edition: {fmtDate(newer.date, { month: 'long', year: 'numeric' })}</Link> : <span />}
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
