import Link from 'next/link';
import { PageHero } from '../../components/Bits';
import { issues } from '../../lib/content';
import { fmtDate } from '../../lib/data';
import { FACEBOOK } from '../../lib/site';

export const metadata = {
  title: 'Monthly Newsletter',
  description: 'The BNI A1 Networkers monthly newsletter: a member spotlight, seasonal tips, networking advice, BNI news and BNI Arizona events.',
  alternates: { canonical: '/newsletter/' },
};

export default function Newsletter() {
  const all = issues();
  const [latest, ...older] = all;
  return (
    <>
      <PageHero eyebrow="Newsletter" title="The A1 Networkers monthly">
        <p>Every month: a member spotlight, seasonal tips for West Valley homes and businesses, networking advice, BNI news and upcoming BNI Arizona events.</p>
      </PageHero>
      <section className="band">
        <div className="wrap narrow">
          {latest ? (
            <Link href={`/newsletter/${latest.slug}/`} className="card nl-latest">
              <p className="eyebrow">Latest issue</p>
              <h2>{latest.title}</h2>
              {latest.description && <p>{latest.description}</p>}
              {latest.spotlight && <p className="nl-latest__spot">Member spotlight: <b>{latest.spotlight}</b></p>}
              <span className="tlink">Read the {fmtDate(latest.date, { month: 'long', year: 'numeric' })} issue →</span>
            </Link>
          ) : <p>Our first issue is on the way.</p>}
          {older.length > 0 && (
            <>
              <h2 className="mt">Past issues</h2>
              <ul className="nl-list">
                {older.map((n) => <li key={n.slug}><Link href={`/newsletter/${n.slug}/`}><b>{fmtDate(n.date, { month: 'long', year: 'numeric' })}</b><span>{n.title}</span></Link></li>)}
              </ul>
            </>
          )}
          <p className="mt">New issues post on the first of each month. <a href={FACEBOOK} target="_blank" rel="noopener">Follow us on Facebook</a> to see each one when it comes out.</p>
        </div>
      </section>
    </>
  );
}
