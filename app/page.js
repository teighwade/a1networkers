import { PostGrid } from '../components/Posts';
import { posts } from '../lib/content';
export const revalidate = 3600; // refresh hourly so "next speaker" moves on after each meeting
import Link from 'next/link';
import { JsonLd, Avatar, meetingEvent } from '../components/Bits';
import { FbIcon } from '../components/Chrome';
import { members, leadership, findMember, speakers, fmtDate, nextThursday } from '../lib/data';
import { FACEBOOK, MEETING, SITE_URL } from '../lib/site';

const FAQS = [
  ['Can I visit a meeting?', `Yes. Visitors are always welcome. We meet every ${MEETING.day} at ${MEETING.time} at ${MEETING.venue} in ${MEETING.city}. Come see how a referral meeting works and meet our members.`],
  ['What is BNI?', 'BNI (Business Network International) is a business networking organization built on the philosophy of Givers Gain®: by helping other members grow their business, you grow yours. Each chapter meets weekly so members can share referrals, learn from each other and build trusted relationships.'],
  ['How many people from my profession can join?', 'Each chapter holds only one member per professional specialty, so you never compete with another member for referrals in the room. Check our member list to see which categories are already filled.'],
  ['Who is A1 Networkers for?', 'Established business owners, entrepreneurs and growing professionals in Peoria, Glendale, Surprise, Sun City and across the West Valley who want to grow through referrals and real relationships.'],
];

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const all = members();
  const lead = leadership().roles.slice(0, 3);
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const latest = posts().slice(0, 3);
  const { upcoming } = speakers();
  const next = upcoming[0];
  const nm = next ? findMember(next.name) : null;
  const meetDate = nextThursday();
  const whys = [
    ['Referrals, every week', 'Each Thursday the room hears exactly who you want to meet, and spends the week looking for them.'],
    ['One seat per profession', 'There is only one plumber, one banker and one realtor at the table, so the referrals in your line of work come to you.'],
    ['Better at telling your story', 'Short weekly presentations, a featured talk in rotation and one-to-ones with members sharpen how you describe what you do.'],
  ];
  return (
    <>
      <JsonLd data={faq} />
      <JsonLd data={meetingEvent(meetDate, next && nm ? `${next.name}, ${nm.company}` : null)} />
      <section className="lux-hero">
        <img className="lux-hero__img" src="/img/hero.webp" alt="BNI A1 Networkers members networking before our Thursday meeting at Brothers Family Restaurant" width="1100" height="1100" />
        <div className="wrap lux-hero__in">
          <h1>Thursday mornings, the West Valley does business together.</h1>
          <p className="lux-hero__lead">BNI A1 Networkers is a referral circle of local business owners who meet over breakfast in Peoria every week, with one seat per profession.</p>
          <div className="btnrow">
            <Link className="btn btn--light btn--lg" href="/visit/">Visit as our guest</Link>
            <a className="btn btn--line-light btn--lg" href={FACEBOOK} target="_blank" rel="noopener"><FbIcon /> Facebook</a>
          </div>
        </div>
      </section>

      <div className="wrap">
        <aside className="invite" aria-label="Next meeting">
          <div className="invite__frame">
            <div className="invite__col">
              <p className="invite__k">You’re invited</p>
              <p className="invite__when">{fmtDate(meetDate, { weekday: 'long', month: 'long', day: 'numeric' })}<span>{MEETING.time}</span></p>
              <p className="invite__where">{MEETING.venue}<br />{MEETING.street}, {MEETING.city}</p>
              <div className="invite__actions">
                <Link className="btn btn--red" href="/visit/">Plan your visit</Link>
                <a className="tlink" href={MEETING.map} target="_blank" rel="noopener">Get directions</a>
              </div>
            </div>
            {next && (
              <div className="invite__col invite__col--speaker">
                <p className="invite__k">{next.date === meetDate ? 'Featured speaker' : `Next featured speaker, ${fmtDate(next.date, { month: 'long', day: 'numeric' })}`}</p>
                <div className="invite__spk">
                  <Avatar name={next.name} size="lg" />
                  <div>
                    <p className="invite__name">{next.name}</p>
                    {nm && <p className="invite__co">{nm.company}<br /><span>{nm.specialty}</span></p>}
                  </div>
                </div>
                <Link className="tlink" href="/speakers/">Speaker rotation</Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      <section className="band lux-about">
        <div className="wrap lux-about__in">
          <p className="lux-statement">For more than twenty years, West Valley business owners have met at this table to trade introductions, advice and their most trusted referrals.</p>
          <div className="lux-about__side">
            <img src="/img/about.webp" alt="Members listening to a presentation at a BNI A1 Networkers meeting" width="900" height="900" loading="lazy" />
            <p>Formerly BNI Grand Networkers, our chapter is part of BNI, the world’s leading business referral organization. Members give short weekly presentations, pass referrals and meet one-to-one, all guided by Givers Gain®: help others grow, and your business grows with them.</p>
            <Link className="tlink" href="/about/">About the chapter</Link>
          </div>
        </div>
      </section>

      <section className="band band--soft">
        <div className="wrap">
          <h2 className="lux-h2">Why owners keep a seat</h2>
          <div className="whys">
            {whys.map(([h, t]) => <div key={h} className="why"><h3>{h}</h3><p>{t}</p></div>)}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="roster__head">
            <h2 className="lux-h2">{all.length} seats at the table</h2>
            <p>One business per profession. When you need a trade or a service, start with someone the chapter already trusts.</p>
          </div>
          <ul className="roster">
            {all.map((m) => (
              <li key={m.name}>
                <Avatar name={m.name} size="lg" />
                <b>{m.name.replace(/,.*$/, '')}</b>
                <span>{m.specialty}</span>
              </li>
            ))}
          </ul>
          <div className="center"><Link className="btn btn--red btn--lg" href="/members/">Browse the member directory</Link></div>
        </div>
      </section>

      <section className="band band--soft">
        <div className="wrap split split--rev">
          <div className="prose">
            <h2 className="lux-h2">Led by members</h2>
            <ul className="leadmini">
              {lead.map((r) => r.names.map((n) => { const m = findMember(n); return (
                <li key={r.role + n}><Avatar name={n} /><span><b>{n}</b><small>{r.role}{m ? `, ${m.company}` : ''}</small></span></li>
              ); }))}
            </ul>
            <p><Link className="tlink" href="/leadership/">The full leadership team</Link></p>
          </div>
          <img className="split__img" src="/img/meeting.webp" alt="A member giving her weekly presentation at BNI A1 Networkers" width="414" height="414" loading="lazy" />
        </div>
      </section>

      {latest.length > 0 && (
        <section className="band">
          <div className="wrap">
            <div className="home-blog__head">
              <h2 className="lux-h2">From the chapter journal</h2>
              <div className="btnrow">
                <Link className="btn btn--ghost" href="/blog/">All posts</Link>
                <Link className="btn btn--ghost" href="/newsletter/">Monthly newsletter</Link>
              </div>
            </div>
            <PostGrid items={latest} />
          </div>
        </section>
      )}

      <section className="band band--soft">
        <div className="wrap narrow">
          <h2 className="lux-h2 center">Questions about visiting</h2>
          <div className="faq">{FAQS.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <section className="lux-close">
        <div className="wrap center">
          <h2>A seat is waiting for you this {MEETING.day}.</h2>
          <p>{MEETING.time} at {MEETING.venue}, {MEETING.street}, {MEETING.city}. Visitors are always welcome.</p>
          <div className="btnrow btnrow--center">
            <Link className="btn btn--light btn--lg" href="/visit/">Plan your visit</Link>
            <a className="btn btn--line-light btn--lg" href={MEETING.map} target="_blank" rel="noopener">Get directions</a>
          </div>
        </div>
      </section>
    </>
  );
}
