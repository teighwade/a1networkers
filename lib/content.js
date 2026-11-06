import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { todayAZ } from './data';

// Blog posts live in content/blog/YYYY-MM-DD-slug.md and newsletter issues in content/newsletter/YYYY-MM.md.
// Each file starts with a simple front matter block:
// ---
// title: ...
// date: 2026-11-06
// description: ...
// category: Networking
// ---
function parse(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  if (!m) return { meta, body: raw };
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1');
  }
  return { meta, body: m[2] };
}

function load(dir) {
  const D = path.join(process.cwd(), 'content', dir);
  if (!fs.existsSync(D)) return [];
  const today = todayAZ();
  return fs.readdirSync(D)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { meta, body } = parse(fs.readFileSync(path.join(D, f), 'utf8'));
      const slug = f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const words = body.split(/\s+/).length;
      return { ...meta, slug, body, html: marked.parse(body), minutes: Math.max(2, Math.round(words / 220)) };
    })
    .filter((p) => p.title && p.date && p.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const posts = () => load('blog');
export const post = (slug) => posts().find((p) => p.slug === slug);
export const issues = () => load('newsletter');
export const issue = (slug) => issues().find((p) => p.slug === slug);
export const CATEGORIES = ['Networking', 'BNI', 'Member Spotlight', 'Business Tips', 'Seasonal'];
export const catSlug = (c = '') => c.toLowerCase().replace(/[^a-z]+/g, '-');
