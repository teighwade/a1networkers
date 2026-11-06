import '@fontsource/unifrakturmaguntia/400.css';
import '@fontsource/old-standard-tt/400.css';
import '@fontsource/old-standard-tt/400-italic.css';
import '@fontsource/old-standard-tt/700.css';
import localFont from 'next/font/local';
import './globals.css';

// Self-hosted, preloaded fonts with size-matched fallbacks (no layout shift when they load).
const bodoni = localFont({ variable: '--font-bodoni', display: 'swap', src: [
  { path: './fonts/bodoni-moda-latin-500-normal.woff2', weight: '500', style: 'normal' },
  { path: './fonts/bodoni-moda-latin-500-italic.woff2', weight: '500', style: 'italic' },
  { path: './fonts/bodoni-moda-latin-600-normal.woff2', weight: '600', style: 'normal' },
], fallback: ['Georgia', 'serif'] });
const instrument = localFont({ variable: '--font-instrument', display: 'swap', src: [
  { path: './fonts/instrument-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
  { path: './fonts/instrument-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
  { path: './fonts/instrument-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
], fallback: ['system-ui', 'Arial', 'sans-serif'] });
import { Header, Footer } from '../components/Chrome';
import { JsonLd } from '../components/Bits';
import { SITE_URL, NAME, MEETING, FACEBOOK, BNI_CHAPTER, FORMERLY } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BNI A1 Networkers | Business Networking in Peoria & the West Valley', template: '%s | BNI A1 Networkers' },
  description: 'BNI A1 Networkers is a West Valley business networking group that meets every Thursday at 7:00 AM in Peoria, AZ. Visitors welcome. Grow your business through trusted referrals.',
  openGraph: { siteName: NAME, locale: 'en_US', type: 'website', images: ['/img/og.jpg'] },
  icons: { icon: '/icon.svg' },
};
export const viewport = { themeColor: '#5c0d1a', width: 'device-width', initialScale: 1 };

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE_URL + '/#org',
  name: NAME,
  alternateName: FORMERLY,
  url: SITE_URL + '/',
  description: 'A BNI (Business Network International) chapter of business professionals in Peoria and the West Valley of Arizona.',
  sameAs: [FACEBOOK, BNI_CHAPTER],
  parentOrganization: { '@type': 'Organization', name: 'BNI', url: 'https://www.bni.com/' },
  address: { '@type': 'PostalAddress', streetAddress: MEETING.street, addressLocality: MEETING.city, addressRegion: MEETING.state, postalCode: MEETING.zip, addressCountry: 'US' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${instrument.variable}`}>
      <body>
        <JsonLd data={org} />
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
