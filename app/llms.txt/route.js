import { members, leadership, speakers, fmtDate, nextThursday } from '../../lib/data';
import { posts, issues } from '../../lib/content';
import { SITE_URL, NAME, FORMERLY, MEETING, FACEBOOK, BNI_CHAPTER } from '../../lib/site';

// Plain-text summary for AI assistants and answer engines (llms.txt convention).
export const dynamic = 'force-static';
export const revalidate = 3600;

export function GET() {
  const { upcoming } = speakers();
  const lines = [
    `# ${NAME}`,
    '',
    `> ${NAME} (formerly ${FORMERLY}) is a BNI (Business Network International) referral networking chapter for business owners in Peoria and the West Valley of Arizona. The chapter has served the West Valley for more than 20 years. Visitors are welcome at any meeting.`,
    '',
    '## Weekly meeting',
    `- When: every ${MEETING.day} at ${MEETING.time} (Arizona time), in person`,
    `- Where: ${MEETING.venue}, ${MEETING.street}, ${MEETING.city}, ${MEETING.state} ${MEETING.zip} (${MEETING.plaza})`,
    `- Next meeting: ${fmtDate(nextThursday(), { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`,
    `- Visiting: free; plan a visit at ${SITE_URL}/visit/`,
    '',
    '## How the chapter works',
    '- One member per profession, so referrals in each line of work go to that member.',
    '- Members give short weekly presentations; one member gives a featured presentation each week.',
    '- Guided by the BNI philosophy Givers Gain®.',
    '',
    `## Members (${members().length})`,
    ...members().map((m) => `- ${m.name.replace(/,.*$/, '')}, ${m.company} (${m.specialty})${m.website ? `: ${m.website}` : ''}`),
    '',
    '## Leadership',
    ...leadership().roles.map((r) => `- ${r.role}: ${r.names.join(', ')}`),
    '',
    '## Upcoming featured speakers',
    ...(upcoming.length ? upcoming.map((s) => `- ${fmtDate(s.date, { month: 'long', day: 'numeric' })}: ${s.name}`) : ['- See the speaker page']),
    '',
    '## Pages',
    `- [Visit a meeting](${SITE_URL}/visit/)`,
    `- [Members](${SITE_URL}/members/)`,
    `- [Leadership](${SITE_URL}/leadership/)`,
    `- [Speakers](${SITE_URL}/speakers/)`,
    `- [About](${SITE_URL}/about/)`,
    `- [Blog](${SITE_URL}/blog/)`,
    `- [Newsletter](${SITE_URL}/newsletter/)`,
    '',
    '## Recent posts',
    ...[...posts(), ...issues()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10).map((p) => `- [${p.title}](${SITE_URL}/${p.category ? 'blog' : 'newsletter'}/${p.slug}/): ${p.description || ''}`),
    '',
    '## Links',
    `- Facebook: ${FACEBOOK}`,
    `- BNI Arizona chapter page: ${BNI_CHAPTER}`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
