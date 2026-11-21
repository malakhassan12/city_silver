import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { Product } from '@/src/types/store';

export async function PATCH(
  req: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const auth = requireStaffFromRequest(req, 'canEditProducts');
  if (!auth.ok) return auth.response;

  const { productId } = await context.params;
  const db = getDb();
  const product = db.products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const updates = (await req.json()) as Partial<Product>;
  Object.assign(product, {
    ...(updates.nameAr !== undefined ? { nameAr: updates.nameAr } : {}),
    ...(updates.nameEn !== undefined ? { nameEn: updates.nameEn } : {}),
    ...(updates.descriptionAr !== undefined ? { descriptionAr: updates.descriptionAr } : {}),
    ...(updates.descriptionEn !== undefined ? { descriptionEn: updates.descriptionEn } : {}),
    ...(updates.category !== undefined ? { category: updates.category } : {}),
    ...(updates.stock !== undefined ? { stock: Math.max(0, Number(updates.stock)) } : {}),
    ...(updates.price !== undefined ? { price: Math.max(0, Number(updates.price)) } : {}),
    ...(updates.weightGrams !== undefined ? { weightGrams: Number(updates.weightGrams) } : {}),
    ...(updates.makingCharge !== undefined ? { makingCharge: Number(updates.makingCharge) } : {}),
    ...(updates.active !== undefined ? { active: Boolean(updates.active) } : {}),
    ...(updates.featured !== undefined ? { featured: Boolean(updates.featured) } : {}),
  });

  if (product.useSilverPricing && product.weightGrams) {
    product.price = Math.round(
      product.weightGrams * db.silverPricing.silver925PerGram + (product.makingCharge || 0)
    );
  }

  saveDb();
  return NextResponse.json(product);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const auth = requireStaffFromRequest(req, 'canDeleteProducts');
  if (!auth.ok) return auth.response;

  const { productId } = await context.params;
  const db = getDb();
  const idx = db.products.findIndex((p) => p.id === productId);
  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  db.products.splice(idx, 1);
  saveDb();
  return NextResponse.json({ deleted: true });
}
