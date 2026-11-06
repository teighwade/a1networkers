import fs from 'node:fs';
import path from 'node:path';

const D = path.join(process.cwd(), 'data');
const read = (f) => JSON.parse(fs.readFileSync(path.join(D, f), 'utf8'));

export const members = () => read('members.json').members.slice().sort((a, b) => a.name.localeCompare(b.name));
export const membersUpdated = () => read('members.json').updated;
export const leadership = () => read('leadership.json');

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
