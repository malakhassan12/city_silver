import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Order | تتبع طلبك',
  description:
    'Track your City Silver 925 jewelry or leather bag order status in real time from preparation and packaging to delivery or boutique pickup.',
  alternates: { canonical: '/track' },
};

export default function TrackOrderPage() {
  return (
    <article>
      <h1>Track Your City Silver 925 Order | تتبع طلبك</h1>
      <p>Enter your order reference such as CS-1042 to inspect live fulfillment progress.</p>
    </article>
  );
}
