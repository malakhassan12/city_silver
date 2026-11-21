import { NextResponse } from 'next/server';
import { getAuthContextFromRequest, getDb } from '@/src/lib/storeDb';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { user } = getAuthContextFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  const db = getDb();
  const mine = db.orders.filter(
    (o) =>
      o.customerId === user.id ||
      o.customerEmail.toLowerCase() === user.email.toLowerCase()
  );
  return NextResponse.json(mine);
}
