import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { seoDefaults, clinicInfo } from '@/config/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: seoDefaults.defaultTitle,
    template: `%s | ${seoDefaults.siteName}`,
  },
  description: seoDefaults.defaultDescription,
  keywords: [...seoDefaults.keywords],
  authors: [{ name: clinicInfo.name }],
  creator: clinicInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: seoDefaults.siteName,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Schema.org structured data for local business
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: clinicInfo.name,
  description: seoDefaults.defaultDescription,
  address: {
    '@type': 'PostalAddress',
    streetAddress: clinicInfo.address.street,
    addressLocality: clinicInfo.address.city,
    addressRegion: clinicInfo.address.state,
    postalCode: clinicInfo.address.zip,
    addressCountry: 'US',
  },
  email: clinicInfo.contact.email,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  medicalSpecialty: 'Primary Care',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

