import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';

export async function PATCH(req: Request) {
  const auth = requireStaffFromRequest(req, 'canEditSilverPricing');
  if (!auth.ok) return auth.response;

  const db = getDb();
  const { silver925PerGram, defaultMakingChargePerGram, recalculateCatalog } =
    (await req.json()) as {
      silver925PerGram?: number;
      defaultMakingChargePerGram?: number;
      recalculateCatalog?: boolean;
    };

  if (typeof silver925PerGram === 'number' && silver925PerGram > 0) {
    db.silverPricing.silver925PerGram = silver925PerGram;
  }
  if (typeof defaultMakingChargePerGram === 'number' && defaultMakingChargePerGram >= 0) {
    db.silverPricing.defaultMakingChargePerGram = defaultMakingChargePerGram;
  }
  db.silverPricing.updatedAt = new Date().toISOString();
  db.silverPricing.updatedBy = auth.user.name || 'Owner';

  if (recalculateCatalog) {
    for (const prod of db.products) {
      if (prod.useSilverPricing && prod.weightGrams) {
        prod.price = Math.round(
          prod.weightGrams * db.silverPricing.silver925PerGram + (prod.makingCharge || 0)
        );
      }
    }
  }

  saveDb();
  return NextResponse.json({
    silverPricing: db.silverPricing,
    products: db.products,
  });
}
