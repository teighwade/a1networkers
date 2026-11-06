// One-time import of the photos from the old WordPress site into public/img/.
import fs from 'node:fs';
const BASE = 'https://bnia1networkers.com/wp-content/uploads/2026/05/';
const FILES = {
  'hero.png': 'ChatGPT-Image-May-18-2026-09_09_30-AM-1.png',
  'meeting.png': 'ChatGPT-Image-May-18-2026-09_16_34-AM.png',
  'about.png': 'ChatGPT-Image-May-18-2026-09_22_30-AM.png',
  'logo-old.png': 'ChatGPT-Image-May-18-2026-08_17_58-AM.png',
};
fs.mkdirSync('public/img', { recursive: true });
for (const [out, src] of Object.entries(FILES)) {
  let res = await fetch(BASE + src);
  if (!res.ok && out === 'about.png') res = await fetch(BASE + 'ChatGPT-Image-May-18-2026-09_22_30-AM-1024x683.png');
  if (!res.ok) { console.error(`Failed ${src}: ${res.status}`); continue; }
  fs.writeFileSync('public/img/' + out, Buffer.from(await res.arrayBuffer()));
  console.log('Saved', out);
}
