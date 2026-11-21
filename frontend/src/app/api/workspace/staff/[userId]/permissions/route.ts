import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { StaffPermissions } from '@/src/types/store';

export async function PATCH(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const auth = requireStaffFromRequest(req, 'canManageStaff');
  if (!auth.ok) return auth.response;

  const { userId } = await context.params;
  const db = getDb();
  const targetRole = db.staffRoles.find((r) => r.userId === userId);
  if (!targetRole) {
    return NextResponse.json({ error: 'Staff role not found' }, { status: 404 });
  }
  if (targetRole.role === 'owner') {
    return NextResponse.json({ error: 'Owner permissions cannot be restricted' }, { status: 400 });
  }

  const { permissions, active, titleAr, titleEn } = (await req.json()) as {
    permissions?: Partial<StaffPermissions>;
    active?: boolean;
    titleAr?: string;
    titleEn?: string;
  };

  if (permissions) {
    targetRole.permissions = {
      ...targetRole.permissions,
      ...permissions,
    };
  }
  if (typeof active === 'boolean') {
    targetRole.active = active;
  }
  if (titleAr !== undefined) targetRole.titleAr = titleAr;
  if (titleEn !== undefined) targetRole.titleEn = titleEn;
  targetRole.updatedAt = new Date().toISOString();
  saveDb();

  return NextResponse.json(targetRole);
}
