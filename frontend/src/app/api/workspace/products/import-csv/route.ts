import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { Product } from '@/src/types/store';

export async function POST(req: Request) {
  const auth = requireStaffFromRequest(req, 'canAddProducts', 'canEditProducts');
  if (!auth.ok) return auth.response;

  const db = getDb();
  const { items } = (await req.json()) as {
    items?: Array<{
      sku?: string;
      nameAr: string;
      nameEn: string;
      category: string;
      material: 'silver_925' | 'silver_rhodium' | 'full_grain_leather';
      weightGrams?: number;
      price?: number;
      stock?: number;
    }>;
  };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No valid CSV items supplied' }, { status: 400 });
  }

  const imageByCat: Record<string, string> = {
    rings: '/images/product_silver_ring_1794604055973.jpg',
    necklaces: '/images/product_silver_necklace_1794604056451.jpg',
    bracelets_earrings: '/images/product_silver_bracelet_earrings_1794604056472.jpg',
    evening_bags: '/images/product_evening_clutch_1794604057272.jpg',
    tote_bags: '/images/product_leather_tote_1794604057749.jpg',
  };

  const created: Product[] = [];
  for (const row of items.slice(0, 50)) {
    if (!row.nameAr || !row.nameEn) continue;
    const isSilver = row.material !== 'full_grain_leather';
    const weight = Number(row.weightGrams || 0);
    const making = isSilver ? Math.round(weight * db.silverPricing.defaultMakingChargePerGram) : 0;
    const price =
      isSilver && weight > 0
        ? Math.round(weight * db.silverPricing.silver925PerGram + making)
        : Math.max(0, Number(row.price || 1500));

    const p: Product = {
      id: `prod-${crypto.randomUUID().slice(0, 8)}`,
      sku: row.sku?.trim() || `CS-CSV-${Math.floor(100 + Math.random() * 900)}`,
      slug: row.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      nameAr: row.nameAr.trim(),
      nameEn: row.nameEn.trim(),
      descriptionAr: 'مستورد عبر ملف CSV للكتالوج.',
      descriptionEn: 'Imported via catalog CSV batch tool.',
      category: row.category || 'rings',
      material: row.material || 'silver_925',
      imageUrl: imageByCat[row.category] || '/images/product_silver_ring_1794604055973.jpg',
      weightGrams: isSilver && weight > 0 ? weight : undefined,
      makingCharge: isSilver && weight > 0 ? making : undefined,
      useSilverPricing: isSilver && weight > 0,
      price,
      stock: Math.max(0, Number(row.stock ?? 5)),
      variants: ['Standard'],
      featured: false,
      active: true,
      createdAt: new Date().toISOString(),
    };
    db.products.unshift(p);
    created.push(p);
  }

  saveDb();
  return NextResponse.json({ importedCount: created.length, products: created }, { status: 201 });
}
