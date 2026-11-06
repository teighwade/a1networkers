import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { posts, issues } from '../../../lib/content';
import { fmtDate } from '../../../lib/data';

// Branded 1200x1200 social image for each blog post and newsletter issue: /social/<slug>.png
export const dynamic = 'force-static';
export const dynamicParams = false;

const all = () => [
  ...posts().map((p) => ({ ...p, kicker: p.category })),
  ...issues().map((p) => ({ ...p, slug: `newsletter-${p.slug}`, kicker: `Newsletter · ${fmtDate(p.date, { month: 'long', year: 'numeric' })}` })),
];
export function generateStaticParams() { return all().map((p) => ({ file: `${p.slug}.png` })); }

const dataUrl = (rel, type) => `data:${type};base64,${fs.readFileSync(path.join(process.cwd(), 'public', rel)).toString('base64')}`;
const PHOTOS = ['img/social/hero.jpg', 'img/social/meeting.jpg', 'img/social/about.jpg'];

export async function GET(_req, { params }) {
  const slug = (await params).file.replace(/\.png$/, '');
  const p = all().find((x) => x.slug === slug);
  if (!p) return new Response('Not found', { status: 404 });
  const photo = PHOTOS[[...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % PHOTOS.length];
  const len = p.title.length;
  const font = (w) => fs.readFileSync(path.join(process.cwd(), `node_modules/@fontsource/archivo/files/archivo-latin-${w}-normal.woff`));
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#17171c', fontFamily: 'Archivo' }}>
        <div style={{ display: 'flex', height: 660, position: 'relative' }}>
          <img src={dataUrl(photo, 'image/jpeg')} width={1200} height={660} style={{ objectFit: 'cover', objectPosition: 'center 30%', width: 1200, height: 660 }} />
          <div style={{ position: 'absolute', left: 48, top: 44, display: 'flex', background: '#fff', borderRadius: 18, padding: '14px 22px' }}>
            <img src={dataUrl('img/logo.png', 'image/png')} width={244} height={120} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#cf2030', padding: '44px 60px 40px', color: '#fff' }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.9 }}>{p.kicker}</div>
          <div style={{ fontSize: len > 70 ? 50 : len > 45 ? 58 : 70, fontWeight: 800, lineHeight: 1.08, marginTop: 18 }}>{p.title}</div>
          <div style={{ marginTop: 'auto', fontSize: 28, opacity: 0.9, display: 'flex' }}>Thursdays 7:00 AM · Peoria, AZ · Visitors welcome</div>
        </div>
      </div>
    ),
    { width: 1200, height: 1200, fonts: [{ name: 'Archivo', data: font(700), weight: 700 }, { name: 'Archivo', data: font(800), weight: 800 }] },
  );
}
