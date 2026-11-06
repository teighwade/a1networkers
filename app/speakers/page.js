export const revalidate = 3600; // refresh hourly so "next speaker" moves on after each meeting
import { PageHero, Avatar } from '../../components/Bits';
import { speakers, findMember, fmtDate } from '../../lib/data';
import { MEETING } from '../../lib/site';

export const metadata = { title: 'Featured Speakers', description: 'See who is presenting at upcoming BNI A1 Networkers meetings. Each week one member gives a featured presentation about their business.', alternates: { canonical: '/speakers/' } };

export default function Speakers() {
  const { upcoming, past } = speakers();
  const Row = ({ s, next }) => { const m = findMember(s.name); return (
    <li className={`card srow${next ? ' srow--next' : ''}`}>
      <div className="srow__date"><b>{fmtDate(s.date, { month: 'short' })}</b><span>{fmtDate(s.date, { day: 'numeric' })}</span></div>
      <Avatar name={s.name} />
      <div><p className="srow__name">{s.name}{next && <em>Next up</em>}</p>{m && <p className="srow__co">{m.company} · {m.specialty}</p>}</div>
    </li>
  ); };
  return (
    <>
      <PageHero eyebrow="Speaker rotation" title="Featured speakers">
        <p>Every week one member gives a featured presentation about their business, so we all know exactly who to refer. Meetings are {MEETING.day}s at {MEETING.time}.</p>
      </PageHero>
      <section className="band">
        <div className="wrap narrow">
          <h2>Coming up</h2>
          {upcoming.length ? <ol className="slist">{upcoming.map((s, i) => <Row key={s.date} s={s} next={i === 0} />)}</ol> : <p>The next speaker rotation will be posted soon.</p>}
          {past.length > 0 && (<><h2 className="mt">Recent speakers</h2><ol className="slist slist--past">{past.slice(0, 6).map((s) => <Row key={s.date} s={s} />)}</ol></>)}
        </div>
      </section>
    </>
  );
}
