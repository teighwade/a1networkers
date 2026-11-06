import Link from 'next/link';
import { Avatar } from '../../components/Bits';
import { issues } from '../../lib/content';
import { fmtDate, findMember } from '../../lib/data';
import { FACEBOOK, NAME } from '../../lib/site';
import { PAPER, headline, issueNo } from '../../lib/times';

export const metadata = {
  title: `${PAPER}: Monthly Newsletter`,
  description: `${PAPER}, the monthly newsletter of BNI A1 Networkers: a member spotlight, seasonal tips for the West Valley, networking advice, BNI news and BNI Arizona events.`,
  alternates: { canonical: '/newsletter/' },
};

export default function Newsletter() {
  const all = issues();
  const [latest, ...older] = all;
  return (
    <div className="paper-wrap">
      <div className="paper">
        <header className="paper__mast">
          <div className="paper__ears"><span>Published monthly</span><span>Peoria, Arizona</span><span>{all.length} editions</span></div>
          <p className="paper__name">{PAPER}</p>
          <p className="paper__motto">The monthly newsletter of {NAME} · Givers Gain®</p>
          <div className="paper__dateline"><span>Member spotlights, seasonal tips, networking advice and BNI news</span><span>New edition on the 1st of each month</span></div>
        </header>
        {latest && (
          <Link href={`/newsletter/${latest.slug}/`} className="times-latest">
            <div>
              <p className="paper__kicker">This month’s edition, {fmtDate(latest.date, { month: 'long', year: 'numeric' })}</p>
              <h1 className="paper__h1">{headline(latest)}</h1>
              {latest.description && <p className="paper__deck">{latest.description}</p>}
              <span className="times-read">Read the {fmtDate(latest.date, { month: 'long' })} edition</span>
            </div>
            {latest.spotlight && (
              <div className="times-spot"><Avatar name={latest.spotlight} size="lg" /><p><i>Member spotlight</i><b>{latest.spotlight.replace(/,.*$/, '')}</b>{findMember(latest.spotlight)?.company}</p></div>
            )}
          </Link>
        )}
        {older.length > 0 && (
          <>
            <h2 className="times-archive">Past editions</h2>
            <div className="times-grid">
              {older.map((n) => (
                <Link key={n.slug} href={`/newsletter/${n.slug}/`} className="times-card">
                  <span className="times-card__mast">{PAPER}</span>
                  <span className="times-card__meta">Vol. 1, No. {issueNo(n)} · {fmtDate(n.date, { month: 'long', year: 'numeric' })}</span>
                  <b>{headline(n)}</b>
                  {n.spotlight && <span className="times-card__spot">Spotlight: {n.spotlight.replace(/,.*$/, '')}</span>}
                </Link>
              ))}
            </div>
          </>
        )}
        <p className="paper__foot">New editions post on the first of each month. <a href={FACEBOOK} target="_blank" rel="noopener">Follow us on Facebook</a> to catch each one.</p>
      </div>
    </div>
  );
}
