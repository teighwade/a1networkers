import Link from 'next/link';
import { NAV, MEETING, FACEBOOK, BNI_CHAPTER, NAME, FORMERLY } from '../lib/site';

export function Logo({ boxed }) {
  return (
    <Link href="/" className={boxed ? 'logo logo--boxed' : 'logo'} aria-label={`${NAME} home`}>
      <img src="/img/logo.png" alt="BNI A1 Networkers" width="600" height="295" />
    </Link>
  );
}

export function FbIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><path fill="currentColor" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z" /></svg>
  );
}

export function Header() {
  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <Logo />
        <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-label="Open menu" />
        <label htmlFor="nav-toggle" className="nav-btn" aria-hidden="true"><span /><span /><span /></label>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link className="btn btn--red nav__cta" href="/visit/">Be our guest</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div>
          <Logo boxed />
          <p className="ftr__tag">A BNI chapter for West Valley business owners, built on referrals, trust and Givers Gain®.</p>
          <p className="ftr__small">Formerly {FORMERLY}</p>
        </div>
        <div>
          <h2>Weekly meeting</h2>
          <p><b>Every {MEETING.day}, {MEETING.time}</b><br />{MEETING.format}</p>
          <p><a href={MEETING.map} target="_blank" rel="noopener">{MEETING.venue}<br />{MEETING.street}<br />{MEETING.city}, {MEETING.state} {MEETING.zip}</a></p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Connect</h2>
          <p><a className="ftr__fb" href={FACEBOOK} target="_blank" rel="noopener"><FbIcon size={22} /> Follow us on Facebook</a></p>
          <p><a href={BNI_CHAPTER} target="_blank" rel="noopener">Our chapter on BNI Arizona ↗</a></p>
        </div>
      </div>
      <div className="ftr__base">
        <div className="wrap ftr__base-in">
          <span>© {new Date().getFullYear()} {NAME}. BNI® and Givers Gain® are registered trademarks of BNI Global, LLC.</span>
          <span className="ftr__credit">This custom website was built and is managed by <a href="https://checkoutoursite.com/" rel="noopener" target="_blank">Teigh</a> by <a href="https://logoloco.co/" rel="noopener" target="_blank">Logo Loco</a>. <a href="tel:+14805502871">480-550-2871</a></span>
        </div>
      </div>
    </footer>
  );
}
