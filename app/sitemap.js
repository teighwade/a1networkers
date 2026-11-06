import { SITE_URL, NAV } from '../lib/site';
import { posts, issues } from '../lib/content';
export const dynamic = 'force-static';
export default function sitemap() {
  return [
    { url: SITE_URL + '/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...NAV.map((n) => ({ url: SITE_URL + n.href, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 })),
    ...posts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: p.date, changeFrequency: 'monthly', priority: 0.6 })),
    ...issues().map((p) => ({ url: `${SITE_URL}/newsletter/${p.slug}/`, lastModified: p.date, changeFrequency: 'monthly', priority: 0.6 })),
  ];
}
