export const revalidate = 3600; // refresh hourly so "next speaker" moves on after each meeting
import Link from 'next/link';
import { PageHero, MeetingCard, NextSpeaker } from '../../components/Bits';
import { FbIcon } from '../../components/Chrome';
import { MEETING, MESSENGER, FACEBOOK } from '../../lib/site';

export const metadata = {
  title: 'Visit a Meeting',
  description: `Visit BNI A1 Networkers as our guest. We meet every ${MEETING.day} at ${MEETING.time} at ${MEETING.venue}, ${MEETING.street}, ${MEETING.city}, AZ.`,
  alternates: { canonical: '/visit/' },
};

const STEPS = [
  ['Open networking', 'Arrive a few minutes early to meet members and other guests before the meeting starts.'],
  ['Member introductions', 'Each member gives a short presentation about their business and the kinds of referrals they are looking for.'],
  ['Featured speaker', 'One member gives a longer presentation so everyone gets to know their business in depth.'],
  ['Referrals and testimonials', 'Members pass referrals and share thank-yous for business they have received.'],
  ['Visitor introductions', 'As our guest, you will have a chance to introduce yourself and what you do.'],
];

export default function Visit() {
  return (
    <>
      <PageHero eyebrow="Be our guest" title="Visit a meeting">
        <p>Visitors are always welcome at BNI A1 Networkers. Come see how a referral meeting works, meet local business owners and find out whether BNI is a fit for you.</p>
      </PageHero>
      <section className="band">
        <div className="wrap cards2">
          <MeetingCard />
          <NextSpeaker />
        </div>
      </section>
      <section className="band band--soft">
        <div className="wrap narrow">
          <h2>What to expect</h2>
          <ol className="steps">{STEPS.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ol>
          <div className="note">
            <h3>Is your profession available?</h3>
            <p>Each BNI chapter has just one member per professional specialty. <Link href="/members/">Check our member list</Link> to see which categories are already filled. If yours is open, we would love to meet you.</p>
          </div>
          <h2>Questions before you come?</h2>
          <p>Send us a message on Facebook and a member of our team will get back to you.</p>
          <div className="btnrow">
            <a className="btn btn--red" href={MESSENGER} target="_blank" rel="noopener"><FbIcon /> Message us</a>
            <a className="btn btn--ghost" href={FACEBOOK} target="_blank" rel="noopener">Visit our Facebook page</a>
          </div>
        </div>
      </section>
    </>
  );
}
