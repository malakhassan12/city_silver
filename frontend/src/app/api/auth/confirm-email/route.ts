import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, getSessions, saveDb, sanitizeUser } from '@/src/lib/storeDb';

export async function POST(req: Request) {
  const db = getDb();
  const sessions = getSessions();
  const { email } = (await req.json()) as { email?: string };
  const normalized = email?.trim().toLowerCase();
  const user = db.users.find((u) => u.email.toLowerCase() === normalized);
  if (!user) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 });
  }
  user.emailVerified = true;
  saveDb();

  const token = crypto.randomUUID();
  sessions.set(token, user.id);
  const staffRole = db.staffRoles.find((r) => r.userId === user.id && r.active) ?? null;

  return NextResponse.json({
    token,
    user: sanitizeUser(user),
    staffRole,
  });
}
