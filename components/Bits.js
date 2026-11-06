import Link from 'next/link';
import { MEETING } from '../lib/site';
import { speakers, fmtDate, findMember, initials, memberMedia } from '../lib/data';

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="phero">
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children && <div className="phero__lead">{children}</div>}
      </div>
    </section>
  );
}

export function MeetingCard() {
  return (
    <div className="card meeting">
      <p className="eyebrow">Weekly meeting</p>
      <p className="meeting__when">Every {MEETING.day}<br /><b>{MEETING.time}</b></p>
      <p className="meeting__where">{MEETING.venue}<br />{MEETING.street}<br />{MEETING.city}, {MEETING.state} {MEETING.zip}<br /><span>{MEETING.plaza}</span></p>
      <div className="btnrow">
        <Link className="btn btn--red" href="/visit/">Plan your visit</Link>
        <a className="btn btn--ghost" href={MEETING.map} target="_blank" rel="noopener">Directions</a>
      </div>
    </div>
  );
}

export function Avatar({ name, size = 'md' }) {
  const media = memberMedia(name);
  if (media?.photo) return <span className={`avatar avatar--${size} avatar--photo`} aria-hidden="true"><img src={media.photo} alt="" width="320" height="320" loading="lazy" /></span>;
  if (media?.logo) return <span className={`avatar avatar--${size} avatar--logo`} aria-hidden="true"><img src={media.logo} alt="" width="400" height="400" loading="lazy" /></span>;
  return <span className={`avatar avatar--${size}`} aria-hidden="true">{initials(name)}</span>;
}

export function NextSpeaker() {
  const { upcoming } = speakers();
  const s = upcoming[0];
  if (!s) return null;
  const m = findMember(s.name);
  return (
    <div className="card speaker">
      <p className="eyebrow">Next featured speaker</p>
      <div className="speaker__row">
        <Avatar name={s.name} size="lg" />
        <div>
          <p className="speaker__name">{s.name}</p>
          {m && <p className="speaker__co">{m.company} · {m.specialty}</p>}
          <p className="speaker__date">{fmtDate(s.date)} at {MEETING.time}</p>
        </div>
      </div>
      {upcoming.length > 1 && <p className="speaker__more"><Link href="/speakers/">See the full speaker rotation →</Link></p>}
    </div>
  );
}
