import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { CategoryRecord } from '@/src/types/store';

export async function POST(req: Request) {
  const auth = requireStaffFromRequest(req, 'canManageCategories');
  if (!auth.ok) return auth.response;

  const db = getDb();
  const { slug, nameAr, nameEn, descriptionAr, descriptionEn } =
    (await req.json()) as Partial<CategoryRecord>;
  if (!nameAr || !nameEn) {
    return NextResponse.json(
      { error: 'Arabic and English category names are required' },
      { status: 400 }
    );
  }
  const finalSlug =
    slug?.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_') ||
    nameEn.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');

  const newCat: CategoryRecord = {
    id: `cat-${crypto.randomUUID().slice(0, 6)}`,
    slug: finalSlug,
    nameAr: nameAr.trim(),
    nameEn: nameEn.trim(),
    descriptionAr: descriptionAr?.trim() || '',
    descriptionEn: descriptionEn?.trim() || '',
    active: true,
    sortOrder: db.categories.length + 1,
  };
  db.categories.push(newCat);
  saveDb();
  return NextResponse.json(newCat, { status: 201 });
}
