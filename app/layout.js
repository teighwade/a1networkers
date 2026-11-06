import '@fontsource/bodoni-moda/500.css';
import '@fontsource/bodoni-moda/500-italic.css';
import '@fontsource/bodoni-moda/600.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import './globals.css';
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
    <html lang="en">
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
