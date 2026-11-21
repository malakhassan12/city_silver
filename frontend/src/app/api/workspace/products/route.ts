import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { Product } from '@/src/types/store';

export async function POST(req: Request) {
  const auth = requireStaffFromRequest(req, 'canAddProducts', 'canEditProducts');
  if (!auth.ok) return auth.response;

  const db = getDb();
  const body = (await req.json()) as Partial<Product>;
  if (!body.nameAr || !body.nameEn || !body.category) {
    return NextResponse.json(
      { error: 'Product Arabic name, English name, and category required' },
      { status: 400 }
    );
  }

  const useSilverPricing = Boolean(body.useSilverPricing);
  const weightGrams = Number(body.weightGrams || 0);
  const makingCharge = Number(body.makingCharge || 0);
  const computedPrice = useSilverPricing
    ? Math.round(weightGrams * db.silverPricing.silver925PerGram + makingCharge)
    : Number(body.price || 0);

  const newProduct: Product = {
    id: `prod-${crypto.randomUUID().slice(0, 8)}`,
    sku: body.sku?.trim() || `CS-${Math.floor(1000 + Math.random() * 9000)}`,
    slug: (body.nameEn || 'item')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    nameAr: body.nameAr.trim(),
    nameEn: body.nameEn.trim(),
    descriptionAr: body.descriptionAr?.trim() || '',
    descriptionEn: body.descriptionEn?.trim() || '',
    category: body.category,
    material: body.material || 'silver_925',
    imageUrl: (body.imageUrl || '/images/product_silver_ring_1794604055973.jpg').replace(
      '/src/assets/images/',
      '/images/'
    ),
    weightGrams: useSilverPricing ? weightGrams : undefined,
    makingCharge: useSilverPricing ? makingCharge : undefined,
    useSilverPricing,
    price: Math.max(0, computedPrice),
    stock: Math.max(0, Number(body.stock ?? 5)),
    variants: body.variants && body.variants.length > 0 ? body.variants : ['Standard'],
    featured: Boolean(body.featured),
    active: true,
    createdAt: new Date().toISOString(),
  };

  db.products.unshift(newProduct);
  saveDb();
  return NextResponse.json(newProduct, { status: 201 });
}
