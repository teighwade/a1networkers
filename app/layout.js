import '@fontsource/archivo/700.css';
import '@fontsource/archivo/800.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/source-sans-3/700.css';
import './globals.css';
import { Header, Footer } from '../components/Chrome';
import { JsonLd } from '../components/Bits';
import { SITE_URL, NAME, MEETING, FACEBOOK, BNI_CHAPTER, FORMERLY } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BNI A1 Networkers | Business Networking in Peoria & the West Valley', template: '%s | BNI A1 Networkers' },
  description: 'BNI A1 Networkers is a West Valley business networking group that meets every Thursday at 7:00 AM in Peoria, AZ. Visitors welcome. Grow your business through trusted referrals.',
  openGraph: { siteName: NAME, locale: 'en_US', type: 'website', images: ['/img/hero.png'] },
  icons: { icon: '/icon.svg' },
};
export const viewport = { themeColor: '#cf2030', width: 'device-width', initialScale: 1 };

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
