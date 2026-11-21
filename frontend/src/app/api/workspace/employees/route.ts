import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  DEFAULT_EMPLOYEE_PERMISSIONS,
  getDb,
  hashPassword,
  requireStaffFromRequest,
  sanitizeUser,
  saveDb,
  type StoredUser,
} from '@/src/lib/storeDb';
import type { StaffRoleRecord } from '@/src/types/store';

export async function POST(req: Request) {
  const auth = requireStaffFromRequest(req, 'canManageStaff');
  if (!auth.ok) return auth.response;

  const db = getDb();
  const { name, email, phone, password, titleAr, titleEn } = (await req.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    titleAr?: string;
    titleEn?: string;
  };

  if (!name || !email) {
    return NextResponse.json({ error: 'Employee name and email required' }, { status: 400 });
  }
  const normalized = email.trim().toLowerCase();
  if (db.users.some((u) => u.email.toLowerCase() === normalized)) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
  }

  const now = new Date().toISOString();
  const newUser: StoredUser = {
    id: `user-emp-${crypto.randomUUID().slice(0, 6)}`,
    name: name.trim(),
    email: normalized,
    phone: phone?.trim() || '+20 100 000 0000',
    address: 'Boutique Staff',
    emailVerified: true,
    authProvider: 'email',
    passwordHash: hashPassword(password || 'Staff925!'),
    createdAt: now,
  };

  const newRole: StaffRoleRecord = {
    userId: newUser.id,
    role: 'employee',
    titleAr: titleAr?.trim() || 'موظف مبيعات وتجهيز',
    titleEn: titleEn?.trim() || 'Boutique Sales Associate',
    active: true,
    permissions: { ...DEFAULT_EMPLOYEE_PERMISSIONS },
    updatedAt: now,
  };

  db.users.push(newUser);
  db.staffRoles.push(newRole);
  saveDb();

  return NextResponse.json(
    {
      profile: sanitizeUser(newUser),
      staffRole: newRole,
    },
    { status: 201 }
  );
}
