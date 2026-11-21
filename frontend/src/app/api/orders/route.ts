import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getAuthContextFromRequest, getDb, saveDb } from '@/src/lib/storeDb';
import type { Order } from '@/src/types/store';

export async function POST(req: Request) {
  const db = getDb();
  const { user } = getAuthContextFromRequest(req);
  const {
    customerName,
    customerPhone,
    customerEmail,
    shippingAddress,
    deliveryMethod,
    paymentMethod,
    isReservation,
    items,
  } = (await req.json()) as {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    shippingAddress?: string;
    deliveryMethod?: 'delivery' | 'pickup';
    paymentMethod?: 'cod' | 'store_counter' | 'bank_transfer_ref';
    isReservation?: boolean;
    items?: Array<{
      productId: string;
      variant: string;
      quantity: number;
      engravingNote?: string;
    }>;
  };

  if (!customerName || !customerPhone || !items || items.length === 0) {
    return NextResponse.json(
      { error: 'Customer name, phone, and at least one item are required' },
      { status: 400 }
    );
  }

  const orderItems: Order['items'] = [];
  let subtotal = 0;

  for (const reqItem of items) {
    const product = db.products.find((p) => p.id === reqItem.productId && p.active);
    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${reqItem.productId}` },
        { status: 404 }
      );
    }
    const qty = Math.max(1, Math.min(20, Math.floor(reqItem.quantity || 1)));
    if (product.stock < qty) {
      return NextResponse.json(
        { error: `Insufficient stock for ${product.nameEn}` },
        { status: 400 }
      );
    }
    product.stock -= qty;
    subtotal += product.price * qty;
    orderItems.push({
      productId: product.id,
      sku: product.sku,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      variant: reqItem.variant || product.variants[0] || 'Standard',
      unitPrice: product.price,
      quantity: qty,
      imageUrl: product.imageUrl,
      engravingNote: reqItem.engravingNote?.slice(0, 60) || undefined,
    });
  }

  const method = deliveryMethod === 'pickup' ? 'pickup' : 'delivery';
  const shippingFee =
    method === 'pickup' || subtotal >= db.settings.freeShippingThreshold
      ? 0
      : db.settings.shippingFee;

  const nextNum = 1043 + db.orders.length;
  const now = new Date().toISOString();

  const defaultEmpRole = db.staffRoles.find((r) => r.role === 'employee' && r.active);
  const defaultEmpUser = defaultEmpRole
    ? db.users.find((u) => u.id === defaultEmpRole.userId)
    : null;

  const order: Order = {
    id: `ord-${crypto.randomUUID().slice(0, 8)}`,
    orderNumber: `CS-${nextNum}`,
    customerId: user?.id ?? null,
    customerName: customerName.trim(),
    customerPhone: customerPhone.trim(),
    customerEmail: customerEmail?.trim() || user?.email || '',
    shippingAddress:
      method === 'pickup'
        ? 'Boutique Pickup — Main Gallery'
        : shippingAddress?.trim() || 'Address provided at checkout',
    deliveryMethod: method,
    paymentMethod: paymentMethod || 'cod',
    isReservation: Boolean(isReservation),
    items: orderItems,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    paidAmount: 0,
    paymentStatus: 'unpaid',
    status: 'pending',
    assignedEmployeeId: defaultEmpUser?.id ?? null,
    assignedEmployeeName: defaultEmpUser?.name ?? null,
    checklist: {
      stockVerified: false,
      qualityInspected: false,
      packaged: false,
    },
    courierNote: '',
    paymentLogs: [],
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };

  db.orders.unshift(order);
  saveDb();

  return NextResponse.json(order, { status: 201 });
}
