import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { InventoryLog } from '@/src/types/store';

export async function POST(req: Request) {
  const auth = requireStaffFromRequest(req, 'canManageInventory', 'canEditProducts');
  if (!auth.ok) return auth.response;

  const db = getDb();
  const { productId, delta, reason } = (await req.json()) as {
    productId?: string;
    delta?: number;
    reason?: string;
  };
  const product = db.products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const numericDelta = Math.trunc(Number(delta || 0));
  product.stock = Math.max(0, product.stock + numericDelta);

  const log: InventoryLog = {
    id: `inv-${crypto.randomUUID().slice(0, 8)}`,
    productId: product.id,
    sku: product.sku,
    productNameAr: product.nameAr,
    productNameEn: product.nameEn,
    delta: numericDelta,
    newStock: product.stock,
    reason: reason?.trim() || 'Manual stock adjustment',
    actorName: auth.user.name,
    createdAt: new Date().toISOString(),
  };
  db.inventoryLogs.unshift(log);
  saveDb();

  return NextResponse.json({ product, log });
}
