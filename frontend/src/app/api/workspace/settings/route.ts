import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { StoreSettings } from '@/src/types/store';

export async function PATCH(req: Request) {
  const auth = requireStaffFromRequest(req, 'canManageStaff');
  if (!auth.ok) return auth.response;

  const db = getDb();
  const updates = (await req.json()) as Partial<StoreSettings>;
  db.settings = { ...db.settings, ...updates };
  saveDb();

  return NextResponse.json(db.settings);
}
