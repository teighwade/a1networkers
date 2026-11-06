// Reads the chapter member list from BNI Arizona and updates data/members.json when it changes.
// Runs daily in GitHub Actions (.github/workflows/update-members.yml). Needs: npm i --no-save playwright && npx playwright install chromium
import fs from 'node:fs';
import { chromium } from 'playwright';

const PAGE_URL = 'https://bniarizona.com/az-west-bni-a1-networkers/en-US/memberlist';
const FILE = new URL('../data/members.json', import.meta.url);

const fmtPhone = (p) => { const d = p.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, ''); return d.length === 10 ? `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}` : p.trim(); };

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForSelector('table tbody tr td', { timeout: 30000 });
// Show all rows if the table is paginated.
await page.evaluate(() => { const s = document.querySelector('select[name$="_length"]'); if (s) { const o = [...s.options].at(-1); s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); } });
await page.waitForTimeout(1500);
const rows = await page.$$eval('table tbody tr', (trs) => trs.map((tr) => {
  const c = [...tr.cells].map((td) => td.innerText.trim());
  const a = tr.querySelector('a[href]');
  return { cells: c, href: a ? a.href : '' };
}));
// Each member's BNI profile lists their business website (when they've added one).
const SKIP = /bni|bnitos|linkedin|facebook|instagram|twitter|x\.com|youtube|tiktok|google|apple\.com|yelp/i;
const websites = {};
for (const r of rows) {
  if (!r.href) continue;
  try {
    await page.goto(r.href, { waitUntil: 'networkidle', timeout: 45000 });
    const links = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
    const site = links.find((h) => /^https?:/.test(h) && !SKIP.test(new URL(h).hostname));
    if (site) websites[r.href] = site.replace(/\/$/, '');
  } catch (e) { console.log('Profile failed:', r.cells[0], e.message); }
}
await browser.close();

const members = rows.filter((r) => r.cells.length >= 4 && r.cells[0]).map(({ cells, href }) => {
  const parts = cells[2].split('>').map((s) => s.trim()).filter(Boolean);
  return { name: cells[0], company: cells[1], industry: parts[0] || '', specialty: parts.at(-1) || '', phone: fmtPhone(cells[3]), profileUrl: href, website: websites[href] || '' };
});
if (members.length < 5) { console.error(`Only ${members.length} members found; not updating.`); process.exit(1); }

const old = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const key = (ms) => JSON.stringify(ms.map((m) => [m.name, m.company, m.specialty, m.phone, m.profileUrl, m.website || '']).sort());
if (key(old.members) === key(members)) { console.log(`No changes (${members.length} members).`); process.exit(0); }
const today = new Date(Date.now() - 7 * 3600e3).toISOString().slice(0, 10);
const before = new Set(old.members.map((m) => m.name)); const after = new Set(members.map((m) => m.name));
console.log('Added:', [...after].filter((n) => !before.has(n)).join(', ') || 'none');
console.log('Removed:', [...before].filter((n) => !after.has(n)).join(', ') || 'none');
fs.writeFileSync(FILE, JSON.stringify({ ...old, updated: today, members }, null, 2) + '\n');
console.log(`Updated data/members.json (${members.length} members).`);
