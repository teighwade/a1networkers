import Link from 'next/link';
import { PageHero } from '../../components/Bits';
import { BNI_CHAPTER, FORMERLY } from '../../lib/site';

export const metadata = { title: 'About Our Chapter', description: 'BNI A1 Networkers, formerly BNI Grand Networkers, has served the West Valley business community for over 20 years with weekly referral networking in Peoria, AZ.', alternates: { canonical: '/about/' } };

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="About BNI A1 Networkers">
        <p>A professional networking group serving the West Valley business community for more than 20 years.</p>
      </PageHero>
      <section className="band">
        <div className="wrap split">
          <img className="split__img" src="/img/about.webp" alt="Business professionals shaking hands" width="1024" height="683" />
          <div className="prose">
            <h2>Our story</h2>
            <p>BNI A1 Networkers, formerly {FORMERLY}, has helped West Valley businesses grow through referrals for over 20 years. We are one of many chapters of BNI (Business Network International), a global business referral organization.</p>
            <p>Our members meet every week to build relationships, share referrals, give presentations and learn from one another. We welcome established business owners, entrepreneurs and growing professionals.</p>
            <h2>Our mission</h2>
            <p>To help our members grow their businesses through referrals, collaboration and education, guided by Givers Gain®, and to create a supportive environment that strengthens the local business community.</p>
          </div>
        </div>
      </section>
      <section className="band band--soft">
        <div className="wrap narrow">
          <h2>Givers Gain®</h2>
          <p>The heart of BNI is a simple idea: when you help others succeed, success comes back to you. Our members look for opportunities to send business to each other every week, and that generosity is what makes the chapter work.</p>
          <div className="btnrow">
            <Link className="btn btn--red" href="/visit/">Visit a meeting</Link>
            <a className="btn btn--ghost" href={BNI_CHAPTER} target="_blank" rel="noopener">Our chapter on BNI Arizona ↗</a>
          </div>
        </div>
      </section>
    </>
  );
}
