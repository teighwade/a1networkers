import fs from 'node:fs';
import { chromium } from 'playwright';
const ms = JSON.parse(fs.readFileSync('data/members.json', 'utf8')).members.slice(0, 3);
const b = await chromium.launch(); const p = await b.newPage();
for (const m of ms) {
  await p.goto(m.profileUrl, { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(2500);
  const links = await p.$$eval('a[href]', (as) => as.map((a) => `${a.innerText.trim().slice(0, 40)} -> ${a.href}`));
  const text = await p.evaluate(() => document.body.innerText.slice(0, 2500));
  console.log('=====', m.name); console.log(text); console.log('--- links'); console.log(links.filter((l) => !/bniarizona\.com\/(az-|en-US)|javascript:|#$/.test(l)).join('\n'));
}
await b.close();
