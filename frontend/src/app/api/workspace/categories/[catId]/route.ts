import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';

export async function PATCH(
  req: Request,
  context: { params: Promise<{ catId: string }> }
) {
  const auth = requireStaffFromRequest(req, 'canManageCategories');
  if (!auth.ok) return auth.response;

  const { catId } = await context.params;
  const db = getDb();
  const cat = db.categories.find((c) => c.id === catId);
  if (!cat) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  const updates = await req.json();
  Object.assign(cat, updates);
  saveDb();
  return NextResponse.json(cat);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ catId: string }> }
) {
  const auth = requireStaffFromRequest(req, 'canManageCategories');
  if (!auth.ok) return auth.response;

  const { catId } = await context.params;
  const db = getDb();
  const idx = db.categories.findIndex((c) => c.id === catId);
  if (idx === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  db.categories.splice(idx, 1);
  saveDb();
  return NextResponse.json({ deleted: true });
}
