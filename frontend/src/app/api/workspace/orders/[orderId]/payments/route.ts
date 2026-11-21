import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { PaymentEntry } from '@/src/types/store';

export async function POST(
  req: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  const auth = requireStaffFromRequest(req, 'canRecordStorePayments');
  if (!auth.ok) return auth.response;

  const { orderId } = await context.params;
  const db = getDb();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const { amount, method, note } = (await req.json()) as {
    amount?: number;
    method?: string;
    note?: string;
  };
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return NextResponse.json(
      { error: 'Valid positive payment amount required' },
      { status: 400 }
    );
  }

  const entry: PaymentEntry = {
    id: `pay-${crypto.randomUUID().slice(0, 8)}`,
    amount: numericAmount,
    method: method?.trim() || 'In-Store Counter',
    recordedBy: auth.user.name,
    recordedAt: new Date().toISOString(),
    note: note?.trim(),
  };

  order.paymentLogs.push(entry);
  order.paidAmount = Math.min(order.total, order.paidAmount + numericAmount);
  order.paymentStatus =
    order.paidAmount >= order.total
      ? 'paid'
      : order.paidAmount > 0
      ? 'partial'
      : 'unpaid';
  order.updatedAt = new Date().toISOString();
  saveDb();

  return NextResponse.json(order);
}
