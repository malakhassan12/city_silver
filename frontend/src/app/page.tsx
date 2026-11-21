import type { Metadata } from 'next';
import { getPublicStorefront } from '@/src/lib/storeDb';

export const metadata: Metadata = {
  title: 'City Silver 925 & Bags | سيتي سيلفر 925 والحقائب',
  description:
    'Explore handcrafted 925 sterling silver jewelry and architectural leather bags with bilingual RTL/LTR browsing and live order tracking.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const { products } = getPublicStorefront();
  return (
    <article>
      <h1>City Silver 925 &amp; Bags – سيتي سيلفر 925 والحقائب</h1>
      <p>
        Curated 925 sterling silver rings, chains, cuffs, and full-grain leather bags.
      </p>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.nameEn} ({p.nameAr}) — {p.price} EGP
          </li>
        ))}
      </ul>
    </article>
  );
}
