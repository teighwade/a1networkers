# BNI A1 Networkers website

Next.js site for the BNI A1 Networkers chapter (Peoria, AZ), hosted on Vercel. Every push to `main` deploys.

## Data
- `data/members.json` — updated automatically every day from the chapter's BNI Arizona member list (`.github/workflows/update-members.yml`, `scripts/update-members.mjs`).
- `data/leadership.json` — leadership team (from the weekly meeting slides).
- `data/speakers.json` — featured speaker rotation (from the weekly meeting slides). The home, visit and speakers pages refresh hourly, so the "next speaker" moves on after each meeting.

## Rules
- Blog posts may feature any member business EXCEPT Edward Jones (Steve Shmatko). Financial advisors have compliance rules, so he is never the subject of a blog post or written promotional post about his business. He stays on the member list, and photos of him at BNI meetings and events (including his presentation slides) are fine to use anywhere on the site.
- BNI® and Givers Gain® are trademarks of BNI Global, LLC.
