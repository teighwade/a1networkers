import Link from 'next/link';
import { PageHero, JsonLd } from '../../components/Bits';
import { PostGrid } from '../../components/Posts';
import { posts } from '../../lib/content';
import { SITE_URL, NAME } from '../../lib/site';

export const metadata = {
  title: 'Blog: Networking, BNI & West Valley Business',
  description: 'Networking tips, BNI how-tos and stories about the West Valley businesses in BNI A1 Networkers, our Peoria referral networking chapter.',
  alternates: { canonical: '/blog/', types: { 'application/rss+xml': '/feed.xml' } },
};

export default function Blog() {
  const all = posts();
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Blog', name: `${NAME} Blog`, url: `${SITE_URL}/blog/`, blogPost: all.slice(0, 20).map((p) => ({ '@type': 'BlogPosting', headline: p.title, datePublished: p.date, url: `${SITE_URL}/blog/${p.slug}/` })) }} />
      <PageHero eyebrow="Blog" title="Networking, BNI and West Valley business">
        <p>New posts every Monday, Wednesday and Friday: referral tips, how BNI works and the local businesses in our chapter.</p>
      </PageHero>
      <section className="band">
        <div className="wrap">
          {all.length ? <PostGrid items={all} /> : <p>Our first posts are on the way.</p>}
          <p className="center mt"><Link className="tlink" href="/newsletter/">Read our monthly newsletter →</Link></p>
        </div>
      </section>
    </>
  );
}
