import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, hashPassword, saveDb, type StoredUser } from '@/src/lib/storeDb';

export async function POST(req: Request) {
  const db = getDb();
  const { name, email, phone, address, password } = (await req.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Name, email, and password are required' },
      { status: 400 }
    );
  }

  const normalized = email.trim().toLowerCase();
  if (db.users.some((u) => u.email.toLowerCase() === normalized)) {
    return NextResponse.json(
      { error: 'Account already exists for this email' },
      { status: 409 }
    );
  }

  const newUser: StoredUser = {
    id: `user-${crypto.randomUUID().slice(0, 8)}`,
    name: name.trim(),
    email: normalized,
    phone: phone?.trim() || '',
    address: address?.trim() || '',
    emailVerified: false,
    authProvider: 'email',
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  saveDb();

  return NextResponse.json(
    {
      pendingVerification: true,
      email: newUser.email,
      message: 'Account created. Confirm your email to activate sign-in.',
    },
    { status: 201 }
  );
}
