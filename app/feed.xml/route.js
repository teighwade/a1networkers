import { posts, issues } from '../../lib/content';
import { SITE_URL, NAME } from '../../lib/site';

export const dynamic = 'force-static';
const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = [
    ...posts().map((p) => ({ ...p, url: `${SITE_URL}/blog/${p.slug}/` })),
    ...issues().map((p) => ({ ...p, url: `${SITE_URL}/newsletter/${p.slug}/` })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(NAME)}</title><link>${SITE_URL}/blog/</link><description>Networking, BNI and West Valley business from ${esc(NAME)}</description>
${items.map((p) => `<item><title>${esc(p.title)}</title><link>${p.url}</link><guid>${p.url}</guid><pubDate>${new Date(p.date + 'T13:00:00Z').toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`).join('\n')}
</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
