import { issues } from './content';

// The monthly newsletter is published as "A1 Networkers Times".
export const PAPER = 'A1 Networkers Times';

// Issue titles are "Month YYYY: Theme"; the theme is the front-page headline.
export const headline = (p) => p.title.replace(/^[A-Za-z]+ \d{4}:\s*/, '');

// Volume 1 began with the first issue; numbers count up from there.
export const issueNo = (p) => { const all = issues().slice().reverse(); return all.findIndex((x) => x.slug === p.slug) + 1; };

// Split rendered newsletter HTML into its "## " sections.
export function sections(html) {
  return html.split(/(?=<h2[ >])/).map((chunk) => {
    const m = chunk.match(/^<h2[^>]*>([\s\S]*?)<\/h2>\s*/);
    if (!m) return null;
    return { title: m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, '’'), body: chunk.slice(m[0].length) };
  }).filter(Boolean);
}
