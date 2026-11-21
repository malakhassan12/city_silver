import { NextResponse } from 'next/server';
import { getDb } from '@/src/lib/storeDb';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  context: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await context.params;
  const db = getDb();
  const code = orderNumber.trim().toUpperCase();
  const order = db.orders.find((o) => o.orderNumber.toUpperCase() === code);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}
