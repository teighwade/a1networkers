# BNI A1 Networkers website

Next.js site for the BNI A1 Networkers chapter (Peoria, AZ), hosted on Vercel. Every push to `main` deploys.

## Data
- `data/members.json` — updated automatically every day from the chapter's BNI Arizona member list (`.github/workflows/update-members.yml`, `scripts/update-members.mjs`).
- `data/leadership.json` — leadership team (from the weekly meeting slides).
- `data/speakers.json` — featured speaker rotation (from the weekly meeting slides). The home, visit and speakers pages refresh hourly, so the "next speaker" moves on after each meeting.

## Rules
- Blog posts may feature any member business EXCEPT Edward Jones (Steve Shmatko). Financial advisors have compliance rules, so he is never the subject of a blog post or written promotional post about his business. He stays on the member list, and photos of him at BNI meetings and events (including his presentation slides) are fine to use anywhere on the site.
- BNI® and Givers Gain® are trademarks of BNI Global, LLC.

## Blog and newsletter

- Blog posts: `content/blog/YYYY-MM-DD-slug.md`, published Monday, Wednesday and Friday by a scheduled task.
  Front matter: `title`, `date`, `category` (Networking, BNI, Member Spotlight, Business Tips, Seasonal), `description`, optional `member` (exact name from data/members.json, shows a contact card).
- Newsletter (published as **A1 Networkers Times**, shown in a newspaper layout): `content/newsletter/YYYY-MM.md`, published on the 1st of each month. Front matter: `title`, `date`, `spotlight` (member name), `description`.
  Sections: welcome, member spotlight, seasonal tips (home + business), networking tip, BNI news, BNI Arizona events (bniarizona.com/en-US/events), in our chapter (speakers, new members), bring a guest.
- Posts with a future `date` stay hidden until that day. RSS feed at /feed.xml.
- Never invent facts about a member business (no made-up prices, awards, years or reviews). Use their website, BNI profile and this repo.
- Every post and issue gets a branded 1200x1200 image at /social/<slug>.png (newsletter: /social/newsletter-YYYY-MM.png), used for Facebook and link previews. Photos come from public/img/chapter/ (add more chapter photos there and to PHOTOS in app/social/[file]/route.js). Spotlight posts show the member logo from data/member-media.json.
- Facebook: Metricool brand "BNI A1 Networkers" (blogId 7926423), Facebook only. The blog and newsletter scheduled tasks also schedule a Facebook post for each new post.

## Live site

The site lives at **https://www.bnia1networkers.com** (bnia1networkers.com redirects to www). Vercel project "bnia1networkers", DNS at GoDaddy. Use https://www.bnia1networkers.com in all links, Facebook posts and newsletters. Backup address: https://bnia1networkers.vercel.app

## Leadership terms

Chapter leadership roles change every October 1. `data/leadership.json` lists the team for the term that started October 1, 2026. Never credit someone with a role in content dated before the start of that term. Update leadership.json each October.

Company names: BNI lists Jeff Swarens under RE/MAX Professionals, but he is with Realty ONE Group (override in data/member-media.json).

Profession labels: the chapter uses its own short labels (e.g. "Carpet & Tile Cleaner", "Medicare Insurance"). They are set as `category` in data/member-media.json and replace the BNI specialty everywhere on the site.
