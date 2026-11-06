import { SITE_URL, NAV } from '../lib/site';
export const dynamic = 'force-static';
export default function sitemap() {
  return NAV.map((n) => ({ url: SITE_URL + n.href, lastModified: new Date(), changeFrequency: 'weekly', priority: n.href === '/' ? 1 : 0.8 }));
}
