import { PageHero, Avatar, JsonLd } from '../../components/Bits';
import { members, membersUpdated, fmtDate } from '../../lib/data';
import { BNI_MEMBERLIST, SITE_URL } from '../../lib/site';

export const metadata = {
  title: 'Members',
  description: 'Meet the members of BNI A1 Networkers: trusted West Valley businesses in construction, real estate, finance, insurance, marketing and more, one per profession.',
  alternates: { canonical: '/members/' },
};

export default function Members() {
  const all = members();
  const list = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'BNI A1 Networkers members', itemListElement: all.map((m, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Organization', name: m.company, description: m.specialty, telephone: m.phone, employee: { '@type': 'Person', name: m.name } } })) };
  return (
    <>
      <JsonLd data={list} />
      <PageHero eyebrow={`${all.length} members`} title="Our members">
        <p>Every member is a trusted local business owner, and each holds the only seat for their profession in our chapter. When you need a service, start here.</p>
      </PageHero>
      <section className="band">
        <div className="wrap">
          <div className="mgrid">
            {all.map((m) => (
              <article key={m.name} className="card member">
                <Avatar name={m.name} />
                <div>
                  <p className="member__ind">{m.industry}</p>
                  <h3>{m.name}</h3>
                  <p className="member__co">{m.company}</p>
                  <p className="member__spec">{m.specialty}</p>
                  <p className="member__links">
                    <a href={`tel:+1${m.phone.replace(/\D/g, '')}`}>{m.phone}</a>
                    {m.website && <a href={m.website} target="_blank" rel="noopener">Website ↗</a>}
                    {m.profileUrl && <a href={m.profileUrl} target="_blank" rel="noopener">BNI profile ↗</a>}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="updated">Member list updates automatically from <a href={BNI_MEMBERLIST} target="_blank" rel="noopener">our chapter page on BNI Arizona</a>. Last updated {fmtDate(membersUpdated(), { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
        </div>
      </section>
    </>
  );
}
