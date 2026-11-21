import React from 'react';
import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import '@/src/index.css';
import { getPublicStorefront } from '@/src/lib/storeDb';
import { AppShell } from '@/src/components/AppShell';

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-arabic',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const baseUrl = process.env.APP_URL || 'http://localhost:3000';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#101114' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'City Silver 925 & Bags | سيتي سيلفر 925 والحقائب',
    template: '%s | City Silver 925',
  },
  description:
    'Discover 925 sterling silver rings, Italian chains, and architectural leather bags at City Silver 925. Shop bilingual Arabic & English collections with live order tracking.',
  keywords: [
    'City Silver 925',
    'سيتي سيلفر 925',
    'فضة 925',
    'مجوهرات فضة إسترليني',
    'حقائب جلد طبيعي',
    '925 Sterling Silver Jewelry',
    'Architectural Leather Bags',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: ['en_US'],
    url: baseUrl,
    siteName: 'City Silver 925 & Bags',
    title: 'City Silver 925 & Bags – 925 Sterling Silver Jewelry & Leather Bags',
    description:
      'Shop curated 925 sterling silver rings, chains, cuffs, and structured leather bags with bilingual RTL/LTR browsing and boutique order tracking.',
    images: [
      {
        url: '/images/hero_silver_atelier_1794604055421.jpg',
        width: 1200,
        height: 675,
        alt: 'City Silver 925 Sterling Silver Jewelry and Architectural Leather Bag',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City Silver 925 & Bags | سيتي سيلفر 925 والحقائب',
    description:
      'Curated 925 sterling silver jewelry and architectural leather bags with bilingual RTL/LTR experience and live order tracking.',
    images: ['/images/hero_silver_atelier_1794604055421.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const storefront = getPublicStorefront();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'JewelryStore',
        name: 'City Silver 925 & Bags | سيتي سيلفر 925 والحقائب',
        url: baseUrl,
        image: `${baseUrl}/images/hero_silver_atelier_1794604055421.jpg`,
        description:
          'Curated 925 sterling silver jewelry and architectural full-grain leather bags boutique.',
        priceRange: '$$',
      },
      {
        '@type': 'WebSite',
        name: 'City Silver 925 & Bags',
        url: baseUrl,
        inLanguage: ['ar', 'en'],
      },
      {
        '@type': 'ItemList',
        name: 'City Silver 925 Curated Catalog',
        numberOfItems: storefront.products.length,
        itemListElement: storefront.products.slice(0, 9).map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Product',
            name: p.nameEn,
            alternateName: p.nameAr,
            sku: p.sku,
            image: `${baseUrl}${p.imageUrl}`,
            description: p.descriptionEn || p.descriptionAr,
            offers: {
              '@type': 'Offer',
              priceCurrency: storefront.silverPricing.currencyCode || 'EGP',
              price: p.price,
              availability:
                p.stock > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
            },
          },
        })),
      },
    ],
  };

  const preHydrateScript = `
    (function(){
      try {
        var l = localStorage.getItem('cs925_lang');
        if (l === 'en' || l === 'ar') {
          document.documentElement.lang = l;
          document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
        }
        var t = localStorage.getItem('cs925_theme');
        if (t === 'dark') document.documentElement.classList.add('dark');
        var p = localStorage.getItem('cs925_palette');
        if (p) document.documentElement.setAttribute('data-palette', p);
      } catch (e) {}
    })();
  `;

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${ibmArabic.variable} ${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preHydrateScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AppShell initialStorefront={storefront}>{children}</AppShell>
      </body>
    </html>
  );
}
