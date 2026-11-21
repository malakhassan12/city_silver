import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, getSessions, hashPassword, sanitizeUser, type StoredUser } from '@/src/lib/storeDb';

export async function POST(req: Request) {
  const db = getDb();
  const sessions = getSessions();
  const { email, password, demoRole } = (await req.json()) as {
    email?: string;
    password?: string;
    demoRole?: 'owner' | 'employee1' | 'employee2' | 'customer' | 'google_customer';
  };

  let user: StoredUser | undefined;

  if (demoRole) {
    const roleEmails: Record<string, string> = {
      owner: 'owner@citysilver925.demo',
      employee1: 'karim@citysilver925.demo',
      employee2: 'sara@citysilver925.demo',
      customer: 'customer@citysilver925.demo',
      google_customer: 'customer@citysilver925.demo',
    };
    user = db.users.find((u) => u.email === roleEmails[demoRole]);
  } else if (email && password) {
    const normalized = email.trim().toLowerCase();
    user = db.users.find((u) => u.email.toLowerCase() === normalized);
    if (!user || user.passwordHash !== hashPassword(password)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: 'Email confirmation required before sign-in',
          needsVerification: true,
          email: user.email,
        },
        { status: 403 }
      );
    }
  }

  if (!user) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const token = crypto.randomUUID();
  sessions.set(token, user.id);
  const staffRole = db.staffRoles.find((r) => r.userId === user.id && r.active) ?? null;

  return NextResponse.json({
    token,
    user: sanitizeUser(user),
    staffRole,
  });
}
