import { PageHero, Avatar } from '../../components/Bits';
import { leadership, findMember } from '../../lib/data';

export const metadata = { title: 'Leadership Team', description: 'Meet the leadership team of BNI A1 Networkers, the members who run our weekly meetings, membership and events.', alternates: { canonical: '/leadership/' } };

export default function Leadership() {
  const { roles } = leadership();
  return (
    <>
      <PageHero eyebrow="Chapter leadership" title="Our leadership team">
        <p>Our chapter is run by volunteer members who keep meetings running smoothly, welcome visitors and help every member get the most from BNI.</p>
      </PageHero>
      <section className="band">
        <div className="wrap lgrid">
          {roles.map((r) => (
            <article key={r.role} className={`card role${r.names.length > 1 ? ' role--multi' : ''}`}>
              <p className="eyebrow">{r.role}</p>
              <ul>
                {r.names.map((n) => { const m = findMember(n); return (
                  <li key={n}><Avatar name={n} /><span><b>{n}</b>{m && <small>{m.company}</small>}</span></li>
                ); })}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
