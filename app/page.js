export const revalidate = 3600; // refresh hourly so "next speaker" moves on after each meeting
import Link from 'next/link';
import { MeetingCard, NextSpeaker, JsonLd, Avatar } from '../components/Bits';
import { FbIcon } from '../components/Chrome';
import { members, leadership, findMember } from '../lib/data';
import { FACEBOOK, MEETING, SITE_URL } from '../lib/site';

const FAQS = [
  ['Can I visit a meeting?', `Yes. Visitors are always welcome. We meet every ${MEETING.day} at ${MEETING.time} at ${MEETING.venue} in ${MEETING.city}. Come see how a referral meeting works and meet our members.`],
  ['What is BNI?', 'BNI (Business Network International) is a business networking organization built on the philosophy of Givers Gain®: by helping other members grow their business, you grow yours. Each chapter meets weekly so members can share referrals, learn from each other and build trusted relationships.'],
  ['How many people from my profession can join?', 'Each chapter holds only one member per professional specialty, so you never compete with another member for referrals in the room. Check our member list to see which categories are already filled.'],
  ['Who is A1 Networkers for?', 'Established business owners, entrepreneurs and growing professionals in Peoria, Glendale, Surprise, Sun City and across the West Valley who want to grow through referrals and real relationships.'],
];

export default function Home() {
  const all = members();
  const industries = [...new Set(all.map((m) => m.industry))].sort();
  const lead = leadership().roles.slice(0, 3);
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return (
    <>
      <JsonLd data={faq} />
      <section className="hero">
        <div className="wrap hero__in">
          <div className="hero__copy">
            <p className="hero__pill">{MEETING.day}s at {MEETING.time} · Visitors welcome</p>
            <h1>Grow your business through <em>trusted referrals.</em></h1>
            <p className="hero__lead">BNI A1 Networkers is a community of West Valley business owners who meet every week to give referrals, share what we do and help each other grow.</p>
            <div className="btnrow">
              <Link className="btn btn--red btn--lg" href="/visit/">Visit a meeting</Link>
              <a className="btn btn--ghost btn--lg" href={FACEBOOK} target="_blank" rel="noopener"><FbIcon /> Follow us on Facebook</a>
            </div>
          </div>
          <div className="hero__media">
            <img src="/img/hero.webp" alt="BNI A1 Networkers members networking at a weekly meeting" width="1024" height="1024" />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap cards2">
          <MeetingCard />
          <NextSpeaker />
        </div>
      </section>

      <section className="band band--soft">
        <div className="wrap split">
          <img className="split__img" src="/img/about.webp" alt="Local business professionals shaking hands" width="1024" height="683" loading="lazy" />
          <div className="prose">
            <p className="eyebrow">Who we are</p>
            <h2>A West Valley networking group for over 20 years</h2>
            <p>BNI A1 Networkers, formerly BNI Grand Networkers, has served the West Valley business community for more than 20 years. Every week our members share referrals, give short presentations about their businesses and learn new ways to grow, all built on the BNI philosophy of <b>Givers Gain®</b>.</p>
            <p>Whether you are an established owner, a new entrepreneur or a growing professional, you will find a supportive group of people who want to see you succeed.</p>
            <p><Link className="tlink" href="/about/">More about our chapter →</Link></p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="center">
            <p className="eyebrow">How it works</p>
            <h2>Why business owners join BNI</h2>
          </div>
          <div className="cards3">
            <div className="card feat"><span className="feat__n">1</span><h3>Referrals every week</h3><p>Members actively look for business for each other, so you have a room full of people sending customers your way.</p></div>
            <div className="card feat"><span className="feat__n">2</span><h3>One seat per profession</h3><p>Only one member per specialty, so the referrals for your line of work come to you.</p></div>
            <div className="card feat"><span className="feat__n">3</span><h3>Learn and grow</h3><p>Weekly education, member presentations and one-to-one meetings sharpen how you talk about your business.</p></div>
          </div>
        </div>
      </section>

      <section className="band band--dark">
        <div className="wrap">
          <div className="center">
            <p className="eyebrow eyebrow--light">Our members</p>
            <h2>{all.length} local businesses, one seat per profession</h2>
            <p className="lead-light">From HVAC and plumbing to banking, insurance and real estate, our members cover the services West Valley families and businesses need.</p>
          </div>
          <ul className="chips">{all.map((m) => <li key={m.name}><b>{m.specialty}</b><span>{m.company}</span></li>)}</ul>
          <div className="center"><Link className="btn btn--red btn--lg" href="/members/">Meet our members</Link></div>
        </div>
      </section>

      <section className="band">
        <div className="wrap split split--rev">
          <div className="prose">
            <p className="eyebrow">Chapter leadership</p>
            <h2>Led by members, for members</h2>
            <ul className="leadmini">
              {lead.map((r) => r.names.map((n) => { const m = findMember(n); return (
                <li key={r.role + n}><Avatar name={n} /><span><b>{n}</b><small>{r.role}{m ? ` · ${m.company}` : ''}</small></span></li>
              ); }))}
            </ul>
            <p><Link className="tlink" href="/leadership/">See the full leadership team →</Link></p>
          </div>
          <img className="split__img" src="/img/meeting.webp" alt="BNI A1 Networkers meeting" width="1024" height="1024" loading="lazy" />
        </div>
      </section>

      <section className="band band--soft">
        <div className="wrap narrow">
          <h2 className="center">Questions about visiting</h2>
          <div className="faq">{FAQS.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <section className="band cta">
        <div className="wrap center">
          <h2>Come see us this {MEETING.day}</h2>
          <p>{MEETING.time} at {MEETING.venue}, {MEETING.street}, {MEETING.city}.</p>
          <div className="btnrow btnrow--center">
            <Link className="btn btn--white btn--lg" href="/visit/">Plan your visit</Link>
            <a className="btn btn--outline-white btn--lg" href={MEETING.map} target="_blank" rel="noopener">Get directions</a>
          </div>
        </div>
      </section>
    </>
  );
}
