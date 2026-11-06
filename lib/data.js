import fs from 'node:fs';
import path from 'node:path';

const D = path.join(process.cwd(), 'data');
const read = (f) => JSON.parse(fs.readFileSync(path.join(D, f), 'utf8'));

// Website comes from the member's BNI profile; data/member-media.json can fill one in when the profile has none,
// and can override a company name that is out of date on BNI.
export const members = () => { const media = read('member-media.json'); return read('members.json').members.map((m) => ({ ...m, specialty: media[m.name]?.category || m.specialty, company: media[m.name]?.company || m.company, website: m.website || media[m.name]?.website || '' })).sort((a, b) => a.name.localeCompare(b.name)); };
export const membersUpdated = () => read('members.json').updated;
export const leadership = () => read('leadership.json');
export const memberMedia = (name) => { const m = findMember(name); return (m && read('member-media.json')[m.name]) || null; };

// Arizona time (no daylight saving).
export function todayAZ() {
  return new Date(Date.now() - 7 * 3600 * 1000).toISOString().slice(0, 10);
}
export function speakers() {
  const all = read('speakers.json').speakers.slice().sort((a, b) => a.date.localeCompare(b.date));
  const t = todayAZ();
  return { upcoming: all.filter((s) => s.date >= t), past: all.filter((s) => s.date < t).reverse() };
}
export function fmtDate(iso, opts = { weekday: 'long', month: 'long', day: 'numeric' }) {
  return new Date(iso + 'T12:00:00-07:00').toLocaleDateString('en-US', { timeZone: 'America/Phoenix', ...opts });
}
// Match a person named in the slides to a member record (handles "Mike"/"Michael", "Chris"/"Christopher").
const NICK = { mike: 'michael', chris: 'christopher', rob: 'robert', tom: 'thomas', pat: 'patrick' };
export function findMember(name) {
  const norm = (s) => s.toLowerCase().replace(/,.*$/, '').trim().split(/\s+/);
  const [f, ...rest] = norm(name);
  const last = rest.at(-1);
  return members().find((m) => {
    const [mf, ...mr] = norm(m.name);
    return mr.at(-1) === last && (mf === f || NICK[f] === mf || NICK[mf] === f || mf.startsWith(f) || f.startsWith(mf));
  });
}
export const initials = (n) => n.replace(/,.*$/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

// Next Thursday on or after today (Arizona time), as YYYY-MM-DD.
export function nextThursday() {
  const d = new Date(todayAZ() + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + ((4 - d.getUTCDay() + 7) % 7));
  return d.toISOString().slice(0, 10);
}
